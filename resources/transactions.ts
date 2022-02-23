// File generated from our OpenAPI spec by Stainless.
import * as Core from '../core';

export class Transactions extends Core.APIResource {
  /**
   * List specific transaction.
   */
  retrieve(
    id: string,
    options?: Core.RequestOptions
  ): Promise<Core.Response<Transaction>> {
    return this.get(`/transactions/${id}`, options);
  }

  /**
   * List transactions.
   */
  list(
    query?: TransactionListParams | null | undefined,
    options?: Core.RequestOptions
  ): Core.APIListPromise<Transaction> {
    return this.get('/transactions', {query, ...options});
  }

  /**
   * Simulates an authorization request from the payment network as if it came from a merchant acquirer. If you're configured for ASA, simulating auths requires your ASA client to be set up properly (respond with a valid JSON to the ASA request).
   */
  simulateAuthorization(
    body: TransactionSimulateAuthorizationParams,
    options?: Core.RequestOptions
  ): Promise<Core.Response<TransactionsSimulateAuthorizationResponse>> {
    return this.post('/simulate/authorize', {body, ...options});
  }

  /**
   * Clears an existing authorization. After this event, the transaction is no longer pending. If no `amount` is supplied to this endpoint, the amount of the transaction will be captured. Any transaction that has any amount completed at all do not have access to this behavior.
   */
  simulateClearing(
    body: TransactionSimulateClearingParams,
    options?: Core.RequestOptions
  ): Promise<Core.Response<TransactionsSimulateClearingResponse>> {
    return this.post('/simulate/clearing', {body, ...options});
  }

  /**
   * Returns (aka refunds) an amount back to a card. Returns are cleared immediately and do not spend time in a `PENDING` state.
   */
  simulateReturn(
    body: TransactionSimulateReturnParams,
    options?: Core.RequestOptions
  ): Promise<Core.Response<TransactionsSimulateReturnResponse>> {
    return this.post('/simulate/return', {body, ...options});
  }

  /**
   * Voids an existing, uncleared (aka pending) authorization. If amount is not sent the full amount will be voided. Cannot be used on partially completed transactions, but can be used on partially voided transactions.
   */
  simulateVoid(
    body: TransactionSimulateVoidParams,
    options?: Core.RequestOptions
  ): Promise<Core.Response<TransactionsSimulateVoidResponse>> {
    return this.post('/simulate/void', {body, ...options});
  }
}

export interface Transaction {
  /**
   * Authorization amount (in cents) of the transaction. This may change over time, and will represent the settled amount once the transaction is settled.
   */
  amount?: number;

  /**
   * Authorization amount (in cents) of the transaction. This amount always represents the amount authorized for the transaction, unaffected by settlement.
   */
  authorization_amount?: number;

  card?: Transaction.Card;

  /**
   * Date and time when the transaction first occurred. UTC time zone.
   */
  created?: string;

  /**
   * A list of all events that have modified this transaction.
   */
  events?: Array<Transaction.Events>;

  /**
   * A list of objects that describe how this transaction was funded, with the `amount` represented in cents. A reference to the funding account for the `card` that made this transaction may appear here and the `token` will match the `token` for the funding account in the `card` field. If any promotional credit was used in paying for this transaction, its `type` will be `PROMO`.
   */
  funding?: Transaction.Funding;

  merchant?: Transaction.Merchant;

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
   * Amount (in cents) of the transaction that has been settled. This may change over time.
   */
  settled_amount?: number;

  /**
   * Status types: * `BOUNCED` - There was an error settling the transaction against the funding source. Your API account may be disabled. * `DECLINED` - The transaction was declined. * `PENDING` - Authorization is pending completion from the merchant. * `SETTLED` - The transaction is complete. * `SETTLING` - The merchant has completed the transaction and the funding source is being debited. * `VOIDED` - The merchant has voided the previously pending authorization.
   */
  status?:
    | 'BOUNCED'
    | 'DECLINED'
    | 'PENDING'
    | 'SETTLED'
    | 'SETTLING'
    | 'VOIDED';

  /**
   * Globally unique identifier.
   */
  token?: string;
}

export namespace Transaction {
  export interface Card {
    /**
     * An ISO 8601 timestamp for when the card was created. UTC time zone.
     */
    created?: string;

    /**
     * Three digit cvv printed on the back of the card.
     */
    cvv?: string;

    funding?: Card.Funding;

    /**
     * Two digit (MM) expiry month.
     */
    exp_month?: string;

    /**
     * Four digit (yyyy) expiry year.
     */
    exp_year?: string;

    /**
     * Hostname of card’s locked merchant (will be empty if not applicable).
     */
    hostname?: string;

    /**
     * Last four digits of the card number.
     */
    last_four?: string;

    /**
     * Friendly name to identify the card.
     */
    memo?: string;

