// File generated from our OpenAPI spec by Stainless.

import * as Core from 'lithic/core';
import { APIResource } from 'lithic/resource';
import { isRequestOptions } from 'lithic/core';
import { MicroDeposits } from './micro-deposits';
import * as API from './';
import { CursorPage, CursorPageParams } from 'lithic/pagination';

export class ExternalBankAccounts extends APIResource {
  microDeposits: MicroDeposits = new MicroDeposits(this.client);

  /**
   * Creates an external bank account within a program or Lithic account.
   */
  create(
    body: ExternalBankAccountCreateParams,
    options?: Core.RequestOptions,
  ): Promise<Core.APIResponse<ExternalBankAccountCreateResponse>> {
    return this.post('/external_bank_accounts', { body, ...options });
  }

  /**
   * Get the external bank account by token.
   */
  retrieve(
    externalBankAccountToken: string,
    options?: Core.RequestOptions,
  ): Promise<Core.APIResponse<ExternalBankAccountRetrieveResponse>> {
    return this.get(`/external_bank_accounts/${externalBankAccountToken}`, options);
  }

  /**
   * Update the external bank account by token.
   */
  update(
    externalBankAccountToken: string,
    body: ExternalBankAccountUpdateParams,
    options?: Core.RequestOptions,
  ): Promise<Core.APIResponse<ExternalBankAccountUpdateResponse>> {
    return this.patch(`/external_bank_accounts/${externalBankAccountToken}`, { body, ...options });
  }

  /**
   * List all the external bank accounts for the provided search criteria.
   */
  list(
    query?: ExternalBankAccountListParams,
    options?: Core.RequestOptions,
  ): Core.PagePromise<ExternalBankAccountListResponsesCursorPage>;
  list(options?: Core.RequestOptions): Core.PagePromise<ExternalBankAccountListResponsesCursorPage>;
  list(
    query: ExternalBankAccountListParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.PagePromise<ExternalBankAccountListResponsesCursorPage> {
    if (isRequestOptions(query)) {
      return this.list({}, query);
    }
    return this.getAPIList('/external_bank_accounts', ExternalBankAccountListResponsesCursorPage, {
      query,
      ...options,
    });
  }
}

export class ExternalBankAccountListResponsesCursorPage extends CursorPage<ExternalBankAccountListResponse> {}
// alias so we can export it in the namespace
type _ExternalBankAccountListResponsesCursorPage = ExternalBankAccountListResponsesCursorPage;

/**
 * Address used during Address Verification Service (AVS) checks during
 * transactions if enabled via Auth Rules.
 */
export interface ExternalBankAccountAddress {
  address1: string;

  city: string;

  country: string;

  postal_code: string;

  state: string;

  address2?: string;
}

export type OwnerType = 'INDIVIDUAL' | 'BUSINESS';

export type VerificationMethod = 'MANUAL' | 'MICRO_DEPOSIT' | 'PLAID';

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
   * accept US bank accounts e.g., US
   */
  country: string;

  /**
   * An ISO 8601 string representing when this funding source was added to the Lithic
   * account.
   */
  created: string;

  /**
   * currency of the external account 3-digit alphabetic ISO 4217 code
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

  owner_type: 'INDIVIDUAL' | 'BUSINESS';

  routing_number: string;

  state: 'ENABLED' | 'CLOSED' | 'PAUSED';

  type: 'CHECKING' | 'SAVINGS';

  verification_method: 'MANUAL' | 'MICRO_DEPOSIT' | 'PLAID';

  verification_state: 'PENDING' | 'ENABLED' | 'FAILED_VERIFICATION';

  /**
   * Indicates which Lithic account the external account is associated with. For
   * external accounts that are associated with the program, account_token field
   * returned will be null
   */
  account_token?: string;

  /**
   * Address used during Address Verification Service (AVS) checks during
   * transactions if enabled via Auth Rules.
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

  doing_business_as?: string;

  /**
   * The nickname given to this record of External Bank Account
   */
  name?: string;
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
   * accept US bank accounts e.g., US
   */
  country: string;

  /**
   * An ISO 8601 string representing when this funding source was added to the Lithic
   * account.
   */
  created: string;

  /**
   * currency of the external account 3-digit alphabetic ISO 4217 code
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

  owner_type: 'INDIVIDUAL' | 'BUSINESS';

  routing_number: string;

  state: 'ENABLED' | 'CLOSED' | 'PAUSED';

  type: 'CHECKING' | 'SAVINGS';

  verification_method: 'MANUAL' | 'MICRO_DEPOSIT' | 'PLAID';

  verification_state: 'PENDING' | 'ENABLED' | 'FAILED_VERIFICATION';

  /**
   * Indicates which Lithic account the external account is associated with. For
   * external accounts that are associated with the program, account_token field
   * returned will be null
   */
  account_token?: string;

  /**
   * Address used during Address Verification Service (AVS) checks during
   * transactions if enabled via Auth Rules.
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

  doing_business_as?: string;

  /**
   * The nickname given to this record of External Bank Account
   */
  name?: string;
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
   * accept US bank accounts e.g., US
   */
  country: string;

  /**
   * An ISO 8601 string representing when this funding source was added to the Lithic
   * account.
   */
  created: string;

