// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../resource';
import * as ExtendedCreditAPI from './extended-credit';
import { ExtendedCredit, ExtendedCreditResource } from './extended-credit';

export class CreditProducts extends APIResource {
  extendedCredit: ExtendedCreditAPI.ExtendedCreditResource = new ExtendedCreditAPI.ExtendedCreditResource(
    this._client,
  );
}

CreditProducts.ExtendedCreditResource = ExtendedCreditResource;

export declare namespace CreditProducts {
  export { ExtendedCreditResource as ExtendedCreditResource, type ExtendedCredit as ExtendedCredit };
}
