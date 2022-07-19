// File generated from our OpenAPI spec by Stainless.

import * as Core from '~/core';
import { isRequestOptions } from '~/core';
import { Page, PageParams } from '~/pagination';
import * as Shared from './shared';
import * as Cards from './cards';

export class Transactions extends Core.APIResource {
  /**
   * Get specific transaction.
   */
  retrieve(id: string, options?: Core.RequestOptions): Promise<Core.APIResponse<Transaction>> {
    return this.get(`/transactions/${id}`, options);
  }

  /**
   * List transactions.
   */
  list(query?: TransactionListParams, options?: Core.RequestOptions): Core.PagePromise<TransactionsPage>;
  list(options?: Core.RequestOptions): Core.PagePromise<TransactionsPage>;
  list(
    query: TransactionListParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.PagePromise<TransactionsPage> {
    if (isRequestOptions(query)) {
      return this.list({}, query);
    }

    return this.getAPIList('/transactions', TransactionsPage, { query, ...options });
  }

  /**
   * Simulates an authorization request from the payment network as if it came from a
   * merchant acquirer. If you're configured for ASA, simulating auths requires your
   * ASA client to be set up properly (respond with a valid JSON to the ASA request).
   */
  simulateAuthorization(
    body: TransactionSimulateAuthorizationParams,
    options?: Core.RequestOptions,
  ): Promise<Core.APIResponse<TransactionSimulateAuthorizationResponse>> {
    return this.post('/simulate/authorize', { body, ...options });
  }

  /**
   * Clears an existing authorization. After this event, the transaction is no longer
   * pending.
   *
   * If no `amount` is supplied to this endpoint, the amount of the transaction will
   * be captured. Any transaction that has any amount completed at all do not have
   * access to this behavior.
   */
  simulateClearing(
    body: TransactionSimulateClearingParams,
    options?: Core.RequestOptions,
  ): Promise<Core.APIResponse<TransactionSimulateClearingResponse>> {
    return this.post('/simulate/clearing', { body, ...options });
  }

  /**
   * Returns (aka refunds) an amount back to a card. Returns are cleared immediately
   * and do not spend time in a `PENDING` state.
   */
  simulateReturn(
    body: TransactionSimulateReturnParams,
    options?: Core.RequestOptions,
  ): Promise<Core.APIResponse<TransactionSimulateReturnResponse>> {
    return this.post('/simulate/return', { body, ...options });
  }

  /**
   * Voids an existing, uncleared (aka pending) authorization. If amount is not sent
   * the full amount will be voided. Cannot be used on partially completed
   * transactions, but can be used on partially voided transactions.
   */
  simulateVoid(
    body: TransactionSimulateVoidParams,
    options?: Core.RequestOptions,
  ): Promise<Core.APIResponse<TransactionSimulateVoidResponse>> {
    return this.post('/simulate/void', { body, ...options });
  }
}

export class TransactionsPage extends Page<Transaction> {}

export interface Transaction {
  /**
   * Authorization amount (in USD cents) of the transaction. This may change over
   * time, and will represent the settled amount once the transaction is settled.
   */
  amount?: number;

  /**
   * Authorization amount (in USD cents) of the transaction. This amount always
   * represents the amount authorized for the transaction, unaffected by settlement.
   */
  authorization_amount?: number;

  /**
   * A fixed-width 6-digit numeric identifier that can be used to identify a
   * transaction with networks.
   */
  authorization_code?: string;

  card?: Cards.Card;

  /**
   * Date and time when the transaction first occurred. UTC time zone.
   */
  created?: string;

  /**
   * A list of all events that have modified this transaction.
   */
  events?: Array<Transaction.Events>;

  /**
   * A list of objects that describe how this transaction was funded, with the
   * `amount` represented in cents. A reference to the funding account for the `card`
   * that made this transaction may appear here and the `token` will match the
   * `token` for the funding account in the `card` field. If any promotional credit
   * was used in paying for this transaction, its `type` will be `PROMO`.
   */
  funding?: Array<Transaction.Funding>;

