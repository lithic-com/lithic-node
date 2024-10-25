// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../resource';
import { isRequestOptions } from '../../core';
import * as Core from '../../core';
import * as BalancesAPI from './balances';
import { SinglePage } from '../../pagination';

export class Balances extends APIResource {
  /**
   * Get the balances for a given financial account.
   */
  list(
    financialAccountToken: string,
    query?: BalanceListParams,
    options?: Core.RequestOptions,
  ): Core.PagePromise<BalanceListResponsesSinglePage, BalanceListResponse>;
  list(
    financialAccountToken: string,
    options?: Core.RequestOptions,
  ): Core.PagePromise<BalanceListResponsesSinglePage, BalanceListResponse>;
  list(
    financialAccountToken: string,
    query: BalanceListParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.PagePromise<BalanceListResponsesSinglePage, BalanceListResponse> {
    if (isRequestOptions(query)) {
      return this.list(financialAccountToken, {}, query);
    }
    return this._client.getAPIList(
      `/v1/financial_accounts/${financialAccountToken}/balances`,
      BalanceListResponsesSinglePage,
      { query, ...options },
    );
  }
}

export class BalanceListResponsesSinglePage extends SinglePage<BalanceListResponse> {}

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
   * 3-digit alphabetic ISO 4217 code for the local currency of the balance.
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
  type: 'ISSUING' | 'OPERATING' | 'RESERVE';

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

export namespace Balances {
  export type BalanceListResponse = BalancesAPI.BalanceListResponse;
  export import BalanceListResponsesSinglePage = BalancesAPI.BalanceListResponsesSinglePage;
  export type BalanceListParams = BalancesAPI.BalanceListParams;
}
