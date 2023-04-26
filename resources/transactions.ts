// File generated from our OpenAPI spec by Stainless.

import * as Core from '~/core';
import { APIResource } from '~/resource';
import { isRequestOptions } from '~/core';
import { Page, PageParams } from '~/pagination';

export class Transactions extends APIResource {
  /**
   * Get specific transaction.
   */
  retrieve(transactionToken: string, options?: Core.RequestOptions): Promise<Core.APIResponse<Transaction>> {
    return this.get(`/transactions/${transactionToken}`, options);
  }

  /**
   * List transactions.
   */
  list(query?: TransactionListParams, options?: Core.RequestOptions): Core.PagePromise<TransactionsPage>;
  list(options?: Core.RequestOptions): Core.PagePromise<TransactionsPage>;
  list(
    query: TransactionListParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.PagePromise<TransactionsPage> {
    if (isRequestOptions(query)) {
      return this.list({}, query);
    }
    return this.getAPIList('/transactions', TransactionsPage, { query, ...options });
  }

  /**
   * Simulates an authorization request from the payment network as if it came from a
   * merchant acquirer. If you're configured for ASA, simulating auths requires your
   * ASA client to be set up properly (respond with a valid JSON to the ASA request).
   * For users that are not configured for ASA, a daily transaction limit of $5000
   * USD is applied by default. This limit can be modified via the
   * [update account](https://docs.lithic.com/reference/patchaccountbytoken)
   * endpoint.
   */
  simulateAuthorization(
    body: TransactionSimulateAuthorizationParams,
    options?: Core.RequestOptions,
  ): Promise<Core.APIResponse<TransactionSimulateAuthorizationResponse>> {
    return this.post('/simulate/authorize', { body, ...options });
  }

  /**
   * Simulates an authorization advice request from the payment network as if it came
   * from a merchant acquirer. An authorization advice request changes the amount of
   * the transaction.
   */
  simulateAuthorizationAdvice(
    body: TransactionSimulateAuthorizationAdviceParams,
    options?: Core.RequestOptions,
  ): Promise<Core.APIResponse<TransactionSimulateAuthorizationAdviceResponse>> {
    return this.post('/simulate/authorization_advice', { body, ...options });
  }

  /**
   * Clears an existing authorization. After this event, the transaction is no longer
   * pending.
   *
   * If no `amount` is supplied to this endpoint, the amount of the transaction will
   * be captured. Any transaction that has any amount completed at all do not have
   * access to this behavior.
   */
  simulateClearing(
    body: TransactionSimulateClearingParams,
    options?: Core.RequestOptions,
  ): Promise<Core.APIResponse<TransactionSimulateClearingResponse>> {
    return this.post('/simulate/clearing', { body, ...options });
  }

  /**
   * Simulates a credit authorization advice message from the payment network. This
   * message indicates that a credit authorization was approved on your behalf by the
   * network.
   */
  simulateCreditAuthorization(
    body: TransactionSimulateCreditAuthorizationParams,
    options?: Core.RequestOptions,
  ): Promise<Core.APIResponse<TransactionSimulateCreditAuthorizationResponse>> {
    return this.post('/simulate/credit_authorization_advice', { body, ...options });
  }

  /**
   * Returns (aka refunds) an amount back to a card. Returns are cleared immediately
   * and do not spend time in a `PENDING` state.
   */
  simulateReturn(
    body: TransactionSimulateReturnParams,
    options?: Core.RequestOptions,
  ): Promise<Core.APIResponse<TransactionSimulateReturnResponse>> {
    return this.post('/simulate/return', { body, ...options });
  }

  /**
   * Voids a settled credit transaction – i.e., a transaction with a negative amount
   * and `SETTLED` status. These can be credit authorizations that have already
   * cleared or financial credit authorizations.
   */
  simulateReturnReversal(
    body: TransactionSimulateReturnReversalParams,
    options?: Core.RequestOptions,
  ): Promise<Core.APIResponse<TransactionSimulateReturnReversalResponse>> {
    return this.post('/simulate/return_reversal', { body, ...options });
  }

  /**
   * Voids an existing, uncleared (aka pending) authorization. If amount is not sent
   * the full amount will be voided. Cannot be used on partially completed
   * transactions, but can be used on partially voided transactions. _Note that
   * simulating an authorization expiry on credit authorizations or credit
   * authorization advice is not currently supported but will be added soon._
   */
  simulateVoid(
    body: TransactionSimulateVoidParams,
    options?: Core.RequestOptions,
  ): Promise<Core.APIResponse<TransactionSimulateVoidResponse>> {
    return this.post('/simulate/void', { body, ...options });
  }
}

export class TransactionsPage extends Page<Transaction> {}

export interface Transaction {
  /**
   * A fixed-width 23-digit numeric identifier for the Transaction that may be set if
   * the transaction originated from the Mastercard network. This number may be used
   * for dispute tracking.
   */
  acquirer_reference_number?: string | null;

