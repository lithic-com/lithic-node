// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { getRequiredHeader, HeadersLike } from '../internal/headers';
import { APIResource } from '../core/resource';
import * as AccountHoldersAPI from './account-holders';
import { Webhook } from 'standardwebhooks';
import * as BookTransfersAPI from './book-transfers';
import * as DisputesAPI from './disputes';
import * as DisputesV2API from './disputes-v2';
import * as ExternalPaymentsAPI from './external-payments';
import * as FundingEventsAPI from './funding-events';
import * as InternalTransactionAPI from './internal-transaction';
import * as ManagementOperationsAPI from './management-operations';
import * as PaymentsAPI from './payments';
import * as Shared from './shared';
import * as TokenizationsAPI from './tokenizations';
import * as ExternalBankAccountsAPI from './external-bank-accounts/external-bank-accounts';
import * as FinancialAccountsAPI from './financial-accounts/financial-accounts';
import * as LoanTapesAPI from './financial-accounts/loan-tapes';
import * as ReportsAPI from './reports/reports';
import * as ThreeDSAPI from './three-ds/three-ds';
import * as TransactionsAPI from './transactions/transactions';
import * as BacktestsAPI from './auth-rules/v2/backtests';
import * as StatementsAPI from './financial-accounts/statements/statements';
import * as EnhancedCommercialDataAPI from './transactions/events/enhanced-commercial-data';

export class Webhooks extends APIResource {
  /**
   * Validates that the given payload was sent by Lithic and parses the payload.
   */
  unwrap(
    payload: string,
    headers: HeadersLike,
    secret: string | undefined | null = this._client.webhookSecret,
  ): Object {
    this.verifySignature(payload, headers, secret);
    return JSON.parse(payload);
  }

  /**
   * Validates that the given payload was sent by Lithic and parses the payload as a typed webhook event.
   */
  parse(
    body: string,
    { headers, secret }: { headers: Record<string, string>; secret?: string },
  ): ParsedWebhookEvent {
    if (headers !== undefined) {
      const secretStr: string | null = secret === undefined ? this._client.webhookSecret : secret;
      if (secretStr === null) throw new Error('Webhook secret must not be null in order to unwrap');
      this.verifySignature(body, headers, secretStr);
    }
    return JSON.parse(body) as ParsedWebhookEvent;
  }

  /**
   * Parses the payload without validating the signature.
   * WARNING: This is unsafe and should only be used for testing or if you have already validated the signature.
   */
  parseUnsafe(body: string): ParsedWebhookEvent {
    return JSON.parse(body) as ParsedWebhookEvent;
  }

  /**
   * Validates whether or not the webhook payload was sent by Lithic.
   *
   * An error will be raised if the webhook payload was not sent by Lithic.
   */
  verifySignature(
    body: string,
    headers: HeadersLike,
    secret: string | undefined | null = this._client.webhookSecret,
  ): void {
    const secretStr: string | null = secret === undefined ? this._client.webhookSecret : secret;
    if (secretStr === null) {
      throw new Error(
        "The webhook secret must either be set using the env var, LITHIC_WEBHOOK_SECRET, on the client class, Lithic({ webhook_secret: '123' }), or passed to this function",
      );
    }
    const wh = new Webhook(secretStr);
    // Convert HeadersLike to Record<string, string> for standardwebhooks
    const headersRecord: Record<string, string> = {
      'webhook-id': getRequiredHeader(headers, 'webhook-id'),
      'webhook-timestamp': getRequiredHeader(headers, 'webhook-timestamp'),
      'webhook-signature': getRequiredHeader(headers, 'webhook-signature'),
    };
    wh.verify(body, headersRecord);
  }
}

export interface AccountHolderCreatedWebhookEvent {
  /**
   * The type of event that occurred.
   */
  event_type: 'account_holder.created';

  /**
   * The token of the account_holder that was created.
   */
  token?: string;

  /**
   * The token of the account that was created.
   */
  account_token?: string;

  /**
   * When the account_holder was created
   */
  created?: string;

  required_documents?: Array<AccountHoldersAPI.RequiredDocument>;

  /**
   * The status of the account_holder that was created.
   */
  status?: 'ACCEPTED' | 'PENDING_REVIEW';

  status_reason?: Array<string>;
}

/**
 * KYB payload for an updated account holder.
 */
export type AccountHolderUpdatedWebhookEvent =
  | AccountHolderUpdatedWebhookEvent.KYBPayload
  | AccountHolderUpdatedWebhookEvent.KYCPayload
  | AccountHolderUpdatedWebhookEvent.LegacyPayload;

export namespace AccountHolderUpdatedWebhookEvent {
  /**
   * KYB payload for an updated account holder.
   */
  export interface KYBPayload {
    /**
     * The token of the account_holder that was created.
     */
    token: string;

    /**
     * Original request to update the account holder.
     */
    update_request: KYBPayload.UpdateRequest;

    /**
     * The type of event that occurred.
     */
    event_type?: 'account_holder.updated';

    /**
     * A user provided id that can be used to link an account holder with an external
     * system
     */
    external_id?: string;

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

  export namespace KYBPayload {
    /**
     * Original request to update the account holder.
     */
    export interface UpdateRequest {
      /**
       * @deprecated Deprecated.
       */
      beneficial_owner_entities?: Array<AccountHoldersAPI.KYBBusinessEntity>;

      /**
       * You must submit a list of all direct and indirect individuals with 25% or more
       * ownership in the company. A maximum of 4 beneficial owners can be submitted. If
       * no individual owns 25% of the company you do not need to send beneficial owner
       * information. See
       * [FinCEN requirements](https://www.fincen.gov/sites/default/files/shared/CDD_Rev6.7_Sept_2017_Certificate.pdf)
       * (Section I) for more background on individuals that should be included.
       */
      beneficial_owner_individuals?: Array<UpdateRequest.BeneficialOwnerIndividual>;

      /**
       * Information for business for which the account is being opened and KYB is being
       * run.
       */
      business_entity?: AccountHoldersAPI.KYBBusinessEntity;

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
      control_person?: UpdateRequest.ControlPerson;
    }

    export namespace UpdateRequest {
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
    }
  }

  /**
   * KYC payload for an updated account holder.
   */
  export interface KYCPayload {
    /**
     * The token of the account_holder that was created.
     */
    token: string;

    /**
     * Original request to update the account holder.
     */
    update_request: KYCPayload.UpdateRequest;

    /**
     * The type of event that occurred.
     */
    event_type?: 'account_holder.updated';

    /**
     * A user provided id that can be used to link an account holder with an external
     * system
     */
    external_id?: string;
  }

  export namespace KYCPayload {
    /**
     * Original request to update the account holder.
     */
    export interface UpdateRequest {
      /**
       * Information on the individual for whom the account is being opened and KYC is
       * being run.
       */
      individual?: UpdateRequest.Individual;
    }

    export namespace UpdateRequest {
      /**
       * Information on the individual for whom the account is being opened and KYC is
       * being run.
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
    }
  }

  /**
   * Legacy payload for an updated account holder.
   */
  export interface LegacyPayload {
    /**
     * The token of the account_holder that was created.
     */
    token: string;

    /**
     * If applicable, represents the business account token associated with the
     * account_holder.
     */
    business_account_token?: string | null;

    /**
     * When the account_holder updated event was created
     */
    created?: string;

    /**
     * If updated, the newly updated email associated with the account_holder otherwise
     * the existing email is provided.
     */
    email?: string;

    /**
     * The type of event that occurred.
     */
    event_type?: 'account_holder.updated';

    /**
     * If applicable, represents the external_id associated with the account_holder.
     */
    external_id?: string | null;

    /**
     * If applicable, represents the account_holder's first name.
     */
    first_name?: string;

    /**
     * If applicable, represents the account_holder's last name.
     */
    last_name?: string;

    /**
     * If applicable, represents the account_holder's business name.
     */
    legal_business_name?: string;

    /**
     * If updated, the newly updated phone_number associated with the account_holder
     * otherwise the existing phone_number is provided.
     */
    phone_number?: string;
  }
}

export interface AccountHolderVerificationWebhookEvent {
  /**
   * The type of event that occurred.
   */
  event_type: 'account_holder.verification';

  /**
   * The token of the account_holder being verified.
   */
  token?: string;

