// File generated from our OpenAPI spec by Stainless.

import Lithic from 'lithic';
import { Response } from 'node-fetch';

const lithic = new Lithic({
  apiKey: 'something1234',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource tokenizations', () => {
  test('simulate: only required params', async () => {
    const responsePromise = lithic.tokenizations.simulate({
      cvv: '776',
      expiration_date: 'xxxxx',
      pan: '4111111289144142',
      tokenization_source: 'APPLE_PAY',
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
    const response = await lithic.tokenizations.simulate({
      cvv: '776',
      expiration_date: 'xxxxx',
      pan: '4111111289144142',
      tokenization_source: 'APPLE_PAY',
      account_score: 0,
      device_score: 0,
      wallet_recommended_decision: 'APPROVED',
    });
  });
});
