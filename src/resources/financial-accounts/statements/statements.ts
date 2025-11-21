// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../resource';
import { isRequestOptions } from '../../../core';
import * as Core from '../../../core';
import * as FinancialAccountsAPI from '../financial-accounts';
import * as LineItemsAPI from './line-items';
import {
  LineItemListParams,
  LineItems,
  StatementLineItems,
  StatementLineItemsDataCursorPage,
  LineItemListResponse,
  LineItemListResponsesCursorPage,
} from './line-items';
import { CursorPage, type CursorPageParams } from '../../../pagination';

export class Statements extends APIResource {
  lineItems: LineItemsAPI.LineItems = new LineItemsAPI.LineItems(this._client);

  /**
   * Get a specific statement for a given financial account.
   *
   * @example
   * ```ts
   * const statement =
   *   await client.financialAccounts.statements.retrieve(
   *     '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   *     'statement_token',
   *   );
   * ```
   */
  retrieve(
    financialAccountToken: string,
    statementToken: string,
    options?: Core.RequestOptions,
  ): Core.APIPromise<Statement> {
    return this._client.get(
      `/v1/financial_accounts/${financialAccountToken}/statements/${statementToken}`,
      options,
    );
  }

  /**
   * List the statements for a given financial account.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const statement of client.financialAccounts.statements.list(
   *   '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   * )) {
   *   // ...
   * }
   * ```
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
      `/v1/financial_accounts/${financialAccountToken}/statements`,
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

  amount_due: Statement.AmountDue;

  /**
   * Amount of credit available to spend in cents
   */
  available_credit: number;

  /**
   * Timestamp of when the statement was created
   */
  created: string;

  /**
   * This is the maximum credit balance extended by the lender in cents
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
   * same at the statement amount due in cents
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
  payment_due_date: string | null;

  period_totals: FinancialAccountsAPI.StatementTotals;

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

  statement_type: 'INITIAL' | 'PERIOD_END' | 'FINAL';

  /**
   * Timestamp of when the statement was updated
   */
  updated: string;

  ytd_totals: FinancialAccountsAPI.StatementTotals;

  interest_details?: Statement.InterestDetails | null;

  /**
   * Date when the next payment is due
   */
  next_payment_due_date?: string;

  /**
   * Date when the next billing period will end
   */
  next_statement_end_date?: string;

  /**
   * Details on number and size of payments to pay off balance
   */
  payoff_details?: Statement.PayoffDetails | null;
}

export namespace Statement {
  export interface AccountStanding {
    /**
     * Number of consecutive full payments made
     */
    consecutive_full_payments_made: number;

    /**
     * Number of consecutive minimum payments made
     */
    consecutive_minimum_payments_made: number;

    /**
     * Number of consecutive minimum payments missed
     */
    consecutive_minimum_payments_missed: number;

    /**
     * Number of days past due
     */
    days_past_due: number;

    /**
     * Information about the financial account state
     */
    financial_account_state: AccountStanding.FinancialAccountState;

    /**
     * Whether the account currently has grace or not
     */
    has_grace: boolean;

    /**
     * Current overall period number
     */
    period_number: number;

    period_state: 'STANDARD' | 'PROMO' | 'PENALTY';
  }

  export namespace AccountStanding {
    /**
     * Information about the financial account state
     */
    export interface FinancialAccountState {
      /**
       * Status of the financial account
       */
      status: 'OPEN' | 'CLOSED' | 'SUSPENDED' | 'PENDING';

      /**
       * Substatus for the financial account
       */
      substatus?:
        | 'CHARGED_OFF_DELINQUENT'
        | 'CHARGED_OFF_FRAUD'
        | 'END_USER_REQUEST'
        | 'BANK_REQUEST'
        | 'DELINQUENT'
        | null;
    }
  }

  export interface AmountDue {
    /**
     * Payment due at the end of the billing period in cents. Negative amount indicates
     * something is owed. If the amount owed is positive there was a net credit. If
     * auto-collections are enabled this is the amount that will be requested on the
     * payment due date
     */
    amount: number;

    /**
     * Amount past due for statement in cents
     */
    past_due: number;
  }

  export interface InterestDetails {
    actual_interest_charged: number | null;

    daily_balance_amounts: FinancialAccountsAPI.CategoryDetails;

    effective_apr: FinancialAccountsAPI.CategoryDetails;

    interest_calculation_method: 'DAILY' | 'AVERAGE_DAILY';

    interest_for_period: FinancialAccountsAPI.CategoryDetails;

    prime_rate: string | null;

    minimum_interest_charged?: number | null;
  }

  /**
   * Details on number and size of payments to pay off balance
   */
  export interface PayoffDetails {
    /**
     * The number of months it would take to pay off the balance in full by only paying
     * the minimum payment. "NA" will signal negative or zero amortization
     */
    minimum_payment_months: string;

    /**
     * The sum of all interest and principal paid, in cents, when only paying minimum
     * monthly payment. "NA" will signal negative or zero amortization
     */
    minimum_payment_total: string;

    /**
     * Number of months to full pay off
     */
    payoff_period_length_months: number | null;

    /**
     * The amount needed to be paid, in cents, each month in order to pay off current
     * balance in the payoff period
     */
    payoff_period_monthly_payment_amount: number | null;

    /**
     * The sum of all interest and principal paid, in cents, when paying off in the
     * payoff period
     */
    payoff_period_payment_total: number | null;
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

  /**
   * Whether to include the initial statement. It is not included by default.
   */
  include_initial_statements?: boolean;
}

Statements.StatementsCursorPage = StatementsCursorPage;
Statements.LineItems = LineItems;
Statements.StatementLineItemsDataCursorPage = StatementLineItemsDataCursorPage;
// Here for back compatibility
Statements.LineItemListResponsesCursorPage = LineItemListResponsesCursorPage;

export declare namespace Statements {
  export {
    type Statement as Statement,
    type Statements as Statements,
    StatementsCursorPage as StatementsCursorPage,
    type StatementListParams as StatementListParams,
  };

  export {
    LineItems as LineItems,
    type StatementLineItems as StatementLineItems,
    StatementLineItemsDataCursorPage as StatementLineItemsDataCursorPage,
    type LineItemListParams as LineItemListParams,
    // Here for back compatibility
    type LineItemListResponse as LineItemListResponse,
    LineItemListResponsesCursorPage as LineItemListResponsesCursorPage,
  };
}
