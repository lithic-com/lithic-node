// File generated from our OpenAPI spec by Stainless.

import { APIResource } from 'lithic/resource';
import { createHmac } from 'crypto';
import { getRequiredHeader, HeadersLike } from 'lithic/core';

export class Webhooks extends APIResource {
  /**
   * Validates that the given payload was sent by Lithic and parses the payload.
   */
  unwrap(
    payload: string,
    headers: HeadersLike,
    secret: string | undefined | null = this._client.webhookSecret,
  ): Object {
    this.verifySignature(payload, headers, secret);
    return JSON.parse(payload);
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

  /** Make an assertion, if not `true`, then throw. */
  private assert(expr: unknown, msg = ''): asserts expr {
    if (!expr) {
      throw new Error(msg);
    }
  }

  /** Compare to array buffers or data views in a way that timing based attacks
   * cannot gain information about the platform. */
  private timingSafeEqual(
    a: ArrayBufferView | ArrayBufferLike | DataView,
    b: ArrayBufferView | ArrayBufferLike | DataView,
  ): boolean {
    if (a.byteLength !== b.byteLength) {
      return false;
    }
    if (!(a instanceof DataView)) {
      a = new DataView(ArrayBuffer.isView(a) ? a.buffer : a);
    }
    if (!(b instanceof DataView)) {
      b = new DataView(ArrayBuffer.isView(b) ? b.buffer : b);
    }
    this.assert(a instanceof DataView);
    this.assert(b instanceof DataView);
    const length = a.byteLength;
    let out = 0;
    let i = -1;
    while (++i < length) {
      out |= a.getUint8(i) ^ b.getUint8(i);
    }
    return out === 0;
  }

  /**
   * Validates whether or not the webhook payload was sent by Lithic.
   *
   * An error will be raised if the webhook payload was not sent by Lithic.
   */
  verifySignature(
    body: string,
    headers: HeadersLike,
    secret: string | undefined | null = this._client.webhookSecret,
  ): void {
    const whsecret = this.parseSecret(secret);

    const msgId = getRequiredHeader(headers, 'webhook-id');
    const msgTimestamp = getRequiredHeader(headers, 'webhook-timestamp');
    const msgSignature = getRequiredHeader(headers, 'webhook-signature');

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

    if (typeof body !== 'string') {
      throw new Error(
        'Webhook body must be passed as the raw JSON string sent from the server (do not parse it first).',
      );
    }

    const timestamp = new Date(timestampSeconds * 1000);

    const computedSignature = this.signPayload(body, { msgId, timestamp, secret: whsecret });
    const expectedSignature = computedSignature.split(',')[1];

    const passedSignatures = msgSignature.split(' ');

    const encoder = new globalThis.TextEncoder();
    for (const versionedSignature of passedSignatures) {
      const [version, signature] = versionedSignature.split(',');
      if (version !== 'v1') {
        continue;
      }

      if (this.timingSafeEqual(encoder.encode(signature), encoder.encode(expectedSignature))) {
        // valid!
        return;
      }
    }

    throw new Error('None of the given webhook signatures match the expected signature');
  }
}
