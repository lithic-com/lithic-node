// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { CursorPage } from '../pagination';

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

export interface AuthRule {
  /**
   * Globally unique identifier.
   */
  token: string;

  /**
   * Indicates whether the Auth Rule is ACTIVE or INACTIVE
   */
  state: 'ACTIVE' | 'INACTIVE';

  /**
   * Array of account_token(s) identifying the accounts that the Auth Rule applies
   * to. Note that only this field or `card_tokens` can be provided for a given Auth
   * Rule.
   */
  account_tokens?: Array<string>;

  /**
   * Countries in which the Auth Rule permits transactions. Note that Lithic
   * maintains a list of countries in which all transactions are blocked; "allowing"
   * those countries in an Auth Rule does not override the Lithic-wide restrictions.
   */
  allowed_countries?: Array<string>;

  /**
   * Merchant category codes for which the Auth Rule permits transactions.
   */
  allowed_mcc?: Array<string>;

  /**
   * Countries in which the Auth Rule automatically declines transactions.
   */
  blocked_countries?: Array<string>;

  /**
   * Merchant category codes for which the Auth Rule automatically declines
   * transactions.
   */
  blocked_mcc?: Array<string>;

  /**
   * Array of card_token(s) identifying the cards that the Auth Rule applies to. Note
   * that only this field or `account_tokens` can be provided for a given Auth Rule.
   */
  card_tokens?: Array<string>;

  /**
   * Boolean indicating whether the Auth Rule is applied at the program level.
   */
  program_level?: boolean;
}

export interface Carrier {
  /**
   * QR code url to display on the card carrier
   */
  qr_code_url?: string;
}

/**
 * ISO 4217 currency. Its enumerants are ISO 4217 currencies except for some
 * special currencies like ``XXX`. Enumerants names are lowercase cureency code
 * e.g. :attr:`Currency.eur`, :attr:`Currency.usd`.
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

export interface VelocityLimitParams {
  filters: VelocityLimitParams.Filters;

  /**
   * The size of the trailing window to calculate Spend Velocity over in seconds.
   */
  period: number | VelocityLimitParamsPeriodWindow;

  scope: 'CARD' | 'ACCOUNT';

  /**
   * The maximum amount of spend velocity allowed in the period in minor units (the
   * smallest unit of a currency, e.g. cents for USD). Transactions exceeding this
   * limit will be declined.
   */
  limit_amount?: number | null;

  /**
   * The number of spend velocity impacting transactions may not exceed this limit in
   * the period. Transactions exceeding this limit will be declined. A spend velocity
   * impacting transaction is a transaction that has been authorized, and optionally
   * settled, or a force post (a transaction that settled without prior
   * authorization).
   */
  limit_count?: number | null;
}

export namespace VelocityLimitParams {
  export interface Filters {
    /**
     * ISO-3166-1 alpha-3 Country Codes to include in the velocity calculation.
     * Transactions not matching any of the provided will not be included in the
     * calculated velocity.
     */
    include_countries?: Array<string> | null;

    /**
     * Merchant Category Codes to include in the velocity calculation. Transactions not
     * matching this MCC will not be included in the calculated velocity.
     */
    include_mccs?: Array<string> | null;
  }
}

/**
 * The window of time to calculate Spend Velocity over.
 *
 * - `DAY`: Velocity over the current day since midnight Eastern Time.
 * - `MONTH`: Velocity over the current month since 00:00 / 12 AM on the first of
 *   the month in Eastern Time.
 */
export type VelocityLimitParamsPeriodWindow = 'DAY' | 'MONTH';

export class AuthRulesCursorPage extends CursorPage<AuthRule> {}
