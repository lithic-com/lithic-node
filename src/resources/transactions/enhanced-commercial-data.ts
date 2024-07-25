// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../resource';
import * as Core from '../../core';
import * as EnhancedCommercialDataAPI from './enhanced-commercial-data';
import * as EventsEnhancedCommercialDataAPI from './events/enhanced-commercial-data';

export class EnhancedCommercialData extends APIResource {
  /**
   * Get all L2/L3 enhanced commercial data associated with a transaction. Not
   * available in sandbox.
   */
  retrieve(
    transactionToken: string,
    options?: Core.RequestOptions,
  ): Core.APIPromise<EnhancedCommercialDataRetrieveResponse> {
    return this._client.get(`/transactions/${transactionToken}/enhanced_commercial_data`, options);
  }
}

export interface EnhancedCommercialDataRetrieveResponse {
  data: Array<EventsEnhancedCommercialDataAPI.EnhancedData>;
}

export namespace EnhancedCommercialData {
  export import EnhancedCommercialDataRetrieveResponse = EnhancedCommercialDataAPI.EnhancedCommercialDataRetrieveResponse;
}
