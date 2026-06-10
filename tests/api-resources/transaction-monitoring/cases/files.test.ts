// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Lithic from 'lithic';

const client = new Lithic({
  apiKey: 'My Lithic API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource files', () => {
  test('create: only required params', async () => {
    const responsePromise = client.transactionMonitoring.cases.files.create(
      '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
      { name: 'name' },
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
    const response = await client.transactionMonitoring.cases.files.create(
      '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
      { name: 'name' },
    );
  });

  test('retrieve: only required params', async () => {
    const responsePromise = client.transactionMonitoring.cases.files.retrieve(
      '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
      { case_token: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e' },
    );
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('retrieve: required and optional params', async () => {
    const response = await client.transactionMonitoring.cases.files.retrieve(
      '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
      { case_token: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e' },
    );
  });

  test('list', async () => {
    const responsePromise = client.transactionMonitoring.cases.files.list(
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
      client.transactionMonitoring.cases.files.list(
        '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
        {
          ending_before: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
          page_size: 1,
          starting_after: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Lithic.NotFoundError);
  });

  test('delete: only required params', async () => {
    const responsePromise = client.transactionMonitoring.cases.files.delete(
      '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
      { case_token: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e' },
    );
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('delete: required and optional params', async () => {
    const response = await client.transactionMonitoring.cases.files.delete(
      '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
      { case_token: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e' },
    );
  });
});
