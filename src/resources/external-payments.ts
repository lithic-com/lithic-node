// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { CursorPage, type CursorPageParams, PagePromise } from '../core/pagination';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class ExternalPayments extends APIResource {
  /**
   * Create external payment
   */
  create(body: ExternalPaymentCreateParams, options?: RequestOptions): APIPromise<ExternalPayment> {
    return this._client.post('/v1/external_payments', { body, ...options });
  }

  /**
   * Get external payment
   */
  retrieve(externalPaymentToken: string, options?: RequestOptions): APIPromise<ExternalPayment> {
    return this._client.get(path`/v1/external_payments/${externalPaymentToken}`, options);
  }

  /**
   * List external payments
   */
  list(
    query: ExternalPaymentListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<ExternalPaymentsCursorPage, ExternalPayment> {
    return this._client.getAPIList('/v1/external_payments', CursorPage<ExternalPayment>, {
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
    options?: RequestOptions,
  ): APIPromise<ExternalPayment> {
    return this._client.post(path`/v1/external_payments/${externalPaymentToken}/cancel`, {
      body,
      ...options,
    });
  }

  /**
   * Release external payment
   */
  release(
    externalPaymentToken: string,
    body: ExternalPaymentReleaseParams,
    options?: RequestOptions,
  ): APIPromise<ExternalPayment> {
    return this._client.post(path`/v1/external_payments/${externalPaymentToken}/release`, {
      body,
      ...options,
    });
  }

  /**
   * Reverse external payment
   */
  reverse(
    externalPaymentToken: string,
    body: ExternalPaymentReverseParams,
    options?: RequestOptions,
  ): APIPromise<ExternalPayment> {
    return this._client.post(path`/v1/external_payments/${externalPaymentToken}/reverse`, {
      body,
      ...options,
    });
  }

  /**
   * Settle external payment
   */
  settle(
    externalPaymentToken: string,
    body: ExternalPaymentSettleParams,
    options?: RequestOptions,
  ): APIPromise<ExternalPayment> {
    return this._client.post(path`/v1/external_payments/${externalPaymentToken}/settle`, {
      body,
      ...options,
    });
  }
}

export type ExternalPaymentsCursorPage = CursorPage<ExternalPayment>;

export interface ExternalPayment {
  /**
   * Unique identifier for the transaction
   */
  token: string;

  /**
   * ISO 8601 timestamp of when the transaction was created
   */
  created: string;

  /**
   * The status of the transaction
   */
  status: 'PENDING' | 'SETTLED' | 'DECLINED' | 'REVERSED' | 'CANCELED' | 'RETURNED';

  /**
   * ISO 8601 timestamp of when the transaction was last updated
   */
  updated: string;

  category?:
    | 'EXTERNAL_WIRE'
    | 'EXTERNAL_ACH'
    | 'EXTERNAL_CHECK'
    | 'EXTERNAL_FEDNOW'
    | 'EXTERNAL_RTP'
    | 'EXTERNAL_TRANSFER';

  currency?: string;

  events?: Array<ExternalPayment.Event>;

  /**
   * EXTERNAL_PAYMENT - External Payment Response
   */
  family?: 'EXTERNAL_PAYMENT';

  financial_account_token?: string;

  payment_type?: 'DEPOSIT' | 'WITHDRAWAL';

  pending_amount?: number;

  result?: 'APPROVED' | 'DECLINED';

  settled_amount?: number;

  user_defined_id?: string | null;
}

export namespace ExternalPayment {
  export interface Event {
    token: string;

    amount: number;

    created: string;

    detailed_results: Array<'APPROVED' | 'INSUFFICIENT_FUNDS'>;

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
      | 'EXTERNAL_CHECK_RELEASED'
      | 'EXTERNAL_FEDNOW_INITIATED'
      | 'EXTERNAL_FEDNOW_CANCELED'
      | 'EXTERNAL_FEDNOW_SETTLED'
      | 'EXTERNAL_FEDNOW_REVERSED'
      | 'EXTERNAL_FEDNOW_RELEASED'
      | 'EXTERNAL_RTP_INITIATED'
      | 'EXTERNAL_RTP_CANCELED'
      | 'EXTERNAL_RTP_SETTLED'
      | 'EXTERNAL_RTP_REVERSED'
      | 'EXTERNAL_RTP_RELEASED';
  }
}

export interface ExternalPaymentCreateParams {
  amount: number;

  category:
    | 'EXTERNAL_WIRE'
    | 'EXTERNAL_ACH'
    | 'EXTERNAL_CHECK'
    | 'EXTERNAL_FEDNOW'
    | 'EXTERNAL_RTP'
    | 'EXTERNAL_TRANSFER';

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
  category?:
    | 'EXTERNAL_WIRE'
    | 'EXTERNAL_ACH'
    | 'EXTERNAL_CHECK'
    | 'EXTERNAL_FEDNOW'
    | 'EXTERNAL_RTP'
    | 'EXTERNAL_TRANSFER';

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
  status?: 'PENDING' | 'SETTLED' | 'DECLINED' | 'REVERSED' | 'CANCELED' | 'RETURNED';
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

export declare namespace ExternalPayments {
  export {
    type ExternalPayment as ExternalPayment,
    type ExternalPaymentsCursorPage as ExternalPaymentsCursorPage,
    type ExternalPaymentCreateParams as ExternalPaymentCreateParams,
    type ExternalPaymentListParams as ExternalPaymentListParams,
    type ExternalPaymentCancelParams as ExternalPaymentCancelParams,
    type ExternalPaymentReleaseParams as ExternalPaymentReleaseParams,
    type ExternalPaymentReverseParams as ExternalPaymentReverseParams,
    type ExternalPaymentSettleParams as ExternalPaymentSettleParams,
  };
}
