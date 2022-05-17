// File generated from our OpenAPI spec by Stainless.

import Lithic from '../../index';
const client = new Lithic({ apiKey: 'something1234', baseURL: 'http://127.0.0.1:4010' });

describe('resource cards', () => {
  test('create: only required params', async () => {
    const response = await client.cards.create({ type: 'DIGITAL_WALLET' });
  });

  test('create: required and optional params', async () => {
    const response = await client.cards.create({
      account_token: 'a724858f-b74a-4658-b5a5-3213f5f19e07',
      card_program_token: '00000000-0000-0000-1000-000000000000',
      exp_month: '06',
      exp_year: '2027',
      funding_token: 'ecbd1d58-0299-48b3-84da-6ed7f5bf9ec1',
      memo: 'New Card',
      spend_limit: 4,
      spend_limit_duration: 'TRANSACTION',
      state: 'PAUSED',
      type: 'PHYSICAL',
      pin: 'glljxhzdpdqywvxekf',
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
      shipping_method: 'STANDARD',
    });
  });

  test('retrieve', async () => {
    const response = await client.cards.retrieve('abcac72d-fe3b-4949-9f7a-f9b8dc71103f');
  });

  test('retrieve: request options instead of params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.cards.retrieve('abcac72d-fe3b-4949-9f7a-f9b8dc71103f', { path: '/_stainless_unknown_path' }),
    ).rejects.toThrow(Lithic.NotFoundError);
  });

  test('update: only required params', async () => {
    const response = await client.cards.update('c7c5955c-862c-4b73-9415-70764df2e67c', {});
  });

  test('update: required and optional params', async () => {
    const response = await client.cards.update('c7c5955c-862c-4b73-9415-70764df2e67c', {
      account_token: '1836477d-51c7-47bd-9f13-b98d9f94eb40',
      funding_token: 'ecbd1d58-0299-48b3-84da-6ed7f5bf9ec1',
      memo: 'New Card',
      spend_limit: 6,
      spend_limit_duration: 'TRANSACTION',
      auth_rule_token: 'butdzjnrfqprqf',
      state: 'PAUSED',
      pin: 'ewxsqlbnrofgaoovvsw',
    });
  });

  test('list: only required params', async () => {
    const response = await client.cards.list();
  });

  test('list: required and optional params', async () => {
    const response = await client.cards.list({
      account_token: '215a4b54-cff4-4017-84b8-3c5e95eeb238',
      begin: '2019-12-27T18:11:19.117Z',
      end: '2019-12-27T18:11:19.117Z',
      page: 5,
      page_size: 395,
    });
  });

  test('list: request options instead of params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(client.cards.list({ path: '/_stainless_unknown_path' })).rejects.toThrow(
      Lithic.NotFoundError,
    );
  });

  test('list: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.cards.list(
        {
          account_token: '8dcf9080-97c5-48ae-afde-3c5386244a55',
          begin: '2019-12-27T18:11:19.117Z',
          end: '2019-12-27T18:11:19.117Z',
          page: 16,
          page_size: 755,
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Lithic.NotFoundError);
  });

  test('embed: only required params', async () => {
    const response = await client.cards.embed();
  });

  test('embed: required and optional params', async () => {
    const response = await client.cards.embed({ embed_request: 'cpuv', hmac: 'wvplcqzorzqt' });
  });

  test('embed: request options instead of params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(client.cards.embed({ path: '/_stainless_unknown_path' })).rejects.toThrow(
      Lithic.NotFoundError,
    );
  });

  test('embed: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.cards.embed(
        { embed_request: 'oneuxaf', hmac: 'qaylfzfiwvv' },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Lithic.NotFoundError);
  });

  test('provision: only required params', async () => {
    const response = await client.cards.provision('25f4925f-2d1e-4c80-9409-5cebf0df216f', {});
  });

  test('provision: required and optional params', async () => {
    const response = await client.cards.provision('25f4925f-2d1e-4c80-9409-5cebf0df216f', {
      digital_wallet: 'APPLE_PAY',
      nonce: 'U3RhaW5sZXNzIHJvY2tz',
      nonce_signature: 'U3RhaW5sZXNzIHJvY2tz',
      certificate: 'U3RhaW5sZXNzIHJvY2tz',
      account_token: '133aa795-5178-4f59-a84d-6b8807dde383',
    });
  });

  test('reissue: only required params', async () => {
    const response = await client.cards.reissue('45fc61b0-b56e-436f-8167-93541dc56163', {});
  });

  test('reissue: required and optional params', async () => {
    const response = await client.cards.reissue('45fc61b0-b56e-436f-8167-93541dc56163', {
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
      product_id: 'wjzlgtrucysak',
    });
  });
});
