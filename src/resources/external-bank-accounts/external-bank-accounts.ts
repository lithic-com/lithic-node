// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../resource';
import { isRequestOptions } from '../../core';
import * as Core from '../../core';
import * as MicroDepositsAPI from './micro-deposits';
import { MicroDepositCreateParams, MicroDepositCreateResponse, MicroDeposits } from './micro-deposits';
import { CursorPage, type CursorPageParams } from '../../pagination';

export class ExternalBankAccounts extends APIResource {
  microDeposits: MicroDepositsAPI.MicroDeposits = new MicroDepositsAPI.MicroDeposits(this._client);

  /**
   * Creates an external bank account within a program or Lithic account.
   *
   * @example
   * ```ts
   * const externalBankAccount =
   *   await client.externalBankAccounts.create({
   *     account_number: '12345678901234567',
   *     country: 'USD',
   *     currency: 'USD',
   *     financial_account_token:
   *       '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   *     owner: 'owner',
   *     owner_type: 'INDIVIDUAL',
   *     routing_number: '123456789',
   *     type: 'CHECKING',
   *     verification_method: 'MANUAL',
   *   });
   * ```
   */
  create(
    body: ExternalBankAccountCreateParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<ExternalBankAccountCreateResponse> {
    return this._client.post('/v1/external_bank_accounts', { body, ...options });
  }

  /**
   * Get the external bank account by token.
   */
  retrieve(
    externalBankAccountToken: string,
    options?: Core.RequestOptions,
  ): Core.APIPromise<ExternalBankAccountRetrieveResponse> {
    return this._client.get(`/v1/external_bank_accounts/${externalBankAccountToken}`, options);
  }

  /**
   * Update the external bank account by token.
   */
  update(
    externalBankAccountToken: string,
    body: ExternalBankAccountUpdateParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<ExternalBankAccountUpdateResponse> {
    return this._client.patch(`/v1/external_bank_accounts/${externalBankAccountToken}`, { body, ...options });
  }

  /**
   * List all the external bank accounts for the provided search criteria.
   */
  list(
    query?: ExternalBankAccountListParams,
    options?: Core.RequestOptions,
  ): Core.PagePromise<ExternalBankAccountListResponsesCursorPage, ExternalBankAccountListResponse>;
  list(
    options?: Core.RequestOptions,
  ): Core.PagePromise<ExternalBankAccountListResponsesCursorPage, ExternalBankAccountListResponse>;
  list(
    query: ExternalBankAccountListParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.PagePromise<ExternalBankAccountListResponsesCursorPage, ExternalBankAccountListResponse> {
    if (isRequestOptions(query)) {
      return this.list({}, query);
    }
    return this._client.getAPIList('/v1/external_bank_accounts', ExternalBankAccountListResponsesCursorPage, {
      query,
      ...options,
    });
  }

  /**
   * Retry external bank account micro deposit verification.
   */
  retryMicroDeposits(
    externalBankAccountToken: string,
    body?: ExternalBankAccountRetryMicroDepositsParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<ExternalBankAccountRetryMicroDepositsResponse>;
  retryMicroDeposits(
    externalBankAccountToken: string,
    options?: Core.RequestOptions,
  ): Core.APIPromise<ExternalBankAccountRetryMicroDepositsResponse>;
  retryMicroDeposits(
    externalBankAccountToken: string,
    body: ExternalBankAccountRetryMicroDepositsParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.APIPromise<ExternalBankAccountRetryMicroDepositsResponse> {
    if (isRequestOptions(body)) {
      return this.retryMicroDeposits(externalBankAccountToken, {}, body);
    }
    return this._client.post(`/v1/external_bank_accounts/${externalBankAccountToken}/retry_micro_deposits`, {
      body,
      ...options,
    });
  }

  /**
   * Retry external bank account prenote verification.
   */
  retryPrenote(
    externalBankAccountToken: string,
    body?: ExternalBankAccountRetryPrenoteParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<ExternalBankAccountRetryPrenoteResponse>;
  retryPrenote(
    externalBankAccountToken: string,
    options?: Core.RequestOptions,
  ): Core.APIPromise<ExternalBankAccountRetryPrenoteResponse>;
  retryPrenote(
    externalBankAccountToken: string,
    body: ExternalBankAccountRetryPrenoteParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.APIPromise<ExternalBankAccountRetryPrenoteResponse> {
    if (isRequestOptions(body)) {
      return this.retryPrenote(externalBankAccountToken, {}, body);
    }
    return this._client.post(`/v1/external_bank_accounts/${externalBankAccountToken}/retry_prenote`, {
      body,
      ...options,
    });
  }
}

export class ExternalBankAccountListResponsesCursorPage extends CursorPage<ExternalBankAccountListResponse> {}

export interface ExternalBankAccountAddress {
  address1: string;

  city: string;

  country: string;

  postal_code: string;

  state: string;

  address2?: string;
}

export type OwnerType = 'INDIVIDUAL' | 'BUSINESS';

export type VerificationMethod =
  | 'MANUAL'
  | 'MICRO_DEPOSIT'
  | 'PLAID'
  | 'PRENOTE'
  | 'EXTERNALLY_VERIFIED'
  | 'UNVERIFIED';

export interface ExternalBankAccountCreateResponse {
  /**
   * A globally unique identifier for this record of an external bank account
   * association. If a program links an external bank account to more than one
   * end-user or to both the program and the end-user, then Lithic will return each
   * record of the association
   */
  token: string;

  /**
   * The country that the bank account is located in using ISO 3166-1. We will only
   * accept USA bank accounts e.g., USA
   */
  country: string;

  /**
   * An ISO 8601 string representing when this funding source was added to the Lithic
   * account.
   */
  created: string;

  /**
   * currency of the external account 3-character alphabetic ISO 4217 code
   */
  currency: string;

  /**
   * The last 4 digits of the bank account. Derived by Lithic from the account number
   * passed
   */
  last_four: string;

  /**
   * Legal Name of the business or individual who owns the external account. This
   * will appear in statements
   */
  owner: string;

  /**
   * Owner Type
   */
  owner_type: 'BUSINESS' | 'INDIVIDUAL';

  /**
   * Routing Number
   */
  routing_number: string;

  /**
   * Account State
   */
  state: 'ENABLED' | 'CLOSED' | 'PAUSED';

  /**
   * Account Type
   */
  type: 'CHECKING' | 'SAVINGS';

  /**
   * The number of attempts at verification
   */
  verification_attempts: number;

  /**
   * Verification Method
   */
  verification_method: 'MANUAL' | 'MICRO_DEPOSIT' | 'PLAID' | 'PRENOTE';

  /**
   * Verification State
   */
  verification_state: 'PENDING' | 'ENABLED' | 'FAILED_VERIFICATION' | 'INSUFFICIENT_FUNDS';

  /**
   * Indicates which Lithic account the external account is associated with. For
   * external accounts that are associated with the program, account_token field
   * returned will be null
   */
  account_token?: string;

  /**
   * Address
   */
  address?: ExternalBankAccountAddress;

  /**
   * Optional field that helps identify bank accounts in receipts
   */
  company_id?: string;

  /**
   * Date of Birth of the Individual that owns the external bank account
   */
  dob?: string;

  /**
   * Doing Business As
   */
  doing_business_as?: string;

  /**
   * The financial account token of the operating account to fund the micro deposits
   */
  financial_account_token?: string;

  /**
   * The nickname for this External Bank Account
   */
  name?: string;

  /**
   * User Defined ID
   */
  user_defined_id?: string;

  /**
   * Optional free text description of the reason for the failed verification. For
   * ACH micro-deposits returned, this field will display the reason return code sent
   * by the ACH network
   */
  verification_failed_reason?: string;
}

export interface ExternalBankAccountRetrieveResponse {
  /**
   * A globally unique identifier for this record of an external bank account
   * association. If a program links an external bank account to more than one
   * end-user or to both the program and the end-user, then Lithic will return each
   * record of the association
   */
  token: string;

  /**
   * The country that the bank account is located in using ISO 3166-1. We will only
   * accept USA bank accounts e.g., USA
   */
  country: string;

  /**
   * An ISO 8601 string representing when this funding source was added to the Lithic
   * account.
   */
  created: string;

  /**
   * currency of the external account 3-character alphabetic ISO 4217 code
   */
  currency: string;

  /**
   * The last 4 digits of the bank account. Derived by Lithic from the account number
   * passed
   */
  last_four: string;

  /**
   * Legal Name of the business or individual who owns the external account. This
   * will appear in statements
   */
  owner: string;

  /**
   * Owner Type
   */
  owner_type: 'BUSINESS' | 'INDIVIDUAL';

  /**
   * Routing Number
   */
  routing_number: string;

  /**
   * Account State
   */
  state: 'ENABLED' | 'CLOSED' | 'PAUSED';

  /**
   * Account Type
   */
  type: 'CHECKING' | 'SAVINGS';

  /**
   * The number of attempts at verification
   */
  verification_attempts: number;

  /**
   * Verification Method
   */
  verification_method: 'MANUAL' | 'MICRO_DEPOSIT' | 'PLAID' | 'PRENOTE';

  /**
   * Verification State
   */
  verification_state: 'PENDING' | 'ENABLED' | 'FAILED_VERIFICATION' | 'INSUFFICIENT_FUNDS';

  /**
   * Indicates which Lithic account the external account is associated with. For
   * external accounts that are associated with the program, account_token field
   * returned will be null
   */
  account_token?: string;

  /**
   * Address
   */
  address?: ExternalBankAccountAddress;

  /**
   * Optional field that helps identify bank accounts in receipts
   */
  company_id?: string;

  /**
   * Date of Birth of the Individual that owns the external bank account
   */
  dob?: string;

  /**
   * Doing Business As
   */
  doing_business_as?: string;

  /**
   * The financial account token of the operating account to fund the micro deposits
   */
  financial_account_token?: string;

  /**
   * The nickname for this External Bank Account
   */
  name?: string;

  /**
   * User Defined ID
   */
  user_defined_id?: string;

  /**
   * Optional free text description of the reason for the failed verification. For
   * ACH micro-deposits returned, this field will display the reason return code sent
   * by the ACH network
   */
  verification_failed_reason?: string;
}

export interface ExternalBankAccountUpdateResponse {
  /**
   * A globally unique identifier for this record of an external bank account
   * association. If a program links an external bank account to more than one
   * end-user or to both the program and the end-user, then Lithic will return each
   * record of the association
   */
  token: string;

  /**
   * The country that the bank account is located in using ISO 3166-1. We will only
   * accept USA bank accounts e.g., USA
   */
  country: string;

  /**
   * An ISO 8601 string representing when this funding source was added to the Lithic
   * account.
   */
  created: string;

  /**
   * currency of the external account 3-character alphabetic ISO 4217 code
   */
  currency: string;

  /**
   * The last 4 digits of the bank account. Derived by Lithic from the account number
   * passed
   */
  last_four: string;

  /**
   * Legal Name of the business or individual who owns the external account. This
   * will appear in statements
   */
  owner: string;

  /**
   * Owner Type
   */
  owner_type: 'BUSINESS' | 'INDIVIDUAL';

  /**
   * Routing Number
   */
  routing_number: string;

  /**
   * Account State
   */
  state: 'ENABLED' | 'CLOSED' | 'PAUSED';

  /**
   * Account Type
   */
  type: 'CHECKING' | 'SAVINGS';

  /**
   * The number of attempts at verification
   */
  verification_attempts: number;

  /**
   * Verification Method
   */
  verification_method: 'MANUAL' | 'MICRO_DEPOSIT' | 'PLAID' | 'PRENOTE';

  /**
   * Verification State
   */
  verification_state: 'PENDING' | 'ENABLED' | 'FAILED_VERIFICATION' | 'INSUFFICIENT_FUNDS';

  /**
   * Indicates which Lithic account the external account is associated with. For
   * external accounts that are associated with the program, account_token field
   * returned will be null
   */
  account_token?: string;

  /**
   * Address
   */
  address?: ExternalBankAccountAddress;

  /**
   * Optional field that helps identify bank accounts in receipts
   */
  company_id?: string;

  /**
   * Date of Birth of the Individual that owns the external bank account
   */
  dob?: string;

  /**
   * Doing Business As
   */
  doing_business_as?: string;

  /**
   * The financial account token of the operating account to fund the micro deposits
   */
  financial_account_token?: string;

  /**
   * The nickname for this External Bank Account
   */
  name?: string;

  /**
   * User Defined ID
   */
  user_defined_id?: string;

  /**
   * Optional free text description of the reason for the failed verification. For
   * ACH micro-deposits returned, this field will display the reason return code sent
   * by the ACH network
   */
  verification_failed_reason?: string;
}

export interface ExternalBankAccountListResponse {
  /**
   * A globally unique identifier for this record of an external bank account
   * association. If a program links an external bank account to more than one
   * end-user or to both the program and the end-user, then Lithic will return each
   * record of the association
   */
  token: string;

  /**
   * The country that the bank account is located in using ISO 3166-1. We will only
   * accept USA bank accounts e.g., USA
   */
  country: string;

  /**
   * An ISO 8601 string representing when this funding source was added to the Lithic
   * account.
   */
  created: string;

  /**
   * currency of the external account 3-character alphabetic ISO 4217 code
   */
  currency: string;

  /**
   * The last 4 digits of the bank account. Derived by Lithic from the account number
   * passed
   */
  last_four: string;

  /**
   * Legal Name of the business or individual who owns the external account. This
   * will appear in statements
   */
  owner: string;

  /**
   * Owner Type
   */
  owner_type: 'BUSINESS' | 'INDIVIDUAL';

  /**
   * Routing Number
   */
  routing_number: string;

  /**
   * Account State
   */
  state: 'ENABLED' | 'CLOSED' | 'PAUSED';

  /**
   * Account Type
   */
  type: 'CHECKING' | 'SAVINGS';

  /**
   * The number of attempts at verification
   */
  verification_attempts: number;

  /**
   * Verification Method
   */
  verification_method: 'MANUAL' | 'MICRO_DEPOSIT' | 'PLAID' | 'PRENOTE';

  /**
   * Verification State
   */
  verification_state: 'PENDING' | 'ENABLED' | 'FAILED_VERIFICATION' | 'INSUFFICIENT_FUNDS';

  /**
   * Indicates which Lithic account the external account is associated with. For
   * external accounts that are associated with the program, account_token field
   * returned will be null
   */
  account_token?: string;

  /**
   * Address
   */
  address?: ExternalBankAccountAddress;

  /**
   * Optional field that helps identify bank accounts in receipts
   */
  company_id?: string;

  /**
   * Date of Birth of the Individual that owns the external bank account
   */
  dob?: string;

  /**
   * Doing Business As
   */
  doing_business_as?: string;

  /**
   * The financial account token of the operating account to fund the micro deposits
   */
  financial_account_token?: string;

  /**
   * The nickname for this External Bank Account
   */
  name?: string;

  /**
   * User Defined ID
   */
  user_defined_id?: string;

  /**
   * Optional free text description of the reason for the failed verification. For
   * ACH micro-deposits returned, this field will display the reason return code sent
   * by the ACH network
   */
  verification_failed_reason?: string;
}

export interface ExternalBankAccountRetryMicroDepositsResponse {
  /**
   * A globally unique identifier for this record of an external bank account
   * association. If a program links an external bank account to more than one
   * end-user or to both the program and the end-user, then Lithic will return each
   * record of the association
   */
  token: string;

  /**
   * The country that the bank account is located in using ISO 3166-1. We will only
   * accept USA bank accounts e.g., USA
   */
  country: string;

  /**
   * An ISO 8601 string representing when this funding source was added to the Lithic
   * account.
   */
  created: string;

  /**
   * currency of the external account 3-character alphabetic ISO 4217 code
   */
  currency: string;

  /**
   * The last 4 digits of the bank account. Derived by Lithic from the account number
   * passed
   */
  last_four: string;

  /**
   * Legal Name of the business or individual who owns the external account. This
   * will appear in statements
   */
  owner: string;

  /**
   * Owner Type
   */
  owner_type: 'BUSINESS' | 'INDIVIDUAL';

  /**
   * Routing Number
   */
  routing_number: string;

  /**
   * Account State
   */
  state: 'ENABLED' | 'CLOSED' | 'PAUSED';

  /**
   * Account Type
   */
  type: 'CHECKING' | 'SAVINGS';

  /**
   * The number of attempts at verification
   */
  verification_attempts: number;

  /**
   * Verification Method
   */
  verification_method: 'MANUAL' | 'MICRO_DEPOSIT' | 'PLAID' | 'PRENOTE';

  /**
   * Verification State
   */
  verification_state: 'PENDING' | 'ENABLED' | 'FAILED_VERIFICATION' | 'INSUFFICIENT_FUNDS';

  /**
   * Indicates which Lithic account the external account is associated with. For
   * external accounts that are associated with the program, account_token field
   * returned will be null
   */
  account_token?: string;

  /**
   * Address
   */
  address?: ExternalBankAccountAddress;

  /**
   * Optional field that helps identify bank accounts in receipts
   */
  company_id?: string;

  /**
   * Date of Birth of the Individual that owns the external bank account
   */
  dob?: string;

  /**
   * Doing Business As
   */
  doing_business_as?: string;

  /**
   * The financial account token of the operating account to fund the micro deposits
   */
  financial_account_token?: string;

  /**
   * The nickname for this External Bank Account
   */
  name?: string;

  /**
   * User Defined ID
   */
  user_defined_id?: string;

  /**
   * Optional free text description of the reason for the failed verification. For
   * ACH micro-deposits returned, this field will display the reason return code sent
   * by the ACH network
   */
  verification_failed_reason?: string;
}

export interface ExternalBankAccountRetryPrenoteResponse {
  /**
   * A globally unique identifier for this record of an external bank account
   * association. If a program links an external bank account to more than one
   * end-user or to both the program and the end-user, then Lithic will return each
   * record of the association
   */
  token: string;

  /**
   * The country that the bank account is located in using ISO 3166-1. We will only
   * accept USA bank accounts e.g., USA
   */
  country: string;

  /**
   * An ISO 8601 string representing when this funding source was added to the Lithic
   * account.
   */
  created: string;

  /**
   * currency of the external account 3-character alphabetic ISO 4217 code
   */
  currency: string;

  /**
   * The last 4 digits of the bank account. Derived by Lithic from the account number
   * passed
   */
  last_four: string;

  /**
   * Legal Name of the business or individual who owns the external account. This
   * will appear in statements
   */
  owner: string;

  /**
   * Owner Type
   */
  owner_type: OwnerType;

  /**
   * Routing Number
   */
  routing_number: string;

  /**
   * Account State
   */
  state: 'ENABLED' | 'CLOSED' | 'PAUSED';

  /**
   * Account Type
   */
  type: 'CHECKING' | 'SAVINGS';

  /**
   * The number of attempts at verification
   */
  verification_attempts: number;

  /**
   * Verification Method
   */
  verification_method: VerificationMethod;

  /**
   * Verification State
   */
  verification_state: 'PENDING' | 'ENABLED' | 'FAILED_VERIFICATION' | 'INSUFFICIENT_FUNDS';

  /**
   * Indicates which Lithic account the external account is associated with. For
   * external accounts that are associated with the program, account_token field
   * returned will be null
   */
  account_token?: string;

  /**
   * Address
   */
  address?: ExternalBankAccountAddress;

  /**
   * Optional field that helps identify bank accounts in receipts
   */
  company_id?: string;

  /**
   * Date of Birth of the Individual that owns the external bank account
   */
  dob?: string;

  /**
   * Doing Business As
   */
  doing_business_as?: string;

  /**
   * The financial account token of the operating account to fund the micro deposits
   */
  financial_account_token?: string;

  /**
   * The nickname for this External Bank Account
   */
  name?: string;

  /**
   * User Defined ID
   */
  user_defined_id?: string;

  /**
   * Optional free text description of the reason for the failed verification. For
   * ACH micro-deposits returned, this field will display the reason return code sent
   * by the ACH network
   */
  verification_failed_reason?: string;
}

export type ExternalBankAccountCreateParams =
  | ExternalBankAccountCreateParams.BankVerifiedCreateBankAccountAPIRequest
  | ExternalBankAccountCreateParams.PlaidCreateBankAccountAPIRequest
  | ExternalBankAccountCreateParams.ExternallyVerifiedCreateBankAccountAPIRequest
  | ExternalBankAccountCreateParams.UnverifiedCreateBankAccountAPIRequest;

export declare namespace ExternalBankAccountCreateParams {
  export interface BankVerifiedCreateBankAccountAPIRequest {
    /**
     * Account Number
     */
    account_number: string;

    /**
     * The country that the bank account is located in using ISO 3166-1. We will only
     * accept USA bank accounts e.g., USA
     */
    country: string;

    /**
     * currency of the external account 3-character alphabetic ISO 4217 code
     */
    currency: string;

    /**
     * The financial account token of the operating account to fund the micro deposits
     */
    financial_account_token: string;

    /**
     * Legal Name of the business or individual who owns the external account. This
     * will appear in statements
     */
    owner: string;

    /**
     * Owner Type
     */
    owner_type: OwnerType;

    /**
     * Routing Number
     */
    routing_number: string;

    /**
     * Account Type
     */
    type: 'CHECKING' | 'SAVINGS';

    /**
     * Verification Method
     */
    verification_method: VerificationMethod;

    /**
     * Indicates which Lithic account the external account is associated with. For
     * external accounts that are associated with the program, account_token field
     * returned will be null
     */
    account_token?: string;

    /**
     * Address
     */
    address?: ExternalBankAccountAddress;

    /**
     * Optional field that helps identify bank accounts in receipts
     */
    company_id?: string;

    /**
     * Date of Birth of the Individual that owns the external bank account
     */
    dob?: string;

    /**
     * Doing Business As
     */
    doing_business_as?: string;

    /**
     * The nickname for this External Bank Account
     */
    name?: string;

    /**
     * User Defined ID
     */
    user_defined_id?: string;

    verification_enforcement?: boolean;
  }

  export interface PlaidCreateBankAccountAPIRequest {
    /**
     * Legal Name of the business or individual who owns the external account. This
     * will appear in statements
     */
    owner: string;

    /**
     * Owner Type
     */
    owner_type: OwnerType;

    processor_token: string;

    /**
     * Verification Method
     */
    verification_method: VerificationMethod;

    /**
     * Indicates which Lithic account the external account is associated with. For
     * external accounts that are associated with the program, account_token field
     * returned will be null
     */
    account_token?: string;

    /**
     * Optional field that helps identify bank accounts in receipts
     */
    company_id?: string;

    /**
     * Date of Birth of the Individual that owns the external bank account
     */
    dob?: string;

    /**
     * Doing Business As
     */
    doing_business_as?: string;

    /**
     * User Defined ID
     */
    user_defined_id?: string;
  }

  export interface ExternallyVerifiedCreateBankAccountAPIRequest {
    /**
     * Account Number
     */
    account_number: string;

    /**
     * The country that the bank account is located in using ISO 3166-1. We will only
     * accept USA bank accounts e.g., USA
     */
    country: string;

    /**
     * currency of the external account 3-character alphabetic ISO 4217 code
     */
    currency: string;

    /**
     * Legal Name of the business or individual who owns the external account. This
     * will appear in statements
     */
    owner: string;

    /**
     * Owner Type
     */
    owner_type: OwnerType;

    /**
     * Routing Number
     */
    routing_number: string;

    /**
     * Account Type
     */
    type: 'CHECKING' | 'SAVINGS';

    /**
     * Verification Method
     */
    verification_method: 'EXTERNALLY_VERIFIED';

    /**
     * Indicates which Lithic account the external account is associated with. For
     * external accounts that are associated with the program, account_token field
     * returned will be null
     */
    account_token?: string;

    /**
     * Address
     */
    address?: ExternalBankAccountAddress;

    /**
     * Optional field that helps identify bank accounts in receipts
     */
    company_id?: string;

    /**
     * Date of Birth of the Individual that owns the external bank account
     */
    dob?: string;

    /**
     * Doing Business As
     */
    doing_business_as?: string;

    /**
     * The nickname for this External Bank Account
     */
    name?: string;

    /**
     * User Defined ID
     */
    user_defined_id?: string;
  }

  export interface UnverifiedCreateBankAccountAPIRequest {
    /**
     * Account Number
     */
    account_number: string;

    /**
     * The country that the bank account is located in using ISO 3166-1. We will only
     * accept USA bank accounts e.g., USA
     */
    country: string;

    /**
     * currency of the external account 3-character alphabetic ISO 4217 code
     */
    currency: string;

    /**
     * Legal Name of the business or individual who owns the external account. This
     * will appear in statements
     */
    owner: string;

    /**
     * Owner Type
     */
    owner_type: OwnerType;

    /**
     * Routing Number
     */
    routing_number: string;

    /**
     * Account Type
     */
    type: 'CHECKING' | 'SAVINGS';

    /**
     * Verification Method
     */
    verification_method: 'UNVERIFIED';

    /**
     * Indicates which Lithic account the external account is associated with. For
     * external accounts that are associated with the program, account_token field
     * returned will be null
     */
    account_token?: string;

    /**
     * Address
     */
    address?: ExternalBankAccountAddress;

    /**
     * Optional field that helps identify bank accounts in receipts
     */
    company_id?: string;

    /**
     * Date of Birth of the Individual that owns the external bank account
     */
    dob?: string;

    /**
     * Doing Business As
     */
    doing_business_as?: string;

    /**
     * The nickname for this External Bank Account
     */
    name?: string;

    /**
     * User Defined ID
     */
    user_defined_id?: string;
  }
}

export interface ExternalBankAccountUpdateParams {
  /**
   * Address
   */
  address?: ExternalBankAccountAddress;

  /**
   * Optional field that helps identify bank accounts in receipts
   */
  company_id?: string;

  /**
   * Date of Birth of the Individual that owns the external bank account
   */
  dob?: string;

  /**
   * Doing Business As
   */
  doing_business_as?: string;

  /**
   * The nickname for this External Bank Account
   */
  name?: string;

  /**
   * Legal Name of the business or individual who owns the external account. This
   * will appear in statements
   */
  owner?: string;

  /**
   * Owner Type
   */
  owner_type?: OwnerType;

  type?: 'CHECKING' | 'SAVINGS';

  /**
   * User Defined ID
   */
  user_defined_id?: string;
}

export interface ExternalBankAccountListParams extends CursorPageParams {
  account_token?: string;

  account_types?: Array<'CHECKING' | 'SAVINGS'>;

  countries?: Array<string>;

  owner_types?: Array<OwnerType>;

  states?: Array<'ENABLED' | 'CLOSED' | 'PAUSED'>;

  verification_states?: Array<'PENDING' | 'ENABLED' | 'FAILED_VERIFICATION' | 'INSUFFICIENT_FUNDS'>;
}

export interface ExternalBankAccountRetryMicroDepositsParams {
  financial_account_token?: string;
}

export interface ExternalBankAccountRetryPrenoteParams {
  financial_account_token?: string;
}

ExternalBankAccounts.ExternalBankAccountListResponsesCursorPage = ExternalBankAccountListResponsesCursorPage;
ExternalBankAccounts.MicroDeposits = MicroDeposits;

export declare namespace ExternalBankAccounts {
  export {
    type ExternalBankAccountAddress as ExternalBankAccountAddress,
    type OwnerType as OwnerType,
    type VerificationMethod as VerificationMethod,
    type ExternalBankAccountCreateResponse as ExternalBankAccountCreateResponse,
    type ExternalBankAccountRetrieveResponse as ExternalBankAccountRetrieveResponse,
    type ExternalBankAccountUpdateResponse as ExternalBankAccountUpdateResponse,
    type ExternalBankAccountListResponse as ExternalBankAccountListResponse,
    type ExternalBankAccountRetryMicroDepositsResponse as ExternalBankAccountRetryMicroDepositsResponse,
    type ExternalBankAccountRetryPrenoteResponse as ExternalBankAccountRetryPrenoteResponse,
    ExternalBankAccountListResponsesCursorPage as ExternalBankAccountListResponsesCursorPage,
    type ExternalBankAccountCreateParams as ExternalBankAccountCreateParams,
    type ExternalBankAccountUpdateParams as ExternalBankAccountUpdateParams,
    type ExternalBankAccountListParams as ExternalBankAccountListParams,
    type ExternalBankAccountRetryMicroDepositsParams as ExternalBankAccountRetryMicroDepositsParams,
    type ExternalBankAccountRetryPrenoteParams as ExternalBankAccountRetryPrenoteParams,
  };

  export {
    MicroDeposits as MicroDeposits,
    type MicroDepositCreateResponse as MicroDepositCreateResponse,
    type MicroDepositCreateParams as MicroDepositCreateParams,
  };
}
