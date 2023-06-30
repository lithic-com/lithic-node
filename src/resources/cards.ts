// File generated from our OpenAPI spec by Stainless.

import * as Core from 'lithic/core';
import { APIResource } from 'lithic/resource';
import { isRequestOptions } from 'lithic/core';
import * as Shared from 'lithic/resources/shared';
import { createHmac } from 'crypto';
import * as API from './';
import { Page, PageParams } from 'lithic/pagination';

export class Cards extends APIResource {
  /**
   * Create a new virtual or physical card. Parameters `pin`, `shipping_address`, and
   * `product_id` only apply to physical cards.
   */
  create(body: CardCreateParams, options?: Core.RequestOptions): Promise<Core.APIResponse<Card>> {
    return this.post('/cards', { body, ...options });
  }

  /**
   * Get card configuration such as spend limit and state.
   */
  retrieve(cardToken: string, options?: Core.RequestOptions): Promise<Core.APIResponse<Card>> {
    return this.get(`/cards/${cardToken}`, options);
  }

  /**
   * Update the specified properties of the card. Unsupplied properties will remain
   * unchanged. `pin` parameter only applies to physical cards.
   *
   * _Note: setting a card to a `CLOSED` state is a final action that cannot be
   * undone._
   */
  update(
    cardToken: string,
    body: CardUpdateParams,
    options?: Core.RequestOptions,
  ): Promise<Core.APIResponse<Card>> {
    return this.patch(`/cards/${cardToken}`, { body, ...options });
  }

  /**
   * List cards.
   */
  list(query?: CardListParams, options?: Core.RequestOptions): Core.PagePromise<CardsPage>;
  list(options?: Core.RequestOptions): Core.PagePromise<CardsPage>;
  list(
    query: CardListParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.PagePromise<CardsPage> {
    if (isRequestOptions(query)) {
      return this.list({}, query);
    }
    return this.getAPIList('/cards', CardsPage, { query, ...options });
  }

  /**
   * Handling full card PANs and CVV codes requires that you comply with the Payment
   * Card Industry Data Security Standards (PCI DSS). Some clients choose to reduce
   * their compliance obligations by leveraging our embedded card UI solution
   * documented below.
   *
   * In this setup, PANs and CVV codes are presented to the end-user via a card UI
   * that we provide, optionally styled in the customer's branding using a specified
   * css stylesheet. A user's browser makes the request directly to api.lithic.com,
   * so card PANs and CVVs never touch the API customer's servers while full card
   * data is displayed to their end-users. The response contains an HTML document.
   * This means that the url for the request can be inserted straight into the `src`
   * attribute of an iframe.
   *
   * ```html
   * <iframe
   *   id="card-iframe"
   *   src="https://sandbox.lithic.com/v1/embed/card?embed_request=eyJjc3MiO...;hmac=r8tx1..."
   *   allow="clipboard-write"
   *   class="content"
   * ></iframe>
   * ```
   *
   * You should compute the request payload on the server side. You can render it (or
   * the whole iframe) on the server or make an ajax call from your front end code,
   * but **do not ever embed your API key into front end code, as doing so introduces
   * a serious security vulnerability**.
   */
  embed(query: CardEmbedParams, options?: Core.RequestOptions): Promise<Core.APIResponse<string>> {
    return this.get('/embed/card', {
      query,
      ...options,
      headers: { Accept: 'text/html', ...options?.headers },
    });
  }

  /**
   * Generates and executes an embed request, returning html you can serve to the
   * user.
   *
   * Be aware that this html contains sensitive data whose presence on your server
   * could trigger PCI DSS.
   *
   * If your company is not certified PCI compliant, we recommend using
   * `getEmbedURL()` instead. You would then pass that returned URL to the frontend,
   * where you can load it via an iframe.
   */
  getEmbedHTML(query: CardGetEmbedHTMLParams, options?: Core.RequestOptions): Promise<string> {
    return this.get(this.getEmbedURL(query), {
      ...options,
      headers: { Accept: 'text/html', ...options?.headers },
    });
  }

  /**
   * Handling full card PANs and CVV codes requires that you comply with the Payment
   * Card Industry Data Security Standards (PCI DSS). Some clients choose to reduce
   * their compliance obligations by leveraging our embedded card UI solution
   * documented below.
   *
   * In this setup, PANs and CVV codes are presented to the end-user via a card UI
   * that we provide, optionally styled in the customer's branding using a specified
   * css stylesheet. A user's browser makes the request directly to api.lithic.com,
   * so card PANs and CVVs never touch the API customer's servers while full card
   * data is displayed to their end-users. The response contains an HTML document.
   * This means that the url for the request can be inserted straight into the `src`
   * attribute of an iframe.
   *
   * ```html
   * <iframe
   *   id="card-iframe"
   *   src="https://sandbox.lithic.com/v1/embed/card?embed_request=eyJjc3MiO...;hmac=r8tx1..."
   *   allow="clipboard-write"
   *   class="content"
   * ></iframe>
   * ```
   *
   * You should compute the request payload on the server side. You can render it (or
   * the whole iframe) on the server or make an ajax call from your front end code,
   * but **do not ever embed your API key into front end code, as doing so introduces
   * a serious security vulnerability**.
   */
  getEmbedURL(query: CardGetEmbedURLParams): string {
    // Default expiration of 1 minute from now.
    if (!query.expiration) {
      const date = new Date();
      date.setMinutes(date.getMinutes() + 1);
      query.expiration = date.toISOString();
    }

    const serialized = JSON.stringify(query);
    const hmac = createHmac('sha256', this.client.apiKey!).update(serialized).digest('base64');
    const embedRequest = Buffer.from(serialized).toString('base64');
    return this.client.buildURL('/embed/card', { hmac, embed_request: embedRequest });
  }

  /**
   * Allow your cardholders to directly add payment cards to the device's digital
   * wallet (e.g. Apple Pay) with one touch from your app.
   *
   * This requires some additional setup and configuration. Please
   * [Contact Us](https://lithic.com/contact) or your Customer Success representative
   * for more information.
   */
  provision(
    cardToken: string,
    body: CardProvisionParams,
    options?: Core.RequestOptions,
  ): Promise<Core.APIResponse<CardProvisionResponse>> {
    return this.post(`/cards/${cardToken}/provision`, { body, ...options });
  }

  /**
   * Initiate print and shipment of a duplicate physical card.
   *
   * Only applies to cards of type `PHYSICAL`.
   */
  reissue(
    cardToken: string,
    body: CardReissueParams,
    options?: Core.RequestOptions,
  ): Promise<Core.APIResponse<Card>> {
    return this.post(`/cards/${cardToken}/reissue`, { body, ...options });
  }
}

export class CardsPage extends Page<Card> {}

export interface Card {
  /**
   * Globally unique identifier.
   */
  token: string;

