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
  export import AuthenticationRetrieveResponse = AuthenticationAPI.AuthenticationRetrieveResponse;
  export import AuthenticationSimulateResponse = AuthenticationAPI.AuthenticationSimulateResponse;
  export import AuthenticationSimulateParams = AuthenticationAPI.AuthenticationSimulateParams;
  export import Decisioning = DecisioningAPI.Decisioning;
  export import ChallengeResponse = DecisioningAPI.ChallengeResponse;
  export import ChallengeResult = DecisioningAPI.ChallengeResult;
  export import DecisioningRetrieveSecretResponse = DecisioningAPI.DecisioningRetrieveSecretResponse;
  export import DecisioningSimulateChallengeResponse = DecisioningAPI.DecisioningSimulateChallengeResponse;
  export import DecisioningChallengeResponseParams = DecisioningAPI.DecisioningChallengeResponseParams;
  export import DecisioningSimulateChallengeParams = DecisioningAPI.DecisioningSimulateChallengeParams;
  export import DecisioningSimulateChallengeResponseParams = DecisioningAPI.DecisioningSimulateChallengeResponseParams;
}
