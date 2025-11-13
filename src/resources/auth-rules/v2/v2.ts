// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import * as V2API from './v2';
import * as BacktestsAPI from './backtests';
import {
  BacktestCreateParams,
  BacktestCreateResponse,
  BacktestResults,
  BacktestRetrieveParams,
  Backtests,
} from './backtests';
import { APIPromise } from '../../../core/api-promise';
import { CursorPage, type CursorPageParams, PagePromise } from '../../../core/pagination';
import { RequestOptions } from '../../../internal/request-options';
import { path } from '../../../internal/utils/path';

export class V2 extends APIResource {
  backtests: BacktestsAPI.Backtests = new BacktestsAPI.Backtests(this._client);

  /**
   * Creates a new V2 Auth rule in draft mode
   */
  create(body: V2CreateParams, options?: RequestOptions): APIPromise<V2CreateResponse> {
    return this._client.post('/v2/auth_rules', { body, ...options });
  }

  /**
   * Fetches a V2 Auth rule by its token
   */
  retrieve(authRuleToken: string, options?: RequestOptions): APIPromise<V2RetrieveResponse> {
    return this._client.get(path`/v2/auth_rules/${authRuleToken}`, options);
  }

  /**
   * Updates a V2 Auth rule's properties
   *
   * If `account_tokens`, `card_tokens`, `program_level`, or `excluded_card_tokens`
   * is provided, this will replace existing associations with the provided list of
   * entities.
   */
  update(
    authRuleToken: string,
    body: V2UpdateParams,
    options?: RequestOptions,
  ): APIPromise<V2UpdateResponse> {
    return this._client.patch(path`/v2/auth_rules/${authRuleToken}`, { body, ...options });
  }

