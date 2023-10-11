// File generated from our OpenAPI spec by Stainless.

import { APIResource } from 'lithic/resource';
import * as AuthenticationAPI from 'lithic/resources/three-ds/authentication';
import * as DecisioningAPI from 'lithic/resources/three-ds/decisioning';

export class ThreeDS extends APIResource {
  authentication: AuthenticationAPI.Authentication = new AuthenticationAPI.Authentication(this.client);
  decisioning: DecisioningAPI.Decisioning = new DecisioningAPI.Decisioning(this.client);
}

export namespace ThreeDS {
  export import Authentication = AuthenticationAPI.Authentication;
  export type AuthenticationRetrieveResponse = AuthenticationAPI.AuthenticationRetrieveResponse;
  export type AuthenticationSimulateResponse = AuthenticationAPI.AuthenticationSimulateResponse;
  export type AuthenticationSimulateParams = AuthenticationAPI.AuthenticationSimulateParams;
  export import Decisioning = DecisioningAPI.Decisioning;
  export type DecisioningRetrieveSecretResponse = DecisioningAPI.DecisioningRetrieveSecretResponse;
}