  merchant?: Transaction.Merchant;

  /**
   * Analogous to the "amount" property, but represents the amount in the local
   * currency at the time of the transaction.
   */
  merchant_amount?: number;

  /**
   * Analogous to the "authorization_amount" property, but represents the amount in
   * the local currency at the time of the transaction.
   */
  merchant_authorization_amount?: number;

  /**
   * 3-digit alphabetic ISO 4217 code for the local currency of the transaction.
   */
  merchant_currency?: string;

  /**
   * Card network of the authorization. Can be `INTERLINK`, `MAESTRO`, `MASTERCARD`,
   * `VISA`, or `UNKNOWN`. Value is `UNKNOWN` when Lithic cannot determine the
   * network code from the upstream provider.
   */
  network?: 'INTERLINK' | 'MAESTRO' | 'MASTERCARD' | 'VISA' | 'UNKNOWN' | null;

  /**
   * `APPROVED` or decline reason. See Event result types
   */
  result?:
    | 'ACCOUNT_STATE_TRANSACTION'
    | 'APPROVED'
    | 'BANK_CONNECTION_ERROR'
    | 'BANK_NOT_VERIFIED'
    | 'CARD_CLOSED'
    | 'CARD_PAUSED'
    | 'FRAUD_ADVICE'
    | 'GLOBAL_TRANSACTION_LIMIT'
    | 'GLOBAL_WEEKLY_LIMIT'
    | 'GLOBAL_MONTHLY_LIMIT'
    | 'INACTIVE_ACCOUNT'
    | 'INCORRECT_PIN'
    | 'INVALID_CARD_DETAILS'
    | 'INSUFFICIENT_FUNDS'
    | 'MERCHANT_BLACKLIST'
    | 'SINGLE_USE_RECHARGED'
    | 'SWITCH_INOPERATIVE_ADVICE'
    | 'UNAUTHORIZED_MERCHANT'
    | 'UNKNOWN_HOST_TIMEOUT'
    | 'USER_TRANSACTION_LIMIT';

  /**
   * Amount (in cents) of the transaction that has been settled. This may change over
   * time.
   */
  settled_amount?: number;

  /**
   * Status types:
   *
   * - `BOUNCED` - There was an error settling the transaction against the funding
   *   source. Your API account may be disabled.
   * - `DECLINED` - The transaction was declined.
   * - `PENDING` - Authorization is pending completion from the merchant.
   * - `SETTLED` - The transaction is complete.
   * - `SETTLING` - The merchant has completed the transaction and the funding source
   *   is being debited.
   * - `VOIDED` - The merchant has voided the previously pending authorization.
   */
  status?: 'BOUNCED' | 'DECLINED' | 'PENDING' | 'SETTLED' | 'SETTLING' | 'VOIDED';

  /**
   * Globally unique identifier.
   */
  token?: string;
}

export namespace Transaction {
  export interface Events {
    /**
     * Amount (in cents) of the transaction event.
     */
    amount: number;

    /**
     * ISO 8601 date and time this event entered the system. UTC time zone.
     */
    created: string;

