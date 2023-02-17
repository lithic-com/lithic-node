// File generated from our OpenAPI spec by Stainless.

import Lithic from '~/index';
const lithic = new Lithic({ apiKey: 'something1234', baseURL: 'http://127.0.0.1:4010' });

describe('resource subscriptions', () => {
  test('create: only required params', async () => {
    const response = await lithic.events.subscriptions.create({ url: 'https://example.com' });
  });

  test('create: required and optional params', async () => {
    const response = await lithic.events.subscriptions.create({
      description: 'string',
      disabled: true,
      event_types: ['dispute.updated', 'dispute.updated', 'dispute.updated'],
      url: 'https://example.com',
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
    const response = await lithic.events.subscriptions.update('string');
  });

  test('update: required and optional params', async () => {
    const response = await lithic.events.subscriptions.update('string', {
      description: 'string',
      disabled: true,
      event_types: ['dispute.updated', 'dispute.updated', 'dispute.updated'],
      url: 'https://example.com',
    });
  });

  test('update: request options instead of params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      lithic.events.subscriptions.update('string', { path: '/_stainless_unknown_path' }),
    ).rejects.toThrow(Lithic.NotFoundError);
  });

  test('update: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      lithic.events.subscriptions.update(
        'string',
        {
          description: 'string',
          disabled: true,
          event_types: ['dispute.updated', 'dispute.updated', 'dispute.updated'],
          url: 'https://example.com',
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Lithic.NotFoundError);
  });

  test('list: only required params', async () => {
    const response = await lithic.events.subscriptions.list();
  });

  test('list: required and optional params', async () => {
    const response = await lithic.events.subscriptions.list({
      page_size: 1,
      starting_after: 'string',
      ending_before: 'string',
    });
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
        { page_size: 1, starting_after: 'string', ending_before: 'string' },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Lithic.NotFoundError);
  });

  // Prism Mock server doesnt want Accept header, but server requires it.
  test.skip('delete', async () => {
    const response = await lithic.events.subscriptions.del('string');
  });

  // Prism Mock server doesnt want Accept header, but server requires it.
  test.skip('delete: request options instead of params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      lithic.events.subscriptions.del('string', { path: '/_stainless_unknown_path' }),
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
  test.skip('replay_missing', async () => {
    const response = await lithic.events.subscriptions.replayMissing('string');
  });

  // Prism Mock server doesnt want Accept header, but server requires it.
  test.skip('replay_missing: request options instead of params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      lithic.events.subscriptions.replayMissing('string', { path: '/_stainless_unknown_path' }),
    ).rejects.toThrow(Lithic.NotFoundError);
  });

  test('retrieve_secret', async () => {
    const response = await lithic.events.subscriptions.retrieveSecret('string');
  });

  test('retrieve_secret: request options instead of params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      lithic.events.subscriptions.retrieveSecret('string', { path: '/_stainless_unknown_path' }),
    ).rejects.toThrow(Lithic.NotFoundError);
  });

  // Prism Mock server doesnt want Accept header, but server requires it.
  test.skip('rotate_secret', async () => {
    const response = await lithic.events.subscriptions.rotateSecret('string');
  });

  // Prism Mock server doesnt want Accept header, but server requires it.
  test.skip('rotate_secret: request options instead of params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      lithic.events.subscriptions.rotateSecret('string', { path: '/_stainless_unknown_path' }),
    ).rejects.toThrow(Lithic.NotFoundError);
  });
});
