// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import { isRequestOptions } from '../core';
import * as Core from '../core';
import * as AccountActivityAPI from './account-activity';
import * as ExternalPaymentsAPI from './external-payments';
import * as ManagementOperationsAPI from './management-operations';
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
 * Response containing multiple transaction types
 */
export type AccountActivityListResponse =
  | AccountActivityListResponse.FinancialTransaction
  | AccountActivityListResponse.BookTransferTransaction
  | AccountActivityListResponse.CardTransaction
  | AccountActivityListResponse.PaymentTransaction
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

    family: 'CARD' | 'PAYMENT' | 'TRANSFER' | 'INTERNAL' | 'EXTERNAL_PAYMENT' | 'MANAGEMENT_OPERATION';

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
   * Book transfer transaction
   */
  export interface BookTransferTransaction {
    /**
     * Unique identifier for the transaction
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
     * ISO 8601 timestamp of when the transaction was created
     */
    created: string;

    /**
     * Currency of the transaction in ISO 4217 format
     */
    currency: string;

    /**
     * List of events associated with this book transfer
     */
    events: Array<BookTransferTransaction.Event>;

    family: 'CARD' | 'PAYMENT' | 'TRANSFER' | 'INTERNAL' | 'EXTERNAL_PAYMENT' | 'MANAGEMENT_OPERATION';

    /**
     * Source account token
     */
    from_financial_account_token: string;

    /**
     * The pending amount of the transaction in cents
     */
    pending_amount: number;

    result: 'APPROVED' | 'DECLINED';

    /**
     * The settled amount of the transaction in cents
     */
    settled_amount: number;

    /**
     * The status of the transaction
     */
    status: 'PENDING' | 'SETTLED' | 'DECLINED' | 'REVERSED' | 'CANCELED';

    /**
     * Destination account token
     */
    to_financial_account_token: string;

    /**
     * ISO 8601 timestamp of when the transaction was last updated
     */
    updated: string;

    /**
     * External identifier for the transaction
     */
    external_id?: string;

    /**
     * External resource associated with the management operation
     */
    external_resource?: ManagementOperationsAPI.ExternalResource | null;

    transaction_series?: BookTransferTransaction.TransactionSeries | null;
  }

  export namespace BookTransferTransaction {
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

    export interface TransactionSeries {
      related_transaction_event_token: string | null;

      related_transaction_token: string | null;

      type: string;
    }
  }

  /**
   * Base class for all transaction types in the ledger service
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

    family: 'CARD' | 'PAYMENT' | 'TRANSFER' | 'INTERNAL' | 'EXTERNAL_PAYMENT' | 'MANAGEMENT_OPERATION';

    /**
     * The status of the transaction
     */
    status: 'PENDING' | 'SETTLED' | 'DECLINED' | 'REVERSED' | 'CANCELED';

    /**
     * ISO 8601 timestamp of when the transaction was last updated
     */
    updated: string;
  }

  /**
   * Payment transaction
   */
  export interface PaymentTransaction {
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
     * Transaction descriptor
     */
    descriptor: string;

    /**
     * Transfer direction
     */
    direction: 'CREDIT' | 'DEBIT';

    /**
     * List of transaction events
     */
    events: Array<PaymentTransaction.Event>;

    family: 'CARD' | 'PAYMENT' | 'TRANSFER' | 'INTERNAL' | 'EXTERNAL_PAYMENT' | 'MANAGEMENT_OPERATION';

    /**
     * Financial account token
     */
    financial_account_token: string;

    /**
     * Transfer method
     */
    method: 'ACH_NEXT_DAY' | 'ACH_SAME_DAY' | 'WIRE';

    /**
     * Method-specific attributes
     */
    method_attributes: PaymentTransaction.ACHMethodAttributes | PaymentTransaction.WireMethodAttributes;

    /**
     * Pending amount in cents
     */
    pending_amount: number;

    /**
     * Related account tokens for the transaction
     */
    related_account_tokens: PaymentTransaction.RelatedAccountTokens;

    /**
     * Transaction result
     */
    result: 'APPROVED' | 'DECLINED';

    /**
     * Settled amount in cents
     */
    settled_amount: number;

    /**
     * Transaction source
     */
    source: 'LITHIC' | 'EXTERNAL' | 'CUSTOMER';

    /**
     * The status of the transaction
     */
    status: 'PENDING' | 'SETTLED' | 'DECLINED' | 'REVERSED' | 'CANCELED';

    /**
     * ISO 8601 timestamp of when the transaction was last updated
     */
    updated: string;

    /**
     * Currency of the transaction in ISO 4217 format
     */
    currency?: string;

    /**
     * Expected release date for the transaction
     */
    expected_release_date?: string | null;

    /**
     * External bank account token
     */
    external_bank_account_token?: string | null;

    type?:
      | 'ORIGINATION_CREDIT'
      | 'ORIGINATION_DEBIT'
      | 'RECEIPT_CREDIT'
      | 'RECEIPT_DEBIT'
      | 'WIRE_INBOUND_PAYMENT'
      | 'WIRE_INBOUND_ADMIN'
      | 'WIRE_OUTBOUND_PAYMENT'
      | 'WIRE_OUTBOUND_ADMIN';

    /**
     * User-defined identifier
     */
    user_defined_id?: string | null;
  }

  export namespace PaymentTransaction {
    /**
     * Payment Event
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

      /**
       * APPROVED financial events were successful while DECLINED financial events were
       * declined by user, Lithic, or the network.
       */
      result: 'APPROVED' | 'DECLINED';

      /**
       * Event types:
       *
       * - `ACH_ORIGINATION_INITIATED` - ACH origination received and pending
       *   approval/release from an ACH hold.
       * - `ACH_ORIGINATION_REVIEWED` - ACH origination has completed the review process.
       * - `ACH_ORIGINATION_CANCELLED` - ACH origination has been cancelled.
       * - `ACH_ORIGINATION_PROCESSED` - ACH origination has been processed and sent to
       *   the Federal Reserve.
       * - `ACH_ORIGINATION_SETTLED` - ACH origination has settled.
       * - `ACH_ORIGINATION_RELEASED` - ACH origination released from pending to
       *   available balance.
       * - `ACH_RETURN_PROCESSED` - ACH origination returned by the Receiving Depository
       *   Financial Institution.
       * - `ACH_RECEIPT_PROCESSED` - ACH receipt pending release from an ACH holder.
       * - `ACH_RETURN_INITIATED` - ACH initiated return for a ACH receipt.
       * - `ACH_RECEIPT_SETTLED` - ACH receipt funds have settled.
       * - `ACH_RECEIPT_RELEASED` - ACH receipt released from pending to available
       *   balance.
       * - `ACH_RETURN_SETTLED` - ACH receipt return settled by the Receiving Depository
       *   Financial Institution.
       */
      type:
        | 'ACH_ORIGINATION_CANCELLED'
        | 'ACH_ORIGINATION_INITIATED'
        | 'ACH_ORIGINATION_PROCESSED'
        | 'ACH_ORIGINATION_SETTLED'
        | 'ACH_ORIGINATION_RELEASED'
        | 'ACH_ORIGINATION_REVIEWED'
        | 'ACH_RECEIPT_PROCESSED'
        | 'ACH_RECEIPT_SETTLED'
        | 'ACH_RETURN_INITIATED'
        | 'ACH_RETURN_PROCESSED'
        | 'ACH_RETURN_SETTLED';

      /**
       * More detailed reasons for the event
       */
      detailed_results?: Array<
        | 'APPROVED'
        | 'FUNDS_INSUFFICIENT'
        | 'ACCOUNT_INVALID'
        | 'PROGRAM_TRANSACTION_LIMIT_EXCEEDED'
        | 'PROGRAM_DAILY_LIMIT_EXCEEDED'
        | 'PROGRAM_MONTHLY_LIMIT_EXCEEDED'
      >;
    }

    export interface ACHMethodAttributes {
      /**
       * SEC code for ACH transaction
       */
      sec_code: 'CCD' | 'PPD' | 'WEB' | 'TEL' | 'CIE' | 'CTX';

      /**
       * Addenda information
       */
      addenda?: string | null;

      /**
       * Company ID for the ACH transaction
       */
      company_id?: string | null;

      /**
       * Receipt routing number
       */
      receipt_routing_number?: string | null;

      /**
       * Number of retries attempted
       */
      retries?: number | null;

      /**
       * Return reason code if the transaction was returned
       */
      return_reason_code?: string | null;

      /**
       * Trace numbers for the ACH transaction
       */
      trace_numbers?: Array<string>;
    }

    export interface WireMethodAttributes {
      /**
       * Type of wire transfer
       */
      wire_network: 'FEDWIRE' | 'SWIFT';

      creditor?: AccountActivityAPI.WirePartyDetails;

      debtor?: AccountActivityAPI.WirePartyDetails;

      /**
       * Point to point reference identifier, as assigned by the instructing party, used
       * for tracking the message through the Fedwire system
       */
      message_id?: string | null;

      /**
       * Payment details or invoice reference
       */
      remittance_information?: string | null;

      /**
       * Type of wire message
       */
      wire_message_type?: string;
    }

    /**
     * Related account tokens for the transaction
     */
    export interface RelatedAccountTokens {
      /**
       * Globally unique identifier for the account
       */
      account_token: string | null;

      /**
       * Globally unique identifier for the business account
       */
      business_account_token: string | null;
    }
  }
}

