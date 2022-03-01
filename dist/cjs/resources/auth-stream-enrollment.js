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
exports.AuthStreamEnrollmentResource = void 0;
// File generated from our OpenAPI spec by Stainless.
const Core = __importStar(require('../core'));
class AuthStreamEnrollmentResource extends Core.APIResource {
  /**
   * Check status for whether you have enrolled in Authorization Stream Access (ASA) for your program in Sandbox.
   */
  retrieve(options) {
    return this.get('/auth_stream', options);
  }
  /**
   * Disenroll Authorization Stream Access (ASA) in Sandbox.
   */
  disenroll(options) {
    return this.delete('/auth_stream', options);
  }
  /**
   * Authorization Stream Access (ASA) provides the ability to make custom transaction approval decisions through an HTTP interface to the ISO 8583 message stream. ASA requests are delivered as an HTTP POST during authorization. The ASA request body adheres to the Lithic transaction schema, with some additional fields added for use in decisioning. A response should be sent with HTTP response code 200 and the approval decision in the response body. This response is converted by Lithic back into ISO 8583 format and forwarded to the network. In Sandbox, users can self-enroll and disenroll in ASA. In production, onboarding requires manual approval and setup.
   */
  enroll(body, options) {
    return this.post('/auth_stream', Object.assign({body}, options));
  }
}
exports.AuthStreamEnrollmentResource = AuthStreamEnrollmentResource;
//# sourceMappingURL=auth-stream-enrollment.js.map
