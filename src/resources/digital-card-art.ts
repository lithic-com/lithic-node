// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import { isRequestOptions } from '../core';
import * as Core from '../core';
import { CursorPage, type CursorPageParams } from '../pagination';

export class DigitalCardArtResource extends APIResource {
  /**
   * Get digital card art by token.
   */
  retrieve(digitalCardArtToken: string, options?: Core.RequestOptions): Core.APIPromise<DigitalCardArt> {
    return this._client.get(`/v1/digital_card_art/${digitalCardArtToken}`, options);
  }

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
    return this._client.getAPIList('/v1/digital_card_art', DigitalCardArtsCursorPage, { query, ...options });
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

  /**
   * Whether the card art is the default card art to be added upon tokenization.
   */
  is_card_program_default?: boolean;
}

export interface DigitalCardArtListParams extends CursorPageParams {}

DigitalCardArtResource.DigitalCardArtsCursorPage = DigitalCardArtsCursorPage;

export declare namespace DigitalCardArtResource {
  export {
    type DigitalCardArt as DigitalCardArt,
    DigitalCardArtsCursorPage as DigitalCardArtsCursorPage,
    type DigitalCardArtListParams as DigitalCardArtListParams,
  };
}
