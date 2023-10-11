// File generated from our OpenAPI spec by Stainless.

import * as Core from 'lithic/core';
import { APIResource } from 'lithic/resource';
import * as TokenizationDecisioningAPI from 'lithic/resources/tokenization-decisioning';

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
    return this.get('/tokenization_decisioning/secret', options);
  }

  /**
   * Generate a new Tokenization Decisioning secret key. The old Tokenization
   * Decisioning secret key will be deactivated 24 hours after a successful request
   * to this endpoint.
   */
  rotateSecret(options?: Core.RequestOptions): Core.APIPromise<TokenizationDecisioningRotateSecretResponse> {
    return this.post('/tokenization_decisioning/secret/rotate', options);
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
