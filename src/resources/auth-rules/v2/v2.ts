// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../resource';
import { isRequestOptions } from '../../../core';
import * as Core from '../../../core';
import * as Shared from '../../shared';
import * as BacktestsAPI from './backtests';
import { BacktestCreateParams, BacktestCreateResponse, BacktestResults, Backtests } from './backtests';
import { CursorPage, type CursorPageParams } from '../../../pagination';

export class V2 extends APIResource {
  backtests: BacktestsAPI.Backtests = new BacktestsAPI.Backtests(this._client);

  /**
   * Creates a new V2 authorization rule in draft mode
   */
  create(body: V2CreateParams, options?: Core.RequestOptions): Core.APIPromise<V2CreateResponse> {
    return this._client.post('/v2/auth_rules', { body, ...options });
  }

  /**
   * Fetches an authorization rule by its token
   */
  retrieve(authRuleToken: string, options?: Core.RequestOptions): Core.APIPromise<V2RetrieveResponse> {
    return this._client.get(`/v2/auth_rules/${authRuleToken}`, options);
  }

  /**
   * Updates an authorization rule's properties
   */
  update(
    authRuleToken: string,
    body: V2UpdateParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<V2UpdateResponse> {
    return this._client.patch(`/v2/auth_rules/${authRuleToken}`, { body, ...options });
  }

  /**
   * Lists V2 authorization rules
   */
  list(
    query?: V2ListParams,
    options?: Core.RequestOptions,
  ): Core.PagePromise<V2ListResponsesCursorPage, V2ListResponse>;
  list(options?: Core.RequestOptions): Core.PagePromise<V2ListResponsesCursorPage, V2ListResponse>;
  list(
    query: V2ListParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.PagePromise<V2ListResponsesCursorPage, V2ListResponse> {
    if (isRequestOptions(query)) {
      return this.list({}, query);
    }
    return this._client.getAPIList('/v2/auth_rules', V2ListResponsesCursorPage, { query, ...options });
  }

  /**
   * Associates an authorization rules with a card program, the provided account(s)
   * or card(s).
   *
   * This endpoint will replace any existing associations with the provided list of
   * entities.
   */
  apply(
    authRuleToken: string,
    body: V2ApplyParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<V2ApplyResponse> {
    return this._client.post(`/v2/auth_rules/${authRuleToken}/apply`, { body, ...options });
  }

  /**
   * Creates a new draft version of an authorization rules that will be ran in shadow
   * mode.
   *
   * This can also be utilized to reset the draft parameters, causing a draft version
   * to no longer be ran in shadow mode.
   */
  draft(
    authRuleToken: string,
    body: V2DraftParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<V2DraftResponse> {
    return this._client.post(`/v2/auth_rules/${authRuleToken}/draft`, { body, ...options });
  }

  /**
   * Promotes a draft version of an authorization rule to the currently active
   * version such that it is enforced in the authorization stream.
   */
  promote(authRuleToken: string, options?: Core.RequestOptions): Core.APIPromise<V2PromoteResponse> {
    return this._client.post(`/v2/auth_rules/${authRuleToken}/promote`, options);
  }

  /**
   * Requests a performance report of an authorization rule to be asynchronously
   * generated. Reports can only be run on rules in draft or active mode and will
   * included approved and declined statistics as well as examples. The generated
   * report will be delivered asynchronously through a webhook with `event_type` =
   * `auth_rules.performance_report.created`. See the docs on setting up
   * [webhook subscriptions](https://docs.lithic.com/docs/events-api).
   *
   * Reports are generated based on data collected by Lithic's authorization
   * processing system in the trailing week. The performance of the auth rule will be
   * assessed on the configuration of the auth rule at the time the report is
   * requested. This implies that if a performance report is requested, right after
   * updating an auth rule, depending on the number of authorizations processed for a
   * card program, it may be the case that no data is available for the report.
   * Therefore Lithic recommends to decouple making updates to an Auth Rule, and
   * requesting performance reports.
   *
   * To make this concrete, consider the following example:
   *
   * 1. At time `t`, a new Auth Rule is created, and applies to all authorizations on
   *    a card program. The Auth Rule has not yet been promoted, causing the draft
   *    version of the rule to be applied in shadow mode.
   * 2. At time `t + 1 hour` a performance report is requested for the Auth Rule.
   *    This performance report will _only_ contain data for the Auth Rule being
   *    executed in the window between `t` and `t + 1 hour`. This is because Lithic's
   *    transaction processing system will only start capturing data for the Auth
   *    Rule at the time it is created.
   * 3. At time `t + 2 hours` the draft version of the Auth Rule is promoted to the
   *    active version of the Auth Rule by calling the
   *    `/v2/auth_rules/{auth_rule_token}/promote` endpoint. If a performance report
   *    is requested at this moment it will still only contain data for this version
   *    of the rule, but the window of available data will now span from `t` to
   *    `t + 2 hours`.
   * 4. At time `t + 3 hours` a new version of the rule is drafted by calling the
   *    `/v2/auth_rules/{auth_rule_token}/draft` endpoint. If a performance report is
   *    requested right at this moment, it will only contain data for authorizations
   *    to which both the active version and the draft version is applied. Lithic
   *    does this to ensure that performance reports represent a fair comparison
   *    between rules. Because there may be no authorizations in this window, and
   *    because there may be some lag before data is available in a performance
   *    report, the requested performance report could contain no to little data.
   * 5. At time `t + 4 hours` another performance report is requested: this time the
   *    performance report will contain data from the window between `t + 3 hours`
   *    and `t + 4 hours`, for any authorizations to which both the current version
   *    of the authorization rule (in enforcing mode) and the draft version of the
   *    authorization rule (in shadow mode) applied.
   *
   * Note that generating a report may take up to 15 minutes and that delivery is not
   * guaranteed. Customers are required to have created an event subscription to
   * receive the webhook. Additionally, there is a delay of approximately 15 minutes
   * between when Lithic's transaction processing systems have processed the
   * transaction, and when a transaction will be included in the report.
   */
  report(authRuleToken: string, options?: Core.RequestOptions): Core.APIPromise<V2ReportResponse> {
    return this._client.post(`/v2/auth_rules/${authRuleToken}/report`, options);
  }
}

export class V2ListResponsesCursorPage extends CursorPage<V2ListResponse> {}

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
   * Card tokens to which the Auth Rule applies.
   */
  card_tokens: Array<string>;

  current_version: V2CreateResponse.CurrentVersion | null;

  draft_version: V2CreateResponse.DraftVersion | null;

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
   * The type of Auth Rule
   */
  type: 'CONDITIONAL_BLOCK' | 'VELOCITY_LIMIT';

  /**
   * Card tokens to which the Auth Rule does not apply.
   */
  excluded_card_tokens?: Array<string>;
}

export namespace V2CreateResponse {
  export interface CurrentVersion {
    /**
     * Parameters for the current version of the Auth Rule
     */
    parameters: CurrentVersion.ConditionalBlockParameters | Shared.VelocityLimitParams;

    /**
     * The version of the rule, this is incremented whenever the rule's parameters
     * change.
     */
    version: number;
  }

  export namespace CurrentVersion {
    export interface ConditionalBlockParameters {
      conditions: Array<ConditionalBlockParameters.Condition>;
    }

    export namespace ConditionalBlockParameters {
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
         * - `CURRENCY`: 3-digit alphabetic ISO 4217 code for the merchant currency of the
         *   transaction.
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
         * - `CARD_TRANSACTION_COUNT_1H`: The number of transactions on the card in the
         *   trailing hour up and until the authorization.
         * - `CARD_TRANSACTION_COUNT_24H`: The number of transactions on the card in the
         *   trailing 24 hours up and until the authorization.
         */
        attribute?:
          | 'MCC'
          | 'COUNTRY'
          | 'CURRENCY'
          | 'MERCHANT_ID'
          | 'DESCRIPTOR'
          | 'LIABILITY_SHIFT'
          | 'PAN_ENTRY_MODE'
          | 'TRANSACTION_AMOUNT'
          | 'RISK_SCORE'
          | 'CARD_TRANSACTION_COUNT_1H'
          | 'CARD_TRANSACTION_COUNT_24H';

        /**
         * The operation to apply to the attribute
         */
        operation?:
          | 'IS_ONE_OF'
          | 'IS_NOT_ONE_OF'
          | 'MATCHES'
          | 'DOES_NOT_MATCH'
          | 'IS_GREATER_THAN'
          | 'IS_LESS_THAN';

        /**
         * A regex string, to be used with `MATCHES` or `DOES_NOT_MATCH`
         */
        value?: string | number | Array<string>;
      }
    }
  }

  export interface DraftVersion {
    /**
     * Parameters for the current version of the Auth Rule
     */
    parameters: DraftVersion.ConditionalBlockParameters | Shared.VelocityLimitParams;

    /**
     * The version of the rule, this is incremented whenever the rule's parameters
     * change.
     */
    version: number;
  }

  export namespace DraftVersion {
    export interface ConditionalBlockParameters {
      conditions: Array<ConditionalBlockParameters.Condition>;
    }

    export namespace ConditionalBlockParameters {
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
         * - `CURRENCY`: 3-digit alphabetic ISO 4217 code for the merchant currency of the
         *   transaction.
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
         * - `CARD_TRANSACTION_COUNT_1H`: The number of transactions on the card in the
         *   trailing hour up and until the authorization.
         * - `CARD_TRANSACTION_COUNT_24H`: The number of transactions on the card in the
         *   trailing 24 hours up and until the authorization.
         */
        attribute?:
          | 'MCC'
          | 'COUNTRY'
          | 'CURRENCY'
          | 'MERCHANT_ID'
          | 'DESCRIPTOR'
          | 'LIABILITY_SHIFT'
          | 'PAN_ENTRY_MODE'
          | 'TRANSACTION_AMOUNT'
          | 'RISK_SCORE'
          | 'CARD_TRANSACTION_COUNT_1H'
          | 'CARD_TRANSACTION_COUNT_24H';

        /**
         * The operation to apply to the attribute
         */
        operation?:
          | 'IS_ONE_OF'
          | 'IS_NOT_ONE_OF'
          | 'MATCHES'
          | 'DOES_NOT_MATCH'
          | 'IS_GREATER_THAN'
          | 'IS_LESS_THAN';

        /**
         * A regex string, to be used with `MATCHES` or `DOES_NOT_MATCH`
         */
        value?: string | number | Array<string>;
      }
    }
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
   * Card tokens to which the Auth Rule applies.
   */
  card_tokens: Array<string>;

  current_version: V2RetrieveResponse.CurrentVersion | null;

  draft_version: V2RetrieveResponse.DraftVersion | null;

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
   * The type of Auth Rule
   */
  type: 'CONDITIONAL_BLOCK' | 'VELOCITY_LIMIT';

  /**
   * Card tokens to which the Auth Rule does not apply.
   */
  excluded_card_tokens?: Array<string>;
}

export namespace V2RetrieveResponse {
  export interface CurrentVersion {
    /**
     * Parameters for the current version of the Auth Rule
     */
    parameters: CurrentVersion.ConditionalBlockParameters | Shared.VelocityLimitParams;

    /**
     * The version of the rule, this is incremented whenever the rule's parameters
     * change.
     */
    version: number;
  }

  export namespace CurrentVersion {
    export interface ConditionalBlockParameters {
      conditions: Array<ConditionalBlockParameters.Condition>;
    }

    export namespace ConditionalBlockParameters {
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
         * - `CURRENCY`: 3-digit alphabetic ISO 4217 code for the merchant currency of the
         *   transaction.
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
         * - `CARD_TRANSACTION_COUNT_1H`: The number of transactions on the card in the
         *   trailing hour up and until the authorization.
         * - `CARD_TRANSACTION_COUNT_24H`: The number of transactions on the card in the
         *   trailing 24 hours up and until the authorization.
         */
        attribute?:
          | 'MCC'
          | 'COUNTRY'
          | 'CURRENCY'
          | 'MERCHANT_ID'
          | 'DESCRIPTOR'
          | 'LIABILITY_SHIFT'
          | 'PAN_ENTRY_MODE'
          | 'TRANSACTION_AMOUNT'
          | 'RISK_SCORE'
          | 'CARD_TRANSACTION_COUNT_1H'
          | 'CARD_TRANSACTION_COUNT_24H';

        /**
         * The operation to apply to the attribute
         */
        operation?:
          | 'IS_ONE_OF'
          | 'IS_NOT_ONE_OF'
          | 'MATCHES'
          | 'DOES_NOT_MATCH'
          | 'IS_GREATER_THAN'
          | 'IS_LESS_THAN';

        /**
         * A regex string, to be used with `MATCHES` or `DOES_NOT_MATCH`
         */
        value?: string | number | Array<string>;
      }
    }
  }

  export interface DraftVersion {
    /**
     * Parameters for the current version of the Auth Rule
     */
    parameters: DraftVersion.ConditionalBlockParameters | Shared.VelocityLimitParams;

    /**
     * The version of the rule, this is incremented whenever the rule's parameters
     * change.
     */
    version: number;
  }

  export namespace DraftVersion {
    export interface ConditionalBlockParameters {
      conditions: Array<ConditionalBlockParameters.Condition>;
    }

    export namespace ConditionalBlockParameters {
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
         * - `CURRENCY`: 3-digit alphabetic ISO 4217 code for the merchant currency of the
         *   transaction.
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
         * - `CARD_TRANSACTION_COUNT_1H`: The number of transactions on the card in the
         *   trailing hour up and until the authorization.
         * - `CARD_TRANSACTION_COUNT_24H`: The number of transactions on the card in the
         *   trailing 24 hours up and until the authorization.
         */
        attribute?:
          | 'MCC'
          | 'COUNTRY'
          | 'CURRENCY'
          | 'MERCHANT_ID'
          | 'DESCRIPTOR'
          | 'LIABILITY_SHIFT'
          | 'PAN_ENTRY_MODE'
          | 'TRANSACTION_AMOUNT'
          | 'RISK_SCORE'
          | 'CARD_TRANSACTION_COUNT_1H'
          | 'CARD_TRANSACTION_COUNT_24H';

        /**
         * The operation to apply to the attribute
         */
        operation?:
          | 'IS_ONE_OF'
          | 'IS_NOT_ONE_OF'
          | 'MATCHES'
          | 'DOES_NOT_MATCH'
          | 'IS_GREATER_THAN'
          | 'IS_LESS_THAN';

        /**
         * A regex string, to be used with `MATCHES` or `DOES_NOT_MATCH`
         */
        value?: string | number | Array<string>;
      }
    }
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
   * Card tokens to which the Auth Rule applies.
   */
  card_tokens: Array<string>;

  current_version: V2UpdateResponse.CurrentVersion | null;

  draft_version: V2UpdateResponse.DraftVersion | null;

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
   * The type of Auth Rule
   */
  type: 'CONDITIONAL_BLOCK' | 'VELOCITY_LIMIT';

  /**
   * Card tokens to which the Auth Rule does not apply.
   */
  excluded_card_tokens?: Array<string>;
}

export namespace V2UpdateResponse {
  export interface CurrentVersion {
    /**
     * Parameters for the current version of the Auth Rule
     */
    parameters: CurrentVersion.ConditionalBlockParameters | Shared.VelocityLimitParams;

