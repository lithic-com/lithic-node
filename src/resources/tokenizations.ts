// File generated from our OpenAPI spec by Stainless.

import * as Core from 'lithic/core';
import { APIResource } from 'lithic/resource';
import { isRequestOptions } from 'lithic/core';
import * as TokenizationsAPI from 'lithic/resources/tokenizations';
import { CursorPage, type CursorPageParams } from 'lithic/pagination';

export class Tokenizations extends APIResource {
  /**
   * Get tokenization
   */
  retrieve(
    tokenizationToken: string,
    options?: Core.RequestOptions,
  ): Core.APIPromise<TokenizationRetrieveResponse> {
    return this._client.get(`/tokenizations/${tokenizationToken}`, options);
  }

  /**
   * List card tokenizations
   */
  list(
    query?: TokenizationListParams,
    options?: Core.RequestOptions,
  ): Core.PagePromise<TokenizationsCursorPage, Tokenization>;
  list(options?: Core.RequestOptions): Core.PagePromise<TokenizationsCursorPage, Tokenization>;
  list(
    query: TokenizationListParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.PagePromise<TokenizationsCursorPage, Tokenization> {
    if (isRequestOptions(query)) {
      return this.list({}, query);
    }
    return this._client.getAPIList('/tokenizations', TokenizationsCursorPage, { query, ...options });
  }

  /**
   * This endpoint is used to simulate a card's tokenization in the Digital Wallet
   * and merchant tokenization ecosystem.
   */
  simulate(
    body: TokenizationSimulateParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<TokenizationSimulateResponse> {
    return this._client.post('/simulate/tokenizations', { body, ...options });
  }
}

export class TokenizationsCursorPage extends CursorPage<Tokenization> {}

export interface Tokenization {
  /**
   * Globally unique identifier for a Tokenization
   */
  token: string;

  /**
   * The account token associated with the card being tokenized.
   */
  account_token: string;

  /**
   * The card token associated with the card being tokenized.
   */
  card_token: string;

  /**
   * Date and time when the tokenization first occurred. UTC time zone.
   */
  created_at: string;

  /**
   * The status of the tokenization request
   */
  status: 'ACTIVE' | 'DEACTIVATED' | 'INACTIVE' | 'PAUSED' | 'PENDING_2FA' | 'PENDING_ACTIVATION' | 'UNKNOWN';

  /**
   * The entity that is requested the tokenization. Represents a Digital Wallet.
   */
  token_requestor_name:
    | 'AMAZON_ONE'
    | 'ANDROID_PAY'
    | 'APPLE_PAY'
    | 'FITBIT_PAY'
    | 'GARMIN_PAY'
    | 'MICROSOFT_PAY'
    | 'SAMSUNG_PAY'
    | 'UNKNOWN'
    | 'VISA_CHECKOUT';

  /**
   * The network's unique reference for the tokenization.
   */
  token_unique_reference: string;

  /**
   * Latest date and time when the tokenization was updated. UTC time zone.
   */
  updated_at: string;

  /**
   * A list of events related to the tokenization.
   */
  events?: Array<Tokenization.Event>;
}

export namespace Tokenization {
  export interface Event {
    /**
     * Globally unique identifier for a Tokenization Event
     */
    token?: string;

    /**
     * Date and time when the tokenization event first occurred. UTC time zone.
     */
    created_at?: string;

    /**
     * Enum representing the result of the tokenization event
     */
    result?:
      | 'APPROVED'
      | 'DECLINED'
      | 'NOTIFICATION_DELIVERED'
      | 'REQUIRE_ADDITIONAL_AUTHENTICATION'
      | 'TOKEN_ACTIVATED'
      | 'TOKEN_CREATED'
      | 'TOKEN_DEACTIVATED'
      | 'TOKEN_INACTIVE'
      | 'TOKEN_STATE_UNKNOWN'
      | 'TOKEN_SUSPENDED'
      | 'TOKEN_UPDATED';

    /**
     * Enum representing the type of tokenization event that occurred
     */
    type?:
      | 'TOKENIZATION_2FA'
      | 'TOKENIZATION_AUTHORIZATION'
      | 'TOKENIZATION_DECISIONING'
      | 'TOKENIZATION_ELIGIBILITY_CHECK'
      | 'TOKENIZATION_UPDATED';
  }
}

export interface TokenizationRetrieveResponse {
  data?: Tokenization;
}

export interface TokenizationSimulateResponse {
  data?: Array<Tokenization>;
}

export interface TokenizationListParams extends CursorPageParams {
  /**
   * Filters for tokenizations associated with a specific account.
   */
  account_token?: string;

  /**
   * Filter for tokenizations created after this date.
   */
  begin?: string;

  /**
   * Filters for tokenizations associated with a specific card.
   */
  card_token?: string;

  /**
   * Filter for tokenizations created before this date.
   */
  end?: string;
}

export interface TokenizationSimulateParams {
  /**
   * The three digit cvv for the card.
   */
  cvv: string;

  /**
   * The expiration date of the card in 'MM/YY' format.
   */
  expiration_date: string;

  /**
   * The sixteen digit card number.
   */
  pan: string;

  /**
   * The source of the tokenization request.
   */
  tokenization_source: 'APPLE_PAY' | 'GOOGLE' | 'SAMSUNG_PAY';

  /**
   * The account score (1-5) that represents how the Digital Wallet's view on how
   * reputable an end user's account is.
   */
  account_score?: number;

  /**
   * The device score (1-5) that represents how the Digital Wallet's view on how
   * reputable an end user's device is.
   */
  device_score?: number;

  /**
   * The decision that the Digital Wallet's recommend
   */
  wallet_recommended_decision?: 'APPROVED' | 'DECLINED' | 'REQUIRE_ADDITIONAL_AUTHENTICATION';
}

export namespace Tokenizations {
  export import Tokenization = TokenizationsAPI.Tokenization;
  export import TokenizationRetrieveResponse = TokenizationsAPI.TokenizationRetrieveResponse;
  export import TokenizationSimulateResponse = TokenizationsAPI.TokenizationSimulateResponse;
  export import TokenizationsCursorPage = TokenizationsAPI.TokenizationsCursorPage;
  export import TokenizationListParams = TokenizationsAPI.TokenizationListParams;
  export import TokenizationSimulateParams = TokenizationsAPI.TokenizationSimulateParams;
}
