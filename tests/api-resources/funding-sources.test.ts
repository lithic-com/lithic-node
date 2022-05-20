// File generated from our OpenAPI spec by Stainless.

import Lithic from '../../index';
const client = new Lithic({ apiKey: 'something1234', baseURL: 'http://127.0.0.1:4010' });

describe('resource funding_sources', () => {
  test('create: only required params', async () => {
    const response = await client.fundingSources.create({
      validation_method: 'PLAID',
      processor_token: 'mighmuxoicimans',
    });
  });

  test('create: required and optional params', async () => {
    const response = await client.fundingSources.create({
      validation_method: 'PLAID',
      account_token: '3adb9ab4-d9dc-4efb-851b-af9b327c3bc3',
      processor_token: 'yirfhdboygaezlrk',
    });
  });

  test('update: only required params', async () => {
    const response = await client.fundingSources.update('0e32e31d-6a17-4423-9393-cd33b1818319', {});
  });

  test('update: required and optional params', async () => {
    const response = await client.fundingSources.update('0e32e31d-6a17-4423-9393-cd33b1818319', {
      account_token: '2afd4504-41a7-4b7b-8283-151d279a0b1a',
      state: 'DELETED',
    });
  });

  test('list: only required params', async () => {
    const response = await client.fundingSources.list();
  });

  test('list: required and optional params', async () => {
    const response = await client.fundingSources.list({
      account_token: '1f937d58-4fc0-41bf-af15-e7c938c8adbd',
    });
  });

  test('list: request options instead of params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(client.fundingSources.list({ path: '/_stainless_unknown_path' })).rejects.toThrow(
      Lithic.NotFoundError,
    );
  });

  test('list: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.fundingSources.list(
        { account_token: 'fa0f84e0-d765-43c1-9e49-90803a169b65' },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Lithic.NotFoundError);
  });

  test('verify: only required params', async () => {
    const response = await client.fundingSources.verify('32702a58-7d21-4791-8439-5644ec89a69c', {
      micro_deposits: [0, 7, 7],
    });
  });

  test('verify: required and optional params', async () => {
    const response = await client.fundingSources.verify('32702a58-7d21-4791-8439-5644ec89a69c', {
      account_token: '4a93432b-5efc-4ecf-bcd2-6cf1d26150c9',
      micro_deposits: [3, 19, 20],
    });
  });
});