    /**
     * The version of the rule, this is incremented whenever the rule's parameters
     * change.
     */
    version: number;
  }

  export namespace CurrentVersion {
    export interface ConditionalBlockParameters {
      conditions: Array<ConditionalBlockParameters.Condition>;
    }

    export namespace ConditionalBlockParameters {
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
         * - `CURRENCY`: 3-digit alphabetic ISO 4217 code for the merchant currency of the
         *   transaction.
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
         * - `CARD_TRANSACTION_COUNT_1H`: The number of transactions on the card in the
         *   trailing hour up and until the authorization.
         * - `CARD_TRANSACTION_COUNT_24H`: The number of transactions on the card in the
         *   trailing 24 hours up and until the authorization.
         */
        attribute?:
          | 'MCC'
          | 'COUNTRY'
          | 'CURRENCY'
          | 'MERCHANT_ID'
          | 'DESCRIPTOR'
          | 'LIABILITY_SHIFT'
          | 'PAN_ENTRY_MODE'
          | 'TRANSACTION_AMOUNT'
          | 'RISK_SCORE'
          | 'CARD_TRANSACTION_COUNT_1H'
          | 'CARD_TRANSACTION_COUNT_24H';

        /**
         * The operation to apply to the attribute
         */
        operation?:
          | 'IS_ONE_OF'
          | 'IS_NOT_ONE_OF'
          | 'MATCHES'
          | 'DOES_NOT_MATCH'
          | 'IS_GREATER_THAN'
          | 'IS_LESS_THAN';

