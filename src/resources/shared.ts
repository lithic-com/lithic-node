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
 * ISO 4217 currency. Its enumerants are ISO 4217 currencies except for some
 * special currencies like `XXX`. Enumerants names are lowercase currency code e.g.
 * `EUR`, `USD`.
 */
export type Currency =
  | 'AED'
  | 'AFN'
  | 'ALL'
  | 'AMD'
  | 'ANG'
  | 'AOA'
  | 'ARS'
  | 'AUD'
  | 'AWG'
  | 'AZN'
  | 'BAM'
  | 'BBD'
  | 'BDT'
  | 'BGN'
  | 'BHD'
  | 'BIF'
  | 'BMD'
  | 'BND'
  | 'BOB'
  | 'BOV'
  | 'BRL'
  | 'BSD'
  | 'BTN'
  | 'BWP'
  | 'BYN'
  | 'BZD'
  | 'CAD'
  | 'CDF'
  | 'CHE'
  | 'CHF'
  | 'CHW'
  | 'CLF'
  | 'CLP'
  | 'CNY'
  | 'COP'
  | 'COU'
  | 'CRC'
  | 'CUC'
  | 'CUP'
  | 'CVE'
  | 'CZK'
  | 'DJF'
  | 'DKK'
  | 'DOP'
  | 'DZD'
  | 'EGP'
  | 'ERN'
  | 'ETB'
  | 'EUR'
  | 'FJD'
  | 'FKP'
  | 'GBP'
  | 'GEL'
  | 'GHS'
  | 'GIP'
  | 'GMD'
  | 'GNF'
  | 'GTQ'
  | 'GYD'
  | 'HKD'
  | 'HNL'
  | 'HRK'
  | 'HTG'
  | 'HUF'
  | 'IDR'
  | 'ILS'
  | 'INR'
  | 'IQD'
  | 'IRR'
  | 'ISK'
  | 'JMD'
  | 'JOD'
  | 'JPY'
  | 'KES'
  | 'KGS'
  | 'KHR'
  | 'KMF'
  | 'KPW'
  | 'KRW'
  | 'KWD'
  | 'KYD'
  | 'KZT'
  | 'LAK'
  | 'LBP'
  | 'LKR'
  | 'LRD'
  | 'LSL'
  | 'LYD'
  | 'MAD'
  | 'MDL'
  | 'MGA'
  | 'MKD'
  | 'MMK'
  | 'MNT'
  | 'MOP'
  | 'MRU'
  | 'MUR'
  | 'MVR'
  | 'MWK'
  | 'MXN'
  | 'MXV'
  | 'MYR'
  | 'MZN'
  | 'NAD'
  | 'NGN'
  | 'NIO'
  | 'NOK'
  | 'NPR'
  | 'NZD'
  | 'OMR'
  | 'PAB'
  | 'PEN'
  | 'PGK'
  | 'PHP'
  | 'PKR'
  | 'PLN'
  | 'PYG'
  | 'QAR'
  | 'RON'
  | 'RSD'
  | 'RUB'
  | 'RWF'
  | 'SAR'
  | 'SBD'
  | 'SCR'
  | 'SDG'
  | 'SEK'
  | 'SGD'
  | 'SHP'
  | 'SLE'
  | 'SLL'
  | 'SOS'
  | 'SRD'
  | 'SSP'
  | 'STN'
  | 'SVC'
  | 'SYP'
  | 'SZL'
  | 'THB'
  | 'TJS'
  | 'TMT'
  | 'TND'
  | 'TOP'
  | 'TRY'
  | 'TTD'
  | 'TWD'
  | 'TZS'
  | 'UAH'
  | 'UGX'
  | 'USD'
  | 'USN'
  | 'UYI'
  | 'UYU'
  | 'UYW'
  | 'UZS'
  | 'VED'
  | 'VES'
  | 'VND'
  | 'VUV'
  | 'WST'
  | 'XAF'
  | 'XAG'
  | 'XAU'
  | 'XBA'
  | 'XBB'
  | 'XBC'
  | 'XBD'
  | 'XCD'
  | 'XDR'
  | 'XOF'
  | 'XPD'
  | 'XPF'
  | 'XPT'
  | 'XSU'
  | 'XTS'
  | 'XUA'
  | 'XXX'
  | 'YER'
  | 'ZAR'
  | 'ZMW'
  | 'ZWL';

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
 * Type of instance financial account
 */
export type InstanceFinancialAccountType = 'ISSUING' | 'RESERVE' | 'OPERATING';

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
