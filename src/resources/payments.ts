// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import { isRequestOptions } from '../core';
import * as Core from '../core';
import * as PaymentsAPI from './payments';
import * as BalancesAPI from './balances';
import { CursorPage, type CursorPageParams } from '../pagination';

export class Payments extends APIResource {
  /**
   * Initiates a payment between a financial account and an external bank account.
   */
  create(body: PaymentCreateParams, options?: Core.RequestOptions): Core.APIPromise<PaymentCreateResponse> {
    return this._client.post('/payments', { body, ...options });
  }

  /**
   * Get the payment by token.
   */
  retrieve(paymentToken: string, options?: Core.RequestOptions): Core.APIPromise<Payment> {
    return this._client.get(`/payments/${paymentToken}`, options);
  }

  /**
   * List all the payments for the provided search criteria.
   */
  list(
    query?: PaymentListParams,
    options?: Core.RequestOptions,
  ): Core.PagePromise<PaymentsCursorPage, Payment>;
  list(options?: Core.RequestOptions): Core.PagePromise<PaymentsCursorPage, Payment>;
  list(
    query: PaymentListParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.PagePromise<PaymentsCursorPage, Payment> {
    if (isRequestOptions(query)) {
      return this.list({}, query);
    }
    return this._client.getAPIList('/payments', PaymentsCursorPage, { query, ...options });
  }

  /**
   * Retry an origination which has been returned.
   */
  retry(paymentToken: string, options?: Core.RequestOptions): Core.APIPromise<PaymentRetryResponse> {
    return this._client.post(`/payments/${paymentToken}/retry`, options);
  }

  /**
   * Simulate payment lifecycle event
   */
  simulateAction(
    paymentToken: string,
    body: PaymentSimulateActionParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<PaymentSimulateActionResponse> {
    return this._client.post(`/simulate/payments/${paymentToken}/action`, { body, ...options });
  }

  /**
   * Simulates a receipt of a Payment.
   */
  simulateReceipt(
    body: PaymentSimulateReceiptParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<PaymentSimulateReceiptResponse> {
    return this._client.post('/simulate/payments/receipt', { body, ...options });
  }

  /**
   * Simulates a release of a Payment.
   */
  simulateRelease(
    body: PaymentSimulateReleaseParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<PaymentSimulateReleaseResponse> {
    return this._client.post('/simulate/payments/release', { body, ...options });
  }

  /**
   * Simulates a return of a Payment.
   */
  simulateReturn(
    body: PaymentSimulateReturnParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<PaymentSimulateReturnResponse> {
    return this._client.post('/simulate/payments/return', { body, ...options });
  }
}

export class PaymentsCursorPage extends CursorPage<Payment> {}

export interface Payment {
  /**
   * Globally unique identifier.
   */
  token: string;

  /**
   * Payment category
   */
  category: 'ACH';

  /**
   * Date and time when the payment first occurred. UTC time zone.
   */
  created: string;

  /**
   * 3-digit alphabetic ISO 4217 code for the settling currency of the payment.
   */
  currency: string;

  /**
   * A string that provides a description of the payment; may be useful to display to
   * users.
   */
  descriptor: string;

  direction: 'CREDIT' | 'DEBIT';

  /**
   * A list of all payment events that have modified this payment.
   */
  events: Array<Payment.Event>;

  external_bank_account_token: string | null;

  financial_account_token: string;

  method: 'ACH_NEXT_DAY' | 'ACH_SAME_DAY';

  method_attributes: Payment.MethodAttributes;

  /**
   * Pending amount of the payment in the currency's smallest unit (e.g., cents). The
   * value of this field will go to zero over time once the payment is settled.
   */
  pending_amount: number;

  /**
   * APPROVED payments were successful while DECLINED payments were declined by
   * Lithic or returned.
   */
  result: 'APPROVED' | 'DECLINED';

  /**
   * Amount of the payment that has been settled in the currency's smallest unit
   * (e.g., cents).
   */
  settled_amount: number;

  source: 'CUSTOMER' | 'LITHIC';

  /**
   * Status types:
   *
   * - `DECLINED` - The payment was declined.
   * - `PENDING` - The payment is being processed and has yet to settle or release
   *   (origination debit).
   * - `RETURNED` - The payment has been returned.
   * - `SETTLED` - The payment is completed.
   */
  status: 'DECLINED' | 'PENDING' | 'RETURNED' | 'SETTLED';

  /**
   * Date and time when the financial transaction was last updated. UTC time zone.
   */
  updated: string;

  user_defined_id: string | null;
}

export namespace Payment {
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
     *   the fed.
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
      | 'ACH_RETURN_PROCESSED';

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

  export interface MethodAttributes {
    company_id: string | null;

    receipt_routing_number: string | null;

    retries: number | null;

    return_reason_code: string | null;

    sec_code: 'CCD' | 'PPD' | 'WEB';

    trace_numbers: Array<string | null>;
  }
}

export interface PaymentCreateResponse extends Payment {
  /**
   * Balance
   */
  balance?: BalancesAPI.Balance;
}

export interface PaymentRetryResponse extends Payment {
  /**
   * Balance
   */
  balance?: BalancesAPI.Balance;
}

export interface PaymentSimulateActionResponse {
  /**
   * Debugging Request Id
   */
  debugging_request_id: string;

  /**
   * Request Result
   */
  result: 'APPROVED' | 'DECLINED';

  /**
   * Transaction Event Token
   */
  transaction_event_token: string;
}

export interface PaymentSimulateReceiptResponse {
  /**
   * Debugging Request Id
   */
  debugging_request_id: string;

  /**
   * Request Result
   */
  result: 'APPROVED' | 'DECLINED';

  /**
   * Transaction Event Token
   */
  transaction_event_token: string;
}

export interface PaymentSimulateReleaseResponse {
  /**
   * Debugging Request Id
   */
  debugging_request_id: string;

  /**
   * Request Result
   */
  result: 'APPROVED' | 'DECLINED';

  /**
   * Transaction Event Token
   */
  transaction_event_token: string;
}

export interface PaymentSimulateReturnResponse {
  /**
   * Debugging Request Id
   */
  debugging_request_id: string;

  /**
   * Request Result
   */
  result: 'APPROVED' | 'DECLINED';

  /**
   * Transaction Event Token
   */
  transaction_event_token: string;
}

export interface PaymentCreateParams {
  amount: number;

  external_bank_account_token: string;

  financial_account_token: string;

  method: 'ACH_NEXT_DAY' | 'ACH_SAME_DAY';

  method_attributes: PaymentCreateParams.MethodAttributes;

  type: 'COLLECTION' | 'PAYMENT';

  /**
   * Customer-provided token that will serve as an idempotency token. This token will
   * become the transaction token.
   */
  token?: string;

  memo?: string;

  user_defined_id?: string;
}

export namespace PaymentCreateParams {
  export interface MethodAttributes {
    sec_code: 'CCD' | 'PPD' | 'WEB';
  }
}

export interface PaymentListParams extends CursorPageParams {
  /**
   * Date string in RFC 3339 format. Only entries created after the specified time
   * will be included. UTC time zone.
   */
  begin?: string;

  category?: 'ACH';

  /**
   * Date string in RFC 3339 format. Only entries created before the specified time
   * will be included. UTC time zone.
   */
  end?: string;

  financial_account_token?: string;

  result?: 'APPROVED' | 'DECLINED';

  status?: 'DECLINED' | 'PENDING' | 'RETURNED' | 'SETTLED';
}

export interface PaymentSimulateActionParams {
  /**
   * Event Type
   */
  event_type:
    | 'ACH_ORIGINATION_REVIEWED'
    | 'ACH_ORIGINATION_RELEASED'
    | 'ACH_ORIGINATION_PROCESSED'
    | 'ACH_ORIGINATION_SETTLED'
    | 'ACH_RECEIPT_SETTLED'
    | 'ACH_RETURN_INITIATED'
    | 'ACH_RETURN_PROCESSED';

  /**
   * Decline reason
   */
  decline_reason?:
    | 'PROGRAM_TRANSACTION_LIMIT_EXCEEDED'
    | 'PROGRAM_DAILY_LIMIT_EXCEEDED'
    | 'PROGRAM_MONTHLY_LIMIT_EXCEEDED';

  /**
   * Return Reason Code
   */
  return_reason_code?: string;
}

export interface PaymentSimulateReceiptParams {
  /**
   * Payment token
   */
  token: string;

  /**
   * Amount
   */
  amount: number;

  /**
   * Financial Account Token
   */
  financial_account_token: string;

  /**
   * Receipt Type
   */
  receipt_type: 'RECEIPT_CREDIT' | 'RECEIPT_DEBIT';

  /**
   * Memo
   */
  memo?: string;
}

export interface PaymentSimulateReleaseParams {
  /**
   * Payment Token
   */
  payment_token: string;
}

export interface PaymentSimulateReturnParams {
  /**
   * Payment Token
   */
  payment_token: string;

  /**
   * Return Reason Code
   */
  return_reason_code?: string;
}

export namespace Payments {
  export import Payment = PaymentsAPI.Payment;
  export import PaymentCreateResponse = PaymentsAPI.PaymentCreateResponse;
  export import PaymentRetryResponse = PaymentsAPI.PaymentRetryResponse;
  export import PaymentSimulateActionResponse = PaymentsAPI.PaymentSimulateActionResponse;
  export import PaymentSimulateReceiptResponse = PaymentsAPI.PaymentSimulateReceiptResponse;
  export import PaymentSimulateReleaseResponse = PaymentsAPI.PaymentSimulateReleaseResponse;
  export import PaymentSimulateReturnResponse = PaymentsAPI.PaymentSimulateReturnResponse;
  export import PaymentsCursorPage = PaymentsAPI.PaymentsCursorPage;
  export import PaymentCreateParams = PaymentsAPI.PaymentCreateParams;
  export import PaymentListParams = PaymentsAPI.PaymentListParams;
  export import PaymentSimulateActionParams = PaymentsAPI.PaymentSimulateActionParams;
  export import PaymentSimulateReceiptParams = PaymentsAPI.PaymentSimulateReceiptParams;
  export import PaymentSimulateReleaseParams = PaymentsAPI.PaymentSimulateReleaseParams;
  export import PaymentSimulateReturnParams = PaymentsAPI.PaymentSimulateReturnParams;
}
