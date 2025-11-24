// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as EventsAPI from './events';
import { EventSubscriptionsCursorPage, MessageAttemptsCursorPage } from './events';
import { APIPromise } from '../../core/api-promise';
import { CursorPage, type CursorPageParams, PagePromise } from '../../core/pagination';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Subscriptions extends APIResource {
  /**
   * Create a new event subscription.
   */
  create(body: SubscriptionCreateParams, options?: RequestOptions): APIPromise<EventsAPI.EventSubscription> {
    return this._client.post('/v1/event_subscriptions', { body, ...options });
  }

  /**
   * Get an event subscription.
   */
  retrieve(
    eventSubscriptionToken: string,
    options?: RequestOptions,
  ): APIPromise<EventsAPI.EventSubscription> {
    return this._client.get(path`/v1/event_subscriptions/${eventSubscriptionToken}`, options);
  }

  /**
   * Update an event subscription.
   */
  update(
    eventSubscriptionToken: string,
    body: SubscriptionUpdateParams,
    options?: RequestOptions,
  ): APIPromise<EventsAPI.EventSubscription> {
    return this._client.patch(path`/v1/event_subscriptions/${eventSubscriptionToken}`, { body, ...options });
  }

  /**
   * List all the event subscriptions.
   */
  list(
    query: SubscriptionListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<EventSubscriptionsCursorPage, EventsAPI.EventSubscription> {
    return this._client.getAPIList('/v1/event_subscriptions', CursorPage<EventsAPI.EventSubscription>, {
      query,
      ...options,
    });
  }

  /**
   * Delete an event subscription.
   */
  delete(eventSubscriptionToken: string, options?: RequestOptions): APIPromise<void> {
    return this._client.delete(path`/v1/event_subscriptions/${eventSubscriptionToken}`, options);
  }

  /**
   * List all the message attempts for a given event subscription.
   */
  listAttempts(
    eventSubscriptionToken: string,
    query: SubscriptionListAttemptsParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<MessageAttemptsCursorPage, EventsAPI.MessageAttempt> {
    return this._client.getAPIList(
      path`/v1/event_subscriptions/${eventSubscriptionToken}/attempts`,
      CursorPage<EventsAPI.MessageAttempt>,
      { query, ...options },
    );
  }

  /**
   * Resend all failed messages since a given time.
   */
  recover(
    eventSubscriptionToken: string,
    params: SubscriptionRecoverParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<void> {
    const { begin, end } = params ?? {};
    return this._client.post(path`/v1/event_subscriptions/${eventSubscriptionToken}/recover`, {
      query: { begin, end },
      ...options,
    });
  }

  /**
   * Replays messages to the endpoint. Only messages that were created after `begin`
   * will be sent. Messages that were previously sent to the endpoint are not resent.
   * Message will be retried if endpoint responds with a non-2xx status code. See
   * [Retry Schedule](https://docs.lithic.com/docs/events-api#retry-schedule) for
   * details.
   */
  replayMissing(
    eventSubscriptionToken: string,
    params: SubscriptionReplayMissingParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<void> {
    const { begin, end } = params ?? {};
    return this._client.post(path`/v1/event_subscriptions/${eventSubscriptionToken}/replay_missing`, {
      query: { begin, end },
      ...options,
    });
  }

  /**
   * Get the secret for an event subscription.
   */
  retrieveSecret(
    eventSubscriptionToken: string,
    options?: RequestOptions,
  ): APIPromise<SubscriptionRetrieveSecretResponse> {
    return this._client.get(path`/v1/event_subscriptions/${eventSubscriptionToken}/secret`, options);
  }

  /**
   * Rotate the secret for an event subscription. The previous secret will be valid
   * for the next 24 hours.
   */
  rotateSecret(eventSubscriptionToken: string, options?: RequestOptions): APIPromise<void> {
    return this._client.post(path`/v1/event_subscriptions/${eventSubscriptionToken}/secret/rotate`, options);
  }

  /**
   * Send an example message for event.
   */
  sendSimulatedExample(
    eventSubscriptionToken: string,
    body: SubscriptionSendSimulatedExampleParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<void> {
    return this._client.post(path`/v1/simulate/event_subscriptions/${eventSubscriptionToken}/send_example`, {
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
    | 'account_holder_document.updated'
    | 'account_holder.created'
    | 'account_holder.updated'
    | 'account_holder.verification'
    | 'auth_rules.backtest_report.created'
    | 'balance.updated'
    | 'book_transfer_transaction.created'
    | 'book_transfer_transaction.updated'
    | 'card_transaction.enhanced_data.created'
    | 'card_transaction.enhanced_data.updated'
    | 'card_transaction.updated'
    | 'card.converted'
    | 'card.created'
    | 'card.reissued'
    | 'card.renewed'
    | 'card.shipped'
    | 'digital_wallet.tokenization_approval_request'
    | 'digital_wallet.tokenization_result'
    | 'digital_wallet.tokenization_two_factor_authentication_code'
    | 'digital_wallet.tokenization_two_factor_authentication_code_sent'
    | 'digital_wallet.tokenization_updated'
    | 'dispute_evidence.upload_failed'
    | 'dispute_transaction.created'
    | 'dispute_transaction.updated'
    | 'dispute.updated'
    | 'external_bank_account.created'
    | 'external_bank_account.updated'
    | 'external_payment.created'
    | 'external_payment.updated'
    | 'financial_account.created'
    | 'financial_account.updated'
    | 'funding_event.created'
    | 'internal_transaction.created'
    | 'internal_transaction.updated'
    | 'loan_tape.created'
    | 'loan_tape.updated'
    | 'management_operation.created'
    | 'management_operation.updated'
    | 'network_total.created'
    | 'network_total.updated'
    | 'payment_transaction.created'
    | 'payment_transaction.updated'
    | 'settlement_report.updated'
    | 'statements.created'
    | 'three_ds_authentication.challenge'
    | 'three_ds_authentication.created'
    | 'three_ds_authentication.updated'
    | 'tokenization.approval_request'
    | 'tokenization.result'
    | 'tokenization.two_factor_authentication_code'
    | 'tokenization.two_factor_authentication_code_sent'
    | 'tokenization.updated'
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
    | 'account_holder_document.updated'
    | 'account_holder.created'
    | 'account_holder.updated'
    | 'account_holder.verification'
    | 'auth_rules.backtest_report.created'
    | 'balance.updated'
    | 'book_transfer_transaction.created'
    | 'book_transfer_transaction.updated'
    | 'card_transaction.enhanced_data.created'
    | 'card_transaction.enhanced_data.updated'
    | 'card_transaction.updated'
    | 'card.converted'
    | 'card.created'
    | 'card.reissued'
    | 'card.renewed'
    | 'card.shipped'
    | 'digital_wallet.tokenization_approval_request'
    | 'digital_wallet.tokenization_result'
    | 'digital_wallet.tokenization_two_factor_authentication_code'
    | 'digital_wallet.tokenization_two_factor_authentication_code_sent'
    | 'digital_wallet.tokenization_updated'
    | 'dispute_evidence.upload_failed'
    | 'dispute_transaction.created'
    | 'dispute_transaction.updated'
    | 'dispute.updated'
    | 'external_bank_account.created'
    | 'external_bank_account.updated'
    | 'external_payment.created'
    | 'external_payment.updated'
    | 'financial_account.created'
    | 'financial_account.updated'
    | 'funding_event.created'
    | 'internal_transaction.created'
    | 'internal_transaction.updated'
    | 'loan_tape.created'
    | 'loan_tape.updated'
    | 'management_operation.created'
    | 'management_operation.updated'
    | 'network_total.created'
    | 'network_total.updated'
    | 'payment_transaction.created'
    | 'payment_transaction.updated'
    | 'settlement_report.updated'
    | 'statements.created'
    | 'three_ds_authentication.challenge'
    | 'three_ds_authentication.created'
    | 'three_ds_authentication.updated'
    | 'tokenization.approval_request'
    | 'tokenization.result'
    | 'tokenization.two_factor_authentication_code'
    | 'tokenization.two_factor_authentication_code_sent'
    | 'tokenization.updated'
  >;
}

export interface SubscriptionListParams extends CursorPageParams {}

export interface SubscriptionListAttemptsParams extends CursorPageParams {
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

export interface SubscriptionRecoverParams {
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

export interface SubscriptionReplayMissingParams {
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

export interface SubscriptionSendSimulatedExampleParams {
  /**
   * Event type to send example message for.
   */
  event_type?:
    | 'account_holder_document.updated'
    | 'account_holder.created'
    | 'account_holder.updated'
    | 'account_holder.verification'
    | 'auth_rules.backtest_report.created'
    | 'balance.updated'
    | 'book_transfer_transaction.created'
    | 'book_transfer_transaction.updated'
    | 'card_transaction.enhanced_data.created'
    | 'card_transaction.enhanced_data.updated'
    | 'card_transaction.updated'
    | 'card.converted'
    | 'card.created'
    | 'card.reissued'
    | 'card.renewed'
    | 'card.shipped'
    | 'digital_wallet.tokenization_approval_request'
    | 'digital_wallet.tokenization_result'
    | 'digital_wallet.tokenization_two_factor_authentication_code'
    | 'digital_wallet.tokenization_two_factor_authentication_code_sent'
    | 'digital_wallet.tokenization_updated'
    | 'dispute_evidence.upload_failed'
    | 'dispute_transaction.created'
    | 'dispute_transaction.updated'
    | 'dispute.updated'
    | 'external_bank_account.created'
    | 'external_bank_account.updated'
    | 'external_payment.created'
    | 'external_payment.updated'
    | 'financial_account.created'
    | 'financial_account.updated'
    | 'funding_event.created'
    | 'internal_transaction.created'
    | 'internal_transaction.updated'
    | 'loan_tape.created'
    | 'loan_tape.updated'
    | 'management_operation.created'
    | 'management_operation.updated'
    | 'network_total.created'
    | 'network_total.updated'
    | 'payment_transaction.created'
    | 'payment_transaction.updated'
    | 'settlement_report.updated'
    | 'statements.created'
    | 'three_ds_authentication.challenge'
    | 'three_ds_authentication.created'
    | 'three_ds_authentication.updated'
    | 'tokenization.approval_request'
    | 'tokenization.result'
    | 'tokenization.two_factor_authentication_code'
    | 'tokenization.two_factor_authentication_code_sent'
    | 'tokenization.updated';
}

export declare namespace Subscriptions {
  export {
    type SubscriptionRetrieveSecretResponse as SubscriptionRetrieveSecretResponse,
    type SubscriptionCreateParams as SubscriptionCreateParams,
    type SubscriptionUpdateParams as SubscriptionUpdateParams,
    type SubscriptionListParams as SubscriptionListParams,
    type SubscriptionListAttemptsParams as SubscriptionListAttemptsParams,
    type SubscriptionRecoverParams as SubscriptionRecoverParams,
    type SubscriptionReplayMissingParams as SubscriptionReplayMissingParams,
    type SubscriptionSendSimulatedExampleParams as SubscriptionSendSimulatedExampleParams,
  };
}

export { type EventSubscriptionsCursorPage, type MessageAttemptsCursorPage };
