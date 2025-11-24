// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class EventSubscriptions extends APIResource {
  /**
   * Resend an event to an event subscription.
   */
  resend(
    eventSubscriptionToken: string,
    params: EventSubscriptionResendParams,
    options?: RequestOptions,
  ): APIPromise<void> {
    const { event_token } = params;
    return this._client.post(
      path`/v1/events/${event_token}/event_subscriptions/${eventSubscriptionToken}/resend`,
      options,
    );
  }
}

export interface EventSubscriptionResendParams {
  event_token: string;
}

export declare namespace EventSubscriptions {
  export { type EventSubscriptionResendParams as EventSubscriptionResendParams };
}
