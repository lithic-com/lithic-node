// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../resource';
import { isRequestOptions } from '../../core';
import * as Core from '../../core';
import * as Shared from '../shared';
import { AuthRulesCursorPage } from '../shared';
import * as V2API from './v2';
import {
  V2,
  V2ApplyParams,
  V2ApplyResponse,
  V2CreateParams,
  V2CreateResponse,
  V2DraftParams,
  V2DraftResponse,
  V2ListParams,
  V2ListResponse,
  V2ListResponsesCursorPage,
  V2PromoteResponse,
  V2ReportResponse,
  V2RetrieveResponse,
  V2UpdateParams,
  V2UpdateResponse,
} from './v2';
import { type CursorPageParams } from '../../pagination';

export class AuthRules extends APIResource {
  v2: V2API.V2 = new V2API.V2(this._client);

  /**
   * Creates an authorization rule (Auth Rule) and applies it at the program,
   * account, or card level.
   */
  create(body: AuthRuleCreateParams, options?: Core.RequestOptions): Core.APIPromise<Shared.AuthRule> {
    return this._client.post('/v1/auth_rules', { body, ...options });
  }

  /**
   * Detail the properties and entities (program, accounts, and cards) associated
   * with an existing authorization rule (Auth Rule).
   */
  retrieve(authRuleToken: string, options?: Core.RequestOptions): Core.APIPromise<AuthRuleRetrieveResponse> {
    return this._client.get(`/v1/auth_rules/${authRuleToken}`, options);
  }

  /**
   * Update the properties associated with an existing authorization rule (Auth
   * Rule).
   */
  update(
    authRuleToken: string,
    body: AuthRuleUpdateParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<Shared.AuthRule> {
    return this._client.put(`/v1/auth_rules/${authRuleToken}`, { body, ...options });
  }

  /**
   * Return all of the Auth Rules under the program.
   */
  list(
    query?: AuthRuleListParams,
    options?: Core.RequestOptions,
  ): Core.PagePromise<AuthRulesCursorPage, Shared.AuthRule>;
  list(options?: Core.RequestOptions): Core.PagePromise<AuthRulesCursorPage, Shared.AuthRule>;
  list(
    query: AuthRuleListParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.PagePromise<AuthRulesCursorPage, Shared.AuthRule> {
    if (isRequestOptions(query)) {
      return this.list({}, query);
    }
    return this._client.getAPIList('/v1/auth_rules', AuthRulesCursorPage, { query, ...options });
  }

  /**
   * Applies an existing authorization rule (Auth Rule) to an program, account, or
   * card level.
   */
  apply(
    authRuleToken: string,
    body: AuthRuleApplyParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<Shared.AuthRule> {
    return this._client.post(`/v1/auth_rules/${authRuleToken}/apply`, { body, ...options });
  }

  /**
   * Migrates an existing V1 authorization rule to a V2 authorization rule. Depending
   * on the configuration of the V1 Auth Rule, this will yield one or two V2
   * authorization rules. This endpoint will alter the internal structure of the Auth
   * Rule such that the resulting rules become a V2 Authorization Rule that can be
   * operated on through the /v2/auth_rules endpoints.
   *
   * After a V1 Auth Rule has been migrated, it can no longer be operated on through
   * the /v1/auth_rules/\* endpoints. Eventually, Lithic will deprecate the
   * /v1/auth_rules endpoints and migrate all existing V1 Auth Rules to V2 Auth
   * Rules.
   */
  migrateV1ToV2(
    authRuleToken: string,
    options?: Core.RequestOptions,
  ): Core.APIPromise<AuthRuleMigrateV1ToV2Response> {
    return this._client.post(`/v1/auth_rules/${authRuleToken}/migrate`, options);
  }

  /**
   * Remove an existing authorization rule (Auth Rule) from an program, account, or
   * card-level.
   */
  remove(body: AuthRuleRemoveParams, options?: Core.RequestOptions): Core.APIPromise<AuthRuleRemoveResponse> {
    return this._client.delete('/v1/auth_rules/remove', { body, ...options });
  }
}

export interface AuthRuleRetrieveResponse {
  data?: Array<Shared.AuthRule>;
}

export type AuthRuleMigrateV1ToV2Response =
  Array<AuthRuleMigrateV1ToV2Response.AuthRuleMigrateV1ToV2ResponseItem>;

export namespace AuthRuleMigrateV1ToV2Response {
  export interface AuthRuleMigrateV1ToV2ResponseItem {
    token: string;

    /**
     * Account tokens to which the Auth Rule applies.
     */
    account_tokens: Array<string>;

    /**
     * Card tokens to which the Auth Rule applies.
     */
    card_tokens: Array<string>;

    current_version: AuthRuleMigrateV1ToV2ResponseItem.CurrentVersion | null;

    draft_version: AuthRuleMigrateV1ToV2ResponseItem.DraftVersion | null;

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
  }

  export namespace AuthRuleMigrateV1ToV2ResponseItem {
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
            | 'RISK_SCORE';

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
            | 'RISK_SCORE';

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
}

export interface AuthRuleRemoveResponse {
  account_tokens?: Array<string>;

  card_tokens?: Array<string>;

  program_level?: boolean;
}

export interface AuthRuleCreateParams {
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

export interface AuthRuleUpdateParams {
  /**
   * Array of country codes for which the Auth Rule will permit transactions. Note
   * that only this field or `blocked_countries` can be used for a given Auth Rule.
   */
  allowed_countries?: Array<string>;

  /**
   * Array of merchant category codes for which the Auth Rule will permit
   * transactions. Note that only this field or `blocked_mcc` can be used for a given
   * Auth Rule.
   */
  allowed_mcc?: Array<string>;

  /**
   * Array of country codes for which the Auth Rule will automatically decline
   * transactions. Note that only this field or `allowed_countries` can be used for a
   * given Auth Rule.
   */
  blocked_countries?: Array<string>;

  /**
   * Array of merchant category codes for which the Auth Rule will automatically
   * decline transactions. Note that only this field or `allowed_mcc` can be used for
   * a given Auth Rule.
   */
  blocked_mcc?: Array<string>;
}

export interface AuthRuleListParams extends CursorPageParams {}

export interface AuthRuleApplyParams {
  /**
   * Array of account_token(s) identifying the accounts that the Auth Rule applies
   * to. Note that only this field or `card_tokens` can be provided for a given Auth
   * Rule.
   */
  account_tokens?: Array<string>;

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

export interface AuthRuleRemoveParams {
  /**
   * Array of account_token(s) identifying the accounts that the Auth Rule applies
   * to. Note that only this field or `card_tokens` can be provided for a given Auth
   * Rule.
   */
  account_tokens?: Array<string>;

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

AuthRules.V2 = V2;
AuthRules.V2ListResponsesCursorPage = V2ListResponsesCursorPage;

export declare namespace AuthRules {
  export {
    type AuthRuleRetrieveResponse as AuthRuleRetrieveResponse,
    type AuthRuleMigrateV1ToV2Response as AuthRuleMigrateV1ToV2Response,
    type AuthRuleRemoveResponse as AuthRuleRemoveResponse,
    type AuthRuleCreateParams as AuthRuleCreateParams,
    type AuthRuleUpdateParams as AuthRuleUpdateParams,
    type AuthRuleListParams as AuthRuleListParams,
    type AuthRuleApplyParams as AuthRuleApplyParams,
    type AuthRuleRemoveParams as AuthRuleRemoveParams,
  };

  export {
    V2 as V2,
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
}

export { AuthRulesCursorPage };
