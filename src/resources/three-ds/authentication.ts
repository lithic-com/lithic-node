// File generated from our OpenAPI spec by Stainless.

import * as Core from 'lithic/core';
import { APIResource } from 'lithic/resource';
import * as AuthenticationAPI from 'lithic/resources/three-ds/authentication';

export class Authentication extends APIResource {
  /**
   * Get 3DS Authentication by token
   */
  retrieve(
    threeDSAuthenticationToken: string,
    options?: Core.RequestOptions,
  ): Core.APIPromise<AuthenticationRetrieveResponse> {
    return this.get(`/three_ds_authentication/${threeDSAuthenticationToken}`, options);
  }

  /**
   * Simulates a 3DS authentication request from the payment network as if it came
   * from an ACS. If you're configured for 3DS Customer Decisioning, simulating
   * authentications requires your customer decisioning endpoint to be set up
   * properly (respond with a valid JSON).
   */
  simulate(
    body: AuthenticationSimulateParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<AuthenticationSimulateResponse> {
    return this.post('/three_ds_authentication/simulate', { body, ...options });
  }
}

export interface AuthenticationRetrieveResponse {
  /**
   * Globally unique identifier for the 3DS authentication.
   */
  token: string;

  /**
   * Type of account/card that is being used for the transaction. Maps to EMV 3DS
   * field acctType.
   */
  account_type: 'NOT_APPLICABLE' | 'CREDIT' | 'DEBIT' | null;

  /**
   * Object containing additional data about the 3DS request that is beyond the EMV
   * 3DS standard spec (e.g., specific fields that only certain card networks send
   * but are not required across all 3DS requests).
   */
  additional_data: AuthenticationRetrieveResponse.AdditionalData;

  /**
   * Indicates the outcome of the 3DS authentication process.
   */
  authentication_result: 'SUCCESS' | 'DECLINE' | null;

  /**
   * Indicates whether the expiration date provided by the cardholder during checkout
   * matches Lithic's record of the card's expiration date.
   */
  card_expiry_check: 'MATCH' | 'MISMATCH' | 'NOT_PRESENT';

  /**
   * Globally unique identifier for the card on which the 3DS authentication has
   * occurred.
   */
  card_token: string;

  /**
   * Object containing data about the cardholder provided during the transaction.
   */
  cardholder: AuthenticationRetrieveResponse.Cardholder;

  /**
   * Channel in which the authentication occurs. Maps to EMV 3DS field deviceChannel.
   */
  channel: 'APP_BASED' | 'BROWSER' | 'THREE_DS_REQUESTOR_INITIATED';

  /**
   * Date and time when the authentication was created in Lithic's system.
   */
  created: string;

  /**
   * Entity that made the authentication decision.
   */
  decision_made_by: 'LITHIC_DEFAULT' | 'LITHIC_RULES' | 'CUSTOMER_ENDPOINT' | null;

  /**
   * Object containing data about the merchant involved in the e-commerce
   * transaction.
   */
  merchant: AuthenticationRetrieveResponse.Merchant;

  /**
   * Object containing data about the e-commerce transaction for which the merchant
   * is requesting authentication.
   */
  transaction: AuthenticationRetrieveResponse.Transaction;

  /**
   * Object containing data about the app used in the e-commerce transaction. Present
   * if the channel is 'APP_BASED'.
   */
  app?: AuthenticationRetrieveResponse.App;

  /**
   * Type of authentication request - i.e., the type of transaction or interaction is
   * causing the merchant to request an authentication. Maps to EMV 3DS field
   * threeDSRequestorAuthenticationInd.
   */
  authentication_request_type?:
    | 'PAYMENT_TRANSACTION'
    | 'RECURRING_TRANSACTION'
    | 'INSTALLMENT_TRANSACTION'
    | 'ADD_CARD'
    | 'MAINTAIN_CARD'
    | 'EMV_TOKEN_CARDHOLDER_VERIFICATION'
    | 'BILLING_AGREEMENT'
    | 'SPLIT_SHIPMENT'
    | 'DELAYED_SHIPMENT'
    | 'SPLIT_PAYMENT'
    | null;

  /**
   * Object containing data about the browser used in the e-commerce transaction.
   * Present if the channel is 'BROWSER'.
   */
  browser?: AuthenticationRetrieveResponse.Browser;

