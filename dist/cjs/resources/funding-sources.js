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
exports.FundingSources = void 0;
// File generated from our OpenAPI spec by Stainless.
const Core = __importStar(require('../core'));
class FundingSources extends Core.APIResource {
  /**
   * Add a funding source using bank routing and account numbers or via Plaid. In the production environment, funding accounts will be set to `PENDING` state until micro-deposit validation completes while funding accounts in sandbox will be set to `ENABLED` state automatically.
   */
  create(options) {
    return this.post('/funding_sources', options);
  }
  /**
   * Update a funding source.
   */
  update(id, body, options) {
    return this.patch(`/funding_sources/${id}`, Object.assign({body}, options));
  }
  /**
   * List all the funding sources associated with the Lithic account.
   */
  list(query, options) {
    return this.getAPIList('/funding_sources', Object.assign({query}, options));
  }
  /**
   * Verify a bank account as a funding source by providing received micro-deposit amounts.
   */
  verify(id, body, options) {
    return this.post(
      `/funding_sources/${id}/verify`,
      Object.assign({body}, options)
    );
  }
}
exports.FundingSources = FundingSources;
//# sourceMappingURL=funding-sources.js.map
