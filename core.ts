import qs from 'qs';
import pkgUp from 'pkg-up';

import type { Agent } from 'http';
import type NodeFetch from 'node-fetch';
import type { RequestInfo, RequestInit, Response } from 'node-fetch';
import type KeepAliveAgent from 'agentkeepalive';
import { AbortController } from 'abort-controller';
import { FormData, File, Blob } from 'formdata-node';
import { FormDataEncoder } from 'form-data-encoder';

import { Readable } from 'stream';

const isNode = typeof process !== 'undefined';
let nodeFetch: typeof NodeFetch | undefined = undefined;
let getDefaultAgent = (_url: string): Agent | undefined => undefined;
if (isNode) {
  /* eslint-disable @typescript-eslint/no-var-requires */
  nodeFetch = require('node-fetch');
  const HttpAgent: typeof KeepAliveAgent = require('agentkeepalive');
  const HttpsAgent = HttpAgent.HttpsAgent;
  /* eslint-enable @typescript-eslint/no-var-requires */

  const defaultHttpAgent = new HttpAgent({ keepAlive: true });
  const defaultHttpsAgent = new HttpsAgent({ keepAlive: true });
  getDefaultAgent = (url: string) => (url.startsWith('https') ? defaultHttpsAgent : defaultHttpAgent);
}

const DEFAULT_MAX_RETRIES = 2;
const DEFAULT_TIMEOUT = 60 * 1000; // 60s

export abstract class APIClient {
  apiKey: string | null;
  baseURL: string;
  maxRetries: number;
  timeout: number;
  httpAgent: Agent | undefined;

  private fetch: typeof NodeFetch;
  protected idempotencyHeader?: string;

  constructor({
    apiKey,
    baseURL,
    maxRetries = DEFAULT_MAX_RETRIES,
    timeout = DEFAULT_TIMEOUT,
    httpAgent,
  }: {
    apiKey: string | null;
    baseURL: string;
    maxRetries?: number;
    timeout: number | undefined;
    httpAgent: Agent | undefined;
  }) {
    this.apiKey = apiKey;
    this.baseURL = baseURL;
    this.maxRetries = validatePositiveInteger('maxRetries', maxRetries);
    this.timeout = validatePositiveInteger('timeout', timeout);
    this.httpAgent = httpAgent;

    if (isNode) {
      this.fetch = nodeFetch!;
    } else {
      // For other environments, use a global fetch function expected to already be present
      if (typeof fetch === 'undefined' || typeof fetch !== 'function') {
        throw new Error(
          `Unexpected; running in a non-Node environment without a global "fetch" function defined.`,
        );
      }
      // For now, we just pretend that Fetch is the same type as NodeFetch.
      this.fetch = fetch as unknown as typeof NodeFetch;
    }
  }

  /**
   * Override this to add your own default headers, for example:
   *
   *  {
   *    ...super.defaultHeaders(),
   *    Authorization: 'Bearer 123',
   *  }
   */
  protected defaultHeaders(): Headers {
    return {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'User-Agent': this.getUserAgent(),
      'X-Stainless-Client-User-Agent': getPlatformPropertiesJSON(),
    };
  }

  /**
   * Override this to add your own qs.stringify options, for example:
   *
   *  {
   *    ...super.qsOptions(),
   *    strictNullHandling: true,
   *  }
   */
  protected qsOptions(): qs.IStringifyOptions | undefined {
    return {};
  }

  protected defaultIdempotencyKey(): string {
    return `stainless-node-retry-${uuid4()}`;
  }

  get<Req, Rsp>(path: string, opts?: RequestOptions<Req>): Promise<Rsp> {
    return this.request({ method: 'get', path, ...opts });
  }
  post<Req, Rsp>(path: string, opts?: RequestOptions<Req>): Promise<Rsp> {
    return this.request({ method: 'post', path, ...opts });
  }
  patch<Req, Rsp>(path: string, opts?: RequestOptions<Req>): Promise<Rsp> {
    return this.request({ method: 'patch', path, ...opts });
  }
  put<Req, Rsp>(path: string, opts?: RequestOptions<Req>): Promise<Rsp> {
    return this.request({ method: 'put', path, ...opts });
  }
  delete<Req, Rsp>(path: string, opts?: RequestOptions<Req>): Promise<Rsp> {
    return this.request({ method: 'delete', path, ...opts });
  }