  /**
   * Authorization amount of the transaction (in cents), including any acquirer fees.
   * This may change over time, and will represent the settled amount once the
   * transaction is settled.
   */
  amount?: number;

  /**
   * Authorization amount (in cents) of the transaction, including any acquirer fees.
   * This amount always represents the amount authorized for the transaction,
   * unaffected by settlement.
   */
  authorization_amount?: number;

  /**
   * A fixed-width 6-digit numeric identifier that can be used to identify a
   * transaction with networks.
   */
  authorization_code?: string;

  /**
   * Token for the card used in this transaction.
   */
  card_token?: string;

  cardholder_authentication?: Transaction.CardholderAuthentication | null;

  /**
   * Date and time when the transaction first occurred. UTC time zone.
   */
  created?: string;

  /**
   * A list of all events that have modified this transaction.
   */
  events?: Array<Transaction.Events>;

  merchant?: Transaction.Merchant;

  /**
   * Analogous to the "amount" property, but will represent the amount in the
   * transaction's local currency (smallest unit), including any acquirer fees.
   */
  merchant_amount?: number;

  /**
   * Analogous to the "authorization_amount" property, but will represent the amount
   * in the transaction's local currency (smallest unit), including any acquirer
   * fees.
   */
  merchant_authorization_amount?: number;

  /**
   * 3-digit alphabetic ISO 4217 code for the local currency of the transaction.
   */
  merchant_currency?: string;

  /**
   * Card network of the authorization. Can be `INTERLINK`, `MAESTRO`, `MASTERCARD`,
   * `VISA`, or `UNKNOWN`. Value is `UNKNOWN` when Lithic cannot determine the
   * network code from the upstream provider.
   */
  network?: 'INTERLINK' | 'MAESTRO' | 'MASTERCARD' | 'VISA' | 'UNKNOWN' | null;

  /**
   * `APPROVED` or decline reason. See Event result types
   */
  result?:
    | 'ACCOUNT_STATE_TRANSACTION'
    | 'APPROVED'
    | 'BANK_CONNECTION_ERROR'
    | 'BANK_NOT_VERIFIED'
    | 'CARD_CLOSED'
    | 'CARD_PAUSED'
    | 'FRAUD_ADVICE'
    | 'GLOBAL_TRANSACTION_LIMIT'
    | 'GLOBAL_WEEKLY_LIMIT'
    | 'GLOBAL_MONTHLY_LIMIT'
    | 'INACTIVE_ACCOUNT'
    | 'INCORRECT_PIN'
    | 'INVALID_CARD_DETAILS'
    | 'INSUFFICIENT_FUNDS'
    | 'MERCHANT_BLACKLIST'
    | 'SINGLE_USE_RECHARGED'
    | 'SWITCH_INOPERATIVE_ADVICE'
    | 'UNAUTHORIZED_MERCHANT'
    | 'UNKNOWN_HOST_TIMEOUT'
    | 'USER_TRANSACTION_LIMIT';

  /**
   * Amount of the transaction that has been settled (in cents), including any
   * acquirer fees. This may change over time.
   */
  settled_amount?: number;

