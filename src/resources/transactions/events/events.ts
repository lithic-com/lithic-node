// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import * as EnhancedCommercialDataAPI from './enhanced-commercial-data';
import { EnhancedCommercialData, EnhancedData } from './enhanced-commercial-data';

export class Events extends APIResource {
  enhancedCommercialData: EnhancedCommercialDataAPI.EnhancedCommercialData =
    new EnhancedCommercialDataAPI.EnhancedCommercialData(this._client);
}

Events.EnhancedCommercialData = EnhancedCommercialData;

export declare namespace Events {
  export { EnhancedCommercialData as EnhancedCommercialData, type EnhancedData as EnhancedData };
}
