// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as ManagementOperationsAPI from './management-operations';
import { APIPromise } from '../core/api-promise';
import { CursorPage, type CursorPageParams, PagePromise } from '../core/pagination';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class BookTransfers extends APIResource {
  /**
   * Book transfer funds between two financial accounts or between a financial
   * account and card
   */
  create(body: BookTransferCreateParams, options?: RequestOptions): APIPromise<BookTransferResponse> {
    return this._client.post('/v1/book_transfers', { body, ...options });
  }

  /**
   * Get book transfer by token
   */
  retrieve(bookTransferToken: string, options?: RequestOptions): APIPromise<BookTransferResponse> {
    return this._client.get(path`/v1/book_transfers/${bookTransferToken}`, options);
  }

  /**
   * List book transfers
   */
  list(
    query: BookTransferListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<BookTransferResponsesCursorPage, BookTransferResponse> {
    return this._client.getAPIList('/v1/book_transfers', CursorPage<BookTransferResponse>, {
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
    options?: RequestOptions,
  ): APIPromise<BookTransferResponse> {
    return this._client.post(path`/v1/book_transfers/${bookTransferToken}/reverse`, { body, ...options });
  }
}

export type BookTransferResponsesCursorPage = CursorPage<BookTransferResponse>;

export interface BookTransferResponse {
  /**
   * Customer-provided token that will serve as an idempotency token. This token will
   * become the transaction token.
   */
  token: string;

  category:
    | 'ADJUSTMENT'
    | 'BALANCE_OR_FUNDING'
    | 'DERECOGNITION'
    | 'DISPUTE'
    | 'FEE'
    | 'INTERNAL'
    | 'REWARD'
    | 'PROGRAM_FUNDING'
    | 'TRANSFER';

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
   * External ID defined by the customer
   */
  external_id: string | null;

  /**
   * External resource associated with the management operation
   */
  external_resource: ManagementOperationsAPI.ExternalResource | null;

  /**
   * Globally unique identifier for the financial account or card that will send the
   * funds. Accepted type dependent on the program's use case.
   */
  from_financial_account_token: string;

  /**
   * Pending amount of the transaction in the currency's smallest unit (e.g., cents),
   * including any acquirer fees.
   *
   * The value of this field will go to zero over time once the financial transaction
   * is settled.
   */
  pending_amount: number;

  result: 'APPROVED' | 'DECLINED';

  /**
   * Amount of the transaction that has been settled in the currency's smallest unit
   * (e.g., cents).
   */
  settled_amount: number;

  /**
   * Status types:
   *
   * - `DECLINED` - The transfer was declined.
   * - `REVERSED` - The transfer was reversed
   * - `SETTLED` - The transfer is completed.
   */
  status: 'DECLINED' | 'REVERSED' | 'SETTLED';

  /**
   * Globally unique identifier for the financial account or card that will receive
   * the funds. Accepted type dependent on the program's use case.
   */
  to_financial_account_token: string;

  /**
   * A series of transactions that are grouped together.
   */
  transaction_series: BookTransferResponse.TransactionSeries | null;

  /**
   * Date and time when the financial transaction was last updated. UTC time zone.
   */
  updated: string;
}

export namespace BookTransferResponse {
  /**
   * Book transfer Event
   */
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

    detailed_results: 'APPROVED' | 'FUNDS_INSUFFICIENT';

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
    type:
      | 'ATM_BALANCE_INQUIRY'
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
      | 'TRANSFER'
      | 'COLLECTION';
  }

  /**
   * A series of transactions that are grouped together.
   */
  export interface TransactionSeries {
    related_transaction_event_token: string | null;

    related_transaction_token: string | null;

    type: string;
  }
}

export interface BookTransferCreateParams {
  /**
   * Amount to be transferred in the currency's smallest unit (e.g., cents for USD).
   * This should always be a positive value.
   */
  amount: number;

  category:
    | 'ADJUSTMENT'
    | 'BALANCE_OR_FUNDING'
    | 'DERECOGNITION'
    | 'DISPUTE'
    | 'FEE'
    | 'INTERNAL'
    | 'REWARD'
    | 'PROGRAM_FUNDING'
    | 'TRANSFER';

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
   * Type of the book transfer
   */
  type:
    | 'ATM_BALANCE_INQUIRY'
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
    | 'TRANSFER'
    | 'COLLECTION';

  /**
   * Customer-provided token that will serve as an idempotency token. This token will
   * become the transaction token.
   */
  token?: string;

  /**
   * External ID defined by the customer
   */
  external_id?: string;

  /**
   * Optional descriptor for the transfer.
   */
  memo?: string;

  /**
   * What to do if the financial account is closed when posting an operation
   */
  on_closed_account?: 'FAIL' | 'USE_SUSPENSE';
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
    | 'ADJUSTMENT'
    | 'BALANCE_OR_FUNDING'
    | 'DERECOGNITION'
    | 'DISPUTE'
    | 'FEE'
    | 'INTERNAL'
    | 'REWARD'
    | 'PROGRAM_FUNDING'
    | 'TRANSFER';

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

export declare namespace BookTransfers {
  export {
    type BookTransferResponse as BookTransferResponse,
    type BookTransferResponsesCursorPage as BookTransferResponsesCursorPage,
    type BookTransferCreateParams as BookTransferCreateParams,
    type BookTransferListParams as BookTransferListParams,
    type BookTransferReverseParams as BookTransferReverseParams,
  };
}
