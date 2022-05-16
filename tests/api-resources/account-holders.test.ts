// File generated from our OpenAPI spec by Stainless.

import Lithic from '../../index';
const client = new Lithic({ apiKey: 'something1234', baseURL: 'http://127.0.0.1:4010' });

describe('resource account_holders', () => {
  test('create: only required params', async () => {
    const response = await client.accountHolders.create({
      business_entity: {
        address: {
          address1: '123 Old Forest Way',
          address2: 'pvqhr',
          city: 'Omaha',
          country: 'USA',
          postal_code: '68022',
          state: 'NE',
        },
        dba_business_name: 'vecitxgefmo',
        government_id: '114-123-1513',
        legal_business_name: 'Acme, Inc.',
        parent_company: 'cnxe',
        phone_numbers: ['+12124007676', '+12124007676', '+12124007676'],
      },
      beneficial_owner_entities: [
        {
          address: {
            address1: '123 Old Forest Way',
            address2: 'xszampionehdt',
            city: 'Omaha',
            country: 'USA',
            postal_code: '68022',
            state: 'NE',
          },
          dba_business_name: 'cinrxofkjywvsj',
          government_id: '114-123-1513',
          legal_business_name: 'Acme, Inc.',
          parent_company: 'bghjkoso',
          phone_numbers: ['+12124007676', '+12124007676', '+12124007676'],
        },
        {
          address: {
            address1: '123 Old Forest Way',
            address2: 'ajqtbpbrwdhktgjiwnar',
            city: 'Omaha',
            country: 'USA',
            postal_code: '68022',
            state: 'NE',
          },
          dba_business_name: 'cgdxilrfwho',
          government_id: '114-123-1513',
          legal_business_name: 'Acme, Inc.',
          parent_company: 'wokrivjwekvbimonp',
          phone_numbers: ['+12124007676', '+12124007676', '+12124007676'],
        },
        {
          address: {
            address1: '123 Old Forest Way',
            address2: 'niaxzrxjfohl',
            city: 'Omaha',
            country: 'USA',
            postal_code: '68022',
            state: 'NE',
          },
          dba_business_name: 'hxhzogsonu',
          government_id: '114-123-1513',
          legal_business_name: 'Acme, Inc.',
          parent_company: 'kqtweep',
          phone_numbers: ['+12124007676', '+12124007676', '+12124007676'],
        },
      ],
      beneficial_owner_individuals: [
        {
          address: {
            address1: '123 Old Forest Way',
            address2: 'wjzvcblafxlxofcahvyg',
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
            address2: 'blbtmtnbksg',
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
            address2: 'jeuuvhrhzrkcermxn',
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
          address2: 'klelbtpogcwppv',
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
          address2: 'ybt',
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
    const response = await client.accountHolders.retrieve('95c71ad3-d9ee-4211-b2b6-16d861737c57');
  });

  test('create_webhook: only required params', async () => {
    const response = await client.accountHolders.createWebhook({ url: 'vvaromyoplfhsgjrrva' });
  });

  test('create_webhook: required and optional params', async () => {
    const response = await client.accountHolders.createWebhook({ url: 'qmartkmsdzoc' });
  });

  test('list_documents', async () => {
    const response = await client.accountHolders.listDocuments('10a9fcc8-9e14-4b7a-b05c-38465ca607c2');
  });

  test('resubmit: only required params', async () => {
    const response = await client.accountHolders.resubmit('95adb286-1f73-42ea-a81a-75875d023117', {
      workflow: 'KYC_ADVANCED',
      tos_timestamp: '2022-03-08 08:00:00',
      individual: {
        address: {
          address1: '123 Old Forest Way',
          address2: 'bvhxk',
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
    const response = await client.accountHolders.resubmit('95adb286-1f73-42ea-a81a-75875d023117', {
      workflow: 'KYC_ADVANCED',
      tos_timestamp: '2022-03-08 08:00:00',
      individual: {
        address: {
          address1: '123 Old Forest Way',
          address2: '',
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
      '545fd88a-8017-4cf6-a112-78f755c1c933',
      '79b46e39-fbaa-4df0-a408-619f239553f1',
    );
  });

  test('upload_document: only required params', async () => {
    const response = await client.accountHolders.uploadDocument('93a46ab4-65c0-4f52-8728-9644a60dea0f', {
      document_type: 'COMMERCIAL_LICENCE',
    });
  });

  test('upload_document: required and optional params', async () => {
    const response = await client.accountHolders.uploadDocument('93a46ab4-65c0-4f52-8728-9644a60dea0f', {
      document_type: 'PASSPORT',
    });
  });
});
