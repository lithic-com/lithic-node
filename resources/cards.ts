// File generated from our OpenAPI spec by Stainless.
import * as Core from '../core';

export class Cards extends Core.APIResource {
  /**
   * Create a new virtual or physical card. Parameters `pin`, `shipping_address`, and `product_id` only apply to physical cards.
   */
  create(body: CardCreateParams, options?: Core.RequestOptions): Promise<Core.APIResponse<Card>> {
    return this.post('/cards', { body, ...options });
  }

  /**
   * Get card configuration such as spend limit and state.
   */
  retrieve(id: string, options?: Core.RequestOptions): Promise<Core.APIResponse<Card>> {
    return this.get(`/cards/${id}`, options);
  }

  /**
   * Update the specified properties of the card. Unsupplied properties will remain unchanged. `pin` parameter only applies to physical cards. *Note: setting a card to a `CLOSED` state is a final action that cannot be undone.*
   */
  update(
    id: string,
    body?: CardUpdateParams | null | undefined,
    options?: Core.RequestOptions,
  ): Promise<Core.APIResponse<Card>> {
    return this.patch(`/cards/${id}`, { body, ...options });
  }

  /**
   * List cards.
   */
  list(query?: CardListParams | null | undefined, options?: Core.RequestOptions): Core.APIListPromise<Card> {
    return this.getAPIList('/cards', { query, ...options });
  }

  /**
   * Handling full card PANs and CVV codes requires that you comply with the Payment Card Industry Data Security Standards (PCI DSS). Some clients choose to reduce their compliance obligations by leveraging our embedded card UI solution documented below. In this setup, PANs and CVV codes are presented to the end-user via a card UI that we provide, optionally styled in the customer's branding using a specified css stylesheet. A user's browser makes the request directly to api.lithic.com, so card PANs and CVVs never touch the API customer's servers while full card data is displayed to their end-users. The response contains an HTML document. This means that the url for the request can be inserted straight into the `src` attribute of an iframe. ```html ``` You should compute the request payload on the server side. You can render it (or the whole iframe) on the server or make an ajax call from your front end code, but **do not ever embed your API key into front end code, as doing so introduces a serious security vulnerability**.
   */
  embed(query?: CardEmbedParams | null | undefined, options?: Core.RequestOptions): Promise<string> {
    return this.get('/embed/card', {
      ...{ query, ...options },
      headers: { Accept: 'text/html', ...options?.headers },
    });
  }

  /**
   * Allow your cardholders to directly add payment cards to the device's digital wallet (e.g. Apple Pay) with one touch from your app. This requires some additional setup and configuration. Please reach out to [api@lithic.com](mailto:api@lithic.com) or your account rep for more information.
   */
  provision(
    id: string,
    body?: CardProvisionParams | null | undefined,
    options?: Core.RequestOptions,
  ): Promise<Core.APIResponse<CardsProvisionResponse>> {
    return this.post(`/cards/${id}/provision`, { body, ...options });
  }

  /**
   * Initiate print and shipment of a duplicate card. Only applies to cards of type `PHYSICAL` [beta].
   */
  reissue(
    id: string,
    body?: CardReissueParams | null | undefined,
    options?: Core.RequestOptions,
  ): Promise<Core.APIResponse<Card>> {
    return this.post(`/cards/${id}/reissue`, { body, ...options });
  }
}

export interface Card {
  /**
   * An ISO 8601 timestamp for when the card was created. UTC time zone.
   */
  created: string;

  funding: Card.Funding;

  /**
   * Last four digits of the card number.
   */
  last_four: string;

  /**
   * Amount (in cents) to limit approved authorizations. Transaction requests above the spend limit will be declined.
   */
  spend_limit: number;

  /**
   * Spend limit duration values: * `ANNUALLY` - Card will authorize transactions up to spend limit in a calendar year. * `FOREVER` - Card will authorize only up to spend limit for the entire lifetime of the card. * `MONTHLY` - Card will authorize transactions up to spend limit for the trailing month. Month is calculated as this calendar date one month prior. * `TRANSACTION` - Card will authorizate multiple transactions if each individual transaction is under the spend limit.
   */
  spend_limit_duration: 'ANNUALLY' | 'FOREVER' | 'MONTHLY' | 'TRANSACTION';

