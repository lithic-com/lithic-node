// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import type { Lithic } from './index';

export abstract class APIResource {
  protected _client: Lithic;

  constructor(client: Lithic) {
    this._client = client;
  }
}
