// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

/**
 * Type of account financial account
 */
export type AccountFinancialAccountType = 'ISSUING' | 'OPERATING';

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
   * Valid country code, entered in uppercase ISO 3166-1 alpha-3 three-character
   * format. Only USA is currently supported for all workflows. KYC_EXEMPT supports
   * CAN additionally.
   */
  country: string;

  /**
   * Valid postal code. USA postal codes (ZIP codes) are supported, entered as a
   * five-digit postal code or nine-digit postal code (ZIP+4) using the format
   * 12345-1234. KYC_EXEMPT supports Canadian postal codes.
   */
  postal_code: string;

  /**
   * Valid state code. USA state codes are supported, entered in uppercase ISO 3166-2
   * two-character format. KYC_EXEMPT supports Canadian province codes.
   */
  state: string;

  /**
   * Unit or apartment number (if applicable).
   */
  address2?: string;
}

export interface Carrier {
  /**
   * QR code url to display on the card carrier
   */
  qr_code_url?: string;
}

/**
 * 3-character alphabetic ISO 4217 currency
 */
export type Currency = string;

/**
 * Describes the document and the required document image uploads required to
 * re-run KYC
 */
export interface Document {
  /**
   * Globally unique identifier for the document.
   */
  token: string;

  /**
   * Globally unique identifier for the account holder.
   */
  account_holder_token: string;

  /**
   * Type of documentation to be submitted for verification of an account holder
   */
  document_type:
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
   * Globally unique identifier for an entity.
   */
  entity_token: string;

  /**
   * Represents a single image of the document to upload.
   */
  required_document_uploads: Array<Document.RequiredDocumentUpload>;
}

export namespace Document {
  /**
   * Represents a single image of the document to upload.
   */
  export interface RequiredDocumentUpload {
    /**
     * Globally unique identifier for the document upload.
     */
    token: string;

    /**
     * A list of status reasons associated with a KYB account holder that have been
     * satisfied by the document upload
     */
    accepted_entity_status_reasons: Array<string>;

    /**
     * When the document upload was created
     */
    created: string;

    /**
     * Type of image to upload.
     */
    image_type: 'FRONT' | 'BACK';

    /**
     * A list of status reasons associated with a KYB account holder that have not been
     * satisfied by the document upload
     */
    rejected_entity_status_reasons: Array<string>;

    /**
     * Status of an account holder's document upload.
     */
    status: 'ACCEPTED' | 'REJECTED' | 'PENDING_UPLOAD' | 'UPLOADED' | 'PARTIAL_APPROVAL';

    /**
     * Reasons for document image upload status.
     */
    status_reasons: Array<
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
      | 'UNKNOWN_ERROR'
    >;

    /**
     * When the document upload was last updated
     */
    updated: string;

    /**
     * URL to upload document image to.
     *
     * Note that the upload URLs expire after 7 days. If an upload URL expires, you can
     * refresh the URLs by retrieving the document upload from
     * `GET /account_holders/{account_holder_token}/documents`.
     */
    upload_url: string;
  }
}

/**
 * Financial Event
 */
export interface FinancialEvent {
  /**
   * Globally unique identifier.
   */
  token?: string;

  /**
   * Amount of the financial event that has been settled in the currency's smallest
   * unit (e.g., cents).
   */
  amount?: number;

  /**
   * Date and time when the financial event occurred. UTC time zone.
   */
  created?: string;

  /**
   * APPROVED financial events were successful while DECLINED financial events were
   * declined by user, Lithic, or the network.
   */
  result?: 'APPROVED' | 'DECLINED';

