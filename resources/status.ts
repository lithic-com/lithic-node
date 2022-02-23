// File generated from our OpenAPI spec by Stainless.
import * as Core from '../core';

export class Status extends Core.APIResource {
  retrieve(options?: Core.RequestOptions): Promise<Core.Response<ApiStatus>> {
    return this.get('/status', options);
  }
}

export interface ApiStatus {
  message?: string;
}
