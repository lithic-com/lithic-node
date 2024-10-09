// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../resource';
import { isRequestOptions } from '../../core';
import * as Core from '../../core';
import * as CreditConfigurationAPI from './credit-configuration';

export class CreditConfiguration extends APIResource {
  /**
   * Get an Account's credit configuration
   */
  retrieve(
    financialAccountToken: string,
    options?: Core.RequestOptions,
  ): Core.APIPromise<FinancialAccountCreditConfig> {
    return this._client.get(`/v1/financial_accounts/${financialAccountToken}/credit_configuration`, options);
  }

  /**
   * Update an account's credit configuration
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
   * State of the financial account
   */
  financial_account_state?: 'PENDING' | 'CURRENT' | 'DELINQUENT';

  is_spend_blocked?: boolean;
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

export namespace CreditConfiguration {
  export import FinancialAccountCreditConfig = CreditConfigurationAPI.FinancialAccountCreditConfig;
  export import CreditConfigurationUpdateParams = CreditConfigurationAPI.CreditConfigurationUpdateParams;
}
