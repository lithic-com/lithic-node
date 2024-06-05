// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import * as Core from '../core';
import { APIResource } from '../resource';
import * as TransfersAPI from './transfers';
import * as BalancesAPI from './balances';

export class Transfers extends APIResource {
  /**
   * Transfer funds between two financial accounts or between a financial account and
   * card
   */
  create(body: TransferCreateParams, options?: Core.RequestOptions): Core.APIPromise<Transfer> {
    return this._client.post('/transfer', { body, ...options });
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
     * - `AUTHORIZATION` - Authorize a card transaction.
     * - `AUTHORIZATION_ADVICE` - Advice on a card transaction.
     * - `AUTHORIZATION_EXPIRY` - Card Authorization has expired and reversed by
     *   Lithic.
     * - `AUTHORIZATION_REVERSAL` - Card Authorization was reversed by the merchant.
     * - `BALANCE_INQUIRY` - A card balance inquiry (typically a $0 authorization) has
     *   occurred on a card.
     * - `CLEARING` - Card Transaction is settled.
     * - `CORRECTION_DEBIT` - Manual card transaction correction (Debit).
     * - `CORRECTION_CREDIT` - Manual card transaction correction (Credit).
     * - `CREDIT_AUTHORIZATION` - A refund or credit card authorization from a
     *   merchant.
     * - `CREDIT_AUTHORIZATION_ADVICE` - A credit card authorization was approved on
     *   your behalf by the network.
     * - `FINANCIAL_AUTHORIZATION` - A request from a merchant to debit card funds
     *   without additional clearing.
     * - `FINANCIAL_CREDIT_AUTHORIZATION` - A request from a merchant to refund or
     *   credit card funds without additional clearing.
     * - `RETURN` - A card refund has been processed on the transaction.
     * - `RETURN_REVERSAL` - A card refund has been reversed (e.g., when a merchant
     *   reverses an incorrect refund).
     * - `TRANSFER` - Successful internal transfer of funds between financial accounts.
     * - `TRANSFER_INSUFFICIENT_FUNDS` - Declined internl transfer of funds due to
     *   insufficient balance of the sender.
     */
    type?:
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
      | 'AUTHORIZATION'
      | 'AUTHORIZATION_ADVICE'
      | 'AUTHORIZATION_EXPIRY'
      | 'AUTHORIZATION_REVERSAL'
      | 'BALANCE_INQUIRY'
      | 'CLEARING'
      | 'CORRECTION_CREDIT'
      | 'CORRECTION_DEBIT'
      | 'CREDIT_AUTHORIZATION'
      | 'CREDIT_AUTHORIZATION_ADVICE'
      | 'FINANCIAL_AUTHORIZATION'
      | 'FINANCIAL_CREDIT_AUTHORIZATION'
      | 'RETURN'
      | 'RETURN_REVERSAL'
      | 'TRANSFER'
      | 'TRANSFER_INSUFFICIENT_FUNDS';
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

export namespace Transfers {
  export import Transfer = TransfersAPI.Transfer;
  export import TransferCreateParams = TransfersAPI.TransferCreateParams;
}
