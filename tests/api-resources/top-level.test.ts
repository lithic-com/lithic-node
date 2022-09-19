// File generated from our OpenAPI spec by Stainless.

import Lithic from '~/index';
const lithic = new Lithic({ apiKey: 'something1234', baseURL: 'http://127.0.0.1:4010' });

describe('resource top_level', () => {
  test('api_status', async () => {
    const response = await lithic.apiStatus();
  });

  test('api_status: request options instead of params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(lithic.apiStatus({ path: '/_stainless_unknown_path' })).rejects.toThrow(
      Lithic.NotFoundError,
    );
  });
});