  /**
   * An RFC 3339 timestamp for when the card was created. UTC time zone.
   */
  created: string;

  funding: Card.Funding;

  /**
   * Last four digits of the card number.
   */
  last_four: string;

  /**
   * Amount (in cents) to limit approved authorizations. Transaction requests above
   * the spend limit will be declined.
   */
  spend_limit: number;

  /**
   * Spend limit duration values:
   *
   * - `ANNUALLY` - Card will authorize transactions up to spend limit in a calendar
   *   year.
   * - `FOREVER` - Card will authorize only up to spend limit for the entire lifetime
   *   of the card.
   * - `MONTHLY` - Card will authorize transactions up to spend limit for the
   *   trailing month. Month is calculated as this calendar date one month prior.
   * - `TRANSACTION` - Card will authorize multiple transactions if each individual
   *   transaction is under the spend limit.
   */
  spend_limit_duration: SpendLimitDuration;

  /**
   * Card state values:
   *
   * - `CLOSED` - Card will no longer approve authorizations. Closing a card cannot
   *   be undone.
   * - `OPEN` - Card will approve authorizations (if they match card and account
   *   parameters).
   * - `PAUSED` - Card will decline authorizations, but can be resumed at a later
   *   time.
   * - `PENDING_FULFILLMENT` - The initial state for cards of type `PHYSICAL`. The
   *   card is provisioned pending manufacturing and fulfillment. Cards in this state
   *   can accept authorizations for e-commerce purchases, but not for "Card Present"
   *   purchases where the physical card itself is present.
   * - `PENDING_ACTIVATION` - Each business day at 2pm Eastern Time Zone (ET), cards
   *   of type `PHYSICAL` in state `PENDING_FULFILLMENT` are sent to the card
   *   production warehouse and updated to state `PENDING_ACTIVATION` . Similar to
   *   `PENDING_FULFILLMENT`, cards in this state can be used for e-commerce
   *   transactions. API clients should update the card's state to `OPEN` only after
   *   the cardholder confirms receipt of the card.
   *
   * In sandbox, the same daily batch fulfillment occurs, but no cards are actually
   * manufactured.
   */
  state: 'CLOSED' | 'OPEN' | 'PAUSED' | 'PENDING_ACTIVATION' | 'PENDING_FULFILLMENT';

