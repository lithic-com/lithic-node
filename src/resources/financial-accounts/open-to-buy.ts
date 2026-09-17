// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class OpenToBuyResource extends APIResource {
  /**
   * Get the funds available for card spend backed by a given Security Account, along
   * with the balances that amount is derived from.
   *
   * Open to buy is the amount Lithic authorizes card spend against. It is not a
   * stored balance, so it is recalculated on every request from the Security
   * Account, the funds held against spend Lithic has already paid out to the
   * networks on your behalf, and the spend that has not yet been collected. The
   * accounts that feed the calculation depend on your program setup, so
   * `summary.settled_funds` is `null` outside Commercial Charge.
   *
   * Supported for Commercial Charge, Dynamic Reserve, and Secured Charge programs.
   * Returns `404` if `financial_account_token` is not a Security Account you own, or
   * if your program setup does not use an open to buy calculation.
   *
   * @example
   * ```ts
   * const openToBuy =
   *   await client.financialAccounts.openToBuy.retrieve(
   *     '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   *   );
   * ```
   */
  retrieve(financialAccountToken: string, options?: RequestOptions): APIPromise<OpenToBuy> {
    return this._client.get(path`/v1/financial_accounts/${financialAccountToken}/open_to_buy`, options);
  }
}

/**
 * Open to Buy
 */
export interface OpenToBuy {
  /**
   * Funds available for card spend backed by this Security Account, in the
   * currency's smallest unit (e.g., cents for USD). Equal to the sum of the amounts
   * in `summary`, and reaches zero once outstanding spend has consumed all available
   * funding
   */
  open_to_buy: number;

  /**
   * Balances that open to buy is derived from
   */
  summary: OpenToBuySummary;
}

/**
 * Open to Buy Summary
 */
export interface OpenToBuySummary {
  /**
   * Available balance of the Security Account backing card spend, in the currency's
   * smallest unit (e.g., cents for USD)
   */
  security: number;

  /**
   * Funding that has moved out of the Security Account to cover card spend Lithic
   * has already paid out to the networks, in the currency's smallest unit (e.g.,
   * cents for USD). Open to buy counts it alongside `security`, and it clears once
   * collected from your business clients. Only Commercial Charge tracks this
   * separately, so this is `null` for every other program setup
   */
  settled_funds: number | null;

  /**
   * Customer card spend that has not yet been collected, in the currency's smallest
   * unit (e.g., cents for USD). Reported as a negative amount, because it reduces
   * open to buy
   */
  total_outstanding_spend: number;
}

export declare namespace OpenToBuyResource {
  export { type OpenToBuy as OpenToBuy, type OpenToBuySummary as OpenToBuySummary };
}
