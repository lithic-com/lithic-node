// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';

export class Decisioning extends APIResource {
  /**
   * Card program's response to a 3DS Challenge Request. Challenge Request is emitted
   * as a webhook
   * [three_ds_authentication.challenge](https://docs.lithic.com/reference/post_three-ds-authentication-challenge)
   * and your Card Program needs to be configured with Out of Band (OOB) Challenges
   * in order to receive it (see https://docs.lithic.com/docs/3ds-challenge-flow for
   * more information).
   *
   * @example
   * ```ts
   * await client.threeDS.decisioning.challengeResponse({
   *   token: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   *   challenge_response: 'APPROVE',
   * });
   * ```
   */
  challengeResponse(body: DecisioningChallengeResponseParams, options?: RequestOptions): APIPromise<void> {
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
  retrieveSecret(options?: RequestOptions): APIPromise<DecisioningRetrieveSecretResponse> {
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
  rotateSecret(options?: RequestOptions): APIPromise<void> {
    return this._client.post('/v1/three_ds_decisioning/secret/rotate', options);
  }
}

/**
 * Response from Card Program to a 3DS Authentication challenge
 */
export interface ChallengeResponse {
  /**
   * Globally unique identifier for 3DS Authentication that resulted in
   * PENDING_CHALLENGE authentication result.
   */
  token: string;

  /**
   * Whether the Cardholder has approved or declined the issued Challenge
   */
  challenge_response: ChallengeResult;
}

/**
 * Whether the Cardholder has approved or declined the issued Challenge
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
   * Globally unique identifier for 3DS Authentication that resulted in
   * PENDING_CHALLENGE authentication result.
   */
  token: string;

  /**
   * Whether the Cardholder has approved or declined the issued Challenge
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
