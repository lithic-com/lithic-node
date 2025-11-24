// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { PagePromise, SinglePage } from '../core/pagination';
import { RequestOptions } from '../internal/request-options';

export class Balances extends APIResource {
  /**
   * Get the balances for a program, business, or a given end-user account
   */
  list(
    query: BalanceListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<BalancesSinglePage, Balance> {
    return this._client.getAPIList('/v1/balances', SinglePage<Balance>, { query, ...options });
  }
}

export type BalancesSinglePage = SinglePage<Balance>;

/**
 * Balance
 */
export interface Balance {
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
   * Globally unique identifier for the financial account that holds this balance.
   */
  financial_account_token: string;

  /**
   * Type of financial account.
   */
  financial_account_type: 'ISSUING' | 'OPERATING' | 'RESERVE' | 'SECURITY';

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
   * Date and time for when the balance was last updated.
   */
  updated: string;
}

export interface BalanceListParams {
  /**
   * List balances for all financial accounts of a given account_token.
   */
  account_token?: string;

  /**
   * UTC date and time of the balances to retrieve. Defaults to latest available
   * balances
   */
  balance_date?: string;

  /**
   * List balances for all financial accounts of a given business_account_token.
   */
  business_account_token?: string;

  /**
   * List balances for a given Financial Account type.
   */
  financial_account_type?: 'ISSUING' | 'OPERATING' | 'RESERVE' | 'SECURITY';
}

export declare namespace Balances {
  export {
    type Balance as Balance,
    type BalancesSinglePage as BalancesSinglePage,
    type BalanceListParams as BalanceListParams,
  };
}
