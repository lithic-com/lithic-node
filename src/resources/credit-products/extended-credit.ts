// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../resource';
import * as Core from '../../core';

export class ExtendedCreditResource extends APIResource {
  /**
   * Get the extended credit for a given credit product under a program
   */
  retrieve(creditProductToken: string, options?: Core.RequestOptions): Core.APIPromise<ExtendedCredit> {
    return this._client.get(`/v1/credit_products/${creditProductToken}/extended_credit`, options);
  }
}

export interface ExtendedCredit {
  credit_extended: number;
}

export declare namespace ExtendedCreditResource {
  export { type ExtendedCredit as ExtendedCredit };
}
