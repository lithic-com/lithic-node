// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import * as Core from '../core';
import * as TokenizationDecisioningAPI from './tokenization-decisioning';

export class TokenizationDecisioning extends APIResource {
  /**
   * Retrieve the Tokenization Decisioning secret key. If one does not exist your
   * program yet, calling this endpoint will create one for you. The headers of the
   * Tokenization Decisioning request will contain a hmac signature which you can use
   * to verify requests originate from Lithic. See
   * [this page](https://docs.lithic.com/docs/events-api#verifying-webhooks) for more
   * detail about verifying Tokenization Decisioning requests.
   */
  retrieveSecret(options?: Core.RequestOptions): Core.APIPromise<TokenizationSecret> {
    return this._client.get('/v1/tokenization_decisioning/secret', options);
  }

  /**
   * Generate a new Tokenization Decisioning secret key. The old Tokenization
   * Decisioning secret key will be deactivated 24 hours after a successful request
   * to this endpoint.
   */
  rotateSecret(options?: Core.RequestOptions): Core.APIPromise<TokenizationDecisioningRotateSecretResponse> {
    return this._client.post('/v1/tokenization_decisioning/secret/rotate', options);
  }
}

export interface TokenizationSecret {
  /**
   * The Tokenization Decisioning HMAC secret
   */
  secret?: string;
}

export interface TokenizationDecisioningRotateSecretResponse {
  /**
   * The new Tokenization Decisioning HMAC secret
   */
  secret?: string;
}

export namespace TokenizationDecisioning {
  export import TokenizationSecret = TokenizationDecisioningAPI.TokenizationSecret;
  export import TokenizationDecisioningRotateSecretResponse = TokenizationDecisioningAPI.TokenizationDecisioningRotateSecretResponse;
}
