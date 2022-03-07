import { APIList, APIClient, FinalRequestOptions } from './core';

type AutoPagingEachCallback<Rsp> = (item: Rsp) => boolean | void | Promise<boolean | void>;

type AutoPagingEach<Rsp> = (callback: AutoPagingEachCallback<Rsp>) => Promise<void>;

type AutoPagingToArray<Rsp> = (opts: { limit: number }) => Promise<Array<Rsp>>;

export type AutoPaginationMethods<Rsp> = AsyncIterableIterator<Rsp> & {
  autoPagingEach: AutoPagingEach<Rsp>;
  autoPagingToArray: AutoPagingToArray<Rsp>;
};

export const makeAutoPaginationMethods = <Req, Rsp>(
  client: APIClient,
  requestPromise: Promise<APIList<Rsp>>, // Mutated.
  options: FinalRequestOptions<Req>, // Mutated.
): AutoPaginationMethods<Rsp> => {
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

  const autoPagingEach = makeAutoPagingEach(asyncIteratorNext);
  const autoPagingToArray = makeAutoPagingToArray(autoPagingEach);

  const autoPaginationMethods: AutoPaginationMethods<Rsp> = {
    autoPagingEach,
    autoPagingToArray,

    // Async iterator functions:
    next: asyncIteratorNext,
    return: async () => {
      // For when the consumer does 'break' or 'return' early in the loop.
      return { done: true, value: undefined };
    },
    [getAsyncIteratorSymbol()]: () => autoPaginationMethods,
  };
  return autoPaginationMethods;
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

const makeAutoPagingEach =
  <Rsp>(asyncIteratorNext: () => Promise<IteratorResult<Rsp>>) =>
  (onItem: AutoPagingEachCallback<Rsp>) =>
    new Promise<void>((resolve, reject) => {
      async function handleIteration(iterResult: IteratorResult<Rsp>): Promise<boolean | void> {
        if (iterResult.done) return resolve();

        const item = iterResult.value;

        const shouldContinue = await onItem(item);
        if (shouldContinue === false) {
          return handleIteration({ done: true, value: undefined });
        }

        return asyncIteratorNext().then(handleIteration);
      }

      asyncIteratorNext().then(handleIteration).catch(reject);
    });

function makeAutoPagingToArray<Rsp>(autoPagingEach: AutoPagingEach<Rsp>): AutoPagingToArray<Rsp> {
  return function autoPagingToArray(opts: { limit: number }): Promise<Rsp[]> {
    const limit = opts?.limit;
    if (!limit) {
      throw Error(
        'You must pass a `limit` option to autoPagingToArray, e.g., `.autoPagingToArray({limit: 1000});`.',
      );
    }
    if (limit > 100000) {
      throw Error(
        'You cannot specify a limit of more than 100,000 items to fetch in `autoPagingToArray`; use `autoPagingEach` to iterate through longer lists.',
      );
    }
    const promise = new Promise<Rsp[]>((resolve, reject) => {
      const items: Rsp[] = [];
      autoPagingEach((item) => {
        items.push(item);
        if (items.length >= limit) {
          return false;
        }
      })
        .then(() => {
          resolve(items);
        })
        .catch(reject);
    });
    return promise;
  };
}
