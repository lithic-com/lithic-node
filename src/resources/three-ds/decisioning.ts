// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../resource';
import * as Core from '../../core';

export class Decisioning extends APIResource {
  /**
   * Card program's response to a 3DS Challenge Request (CReq)
   *
   * @example
   * ```ts
   * await client.threeDS.decisioning.challengeResponse({
   *   token: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   *   challenge_response: 'APPROVE',
   * });
   * ```
   */
  challengeResponse(
    body: DecisioningChallengeResponseParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<void> {
    return this._client.post('/v1/three_ds_decisioning/challenge_response', { body, ...options });
  }

  /**
   * Retrieve the 3DS Decisioning HMAC secret key. If one does not exist for your
   * program yet, calling this endpoint will create one for you. The headers (which
   * you can use to verify 3DS Decisioning requests) will begin appearing shortly
   * after calling this endpoint for the first time. See
   * [this page](https://docs.lithic.com/docs/3ds-decisioning#3ds-decisioning-hmac-secrets)
   * for more detail about verifying 3DS Decisioning requests.
   *
   * @example
   * ```ts
   * const response =
   *   await client.threeDS.decisioning.retrieveSecret();
   * ```
   */
  retrieveSecret(options?: Core.RequestOptions): Core.APIPromise<DecisioningRetrieveSecretResponse> {
    return this._client.get('/v1/three_ds_decisioning/secret', options);
  }

  /**
   * Generate a new 3DS Decisioning HMAC secret key. The old secret key will be
   * deactivated 24 hours after a successful request to this endpoint. Make a
   * [`GET /three_ds_decisioning/secret`](https://docs.lithic.com/reference/getthreedsdecisioningsecret)
   * request to retrieve the new secret key.
   *
   * @example
   * ```ts
   * await client.threeDS.decisioning.rotateSecret();
   * ```
   */
  rotateSecret(options?: Core.RequestOptions): Core.APIPromise<void> {
    return this._client.post('/v1/three_ds_decisioning/secret/rotate', options);
  }
}

export interface ChallengeResponse {
  /**
   * Globally unique identifier for the 3DS authentication. This token is sent as
   * part of the initial 3DS Decisioning Request and as part of the 3DS Challenge
   * Event in the [ThreeDSAuthentication](#/components/schemas/ThreeDSAuthentication)
   * object
   */
  token: string;

  /**
   * Whether the Cardholder has Approved or Declined the issued Challenge
   */
  challenge_response: ChallengeResult;
}

/**
 * Whether the Cardholder has Approved or Declined the issued Challenge
 */
export type ChallengeResult = 'APPROVE' | 'DECLINE_BY_CUSTOMER';

export interface DecisioningRetrieveSecretResponse {
  /**
   * The 3DS Decisioning HMAC secret
   */
  secret?: string;
}

export interface DecisioningChallengeResponseParams {
  /**
   * Globally unique identifier for the 3DS authentication. This token is sent as
   * part of the initial 3DS Decisioning Request and as part of the 3DS Challenge
   * Event in the [ThreeDSAuthentication](#/components/schemas/ThreeDSAuthentication)
   * object
   */
  token: string;

  /**
   * Whether the Cardholder has Approved or Declined the issued Challenge
   */
  challenge_response: ChallengeResult;
}

export declare namespace Decisioning {
  export {
    type ChallengeResponse as ChallengeResponse,
    type ChallengeResult as ChallengeResult,
    type DecisioningRetrieveSecretResponse as DecisioningRetrieveSecretResponse,
    type DecisioningChallengeResponseParams as DecisioningChallengeResponseParams,
  };
}
