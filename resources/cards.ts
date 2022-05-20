// File generated from our OpenAPI spec by Stainless.

import * as Core from '../core';
import { isRequestOptions } from '../core';
import * as Shared from './shared';
import * as FundingSources from './funding-sources';

export class Cards extends Core.APIResource {
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
  retrieve(id: string, options?: Core.RequestOptions): Promise<Core.APIResponse<Card>> {
    return this.get(`/cards/${id}`, options);
  }

  /**
   * Update the specified properties of the card. Unsupplied properties will remain
   * unchanged. `pin` parameter only applies to physical cards.
   *
   * _Note: setting a card to a `CLOSED` state is a final action that cannot be
   * undone._
   */
  update(id: string, body: CardUpdateParams, options?: Core.RequestOptions): Promise<Core.APIResponse<Card>> {
    return this.patch(`/cards/${id}`, { body, ...options });
  }

  /**
   * List cards.
   */
  list(query?: CardListParams, options?: Core.RequestOptions): Core.APIListPromise<Card>;
  list(options?: Core.RequestOptions): Core.APIListPromise<Card>;
  list(
    query?: CardListParams | Core.RequestOptions | null | undefined,
    options?: Core.RequestOptions,
  ): Core.APIListPromise<Card> {
    if (isRequestOptions(query)) {
      options = query;
      query = null;
    }

    return this.getAPIList('/cards', { query, ...options });
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
  embed(query?: CardEmbedParams, options?: Core.RequestOptions): Promise<string>;
  embed(options?: Core.RequestOptions): Promise<string>;
  embed(
    query?: CardEmbedParams | Core.RequestOptions | null | undefined,
    options?: Core.RequestOptions,
  ): Promise<string> {
    if (isRequestOptions(query)) {
      options = query;
      query = null;
    }

    return this.get('/embed/card', {
      query,
      ...options,
      headers: { Accept: 'text/html', ...options?.headers },
    });
  }

  /**
   * Allow your cardholders to directly add payment cards to the device's digital
   * wallet (e.g. Apple Pay) with one touch from your app.
   *
   * This requires some additional setup and configuration. Reach out at
   * [lithic.com/contact](https://lithic.com/contact) or your account rep for more
   * information.
   */
  provision(
    id: string,
    body: CardProvisionParams,
    options?: Core.RequestOptions,
  ): Promise<Core.APIResponse<CardProvisionResponse>> {
    return this.post(`/cards/${id}/provision`, { body, ...options });
  }

  /**
   * Initiate print and shipment of a duplicate card.
   *
   * Only applies to cards of type `PHYSICAL` [beta].
   */
  reissue(
    id: string,
    body: CardReissueParams,
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

  funding: FundingSources.FundingSource;

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
   * - `TRANSACTION` - Card will authorizate multiple transactions if each individual
   *   transaction is under the spend limit.
   */
  spend_limit_duration: 'ANNUALLY' | 'FOREVER' | 'MONTHLY' | 'TRANSACTION';

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
   * Globally unique identifier.
   */
  token: string;

  /**
   * Card types:
   *
   * - `DIGITAL_WALLET` - Cards that can be provisioned to a digital wallet like
   *   Google Pay or Apple Wallet.
   * - `MERCHANT_LOCKED` - Card is locked to first merchant that successfully
   *   authorizes the card.
   * - `PHYSICAL` - Manufactured and sent to the cardholder. We offer white label
   *   branding, credit, ATM, PIN debit, chip/EMV, NFC and magstripe functionality.
   *   Reach out at [lithic.com/contact](https://lithic.com/contact) for more
   *   information.
   * - `SINGLE_USE` - Card will close shortly after the first transaction.
   * - `UNLOCKED` - Card will authorize at any merchant. Creating these cards
   *   requires additional privileges.
   */
  type: 'DIGITAL_WALLET' | 'MERCHANT_LOCKED' | 'PHYSICAL' | 'SINGLE_USE' | 'UNLOCKED';

  /**
   * List of identifiers for the Auth Rule(s) that are applied on the card.
   */
  auth_rule_tokens?: Array<string>;

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
   * Primary Account Number (PAN) (i.e. the card number). Customers must be PCI
   * compliant to have PAN returned as a field in production. Please contact
   * [support@lithic.com](mailto:support@lithic.com) for questions.
   */
  pan?: string;
}

export interface CardProvisionResponse {
  provisioning_payload?: string;
}

export interface CardCreateParams {
  /**
   * Card types:
   *
   * - `DIGITAL_WALLET` - Cards that can be provisioned to a digital wallet like
   *   Google Pay or Apple Wallet.
   * - `MERCHANT_LOCKED` - Card is locked to first merchant that successfully
   *   authorizes the card.
   * - `PHYSICAL` - Manufactured and sent to the cardholder. We offer white label
   *   branding, credit, ATM, PIN debit, chip/EMV, NFC and magstripe functionality.
   *   Reach out at [lithic.com/contact](https://lithic.com/contact) for more
   *   information.
   * - `SINGLE_USE` - Card will close shortly after the first transaction.
   * - `UNLOCKED` - Card will authorize at any merchant. Creating these cards
   *   requires additional privileges.
   */
  type: 'DIGITAL_WALLET' | 'MERCHANT_LOCKED' | 'PHYSICAL' | 'SINGLE_USE' | 'UNLOCKED';

  /**
   * Only required for multi-account users. Token identifying the account the card
   * will be associated with. Only applicable if using account enrollment. See
   * [Managing Accounts](https://docs.lithic.com/docs/managing-accounts) for more
   * information.
   */
  account_token?: string;

  /**
   * Identifies the card program under which to create the card. Different card
   * programs may have their own configurations (e.g., digital wallet card art, BIN
   * type). This must be configured with Lithic before use.
   */
  card_program_token?: string;

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
   * The token for the desired `FundingAccount` to use when making transactions with
   * this card.
   */
  funding_token?: string;

  /**
   * Friendly name to identify the card.
   */
  memo?: string;

  /**
   * Encrypted PIN block (in base64). Only applies to cards of type `PHYSICAL`
   * [beta], `UNLOCKED`, and `DIGITAL_WALLET`. See
   * [Encrypted PIN Block](https://docs.lithic.com/docs/cards#encrypted-pin-block-enterprise).
   */
  pin?: string;

  /**
   * Specifies the configuration (e.g., physical card art) that the card should be
   * manufactured with, and only applies to cards of type `PHYSICAL` [beta]. This
   * must be configured with Lithic before use.
   */
  product_id?: string;

  shipping_address?: Shared.ShippingAddress;

  /**
   * Shipping method for the card. Only applies to cards of type PHYSICAL [beta]. Use
   * of options besides `STANDARD` require additional permissions.
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
   * the spend limit will be declined.
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
   * - `TRANSACTION` - Card will authorizate multiple transactions if each individual
   *   transaction is under the spend limit.
   */
  spend_limit_duration?: 'ANNUALLY' | 'FOREVER' | 'MONTHLY' | 'TRANSACTION';

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
   * Only required for multi-account users. Token identifying the account the card
   * will be associated with. Only applicable if using account enrollment. See
   * [Managing Accounts](https://docs.lithic.com/docs/managing-accounts) for more
   * information.
   */
  account_token?: string;

  /**
   * Identifier for any Auth Rules that will be applied to transactions taking place
   * with the card.
   */
  auth_rule_token?: string;

  /**
   * The token for the desired `FundingAccount` to use when making transactions with
   * this card.
   */
  funding_token?: string;

  /**
   * Friendly name to identify the card.
   */
  memo?: string;

  /**
   * Encrypted PIN block (in base64). Only applies to cards of type `PHYSICAL`
   * [beta], `UNLOCKED`, and `DIGITAL_WALLET`. See
   * [Encrypted PIN Block](https://docs.lithic.com/docs/cards#encrypted-pin-block-enterprise).
   */
  pin?: string;

  /**
   * Amount (in cents) to limit approved authorizations. Transaction requests above
   * the spend limit will be declined.
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
   * - `TRANSACTION` - Card will authorizate multiple transactions if each individual
   *   transaction is under the spend limit.
   */
  spend_limit_duration?: 'ANNUALLY' | 'FOREVER' | 'MONTHLY' | 'TRANSACTION';

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

export interface CardListParams {
  /**
   * Only required for multi-account users. Returns cards associated with this
   * account. Only applicable if using account enrollment. See
   * [Managing Accounts](https://docs.lithic.com/docs/managing-accounts) for more
   * information.
   */
  account_token?: string;

  /**
   * Date string in 8601 format. Only entries created after the specified date will
   * be included. UTC time zone.
   */
  begin?: string;

  /**
   * Date string in 8601 format. Only entries created before the specified date will
   * be included. UTC time zone.
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
   * Only required for multi-account users. Token identifying the account the card
   * will be associated with. Only applicable if using account enrollment. See
   * [Managing Accounts](https://docs.lithic.com/docs/managing-accounts) for more
   * information.
   */
  account_token?: string;

  /**
   * Required for `APPLE_PAY`. Apple's public leaf certificate. Base64 encoded in PEM
   * format with headers `(-----BEGIN CERTIFICATE-----)` and trailers omitted.
   * Provided by the device's wallet.
   */
  certificate?: string;

  /**
   * Currently `APPLE_PAY` and `SAMSUNG_PAY` are supported (`GOOGLE_PAY` coming
   * soon).
   */
  digital_wallet?: 'APPLE_PAY' | 'GOOGLE_PAY' | 'SAMSUNG_PAY';

  /**
   * Required for `APPLE_PAY`. Base64 cryptographic nonce provided by the device's
   * wallet.
   */
  nonce?: string;

  /**
   * Required for `APPLE_PAY`. Base64 cryptographic nonce provided by the device's
   * wallet.
   */
  nonce_signature?: string;
}

export interface CardReissueParams {
  /**
   * Specifies the configuration (e.g. physical card art) that the card should be
   * manufactured with, and only applies to cards of type `PHYSICAL` [beta]. This
   * must be configured with Lithic before use.
   */
  product_id?: string;

  /**
   * If omitted, the previous shipping address will be used.
   */
  shipping_address?: Shared.ShippingAddress;
}
