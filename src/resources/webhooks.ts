// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { getRequiredHeader, HeadersLike } from '../internal/headers';
import { APIResource } from '../core/resource';
import { Webhook } from 'standardwebhooks';
import * as BookTransfersAPI from './book-transfers';
import * as CardAuthorizationsAPI from './card-authorizations';
import * as DisputesAPI from './disputes';
import * as DisputesV2API from './disputes-v2';
import * as ExternalPaymentsAPI from './external-payments';
import * as FundingEventsAPI from './funding-events';
import * as InternalTransactionAPI from './internal-transaction';
import * as ManagementOperationsAPI from './management-operations';
import * as PaymentsAPI from './payments';
import * as TokenizationsAPI from './tokenizations';
import * as AccountHoldersAPI from './account-holders/account-holders';
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
     * 6-digit North American Industry Classification System (NAICS) code for the
     * business. Only present if naics_code was included in the update request.
     */
    naics_code?: string;

    /**
     * Short description of the company's line of business (i.e., what does the company
     * do?). Values longer than 255 characters will be truncated before KYB
     * verification
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
export interface CardAuthorizationApprovalRequestWebhookEvent
  extends CardAuthorizationsAPI.CardAuthorization {
  event_type: 'card_authorization.approval_request';
}

export interface CardAuthorizationChallengeWebhookEvent {
  /**
   * The authorization that triggered the challenge
   */
  authorization: CardAuthorizationsAPI.CardAuthorization;

  /**
   * Details of the Authorization Challenge issued during card authorization
   */
  challenge: CardAuthorizationChallengeWebhookEvent.Challenge;

  /**
   * The type of event that occurred.
   */
  event_type: 'card_authorization.challenge';
}

export namespace CardAuthorizationChallengeWebhookEvent {
  /**
   * Details of the Authorization Challenge issued during card authorization
   */
  export interface Challenge {
    /**
     * Globally unique identifier for the event that triggered the challenge. Use this
     * token when calling the challenge response endpoint
     */
    event_token: string;

    /**
     * ISO-8601 time at which the challenge expires
     */
    expiry_time: string;

    /**
     * ISO-8601 time at which the challenge was issued
     */
    start_time: string;
  }
}

export interface CardAuthorizationChallengeResponseWebhookEvent {
  /**
   * The token of the card associated with the challenge
   */
  card_token: string | null;

  /**
   * The method used to deliver the challenge to the cardholder
   */
  challenge_method: 'SMS';

  /**
   * The timestamp of when the challenge was completed
   */
  completed: string | null;

  /**
   * The timestamp of when the challenge was created
   */
  created: string;

  /**
   * Globally unique identifier for the event
   */
  event_token: string;

  /**
   * Event type
   */
  event_type: 'card_authorization.challenge_response';

  /**
   * The cardholder's response to the challenge
   */
  response: 'APPROVE' | 'DECLINE';

  /**
   * The token of the transaction associated with the authorization event being
   * challenged
   */
  transaction_token: string | null;
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

export interface CardUpdatedWebhookEvent {
  /**
   * The token of the card that was updated.
   */
  card_token: string;

  /**
   * The type of event that occurred.
   */
  event_type: 'card.updated';

  /**
   * The previous values of the fields that were updated.
   */
  previous_fields: unknown;

  /**
   * The current state of the card.
   */
  state: string;
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

/**
 * Payload for digital wallet tokenization approval requests. Used for both the
 * decisioning responder request (sent to the customer's endpoint for a real-time
 * decision) and the subsequent webhook event (sent after the decision is made).
 * Fields like customer_tokenization_decision, tokenization_decline_reasons,
 * tokenization_tfa_reasons, and rule_results are only populated in the webhook
 * event, not in the initial decisioning request.
 */
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
   * Contains the metadata for the digital wallet being tokenized.
   */
  digital_wallet_token_metadata: TokenizationsAPI.TokenMetadata;

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

