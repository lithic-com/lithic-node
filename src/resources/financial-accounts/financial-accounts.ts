// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../resource';
import { isRequestOptions } from '../../core';
import * as Core from '../../core';
import * as BalancesAPI from './balances';
import { BalanceListParams, BalanceListResponse, BalanceListResponsesSinglePage, Balances } from './balances';
import * as CreditConfigurationAPI from './credit-configuration';
import {
  CreditConfiguration as CreditConfigurationAPICreditConfiguration,
  CreditConfigurationUpdateParams,
  FinancialAccountCreditConfig,
} from './credit-configuration';
import * as FinancialTransactionsAPI from './financial-transactions';
import { FinancialTransactionListParams, FinancialTransactions } from './financial-transactions';
import * as LoanTapesAPI from './loan-tapes';
import { LoanTape, LoanTapeListParams, LoanTapes, LoanTapesCursorPage } from './loan-tapes';
import * as StatementsAPI from './statements/statements';
import { Statement, StatementListParams, Statements, StatementsCursorPage } from './statements/statements';
import { SinglePage } from '../../pagination';

export class FinancialAccounts extends APIResource {
  balances: BalancesAPI.Balances = new BalancesAPI.Balances(this._client);
  financialTransactions: FinancialTransactionsAPI.FinancialTransactions =
    new FinancialTransactionsAPI.FinancialTransactions(this._client);
  creditConfiguration: CreditConfigurationAPI.CreditConfiguration =
    new CreditConfigurationAPI.CreditConfiguration(this._client);
  statements: StatementsAPI.Statements = new StatementsAPI.Statements(this._client);
  loanTapes: LoanTapesAPI.LoanTapes = new LoanTapesAPI.LoanTapes(this._client);

