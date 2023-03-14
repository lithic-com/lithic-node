// File generated from our OpenAPI spec by Stainless.

import * as Core from '~/core';
import { APIResource } from '~/resource';
import { isRequestOptions } from '~/core';
import * as Events from '~/resources/events';
import { CursorPage, CursorPageParams } from '~/pagination';

export class Subscriptions extends APIResource {
  /**
   * Create a new event subscription.
   */
  create(
    body: SubscriptionCreateParams,
    options?: Core.RequestOptions,
  ): Promise<Core.APIResponse<Events.EventSubscription>> {
    return this.post('/event_subscriptions', { body, ...options });
  }

  /**
   * Get an event subscription.
   */
  retrieve(
    eventSubscriptionToken: string,
    options?: Core.RequestOptions,
  ): Promise<Core.APIResponse<Events.EventSubscription>> {
    return this.get(`/event_subscriptions/${eventSubscriptionToken}`, options);
  }

  /**
   * Update an event subscription.
   */
  update(
    eventSubscriptionToken: string,
    body: SubscriptionUpdateParams,
    options?: Core.RequestOptions,
  ): Promise<Core.APIResponse<Events.EventSubscription>> {
    return this.patch(`/event_subscriptions/${eventSubscriptionToken}`, { body, ...options });
  }

  /**
   * List all the event subscriptions.
   */
  list(
    query?: SubscriptionListParams,
    options?: Core.RequestOptions,
  ): Core.PagePromise<EventSubscriptionsCursorPage>;
  list(options?: Core.RequestOptions): Core.PagePromise<EventSubscriptionsCursorPage>;
  list(
    query: SubscriptionListParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.PagePromise<EventSubscriptionsCursorPage> {
    if (isRequestOptions(query)) {
      return this.list({}, query);
    }

    return this.getAPIList('/event_subscriptions', EventSubscriptionsCursorPage, { query, ...options });
  }

  /**
   * Delete an event subscription.
   */
  del(
    eventSubscriptionToken: string,
    options?: Core.RequestOptions,
  ): Promise<Core.APIResponse<Promise<void>>> {
    return this.delete(`/event_subscriptions/${eventSubscriptionToken}`, options);
  }

  /**
   * Resend all failed messages since a given time.
   */
  recover(
    eventSubscriptionToken: string,
    options?: Core.RequestOptions,
  ): Promise<Core.APIResponse<Promise<void>>> {
    return this.post(`/event_subscriptions/${eventSubscriptionToken}/recover`, options);
  }

  /**
   * Replays messages to the endpoint. Only messages that were created after `begin`
   * will be sent. Messages that were previously sent to the endpoint are not resent.
   */
  replayMissing(
    eventSubscriptionToken: string,
    options?: Core.RequestOptions,
  ): Promise<Core.APIResponse<Promise<void>>> {
    return this.post(`/event_subscriptions/${eventSubscriptionToken}/replay_missing`, options);
  }

  /**
   * Get the secret for an event subscription.
   */
  retrieveSecret(
    eventSubscriptionToken: string,
    options?: Core.RequestOptions,
  ): Promise<Core.APIResponse<SubscriptionRetrieveSecretResponse>> {
    return this.get(`/event_subscriptions/${eventSubscriptionToken}/secret`, options);
  }

  /**
   * Rotate the secret for an event subscription. The previous secret will be valid
   * for the next 24 hours.
   */
  rotateSecret(
    eventSubscriptionToken: string,
    options?: Core.RequestOptions,
  ): Promise<Core.APIResponse<Promise<void>>> {
    return this.post(`/event_subscriptions/${eventSubscriptionToken}/secret/rotate`, options);
  }
}

export class EventSubscriptionsCursorPage extends CursorPage<Events.EventSubscription> {}

export interface SubscriptionRetrieveSecretResponse {
  key?: string;
}

export interface SubscriptionCreateParams {
  /**
   * URL to which event webhooks will be sent. URL must be a valid HTTPS address.
   */
  url: string;

  /**
   * Event subscription description.
   */
  description?: string;

  /**
   * Whether the event subscription is active (false) or inactive (true).
   */
  disabled?: boolean;

  /**
   * Indicates types of events that will be sent to this subscription. If left blank,
   * all types will be sent.
   */
  event_types?: Array<'dispute.updated' | 'digital_wallet.token_approval_request'>;
}

export interface SubscriptionUpdateParams {
  /**
   * URL to which event webhooks will be sent. URL must be a valid HTTPS address.
   */
  url: string;

  /**
   * Event subscription description.
   */
  description?: string;

  /**
   * Whether the event subscription is active (false) or inactive (true).
   */
  disabled?: boolean;

  /**
   * Indicates types of events that will be sent to this subscription. If left blank,
   * all types will be sent.
   */
  event_types?: Array<'dispute.updated' | 'digital_wallet.token_approval_request'>;
}

export interface SubscriptionListParams extends CursorPageParams {}
