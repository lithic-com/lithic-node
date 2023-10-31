// File generated from our OpenAPI spec by Stainless.

import * as Core from 'lithic/core';
import { APIResource } from 'lithic/resource';
import { isRequestOptions } from 'lithic/core';
import * as DigitalCardArtAPI from 'lithic/resources/digital-card-art';
import { CursorPage, type CursorPageParams } from 'lithic/pagination';

export class DigitalCardArtResource extends APIResource {
  /**
   * List digital card art.
   */
  list(
    query?: DigitalCardArtListParams,
    options?: Core.RequestOptions,
  ): Core.PagePromise<DigitalCardArtsCursorPage, DigitalCardArt>;
  list(options?: Core.RequestOptions): Core.PagePromise<DigitalCardArtsCursorPage, DigitalCardArt>;
  list(
    query: DigitalCardArtListParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.PagePromise<DigitalCardArtsCursorPage, DigitalCardArt> {
    if (isRequestOptions(query)) {
      return this.list({}, query);
    }
    return this.getAPIList('/digital_card_art', DigitalCardArtsCursorPage, { query, ...options });
  }
}

export class DigitalCardArtsCursorPage extends CursorPage<DigitalCardArt> {}

export interface DigitalCardArt {
  /**
   * Globally unique identifier for the card art.
   */
  token: string;

  /**
   * Globally unique identifier for the card program.
   */
  card_program_token: string;

  /**
   * Timestamp of when card art was created.
   */
  created: string;

  /**
   * Description of the card art.
   */
  description: string;

  /**
   * Whether the card art is enabled.
   */
  is_enabled: boolean;

  /**
   * Card network.
   */
  network: 'MASTERCARD' | 'VISA';
}

export interface DigitalCardArtListParams extends CursorPageParams {}

export namespace DigitalCardArtResource {
  export import DigitalCardArt = DigitalCardArtAPI.DigitalCardArt;
  export import DigitalCardArtsCursorPage = DigitalCardArtAPI.DigitalCardArtsCursorPage;
  export import DigitalCardArtListParams = DigitalCardArtAPI.DigitalCardArtListParams;
}