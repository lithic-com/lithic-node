// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as AccountHoldersAPI from './account-holders';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Entities extends APIResource {
  /**
   * Create a new beneficial owner or replace the control person entity on an
   * existing KYB account holder. This endpoint is only applicable for account
   * holders enrolled through a KYB workflow with the Persona KYB provider. A new
   * control person can only replace the existing one. A maximum of 4 beneficial
   * owners can be associated with an account holder.
   *
   * @example
   * ```ts
   * const entity = await client.accountHolders.entities.create(
   *   '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   *   {
   *     address: {
   *       address1: '300 Normal Forest Way',
   *       city: 'Portland',
   *       country: 'USA',
   *       postal_code: '90210',
   *       state: 'OR',
   *     },
   *     dob: '1991-03-08T08:00:00Z',
   *     email: 'tim@left-earth.com',
   *     first_name: 'Timmy',
   *     government_id: '211-23-1412',
   *     last_name: 'Turner',
   *     phone_number: '+15555555555',
   *     type: 'BENEFICIAL_OWNER_INDIVIDUAL',
   *   },
   * );
   * ```
   */
  create(
    accountHolderToken: string,
    body: EntityCreateParams,
    options?: RequestOptions,
  ): APIPromise<EntityCreateResponse> {
    return this._client.post(path`/v1/account_holders/${accountHolderToken}/entities`, { body, ...options });
  }

  /**
   * Deactivate a beneficial owner entity on an existing KYB account holder. Only
   * beneficial owner entities can be deactivated.
   *
   * @example
   * ```ts
   * const accountHolderEntity =
   *   await client.accountHolders.entities.delete(
   *     '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   *     {
   *       account_holder_token:
   *         '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   *     },
   *   );
   * ```
   */
  delete(
    entityToken: string,
    params: EntityDeleteParams,
    options?: RequestOptions,
  ): APIPromise<AccountHolderEntity> {
    const { account_holder_token } = params;
    return this._client.delete(
      path`/v1/account_holders/${account_holder_token}/entities/${entityToken}`,
      options,
    );
  }
}

/**
 * Information about an entity associated with an account holder
 */
export interface AccountHolderEntity {
  /**
   * Globally unique identifier for the entity
   */
  token: string;

  /**
   * Globally unique identifier for the account holder
   */
  account_holder_token: string;

  /**
   * Individual's current address
   */
  address: AccountHolderEntity.Address;

  /**
   * Individual's date of birth, as an RFC 3339 date
   */
  dob: string | null;

  /**
   * Individual's email address
   */
  email: string | null;

  /**
   * Individual's first name, as it appears on government-issued identity documents
   */
  first_name: string | null;

  /**
   * Individual's last name, as it appears on government-issued identity documents
   */
  last_name: string | null;

  /**
   * Individual's phone number, entered in E.164 format
   */
  phone_number: string | null;

  /**
   * The status of the entity
   */
  status: 'ACCEPTED' | 'INACTIVE' | 'PENDING_REVIEW' | 'REJECTED';

  /**
   * The type of entity
   */
  type: 'BENEFICIAL_OWNER_INDIVIDUAL' | 'CONTROL_PERSON';
}

export namespace AccountHolderEntity {
  /**
   * Individual's current address
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
 * Response body for creating a new beneficial owner or replacing the control
 * person entity on an existing KYB account holder.
 */
export interface EntityCreateResponse {
  /**
   * Globally unique identifier for the entity
   */
  token: string;

  /**
   * Globally unique identifier for the account holder
   */
  account_holder_token: string;

  /**
   * Timestamp of when the entity was created
   */
  created: string;

  /**
   * A list of documents required for the entity to be approved
   */
  required_documents: Array<AccountHoldersAPI.RequiredDocument>;

  /**
   * Entity verification status
   */
  status: 'ACCEPTED' | 'INACTIVE' | 'PENDING_REVIEW' | 'REJECTED';

  /**
   * Reason for the evaluation status
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
}

export interface EntityCreateParams {
  /**
   * Individual's current address - PO boxes, UPS drops, and FedEx drops are not
   * acceptable; APO/FPO are acceptable. Only USA addresses are currently supported.
   */
  address: EntityCreateParams.Address;

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

  /**
   * The type of entity to create on the account holder
   */
  type: 'BENEFICIAL_OWNER_INDIVIDUAL' | 'CONTROL_PERSON';
}

export namespace EntityCreateParams {
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

export interface EntityDeleteParams {
  /**
   * Globally unique identifier for the account holder.
   */
  account_holder_token: string;
}

export declare namespace Entities {
  export {
    type AccountHolderEntity as AccountHolderEntity,
    type EntityCreateResponse as EntityCreateResponse,
    type EntityCreateParams as EntityCreateParams,
    type EntityDeleteParams as EntityDeleteParams,
  };
}
