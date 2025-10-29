// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import { isRequestOptions } from '../core';
import * as Core from '../core';
import * as BookTransfersAPI from './book-transfers';
import * as ExternalPaymentsAPI from './external-payments';
import * as ManagementOperationsAPI from './management-operations';
import * as PaymentsAPI from './payments';
import * as TransactionsAPI from './transactions/transactions';
import { CursorPage, type CursorPageParams } from '../pagination';

export class AccountActivity extends APIResource {
  /**
   * Retrieve a list of transactions across all public accounts.
   */
  list(
    query?: AccountActivityListParams,
    options?: Core.RequestOptions,
  ): Core.PagePromise<AccountActivityListResponsesCursorPage, AccountActivityListResponse>;
  list(
    options?: Core.RequestOptions,
  ): Core.PagePromise<AccountActivityListResponsesCursorPage, AccountActivityListResponse>;
  list(
    query: AccountActivityListParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.PagePromise<AccountActivityListResponsesCursorPage, AccountActivityListResponse> {
    if (isRequestOptions(query)) {
      return this.list({}, query);
    }
    return this._client.getAPIList('/v1/account_activity', AccountActivityListResponsesCursorPage, {
      query,
      ...options,
    });
  }

  /**
   * Retrieve a single transaction
   */
  retrieveTransaction(
    transactionToken: string,
    options?: Core.RequestOptions,
  ): Core.APIPromise<AccountActivityRetrieveTransactionResponse> {
    return this._client.get(`/v1/account_activity/${transactionToken}`, options);
  }
}

export class AccountActivityListResponsesCursorPage extends CursorPage<AccountActivityListResponse> {}

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
    events: Array<FinancialTransaction.Event>;

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
    status: 'PENDING' | 'SETTLED' | 'DECLINED' | 'REVERSED' | 'CANCELED';

