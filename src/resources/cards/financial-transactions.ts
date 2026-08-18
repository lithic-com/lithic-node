// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as FinancialAccountsAPI from '../financial-accounts/financial-accounts';
import { FinancialTransactionsSinglePage } from '../financial-accounts/financial-accounts';
import { APIPromise } from '../../core/api-promise';
import { PagePromise, SinglePage } from '../../core/pagination';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class FinancialTransactions extends APIResource {
  /**
   * Get the card financial transaction for the provided token.
   *
   * @example
   * ```ts
   * const financialTransaction =
   *   await client.cards.financialTransactions.retrieve(
   *     '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   *     { card_token: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e' },
   *   );
   * ```
   */
  retrieve(
    financialTransactionToken: string,
    params: FinancialTransactionRetrieveParams,
    options?: RequestOptions,
  ): APIPromise<FinancialAccountsAPI.FinancialTransaction> {
    const { card_token } = params;
    return this._client.get(
      path`/v1/cards/${card_token}/financial_transactions/${financialTransactionToken}`,
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
    query: FinancialTransactionListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<FinancialTransactionsSinglePage, FinancialAccountsAPI.FinancialTransaction> {
    return this._client.getAPIList(
      path`/v1/cards/${cardToken}/financial_transactions`,
      SinglePage<FinancialAccountsAPI.FinancialTransaction>,
      { query, ...options },
    );
  }
}

export interface FinancialTransactionRetrieveParams {
  card_token: string;
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
  export {
    type FinancialTransactionRetrieveParams as FinancialTransactionRetrieveParams,
    type FinancialTransactionListParams as FinancialTransactionListParams,
  };
}

export { type FinancialTransactionsSinglePage };