        /**
         * A regex string, to be used with `MATCHES` or `DOES_NOT_MATCH`
         */
        value?: string | number | Array<string>;
      }
    }
  }

  export interface DraftVersion {
    /**
     * Parameters for the current version of the Auth Rule
     */
    parameters: DraftVersion.ConditionalBlockParameters | Shared.VelocityLimitParams;

    /**
     * The version of the rule, this is incremented whenever the rule's parameters
     * change.
     */
    version: number;
  }

  export namespace DraftVersion {
    export interface ConditionalBlockParameters {
      conditions: Array<ConditionalBlockParameters.Condition>;
    }

    export namespace ConditionalBlockParameters {
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
         * - `CURRENCY`: 3-digit alphabetic ISO 4217 code for the merchant currency of the
         *   transaction.
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
         * - `CARD_TRANSACTION_COUNT_1H`: The number of transactions on the card in the
         *   trailing hour up and until the authorization.
         * - `CARD_TRANSACTION_COUNT_24H`: The number of transactions on the card in the
         *   trailing 24 hours up and until the authorization.
         */
        attribute?:
          | 'MCC'
          | 'COUNTRY'
          | 'CURRENCY'
          | 'MERCHANT_ID'
          | 'DESCRIPTOR'
          | 'LIABILITY_SHIFT'
          | 'PAN_ENTRY_MODE'
          | 'TRANSACTION_AMOUNT'
          | 'RISK_SCORE'
          | 'CARD_TRANSACTION_COUNT_1H'
          | 'CARD_TRANSACTION_COUNT_24H';

