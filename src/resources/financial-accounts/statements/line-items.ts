// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../resource';
import { isRequestOptions } from '../../../core';
import * as Core from '../../../core';
import { CursorPage, type CursorPageParams } from '../../../pagination';

export class LineItems extends APIResource {
  /**
   * List the line items for a given statement within a given financial account.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const lineItem of client.financialAccounts.statements.lineItems.list(
   *   '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   *   'statement_token',
   * )) {
   *   // ...
   * }
   * ```
   */
  list(
    financialAccountToken: string,
    statementToken: string,
    query?: LineItemListParams,
    options?: Core.RequestOptions,
  ): Core.PagePromise<StatementLineItemsDataCursorPage, StatementLineItems.Data>;
  list(
    financialAccountToken: string,
    statementToken: string,
    options?: Core.RequestOptions,
  ): Core.PagePromise<StatementLineItemsDataCursorPage, StatementLineItems.Data>;
  list(
    financialAccountToken: string,
    statementToken: string,
    query: LineItemListParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.PagePromise<StatementLineItemsDataCursorPage, StatementLineItems.Data> {
    if (isRequestOptions(query)) {
      return this.list(financialAccountToken, statementToken, {}, query);
    }
    return this._client.getAPIList(
      `/v1/financial_accounts/${financialAccountToken}/statements/${statementToken}/line_items`,
      StatementLineItemsDataCursorPage,
      { query, ...options },
    );
  }
}

export class StatementLineItemsDataCursorPage extends CursorPage<StatementLineItems.Data> {}

// Here for back compatibility
export const LineItemListResponsesCursorPage = StatementLineItemsDataCursorPage;

export interface StatementLineItems {
  data: Array<StatementLineItems.Data>;

  has_more: boolean;
}

export namespace StatementLineItems {
  export interface Data {
    /**
     * Globally unique identifier for a Statement Line Item
     */
    token: string;

    /**
     * Transaction amount in cents
     */
    amount: number;

    category:
      | 'ACH'
      | 'BALANCE_OR_FUNDING'
      | 'CARD'
      | 'EXTERNAL_ACH'
      | 'EXTERNAL_CHECK'
      | 'EXTERNAL_TRANSFER'
      | 'EXTERNAL_WIRE'
      | 'MANAGEMENT_ADJUSTMENT'
      | 'MANAGEMENT_DISPUTE'
      | 'MANAGEMENT_FEE'
      | 'MANAGEMENT_REWARD'
      | 'MANAGEMENT_DISBURSEMENT'
      | 'PROGRAM_FUNDING';

    /**
     * Timestamp of when the line item was generated
     */
    created: string;

    /**
     * 3-character alphabetic ISO 4217 code for the settling currency of the
     * transaction
     */
    currency: string;

    /**
     * Date that the transaction effected the account balance
     */
    effective_date: string;

    event_type:
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
      | 'LOSS_WRITE_OFF'
      | 'PROVISIONAL_CREDIT'
      | 'PROVISIONAL_CREDIT_REVERSAL'
      | 'SERVICE'
      | 'RETURN'
      | 'RETURN_REVERSAL'
      | 'TRANSFER'
      | 'TRANSFER_INSUFFICIENT_FUNDS'
      | 'RETURNED_PAYMENT'
      | 'RETURNED_PAYMENT_REVERSAL'
      | 'LITHIC_NETWORK_PAYMENT';

    /**
     * Globally unique identifier for a financial account
     */
    financial_account_token: string;

    /**
     * Globally unique identifier for a financial transaction event
     */
    financial_transaction_event_token: string;

    /**
     * Globally unique identifier for a financial transaction
     */
    financial_transaction_token: string;

    /**
     * Globally unique identifier for a card
     */
    card_token?: string;

    descriptor?: string;
  }
}

export interface LineItemListResponse extends StatementLineItems.Data {}

export interface LineItemListParams extends CursorPageParams {}

LineItems.StatementLineItemsDataCursorPage = StatementLineItemsDataCursorPage;

// Here for back compatibility
LineItems.LineItemListResponsesCursorPage = LineItemListResponsesCursorPage;

export declare namespace LineItems {
  export {
    type StatementLineItems as StatementLineItems,
    StatementLineItemsDataCursorPage as StatementLineItemsDataCursorPage,
    type LineItemListParams as LineItemListParams,

    // Here for back compatibility
    type LineItemListResponse as LineItemListResponse,
    LineItemListResponsesCursorPage as LineItemListResponsesCursorPage,
  };
}
