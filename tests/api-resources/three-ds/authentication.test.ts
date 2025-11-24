// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Lithic from 'lithic';

const client = new Lithic({
  apiKey: 'My Lithic API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource authentication', () => {
  test('retrieve', async () => {
    const responsePromise = client.threeDS.authentication.retrieve('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('simulate: only required params', async () => {
    const responsePromise = client.threeDS.authentication.simulate({
      merchant: { id: 'OODKZAPJVN4YS7O', country: 'USA', mcc: '5812', name: 'COFFEE SHOP' },
      pan: '4111111289144142',
      transaction: { amount: 0, currency: 'GBP' },
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('simulate: required and optional params', async () => {
    const response = await client.threeDS.authentication.simulate({
      merchant: { id: 'OODKZAPJVN4YS7O', country: 'USA', mcc: '5812', name: 'COFFEE SHOP' },
      pan: '4111111289144142',
      transaction: { amount: 0, currency: 'GBP' },
      card_expiry_check: 'MATCH',
    });
  });

  test('simulateOtpEntry: only required params', async () => {
    const responsePromise = client.threeDS.authentication.simulateOtpEntry({
      token: 'fabd829d-7f7b-4432-a8f2-07ea4889aaac',
      otp: '123456',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('simulateOtpEntry: required and optional params', async () => {
    const response = await client.threeDS.authentication.simulateOtpEntry({
      token: 'fabd829d-7f7b-4432-a8f2-07ea4889aaac',
      otp: '123456',
    });
  });
});
