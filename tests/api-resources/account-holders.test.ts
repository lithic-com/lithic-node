// File generated from our OpenAPI spec by Stainless.

import Lithic from '../../index';
const lithic = new Lithic({ apiKey: 'something1234', baseURL: 'http://127.0.0.1:4010' });

describe('resource account_holders', () => {
  test('create: only required params', async () => {
    const response = await lithic.accountHolders.create({
      individual: {
        address: {
          address1: '123 Old Forest Way',
          address2: 'string',
          city: 'Omaha',
          country: 'USA',
          postal_code: '68022',
          state: 'NE',
        },
        dob: '1991-03-08 08:00:00',
        email: 'tom@middle-earth.com',
        first_name: 'Tom',
        government_id: '111-23-1412',
        last_name: 'Bombadil',
        phone_number: '+12124007676',
      },
      tos_timestamp: '2022-03-08 08:00:00',
      workflow: 'KYC_ADVANCED',
    });
  });

  test('create: required and optional params', async () => {
    const response = await lithic.accountHolders.create({
      individual: {
        address: {
          address1: '123 Old Forest Way',
          address2: 'string',
          city: 'Omaha',
          country: 'USA',
          postal_code: '68022',
          state: 'NE',
        },
        dob: '1991-03-08 08:00:00',
        email: 'tom@middle-earth.com',
        first_name: 'Tom',
        government_id: '111-23-1412',
        last_name: 'Bombadil',
        phone_number: '+12124007676',
      },
      kyc_passed_timestamp: '2022-03-09 08:00:00',
      tos_timestamp: '2022-03-08 08:00:00',
      workflow: 'KYC_ADVANCED',
    });
  });

  test('retrieve', async () => {
    const response = await lithic.accountHolders.retrieve('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e');
  });

  test('retrieve: request options instead of params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      lithic.accountHolders.retrieve('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {
        path: '/_stainless_unknown_path',
      }),
    ).rejects.toThrow(Lithic.NotFoundError);
  });

  test('create_webhook: only required params', async () => {
    const response = await lithic.accountHolders.createWebhook({ url: 'string' });
  });

  test('create_webhook: required and optional params', async () => {
    const response = await lithic.accountHolders.createWebhook({ url: 'string' });
  });

  test('list_documents', async () => {
    const response = await lithic.accountHolders.listDocuments('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e');
  });

  test('list_documents: request options instead of params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      lithic.accountHolders.listDocuments('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {
        path: '/_stainless_unknown_path',
      }),
    ).rejects.toThrow(Lithic.NotFoundError);
  });

  test('resubmit: only required params', async () => {
    const response = await lithic.accountHolders.resubmit('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {
      workflow: 'KYC_ADVANCED',
      tos_timestamp: '2022-03-08 08:00:00',
      individual: {
        address: {
          address1: '123 Old Forest Way',
          address2: 'string',
          city: 'Omaha',
          country: 'USA',
          postal_code: '68022',
          state: 'NE',
        },
        dob: '1991-03-08 08:00:00',
        email: 'tom@middle-earth.com',
        first_name: 'Tom',
        government_id: '111-23-1412',
        last_name: 'Bombadil',
        phone_number: '+12124007676',
      },
    });
  });

  test('resubmit: required and optional params', async () => {
    const response = await lithic.accountHolders.resubmit('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {
      workflow: 'KYC_ADVANCED',
      tos_timestamp: '2022-03-08 08:00:00',
      individual: {
        address: {
          address1: '123 Old Forest Way',
          address2: 'string',
          city: 'Omaha',
          country: 'USA',
          postal_code: '68022',
          state: 'NE',
        },
        dob: '1991-03-08 08:00:00',
        email: 'tom@middle-earth.com',
        first_name: 'Tom',
        government_id: '111-23-1412',
        last_name: 'Bombadil',
        phone_number: '+12124007676',
      },
    });
  });

  test('retrieve_document', async () => {
    const response = await lithic.accountHolders.retrieveDocument(
      '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
      '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
    );
  });

  test('retrieve_document: request options instead of params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      lithic.accountHolders.retrieveDocument(
        '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
        '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Lithic.NotFoundError);
  });

  test('upload_document: only required params', async () => {
    const response = await lithic.accountHolders.uploadDocument('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {
      document_type: 'COMMERCIAL_LICENCE',
    });
  });

  test('upload_document: required and optional params', async () => {
    const response = await lithic.accountHolders.uploadDocument('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {
      document_type: 'COMMERCIAL_LICENCE',
    });
  });
});
