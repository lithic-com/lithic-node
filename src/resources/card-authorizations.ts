// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as Shared from './shared';
import * as TransactionsAPI from './transactions/transactions';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class CardAuthorizations extends APIResource {
  /**
   * Card program's response to Authorization Challenge. Programs that have
   * Authorization Challenges configured as Out of Band receive a
   * [card_authorization.challenge](https://docs.lithic.com/reference/post_card-authorization-challenge)
   * webhook when an authorization attempt triggers a challenge. The card program
   * should respond using this endpoint after the cardholder completes the challenge.
   */
  challengeResponse(
    eventToken: string,
    body: CardAuthorizationChallengeResponseParams,
    options?: RequestOptions,
  ): APIPromise<void> {
    return this._client.post(path`/v1/card_authorizations/${eventToken}/challenge_response`, {
      body,
      ...options,
    });
  }
}

/**
 * Card Authorization
 */
export interface CardAuthorization {
  /**
   * The provisional transaction group uuid associated with the authorization
   */
  token: string;

  /**
   * Fee (in cents) assessed by the merchant and paid for by the cardholder. Will be
   * zero if no fee is assessed. Rebates may be transmitted as a negative value to
   * indicate credited fees.
   */
  acquirer_fee: number;

  /**
   * @deprecated Deprecated, use `amounts`. Authorization amount of the transaction
   * (in cents), including any acquirer fees. The contents of this field are
   * identical to `authorization_amount`.
   */
  amount: number;

  /**
   * Structured amounts for this authorization. The `cardholder` and `merchant`
   * amounts reflect the original network authorization values. For programs with
   * hold adjustments enabled (e.g., automated fuel dispensers or tipping MCCs), the
   * `hold` amount may exceed the `cardholder` and `merchant` amounts to account for
   * anticipated final transaction amounts such as tips or fuel fill-ups
   */
  amounts: CardAuthorization.Amounts;

  /**
   * @deprecated Deprecated, use `amounts`. The base transaction amount (in cents)
   * plus the acquirer fee field. This is the amount the issuer should authorize
   * against unless the issuer is paying the acquirer fee on behalf of the
   * cardholder.
   */
  authorization_amount: number;

  avs: CardAuthorization.Avs;

  /**
   * Card object in ASA
   */
  card: CardAuthorization.Card;

  /**
   * @deprecated Deprecated, use `amounts`. 3-character alphabetic ISO 4217 code for
   * cardholder's billing currency.
   */
  cardholder_currency: string;

  /**
   * The portion of the transaction requested as cash back by the cardholder, and
   * does not include any acquirer fees. The amount field includes the purchase
   * amount, the requested cash back amount, and any acquirer fees.
   *
   * If no cash back was requested, the value of this field will be 0, and the field
   * will always be present.
   */
  cash_amount: number;

  /**
   * Date and time when the transaction first occurred in UTC.
   */
  created: string;

  /**
   * Merchant information including full location details.
   */
  merchant: CardAuthorization.Merchant;

  /**
   * @deprecated Deprecated, use `amounts`. The amount that the merchant will
   * receive, denominated in `merchant_currency` and in the smallest currency unit.
   * Note the amount includes `acquirer_fee`, similar to `authorization_amount`. It
   * will be different from `authorization_amount` if the merchant is taking payment
   * in a different currency.
   */
  merchant_amount: number;

  /**
   * @deprecated 3-character alphabetic ISO 4217 code for the local currency of the
   * transaction.
   */
  merchant_currency: string;

  /**
   * Where the cardholder received the service, when different from the card acceptor
   * location. This is populated from network data elements such as Mastercard DE-122
   * SE1 SF9-14 and Visa F34 DS02.
   */
  service_location: CardAuthorization.ServiceLocation | null;

  /**
   * @deprecated Deprecated, use `amounts`. Amount (in cents) of the transaction that
   * has been settled, including any acquirer fees.
   */
  settled_amount: number;

  /**
   * The type of authorization request that this request is for. Note that
   * `CREDIT_AUTHORIZATION` and `FINANCIAL_CREDIT_AUTHORIZATION` is only available to
   * users with credit decisioning via ASA enabled.
   */
  status:
    | 'AUTHORIZATION'
    | 'CREDIT_AUTHORIZATION'
    | 'FINANCIAL_AUTHORIZATION'
    | 'FINANCIAL_CREDIT_AUTHORIZATION'
    | 'BALANCE_INQUIRY';

  /**
   * The entity that initiated the transaction.
   */
  transaction_initiator: 'CARDHOLDER' | 'MERCHANT' | 'UNKNOWN';

  account_type?: 'CHECKING' | 'SAVINGS';

  cardholder_authentication?: TransactionsAPI.CardholderAuthentication;

