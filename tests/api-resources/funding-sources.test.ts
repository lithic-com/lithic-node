// File generated from our OpenAPI spec by Stainless.

import Lithic from '../../index';
const client = new Lithic({ apiKey: 'something1234', baseURL: 'http://127.0.0.1:4010' });

describe('resource funding_sources', () => {
  test('create: only required params', async () => {
    const response = await client.fundingSources.create({
      validation_method: 'BANK',
      account_number: '13719713158835300',
      routing_number: '011103093',
    });
  });

  test('create: required and optional params', async () => {
    const response = await client.fundingSources.create({
      validation_method: 'BANK',
      account_name: 'Sandbox',
      account_number: '13719713158835300',
      account_token: '8dcf9080-97c5-48ae-afde-3c5386244a55',
      routing_number: '011103093',
    });
  });

  test('update: only required params', async () => {
    const response = await client.fundingSources.update('cc319cd9-dd96-419f-8afa-c6882ce038a0', {});
  });

  test('update: required and optional params', async () => {
    const response = await client.fundingSources.update('cc319cd9-dd96-419f-8afa-c6882ce038a0', {
      account_token: 'e73f35dd-d25f-4492-9f2d-1ec8014095ce',
      state: 'ENABLED',
    });
  });

  test('list: only required params', async () => {
    const response = await client.fundingSources.list();
  });

  test('list: required and optional params', async () => {
    const response = await client.fundingSources.list({
      account_token: 'f0df216f-3133-4aa7-9551-78f59684d6b8',
    });
  });

  test('verify: only required params', async () => {
    const response = await client.fundingSources.verify('807dde38-345f-4c61-b0b5-6e36fc167935', {
      micro_deposits: [6, 2, 17],
    });
  });

  test('verify: required and optional params', async () => {
    const response = await client.fundingSources.verify('807dde38-345f-4c61-b0b5-6e36fc167935', {
      account_token: 'c56163ad-5f74-4bac-9fb0-6fe24ef68459',
      micro_deposits: [13, 0, 5],
    });
  });
});
