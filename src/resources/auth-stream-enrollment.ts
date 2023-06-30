// File generated from our OpenAPI spec by Stainless.

import * as Core from 'lithic/core';
import { APIResource } from 'lithic/resource';
import { isRequestOptions } from 'lithic/core';
import * as API from './';

export class AuthStreamEnrollmentResource extends APIResource {
  /**
   * Check status for whether you have enrolled in Authorization Stream Access (ASA)
   * for your program in Sandbox.
   */
  retrieve(options?: Core.RequestOptions): Promise<Core.APIResponse<AuthStreamEnrollment>> {
    return this.get('/auth_stream', options);
  }

  /**
   * Disenroll Authorization Stream Access (ASA) in Sandbox.
   */
  disenroll(options?: Core.RequestOptions): Promise<Core.APIResponse<void>> {
    return this.delete('/auth_stream', options);
  }

  /**
   * Authorization Stream Access (ASA) provides the ability to make custom
   * transaction approval decisions through an HTTP interface to the ISO 8583 message
   * stream.
   *
   * ASA requests are delivered as an HTTP POST during authorization. The ASA request
   * body adheres to the Lithic transaction schema, with some additional fields added
   * for use in decisioning. A response should be sent with HTTP response code 200
   * and the approval decision in the response body. This response is converted by
   * Lithic back into ISO 8583 format and forwarded to the network.
   *
   * In Sandbox, users can self-enroll and disenroll in ASA. In production,
   * onboarding requires manual approval and setup.
   */
  enroll(
    body?: AuthStreamEnrollmentEnrollParams,
    options?: Core.RequestOptions,
  ): Promise<Core.APIResponse<void>>;
  enroll(options?: Core.RequestOptions): Promise<Core.APIResponse<void>>;
  enroll(
    body: AuthStreamEnrollmentEnrollParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Promise<Core.APIResponse<void>> {
    if (isRequestOptions(body)) {
      return this.enroll({}, body);
    }
    return this.post('/auth_stream', { body, ...options });
  }

  /**
   * Retrieve the ASA HMAC secret key. If one does not exist for your program yet,
   * calling this endpoint will create one for you. The headers (which you can use to
   * verify webhooks) will begin appearing shortly after calling this endpoint for
   * the first time. See
   * [this page](https://docs.lithic.com/docs/auth-stream-access-asa#asa-webhook-verification)
   * for more detail about verifying ASA webhooks.
   */
  retrieveSecret(options?: Core.RequestOptions): Promise<Core.APIResponse<AuthStreamSecret>> {
    return this.get('/auth_stream/secret', options);
  }

  /**
   * Generate a new ASA HMAC secret key. The old ASA HMAC secret key will be
   * deactivated 24 hours after a successful request to this endpoint. Make a
   * [`GET /auth_stream/secret`](https://docs.lithic.com/reference/getauthstreamsecret)
   * request to retrieve the new secret key.
   */
  rotateSecret(options?: Core.RequestOptions): Promise<Core.APIResponse<void>> {
    return this.post('/auth_stream/secret/rotate', options);
  }
}

export interface AuthStreamEnrollment {
  /**
   * Whether ASA is enrolled.
   */
  enrolled?: boolean;
}

export interface AuthStreamSecret {
  /**
   * The shared HMAC ASA secret
   */
  secret?: string;
}

export interface AuthStreamEnrollmentEnrollParams {
  /**
   * A user-specified url to receive and respond to ASA request.
   */
  webhook_url?: string;
}

export namespace AuthStreamEnrollmentResource {
  export import AuthStreamEnrollment = API.AuthStreamEnrollment;
  export import AuthStreamSecret = API.AuthStreamSecret;
  export import AuthStreamEnrollmentEnrollParams = API.AuthStreamEnrollmentEnrollParams;
}
