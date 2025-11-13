// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../resource';
import * as Core from '../../core';

export class Authentication extends APIResource {
  /**
   * Get 3DS Authentication by token
   *
   * @example
   * ```ts
   * const authentication =
   *   await client.threeDS.authentication.retrieve(
   *     '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   *   );
   * ```
   */
  retrieve(
    threeDSAuthenticationToken: string,
    options?: Core.RequestOptions,
  ): Core.APIPromise<AuthenticationRetrieveResponse> {
    return this._client.get(`/v1/three_ds_authentication/${threeDSAuthenticationToken}`, options);
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
    options?: Core.RequestOptions,
  ): Core.APIPromise<AuthenticationSimulateResponse> {
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
  simulateOtpEntry(
    body: AuthenticationSimulateOtpEntryParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<void> {
    return this._client.post('/v1/three_ds_decisioning/simulate/enter_otp', { body, ...options });
  }
}

/**
 * Represents a 3DS authentication
 */
export interface AuthenticationRetrieveResponse {
  /**
   * Globally unique identifier for the 3DS authentication. Permitted values:
   * 36-digit version 4 UUID (including hyphens).
   */
  token: string;

  /**
   * Type of account/card that is being used for the transaction. Maps to EMV 3DS
   * field `acctType`.
   */
  account_type: 'CREDIT' | 'DEBIT' | 'NOT_APPLICABLE' | null;

  /**
   * Indicates the outcome of the 3DS authentication process.
   */
  authentication_result: 'DECLINE' | 'SUCCESS' | 'PENDING_CHALLENGE' | 'PENDING_DECISION';

  /**
   * Indicates whether the expiration date provided by the cardholder during checkout
   * matches Lithic's record of the card's expiration date.
   */
  card_expiry_check: 'MATCH' | 'MISMATCH' | 'NOT_PRESENT';

  /**
   * Globally unique identifier for the card on which the 3DS authentication has
   * occurred. Permitted values: 36-digit version 4 UUID (including hyphens).
   */
  card_token: string;

  /**
   * Object containing data about the cardholder provided during the transaction.
   */
  cardholder: AuthenticationRetrieveResponse.Cardholder;

  /**
   * Channel in which the authentication occurs. Maps to EMV 3DS field
   * `deviceChannel`.
   */
  channel: 'APP_BASED' | 'BROWSER' | 'THREE_DS_REQUESTOR_INITIATED';

  /**
   * Date and time when the authentication was created in Lithic's system. Permitted
   * values: Date string in the ISO 8601 format yyyy-MM-dd'T'hh:mm:ssZ.
   */
  created: string;

  /**
   * Object containing data about the merchant involved in the e-commerce
   * transaction.
   */
  merchant: AuthenticationRetrieveResponse.Merchant;

  /**
   * Either PAYMENT_AUTHENTICATION or NON_PAYMENT_AUTHENTICATION. For
   * NON_PAYMENT_AUTHENTICATION, additional_data and transaction fields are not
   * populated.
   */
  message_category: 'NON_PAYMENT_AUTHENTICATION' | 'PAYMENT_AUTHENTICATION';

  /**
   * Indicates whether a challenge is requested for this transaction
   *
   * - `NO_PREFERENCE` - No Preference
   * - `NO_CHALLENGE_REQUESTED` - No Challenge Requested
   * - `CHALLENGE_PREFERENCE` - Challenge requested (3DS Requestor preference)
   * - `CHALLENGE_MANDATE` - Challenge requested (Mandate)
   * - `NO_CHALLENGE_RISK_ALREADY_ASSESSED` - No Challenge requested (Transactional
   *   risk analysis is already performed)
   * - `DATA_SHARE_ONLY` - No Challenge requested (Data Share Only)
   * - `OTHER` - Other indicators not captured by above. These are rarely used
   */
  three_ds_requestor_challenge_indicator:
    | 'NO_PREFERENCE'
    | 'NO_CHALLENGE_REQUESTED'
    | 'CHALLENGE_PREFERENCE'
    | 'CHALLENGE_MANDATE'
    | 'NO_CHALLENGE_RISK_ALREADY_ASSESSED'
    | 'DATA_SHARE_ONLY'
    | 'OTHER';

  /**
   * Object containing additional data about the 3DS request that is beyond the EMV
   * 3DS standard spec (e.g., specific fields that only certain card networks send
   * but are not required across all 3DS requests).
   */
  additional_data?: AuthenticationRetrieveResponse.AdditionalData | null;

  /**
   * Object containing data about the app used in the e-commerce transaction. Present
   * if the channel is 'APP_BASED'.
   */
  app?: AuthenticationRetrieveResponse.App | null;

  /**
   * Type of authentication request - i.e., the type of transaction or interaction is
   * causing the merchant to request an authentication. Maps to EMV 3DS field
   * `threeDSRequestorAuthenticationInd`.
   */
  authentication_request_type?:
    | 'ADD_CARD'
    | 'BILLING_AGREEMENT'
    | 'DELAYED_SHIPMENT'
    | 'EMV_TOKEN_CARDHOLDER_VERIFICATION'
    | 'INSTALLMENT_TRANSACTION'
    | 'MAINTAIN_CARD'
    | 'PAYMENT_TRANSACTION'
    | 'RECURRING_TRANSACTION'
    | 'SPLIT_PAYMENT'
    | 'SPLIT_SHIPMENT'
    | null;

  /**
   * Object containing data about the browser used in the e-commerce transaction.
   * Present if the channel is 'BROWSER'.
   */
  browser?: AuthenticationRetrieveResponse.Browser | null;

  /**
   * Metadata about the challenge method and delivery. Only present when a challenge
   * is triggered.
   */
  challenge_metadata?: AuthenticationRetrieveResponse.ChallengeMetadata | null;

  /**
   * Entity that orchestrates the challenge. This won't be set for authentications
   * for which a decision has not yet been made (e.g. in-flight customer decisioning
   * request).
   */
  challenge_orchestrated_by?: 'LITHIC' | 'CUSTOMER' | 'NO_CHALLENGE' | null;

  /**
   * Entity that made the authentication decision. This won't be set for
   * authentications for which a decision has not yet been made (e.g. in-flight
   * customer decisioning request).
   */
  decision_made_by?:
    | 'LITHIC_RULES'
    | 'LITHIC_DEFAULT'
    | 'CUSTOMER_RULES'
    | 'CUSTOMER_ENDPOINT'
    | 'NETWORK'
    | 'UNKNOWN'
    | null;

  /**
   * Type of 3DS Requestor Initiated (3RI) request — i.e., a 3DS authentication that
   * takes place at the initiation of the merchant rather than the cardholder. The
   * most common example of this is where a merchant is authenticating before billing
   * for a recurring transaction such as a pay TV subscription or a utility bill.
   * Maps to EMV 3DS field `threeRIInd`.
   */
  three_ri_request_type?:
    | 'ACCOUNT_VERIFICATION'
    | 'ADD_CARD'
    | 'BILLING_AGREEMENT'
    | 'CARD_SECURITY_CODE_STATUS_CHECK'
    | 'DELAYED_SHIPMENT'
    | 'DEVICE_BINDING_STATUS_CHECK'
    | 'INSTALLMENT_TRANSACTION'
    | 'MAIL_ORDER'
    | 'MAINTAIN_CARD_INFO'
    | 'OTHER_PAYMENT'
    | 'RECURRING_TRANSACTION'
    | 'SPLIT_PAYMENT'
    | 'SPLIT_SHIPMENT'
    | 'TELEPHONE_ORDER'
    | 'TOP_UP'
    | 'TRUST_LIST_STATUS_CHECK'
    | null;

  /**
   * Object containing data about the e-commerce transaction for which the merchant
   * is requesting authentication.
   */
  transaction?: AuthenticationRetrieveResponse.Transaction | null;
}

export namespace AuthenticationRetrieveResponse {
  /**
   * Object containing data about the cardholder provided during the transaction.
   */
  export interface Cardholder {
    /**
     * Indicates whether the shipping address and billing address provided by the
     * cardholder are the same. This value - and assessment of whether the addresses
     * match - is provided directly in the 3DS request and is not determined by Lithic.
     * Maps to EMV 3DS field `addrMatch`.
     */
    address_match?: boolean | null;

    /**
     * Lithic's evaluation result comparing the transaction's address data with the
     * cardholder KYC data if it exists. In the event Lithic does not have any
     * Cardholder KYC data, or the transaction does not contain any address data,
     * NOT_PRESENT will be returned
     */
    address_on_file_match?: 'MATCH' | 'MATCH_ADDRESS_ONLY' | 'MATCH_ZIP_ONLY' | 'MISMATCH' | 'NOT_PRESENT';

    /**
     * Object containing data on the billing address provided during the transaction.
     */
    billing_address?: Cardholder.BillingAddress;

    /**
     * Email address that is either provided by the cardholder or is on file with the
     * merchant in a 3RI request. Maps to EMV 3DS field `email`.
     */
    email?: string | null;

    /**
     * Name of the cardholder. Maps to EMV 3DS field `cardholderName`.
     */
    name?: string | null;

    /**
     * Home phone number in E.164 format provided by the cardholder. Maps to EMV 3DS
     * fields `homePhone.cc` and `homePhone.subscriber`.
     */
    phone_number_home?: string | null;

    /**
     * Mobile/cell phone number in E.164 format provided by the cardholder. Maps to EMV
     * 3DS fields `mobilePhone.cc` and `mobilePhone.subscriber`.
     */
    phone_number_mobile?: string | null;

    /**
     * Work phone number in E.164 format provided by the cardholder. Maps to EMV 3DS
     * fields `workPhone.cc` and `workPhone.subscriber`.
     */
    phone_number_work?: string | null;

    /**
     * Object containing data on the shipping address provided during the transaction.
     */
    shipping_address?: Cardholder.ShippingAddress;
  }

  export namespace Cardholder {
    /**
     * Object containing data on the billing address provided during the transaction.
     */
    export interface BillingAddress {
      /**
       * First line of the street address provided by the cardholder.
       */
      address1?: string | null;

      /**
       * Second line of the street address provided by the cardholder.
       */
      address2?: string | null;

      /**
       * Third line of the street address provided by the cardholder.
       */
      address3?: string | null;

      /**
       * City of the address provided by the cardholder.
       */
      city?: string | null;

      /**
       * Country of the address provided by the cardholder in ISO 3166-1 alpha-3 format
       * (e.g. USA)
       */
      country?: string | null;

      /**
       * Postal code (e.g., ZIP code) of the address provided by the cardholder
       */
      postal_code?: string | null;
    }

    /**
     * Object containing data on the shipping address provided during the transaction.
     */
    export interface ShippingAddress {
      /**
       * First line of the street address provided by the cardholder.
       */
      address1?: string | null;

      /**
       * Second line of the street address provided by the cardholder.
       */
      address2?: string | null;

      /**
       * Third line of the street address provided by the cardholder.
       */
      address3?: string | null;

      /**
       * City of the address provided by the cardholder.
       */
      city?: string | null;

      /**
       * Country of the address provided by the cardholder in ISO 3166-1 alpha-3 format
       * (e.g. USA)
       */
      country?: string | null;

      /**
       * Postal code (e.g., ZIP code) of the address provided by the cardholder
       */
      postal_code?: string | null;
    }
  }

  /**
   * Object containing data about the merchant involved in the e-commerce
   * transaction.
   */
  export interface Merchant {
    /**
     * Object containing additional data indicating additional risk factors related to
     * the e-commerce transaction.
     */
    risk_indicator: Merchant.RiskIndicator;

    /**
     * Merchant identifier as assigned by the acquirer. Maps to EMV 3DS field
     * `acquirerMerchantId`. May not be present for non-payment authentications.
     */
    id?: string | null;

    /**
     * Country code of the merchant requesting 3DS authentication. Maps to EMV 3DS
     * field `merchantCountryCode`. Permitted values: ISO 3166-1 alpha-3 country code
     * (e.g., USA). May not be present for non-payment authentications.
     */
    country?: string | null;

    /**
     * Merchant category code assigned to the merchant that describes its business
     * activity type. Maps to EMV 3DS field `mcc`. May not be present for non-payment
     * authentications.
     */
    mcc?: string | null;

    /**
     * Name of the merchant. Maps to EMV 3DS field `merchantName`. May not be present
     * for non-payment authentications.
     */
    name?: string | null;
  }

  export namespace Merchant {
    /**
     * Object containing additional data indicating additional risk factors related to
     * the e-commerce transaction.
     */
    export interface RiskIndicator {
      /**
       * In transactions with electronic delivery, email address to which merchandise is
       * delivered. Maps to EMV 3DS field `deliveryEmailAddress`.
       */
      delivery_email_address?: string | null;

      /**
       * The delivery time frame for the merchandise. Maps to EMV 3DS field
       * `deliveryTimeframe`.
       */
      delivery_time_frame?:
        | 'ELECTRONIC_DELIVERY'
        | 'OVERNIGHT_SHIPPING'
        | 'SAME_DAY_SHIPPING'
        | 'TWO_DAY_OR_MORE_SHIPPING'
        | null;

      /**
       * In prepaid or gift card purchase transactions, purchase amount total in major
       * units (e.g., a purchase of USD $205.10 would be 205). Maps to EMV 3DS field
       * `giftCardAmount`.
       */
      gift_card_amount?: number | null;

      /**
       * In prepaid or gift card purchase transactions, count of individual prepaid or
       * gift cards/codes purchased. Maps to EMV 3DS field `giftCardCount`.
       */
      gift_card_count?: number | null;

      /**
       * In prepaid or gift card purchase transactions, currency code of the gift card.
       * Maps to EMV 3DS field `giftCardCurr`. Permitted values: ISO 4217 three-character
       * currency code (e.g., USD).
       */
      gift_card_currency?: string | null;

      /**
       * Indicates whether the purchase is for merchandise that is available now or at a
       * future date. Maps to EMV 3DS field `preOrderPurchaseInd`.
       */
      order_availability?: 'FUTURE_AVAILABILITY' | 'MERCHANDISE_AVAILABLE' | null;

      /**
       * In pre-order purchase transactions, the expected date that the merchandise will
       * be available. Maps to EMV 3DS field `preOrderDate`. Permitted values: Date
       * string in the ISO 8601 format yyyy-MM-dd'T'hh:mm:ssZ
       */
      pre_order_available_date?: string | null;

      /**
       * Indicates whether the cardholder is reordering previously purchased merchandise.
       * Maps to EMV 3DS field `reorderItemsInd`.
       */
      reorder_items?: 'FIRST_TIME_ORDERED' | 'REORDERED' | null;

      /**
       * Shipping method that the cardholder chose for the transaction. If purchase
       * includes one or more item, this indicator is used for the physical goods; if the
       * purchase only includes digital goods, this indicator is used to describe the
       * most expensive item purchased. Maps to EMV 3DS field `shipIndicator`.
       */
      shipping_method?:
        | 'DIGITAL_GOODS'
        | 'LOCKER_DELIVERY'
        | 'OTHER'
        | 'PICK_UP_AND_GO_DELIVERY'
        | 'SHIP_TO_BILLING_ADDRESS'
        | 'SHIP_TO_NON_BILLING_ADDRESS'
        | 'SHIP_TO_OTHER_VERIFIED_ADDRESS'
        | 'SHIP_TO_STORE'
        | 'TRAVEL_AND_EVENT_TICKETS'
        | null;
    }
  }

  /**
   * Object containing additional data about the 3DS request that is beyond the EMV
   * 3DS standard spec (e.g., specific fields that only certain card networks send
   * but are not required across all 3DS requests).
   */
  export interface AdditionalData {
    /**
     * Mastercard only: Indicates whether the network would have considered the
     * authentication request to be low risk or not.
     */
    network_decision?: 'LOW_RISK' | 'NOT_LOW_RISK' | null;

    /**
     * Mastercard only: Assessment by the network of the authentication risk level,
     * with a higher value indicating a higher amount of risk. Permitted values:
     * Integer between 0-950, in increments of 50.
     */
    network_risk_score?: number | null;
  }

  /**
   * Object containing data about the app used in the e-commerce transaction. Present
   * if the channel is 'APP_BASED'.
   */
  export interface App {
    /**
     * Device model: e.g. "Apple iPhone 16".
     */
    device?: string | null;

    /**
     * Raw device information - base64-encoded JSON object. Maps to EMV 3DS field
     * `deviceInfo`.
     */
    device_info?: string | null;

    /**
     * IP address of the device.
     */
    ip?: string;

    /**
     * Latitude coordinate of current device location.
     */
    latitude?: number | null;

    /**
     * Device locale: e.g. "en-US".
     */
    locale?: string | null;

    /**
     * Longitude coordinate of current device location.
     */
    longitude?: number | null;

    /**
     * Operating System: e.g. "Android 12", "iOS 17.1".
     */
    os?: string | null;

    /**
     * Device platform: Android, iOS, Windows, etc.
     */
    platform?: string | null;

    /**
     * Screen height in pixels.
     */
    screen_height?: number | null;

    /**
     * Screen width in pixels.
     */
    screen_width?: number | null;

    /**
     * Time zone offset in minutes between UTC and device local time.
     */
    time_zone?: string | null;
  }

  /**
   * Object containing data about the browser used in the e-commerce transaction.
   * Present if the channel is 'BROWSER'.
   */
  export interface Browser {
    /**
     * Content of the HTTP accept headers as sent from the cardholder's browser to the
     * 3DS requestor (e.g., merchant or digital wallet).
     */
    accept_header?: string | null;

    /**
     * IP address of the browser as returned by the HTTP headers to the 3DS requestor
     * (e.g., merchant or digital wallet). Maps to EMV 3DS field `browserIP`.
     */
    ip?: string | null;

    /**
     * Indicates whether the cardholder's browser has the ability to execute Java. Maps
     * to EMV 3DS field `browserJavaEnabled`.
     */
    java_enabled?: boolean | null;

    /**
     * Indicates whether the cardholder's browser has the ability to execute
     * JavaScript. Maps to EMV 3DS field `browserJavascriptEnabled`.
     */
    javascript_enabled?: boolean | null;

    /**
     * Language of the cardholder's browser as defined in IETF BCP47. Maps to EMV 3DS
     * field `browserLanguage`.
     */
    language?: string | null;

    /**
     * Time zone offset in minutes between UTC and browser local time. Maps to EMV 3DS
     * field `browserTz`.
     */
    time_zone?: string | null;

    /**
     * Content of the HTTP user-agent header. Maps to EMV 3DS field `browserUserAgent`.
     */
    user_agent?: string | null;
  }

  /**
   * Metadata about the challenge method and delivery. Only present when a challenge
   * is triggered.
   */
  export interface ChallengeMetadata {
    /**
     * The type of challenge method used for authentication.
     */
    method_type: 'SMS_OTP' | 'OUT_OF_BAND';

    /**
     * Indicates the status of the challenge
     *
     * - SUCCESS - Cardholder completed the challenge successfully
     * - PENDING - Challenge was issued to the cardholder and was not completed yet
     * - SMS_DELIVERY_FAILED - Lithic confirmed undeliverability of the SMS to the
     *   provided phone number. Relevant only for SMS_OTP method
     * - CARDHOLDER_TIMEOUT - Cardholder failed to complete the challenge within the
     *   given challenge TTL
     * - CANCELED_VIA_CHALLENGE_UI - Cardholder canceled the challenge by selecting
     *   "cancel" on the challenge UI
     * - CANCELED_OOB - Cardholder canceled the challenge out of band
     * - ATTEMPTS_EXCEEDED - Cardholder failed the challenge by either entering an
     *   incorrect OTP more than the allowed number of times or requesting a new OTP
     *   more than the allowed number of times
     * - ABORTED - Merchant aborted authentication after a challenge was requested
     * - ERROR - The challenge failed for a reason different than those documented
     */
    status:
      | 'SUCCESS'
      | 'PENDING'
      | 'SMS_DELIVERY_FAILED'
      | 'CARDHOLDER_TIMEOUT'
      | 'CANCELED_VIA_CHALLENGE_UI'
      | 'CANCELED_OOB'
      | 'ATTEMPTS_EXCEEDED'
      | 'ABORTED'
      | 'ERROR';

    /**
     * The phone number used for delivering the OTP. Relevant only for SMS_OTP method.
     */
    phone_number?: string | null;
  }

  /**
   * Object containing data about the e-commerce transaction for which the merchant
   * is requesting authentication.
   */
  export interface Transaction {
    /**
     * Amount of the purchase in minor units of currency with all punctuation removed.
     * Maps to EMV 3DS field `purchaseAmount`.
     */
    amount: number;

    /**
     * Approximate amount of the purchase in minor units of cardholder currency.
     * Derived from `amount` using a daily conversion rate.
     */
    cardholder_amount: number | null;

    /**
     * Currency of the purchase. Maps to EMV 3DS field `purchaseCurrency`. Permitted
     * values: ISO 4217 three-character currency code (e.g., USD).
     */
    currency: string;

    /**
     * Minor units of currency, as specified in ISO 4217 currency exponent. Maps to EMV
     * 3DS field `purchaseExponent`.
     */
    currency_exponent: number;

    /**
     * Date and time when the authentication was generated by the merchant/acquirer's
     * 3DS server. Maps to EMV 3DS field `purchaseDate`. Permitted values: Date string
     * in the ISO 8601 format yyyy-MM-dd'T'hh:mm:ssZ.
     */
    date_time: string;

    /**
     * Type of the transaction for which a 3DS authentication request is occurring.
     * Maps to EMV 3DS field `transType`.
     */
    type:
      | 'ACCOUNT_FUNDING'
      | 'CHECK_ACCEPTANCE'
      | 'GOODS_SERVICE_PURCHASE'
      | 'PREPAID_ACTIVATION_AND_LOAD'
      | 'QUASI_CASH_TRANSACTION'
      | null;
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
    type AuthenticationRetrieveResponse as AuthenticationRetrieveResponse,
    type AuthenticationSimulateResponse as AuthenticationSimulateResponse,
    type AuthenticationSimulateParams as AuthenticationSimulateParams,
    type AuthenticationSimulateOtpEntryParams as AuthenticationSimulateOtpEntryParams,
  };
}
