// File generated from our OpenAPI spec by Stainless.

import * as Core from 'lithic/core';
import { APIResource } from 'lithic/resource';
import { isRequestOptions } from 'lithic/core';
import * as LineItemsAPI from 'lithic/resources/financial-accounts/statements/line-items';
import { CursorPage, type CursorPageParams } from 'lithic/pagination';

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
    return this.getAPIList(
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

  category: 'CARD' | 'ACH' | 'TRANSFER';

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
   * - `ACH_INSUFFICIENT_FUNDS` - Attempted ACH origination declined due to
   *   insufficient balance.
   * - `ACH_ORIGINATION_PENDING` - ACH origination pending release from an ACH hold.
   * - `ACH_ORIGINATION_RELEASED` - ACH origination released from pending to
   *   available balance.
   * - `ACH_RECEIPT_PENDING` - ACH receipt pending release from an ACH holder.
   * - `ACH_RECEIPT_RELEASED` - ACH receipt released from pending to available
   *   balance.
   * - `ACH_RETURN` - ACH origination returned by the Receiving Depository Financial
   *   Institution.
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
    | 'ACH_INSUFFICIENT_FUNDS'
    | 'ACH_ORIGINATION_PENDING'
    | 'ACH_ORIGINATION_RELEASED'
    | 'ACH_RECEIPT_PENDING'
    | 'ACH_RECEIPT_RELEASED'
    | 'ACH_RETURN'
    | 'AUTHORIZATION'
    | 'AUTHORIZATION_ADVICE'
    | 'AUTHORIZATION_EXPIRY'
    | 'AUTHORIZATION_REVERSAL'
    | 'BALANCE_INQUIRY'
    | 'CLEARING'
    | 'CORRECTION_DEBIT'
    | 'CORRECTION_CREDIT'
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
