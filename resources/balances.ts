// File generated from our OpenAPI spec by Stainless.

import * as Core from '~/core';
import { APIResource } from '~/resource';
import { isRequestOptions } from '~/core';
import * as API from './';
import { SinglePage } from '~/pagination';

export class Balances extends APIResource {
  /**
   * Get the balances for a program or a given end-user account
   */
  list(query?: BalanceListParams, options?: Core.RequestOptions): Core.PagePromise<BalancesSinglePage>;
  list(options?: Core.RequestOptions): Core.PagePromise<BalancesSinglePage>;
  list(
    query: BalanceListParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.PagePromise<BalancesSinglePage> {
    if (isRequestOptions(query)) {
      return this.list({}, query);
    }
    return this.getAPIList('/balances', BalancesSinglePage, { query, ...options });
  }
}

export class BalancesSinglePage extends SinglePage<Balance> {}

/**
 * Balance of a Financial Account
 */
export interface Balance {
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
  type: 'ISSUING' | 'RESERVE';

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
   * List balances for a given Financial Account type.
   */
  financial_account_type?: 'ISSUING' | 'RESERVE';
}

export namespace Balances {
  export import Balance = API.Balance;
  export import BalancesSinglePage = API.BalancesSinglePage;
  export import BalanceListParams = API.BalanceListParams;
}
