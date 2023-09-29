// File generated from our OpenAPI spec by Stainless.

import * as Core from 'lithic/core';
import { APIResource } from 'lithic/resource';
import { isRequestOptions } from 'lithic/core';
import * as Events from 'lithic/resources/events/index';
import { EventSubscriptionsCursorPage } from 'lithic/resources/events/index';
import { MessageAttemptsCursorPage } from 'lithic/resources/events/index';
import * as API from './index';
import { CursorPageParams } from 'lithic/pagination';

export class Subscriptions extends APIResource {
  /**
   * Create a new event subscription.
   */
  create(
    body: SubscriptionCreateParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<Events.EventSubscription> {
    return this.post('/event_subscriptions', { body, ...options });
  }

  /**
   * Get an event subscription.
   */
  retrieve(
    eventSubscriptionToken: string,
    options?: Core.RequestOptions,
  ): Core.APIPromise<Events.EventSubscription> {
    return this.get(`/event_subscriptions/${eventSubscriptionToken}`, options);
  }

  /**
   * Update an event subscription.
   */
  update(
    eventSubscriptionToken: string,
    body: SubscriptionUpdateParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<Events.EventSubscription> {
    return this.patch(`/event_subscriptions/${eventSubscriptionToken}`, { body, ...options });
  }

  /**
   * List all the event subscriptions.
   */
  list(
    query?: SubscriptionListParams,
    options?: Core.RequestOptions,
  ): Core.PagePromise<EventSubscriptionsCursorPage, Events.EventSubscription>;
  list(
    options?: Core.RequestOptions,
  ): Core.PagePromise<EventSubscriptionsCursorPage, Events.EventSubscription>;
  list(
    query: SubscriptionListParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.PagePromise<EventSubscriptionsCursorPage, Events.EventSubscription> {
    if (isRequestOptions(query)) {
      return this.list({}, query);
    }
    return this.getAPIList('/event_subscriptions', EventSubscriptionsCursorPage, { query, ...options });
  }

  /**
   * Delete an event subscription.
   */
  del(eventSubscriptionToken: string, options?: Core.RequestOptions): Core.APIPromise<void> {
    return this.delete(`/event_subscriptions/${eventSubscriptionToken}`, options);
  }

  /**
   * List all the message attempts for a given event subscription.
   */
  listAttempts(
    eventSubscriptionToken: string,
    query?: SubscriptionListAttemptsParams,
    options?: Core.RequestOptions,
  ): Core.PagePromise<MessageAttemptsCursorPage, Events.MessageAttempt>;
  listAttempts(
    eventSubscriptionToken: string,
    options?: Core.RequestOptions,
  ): Core.PagePromise<MessageAttemptsCursorPage, Events.MessageAttempt>;
  listAttempts(
    eventSubscriptionToken: string,
    query: SubscriptionListAttemptsParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.PagePromise<MessageAttemptsCursorPage, Events.MessageAttempt> {
    if (isRequestOptions(query)) {
      return this.listAttempts(eventSubscriptionToken, {}, query);
    }
    return this.getAPIList(
      `/event_subscriptions/${eventSubscriptionToken}/attempts`,
      MessageAttemptsCursorPage,
      { query, ...options },
    );
  }

  /**
   * Resend all failed messages since a given time.
   */
  recover(
    eventSubscriptionToken: string,
    params?: SubscriptionRecoverParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<void>;
  recover(eventSubscriptionToken: string, options?: Core.RequestOptions): Core.APIPromise<void>;
  recover(
    eventSubscriptionToken: string,
    params: SubscriptionRecoverParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.APIPromise<void> {
    if (isRequestOptions(params)) {
      return this.recover(eventSubscriptionToken, {}, params);
    }
    const { begin, end } = params;
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
    params?: SubscriptionReplayMissingParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<void>;
  replayMissing(eventSubscriptionToken: string, options?: Core.RequestOptions): Core.APIPromise<void>;
  replayMissing(
    eventSubscriptionToken: string,
    params: SubscriptionReplayMissingParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.APIPromise<void> {
    if (isRequestOptions(params)) {
      return this.replayMissing(eventSubscriptionToken, {}, params);
    }
    const { begin, end } = params;
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
  ): Core.APIPromise<SubscriptionRetrieveSecretResponse> {
    return this.get(`/event_subscriptions/${eventSubscriptionToken}/secret`, options);
  }

  /**
   * Rotate the secret for an event subscription. The previous secret will be valid
   * for the next 24 hours.
   */
  rotateSecret(eventSubscriptionToken: string, options?: Core.RequestOptions): Core.APIPromise<void> {
    return this.post(`/event_subscriptions/${eventSubscriptionToken}/secret/rotate`, options);
  }

  /**
   * Send an example message for event.
   */
  sendSimulatedExample(
    eventSubscriptionToken: string,
    body?: SubscriptionSendSimulatedExampleParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<void>;
  sendSimulatedExample(eventSubscriptionToken: string, options?: Core.RequestOptions): Core.APIPromise<void>;
  sendSimulatedExample(
    eventSubscriptionToken: string,
    body: SubscriptionSendSimulatedExampleParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.APIPromise<void> {
    if (isRequestOptions(body)) {
      return this.sendSimulatedExample(eventSubscriptionToken, {}, body);
    }
    return this.post(`/simulate/event_subscriptions/${eventSubscriptionToken}/send_example`, {
      body,
      ...options,
    });
  }
}

export interface SubscriptionRetrieveSecretResponse {
  /**
   * The secret for the event subscription.
   */
  secret?: string;
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
}

export interface SubscriptionListParams extends CursorPageParams {}

export interface SubscriptionListAttemptsParams extends CursorPageParams {
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

export interface SubscriptionSendSimulatedExampleParams {
  /**
   * Event type to send example message for.
   */
  event_type?:
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
}

export namespace Subscriptions {
  export import SubscriptionRetrieveSecretResponse = API.SubscriptionRetrieveSecretResponse;
  export import SubscriptionCreateParams = API.SubscriptionCreateParams;
  export import SubscriptionUpdateParams = API.SubscriptionUpdateParams;
  export import SubscriptionListParams = API.SubscriptionListParams;
  export import SubscriptionListAttemptsParams = API.SubscriptionListAttemptsParams;
  export import SubscriptionRecoverParams = API.SubscriptionRecoverParams;
  export import SubscriptionReplayMissingParams = API.SubscriptionReplayMissingParams;
  export import SubscriptionSendSimulatedExampleParams = API.SubscriptionSendSimulatedExampleParams;
}

export { EventSubscriptionsCursorPage, MessageAttemptsCursorPage };
