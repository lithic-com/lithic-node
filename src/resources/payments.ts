// File generated from our OpenAPI spec by Stainless.

import * as Core from 'lithic/core';
import { APIResource } from 'lithic/resource';
import { isRequestOptions } from 'lithic/core';
import * as FinancialAccounts from 'lithic/resources/financial-accounts/index';
import * as Balances from 'lithic/resources/balances';
import * as API from './index';
import { CursorPage, CursorPageParams } from 'lithic/pagination';

export class Payments extends APIResource {
  /**
   * Initiates a payment between a financial account and an external bank account.
   */
  create(body: PaymentCreateParams, options?: Core.RequestOptions): Core.APIPromise<PaymentCreateResponse> {
    return this.post('/payments', { body, ...options });
  }

  /**
   * Get the payment by token.
   */
  retrieve(paymentToken: string, options?: Core.RequestOptions): Core.APIPromise<Payment> {
    return this.get(`/payments/${paymentToken}`, options);
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
    return this.getAPIList('/payments', PaymentsCursorPage, { query, ...options });
  }

  /**
   * Simulates a release of a Payment.
   */
  simulateRelease(
    body: PaymentSimulateReleaseParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<PaymentSimulateReleaseResponse> {
    return this.post('/simulate/payments/release', { body, ...options });
  }

  /**
   * Simulates a return of a Payment.
   */
  simulateReturn(
    body: PaymentSimulateReturnParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<PaymentSimulateReturnResponse> {
    return this.post('/simulate/payments/return', { body, ...options });
  }
}

export class PaymentsCursorPage extends CursorPage<Payment> {}
// alias so we can export it in the namespace
type _PaymentsCursorPage = PaymentsCursorPage;

export interface Payment extends FinancialAccounts.FinancialTransaction {
  direction: 'CREDIT' | 'DEBIT';

  method: 'ACH_NEXT_DAY' | 'ACH_SAME_DAY';

  method_attributes: Payment.MethodAttributes;

  source: 'LITHIC' | 'CUSTOMER';

  external_bank_account_token?: string;

  user_defined_id?: string;
}

export namespace Payment {
  export interface MethodAttributes {
    sec_code: 'PPD' | 'CCD' | 'WEB';
  }
}

export interface PaymentCreateResponse extends Payment {
  /**
   * Balance of a Financial Account
   */
  balance?: Balances.Balance;
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

  type: 'PAYMENT' | 'COLLECTION';

  token?: string;

  memo?: string;

  user_defined_id?: string;
}

export namespace PaymentCreateParams {
  export interface MethodAttributes {
    sec_code: 'PPD' | 'CCD' | 'WEB';
  }
}

export interface PaymentListParams extends CursorPageParams {
  financial_account_token?: string;

  result?: 'APPROVED' | 'DECLINED';

  status?: 'PENDING' | 'VOIDED' | 'SETTLED' | 'DECLINED' | 'EXPIRED';
}

export interface PaymentSimulateReleaseParams {
  payment_token: string;
}

export interface PaymentSimulateReturnParams {
  payment_token: string;

  return_reason_code?: string;
}

export namespace Payments {
  export import Payment = API.Payment;
  export import PaymentCreateResponse = API.PaymentCreateResponse;
  export import PaymentSimulateReleaseResponse = API.PaymentSimulateReleaseResponse;
  export import PaymentSimulateReturnResponse = API.PaymentSimulateReturnResponse;
  export type PaymentsCursorPage = _PaymentsCursorPage;
  export import PaymentCreateParams = API.PaymentCreateParams;
  export import PaymentListParams = API.PaymentListParams;
  export import PaymentSimulateReleaseParams = API.PaymentSimulateReleaseParams;
  export import PaymentSimulateReturnParams = API.PaymentSimulateReturnParams;
}
