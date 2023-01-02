// File generated from our OpenAPI spec by Stainless.

import Lithic from '../index';

describe('instantiate client', () => {
  const env = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...env };

    console.warn = jest.fn();
  });

  afterEach(() => {
    process.env = env;
  });

  test('with minimal arguments', () => {
    // set API Key via env var
    process.env['LITHIC_API_KEY'] = 'env var api key';
    const client = new Lithic();
    expect(client.apiKey).toBe('env var api key');
  });

  test('with apiKey argument', () => {
    process.env['LITHIC_API_KEY'] = 'env var api key';

    const client = new Lithic({ apiKey: 'another api key' });
    expect(client.apiKey).toBe('another api key');
  });

  test('with options argument', () => {
    process.env['LITHIC_API_KEY'] = 'env var api key';

    // apiKey
    const client = new Lithic({ apiKey: 'my api key' });
    expect(client.apiKey).toBe('my api key');
  });

  test('with disabled authentication', () => {
    // fails if no API Key provided
    expect(() => {
      new Lithic();
    }).toThrow();
  });
});
