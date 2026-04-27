// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { PagePromise, SinglePage } from '../core/pagination';
import { RequestOptions } from '../internal/request-options';

export class TransferLimits extends APIResource {
  /**
   * Get transfer limits for a specified date
   */
  list(
    query: TransferLimitListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<TransferLimitsResponseDataSinglePage, TransferLimitsResponse.Data> {
    return this._client.getAPIList('/v1/transfer_limits', SinglePage<TransferLimitsResponse.Data>, {
      query,
      ...options,
    });
  }
}

export type TransferLimitsResponseDataSinglePage = SinglePage<TransferLimitsResponse.Data>;

export interface TransferLimitsResponse {
  /**
   * List of transfer limits
   */
  data: Array<TransferLimitsResponse.Data>;

  /**
   * Whether there are more transfer limits
   */
  has_more: boolean;
}

export namespace TransferLimitsResponse {
  export interface Data {
    /**
     * Company ID
     */
    company_id: string;

    /**
     * Daily limits with progress
     */
    daily_limit: Data.DailyLimit;

    /**
     * The date for the limit view (ISO format)
     */
    date: string;

    /**
     * Whether the company is a FBO; based on the company ID prefix
     */
    is_fbo: boolean;

    /**
     * Monthly limits with progress
     */
    monthly_limit: Data.MonthlyLimit;

    /**
     * Program transaction limits
     */
    program_limit_per_transaction: Data.ProgramLimitPerTransaction;
  }

  export namespace Data {
    /**
     * Daily limits with progress
     */
    export interface DailyLimit {
      /**
       * Credit limits
       */
      credit: DailyLimit.Credit;

      /**
       * Debit limits
       */
      debit: DailyLimit.Debit;
    }

    export namespace DailyLimit {
      /**
       * Credit limits
       */
      export interface Credit {
        /**
         * The limit amount
         */
        limit: number;

        /**
         * Amount originated towards limit
         */
        amount_originated?: number;
      }

      /**
       * Debit limits
       */
      export interface Debit {
        /**
         * The limit amount
         */
        limit: number;

        /**
         * Amount originated towards limit
         */
        amount_originated?: number;
      }
    }

    /**
     * Monthly limits with progress
     */
    export interface MonthlyLimit {
      /**
       * Credit limits
       */
      credit: MonthlyLimit.Credit;

      /**
       * Debit limits
       */
      debit: MonthlyLimit.Debit;
    }

    export namespace MonthlyLimit {
      /**
       * Credit limits
       */
      export interface Credit {
        /**
         * The limit amount
         */
        limit: number;

        /**
         * Amount originated towards limit
         */
        amount_originated?: number;
      }

      /**
       * Debit limits
       */
      export interface Debit {
        /**
         * The limit amount
         */
        limit: number;

        /**
         * Amount originated towards limit
         */
        amount_originated?: number;
      }
    }

    /**
     * Program transaction limits
     */
    export interface ProgramLimitPerTransaction {
      /**
       * Credit limits
       */
      credit: ProgramLimitPerTransaction.Credit;

      /**
       * Debit limits
       */
      debit: ProgramLimitPerTransaction.Debit;
    }

    export namespace ProgramLimitPerTransaction {
      /**
       * Credit limits
       */
      export interface Credit {
        /**
         * The limit amount
         */
        limit: number;

        /**
         * Amount originated towards limit
         */
        amount_originated?: number;
      }

      /**
       * Debit limits
       */
      export interface Debit {
        /**
         * The limit amount
         */
        limit: number;

        /**
         * Amount originated towards limit
         */
        amount_originated?: number;
      }
    }
  }
}

export interface TransferLimitListParams {
  /**
   * Date for which to retrieve transfer limits (ISO 8601 format)
   */
  date?: string;
}

export declare namespace TransferLimits {
  export {
    type TransferLimitsResponse as TransferLimitsResponse,
    type TransferLimitsResponseDataSinglePage as TransferLimitsResponseDataSinglePage,
    type TransferLimitListParams as TransferLimitListParams,
  };
}
