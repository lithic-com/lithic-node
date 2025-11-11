// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as Shared from '../shared';
import * as EnhancedCommercialDataAPI from './enhanced-commercial-data';
import { EnhancedCommercialData, EnhancedCommercialDataRetrieveResponse } from './enhanced-commercial-data';
import * as EventsAPI from './events/events';
import { Events } from './events/events';
import { APIPromise } from '../../core/api-promise';
import { CursorPage, type CursorPageParams, PagePromise } from '../../core/pagination';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Transactions extends APIResource {
  enhancedCommercialData: EnhancedCommercialDataAPI.EnhancedCommercialData =
    new EnhancedCommercialDataAPI.EnhancedCommercialData(this._client);
  events: EventsAPI.Events = new EventsAPI.Events(this._client);

  /**
   * Get a specific card transaction. All amounts are in the smallest unit of their
   * respective currency (e.g., cents for USD).
   *
   * @example
   * ```ts
   * const transaction = await client.transactions.retrieve(
   *   '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   * );
   * ```
   */
  retrieve(transactionToken: string, options?: RequestOptions): APIPromise<Transaction> {
    return this._client.get(path`/v1/transactions/${transactionToken}`, options);
  }

  /**
   * List card transactions. All amounts are in the smallest unit of their respective
   * currency (e.g., cents for USD) and inclusive of any acquirer fees.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const transaction of client.transactions.list()) {
   *   // ...
   * }
   * ```
   */
  list(
    query: TransactionListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<TransactionsCursorPage, Transaction> {
    return this._client.getAPIList('/v1/transactions', CursorPage<Transaction>, { query, ...options });
  }

  /**
   * Expire authorization
   *
   * @example
   * ```ts
   * await client.transactions.expireAuthorization(
   *   '00000000-0000-0000-0000-000000000000',
   * );
   * ```
   */
  expireAuthorization(transactionToken: string, options?: RequestOptions): APIPromise<void> {
    return this._client.post(path`/v1/transactions/${transactionToken}/expire_authorization`, options);
  }

  /**
   * Simulates an authorization request from the card network as if it came from a
   * merchant acquirer. If you are configured for ASA, simulating authorizations
   * requires your ASA client to be set up properly, i.e. be able to respond to the
   * ASA request with a valid JSON. For users that are not configured for ASA, a
   * daily transaction limit of $5000 USD is applied by default. You can update this
   * limit via the
   * [update account](https://docs.lithic.com/reference/patchaccountbytoken)
   * endpoint.
   *
   * @example
   * ```ts
   * const response =
   *   await client.transactions.simulateAuthorization({
   *     amount: 3831,
   *     descriptor: 'COFFEE SHOP',
   *     pan: '4111111289144142',
   *   });
   * ```
   */
  simulateAuthorization(
    body: TransactionSimulateAuthorizationParams,
    options?: RequestOptions,
  ): APIPromise<TransactionSimulateAuthorizationResponse> {
    return this._client.post('/v1/simulate/authorize', { body, ...options });
  }

  /**
   * Simulates an authorization advice from the card network as if it came from a
   * merchant acquirer. An authorization advice changes the pending amount of the
   * transaction.
   *
   * @example
   * ```ts
   * const response =
   *   await client.transactions.simulateAuthorizationAdvice({
   *     token: 'fabd829d-7f7b-4432-a8f2-07ea4889aaac',
   *     amount: 3831,
   *   });
   * ```
   */
  simulateAuthorizationAdvice(
    body: TransactionSimulateAuthorizationAdviceParams,
    options?: RequestOptions,
  ): APIPromise<TransactionSimulateAuthorizationAdviceResponse> {
    return this._client.post('/v1/simulate/authorization_advice', { body, ...options });
  }

  /**
   * Clears an existing authorization, either debit or credit. After this event, the
   * transaction transitions from `PENDING` to `SETTLED` status.
   *
   * If `amount` is not set, the full amount of the transaction will be cleared.
   * Transactions that have already cleared, either partially or fully, cannot be
   * cleared again using this endpoint.
   *
   * @example
   * ```ts
   * const response = await client.transactions.simulateClearing(
   *   { token: 'fabd829d-7f7b-4432-a8f2-07ea4889aaac' },
   * );
   * ```
   */
  simulateClearing(
    body: TransactionSimulateClearingParams,
    options?: RequestOptions,
  ): APIPromise<TransactionSimulateClearingResponse> {
    return this._client.post('/v1/simulate/clearing', { body, ...options });
  }

  /**
   * Simulates a credit authorization advice from the card network. This message
   * indicates that the network approved a credit authorization on your behalf.
   *
   * @deprecated use `simulateCreditAuthorizationAdvice` instead
   */
  simulateCreditAuthorization(
    body: TransactionSimulateCreditAuthorizationParams,
    options?: RequestOptions,
  ): APIPromise<TransactionSimulateCreditAuthorizationResponse> {
    return this._client.post('/v1/simulate/credit_authorization_advice', { body, ...options });
  }

  /**
   * Simulates a credit authorization advice from the card network. This message
   * indicates that the network approved a credit authorization on your behalf.
   *
   * @example
   * ```ts
   * const response =
   *   await client.transactions.simulateCreditAuthorizationAdvice(
   *     {
   *       amount: 3831,
   *       descriptor: 'COFFEE SHOP',
   *       pan: '4111111289144142',
   *       merchant_acceptor_id: 'XRKGDPOWEWQRRWU',
   *     },
   *   );
   * ```
   */
  simulateCreditAuthorizationAdvice(
    body: TransactionSimulateCreditAuthorizationAdviceParams,
    options?: RequestOptions,
  ): APIPromise<TransactionSimulateCreditAuthorizationAdviceResponse> {
    return this._client.post('/v1/simulate/credit_authorization_advice', { body, ...options });
  }

  /**
   * Returns, or refunds, an amount back to a card. Returns simulated via this
   * endpoint clear immediately, without prior authorization, and result in a
   * `SETTLED` transaction status.
   *
   * @example
   * ```ts
   * const response = await client.transactions.simulateReturn({
   *   amount: 3831,
   *   descriptor: 'COFFEE SHOP',
   *   pan: '4111111289144142',
   * });
   * ```
   */
  simulateReturn(
    body: TransactionSimulateReturnParams,
    options?: RequestOptions,
  ): APIPromise<TransactionSimulateReturnResponse> {
    return this._client.post('/v1/simulate/return', { body, ...options });
  }

  /**
   * Reverses a return, i.e. a credit transaction with a `SETTLED` status. Returns
   * can be financial credit authorizations, or credit authorizations that have
   * cleared.
   *
   * @example
   * ```ts
   * const response =
   *   await client.transactions.simulateReturnReversal({
   *     token: 'fabd829d-7f7b-4432-a8f2-07ea4889aaac',
   *   });
   * ```
   */
  simulateReturnReversal(
    body: TransactionSimulateReturnReversalParams,
    options?: RequestOptions,
  ): APIPromise<TransactionSimulateReturnReversalResponse> {
    return this._client.post('/v1/simulate/return_reversal', { body, ...options });
  }

  /**
   * Voids a pending authorization. If `amount` is not set, the full amount will be
   * voided. Can be used on partially voided transactions but not partially cleared
   * transactions. _Simulating an authorization expiry on credit authorizations or
   * credit authorization advice is not currently supported but will be added soon._
   *
   * @example
   * ```ts
   * const response = await client.transactions.simulateVoid({
   *   token: 'fabd829d-7f7b-4432-a8f2-07ea4889aaac',
   *   amount: 100,
   *   type: 'AUTHORIZATION_EXPIRY',
   * });
   * ```
   */
  simulateVoid(
    body: TransactionSimulateVoidParams,
    options?: RequestOptions,
  ): APIPromise<TransactionSimulateVoidResponse> {
    return this._client.post('/v1/simulate/void', { body, ...options });
  }
}

export type TransactionsCursorPage = CursorPage<Transaction>;

export interface Transaction {
  /**
   * Globally unique identifier.
   */
  token: string;

  /**
   * The token for the account associated with this transaction.
   */
  account_token: string;

  /**
   * Fee assessed by the merchant and paid for by the cardholder in the smallest unit
   * of the currency. Will be zero if no fee is assessed. Rebates may be transmitted
   * as a negative value to indicate credited fees.
   */
  acquirer_fee: number | null;

  /**
   * @deprecated Unique identifier assigned to a transaction by the acquirer that can
   * be used in dispute and chargeback filing. This field has been deprecated in
   * favor of the `acquirer_reference_number` that resides in the event-level
   * `network_info`.
   */
  acquirer_reference_number: string | null;

  /**
   * @deprecated When the transaction is pending, this represents the authorization
   * amount of the transaction in the anticipated settlement currency. Once the
   * transaction has settled, this field represents the settled amount in the
   * settlement currency.
   */
  amount: number;

  amounts: Transaction.Amounts;

  /**
   * @deprecated The authorization amount of the transaction in the anticipated
   * settlement currency.
   */
  authorization_amount: number | null;

  /**
   * A fixed-width 6-digit numeric identifier that can be used to identify a
   * transaction with networks.
   */
  authorization_code: string | null;

  avs: Transaction.Avs | null;

  /**
   * Token for the card used in this transaction.
   */
  card_token: string;

  cardholder_authentication: Transaction.CardholderAuthentication | null;

  /**
   * Date and time when the transaction first occurred. UTC time zone.
   */
  created: string;

  financial_account_token: string | null;

  merchant: Transaction.Merchant;

  /**
   * @deprecated Analogous to the 'amount', but in the merchant currency.
   */
  merchant_amount: number | null;

  /**
   * @deprecated Analogous to the 'authorization_amount', but in the merchant
   * currency.
   */
  merchant_authorization_amount: number | null;

  /**
   * @deprecated 3-character alphabetic ISO 4217 code for the local currency of the
   * transaction.
   */
  merchant_currency: string;

  /**
   * Card network of the authorization. Value is `UNKNOWN` when Lithic cannot
   * determine the network code from the upstream provider.
   */
  network: 'AMEX' | 'INTERLINK' | 'MAESTRO' | 'MASTERCARD' | 'UNKNOWN' | 'VISA' | null;

  /**
   * Network-provided score assessing risk level associated with a given
   * authorization. Scores are on a range of 0-999, with 0 representing the lowest
   * risk and 999 representing the highest risk. For Visa transactions, where the raw
   * score has a range of 0-99, Lithic will normalize the score by multiplying the
   * raw score by 10x.
   */
  network_risk_score: number | null;

  pos: Transaction.Pos;

  result:
    | 'ACCOUNT_PAUSED'
    | 'ACCOUNT_STATE_TRANSACTION_FAIL'
    | 'APPROVED'
    | 'BANK_CONNECTION_ERROR'
    | 'BANK_NOT_VERIFIED'
    | 'CARD_CLOSED'
    | 'CARD_PAUSED'
    | 'DECLINED'
    | 'FRAUD_ADVICE'
    | 'IGNORED_TTL_EXPIRY'
    | 'SUSPECTED_FRAUD'
    | 'INACTIVE_ACCOUNT'
    | 'INCORRECT_PIN'
    | 'INVALID_CARD_DETAILS'
    | 'INSUFFICIENT_FUNDS'
    | 'INSUFFICIENT_FUNDS_PRELOAD'
    | 'INVALID_TRANSACTION'
    | 'MERCHANT_BLACKLIST'
    | 'ORIGINAL_NOT_FOUND'
    | 'PREVIOUSLY_COMPLETED'
    | 'SINGLE_USE_RECHARGED'
    | 'SWITCH_INOPERATIVE_ADVICE'
    | 'UNAUTHORIZED_MERCHANT'
    | 'UNKNOWN_HOST_TIMEOUT'
    | 'USER_TRANSACTION_LIMIT';

  /**
   * @deprecated The settled amount of the transaction in the settlement currency.
   */
  settled_amount: number;

  /**
   * Status of the transaction.
   */
  status: 'DECLINED' | 'EXPIRED' | 'PENDING' | 'SETTLED' | 'VOIDED';

  token_info: Transaction.TokenInfo | null;

  /**
   * Date and time when the transaction last updated. UTC time zone.
   */
  updated: string;

  events?: Array<Transaction.Event>;
}

export namespace Transaction {
  export interface Amounts {
    cardholder: Amounts.Cardholder;

    hold: Amounts.Hold;

    merchant: Amounts.Merchant;

    settlement: Amounts.Settlement;
  }

  export namespace Amounts {
    export interface Cardholder {
      /**
       * The estimated settled amount of the transaction in the cardholder billing
       * currency.
       */
      amount: number;

      /**
       * The exchange rate used to convert the merchant amount to the cardholder billing
       * amount.
       */
      conversion_rate: string;

      /**
       * 3-character alphabetic ISO 4217 currency
       */
      currency: Shared.Currency;
    }

    export interface Hold {
      /**
       * The pending amount of the transaction in the anticipated settlement currency.
       */
      amount: number;

      /**
       * 3-character alphabetic ISO 4217 currency
       */
      currency: Shared.Currency;
    }

    export interface Merchant {
      /**
       * The settled amount of the transaction in the merchant currency.
       */
      amount: number;

      /**
       * 3-character alphabetic ISO 4217 currency
       */
      currency: Shared.Currency;
    }

    export interface Settlement {
      /**
       * The settled amount of the transaction in the settlement currency.
       */
      amount: number;

      /**
       * 3-character alphabetic ISO 4217 currency
       */
      currency: Shared.Currency;
    }
  }

  export interface Avs {
    /**
     * Cardholder address
     */
    address: string;

    /**
     * Cardholder ZIP code
     */
    zipcode: string;
  }

  export interface CardholderAuthentication {
    /**
     * Indicates the method used to authenticate the cardholder.
     */
    authentication_method: 'FRICTIONLESS' | 'CHALLENGE' | 'NONE';

    /**
     * Indicates the outcome of the 3DS authentication process.
     */
    authentication_result: 'ATTEMPTS' | 'DECLINE' | 'NONE' | 'SUCCESS';

    /**
     * Indicates which party made the 3DS authentication decision.
     */
    decision_made_by:
      | 'CUSTOMER_RULES'
      | 'CUSTOMER_ENDPOINT'
      | 'LITHIC_DEFAULT'
      | 'LITHIC_RULES'
      | 'NETWORK'
      | 'UNKNOWN';

    /**
     * Indicates whether chargeback liability shift applies to the transaction.
     * Possible enum values:
     *
     * - `3DS_AUTHENTICATED`: The transaction was fully authenticated through a 3-D
     *   Secure flow, chargeback liability shift applies.
     * - `NONE`: Chargeback liability shift has not shifted to the issuer, i.e. the
     *   merchant is liable.
     * - `TOKEN_AUTHENTICATED`: The transaction was a tokenized payment with validated
     *   cryptography, possibly recurring. Chargeback liability shift to the issuer
     *   applies.
     */
    liability_shift: '3DS_AUTHENTICATED' | 'TOKEN_AUTHENTICATED' | 'NONE';

    /**
     * Unique identifier you can use to match a given 3DS authentication (available via
     * the three_ds_authentication.created event webhook) and the transaction. Note
     * that in cases where liability shift does not occur, this token is matched to the
     * transaction on a best-effort basis.
     */
    three_ds_authentication_token: string | null;
  }

  export interface Merchant {
    /**
     * Unique alphanumeric identifier for the payment card acceptor (merchant).
     */
    acceptor_id: string;

    /**
     * Unique numeric identifier of the acquiring institution.
     */
    acquiring_institution_id: string;

    /**
     * City of card acceptor. Note that in many cases, particularly in card-not-present
     * transactions, merchants may send through a phone number or URL in this field.
     */
    city: string;

    /**
     * Country or entity of card acceptor. Possible values are: (1) all ISO 3166-1
     * alpha-3 country codes, (2) QZZ for Kosovo, and (3) ANT for Netherlands Antilles.
     */
    country: string;

    /**
     * Short description of card acceptor.
     */
    descriptor: string;

    /**
     * Merchant category code (MCC). A four-digit number listed in ISO 18245. An MCC is
     * used to classify a business by the types of goods or services it provides.
     */
    mcc: string;

    /**
     * Geographic state of card acceptor.
     */
    state: string;
  }

  export interface Pos {
    entry_mode: Pos.EntryMode;

    terminal: Pos.Terminal;
  }

  export namespace Pos {
    export interface EntryMode {
      /**
       * Card presence indicator
       */
      card: 'NOT_PRESENT' | 'PREAUTHORIZED' | 'PRESENT' | 'UNKNOWN';

      /**
       * Cardholder presence indicator
       */
      cardholder:
        | 'DEFERRED_BILLING'
        | 'ELECTRONIC_ORDER'
        | 'INSTALLMENT'
        | 'MAIL_ORDER'
        | 'NOT_PRESENT'
        | 'PREAUTHORIZED'
        | 'PRESENT'
        | 'REOCCURRING'
        | 'TELEPHONE_ORDER'
        | 'UNKNOWN';

      /**
       * Method of entry for the PAN
       */
      pan:
        | 'AUTO_ENTRY'
        | 'BAR_CODE'
        | 'CONTACTLESS'
        | 'CREDENTIAL_ON_FILE'
        | 'ECOMMERCE'
        | 'ERROR_KEYED'
        | 'ERROR_MAGNETIC_STRIPE'
        | 'ICC'
        | 'KEY_ENTERED'
        | 'MAGNETIC_STRIPE'
        | 'MANUAL'
        | 'OCR'
        | 'SECURE_CARDLESS'
        | 'UNKNOWN'
        | 'UNSPECIFIED';

      /**
       * Indicates whether the cardholder entered the PIN. True if the PIN was entered.
       */
      pin_entered: boolean;
    }

    export interface Terminal {
      /**
       * True if a clerk is present at the sale.
       */
      attended: boolean;

      /**
       * True if the terminal is capable of retaining the card.
       */
      card_retention_capable: boolean;

      /**
       * True if the sale was made at the place of business (vs. mobile).
       */
      on_premise: boolean;

      /**
       * The person that is designated to swipe the card
       */
      operator: 'ADMINISTRATIVE' | 'CARDHOLDER' | 'CARD_ACCEPTOR' | 'UNKNOWN';

      /**
       * True if the terminal is capable of partial approval. Partial approval is when
       * part of a transaction is approved and another payment must be used for the
       * remainder. Example scenario: A $40 transaction is attempted on a prepaid card
       * with a $25 balance. If partial approval is enabled, $25 can be authorized, at
       * which point the POS will prompt the user for an additional payment of $15.
       */
      partial_approval_capable: boolean;

      /**
       * Status of whether the POS is able to accept PINs
       */
      pin_capability: 'CAPABLE' | 'INOPERATIVE' | 'NOT_CAPABLE' | 'UNSPECIFIED';

      /**
       * POS Type
       */
      type:
        | 'ADMINISTRATIVE'
        | 'ATM'
        | 'AUTHORIZATION'
        | 'COUPON_MACHINE'
        | 'DIAL_TERMINAL'
        | 'ECOMMERCE'
        | 'ECR'
        | 'FUEL_MACHINE'
        | 'HOME_TERMINAL'
        | 'MICR'
        | 'OFF_PREMISE'
        | 'PAYMENT'
        | 'PDA'
        | 'PHONE'
        | 'POINT'
        | 'POS_TERMINAL'
        | 'PUBLIC_UTILITY'
        | 'SELF_SERVICE'
        | 'TELEVISION'
        | 'TELLER'
        | 'TRAVELERS_CHECK_MACHINE'
        | 'VENDING'
        | 'VOICE'
        | 'UNKNOWN';

      /**
       * Uniquely identifies a terminal at the card acceptor location of acquiring
       * institutions or merchant POS Systems
       */
      acceptor_terminal_id?: string | null;
    }
  }

  export interface TokenInfo {
    /**
     * The wallet_type field will indicate the source of the token. Possible token
     * sources include digital wallets (Apple, Google, or Samsung Pay), merchant
     * tokenization, and “other” sources like in-flight commerce. Masterpass is not
     * currently supported and is included for future use.
     */
    wallet_type: 'APPLE_PAY' | 'GOOGLE_PAY' | 'MASTERPASS' | 'MERCHANT' | 'OTHER' | 'SAMSUNG_PAY';
  }

  export interface Event {
    /**
     * Transaction event identifier.
     */
    token: string;

    /**
     * @deprecated Amount of the event in the settlement currency.
     */
    amount: number;

    amounts: Event.Amounts;

    /**
     * RFC 3339 date and time this event entered the system. UTC time zone.
     */
    created: string;

    detailed_results: Array<
      | 'ACCOUNT_DAILY_SPEND_LIMIT_EXCEEDED'
      | 'ACCOUNT_DELINQUENT'
      | 'ACCOUNT_INACTIVE'
      | 'ACCOUNT_LIFETIME_SPEND_LIMIT_EXCEEDED'
      | 'ACCOUNT_MONTHLY_SPEND_LIMIT_EXCEEDED'
      | 'ACCOUNT_PAUSED'
      | 'ACCOUNT_UNDER_REVIEW'
      | 'ADDRESS_INCORRECT'
      | 'APPROVED'
      | 'AUTH_RULE_ALLOWED_COUNTRY'
      | 'AUTH_RULE_ALLOWED_MCC'
      | 'AUTH_RULE_BLOCKED_COUNTRY'
      | 'AUTH_RULE_BLOCKED_MCC'
      | 'CARD_CLOSED'
      | 'CARD_CRYPTOGRAM_VALIDATION_FAILURE'
      | 'CARD_EXPIRED'
      | 'CARD_EXPIRY_DATE_INCORRECT'
      | 'CARD_INVALID'
      | 'CARD_NOT_ACTIVATED'
      | 'CARD_PAUSED'
      | 'CARD_PIN_INCORRECT'
      | 'CARD_RESTRICTED'
      | 'CARD_SECURITY_CODE_INCORRECT'
      | 'CARD_SPEND_LIMIT_EXCEEDED'
      | 'CONTACT_CARD_ISSUER'
      | 'CUSTOMER_ASA_TIMEOUT'
      | 'CUSTOM_ASA_RESULT'
      | 'DECLINED'
      | 'DO_NOT_HONOR'
      | 'DRIVER_NUMBER_INVALID'
      | 'FORMAT_ERROR'
      | 'INSUFFICIENT_FUNDING_SOURCE_BALANCE'
      | 'INSUFFICIENT_FUNDS'
      | 'LITHIC_SYSTEM_ERROR'
      | 'LITHIC_SYSTEM_RATE_LIMIT'
      | 'MALFORMED_ASA_RESPONSE'
      | 'MERCHANT_INVALID'
      | 'MERCHANT_LOCKED_CARD_ATTEMPTED_ELSEWHERE'
      | 'MERCHANT_NOT_PERMITTED'
      | 'OVER_REVERSAL_ATTEMPTED'
      | 'PIN_BLOCKED'
      | 'PROGRAM_CARD_SPEND_LIMIT_EXCEEDED'
      | 'PROGRAM_SUSPENDED'
      | 'PROGRAM_USAGE_RESTRICTION'
      | 'REVERSAL_UNMATCHED'
      | 'SECURITY_VIOLATION'
      | 'SINGLE_USE_CARD_REATTEMPTED'
      | 'SUSPECTED_FRAUD'
      | 'TRANSACTION_INVALID'
      | 'TRANSACTION_NOT_PERMITTED_TO_ACQUIRER_OR_TERMINAL'
      | 'TRANSACTION_NOT_PERMITTED_TO_ISSUER_OR_CARDHOLDER'
      | 'TRANSACTION_PREVIOUSLY_COMPLETED'
      | 'UNAUTHORIZED_MERCHANT'
      | 'VEHICLE_NUMBER_INVALID'
      | 'CARDHOLDER_CHALLENGED'
      | 'CARDHOLDER_CHALLENGE_FAILED'
    >;

    /**
     * Indicates whether the transaction event is a credit or debit to the account.
     */
    effective_polarity: 'CREDIT' | 'DEBIT';

    /**
     * Information provided by the card network in each event. This includes common
     * identifiers shared between you, Lithic, the card network and in some cases the
     * acquirer. These identifiers often link together events within the same
     * transaction lifecycle and can be used to locate a particular transaction, such
     * as during processing of disputes. Not all fields are available in all events,
     * and the presence of these fields is dependent on the card network and the event
     * type. If the field is populated by the network, we will pass it through as is
     * unless otherwise specified. Please consult the official network documentation
     * for more details about these fields and how to use them.
     */
    network_info: Event.NetworkInfo | null;

    result:
      | 'ACCOUNT_PAUSED'
      | 'ACCOUNT_STATE_TRANSACTION_FAIL'
      | 'APPROVED'
      | 'BANK_CONNECTION_ERROR'
      | 'BANK_NOT_VERIFIED'
      | 'CARD_CLOSED'
      | 'CARD_PAUSED'
      | 'DECLINED'
      | 'FRAUD_ADVICE'
      | 'IGNORED_TTL_EXPIRY'
      | 'SUSPECTED_FRAUD'
      | 'INACTIVE_ACCOUNT'
      | 'INCORRECT_PIN'
      | 'INVALID_CARD_DETAILS'
      | 'INSUFFICIENT_FUNDS'
      | 'INSUFFICIENT_FUNDS_PRELOAD'
      | 'INVALID_TRANSACTION'
      | 'MERCHANT_BLACKLIST'
      | 'ORIGINAL_NOT_FOUND'
      | 'PREVIOUSLY_COMPLETED'
      | 'SINGLE_USE_RECHARGED'
      | 'SWITCH_INOPERATIVE_ADVICE'
      | 'UNAUTHORIZED_MERCHANT'
      | 'UNKNOWN_HOST_TIMEOUT'
      | 'USER_TRANSACTION_LIMIT';

    rule_results: Array<Event.RuleResult>;

    /**
     * Type of transaction event
     */
    type:
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
      | 'RETURN_REVERSAL';

    account_type?: 'CHECKING' | 'SAVINGS';

    network_specific_data?: Event.NetworkSpecificData;
  }

  export namespace Event {
    export interface Amounts {
      cardholder: Amounts.Cardholder;

      merchant: Amounts.Merchant;

      settlement: Amounts.Settlement | null;
    }

    export namespace Amounts {
      export interface Cardholder {
        /**
         * Amount of the event in the cardholder billing currency.
         */
        amount: number;

        /**
         * Exchange rate used to convert the merchant amount to the cardholder billing
         * amount.
         */
        conversion_rate: string;

        /**
         * 3-character alphabetic ISO 4217 currency
         */
        currency: Shared.Currency;
      }

      export interface Merchant {
        /**
         * Amount of the event in the merchant currency.
         */
        amount: number;

        /**
         * 3-character alphabetic ISO 4217 currency
         */
        currency: Shared.Currency;
      }

      export interface Settlement {
        /**
         * Amount of the event, if it is financial, in the settlement currency.
         * Non-financial events do not contain this amount because they do not move funds.
         */
        amount: number;

        /**
         * Exchange rate used to convert the merchant amount to the settlement amount.
         */
        conversion_rate: string;

        /**
         * 3-character alphabetic ISO 4217 currency
         */
        currency: Shared.Currency;
      }
    }

    /**
     * Information provided by the card network in each event. This includes common
     * identifiers shared between you, Lithic, the card network and in some cases the
     * acquirer. These identifiers often link together events within the same
     * transaction lifecycle and can be used to locate a particular transaction, such
     * as during processing of disputes. Not all fields are available in all events,
     * and the presence of these fields is dependent on the card network and the event
     * type. If the field is populated by the network, we will pass it through as is
     * unless otherwise specified. Please consult the official network documentation
     * for more details about these fields and how to use them.
     */
    export interface NetworkInfo {
      acquirer: NetworkInfo.Acquirer | null;

      amex: NetworkInfo.Amex | null;

      mastercard: NetworkInfo.Mastercard | null;

      visa: NetworkInfo.Visa | null;
    }

    export namespace NetworkInfo {
      export interface Acquirer {
        /**
         * Identifier assigned by the acquirer, applicable to dual-message transactions
         * only. The acquirer reference number (ARN) is only populated once a transaction
         * has been cleared, and it is not available in all transactions (such as automated
         * fuel dispenser transactions). A single transaction can contain multiple ARNs if
         * the merchant sends multiple clearings.
         */
        acquirer_reference_number: string | null;

        /**
         * Identifier assigned by the acquirer.
         */
        retrieval_reference_number: string | null;
      }

      export interface Amex {
        /**
         * Identifier assigned by American Express. Matches the `transaction_id` of a prior
         * related event. May be populated in incremental authorizations (authorization
         * requests that augment a previously authorized amount), authorization advices,
         * financial authorizations, and clearings.
         */
        original_transaction_id: string | null;

        /**
         * Identifier assigned by American Express to link original messages to subsequent
         * messages. Guaranteed by American Express to be unique for each original
         * authorization and financial authorization.
         */
        transaction_id: string | null;
      }

      export interface Mastercard {
        /**
         * Identifier assigned by Mastercard. Guaranteed by Mastercard to be unique for any
         * transaction within a specific financial network on any processing day.
         */
        banknet_reference_number: string | null;

        /**
         * Identifier assigned by Mastercard. Matches the `banknet_reference_number` of a
         * prior related event. May be populated in authorization reversals, incremental
         * authorizations (authorization requests that augment a previously authorized
         * amount), automated fuel dispenser authorization advices and clearings, and
         * financial authorizations. If the original banknet reference number contains all
         * zeroes, then no actual reference number could be found by the network or
         * acquirer. If Mastercard converts a transaction from dual-message to
         * single-message, such as for certain ATM transactions, it will populate the
         * original banknet reference number in the resulting financial authorization with
         * the banknet reference number of the initial authorization, which Lithic does not
         * receive.
         */
        original_banknet_reference_number: string | null;

        /**
         * Identifier assigned by Mastercard. Matches the `switch_serial_number` of a prior
         * related event. May be populated in returns and return reversals. Applicable to
         * single-message transactions only.
         */
        original_switch_serial_number: string | null;

        /**
         * Identifier assigned by Mastercard, applicable to single-message transactions
         * only.
         */
        switch_serial_number: string | null;
      }

      export interface Visa {
        /**
         * Identifier assigned by Visa. Matches the `transaction_id` of a prior related
         * event. May be populated in incremental authorizations (authorization requests
         * that augment a previously authorized amount), authorization advices, financial
         * authorizations, and clearings.
         */
        original_transaction_id: string | null;

        /**
         * Identifier assigned by Visa to link original messages to subsequent messages.
         * Guaranteed by Visa to be unique for each original authorization and financial
         * authorization.
         */
        transaction_id: string | null;
      }
    }

    export interface RuleResult {
      /**
       * The Auth Rule Token associated with the rule from which the decline originated.
       * If this is set to null, then the decline was not associated with a
       * customer-configured Auth Rule. This may happen in cases where a transaction is
       * declined due to a Lithic-configured security or compliance rule, for example.
       */
      auth_rule_token: string | null;

      /**
       * A human-readable explanation outlining the motivation for the rule's decline.
       */
      explanation: string | null;

      /**
       * The name for the rule, if any was configured.
       */
      name: string | null;

      /**
       * The detailed_result associated with this rule's decline.
       */
      result:
        | 'ACCOUNT_DAILY_SPEND_LIMIT_EXCEEDED'
        | 'ACCOUNT_DELINQUENT'
        | 'ACCOUNT_INACTIVE'
        | 'ACCOUNT_LIFETIME_SPEND_LIMIT_EXCEEDED'
        | 'ACCOUNT_MONTHLY_SPEND_LIMIT_EXCEEDED'
        | 'ACCOUNT_PAUSED'
        | 'ACCOUNT_UNDER_REVIEW'
        | 'ADDRESS_INCORRECT'
        | 'APPROVED'
        | 'AUTH_RULE_ALLOWED_COUNTRY'
        | 'AUTH_RULE_ALLOWED_MCC'
        | 'AUTH_RULE_BLOCKED_COUNTRY'
        | 'AUTH_RULE_BLOCKED_MCC'
        | 'CARD_CLOSED'
        | 'CARD_CRYPTOGRAM_VALIDATION_FAILURE'
        | 'CARD_EXPIRED'
        | 'CARD_EXPIRY_DATE_INCORRECT'
        | 'CARD_INVALID'
        | 'CARD_NOT_ACTIVATED'
        | 'CARD_PAUSED'
        | 'CARD_PIN_INCORRECT'
        | 'CARD_RESTRICTED'
        | 'CARD_SECURITY_CODE_INCORRECT'
        | 'CARD_SPEND_LIMIT_EXCEEDED'
        | 'CONTACT_CARD_ISSUER'
        | 'CUSTOMER_ASA_TIMEOUT'
        | 'CUSTOM_ASA_RESULT'
        | 'DECLINED'
        | 'DO_NOT_HONOR'
        | 'DRIVER_NUMBER_INVALID'
        | 'FORMAT_ERROR'
        | 'INSUFFICIENT_FUNDING_SOURCE_BALANCE'
        | 'INSUFFICIENT_FUNDS'
        | 'LITHIC_SYSTEM_ERROR'
        | 'LITHIC_SYSTEM_RATE_LIMIT'
        | 'MALFORMED_ASA_RESPONSE'
        | 'MERCHANT_INVALID'
        | 'MERCHANT_LOCKED_CARD_ATTEMPTED_ELSEWHERE'
        | 'MERCHANT_NOT_PERMITTED'
        | 'OVER_REVERSAL_ATTEMPTED'
        | 'PIN_BLOCKED'
        | 'PROGRAM_CARD_SPEND_LIMIT_EXCEEDED'
        | 'PROGRAM_SUSPENDED'
        | 'PROGRAM_USAGE_RESTRICTION'
        | 'REVERSAL_UNMATCHED'
        | 'SECURITY_VIOLATION'
        | 'SINGLE_USE_CARD_REATTEMPTED'
        | 'SUSPECTED_FRAUD'
        | 'TRANSACTION_INVALID'
        | 'TRANSACTION_NOT_PERMITTED_TO_ACQUIRER_OR_TERMINAL'
        | 'TRANSACTION_NOT_PERMITTED_TO_ISSUER_OR_CARDHOLDER'
        | 'TRANSACTION_PREVIOUSLY_COMPLETED'
        | 'UNAUTHORIZED_MERCHANT'
        | 'VEHICLE_NUMBER_INVALID'
        | 'CARDHOLDER_CHALLENGED'
        | 'CARDHOLDER_CHALLENGE_FAILED';
    }

    export interface NetworkSpecificData {
      mastercard: NetworkSpecificData.Mastercard;

      visa: NetworkSpecificData.Visa;
    }

    export namespace NetworkSpecificData {
      export interface Mastercard {
        /**
         * Indicates the electronic commerce security level and UCAF collection.
         */
        ecommerce_security_level_indicator: string | null;

        /**
         * The On-behalf Service performed on the transaction and the results. Contains all
         * applicable, on-behalf service results that were performed on a given
         * transaction.
         */
        on_behalf_service_result: Array<Mastercard.OnBehalfServiceResult> | null;

        /**
         * Indicates the type of additional transaction purpose.
         */
        transaction_type_identifier: string | null;
      }

      export namespace Mastercard {
        export interface OnBehalfServiceResult {
          /**
           * Indicates the results of the service processing.
           */
          result_1: string;

          /**
           * Identifies the results of the service processing.
           */
          result_2: string;

          /**
           * Indicates the service performed on the transaction.
           */
          service: string;
        }
      }

      export interface Visa {
        /**
         * Identifies the purpose or category of a transaction, used to classify and
         * process transactions according to Visa’s rules.
         */
        business_application_identifier: string | null;
      }
    }
  }
}

export interface TransactionSimulateAuthorizationResponse {
  /**
   * A unique token to reference this transaction with later calls to void or clear
   * the authorization.
   */
  token?: string;

  /**
   * Debugging request ID to share with Lithic Support team.
   */
  debugging_request_id?: string;
}

export interface TransactionSimulateAuthorizationAdviceResponse {
  /**
   * A unique token to reference this transaction.
   */
  token?: string;

  /**
   * Debugging request ID to share with Lithic Support team.
   */
  debugging_request_id?: string;
}

export interface TransactionSimulateClearingResponse {
  /**
   * Debugging request ID to share with Lithic Support team.
   */
  debugging_request_id?: string;
}

export interface TransactionSimulateCreditAuthorizationResponse {
  /**
   * A unique token to reference this transaction.
   */
  token?: string;

  /**
   * Debugging request ID to share with Lithic Support team.
   */
  debugging_request_id?: string;
}

export interface TransactionSimulateCreditAuthorizationAdviceResponse {
  /**
   * A unique token to reference this transaction.
   */
  token?: string;

  /**
   * Debugging request ID to share with Lithic Support team.
   */
  debugging_request_id?: string;
}

export interface TransactionSimulateReturnResponse {
  /**
   * A unique token to reference this transaction.
   */
  token?: string;

  /**
   * Debugging request ID to share with Lithic Support team.
   */
  debugging_request_id?: string;
}

export interface TransactionSimulateReturnReversalResponse {
  /**
   * Debugging request ID to share with Lithic Support team.
   */
  debugging_request_id?: string;
}

export interface TransactionSimulateVoidResponse {
  /**
   * Debugging request ID to share with Lithic Support team.
   */
  debugging_request_id?: string;
}

export interface TransactionListParams extends CursorPageParams {
  /**
   * Filters for transactions associated with a specific account.
   */
  account_token?: string;

  /**
   * Date string in RFC 3339 format. Only entries created after the specified time
   * will be included. UTC time zone.
   */
  begin?: string;

  /**
   * Filters for transactions associated with a specific card.
   */
  card_token?: string;

  /**
   * Date string in RFC 3339 format. Only entries created before the specified time
   * will be included. UTC time zone.
   */
  end?: string;

  /**
   * Filters for transactions using transaction result field. Can filter by
   * `APPROVED`, and `DECLINED`.
   */
  result?: 'APPROVED' | 'DECLINED';

  /**
   * Filters for transactions using transaction status field.
   */
  status?: 'PENDING' | 'VOIDED' | 'SETTLED' | 'DECLINED' | 'EXPIRED';
}

export interface TransactionSimulateAuthorizationParams {
  /**
   * Amount (in cents) to authorize. For credit authorizations and financial credit
   * authorizations, any value entered will be converted into a negative amount in
   * the simulated transaction. For example, entering 100 in this field will result
   * in a -100 amount in the transaction. For balance inquiries, this field must be
   * set to 0.
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
   * Merchant category code for the transaction to be simulated. A four-digit number
   * listed in ISO 18245. Supported merchant category codes can be found
   * [here](https://docs.lithic.com/docs/transactions#merchant-category-codes-mccs).
   */
  mcc?: string;

  /**
   * Unique identifier to identify the payment card acceptor.
   */
  merchant_acceptor_id?: string;

  /**
   * Amount of the transaction to be simulated in currency specified in
   * merchant_currency, including any acquirer fees.
   */
  merchant_amount?: number;

  /**
   * 3-character alphabetic ISO 4217 currency code. Note: Simulator only accepts USD,
   * GBP, EUR and defaults to GBP if another ISO 4217 code is provided
   */
  merchant_currency?: string;

  /**
   * Set to true if the terminal is capable of partial approval otherwise false.
   * Partial approval is when part of a transaction is approved and another payment
   * must be used for the remainder.
   */
  partial_approval_capable?: boolean;

  /**
   * Simulate entering a PIN. If omitted, PIN check will not be performed.
   */
  pin?: string;

  /**
   * Type of event to simulate.
   *
   * - `AUTHORIZATION` is a dual message purchase authorization, meaning a subsequent
   *   clearing step is required to settle the transaction.
   * - `BALANCE_INQUIRY` is a $0 authorization requesting the balance held on the
   *   card, and is most often observed when a cardholder requests to view a card's
   *   balance at an ATM.
   * - `CREDIT_AUTHORIZATION` is a dual message request from a merchant to authorize
   *   a refund, meaning a subsequent clearing step is required to settle the
   *   transaction.
   * - `FINANCIAL_AUTHORIZATION` is a single message request from a merchant to debit
   *   funds immediately (such as an ATM withdrawal), and no subsequent clearing is
   *   required to settle the transaction.
   * - `FINANCIAL_CREDIT_AUTHORIZATION` is a single message request from a merchant
   *   to credit funds immediately, and no subsequent clearing is required to settle
   *   the transaction.
   */
  status?:
    | 'AUTHORIZATION'
    | 'BALANCE_INQUIRY'
    | 'CREDIT_AUTHORIZATION'
    | 'FINANCIAL_AUTHORIZATION'
    | 'FINANCIAL_CREDIT_AUTHORIZATION';
}

export interface TransactionSimulateAuthorizationAdviceParams {
  /**
   * The transaction token returned from the /v1/simulate/authorize. response.
   */
  token: string;

  /**
   * Amount (in cents) to authorize. This amount will override the transaction's
   * amount that was originally set by /v1/simulate/authorize.
   */
  amount: number;
}

export interface TransactionSimulateClearingParams {
  /**
   * The transaction token returned from the /v1/simulate/authorize response.
   */
  token: string;

  /**
   * Amount (in cents) to clear. Typically this will match the amount in the original
   * authorization, but can be higher or lower. The sign of this amount will
   * automatically match the sign of the original authorization's amount. For
   * example, entering 100 in this field will result in a -100 amount in the
   * transaction, if the original authorization is a credit authorization.
   *
   * If `amount` is not set, the full amount of the transaction will be cleared.
   * Transactions that have already cleared, either partially or fully, cannot be
   * cleared again using this endpoint.
   */
  amount?: number;
}

export interface TransactionSimulateCreditAuthorizationParams {
  /**
   * Amount (in cents). Any value entered will be converted into a negative amount in
   * the simulated transaction. For example, entering 100 in this field will appear
   * as a -100 amount in the transaction.
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
   * Merchant category code for the transaction to be simulated. A four-digit number
   * listed in ISO 18245. Supported merchant category codes can be found
   * [here](https://docs.lithic.com/docs/transactions#merchant-category-codes-mccs).
   */
  mcc?: string;

  /**
   * Unique identifier to identify the payment card acceptor.
   */
  merchant_acceptor_id?: string;
}

export interface TransactionSimulateCreditAuthorizationAdviceParams {
  /**
   * Amount (in cents). Any value entered will be converted into a negative amount in
   * the simulated transaction. For example, entering 100 in this field will appear
   * as a -100 amount in the transaction.
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
   * Merchant category code for the transaction to be simulated. A four-digit number
   * listed in ISO 18245. Supported merchant category codes can be found
   * [here](https://docs.lithic.com/docs/transactions#merchant-category-codes-mccs).
   */
  mcc?: string;

  /**
   * Unique identifier to identify the payment card acceptor.
   */
  merchant_acceptor_id?: string;
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

export interface TransactionSimulateReturnReversalParams {
  /**
   * The transaction token returned from the /v1/simulate/authorize response.
   */
  token: string;
}

export interface TransactionSimulateVoidParams {
  /**
   * The transaction token returned from the /v1/simulate/authorize response.
   */
  token: string;

  /**
   * Amount (in cents) to void. Typically this will match the amount in the original
   * authorization, but can be less. Applies to authorization reversals only. An
   * authorization expiry will always apply to the full pending amount.
   */
  amount?: number;

  /**
   * Type of event to simulate. Defaults to `AUTHORIZATION_REVERSAL`.
   *
   * - `AUTHORIZATION_EXPIRY` indicates authorization has expired and been reversed
   *   by Lithic.
   * - `AUTHORIZATION_REVERSAL` indicates authorization was reversed by the merchant.
   */
  type?: 'AUTHORIZATION_EXPIRY' | 'AUTHORIZATION_REVERSAL';
}

Transactions.EnhancedCommercialData = EnhancedCommercialData;
Transactions.Events = Events;

export declare namespace Transactions {
  export {
    type Transaction as Transaction,
    type TransactionSimulateAuthorizationResponse as TransactionSimulateAuthorizationResponse,
    type TransactionSimulateAuthorizationAdviceResponse as TransactionSimulateAuthorizationAdviceResponse,
    type TransactionSimulateClearingResponse as TransactionSimulateClearingResponse,
    type TransactionSimulateCreditAuthorizationResponse as TransactionSimulateCreditAuthorizationResponse,
    type TransactionSimulateCreditAuthorizationAdviceResponse as TransactionSimulateCreditAuthorizationAdviceResponse,
    type TransactionSimulateReturnResponse as TransactionSimulateReturnResponse,
    type TransactionSimulateReturnReversalResponse as TransactionSimulateReturnReversalResponse,
    type TransactionSimulateVoidResponse as TransactionSimulateVoidResponse,
    type TransactionsCursorPage as TransactionsCursorPage,
    type TransactionListParams as TransactionListParams,
    type TransactionSimulateAuthorizationParams as TransactionSimulateAuthorizationParams,
    type TransactionSimulateAuthorizationAdviceParams as TransactionSimulateAuthorizationAdviceParams,
    type TransactionSimulateClearingParams as TransactionSimulateClearingParams,
    type TransactionSimulateCreditAuthorizationParams as TransactionSimulateCreditAuthorizationParams,
    type TransactionSimulateCreditAuthorizationAdviceParams as TransactionSimulateCreditAuthorizationAdviceParams,
    type TransactionSimulateReturnParams as TransactionSimulateReturnParams,
    type TransactionSimulateReturnReversalParams as TransactionSimulateReturnReversalParams,
    type TransactionSimulateVoidParams as TransactionSimulateVoidParams,
  };

  export {
    EnhancedCommercialData as EnhancedCommercialData,
    type EnhancedCommercialDataRetrieveResponse as EnhancedCommercialDataRetrieveResponse,
  };

  export { Events as Events };
}
