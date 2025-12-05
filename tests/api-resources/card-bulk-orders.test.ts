// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Lithic from 'lithic';

const client = new Lithic({
  apiKey: 'My Lithic API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource cardBulkOrders', () => {
  test('create: only required params', async () => {
    const responsePromise = client.cardBulkOrders.create({
      customer_product_id: 'custom-card-design-123',
      shipping_address: {
        address1: '123 Main Street',
        city: 'NEW YORK',
        country: 'USA',
        first_name: 'Johnny',
        last_name: 'Appleseed',
        postal_code: '10001',
        state: 'NY',
      },
      shipping_method: 'BULK_EXPEDITED',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('create: required and optional params', async () => {
    const response = await client.cardBulkOrders.create({
      customer_product_id: 'custom-card-design-123',
      shipping_address: {
        address1: '123 Main Street',
        city: 'NEW YORK',
        country: 'USA',
        first_name: 'Johnny',
        last_name: 'Appleseed',
        postal_code: '10001',
        state: 'NY',
      },
      shipping_method: 'BULK_EXPEDITED',
    });
  });

  test('retrieve', async () => {
    const responsePromise = client.cardBulkOrders.retrieve('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('update: only required params', async () => {
    const responsePromise = client.cardBulkOrders.update('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {
      status: 'LOCKED',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('update: required and optional params', async () => {
    const response = await client.cardBulkOrders.update('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {
      status: 'LOCKED',
    });
  });

  test('list', async () => {
    const responsePromise = client.cardBulkOrders.list();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('list: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.cardBulkOrders.list(
        {
          begin: '2019-12-27T18:11:19.117Z',
          end: '2019-12-27T18:11:19.117Z',
          ending_before: 'ending_before',
          page_size: 1,
          starting_after: 'starting_after',
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Lithic.NotFoundError);
  });
});
