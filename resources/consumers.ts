// File generated from our OpenAPI spec by Stainless.
import * as Core from '../core';

export class Consumers extends Core.APIResource {
  /**
   * Enroll a new account into the program managed by the API key. This endpoint runs the candidate enrollment through the Customer Identification Program (CIP) and returns an `account_token` if successful. `street1` and `zipcode` will be used to perform address verification if authorization requests include a billing address. It's important to ensure this address is kept current to avoid possible declines.
   */
  enroll(
    body: ConsumerEnrollParams,
    options?: Core.RequestOptions,
  ): Promise<Core.APIResponse<ConsumersEnrollResponse>> {
    return this.post('/enroll/consumer', { body, ...options });
  }
}

export interface ConsumersEnrollResponse {
  data?: ConsumersEnrollResponse.Data;
}

export namespace ConsumersEnrollResponse {
  export interface Data {
    /**
     * Globally unique identifier for the account. This won't be return on KYC failure.
     */
    account_token?: string;

    kyc?: Data.KYC;

    /**
     * Result types: * `ACCEPTED` - KYC passed. * `REJECTED` - KYC failed.
     */
    result?: 'ACCEPTED' | 'REJECTED';
  }

  export namespace Data {
    export interface KYC {
      failure_reasons?: Array<
        | 'ADDRESS_VERIFICATION_FAILURE'
        | 'AGE_THRESHOLD_FAILURE'
        | 'BLOCKLIST_ALERT_FAILURE'
        | 'DOB_VERIFICATION_FAILURE'
        | 'OTHER_VERIFICATION_FAILURE'
        | 'NAME_VERIFICATION_FAILURE'
        | 'PHONE_VERIFICATION_FAILURE'
        | 'RISK_THRESHOLD_FAILURE'
        | 'ID_VERIFICATION_FAILURE'
        | 'COMPLETE_VERIFICATION_FAILURE'
      >;

      success?: boolean;
    }
  }
}

export interface ConsumerEnrollParams {
  /**
   * Date of birth, as an ISO 8601 date.
   */
  dob: string;

  /**
   * If utilizing Lithic for chargeback processing, this customer email address may be used to communicate dispute status and resolution.
   */
  email: string;

  /**
   * Customer's first name.
   */
  first_name: string;

  /**
   * An ISO 8601 timestamp at which precomputed KYC was completed. The field is required only if run_kyc is set to false. UTC time zone.
   */
  kyc_passed_timestamp: string;

  /**
   * Customer's surname (family name).
   */
  last_name: string;

  /**
   * Customer's phone number in E.164 format. This may improve the chances of a positive identity match and successful API response.
   */
  phone_number: string;

  /**
   * Full-nine Social Security Number (SSN) with or without hyphens. Required for identity verification and compliance with US banking regulations.
   */
  ssn: string;

  /**
   * Valid USPS routable address.
   */
  street1: string;

  /**
   * An ISO 8601 timestamp at which Lithic's terms of service were accepted by customer. UTC time zone.
   */
  tos_timestamp: string;

  /**
   * Postal code.
   */
  zipcode: string;

  /**
   * Specifies the KYC workflow to run on the person for which the account is being created. Review the KYC Type enumeration section for more information. KYC types: * `BASIC` - Lithic Basic-tier KYC **[BETA]**. Offers simple identity verification with no yellow-path remediation or document upload. * `PRECHECKED` - Bypass Lithic KYC. Only usable by customers with KYC processes approved by Lithic.
   */
  kyc_type?: 'BASIC' | 'PRECHECKED';

  /**
   * Unit or apartment number (if applicable).
   */
  street2?: string;
}