  /**
   * The token of the account being verified.
   */
  account_token?: string;

  /**
   * When the account_holder verification status was updated
   */
  created?: string;

  /**
   * The status of the account_holder that was created
   */
  status?: 'ACCEPTED' | 'PENDING_REVIEW' | 'REJECTED';

  status_reasons?: Array<string>;
}

export interface AccountHolderDocumentUpdatedWebhookEvent {
  /**
   * The type of event that occurred.
   */
  event_type: 'account_holder_document.updated';

  /**
   * The token of the account holder document
   */
  token?: string;

  /**
   * The token of the account_holder that the document belongs to
   */
  account_holder_token?: string;

  /**
   * When the account_holder was created
   */
  created?: string;

  /**
   * Type of documentation to be submitted for verification of an account holder
   */
  document_type?:
    | 'DRIVERS_LICENSE'
    | 'PASSPORT'
    | 'PASSPORT_CARD'
    | 'EIN_LETTER'
    | 'TAX_RETURN'
    | 'OPERATING_AGREEMENT'
    | 'CERTIFICATE_OF_FORMATION'
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
   * The token of the entity that the document belongs to
   */
  entity_token?: string;

  required_document_uploads?: Array<AccountHolderDocumentUpdatedWebhookEvent.RequiredDocumentUpload>;
}

export namespace AccountHolderDocumentUpdatedWebhookEvent {
  /**
   * A document upload that belongs to the overall account holder document
   */
  export interface RequiredDocumentUpload {
    /**
     * The token of the document upload
     */
    token?: string;

    accepted_entity_status_reasons?: Array<string>;

    /**
     * When the document upload was created
     */
    created?: string;

    /**
     * The type of image that was uploaded
     */
    image_type?: 'FRONT' | 'BACK';

    rejected_entity_status_reasons?: Array<string>;

    /**
     * The status of the document upload
     */
    status?: 'ACCEPTED' | 'REJECTED' | 'PENDING_UPLOAD' | 'UPLOADED' | 'PARTIAL_APPROVAL';

    status_reasons?: Array<string>;

    /**
     * When the document upload was last updated
     */
    updated?: string;
  }
}

/**
 * The Auth Stream Access request payload that was sent to the ASA responder.
 */
export interface AsaRequestWebhookEvent {
  /**
   * The provisional transaction group uuid associated with the authorization
   */
  token: string;

  /**
   * Fee (in cents) assessed by the merchant and paid for by the cardholder. Will be
   * zero if no fee is assessed. Rebates may be transmitted as a negative value to
   * indicate credited fees.
   */
  acquirer_fee: number;

  /**
   * Authorization amount of the transaction (in cents), including any acquirer fees.
   * The contents of this field are identical to `authorization_amount`.
   */
  amount: number;

  /**
   * The base transaction amount (in cents) plus the acquirer fee field. This is the
   * amount the issuer should authorize against unless the issuer is paying the
   * acquirer fee on behalf of the cardholder.
   */
  authorization_amount: number;

  avs: AsaRequestWebhookEvent.Avs;

  /**
   * Card object in ASA
   */
  card: AsaRequestWebhookEvent.Card;

  /**
   * 3-character alphabetic ISO 4217 code for cardholder's billing currency.
   */
  cardholder_currency: string;

  /**
   * The portion of the transaction requested as cash back by the cardholder, and
   * does not include any acquirer fees. The amount field includes the purchase
   * amount, the requested cash back amount, and any acquirer fees.
   *
   * If no cash back was requested, the value of this field will be 0, and the field
   * will always be present.
   */
  cash_amount: number;

  /**
   * Date and time when the transaction first occurred in UTC.
   */
  created: string;

  merchant: Shared.Merchant;

  /**
   * The amount that the merchant will receive, denominated in `merchant_currency`
   * and in the smallest currency unit. Note the amount includes `acquirer_fee`,
   * similar to `authorization_amount`. It will be different from
   * `authorization_amount` if the merchant is taking payment in a different
   * currency.
   */
  merchant_amount: number;

  /**
   * 3-character alphabetic ISO 4217 code for the local currency of the transaction.
   */
  merchant_currency: string;

  /**
   * Amount (in cents) of the transaction that has been settled, including any
   * acquirer fees
   */
  settled_amount: number;

  /**
   * The type of authorization request that this request is for. Note that
   * `CREDIT_AUTHORIZATION` and `FINANCIAL_CREDIT_AUTHORIZATION` is only available to
   * users with credit decisioning via ASA enabled.
   */
  status:
    | 'AUTHORIZATION'
    | 'CREDIT_AUTHORIZATION'
    | 'FINANCIAL_AUTHORIZATION'
    | 'FINANCIAL_CREDIT_AUTHORIZATION'
    | 'BALANCE_INQUIRY';

  /**
   * The entity that initiated the transaction.
   */
  transaction_initiator: 'CARDHOLDER' | 'MERCHANT' | 'UNKNOWN';

  account_type?: 'CHECKING' | 'SAVINGS';

  cardholder_authentication?: TransactionsAPI.CardholderAuthentication;

  /**
   * Deprecated, use `cash_amount`.
   */
  cashback?: number;

  /**
   * If the transaction was requested in a currency other than the settlement
   * currency, this field will be populated to indicate the rate used to translate
   * the merchant_amount to the amount (i.e., `merchant_amount` x `conversion_rate` =
   * `amount`). Note that the `merchant_amount` is in the local currency and the
   * amount is in the settlement currency.
   */
  conversion_rate?: number;

  /**
   * The event token associated with the authorization. This field is only set for
   * programs enrolled into the beta.
   */
  event_token?: string;

  /**
   * Optional Object containing information if the Card is a part of a Fleet managed
   * program
   */
  fleet_info?: AsaRequestWebhookEvent.FleetInfo | null;

  /**
   * The latest Authorization Challenge that was issued to the cardholder for this
   * merchant.
   */
  latest_challenge?: AsaRequestWebhookEvent.LatestChallenge;

  /**
   * Card network of the authorization.
   */
  network?: 'AMEX' | 'INTERLINK' | 'MAESTRO' | 'MASTERCARD' | 'UNKNOWN' | 'VISA';

  /**
   * Network-provided score assessing risk level associated with a given
   * authorization. Scores are on a range of 0-999, with 0 representing the lowest
   * risk and 999 representing the highest risk. For Visa transactions, where the raw
   * score has a range of 0-99, Lithic will normalize the score by multiplying the
   * raw score by 10x.
   */
  network_risk_score?: number | null;

  /**
   * Contains raw data provided by the card network, including attributes that
   * provide further context about the authorization. If populated by the network,
   * data is organized by Lithic and passed through without further modification.
   * Please consult the official network documentation for more details about these
   * values and how to use them. This object is only available to certain programs-
   * contact your Customer Success Manager to discuss enabling access.
   */
  network_specific_data?: AsaRequestWebhookEvent.NetworkSpecificData | null;

  pos?: AsaRequestWebhookEvent.Pos;

  token_info?: TransactionsAPI.TokenInfo | null;

  /**
   * Deprecated: approximate time-to-live for the authorization.
   */
  ttl?: string;
}

export namespace AsaRequestWebhookEvent {
  export interface Avs {
    /**
     * Cardholder address
     */
    address: string;

    /**
     * Lithic's evaluation result comparing the transaction's address data with the
     * cardholder KYC data if it exists. In the event Lithic does not have any
     * Cardholder KYC data, or the transaction does not contain any address data,
     * NOT_PRESENT will be returned
     */
    address_on_file_match: 'MATCH' | 'MATCH_ADDRESS_ONLY' | 'MATCH_ZIP_ONLY' | 'MISMATCH' | 'NOT_PRESENT';

    /**
     * Cardholder ZIP code
     */
    zipcode: string;
  }

  /**
   * Card object in ASA
   */
  export interface Card {
    /**
     * Globally unique identifier for the card.
     */
    token?: string;

    /**
     * Hostname of card’s locked merchant (will be empty if not applicable)
     */
    hostname?: string;

    /**
     * Last four digits of the card number
     */
    last_four?: string;

    /**
     * Customizable name to identify the card. We recommend against using this field to
     * store JSON data as it can cause unexpected behavior.
     */
    memo?: string;

