// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Lithic from 'lithic';

const client = new Lithic({
  apiKey: 'My Lithic API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource entities', () => {
  test('create: only required params', async () => {
    const responsePromise = client.accountHolders.entities.create('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {
      address: {
        address1: '300 Normal Forest Way',
        city: 'Portland',
        country: 'USA',
        postal_code: '90210',
        state: 'OR',
      },
      dob: '1991-03-08T08:00:00Z',
      email: 'tim@left-earth.com',
      first_name: 'Timmy',
      government_id: '211-23-1412',
      last_name: 'Turner',
      phone_number: '+15555555555',
      type: 'BENEFICIAL_OWNER_INDIVIDUAL',
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
    const response = await client.accountHolders.entities.create('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {
      address: {
        address1: '300 Normal Forest Way',
        city: 'Portland',
        country: 'USA',
        postal_code: '90210',
        state: 'OR',
        address2: 'address2',
      },
      dob: '1991-03-08T08:00:00Z',
      email: 'tim@left-earth.com',
      first_name: 'Timmy',
      government_id: '211-23-1412',
      last_name: 'Turner',
      phone_number: '+15555555555',
      type: 'BENEFICIAL_OWNER_INDIVIDUAL',
    });
  });

  test('delete: only required params', async () => {
    const responsePromise = client.accountHolders.entities.delete('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {
      account_holder_token: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('delete: required and optional params', async () => {
    const response = await client.accountHolders.entities.delete('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {
      account_holder_token: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
    });
  });
});
