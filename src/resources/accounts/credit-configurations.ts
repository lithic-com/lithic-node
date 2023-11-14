// File generated from our OpenAPI spec by Stainless.

import * as Core from 'lithic/core';
import { APIResource } from 'lithic/resource';
import { isRequestOptions } from 'lithic/core';
import * as CreditConfigurationsAPI from 'lithic/resources/accounts/credit-configurations';
import * as AccountsAPI from 'lithic/resources/accounts/accounts';

export class CreditConfigurations extends APIResource {
  /**
   * Get an Account's credit configuration
   */
  retrieve(
    accountToken: string,
    options?: Core.RequestOptions,
  ): Core.APIPromise<AccountsAPI.BusinessAccount> {
    return this._client.get(`/accounts/${accountToken}/credit_configuration`, options);
  }

  /**
   * Update a Business Accounts credit configuration
   */
  update(
    accountToken: string,
    body?: CreditConfigurationUpdateParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<AccountsAPI.BusinessAccount>;
  update(accountToken: string, options?: Core.RequestOptions): Core.APIPromise<AccountsAPI.BusinessAccount>;
  update(
    accountToken: string,
    body: CreditConfigurationUpdateParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.APIPromise<AccountsAPI.BusinessAccount> {
    if (isRequestOptions(body)) {
      return this.update(accountToken, {}, body);
    }
    return this._client.patch(`/accounts/${accountToken}/credit_configuration`, { body, ...options });
  }
}

export interface CreditConfigurationUpdateParams {
  /**
   * Number of days within the billing period
   */
  billing_period?: number;

  /**
   * Credit limit extended to the Business Account
   */
  credit_limit?: number;

  /**
   * The external bank account token to use for auto-collections
   */
  external_bank_account_token?: string;

  /**
   * Number of days after the billing period ends that a payment is required
   */
  payment_period?: number;
}

export namespace CreditConfigurations {
  export import CreditConfigurationUpdateParams = CreditConfigurationsAPI.CreditConfigurationUpdateParams;
}
