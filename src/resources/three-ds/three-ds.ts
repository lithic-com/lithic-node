// File generated from our OpenAPI spec by Stainless.

import { APIResource } from 'lithic/resource';
import { Authentication } from './authentication';
import { Decisioning } from './decisioning';
import * as API from './index';

export class ThreeDS extends APIResource {
  authentication: Authentication = new Authentication(this.client);
  decisioning: Decisioning = new Decisioning(this.client);
}

export namespace ThreeDS {
  export import Authentication = API.Authentication;
  export import AuthenticationRetrieveResponse = API.AuthenticationRetrieveResponse;

  export import Decisioning = API.Decisioning;
  export import DecisioningRetrieveSecretResponse = API.DecisioningRetrieveSecretResponse;
}
