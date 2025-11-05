// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as ExternalBankAccountsAPI from './external-bank-accounts';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class MicroDeposits extends APIResource {
  /**
   * Verify the external bank account by providing the micro deposit amounts.
   *
   * @example
   * ```ts
   * const microDeposit =
   *   await client.externalBankAccounts.microDeposits.create(
   *     '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   *     { micro_deposits: [0, 0] },
   *   );
   * ```
   */
  create(
    externalBankAccountToken: string,
    body: MicroDepositCreateParams,
    options?: RequestOptions,
  ): APIPromise<MicroDepositCreateResponse> {
    return this._client.post(path`/v1/external_bank_accounts/${externalBankAccountToken}/micro_deposits`, {
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
  address?: ExternalBankAccountsAPI.ExternalBankAccountAddress;

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

export interface MicroDepositCreateParams {
  micro_deposits: Array<number>;
}

export declare namespace MicroDeposits {
  export {
    type MicroDepositCreateResponse as MicroDepositCreateResponse,
    type MicroDepositCreateParams as MicroDepositCreateParams,
  };
}
