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
const crypto_1 = __importDefault(require('crypto'));
const index_1 = __importDefault(require('./index'));
const lithic = new index_1.default('5344d81a-da4a-4843-bce5-5495e79096b3', {
  environment: 'sandbox',
});
const hmacSignature = (key, msg) => {
  return crypto_1.default
    .createHmac('sha256', key)
    .update(msg)
    .digest('base64');
};
const embedRequestParams = (params) => {
  const queryParams = Object.fromEntries(
    Object.entries(params).filter(([k, v]) => !!v)
  );
  const embedRequestJson = JSON.stringify(
    queryParams,
    Object.keys(queryParams).sort()
  );
  return {
    embed_request: Buffer.from(embedRequestJson).toString('base64'),
    hmac: hmacSignature(lithic.apiKey, embedRequestJson),
  };
};
function main() {
  return __awaiter(this, void 0, void 0, function* () {
    const card = yield lithic.cards.create({
      type: 'SINGLE_USE',
    });
    console.log(card);
    const card_token = card.token;
    const {token} = yield lithic.transactions.simulateAuthorization({
      amount: 200,
      descriptor: 'Test',
      pan: card.pan,
    });
    yield lithic.transactions.simulateClearing({
      amount: 200,
      token: token,
    });
    const transactions = yield lithic.transactions.list({
      card_token,
    });
    console.log(
      'Transactions',
      transactions.data.map(({result, status, amount}) => ({
        result,
        status,
        amount,
      }))
    );
    const embedParams = embedRequestParams({token: card_token});
    console.log(embedParams);
    const embedHtml = yield lithic.cards.embed(embedParams);
    console.log(embedHtml);
    let i = 0;
    // for await (const card of lithic.cards.list({ page_size: 5 })) {
    //   console.log('Card', i++, card.token);
    //   if (i > 16) {
    //     break;
    //   }
    // }
    yield lithic.cards.list({page_size: 5}).autoPagingEach((card) =>
      __awaiter(this, void 0, void 0, function* () {
        console.log('Card', i++, card.token);
        if (i > 16) return false;
      })
    );
    console.log('Done', i);
    const someCards = yield lithic.cards
      .list({page_size: 5})
      .autoPagingToArray({limit: 17});
    console.log(
      'Done',
      someCards.map(({token}) => token),
      someCards.length
    );
    // @ts-expect-error 'foo' does not exist in type 'CardCreateParams'
    yield lithic.cards.create({type: 'singel_use'}).catch((e) => {
      if (e instanceof index_1.default.BadRequestError) {
        console.log('Bad request!', e);
      } else {
        throw e;
      }
    });
  });
}
main().catch(console.error);
//# sourceMappingURL=example.js.map
