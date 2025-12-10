// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Webhook } from 'standardwebhooks';

import Lithic from 'lithic';

const lithic = new Lithic({
  apiKey: 'My Lithic API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource webhooks', () => {
  describe('unwrap', () => {
    it('deserializes the payload object', () => {
      // Use current timestamp to avoid "too old" errors
      const timestamp = new Date();
      const timestampStr = String(Math.floor(timestamp.getTime() / 1000));
      const msgId = 'msg_2Lh9KRb0pzN4LePd3XiA4v12Axj';
      const secret = 'whsec_zlFsbBZ8Xcodlpcu6NDTdSzZRLSdhkst';
      const payload = `{"card_token":"sit Lorem ipsum, accusantium repellendus possimus","created_at":"elit. placeat libero architecto molestias, sit","account_token":"elit.","issuer_decision":"magnam, libero esse Lorem ipsum magnam, magnam,","tokenization_attempt_id":"illum dolor repellendus libero esse accusantium","wallet_decisioning_info":{"device_score":"placeat architecto"},"digital_wallet_token_metadata":{"status":"reprehenderit dolor","token_requestor_id":"possimus","payment_account_info":{"account_holder_data":{"phone_number":"libero","email_address":"nobis molestias, veniam culpa! quas elit. quas libero esse architecto placeat"},"pan_unique_reference":"adipisicing odit magnam, odit"}}}`;

      // Generate proper signature using standardwebhooks
      const wh = new Webhook(secret);
      const signature = wh.sign(msgId, timestamp, payload);

      const headers = {
        'webhook-id': msgId,
        'webhook-timestamp': timestampStr,
        'webhook-signature': signature,
      };

      lithic.webhooks.unwrap(payload, headers, secret);
    });
  });

  describe('verifySignature', () => {
    it('should pass for valid signature', () => {
      const timestamp = new Date();
      const timestampStr = String(Math.floor(timestamp.getTime() / 1000));
      const msgId = 'msg_2Lh9KRb0pzN4LePd3XiA4v12Axj';
      const secret = 'whsec_zlFsbBZ8Xcodlpcu6NDTdSzZRLSdhkst';
      const payload = `{"card_token":"sit Lorem ipsum, accusantium repellendus possimus","created_at":"elit. placeat libero architecto molestias, sit","account_token":"elit.","issuer_decision":"magnam, libero esse Lorem ipsum magnam, magnam,","tokenization_attempt_id":"illum dolor repellendus libero esse accusantium","wallet_decisioning_info":{"device_score":"placeat architecto"},"digital_wallet_token_metadata":{"status":"reprehenderit dolor","token_requestor_id":"possimus","payment_account_info":{"account_holder_data":{"phone_number":"libero","email_address":"nobis molestias, veniam culpa! quas elit. quas libero esse architecto placeat"},"pan_unique_reference":"adipisicing odit magnam, odit"}}}`;

      const wh = new Webhook(secret);
      const signature = wh.sign(msgId, timestamp, payload);

      const headers = {
        'webhook-id': msgId,
        'webhook-timestamp': timestampStr,
        'webhook-signature': signature,
      };

      lithic.webhooks.verifySignature(payload, headers, secret);
    });

    it('should throw for timestamp outside threshold', () => {
      const oldTimestamp = new Date(Date.now() - 6 * 60 * 1000); // 6 minutes ago
      const timestampStr = String(Math.floor(oldTimestamp.getTime() / 1000));
      const msgId = 'msg_2Lh9KRb0pzN4LePd3XiA4v12Axj';
      const secret = 'whsec_zlFsbBZ8Xcodlpcu6NDTdSzZRLSdhkst';
      const payload = `{"test":"data"}`;

      const wh = new Webhook(secret);
      const signature = wh.sign(msgId, oldTimestamp, payload);

      const headers = {
        'webhook-id': msgId,
        'webhook-timestamp': timestampStr,
        'webhook-signature': signature,
      };

      expect(() =>
        lithic.webhooks.verifySignature(payload, headers, secret),
      ).toThrowErrorMatchingInlineSnapshot(`"Message timestamp too old"`);

      const futureTimestamp = new Date(Date.now() + 6 * 60 * 1000); // 6 minutes in future
      const futureTimestampStr = String(Math.floor(futureTimestamp.getTime() / 1000));
      const futureSig = wh.sign(msgId, futureTimestamp, payload);

      expect(() =>
        lithic.webhooks.verifySignature(
          payload,
          {
            'webhook-id': msgId,
            'webhook-timestamp': futureTimestampStr,
            'webhook-signature': futureSig,
          },
          secret,
        ),
      ).toThrowErrorMatchingInlineSnapshot(`"Message timestamp too new"`);
    });

    it('should throw an error for invalid secret format', () => {
      const timestamp = new Date();
      const timestampStr = String(Math.floor(timestamp.getTime() / 1000));
      const payload = `{"test":"data"}`;

      expect(() => {
        lithic.webhooks.verifySignature(
          payload,
          {
            'webhook-id': 'msg_id',
            'webhook-timestamp': timestampStr,
            'webhook-signature': 'v1,fake',
          },
          'invalid secret',
        );
      }).toThrowErrorMatchingInlineSnapshot(`"Base64Coder: incorrect characters for decoding"`);
    });

    it('should throw for invalid signature', () => {
      const timestamp = new Date();
      const timestampStr = String(Math.floor(timestamp.getTime() / 1000));
      const payload = `{"test":"data"}`;
      const correctSecret = 'whsec_zlFsbBZ8Xcodlpcu6NDTdSzZRLSdhkst';
      const wrongSecret = `whsec_${Buffer.from('foo').toString('base64')}`;

      const wh = new Webhook(wrongSecret);
      const signature = wh.sign('msg_id', timestamp, payload);

      expect(() =>
        lithic.webhooks.verifySignature(
          payload,
          {
            'webhook-id': 'msg_id',
            'webhook-timestamp': timestampStr,
            'webhook-signature': signature,
          },
          correctSecret,
        ),
      ).toThrowErrorMatchingInlineSnapshot(`"No matching signature found"`);
    });

    it('should pass for multiple signatures', () => {
      const timestamp = new Date();
      const timestampStr = String(Math.floor(timestamp.getTime() / 1000));
      const msgId = 'msg_2Lh9KRb0pzN4LePd3XiA4v12Axj';
      const secret = 'whsec_zlFsbBZ8Xcodlpcu6NDTdSzZRLSdhkst';
      const payload = `{"test":"data"}`;

      const wh = new Webhook(secret);
      const signature = wh.sign(msgId, timestamp, payload);
      const invalidSignature = `v1,${Buffer.from('my_sig').toString('base64')}`;

      lithic.webhooks.verifySignature(
        payload,
        {
          'webhook-id': msgId,
          'webhook-timestamp': timestampStr,
          'webhook-signature': `${invalidSignature} ${signature}`,
        },
        secret,
      );
    });

    it('should throw for different signature version', () => {
      const timestamp = new Date();
      const timestampStr = String(Math.floor(timestamp.getTime() / 1000));
      const msgId = 'msg_id';
      const secret = 'whsec_zlFsbBZ8Xcodlpcu6NDTdSzZRLSdhkst';
      const payload = `{"test":"data"}`;

      const wh = new Webhook(secret);
      const signature = wh.sign(msgId, timestamp, payload);
      // Extract just the signature part and prefix with v2
      const sigPart = signature.split(',')[1];

      expect(() =>
        lithic.webhooks.verifySignature(
          payload,
          {
            'webhook-id': msgId,
            'webhook-timestamp': timestampStr,
            'webhook-signature': `v2,${sigPart}`,
          },
          secret,
        ),
      ).toThrowErrorMatchingInlineSnapshot(`"No matching signature found"`);
    });

    it('should pass for multiple signatures with different version', () => {
      const timestamp = new Date();
      const timestampStr = String(Math.floor(timestamp.getTime() / 1000));
      const msgId = 'msg_id';
      const secret = 'whsec_zlFsbBZ8Xcodlpcu6NDTdSzZRLSdhkst';
      const payload = `{"test":"data"}`;

      const wh = new Webhook(secret);
      const signature = wh.sign(msgId, timestamp, payload);
      const sigPart = signature.split(',')[1];

      lithic.webhooks.verifySignature(
        payload,
        {
          'webhook-id': msgId,
          'webhook-timestamp': timestampStr,
          'webhook-signature': `v2,${sigPart} ${signature}`,
        },
        secret,
      );
    });

    it('should throw if signature version is missing', () => {
      const timestamp = new Date();
      const timestampStr = String(Math.floor(timestamp.getTime() / 1000));
      const payload = `{"test":"data"}`;

      expect(() =>
        lithic.webhooks.verifySignature(
          payload,
          {
            'webhook-id': 'msg_id',
            'webhook-timestamp': timestampStr,
            'webhook-signature': 'just_a_signature',
          },
          'whsec_zlFsbBZ8Xcodlpcu6NDTdSzZRLSdhkst',
        ),
      ).toThrowErrorMatchingInlineSnapshot(`"No matching signature found"`);
    });

    it('should throw if payload is not a string', () => {
      const timestamp = new Date();
      const timestampStr = String(Math.floor(timestamp.getTime() / 1000));

      expect(() =>
        lithic.webhooks.verifySignature(
          { payload: 'not a string' } as any,
          {
            'webhook-id': 'msg_id',
            'webhook-timestamp': timestampStr,
            'webhook-signature': 'v1,sig',
          },
          'whsec_zlFsbBZ8Xcodlpcu6NDTdSzZRLSdhkst',
        ),
      ).toThrowErrorMatchingInlineSnapshot(`"Expected payload to be of type string or Buffer."`);
    });
  });

  describe('parse', () => {
    it('should unwrap and validate typed webhook event', () => {
      const secret = 'whsec_c2VjcmV0Cg==';
      const payload =
        '{"event_type":"account_holder.created","token":"00000000-0000-0000-0000-000000000001","account_token":"00000000-0000-0000-0000-000000000001","created":"2019-12-27T18:11:19.117Z","required_documents":[{"entity_token":"182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e","status_reasons":["string"],"valid_documents":["string"]}],"status":"ACCEPTED","status_reason":["string"]}';
      const msgID = '1';
      const timestamp = new Date();
      const wh = new Webhook(secret);
      const signature = wh.sign(msgID, timestamp, payload);
      const headers: Record<string, string> = {
        'webhook-signature': signature,
        'webhook-id': msgID,
        'webhook-timestamp': String(Math.floor(timestamp.getTime() / 1000)),
      };

      const event = lithic.webhooks.parse(payload, { headers, secret });
      expect(event).toBeDefined();
      if ('event_type' in event) {
        expect(event.event_type).toBe('account_holder.created');
      }
    });

    it('should throw for wrong secret', () => {
      const secret = 'whsec_c2VjcmV0Cg==';
      const payload =
        '{"event_type":"account_holder.created","token":"00000000-0000-0000-0000-000000000001","account_token":"00000000-0000-0000-0000-000000000001","created":"2019-12-27T18:11:19.117Z","required_documents":[{"entity_token":"182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e","status_reasons":["string"],"valid_documents":["string"]}],"status":"ACCEPTED","status_reason":["string"]}';
      const msgID = '1';
      const timestamp = new Date();
      const wh = new Webhook(secret);
      const signature = wh.sign(msgID, timestamp, payload);
      const headers: Record<string, string> = {
        'webhook-signature': signature,
        'webhook-id': msgID,
        'webhook-timestamp': String(Math.floor(timestamp.getTime() / 1000)),
      };

      expect(() => {
        const wrongSecret = 'whsec_' + Buffer.from('wrong_secret').toString('base64');
        lithic.webhooks.parse(payload, { headers, secret: wrongSecret });
      }).toThrow('No matching signature found');
    });
  });

  describe('parseUnsafe', () => {
    it('should parse payload without validation', () => {
      const payload = '{"event_type":"account_holder.created","token":"test-token"}';
      const event = lithic.webhooks.parseUnsafe(payload);
      expect(event).toBeDefined();
      if ('event_type' in event) {
        expect(event.event_type).toBe('account_holder.created');
      }
    });
  });
});
