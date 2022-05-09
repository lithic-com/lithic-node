// File generated from our OpenAPI spec by Stainless.

import Lithic from '../../index';
const client = new Lithic('something1234', { baseURL: 'http://127.0.0.1:4010' });

describe('resource status', () => {
  test('retrieve', async () => {
    const response = await client.status.retrieve();
  });
});
