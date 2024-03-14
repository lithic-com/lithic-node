#!/usr/bin/env -S yarn tsn

import Lithic from 'lithic';

const lithic = new Lithic({ environment: 'sandbox' });

async function main() {
  const transactionsPage = await lithic.transactions.list();
  if (!transactionsPage.data.length) {
    throw new Error('Expected multiple transactions to be present');
  }

  if (!transactionsPage.has_more || !transactionsPage.hasNextPage()) {
    throw new Error(`Expected multiple pages to be present, only got ${transactionsPage.data.length} items`);
  }

  const tokens: Record<string, number> = {};

  for await (const transaction of transactionsPage) {
    const existing = tokens[transaction.token];
    tokens[transaction.token] = typeof existing === 'undefined' ? 1 : existing + 1;
  }

  const duplicates = Object.entries(tokens).filter(([_, count]) => count > 1);
  if (duplicates.length) {
    console.error(Object.fromEntries(duplicates));
    throw new Error(`Found ${duplicates.length} duplicate entries!`);
  }

  console.log('Success!');
}

main();