  /**
   * Type of 3DS Requestor Initiated (3RI) request i.e., a 3DS authentication that
   * takes place at the initiation of the merchant rather than the cardholder. The
   * most common example of this is where a merchant is authenticating before billing
   * for a recurring transaction such as a pay TV subscription or a utility bill.
   * Maps to EMV 3DS field threeRIInd.
   */
  three_ri_request_type?:
    | 'RECURRING_TRANSACTION'
    | 'INSTALLMENT_TRANSACTION'
    | 'ADD_CARD'
    | 'MAINTAIN_CARD_INFO'
    | 'ACCOUNT_VERIFICATION'
    | 'SPLIT_SHIPMENT'
    | 'TOP_UP'
    | 'MAIL_ORDER'
    | 'TELEPHONE_ORDER'
    | 'TRUST_LIST_STATUS_CHECK'
    | 'OTHER_PAYMENT'
    | 'BILLING_AGREEMENT'
    | 'DEVICE_BINDING_STATUS_CHECK'
    | 'CARD_SECURITY_CODE_STATUS_CHECK'
    | 'DELAYED_SHIPMENT'
    | 'SPLIT_PAYMENT'
    | null;
}

export namespace AuthenticationRetrieveResponse {
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
     * with a higher value indicating a higher amount of risk.
     */
    network_risk_score?: number | null;
  }

  /**
   * Object containing data about the cardholder provided during the transaction.
   */
  export interface Cardholder {
    /**
     * Indicates whether the shipping address and billing address provided by the
     * cardholder are the same. This value - and assessment of whether the addresses
     * match - is provided directly in the 3DS request and is not determined by Lithic.
     * Maps to EMV 3DS field addrMatch.
     */
    address_match?: boolean | null;

    /**
     * Object containing data on the billing address provided during the transaction.
     */
    billing_address?: Cardholder.BillingAddress;

    /**
     * Email address that is either provided by the cardholder or is on file with the
     * merchant in a 3RI request. Maps to EMV 3DS field email.
     */
    email?: string | null;

    /**
     * Name of the cardholder. Maps to EMV 3DS field cardholderName.
     */
    name?: string | null;

    /**
     * Home phone number provided by the cardholder. Maps to EMV 3DS fields
     * homePhone.cc and homePhone.subscriber.
     */
    phone_number_home?: string | null;

    /**
     * Mobile/cell phone number provided by the cardholder. Maps to EMV 3DS fields
     * mobilePhone.cc and mobilePhone.subscriber.
     */
    phone_number_mobile?: string | null;

    /**
     * Work phone number provided by the cardholder. Maps to EMV 3DS fields
     * workPhone.cc and workPhone.subscriber.
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
     * Merchant identifier as assigned by the acquirer. Maps to EMV 3DS field
     * acquirerMerchantId.
     */
    id: string;

    /**
     * Country code of the merchant requesting 3DS authentication. Maps to EMV 3DS
     * field merchantCountryCode.
     */
    country: string;

    /**
     * Merchant category code assigned to the merchant that describes its business
     * activity type. Maps to EMV 3DS field mcc.
     */
    mcc: string;

    /**
     * Name of the merchant. Maps to EMV 3DS field merchantName.
     */
    name: string;

    /**
     * Object containing additional data indicating additional risk factors related to
     * the e-commerce transaction.
     */
    risk_indicator: Merchant.RiskIndicator;
  }

  export namespace Merchant {
    /**
     * Object containing additional data indicating additional risk factors related to
     * the e-commerce transaction.
     */
    export interface RiskIndicator {
      /**
       * In transactions with electronic delivery, email address to which merchandise is
       * delivered. Maps to EMV 3DS field deliveryEmailAddress.
       */
      delivery_email_address?: string | null;

      /**
       * The delivery time frame for the merchandise. Maps to EMV 3DS field
       * deliveryTimeframe.
       */
      delivery_time_frame?:
        | 'ELECTRONIC_DELIVERY'
        | 'SAME_DAY_SHIPPING'
        | 'OVERNIGHT_SHIPPING'
        | 'TWO_DAY_OR_MORE_SHIPPING'
        | null;

      /**
       * In prepaid or gift card purchase transactions, purchase amount total in major
       * units (e.g., a purchase of USD $205.10 would be 205). Maps to EMV 3DS field
       * giftCardAmount.
       */
      gift_card_amount?: number | null;

      /**
       * In prepaid or gift card purchase transactions, count of individual prepaid or
       * gift cards/codes purchased. Maps to EMV 3DS field giftCardCount.
       */
      gift_card_count?: number | null;

      /**
       * In prepaid or gift card purchase transactions, currency code of the gift card.
       * Maps to EMV 3DS field giftCardCurr.
       */
      gift_card_currency?: string | null;

      /**
       * Indicates whether the purchase is for merchandise that is available now or at a
       * future date. Maps to EMV 3DS field preOrderPurchaseInd.
       */
      order_availability?: 'MERCHANDISE_AVAILABLE' | 'FUTURE_AVAILABILITY' | null;

      /**
       * In pre-order purchase transactions, the expected date that the merchandise will
       * be available. Maps to EMV 3DS field preOrderDate.
       */
      pre_order_available_date?: string | null;

      /**
       * Indicates whether the cardholder is reordering previously purchased merchandise.
       * Maps to EMV 3DS field reorderItemsInd.
       */
      reorder_items?: 'FIRST_TIME_ORDERED' | 'REORDERED' | null;

