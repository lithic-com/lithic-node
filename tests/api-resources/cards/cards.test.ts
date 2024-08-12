// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Lithic from 'lithic';
import { Response } from 'node-fetch';

const client = new Lithic({
  apiKey: 'My Lithic API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource cards', () => {
  test('create: only required params', async () => {
    const responsePromise = client.cards.create({ type: 'MERCHANT_LOCKED' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('create: required and optional params', async () => {
    const response = await client.cards.create({
      type: 'MERCHANT_LOCKED',
      account_token: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
      card_program_token: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
      carrier: { qr_code_url: 'qr_code_url' },
      digital_card_art_token: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
      exp_month: '06',
      exp_year: '2027',
      memo: 'New Card',
      pin: 'pin',
      product_id: '1',
      replacement_for: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
      shipping_address: {
        address1: '5 Broad Street',
        city: 'NEW YORK',
        country: 'USA',
        first_name: 'Michael',
        last_name: 'Bluth',
        postal_code: '10001-1809',
        state: 'NY',
        address2: 'Unit 25A',
        email: 'johnny@appleseed.com',
        line2_text: 'The Bluth Company',
        phone_number: '+12124007676',
      },
      shipping_method: '2_DAY',
      spend_limit: 1000,
      spend_limit_duration: 'ANNUALLY',
      state: 'OPEN',
    });
  });

  test('retrieve', async () => {
    const responsePromise = client.cards.retrieve('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e');
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
      client.cards.retrieve('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', { path: '/_stainless_unknown_path' }),
    ).rejects.toThrow(Lithic.NotFoundError);
  });

  test('update', async () => {
    const responsePromise = client.cards.update('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {});
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('list', async () => {
    const responsePromise = client.cards.list();
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
    await expect(client.cards.list({ path: '/_stainless_unknown_path' })).rejects.toThrow(
      Lithic.NotFoundError,
    );
  });

  test('list: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.cards.list(
        {
          account_token: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
          begin: '2019-12-27T18:11:19.117Z',
          end: '2019-12-27T18:11:19.117Z',
          ending_before: 'ending_before',
          page_size: 1,
          starting_after: 'starting_after',
          state: 'CLOSED',
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Lithic.NotFoundError);
  });

  test('embed: only required params', async () => {
    const responsePromise = client.cards.embed({ embed_request: 'embed_request', hmac: 'hmac' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('embed: required and optional params', async () => {
    const response = await client.cards.embed({ embed_request: 'embed_request', hmac: 'hmac' });
  });

  test('provision', async () => {
    const responsePromise = client.cards.provision('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {});
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('reissue', async () => {
    const responsePromise = client.cards.reissue('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {});
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('renew: only required params', async () => {
    const responsePromise = client.cards.renew('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {
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
    const response = await client.cards.renew('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {
      shipping_address: {
        address1: '5 Broad Street',
        city: 'NEW YORK',
        country: 'USA',
        first_name: 'Janet',
        last_name: 'Yellen',
        postal_code: '10001',
        state: 'NY',
        address2: 'Unit 5A',
        email: 'johnny@appleseed.com',
        line2_text: 'The Bluth Company',
        phone_number: '+12124007676',
      },
      carrier: { qr_code_url: 'https://lithic.com/activate-card/1' },
      exp_month: '06',
      exp_year: '2027',
      product_id: '100',
      shipping_method: '2-DAY',
    });
  });

  test('retrieveSpendLimits', async () => {
    const responsePromise = client.cards.retrieveSpendLimits('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e');
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
      client.cards.retrieveSpendLimits('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {
        path: '/_stainless_unknown_path',
      }),
    ).rejects.toThrow(Lithic.NotFoundError);
  });

  test('searchByPan: only required params', async () => {
    const responsePromise = client.cards.searchByPan({ pan: '4111111289144142' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('searchByPan: required and optional params', async () => {
    const response = await client.cards.searchByPan({ pan: '4111111289144142' });
  });
});
