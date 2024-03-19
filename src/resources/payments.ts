// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import * as Core from 'lithic/core';
import { APIResource } from 'lithic/resource';
import { isRequestOptions } from 'lithic/core';
import * as PaymentsAPI from 'lithic/resources/payments';
import * as BalancesAPI from 'lithic/resources/balances';
import * as FinancialAccountsAPI from 'lithic/resources/financial-accounts/financial-accounts';
import { CursorPage, type CursorPageParams } from 'lithic/pagination';

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

  method: 'ACH_NEXT_DAY' | 'ACH_SAME_DAY';

  method_attributes: Payment.MethodAttributes;

  source: 'CUSTOMER' | 'LITHIC';

  external_bank_account_token?: string;

  user_defined_id?: string;
}

export namespace Payment {
  export interface MethodAttributes {
    sec_code: 'CCD' | 'PPD' | 'WEB';

    company_id?: string;

    receipt_routing_number?: string;

    retries?: number;

    return_reason_code?: string;
  }
}

export interface PaymentCreateResponse extends Payment {
  /**
   * Balance of a Financial Account
   */
  balance?: BalancesAPI.Balance;
}

export interface PaymentRetryResponse extends Payment {
  /**
   * Balance of a Financial Account
   */
  balance?: BalancesAPI.Balance;
}

export interface PaymentSimulateReleaseResponse {
  debugging_request_id?: string;

  result?: 'APPROVED' | 'DECLINED';

  transaction_event_token?: string;
}

export interface PaymentSimulateReturnResponse {
  debugging_request_id?: string;

  result?: 'APPROVED' | 'DECLINED';

  transaction_event_token?: string;
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

    company_id?: string;

    receipt_routing_number?: string;

    retries?: number;

    return_reason_code?: string;
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

export interface PaymentSimulateReleaseParams {
  payment_token: string;
}

export interface PaymentSimulateReturnParams {
  payment_token: string;

  return_reason_code?: string;
}

export namespace Payments {
  export import Payment = PaymentsAPI.Payment;
  export import PaymentCreateResponse = PaymentsAPI.PaymentCreateResponse;
  export import PaymentRetryResponse = PaymentsAPI.PaymentRetryResponse;
  export import PaymentSimulateReleaseResponse = PaymentsAPI.PaymentSimulateReleaseResponse;
  export import PaymentSimulateReturnResponse = PaymentsAPI.PaymentSimulateReturnResponse;
  export import PaymentsCursorPage = PaymentsAPI.PaymentsCursorPage;
  export import PaymentCreateParams = PaymentsAPI.PaymentCreateParams;
  export import PaymentListParams = PaymentsAPI.PaymentListParams;
  export import PaymentSimulateReleaseParams = PaymentsAPI.PaymentSimulateReleaseParams;
  export import PaymentSimulateReturnParams = PaymentsAPI.PaymentSimulateReturnParams;
}
