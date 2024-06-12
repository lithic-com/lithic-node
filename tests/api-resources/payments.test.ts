// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Lithic from 'lithic';
import { Response } from 'node-fetch';

const lithic = new Lithic({
  apiKey: 'My Lithic API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource payments', () => {
  test('create: only required params', async () => {
    const responsePromise = lithic.payments.create({
      amount: 1,
      external_bank_account_token: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
      financial_account_token: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
      method: 'ACH_NEXT_DAY',
      method_attributes: { sec_code: 'CCD' },
      type: 'COLLECTION',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('create: required and optional params', async () => {
    const response = await lithic.payments.create({
      amount: 1,
      external_bank_account_token: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
      financial_account_token: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
      method: 'ACH_NEXT_DAY',
      method_attributes: { sec_code: 'CCD' },
      type: 'COLLECTION',
      token: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
      memo: 'string',
      user_defined_id: 'string',
    });
  });

  test('retrieve', async () => {
    const responsePromise = lithic.payments.retrieve('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('retrieve: request options instead of params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      lithic.payments.retrieve('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', { path: '/_stainless_unknown_path' }),
    ).rejects.toThrow(Lithic.NotFoundError);
  });

  test('list', async () => {
    const responsePromise = lithic.payments.list();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
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
          begin: '2019-12-27T18:11:19.117Z',
          category: 'ACH',
          end: '2019-12-27T18:11:19.117Z',
          ending_before: 'string',
          financial_account_token: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
          page_size: 1,
          result: 'APPROVED',
          starting_after: 'string',
          status: 'DECLINED',
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Lithic.NotFoundError);
  });

  test('retry', async () => {
    const responsePromise = lithic.payments.retry('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('retry: request options instead of params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      lithic.payments.retry('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', { path: '/_stainless_unknown_path' }),
    ).rejects.toThrow(Lithic.NotFoundError);
  });

  test('simulateAction: only required params', async () => {
    const responsePromise = lithic.payments.simulateAction('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {
      event_type: 'ACH_ORIGINATION_REVIEWED',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('simulateAction: required and optional params', async () => {
    const response = await lithic.payments.simulateAction('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {
      event_type: 'ACH_ORIGINATION_REVIEWED',
      decline_reason: 'PROGRAM_TRANSACTION_LIMIT_EXCEEDED',
      return_reason_code: 'string',
    });
  });

  test('simulateReceipt: only required params', async () => {
    const responsePromise = lithic.payments.simulateReceipt({
      token: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
      amount: 0,
      financial_account_token: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
      receipt_type: 'RECEIPT_CREDIT',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('simulateReceipt: required and optional params', async () => {
    const response = await lithic.payments.simulateReceipt({
      token: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
      amount: 0,
      financial_account_token: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
      receipt_type: 'RECEIPT_CREDIT',
      memo: 'string',
    });
  });

  test('simulateRelease: only required params', async () => {
    const responsePromise = lithic.payments.simulateRelease({
      payment_token: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('simulateRelease: required and optional params', async () => {
    const response = await lithic.payments.simulateRelease({
      payment_token: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
    });
  });

  test('simulateReturn: only required params', async () => {
    const responsePromise = lithic.payments.simulateReturn({
      payment_token: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('simulateReturn: required and optional params', async () => {
    const response = await lithic.payments.simulateReturn({
      payment_token: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
      return_reason_code: 'R12',
    });
  });
});
