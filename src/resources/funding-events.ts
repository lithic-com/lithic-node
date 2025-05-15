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
   * IDs of collections
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
   * Time of the previous high watermark
   */
  previous_high_watermark: string;

  /**
   * List of settlements
   */
  settlement_breakdowns: Array<FundingEventRetrieveResponse.SettlementBreakdown>;

  /**
   * Time of the update
   */
  updated: string;
}

export namespace FundingEventRetrieveResponse {
  export interface SettlementBreakdown {
    amount: number;

    settlement_date: string;
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
   * IDs of collections
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
   * Time of the previous high watermark
   */
  previous_high_watermark: string;

  /**
   * List of settlements
   */
  settlement_breakdowns: Array<FundingEventListResponse.SettlementBreakdown>;

  /**
   * Time of the update
   */
  updated: string;
}

export namespace FundingEventListResponse {
  export interface SettlementBreakdown {
    amount: number;

    settlement_date: string;
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
