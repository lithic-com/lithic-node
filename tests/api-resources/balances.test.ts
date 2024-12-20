// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Lithic from 'lithic';
import { Response } from 'node-fetch';

const client = new Lithic({
  apiKey: 'My Lithic API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource balances', () => {
  test('list', async () => {
    const responsePromise = client.balances.list();
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
    await expect(client.balances.list({ path: '/_stainless_unknown_path' })).rejects.toThrow(
      Lithic.NotFoundError,
    );
  });

  test('list: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.balances.list(
        {
          account_token: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
          balance_date: '2019-12-27T18:11:19.117Z',
          business_account_token: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
          financial_account_type: 'ISSUING',
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Lithic.NotFoundError);
  });
});
