// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../resource';
import * as ExtendedCreditAPI from './extended-credit';

export class CreditProducts extends APIResource {
  extendedCredit: ExtendedCreditAPI.ExtendedCreditResource = new ExtendedCreditAPI.ExtendedCreditResource(
    this._client,
  );
}

export namespace CreditProducts {
  export import ExtendedCreditResource = ExtendedCreditAPI.ExtendedCreditResource;
  export import ExtendedCredit = ExtendedCreditAPI.ExtendedCredit;
}
