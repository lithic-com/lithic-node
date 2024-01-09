// File generated from our OpenAPI spec by Stainless.

import Lithic from 'lithic';
import { APIUserAbortError } from 'lithic';
import { Headers } from 'lithic/core';
import defaultFetch, { Response, type RequestInit, type RequestInfo } from 'node-fetch';

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

  describe('defaultHeaders', () => {
    const client = new Lithic({
      baseURL: 'http://localhost:5000/',
      defaultHeaders: { 'X-My-Default-Header': '2' },
      apiKey: 'My Lithic API Key',
    });

    test('they are used in the request', () => {
      const { req } = client.buildRequest({ path: '/foo', method: 'post' });
      expect((req.headers as Headers)['x-my-default-header']).toEqual('2');
    });

    test('can ignore `undefined` and leave the default', () => {
      const { req } = client.buildRequest({
        path: '/foo',
        method: 'post',
        headers: { 'X-My-Default-Header': undefined },
      });
      expect((req.headers as Headers)['x-my-default-header']).toEqual('2');
    });

    test('can be removed with `null`', () => {
      const { req } = client.buildRequest({
        path: '/foo',
        method: 'post',
        headers: { 'X-My-Default-Header': null },
      });
      expect(req.headers as Headers).not.toHaveProperty('x-my-default-header');
    });
  });

  describe('defaultQuery', () => {
    test('with null query params given', () => {
      const client = new Lithic({
        baseURL: 'http://localhost:5000/',
        defaultQuery: { apiVersion: 'foo' },
        apiKey: 'My Lithic API Key',
      });
      expect(client.buildURL('/foo', null)).toEqual('http://localhost:5000/foo?apiVersion=foo');
    });

    test('multiple default query params', () => {
      const client = new Lithic({
        baseURL: 'http://localhost:5000/',
        defaultQuery: { apiVersion: 'foo', hello: 'world' },
        apiKey: 'My Lithic API Key',
      });
      expect(client.buildURL('/foo', null)).toEqual('http://localhost:5000/foo?apiVersion=foo&hello=world');
    });

    test('overriding with `undefined`', () => {
      const client = new Lithic({
        baseURL: 'http://localhost:5000/',
        defaultQuery: { hello: 'world' },
        apiKey: 'My Lithic API Key',
      });
      expect(client.buildURL('/foo', { hello: undefined })).toEqual('http://localhost:5000/foo');
    });
  });

  test('custom fetch', async () => {
    const client = new Lithic({
      baseURL: 'http://localhost:5000/',
      apiKey: 'My Lithic API Key',
      fetch: (url) => {
        return Promise.resolve(
          new Response(JSON.stringify({ url, custom: true }), {
            headers: { 'Content-Type': 'application/json' },
          }),
        );
      },
    });

    const response = await client.get('/foo');
    expect(response).toEqual({ url: 'http://localhost:5000/foo', custom: true });
  });

  test('custom signal', async () => {
    const client = new Lithic({
      baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
      apiKey: 'My Lithic API Key',
      fetch: (...args) => {
        return new Promise((resolve, reject) =>
          setTimeout(
            () =>
              defaultFetch(...args)
                .then(resolve)
                .catch(reject),
            300,
          ),
        );
      },
    });

    const controller = new AbortController();
    setTimeout(() => controller.abort(), 200);

    const spy = jest.spyOn(client, 'request');

    await expect(client.get('/foo', { signal: controller.signal })).rejects.toThrowError(APIUserAbortError);
    expect(spy).toHaveBeenCalledTimes(1);
  });

  describe('baseUrl', () => {
    test('trailing slash', () => {
      const client = new Lithic({
        baseURL: 'http://localhost:5000/custom/path/',
        apiKey: 'My Lithic API Key',
      });
      expect(client.buildURL('/foo', null)).toEqual('http://localhost:5000/custom/path/foo');
    });

    test('no trailing slash', () => {
      const client = new Lithic({
        baseURL: 'http://localhost:5000/custom/path',
        apiKey: 'My Lithic API Key',
      });
      expect(client.buildURL('/foo', null)).toEqual('http://localhost:5000/custom/path/foo');
    });

    afterEach(() => {
      process.env['SINK_BASE_URL'] = undefined;
    });

    test('explicit option', () => {
      const client = new Lithic({ baseURL: 'https://example.com', apiKey: 'My Lithic API Key' });
      expect(client.baseURL).toEqual('https://example.com');
    });

    test('env variable', () => {
      process.env['LITHIC_BASE_URL'] = 'https://example.com/from_env';
      const client = new Lithic({ apiKey: 'My Lithic API Key' });
      expect(client.baseURL).toEqual('https://example.com/from_env');
    });

    test('env variable with environment', () => {
      process.env['LITHIC_BASE_URL'] = 'https://example.com/from_env';

      expect(
        () => new Lithic({ apiKey: 'My Lithic API Key', environment: 'production' }),
      ).toThrowErrorMatchingInlineSnapshot(
        `"Ambiguous URL; The \`baseURL\` option (or LITHIC_BASE_URL env var) and the \`environment\` option are given. If you want to use the environment you must pass baseURL: null"`,
      );

      const client = new Lithic({ apiKey: 'My Lithic API Key', baseURL: null, environment: 'production' });
      expect(client.baseURL).toEqual('https://api.lithic.com/v1');
    });
  });

  test('maxRetries option is correctly set', () => {
    const client = new Lithic({ maxRetries: 4, apiKey: 'My Lithic API Key' });
    expect(client.maxRetries).toEqual(4);

    // default
    const client2 = new Lithic({ apiKey: 'My Lithic API Key' });
    expect(client2.maxRetries).toEqual(2);
  });

  test('with environment variable arguments', () => {
    // set options via env var
    process.env['LITHIC_API_KEY'] = 'My Lithic API Key';
    const client = new Lithic();
    expect(client.apiKey).toBe('My Lithic API Key');
  });

  test('with overriden environment variable arguments', () => {
    // set options via env var
    process.env['LITHIC_API_KEY'] = 'another My Lithic API Key';
    const client = new Lithic({ apiKey: 'My Lithic API Key' });
    expect(client.apiKey).toBe('My Lithic API Key');
  });
});

