// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as AccountHoldersAPI from './account-holders';
import * as Shared from '../shared';
import * as EntitiesAPI from './entities';
import {
  AccountHolderEntity,
  Entities,
  EntityCreateParams,
  EntityCreateResponse,
  EntityDeleteParams,
} from './entities';
import { APIPromise } from '../../core/api-promise';
import { PagePromise, SinglePage } from '../../core/pagination';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class AccountHolders extends APIResource {
  entities: EntitiesAPI.Entities = new EntitiesAPI.Entities(this._client);

  /**
   * Create an account holder and initiate the appropriate onboarding workflow.
   * Account holders and accounts have a 1:1 relationship. When an account holder is
   * successfully created an associated account is also created. All calls to this
   * endpoint will return a synchronous response. The response time will depend on
   * the workflow. In some cases, the response may indicate the workflow is under
   * review or further action will be needed to complete the account creation
   * process. This endpoint can only be used on accounts that are part of the program
   * that the calling API key manages.
   *
   * @example
   * ```ts
   * const accountHolder = await client.accountHolders.create({
   *   beneficial_owner_individuals: [
   *     {
   *       address: { ... },
   *       dob: '1991-03-08T08:00:00Z',
   *       email: 'tim@left-earth.com',
   *       first_name: 'Timmy',
   *       government_id: '211-23-1412',
   *       last_name: 'Turner',
   *       phone_number: '+15555555555',
   *     },
   *   ],
   *   business_entity: {
   *     address: { ... },
   *     dba_business_name: 'Example Business Solutions',
   *     government_id: '12-3456789',
   *     legal_business_name: 'Busy Business, Inc.',
   *     phone_numbers: ['+15555555555'],
   *   },
   *   control_person: {
   *     address: { ... },
   *     dob: '1991-03-08T08:00:00Z',
   *     email: 'tom@middle-pluto.com',
   *     first_name: 'Tom',
   *     government_id: '111-23-1412',
   *     last_name: 'Timothy',
   *     phone_number: '+15555555555',
   *   },
   *   nature_of_business: 'Software company selling solutions to the restaurant industry',
   *   tos_timestamp: '2022-03-08T08:00:00Z',
   *   workflow: 'KYB_BYO',
   *   beneficial_owner_entities: [
   *     {
   *       address: { ... },
   *       dba_business_name: 'MHoldings',
   *       government_id: '98-7654321',
   *       legal_business_name: 'Majority Holdings LLC',
   *       phone_numbers: ['+15555555555'],
   *     },
   *   ],
   *   kyb_passed_timestamp: '2022-03-08T08:00:00Z',
   *   naics_code: '541512',
   *   website_url: 'https://www.mybusiness.com',
   * });
   * ```
   */
  create(body: AccountHolderCreateParams, options?: RequestOptions): APIPromise<AccountHolderCreateResponse> {
    return this._client.post('/v1/account_holders', {
      body,
      timeout: (this._client as any)._options.timeout ?? 300000,
      ...options,
    });
  }

  /**
   * Get an Individual or Business Account Holder and/or their KYC or KYB evaluation
   * status.
   *
   * @example
   * ```ts
   * const accountHolder = await client.accountHolders.retrieve(
   *   '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   * );
   * ```
   */
  retrieve(accountHolderToken: string, options?: RequestOptions): APIPromise<AccountHolder> {
    return this._client.get(path`/v1/account_holders/${accountHolderToken}`, options);
  }

  /**
   * Update the information associated with a particular account holder (including
   * business owners and control persons associated to a business account). If Lithic
   * is performing KYB or KYC and additional verification is required we will run the
   * individual's or business's updated information again and return whether the
   * status is accepted or pending (i.e., further action required). All calls to this
   * endpoint will return a synchronous response. The response time will depend on
   * the workflow. In some cases, the response may indicate the workflow is under
   * review or further action will be needed to complete the account creation
   * process. This endpoint can only be used on existing accounts that are part of
   * the program that the calling API key manages.
   *
   * @example
   * ```ts
   * const accountHolder = await client.accountHolders.update(
   *   '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   *   {
   *     business_entity: {
   *       entity_token: '83cf25ae-c14f-4d10-9fa2-0119f36c7286',
   *       address: { postal_code: '61023' },
   *     },
   *     control_person: {
   *       entity_token: 'fd771a07-c5c2-42f3-a53c-a6c79c6c0d07',
   *       address: { postal_code: '68023' },
   *     },
   *     naics_code: '541512',
   *     website_url: 'https://www.mynewbusiness.com',
   *   },
   * );
   * ```
   */
  update(
    accountHolderToken: string,
    body: AccountHolderUpdateParams,
    options?: RequestOptions,
  ): APIPromise<AccountHolderUpdateResponse> {
    return this._client.patch(path`/v1/account_holders/${accountHolderToken}`, { body, ...options });
  }

  /**
   * Get a list of individual or business account holders and their KYC or KYB
   * evaluation status.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const accountHolder of client.accountHolders.list()) {
   *   // ...
   * }
   * ```
   */
  list(
    query: AccountHolderListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<AccountHoldersSinglePage, AccountHolder> {
    return this._client.getAPIList('/v1/account_holders', SinglePage<AccountHolder>, { query, ...options });
  }

  /**
   * Retrieve the status of account holder document uploads, or retrieve the upload
   * URLs to process your image uploads.
   *
   * Note that this is not equivalent to checking the status of the KYC evaluation
   * overall (a document may be successfully uploaded but not be sufficient for KYC
   * to pass).
   *
   * In the event your upload URLs have expired, calling this endpoint will refresh
   * them. Similarly, in the event a previous account holder document upload has
   * failed, you can use this endpoint to get a new upload URL for the failed image
   * upload.
   *
   * When a new document upload is generated for a failed attempt, the response will
   * show an additional entry in the `required_document_uploads` list in a `PENDING`
   * state for the corresponding `image_type`.
   *
   * @example
   * ```ts
   * const response = await client.accountHolders.listDocuments(
   *   '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   * );
   * ```
   */
  listDocuments(
    accountHolderToken: string,
    options?: RequestOptions,
  ): APIPromise<AccountHolderListDocumentsResponse> {
    return this._client.get(path`/v1/account_holders/${accountHolderToken}/documents`, options);
  }

  /**
   * Check the status of an account holder document upload, or retrieve the upload
   * URLs to process your image uploads.
   *
   * Note that this is not equivalent to checking the status of the KYC evaluation
   * overall (a document may be successfully uploaded but not be sufficient for KYC
   * to pass).
   *
   * In the event your upload URLs have expired, calling this endpoint will refresh
   * them. Similarly, in the event a document upload has failed, you can use this
   * endpoint to get a new upload URL for the failed image upload.
   *
   * When a new account holder document upload is generated for a failed attempt, the
   * response will show an additional entry in the `required_document_uploads` array
   * in a `PENDING` state for the corresponding `image_type`.
   *
   * @example
   * ```ts
   * const document =
   *   await client.accountHolders.retrieveDocument(
   *     '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   *     {
   *       account_holder_token:
   *         '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   *     },
   *   );
   * ```
   */
  retrieveDocument(
    documentToken: string,
    params: AccountHolderRetrieveDocumentParams,
    options?: RequestOptions,
  ): APIPromise<Shared.Document> {
    const { account_holder_token } = params;
    return this._client.get(
      path`/v1/account_holders/${account_holder_token}/documents/${documentToken}`,
      options,
    );
  }

  /**
   * Simulates a review for an account holder document upload.
   *
   * @example
   * ```ts
   * const document =
   *   await client.accountHolders.simulateEnrollmentDocumentReview(
   *     {
   *       document_upload_token:
   *         'b11cd67b-0a52-4180-8365-314f3def5426',
   *       status: 'UPLOADED',
   *     },
   *   );
   * ```
   */
  simulateEnrollmentDocumentReview(
    body: AccountHolderSimulateEnrollmentDocumentReviewParams,
    options?: RequestOptions,
  ): APIPromise<Shared.Document> {
    return this._client.post('/v1/simulate/account_holders/enrollment_document_review', { body, ...options });
  }

  /**
   * Simulates an enrollment review for an account holder. This endpoint is only
   * applicable for workflows that may required intervention such as `KYB_BASIC`.
   *
   * @example
   * ```ts
   * const response =
   *   await client.accountHolders.simulateEnrollmentReview({
   *     account_holder_token:
   *       '1415964d-4400-4d79-9fb3-eee0faaee4e4',
   *     status: 'ACCEPTED',
   *     status_reasons: [],
   *   });
   * ```
   */
  simulateEnrollmentReview(
    body: AccountHolderSimulateEnrollmentReviewParams,
    options?: RequestOptions,
  ): APIPromise<AccountHolderSimulateEnrollmentReviewResponse> {
    return this._client.post('/v1/simulate/account_holders/enrollment_review', { body, ...options });
  }

  /**
   * Use this endpoint to identify which type of supported government-issued
   * documentation you will upload for further verification. It will return two URLs
   * to upload your document images to - one for the front image and one for the back
   * image.
   *
   * This endpoint is only valid for evaluations in a `PENDING_DOCUMENT` state.
   *
   * Uploaded images must either be a `jpg` or `png` file, and each must be less than
   * 15 MiB. Once both required uploads have been successfully completed, your
   * document will be run through KYC verification.
   *
   * If you have registered a webhook, you will receive evaluation updates for any
   * document submission evaluations, as well as for any failed document uploads.
   *
   * Two document submission attempts are permitted via this endpoint before a
   * `REJECTED` status is returned and the account creation process is ended.
   * Currently only one type of account holder document is supported per KYC
   * verification.
   *
   * @example
   * ```ts
   * const document = await client.accountHolders.uploadDocument(
   *   '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   *   {
   *     document_type: 'EIN_LETTER',
   *     entity_token: '83cf25ae-c14f-4d10-9fa2-0119f36c7286',
   *   },
   * );
   * ```
   */
  uploadDocument(
    accountHolderToken: string,
    body: AccountHolderUploadDocumentParams,
    options?: RequestOptions,
  ): APIPromise<Shared.Document> {
    return this._client.post(path`/v1/account_holders/${accountHolderToken}/documents`, { body, ...options });
  }
}

export type AccountHoldersSinglePage = SinglePage<AccountHolder>;

export interface AccountHolder {
  /**
   * Globally unique identifier for the account holder.
   */
  token: string;

  /**
   * Timestamp of when the account holder was created.
   */
  created: string;

  /**
   * Globally unique identifier for the account.
   */
  account_token?: string;

  /**
   * @deprecated Deprecated.
   */
  beneficial_owner_entities?: Array<AccountHolder.BeneficialOwnerEntity>;

  /**
   * Only present when user_type == "BUSINESS". You must submit a list of all direct
   * and indirect individuals with 25% or more ownership in the company. A maximum of
   * 4 beneficial owners can be submitted. If no individual owns 25% of the company
   * you do not need to send beneficial owner information. See
   * [FinCEN requirements](https://www.fincen.gov/sites/default/files/shared/CDD_Rev6.7_Sept_2017_Certificate.pdf)
   * (Section I) for more background on individuals that should be included.
   */
  beneficial_owner_individuals?: Array<AccountHolder.BeneficialOwnerIndividual>;

  /**
   * Only applicable for customers using the KYC-Exempt workflow to enroll authorized
   * users of businesses. Pass the account_token of the enrolled business associated
   * with the AUTHORIZED_USER in this field.
   */
  business_account_token?: string;

  /**
   * Only present when user_type == "BUSINESS". Information about the business for
   * which the account is being opened and KYB is being run.
   */
  business_entity?: AccountHolder.BusinessEntity;

  /**
   * Only present when user_type == "BUSINESS". An individual with significant
   * responsibility for managing the legal entity (e.g., a Chief Executive Officer,
   * Chief Financial Officer, Chief Operating Officer, Managing Member, General
   * Partner, President, Vice President, or Treasurer). This can be an executive, or
   * someone who will have program-wide access to the cards that Lithic will provide.
   * In some cases, this individual could also be a beneficial owner listed above.
   */
  control_person?: AccountHolder.ControlPerson;

  /**
   * (Deprecated. Use control_person.email when user_type == "BUSINESS". Use
   * individual.phone_number when user_type == "INDIVIDUAL".) Primary email of
   * Account Holder.
   */
  email?: string;

  /**
   * The type of KYC exemption for a KYC-Exempt Account Holder.
   */
  exemption_type?: 'AUTHORIZED_USER' | 'PREPAID_CARD_USER';

  /**
   * Customer-provided token that indicates a relationship with an object outside of
   * the Lithic ecosystem.
   */
  external_id?: string;

  /**
   * Only present when user_type == "INDIVIDUAL". Information about the individual
   * for which the account is being opened and KYC is being run.
   */
  individual?: AccountHolder.Individual;

  /**
   * Only present when user_type == "BUSINESS". 6-digit North American Industry
   * Classification System (NAICS) code for the business.
   */
  naics_code?: string;

  /**
   * Only present when user_type == "BUSINESS". User-submitted description of the
   * business.
   */
  nature_of_business?: string;

  /**
   * (Deprecated. Use control_person.phone_number when user_type == "BUSINESS". Use
   * individual.phone_number when user_type == "INDIVIDUAL".) Primary phone of
   * Account Holder, entered in E.164 format.
   */
  phone_number?: string;

  /**
   * Only present for "KYB_BASIC" workflow. A list of documents required for the
   * account holder to be approved.
   */
  required_documents?: Array<RequiredDocument>;

  /**
   * (Deprecated. Use verification_application.status instead)
   *
   * KYC and KYB evaluation states.
   *
   * Note:
   *
   * - `PENDING_REVIEW` is only applicable for the `KYB_BASIC` workflow.
   */
  status?: 'ACCEPTED' | 'PENDING_REVIEW' | 'PENDING_DOCUMENT' | 'PENDING_RESUBMIT' | 'REJECTED';

  /**
   * (Deprecated. Use verification_application.status_reasons)
   *
   * Reason for the evaluation status.
   */
  status_reasons?: Array<
    | 'ADDRESS_VERIFICATION_FAILURE'
    | 'AGE_THRESHOLD_FAILURE'
    | 'COMPLETE_VERIFICATION_FAILURE'
    | 'DOB_VERIFICATION_FAILURE'
    | 'ID_VERIFICATION_FAILURE'
    | 'MAX_DOCUMENT_ATTEMPTS'
    | 'MAX_RESUBMISSION_ATTEMPTS'
    | 'NAME_VERIFICATION_FAILURE'
    | 'OTHER_VERIFICATION_FAILURE'
    | 'RISK_THRESHOLD_FAILURE'
    | 'WATCHLIST_ALERT_FAILURE'
  >;

  /**
   * The type of Account Holder. If the type is "INDIVIDUAL", the "individual"
   * attribute will be present. If the type is "BUSINESS" then the "business_entity",
   * "control_person", "beneficial_owner_individuals", "naics_code",
   * "nature_of_business", and "website_url" attributes will be present.
   */
  user_type?: 'BUSINESS' | 'INDIVIDUAL';

  /**
   * Information about the most recent identity verification attempt
   */
  verification_application?: AccountHolder.VerificationApplication;

  /**
   * Only present when user_type == "BUSINESS". Business's primary website.
   */
  website_url?: string;
}

export namespace AccountHolder {
  export interface BeneficialOwnerEntity {
    /**
     * Business's physical address - PO boxes, UPS drops, and FedEx drops are not
     * acceptable; APO/FPO are acceptable.
     */
    address: Shared.Address;

    /**
     * Any name that the business operates under that is not its legal business name
     * (if applicable).
     */
    dba_business_name: string;

    /**
     * Globally unique identifier for the entity.
     */
    entity_token: string;

    /**
     * Government-issued identification number. US Federal Employer Identification
     * Numbers (EIN) are currently supported, entered as full nine-digits, with or
     * without hyphens.
     */
    government_id: string;

    /**
     * Legal (formal) business name.
     */
    legal_business_name: string;

    /**
     * One or more of the business's phone number(s), entered as a list in E.164
     * format.
     */
    phone_numbers: Array<string>;

    /**
     * Parent company name (if applicable).
     */
    parent_company?: string;
  }

  /**
   * Information about an individual associated with an account holder. A subset of
   * the information provided via KYC. For example, we do not return the government
   * id.
   */
  export interface BeneficialOwnerIndividual {
    /**
     * Individual's current address
     */
    address: Shared.Address;

    /**
     * Individual's date of birth, as an RFC 3339 date.
     */
    dob: string;

    /**
     * Individual's email address.
     */
    email: string;

    /**
     * Globally unique identifier for the entity.
     */
    entity_token: string;

    /**
     * Individual's first name, as it appears on government-issued identity documents.
     */
    first_name: string;

    /**
     * Individual's last name, as it appears on government-issued identity documents.
     */
    last_name: string;

    /**
     * Individual's phone number, entered in E.164 format.
     */
    phone_number: string;
  }

  /**
   * Only present when user_type == "BUSINESS". Information about the business for
   * which the account is being opened and KYB is being run.
   */
  export interface BusinessEntity {
    /**
     * Business's physical address - PO boxes, UPS drops, and FedEx drops are not
     * acceptable; APO/FPO are acceptable.
     */
    address: Shared.Address;

    /**
     * Any name that the business operates under that is not its legal business name
     * (if applicable).
     */
    dba_business_name: string;

    /**
     * Globally unique identifier for the entity.
     */
    entity_token: string;

    /**
     * Government-issued identification number. US Federal Employer Identification
     * Numbers (EIN) are currently supported, entered as full nine-digits, with or
     * without hyphens.
     */
    government_id: string;

    /**
     * Legal (formal) business name.
     */
    legal_business_name: string;

    /**
     * One or more of the business's phone number(s), entered as a list in E.164
     * format.
     */
    phone_numbers: Array<string>;

    /**
     * Parent company name (if applicable).
     */
    parent_company?: string;
  }

  /**
   * Only present when user_type == "BUSINESS". An individual with significant
   * responsibility for managing the legal entity (e.g., a Chief Executive Officer,
   * Chief Financial Officer, Chief Operating Officer, Managing Member, General
   * Partner, President, Vice President, or Treasurer). This can be an executive, or
   * someone who will have program-wide access to the cards that Lithic will provide.
   * In some cases, this individual could also be a beneficial owner listed above.
   */
  export interface ControlPerson {
    /**
     * Individual's current address
     */
    address: Shared.Address;

    /**
     * Individual's date of birth, as an RFC 3339 date.
     */
    dob: string;

    /**
     * Individual's email address.
     */
    email: string;

    /**
     * Globally unique identifier for the entity.
     */
    entity_token: string;

    /**
     * Individual's first name, as it appears on government-issued identity documents.
     */
    first_name: string;

    /**
     * Individual's last name, as it appears on government-issued identity documents.
     */
    last_name: string;

    /**
     * Individual's phone number, entered in E.164 format.
     */
    phone_number: string;
  }

  /**
   * Only present when user_type == "INDIVIDUAL". Information about the individual
   * for which the account is being opened and KYC is being run.
   */
  export interface Individual {
    /**
     * Individual's current address
     */
    address: Shared.Address;

    /**
     * Individual's date of birth, as an RFC 3339 date.
     */
    dob: string;

    /**
     * Individual's email address.
     */
    email: string;

    /**
     * Globally unique identifier for the entity.
     */
    entity_token: string;

    /**
     * Individual's first name, as it appears on government-issued identity documents.
     */
    first_name: string;

    /**
     * Individual's last name, as it appears on government-issued identity documents.
     */
    last_name: string;

    /**
     * Individual's phone number, entered in E.164 format.
     */
    phone_number: string;
  }

  /**
   * Information about the most recent identity verification attempt
   */
  export interface VerificationApplication {
    /**
     * Timestamp of when the application was created.
     */
    created?: string;

    /**
     * KYC and KYB evaluation states.
     *
     * Note:
     *
     * - `PENDING_REVIEW` is only applicable for the `KYB_BASIC` workflow.
     */
    status?: 'ACCEPTED' | 'PENDING_REVIEW' | 'PENDING_DOCUMENT' | 'PENDING_RESUBMIT' | 'REJECTED';

    /**
     * Reason for the evaluation status.
     */
    status_reasons?: Array<
      | 'ADDRESS_VERIFICATION_FAILURE'
      | 'AGE_THRESHOLD_FAILURE'
      | 'COMPLETE_VERIFICATION_FAILURE'
      | 'DOB_VERIFICATION_FAILURE'
      | 'ID_VERIFICATION_FAILURE'
      | 'MAX_DOCUMENT_ATTEMPTS'
      | 'MAX_RESUBMISSION_ATTEMPTS'
      | 'NAME_VERIFICATION_FAILURE'
      | 'OTHER_VERIFICATION_FAILURE'
      | 'RISK_THRESHOLD_FAILURE'
      | 'WATCHLIST_ALERT_FAILURE'
    >;

    /**
     * Timestamp of when the application was last updated.
     */
    updated?: string;
  }
}

export interface AddressUpdate {
  /**
   * Valid deliverable address (no PO boxes).
   */
  address1?: string;

  /**
   * Unit or apartment number (if applicable).
   */
  address2?: string;

  /**
   * Name of city.
   */
  city?: string;

  /**
   * Valid country code. Only USA is currently supported, entered in uppercase ISO
   * 3166-1 alpha-3 three-character format.
   */
  country?: string;

  /**
   * Valid postal code. Only USA ZIP codes are currently supported, entered as a
   * five-digit ZIP or nine-digit ZIP+4.
   */
  postal_code?: string;

  /**
   * Valid state code. Only USA state codes are currently supported, entered in
   * uppercase ISO 3166-2 two-character format.
   */
  state?: string;
}

export interface KYB {
  /**
   * You must submit a list of all direct and indirect individuals with 25% or more
   * ownership in the company. A maximum of 4 beneficial owners can be submitted. If
   * no individual owns 25% of the company you do not need to send beneficial owner
   * information. See
   * [FinCEN requirements](https://www.fincen.gov/sites/default/files/shared/CDD_Rev6.7_Sept_2017_Certificate.pdf)
   * (Section I) for more background on individuals that should be included.
   */
  beneficial_owner_individuals: Array<KYB.BeneficialOwnerIndividual>;

  /**
   * Information for business for which the account is being opened and KYB is being
   * run.
   */
  business_entity: KYB.BusinessEntity;

  /**
   * An individual with significant responsibility for managing the legal entity
   * (e.g., a Chief Executive Officer, Chief Financial Officer, Chief Operating
   * Officer, Managing Member, General Partner, President, Vice President, or
   * Treasurer). This can be an executive, or someone who will have program-wide
   * access to the cards that Lithic will provide. In some cases, this individual
   * could also be a beneficial owner listed above. See
   * [FinCEN requirements](https://www.fincen.gov/sites/default/files/shared/CDD_Rev6.7_Sept_2017_Certificate.pdf)
   * (Section II) for more background.
   */
  control_person: KYB.ControlPerson;

  /**
   * Short description of the company's line of business (i.e., what does the company
   * do?).
   */
  nature_of_business: string;

  /**
   * An RFC 3339 timestamp indicating when the account holder accepted the applicable
   * legal agreements (e.g., cardholder terms) as agreed upon during API customer's
   * implementation with Lithic.
   */
  tos_timestamp: string;

  /**
   * Specifies the type of KYB workflow to run.
   */
  workflow: 'KYB_BASIC' | 'KYB_BYO';

  /**
   * @deprecated Deprecated.
   */
  beneficial_owner_entities?: Array<KYB.BeneficialOwnerEntity>;

  /**
   * A user provided id that can be used to link an account holder with an external
   * system
   */
  external_id?: string;

  /**
   * An RFC 3339 timestamp indicating when precomputed KYB was completed on the
   * business with a pass result.
   *
   * This field is required only if workflow type is `KYB_BYO`.
   */
  kyb_passed_timestamp?: string;

  /**
   * 6-digit North American Industry Classification System (NAICS) code for the
   * business.
   */
  naics_code?: string;

  /**
   * Company website URL.
   */
  website_url?: string;
}

export namespace KYB {
  /**
   * Individuals associated with a KYB application. Phone number is optional.
   */
  export interface BeneficialOwnerIndividual {
    /**
     * Individual's current address - PO boxes, UPS drops, and FedEx drops are not
     * acceptable; APO/FPO are acceptable. Only USA addresses are currently supported.
     */
    address: Shared.Address;

    /**
     * Individual's date of birth, as an RFC 3339 date.
     */
    dob: string;

    /**
     * Individual's email address. If utilizing Lithic for chargeback processing, this
     * customer email address may be used to communicate dispute status and resolution.
     */
    email: string;

    /**
     * Individual's first name, as it appears on government-issued identity documents.
     */
    first_name: string;

    /**
     * Government-issued identification number (required for identity verification and
     * compliance with banking regulations). Social Security Numbers (SSN) and
     * Individual Taxpayer Identification Numbers (ITIN) are currently supported,
     * entered as full nine-digits, with or without hyphens
     */
    government_id: string;

    /**
     * Individual's last name, as it appears on government-issued identity documents.
     */
    last_name: string;

    /**
     * Individual's phone number, entered in E.164 format.
     */
    phone_number?: string;
  }

  /**
   * Information for business for which the account is being opened and KYB is being
   * run.
   */
  export interface BusinessEntity {
    /**
     * Business's physical address - PO boxes, UPS drops, and FedEx drops are not
     * acceptable; APO/FPO are acceptable.
     */
    address: Shared.Address;

    /**
     * Government-issued identification number. US Federal Employer Identification
     * Numbers (EIN) are currently supported, entered as full nine-digits, with or
     * without hyphens.
     */
    government_id: string;

    /**
     * Legal (formal) business name.
     */
    legal_business_name: string;

    /**
     * One or more of the business's phone number(s), entered as a list in E.164
     * format.
     */
    phone_numbers: Array<string>;

    /**
     * Any name that the business operates under that is not its legal business name
     * (if applicable).
     */
    dba_business_name?: string;

    /**
     * Parent company name (if applicable).
     */
    parent_company?: string;
  }

  /**
   * An individual with significant responsibility for managing the legal entity
   * (e.g., a Chief Executive Officer, Chief Financial Officer, Chief Operating
   * Officer, Managing Member, General Partner, President, Vice President, or
   * Treasurer). This can be an executive, or someone who will have program-wide
   * access to the cards that Lithic will provide. In some cases, this individual
   * could also be a beneficial owner listed above. See
   * [FinCEN requirements](https://www.fincen.gov/sites/default/files/shared/CDD_Rev6.7_Sept_2017_Certificate.pdf)
   * (Section II) for more background.
   */
  export interface ControlPerson {
    /**
     * Individual's current address - PO boxes, UPS drops, and FedEx drops are not
     * acceptable; APO/FPO are acceptable. Only USA addresses are currently supported.
     */
    address: Shared.Address;

    /**
     * Individual's date of birth, as an RFC 3339 date.
     */
    dob: string;

    /**
     * Individual's email address. If utilizing Lithic for chargeback processing, this
     * customer email address may be used to communicate dispute status and resolution.
     */
    email: string;

    /**
     * Individual's first name, as it appears on government-issued identity documents.
     */
    first_name: string;

    /**
     * Government-issued identification number (required for identity verification and
     * compliance with banking regulations). Social Security Numbers (SSN) and
     * Individual Taxpayer Identification Numbers (ITIN) are currently supported,
     * entered as full nine-digits, with or without hyphens
     */
    government_id: string;

    /**
     * Individual's last name, as it appears on government-issued identity documents.
     */
    last_name: string;

    /**
     * Individual's phone number, entered in E.164 format.
     */
    phone_number?: string;
  }

  export interface BeneficialOwnerEntity {
    /**
     * Business's physical address - PO boxes, UPS drops, and FedEx drops are not
     * acceptable; APO/FPO are acceptable.
     */
    address: Shared.Address;

    /**
     * Government-issued identification number. US Federal Employer Identification
     * Numbers (EIN) are currently supported, entered as full nine-digits, with or
     * without hyphens.
     */
    government_id: string;

    /**
     * Legal (formal) business name.
     */
    legal_business_name: string;

    /**
     * One or more of the business's phone number(s), entered as a list in E.164
     * format.
     */
    phone_numbers: Array<string>;

    /**
     * Any name that the business operates under that is not its legal business name
     * (if applicable).
     */
    dba_business_name?: string;

    /**
     * Parent company name (if applicable).
     */
    parent_company?: string;
  }
}

export interface KYBBusinessEntity {
  /**
   * Business''s physical address - PO boxes, UPS drops, and FedEx drops are not
   * acceptable; APO/FPO are acceptable.
   */
  address: KYBBusinessEntity.Address;

  /**
   * Government-issued identification number. US Federal Employer Identification
   * Numbers (EIN) are currently supported, entered as full nine-digits, with or
   * without hyphens.
   */
  government_id: string;

  /**
   * Legal (formal) business name.
   */
  legal_business_name: string;

  /**
   * One or more of the business's phone number(s), entered as a list in E.164
   * format.
   */
  phone_numbers: Array<string>;

  /**
   * Any name that the business operates under that is not its legal business name
   * (if applicable).
   */
  dba_business_name?: string;

  /**
   * Parent company name (if applicable).
   */
  parent_company?: string;
}

export namespace KYBBusinessEntity {
  /**
   * Business''s physical address - PO boxes, UPS drops, and FedEx drops are not
   * acceptable; APO/FPO are acceptable.
   */
  export interface Address {
    /**
     * Valid deliverable address (no PO boxes).
     */
    address1: string;

    /**
     * Name of city.
     */
    city: string;

    /**
     * Valid country code. Only USA is currently supported, entered in uppercase ISO
     * 3166-1 alpha-3 three-character format.
     */
    country: string;

    /**
     * Valid postal code. Only USA ZIP codes are currently supported, entered as a
     * five-digit ZIP or nine-digit ZIP+4.
     */
    postal_code: string;

    /**
     * Valid state code. Only USA state codes are currently supported, entered in
     * uppercase ISO 3166-2 two-character format.
     */
    state: string;

    /**
     * Unit or apartment number (if applicable).
     */
    address2?: string;
  }
}

export interface KYC {
  /**
   * Information on individual for whom the account is being opened and KYC is being
   * run.
   */
  individual: KYC.Individual;

  /**
   * An RFC 3339 timestamp indicating when the account holder accepted the applicable
   * legal agreements (e.g., cardholder terms) as agreed upon during API customer's
   * implementation with Lithic.
   */
  tos_timestamp: string;

  /**
   * Specifies the type of KYC workflow to run.
   */
  workflow: 'KYC_BASIC' | 'KYC_BYO';

  /**
   * A user provided id that can be used to link an account holder with an external
   * system
   */
  external_id?: string;

  /**
   * An RFC 3339 timestamp indicating when precomputed KYC was completed on the
   * individual with a pass result.
   *
   * This field is required only if workflow type is `KYC_BYO`.
   */
  kyc_passed_timestamp?: string;
}

export namespace KYC {
  /**
   * Information on individual for whom the account is being opened and KYC is being
   * run.
   */
  export interface Individual {
    /**
     * Individual's current address - PO boxes, UPS drops, and FedEx drops are not
     * acceptable; APO/FPO are acceptable. Only USA addresses are currently supported.
     */
    address: Shared.Address;

    /**
     * Individual's date of birth, as an RFC 3339 date.
     */
    dob: string;

    /**
     * Individual's email address. If utilizing Lithic for chargeback processing, this
     * customer email address may be used to communicate dispute status and resolution.
     */
    email: string;

    /**
     * Individual's first name, as it appears on government-issued identity documents.
     */
    first_name: string;

    /**
     * Government-issued identification number (required for identity verification and
     * compliance with banking regulations). Social Security Numbers (SSN) and
     * Individual Taxpayer Identification Numbers (ITIN) are currently supported,
     * entered as full nine-digits, with or without hyphens
     */
    government_id: string;

    /**
     * Individual's last name, as it appears on government-issued identity documents.
     */
    last_name: string;

    /**
     * Individual's phone number, entered in E.164 format.
     */
    phone_number: string;
  }
}

export interface KYCExempt {
  /**
   * KYC Exempt user's current address - PO boxes, UPS drops, and FedEx drops are not
   * acceptable; APO/FPO are acceptable.
   */
  address: Shared.Address;

  /**
   * The KYC Exempt user's email
   */
  email: string;

  /**
   * The KYC Exempt user's first name
   */
  first_name: string;

  /**
   * Specifies the type of KYC Exempt user
   */
  kyc_exemption_type: 'AUTHORIZED_USER' | 'PREPAID_CARD_USER';

  /**
   * The KYC Exempt user's last name
   */
  last_name: string;

  /**
   * The KYC Exempt user's phone number, entered in E.164 format.
   */
  phone_number: string;

  /**
   * Specifies the workflow type. This must be 'KYC_EXEMPT'
   */
  workflow: 'KYC_EXEMPT';

  /**
   * Only applicable for customers using the KYC-Exempt workflow to enroll authorized
   * users of businesses. Pass the account_token of the enrolled business associated
   * with the AUTHORIZED_USER in this field.
   */
  business_account_token?: string;

  /**
   * A user provided id that can be used to link an account holder with an external
   * system
   */
  external_id?: string;
}

export interface RequiredDocument {
  /**
   * Globally unique identifier for an entity.
   */
  entity_token: string;

  /**
   * Provides the status reasons that will be satisfied by providing one of the valid
   * documents.
   */
  status_reasons: Array<string>;

  /**
   * A list of valid documents that will satisfy the KYC requirements for the
   * specified entity.
   */
  valid_documents: Array<string>;
}

export interface AccountHolderCreateResponse {
  /**
   * Globally unique identifier for the account holder.
   */
  token: string;

  /**
   * Globally unique identifier for the account.
   */
  account_token: string;

  /**
   * KYC and KYB evaluation states.
   *
   * Note:
   *
   * - `PENDING_REVIEW` is only applicable for the `KYB_BASIC` workflow.
   */
  status: 'ACCEPTED' | 'PENDING_REVIEW' | 'PENDING_DOCUMENT' | 'PENDING_RESUBMIT' | 'REJECTED';

  /**
   * Reason for the evaluation status.
   */
  status_reasons: Array<
    | 'ADDRESS_VERIFICATION_FAILURE'
    | 'AGE_THRESHOLD_FAILURE'
    | 'COMPLETE_VERIFICATION_FAILURE'
    | 'DOB_VERIFICATION_FAILURE'
    | 'ID_VERIFICATION_FAILURE'
    | 'MAX_DOCUMENT_ATTEMPTS'
    | 'MAX_RESUBMISSION_ATTEMPTS'
    | 'NAME_VERIFICATION_FAILURE'
    | 'OTHER_VERIFICATION_FAILURE'
    | 'RISK_THRESHOLD_FAILURE'
    | 'WATCHLIST_ALERT_FAILURE'
    | 'PRIMARY_BUSINESS_ENTITY_ID_VERIFICATION_FAILURE'
    | 'PRIMARY_BUSINESS_ENTITY_ADDRESS_VERIFICATION_FAILURE'
    | 'PRIMARY_BUSINESS_ENTITY_NAME_VERIFICATION_FAILURE'
    | 'PRIMARY_BUSINESS_ENTITY_BUSINESS_OFFICERS_NOT_MATCHED'
    | 'PRIMARY_BUSINESS_ENTITY_SOS_FILING_INACTIVE'
    | 'PRIMARY_BUSINESS_ENTITY_SOS_NOT_MATCHED'
    | 'PRIMARY_BUSINESS_ENTITY_CMRA_FAILURE'
    | 'PRIMARY_BUSINESS_ENTITY_WATCHLIST_FAILURE'
    | 'PRIMARY_BUSINESS_ENTITY_REGISTERED_AGENT_FAILURE'
    | 'CONTROL_PERSON_BLOCKLIST_ALERT_FAILURE'
    | 'CONTROL_PERSON_ID_VERIFICATION_FAILURE'
    | 'CONTROL_PERSON_DOB_VERIFICATION_FAILURE'
    | 'CONTROL_PERSON_NAME_VERIFICATION_FAILURE'
  >;

  /**
   * Timestamp of when the account holder was created.
   */
  created?: string;

  /**
   * Customer-provided token that indicates a relationship with an object outside of
   * the Lithic ecosystem.
   */
  external_id?: string;

  /**
   * Only present for "KYB_BASIC" workflow. A list of documents required for the
   * account holder to be approved.
   */
  required_documents?: Array<RequiredDocument>;
}

export type AccountHolderUpdateResponse =
  | AccountHolderUpdateResponse.KYBKYCPatchResponse
  | AccountHolderUpdateResponse.PatchResponse;

export namespace AccountHolderUpdateResponse {
  export interface KYBKYCPatchResponse {
    /**
     * Globally unique identifier for the account holder.
     */
    token?: string;

    /**
     * Globally unique identifier for the account.
     */
    account_token?: string;

    /**
     * Deprecated.
     */
    beneficial_owner_entities?: Array<AccountHoldersAPI.KYBBusinessEntity>;

    /**
     * Only present when user_type == "BUSINESS". You must submit a list of all direct
     * and indirect individuals with 25% or more ownership in the company. A maximum of
     * 4 beneficial owners can be submitted. If no individual owns 25% of the company
     * you do not need to send beneficial owner information. See
     * [FinCEN requirements](https://www.fincen.gov/sites/default/files/shared/CDD_Rev6.7_Sept_2017_Certificate.pdf)
     * (Section I) for more background on individuals that should be included.
     */
    beneficial_owner_individuals?: Array<KYBKYCPatchResponse.BeneficialOwnerIndividual>;

    /**
     * Only applicable for customers using the KYC-Exempt workflow to enroll authorized
     * users of businesses. Pass the account_token of the enrolled business associated
     * with the AUTHORIZED_USER in this field.
     */
    business_account_token?: string | null;

    /**
     * Only present when user_type == "BUSINESS". Information about the business for
     * which the account is being opened and KYB is being run.
     */
    business_entity?: AccountHoldersAPI.KYBBusinessEntity;

    /**
     * Only present when user_type == "BUSINESS".
     *
     * An individual with significant responsibility for managing the legal entity
     * (e.g., a Chief Executive Officer, Chief Financial Officer, Chief Operating
     * Officer,
     *
     * Managing Member, General Partner, President, Vice President, or Treasurer). This
     * can be an executive, or someone who will have program-wide access
     *
     * to the cards that Lithic will provide. In some cases, this individual could also
     * be a beneficial owner listed above.
     */
    control_person?: KYBKYCPatchResponse.ControlPerson;

    /**
     * Timestamp of when the account holder was created.
     */
    created?: string;

    /**
     * (Deprecated. Use control_person.email when user_type == "BUSINESS". Use
     * individual.phone_number when user_type == "INDIVIDUAL".) Primary email of
     * Account Holder.
     */
    email?: string;

    /**
     * The type of KYC exemption for a KYC-Exempt Account Holder. "None" if the account
     * holder is not KYC-Exempt.
     */
    exemption_type?: 'AUTHORIZED_USER' | 'PREPAID_CARD_USER';

    /**
     * Customer-provided token that indicates a relationship with an object outside of
     * the Lithic ecosystem.
     */
    external_id?: string;

    /**
     * Only present when user_type == "INDIVIDUAL". Information about the individual
     * for which the account is being opened and KYC is being run.
     */
    individual?: KYBKYCPatchResponse.Individual;

    /**
     * Only present when user_type == "BUSINESS". 6-digit North American Industry
     * Classification System (NAICS) code for the business.
     */
    naics_code?: string;

    /**
     * Only present when user_type == "BUSINESS". User-submitted description of the
     * business.
     */
    nature_of_business?: string;

    /**
     * (Deprecated. Use control_person.phone_number when user_type == "BUSINESS". Use
     * individual.phone_number when user_type == "INDIVIDUAL".) Primary phone of
     * Account Holder, entered in E.164 format.
     */
    phone_number?: string;

    /**
     * Only present for "KYB_BASIC" and "KYC_ADVANCED" workflows. A list of documents
     * required for the account holder to be approved.
     */
    required_documents?: Array<AccountHoldersAPI.RequiredDocument>;

    /**
     * (Deprecated. Use verification_application.status instead) KYC and KYB evaluation
     * states.
     *
     * Note: `PENDING_RESUBMIT` and `PENDING_DOCUMENT` are only applicable for the
     * `ADVANCED` workflow.
     */
    status?: 'ACCEPTED' | 'PENDING_DOCUMENT' | 'PENDING_RESUBMIT' | 'REJECTED';

    /**
     * (Deprecated. Use verification_application.status_reasons) Reason for the
     * evaluation status.
     */
    status_reasons?: Array<
      | 'ADDRESS_VERIFICATION_FAILURE'
      | 'AGE_THRESHOLD_FAILURE'
      | 'COMPLETE_VERIFICATION_FAILURE'
      | 'DOB_VERIFICATION_FAILURE'
      | 'ID_VERIFICATION_FAILURE'
      | 'MAX_DOCUMENT_ATTEMPTS'
      | 'MAX_RESUBMISSION_ATTEMPTS'
      | 'NAME_VERIFICATION_FAILURE'
      | 'OTHER_VERIFICATION_FAILURE'
      | 'RISK_THRESHOLD_FAILURE'
      | 'WATCHLIST_ALERT_FAILURE'
      | 'PRIMARY_BUSINESS_ENTITY_ID_VERIFICATION_FAILURE'
      | 'PRIMARY_BUSINESS_ENTITY_ADDRESS_VERIFICATION_FAILURE'
      | 'PRIMARY_BUSINESS_ENTITY_NAME_VERIFICATION_FAILURE'
      | 'PRIMARY_BUSINESS_ENTITY_BUSINESS_OFFICERS_NOT_MATCHED'
      | 'PRIMARY_BUSINESS_ENTITY_SOS_FILING_INACTIVE'
      | 'PRIMARY_BUSINESS_ENTITY_SOS_NOT_MATCHED'
      | 'PRIMARY_BUSINESS_ENTITY_CMRA_FAILURE'
      | 'PRIMARY_BUSINESS_ENTITY_WATCHLIST_FAILURE'
      | 'PRIMARY_BUSINESS_ENTITY_REGISTERED_AGENT_FAILURE'
      | 'CONTROL_PERSON_BLOCKLIST_ALERT_FAILURE'
      | 'CONTROL_PERSON_ID_VERIFICATION_FAILURE'
      | 'CONTROL_PERSON_DOB_VERIFICATION_FAILURE'
      | 'CONTROL_PERSON_NAME_VERIFICATION_FAILURE'
    >;

    /**
     * The type of Account Holder. If the type is "INDIVIDUAL", the "individual"
     * attribute will be present.
     *
     * If the type is "BUSINESS" then the "business_entity", "control_person",
     * "beneficial_owner_individuals", "naics_code", "nature_of_business", and
     * "website_url" attributes will be present.
     */
    user_type?: 'BUSINESS' | 'INDIVIDUAL';

    /**
     * Information about the most recent identity verification attempt
     */
    verification_application?: KYBKYCPatchResponse.VerificationApplication;

    /**
     * Only present when user_type == "BUSINESS". Business's primary website.
     */
    website_url?: string;
  }

  export namespace KYBKYCPatchResponse {
    export interface BeneficialOwnerIndividual {
      /**
       * Individual's current address - PO boxes, UPS drops, and FedEx drops are not
       * acceptable; APO/FPO are acceptable. Only USA addresses are currently supported.
       */
      address?: BeneficialOwnerIndividual.Address;

      /**
       * Individual's date of birth, as an RFC 3339 date.
       */
      dob?: string;

      /**
       * Individual's email address. If utilizing Lithic for chargeback processing, this
       * customer email address may be used to communicate dispute status and resolution.
       */
      email?: string;

      /**
       * Individual's first name, as it appears on government-issued identity documents.
       */
      first_name?: string;

      /**
       * Individual's last name, as it appears on government-issued identity documents.
       */
      last_name?: string;

      /**
       * Individual's phone number, entered in E.164 format.
       */
      phone_number?: string;
    }

    export namespace BeneficialOwnerIndividual {
      /**
       * Individual's current address - PO boxes, UPS drops, and FedEx drops are not
       * acceptable; APO/FPO are acceptable. Only USA addresses are currently supported.
       */
      export interface Address {
        /**
         * Valid deliverable address (no PO boxes).
         */
        address1: string;

        /**
         * Name of city.
         */
        city: string;

        /**
         * Valid country code. Only USA is currently supported, entered in uppercase ISO
         * 3166-1 alpha-3 three-character format.
         */
        country: string;

        /**
         * Valid postal code. Only USA ZIP codes are currently supported, entered as a
         * five-digit ZIP or nine-digit ZIP+4.
         */
        postal_code: string;

        /**
         * Valid state code. Only USA state codes are currently supported, entered in
         * uppercase ISO 3166-2 two-character format.
         */
        state: string;

        /**
         * Unit or apartment number (if applicable).
         */
        address2?: string;
      }
    }

    /**
     * Only present when user_type == "BUSINESS".
     *
     * An individual with significant responsibility for managing the legal entity
     * (e.g., a Chief Executive Officer, Chief Financial Officer, Chief Operating
     * Officer,
     *
     * Managing Member, General Partner, President, Vice President, or Treasurer). This
     * can be an executive, or someone who will have program-wide access
     *
     * to the cards that Lithic will provide. In some cases, this individual could also
     * be a beneficial owner listed above.
     */
    export interface ControlPerson {
      /**
       * Individual's current address - PO boxes, UPS drops, and FedEx drops are not
       * acceptable; APO/FPO are acceptable. Only USA addresses are currently supported.
       */
      address?: ControlPerson.Address;

      /**
       * Individual's date of birth, as an RFC 3339 date.
       */
      dob?: string;

      /**
       * Individual's email address. If utilizing Lithic for chargeback processing, this
       * customer email address may be used to communicate dispute status and resolution.
       */
      email?: string;

      /**
       * Individual's first name, as it appears on government-issued identity documents.
       */
      first_name?: string;

      /**
       * Individual's last name, as it appears on government-issued identity documents.
       */
      last_name?: string;

      /**
       * Individual's phone number, entered in E.164 format.
       */
      phone_number?: string;
    }

    export namespace ControlPerson {
      /**
       * Individual's current address - PO boxes, UPS drops, and FedEx drops are not
       * acceptable; APO/FPO are acceptable. Only USA addresses are currently supported.
       */
      export interface Address {
        /**
         * Valid deliverable address (no PO boxes).
         */
        address1: string;

        /**
         * Name of city.
         */
        city: string;

        /**
         * Valid country code. Only USA is currently supported, entered in uppercase ISO
         * 3166-1 alpha-3 three-character format.
         */
        country: string;

        /**
         * Valid postal code. Only USA ZIP codes are currently supported, entered as a
         * five-digit ZIP or nine-digit ZIP+4.
         */
        postal_code: string;

        /**
         * Valid state code. Only USA state codes are currently supported, entered in
         * uppercase ISO 3166-2 two-character format.
         */
        state: string;

        /**
         * Unit or apartment number (if applicable).
         */
        address2?: string;
      }
    }

    /**
     * Only present when user_type == "INDIVIDUAL". Information about the individual
     * for which the account is being opened and KYC is being run.
     */
    export interface Individual {
      /**
       * Individual's current address - PO boxes, UPS drops, and FedEx drops are not
       * acceptable; APO/FPO are acceptable. Only USA addresses are currently supported.
       */
      address?: Individual.Address;

      /**
       * Individual's date of birth, as an RFC 3339 date.
       */
      dob?: string;

      /**
       * Individual's email address. If utilizing Lithic for chargeback processing, this
       * customer email address may be used to communicate dispute status and resolution.
       */
      email?: string;

      /**
       * Individual's first name, as it appears on government-issued identity documents.
       */
      first_name?: string;

      /**
       * Individual's last name, as it appears on government-issued identity documents.
       */
      last_name?: string;

      /**
       * Individual's phone number, entered in E.164 format.
       */
      phone_number?: string;
    }

    export namespace Individual {
      /**
       * Individual's current address - PO boxes, UPS drops, and FedEx drops are not
       * acceptable; APO/FPO are acceptable. Only USA addresses are currently supported.
       */
      export interface Address {
        /**
         * Valid deliverable address (no PO boxes).
         */
        address1: string;

        /**
         * Name of city.
         */
        city: string;

        /**
         * Valid country code. Only USA is currently supported, entered in uppercase ISO
         * 3166-1 alpha-3 three-character format.
         */
        country: string;

        /**
         * Valid postal code. Only USA ZIP codes are currently supported, entered as a
         * five-digit ZIP or nine-digit ZIP+4.
         */
        postal_code: string;

        /**
         * Valid state code. Only USA state codes are currently supported, entered in
         * uppercase ISO 3166-2 two-character format.
         */
        state: string;

        /**
         * Unit or apartment number (if applicable).
         */
        address2?: string;
      }
    }

    /**
     * Information about the most recent identity verification attempt
     */
    export interface VerificationApplication {
      /**
       * Timestamp of when the application was created.
       */
      created: string;

      /**
       * KYC and KYB evaluation states.
       *
       * Note: `PENDING_RESUBMIT` and `PENDING_DOCUMENT` are only applicable for the
       * `ADVANCED` workflow.
       */
      status: 'ACCEPTED' | 'PENDING_DOCUMENT' | 'PENDING_RESUBMIT' | 'REJECTED';

      /**
       * Reason for the evaluation status.
       */
      status_reasons: Array<
        | 'ADDRESS_VERIFICATION_FAILURE'
        | 'AGE_THRESHOLD_FAILURE'
        | 'COMPLETE_VERIFICATION_FAILURE'
        | 'DOB_VERIFICATION_FAILURE'
        | 'ID_VERIFICATION_FAILURE'
        | 'MAX_DOCUMENT_ATTEMPTS'
        | 'MAX_RESUBMISSION_ATTEMPTS'
        | 'NAME_VERIFICATION_FAILURE'
        | 'OTHER_VERIFICATION_FAILURE'
        | 'RISK_THRESHOLD_FAILURE'
        | 'WATCHLIST_ALERT_FAILURE'
        | 'PRIMARY_BUSINESS_ENTITY_ID_VERIFICATION_FAILURE'
        | 'PRIMARY_BUSINESS_ENTITY_ADDRESS_VERIFICATION_FAILURE'
        | 'PRIMARY_BUSINESS_ENTITY_NAME_VERIFICATION_FAILURE'
        | 'PRIMARY_BUSINESS_ENTITY_BUSINESS_OFFICERS_NOT_MATCHED'
        | 'PRIMARY_BUSINESS_ENTITY_SOS_FILING_INACTIVE'
        | 'PRIMARY_BUSINESS_ENTITY_SOS_NOT_MATCHED'
        | 'PRIMARY_BUSINESS_ENTITY_CMRA_FAILURE'
        | 'PRIMARY_BUSINESS_ENTITY_WATCHLIST_FAILURE'
        | 'PRIMARY_BUSINESS_ENTITY_REGISTERED_AGENT_FAILURE'
        | 'CONTROL_PERSON_BLOCKLIST_ALERT_FAILURE'
        | 'CONTROL_PERSON_ID_VERIFICATION_FAILURE'
        | 'CONTROL_PERSON_DOB_VERIFICATION_FAILURE'
        | 'CONTROL_PERSON_NAME_VERIFICATION_FAILURE'
      >;

      /**
       * Timestamp of when the application was last updated.
       */
      updated: string;

      /**
       * Timestamp of when the application passed the verification process. Only present
       * if `status` is `ACCEPTED`
       */
      ky_passed_at?: string;
    }
  }

  export interface PatchResponse {
    /**
     * The token for the account holder that was updated
     */
    token?: string;

    /**
     * The address for the account holder
     */
    address?: PatchResponse.Address;

    /**
     * The token for the business account that the account holder is associated with
     */
    business_account_token?: string | null;

    /**
     * The email for the account holder
     */
    email?: string;

    /**
     * The first name for the account holder
     */
    first_name?: string;

    /**
     * The last name for the account holder
     */
    last_name?: string;

    /**
     * The legal business name for the account holder
     */
    legal_business_name?: string;

    /**
     * The phone_number for the account holder
     */
    phone_number?: string;
  }

  export namespace PatchResponse {
    /**
     * The address for the account holder
     */
    export interface Address {
      /**
       * Valid deliverable address (no PO boxes).
       */
      address1: string;

      /**
       * Name of city.
       */
      city: string;

      /**
       * Valid country code. Only USA is currently supported, entered in uppercase ISO
       * 3166-1 alpha-3 three-character format.
       */
      country: string;

      /**
       * Valid postal code. Only USA ZIP codes are currently supported, entered as a
       * five-digit ZIP or nine-digit ZIP+4.
       */
      postal_code: string;

      /**
       * Valid state code. Only USA state codes are currently supported, entered in
       * uppercase ISO 3166-2 two-character format.
       */
      state: string;

      /**
       * Unit or apartment number (if applicable).
       */
      address2?: string;
    }
  }
}

export interface AccountHolderListDocumentsResponse {
  data?: Array<Shared.Document>;
}

export interface AccountHolderSimulateEnrollmentReviewResponse {
  /**
   * Globally unique identifier for the account holder.
   */
  token?: string;

  /**
   * Globally unique identifier for the account.
   */
  account_token?: string;

  /**
   * Deprecated.
   */
  beneficial_owner_entities?: Array<KYBBusinessEntity>;

  /**
   * Only present when user_type == "BUSINESS". You must submit a list of all direct
   * and indirect individuals with 25% or more ownership in the company. A maximum of
   * 4 beneficial owners can be submitted. If no individual owns 25% of the company
   * you do not need to send beneficial owner information. See
   * [FinCEN requirements](https://www.fincen.gov/sites/default/files/shared/CDD_Rev6.7_Sept_2017_Certificate.pdf)
   * (Section I) for more background on individuals that should be included.
   */
  beneficial_owner_individuals?: Array<AccountHolderSimulateEnrollmentReviewResponse.BeneficialOwnerIndividual>;

  /**
   * Only applicable for customers using the KYC-Exempt workflow to enroll authorized
   * users of businesses. Pass the account_token of the enrolled business associated
   * with the AUTHORIZED_USER in this field.
   */
  business_account_token?: string | null;

  /**
   * Only present when user_type == "BUSINESS". Information about the business for
   * which the account is being opened and KYB is being run.
   */
  business_entity?: KYBBusinessEntity;

  /**
   * Only present when user_type == "BUSINESS".
   *
   * An individual with significant responsibility for managing the legal entity
   * (e.g., a Chief Executive Officer, Chief Financial Officer, Chief Operating
   * Officer,
   *
   * Managing Member, General Partner, President, Vice President, or Treasurer). This
   * can be an executive, or someone who will have program-wide access
   *
   * to the cards that Lithic will provide. In some cases, this individual could also
   * be a beneficial owner listed above.
   */
  control_person?: AccountHolderSimulateEnrollmentReviewResponse.ControlPerson;

  /**
   * Timestamp of when the account holder was created.
   */
  created?: string;

  /**
   * (Deprecated. Use control_person.email when user_type == "BUSINESS". Use
   * individual.phone_number when user_type == "INDIVIDUAL".) Primary email of
   * Account Holder.
   */
  email?: string;

  /**
   * The type of KYC exemption for a KYC-Exempt Account Holder. "None" if the account
   * holder is not KYC-Exempt.
   */
  exemption_type?: 'AUTHORIZED_USER' | 'PREPAID_CARD_USER';

  /**
   * Customer-provided token that indicates a relationship with an object outside of
   * the Lithic ecosystem.
   */
  external_id?: string;

  /**
   * Only present when user_type == "INDIVIDUAL". Information about the individual
   * for which the account is being opened and KYC is being run.
   */
  individual?: AccountHolderSimulateEnrollmentReviewResponse.Individual;

  /**
   * Only present when user_type == "BUSINESS". 6-digit North American Industry
   * Classification System (NAICS) code for the business.
   */
  naics_code?: string;

  /**
   * Only present when user_type == "BUSINESS". User-submitted description of the
   * business.
   */
  nature_of_business?: string;

  /**
   * (Deprecated. Use control_person.phone_number when user_type == "BUSINESS". Use
   * individual.phone_number when user_type == "INDIVIDUAL".) Primary phone of
   * Account Holder, entered in E.164 format.
   */
  phone_number?: string;

  /**
   * Only present for "KYB_BASIC" and "KYC_ADVANCED" workflows. A list of documents
   * required for the account holder to be approved.
   */
  required_documents?: Array<RequiredDocument>;

  /**
   * (Deprecated. Use verification_application.status instead) KYC and KYB evaluation
   * states.
   *
   * Note: `PENDING_RESUBMIT` and `PENDING_DOCUMENT` are only applicable for the
   * `ADVANCED` workflow.
   */
  status?: 'ACCEPTED' | 'PENDING_DOCUMENT' | 'PENDING_RESUBMIT' | 'REJECTED';

  /**
   * (Deprecated. Use verification_application.status_reasons) Reason for the
   * evaluation status.
   */
  status_reasons?: Array<
    | 'ADDRESS_VERIFICATION_FAILURE'
    | 'AGE_THRESHOLD_FAILURE'
    | 'COMPLETE_VERIFICATION_FAILURE'
    | 'DOB_VERIFICATION_FAILURE'
    | 'ID_VERIFICATION_FAILURE'
    | 'MAX_DOCUMENT_ATTEMPTS'
    | 'MAX_RESUBMISSION_ATTEMPTS'
    | 'NAME_VERIFICATION_FAILURE'
    | 'OTHER_VERIFICATION_FAILURE'
    | 'RISK_THRESHOLD_FAILURE'
    | 'WATCHLIST_ALERT_FAILURE'
    | 'PRIMARY_BUSINESS_ENTITY_ID_VERIFICATION_FAILURE'
    | 'PRIMARY_BUSINESS_ENTITY_ADDRESS_VERIFICATION_FAILURE'
    | 'PRIMARY_BUSINESS_ENTITY_NAME_VERIFICATION_FAILURE'
    | 'PRIMARY_BUSINESS_ENTITY_BUSINESS_OFFICERS_NOT_MATCHED'
    | 'PRIMARY_BUSINESS_ENTITY_SOS_FILING_INACTIVE'
    | 'PRIMARY_BUSINESS_ENTITY_SOS_NOT_MATCHED'
    | 'PRIMARY_BUSINESS_ENTITY_CMRA_FAILURE'
    | 'PRIMARY_BUSINESS_ENTITY_WATCHLIST_FAILURE'
    | 'PRIMARY_BUSINESS_ENTITY_REGISTERED_AGENT_FAILURE'
    | 'CONTROL_PERSON_BLOCKLIST_ALERT_FAILURE'
    | 'CONTROL_PERSON_ID_VERIFICATION_FAILURE'
    | 'CONTROL_PERSON_DOB_VERIFICATION_FAILURE'
    | 'CONTROL_PERSON_NAME_VERIFICATION_FAILURE'
  >;

  /**
   * The type of Account Holder. If the type is "INDIVIDUAL", the "individual"
   * attribute will be present.
   *
   * If the type is "BUSINESS" then the "business_entity", "control_person",
   * "beneficial_owner_individuals", "naics_code", "nature_of_business", and
   * "website_url" attributes will be present.
   */
  user_type?: 'BUSINESS' | 'INDIVIDUAL';

  /**
   * Information about the most recent identity verification attempt
   */
  verification_application?: AccountHolderSimulateEnrollmentReviewResponse.VerificationApplication;

  /**
   * Only present when user_type == "BUSINESS". Business's primary website.
   */
  website_url?: string;
}

export namespace AccountHolderSimulateEnrollmentReviewResponse {
  export interface BeneficialOwnerIndividual {
    /**
     * Individual's current address - PO boxes, UPS drops, and FedEx drops are not
     * acceptable; APO/FPO are acceptable. Only USA addresses are currently supported.
     */
    address?: BeneficialOwnerIndividual.Address;

    /**
     * Individual's date of birth, as an RFC 3339 date.
     */
    dob?: string;

    /**
     * Individual's email address. If utilizing Lithic for chargeback processing, this
     * customer email address may be used to communicate dispute status and resolution.
     */
    email?: string;

    /**
     * Individual's first name, as it appears on government-issued identity documents.
     */
    first_name?: string;

    /**
     * Individual's last name, as it appears on government-issued identity documents.
     */
    last_name?: string;

    /**
     * Individual's phone number, entered in E.164 format.
     */
    phone_number?: string;
  }

  export namespace BeneficialOwnerIndividual {
    /**
     * Individual's current address - PO boxes, UPS drops, and FedEx drops are not
     * acceptable; APO/FPO are acceptable. Only USA addresses are currently supported.
     */
    export interface Address {
      /**
       * Valid deliverable address (no PO boxes).
       */
      address1: string;

      /**
       * Name of city.
       */
      city: string;

      /**
       * Valid country code. Only USA is currently supported, entered in uppercase ISO
       * 3166-1 alpha-3 three-character format.
       */
      country: string;

      /**
       * Valid postal code. Only USA ZIP codes are currently supported, entered as a
       * five-digit ZIP or nine-digit ZIP+4.
       */
      postal_code: string;

      /**
       * Valid state code. Only USA state codes are currently supported, entered in
       * uppercase ISO 3166-2 two-character format.
       */
      state: string;

      /**
       * Unit or apartment number (if applicable).
       */
      address2?: string;
    }
  }

  /**
   * Only present when user_type == "BUSINESS".
   *
   * An individual with significant responsibility for managing the legal entity
   * (e.g., a Chief Executive Officer, Chief Financial Officer, Chief Operating
   * Officer,
   *
   * Managing Member, General Partner, President, Vice President, or Treasurer). This
   * can be an executive, or someone who will have program-wide access
   *
   * to the cards that Lithic will provide. In some cases, this individual could also
   * be a beneficial owner listed above.
   */
  export interface ControlPerson {
    /**
     * Individual's current address - PO boxes, UPS drops, and FedEx drops are not
     * acceptable; APO/FPO are acceptable. Only USA addresses are currently supported.
     */
    address?: ControlPerson.Address;

    /**
     * Individual's date of birth, as an RFC 3339 date.
     */
    dob?: string;

    /**
     * Individual's email address. If utilizing Lithic for chargeback processing, this
     * customer email address may be used to communicate dispute status and resolution.
     */
    email?: string;

    /**
     * Individual's first name, as it appears on government-issued identity documents.
     */
    first_name?: string;

    /**
     * Individual's last name, as it appears on government-issued identity documents.
     */
    last_name?: string;

    /**
     * Individual's phone number, entered in E.164 format.
     */
    phone_number?: string;
  }

  export namespace ControlPerson {
    /**
     * Individual's current address - PO boxes, UPS drops, and FedEx drops are not
     * acceptable; APO/FPO are acceptable. Only USA addresses are currently supported.
     */
    export interface Address {
      /**
       * Valid deliverable address (no PO boxes).
       */
      address1: string;

      /**
       * Name of city.
       */
      city: string;

      /**
       * Valid country code. Only USA is currently supported, entered in uppercase ISO
       * 3166-1 alpha-3 three-character format.
       */
      country: string;

      /**
       * Valid postal code. Only USA ZIP codes are currently supported, entered as a
       * five-digit ZIP or nine-digit ZIP+4.
       */
      postal_code: string;

      /**
       * Valid state code. Only USA state codes are currently supported, entered in
       * uppercase ISO 3166-2 two-character format.
       */
      state: string;

      /**
       * Unit or apartment number (if applicable).
       */
      address2?: string;
    }
  }

  /**
   * Only present when user_type == "INDIVIDUAL". Information about the individual
   * for which the account is being opened and KYC is being run.
   */
  export interface Individual {
    /**
     * Individual's current address - PO boxes, UPS drops, and FedEx drops are not
     * acceptable; APO/FPO are acceptable. Only USA addresses are currently supported.
     */
    address?: Individual.Address;

    /**
     * Individual's date of birth, as an RFC 3339 date.
     */
    dob?: string;

    /**
     * Individual's email address. If utilizing Lithic for chargeback processing, this
     * customer email address may be used to communicate dispute status and resolution.
     */
    email?: string;

    /**
     * Individual's first name, as it appears on government-issued identity documents.
     */
    first_name?: string;

    /**
     * Individual's last name, as it appears on government-issued identity documents.
     */
    last_name?: string;

    /**
     * Individual's phone number, entered in E.164 format.
     */
    phone_number?: string;
  }

  export namespace Individual {
    /**
     * Individual's current address - PO boxes, UPS drops, and FedEx drops are not
     * acceptable; APO/FPO are acceptable. Only USA addresses are currently supported.
     */
    export interface Address {
      /**
       * Valid deliverable address (no PO boxes).
       */
      address1: string;

      /**
       * Name of city.
       */
      city: string;

      /**
       * Valid country code. Only USA is currently supported, entered in uppercase ISO
       * 3166-1 alpha-3 three-character format.
       */
      country: string;

      /**
       * Valid postal code. Only USA ZIP codes are currently supported, entered as a
       * five-digit ZIP or nine-digit ZIP+4.
       */
      postal_code: string;

      /**
       * Valid state code. Only USA state codes are currently supported, entered in
       * uppercase ISO 3166-2 two-character format.
       */
      state: string;

      /**
       * Unit or apartment number (if applicable).
       */
      address2?: string;
    }
  }

  /**
   * Information about the most recent identity verification attempt
   */
  export interface VerificationApplication {
    /**
     * Timestamp of when the application was created.
     */
    created: string;

    /**
     * KYC and KYB evaluation states.
     *
     * Note: `PENDING_RESUBMIT` and `PENDING_DOCUMENT` are only applicable for the
     * `ADVANCED` workflow.
     */
    status: 'ACCEPTED' | 'PENDING_DOCUMENT' | 'PENDING_RESUBMIT' | 'REJECTED';

    /**
     * Reason for the evaluation status.
     */
    status_reasons: Array<
      | 'ADDRESS_VERIFICATION_FAILURE'
      | 'AGE_THRESHOLD_FAILURE'
      | 'COMPLETE_VERIFICATION_FAILURE'
      | 'DOB_VERIFICATION_FAILURE'
      | 'ID_VERIFICATION_FAILURE'
      | 'MAX_DOCUMENT_ATTEMPTS'
      | 'MAX_RESUBMISSION_ATTEMPTS'
      | 'NAME_VERIFICATION_FAILURE'
      | 'OTHER_VERIFICATION_FAILURE'
      | 'RISK_THRESHOLD_FAILURE'
      | 'WATCHLIST_ALERT_FAILURE'
      | 'PRIMARY_BUSINESS_ENTITY_ID_VERIFICATION_FAILURE'
      | 'PRIMARY_BUSINESS_ENTITY_ADDRESS_VERIFICATION_FAILURE'
      | 'PRIMARY_BUSINESS_ENTITY_NAME_VERIFICATION_FAILURE'
      | 'PRIMARY_BUSINESS_ENTITY_BUSINESS_OFFICERS_NOT_MATCHED'
      | 'PRIMARY_BUSINESS_ENTITY_SOS_FILING_INACTIVE'
      | 'PRIMARY_BUSINESS_ENTITY_SOS_NOT_MATCHED'
      | 'PRIMARY_BUSINESS_ENTITY_CMRA_FAILURE'
      | 'PRIMARY_BUSINESS_ENTITY_WATCHLIST_FAILURE'
      | 'PRIMARY_BUSINESS_ENTITY_REGISTERED_AGENT_FAILURE'
      | 'CONTROL_PERSON_BLOCKLIST_ALERT_FAILURE'
      | 'CONTROL_PERSON_ID_VERIFICATION_FAILURE'
      | 'CONTROL_PERSON_DOB_VERIFICATION_FAILURE'
      | 'CONTROL_PERSON_NAME_VERIFICATION_FAILURE'
    >;

    /**
     * Timestamp of when the application was last updated.
     */
    updated: string;

    /**
     * Timestamp of when the application passed the verification process. Only present
     * if `status` is `ACCEPTED`
     */
    ky_passed_at?: string;
  }
}

export type AccountHolderCreateParams =
  | AccountHolderCreateParams.KYB
  | AccountHolderCreateParams.KYBDelegated
  | AccountHolderCreateParams.KYC
  | AccountHolderCreateParams.KYCExempt;

export declare namespace AccountHolderCreateParams {
  export interface KYB {
    /**
     * You must submit a list of all direct and indirect individuals with 25% or more
     * ownership in the company. A maximum of 4 beneficial owners can be submitted. If
     * no individual owns 25% of the company you do not need to send beneficial owner
     * information. See
     * [FinCEN requirements](https://www.fincen.gov/sites/default/files/shared/CDD_Rev6.7_Sept_2017_Certificate.pdf)
     * (Section I) for more background on individuals that should be included.
     */
    beneficial_owner_individuals: Array<KYB.BeneficialOwnerIndividual>;

    /**
     * Information for business for which the account is being opened and KYB is being
     * run.
     */
    business_entity: KYB.BusinessEntity;

    /**
     * An individual with significant responsibility for managing the legal entity
     * (e.g., a Chief Executive Officer, Chief Financial Officer, Chief Operating
     * Officer, Managing Member, General Partner, President, Vice President, or
     * Treasurer). This can be an executive, or someone who will have program-wide
     * access to the cards that Lithic will provide. In some cases, this individual
     * could also be a beneficial owner listed above. See
     * [FinCEN requirements](https://www.fincen.gov/sites/default/files/shared/CDD_Rev6.7_Sept_2017_Certificate.pdf)
     * (Section II) for more background.
     */
    control_person: KYB.ControlPerson;

    /**
     * Short description of the company's line of business (i.e., what does the company
     * do?).
     */
    nature_of_business: string;

    /**
     * An RFC 3339 timestamp indicating when the account holder accepted the applicable
     * legal agreements (e.g., cardholder terms) as agreed upon during API customer's
     * implementation with Lithic.
     */
    tos_timestamp: string;

    /**
     * Specifies the type of KYB workflow to run.
     */
    workflow: 'KYB_BASIC' | 'KYB_BYO';

    /**
     * @deprecated Deprecated.
     */
    beneficial_owner_entities?: Array<KYB.BeneficialOwnerEntity>;

    /**
     * A user provided id that can be used to link an account holder with an external
     * system
     */
    external_id?: string;

    /**
     * An RFC 3339 timestamp indicating when precomputed KYB was completed on the
     * business with a pass result.
     *
     * This field is required only if workflow type is `KYB_BYO`.
     */
    kyb_passed_timestamp?: string;

    /**
     * 6-digit North American Industry Classification System (NAICS) code for the
     * business.
     */
    naics_code?: string;

    /**
     * Company website URL.
     */
    website_url?: string;
  }

  export namespace KYB {
    /**
     * Individuals associated with a KYB application. Phone number is optional.
     */
    export interface BeneficialOwnerIndividual {
      /**
       * Individual's current address - PO boxes, UPS drops, and FedEx drops are not
       * acceptable; APO/FPO are acceptable. Only USA addresses are currently supported.
       */
      address: Shared.Address;

      /**
       * Individual's date of birth, as an RFC 3339 date.
       */
      dob: string;

      /**
       * Individual's email address. If utilizing Lithic for chargeback processing, this
       * customer email address may be used to communicate dispute status and resolution.
       */
      email: string;

      /**
       * Individual's first name, as it appears on government-issued identity documents.
       */
      first_name: string;

      /**
       * Government-issued identification number (required for identity verification and
       * compliance with banking regulations). Social Security Numbers (SSN) and
       * Individual Taxpayer Identification Numbers (ITIN) are currently supported,
       * entered as full nine-digits, with or without hyphens
       */
      government_id: string;

      /**
       * Individual's last name, as it appears on government-issued identity documents.
       */
      last_name: string;

      /**
       * Individual's phone number, entered in E.164 format.
       */
      phone_number?: string;
    }

    /**
     * Information for business for which the account is being opened and KYB is being
     * run.
     */
    export interface BusinessEntity {
      /**
       * Business's physical address - PO boxes, UPS drops, and FedEx drops are not
       * acceptable; APO/FPO are acceptable.
       */
      address: Shared.Address;

      /**
       * Government-issued identification number. US Federal Employer Identification
       * Numbers (EIN) are currently supported, entered as full nine-digits, with or
       * without hyphens.
       */
      government_id: string;

      /**
       * Legal (formal) business name.
       */
      legal_business_name: string;

      /**
       * One or more of the business's phone number(s), entered as a list in E.164
       * format.
       */
      phone_numbers: Array<string>;

      /**
       * Any name that the business operates under that is not its legal business name
       * (if applicable).
       */
      dba_business_name?: string;

      /**
       * Parent company name (if applicable).
       */
      parent_company?: string;
    }

    /**
     * An individual with significant responsibility for managing the legal entity
     * (e.g., a Chief Executive Officer, Chief Financial Officer, Chief Operating
     * Officer, Managing Member, General Partner, President, Vice President, or
     * Treasurer). This can be an executive, or someone who will have program-wide
     * access to the cards that Lithic will provide. In some cases, this individual
     * could also be a beneficial owner listed above. See
     * [FinCEN requirements](https://www.fincen.gov/sites/default/files/shared/CDD_Rev6.7_Sept_2017_Certificate.pdf)
     * (Section II) for more background.
     */
    export interface ControlPerson {
      /**
       * Individual's current address - PO boxes, UPS drops, and FedEx drops are not
       * acceptable; APO/FPO are acceptable. Only USA addresses are currently supported.
       */
      address: Shared.Address;

      /**
       * Individual's date of birth, as an RFC 3339 date.
       */
      dob: string;

      /**
       * Individual's email address. If utilizing Lithic for chargeback processing, this
       * customer email address may be used to communicate dispute status and resolution.
       */
      email: string;

      /**
       * Individual's first name, as it appears on government-issued identity documents.
       */
      first_name: string;

      /**
       * Government-issued identification number (required for identity verification and
       * compliance with banking regulations). Social Security Numbers (SSN) and
       * Individual Taxpayer Identification Numbers (ITIN) are currently supported,
       * entered as full nine-digits, with or without hyphens
       */
      government_id: string;

      /**
       * Individual's last name, as it appears on government-issued identity documents.
       */
      last_name: string;

      /**
       * Individual's phone number, entered in E.164 format.
       */
      phone_number?: string;
    }

    export interface BeneficialOwnerEntity {
      /**
       * Business's physical address - PO boxes, UPS drops, and FedEx drops are not
       * acceptable; APO/FPO are acceptable.
       */
      address: Shared.Address;

      /**
       * Government-issued identification number. US Federal Employer Identification
       * Numbers (EIN) are currently supported, entered as full nine-digits, with or
       * without hyphens.
       */
      government_id: string;

      /**
       * Legal (formal) business name.
       */
      legal_business_name: string;

      /**
       * One or more of the business's phone number(s), entered as a list in E.164
       * format.
       */
      phone_numbers: Array<string>;

      /**
       * Any name that the business operates under that is not its legal business name
       * (if applicable).
       */
      dba_business_name?: string;

      /**
       * Parent company name (if applicable).
       */
      parent_company?: string;
    }
  }

  export interface KYBDelegated {
    /**
     * Information for business for which the account is being opened.
     */
    business_entity: KYBDelegated.BusinessEntity;

    /**
     * You can submit a list of all direct and indirect individuals with 25% or more
     * ownership in the company. A maximum of 4 beneficial owners can be submitted. If
     * no individual owns 25% of the company you do not need to send beneficial owner
     * information. See
     * [FinCEN requirements](https://www.fincen.gov/sites/default/files/shared/CDD_Rev6.7_Sept_2017_Certificate.pdf)
     * (Section I) for more background on individuals that should be included.
     */
    beneficial_owner_individuals?: Array<KYBDelegated.BeneficialOwnerIndividual>;

    /**
     * An individual with significant responsibility for managing the legal entity
     * (e.g., a Chief Executive Officer, Chief Financial Officer, Chief Operating
     * Officer, Managing Member, General Partner, President, Vice President, or
     * Treasurer). This can be an executive, or someone who will have program-wide
     * access to the cards that Lithic will provide. In some cases, this individual
     * could also be a beneficial owner listed above. See
     * [FinCEN requirements](https://www.fincen.gov/sites/default/files/shared/CDD_Rev6.7_Sept_2017_Certificate.pdf)
     * (Section II) for more background.
     */
    control_person?: KYBDelegated.ControlPerson;

    /**
     * A user provided id that can be used to link an account holder with an external
     * system
     */
    external_id?: string;

    /**
     * 6-digit North American Industry Classification System (NAICS) code for the
     * business.
     */
    naics_code?: string;

    /**
     * Short description of the company's line of business (i.e., what does the company
     * do?).
     */
    nature_of_business?: string;

    /**
     * An RFC 3339 timestamp indicating when the account holder accepted the applicable
     * legal agreements (e.g., cardholder terms) as agreed upon during API customer's
     * implementation with Lithic.
     */
    tos_timestamp?: string;

    /**
     * Company website URL.
     */
    website_url?: string;

    /**
     * Specifies the type of KYB workflow to run.
     */
    workflow?: 'KYB_DELEGATED';
  }

  export namespace KYBDelegated {
    /**
     * Information for business for which the account is being opened.
     */
    export interface BusinessEntity {
      /**
       * Business's physical address - PO boxes, UPS drops, and FedEx drops are not
       * acceptable; APO/FPO are acceptable.
       */
      address: Shared.Address;

      /**
       * Legal (formal) business name.
       */
      legal_business_name: string;

      /**
       * Any name that the business operates under that is not its legal business name
       * (if applicable).
       */
      dba_business_name?: string;

      /**
       * Government-issued identification number. US Federal Employer Identification
       * Numbers (EIN) are currently supported, entered as full nine-digits, with or
       * without hyphens.
       */
      government_id?: string;

      /**
       * Parent company name (if applicable).
       */
      parent_company?: string;

      /**
       * One or more of the business's phone number(s), entered as a list in E.164
       * format.
       */
      phone_numbers?: Array<string>;
    }

    /**
     * Individuals associated with a KYB application. Phone number is optional.
     */
    export interface BeneficialOwnerIndividual {
      /**
       * Individual's current address - PO boxes, UPS drops, and FedEx drops are not
       * acceptable; APO/FPO are acceptable. Only USA addresses are currently supported.
       */
      address: Shared.Address;

      /**
       * Individual's date of birth, as an RFC 3339 date.
       */
      dob: string;

      /**
       * Individual's email address. If utilizing Lithic for chargeback processing, this
       * customer email address may be used to communicate dispute status and resolution.
       */
      email: string;

      /**
       * Individual's first name, as it appears on government-issued identity documents.
       */
      first_name: string;

      /**
       * Government-issued identification number (required for identity verification and
       * compliance with banking regulations). Social Security Numbers (SSN) and
       * Individual Taxpayer Identification Numbers (ITIN) are currently supported,
       * entered as full nine-digits, with or without hyphens
       */
      government_id: string;

      /**
       * Individual's last name, as it appears on government-issued identity documents.
       */
      last_name: string;

      /**
       * Individual's phone number, entered in E.164 format.
       */
      phone_number?: string;
    }

    /**
     * An individual with significant responsibility for managing the legal entity
     * (e.g., a Chief Executive Officer, Chief Financial Officer, Chief Operating
     * Officer, Managing Member, General Partner, President, Vice President, or
     * Treasurer). This can be an executive, or someone who will have program-wide
     * access to the cards that Lithic will provide. In some cases, this individual
     * could also be a beneficial owner listed above. See
     * [FinCEN requirements](https://www.fincen.gov/sites/default/files/shared/CDD_Rev6.7_Sept_2017_Certificate.pdf)
     * (Section II) for more background.
     */
    export interface ControlPerson {
      /**
       * Individual's current address - PO boxes, UPS drops, and FedEx drops are not
       * acceptable; APO/FPO are acceptable. Only USA addresses are currently supported.
       */
      address: Shared.Address;

      /**
       * Individual's date of birth, as an RFC 3339 date.
       */
      dob: string;

      /**
       * Individual's email address. If utilizing Lithic for chargeback processing, this
       * customer email address may be used to communicate dispute status and resolution.
       */
      email: string;

      /**
       * Individual's first name, as it appears on government-issued identity documents.
       */
      first_name: string;

      /**
       * Government-issued identification number (required for identity verification and
       * compliance with banking regulations). Social Security Numbers (SSN) and
       * Individual Taxpayer Identification Numbers (ITIN) are currently supported,
       * entered as full nine-digits, with or without hyphens
       */
      government_id: string;

      /**
       * Individual's last name, as it appears on government-issued identity documents.
       */
      last_name: string;

      /**
       * Individual's phone number, entered in E.164 format.
       */
      phone_number?: string;
    }
  }

  export interface KYC {
    /**
     * Information on individual for whom the account is being opened and KYC is being
     * run.
     */
    individual: KYC.Individual;

    /**
     * An RFC 3339 timestamp indicating when the account holder accepted the applicable
     * legal agreements (e.g., cardholder terms) as agreed upon during API customer's
     * implementation with Lithic.
     */
    tos_timestamp: string;

    /**
     * Specifies the type of KYC workflow to run.
     */
    workflow: 'KYC_BASIC' | 'KYC_BYO';

    /**
     * A user provided id that can be used to link an account holder with an external
     * system
     */
    external_id?: string;

    /**
     * An RFC 3339 timestamp indicating when precomputed KYC was completed on the
     * individual with a pass result.
     *
     * This field is required only if workflow type is `KYC_BYO`.
     */
    kyc_passed_timestamp?: string;
  }

  export namespace KYC {
    /**
     * Information on individual for whom the account is being opened and KYC is being
     * run.
     */
    export interface Individual {
      /**
       * Individual's current address - PO boxes, UPS drops, and FedEx drops are not
       * acceptable; APO/FPO are acceptable. Only USA addresses are currently supported.
       */
      address: Shared.Address;

      /**
       * Individual's date of birth, as an RFC 3339 date.
       */
      dob: string;

      /**
       * Individual's email address. If utilizing Lithic for chargeback processing, this
       * customer email address may be used to communicate dispute status and resolution.
       */
      email: string;

      /**
       * Individual's first name, as it appears on government-issued identity documents.
       */
      first_name: string;

      /**
       * Government-issued identification number (required for identity verification and
       * compliance with banking regulations). Social Security Numbers (SSN) and
       * Individual Taxpayer Identification Numbers (ITIN) are currently supported,
       * entered as full nine-digits, with or without hyphens
       */
      government_id: string;

      /**
       * Individual's last name, as it appears on government-issued identity documents.
       */
      last_name: string;

      /**
       * Individual's phone number, entered in E.164 format.
       */
      phone_number: string;
    }
  }

  export interface KYCExempt {
    /**
     * KYC Exempt user's current address - PO boxes, UPS drops, and FedEx drops are not
     * acceptable; APO/FPO are acceptable.
     */
    address: Shared.Address;

    /**
     * The KYC Exempt user's email
     */
    email: string;

    /**
     * The KYC Exempt user's first name
     */
    first_name: string;

    /**
     * Specifies the type of KYC Exempt user
     */
    kyc_exemption_type: 'AUTHORIZED_USER' | 'PREPAID_CARD_USER';

    /**
     * The KYC Exempt user's last name
     */
    last_name: string;

    /**
     * The KYC Exempt user's phone number, entered in E.164 format.
     */
    phone_number: string;

    /**
     * Specifies the workflow type. This must be 'KYC_EXEMPT'
     */
    workflow: 'KYC_EXEMPT';

    /**
     * Only applicable for customers using the KYC-Exempt workflow to enroll authorized
     * users of businesses. Pass the account_token of the enrolled business associated
     * with the AUTHORIZED_USER in this field.
     */
    business_account_token?: string;

    /**
     * A user provided id that can be used to link an account holder with an external
     * system
     */
    external_id?: string;
  }
}

export type AccountHolderUpdateParams =
  | AccountHolderUpdateParams.KYBPatchRequest
  | AccountHolderUpdateParams.KYCPatchRequest
  | AccountHolderUpdateParams.PatchRequest;

export declare namespace AccountHolderUpdateParams {
  export interface KYBPatchRequest {
    /**
     * @deprecated Deprecated.
     */
    beneficial_owner_entities?: Array<KYBPatchRequest.BeneficialOwnerEntity>;

    /**
     * You must submit a list of all direct and indirect individuals with 25% or more
     * ownership in the company. A maximum of 4 beneficial owners can be submitted. If
     * no individual owns 25% of the company you do not need to send beneficial owner
     * information. See
     * [FinCEN requirements](https://www.fincen.gov/sites/default/files/shared/CDD_Rev6.7_Sept_2017_Certificate.pdf)
     * (Section I) for more background on individuals that should be included.
     */
    beneficial_owner_individuals?: Array<KYBPatchRequest.BeneficialOwnerIndividual>;

    /**
     * Information for business for which the account is being opened and KYB is being
     * run.
     */
    business_entity?: KYBPatchRequest.BusinessEntity;

    /**
     * An individual with significant responsibility for managing the legal entity
     * (e.g., a Chief Executive Officer, Chief Financial Officer, Chief Operating
     * Officer, Managing Member, General Partner, President, Vice President, or
     * Treasurer). This can be an executive, or someone who will have program-wide
     * access to the cards that Lithic will provide. In some cases, this individual
     * could also be a beneficial owner listed above. See
     * [FinCEN requirements](https://www.fincen.gov/sites/default/files/shared/CDD_Rev6.7_Sept_2017_Certificate.pdf)
     * (Section II) for more background.
     */
    control_person?: KYBPatchRequest.ControlPerson;

    /**
     * A user provided id that can be used to link an account holder with an external
     * system
     */
    external_id?: string;

    /**
     * 6-digit North American Industry Classification System (NAICS) code for the
     * business.
     */
    naics_code?: string;

    /**
     * Short description of the company's line of business (i.e., what does the company
     * do?).
     */
    nature_of_business?: string;

    /**
     * Company website URL.
     */
    website_url?: string;
  }

  export namespace KYBPatchRequest {
    export interface BeneficialOwnerEntity {
      /**
       * Globally unique identifier for an entity.
       */
      entity_token: string;

      /**
       * Business''s physical address - PO boxes, UPS drops, and FedEx drops are not
       * acceptable; APO/FPO are acceptable.
       */
      address?: AccountHoldersAPI.AddressUpdate;

      /**
       * Any name that the business operates under that is not its legal business name
       * (if applicable).
       */
      dba_business_name?: string;

      /**
       * Government-issued identification number. US Federal Employer Identification
       * Numbers (EIN) are currently supported, entered as full nine-digits, with or
       * without hyphens.
       */
      government_id?: string;

      /**
       * Legal (formal) business name.
       */
      legal_business_name?: string;

      /**
       * Parent company name (if applicable).
       */
      parent_company?: string;

      /**
       * One or more of the business's phone number(s), entered as a list in E.164
       * format.
       */
      phone_numbers?: Array<string>;
    }

    /**
     * Individuals associated with a KYB application. Phone number is optional.
     */
    export interface BeneficialOwnerIndividual {
      /**
       * Globally unique identifier for an entity.
       */
      entity_token: string;

      /**
       * Individual's current address - PO boxes, UPS drops, and FedEx drops are not
       * acceptable; APO/FPO are acceptable. Only USA addresses are currently supported.
       */
      address?: AccountHoldersAPI.AddressUpdate;

      /**
       * Individual's date of birth, as an RFC 3339 date.
       */
      dob?: string;

      /**
       * Individual's email address. If utilizing Lithic for chargeback processing, this
       * customer email address may be used to communicate dispute status and resolution.
       */
      email?: string;

      /**
       * Individual's first name, as it appears on government-issued identity documents.
       */
      first_name?: string;

      /**
       * Government-issued identification number (required for identity verification and
       * compliance with banking regulations). Social Security Numbers (SSN) and
       * Individual Taxpayer Identification Numbers (ITIN) are currently supported,
       * entered as full nine-digits, with or without hyphens
       */
      government_id?: string;

      /**
       * Individual's last name, as it appears on government-issued identity documents.
       */
      last_name?: string;

      /**
       * Individual's phone number, entered in E.164 format.
       */
      phone_number?: string;
    }

    /**
     * Information for business for which the account is being opened and KYB is being
     * run.
     */
    export interface BusinessEntity {
      /**
       * Globally unique identifier for an entity.
       */
      entity_token: string;

      /**
       * Business''s physical address - PO boxes, UPS drops, and FedEx drops are not
       * acceptable; APO/FPO are acceptable.
       */
      address?: AccountHoldersAPI.AddressUpdate;

      /**
       * Any name that the business operates under that is not its legal business name
       * (if applicable).
       */
      dba_business_name?: string;

      /**
       * Government-issued identification number. US Federal Employer Identification
       * Numbers (EIN) are currently supported, entered as full nine-digits, with or
       * without hyphens.
       */
      government_id?: string;

      /**
       * Legal (formal) business name.
       */
      legal_business_name?: string;

      /**
       * Parent company name (if applicable).
       */
      parent_company?: string;

      /**
       * One or more of the business's phone number(s), entered as a list in E.164
       * format.
       */
      phone_numbers?: Array<string>;
    }

    /**
     * An individual with significant responsibility for managing the legal entity
     * (e.g., a Chief Executive Officer, Chief Financial Officer, Chief Operating
     * Officer, Managing Member, General Partner, President, Vice President, or
     * Treasurer). This can be an executive, or someone who will have program-wide
     * access to the cards that Lithic will provide. In some cases, this individual
     * could also be a beneficial owner listed above. See
     * [FinCEN requirements](https://www.fincen.gov/sites/default/files/shared/CDD_Rev6.7_Sept_2017_Certificate.pdf)
     * (Section II) for more background.
     */
    export interface ControlPerson {
      /**
       * Globally unique identifier for an entity.
       */
      entity_token: string;

      /**
       * Individual's current address - PO boxes, UPS drops, and FedEx drops are not
       * acceptable; APO/FPO are acceptable. Only USA addresses are currently supported.
       */
      address?: AccountHoldersAPI.AddressUpdate;

      /**
       * Individual's date of birth, as an RFC 3339 date.
       */
      dob?: string;

      /**
       * Individual's email address. If utilizing Lithic for chargeback processing, this
       * customer email address may be used to communicate dispute status and resolution.
       */
      email?: string;

      /**
       * Individual's first name, as it appears on government-issued identity documents.
       */
      first_name?: string;

      /**
       * Government-issued identification number (required for identity verification and
       * compliance with banking regulations). Social Security Numbers (SSN) and
       * Individual Taxpayer Identification Numbers (ITIN) are currently supported,
       * entered as full nine-digits, with or without hyphens
       */
      government_id?: string;

      /**
       * Individual's last name, as it appears on government-issued identity documents.
       */
      last_name?: string;

      /**
       * Individual's phone number, entered in E.164 format.
       */
      phone_number?: string;
    }
  }

  export interface KYCPatchRequest {
    /**
     * A user provided id that can be used to link an account holder with an external
     * system
     */
    external_id?: string;

    /**
     * Information on the individual for whom the account is being opened and KYC is
     * being run.
     */
    individual?: KYCPatchRequest.Individual;
  }

  export namespace KYCPatchRequest {
    /**
     * Information on the individual for whom the account is being opened and KYC is
     * being run.
     */
    export interface Individual {
      /**
       * Globally unique identifier for an entity.
       */
      entity_token: string;

      /**
       * Individual's current address - PO boxes, UPS drops, and FedEx drops are not
       * acceptable; APO/FPO are acceptable. Only USA addresses are currently supported.
       */
      address?: AccountHoldersAPI.AddressUpdate;

      /**
       * Individual's date of birth, as an RFC 3339 date.
       */
      dob?: string;

      /**
       * Individual's email address. If utilizing Lithic for chargeback processing, this
       * customer email address may be used to communicate dispute status and resolution.
       */
      email?: string;

      /**
       * Individual's first name, as it appears on government-issued identity documents.
       */
      first_name?: string;

      /**
       * Government-issued identification number (required for identity verification and
       * compliance with banking regulations). Social Security Numbers (SSN) and
       * Individual Taxpayer Identification Numbers (ITIN) are currently supported,
       * entered as full nine-digits, with or without hyphens
       */
      government_id?: string;

      /**
       * Individual's last name, as it appears on government-issued identity documents.
       */
      last_name?: string;

      /**
       * Individual's phone number, entered in E.164 format.
       */
      phone_number?: string;
    }
  }

  export interface PatchRequest {
    /**
     * Allowed for: KYC-Exempt, BYO-KYC, BYO-KYB.
     */
    address?: AddressUpdate;

    /**
     * Allowed for: KYC-Exempt, BYO-KYC. The token of the business account to which the
     * account holder is associated.
     */
    business_account_token?: string;

    /**
     * Allowed for all Account Holders. Account holder's email address. The primary
     * purpose of this field is for cardholder identification and verification during
     * the digital wallet tokenization process.
     */
    email?: string;

    /**
     * Allowed for KYC-Exempt, BYO-KYC. Account holder's first name.
     */
    first_name?: string;

    /**
     * Allowed for KYC-Exempt, BYO-KYC. Account holder's last name.
     */
    last_name?: string;

    /**
     * Allowed for BYO-KYB. Legal business name of the account holder.
     */
    legal_business_name?: string;

    /**
     * Allowed for all Account Holders. Account holder's phone number, entered in E.164
     * format. The primary purpose of this field is for cardholder identification and
     * verification during the digital wallet tokenization process.
     */
    phone_number?: string;
  }
}

export interface AccountHolderListParams {
  /**
   * Date string in RFC 3339 format. Only entries created after the specified time
   * will be included. UTC time zone.
   */
  begin?: string;

  /**
   * Email address of the account holder. The query must be an exact match, case
   * insensitive.
   */
  email?: string;

  /**
   * Date string in RFC 3339 format. Only entries created before the specified time
   * will be included. UTC time zone.
   */
  end?: string;

  /**
   * A cursor representing an item's token before which a page of results should end.
   * Used to retrieve the previous page of results before this item.
   */
  ending_before?: string;

  /**
   * If applicable, represents the external_id associated with the account_holder.
   */
  external_id?: string;

  /**
   * (Individual Account Holders only) The first name of the account holder. The
   * query is case insensitive and supports partial matches.
   */
  first_name?: string;

  /**
   * (Individual Account Holders only) The last name of the account holder. The query
   * is case insensitive and supports partial matches.
   */
  last_name?: string;

  /**
   * (Business Account Holders only) The legal business name of the account holder.
   * The query is case insensitive and supports partial matches.
   */
  legal_business_name?: string;

  /**
   * The number of account_holders to limit the response to.
   */
  limit?: number;

  /**
   * Phone number of the account holder. The query must be an exact match.
   */
  phone_number?: string;

  /**
   * A cursor representing an item's token after which a page of results should
   * begin. Used to retrieve the next page of results after this item.
   */
  starting_after?: string;
}

export interface AccountHolderRetrieveDocumentParams {
  /**
   * Globally unique identifier for the account holder.
   */
  account_holder_token: string;
}

export interface AccountHolderSimulateEnrollmentDocumentReviewParams {
  /**
   * The account holder document upload which to perform the simulation upon.
   */
  document_upload_token: string;

  /**
   * An account holder document's upload status for use within the simulation.
   */
  status: 'UPLOADED' | 'ACCEPTED' | 'REJECTED' | 'PARTIAL_APPROVAL';

  /**
   * A list of status reasons associated with a KYB account holder in PENDING_REVIEW
   */
  accepted_entity_status_reasons?: Array<string>;

  /**
   * Status reason that will be associated with the simulated account holder status.
   * Only required for a `REJECTED` status or `PARTIAL_APPROVAL` status.
   */
  status_reason?:
    | 'DOCUMENT_MISSING_REQUIRED_DATA'
    | 'DOCUMENT_UPLOAD_TOO_BLURRY'
    | 'FILE_SIZE_TOO_LARGE'
    | 'INVALID_DOCUMENT_TYPE'
    | 'INVALID_DOCUMENT_UPLOAD'
    | 'INVALID_ENTITY'
    | 'DOCUMENT_EXPIRED'
    | 'DOCUMENT_ISSUED_GREATER_THAN_30_DAYS'
    | 'DOCUMENT_TYPE_NOT_SUPPORTED'
    | 'UNKNOWN_FAILURE_REASON'
    | 'UNKNOWN_ERROR';
}

export interface AccountHolderSimulateEnrollmentReviewParams {
  /**
   * The account holder which to perform the simulation upon.
   */
  account_holder_token?: string;

  /**
   * An account holder's status for use within the simulation.
   */
  status?: 'ACCEPTED' | 'REJECTED' | 'PENDING_REVIEW';

  /**
   * Status reason that will be associated with the simulated account holder status.
   * Only required for a `REJECTED` status.
   */
  status_reasons?: Array<
    | 'PRIMARY_BUSINESS_ENTITY_ID_VERIFICATION_FAILURE'
    | 'PRIMARY_BUSINESS_ENTITY_ADDRESS_VERIFICATION_FAILURE'
    | 'PRIMARY_BUSINESS_ENTITY_NAME_VERIFICATION_FAILURE'
    | 'PRIMARY_BUSINESS_ENTITY_BUSINESS_OFFICERS_NOT_MATCHED'
    | 'PRIMARY_BUSINESS_ENTITY_SOS_FILING_INACTIVE'
    | 'PRIMARY_BUSINESS_ENTITY_SOS_NOT_MATCHED'
    | 'PRIMARY_BUSINESS_ENTITY_CMRA_FAILURE'
    | 'PRIMARY_BUSINESS_ENTITY_WATCHLIST_FAILURE'
    | 'PRIMARY_BUSINESS_ENTITY_REGISTERED_AGENT_FAILURE'
    | 'CONTROL_PERSON_BLOCKLIST_ALERT_FAILURE'
    | 'CONTROL_PERSON_ID_VERIFICATION_FAILURE'
    | 'CONTROL_PERSON_DOB_VERIFICATION_FAILURE'
    | 'CONTROL_PERSON_NAME_VERIFICATION_FAILURE'
    | 'BENEFICIAL_OWNER_INDIVIDUAL_DOB_VERIFICATION_FAILURE'
    | 'BENEFICIAL_OWNER_INDIVIDUAL_BLOCKLIST_ALERT_FAILURE'
    | 'BENEFICIAL_OWNER_INDIVIDUAL_ID_VERIFICATION_FAILURE'
    | 'BENEFICIAL_OWNER_INDIVIDUAL_NAME_VERIFICATION_FAILURE'
  >;
}

export interface AccountHolderUploadDocumentParams {
  /**
   * The type of document to upload
   */
  document_type:
    | 'EIN_LETTER'
    | 'TAX_RETURN'
    | 'OPERATING_AGREEMENT'
    | 'CERTIFICATE_OF_FORMATION'
    | 'DRIVERS_LICENSE'
    | 'PASSPORT'
    | 'PASSPORT_CARD'
    | 'CERTIFICATE_OF_GOOD_STANDING'
    | 'ARTICLES_OF_INCORPORATION'
    | 'ARTICLES_OF_ORGANIZATION'
    | 'BYLAWS'
    | 'GOVERNMENT_BUSINESS_LICENSE'
    | 'PARTNERSHIP_AGREEMENT'
    | 'SS4_FORM'
    | 'BANK_STATEMENT'
    | 'UTILITY_BILL_STATEMENT'
    | 'SSN_CARD'
    | 'ITIN_LETTER'
    | 'FINCEN_BOI_REPORT';

  /**
   * Globally unique identifier for the entity.
   */
  entity_token: string;
}

AccountHolders.Entities = Entities;

export declare namespace AccountHolders {
  export {
    type AccountHolder as AccountHolder,
    type AddressUpdate as AddressUpdate,
    type KYB as KYB,
    type KYBBusinessEntity as KYBBusinessEntity,
    type KYC as KYC,
    type KYCExempt as KYCExempt,
    type RequiredDocument as RequiredDocument,
    type AccountHolderCreateResponse as AccountHolderCreateResponse,
    type AccountHolderUpdateResponse as AccountHolderUpdateResponse,
    type AccountHolderListDocumentsResponse as AccountHolderListDocumentsResponse,
    type AccountHolderSimulateEnrollmentReviewResponse as AccountHolderSimulateEnrollmentReviewResponse,
    type AccountHoldersSinglePage as AccountHoldersSinglePage,
    type AccountHolderCreateParams as AccountHolderCreateParams,
    type AccountHolderUpdateParams as AccountHolderUpdateParams,
    type AccountHolderListParams as AccountHolderListParams,
    type AccountHolderRetrieveDocumentParams as AccountHolderRetrieveDocumentParams,
    type AccountHolderSimulateEnrollmentDocumentReviewParams as AccountHolderSimulateEnrollmentDocumentReviewParams,
    type AccountHolderSimulateEnrollmentReviewParams as AccountHolderSimulateEnrollmentReviewParams,
    type AccountHolderUploadDocumentParams as AccountHolderUploadDocumentParams,
  };

  export {
    Entities as Entities,
    type AccountHolderEntity as AccountHolderEntity,
    type EntityCreateResponse as EntityCreateResponse,
    type EntityCreateParams as EntityCreateParams,
    type EntityDeleteParams as EntityDeleteParams,
  };
}
