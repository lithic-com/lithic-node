// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { PagePromise, SinglePage } from '../../core/pagination';
import { RequestOptions } from '../../internal/request-options';

export class AggregateBalances extends APIResource {
  /**
   * Get the aggregated card balance across all end-user accounts.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const aggregateBalanceListResponse of client.cards.aggregateBalances.list()) {
   *   // ...
   * }
   * ```
   */
  list(
    query: AggregateBalanceListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<AggregateBalanceListResponsesSinglePage, AggregateBalanceListResponse> {
    return this._client.getAPIList('/v1/cards/aggregate_balances', SinglePage<AggregateBalanceListResponse>, {
      query,
      ...options,
    });
  }
}

export type AggregateBalanceListResponsesSinglePage = SinglePage<AggregateBalanceListResponse>;

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
   * 3-character alphabetic ISO 4217 code for the local currency of the balance.
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

export declare namespace AggregateBalances {
  export {
    type AggregateBalanceListResponse as AggregateBalanceListResponse,
    type AggregateBalanceListResponsesSinglePage as AggregateBalanceListResponsesSinglePage,
    type AggregateBalanceListParams as AggregateBalanceListParams,
  };
}
