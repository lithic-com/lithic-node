// File generated from our OpenAPI spec by Stainless.

import * as Core from '../core';
import { isRequestOptions } from '../core';
import * as Shared from './shared';

export class AuthStreamEnrollmentResource extends Core.APIResource {
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
  disenroll(options?: Core.RequestOptions): Promise<void> {
    return this.delete('/auth_stream', { ...options, headers: { Accept: '', ...options?.headers } });
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
  enroll(body?: AuthStreamEnrollmentEnrollParams, options?: Core.RequestOptions): Promise<void>;
  enroll(options?: Core.RequestOptions): Promise<void>;
  enroll(
    body?: AuthStreamEnrollmentEnrollParams | Core.RequestOptions | null | undefined,
    options?: Core.RequestOptions,
  ): Promise<void> {
    if (isRequestOptions(body)) {
      options = body;
      body = null;
    }

    return this.post('/auth_stream', { body, ...options, headers: { Accept: '', ...options?.headers } });
  }
}

export interface AuthStreamEnrollment {
  /**
   * Whether ASA is enrolled.
   */
  enrolled?: boolean;
}

export interface AuthStreamEnrollmentEnrollParams {
  /**
   * A user-specified url to receive and respond to ASA request.
   */
  webhook_url?: string;
}