  /**
   * Card state values: * `CLOSED` - Card will no longer approve authorizations. Closing a card cannot be undone. * `OPEN` - Card will approve authorizations (if they match card and account parameters). * `PAUSED` - Card will decline authorizations, but can be resumed at a later time. * `PENDING_FULFILLMENT` - The initial state for cards of type `PHYSICAL`. The card is provisioned pending manufacturing and fulfillment. Cards in this state can accept authorizations for e-commerce purchases, but not for "Card Present" purchases where the physical card itself is present. * `PENDING_ACTIVATION` - Each business day at 2pm Eastern Time Zone (ET), cards of type `PHYSICAL` in state `PENDING_FULFILLMENT` are sent to the card production warehouse and updated to state `PENDING_ACTIVATION` . Similar to `PENDING_FULFILLMENT`, cards in this state can be used for e-commerce transactions. API clients should update the card's state to `OPEN` only after the cardholder confirms receipt of the card. In sandbox, the same daily batch fulfillment occurs, but no cards are actually manufactured.
   */
  state: 'CLOSED' | 'OPEN' | 'PAUSED' | 'PENDING_ACTIVATION' | 'PENDING_FULFILLMENT';

  /**
   * Globally unique identifier.
   */
  token: string;

  /**
   * Card types: * `DIGITAL_WALLET` - Cards that can be provisioned to a digital wallet like Google Pay or Apple Wallet. * `MERCHANT_LOCKED` - Card is locked to first merchant that successfully authorizes the card. * `PHYSICAL` - Manufactured and sent to the cardholder. We offer white label branding, credit, ATM, PIN debit, chip/EMV, NFC and magstripe functionality. Contact [api@lithic.com](mailto:api@lithic.com) for more information. * `SINGLE_USE` - Card will close shortly after the first transaction. * `UNLOCKED` - Card will authorize at any merchant. Creating these cards requires additional privileges.
   */
  type: 'DIGITAL_WALLET' | 'MERCHANT_LOCKED' | 'PHYSICAL' | 'SINGLE_USE' | 'UNLOCKED';

  /**
   * Three digit cvv printed on the back of the card.
   */
  cvv?: string;

  /**
   * Two digit (MM) expiry month.
   */
  exp_month?: string;

  /**
   * Four digit (yyyy) expiry year.
   */
  exp_year?: string;

  /**
   * Hostname of card’s locked merchant (will be empty if not applicable).
   */
  hostname?: string;

  /**
   * Friendly name to identify the card.
   */
  memo?: string;

  /**
   * Primary Account Number (PAN) (i.e. the card number). Customers must be PCI compliant to have PAN returned as a field in production. Please contact [support@lithic.com](mailto:support@lithic.com) for questions.
   */
  pan?: string;
}

export namespace Card {
  export interface Funding {
    /**
     * An ISO 8601 string representing when this funding source was added to the Lithic account. This may be `null`. UTC time zone.
     */
    created: string;

    /**
     * The last 4 digits of the account (e.g. bank account, debit card) associated with this FundingAccount. This may be null.
     */
    last_four: string;

    /**
     * State of funding source. Funding source states: * `ENABLED` - The funding account is available to use for card creation and transactions. * `PENDING` - The funding account is still being verified e.g. bank micro-deposits verification.
     */
    state: 'ENABLED' | 'PENDING';

    /**
     * A globally unique identifier for this FundingAccount.
     */
    token: string;

    /**
     * Types of funding source: * `DEPOSITORY_CHECKING` - Bank checking account. * `DEPOSITORY_SAVINGS` - Bank savings account.
     */
    type: 'DEPOSITORY_CHECKING' | 'DEPOSITORY_SAVINGS';

    /**
     * Account name identifying the funding source. This may be `null`.
     */
    account_name?: string;

    /**
     * The nickname given to the `FundingAccount` or `null` if it has no nickname.
     */
    nickname?: string;
  }
}

export interface CardsProvisionResponse {
  provisioning_payload?: string;
}

