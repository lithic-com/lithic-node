// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { PagePromise, SinglePage } from '../core/pagination';
import { RequestOptions } from '../internal/request-options';

export class AggregateBalances extends APIResource {
  /**
   * Get the aggregated balance across all end-user accounts by financial account
   * type
   */
  list(
    query: AggregateBalanceListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<AggregateBalancesSinglePage, AggregateBalance> {
    return this._client.getAPIList('/v1/aggregate_balances', SinglePage<AggregateBalance>, {
      query,
      ...options,
    });
  }
}

export type AggregateBalancesSinglePage = SinglePage<AggregateBalance>;

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
   * 3-character alphabetic ISO 4217 code for the local currency of the balance.
   */
  currency: string;

  /**
   * Type of financial account
   */
  financial_account_type: 'ISSUING' | 'OPERATING' | 'RESERVE' | 'SECURITY';

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
  financial_account_type?: 'ISSUING' | 'OPERATING' | 'RESERVE' | 'SECURITY';
}

export declare namespace AggregateBalances {
  export {
    type AggregateBalance as AggregateBalance,
    type AggregateBalancesSinglePage as AggregateBalancesSinglePage,
    type AggregateBalanceListParams as AggregateBalanceListParams,
  };
}
