// File generated from our OpenAPI spec by Stainless.

import * as Core from 'lithic/core';
import { APIResource } from 'lithic/resource';
import { isRequestOptions } from 'lithic/core';
import * as CardProgramsAPI from 'lithic/resources/card-programs';
import { CursorPage, type CursorPageParams } from 'lithic/pagination';

export class CardPrograms extends APIResource {
  /**
   * Get card program.
   */
  retrieve(cardProgramToken: string, options?: Core.RequestOptions): Core.APIPromise<CardProgram> {
    return this._client.get(`/card_programs/${cardProgramToken}`, options);
  }

  /**
   * List card programs.
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
    return this._client.getAPIList('/card_programs', CardProgramsCursorPage, { query, ...options });
  }
}

export class CardProgramsCursorPage extends CursorPage<CardProgram> {}

export interface CardProgram {
  /**
   * Globally unique identifier.
   */
  token: string;

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
}

export interface CardProgramListParams extends CursorPageParams {}

export namespace CardPrograms {
  export import CardProgram = CardProgramsAPI.CardProgram;
  export import CardProgramsCursorPage = CardProgramsAPI.CardProgramsCursorPage;
  export import CardProgramListParams = CardProgramsAPI.CardProgramListParams;
}
