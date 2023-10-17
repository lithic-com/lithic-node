// File generated from our OpenAPI spec by Stainless.

import * as Core from 'lithic/core';
import { APIResource } from 'lithic/resource';
import * as CardProductAPI from 'lithic/resources/card-product';

export class CardProduct extends APIResource {
  /**
   * Get the Credit Detail for the card product
   */
  creditDetail(options?: Core.RequestOptions): Core.APIPromise<CardProductCreditDetailResponse> {
    return this.get('/card_product/credit_detail', options);
  }
}

export interface CardProductCreditDetailResponse {
  /**
   * The amount of credit extended within the program
   */
  credit_extended: number;

  /**
   * The total credit limit of the program
   */
  credit_limit: number;
}

export namespace CardProduct {
  export import CardProductCreditDetailResponse = CardProductAPI.CardProductCreditDetailResponse;
}
