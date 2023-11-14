// File generated from our OpenAPI spec by Stainless.

import * as Core from 'lithic/core';
import { APIResource } from 'lithic/resource';
import { isRequestOptions } from 'lithic/core';
import * as AggregateBalancesAPI from 'lithic/resources/cards/aggregate-balances';
import { SinglePage } from 'lithic/pagination';

export class AggregateBalances extends APIResource {
  /**
   * Get the aggregated card balance across all end-user accounts.
   */
  list(
    query?: AggregateBalanceListParams,
    options?: Core.RequestOptions,
  ): Core.PagePromise<AggregateBalanceListResponsesSinglePage, AggregateBalanceListResponse>;
  list(
    options?: Core.RequestOptions,
  ): Core.PagePromise<AggregateBalanceListResponsesSinglePage, AggregateBalanceListResponse>;
  list(
    query: AggregateBalanceListParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.PagePromise<AggregateBalanceListResponsesSinglePage, AggregateBalanceListResponse> {
    if (isRequestOptions(query)) {
      return this.list({}, query);
    }
    return this._client.getAPIList('/cards/aggregate_balances', AggregateBalanceListResponsesSinglePage, {
      query,
      ...options,
    });
  }
}

export class AggregateBalanceListResponsesSinglePage extends SinglePage<AggregateBalanceListResponse> {}

/**
 * Card Aggregate Balance across all end-user accounts
 */
export interface AggregateBalanceListResponse {
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
   * Globally unique identifier for the card that had its balance updated most
   * recently
   */
  last_card_token: string;

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
   * Cardholder to retrieve aggregate balances for.
   */
  account_token?: string;

  /**
   * Business to retrieve aggregate balances for.
   */
  business_account_token?: string;
}

export namespace AggregateBalances {
  export import AggregateBalanceListResponse = AggregateBalancesAPI.AggregateBalanceListResponse;
  export import AggregateBalanceListResponsesSinglePage = AggregateBalancesAPI.AggregateBalanceListResponsesSinglePage;
  export import AggregateBalanceListParams = AggregateBalancesAPI.AggregateBalanceListParams;
}
