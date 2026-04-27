// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { CursorPage, type CursorPageParams, PagePromise } from '../core/pagination';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

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
  retrieve(cardProgramToken: string, options?: RequestOptions): APIPromise<CardProgram> {
    return this._client.get(path`/v1/card_programs/${cardProgramToken}`, options);
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
    query: CardProgramListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<CardProgramsCursorPage, CardProgram> {
    return this._client.getAPIList('/v1/card_programs', CursorPage<CardProgram>, { query, ...options });
  }
}

export type CardProgramsCursorPage = CursorPage<CardProgram>;

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

export declare namespace CardPrograms {
  export {
    type CardProgram as CardProgram,
    type CardProgramsCursorPage as CardProgramsCursorPage,
    type CardProgramListParams as CardProgramListParams,
  };
}