    /**
     * Amount (in cents) to limit approved authorizations. Purchase requests above the
     * spend limit will be declined (refunds and credits will be approved).
     *
     * Note that while spend limits are enforced based on authorized and settled volume
     * on a card, they are not recommended to be used for balance or
     * reconciliation-level accuracy. Spend limits also cannot block force posted
     * charges (i.e., when a merchant sends a clearing message without a prior
     * authorization).
     */
    spend_limit?: number;

    /**
     * Note that to support recurring monthly payments, which can occur on different
     * day every month, the time window we consider for MONTHLY velocity starts 6 days
     * after the current calendar date one month prior.
     */
    spend_limit_duration?: 'ANNUALLY' | 'FOREVER' | 'MONTHLY' | 'TRANSACTION';

    state?: 'CLOSED' | 'OPEN' | 'PAUSED' | 'PENDING_ACTIVATION' | 'PENDING_FULFILLMENT';

    type?: 'SINGLE_USE' | 'MERCHANT_LOCKED' | 'UNLOCKED' | 'PHYSICAL' | 'DIGITAL_WALLET' | 'VIRTUAL';
  }

  /**
   * Optional Object containing information if the Card is a part of a Fleet managed
   * program
   */
  export interface FleetInfo {
    /**
     * Code indicating what the driver was prompted to enter at time of purchase. This
     * is configured at a program level and is a static configuration, and does not
     * change on a request to request basis
     */
    fleet_prompt_code: 'NO_PROMPT' | 'VEHICLE_NUMBER' | 'DRIVER_NUMBER';

    /**
     * Code indicating which restrictions, if any, there are on purchase. This is
     * configured at a program level and is a static configuration, and does not change
     * on a request to request basis
     */
    fleet_restriction_code: 'NO_RESTRICTIONS' | 'FUEL_ONLY';

    /**
     * Number representing the driver
     */
    driver_number?: string | null;

    /**
     * Number associated with the vehicle
     */
    vehicle_number?: string | null;
  }

  /**
   * The latest Authorization Challenge that was issued to the cardholder for this
   * merchant.
   */
  export interface LatestChallenge {
    /**
     * The phone number used for sending Authorization Challenge SMS.
     */
    phone_number: string;

    /**
     * The status of the Authorization Challenge
     *
     * - `COMPLETED` - Challenge was successfully completed by the cardholder
     * - `PENDING` - Challenge is still open
     * - `EXPIRED` - Challenge has expired without being completed
     * - `ERROR` - There was an error processing the challenge
     */
    status: 'COMPLETED' | 'PENDING' | 'EXPIRED' | 'ERROR';

    /**
     * The date and time when the Authorization Challenge was completed in UTC. Present
     * only if the status is `COMPLETED`.
     */
    completed_at?: string;
  }

  /**
   * Contains raw data provided by the card network, including attributes that
   * provide further context about the authorization. If populated by the network,
   * data is organized by Lithic and passed through without further modification.
   * Please consult the official network documentation for more details about these
   * values and how to use them. This object is only available to certain programs-
   * contact your Customer Success Manager to discuss enabling access.
   */
  export interface NetworkSpecificData {
    mastercard?: NetworkSpecificData.Mastercard | null;

    visa?: NetworkSpecificData.Visa | null;
  }

  export namespace NetworkSpecificData {
    export interface Mastercard {
      /**
       * Indicates the electronic commerce security level and UCAF collection.
       */
      ecommerce_security_level_indicator?: string | null;

      /**
       * The On-behalf Service performed on the transaction and the results. Contains all
       * applicable, on-behalf service results that were performed on a given
       * transaction.
       */
      on_behalf_service_result?: Array<Mastercard.OnBehalfServiceResult> | null;

      /**
       * Indicates the type of additional transaction purpose.
       */
      transaction_type_identifier?: string | null;
    }

    export namespace Mastercard {
      export interface OnBehalfServiceResult {
        /**
         * Indicates the results of the service processing.
         */
        result_1: string;

        /**
         * Identifies the results of the service processing.
         */
        result_2: string;

        /**
         * Indicates the service performed on the transaction.
         */
        service: string;
      }
    }

    export interface Visa {
      /**
       * Identifies the purpose or category of a transaction, used to classify and
       * process transactions according to Visa’s rules.
       */
      business_application_identifier?: string | null;
    }
  }

  export interface Pos {
    /**
     * POS > Entry Mode object in ASA
     */
    entry_mode?: Pos.EntryMode;

    terminal?: Pos.Terminal;
  }

  export namespace Pos {
    /**
     * POS > Entry Mode object in ASA
     */
    export interface EntryMode {
      /**
       * Card Presence Indicator
       */
      card?: 'PRESENT' | 'NOT_PRESENT' | 'UNKNOWN';

      /**
       * Cardholder Presence Indicator
       */
      cardholder?:
        | 'DEFERRED_BILLING'
        | 'ELECTRONIC_ORDER'
        | 'INSTALLMENT'
        | 'MAIL_ORDER'
        | 'NOT_PRESENT'
        | 'PRESENT'
        | 'REOCCURRING'
        | 'TELEPHONE_ORDER'
        | 'UNKNOWN';

      /**
       * Method of entry for the PAN
       */
      pan?:
        | 'AUTO_ENTRY'
        | 'BAR_CODE'
        | 'CONTACTLESS'
        | 'ECOMMERCE'
        | 'ERROR_KEYED'
        | 'ERROR_MAGNETIC_STRIPE'
        | 'ICC'
        | 'KEY_ENTERED'
        | 'MAGNETIC_STRIPE'
        | 'MANUAL'
        | 'OCR'
        | 'SECURE_CARDLESS'
        | 'UNSPECIFIED'
        | 'UNKNOWN'
        | 'CREDENTIAL_ON_FILE';

      /**
       * Indicates whether the cardholder entered the PIN. True if the PIN was entered.
       */
      pin_entered?: boolean;
    }

    export interface Terminal {
      /**
       * True if a clerk is present at the sale.
       */
      attended: boolean;

      /**
       * True if the terminal is capable of retaining the card.
       */
      card_retention_capable: boolean;

      /**
       * True if the sale was made at the place of business (vs. mobile).
       */
      on_premise: boolean;

      /**
       * The person that is designated to swipe the card
       */
      operator: 'ADMINISTRATIVE' | 'CARDHOLDER' | 'CARD_ACCEPTOR' | 'UNKNOWN';

      /**
       * True if the terminal is capable of partial approval. Partial approval is when
       * part of a transaction is approved and another payment must be used for the
       * remainder. Example scenario: A $40 transaction is attempted on a prepaid card
       * with a $25 balance. If partial approval is enabled, $25 can be authorized, at
       * which point the POS will prompt the user for an additional payment of $15.
       */
      partial_approval_capable: boolean;

      /**
       * Status of whether the POS is able to accept PINs
       */
      pin_capability: 'CAPABLE' | 'INOPERATIVE' | 'NOT_CAPABLE' | 'UNSPECIFIED';

      /**
       * POS Type
       */
      type:
        | 'ADMINISTRATIVE'
        | 'ATM'
        | 'AUTHORIZATION'
        | 'COUPON_MACHINE'
        | 'DIAL_TERMINAL'
        | 'ECOMMERCE'
        | 'ECR'
        | 'FUEL_MACHINE'
        | 'HOME_TERMINAL'
        | 'MICR'
        | 'OFF_PREMISE'
        | 'PAYMENT'
        | 'PDA'
        | 'PHONE'
        | 'POINT'
        | 'POS_TERMINAL'
        | 'PUBLIC_UTILITY'
        | 'SELF_SERVICE'
        | 'TELEVISION'
        | 'TELLER'
        | 'TRAVELERS_CHECK_MACHINE'
        | 'VENDING'
        | 'VOICE'
        | 'UNKNOWN';

      /**
       * Uniquely identifies a terminal at the card acceptor location of acquiring
       * institutions or merchant POS Systems. Left justified with trailing spaces.
       */
      acceptor_terminal_id?: string | null;
    }
  }
}

/**
 * A webhook for tokenization decisioning sent to the customer's responder endpoint
 */
export interface TokenizationDecisioningRequestWebhookEvent {
  /**
   * Unique identifier for the user tokenizing a card
   */
  account_token: string;

  /**
   * Unique identifier for the card being tokenized
   */
  card_token: string;

