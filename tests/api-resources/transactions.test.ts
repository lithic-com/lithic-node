// File generated from our OpenAPI spec by Stainless.

import Lithic from '../../index';
const client = new Lithic({ apiKey: 'something1234', baseURL: 'http://127.0.0.1:4010' });

describe('resource transactions', () => {
  test('retrieve', async () => {
    const response = await client.transactions.retrieve('3ec78fd5-a3e5-4157-a70d-c56e6873747d');
  });

  test('retrieve: request options instead of params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.transactions.retrieve('3ec78fd5-a3e5-4157-a70d-c56e6873747d', {
        path: '/_stainless_unknown_path',
      }),
    ).rejects.toThrow(Lithic.NotFoundError);
  });

  test('list: only required params', async () => {
    const response = await client.transactions.list();
  });

  test('list: required and optional params', async () => {
    const response = await client.transactions.list({
      account_token: '5a776e82-983a-48f9-8048-03c6cd8597a0',
      card_token: '646aa553-b4ff-4f15-b408-852dae4bbb56',
      result: 'APPROVED',
      begin: '2019-12-27T18:11:19.117Z',
      end: '2019-12-27T18:11:19.117Z',
      page: 1,
      page_size: 295,
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
          account_token: 'd18794aa-9700-4353-b79b-1cad5627c611',
          card_token: 'e4b67309-6eac-4d99-b677-7da5c1d7df66',
          result: 'DECLINED',
          begin: '2019-12-27T18:11:19.117Z',
          end: '2019-12-27T18:11:19.117Z',
          page: 4,
          page_size: 454,
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Lithic.NotFoundError);
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
      amount: 8,
      descriptor: 'COFFEE SHOP',
      pan: '4111111289144142',
      status: 'AUTHORIZATION',
      merchant_currency: 'GBP',
      merchant_amount: 20,
    });
  });

  test('simulate_clearing: only required params', async () => {
    const response = await client.transactions.simulateClearing({
      token: '5196af0b-e734-4208-9a24-4a645ebea172',
    });
  });

  test('simulate_clearing: required and optional params', async () => {
    const response = await client.transactions.simulateClearing({
      amount: 11,
      token: 'bd0bd354-b706-4341-9236-674efa0b8174',
    });
  });

  test('simulate_return: only required params', async () => {
    const response = await client.transactions.simulateReturn({
      amount: 8,
      descriptor: 'COFFEE SHOP',
      pan: '4111111289144142',
    });
  });

  test('simulate_return: required and optional params', async () => {
    const response = await client.transactions.simulateReturn({
      amount: 20,
      descriptor: 'COFFEE SHOP',
      pan: '4111111289144142',
    });
  });

  test('simulate_void: only required params', async () => {
    const response = await client.transactions.simulateVoid({
      token: '280cf0c1-71a0-44e6-8df9-b84dfdd0262e',
    });
  });

  test('simulate_void: required and optional params', async () => {
    const response = await client.transactions.simulateVoid({
      amount: 14,
      token: '81b9f133-efa7-4694-8d73-2c860e0aa70d',
    });
  });
});
