// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import { isRequestOptions } from '../core';
import * as Core from '../core';
import { CursorPage, type CursorPageParams } from '../pagination';

export class Accounts extends APIResource {
  /**
   * Get account configuration such as spend limits.
   *
   * @example
   * ```ts
   * const account = await client.accounts.retrieve(
   *   '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   * );
   * ```
   */
  retrieve(accountToken: string, options?: Core.RequestOptions): Core.APIPromise<Account> {
    return this._client.get(`/v1/accounts/${accountToken}`, options);
  }

  /**
   * Update account configuration such as state or spend limits. Can only be run on
   * accounts that are part of the program managed by this API key. Accounts that are
   * in the `PAUSED` state will not be able to transact or create new cards.
   *
   * @example
   * ```ts
   * const account = await client.accounts.update(
   *   '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   *   { daily_spend_limit: 1000 },
   * );
   * ```
   */
  update(
    accountToken: string,
    body: AccountUpdateParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<Account> {
    return this._client.patch(`/v1/accounts/${accountToken}`, { body, ...options });
  }

  /**
   * List account configurations.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const account of client.accounts.list()) {
   *   // ...
   * }
   * ```
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
    return this._client.getAPIList('/v1/accounts', AccountsCursorPage, { query, ...options });
  }

  /**
   * Get an Account's available spend limits, which is based on the spend limit
   * configured on the Account and the amount already spent over the spend limit's
   * duration. For example, if the Account has a daily spend limit of $1000
   * configured, and has spent $600 in the last 24 hours, the available spend limit
   * returned would be $400.
   *
   * @example
   * ```ts
   * const accountSpendLimits =
   *   await client.accounts.retrieveSpendLimits(
   *     '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   *   );
   * ```
   */
  retrieveSpendLimits(
    accountToken: string,
    options?: Core.RequestOptions,
  ): Core.APIPromise<AccountSpendLimits> {
    return this._client.get(`/v1/accounts/${accountToken}/spend_limits`, options);
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
   * Timestamp of when the account was created.
   */
  created: string | null;

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
   * - `CLOSED` - Account will not be able to transact or create new cards. `CLOSED`
   *   accounts are unable to be transitioned to `ACTIVE` or `PAUSED` states.
   *   Accounts can be manually set to `CLOSED`, or this can be done by Lithic due to
   *   failure to pass KYB/KYC or for risk/compliance reasons. Please contact
   *   [support@lithic.com](mailto:support@lithic.com) if you believe this was done
   *   by mistake.
   */
  state: 'ACTIVE' | 'PAUSED' | 'CLOSED';

  account_holder?: Account.AccountHolder;

  /**
   * @deprecated List of identifiers for the Auth Rule(s) that are applied on the
   * account. This field is deprecated and will no longer be populated in the
   * `account_holder` object. The key will be removed from the schema in a future
   * release. Use the `/auth_rules` endpoints to fetch Auth Rule information instead.
   */
  auth_rule_tokens?: Array<string>;

  /**
   * 3-character alphabetic ISO 4217 code for the currency of the cardholder.
   */
  cardholder_currency?: string;

  /**
   * @deprecated
   */
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

  /**
   * @deprecated
   */
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
     * Valid postal code. Only USA postal codes (ZIP codes) are currently supported,
     * entered as a five-digit postal code or nine-digit postal code (ZIP+4) using the
     * format 12345-1234.
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

  spend_limit?: AccountSpendLimits.SpendLimit;

  spend_velocity?: AccountSpendLimits.SpendVelocity;
}

export namespace AccountSpendLimits {
  export interface AvailableSpendLimit {
    /**
     * The available spend limit (in cents) relative to the daily limit configured on
     * the Account (e.g. 100000 would be a $1,000 limit).
     */
    daily?: number;

    /**
     * The available spend limit (in cents) relative to the lifetime limit configured
     * on the Account.
     */
    lifetime?: number;

    /**
     * The available spend limit (in cents) relative to the monthly limit configured on
     * the Account.
     */
    monthly?: number;
  }

  export interface SpendLimit {
    /**
     * The configured daily spend limit (in cents) on the Account.
     */
    daily?: number;

    /**
     * The configured lifetime spend limit (in cents) on the Account.
     */
    lifetime?: number;

    /**
     * The configured monthly spend limit (in cents) on the Account.
     */
    monthly?: number;
  }

  export interface SpendVelocity {
    /**
     * Current daily spend velocity (in cents) on the Account. Present if daily spend
     * limit is set.
     */
    daily?: number;

    /**
     * Current lifetime spend velocity (in cents) on the Account. Present if lifetime
     * spend limit is set.
     */
    lifetime?: number;

    /**
     * Current monthly spend velocity (in cents) on the Account. Present if monthly
     * spend limit is set.
     */
    monthly?: number;
  }
}

export interface AccountUpdateParams {
  /**
   * Amount (in cents) for the account's daily spend limit (e.g. 100000 would be a
   * $1,000 limit). By default the daily spend limit is set to $1,250.
   */
  daily_spend_limit?: number;

  /**
   * Amount (in cents) for the account's lifetime spend limit (e.g. 100000 would be a
   * $1,000 limit). Once this limit is reached, no transactions will be accepted on
   * any card created for this account until the limit is updated. Note that a spend
   * limit of 0 is effectively no limit, and should only be used to reset or remove a
   * prior limit. Only a limit of 1 or above will result in declined transactions due
   * to checks against the account limit. This behavior differs from the daily spend
   * limit and the monthly spend limit.
   */
  lifetime_spend_limit?: number;

  /**
   * Amount (in cents) for the account's monthly spend limit (e.g. 100000 would be a
   * $1,000 limit). By default the monthly spend limit is set to $5,000.
   */
  monthly_spend_limit?: number;

  /**
   * Account states.
   */
  state?: 'ACTIVE' | 'PAUSED' | 'CLOSED';

  /**
   * @deprecated Address used during Address Verification Service (AVS) checks during
   * transactions if enabled via Auth Rules. This field is deprecated as AVS checks
   * are no longer supported by Auth Rules. The field will be removed from the schema
   * in a future release.
   */
  verification_address?: AccountUpdateParams.VerificationAddress;
}

export namespace AccountUpdateParams {
  /**
   * @deprecated Address used during Address Verification Service (AVS) checks during
   * transactions if enabled via Auth Rules. This field is deprecated as AVS checks
   * are no longer supported by Auth Rules. The field will be removed from the schema
   * in a future release.
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

Accounts.AccountsCursorPage = AccountsCursorPage;

export declare namespace Accounts {
  export {
    type Account as Account,
    type AccountSpendLimits as AccountSpendLimits,
    AccountsCursorPage as AccountsCursorPage,
    type AccountUpdateParams as AccountUpdateParams,
    type AccountListParams as AccountListParams,
  };
}
