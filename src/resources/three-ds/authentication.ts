// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as ThreeDSAPI from './three-ds';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Authentication extends APIResource {
  /**
   * Get 3DS Authentication by token
   *
   * @example
   * ```ts
   * const threeDSAuthentication =
   *   await client.threeDS.authentication.retrieve(
   *     '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   *   );
   * ```
   */
  retrieve(
    threeDSAuthenticationToken: string,
    options?: RequestOptions,
  ): APIPromise<ThreeDSAPI.ThreeDSAuthentication> {
    return this._client.get(path`/v1/three_ds_authentication/${threeDSAuthenticationToken}`, options);
  }

  /**
   * Simulates a 3DS authentication request from the payment network as if it came
   * from an ACS. If you're configured for 3DS Customer Decisioning, simulating
   * authentications requires your customer decisioning endpoint to be set up
   * properly (respond with a valid JSON). If the authentication decision is to
   * challenge, ensure that the account holder associated with the card transaction
   * has a valid phone number configured to receive the OTP code via SMS.
   *
   * @example
   * ```ts
   * const response =
   *   await client.threeDS.authentication.simulate({
   *     merchant: {
   *       id: 'OODKZAPJVN4YS7O',
   *       country: 'USA',
   *       mcc: '5812',
   *       name: 'COFFEE SHOP',
   *     },
   *     pan: '4111111289144142',
   *     transaction: { amount: 0, currency: 'GBP' },
   *   });
   * ```
   */
  simulate(
    body: AuthenticationSimulateParams,
    options?: RequestOptions,
  ): APIPromise<AuthenticationSimulateResponse> {
    return this._client.post('/v1/three_ds_authentication/simulate', { body, ...options });
  }

  /**
   * Endpoint for simulating entering OTP into 3DS Challenge UI. A call to
   * [/v1/three_ds_authentication/simulate](https://docs.lithic.com/reference/postsimulateauthentication)
   * that resulted in triggered SMS-OTP challenge must precede. Only a single attempt
   * is supported; upon entering OTP, the challenge is either approved or declined.
   *
   * @example
   * ```ts
   * await client.threeDS.authentication.simulateOtpEntry({
   *   token: 'fabd829d-7f7b-4432-a8f2-07ea4889aaac',
   *   otp: '123456',
   * });
   * ```
   */
  simulateOtpEntry(body: AuthenticationSimulateOtpEntryParams, options?: RequestOptions): APIPromise<void> {
    return this._client.post('/v1/three_ds_decisioning/simulate/enter_otp', { body, ...options });
  }
}

export interface AuthenticationSimulateResponse {
  /**
   * Globally unique identifier for the 3DS authentication.
   */
  token?: string;
}

export interface AuthenticationSimulateParams {
  /**
   * Merchant information for the simulated transaction
   */
  merchant: AuthenticationSimulateParams.Merchant;

  /**
   * Sixteen digit card number.
   */
  pan: string;

  /**
   * Transaction details for the simulation
   */
  transaction: AuthenticationSimulateParams.Transaction;

  /**
   * When set will use the following values as part of the Simulated Authentication.
   * When not set defaults to MATCH
   */
  card_expiry_check?: 'MATCH' | 'MISMATCH' | 'NOT_PRESENT';
}

export namespace AuthenticationSimulateParams {
  /**
   * Merchant information for the simulated transaction
   */
  export interface Merchant {
    /**
     * Unique identifier to identify the payment card acceptor. Corresponds to
     * `merchant_acceptor_id` in authorization.
     */
    id: string;

    /**
     * Country of the address provided by the cardholder in ISO 3166-1 alpha-3 format
     * (e.g. USA)
     */
    country: string;

    /**
     * Merchant category code for the transaction to be simulated. A four-digit number
     * listed in ISO 18245. Supported merchant category codes can be found
     * [here](https://docs.lithic.com/docs/transactions#merchant-category-codes-mccs).
     */
    mcc: string;

    /**
     * Merchant descriptor, corresponds to `descriptor` in authorization. If CHALLENGE
     * keyword is included, Lithic will trigger a challenge.
     */
    name: string;
  }

  /**
   * Transaction details for the simulation
   */
  export interface Transaction {
    /**
     * Amount (in cents) to authenticate.
     */
    amount: number;

    /**
     * 3-character alphabetic ISO 4217 currency code.
     */
    currency: string;
  }
}

export interface AuthenticationSimulateOtpEntryParams {
  /**
   * A unique token returned as part of a /v1/three_ds_authentication/simulate call
   * that resulted in PENDING_CHALLENGE authentication result.
   */
  token: string;

  /**
   * The OTP entered by the cardholder
   */
  otp: string;
}

export declare namespace Authentication {
  export {
    type AuthenticationSimulateResponse as AuthenticationSimulateResponse,
    type AuthenticationSimulateParams as AuthenticationSimulateParams,
    type AuthenticationSimulateOtpEntryParams as AuthenticationSimulateOtpEntryParams,
  };
}
