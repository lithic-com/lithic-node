// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../resource';
import { isRequestOptions } from '../../core';
import * as Core from '../../core';
import * as TransactionsAPI from './transactions';
import * as Shared from '../shared';
import * as EnhancedCommercialDataAPI from './enhanced-commercial-data';
import * as EventsAPI from './events/events';
import { CursorPage, type CursorPageParams } from '../../pagination';

export class Transactions extends APIResource {
  enhancedCommercialData: EnhancedCommercialDataAPI.EnhancedCommercialData =
    new EnhancedCommercialDataAPI.EnhancedCommercialData(this._client);
  events: EventsAPI.Events = new EventsAPI.Events(this._client);

  /**
   * Get specific card transaction.
   */
  retrieve(transactionToken: string, options?: Core.RequestOptions): Core.APIPromise<Transaction> {
    return this._client.get(`/v1/transactions/${transactionToken}`, options);
  }

  /**
   * List card transactions.
   */
  list(
    query?: TransactionListParams,
    options?: Core.RequestOptions,
  ): Core.PagePromise<TransactionsCursorPage, Transaction>;
  list(options?: Core.RequestOptions): Core.PagePromise<TransactionsCursorPage, Transaction>;
  list(
    query: TransactionListParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.PagePromise<TransactionsCursorPage, Transaction> {
    if (isRequestOptions(query)) {
      return this.list({}, query);
    }
    return this._client.getAPIList('/v1/transactions', TransactionsCursorPage, { query, ...options });
  }

  /**
   * Simulates an authorization request from the payment network as if it came from a
   * merchant acquirer. If you're configured for ASA, simulating auths requires your
   * ASA client to be set up properly (respond with a valid JSON to the ASA request).
   * For users that are not configured for ASA, a daily transaction limit of $5000
   * USD is applied by default. This limit can be modified via the
   * [update account](https://docs.lithic.com/reference/patchaccountbytoken)
   * endpoint.
   */
  simulateAuthorization(
    body: TransactionSimulateAuthorizationParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<TransactionSimulateAuthorizationResponse> {
    return this._client.post('/v1/simulate/authorize', { body, ...options });
  }

  /**
   * Simulates an authorization advice request from the payment network as if it came
   * from a merchant acquirer. An authorization advice request changes the amount of
   * the transaction.
   */
  simulateAuthorizationAdvice(
    body: TransactionSimulateAuthorizationAdviceParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<TransactionSimulateAuthorizationAdviceResponse> {
    return this._client.post('/v1/simulate/authorization_advice', { body, ...options });
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
  ): Core.APIPromise<TransactionSimulateClearingResponse> {
    return this._client.post('/v1/simulate/clearing', { body, ...options });
  }

  /**
   * Simulates a credit authorization advice message from the payment network. This
   * message indicates that a credit authorization was approved on your behalf by the
   * network.
   */
  simulateCreditAuthorization(
    body: TransactionSimulateCreditAuthorizationParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<TransactionSimulateCreditAuthorizationResponse> {
    return this._client.post('/v1/simulate/credit_authorization_advice', { body, ...options });
  }

  /**
   * Returns (aka refunds) an amount back to a card. Returns are cleared immediately
   * and do not spend time in a `PENDING` state.
   */
  simulateReturn(
    body: TransactionSimulateReturnParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<TransactionSimulateReturnResponse> {
    return this._client.post('/v1/simulate/return', { body, ...options });
  }

  /**
   * Voids a settled credit transaction – i.e., a transaction with a negative amount
   * and `SETTLED` status. These can be credit authorizations that have already
   * cleared or financial credit authorizations.
   */
  simulateReturnReversal(
    body: TransactionSimulateReturnReversalParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<TransactionSimulateReturnReversalResponse> {
    return this._client.post('/v1/simulate/return_reversal', { body, ...options });
  }

  /**
   * Voids an existing, uncleared (aka pending) authorization. If amount is not sent
   * the full amount will be voided. Cannot be used on partially completed
   * transactions, but can be used on partially voided transactions. _Note that
   * simulating an authorization expiry on credit authorizations or credit
   * authorization advice is not currently supported but will be added soon._
   */
  simulateVoid(
    body: TransactionSimulateVoidParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<TransactionSimulateVoidResponse> {
    return this._client.post('/v1/simulate/void', { body, ...options });
  }
}

export class TransactionsCursorPage extends CursorPage<Transaction> {}

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
   * Unique identifier assigned to a transaction by the acquirer that can be used in
   * dispute and chargeback filing.
   */
  acquirer_reference_number: string | null;

  /**
   * Authorization amount of the transaction (in cents), including any acquirer fees.
   * This may change over time, and will represent the settled amount once the
   * transaction is settled.
   */
  amount: number;

  amounts: Transaction.Amounts;

  /**
   * Authorization amount (in cents) of the transaction, including any acquirer fees.
   * This amount always represents the amount authorized for the transaction,
   * unaffected by settlement.
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

  merchant: Transaction.Merchant;

  /**
   * Analogous to the 'amount' property, but will represent the amount in the
   * transaction's local currency (smallest unit), including any acquirer fees.
   */
  merchant_amount: number | null;

  /**
   * Analogous to the 'authorization_amount' property, but will represent the amount
   * in the transaction's local currency (smallest unit), including any acquirer
   * fees.
   */
  merchant_authorization_amount: number | null;

  /**
   * 3-digit alphabetic ISO 4217 code for the local currency of the transaction.
   */
  merchant_currency: string;

  /**
   * Card network of the authorization. Can be `INTERLINK`, `MAESTRO`, `MASTERCARD`,
   * `VISA`, or `UNKNOWN`. Value is `UNKNOWN` when Lithic cannot determine the
   * network code from the upstream provider.
   */
  network: 'INTERLINK' | 'MAESTRO' | 'MASTERCARD' | 'UNKNOWN' | 'VISA' | null;

  /**
   * Network-provided score assessing risk level associated with a given
   * authorization. Scores are on a range of 0-999, with 0 representing the lowest
   * risk and 999 representing the highest risk. For Visa transactions, where the raw
   * score has a range of 0-99, Lithic will normalize the score by multiplying the
   * raw score by 10x.
   */
  network_risk_score: number | null;

  pos: Transaction.Pos;

  /**
   * `APPROVED` or decline reason. See Event result types
   */
  result:
    | 'APPROVED'
    | 'BANK_CONNECTION_ERROR'
    | 'BANK_NOT_VERIFIED'
    | 'CARD_CLOSED'
    | 'CARD_PAUSED'
    | 'DECLINED'
    | 'FRAUD_ADVICE'
    | 'INACTIVE_ACCOUNT'
    | 'INCORRECT_PIN'
    | 'INSUFFICIENT_FUNDS'
    | 'INVALID_CARD_DETAILS'
    | 'MERCHANT_BLACKLIST'
    | 'SINGLE_USE_RECHARGED'
    | 'SWITCH_INOPERATIVE_ADVICE'
    | 'UNAUTHORIZED_MERCHANT'
    | 'UNKNOWN_HOST_TIMEOUT'
    | 'USER_TRANSACTION_LIMIT';

  /**
   * Amount of the transaction that has been settled (in cents), including any
   * acquirer fees. This may change over time.
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
       * The aggregate settled amount in the cardholder's local currency.
       */
      amount: number;

      /**
       * The conversion rate used to convert the merchant amount to the cardholder
       * amount.
       */
      conversion_rate: string;

      /**
       * ISO 4217 currency. Its enumerants are ISO 4217 currencies except for some
       * special currencies like `XXX`. Enumerants names are lowercase currency code e.g.
       * `EUR`, `USD`.
       */
      currency: Shared.Currency;
    }

    export interface Hold {
      /**
       * The aggregate pending amount in the anticipated settlement currency.
       */
      amount: number;

      /**
       * ISO 4217 currency. Its enumerants are ISO 4217 currencies except for some
       * special currencies like `XXX`. Enumerants names are lowercase currency code e.g.
       * `EUR`, `USD`.
       */
      currency: Shared.Currency;
    }

    export interface Merchant {
      /**
       * The aggregate settled amount in the merchant's local currency.
       */
      amount: number;

      /**
       * ISO 4217 currency. Its enumerants are ISO 4217 currencies except for some
       * special currencies like `XXX`. Enumerants names are lowercase currency code e.g.
       * `EUR`, `USD`.
       */
      currency: Shared.Currency;
    }

    export interface Settlement {
      /**
       * The aggregate settled amount in the settlement currency.
       */
      amount: number;

      /**
       * ISO 4217 currency. Its enumerants are ISO 4217 currencies except for some
       * special currencies like `XXX`. Enumerants names are lowercase currency code e.g.
       * `EUR`, `USD`.
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
     * The 3DS version used for the authentication
     */
    '3ds_version': string | null;

    /**
     * Whether an acquirer exemption applied to the transaction.
     */
    acquirer_exemption:
      | 'AUTHENTICATION_OUTAGE_EXCEPTION'
      | 'LOW_VALUE'
      | 'MERCHANT_INITIATED_TRANSACTION'
      | 'NONE'
      | 'RECURRING_PAYMENT'
      | 'SECURE_CORPORATE_PAYMENT'
      | 'STRONG_CUSTOMER_AUTHENTICATION_DELEGATION'
      | 'TRANSACTION_RISK_ANALYSIS';

    /**
     * Indicates what the outcome of the 3DS authentication process is.
     */
    authentication_result: 'ATTEMPTS' | 'DECLINE' | 'NONE' | 'SUCCESS';

    /**
     * Indicates which party made the 3DS authentication decision.
     */
    decision_made_by: 'CUSTOMER_ENDPOINT' | 'LITHIC_DEFAULT' | 'LITHIC_RULES' | 'NETWORK' | 'UNKNOWN';

    /**
     * Indicates whether chargeback liability shift applies to the transaction.
     * Possible enum values:
     *
     *     * `3DS_AUTHENTICATED`: The transaction was fully authenticated through a 3-D Secure flow, chargeback liability shift applies.
     *
     *     * `ACQUIRER_EXEMPTION`: The acquirer utilised an exemption to bypass Strong Customer Authentication (`transStatus = N`, or `transStatus = I`). Liability remains with the acquirer and in this case the `acquirer_exemption` field is expected to be not `NONE`.
     *
     *     * `NONE`: Chargeback liability shift has not shifted to the issuer, i.e. the merchant is liable.
     *
     * - `TOKEN_AUTHENTICATED`: The transaction was a tokenized payment with validated
     *   cryptography, possibly recurring. Chargeback liability shift to the issuer
     *   applies.
     */
    liability_shift: '3DS_AUTHENTICATED' | 'ACQUIRER_EXEMPTION' | 'NONE' | 'TOKEN_AUTHENTICATED';

    /**
     * Unique identifier you can use to match a given 3DS authentication (available via
     * the three_ds_authentication.created event webhook) and the transaction. Note
     * that in cases where liability shift does not occur, this token is matched to the
     * transaction on a best-effort basis.
     */
    three_ds_authentication_token: string | null;

    /**
     * Indicates whether a 3DS challenge flow was used, and if so, what the
     * verification method was. (deprecated, use `authentication_result`)
     */
    verification_attempted: 'NONE' | 'OTHER';

    /**
     * Indicates whether a transaction is considered 3DS authenticated. (deprecated,
     * use `authentication_result`)
     */
    verification_result: 'CANCELLED' | 'FAILED' | 'FRICTIONLESS' | 'NOT_ATTEMPTED' | 'REJECTED' | 'SUCCESS';
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
     * Amount of the transaction event (in cents), including any acquirer fees.
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
      | 'PROGRAM_CARD_SPEND_LIMIT_EXCEEDED'
      | 'PROGRAM_SUSPENDED'
      | 'PROGRAM_USAGE_RESTRICTION'
      | 'REVERSAL_UNMATCHED'
      | 'SECURITY_VIOLATION'
      | 'SINGLE_USE_CARD_REATTEMPTED'
      | 'TRANSACTION_INVALID'
      | 'TRANSACTION_NOT_PERMITTED_TO_ACQUIRER_OR_TERMINAL'
      | 'TRANSACTION_NOT_PERMITTED_TO_ISSUER_OR_CARDHOLDER'
      | 'TRANSACTION_PREVIOUSLY_COMPLETED'
      | 'UNAUTHORIZED_MERCHANT'
      | 'VEHICLE_NUMBER_INVALID'
    >;

    /**
     * Indicates whether the transaction event is a credit or debit to the account.
     */
    effective_polarity: 'CREDIT' | 'DEBIT';

    /**
     * Result of the transaction.
     */
    result:
      | 'ACCOUNT_STATE_TRANSACTION_FAIL'
      | 'APPROVED'
      | 'BANK_CONNECTION_ERROR'
      | 'BANK_NOT_VERIFIED'
      | 'CARD_CLOSED'
      | 'CARD_PAUSED'
      | 'FRAUD_ADVICE'
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
         * The amount in the cardholder's local currency.
         */
        amount: number;

        /**
         * The conversion rate used to convert the merchant amount to the cardholder
         * amount.
         */
        conversion_rate: string;

        /**
         * ISO 4217 currency. Its enumerants are ISO 4217 currencies except for some
         * special currencies like `XXX`. Enumerants names are lowercase currency code e.g.
         * `EUR`, `USD`.
         */
        currency: Shared.Currency;
      }

      export interface Merchant {
        /**
         * The amount in the merchant's local currency.
         */
        amount: number;

        /**
         * ISO 4217 currency. Its enumerants are ISO 4217 currencies except for some
         * special currencies like `XXX`. Enumerants names are lowercase currency code e.g.
         * `EUR`, `USD`.
         */
        currency: Shared.Currency;
      }

      export interface Settlement {
        /**
         * The amount in the settlement currency.
         */
        amount: number;

        /**
         * Conversion rate used to convert the merchant amount to the settlement amount.
         */
        conversion_rate: string;

        /**
         * ISO 4217 currency. Its enumerants are ISO 4217 currencies except for some
         * special currencies like `XXX`. Enumerants names are lowercase currency code e.g.
         * `EUR`, `USD`.
         */
        currency: Shared.Currency;
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
}

export interface TransactionSimulateAuthorizationParams {
  /**
   * Amount (in cents) to authorize. For credit authorizations and financial credit
   * authorizations, any value entered will be converted into a negative amount in
   * the simulated transaction. For example, entering 100 in this field will appear
   * as a -100 amount in the transaction. For balance inquiries, this field must be
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
   * 3-digit alphabetic ISO 4217 currency code. Note: Simulator only accepts USD,
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
   * Type of event to simulate.
   *
   * - `AUTHORIZATION` is a dual message purchase authorization, meaning a subsequent
   *   clearing step is required to settle the transaction.
   * - `BALANCE_INQUIRY` is a $0 authorization that includes a request for the
   *   balance held on the card, and is most typically seen when a cardholder
   *   requests to view a card's balance at an ATM.
   * - `CREDIT_AUTHORIZATION` is a dual message request from a merchant to authorize
   *   a refund or credit, meaning a subsequent clearing step is required to settle
   *   the transaction.
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
   * The transaction token returned from the /v1/simulate/authorize response.
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
   * Amount (in cents) to complete. Typically this will match the original
   * authorization, but may be more or less.
   *
   * If no amount is supplied to this endpoint, the amount of the transaction will be
   * captured. Any transaction that has any amount completed at all do not have
   * access to this behavior.
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
   * Amount (in cents) to void. Typically this will match the original authorization,
   * but may be less.
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

export namespace Transactions {
  export import Transaction = TransactionsAPI.Transaction;
  export import TransactionSimulateAuthorizationResponse = TransactionsAPI.TransactionSimulateAuthorizationResponse;
  export import TransactionSimulateAuthorizationAdviceResponse = TransactionsAPI.TransactionSimulateAuthorizationAdviceResponse;
  export import TransactionSimulateClearingResponse = TransactionsAPI.TransactionSimulateClearingResponse;
  export import TransactionSimulateCreditAuthorizationResponse = TransactionsAPI.TransactionSimulateCreditAuthorizationResponse;
  export import TransactionSimulateReturnResponse = TransactionsAPI.TransactionSimulateReturnResponse;
  export import TransactionSimulateReturnReversalResponse = TransactionsAPI.TransactionSimulateReturnReversalResponse;
  export import TransactionSimulateVoidResponse = TransactionsAPI.TransactionSimulateVoidResponse;
  export import TransactionsCursorPage = TransactionsAPI.TransactionsCursorPage;
  export import TransactionListParams = TransactionsAPI.TransactionListParams;
  export import TransactionSimulateAuthorizationParams = TransactionsAPI.TransactionSimulateAuthorizationParams;
  export import TransactionSimulateAuthorizationAdviceParams = TransactionsAPI.TransactionSimulateAuthorizationAdviceParams;
  export import TransactionSimulateClearingParams = TransactionsAPI.TransactionSimulateClearingParams;
  export import TransactionSimulateCreditAuthorizationParams = TransactionsAPI.TransactionSimulateCreditAuthorizationParams;
  export import TransactionSimulateReturnParams = TransactionsAPI.TransactionSimulateReturnParams;
  export import TransactionSimulateReturnReversalParams = TransactionsAPI.TransactionSimulateReturnReversalParams;
  export import TransactionSimulateVoidParams = TransactionsAPI.TransactionSimulateVoidParams;
  export import EnhancedCommercialData = EnhancedCommercialDataAPI.EnhancedCommercialData;
  export import EnhancedCommercialDataRetrieveResponse = EnhancedCommercialDataAPI.EnhancedCommercialDataRetrieveResponse;
  export import Events = EventsAPI.Events;
}
