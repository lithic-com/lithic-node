// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as Shared from '../shared';
import * as BalancesAPI from './balances';
import { BalanceListParams, Balances } from './balances';
import * as FinancialTransactionsAPI from './financial-transactions';
import {
  FinancialTransactionListParams,
  FinancialTransactionRetrieveParams,
  FinancialTransactions,
} from './financial-transactions';
import { APIPromise } from '../../core/api-promise';
import { CursorPage, type CursorPageParams, PagePromise } from '../../core/pagination';
import { buildHeaders } from '../../internal/headers';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';
import { createHmac } from 'crypto';

export class Cards extends APIResource {
  balances: BalancesAPI.Balances = new BalancesAPI.Balances(this._client);
  financialTransactions: FinancialTransactionsAPI.FinancialTransactions =
    new FinancialTransactionsAPI.FinancialTransactions(this._client);

  /**
   * Create a new virtual or physical card. Parameters `shipping_address` and
   * `product_id` only apply to physical cards.
   *
   * @example
   * ```ts
   * const card = await client.cards.create({
   *   type: 'VIRTUAL',
   *   memo: 'New Card',
   *   spend_limit: 1000,
   *   spend_limit_duration: 'TRANSACTION',
   *   state: 'OPEN',
   * });
   * ```
   */
  create(body: CardCreateParams, options?: RequestOptions): APIPromise<Card> {
    return this._client.post('/v1/cards', { body, ...options });
  }

  /**
   * Get card configuration such as spend limit and state.
   *
   * @example
   * ```ts
   * const card = await client.cards.retrieve(
   *   '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   * );
   * ```
   */
  retrieve(cardToken: string, options?: RequestOptions): APIPromise<Card> {
    return this._client.get(path`/v1/cards/${cardToken}`, options);
  }

  /**
   * Update the specified properties of the card. Unsupplied properties will remain
   * unchanged.
   *
   * _Note: setting a card to a `CLOSED` state is a final action that cannot be
   * undone._
   *
   * @example
   * ```ts
   * const card = await client.cards.update(
   *   '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   *   {
   *     memo: 'Updated Name',
   *     spend_limit: 100,
   *     spend_limit_duration: 'FOREVER',
   *     state: 'OPEN',
   *   },
   * );
   * ```
   */
  update(cardToken: string, body: CardUpdateParams, options?: RequestOptions): APIPromise<Card> {
    return this._client.patch(path`/v1/cards/${cardToken}`, { body, ...options });
  }

