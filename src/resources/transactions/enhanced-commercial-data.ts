// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as EventsEnhancedCommercialDataAPI from './events/enhanced-commercial-data';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class EnhancedCommercialData extends APIResource {
  /**
   * Get all L2/L3 enhanced commercial data associated with a transaction. Not
   * available in sandbox.
   *
   * @example
   * ```ts
   * const enhancedCommercialData =
   *   await client.transactions.enhancedCommercialData.retrieve(
   *     '00000000-0000-0000-0000-000000000000',
   *   );
   * ```
   */
  retrieve(
    transactionToken: string,
    options?: RequestOptions,
  ): APIPromise<EnhancedCommercialDataRetrieveResponse> {
    return this._client.get(path`/v1/transactions/${transactionToken}/enhanced_commercial_data`, options);
  }
}

export interface EnhancedCommercialDataRetrieveResponse {
  data: Array<EventsEnhancedCommercialDataAPI.EnhancedData>;
}

export declare namespace EnhancedCommercialData {
  export { type EnhancedCommercialDataRetrieveResponse as EnhancedCommercialDataRetrieveResponse };
}
