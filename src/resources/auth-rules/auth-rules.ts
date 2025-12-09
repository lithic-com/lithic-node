// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as V2API from './v2/v2';
import {
  AuthRule,
  AuthRuleCondition,
  AuthRulesCursorPage,
  Conditional3DSActionParameters,
  ConditionalACHActionParameters,
  ConditionalAttribute,
  ConditionalAuthorizationActionParameters,
  ConditionalBlockParameters,
  ConditionalOperation,
  ConditionalTokenizationActionParameters,
  ConditionalValue,
  EventStream,
  MerchantLockParameters,
  RuleStats,
  V2,
  V2CreateParams,
  V2DraftParams,
  V2ListParams,
  V2RetrieveFeaturesParams,
  V2RetrieveFeaturesResponse,
  V2RetrieveReportParams,
  V2RetrieveReportResponse,
  V2UpdateParams,
  VelocityLimitParams,
  VelocityLimitPeriod,
} from './v2/v2';

export class AuthRules extends APIResource {
  v2: V2API.V2 = new V2API.V2(this._client);
}

AuthRules.V2 = V2;

export declare namespace AuthRules {
  export {
    V2 as V2,
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
    type EventStream as EventStream,
    type MerchantLockParameters as MerchantLockParameters,
    type RuleStats as RuleStats,
    type VelocityLimitParams as VelocityLimitParams,
    type VelocityLimitPeriod as VelocityLimitPeriod,
    type V2RetrieveFeaturesResponse as V2RetrieveFeaturesResponse,
    type V2RetrieveReportResponse as V2RetrieveReportResponse,
    type AuthRulesCursorPage as AuthRulesCursorPage,
    type V2CreateParams as V2CreateParams,
    type V2UpdateParams as V2UpdateParams,
    type V2ListParams as V2ListParams,
    type V2DraftParams as V2DraftParams,
    type V2RetrieveFeaturesParams as V2RetrieveFeaturesParams,
    type V2RetrieveReportParams as V2RetrieveReportParams,
  };
}
