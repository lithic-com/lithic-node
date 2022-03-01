import crypto from 'crypto';
import Lithic from './index';

const lithic = new Lithic('5344d81a-da4a-4843-bce5-5495e79096b3', {
  environment: 'sandbox',
});

const hmacSignature = (key: string, msg: string): string => {
  return crypto.createHmac('sha256', key).update(msg).digest('base64');
};

const embedRequestParams = (params: {
  token: string;
  css?: string | undefined;
  account_token?: string | undefined;
  target_origin?: string | undefined;
}): Lithic.CardEmbedParams => {
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

async function main() {
  const card = await lithic.cards.create({
    type: 'SINGLE_USE',
  });
  console.log(card);
  const card_token = card.token!;

  const {token} = await lithic.transactions.simulateAuthorization({
    amount: 200,
    descriptor: 'Test',
    pan: card.pan!,
  });
  await lithic.transactions.simulateClearing({
    amount: 200,
    token: token!,
  });

  const transactions = await lithic.transactions.list({
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
  const embedHtml = await lithic.cards.embed(embedParams);
  console.log(embedHtml);

  let i = 0;
  // for await (const card of lithic.cards.list({ page_size: 5 })) {
  //   console.log('Card', i++, card.token);
  //   if (i > 16) {
  //     break;
  //   }
  // }
  await lithic.cards.list({page_size: 5}).autoPagingEach(async (card) => {
    console.log('Card', i++, card.token);
    if (i > 16) return false;
  });
  console.log('Done', i);

  const someCards = await lithic.cards
    .list({page_size: 5})
    .autoPagingToArray({limit: 17});
  console.log(
    'Done',
    someCards.map(({token}) => token),
    someCards.length
  );

  // @ts-expect-error 'foo' does not exist in type 'CardCreateParams'
  await lithic.cards.create({type: 'singel_use'}).catch((e: unknown) => {
    if (e instanceof Lithic.BadRequestError) {
      console.log('Bad request!', e);
    } else {
      throw e;
    }
  });
}

main().catch(console.error);
