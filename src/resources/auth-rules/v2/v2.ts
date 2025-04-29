// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../resource';
import { isRequestOptions } from '../../../core';
import * as Core from '../../../core';
import * as V2API from './v2';
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
   * Fetches a V2 authorization rule by its token
   */
  retrieve(authRuleToken: string, options?: Core.RequestOptions): Core.APIPromise<V2RetrieveResponse> {
    return this._client.get(`/v2/auth_rules/${authRuleToken}`, options);
  }

  /**
   * Updates a V2 authorization rule's properties
   *
   * If `account_tokens`, `card_tokens`, `program_level`, or `excluded_card_tokens`
   * is provided, this will replace existing associations with the provided list of
   * entities.
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
   * Deletes a V2 authorization rule
   */
  del(authRuleToken: string, options?: Core.RequestOptions): Core.APIPromise<void> {
    return this._client.delete(`/v2/auth_rules/${authRuleToken}`, options);
  }

  /**
   * Associates a V2 authorization rule with a card program, the provided account(s)
   * or card(s).
   *
   * Prefer using the `PATCH` method for this operation.
   */
  apply(
    authRuleToken: string,
    body: V2ApplyParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<V2ApplyResponse> {
    return this._client.post(`/v2/auth_rules/${authRuleToken}/apply`, { body, ...options });
  }

  /**
   * Creates a new draft version of a rule that will be ran in shadow mode.
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
   * Promotes the draft version of an authorization rule to the currently active
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
   */
  attribute?: ConditionalAttribute;

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
  | 'WALLET_TYPE';

export interface ConditionalBlockParameters {
  conditions: Array<AuthRuleCondition>;
}

export interface VelocityLimitParams {
  filters: VelocityLimitParams.Filters;

  /**
   * The size of the trailing window to calculate Spend Velocity over in seconds. The
   * minimum value is 10 seconds, and the maximum value is 2678400 seconds (31 days).
   */
  period: number | VelocityLimitParamsPeriodWindow;

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
  }
}

/**
 * The window of time to calculate Spend Velocity over.
 *
 * - `DAY`: Velocity over the current day since midnight Eastern Time.
 * - `WEEK`: Velocity over the current week since 00:00 / 12 AM on Monday in
 *   Eastern Time.
 * - `MONTH`: Velocity over the current month since 00:00 / 12 AM on the first of
 *   the month in Eastern Time.
 */
export type VelocityLimitParamsPeriodWindow = 'DAY' | 'WEEK' | 'MONTH';

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
  type: 'CONDITIONAL_BLOCK' | 'VELOCITY_LIMIT' | 'MERCHANT_LOCK';

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
      | CurrentVersion.MerchantLockParameters;

    /**
     * The version of the rule, this is incremented whenever the rule's parameters
     * change.
     */
    version: number;
  }

  export namespace CurrentVersion {
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
  }

  export interface DraftVersion {
    /**
     * Parameters for the Auth Rule
     */
    parameters:
      | V2API.ConditionalBlockParameters
      | V2API.VelocityLimitParams
      | DraftVersion.MerchantLockParameters;

    /**
     * The version of the rule, this is incremented whenever the rule's parameters
     * change.
     */
    version: number;
  }

  export namespace DraftVersion {
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
  type: 'CONDITIONAL_BLOCK' | 'VELOCITY_LIMIT' | 'MERCHANT_LOCK';

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
      | CurrentVersion.MerchantLockParameters;

    /**
     * The version of the rule, this is incremented whenever the rule's parameters
     * change.
     */
    version: number;
  }

  export namespace CurrentVersion {
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
  }

  export interface DraftVersion {
    /**
     * Parameters for the Auth Rule
     */
    parameters:
      | V2API.ConditionalBlockParameters
      | V2API.VelocityLimitParams
      | DraftVersion.MerchantLockParameters;

    /**
     * The version of the rule, this is incremented whenever the rule's parameters
     * change.
     */
    version: number;
  }

  export namespace DraftVersion {
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
  type: 'CONDITIONAL_BLOCK' | 'VELOCITY_LIMIT' | 'MERCHANT_LOCK';

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
      | CurrentVersion.MerchantLockParameters;

    /**
     * The version of the rule, this is incremented whenever the rule's parameters
     * change.
     */
    version: number;
  }

  export namespace CurrentVersion {
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
  }

  export interface DraftVersion {
    /**
     * Parameters for the Auth Rule
     */
    parameters:
      | V2API.ConditionalBlockParameters
      | V2API.VelocityLimitParams
      | DraftVersion.MerchantLockParameters;

    /**
     * The version of the rule, this is incremented whenever the rule's parameters
     * change.
     */
    version: number;
  }

  export namespace DraftVersion {
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
  type: 'CONDITIONAL_BLOCK' | 'VELOCITY_LIMIT' | 'MERCHANT_LOCK';

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
      | CurrentVersion.MerchantLockParameters;

    /**
     * The version of the rule, this is incremented whenever the rule's parameters
     * change.
     */
    version: number;
  }

  export namespace CurrentVersion {
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
  }

  export interface DraftVersion {
    /**
     * Parameters for the Auth Rule
     */
    parameters:
      | V2API.ConditionalBlockParameters
      | V2API.VelocityLimitParams
      | DraftVersion.MerchantLockParameters;

    /**
     * The version of the rule, this is incremented whenever the rule's parameters
     * change.
     */
    version: number;
  }

  export namespace DraftVersion {
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
  type: 'CONDITIONAL_BLOCK' | 'VELOCITY_LIMIT' | 'MERCHANT_LOCK';

  /**
   * Card tokens to which the Auth Rule does not apply.
   */
  excluded_card_tokens?: Array<string>;
}

