// File generated from our OpenAPI spec by Stainless.

import * as Core from '~/core';
import { APIResource } from '~/resource';
import * as API from './';

export class ResponderEndpoints extends APIResource {
  /**
   * Enroll a responder endpoint
   */
  create(
    body: ResponderEndpointCreateParams,
    options?: Core.RequestOptions,
  ): Promise<Core.APIResponse<ResponderEndpointCreateResponse>> {
    return this.post('/responder_endpoints', { body, ...options });
  }

  /**
   * Disenroll a responder endpoint
   */
  del(
    body: ResponderEndpointDeleteParams,
    options?: Core.RequestOptions,
  ): Promise<Core.APIResponse<Promise<void>>> {
    const { type } = body;
    return this.delete('/responder_endpoints', { query: { type }, ...options });
  }

  /**
   * Check the status of a responder endpoint
   */
  checkStatus(
    query: ResponderEndpointCheckStatusParams,
    options?: Core.RequestOptions,
  ): Promise<Core.APIResponse<ResponderEndpointStatus>> {
    return this.get('/responder_endpoints', { query, ...options });
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
  type?: 'TOKENIZATION_DECISIONING';

  /**
   * The URL for the responder endpoint (must be http(s)).
   */
  url?: string;
}

export interface ResponderEndpointDeleteParams {
  /**
   * The type of the endpoint.
   */
  type: 'TOKENIZATION_DECISIONING';
}

export interface ResponderEndpointCheckStatusParams {
  /**
   * The type of the endpoint.
   */
  type: 'TOKENIZATION_DECISIONING';
}

export namespace ResponderEndpoints {
  export import ResponderEndpointStatus = API.ResponderEndpointStatus;
  export import ResponderEndpointCreateResponse = API.ResponderEndpointCreateResponse;
  export import ResponderEndpointCreateParams = API.ResponderEndpointCreateParams;
  export import ResponderEndpointDeleteParams = API.ResponderEndpointDeleteParams;
  export import ResponderEndpointCheckStatusParams = API.ResponderEndpointCheckStatusParams;
}