  /**
   * List cards.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const nonPCICard of client.cards.list()) {
   *   // ...
   * }
   * ```
   */
  list(
    query: CardListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<NonPCICardsCursorPage, NonPCICard> {
    return this._client.getAPIList('/v1/cards', CursorPage<NonPCICard>, { query, ...options });
  }

  /**
   * Convert a virtual card into a physical card and manufacture it. Customer must
   * supply relevant fields for physical card creation including `product_id`,
   * `carrier`, `shipping_method`, and `shipping_address`. The card token will be
   * unchanged. The card's type will be altered to `PHYSICAL`. The card will be set
   * to state `PENDING_FULFILLMENT` and fulfilled at next fulfillment cycle. Virtual
   * cards created on card programs which do not support physical cards cannot be
   * converted. The card program cannot be changed as part of the conversion. Cards
   * must be in an `OPEN` state to be converted. Only applies to cards of type
   * `VIRTUAL` (or existing cards with deprecated types of `DIGITAL_WALLET` and
   * `UNLOCKED`).
   *
   * @example
   * ```ts
   * const card = await client.cards.convertPhysical(
   *   '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   *   {
   *     shipping_address: {
   *       address1: '5 Broad Street',
   *       address2: 'Unit 5A',
   *       city: 'NEW YORK',
   *       country: 'USA',
   *       first_name: 'Janet',
   *       last_name: 'Yellen',
   *       postal_code: '10001',
   *       state: 'NY',
   *     },
   *     carrier: {
   *       qr_code_url: 'https://lithic.com/activate-card/1',
   *     },
   *     product_id: '100',
   *     shipping_method: 'STANDARD',
   *   },
   * );
   * ```
   */
  convertPhysical(
    cardToken: string,
    body: CardConvertPhysicalParams,
    options?: RequestOptions,
  ): APIPromise<Card> {
    return this._client.post(path`/v1/cards/${cardToken}/convert_physical`, { body, ...options });
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
   * data is displayed to their end-users. The response contains an HTML document
   * (see Embedded Card UI or Changelog for upcoming changes in January). This means
   * that the url for the request can be inserted straight into the `src` attribute
   * of an iframe.
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
   *
   * @example
   * ```ts
   * const response = await client.cards.embed({
   *   embed_request: 'embed_request',
   *   hmac: 'hmac',
   * });
   * ```
   */
  embed(query: CardEmbedParams, options?: RequestOptions): APIPromise<string> {
    return this._client.get('/v1/embed/card', {
      query,
      ...options,
      headers: buildHeaders([{ Accept: 'text/html' }, options?.headers]),
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
  getEmbedHTML(params: CardGetEmbedHTMLParams, options?: RequestOptions): Promise<string> {
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
    return this._client.buildURL('/v1/embed/card', { hmac, embed_request: embedRequest });
  }

  /**
   * Allow your cardholders to directly add payment cards to the device's digital
   * wallet (e.g. Apple Pay) with one touch from your app.
   *
   * This requires some additional setup and configuration. Please
   * [Contact Us](https://lithic.com/contact) or your Customer Success representative
   * for more information.
   *
   * @example
   * ```ts
   * const response = await client.cards.provision(
   *   '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   *   { digital_wallet: 'GOOGLE_PAY' },
   * );
   * ```
   */
  provision(
    cardToken: string,
    body: CardProvisionParams,
    options?: RequestOptions,
  ): APIPromise<CardProvisionResponse> {
    return this._client.post(path`/v1/cards/${cardToken}/provision`, { body, ...options });
  }

  /**
   * Initiate print and shipment of a duplicate physical card (e.g. card is
   * physically damaged). The PAN, expiry, and CVC2 will remain the same and the
   * original card can continue to be used until the new card is activated. Only
   * applies to cards of type `PHYSICAL`. A card can be reissued or renewed a total
   * of 8 times.
   *
   * @example
   * ```ts
   * const card = await client.cards.reissue(
   *   '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   *   {
   *     carrier: {
   *       qr_code_url: 'https://lithic.com/activate-card/1',
   *     },
   *     product_id: '100',
   *     shipping_address: {
   *       address1: '5 Broad Street',
   *       address2: 'Unit 5A',
   *       city: 'NEW YORK',
   *       country: 'USA',
   *       first_name: 'Janet',
   *       last_name: 'Yellen',
   *       postal_code: '10001',
   *       state: 'NY',
   *     },
   *     shipping_method: 'STANDARD',
   *   },
   * );
   * ```
   */
  reissue(cardToken: string, body: CardReissueParams, options?: RequestOptions): APIPromise<Card> {
    return this._client.post(path`/v1/cards/${cardToken}/reissue`, { body, ...options });
  }

  /**
   * Applies to card types `PHYSICAL` and `VIRTUAL`. For `PHYSICAL`, creates a new
   * card with the same card token and PAN, but updated expiry and CVC2 code. The
   * original card will keep working for card-present transactions until the new card
   * is activated. For card-not-present transactions, the original card details
   * (expiry, CVC2) will also keep working until the new card is activated. A
   * `PHYSICAL` card can be reissued or renewed a total of 8 times. For `VIRTUAL`,
   * the card will retain the same card token and PAN and receive an updated expiry
   * and CVC2 code. `product_id`, `shipping_method`, `shipping_address`, `carrier`
   * are only relevant for renewing `PHYSICAL` cards.
   *
   * @example
   * ```ts
   * const card = await client.cards.renew(
   *   '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   *   {
   *     shipping_address: {
   *       address1: '5 Broad Street',
   *       address2: 'Unit 5A',
   *       city: 'NEW YORK',
   *       country: 'USA',
   *       first_name: 'Janet',
   *       last_name: 'Yellen',
   *       postal_code: '10001',
   *       state: 'NY',
   *     },
   *     carrier: {
   *       qr_code_url: 'https://lithic.com/activate-card/1',
   *     },
   *     product_id: '100',
   *     shipping_method: 'STANDARD',
   *   },
   * );
   * ```
   */
  renew(cardToken: string, body: CardRenewParams, options?: RequestOptions): APIPromise<Card> {
    return this._client.post(path`/v1/cards/${cardToken}/renew`, { body, ...options });
  }

  /**
   * Get a Card's available spend limit, which is based on the spend limit configured
   * on the Card and the amount already spent over the spend limit's duration. For
   * example, if the Card has a monthly spend limit of $1000 configured, and has
   * spent $600 in the last month, the available spend limit returned would be $400.
   *
   * @example
   * ```ts
   * const cardSpendLimits =
   *   await client.cards.retrieveSpendLimits(
   *     '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   *   );
   * ```
   */
  retrieveSpendLimits(cardToken: string, options?: RequestOptions): APIPromise<CardSpendLimits> {
    return this._client.get(path`/v1/cards/${cardToken}/spend_limits`, options);
  }

  /**
   * Get card configuration such as spend limit and state. Customers must be PCI
   * compliant to use this endpoint. Please contact
   * [support@lithic.com](mailto:support@lithic.com) for questions. _Note: this is a
   * `POST` endpoint because it is more secure to send sensitive data in a request
   * body than in a URL._
   *
   * @example
   * ```ts
   * const card = await client.cards.searchByPan({
   *   pan: '4111111289144142',
   * });
   * ```
   */
  searchByPan(body: CardSearchByPanParams, options?: RequestOptions): APIPromise<Card> {
    return this._client.post('/v1/cards/search_by_pan', { body, ...options });
  }

  /**
   * Allow your cardholders to directly add payment cards to the device's digital
   * wallet from a browser on the web. Currently only suported for Apple Pay.
   *
   * This requires some additional setup and configuration. Please
   * [Contact Us](https://lithic.com/contact) or your Customer Success representative
   * for more information.
   *
   * @example
   * ```ts
   * const response = await client.cards.webProvision(
   *   '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   *   { digital_wallet: 'APPLE_PAY' },
   * );
   * ```
   */
  webProvision(
    cardToken: string,
    body: CardWebProvisionParams,
    options?: RequestOptions,
  ): APIPromise<CardWebProvisionResponse> {
    return this._client.post(path`/v1/cards/${cardToken}/web_provision`, { body, ...options });
  }
}

export type NonPCICardsCursorPage = CursorPage<NonPCICard>;

/**
 * Card details with potentially PCI sensitive information for Enterprise customers
 */
export interface Card extends NonPCICard {
  /**
   * Three digit cvv printed on the back of the card.
   */
  cvv?: string;

  /**
   * Primary Account Number (PAN) (i.e. the card number). Customers must be PCI
   * compliant to have PAN returned as a field in production. Please contact
   * support@lithic.com for questions.
   */
  pan?: string;
}

export interface CardSpendLimits {
  available_spend_limit: CardSpendLimits.AvailableSpendLimit;

  spend_limit?: CardSpendLimits.SpendLimit;

  spend_velocity?: CardSpendLimits.SpendVelocity;
}

export namespace CardSpendLimits {
  export interface AvailableSpendLimit {
    /**
     * The available spend limit (in cents) relative to the annual limit configured on
     * the Card (e.g. 100000 would be a $1,000 limit).
     */
    annually?: number;

    /**
     * The available spend limit (in cents) relative to the forever limit configured on
     * the Card.
     */
    forever?: number;

    /**
     * The available spend limit (in cents) relative to the monthly limit configured on
     * the Card.
     */
    monthly?: number;
  }

  export interface SpendLimit {
    /**
     * The configured annual spend limit (in cents) on the Card.
     */
    annually?: number;

    /**
     * The configured forever spend limit (in cents) on the Card.
     */
    forever?: number;

    /**
     * The configured monthly spend limit (in cents) on the Card.
     */
    monthly?: number;
  }

  export interface SpendVelocity {
    /**
     * Current annual spend velocity (in cents) on the Card. Present if annual spend
     * limit is set.
     */
    annually?: number;

    /**
     * Current forever spend velocity (in cents) on the Card. Present if forever spend
     * limit is set.
     */
    forever?: number;

    /**
     * Current monthly spend velocity (in cents) on the Card. Present if monthly spend
     * limit is set.
     */
    monthly?: number;
  }
}

/**
 * Card details without PCI information
 */
export interface NonPCICard {
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

  /**
   * Deprecated: Funding account for the card.
   */
  funding: NonPCICard.Funding;

  /**
   * Last four digits of the card number.
   */
  last_four: string;

  /**
   * Indicates if a card is blocked due a PIN status issue (e.g. excessive incorrect
   * attempts).
   */
  pin_status: 'OK' | 'BLOCKED' | 'NOT_SET';

  /**
   * Amount (in cents) to limit approved authorizations (e.g. 100000 would be a
   * $1,000 limit). Transaction requests above the spend limit will be declined.
   */
  spend_limit: number;

  /**
   * Spend limit duration
   */
  spend_limit_duration: 'ANNUALLY' | 'FOREVER' | 'MONTHLY' | 'TRANSACTION' | 'DAILY';

  /**
   * Card state values: _ `CLOSED` - Card will no longer approve authorizations.
   * Closing a card cannot be undone. _ `OPEN` - Card will approve authorizations (if
   * they match card and account parameters). _ `PAUSED` - Card will decline
   * authorizations, but can be resumed at a later time. _ `PENDING_FULFILLMENT` -
   * The initial state for cards of type `PHYSICAL`. The card is provisioned pending
   * manufacturing and fulfillment. Cards in this state can accept authorizations for
   * e-commerce purchases, but not for "Card Present" purchases where the physical
   * card itself is present. \* `PENDING_ACTIVATION` - At regular intervals, cards of
   * type `PHYSICAL` in state `PENDING_FULFILLMENT` are sent to the card production
   * warehouse and updated to state `PENDING_ACTIVATION`. Similar to
   * `PENDING_FULFILLMENT`, cards in this state can be used for e-commerce
   * transactions or can be added to mobile wallets. API clients should update the
   * card's state to `OPEN` only after the cardholder confirms receipt of the card.
   * In sandbox, the same daily batch fulfillment occurs, but no cards are actually
   * manufactured.
   */
  state: 'CLOSED' | 'OPEN' | 'PAUSED' | 'PENDING_ACTIVATION' | 'PENDING_FULFILLMENT';

  /**
   * Card types: _ `VIRTUAL` - Card will authorize at any merchant and can be added
   * to a digital wallet like Apple Pay or Google Pay (if the card program is digital
   * wallet-enabled). _ `PHYSICAL` - Manufactured and sent to the cardholder. We
   * offer white label branding, credit, ATM, PIN debit, chip/EMV, NFC and magstripe
   * functionality. _ `SINGLE_USE` - Card is closed upon first successful
   * authorization. _ `MERCHANT_LOCKED` - _[Deprecated]_ Card is locked to the first
   * merchant that successfully authorizes the card. _ `UNLOCKED` - _[Deprecated]_
   * Similar behavior to VIRTUAL cards, please use VIRTUAL instead. _
   * `DIGITAL_WALLET` - _[Deprecated]_ Similar behavior to VIRTUAL cards, please use
   * VIRTUAL instead.
   */
  type: 'MERCHANT_LOCKED' | 'PHYSICAL' | 'SINGLE_USE' | 'VIRTUAL' | 'UNLOCKED' | 'DIGITAL_WALLET';

  /**
   * @deprecated List of identifiers for the Auth Rule(s) that are applied on the
   * card. This field is deprecated and will no longer be populated in the `Card`
   * object. The key will be removed from the schema in a future release. Use the
   * `/auth_rules` endpoints to fetch Auth Rule information instead.
   */
  auth_rule_tokens?: Array<string>;

  /**
   * Globally unique identifier for the bulk order associated with this card. Only
   * applicable to physical cards that are part of a bulk shipment
   */
  bulk_order_token?: string | null;

  /**
   * 3-character alphabetic ISO 4217 code for the currency of the cardholder.
   */
  cardholder_currency?: string;

  /**
   * Additional context or information related to the card.
   */
  comment?: string;

  /**
   * Specifies the digital card art to be displayed in the user's digital wallet
   * after tokenization. This artwork must be approved by Mastercard and configured
   * by Lithic to use.
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
   * Hostname of card's locked merchant (will be empty if not applicable).
   */
  hostname?: string;

  /**
   * Friendly name to identify the card.
   */
  memo?: string;

  /**
   * Globally unique identifier for the card's network program. Null if the card is
   * not associated with a network program. Currently applicable to Visa cards
   * participating in Account Level Management only
   */
  network_program_token?: string | null;

  /**
   * Indicates if there are offline PIN changes pending card interaction with an
   * offline PIN terminal. Possible commands are: CHANGE_PIN, UNBLOCK_PIN. Applicable
   * only to cards issued in markets supporting offline PINs.
   */
  pending_commands?: Array<string>;

  /**
   * Only applicable to cards of type `PHYSICAL`. This must be configured with Lithic
   * before use. Specifies the configuration (i.e., physical card art) that the card
   * should be manufactured with.
   */
  product_id?: string;

  /**
   * If the card is a replacement for another card, the globally unique identifier
   * for the card that was replaced.
   */
  replacement_for?: string | null;

  /**
   * Card state substatus values: _ `LOST` - The physical card is no longer in the
   * cardholder's possession due to being lost or never received by the cardholder. _
   * `COMPROMISED` - Card information has been exposed, potentially leading to
   * unauthorized access. This may involve physical card theft, cloning, or online
   * data breaches. _ `DAMAGED` - The physical card is not functioning properly, such
   * as having chip failures or a demagnetized magnetic stripe. _
   * `END_USER_REQUEST` - The cardholder requested the closure of the card for
   * reasons unrelated to fraud or damage, such as switching to a different product
   * or closing the account. _ `ISSUER_REQUEST` - The issuer closed the card for
   * reasons unrelated to fraud or damage, such as account inactivity, product or
   * policy changes, or technology upgrades. _ `NOT_ACTIVE` - The card hasn’t had any
   * transaction activity for a specified period, applicable to statuses like
   * `PAUSED` or `CLOSED`. _ `SUSPICIOUS_ACTIVITY` - The card has one or more
   * suspicious transactions or activities that require review. This can involve
   * prompting the cardholder to confirm legitimate use or report confirmed fraud. _
   * `INTERNAL_REVIEW` - The card is temporarily paused pending further internal
   * review. _ `EXPIRED` - The card has expired and has been closed without being
   * reissued. _ `UNDELIVERABLE` - The card cannot be delivered to the cardholder and
   * has been returned. \* `OTHER` - The reason for the status does not fall into any
   * of the above categories. A comment can be provided to specify the reason.
   */
  substatus?:
    | 'LOST'
    | 'COMPROMISED'
    | 'DAMAGED'
    | 'END_USER_REQUEST'
    | 'ISSUER_REQUEST'
    | 'NOT_ACTIVE'
    | 'SUSPICIOUS_ACTIVITY'
    | 'INTERNAL_REVIEW'
    | 'EXPIRED'
    | 'UNDELIVERABLE'
    | 'OTHER';
}

export namespace NonPCICard {
  /**
   * Deprecated: Funding account for the card.
   */
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
     * State of funding source. Funding source states: _ `ENABLED` - The funding
     * account is available to use for card creation and transactions. _ `PENDING` -
     * The funding account is still being verified e.g. bank micro-deposits
     * verification. \* `DELETED` - The founding account has been deleted.
     */
    state: 'DELETED' | 'ENABLED' | 'PENDING';

    /**
     * Types of funding source: _ `DEPOSITORY_CHECKING` - Bank checking account. _
     * `DEPOSITORY_SAVINGS` - Bank savings account.
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

/**
 * Object containing the fields required to add a card to Apple Pay. Applies only
 * to Apple Pay wallet.
 */
export interface ProvisionResponse {
  activationData?: string;

  encryptedData?: string;

  ephemeralPublicKey?: string;
}

/**
 * Spend limit duration values:
 *
 * - `ANNUALLY` - Card will authorize transactions up to spend limit for the
 *   trailing year.
 * - `FOREVER` - Card will authorize only up to spend limit for the entire lifetime
 *   of the card.
 * - `MONTHLY` - Card will authorize transactions up to spend limit for the
 *   trailing month. To support recurring monthly payments, which can occur on
 *   different day every month, the time window we consider for monthly velocity
 *   starts 6 days after the current calendar date one month prior.
 * - `TRANSACTION` - Card will authorize multiple transactions if each individual
 *   transaction is under the spend limit.
 */
export type SpendLimitDuration = 'ANNUALLY' | 'FOREVER' | 'MONTHLY' | 'TRANSACTION';

export type CardEmbedResponse = string;

export interface CardProvisionResponse {
  /**
   * Base64 encoded JSON payload representing a payment card that can be passed to a
   * device's digital wallet. Applies to Google and Samsung Pay wallets.
   */
  provisioning_payload?: string | ProvisionResponse;
}

export type CardWebProvisionResponse =
  | CardWebProvisionResponse.AppleWebPushProvisioningResponse
  | CardWebProvisionResponse.GoogleWebPushProvisioningResponse;

export namespace CardWebProvisionResponse {
  export interface AppleWebPushProvisioningResponse {
    /**
     * JWS object required for handoff to Apple's script.
     */
    jws?: AppleWebPushProvisioningResponse.Jws;

    /**
     * A unique identifier for the JWS object.
     */
    state?: string;
  }

  export namespace AppleWebPushProvisioningResponse {
    /**
     * JWS object required for handoff to Apple's script.
     */
    export interface Jws {
      /**
       * JWS unprotected headers containing header parameters that aren't
       * integrity-protected by the JWS signature.
       */
      header?: Jws.Header;

      /**
       * Base64url encoded JSON object containing the provisioning payload.
       */
      payload?: string;

      /**
       * Base64url encoded JWS protected headers containing the header parameters that
       * are integrity-protected by the JWS signature.
       */
      protected?: string;

      /**
       * Base64url encoded signature of the JWS object.
       */
      signature?: string;
    }

    export namespace Jws {
      /**
       * JWS unprotected headers containing header parameters that aren't
       * integrity-protected by the JWS signature.
       */
      export interface Header {
        /**
         * The ID for the JWS Public Key of the key pair used to generate the signature.
         */
        kid?: string;
      }
    }
  }

  export interface GoogleWebPushProvisioningResponse {
    /**
     * A base64 encoded and encrypted payload representing card data for the Google Pay
     * UWPP FPAN flow.
     */
    google_opc?: string;

    /**
     * A base64 encoded and encrypted payload representing card data for the Google Pay
     * UWPP tokenization flow.
     */
    tsp_opc?: string;
  }
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
   * - `UNLOCKED` - _[Deprecated]_ Similar behavior to VIRTUAL cards, please use
   *   VIRTUAL instead.
   * - `DIGITAL_WALLET` - _[Deprecated]_ Similar behavior to VIRTUAL cards, please
   *   use VIRTUAL instead.
   */
  type: 'MERCHANT_LOCKED' | 'PHYSICAL' | 'SINGLE_USE' | 'VIRTUAL' | 'UNLOCKED' | 'DIGITAL_WALLET';

  /**
   * Globally unique identifier for the account that the card will be associated
   * with. Required for programs enrolling users using the
   * [/account_holders endpoint](https://docs.lithic.com/docs/account-holders-kyc).
   * See [Managing Your Program](doc:managing-your-program) for more information.
   */
  account_token?: string;

  /**
   * Globally unique identifier for an existing bulk order to associate this card
   * with. When specified, the card will be added to the bulk order for batch
   * shipment. Only applicable to cards of type PHYSICAL
   */
  bulk_order_token?: string;

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
   * Friendly name to identify the card.
   */
  memo?: string;

  /**
   * Encrypted PIN block (in base64). Applies to cards of type `PHYSICAL` and
   * `VIRTUAL`. See
   * [Encrypted PIN Block](https://docs.lithic.com/docs/cards#encrypted-pin-block).
   */
  pin?: string;

  /**
   * Only applicable to cards of type `PHYSICAL`. This must be configured with Lithic
   * before use. Specifies the configuration (i.e., physical card art) that the card
   * should be manufactured with.
   */
  product_id?: string;

  /**
   * Restricted field limited to select use cases. Lithic will reach out directly if
   * this field should be used. Globally unique identifier for the replacement card's
   * account. If this field is specified, `replacement_for` must also be specified.
   * If `replacement_for` is specified and this field is omitted, the replacement
   * card's account will be inferred from the card being replaced.
   */
  replacement_account_token?: string;

  /**
   * Additional context or information related to the card that this card will
   * replace.
   */
  replacement_comment?: string;

  /**
   * Globally unique identifier for the card that this card will replace. If the card
   * type is `PHYSICAL` it will be replaced by a `PHYSICAL` card. If the card type is
   * `VIRTUAL` it will be replaced by a `VIRTUAL` card.
   */
  replacement_for?: string;

  /**
   * Card state substatus values for the card that this card will replace:
   *
   * - `LOST` - The physical card is no longer in the cardholder's possession due to
   *   being lost or never received by the cardholder.
   * - `COMPROMISED` - Card information has been exposed, potentially leading to
   *   unauthorized access. This may involve physical card theft, cloning, or online
   *   data breaches.
   * - `DAMAGED` - The physical card is not functioning properly, such as having chip
   *   failures or a demagnetized magnetic stripe.
   * - `END_USER_REQUEST` - The cardholder requested the closure of the card for
   *   reasons unrelated to fraud or damage, such as switching to a different product
   *   or closing the account.
   * - `ISSUER_REQUEST` - The issuer closed the card for reasons unrelated to fraud
   *   or damage, such as account inactivity, product or policy changes, or
   *   technology upgrades.
   * - `NOT_ACTIVE` - The card hasn’t had any transaction activity for a specified
   *   period, applicable to statuses like `PAUSED` or `CLOSED`.
   * - `SUSPICIOUS_ACTIVITY` - The card has one or more suspicious transactions or
   *   activities that require review. This can involve prompting the cardholder to
   *   confirm legitimate use or report confirmed fraud.
   * - `INTERNAL_REVIEW` - The card is temporarily paused pending further internal
   *   review.
   * - `EXPIRED` - The card has expired and has been closed without being reissued.
   * - `UNDELIVERABLE` - The card cannot be delivered to the cardholder and has been
   *   returned.
   * - `OTHER` - The reason for the status does not fall into any of the above
   *   categories. A comment should be provided to specify the reason.
   */
  replacement_substatus?:
    | 'LOST'
    | 'COMPROMISED'
    | 'DAMAGED'
    | 'END_USER_REQUEST'
    | 'ISSUER_REQUEST'
    | 'NOT_ACTIVE'
    | 'SUSPICIOUS_ACTIVITY'
    | 'INTERNAL_REVIEW'
    | 'EXPIRED'
    | 'UNDELIVERABLE'
    | 'OTHER';

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
   * - `EXPRESS` - FedEx or UPS depending on card manufacturer, Express, 3-day
   *   shipping, with tracking
   * - `2_DAY` - FedEx or UPS depending on card manufacturer, 2-day shipping, with
   *   tracking
   * - `EXPEDITED` - FedEx or UPS depending on card manufacturer, Standard Overnight
   *   or similar international option, with tracking
   * - `BULK_EXPEDITED` - Bulk shipment with Expedited shipping
   */
  shipping_method?:
    | '2_DAY'
    | 'BULK_EXPEDITED'
    | 'EXPEDITED'
    | 'EXPRESS'
    | 'PRIORITY'
    | 'STANDARD'
    | 'STANDARD_WITH_TRACKING';

  /**
   * Amount (in cents) to limit approved authorizations (e.g. 100000 would be a
   * $1,000 limit). Transaction requests above the spend limit will be declined. Note
   * that a spend limit of 0 is effectively no limit, and should only be used to
   * reset or remove a prior limit. Only a limit of 1 or above will result in
   * declined transactions due to checks against the card limit.
   */
  spend_limit?: number;

  /**
   * Spend limit duration values:
   *
   * - `ANNUALLY` - Card will authorize transactions up to spend limit for the
   *   trailing year.
   * - `FOREVER` - Card will authorize only up to spend limit for the entire lifetime
   *   of the card.
   * - `MONTHLY` - Card will authorize transactions up to spend limit for the
   *   trailing month. To support recurring monthly payments, which can occur on
   *   different day every month, the time window we consider for monthly velocity
   *   starts 6 days after the current calendar date one month prior.
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
   * Additional context or information related to the card.
   */
  comment?: string;

  /**
   * Specifies the digital card art to be displayed in the user’s digital wallet
   * after tokenization. This artwork must be approved by Mastercard and configured
   * by Lithic to use. See
   * [Flexible Card Art Guide](https://docs.lithic.com/docs/about-digital-wallets#flexible-card-art).
   */
  digital_card_art_token?: string;

  /**
   * Friendly name to identify the card.
   */
  memo?: string;

  /**
   * Globally unique identifier for the card's network program. Currently applicable
   * to Visa cards participating in Account Level Management only.
   */
  network_program_token?: string;

  /**
   * Encrypted PIN block (in base64). Only applies to cards of type `PHYSICAL` and
   * `VIRTUAL`. Changing PIN also resets PIN status to `OK`. See
   * [Encrypted PIN Block](https://docs.lithic.com/docs/cards#encrypted-pin-block).
   */
  pin?: string;

  /**
   * Indicates if a card is blocked due a PIN status issue (e.g. excessive incorrect
   * attempts). Can only be set to `OK` to unblock a card.
   */
  pin_status?: 'OK';

  /**
   * Amount (in cents) to limit approved authorizations (e.g. 100000 would be a
   * $1,000 limit). Transaction requests above the spend limit will be declined. Note
   * that a spend limit of 0 is effectively no limit, and should only be used to
   * reset or remove a prior limit. Only a limit of 1 or above will result in
   * declined transactions due to checks against the card limit.
   */
  spend_limit?: number;

  /**
   * Spend limit duration values:
   *
   * - `ANNUALLY` - Card will authorize transactions up to spend limit for the
   *   trailing year.
   * - `FOREVER` - Card will authorize only up to spend limit for the entire lifetime
   *   of the card.
   * - `MONTHLY` - Card will authorize transactions up to spend limit for the
   *   trailing month. To support recurring monthly payments, which can occur on
   *   different day every month, the time window we consider for monthly velocity
   *   starts 6 days after the current calendar date one month prior.
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

  /**
   * Card state substatus values:
   *
   * - `LOST` - The physical card is no longer in the cardholder's possession due to
   *   being lost or never received by the cardholder.
   * - `COMPROMISED` - Card information has been exposed, potentially leading to
   *   unauthorized access. This may involve physical card theft, cloning, or online
   *   data breaches.
   * - `DAMAGED` - The physical card is not functioning properly, such as having chip
   *   failures or a demagnetized magnetic stripe.
   * - `END_USER_REQUEST` - The cardholder requested the closure of the card for
   *   reasons unrelated to fraud or damage, such as switching to a different product
   *   or closing the account.
   * - `ISSUER_REQUEST` - The issuer closed the card for reasons unrelated to fraud
   *   or damage, such as account inactivity, product or policy changes, or
   *   technology upgrades.
   * - `NOT_ACTIVE` - The card hasn’t had any transaction activity for a specified
   *   period, applicable to statuses like `PAUSED` or `CLOSED`.
   * - `SUSPICIOUS_ACTIVITY` - The card has one or more suspicious transactions or
   *   activities that require review. This can involve prompting the cardholder to
   *   confirm legitimate use or report confirmed fraud.
   * - `INTERNAL_REVIEW` - The card is temporarily paused pending further internal
   *   review.
   * - `EXPIRED` - The card has expired and has been closed without being reissued.
   * - `UNDELIVERABLE` - The card cannot be delivered to the cardholder and has been
   *   returned.
   * - `OTHER` - The reason for the status does not fall into any of the above
   *   categories. A comment should be provided to specify the reason.
   */
  substatus?:
    | 'LOST'
    | 'COMPROMISED'
    | 'DAMAGED'
    | 'END_USER_REQUEST'
    | 'ISSUER_REQUEST'
    | 'NOT_ACTIVE'
    | 'SUSPICIOUS_ACTIVITY'
    | 'INTERNAL_REVIEW'
    | 'EXPIRED'
    | 'UNDELIVERABLE'
    | 'OTHER';
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
   * Returns cards containing the specified partial or full memo text.
   */
  memo?: string;

  /**
   * Returns cards with the specified state.
   */
  state?: 'CLOSED' | 'OPEN' | 'PAUSED' | 'PENDING_ACTIVATION' | 'PENDING_FULFILLMENT';
}

export interface CardConvertPhysicalParams {
  /**
   * The shipping address this card will be sent to.
   */
  shipping_address: Shared.ShippingAddress;

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
   * Shipping method for the card. Only applies to cards of type PHYSICAL. Use of
   * options besides `STANDARD` require additional permissions.
   *
   * - `STANDARD` - USPS regular mail or similar international option, with no
   *   tracking
   * - `STANDARD_WITH_TRACKING` - USPS regular mail or similar international option,
   *   with tracking
   * - `PRIORITY` - USPS Priority, 1-3 day shipping, with tracking
   * - `EXPRESS` - FedEx or UPS depending on card manufacturer, Express, 3-day
   *   shipping, with tracking
   * - `2_DAY` - FedEx or UPS depending on card manufacturer, 2-day shipping, with
   *   tracking
   * - `EXPEDITED` - FedEx or UPS depending on card manufacturer, Standard Overnight
   *   or similar international option, with tracking
   * - `BULK_EXPEDITED` - Bulk shipment with Expedited shipping
   */
  shipping_method?:
    | '2_DAY'
    | 'BULK_EXPEDITED'
    | 'EXPEDITED'
    | 'EXPRESS'
    | 'PRIORITY'
    | 'STANDARD'
    | 'STANDARD_WITH_TRACKING';
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
   * Only applicable if `digital_wallet` is `GOOGLE_PAY` or `SAMSUNG_PAY` and the
   * card is on the Visa network. Stable device identification set by the wallet
   * provider.
   */
  client_device_id?: string;

  /**
   * Only applicable if `digital_wallet` is `GOOGLE_PAY` or `SAMSUNG_PAY` and the
   * card is on the Visa network. Consumer ID that identifies the wallet account
   * holder entity.
   */
  client_wallet_account_id?: string;

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
   * Shipping method for the card. Only applies to cards of type PHYSICAL. Use of
   * options besides `STANDARD` require additional permissions.
   *
   * - `STANDARD` - USPS regular mail or similar international option, with no
   *   tracking
   * - `STANDARD_WITH_TRACKING` - USPS regular mail or similar international option,
   *   with tracking
   * - `PRIORITY` - USPS Priority, 1-3 day shipping, with tracking
   * - `EXPRESS` - FedEx or UPS depending on card manufacturer, Express, 3-day
   *   shipping, with tracking
   * - `2_DAY` - FedEx or UPS depending on card manufacturer, 2-day shipping, with
   *   tracking
   * - `EXPEDITED` - FedEx or UPS depending on card manufacturer, Standard Overnight
   *   or similar international option, with tracking
   * - `BULK_EXPEDITED` - Bulk shipment with Expedited shipping
   */
  shipping_method?:
    | '2_DAY'
    | 'BULK_EXPEDITED'
    | 'EXPEDITED'
    | 'EXPRESS'
    | 'PRIORITY'
    | 'STANDARD'
    | 'STANDARD_WITH_TRACKING';
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
   * Shipping method for the card. Only applies to cards of type PHYSICAL. Use of
   * options besides `STANDARD` require additional permissions.
   *
   * - `STANDARD` - USPS regular mail or similar international option, with no
   *   tracking
   * - `STANDARD_WITH_TRACKING` - USPS regular mail or similar international option,
   *   with tracking
   * - `PRIORITY` - USPS Priority, 1-3 day shipping, with tracking
   * - `EXPRESS` - FedEx or UPS depending on card manufacturer, Express, 3-day
   *   shipping, with tracking
   * - `2_DAY` - FedEx or UPS depending on card manufacturer, 2-day shipping, with
   *   tracking
   * - `EXPEDITED` - FedEx or UPS depending on card manufacturer, Standard Overnight
   *   or similar international option, with tracking
   * - `BULK_EXPEDITED` - Bulk shipment with Expedited shipping
   */
  shipping_method?:
    | '2_DAY'
    | 'BULK_EXPEDITED'
    | 'EXPEDITED'
    | 'EXPRESS'
    | 'PRIORITY'
    | 'STANDARD'
    | 'STANDARD_WITH_TRACKING';
}

export interface CardSearchByPanParams {
  /**
   * The PAN for the card being retrieved.
   */
  pan: string;
}

export interface CardWebProvisionParams {
  /**
   * Only applicable if `digital_wallet` is GOOGLE_PAY. Google Pay Web Push
   * Provisioning device identifier required for the tokenization flow
   */
  client_device_id?: string;

  /**
   * Only applicable if `digital_wallet` is GOOGLE_PAY. Google Pay Web Push
   * Provisioning wallet account identifier required for the tokenization flow
   */
  client_wallet_account_id?: string;

  /**
   * Name of digital wallet provider.
   */
  digital_wallet?: 'APPLE_PAY' | 'GOOGLE_PAY';

  /**
   * Only applicable if `digital_wallet` is GOOGLE_PAY. Google Pay Web Push
   * Provisioning session identifier required for the FPAN flow.
   */
  server_session_id?: string;
}

Cards.Balances = Balances;
Cards.FinancialTransactions = FinancialTransactions;

export declare namespace Cards {
  export {
    type Card as Card,
    type CardSpendLimits as CardSpendLimits,
    type NonPCICard as NonPCICard,
    type ProvisionResponse as ProvisionResponse,
    type SpendLimitDuration as SpendLimitDuration,
    type CardEmbedResponse as CardEmbedResponse,
    type CardProvisionResponse as CardProvisionResponse,
    type CardWebProvisionResponse as CardWebProvisionResponse,
    type NonPCICardsCursorPage as NonPCICardsCursorPage,
    type CardCreateParams as CardCreateParams,
    type CardUpdateParams as CardUpdateParams,
    type CardListParams as CardListParams,
    type CardConvertPhysicalParams as CardConvertPhysicalParams,
    type CardEmbedParams as CardEmbedParams,
    type CardGetEmbedHTMLParams,
    type CardGetEmbedURLParams,
    type CardProvisionParams as CardProvisionParams,
    type CardReissueParams as CardReissueParams,
    type CardRenewParams as CardRenewParams,
    type CardSearchByPanParams as CardSearchByPanParams,
    type CardWebProvisionParams as CardWebProvisionParams,
  };

  export { Balances as Balances, type BalanceListParams as BalanceListParams };

  export {
    FinancialTransactions as FinancialTransactions,
    type FinancialTransactionRetrieveParams as FinancialTransactionRetrieveParams,
    type FinancialTransactionListParams as FinancialTransactionListParams,
  };
}