  /**
   * Indicate when the request was received from Mastercard or Visa
   */
  created: string;

  /**
   * The name of this event
   */
  event_type: 'digital_wallet.tokenization_approval_request';

  /**
   * Whether Lithic decisioned on the token, and if so, what the decision was.
   * APPROVED/VERIFICATION_REQUIRED/DENIED.
   */
  issuer_decision: 'APPROVED' | 'DENIED' | 'VERIFICATION_REQUIRED';

  /**
   * The channel through which the tokenization was made.
   */
  tokenization_channel: 'DIGITAL_WALLET' | 'MERCHANT';

  /**
   * Unique identifier for the digital wallet token attempt
   */
  tokenization_token: string;

  wallet_decisioning_info: TokenizationsAPI.WalletDecisioningInfo;

  device?: TokenizationsAPI.Device;

  /**
   * Contains the metadata for the digital wallet being tokenized.
   */
  digital_wallet_token_metadata?: TokenizationsAPI.DigitalWalletTokenMetadata;

  /**
   * The source of the tokenization.
   */
  tokenization_source?:
    | 'ACCOUNT_ON_FILE'
    | 'CONTACTLESS_TAP'
    | 'MANUAL_PROVISION'
    | 'PUSH_PROVISION'
    | 'TOKEN'
    | 'UNKNOWN';
}

export interface AuthRulesBacktestReportCreatedWebhookEvent extends BacktestsAPI.BacktestResults {
  /**
   * The type of event that occurred.
   */
  event_type: 'auth_rules.backtest_report.created';
}

export interface BalanceUpdatedWebhookEvent {
  data: Array<FinancialAccountsAPI.FinancialAccountBalance>;

  /**
   * The type of event that occurred.
   */
  event_type: 'balance.updated';
}

/**
 * Book transfer transaction
 */
export interface BookTransferTransactionCreatedWebhookEvent extends BookTransfersAPI.BookTransferResponse {
  /**
   * The type of event that occurred.
   */
  event_type: 'book_transfer_transaction.created';
}

/**
 * Book transfer transaction
 */
export interface BookTransferTransactionUpdatedWebhookEvent extends BookTransfersAPI.BookTransferResponse {
  /**
   * The type of event that occurred.
   */
  event_type: 'book_transfer_transaction.updated';
}

export interface CardCreatedWebhookEvent {
  /**
   * The token of the card that was created.
   */
  card_token: string;

  /**
   * The type of event that occurred.
   */
  event_type: 'card.created';

  /**
   * The token of the card that was replaced, if the new card is a replacement card.
   */
  replacement_for?: string | null;
}

export interface CardConvertedWebhookEvent {
  /**
   * The token of the card that was created.
   */
  card_token: string;

  /**
   * The type of event that occurred.
   */
  event_type: 'card.converted';
}

export interface CardRenewedWebhookEvent {
  /**
   * The type of event that occurred.
   */
  event_type: 'card.renewed';

  /**
   * The token of the card that was renewed.
   */
  card_token?: string;

  /**
   * The new expiration month of the card.
   */
  exp_month?: string;

  /**
   * The new expiration year of the card.
   */
  exp_year?: string;

  /**
   * The previous expiration month of the card.
   */
  previous_exp_month?: string;

  /**
   * The previous expiration year of the card.
   */
  previous_exp_year?: string;
}

export interface CardReissuedWebhookEvent {
  /**
   * The type of event that occurred.
   */
  event_type: 'card.reissued';

  /**
   * The token of the card that was reissued.
   */
  card_token?: string;
}

export interface CardShippedWebhookEvent {
  /**
   * The token of the bulk order associated with this card shipment, if applicable.
   */
  bulk_order_token: string | null;

  /**
   * The token of the card that was shipped.
   */
  card_token: string;

  /**
   * The type of event that occurred.
   */
  event_type: 'card.shipped';

  /**
   * The specific shipping method used to ship the card.
   */
  shipping_method:
    | 'Ex-US expedited with tracking'
    | 'Ex-US standard with tracking'
    | 'Ex-US standard without tracking'
    | 'FedEx 2 days'
    | 'FedEx express'
    | 'FedEx overnight'
    | 'USPS priority'
    | 'USPS with tracking'
    | 'USPS without tracking envelope'
    | 'USPS without tracking envelope non-machine'
    | 'USPS without tracking flat';

  /**
   * The tracking number of the shipment.
   */
  tracking_number: string | null;
}

export interface CardTransactionUpdatedWebhookEvent extends TransactionsAPI.Transaction {
  /**
   * The type of event that occurred.
   */
  event_type: 'card_transaction.updated';
}

export interface CardTransactionEnhancedDataCreatedWebhookEvent
  extends EnhancedCommercialDataAPI.EnhancedData {
  /**
   * The type of event that occurred.
   */
  event_type: 'card_transaction.enhanced_data.created';
}

export interface CardTransactionEnhancedDataUpdatedWebhookEvent
  extends EnhancedCommercialDataAPI.EnhancedData {
  /**
   * The type of event that occurred.
   */
  event_type: 'card_transaction.enhanced_data.updated';
}

export interface DigitalWalletTokenizationApprovalRequestWebhookEvent {
  /**
   * Unique identifier for the user tokenizing a card
   */
  account_token: string;

  /**
   * Unique identifier for the card being tokenized
   */
  card_token: string;

  /**
   * Indicate when the request was received from Mastercard or Visa
   */
  created: string;

  /**
   * Contains the metadata for the customer tokenization decision.
   */
  customer_tokenization_decision: DigitalWalletTokenizationApprovalRequestWebhookEvent.CustomerTokenizationDecision | null;

  /**
   * The name of this event
   */
  event_type: 'digital_wallet.tokenization_approval_request';

  /**
   * Whether Lithic decisioned on the token, and if so, what the decision was.
   * APPROVED/VERIFICATION_REQUIRED/DENIED.
   */
  issuer_decision: 'APPROVED' | 'DENIED' | 'VERIFICATION_REQUIRED';

  /**
   * The channel through which the tokenization was made.
   */
  tokenization_channel: 'DIGITAL_WALLET' | 'MERCHANT';

  /**
   * Unique identifier for the digital wallet token attempt
   */
  tokenization_token: string;

  wallet_decisioning_info: TokenizationsAPI.WalletDecisioningInfo;

  device?: TokenizationsAPI.Device;

  /**
   * Contains the metadata for the digital wallet being tokenized.
   */
  digital_wallet_token_metadata?: TokenizationsAPI.DigitalWalletTokenMetadata;

  /**
   * Results from rules that were evaluated for this tokenization
   */
  rule_results?: Array<TokenizationsAPI.TokenizationRuleResult>;

  /**
   * List of reasons why the tokenization was declined
   */
  tokenization_decline_reasons?: Array<TokenizationsAPI.TokenizationDeclineReason>;

  /**
   * The source of the tokenization.
   */
  tokenization_source?:
    | 'ACCOUNT_ON_FILE'
    | 'CONTACTLESS_TAP'
    | 'MANUAL_PROVISION'
    | 'PUSH_PROVISION'
    | 'TOKEN'
    | 'UNKNOWN';

  /**
   * List of reasons why two-factor authentication was required
   */
  tokenization_tfa_reasons?: Array<TokenizationsAPI.TokenizationTfaReason>;
}

export namespace DigitalWalletTokenizationApprovalRequestWebhookEvent {
  /**
   * Contains the metadata for the customer tokenization decision.
   */
  export interface CustomerTokenizationDecision {
    /**
     * The outcome of the customer's decision
     */
    outcome:
      | 'APPROVED'
      | 'DECLINED'
      | 'ERROR'
      | 'INVALID_RESPONSE'
      | 'REQUIRE_ADDITIONAL_AUTHENTICATION'
      | 'TIMEOUT';

    /**
     * The customer's subscribed URL
     */
    responder_url: string;

    /**
     * Time in ms it took for the customer's URL to respond
     */
    latency?: string;

    /**
     * The response code that the customer provided
     */
    response_code?: string;
  }
}

export interface DigitalWalletTokenizationResultWebhookEvent {
  /**
   * Account token
   */
  account_token: string;

  /**
   * Card token
   */
  card_token: string;

  /**
   * Created date
   */
  created: string;

