// File generated from our OpenAPI spec by Stainless.

import * as Core from '~/core';
import { APIResource } from '~/resource';
import { isRequestOptions } from '~/core';
import * as Events from '~/resources/events';
import { EventSubscriptionsCursorPage } from '~/resources/events';
import * as API from './';
import { CursorPageParams } from '~/pagination';

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
  del(eventSubscriptionToken: string, options?: Core.RequestOptions): Promise<Core.APIResponse<void>> {
    return this.delete(`/event_subscriptions/${eventSubscriptionToken}`, options);
  }

  /**
   * Resend all failed messages since a given time.
   */
  recover(
    eventSubscriptionToken: string,
    body?: SubscriptionRecoverParams,
    options?: Core.RequestOptions,
  ): Promise<Core.APIResponse<void>>;
  recover(eventSubscriptionToken: string, options?: Core.RequestOptions): Promise<Core.APIResponse<void>>;
  recover(
    eventSubscriptionToken: string,
    body: SubscriptionRecoverParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Promise<Core.APIResponse<void>> {
    if (isRequestOptions(body)) {
      return this.recover(eventSubscriptionToken, {}, body);
    }
    const { begin, end } = body;
    return this.post(`/event_subscriptions/${eventSubscriptionToken}/recover`, {
      query: { begin, end },
      ...options,
    });
  }

  /**
   * Replays messages to the endpoint. Only messages that were created after `begin`
   * will be sent. Messages that were previously sent to the endpoint are not resent.
   */
  replayMissing(
    eventSubscriptionToken: string,
    body?: SubscriptionReplayMissingParams,
    options?: Core.RequestOptions,
  ): Promise<Core.APIResponse<void>>;
  replayMissing(
    eventSubscriptionToken: string,
    options?: Core.RequestOptions,
  ): Promise<Core.APIResponse<void>>;
  replayMissing(
    eventSubscriptionToken: string,
    body: SubscriptionReplayMissingParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Promise<Core.APIResponse<void>> {
    if (isRequestOptions(body)) {
      return this.replayMissing(eventSubscriptionToken, {}, body);
    }
    const { begin, end } = body;
    return this.post(`/event_subscriptions/${eventSubscriptionToken}/replay_missing`, {
      query: { begin, end },
      ...options,
    });
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
  ): Promise<Core.APIResponse<void>> {
    return this.post(`/event_subscriptions/${eventSubscriptionToken}/secret/rotate`, options);
  }
}

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
  event_types?: Array<
    | 'card.created'
    | 'card.shipped'
    | 'card_transaction.updated'
    | 'digital_wallet.tokenization_approval_request'
    | 'digital_wallet.tokenization_two_factor_authentication_code'
    | 'dispute.updated'
  >;
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
  event_types?: Array<
    | 'card.created'
    | 'card.shipped'
    | 'card_transaction.updated'
    | 'digital_wallet.tokenization_approval_request'
    | 'digital_wallet.tokenization_two_factor_authentication_code'
    | 'dispute.updated'
  >;
}

export interface SubscriptionListParams extends CursorPageParams {}

export interface SubscriptionRecoverParams {
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

export interface SubscriptionReplayMissingParams {
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

export namespace Subscriptions {
  export import SubscriptionRetrieveSecretResponse = API.SubscriptionRetrieveSecretResponse;
  export import SubscriptionCreateParams = API.SubscriptionCreateParams;
  export import SubscriptionUpdateParams = API.SubscriptionUpdateParams;
  export import SubscriptionListParams = API.SubscriptionListParams;
  export import SubscriptionRecoverParams = API.SubscriptionRecoverParams;
  export import SubscriptionReplayMissingParams = API.SubscriptionReplayMissingParams;
}

export { EventSubscriptionsCursorPage };
