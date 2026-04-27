// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as FinancialAccountsAPI from './financial-accounts';
import { FinancialAccountBalancesSinglePage } from './financial-accounts';
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
   * for await (const financialAccountBalance of client.financialAccounts.balances.list(
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
  ): PagePromise<FinancialAccountBalancesSinglePage, FinancialAccountsAPI.FinancialAccountBalance> {
    return this._client.getAPIList(
      path`/v1/financial_accounts/${financialAccountToken}/balances`,
      SinglePage<FinancialAccountsAPI.FinancialAccountBalance>,
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

export declare namespace Balances {
  export { type BalanceListParams as BalanceListParams };
}

export { type FinancialAccountBalancesSinglePage };
