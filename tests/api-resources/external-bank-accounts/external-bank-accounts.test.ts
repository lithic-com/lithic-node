// File generated from our OpenAPI spec by Stainless.

import Lithic from 'lithic';

const lithic = new Lithic({ apiKey: 'something1234', baseURL: 'http://127.0.0.1:4010' });

describe('resource externalBankAccounts', () => {
  test('create: only required params', async () => {
    const response = await lithic.externalBankAccounts.create({
      owner: 'x',
      owner_type: 'INDIVIDUAL',
      processor_token: 'x',
      verification_method: 'MANUAL',
    });
  });

  test('create: required and optional params', async () => {
    const response = await lithic.externalBankAccounts.create({
      owner: 'x',
      owner_type: 'INDIVIDUAL',
      processor_token: 'x',
      verification_method: 'MANUAL',
      account_token: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
      company_id: 'x',
      dob: '2019-12-27',
      doing_business_as: 'string',
    });
  });

  test('retrieve', async () => {
    const response = await lithic.externalBankAccounts.retrieve('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e');
  });

  test('retrieve: request options instead of params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      lithic.externalBankAccounts.retrieve('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {
        path: '/_stainless_unknown_path',
      }),
    ).rejects.toThrow(Lithic.NotFoundError);
  });

  test('update', async () => {
    const response = await lithic.externalBankAccounts.update('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {});
  });

  test('list', async () => {
    const response = await lithic.externalBankAccounts.list();
  });

  test('list: request options instead of params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(lithic.externalBankAccounts.list({ path: '/_stainless_unknown_path' })).rejects.toThrow(
      Lithic.NotFoundError,
    );
  });

  test('list: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      lithic.externalBankAccounts.list(
        {
          account_token: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
          account_types: ['CHECKING', 'CHECKING', 'CHECKING'],
          countries: ['string', 'string', 'string'],
          ending_before: 'string',
          owner_types: ['INDIVIDUAL', 'INDIVIDUAL', 'INDIVIDUAL'],
          page_size: 1,
          starting_after: 'string',
          states: ['ENABLED', 'ENABLED', 'ENABLED'],
          verification_states: ['PENDING', 'PENDING', 'PENDING'],
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Lithic.NotFoundError);
  });
});
