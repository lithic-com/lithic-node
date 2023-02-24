// File generated from our OpenAPI spec by Stainless.

import { APIResource } from '~/resource';
import type { Event } from '~/resources/events';
import { createHmac } from 'crypto';
import { getHeader, HeadersLike, timingSafeEqual } from '~/core';

export class Webhooks extends APIResource {
  /**
   * Validates that the given payload was sent by Lithic and parses the payload.
   */
  unwrap(
    payload: string,
    headers: HeadersLike,
    secret: string | undefined | null = this.client.webhookSecret,
  ): Event {
    this.verifySignature(payload, headers, secret);
    return JSON.parse(payload) as Event;
  }

  private parseSecret(secret: string | null | undefined): Uint8Array {
    if (!secret) {
      throw new Error(
        "The webhook secret must either be set using the env var, LITHIC_WEBHOOK_SECRET, on the client class, Lithic({ webhook_secret: '123' }), or passed to this function",
      );
    }

    const prefix = 'whsec_';
    if (secret.startsWith(prefix)) {
      secret = secret.substring(prefix.length);
    }

    const buf = Buffer.from(secret, 'base64');
    if (buf.toString('base64') !== secret) {
      throw new Error(`Given secret is not valid`);
    }

    return new Uint8Array(buf);
  }

  private signPayload(
    payload: string,
    { msgId, timestamp, secret }: { msgId: string; timestamp: Date; secret: Uint8Array },
  ) {
    const encoder = new TextEncoder();
    const toSign = encoder.encode(`${msgId}.${timestamp.getTime() / 1000}.${payload}`);

    const hmac = createHmac('sha256', secret);
    hmac.update(toSign);

    return `v1,${hmac.digest('base64')}`;
  }

  /**
   * Validates whether or not the webhook payload was sent by Lithic.
   *
   * An error will be raised if the webhook payload was not sent by Lithic.
   */
  verifySignature(
    payload: string,
    headers: HeadersLike,
    secret: string | undefined | null = this.client.webhookSecret,
  ): void {
    const whsecret = this.parseSecret(secret);
    const msgId = getHeader(headers, 'webhook-id');
    if (!msgId) {
      throw new Error('Could not find webhook-id header');
    }

    const msgTimestamp = getHeader(headers, 'webhook-timestamp');
    if (!msgTimestamp) {
      throw new Error('Could not find webhook-timestamp header');
    }

    const msgSignature = getHeader(headers, 'webhook-signature');
    if (!msgSignature) {
      throw new Error('Could not find webhook-signature header');
    }

    const now = Math.floor(Date.now() / 1000);
    const timestampSeconds = parseInt(msgTimestamp, 10);
    if (isNaN(timestampSeconds)) {
      throw new Error('Invalid Signature Headers');
    }

    const webhook_tolerance_in_seconds = 5 * 60; // 5 minutes
    if (now - timestampSeconds > webhook_tolerance_in_seconds) {
      throw new Error('Webhook timestamp is too old');
    }

    if (timestampSeconds > now + webhook_tolerance_in_seconds) {
      throw new Error('Webhook timestamp is too new');
    }

    const timestamp = new Date(timestampSeconds * 1000);

    const computedSignature = this.signPayload(payload, { msgId, timestamp, secret: whsecret });
    const expectedSignature = computedSignature.split(',')[1];

    const passedSignatures = msgSignature.split(' ');

    const encoder = new globalThis.TextEncoder();
    for (const versionedSignature of passedSignatures) {
      const [version, signature] = versionedSignature.split(',');
      if (version !== 'v1') {
        continue;
      }

      if (timingSafeEqual(encoder.encode(signature), encoder.encode(expectedSignature))) {
        // valid!
        return;
      }
    }

    throw new Error('None of the given webhook signatures match the expected signature');
  }
}