  /**
   * Status types:
   *
   * - `DECLINED` - The transaction was declined.
   * - `EXPIRED` - Lithic reversed the authorization as it has passed its expiration
   *   time.
   * - `PENDING` - Authorization is pending completion from the merchant.
   * - `SETTLED` - The transaction is complete.
   * - `VOIDED` - The merchant has voided the previously pending authorization.
   */
  status?: 'BOUNCED' | 'DECLINED' | 'EXPIRED' | 'PENDING' | 'SETTLED' | 'SETTLING' | 'VOIDED';

  /**
   * Globally unique identifier.
   */
  token?: string;
}

export namespace Transaction {
  export interface CardholderAuthentication {
    /**
     * 3-D Secure Protocol version. Possible values:
     *
     * - `1`: 3-D Secure Protocol version 1.x applied to the transaction.
     * - `2`: 3-D Secure Protocol version 2.x applied to the transaction.
     * - `null`: 3-D Secure was not used for the transaction
     */
    '3ds_version': string | null;

    /**
     * Exemption applied by the ACS to authenticate the transaction without requesting
     * a challenge. Possible values:
     *
     * - `AUTHENTICATION_OUTAGE_EXCEPTION`: Authentication Outage Exception exemption.
     * - `LOW_VALUE`: Low Value Payment exemption.
     * - `MERCHANT_INITIATED_TRANSACTION`: Merchant Initiated Transaction (3RI).
     * - `NONE`: No exemption applied.
     * - `RECURRING_PAYMENT`: Recurring Payment exemption.
     * - `SECURE_CORPORATE_PAYMENT`: Secure Corporate Payment exemption.
     * - `STRONG_CUSTOMER_AUTHENTICATION_DELEGATION`: Strong Customer Authentication
     *   Delegation exemption.
     * - `TRANSACTION_RISK_ANALYSIS`: Acquirer Low-Fraud and Transaction Risk Analysis
     *   exemption.
     *
     * Maps to the 3-D Secure `transChallengeExemption` field.
     */
    acquirer_exemption:
      | 'AUTHENTICATION_OUTAGE_EXCEPTION'
      | 'LOW_VALUE'
      | 'MERCHANT_INITIATED_TRANSACTION'
      | 'NONE'
      | 'RECURRING_PAYMENT'
      | 'SECURE_CORPORATE_PAYMENT'
      | 'STRONG_CUSTOMER_AUTHENTICATION_DELEGATION'
      | 'TRANSACTION_RISK_ANALYSIS';

    /**
     * Indicates whether chargeback liability shift applies to the transaction.
     * Possible values:
     *
     * - `3DS_AUTHENTICATED`: The transaction was fully authenticated through a 3-D
     *   Secure flow, chargeback liability shift applies.
     * - `ACQUIRER_EXEMPTION`: The acquirer utilised an exemption to bypass Strong
     *   Customer Authentication (`transStatus = N`, or `transStatus = I`). Liability
     *   remains with the acquirer and in this case the `acquirer_exemption` field is
     *   expected to be not `NONE`.
     * - `NONE`: Chargeback liability shift has not shifted to the issuer, i.e. the
     *   merchant is liable.
     * - `TOKEN_AUTHENTICATED`: The transaction was a tokenized payment with validated
     *   cryptography, possibly recurring. Chargeback liability shift to the issuer
     *   applies.
     */
    liability_shift: '3DS_AUTHENTICATED' | 'ACQUIRER_EXEMPTION' | 'NONE' | 'TOKEN_AUTHENTICATED';

    /**
     * Verification attempted values:
     *
     * - `APP_LOGIN`: Out-of-band login verification was attempted by the ACS.
     * - `BIOMETRIC`: Out-of-band biometric verification was attempted by the ACS.
     * - `NONE`: No cardholder verification was attempted by the Access Control Server
     *   (e.g. frictionless 3-D Secure flow, no 3-D Secure, or stand-in Risk Based
     *   Analysis).
     * - `OTHER`: Other method was used by the ACS to verify the cardholder (e.g.
     *   Mastercard Identity Check Express, recurring transactions, etc.)
     * - `OTP`: One-time password verification was attempted by the ACS.
     */
    verification_attempted: 'APP_LOGIN' | 'BIOMETRIC' | 'NONE' | 'OTHER' | 'OTP';

