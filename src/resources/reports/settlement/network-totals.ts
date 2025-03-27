// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../resource';
import { isRequestOptions } from '../../../core';
import * as Core from '../../../core';
import { CursorPage, type CursorPageParams } from '../../../pagination';

export class NetworkTotals extends APIResource {
  /**
   * Retrieve a specific network total record by token. Not available in sandbox.
   */
  retrieve(token: string, options?: Core.RequestOptions): Core.APIPromise<NetworkTotalRetrieveResponse> {
    return this._client.get(`/v1/reports/settlement/network_totals/${token}`, options);
  }

  /**
   * List network total records with optional filters. Not available in sandbox.
   */
  list(
    query?: NetworkTotalListParams,
    options?: Core.RequestOptions,
  ): Core.PagePromise<NetworkTotalListResponsesCursorPage, NetworkTotalListResponse>;
  list(
    options?: Core.RequestOptions,
  ): Core.PagePromise<NetworkTotalListResponsesCursorPage, NetworkTotalListResponse>;
  list(
    query: NetworkTotalListParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.PagePromise<NetworkTotalListResponsesCursorPage, NetworkTotalListResponse> {
    if (isRequestOptions(query)) {
      return this.list({}, query);
    }
    return this._client.getAPIList(
      '/v1/reports/settlement/network_totals',
      NetworkTotalListResponsesCursorPage,
      { query, ...options },
    );
  }
}

export class NetworkTotalListResponsesCursorPage extends CursorPage<NetworkTotalListResponse> {}

export interface NetworkTotalRetrieveResponse {
  /**
   * Globally unique identifier.
   */
  token: string;

  amounts: NetworkTotalRetrieveResponse.Amounts;

  /**
   * RFC 3339 timestamp for when the record was created. UTC time zone.
   */
  created: string;

  /**
   * 3-character alphabetic ISO 4217 code.
   */
  currency: string;

  /**
   * The institution that activity occurred on. For Mastercard: ICA (Interbank Card
   * Association). For Maestro: institution ID. For Visa: lowest level SRE
   * (Settlement Reporting Entity).
   */
  institution_id: string;

  /**
   * Card network where the transaction took place. VISA, MASTERCARD, MAESTRO, or
   * INTERLINK.
   */
  network: 'VISA' | 'MASTERCARD' | 'MAESTRO' | 'INTERLINK';

  /**
   * Date that the network total record applies to. YYYY-MM-DD format.
   */
  report_date: string;

  /**
   * The institution responsible for settlement. For Mastercard: same as
   * `institution_id`. For Maestro: billing ICA. For Visa: Funds Transfer SRE
   * (FTSRE).
   */
  settlement_institution_id: string;

  /**
   * Settlement service.
   */
  settlement_service: string;

  /**
   * RFC 3339 timestamp for when the record was last updated. UTC time zone.
   */
  updated: string;

  /**
   * The clearing cycle that the network total record applies to. Mastercard only.
   */
  cycle?: number;
}

export namespace NetworkTotalRetrieveResponse {
  export interface Amounts {
    /**
     * Total settlement amount excluding interchange, in currency's smallest unit.
     */
    gross_settlement: number;

    /**
     * Interchange amount, in currency's smallest unit.
     */
    interchange_fees: number;

    /**
     * `gross_settlement` net of `interchange_fees` and `visa_charges` (if applicable),
     * in currency's smallest unit.
     */
    net_settlement: number;

    /**
     * Charges specific to Visa/Interlink, in currency's smallest unit.
     */
    visa_charges?: number;
  }
}

export interface NetworkTotalListResponse {
  /**
   * Globally unique identifier.
   */
  token: string;

  amounts: NetworkTotalListResponse.Amounts;

  /**
   * RFC 3339 timestamp for when the record was created. UTC time zone.
   */
  created: string;

  /**
   * 3-character alphabetic ISO 4217 code.
   */
  currency: string;

  /**
   * The institution that activity occurred on. For Mastercard: ICA (Interbank Card
   * Association). For Maestro: institution ID. For Visa: lowest level SRE
   * (Settlement Reporting Entity).
   */
  institution_id: string;

  /**
   * Card network where the transaction took place. VISA, MASTERCARD, MAESTRO, or
   * INTERLINK.
   */
  network: 'VISA' | 'MASTERCARD' | 'MAESTRO' | 'INTERLINK';

  /**
   * Date that the network total record applies to. YYYY-MM-DD format.
   */
  report_date: string;

  /**
   * The institution responsible for settlement. For Mastercard: same as
   * `institution_id`. For Maestro: billing ICA. For Visa: Funds Transfer SRE
   * (FTSRE).
   */
  settlement_institution_id: string;

  /**
   * Settlement service.
   */
  settlement_service: string;

  /**
   * RFC 3339 timestamp for when the record was last updated. UTC time zone.
   */
  updated: string;

  /**
   * The clearing cycle that the network total record applies to. Mastercard only.
   */
  cycle?: number;
}

export namespace NetworkTotalListResponse {
  export interface Amounts {
    /**
     * Total settlement amount excluding interchange, in currency's smallest unit.
     */
    gross_settlement: number;

    /**
     * Interchange amount, in currency's smallest unit.
     */
    interchange_fees: number;

    /**
     * `gross_settlement` net of `interchange_fees` and `visa_charges` (if applicable),
     * in currency's smallest unit.
     */
    net_settlement: number;

    /**
     * Charges specific to Visa/Interlink, in currency's smallest unit.
     */
    visa_charges?: number;
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

NetworkTotals.NetworkTotalListResponsesCursorPage = NetworkTotalListResponsesCursorPage;

export declare namespace NetworkTotals {
  export {
    type NetworkTotalRetrieveResponse as NetworkTotalRetrieveResponse,
    type NetworkTotalListResponse as NetworkTotalListResponse,
    NetworkTotalListResponsesCursorPage as NetworkTotalListResponsesCursorPage,
    type NetworkTotalListParams as NetworkTotalListParams,
  };
}
