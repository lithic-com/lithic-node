// File generated from our OpenAPI spec by Stainless.

import Lithic from '../../index';
const client = new Lithic({ apiKey: 'something1234', baseURL: 'http://127.0.0.1:4010' });

describe('resource transactions', () => {
  test('retrieve', async () => {
    const response = await client.transactions.retrieve('c36f1b05-b8e6-41b2-b389-c378fac1d56c');
  });

  test('retrieve: request options instead of params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.transactions.retrieve('c36f1b05-b8e6-41b2-b389-c378fac1d56c', {
        path: '/_stainless_unknown_path',
      }),
    ).rejects.toThrow(Lithic.NotFoundError);
  });

  test('list: only required params', async () => {
    const response = await client.transactions.list();
  });

  test('list: required and optional params', async () => {
    const response = await client.transactions.list({
      account_token: 'e8d44fd3-be1b-484d-956a-8e38293175ac',
      card_token: 'f5f13a03-7294-4c98-9fc6-bd72b260a0f5',
      result: 'APPROVED',
      begin: '2019-12-27T18:11:19.117Z',
      end: '2019-12-27T18:11:19.117Z',
      page: 0,
      page_size: 895,
    });
  });

  test('list: request options instead of params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(client.transactions.list({ path: '/_stainless_unknown_path' })).rejects.toThrow(
      Lithic.NotFoundError,
    );
  });

  test('list: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.transactions.list(
        {
          account_token: 'b1337801-2f8d-4f19-a1c5-2d7d3e7304f0',
          card_token: '226e6865-92b8-471c-8873-9acf5b601b46',
          result: 'DECLINED',
          begin: '2019-12-27T18:11:19.117Z',
          end: '2019-12-27T18:11:19.117Z',
          page: 18,
          page_size: 890,
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Lithic.NotFoundError);
  });

  test('simulate_authorization: only required params', async () => {
    const response = await client.transactions.simulateAuthorization({
      amount: 3,
      descriptor: 'COFFEE SHOP',
      pan: '4111111289144142',
    });
  });

  test('simulate_authorization: required and optional params', async () => {
    const response = await client.transactions.simulateAuthorization({
      amount: 5,
      descriptor: 'COFFEE SHOP',
      pan: '4111111289144142',
      status: 'CREDIT_AUTHORIZATION',
      merchant_currency: 'GBP',
      merchant_amount: 19,
    });
  });

  test('simulate_clearing: only required params', async () => {
    const response = await client.transactions.simulateClearing({
      token: 'ecf62cc4-9228-4c18-bcdc-a74a6347ee21',
    });
  });

  test('simulate_clearing: required and optional params', async () => {
    const response = await client.transactions.simulateClearing({
      amount: 3,
      token: '03ae2325-4a23-40de-9f38-afb9ea22fd3b',
    });
  });

  test('simulate_return: only required params', async () => {
    const response = await client.transactions.simulateReturn({
      amount: 17,
      descriptor: 'COFFEE SHOP',
      pan: '4111111289144142',
    });
  });

  test('simulate_return: required and optional params', async () => {
    const response = await client.transactions.simulateReturn({
      amount: 12,
      descriptor: 'COFFEE SHOP',
      pan: '4111111289144142',
    });
  });

  test('simulate_void: only required params', async () => {
    const response = await client.transactions.simulateVoid({
      token: 'ce3782de-aa51-4742-a231-2447c73b0882',
    });
  });

  test('simulate_void: required and optional params', async () => {
    const response = await client.transactions.simulateVoid({
      amount: 9,
      token: '86cc908a-6c34-4d4c-9860-d43e64c81ec0',
    });
  });
});
