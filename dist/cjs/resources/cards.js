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
exports.Cards = void 0;
// File generated from our OpenAPI spec by Stainless.
const Core = __importStar(require('../core'));
class Cards extends Core.APIResource {
  /**
   * Create a new virtual or physical card. Parameters `pin`, `shipping_address`, and `product_id` only apply to physical cards.
   */
  create(body, options) {
    return this.post('/cards', Object.assign({body}, options));
  }
  /**
   * Get card configuration such as spend limit and state.
   */
  retrieve(id, options) {
    return this.get(`/cards/${id}`, options);
  }
  /**
   * Update the specified properties of the card. Unsupplied properties will remain unchanged. `pin` parameter only applies to physical cards. *Note: setting a card to a `CLOSED` state is a final action that cannot be undone.*
   */
  update(id, body, options) {
    return this.patch(`/cards/${id}`, Object.assign({body}, options));
  }
  /**
   * List cards.
   */
  list(query, options) {
    return this.getAPIList('/cards', Object.assign({query}, options));
  }
  /**
   * Handling full card PANs and CVV codes requires that you comply with the Payment Card Industry Data Security Standards (PCI DSS). Some clients choose to reduce their compliance obligations by leveraging our embedded card UI solution documented below. In this setup, PANs and CVV codes are presented to the end-user via a card UI that we provide, optionally styled in the customer's branding using a specified css stylesheet. A user's browser makes the request directly to api.lithic.com, so card PANs and CVVs never touch the API customer's servers while full card data is displayed to their end-users. The response contains an HTML document. This means that the url for the request can be inserted straight into the `src` attribute of an iframe. ```html ``` You should compute the request payload on the server side. You can render it (or the whole iframe) on the server or make an ajax call from your front end code, but **do not ever embed your API key into front end code, as doing so introduces a serious security vulnerability**.
   */
  embed(query, options) {
    return this.get(
      '/embed/card',
      Object.assign(Object.assign({}, Object.assign({query}, options)), {
        headers: Object.assign(
          {Accept: 'text/html'},
          options === null || options === void 0 ? void 0 : options.headers
        ),
      })
    );
  }
  /**
   * Allow your cardholders to directly add payment cards to the device's digital wallet (e.g. Apple Pay) with one touch from your app. This requires some additional setup and configuration. Please reach out to [api@lithic.com](mailto:api@lithic.com) or your account rep for more information.
   */
  provision(id, body, options) {
    return this.post(`/cards/${id}/provision`, Object.assign({body}, options));
  }
  /**
   * Initiate print and shipment of a duplicate card. Only applies to cards of type `PHYSICAL` [beta].
   */
  reissue(id, body, options) {
    return this.post(`/cards/${id}/reissue`, Object.assign({body}, options));
  }
}
exports.Cards = Cards;
//# sourceMappingURL=cards.js.map
