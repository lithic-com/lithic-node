// File generated from our OpenAPI spec by Stainless.

import * as Core from 'lithic/core';
import { APIResource } from 'lithic/resource';
import { isRequestOptions } from 'lithic/core';
import * as AccountsAPI from 'lithic/resources/accounts/accounts';
import * as CreditConfigurationsAPI from 'lithic/resources/accounts/credit-configurations';
import { CursorPage, type CursorPageParams } from 'lithic/pagination';

export class Accounts extends APIResource {
  creditConfigurations: CreditConfigurationsAPI.CreditConfigurations =
    new CreditConfigurationsAPI.CreditConfigurations(this._client);

  /**
   * Get account configuration such as spend limits.
   */
  retrieve(accountToken: string, options?: Core.RequestOptions): Core.APIPromise<Account> {
    return this._client.get(`/accounts/${accountToken}`, options);
  }

  /**
   * Update account configuration such as spend limits and verification address. Can
   * only be run on accounts that are part of the program managed by this API key.
   *
   * Accounts that are in the `PAUSED` state will not be able to transact or create
   * new cards.
   */
  update(
    accountToken: string,
    body: AccountUpdateParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<Account> {
    return this._client.patch(`/accounts/${accountToken}`, { body, ...options });
  }

  /**
   * List account configurations.
   */
  list(
    query?: AccountListParams,
    options?: Core.RequestOptions,
  ): Core.PagePromise<AccountsCursorPage, Account>;
  list(options?: Core.RequestOptions): Core.PagePromise<AccountsCursorPage, Account>;
  list(
    query: AccountListParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.PagePromise<AccountsCursorPage, Account> {
    if (isRequestOptions(query)) {
      return this.list({}, query);
    }
    return this._client.getAPIList('/accounts', AccountsCursorPage, { query, ...options });
  }

  /**
   * Get an Account's available spend limits, which is based on the spend limit
   * configured on the Account and the amount already spent over the spend limit's
   * duration. For example, if the Account has a daily spend limit of $1000
   * configured, and has spent $600 in the last 24 hours, the available spend limit
   * returned would be $400.
   */
  retrieveSpendLimits(
    accountToken: string,
    options?: Core.RequestOptions,
  ): Core.APIPromise<AccountSpendLimits> {
    return this._client.get(`/accounts/${accountToken}/spend_limits`, options);
  }
}

export class AccountsCursorPage extends CursorPage<Account> {}

export interface Account {
  /**
   * Globally unique identifier for the account. This is the same as the
   * account_token returned by the enroll endpoint. If using this parameter, do not
   * include pagination.
   */
  token: string;

  /**
   * Spend limit information for the user containing the daily, monthly, and lifetime
   * spend limit of the account. Any charges to a card owned by this account will be
   * declined once their transaction volume has surpassed the value in the applicable
   * time limit (rolling). A lifetime limit of 0 indicates that the lifetime limit
   * feature is disabled.
   */
  spend_limit: Account.SpendLimit;

  /**
   * Account state:
   *
   * - `ACTIVE` - Account is able to transact and create new cards.
   * - `PAUSED` - Account will not be able to transact or create new cards. It can be
   *   set back to `ACTIVE`.
   */
  state: 'ACTIVE' | 'PAUSED';

  account_holder?: Account.AccountHolder;

  /**
   * List of identifiers for the Auth Rule(s) that are applied on the account.
   */
  auth_rule_tokens?: Array<string>;

  verification_address?: Account.VerificationAddress;
}

export namespace Account {
  /**
   * Spend limit information for the user containing the daily, monthly, and lifetime
   * spend limit of the account. Any charges to a card owned by this account will be
   * declined once their transaction volume has surpassed the value in the applicable
   * time limit (rolling). A lifetime limit of 0 indicates that the lifetime limit
   * feature is disabled.
   */
  export interface SpendLimit {
    /**
     * Daily spend limit (in cents).
     */
    daily: number;

    /**
     * Total spend limit over account lifetime (in cents).
     */
    lifetime: number;

    /**
     * Monthly spend limit (in cents).
     */
    monthly: number;
  }

  export interface AccountHolder {
    /**
     * Globally unique identifier for the account holder.
     */
    token: string;

    /**
     * Only applicable for customers using the KYC-Exempt workflow to enroll authorized
     * users of businesses. Account_token of the enrolled business associated with an
     * enrolled AUTHORIZED_USER individual.
     */
    business_account_token: string;

    /**
     * Email address.
     */
    email: string;

    /**
     * Phone number of the individual.
     */
    phone_number: string;
  }

  export interface VerificationAddress {
    /**
     * Valid deliverable address (no PO boxes).
     */
    address1: string;

    /**
     * City name.
     */
    city: string;

    /**
     * Country name. Only USA is currently supported.
     */
    country: string;

    /**
     * Valid postal code. Only USA ZIP codes are currently supported, entered as a
     * five-digit ZIP or nine-digit ZIP+4.
     */
    postal_code: string;

    /**
     * Valid state code. Only USA state codes are currently supported, entered in
     * uppercase ISO 3166-2 two-character format.
     */
    state: string;

    /**
     * Unit or apartment number (if applicable).
     */
    address2?: string;
  }
}

export interface AccountSpendLimits {
  available_spend_limit: AccountSpendLimits.AvailableSpendLimit;
}

export namespace AccountSpendLimits {
  export interface AvailableSpendLimit {
    /**
     * The available spend limit relative to the daily limit configured on the Account.
     */
    daily?: number;

    /**
     * The available spend limit relative to the lifetime limit configured on the
     * Account.
     */
    lifetime?: number;

    /**
     * The available spend limit relative to the monthly limit configured on the
     * Account.
     */
    monthly?: number;
  }
}

export interface BusinessAccount {
  /**
   * Account token
   */
  token: string;

  collections_configuration?: BusinessAccount.CollectionsConfiguration;

  /**
   * Credit limit extended to the Account
   */
  credit_limit?: number;
}

export namespace BusinessAccount {
  export interface CollectionsConfiguration {
    /**
     * Number of days within the billing period
     */
    billing_period: number;

    /**
     * Number of days after the billing period ends that a payment is required
     */
    payment_period: number;

    /**
     * The external bank account token to use for auto-collections
     */
    external_bank_account_token?: string;
  }
}

export interface AccountUpdateParams {
  /**
   * Amount (in cents) for the account's daily spend limit. By default the daily
   * spend limit is set to $1,250.
   */
  daily_spend_limit?: number;

  /**
   * Amount (in cents) for the account's lifetime spend limit. Once this limit is
   * reached, no transactions will be accepted on any card created for this account
   * until the limit is updated. Note that a spend limit of 0 is effectively no
   * limit, and should only be used to reset or remove a prior limit. Only a limit of
   * 1 or above will result in declined transactions due to checks against the
   * account limit. This behavior differs from the daily spend limit and the monthly
   * spend limit.
   */
  lifetime_spend_limit?: number;

  /**
   * Amount (in cents) for the account's monthly spend limit. By default the monthly
   * spend limit is set to $5,000.
   */
  monthly_spend_limit?: number;

  /**
   * Account states.
   */
  state?: 'ACTIVE' | 'PAUSED';

  /**
   * Address used during Address Verification Service (AVS) checks during
   * transactions if enabled via Auth Rules.
   */
  verification_address?: AccountUpdateParams.VerificationAddress;
}

export namespace AccountUpdateParams {
  /**
   * Address used during Address Verification Service (AVS) checks during
   * transactions if enabled via Auth Rules.
   */
  export interface VerificationAddress {
    address1?: string;

    address2?: string;

    city?: string;

    country?: string;

    postal_code?: string;

    state?: string;
  }
}

export interface AccountListParams extends CursorPageParams {
  /**
   * Date string in RFC 3339 format. Only entries created after the specified time
   * will be included. UTC time zone.
   */
  begin?: string;

  /**
   * Date string in RFC 3339 format. Only entries created before the specified time
   * will be included. UTC time zone.
   */
  end?: string;
}

export namespace Accounts {
  export import Account = AccountsAPI.Account;
  export import AccountSpendLimits = AccountsAPI.AccountSpendLimits;
  export import BusinessAccount = AccountsAPI.BusinessAccount;
  export import AccountsCursorPage = AccountsAPI.AccountsCursorPage;
  export import AccountUpdateParams = AccountsAPI.AccountUpdateParams;
  export import AccountListParams = AccountsAPI.AccountListParams;
  export import CreditConfigurations = CreditConfigurationsAPI.CreditConfigurations;
  export import CreditConfigurationUpdateParams = CreditConfigurationsAPI.CreditConfigurationUpdateParams;
}
