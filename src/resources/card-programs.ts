// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import { isRequestOptions } from '../core';
import * as Core from '../core';
import { CursorPage, type CursorPageParams } from '../pagination';

export class CardPrograms extends APIResource {
  /**
   * Get card program.
   *
   * @example
   * ```ts
   * const cardProgram = await client.cardPrograms.retrieve(
   *   '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   * );
   * ```
   */
  retrieve(cardProgramToken: string, options?: Core.RequestOptions): Core.APIPromise<CardProgram> {
    return this._client.get(`/v1/card_programs/${cardProgramToken}`, options);
  }

  /**
   * List card programs.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const cardProgram of client.cardPrograms.list()) {
   *   // ...
   * }
   * ```
   */
  list(
    query?: CardProgramListParams,
    options?: Core.RequestOptions,
  ): Core.PagePromise<CardProgramsCursorPage, CardProgram>;
  list(options?: Core.RequestOptions): Core.PagePromise<CardProgramsCursorPage, CardProgram>;
  list(
    query: CardProgramListParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.PagePromise<CardProgramsCursorPage, CardProgram> {
    if (isRequestOptions(query)) {
      return this.list({}, query);
    }
    return this._client.getAPIList('/v1/card_programs', CardProgramsCursorPage, { query, ...options });
  }
}

export class CardProgramsCursorPage extends CursorPage<CardProgram> {}

export interface CardProgram {
  /**
   * Globally unique identifier.
   */
  token: string;

  /**
   * Whether the card program is participating in Account Level Management. Currently
   * applicable to Visa card programs only.
   */
  account_level_management_enabled: boolean;

  /**
   * Timestamp of when the card program was created.
   */
  created: string;

  /**
   * The name of the card program.
   */
  name: string;

  /**
   * The first digits of the card number that this card program ends with.
   */
  pan_range_end: string;

  /**
   * The first digits of the card number that this card program starts with.
   */
  pan_range_start: string;

  /**
   * 3-character alphabetic ISO 4217 code for the currency of the cardholder.
   */
  cardholder_currency?: string;

  /**
   * List of 3-character alphabetic ISO 4217 codes for the currencies that the card
   * program supports for settlement.
   */
  settlement_currencies?: Array<string>;
}

export interface CardProgramListParams extends CursorPageParams {}

CardPrograms.CardProgramsCursorPage = CardProgramsCursorPage;

export declare namespace CardPrograms {
  export {
    type CardProgram as CardProgram,
    CardProgramsCursorPage as CardProgramsCursorPage,
    type CardProgramListParams as CardProgramListParams,
  };
}
