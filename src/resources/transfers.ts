// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as BalancesAPI from './balances';
import * as Shared from './shared';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

export class Transfers extends APIResource {
  /**
   * Transfer funds between two financial accounts or between a financial account and
   * card
   *
   * @deprecated
   */
  create(body: TransferCreateParams, options?: RequestOptions): APIPromise<Transfer> {
    return this._client.post('/v1/transfer', { body, ...options });
  }
}

export interface Transfer {
  /**
   * Globally unique identifier for the transfer event.
   */
  token?: string;

  /**
   * Status types:
   *
   * - `TRANSFER` - Internal transfer of funds between financial accounts in your
   *   program.
   */
  category?: 'TRANSFER';

  /**
   * Date and time when the transfer occurred. UTC time zone.
   */
  created?: string;

  /**
   * 3-character alphabetic ISO 4217 code for the settling currency of the
   * transaction.
   */
  currency?: string;

  /**
   * A string that provides a description of the transfer; may be useful to display
   * to users.
   */
  descriptor?: string;

  /**
   * A list of all financial events that have modified this trasnfer.
   */
  events?: Array<Shared.FinancialEvent>;

  /**
   * The updated balance of the sending financial account.
   */
  from_balance?: Array<BalancesAPI.Balance>;

  /**
   * Pending amount of the transaction in the currency's smallest unit (e.g., cents),
   * including any acquirer fees. The value of this field will go to zero over time
   * once the financial transaction is settled.
   */
  pending_amount?: number;

  /**
   * APPROVED transactions were successful while DECLINED transactions were declined
   * by user, Lithic, or the network.
   */
  result?: 'APPROVED' | 'DECLINED';

  /**
   * Amount of the transaction that has been settled in the currency's smallest unit
   * (e.g., cents).
   */
  settled_amount?: number;

  /**
   * Status types:
   *
   * - `DECLINED` - The transfer was declined.
   * - `EXPIRED` - The transfer was held in pending for too long and expired.
   * - `PENDING` - The transfer is pending release from a hold.
   * - `SETTLED` - The transfer is completed.
   * - `VOIDED` - The transfer was reversed before it settled.
   */
  status?: 'DECLINED' | 'EXPIRED' | 'PENDING' | 'SETTLED' | 'VOIDED';

  /**
   * The updated balance of the receiving financial account.
   */
  to_balance?: Array<BalancesAPI.Balance>;

  /**
   * Date and time when the financial transaction was last updated. UTC time zone.
   */
  updated?: string;
}

export interface TransferCreateParams {
  /**
   * Amount to be transferred in the currency’s smallest unit (e.g., cents for USD).
   * This should always be a positive value.
   */
  amount: number;

  /**
   * Globally unique identifier for the financial account or card that will send the
   * funds. Accepted type dependent on the program's use case.
   */
  from: string;

  /**
   * Globally unique identifier for the financial account or card that will receive
   * the funds. Accepted type dependent on the program's use case.
   */
  to: string;

  /**
   * Customer-provided token that will serve as an idempotency token. This token will
   * become the transaction token.
   */
  token?: string;

  /**
   * Optional descriptor for the transfer.
   */
  memo?: string;
}

export declare namespace Transfers {
  export { type Transfer as Transfer, type TransferCreateParams as TransferCreateParams };
}