  /**
   * Deprecated, use `cash_amount`.
   */
  cashback?: number;

  /**
   * @deprecated Deprecated, use `amounts`. If the transaction was requested in a
   * currency other than the settlement currency, this field will be populated to
   * indicate the rate used to translate the merchant_amount to the amount (i.e.,
   * `merchant_amount` x `conversion_rate` = `amount`). Note that the
   * `merchant_amount` is in the local currency and the amount is in the settlement
   * currency.
   */
  conversion_rate?: number;

  /**
   * The event token associated with the authorization. This field is only set for
   * programs enrolled into the beta.
   */
  event_token?: string;

  /**
   * Optional Object containing information if the Card is a part of a Fleet managed
   * program
   */
  fleet_info?: CardAuthorization.FleetInfo | null;

  /**
   * The latest Authorization Challenge that was issued to the cardholder for this
   * merchant.
   */
  latest_challenge?: CardAuthorization.LatestChallenge;

  /**
   * Card network of the authorization.
   */
  network?: 'AMEX' | 'INTERLINK' | 'MAESTRO' | 'MASTERCARD' | 'UNKNOWN' | 'VISA';

  /**
   * Network-provided score assessing risk level associated with a given
   * authorization. Scores are on a range of 0-999, with 0 representing the lowest
   * risk and 999 representing the highest risk. For Visa transactions, where the raw
   * score has a range of 0-99, Lithic will normalize the score by multiplying the
   * raw score by 10x.
   */
  network_risk_score?: number | null;

  /**
   * Contains raw data provided by the card network, including attributes that
   * provide further context about the authorization. If populated by the network,
   * data is organized by Lithic and passed through without further modification.
   * Please consult the official network documentation for more details about these
   * values and how to use them. This object is only available to certain programs-
   * contact your Customer Success Manager to discuss enabling access.
   */
  network_specific_data?: CardAuthorization.NetworkSpecificData | null;

  pos?: CardAuthorization.Pos;

  token_info?: TransactionsAPI.TokenInfo | null;

  /**
   * Deprecated: approximate time-to-live for the authorization.
   */
  ttl?: string;
}

export namespace CardAuthorization {
  /**
   * Structured amounts for this authorization. The `cardholder` and `merchant`
   * amounts reflect the original network authorization values. For programs with
   * hold adjustments enabled (e.g., automated fuel dispensers or tipping MCCs), the
   * `hold` amount may exceed the `cardholder` and `merchant` amounts to account for
   * anticipated final transaction amounts such as tips or fuel fill-ups
   */
  export interface Amounts {
    cardholder: Amounts.Cardholder;

    hold: Amounts.Hold | null;

    merchant: Amounts.Merchant;

    settlement: Amounts.Settlement | null;
  }

  export namespace Amounts {
    export interface Cardholder {
      /**
       * Amount in the smallest unit of the applicable currency (e.g., cents)
       */
      amount: number;

      /**
       * Exchange rate used for currency conversion
       */
      conversion_rate: string;

      /**
       * 3-character alphabetic ISO 4217 currency
       */
      currency: Shared.Currency;
    }

    export interface Hold {
      /**
       * Amount in the smallest unit of the applicable currency (e.g., cents)
       */
      amount: number;

      /**
       * 3-character alphabetic ISO 4217 currency
       */
      currency: Shared.Currency;
    }

    export interface Merchant {
      /**
       * Amount in the smallest unit of the applicable currency (e.g., cents)
       */
      amount: number;

      /**
       * 3-character alphabetic ISO 4217 currency
       */
      currency: Shared.Currency;
    }

    export interface Settlement {
      /**
       * Amount in the smallest unit of the applicable currency (e.g., cents)
       */
      amount: number;

      /**
       * 3-character alphabetic ISO 4217 currency
       */
      currency: Shared.Currency;
    }
  }

  export interface Avs {
    /**
     * Cardholder address
     */
    address: string;

    /**
     * Lithic's evaluation result comparing the transaction's address data with the
     * cardholder KYC data if it exists. In the event Lithic does not have any
     * Cardholder KYC data, or the transaction does not contain any address data,
     * NOT_PRESENT will be returned
     */
    address_on_file_match: 'MATCH' | 'MATCH_ADDRESS_ONLY' | 'MATCH_ZIP_ONLY' | 'MISMATCH' | 'NOT_PRESENT';

    /**
     * Cardholder ZIP code
     */
    zipcode: string;
  }

  /**
   * Card object in ASA
   */
  export interface Card {
    /**
     * Globally unique identifier for the card.
     */
    token: string;

    /**
     * Last four digits of the card number
     */
    last_four: string;

    /**
     * Customizable name to identify the card
     */
    memo: string;

