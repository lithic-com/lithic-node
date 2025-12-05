// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import * as ReportsAPI from '../reports';
import { NetworkTotalsCursorPage } from '../reports';
import { APIPromise } from '../../../core/api-promise';
import { CursorPage, type CursorPageParams, PagePromise } from '../../../core/pagination';
import { RequestOptions } from '../../../internal/request-options';
import { path } from '../../../internal/utils/path';

export class NetworkTotals extends APIResource {
  /**
   * Retrieve a specific network total record by token. Not available in sandbox.
   *
   * @example
   * ```ts
   * const networkTotal =
   *   await client.reports.settlement.networkTotals.retrieve(
   *     '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   *   );
   * ```
   */
  retrieve(token: string, options?: RequestOptions): APIPromise<ReportsAPI.NetworkTotal> {
    return this._client.get(path`/v1/reports/settlement/network_totals/${token}`, options);
  }

  /**
   * List network total records with optional filters. Not available in sandbox.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const networkTotal of client.reports.settlement.networkTotals.list()) {
   *   // ...
   * }
   * ```
   */
  list(
    query: NetworkTotalListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<NetworkTotalsCursorPage, ReportsAPI.NetworkTotal> {
    return this._client.getAPIList(
      '/v1/reports/settlement/network_totals',
      CursorPage<ReportsAPI.NetworkTotal>,
      { query, ...options },
    );
  }
}

export interface NetworkTotalListParams extends CursorPageParams {
  /**
   * Datetime in RFC 3339 format. Only entries created after the specified time will
   * be included. UTC time zone.
   */
  begin?: string;

  /**
   * Datetime in RFC 3339 format. Only entries created before the specified time will
   * be included. UTC time zone.
   */
  end?: string;

  /**
   * Institution ID to filter on.
   */
  institution_id?: string;

  /**
   * Network to filter on.
   */
  network?: 'VISA' | 'MASTERCARD' | 'MAESTRO' | 'INTERLINK';

  /**
   * Singular report date to filter on (YYYY-MM-DD). Cannot be populated in
   * conjunction with report_date_begin or report_date_end.
   */
  report_date?: string;

  /**
   * Earliest report date to filter on, inclusive (YYYY-MM-DD).
   */
  report_date_begin?: string;

  /**
   * Latest report date to filter on, inclusive (YYYY-MM-DD).
   */
  report_date_end?: string;

  /**
   * Settlement institution ID to filter on.
   */
  settlement_institution_id?: string;
}

export declare namespace NetworkTotals {
  export { type NetworkTotalListParams as NetworkTotalListParams };
}

export { type NetworkTotalsCursorPage };
