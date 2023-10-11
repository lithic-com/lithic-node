// File generated from our OpenAPI spec by Stainless.

import * as Core from 'lithic/core';
import { APIResource } from 'lithic/resource';
import { isRequestOptions } from 'lithic/core';
import * as FinancialTransactionsAPI from 'lithic/resources/financial-accounts/financial-transactions';
import * as FinancialAccountsAPI from 'lithic/resources/financial-accounts/financial-accounts';
import { FinancialTransactionsSinglePage } from 'lithic/resources/financial-accounts/financial-accounts';

export class FinancialTransactions extends APIResource {
  /**
   * Get the financial transaction for the provided token.
   */
  retrieve(
    financialAccountToken: string,
    financialTransactionToken: string,
    options?: Core.RequestOptions,
  ): Core.APIPromise<FinancialAccountsAPI.FinancialTransaction> {
    return this.get(
      `/financial_accounts/${financialAccountToken}/financial_transactions/${financialTransactionToken}`,
      options,
    );
  }

  /**
   * List the financial transactions for a given financial account.
   */
  list(
    financialAccountToken: string,
    query?: FinancialTransactionListParams,
    options?: Core.RequestOptions,
  ): Core.PagePromise<FinancialTransactionsSinglePage, FinancialAccountsAPI.FinancialTransaction>;
  list(
    financialAccountToken: string,
    options?: Core.RequestOptions,
  ): Core.PagePromise<FinancialTransactionsSinglePage, FinancialAccountsAPI.FinancialTransaction>;
  list(
    financialAccountToken: string,
    query: FinancialTransactionListParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.PagePromise<FinancialTransactionsSinglePage, FinancialAccountsAPI.FinancialTransaction> {
    if (isRequestOptions(query)) {
      return this.list(financialAccountToken, {}, query);
    }
    return this.getAPIList(
      `/financial_accounts/${financialAccountToken}/financial_transactions`,
      FinancialTransactionsSinglePage,
      { query, ...options },
    );
  }
}

export interface FinancialTransactionListParams {
  /**
   * Date string in RFC 3339 format. Only entries created after the specified date
   * will be included. UTC time zone.
   */
  begin?: string;

  /**
   * Financial Transaction category to be returned.
   */
  category?: 'ACH' | 'CARD' | 'TRANSFER';

  /**
   * Date string in RFC 3339 format. Only entries created before the specified date
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
  status?: 'DECLINED' | 'EXPIRED' | 'PENDING' | 'SETTLED' | 'VOIDED';
}

export namespace FinancialTransactions {
  export type FinancialTransactionListParams = FinancialTransactionsAPI.FinancialTransactionListParams;
}

export { FinancialTransactionsSinglePage };
