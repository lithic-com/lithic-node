// File generated from our OpenAPI spec by Stainless.

import * as Core from '../core';
import { isRequestOptions } from '../core';
import * as Shared from './shared';

export class StatusResource extends Core.APIResource {
  retrieve(options?: Core.RequestOptions): Promise<Core.APIResponse<APIStatus>> {
    return this.get('/status', options);
  }
}

export interface APIStatus {
  message?: string;
}
