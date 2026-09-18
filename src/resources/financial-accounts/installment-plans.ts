// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as InstallmentPlansAPI from './installment-plans';
import * as LoanTapesAPI from './loan-tapes';
import { APIPromise } from '../../core/api-promise';
import { CursorPage, type CursorPageParams, PagePromise } from '../../core/pagination';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class InstallmentPlans extends APIResource {
  /**
   * Get a specific installment plan for a given financial account.
   *
   * @example
   * ```ts
   * const installmentPlan =
   *   await client.financialAccounts.installmentPlans.retrieve(
   *     'installment_plan_token',
   *     {
   *       financial_account_token:
   *         '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   *     },
   *   );
   * ```
   */
  retrieve(
    installmentPlanToken: string,
    params: InstallmentPlanRetrieveParams,
    options?: RequestOptions,
  ): APIPromise<InstallmentPlan> {
    const { financial_account_token } = params;
    return this._client.get(
      path`/v1/financial_accounts/${financial_account_token}/installment_plans/${installmentPlanToken}`,
      options,
    );
  }

  /**
   * List the installment plans for a given financial account.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const installmentPlan of client.financialAccounts.installmentPlans.list(
   *   '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   * )) {
   *   // ...
   * }
   * ```
   */
  list(
    financialAccountToken: string,
    query: InstallmentPlanListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<InstallmentPlansCursorPage, InstallmentPlan> {
    return this._client.getAPIList(
      path`/v1/financial_accounts/${financialAccountToken}/installment_plans`,
      CursorPage<InstallmentPlan>,
      { query, ...options },
    );
  }
}

export type InstallmentPlansCursorPage = CursorPage<InstallmentPlan>;

export interface InstallmentPlan {
  /**
   * Globally unique identifier for an installment plan
   */
  token: string;

  /**
   * Date the plan was paid off or cancelled, or null while it is still open
   */
  closed_at: string | null;

  /**
   * Timestamp of when the installment plan was created
   */
  created: string;

  /**
   * Enrollment fee charged when the plan was created in cents
   */
  fee_amount: number;

  /**
   * Globally unique identifier for a financial account
   */
  financial_account_token: string;

  /**
   * Total owed on the plan in cents, the principal amount plus the enrollment fee
   */
  installment_plan_total: number;

  /**
   * Installments that make up the plan, oldest first
   */
  installments: Array<InstallmentPlan.Installment>;

  /**
   * Number of installments that still carry a balance
   */
  installments_outstanding: number;

  /**
   * Number of installments that have been paid off
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

  /**
   * Balance the plan was opened on, broken out by category, or null if it was not
   * recorded
   */
  source_amounts: TransactionCategoryBalances | null;

  /**
   * Identifier of the record the plan was opened from, such as the closing statement
   * for an unpaid balance
   */
  source_id: string;

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
   * Amount paid towards the plan to date in cents
   */
  total_paid: number;

  /**
   * Timestamp of when the installment plan was updated
   */
  updated: string;
}

export namespace InstallmentPlan {
  export interface Installment {
    /**
     * Amount the installment was opened for in cents
     */
    amount_due: number;

    amount_due_details: InstallmentPlansAPI.TransactionCategoryBalances;

    /**
     * Amount still owed on the installment in cents
     */
    amount_outstanding: number;

    amount_outstanding_details: InstallmentPlansAPI.TransactionCategoryBalances;

    /**
     * Amount paid towards the installment in cents
     */
    amount_paid: number;

    amount_paid_details: InstallmentPlansAPI.TransactionCategoryBalances;

    /**
     * Date the installment was actually assessed onto the account, or null if it has
     * not been assessed yet
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

      amount_details: InstallmentPlansAPI.TransactionCategoryBalances;

      /**
       * Date the payment was applied to the installment
       */
      date: string;
    }
  }
}

export interface TransactionCategoryBalances {
  /**
   * Amounts attributable to balance transfers
   */
  balance_transfers: LoanTapesAPI.CategoryBalances;

  /**
   * Amounts attributable to cash advances
   */
  cash_advances: LoanTapesAPI.CategoryBalances;

  /**
   * Amounts attributable to purchases
   */
  purchases: LoanTapesAPI.CategoryBalances;
}

export interface InstallmentPlanRetrieveParams {
  /**
   * Globally unique identifier for financial account.
   */
  financial_account_token: string;
}

export interface InstallmentPlanListParams extends CursorPageParams {
  /**
   * Only installment plans in this state will be included.
   */
  state?: 'PENDING' | 'ACTIVE' | 'REBUILD_IN_PROGRESS' | 'FULLY_PAID' | 'CANCELLED' | null;
}

export declare namespace InstallmentPlans {
  export {
    type InstallmentPlan as InstallmentPlan,
    type TransactionCategoryBalances as TransactionCategoryBalances,
    type InstallmentPlansCursorPage as InstallmentPlansCursorPage,
    type InstallmentPlanRetrieveParams as InstallmentPlanRetrieveParams,
    type InstallmentPlanListParams as InstallmentPlanListParams,
  };
}
