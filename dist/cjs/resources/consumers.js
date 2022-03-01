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
exports.Consumers = void 0;
// File generated from our OpenAPI spec by Stainless.
const Core = __importStar(require('../core'));
class Consumers extends Core.APIResource {
  /**
   * Enroll a new account into the program managed by the API key. This endpoint runs the candidate enrollment through the Customer Identification Program (CIP) and returns an `account_token` if successful. `street1` and `zipcode` will be used to perform address verification if authorization requests include a billing address. It's important to ensure this address is kept current to avoid possible declines.
   */
  enroll(body, options) {
    return this.post('/enroll/consumer', Object.assign({body}, options));
  }
}
exports.Consumers = Consumers;
//# sourceMappingURL=consumers.js.map
