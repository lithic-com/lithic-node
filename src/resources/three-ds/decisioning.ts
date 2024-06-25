// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../resource';
import * as Core from '../../core';
import * as DecisioningAPI from './decisioning';

export class Decisioning extends APIResource {
  /**
   * Retrieve the 3DS Decisioning HMAC secret key. If one does not exist for your
   * program yet, calling this endpoint will create one for you. The headers (which
   * you can use to verify 3DS Decisioning requests) will begin appearing shortly
   * after calling this endpoint for the first time. See
   * [this page](https://docs.lithic.com/docs/3ds-decisioning#3ds-decisioning-hmac-secrets)
   * for more detail about verifying 3DS Decisioning requests.
   */
  retrieveSecret(options?: Core.RequestOptions): Core.APIPromise<DecisioningRetrieveSecretResponse> {
    return this._client.get('/three_ds_decisioning/secret', options);
  }

  /**
   * Generate a new 3DS Decisioning HMAC secret key. The old secret key will be
   * deactivated 24 hours after a successful request to this endpoint. Make a
   * [`GET /three_ds_decisioning/secret`](https://docs.lithic.com/reference/getthreedsdecisioningsecret)
   * request to retrieve the new secret key.
   */
  rotateSecret(options?: Core.RequestOptions): Core.APIPromise<void> {
    return this._client.post('/three_ds_decisioning/secret/rotate', options);
  }
}

export interface DecisioningRetrieveSecretResponse {
  /**
   * The 3DS Decisioning HMAC secret
   */
  secret?: string;
}

export namespace Decisioning {
  export import DecisioningRetrieveSecretResponse = DecisioningAPI.DecisioningRetrieveSecretResponse;
}