    /**
     * Amount (in cents) to limit approved authorizations. Purchase requests above the
     * spend limit will be declined (refunds and credits will be approved).
     *
     * Note that while spend limits are enforced based on authorized and settled volume
     * on a card, they are not recommended to be used for balance or
     * reconciliation-level accuracy. Spend limits also cannot block force posted
     * charges (i.e., when a merchant sends a clearing message without a prior
     * authorization).
     */
    spend_limit: number;

    /**
     * Note that to support recurring monthly payments, which can occur on different
     * day every month, the time window we consider for MONTHLY velocity starts 6 days
     * after the current calendar date one month prior.
     */
    spend_limit_duration: 'ANNUALLY' | 'FOREVER' | 'MONTHLY' | 'TRANSACTION';

    state: 'CLOSED' | 'OPEN' | 'PAUSED' | 'PENDING_ACTIVATION' | 'PENDING_FULFILLMENT';

    type: 'SINGLE_USE' | 'MERCHANT_LOCKED' | 'UNLOCKED' | 'PHYSICAL' | 'DIGITAL_WALLET' | 'VIRTUAL';
  }

  /**
   * Merchant information including full location details.
   */
  export interface Merchant extends Shared.Merchant {
    /**
     * Phone number of card acceptor.
     */
    phone_number: string | null;

    /**
     * Postal code of card acceptor.
     */
    postal_code: string | null;

    /**
     * Street address of card acceptor.
     */
    street_address: string | null;
  }

  /**
   * Where the cardholder received the service, when different from the card acceptor
   * location. This is populated from network data elements such as Mastercard DE-122
   * SE1 SF9-14 and Visa F34 DS02.
   */
  export interface ServiceLocation {
    /**
     * City of service location.
     */
    city: string | null;

    /**
     * Country code of service location, ISO 3166-1 alpha-3.
     */
    country: string | null;

    /**
     * Postal code of service location.
     */
    postal_code: string | null;

    /**
     * State/province code of service location, ISO 3166-2.
     */
    state: string | null;

    /**
     * Street address of service location.
     */
    street_address: string | null;
  }

  /**
   * Optional Object containing information if the Card is a part of a Fleet managed
   * program
   */
  export interface FleetInfo {
    /**
     * Code indicating what the driver was prompted to enter at time of purchase. This
     * is configured at a program level and is a static configuration, and does not
     * change on a request to request basis
     */
    fleet_prompt_code: 'NO_PROMPT' | 'VEHICLE_NUMBER' | 'DRIVER_NUMBER';

    /**
     * Code indicating which restrictions, if any, there are on purchase. This is
     * configured at a program level and is a static configuration, and does not change
     * on a request to request basis
     */
    fleet_restriction_code: 'NO_RESTRICTIONS' | 'FUEL_ONLY';

    /**
     * Number representing the driver
     */
    driver_number?: string | null;

    /**
     * Number associated with the vehicle
     */
    vehicle_number?: string | null;
  }

  /**
   * The latest Authorization Challenge that was issued to the cardholder for this
   * merchant.
   */
  export interface LatestChallenge {
    /**
     * The phone number used for sending Authorization Challenge SMS.
     */
    phone_number: string;

    /**
     * The status of the Authorization Challenge
     *
     * - `COMPLETED` - Challenge was successfully completed by the cardholder
     * - `PENDING` - Challenge is still open
     * - `EXPIRED` - Challenge has expired without being completed
     * - `ERROR` - There was an error processing the challenge
     */
    status: 'COMPLETED' | 'PENDING' | 'EXPIRED' | 'ERROR';

    /**
     * The date and time when the Authorization Challenge was completed in UTC. Present
     * only if the status is `COMPLETED`.
     */
    completed_at?: string;
  }

  /**
   * Contains raw data provided by the card network, including attributes that
   * provide further context about the authorization. If populated by the network,
   * data is organized by Lithic and passed through without further modification.
   * Please consult the official network documentation for more details about these
   * values and how to use them. This object is only available to certain programs-
   * contact your Customer Success Manager to discuss enabling access.
   */
  export interface NetworkSpecificData {
    mastercard?: NetworkSpecificData.Mastercard | null;

    visa?: NetworkSpecificData.Visa | null;
  }

  export namespace NetworkSpecificData {
    export interface Mastercard {
      /**
       * Indicates the electronic commerce security level and UCAF collection.
       */
      ecommerce_security_level_indicator?: string | null;

      /**
       * The On-behalf Service performed on the transaction and the results. Contains all
       * applicable, on-behalf service results that were performed on a given
       * transaction.
       */
      on_behalf_service_result?: Array<Mastercard.OnBehalfServiceResult> | null;

      /**
       * Indicates the type of additional transaction purpose.
       */
      transaction_type_identifier?: string | null;
    }