  /**
   * Lists V2 Auth rules
   */
  list(
    query: V2ListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<V2ListResponsesCursorPage, V2ListResponse> {
    return this._client.getAPIList('/v2/auth_rules', CursorPage<V2ListResponse>, { query, ...options });
  }

  /**
   * Deletes a V2 Auth rule
   */
  delete(authRuleToken: string, options?: RequestOptions): APIPromise<void> {
    return this._client.delete(path`/v2/auth_rules/${authRuleToken}`, options);
  }

  /**
   * Creates a new draft version of a rule that will be ran in shadow mode.
   *
   * This can also be utilized to reset the draft parameters, causing a draft version
   * to no longer be ran in shadow mode.
   */
  draft(authRuleToken: string, body: V2DraftParams, options?: RequestOptions): APIPromise<V2DraftResponse> {
    return this._client.post(path`/v2/auth_rules/${authRuleToken}/draft`, { body, ...options });
  }

  /**
   * Promotes the draft version of an Auth rule to the currently active version such
   * that it is enforced in the respective stream.
   */
  promote(authRuleToken: string, options?: RequestOptions): APIPromise<V2PromoteResponse> {
    return this._client.post(path`/v2/auth_rules/${authRuleToken}/promote`, options);
  }

  /**
   * Fetches the current calculated Feature values for the given Auth Rule
   *
   * This only calculates the features for the active version.
   *
   * - VelocityLimit Rules calculates the current Velocity Feature data. This
   *   requires a `card_token` or `account_token` matching what the rule is Scoped
   *   to.
   * - ConditionalBlock Rules calculates the CARD*TRANSACTION_COUNT*\* attributes on
   *   the rule. This requires a `card_token`
   */
  retrieveFeatures(
    authRuleToken: string,
    query: V2RetrieveFeaturesParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<V2RetrieveFeaturesResponse> {
    return this._client.get(path`/v2/auth_rules/${authRuleToken}/features`, { query, ...options });
  }

  /**
   * Retrieves a performance report for an Auth rule containing daily statistics and
   * evaluation outcomes.
   *
   * **Time Range Limitations:**
   *
   * - Reports are supported for the past 3 months only
   * - Maximum interval length is 1 month
   * - Report data is available only through the previous day in UTC (current day
   *   data is not available)
   *
   * The report provides daily statistics for both current and draft versions of the
   * Auth rule, including approval, decline, and challenge counts along with sample
   * events.
   */
  retrieveReport(
    authRuleToken: string,
    query: V2RetrieveReportParams,
    options?: RequestOptions,
  ): APIPromise<V2RetrieveReportResponse> {
    return this._client.get(path`/v2/auth_rules/${authRuleToken}/report`, { query, ...options });
  }
}

export type V2ListResponsesCursorPage = CursorPage<V2ListResponse>;

export interface AuthRule {
  /**
   * Globally unique identifier.
   */
  token: string;

  /**
   * Indicates whether the Auth Rule is ACTIVE or INACTIVE
   */
  state: 'ACTIVE' | 'INACTIVE';

  /**
   * Array of account_token(s) identifying the accounts that the Auth Rule applies
   * to. Note that only this field or `card_tokens` can be provided for a given Auth
   * Rule.
   */
  account_tokens?: Array<string>;

  /**
   * Countries in which the Auth Rule permits transactions. Note that Lithic
   * maintains a list of countries in which all transactions are blocked; "allowing"
   * those countries in an Auth Rule does not override the Lithic-wide restrictions.
   */
  allowed_countries?: Array<string>;

  /**
   * Merchant category codes for which the Auth Rule permits transactions.
   */
  allowed_mcc?: Array<string>;

  /**
   * Countries in which the Auth Rule automatically declines transactions.
   */
  blocked_countries?: Array<string>;

  /**
   * Merchant category codes for which the Auth Rule automatically declines
   * transactions.
   */
  blocked_mcc?: Array<string>;

  /**
   * Array of card_token(s) identifying the cards that the Auth Rule applies to. Note
   * that only this field or `account_tokens` can be provided for a given Auth Rule.
   */
  card_tokens?: Array<string>;

  /**
   * Boolean indicating whether the Auth Rule is applied at the program level.
   */
  program_level?: boolean;
}

export interface AuthRuleCondition {
  /**
   * The attribute to target.
   *
   * The following attributes may be targeted:
   *
   * - `MCC`: A four-digit number listed in ISO 18245. An MCC is used to classify a
   *   business by the types of goods or services it provides.
   * - `COUNTRY`: Country of entity of card acceptor. Possible values are: (1) all
   *   ISO 3166-1 alpha-3 country codes, (2) QZZ for Kosovo, and (3) ANT for
   *   Netherlands Antilles.
   * - `CURRENCY`: 3-character alphabetic ISO 4217 code for the merchant currency of
   *   the transaction.
   * - `MERCHANT_ID`: Unique alphanumeric identifier for the payment card acceptor
   *   (merchant).
   * - `DESCRIPTOR`: Short description of card acceptor.
   * - `LIABILITY_SHIFT`: Indicates whether chargeback liability shift to the issuer
   *   applies to the transaction. Valid values are `NONE`, `3DS_AUTHENTICATED`, or
   *   `TOKEN_AUTHENTICATED`.
   * - `PAN_ENTRY_MODE`: The method by which the cardholder's primary account number
   *   (PAN) was entered. Valid values are `AUTO_ENTRY`, `BAR_CODE`, `CONTACTLESS`,
   *   `ECOMMERCE`, `ERROR_KEYED`, `ERROR_MAGNETIC_STRIPE`, `ICC`, `KEY_ENTERED`,
   *   `MAGNETIC_STRIPE`, `MANUAL`, `OCR`, `SECURE_CARDLESS`, `UNSPECIFIED`,
   *   `UNKNOWN`, `CREDENTIAL_ON_FILE`, or `ECOMMERCE`.
   * - `TRANSACTION_AMOUNT`: The base transaction amount (in cents) plus the acquirer
   *   fee field in the settlement/cardholder billing currency. This is the amount
   *   the issuer should authorize against unless the issuer is paying the acquirer
   *   fee on behalf of the cardholder.
   * - `RISK_SCORE`: Network-provided score assessing risk level associated with a
   *   given authorization. Scores are on a range of 0-999, with 0 representing the
   *   lowest risk and 999 representing the highest risk. For Visa transactions,
   *   where the raw score has a range of 0-99, Lithic will normalize the score by
   *   multiplying the raw score by 10x.
   * - `CARD_TRANSACTION_COUNT_15M`: The number of transactions on the card in the
   *   trailing 15 minutes before the authorization.
   * - `CARD_TRANSACTION_COUNT_1H`: The number of transactions on the card in the
   *   trailing hour up and until the authorization.
   * - `CARD_TRANSACTION_COUNT_24H`: The number of transactions on the card in the
   *   trailing 24 hours up and until the authorization.
   * - `CARD_STATE`: The current state of the card associated with the transaction.
   *   Valid values are `CLOSED`, `OPEN`, `PAUSED`, `PENDING_ACTIVATION`,
   *   `PENDING_FULFILLMENT`.
   * - `PIN_ENTERED`: Indicates whether a PIN was entered during the transaction.
   *   Valid values are `TRUE`, `FALSE`.
   * - `PIN_STATUS`: The current state of card's PIN. Valid values are `NOT_SET`,
   *   `OK`, `BLOCKED`.
   * - `WALLET_TYPE`: For transactions using a digital wallet token, indicates the
   *   source of the token. Valid values are `APPLE_PAY`, `GOOGLE_PAY`,
   *   `SAMSUNG_PAY`, `MASTERPASS`, `MERCHANT`, `OTHER`, `NONE`.
   * - `ADDRESS_MATCH`: Lithic's evaluation result comparing transaction's address
   *   data with the cardholder KYC data if it exists. Valid values are `MATCH`,
   *   `MATCH_ADDRESS_ONLY`, `MATCH_ZIP_ONLY`,`MISMATCH`,`NOT_PRESENT`.
   */
  attribute: ConditionalAttribute;

  /**
   * The operation to apply to the attribute
   */
  operation: ConditionalOperation;

  /**
   * A regex string, to be used with `MATCHES` or `DOES_NOT_MATCH`
   */
  value: ConditionalValue;
}

export interface Conditional3DSActionParameters {
  /**
   * The action to take if the conditions are met.
   */
  action: 'DECLINE' | 'CHALLENGE';

  conditions: Array<Conditional3DSActionParameters.Condition>;
}

export namespace Conditional3DSActionParameters {
  export interface Condition {
    /**
     * The attribute to target.
     *
     * The following attributes may be targeted:
     *
     * - `MCC`: A four-digit number listed in ISO 18245. An MCC is used to classify a
     *   business by the types of goods or services it provides.
     * - `COUNTRY`: Country of entity of card acceptor. Possible values are: (1) all
     *   ISO 3166-1 alpha-3 country codes, (2) QZZ for Kosovo, and (3) ANT for
     *   Netherlands Antilles.
     * - `CURRENCY`: 3-character alphabetic ISO 4217 code for the merchant currency of
     *   the transaction.
     * - `MERCHANT_ID`: Unique alphanumeric identifier for the payment card acceptor
     *   (merchant).
     * - `DESCRIPTOR`: Short description of card acceptor.
     * - `TRANSACTION_AMOUNT`: The base transaction amount (in cents) plus the acquirer
     *   fee field in the settlement/cardholder billing currency. This is the amount
     *   the issuer should authorize against unless the issuer is paying the acquirer
     *   fee on behalf of the cardholder.
     * - `RISK_SCORE`: Mastercard only: Assessment by the network of the authentication
     *   risk level, with a higher value indicating a higher amount of risk.
     * - `MESSAGE_CATEGORY`: The category of the authentication being processed.
     * - `ADDRESS_MATCH`: Lithic's evaluation result comparing transaction's address
     *   data with the cardholder KYC data if it exists. Valid values are `MATCH`,
     *   `MATCH_ADDRESS_ONLY`, `MATCH_ZIP_ONLY`,`MISMATCH`,`NOT_PRESENT`.
     */
    attribute:
      | 'MCC'
      | 'COUNTRY'
      | 'CURRENCY'
      | 'MERCHANT_ID'
      | 'DESCRIPTOR'
      | 'TRANSACTION_AMOUNT'
      | 'RISK_SCORE'
      | 'MESSAGE_CATEGORY'
      | 'ADDRESS_MATCH';

    /**
     * The operation to apply to the attribute
     */
    operation: V2API.ConditionalOperation;

    /**
     * A regex string, to be used with `MATCHES` or `DOES_NOT_MATCH`
     */
    value: V2API.ConditionalValue;
  }
}

export interface ConditionalACHActionParameters {
  /**
   * The action to take if the conditions are met
   */
  action: ConditionalACHActionParameters.ApproveAction | ConditionalACHActionParameters.ReturnAction;

  conditions: Array<ConditionalACHActionParameters.Condition>;
}

export namespace ConditionalACHActionParameters {
  export interface ApproveAction {
    /**
     * Approve the ACH transaction
     */
    type: 'APPROVE';
  }

  export interface ReturnAction {
    /**
     * NACHA return code to use when returning the transaction. Note that the list of
     * available return codes is subject to an allowlist configured at the program
     * level
     */
    code:
      | 'R01'
      | 'R02'
      | 'R03'
      | 'R04'
      | 'R05'
      | 'R06'
      | 'R07'
      | 'R08'
      | 'R09'
      | 'R10'
      | 'R11'
      | 'R12'
      | 'R13'
      | 'R14'
      | 'R15'
      | 'R16'
      | 'R17'
      | 'R18'
      | 'R19'
      | 'R20'
      | 'R21'
      | 'R22'
      | 'R23'
      | 'R24'
      | 'R25'
      | 'R26'
      | 'R27'
      | 'R28'
      | 'R29'
      | 'R30'
      | 'R31'
      | 'R32'
      | 'R33'
      | 'R34'
      | 'R35'
      | 'R36'
      | 'R37'
      | 'R38'
      | 'R39'
      | 'R40'
      | 'R41'
      | 'R42'
      | 'R43'
      | 'R44'
      | 'R45'
      | 'R46'
      | 'R47'
      | 'R50'
      | 'R51'
      | 'R52'
      | 'R53'
      | 'R61'
      | 'R62'
      | 'R67'
      | 'R68'
      | 'R69'
      | 'R70'
      | 'R71'
      | 'R72'
      | 'R73'
      | 'R74'
      | 'R75'
      | 'R76'
      | 'R77'
      | 'R80'
      | 'R81'
      | 'R82'
      | 'R83'
      | 'R84'
      | 'R85';

    /**
     * Return the ACH transaction
     */
    type: 'RETURN';
  }

  export interface Condition {
    /**
     * The attribute to target.
     *
     * The following attributes may be targeted:
     *
     * - `COMPANY_NAME`: The name of the company initiating the ACH transaction.
     * - `COMPANY_ID`: The company ID (also known as Standard Entry Class (SEC) Company
     *   ID) of the entity initiating the ACH transaction.
     * - `TIMESTAMP`: The timestamp of the ACH transaction in ISO 8601 format.
     * - `TRANSACTION_AMOUNT`: The amount of the ACH transaction in minor units
     *   (cents).
     * - `SEC_CODE`: Standard Entry Class code indicating the type of ACH transaction.
     *   Valid values include PPD (Prearranged Payment and Deposit Entry), CCD
     *   (Corporate Credit or Debit Entry), WEB (Internet-Initiated/Mobile Entry), TEL
     *   (Telephone-Initiated Entry), and others.
     * - `MEMO`: Optional memo or description field included with the ACH transaction.
     */
    attribute: 'COMPANY_NAME' | 'COMPANY_ID' | 'TIMESTAMP' | 'TRANSACTION_AMOUNT' | 'SEC_CODE' | 'MEMO';

    /**
     * The operation to apply to the attribute
     */
    operation: V2API.ConditionalOperation;

    /**
     * A regex string, to be used with `MATCHES` or `DOES_NOT_MATCH`
     */
    value: V2API.ConditionalValue;
  }
}

/**
 * The attribute to target.
 *
 * The following attributes may be targeted:
 *
 * - `MCC`: A four-digit number listed in ISO 18245. An MCC is used to classify a
 *   business by the types of goods or services it provides.
 * - `COUNTRY`: Country of entity of card acceptor. Possible values are: (1) all
 *   ISO 3166-1 alpha-3 country codes, (2) QZZ for Kosovo, and (3) ANT for
 *   Netherlands Antilles.
 * - `CURRENCY`: 3-character alphabetic ISO 4217 code for the merchant currency of
 *   the transaction.
 * - `MERCHANT_ID`: Unique alphanumeric identifier for the payment card acceptor
 *   (merchant).
 * - `DESCRIPTOR`: Short description of card acceptor.
 * - `LIABILITY_SHIFT`: Indicates whether chargeback liability shift to the issuer
 *   applies to the transaction. Valid values are `NONE`, `3DS_AUTHENTICATED`, or
 *   `TOKEN_AUTHENTICATED`.
 * - `PAN_ENTRY_MODE`: The method by which the cardholder's primary account number
 *   (PAN) was entered. Valid values are `AUTO_ENTRY`, `BAR_CODE`, `CONTACTLESS`,
 *   `ECOMMERCE`, `ERROR_KEYED`, `ERROR_MAGNETIC_STRIPE`, `ICC`, `KEY_ENTERED`,
 *   `MAGNETIC_STRIPE`, `MANUAL`, `OCR`, `SECURE_CARDLESS`, `UNSPECIFIED`,
 *   `UNKNOWN`, `CREDENTIAL_ON_FILE`, or `ECOMMERCE`.
 * - `TRANSACTION_AMOUNT`: The base transaction amount (in cents) plus the acquirer
 *   fee field in the settlement/cardholder billing currency. This is the amount
 *   the issuer should authorize against unless the issuer is paying the acquirer
 *   fee on behalf of the cardholder.
 * - `RISK_SCORE`: Network-provided score assessing risk level associated with a
 *   given authorization. Scores are on a range of 0-999, with 0 representing the
 *   lowest risk and 999 representing the highest risk. For Visa transactions,
 *   where the raw score has a range of 0-99, Lithic will normalize the score by
 *   multiplying the raw score by 10x.
 * - `CARD_TRANSACTION_COUNT_15M`: The number of transactions on the card in the
 *   trailing 15 minutes before the authorization.
 * - `CARD_TRANSACTION_COUNT_1H`: The number of transactions on the card in the
 *   trailing hour up and until the authorization.
 * - `CARD_TRANSACTION_COUNT_24H`: The number of transactions on the card in the
 *   trailing 24 hours up and until the authorization.
 * - `CARD_STATE`: The current state of the card associated with the transaction.
 *   Valid values are `CLOSED`, `OPEN`, `PAUSED`, `PENDING_ACTIVATION`,
 *   `PENDING_FULFILLMENT`.
 * - `PIN_ENTERED`: Indicates whether a PIN was entered during the transaction.
 *   Valid values are `TRUE`, `FALSE`.
 * - `PIN_STATUS`: The current state of card's PIN. Valid values are `NOT_SET`,
 *   `OK`, `BLOCKED`.
 * - `WALLET_TYPE`: For transactions using a digital wallet token, indicates the
 *   source of the token. Valid values are `APPLE_PAY`, `GOOGLE_PAY`,
 *   `SAMSUNG_PAY`, `MASTERPASS`, `MERCHANT`, `OTHER`, `NONE`.
 * - `ADDRESS_MATCH`: Lithic's evaluation result comparing transaction's address
 *   data with the cardholder KYC data if it exists. Valid values are `MATCH`,
 *   `MATCH_ADDRESS_ONLY`, `MATCH_ZIP_ONLY`,`MISMATCH`,`NOT_PRESENT`.
 */
export type ConditionalAttribute =
  | 'MCC'
  | 'COUNTRY'
  | 'CURRENCY'
  | 'MERCHANT_ID'
  | 'DESCRIPTOR'
  | 'LIABILITY_SHIFT'
  | 'PAN_ENTRY_MODE'
  | 'TRANSACTION_AMOUNT'
  | 'RISK_SCORE'
  | 'CARD_TRANSACTION_COUNT_15M'
  | 'CARD_TRANSACTION_COUNT_1H'
  | 'CARD_TRANSACTION_COUNT_24H'
  | 'CARD_STATE'
  | 'PIN_ENTERED'
  | 'PIN_STATUS'
  | 'WALLET_TYPE'
  | 'ADDRESS_MATCH';

export interface ConditionalAuthorizationActionParameters {
  /**
   * The action to take if the conditions are met.
   */
  action: 'DECLINE' | 'CHALLENGE';

  conditions: Array<ConditionalAuthorizationActionParameters.Condition>;
}

export namespace ConditionalAuthorizationActionParameters {
  export interface Condition {
    /**
     * The attribute to target.
     *
     * The following attributes may be targeted:
     *
     * - `MCC`: A four-digit number listed in ISO 18245. An MCC is used to classify a
     *   business by the types of goods or services it provides.
     * - `COUNTRY`: Country of entity of card acceptor. Possible values are: (1) all
     *   ISO 3166-1 alpha-3 country codes, (2) QZZ for Kosovo, and (3) ANT for
     *   Netherlands Antilles.
     * - `CURRENCY`: 3-character alphabetic ISO 4217 code for the merchant currency of
     *   the transaction.
     * - `MERCHANT_ID`: Unique alphanumeric identifier for the payment card acceptor
     *   (merchant).
     * - `DESCRIPTOR`: Short description of card acceptor.
     * - `LIABILITY_SHIFT`: Indicates whether chargeback liability shift to the issuer
     *   applies to the transaction. Valid values are `NONE`, `3DS_AUTHENTICATED`, or
     *   `TOKEN_AUTHENTICATED`.
     * - `PAN_ENTRY_MODE`: The method by which the cardholder's primary account number
     *   (PAN) was entered. Valid values are `AUTO_ENTRY`, `BAR_CODE`, `CONTACTLESS`,
     *   `ECOMMERCE`, `ERROR_KEYED`, `ERROR_MAGNETIC_STRIPE`, `ICC`, `KEY_ENTERED`,
     *   `MAGNETIC_STRIPE`, `MANUAL`, `OCR`, `SECURE_CARDLESS`, `UNSPECIFIED`,
     *   `UNKNOWN`, `CREDENTIAL_ON_FILE`, or `ECOMMERCE`.
     * - `TRANSACTION_AMOUNT`: The base transaction amount (in cents) plus the acquirer
     *   fee field in the settlement/cardholder billing currency. This is the amount
     *   the issuer should authorize against unless the issuer is paying the acquirer
     *   fee on behalf of the cardholder.
     * - `CASH_AMOUNT`: The cash amount of the transaction in minor units (cents). This
     *   represents the amount of cash being withdrawn or advanced.
     * - `RISK_SCORE`: Network-provided score assessing risk level associated with a
     *   given authorization. Scores are on a range of 0-999, with 0 representing the
     *   lowest risk and 999 representing the highest risk. For Visa transactions,
     *   where the raw score has a range of 0-99, Lithic will normalize the score by
     *   multiplying the raw score by 10x.
     * - `CARD_TRANSACTION_COUNT_15M`: The number of transactions on the card in the
     *   trailing 15 minutes before the authorization.
     * - `CARD_TRANSACTION_COUNT_1H`: The number of transactions on the card in the
     *   trailing hour up and until the authorization.
     * - `CARD_TRANSACTION_COUNT_24H`: The number of transactions on the card in the
     *   trailing 24 hours up and until the authorization.
     * - `CARD_STATE`: The current state of the card associated with the transaction.
     *   Valid values are `CLOSED`, `OPEN`, `PAUSED`, `PENDING_ACTIVATION`,
     *   `PENDING_FULFILLMENT`.
     * - `PIN_ENTERED`: Indicates whether a PIN was entered during the transaction.
     *   Valid values are `TRUE`, `FALSE`.
     * - `PIN_STATUS`: The current state of card's PIN. Valid values are `NOT_SET`,
     *   `OK`, `BLOCKED`.
     * - `WALLET_TYPE`: For transactions using a digital wallet token, indicates the
     *   source of the token. Valid values are `APPLE_PAY`, `GOOGLE_PAY`,
     *   `SAMSUNG_PAY`, `MASTERPASS`, `MERCHANT`, `OTHER`, `NONE`.
     * - `TRANSACTION_INITIATOR`: The entity that initiated the transaction indicates
     *   the source of the token. Valid values are `CARDHOLDER`, `MERCHANT`, `UNKNOWN`.
     * - `ADDRESS_MATCH`: Lithic's evaluation result comparing transaction's address
     *   data with the cardholder KYC data if it exists. Valid values are `MATCH`,
     *   `MATCH_ADDRESS_ONLY`, `MATCH_ZIP_ONLY`,`MISMATCH`,`NOT_PRESENT`.
     */
    attribute:
      | 'MCC'
      | 'COUNTRY'
      | 'CURRENCY'
      | 'MERCHANT_ID'
      | 'DESCRIPTOR'
      | 'LIABILITY_SHIFT'
      | 'PAN_ENTRY_MODE'
      | 'TRANSACTION_AMOUNT'
      | 'CASH_AMOUNT'
      | 'RISK_SCORE'
      | 'CARD_TRANSACTION_COUNT_15M'
      | 'CARD_TRANSACTION_COUNT_1H'
      | 'CARD_TRANSACTION_COUNT_24H'
      | 'CARD_STATE'
      | 'PIN_ENTERED'
      | 'PIN_STATUS'
      | 'WALLET_TYPE'
      | 'TRANSACTION_INITIATOR'
      | 'ADDRESS_MATCH';

    /**
     * The operation to apply to the attribute
     */
    operation: V2API.ConditionalOperation;

    /**
     * A regex string, to be used with `MATCHES` or `DOES_NOT_MATCH`
     */
    value: V2API.ConditionalValue;
  }
}

export interface ConditionalBlockParameters {
  conditions: Array<AuthRuleCondition>;
}

/**
 * The operation to apply to the attribute
 */
export type ConditionalOperation =
  | 'IS_ONE_OF'
  | 'IS_NOT_ONE_OF'
  | 'MATCHES'
  | 'DOES_NOT_MATCH'
  | 'IS_EQUAL_TO'
  | 'IS_NOT_EQUAL_TO'
  | 'IS_GREATER_THAN'
  | 'IS_GREATER_THAN_OR_EQUAL_TO'
  | 'IS_LESS_THAN'
  | 'IS_LESS_THAN_OR_EQUAL_TO';

export interface ConditionalTokenizationActionParameters {
  /**
   * The action to take if the conditions are met
   */
  action:
    | ConditionalTokenizationActionParameters.DeclineAction
    | ConditionalTokenizationActionParameters.RequireTfaAction;

  conditions: Array<ConditionalTokenizationActionParameters.Condition>;
}

export namespace ConditionalTokenizationActionParameters {
  export interface DeclineAction {
    /**
     * Decline the tokenization request
     */
    type: 'DECLINE';

    /**
     * Reason code for declining the tokenization request
     */
    reason?:
      | 'ACCOUNT_SCORE_1'
      | 'DEVICE_SCORE_1'
      | 'ALL_WALLET_DECLINE_REASONS_PRESENT'
      | 'WALLET_RECOMMENDED_DECISION_RED'
      | 'CVC_MISMATCH'
      | 'CARD_EXPIRY_MONTH_MISMATCH'
      | 'CARD_EXPIRY_YEAR_MISMATCH'
      | 'CARD_INVALID_STATE'
      | 'CUSTOMER_RED_PATH'
      | 'INVALID_CUSTOMER_RESPONSE'
      | 'NETWORK_FAILURE'
      | 'GENERIC_DECLINE'
      | 'DIGITAL_CARD_ART_REQUIRED';
  }

  export interface RequireTfaAction {
    /**
     * Require two-factor authentication for the tokenization request
     */
    type: 'REQUIRE_TFA';

    /**
     * Reason code for requiring two-factor authentication
     */
    reason?:
      | 'WALLET_RECOMMENDED_TFA'
      | 'SUSPICIOUS_ACTIVITY'
      | 'DEVICE_RECENTLY_LOST'
      | 'TOO_MANY_RECENT_ATTEMPTS'
      | 'TOO_MANY_RECENT_TOKENS'
      | 'TOO_MANY_DIFFERENT_CARDHOLDERS'
      | 'OUTSIDE_HOME_TERRITORY'
      | 'HAS_SUSPENDED_TOKENS'
      | 'HIGH_RISK'
      | 'ACCOUNT_SCORE_LOW'
      | 'DEVICE_SCORE_LOW'
      | 'CARD_STATE_TFA'
      | 'HARDCODED_TFA'
      | 'CUSTOMER_RULE_TFA'
      | 'DEVICE_HOST_CARD_EMULATION';
  }

  export interface Condition {
    /**
     * The attribute to target.
     *
     * The following attributes may be targeted:
     *
     * - `TIMESTAMP`: The timestamp of the tokenization request in ISO 8601 format.
     * - `TOKENIZATION_CHANNEL`: The channel through which the tokenization request was
     *   initiated (e.g., DIGITAL_WALLET, ECOMMERCE).
     * - `TOKENIZATION_SOURCE`: The source of the tokenization request.
     * - `TOKEN_REQUESTOR_NAME`: The name of the entity requesting the token. Valid
     *   values are `ALT_ID`, `AMAZON_ONE`, `AMERICAN_EXPRESS_TOKEN_SERVICE`,
     *   `ANDROID_PAY`, `APPLE_PAY`, `FACEBOOK`, `FITBIT_PAY`, `GARMIN_PAY`,
     *   `GOOGLE_PAY`, `GOOGLE_VCN`, `ISSUER_HCE`, `MICROSOFT_PAY`, `NETFLIX`,
     *   `SAMSUNG_PAY`, `UNKNOWN`, `VISA_CHECKOUT`.
     * - `WALLET_ACCOUNT_SCORE`: Risk score for the account in the digital wallet.
     *   Numeric value where lower numbers indicate higher risk (e.g., 1 = high risk, 2
     *   = medium risk).
     * - `WALLET_DEVICE_SCORE`: Risk score for the device in the digital wallet.
     *   Numeric value where lower numbers indicate higher risk (e.g., 1 = high risk, 2
     *   = medium risk).
     * - `WALLET_RECOMMENDED_DECISION`: The decision recommended by the digital wallet
     *   provider. Valid values include APPROVE, DECLINE,
     *   REQUIRE_ADDITIONAL_AUTHENTICATION.
     * - `TOKEN_REQUESTOR_ID`: Unique identifier for the entity requesting the token.
     * - `WALLET_TOKEN_STATUS`: The current status of the wallet token.
     */
    attribute:
      | 'TIMESTAMP'
      | 'TOKENIZATION_CHANNEL'
      | 'TOKENIZATION_SOURCE'
      | 'TOKEN_REQUESTOR_NAME'
      | 'WALLET_ACCOUNT_SCORE'
      | 'WALLET_DEVICE_SCORE'
      | 'WALLET_RECOMMENDED_DECISION'
      | 'TOKEN_REQUESTOR_ID'
      | 'WALLET_TOKEN_STATUS';

    /**
     * The operation to apply to the attribute
     */
    operation: V2API.ConditionalOperation;

    /**
     * A regex string, to be used with `MATCHES` or `DOES_NOT_MATCH`
     */
    value: V2API.ConditionalValue;
  }
}

/**
 * A regex string, to be used with `MATCHES` or `DOES_NOT_MATCH`
 */
export type ConditionalValue = string | number | Array<string>;

export interface MerchantLockParameters {
  /**
   * A list of merchant locks defining specific merchants or groups of merchants
   * (based on descriptors or IDs) that the lock applies to.
   */
  merchants: Array<MerchantLockParameters.Merchant>;
}

export namespace MerchantLockParameters {
  /**
   * Represents a specific merchant lock based on their ID or descriptor. Each
   * merchant object allows transaction rules to work at a granular level and
   * requires at least one of merchant_id or descriptor.
   */
  export interface Merchant {
    /**
     * A comment or explanation about the merchant, used internally for rule management
     * purposes.
     */
    comment?: string;

    /**
     * Short description of the merchant, often used to provide more human-readable
     * context about the transaction merchant. This is typically the name or label
     * shown on transaction summaries.
     */
    descriptor?: string;

    /**
     * Unique alphanumeric identifier for the payment card acceptor (merchant). This
     * attribute specifies the merchant entity that will be locked or referenced for
     * authorization rules.
     */
    merchant_id?: string;
  }
}

export interface RuleStats {
  /**
   * The total number of historical transactions approved by this rule during the
   * relevant period, or the number of transactions that would have been approved if
   * the rule was evaluated in shadow mode.
   */
  approved?: number;

  /**
   * The total number of historical transactions challenged by this rule during the
   * relevant period, or the number of transactions that would have been challenged
   * if the rule was evaluated in shadow mode. Currently applicable only for 3DS Auth
   * Rules.
   */
  challenged?: number;

  /**
   * The total number of historical transactions declined by this rule during the
   * relevant period, or the number of transactions that would have been declined if
   * the rule was evaluated in shadow mode.
   */
  declined?: number;

  /**
   * Example events and their outcomes.
   */
  examples?: Array<RuleStats.Example>;

  /**
   * The version of the rule, this is incremented whenever the rule's parameters
   * change.
   */
  version?: number;
}

export namespace RuleStats {
  export interface Example {
    /**
     * Whether the rule would have approved the request.
     */
    approved?: boolean;

    /**
     * The decision made by the rule for this event.
     */
    decision?: 'APPROVED' | 'DECLINED' | 'CHALLENGED';

    /**
     * The event token.
     */
    event_token?: string;

    /**
     * The timestamp of the event.
     */
    timestamp?: string;
  }
}

export interface VelocityLimitParams {
  filters: VelocityLimitParams.Filters;

  /**
   * Velocity over the current day since 00:00 / 12 AM in Eastern Time
   */
  period: VelocityLimitPeriod;

  /**
   * The scope the velocity is calculated for
   */
  scope: 'CARD' | 'ACCOUNT';

  /**
   * The maximum amount of spend velocity allowed in the period in minor units (the
   * smallest unit of a currency, e.g. cents for USD). Transactions exceeding this
   * limit will be declined.
   */
  limit_amount?: number | null;

  /**
   * The number of spend velocity impacting transactions may not exceed this limit in
   * the period. Transactions exceeding this limit will be declined. A spend velocity
   * impacting transaction is a transaction that has been authorized, and optionally
   * settled, or a force post (a transaction that settled without prior
   * authorization).
   */
  limit_count?: number | null;
}

export namespace VelocityLimitParams {
  export interface Filters {
    /**
     * ISO-3166-1 alpha-3 Country Codes to exclude from the velocity calculation.
     * Transactions matching any of the provided will be excluded from the calculated
     * velocity.
     */
    exclude_countries?: Array<string> | null;

    /**
     * Merchant Category Codes to exclude from the velocity calculation. Transactions
     * matching this MCC will be excluded from the calculated velocity.
     */
    exclude_mccs?: Array<string> | null;

    /**
     * ISO-3166-1 alpha-3 Country Codes to include in the velocity calculation.
     * Transactions not matching any of the provided will not be included in the
     * calculated velocity.
     */
    include_countries?: Array<string> | null;

    /**
     * Merchant Category Codes to include in the velocity calculation. Transactions not
     * matching this MCC will not be included in the calculated velocity.
     */
    include_mccs?: Array<string> | null;

    /**
     * PAN entry modes to include in the velocity calculation. Transactions not
     * matching any of the provided will not be included in the calculated velocity.
     */
    include_pan_entry_modes?: Array<
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
      | 'UNSPECIFIED'
      | 'UNKNOWN'
    > | null;
  }
}

/**
 * Velocity over the current day since 00:00 / 12 AM in Eastern Time
 */
export type VelocityLimitPeriod =
  | VelocityLimitPeriod.TrailingWindowObject
  | VelocityLimitPeriod.FixedWindowDay
  | VelocityLimitPeriod.FixedWindowWeek
  | VelocityLimitPeriod.FixedWindowMonth
  | VelocityLimitPeriod.FixedWindowYear;

export namespace VelocityLimitPeriod {
  export interface TrailingWindowObject {
    /**
     * The size of the trailing window to calculate Spend Velocity over in seconds. The
     * minimum value is 10 seconds, and the maximum value is 2678400 seconds (31 days).
     */
    duration: number;

    type: 'CUSTOM';
  }

  /**
   * Velocity over the current day since 00:00 / 12 AM in Eastern Time
   */
  export interface FixedWindowDay {
    type: 'DAY';
  }

  /**
   * Velocity over the current week since 00:00 / 12 AM in Eastern Time on specified
   * `day_of_week`
   */
  export interface FixedWindowWeek {
    type: 'WEEK';

    /**
     * The day of the week to start the week from. Following ISO-8601, 1 is Monday and
     * 7 is Sunday. Defaults to Monday if not specified.
     */
    day_of_week?: number;
  }

  /**
   * Velocity over the current month since 00:00 / 12 AM in Eastern Time on specified
   * `day_of_month`.
   */
  export interface FixedWindowMonth {
    type: 'MONTH';

    /**
     * The day of the month to start from. Accepts values from 1 to 31, and will reset
     * at the end of the month if the day exceeds the number of days in the month.
     * Defaults to the 1st of the month if not specified.
     */
    day_of_month?: number;
  }

  /**
   * Velocity over the current year since 00:00 / 12 AM in Eastern Time on specified
   * `month` and `day_of_month`. This validates the month and day of the year to
   * start from is a real date. In the event that February 29th is selected, in
   * non-leap years, the window will start from February 28th.
   */
  export interface FixedWindowYear {
    type: 'YEAR';

    /**
     * The day of the month to start from. Defaults to the 1st of the month if not
     * specified.
     */
    day_of_month?: number;

    /**
     * The month to start from. 1 is January and 12 is December. Defaults to January if
     * not specified.
     */
    month?: number;
  }
}

export interface V2CreateResponse {
  /**
   * Auth Rule Token
   */
  token: string;

  /**
   * Account tokens to which the Auth Rule applies.
   */
  account_tokens: Array<string>;

  /**
   * Business Account tokens to which the Auth Rule applies.
   */
  business_account_tokens: Array<string>;

  /**
   * Card tokens to which the Auth Rule applies.
   */
  card_tokens: Array<string>;

  current_version: V2CreateResponse.CurrentVersion | null;

  draft_version: V2CreateResponse.DraftVersion | null;

  /**
   * The event stream during which the rule will be evaluated.
   */
  event_stream:
    | 'AUTHORIZATION'
    | 'THREE_DS_AUTHENTICATION'
    | 'TOKENIZATION'
    | 'ACH_CREDIT_RECEIPT'
    | 'ACH_DEBIT_RECEIPT';

  /**
   * Indicates whether this auth rule is managed by Lithic. If true, the rule cannot
   * be modified or deleted by the user
   */
  lithic_managed: boolean;

  /**
   * Auth Rule Name
   */
  name: string | null;

  /**
   * Whether the Auth Rule applies to all authorizations on the card program.
   */
  program_level: boolean;

  /**
   * The state of the Auth Rule
   */
  state: 'ACTIVE' | 'INACTIVE';

  /**
   * The type of Auth Rule. For certain rule types, this determines the event stream
   * during which it will be evaluated. For rules that can be applied to one of
   * several event streams, the effective one is defined by the separate
   * `event_stream` field.
   *
   * - `CONDITIONAL_BLOCK`: AUTHORIZATION event stream.
   * - `VELOCITY_LIMIT`: AUTHORIZATION event stream.
   * - `MERCHANT_LOCK`: AUTHORIZATION event stream.
   * - `CONDITIONAL_ACTION`: AUTHORIZATION, THREE_DS_AUTHENTICATION, TOKENIZATION,
   *   ACH_CREDIT_RECEIPT, or ACH_DEBIT_RECEIPT event stream.
   */
  type: 'CONDITIONAL_BLOCK' | 'VELOCITY_LIMIT' | 'MERCHANT_LOCK' | 'CONDITIONAL_ACTION';

  /**
   * Card tokens to which the Auth Rule does not apply.
   */
  excluded_card_tokens?: Array<string>;
}

export namespace V2CreateResponse {
  export interface CurrentVersion {
    /**
     * Parameters for the Auth Rule
     */
    parameters:
      | V2API.ConditionalBlockParameters
      | V2API.VelocityLimitParams
      | V2API.MerchantLockParameters
      | V2API.Conditional3DSActionParameters
      | V2API.ConditionalAuthorizationActionParameters
      | V2API.ConditionalACHActionParameters
      | V2API.ConditionalTokenizationActionParameters;

    /**
     * The version of the rule, this is incremented whenever the rule's parameters
     * change.
     */
    version: number;
  }

  export interface DraftVersion {
    /**
     * Parameters for the Auth Rule
     */
    parameters:
      | V2API.ConditionalBlockParameters
      | V2API.VelocityLimitParams
      | V2API.MerchantLockParameters
      | V2API.Conditional3DSActionParameters
      | V2API.ConditionalAuthorizationActionParameters
      | V2API.ConditionalACHActionParameters
      | V2API.ConditionalTokenizationActionParameters;

    /**
     * The version of the rule, this is incremented whenever the rule's parameters
     * change.
     */
    version: number;
  }
}

export interface V2RetrieveResponse {
  /**
   * Auth Rule Token
   */
  token: string;

  /**
   * Account tokens to which the Auth Rule applies.
   */
  account_tokens: Array<string>;

  /**
   * Business Account tokens to which the Auth Rule applies.
   */
  business_account_tokens: Array<string>;

  /**
   * Card tokens to which the Auth Rule applies.
   */
  card_tokens: Array<string>;

  current_version: V2RetrieveResponse.CurrentVersion | null;

  draft_version: V2RetrieveResponse.DraftVersion | null;

  /**
   * The event stream during which the rule will be evaluated.
   */
  event_stream:
    | 'AUTHORIZATION'
    | 'THREE_DS_AUTHENTICATION'
    | 'TOKENIZATION'
    | 'ACH_CREDIT_RECEIPT'
    | 'ACH_DEBIT_RECEIPT';

  /**
   * Indicates whether this auth rule is managed by Lithic. If true, the rule cannot
   * be modified or deleted by the user
   */
  lithic_managed: boolean;

  /**
   * Auth Rule Name
   */
  name: string | null;

  /**
   * Whether the Auth Rule applies to all authorizations on the card program.
   */
  program_level: boolean;

  /**
   * The state of the Auth Rule
   */
  state: 'ACTIVE' | 'INACTIVE';

  /**
   * The type of Auth Rule. For certain rule types, this determines the event stream
   * during which it will be evaluated. For rules that can be applied to one of
   * several event streams, the effective one is defined by the separate
   * `event_stream` field.
   *
   * - `CONDITIONAL_BLOCK`: AUTHORIZATION event stream.
   * - `VELOCITY_LIMIT`: AUTHORIZATION event stream.
   * - `MERCHANT_LOCK`: AUTHORIZATION event stream.
   * - `CONDITIONAL_ACTION`: AUTHORIZATION, THREE_DS_AUTHENTICATION, TOKENIZATION,
   *   ACH_CREDIT_RECEIPT, or ACH_DEBIT_RECEIPT event stream.
   */
  type: 'CONDITIONAL_BLOCK' | 'VELOCITY_LIMIT' | 'MERCHANT_LOCK' | 'CONDITIONAL_ACTION';

  /**
   * Card tokens to which the Auth Rule does not apply.
   */
  excluded_card_tokens?: Array<string>;
}

export namespace V2RetrieveResponse {
  export interface CurrentVersion {
    /**
     * Parameters for the Auth Rule
     */
    parameters:
      | V2API.ConditionalBlockParameters
      | V2API.VelocityLimitParams
      | V2API.MerchantLockParameters
      | V2API.Conditional3DSActionParameters
      | V2API.ConditionalAuthorizationActionParameters
      | V2API.ConditionalACHActionParameters
      | V2API.ConditionalTokenizationActionParameters;

    /**
     * The version of the rule, this is incremented whenever the rule's parameters
     * change.
     */
    version: number;
  }

  export interface DraftVersion {
    /**
     * Parameters for the Auth Rule
     */
    parameters:
      | V2API.ConditionalBlockParameters
      | V2API.VelocityLimitParams
      | V2API.MerchantLockParameters
      | V2API.Conditional3DSActionParameters
      | V2API.ConditionalAuthorizationActionParameters
      | V2API.ConditionalACHActionParameters
      | V2API.ConditionalTokenizationActionParameters;

    /**
     * The version of the rule, this is incremented whenever the rule's parameters
     * change.
     */
    version: number;
  }
}

export interface V2UpdateResponse {
  /**
   * Auth Rule Token
   */
  token: string;

  /**
   * Account tokens to which the Auth Rule applies.
   */
  account_tokens: Array<string>;

  /**
   * Business Account tokens to which the Auth Rule applies.
   */
  business_account_tokens: Array<string>;

  /**
   * Card tokens to which the Auth Rule applies.
   */
  card_tokens: Array<string>;

  current_version: V2UpdateResponse.CurrentVersion | null;

  draft_version: V2UpdateResponse.DraftVersion | null;

  /**
   * The event stream during which the rule will be evaluated.
   */
  event_stream:
    | 'AUTHORIZATION'
    | 'THREE_DS_AUTHENTICATION'
    | 'TOKENIZATION'
    | 'ACH_CREDIT_RECEIPT'
    | 'ACH_DEBIT_RECEIPT';

  /**
   * Indicates whether this auth rule is managed by Lithic. If true, the rule cannot
   * be modified or deleted by the user
   */
  lithic_managed: boolean;

  /**
   * Auth Rule Name
   */
  name: string | null;

  /**
   * Whether the Auth Rule applies to all authorizations on the card program.
   */
  program_level: boolean;

  /**
   * The state of the Auth Rule
   */
  state: 'ACTIVE' | 'INACTIVE';

  /**
   * The type of Auth Rule. For certain rule types, this determines the event stream
   * during which it will be evaluated. For rules that can be applied to one of
   * several event streams, the effective one is defined by the separate
   * `event_stream` field.
   *
   * - `CONDITIONAL_BLOCK`: AUTHORIZATION event stream.
   * - `VELOCITY_LIMIT`: AUTHORIZATION event stream.
   * - `MERCHANT_LOCK`: AUTHORIZATION event stream.
   * - `CONDITIONAL_ACTION`: AUTHORIZATION, THREE_DS_AUTHENTICATION, TOKENIZATION,
   *   ACH_CREDIT_RECEIPT, or ACH_DEBIT_RECEIPT event stream.
   */
  type: 'CONDITIONAL_BLOCK' | 'VELOCITY_LIMIT' | 'MERCHANT_LOCK' | 'CONDITIONAL_ACTION';

  /**
   * Card tokens to which the Auth Rule does not apply.
   */
  excluded_card_tokens?: Array<string>;
}

export namespace V2UpdateResponse {
  export interface CurrentVersion {
    /**
     * Parameters for the Auth Rule
     */
    parameters:
      | V2API.ConditionalBlockParameters
      | V2API.VelocityLimitParams
      | V2API.MerchantLockParameters
      | V2API.Conditional3DSActionParameters
      | V2API.ConditionalAuthorizationActionParameters
      | V2API.ConditionalACHActionParameters
      | V2API.ConditionalTokenizationActionParameters;

    /**
     * The version of the rule, this is incremented whenever the rule's parameters
     * change.
     */
    version: number;
  }

  export interface DraftVersion {
    /**
     * Parameters for the Auth Rule
     */
    parameters:
      | V2API.ConditionalBlockParameters
      | V2API.VelocityLimitParams
      | V2API.MerchantLockParameters
      | V2API.Conditional3DSActionParameters
      | V2API.ConditionalAuthorizationActionParameters
      | V2API.ConditionalACHActionParameters
      | V2API.ConditionalTokenizationActionParameters;

    /**
     * The version of the rule, this is incremented whenever the rule's parameters
     * change.
     */
    version: number;
  }
}

export interface V2ListResponse {
  /**
   * Auth Rule Token
   */
  token: string;

  /**
   * Account tokens to which the Auth Rule applies.
   */
  account_tokens: Array<string>;

  /**
   * Business Account tokens to which the Auth Rule applies.
   */
  business_account_tokens: Array<string>;

  /**
   * Card tokens to which the Auth Rule applies.
   */
  card_tokens: Array<string>;

  current_version: V2ListResponse.CurrentVersion | null;

  draft_version: V2ListResponse.DraftVersion | null;

  /**
   * The event stream during which the rule will be evaluated.
   */
  event_stream:
    | 'AUTHORIZATION'
    | 'THREE_DS_AUTHENTICATION'
    | 'TOKENIZATION'
    | 'ACH_CREDIT_RECEIPT'
    | 'ACH_DEBIT_RECEIPT';

  /**
   * Indicates whether this auth rule is managed by Lithic. If true, the rule cannot
   * be modified or deleted by the user
   */
  lithic_managed: boolean;

  /**
   * Auth Rule Name
   */
  name: string | null;

  /**
   * Whether the Auth Rule applies to all authorizations on the card program.
   */
  program_level: boolean;

  /**
   * The state of the Auth Rule
   */
  state: 'ACTIVE' | 'INACTIVE';

  /**
   * The type of Auth Rule. For certain rule types, this determines the event stream
   * during which it will be evaluated. For rules that can be applied to one of
   * several event streams, the effective one is defined by the separate
   * `event_stream` field.
   *
   * - `CONDITIONAL_BLOCK`: AUTHORIZATION event stream.
   * - `VELOCITY_LIMIT`: AUTHORIZATION event stream.
   * - `MERCHANT_LOCK`: AUTHORIZATION event stream.
   * - `CONDITIONAL_ACTION`: AUTHORIZATION, THREE_DS_AUTHENTICATION, TOKENIZATION,
   *   ACH_CREDIT_RECEIPT, or ACH_DEBIT_RECEIPT event stream.
   */
  type: 'CONDITIONAL_BLOCK' | 'VELOCITY_LIMIT' | 'MERCHANT_LOCK' | 'CONDITIONAL_ACTION';

  /**
   * Card tokens to which the Auth Rule does not apply.
   */
  excluded_card_tokens?: Array<string>;
}

export namespace V2ListResponse {
  export interface CurrentVersion {
    /**
     * Parameters for the Auth Rule
     */
    parameters:
      | V2API.ConditionalBlockParameters
      | V2API.VelocityLimitParams
      | V2API.MerchantLockParameters
      | V2API.Conditional3DSActionParameters
      | V2API.ConditionalAuthorizationActionParameters
      | V2API.ConditionalACHActionParameters
      | V2API.ConditionalTokenizationActionParameters;

    /**
     * The version of the rule, this is incremented whenever the rule's parameters
     * change.
     */
    version: number;
  }

  export interface DraftVersion {
    /**
     * Parameters for the Auth Rule
     */
    parameters:
      | V2API.ConditionalBlockParameters
      | V2API.VelocityLimitParams
      | V2API.MerchantLockParameters
      | V2API.Conditional3DSActionParameters
      | V2API.ConditionalAuthorizationActionParameters
      | V2API.ConditionalACHActionParameters
      | V2API.ConditionalTokenizationActionParameters;

    /**
     * The version of the rule, this is incremented whenever the rule's parameters
     * change.
     */
    version: number;
  }
}

export interface V2DraftResponse {
  /**
   * Auth Rule Token
   */
  token: string;

  /**
   * Account tokens to which the Auth Rule applies.
   */
  account_tokens: Array<string>;

  /**
   * Business Account tokens to which the Auth Rule applies.
   */
  business_account_tokens: Array<string>;

  /**
   * Card tokens to which the Auth Rule applies.
   */
  card_tokens: Array<string>;

  current_version: V2DraftResponse.CurrentVersion | null;

  draft_version: V2DraftResponse.DraftVersion | null;

  /**
   * The event stream during which the rule will be evaluated.
   */
  event_stream:
    | 'AUTHORIZATION'
    | 'THREE_DS_AUTHENTICATION'
    | 'TOKENIZATION'
    | 'ACH_CREDIT_RECEIPT'
    | 'ACH_DEBIT_RECEIPT';

  /**
   * Indicates whether this auth rule is managed by Lithic. If true, the rule cannot
   * be modified or deleted by the user
   */
  lithic_managed: boolean;

  /**
   * Auth Rule Name
   */
  name: string | null;

  /**
   * Whether the Auth Rule applies to all authorizations on the card program.
   */
  program_level: boolean;

  /**
   * The state of the Auth Rule
   */
  state: 'ACTIVE' | 'INACTIVE';

  /**
   * The type of Auth Rule. For certain rule types, this determines the event stream
   * during which it will be evaluated. For rules that can be applied to one of
   * several event streams, the effective one is defined by the separate
   * `event_stream` field.
   *
   * - `CONDITIONAL_BLOCK`: AUTHORIZATION event stream.
   * - `VELOCITY_LIMIT`: AUTHORIZATION event stream.
   * - `MERCHANT_LOCK`: AUTHORIZATION event stream.
   * - `CONDITIONAL_ACTION`: AUTHORIZATION, THREE_DS_AUTHENTICATION, TOKENIZATION,
   *   ACH_CREDIT_RECEIPT, or ACH_DEBIT_RECEIPT event stream.
   */
  type: 'CONDITIONAL_BLOCK' | 'VELOCITY_LIMIT' | 'MERCHANT_LOCK' | 'CONDITIONAL_ACTION';

  /**
   * Card tokens to which the Auth Rule does not apply.
   */
  excluded_card_tokens?: Array<string>;
}

export namespace V2DraftResponse {
  export interface CurrentVersion {
    /**
     * Parameters for the Auth Rule
     */
    parameters:
      | V2API.ConditionalBlockParameters
      | V2API.VelocityLimitParams
      | V2API.MerchantLockParameters
      | V2API.Conditional3DSActionParameters
      | V2API.ConditionalAuthorizationActionParameters
      | V2API.ConditionalACHActionParameters
      | V2API.ConditionalTokenizationActionParameters;

    /**
     * The version of the rule, this is incremented whenever the rule's parameters
     * change.
     */
    version: number;
  }

  export interface DraftVersion {
    /**
     * Parameters for the Auth Rule
     */
    parameters:
      | V2API.ConditionalBlockParameters
      | V2API.VelocityLimitParams
      | V2API.MerchantLockParameters
      | V2API.Conditional3DSActionParameters
      | V2API.ConditionalAuthorizationActionParameters
      | V2API.ConditionalACHActionParameters
      | V2API.ConditionalTokenizationActionParameters;

    /**
     * The version of the rule, this is incremented whenever the rule's parameters
     * change.
     */
    version: number;
  }
}

export interface V2PromoteResponse {
  /**
   * Auth Rule Token
   */
  token: string;

  /**
   * Account tokens to which the Auth Rule applies.
   */
  account_tokens: Array<string>;

  /**
   * Business Account tokens to which the Auth Rule applies.
   */
  business_account_tokens: Array<string>;

  /**
   * Card tokens to which the Auth Rule applies.
   */
  card_tokens: Array<string>;

  current_version: V2PromoteResponse.CurrentVersion | null;

  draft_version: V2PromoteResponse.DraftVersion | null;

  /**
   * The event stream during which the rule will be evaluated.
   */
  event_stream:
    | 'AUTHORIZATION'
    | 'THREE_DS_AUTHENTICATION'
    | 'TOKENIZATION'
    | 'ACH_CREDIT_RECEIPT'
    | 'ACH_DEBIT_RECEIPT';

  /**
   * Indicates whether this auth rule is managed by Lithic. If true, the rule cannot
   * be modified or deleted by the user
   */
  lithic_managed: boolean;

  /**
   * Auth Rule Name
   */
  name: string | null;

  /**
   * Whether the Auth Rule applies to all authorizations on the card program.
   */
  program_level: boolean;

  /**
   * The state of the Auth Rule
   */
  state: 'ACTIVE' | 'INACTIVE';

  /**
   * The type of Auth Rule. For certain rule types, this determines the event stream
   * during which it will be evaluated. For rules that can be applied to one of
   * several event streams, the effective one is defined by the separate
   * `event_stream` field.
   *
   * - `CONDITIONAL_BLOCK`: AUTHORIZATION event stream.
   * - `VELOCITY_LIMIT`: AUTHORIZATION event stream.
   * - `MERCHANT_LOCK`: AUTHORIZATION event stream.
   * - `CONDITIONAL_ACTION`: AUTHORIZATION, THREE_DS_AUTHENTICATION, TOKENIZATION,
   *   ACH_CREDIT_RECEIPT, or ACH_DEBIT_RECEIPT event stream.
   */
  type: 'CONDITIONAL_BLOCK' | 'VELOCITY_LIMIT' | 'MERCHANT_LOCK' | 'CONDITIONAL_ACTION';

  /**
   * Card tokens to which the Auth Rule does not apply.
   */
  excluded_card_tokens?: Array<string>;
}

export namespace V2PromoteResponse {
  export interface CurrentVersion {
    /**
     * Parameters for the Auth Rule
     */
    parameters:
      | V2API.ConditionalBlockParameters
      | V2API.VelocityLimitParams
      | V2API.MerchantLockParameters
      | V2API.Conditional3DSActionParameters
      | V2API.ConditionalAuthorizationActionParameters
      | V2API.ConditionalACHActionParameters
      | V2API.ConditionalTokenizationActionParameters;

    /**
     * The version of the rule, this is incremented whenever the rule's parameters
     * change.
     */
    version: number;
  }

  export interface DraftVersion {
    /**
     * Parameters for the Auth Rule
     */
    parameters:
      | V2API.ConditionalBlockParameters
      | V2API.VelocityLimitParams
      | V2API.MerchantLockParameters
      | V2API.Conditional3DSActionParameters
      | V2API.ConditionalAuthorizationActionParameters
      | V2API.ConditionalACHActionParameters
      | V2API.ConditionalTokenizationActionParameters;

    /**
     * The version of the rule, this is incremented whenever the rule's parameters
     * change.
     */
    version: number;
  }
}

export interface V2RetrieveFeaturesResponse {
  /**
   * Timestamp at which the Features were evaluated
   */
  evaluated: string;

  /**
   * Calculated Features used for evaluation of the provided Auth Rule
   */
  features: Array<V2RetrieveFeaturesResponse.Feature>;
}

export namespace V2RetrieveFeaturesResponse {
  export interface Feature {
    filters: Feature.Filters;

    /**
     * Velocity over the current day since 00:00 / 12 AM in Eastern Time
     */
    period: V2API.VelocityLimitPeriod;

    /**
     * The scope the velocity is calculated for
     */
    scope: 'CARD' | 'ACCOUNT';

    value: Feature.Value;
  }

  export namespace Feature {
    export interface Filters {
      /**
       * ISO-3166-1 alpha-3 Country Codes to exclude from the velocity calculation.
       * Transactions matching any of the provided will be excluded from the calculated
       * velocity.
       */
      exclude_countries?: Array<string> | null;

      /**
       * Merchant Category Codes to exclude from the velocity calculation. Transactions
       * matching this MCC will be excluded from the calculated velocity.
       */
      exclude_mccs?: Array<string> | null;

      /**
       * ISO-3166-1 alpha-3 Country Codes to include in the velocity calculation.
       * Transactions not matching any of the provided will not be included in the
       * calculated velocity.
       */
      include_countries?: Array<string> | null;

      /**
       * Merchant Category Codes to include in the velocity calculation. Transactions not
       * matching this MCC will not be included in the calculated velocity.
       */
      include_mccs?: Array<string> | null;

      /**
       * PAN entry modes to include in the velocity calculation. Transactions not
       * matching any of the provided will not be included in the calculated velocity.
       */
      include_pan_entry_modes?: Array<
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
        | 'UNSPECIFIED'
        | 'UNKNOWN'
      > | null;
    }

    export interface Value {
      /**
       * Amount (in cents) for the given Auth Rule that is used as input for calculating
       * the rule. For Velocity Limit rules this would be the calculated Velocity. For
       * Conditional Rules using CARD*TRANSACTION_COUNT*\* this will be 0
       */
      amount: number;

      /**
       * Number of velocity impacting transactions matching the given scope, period and
       * filters
       */
      count: number;
    }
  }
}

export interface V2RetrieveReportResponse {
  /**
   * Auth Rule Token
   */
  auth_rule_token: string;

  /**
   * The start date (UTC) of the report.
   */
  begin: string;

  /**
   * Daily evaluation statistics for the Auth Rule.
   */
  daily_statistics: Array<V2RetrieveReportResponse.DailyStatistic>;

  /**
   * The end date (UTC) of the report.
   */
  end: string;
}

export namespace V2RetrieveReportResponse {
  export interface DailyStatistic {
    /**
     * Detailed statistics for the current version of the rule.
     */
    current_version_statistics: V2API.RuleStats | null;

    /**
     * The date (UTC) for which the statistics are reported.
     */
    date: string;

    /**
     * Detailed statistics for the draft version of the rule.
     */
    draft_version_statistics: V2API.RuleStats | null;
  }
}

export type V2CreateParams =
  | V2CreateParams.AccountLevelRule
  | V2CreateParams.CardLevelRule
  | V2CreateParams.ProgramLevelRule;

export declare namespace V2CreateParams {
  export interface AccountLevelRule {
    /**
     * Parameters for the Auth Rule
     */
    parameters:
      | ConditionalBlockParameters
      | VelocityLimitParams
      | MerchantLockParameters
      | Conditional3DSActionParameters
      | ConditionalAuthorizationActionParameters
      | ConditionalACHActionParameters
      | ConditionalTokenizationActionParameters;

    /**
     * The type of Auth Rule. For certain rule types, this determines the event stream
     * during which it will be evaluated. For rules that can be applied to one of
     * several event streams, the effective one is defined by the separate
     * `event_stream` field.
     *
     * - `CONDITIONAL_BLOCK`: AUTHORIZATION event stream.
     * - `VELOCITY_LIMIT`: AUTHORIZATION event stream.
     * - `MERCHANT_LOCK`: AUTHORIZATION event stream.
     * - `CONDITIONAL_ACTION`: AUTHORIZATION, THREE_DS_AUTHENTICATION, TOKENIZATION,
     *   ACH_CREDIT_RECEIPT, or ACH_DEBIT_RECEIPT event stream.
     */
    type: 'CONDITIONAL_BLOCK' | 'VELOCITY_LIMIT' | 'MERCHANT_LOCK' | 'CONDITIONAL_ACTION';

    /**
     * Account tokens to which the Auth Rule applies.
     */
    account_tokens?: Array<string>;

    /**
     * Business Account tokens to which the Auth Rule applies.
     */
    business_account_tokens?: Array<string>;

    /**
     * The event stream during which the rule will be evaluated.
     */
    event_stream?:
      | 'AUTHORIZATION'
      | 'THREE_DS_AUTHENTICATION'
      | 'TOKENIZATION'
      | 'ACH_CREDIT_RECEIPT'
      | 'ACH_DEBIT_RECEIPT';

    /**
     * Auth Rule Name
     */
    name?: string | null;
  }

  export interface CardLevelRule {
    /**
     * Card tokens to which the Auth Rule applies.
     */
    card_tokens: Array<string>;

    /**
     * Parameters for the Auth Rule
     */
    parameters:
      | ConditionalBlockParameters
      | VelocityLimitParams
      | MerchantLockParameters
      | Conditional3DSActionParameters
      | ConditionalAuthorizationActionParameters
      | ConditionalACHActionParameters
      | ConditionalTokenizationActionParameters;

    /**
     * The type of Auth Rule. For certain rule types, this determines the event stream
     * during which it will be evaluated. For rules that can be applied to one of
     * several event streams, the effective one is defined by the separate
     * `event_stream` field.
     *
     * - `CONDITIONAL_BLOCK`: AUTHORIZATION event stream.
     * - `VELOCITY_LIMIT`: AUTHORIZATION event stream.
     * - `MERCHANT_LOCK`: AUTHORIZATION event stream.
     * - `CONDITIONAL_ACTION`: AUTHORIZATION, THREE_DS_AUTHENTICATION, TOKENIZATION,
     *   ACH_CREDIT_RECEIPT, or ACH_DEBIT_RECEIPT event stream.
     */
    type: 'CONDITIONAL_BLOCK' | 'VELOCITY_LIMIT' | 'MERCHANT_LOCK' | 'CONDITIONAL_ACTION';

    /**
     * The event stream during which the rule will be evaluated.
     */
    event_stream?:
      | 'AUTHORIZATION'
      | 'THREE_DS_AUTHENTICATION'
      | 'TOKENIZATION'
      | 'ACH_CREDIT_RECEIPT'
      | 'ACH_DEBIT_RECEIPT';

    /**
     * Auth Rule Name
     */
    name?: string | null;
  }

  export interface ProgramLevelRule {
    /**
     * Parameters for the Auth Rule
     */
    parameters:
      | ConditionalBlockParameters
      | VelocityLimitParams
      | MerchantLockParameters
      | Conditional3DSActionParameters
      | ConditionalAuthorizationActionParameters
      | ConditionalACHActionParameters
      | ConditionalTokenizationActionParameters;

    /**
     * Whether the Auth Rule applies to all authorizations on the card program.
     */
    program_level: boolean;

    /**
     * The type of Auth Rule. For certain rule types, this determines the event stream
     * during which it will be evaluated. For rules that can be applied to one of
     * several event streams, the effective one is defined by the separate
     * `event_stream` field.
     *
     * - `CONDITIONAL_BLOCK`: AUTHORIZATION event stream.
     * - `VELOCITY_LIMIT`: AUTHORIZATION event stream.
     * - `MERCHANT_LOCK`: AUTHORIZATION event stream.
     * - `CONDITIONAL_ACTION`: AUTHORIZATION, THREE_DS_AUTHENTICATION, TOKENIZATION,
     *   ACH_CREDIT_RECEIPT, or ACH_DEBIT_RECEIPT event stream.
     */
    type: 'CONDITIONAL_BLOCK' | 'VELOCITY_LIMIT' | 'MERCHANT_LOCK' | 'CONDITIONAL_ACTION';

    /**
     * The event stream during which the rule will be evaluated.
     */
    event_stream?:
      | 'AUTHORIZATION'
      | 'THREE_DS_AUTHENTICATION'
      | 'TOKENIZATION'
      | 'ACH_CREDIT_RECEIPT'
      | 'ACH_DEBIT_RECEIPT';

    /**
     * Card tokens to which the Auth Rule does not apply.
     */
    excluded_card_tokens?: Array<string>;

    /**
     * Auth Rule Name
     */
    name?: string | null;
  }
}

export type V2UpdateParams =
  | V2UpdateParams.AccountLevelRule
  | V2UpdateParams.CardLevelRule
  | V2UpdateParams.ProgramLevelRule;

export declare namespace V2UpdateParams {
  export interface AccountLevelRule {
    /**
     * Account tokens to which the Auth Rule applies.
     */
    account_tokens?: Array<string>;

    /**
     * Business Account tokens to which the Auth Rule applies.
     */
    business_account_tokens?: Array<string>;

    /**
     * Auth Rule Name
     */
    name?: string | null;

    /**
     * The desired state of the Auth Rule.
     *
     * Note that only deactivating an Auth Rule through this endpoint is supported at
     * this time. If you need to (re-)activate an Auth Rule the /promote endpoint
     * should be used to promote a draft to the currently active version.
     */
    state?: 'INACTIVE';
  }

  export interface CardLevelRule {
    /**
     * Card tokens to which the Auth Rule applies.
     */
    card_tokens?: Array<string>;

    /**
     * Auth Rule Name
     */
    name?: string | null;

    /**
     * The desired state of the Auth Rule.
     *
     * Note that only deactivating an Auth Rule through this endpoint is supported at
     * this time. If you need to (re-)activate an Auth Rule the /promote endpoint
     * should be used to promote a draft to the currently active version.
     */
    state?: 'INACTIVE';
  }

  export interface ProgramLevelRule {
    /**
     * Card tokens to which the Auth Rule does not apply.
     */
    excluded_card_tokens?: Array<string>;

    /**
     * Auth Rule Name
     */
    name?: string | null;

    /**
     * Whether the Auth Rule applies to all authorizations on the card program.
     */
    program_level?: boolean;

    /**
     * The desired state of the Auth Rule.
     *
     * Note that only deactivating an Auth Rule through this endpoint is supported at
     * this time. If you need to (re-)activate an Auth Rule the /promote endpoint
     * should be used to promote a draft to the currently active version.
     */
    state?: 'INACTIVE';
  }
}

export interface V2ListParams extends CursorPageParams {
  /**
   * Only return Auth Rules that are bound to the provided account token.
   */
  account_token?: string;

  /**
   * Only return Auth Rules that are bound to the provided business account token.
   */
  business_account_token?: string;

  /**
   * Only return Auth Rules that are bound to the provided card token.
   */
  card_token?: string;

  /**
   * Only return Auth rules that are executed during the provided event stream.
   */
  event_stream?:
    | 'AUTHORIZATION'
    | 'THREE_DS_AUTHENTICATION'
    | 'TOKENIZATION'
    | 'ACH_CREDIT_RECEIPT'
    | 'ACH_DEBIT_RECEIPT';

  /**
   * Only return Auth Rules that are bound to the provided scope.
   */
  scope?: 'PROGRAM' | 'ACCOUNT' | 'BUSINESS_ACCOUNT' | 'CARD' | 'ANY';
}

export interface V2DraftParams {
  /**
   * Parameters for the Auth Rule
   */
  parameters?:
    | ConditionalBlockParameters
    | VelocityLimitParams
    | MerchantLockParameters
    | Conditional3DSActionParameters
    | ConditionalAuthorizationActionParameters
    | ConditionalACHActionParameters
    | ConditionalTokenizationActionParameters
    | null;
}

export interface V2RetrieveFeaturesParams {
  account_token?: string;

  card_token?: string;
}

export interface V2RetrieveReportParams {
  /**
   * Start date for the report
   */
  begin: string;

  /**
   * End date for the report
   */
  end: string;
}

V2.Backtests = Backtests;

export declare namespace V2 {
  export {
    type AuthRule as AuthRule,
    type AuthRuleCondition as AuthRuleCondition,
    type Conditional3DSActionParameters as Conditional3DSActionParameters,
    type ConditionalACHActionParameters as ConditionalACHActionParameters,
    type ConditionalAttribute as ConditionalAttribute,
    type ConditionalAuthorizationActionParameters as ConditionalAuthorizationActionParameters,
    type ConditionalBlockParameters as ConditionalBlockParameters,
    type ConditionalOperation as ConditionalOperation,
    type ConditionalTokenizationActionParameters as ConditionalTokenizationActionParameters,
    type ConditionalValue as ConditionalValue,
    type MerchantLockParameters as MerchantLockParameters,
    type RuleStats as RuleStats,
    type VelocityLimitParams as VelocityLimitParams,
    type VelocityLimitPeriod as VelocityLimitPeriod,
    type V2CreateResponse as V2CreateResponse,
    type V2RetrieveResponse as V2RetrieveResponse,
    type V2UpdateResponse as V2UpdateResponse,
    type V2ListResponse as V2ListResponse,
    type V2DraftResponse as V2DraftResponse,
    type V2PromoteResponse as V2PromoteResponse,
    type V2RetrieveFeaturesResponse as V2RetrieveFeaturesResponse,
    type V2RetrieveReportResponse as V2RetrieveReportResponse,
    type V2ListResponsesCursorPage as V2ListResponsesCursorPage,
    type V2CreateParams as V2CreateParams,
    type V2UpdateParams as V2UpdateParams,
    type V2ListParams as V2ListParams,
    type V2DraftParams as V2DraftParams,
    type V2RetrieveFeaturesParams as V2RetrieveFeaturesParams,
    type V2RetrieveReportParams as V2RetrieveReportParams,
  };

  export {
    Backtests as Backtests,
    type BacktestResults as BacktestResults,
    type BacktestCreateResponse as BacktestCreateResponse,
    type BacktestCreateParams as BacktestCreateParams,
    type BacktestRetrieveParams as BacktestRetrieveParams,
  };
}
