// File generated from our OpenAPI spec by Stainless.

import * as Core from 'lithic/core';
import { APIResource } from 'lithic/resource';
import { isRequestOptions } from 'lithic/core';
import * as AggregateBalancesAPI from 'lithic/resources/aggregate-balances';
import { SinglePage } from 'lithic/pagination';

export class AggregateBalances extends APIResource {
  /**
   * Get the aggregated balance across all end-user accounts by financial account
   * type
   */
  list(
    query?: AggregateBalanceListParams,
    options?: Core.RequestOptions,
  ): Core.PagePromise<AggregateBalancesSinglePage, AggregateBalance>;
  list(options?: Core.RequestOptions): Core.PagePromise<AggregateBalancesSinglePage, AggregateBalance>;
  list(
    query: AggregateBalanceListParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.PagePromise<AggregateBalancesSinglePage, AggregateBalance> {
    if (isRequestOptions(query)) {
      return this.list({}, query);
    }
    return this._client.getAPIList('/aggregate_balances', AggregateBalancesSinglePage, { query, ...options });
  }
}

export class AggregateBalancesSinglePage extends SinglePage<AggregateBalance> {}

/**
 * Aggregate Balance across all end-user accounts
 */
export interface AggregateBalance {
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
   * Type of financial account
   */
  financial_account_type: 'ISSUING' | 'RESERVE';

  /**
   * Globally unique identifier for the financial account that had its balance
   * updated most recently
   */
  last_financial_account_token: string;

  /**
   * Globally unique identifier for the last transaction event that impacted this
   * balance
   */
  last_transaction_event_token: string;

  /**
   * Globally unique identifier for the last transaction that impacted this balance
   */
  last_transaction_token: string;

  /**
   * Funds not available for spend due to card authorizations or pending ACH release.
   * Shown in the currency's smallest unit (e.g., cents for USD)
   */
  pending_amount: number;

  /**
   * The sum of available and pending balance in the currency's smallest unit (e.g.,
   * cents for USD)
   */
  total_amount: number;

  /**
   * Date and time for when the balance was last updated.
   */
  updated: string;
}

export interface AggregateBalanceListParams {
  /**
   * Get the aggregate balance for a given Financial Account type.
   */
  financial_account_type?: 'ISSUING' | 'RESERVE';
}

export namespace AggregateBalances {
  export import AggregateBalance = AggregateBalancesAPI.AggregateBalance;
  export import AggregateBalancesSinglePage = AggregateBalancesAPI.AggregateBalancesSinglePage;
  export import AggregateBalanceListParams = AggregateBalancesAPI.AggregateBalanceListParams;
}
