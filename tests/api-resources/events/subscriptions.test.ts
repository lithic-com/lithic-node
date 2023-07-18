// File generated from our OpenAPI spec by Stainless.

import Lithic from 'lithic';

const lithic = new Lithic({ apiKey: 'something1234', baseURL: 'http://127.0.0.1:4010' });

describe('resource subscriptions', () => {
  test('create: only required params', async () => {
    const response = await lithic.events.subscriptions.create({ url: 'https://example.com' });
  });

  test('create: required and optional params', async () => {
    const response = await lithic.events.subscriptions.create({
      url: 'https://example.com',
      description: 'string',
      disabled: true,
      event_types: ['card.created', 'card.created', 'card.created'],
    });
  });

  test('retrieve', async () => {
    const response = await lithic.events.subscriptions.retrieve('string');
  });

  test('retrieve: request options instead of params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      lithic.events.subscriptions.retrieve('string', { path: '/_stainless_unknown_path' }),
    ).rejects.toThrow(Lithic.NotFoundError);
  });

  test('update: only required params', async () => {
    const response = await lithic.events.subscriptions.update('string', { url: 'https://example.com' });
  });

  test('update: required and optional params', async () => {
    const response = await lithic.events.subscriptions.update('string', {
      url: 'https://example.com',
      description: 'string',
      disabled: true,
      event_types: ['card.created', 'card.created', 'card.created'],
    });
  });

  test('list', async () => {
    const response = await lithic.events.subscriptions.list();
  });

  test('list: request options instead of params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(lithic.events.subscriptions.list({ path: '/_stainless_unknown_path' })).rejects.toThrow(
      Lithic.NotFoundError,
    );
  });

  test('list: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      lithic.events.subscriptions.list(
        { ending_before: 'string', page_size: 1, starting_after: 'string' },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Lithic.NotFoundError);
  });

  // Prism Mock server doesnt want Accept header, but server requires it.
  test.skip('del', async () => {
    const response = await lithic.events.subscriptions.del('string');
  });

  // Prism Mock server doesnt want Accept header, but server requires it.
  test.skip('del: request options instead of params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      lithic.events.subscriptions.del('string', { path: '/_stainless_unknown_path' }),
    ).rejects.toThrow(Lithic.NotFoundError);
  });

  test('listAttempts', async () => {
    const response = await lithic.events.subscriptions.listAttempts('string');
  });

  test('listAttempts: request options instead of params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      lithic.events.subscriptions.listAttempts('string', { path: '/_stainless_unknown_path' }),
    ).rejects.toThrow(Lithic.NotFoundError);
  });

  test('listAttempts: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      lithic.events.subscriptions.listAttempts(
        'string',
        {
          begin: '2019-12-27T18:11:19.117Z',
          end: '2019-12-27T18:11:19.117Z',
          ending_before: 'string',
          page_size: 1,
          starting_after: 'string',
          status: 'FAILED',
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Lithic.NotFoundError);
  });

  // Prism Mock server doesnt want Accept header, but server requires it.
  test.skip('recover', async () => {
    const response = await lithic.events.subscriptions.recover('string');
  });

  // Prism Mock server doesnt want Accept header, but server requires it.
  test.skip('recover: request options instead of params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      lithic.events.subscriptions.recover('string', { path: '/_stainless_unknown_path' }),
    ).rejects.toThrow(Lithic.NotFoundError);
  });

  // Prism Mock server doesnt want Accept header, but server requires it.
  test.skip('recover: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      lithic.events.subscriptions.recover(
        'string',
        { begin: '2019-12-27T18:11:19.117Z', end: '2019-12-27T18:11:19.117Z' },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Lithic.NotFoundError);
  });

  // Prism Mock server doesnt want Accept header, but server requires it.
  test.skip('replayMissing', async () => {
    const response = await lithic.events.subscriptions.replayMissing('string');
  });

  // Prism Mock server doesnt want Accept header, but server requires it.
  test.skip('replayMissing: request options instead of params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      lithic.events.subscriptions.replayMissing('string', { path: '/_stainless_unknown_path' }),
    ).rejects.toThrow(Lithic.NotFoundError);
  });

  // Prism Mock server doesnt want Accept header, but server requires it.
  test.skip('replayMissing: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      lithic.events.subscriptions.replayMissing(
        'string',
        { begin: '2019-12-27T18:11:19.117Z', end: '2019-12-27T18:11:19.117Z' },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Lithic.NotFoundError);
  });

  test('retrieveSecret', async () => {
    const response = await lithic.events.subscriptions.retrieveSecret('string');
  });

  test('retrieveSecret: request options instead of params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      lithic.events.subscriptions.retrieveSecret('string', { path: '/_stainless_unknown_path' }),
    ).rejects.toThrow(Lithic.NotFoundError);
  });

  // Prism Mock server doesnt want Accept header, but server requires it.
  test.skip('rotateSecret', async () => {
    const response = await lithic.events.subscriptions.rotateSecret('string');
  });

  // Prism Mock server doesnt want Accept header, but server requires it.
  test.skip('rotateSecret: request options instead of params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      lithic.events.subscriptions.rotateSecret('string', { path: '/_stainless_unknown_path' }),
    ).rejects.toThrow(Lithic.NotFoundError);
  });
});