describe('idempotency', () => {
  test('key can be set per-request', async () => {
    const client = new Lithic({
      baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
      apiKey: 'My Lithic API Key',
    });
    await client.accountHolders.create(
      {
        beneficial_owner_entities: [
          {
            address: {
              address1: '123 Old Forest Way',
              city: 'Omaha',
              country: 'USA',
              postal_code: '68022',
              state: 'NE',
            },
            government_id: '114-123-1513',
            legal_business_name: 'Acme, Inc.',
            phone_numbers: ['+12124007676'],
          },
          {
            address: {
              address1: '123 Old Forest Way',
              city: 'Omaha',
              country: 'USA',
              postal_code: '68022',
              state: 'NE',
            },
            government_id: '114-123-1513',
            legal_business_name: 'Acme, Inc.',
            phone_numbers: ['+12124007676'],
          },
          {
            address: {
              address1: '123 Old Forest Way',
              city: 'Omaha',
              country: 'USA',
              postal_code: '68022',
              state: 'NE',
            },
            government_id: '114-123-1513',
            legal_business_name: 'Acme, Inc.',
            phone_numbers: ['+12124007676'],
          },
        ],
        beneficial_owner_individuals: [
          {
            address: {
              address1: '123 Old Forest Way',
              city: 'Omaha',
              country: 'USA',
              postal_code: '68022',
              state: 'NE',
            },
            dob: '1991-03-08 08:00:00',
            email: 'tom@middle-earth.com',
            first_name: 'Tom',
            government_id: '111-23-1412',
            last_name: 'Bombadil',
          },
          {
            address: {
              address1: '123 Old Forest Way',
              city: 'Omaha',
              country: 'USA',
              postal_code: '68022',
              state: 'NE',
            },
            dob: '1991-03-08 08:00:00',
            email: 'tom@middle-earth.com',
            first_name: 'Tom',
            government_id: '111-23-1412',
            last_name: 'Bombadil',
          },
          {
            address: {
              address1: '123 Old Forest Way',
              city: 'Omaha',
              country: 'USA',
              postal_code: '68022',
              state: 'NE',
            },
            dob: '1991-03-08 08:00:00',
            email: 'tom@middle-earth.com',
            first_name: 'Tom',
            government_id: '111-23-1412',
            last_name: 'Bombadil',
          },
        ],
        business_entity: {
          address: {
            address1: '123 Old Forest Way',
            city: 'Omaha',
            country: 'USA',
            postal_code: '68022',
            state: 'NE',
          },
          government_id: '114-123-1513',
          legal_business_name: 'Acme, Inc.',
          phone_numbers: ['+12124007676'],
        },
        control_person: {
          address: {
            address1: '123 Old Forest Way',
            city: 'Omaha',
            country: 'USA',
            postal_code: '68022',
            state: 'NE',
          },
          dob: '1991-03-08 08:00:00',
          email: 'tom@middle-earth.com',
          first_name: 'Tom',
          government_id: '111-23-1412',
          last_name: 'Bombadil',
        },
        nature_of_business: 'Software company selling solutions to the restaurant industry',
        tos_timestamp: '2018-05-29T21:16:05Z',
        workflow: 'KYB_BASIC',
      },
      { idempotencyKey: 'my-idempotency-key' },
    );
  });
});

