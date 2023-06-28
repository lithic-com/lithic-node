// File generated from our OpenAPI spec by Stainless.

import * as Core from '~/core';
import { APIResource } from '~/resource';
import { isRequestOptions } from '~/core';
import { Subscriptions } from './subscriptions';
import * as API from './';
import { CursorPage, CursorPageParams } from '~/pagination';

export class Events extends APIResource {
  subscriptions: Subscriptions = new Subscriptions(this.client);

  /**
   * Get an event.
   */
  retrieve(eventToken: string, options?: Core.RequestOptions): Promise<Core.APIResponse<Event>> {
    return this.get(`/events/${eventToken}`, options);
  }

  /**
   * List all events.
   */
  list(query?: EventListParams, options?: Core.RequestOptions): Core.PagePromise<EventsCursorPage>;
  list(options?: Core.RequestOptions): Core.PagePromise<EventsCursorPage>;
  list(
    query: EventListParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.PagePromise<EventsCursorPage> {
    if (isRequestOptions(query)) {
      return this.list({}, query);
    }
    return this.getAPIList('/events', EventsCursorPage, { query, ...options });
  }

  /**
   * Resend an event to an event subscription.
   */
  resend(
    eventToken: string,
    params: { eventSubscriptionToken: string },
    options?: Core.RequestOptions,
  ): Promise<void> {
    return this.post(
      `/events/${eventToken}/event_subscriptions/${params.eventSubscriptionToken}/resend`,
      options,
    );
  }
}

export class EventsCursorPage extends CursorPage<Event> {}

export class EventSubscriptionsCursorPage extends CursorPage<EventSubscription> {}

/**
 * A single event that affects the transaction state and lifecycle.
 */
export interface Event {
  /**
   * Globally unique identifier.
   */
  token: string;

  /**
   * An RFC 3339 timestamp for when the event was created. UTC time zone.
   *
   * If no timezone is specified, UTC will be used.
   */
  created: string;

  /**
   * Event types:
   *
   * - `card.created` - Notification that a card has been created.
   * - `card.shipped` - Physical card shipment notification. See
   *   https://docs.lithic.com/docs/cards#physical-card-shipped-webhook.
   * - `card_transaction.updated` - Transaction Lifecycle webhook. See
   *   https://docs.lithic.com/docs/transaction-webhooks.
   * - `dispute.updated` - A dispute has been updated.
   * - `digital_wallet.tokenization_approval_request` - Card network's request to
   *   Lithic to activate a digital wallet token.
   * - `digital_wallet.tokenization_two_factor_authentication_code` - A code to be
   *   passed to an end user to complete digital wallet authentication. See
   *   https://docs.lithic.com/docs/tokenization-control#digital-wallet-tokenization-auth-code.
   */
  event_type:
    | 'card.created'
    | 'card.shipped'
    | 'card_transaction.updated'
    | 'digital_wallet.tokenization_approval_request'
    | 'digital_wallet.tokenization_two_factor_authentication_code'
    | 'dispute.updated';

  payload: Record<string, unknown>;
}

/**
 * A subscription to specific event types.
 */
export interface EventSubscription {
  /**
   * Globally unique identifier.
   */
  token: string;

  /**
   * A description of the subscription.
   */
  description: string;

  /**
   * Whether the subscription is disabled.
   */
  disabled: boolean;

  event_types: Array<
    | 'card.created'
    | 'card.shipped'
    | 'card_transaction.updated'
    | 'digital_wallet.tokenization_approval_request'
    | 'digital_wallet.tokenization_two_factor_authentication_code'
    | 'dispute.updated'
  > | null;

  url: string;
}

export interface EventListParams extends CursorPageParams {
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

  /**
   * Event types to filter events by.
   */
  event_types?: Array<
    | 'card.created'
    | 'card.shipped'
    | 'card_transaction.updated'
    | 'digital_wallet.tokenization_approval_request'
    | 'digital_wallet.tokenization_two_factor_authentication_code'
    | 'dispute.updated'
  >;
}

export interface EventResendParams {
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

export namespace Events {
  export import Event = API.Event;
  export import EventSubscription = API.EventSubscription;
  export import EventsCursorPage = API.EventsCursorPage;
  export import EventListParams = API.EventListParams;
  export import EventResendParams = API.EventResendParams;

  export import Subscriptions = API.Subscriptions;
  export import SubscriptionRetrieveSecretResponse = API.SubscriptionRetrieveSecretResponse;
  export import SubscriptionCreateParams = API.SubscriptionCreateParams;
  export import SubscriptionUpdateParams = API.SubscriptionUpdateParams;
  export import SubscriptionListParams = API.SubscriptionListParams;
  export import SubscriptionRecoverParams = API.SubscriptionRecoverParams;
  export import SubscriptionReplayMissingParams = API.SubscriptionReplayMissingParams;
}
