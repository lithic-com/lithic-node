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
exports.Accounts = void 0;
// File generated from our OpenAPI spec by Stainless.
const Core = __importStar(require('../core'));
class Accounts extends Core.APIResource {
  /**
   * Get account configuration such as spend limits.
   */
  retrieve(id, options) {
    return this.get(`/accounts/${id}`, options);
  }
  /**
   * Update account configuration such as spend limits. Can only be run on accounts that are part of the program managed by this API key. Accounts that are in the `PAUSED` state will not be able to transact or create new cards.
   */
  update(id, body, options) {
    return this.patch(`/accounts/${id}`, Object.assign({body}, options));
  }
  /**
   * List account configurations. This endpoint can only be used on accounts that are part of the program the calling API key manages.
   */
  list(query, options) {
    return this.getAPIList('/accounts', Object.assign({query}, options));
  }
}
exports.Accounts = Accounts;
//# sourceMappingURL=accounts.js.map
