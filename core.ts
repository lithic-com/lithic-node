import 'isomorphic-fetch';
import qs from 'qs';

const environments = {
  production: 'https://api.lithic.com/v1',
  sandbox: 'https://sandbox.lithic.com/v1',
};

export class APIClient {
  apiKey: string;
  baseURL: string;

  constructor(
    apiKey: string,
    {
      environment = 'production',
      baseURL,
    }: {environment?: keyof typeof environments; baseURL?: string} = {}
  ) {
    this.apiKey = apiKey;
    if (baseURL) {
      this.baseURL = baseURL;
    } else {
      this.baseURL = environments[environment];
    }
  }
}

export class APIResource {
  baseURL: string;
  apiKey: string;
  constructor(client: APIClient) {
    this.baseURL = client.baseURL;
    this.apiKey = client.apiKey;
  }

  get<Req, Rsp>(path: string, opts?: RequestOptions<Req>): Promise<Rsp> {
    return this.request({method: 'get', path, ...opts});
  }
  post<Req, Rsp>(path: string, opts?: RequestOptions<Req>): Promise<Rsp> {
    return this.request({method: 'post', path, ...opts});
  }
  patch<Req, Rsp>(path: string, opts?: RequestOptions<Req>): Promise<Rsp> {
    return this.request({method: 'patch', path, ...opts});
  }
  put<Req, Rsp>(path: string, opts?: RequestOptions<Req>): Promise<Rsp> {
    return this.request({method: 'put', path, ...opts});
  }
  delete<Req, Rsp>(path: string, opts?: RequestOptions<Req>): Promise<Rsp> {
    return this.request({method: 'delete', path, ...opts});
  }

  async request<Req, Rsp>({
    method,
    path,
    query,
    body,
    headers,
  }: FinalRequestOptions<Req>): Promise<Rsp> {
    const url = this.buildURL(path!, query);

    const options = {
      method,
      ...(body && {body: JSON.stringify(body, null, 2)}),
      headers: {
        ...this.defaultHeaders(),
        ...headers,
      },
    };

    const response = await fetch(url, options);

    if (!response.ok) {
      const errJSON = await response.json().catch((e) => undefined);
      if (errJSON) {
        throw {status: response.status, error: errJSON};
      } else {
        const errText = await response.text().catch((e) => 'Unknown');
        throw {status: response.status, message: errText};
      }
    }

    const contentType = response.headers.get('content-type');
    if (contentType?.indexOf('application/json') !== -1) {
      return response.json();
    } else {
      // TODO handle blob, arraybuffer, other content types, etc.
      return response.text();
    }
  }

  buildURL<Req>(path: string, query: Req | undefined): string {
    const url = new URL(this.baseURL + path);

    if (query) {
      url.search = qs.stringify(query);
    }

    return url.toString();
  }

  defaultHeaders(): Record<string, string> {
    const Authorization = `api-key ${this.apiKey}`;
    return {
      Authorization,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };
  }
}

type HTTPMethod = 'get' | 'post' | 'put' | 'patch' | 'delete';

export type RequestOptions<Req extends {} = Record<string, unknown>> = {
  method?: HTTPMethod;
  path?: string;
  query?: Req | undefined;
  body?: Req | undefined;
  headers?: Record<string, string> | undefined;
};

type FinalRequestOptions<Req extends {} = Record<string, unknown>> =
  RequestOptions<Req> & {
    method: HTTPMethod;
    path: string;
  };

// TODO add metadata.
export type Response<T> = T;

// TODO add auto-pagination.
export type APIListPromise<T> = Promise<{
  data: T[];
  total_entries: number;
  total_pages: number;
  page: number;
}>;