  type?:
    | 'ACH_ORIGINATION_CANCELLED'
    | 'ACH_ORIGINATION_INITIATED'
    | 'ACH_ORIGINATION_PROCESSED'
    | 'ACH_ORIGINATION_RELEASED'
    | 'ACH_ORIGINATION_REJECTED'
    | 'ACH_ORIGINATION_REVIEWED'
    | 'ACH_ORIGINATION_SETTLED'
    | 'ACH_RECEIPT_PROCESSED'
    | 'ACH_RECEIPT_RELEASED'
    | 'ACH_RECEIPT_SETTLED'
    | 'ACH_RETURN_INITIATED'
    | 'ACH_RETURN_PROCESSED'
    | 'ACH_RETURN_REJECTED'
    | 'ACH_RETURN_SETTLED'
    | 'AUTHORIZATION'
    | 'AUTHORIZATION_ADVICE'
    | 'AUTHORIZATION_EXPIRY'
    | 'AUTHORIZATION_REVERSAL'
    | 'BALANCE_INQUIRY'
    | 'BILLING_ERROR'
    | 'BILLING_ERROR_REVERSAL'
    | 'CARD_TO_CARD'
    | 'CASH_BACK'
    | 'CASH_BACK_REVERSAL'
    | 'CLEARING'
    | 'COLLECTION'
    | 'CORRECTION_CREDIT'
    | 'CORRECTION_DEBIT'
    | 'CREDIT_AUTHORIZATION'
    | 'CREDIT_AUTHORIZATION_ADVICE'
    | 'CURRENCY_CONVERSION'
    | 'CURRENCY_CONVERSION_REVERSAL'
    | 'DISPUTE_WON'
    | 'EXTERNAL_ACH_CANCELED'
    | 'EXTERNAL_ACH_INITIATED'
    | 'EXTERNAL_ACH_RELEASED'
    | 'EXTERNAL_ACH_REVERSED'
    | 'EXTERNAL_ACH_SETTLED'
    | 'EXTERNAL_CHECK_CANCELED'
    | 'EXTERNAL_CHECK_INITIATED'
    | 'EXTERNAL_CHECK_RELEASED'
    | 'EXTERNAL_CHECK_REVERSED'
    | 'EXTERNAL_CHECK_SETTLED'
    | 'EXTERNAL_TRANSFER_CANCELED'
    | 'EXTERNAL_TRANSFER_INITIATED'
    | 'EXTERNAL_TRANSFER_RELEASED'
    | 'EXTERNAL_TRANSFER_REVERSED'
    | 'EXTERNAL_TRANSFER_SETTLED'
    | 'EXTERNAL_WIRE_CANCELED'
    | 'EXTERNAL_WIRE_INITIATED'
    | 'EXTERNAL_WIRE_RELEASED'
    | 'EXTERNAL_WIRE_REVERSED'
    | 'EXTERNAL_WIRE_SETTLED'
    | 'FINANCIAL_AUTHORIZATION'
    | 'FINANCIAL_CREDIT_AUTHORIZATION'
    | 'INTEREST'
    | 'INTEREST_REVERSAL'
    | 'INTERNAL_ADJUSTMENT'
    | 'LATE_PAYMENT'
    | 'LATE_PAYMENT_REVERSAL'
    | 'LOSS_WRITE_OFF'
    | 'PROVISIONAL_CREDIT'
    | 'PROVISIONAL_CREDIT_REVERSAL'
    | 'SERVICE'
    | 'RETURN'
    | 'RETURN_REVERSAL'
    | 'TRANSFER'
    | 'TRANSFER_INSUFFICIENT_FUNDS'
    | 'RETURNED_PAYMENT'
    | 'RETURNED_PAYMENT_REVERSAL'
    | 'LITHIC_NETWORK_PAYMENT';
}

/**
 * Type of instance financial account
 */
export type InstanceFinancialAccountType =
  | 'ISSUING'
  | 'RESERVE'
  | 'OPERATING'
  | 'CHARGED_OFF_FEES'
  | 'CHARGED_OFF_INTEREST'
  | 'CHARGED_OFF_PRINCIPAL'
  | 'SECURITY'
  | 'PROGRAM_RECEIVABLES'
  | 'COLLECTION'
  | 'PROGRAM_BANK_ACCOUNTS_PAYABLE';

export interface Merchant {
  /**
   * Unique alphanumeric identifier for the payment card acceptor (merchant).
   */
  acceptor_id: string;

  /**
   * Unique numeric identifier of the acquiring institution.
   */
  acquiring_institution_id: string;

  /**
   * City of card acceptor. Note that in many cases, particularly in card-not-present
   * transactions, merchants may send through a phone number or URL in this field.
   */
  city: string;

  /**
   * Country or entity of card acceptor. Possible values are: (1) all ISO 3166-1
   * alpha-3 country codes, (2) QZZ for Kosovo, and (3) ANT for Netherlands Antilles.
   */
  country: string;

  /**
   * Short description of card acceptor.
   */
  descriptor: string;

  /**
   * Merchant category code (MCC). A four-digit number listed in ISO 18245. An MCC is
   * used to classify a business by the types of goods or services it provides.
   */
  mcc: string;

  /**
   * Geographic state of card acceptor.
   */
  state: string;
}

export interface ShippingAddress {
  /**
   * Valid USPS routable address.
   */
  address1: string;

  /**
   * City
   */
  city: string;

  /**
   * Uppercase ISO 3166-1 alpha-3 three character abbreviation.
   */
  country: string;

  /**
   * Customer's first name. This will be the first name printed on the physical card.
   * The combined length of `first_name` and `last_name` may not exceed 25
   * characters.
   */
  first_name: string;

  /**
   * Customer's surname (family name). This will be the last name printed on the
   * physical card. The combined length of `first_name` and `last_name` may not
   * exceed 25 characters.
   */
  last_name: string;

  /**
   * Postal code (formerly zipcode). For US addresses, either five-digit postal code
   * or nine-digit postal code (ZIP+4) using the format 12345-1234.
   */
  postal_code: string;

  /**
   * Uppercase ISO 3166-2 two character abbreviation for US and CA. Optional with a
   * limit of 24 characters for other countries.
   */
  state: string;

  /**
   * Unit number (if applicable).
   */
  address2?: string;

  /**
   * Email address to be contacted for expedited shipping process purposes. Required
   * if `shipping_method` is `EXPEDITED`.
   */
  email?: string;

  /**
   * Text to be printed on line two of the physical card. Use of this field requires
   * additional permissions.
   */
  line2_text?: string;

  /**
   * Cardholder's phone number in E.164 format to be contacted for expedited shipping
   * process purposes. Required if `shipping_method` is `EXPEDITED`.
   */
  phone_number?: string;
}