    /**
     * This field partially maps to the `transStatus` field in the
     * [EMVCo 3-D Secure specification](https://www.emvco.com/emv-technologies/3d-secure/)
     * and Mastercard SPA2 AAV leading indicators.
     *
     * Verification result values:
     *
     * - `CANCELLED`: Authentication/Account verification could not be performed,
     *   `transStatus = U`.
     * - `FAILED`: Transaction was not authenticated. `transStatus = N`, note: the
     *   utilization of exemptions could also result in `transStatus = N`, inspect the
     *   `acquirer_exemption` field for more information.
     * - `FRICTIONLESS`: Attempts processing performed, the transaction was not
     *   authenticated, but a proof of attempted authentication/verification is
     *   provided. `transStatus = A` and the leading AAV indicator was one of {`kE`,
     *   `kF`, `kQ`}.
     * - `NOT_ATTEMPTED`: A 3-D Secure flow was not applied to this transaction.
     *   Leading AAV indicator was one of {`kN`, `kX`} or no AAV was provided for the
     *   transaction.
     * - `REJECTED`: Authentication/Account Verification rejected; `transStatus = R`.
     *   Issuer is rejecting authentication/verification and requests that
     *   authorization not be attempted.
     * - `SUCCESS`: Authentication verification successful. `transStatus = Y` and
     *   leading AAV indicator for the transaction was one of {`kA`, `kB`, `kC`, `kD`,
     *   `kO`, `kP`, `kR`, `kS`}.
     *
     * Note that the following `transStatus` values are not represented by this field:
     *
     * - `C`: Challenge Required
     * - `D`: Challenge Required; decoupled authentication confirmed
     * - `I`: Informational only
     * - `S`: Challenge using Secure Payment Confirmation (SPC)
     */
    verification_result: 'CANCELLED' | 'FAILED' | 'FRICTIONLESS' | 'NOT_ATTEMPTED' | 'REJECTED' | 'SUCCESS';
  }

  /**
   * A single card transaction may include multiple events that affect the
   * transaction state and lifecycle.
   */
  export interface Events {
    /**
     * Amount of the transaction event (in cents), including any acquirer fees.
     */
    amount: number;

    /**
     * RFC 3339 date and time this event entered the system. UTC time zone.
     */
    created: string;

