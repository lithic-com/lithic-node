// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

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
   * Valid postal code. Only USA postal codes (ZIP codes) are currently supported,
   * entered as a five-digit postal code or nine-digit postal code (ZIP+4) using the
   * format 12345-1234.
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

export interface Carrier {
  /**
   * QR code url to display on the card carrier
   */
  qr_code_url?: string;
}

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
   * Type of documentation to be submitted for verification.
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
    | 'ITIN_LETTER';

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
     * Type of image to upload.
     */
    image_type: 'FRONT' | 'BACK';

    /**
     * Status of document image upload.
     */
    status: 'ACCEPTED' | 'REJECTED' | 'PENDING_UPLOAD' | 'UPLOADED';

    /**
     * Reasons for document image upload status.
     */
    status_reasons: Array<
      | 'DOCUMENT_MISSING_REQUIRED_DATA'
      | 'DOCUMENT_UPLOAD_TOO_BLURRY'
      | 'FILE_SIZE_TOO_LARGE'
      | 'INVALID_DOCUMENT_TYPE'
      | 'INVALID_DOCUMENT_UPLOAD'
      | 'UNKNOWN_ERROR'
    >;

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
