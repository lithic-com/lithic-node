// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import { isRequestOptions } from '../core';
import * as Core from '../core';
import { CursorPage, type CursorPageParams } from '../pagination';

export class Tokenizations extends APIResource {
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
  retrieve(tokenizationToken: string, options?: Core.RequestOptions): Core.APIPromise<Tokenization> {
    return this._client.get(`/v1/tokenizations/${tokenizationToken}`, options);
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
    query?: TokenizationListParams,
    options?: Core.RequestOptions,
  ): Core.PagePromise<TokenizationsCursorPage, Tokenization>;
  list(options?: Core.RequestOptions): Core.PagePromise<TokenizationsCursorPage, Tokenization>;
  list(
    query: TokenizationListParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.PagePromise<TokenizationsCursorPage, Tokenization> {
    if (isRequestOptions(query)) {
      return this.list({}, query);
    }
    return this._client.getAPIList('/v1/tokenizations', TokenizationsCursorPage, { query, ...options });
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
  activate(tokenizationToken: string, options?: Core.RequestOptions): Core.APIPromise<void> {
    return this._client.post(`/v1/tokenizations/${tokenizationToken}/activate`, options);
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
  deactivate(tokenizationToken: string, options?: Core.RequestOptions): Core.APIPromise<void> {
    return this._client.post(`/v1/tokenizations/${tokenizationToken}/deactivate`, options);
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
  pause(tokenizationToken: string, options?: Core.RequestOptions): Core.APIPromise<void> {
    return this._client.post(`/v1/tokenizations/${tokenizationToken}/pause`, options);
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
    body?: TokenizationResendActivationCodeParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<void>;
  resendActivationCode(tokenizationToken: string, options?: Core.RequestOptions): Core.APIPromise<void>;
  resendActivationCode(
    tokenizationToken: string,
    body: TokenizationResendActivationCodeParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.APIPromise<void> {
    if (isRequestOptions(body)) {
      return this.resendActivationCode(tokenizationToken, {}, body);
    }
    return this._client.post(`/v1/tokenizations/${tokenizationToken}/resend_activation_code`, {
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
  simulate(body: TokenizationSimulateParams, options?: Core.RequestOptions): Core.APIPromise<Tokenization> {
    return this._client.post('/v1/simulate/tokenizations', { body, ...options });
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
  unpause(tokenizationToken: string, options?: Core.RequestOptions): Core.APIPromise<void> {
    return this._client.post(`/v1/tokenizations/${tokenizationToken}/unpause`, options);
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
    body?: TokenizationUpdateDigitalCardArtParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<Tokenization>;
  updateDigitalCardArt(
    tokenizationToken: string,
    options?: Core.RequestOptions,
  ): Core.APIPromise<Tokenization>;
  updateDigitalCardArt(
    tokenizationToken: string,
    body: TokenizationUpdateDigitalCardArtParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.APIPromise<Tokenization> {
    if (isRequestOptions(body)) {
      return this.updateDigitalCardArt(tokenizationToken, {}, body);
    }
    return this._client.post(`/v1/tokenizations/${tokenizationToken}/update_digital_card_art`, {
      body,
      ...options,
    });
  }
}

export class TokenizationsCursorPage extends CursorPage<Tokenization> {}

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
  tokenization_channel: 'DIGITAL_WALLET' | 'MERCHANT';

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
    rule_results?: Array<Event.RuleResult>;

    /**
     * List of reasons why the tokenization was declined
     */
    tokenization_decline_reasons?: Array<
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
    >;

    /**
     * List of reasons why two-factor authentication was required
     */
    tokenization_tfa_reasons?: Array<
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
      | 'DEVICE_HOST_CARD_EMULATION'
    >;

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

  export namespace Event {
    export interface RuleResult {
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
  }
}

export interface TokenizationListParams extends CursorPageParams {
  /**
   * Filters for tokenizations associated with a specific account.
   */
  account_token?: string;

  /**
   * Filter for tokenizations created after this date.
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
  tokenization_channel?: 'DIGITAL_WALLET' | 'MERCHANT' | 'ALL';
}

export interface TokenizationResendActivationCodeParams {
  /**
   * The communication method that the user has selected to use to receive the
   * authentication code. Supported Values: Sms = "TEXT_TO_CARDHOLDER_NUMBER". Email
   * = "EMAIL_TO_CARDHOLDER_ADDRESS"
   */
  activation_method_type?: 'EMAIL_TO_CARDHOLDER_ADDRESS' | 'TEXT_TO_CARDHOLDER_NUMBER';
}

export interface TokenizationSimulateParams {
  /**
   * The three digit cvv for the card.
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

export interface TokenizationUpdateDigitalCardArtParams {
  /**
   * Specifies the digital card art to be displayed in the user’s digital wallet for
   * a tokenization. This artwork must be approved by the network and configured by
   * Lithic to use. See
   * [Flexible Card Art Guide](https://docs.lithic.com/docs/about-digital-wallets#flexible-card-art).
   */
  digital_card_art_token?: string;
}

Tokenizations.TokenizationsCursorPage = TokenizationsCursorPage;

export declare namespace Tokenizations {
  export {
    type Tokenization as Tokenization,
    TokenizationsCursorPage as TokenizationsCursorPage,
    type TokenizationListParams as TokenizationListParams,
    type TokenizationResendActivationCodeParams as TokenizationResendActivationCodeParams,
    type TokenizationSimulateParams as TokenizationSimulateParams,
    type TokenizationUpdateDigitalCardArtParams as TokenizationUpdateDigitalCardArtParams,
  };
}
