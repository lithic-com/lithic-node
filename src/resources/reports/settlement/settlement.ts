// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import * as ReportsAPI from '../reports';
import { SettlementDetailsCursorPage } from '../reports';
import * as NetworkTotalsAPI from './network-totals';
import { NetworkTotalListParams, NetworkTotals } from './network-totals';
import { APIPromise } from '../../../core/api-promise';
import { CursorPage, type CursorPageParams, PagePromise } from '../../../core/pagination';
import { RequestOptions } from '../../../internal/request-options';
import { path } from '../../../internal/utils/path';

export class Settlement extends APIResource {
  networkTotals: NetworkTotalsAPI.NetworkTotals = new NetworkTotalsAPI.NetworkTotals(this._client);

  /**
   * List details.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const settlementDetail of client.reports.settlement.listDetails(
   *   '2023-09-01',
   * )) {
   *   // ...
   * }
   * ```
   */
  listDetails(
    reportDate: string,
    query: SettlementListDetailsParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<SettlementDetailsCursorPage, ReportsAPI.SettlementDetail> {
    return this._client.getAPIList(
      path`/v1/reports/settlement/details/${reportDate}`,
      CursorPage<ReportsAPI.SettlementDetail>,
      { query, ...options },
    );
  }

  /**
   * Get the settlement report for a specified report date. Not available in sandbox.
   *
   * @example
   * ```ts
   * const settlementReport =
   *   await client.reports.settlement.summary('2023-09-01');
   * ```
   */
  summary(reportDate: string, options?: RequestOptions): APIPromise<ReportsAPI.SettlementReport> {
    return this._client.get(path`/v1/reports/settlement/summary/${reportDate}`, options);
  }
}

export interface SettlementListDetailsParams extends CursorPageParams {}

Settlement.NetworkTotals = NetworkTotals;

export declare namespace Settlement {
  export { type SettlementListDetailsParams as SettlementListDetailsParams };

  export { NetworkTotals as NetworkTotals, type NetworkTotalListParams as NetworkTotalListParams };
}

export { type SettlementDetailsCursorPage };
