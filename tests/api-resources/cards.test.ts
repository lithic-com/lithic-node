// File generated from our OpenAPI spec by Stainless.

import Lithic from '~/index';

const lithic = new Lithic({ apiKey: 'something1234', baseURL: 'http://127.0.0.1:4010' });

describe('resource cards', () => {
  test('create: only required params', async () => {
    const response = await lithic.cards.create({ type: 'VIRTUAL' });
  });

  test('create: required and optional params', async () => {
    const response = await lithic.cards.create({
      type: 'VIRTUAL',
      account_token: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
      card_program_token: '00000000-0000-0000-1000-000000000000',
      digital_card_art_token: '00000000-0000-0000-1000-000000000000',
      exp_month: '06',
      exp_year: '2027',
      memo: 'New Card',
      pin: 'string',
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
      spend_limit: 0,
      spend_limit_duration: 'ANNUALLY',
      state: 'OPEN',
    });
  });

  test('retrieve', async () => {
    const response = await lithic.cards.retrieve('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e');
  });

  test('retrieve: request options instead of params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      lithic.cards.retrieve('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', { path: '/_stainless_unknown_path' }),
    ).rejects.toThrow(Lithic.NotFoundError);
  });

  test('update', async () => {
    const response = await lithic.cards.update('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {});
  });

  test('list', async () => {
    const response = await lithic.cards.list();
  });

  test('list: request options instead of params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(lithic.cards.list({ path: '/_stainless_unknown_path' })).rejects.toThrow(
      Lithic.NotFoundError,
    );
  });

  test('list: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      lithic.cards.list(
        {
          account_token: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
          begin: '2019-12-27T18:11:19.117Z',
          end: '2019-12-27T18:11:19.117Z',
          page: 0,
          page_size: 1,
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Lithic.NotFoundError);
  });

  test('embed: only required params', async () => {
    const response = await lithic.cards.embed({ embed_request: 'string', hmac: 'string' });
  });

  test('embed: required and optional params', async () => {
    const response = await lithic.cards.embed({ embed_request: 'string', hmac: 'string' });
  });

  test('getEmbedHTML', async () => {
    const html = await lithic.cards.getEmbedHTML({ token: 'foo' });
    expect(html).toContain('<html>');
  });

  test('getEmbedURL', async () => {
    const url = lithic.cards.getEmbedURL({ token: 'foo' });
    expect(url).toContain('hmac');
  });

  test('provision', async () => {
    const response = await lithic.cards.provision('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {});
  });

  test('reissue', async () => {
    const response = await lithic.cards.reissue('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {});
  });
});
