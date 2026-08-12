// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Lithic from 'lithic';

const client = new Lithic({
  apiKey: 'My Lithic API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource blockchainRecipients', () => {
  test('create: only required params', async () => {
    const responsePromise = client.blockchainRecipients.create({
      account_token: 'dabadb3b-700c-41e3-8801-d5dfc84ebea0',
      address: '0x45bfcf1a6289a0b77b4d3f7d12005a05949fd8c3',
      chain: 'ETHEREUM',
      owner: 'John Doe',
      owner_type: 'INDIVIDUAL',
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
    const response = await client.blockchainRecipients.create({
      account_token: 'dabadb3b-700c-41e3-8801-d5dfc84ebea0',
      address: '0x45bfcf1a6289a0b77b4d3f7d12005a05949fd8c3',
      chain: 'ETHEREUM',
      owner: 'John Doe',
      owner_type: 'INDIVIDUAL',
      address_tag: 'address_tag',
      name: 'Cold wallet',
    });
  });
});