  getAPIList<Item, PageClass extends AbstractPage<Item> = AbstractPage<Item>>(
    path: string,
    Page: new (...args: any[]) => PageClass,
    opts?: RequestOptions<any>,
  ): PagePromise<PageClass> {
    return this.requestAPIList(Page, { method: 'get', path, ...opts });
  }

  async request<Req, Rsp>(
    options: FinalRequestOptions<Req>,
    retriesRemaining = options.maxRetries ?? this.maxRetries,
  ): Promise<APIResponse<Rsp>> {
    const { method, path, query, headers: headers = {} } = options;
    const body =
      options.body instanceof Readable
        ? options.body
        : options.body
        ? JSON.stringify(options.body, null, 2)
        : null;
    const contentLength = typeof body === 'string' ? body.length.toString() : null;

    const url = this.buildURL(path!, query);
    const httpAgent = options.httpAgent ?? this.httpAgent ?? getDefaultAgent(url);
    const timeout = options.timeout ?? this.timeout;
    validatePositiveInteger('timeout', timeout);

    if (this.idempotencyHeader && method !== 'get') {
      if (!options.idempotencyKey) options.idempotencyKey = this.defaultIdempotencyKey();
      headers[this.idempotencyHeader] = options.idempotencyKey;
    }

    const req: RequestInit = {
      method,
      ...(body && { body }),
      headers: {
        ...(contentLength && { 'Content-Length': contentLength }),
        ...this.defaultHeaders(),
        ...headers,
      },
      ...(httpAgent && { agent: httpAgent }),
    };

    this.debug('request', url, options, req.headers);

    const response = await this.fetchWithTimeout(url, req, timeout).catch(castToError);

    if (response instanceof Error) {
      if (retriesRemaining) return this.retryRequest(options, retriesRemaining);
      if (response.name === 'AbortError') throw new APIConnectionTimeoutError();
      throw new APIConnectionError({ cause: response });
    }

    const responseHeaders = Object.fromEntries(response.headers.entries());

    if (!response.ok) {
      if (retriesRemaining && this.shouldRetry(response)) {
        return this.retryRequest(options, retriesRemaining, responseHeaders);
      }

      const errText = await response.text().catch(() => 'Unknown');
      const errJSON = safeJSON(errText);
      const errMessage = errJSON ? undefined : errText;

      this.debug('response', response.status, url, responseHeaders, errMessage);

      const err = APIError.generate(response.status, errJSON, errMessage, responseHeaders);

      throw err;
    }

    const contentType = response.headers.get('content-type');
    if (contentType?.includes('application/json')) {
      const json = await response.json();

      Object.defineProperty(json, 'responseHeaders', {
        enumerable: false,
        writable: false,
        value: responseHeaders,
      });

      this.debug('response', response.status, url, responseHeaders, json);

      return json as APIResponse<Rsp>;
    } else {
      // TODO handle blob, arraybuffer, other content types, etc.
      const text = response.text();
      this.debug('response', response.status, url, responseHeaders, text);
      return text as Promise<any>;
    }
  }

  requestAPIList<Item = unknown, PageClass extends AbstractPage<Item> = AbstractPage<Item>>(
    Page: new (...args: ConstructorParameters<typeof AbstractPage>) => PageClass,
    options: FinalRequestOptions,
  ): PagePromise<PageClass> {
    const requestPromise = this.request(options) as Promise<APIResponse<unknown>>;
    return new PagePromise(this, requestPromise, options, Page);
  }

  buildURL<Req>(path: string, query: Req | undefined): string {
    const url = isAbsoluteURL(path) ? new URL(path) : new URL(this.baseURL + path);

    if (query) {
      url.search = qs.stringify(query, this.qsOptions());
    }

    return url.toString();
  }

  async fetchWithTimeout(url: RequestInfo, { signal, ...options }: RequestInit = {}, ms: number) {
    const controller = new AbortController();
    if (signal) signal.addEventListener('abort', controller.abort);

    const timeout = setTimeout(() => controller.abort(), ms);

    return this.fetch(url, { signal: controller.signal as any, ...options }).finally(() => {
      clearTimeout(timeout);
    });
  }