    /**
     * `APPROVED` or decline reason.
     *
     * Result types:
     *
     * - `ACCOUNT_STATE_TRANSACTION_FAIL` - Contact
     *   [support@lithic.com](mailto:support@lithic.com).
     * - `APPROVED` - Transaction is approved.
     * - `BANK_CONNECTION_ERROR` - Please reconnect a funding source.
     * - `BANK_NOT_VERIFIED` - Please confirm the funding source.
     * - `CARD_CLOSED` - Card state was closed at the time of authorization.
     * - `CARD_PAUSED` - Card state was paused at the time of authorization.
     * - `FRAUD_ADVICE` - Transaction declined due to risk.
     * - `GLOBAL_TRANSACTION_LIMIT` - Platform spend limit exceeded, contact
     *   [support@lithic.com](mailto:support@lithic.com).
     * - `GLOBAL_WEEKLY_LIMIT` - Platform spend limit exceeded, contact
     *   [support@lithic.com](mailto:support@lithic.com).
     * - `GLOBAL_MONTHLY_LIMIT` - Platform spend limit exceeded, contact
     *   [support@lithic.com](mailto:support@lithic.com).
     * - `INACTIVE_ACCOUNT` - Account is inactive. Contact
     *   [support@lithic.com](mailto:support@lithic.com).
     * - `INCORRECT_PIN` - PIN verification failed.
     * - `INVALID_CARD_DETAILS` - Incorrect CVV or expiry date.
     * - `INSUFFICIENT_FUNDS` - Please ensure the funding source is connected and up to
     *   date.
     * - `MERCHANT_BLACKLIST` - This merchant is disallowed on the platform.
     * - `SINGLE_USE_RECHARGED` - Single use card attempted multiple times.
     * - `SWITCH_INOPERATIVE_ADVICE` - Network error, re-attempt the transaction.
     * - `UNAUTHORIZED_MERCHANT` - Merchant locked card attempted at different
     *   merchant.
     * - `UNKNOWN_HOST_TIMEOUT` - Network error, re-attempt the transaction.
     * - `USER_TRANSACTION_LIMIT` - User-set spend limit exceeded.
     */
    result:
      | 'ACCOUNT_STATE_TRANSACTION'
      | 'APPROVED'
      | 'BANK_CONNECTION_ERROR'
      | 'BANK_NOT_VERIFIED'
      | 'CARD_CLOSED'
      | 'CARD_PAUSED'
      | 'FRAUD_ADVICE'
      | 'GLOBAL_TRANSACTION_LIMIT'
      | 'GLOBAL_WEEKLY_LIMIT'
      | 'GLOBAL_MONTHLY_LIMIT'
      | 'INACTIVE_ACCOUNT'
      | 'INCORRECT_PIN'
      | 'INVALID_CARD_DETAILS'
      | 'INSUFFICIENT_FUNDS'
      | 'MERCHANT_BLACKLIST'
      | 'SINGLE_USE_RECHARGED'
      | 'SWITCH_INOPERATIVE_ADVICE'
      | 'UNAUTHORIZED_MERCHANT'
      | 'UNKNOWN_HOST_TIMEOUT'
      | 'USER_TRANSACTION_LIMIT';

    /**
     * Globally unique identifier.
     */
    token: string;

    /**
     * Event types:
     *
     * - `AUTHORIZATION` - Authorize a transaction.
     * - `AUTHORIZATION_ADVICE` - Advice on a transaction.
     * - `AUTHORIZATION_EXPIRY` - Authorization has expired and reversed by Lithic.
     * - `AUTHORIZATION_REVERSAL` - Authorization was reversed by the merchant.
     * - `BALANCE_INQUIRY` - A balance inquiry (typically a $0 authorization) has
     *   occurred on a card.
     * - `CLEARING` - Transaction is settled.
     * - `CORRECTION_DEBIT` - Manual transaction correction (Debit).
     * - `CORRECTION_CREDIT` - Manual transaction correction (Credit).
     * - `CREDIT_AUTHORIZATION` - A refund or credit authorization from a merchant.
     * - `CREDIT_AUTHORIZATION_ADVICE` - A credit authorization was approved on your
     *   behalf by the network.
     * - `FINANCIAL_AUTHORIZATION` - A request from a merchant to debit funds without
     *   additional clearing.
     * - `FINANCIAL_CREDIT_AUTHORIZATION` - A request from a merchant to refund or
     *   credit funds without additional clearing.
     * - `RETURN` - A refund has been processed on the transaction.
     * - `RETURN_REVERSAL` - A refund has been reversed (e.g., when a merchant reverses
     *   an incorrect refund).
     */
    type:
      | 'AUTHORIZATION'
      | 'AUTHORIZATION_ADVICE'
      | 'AUTHORIZATION_EXPIRY'
      | 'AUTHORIZATION_REVERSAL'
      | 'BALANCE_INQUIRY'
      | 'CLEARING'
      | 'CORRECTION_DEBIT'
      | 'CORRECTION_CREDIT'
      | 'CREDIT_AUTHORIZATION'
      | 'CREDIT_AUTHORIZATION_ADVICE'
      | 'FINANCIAL_AUTHORIZATION'
      | 'FINANCIAL_CREDIT_AUTHORIZATION'
      | 'RETURN'
      | 'RETURN_REVERSAL'
      | 'VOID';
  }

