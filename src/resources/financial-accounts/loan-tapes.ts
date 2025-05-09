// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../resource';
import { isRequestOptions } from '../../core';
import * as Core from '../../core';
import { CursorPage, type CursorPageParams } from '../../pagination';

export class LoanTapes extends APIResource {
  /**
   * Get a specific loan tape for a given financial account.
   *
   * @example
   * ```ts
   * const loanTape =
   *   await client.financialAccounts.loanTapes.retrieve(
   *     '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   *     'loan_tape_token',
   *   );
   * ```
   */
  retrieve(
    financialAccountToken: string,
    loanTapeToken: string,
    options?: Core.RequestOptions,
  ): Core.APIPromise<LoanTape> {
    return this._client.get(
      `/v1/financial_accounts/${financialAccountToken}/loan_tapes/${loanTapeToken}`,
      options,
    );
  }

  /**
   * List the loan tapes for a given financial account.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const loanTape of client.financialAccounts.loanTapes.list(
   *   '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   * )) {
   *   // ...
   * }
   * ```
   */
  list(
    financialAccountToken: string,
    query?: LoanTapeListParams,
    options?: Core.RequestOptions,
  ): Core.PagePromise<LoanTapesCursorPage, LoanTape>;
  list(
    financialAccountToken: string,
    options?: Core.RequestOptions,
  ): Core.PagePromise<LoanTapesCursorPage, LoanTape>;
  list(
    financialAccountToken: string,
    query: LoanTapeListParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.PagePromise<LoanTapesCursorPage, LoanTape> {
    if (isRequestOptions(query)) {
      return this.list(financialAccountToken, {}, query);
    }
    return this._client.getAPIList(
      `/v1/financial_accounts/${financialAccountToken}/loan_tapes`,
      LoanTapesCursorPage,
      { query, ...options },
    );
  }
}

export class LoanTapesCursorPage extends CursorPage<LoanTape> {}

export interface LoanTape {
  /**
   * Globally unique identifier for a loan tape
   */
  token: string;

  account_standing: LoanTape.AccountStanding;

  /**
   * Amount of credit available to spend in cents
   */
  available_credit: number;

  balances: LoanTape.Balances;

  /**
   * Timestamp of when the loan tape was created
   */
  created: string;

  /**
   * For prepay accounts, this is the minimum prepay balance that must be maintained.
   * For charge card accounts, this is the maximum credit balance extended by a
   * lender
   */
  credit_limit: number;

  /**
   * Globally unique identifier for a credit product
   */
  credit_product_token: string;

  /**
   * Date of transactions that this loan tape covers
   */
  date: string;

  day_totals: LoanTape.DayTotals;

  /**
   * Balance at the end of the day
   */
  ending_balance: number;

  /**
   * Excess credits in the form of provisional credits, payments, or purchase
   * refunds. If positive, the account is in net credit state with no outstanding
   * balances. An overpayment could land an account in this state
   */
  excess_credits: number;

  /**
   * Globally unique identifier for a financial account
   */
  financial_account_token: string;

  interest_details: LoanTape.InterestDetails | null;

  minimum_payment_balance: LoanTape.MinimumPaymentBalance;

  payment_allocation: LoanTape.PaymentAllocation;

  period_totals: LoanTape.PeriodTotals;

  previous_statement_balance: LoanTape.PreviousStatementBalance;

  /**
   * Balance at the start of the day
   */
  starting_balance: number;

  /**
   * Timestamp of when the loan tape was updated
   */
  updated: string;

  /**
   * Version number of the loan tape. This starts at 1
   */
  version: number;

  ytd_totals: LoanTape.YtdTotals;

  /**
   * Interest tier to which this account belongs to
   */
  tier?: string;
}

export namespace LoanTape {
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

  export interface Balances {
    /**
     * Amount due for the prior billing cycle. Any amounts not fully paid off on this
     * due date will be considered past due the next day
     */
    due: Balances.Due;

    /**
     * Amount due for the current billing cycle. Any amounts not paid off by early
     * payments or credits will be considered due at the end of the current billing
     * period
     */
    next_statement_due: Balances.NextStatementDue;

    /**
     * Amount not paid off on previous due dates
     */
    past_due: Balances.PastDue;

