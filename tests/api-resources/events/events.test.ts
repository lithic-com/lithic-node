// File generated from our OpenAPI spec by Stainless.

import Lithic from '~/index';
const lithic = new Lithic({ apiKey: 'something1234', baseURL: 'http://127.0.0.1:4010' });

describe('resource events', () => {
  test('retrieve', async () => {
    const response = await lithic.events.retrieve('string');
  });

  test('retrieve: request options instead of params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(lithic.events.retrieve('string', { path: '/_stainless_unknown_path' })).rejects.toThrow(
      Lithic.NotFoundError,
    );
  });

  test('list: only required params', async () => {
    const response = await lithic.events.list();
  });

  test('list: required and optional params', async () => {
    const response = await lithic.events.list({
      begin: '2019-12-27T18:11:19.117Z',
      end: '2019-12-27T18:11:19.117Z',
      page_size: 1,
      starting_after: 'string',
      ending_before: 'string',
      event_types: ['dispute.updated', 'dispute.updated', 'dispute.updated'],
    });
  });

  test('list: request options instead of params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(lithic.events.list({ path: '/_stainless_unknown_path' })).rejects.toThrow(
      Lithic.NotFoundError,
    );
  });

  test('list: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      lithic.events.list(
        {
          begin: '2019-12-27T18:11:19.117Z',
          end: '2019-12-27T18:11:19.117Z',
          page_size: 1,
          starting_after: 'string',
          ending_before: 'string',
          event_types: ['dispute.updated', 'dispute.updated', 'dispute.updated'],
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Lithic.NotFoundError);
  });

  // TODO: fix mock server when Accept header is not set to empty
  test.skip('resend: works', async () => {
    const response = await lithic.events.resend('string', { eventSubscriptionToken: 'foo' });
  });
});
