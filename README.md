# Lithic Node API Library

[![NPM version](https://img.shields.io/npm/v/lithic.svg)](https://npmjs.org/package/lithic)

This library provides convenient access to the Lithic REST API from server-side TypeScript or JavaScript.

The API documentation can be found [here](https://docs.lithic.com).

## Installation

```sh
npm install --save lithic
# or
yarn add lithic
```

## Usage

The full API of this library can be found in [api.md](https://www.github.com/lithic-com/lithic-node/blob/main/api.md).

```js
import Lithic from 'lithic';

const lithic = new Lithic({
  apiKey: process.env['LITHIC_API_KEY'], // This is the default and can be omitted
  environment: 'sandbox', // defaults to 'production'
});

async function main() {
  const card = await lithic.cards.create({ type: 'SINGLE_USE' });

  console.log(card.token);
}

main();
```

### Request & Response types

This library includes TypeScript definitions for all request params and response fields. You may import and use them like so:

```ts
import Lithic from 'lithic';

const lithic = new Lithic({
  apiKey: process.env['LITHIC_API_KEY'], // This is the default and can be omitted
  environment: 'sandbox', // defaults to 'production'
});

async function main() {
  const params: Lithic.CardCreateParams = { type: 'SINGLE_USE' };
  const card: Lithic.Card = await lithic.cards.create(params);
}

main();
```

Documentation for each method, request param, and response field are available in docstrings and will appear on hover in most modern editors.

## Handling errors

When the library is unable to connect to the API,
or if the API returns a non-success status code (i.e., 4xx or 5xx response),
a subclass of `APIError` will be thrown:

```ts
async function main() {
  const card = await lithic.cards.create({ type: 'an_incorrect_type' }).catch((err) => {
    if (err instanceof Lithic.APIError) {
      console.log(err.status); // 400
      console.log(err.name); // BadRequestError
      console.log(err.error?.message); // Invalid parameter(s): type
      console.log(err.error?.debugging_request_id); // 94d5e915-xxxx-4cee-a4f5-2xd6ebd279ac
      console.log(err.headers); // {server: 'nginx', ...}
    } else {
      throw err;
    }
  });
}

main();
```

Error codes are as followed:

| Status Code | Error Type                 |
| ----------- | -------------------------- |
| 400         | `BadRequestError`          |
| 401         | `AuthenticationError`      |
| 403         | `PermissionDeniedError`    |
| 404         | `NotFoundError`            |
| 422         | `UnprocessableEntityError` |
| 429         | `RateLimitError`           |
| >=500       | `InternalServerError`      |
| N/A         | `APIConnectionError`       |

### Retries

Certain errors will be automatically retried 2 times by default, with a short exponential backoff.
Connection errors (for example, due to a network connectivity problem), 408 Request Timeout, 409 Conflict,
429 Rate Limit, and >=500 Internal errors will all be retried by default.

You can use the `maxRetries` option to configure or disable this:

<!-- prettier-ignore -->
```js
// Configure the default for all requests:
const lithic = new Lithic({
  maxRetries: 0, // default is 2
});

// Or, configure per-request:
await lithic.cards.list({ page_size: 10 }, {
  maxRetries: 5,
});
```

### Timeouts

Requests time out after 1 minute by default. You can configure this with a `timeout` option:

<!-- prettier-ignore -->
```ts
// Configure the default for all requests:
const lithic = new Lithic({
  timeout: 20 * 1000, // 20 seconds (default is 1 minute)
});

// Override per-request:
await lithic.cards.list({ page_size: 10 }, {
  timeout: 5 * 1000,
});
```

On timeout, an `APIConnectionTimeoutError` is thrown.

Note that requests which time out will be [retried twice by default](#retries).

## Auto-pagination

List methods in the Lithic API are paginated.
You can use `for await … of` syntax to iterate through items across all pages:

```ts
async function fetchAllCards(params) {
  const allCards = [];
  // Automatically fetches more pages as needed.
  for await (const card of lithic.cards.list()) {
    allCards.push(card);
  }
  return allCards;
}
```

Alternatively, you can make request a single page at a time:

```ts
let page = await lithic.cards.list();
for (const card of page.data) {
  console.log(card);
}

// Convenience methods are provided for manually paginating:
while (page.hasNextPage()) {
  page = page.getNextPage();
  // ...
}
```

## Default Headers

We automatically send the `X-Lithic-Pagination` header set to `cursor`.

If you need to, you can override it by setting default headers on a per-request basis.

```ts
import Lithic from 'lithic';

const lithic = new Lithic();

const card = await lithic.cards.create(
  { type: 'SINGLE_USE' },
  { headers: { 'X-Lithic-Pagination': 'My-Custom-Value' } },
);
```

## Webhook Verification

We provide helper methods for verifying that a webhook request came from Lithic, and not a malicious third party.

You can use `lithic.webhooks.verifySignature(body: string, headers, secret?) -> void` or `lithic.webhooks.unwrap(body: string, headers, secret?) -> Payload`,
both of which will raise an error if the signature is invalid.

Note that the "body" parameter must be the raw JSON string sent from the server (do not parse and re-stringify it).
The `.unwrap()` method will automatically parse this JSON for you into a typed `Payload`.

For example:

```ts
// with Express:
app.use('/webhooks/lithic', bodyParser.text({ type: '*/*' }), function (req, res) {
  const payload = lithic.webhooks.unwrap(req.body, req.headers, process.env['LITHIC_WEBHOOK_SECRET']); // env var used by default; explicit here.
  console.log(payload);
  res.json({ ok: true });
});

// with Next.js (app router):
export default async function POST(req) {
  const body = await req.text(); // if you're using the pages router, you will need this trick: https://vancelucas.com/blog/how-to-access-raw-body-data-with-next-js/
  const payload = lithic.webhooks.unwrap(body, req.headers, process.env['LITHIC_WEBHOOK_SECRET']); // env var used by default; explicit here.
  console.log(payload);
  return NextResponse.json({ ok: true });
}
```

## Advanced Usage

### Accessing raw Response data (e.g., headers)

The "raw" `Response` returned by `fetch()` can be accessed through the `.asResponse()` method on the `APIPromise` type that all methods return.

You can also use the `.withResponse()` method to get the raw `Response` along with the parsed data.

```ts
const lithic = new Lithic();

const response = await lithic.cards.create({ type: 'SINGLE_USE' }).asResponse();
console.log(response.headers.get('X-My-Header'));
console.log(response.statusText); // access the underlying Response object

const { data: card, response: raw } = await lithic.cards.create({ type: 'SINGLE_USE' }).withResponse();
console.log(raw.headers.get('X-My-Header'));
console.log(card.token);
```

## Customizing the fetch client

By default, this library uses `node-fetch` in Node, and expects a global `fetch` function in other environments.

If you would prefer to use a global, web-standards-compliant `fetch` function even in a Node environment,
(for example, if you are running Node with `--experimental-fetch` or using NextJS which polyfills with `undici`),
add the following import before your first import `from "Lithic"`:

<!-- prettier-ignore -->
```ts
// Tell TypeScript and the package to use the global web fetch instead of node-fetch.
// Note, despite the name, this does not add any polyfills, but expects them to be provided if needed.
import "lithic/shims/web";
import Lithic from "lithic";
```

To do the inverse, add `import "lithic/shims/node"` (which does import polyfills).
This can also be useful if you are getting the wrong TypeScript types for `Response` - more details [here](https://github.com/lithic-com/lithic-node/tree/main/src/_shims#readme).

You may also provide a custom `fetch` function when instantiating the client,
which can be used to inspect or alter the `Request` or `Response` before/after each request:

```ts
import { fetch } from 'undici'; // as one example
import Lithic from 'lithic';

const client = new Lithic({
  fetch: (url: RequestInfo, init?: RequestInfo): Response => {
    console.log('About to make request', url, init);
    const response = await fetch(url, init);
    console.log('Got response', response);
    return response;
  },
});
```

Note that if given a `DEBUG=true` environment variable, this library will log all requests and responses automatically.
This is intended for debugging purposes only and may change in the future without notice.

## Configuring an HTTP(S) Agent (e.g., for proxies)

By default, this library uses a stable agent for all http/https requests to reuse TCP connections, eliminating many TCP & TLS handshakes and shaving around 100ms off most requests.

If you would like to disable or customize this behavior, for example to use the API behind a proxy, you can pass an `httpAgent` which is used for all requests (be they http or https), for example:

<!-- prettier-ignore -->
```ts
import http from 'http';
import HttpsProxyAgent from 'https-proxy-agent';

// Configure the default for all requests:
const lithic = new Lithic({
  httpAgent: new HttpsProxyAgent(process.env.PROXY_URL),
});

// Override per-request:
await lithic.cards.list({
  baseURL: 'http://localhost:8080/test-api',
  httpAgent: new http.Agent({ keepAlive: false }),
})
```

## Semantic Versioning

This package generally follows [SemVer](https://semver.org/spec/v2.0.0.html) conventions, though certain backwards-incompatible changes may be released as minor versions:

1. Changes that only affect static types, without breaking runtime behavior.
2. Changes to library internals which are technically public but not intended or documented for external use. _(Please open a GitHub issue to let us know if you are relying on such internals)_.
3. Changes that we do not expect to impact the vast majority of users in practice.

We take backwards-compatibility seriously and work hard to ensure you can rely on a smooth upgrade experience.

We are keen for your feedback; please open an [issue](https://www.github.com/lithic-com/lithic-node/issues) with questions, bugs, or suggestions.

## Requirements

TypeScript >= 4.5 is supported.

The following runtimes are supported:

- Node.js 18 LTS or later ([non-EOL](https://endoflife.date/nodejs)) versions.
- Deno v1.28.0 or higher, using `import Lithic from "npm:lithic"`.
- Bun 1.0 or later.
- Cloudflare Workers.
- Vercel Edge Runtime.
- Jest 28 or greater with the `"node"` environment (`"jsdom"` is not supported at this time).
- Nitro v2.6 or greater.

Note that React Native is not supported at this time.

If you are interested in other runtime environments, please open or upvote an issue on GitHub.
