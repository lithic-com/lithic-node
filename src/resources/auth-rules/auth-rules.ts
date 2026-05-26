// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as V2API from './v2/v2';
import {
  AuthRule,
  AuthRuleCondition,
  AuthRuleVersion,
  AuthRulesCursorPage,
  BacktestStats,
  CardTransactionUpdateAction,
  Conditional3DSActionParameters,
  ConditionalACHActionParameters,
  ConditionalAttribute,
  ConditionalAuthorizationActionParameters,
  ConditionalAuthorizationAdjustmentParameters,
  ConditionalBlockParameters,
  ConditionalCardTransactionUpdateActionParameters,
  ConditionalOperation,
  ConditionalTokenizationActionParameters,
  ConditionalValue,
  EventStream,
  MerchantLockParameters,
  ReportStats,
  RuleFeature,
  SpendVelocityFilters,
  TypescriptCodeParameters,
  V2,
  V2CreateParams,
  V2DraftParams,
  V2ListParams,
  V2ListResultsParams,
  V2ListResultsResponse,
  V2ListResultsResponsesCursorPage,
  V2ListVersionsResponse,
  V2RetrieveFeaturesParams,
  V2RetrieveFeaturesResponse,
  V2RetrieveReportParams,
  V2RetrieveReportResponse,
  V2UpdateParams,
  VelocityLimitFilters,
  VelocityLimitParams,
  VelocityLimitPeriod,
} from './v2/v2';

export class AuthRules extends APIResource {
  v2: V2API.V2 = new V2API.V2(this._client);
}

/**
 * Behavioral feature state for a card or account derived from its transaction
 * history.
 *
 * Derived statistical features (averages, standard deviations, z-scores) are
 * computed using Welford's online algorithm over approved transactions. Average
 * fields are null when fewer than 5 approved transactions have been recorded.
 * Standard deviation fields are null when fewer than 30 approved transactions have
 * been recorded.
 *
 * 3DS fields (`three_ds_success_rate`, `three_ds_success_count`,
 * `three_ds_total_count`) are card-scoped and will be null for account responses.
 *
 * Raw fields (`seen_countries`, `seen_mccs`, `approved_txn_amount_m2`, etc.) are
 * included so clients can compute their own transaction-specific derivations, such
 * as checking whether a new transaction's country is in `seen_countries` to
 * determine `is_new_country`, or computing a z-score using the raw mean and M2
 * values.
 */
export interface SignalsResponse {
  /**
   * The Welford M2 accumulator for lifetime approved transaction amounts. Used
   * together with `avg_transaction_amount` and `approved_txn_count` to compute the
   * z-score of a new transaction amount (variance = M2 / (count - 1)).
   */
  approved_txn_amount_m2: number | null;

  /**
   * The Welford M2 accumulator for approved transaction amounts over the last 30
   * days.
   */
  approved_txn_amount_m2_30d: number | null;

  /**
   * The Welford M2 accumulator for approved transaction amounts over the last 7
   * days.
   */
  approved_txn_amount_m2_7d: number | null;

  /**
   * The Welford M2 accumulator for approved transaction amounts over the last 90
   * days.
   */
  approved_txn_amount_m2_90d: number | null;

  /**
   * The total number of approved transactions over the entity's lifetime.
   */
  approved_txn_count: number | null;

  /**
   * The number of approved transactions in the last 30 days.
   */
  approved_txn_count_30d: number | null;

  /**
   * The number of approved transactions in the last 7 days.
   */
  approved_txn_count_7d: number | null;

  /**
   * The number of approved transactions in the last 90 days.
   */
  approved_txn_count_90d: number | null;

  /**
   * The average approved transaction amount over the entity's lifetime, in cents.
   * Null if fewer than 5 approved transactions have been recorded.
   */
  avg_transaction_amount: number | null;

  /**
   * The average approved transaction amount over the last 30 days, in cents. Null if
   * fewer than 5 approved transactions in window.
   */
  avg_transaction_amount_30d: number | null;

  /**
   * The average approved transaction amount over the last 7 days, in cents. Null if
   * fewer than 5 approved transactions in window.
   */
  avg_transaction_amount_7d: number | null;

  /**
   * The average approved transaction amount over the last 90 days, in cents. Null if
   * fewer than 5 approved transactions in window.
   */
  avg_transaction_amount_90d: number | null;

  /**
   * The number of distinct merchant countries seen in the entity's transaction
   * history.
   */
  distinct_country_count: number | null;

  /**
   * The number of distinct MCCs seen in the entity's transaction history.
   */
  distinct_mcc_count: number | null;

  /**
   * The timestamp of the first approved transaction for the entity, in ISO 8601
   * format.
   */
  first_txn_at: string | null;

  /**
   * Whether the entity has no prior transaction history. Returns true if no history
   * is found. Null if transaction history exists but a first transaction timestamp
   * is unavailable.
   */
  is_first_transaction: boolean | null;

  /**
   * The merchant country of the last card-present transaction.
   */
  last_cp_country: string | null;

