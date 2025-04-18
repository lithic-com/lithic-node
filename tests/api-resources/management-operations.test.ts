// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Lithic from 'lithic';
import { Response } from 'node-fetch';

const client = new Lithic({
  apiKey: 'My Lithic API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource managementOperations', () => {
  test('create: only required params', async () => {
    const responsePromise = client.managementOperations.create({
      amount: 0,
      category: 'MANAGEMENT_FEE',
      direction: 'CREDIT',
      effective_date: '2019-12-27',
      event_type: 'LOSS_WRITE_OFF',
      financial_account_token: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
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
    const response = await client.managementOperations.create({
      amount: 0,
      category: 'MANAGEMENT_FEE',
      direction: 'CREDIT',
      effective_date: '2019-12-27',
      event_type: 'LOSS_WRITE_OFF',
      financial_account_token: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
      token: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
      memo: 'memo',
      subtype: 'subtype',
      user_defined_id: 'user_defined_id',
    });
  });

  test('retrieve', async () => {
    const responsePromise = client.managementOperations.retrieve('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e');
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
      client.managementOperations.retrieve('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {
        path: '/_stainless_unknown_path',
      }),
    ).rejects.toThrow(Lithic.NotFoundError);
  });

  test('list', async () => {
    const responsePromise = client.managementOperations.list();
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
    await expect(client.managementOperations.list({ path: '/_stainless_unknown_path' })).rejects.toThrow(
      Lithic.NotFoundError,
    );
  });

  test('list: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.managementOperations.list(
        {
          begin: '2019-12-27T18:11:19.117Z',
          business_account_token: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
          category: 'MANAGEMENT_FEE',
          end: '2019-12-27T18:11:19.117Z',
          ending_before: 'ending_before',
          financial_account_token: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
          page_size: 1,
          starting_after: 'starting_after',
          status: 'PENDING',
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Lithic.NotFoundError);
  });

  test('reverse: only required params', async () => {
    const responsePromise = client.managementOperations.reverse('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {
      effective_date: '2019-12-27',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('reverse: required and optional params', async () => {
    const response = await client.managementOperations.reverse('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {
      effective_date: '2019-12-27',
      memo: 'memo',
    });
  });
});
