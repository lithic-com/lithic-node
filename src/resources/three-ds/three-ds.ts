// File generated from our OpenAPI spec by Stainless.

import { APIResource } from 'lithic/resource';
import * as AuthenticationAPI from 'lithic/resources/three-ds/authentication';
import * as DecisioningAPI from 'lithic/resources/three-ds/decisioning';

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
  export import DecisioningRetrieveSecretResponse = DecisioningAPI.DecisioningRetrieveSecretResponse;
}
