// File generated from our OpenAPI spec by Stainless.

import Lithic from 'lithic';

const lithic = new Lithic({ apiKey: 'something1234', baseURL: 'http://127.0.0.1:4010' });

describe('resource accountHolders', () => {
  test('create: only required params', async () => {
    const response = await lithic.accountHolders.create({
      beneficial_owner_entities: [
        {
          address: {
            address1: '123 Old Forest Way',
            city: 'Omaha',
            country: 'USA',
            postal_code: '68022',
            state: 'NE',
          },
          government_id: '114-123-1513',
          legal_business_name: 'Acme, Inc.',
          phone_numbers: ['+12124007676'],
        },
        {
          address: {
            address1: '123 Old Forest Way',
            city: 'Omaha',
            country: 'USA',
            postal_code: '68022',
            state: 'NE',
          },
          government_id: '114-123-1513',
          legal_business_name: 'Acme, Inc.',
          phone_numbers: ['+12124007676'],
        },
        {
          address: {
            address1: '123 Old Forest Way',
            city: 'Omaha',
            country: 'USA',
            postal_code: '68022',
            state: 'NE',
          },
          government_id: '114-123-1513',
          legal_business_name: 'Acme, Inc.',
          phone_numbers: ['+12124007676'],
        },
      ],
      beneficial_owner_individuals: [
        {
          address: {
            address1: '123 Old Forest Way',
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
      business_entity: {
        address: {
          address1: '123 Old Forest Way',
          city: 'Omaha',
          country: 'USA',
          postal_code: '68022',
          state: 'NE',
        },
        government_id: '114-123-1513',
        legal_business_name: 'Acme, Inc.',
        phone_numbers: ['+12124007676'],
      },
      control_person: {
        address: {
          address1: '123 Old Forest Way',
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
      tos_timestamp: '2018-05-29T21:16:05Z',
      website_url: 'www.mybusiness.com',
      workflow: 'KYB_BASIC',
    });
  });

  test('create: required and optional params', async () => {
    const response = await lithic.accountHolders.create({
      beneficial_owner_entities: [
        {
          address: {
            address1: '123 Old Forest Way',
            address2: 'string',
            city: 'Omaha',
            country: 'USA',
            postal_code: '68022',
            state: 'NE',
          },
          dba_business_name: 'string',
          government_id: '114-123-1513',
          legal_business_name: 'Acme, Inc.',
          parent_company: 'string',
          phone_numbers: ['+12124007676'],
        },
        {
          address: {
            address1: '123 Old Forest Way',
            address2: 'string',
            city: 'Omaha',
            country: 'USA',
            postal_code: '68022',
            state: 'NE',
          },
          dba_business_name: 'string',
          government_id: '114-123-1513',
          legal_business_name: 'Acme, Inc.',
          parent_company: 'string',
          phone_numbers: ['+12124007676'],
        },
        {
          address: {
            address1: '123 Old Forest Way',
            address2: 'string',
            city: 'Omaha',
            country: 'USA',
            postal_code: '68022',
            state: 'NE',
          },
          dba_business_name: 'string',
          government_id: '114-123-1513',
          legal_business_name: 'Acme, Inc.',
          parent_company: 'string',
          phone_numbers: ['+12124007676'],
        },
      ],
      beneficial_owner_individuals: [
        {
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
        {
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
        {
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
      ],
      business_entity: {
        address: {
          address1: '123 Old Forest Way',
          address2: 'string',
          city: 'Omaha',
          country: 'USA',
          postal_code: '68022',
          state: 'NE',
        },
        dba_business_name: 'string',
        government_id: '114-123-1513',
        legal_business_name: 'Acme, Inc.',
        parent_company: 'string',
        phone_numbers: ['+12124007676'],
      },
      control_person: {
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
      nature_of_business: 'Software company selling solutions to the restaurant industry',
      tos_timestamp: '2018-05-29T21:16:05Z',
      website_url: 'www.mybusiness.com',
      workflow: 'KYB_BASIC',
      kyb_passed_timestamp: '2018-05-29T21:16:05Z',
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

  test('update', async () => {
    const response = await lithic.accountHolders.update('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {});
  });

  test('createWebhook: only required params', async () => {
    const response = await lithic.accountHolders.createWebhook({ url: 'string' });
  });

  test('createWebhook: required and optional params', async () => {
    const response = await lithic.accountHolders.createWebhook({ url: 'string' });
  });

  test('listDocuments', async () => {
    const response = await lithic.accountHolders.listDocuments('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e');
  });

  test('listDocuments: request options instead of params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      lithic.accountHolders.listDocuments('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {
        path: '/_stainless_unknown_path',
      }),
    ).rejects.toThrow(Lithic.NotFoundError);
  });

  test('resubmit: only required params', async () => {
    const response = await lithic.accountHolders.resubmit('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {
      individual: {
        address: {
          address1: '123 Old Forest Way',
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
      tos_timestamp: '2018-05-29T21:16:05Z',
      workflow: 'KYC_ADVANCED',
    });
  });

  test('resubmit: required and optional params', async () => {
    const response = await lithic.accountHolders.resubmit('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {
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
      tos_timestamp: '2018-05-29T21:16:05Z',
      workflow: 'KYC_ADVANCED',
    });
  });

  test('retrieveDocument', async () => {
    const response = await lithic.accountHolders.retrieveDocument(
      '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
      '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
    );
  });

  test('retrieveDocument: request options instead of params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      lithic.accountHolders.retrieveDocument(
        '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
        '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Lithic.NotFoundError);
  });

  test('uploadDocument: only required params', async () => {
    const response = await lithic.accountHolders.uploadDocument('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {
      document_type: 'commercial_license',
    });
  });

  test('uploadDocument: required and optional params', async () => {
    const response = await lithic.accountHolders.uploadDocument('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {
      document_type: 'commercial_license',
    });
  });
});
