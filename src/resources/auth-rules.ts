// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import * as Core from '../core';
import { APIResource } from '../resource';
import { isRequestOptions } from '../core';
import * as AuthRulesAPI from './auth-rules';
import { CursorPage, type CursorPageParams } from '../pagination';

export class AuthRules extends APIResource {
  /**
   * Creates an authorization rule (Auth Rule) and applies it at the program,
   * account, or card level.
   */
  create(body: AuthRuleCreateParams, options?: Core.RequestOptions): Core.APIPromise<AuthRule> {
    return this._client.post('/auth_rules', { body, ...options });
  }

  /**
   * Detail the properties and entities (program, accounts, and cards) associated
   * with an existing authorization rule (Auth Rule).
   */
  retrieve(authRuleToken: string, options?: Core.RequestOptions): Core.APIPromise<AuthRuleRetrieveResponse> {
    return this._client.get(`/auth_rules/${authRuleToken}`, options);
  }

  /**
   * Update the properties associated with an existing authorization rule (Auth
   * Rule).
   */
  update(
    authRuleToken: string,
    body: AuthRuleUpdateParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<AuthRule> {
    return this._client.put(`/auth_rules/${authRuleToken}`, { body, ...options });
  }

  /**
   * Return all of the Auth Rules under the program.
   */
  list(
    query?: AuthRuleListParams,
    options?: Core.RequestOptions,
  ): Core.PagePromise<AuthRulesCursorPage, AuthRule>;
  list(options?: Core.RequestOptions): Core.PagePromise<AuthRulesCursorPage, AuthRule>;
  list(
    query: AuthRuleListParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.PagePromise<AuthRulesCursorPage, AuthRule> {
    if (isRequestOptions(query)) {
      return this.list({}, query);
    }
    return this._client.getAPIList('/auth_rules', AuthRulesCursorPage, { query, ...options });
  }

  /**
   * Applies an existing authorization rule (Auth Rule) to an program, account, or
   * card level.
   */
  apply(
    authRuleToken: string,
    body: AuthRuleApplyParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<AuthRule> {
    return this._client.post(`/auth_rules/${authRuleToken}/apply`, { body, ...options });
  }

  /**
   * Remove an existing authorization rule (Auth Rule) from an program, account, or
   * card-level.
   */
  remove(body: AuthRuleRemoveParams, options?: Core.RequestOptions): Core.APIPromise<AuthRuleRemoveResponse> {
    return this._client.delete('/auth_rules/remove', { body, ...options });
  }
}

export class AuthRulesCursorPage extends CursorPage<AuthRule> {}

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

export interface AuthRuleRetrieveResponse {
  data?: Array<AuthRule>;
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
  export import AuthRule = AuthRulesAPI.AuthRule;
  export import AuthRuleRetrieveResponse = AuthRulesAPI.AuthRuleRetrieveResponse;
  export import AuthRuleRemoveResponse = AuthRulesAPI.AuthRuleRemoveResponse;
  export import AuthRulesCursorPage = AuthRulesAPI.AuthRulesCursorPage;
  export import AuthRuleCreateParams = AuthRulesAPI.AuthRuleCreateParams;
  export import AuthRuleUpdateParams = AuthRulesAPI.AuthRuleUpdateParams;
  export import AuthRuleListParams = AuthRulesAPI.AuthRuleListParams;
  export import AuthRuleApplyParams = AuthRulesAPI.AuthRuleApplyParams;
  export import AuthRuleRemoveParams = AuthRulesAPI.AuthRuleRemoveParams;
}
