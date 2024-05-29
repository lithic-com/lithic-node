// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import * as Core from '../../../core';
import { APIResource } from '../../../resource';
import { isRequestOptions } from '../../../core';
import * as LineItemsAPI from './line-items';
import { CursorPage, type CursorPageParams } from '../../../pagination';

export class LineItems extends APIResource {
  /**
   * List the line items for a given statement within a given financial account.
   */
  list(
    financialAccountToken: string,
    statementToken: string,
    query?: LineItemListParams,
    options?: Core.RequestOptions,
  ): Core.PagePromise<LineItemListResponsesCursorPage, LineItemListResponse>;
  list(
    financialAccountToken: string,
    statementToken: string,
    options?: Core.RequestOptions,
  ): Core.PagePromise<LineItemListResponsesCursorPage, LineItemListResponse>;
  list(
    financialAccountToken: string,
    statementToken: string,
    query: LineItemListParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.PagePromise<LineItemListResponsesCursorPage, LineItemListResponse> {
    if (isRequestOptions(query)) {
      return this.list(financialAccountToken, statementToken, {}, query);
    }
    return this._client.getAPIList(
      `/financial_accounts/${financialAccountToken}/statements/${statementToken}/line_items`,
      LineItemListResponsesCursorPage,
      { query, ...options },
    );
  }
}

export class LineItemListResponsesCursorPage extends CursorPage<LineItemListResponse> {}

export interface LineItemListResponse {
  /**
   * Globally unique identifier for a Statement Line Item
   */
  token: string;

  amount: number;

  category: 'ACH' | 'CARD' | 'TRANSFER';

  /**
   * Timestamp of when the line item was generated
   */
  created: string;

  /**
   * 3-digit alphabetic ISO 4217 code for the settling currency of the transaction
   */
  currency: string;

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
  event_type:
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

  /**
   * Globally unique identifier for a financial account
   */
  financial_account_token: string;

  /**
   * Globally unique identifier for a financial transaction
   */
  financial_transaction_token: string;

  /**
   * Date that the transaction settled
   */
  settled_date: string;

  /**
   * Globally unique identifier for a card
   */
  card_token?: string;

  descriptor?: string;
}

export interface LineItemListParams extends CursorPageParams {}

export namespace LineItems {
  export import LineItemListResponse = LineItemsAPI.LineItemListResponse;
  export import LineItemListResponsesCursorPage = LineItemsAPI.LineItemListResponsesCursorPage;
  export import LineItemListParams = LineItemsAPI.LineItemListParams;
}
