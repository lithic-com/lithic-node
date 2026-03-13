// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { PagePromise, SinglePage } from '../../core/pagination';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class InterestTierScheduleResource extends APIResource {
  /**
   * Create a new interest tier schedule entry for a supported financial account
   *
   * @example
   * ```ts
   * const interestTierSchedule =
   *   await client.financialAccounts.interestTierSchedule.create(
   *     '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   *     {
   *       credit_product_token: 'credit_product_token',
   *       effective_date: '2019-12-27',
   *     },
   *   );
   * ```
   */
  create(
    financialAccountToken: string,
    body: InterestTierScheduleCreateParams,
    options?: RequestOptions,
  ): APIPromise<InterestTierSchedule> {
    return this._client.post(path`/v1/financial_accounts/${financialAccountToken}/interest_tier_schedule`, {
      body,
      ...options,
    });
  }

  /**
   * Get a specific interest tier schedule by effective date
   *
   * @example
   * ```ts
   * const interestTierSchedule =
   *   await client.financialAccounts.interestTierSchedule.retrieve(
   *     '2019-12-27',
   *     {
   *       financial_account_token:
   *         '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   *     },
   *   );
   * ```
   */
  retrieve(
    effectiveDate: string,
    params: InterestTierScheduleRetrieveParams,
    options?: RequestOptions,
  ): APIPromise<InterestTierSchedule> {
    const { financial_account_token } = params;
    return this._client.get(
      path`/v1/financial_accounts/${financial_account_token}/interest_tier_schedule/${effectiveDate}`,
      options,
    );
  }

  /**
   * Update an existing interest tier schedule
   *
   * @example
   * ```ts
   * const interestTierSchedule =
   *   await client.financialAccounts.interestTierSchedule.update(
   *     '2019-12-27',
   *     {
   *       financial_account_token:
   *         '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   *     },
   *   );
   * ```
   */
  update(
    effectiveDate: string,
    params: InterestTierScheduleUpdateParams,
    options?: RequestOptions,
  ): APIPromise<InterestTierSchedule> {
    const { financial_account_token, ...body } = params;
    return this._client.put(
      path`/v1/financial_accounts/${financial_account_token}/interest_tier_schedule/${effectiveDate}`,
      { body, ...options },
    );
  }

  /**
   * List interest tier schedules for a financial account with optional date
   * filtering.
   *
   * If no date parameters are provided, returns all tier schedules. If date
   * parameters are provided, uses filtering to return matching schedules (max 100).
   *
   * - for_date: Returns exact match (takes precedence over other dates)
   * - before_date: Returns schedules with effective_date <= before_date
   * - after_date: Returns schedules with effective_date >= after_date
   * - Both before_date and after_date: Returns schedules in range
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const interestTierSchedule of client.financialAccounts.interestTierSchedule.list(
   *   '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   * )) {
   *   // ...
   * }
   * ```
   */
  list(
    financialAccountToken: string,
    query: InterestTierScheduleListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<InterestTierSchedulesSinglePage, InterestTierSchedule> {
    return this._client.getAPIList(
      path`/v1/financial_accounts/${financialAccountToken}/interest_tier_schedule`,
      SinglePage<InterestTierSchedule>,
      { query, ...options },
    );
  }

  /**
   * Delete an interest tier schedule entry.
   *
   * Returns:
   *
   * - 400 Bad Request: Invalid effective_date format OR attempting to delete the
   *   earliest tier schedule entry for a non-PENDING account
   * - 404 Not Found: Tier schedule entry not found for the given effective_date OR
   *   ledger account not found
   *
   * Note: PENDING accounts can delete the earliest tier schedule entry (account
   * hasn't opened yet). Active/non-PENDING accounts cannot delete the earliest entry
   * to prevent orphaning the account.
   *
   * If the deleted tier schedule has a past effective_date and the account is
   * ACTIVE, the loan tape rebuild configuration will be updated to trigger rebuilds
   * from that date.
   *
   * @example
   * ```ts
   * await client.financialAccounts.interestTierSchedule.delete(
   *   '2019-12-27',
   *   {
   *     financial_account_token:
   *       '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   *   },
   * );
   * ```
   */
  delete(
    effectiveDate: string,
    params: InterestTierScheduleDeleteParams,
    options?: RequestOptions,
  ): APIPromise<void> {
    const { financial_account_token } = params;
    return this._client.delete(
      path`/v1/financial_accounts/${financial_account_token}/interest_tier_schedule/${effectiveDate}`,
      options,
    );
  }
}

