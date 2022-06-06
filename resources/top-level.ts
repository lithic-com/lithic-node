// File generated from our OpenAPI spec by Stainless.

import * as Core from '~/core';
import { isRequestOptions } from '~/core';
import * as Shared from './shared';

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
