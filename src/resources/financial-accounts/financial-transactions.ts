// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as FinancialAccountsAPI from './financial-accounts';
import { FinancialTransactionsSinglePage } from './financial-accounts';
import { APIPromise } from '../../core/api-promise';
import { PagePromise, SinglePage } from '../../core/pagination';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class FinancialTransactions extends APIResource {
  /**
   * Get the financial transaction for the provided token.
   *
   * @example
   * ```ts
   * const financialTransaction =
   *   await client.financialAccounts.financialTransactions.retrieve(
   *     '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   *     {
   *       financial_account_token:
   *         '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   *     },
   *   );
   * ```
   */
  retrieve(
    financialTransactionToken: string,
    params: FinancialTransactionRetrieveParams,
    options?: RequestOptions,
  ): APIPromise<FinancialAccountsAPI.FinancialTransaction> {
    const { financial_account_token } = params;
    return this._client.get(
      path`/v1/financial_accounts/${financial_account_token}/financial_transactions/${financialTransactionToken}`,
      options,
    );
  }

  /**
   * List the financial transactions for a given financial account.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const financialTransaction of client.financialAccounts.financialTransactions.list(
   *   '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   * )) {
   *   // ...
   * }
   * ```
   */
  list(
    financialAccountToken: string,
    query: FinancialTransactionListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<FinancialTransactionsSinglePage, FinancialAccountsAPI.FinancialTransaction> {
    return this._client.getAPIList(
      path`/v1/financial_accounts/${financialAccountToken}/financial_transactions`,
      SinglePage<FinancialAccountsAPI.FinancialTransaction>,
      { query, ...options },
    );
  }
}

export interface FinancialTransactionRetrieveParams {
  /**
   * Globally unique identifier for financial account.
   */
  financial_account_token: string;
}

export interface FinancialTransactionListParams {
  /**
   * Date string in RFC 3339 format. Only entries created after the specified time
   * will be included. UTC time zone.
   */
  begin?: string;

  /**
   * Financial Transaction category to be returned.
   */
  category?: 'ACH' | 'CARD' | 'INTERNAL' | 'TRANSFER';

  /**
   * Date string in RFC 3339 format. Only entries created before the specified time
   * will be included. UTC time zone.
   */
  end?: string;

  /**
   * A cursor representing an item's token before which a page of results should end.
   * Used to retrieve the previous page of results before this item.
   */
  ending_before?: string;

  /**
   * Financial Transaction result to be returned.
   */
  result?: 'APPROVED' | 'DECLINED';

  /**
   * A cursor representing an item's token after which a page of results should
   * begin. Used to retrieve the next page of results after this item.
   */
  starting_after?: string;

  /**
   * Financial Transaction status to be returned.
   */
  status?: 'DECLINED' | 'EXPIRED' | 'PENDING' | 'RETURNED' | 'SETTLED' | 'VOIDED';
}

export declare namespace FinancialTransactions {
  export {
    type FinancialTransactionRetrieveParams as FinancialTransactionRetrieveParams,
    type FinancialTransactionListParams as FinancialTransactionListParams,
  };
}

export { type FinancialTransactionsSinglePage };
