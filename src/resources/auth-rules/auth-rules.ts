// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../resource';
import * as V2API from './v2';
import {
  V2,
  V2ApplyParams,
  V2ApplyResponse,
  V2CreateParams,
  V2CreateResponse,
  V2DraftParams,
  V2DraftResponse,
  V2ListParams,
  V2ListResponse,
  V2ListResponsesCursorPage,
  V2PromoteResponse,
  V2ReportResponse,
  V2RetrieveResponse,
  V2UpdateParams,
  V2UpdateResponse,
} from './v2';

export class AuthRules extends APIResource {
  v2: V2API.V2 = new V2API.V2(this._client);
}

AuthRules.V2 = V2;
AuthRules.V2ListResponsesCursorPage = V2ListResponsesCursorPage;

export declare namespace AuthRules {
  export {
    V2 as V2,
    type V2CreateResponse as V2CreateResponse,
    type V2RetrieveResponse as V2RetrieveResponse,
    type V2UpdateResponse as V2UpdateResponse,
    type V2ListResponse as V2ListResponse,
    type V2ApplyResponse as V2ApplyResponse,
    type V2DraftResponse as V2DraftResponse,
    type V2PromoteResponse as V2PromoteResponse,
    type V2ReportResponse as V2ReportResponse,
    V2ListResponsesCursorPage as V2ListResponsesCursorPage,
    type V2CreateParams as V2CreateParams,
    type V2UpdateParams as V2UpdateParams,
    type V2ListParams as V2ListParams,
    type V2ApplyParams as V2ApplyParams,
    type V2DraftParams as V2DraftParams,
  };
}
