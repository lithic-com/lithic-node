// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as SettlementAPI from './settlement/settlement';
import { Settlement, SettlementListDetailsParams } from './settlement/settlement';
import { CursorPage } from '../../core/pagination';

export class Reports extends APIResource {
  settlement: SettlementAPI.Settlement = new SettlementAPI.Settlement(this._client);
}

export type SettlementDetailsCursorPage = CursorPage<SettlementDetail>;

export type NetworkTotalsCursorPage = CursorPage<NetworkTotal>;

export interface NetworkTotal {
  /**
   * Globally unique identifier.
   */
  token: string;

  amounts: NetworkTotal.Amounts;

  /**
   * RFC 3339 timestamp for when the record was created. UTC time zone.
   */
  created: string;

  /**
   * 3-character alphabetic ISO 4217 code.
   */
  currency: string;

  /**
   * The institution that activity occurred on. For Mastercard: ICA (Interbank Card
   * Association). For Maestro: institution ID. For Visa: lowest level SRE
   * (Settlement Reporting Entity).
   */
  institution_id: string;

  /**
   * Indicates that all settlement records related to this Network Total are
   * available in the details endpoint.
   */
  is_complete: boolean;

  /**
   * Card network where the transaction took place. AMEX, VISA, MASTERCARD, MAESTRO,
   * or INTERLINK.
   */
  network: 'AMEX' | 'VISA' | 'MASTERCARD' | 'MAESTRO' | 'INTERLINK';

  /**
   * Date that the network total record applies to. YYYY-MM-DD format.
   */
  report_date: string;

  /**
   * The institution responsible for settlement. For Mastercard: same as
   * `institution_id`. For Maestro: billing ICA. For Visa: Funds Transfer SRE
   * (FTSRE).
   */
  settlement_institution_id: string;

  /**
   * Settlement service.
   */
  settlement_service: string;

  /**
   * RFC 3339 timestamp for when the record was last updated. UTC time zone.
   */
  updated: string;

  /**
   * The clearing cycle that the network total record applies to. Mastercard only.
   */
  cycle?: number;
}

export namespace NetworkTotal {
  export interface Amounts {
    /**
     * Total settlement amount excluding interchange, in currency's smallest unit.
     */
    gross_settlement: number;

    /**
     * Interchange amount, in currency's smallest unit.
     */
    interchange_fees: number;

    /**
     * `gross_settlement` net of `interchange_fees` and `visa_charges` (if applicable),
     * in currency's smallest unit.
     */
    net_settlement: number;

    /**
     * Charges specific to Visa/Interlink, in currency's smallest unit.
     */
    visa_charges?: number;
  }
}

export interface SettlementDetail {
  /**
   * Globally unique identifier denoting the Settlement Detail.
   */
  token: string;

  /**
   * Globally unique identifier denoting the account that the associated transaction
   * occurred on.
   */
  account_token: string;

  /**
   * Globally unique identifier denoting the card program that the associated
   * transaction occurred on.
   */
  card_program_token: string;

  /**
   * Globally unique identifier denoting the card that the associated transaction
   * occurred on.
   */
  card_token: string;

  /**
   * Date and time when the transaction first occurred. UTC time zone.
   */
  created: string;

  /**
   * Three-character alphabetic ISO 4217 code.
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
   * Date of when money movement is triggered for the transaction. One exception
   * applies - for Mastercard dual message settlement, this is the settlement
   * advisement date, which is distinct from the date of money movement.
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
    | 'COLLABORATION'
    | 'FEE'
    | 'FINANCIAL'
    | 'NON-FINANCIAL'
    | 'PREARBITRATION'
    | 'REPRESENTMENT';

  /**
   * Date and time when the transaction first occurred. UTC time zone.
   */
  updated: string;

  /**
   * Network's description of a fee, only present on records with type `FEE`.
   */
  fee_description?: string;
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
   * @deprecated 3-character alphabetic ISO 4217 code. (This field is deprecated and
   * will be removed in a future version of the API.)
   */
  currency: string;

  details: Array<SettlementSummaryDetails>;

  /**
   * @deprecated The total gross amount of disputes settlements. (This field is
   * deprecated and will be removed in a future version of the API. To compute total
   * amounts, Lithic recommends that customers sum the relevant settlement amounts
   * found within `details`.)
   */
  disputes_gross_amount: number;

  /**
   * @deprecated The total amount of interchange. (This field is deprecated and will
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
   * @deprecated Total amount of gross other fees outside of interchange. (This field
   * is deprecated and will be removed in a future version of the API. To compute
   * total amounts, Lithic recommends that customers sum the relevant settlement
   * amounts found within `details`.)
   */
  other_fees_gross_amount: number;

  /**
   * Date of when the report was first generated.
   */
  report_date: string;

  /**
   * @deprecated The total net amount of cash moved. (net value of
   * settled_gross_amount, interchange, fees). (This field is deprecated and will be
   * removed in a future version of the API. To compute total amounts, Lithic
   * recommends that customers sum the relevant settlement amounts found within
   * `details`.)
   */
  settled_net_amount: number;

  /**
   * @deprecated The total amount of settlement impacting transactions (excluding
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
   * 3-character alphabetic ISO 4217 code.
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

Reports.Settlement = Settlement;

export declare namespace Reports {
  export {
    type NetworkTotal as NetworkTotal,
    type SettlementDetail as SettlementDetail,
    type SettlementReport as SettlementReport,
    type SettlementSummaryDetails as SettlementSummaryDetails,
  };

  export { Settlement as Settlement, type SettlementListDetailsParams as SettlementListDetailsParams };
}
