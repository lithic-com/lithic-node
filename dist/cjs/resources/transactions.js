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
exports.Transactions = void 0;
// File generated from our OpenAPI spec by Stainless.
const Core = __importStar(require('../core'));
class Transactions extends Core.APIResource {
  /**
   * List specific transaction.
   */
  retrieve(id, options) {
    return this.get(`/transactions/${id}`, options);
  }
  /**
   * List transactions.
   */
  list(query, options) {
    return this.getAPIList('/transactions', Object.assign({query}, options));
  }
  /**
   * Simulates an authorization request from the payment network as if it came from a merchant acquirer. If you're configured for ASA, simulating auths requires your ASA client to be set up properly (respond with a valid JSON to the ASA request).
   */
  simulateAuthorization(body, options) {
    return this.post('/simulate/authorize', Object.assign({body}, options));
  }
  /**
   * Clears an existing authorization. After this event, the transaction is no longer pending. If no `amount` is supplied to this endpoint, the amount of the transaction will be captured. Any transaction that has any amount completed at all do not have access to this behavior.
   */
  simulateClearing(body, options) {
    return this.post('/simulate/clearing', Object.assign({body}, options));
  }
  /**
   * Returns (aka refunds) an amount back to a card. Returns are cleared immediately and do not spend time in a `PENDING` state.
   */
  simulateReturn(body, options) {
    return this.post('/simulate/return', Object.assign({body}, options));
  }
  /**
   * Voids an existing, uncleared (aka pending) authorization. If amount is not sent the full amount will be voided. Cannot be used on partially completed transactions, but can be used on partially voided transactions.
   */
  simulateVoid(body, options) {
    return this.post('/simulate/void', Object.assign({body}, options));
  }
}
exports.Transactions = Transactions;
//# sourceMappingURL=transactions.js.map
