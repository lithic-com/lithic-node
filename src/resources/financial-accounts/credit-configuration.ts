// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../resource';
import { isRequestOptions } from '../../core';
import * as Core from '../../core';

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
    options?: Core.RequestOptions,
  ): Core.APIPromise<FinancialAccountCreditConfig> {
    return this._client.get(`/v1/financial_accounts/${financialAccountToken}/credit_configuration`, options);
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
    body?: CreditConfigurationUpdateParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<FinancialAccountCreditConfig>;
  update(
    financialAccountToken: string,
    options?: Core.RequestOptions,
  ): Core.APIPromise<FinancialAccountCreditConfig>;
  update(
    financialAccountToken: string,
    body: CreditConfigurationUpdateParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.APIPromise<FinancialAccountCreditConfig> {
    if (isRequestOptions(body)) {
      return this.update(financialAccountToken, {}, body);
    }
    return this._client.patch(`/v1/financial_accounts/${financialAccountToken}/credit_configuration`, {
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

  auto_collection_configuration: FinancialAccountCreditConfig.AutoCollectionConfiguration;

  credit_limit: number | null;

  /**
   * Globally unique identifier for the credit product
   */
  credit_product_token: string | null;

  external_bank_account_token: string | null;

  /**
   * Tier assigned to the financial account
   */
  tier: string | null;

  /**
   * @deprecated Reason for the financial account being marked as Charged Off
   */
  charged_off_reason?: 'DELINQUENT' | 'FRAUD' | null;

  /**
   * @deprecated State of the financial account
   */
  financial_account_state?: 'PENDING' | 'CURRENT' | 'DELINQUENT' | 'CHARGED_OFF';

  /**
   * @deprecated
   */
  is_spend_blocked?: boolean;
}

export namespace FinancialAccountCreditConfig {
  export interface AutoCollectionConfiguration {
    /**
     * If auto collection is enabled for this account
     */
    auto_collection_enabled: boolean;
  }
}

export interface CreditConfigurationUpdateParams {
  auto_collection_configuration?: CreditConfigurationUpdateParams.AutoCollectionConfiguration;

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

export namespace CreditConfigurationUpdateParams {
  export interface AutoCollectionConfiguration {
    /**
     * If auto collection is enabled for this account
     */
    auto_collection_enabled?: boolean;
  }
}

export declare namespace CreditConfiguration {
  export {
    type FinancialAccountCreditConfig as FinancialAccountCreditConfig,
    type CreditConfigurationUpdateParams as CreditConfigurationUpdateParams,
  };
}
