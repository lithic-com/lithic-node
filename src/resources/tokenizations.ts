// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as TokenizationsAPI from './tokenizations';
import { APIPromise } from '../core/api-promise';
import { CursorPage, type CursorPageParams, PagePromise } from '../core/pagination';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class Tokenizations extends APIResource {
  /**
   * > 🚧 Beta API
   * >
   * > This endpoint is in beta and subject to change.
   *
   * Create a tokenization for an OPEN card. Contact your Lithic representative to
   * configure tokenization for your program and card network.
   *
   * If the status is PENDING_2FA, select an available tfa_methods entry and submit
   * the cardholder's authentication code. An ACTIVE tokenization can then be used to
   * create payment credentials.
   *
   * Additional attempts to create the same tokenizations on a card will result in a
   * 409 Conflict.
   *
   * @example
   * ```ts
   * const tokenization = await client.tokenizations.create(
   *   '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   *   {
   *     agent_token: '20f418a7-27c2-486c-aeee-3ad2beb87c91',
   *     type: 'AGENT',
   *   },
   * );
   * ```
   */
  create(
    cardToken: string,
    body: TokenizationCreateParams,
    options?: RequestOptions,
  ): APIPromise<Tokenization> {
    return this._client.post(path`/v1/cards/${cardToken}/tokenizations`, { body, ...options });
  }

  /**
   * Get tokenization
   *
   * @example
   * ```ts
   * const tokenization = await client.tokenizations.retrieve(
   *   '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   * );
   * ```
   */
  retrieve(tokenizationToken: string, options?: RequestOptions): APIPromise<Tokenization> {
    return this._client.get(path`/v1/tokenizations/${tokenizationToken}`, options);
  }

  /**
   * List card tokenizations
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const tokenization of client.tokenizations.list()) {
   *   // ...
   * }
   * ```
   */
  list(
    query: TokenizationListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<TokenizationsCursorPage, Tokenization> {
    return this._client.getAPIList('/v1/tokenizations', CursorPage<Tokenization>, { query, ...options });
  }

  /**
   * This endpoint is used to ask the card network to activate a tokenization. A
   * successful response indicates that the request was successfully delivered to the
   * card network. When the card network activates the tokenization, the state will
   * be updated and a tokenization.updated event will be sent. The endpoint may only
   * be used on digital wallet tokenizations with status `INACTIVE`,
   * `PENDING_ACTIVATION`, or `PENDING_2FA`. This will put the tokenization in an
   * active state, and transactions will be allowed. Reach out at
   * [lithic.com/contact](https://lithic.com/contact) for more information.
   *
   * @example
   * ```ts
   * await client.tokenizations.activate(
   *   '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   * );
   * ```
   */
  activate(tokenizationToken: string, options?: RequestOptions): APIPromise<void> {
    return this._client.post(path`/v1/tokenizations/${tokenizationToken}/activate`, options);
  }

  /**
   * > 🚧 Beta API
   * >
   * > This endpoint is in beta and subject to change.
   *
   * Create payment credentials and a purchase mandate for an ACTIVE tokenization.
   *
   * The credential value, expiration date, and CVV are only available in this
   * response and cannot be retrieved later.
   *
   * @example
   * ```ts
   * const response =
   *   await client.tokenizations.createPaymentCredentials(
   *     '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   *     {
   *       device: {
   *         ip_address: '192.0.2.1',
   *         type: 'Mobile',
   *         brand: 'Example brand',
   *         application_name: 'Example app',
   *       },
   *       mandate: {
   *         frequency: 'ONE_TIME',
   *         expires_at: '2026-10-29T15:00:00Z',
   *         amount: 1250,
   *         merchant: {
   *           name: 'Example merchant',
   *           url: 'https://merchant.example',
   *         },
   *       },
   *       type: 'HUMAN_IN_THE_LOOP',
   *     },
   *   );
   * ```
   */
  createPaymentCredentials(
    tokenizationToken: string,
    body: TokenizationCreatePaymentCredentialsParams,
    options?: RequestOptions,
  ): APIPromise<TokenizationCreatePaymentCredentialsResponse> {
    return this._client.post(path`/v1/tokenizations/${tokenizationToken}/payment_credentials`, {
      body,
      ...options,
    });
  }

  /**
   * This endpoint is used to ask the card network to deactivate a tokenization. A
   * successful response indicates that the request was successfully delivered to the
   * card network. When the card network deactivates the tokenization, the state will
   * be updated and a tokenization.updated event will be sent. Authorizations
   * attempted with a deactivated tokenization will be blocked and will not be
   * forwarded to Lithic from the network. Deactivating the token is a permanent
   * operation. If the target is a digital wallet tokenization, it will be removed
   * from its device. Reach out at [lithic.com/contact](https://lithic.com/contact)
   * for more information.
   *
   * @example
   * ```ts
   * await client.tokenizations.deactivate(
   *   '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   * );
   * ```
   */
  deactivate(tokenizationToken: string, options?: RequestOptions): APIPromise<void> {
    return this._client.post(path`/v1/tokenizations/${tokenizationToken}/deactivate`, options);
  }

  /**
   * This endpoint is used to ask the card network to pause a tokenization. A
   * successful response indicates that the request was successfully delivered to the
   * card network. When the card network pauses the tokenization, the state will be
   * updated and a tokenization.updated event will be sent. The endpoint may only be
   * used on tokenizations with status `ACTIVE`. A paused token will prevent
   * merchants from sending authorizations, and is a temporary status that can be
   * changed. Reach out at [lithic.com/contact](https://lithic.com/contact) for more
   * information.
   *
   * @example
   * ```ts
   * await client.tokenizations.pause(
   *   '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   * );
   * ```
   */
  pause(tokenizationToken: string, options?: RequestOptions): APIPromise<void> {
    return this._client.post(path`/v1/tokenizations/${tokenizationToken}/pause`, options);
  }

  /**
   * This endpoint is used to ask the card network to send another activation code to
   * a cardholder that has already tried tokenizing a card. A successful response
   * indicates that the request was successfully delivered to the card network. The
   * endpoint may only be used on Mastercard digital wallet tokenizations with status
   * `INACTIVE`, `PENDING_ACTIVATION`, or `PENDING_2FA`. The network will send a new
   * activation code to the one of the contact methods provided in the initial
   * tokenization flow. If a user fails to enter the code correctly 3 times, the
   * contact method will not be eligible for resending the activation code, and the
   * cardholder must restart the provision process. Reach out at
   * [lithic.com/contact](https://lithic.com/contact) for more information.
   *
   * @example
   * ```ts
   * await client.tokenizations.resendActivationCode(
   *   '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   *   { activation_method_type: 'TEXT_TO_CARDHOLDER_NUMBER' },
   * );
   * ```
   */
  resendActivationCode(
    tokenizationToken: string,
    body: TokenizationResendActivationCodeParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<void> {
    return this._client.post(path`/v1/tokenizations/${tokenizationToken}/resend_activation_code`, {
      body,
      ...options,
    });
  }

  /**
   * > 🚧 Beta API
   * >
   * > This endpoint is in beta and subject to change.
   *
   * Select an available SMS or EMAIL authentication method for a tokenization with
   * status PENDING_2FA. Use a method returned in the tokenization's list of
   * tfa_methods. The card network initiates delivery of the authentication code to
   * the corresponding destination.
   *
   * A successful response confirms method selection, not tokenization activation.
   * Submit the code using submit_tfa after the cardholder receives it.
   *
   * @example
   * ```ts
   * const response = await client.tokenizations.selectTfaMethod(
   *   '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   *   { method: 'SMS' },
   * );
   * ```
   */
  selectTfaMethod(
    tokenizationToken: string,
    body: TokenizationSelectTfaMethodParams,
    options?: RequestOptions,
  ): APIPromise<TokenizationSelectTfaMethodResponse> {
    return this._client.post(path`/v1/tokenizations/${tokenizationToken}/select_tfa_method`, {
      body,
      ...options,
    });
  }

  /**
   * This endpoint is used to simulate a card's tokenization in the Digital Wallet
   * and merchant tokenization ecosystem.
   *
   * @example
   * ```ts
   * const tokenization = await client.tokenizations.simulate({
   *   cvv: '776',
   *   expiration_date: '08/29',
   *   pan: '4111111289144142',
   *   tokenization_source: 'APPLE_PAY',
   *   account_score: 5,
   *   device_score: 5,
   *   wallet_recommended_decision: 'APPROVED',
   * });
   * ```
   */
  simulate(body: TokenizationSimulateParams, options?: RequestOptions): APIPromise<Tokenization> {
    return this._client.post('/v1/simulate/tokenizations', { body, ...options });
  }

  /**
   * > 🚧 Beta API
   * >
   * > This endpoint is in beta and subject to change.
   *
   * Submit the cardholder's one-time authentication code for a tokenization with
   * status PENDING_2FA. A successful select_tfa_method request must precede
   * submission. Send the code as a string to preserve leading zeros.
   *
   * A successful response means that the network accepted the authentication code.
   * The activation of a tokenization will occur asynchronously initiated by the card
   * network.
   *
   * @example
   * ```ts
   * const response = await client.tokenizations.submitTfa(
   *   '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   *   { value: '01929' },
   * );
   * ```
   */
  submitTfa(
    tokenizationToken: string,
    body: TokenizationSubmitTfaParams,
    options?: RequestOptions,
  ): APIPromise<TokenizationSubmitTfaResponse> {
    return this._client.post(path`/v1/tokenizations/${tokenizationToken}/submit_tfa`, { body, ...options });
  }

  /**
   * This endpoint is used to ask the card network to unpause a tokenization. A
   * successful response indicates that the request was successfully delivered to the
   * card network. When the card network unpauses the tokenization, the state will be
   * updated and a tokenization.updated event will be sent. The endpoint may only be
   * used on tokenizations with status `PAUSED`. This will put the tokenization in an
   * active state, and transactions may resume. Reach out at
   * [lithic.com/contact](https://lithic.com/contact) for more information.
   *
   * @example
   * ```ts
   * await client.tokenizations.unpause(
   *   '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   * );
   * ```
   */
  unpause(tokenizationToken: string, options?: RequestOptions): APIPromise<void> {
    return this._client.post(path`/v1/tokenizations/${tokenizationToken}/unpause`, options);
  }

  /**
   * This endpoint is used update the digital card art for a digital wallet
   * tokenization. A successful response indicates that the card network has updated
   * the tokenization's art, and the tokenization's `digital_cart_art_token` field
   * was updated. The endpoint may not be used on tokenizations with status
   * `DEACTIVATED`. Note that this updates the art for one specific tokenization, not
   * all tokenizations for a card. New tokenizations for a card will be created with
   * the art referenced in the card object's `digital_card_art_token` field. Reach
   * out at [lithic.com/contact](https://lithic.com/contact) for more information.
   *
   * @example
   * ```ts
   * const tokenization =
   *   await client.tokenizations.updateDigitalCardArt(
   *     '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   *   );
   * ```
   */
  updateDigitalCardArt(
    tokenizationToken: string,
    body: TokenizationUpdateDigitalCardArtParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<Tokenization> {
    return this._client.post(path`/v1/tokenizations/${tokenizationToken}/update_digital_card_art`, {
      body,
      ...options,
    });
  }
}

export type TokenizationsCursorPage = CursorPage<Tokenization>;

export interface Device {
  /**
   * The IMEI number of the device being provisioned. For Amex, this field contains
   * device ID instead as IMEI is not provided
   */
  imei: string | null;

  /**
   * The IP address of the device initiating the request
   */
  ip_address: string | null;

  /**
   * Latitude and longitude where the device is located during the authorization
   * attempt
   */
  location: string | null;
}

/**
 * Contains the metadata for the digital wallet being tokenized.
 */
export interface TokenMetadata {
  /**
   * Contains the information of the account responsible for the payment.
   */
  payment_account_info: TokenMetadata.PaymentAccountInfo;

  /**
   * The current status of the digital wallet token. Pending or declined.
   */
  status: string;

  /**
   * The identifier of the Payment App instance within a device that will be
   * provisioned with a token
   */
  payment_app_instance_id?: string | null;

  /**
   * The party that requested the digitization
   */
  token_requestor_id?: string;

  /**
   * Human-readable name of the wallet that the token_requestor_id maps to.
   */
  token_requestor_name?:
    | 'AMAZON_ONE'
    | 'ANDROID_PAY'
    | 'APPLE_PAY'
    | 'FACEBOOK'
    | 'FITBIT_PAY'
    | 'GARMIN_PAY'
    | 'GOOGLE_PAY'
    | 'MICROSOFT_PAY'
    | 'NETFLIX'
    | 'SAMSUNG_PAY'
    | 'UNKNOWN'
    | 'VISA_CHECKOUT';
}

export namespace TokenMetadata {
  /**
   * Contains the information of the account responsible for the payment.
   */
  export interface PaymentAccountInfo {
    /**
     * Additional information that can be used to identify the account holder, such as
     * name, address, etc
     */
    account_holder_data: PaymentAccountInfo.AccountHolderData;

    /**
     * Reference to the PAN that is unique per Wallet Provider
     */
    pan_unique_reference?: string | null;

    /**
     * The unique account reference assigned to the PAN
     */
    payment_account_reference?: string | null;

    /**
     * A unique reference assigned following the allocation of a token used to identify
     * the token for the duration of its lifetime.
     */
    token_unique_reference?: string | null;
  }

  export namespace PaymentAccountInfo {
    /**
     * Additional information that can be used to identify the account holder, such as
     * name, address, etc
     */
    export interface AccountHolderData {
      /**
       * The phone number, may contain country code along with phone number when
       * countryDialInCode is not present
       */
      phone_number?: string | null;
    }
  }
}

export interface Tokenization {
  /**
   * Globally unique identifier for a Tokenization
   */
  token: string;

  /**
   * The account token associated with the card being tokenized.
   */
  account_token: string;

  /**
   * The card token associated with the card being tokenized.
   */
  card_token: string;

  /**
   * Date and time when the tokenization first occurred. UTC time zone.
   */
  created_at: string;

  /**
   * The dynamic pan assigned to the token by the network.
   */
  dpan: string | null;

  /**
   * The status of the tokenization request
   */
  status: 'ACTIVE' | 'DEACTIVATED' | 'INACTIVE' | 'PAUSED' | 'PENDING_2FA' | 'PENDING_ACTIVATION' | 'UNKNOWN';

  /**
   * The entity that requested the tokenization. For digital wallets, this will be
   * one of the defined wallet types. For merchant tokenizations, this will be a
   * free-form merchant name string.
   */
  token_requestor_name:
    | 'AMAZON_ONE'
    | 'ANDROID_PAY'
    | 'APPLE_PAY'
    | 'FACEBOOK'
    | 'FITBIT_PAY'
    | 'GARMIN_PAY'
    | 'GOOGLE_PAY'
    | 'MICROSOFT_PAY'
    | 'NETFLIX'
    | 'SAMSUNG_PAY'
    | 'UNKNOWN'
    | 'VISA_CHECKOUT'
    | (string & {});

  /**
   * The network's unique reference for the tokenization.
   */
  token_unique_reference: string;

  /**
   * The channel through which the tokenization was made.
   */
  tokenization_channel: 'DIGITAL_WALLET' | 'MERCHANT' | 'AGENT_PAY';

  /**
   * Latest date and time when the tokenization was updated. UTC time zone.
   */
  updated_at: string;

  /**
   * The device identifier associated with the tokenization.
   */
  device_id?: string | null;

  /**
   * Specifies the digital card art displayed in the user's digital wallet after
   * tokenization. This will be null if the tokenization was created without an
   * associated digital card art. See
   * [Flexible Card Art Guide](https://docs.lithic.com/docs/about-digital-wallets#flexible-card-art).
   */
  digital_card_art_token?: string | null;

  /**
   * A list of events related to the tokenization.
   */
  events?: Array<Tokenization.Event>;

  /**
   * The network's unique reference for the card that is tokenized.
   */
  payment_account_reference_id?: string | null;

  /**
   * Available authentication methods for an agent tokenization pending two-factor
   * authentication. Empty when no methods are available or authentication is no
   * longer pending
   */
  tfa_methods?: Array<Tokenization.TfaMethod>;
}

export namespace Tokenization {
  export interface Event {
    /**
     * Globally unique identifier for a Tokenization Event
     */
    token?: string;

    /**
     * Date and time when the tokenization event first occurred. UTC time zone.
     */
    created_at?: string;

    /**
     * Enum representing the result of the tokenization event
     */
    result?:
      | 'APPROVED'
      | 'DECLINED'
      | 'NOTIFICATION_DELIVERED'
      | 'REQUIRE_ADDITIONAL_AUTHENTICATION'
      | 'TOKEN_ACTIVATED'
      | 'TOKEN_CREATED'
      | 'TOKEN_DEACTIVATED'
      | 'TOKEN_DELETED_FROM_CONSUMER_APP'
      | 'TOKEN_INACTIVE'
      | 'TOKEN_STATE_UNKNOWN'
      | 'TOKEN_SUSPENDED'
      | 'TOKEN_UPDATED';

    /**
     * Results from rules that were evaluated for this tokenization
     */
    rule_results?: Array<TokenizationsAPI.TokenizationRuleResult>;

    /**
     * List of reasons why the tokenization was declined
     */
    tokenization_decline_reasons?: Array<TokenizationsAPI.TokenizationDeclineReason>;

    /**
     * List of reasons why two-factor authentication was required
     */
    tokenization_tfa_reasons?: Array<TokenizationsAPI.TokenizationTfaReason>;

    /**
     * Enum representing the type of tokenization event that occurred
     */
    type?:
      | 'TOKENIZATION_2FA'
      | 'TOKENIZATION_AUTHORIZATION'
      | 'TOKENIZATION_DECISIONING'
      | 'TOKENIZATION_ELIGIBILITY_CHECK'
      | 'TOKENIZATION_UPDATED';
  }

  export interface TfaMethod {
    /**
     * Destination for the authentication code, as provided by the card network
     */
    destination: string;

    /**
     * Method used to deliver the one-time authentication code
     */
    method: 'SMS' | 'EMAIL';
  }
}

/**
 * Reason code for why a tokenization was declined
 */
export type TokenizationDeclineReason =
  | 'ACCOUNT_SCORE_1'
  | 'DEVICE_SCORE_1'
  | 'ALL_WALLET_DECLINE_REASONS_PRESENT'
  | 'WALLET_RECOMMENDED_DECISION_RED'
  | 'CVC_MISMATCH'
  | 'CARD_EXPIRY_MONTH_MISMATCH'
  | 'CARD_EXPIRY_YEAR_MISMATCH'
  | 'CARD_INVALID_STATE'
  | 'CUSTOMER_RED_PATH'
  | 'INVALID_CUSTOMER_RESPONSE'
  | 'NETWORK_FAILURE'
  | 'GENERIC_DECLINE'
  | 'DIGITAL_CARD_ART_REQUIRED'
  | 'INVALID_PAN';

export interface TokenizationRuleResult {
  /**
   * The Auth Rule Token associated with the rule. If this is set to null, then the
   * result was not associated with a customer-configured rule. This may happen in
   * cases where a tokenization is declined or requires TFA due to a
   * Lithic-configured security or compliance rule, for example.
   */
  auth_rule_token: string | null;

  /**
   * A human-readable explanation outlining the motivation for the rule's result
   */
  explanation: string | null;

  /**
   * The name for the rule, if any was configured
   */
  name: string | null;

  /**
   * The result associated with this rule
   */
  result: 'APPROVED' | 'DECLINED' | 'REQUIRE_TFA' | 'ERROR';
}

/**
 * Reason code for why a tokenization required two-factor authentication
 */
export type TokenizationTfaReason =
  | 'WALLET_RECOMMENDED_TFA'
  | 'SUSPICIOUS_ACTIVITY'
  | 'DEVICE_RECENTLY_LOST'
  | 'TOO_MANY_RECENT_ATTEMPTS'
  | 'TOO_MANY_RECENT_TOKENS'
  | 'TOO_MANY_DIFFERENT_CARDHOLDERS'
  | 'OUTSIDE_HOME_TERRITORY'
  | 'HAS_SUSPENDED_TOKENS'
  | 'HIGH_RISK'
  | 'ACCOUNT_SCORE_LOW'
  | 'DEVICE_SCORE_LOW'
  | 'CARD_STATE_TFA'
  | 'HARDCODED_TFA'
  | 'CUSTOMER_RULE_TFA'
  | 'DEVICE_HOST_CARD_EMULATION';

export interface WalletDecisioningInfo {
  /**
   * Score given to the account by the Wallet Provider
   */
  account_score: string | null;

  /**
   * Score given to the device by the Wallet Provider
   */
  device_score: string | null;

  /**
   * The decision recommended by the Wallet Provider
   */
  recommended_decision: string | null;

  /**
   * Reasons provided to the Wallet Provider on how the recommended decision was
   * reached
   */
  recommendation_reasons?: Array<string> | null;
}

export interface TokenizationCreatePaymentCredentialsResponse {
  /**
   * Globally unique identifier for the payment credential resource
   */
  token: string;

  /**
   * Globally unique identifier for the associated agent
   */
  agent_token: string;

  /**
   * Date and time when the payment credential resource was created
   */
  created_at: string;

  /**
   * Payment credential and dynamic security code for the purchase
   */
  credentials: TokenizationCreatePaymentCredentialsResponse.Credentials;

  mandate: TokenizationCreatePaymentCredentialsResponse.Mandate;

  /**
   * Status of the payment credential resource. New credentials have status ACTIVE
   */
  status: 'ACTIVE' | 'DEACTIVATED' | 'COMPLETED' | 'CANCELLED';

  /**
   * Globally unique identifier for the associated tokenization
   */
  tokenization_token: string;

  /**
   * Type of purchase for which payment credentials are requested
   */
  type: 'AUTONOMOUS' | 'HUMAN_IN_THE_LOOP' | 'RECURRING';

  /**
   * Date and time when the payment credential resource was last updated
   */
  updated_at: string;
}

export namespace TokenizationCreatePaymentCredentialsResponse {
  /**
   * Payment credential and dynamic security code for the purchase
   */
  export interface Credentials {
    /**
     * Dynamic card security code for the purchase
     */
    cvv: string;

    /**
     * Expiration month of the payment credential
     */
    expiration_month: string;

    /**
     * Expiration year of the payment credential
     */
    expiration_year: string;

    /**
     * Date and time when the dynamic security code expires
     */
    expires_at: string;

    /**
     * Payment credential to use as the card number for the purchase
     */
    value: string;
  }

  export interface Mandate {
    /**
     * Globally unique identifier for the mandate
     */
    token: string;

    /**
     * Purchase amount and mandate limit in USD cents
     */
    amount: number;

    /**
     * Date and time when the mandate expires, independent of the payment credentials'
     * expiration
     */
    expires_at: string;

    /**
     * Purchase frequency. RECURRING purchases require WEEKLY, MONTHLY, or YEARLY
     */
    frequency: 'ONE_TIME' | 'WEEKLY' | 'MONTHLY' | 'YEARLY';

    merchant: Mandate.Merchant;

    /**
     * Status of the mandate. New mandates have status PENDING
     */
    status: 'PENDING' | 'COMPLETED' | 'CANCELLED';
  }

  export namespace Mandate {
    export interface Merchant {
      /**
       * Merchant name
       */
      name: string;

      /**
       * Merchant website URL
       */
      url: string;
    }
  }
}

export interface TokenizationSelectTfaMethodResponse {
  /**
   * Whether the card network accepted the authentication method selection
   */
  success: boolean;
}

export interface TokenizationSubmitTfaResponse {
  /**
   * Whether the card network accepted the authentication code. A true value does not
   * mean the tokenization is already active
   */
  success: boolean;
}

export interface TokenizationCreateParams {
  /**
   * Globally unique identifier for the active agent configured for your program
   */
  agent_token: string;

  /**
   * Type of tokenization to create
   */
  type: 'AGENT';
}

export interface TokenizationListParams extends CursorPageParams {
  /**
   * Filters for tokenizations associated with a specific account.
   */
  account_token?: string;

  /**
   * Filter for tokenizations created on or after this date.
   */
  begin?: string;

  /**
   * Filters for tokenizations associated with a specific card.
   */
  card_token?: string;

  /**
   * Filter for tokenizations created before this date.
   */
  end?: string;

  /**
   * Filter for tokenizations by tokenization channel. If this is not specified, only
   * DIGITAL_WALLET tokenizations will be returned.
   */
  tokenization_channel?: 'DIGITAL_WALLET' | 'MERCHANT' | 'AGENT_PAY' | 'ALL';
}

export interface TokenizationCreatePaymentCredentialsParams {
  /**
   * Device used for the purchase
   */
  device: TokenizationCreatePaymentCredentialsParams.Device;

  mandate: TokenizationCreatePaymentCredentialsParams.Mandate;

  /**
   * Type of purchase for which payment credentials are requested
   */
  type: 'AUTONOMOUS' | 'HUMAN_IN_THE_LOOP' | 'RECURRING';
}

export namespace TokenizationCreatePaymentCredentialsParams {
  /**
   * Device used for the purchase
   */
  export interface Device {
    /**
     * Name of the application used for the purchase
     */
    application_name: string;

    /**
     * Device brand
     */
    brand: string;

    /**
     * IP address of the device
     */
    ip_address: string;

    /**
     * Device type
     */
    type: string;
  }

  export interface Mandate {
    /**
     * Purchase amount and mandate limit in USD cents
     */
    amount: number;

    /**
     * Date and time when the mandate expires, independent of the payment credentials'
     * expiration
     */
    expires_at: string;

    /**
     * Purchase frequency. RECURRING purchases require WEEKLY, MONTHLY, or YEARLY
     */
    frequency: 'ONE_TIME' | 'WEEKLY' | 'MONTHLY' | 'YEARLY';

    merchant: Mandate.Merchant;
  }

  export namespace Mandate {
    export interface Merchant {
      /**
       * Merchant name
       */
      name: string;

      /**
       * Merchant website URL
       */
      url: string;
    }
  }
}

export interface TokenizationResendActivationCodeParams {
  /**
   * The communication method that the user has selected to use to receive the
   * authentication code. Supported Values: Sms = "TEXT_TO_CARDHOLDER_NUMBER". Email
   * = "EMAIL_TO_CARDHOLDER_ADDRESS"
   */
  activation_method_type?: 'EMAIL_TO_CARDHOLDER_ADDRESS' | 'TEXT_TO_CARDHOLDER_NUMBER';
}

export interface TokenizationSelectTfaMethodParams {
  /**
   * An available method from the tokenization's list of tfa_methods
   */
  method: 'SMS' | 'EMAIL';
}

export interface TokenizationSimulateParams {
  /**
   * The three or four digit CVV for the card. AMEX cards use four digit CVVs.
   */
  cvv: string;

  /**
   * The expiration date of the card in 'MM/YY' format.
   */
  expiration_date: string;

  /**
   * The sixteen digit card number.
   */
  pan: string;

  /**
   * The source of the tokenization request.
   */
  tokenization_source: 'APPLE_PAY' | 'GOOGLE' | 'SAMSUNG_PAY' | 'MERCHANT';

  /**
   * The account score (1-5) that represents how the Digital Wallet's view on how
   * reputable an end user's account is.
   */
  account_score?: number;

  /**
   * The device score (1-5) that represents how the Digital Wallet's view on how
   * reputable an end user's device is.
   */
  device_score?: number;

  /**
   * Optional field to specify the token requestor name for a merchant token
   * simulation. Ignored when tokenization_source is not MERCHANT.
   */
  entity?: string;

  /**
   * The decision that the Digital Wallet's recommend
   */
  wallet_recommended_decision?: 'APPROVED' | 'DECLINED' | 'REQUIRE_ADDITIONAL_AUTHENTICATION';
}

export interface TokenizationSubmitTfaParams {
  /**
   * One-time authentication code received by the cardholder, including any leading
   * zeros
   */
  value: string;
}

export interface TokenizationUpdateDigitalCardArtParams {
  /**
   * Specifies the digital card art to be displayed in the user’s digital wallet for
   * a tokenization. This artwork must be approved by the network and configured by
   * Lithic to use. See
   * [Flexible Card Art Guide](https://docs.lithic.com/docs/about-digital-wallets#flexible-card-art).
   */
  digital_card_art_token?: string;
}

export declare namespace Tokenizations {
  export {
    type Device as Device,
    type TokenMetadata as TokenMetadata,
    type Tokenization as Tokenization,
    type TokenizationDeclineReason as TokenizationDeclineReason,
    type TokenizationRuleResult as TokenizationRuleResult,
    type TokenizationTfaReason as TokenizationTfaReason,
    type WalletDecisioningInfo as WalletDecisioningInfo,
    type TokenizationCreatePaymentCredentialsResponse as TokenizationCreatePaymentCredentialsResponse,
    type TokenizationSelectTfaMethodResponse as TokenizationSelectTfaMethodResponse,
    type TokenizationSubmitTfaResponse as TokenizationSubmitTfaResponse,
    type TokenizationsCursorPage as TokenizationsCursorPage,
    type TokenizationCreateParams as TokenizationCreateParams,
    type TokenizationListParams as TokenizationListParams,
    type TokenizationCreatePaymentCredentialsParams as TokenizationCreatePaymentCredentialsParams,
    type TokenizationResendActivationCodeParams as TokenizationResendActivationCodeParams,
    type TokenizationSelectTfaMethodParams as TokenizationSelectTfaMethodParams,
    type TokenizationSimulateParams as TokenizationSimulateParams,
    type TokenizationSubmitTfaParams as TokenizationSubmitTfaParams,
    type TokenizationUpdateDigitalCardArtParams as TokenizationUpdateDigitalCardArtParams,
  };
}
