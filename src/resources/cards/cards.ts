// File generated from our OpenAPI spec by Stainless.

import * as Core from 'lithic/core';
import { APIResource } from 'lithic/resource';
import { isRequestOptions } from 'lithic/core';
import { createHmac } from 'crypto';
import * as CardsAPI from 'lithic/resources/cards/cards';
import * as Shared from 'lithic/resources/shared';
import * as AggregateBalancesAPI from 'lithic/resources/cards/aggregate-balances';
import * as BalancesAPI from 'lithic/resources/cards/balances';
import * as FinancialTransactionsAPI from 'lithic/resources/cards/financial-transactions';
import { CursorPage, type CursorPageParams } from 'lithic/pagination';

export class Cards extends APIResource {
  aggregateBalances: AggregateBalancesAPI.AggregateBalances = new AggregateBalancesAPI.AggregateBalances(
    this._client,
  );
  balances: BalancesAPI.Balances = new BalancesAPI.Balances(this._client);
  financialTransactions: FinancialTransactionsAPI.FinancialTransactions =
    new FinancialTransactionsAPI.FinancialTransactions(this._client);

  /**
   * Create a new virtual or physical card. Parameters `pin`, `shipping_address`, and
   * `product_id` only apply to physical cards.
   */
  create(body: CardCreateParams, options?: Core.RequestOptions): Core.APIPromise<Card> {
    return this._client.post('/cards', { body, ...options });
  }

  /**
   * Get card configuration such as spend limit and state.
   */
  retrieve(cardToken: string, options?: Core.RequestOptions): Core.APIPromise<Card> {
    return this._client.get(`/cards/${cardToken}`, options);
  }

  /**
   * Update the specified properties of the card. Unsupplied properties will remain
   * unchanged. `pin` parameter only applies to physical cards.
   *
   * _Note: setting a card to a `CLOSED` state is a final action that cannot be
   * undone._
   */
  update(cardToken: string, body: CardUpdateParams, options?: Core.RequestOptions): Core.APIPromise<Card> {
    return this._client.patch(`/cards/${cardToken}`, { body, ...options });
  }

