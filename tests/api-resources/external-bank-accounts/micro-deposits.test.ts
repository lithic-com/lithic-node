// File generated from our OpenAPI spec by Stainless.

import Lithic from 'lithic';

const lithic = new Lithic({ apiKey: 'something1234', baseURL: 'http://127.0.0.1:4010' });

describe('resource microDeposits', () => {
  test('create: only required params', async () => {
    const response = await lithic.externalBankAccounts.microDeposits.create(
      '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
      { micro_deposits: [0, 0, 0] },
    );
  });

  test('create: required and optional params', async () => {
    const response = await lithic.externalBankAccounts.microDeposits.create(
      '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
      { micro_deposits: [0, 0, 0] },
    );
  });
});
