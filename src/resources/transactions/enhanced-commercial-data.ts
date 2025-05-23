// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../resource';
import * as Core from '../../core';
import * as EventsEnhancedCommercialDataAPI from './events/enhanced-commercial-data';

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
    options?: Core.RequestOptions,
  ): Core.APIPromise<EnhancedCommercialDataRetrieveResponse> {
    return this._client.get(`/v1/transactions/${transactionToken}/enhanced_commercial_data`, options);
  }
}

export interface EnhancedCommercialDataRetrieveResponse {
  data: Array<EventsEnhancedCommercialDataAPI.EnhancedData>;
}

export declare namespace EnhancedCommercialData {
  export { type EnhancedCommercialDataRetrieveResponse as EnhancedCommercialDataRetrieveResponse };
}
