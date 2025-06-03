// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import { isRequestOptions } from '../core';
import * as Core from '../core';
import { CursorPage, type CursorPageParams } from '../pagination';

export class FundingEvents extends APIResource {
  /**
   * Get funding event for program by id
   */
  retrieve(
    fundingEventToken: string,
    options?: Core.RequestOptions,
  ): Core.APIPromise<FundingEventRetrieveResponse> {
    return this._client.get(`/v1/funding_events/${fundingEventToken}`, options);
  }

  /**
   * Get all funding events for program
   */
  list(
    query?: FundingEventListParams,
    options?: Core.RequestOptions,
  ): Core.PagePromise<FundingEventListResponsesCursorPage, FundingEventListResponse>;
  list(
    options?: Core.RequestOptions,
  ): Core.PagePromise<FundingEventListResponsesCursorPage, FundingEventListResponse>;
  list(
    query: FundingEventListParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.PagePromise<FundingEventListResponsesCursorPage, FundingEventListResponse> {
    if (isRequestOptions(query)) {
      return this.list({}, query);
    }
    return this._client.getAPIList('/v1/funding_events', FundingEventListResponsesCursorPage, {
      query,
      ...options,
    });
  }

  /**
   * Get funding event details by id
   */
  retrieveDetails(
    fundingEventToken: string,
    options?: Core.RequestOptions,
  ): Core.APIPromise<FundingEventRetrieveDetailsResponse> {
    return this._client.get(`/v1/funding_events/${fundingEventToken}/details`, options);
  }
}

export class FundingEventListResponsesCursorPage extends CursorPage<FundingEventListResponse> {}

export interface FundingEventRetrieveResponse {
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
  network_settlement_summary: Array<FundingEventRetrieveResponse.NetworkSettlementSummary>;

  /**
   * Time of the previous high watermark
   */
  previous_high_watermark: string;

  /**
   * Time of the update
   */
  updated: string;
}

export namespace FundingEventRetrieveResponse {
  export interface NetworkSettlementSummary {
    network_settlement_date: string;

    settled_gross_amount: number;
  }
}

export interface FundingEventListResponse {
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
  network_settlement_summary: Array<FundingEventListResponse.NetworkSettlementSummary>;

  /**
   * Time of the previous high watermark
   */
  previous_high_watermark: string;

  /**
   * Time of the update
   */
  updated: string;
}

export namespace FundingEventListResponse {
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

FundingEvents.FundingEventListResponsesCursorPage = FundingEventListResponsesCursorPage;

export declare namespace FundingEvents {
  export {
    type FundingEventRetrieveResponse as FundingEventRetrieveResponse,
    type FundingEventListResponse as FundingEventListResponse,
    type FundingEventRetrieveDetailsResponse as FundingEventRetrieveDetailsResponse,
    FundingEventListResponsesCursorPage as FundingEventListResponsesCursorPage,
    type FundingEventListParams as FundingEventListParams,
  };
}
