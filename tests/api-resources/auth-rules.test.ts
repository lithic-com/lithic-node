// File generated from our OpenAPI spec by Stainless.

import Lithic from 'lithic';

const lithic = new Lithic({ apiKey: 'something1234', baseURL: 'http://127.0.0.1:4010' });

describe('resource authRules', () => {
  test('create', async () => {
    const response = await lithic.authRules.create({});
  });

  test('retrieve', async () => {
    const response = await lithic.authRules.retrieve('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e');
  });

  test('retrieve: request options instead of params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      lithic.authRules.retrieve('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', { path: '/_stainless_unknown_path' }),
    ).rejects.toThrow(Lithic.NotFoundError);
  });

  test('update', async () => {
    const response = await lithic.authRules.update('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {});
  });

  test('list', async () => {
    const response = await lithic.authRules.list();
  });

  test('list: request options instead of params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(lithic.authRules.list({ path: '/_stainless_unknown_path' })).rejects.toThrow(
      Lithic.NotFoundError,
    );
  });

  test('list: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      lithic.authRules.list({ page: 0, page_size: 1 }, { path: '/_stainless_unknown_path' }),
    ).rejects.toThrow(Lithic.NotFoundError);
  });

  test('apply', async () => {
    const response = await lithic.authRules.apply('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {});
  });

  test('remove', async () => {
    const response = await lithic.authRules.remove({});
  });
});
