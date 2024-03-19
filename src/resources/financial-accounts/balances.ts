// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import * as Core from 'lithic/core';
import { APIResource } from 'lithic/resource';
import { isRequestOptions } from 'lithic/core';
import * as FinancialAccountsBalancesAPI from 'lithic/resources/financial-accounts/balances';
import * as BalancesAPI from 'lithic/resources/balances';
import { BalancesSinglePage } from 'lithic/resources/balances';

export class Balances extends APIResource {
  /**
   * Get the balances for a given financial account.
   */
  list(
    financialAccountToken: string,
    query?: BalanceListParams,
    options?: Core.RequestOptions,
  ): Core.PagePromise<BalancesSinglePage, BalancesAPI.Balance>;
  list(
    financialAccountToken: string,
    options?: Core.RequestOptions,
  ): Core.PagePromise<BalancesSinglePage, BalancesAPI.Balance>;
  list(
    financialAccountToken: string,
    query: BalanceListParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.PagePromise<BalancesSinglePage, BalancesAPI.Balance> {
    if (isRequestOptions(query)) {
      return this.list(financialAccountToken, {}, query);
    }
    return this._client.getAPIList(
      `/financial_accounts/${financialAccountToken}/balances`,
      BalancesSinglePage,
      { query, ...options },
    );
  }
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
  export import BalanceListParams = FinancialAccountsBalancesAPI.BalanceListParams;
}

export { BalancesSinglePage };