/**
 * Response containing multiple transaction types
 */
export type AccountActivityRetrieveTransactionResponse =
  | AccountActivityRetrieveTransactionResponse.FinancialTransaction
  | AccountActivityRetrieveTransactionResponse.BookTransferTransaction
  | AccountActivityRetrieveTransactionResponse.CardTransaction
  | AccountActivityRetrieveTransactionResponse.PaymentTransaction
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

    family: 'CARD' | 'PAYMENT' | 'TRANSFER' | 'INTERNAL' | 'EXTERNAL_PAYMENT' | 'MANAGEMENT_OPERATION';

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
   * Book transfer transaction
   */
  export interface BookTransferTransaction {
    /**
     * Unique identifier for the transaction
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
     * ISO 8601 timestamp of when the transaction was created
     */
    created: string;

    /**
     * Currency of the transaction in ISO 4217 format
     */
    currency: string;

    /**
     * List of events associated with this book transfer
     */
    events: Array<BookTransferTransaction.Event>;

    family: 'CARD' | 'PAYMENT' | 'TRANSFER' | 'INTERNAL' | 'EXTERNAL_PAYMENT' | 'MANAGEMENT_OPERATION';

    /**
     * Source account token
     */
    from_financial_account_token: string;

    /**
     * The pending amount of the transaction in cents
     */
    pending_amount: number;

    result: 'APPROVED' | 'DECLINED';

    /**
     * The settled amount of the transaction in cents
     */
    settled_amount: number;

    /**
     * The status of the transaction
     */
    status: 'PENDING' | 'SETTLED' | 'DECLINED' | 'REVERSED' | 'CANCELED';

    /**
     * Destination account token
     */
    to_financial_account_token: string;

    /**
     * ISO 8601 timestamp of when the transaction was last updated
     */
    updated: string;

    /**
     * External identifier for the transaction
     */
    external_id?: string;

    /**
     * External resource associated with the management operation
     */
    external_resource?: ManagementOperationsAPI.ExternalResource | null;

    transaction_series?: BookTransferTransaction.TransactionSeries | null;
  }

  export namespace BookTransferTransaction {
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

    export interface TransactionSeries {
      related_transaction_event_token: string | null;

      related_transaction_token: string | null;

      type: string;
    }
  }

  /**
   * Base class for all transaction types in the ledger service
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

    family: 'CARD' | 'PAYMENT' | 'TRANSFER' | 'INTERNAL' | 'EXTERNAL_PAYMENT' | 'MANAGEMENT_OPERATION';

    /**
     * The status of the transaction
     */
    status: 'PENDING' | 'SETTLED' | 'DECLINED' | 'REVERSED' | 'CANCELED';

    /**
     * ISO 8601 timestamp of when the transaction was last updated
     */
    updated: string;
  }

  /**
   * Payment transaction
   */
  export interface PaymentTransaction {
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
     * Transaction descriptor
     */
    descriptor: string;

    /**
     * Transfer direction
     */
    direction: 'CREDIT' | 'DEBIT';

    /**
     * List of transaction events
     */
    events: Array<PaymentTransaction.Event>;

    family: 'CARD' | 'PAYMENT' | 'TRANSFER' | 'INTERNAL' | 'EXTERNAL_PAYMENT' | 'MANAGEMENT_OPERATION';

    /**
     * Financial account token
     */
    financial_account_token: string;

    /**
     * Transfer method
     */
    method: 'ACH_NEXT_DAY' | 'ACH_SAME_DAY' | 'WIRE';

    /**
     * Method-specific attributes
     */
    method_attributes: PaymentTransaction.ACHMethodAttributes | PaymentTransaction.WireMethodAttributes;

    /**
     * Pending amount in cents
     */
    pending_amount: number;

    /**
     * Related account tokens for the transaction
     */
    related_account_tokens: PaymentTransaction.RelatedAccountTokens;

    /**
     * Transaction result
     */
    result: 'APPROVED' | 'DECLINED';

    /**
     * Settled amount in cents
     */
    settled_amount: number;

    /**
     * Transaction source
     */
    source: 'LITHIC' | 'EXTERNAL' | 'CUSTOMER';

    /**
     * The status of the transaction
     */
    status: 'PENDING' | 'SETTLED' | 'DECLINED' | 'REVERSED' | 'CANCELED';

    /**
     * ISO 8601 timestamp of when the transaction was last updated
     */
    updated: string;

    /**
     * Currency of the transaction in ISO 4217 format
     */
    currency?: string;

    /**
     * Expected release date for the transaction
     */
    expected_release_date?: string | null;

    /**
     * External bank account token
     */
    external_bank_account_token?: string | null;

    type?:
      | 'ORIGINATION_CREDIT'
      | 'ORIGINATION_DEBIT'
      | 'RECEIPT_CREDIT'
      | 'RECEIPT_DEBIT'
      | 'WIRE_INBOUND_PAYMENT'
      | 'WIRE_INBOUND_ADMIN'
      | 'WIRE_OUTBOUND_PAYMENT'
      | 'WIRE_OUTBOUND_ADMIN';

    /**
     * User-defined identifier
     */
    user_defined_id?: string | null;
  }

  export namespace PaymentTransaction {
    /**
     * Payment Event
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

      /**
       * APPROVED financial events were successful while DECLINED financial events were
       * declined by user, Lithic, or the network.
       */
      result: 'APPROVED' | 'DECLINED';

      /**
       * Event types:
       *
       * - `ACH_ORIGINATION_INITIATED` - ACH origination received and pending
       *   approval/release from an ACH hold.
       * - `ACH_ORIGINATION_REVIEWED` - ACH origination has completed the review process.
       * - `ACH_ORIGINATION_CANCELLED` - ACH origination has been cancelled.
       * - `ACH_ORIGINATION_PROCESSED` - ACH origination has been processed and sent to
       *   the Federal Reserve.
       * - `ACH_ORIGINATION_SETTLED` - ACH origination has settled.
       * - `ACH_ORIGINATION_RELEASED` - ACH origination released from pending to
       *   available balance.
       * - `ACH_RETURN_PROCESSED` - ACH origination returned by the Receiving Depository
       *   Financial Institution.
       * - `ACH_RECEIPT_PROCESSED` - ACH receipt pending release from an ACH holder.
       * - `ACH_RETURN_INITIATED` - ACH initiated return for a ACH receipt.
       * - `ACH_RECEIPT_SETTLED` - ACH receipt funds have settled.
       * - `ACH_RECEIPT_RELEASED` - ACH receipt released from pending to available
       *   balance.
       * - `ACH_RETURN_SETTLED` - ACH receipt return settled by the Receiving Depository
       *   Financial Institution.
       */
      type:
        | 'ACH_ORIGINATION_CANCELLED'
        | 'ACH_ORIGINATION_INITIATED'
        | 'ACH_ORIGINATION_PROCESSED'
        | 'ACH_ORIGINATION_SETTLED'
        | 'ACH_ORIGINATION_RELEASED'
        | 'ACH_ORIGINATION_REVIEWED'
        | 'ACH_RECEIPT_PROCESSED'
        | 'ACH_RECEIPT_SETTLED'
        | 'ACH_RETURN_INITIATED'
        | 'ACH_RETURN_PROCESSED'
        | 'ACH_RETURN_SETTLED';

      /**
       * More detailed reasons for the event
       */
      detailed_results?: Array<
        | 'APPROVED'
        | 'FUNDS_INSUFFICIENT'
        | 'ACCOUNT_INVALID'
        | 'PROGRAM_TRANSACTION_LIMIT_EXCEEDED'
        | 'PROGRAM_DAILY_LIMIT_EXCEEDED'
        | 'PROGRAM_MONTHLY_LIMIT_EXCEEDED'
      >;
    }

    export interface ACHMethodAttributes {
      /**
       * SEC code for ACH transaction
       */
      sec_code: 'CCD' | 'PPD' | 'WEB' | 'TEL' | 'CIE' | 'CTX';

      /**
       * Addenda information
       */
      addenda?: string | null;

      /**
       * Company ID for the ACH transaction
       */
      company_id?: string | null;

      /**
       * Receipt routing number
       */
      receipt_routing_number?: string | null;

      /**
       * Number of retries attempted
       */
      retries?: number | null;

      /**
       * Return reason code if the transaction was returned
       */
      return_reason_code?: string | null;

      /**
       * Trace numbers for the ACH transaction
       */
      trace_numbers?: Array<string>;
    }

    export interface WireMethodAttributes {
      /**
       * Type of wire transfer
       */
      wire_network: 'FEDWIRE' | 'SWIFT';

      creditor?: AccountActivityAPI.WirePartyDetails;

      debtor?: AccountActivityAPI.WirePartyDetails;

      /**
       * Point to point reference identifier, as assigned by the instructing party, used
       * for tracking the message through the Fedwire system
       */
      message_id?: string | null;

      /**
       * Payment details or invoice reference
       */
      remittance_information?: string | null;

      /**
       * Type of wire message
       */
      wire_message_type?: string;
    }

    /**
     * Related account tokens for the transaction
     */
    export interface RelatedAccountTokens {
      /**
       * Globally unique identifier for the account
       */
      account_token: string | null;

      /**
       * Globally unique identifier for the business account
       */
      business_account_token: string | null;
    }
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
