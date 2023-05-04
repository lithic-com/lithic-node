// File generated from our OpenAPI spec by Stainless.

import Lithic from '~/index';

const lithic = new Lithic({ apiKey: 'something1234', baseURL: 'http://127.0.0.1:4010' });

describe('resource transfers', () => {
  test('create: only required params', async () => {
    const response = await lithic.transfers.create({
      amount: 0,
      from: {
        created: '2019-12-27T18:11:19.117Z',
        token: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        type: 'ISSUING',
        updated: '2019-12-27T18:11:19.117Z',
      },
      memo: 'string',
      to: {
        created: '2019-12-27T18:11:19.117Z',
        token: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        type: 'ISSUING',
        updated: '2019-12-27T18:11:19.117Z',
      },
      transaction_token: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
    });
  });

  test('create: required and optional params', async () => {
    const response = await lithic.transfers.create({
      amount: 0,
      from: {
        account_number: 'string',
        created: '2019-12-27T18:11:19.117Z',
        routing_number: 'string',
        token: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        type: 'ISSUING',
        updated: '2019-12-27T18:11:19.117Z',
      },
      memo: 'string',
      to: {
        account_number: 'string',
        created: '2019-12-27T18:11:19.117Z',
        routing_number: 'string',
        token: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        type: 'ISSUING',
        updated: '2019-12-27T18:11:19.117Z',
      },
      transaction_token: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
    });
  });
});
