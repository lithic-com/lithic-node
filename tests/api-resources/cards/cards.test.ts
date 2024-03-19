// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Lithic from 'lithic';
import { Response } from 'node-fetch';

const lithic = new Lithic({
  apiKey: 'My Lithic API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource cards', () => {
  test('create: only required params', async () => {
    const responsePromise = lithic.cards.create({ type: 'VIRTUAL' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('create: required and optional params', async () => {
    const response = await lithic.cards.create({
      type: 'VIRTUAL',
      account_token: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
      card_program_token: '00000000-0000-0000-1000-000000000000',
      carrier: { qr_code_url: 'string' },
      digital_card_art_token: '00000000-0000-0000-1000-000000000000',
      exp_month: '06',
      exp_year: '2027',
      memo: 'New Card',
      pin: 'string',
      product_id: '1',
      replacement_for: '00000000-0000-0000-1000-000000000000',
      shipping_address: {
        address1: '5 Broad Street',
        address2: 'Unit 25A',
        city: 'NEW YORK',
        country: 'USA',
        email: 'johnny@appleseed.com',
        first_name: 'Michael',
        last_name: 'Bluth',
        line2_text: 'The Bluth Company',
        phone_number: '+12124007676',
        postal_code: '10001-1809',
        state: 'NY',
      },
      shipping_method: '2_DAY',
      spend_limit: 1000,
      spend_limit_duration: 'TRANSACTION',
      state: 'OPEN',
    });
  });

  test('retrieve', async () => {
    const responsePromise = lithic.cards.retrieve('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('retrieve: request options instead of params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      lithic.cards.retrieve('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', { path: '/_stainless_unknown_path' }),
    ).rejects.toThrow(Lithic.NotFoundError);
  });

  test('update', async () => {
    const responsePromise = lithic.cards.update('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {});
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('list', async () => {
    const responsePromise = lithic.cards.list();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
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
          ending_before: 'string',
          page_size: 1,
          starting_after: 'string',
          state: 'CLOSED',
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Lithic.NotFoundError);
  });

  test('embed: only required params', async () => {
    const responsePromise = lithic.cards.embed({ embed_request: 'string', hmac: 'string' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('embed: required and optional params', async () => {
    const response = await lithic.cards.embed({ embed_request: 'string', hmac: 'string' });
  });

  test('provision', async () => {
    const responsePromise = lithic.cards.provision('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {});
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('reissue', async () => {
    const responsePromise = lithic.cards.reissue('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {});
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('renew: only required params', async () => {
    const responsePromise = lithic.cards.renew('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {
      shipping_address: {
        address1: '5 Broad Street',
        city: 'NEW YORK',
        country: 'USA',
        first_name: 'Janet',
        last_name: 'Yellen',
        postal_code: '10001',
        state: 'NY',
      },
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('renew: required and optional params', async () => {
    const response = await lithic.cards.renew('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {
      shipping_address: {
        address1: '5 Broad Street',
        address2: 'Unit 5A',
        city: 'NEW YORK',
        country: 'USA',
        email: 'johnny@appleseed.com',
        first_name: 'Janet',
        last_name: 'Yellen',
        line2_text: 'The Bluth Company',
        phone_number: '+12124007676',
        postal_code: '10001',
        state: 'NY',
      },
      carrier: { qr_code_url: 'https://lithic.com/activate-card/1' },
      exp_month: '06',
      exp_year: '2027',
      product_id: '100',
      shipping_method: 'STANDARD',
    });
  });

  test('retrieveSpendLimits', async () => {
    const responsePromise = lithic.cards.retrieveSpendLimits('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('retrieveSpendLimits: request options instead of params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      lithic.cards.retrieveSpendLimits('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {
        path: '/_stainless_unknown_path',
      }),
    ).rejects.toThrow(Lithic.NotFoundError);
  });

  test('searchByPan: only required params', async () => {
    const responsePromise = lithic.cards.searchByPan({ pan: '4111111289144142' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('searchByPan: required and optional params', async () => {
    const response = await lithic.cards.searchByPan({ pan: '4111111289144142' });
  });
});
