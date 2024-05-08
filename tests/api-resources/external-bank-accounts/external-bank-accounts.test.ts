// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Lithic from 'lithic';
import { Response } from 'node-fetch';

const lithic = new Lithic({
  apiKey: 'My Lithic API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource externalBankAccounts', () => {
  test('create: only required params', async () => {
    const responsePromise = lithic.externalBankAccounts.create({
      account_number: 'x',
      country: 'USD',
      currency: 'USD',
      financial_account_token: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
      owner: 'x',
      owner_type: 'BUSINESS',
      routing_number: '123456789',
      type: 'CHECKING',
      verification_method: 'MANUAL',
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
    const response = await lithic.externalBankAccounts.create({
      account_number: 'x',
      country: 'USD',
      currency: 'USD',
      financial_account_token: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
      owner: 'x',
      owner_type: 'BUSINESS',
      routing_number: '123456789',
      type: 'CHECKING',
      verification_method: 'MANUAL',
      account_token: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
      address: { address1: 'x', address2: 'x', city: 'x', country: 'USD', postal_code: '11201', state: 'xx' },
      company_id: 'x',
      dob: '2019-12-27',
      doing_business_as: 'string',
      name: 'x',
      user_defined_id: 'string',
      verification_enforcement: true,
    });
  });

  test('retrieve', async () => {
    const responsePromise = lithic.externalBankAccounts.retrieve('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e');
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
      lithic.externalBankAccounts.retrieve('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {
        path: '/_stainless_unknown_path',
      }),
    ).rejects.toThrow(Lithic.NotFoundError);
  });

  test('update', async () => {
    const responsePromise = lithic.externalBankAccounts.update('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {});
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('list', async () => {
    const responsePromise = lithic.externalBankAccounts.list();
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
          account_types: ['CHECKING', 'SAVINGS'],
          countries: ['string', 'string', 'string'],
          ending_before: 'string',
          owner_types: ['BUSINESS', 'INDIVIDUAL'],
          page_size: 1,
          starting_after: 'string',
          states: ['CLOSED', 'ENABLED', 'PAUSED'],
          verification_states: ['ENABLED', 'FAILED_VERIFICATION', 'INSUFFICIENT_FUNDS'],
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Lithic.NotFoundError);
  });

  test('retryMicroDeposits', async () => {
    const responsePromise = lithic.externalBankAccounts.retryMicroDeposits(
      '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
    );
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('retryMicroDeposits: request options instead of params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      lithic.externalBankAccounts.retryMicroDeposits('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {
        path: '/_stainless_unknown_path',
      }),
    ).rejects.toThrow(Lithic.NotFoundError);
  });

  test('retryMicroDeposits: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      lithic.externalBankAccounts.retryMicroDeposits(
        '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
        { financial_account_token: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e' },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Lithic.NotFoundError);
  });
});