  /**
   * Card types:
   *
   * - `VIRTUAL` - Card will authorize at any merchant and can be added to a digital
   *   wallet like Apple Pay or Google Pay (if the card program is digital
   *   wallet-enabled).
   * - `PHYSICAL` - Manufactured and sent to the cardholder. We offer white label
   *   branding, credit, ATM, PIN debit, chip/EMV, NFC and magstripe functionality.
   *   Reach out at [lithic.com/contact](https://lithic.com/contact) for more
   *   information.
   * - `SINGLE_USE` - Card is closed upon first successful authorization.
   * - `MERCHANT_LOCKED` - _[Deprecated]_ Card is locked to the first merchant that
   *   successfully authorizes the card.
   */
  type: 'VIRTUAL' | 'PHYSICAL' | 'MERCHANT_LOCKED' | 'SINGLE_USE';

  /**
   * List of identifiers for the Auth Rule(s) that are applied on the card.
   */
  auth_rule_tokens?: Array<string>;

  /**
   * Three digit cvv printed on the back of the card.
   */
  cvv?: string;

  /**
   * Specifies the digital card art to be displayed in the user’s digital wallet
   * after tokenization. This artwork must be approved by Mastercard and configured
   * by Lithic to use. See
   * [Flexible Card Art Guide](https://docs.lithic.com/docs/about-digital-wallets#flexible-card-art).
   */
  digital_card_art_token?: string;

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
   * Friendly name to identify the card. We recommend against using this field to
   * store JSON data as it can cause unexpected behavior.
   */
  memo?: string;

  /**
   * Primary Account Number (PAN) (i.e. the card number). Customers must be PCI
   * compliant to have PAN returned as a field in production. Please contact
   * [support@lithic.com](mailto:support@lithic.com) for questions.
   */
  pan?: string;
}

export namespace Card {
  export interface Funding {
    /**
     * A globally unique identifier for this FundingAccount.
     */
    token: string;

    /**
     * An RFC 3339 string representing when this funding source was added to the Lithic
     * account. This may be `null`. UTC time zone.
     */
    created: string;

    /**
     * The last 4 digits of the account (e.g. bank account, debit card) associated with
     * this FundingAccount. This may be null.
     */
    last_four: string;

    /**
     * State of funding source.
     *
     * Funding source states:
     *
     * - `ENABLED` - The funding account is available to use for card creation and
     *   transactions.
     * - `PENDING` - The funding account is still being verified e.g. bank
     *   micro-deposits verification.
     * - `DELETED` - The founding account has been deleted.
     */
    state: 'ENABLED' | 'PENDING' | 'DELETED';

    /**
     * Types of funding source:
     *
     * - `DEPOSITORY_CHECKING` - Bank checking account.
     * - `DEPOSITORY_SAVINGS` - Bank savings account.
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

export interface EmbedRequestParams {
  /**
   * Globally unique identifier for the card to be displayed.
   */
  token: string;

  /**
   * A publicly available URI, so the white-labeled card element can be styled with
   * the client's branding.
   */
  css?: string;

  /**
   * An RFC 3339 timestamp for when the request should expire. UTC time zone.
   *
   * If no timezone is specified, UTC will be used. If payload does not contain an
   * expiration, the request will never expire.
   *
   * Using an `expiration` reduces the risk of a
   * [replay attack](https://en.wikipedia.org/wiki/Replay_attack). Without supplying
   * the `expiration`, in the event that a malicious user gets a copy of your request
   * in transit, they will be able to obtain the response data indefinitely.
   */
  expiration?: string;

