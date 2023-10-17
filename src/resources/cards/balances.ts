// File generated from our OpenAPI spec by Stainless.

import * as Core from 'lithic/core';
import { APIResource } from 'lithic/resource';
import { isRequestOptions } from 'lithic/core';
import * as CardsBalancesAPI from 'lithic/resources/cards/balances';
import * as BalancesAPI from 'lithic/resources/balances';
import { BalancesSinglePage } from 'lithic/resources/balances';

export class Balances extends APIResource {
  /**
   * Get the balances for a given card.
   */
  list(
    cardToken: string,
    query?: BalanceListParams,
    options?: Core.RequestOptions,
  ): Core.PagePromise<BalancesSinglePage, BalancesAPI.Balance>;
  list(
    cardToken: string,
    options?: Core.RequestOptions,
  ): Core.PagePromise<BalancesSinglePage, BalancesAPI.Balance>;
  list(
    cardToken: string,
    query: BalanceListParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.PagePromise<BalancesSinglePage, BalancesAPI.Balance> {
    if (isRequestOptions(query)) {
      return this.list(cardToken, {}, query);
    }
    return this.getAPIList(`/cards/${cardToken}/balances`, BalancesSinglePage, { query, ...options });
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
  export import BalanceListParams = CardsBalancesAPI.BalanceListParams;
}

export { BalancesSinglePage };
