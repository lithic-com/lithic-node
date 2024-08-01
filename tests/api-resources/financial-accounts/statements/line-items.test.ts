// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Lithic from 'lithic';
import { Response } from 'node-fetch';

const client = new Lithic({
  apiKey: 'My Lithic API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource lineItems', () => {
  test('list', async () => {
    const responsePromise = client.financialAccounts.statements.lineItems.list(
      '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
      'statement_token',
    );
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
    await expect(
      client.financialAccounts.statements.lineItems.list(
        '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
        'statement_token',
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Lithic.NotFoundError);
  });

  test('list: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.financialAccounts.statements.lineItems.list(
        '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
        'statement_token',
        { ending_before: 'ending_before', page_size: 1, starting_after: 'starting_after' },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Lithic.NotFoundError);
  });
});
