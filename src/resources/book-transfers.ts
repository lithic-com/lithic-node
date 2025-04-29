// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import { isRequestOptions } from '../core';
import * as Core from '../core';
import { CursorPage, type CursorPageParams } from '../pagination';

export class BookTransfers extends APIResource {
  /**
   * Book transfer funds between two financial accounts or between a financial
   * account and card
   */
  create(
    body: BookTransferCreateParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<BookTransferResponse> {
    return this._client.post('/v1/book_transfers', { body, ...options });
  }

  /**
   * Get book transfer by token
   */
  retrieve(bookTransferToken: string, options?: Core.RequestOptions): Core.APIPromise<BookTransferResponse> {
    return this._client.get(`/v1/book_transfers/${bookTransferToken}`, options);
  }

  /**
   * List book transfers
   */
  list(
    query?: BookTransferListParams,
    options?: Core.RequestOptions,
  ): Core.PagePromise<BookTransferResponsesCursorPage, BookTransferResponse>;
  list(
    options?: Core.RequestOptions,
  ): Core.PagePromise<BookTransferResponsesCursorPage, BookTransferResponse>;
  list(
    query: BookTransferListParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.PagePromise<BookTransferResponsesCursorPage, BookTransferResponse> {
    if (isRequestOptions(query)) {
      return this.list({}, query);
    }
    return this._client.getAPIList('/v1/book_transfers', BookTransferResponsesCursorPage, {
      query,
      ...options,
    });
  }

  /**
   * Reverse a book transfer
   */
  reverse(
    bookTransferToken: string,
    body: BookTransferReverseParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<BookTransferResponse> {
    return this._client.post(`/v1/book_transfers/${bookTransferToken}/reverse`, { body, ...options });
  }
}

export class BookTransferResponsesCursorPage extends CursorPage<BookTransferResponse> {}

export interface BookTransferResponse {
  /**
   * Customer-provided token that will serve as an idempotency token. This token will
   * become the transaction token.
   */
  token: string;

  /**
   * Category of the book transfer
   */
  category: 'ADJUSTMENT' | 'BALANCE_OR_FUNDING' | 'DERECOGNITION' | 'DISPUTE' | 'FEE' | 'REWARD' | 'TRANSFER';

  /**
   * Date and time when the transfer occurred. UTC time zone.
   */
  created: string;

  /**
   * 3-character alphabetic ISO 4217 code for the settling currency of the
   * transaction.
   */
  currency: string;

  /**
   * A list of all financial events that have modified this transfer.
   */
  events: Array<BookTransferResponse.Event>;

  /**
   * Globally unique identifier for the financial account or card that will send the
   * funds. Accepted type dependent on the program's use case.
   */
  from_financial_account_token: string;

  /**
   * Pending amount of the transaction in the currency's smallest unit (e.g., cents),
   * including any acquirer fees. The value of this field will go to zero over time
   * once the financial transaction is settled.
   */
  pending_amount: number;

  /**
   * APPROVED transactions were successful while DECLINED transactions were declined
   * by user, Lithic, or the network.
   */
  result: 'APPROVED' | 'DECLINED';

  /**
   * Amount of the transaction that has been settled in the currency's smallest unit
   * (e.g., cents).
   */
  settled_amount: number;

  /**
   * Status types: _ `DECLINED` - The transfer was declined. _ `REVERSED` - The
   * transfer was reversed \* `SETTLED` - The transfer is completed.
   */
  status: 'DECLINED' | 'REVERSED' | 'SETTLED';

  /**
   * Globally unique identifier for the financial account or card that will receive
   * the funds. Accepted type dependent on the program's use case.
   */
  to_financial_account_token: unknown;

  /**
   * Date and time when the financial transaction was last updated. UTC time zone.
   */
  updated: string;
}

export namespace BookTransferResponse {
  export interface Event {
    /**
     * Globally unique identifier.
     */
    token: string;

    /**
     * Amount of the financial event that has been settled in the currency's smallest
     * unit (e.g., cents).
     */
    amount: number;

    /**
     * Date and time when the financial event occurred. UTC time zone.
     */
    created: string;

    /**
     * Detailed Results
     */
    detailed_results: Array<'APPROVED' | 'FUNDS_INSUFFICIENT'>;

    /**
     * Memo for the transfer.
     */
    memo: string;

    /**
     * APPROVED financial events were successful while DECLINED financial events were
     * declined by user, Lithic, or the network.
     */
    result: 'APPROVED' | 'DECLINED';

    /**
     * The program specific subtype code for the specified category/type.
     */
    subtype: string;

    /**
     * Type of the book transfer
     */
    type: string;
  }
}

export interface BookTransferCreateParams {
  /**
   * Amount to be transferred in the currency’s smallest unit (e.g., cents for USD).
   * This should always be a positive value.
   */
  amount: number;

  /**
   * Category of the book transfer
   */
  category: 'ADJUSTMENT' | 'BALANCE_OR_FUNDING' | 'DERECOGNITION' | 'DISPUTE' | 'FEE' | 'REWARD' | 'TRANSFER';

  /**
   * Globally unique identifier for the financial account or card that will send the
   * funds. Accepted type dependent on the program's use case.
   */
  from_financial_account_token: string;

  /**
   * The program specific subtype code for the specified category/type.
   */
  subtype: string;

  /**
   * Globally unique identifier for the financial account or card that will receive
   * the funds. Accepted type dependent on the program's use case.
   */
  to_financial_account_token: string;

  /**
   * Type of book_transfer
   */
  type:
    | 'ATM_WITHDRAWAL'
    | 'ATM_DECLINE'
    | 'INTERNATIONAL_ATM_WITHDRAWAL'
    | 'INACTIVITY'
    | 'STATEMENT'
    | 'MONTHLY'
    | 'QUARTERLY'
    | 'ANNUAL'
    | 'CUSTOMER_SERVICE'
    | 'ACCOUNT_MAINTENANCE'
    | 'ACCOUNT_ACTIVATION'
    | 'ACCOUNT_CLOSURE'
    | 'CARD_REPLACEMENT'
    | 'CARD_DELIVERY'
    | 'CARD_CREATE'
    | 'CURRENCY_CONVERSION'
    | 'INTEREST'
    | 'LATE_PAYMENT'
    | 'BILL_PAYMENT'
    | 'CASH_BACK'
    | 'ACCOUNT_TO_ACCOUNT'
    | 'CARD_TO_CARD'
    | 'DISBURSE'
    | 'BILLING_ERROR'
    | 'LOSS_WRITE_OFF'
    | 'EXPIRED_CARD'
    | 'EARLY_DERECOGNITION'
    | 'ESCHEATMENT'
    | 'INACTIVITY_FEE_DOWN'
    | 'PROVISIONAL_CREDIT'
    | 'DISPUTE_WON'
    | 'SERVICE'
    | 'TRANSFER';

  /**
   * Customer-provided token that will serve as an idempotency token. This token will
   * become the transaction token.
   */
  token?: string;

  /**
   * Optional descriptor for the transfer.
   */
  memo?: string;
}

export interface BookTransferListParams extends CursorPageParams {
  account_token?: string;

  /**
   * Date string in RFC 3339 format. Only entries created after the specified time
   * will be included. UTC time zone.
   */
  begin?: string;

  business_account_token?: string;

  /**
   * Book Transfer category to be returned.
   */
  category?:
    | 'BALANCE_OR_FUNDING'
    | 'FEE'
    | 'REWARD'
    | 'ADJUSTMENT'
    | 'DERECOGNITION'
    | 'DISPUTE'
    | 'INTERNAL';

  /**
   * Date string in RFC 3339 format. Only entries created before the specified time
   * will be included. UTC time zone.
   */
  end?: string;

  /**
   * Globally unique identifier for the financial account or card that will send the
   * funds. Accepted type dependent on the program's use case.
   */
  financial_account_token?: string;

  /**
   * Book transfer result to be returned.
   */
  result?: 'APPROVED' | 'DECLINED';

  /**
   * Book transfer status to be returned.
   */
  status?: 'DECLINED' | 'SETTLED';
}

export interface BookTransferReverseParams {
  /**
   * Optional descriptor for the reversal.
   */
  memo?: string;
}

BookTransfers.BookTransferResponsesCursorPage = BookTransferResponsesCursorPage;

export declare namespace BookTransfers {
  export {
    type BookTransferResponse as BookTransferResponse,
    BookTransferResponsesCursorPage as BookTransferResponsesCursorPage,
    type BookTransferCreateParams as BookTransferCreateParams,
    type BookTransferListParams as BookTransferListParams,
    type BookTransferReverseParams as BookTransferReverseParams,
  };
}
