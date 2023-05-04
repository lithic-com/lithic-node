// File generated from our OpenAPI spec by Stainless.

import Lithic from '~/index';

const lithic = new Lithic({ apiKey: 'something1234', baseURL: 'http://127.0.0.1:4010' });

describe('resource authStreamEnrollment', () => {
  test('retrieve', async () => {
    const response = await lithic.authStreamEnrollment.retrieve();
  });

  test('retrieve: request options instead of params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(lithic.authStreamEnrollment.retrieve({ path: '/_stainless_unknown_path' })).rejects.toThrow(
      Lithic.NotFoundError,
    );
  });

  // Prism Mock server doesnt want Accept header, but server requires it.
  test.skip('disenroll', async () => {
    const response = await lithic.authStreamEnrollment.disenroll();
  });

  // Prism Mock server doesnt want Accept header, but server requires it.
  test.skip('disenroll: request options instead of params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(lithic.authStreamEnrollment.disenroll({ path: '/_stainless_unknown_path' })).rejects.toThrow(
      Lithic.NotFoundError,
    );
  });

  // Prism Mock server doesnt want Accept header, but server requires it.
  test.skip('enroll', async () => {
    const response = await lithic.authStreamEnrollment.enroll();
  });

  // Prism Mock server doesnt want Accept header, but server requires it.
  test.skip('enroll: request options instead of params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(lithic.authStreamEnrollment.enroll({ path: '/_stainless_unknown_path' })).rejects.toThrow(
      Lithic.NotFoundError,
    );
  });

  // Prism Mock server doesnt want Accept header, but server requires it.
  test.skip('enroll: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      lithic.authStreamEnrollment.enroll(
        { webhook_url: 'https://example.com' },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Lithic.NotFoundError);
  });

  test('retrieveSecret', async () => {
    const response = await lithic.authStreamEnrollment.retrieveSecret();
  });

  test('retrieveSecret: request options instead of params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      lithic.authStreamEnrollment.retrieveSecret({ path: '/_stainless_unknown_path' }),
    ).rejects.toThrow(Lithic.NotFoundError);
  });

  test('rotateSecret', async () => {
    const response = await lithic.authStreamEnrollment.rotateSecret();
  });

  test('rotateSecret: request options instead of params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      lithic.authStreamEnrollment.rotateSecret({ path: '/_stainless_unknown_path' }),
    ).rejects.toThrow(Lithic.NotFoundError);
  });
});
