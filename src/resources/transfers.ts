// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import * as Core from '../core';
import * as BalancesAPI from './balances';

export class Transfers extends APIResource {
  /**
   * Transfer funds between two financial accounts or between a financial account and
   * card
   */
  create(body: TransferCreateParams, options?: Core.RequestOptions): Core.APIPromise<Transfer> {
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
   * 3-digit alphabetic ISO 4217 code for the settling currency of the transaction.
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
  events?: Array<Transfer.Event>;

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

export namespace Transfer {
  export interface Event {
    /**
     * Globally unique identifier.
     */
    token?: string;

    /**
     * Amount of the financial event that has been settled in the currency's smallest
     * unit (e.g., cents).
     */
    amount?: number;

    /**
     * Date and time when the financial event occurred. UTC time zone.
     */
    created?: string;

    /**
     * APPROVED financial events were successful while DECLINED financial events were
     * declined by user, Lithic, or the network.
     */
    result?: 'APPROVED' | 'DECLINED';

    type?:
      | 'ACH_ORIGINATION_CANCELLED'
      | 'ACH_ORIGINATION_INITIATED'
      | 'ACH_ORIGINATION_PROCESSED'
      | 'ACH_ORIGINATION_RELEASED'
      | 'ACH_ORIGINATION_REVIEWED'
      | 'ACH_ORIGINATION_SETTLED'
      | 'ACH_RECEIPT_PROCESSED'
      | 'ACH_RECEIPT_SETTLED'
      | 'ACH_RETURN_INITIATED'
      | 'ACH_RETURN_PROCESSED'
      | 'ACH_RETURN_SETTLED'
      | 'AUTHORIZATION'
      | 'AUTHORIZATION_ADVICE'
      | 'AUTHORIZATION_EXPIRY'
      | 'AUTHORIZATION_REVERSAL'
      | 'BALANCE_INQUIRY'
      | 'BILLING_ERROR'
      | 'BILLING_ERROR_REVERSAL'
      | 'CARD_TO_CARD'
      | 'CASH_BACK'
      | 'CASH_BACK_REVERSAL'
      | 'CLEARING'
      | 'CORRECTION_CREDIT'
      | 'CORRECTION_DEBIT'
      | 'CREDIT_AUTHORIZATION'
      | 'CREDIT_AUTHORIZATION_ADVICE'
      | 'CURRENCY_CONVERSION'
      | 'CURRENCY_CONVERSION_REVERSAL'
      | 'DISPUTE_WON'
      | 'EXTERNAL_ACH_CANCELED'
      | 'EXTERNAL_ACH_INITIATED'
      | 'EXTERNAL_ACH_RELEASED'
      | 'EXTERNAL_ACH_REVERSED'
      | 'EXTERNAL_ACH_SETTLED'
      | 'EXTERNAL_CHECK_CANCELED'
      | 'EXTERNAL_CHECK_INITIATED'
      | 'EXTERNAL_CHECK_RELEASED'
      | 'EXTERNAL_CHECK_REVERSED'
      | 'EXTERNAL_CHECK_SETTLED'
      | 'EXTERNAL_TRANSFER_CANCELED'
      | 'EXTERNAL_TRANSFER_INITIATED'
      | 'EXTERNAL_TRANSFER_RELEASED'
      | 'EXTERNAL_TRANSFER_REVERSED'
      | 'EXTERNAL_TRANSFER_SETTLED'
      | 'EXTERNAL_WIRE_CANCELED'
      | 'EXTERNAL_WIRE_INITIATED'
      | 'EXTERNAL_WIRE_RELEASED'
      | 'EXTERNAL_WIRE_REVERSED'
      | 'EXTERNAL_WIRE_SETTLED'
      | 'FINANCIAL_AUTHORIZATION'
      | 'FINANCIAL_CREDIT_AUTHORIZATION'
      | 'INTEREST'
      | 'INTEREST_REVERSAL'
      | 'INTERNAL_ADJUSTMENT'
      | 'LATE_PAYMENT'
      | 'LATE_PAYMENT_REVERSAL'
      | 'PROVISIONAL_CREDIT'
      | 'PROVISIONAL_CREDIT_REVERSAL'
      | 'RETURN'
      | 'RETURN_REVERSAL'
      | 'TRANSFER'
      | 'TRANSFER_INSUFFICIENT_FUNDS'
      | 'RETURNED_PAYMENT'
      | 'RETURNED_PAYMENT_REVERSAL';
  }
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
