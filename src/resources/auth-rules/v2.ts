// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../resource';
import { isRequestOptions } from '../../core';
import * as Core from '../../core';
import * as V2API from './v2';
import * as Shared from '../shared';
import { CursorPage, type CursorPageParams } from '../../pagination';

export class V2 extends APIResource {
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
         * The attribute to target
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
         * The attribute to target
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

export interface V2RetrieveResponse {
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
         * The attribute to target
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
         * The attribute to target
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

export interface V2UpdateResponse {
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
         * The attribute to target
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
         * The attribute to target
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

export interface V2ListResponse {
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
         * The attribute to target
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
         * The attribute to target
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

export interface V2ApplyResponse {
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
         * The attribute to target
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
         * The attribute to target
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

export interface V2DraftResponse {
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
         * The attribute to target
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
         * The attribute to target
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

export interface V2PromoteResponse {
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
         * The attribute to target
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
         * The attribute to target
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
         * The attribute to target
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

  export interface CreateAuthRuleRequestCardTokens {
    /**
     * Card tokens to which the Auth Rule applies.
     */
    card_tokens: Array<string>;

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
         * The attribute to target
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

  export interface CreateAuthRuleRequestProgramLevel {
    /**
     * Whether the Auth Rule applies to all authorizations on the card program.
     */
    program_level: boolean;

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
         * The attribute to target
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

export interface V2UpdateParams {
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
       * The attribute to target
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

export namespace V2 {
  export type V2CreateResponse = V2API.V2CreateResponse;
  export type V2RetrieveResponse = V2API.V2RetrieveResponse;
  export type V2UpdateResponse = V2API.V2UpdateResponse;
  export type V2ListResponse = V2API.V2ListResponse;
  export type V2ApplyResponse = V2API.V2ApplyResponse;
  export type V2DraftResponse = V2API.V2DraftResponse;
  export type V2PromoteResponse = V2API.V2PromoteResponse;
  export type V2ReportResponse = V2API.V2ReportResponse;
  export import V2ListResponsesCursorPage = V2API.V2ListResponsesCursorPage;
  export type V2CreateParams = V2API.V2CreateParams;
  export type V2UpdateParams = V2API.V2UpdateParams;
  export type V2ListParams = V2API.V2ListParams;
  export type V2ApplyParams = V2API.V2ApplyParams;
  export type V2DraftParams = V2API.V2DraftParams;
}
