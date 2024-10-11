// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Lithic from 'lithic';
import { Response } from 'node-fetch';

const client = new Lithic({
  apiKey: 'My Lithic API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource authentication', () => {
  test('retrieve', async () => {
    const responsePromise = client.threeDS.authentication.retrieve('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('retrieve: request options instead of params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.threeDS.authentication.retrieve('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {
        path: '/_stainless_unknown_path',
      }),
    ).rejects.toThrow(Lithic.NotFoundError);
  });

  test('simulate: only required params', async () => {
    const responsePromise = client.threeDS.authentication.simulate({
      merchant: { id: 'OODKZAPJVN4YS7O', country: 'USA', mcc: '5812', name: 'COFFEE SHOP' },
      pan: '4111111289144142',
      transaction: { amount: 100, currency: 'USD' },
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('simulate: required and optional params', async () => {
    const response = await client.threeDS.authentication.simulate({
      merchant: { id: 'OODKZAPJVN4YS7O', country: 'USA', mcc: '5812', name: 'COFFEE SHOP' },
      pan: '4111111289144142',
      transaction: { amount: 100, currency: 'USD' },
      card_expiry_check: 'MATCH',
    });
  });
});