  /**
   * Required if you want to post the element clicked to the parent iframe.
   *
   * If you supply this param, you can also capture click events in the parent iframe
   * by adding an event listener.
   */
  target_origin?: string;
}

/**
 * Spend limit duration values:
 *
 * - `ANNUALLY` - Card will authorize transactions up to spend limit in a calendar
 *   year.
 * - `FOREVER` - Card will authorize only up to spend limit for the entire lifetime
 *   of the card.
 * - `MONTHLY` - Card will authorize transactions up to spend limit for the
 *   trailing month. Month is calculated as this calendar date one month prior.
 * - `TRANSACTION` - Card will authorize multiple transactions if each individual
 *   transaction is under the spend limit.
 */
export type SpendLimitDuration = 'ANNUALLY' | 'FOREVER' | 'MONTHLY' | 'TRANSACTION';

export type CardEmbedResponse = string;

export interface CardProvisionResponse {
  provisioning_payload?: string;
}

export interface CardCreateParams {
  /**
   * Card types:
   *
   * - `VIRTUAL` - Card will authorize at any merchant and can be added to a digital
   *   wallet like Apple Pay or Google Pay (if the card program is digital
   *   wallet-enabled).
   * - `PHYSICAL` - Manufactured and sent to the cardholder. We offer white label
   *   branding, credit, ATM, PIN debit, chip/EMV, NFC and magstripe functionality.
   *   Reach out at [lithic.com/contact](https://lithic.com/contact) for more
   *   information.
   * - `SINGLE_USE` - Card is closed upon first successful authorization.
   * - `MERCHANT_LOCKED` - _[Deprecated]_ Card is locked to the first merchant that
   *   successfully authorizes the card.
   */
  type: 'VIRTUAL' | 'PHYSICAL' | 'MERCHANT_LOCKED' | 'SINGLE_USE';

  /**
   * Globally unique identifier for the account that the card will be associated
   * with. Required for programs enrolling users using the
   * [/account_holders endpoint](https://docs.lithic.com/docs/account-holders-kyc).
   * See [Managing Your Program](doc:managing-your-program) for more information.
   */
  account_token?: string;

  /**
   * For card programs with more than one BIN range. This must be configured with
   * Lithic before use. Identifies the card program/BIN range under which to create
   * the card. If omitted, will utilize the program's default `card_program_token`.
   * In Sandbox, use 00000000-0000-0000-1000-000000000000 and
   * 00000000-0000-0000-2000-000000000000 to test creating cards on specific card
   * programs.
   */
  card_program_token?: string;

  /**
   * Specifies the digital card art to be displayed in the user’s digital wallet
   * after tokenization. This artwork must be approved by Mastercard and configured
   * by Lithic to use. See
   * [Flexible Card Art Guide](https://docs.lithic.com/docs/about-digital-wallets#flexible-card-art).
   */
  digital_card_art_token?: string;

  /**
   * Two digit (MM) expiry month. If neither `exp_month` nor `exp_year` is provided,
   * an expiration date will be generated.
   */
  exp_month?: string;

  /**
   * Four digit (yyyy) expiry year. If neither `exp_month` nor `exp_year` is
   * provided, an expiration date will be generated.
   */
  exp_year?: string;

  /**
   * Friendly name to identify the card. We recommend against using this field to
   * store JSON data as it can cause unexpected behavior.
   */
  memo?: string;

  /**
   * Encrypted PIN block (in base64). Only applies to cards of type `PHYSICAL` and
   * `VIRTUAL`. See
   * [Encrypted PIN Block](https://docs.lithic.com/docs/cards#encrypted-pin-block-enterprise).
   */
  pin?: string;

  /**
   * Only applicable to cards of type `PHYSICAL`. This must be configured with Lithic
   * before use. Specifies the configuration (i.e., physical card art) that the card
   * should be manufactured with.
   */
  product_id?: string;

  shipping_address?: Shared.ShippingAddress;

  /**
   * Shipping method for the card. Only applies to cards of type PHYSICAL. Use of
   * options besides `STANDARD` require additional permissions.
   *
   * - `STANDARD` - USPS regular mail or similar international option, with no
   *   tracking
   * - `STANDARD_WITH_TRACKING` - USPS regular mail or similar international option,
   *   with tracking
   * - `EXPEDITED` - FedEx Standard Overnight or similar international option, with
   *   tracking
   */
  shipping_method?: 'STANDARD' | 'STANDARD_WITH_TRACKING' | 'EXPEDITED';

