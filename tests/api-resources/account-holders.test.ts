// File generated from our OpenAPI spec by Stainless.

import Lithic from '../../index';
const client = new Lithic({ apiKey: 'something1234', baseURL: 'http://127.0.0.1:4010' });

describe('resource account_holders', () => {
  test('create: only required params', async () => {
    const response = await client.accountHolders.create({
      business_entity: {
        address: {
          address1: '123 Old Forest Way',
          address2: 'qhrnvecitxgefmofc',
          city: 'Omaha',
          country: 'USA',
          postal_code: '68022',
          state: 'NE',
        },
        dba_business_name: 'xeqxszampi',
        government_id: '114-123-1513',
        legal_business_name: 'Acme, Inc.',
        parent_company: 'nehdtscinrx',
        phone_numbers: ['+12124007676', '+12124007676', '+12124007676'],
      },
      beneficial_owner_entities: [
        {
          address: {
            address1: '123 Old Forest Way',
            address2: 'fkjywvsjkbg',
            city: 'Omaha',
            country: 'USA',
            postal_code: '68022',
            state: 'NE',
          },
          dba_business_name: 'jkosoz',
          government_id: '114-123-1513',
          legal_business_name: 'Acme, Inc.',
          parent_company: '',
          phone_numbers: ['+12124007676', '+12124007676', '+12124007676'],
        },
        {
          address: {
            address1: '123 Old Forest Way',
            address2: 'qtbpbrw',
            city: 'Omaha',
            country: 'USA',
            postal_code: '68022',
            state: 'NE',
          },
          dba_business_name: 'hkt',
          government_id: '114-123-1513',
          legal_business_name: 'Acme, Inc.',
          parent_company: 'jiwna',
          phone_numbers: ['+12124007676', '+12124007676', '+12124007676'],
        },
        {
          address: {
            address1: '123 Old Forest Way',
            address2: 'ocgdxilrfwhov',
            city: 'Omaha',
            country: 'USA',
            postal_code: '68022',
            state: 'NE',
          },
          dba_business_name: 'okrivjwekvbimonpp',
          government_id: '114-123-1513',
          legal_business_name: 'Acme, Inc.',
          parent_company: 'iaxzrxjfoh',
          phone_numbers: ['+12124007676', '+12124007676', '+12124007676'],
        },
      ],
      beneficial_owner_individuals: [
        {
          address: {
            address1: '123 Old Forest Way',
            address2: 'nhxhzogso',
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
            address2: 'ujkqtweepz',
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
            address2: 'jzvcblafxlxofcahvy',
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
          address2: 'oblbt',
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
      business_entity: {
        address: {
          address1: '123 Old Forest Way',
          address2: 'bksgvjeuuv',
          city: 'Omaha',
          country: 'USA',
          postal_code: '68022',
          state: 'NE',
        },
        dba_business_name: 'rhzrkc',
        government_id: '114-123-1513',
        legal_business_name: 'Acme, Inc.',
        parent_company: 'rmx',
        phone_numbers: ['+12124007676', '+12124007676', '+12124007676'],
      },
      beneficial_owner_entities: [
        {
          address: {
            address1: '123 Old Forest Way',
            address2: 'sklelbtpog',
            city: 'Omaha',
            country: 'USA',
            postal_code: '68022',
            state: 'NE',
          },
          dba_business_name: 'w',
          government_id: '114-123-1513',
          legal_business_name: 'Acme, Inc.',
          parent_company: 'pvmieybteoit',
          phone_numbers: ['+12124007676', '+12124007676', '+12124007676'],
        },
        {
          address: {
            address1: '123 Old Forest Way',
            address2: 'crwfvqxyd',
            city: 'Omaha',
            country: 'USA',
            postal_code: '68022',
            state: 'NE',
          },
          dba_business_name: 'c',
          government_id: '114-123-1513',
          legal_business_name: 'Acme, Inc.',
          parent_company: 'dskclwoldm',
          phone_numbers: ['+12124007676', '+12124007676', '+12124007676'],
        },
        {
          address: {
            address1: '123 Old Forest Way',
            address2: 'mvjm',
            city: 'Omaha',
            country: 'USA',
            postal_code: '68022',
            state: 'NE',
          },
          dba_business_name: 'vvaromyoplfhsgjrrva',
          government_id: '114-123-1513',
          legal_business_name: 'Acme, Inc.',
          parent_company: 'qmartkmsdzoc',
          phone_numbers: ['+12124007676', '+12124007676', '+12124007676'],
        },
      ],
      beneficial_owner_individuals: [
        {
          address: {
            address1: '123 Old Forest Way',
            address2: 'b',
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
            address2: 'pztunoxchsmrz',
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
            address2: 'i',
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
          address2: 'enhliurkbmuepirv',
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
      kyb_passed_timestamp: '2022-03-08 08:00:00',
      nature_of_business: 'Software company selling solutions to the restaurant industry',
      tos_timestamp: '2022-03-08 08:00:00',
      website_url: 'www.mybusiness.com',
      workflow: 'KYB_BYO',
    });
  });

  test('retrieve', async () => {
    const response = await client.accountHolders.retrieve('2861f732-eae8-41a7-9875-d02311730c4e');
  });

  test('retrieve: request options instead of params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.accountHolders.retrieve('2861f732-eae8-41a7-9875-d02311730c4e', {
        path: '/_stainless_unknown_path',
      }),
    ).rejects.toThrow(Lithic.NotFoundError);
  });

  test('create_webhook: only required params', async () => {
    const response = await client.accountHolders.createWebhook({ url: 'bjhizvon' });
  });

  test('create_webhook: required and optional params', async () => {
    const response = await client.accountHolders.createWebhook({ url: 'oadmuzljccemn' });
  });

  test('list_documents', async () => {
    const response = await client.accountHolders.listDocuments('f755c1c9-3379-4b46-a39f-baadf0e40861');
  });

  test('list_documents: request options instead of params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.accountHolders.listDocuments('f755c1c9-3379-4b46-a39f-baadf0e40861', {
        path: '/_stainless_unknown_path',
      }),
    ).rejects.toThrow(Lithic.NotFoundError);
  });

  test('resubmit: only required params', async () => {
    const response = await client.accountHolders.resubmit('9f239553-f193-4a46-ab46-5c0f52872896', {
      workflow: 'KYC_ADVANCED',
      tos_timestamp: '2022-03-08 08:00:00',
      individual: {
        address: {
          address1: '123 Old Forest Way',
          address2: 'hqkavx',
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
    const response = await client.accountHolders.resubmit('9f239553-f193-4a46-ab46-5c0f52872896', {
      workflow: 'KYC_ADVANCED',
      tos_timestamp: '2022-03-08 08:00:00',
      individual: {
        address: {
          address1: '123 Old Forest Way',
          address2: 'aydmuwbusgztw',
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
      'db5ff6ad-b57e-412f-bad1-d21d9408b109',
      '1535ea55-8b9a-43f9-8a34-16e70e790fe8',
    );
  });

  test('retrieve_document: request options instead of params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.accountHolders.retrieveDocument(
        'db5ff6ad-b57e-412f-bad1-d21d9408b109',
        '1535ea55-8b9a-43f9-8a34-16e70e790fe8',
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Lithic.NotFoundError);
  });

  test('upload_document: only required params', async () => {
    const response = await client.accountHolders.uploadDocument('58a057ee-b310-4b6e-98df-07e0a8e899cd', {
      document_type: 'DRIVERS_LICENSE',
    });
  });

  test('upload_document: required and optional params', async () => {
    const response = await client.accountHolders.uploadDocument('58a057ee-b310-4b6e-98df-07e0a8e899cd', {
      document_type: 'DRIVERS_LICENSE',
    });
  });
});
