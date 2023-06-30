// File generated from our OpenAPI spec by Stainless.

import * as Core from 'lithic/core';
import { APIResource } from 'lithic/resource';
import * as API from './';

export class TokenizationDecisioning extends APIResource {
  /**
   * Retrieve the Tokenization Decisioning secret key. If one does not exist your
   * program yet, calling this endpoint will create one for you. The headers of the
   * Tokenization Decisioning request will contain a hmac signature which you can use
   * to verify requests originate from Lithic. See
   * [this page](https://docs.lithic.com/docs/events-api#verifying-webhooks) for more
   * detail about verifying Tokenization Decisioning requests.
   */
  retrieveSecret(options?: Core.RequestOptions): Promise<Core.APIResponse<TokenizationSecret>> {
    return this.get('/tokenization_decisioning/secret', options);
  }

  /**
   * Generate a new Tokenization Decisioning secret key. The old Tokenization
   * Decisioning secret key will be deactivated 24 hours after a successful request
   * to this endpoint.
   */
  rotateSecret(
    options?: Core.RequestOptions,
  ): Promise<Core.APIResponse<TokenizationDecisioningRotateSecretResponse>> {
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
  export import TokenizationSecret = API.TokenizationSecret;
  export import TokenizationDecisioningRotateSecretResponse = API.TokenizationDecisioningRotateSecretResponse;
}