  /**
   * Amount (in cents) to limit approved authorizations. Transaction requests above
   * the spend limit will be declined. Note that a spend limit of 0 is effectively no
   * limit, and should only be used to reset or remove a prior limit. Only a limit of
   * 1 or above will result in declined transactions due to checks against the card
   * limit.
   */
  spend_limit?: number;

  /**
   * Spend limit duration values:
   *
   * - `ANNUALLY` - Card will authorize transactions up to spend limit in a calendar
   *   year.
   * - `FOREVER` - Card will authorize only up to spend limit for the entire lifetime
   *   of the card.
   * - `MONTHLY` - Card will authorize transactions up to spend limit for the
   *   trailing month. Month is calculated as this calendar date one month prior.
   * - `TRANSACTION` - Card will authorize multiple transactions if each individual
   *   transaction is under the spend limit.
   */
  spend_limit_duration?: SpendLimitDuration;

  /**
   * Card state values:
   *
   * - `OPEN` - Card will approve authorizations (if they match card and account
   *   parameters).
   * - `PAUSED` - Card will decline authorizations, but can be resumed at a later
   *   time.
   */
  state?: 'OPEN' | 'PAUSED';
}

export interface CardUpdateParams {
  /**
   * Identifier for any Auth Rules that will be applied to transactions taking place
   * with the card.
   */
  auth_rule_token?: string;

  /**
   * Specifies the digital card art to be displayed in the user’s digital wallet
   * after tokenization. This artwork must be approved by Mastercard and configured
   * by Lithic to use. See
   * [Flexible Card Art Guide](https://docs.lithic.com/docs/about-digital-wallets#flexible-card-art).
   */
  digital_card_art_token?: string;

  /**
   * Friendly name to identify the card. We recommend against using this field to
   * store JSON data as it can cause unexpected behavior.
   */
  memo?: string;

  /**
   * Encrypted PIN block (in base64). Only applies to cards of type `PHYSICAL` and
   * `VIRTUAL`. See
   * [Encrypted PIN Block](https://docs.lithic.com/docs/cards#encrypted-pin-block-enterprise).
   */
  pin?: string;

  /**
   * Amount (in cents) to limit approved authorizations. Transaction requests above
   * the spend limit will be declined. Note that a spend limit of 0 is effectively no
   * limit, and should only be used to reset or remove a prior limit. Only a limit of
   * 1 or above will result in declined transactions due to checks against the card
   * limit.
   */
  spend_limit?: number;

  /**
   * Spend limit duration values:
   *
   * - `ANNUALLY` - Card will authorize transactions up to spend limit in a calendar
   *   year.
   * - `FOREVER` - Card will authorize only up to spend limit for the entire lifetime
   *   of the card.
   * - `MONTHLY` - Card will authorize transactions up to spend limit for the
   *   trailing month. Month is calculated as this calendar date one month prior.
   * - `TRANSACTION` - Card will authorize multiple transactions if each individual
   *   transaction is under the spend limit.
   */
  spend_limit_duration?: SpendLimitDuration;

  /**
   * Card state values:
   *
   * - `CLOSED` - Card will no longer approve authorizations. Closing a card cannot
   *   be undone.
   * - `OPEN` - Card will approve authorizations (if they match card and account
   *   parameters).
   * - `PAUSED` - Card will decline authorizations, but can be resumed at a later
   *   time.
   */
  state?: 'CLOSED' | 'OPEN' | 'PAUSED';
}

export interface CardListParams extends PageParams {
  /**
   * Returns cards associated with the specified account.
   */
  account_token?: string;

  /**
   * Date string in RFC 3339 format. Only entries created after the specified date
   * will be included. UTC time zone.
   */
  begin?: string;

  /**
   * Date string in RFC 3339 format. Only entries created before the specified date
   * will be included. UTC time zone.
   */
  end?: string;
}

export interface CardEmbedParams {
  /**
   * A base64 encoded JSON string of an EmbedRequest to specify which card to load.
   */
  embed_request: string;

  /**
   * SHA256 HMAC of the embed_request JSON string with base64 digest.
   */
  hmac: string;
}

export interface CardGetEmbedHTMLParams {
  /**
   * Globally unique identifier for the card to be displayed.
   */
  token: string;

  /**
   * A publicly available URI, so the white-labeled card element can be styled with
   * the client's branding.
   */
  css?: string;

