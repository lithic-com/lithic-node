// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as ExtendedCreditAPI from './extended-credit';
import { ExtendedCredit, ExtendedCreditResource } from './extended-credit';
import * as PrimeRatesAPI from './prime-rates';
import {
  PrimeRateCreateParams,
  PrimeRateRetrieveParams,
  PrimeRateRetrieveResponse,
  PrimeRates,
} from './prime-rates';

export class CreditProducts extends APIResource {
  extendedCredit: ExtendedCreditAPI.ExtendedCreditResource = new ExtendedCreditAPI.ExtendedCreditResource(
    this._client,
  );
  primeRates: PrimeRatesAPI.PrimeRates = new PrimeRatesAPI.PrimeRates(this._client);
}

CreditProducts.ExtendedCreditResource = ExtendedCreditResource;
CreditProducts.PrimeRates = PrimeRates;

export declare namespace CreditProducts {
  export { ExtendedCreditResource as ExtendedCreditResource, type ExtendedCredit as ExtendedCredit };

  export {
    PrimeRates as PrimeRates,
    type PrimeRateRetrieveResponse as PrimeRateRetrieveResponse,
    type PrimeRateCreateParams as PrimeRateCreateParams,
    type PrimeRateRetrieveParams as PrimeRateRetrieveParams,
  };
}
