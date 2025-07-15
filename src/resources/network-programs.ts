// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import { isRequestOptions } from '../core';
import * as Core from '../core';
import { SinglePage } from '../pagination';

export class NetworkPrograms extends APIResource {
  /**
   * Get network program.
   */
  retrieve(networkProgramToken: string, options?: Core.RequestOptions): Core.APIPromise<NetworkProgram> {
    return this._client.get(`/v1/network_programs/${networkProgramToken}`, options);
  }

  /**
   * List network programs.
   */
  list(
    query?: NetworkProgramListParams,
    options?: Core.RequestOptions,
  ): Core.PagePromise<NetworkProgramsSinglePage, NetworkProgram>;
  list(options?: Core.RequestOptions): Core.PagePromise<NetworkProgramsSinglePage, NetworkProgram>;
  list(
    query: NetworkProgramListParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.PagePromise<NetworkProgramsSinglePage, NetworkProgram> {
    if (isRequestOptions(query)) {
      return this.list({}, query);
    }
    return this._client.getAPIList('/v1/network_programs', NetworkProgramsSinglePage, { query, ...options });
  }
}

export class NetworkProgramsSinglePage extends SinglePage<NetworkProgram> {}

export interface NetworkProgram {
  /**
   * Lithic-generated unique identifier for the program
   */
  token: string;

  /**
   * Network product ID associated with this program.
   */
  default_product_code: string;

  /**
   * The name of the network program.
   */
  name: string;

  /**
   * RPIN value assigned by the network.
   */
  registered_program_identification_number: string;
}

export interface NetworkProgramListParams {
  /**
   * Date string in RFC 3339 format. Only entries created after the specified time
   * will be included. UTC time zone.
   */
  begin?: string;

  /**
   * Date string in RFC 3339 format. Only entries created before the specified time
   * will be included. UTC time zone.
   */
  end?: string;

  /**
   * Page size (for pagination).
   */
  page_size?: number;
}

NetworkPrograms.NetworkProgramsSinglePage = NetworkProgramsSinglePage;

export declare namespace NetworkPrograms {
  export {
    type NetworkProgram as NetworkProgram,
    NetworkProgramsSinglePage as NetworkProgramsSinglePage,
    type NetworkProgramListParams as NetworkProgramListParams,
  };
}