  /**
   * An RFC 3339 timestamp for when the request should expire. UTC time zone.
   *
   * If no timezone is specified, UTC will be used. If payload does not contain an
   * expiration, the request will never expire.
   *
   * Using an `expiration` reduces the risk of a
   * [replay attack](https://en.wikipedia.org/wiki/Replay_attack). Without supplying
   * the `expiration`, in the event that a malicious user gets a copy of your request
   * in transit, they will be able to obtain the response data indefinitely.
   */
  expiration?: string;

  /**
   * Required if you want to post the element clicked to the parent iframe.
   *
   * If you supply this param, you can also capture click events in the parent iframe
   * by adding an event listener.
   */
  target_origin?: string;
}

export interface CardGetEmbedURLParams {
  /**
   * Globally unique identifier for the card to be displayed.
   */
  token: string;

  /**
   * A publicly available URI, so the white-labeled card element can be styled with
   * the client's branding.
   */
  css?: string;

  /**
   * An RFC 3339 timestamp for when the request should expire. UTC time zone.
   *
   * If no timezone is specified, UTC will be used. If payload does not contain an
   * expiration, the request will never expire.
   *
   * Using an `expiration` reduces the risk of a
   * [replay attack](https://en.wikipedia.org/wiki/Replay_attack). Without supplying
   * the `expiration`, in the event that a malicious user gets a copy of your request
   * in transit, they will be able to obtain the response data indefinitely.
   */
  expiration?: string;

  /**
   * Required if you want to post the element clicked to the parent iframe.
   *
   * If you supply this param, you can also capture click events in the parent iframe
   * by adding an event listener.
   */
  target_origin?: string;
}

export interface CardProvisionParams {
  /**
   * Only applicable if `digital_wallet` is `APPLE_PAY`. Omit to receive only
   * `activationData` in the response. Apple's public leaf certificate. Base64
   * encoded in PEM format with headers `(-----BEGIN CERTIFICATE-----)` and trailers
   * omitted. Provided by the device's wallet.
   */
  certificate?: string;

  /**
   * Name of digital wallet provider.
   */
  digital_wallet?: 'APPLE_PAY' | 'GOOGLE_PAY' | 'SAMSUNG_PAY';

  /**
   * Only applicable if `digital_wallet` is `APPLE_PAY`. Omit to receive only
   * `activationData` in the response. Base64 cryptographic nonce provided by the
   * device's wallet.
   */
  nonce?: string;

  /**
   * Only applicable if `digital_wallet` is `APPLE_PAY`. Omit to receive only
   * `activationData` in the response. Base64 cryptographic nonce provided by the
   * device's wallet.
   */
  nonce_signature?: string;
}

export interface CardReissueParams {
  /**
   * Specifies the configuration (e.g. physical card art) that the card should be
   * manufactured with, and only applies to cards of type `PHYSICAL`. This must be
   * configured with Lithic before use.
   */
  product_id?: string;

  /**
   * If omitted, the previous shipping address will be used.
   */
  shipping_address?: Shared.ShippingAddress;

  /**
   * Shipping method for the card. Use of options besides `STANDARD` require
   * additional permissions.
   *
   * - `STANDARD` - USPS regular mail or similar international option, with no
   *   tracking
   * - `STANDARD_WITH_TRACKING` - USPS regular mail or similar international option,
   *   with tracking
   * - `EXPEDITED` - FedEx Standard Overnight or similar international option, with
   *   tracking
   */
  shipping_method?: 'STANDARD' | 'STANDARD_WITH_TRACKING' | 'EXPEDITED';
}

export namespace Cards {
  export import Card = API.Card;
  export import EmbedRequestParams = API.EmbedRequestParams;
  export import SpendLimitDuration = API.SpendLimitDuration;
  export import CardEmbedResponse = API.CardEmbedResponse;
  export import CardProvisionResponse = API.CardProvisionResponse;
  export import CardsPage = API.CardsPage;
  export import CardCreateParams = API.CardCreateParams;
  export import CardUpdateParams = API.CardUpdateParams;
  export import CardListParams = API.CardListParams;
  export import CardEmbedParams = API.CardEmbedParams;
  export import CardGetEmbedHTMLParams = API.CardGetEmbedHTMLParams;
  export import CardGetEmbedURLParams = API.CardGetEmbedURLParams;
  export import CardProvisionParams = API.CardProvisionParams;
  export import CardReissueParams = API.CardReissueParams;
}
