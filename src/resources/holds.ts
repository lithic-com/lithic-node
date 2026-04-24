// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { CursorPage, type CursorPageParams, PagePromise } from '../core/pagination';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class Holds extends APIResource {
  /**
   * Create a hold on a financial account. Holds reserve funds by moving them from
   * available to pending balance. They can be resolved via settlement (linked to a
   * payment or book transfer), voiding, or expiration.
   */
  create(financialAccountToken: string, body: HoldCreateParams, options?: RequestOptions): APIPromise<Hold> {
    return this._client.post(path`/v1/financial_accounts/${financialAccountToken}/holds`, { body, ...options });
  }

  /**
   * Get hold by token.
   */
  retrieve(holdToken: string, options?: RequestOptions): APIPromise<Hold> {
    return this._client.get(path`/v1/holds/${holdToken}`, options);
  }

  /**
   * List holds for a financial account.
   */
  list(financialAccountToken: string, query: HoldListParams | null | undefined = {}, options?: RequestOptions): PagePromise<HoldsCursorPage, Hold> {
    return this._client.getAPIList(path`/v1/financial_accounts/${financialAccountToken}/holds`, CursorPage<Hold>, { query, ...options });
  }

  /**
   * Void an active hold. This returns the held funds from pending back to available
   * balance. Only holds in PENDING status can be voided.
   */
  void(holdToken: string, body: HoldVoidParams, options?: RequestOptions): APIPromise<Hold> {
    return this._client.post(path`/v1/holds/${holdToken}/void`, { body, ...options });
  }
}

export type HoldsCursorPage = CursorPage<Hold>

/**
 * A hold transaction representing reserved funds on a financial account. Holds
 * move funds from available to pending balance in anticipation of future payments.
 * They can be resolved via settlement (linked to payment), manual release, or
 * expiration.
 */
export interface Hold {
  /**
   * Unique identifier for the transaction
   */
  token: string;

  /**
   * ISO 8601 timestamp of when the transaction was created
   */
  created: string;

  /**
   * Status of a hold transaction
   */
  status: 'PENDING' | 'SETTLED' | 'EXPIRED' | 'VOIDED' | 'DECLINED' | 'REVERSED' | 'CANCELED' | 'RETURNED';

  /**
   * ISO 8601 timestamp of when the transaction was last updated
   */
  updated: string;

  currency?: string;

  events?: Array<HoldEvent>;

  /**
   * When the hold will auto-expire if not resolved
   */
  expiration_datetime?: string | null;

  /**
   * HOLD - Hold Transaction
   */
  family?: 'HOLD';

  financial_account_token?: string;

  /**
   * Current pending amount (0 when resolved)
   */
  pending_amount?: number;

  result?: 'APPROVED' | 'DECLINED';

  user_defined_id?: string | null;
}

/**
 * Event representing a lifecycle change to a hold
 */
export interface HoldEvent {
  token: string;

  /**
   * Amount in cents
   */
  amount: number;

  created: string;

  detailed_results: Array<'APPROVED' | 'INSUFFICIENT_FUNDS'>;

  memo: string | null;

  result: 'APPROVED' | 'DECLINED';

  /**
   * Transaction token of the payment that settled this hold (only populated for
   * HOLD_SETTLED events)
   */
  settling_transaction_token: string | null;

  /**
   * Type of hold lifecycle event
   */
  type: 'HOLD_INITIATED' | 'HOLD_VOIDED' | 'HOLD_EXPIRED' | 'HOLD_SETTLED';
}

export interface HoldCreateParams {
  /**
   * Amount to hold in cents
   */
  amount: number;

  /**
   * Customer-provided token for idempotency. Becomes the hold token.
   */
  token?: string;

  /**
   * When the hold should auto-expire
   */
  expiration_datetime?: string;

  /**
   * Reason for the hold
   */
  memo?: string | null;

  /**
   * User-provided identifier for the hold
   */
  user_defined_id?: string;
}

export interface HoldListParams extends CursorPageParams {
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

  /**
   * Hold status to filter by.
   */
  status?: 'PENDING' | 'SETTLED' | 'EXPIRED' | 'VOIDED';
}

export interface HoldVoidParams {
  /**
   * Reason for voiding the hold
   */
  memo?: string | null;
}

export declare namespace Holds {
  export {
    type Hold as Hold,
    type HoldEvent as HoldEvent,
    type HoldsCursorPage as HoldsCursorPage,
    type HoldCreateParams as HoldCreateParams,
    type HoldListParams as HoldListParams,
    type HoldVoidParams as HoldVoidParams
  };
}
