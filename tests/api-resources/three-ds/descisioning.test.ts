// File generated from our OpenAPI spec by Stainless.

import Lithic from 'lithic';

const lithic = new Lithic({ apiKey: 'something1234', baseURL: 'http://127.0.0.1:4010' });

describe('resource descisioning', () => {
  test('retrieveSecret', async () => {
    const response = await lithic.threeDS.descisioning.retrieveSecret();
  });

  test('retrieveSecret: request options instead of params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      lithic.threeDS.descisioning.retrieveSecret({ path: '/_stainless_unknown_path' }),
    ).rejects.toThrow(Lithic.NotFoundError);
  });

  test('rotateSecret', async () => {
    const response = await lithic.threeDS.descisioning.rotateSecret();
  });

  test('rotateSecret: request options instead of params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      lithic.threeDS.descisioning.rotateSecret({ path: '/_stainless_unknown_path' }),
    ).rejects.toThrow(Lithic.NotFoundError);
  });
});
