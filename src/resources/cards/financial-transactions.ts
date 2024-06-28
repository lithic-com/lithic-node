// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../resource';
import { isRequestOptions } from '../../core';
import * as Core from '../../core';
import * as FinancialTransactionsAPI from './financial-transactions';
import * as FinancialAccountsAPI from '../financial-accounts/financial-accounts';
import { FinancialTransactionsSinglePage } from '../financial-accounts/financial-accounts';

export class FinancialTransactions extends APIResource {
  /**
   * Get the card financial transaction for the provided token.
   */
  retrieve(
    cardToken: string,
    financialTransactionToken: string,
    options?: Core.RequestOptions,
  ): Core.APIPromise<FinancialAccountsAPI.FinancialTransaction> {
    return this._client.get(
      `/cards/${cardToken}/financial_transactions/${financialTransactionToken}`,
      options,
    );
  }

  /**
   * List the financial transactions for a given card.
   */
  list(
    cardToken: string,
    query?: FinancialTransactionListParams,
    options?: Core.RequestOptions,
  ): Core.PagePromise<FinancialTransactionsSinglePage, FinancialAccountsAPI.FinancialTransaction>;
  list(
    cardToken: string,
    options?: Core.RequestOptions,
  ): Core.PagePromise<FinancialTransactionsSinglePage, FinancialAccountsAPI.FinancialTransaction>;
  list(
    cardToken: string,
    query: FinancialTransactionListParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.PagePromise<FinancialTransactionsSinglePage, FinancialAccountsAPI.FinancialTransaction> {
    if (isRequestOptions(query)) {
      return this.list(cardToken, {}, query);
    }
    return this._client.getAPIList(
      `/cards/${cardToken}/financial_transactions`,
      FinancialTransactionsSinglePage,
      { query, ...options },
    );
  }
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
  category?: 'CARD' | 'TRANSFER';

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

export namespace FinancialTransactions {
  export import FinancialTransactionListParams = FinancialTransactionsAPI.FinancialTransactionListParams;
}

export { FinancialTransactionsSinglePage };