  /**
   * The type of event that occurred.
   */
  event_type: 'digital_wallet.tokenization_result';

  /**
   * The result of the tokenization request.
   */
  tokenization_result_details: DigitalWalletTokenizationResultWebhookEvent.TokenizationResultDetails;

  /**
   * Tokenization token
   */
  tokenization_token: string;
}

export namespace DigitalWalletTokenizationResultWebhookEvent {
  /**
   * The result of the tokenization request.
   */
  export interface TokenizationResultDetails {
    /**
     * Lithic's tokenization decision.
     */
    issuer_decision: string;

    /**
     * List of reasons why the tokenization was declined
     */
    tokenization_decline_reasons: Array<
      | 'ACCOUNT_SCORE_1'
      | 'ALL_WALLET_DECLINE_REASONS_PRESENT'
      | 'CARD_EXPIRY_MONTH_MISMATCH'
      | 'CARD_EXPIRY_YEAR_MISMATCH'
      | 'CARD_INVALID_STATE'
      | 'CUSTOMER_RED_PATH'
      | 'CVC_MISMATCH'
      | 'DEVICE_SCORE_1'
      | 'GENERIC_DECLINE'
      | 'INVALID_CUSTOMER_RESPONSE'
      | 'NETWORK_FAILURE'
      | 'WALLET_RECOMMENDED_DECISION_RED'
    >;

    /**
     * The customer's tokenization decision if applicable.
     */
    customer_decision?: string | null;

    /**
     * Results from rules that were evaluated for this tokenization
     */
    rule_results?: Array<TokenizationsAPI.TokenizationRuleResult>;

    /**
     * An RFC 3339 timestamp indicating when the tokenization succeeded.
     */
    token_activated_date_time?: string | null;

    /**
     * List of reasons why two-factor authentication was required
     */
    tokenization_tfa_reasons?: Array<TokenizationsAPI.TokenizationTfaReason>;

    /**
     * The wallet's recommended decision.
     */
    wallet_decision?: string | null;
  }
}

export interface DigitalWalletTokenizationTwoFactorAuthenticationCodeWebhookEvent {
  /**
   * Unique identifier for the user tokenizing a card
   */
  account_token: string;

  activation_method: DigitalWalletTokenizationTwoFactorAuthenticationCodeWebhookEvent.ActivationMethod;

  /**
   * Authentication code to provide to the user tokenizing a card.
   */
  authentication_code: string;

  /**
   * Unique identifier for the card being tokenized
   */
  card_token: string;

  /**
   * Indicate when the request was received from Mastercard or Visa
   */
  created: string;

  /**
   * The type of event that occurred.
   */
  event_type: 'digital_wallet.tokenization_two_factor_authentication_code';

  /**
   * Unique identifier for the tokenization
   */
  tokenization_token: string;
}

export namespace DigitalWalletTokenizationTwoFactorAuthenticationCodeWebhookEvent {
  export interface ActivationMethod {
    /**
     * The communication method that the user has selected to use to receive the
     * authentication code. Supported Values: Sms = "TEXT_TO_CARDHOLDER_NUMBER". Email
     * = "EMAIL_TO_CARDHOLDER_ADDRESS"
     */
    type: 'EMAIL_TO_CARDHOLDER_ADDRESS' | 'TEXT_TO_CARDHOLDER_NUMBER';

    /**
     * The location where the user wants to receive the authentication code. The format
     * depends on the ActivationMethod.Type field. If Type is Email, the Value will be
     * the email address. If the Type is Sms, the Value will be the phone number.
     */
    value: string;
  }
}

export interface DigitalWalletTokenizationTwoFactorAuthenticationCodeSentWebhookEvent {
  /**
   * Unique identifier for the user tokenizing a card
   */
  account_token: string;

  activation_method: DigitalWalletTokenizationTwoFactorAuthenticationCodeSentWebhookEvent.ActivationMethod;

  /**
   * Unique identifier for the card being tokenized
   */
  card_token: string;

  /**
   * Indicate when the request was received from Mastercard or Visa
   */
  created: string;

  /**
   * The type of event that occurred.
   */
  event_type: 'digital_wallet.tokenization_two_factor_authentication_code_sent';

  /**
   * Unique identifier for the tokenization
   */
  tokenization_token: string;
}

export namespace DigitalWalletTokenizationTwoFactorAuthenticationCodeSentWebhookEvent {
  export interface ActivationMethod {
    /**
     * The communication method that the user has selected to use to receive the
     * authentication code. Supported Values: Sms = "TEXT_TO_CARDHOLDER_NUMBER". Email
     * = "EMAIL_TO_CARDHOLDER_ADDRESS"
     */
    type: 'EMAIL_TO_CARDHOLDER_ADDRESS' | 'TEXT_TO_CARDHOLDER_NUMBER';

    /**
     * The location to which the authentication code was sent. The format depends on
     * the ActivationMethod.Type field. If Type is Email, the Value will be the email
     * address. If the Type is Sms, the Value will be the phone number.
     */
    value: string;
  }
}

export interface DigitalWalletTokenizationUpdatedWebhookEvent {
  /**
   * Account token
   */
  account_token: string;

  /**
   * Card token
   */
  card_token: string;

  /**
   * Created date
   */
  created: string;

  /**
   * The type of event that occurred.
   */
  event_type: 'digital_wallet.tokenization_updated';

  tokenization: TokenizationsAPI.Tokenization;
}

/**
 * Dispute.
 */
export interface DisputeUpdatedWebhookEvent extends DisputesAPI.Dispute {
  /**
   * The type of event that occurred.
   */
  event_type: 'dispute.updated';
}

/**
 * Dispute evidence.
 */
export interface DisputeEvidenceUploadFailedWebhookEvent extends DisputesAPI.DisputeEvidence {
  /**
   * The type of event that occurred.
   */
  event_type: 'dispute_evidence.upload_failed';
}

export interface ExternalBankAccountCreatedWebhookEvent extends ExternalBankAccountsAPI.ExternalBankAccount {
  /**
   * The type of event that occurred.
   */
  event_type: 'external_bank_account.created';
}

export interface ExternalBankAccountUpdatedWebhookEvent extends ExternalBankAccountsAPI.ExternalBankAccount {
  /**
   * The type of event that occurred.
   */
  event_type: 'external_bank_account.updated';
}

export interface ExternalPaymentCreatedWebhookEvent extends ExternalPaymentsAPI.ExternalPayment {
  /**
   * The type of event that occurred.
   */
  event_type: 'external_payment.created';
}

export interface ExternalPaymentUpdatedWebhookEvent extends ExternalPaymentsAPI.ExternalPayment {
  /**
   * The type of event that occurred.
   */
  event_type: 'external_payment.updated';
}

export interface FinancialAccountCreatedWebhookEvent extends FinancialAccountsAPI.FinancialAccount {
  /**
   * The type of event that occurred.
   */
  event_type: 'financial_account.created';
}

export interface FinancialAccountUpdatedWebhookEvent extends FinancialAccountsAPI.FinancialAccount {
  /**
   * The type of event that occurred.
   */
  event_type: 'financial_account.updated';
}

export interface FundingEventCreatedWebhookEvent extends FundingEventsAPI.FundingEvent {
  /**
   * The type of event that occurred.
   */
  event_type: 'funding_event.created';
}

export interface LoanTapeCreatedWebhookEvent extends LoanTapesAPI.LoanTape {
  /**
   * The type of event that occurred.
   */
  event_type: 'loan_tape.created';
}

export interface LoanTapeUpdatedWebhookEvent extends LoanTapesAPI.LoanTape {
  /**
   * The type of event that occurred.
   */
  event_type: 'loan_tape.updated';
}

export interface ManagementOperationCreatedWebhookEvent
  extends ManagementOperationsAPI.ManagementOperationTransaction {
  /**
   * The type of event that occurred.
   */
  event_type: 'management_operation.created';
}

export interface ManagementOperationUpdatedWebhookEvent
  extends ManagementOperationsAPI.ManagementOperationTransaction {
  /**
   * The type of event that occurred.
   */
  event_type: 'management_operation.updated';
}

export interface InternalTransactionCreatedWebhookEvent extends InternalTransactionAPI.InternalTransaction {
  /**
   * The type of event that occurred.
   */
  event_type: 'internal_transaction.created';
}

export interface InternalTransactionUpdatedWebhookEvent extends InternalTransactionAPI.InternalTransaction {
  /**
   * The type of event that occurred.
   */
  event_type: 'internal_transaction.updated';
}

export interface NetworkTotalCreatedWebhookEvent extends ReportsAPI.NetworkTotal {
  /**
   * The type of event that occurred.
   */
  event_type: 'network_total.created';
}

export interface NetworkTotalUpdatedWebhookEvent extends ReportsAPI.NetworkTotal {
  /**
   * The type of event that occurred.
   */
  event_type: 'network_total.updated';
}

/**
 * Payment transaction
 */
export interface PaymentTransactionCreatedWebhookEvent extends PaymentsAPI.Payment {
  /**
   * The type of event that occurred.
   */
  event_type: 'payment_transaction.created';
}

/**
 * Payment transaction
 */
export interface PaymentTransactionUpdatedWebhookEvent extends PaymentsAPI.Payment {
  /**
   * The type of event that occurred.
   */
  event_type: 'payment_transaction.updated';
}

export interface SettlementReportUpdatedWebhookEvent extends ReportsAPI.SettlementReport {
  /**
   * The type of event that occurred.
   */
  event_type: 'settlement_report.updated';
}

export interface StatementsCreatedWebhookEvent extends StatementsAPI.Statement {
  /**
   * The type of event that occurred.
   */
  event_type: 'statements.created';
}

/**
 * Represents a 3DS authentication
 */
export interface ThreeDSAuthenticationCreatedWebhookEvent extends ThreeDSAPI.ThreeDSAuthentication {
  /**
   * The type of event that occurred.
   */
  event_type: 'three_ds_authentication.created';
}

/**
 * Represents a 3DS authentication
 */
export interface ThreeDSAuthenticationUpdatedWebhookEvent extends ThreeDSAPI.ThreeDSAuthentication {
  /**
   * The type of event that occurred.
   */
  event_type: 'three_ds_authentication.updated';
}

export interface ThreeDSAuthenticationChallengeWebhookEvent {
  /**
   * Represents a 3DS authentication
   */
  authentication_object: ThreeDSAPI.ThreeDSAuthentication;

