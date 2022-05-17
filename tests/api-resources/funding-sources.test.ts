// File generated from our OpenAPI spec by Stainless.

import Lithic from '../../index';
const client = new Lithic({ apiKey: 'something1234', baseURL: 'http://127.0.0.1:4010' });

describe('resource funding_sources', () => {
  test('create: only required params', async () => {
    const response = await client.fundingSources.create({
      validation_method: 'PLAID',
      processor_token: 'eixyjnhjpqagzfafsyo',
    });
  });

  test('create: required and optional params', async () => {
    const response = await client.fundingSources.create({
      validation_method: 'BANK',
      account_name: 'Sandbox',
      account_number: '13719713158835300',
      account_token: '9ca76969-effa-433b-843f-776bc3cd16f8',
      routing_number: '011103093',
    });
  });

  test('update: only required params', async () => {
    const response = await client.fundingSources.update('8d9d68a9-dca4-4f7b-ad40-9a2a51cdd9a1', {});
  });

  test('update: required and optional params', async () => {
    const response = await client.fundingSources.update('8d9d68a9-dca4-4f7b-ad40-9a2a51cdd9a1', {
      account_token: 'e90733e0-95e9-4552-86c9-c9b61f808eb6',
      state: 'ENABLED',
    });
  });

  test('list: only required params', async () => {
    const response = await client.fundingSources.list();
  });

  test('list: required and optional params', async () => {
    const response = await client.fundingSources.list({
      account_token: 'd5265bfa-9895-4e31-ad1e-19de6b03ef3c',
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
        { account_token: '4d31f11a-b9e6-4a2d-b32a-1bd78d5bbefc' },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Lithic.NotFoundError);
  });

  test('verify: only required params', async () => {
    const response = await client.fundingSources.verify('08375720-c8d6-4625-9672-05f3646b0e64', {
      micro_deposits: [0, 17, 0],
    });
  });

  test('verify: required and optional params', async () => {
    const response = await client.fundingSources.verify('08375720-c8d6-4625-9672-05f3646b0e64', {
      account_token: '15ade7e0-d2db-4abf-835a-57cb66b89f57',
      micro_deposits: [1, 7, 2],
    });
  });
});
