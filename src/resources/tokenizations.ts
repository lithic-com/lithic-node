// File generated from our OpenAPI spec by Stainless.

import * as Core from 'lithic/core';
import { APIResource } from 'lithic/resource';
import * as TokenizationsAPI from 'lithic/resources/tokenizations';

export class Tokenizations extends APIResource {
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

export interface Tokenization {
  /**
   * A fixed-width 23-digit numeric identifier for the Transaction that may be set if
   * the transaction originated from the Mastercard network. This number may be used
   * for dispute tracking.
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
  status: 'APPROVED' | 'DECLINED' | 'REQUIRE_ADDITIONAL_AUTHENTICATION';

  /**
   * The entity that is requested the tokenization. Represents a Digital Wallet.
   */
  token_requestor_name: 'APPLE_PAY' | 'GOOGLE' | 'SAMSUNG_PAY';

  /**
   * The network's unique reference for the tokenization.
   */
  token_unique_reference: string;

  /**
   * Latest date and time when the tokenization was updated. UTC time zone.
   */
  updated_at: string;
}

export interface TokenizationSimulateResponse {
  data?: Array<Tokenization>;
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
  export import TokenizationSimulateResponse = TokenizationsAPI.TokenizationSimulateResponse;
  export import TokenizationSimulateParams = TokenizationsAPI.TokenizationSimulateParams;
}
