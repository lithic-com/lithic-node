// File generated from our OpenAPI spec by Stainless.

import Lithic from '../../index';
const client = new Lithic({ apiKey: 'something1234', baseURL: 'http://127.0.0.1:4010' });

describe('resource auth_stream_enrollment', () => {
  test('retrieve', async () => {
    const response = await client.authStreamEnrollment.retrieve();
  });

  test('disenroll', async () => {
    const response = await client.authStreamEnrollment.disenroll();
  });

  // skipped: currently no good way to test endpoints defining callbacks, Prism mock server will fail trying to reach the provided callback url
  test.skip('enroll: only required params', async () => {
    const response = await client.authStreamEnrollment.enroll();
  });

  // skipped: currently no good way to test endpoints defining callbacks, Prism mock server will fail trying to reach the provided callback url
  test.skip('enroll: required and optional params', async () => {
    const response = await client.authStreamEnrollment.enroll({ webhook_url: 'http://stingy-silly.net' });
  });
});