    /**
     * Primary Account Number (PAN) (i.e. the card number). Customers must be PCI compliant to have PAN returned as a field in production. Please contact [support@lithic.com](mailto:support@lithic.com) for questions.
     */
    pan?: string;

    /**
     * Amount (in cents) to limit approved authorizations. Transaction requests above the spend limit will be declined.
     */
    spend_limit?: number;

    /**
     * Spend limit duration values: * `ANNUALLY` - Card will authorize transactions up to spend limit in a calendar year. * `FOREVER` - Card will authorize only up to spend limit for the entire lifetime of the card. * `MONTHLY` - Card will authorize transactions up to spend limit for the trailing month. Month is calculated as this calendar date one month prior. * `TRANSACTION` - Card will authorizate multiple transactions if each individual transaction is under the spend limit.
     */
    spend_limit_duration?: 'ANNUALLY' | 'FOREVER' | 'MONTHLY' | 'TRANSACTION';

    /**
     * Card state values: * `CLOSED` - Card will no longer approve authorizations. Closing a card cannot be undone. * `OPEN` - Card will approve authorizations (if they match card and account parameters). * `PAUSED` - Card will decline authorizations, but can be resumed at a later time. * `PENDING_FULFILLMENT` - The initial state for cards of type `PHYSICAL`. The card is provisioned pending manufacturing and fulfillment. Cards in this state can accept authorizations for e-commerce purchases, but not for "Card Present" purchases where the physical card itself is present. * `PENDING_ACTIVATION` - Each business day at 2pm Eastern Time Zone (ET), cards of type `PHYSICAL` in state `PENDING_FULFILLMENT` are sent to the card production warehouse and updated to state `PENDING_ACTIVATION` . Similar to `PENDING_FULFILLMENT`, cards in this state can be used for e-commerce transactions. API clients should update the card's state to `OPEN` only after the cardholder confirms receipt of the card. In sandbox, the same daily batch fulfillment occurs, but no cards are actually manufactured.
     */
    state?:
      | 'CLOSED'
      | 'OPEN'
      | 'PAUSED'
      | 'PENDING_ACTIVATION'
      | 'PENDING_FULFILLMENT';

    /**
     * Globally unique identifier.
     */
    token?: string;

    /**
     * Card types: * `DIGITAL_WALLET` - Cards that can be provisioned to a digital wallet like Google Pay or Apple Wallet. * `MERCHANT_LOCKED` - Card is locked to first merchant that successfully authorizes the card. * `PHYSICAL` - Manufactured and sent to the cardholder. We offer white label branding, credit, ATM, PIN debit, chip/EMV, NFC and magstripe functionality. Contact [api@lithic.com](mailto:api@lithic.com) for more information. * `SINGLE_USE` - Card will close shortly after the first transaction. * `UNLOCKED` - Card will authorize at any merchant. Creating these cards requires additional privileges.
     */
    type?:
      | 'DIGITAL_WALLET'
      | 'MERCHANT_LOCKED'
      | 'PHYSICAL'
      | 'SINGLE_USE'
      | 'UNLOCKED';
  }

  export namespace Card {
    export interface Funding {
      /**
       * Account name identifying the funding source. This may be `null`.
       */
      account_name?: string;

      /**
       * An ISO 8601 string representing when this funding source was added to the Lithic account. This may be `null`. UTC time zone.
       */
      created?: string;

      /**
       * The last 4 digits of the account (e.g. bank account, debit card) associated with this FundingAccount. This may be null.
       */
      last_four?: string;

      /**
       * The nickname given to the `FundingAccount` or `null` if it has no nickname.
       */
      nickname?: string;

      /**
       * State of funding source. Funding source states: * `ENABLED` - The funding account is available to use for card creation and transactions. * `PENDING` - The funding account is still being verified e.g. bank micro-deposits verification.
       */
      state?: 'ENABLED' | 'PENDING';

      /**
       * A globally unique identifier for this FundingAccount.
       */
      token?: string;

      /**
       * Types of funding source: * `CARD_DEBIT` - Debit card. * `DEPOSITORY_CHECKING` - Bank checking account. * `DEPOSITORY_SAVINGS` - Bank savings account.
       */
      type?: 'CARD_DEBIT' | 'DEPOSITORY_CHECKING' | 'DEPOSITORY_SAVINGS';
    }
  }

  export interface Events {
    /**
     * Amount (in cents) of the transaction event.
     */
    amount?: number;

    /**
     * ISO 8601 date and time this event entered the system. UTC time zone.
     */
    created?: string;

