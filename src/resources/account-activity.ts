// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as BookTransfersAPI from './book-transfers';
import * as ExternalPaymentsAPI from './external-payments';
import * as ManagementOperationsAPI from './management-operations';
import * as PaymentsAPI from './payments';
import * as Shared from './shared';
import * as TransactionsAPI from './transactions/transactions';
import { APIPromise } from '../core/api-promise';
import { CursorPage, type CursorPageParams, PagePromise } from '../core/pagination';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class AccountActivity extends APIResource {
  /**
   * Retrieve a list of transactions across all public accounts.
   */
  list(
    query: AccountActivityListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<AccountActivityListResponsesCursorPage, AccountActivityListResponse> {
    return this._client.getAPIList('/v1/account_activity', CursorPage<AccountActivityListResponse>, {
      query,
      ...options,
    });
  }

  /**
   * Retrieve a single transaction
   */
  retrieveTransaction(
    transactionToken: string,
    options?: RequestOptions,
  ): APIPromise<AccountActivityRetrieveTransactionResponse> {
    return this._client.get(path`/v1/account_activity/${transactionToken}`, options);
  }
}

export type AccountActivityListResponsesCursorPage = CursorPage<AccountActivityListResponse>;

export interface WirePartyDetails {
  /**
   * Account number
   */
  account_number?: string | null;

  /**
   * Routing number or BIC of the financial institution
   */
  agent_id?: string | null;

  /**
   * Name of the financial institution
   */
  agent_name?: string | null;

  /**
   * Name of the person or company
   */
  name?: string | null;
}

/**
 * Response containing multiple transaction types. The `family` field determines
 * which transaction type is returned: INTERNAL returns FinancialTransaction,
 * TRANSFER returns BookTransferTransaction, CARD returns CardTransaction, PAYMENT
 * returns PaymentTransaction, EXTERNAL_PAYMENT returns ExternalPaymentResponse,
 * and MANAGEMENT_OPERATION returns ManagementOperationTransaction
 */
export type AccountActivityListResponse =
  | AccountActivityListResponse.FinancialTransaction
  | BookTransfersAPI.BookTransferResponse
  | AccountActivityListResponse.CardTransaction
  | PaymentsAPI.Payment
  | ExternalPaymentsAPI.ExternalPayment
  | ManagementOperationsAPI.ManagementOperationTransaction;

export namespace AccountActivityListResponse {
  /**
   * Financial transaction with inheritance from unified base transaction
   */
  export interface FinancialTransaction {
    /**
     * Unique identifier for the transaction
     */
    token: string;

    /**
     * Transaction category
     */
    category:
      | 'ACH'
      | 'BALANCE_OR_FUNDING'
      | 'FEE'
      | 'REWARD'
      | 'ADJUSTMENT'
      | 'DERECOGNITION'
      | 'DISPUTE'
      | 'CARD'
      | 'EXTERNAL_ACH'
      | 'EXTERNAL_CHECK'
      | 'EXTERNAL_TRANSFER'
      | 'EXTERNAL_WIRE'
      | 'MANAGEMENT_ADJUSTMENT'
      | 'MANAGEMENT_DISPUTE'
      | 'MANAGEMENT_FEE'
      | 'MANAGEMENT_REWARD'
      | 'MANAGEMENT_DISBURSEMENT'
      | 'PROGRAM_FUNDING';

    /**
     * ISO 8601 timestamp of when the transaction was created
     */
    created: string;

    /**
     * Currency of the transaction, represented in ISO 4217 format
     */
    currency: string;

    /**
     * Transaction descriptor
     */
    descriptor: string;

    /**
     * List of transaction events
     */
    events: Array<Shared.FinancialEvent>;

    /**
     * INTERNAL - Financial Transaction
     */
    family: 'INTERNAL';

    /**
     * Financial account token associated with the transaction
     */
    financial_account_token: string;

    /**
     * Pending amount in cents
     */
    pending_amount: number;

    /**
     * Transaction result
     */
    result: 'APPROVED' | 'DECLINED';

    /**
     * Settled amount in cents
     */
    settled_amount: number;

    /**
     * The status of the transaction
     */
    status: 'PENDING' | 'SETTLED' | 'DECLINED' | 'REVERSED' | 'CANCELED' | 'RETURNED';

    /**
     * ISO 8601 timestamp of when the transaction was last updated
     */
    updated: string;
  }

  /**
   * Card transaction with ledger base properties
   */
  export interface CardTransaction extends Omit<TransactionsAPI.Transaction, 'status'> {
    /**
     * Unique identifier for the transaction
     */
    token: string;

    /**
     * ISO 8601 timestamp of when the transaction was created
     */
    created: string;

    /**
     * CARD - Card Transaction
     */
    family: 'CARD';

    /**
     * The status of the transaction
     */
    status: 'PENDING' | 'SETTLED' | 'DECLINED' | 'REVERSED' | 'CANCELED' | 'RETURNED';

    /**
     * ISO 8601 timestamp of when the transaction was last updated
     */
    updated: string;
  }
}

/**
 * Response containing multiple transaction types. The `family` field determines
 * which transaction type is returned: INTERNAL returns FinancialTransaction,
 * TRANSFER returns BookTransferTransaction, CARD returns CardTransaction, PAYMENT
 * returns PaymentTransaction, EXTERNAL_PAYMENT returns ExternalPaymentResponse,
 * and MANAGEMENT_OPERATION returns ManagementOperationTransaction
 */
export type AccountActivityRetrieveTransactionResponse =
  | AccountActivityRetrieveTransactionResponse.FinancialTransaction
  | BookTransfersAPI.BookTransferResponse
  | AccountActivityRetrieveTransactionResponse.CardTransaction
  | PaymentsAPI.Payment
  | ExternalPaymentsAPI.ExternalPayment
  | ManagementOperationsAPI.ManagementOperationTransaction;

export namespace AccountActivityRetrieveTransactionResponse {
  /**
   * Financial transaction with inheritance from unified base transaction
   */
  export interface FinancialTransaction {
    /**
     * Unique identifier for the transaction
     */
    token: string;

    /**
     * Transaction category
     */
    category:
      | 'ACH'
      | 'BALANCE_OR_FUNDING'
      | 'FEE'
      | 'REWARD'
      | 'ADJUSTMENT'
      | 'DERECOGNITION'
      | 'DISPUTE'
      | 'CARD'
      | 'EXTERNAL_ACH'
      | 'EXTERNAL_CHECK'
      | 'EXTERNAL_TRANSFER'
      | 'EXTERNAL_WIRE'
      | 'MANAGEMENT_ADJUSTMENT'
      | 'MANAGEMENT_DISPUTE'
      | 'MANAGEMENT_FEE'
      | 'MANAGEMENT_REWARD'
      | 'MANAGEMENT_DISBURSEMENT'
      | 'PROGRAM_FUNDING';

    /**
     * ISO 8601 timestamp of when the transaction was created
     */
    created: string;

    /**
     * Currency of the transaction, represented in ISO 4217 format
     */
    currency: string;

    /**
     * Transaction descriptor
     */
    descriptor: string;

    /**
     * List of transaction events
     */
    events: Array<Shared.FinancialEvent>;

    /**
     * INTERNAL - Financial Transaction
     */
    family: 'INTERNAL';

    /**
     * Financial account token associated with the transaction
     */
    financial_account_token: string;

    /**
     * Pending amount in cents
     */
    pending_amount: number;

    /**
     * Transaction result
     */
    result: 'APPROVED' | 'DECLINED';

    /**
     * Settled amount in cents
     */
    settled_amount: number;

    /**
     * The status of the transaction
     */
    status: 'PENDING' | 'SETTLED' | 'DECLINED' | 'REVERSED' | 'CANCELED' | 'RETURNED';

    /**
     * ISO 8601 timestamp of when the transaction was last updated
     */
    updated: string;
  }

  /**
   * Card transaction with ledger base properties
   */
  export interface CardTransaction extends Omit<TransactionsAPI.Transaction, 'status'> {
    /**
     * Unique identifier for the transaction
     */
    token: string;

    /**
     * ISO 8601 timestamp of when the transaction was created
     */
    created: string;

    /**
     * CARD - Card Transaction
     */
    family: 'CARD';

    /**
     * The status of the transaction
     */
    status: 'PENDING' | 'SETTLED' | 'DECLINED' | 'REVERSED' | 'CANCELED' | 'RETURNED';

    /**
     * ISO 8601 timestamp of when the transaction was last updated
     */
    updated: string;
  }
}

export interface AccountActivityListParams extends CursorPageParams {
  /**
   * Filter by account token
   */
  account_token?: string;

  /**
   * Date string in RFC 3339 format. Only entries created after the specified time
   * will be included. UTC time zone.
   */
  begin?: string;

  /**
   * Filter by business account token
   */
  business_account_token?: string;

  /**
   * Filter by transaction category
   */
  category?:
    | 'ACH'
    | 'BALANCE_OR_FUNDING'
    | 'FEE'
    | 'REWARD'
    | 'ADJUSTMENT'
    | 'DERECOGNITION'
    | 'DISPUTE'
    | 'CARD'
    | 'EXTERNAL_ACH'
    | 'EXTERNAL_CHECK'
    | 'EXTERNAL_TRANSFER'
    | 'EXTERNAL_WIRE'
    | 'MANAGEMENT_ADJUSTMENT'
    | 'MANAGEMENT_DISPUTE'
    | 'MANAGEMENT_FEE'
    | 'MANAGEMENT_REWARD'
    | 'MANAGEMENT_DISBURSEMENT'
    | 'PROGRAM_FUNDING';

  /**
   * Date string in RFC 3339 format. Only entries created before the specified time
   * will be included. UTC time zone.
   */
  end?: string;

  /**
   * Filter by financial account token
   */
  financial_account_token?: string;

  /**
   * Filter by transaction result
   */
  result?: 'APPROVED' | 'DECLINED';

  /**
   * Filter by transaction status
   */
  status?: 'DECLINED' | 'EXPIRED' | 'PENDING' | 'RETURNED' | 'REVERSED' | 'SETTLED' | 'VOIDED';
}

export declare namespace AccountActivity {
  export {
    type WirePartyDetails as WirePartyDetails,
    type AccountActivityListResponse as AccountActivityListResponse,
    type AccountActivityRetrieveTransactionResponse as AccountActivityRetrieveTransactionResponse,
    type AccountActivityListResponsesCursorPage as AccountActivityListResponsesCursorPage,
    type AccountActivityListParams as AccountActivityListParams,
  };
}
