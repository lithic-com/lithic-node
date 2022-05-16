import qs from 'qs';
import pkgUp from 'pkg-up';

import type { Agent } from 'http';
import type NodeFetch from 'node-fetch';
import type { RequestInfo, RequestInit, Response } from 'node-fetch';
import type KeepAliveAgent from 'agentkeepalive';
import { AbortController, AbortSignal } from 'abort-controller';

import { makeAutoPaginationMethods, AutoPaginationMethods } from './pagination';

const isNode = typeof process !== 'undefined';
let nodeFetch: typeof NodeFetch | undefined = undefined;
let getDefaultAgent = (url: string): Agent | undefined => undefined;
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

  async request<Req, Rsp>(
    options: FinalRequestOptions<Req>,
    retriesRemaining = options.maxRetries ?? this.maxRetries,
  ): Promise<APIResponse<Rsp>> {
    const { method, path, query, body, headers } = options;

    const url = this.buildURL(path!, query);
    const jsonBody = body && JSON.stringify(body, null, 2);
    const contentLength = jsonBody?.length.toString();

    const httpAgent = options.httpAgent ?? this.httpAgent ?? getDefaultAgent(url);
    const timeout = options.timeout ?? this.timeout;
    validatePositiveInteger('timeout', timeout);

    const req: RequestInit = {
      method,
      ...(jsonBody && { body: jsonBody }),
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

  requestAPIList<Req, Rsp>(options: FinalRequestOptions<Req>): APIListPromise<Rsp> {
    const requestPromise = this.request(options) as Promise<APIList<Rsp>>;
    const autoPaginationMethods = makeAutoPaginationMethods(this, requestPromise, options);
    return Object.assign(requestPromise, autoPaginationMethods);
  }

  abstract getNextPageQuery(request: FinalRequestOptions<Object>, response: APIList<unknown>): Object | false;

  abstract getPaginatedItems<Rsp>(response: APIList<Rsp>): Rsp[];

  private buildURL<Req>(path: string, query: Req | undefined): string {
    const url = new URL(this.baseURL + path);

    if (query) {
      url.search = qs.stringify(query);
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
  }

  protected get<Req, Rsp>(path: string, opts?: RequestOptions<Req>): Promise<Rsp> {
    return this.client.request({ method: 'get', path, ...opts });
  }
  protected post<Req, Rsp>(path: string, opts?: RequestOptions<Req>): Promise<Rsp> {
    return this.client.request({ method: 'post', path, ...opts });
  }
  protected patch<Req, Rsp>(path: string, opts?: RequestOptions<Req>): Promise<Rsp> {
    return this.client.request({ method: 'patch', path, ...opts });
  }
  protected put<Req, Rsp>(path: string, opts?: RequestOptions<Req>): Promise<Rsp> {
    return this.client.request({ method: 'put', path, ...opts });
  }
  protected delete<Req, Rsp>(path: string, opts?: RequestOptions<Req>): Promise<Rsp> {
    return this.client.request({ method: 'delete', path, ...opts });
  }

  protected getAPIList<Req, Rsp>(path: string, opts?: RequestOptions<Req>): APIListPromise<Rsp> {
    return this.client.requestAPIList({ method: 'get', path, ...opts });
  }
}

type HTTPMethod = 'get' | 'post' | 'put' | 'patch' | 'delete';

export type Headers = Record<string, string>;

export type RequestOptions<Req extends {} = Record<string, unknown>> = {
  method?: HTTPMethod;
  path?: string;
  query?: Req | undefined;
  body?: Req | undefined;
  headers?: Headers | undefined;

  maxRetries?: number;
  timeout?: number;
  httpAgent?: Agent;
};

export type FinalRequestOptions<Req extends {} = Record<string, unknown>> = RequestOptions<Req> & {
  method: HTTPMethod;
  path: string;
};

export type APIResponse<T> = T & {
  responseHeaders: Headers;
};

export type APIList<Rsp> = APIResponse<{
  data: Rsp[];
  page: number;
  total_pages: number;
  total_entries: number;
}>;

export interface APIListPromise<Rsp> extends Promise<APIResponse<APIList<Rsp>>>, AutoPaginationMethods<Rsp> {}

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
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  return (_packageVersion ??= require(pkgUp.sync()!).version);
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
