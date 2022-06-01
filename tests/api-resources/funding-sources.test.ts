// File generated from our OpenAPI spec by Stainless.

import Lithic from '../../index';
const lithic = new Lithic({ apiKey: 'something1234', baseURL: 'http://127.0.0.1:4010' });

describe('resource funding_sources', () => {
  test('create: only required params', async () => {
    const response = await lithic.fundingSources.create({
      validation_method: 'BANK',
      account_number: '13719713158835300',
      routing_number: '011103093',
    });
  });

  test('create: required and optional params', async () => {
    const response = await lithic.fundingSources.create({
      validation_method: 'BANK',
      account_name: 'Sandbox',
      account_number: '13719713158835300',
      account_token: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
      routing_number: '011103093',
    });
  });

  test('update: only required params', async () => {
    const response = await lithic.fundingSources.update('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {});
  });

  test('update: required and optional params', async () => {
    const response = await lithic.fundingSources.update('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {
      account_token: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
      state: 'DELETED',
    });
  });

  test('list: only required params', async () => {
    const response = await lithic.fundingSources.list();
  });

  test('list: required and optional params', async () => {
    const response = await lithic.fundingSources.list({
      account_token: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
    });
  });

  test('list: request options instead of params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(lithic.fundingSources.list({ path: '/_stainless_unknown_path' })).rejects.toThrow(
      Lithic.NotFoundError,
    );
  });

  test('list: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      lithic.fundingSources.list(
        { account_token: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e' },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Lithic.NotFoundError);
  });

  test('verify: only required params', async () => {
    const response = await lithic.fundingSources.verify('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {
      micro_deposits: [0, 0, 0],
    });
  });

  test('verify: required and optional params', async () => {
    const response = await lithic.fundingSources.verify('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {
      account_token: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
      micro_deposits: [0, 0, 0],
    });
  });
});
