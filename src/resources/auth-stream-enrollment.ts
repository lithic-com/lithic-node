// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

export class AuthStreamEnrollment extends APIResource {
  /**
   * Retrieve the ASA HMAC secret key. If one does not exist for your program yet,
   * calling this endpoint will create one for you. The headers (which you can use to
   * verify webhooks) will begin appearing shortly after calling this endpoint for
   * the first time. See
   * [this page](https://docs.lithic.com/docs/auth-stream-access-asa#asa-webhook-verification)
   * for more detail about verifying ASA webhooks.
   */
  retrieveSecret(options?: RequestOptions): APIPromise<AuthStreamSecret> {
    return this._client.get('/v1/auth_stream/secret', options);
  }

  /**
   * Generate a new ASA HMAC secret key. The old ASA HMAC secret key will be
   * deactivated 24 hours after a successful request to this endpoint. Make a
   * [`GET /auth_stream/secret`](https://docs.lithic.com/reference/getauthstreamsecret)
   * request to retrieve the new secret key.
   */
  rotateSecret(options?: RequestOptions): APIPromise<void> {
    return this._client.post('/v1/auth_stream/secret/rotate', options);
  }
}

export interface AuthStreamSecret {
  /**
   * The shared HMAC ASA secret
   */
  secret?: string;
}

export declare namespace AuthStreamEnrollment {
  export { type AuthStreamSecret as AuthStreamSecret };
}