  /**
   * Create a new financial account
   */
  create(
    params: FinancialAccountCreateParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<FinancialAccount> {
    const { 'Idempotency-Key': idempotencyKey, ...body } = params;
    return this._client.post('/v1/financial_accounts', {
      body,
      ...options,
      headers: {
        ...(idempotencyKey != null ? { 'Idempotency-Key': idempotencyKey } : undefined),
        ...options?.headers,
      },
    });
  }

  /**
   * Get a financial account
   */
  retrieve(financialAccountToken: string, options?: Core.RequestOptions): Core.APIPromise<FinancialAccount> {
    return this._client.get(`/v1/financial_accounts/${financialAccountToken}`, options);
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
    return this._client.patch(`/v1/financial_accounts/${financialAccountToken}`, { body, ...options });
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
    return this._client.getAPIList('/v1/financial_accounts', FinancialAccountsSinglePage, {
      query,
      ...options,
    });
  }

  /**
   * Update issuing account state to charged off
   */
  chargeOff(
    financialAccountToken: string,
    body: FinancialAccountChargeOffParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<CreditConfigurationAPI.FinancialAccountCreditConfig> {
    return this._client.patch(`/v1/financial_accounts/${financialAccountToken}/charge_off`, {
      body,
      ...options,
    });
  }
}

export class FinancialAccountsSinglePage extends SinglePage<FinancialAccount> {}

export class FinancialTransactionsSinglePage extends SinglePage<FinancialTransaction> {}

export interface FinancialAccount {
  /**
   * Globally unique identifier for the account
   */
  token: string;

  account_token: string | null;

  created: string;

  credit_configuration: FinancialAccount.CreditConfiguration | null;

  /**
   * Whether financial account is for the benefit of another entity
   */
  is_for_benefit_of: boolean;

  nickname: string | null;

  type: 'ISSUING' | 'RESERVE' | 'OPERATING';

  updated: string;

  account_number?: string | null;

  routing_number?: string | null;
}

export namespace FinancialAccount {
  export interface CreditConfiguration {
    /**
     * Reason for the financial account being marked as Charged Off
     */
    charged_off_reason: 'DELINQUENT' | 'FRAUD' | null;

    credit_limit: number | null;

    /**
     * Globally unique identifier for the credit product
     */
    credit_product_token: string | null;

    external_bank_account_token: string | null;

    /**
     * State of the financial account
     */
    financial_account_state: 'PENDING' | 'CURRENT' | 'DELINQUENT' | 'CHARGED_OFF' | null;

    is_spend_blocked: boolean;

    /**
     * Tier assigned to the financial account
     */
    tier: string | null;
  }
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
   * - `DECLINED` - The transaction was declined.
   * - `EXPIRED` - The authorization as it has passed its expiration time. Card
   *   transaction only.
   * - `PENDING` - The transaction is expected to settle.
   * - `RETURNED` - The transaction has been returned.
   * - `SETTLED` - The transaction is completed.
   * - `VOIDED` - The transaction was voided. Card transaction only.
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

    type?:
      | 'ACH_ORIGINATION_CANCELLED'
      | 'ACH_ORIGINATION_INITIATED'
      | 'ACH_ORIGINATION_PROCESSED'
      | 'ACH_ORIGINATION_RELEASED'
      | 'ACH_ORIGINATION_REVIEWED'
      | 'ACH_ORIGINATION_SETTLED'
      | 'ACH_RECEIPT_PROCESSED'
      | 'ACH_RECEIPT_SETTLED'
      | 'ACH_RETURN_INITIATED'
      | 'ACH_RETURN_PROCESSED'
      | 'AUTHORIZATION'
      | 'AUTHORIZATION_ADVICE'
      | 'AUTHORIZATION_EXPIRY'
      | 'AUTHORIZATION_REVERSAL'
      | 'BALANCE_INQUIRY'
      | 'BILLING_ERROR'
      | 'BILLING_ERROR_REVERSAL'
      | 'CASH_BACK'
      | 'CASH_BACK_REVERSAL'
      | 'CLEARING'
      | 'CORRECTION_CREDIT'
      | 'CORRECTION_DEBIT'
      | 'CREDIT_AUTHORIZATION'
      | 'CREDIT_AUTHORIZATION_ADVICE'
      | 'CURRENCY_CONVERSION'
      | 'CURRENCY_CONVERSION_REVERSAL'
      | 'DISPUTE_WON'
      | 'EXTERNAL_ACH_CANCELED'
      | 'EXTERNAL_ACH_INITIATED'
      | 'EXTERNAL_ACH_RELEASED'
      | 'EXTERNAL_ACH_REVERSED'
      | 'EXTERNAL_ACH_SETTLED'
      | 'EXTERNAL_CHECK_CANCELED'
      | 'EXTERNAL_CHECK_INITIATED'
      | 'EXTERNAL_CHECK_RELEASED'
      | 'EXTERNAL_CHECK_REVERSED'
      | 'EXTERNAL_CHECK_SETTLED'
      | 'EXTERNAL_TRANSFER_CANCELED'
      | 'EXTERNAL_TRANSFER_INITIATED'
      | 'EXTERNAL_TRANSFER_RELEASED'
      | 'EXTERNAL_TRANSFER_REVERSED'
      | 'EXTERNAL_TRANSFER_SETTLED'
      | 'EXTERNAL_WIRE_CANCELED'
      | 'EXTERNAL_WIRE_INITIATED'
      | 'EXTERNAL_WIRE_RELEASED'
      | 'EXTERNAL_WIRE_REVERSED'
      | 'EXTERNAL_WIRE_SETTLED'
      | 'FINANCIAL_AUTHORIZATION'
      | 'FINANCIAL_CREDIT_AUTHORIZATION'
      | 'INTEREST'
      | 'INTEREST_REVERSAL'
      | 'LATE_PAYMENT'
      | 'LATE_PAYMENT_REVERSAL'
      | 'PROVISIONAL_CREDIT'
      | 'PROVISIONAL_CREDIT_REVERSAL'
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
   * Body param:
   */
  is_for_benefit_of?: boolean;

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

export interface FinancialAccountChargeOffParams {
  /**
   * Reason for the financial account being marked as Charged Off
   */
  reason: 'DELINQUENT' | 'FRAUD';
}

FinancialAccounts.FinancialAccountsSinglePage = FinancialAccountsSinglePage;
FinancialAccounts.Balances = Balances;
FinancialAccounts.BalanceListResponsesSinglePage = BalanceListResponsesSinglePage;
FinancialAccounts.FinancialTransactions = FinancialTransactions;
FinancialAccounts.CreditConfiguration = CreditConfigurationAPICreditConfiguration;
FinancialAccounts.StatementsCursorPage = StatementsCursorPage;
FinancialAccounts.LoanTapes = LoanTapes;
FinancialAccounts.LoanTapesCursorPage = LoanTapesCursorPage;

export declare namespace FinancialAccounts {
  export {
    type FinancialAccount as FinancialAccount,
    type FinancialTransaction as FinancialTransaction,
    FinancialAccountsSinglePage as FinancialAccountsSinglePage,
    type FinancialAccountCreateParams as FinancialAccountCreateParams,
    type FinancialAccountUpdateParams as FinancialAccountUpdateParams,
    type FinancialAccountListParams as FinancialAccountListParams,
    type FinancialAccountChargeOffParams as FinancialAccountChargeOffParams,
  };

  export {
    Balances as Balances,
    type BalanceListResponse as BalanceListResponse,
    BalanceListResponsesSinglePage as BalanceListResponsesSinglePage,
    type BalanceListParams as BalanceListParams,
  };

  export {
    FinancialTransactions as FinancialTransactions,
    type FinancialTransactionListParams as FinancialTransactionListParams,
  };

  export {
    CreditConfigurationAPICreditConfiguration as CreditConfiguration,
    type FinancialAccountCreditConfig as FinancialAccountCreditConfig,
    type CreditConfigurationUpdateParams as CreditConfigurationUpdateParams,
  };

  export {
    type Statements as Statements,
    type Statement as Statement,
    StatementsCursorPage as StatementsCursorPage,
    type StatementListParams as StatementListParams,
  };

  export {
    LoanTapes as LoanTapes,
    type LoanTape as LoanTape,
    LoanTapesCursorPage as LoanTapesCursorPage,
    type LoanTapeListParams as LoanTapeListParams,
  };
}
