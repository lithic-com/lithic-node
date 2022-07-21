// File generated from our OpenAPI spec by Stainless.

import * as Core from '~/core';
import { isRequestOptions } from '~/core';
import { Page, PageParams } from '~/pagination';
import * as Shared from './shared';

export class FundingSources extends Core.APIResource {
  /**
   * Add a funding source using bank routing and account numbers or via Plaid.
   *
   * In the production environment, funding accounts will be set to `PENDING` state
   * until micro-deposit validation completes while funding accounts in sandbox will
   * be set to `ENABLED` state automatically.
   */
  create(
    body: FundingSourceCreateParams,
    options?: Core.RequestOptions,
  ): Promise<Core.APIResponse<FundingSource>> {
    return this.post('/funding_sources', { body, ...options });
  }

  /**
   * Update a funding source.
   */
  update(
    id: string,
    body: FundingSourceUpdateParams,
    options?: Core.RequestOptions,
  ): Promise<Core.APIResponse<FundingSource>> {
    return this.patch(`/funding_sources/${id}`, { body, ...options });
  }

  /**
   * List all the funding sources associated with the Lithic account.
   */
  list(query?: FundingSourceListParams, options?: Core.RequestOptions): Core.PagePromise<FundingSourcesPage>;
  list(options?: Core.RequestOptions): Core.PagePromise<FundingSourcesPage>;
  list(
    query: FundingSourceListParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.PagePromise<FundingSourcesPage> {
    if (isRequestOptions(query)) {
      return this.list({}, query);
    }

    return this.getAPIList('/funding_sources', FundingSourcesPage, { query, ...options });
  }

  /**
   * Verify a bank account as a funding source by providing received micro-deposit
   * amounts.
   */
  verify(
    id: string,
    body: FundingSourceVerifyParams,
    options?: Core.RequestOptions,
  ): Promise<Core.APIResponse<FundingSource>> {
    return this.post(`/funding_sources/${id}/verify`, { body, ...options });
  }
}

export class FundingSourcesPage extends Page<FundingSource> {}

export interface FundingSource {
  /**
   * An ISO 8601 string representing when this funding source was added to the Lithic
   * account. This may be `null`. UTC time zone.
   */
  created: string;

  /**
   * The last 4 digits of the account (e.g. bank account, debit card) associated with
   * this FundingAccount. This may be null.
   */
  last_four: string;

  /**
   * State of funding source.
   *
   * Funding source states:
   *
   * - `ENABLED` - The funding account is available to use for card creation and
   *   transactions.
   * - `PENDING` - The funding account is still being verified e.g. bank
   *   micro-deposits verification.
   * - `DELETED` - The founding account has been deleted.
   */
  state: 'ENABLED' | 'PENDING' | 'DELETED';

  /**
   * A globally unique identifier for this FundingAccount.
   */
  token: string;

  /**
   * Types of funding source:
   *
   * - `DEPOSITORY_CHECKING` - Bank checking account.
   * - `DEPOSITORY_SAVINGS` - Bank savings account.
   */
  type: 'DEPOSITORY_CHECKING' | 'DEPOSITORY_SAVINGS';

  /**
   * Account name identifying the funding source. This may be `null`.
   */
  account_name?: string;

  /**
   * The nickname given to the `FundingAccount` or `null` if it has no nickname.
   */
  nickname?: string;
}

export type FundingSourceCreateParams = FundingSourceCreateParams.Bank | FundingSourceCreateParams.Plaid;

export namespace FundingSourceCreateParams {
  export interface Bank {
    /**
     * The account number of the bank account.
     */
    account_number: string;

    /**
     * The routing number of the bank account.
     */
    routing_number: string;

    validation_method: 'BANK';

    /**
     * The name associated with the bank account. This property is only for
     * identification purposes, and has no bearing on the external properties of the
     * bank.
     */
    account_name?: string;

    /**
     * Only required for multi-account users. Token identifying the account that the
     * bank account will be associated with. Only applicable if using account holder
     * enrollment. See
     * [Managing Your Program](https://docs.lithic.com/docs/managing-your-program) for
     * more information.
     */
    account_token?: string;
  }

  export interface Plaid {
    /**
     * The processor token associated with the bank account.
     */
    processor_token: string;

    validation_method: 'PLAID';

    /**
     * Only required for multi-account users. Token identifying the account associated
     * with the bank account. Only applicable if using account holder enrollment. See
     * [Managing Your Program](https://docs.lithic.com/docs/managing-your-program) for
     * more information.
     */
    account_token?: string;
  }
}

export interface FundingSourceUpdateParams {
  /**
   * Only required for multi-account users. Token identifying the account that the
   * bank account will be associated with. Only applicable if using account holder
   * enrollment. See
   * [Managing Your Program](https://docs.lithic.com/docs/managing-your-program) for
   * more information.
   */
  account_token?: string;

  /**
   * The desired state of the bank account.
   *
   * If a bank account is set to `DELETED`, all cards linked to this account will no
   * longer be associated with it. If there are no other bank accounts in state
   * `ENABLED` on the account, authorizations will not be accepted on the card until
   * a new funding account is added.
   */
  state?: 'DELETED' | 'ENABLED';
}

export interface FundingSourceListParams extends PageParams {
  account_token?: string;
}

export interface FundingSourceVerifyParams {
  /**
   * An array of dollar amounts (in cents) received in two credit transactions.
   */
  micro_deposits: Array<number>;

  /**
   * Only required for multi-account users. Token identifying the account that the
   * bank account will be associated with. Only applicable if using account holder
   * enrollment. See
   * [Managing Your Program](https://docs.lithic.com/docs/managing-your-program) for
   * more information.
   */
  account_token?: string;
}
