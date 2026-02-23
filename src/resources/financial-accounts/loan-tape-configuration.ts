// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class LoanTapeConfigurationResource extends APIResource {
  /**
   * Get the loan tape configuration for a given financial account.
   *
   * @example
   * ```ts
   * const loanTapeConfiguration =
   *   await client.financialAccounts.loanTapeConfiguration.retrieve(
   *     '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   *   );
   * ```
   */
  retrieve(financialAccountToken: string, options?: RequestOptions): APIPromise<LoanTapeConfiguration> {
    return this._client.get(
      path`/v1/financial_accounts/${financialAccountToken}/loan_tape_configuration`,
      options,
    );
  }
}

/**
 * Configuration for loan tapes
 */
export interface LoanTapeConfiguration {
  created_at: string;

  financial_account_token: string;

  instance_token: string;

  updated_at: string;

  credit_product_token?: string;

  /**
   * Configuration for building loan tapes
   */
  loan_tape_rebuild_configuration?: LoanTapeRebuildConfiguration;

  tier_schedule_changed_at?: string;
}

/**
 * Configuration for building loan tapes
 */
export interface LoanTapeRebuildConfiguration {
  /**
   * Whether the account's loan tapes need to be rebuilt or not
   */
  rebuild_needed: boolean;

  /**
   * The date for which the account's loan tapes were last rebuilt
   */
  last_rebuild?: string;

  /**
   * Date from which to start rebuilding from if the account requires a rebuild
   */
  rebuild_from?: string;
}

export declare namespace LoanTapeConfigurationResource {
  export {
    type LoanTapeConfiguration as LoanTapeConfiguration,
    type LoanTapeRebuildConfiguration as LoanTapeRebuildConfiguration,
  };
}
