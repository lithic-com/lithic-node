// File generated from our OpenAPI spec by Stainless.

import Lithic from '../../index';
const client = new Lithic({ apiKey: 'something1234', baseURL: 'http://127.0.0.1:4010' });

describe('resource cards', () => {
  test('create: only required params', async () => {
    const response = await client.cards.create({ type: 'PHYSICAL' });
  });

  test('create: required and optional params', async () => {
    const response = await client.cards.create({
      account_token: '4abd2515-6265-4898-892e-4a72a9bfc892',
      card_program_token: '00000000-0000-0000-1000-000000000000',
      exp_month: '06',
      exp_year: '2027',
      funding_token: 'ecbd1d58-0299-48b3-84da-6ed7f5bf9ec1',
      memo: 'New Card',
      spend_limit: 19,
      spend_limit_duration: 'TRANSACTION',
      state: 'PAUSED',
      type: 'DIGITAL_WALLET',
      pin: 'zmtqjjpylxchhp',
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
    const response = await client.cards.retrieve('9bb02273-7bc4-4ac2-9b38-0a933d1a6131');
  });

  test('retrieve: request options instead of params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.cards.retrieve('9bb02273-7bc4-4ac2-9b38-0a933d1a6131', { path: '/_stainless_unknown_path' }),
    ).rejects.toThrow(Lithic.NotFoundError);
  });

  test('update: only required params', async () => {
    const response = await client.cards.update('ec20507b-ea45-494e-be98-e4a2c9bd7604', {});
  });

  test('update: required and optional params', async () => {
    const response = await client.cards.update('ec20507b-ea45-494e-be98-e4a2c9bd7604', {
      account_token: '68a41dfb-58e8-415a-837f-a3717d74723f',
      funding_token: 'ecbd1d58-0299-48b3-84da-6ed7f5bf9ec1',
      memo: 'New Card',
      spend_limit: 10,
      spend_limit_duration: 'ANNUALLY',
      auth_rule_token: 'jnwio',
      state: 'OPEN',
      pin: 'iqgsfkgsqgfjc',
    });
  });

  test('list: only required params', async () => {
    const response = await client.cards.list();
  });

  test('list: required and optional params', async () => {
    const response = await client.cards.list({
      account_token: '905f7467-bbf9-43e4-88f1-9a2144512647',
      begin: '2019-12-27T18:11:19.117Z',
      end: '2019-12-27T18:11:19.117Z',
      page: 17,
      page_size: 372,
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
          account_token: 'f28af74d-0bf9-4f34-b46b-49e556ff6e26',
          begin: '2019-12-27T18:11:19.117Z',
          end: '2019-12-27T18:11:19.117Z',
          page: 1,
          page_size: 243,
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Lithic.NotFoundError);
  });

  test('embed: only required params', async () => {
    const response = await client.cards.embed();
  });

  test('embed: required and optional params', async () => {
    const response = await client.cards.embed({ embed_request: 'yegj', hmac: 'lxoulnyi' });
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
        { embed_request: 'd', hmac: 'fixmcezgouiitbiwhffd' },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Lithic.NotFoundError);
  });

  test('provision: only required params', async () => {
    const response = await client.cards.provision('dd9e77fc-88b6-40bc-9cde-903f1862dcae', {});
  });

  test('provision: required and optional params', async () => {
    const response = await client.cards.provision('dd9e77fc-88b6-40bc-9cde-903f1862dcae', {
      digital_wallet: 'APPLE_PAY',
      nonce: 'U3RhaW5sZXNzIHJvY2tz',
      nonce_signature: 'U3RhaW5sZXNzIHJvY2tz',
      certificate: 'U3RhaW5sZXNzIHJvY2tz',
      account_token: 'cde52c05-cf10-4b57-87bc-77902d4d5575',
    });
  });

  test('reissue: only required params', async () => {
    const response = await client.cards.reissue('d9fead8f-c04c-4799-b390-2b848c47d6c8', {});
  });

  test('reissue: required and optional params', async () => {
    const response = await client.cards.reissue('d9fead8f-c04c-4799-b390-2b848c47d6c8', {
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
      product_id: 'yfmfklvsborpinvt',
    });
  });
});