    /**
     * Amount due for the past billing cycles.
     */
    past_statements_due: Balances.PastStatementsDue;
  }

  export namespace Balances {
    /**
     * Amount due for the prior billing cycle. Any amounts not fully paid off on this
     * due date will be considered past due the next day
     */
    export interface Due {
      fees: number;

      interest: number;

      principal: number;
    }

    /**
     * Amount due for the current billing cycle. Any amounts not paid off by early
     * payments or credits will be considered due at the end of the current billing
     * period
     */
    export interface NextStatementDue {
      fees: number;

      interest: number;

      principal: number;
    }

    /**
     * Amount not paid off on previous due dates
     */
    export interface PastDue {
      fees: number;

      interest: number;

      principal: number;
    }

    /**
     * Amount due for the past billing cycles.
     */
    export interface PastStatementsDue {
      fees: number;

      interest: number;

      principal: number;
    }
  }

  export interface DayTotals {
    /**
     * Opening balance transferred from previous account in cents
     */
    balance_transfers: number;

    /**
     * ATM and cashback transactions in cents
     */
    cash_advances: number;

    /**
     * Volume of credit management operation transactions less any balance transfers in
     * cents
     */
    credits: number;

    /**
     * Volume of debit management operation transactions less any interest in cents
     */
    fees: number;

    /**
     * Interest accrued in cents
     */
    interest: number;

    /**
     * Any funds transfers which affective the balance in cents
     */
    payments: number;

    /**
     * Net card transaction volume less any cash advances in cents
     */
    purchases: number;
  }

  export interface InterestDetails {
    actual_interest_charged: number | null;

    daily_balance_amounts: InterestDetails.DailyBalanceAmounts;

    effective_apr: InterestDetails.EffectiveApr;

    interest_calculation_method: 'DAILY' | 'AVERAGE_DAILY';

    interest_for_period: InterestDetails.InterestForPeriod;

    prime_rate: string | null;

    minimum_interest_charged?: number | null;
  }

  export namespace InterestDetails {
    export interface DailyBalanceAmounts {
      balance_transfers: string;

      cash_advances: string;

      purchases: string;
    }

    export interface EffectiveApr {
      balance_transfers: string;

      cash_advances: string;

      purchases: string;
    }

    export interface InterestForPeriod {
      balance_transfers: string;

      cash_advances: string;

      purchases: string;
    }
  }

  export interface MinimumPaymentBalance {
    amount: number;

    remaining: number;
  }

  export interface PaymentAllocation {
    fees: number;

    interest: number;

    principal: number;
  }

  export interface PeriodTotals {
    /**
     * Opening balance transferred from previous account in cents
     */
    balance_transfers: number;

    /**
     * ATM and cashback transactions in cents
     */
    cash_advances: number;

    /**
     * Volume of credit management operation transactions less any balance transfers in
     * cents
     */
    credits: number;

    /**
     * Volume of debit management operation transactions less any interest in cents
     */
    fees: number;

    /**
     * Interest accrued in cents
     */
    interest: number;

    /**
     * Any funds transfers which affective the balance in cents
     */
    payments: number;

    /**
     * Net card transaction volume less any cash advances in cents
     */
    purchases: number;
  }

  export interface PreviousStatementBalance {
    amount: number;

    remaining: number;
  }

  export interface YtdTotals {
    /**
     * Opening balance transferred from previous account in cents
     */
    balance_transfers: number;

    /**
     * ATM and cashback transactions in cents
     */
    cash_advances: number;

    /**
     * Volume of credit management operation transactions less any balance transfers in
     * cents
     */
    credits: number;

    /**
     * Volume of debit management operation transactions less any interest in cents
     */
    fees: number;

    /**
     * Interest accrued in cents
     */
    interest: number;

    /**
     * Any funds transfers which affective the balance in cents
     */
    payments: number;

    /**
     * Net card transaction volume less any cash advances in cents
     */
    purchases: number;
  }
}

export interface LoanTapeListParams extends CursorPageParams {
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

LoanTapes.LoanTapesCursorPage = LoanTapesCursorPage;

export declare namespace LoanTapes {
  export {
    type LoanTape as LoanTape,
    LoanTapesCursorPage as LoanTapesCursorPage,
    type LoanTapeListParams as LoanTapeListParams,
  };
}
