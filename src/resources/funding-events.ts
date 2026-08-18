// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { CursorPage, type CursorPageParams, PagePromise } from '../core/pagination';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class FundingEvents extends APIResource {
  /**
   * Get funding event for program by id
   */
  retrieve(fundingEventToken: string, options?: RequestOptions): APIPromise<FundingEvent> {
    return this._client.get(path`/v1/funding_events/${fundingEventToken}`, options);
  }

  /**
   * Get all funding events for program
   */
  list(
    query: FundingEventListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<FundingEventsCursorPage, FundingEvent> {
    return this._client.getAPIList('/v1/funding_events', CursorPage<FundingEvent>, { query, ...options });
  }

  /**
   * Get funding event details by id
   */
  retrieveDetails(
    fundingEventToken: string,
    options?: RequestOptions,
  ): APIPromise<FundingEventRetrieveDetailsResponse> {
    return this._client.get(path`/v1/funding_events/${fundingEventToken}/details`, options);
  }
}

export type FundingEventsCursorPage = CursorPage<FundingEvent>;

export interface FundingEvent {
  /**
   * Unique token ID
   */
  token: string;

  /**
   * Collection resource type
   */
  collection_resource_type: 'BOOK_TRANSFER' | 'PAYMENT';

  /**
   * IDs of collections, further information can be gathered from the appropriate
   * collection API based on collection_resource_type
   */
  collection_tokens: Array<string>;

  /**
   * Time of the creation
   */
  created: string;

  /**
   * Time of the high watermark
   */
  high_watermark: string;

  /**
   * Network settlement summary breakdown by network settlement date
   */
  network_settlement_summary: Array<FundingEvent.NetworkSettlementSummary>;

  /**
   * Time of the previous high watermark
   */
  previous_high_watermark: string;

  /**
   * Time of the update
   */
  updated: string;
}

export namespace FundingEvent {
  export interface NetworkSettlementSummary {
    network_settlement_date: string;

    settled_gross_amount: number;
  }
}

export interface FundingEventRetrieveDetailsResponse {
  /**
   * Unique token ID
   */
  token: string;

  /**
   * URL of the settlement details
   */
  settlement_details_url: string;

  /**
   * URL of the settlement summary
   */
  settlement_summary_url: string;
}

export interface FundingEventListParams extends CursorPageParams {}

export declare namespace FundingEvents {
  export {
    type FundingEvent as FundingEvent,
    type FundingEventRetrieveDetailsResponse as FundingEventRetrieveDetailsResponse,
    type FundingEventsCursorPage as FundingEventsCursorPage,
    type FundingEventListParams as FundingEventListParams,
  };
}
