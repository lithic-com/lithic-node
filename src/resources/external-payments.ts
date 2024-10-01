// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import { isRequestOptions } from '../core';
import * as Core from '../core';
import * as ExternalPaymentsAPI from './external-payments';
import { CursorPage, type CursorPageParams } from '../pagination';

export class ExternalPayments extends APIResource {
  /**
   * Create external payment
   */
  create(body: ExternalPaymentCreateParams, options?: Core.RequestOptions): Core.APIPromise<ExternalPayment> {
    return this._client.post('/v1/external_payments', { body, ...options });
  }

  /**
   * Get external payment
   */
  retrieve(externalPaymentToken: string, options?: Core.RequestOptions): Core.APIPromise<ExternalPayment> {
    return this._client.get(`/v1/external_payments/${externalPaymentToken}`, options);
  }

  /**
   * List external payments
   */
  list(
    query?: ExternalPaymentListParams,
    options?: Core.RequestOptions,
  ): Core.PagePromise<ExternalPaymentsCursorPage, ExternalPayment>;
  list(options?: Core.RequestOptions): Core.PagePromise<ExternalPaymentsCursorPage, ExternalPayment>;
  list(
    query: ExternalPaymentListParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.PagePromise<ExternalPaymentsCursorPage, ExternalPayment> {
    if (isRequestOptions(query)) {
      return this.list({}, query);
    }
    return this._client.getAPIList('/v1/external_payments', ExternalPaymentsCursorPage, {
      query,
      ...options,
    });
  }

  /**
   * Cancel external payment
   */
  cancel(
    externalPaymentToken: string,
    body: ExternalPaymentCancelParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<ExternalPayment> {
    return this._client.post(`/v1/external_payments/${externalPaymentToken}/cancel`, { body, ...options });
  }

  /**
   * Release external payment
   */
  release(
    externalPaymentToken: string,
    body: ExternalPaymentReleaseParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<ExternalPayment> {
    return this._client.post(`/v1/external_payments/${externalPaymentToken}/release`, { body, ...options });
  }

  /**
   * Reverse external payment
   */
  reverse(
    externalPaymentToken: string,
    body: ExternalPaymentReverseParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<ExternalPayment> {
    return this._client.post(`/v1/external_payments/${externalPaymentToken}/reverse`, { body, ...options });
  }

  /**
   * Settle external payment
   */
  settle(
    externalPaymentToken: string,
    body: ExternalPaymentSettleParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<ExternalPayment> {
    return this._client.post(`/v1/external_payments/${externalPaymentToken}/settle`, { body, ...options });
  }
}

export class ExternalPaymentsCursorPage extends CursorPage<ExternalPayment> {}

export interface ExternalPayment {
  token: string;

  category: 'EXTERNAL_WIRE' | 'EXTERNAL_ACH' | 'EXTERNAL_CHECK' | 'EXTERNAL_TRANSFER';

  created: string;

  currency: string;

  events: Array<ExternalPayment.Event>;

  financial_account_token: string;

  payment_type: 'DEPOSIT' | 'WITHDRAWAL';

  pending_amount: number;

  result: 'APPROVED' | 'DECLINED';

  settled_amount: number;

  status: 'PENDING' | 'SETTLED' | 'DECLINED' | 'REVERSED' | 'CANCELED';

  updated: string;

  user_defined_id?: string;
}

export namespace ExternalPayment {
  export interface Event {
    token: string;

    amount: number;

    created: string;

    detailed_results: Array<'APPROVED'>;

    effective_date: string;

    memo: string;

    result: 'APPROVED' | 'DECLINED';

    type:
      | 'EXTERNAL_WIRE_INITIATED'
      | 'EXTERNAL_WIRE_CANCELED'
      | 'EXTERNAL_WIRE_SETTLED'
      | 'EXTERNAL_WIRE_REVERSED'
      | 'EXTERNAL_WIRE_RELEASED'
      | 'EXTERNAL_ACH_INITIATED'
      | 'EXTERNAL_ACH_CANCELED'
      | 'EXTERNAL_ACH_SETTLED'
      | 'EXTERNAL_ACH_REVERSED'
      | 'EXTERNAL_ACH_RELEASED'
      | 'EXTERNAL_TRANSFER_INITIATED'
      | 'EXTERNAL_TRANSFER_CANCELED'
      | 'EXTERNAL_TRANSFER_SETTLED'
      | 'EXTERNAL_TRANSFER_REVERSED'
      | 'EXTERNAL_TRANSFER_RELEASED'
      | 'EXTERNAL_CHECK_INITIATED'
      | 'EXTERNAL_CHECK_CANCELED'
      | 'EXTERNAL_CHECK_SETTLED'
      | 'EXTERNAL_CHECK_REVERSED'
      | 'EXTERNAL_CHECK_RELEASED';
  }
}

export interface ExternalPaymentCreateParams {
  amount: number;

  category: 'EXTERNAL_WIRE' | 'EXTERNAL_ACH' | 'EXTERNAL_CHECK' | 'EXTERNAL_TRANSFER';

  effective_date: string;

  financial_account_token: string;

  payment_type: 'DEPOSIT' | 'WITHDRAWAL';

  token?: string;

  memo?: string;

  progress_to?: 'SETTLED' | 'RELEASED';

  user_defined_id?: string;
}

export interface ExternalPaymentListParams extends CursorPageParams {
  /**
   * Date string in RFC 3339 format. Only entries created after the specified time
   * will be included. UTC time zone.
   */
  begin?: string;

  business_account_token?: string;

  /**
   * External Payment category to be returned.
   */
  category?: 'EXTERNAL_WIRE' | 'EXTERNAL_ACH' | 'EXTERNAL_CHECK' | 'EXTERNAL_TRANSFER';

  /**
   * Date string in RFC 3339 format. Only entries created before the specified time
   * will be included. UTC time zone.
   */
  end?: string;

  /**
   * Globally unique identifier for the financial account or card that will send the
   * funds. Accepted type dependent on the program's use case.
   */
  financial_account_token?: string;

  /**
   * External Payment result to be returned.
   */
  result?: 'APPROVED' | 'DECLINED';

  /**
   * Book transfer status to be returned.
   */
  status?: 'PENDING' | 'SETTLED' | 'DECLINED' | 'REVERSED' | 'CANCELED';
}

export interface ExternalPaymentCancelParams {
  effective_date: string;

  memo?: string;
}

export interface ExternalPaymentReleaseParams {
  effective_date: string;

  memo?: string;
}

export interface ExternalPaymentReverseParams {
  effective_date: string;

  memo?: string;
}

export interface ExternalPaymentSettleParams {
  effective_date: string;

  memo?: string;

  progress_to?: 'SETTLED' | 'RELEASED';
}

export namespace ExternalPayments {
  export import ExternalPayment = ExternalPaymentsAPI.ExternalPayment;
  export import ExternalPaymentsCursorPage = ExternalPaymentsAPI.ExternalPaymentsCursorPage;
  export import ExternalPaymentCreateParams = ExternalPaymentsAPI.ExternalPaymentCreateParams;
  export import ExternalPaymentListParams = ExternalPaymentsAPI.ExternalPaymentListParams;
  export import ExternalPaymentCancelParams = ExternalPaymentsAPI.ExternalPaymentCancelParams;
  export import ExternalPaymentReleaseParams = ExternalPaymentsAPI.ExternalPaymentReleaseParams;
  export import ExternalPaymentReverseParams = ExternalPaymentsAPI.ExternalPaymentReverseParams;
  export import ExternalPaymentSettleParams = ExternalPaymentsAPI.ExternalPaymentSettleParams;
}
