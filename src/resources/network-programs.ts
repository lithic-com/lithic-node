// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { PagePromise, SinglePage } from '../core/pagination';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class NetworkPrograms extends APIResource {
  /**
   * Get network program.
   */
  retrieve(networkProgramToken: string, options?: RequestOptions): APIPromise<NetworkProgram> {
    return this._client.get(path`/v1/network_programs/${networkProgramToken}`, options);
  }

  /**
   * List network programs.
   */
  list(
    query: NetworkProgramListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<NetworkProgramsSinglePage, NetworkProgram> {
    return this._client.getAPIList('/v1/network_programs', SinglePage<NetworkProgram>, { query, ...options });
  }
}

export type NetworkProgramsSinglePage = SinglePage<NetworkProgram>;

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

export declare namespace NetworkPrograms {
  export {
    type NetworkProgram as NetworkProgram,
    type NetworkProgramsSinglePage as NetworkProgramsSinglePage,
    type NetworkProgramListParams as NetworkProgramListParams,
  };
}