    /**
     * `APPROVED` or decline reason.
     *
     * Result types:
     *
     * - `ACCOUNT_STATE_TRANSACTION_FAIL` - Contact
     *   [support@lithic.com](mailto:support@lithic.com).
     * - `APPROVED` - Transaction is approved.
     * - `BANK_CONNECTION_ERROR` - Please reconnect a funding source.
     * - `BANK_NOT_VERIFIED` - Please confirm the funding source.
     * - `CARD_CLOSED` - Card state was closed at the time of authorization.
     * - `CARD_PAUSED` - Card state was paused at the time of authorization.
     * - `FRAUD_ADVICE` - Transaction declined due to risk.
     * - `GLOBAL_TRANSACTION_LIMIT` - Platform spend limit exceeded, contact
     *   [support@lithic.com](mailto:support@lithic.com).
     * - `GLOBAL_WEEKLY_LIMIT` - Platform spend limit exceeded, contact
     *   [support@lithic.com](mailto:support@lithic.com).
     * - `GLOBAL_MONTHLY_LIMIT` - Platform spend limit exceeded, contact
     *   [support@lithic.com](mailto:support@lithic.com).
     * - `INACTIVE_ACCOUNT` - Account is inactive. Contact
     *   [support@lithic.com](mailto:support@lithic.com).
     * - `INCORRECT_PIN` - PIN verification failed.
     * - `INVALID_CARD_DETAILS` - Incorrect CVV or expiry date.
     * - `INSUFFICIENT_FUNDS` - Please ensure the funding source is connected and up to
     *   date.
     * - `MERCHANT_BLACKLIST` - This merchant is disallowed on the platform.
     * - `SINGLE_USE_RECHARGED` - Single use card attempted multiple times.
     * - `SWITCH_INOPERATIVE_ADVICE` - Network error, re-attempt the transaction.
     * - `UNAUTHORIZED_MERCHANT` - Merchant locked card attempted at different
     *   merchant.
     * - `UNKNOWN_HOST_TIMEOUT` - Network error, re-attempt the transaction.
     * - `USER_TRANSACTION_LIMIT` - User-set spend limit exceeded.
     */
    result:
      | 'ACCOUNT_STATE_TRANSACTION'
      | 'APPROVED'
      | 'BANK_CONNECTION_ERROR'
      | 'BANK_NOT_VERIFIED'
      | 'CARD_CLOSED'
      | 'CARD_PAUSED'
      | 'FRAUD_ADVICE'
      | 'GLOBAL_TRANSACTION_LIMIT'
      | 'GLOBAL_WEEKLY_LIMIT'
      | 'GLOBAL_MONTHLY_LIMIT'
      | 'INACTIVE_ACCOUNT'
      | 'INCORRECT_PIN'
      | 'INVALID_CARD_DETAILS'
      | 'INSUFFICIENT_FUNDS'
      | 'MERCHANT_BLACKLIST'
      | 'SINGLE_USE_RECHARGED'
      | 'SWITCH_INOPERATIVE_ADVICE'
      | 'UNAUTHORIZED_MERCHANT'
      | 'UNKNOWN_HOST_TIMEOUT'
      | 'USER_TRANSACTION_LIMIT';

    /**
     * Globally unique identifier.
     */
    token: string;

    /**
     * Event types:
     *
     * - `AUTHORIZATION` - Authorize a transaction.
     * - `AUTHORIZATION_ADVICE` - Advice on a transaction.
     * - `CLEARING` - Transaction is settled.
     * - `RETURN` - A return authorization.
     * - `VOID` - Transaction is voided.
     * - `CORRECTION_DEBIT` - Manual transaction correction (Debit).
     * - `CORRECTION_CREDIT` - Manual transaction correction (Credit).
     */
    type:
      | 'AUTHORIZATION'
      | 'AUTHORIZATION_ADVICE'
      | 'CLEARING'
      | 'RETURN'
      | 'VOID'
      | 'CORRECTION_DEBIT'
      | 'CORRECTION_CREDIT';
  }

  export interface Funding {
    /**
     * Funding amount (in cents).
     */
    amount?: number;

    /**
     * Funding account token.
     */
    token?: string;

    /**
     * Types of funding:
     *
     * - `DEPOSITORY_CHECKING` - Bank checking account.
     * - `DEPOSITORY_SAVINGS` - Bank savings account.
     * - `PROMO` - Any promotional credit was used in paying for this transaction.
     */
    type?: 'DEPOSITORY_CHECKING' | 'DEPOSITORY_SAVINGS' | 'PROMO';
  }

  export interface Merchant {
    /**
     * Unique identifier to identify the payment card acceptor.
     */
    acceptor_id?: string;

    /**
     * City of card acceptor.
     */
    city?: string;

    /**
     * Uppercase country of card acceptor (see ISO 8583 specs).
     */
    country?: string;