        /**
         * The operation to apply to the attribute
         */
        operation?:
          | 'IS_ONE_OF'
          | 'IS_NOT_ONE_OF'
          | 'MATCHES'
          | 'DOES_NOT_MATCH'
          | 'IS_GREATER_THAN'
          | 'IS_LESS_THAN';

        /**
         * A regex string, to be used with `MATCHES` or `DOES_NOT_MATCH`
         */
        value?: string | number | Array<string>;
      }
    }
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
   * Card tokens to which the Auth Rule applies.
   */
  card_tokens: Array<string>;

  current_version: V2ListResponse.CurrentVersion | null;

  draft_version: V2ListResponse.DraftVersion | null;

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
   * The type of Auth Rule
   */
  type: 'CONDITIONAL_BLOCK' | 'VELOCITY_LIMIT';

  /**
   * Card tokens to which the Auth Rule does not apply.
   */
  excluded_card_tokens?: Array<string>;
}

export namespace V2ListResponse {
  export interface CurrentVersion {
    /**
     * Parameters for the current version of the Auth Rule
     */
    parameters: CurrentVersion.ConditionalBlockParameters | Shared.VelocityLimitParams;

    /**
     * The version of the rule, this is incremented whenever the rule's parameters
     * change.
     */
    version: number;
  }

  export namespace CurrentVersion {
    export interface ConditionalBlockParameters {
      conditions: Array<ConditionalBlockParameters.Condition>;
    }

    export namespace ConditionalBlockParameters {
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
         * - `CURRENCY`: 3-digit alphabetic ISO 4217 code for the merchant currency of the
         *   transaction.
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
         * - `CARD_TRANSACTION_COUNT_1H`: The number of transactions on the card in the
         *   trailing hour up and until the authorization.
         * - `CARD_TRANSACTION_COUNT_24H`: The number of transactions on the card in the
         *   trailing 24 hours up and until the authorization.
         */
        attribute?:
          | 'MCC'
          | 'COUNTRY'
          | 'CURRENCY'
          | 'MERCHANT_ID'
          | 'DESCRIPTOR'
          | 'LIABILITY_SHIFT'
          | 'PAN_ENTRY_MODE'
          | 'TRANSACTION_AMOUNT'
          | 'RISK_SCORE'
          | 'CARD_TRANSACTION_COUNT_1H'
          | 'CARD_TRANSACTION_COUNT_24H';

        /**
         * The operation to apply to the attribute
         */
        operation?:
          | 'IS_ONE_OF'
          | 'IS_NOT_ONE_OF'
          | 'MATCHES'
          | 'DOES_NOT_MATCH'
          | 'IS_GREATER_THAN'
          | 'IS_LESS_THAN';

        /**
         * A regex string, to be used with `MATCHES` or `DOES_NOT_MATCH`
         */
        value?: string | number | Array<string>;
      }
    }
  }

  export interface DraftVersion {
    /**
     * Parameters for the current version of the Auth Rule
     */
    parameters: DraftVersion.ConditionalBlockParameters | Shared.VelocityLimitParams;

    /**
     * The version of the rule, this is incremented whenever the rule's parameters
     * change.
     */
    version: number;
  }

  export namespace DraftVersion {
    export interface ConditionalBlockParameters {
      conditions: Array<ConditionalBlockParameters.Condition>;
    }

    export namespace ConditionalBlockParameters {
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
         * - `CURRENCY`: 3-digit alphabetic ISO 4217 code for the merchant currency of the
         *   transaction.
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
         * - `CARD_TRANSACTION_COUNT_1H`: The number of transactions on the card in the
         *   trailing hour up and until the authorization.
         * - `CARD_TRANSACTION_COUNT_24H`: The number of transactions on the card in the
         *   trailing 24 hours up and until the authorization.
         */
        attribute?:
          | 'MCC'
          | 'COUNTRY'
          | 'CURRENCY'
          | 'MERCHANT_ID'
          | 'DESCRIPTOR'
          | 'LIABILITY_SHIFT'
          | 'PAN_ENTRY_MODE'
          | 'TRANSACTION_AMOUNT'
          | 'RISK_SCORE'
          | 'CARD_TRANSACTION_COUNT_1H'
          | 'CARD_TRANSACTION_COUNT_24H';

        /**
         * The operation to apply to the attribute
         */
        operation?:
          | 'IS_ONE_OF'
          | 'IS_NOT_ONE_OF'
          | 'MATCHES'
          | 'DOES_NOT_MATCH'
          | 'IS_GREATER_THAN'
          | 'IS_LESS_THAN';

        /**
         * A regex string, to be used with `MATCHES` or `DOES_NOT_MATCH`
         */
        value?: string | number | Array<string>;
      }
    }
  }
}

export interface V2ApplyResponse {
  /**
   * Auth Rule Token
   */
  token: string;

  /**
   * Account tokens to which the Auth Rule applies.
   */
  account_tokens: Array<string>;

  /**
   * Card tokens to which the Auth Rule applies.
   */
  card_tokens: Array<string>;

  current_version: V2ApplyResponse.CurrentVersion | null;

