// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../resource';
import { isRequestOptions } from '../../core';
import * as Core from '../../core';
import * as ReportsAPI from './reports';
import { SettlementDetailsCursorPage } from './reports';
import { type CursorPageParams } from '../../pagination';

export class Settlement extends APIResource {
  /**
   * List details.
   */
  listDetails(
    reportDate: string,
    query?: SettlementListDetailsParams,
    options?: Core.RequestOptions,
  ): Core.PagePromise<SettlementDetailsCursorPage, ReportsAPI.SettlementDetail>;
  listDetails(
    reportDate: string,
    options?: Core.RequestOptions,
  ): Core.PagePromise<SettlementDetailsCursorPage, ReportsAPI.SettlementDetail>;
  listDetails(
    reportDate: string,
    query: SettlementListDetailsParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.PagePromise<SettlementDetailsCursorPage, ReportsAPI.SettlementDetail> {
    if (isRequestOptions(query)) {
      return this.listDetails(reportDate, {}, query);
    }
    return this._client.getAPIList(
      `/v1/reports/settlement/details/${reportDate}`,
      SettlementDetailsCursorPage,
      { query, ...options },
    );
  }

  /**
   * Get the settlement report for a specified report date.
   */
  summary(reportDate: string, options?: Core.RequestOptions): Core.APIPromise<ReportsAPI.SettlementReport> {
    return this._client.get(`/v1/reports/settlement/summary/${reportDate}`, options);
  }
}

export interface SettlementListDetailsParams extends CursorPageParams {}

export declare namespace Settlement {
  export { type SettlementListDetailsParams as SettlementListDetailsParams };
}

export { SettlementDetailsCursorPage };