  /**
   * List cards.
   */
  list(query?: CardListParams, options?: Core.RequestOptions): Core.PagePromise<CardsCursorPage, Card>;
  list(options?: Core.RequestOptions): Core.PagePromise<CardsCursorPage, Card>;
  list(
    query: CardListParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.PagePromise<CardsCursorPage, Card> {
    if (isRequestOptions(query)) {
      return this.list({}, query);
    }
    return this._client.getAPIList('/cards', CardsCursorPage, { query, ...options });
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
  embed(query: CardEmbedParams, options?: Core.RequestOptions): Core.APIPromise<string> {
    return this._client.get('/embed/card', {
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
  getEmbedHTML(params: CardGetEmbedHTMLParams, options?: Core.RequestOptions): Promise<string> {
    return this._client.get(this.getEmbedURL(params), {
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
  getEmbedURL(params: CardGetEmbedURLParams): string {
    // Default expiration of 1 minute from now.
    if (!params.expiration) {
      const date = new Date();
      date.setMinutes(date.getMinutes() + 1);
      params.expiration = date.toISOString();
    }

    const serialized = JSON.stringify(params);
    const hmac = createHmac('sha256', this._client.apiKey!).update(serialized).digest('base64');
    const embedRequest = Buffer.from(serialized).toString('base64');
    return this._client.buildURL('/embed/card', { hmac, embed_request: embedRequest });
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
  ): Core.APIPromise<CardProvisionResponse> {
    return this._client.post(`/cards/${cardToken}/provision`, { body, ...options });
  }

  /**
   * Initiate print and shipment of a duplicate physical card.
   *
   * Only applies to cards of type `PHYSICAL`.
   */
  reissue(cardToken: string, body: CardReissueParams, options?: Core.RequestOptions): Core.APIPromise<Card> {
    return this._client.post(`/cards/${cardToken}/reissue`, { body, ...options });
  }

  /**
   * Initiate print and shipment of a renewed physical card.
   *
   * Only applies to cards of type `PHYSICAL`.
   */
  renew(cardToken: string, body: CardRenewParams, options?: Core.RequestOptions): Core.APIPromise<Card> {
    return this._client.post(`/cards/${cardToken}/renew`, { body, ...options });
  }

  /**
   * Get a Card's available spend limit, which is based on the spend limit configured
   * on the Card and the amount already spent over the spend limit's duration. For
   * example, if the Card has a monthly spend limit of $1000 configured, and has
   * spent $600 in the last month, the available spend limit returned would be $400.
   */
  retrieveSpendLimits(cardToken: string, options?: Core.RequestOptions): Core.APIPromise<CardSpendLimits> {
    return this._client.get(`/cards/${cardToken}/spend_limits`, options);
  }

  /**
   * Get card configuration such as spend limit and state. Customers must be PCI
   * compliant to use this endpoint. Please contact
   * [support@lithic.com](mailto:support@lithic.com) for questions. _Note: this is a
   * `POST` endpoint because it is more secure to send sensitive data in a request
   * body than in a URL._
   */
  searchByPan(body: CardSearchByPanParams, options?: Core.RequestOptions): Core.APIPromise<Card> {
    return this._client.post('/cards/search_by_pan', { body, ...options });
  }
}

export class CardsCursorPage extends CursorPage<Card> {}

export interface Card {
  /**
   * Globally unique identifier.
   */
  token: string;

  /**
   * Globally unique identifier for the account to which the card belongs.
   */
  account_token: string;

  /**
   * Globally unique identifier for the card program on which the card exists.
   */
  card_program_token: string;

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
  type: 'MERCHANT_LOCKED' | 'PHYSICAL' | 'SINGLE_USE' | 'VIRTUAL';

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
    state: 'DELETED' | 'ENABLED' | 'PENDING';

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

export interface CardSpendLimits {
  available_spend_limit: CardSpendLimits.AvailableSpendLimit;
}

export namespace CardSpendLimits {
  export interface AvailableSpendLimit {
    /**
     * The available spend limit relative to the annual limit configured on the Card.
     */
    annually?: number;

    /**
     * The available spend limit relative to the forever limit configured on the Card.
     */
    forever?: number;

    /**
     * The available spend limit relative to the monthly limit configured on the Card.
     */
    monthly?: number;
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
  type: 'MERCHANT_LOCKED' | 'PHYSICAL' | 'SINGLE_USE' | 'VIRTUAL';

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

  carrier?: Shared.Carrier;

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

  /**
   * Only applicable to cards of type `PHYSICAL`. Globally unique identifier for the
   * card that this physical card will replace.
   */
  replacement_for?: string;

  shipping_address?: Shared.ShippingAddress;

  /**
   * Shipping method for the card. Only applies to cards of type PHYSICAL. Use of
   * options besides `STANDARD` require additional permissions.
   *
   * - `STANDARD` - USPS regular mail or similar international option, with no
   *   tracking
   * - `STANDARD_WITH_TRACKING` - USPS regular mail or similar international option,
   *   with tracking
   * - `PRIORITY` - USPS Priority, 1-3 day shipping, with tracking
   * - `EXPRESS` - FedEx Express, 3-day shipping, with tracking
   * - `2_DAY` - FedEx 2-day shipping, with tracking
   * - `EXPEDITED` - FedEx Standard Overnight or similar international option, with
   *   tracking
   */
  shipping_method?: '2_DAY' | 'EXPEDITED' | 'EXPRESS' | 'PRIORITY' | 'STANDARD' | 'STANDARD_WITH_TRACKING';

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

export interface CardListParams extends CursorPageParams {
  /**
   * Returns cards associated with the specified account.
   */
  account_token?: string;

  /**
   * Date string in RFC 3339 format. Only entries created after the specified time
   * will be included. UTC time zone.
   */
  begin?: string;

  /**
   * Date string in RFC 3339 format. Only entries created before the specified time
   * will be included. UTC time zone.
   */
  end?: string;

  /**
   * Returns cards with the specified state.
   */
  state?: 'CLOSED' | 'OPEN' | 'PAUSED' | 'PENDING_ACTIVATION' | 'PENDING_FULFILLMENT';
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
   * If omitted, the previous carrier will be used.
   */
  carrier?: Shared.Carrier;

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
   * - `PRIORITY` - USPS Priority, 1-3 day shipping, with tracking
   * - `EXPRESS` - FedEx Express, 3-day shipping, with tracking
   * - `2_DAY` - FedEx 2-day shipping, with tracking
   * - `EXPEDITED` - FedEx Standard Overnight or similar international option, with
   *   tracking
   */
  shipping_method?: '2-DAY' | 'EXPEDITED' | 'EXPRESS' | 'PRIORITY' | 'STANDARD' | 'STANDARD_WITH_TRACKING';
}

export interface CardRenewParams {
  /**
   * The shipping address this card will be sent to.
   */
  shipping_address: Shared.ShippingAddress;

  /**
   * If omitted, the previous carrier will be used.
   */
  carrier?: Shared.Carrier;

  /**
   * Two digit (MM) expiry month. If neither `exp_month` nor `exp_year` is provided,
   * an expiration date six years in the future will be generated.
   */
  exp_month?: string;

  /**
   * Four digit (yyyy) expiry year. If neither `exp_month` nor `exp_year` is
   * provided, an expiration date six years in the future will be generated.
   */
  exp_year?: string;

  /**
   * Specifies the configuration (e.g. physical card art) that the card should be
   * manufactured with, and only applies to cards of type `PHYSICAL`. This must be
   * configured with Lithic before use.
   */
  product_id?: string;

  /**
   * Shipping method for the card. Use of options besides `STANDARD` require
   * additional permissions.
   *
   * - `STANDARD` - USPS regular mail or similar international option, with no
   *   tracking
   * - `STANDARD_WITH_TRACKING` - USPS regular mail or similar international option,
   *   with tracking
   * - `PRIORITY` - USPS Priority, 1-3 day shipping, with tracking
   * - `EXPRESS` - FedEx Express, 3-day shipping, with tracking
   * - `2_DAY` - FedEx 2-day shipping, with tracking
   * - `EXPEDITED` - FedEx Standard Overnight or similar international option, with
   *   tracking
   */
  shipping_method?: '2-DAY' | 'EXPEDITED' | 'EXPRESS' | 'PRIORITY' | 'STANDARD' | 'STANDARD_WITH_TRACKING';
}

export interface CardSearchByPanParams {
  /**
   * The PAN for the card being retrieved.
   */
  pan: string;
}

export namespace Cards {
  export import Card = CardsAPI.Card;
  export import CardSpendLimits = CardsAPI.CardSpendLimits;
  export import EmbedRequestParams = CardsAPI.EmbedRequestParams;
  export import SpendLimitDuration = CardsAPI.SpendLimitDuration;
  export import CardEmbedResponse = CardsAPI.CardEmbedResponse;
  export import CardProvisionResponse = CardsAPI.CardProvisionResponse;
  export import CardsCursorPage = CardsAPI.CardsCursorPage;
  export import CardCreateParams = CardsAPI.CardCreateParams;
  export import CardUpdateParams = CardsAPI.CardUpdateParams;
  export import CardListParams = CardsAPI.CardListParams;
  export import CardEmbedParams = CardsAPI.CardEmbedParams;
  export import CardGetEmbedHTMLParams = CardsAPI.CardGetEmbedHTMLParams;
  export import CardGetEmbedURLParams = CardsAPI.CardGetEmbedURLParams;
  export import CardProvisionParams = CardsAPI.CardProvisionParams;
  export import CardReissueParams = CardsAPI.CardReissueParams;
  export import CardRenewParams = CardsAPI.CardRenewParams;
  export import CardSearchByPanParams = CardsAPI.CardSearchByPanParams;
  export import AggregateBalances = AggregateBalancesAPI.AggregateBalances;
  export import AggregateBalanceListResponse = AggregateBalancesAPI.AggregateBalanceListResponse;
  export import AggregateBalanceListResponsesSinglePage = AggregateBalancesAPI.AggregateBalanceListResponsesSinglePage;
  export import AggregateBalanceListParams = AggregateBalancesAPI.AggregateBalanceListParams;
  export import Balances = BalancesAPI.Balances;
  export import BalanceListParams = BalancesAPI.BalanceListParams;
  export import FinancialTransactions = FinancialTransactionsAPI.FinancialTransactions;
  export import FinancialTransactionListParams = FinancialTransactionsAPI.FinancialTransactionListParams;
}
