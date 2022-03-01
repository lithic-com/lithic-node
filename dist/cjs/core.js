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
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : {default: mod};
  };
Object.defineProperty(exports, '__esModule', {value: true});
exports.APIConnectionError =
  exports.InternalServerError =
  exports.RateLimitError =
  exports.UnprocessableEntityError =
  exports.ConflictError =
  exports.NotFoundError =
  exports.PermissionDeniedError =
  exports.AuthenticationError =
  exports.BadRequestError =
  exports.APIError =
  exports.APIResource =
  exports.APIClient =
    void 0;
const cross_fetch_1 = __importDefault(require('cross-fetch'));
const qs_1 = __importDefault(require('qs'));
const pagination_1 = require('./pagination');
class APIClient {
  constructor({apiKey, baseURL, maxRetries = 2}) {
    this.apiKey = apiKey;
    this.baseURL = baseURL;
    this.maxRetries = maxRetries;
  }
  request(options, retriesRemaining) {
    var _a;
    if (retriesRemaining === void 0) {
      retriesRemaining =
        (_a = options.maxRetries) !== null && _a !== void 0
          ? _a
          : this.maxRetries;
    }
    return __awaiter(this, void 0, void 0, function* () {
      const {method, path, query, body, headers} = options;
      const url = this.buildURL(path, query);
      const req = Object.assign(
        Object.assign({method}, body && {body: JSON.stringify(body, null, 2)}),
        {
          headers: Object.assign(
            Object.assign({}, this.defaultHeaders()),
            headers
          ),
        }
      );
      const response = yield (0, cross_fetch_1.default)(url, req).catch(
        () => null
      );
      if (!response) {
        if (retriesRemaining)
          return this.retryRequest(options, retriesRemaining);
        throw new APIConnectionError();
      }
      const responseHeaders = Object.fromEntries(response.headers.entries());
      if (!response.ok) {
        if (retriesRemaining && this.shouldRetry(response)) {
          return this.retryRequest(options, retriesRemaining, responseHeaders);
        }
        const errText = yield response.text().catch(() => 'Unknown');
        const errJSON = safeJSON(errText);
        const errMessage = errJSON ? undefined : errText;
        const err = APIError.generate(
          response.status,
          errJSON,
          errMessage,
          responseHeaders
        );
        throw err;
      }
      const contentType = response.headers.get('content-type');
      if (
        contentType === null || contentType === void 0
          ? void 0
          : contentType.includes('application/json')
      ) {
        const json = yield response.json();
        Object.defineProperty(json, 'responseHeaders', {
          enumerable: false,
          writable: false,
          value: responseHeaders,
        });
        return json;
      } else {
        // TODO handle blob, arraybuffer, other content types, etc.
        return response.text();
      }
    });
  }
  requestAPIList(options) {
    const requestPromise = this.request(options);
    const autoPaginationMethods = (0, pagination_1.makeAutoPaginationMethods)(
      this,
      requestPromise,
      options
    );
    return Object.assign(requestPromise, autoPaginationMethods);
  }
  buildURL(path, query) {
    const url = new URL(this.baseURL + path);
    if (query) {
      url.search = qs_1.default.stringify(query);
    }
    return url.toString();
  }
  shouldRetry(response) {
    // Note this is not a standard header.
    const shouldRetryHeader = response.headers.get('x-should-retry');
    // If the server explicitly says whether or not to retry, obey.
    if (shouldRetryHeader === 'true') return true;
    if (shouldRetryHeader === 'false') return false;
    // Retry on lock timeouts.
    if (response.status === 409) return true;
    // Retry on rate limits.
    if (response.status === 429) return true;
    // Retry internal errors.
    if (response.status >= 500) return true;
    return false;
  }
  retryRequest(options, retriesRemaining, responseHeaders) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
      retriesRemaining -= 1;
      // About the Retry-After header: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Retry-After
      const retryAfter = parseInt(
        (responseHeaders === null || responseHeaders === void 0
          ? void 0
          : responseHeaders['retry-after']) || ''
      );
      const maxRetries =
        (_a = options.maxRetries) !== null && _a !== void 0
          ? _a
          : this.maxRetries;
      const timeout =
        this.calculateRetryTimeoutSeconds(
          retriesRemaining,
          retryAfter,
          maxRetries
        ) * 1000;
      yield sleep(timeout);
      return this.request(options, retriesRemaining);
    });
  }
  calculateRetryTimeoutSeconds(retriesRemaining, retryAfter, maxRetries) {
    const initialRetryDelay = 0.5;
    const maxRetryDelay = 2;
    // If the API asks us to wait a certain amount of time (and it's a reasonable amount),
    // just do what it says.
    if (Number.isInteger(retryAfter) && retryAfter <= 60) {
      return retryAfter;
    }
    const numRetries = maxRetries - retriesRemaining;
    // Apply exponential backoff, but not more than the max.
    const sleepSeconds = Math.min(
      initialRetryDelay * Math.pow(numRetries - 1, 2),
      maxRetryDelay
    );
    // Apply some jitter, plus-or-minus half a second.
    const jitter = Math.random() - 0.5;
    return sleepSeconds + jitter;
  }
}
exports.APIClient = APIClient;
class APIResource {
  constructor(client) {
    this.client = client;
  }
  get(path, opts) {
    return this.client.request(Object.assign({method: 'get', path}, opts));
  }
  post(path, opts) {
    return this.client.request(Object.assign({method: 'post', path}, opts));
  }
  patch(path, opts) {
    return this.client.request(Object.assign({method: 'patch', path}, opts));
  }
  put(path, opts) {
    return this.client.request(Object.assign({method: 'put', path}, opts));
  }
  delete(path, opts) {
    return this.client.request(Object.assign({method: 'delete', path}, opts));
  }
  getAPIList(path, opts) {
    return this.client.requestAPIList(
      Object.assign({method: 'get', path}, opts)
    );
  }
}
exports.APIResource = APIResource;
class APIError extends Error {
  constructor(status, error, message, headers) {
    var _a;
    super(
      message || ((_a = error) === null || _a === void 0 ? void 0 : _a.message)
    );
    this.status = status;
    this.headers = headers;
    this.error = error;
  }
  static generate(status, error, message, headers) {
    if (!status) return new APIConnectionError();
    if (status === 400)
      return new BadRequestError(status, error, message, headers);
    if (status === 401)
      return new AuthenticationError(status, error, message, headers);
    if (status === 403)
      return new PermissionDeniedError(status, error, message, headers);
    if (status === 404)
      return new NotFoundError(status, error, message, headers);
    if (status === 409)
      return new ConflictError(status, error, message, headers);
    if (status === 422)
      return new UnprocessableEntityError(status, error, message, headers);
    if (status === 429)
      return new RateLimitError(status, error, message, headers);
    if (status >= 500)
      return new InternalServerError(status, error, message, headers);
    return new APIError(status, error, message, headers);
  }
}
exports.APIError = APIError;
class BadRequestError extends APIError {
  constructor() {
    super(...arguments);
    this.status = 400;
  }
}
exports.BadRequestError = BadRequestError;
class AuthenticationError extends APIError {
  constructor() {
    super(...arguments);
    this.status = 401;
  }
}
exports.AuthenticationError = AuthenticationError;
class PermissionDeniedError extends APIError {
  constructor() {
    super(...arguments);
    this.status = 403;
  }
}
exports.PermissionDeniedError = PermissionDeniedError;
class NotFoundError extends APIError {
  constructor() {
    super(...arguments);
    this.status = 404;
  }
}
exports.NotFoundError = NotFoundError;
class ConflictError extends APIError {
  constructor() {
    super(...arguments);
    this.status = 409;
  }
}
exports.ConflictError = ConflictError;
class UnprocessableEntityError extends APIError {
  constructor() {
    super(...arguments);
    this.status = 422;
  }
}
exports.UnprocessableEntityError = UnprocessableEntityError;
class RateLimitError extends APIError {
  constructor() {
    super(...arguments);
    this.status = 429;
  }
}
exports.RateLimitError = RateLimitError;
class InternalServerError extends APIError {}
exports.InternalServerError = InternalServerError;
class APIConnectionError extends APIError {
  constructor() {
    super(undefined, undefined, 'Connection error.', undefined);
  }
}
exports.APIConnectionError = APIConnectionError;
const safeJSON = (text) => {
  try {
    return JSON.parse(text);
  } catch (err) {
    return undefined;
  }
};
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
//# sourceMappingURL=core.js.map
