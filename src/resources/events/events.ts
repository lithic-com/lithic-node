// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as EventSubscriptionsAPI from './event-subscriptions';
import { EventSubscriptionResendParams, EventSubscriptions } from './event-subscriptions';
import * as SubscriptionsAPI from './subscriptions';
import {
  SubscriptionCreateParams,
  SubscriptionListAttemptsParams,
  SubscriptionListParams,
  SubscriptionRecoverParams,
  SubscriptionReplayMissingParams,
  SubscriptionRetrieveSecretResponse,
  SubscriptionSendSimulatedExampleParams,
  SubscriptionUpdateParams,
  Subscriptions,
} from './subscriptions';
import { APIPromise } from '../../core/api-promise';
import { CursorPage, type CursorPageParams, PagePromise } from '../../core/pagination';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Events extends APIResource {
  subscriptions: SubscriptionsAPI.Subscriptions = new SubscriptionsAPI.Subscriptions(this._client);
  eventSubscriptions: EventSubscriptionsAPI.EventSubscriptions = new EventSubscriptionsAPI.EventSubscriptions(
    this._client,
  );

  /**
   * Get an event.
   */
  retrieve(eventToken: string, options?: RequestOptions): APIPromise<Event> {
    return this._client.get(path`/v1/events/${eventToken}`, options);
  }

  /**
   * List all events.
   */
  list(
    query: EventListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<EventsCursorPage, Event> {
    return this._client.getAPIList('/v1/events', CursorPage<Event>, { query, ...options });
  }

  /**
   * List all the message attempts for a given event.
   */
  listAttempts(
    eventToken: string,
    query: EventListAttemptsParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<MessageAttemptsCursorPage, MessageAttempt> {
    return this._client.getAPIList(path`/v1/events/${eventToken}/attempts`, CursorPage<MessageAttempt>, {
      query,
      ...options,
    });
  }
}

export type EventsCursorPage = CursorPage<Event>;

export type MessageAttemptsCursorPage = CursorPage<MessageAttempt>;

export type EventSubscriptionsCursorPage = CursorPage<EventSubscription>;

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
   * - `card.converted` - Notification that a virtual card has been converted to a
   *   physical card.
   * - `card_transaction.updated` - Transaction Lifecycle webhook. See
   *   https://docs.lithic.com/docs/transaction-webhooks.
   * - `dispute.updated` - A dispute has been updated.
   * - `dispute_transaction.created` - A new dispute transaction has been created.
   * - `dispute_transaction.updated` - A dispute transaction has been updated.
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
    | 'balance.updated'
    | 'book_transfer_transaction.created'
    | 'card.created'
    | 'card.renewed'
    | 'card.reissued'
    | 'card.converted'
    | 'card.shipped'
    | 'card_transaction.updated'
    | 'digital_wallet.tokenization_approval_request'
    | 'digital_wallet.tokenization_result'
    | 'digital_wallet.tokenization_two_factor_authentication_code'
    | 'digital_wallet.tokenization_two_factor_authentication_code_sent'
    | 'digital_wallet.tokenization_updated'
    | 'dispute.updated'
    | 'dispute_evidence.upload_failed'
    | 'dispute_transaction.created'
    | 'dispute_transaction.updated'
    | 'external_bank_account.created'
    | 'external_bank_account.updated'
    | 'external_payment.created'
    | 'external_payment.updated'
    | 'financial_account.created'
    | 'financial_account.updated'
    | 'funding_event.created'
    | 'loan_tape.created'
    | 'loan_tape.updated'
    | 'management_operation.created'
    | 'management_operation.updated'
    | 'network_total.created'
    | 'network_total.updated'
    | 'payment_transaction.created'
    | 'payment_transaction.updated'
    | 'internal_transaction.created'
    | 'internal_transaction.updated'
    | 'settlement_report.updated'
    | 'statements.created'
    | 'three_ds_authentication.created'
    | 'three_ds_authentication.updated'
    | 'tokenization.approval_request'
    | 'tokenization.result'
    | 'tokenization.two_factor_authentication_code'
    | 'tokenization.two_factor_authentication_code_sent'
    | 'tokenization.updated';

  payload: { [key: string]: unknown };
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
    | 'balance.updated'
    | 'book_transfer_transaction.created'
    | 'card.created'
    | 'card.renewed'
    | 'card.reissued'
    | 'card.converted'
    | 'card.shipped'
    | 'card_transaction.updated'
    | 'digital_wallet.tokenization_approval_request'
    | 'digital_wallet.tokenization_result'
    | 'digital_wallet.tokenization_two_factor_authentication_code'
    | 'digital_wallet.tokenization_two_factor_authentication_code_sent'
    | 'digital_wallet.tokenization_updated'
    | 'dispute.updated'
    | 'dispute_evidence.upload_failed'
    | 'dispute_transaction.created'
    | 'dispute_transaction.updated'
    | 'external_bank_account.created'
    | 'external_bank_account.updated'
    | 'external_payment.created'
    | 'external_payment.updated'
    | 'financial_account.created'
    | 'financial_account.updated'
    | 'funding_event.created'
    | 'loan_tape.created'
    | 'loan_tape.updated'
    | 'management_operation.created'
    | 'management_operation.updated'
    | 'network_total.created'
    | 'network_total.updated'
    | 'payment_transaction.created'
    | 'payment_transaction.updated'
    | 'internal_transaction.created'
    | 'internal_transaction.updated'
    | 'settlement_report.updated'
    | 'statements.created'
    | 'three_ds_authentication.created'
    | 'three_ds_authentication.updated'
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
    | 'balance.updated'
    | 'book_transfer_transaction.created'
    | 'card.created'
    | 'card.renewed'
    | 'card.reissued'
    | 'card.converted'
    | 'card.shipped'
    | 'card_transaction.updated'
    | 'digital_wallet.tokenization_approval_request'
    | 'digital_wallet.tokenization_result'
    | 'digital_wallet.tokenization_two_factor_authentication_code'
    | 'digital_wallet.tokenization_two_factor_authentication_code_sent'
    | 'digital_wallet.tokenization_updated'
    | 'dispute.updated'
    | 'dispute_evidence.upload_failed'
    | 'dispute_transaction.created'
    | 'dispute_transaction.updated'
    | 'external_bank_account.created'
    | 'external_bank_account.updated'
    | 'external_payment.created'
    | 'external_payment.updated'
    | 'financial_account.created'
    | 'financial_account.updated'
    | 'funding_event.created'
    | 'loan_tape.created'
    | 'loan_tape.updated'
    | 'management_operation.created'
    | 'management_operation.updated'
    | 'network_total.created'
    | 'network_total.updated'
    | 'payment_transaction.created'
    | 'payment_transaction.updated'
    | 'internal_transaction.created'
    | 'internal_transaction.updated'
    | 'settlement_report.updated'
    | 'statements.created'
    | 'three_ds_authentication.created'
    | 'three_ds_authentication.updated'
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

Events.Subscriptions = Subscriptions;
Events.EventSubscriptions = EventSubscriptions;

export declare namespace Events {
  export {
    type Event as Event,
    type EventSubscription as EventSubscription,
    type MessageAttempt as MessageAttempt,
    type EventsCursorPage as EventsCursorPage,
    type MessageAttemptsCursorPage as MessageAttemptsCursorPage,
    type EventListParams as EventListParams,
    type EventListAttemptsParams as EventListAttemptsParams,
  };

  export {
    Subscriptions as Subscriptions,
    type SubscriptionRetrieveSecretResponse as SubscriptionRetrieveSecretResponse,
    type SubscriptionCreateParams as SubscriptionCreateParams,
    type SubscriptionUpdateParams as SubscriptionUpdateParams,
    type SubscriptionListParams as SubscriptionListParams,
    type SubscriptionListAttemptsParams as SubscriptionListAttemptsParams,
    type SubscriptionRecoverParams as SubscriptionRecoverParams,
    type SubscriptionReplayMissingParams as SubscriptionReplayMissingParams,
    type SubscriptionSendSimulatedExampleParams as SubscriptionSendSimulatedExampleParams,
  };

  export {
    EventSubscriptions as EventSubscriptions,
    type EventSubscriptionResendParams as EventSubscriptionResendParams,
  };
}
