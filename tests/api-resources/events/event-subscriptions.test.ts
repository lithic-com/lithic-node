// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Lithic from 'lithic';

const client = new Lithic({
  apiKey: 'My Lithic API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource eventSubscriptions', () => {
  test('resend: only required params', async () => {
    const responsePromise = client.events.eventSubscriptions.resend('event_subscription_token', {
      event_token: 'event_token',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('resend: required and optional params', async () => {
    const response = await client.events.eventSubscriptions.resend('event_subscription_token', {
      event_token: 'event_token',
    });
  });
});
