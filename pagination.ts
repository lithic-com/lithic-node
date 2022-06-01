import { APIList, APIClient, FinalRequestOptions } from './core';

export const makePaginationIterator = <Req, Rsp>(
  client: APIClient,
  requestPromise: Promise<APIList<Rsp>>, // Mutated.
  options: FinalRequestOptions<Req>, // Mutated.
): AsyncIterableIterator<Rsp> => {
  const promiseCache: PromiseCache<IteratorResult<Rsp>> = { currentPromise: null };
  let i = 0;

  function iterate(pageResult: APIList<Rsp>): Promise<IteratorResult<Rsp>> | IteratorResult<Rsp> {
    const items: Rsp[] = client.getPaginatedItems(pageResult);

    // Iterate through items on the current page.
    if (i < items.length) {
      const value = items[i]!;
      i += 1;

      return { value, done: false };
    }

    // Get params for the next page.
    const nextPageQuery = client.getNextPageQuery(options, pageResult);

    // If we're done, we're done.
    if (!nextPageQuery) return { value: undefined, done: true };

    // Reset the counter, update the request, and request the next page.
    i = 0;
    Object.assign(options, { query: { ...options.query, ...nextPageQuery } });
    requestPromise = client.request<Req, APIList<Rsp>>(options);
    return requestPromise.then(iterate);
  }

  const asyncIteratorNext = (): Promise<IteratorResult<Rsp>> => {
    return memoizedPromise(promiseCache, (resolve, reject) => {
      return requestPromise.then(iterate).then(resolve).catch(reject);
    });
  };

  const asyncIterable: AsyncIterableIterator<Rsp> = {
    // Async iterator functions:
    next: asyncIteratorNext,
    return: async () => {
      // For when the consumer does 'break' or 'return' early in the loop.
      return { done: true, value: undefined };
    },
    [getAsyncIteratorSymbol()]: () => asyncIterable,
  };
  return asyncIterable;
};

/**
 * ----------------
 * Private Helpers:
 * ----------------
 */

type PromiseCache<T> = {
  currentPromise: Promise<T> | null | undefined;
};

function getAsyncIteratorSymbol(): typeof Symbol.asyncIterator {
  if (typeof Symbol !== 'undefined' && Symbol.asyncIterator) {
    return Symbol.asyncIterator;
  }
  // Follow the convention from libraries like iterall: https://github.com/leebyron/iterall#asynciterator-1
  return '@@asyncIterator' as unknown as typeof Symbol.asyncIterator;
}

/**
 * If a user calls `.next()` multiple times in parallel,
 * return the same result until something has resolved
 * to prevent page-turning race conditions.
 */
function memoizedPromise<T>(
  promiseCache: PromiseCache<T>,
  cb: (resolve: (value: T | PromiseLike<T>) => void, reject: (reason?: any) => void) => void,
): Promise<T> {
  if (promiseCache.currentPromise) {
    return promiseCache.currentPromise;
  }
  promiseCache.currentPromise = new Promise<T>(cb).then((ret) => {
    promiseCache.currentPromise = undefined;
    return ret;
  });
  return promiseCache.currentPromise;
}
