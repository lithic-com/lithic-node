//
// Run with: LITHIC_API_KEY=<your_api_key> yarn tsn examples/upload_evidence.ts
//

import fs from 'fs';
import assert from 'assert';
import Lithic from 'lithic';

const lithic = new Lithic({ environment: 'sandbox' });

async function main() {
  const transactionsPage = await lithic.transactions.list();
  assert(transactionsPage.data.length > 0, 'No transactions found');

  const transaction = transactionsPage.data[0]!;
  assert(transaction.token, 'Transaction must have a token');

  const disputesPage = await lithic.disputes.list();

  let dispute = disputesPage.data[0];
  if (!dispute) {
    dispute = await lithic.disputes.create({
      amount: 42,
      reason: 'ATM_CASH_MISDISPENSE',
      transaction_token: transaction.token!,
    });
  }

  assert(dispute, 'Could not find or create a dispute');

  const file = fs.createReadStream('examples/dispute_evidence.txt');
  const upload = await lithic.disputes.uploadEvidence(dispute.token, file);
  console.log(upload);

  console.log('Done!');
}

main().catch(console.error);
