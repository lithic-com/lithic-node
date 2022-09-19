// File generated from our OpenAPI spec by Stainless.

import * as Core from '~/core';
import { APIResource } from '~/resource';

export class StatusResource extends APIResource {
  retrieve(options?: Core.RequestOptions): Promise<Core.APIResponse<APIStatus>> {
    return this.get('/status', options);
  }
}

export interface APIStatus {
  message?: string;
}