    export namespace Mastercard {
      export interface OnBehalfServiceResult {
        /**
         * Indicates the results of the service processing.
         */
        result_1: string;

        /**
         * Identifies the results of the service processing.
         */
        result_2: string;

        /**
         * Indicates the service performed on the transaction.
         */
        service: string;
      }
    }

    export interface Visa {
      /**
       * Identifies the purpose or category of a transaction, used to classify and
       * process transactions according to Visa’s rules.
       */
      business_application_identifier?: string | null;
    }
  }

  export interface Pos {
    /**
     * POS > Entry Mode object in ASA
     */
    entry_mode?: Pos.EntryMode;

    terminal?: Pos.Terminal;
  }

  export namespace Pos {
    /**
     * POS > Entry Mode object in ASA
     */
    export interface EntryMode {
      /**
       * Card Presence Indicator
       */
      card?: 'PRESENT' | 'NOT_PRESENT' | 'UNKNOWN';

      /**
       * Cardholder Presence Indicator
       */
      cardholder?:
        | 'DEFERRED_BILLING'
        | 'ELECTRONIC_ORDER'
        | 'INSTALLMENT'
        | 'MAIL_ORDER'
        | 'NOT_PRESENT'
        | 'PRESENT'
        | 'REOCCURRING'
        | 'TELEPHONE_ORDER'
        | 'UNKNOWN';

      /**
       * Method of entry for the PAN
       */
      pan?:
        | 'AUTO_ENTRY'
        | 'BAR_CODE'
        | 'CONTACTLESS'
        | 'ECOMMERCE'
        | 'ERROR_KEYED'
        | 'ERROR_MAGNETIC_STRIPE'
        | 'ICC'
        | 'KEY_ENTERED'
        | 'MAGNETIC_STRIPE'
        | 'MANUAL'
        | 'OCR'
        | 'SECURE_CARDLESS'
        | 'UNSPECIFIED'
        | 'UNKNOWN'
        | 'CREDENTIAL_ON_FILE';

      /**
       * Indicates whether the cardholder entered the PIN. True if the PIN was entered.
       */
      pin_entered?: boolean;
    }

    export interface Terminal {
      /**
       * True if a clerk is present at the sale.
       */
      attended: boolean;

      /**
       * True if the terminal is capable of retaining the card.
       */
      card_retention_capable: boolean;

      /**
       * True if the sale was made at the place of business (vs. mobile).
       */
      on_premise: boolean;

      /**
       * The person that is designated to swipe the card
       */
      operator: 'ADMINISTRATIVE' | 'CARDHOLDER' | 'CARD_ACCEPTOR' | 'UNKNOWN';

      /**
       * True if the terminal is capable of partial approval. Partial approval is when
       * part of a transaction is approved and another payment must be used for the
       * remainder. Example scenario: A $40 transaction is attempted on a prepaid card
       * with a $25 balance. If partial approval is enabled, $25 can be authorized, at
       * which point the POS will prompt the user for an additional payment of $15.
       */
      partial_approval_capable: boolean;

      /**
       * Status of whether the POS is able to accept PINs
       */
      pin_capability: 'CAPABLE' | 'INOPERATIVE' | 'NOT_CAPABLE' | 'UNSPECIFIED';

      /**
       * POS Type
       */
      type:
        | 'ADMINISTRATIVE'
        | 'ATM'
        | 'AUTHORIZATION'
        | 'COUPON_MACHINE'
        | 'DIAL_TERMINAL'
        | 'ECOMMERCE'
        | 'ECR'
        | 'FUEL_MACHINE'
        | 'HOME_TERMINAL'
        | 'MICR'
        | 'OFF_PREMISE'
        | 'PAYMENT'
        | 'PDA'
        | 'PHONE'
        | 'POINT'
        | 'POS_TERMINAL'
        | 'PUBLIC_UTILITY'
        | 'SELF_SERVICE'
        | 'TELEVISION'
        | 'TELLER'
        | 'TRAVELERS_CHECK_MACHINE'
        | 'VENDING'
        | 'VOICE'
        | 'UNKNOWN';

      /**
       * Uniquely identifies a terminal at the card acceptor location of acquiring
       * institutions or merchant POS Systems. Left justified with trailing spaces.
       */
      acceptor_terminal_id?: string | null;
    }
  }
}

export interface CardAuthorizationChallengeResponseParams {
  /**
   * Whether the cardholder has approved or declined the issued challenge
   */
  response: 'APPROVE' | 'DECLINE';
}

export declare namespace CardAuthorizations {
  export {
    type CardAuthorization as CardAuthorization,
    type CardAuthorizationChallengeResponseParams as CardAuthorizationChallengeResponseParams,
  };
}
