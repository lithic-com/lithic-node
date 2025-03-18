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

export interface ManagementOperationTransaction {
  token: string;

  category: 'MANAGEMENT_FEE' | 'MANAGEMENT_DISPUTE' | 'MANAGEMENT_REWARD' | 'MANAGEMENT_ADJUSTMENT';

  created: string;

  currency: string;

  direction: 'CREDIT' | 'DEBIT';

  events: Array<ManagementOperationTransaction.Event>;

  financial_account_token: string;

  pending_amount: number;

  result: 'APPROVED' | 'DECLINED';

  settled_amount: number;

  status: 'PENDING' | 'SETTLED' | 'DECLINED' | 'REVERSED' | 'CANCELED';

  updated: string;

  user_defined_id?: string;
}

export namespace ManagementOperationTransaction {
  export interface Event {
    token: string;

    amount: number;

    created: string;

    detailed_results: Array<'APPROVED'>;

    effective_date: string;

    memo: string;

    result: 'APPROVED' | 'DECLINED';

    type:
      | 'CASH_BACK'
      | 'CURRENCY_CONVERSION'
      | 'INTEREST'
      | 'LATE_PAYMENT'
      | 'BILLING_ERROR'
      | 'PROVISIONAL_CREDIT'
      | 'LOSS_WRITE_OFF'
      | 'CASH_BACK_REVERSAL'
      | 'CURRENCY_CONVERSION_REVERSAL'
      | 'INTEREST_REVERSAL'
      | 'LATE_PAYMENT_REVERSAL'
      | 'BILLING_ERROR_REVERSAL'
      | 'PROVISIONAL_CREDIT_REVERSAL'
      | 'RETURNED_PAYMENT'
      | 'RETURNED_PAYMENT_REVERSAL';

    subtype?: string;
  }
}

export interface ManagementOperationCreateParams {
  amount: number;

  category: 'MANAGEMENT_FEE' | 'MANAGEMENT_DISPUTE' | 'MANAGEMENT_REWARD' | 'MANAGEMENT_ADJUSTMENT';

  direction: 'CREDIT' | 'DEBIT';

  effective_date: string;

  event_type:
    | 'CASH_BACK'
    | 'CURRENCY_CONVERSION'
    | 'INTEREST'
    | 'LATE_PAYMENT'
    | 'BILLING_ERROR'
    | 'PROVISIONAL_CREDIT'
    | 'LOSS_WRITE_OFF'
    | 'CASH_BACK_REVERSAL'
    | 'CURRENCY_CONVERSION_REVERSAL'
    | 'INTEREST_REVERSAL'
    | 'LATE_PAYMENT_REVERSAL'
    | 'BILLING_ERROR_REVERSAL'
    | 'PROVISIONAL_CREDIT_REVERSAL'
    | 'RETURNED_PAYMENT'
    | 'RETURNED_PAYMENT_REVERSAL';

  financial_account_token: string;

  token?: string;

  memo?: string;

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
  category?: 'MANAGEMENT_FEE' | 'MANAGEMENT_DISPUTE' | 'MANAGEMENT_REWARD' | 'MANAGEMENT_ADJUSTMENT';

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
    type ManagementOperationTransaction as ManagementOperationTransaction,
    ManagementOperationTransactionsCursorPage as ManagementOperationTransactionsCursorPage,
    type ManagementOperationCreateParams as ManagementOperationCreateParams,
    type ManagementOperationListParams as ManagementOperationListParams,
    type ManagementOperationReverseParams as ManagementOperationReverseParams,
  };
}
