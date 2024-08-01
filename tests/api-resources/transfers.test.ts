// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Lithic from 'lithic';
import { Response } from 'node-fetch';

const client = new Lithic({
  apiKey: 'My Lithic API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource transfers', () => {
  test('create: only required params', async () => {
    const responsePromise = client.transfers.create({
      amount: 0,
      from: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
      to: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('create: required and optional params', async () => {
    const response = await client.transfers.create({
      amount: 0,
      from: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
      to: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
      token: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
      memo: 'memo',
    });
  });
});