      /**
       * Shipping method that the cardholder chose for the transaction. If purchase
       * includes one or more item, this indicator is used for the physical goods; if the
       * purchase only includes digital goods, this indicator is used to describe the
       * most expensive item purchased. Maps to EMV 3DS field shipIndicator.
       */
      shipping_method?:
        | 'SHIP_TO_BILLING_ADDRESS'
        | 'SHIP_TO_OTHER_VERIFIED_ADDRESS'
        | 'SHIP_TO_NON_BILLING_ADDRESS'
        | 'SHIP_TO_STORE'
        | 'DIGITAL_GOODS'
        | 'TRAVEL_AND_EVENT_TICKETS'
        | 'OTHER'
        | 'PICK_UP_AND_GO_DELIVERY'
        | 'LOCKER_DELIVERY'
        | null;
    }
  }

  /**
   * Object containing data about the e-commerce transaction for which the merchant
   * is requesting authentication.
   */
  export interface Transaction {
    /**
     * Amount of the purchase in minor units of currency with all punctuation removed.
     * Maps to EMV 3DS field purchaseAmount.
     */
    amount: number;

    /**
     * Currency of the purchase. Maps to EMV 3DS field purchaseCurrency.
     */
    currency: string;

    /**
     * Minor units of currency, as specified in ISO 4217 currency exponent. Maps to EMV
     * 3DS field purchaseExponent.
     */
    currency_exponent: number;

    /**
     * Date and time when the authentication was generated by the merchant/acquirer's
     * 3DS server. Maps to EMV 3DS field purchaseDate.
     */
    date_time: string;

    /**
     * Type of the transaction for which a 3DS authentication request is occurring.
     * Maps to EMV 3DS field transType.
     */
    type:
      | 'GOODS_SERVICE_PURCHASE'
      | 'CHECK_ACCEPTANCE'
      | 'ACCOUNT_FUNDING'
      | 'QUASI_CASH_TRANSACTION'
      | 'PREPAID_ACTIVATION_AND_LOAD'
      | null;
  }

  /**
   * Object containing data about the app used in the e-commerce transaction. Present
   * if the channel is 'APP_BASED'.
   */
  export interface App {
    /**
     * Device information gathered from the cardholder's device - JSON name/value pairs
     * that is Base64url encoded. Maps to EMV 3DS field deviceInfo.
     */
    device_info?: string | null;

    /**
     * External IP address used by the app generating the 3DS authentication request.
     * Maps to EMV 3DS field appIp.
     */
    ip?: string;
  }

  /**
   * Object containing data about the browser used in the e-commerce transaction.
   * Present if the channel is 'BROWSER'.
   */
  export interface Browser {
    /**
     * IP address of the browser as returned by the HTTP headers to the 3DS requestor
     * (e.g., merchant or digital wallet). Maps to EMV 3DS field browserIP.
     */
    ip?: string | null;

    /**
     * Indicates whether the cardholder's browser has the ability to execute Java. Maps
     * to EMV 3DS field browserJavaEnabled.
     */
    java_enabled?: boolean | null;

    /**
     * Indicates whether the cardholder's browser has the ability to execute
     * JavaScript. Maps to EMV 3DS field browserJavascriptEnabled.
     */
    javascript_enabled?: boolean | null;

    /**
     * Language of the cardholder's browser as defined in IETF BCP47. Maps to EMV 3DS
     * field browserLanguage.
     */
    language?: string | null;

    /**
     * Time zone of the cardholder's browser offset in minutes between UTC and the
     * cardholder browser's local time. The offset is positive if the local time is
     * behind UTC and negative if it is ahead. Maps to EMV 3DS field browserTz.
     */
    time_zone?: string | null;

    /**
     * Content of the HTTP user-agent header. Maps to EMV 3DS field browserUserAgent.
     */
    user_agent?: string | null;
  }
}

export interface AuthenticationSimulateResponse {
  /**
   * A unique token to reference this transaction with later calls to void or clear
   * the authorization.
   */
  token?: string;

  /**
   * Debugging request ID to share with Lithic Support team.
   */
  debugging_request_id?: string;
}

export interface AuthenticationSimulateParams {
  merchant: AuthenticationSimulateParams.Merchant;

  /**
   * Sixteen digit card number.
   */
  pan: string;

  transaction: AuthenticationSimulateParams.Transaction;
}

export namespace AuthenticationSimulateParams {
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
     * Merchant descriptor, corresponds to `descriptor` in authorization.
     */
    name: string;
  }

  export interface Transaction {
    /**
     * Amount (in cents) to authenticate.
     */
    amount: number;

    /**
     * 3-digit alphabetic ISO 4217 currency code.
     */
    currency: string;
  }
}

export namespace Authentication {
  export import AuthenticationRetrieveResponse = AuthenticationAPI.AuthenticationRetrieveResponse;
  export import AuthenticationSimulateResponse = AuthenticationAPI.AuthenticationSimulateResponse;
  export import AuthenticationSimulateParams = AuthenticationAPI.AuthenticationSimulateParams;
}
