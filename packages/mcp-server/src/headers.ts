// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { IncomingMessage } from 'node:http';
import { ClientOptions } from 'lithic';

export const parseAuthHeaders = (req: IncomingMessage, required?: boolean): Partial<ClientOptions> => {
  const apiKey =
    Array.isArray(req.headers['x-lithic-api-key']) ?
      req.headers['x-lithic-api-key'][0]
    : req.headers['x-lithic-api-key'];
  return { apiKey };
};
