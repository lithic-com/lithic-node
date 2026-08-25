// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as Shared from './shared';
import { APIPromise } from '../core/api-promise';
import { CursorPage, type CursorPageParams, PagePromise } from '../core/pagination';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class DisputesV2 extends APIResource {
  /**
   * Retrieves a specific dispute by its token.
   */
  retrieve(disputeToken: string, options?: RequestOptions): APIPromise<DisputeV2> {
    return this._client.get(path`/v2/disputes/${disputeToken}`, options);
  }

  /**
   * Returns a paginated list of disputes.
   */
  list(
    query: DisputesV2ListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<DisputeV2sCursorPage, DisputeV2> {
    return this._client.getAPIList('/v2/disputes', CursorPage<DisputeV2>, { query, ...options });
  }
}

export type DisputeV2sCursorPage = CursorPage<DisputeV2>;

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
   * Token for the claim this dispute was filed under, in UUID format. Null for
   * disputes not initiated through the Dispute Intake API.
   */
  claim_token: string | null;

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
  events: Array<DisputeV2.WorkflowEvent | DisputeV2.FinancialEvent | DisputeV2.CardholderLiabilityEvent>;

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
   * Event tracking the dispute's case management workflow
   */
  export interface WorkflowEvent {
    /**
     * Unique identifier for the event, in UUID format
     */
    token: string;

    /**
     * When the event occurred
     */
    created: string;

    /**
     * Details specific to workflow events
     */
    data: WorkflowEvent.Data;

    /**
     * Type of event. Always `WORKFLOW`
     */
    type: 'WORKFLOW';
  }

  export namespace WorkflowEvent {
    /**
     * Details specific to workflow events
     */
    export interface Data {
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
    }
  }

  /**
   * Event tracking a funds movement between issuer and acquirer
   */
  export interface FinancialEvent {
    /**
     * Unique identifier for the event, in UUID format
     */
    token: string;

    /**
     * When the event occurred
     */
    created: string;

    /**
     * Details specific to financial events
     */
    data: FinancialEvent.Data;

    /**
     * Type of event. Always `FINANCIAL`
     */
    type: 'FINANCIAL';
  }

  export namespace FinancialEvent {
    /**
     * Details specific to financial events
     */
    export interface Data {
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
    }
  }

  /**
   * Event tracking a change in cardholder liability
   */
  export interface CardholderLiabilityEvent {
    /**
     * Unique identifier for the event, in UUID format
     */
    token: string;

    /**
     * When the event occurred
     */
    created: string;

    /**
     * Details specific to cardholder liability events
     */
    data: CardholderLiabilityEvent.Data;

    /**
     * Type of event. Always `CARDHOLDER_LIABILITY`
     */
    type: 'CARDHOLDER_LIABILITY';
  }

  export namespace CardholderLiabilityEvent {
    /**
     * Details specific to cardholder liability events
     */
    export interface Data {
      /**
       * Action taken regarding cardholder liability
       */
      action:
        | 'PROVISIONAL_CREDIT_GRANTED'
        | 'PROVISIONAL_CREDIT_REVERSED'
        | 'WRITTEN_OFF'
        | 'WRITE_OFF_REVERSED';

      /**
       * Amount in minor units
       */
      amount: number;

      /**
       * Reason for the action
       */
      reason: string | null;
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
   * Filter by the token of the claim the dispute was filed under. Returns the
   * disputes created from that claim's disputed transaction events.
   */
  claim_token?: string;

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

export declare namespace DisputesV2 {
  export {
    type DisputeV2 as DisputeV2,
    type DisputeV2sCursorPage as DisputeV2sCursorPage,
    type DisputesV2ListParams as DisputesV2ListParams,
  };
}
