import fetch from 'cross-fetch';
import qs from 'qs';
import {makeAutoPaginationMethods, AutoPaginationMethods} from './pagination';

export abstract class APIClient {
  apiKey: string;
  baseURL: string;
  maxRetries: number;
  constructor({
    apiKey,
    baseURL,
    maxRetries = 2,
  }: {
    apiKey: string;
    baseURL: string;
    maxRetries?: number;
  }) {
    this.apiKey = apiKey;
    this.baseURL = baseURL;
    this.maxRetries = maxRetries;
  }

  /**
   * Should return an object like:
   *
   *  {
   *    Authorization: 'Bearer 123',
   *    Accept: 'application/json',
   *    'Content-Type': 'application/json',
   *  }
   */
  abstract defaultHeaders(): Headers;

  async request<Req, Rsp>(
    options: FinalRequestOptions<Req>,
    retriesRemaining = options.maxRetries ?? this.maxRetries
  ): Promise<APIResponse<Rsp>> {
    const {method, path, query, body, headers} = options;

    const url = this.buildURL(path!, query);

    const req: RequestInit = {
      method,
      ...(body && {body: JSON.stringify(body, null, 2)}),
      headers: {
        ...this.defaultHeaders(),
        ...headers,
      },
    };

    const response = await fetch(url, req).catch(() => null);

    if (!response) {
      if (retriesRemaining) return this.retryRequest(options, retriesRemaining);

      throw new APIConnectionError();
    }

    const responseHeaders = Object.fromEntries(response.headers.entries());

    if (!response.ok) {
      if (retriesRemaining && this.shouldRetry(response)) {
        return this.retryRequest(options, retriesRemaining, responseHeaders);
      }

      const errText = await response.text().catch(() => 'Unknown');
      const errJSON = safeJSON(errText);
      const errMessage = errJSON ? undefined : errText;

      const err = APIError.generate(
        response.status,
        errJSON,
        errMessage,
        responseHeaders
      );

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

      return json as APIResponse<Rsp>;
    } else {
      // TODO handle blob, arraybuffer, other content types, etc.
      return response.text() as Promise<any>;
    }
  }

  requestAPIList<Req, Rsp>(
    options: FinalRequestOptions<Req>
  ): APIListPromise<Rsp> {
    const requestPromise = this.request(options) as Promise<APIList<Rsp>>;
    const autoPaginationMethods = makeAutoPaginationMethods(
      this,
      requestPromise,
      options
    );
    return Object.assign(requestPromise, autoPaginationMethods);
  }

  abstract getNextPageQuery(
    request: FinalRequestOptions<Object>,
    response: APIList<unknown>
  ): Object | false;

  abstract getPaginatedItems<Rsp>(response: APIList<Rsp>): Rsp[];

  buildURL<Req>(path: string, query: Req | undefined): string {
    const url = new URL(this.baseURL + path);

    if (query) {
      url.search = qs.stringify(query);
    }

    return url.toString();
  }

  shouldRetry(response: Response): boolean {
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

  async retryRequest<Req, Rsp>(
    options: FinalRequestOptions<Req>,
    retriesRemaining: number,
    responseHeaders?: Headers | undefined
  ): Promise<Rsp> {
    retriesRemaining -= 1;

    // About the Retry-After header: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Retry-After
    const retryAfter = parseInt(responseHeaders?.['retry-after'] || '');

    const maxRetries = options.maxRetries ?? this.maxRetries;
    const timeout =
      this.calculateRetryTimeoutSeconds(
        retriesRemaining,
        retryAfter,
        maxRetries
      ) * 1000;
    await sleep(timeout);

    return this.request(options, retriesRemaining);
  }

  calculateRetryTimeoutSeconds(
    retriesRemaining: number,
    retryAfter: number,
    maxRetries: number
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
    const sleepSeconds = Math.min(
      initialRetryDelay * Math.pow(numRetries - 1, 2),
      maxRetryDelay
    );

    // Apply some jitter, plus-or-minus half a second.
    const jitter = Math.random() - 0.5;

    return sleepSeconds + jitter;
  }
}

export class APIResource {
  client: APIClient;
  constructor(client: APIClient) {
    this.client = client;
  }

  get<Req, Rsp>(path: string, opts?: RequestOptions<Req>): Promise<Rsp> {
    return this.client.request({method: 'get', path, ...opts});
  }
  post<Req, Rsp>(path: string, opts?: RequestOptions<Req>): Promise<Rsp> {
    return this.client.request({method: 'post', path, ...opts});
  }
  patch<Req, Rsp>(path: string, opts?: RequestOptions<Req>): Promise<Rsp> {
    return this.client.request({method: 'patch', path, ...opts});
  }
  put<Req, Rsp>(path: string, opts?: RequestOptions<Req>): Promise<Rsp> {
    return this.client.request({method: 'put', path, ...opts});
  }
  delete<Req, Rsp>(path: string, opts?: RequestOptions<Req>): Promise<Rsp> {
    return this.client.request({method: 'delete', path, ...opts});
  }

  getAPIList<Req, Rsp>(
    path: string,
    opts?: RequestOptions<Req>
  ): APIListPromise<Rsp> {
    return this.client.requestAPIList({method: 'get', path, ...opts});
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
};

export type FinalRequestOptions<Req extends {} = Record<string, unknown>> =
  RequestOptions<Req> & {
    method: HTTPMethod;
    path: string;
  };

export type APIResponse<T> = T & {
  responseHeaders: Headers;
};

export type APIList<Rsp> = APIResponse<{
  data: Rsp[];
  total_entries: number;
  total_pages: number;
  page: number;
}>;

export interface APIListPromise<Rsp>
  extends Promise<APIResponse<APIList<Rsp>>>,
    AutoPaginationMethods<Rsp> {}

export class APIError extends Error {
  readonly status: number | undefined;
  readonly headers: Headers | undefined;
  readonly error: Object | undefined;

  constructor(
    status: number | undefined,
    error: Object | undefined,
    message: string | undefined,
    headers: Headers | undefined
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
    headers: Headers | undefined
  ) {
    if (!status) return new APIConnectionError();

    if (status === 400)
      return new BadRequestError(status, error, message, headers);
    if (status === 401)
      return new AuthenticationError(status, error, message, headers);
    if (status === 403)
      return new PermissionDeniedError(status, error, message, headers);
    if (status === 404)
      return new NotFoundError(status, error, message, headers);
    if (status === 409)
      return new ConflictError(status, error, message, headers);
    if (status === 422)
      return new UnprocessableEntityError(status, error, message, headers);
    if (status === 429)
      return new RateLimitError(status, error, message, headers);
    if (status >= 500)
      return new InternalServerError(status, error, message, headers);

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
  override readonly status: undefined;

  constructor() {
    super(undefined, undefined, 'Connection error.', undefined);
  }
}

const safeJSON = (text: string) => {
  try {
    return JSON.parse(text);
  } catch (err) {
    return undefined;
  }
};

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
