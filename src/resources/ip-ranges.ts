// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

export class IPRanges extends APIResource {
  /**
   * Returns the IP addresses Lithic sends responder requests from (Auth Stream
   * Access, 3DS decisioning, and tokenization decisioning), so you can allowlist
   * them in your firewall. Each environment returns its own set of addresses. Lithic
   * announces new addresses at least 30 days before sending traffic from them. Event
   * webhooks are not sent from these addresses
   */
  retrieve(options?: RequestOptions): APIPromise<IPRangeRetrieveResponse> {
    return this._client.get('/v1/ip_ranges', options);
  }
}

export interface IPRangeRetrieveResponse {
  /**
   * IP ranges that responder requests are sent from, in CIDR notation
   */
  responders: Array<string>;

  /**
   * Date and time the IP ranges were last changed
   */
  updated: string;
}

export declare namespace IPRanges {
  export { type IPRangeRetrieveResponse as IPRangeRetrieveResponse };
}