  private shouldRetry(response: Response): boolean {
    // Note this is not a standard header.
    const shouldRetryHeader = response.headers.get('x-should-retry');

    // If the server explicitly says whether or not to retry, obey.
    if (shouldRetryHeader === 'true') return true;
    if (shouldRetryHeader === 'false') return false;

    // Retry on lock timeouts.
    if (response.status === 409) return true;

    // Retry on rate limits.
    if (response.status === 429) return true;

    // Retry internal errors.
    if (response.status >= 500) return true;

    return false;
  }

  private async retryRequest<Req, Rsp>(
    options: FinalRequestOptions<Req>,
    retriesRemaining: number,
    responseHeaders?: Headers | undefined,
  ): Promise<Rsp> {
    retriesRemaining -= 1;

    // About the Retry-After header: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Retry-After
    //
    // TODO: we may want to handle the case where the header is using the http-date syntax: "Retry-After: <http-date>".
    // See https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Retry-After#syntax for details.
    const retryAfter = parseInt(responseHeaders?.['retry-after'] || '');

    const maxRetries = options.maxRetries ?? this.maxRetries;
    const timeout = this.calculateRetryTimeoutSeconds(retriesRemaining, retryAfter, maxRetries) * 1000;
    await sleep(timeout);

    return this.request(options, retriesRemaining);
  }

  private calculateRetryTimeoutSeconds(
    retriesRemaining: number,
    retryAfter: number,
    maxRetries: number,
  ): number {
    const initialRetryDelay = 0.5;
    const maxRetryDelay = 2;

    // If the API asks us to wait a certain amount of time (and it's a reasonable amount),
    // just do what it says.
    if (Number.isInteger(retryAfter) && retryAfter <= 60) {
      return retryAfter;
    }

    const numRetries = maxRetries - retriesRemaining;

    // Apply exponential backoff, but not more than the max.
    const sleepSeconds = Math.min(initialRetryDelay * Math.pow(numRetries - 1, 2), maxRetryDelay);

    // Apply some jitter, plus-or-minus half a second.
    const jitter = Math.random() - 0.5;

    return sleepSeconds + jitter;
  }

  private getUserAgent(): string {
    const packageVersion = getPackageVersion();
    return `${this.constructor.name}/JS ${packageVersion}`;
  }

  private debug(action: string, ...args: any[]) {
    if (process.env['DEBUG'] === 'true') {
      console.log(`${this.constructor.name}:DEBUG:${action}`, ...args);
    }
  }
}

export class APIResource {
  protected client: APIClient;
  constructor(client: APIClient) {
    this.client = client;

    this.get = client.get.bind(client);
    this.post = client.post.bind(client);
    this.patch = client.patch.bind(client);
    this.put = client.put.bind(client);
    this.delete = client.delete.bind(client);
    this.getAPIList = client.getAPIList.bind(client);
  }

  protected get: APIClient['get'];
  protected post: APIClient['post'];
  protected patch: APIClient['patch'];
  protected put: APIClient['put'];
  protected delete: APIClient['delete'];
  protected getAPIList: APIClient['getAPIList'];
}

export abstract class AbstractPage<Item> implements AsyncIterable<Item> {
  #client: APIClient;
  protected options: FinalRequestOptions;

  constructor(client: APIClient, response: APIResponse<unknown>, options: FinalRequestOptions) {
    this.#client = client;
    this.options = options;
  }

  abstract nextPageParams(): Partial<Record<string, unknown>> | null;

  abstract getPaginatedItems(): Item[];

  hasNextPage(): boolean {
    const items = this.getPaginatedItems();
    if (!items.length) return false;
    return this.nextPageParams() != null;
  }

  async getNextPage(): Promise<AbstractPage<Item>> {
    const nextQuery = this.nextPageParams();
    if (!nextQuery) {
      throw new Error(
        'No next page expected; please check `.hasNextPage()` before calling `.getNextPage()`.',
      );
    }
    const nextOptions = { ...this.options, query: { ...this.options.query, ...nextQuery } };
    return await this.#client.requestAPIList(this.constructor as any, nextOptions);
  }

  async *iterPages() {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    let page: AbstractPage<Item> = this;
    yield page;
    while (page.hasNextPage()) {
      page = await page.getNextPage();
      yield page;
    }
  }

  async *[Symbol.asyncIterator]() {
    for await (const page of this.iterPages()) {
      for (const item of page.getPaginatedItems()) {
        yield item;
      }
    }
  }
}

