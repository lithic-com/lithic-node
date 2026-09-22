// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import * as LoanTapesAPI from '../loan-tapes';
import { APIPromise } from '../../../core/api-promise';
import { CursorPage, type CursorPageParams, PagePromise } from '../../../core/pagination';
import { RequestOptions } from '../../../internal/request-options';
import { path } from '../../../internal/utils/path';

export class Statements extends APIResource {
  /**
   * Get a specific statement snapshot for a given installment plan.
   *
   * @example
   * ```ts
   * const installmentPlanStatement =
   *   await client.financialAccounts.installmentPlans.statements.retrieve(
   *     'statement_token',
   *     {
   *       financial_account_token:
   *         '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   *       installment_plan_token: 'installment_plan_token',
   *     },
   *   );
   * ```
   */
  retrieve(
    statementToken: string,
    params: StatementRetrieveParams,
    options?: RequestOptions,
  ): APIPromise<InstallmentPlanStatement> {
    const { financial_account_token, installment_plan_token } = params;
    return this._client.get(
      path`/v1/financial_accounts/${financial_account_token}/installment_plans/${installment_plan_token}/statements/${statementToken}`,
      options,
    );
  }

  /**
   * List the statement snapshots for a given installment plan.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const installmentPlanStatement of client.financialAccounts.installmentPlans.statements.list(
   *   'installment_plan_token',
   *   {
   *     financial_account_token:
   *       '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   *   },
   * )) {
   *   // ...
   * }
   * ```
   */
  list(
    installmentPlanToken: string,
    params: StatementListParams,
    options?: RequestOptions,
  ): PagePromise<InstallmentPlanStatementsCursorPage, InstallmentPlanStatement> {
    const { financial_account_token, ...query } = params;
    return this._client.getAPIList(
      path`/v1/financial_accounts/${financial_account_token}/installment_plans/${installmentPlanToken}/statements`,
      CursorPage<InstallmentPlanStatement>,
      { query, ...options },
    );
  }
}

export type InstallmentPlanStatementsCursorPage = CursorPage<InstallmentPlanStatement>;

/**
 * An immutable snapshot of an installment plan as of the statement it is attached
 * to. Lithic cuts one per open plan when a statement is generated and never
 * reissues it
 */
export interface InstallmentPlanStatement {
  /**
   * Globally unique identifier for this snapshot, which is the token of the
   * statement it is attached to. A plan is snapshotted at most once per statement,
   * so the statement identifies the snapshot within the plan. Pass it as a
   * pagination cursor
   */
  token: string;

  /**
   * Enrollment fee charged when the plan was created in cents
   */
  fee_amount: number;

  /**
   * Globally unique identifier for the installment plan this snapshot is of
   */
  installment_plan_token: string;

  /**
   * Total owed on the plan in cents, the principal amount plus the enrollment fee
   */
  installment_plan_total: number;

  /**
   * Installments that make up the plan, oldest first
   */
  installments: Array<InstallmentPlanStatement.Installment>;

  /**
   * Number of installments that still carried a balance as of this statement
   */
  installments_outstanding: number;

  /**
   * Number of installments that had been paid off as of this statement
   */
  installments_paid: number;

  /**
   * Number of installments the plan is broken into
   */
  num_installments: number;

  /**
   * Balance the plan was opened on in cents, excluding the enrollment fee
   */
  principal_amount: number;

  source_type: 'UNPAID_BALANCE' | 'TRANSACTION';

  /**
   * Date the plan was created
   */
  start_date: string;

  /**
   * State of the installment plan. A plan is REBUILD_IN_PROGRESS while its loan
   * tapes are being rebuilt, during which its payment totals are being recomputed
   * and should not be treated as final
   */
  state: 'PENDING' | 'ACTIVE' | 'REBUILD_IN_PROGRESS' | 'FULLY_PAID' | 'CANCELLED';

  /**
   * Amount paid towards the plan as of this statement in cents
   */
  total_paid: number;
}

export namespace InstallmentPlanStatement {
  /**
   * One installment of a plan as of the statement. Amounts are totalled across
   * transaction categories rather than broken out by them, which the installment
   * plan endpoint does
   */
  export interface Installment {
    /**
     * Amount the installment was opened for in cents
     */
    amount_due: number;

    amount_due_details: LoanTapesAPI.CategoryBalances;

    /**
     * Amount still owed on the installment in cents
     */
    amount_outstanding: number;

    amount_outstanding_details: LoanTapesAPI.CategoryBalances;

    /**
     * Amount paid towards the installment in cents
     */
    amount_paid: number;

    amount_paid_details: LoanTapesAPI.CategoryBalances;

    /**
     * Date the installment was actually assessed onto the account, or null if it had
     * not been assessed as of this statement
     */
    date_assessed: string | null;

    /**
     * Date the installment is scheduled to be assessed onto the account
     */
    due_date: string;

    /**
     * Position of this installment within the plan, starting at 0
     */
    installment_num: number;

    /**
     * Date the installment must be paid by before it is considered past due
     */
    payment_due_date: string;

    /**
     * Payments applied to this installment, oldest first
     */
    payments: Array<Installment.Payment>;
  }

  export namespace Installment {
    export interface Payment {
      /**
       * Amount applied to the installment in cents
       */
      amount: number;

      /**
       * Date the payment was applied to the installment
       */
      date: string;
    }
  }
}

export interface StatementRetrieveParams {
  /**
   * Globally unique identifier for financial account.
   */
  financial_account_token: string;

  /**
   * Globally unique identifier for installment plan.
   */
  installment_plan_token: string;
}

export interface StatementListParams extends CursorPageParams {
  /**
   * Path param: Globally unique identifier for financial account.
   */
  financial_account_token: string;

  /**
   * Query param: Date string in RFC 3339 format. Only entries created after the
   * specified date will be included.
   */
  begin?: string;

  /**
   * Query param: Date string in RFC 3339 format. Only entries created before the
   * specified date will be included.
   */
  end?: string;

  /**
   * Query param: Only snapshots in which the plan was in this state will be
   * included.
   */
  state?: 'PENDING' | 'ACTIVE' | 'REBUILD_IN_PROGRESS' | 'FULLY_PAID' | 'CANCELLED' | null;
}

export declare namespace Statements {
  export {
    type InstallmentPlanStatement as InstallmentPlanStatement,
    type InstallmentPlanStatementsCursorPage as InstallmentPlanStatementsCursorPage,
    type StatementRetrieveParams as StatementRetrieveParams,
    type StatementListParams as StatementListParams,
  };
}
