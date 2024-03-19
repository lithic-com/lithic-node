// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import * as Core from 'lithic/core';
import { APIResource } from 'lithic/resource';
import * as ResponderEndpointsAPI from 'lithic/resources/responder-endpoints';

export class ResponderEndpoints extends APIResource {
  /**
   * Enroll a responder endpoint
   */
  create(
    body: ResponderEndpointCreateParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<ResponderEndpointCreateResponse> {
    return this._client.post('/responder_endpoints', { body, ...options });
  }

  /**
   * Disenroll a responder endpoint
   */
  del(params: ResponderEndpointDeleteParams, options?: Core.RequestOptions): Core.APIPromise<void> {
    const { type } = params;
    return this._client.delete('/responder_endpoints', { query: { type }, ...options });
  }

  /**
   * Check the status of a responder endpoint
   */
  checkStatus(
    query: ResponderEndpointCheckStatusParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<ResponderEndpointStatus> {
    return this._client.get('/responder_endpoints', { query, ...options });
  }
}

export interface ResponderEndpointStatus {
  /**
   * True if the instance has an endpoint enrolled.
   */
  enrolled?: boolean;

  /**
   * The URL of the currently enrolled endpoint or null.
   */
  url?: string | null;
}

export interface ResponderEndpointCreateResponse {
  /**
   * True if the endpoint was enrolled successfully.
   */
  enrolled?: boolean;
}

export interface ResponderEndpointCreateParams {
  /**
   * The type of the endpoint.
   */
  type?: 'AUTH_STREAM_ACCESS' | 'THREE_DS_DECISIONING' | 'TOKENIZATION_DECISIONING';

  /**
   * The URL for the responder endpoint (must be http(s)).
   */
  url?: string;
}

export interface ResponderEndpointDeleteParams {
  /**
   * The type of the endpoint.
   */
  type: 'AUTH_STREAM_ACCESS' | 'THREE_DS_DECISIONING' | 'TOKENIZATION_DECISIONING';
}

export interface ResponderEndpointCheckStatusParams {
  /**
   * The type of the endpoint.
   */
  type: 'AUTH_STREAM_ACCESS' | 'THREE_DS_DECISIONING' | 'TOKENIZATION_DECISIONING';
}

export namespace ResponderEndpoints {
  export import ResponderEndpointStatus = ResponderEndpointsAPI.ResponderEndpointStatus;
  export import ResponderEndpointCreateResponse = ResponderEndpointsAPI.ResponderEndpointCreateResponse;
  export import ResponderEndpointCreateParams = ResponderEndpointsAPI.ResponderEndpointCreateParams;
  export import ResponderEndpointDeleteParams = ResponderEndpointsAPI.ResponderEndpointDeleteParams;
  export import ResponderEndpointCheckStatusParams = ResponderEndpointsAPI.ResponderEndpointCheckStatusParams;
}
