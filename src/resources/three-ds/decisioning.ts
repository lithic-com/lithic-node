// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../resource';
import { isRequestOptions } from '../../core';
import * as Core from '../../core';
import * as DecisioningAPI from './decisioning';

export class Decisioning extends APIResource {
  /**
   * Card program's response to a 3DS Challenge Request (CReq)
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
   */
  retrieveSecret(options?: Core.RequestOptions): Core.APIPromise<DecisioningRetrieveSecretResponse> {
    return this._client.get('/v1/three_ds_decisioning/secret', options);
  }

  /**
   * Generate a new 3DS Decisioning HMAC secret key. The old secret key will be
   * deactivated 24 hours after a successful request to this endpoint. Make a
   * [`GET /three_ds_decisioning/secret`](https://docs.lithic.com/reference/getthreedsdecisioningsecret)
   * request to retrieve the new secret key.
   */
  rotateSecret(options?: Core.RequestOptions): Core.APIPromise<void> {
    return this._client.post('/v1/three_ds_decisioning/secret/rotate', options);
  }

  /**
   * Simulates a 3DS authentication challenge request from the payment network as if
   * it came from an ACS. Requires being configured for 3DS Customer Decisioning, and
   * enrolled with Lithic's Challenge solution.
   */
  simulateChallenge(
    body?: DecisioningSimulateChallengeParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<DecisioningSimulateChallengeResponse>;
  simulateChallenge(options?: Core.RequestOptions): Core.APIPromise<DecisioningSimulateChallengeResponse>;
  simulateChallenge(
    body: DecisioningSimulateChallengeParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.APIPromise<DecisioningSimulateChallengeResponse> {
    if (isRequestOptions(body)) {
      return this.simulateChallenge({}, body);
    }
    return this._client.post('/v1/three_ds_decisioning/simulate/challenge', { body, ...options });
  }

  /**
   * Endpoint for responding to a 3DS Challenge initiated by a call to
   * /v1/three_ds_decisioning/simulate/challenge
   */
  simulateChallengeResponse(
    body: DecisioningSimulateChallengeResponseParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<void> {
    return this._client.post('/v1/three_ds_decisioning/simulate/challenge_response', { body, ...options });
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

export interface DecisioningSimulateChallengeResponse {
  /**
   * A unique token to reference this transaction with later calls to void or clear
   * the authorization. This token is used in
   * /v1/three_ds_decisioning/simulate/challenge_response to Approve or Decline the
   * authentication
   */
  token?: string;
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

export interface DecisioningSimulateChallengeParams {
  /**
   * A unique token returned as part of a /v1/three_ds_authentication/simulate call
   * that responded with a CHALLENGE_REQUESTED status.
   */
  token?: string;
}

export interface DecisioningSimulateChallengeResponseParams {
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

export namespace Decisioning {
  export type ChallengeResponse = DecisioningAPI.ChallengeResponse;
  export type ChallengeResult = DecisioningAPI.ChallengeResult;
  export type DecisioningRetrieveSecretResponse = DecisioningAPI.DecisioningRetrieveSecretResponse;
  export type DecisioningSimulateChallengeResponse = DecisioningAPI.DecisioningSimulateChallengeResponse;
  export type DecisioningChallengeResponseParams = DecisioningAPI.DecisioningChallengeResponseParams;
  export type DecisioningSimulateChallengeParams = DecisioningAPI.DecisioningSimulateChallengeParams;
  export type DecisioningSimulateChallengeResponseParams =
    DecisioningAPI.DecisioningSimulateChallengeResponseParams;
}
