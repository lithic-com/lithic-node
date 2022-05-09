// File generated from our OpenAPI spec by Stainless.

import Lithic from '../../index';
const client = new Lithic('something1234', { baseURL: 'http://127.0.0.1:4010' });

describe('resource transactions', () => {
  test('retrieve', async () => {
    const response = await client.transactions.retrieve('f303bf97-9ca7-4696-9eff-a33b043f776b');
  });

  test('list: only required params', async () => {
    const response = await client.transactions.list();
  });

  test('list: required and optional params', async () => {
    const response = await client.transactions.list({
      account_token: 'c3cd16f8-8d9d-468a-9dca-4f7b6d409a2a',
      card_token: '51cdd9a1-e907-433e-895e-955246c9c9b6',
      result: 'APPROVED',
      begin: '2019-12-27T18:11:19.117Z',
      end: '2019-12-27T18:11:19.117Z',
      page: 20,
      page_size: 517,
    });
  });

  test('simulate_authorization: only required params', async () => {
    const response = await client.transactions.simulateAuthorization({
      amount: 0,
      descriptor: 'COFFEE SHOP',
      pan: '4111111289144142',
    });
  });

  test('simulate_authorization: required and optional params', async () => {
    const response = await client.transactions.simulateAuthorization({
      amount: 11,
      descriptor: 'COFFEE SHOP',
      pan: '4111111289144142',
      status: 'FINANCIAL_CREDIT_AUTHORIZATION',
      merchant_currency: 'GBP',
      merchant_amount: 15,
    });
  });

  test('simulate_clearing: only required params', async () => {
    const response = await client.transactions.simulateClearing({
      token: '6ed5265b-fa98-495e-b12d-1e19de6b03ef',
    });
  });

  test('simulate_clearing: required and optional params', async () => {
    const response = await client.transactions.simulateClearing({
      amount: 4,
      token: 'c4d31f11-ab9e-46a2-9732-a1bd78d5bbef',
    });
  });

  test('simulate_return: only required params', async () => {
    const response = await client.transactions.simulateReturn({
      amount: 15,
      descriptor: 'COFFEE SHOP',
      pan: '4111111289144142',
    });
  });

  test('simulate_return: required and optional params', async () => {
    const response = await client.transactions.simulateReturn({
      amount: 0,
      descriptor: 'COFFEE SHOP',
      pan: '4111111289144142',
    });
  });

  test('simulate_void: only required params', async () => {
    const response = await client.transactions.simulateVoid({
      token: '8375720c-8d66-4251-a720-5f3646b0e640',
    });
  });

  test('simulate_void: required and optional params', async () => {
    const response = await client.transactions.simulateVoid({
      amount: 17,
      token: '015ade7e-0d2d-4bab-bc35-a57cb66b89f5',
    });
  });
});
