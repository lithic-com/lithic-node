// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import { isRequestOptions } from '../core';
import * as Core from '../core';
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
    events: Array<unknown>;

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

  /**
   * Book transfer transaction
   */
  export interface BookTransferTransaction {
    /**
     * Unique identifier for the transaction
     */
    token: string;

    category:
      | 'ACH'
      | 'BALANCE_OR_FUNDING'
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
     * Currency of the transaction in ISO 4217 format
     */
    currency: string;

    /**
     * List of events associated with this book transfer
     */
    events: Array<unknown>;

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
    events: Array<unknown>;

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

    /**
     * User-defined identifier
     */
    user_defined_id?: string | null;
  }

  export namespace PaymentTransaction {
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
      wire_transfer_type: 'FEDWIRE' | 'SWIFT';

      /**
       * External bank name
       */
      external_bank_name?: string | null;

      /**
       * External bank routing number
       */
      external_bank_routing_number?: string | null;

      /**
       * External individual name
       */
      external_individual_name?: string | null;

      /**
       * Lithic bank name
       */
      lithic_bank_name?: string | null;

      /**
       * Lithic bank routing number
       */
      lithic_bank_routing_number?: string | null;

      /**
       * Lithic individual name
       */
      lithic_individual_name?: string | null;

      /**
       * UUID of previous transfer if this is a retry
       */
      previous_transfer?: string | null;
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
    events: Array<unknown>;

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

  /**
   * Book transfer transaction
   */
  export interface BookTransferTransaction {
    /**
     * Unique identifier for the transaction
     */
    token: string;

    category:
      | 'ACH'
      | 'BALANCE_OR_FUNDING'
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
     * Currency of the transaction in ISO 4217 format
     */
    currency: string;

    /**
     * List of events associated with this book transfer
     */
    events: Array<unknown>;

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
    events: Array<unknown>;

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

    /**
     * User-defined identifier
     */
    user_defined_id?: string | null;
  }

  export namespace PaymentTransaction {
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
      wire_transfer_type: 'FEDWIRE' | 'SWIFT';

      /**
       * External bank name
       */
      external_bank_name?: string | null;

      /**
       * External bank routing number
       */
      external_bank_routing_number?: string | null;

      /**
       * External individual name
       */
      external_individual_name?: string | null;

      /**
       * Lithic bank name
       */
      lithic_bank_name?: string | null;

      /**
       * Lithic bank routing number
       */
      lithic_bank_routing_number?: string | null;

      /**
       * Lithic individual name
       */
      lithic_individual_name?: string | null;

      /**
       * UUID of previous transfer if this is a retry
       */
      previous_transfer?: string | null;
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
  result?: Array<'APPROVED' | 'DECLINED'>;

  /**
   * Filter by transaction status
   */
  status?: Array<'DECLINED' | 'EXPIRED' | 'PENDING' | 'SETTLED' | 'VOIDED' | 'RETURNED' | 'REVERSED'>;
}

AccountActivity.AccountActivityListResponsesCursorPage = AccountActivityListResponsesCursorPage;

export declare namespace AccountActivity {
  export {
    type AccountActivityListResponse as AccountActivityListResponse,
    type AccountActivityRetrieveTransactionResponse as AccountActivityRetrieveTransactionResponse,
    AccountActivityListResponsesCursorPage as AccountActivityListResponsesCursorPage,
    type AccountActivityListParams as AccountActivityListParams,
  };
}