export class PagePromise<
    PageClass extends AbstractPage<Item>,
    Item = ReturnType<PageClass['getPaginatedItems']>[number],
  >
  extends Promise<PageClass>
  implements AsyncIterable<Item>
{
  /**
   * This subclass of Promise will resolve to an instantiated Page once the request completes.
   */
  constructor(
    client: APIClient,
    requestPromise: Promise<APIResponse<unknown>>,
    options: FinalRequestOptions,
    Page: new (...args: ConstructorParameters<typeof AbstractPage>) => PageClass,
  ) {
    super((resolve, reject) =>
      requestPromise.then((response) => resolve(new Page(client, response, options))).catch(reject),
    );
  }

  /**
   * Enable subclassing Promise.
   * Ref: https://stackoverflow.com/a/60328122
   */
  static get [Symbol.species]() {
    return Promise;
  }

  /**
   * Allow auto-paginating iteration on an unawaited list call, eg:
   *
   *    for await (const item of client.items.list()) {
   *      console.log(item)
   *    }
   */
  async *[Symbol.asyncIterator]() {
    const page = await this;
    for await (const item of page) {
      yield item;
    }
  }
}

type HTTPMethod = 'get' | 'post' | 'put' | 'patch' | 'delete';

export type Headers = Record<string, string | null | undefined>;
export type KeysEnum<T> = { [P in keyof Required<T>]: true };

export type RequestOptions<Req extends {} = Record<string, unknown> | Readable> = {
  method?: HTTPMethod;
  path?: string;
  query?: Req | undefined;
  body?: Req | undefined;
  headers?: Headers | undefined;

  maxRetries?: number;
  timeout?: number;
  httpAgent?: Agent;
};

// This is required so that we can determine if a given object matches the RequestOptions
// type at runtime. While this requires duplication, it is enforced by the TypeScript
// compiler such that any missing / extraneous keys will cause an error.
const requestOptionsKeys: KeysEnum<RequestOptions> = {
  method: true,
  path: true,
  query: true,
  body: true,
  headers: true,

  maxRetries: true,
  timeout: true,
  httpAgent: true,
};

export const isRequestOptions = (obj: unknown): obj is RequestOptions => {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    !isEmptyObj(obj) &&
    Object.keys(obj).every((k) => k in requestOptionsKeys)
  );
};

export type FinalRequestOptions<Req extends {} = Record<string, unknown> | Readable> = RequestOptions<Req> & {
  method: HTTPMethod;
  path: string;
  idempotencyKey?: string;
};

export type APIResponse<T> = T & {
  responseHeaders: Headers;
};

export class APIError extends Error {
  readonly status: number | undefined;
  readonly headers: Headers | undefined;
  readonly error: Object | undefined;

  constructor(
    status: number | undefined,
    error: Object | undefined,
    message: string | undefined,
    headers: Headers | undefined,
  ) {
    super(message || (error as any)?.message);
    this.status = status;
    this.headers = headers;
    this.error = error;
  }

  static generate(
    status: number | undefined,
    error: Object | undefined,
    message: string | undefined,
    headers: Headers | undefined,
  ) {
    if (!status) return new APIConnectionError({ cause: castToError(error) });

    if (status === 400) return new BadRequestError(status, error, message, headers);
    if (status === 401) return new AuthenticationError(status, error, message, headers);
    if (status === 403) return new PermissionDeniedError(status, error, message, headers);
    if (status === 404) return new NotFoundError(status, error, message, headers);
    if (status === 409) return new ConflictError(status, error, message, headers);
    if (status === 422) return new UnprocessableEntityError(status, error, message, headers);
    if (status === 429) return new RateLimitError(status, error, message, headers);
    if (status >= 500) return new InternalServerError(status, error, message, headers);

    return new APIError(status, error, message, headers);
  }
}

export class BadRequestError extends APIError {
  override readonly status: 400 = 400;
}
export class AuthenticationError extends APIError {
  override readonly status: 401 = 401;
}
export class PermissionDeniedError extends APIError {
  override readonly status: 403 = 403;
}
export class NotFoundError extends APIError {
  override readonly status: 404 = 404;
}
export class ConflictError extends APIError {
  override readonly status: 409 = 409;
}
export class UnprocessableEntityError extends APIError {
  override readonly status: 422 = 422;
}
export class RateLimitError extends APIError {
  override readonly status: 429 = 429;
}
export class InternalServerError extends APIError {}

