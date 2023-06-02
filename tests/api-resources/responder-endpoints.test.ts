// File generated from our OpenAPI spec by Stainless.

import Lithic from '~/index';

const lithic = new Lithic({ apiKey: 'something1234', baseURL: 'http://127.0.0.1:4010' });

describe('resource responderEndpoints', () => {
  test('create', async () => {
    const response = await lithic.responderEndpoints.create({});
  });

  // Prism errors when accept header set but no request body is defined
  test.skip('del: only required params', async () => {
    const response = await lithic.responderEndpoints.del({ type: 'TOKENIZATION_DECISIONING' });
  });

  // Prism errors when accept header set but no request body is defined
  test.skip('del: required and optional params', async () => {
    const response = await lithic.responderEndpoints.del({ type: 'TOKENIZATION_DECISIONING' });
  });

  test('checkStatus: only required params', async () => {
    const response = await lithic.responderEndpoints.checkStatus({ type: 'TOKENIZATION_DECISIONING' });
  });

  test('checkStatus: required and optional params', async () => {
    const response = await lithic.responderEndpoints.checkStatus({ type: 'TOKENIZATION_DECISIONING' });
  });
});
