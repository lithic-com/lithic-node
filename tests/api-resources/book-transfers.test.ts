// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Lithic from 'lithic';

const client = new Lithic({
  apiKey: 'My Lithic API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource bookTransfers', () => {
  test('create: only required params', async () => {
    const responsePromise = client.bookTransfers.create({
      amount: 1,
      category: 'ADJUSTMENT',
      from_financial_account_token: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
      subtype: 'subtype',
      to_financial_account_token: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
      type: 'ATM_BALANCE_INQUIRY',
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
    const response = await client.bookTransfers.create({
      amount: 1,
      category: 'ADJUSTMENT',
      from_financial_account_token: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
      subtype: 'subtype',
      to_financial_account_token: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
      type: 'ATM_BALANCE_INQUIRY',
      token: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
      external_id: 'external_id',
      memo: 'memo',
      on_closed_account: 'FAIL',
    });
  });

  test('retrieve', async () => {
    const responsePromise = client.bookTransfers.retrieve('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('list', async () => {
    const responsePromise = client.bookTransfers.list();
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
      client.bookTransfers.list(
        {
          account_token: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
          begin: '2019-12-27T18:11:19.117Z',
          business_account_token: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
          category: 'ADJUSTMENT',
          end: '2019-12-27T18:11:19.117Z',
          ending_before: 'ending_before',
          financial_account_token: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
          page_size: 1,
          result: 'APPROVED',
          starting_after: 'starting_after',
          status: 'DECLINED',
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Lithic.NotFoundError);
  });

  test('reverse', async () => {
    const responsePromise = client.bookTransfers.reverse('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {});
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });
});
