// File generated from our OpenAPI spec by Stainless.

import { APIResource } from 'lithic/resource';
import { Authentication } from './authentication';
import { Descisioning } from './descisioning';
import * as API from './';

export class ThreeDS extends APIResource {
  authentication: Authentication = new Authentication(this.client);
  descisioning: Descisioning = new Descisioning(this.client);
}

export namespace ThreeDS {
  export import Authentication = API.Authentication;
  export import AuthenticationRetrieveResponse = API.AuthenticationRetrieveResponse;

  export import Descisioning = API.Descisioning;
  export import DescisioningRetrieveSecretResponse = API.DescisioningRetrieveSecretResponse;
}