  /**
   * currency of the external account 3-digit alphabetic ISO 4217 code
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

  owner_type: 'INDIVIDUAL' | 'BUSINESS';

  routing_number: string;

  state: 'ENABLED' | 'CLOSED' | 'PAUSED';

  type: 'CHECKING' | 'SAVINGS';

  verification_method: 'MANUAL' | 'MICRO_DEPOSIT' | 'PLAID';

  verification_state: 'PENDING' | 'ENABLED' | 'FAILED_VERIFICATION';

  /**
   * Indicates which Lithic account the external account is associated with. For
   * external accounts that are associated with the program, account_token field
   * returned will be null
   */
  account_token?: string;

  /**
   * Address used during Address Verification Service (AVS) checks during
   * transactions if enabled via Auth Rules.
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

  doing_business_as?: string;

  /**
   * The nickname given to this record of External Bank Account
   */
  name?: string;
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
   * accept US bank accounts e.g., US
   */
  country: string;

  /**
   * An ISO 8601 string representing when this funding source was added to the Lithic
   * account.
   */
  created: string;

  /**
   * currency of the external account 3-digit alphabetic ISO 4217 code
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

  owner_type: 'INDIVIDUAL' | 'BUSINESS';

  routing_number: string;

  state: 'ENABLED' | 'CLOSED' | 'PAUSED';

  type: 'CHECKING' | 'SAVINGS';

  verification_method: 'MANUAL' | 'MICRO_DEPOSIT' | 'PLAID';

  verification_state: 'PENDING' | 'ENABLED' | 'FAILED_VERIFICATION';

  /**
   * Indicates which Lithic account the external account is associated with. For
   * external accounts that are associated with the program, account_token field
   * returned will be null
   */
  account_token?: string;

  /**
   * Address used during Address Verification Service (AVS) checks during
   * transactions if enabled via Auth Rules.
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

  doing_business_as?: string;

  /**
   * The nickname given to this record of External Bank Account
   */
  name?: string;
}

export type ExternalBankAccountCreateParams =
  | ExternalBankAccountCreateParams.PlaidCreateBankAccountAPIRequest
  | ExternalBankAccountCreateParams.BankVerifiedCreateBankAccountAPIRequest;

export namespace ExternalBankAccountCreateParams {
  export interface PlaidCreateBankAccountAPIRequest {
    owner: string;

    owner_type: OwnerType;

    processor_token: string;

    verification_method: VerificationMethod;

    account_token?: string;

    company_id?: string;

    /**
     * Date of Birth of the Individual that owns the external bank account
     */
    dob?: string;

    doing_business_as?: string;
  }

  export interface BankVerifiedCreateBankAccountAPIRequest {
    account_number: string;

    country: string;

    currency: string;

    owner: string;

    owner_type: OwnerType;

    routing_number: string;

    type: 'CHECKING' | 'SAVINGS';

    verification_method: VerificationMethod;

    account_token?: string;

    /**
     * Address used during Address Verification Service (AVS) checks during
     * transactions if enabled via Auth Rules.
     */
    address?: ExternalBankAccountAddress;

    company_id?: string;

    /**
     * Date of Birth of the Individual that owns the external bank account
     */
    dob?: string;

    doing_business_as?: string;

    name?: string;

    /**
     * Indicates whether verification was enforced for a given association record. For
     * MICRO_DEPOSIT, option to disable verification if the external bank account has
     * already been verified before. By default, verification will be required unless
     * users pass in a value of false
     */
    verification_enforcement?: boolean;
  }
}

export interface ExternalBankAccountUpdateParams {
  /**
   * Address used during Address Verification Service (AVS) checks during
   * transactions if enabled via Auth Rules.
   */
  address?: ExternalBankAccountAddress;

  company_id?: string;

  /**
   * Date of Birth of the Individual that owns the external bank account
   */
  dob?: string;

  doing_business_as?: string;

  name?: string;

  owner?: string;

  owner_type?: OwnerType;
}

export interface ExternalBankAccountListParams extends CursorPageParams {
  account_token?: string;

  account_types?: Array<'CHECKING' | 'SAVINGS'>;

  countries?: Array<string>;

  owner_types?: Array<OwnerType>;

  states?: Array<'ENABLED' | 'CLOSED' | 'PAUSED'>;

  verification_states?: Array<'PENDING' | 'ENABLED' | 'FAILED_VERIFICATION'>;
}

export namespace ExternalBankAccounts {
  export import ExternalBankAccountAddress = API.ExternalBankAccountAddress;
  export import OwnerType = API.OwnerType;
  export import VerificationMethod = API.VerificationMethod;
  export import ExternalBankAccountCreateResponse = API.ExternalBankAccountCreateResponse;
  export import ExternalBankAccountRetrieveResponse = API.ExternalBankAccountRetrieveResponse;
  export import ExternalBankAccountUpdateResponse = API.ExternalBankAccountUpdateResponse;
  export import ExternalBankAccountListResponse = API.ExternalBankAccountListResponse;
  export type ExternalBankAccountListResponsesCursorPage = _ExternalBankAccountListResponsesCursorPage;
  export import ExternalBankAccountCreateParams = API.ExternalBankAccountCreateParams;
  export import ExternalBankAccountUpdateParams = API.ExternalBankAccountUpdateParams;
  export import ExternalBankAccountListParams = API.ExternalBankAccountListParams;

  export import MicroDeposits = API.MicroDeposits;
  export import MicroDepositCreateResponse = API.MicroDepositCreateResponse;
  export import MicroDepositCreateParams = API.MicroDepositCreateParams;
}
