'use strict';
var __createBinding =
  (this && this.__createBinding) ||
  (Object.create
    ? function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        Object.defineProperty(o, k2, {
          enumerable: true,
          get: function () {
            return m[k];
          },
        });
      }
    : function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        o[k2] = m[k];
      });
var __setModuleDefault =
  (this && this.__setModuleDefault) ||
  (Object.create
    ? function (o, v) {
        Object.defineProperty(o, 'default', {enumerable: true, value: v});
      }
    : function (o, v) {
        o['default'] = v;
      });
var __importStar =
  (this && this.__importStar) ||
  function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null)
      for (var k in mod)
        if (k !== 'default' && Object.prototype.hasOwnProperty.call(mod, k))
          __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
  };
Object.defineProperty(exports, '__esModule', {value: true});
exports.Lithic = void 0;
const Core = __importStar(require('./core'));
const API = __importStar(require('./resources'));
const environments = {
  production: 'https://api.lithic.com/v1',
  sandbox: 'https://sandbox.lithic.com/v1',
};
class Lithic extends Core.APIClient {
  constructor(apiKey, {environment = 'production', baseURL} = {}) {
    super({
      apiKey,
      baseURL: baseURL || environments[environment],
    });
    this.accounts = new API.Accounts(this);
    this.authStreamEnrollment = new API.AuthStreamEnrollmentResource(this);
    this.cards = new API.Cards(this);
    this.consumers = new API.Consumers(this);
    this.fundingSources = new API.FundingSources(this);
    this.transactions = new API.Transactions(this);
    this.status = new API.StatusResource(this);
  }
  defaultHeaders() {
    const Authorization = `api-key ${this.apiKey}`;
    return {
      Authorization,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };
  }
  getNextPageQuery(request, response) {
    // Do not iterate if we're on the last page.
    if (response.page >= response.total_pages) return false;
    return {page: response.page + 1};
  }
  getPaginatedItems(response) {
    return response.data;
  }
}
exports.Lithic = Lithic;
Lithic.APIError = Core.APIError;
Lithic.APIConnectionError = Core.APIConnectionError;
Lithic.AuthenticationError = Core.AuthenticationError;
Lithic.BadRequestError = Core.BadRequestError;
Lithic.InternalServerError = Core.InternalServerError;
Lithic.NotFoundError = Core.NotFoundError;
Lithic.ConflictError = Core.ConflictError;
Lithic.PermissionDeniedError = Core.PermissionDeniedError;
Lithic.RateLimitError = Core.RateLimitError;
Lithic.UnprocessableEntityError = Core.UnprocessableEntityError;
(function (Lithic) {})((Lithic = exports.Lithic || (exports.Lithic = {})));
exports = module.exports = Lithic;
exports.default = Lithic;
//# sourceMappingURL=index.js.map
