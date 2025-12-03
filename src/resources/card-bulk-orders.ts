// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { CursorPage, type CursorPageParams, PagePromise } from '../core/pagination';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class CardBulkOrders extends APIResource {
  /**
   * Create a new bulk order for physical card shipments **[BETA]**. Cards can be
   * added to the order via the POST /v1/cards endpoint by specifying the
   * bulk_order_token. Lock the order via PATCH
   * /v1/card_bulk_orders/{bulk_order_token} to prepare for shipment. Please work
   * with your Customer Success Manager and card personalization bureau to ensure
   * bulk shipping is supported for your program.
   *
   * @example
   * ```ts
   * const cardBulkOrder = await client.cardBulkOrders.create({
   *   customer_product_id: 'custom-card-design-123',
   *   shipping_address: {
   *     address1: '123 Main Street',
   *     city: 'NEW YORK',
   *     country: 'USA',
   *     first_name: 'Johnny',
   *     last_name: 'Appleseed',
   *     postal_code: '10001',
   *     state: 'NY',
   *   },
   *   shipping_method: 'BULK_EXPEDITED',
   * });
   * ```
   */
  create(body: CardBulkOrderCreateParams, options?: RequestOptions): APIPromise<CardBulkOrder> {
    return this._client.post('/v1/card_bulk_orders', { body, ...options });
  }

  /**
   * Retrieve a specific bulk order by token **[BETA]**
   *
   * @example
   * ```ts
   * const cardBulkOrder = await client.cardBulkOrders.retrieve(
   *   '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   * );
   * ```
   */
  retrieve(bulkOrderToken: string, options?: RequestOptions): APIPromise<CardBulkOrder> {
    return this._client.get(path`/v1/card_bulk_orders/${bulkOrderToken}`, options);
  }

  /**
   * Update a bulk order **[BETA]**. Primarily used to lock the order, preventing
   * additional cards from being added
   *
   * @example
   * ```ts
   * const cardBulkOrder = await client.cardBulkOrders.update(
   *   '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   *   { status: 'LOCKED' },
   * );
   * ```
   */
  update(
    bulkOrderToken: string,
    body: CardBulkOrderUpdateParams,
    options?: RequestOptions,
  ): APIPromise<CardBulkOrder> {
    return this._client.patch(path`/v1/card_bulk_orders/${bulkOrderToken}`, { body, ...options });
  }

  /**
   * List bulk orders for physical card shipments **[BETA]**
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const cardBulkOrder of client.cardBulkOrders.list()) {
   *   // ...
   * }
   * ```
   */
  list(
    query: CardBulkOrderListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<CardBulkOrdersCursorPage, CardBulkOrder> {
    return this._client.getAPIList('/v1/card_bulk_orders', CursorPage<CardBulkOrder>, { query, ...options });
  }
}

export type CardBulkOrdersCursorPage = CursorPage<CardBulkOrder>;

/**
 * Represents a bulk order for physical card shipments
 */
export interface CardBulkOrder {
  /**
   * Globally unique identifier for the bulk order
   */
  token: string;

  /**
   * List of card tokens associated with this bulk order
   */
  card_tokens: Array<string>;

  /**
   * An RFC 3339 timestamp for when the bulk order was created. UTC time zone
   */
  created: string;

  /**
   * Customer-specified product configuration for physical card manufacturing. This
   * must be configured with Lithic before use
   */
  customer_product_id: string | null;

  /**
   * Shipping address for all cards in this bulk order
   */
  shipping_address: unknown;

  /**
   * Shipping method for all cards in this bulk order
   */
  shipping_method: 'BULK_EXPEDITED';

  /**
   * Status of the bulk order. OPEN indicates the order is accepting cards. LOCKED
   * indicates the order is finalized and no more cards can be added
   */
  status: 'OPEN' | 'LOCKED';

  /**
   * An RFC 3339 timestamp for when the bulk order was last updated. UTC time zone
   */
  updated: string;
}

export interface CardBulkOrderCreateParams {
  /**
   * Customer-specified product configuration for physical card manufacturing. This
   * must be configured with Lithic before use
   */
  customer_product_id: string;

  /**
   * Shipping address for all cards in this bulk order
   */
  shipping_address: unknown;

  /**
   * Shipping method for all cards in this bulk order
   */
  shipping_method: 'BULK_EXPEDITED';
}

export interface CardBulkOrderUpdateParams {
  /**
   * Status to update the bulk order to. Use LOCKED to finalize the order
   */
  status: 'LOCKED';
}

export interface CardBulkOrderListParams extends CursorPageParams {
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
}

export declare namespace CardBulkOrders {
  export {
    type CardBulkOrder as CardBulkOrder,
    type CardBulkOrdersCursorPage as CardBulkOrdersCursorPage,
    type CardBulkOrderCreateParams as CardBulkOrderCreateParams,
    type CardBulkOrderUpdateParams as CardBulkOrderUpdateParams,
    type CardBulkOrderListParams as CardBulkOrderListParams,
  };
}