  draft_version: V2ApplyResponse.DraftVersion | null;

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
   * The type of Auth Rule
   */
  type: 'CONDITIONAL_BLOCK' | 'VELOCITY_LIMIT';

  /**
   * Card tokens to which the Auth Rule does not apply.
   */
  excluded_card_tokens?: Array<string>;
}

export namespace V2ApplyResponse {
  export interface CurrentVersion {
    /**
     * Parameters for the current version of the Auth Rule
     */
    parameters: CurrentVersion.ConditionalBlockParameters | Shared.VelocityLimitParams;

    /**
     * The version of the rule, this is incremented whenever the rule's parameters
     * change.
     */
    version: number;
  }

  export namespace CurrentVersion {
    export interface ConditionalBlockParameters {
      conditions: Array<ConditionalBlockParameters.Condition>;
    }

    export namespace ConditionalBlockParameters {
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
         * - `CURRENCY`: 3-digit alphabetic ISO 4217 code for the merchant currency of the
         *   transaction.
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
         * - `CARD_TRANSACTION_COUNT_1H`: The number of transactions on the card in the
         *   trailing hour up and until the authorization.
         * - `CARD_TRANSACTION_COUNT_24H`: The number of transactions on the card in the
         *   trailing 24 hours up and until the authorization.
         */
        attribute?:
          | 'MCC'
          | 'COUNTRY'
          | 'CURRENCY'
          | 'MERCHANT_ID'
          | 'DESCRIPTOR'
          | 'LIABILITY_SHIFT'
          | 'PAN_ENTRY_MODE'
          | 'TRANSACTION_AMOUNT'
          | 'RISK_SCORE'
          | 'CARD_TRANSACTION_COUNT_1H'
          | 'CARD_TRANSACTION_COUNT_24H';

        /**
         * The operation to apply to the attribute
         */
        operation?:
          | 'IS_ONE_OF'
          | 'IS_NOT_ONE_OF'
          | 'MATCHES'
          | 'DOES_NOT_MATCH'
          | 'IS_GREATER_THAN'
          | 'IS_LESS_THAN';

        /**
         * A regex string, to be used with `MATCHES` or `DOES_NOT_MATCH`
         */
        value?: string | number | Array<string>;
      }
    }
  }

  export interface DraftVersion {
    /**
     * Parameters for the current version of the Auth Rule
     */
    parameters: DraftVersion.ConditionalBlockParameters | Shared.VelocityLimitParams;

    /**
     * The version of the rule, this is incremented whenever the rule's parameters
     * change.
     */
    version: number;
  }

  export namespace DraftVersion {
    export interface ConditionalBlockParameters {
      conditions: Array<ConditionalBlockParameters.Condition>;
    }

    export namespace ConditionalBlockParameters {
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
         * - `CURRENCY`: 3-digit alphabetic ISO 4217 code for the merchant currency of the
         *   transaction.
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
         * - `CARD_TRANSACTION_COUNT_1H`: The number of transactions on the card in the
         *   trailing hour up and until the authorization.
         * - `CARD_TRANSACTION_COUNT_24H`: The number of transactions on the card in the
         *   trailing 24 hours up and until the authorization.
         */
        attribute?:
          | 'MCC'
          | 'COUNTRY'
          | 'CURRENCY'
          | 'MERCHANT_ID'
          | 'DESCRIPTOR'
          | 'LIABILITY_SHIFT'
          | 'PAN_ENTRY_MODE'
          | 'TRANSACTION_AMOUNT'
          | 'RISK_SCORE'
          | 'CARD_TRANSACTION_COUNT_1H'
          | 'CARD_TRANSACTION_COUNT_24H';

        /**
         * The operation to apply to the attribute
         */
        operation?:
          | 'IS_ONE_OF'
          | 'IS_NOT_ONE_OF'
          | 'MATCHES'
          | 'DOES_NOT_MATCH'
          | 'IS_GREATER_THAN'
          | 'IS_LESS_THAN';

        /**
         * A regex string, to be used with `MATCHES` or `DOES_NOT_MATCH`
         */
        value?: string | number | Array<string>;
      }
    }
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
   * Card tokens to which the Auth Rule applies.
   */
  card_tokens: Array<string>;

  current_version: V2DraftResponse.CurrentVersion | null;

  draft_version: V2DraftResponse.DraftVersion | null;

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
   * The type of Auth Rule
   */
  type: 'CONDITIONAL_BLOCK' | 'VELOCITY_LIMIT';

  /**
   * Card tokens to which the Auth Rule does not apply.
   */
  excluded_card_tokens?: Array<string>;
}

export namespace V2DraftResponse {
  export interface CurrentVersion {
    /**
     * Parameters for the current version of the Auth Rule
     */
    parameters: CurrentVersion.ConditionalBlockParameters | Shared.VelocityLimitParams;

    /**
     * The version of the rule, this is incremented whenever the rule's parameters
     * change.
     */
    version: number;
  }

  export namespace CurrentVersion {
    export interface ConditionalBlockParameters {
      conditions: Array<ConditionalBlockParameters.Condition>;
    }

    export namespace ConditionalBlockParameters {
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
         * - `CURRENCY`: 3-digit alphabetic ISO 4217 code for the merchant currency of the
         *   transaction.
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
         * - `CARD_TRANSACTION_COUNT_1H`: The number of transactions on the card in the
         *   trailing hour up and until the authorization.
         * - `CARD_TRANSACTION_COUNT_24H`: The number of transactions on the card in the
         *   trailing 24 hours up and until the authorization.
         */
        attribute?:
          | 'MCC'
          | 'COUNTRY'
          | 'CURRENCY'
          | 'MERCHANT_ID'
          | 'DESCRIPTOR'
          | 'LIABILITY_SHIFT'
          | 'PAN_ENTRY_MODE'
          | 'TRANSACTION_AMOUNT'
          | 'RISK_SCORE'
          | 'CARD_TRANSACTION_COUNT_1H'
          | 'CARD_TRANSACTION_COUNT_24H';

