// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Lithic from 'lithic';

const client = new Lithic({
  apiKey: 'My Lithic API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource interestTierSchedule', () => {
  test('create: only required params', async () => {
    const responsePromise = client.financialAccounts.interestTierSchedule.create(
      '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
      { credit_product_token: 'credit_product_token', effective_date: '2019-12-27' },
    );
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('create: required and optional params', async () => {
    const response = await client.financialAccounts.interestTierSchedule.create(
      '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
      {
        credit_product_token: 'credit_product_token',
        effective_date: '2019-12-27',
        tier_name: 'tier_name',
        tier_rates: {},
      },
    );
  });

  test('retrieve: only required params', async () => {
    const responsePromise = client.financialAccounts.interestTierSchedule.retrieve('2019-12-27', {
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

  test('retrieve: required and optional params', async () => {
    const response = await client.financialAccounts.interestTierSchedule.retrieve('2019-12-27', {
      financial_account_token: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
    });
  });

  test('update: only required params', async () => {
    const responsePromise = client.financialAccounts.interestTierSchedule.update('2019-12-27', {
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

  test('update: required and optional params', async () => {
    const response = await client.financialAccounts.interestTierSchedule.update('2019-12-27', {
      financial_account_token: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
      tier_name: 'tier_name',
      tier_rates: {},
    });
  });

  test('list', async () => {
    const responsePromise = client.financialAccounts.interestTierSchedule.list(
      '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
    );
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
      client.financialAccounts.interestTierSchedule.list(
        '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
        {
          after_date: '2019-12-27',
          before_date: '2019-12-27',
          for_date: '2019-12-27',
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Lithic.NotFoundError);
  });

  test('delete: only required params', async () => {
    const responsePromise = client.financialAccounts.interestTierSchedule.delete('2019-12-27', {
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

  test('delete: required and optional params', async () => {
    const response = await client.financialAccounts.interestTierSchedule.delete('2019-12-27', {
      financial_account_token: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
    });
  });
});
