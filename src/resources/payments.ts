// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import * as Core from '../core';
import { APIResource } from '../resource';
import { isRequestOptions } from '../core';
import * as PaymentsAPI from './payments';
import * as BalancesAPI from './balances';
import * as FinancialAccountsAPI from './financial-accounts/financial-accounts';
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

export interface Payment extends FinancialAccountsAPI.FinancialTransaction {
  direction: 'CREDIT' | 'DEBIT';

  external_bank_account_token: string | null;

  financial_account_token: string;

  method: 'ACH_NEXT_DAY' | 'ACH_SAME_DAY';

  method_attributes: Payment.MethodAttributes;

  source: 'CUSTOMER' | 'LITHIC';

  user_defined_id: string | null;
}

export namespace Payment {
  export interface MethodAttributes {
    company_id: string | null;

    receipt_routing_number: string | null;

    retries: number | null;

    return_reason_code: string | null;

    sec_code: 'CCD' | 'PPD' | 'WEB';
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
    company_id: string | null;

    receipt_routing_number: string | null;

    retries: number | null;

    return_reason_code: string | null;

    sec_code: 'CCD' | 'PPD' | 'WEB';
  }
}

export interface PaymentListParams extends CursorPageParams {
  /**
   * Date string in RFC 3339 format. Only entries created after the specified time
   * will be included. UTC time zone.
   */
  begin?: string;

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
    | 'PROGRAM_TRANSACTION_LIMITS_EXCEEDED'
    | 'PROGRAM_DAILY_LIMITS_EXCEEDED'
    | 'PROGRAM_MONTHLY_LIMITS_EXCEEDED';

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
