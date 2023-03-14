// File generated from our OpenAPI spec by Stainless.

import Lithic from '~/index';
const lithic = new Lithic({ apiKey: 'something1234', baseURL: 'http://127.0.0.1:4010' });

describe('resource disputes', () => {
  test('create: only required params', async () => {
    const response = await lithic.disputes.create({
      amount: 0,
      reason: 'ATM_CASH_MISDISPENSE',
      transaction_token: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
    });
  });

  test('create: required and optional params', async () => {
    const response = await lithic.disputes.create({
      amount: 0,
      customer_filed_date: '2019-12-27T18:11:19.117Z',
      reason: 'ATM_CASH_MISDISPENSE',
      transaction_token: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
      customer_note: 'string',
    });
  });

  test('retrieve', async () => {
    const response = await lithic.disputes.retrieve('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e');
  });

  test('retrieve: request options instead of params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      lithic.disputes.retrieve('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', { path: '/_stainless_unknown_path' }),
    ).rejects.toThrow(Lithic.NotFoundError);
  });

  test('update: only required params', async () => {
    const response = await lithic.disputes.update('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {});
  });

  test('update: required and optional params', async () => {
    const response = await lithic.disputes.update('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {
      amount: 0,
      customer_filed_date: '2019-12-27T18:11:19.117Z',
      customer_note: 'string',
      reason: 'ATM_CASH_MISDISPENSE',
    });
  });

  test('list: only required params', async () => {
    const response = await lithic.disputes.list();
  });

  test('list: required and optional params', async () => {
    const response = await lithic.disputes.list({
      transaction_token: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
      status: 'NEW',
      page_size: 1,
      begin: '2019-12-27T18:11:19.117Z',
      end: '2019-12-27T18:11:19.117Z',
      starting_after: 'string',
      ending_before: 'string',
    });
  });

  test('list: request options instead of params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(lithic.disputes.list({ path: '/_stainless_unknown_path' })).rejects.toThrow(
      Lithic.NotFoundError,
    );
  });

  test('list: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      lithic.disputes.list(
        {
          transaction_token: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
          status: 'NEW',
          page_size: 1,
          begin: '2019-12-27T18:11:19.117Z',
          end: '2019-12-27T18:11:19.117Z',
          starting_after: 'string',
          ending_before: 'string',
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Lithic.NotFoundError);
  });

  test('delete', async () => {
    const response = await lithic.disputes.del('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e');
  });

  test('delete: request options instead of params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      lithic.disputes.del('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', { path: '/_stainless_unknown_path' }),
    ).rejects.toThrow(Lithic.NotFoundError);
  });

  test('delete_evidence', async () => {
    const response = await lithic.disputes.deleteEvidence(
      '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
      '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
    );
  });

  test('delete_evidence: request options instead of params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      lithic.disputes.deleteEvidence(
        '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
        '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Lithic.NotFoundError);
  });

  test('initiate_evidence_upload', async () => {
    const response = await lithic.disputes.initiateEvidenceUpload('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e');
  });

  test('initiate_evidence_upload: request options instead of params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      lithic.disputes.initiateEvidenceUpload('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {
        path: '/_stainless_unknown_path',
      }),
    ).rejects.toThrow(Lithic.NotFoundError);
  });

  test('list_evidences: only required params', async () => {
    const response = await lithic.disputes.listEvidences('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e');
  });

  test('list_evidences: required and optional params', async () => {
    const response = await lithic.disputes.listEvidences('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {
      page_size: 1,
      begin: '2019-12-27T18:11:19.117Z',
      end: '2019-12-27T18:11:19.117Z',
      starting_after: 'string',
      ending_before: 'string',
    });
  });

  test('list_evidences: request options instead of params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      lithic.disputes.listEvidences('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {
        path: '/_stainless_unknown_path',
      }),
    ).rejects.toThrow(Lithic.NotFoundError);
  });

  test('list_evidences: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      lithic.disputes.listEvidences(
        '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
        {
          page_size: 1,
          begin: '2019-12-27T18:11:19.117Z',
          end: '2019-12-27T18:11:19.117Z',
          starting_after: 'string',
          ending_before: 'string',
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Lithic.NotFoundError);
  });

  test('retrieve_evidence', async () => {
    const response = await lithic.disputes.retrieveEvidence(
      '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
      '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
    );
  });

  test('retrieve_evidence: request options instead of params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      lithic.disputes.retrieveEvidence(
        '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
        '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Lithic.NotFoundError);
  });
});
