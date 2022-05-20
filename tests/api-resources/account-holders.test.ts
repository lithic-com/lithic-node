// File generated from our OpenAPI spec by Stainless.

import Lithic from '../../index';
const client = new Lithic({ apiKey: 'something1234', baseURL: 'http://127.0.0.1:4010' });

describe('resource account_holders', () => {
  test('create: only required params', async () => {
    const response = await client.accountHolders.create({
      business_entity: {
        address: {
          address1: '123 Old Forest Way',
          address2: 'hdpzomiqchvbwpsxg',
          city: 'Omaha',
          country: 'USA',
          postal_code: '68022',
          state: 'NE',
        },
        dba_business_name: 'eedjdmagwz',
        government_id: '114-123-1513',
        legal_business_name: 'Acme, Inc.',
        parent_company: 'tt',
        phone_numbers: ['+12124007676', '+12124007676', '+12124007676'],
      },
      beneficial_owner_entities: [
        {
          address: {
            address1: '123 Old Forest Way',
            address2: 'hvvxrrqdowklwmguguk',
            city: 'Omaha',
            country: 'USA',
            postal_code: '68022',
            state: 'NE',
          },
          dba_business_name: 'yflkifbhnyznel',
          government_id: '114-123-1513',
          legal_business_name: 'Acme, Inc.',
          parent_company: 'ybs',
          phone_numbers: ['+12124007676', '+12124007676', '+12124007676'],
        },
        {
          address: {
            address1: '123 Old Forest Way',
            address2: 'gxadrnkojw',
            city: 'Omaha',
            country: 'USA',
            postal_code: '68022',
            state: 'NE',
          },
          dba_business_name: 'qjps',
          government_id: '114-123-1513',
          legal_business_name: 'Acme, Inc.',
          parent_company: 'blqymgx',
          phone_numbers: ['+12124007676', '+12124007676', '+12124007676'],
        },
        {
          address: {
            address1: '123 Old Forest Way',
            address2: 'o',
            city: 'Omaha',
            country: 'USA',
            postal_code: '68022',
            state: 'NE',
          },
          dba_business_name: 'tyisrfikl',
          government_id: '114-123-1513',
          legal_business_name: 'Acme, Inc.',
          parent_company: 'mtpsta',
          phone_numbers: ['+12124007676', '+12124007676', '+12124007676'],
        },
      ],
      beneficial_owner_individuals: [
        {
          address: {
            address1: '123 Old Forest Way',
            address2: 'nknxdyscp',
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
        {
          address: {
            address1: '123 Old Forest Way',
            address2: 'ndixtlzpkfucbm',
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
        {
          address: {
            address1: '123 Old Forest Way',
            address2: 'zqtpulcxvqjposbich',
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
      ],
      control_person: {
        address: {
          address1: '123 Old Forest Way',
          address2: 'qsnoxqdejpmmckl',
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
      nature_of_business: 'Software company selling solutions to the restaurant industry',
      tos_timestamp: '2022-03-08 08:00:00',
      website_url: 'www.mybusiness.com',
      workflow: 'KYB_BASIC',
    });
  });

  test('create: required and optional params', async () => {
    const response = await client.accountHolders.create({
      individual: {
        address: {
          address1: '123 Old Forest Way',
          address2: 'usigzkahthenahl',
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
    const response = await client.accountHolders.retrieve('5f435f96-7f21-45c3-8dfc-a7c5c2f38133');
  });

  test('retrieve: request options instead of params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.accountHolders.retrieve('5f435f96-7f21-45c3-8dfc-a7c5c2f38133', {
        path: '/_stainless_unknown_path',
      }),
    ).rejects.toThrow(Lithic.NotFoundError);
  });

  test('create_webhook: only required params', async () => {
    const response = await client.accountHolders.createWebhook({ url: 'zifgnbhwto' });
  });

  test('create_webhook: required and optional params', async () => {
    const response = await client.accountHolders.createWebhook({ url: 'dpohkexajrrvdtr' });
  });

  test('list_documents', async () => {
    const response = await client.accountHolders.listDocuments('09149caf-cc0e-4fc8-b8d0-ea481a3f5b69');
  });

  test('list_documents: request options instead of params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.accountHolders.listDocuments('09149caf-cc0e-4fc8-b8d0-ea481a3f5b69', {
        path: '/_stainless_unknown_path',
      }),
    ).rejects.toThrow(Lithic.NotFoundError);
  });

  test('resubmit: only required params', async () => {
    const response = await client.accountHolders.resubmit('af3ebee7-08c0-4395-945a-f04f9dff0e37', {
      workflow: 'KYC_ADVANCED',
      tos_timestamp: '2022-03-08 08:00:00',
      individual: {
        address: {
          address1: '123 Old Forest Way',
          address2: 'fmfs',
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
    const response = await client.accountHolders.resubmit('af3ebee7-08c0-4395-945a-f04f9dff0e37', {
      workflow: 'KYC_ADVANCED',
      tos_timestamp: '2022-03-08 08:00:00',
      individual: {
        address: {
          address1: '123 Old Forest Way',
          address2: 'lsukupuq',
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
    const response = await client.accountHolders.retrieveDocument(
      '1f19525d-9e99-42a1-98bd-b08896878cb7',
      '7deb730e-5479-4fd2-85ae-c9bf01f3f1d3',
    );
  });

  test('retrieve_document: request options instead of params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.accountHolders.retrieveDocument(
        '1f19525d-9e99-42a1-98bd-b08896878cb7',
        '7deb730e-5479-4fd2-85ae-c9bf01f3f1d3',
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Lithic.NotFoundError);
  });

  test('upload_document: only required params', async () => {
    const response = await client.accountHolders.uploadDocument('b0d74c1f-81ab-4fdb-8260-7e9d1ee75c84', {
      document_type: 'PASSPORT_CARD',
    });
  });

  test('upload_document: required and optional params', async () => {
    const response = await client.accountHolders.uploadDocument('b0d74c1f-81ab-4fdb-8260-7e9d1ee75c84', {
      document_type: 'DRIVERS_LICENSE',
    });
  });
});
