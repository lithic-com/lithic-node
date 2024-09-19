// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../resource';
import { isRequestOptions } from '../../core';
import * as Core from '../../core';
import * as AuthRulesAPI from './auth-rules';
import * as Shared from '../shared';
import { AuthRulesCursorPage } from '../shared';
import * as V2API from './v2';
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

export namespace AuthRules {
  export import AuthRuleRetrieveResponse = AuthRulesAPI.AuthRuleRetrieveResponse;
  export import AuthRuleRemoveResponse = AuthRulesAPI.AuthRuleRemoveResponse;
  export import AuthRuleCreateParams = AuthRulesAPI.AuthRuleCreateParams;
  export import AuthRuleUpdateParams = AuthRulesAPI.AuthRuleUpdateParams;
  export import AuthRuleListParams = AuthRulesAPI.AuthRuleListParams;
  export import AuthRuleApplyParams = AuthRulesAPI.AuthRuleApplyParams;
  export import AuthRuleRemoveParams = AuthRulesAPI.AuthRuleRemoveParams;
  export import V2 = V2API.V2;
  export import V2CreateResponse = V2API.V2CreateResponse;
  export import V2RetrieveResponse = V2API.V2RetrieveResponse;
  export import V2UpdateResponse = V2API.V2UpdateResponse;
  export import V2ListResponse = V2API.V2ListResponse;
  export import V2ApplyResponse = V2API.V2ApplyResponse;
  export import V2DraftResponse = V2API.V2DraftResponse;
  export import V2PromoteResponse = V2API.V2PromoteResponse;
  export import V2ReportResponse = V2API.V2ReportResponse;
  export import V2ListResponsesCursorPage = V2API.V2ListResponsesCursorPage;
  export import V2CreateParams = V2API.V2CreateParams;
  export import V2UpdateParams = V2API.V2UpdateParams;
  export import V2ListParams = V2API.V2ListParams;
  export import V2ApplyParams = V2API.V2ApplyParams;
  export import V2DraftParams = V2API.V2DraftParams;
}

export { AuthRulesCursorPage };
