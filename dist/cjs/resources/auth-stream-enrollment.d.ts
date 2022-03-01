import * as Core from '../core';
export declare class AuthStreamEnrollmentResource extends Core.APIResource {
  /**
   * Check status for whether you have enrolled in Authorization Stream Access (ASA) for your program in Sandbox.
   */
  retrieve(
    options?: Core.RequestOptions
  ): Promise<Core.APIResponse<AuthStreamEnrollment>>;
  /**
   * Disenroll Authorization Stream Access (ASA) in Sandbox.
   */
  disenroll(options?: Core.RequestOptions): Promise<void>;
  /**
   * Authorization Stream Access (ASA) provides the ability to make custom transaction approval decisions through an HTTP interface to the ISO 8583 message stream. ASA requests are delivered as an HTTP POST during authorization. The ASA request body adheres to the Lithic transaction schema, with some additional fields added for use in decisioning. A response should be sent with HTTP response code 200 and the approval decision in the response body. This response is converted by Lithic back into ISO 8583 format and forwarded to the network. In Sandbox, users can self-enroll and disenroll in ASA. In production, onboarding requires manual approval and setup.
   */
  enroll(
    body?: AuthStreamEnrollmentEnrollParams | null | undefined,
    options?: Core.RequestOptions
  ): Promise<void>;
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
