#!/usr/bin/env -S npm run tsn -T

//
// Run with: LITHIC_API_KEY=<your_api_key> ./examples/transactions.ts
//

import assert from 'assert';
import Lithic from '../src';

const client = new Lithic({
  environment: 'sandbox',
});

// Sleep function to add delays to simulate more realistic interactions with the sandbox API
function sleep(ms: number) {
  console.log(`Waiting ${ms}ms`);
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function simulateAuthDeclined(card: Lithic.Cards.Card) {
  console.log('Simulate a transaction declined...');

  const authResponse = await client.transactions.simulateAuthorization({
    pan: card.pan!,
    amount: 999999999999,
    descriptor: 'coffee shop',
  });

  await sleep(5000);

  const transaction = await client.transactions.retrieve(authResponse.token!);
  assert.strictEqual(transaction.result, 'DECLINED', 'Authorization was not declined');

  console.log('Done');
}

async function simulateAuthClearing(card: Lithic.Cards.Card) {
  console.log('Simulate a transaction clearing...');

  const authResponse = await client.transactions.simulateAuthorization({
    pan: card.pan!,
    amount: 50,
    descriptor: 'coffee shop',
  });

  await sleep(5000);

  await client.transactions.simulateClearing({
    token: authResponse.token!,
  });

  await sleep(5000);

  const transaction = await client.transactions.retrieve(authResponse.token!);

  assert.strictEqual(transaction.status, 'SETTLED', 'Transaction was not settled');

  console.log('Done');
}

async function simulatePaginatedTransaction(card: Lithic.Cards.Card) {
  console.log('Simulate a paginated transaction...');

  const firstPage = await client.transactions.list({
    card_token: card.token,
    account_token: card.account_token,
  });

  const countItemsInFirstPage = firstPage.data.length;
  if (countItemsInFirstPage > 1) {
    const secondPage = await client.transactions.list({
      card_token: card.token,
      account_token: card.account_token,
      starting_after: firstPage.data[0]!.token,
    });

    assert.strictEqual(firstPage.data[1]!.token, secondPage.data[0]!.token);
  }

  console.log('Done');
}

async function main() {
  const card = await client.cards.create({ type: 'VIRTUAL' });
  console.log(`Created new card with token '${card.token}'`);

  await sleep(2000);

  await simulateAuthDeclined(card);
  await simulateAuthClearing(card);
  await simulatePaginatedTransaction(card);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
