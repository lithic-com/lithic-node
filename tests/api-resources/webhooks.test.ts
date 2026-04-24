// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Webhook } from 'standardwebhooks';

import Lithic from 'lithic';

const client = new Lithic({ apiKey: 'My Lithic API Key', baseURL: process.env["TEST_API_BASE_URL"] ?? 'http://127.0.0.1:4010' });

describe('resource webhooks', () => {
  test('parsed', () => {
    const key = 'whsec_c2VjcmV0Cg==';
    const payload = '{"account_token":"00000000-0000-0000-0000-000000000002","card_token":"00000000-0000-0000-0000-000000000001","created":"2023-09-18T12:34:56Z","digital_wallet_token_metadata":{"payment_account_info":{"account_holder_data":{"phone_number":"+15555555555"},"pan_unique_reference":"pan_unique_ref_1234567890123456789012345678","payment_account_reference":"ref_1234567890123456789012","token_unique_reference":"token_unique_ref_1234567890123456789012345678"},"status":"Pending","payment_app_instance_id":"app_instance_123456789012345678901234567890","token_requestor_id":"12345678901","token_requestor_name":"APPLE_PAY"},"event_type":"digital_wallet.tokenization_approval_request","issuer_decision":"APPROVED","tokenization_channel":"DIGITAL_WALLET","tokenization_token":"tok_1234567890abcdef","wallet_decisioning_info":{"account_score":"100","device_score":"100","recommended_decision":"Decision1","recommendation_reasons":["Reason1"]},"customer_tokenization_decision":{"outcome":"APPROVED","responder_url":"https://example.com","latency":"100","response_code":"123456"},"device":{"imei":"123456789012345","ip_address":"1.1.1.1","location":"37.3860517/-122.0838511"},"rule_results":[{"auth_rule_token":"550e8400-e29b-41d4-a716-446655440003","explanation":"Account risk too high","name":"CustomerAccountRule","result":"DECLINED"}],"tokenization_decline_reasons":["ACCOUNT_SCORE_1"],"tokenization_source":"PUSH_PROVISION","tokenization_tfa_reasons":["WALLET_RECOMMENDED_TFA"]}';
    const msgID = '1';
    const timestamp = new Date();
    const wh = new Webhook('whsec_c2VjcmV0Cg==');
    const signature = wh.sign(msgID, timestamp, payload);
    const headers: Record<string, string> = {
      'webhook-signature': signature,
      'webhook-id': msgID,
      'webhook-timestamp': String(Math.floor(timestamp.getTime()/1000)),
    };
    client.webhooks.parsed(payload, { headers, key })
    client.withOptions({webhookSecret: key}).webhooks.parsed(payload, { headers })
    client.withOptions({webhookSecret: 'whsec_aaaaaaaaaa=='}).webhooks.parsed(payload, { headers, key })
    expect(() => {
      const wrongKey = 'whsec_aaaaaaaaaa==';
      client.webhooks.parsed(payload, { headers, key: wrongKey })
    }).toThrow('No matching signature found');
    expect(() => {
      const wrongKey = 'whsec_aaaaaaaaaa==';
      client.withOptions({webhookSecret: wrongKey}).webhooks.parsed(payload, { headers })
    }).toThrow('No matching signature found');
    expect(() => {
      const badSig = wh.sign(msgID, timestamp, 'some other payload');
      client.webhooks.parsed(payload, { headers: {...headers, 'webhook-signature': badSig }, key})
    }).toThrow('No matching signature found');
    expect(() => {
      const badSig = wh.sign(msgID, timestamp, 'some other payload');
      client.withOptions({webhookSecret: key}).webhooks.parsed(payload, { headers: {...headers, 'webhook-signature': badSig }})
    }).toThrow('No matching signature found');
    expect(() => {
      client.webhooks.parsed(payload, { headers: {...headers, 'webhook-timestamp': '5' }, key})
    }).toThrow('Message timestamp too old');
    expect(() => {
      client.withOptions({webhookSecret: key}).webhooks.parsed(payload, { headers: {...headers, 'webhook-timestamp': '5' }})
    }).toThrow('Message timestamp too old');
    expect(() => {
      client.webhooks.parsed(payload, { headers: {...headers, 'webhook-id': 'wrong' }, key})
    }).toThrow('No matching signature found');
    expect(() => {
      client.withOptions({webhookSecret: key}).webhooks.parsed(payload, { headers: {...headers, 'webhook-id': 'wrong' }})
    }).toThrow('No matching signature found');
  });
});
