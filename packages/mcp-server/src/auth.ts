// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { IncomingMessage } from 'node:http';
import { ClientOptions } from 'lithic';
import { McpOptions } from './options';

export const parseClientAuthHeaders = (req: IncomingMessage, required?: boolean): Partial<ClientOptions> => {
  const apiKey =
    Array.isArray(req.headers['x-lithic-api-key']) ?
      req.headers['x-lithic-api-key'][0]
    : req.headers['x-lithic-api-key'];
  return { apiKey };
};

export const parseBaseUrlHeader = (req: IncomingMessage): Record<string, string> => {
  const baseUrl =
    Array.isArray(req.headers['x-base-url']) ? req.headers['x-base-url'][0] : req.headers['x-base-url'];
  return baseUrl ? { baseUrl } : {};
};

export const getStainlessApiKey = (req: IncomingMessage, mcpOptions: McpOptions): string | undefined => {
  // Try to get the key from the x-stainless-api-key header
  const headerKey =
    Array.isArray(req.headers['x-stainless-api-key']) ?
      req.headers['x-stainless-api-key'][0]
    : req.headers['x-stainless-api-key'];
  if (headerKey && typeof headerKey === 'string') {
    return headerKey;
  }

  // Fall back to value set in the mcpOptions (e.g. from environment variable), if provided
  return mcpOptions.stainlessApiKey;
};