    /**
     * ISO 8601 timestamp of when the transaction was last updated
     */
    updated: string;
  }

  export namespace FinancialTransaction {
    /**
     * Financial Event
     */
    export interface Event {
      /**
       * Globally unique identifier.
       */
      token?: string;

      /**
       * Amount of the financial event that has been settled in the currency's smallest
       * unit (e.g., cents).
       */
      amount?: number;

      /**
       * Date and time when the financial event occurred. UTC time zone.
       */
      created?: string;

      /**
       * APPROVED financial events were successful while DECLINED financial events were
       * declined by user, Lithic, or the network.
       */
      result?: 'APPROVED' | 'DECLINED';

      type?:
        | 'ACH_ORIGINATION_CANCELLED'
        | 'ACH_ORIGINATION_INITIATED'
        | 'ACH_ORIGINATION_PROCESSED'
        | 'ACH_ORIGINATION_RELEASED'
        | 'ACH_ORIGINATION_REJECTED'
        | 'ACH_ORIGINATION_REVIEWED'
        | 'ACH_ORIGINATION_SETTLED'
        | 'ACH_RECEIPT_PROCESSED'
        | 'ACH_RECEIPT_RELEASED'
        | 'ACH_RECEIPT_SETTLED'
        | 'ACH_RETURN_INITIATED'
        | 'ACH_RETURN_PROCESSED'
        | 'ACH_RETURN_REJECTED'
        | 'ACH_RETURN_SETTLED'
        | 'AUTHORIZATION'
        | 'AUTHORIZATION_ADVICE'
        | 'AUTHORIZATION_EXPIRY'
        | 'AUTHORIZATION_REVERSAL'
        | 'BALANCE_INQUIRY'
        | 'BILLING_ERROR'
        | 'BILLING_ERROR_REVERSAL'
        | 'CARD_TO_CARD'
        | 'CASH_BACK'
        | 'CASH_BACK_REVERSAL'
        | 'CLEARING'
        | 'COLLECTION'
        | 'CORRECTION_CREDIT'
        | 'CORRECTION_DEBIT'
        | 'CREDIT_AUTHORIZATION'
        | 'CREDIT_AUTHORIZATION_ADVICE'
        | 'CURRENCY_CONVERSION'
        | 'CURRENCY_CONVERSION_REVERSAL'
        | 'DISPUTE_WON'
        | 'EXTERNAL_ACH_CANCELED'
        | 'EXTERNAL_ACH_INITIATED'
        | 'EXTERNAL_ACH_RELEASED'
        | 'EXTERNAL_ACH_REVERSED'
        | 'EXTERNAL_ACH_SETTLED'
        | 'EXTERNAL_CHECK_CANCELED'
        | 'EXTERNAL_CHECK_INITIATED'
        | 'EXTERNAL_CHECK_RELEASED'
        | 'EXTERNAL_CHECK_REVERSED'
        | 'EXTERNAL_CHECK_SETTLED'
        | 'EXTERNAL_TRANSFER_CANCELED'
        | 'EXTERNAL_TRANSFER_INITIATED'
        | 'EXTERNAL_TRANSFER_RELEASED'
        | 'EXTERNAL_TRANSFER_REVERSED'
        | 'EXTERNAL_TRANSFER_SETTLED'
        | 'EXTERNAL_WIRE_CANCELED'
        | 'EXTERNAL_WIRE_INITIATED'
        | 'EXTERNAL_WIRE_RELEASED'
        | 'EXTERNAL_WIRE_REVERSED'
        | 'EXTERNAL_WIRE_SETTLED'
        | 'FINANCIAL_AUTHORIZATION'
        | 'FINANCIAL_CREDIT_AUTHORIZATION'
        | 'INTEREST'
        | 'INTEREST_REVERSAL'
        | 'INTERNAL_ADJUSTMENT'
        | 'LATE_PAYMENT'
        | 'LATE_PAYMENT_REVERSAL'
        | 'LOSS_WRITE_OFF'
        | 'PROVISIONAL_CREDIT'
        | 'PROVISIONAL_CREDIT_REVERSAL'
        | 'SERVICE'
        | 'RETURN'
        | 'RETURN_REVERSAL'
        | 'TRANSFER'
        | 'TRANSFER_INSUFFICIENT_FUNDS'
        | 'RETURNED_PAYMENT'
        | 'RETURNED_PAYMENT_REVERSAL'
        | 'LITHIC_NETWORK_PAYMENT';
    }
  }

  /**
   * Card transaction with ledger base properties
   */
  export interface CardTransaction extends TransactionsAPI.Transaction {}
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
    events: Array<FinancialTransaction.Event>;

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
    status: 'PENDING' | 'SETTLED' | 'DECLINED' | 'REVERSED' | 'CANCELED';

    /**
     * ISO 8601 timestamp of when the transaction was last updated
     */
    updated: string;
  }

  export namespace FinancialTransaction {
    /**
     * Financial Event
     */
    export interface Event {
      /**
       * Globally unique identifier.
       */
      token?: string;

      /**
       * Amount of the financial event that has been settled in the currency's smallest
       * unit (e.g., cents).
       */
      amount?: number;

      /**
       * Date and time when the financial event occurred. UTC time zone.
       */
      created?: string;

      /**
       * APPROVED financial events were successful while DECLINED financial events were
       * declined by user, Lithic, or the network.
       */
      result?: 'APPROVED' | 'DECLINED';

      type?:
        | 'ACH_ORIGINATION_CANCELLED'
        | 'ACH_ORIGINATION_INITIATED'
        | 'ACH_ORIGINATION_PROCESSED'
        | 'ACH_ORIGINATION_RELEASED'
        | 'ACH_ORIGINATION_REJECTED'
        | 'ACH_ORIGINATION_REVIEWED'
        | 'ACH_ORIGINATION_SETTLED'
        | 'ACH_RECEIPT_PROCESSED'
        | 'ACH_RECEIPT_RELEASED'
        | 'ACH_RECEIPT_SETTLED'
        | 'ACH_RETURN_INITIATED'
        | 'ACH_RETURN_PROCESSED'
        | 'ACH_RETURN_REJECTED'
        | 'ACH_RETURN_SETTLED'
        | 'AUTHORIZATION'
        | 'AUTHORIZATION_ADVICE'
        | 'AUTHORIZATION_EXPIRY'
        | 'AUTHORIZATION_REVERSAL'
        | 'BALANCE_INQUIRY'
        | 'BILLING_ERROR'
        | 'BILLING_ERROR_REVERSAL'
        | 'CARD_TO_CARD'
        | 'CASH_BACK'
        | 'CASH_BACK_REVERSAL'
        | 'CLEARING'
        | 'COLLECTION'
        | 'CORRECTION_CREDIT'
        | 'CORRECTION_DEBIT'
        | 'CREDIT_AUTHORIZATION'
        | 'CREDIT_AUTHORIZATION_ADVICE'
        | 'CURRENCY_CONVERSION'
        | 'CURRENCY_CONVERSION_REVERSAL'
        | 'DISPUTE_WON'
        | 'EXTERNAL_ACH_CANCELED'
        | 'EXTERNAL_ACH_INITIATED'
        | 'EXTERNAL_ACH_RELEASED'
        | 'EXTERNAL_ACH_REVERSED'
        | 'EXTERNAL_ACH_SETTLED'
        | 'EXTERNAL_CHECK_CANCELED'
        | 'EXTERNAL_CHECK_INITIATED'
        | 'EXTERNAL_CHECK_RELEASED'
        | 'EXTERNAL_CHECK_REVERSED'
        | 'EXTERNAL_CHECK_SETTLED'
        | 'EXTERNAL_TRANSFER_CANCELED'
        | 'EXTERNAL_TRANSFER_INITIATED'
        | 'EXTERNAL_TRANSFER_RELEASED'
        | 'EXTERNAL_TRANSFER_REVERSED'
        | 'EXTERNAL_TRANSFER_SETTLED'
        | 'EXTERNAL_WIRE_CANCELED'
        | 'EXTERNAL_WIRE_INITIATED'
        | 'EXTERNAL_WIRE_RELEASED'
        | 'EXTERNAL_WIRE_REVERSED'
        | 'EXTERNAL_WIRE_SETTLED'
        | 'FINANCIAL_AUTHORIZATION'
        | 'FINANCIAL_CREDIT_AUTHORIZATION'
        | 'INTEREST'
        | 'INTEREST_REVERSAL'
        | 'INTERNAL_ADJUSTMENT'
        | 'LATE_PAYMENT'
        | 'LATE_PAYMENT_REVERSAL'
        | 'LOSS_WRITE_OFF'
        | 'PROVISIONAL_CREDIT'
        | 'PROVISIONAL_CREDIT_REVERSAL'
        | 'SERVICE'
        | 'RETURN'
        | 'RETURN_REVERSAL'
        | 'TRANSFER'
        | 'TRANSFER_INSUFFICIENT_FUNDS'
        | 'RETURNED_PAYMENT'
        | 'RETURNED_PAYMENT_REVERSAL'
        | 'LITHIC_NETWORK_PAYMENT';
    }
  }

  /**
   * Card transaction with ledger base properties
   */
  export interface CardTransaction extends TransactionsAPI.Transaction {}
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

AccountActivity.AccountActivityListResponsesCursorPage = AccountActivityListResponsesCursorPage;

export declare namespace AccountActivity {
  export {
    type WirePartyDetails as WirePartyDetails,
    type AccountActivityListResponse as AccountActivityListResponse,
    type AccountActivityRetrieveTransactionResponse as AccountActivityRetrieveTransactionResponse,
    AccountActivityListResponsesCursorPage as AccountActivityListResponsesCursorPage,
    type AccountActivityListParams as AccountActivityListParams,
  };
}