export namespace V2ApplyResponse {
  export interface CurrentVersion {
    /**
     * Parameters for the Auth Rule
     */
    parameters:
      | V2API.ConditionalBlockParameters
      | V2API.VelocityLimitParams
      | CurrentVersion.MerchantLockParameters;

    /**
     * The version of the rule, this is incremented whenever the rule's parameters
     * change.
     */
    version: number;
  }

  export namespace CurrentVersion {
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
  }

  export interface DraftVersion {
    /**
     * Parameters for the Auth Rule
     */
    parameters:
      | V2API.ConditionalBlockParameters
      | V2API.VelocityLimitParams
      | DraftVersion.MerchantLockParameters;

    /**
     * The version of the rule, this is incremented whenever the rule's parameters
     * change.
     */
    version: number;
  }

  export namespace DraftVersion {
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
  type: 'CONDITIONAL_BLOCK' | 'VELOCITY_LIMIT' | 'MERCHANT_LOCK';

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
      | CurrentVersion.MerchantLockParameters;

    /**
     * The version of the rule, this is incremented whenever the rule's parameters
     * change.
     */
    version: number;
  }

  export namespace CurrentVersion {
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
  }

  export interface DraftVersion {
    /**
     * Parameters for the Auth Rule
     */
    parameters:
      | V2API.ConditionalBlockParameters
      | V2API.VelocityLimitParams
      | DraftVersion.MerchantLockParameters;

    /**
     * The version of the rule, this is incremented whenever the rule's parameters
     * change.
     */
    version: number;
  }

  export namespace DraftVersion {
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
  type: 'CONDITIONAL_BLOCK' | 'VELOCITY_LIMIT' | 'MERCHANT_LOCK';

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
      | CurrentVersion.MerchantLockParameters;

    /**
     * The version of the rule, this is incremented whenever the rule's parameters
     * change.
     */
    version: number;
  }

  export namespace CurrentVersion {
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
  }

  export interface DraftVersion {
    /**
     * Parameters for the Auth Rule
     */
    parameters:
      | V2API.ConditionalBlockParameters
      | V2API.VelocityLimitParams
      | DraftVersion.MerchantLockParameters;

    /**
     * The version of the rule, this is incremented whenever the rule's parameters
     * change.
     */
    version: number;
  }

  export namespace DraftVersion {
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
  }
}

export interface V2ReportResponse {
  report_token?: string;
}

export type V2CreateParams =
  | V2CreateParams.CreateAuthRuleRequestAccountTokens
  | V2CreateParams.CreateAuthRuleRequestCardTokens
  | V2CreateParams.CreateAuthRuleRequestProgramLevel;

export declare namespace V2CreateParams {
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
     * Parameters for the Auth Rule
     */
    parameters?:
      | ConditionalBlockParameters
      | VelocityLimitParams
      | CreateAuthRuleRequestAccountTokens.MerchantLockParameters;

    /**
     * The type of Auth Rule
     */
    type?: 'CONDITIONAL_BLOCK' | 'VELOCITY_LIMIT' | 'MERCHANT_LOCK';
  }

  export namespace CreateAuthRuleRequestAccountTokens {
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
     * Parameters for the Auth Rule
     */
    parameters?:
      | ConditionalBlockParameters
      | VelocityLimitParams
      | CreateAuthRuleRequestCardTokens.MerchantLockParameters;

    /**
     * The type of Auth Rule
     */
    type?: 'CONDITIONAL_BLOCK' | 'VELOCITY_LIMIT' | 'MERCHANT_LOCK';
  }

  export namespace CreateAuthRuleRequestCardTokens {
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
     * Parameters for the Auth Rule
     */
    parameters?:
      | ConditionalBlockParameters
      | VelocityLimitParams
      | CreateAuthRuleRequestProgramLevel.MerchantLockParameters;

    /**
     * The type of Auth Rule
     */
    type?: 'CONDITIONAL_BLOCK' | 'VELOCITY_LIMIT' | 'MERCHANT_LOCK';
  }

  export namespace CreateAuthRuleRequestProgramLevel {
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
   * Only return Authorization Rules that are bound to the provided account token.
   */
  account_token?: string;

  /**
   * Only return Authorization Rules that are bound to the provided card token.
   */
  card_token?: string;

  /**
   * Only return Authorization Rules that are bound to the provided scope;
   */
  scope?: 'PROGRAM' | 'ACCOUNT' | 'CARD';
}

export type V2ApplyParams =
  | V2ApplyParams.ApplyAuthRuleRequestAccountTokens
  | V2ApplyParams.ApplyAuthRuleRequestCardTokens
  | V2ApplyParams.ApplyAuthRuleRequestProgramLevel;

export declare namespace V2ApplyParams {
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
   * Parameters for the Auth Rule
   */
  parameters?: ConditionalBlockParameters | VelocityLimitParams | V2DraftParams.MerchantLockParameters | null;
}

export namespace V2DraftParams {
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
}

V2.V2ListResponsesCursorPage = V2ListResponsesCursorPage;
V2.Backtests = Backtests;

export declare namespace V2 {
  export {
    type AuthRule as AuthRule,
    type AuthRuleCondition as AuthRuleCondition,
    type ConditionalAttribute as ConditionalAttribute,
    type ConditionalBlockParameters as ConditionalBlockParameters,
    type VelocityLimitParams as VelocityLimitParams,
    type VelocityLimitParamsPeriodWindow as VelocityLimitParamsPeriodWindow,
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
