// File generated from our OpenAPI spec by Stainless.

import Lithic from 'lithic';
import { Response } from 'node-fetch';

const lithic = new Lithic({ apiKey: 'something1234', baseURL: 'http://127.0.0.1:4010' });

describe('resource responderEndpoints', () => {
  test('create', async () => {
    const responsePromise = lithic.responderEndpoints.create({});
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism errors when accept header set but no request body is defined
  test.skip('del: only required params', async () => {
    const responsePromise = lithic.responderEndpoints.del({ type: 'TOKENIZATION_DECISIONING' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism errors when accept header set but no request body is defined
  test.skip('del: required and optional params', async () => {
    const response = await lithic.responderEndpoints.del({ type: 'TOKENIZATION_DECISIONING' });
  });

  test('checkStatus: only required params', async () => {
    const responsePromise = lithic.responderEndpoints.checkStatus({ type: 'TOKENIZATION_DECISIONING' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('checkStatus: required and optional params', async () => {
    const response = await lithic.responderEndpoints.checkStatus({ type: 'TOKENIZATION_DECISIONING' });
  });
});
