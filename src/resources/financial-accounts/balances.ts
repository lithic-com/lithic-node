// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { PagePromise, SinglePage } from '../../core/pagination';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Balances extends APIResource {
  /**
   * Get the balances for a given financial account.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const balanceListResponse of client.financialAccounts.balances.list(
   *   '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   * )) {
   *   // ...
   * }
   * ```
   */
  list(
    financialAccountToken: string,
    query: BalanceListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<BalanceListResponsesSinglePage, BalanceListResponse> {
    return this._client.getAPIList(
      path`/v1/financial_accounts/${financialAccountToken}/balances`,
      SinglePage<BalanceListResponse>,
      { query, ...options },
    );
  }
}

export type BalanceListResponsesSinglePage = SinglePage<BalanceListResponse>;

/**
 * Balance of a Financial Account
 */
export interface BalanceListResponse {
  /**
   * Globally unique identifier for the financial account that holds this balance.
   */
  token: string;

  /**
   * Funds available for spend in the currency's smallest unit (e.g., cents for USD)
   */
  available_amount: number;

  /**
   * Date and time for when the balance was first created.
   */
  created: string;

  /**
   * 3-character alphabetic ISO 4217 code for the local currency of the balance.
   */
  currency: string;

  /**
   * Globally unique identifier for the last financial transaction event that
   * impacted this balance.
   */
  last_transaction_event_token: string;

  /**
   * Globally unique identifier for the last financial transaction that impacted this
   * balance.
   */
  last_transaction_token: string;

  /**
   * Funds not available for spend due to card authorizations or pending ACH release.
   * Shown in the currency's smallest unit (e.g., cents for USD).
   */
  pending_amount: number;

  /**
   * The sum of available and pending balance in the currency's smallest unit (e.g.,
   * cents for USD).
   */
  total_amount: number;

  /**
   * Type of financial account.
   */
  type: 'ISSUING' | 'OPERATING' | 'RESERVE' | 'SECURITY';

  /**
   * Date and time for when the balance was last updated.
   */
  updated: string;
}

export interface BalanceListParams {
  /**
   * UTC date of the balance to retrieve. Defaults to latest available balance
   */
  balance_date?: string;

  /**
   * Balance after a given financial event occured. For example, passing the
   * event_token of a $5 CARD_CLEARING financial event will return a balance
   * decreased by $5
   */
  last_transaction_event_token?: string;
}

export declare namespace Balances {
  export {
    type BalanceListResponse as BalanceListResponse,
    type BalanceListResponsesSinglePage as BalanceListResponsesSinglePage,
    type BalanceListParams as BalanceListParams,
  };
}
