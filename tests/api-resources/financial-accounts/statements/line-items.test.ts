// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Lithic from 'lithic';

const client = new Lithic({
  apiKey: 'My Lithic API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource lineItems', () => {
  test('list: only required params', async () => {
    const responsePromise = client.financialAccounts.statements.lineItems.list('statement_token', {
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

  test('list: required and optional params', async () => {
    const response = await client.financialAccounts.statements.lineItems.list('statement_token', {
      financial_account_token: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
      ending_before: 'ending_before',
      page_size: 1,
      starting_after: 'starting_after',
    });
  });
});
