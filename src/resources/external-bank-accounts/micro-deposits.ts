// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import * as Core from 'lithic/core';
import { APIResource } from 'lithic/resource';
import * as MicroDepositsAPI from 'lithic/resources/external-bank-accounts/micro-deposits';
import * as ExternalBankAccountsAPI from 'lithic/resources/external-bank-accounts/external-bank-accounts';

export class MicroDeposits extends APIResource {
  /**
   * Verify the external bank account by providing the micro deposit amounts.
   */
  create(
    externalBankAccountToken: string,
    body: MicroDepositCreateParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<MicroDepositCreateResponse> {
    return this._client.post(`/external_bank_accounts/${externalBankAccountToken}/micro_deposits`, {
      body,
      ...options,
    });
  }
}

export interface MicroDepositCreateResponse {
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

  owner_type: 'BUSINESS' | 'INDIVIDUAL';

  routing_number: string;

  state: 'CLOSED' | 'ENABLED' | 'PAUSED';

  type: 'CHECKING' | 'SAVINGS';

  /**
   * The number of attempts at verification
   */
  verification_attempts: number;

  verification_method: 'MANUAL' | 'MICRO_DEPOSIT' | 'PLAID' | 'PRENOTE';

  verification_state: 'ENABLED' | 'FAILED_VERIFICATION' | 'INSUFFICIENT_FUNDS' | 'PENDING';

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
  address?: ExternalBankAccountsAPI.ExternalBankAccountAddress;

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
   * The financial account token of the operating account, which will provide the
   * funds for micro deposits used to verify the account
   */
  financial_account_token?: string;

  /**
   * The nickname given to this record of External Bank Account
   */
  name?: string;

  user_defined_id?: string;

  /**
   * Optional free text description of the reason for the failed verification. For
   * ACH micro-deposits returned, this field will display the reason return code sent
   * by the ACH network
   */
  verification_failed_reason?: string;
}

export interface MicroDepositCreateParams {
  micro_deposits: Array<number>;
}

export namespace MicroDeposits {
  export import MicroDepositCreateResponse = MicroDepositsAPI.MicroDepositCreateResponse;
  export import MicroDepositCreateParams = MicroDepositsAPI.MicroDepositCreateParams;
}
