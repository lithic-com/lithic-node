// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class ExtendedCreditResource extends APIResource {
  /**
   * Get the extended credit for a given credit product under a program
   */
  retrieve(creditProductToken: string, options?: RequestOptions): APIPromise<ExtendedCredit> {
    return this._client.get(path`/v1/credit_products/${creditProductToken}/extended_credit`, options);
  }
}

export interface ExtendedCredit {
  credit_extended: number;
}

export declare namespace ExtendedCreditResource {
  export { type ExtendedCredit as ExtendedCredit };
}
