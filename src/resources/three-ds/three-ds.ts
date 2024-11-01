// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../resource';
import * as AuthenticationAPI from './authentication';
import {
  Authentication,
  AuthenticationRetrieveResponse,
  AuthenticationSimulateParams,
  AuthenticationSimulateResponse,
} from './authentication';
import * as DecisioningAPI from './decisioning';
import {
  ChallengeResponse,
  ChallengeResult,
  Decisioning,
  DecisioningChallengeResponseParams,
  DecisioningRetrieveSecretResponse,
  DecisioningSimulateChallengeParams,
  DecisioningSimulateChallengeResponse,
  DecisioningSimulateChallengeResponseParams,
} from './decisioning';

export class ThreeDS extends APIResource {
  authentication: AuthenticationAPI.Authentication = new AuthenticationAPI.Authentication(this._client);
  decisioning: DecisioningAPI.Decisioning = new DecisioningAPI.Decisioning(this._client);
}

ThreeDS.Authentication = Authentication;
ThreeDS.Decisioning = Decisioning;

export declare namespace ThreeDS {
  export {
    Authentication as Authentication,
    type AuthenticationRetrieveResponse as AuthenticationRetrieveResponse,
    type AuthenticationSimulateResponse as AuthenticationSimulateResponse,
    type AuthenticationSimulateParams as AuthenticationSimulateParams,
  };

  export {
    Decisioning as Decisioning,
    type ChallengeResponse as ChallengeResponse,
    type ChallengeResult as ChallengeResult,
    type DecisioningRetrieveSecretResponse as DecisioningRetrieveSecretResponse,
    type DecisioningSimulateChallengeResponse as DecisioningSimulateChallengeResponse,
    type DecisioningChallengeResponseParams as DecisioningChallengeResponseParams,
    type DecisioningSimulateChallengeParams as DecisioningSimulateChallengeParams,
    type DecisioningSimulateChallengeResponseParams as DecisioningSimulateChallengeResponseParams,
  };
}
