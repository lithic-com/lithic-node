// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Lithic from 'lithic';
import { Response } from 'node-fetch';

const lithic = new Lithic({
  apiKey: 'My Lithic API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource tokenizations', () => {
  test('retrieve', async () => {
    const responsePromise = lithic.tokenizations.retrieve('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e');
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
      lithic.tokenizations.retrieve('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {
        path: '/_stainless_unknown_path',
      }),
    ).rejects.toThrow(Lithic.NotFoundError);
  });

  test('list', async () => {
    const responsePromise = lithic.tokenizations.list();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('list: request options instead of params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(lithic.tokenizations.list({ path: '/_stainless_unknown_path' })).rejects.toThrow(
      Lithic.NotFoundError,
    );
  });

  test('list: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      lithic.tokenizations.list(
        {
          account_token: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
          begin: '2019-12-27',
          card_token: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
          end: '2019-12-27',
          ending_before: 'string',
          page_size: 1,
          starting_after: 'string',
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Lithic.NotFoundError);
  });

  test('simulate: only required params', async () => {
    const responsePromise = lithic.tokenizations.simulate({
      cvv: '776',
      expiration_date: '08/29',
      pan: '4111111289144142',
      tokenization_source: 'APPLE_PAY',
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
    const response = await lithic.tokenizations.simulate({
      cvv: '776',
      expiration_date: '08/29',
      pan: '4111111289144142',
      tokenization_source: 'APPLE_PAY',
      account_score: 5,
      device_score: 5,
      wallet_recommended_decision: 'APPROVED',
    });
  });
});
