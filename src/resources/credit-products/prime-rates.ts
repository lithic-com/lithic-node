// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class PrimeRates extends APIResource {
  /**
   * Post Credit Product Prime Rate
   */
  create(
    creditProductToken: string,
    body: PrimeRateCreateParams,
    options?: RequestOptions,
  ): APIPromise<void> {
    return this._client.post(path`/v1/credit_products/${creditProductToken}/prime_rates`, {
      body,
      ...options,
    });
  }

  /**
   * Get Credit Product Prime Rates
   */
  retrieve(
    creditProductToken: string,
    query: PrimeRateRetrieveParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<PrimeRateRetrieveResponse> {
    return this._client.get(path`/v1/credit_products/${creditProductToken}/prime_rates`, {
      query,
      ...options,
    });
  }
}

export interface PrimeRateRetrieveResponse {
  /**
   * List of prime rates
   */
  data: Array<PrimeRateRetrieveResponse.Data>;

  /**
   * Whether there are more prime rates
   */
  has_more: boolean;
}

export namespace PrimeRateRetrieveResponse {
  export interface Data {
    /**
     * Date the rate goes into effect
     */
    effective_date: string;

    /**
     * The rate in decimal format
     */
    rate: string;
  }
}

export interface PrimeRateCreateParams {
  /**
   * Date the rate goes into effect
   */
  effective_date: string;

  /**
   * The rate in decimal format
   */
  rate: string;
}

export interface PrimeRateRetrieveParams {
  /**
   * The effective date that the prime rates ends before
   */
  ending_before?: string;

  /**
   * The effective date that the prime rate starts after
   */
  starting_after?: string;
}

export declare namespace PrimeRates {
  export {
    type PrimeRateRetrieveResponse as PrimeRateRetrieveResponse,
    type PrimeRateCreateParams as PrimeRateCreateParams,
    type PrimeRateRetrieveParams as PrimeRateRetrieveParams,
  };
}
