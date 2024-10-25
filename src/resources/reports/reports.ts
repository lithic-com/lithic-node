// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../resource';
import * as ReportsAPI from './reports';
import * as SettlementAPI from './settlement';
import { CursorPage } from '../../pagination';

export class Reports extends APIResource {
  settlement: SettlementAPI.Settlement = new SettlementAPI.Settlement(this._client);
}

export class SettlementDetailsCursorPage extends CursorPage<SettlementDetail> {}

export interface SettlementDetail {
  /**
   * Globally unique identifier denoting the Settlement Detail.
   */
  token: string;

  /**
   * The most granular ID the network settles with (e.g., ICA for Mastercard, FTSRE
   * for Visa).
   */
  account_token: string;

  /**
   * Globally unique identifier denoting the card program that the associated
   * Transaction occurred on.
   */
  card_program_token: string;

  /**
   * Globally unique identifier denoting the card that the associated Transaction
   * occurred on.
   */
  card_token: string;

  /**
   * Date and time when the transaction first occurred. UTC time zone.
   */
  created: string;

  /**
   * Three-digit alphabetic ISO 4217 code.
   */
  currency: string;

  /**
   * The total gross amount of disputes settlements.
   */
  disputes_gross_amount: number;

  /**
   * Globally unique identifiers denoting the Events associated with this settlement.
   */
  event_tokens: Array<string>;

  /**
   * The most granular ID the network settles with (e.g., ICA for Mastercard, FTSRE
   * for Visa).
   */
  institution: string;

  /**
   * The total amount of interchange in six-digit extended precision.
   */
  interchange_fee_extended_precision: number;

  /**
   * The total amount of interchange.
   */
  interchange_gross_amount: number;

  /**
   * Card network where the transaction took place.
   */
  network: 'INTERLINK' | 'MAESTRO' | 'MASTERCARD' | 'UNKNOWN' | 'VISA';

  /**
   * The total gross amount of other fees by type.
   */
  other_fees_details: SettlementDetail.OtherFeesDetails;

  /**
   * Total amount of gross other fees outside of interchange.
   */
  other_fees_gross_amount: number;

  /**
   * Date of when the report was first generated.
   */
  report_date: string;

  /**
   * Date of when money movement is triggered for the transaction.
   */
  settlement_date: string;

  /**
   * Globally unique identifier denoting the associated Transaction object.
   */
  transaction_token: string;

  /**
   * The total amount of settlement impacting transactions (excluding interchange,
   * fees, and disputes).
   */
  transactions_gross_amount: number;

  /**
   * The type of settlement record.
   */
  type:
    | 'ADJUSTMENT'
    | 'ARBITRATION'
    | 'CHARGEBACK'
    | 'CLEARING'
    | 'FEE'
    | 'FINANCIAL'
    | 'NON-FINANCIAL'
    | 'PREARBITRATION'
    | 'REPRESENTMENT';

  /**
   * Date and time when the transaction first occurred. UTC time zone.
   */
  updated: string;
}

export namespace SettlementDetail {
  /**
   * The total gross amount of other fees by type.
   */
  export interface OtherFeesDetails {
    ISA?: number;
  }
}

export interface SettlementReport {
  /**
   * Date and time when the transaction first occurred. UTC time zone.
   */
  created: string;

  /**
   * @deprecated: Three-digit alphabetic ISO 4217 code. (This field is deprecated and
   * will be removed in a future version of the API.)
   */
  currency: string;

  details: Array<SettlementSummaryDetails>;

  /**
   * @deprecated: The total gross amount of disputes settlements. (This field is
   * deprecated and will be removed in a future version of the API. To compute total
   * amounts, Lithic recommends that customers sum the relevant settlement amounts
   * found within `details`.)
   */
  disputes_gross_amount: number;

  /**
   * @deprecated: The total amount of interchange. (This field is deprecated and will
   * be removed in a future version of the API. To compute total amounts, Lithic
   * recommends that customers sum the relevant settlement amounts found within
   * `details`.)
   */
  interchange_gross_amount: number;

  /**
   * Indicates that all data expected on the given report date is available.
   */
  is_complete: boolean;

  /**
   * @deprecated: Total amount of gross other fees outside of interchange. (This
   * field is deprecated and will be removed in a future version of the API. To
   * compute total amounts, Lithic recommends that customers sum the relevant
   * settlement amounts found within `details`.)
   */
  other_fees_gross_amount: number;

  /**
   * Date of when the report was first generated.
   */
  report_date: string;

  /**
   * @deprecated: The total net amount of cash moved. (net value of
   * settled_gross_amount, interchange, fees). (This field is deprecated and will be
   * removed in a future version of the API. To compute total amounts, Lithic
   * recommends that customers sum the relevant settlement amounts found within
   * `details`.)
   */
  settled_net_amount: number;

  /**
   * @deprecated: The total amount of settlement impacting transactions (excluding
   * interchange, fees, and disputes). (This field is deprecated and will be removed
   * in a future version of the API. To compute total amounts, Lithic recommends that
   * customers sum the relevant settlement amounts found within `details`.)
   */
  transactions_gross_amount: number;

  /**
   * Date and time when the transaction first occurred. UTC time zone.
   */
  updated: string;
}

export interface SettlementSummaryDetails {
  /**
   * ISO 4217 alpha 3 code.
   */
  currency?: string;

  /**
   * The total gross amount of disputes settlements.
   */
  disputes_gross_amount?: number;

  /**
   * The most granular ID the network settles with (e.g., ICA for Mastercard, FTSRE
   * for Visa).
   */
  institution?: string;

  /**
   * The total amount of interchange.
   */
  interchange_gross_amount?: number;

  /**
   * Card network where the transaction took place
   */
  network?: 'INTERLINK' | 'MAESTRO' | 'MASTERCARD' | 'UNKNOWN' | 'VISA';

  /**
   * Total amount of gross other fees outside of interchange.
   */
  other_fees_gross_amount?: number;

  /**
   * The total net amount of cash moved. (net value of settled_gross_amount,
   * interchange, fees).
   */
  settled_net_amount?: number;

  /**
   * The total amount of settlement impacting transactions (excluding interchange,
   * fees, and disputes).
   */
  transactions_gross_amount?: number;
}

export namespace Reports {
  export import SettlementDetail = ReportsAPI.SettlementDetail;
  export import SettlementReport = ReportsAPI.SettlementReport;
  export import SettlementSummaryDetails = ReportsAPI.SettlementSummaryDetails;
  export import Settlement = SettlementAPI.Settlement;
  export import SettlementListDetailsParams = SettlementAPI.SettlementListDetailsParams;
}
