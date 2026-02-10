// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Lithic from 'lithic';

const client = new Lithic({
  apiKey: 'My Lithic API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource v2', () => {
  test('create: only required params', async () => {
    const responsePromise = client.authRules.v2.create({
      parameters: {
        conditions: [
          {
            attribute: 'MCC',
            operation: 'IS_ONE_OF',
            value: 'string',
          },
        ],
      },
      type: 'CONDITIONAL_BLOCK',
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
    const response = await client.authRules.v2.create({
      parameters: {
        conditions: [
          {
            attribute: 'MCC',
            operation: 'IS_ONE_OF',
            value: 'string',
          },
        ],
      },
      type: 'CONDITIONAL_BLOCK',
      account_tokens: ['182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e'],
      business_account_tokens: ['182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e'],
      event_stream: 'AUTHORIZATION',
      name: 'name',
    });
  });

  test('retrieve', async () => {
    const responsePromise = client.authRules.v2.retrieve('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('update', async () => {
    const responsePromise = client.authRules.v2.update('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {});
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('list', async () => {
    const responsePromise = client.authRules.v2.list();
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
      client.authRules.v2.list(
        {
          account_token: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
          business_account_token: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
          card_token: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
          ending_before: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
          event_stream: 'AUTHORIZATION',
          event_streams: ['AUTHORIZATION'],
          page_size: 1,
          scope: 'PROGRAM',
          starting_after: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Lithic.NotFoundError);
  });

  test('delete', async () => {
    const responsePromise = client.authRules.v2.delete('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('draft', async () => {
    const responsePromise = client.authRules.v2.draft('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {});
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('listResults', async () => {
    const responsePromise = client.authRules.v2.listResults();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('listResults: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.authRules.v2.listResults(
        {
          auth_rule_token: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
          ending_before: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
          event_token: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
          has_actions: true,
          page_size: 1,
          starting_after: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Lithic.NotFoundError);
  });

  test('promote', async () => {
    const responsePromise = client.authRules.v2.promote('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('retrieveFeatures', async () => {
    const responsePromise = client.authRules.v2.retrieveFeatures('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('retrieveFeatures: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.authRules.v2.retrieveFeatures(
        '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
        {
          account_token: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
          card_token: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Lithic.NotFoundError);
  });

  test('retrieveReport: only required params', async () => {
    const responsePromise = client.authRules.v2.retrieveReport('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {
      begin: '2019-12-27',
      end: '2019-12-27',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('retrieveReport: required and optional params', async () => {
    const response = await client.authRules.v2.retrieveReport('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {
      begin: '2019-12-27',
      end: '2019-12-27',
    });
  });
});
