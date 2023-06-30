// File generated from our OpenAPI spec by Stainless.

import Lithic from 'lithic';

const lithic = new Lithic({ apiKey: 'something1234', baseURL: 'http://127.0.0.1:4010' });

describe('resource webhooks', () => {
  const payload = `{"card_token":"sit Lorem ipsum, accusantium repellendus possimus","created_at":"elit. placeat libero architecto molestias, sit","account_token":"elit.","issuer_decision":"magnam, libero esse Lorem ipsum magnam, magnam,","tokenization_attempt_id":"illum dolor repellendus libero esse accusantium","wallet_decisioning_info":{"device_score":"placeat architecto"},"digital_wallet_token_metadata":{"status":"reprehenderit dolor","token_requestor_id":"possimus","payment_account_info":{"account_holder_data":{"phone_number":"libero","email_address":"nobis molestias, veniam culpa! quas elit. quas libero esse architecto placeat"},"pan_unique_reference":"adipisicing odit magnam, odit"}}}`;
  const signature = 'Dwa0AHInLL3XFo2sxcHamOQDrJNi7F654S3L6skMAOI=';
  const timestamp = '1676312382';
  const headers = {
    'webhook-id': 'msg_2Lh9KRb0pzN4LePd3XiA4v12Axj',
    'webhook-timestamp': timestamp,
    'webhook-signature': `v1,${signature}`,
  };
  const secret = 'whsec_zlFsbBZ8Xcodlpcu6NDTdSzZRLSdhkst';
  const fakeNow = parseFloat(timestamp) * 1000;

  beforeEach(() => {
    jest.spyOn(global.Date, 'now').mockImplementation(() => fakeNow);
  });

  afterEach(() => {
    // restore the spy created with spyOn
    jest.restoreAllMocks();
  });

  describe('unwrap', () => {
    it('deserializes the payload object', () => {
      lithic.webhooks.unwrap(payload, headers, secret);
    });
  });

  describe('verifySignature', () => {
    it('should pass for valid signature', () => {
      lithic.webhooks.verifySignature(payload, headers, secret);
    });

    it('should throw for timestamp outside threshold', () => {
      jest.spyOn(global.Date, 'now').mockImplementation(() => fakeNow + 360000); // 6 minutes
      expect(() =>
        lithic.webhooks.verifySignature(payload, headers, secret),
      ).toThrowErrorMatchingInlineSnapshot(`"Webhook timestamp is too old"`);

      jest.spyOn(global.Date, 'now').mockImplementation(() => fakeNow - 360000); // 6 minutes
      expect(() =>
        lithic.webhooks.verifySignature(payload, headers, secret),
      ).toThrowErrorMatchingInlineSnapshot(`"Webhook timestamp is too new"`);
    });

    it.only('should throw an error for invalid secret format', () => {
      expect(() => {
        lithic.webhooks.verifySignature(payload, headers, 'invalid secret');
      }).toThrowErrorMatchingInlineSnapshot(`"Given secret is not valid"`);
    });

    it('should throw for invalid signature', () => {
      expect(() =>
        lithic.webhooks.verifySignature(payload, headers, `whsec_${Buffer.from('foo').toString('base64')}`),
      ).toThrowErrorMatchingInlineSnapshot(
        `"None of the given webhook signatures match the expected signature"`,
      );
    });

    it('should pass for multiple signatures', () => {
      const invalidSignature = Buffer.from('my_sig').toString('base64');
      lithic.webhooks.verifySignature(
        payload,
        {
          ...headers,
          'webhook-signature': `v1,${invalidSignature} v1,${signature}`,
        },
        secret,
      );
    });

    it('should throw for different signature version', () => {
      expect(() =>
        lithic.webhooks.verifySignature(
          payload,
          {
            ...headers,
            'webhook-signature': `v2,${signature}`,
          },

          secret,
        ),
      ).toThrowErrorMatchingInlineSnapshot(
        `"None of the given webhook signatures match the expected signature"`,
      );
    });

    it('should pass for multiple signatures with different version', () => {
      lithic.webhooks.verifySignature(
        payload,
        {
          ...headers,
          'webhook-signature': `v2,${signature} v1,${signature}`,
        },
        secret,
      );
    });

    it('should throw if signature version is missing', () => {
      expect(() =>
        lithic.webhooks.verifySignature(
          payload,
          {
            ...headers,
            'webhook-signature': signature,
          },

          secret,
        ),
      ).toThrowErrorMatchingInlineSnapshot(
        `"None of the given webhook signatures match the expected signature"`,
      );
    });
  });
});
