// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../resource';
import * as Core from '../../core';

export class EventSubscriptions extends APIResource {
  /**
   * Resend an event to an event subscription.
   */
  resend(
    eventToken: string,
    eventSubscriptionToken: string,
    options?: Core.RequestOptions,
  ): Core.APIPromise<void> {
    return this._client.post(
      `/v1/events/${eventToken}/event_subscriptions/${eventSubscriptionToken}/resend`,
      options,
    );
  }
}
