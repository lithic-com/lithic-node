// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../resource';
import * as AuthenticationAPI from './authentication';
import * as DecisioningAPI from './decisioning';

export class ThreeDS extends APIResource {
  authentication: AuthenticationAPI.Authentication = new AuthenticationAPI.Authentication(this._client);
  decisioning: DecisioningAPI.Decisioning = new DecisioningAPI.Decisioning(this._client);
}

export namespace ThreeDS {
  export import Authentication = AuthenticationAPI.Authentication;
  export type AuthenticationRetrieveResponse = AuthenticationAPI.AuthenticationRetrieveResponse;
  export type AuthenticationSimulateResponse = AuthenticationAPI.AuthenticationSimulateResponse;
  export type AuthenticationSimulateParams = AuthenticationAPI.AuthenticationSimulateParams;
  export import Decisioning = DecisioningAPI.Decisioning;
  export type ChallengeResponse = DecisioningAPI.ChallengeResponse;
  export type ChallengeResult = DecisioningAPI.ChallengeResult;
  export type DecisioningRetrieveSecretResponse = DecisioningAPI.DecisioningRetrieveSecretResponse;
  export type DecisioningSimulateChallengeResponse = DecisioningAPI.DecisioningSimulateChallengeResponse;
  export type DecisioningChallengeResponseParams = DecisioningAPI.DecisioningChallengeResponseParams;
  export type DecisioningSimulateChallengeParams = DecisioningAPI.DecisioningSimulateChallengeParams;
  export type DecisioningSimulateChallengeResponseParams =
    DecisioningAPI.DecisioningSimulateChallengeResponseParams;
}
