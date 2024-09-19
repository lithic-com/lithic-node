// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../resource';
import { isRequestOptions } from '../../core';
import * as Core from '../../core';
import * as EventsAPI from './events';
import * as SubscriptionsAPI from './subscriptions';
import { CursorPage, type CursorPageParams } from '../../pagination';

export class Events extends APIResource {
  subscriptions: SubscriptionsAPI.Subscriptions = new SubscriptionsAPI.Subscriptions(this._client);

  /**
   * Get an event.
   */
  retrieve(eventToken: string, options?: Core.RequestOptions): Core.APIPromise<Event> {
    return this._client.get(`/v1/events/${eventToken}`, options);
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
    return this._client.getAPIList('/v1/events', EventsCursorPage, { query, ...options });
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
    return this._client.getAPIList(`/v1/events/${eventToken}/attempts`, MessageAttemptsCursorPage, {
      query,
      ...options,
    });
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
   * - `card.renewed` - Notification that a card has been renewed.
   * - `card.reissued` - Notification that a card has been reissued.
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
   * - `digital_wallet.tokenization_two_factor_authentication_code_sent` -
   *   Notification that a two factor authentication code for activating a digital
   *   wallet has been sent to the end user.
   * - `digital_wallet.tokenization_updated` - Notification that a digital wallet
   *   tokenization's status has changed.
   */
  event_type:
    | 'account_holder.created'
    | 'account_holder.updated'
    | 'account_holder.verification'
    | 'auth_rules.performance_report.created'
    | 'balance.updated'
    | 'book_transfer_transaction.created'
    | 'card.created'
    | 'card.renewed'
    | 'card.reissued'
    | 'card.shipped'
    | 'card_transaction.updated'
    | 'digital_wallet.tokenization_approval_request'
    | 'digital_wallet.tokenization_result'
    | 'digital_wallet.tokenization_two_factor_authentication_code'
    | 'digital_wallet.tokenization_two_factor_authentication_code_sent'
    | 'digital_wallet.tokenization_updated'
    | 'dispute.updated'
    | 'dispute_evidence.upload_failed'
    | 'external_bank_account.created'
    | 'external_bank_account.updated'
    | 'external_payment.created'
    | 'external_payment.updated'
    | 'financial_account.created'
    | 'financial_account.updated'
    | 'payment_transaction.created'
    | 'payment_transaction.updated'
    | 'settlement_report.updated'
    | 'statements.created'
    | 'three_ds_authentication.created'
    | 'transfer_transaction.created'
    | 'tokenization.approval_request'
    | 'tokenization.result'
    | 'tokenization.two_factor_authentication_code'
    | 'tokenization.two_factor_authentication_code_sent'
    | 'tokenization.updated';

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

  url: string;

  event_types?: Array<
    | 'account_holder.created'
    | 'account_holder.updated'
    | 'account_holder.verification'
    | 'auth_rules.performance_report.created'
    | 'balance.updated'
    | 'book_transfer_transaction.created'
    | 'card.created'
    | 'card.renewed'
    | 'card.reissued'
    | 'card.shipped'
    | 'card_transaction.updated'
    | 'digital_wallet.tokenization_approval_request'
    | 'digital_wallet.tokenization_result'
    | 'digital_wallet.tokenization_two_factor_authentication_code'
    | 'digital_wallet.tokenization_two_factor_authentication_code_sent'
    | 'digital_wallet.tokenization_updated'
    | 'dispute.updated'
    | 'dispute_evidence.upload_failed'
    | 'external_bank_account.created'
    | 'external_bank_account.updated'
    | 'external_payment.created'
    | 'external_payment.updated'
    | 'financial_account.created'
    | 'financial_account.updated'
    | 'payment_transaction.created'
    | 'payment_transaction.updated'
    | 'settlement_report.updated'
    | 'statements.created'
    | 'three_ds_authentication.created'
    | 'transfer_transaction.created'
    | 'tokenization.approval_request'
    | 'tokenization.result'
    | 'tokenization.two_factor_authentication_code'
    | 'tokenization.two_factor_authentication_code_sent'
    | 'tokenization.updated'
  > | null;
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
   * Event types to filter events by.
   */
  event_types?: Array<
    | 'account_holder.created'
    | 'account_holder.updated'
    | 'account_holder.verification'
    | 'auth_rules.performance_report.created'
    | 'balance.updated'
    | 'book_transfer_transaction.created'
    | 'card.created'
    | 'card.renewed'
    | 'card.reissued'
    | 'card.shipped'
    | 'card_transaction.updated'
    | 'digital_wallet.tokenization_approval_request'
    | 'digital_wallet.tokenization_result'
    | 'digital_wallet.tokenization_two_factor_authentication_code'
    | 'digital_wallet.tokenization_two_factor_authentication_code_sent'
    | 'digital_wallet.tokenization_updated'
    | 'dispute.updated'
    | 'dispute_evidence.upload_failed'
    | 'external_bank_account.created'
    | 'external_bank_account.updated'
    | 'external_payment.created'
    | 'external_payment.updated'
    | 'financial_account.created'
    | 'financial_account.updated'
    | 'payment_transaction.created'
    | 'payment_transaction.updated'
    | 'settlement_report.updated'
    | 'statements.created'
    | 'three_ds_authentication.created'
    | 'transfer_transaction.created'
    | 'tokenization.approval_request'
    | 'tokenization.result'
    | 'tokenization.two_factor_authentication_code'
    | 'tokenization.two_factor_authentication_code_sent'
    | 'tokenization.updated'
  >;

  /**
   * Whether to include the event payload content in the response.
   */
  with_content?: boolean;
}

export interface EventListAttemptsParams extends CursorPageParams {
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

  status?: 'FAILED' | 'PENDING' | 'SENDING' | 'SUCCESS';
}

export namespace Events {
  export import Event = EventsAPI.Event;
  export import EventSubscription = EventsAPI.EventSubscription;
  export import MessageAttempt = EventsAPI.MessageAttempt;
  export import EventsCursorPage = EventsAPI.EventsCursorPage;
  export import MessageAttemptsCursorPage = EventsAPI.MessageAttemptsCursorPage;
  export import EventListParams = EventsAPI.EventListParams;
  export import EventListAttemptsParams = EventsAPI.EventListAttemptsParams;
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
