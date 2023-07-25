// File generated from our OpenAPI spec by Stainless.

import Lithic from 'lithic';

const lithic = new Lithic({ apiKey: 'something1234', baseURL: 'http://127.0.0.1:4010' });

describe('resource payments', () => {
  test('create: only required params', async () => {
    const response = await lithic.payments.create({
      amount: 1,
      external_bank_account_token: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
      financial_account_token: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
      method: 'ACH_NEXT_DAY',
      method_attributes: { sec_code: 'PPD' },
      type: 'PAYMENT',
    });
  });

  test('create: required and optional params', async () => {
    const response = await lithic.payments.create({
      amount: 1,
      external_bank_account_token: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
      financial_account_token: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
      method: 'ACH_NEXT_DAY',
      method_attributes: { sec_code: 'PPD' },
      type: 'PAYMENT',
      token: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
      memo: 'string',
      user_defined_id: 'string',
    });
  });

  test('retrieve', async () => {
    const response = await lithic.payments.retrieve('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e');
  });

  test('retrieve: request options instead of params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      lithic.payments.retrieve('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', { path: '/_stainless_unknown_path' }),
    ).rejects.toThrow(Lithic.NotFoundError);
  });

  test('list', async () => {
    const response = await lithic.payments.list();
  });

  test('list: request options instead of params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(lithic.payments.list({ path: '/_stainless_unknown_path' })).rejects.toThrow(
      Lithic.NotFoundError,
    );
  });

  test('list: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      lithic.payments.list(
        {
          ending_before: 'string',
          financial_account_token: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
          page_size: 1,
          result: 'APPROVED',
          starting_after: 'string',
          status: 'PENDING',
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Lithic.NotFoundError);
  });

  test('simulateRelease: only required params', async () => {
    const response = await lithic.payments.simulateRelease({
      payment_token: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
    });
  });

  test('simulateRelease: required and optional params', async () => {
    const response = await lithic.payments.simulateRelease({
      payment_token: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
    });
  });
});
