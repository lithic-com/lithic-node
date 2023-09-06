# Lithic Node API Library

[![NPM version](https://img.shields.io/npm/v/lithic.svg)](https://npmjs.org/package/lithic)

This library provides convenient access to the Lithic Node REST API from server-side TypeScript or JavaScript.

The API documentation can be found [here](https://docs.lithic.com).

## Installation

```sh
npm install --save lithic
# or
yarn add lithic
```

## Usage

The full API of this library can be found in [api.md](https://www.github.com/lithic-com/lithic-node/blob/master/api.md).

```js
import Lithic from 'lithic';

const lithic = new Lithic({
  apiKey: 'my api key', // defaults to process.env["LITHIC_API_KEY"]
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
  apiKey: 'my api key', // defaults to process.env["LITHIC_API_KEY"]
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
Connection errors (for example, due to a network connectivity problem), 409 Conflict, 429 Rate Limit,
and >=500 Internal errors will all be retried by default.

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

const { data: cards, response: raw } = await lithic.cards.create({ type: 'SINGLE_USE' }).withResponse();
console.log(raw.headers.get('X-My-Header'));
console.log(cards.token);
```

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

This package generally attempts to follow [SemVer](https://semver.org/spec/v2.0.0.html) conventions, though certain backwards-incompatible changes may be released as minor versions:

1. Changes that only affect static types, without breaking runtime behavior.
2. Changes to library internals which are technically public but not intended or documented for external use. _(Please open a GitHub issue to let us know if you are relying on such internals)_.
3. Changes that we do not expect to impact the vast majority of users in practice.

We take backwards-compatibility seriously and work hard to ensure you can rely on a smooth upgrade experience.

We are keen for your feedback; please open an [issue](https://www.github.com/lithic-com/lithic-node/issues) with questions, bugs, or suggestions.

## Requirements

TypeScript >= 4.5 is supported.

The following runtimes are supported:

- Node.js 16 LTS or later ([non-EOL](https://endoflife.date/nodejs)) versions.
- Deno v1.28.0 or higher, using `import Lithic from "npm:lithic"`.
  Deno Deploy is not yet supported.
- Cloudflare Workers.
- Vercel Edge Runtime.

If you are interested in other runtime environments, please open or upvote an issue on GitHub.
