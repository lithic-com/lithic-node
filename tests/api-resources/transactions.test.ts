// File generated from our OpenAPI spec by Stainless.

import Lithic from '../../index';
const lithic = new Lithic({ apiKey: 'something1234', baseURL: 'http://127.0.0.1:4010' });

describe('resource transactions', () => {
  test('retrieve', async () => {
    const response = await lithic.transactions.retrieve('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e');
  });

  test('retrieve: request options instead of params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      lithic.transactions.retrieve('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {
        path: '/_stainless_unknown_path',
      }),
    ).rejects.toThrow(Lithic.NotFoundError);
  });

  test('list: only required params', async () => {
    const response = await lithic.transactions.list();
  });

  test('list: required and optional params', async () => {
    const response = await lithic.transactions.list({
      account_token: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
      card_token: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
      result: 'APPROVED',
      begin: '2019-12-27T18:11:19.117Z',
      end: '2019-12-27T18:11:19.117Z',
      page: 0,
      page_size: 1,
    });
  });

  test('list: request options instead of params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(lithic.transactions.list({ path: '/_stainless_unknown_path' })).rejects.toThrow(
      Lithic.NotFoundError,
    );
  });

  test('list: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      lithic.transactions.list(
        {
          account_token: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
          card_token: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
          result: 'APPROVED',
          begin: '2019-12-27T18:11:19.117Z',
          end: '2019-12-27T18:11:19.117Z',
          page: 0,
          page_size: 1,
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Lithic.NotFoundError);
  });

  test('simulate_authorization: only required params', async () => {
    const response = await lithic.transactions.simulateAuthorization({
      amount: 0,
      descriptor: 'COFFEE SHOP',
      pan: '4111111289144142',
    });
  });

  test('simulate_authorization: required and optional params', async () => {
    const response = await lithic.transactions.simulateAuthorization({
      amount: 0,
      descriptor: 'COFFEE SHOP',
      pan: '4111111289144142',
      status: 'AUTHORIZATION',
      merchant_currency: 'GBP',
      merchant_amount: 0,
    });
  });

  test('simulate_clearing: only required params', async () => {
    const response = await lithic.transactions.simulateClearing({
      token: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
    });
  });

  test('simulate_clearing: required and optional params', async () => {
    const response = await lithic.transactions.simulateClearing({
      amount: 0,
      token: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
    });
  });

  test('simulate_return: only required params', async () => {
    const response = await lithic.transactions.simulateReturn({
      amount: 0,
      descriptor: 'COFFEE SHOP',
      pan: '4111111289144142',
    });
  });

  test('simulate_return: required and optional params', async () => {
    const response = await lithic.transactions.simulateReturn({
      amount: 0,
      descriptor: 'COFFEE SHOP',
      pan: '4111111289144142',
    });
  });

  test('simulate_void: only required params', async () => {
    const response = await lithic.transactions.simulateVoid({
      token: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
    });
  });

  test('simulate_void: required and optional params', async () => {
    const response = await lithic.transactions.simulateVoid({
      amount: 0,
      token: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
    });
  });
});
