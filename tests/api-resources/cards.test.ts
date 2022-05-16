// File generated from our OpenAPI spec by Stainless.

import Lithic from '../../index';
const client = new Lithic({ apiKey: 'something1234', baseURL: 'http://127.0.0.1:4010' });

describe('resource cards', () => {
  test('create: only required params', async () => {
    const response = await client.cards.create({ type: 'PHYSICAL' });
  });

  test('create: required and optional params', async () => {
    const response = await client.cards.create({
      account_token: '9db0b000-8bcb-43a7-a6d6-b198a7baa870',
      card_program_token: '00000000-0000-0000-1000-000000000000',
      exp_month: '06',
      exp_year: '2027',
      funding_token: 'ecbd1d58-0299-48b3-84da-6ed7f5bf9ec1',
      memo: 'New Card',
      spend_limit: 9,
      spend_limit_duration: 'ANNUALLY',
      state: 'PAUSED',
      type: 'SINGLE_USE',
      pin: '',
      product_id: '1',
      shipping_address: {
        first_name: 'Michael',
        last_name: 'Bluth',
        line2_text: 'The Bluth Company',
        address1: '5 Broad Street',
        address2: 'Unit 25A',
        city: 'NEW YORK',
        state: 'NY',
        postal_code: '10001-1809',
        country: 'USA',
        email: 'johnny@appleseed.com',
        phone_number: '+12124007676',
      },
      shipping_method: 'EXPEDITED',
    });
  });

  test('retrieve', async () => {
    const response = await client.cards.retrieve('1f8e772a-f7c3-456c-9aa8-3972fd0e224c');
  });

  test('update: only required params', async () => {
    const response = await client.cards.update('ffef2cf6-c183-4e1e-a68a-8a6502a72485', {});
  });

  test('update: required and optional params', async () => {
    const response = await client.cards.update('ffef2cf6-c183-4e1e-a68a-8a6502a72485', {
      account_token: '8fb74a65-8f5a-4532-93f5-f19e073cc7e3',
      funding_token: 'ecbd1d58-0299-48b3-84da-6ed7f5bf9ec1',
      memo: 'New Card',
      spend_limit: 9,
      spend_limit_duration: 'FOREVER',
      auth_rule_token: 'xhzdpdq',
      state: 'PAUSED',
      pin: 'vxekfhrstqvmevzwfs',
    });
  });

  test('list: only required params', async () => {
    const response = await client.cards.list();
  });

  test('list: required and optional params', async () => {
    const response = await client.cards.list({
      account_token: '9499f7af-9b8d-4c71-903f-c7c5955c862c',
      begin: '2019-12-27T18:11:19.117Z',
      end: '2019-12-27T18:11:19.117Z',
      page: 14,
      page_size: 441,
    });
  });

  test('embed: only required params', async () => {
    const response = await client.cards.embed();
  });

  test('embed: required and optional params', async () => {
    const response = await client.cards.embed({ embed_request: 'vhbi', hmac: 'amkgvyexkl' });
  });

  test('provision: only required params', async () => {
    const response = await client.cards.provision('c1836477-d51c-477b-99f1-3b98d9f94eb4', {});
  });

  test('provision: required and optional params', async () => {
    const response = await client.cards.provision('c1836477-d51c-477b-99f1-3b98d9f94eb4', {
      digital_wallet: 'APPLE_PAY',
      nonce: 'U3RhaW5sZXNzIHJvY2tz',
      nonce_signature: 'U3RhaW5sZXNzIHJvY2tz',
      certificate: 'U3RhaW5sZXNzIHJvY2tz',
      account_token: '5ea1cb2f-58a3-4a9a-93af-2deb9708a933',
    });
  });

  test('reissue: only required params', async () => {
    const response = await client.cards.reissue('088ddbd2-15a4-4b54-8ff4-01784b83c5e9', {});
  });

  test('reissue: required and optional params', async () => {
    const response = await client.cards.reissue('088ddbd2-15a4-4b54-8ff4-01784b83c5e9', {
      shipping_address: {
        first_name: 'Michael',
        last_name: 'Bluth',
        line2_text: 'The Bluth Company',
        address1: '5 Broad Street',
        address2: 'Unit 25A',
        city: 'NEW YORK',
        state: 'NY',
        postal_code: '10001-1809',
        country: 'USA',
        email: 'johnny@appleseed.com',
        phone_number: '+12124007676',
      },
      product_id: 'xwtefo',
    });
  });
});
