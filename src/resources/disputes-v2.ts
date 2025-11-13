// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import { isRequestOptions } from '../core';
import * as Core from '../core';
import * as Shared from './shared';
import { CursorPage, type CursorPageParams } from '../pagination';

export class DisputesV2 extends APIResource {
  /**
   * Retrieves a specific dispute by its token.
   */
  retrieve(disputeToken: string, options?: Core.RequestOptions): Core.APIPromise<DisputeV2> {
    return this._client.get(`/v2/disputes/${disputeToken}`, options);
  }

  /**
   * Returns a paginated list of disputes.
   */
  list(
    query?: DisputesV2ListParams,
    options?: Core.RequestOptions,
  ): Core.PagePromise<DisputeV2sCursorPage, DisputeV2>;
  list(options?: Core.RequestOptions): Core.PagePromise<DisputeV2sCursorPage, DisputeV2>;
  list(
    query: DisputesV2ListParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.PagePromise<DisputeV2sCursorPage, DisputeV2> {
    if (isRequestOptions(query)) {
      return this.list({}, query);
    }
    return this._client.getAPIList('/v2/disputes', DisputeV2sCursorPage, { query, ...options });
  }
}

export class DisputeV2sCursorPage extends CursorPage<DisputeV2> {}

/**
 * The Dispute object tracks the progression of a dispute throughout its lifecycle.
 */
export interface DisputeV2 {
  /**
   * Token assigned by Lithic for the dispute, in UUID format.
   */
  token: string;

  /**
   * Token for the account associated with the dispute, in UUID format.
   */
  account_token: string;

  /**
   * Token for the card used in the dispute, in UUID format.
   */
  card_token: string;

  /**
   * Identifier assigned by the network for this dispute.
   */
  case_id: string | null;

  /**
   * When the dispute was created.
   */
  created: string;

  /**
   * Three-letter ISO 4217 currency code.
   */
  currency: string;

  /**
   * Dispute resolution outcome
   */
  disposition: 'WON' | 'LOST' | 'PARTIALLY_WON' | 'WITHDRAWN' | 'DENIED' | null;

  /**
   * Chronological list of events that have occurred in the dispute lifecycle
   */
  events: Array<DisputeV2.Event>;

  /**
   * Current breakdown of how liability is allocated for the disputed amount
   */
  liability_allocation: DisputeV2.LiabilityAllocation;

  merchant: Shared.Merchant;

  /**
   * Card network handling the dispute.
   */
  network: 'VISA' | 'MASTERCARD';

  /**
   * Current status of the dispute.
   */
  status: 'OPEN' | 'CLOSED' | null;

  /**
   * Contains identifiers for the transaction and specific event within being
   * disputed; null if no transaction can be identified
   */
  transaction_series: DisputeV2.TransactionSeries | null;

  /**
   * When the dispute was last updated.
   */
  updated: string;
}

export namespace DisputeV2 {
  /**
   * Event that occurred in the dispute lifecycle
   */
  export interface Event {
    /**
     * Unique identifier for the event, in UUID format
     */
    token: string;

    /**
     * When the event occurred
     */
    created: string;

    /**
     * Details specific to the event type
     */
    data: Event.Workflow | Event.Financial | Event.CardholderLiability;

    /**
     * Type of event
     */
    type: 'WORKFLOW' | 'FINANCIAL' | 'CARDHOLDER_LIABILITY';
  }

  export namespace Event {
    /**
     * Details specific to workflow events
     */
    export interface Workflow {
      /**
       * Action taken in this stage
       */
      action: 'OPENED' | 'CLOSED' | 'REOPENED';

      /**
       * Amount in minor units
       */
      amount: number | null;

      /**
       * Dispute resolution outcome
       */
      disposition: 'WON' | 'LOST' | 'PARTIALLY_WON' | 'WITHDRAWN' | 'DENIED' | null;

      /**
       * Reason for the action
       */
      reason: string | null;

      /**
       * Current stage of the dispute workflow
       */
      stage: 'CLAIM';

      /**
       * Event type discriminator
       */
      type: 'WORKFLOW';
    }

    /**
     * Details specific to financial events
     */
    export interface Financial {
      /**
       * Amount in minor units
       */
      amount: number;

      /**
       * Direction of funds flow
       */
      polarity: 'CREDIT' | 'DEBIT';

      /**
       * Stage at which the financial event occurred
       */
      stage: 'CHARGEBACK' | 'REPRESENTMENT' | 'PREARBITRATION' | 'ARBITRATION' | 'COLLABORATION';

      /**
       * Event type discriminator
       */
      type: 'FINANCIAL';
    }

    /**
     * Details specific to cardholder liability events
     */
    export interface CardholderLiability {
      /**
       * Action taken regarding cardholder liability
       */
      action: 'PROVISIONAL_CREDIT_GRANTED' | 'PROVISIONAL_CREDIT_REVERSED' | 'WRITTEN_OFF';

      /**
       * Amount in minor units
       */
      amount: number;

      /**
       * Reason for the action
       */
      reason: string;

      /**
       * Event type discriminator
       */
      type: 'CARDHOLDER_LIABILITY';
    }
  }

  /**
   * Current breakdown of how liability is allocated for the disputed amount
   */
  export interface LiabilityAllocation {
    /**
     * The amount that has been denied to the cardholder
     */
    denied_amount: number;

    /**
     * The initial amount disputed
     */
    original_amount: number;

    /**
     * The amount that has been recovered from the merchant through the dispute process
     */
    recovered_amount: number;

    /**
     * Any disputed amount that is still outstanding, i.e. has not been recovered,
     * written off, or denied
     */
    remaining_amount: number;

    /**
     * The amount the issuer has chosen to write off
     */
    written_off_amount: number;
  }

  /**
   * Contains identifiers for the transaction and specific event within being
   * disputed; null if no transaction can be identified
   */
  export interface TransactionSeries {
    /**
     * Token of the specific event in the original transaction being disputed, in UUID
     * format; null if no event can be identified
     */
    related_transaction_event_token: string | null;

    /**
     * Token of the original transaction being disputed, in UUID format
     */
    related_transaction_token: string;

    /**
     * The type of transaction series associating the dispute and the original
     * transaction. Always set to DISPUTE
     */
    type: 'DISPUTE';
  }
}

export interface DisputesV2ListParams extends CursorPageParams {
  /**
   * Filter by account token.
   */
  account_token?: string;

  /**
   * RFC 3339 timestamp for filtering by created date, inclusive.
   */
  begin?: string;

  /**
   * Filter by card token.
   */
  card_token?: string;

  /**
   * Filter by the token of the transaction being disputed. Corresponds with
   * transaction_series.related_transaction_token in the Dispute.
   */
  disputed_transaction_token?: string;

  /**
   * RFC 3339 timestamp for filtering by created date, inclusive.
   */
  end?: string;
}

DisputesV2.DisputeV2sCursorPage = DisputeV2sCursorPage;

export declare namespace DisputesV2 {
  export {
    type DisputeV2 as DisputeV2,
    DisputeV2sCursorPage as DisputeV2sCursorPage,
    type DisputesV2ListParams as DisputesV2ListParams,
  };
}
