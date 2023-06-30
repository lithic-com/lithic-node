// File generated from our OpenAPI spec by Stainless.

import Lithic from 'lithic';

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

  test('list', async () => {
    const response = await lithic.transactions.list();
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
          begin: '2019-12-27T18:11:19.117Z',
          card_token: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
          end: '2019-12-27T18:11:19.117Z',
          page: 0,
          page_size: 1,
          result: 'APPROVED',
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Lithic.NotFoundError);
  });

  test('simulateAuthorization: only required params', async () => {
    const response = await lithic.transactions.simulateAuthorization({
      amount: 0,
      descriptor: 'COFFEE SHOP',
      pan: '4111111289144142',
    });
  });

  test('simulateAuthorization: required and optional params', async () => {
    const response = await lithic.transactions.simulateAuthorization({
      amount: 0,
      descriptor: 'COFFEE SHOP',
      pan: '4111111289144142',
      mcc: '5812',
      merchant_acceptor_id: 'OODKZAPJVN4YS7O',
      merchant_amount: 0,
      merchant_currency: 'GBP',
      partial_approval_capable: true,
      status: 'AUTHORIZATION',
    });
  });

  test('simulateAuthorizationAdvice: only required params', async () => {
    const response = await lithic.transactions.simulateAuthorizationAdvice({
      token: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
      amount: 0,
    });
  });

  test('simulateAuthorizationAdvice: required and optional params', async () => {
    const response = await lithic.transactions.simulateAuthorizationAdvice({
      token: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
      amount: 0,
    });
  });

  test('simulateClearing: only required params', async () => {
    const response = await lithic.transactions.simulateClearing({
      token: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
    });
  });

  test('simulateClearing: required and optional params', async () => {
    const response = await lithic.transactions.simulateClearing({
      token: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
      amount: 0,
    });
  });

  test('simulateCreditAuthorization: only required params', async () => {
    const response = await lithic.transactions.simulateCreditAuthorization({
      amount: 0,
      descriptor: 'COFFEE SHOP',
      pan: '4111111289144142',
    });
  });

  test('simulateCreditAuthorization: required and optional params', async () => {
    const response = await lithic.transactions.simulateCreditAuthorization({
      amount: 0,
      descriptor: 'COFFEE SHOP',
      pan: '4111111289144142',
      mcc: '5812',
      merchant_acceptor_id: 'XRKGDPOWEWQRRWU',
    });
  });

  test('simulateReturn: only required params', async () => {
    const response = await lithic.transactions.simulateReturn({
      amount: 0,
      descriptor: 'COFFEE SHOP',
      pan: '4111111289144142',
    });
  });

  test('simulateReturn: required and optional params', async () => {
    const response = await lithic.transactions.simulateReturn({
      amount: 0,
      descriptor: 'COFFEE SHOP',
      pan: '4111111289144142',
    });
  });

  test('simulateReturnReversal: only required params', async () => {
    const response = await lithic.transactions.simulateReturnReversal({
      token: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
    });
  });

  test('simulateReturnReversal: required and optional params', async () => {
    const response = await lithic.transactions.simulateReturnReversal({
      token: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
    });
  });

  test('simulateVoid: only required params', async () => {
    const response = await lithic.transactions.simulateVoid({
      token: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
    });
  });

  test('simulateVoid: required and optional params', async () => {
    const response = await lithic.transactions.simulateVoid({
      token: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
      amount: 0,
      type: 'AUTHORIZATION_EXPIRY',
    });
  });
});