        /**
         * The operation to apply to the attribute
         */
        operation?:
          | 'IS_ONE_OF'
          | 'IS_NOT_ONE_OF'
          | 'MATCHES'
          | 'DOES_NOT_MATCH'
          | 'IS_GREATER_THAN'
          | 'IS_LESS_THAN';

        /**
         * A regex string, to be used with `MATCHES` or `DOES_NOT_MATCH`
         */
        value?: string | number | Array<string>;
      }
    }
  }

  export interface DraftVersion {
    /**
     * Parameters for the current version of the Auth Rule
     */
    parameters: DraftVersion.ConditionalBlockParameters | Shared.VelocityLimitParams;

    /**
     * The version of the rule, this is incremented whenever the rule's parameters
     * change.
     */
    version: number;
  }

  export namespace DraftVersion {
    export interface ConditionalBlockParameters {
      conditions: Array<ConditionalBlockParameters.Condition>;
    }

    export namespace ConditionalBlockParameters {
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
         * - `CURRENCY`: 3-digit alphabetic ISO 4217 code for the merchant currency of the
         *   transaction.
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
         * - `CARD_TRANSACTION_COUNT_1H`: The number of transactions on the card in the
         *   trailing hour up and until the authorization.
         * - `CARD_TRANSACTION_COUNT_24H`: The number of transactions on the card in the
         *   trailing 24 hours up and until the authorization.
         */
        attribute?:
          | 'MCC'
          | 'COUNTRY'
          | 'CURRENCY'
          | 'MERCHANT_ID'
          | 'DESCRIPTOR'
          | 'LIABILITY_SHIFT'
          | 'PAN_ENTRY_MODE'
          | 'TRANSACTION_AMOUNT'
          | 'RISK_SCORE'
          | 'CARD_TRANSACTION_COUNT_1H'
          | 'CARD_TRANSACTION_COUNT_24H';

        /**
         * The operation to apply to the attribute
         */
        operation?:
          | 'IS_ONE_OF'
          | 'IS_NOT_ONE_OF'
          | 'MATCHES'
          | 'DOES_NOT_MATCH'
          | 'IS_GREATER_THAN'
          | 'IS_LESS_THAN';

        /**
         * A regex string, to be used with `MATCHES` or `DOES_NOT_MATCH`
         */
        value?: string | number | Array<string>;
      }
    }
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
   * Card tokens to which the Auth Rule applies.
   */
  card_tokens: Array<string>;

  current_version: V2PromoteResponse.CurrentVersion | null;

  draft_version: V2PromoteResponse.DraftVersion | null;

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
   * The type of Auth Rule
   */
  type: 'CONDITIONAL_BLOCK' | 'VELOCITY_LIMIT';

  /**
   * Card tokens to which the Auth Rule does not apply.
   */
  excluded_card_tokens?: Array<string>;
}

export namespace V2PromoteResponse {
  export interface CurrentVersion {
    /**
     * Parameters for the current version of the Auth Rule
     */
    parameters: CurrentVersion.ConditionalBlockParameters | Shared.VelocityLimitParams;

    /**
     * The version of the rule, this is incremented whenever the rule's parameters
     * change.
     */
    version: number;
  }

  export namespace CurrentVersion {
    export interface ConditionalBlockParameters {
      conditions: Array<ConditionalBlockParameters.Condition>;
    }

    export namespace ConditionalBlockParameters {
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
         * - `CURRENCY`: 3-digit alphabetic ISO 4217 code for the merchant currency of the
         *   transaction.
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
         * - `CARD_TRANSACTION_COUNT_1H`: The number of transactions on the card in the
         *   trailing hour up and until the authorization.
         * - `CARD_TRANSACTION_COUNT_24H`: The number of transactions on the card in the
         *   trailing 24 hours up and until the authorization.
         */
        attribute?:
          | 'MCC'
          | 'COUNTRY'
          | 'CURRENCY'
          | 'MERCHANT_ID'
          | 'DESCRIPTOR'
          | 'LIABILITY_SHIFT'
          | 'PAN_ENTRY_MODE'
          | 'TRANSACTION_AMOUNT'
          | 'RISK_SCORE'
          | 'CARD_TRANSACTION_COUNT_1H'
          | 'CARD_TRANSACTION_COUNT_24H';

        /**
         * The operation to apply to the attribute
         */
        operation?:
          | 'IS_ONE_OF'
          | 'IS_NOT_ONE_OF'
          | 'MATCHES'
          | 'DOES_NOT_MATCH'
          | 'IS_GREATER_THAN'
          | 'IS_LESS_THAN';

        /**
         * A regex string, to be used with `MATCHES` or `DOES_NOT_MATCH`
         */
        value?: string | number | Array<string>;
      }
    }
  }

  export interface DraftVersion {
    /**
     * Parameters for the current version of the Auth Rule
     */
    parameters: DraftVersion.ConditionalBlockParameters | Shared.VelocityLimitParams;

    /**
     * The version of the rule, this is incremented whenever the rule's parameters
     * change.
     */
    version: number;
  }

  export namespace DraftVersion {
    export interface ConditionalBlockParameters {
      conditions: Array<ConditionalBlockParameters.Condition>;
    }

    export namespace ConditionalBlockParameters {
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
         * - `CURRENCY`: 3-digit alphabetic ISO 4217 code for the merchant currency of the
         *   transaction.
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
         * - `CARD_TRANSACTION_COUNT_1H`: The number of transactions on the card in the
         *   trailing hour up and until the authorization.
         * - `CARD_TRANSACTION_COUNT_24H`: The number of transactions on the card in the
         *   trailing 24 hours up and until the authorization.
         */
        attribute?:
          | 'MCC'
          | 'COUNTRY'
          | 'CURRENCY'
          | 'MERCHANT_ID'
          | 'DESCRIPTOR'
          | 'LIABILITY_SHIFT'
          | 'PAN_ENTRY_MODE'
          | 'TRANSACTION_AMOUNT'
          | 'RISK_SCORE'
          | 'CARD_TRANSACTION_COUNT_1H'
          | 'CARD_TRANSACTION_COUNT_24H';

        /**
         * The operation to apply to the attribute
         */
        operation?:
          | 'IS_ONE_OF'
          | 'IS_NOT_ONE_OF'
          | 'MATCHES'
          | 'DOES_NOT_MATCH'
          | 'IS_GREATER_THAN'
          | 'IS_LESS_THAN';

        /**
         * A regex string, to be used with `MATCHES` or `DOES_NOT_MATCH`
         */
        value?: string | number | Array<string>;
      }
    }
  }
}

