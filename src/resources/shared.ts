// File generated from our OpenAPI spec by Stainless.

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

export interface Carrier {
  /**
   * QR code url to display on the card carrier
   */
  qr_code_url?: string;
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
   */
  first_name: string;

  /**
   * Customer's surname (family name). This will be the last name printed on the
   * physical card.
   */
  last_name: string;

  /**
   * Postal code (formerly zipcode). For US addresses, either five-digit zipcode or
   * nine-digit "ZIP+4".
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
