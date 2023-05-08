// File generated from our OpenAPI spec by Stainless.

import * as Core from '~/core';
import { APIResource } from '~/resource';
import { isRequestOptions } from '~/core';
import * as FinancialAccounts from '~/resources/financial-accounts';
import { FinancialTransactionsSinglePage } from '~/resources/financial-accounts';

export class FinancialTransactions extends APIResource {
  /**
   * Get the financial transaction for the provided token.
   */
  retrieve(
    financialAccountToken: string,
    financialTransactionToken: string,
    options?: Core.RequestOptions,
  ): Promise<Core.APIResponse<FinancialAccounts.FinancialTransaction>> {
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
  ): Core.PagePromise<FinancialTransactionsSinglePage>;
  list(
    financialAccountToken: string,
    options?: Core.RequestOptions,
  ): Core.PagePromise<FinancialTransactionsSinglePage>;
  list(
    financialAccountToken: string,
    query: FinancialTransactionListParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.PagePromise<FinancialTransactionsSinglePage> {
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
   * The unique identifier of the first item in the previous page. Used to retrieve
   * the previous page.
   */
  ending_before?: string;

  /**
   * Financial Transaction result to be returned.
   */
  result?: 'APPROVED' | 'DECLINED';

  /**
   * The unique identifier of the last item in the previous page. Used to retrieve
   * the next page.
   */
  starting_after?: string;

  /**
   * Financial Transaction status to be returned.
   */
  status?: 'DECLINED' | 'EXPIRED' | 'PENDING' | 'SETTLED' | 'VOIDED';
}

export { FinancialTransactionsSinglePage };