// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Lithic from 'lithic';

const client = new Lithic({
  apiKey: 'My Lithic API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource responderEndpoints', () => {
  test('create', async () => {
    const responsePromise = client.responderEndpoints.create({});
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism errors when accept header set but no request body is defined
  test.skip('delete: only required params', async () => {
    const responsePromise = client.responderEndpoints.delete({ type: 'AUTH_STREAM_ACCESS' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism errors when accept header set but no request body is defined
  test.skip('delete: required and optional params', async () => {
    const response = await client.responderEndpoints.delete({ type: 'AUTH_STREAM_ACCESS' });
  });

  test('checkStatus: only required params', async () => {
    const responsePromise = client.responderEndpoints.checkStatus({ type: 'AUTH_STREAM_ACCESS' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('checkStatus: required and optional params', async () => {
    const response = await client.responderEndpoints.checkStatus({ type: 'AUTH_STREAM_ACCESS' });
  });
});
