// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Lithic from 'lithic';
import { Response } from 'node-fetch';

const client = new Lithic({
  apiKey: 'My Lithic API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource decisioning', () => {
  test('challengeResponse: only required params', async () => {
    const responsePromise = client.threeDS.decisioning.challengeResponse({
      token: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
      challenge_response: 'APPROVE',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('challengeResponse: required and optional params', async () => {
    const response = await client.threeDS.decisioning.challengeResponse({
      token: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
      challenge_response: 'APPROVE',
    });
  });

  test('retrieveSecret', async () => {
    const responsePromise = client.threeDS.decisioning.retrieveSecret();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('retrieveSecret: request options instead of params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.threeDS.decisioning.retrieveSecret({ path: '/_stainless_unknown_path' }),
    ).rejects.toThrow(Lithic.NotFoundError);
  });

  test('rotateSecret', async () => {
    const responsePromise = client.threeDS.decisioning.rotateSecret();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('rotateSecret: request options instead of params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.threeDS.decisioning.rotateSecret({ path: '/_stainless_unknown_path' }),
    ).rejects.toThrow(Lithic.NotFoundError);
  });

  test('simulateChallenge', async () => {
    const responsePromise = client.threeDS.decisioning.simulateChallenge();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('simulateChallenge: request options instead of params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.threeDS.decisioning.simulateChallenge({ path: '/_stainless_unknown_path' }),
    ).rejects.toThrow(Lithic.NotFoundError);
  });

  test('simulateChallenge: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.threeDS.decisioning.simulateChallenge(
        { token: 'fabd829d-7f7b-4432-a8f2-07ea4889aaac' },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Lithic.NotFoundError);
  });

  test('simulateChallengeResponse: only required params', async () => {
    const responsePromise = client.threeDS.decisioning.simulateChallengeResponse({
      token: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
      challenge_response: 'APPROVE',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('simulateChallengeResponse: required and optional params', async () => {
    const response = await client.threeDS.decisioning.simulateChallengeResponse({
      token: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
      challenge_response: 'APPROVE',
    });
  });
});
