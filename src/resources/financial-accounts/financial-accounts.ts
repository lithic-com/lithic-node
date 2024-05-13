// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import * as Core from '../../core';
import { APIResource } from '../../resource';
import { isRequestOptions } from '../../core';
import * as FinancialAccountsAPI from './financial-accounts';
import * as BalancesAPI from './balances';
import * as FinancialTransactionsAPI from './financial-transactions';
import * as StatementsAPI from './statements/statements';
import { SinglePage } from '../../pagination';

export class FinancialAccounts extends APIResource {
  balances: BalancesAPI.Balances = new BalancesAPI.Balances(this._client);
  financialTransactions: FinancialTransactionsAPI.FinancialTransactions =
    new FinancialTransactionsAPI.FinancialTransactions(this._client);
  statements: StatementsAPI.Statements = new StatementsAPI.Statements(this._client);

  /**
   * Create a new financial account
   */
  create(
    params: FinancialAccountCreateParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<FinancialAccount> {
    const { 'Idempotency-Key': idempotencyKey, ...body } = params;
    return this._client.post('/financial_accounts', {
      body,
      ...options,
      headers: { 'Idempotency-Key': idempotencyKey || '', ...options?.headers },
    });
  }

  /**
   * Get a financial account
   */
  retrieve(financialAccountToken: string, options?: Core.RequestOptions): Core.APIPromise<FinancialAccount> {
    return this._client.get(`/financial_accounts/${financialAccountToken}`, options);
  }

  /**
   * Update a financial account
   */
  update(
    financialAccountToken: string,
    body?: FinancialAccountUpdateParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<FinancialAccount>;
  update(financialAccountToken: string, options?: Core.RequestOptions): Core.APIPromise<FinancialAccount>;
  update(
    financialAccountToken: string,
    body: FinancialAccountUpdateParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.APIPromise<FinancialAccount> {
    if (isRequestOptions(body)) {
      return this.update(financialAccountToken, {}, body);
    }
    return this._client.patch(`/financial_accounts/${financialAccountToken}`, { body, ...options });
  }

  /**
   * Retrieve information on your financial accounts including routing and account
   * number.
   */
  list(
    query?: FinancialAccountListParams,
    options?: Core.RequestOptions,
  ): Core.PagePromise<FinancialAccountsSinglePage, FinancialAccount>;
  list(options?: Core.RequestOptions): Core.PagePromise<FinancialAccountsSinglePage, FinancialAccount>;
  list(
    query: FinancialAccountListParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.PagePromise<FinancialAccountsSinglePage, FinancialAccount> {
    if (isRequestOptions(query)) {
      return this.list({}, query);
    }
    return this._client.getAPIList('/financial_accounts', FinancialAccountsSinglePage, { query, ...options });
  }
}

export class FinancialAccountsSinglePage extends SinglePage<FinancialAccount> {}

export class FinancialTransactionsSinglePage extends SinglePage<FinancialTransaction> {}

/**
 * Financial Account
 */
export interface FinancialAccount {
  /**
   * Globally unique identifier for the financial account.
   */
  token: string;

  /**
   * Date and time for when the financial account was first created.
   */
  created: string;

  /**
   * Type of financial account
   */
  type: 'ISSUING' | 'OPERATING' | 'RESERVE';

  /**
   * Date and time for when the financial account was last updated.
   */
  updated: string;

  /**
   * Account number for your Lithic-assigned bank account number, if applicable.
   */
  account_number?: string;

  /**
   * Account token of the financial account if applicable.
   */
  account_token?: string;

  /**
   * User-defined nickname for the financial account.
   */
  nickname?: string;

  /**
   * Routing number for your Lithic-assigned bank account number, if applicable.
   */
  routing_number?: string;
}

export interface FinancialTransaction {
  /**
   * Globally unique identifier.
   */
  token: string;

  /**
   * Status types:
   *
   * - `CARD` - Issuing card transaction.
   * - `ACH` - Transaction over ACH.
   * - `TRANSFER` - Internal transfer of funds between financial accounts in your
   *   program.
   */
  category: 'ACH' | 'CARD' | 'TRANSFER';

  /**
   * Date and time when the financial transaction first occurred. UTC time zone.
   */
  created: string;

  /**
   * 3-digit alphabetic ISO 4217 code for the settling currency of the transaction.
   */
  currency: string;

  /**
   * A string that provides a description of the financial transaction; may be useful
   * to display to users.
   */
  descriptor: string;

  /**
   * A list of all financial events that have modified this financial transaction.
   */
  events: Array<FinancialTransaction.Event>;

  /**
   * Pending amount of the transaction in the currency's smallest unit (e.g., cents),
   * including any acquirer fees. The value of this field will go to zero over time
   * once the financial transaction is settled.
   */
  pending_amount: number;

  /**
   * APPROVED transactions were successful while DECLINED transactions were declined
   * by user, Lithic, or the network.
   */
  result: 'APPROVED' | 'DECLINED';

  /**
   * Amount of the transaction that has been settled in the currency's smallest unit
   * (e.g., cents), including any acquirer fees. This may change over time.
   */
  settled_amount: number;

  /**
   * Status types:
   *
   * - `DECLINED` - The card transaction was declined.
   * - `EXPIRED` - Lithic reversed the card authorization as it has passed its
   *   expiration time.
   * - `PENDING` - Authorization is pending completion from the merchant or pending
   *   release from ACH hold period
   * - `RETURNED` - The financial transaction has been returned.
   * - `SETTLED` - The financial transaction is completed.
   * - `VOIDED` - The merchant has voided the previously pending card authorization.
   */
  status: 'DECLINED' | 'EXPIRED' | 'PENDING' | 'RETURNED' | 'SETTLED' | 'VOIDED';

  /**
   * Date and time when the financial transaction was last updated. UTC time zone.
   */
  updated: string;
}

export namespace FinancialTransaction {
  export interface Event {
    /**
     * Globally unique identifier.
     */
    token?: string;

    /**
     * Amount of the financial event that has been settled in the currency's smallest
     * unit (e.g., cents).
     */
    amount?: number;

    /**
     * Date and time when the financial event occurred. UTC time zone.
     */
    created?: string;

    /**
     * APPROVED financial events were successful while DECLINED financial events were
     * declined by user, Lithic, or the network.
     */
    result?: 'APPROVED' | 'DECLINED';

    /**
     * Event types:
     *
     * - `ACH_INSUFFICIENT_FUNDS` - Attempted ACH origination declined due to
     *   insufficient balance.
     * - `ACH_ORIGINATION_PENDING` - ACH origination received and pending
     *   approval/release from an ACH hold.
     * - `ACH_ORIGINATION_APPROVED` - ACH origination has been approved and pending
     *   processing.
     * - `ACH_ORIGINATION_DECLINED` - ACH origination has been declined.
     * - `ACH_ORIGINATION_CANCELLED` - ACH origination has been cancelled.
     * - `ACH_ORIGINATION_PROCESSED` - ACH origination has been processed.
     * - `ACH_ORIGINATION_SETTLED` - ACH origination has settled.
     * - `ACH_ORIGINATION_RELEASED` - ACH origination released from pending to
     *   available balance.
     * - `ACH_RECEIPT_PENDING` - ACH receipt pending release from an ACH holder.
     * - `ACH_RECEIPT_RELEASED` - ACH receipt released from pending to available
     *   balance.
     * - `ACH_RETURN` - ACH origination returned by the Receiving Depository Financial
     *   Institution.
     * - `AUTHORIZATION` - Authorize a card transaction.
     * - `AUTHORIZATION_ADVICE` - Advice on a card transaction.
     * - `AUTHORIZATION_EXPIRY` - Card Authorization has expired and reversed by
     *   Lithic.
     * - `AUTHORIZATION_REVERSAL` - Card Authorization was reversed by the merchant.
     * - `BALANCE_INQUIRY` - A card balance inquiry (typically a $0 authorization) has
     *   occurred on a card.
     * - `CLEARING` - Card Transaction is settled.
     * - `CORRECTION_DEBIT` - Manual card transaction correction (Debit).
     * - `CORRECTION_CREDIT` - Manual card transaction correction (Credit).
     * - `CREDIT_AUTHORIZATION` - A refund or credit card authorization from a
     *   merchant.
     * - `CREDIT_AUTHORIZATION_ADVICE` - A credit card authorization was approved on
     *   your behalf by the network.
     * - `FINANCIAL_AUTHORIZATION` - A request from a merchant to debit card funds
     *   without additional clearing.
     * - `FINANCIAL_CREDIT_AUTHORIZATION` - A request from a merchant to refund or
     *   credit card funds without additional clearing.
     * - `RETURN` - A card refund has been processed on the transaction.
     * - `RETURN_REVERSAL` - A card refund has been reversed (e.g., when a merchant
     *   reverses an incorrect refund).
     * - `TRANSFER` - Successful internal transfer of funds between financial accounts.
     * - `TRANSFER_INSUFFICIENT_FUNDS` - Declined internl transfer of funds due to
     *   insufficient balance of the sender.
     */
    type?:
      | 'ACH_EXCEEDED_THRESHOLD'
      | 'ACH_INSUFFICIENT_FUNDS'
      | 'ACH_INVALID_ACCOUNT'
      | 'ACH_ORIGINATION_PENDING'
      | 'ACH_ORIGINATION_APPROVED'
      | 'ACH_ORIGINATION_DECLINED'
      | 'ACH_ORIGINATION_CANCELLED'
      | 'ACH_ORIGINATION_PROCESSED'
      | 'ACH_ORIGINATION_SETTLED'
      | 'ACH_ORIGINATION_RELEASED'
      | 'ACH_RECEIPT_PENDING'
      | 'ACH_RECEIPT_RELEASED'
      | 'ACH_RETURN'
      | 'ACH_RETURN_PENDING'
      | 'AUTHORIZATION'
      | 'AUTHORIZATION_ADVICE'
      | 'AUTHORIZATION_EXPIRY'
      | 'AUTHORIZATION_REVERSAL'
      | 'BALANCE_INQUIRY'
      | 'CLEARING'
      | 'CORRECTION_CREDIT'
      | 'CORRECTION_DEBIT'
      | 'CREDIT_AUTHORIZATION'
      | 'CREDIT_AUTHORIZATION_ADVICE'
      | 'FINANCIAL_AUTHORIZATION'
      | 'FINANCIAL_CREDIT_AUTHORIZATION'
      | 'RETURN'
      | 'RETURN_REVERSAL'
      | 'TRANSFER'
      | 'TRANSFER_INSUFFICIENT_FUNDS';
  }
}

export interface FinancialAccountCreateParams {
  /**
   * Body param:
   */
  nickname: string;

  /**
   * Body param:
   */
  type: 'OPERATING';

  /**
   * Body param:
   */
  account_token?: string;

  /**
   * Header param:
   */
  'Idempotency-Key'?: string;
}

export interface FinancialAccountUpdateParams {
  nickname?: string;
}

export interface FinancialAccountListParams {
  /**
   * List financial accounts for a given account_token or business_account_token
   */
  account_token?: string;

  /**
   * List financial accounts for a given business_account_token
   */
  business_account_token?: string;

  /**
   * List financial accounts of a given type
   */
  type?: 'ISSUING' | 'OPERATING' | 'RESERVE';
}

export namespace FinancialAccounts {
  export import FinancialAccount = FinancialAccountsAPI.FinancialAccount;
  export import FinancialTransaction = FinancialAccountsAPI.FinancialTransaction;
  export import FinancialAccountsSinglePage = FinancialAccountsAPI.FinancialAccountsSinglePage;
  export import FinancialAccountCreateParams = FinancialAccountsAPI.FinancialAccountCreateParams;
  export import FinancialAccountUpdateParams = FinancialAccountsAPI.FinancialAccountUpdateParams;
  export import FinancialAccountListParams = FinancialAccountsAPI.FinancialAccountListParams;
  export import Balances = BalancesAPI.Balances;
  export import BalanceListResponse = BalancesAPI.BalanceListResponse;
  export import BalanceListResponsesSinglePage = BalancesAPI.BalanceListResponsesSinglePage;
  export import BalanceListParams = BalancesAPI.BalanceListParams;
  export import FinancialTransactions = FinancialTransactionsAPI.FinancialTransactions;
  export import FinancialTransactionListParams = FinancialTransactionsAPI.FinancialTransactionListParams;
  export import Statements = StatementsAPI.Statements;
  export import Statement = StatementsAPI.Statement;
  export import StatementsCursorPage = StatementsAPI.StatementsCursorPage;
  export import StatementListParams = StatementsAPI.StatementListParams;
}
