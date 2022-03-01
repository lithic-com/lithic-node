'use strict';
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
Object.defineProperty(exports, '__esModule', {value: true});
exports.makeAutoPaginationMethods = void 0;
const makeAutoPaginationMethods = (
  client,
  requestPromise, // Mutated.
  options // Mutated.
) => {
  const promiseCache = {
    currentPromise: null,
  };
  let i = 0;
  function iterate(pageResult) {
    const items = client.getPaginatedItems(pageResult);
    // Iterate through items on the current page.
    if (i < items.length) {
      const value = items[i];
      i += 1;
      return {value, done: false};
    }
    // Get params for the next page.
    const nextPageQuery = client.getNextPageQuery(options, pageResult);
    // If we're done, we're done.
    if (!nextPageQuery) return {value: undefined, done: true};
    // Reset the counter, update the request, and request the next page.
    i = 0;
    Object.assign(options, {
      query: Object.assign(Object.assign({}, options.query), nextPageQuery),
    });
    requestPromise = client.request(options);
    return requestPromise.then(iterate);
  }
  const asyncIteratorNext = () => {
    return memoizedPromise(promiseCache, (resolve, reject) => {
      return requestPromise.then(iterate).then(resolve).catch(reject);
    });
  };
  const autoPagingEach = makeAutoPagingEach(asyncIteratorNext);
  const autoPagingToArray = makeAutoPagingToArray(autoPagingEach);
  const autoPaginationMethods = {
    autoPagingEach,
    autoPagingToArray,
    // Async iterator functions:
    next: asyncIteratorNext,
    return: () =>
      __awaiter(void 0, void 0, void 0, function* () {
        // For when the consumer does 'break' or 'return' early in the loop.
        return {done: true, value: undefined};
      }),
    [getAsyncIteratorSymbol()]: () => autoPaginationMethods,
  };
  return autoPaginationMethods;
};
exports.makeAutoPaginationMethods = makeAutoPaginationMethods;
function getAsyncIteratorSymbol() {
  if (typeof Symbol !== 'undefined' && Symbol.asyncIterator) {
    return Symbol.asyncIterator;
  }
  // Follow the convention from libraries like iterall: https://github.com/leebyron/iterall#asynciterator-1
  return '@@asyncIterator';
}
/**
 * If a user calls `.next()` multiple times in parallel,
 * return the same result until something has resolved
 * to prevent page-turning race conditions.
 */
function memoizedPromise(promiseCache, cb) {
  if (promiseCache.currentPromise) {
    return promiseCache.currentPromise;
  }
  promiseCache.currentPromise = new Promise(cb).then((ret) => {
    promiseCache.currentPromise = undefined;
    return ret;
  });
  return promiseCache.currentPromise;
}
const makeAutoPagingEach = (asyncIteratorNext) => (onItem) =>
  new Promise((resolve, reject) => {
    function handleIteration(iterResult) {
      return __awaiter(this, void 0, void 0, function* () {
        if (iterResult.done) return resolve();
        const item = iterResult.value;
        const shouldContinue = yield onItem(item);
        if (shouldContinue === false) {
          return handleIteration({done: true, value: undefined});
        }
        return asyncIteratorNext().then(handleIteration);
      });
    }
    asyncIteratorNext().then(handleIteration).catch(reject);
  });
function makeAutoPagingToArray(autoPagingEach) {
  return function autoPagingToArray(opts) {
    const limit = opts === null || opts === void 0 ? void 0 : opts.limit;
    if (!limit) {
      throw Error(
        'You must pass a `limit` option to autoPagingToArray, e.g., `.autoPagingToArray({limit: 1000});`.'
      );
    }
    if (limit > 100000) {
      throw Error(
        'You cannot specify a limit of more than 100,000 items to fetch in `autoPagingToArray`; use `autoPagingEach` to iterate through longer lists.'
      );
    }
    const promise = new Promise((resolve, reject) => {
      const items = [];
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
function wrapAsyncIteratorWithCallback(asyncIteratorNext, onItem) {
  return new Promise((resolve, reject) => {
    function handleIteration(iterResult) {
      if (iterResult.done) {
        resolve();
        return;
      }
      const item = iterResult.value;
      return new Promise((next) => {
        // Bit confusing, perhaps; we pass a `resolve` fn
        // to the user, so they can decide when and if to continue.
        // They can return false, or a promise which resolves to false, to break.
        onItem(item, next);
      }).then((shouldContinue) => {
        if (shouldContinue === false) {
          return handleIteration({done: true, value: undefined});
        } else {
          return asyncIteratorNext().then(handleIteration);
        }
      });
    }
    asyncIteratorNext().then(handleIteration).catch(reject);
  });
}
//# sourceMappingURL=pagination.js.map
