// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../resource';
import { isRequestOptions } from '../../core';
import * as Core from '../../core';
import * as FinancialAccountsAPI from '../financial-accounts/financial-accounts';
import { FinancialTransactionsSinglePage } from '../financial-accounts/financial-accounts';

export class FinancialTransactions extends APIResource {
  /**
   * Get the card financial transaction for the provided token.
   *
   * @example
   * ```ts
   * const financialTransaction =
   *   await client.cards.financialTransactions.retrieve(
   *     '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   *     '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   *   );
   * ```
   */
  retrieve(
    cardToken: string,
    financialTransactionToken: string,
    options?: Core.RequestOptions,
  ): Core.APIPromise<FinancialAccountsAPI.FinancialTransaction> {
    return this._client.get(
      `/v1/cards/${cardToken}/financial_transactions/${financialTransactionToken}`,
      options,
    );
  }

  /**
   * List the financial transactions for a given card.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const financialTransaction of client.cards.financialTransactions.list(
   *   '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   * )) {
   *   // ...
   * }
   * ```
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
      `/v1/cards/${cardToken}/financial_transactions`,
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

export declare namespace FinancialTransactions {
  export { type FinancialTransactionListParams as FinancialTransactionListParams };
}

export { FinancialTransactionsSinglePage };
