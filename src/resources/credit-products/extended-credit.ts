// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../resource';
import * as Core from '../../core';
import * as ExtendedCreditAPI from './extended-credit';

export class ExtendedCreditResource extends APIResource {
  /**
   * Get the extended credit for a given credit product under a program
   */
  retrieve(creditProductId: string, options?: Core.RequestOptions): Core.APIPromise<ExtendedCredit> {
    return this._client.get(`/v1/credit_products/${creditProductId}/extended_credit`, options);
  }
}

export interface ExtendedCredit {
  credit_extended: number;
}

export namespace ExtendedCreditResource {
  export import ExtendedCredit = ExtendedCreditAPI.ExtendedCredit;
}