describe('request building', () => {
  const client = new Lithic({ apiKey: 'My Lithic API Key' });

  describe('Content-Length', () => {
    test('handles multi-byte characters', () => {
      const { req } = client.buildRequest({ path: '/foo', method: 'post', body: { value: '—' } });
      expect((req.headers as Record<string, string>)['content-length']).toEqual('20');
    });

    test('handles standard characters', () => {
      const { req } = client.buildRequest({ path: '/foo', method: 'post', body: { value: 'hello' } });
      expect((req.headers as Record<string, string>)['content-length']).toEqual('22');
    });
  });

  describe('custom headers', () => {
    test('handles undefined', () => {
      const { req } = client.buildRequest({
        path: '/foo',
        method: 'post',
        body: { value: 'hello' },
        headers: { 'X-Foo': 'baz', 'x-foo': 'bar', 'x-Foo': undefined, 'x-baz': 'bam', 'X-Baz': null },
      });
      expect((req.headers as Record<string, string>)['x-foo']).toEqual('bar');
      expect((req.headers as Record<string, string>)['x-Foo']).toEqual(undefined);
      expect((req.headers as Record<string, string>)['X-Foo']).toEqual(undefined);
      expect((req.headers as Record<string, string>)['x-baz']).toEqual(undefined);
    });
  });
});

describe('retries', () => {
  test('single retry', async () => {
    let count = 0;
    const testFetch = async (url: RequestInfo, { signal }: RequestInit = {}): Promise<Response> => {
      if (!count++)
        return new Promise(
          (resolve, reject) => signal?.addEventListener('abort', () => reject(new Error('timed out'))),
        );
      return new Response(JSON.stringify({ a: 1 }), { headers: { 'Content-Type': 'application/json' } });
    };

    const client = new Lithic({ apiKey: 'My Lithic API Key', timeout: 2000, fetch: testFetch });

    expect(await client.request({ path: '/foo', method: 'get' })).toEqual({ a: 1 });
    expect(count).toEqual(2);
    expect(
      await client
        .request({ path: '/foo', method: 'get' })
        .asResponse()
        .then((r) => r.text()),
    ).toEqual(JSON.stringify({ a: 1 }));
    expect(count).toEqual(3);
  }, 10000);
});
