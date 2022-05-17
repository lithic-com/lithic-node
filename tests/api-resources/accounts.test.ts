// File generated from our OpenAPI spec by Stainless.

import Lithic from '../../index';
const client = new Lithic({ apiKey: 'something1234', baseURL: 'http://127.0.0.1:4010' });

describe('resource accounts', () => {
  test('retrieve', async () => {
    const response = await client.accounts.retrieve('bb463b8b-b76c-4f6a-9726-65ab5730b69b');
  });

  test('retrieve: request options instead of params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.accounts.retrieve('bb463b8b-b76c-4f6a-9726-65ab5730b69b', { path: '/_stainless_unknown_path' }),
    ).rejects.toThrow(Lithic.NotFoundError);
  });

  test('update: only required params', async () => {
    const response = await client.accounts.update('a27218b8-6a4d-47bb-95b6-5a55334fac1c', {});
  });

  test('update: required and optional params', async () => {
    const response = await client.accounts.update('a27218b8-6a4d-47bb-95b6-5a55334fac1c', {
      daily_spend_limit: 9,
      lifetime_spend_limit: 0,
      monthly_spend_limit: 9,
      verification_address: {
        address1: 'mel',
        address2: 'i',
        city: 'ltxsynnmqodhimkrwx',
        state: 'cmmzg',
        postal_code: 'lptdmvupho',
        country: 'iahikrrww',
      },
      state: 'ACTIVE',
    });
  });

  test('list: only required params', async () => {
    const response = await client.accounts.list();
  });

  test('list: required and optional params', async () => {
    const response = await client.accounts.list({
      begin: '2019-12-27T18:11:19.117Z',
      end: '2019-12-27T18:11:19.117Z',
      page: 10,
      page_size: 457,
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
        { begin: '2019-12-27T18:11:19.117Z', end: '2019-12-27T18:11:19.117Z', page: 14, page_size: 269 },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Lithic.NotFoundError);
  });
});
