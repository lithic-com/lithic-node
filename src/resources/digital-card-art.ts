// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { CursorPage, type CursorPageParams, PagePromise } from '../core/pagination';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class DigitalCardArtResource extends APIResource {
  /**
   * Get digital card art by token.
   */
  retrieve(digitalCardArtToken: string, options?: RequestOptions): APIPromise<DigitalCardArt> {
    return this._client.get(path`/v1/digital_card_art/${digitalCardArtToken}`, options);
  }

  /**
   * List digital card art.
   */
  list(
    query: DigitalCardArtListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<DigitalCardArtsCursorPage, DigitalCardArt> {
    return this._client.getAPIList('/v1/digital_card_art', CursorPage<DigitalCardArt>, { query, ...options });
  }
}

export type DigitalCardArtsCursorPage = CursorPage<DigitalCardArt>;

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

export declare namespace DigitalCardArtResource {
  export {
    type DigitalCardArt as DigitalCardArt,
    type DigitalCardArtsCursorPage as DigitalCardArtsCursorPage,
    type DigitalCardArtListParams as DigitalCardArtListParams,
  };
}