    /**
     * Short description of card acceptor.
     */
    descriptor?: string;

    /**
     * Merchant category code (MCC). A four-digit number listed in ISO 18245. An MCC is
     * used to classify a business by the types of goods or services it provides.
     */
    mcc?: string;

    /**
     * Geographic state of card acceptor (see ISO 8583 specs).
     */
    state?: string;
  }
}

export interface TransactionSimulateAuthorizationResponse {
  /**
   * Debugging request ID to share with Lithic Support team.
   */
  debugging_request_id?: string;

  /**
   * A unique token to reference this transaction with later calls to void or clear
   * the authorization.
   */
  token?: string;
}

export interface TransactionSimulateClearingResponse {
  /**
   * Debugging request ID to share with Lithic Support team.
   */
  debugging_request_id?: string;
}

export interface TransactionSimulateReturnResponse {
  /**
   * Debugging request ID to share with Lithic Support team.
   */
  debugging_request_id?: string;

  /**
   * A unique token to reference this transaction.
   */
  token?: string;
}

export interface TransactionSimulateVoidResponse {
  /**
   * Debugging request ID to share with Lithic Support team.
   */
  debugging_request_id?: string;
}

export interface TransactionListParams extends PageParams {
  /**
   * Only required for multi-account users. Returns transactions associated with this
   * account. Only applicable if using account enrollment. See
   * [Managing Accounts](https://docs.lithic.com/docs/managing-accounts) for more
   * information.
   */
  account_token?: string;

  /**
   * Date string in 8601 format. Only entries created after the specified date will
   * be included. UTC time zone.
   */
  begin?: string;

  /**
   * Filters transactions associated with a specific card.
   */
  card_token?: string;

  /**
   * Date string in 8601 format. Only entries created before the specified date will
   * be included. UTC time zone.
   */
  end?: string;

  /**
   * List specific transactions. Filters include `APPROVED`, and `DECLINED`.
   */
  result?: 'APPROVED' | 'DECLINED';
}

export interface TransactionSimulateAuthorizationParams {
  /**
   * Amount (in cents) to authorize.
   */
  amount: number;

  /**
   * Merchant descriptor.
   */
  descriptor: string;

  /**
   * Sixteen digit card number.
   */
  pan: string;

  /**
   * Amount of the transaction to be simlated in currency specified in
   * merchant_currency.
   */
  merchant_amount?: number;

  /**
   * 3-digit alphabetic ISO 4217 currency code.
   */
  merchant_currency?: string;

  /**
   * Type of event to simulate.
   *
   * - `CREDIT` indicates funds flow towards the user rather than towards the
   *   merchant.
   * - `FINANCIAL` indicates that this is a single message transaction that completes
   *   immediately if approved.
   */
  status?:
    | 'AUTHORIZATION'
    | 'CREDIT_AUTHORIZATION'
    | 'FINANCIAL_AUTHORIZATION'
    | 'FINANCIAL_CREDIT_AUTHORIZATION';
}

export interface TransactionSimulateClearingParams {
  /**
   * The transaction token returned from the /v1/simulate/authorize response.
   */
  token: string;

  /**
   * Amount (in cents) to complete. Typically this will match the original
   * authorization, but may be more or less.
   *
   * If no amount is supplied to this endpoint, the amount of the transaction will be
   * captured. Any transaction that has any amount completed at all do not have
   * access to this behavior.
   */
  amount?: number;
}

export interface TransactionSimulateReturnParams {
  /**
   * Amount (in cents) to authorize.
   */
  amount: number;

  /**
   * Merchant descriptor.
   */
  descriptor: string;

  /**
   * Sixteen digit card number.
   */
  pan: string;
}

export interface TransactionSimulateVoidParams {
  /**
   * The transaction token returned from the /v1/simulate/authorize response.
   */
  token: string;

  /**
   * Amount (in cents) to void. Typically this will match the original authorization,
   * but may be less.
   */
  amount?: number;
}
