import {AutoPaginationMethods} from './pagination';
export declare abstract class APIClient {
  apiKey: string;
  baseURL: string;
  maxRetries: number;
  constructor({
    apiKey,
    baseURL,
    maxRetries,
  }: {
    apiKey: string;
    baseURL: string;
    maxRetries?: number;
  });
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
  request<Req, Rsp>(
    options: FinalRequestOptions<Req>,
    retriesRemaining?: number
  ): Promise<APIResponse<Rsp>>;
  requestAPIList<Req, Rsp>(
    options: FinalRequestOptions<Req>
  ): APIListPromise<Rsp>;
  abstract getNextPageQuery(
    request: FinalRequestOptions<Object>,
    response: APIList<unknown>
  ): Object | false;
  abstract getPaginatedItems<Rsp>(response: APIList<Rsp>): Rsp[];
  buildURL<Req>(path: string, query: Req | undefined): string;
  shouldRetry(response: Response): boolean;
  retryRequest<Req, Rsp>(
    options: FinalRequestOptions<Req>,
    retriesRemaining: number,
    responseHeaders?: Headers | undefined
  ): Promise<Rsp>;
  calculateRetryTimeoutSeconds(
    retriesRemaining: number,
    retryAfter: number,
    maxRetries: number
  ): number;
}
export declare class APIResource {
  client: APIClient;
  constructor(client: APIClient);
  get<Req, Rsp>(path: string, opts?: RequestOptions<Req>): Promise<Rsp>;
  post<Req, Rsp>(path: string, opts?: RequestOptions<Req>): Promise<Rsp>;
  patch<Req, Rsp>(path: string, opts?: RequestOptions<Req>): Promise<Rsp>;
  put<Req, Rsp>(path: string, opts?: RequestOptions<Req>): Promise<Rsp>;
  delete<Req, Rsp>(path: string, opts?: RequestOptions<Req>): Promise<Rsp>;
  getAPIList<Req, Rsp>(
    path: string,
    opts?: RequestOptions<Req>
  ): APIListPromise<Rsp>;
}
declare type HTTPMethod = 'get' | 'post' | 'put' | 'patch' | 'delete';
export declare type Headers = Record<string, string>;
export declare type RequestOptions<Req extends {} = Record<string, unknown>> = {
  method?: HTTPMethod;
  path?: string;
  query?: Req | undefined;
  body?: Req | undefined;
  headers?: Headers | undefined;
  maxRetries?: number;
};
export declare type FinalRequestOptions<
  Req extends {} = Record<string, unknown>
> = RequestOptions<Req> & {
  method: HTTPMethod;
  path: string;
};
export declare type APIResponse<T> = T & {
  responseHeaders: Headers;
};
export declare type APIList<Rsp> = APIResponse<{
  data: Rsp[];
  total_entries: number;
  total_pages: number;
  page: number;
}>;
export interface APIListPromise<Rsp>
  extends Promise<APIResponse<APIList<Rsp>>>,
    AutoPaginationMethods<Rsp> {}
export declare class APIError extends Error {
  readonly status: number | undefined;
  readonly headers: Headers | undefined;
  readonly error: Object | undefined;
  constructor(
    status: number | undefined,
    error: Object | undefined,
    message: string | undefined,
    headers: Headers | undefined
  );
  static generate(
    status: number | undefined,
    error: Object | undefined,
    message: string | undefined,
    headers: Headers | undefined
  ): APIError;
}
export declare class BadRequestError extends APIError {
  readonly status: 400;
}
export declare class AuthenticationError extends APIError {
  readonly status: 401;
}
export declare class PermissionDeniedError extends APIError {
  readonly status: 403;
}
export declare class NotFoundError extends APIError {
  readonly status: 404;
}
export declare class ConflictError extends APIError {
  readonly status: 409;
}
export declare class UnprocessableEntityError extends APIError {
  readonly status: 422;
}
export declare class RateLimitError extends APIError {
  readonly status: 429;
}
export declare class InternalServerError extends APIError {}
export declare class APIConnectionError extends APIError {
  readonly status: undefined;
  constructor();
}
export {};
