// File generated from our OpenAPI spec by Stainless.

import * as Core from '~/core';
import { APIResource } from '~/resource';
import { isRequestOptions } from '~/core';
import { BalancesSinglePage } from '~/resources/balances';
import * as API from './';

export class Balances extends APIResource {
  /**
   * Get the balances for a given financial account.
   */
  list(
    financialAccountToken: string,
    query?: BalanceListParams,
    options?: Core.RequestOptions,
  ): Core.PagePromise<BalancesSinglePage>;
  list(financialAccountToken: string, options?: Core.RequestOptions): Core.PagePromise<BalancesSinglePage>;
  list(
    financialAccountToken: string,
    query: BalanceListParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.PagePromise<BalancesSinglePage> {
    if (isRequestOptions(query)) {
      return this.list(financialAccountToken, {}, query);
    }
    return this.getAPIList(`/financial_accounts/${financialAccountToken}/balances`, BalancesSinglePage, {
      query,
      ...options,
    });
  }
}

export interface BalanceListParams {
  /**
   * UTC date of the balance to retrieve. Defaults to latest available balance
   */
  balance_date?: string;

  /**
   * Balance after a given financial event occured. For example, passing the
   * event_token of a $5 CARD_CLEARING financial event will return a balance
   * decreased by $5
   */
  last_transaction_event_token?: string;
}

export namespace Balances {
  export import BalanceListParams = API.BalanceListParams;
}

export { BalancesSinglePage };