export type InterestTierSchedulesSinglePage = SinglePage<InterestTierSchedule>;

/**
 * Rate and rate cap for interest on a category
 */
export interface CategoryTier {
  /**
   * Maximum interest rate for this category, e.g. '0.0525' for 5.25%
   */
  cap_rate?: string;

  /**
   * Interest rate for this category, e.g. '0.0525' for 5.25%
   */
  rate?: string;
}

/**
 * Entry in the Tier Schedule of an account
 */
export interface InterestTierSchedule {
  /**
   * Globally unique identifier for a credit product
   */
  credit_product_token: string;

  /**
   * Date the tier should be effective in YYYY-MM-DD format
   */
  effective_date: string;

  /**
   * Name of a tier contained in the credit product. Mutually exclusive with
   * tier_rates
   */
  tier_name?: string;

  /**
   * Custom rates per category. Mutually exclusive with tier_name
   */
  tier_rates?: unknown;
}

export interface InterestTierScheduleCreateParams {
  /**
   * Globally unique identifier for a credit product
   */
  credit_product_token: string;

  /**
   * Date the tier should be effective in YYYY-MM-DD format
   */
  effective_date: string;

  /**
   * Name of a tier contained in the credit product. Mutually exclusive with
   * tier_rates
   */
  tier_name?: string;

  /**
   * Custom rates per category. Mutually exclusive with tier_name
   */
  tier_rates?: unknown;
}

export interface InterestTierScheduleRetrieveParams {
  /**
   * Globally unique identifier for financial account
   */
  financial_account_token: string;
}

export interface InterestTierScheduleUpdateParams {
  /**
   * Path param: Globally unique identifier for financial account
   */
  financial_account_token: string;

  /**
   * Body param: Name of a tier contained in the credit product. Mutually exclusive
   * with tier_rates
   */
  tier_name?: string;

  /**
   * Body param: Custom rates per category. Mutually exclusive with tier_name
   */
  tier_rates?: unknown;
}

export interface InterestTierScheduleListParams {
  /**
   * Return schedules with effective_date >= after_date (ISO format YYYY-MM-DD)
   */
  after_date?: string;

  /**
   * Return schedules with effective_date <= before_date (ISO format YYYY-MM-DD)
   */
  before_date?: string;

  /**
   * Return schedule with effective_date == for_date (ISO format YYYY-MM-DD)
   */
  for_date?: string;
}

export interface InterestTierScheduleDeleteParams {
  /**
   * Globally unique identifier for financial account
   */
  financial_account_token: string;
}

export declare namespace InterestTierScheduleResource {
  export {
    type CategoryTier as CategoryTier,
    type InterestTierSchedule as InterestTierSchedule,
    type InterestTierSchedulesSinglePage as InterestTierSchedulesSinglePage,
    type InterestTierScheduleCreateParams as InterestTierScheduleCreateParams,
    type InterestTierScheduleRetrieveParams as InterestTierScheduleRetrieveParams,
    type InterestTierScheduleUpdateParams as InterestTierScheduleUpdateParams,
    type InterestTierScheduleListParams as InterestTierScheduleListParams,
    type InterestTierScheduleDeleteParams as InterestTierScheduleDeleteParams,
  };
}
