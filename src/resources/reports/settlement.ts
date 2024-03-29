// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import * as Core from 'lithic/core';
import { APIResource } from 'lithic/resource';
import { isRequestOptions } from 'lithic/core';
import * as SettlementAPI from 'lithic/resources/reports/settlement';
import * as ReportsAPI from 'lithic/resources/reports/reports';
import { SettlementDetailsCursorPage } from 'lithic/resources/reports/reports';
import { type CursorPageParams } from 'lithic/pagination';

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
    return this._client.getAPIList(`/reports/settlement/details/${reportDate}`, SettlementDetailsCursorPage, {
      query,
      ...options,
    });
  }

  /**
   * Get the settlement report for a specified report date.
   */
  summary(reportDate: string, options?: Core.RequestOptions): Core.APIPromise<ReportsAPI.SettlementReport> {
    return this._client.get(`/reports/settlement/summary/${reportDate}`, options);
  }
}

export interface SettlementListDetailsParams extends CursorPageParams {}

export namespace Settlement {
  export import SettlementListDetailsParams = SettlementAPI.SettlementListDetailsParams;
}

export { SettlementDetailsCursorPage };
