// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import * as Core from 'lithic/core';
import { APIResource } from 'lithic/resource';
import { isRequestOptions } from 'lithic/core';
import * as StatementsAPI from 'lithic/resources/financial-accounts/statements/statements';
import * as LineItemsAPI from 'lithic/resources/financial-accounts/statements/line-items';
import { CursorPage, type CursorPageParams } from 'lithic/pagination';

export class Statements extends APIResource {
  lineItems: LineItemsAPI.LineItems = new LineItemsAPI.LineItems(this._client);

  /**
   * Get a specific statement for a given financial account.
   */
  retrieve(
    financialAccountToken: string,
    statementToken: string,
    options?: Core.RequestOptions,
  ): Core.APIPromise<Statement> {
    return this._client.get(
      `/financial_accounts/${financialAccountToken}/statements/${statementToken}`,
      options,
    );
  }

  /**
   * List the statements for a given financial account.
   */
  list(
    financialAccountToken: string,
    query?: StatementListParams,
    options?: Core.RequestOptions,
  ): Core.PagePromise<StatementsCursorPage, Statement>;
  list(
    financialAccountToken: string,
    options?: Core.RequestOptions,
  ): Core.PagePromise<StatementsCursorPage, Statement>;
  list(
    financialAccountToken: string,
    query: StatementListParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.PagePromise<StatementsCursorPage, Statement> {
    if (isRequestOptions(query)) {
      return this.list(financialAccountToken, {}, query);
    }
    return this._client.getAPIList(
      `/financial_accounts/${financialAccountToken}/statements`,
      StatementsCursorPage,
      { query, ...options },
    );
  }
}

export class StatementsCursorPage extends CursorPage<Statement> {}

export interface Statement {
  /**
   * Globally unique identifier for a statement
   */
  token: string;

  /**
   * Total payments during this billing period.
   */
  ach_period_total: number;

  /**
   * Year-to-date settled payment total
   */
  ach_ytd_total: number;

  /**
   * Total adjustments during this billing period.
   */
  adjustments_period_total: number;

  /**
   * Year-to-date settled adjustments total
   */
  adjustments_ytd_total: number;

  /**
   * Payment due at the end of the billing period. Negative amount indicates
   * something is owed. If the amount owed is positive (e.g., there was a net
   * credit), then payment should be returned to the cardholder via ACH.
   */
  amount_due: number;

  /**
   * Amount of credit available to spend
   */
  available_credit: number;

  /**
   * Timestamp of when the statement was created
   */
  created: string;

  /**
   * For prepay accounts, this is the minimum prepay balance that must be maintained.
   * For charge card accounts, this is the maximum credit balance extended by a
   * lender.
   */
  credit_limit: number;

  /**
   * Number of days in the billing cycle
   */
  days_in_billing_cycle: number;

  /**
   * Balance at the end of the billing period. For charge cards, this should be the
   * same at the statement amount due.
   */
  ending_balance: number;

  /**
   * Globally unique identifier for a financial account
   */
  financial_account_token: string;

  /**
   * Date when the payment is due
   */
  payment_due_date: string;

  /**
   * Total settled card transactions during this billing period, determined by
   * liability date.
   */
  purchases_period_total: number;

  /**
   * Year-to-date settled card transaction total
   */
  purchases_ytd_total: number;

  /**
   * Balance at the start of the billing period
   */
  starting_balance: number;

  /**
   * Date when the billing period ended
   */
  statement_end_date: string;

  /**
   * Date when the billing period began
   */
  statement_start_date: string;

  /**
   * Timestamp of when the statement was updated
   */
  updated: string;
}

export interface StatementListParams extends CursorPageParams {
  /**
   * Date string in RFC 3339 format. Only entries created after the specified date
   * will be included.
   */
  begin?: string;

  /**
   * Date string in RFC 3339 format. Only entries created before the specified date
   * will be included.
   */
  end?: string;
}

export namespace Statements {
  export import Statement = StatementsAPI.Statement;
  export import StatementsCursorPage = StatementsAPI.StatementsCursorPage;
  export import StatementListParams = StatementsAPI.StatementListParams;
  export import LineItems = LineItemsAPI.LineItems;
  export import LineItemListResponse = LineItemsAPI.LineItemListResponse;
  export import LineItemListResponsesCursorPage = LineItemsAPI.LineItemListResponsesCursorPage;
  export import LineItemListParams = LineItemsAPI.LineItemListParams;
}