  /**
   * Represents a challenge object for 3DS authentication
   */
  challenge: ThreeDSAuthenticationChallengeWebhookEvent.Challenge;

  event_type: 'three_ds_authentication.challenge';
}

export namespace ThreeDSAuthenticationChallengeWebhookEvent {
  /**
   * Represents a challenge object for 3DS authentication
   */
  export interface Challenge {
    /**
     * The type of challenge method issued to the cardholder
     */
    challenge_method_type: 'OUT_OF_BAND';

    /**
     * ISO-8601 time at which the challenge expires
     */
    expiry_time: string;

    /**
     * ISO-8601 time at which the challenge has started
     */
    start_time: string;

    /**
     * Fully qualified app URL of the merchant app. This should be used to redirect the
     * cardholder back to the merchant app after completing an app-based challenge.
     * This URL will only be populated if the 3DS Requestor App is provided to the 3DS
     * SDK.
     */
    app_requestor_url?: string | null;
  }
}

export interface TokenizationApprovalRequestWebhookEvent {
  /**
   * Unique identifier for the user tokenizing a card
   */
  account_token: string;

  /**
   * Unique identifier for the card being tokenized
   */
  card_token: string;

  /**
   * Indicate when the request was received from Mastercard or Visa
   */
  created: string;

  /**
   * Contains the metadata for the customer tokenization decision.
   */
  customer_tokenization_decision: TokenizationApprovalRequestWebhookEvent.CustomerTokenizationDecision | null;

  /**
   * The name of this event
   */
  event_type: 'tokenization.approval_request';

  /**
   * Whether Lithic decisioned on the token, and if so, what the decision was.
   * APPROVED/VERIFICATION_REQUIRED/DENIED.
   */
  issuer_decision: 'APPROVED' | 'DENIED' | 'VERIFICATION_REQUIRED';

  /**
   * The channel through which the tokenization was made.
   */
  tokenization_channel: 'DIGITAL_WALLET' | 'MERCHANT';

  /**
   * Unique identifier for the digital wallet token attempt
   */
  tokenization_token: string;

  wallet_decisioning_info: TokenizationsAPI.WalletDecisioningInfo;

  device?: TokenizationsAPI.Device;

  /**
   * Contains the metadata for the digital wallet being tokenized.
   */
  digital_wallet_token_metadata?: TokenizationsAPI.DigitalWalletTokenMetadata;

  /**
   * Results from rules that were evaluated for this tokenization
   */
  rule_results?: Array<TokenizationsAPI.TokenizationRuleResult>;

  /**
   * List of reasons why the tokenization was declined
   */
  tokenization_decline_reasons?: Array<TokenizationsAPI.TokenizationDeclineReason>;

  /**
   * The source of the tokenization.
   */
  tokenization_source?:
    | 'ACCOUNT_ON_FILE'
    | 'CONTACTLESS_TAP'
    | 'MANUAL_PROVISION'
    | 'PUSH_PROVISION'
    | 'TOKEN'
    | 'UNKNOWN';

  /**
   * List of reasons why two-factor authentication was required
   */
  tokenization_tfa_reasons?: Array<TokenizationsAPI.TokenizationTfaReason>;
}

export namespace TokenizationApprovalRequestWebhookEvent {
  /**
   * Contains the metadata for the customer tokenization decision.
   */
  export interface CustomerTokenizationDecision {
    /**
     * The outcome of the customer's decision
     */
    outcome:
      | 'APPROVED'
      | 'DECLINED'
      | 'ERROR'
      | 'INVALID_RESPONSE'
      | 'REQUIRE_ADDITIONAL_AUTHENTICATION'
      | 'TIMEOUT';

    /**
     * The customer's subscribed URL
     */
    responder_url: string;

    /**
     * Time in ms it took for the customer's URL to respond
     */
    latency?: string;

    /**
     * The response code that the customer provided
     */
    response_code?: string;
  }
}

export interface TokenizationResultWebhookEvent {
  /**
   * Account token
   */
  account_token: string;

  /**
   * Card token
   */
  card_token: string;

  /**
   * Created date
   */
  created: string;

  /**
   * The type of event that occurred.
   */
  event_type: 'tokenization.result';

  /**
   * The result of the tokenization request.
   */
  tokenization_result_details: TokenizationResultWebhookEvent.TokenizationResultDetails;

  /**
   * Tokenization token
   */
  tokenization_token: string;
}

export namespace TokenizationResultWebhookEvent {
  /**
   * The result of the tokenization request.
   */
  export interface TokenizationResultDetails {
    /**
     * Lithic's tokenization decision.
     */
    issuer_decision: string;

    /**
     * List of reasons why the tokenization was declined
     */
    tokenization_decline_reasons: Array<
      | 'ACCOUNT_SCORE_1'
      | 'ALL_WALLET_DECLINE_REASONS_PRESENT'
      | 'CARD_EXPIRY_MONTH_MISMATCH'
      | 'CARD_EXPIRY_YEAR_MISMATCH'
      | 'CARD_INVALID_STATE'
      | 'CUSTOMER_RED_PATH'
      | 'CVC_MISMATCH'
      | 'DEVICE_SCORE_1'
      | 'GENERIC_DECLINE'
      | 'INVALID_CUSTOMER_RESPONSE'
      | 'NETWORK_FAILURE'
      | 'WALLET_RECOMMENDED_DECISION_RED'
    >;

    /**
     * The customer's tokenization decision if applicable.
     */
    customer_decision?: string | null;

    /**
     * Results from rules that were evaluated for this tokenization
     */
    rule_results?: Array<TokenizationsAPI.TokenizationRuleResult>;

    /**
     * An RFC 3339 timestamp indicating when the tokenization succeeded.
     */
    token_activated_date_time?: string | null;

    /**
     * List of reasons why two-factor authentication was required
     */
    tokenization_tfa_reasons?: Array<TokenizationsAPI.TokenizationTfaReason>;

    /**
     * The wallet's recommended decision.
     */
    wallet_decision?: string | null;
  }
}

export interface TokenizationTwoFactorAuthenticationCodeWebhookEvent {
  /**
   * Unique identifier for the user tokenizing a card
   */
  account_token: string;

