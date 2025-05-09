// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import { isRequestOptions } from '../core';
import * as Core from '../core';
import * as BalancesAPI from './balances';
import { CursorPage, type CursorPageParams } from '../pagination';

export class Payments extends APIResource {
  /**
   * Initiates a payment between a financial account and an external bank account.
   *
   * @example
   * ```ts
   * const payment = await client.payments.create({
   *   amount: 1,
   *   external_bank_account_token:
   *     '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   *   financial_account_token:
   *     '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   *   method: 'ACH_NEXT_DAY',
   *   method_attributes: { sec_code: 'CCD' },
   *   type: 'COLLECTION',
   * });
   * ```
   */
  create(body: PaymentCreateParams, options?: Core.RequestOptions): Core.APIPromise<PaymentCreateResponse> {
    return this._client.post('/v1/payments', { body, ...options });
  }

  /**
   * Get the payment by token.
   *
   * @example
   * ```ts
   * const payment = await client.payments.retrieve(
   *   '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   * );
   * ```
   */
  retrieve(paymentToken: string, options?: Core.RequestOptions): Core.APIPromise<Payment> {
    return this._client.get(`/v1/payments/${paymentToken}`, options);
  }

  /**
   * List all the payments for the provided search criteria.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const payment of client.payments.list()) {
   *   // ...
   * }
   * ```
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
    return this._client.getAPIList('/v1/payments', PaymentsCursorPage, { query, ...options });
  }

  /**
   * Retry an origination which has been returned.
   *
   * @example
   * ```ts
   * const response = await client.payments.retry(
   *   '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   * );
   * ```
   */
  retry(paymentToken: string, options?: Core.RequestOptions): Core.APIPromise<PaymentRetryResponse> {
    return this._client.post(`/v1/payments/${paymentToken}/retry`, options);
  }

  /**
   * Simulate payment lifecycle event
   *
   * @example
   * ```ts
   * const response = await client.payments.simulateAction(
   *   '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   *   { event_type: 'ACH_ORIGINATION_REVIEWED' },
   * );
   * ```
   */
  simulateAction(
    paymentToken: string,
    body: PaymentSimulateActionParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<PaymentSimulateActionResponse> {
    return this._client.post(`/v1/simulate/payments/${paymentToken}/action`, { body, ...options });
  }

  /**
   * Simulates a receipt of a Payment.
   *
   * @example
   * ```ts
   * const response = await client.payments.simulateReceipt({
   *   token: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   *   amount: 0,
   *   financial_account_token:
   *     '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   *   receipt_type: 'RECEIPT_CREDIT',
   * });
   * ```
   */
  simulateReceipt(
    body: PaymentSimulateReceiptParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<PaymentSimulateReceiptResponse> {
    return this._client.post('/v1/simulate/payments/receipt', { body, ...options });
  }

  /**
   * Simulates a release of a Payment.
   *
   * @example
   * ```ts
   * const response = await client.payments.simulateRelease({
   *   payment_token: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   * });
   * ```
   */
  simulateRelease(
    body: PaymentSimulateReleaseParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<PaymentSimulateReleaseResponse> {
    return this._client.post('/v1/simulate/payments/release', { body, ...options });
  }

  /**
   * Simulates a return of a Payment.
   *
   * @example
   * ```ts
   * const response = await client.payments.simulateReturn({
   *   payment_token: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   * });
   * ```
   */
  simulateReturn(
    body: PaymentSimulateReturnParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<PaymentSimulateReturnResponse> {
    return this._client.post('/v1/simulate/payments/return', { body, ...options });
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
   * 3-character alphabetic ISO 4217 code for the settling currency of the payment.
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

  /**
   * Date when the financial transaction expected to be released after settlement
   */
  expected_release_date?: string;
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
  account_token?: string;

  /**
   * Date string in RFC 3339 format. Only entries created after the specified time
   * will be included. UTC time zone.
   */
  begin?: string;

  business_account_token?: string;

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
    | 'ACH_RETURN_PROCESSED'
    | 'ACH_RETURN_SETTLED';

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
   * Customer-generated payment token used to uniquely identify the simulated payment
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

Payments.PaymentsCursorPage = PaymentsCursorPage;

export declare namespace Payments {
  export {
    type Payment as Payment,
    type PaymentCreateResponse as PaymentCreateResponse,
    type PaymentRetryResponse as PaymentRetryResponse,
    type PaymentSimulateActionResponse as PaymentSimulateActionResponse,
    type PaymentSimulateReceiptResponse as PaymentSimulateReceiptResponse,
    type PaymentSimulateReleaseResponse as PaymentSimulateReleaseResponse,
    type PaymentSimulateReturnResponse as PaymentSimulateReturnResponse,
    PaymentsCursorPage as PaymentsCursorPage,
    type PaymentCreateParams as PaymentCreateParams,
    type PaymentListParams as PaymentListParams,
    type PaymentSimulateActionParams as PaymentSimulateActionParams,
    type PaymentSimulateReceiptParams as PaymentSimulateReceiptParams,
    type PaymentSimulateReleaseParams as PaymentSimulateReleaseParams,
    type PaymentSimulateReturnParams as PaymentSimulateReturnParams,
  };
}