export interface V2ReportResponse {
  report_token?: string;
}

export type V2CreateParams =
  | V2CreateParams.CreateAuthRuleRequestAccountTokens
  | V2CreateParams.CreateAuthRuleRequestCardTokens
  | V2CreateParams.CreateAuthRuleRequestProgramLevel;

export namespace V2CreateParams {
  export interface CreateAuthRuleRequestAccountTokens {
    /**
     * Account tokens to which the Auth Rule applies.
     */
    account_tokens: Array<string>;

    /**
     * Auth Rule Name
     */
    name?: string | null;

    /**
     * Parameters for the current version of the Auth Rule
     */
    parameters?:
      | V2CreateParams.CreateAuthRuleRequestAccountTokens.ConditionalBlockParameters
      | Shared.VelocityLimitParams;

    /**
     * The type of Auth Rule
     */
    type?: 'CONDITIONAL_BLOCK' | 'VELOCITY_LIMIT';
  }

  export namespace CreateAuthRuleRequestAccountTokens {
    export interface ConditionalBlockParameters {
      conditions: Array<ConditionalBlockParameters.Condition>;
    }

    export namespace ConditionalBlockParameters {
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
         * - `CURRENCY`: 3-digit alphabetic ISO 4217 code for the merchant currency of the
         *   transaction.
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
         * - `CARD_TRANSACTION_COUNT_1H`: The number of transactions on the card in the
         *   trailing hour up and until the authorization.
         * - `CARD_TRANSACTION_COUNT_24H`: The number of transactions on the card in the
         *   trailing 24 hours up and until the authorization.
         */
        attribute?:
          | 'MCC'
          | 'COUNTRY'
          | 'CURRENCY'
          | 'MERCHANT_ID'
          | 'DESCRIPTOR'
          | 'LIABILITY_SHIFT'
          | 'PAN_ENTRY_MODE'
          | 'TRANSACTION_AMOUNT'
          | 'RISK_SCORE'
          | 'CARD_TRANSACTION_COUNT_1H'
          | 'CARD_TRANSACTION_COUNT_24H';

        /**
         * The operation to apply to the attribute
         */
        operation?:
          | 'IS_ONE_OF'
          | 'IS_NOT_ONE_OF'
          | 'MATCHES'
          | 'DOES_NOT_MATCH'
          | 'IS_GREATER_THAN'
          | 'IS_LESS_THAN';

        /**
         * A regex string, to be used with `MATCHES` or `DOES_NOT_MATCH`
         */
        value?: string | number | Array<string>;
      }
    }
  }

  export interface CreateAuthRuleRequestCardTokens {
    /**
     * Card tokens to which the Auth Rule applies.
     */
    card_tokens: Array<string>;

    /**
     * Auth Rule Name
     */
    name?: string | null;

    /**
     * Parameters for the current version of the Auth Rule
     */
    parameters?:
      | V2CreateParams.CreateAuthRuleRequestCardTokens.ConditionalBlockParameters
      | Shared.VelocityLimitParams;

    /**
     * The type of Auth Rule
     */
    type?: 'CONDITIONAL_BLOCK' | 'VELOCITY_LIMIT';
  }

  export namespace CreateAuthRuleRequestCardTokens {
    export interface ConditionalBlockParameters {
      conditions: Array<ConditionalBlockParameters.Condition>;
    }

    export namespace ConditionalBlockParameters {
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
         * - `CURRENCY`: 3-digit alphabetic ISO 4217 code for the merchant currency of the
         *   transaction.
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
         * - `CARD_TRANSACTION_COUNT_1H`: The number of transactions on the card in the
         *   trailing hour up and until the authorization.
         * - `CARD_TRANSACTION_COUNT_24H`: The number of transactions on the card in the
         *   trailing 24 hours up and until the authorization.
         */
        attribute?:
          | 'MCC'
          | 'COUNTRY'
          | 'CURRENCY'
          | 'MERCHANT_ID'
          | 'DESCRIPTOR'
          | 'LIABILITY_SHIFT'
          | 'PAN_ENTRY_MODE'
          | 'TRANSACTION_AMOUNT'
          | 'RISK_SCORE'
          | 'CARD_TRANSACTION_COUNT_1H'
          | 'CARD_TRANSACTION_COUNT_24H';

        /**
         * The operation to apply to the attribute
         */
        operation?:
          | 'IS_ONE_OF'
          | 'IS_NOT_ONE_OF'
          | 'MATCHES'
          | 'DOES_NOT_MATCH'
          | 'IS_GREATER_THAN'
          | 'IS_LESS_THAN';

        /**
         * A regex string, to be used with `MATCHES` or `DOES_NOT_MATCH`
         */
        value?: string | number | Array<string>;
      }
    }
  }

  export interface CreateAuthRuleRequestProgramLevel {
    /**
     * Whether the Auth Rule applies to all authorizations on the card program.
     */
    program_level: boolean;

    /**
     * Card tokens to which the Auth Rule does not apply.
     */
    excluded_card_tokens?: Array<string>;

    /**
     * Auth Rule Name
     */
    name?: string | null;

    /**
     * Parameters for the current version of the Auth Rule
     */
    parameters?:
      | V2CreateParams.CreateAuthRuleRequestProgramLevel.ConditionalBlockParameters
      | Shared.VelocityLimitParams;

    /**
     * The type of Auth Rule
     */
    type?: 'CONDITIONAL_BLOCK' | 'VELOCITY_LIMIT';
  }

  export namespace CreateAuthRuleRequestProgramLevel {
    export interface ConditionalBlockParameters {
      conditions: Array<ConditionalBlockParameters.Condition>;
    }

    export namespace ConditionalBlockParameters {
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
         * - `CURRENCY`: 3-digit alphabetic ISO 4217 code for the merchant currency of the
         *   transaction.
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
         * - `CARD_TRANSACTION_COUNT_1H`: The number of transactions on the card in the
         *   trailing hour up and until the authorization.
         * - `CARD_TRANSACTION_COUNT_24H`: The number of transactions on the card in the
         *   trailing 24 hours up and until the authorization.
         */
        attribute?:
          | 'MCC'
          | 'COUNTRY'
          | 'CURRENCY'
          | 'MERCHANT_ID'
          | 'DESCRIPTOR'
          | 'LIABILITY_SHIFT'
          | 'PAN_ENTRY_MODE'
          | 'TRANSACTION_AMOUNT'
          | 'RISK_SCORE'
          | 'CARD_TRANSACTION_COUNT_1H'
          | 'CARD_TRANSACTION_COUNT_24H';

        /**
         * The operation to apply to the attribute
         */
        operation?:
          | 'IS_ONE_OF'
          | 'IS_NOT_ONE_OF'
          | 'MATCHES'
          | 'DOES_NOT_MATCH'
          | 'IS_GREATER_THAN'
          | 'IS_LESS_THAN';

        /**
         * A regex string, to be used with `MATCHES` or `DOES_NOT_MATCH`
         */
        value?: string | number | Array<string>;
      }
    }
  }
}