export interface CardCreateParams {
  /**
   * Card types: * `DIGITAL_WALLET` - Cards that can be provisioned to a digital wallet like Google Pay or Apple Wallet. * `MERCHANT_LOCKED` - Card is locked to first merchant that successfully authorizes the card. * `PHYSICAL` - Manufactured and sent to the cardholder. We offer white label branding, credit, ATM, PIN debit, chip/EMV, NFC and magstripe functionality. Contact api@lithic.com for more information. * `SINGLE_USE` - Card will close shortly after the first transaction. * `UNLOCKED` - Card will authorize at any merchant. Creating these cards requires additional privileges.
   */
  type: 'DIGITAL_WALLET' | 'MERCHANT_LOCKED' | 'PHYSICAL' | 'SINGLE_USE' | 'UNLOCKED';

  /**
   * Only required for multi-account users. Token identifying the account the card will be associated with. Only applicable if using account enrollment. See [Managing Accounts](https://docs.lithic.com/docs/managing-accounts) for more information.
   */
  account_token?: string;

  /**
   * Identifies the card program under which to create the card. Different card programs may have their own configurations (e.g., digital wallet card art, BIN type). This must be configured with Lithic before use.
   */
  card_program_token?: string;

  /**
   * Two digit (MM) expiry month. If neither `exp_month` nor `exp_year` is provided, an expiration date will be generated.
   */
  exp_month?: string;

  /**
   * Four digit (yyyy) expiry year. If neither `exp_month` nor `exp_year` is provided, an expiration date will be generated.
   */
  exp_year?: string;

  /**
   * The token for the desired `FundingAccount` to use when making transactions with this card.
   */
  funding_token?: string;

  /**
   * Friendly name to identify the card.
   */
  memo?: string;

  /**
   * Encrypted PIN block (in base64). Only applies to cards of type `PHYSICAL` [beta]. See [Encrypted PIN Block](https://docs.lithic.com/docs/cards#encrypted-pin-block-enterprise).
   */
  pin?: string;

  /**
   * Specifies the configuration (e.g., physical card art) that the card should be manufactured with, and only applies to cards of type `PHYSICAL` [beta]. This must be configured with Lithic before use.
   */
  product_id?: string;

  shipping_address?: CardCreateParams.ShippingAddress;

  /**
   * Amount (in cents) to limit approved authorizations. Transaction requests above the spend limit will be declined.
   */
  spend_limit?: number;

  /**
   * Spend limit duration values: * `ANNUALLY` - Card will authorize transactions up to spend limit in a calendar year. * `FOREVER` - Card will authorize only up to spend limit for the entire lifetime of the card. * `MONTHLY` - Card will authorize transactions up to spend limit for the trailing month. Month is calculated as this calendar date one month prior. * `TRANSACTION` - Card will authorizate multiple transactions if each individual transaction is under the spend limit.
   */
  spend_limit_duration?: 'ANNUALLY' | 'FOREVER' | 'MONTHLY' | 'TRANSACTION';

  /**
   * Card state values: * `OPEN` - Card will approve authorizations (if they match card and account parameters). * `PAUSED` - Card will decline authorizations, but can be resumed at a later time.
   */
  state?: 'OPEN' | 'PAUSED';
}

export namespace CardCreateParams {
  export interface ShippingAddress {
    /**
     * Valid USPS routable address.
     */
    address1: string;

    /**
     * City
     */
    city: string;

    /**
     * Uppercase ISO 3166-1 alpha-3 three character abbreviation.
     */
    country: string;

    /**
     * Customer's first name. This will be the first name printed on the physical card.
     */
    first_name: string;

    /**
     * Customer's surname (family name). This will be the last name printed on the physical card.
     */
    last_name: string;

    /**
     * Uppercase ISO 3166-2 two character abbreviation for US and CA. Optional with a limit of 24 characters for other countries.
     */
    state: string;

    /**
     * Post code (including five digit zipcode and nine digit "ZIP+4").
     */
    zipcode: string;

    /**
     * Unit number (if applicable).
     */
    address2?: string;
  }
}

export interface CardUpdateParams {
  /**
   * Only required for multi-account users. Token identifying the account the card will be associated with. Only applicable if using account enrollment. See [Managing Accounts](https://docs.lithic.com/docs/managing-accounts) for more information.
   */
  account_token?: string;

  /**
   * The token for the desired `FundingAccount` to use when making transactions with this card.
   */
  funding_token?: string;

  /**
   * Friendly name to identify the card.
   */
  memo?: string;

  /**
   * Encrypted PIN block (in base64). Only applies to cards of type `PHYSICAL` [beta]. See [Encrypted PIN Block](https://docs.lithic.com/docs/cards#encrypted-pin-block-enterprise).
   */
  pin?: string;

