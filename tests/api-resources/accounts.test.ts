// File generated from our OpenAPI spec by Stainless.

import Lithic from '~/index';
const lithic = new Lithic({ apiKey: 'something1234', baseURL: 'http://127.0.0.1:4010' });

describe('resource accounts', () => {
  test('retrieve', async () => {
    const response = await lithic.accounts.retrieve('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e');
  });

  test('retrieve: request options instead of params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      lithic.accounts.retrieve('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', { path: '/_stainless_unknown_path' }),
    ).rejects.toThrow(Lithic.NotFoundError);
  });

  // Prism returns invalid data
  test.skip('update: only required params', async () => {
    const response = await lithic.accounts.update('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {});
  });

  // Prism returns invalid data
  test.skip('update: required and optional params', async () => {
    const response = await lithic.accounts.update('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {
      daily_spend_limit: 0,
      lifetime_spend_limit: 0,
      monthly_spend_limit: 0,
      verification_address: {
        address1: 'string',
        address2: 'string',
        city: 'string',
        state: 'string',
        postal_code: 'string',
        country: 'string',
      },
      state: 'ACTIVE',
    });
  });

  test('list: only required params', async () => {
    const response = await lithic.accounts.list();
  });

  test('list: required and optional params', async () => {
    const response = await lithic.accounts.list({
      begin: '2019-12-27T18:11:19.117Z',
      end: '2019-12-27T18:11:19.117Z',
      page: 0,
      page_size: 1,
    });
  });

  test('list: request options instead of params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(lithic.accounts.list({ path: '/_stainless_unknown_path' })).rejects.toThrow(
      Lithic.NotFoundError,
    );
  });

  test('list: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      lithic.accounts.list(
        { begin: '2019-12-27T18:11:19.117Z', end: '2019-12-27T18:11:19.117Z', page: 0, page_size: 1 },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Lithic.NotFoundError);
  });
});
