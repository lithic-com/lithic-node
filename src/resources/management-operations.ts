// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import { isRequestOptions } from '../core';
import * as Core from '../core';
import { CursorPage, type CursorPageParams } from '../pagination';

export class ManagementOperations extends APIResource {
  /**
   * Create management operation
   */
  create(
    body: ManagementOperationCreateParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<ManagementOperationTransaction> {
    return this._client.post('/v1/management_operations', { body, ...options });
  }

  /**
   * Get management operation
   */
  retrieve(
    managementOperationToken: string,
    options?: Core.RequestOptions,
  ): Core.APIPromise<ManagementOperationTransaction> {
    return this._client.get(`/v1/management_operations/${managementOperationToken}`, options);
  }

  /**
   * List management operations
   */
  list(
    query?: ManagementOperationListParams,
    options?: Core.RequestOptions,
  ): Core.PagePromise<ManagementOperationTransactionsCursorPage, ManagementOperationTransaction>;
  list(
    options?: Core.RequestOptions,
  ): Core.PagePromise<ManagementOperationTransactionsCursorPage, ManagementOperationTransaction>;
  list(
    query: ManagementOperationListParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.PagePromise<ManagementOperationTransactionsCursorPage, ManagementOperationTransaction> {
    if (isRequestOptions(query)) {
      return this.list({}, query);
    }
    return this._client.getAPIList('/v1/management_operations', ManagementOperationTransactionsCursorPage, {
      query,
      ...options,
    });
  }

  /**
   * Reverse a management operation
   */
  reverse(
    managementOperationToken: string,
    body: ManagementOperationReverseParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<ManagementOperationTransaction> {
    return this._client.post(`/v1/management_operations/${managementOperationToken}/reverse`, {
      body,
      ...options,
    });
  }
}

export class ManagementOperationTransactionsCursorPage extends CursorPage<ManagementOperationTransaction> {}

/**
 * External resource associated with the management operation
 */
export interface ExternalResource {
  /**
   * Token identifying the external resource
   */
  external_resource_token: string;

  /**
   * Type of external resource associated with the management operation
   */
  external_resource_type: ExternalResourceType;

  /**
   * Token identifying the external resource sub-resource
   */
  external_resource_sub_token?: string;
}

/**
 * Type of external resource associated with the management operation
 */
export type ExternalResourceType = 'STATEMENT' | 'COLLECTION' | 'DISPUTE' | 'UNKNOWN';

export interface ManagementOperationTransaction {
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

  category?:
    | 'MANAGEMENT_FEE'
    | 'MANAGEMENT_DISPUTE'
    | 'MANAGEMENT_REWARD'
    | 'MANAGEMENT_ADJUSTMENT'
    | 'MANAGEMENT_DISBURSEMENT';

  currency?: string;

  direction?: 'CREDIT' | 'DEBIT';

  events?: Array<ManagementOperationTransaction.Event>;

  /**
   * External resource associated with the management operation
   */
  external_resource?: ExternalResource | null;

  financial_account_token?: string;

  pending_amount?: number;

  result?: 'APPROVED' | 'DECLINED';

  settled_amount?: number;

  transaction_series?: ManagementOperationTransaction.TransactionSeries | null;

  user_defined_id?: string;
}

export namespace ManagementOperationTransaction {
  export interface Event {
    token: string;

    amount: number;

    created: string;

    detailed_results: Array<'APPROVED' | 'INSUFFICIENT_FUNDS'>;

    effective_date: string;

    memo: string;

    result: 'APPROVED' | 'DECLINED';

    type:
      | 'LOSS_WRITE_OFF'
      | 'CASH_BACK'
      | 'CASH_BACK_REVERSAL'
      | 'CURRENCY_CONVERSION'
      | 'CURRENCY_CONVERSION_REVERSAL'
      | 'INTEREST'
      | 'INTEREST_REVERSAL'
      | 'LATE_PAYMENT'
      | 'LATE_PAYMENT_REVERSAL'
      | 'BILLING_ERROR'
      | 'BILLING_ERROR_REVERSAL'
      | 'PROVISIONAL_CREDIT'
      | 'PROVISIONAL_CREDIT_REVERSAL'
      | 'RETURNED_PAYMENT'
      | 'RETURNED_PAYMENT_REVERSAL'
      | 'DISPUTE_WON'
      | 'DISPUTE_WON_REVERSAL'
      | 'DISBURSE'
      | 'DISBURSE_REVERSAL';

    subtype?: string;
  }

  export interface TransactionSeries {
    related_transaction_event_token: string | null;

    related_transaction_token: string | null;

    type: string;
  }
}

export interface ManagementOperationCreateParams {
  amount: number;

  category:
    | 'MANAGEMENT_FEE'
    | 'MANAGEMENT_DISPUTE'
    | 'MANAGEMENT_REWARD'
    | 'MANAGEMENT_ADJUSTMENT'
    | 'MANAGEMENT_DISBURSEMENT';

  direction: 'CREDIT' | 'DEBIT';

  effective_date: string;

  event_type:
    | 'LOSS_WRITE_OFF'
    | 'CASH_BACK'
    | 'CASH_BACK_REVERSAL'
    | 'CURRENCY_CONVERSION'
    | 'CURRENCY_CONVERSION_REVERSAL'
    | 'INTEREST'
    | 'INTEREST_REVERSAL'
    | 'LATE_PAYMENT'
    | 'LATE_PAYMENT_REVERSAL'
    | 'BILLING_ERROR'
    | 'BILLING_ERROR_REVERSAL'
    | 'PROVISIONAL_CREDIT'
    | 'PROVISIONAL_CREDIT_REVERSAL'
    | 'RETURNED_PAYMENT'
    | 'RETURNED_PAYMENT_REVERSAL'
    | 'DISPUTE_WON'
    | 'DISPUTE_WON_REVERSAL'
    | 'DISBURSE'
    | 'DISBURSE_REVERSAL';

  financial_account_token: string;

  token?: string;

  memo?: string;

  /**
   * What to do if the financial account is closed when posting an operation
   */
  on_closed_account?: 'FAIL' | 'USE_SUSPENSE';

  subtype?: string;

  user_defined_id?: string;
}

export interface ManagementOperationListParams extends CursorPageParams {
  /**
   * Date string in RFC 3339 format. Only entries created after the specified time
   * will be included. UTC time zone.
   */
  begin?: string;

  business_account_token?: string;

  /**
   * Management operation category to be returned.
   */
  category?:
    | 'MANAGEMENT_FEE'
    | 'MANAGEMENT_DISPUTE'
    | 'MANAGEMENT_REWARD'
    | 'MANAGEMENT_ADJUSTMENT'
    | 'MANAGEMENT_DISBURSEMENT';

  /**
   * Date string in RFC 3339 format. Only entries created before the specified time
   * will be included. UTC time zone.
   */
  end?: string;

  /**
   * Globally unique identifier for the financial account. Accepted type dependent on
   * the program's use case.
   */
  financial_account_token?: string;

  /**
   * Management operation status to be returned.
   */
  status?: 'PENDING' | 'SETTLED' | 'DECLINED' | 'REVERSED' | 'CANCELED';
}

export interface ManagementOperationReverseParams {
  effective_date: string;

  memo?: string;
}

ManagementOperations.ManagementOperationTransactionsCursorPage = ManagementOperationTransactionsCursorPage;

export declare namespace ManagementOperations {
  export {
    type ExternalResource as ExternalResource,
    type ExternalResourceType as ExternalResourceType,
    type ManagementOperationTransaction as ManagementOperationTransaction,
    ManagementOperationTransactionsCursorPage as ManagementOperationTransactionsCursorPage,
    type ManagementOperationCreateParams as ManagementOperationCreateParams,
    type ManagementOperationListParams as ManagementOperationListParams,
    type ManagementOperationReverseParams as ManagementOperationReverseParams,
  };
}