  export interface Merchant {
    /**
     * Unique identifier to identify the payment card acceptor.
     */
    acceptor_id?: string;

    /**
     * City of card acceptor.
     */
    city?: string;

    /**
     * Uppercase country of card acceptor (see ISO 8583 specs).
     */
    country?: string;

    /**
     * Short description of card acceptor.
     */
    descriptor?: string;

    /**
     * Merchant category code (MCC). A four-digit number listed in ISO 18245. An MCC is
     * used to classify a business by the types of goods or services it provides.
     */
    mcc?: string;

    /**
     * Geographic state of card acceptor (see ISO 8583 specs).
     */
    state?: string;
  }
}

export interface TransactionSimulateAuthorizationResponse {
  /**
   * Debugging request ID to share with Lithic Support team.
   */
  debugging_request_id?: string;

  /**
   * A unique token to reference this transaction with later calls to void or clear
   * the authorization.
   */
  token?: string;
}

export interface TransactionSimulateClearingResponse {
  /**
   * Debugging request ID to share with Lithic Support team.
   */
  debugging_request_id?: string;
}

export interface TransactionSimulateReturnResponse {
  /**
   * Debugging request ID to share with Lithic Support team.
   */
  debugging_request_id?: string;

  /**
   * A unique token to reference this transaction.
   */
  token?: string;
}

export interface TransactionSimulateReturnReversalResponse {
  /**
   * Debugging request ID to share with Lithic Support team.
   */
  debugging_request_id?: string;
}

export interface TransactionSimulateVoidResponse {
  /**
   * Debugging request ID to share with Lithic Support team.
   */
  debugging_request_id?: string;
}

export interface TransactionSimulateCreditAuthorizationResponse {
  /**
   * Debugging request ID to share with Lithic Support team.
   */
  debugging_request_id?: string;

  /**
   * A unique token to reference this transaction.
   */
  token?: string;
}

export interface TransactionSimulateAuthorizationAdviceResponse {
  /**
   * Debugging request ID to share with Lithic Support team.
   */
  debugging_request_id?: string;

  /**
   * A unique token to reference this transaction.
   */
  token?: string;
}

export interface TransactionListParams extends PageParams {
  /**
   * Filters for transactions associated with a specific account.
   */
  account_token?: string;

  /**
   * Date string in RFC 3339 format. Only entries created after the specified date
   * will be included. UTC time zone.
   */
  begin?: string;

  /**
   * Filters for transactions associated with a specific card.
   */
  card_token?: string;

  /**
   * Date string in RFC 3339 format. Only entries created before the specified date
   * will be included. UTC time zone.
   */
  end?: string;

  /**
   * Filters for transactions using transaction result field. Can filter by
   * `APPROVED`, and `DECLINED`.
   */
  result?: 'APPROVED' | 'DECLINED';
}

export interface TransactionSimulateAuthorizationParams {
  /**
   * Amount (in cents) to authorize. For credit authorizations and financial credit
   * authorizations, any value entered will be converted into a negative amount in
   * the simulated transaction. For example, entering 100 in this field will appear
   * as a -100 amount in the transaction. For balance inquiries, this field must be
   * set to 0.
   */
  amount: number;

  /**
   * Merchant descriptor.
   */
  descriptor: string;

  /**
   * Merchant category code for the transaction to be simulated. A four-digit number
   * listed in ISO 18245. Supported merchant category codes can be found
   * [here](https://docs.lithic.com/docs/transactions#merchant-category-codes-mccs).
   */
  mcc?: string;

  /**
   * Unique identifier to identify the payment card acceptor.
   */
  merchant_acceptor_id?: string;

  /**
   * Amount of the transaction to be simulated in currency specified in
   * merchant_currency, including any acquirer fees.
   */
  merchant_amount?: number;

  /**
   * 3-digit alphabetic ISO 4217 currency code.
   */
  merchant_currency?: string;

  /**
   * Sixteen digit card number.
   */
  pan: string;

  /**
   * Set to true if the terminal is capable of partial approval otherwise false.
   * Partial approval is when part of a transaction is approved and another payment
   * must be used for the remainder.
   */
  partial_approval_capable?: boolean;

