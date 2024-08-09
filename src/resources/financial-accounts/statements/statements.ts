// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../resource';
import { isRequestOptions } from '../../../core';
import * as Core from '../../../core';
import * as StatementsAPI from './statements';
import * as LineItemsAPI from './line-items';
import { CursorPage, type CursorPageParams } from '../../../pagination';

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

  account_standing: Statement.AccountStanding;

  /**
   * Payment due at the end of the billing period. Negative amount indicates
   * something is owed. If the amount owed is positive (e.g., there was a net
   * credit), then payment should be returned to the cardholder via ACH.
   */
  amount_due: number;

  /**
   * Payment past due at the end of the billing period.
   */
  amount_past_due: number;

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
   * Globally unique identifier for a credit product
   */
  credit_product_token: string;

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
   * Date of when the next statement will be created
   */
  next_statement_date: string;

  /**
   * Date when the payment is due
   */
  payment_due_date: string;

  period_totals: Statement.PeriodTotals;

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

  ytd_totals: Statement.YtdTotals;
}

export namespace Statement {
  export interface AccountStanding {
    /**
     * Current overall period number
     */
    period_number: number;

    period_state: 'STANDARD' | 'PROMO' | 'PENALTY';
  }

  export interface PeriodTotals {
    balance_transfers: number;

    cash_advances: number;

    credits: number;

    fees: number;

    interest: number;

    payments: number;

    purchases: number;
  }

  export interface YtdTotals {
    balance_transfers: number;

    cash_advances: number;

    credits: number;

    fees: number;

    interest: number;

    payments: number;

    purchases: number;
  }
}

export interface Statements {
  data: Array<Statement>;

  has_more: boolean;
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
  export import Statements = StatementsAPI.Statements;
  export import StatementsCursorPage = StatementsAPI.StatementsCursorPage;
  export import StatementListParams = StatementsAPI.StatementListParams;
  export import LineItems = LineItemsAPI.LineItems;
  export import StatementLineItems = LineItemsAPI.StatementLineItems;
  export import LineItemListResponse = LineItemsAPI.LineItemListResponse;
  export import LineItemListResponsesCursorPage = LineItemsAPI.LineItemListResponsesCursorPage;
  export import LineItemListParams = LineItemsAPI.LineItemListParams;
}
