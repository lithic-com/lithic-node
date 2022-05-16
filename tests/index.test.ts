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

  test('with no arguments', () => {
    // fails if no api key provided
    expect(() => {
      new Lithic();
    }).toThrow();

    // set api key via env var
    process.env['LITHIC_API_KEY'] = 'env var api key';
    const client = new Lithic();
    expect(client.apiKey).toBe('env var api key');
  });

  test('with apiKey argument', () => {
    process.env['LITHIC_API_KEY'] = 'env var api key';

    // only apiKey arg
    let client = new Lithic('my api key');
    expect(client.apiKey).toBe('my api key');
    expect(console.warn).toBeCalled();

    // apiKey and an option object
    client = new Lithic('my api key', {});
    expect(client.apiKey).toBe('my api key');
    expect(console.warn).toBeCalled();

    // apiKey arg and apiKey option
    client = new Lithic('my api key', { apiKey: 'another api key' });
    expect(client.apiKey).toBe('another api key');
    expect(console.warn).toBeCalled();
  });

  test('with options argument', () => {
    process.env['LITHIC_API_KEY'] = 'env var api key';

    // apiKey arg and apiKey option
    const client = new Lithic({ apiKey: 'my api key' });
    expect(client.apiKey).toBe('my api key');
  });

  test('with disabled authentication', () => {
    process.env['LITHIC_API_KEY'] = 'env var api key';

    const client = new Lithic({ apiKey: null });
    expect(client.apiKey).toBeNull();
  });
});