    /**
     * `APPROVED` or decline reason. Result types: * `ACCOUNT_STATE_TRANSACTION_FAIL` - Contact [support@lithic.com](mailto:support@lithic.com). * `APPROVED` - Transaction is approved. * `BANK_CONNECTION_ERROR` - Please reconnect a funding source. * `BANK_NOT_VERIFIED` - Please confirm the funding source. * `CARD_CLOSED` - Card state was closed at the time of authorization. * `CARD_PAUSED` - Card state was paused at the time of authorization. * `FRAUD_ADVICE` - Transaction declined due to risk. * `GLOBAL_TRANSACTION_LIMIT` - Platform spend limit exceeded, contact [support@lithic.com](mailto:support@lithic.com). * `GLOBAL_WEEKLY_LIMIT` - Platform spend limit exceeded, contact [support@lithic.com](mailto:support@lithic.com). * `GLOBAL_MONTHLY_LIMIT` - Platform spend limit exceeded, contact [support@lithic.com](mailto:support@lithic.com). * `INACTIVE_ACCOUNT` - Account is inactive. Contact [support@lithic.com](mailto:support@lithic.com). * `INCORRECT_PIN` - PIN verification failed. * `INVALID_CARD_DETAILS` - Incorrect CVV or expiry date. * `INSUFFICIENT_FUNDS` - Please ensure the funding source is connected and up to date. * `MERCHANT_BLACKLIST` - This merchant is disallowed on the platform. * `SINGLE_USE_RECHARGED` - Single use card attempted multiple times. * `SWITCH_INOPERATIVE_ADVICE` - Network error, re-attempt the transaction. * `UNAUTHORIZED_MERCHANT` - Merchant locked card attempted at different merchant. * `UNKNOWN_HOST_TIMEOUT` - Network error, re-attempt the transaction. * `USER_TRANSACTION_LIMIT` - User-set spend limit exceeded.
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
     * Globally unique identifier.
     */
    token?: string;

    /**
     * Event types: * `AUTHORIZATION` - Authorize a transaction. * `AUTHORIZATION_ADVICE` - Advice on a transaction. * `CLEARING` - Transaction is settled. * `RETURN` - A return authorization. * `VOID` - Transaction is voided.
     */
    type?:
      | 'AUTHORIZATION'
      | 'AUTHORIZATION_ADVICE'
      | 'CLEARING'
      | 'RETURN'
      | 'VOID';
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
     * Types of funding: * `PROMO` - Any promotional credit was used in paying for this transaction.
     */
    type?: 'PROMO';
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
     * Merchant category code (MCC). A four-digit number listed in ISO 18245. An MCC is used to classify a business by the types of goods or services it provides.
     */
    mcc?: string;

    /**
     * Geographic state of card acceptor (see ISO 8583 specs).
     */
    state?: string;
  }
}

export interface TransactionsSimulateAuthorizationResponse {
  /**
   * Debugging request ID to share with Lithic Support team.
   */
  debugging_request_id?: string;

  /**
   * A unique token to reference this transaction with later calls to void or clear the authorization.
   */
  token?: string;
}

export interface TransactionsSimulateClearingResponse {
  /**
   * Debugging request ID to share with Lithic Support team.
   */
  debugging_request_id?: string;
}

export interface TransactionsSimulateReturnResponse {
  /**
   * Debugging request ID to share with Lithic Support team.
   */
  debugging_request_id?: string;

  /**
   * A unique token to reference this transaction.
   */
  token?: string;
}

export interface TransactionsSimulateVoidResponse {
  /**
   * Debugging request ID to share with Lithic Support team.
   */
  debugging_request_id?: string;
}

export interface TransactionListParams {
  /**
   * Only required for multi-account users. Returns transactions associated with this account. Only applicable if using account enrollment. See [Managing Accounts](https://docs.lithic.com/docs/managing-accounts) for more information.
   */
  account_token?: string;

  /**
   * Filters transactions associated with a specific card.
   */
  card_token?: string;

  /**
   * List specific transactions. Filters include `APPROVED`, and `DECLINED`.
   */
  result?: 'APPROVED' | 'DECLINED';

  /**
   * Date string in 8601 format. Only entries created after the specified date will be included. UTC time zone.
   */
  begin?: string;

  /**
   * Date string in 8601 format. Only entries created before the specified date will be included. UTC time zone.
   */
  end?: string;

  /**
   * Page (for pagination).
   */
  page?: number;

  /**
   * Page size (for pagination).
   */
  page_size?: number;
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
   * Type of event to simulate.
   */
  event_type?: 'AUTHORIZATION' | 'FINANCIAL_CREDIT_AUTHORIZATION';
}

export interface TransactionSimulateClearingParams {
  /**
   * Amount (in cents) to complete. Typically this will match the original authorization, but may be more or less. If no amount is supplied to this endpoint, the amount of the transaction will be captured. Any transaction that has any amount completed at all do not have access to this behavior.
   */
  amount?: number;

  /**
   * The transaction token returned from the /v1/simulate/authorize response.
   */
  token: string;
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
   * Amount (in cents) to void. Typically this will match the original authorization, but may be less.
   */
  amount?: number;

  /**
   * The transaction token returned from the /v1/simulate/authorize response.
   */
  token: string;
}
