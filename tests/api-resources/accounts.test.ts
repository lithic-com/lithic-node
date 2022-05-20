// File generated from our OpenAPI spec by Stainless.

import Lithic from '../../index';
const client = new Lithic({ apiKey: 'something1234', baseURL: 'http://127.0.0.1:4010' });

describe('resource accounts', () => {
  test('retrieve', async () => {
    const response = await client.accounts.retrieve('72d34485-5cc8-43b7-a77c-0a5799757090');
  });

  test('retrieve: request options instead of params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.accounts.retrieve('72d34485-5cc8-43b7-a77c-0a5799757090', { path: '/_stainless_unknown_path' }),
    ).rejects.toThrow(Lithic.NotFoundError);
  });

  test('update: only required params', async () => {
    const response = await client.accounts.update('03265f18-c4af-491e-af58-05621adbb8c7', {});
  });

  test('update: required and optional params', async () => {
    const response = await client.accounts.update('03265f18-c4af-491e-af58-05621adbb8c7', {
      daily_spend_limit: 1,
      lifetime_spend_limit: 14,
      monthly_spend_limit: 2,
      verification_address: {
        address1: 'gfypqtnlirtbvjvwypj',
        address2: 'gshee',
        city: 'gnzqcmqpomaiaa',
        state: 'eercjysgrlaybfuqmb',
        postal_code: 'uawxhhbjopmxjxkp',
        country: 'qxl',
      },
      state: 'PAUSED',
    });
  });

  test('list: only required params', async () => {
    const response = await client.accounts.list();
  });

  test('list: required and optional params', async () => {
    const response = await client.accounts.list({
      begin: '2019-12-27T18:11:19.117Z',
      end: '2019-12-27T18:11:19.117Z',
      page: 5,
      page_size: 253,
    });
  });

  test('list: request options instead of params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(client.accounts.list({ path: '/_stainless_unknown_path' })).rejects.toThrow(
      Lithic.NotFoundError,
    );
  });

  test('list: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.accounts.list(
        { begin: '2019-12-27T18:11:19.117Z', end: '2019-12-27T18:11:19.117Z', page: 19, page_size: 668 },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Lithic.NotFoundError);
  });
});
