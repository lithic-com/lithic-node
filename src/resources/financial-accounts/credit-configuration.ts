// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class CreditConfiguration extends APIResource {
  /**
   * Get an Account's credit configuration
   *
   * @example
   * ```ts
   * const financialAccountCreditConfig =
   *   await client.financialAccounts.creditConfiguration.retrieve(
   *     '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   *   );
   * ```
   */
  retrieve(
    financialAccountToken: string,
    options?: RequestOptions,
  ): APIPromise<FinancialAccountCreditConfig> {
    return this._client.get(
      path`/v1/financial_accounts/${financialAccountToken}/credit_configuration`,
      options,
    );
  }

  /**
   * Update an account's credit configuration
   *
   * @example
   * ```ts
   * const financialAccountCreditConfig =
   *   await client.financialAccounts.creditConfiguration.update(
   *     '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   *   );
   * ```
   */
  update(
    financialAccountToken: string,
    body: CreditConfigurationUpdateParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<FinancialAccountCreditConfig> {
    return this._client.patch(path`/v1/financial_accounts/${financialAccountToken}/credit_configuration`, {
      body,
      ...options,
    });
  }
}

export interface FinancialAccountCreditConfig {
  /**
   * Globally unique identifier for the account
   */
  account_token: string;

  /**
   * Reason for the financial account being marked as Charged Off
   */
  charged_off_reason: 'DELINQUENT' | 'FRAUD' | null;

  credit_limit: number | null;

  /**
   * Globally unique identifier for the credit product
   */
  credit_product_token: string | null;

  external_bank_account_token: string | null;

  /**
   * State of the financial account
   */
  financial_account_state: 'PENDING' | 'CURRENT' | 'DELINQUENT' | 'CHARGED_OFF';

  is_spend_blocked: boolean;

  /**
   * Tier assigned to the financial account
   */
  tier: string | null;
}

export interface CreditConfigurationUpdateParams {
  credit_limit?: number;

  /**
   * Globally unique identifier for the credit product
   */
  credit_product_token?: string;

  external_bank_account_token?: string;

  /**
   * Tier to assign to a financial account
   */
  tier?: string;
}

export declare namespace CreditConfiguration {
  export {
    type FinancialAccountCreditConfig as FinancialAccountCreditConfig,
    type CreditConfigurationUpdateParams as CreditConfigurationUpdateParams,
  };
}