  activation_method: TokenizationTwoFactorAuthenticationCodeWebhookEvent.ActivationMethod;

  /**
   * Authentication code to provide to the user tokenizing a card.
   */
  authentication_code: string;

  /**
   * Unique identifier for the card being tokenized
   */
  card_token: string;

  /**
   * Indicate when the request was received from Mastercard or Visa
   */
  created: string;

  /**
   * The type of event that occurred.
   */
  event_type: 'tokenization.two_factor_authentication_code';

  /**
   * Unique identifier for the tokenization
   */
  tokenization_token: string;
}

export namespace TokenizationTwoFactorAuthenticationCodeWebhookEvent {
  export interface ActivationMethod {
    /**
     * The communication method that the user has selected to use to receive the
     * authentication code. Supported Values: Sms = "TEXT_TO_CARDHOLDER_NUMBER". Email
     * = "EMAIL_TO_CARDHOLDER_ADDRESS"
     */
    type: 'EMAIL_TO_CARDHOLDER_ADDRESS' | 'TEXT_TO_CARDHOLDER_NUMBER';

    /**
     * The location where the user wants to receive the authentication code. The format
     * depends on the ActivationMethod.Type field. If Type is Email, the Value will be
     * the email address. If the Type is Sms, the Value will be the phone number.
     */
    value: string;
  }
}

export interface TokenizationTwoFactorAuthenticationCodeSentWebhookEvent {
  /**
   * Unique identifier for the user tokenizing a card
   */
  account_token: string;

  activation_method: TokenizationTwoFactorAuthenticationCodeSentWebhookEvent.ActivationMethod;

  /**
   * Unique identifier for the card being tokenized
   */
  card_token: string;

  /**
   * Indicate when the request was received from Mastercard or Visa
   */
  created: string;

  /**
   * The type of event that occurred.
   */
  event_type: 'tokenization.two_factor_authentication_code_sent';

  /**
   * Unique identifier for the tokenization
   */
  tokenization_token: string;
}

export namespace TokenizationTwoFactorAuthenticationCodeSentWebhookEvent {
  export interface ActivationMethod {
    /**
     * The communication method that the user has selected to use to receive the
     * authentication code. Supported Values: Sms = "TEXT_TO_CARDHOLDER_NUMBER". Email
     * = "EMAIL_TO_CARDHOLDER_ADDRESS"
     */
    type: 'EMAIL_TO_CARDHOLDER_ADDRESS' | 'TEXT_TO_CARDHOLDER_NUMBER';

    /**
     * The location to which the authentication code was sent. The format depends on
     * the ActivationMethod.Type field. If Type is Email, the Value will be the email
     * address. If the Type is Sms, the Value will be the phone number.
     */
    value: string;
  }
}

export interface TokenizationUpdatedWebhookEvent {
  /**
   * Account token
   */
  account_token: string;

  /**
   * Card token
   */
  card_token: string;

  /**
   * Created date
   */
  created: string;

  /**
   * The type of event that occurred.
   */
  event_type: 'tokenization.updated';

  tokenization: TokenizationsAPI.Tokenization;
}

/**
 * The Dispute object tracks the progression of a dispute throughout its lifecycle.
 */
export interface DisputeTransactionCreatedWebhookEvent extends DisputesV2API.DisputeV2 {
  /**
   * The type of event that occurred.
   */
  event_type: 'dispute_transaction.created';
}

/**
 * The Dispute object tracks the progression of a dispute throughout its lifecycle.
 */
export interface DisputeTransactionUpdatedWebhookEvent extends DisputesV2API.DisputeV2 {
  /**
   * The type of event that occurred.
   */
  event_type: 'dispute_transaction.updated';
}

/**
 * KYB payload for an updated account holder.
 */
export type ParsedWebhookEvent =
  | AccountHolderCreatedWebhookEvent
  | ParsedWebhookEvent.KYBPayload
  | ParsedWebhookEvent.KYCPayload
  | ParsedWebhookEvent.LegacyPayload
  | AccountHolderVerificationWebhookEvent
  | AccountHolderDocumentUpdatedWebhookEvent
  | AsaRequestWebhookEvent
  | TokenizationDecisioningRequestWebhookEvent
  | AuthRulesBacktestReportCreatedWebhookEvent
  | BalanceUpdatedWebhookEvent
  | BookTransferTransactionCreatedWebhookEvent
  | BookTransferTransactionUpdatedWebhookEvent
  | CardCreatedWebhookEvent
  | CardConvertedWebhookEvent
  | CardRenewedWebhookEvent
  | CardReissuedWebhookEvent
  | CardShippedWebhookEvent
  | CardTransactionUpdatedWebhookEvent
  | CardTransactionEnhancedDataCreatedWebhookEvent
  | CardTransactionEnhancedDataUpdatedWebhookEvent
  | DigitalWalletTokenizationApprovalRequestWebhookEvent
  | DigitalWalletTokenizationResultWebhookEvent
  | DigitalWalletTokenizationTwoFactorAuthenticationCodeWebhookEvent
  | DigitalWalletTokenizationTwoFactorAuthenticationCodeSentWebhookEvent
  | DigitalWalletTokenizationUpdatedWebhookEvent
  | DisputeUpdatedWebhookEvent
  | DisputeEvidenceUploadFailedWebhookEvent
  | ExternalBankAccountCreatedWebhookEvent
  | ExternalBankAccountUpdatedWebhookEvent
  | ExternalPaymentCreatedWebhookEvent
  | ExternalPaymentUpdatedWebhookEvent
  | FinancialAccountCreatedWebhookEvent
  | FinancialAccountUpdatedWebhookEvent
  | FundingEventCreatedWebhookEvent
  | LoanTapeCreatedWebhookEvent
  | LoanTapeUpdatedWebhookEvent
  | ManagementOperationCreatedWebhookEvent
  | ManagementOperationUpdatedWebhookEvent
  | InternalTransactionCreatedWebhookEvent
  | InternalTransactionUpdatedWebhookEvent
  | NetworkTotalCreatedWebhookEvent
  | NetworkTotalUpdatedWebhookEvent
  | PaymentTransactionCreatedWebhookEvent
  | PaymentTransactionUpdatedWebhookEvent
  | SettlementReportUpdatedWebhookEvent
  | StatementsCreatedWebhookEvent
  | ThreeDSAuthenticationCreatedWebhookEvent
  | ThreeDSAuthenticationUpdatedWebhookEvent
  | ThreeDSAuthenticationChallengeWebhookEvent
  | TokenizationApprovalRequestWebhookEvent
  | TokenizationResultWebhookEvent
  | TokenizationTwoFactorAuthenticationCodeWebhookEvent
  | TokenizationTwoFactorAuthenticationCodeSentWebhookEvent
  | TokenizationUpdatedWebhookEvent
  | ThreeDSAPI.ThreeDSAuthentication
  | DisputeTransactionCreatedWebhookEvent
  | DisputeTransactionUpdatedWebhookEvent;

export namespace ParsedWebhookEvent {
  /**
   * KYB payload for an updated account holder.
   */
  export interface KYBPayload {
    /**
     * The token of the account_holder that was created.
     */
    token: string;

    /**
     * Original request to update the account holder.
     */
    update_request: KYBPayload.UpdateRequest;

    /**
     * The type of event that occurred.
     */
    event_type?: 'account_holder.updated';

    /**
     * A user provided id that can be used to link an account holder with an external
     * system
     */
    external_id?: string;

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

  export namespace KYBPayload {
    /**
     * Original request to update the account holder.
     */
    export interface UpdateRequest {
      /**
       * @deprecated Deprecated.
       */
      beneficial_owner_entities?: Array<AccountHoldersAPI.KYBBusinessEntity>;

      /**
       * You must submit a list of all direct and indirect individuals with 25% or more
       * ownership in the company. A maximum of 4 beneficial owners can be submitted. If
       * no individual owns 25% of the company you do not need to send beneficial owner
       * information. See
       * [FinCEN requirements](https://www.fincen.gov/sites/default/files/shared/CDD_Rev6.7_Sept_2017_Certificate.pdf)
       * (Section I) for more background on individuals that should be included.
       */
      beneficial_owner_individuals?: Array<UpdateRequest.BeneficialOwnerIndividual>;

