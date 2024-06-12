// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Lithic from 'lithic';
import { Response } from 'node-fetch';

const lithic = new Lithic({
  apiKey: 'My Lithic API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource bookTransfers', () => {
  test('create: only required params', async () => {
    const responsePromise = lithic.bookTransfers.create({
      amount: 1,
      category: 'ADJUSTMENT',
      from_financial_account_token: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
      subtype: 'string',
      to_financial_account_token: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
      type: 'ATM_WITHDRAWAL',
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
    const response = await lithic.bookTransfers.create({
      amount: 1,
      category: 'ADJUSTMENT',
      from_financial_account_token: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
      subtype: 'string',
      to_financial_account_token: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
      type: 'ATM_WITHDRAWAL',
      token: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
      memo: 'string',
    });
  });

  test('retrieve', async () => {
    const responsePromise = lithic.bookTransfers.retrieve('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e');
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
      lithic.bookTransfers.retrieve('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {
        path: '/_stainless_unknown_path',
      }),
    ).rejects.toThrow(Lithic.NotFoundError);
  });

  test('list', async () => {
    const responsePromise = lithic.bookTransfers.list();
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
    await expect(lithic.bookTransfers.list({ path: '/_stainless_unknown_path' })).rejects.toThrow(
      Lithic.NotFoundError,
    );
  });

  test('list: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      lithic.bookTransfers.list(
        {
          begin: '2019-12-27T18:11:19.117Z',
          category: 'BALANCE_OR_FUNDING',
          end: '2019-12-27T18:11:19.117Z',
          ending_before: 'string',
          financial_account_token: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
          page_size: 1,
          result: 'APPROVED',
          starting_after: 'string',
          status: 'DECLINED',
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Lithic.NotFoundError);
  });
});
