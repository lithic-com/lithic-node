// File generated from our OpenAPI spec by Stainless.

import * as Core from 'lithic/core';
import { APIResource } from 'lithic/resource';
import { isRequestOptions } from 'lithic/core';
import * as EventsAPI from 'lithic/resources/events/events';
import * as SubscriptionsAPI from 'lithic/resources/events/subscriptions';
import { CursorPage, type CursorPageParams } from 'lithic/pagination';

export class Events extends APIResource {
  subscriptions: SubscriptionsAPI.Subscriptions = new SubscriptionsAPI.Subscriptions(this.client);

  /**
   * Get an event.
   */
  retrieve(eventToken: string, options?: Core.RequestOptions): Core.APIPromise<Event> {
    return this.get(`/events/${eventToken}`, options);
  }

  /**
   * List all events.
   */
  list(query?: EventListParams, options?: Core.RequestOptions): Core.PagePromise<EventsCursorPage, Event>;
  list(options?: Core.RequestOptions): Core.PagePromise<EventsCursorPage, Event>;
  list(
    query: EventListParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.PagePromise<EventsCursorPage, Event> {
    if (isRequestOptions(query)) {
      return this.list({}, query);
    }
    return this.getAPIList('/events', EventsCursorPage, { query, ...options });
  }

  /**
   * List all the message attempts for a given event.
   */
  listAttempts(
    eventToken: string,
    query?: EventListAttemptsParams,
    options?: Core.RequestOptions,
  ): Core.PagePromise<MessageAttemptsCursorPage, MessageAttempt>;
  listAttempts(
    eventToken: string,
    options?: Core.RequestOptions,
  ): Core.PagePromise<MessageAttemptsCursorPage, MessageAttempt>;
  listAttempts(
    eventToken: string,
    query: EventListAttemptsParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.PagePromise<MessageAttemptsCursorPage, MessageAttempt> {
    if (isRequestOptions(query)) {
      return this.listAttempts(eventToken, {}, query);
    }
    return this.getAPIList(`/events/${eventToken}/attempts`, MessageAttemptsCursorPage, {
      query,
      ...options,
    });
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

export class MessageAttemptsCursorPage extends CursorPage<MessageAttempt> {}

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
   * - `account_holder.created` - Notification that a new account holder has been
   *   created and was not rejected.
   * - `account_holder.updated` - Notification that an account holder was updated.
   * - `account_holder.verification` - Notification than an account holder's identity
   *   verification is complete.
   * - `card.created` - Notification that a card has been created.
   * - `card.shipped` - Physical card shipment notification. See
   *   https://docs.lithic.com/docs/cards#physical-card-shipped-webhook.
   * - `card_transaction.updated` - Transaction Lifecycle webhook. See
   *   https://docs.lithic.com/docs/transaction-webhooks.
   * - `dispute.updated` - A dispute has been updated.
   * - `digital_wallet.tokenization_approval_request` - Card network's request to
   *   Lithic to activate a digital wallet token.
   * - `digital_wallet.tokenization_result` - Notification of the end result of a
   *   tokenization, whether successful or failed.
   * - `digital_wallet.tokenization_two_factor_authentication_code` - A code to be
   *   passed to an end user to complete digital wallet authentication. See
   *   https://docs.lithic.com/docs/tokenization-control#digital-wallet-tokenization-auth-code.
   */
  event_type:
    | 'account_holder.created'
    | 'account_holder.updated'
    | 'account_holder.verification'
    | 'card.created'
    | 'card.shipped'
    | 'card_transaction.updated'
    | 'digital_wallet.tokenization_approval_request'
    | 'digital_wallet.tokenization_result'
    | 'digital_wallet.tokenization_two_factor_authentication_code'
    | 'dispute.updated'
    | 'dispute_evidence.upload_failed'
    | 'three_ds_authentication.created'
    | 'payment_transaction.created'
    | 'payment_transaction.updated'
    | 'transfer_transaction.created';

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
    | 'account_holder.created'
    | 'account_holder.updated'
    | 'account_holder.verification'
    | 'card.created'
    | 'card.shipped'
    | 'card_transaction.updated'
    | 'digital_wallet.tokenization_approval_request'
    | 'digital_wallet.tokenization_result'
    | 'digital_wallet.tokenization_two_factor_authentication_code'
    | 'dispute.updated'
    | 'dispute_evidence.upload_failed'
    | 'three_ds_authentication.created'
    | 'payment_transaction.created'
    | 'payment_transaction.updated'
    | 'transfer_transaction.created'
  > | null;

  url: string;
}

/**
 * A subscription to specific event types.
 */
export interface MessageAttempt {
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
   * Globally unique identifier.
   */
  event_subscription_token: string;

  /**
   * Globally unique identifier.
   */
  event_token: string;

  /**
   * The response body from the event subscription's URL.
   */
  response: string;

  /**
   * The response status code from the event subscription's URL.
   */
  response_status_code: number;

  /**
   * The status of the event attempt.
   */
  status: 'FAILED' | 'PENDING' | 'SENDING' | 'SUCCESS';

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
    | 'account_holder.created'
    | 'account_holder.updated'
    | 'account_holder.verification'
    | 'card.created'
    | 'card.shipped'
    | 'card_transaction.updated'
    | 'digital_wallet.tokenization_approval_request'
    | 'digital_wallet.tokenization_result'
    | 'digital_wallet.tokenization_two_factor_authentication_code'
    | 'dispute.updated'
    | 'dispute_evidence.upload_failed'
    | 'three_ds_authentication.created'
    | 'payment_transaction.created'
    | 'payment_transaction.updated'
    | 'transfer_transaction.created'
  >;

  /**
   * Whether to include the event payload content in the response.
   */
  with_content?: boolean;
}

export interface EventListAttemptsParams extends CursorPageParams {
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

  status?: 'FAILED' | 'PENDING' | 'SENDING' | 'SUCCESS';
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
  export import Event = EventsAPI.Event;
  export import EventSubscription = EventsAPI.EventSubscription;
  export import MessageAttempt = EventsAPI.MessageAttempt;
  export import EventsCursorPage = EventsAPI.EventsCursorPage;
  export import MessageAttemptsCursorPage = EventsAPI.MessageAttemptsCursorPage;
  export import EventListParams = EventsAPI.EventListParams;
  export import EventListAttemptsParams = EventsAPI.EventListAttemptsParams;
  export import EventResendParams = EventsAPI.EventResendParams;
  export import Subscriptions = SubscriptionsAPI.Subscriptions;
  export import SubscriptionRetrieveSecretResponse = SubscriptionsAPI.SubscriptionRetrieveSecretResponse;
  export import SubscriptionCreateParams = SubscriptionsAPI.SubscriptionCreateParams;
  export import SubscriptionUpdateParams = SubscriptionsAPI.SubscriptionUpdateParams;
  export import SubscriptionListParams = SubscriptionsAPI.SubscriptionListParams;
  export import SubscriptionListAttemptsParams = SubscriptionsAPI.SubscriptionListAttemptsParams;
  export import SubscriptionRecoverParams = SubscriptionsAPI.SubscriptionRecoverParams;
  export import SubscriptionReplayMissingParams = SubscriptionsAPI.SubscriptionReplayMissingParams;
  export import SubscriptionSendSimulatedExampleParams = SubscriptionsAPI.SubscriptionSendSimulatedExampleParams;
}