  /**
   * Type of event to simulate.
   *
   * - `AUTHORIZATION` is a dual message purchase authorization, meaning a subsequent
   *   clearing step is required to settle the transaction.
   * - `BALANCE_INQUIRY` is a $0 authorization that includes a request for the
   *   balance held on the card, and is most typically seen when a cardholder
   *   requests to view a card's balance at an ATM.
   * - `CREDIT_AUTHORIZATION` is a dual message request from a merchant to authorize
   *   a refund or credit, meaning a subsequent clearing step is required to settle
   *   the transaction.
   * - `FINANCIAL_AUTHORIZATION` is a single message request from a merchant to debit
   *   funds immediately (such as an ATM withdrawal), and no subsequent clearing is
   *   required to settle the transaction.
   * - `FINANCIAL_CREDIT_AUTHORIZATION` is a single message request from a merchant
   *   to credit funds immediately, and no subsequent clearing is required to settle
   *   the transaction.
   */
  status?:
    | 'AUTHORIZATION'
    | 'BALANCE_INQUIRY'
    | 'CREDIT_AUTHORIZATION'
    | 'FINANCIAL_AUTHORIZATION'
    | 'FINANCIAL_CREDIT_AUTHORIZATION';
}

export interface TransactionSimulateAuthorizationAdviceParams {
  /**
   * Amount (in cents) to authorize. This amount will override the transaction's
   * amount that was originally set by /v1/simulate/authorize.
   */
  amount: number;

  /**
   * The transaction token returned from the /v1/simulate/authorize response.
   */
  token: string;
}

export interface TransactionSimulateClearingParams {
  /**
   * Amount (in cents) to complete. Typically this will match the original
   * authorization, but may be more or less.
   *
   * If no amount is supplied to this endpoint, the amount of the transaction will be
   * captured. Any transaction that has any amount completed at all do not have
   * access to this behavior.
   */
  amount?: number;

  /**
   * The transaction token returned from the /v1/simulate/authorize response.
   */
  token: string;
}

export interface TransactionSimulateCreditAuthorizationParams {
  /**
   * Amount (in cents). Any value entered will be converted into a negative amount in
   * the simulated transaction. For example, entering 100 in this field will appear
   * as a -100 amount in the transaction.
   */
  amount: number;

  /**
   * Merchant descriptor.
   */
  descriptor: string;

  /**
   * Merchant category code for the transaction to be simulated. A four-digit number
   * listed in ISO 18245. Supported merchant category codes can be found
   * [here](https://docs.lithic.com/docs/transactions#merchant-category-codes-mccs).
   */
  mcc?: string;

  /**
   * Unique identifier to identify the payment card acceptor.
   */
  merchant_acceptor_id?: string;

  /**
   * Sixteen digit card number.
   */
  pan: string;
}

export interface TransactionSimulateReturnParams {
  /**
   * Amount (in cents) to authorize.
   */
  amount: number;

  /**
   * Merchant descriptor.
   */
  descriptor: string;

  /**
   * Sixteen digit card number.
   */
  pan: string;
}

export interface TransactionSimulateReturnReversalParams {
  /**
   * The transaction token returned from the /v1/simulate/authorize response.
   */
  token: string;
}

export interface TransactionSimulateVoidParams {
  /**
   * Amount (in cents) to void. Typically this will match the original authorization,
   * but may be less.
   */
  amount?: number;

  /**
   * The transaction token returned from the /v1/simulate/authorize response.
   */
  token: string;

  /**
   * Type of event to simulate. Defaults to `AUTHORIZATION_REVERSAL`.
   *
   * - `AUTHORIZATION_EXPIRY` indicates authorization has expired and been reversed
   *   by Lithic.
   * - `AUTHORIZATION_REVERSAL` indicates authorization was reversed by the merchant.
   */
  type?: 'AUTHORIZATION_EXPIRY' | 'AUTHORIZATION_REVERSAL';
}