export interface V2UpdateParams {
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

export interface V2ListParams extends CursorPageParams {
  /**
   * Only return Authorization Rules that are bound to the provided account token.
   */
  account_token?: string;

  /**
   * Only return Authorization Rules that are bound to the provided card token.
   */
  card_token?: string;
}

export type V2ApplyParams =
  | V2ApplyParams.ApplyAuthRuleRequestAccountTokens
  | V2ApplyParams.ApplyAuthRuleRequestCardTokens
  | V2ApplyParams.ApplyAuthRuleRequestProgramLevel;

export namespace V2ApplyParams {
  export interface ApplyAuthRuleRequestAccountTokens {
    /**
     * Account tokens to which the Auth Rule applies.
     */
    account_tokens: Array<string>;
  }

  export interface ApplyAuthRuleRequestCardTokens {
    /**
     * Card tokens to which the Auth Rule applies.
     */
    card_tokens: Array<string>;
  }

  export interface ApplyAuthRuleRequestProgramLevel {
    /**
     * Whether the Auth Rule applies to all authorizations on the card program.
     */
    program_level: boolean;

    /**
     * Card tokens to which the Auth Rule does not apply.
     */
    excluded_card_tokens?: Array<string>;
  }
}

export interface V2DraftParams {
  /**
   * Parameters for the current version of the Auth Rule
   */
  parameters?: V2DraftParams.ConditionalBlockParameters | Shared.VelocityLimitParams | null;
}

export namespace V2DraftParams {
  export interface ConditionalBlockParameters {
    conditions: Array<ConditionalBlockParameters.Condition>;
  }

  export namespace ConditionalBlockParameters {
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
       * - `CURRENCY`: 3-digit alphabetic ISO 4217 code for the merchant currency of the
       *   transaction.
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
       * - `CARD_TRANSACTION_COUNT_1H`: The number of transactions on the card in the
       *   trailing hour up and until the authorization.
       * - `CARD_TRANSACTION_COUNT_24H`: The number of transactions on the card in the
       *   trailing 24 hours up and until the authorization.
       */
      attribute?:
        | 'MCC'
        | 'COUNTRY'
        | 'CURRENCY'
        | 'MERCHANT_ID'
        | 'DESCRIPTOR'
        | 'LIABILITY_SHIFT'
        | 'PAN_ENTRY_MODE'
        | 'TRANSACTION_AMOUNT'
        | 'RISK_SCORE'
        | 'CARD_TRANSACTION_COUNT_1H'
        | 'CARD_TRANSACTION_COUNT_24H';

      /**
       * The operation to apply to the attribute
       */
      operation?:
        | 'IS_ONE_OF'
        | 'IS_NOT_ONE_OF'
        | 'MATCHES'
        | 'DOES_NOT_MATCH'
        | 'IS_GREATER_THAN'
        | 'IS_LESS_THAN';

      /**
       * A regex string, to be used with `MATCHES` or `DOES_NOT_MATCH`
       */
      value?: string | number | Array<string>;
    }
  }
}

V2.V2ListResponsesCursorPage = V2ListResponsesCursorPage;
V2.Backtests = Backtests;

export declare namespace V2 {
  export {
    type V2CreateResponse as V2CreateResponse,
    type V2RetrieveResponse as V2RetrieveResponse,
    type V2UpdateResponse as V2UpdateResponse,
    type V2ListResponse as V2ListResponse,
    type V2ApplyResponse as V2ApplyResponse,
    type V2DraftResponse as V2DraftResponse,
    type V2PromoteResponse as V2PromoteResponse,
    type V2ReportResponse as V2ReportResponse,
    V2ListResponsesCursorPage as V2ListResponsesCursorPage,
    type V2CreateParams as V2CreateParams,
    type V2UpdateParams as V2UpdateParams,
    type V2ListParams as V2ListParams,
    type V2ApplyParams as V2ApplyParams,
    type V2DraftParams as V2DraftParams,
  };

  export {
    Backtests as Backtests,
    type BacktestResults as BacktestResults,
    type BacktestCreateResponse as BacktestCreateResponse,
    type BacktestCreateParams as BacktestCreateParams,
  };
}
