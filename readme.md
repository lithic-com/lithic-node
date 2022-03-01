# Lithic Node API Library

The Lithic Node library provides convenient access
to the Lithic REST API from applications written in server-side JavaScript.
It includes TypeScript definitions for all request params and response fields.

## Installation

```sh
npm install --save lithic
# or
yarn add lithic
```

## Usage

```js
import Lithic from 'lithic';

const lithic = new Lithic(process.env.LITHIC_API_KEY, {
  environment: 'sandbox', // or 'production'
});

async function main() {
  // returns type Lithic.Card
  const card = await lithic.cards.create({
    type: 'SINGLE_USE',
  });

  console.log(card.token);
}
main();
```

## Handling errors

When the library is unable to connect to the API,
or if the API returns a non-success status code (i.e., 4xx or 5xx response),
a subclass of `APIError` will be thrown:

```ts
async function main() {
  const card = await lithic.cards.create({type: 'singel_use'}).catch((err) => {
    if (err instanceof Lithic.APIError) {
      console.log(err.status); // 400
      console.log(err.name); // BadRequestError
      console.log(err.error?.message); // Invalid parameter(s): type
      console.log(err.error?.debugging_request_id); // 94d5e915-xxxx-4cee-a4f5-2xd6ebd279ac
      console.log(err.headers); // {server: 'nginx', ...}
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

### Retries

Certain errors will be automatically retried twice by default, with a short exponential backoff.
Connection errors (for example, due to a network connectivity problem), 409 Conflict, 429 Rate Limit,
and >=500 Internal errors will all be retried by default.

You can disable or configure this behavior by passing `maxRetries: 0` to the client instantiation
or in a request's options, e.g.;

```js
// Configure the default across the library:
const lithic = new Lithic(process.env.LITHIC_API_KEY, {
  maxRetries: 0, // default is 2
});

// Or, configure this per-request:
lithic.cards.list({page_size: 5}, {maxRetries: 5});
```

## Auto-pagination

List methods in the Lithic API are paginated.
This library provides helpers to automatically request more pages as you iterate through data.

### Async Iteration

In Node 10+ (or other environments with support for
[async iteration](https://github.com/tc39/proposal-async-iteration#the-async-iteration-statement-for-await-of)
such as [babel](https://babeljs.io/docs/en/babel-plugin-transform-async-generator-functions)),
you can use `for await of` syntax to iterate through items across all pages:

```js
for await (const card of lithic.cards.list()) {
  console.log(card.token);
  if (shouldStop()) {
    break;
  }
}
```

### `.autoPagingEach(callback)`

On older versions of Node which do not support async iteration,
you can use `autoPagingEach`, which accepts a callback for each item.
Return `false` (or a promise resolving to `false`) from this callback to stop iteration.

```js
lithic.cards
  .list()
  .autoPagingEach((card) => {
    console.log(card.token);
    return doSomething(card).then(() => {
      if (shouldBreak()) {
        return false;
      }
    });
  })
  .then(() => {
    console.log('Done iterating.');
  });
```

#### `.autoPagingToArray()`

As a convenience for cases where you expect the number of items to be relatively small,
this helper returns a promise of an array of items across _all_ pages for a list request.

```js
const allNewCards = await lithic.cards
  .list({begin: lastMonth})
  .autoPagingToArray({limit: 1000});
```

Note that you must pass a `limit` option to prevent runaway list growth from consuming too much memory.

## Requirements

Node 8, 10 or higher.