      /**
       * Information for business for which the account is being opened and KYB is being
       * run.
       */
      business_entity?: AccountHoldersAPI.KYBBusinessEntity;

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
      control_person?: UpdateRequest.ControlPerson;
    }

    export namespace UpdateRequest {
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
    }
  }

  /**
   * KYC payload for an updated account holder.
   */
  export interface KYCPayload {
    /**
     * The token of the account_holder that was created.
     */
    token: string;

    /**
     * Original request to update the account holder.
     */
    update_request: KYCPayload.UpdateRequest;

    /**
     * The type of event that occurred.
     */
    event_type?: 'account_holder.updated';

    /**
     * A user provided id that can be used to link an account holder with an external
     * system
     */
    external_id?: string;
  }

  export namespace KYCPayload {
    /**
     * Original request to update the account holder.
     */
    export interface UpdateRequest {
      /**
       * Information on the individual for whom the account is being opened and KYC is
       * being run.
       */
      individual?: UpdateRequest.Individual;
    }

    export namespace UpdateRequest {
      /**
       * Information on the individual for whom the account is being opened and KYC is
       * being run.
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
    }
  }

  /**
   * Legacy payload for an updated account holder.
   */
  export interface LegacyPayload {
    /**
     * The token of the account_holder that was created.
     */
    token: string;

    /**
     * If applicable, represents the business account token associated with the
     * account_holder.
     */
    business_account_token?: string | null;

    /**
     * When the account_holder updated event was created
     */
    created?: string;

    /**
     * If updated, the newly updated email associated with the account_holder otherwise
     * the existing email is provided.
     */
    email?: string;

    /**
     * The type of event that occurred.
     */
    event_type?: 'account_holder.updated';

    /**
     * If applicable, represents the external_id associated with the account_holder.
     */
    external_id?: string | null;

    /**
     * If applicable, represents the account_holder's first name.
     */
    first_name?: string;

    /**
     * If applicable, represents the account_holder's last name.
     */
    last_name?: string;

    /**
     * If applicable, represents the account_holder's business name.
     */
    legal_business_name?: string;

    /**
     * If updated, the newly updated phone_number associated with the account_holder
     * otherwise the existing phone_number is provided.
     */
    phone_number?: string;
  }
}

export declare namespace Webhooks {
  export {
    type AccountHolderCreatedWebhookEvent as AccountHolderCreatedWebhookEvent,
    type AccountHolderUpdatedWebhookEvent as AccountHolderUpdatedWebhookEvent,
    type AccountHolderVerificationWebhookEvent as AccountHolderVerificationWebhookEvent,
    type AccountHolderDocumentUpdatedWebhookEvent as AccountHolderDocumentUpdatedWebhookEvent,
    type AsaRequestWebhookEvent as AsaRequestWebhookEvent,
    type TokenizationDecisioningRequestWebhookEvent as TokenizationDecisioningRequestWebhookEvent,
    type AuthRulesBacktestReportCreatedWebhookEvent as AuthRulesBacktestReportCreatedWebhookEvent,
    type BalanceUpdatedWebhookEvent as BalanceUpdatedWebhookEvent,
    type BookTransferTransactionCreatedWebhookEvent as BookTransferTransactionCreatedWebhookEvent,
    type BookTransferTransactionUpdatedWebhookEvent as BookTransferTransactionUpdatedWebhookEvent,
    type CardCreatedWebhookEvent as CardCreatedWebhookEvent,
    type CardConvertedWebhookEvent as CardConvertedWebhookEvent,
    type CardRenewedWebhookEvent as CardRenewedWebhookEvent,
    type CardReissuedWebhookEvent as CardReissuedWebhookEvent,
    type CardShippedWebhookEvent as CardShippedWebhookEvent,
    type CardTransactionUpdatedWebhookEvent as CardTransactionUpdatedWebhookEvent,
    type CardTransactionEnhancedDataCreatedWebhookEvent as CardTransactionEnhancedDataCreatedWebhookEvent,
    type CardTransactionEnhancedDataUpdatedWebhookEvent as CardTransactionEnhancedDataUpdatedWebhookEvent,
    type DigitalWalletTokenizationApprovalRequestWebhookEvent as DigitalWalletTokenizationApprovalRequestWebhookEvent,
    type DigitalWalletTokenizationResultWebhookEvent as DigitalWalletTokenizationResultWebhookEvent,
    type DigitalWalletTokenizationTwoFactorAuthenticationCodeWebhookEvent as DigitalWalletTokenizationTwoFactorAuthenticationCodeWebhookEvent,
    type DigitalWalletTokenizationTwoFactorAuthenticationCodeSentWebhookEvent as DigitalWalletTokenizationTwoFactorAuthenticationCodeSentWebhookEvent,
    type DigitalWalletTokenizationUpdatedWebhookEvent as DigitalWalletTokenizationUpdatedWebhookEvent,
    type DisputeUpdatedWebhookEvent as DisputeUpdatedWebhookEvent,
    type DisputeEvidenceUploadFailedWebhookEvent as DisputeEvidenceUploadFailedWebhookEvent,
    type ExternalBankAccountCreatedWebhookEvent as ExternalBankAccountCreatedWebhookEvent,
    type ExternalBankAccountUpdatedWebhookEvent as ExternalBankAccountUpdatedWebhookEvent,
    type ExternalPaymentCreatedWebhookEvent as ExternalPaymentCreatedWebhookEvent,
    type ExternalPaymentUpdatedWebhookEvent as ExternalPaymentUpdatedWebhookEvent,
    type FinancialAccountCreatedWebhookEvent as FinancialAccountCreatedWebhookEvent,
    type FinancialAccountUpdatedWebhookEvent as FinancialAccountUpdatedWebhookEvent,
    type FundingEventCreatedWebhookEvent as FundingEventCreatedWebhookEvent,
    type LoanTapeCreatedWebhookEvent as LoanTapeCreatedWebhookEvent,
    type LoanTapeUpdatedWebhookEvent as LoanTapeUpdatedWebhookEvent,
    type ManagementOperationCreatedWebhookEvent as ManagementOperationCreatedWebhookEvent,
    type ManagementOperationUpdatedWebhookEvent as ManagementOperationUpdatedWebhookEvent,
    type InternalTransactionCreatedWebhookEvent as InternalTransactionCreatedWebhookEvent,
    type InternalTransactionUpdatedWebhookEvent as InternalTransactionUpdatedWebhookEvent,
    type NetworkTotalCreatedWebhookEvent as NetworkTotalCreatedWebhookEvent,
    type NetworkTotalUpdatedWebhookEvent as NetworkTotalUpdatedWebhookEvent,
    type PaymentTransactionCreatedWebhookEvent as PaymentTransactionCreatedWebhookEvent,
    type PaymentTransactionUpdatedWebhookEvent as PaymentTransactionUpdatedWebhookEvent,
    type SettlementReportUpdatedWebhookEvent as SettlementReportUpdatedWebhookEvent,
    type StatementsCreatedWebhookEvent as StatementsCreatedWebhookEvent,
    type ThreeDSAuthenticationCreatedWebhookEvent as ThreeDSAuthenticationCreatedWebhookEvent,
    type ThreeDSAuthenticationUpdatedWebhookEvent as ThreeDSAuthenticationUpdatedWebhookEvent,
    type ThreeDSAuthenticationChallengeWebhookEvent as ThreeDSAuthenticationChallengeWebhookEvent,
    type TokenizationApprovalRequestWebhookEvent as TokenizationApprovalRequestWebhookEvent,
    type TokenizationResultWebhookEvent as TokenizationResultWebhookEvent,
    type TokenizationTwoFactorAuthenticationCodeWebhookEvent as TokenizationTwoFactorAuthenticationCodeWebhookEvent,
    type TokenizationTwoFactorAuthenticationCodeSentWebhookEvent as TokenizationTwoFactorAuthenticationCodeSentWebhookEvent,
    type TokenizationUpdatedWebhookEvent as TokenizationUpdatedWebhookEvent,
    type DisputeTransactionCreatedWebhookEvent as DisputeTransactionCreatedWebhookEvent,
    type DisputeTransactionUpdatedWebhookEvent as DisputeTransactionUpdatedWebhookEvent,
    type ParsedWebhookEvent as ParsedWebhookEvent,
  };
}