  /**
   * Contains the metadata for the customer tokenization decision.
   */
  customer_tokenization_decision?: DigitalWalletTokenizationApprovalRequestWebhookEvent.CustomerTokenizationDecision | null;

  device?: TokenizationsAPI.Device;

  /**
   * Results from rules that were evaluated for this tokenization. Only populated in
   * webhook events, not in the initial decisioning request
   */
  rule_results?: Array<TokenizationsAPI.TokenizationRuleResult>;

  /**
   * List of reasons why the tokenization was declined. Only populated in webhook
   * events, not in the initial decisioning request
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
   * List of reasons why two-factor authentication was required. Only populated in
   * webhook events, not in the initial decisioning request
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
   * Contains the metadata for the digital wallet being tokenized.
   */
  token_metadata: TokenizationsAPI.TokenMetadata;

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
 * Represents a 3DS authentication
 */
export interface ThreeDSAuthenticationApprovalRequestWebhookEvent extends ThreeDSAPI.ThreeDSAuthentication {
  event_type: 'three_ds_authentication.approval_request';
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
  | CardAuthorizationApprovalRequestWebhookEvent
  | CardAuthorizationChallengeWebhookEvent
  | CardAuthorizationChallengeResponseWebhookEvent
  | AuthRulesBacktestReportCreatedWebhookEvent
  | BalanceUpdatedWebhookEvent
  | BookTransferTransactionCreatedWebhookEvent
  | BookTransferTransactionUpdatedWebhookEvent
  | CardCreatedWebhookEvent
  | CardConvertedWebhookEvent
  | CardRenewedWebhookEvent
  | CardReissuedWebhookEvent
  | CardShippedWebhookEvent
  | CardUpdatedWebhookEvent
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
  | ThreeDSAuthenticationApprovalRequestWebhookEvent
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
     * 6-digit North American Industry Classification System (NAICS) code for the
     * business. Only present if naics_code was included in the update request.
     */
    naics_code?: string;

    /**
     * Short description of the company's line of business (i.e., what does the company
     * do?). Values longer than 255 characters will be truncated before KYB
     * verification
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
    type CardAuthorizationApprovalRequestWebhookEvent as CardAuthorizationApprovalRequestWebhookEvent,
    type CardAuthorizationChallengeWebhookEvent as CardAuthorizationChallengeWebhookEvent,
    type CardAuthorizationChallengeResponseWebhookEvent as CardAuthorizationChallengeResponseWebhookEvent,
    type AuthRulesBacktestReportCreatedWebhookEvent as AuthRulesBacktestReportCreatedWebhookEvent,
    type BalanceUpdatedWebhookEvent as BalanceUpdatedWebhookEvent,
    type BookTransferTransactionCreatedWebhookEvent as BookTransferTransactionCreatedWebhookEvent,
    type BookTransferTransactionUpdatedWebhookEvent as BookTransferTransactionUpdatedWebhookEvent,
    type CardCreatedWebhookEvent as CardCreatedWebhookEvent,
    type CardConvertedWebhookEvent as CardConvertedWebhookEvent,
    type CardRenewedWebhookEvent as CardRenewedWebhookEvent,
    type CardReissuedWebhookEvent as CardReissuedWebhookEvent,
    type CardShippedWebhookEvent as CardShippedWebhookEvent,
    type CardUpdatedWebhookEvent as CardUpdatedWebhookEvent,
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
    type ThreeDSAuthenticationApprovalRequestWebhookEvent as ThreeDSAuthenticationApprovalRequestWebhookEvent,
    type DisputeTransactionCreatedWebhookEvent as DisputeTransactionCreatedWebhookEvent,
    type DisputeTransactionUpdatedWebhookEvent as DisputeTransactionUpdatedWebhookEvent,
    type ParsedWebhookEvent as ParsedWebhookEvent,
  };
}