export class APIConnectionError extends APIError {
  override readonly status: undefined = undefined;

  constructor({ message, cause }: { message?: string; cause?: Error | undefined }) {
    super(undefined, undefined, message || 'Connection error.', undefined);
    // eslint-disable-next-line
    // @ts-ignore
    if (cause) this.cause = cause;
  }
}

export class APIConnectionTimeoutError extends APIConnectionError {
  constructor() {
    super({ message: 'Request timed out.' });
  }
}

let _packageVersion: string;
const getPackageVersion = (): string => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    return (_packageVersion ??= require(pkgUp.sync()!).version);
  } catch (e) {
    console.debug(`Ignoring error while determing package version ${e}`);
    return (_packageVersion = 'unknown');
  }
};

declare const Deno: any;
type PlatformProperties = {
  lang: 'js';
  packageVersion: string;
  os: string;
  arch: string;
  runtime: 'node' | 'deno';
  runtimeVersion: string;
};
const getPlatformProperties = (): PlatformProperties | void => {
  if (typeof process !== 'undefined') {
    return {
      lang: 'js',
      packageVersion: getPackageVersion(),
      os: process.platform,
      arch: process.arch,
      runtime: 'node',
      runtimeVersion: process.version,
    };
  }
  if (typeof Deno !== 'undefined') {
    return {
      lang: 'js',
      packageVersion: getPackageVersion(),
      os: Deno.build.os,
      arch: Deno.build.arch,
      runtime: 'deno',
      runtimeVersion: Deno.version,
    };
  }
  // TODO add support for Cloudflare workers, browsers, etc.
};

let _platformPropertiesJSON: string;
const getPlatformPropertiesJSON = () => {
  return (_platformPropertiesJSON ??= JSON.stringify(getPlatformProperties())) || '';
};

const safeJSON = (text: string) => {
  try {
    return JSON.parse(text);
  } catch (err) {
    return undefined;
  }
};

// https://stackoverflow.com/a/19709846
const startsWithSchemeRegexp = new RegExp('^(?:[a-z]+:)?//', 'i');
const isAbsoluteURL = (url: string): boolean => {
  return startsWithSchemeRegexp.test(url);
};

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const validatePositiveInteger = (name: string, n: number) => {
  if (!Number.isInteger(n)) {
    throw new Error(`${name} must be an integer`);
  }
  if (n < 0) {
    throw new Error(`${name} must be a positive integer`);
  }
  return n;
};

const castToError = (err: any): Error => {
  if (err instanceof Error) return err;
  return new Error(err);
};

const validateFormValue = (value: unknown): string | number | boolean | File | Blob => {
  if (
    typeof value === 'string' ||
    typeof value === 'number' ||
    typeof value === 'boolean' ||
    value instanceof File ||
    value instanceof Blob
  ) {
    return value;
  }

  if (value == null) {
    throw new TypeError(
      `null is not a valid form data value, if you want to pass null then you need to use the string 'null'`,
    );
  }

  throw new TypeError(
    `Invalid value given to form, expected a string, number, boolean, File or Blob but got ${value} instead`,
  );
};

export const multipartFormRequestOptions = <T = Record<string, unknown>>(
  opts: RequestOptions<T>,
): RequestOptions<T | Readable> => {
  const form = new FormData();
  Object.entries(opts.body || {}).forEach(
    ([key, value]) => value !== undefined && form.set(key, validateFormValue(value)),
  );
  const encoder = new FormDataEncoder(form);
  return {
    ...opts,
    headers: { ...opts.headers, ...encoder.headers, 'Content-Length': encoder.contentLength },
    body: Readable.from(encoder),
  };
};

export const coerceInteger = (value: unknown): number => {
  if (typeof value === 'number') return Math.round(value);
  if (typeof value === 'string') return parseInt(value);

  throw new Error(`Could not coerce ${value} (type: ${typeof value}) into a number`);
};

// https://stackoverflow.com/a/34491287
export function isEmptyObj(obj: Object | null | undefined): boolean {
  if (!obj) return true;
  for (const _k in obj) return false;
  return true;
}

/**
 * https://stackoverflow.com/a/2117523
 */
const uuid4 = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};
