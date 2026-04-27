// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Lithic from 'lithic';

const client = new Lithic({
  apiKey: 'My Lithic API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource externalPayments', () => {
  test('create: only required params', async () => {
    const responsePromise = client.externalPayments.create({
      amount: 0,
      category: 'EXTERNAL_WIRE',
      effective_date: '2019-12-27',
      financial_account_token: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
      payment_type: 'DEPOSIT',
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
    const response = await client.externalPayments.create({
      amount: 0,
      category: 'EXTERNAL_WIRE',
      effective_date: '2019-12-27',
      financial_account_token: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
      payment_type: 'DEPOSIT',
      token: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
      memo: 'memo',
      progress_to: 'SETTLED',
      user_defined_id: 'user_defined_id',
    });
  });

  test('retrieve', async () => {
    const responsePromise = client.externalPayments.retrieve('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('list', async () => {
    const responsePromise = client.externalPayments.list();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('list: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.externalPayments.list(
        {
          begin: '2019-12-27T18:11:19.117Z',
          business_account_token: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
          category: 'EXTERNAL_WIRE',
          end: '2019-12-27T18:11:19.117Z',
          ending_before: 'ending_before',
          financial_account_token: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
          page_size: 1,
          result: 'APPROVED',
          starting_after: 'starting_after',
          status: 'PENDING',
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Lithic.NotFoundError);
  });

  test('cancel: only required params', async () => {
    const responsePromise = client.externalPayments.cancel('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {
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

  test('cancel: required and optional params', async () => {
    const response = await client.externalPayments.cancel('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {
      effective_date: '2019-12-27',
      memo: 'memo',
    });
  });

  test('release: only required params', async () => {
    const responsePromise = client.externalPayments.release('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {
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

  test('release: required and optional params', async () => {
    const response = await client.externalPayments.release('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {
      effective_date: '2019-12-27',
      memo: 'memo',
    });
  });

  test('reverse: only required params', async () => {
    const responsePromise = client.externalPayments.reverse('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {
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
    const response = await client.externalPayments.reverse('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {
      effective_date: '2019-12-27',
      memo: 'memo',
    });
  });

  test('settle: only required params', async () => {
    const responsePromise = client.externalPayments.settle('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {
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

  test('settle: required and optional params', async () => {
    const response = await client.externalPayments.settle('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {
      effective_date: '2019-12-27',
      memo: 'memo',
      progress_to: 'SETTLED',
    });
  });
});
