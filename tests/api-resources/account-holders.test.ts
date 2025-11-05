// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Lithic from 'lithic';

const client = new Lithic({
  apiKey: 'My Lithic API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource accountHolders', () => {
  test('create: only required params', async () => {
    const responsePromise = client.accountHolders.create({
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
        phone_numbers: ['+15555555555'],
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
      },
      nature_of_business: 'Software company selling solutions to the restaurant industry',
      tos_timestamp: '2018-05-29T21:16:05Z',
      workflow: 'KYB_BASIC',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('create: required and optional params', async () => {
    const response = await client.accountHolders.create({
      beneficial_owner_individuals: [
        {
          address: {
            address1: '123 Old Forest Way',
            city: 'Omaha',
            country: 'USA',
            postal_code: '68022',
            state: 'NE',
            address2: 'address2',
          },
          dob: '1991-03-08 08:00:00',
          email: 'tom@middle-earth.com',
          first_name: 'Tom',
          government_id: '111-23-1412',
          last_name: 'Bombadil',
          phone_number: '+15555555555',
        },
      ],
      business_entity: {
        address: {
          address1: '123 Old Forest Way',
          city: 'Omaha',
          country: 'USA',
          postal_code: '68022',
          state: 'NE',
          address2: 'address2',
        },
        government_id: '114-123-1513',
        legal_business_name: 'Acme, Inc.',
        phone_numbers: ['+15555555555'],
        dba_business_name: 'dba_business_name',
        parent_company: 'parent_company',
      },
      control_person: {
        address: {
          address1: '123 Old Forest Way',
          city: 'Omaha',
          country: 'USA',
          postal_code: '68022',
          state: 'NE',
          address2: 'address2',
        },
        dob: '1991-03-08 08:00:00',
        email: 'tom@middle-earth.com',
        first_name: 'Tom',
        government_id: '111-23-1412',
        last_name: 'Bombadil',
        phone_number: '+15555555555',
      },
      nature_of_business: 'Software company selling solutions to the restaurant industry',
      tos_timestamp: '2018-05-29T21:16:05Z',
      workflow: 'KYB_BASIC',
      beneficial_owner_entities: [
        {
          address: {
            address1: '123 Old Forest Way',
            city: 'Omaha',
            country: 'USA',
            postal_code: '68022',
            state: 'NE',
            address2: 'address2',
          },
          government_id: '114-123-1513',
          legal_business_name: 'Acme, Inc.',
          phone_numbers: ['+15555555555'],
          dba_business_name: 'dba_business_name',
          parent_company: 'parent_company',
        },
      ],
      external_id: 'external_id',
      kyb_passed_timestamp: '2018-05-29T21:16:05Z',
      website_url: 'www.mybusiness.com',
    });
  });

  test('retrieve', async () => {
    const responsePromise = client.accountHolders.retrieve('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('update', async () => {
    const responsePromise = client.accountHolders.update('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {});
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('list', async () => {
    const responsePromise = client.accountHolders.list();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('list: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.accountHolders.list(
        {
          begin: '2019-12-27T18:11:19.117Z',
          email: 'email',
          end: '2019-12-27T18:11:19.117Z',
          ending_before: 'ending_before',
          external_id: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
          first_name: 'first_name',
          last_name: 'last_name',
          legal_business_name: 'legal_business_name',
          limit: 0,
          phone_number: 'phone_number',
          starting_after: 'starting_after',
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Lithic.NotFoundError);
  });

  test('listDocuments', async () => {
    const responsePromise = client.accountHolders.listDocuments('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('retrieveDocument: only required params', async () => {
    const responsePromise = client.accountHolders.retrieveDocument('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {
      account_holder_token: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('retrieveDocument: required and optional params', async () => {
    const response = await client.accountHolders.retrieveDocument('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {
      account_holder_token: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
    });
  });

  test('simulateEnrollmentDocumentReview: only required params', async () => {
    const responsePromise = client.accountHolders.simulateEnrollmentDocumentReview({
      document_upload_token: 'b11cd67b-0a52-4180-8365-314f3def5426',
      status: 'UPLOADED',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('simulateEnrollmentDocumentReview: required and optional params', async () => {
    const response = await client.accountHolders.simulateEnrollmentDocumentReview({
      document_upload_token: 'b11cd67b-0a52-4180-8365-314f3def5426',
      status: 'UPLOADED',
      accepted_entity_status_reasons: ['string'],
      status_reason: 'DOCUMENT_MISSING_REQUIRED_DATA',
    });
  });

  test('simulateEnrollmentReview', async () => {
    const responsePromise = client.accountHolders.simulateEnrollmentReview({});
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('uploadDocument: only required params', async () => {
    const responsePromise = client.accountHolders.uploadDocument('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {
      document_type: 'EIN_LETTER',
      entity_token: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('uploadDocument: required and optional params', async () => {
    const response = await client.accountHolders.uploadDocument('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {
      document_type: 'EIN_LETTER',
      entity_token: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
    });
  });
});
