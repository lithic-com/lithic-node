// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../resource';
import * as EnhancedCommercialDataAPI from './enhanced-commercial-data';

export class Events extends APIResource {
  enhancedCommercialData: EnhancedCommercialDataAPI.EnhancedCommercialData =
    new EnhancedCommercialDataAPI.EnhancedCommercialData(this._client);
}

export namespace Events {
  export import EnhancedCommercialData = EnhancedCommercialDataAPI.EnhancedCommercialData;
  export type EnhancedData = EnhancedCommercialDataAPI.EnhancedData;
}