  /**
   * Amount (in cents) to limit approved authorizations. Transaction requests above the spend limit will be declined.
   */
  spend_limit?: number;

  /**
   * Spend limit duration values: * `ANNUALLY` - Card will authorize transactions up to spend limit in a calendar year. * `FOREVER` - Card will authorize only up to spend limit for the entire lifetime of the card. * `MONTHLY` - Card will authorize transactions up to spend limit for the trailing month. Month is calculated as this calendar date one month prior. * `TRANSACTION` - Card will authorizate multiple transactions if each individual transaction is under the spend limit.
   */
  spend_limit_duration?: 'ANNUALLY' | 'FOREVER' | 'MONTHLY' | 'TRANSACTION';

  /**
   * Card state values: * `CLOSED` - Card will no longer approve authorizations. Closing a card cannot be undone. * `OPEN` - Card will approve authorizations (if they match card and account parameters). * `PAUSED` - Card will decline authorizations, but can be resumed at a later time.
   */
  state?: 'CLOSED' | 'OPEN' | 'PAUSED';
}

export interface CardListParams {
  /**
   * Only required for multi-account users. Returns cards associated with this account. Only applicable if using account enrollment. See [Managing Accounts](https://docs.lithic.com/docs/managing-accounts) for more information.
   */
  account_token?: string;

  /**
   * Date string in 8601 format. Only entries created after the specified date will be included. UTC time zone.
   */
  begin?: string;

  /**
   * Date string in 8601 format. Only entries created before the specified date will be included. UTC time zone.
   */
  end?: string;

  /**
   * Page (for pagination).
   */
  page?: number;

  /**
   * Page size (for pagination).
   */
  page_size?: number;
}

export interface CardEmbedParams {
  /**
   * A base64 encoded JSON string of an EmbedRequest to specify which card to load.
   */
  embed_request?: string;

  /**
   * SHA2 HMAC of the embed_request JSON string with base64 digest.
   */
  hmac?: string;
}

export interface CardProvisionParams {
  /**
   * Only required for multi-account users. Token identifying the account the card will be associated with. Only applicable if using account enrollment. See [Managing Accounts](https://docs.lithic.com/docs/managing-accounts) for more information.
   */
  account_token?: string;

  /**
   * Required for `APPLE_PAY`. Apple's public leaf certificate. Base64 encoded in PEM format with headers `(-----BEGIN CERTIFICATE-----)` and trailers omitted. Provided by the device's wallet.
   */
  certificate?: string;

  /**
   * Currently `APPLE_PAY` and `SAMSUNG_PAY` are supported (`GOOGLE_PAY` coming soon).
   */
  digital_wallet?: 'APPLE_PAY' | 'GOOGLE_PAY' | 'SAMSUNG_PAY';

  /**
   * Required for `APPLE_PAY`. Base64 cryptographic nonce provided by the device's wallet.
   */
  nonce?: string;

  /**
   * Required for `APPLE_PAY`. Base64 cryptographic nonce provided by the device's wallet.
   */
  nonce_signature?: string;
}

export interface CardReissueParams {
  /**
   * Specifies the configuration (e.g. physical card art) that the card should be manufactured with, and only applies to cards of type `PHYSICAL` [beta]. This must be configured with Lithic before use.
   */
  product_id?: string;

  /**
   * If omitted, the previous shipping address will be used.
   */
  shipping_address?: CardReissueParams.ShippingAddress;
}

export namespace CardReissueParams {
  export interface ShippingAddress {
    /**
     * Valid USPS routable address.
     */
    address1: string;

    /**
     * City
     */
    city: string;

    /**
     * Uppercase ISO 3166-1 alpha-3 three character abbreviation.
     */
    country: string;

    /**
     * Customer's first name. This will be the first name printed on the physical card.
     */
    first_name: string;

    /**
     * Customer's surname (family name). This will be the last name printed on the physical card.
     */
    last_name: string;

    /**
     * Uppercase ISO 3166-2 two character abbreviation for US and CA. Optional with a limit of 24 characters for other countries.
     */
    state: string;

    /**
     * Post code (including five digit zipcode and nine digit "ZIP+4").
     */
    zipcode: string;

    /**
     * Unit number (if applicable).
     */
    address2?: string;
  }
}