  /**
   * The merchant postal code of the last card-present transaction.
   */
  last_cp_postal_code: string | null;

  /**
   * The timestamp of the last card-present transaction, in ISO 8601 format.
   */
  last_cp_timestamp: string | null;

  /**
   * The timestamp of the most recent approved transaction for the entity, in ISO
   * 8601 format.
   */
  last_txn_approved_at: string | null;

  /**
   * The set of merchant countries seen in the entity's transaction history. Clients
   * can use this to determine whether a new transaction's country is novel (i.e.
   * compute `is_new_country`).
   */
  seen_countries: Array<string> | null;

  /**
   * The set of MCCs seen in the entity's transaction history. Clients can use this
   * to determine whether a new transaction's MCC is novel (i.e. compute
   * `is_new_mcc`).
   */
  seen_mccs: Array<string> | null;

  /**
   * The set of card acceptor IDs seen in the card's approved transaction history,
   * capped at the 1000 most recently seen. Null for account responses. Clients can
   * use this to determine whether a new transaction's merchant is novel (i.e.
   * compute `is_new_merchant`).
   */
  seen_merchants: Array<string> | null;

  /**
   * The standard deviation of approved transaction amounts over the entity's
   * lifetime, in cents. Null if fewer than 30 approved transactions have been
   * recorded.
   */
  stdev_transaction_amount: number | null;

  /**
   * The standard deviation of approved transaction amounts over the last 30 days, in
   * cents. Null if fewer than 30 approved transactions in window.
   */
  stdev_transaction_amount_30d: number | null;

  /**
   * The standard deviation of approved transaction amounts over the last 7 days, in
   * cents. Null if fewer than 30 approved transactions in window.
   */
  stdev_transaction_amount_7d: number | null;

  /**
   * The standard deviation of approved transaction amounts over the last 90 days, in
   * cents. Null if fewer than 30 approved transactions in window.
   */
  stdev_transaction_amount_90d: number | null;

  /**
   * The number of successful 3DS authentications for the card. Null for account
   * responses.
   */
  three_ds_success_count: number | null;

  /**
   * The 3DS authentication success rate for the card, as a percentage from 0.0 to
   * 100.0. Null for account responses.
   */
  three_ds_success_rate: number | null;

  /**
   * The total number of 3DS authentication attempts for the card. Null for account
   * responses.
   */
  three_ds_total_count: number | null;

  /**
   * The number of days since the last approved transaction on the entity.
   */
  time_since_last_transaction_days: number | null;
}

AuthRules.V2 = V2;

export declare namespace AuthRules {
  export { type SignalsResponse as SignalsResponse };

  export {
    V2 as V2,
    type AuthRule as AuthRule,
    type AuthRuleCondition as AuthRuleCondition,
    type AuthRuleVersion as AuthRuleVersion,
    type BacktestStats as BacktestStats,
    type CardTransactionUpdateAction as CardTransactionUpdateAction,
    type Conditional3DSActionParameters as Conditional3DSActionParameters,
    type ConditionalACHActionParameters as ConditionalACHActionParameters,
    type ConditionalAttribute as ConditionalAttribute,
    type ConditionalAuthorizationActionParameters as ConditionalAuthorizationActionParameters,
    type ConditionalAuthorizationAdjustmentParameters as ConditionalAuthorizationAdjustmentParameters,
    type ConditionalBlockParameters as ConditionalBlockParameters,
    type ConditionalCardTransactionUpdateActionParameters as ConditionalCardTransactionUpdateActionParameters,
    type ConditionalOperation as ConditionalOperation,
    type ConditionalTokenizationActionParameters as ConditionalTokenizationActionParameters,
    type ConditionalValue as ConditionalValue,
    type EventStream as EventStream,
    type MerchantLockParameters as MerchantLockParameters,
    type ReportStats as ReportStats,
    type RuleFeature as RuleFeature,
    type SpendVelocityFilters as SpendVelocityFilters,
    type TypescriptCodeParameters as TypescriptCodeParameters,
    type VelocityLimitFilters as VelocityLimitFilters,
    type VelocityLimitParams as VelocityLimitParams,
    type VelocityLimitPeriod as VelocityLimitPeriod,
    type V2ListResultsResponse as V2ListResultsResponse,
    type V2ListVersionsResponse as V2ListVersionsResponse,
    type V2RetrieveFeaturesResponse as V2RetrieveFeaturesResponse,
    type V2RetrieveReportResponse as V2RetrieveReportResponse,
    type AuthRulesCursorPage as AuthRulesCursorPage,
    type V2ListResultsResponsesCursorPage as V2ListResultsResponsesCursorPage,
    type V2CreateParams as V2CreateParams,
    type V2UpdateParams as V2UpdateParams,
    type V2ListParams as V2ListParams,
    type V2DraftParams as V2DraftParams,
    type V2ListResultsParams as V2ListResultsParams,
    type V2RetrieveFeaturesParams as V2RetrieveFeaturesParams,
    type V2RetrieveReportParams as V2RetrieveReportParams,
  };
}
