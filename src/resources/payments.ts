// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as AccountActivityAPI from './account-activity';
import * as BalancesAPI from './balances';
import { APIPromise } from '../core/api-promise';
import { CursorPage, type CursorPageParams, PagePromise } from '../core/pagination';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class Payments extends APIResource {
  /**
   * Initiates a payment between a financial account and an external bank account.
   *
   * @example
   * ```ts
   * const payment = await client.payments.create({
   *   amount: 1,
   *   external_bank_account_token:
   *     '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   *   financial_account_token:
   *     '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   *   method: 'ACH_NEXT_DAY',
   *   method_attributes: { sec_code: 'CCD' },
   *   type: 'COLLECTION',
   * });
   * ```
   */
  create(body: PaymentCreateParams, options?: RequestOptions): APIPromise<PaymentCreateResponse> {
    return this._client.post('/v1/payments', { body, ...options });
  }

  /**
   * Get the payment by token.
   *
   * @example
   * ```ts
   * const payment = await client.payments.retrieve(
   *   '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   * );
   * ```
   */
  retrieve(paymentToken: string, options?: RequestOptions): APIPromise<Payment> {
    return this._client.get(path`/v1/payments/${paymentToken}`, options);
  }

  /**
   * List all the payments for the provided search criteria.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const payment of client.payments.list()) {
   *   // ...
   * }
   * ```
   */
  list(
    query: PaymentListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<PaymentsCursorPage, Payment> {
    return this._client.getAPIList('/v1/payments', CursorPage<Payment>, { query, ...options });
  }

  /**
   * Retry an origination which has been returned.
   *
   * @example
   * ```ts
   * const response = await client.payments.retry(
   *   '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   * );
   * ```
   */
  retry(paymentToken: string, options?: RequestOptions): APIPromise<PaymentRetryResponse> {
    return this._client.post(path`/v1/payments/${paymentToken}/retry`, options);
  }

  /**
   * Return an ACH payment with a specified return reason code. Returns must be
   * initiated within the time window specified by NACHA rules for each return code
   * (typically 2 banking days for most codes, 60 calendar days for unauthorized
   * debits). For a complete list of return codes and their meanings, see the
   * [ACH Return Reasons documentation](https://docs.lithic.com/docs/ach-overview#ach-return-reasons).
   *
   * Note:
   *
   * - This endpoint does not modify the state of the financial account associated
   *   with the payment. If you would like to change the account state, use the
   *   [Update financial account status](https://docs.lithic.com/reference/updatefinancialaccountstatus)
   *   endpoint.
   * - By default this endpoint is not enabled for your account. Please contact your
   *   implementations manager to enable this feature.
   *
   * @example
   * ```ts
   * const payment = await client.payments.return(
   *   '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   *   {
   *     financial_account_token:
   *       '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   *     return_reason_code: 'R01',
   *   },
   * );
   * ```
   */
  return(paymentToken: string, body: PaymentReturnParams, options?: RequestOptions): APIPromise<Payment> {
    return this._client.post(path`/v1/payments/${paymentToken}/return`, { body, ...options });
  }

  /**
   * Simulate payment lifecycle event
   *
   * @example
   * ```ts
   * const response = await client.payments.simulateAction(
   *   '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   *   { event_type: 'ACH_ORIGINATION_REVIEWED' },
   * );
   * ```
   */
  simulateAction(
    paymentToken: string,
    body: PaymentSimulateActionParams,
    options?: RequestOptions,
  ): APIPromise<PaymentSimulateActionResponse> {
    return this._client.post(path`/v1/simulate/payments/${paymentToken}/action`, { body, ...options });
  }

  /**
   * Simulates a receipt of a Payment.
   *
   * @example
   * ```ts
   * const response = await client.payments.simulateReceipt({
   *   token: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   *   amount: 0,
   *   financial_account_token:
   *     '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   *   receipt_type: 'RECEIPT_CREDIT',
   * });
   * ```
   */
  simulateReceipt(
    body: PaymentSimulateReceiptParams,
    options?: RequestOptions,
  ): APIPromise<PaymentSimulateReceiptResponse> {
    return this._client.post('/v1/simulate/payments/receipt', { body, ...options });
  }

  /**
   * Simulates a release of a Payment.
   *
   * @example
   * ```ts
   * const response = await client.payments.simulateRelease({
   *   payment_token: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   * });
   * ```
   */
  simulateRelease(
    body: PaymentSimulateReleaseParams,
    options?: RequestOptions,
  ): APIPromise<PaymentSimulateReleaseResponse> {
    return this._client.post('/v1/simulate/payments/release', { body, ...options });
  }

  /**
   * Simulates a return of a Payment.
   *
   * @example
   * ```ts
   * const response = await client.payments.simulateReturn({
   *   payment_token: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   * });
   * ```
   */
  simulateReturn(
    body: PaymentSimulateReturnParams,
    options?: RequestOptions,
  ): APIPromise<PaymentSimulateReturnResponse> {
    return this._client.post('/v1/simulate/payments/return', { body, ...options });
  }
}

export type PaymentsCursorPage = CursorPage<Payment>;

/**
 * Payment transaction
 */
export interface Payment {
  /**
   * Unique identifier for the transaction
   */
  token: string;

  /**
   * Transaction category
   */
  category:
    | 'ACH'
    | 'BALANCE_OR_FUNDING'
    | 'FEE'
    | 'REWARD'
    | 'ADJUSTMENT'
    | 'DERECOGNITION'
    | 'DISPUTE'
    | 'CARD'
    | 'EXTERNAL_ACH'
    | 'EXTERNAL_CHECK'
    | 'EXTERNAL_FEDNOW'
    | 'EXTERNAL_RTP'
    | 'EXTERNAL_TRANSFER'
    | 'EXTERNAL_WIRE'
    | 'MANAGEMENT_ADJUSTMENT'
    | 'MANAGEMENT_DISPUTE'
    | 'MANAGEMENT_FEE'
    | 'MANAGEMENT_REWARD'
    | 'MANAGEMENT_DISBURSEMENT'
    | 'PROGRAM_FUNDING';

  /**
   * ISO 8601 timestamp of when the transaction was created
   */
  created: string;

  /**
   * Transaction descriptor
   */
  descriptor: string;

  /**
   * Transfer direction
   */
  direction: 'CREDIT' | 'DEBIT';

  /**
   * List of transaction events
   */
  events: Array<Payment.Event>;

  /**
   * PAYMENT - Payment Transaction
   */
  family: 'PAYMENT';

  /**
   * Financial account token
   */
  financial_account_token: string;

  /**
   * Transfer method
   */
  method: 'ACH_NEXT_DAY' | 'ACH_SAME_DAY' | 'WIRE';

  /**
   * Method-specific attributes
   */
  method_attributes: Payment.ACHMethodAttributes | Payment.WireMethodAttributes;

  /**
   * Pending amount in cents
   */
  pending_amount: number;

  /**
   * Account tokens related to a payment transaction
   */
  related_account_tokens: Payment.RelatedAccountTokens | null;

  /**
   * Transaction result
   */
  result: 'APPROVED' | 'DECLINED';

  /**
   * Settled amount in cents
   */
  settled_amount: number;

  /**
   * Transaction source
   */
  source: 'LITHIC' | 'EXTERNAL' | 'CUSTOMER';

  /**
   * The status of the transaction
   */
  status: 'PENDING' | 'SETTLED' | 'DECLINED' | 'REVERSED' | 'CANCELED' | 'RETURNED';

  /**
   * ISO 8601 timestamp of when the transaction was last updated
   */
  updated: string;

  /**
   * Currency of the transaction in ISO 4217 format
   */
  currency?: string;

  /**
   * Expected release date for the transaction
   */
  expected_release_date?: string | null;

  /**
   * External bank account token
   */
  external_bank_account_token?: string | null;

  type?:
    | 'ORIGINATION_CREDIT'
    | 'ORIGINATION_DEBIT'
    | 'RECEIPT_CREDIT'
    | 'RECEIPT_DEBIT'
    | 'WIRE_INBOUND_PAYMENT'
    | 'WIRE_INBOUND_ADMIN'
    | 'WIRE_OUTBOUND_PAYMENT'
    | 'WIRE_OUTBOUND_ADMIN'
    | 'WIRE_DRAWDOWN_REQUEST';

  /**
   * User-defined identifier
   */
  user_defined_id?: string | null;
}

export namespace Payment {
  /**
   * Payment Event
   */
  export interface Event {
    /**
     * Globally unique identifier.
     */
    token: string;

    /**
     * Amount of the financial event that has been settled in the currency's smallest
     * unit (e.g., cents).
     */
    amount: number;

    /**
     * Date and time when the financial event occurred. UTC time zone.
     */
    created: string;

    /**
     * APPROVED financial events were successful while DECLINED financial events were
     * declined by user, Lithic, or the network.
     */
    result: 'APPROVED' | 'DECLINED';

    /**
     * Event types:
     *
     * - `ACH_ORIGINATION_INITIATED` - ACH origination received and pending
     *   approval/release from an ACH hold.
     * - `ACH_ORIGINATION_REVIEWED` - ACH origination has completed the review process.
     * - `ACH_ORIGINATION_CANCELLED` - ACH origination has been cancelled.
     * - `ACH_ORIGINATION_PROCESSED` - ACH origination has been processed and sent to
     *   the Federal Reserve.
     * - `ACH_ORIGINATION_SETTLED` - ACH origination has settled.
     * - `ACH_ORIGINATION_RELEASED` - ACH origination released from pending to
     *   available balance.
     * - `ACH_ORIGINATION_REJECTED` - ACH origination was rejected and not sent to the
     *   Federal Reserve.
     * - `ACH_RECEIPT_PROCESSED` - ACH receipt pending release from an ACH holder.
     * - `ACH_RECEIPT_SETTLED` - ACH receipt funds have settled.
     * - `ACH_RECEIPT_RELEASED` - ACH receipt released from pending to available
     *   balance.
     * - `ACH_RETURN_INITIATED` - ACH initiated return for an ACH receipt.
     * - `ACH_RETURN_PROCESSED` - ACH receipt returned by the Receiving Depository
     *   Financial Institution.
     * - `ACH_RETURN_SETTLED` - ACH return settled by the Receiving Depository
     *   Financial Institution.
     * - `ACH_RETURN_REJECTED` - ACH return was rejected by the Receiving Depository
     *   Financial Institution.
     */
    type:
      | 'ACH_ORIGINATION_CANCELLED'
      | 'ACH_ORIGINATION_INITIATED'
      | 'ACH_ORIGINATION_PROCESSED'
      | 'ACH_ORIGINATION_REJECTED'
      | 'ACH_ORIGINATION_RELEASED'
      | 'ACH_ORIGINATION_REVIEWED'
      | 'ACH_ORIGINATION_SETTLED'
      | 'ACH_RECEIPT_PROCESSED'
      | 'ACH_RECEIPT_RELEASED'
      | 'ACH_RECEIPT_SETTLED'
      | 'ACH_RETURN_INITIATED'
      | 'ACH_RETURN_PROCESSED'
      | 'ACH_RETURN_REJECTED'
      | 'ACH_RETURN_SETTLED';

    /**
     * More detailed reasons for the event
     */
    detailed_results?: Array<
      | 'APPROVED'
      | 'DECLINED'
      | 'FUNDS_INSUFFICIENT'
      | 'ACCOUNT_INVALID'
      | 'PROGRAM_TRANSACTION_LIMIT_EXCEEDED'
      | 'PROGRAM_DAILY_LIMIT_EXCEEDED'
      | 'PROGRAM_MONTHLY_LIMIT_EXCEEDED'
    >;

    /**
     * Payment event external ID, for example, ACH trace number.
     */
    external_id?: string | null;
  }

  export interface ACHMethodAttributes {
    /**
     * SEC code for ACH transaction
     */
    sec_code: 'CCD' | 'PPD' | 'WEB' | 'TEL' | 'CIE' | 'CTX';

    /**
     * Number of days the ACH transaction is on hold
     */
    ach_hold_period?: number | null;

    /**
     * Addenda information
     */
    addenda?: string | null;

    /**
     * Company ID for the ACH transaction
     */
    company_id?: string | null;

    /**
     * Receipt routing number
     */
    receipt_routing_number?: string | null;

    /**
     * Number of retries attempted
     */
    retries?: number | null;

    /**
     * Return reason code if the transaction was returned
     */
    return_reason_code?: string | null;

    /**
     * Trace numbers for the ACH transaction
     */
    trace_numbers?: Array<string>;
  }

  export interface WireMethodAttributes {
    /**
     * Type of wire message
     */
    wire_message_type: string | null;

    /**
     * Type of wire transfer
     */
    wire_network: 'FEDWIRE' | 'SWIFT';

    creditor?: AccountActivityAPI.WirePartyDetails;

    debtor?: AccountActivityAPI.WirePartyDetails;

    /**
     * Point to point reference identifier, as assigned by the instructing party, used
     * for tracking the message through the Fedwire system
     */
    message_id?: string | null;

    /**
     * Payment details or invoice reference
     */
    remittance_information?: string | null;
  }

  /**
   * Account tokens related to a payment transaction
   */
  export interface RelatedAccountTokens {
    /**
     * Globally unique identifier for the account
     */
    account_token: string | null;

    /**
     * Globally unique identifier for the business account
     */
    business_account_token: string | null;
  }
}

/**
 * Payment transaction
 */
export interface PaymentCreateResponse extends Payment {
  /**
   * Balance
   */
  balance?: BalancesAPI.Balance;
}

/**
 * Payment transaction
 */
export interface PaymentRetryResponse extends Payment {
  /**
   * Balance
   */
  balance?: BalancesAPI.Balance;
}

export interface PaymentSimulateActionResponse {
  /**
   * Debugging Request Id
   */
  debugging_request_id: string;

  /**
   * Request Result
   */
  result: 'APPROVED' | 'DECLINED';

  /**
   * Transaction Event Token
   */
  transaction_event_token: string;
}

export interface PaymentSimulateReceiptResponse {
  /**
   * Debugging Request Id
   */
  debugging_request_id: string;

  /**
   * Request Result
   */
  result: 'APPROVED' | 'DECLINED';

  /**
   * Transaction Event Token
   */
  transaction_event_token: string;
}

export interface PaymentSimulateReleaseResponse {
  /**
   * Debugging Request Id
   */
  debugging_request_id: string;

  /**
   * Request Result
   */
  result: 'APPROVED' | 'DECLINED';

  /**
   * Transaction Event Token
   */
  transaction_event_token: string;
}

export interface PaymentSimulateReturnResponse {
  /**
   * Debugging Request Id
   */
  debugging_request_id: string;

  /**
   * Request Result
   */
  result: 'APPROVED' | 'DECLINED';

  /**
   * Transaction Event Token
   */
  transaction_event_token: string;
}

export interface PaymentCreateParams {
  amount: number;

  external_bank_account_token: string;

  financial_account_token: string;

  method: 'ACH_NEXT_DAY' | 'ACH_SAME_DAY';

  method_attributes: PaymentCreateParams.MethodAttributes;

  type: 'COLLECTION' | 'PAYMENT';

  /**
   * Customer-provided token that will serve as an idempotency token. This token will
   * become the transaction token.
   */
  token?: string;

  memo?: string;

  user_defined_id?: string;
}

export namespace PaymentCreateParams {
  export interface MethodAttributes {
    sec_code: 'CCD' | 'PPD' | 'WEB';

    /**
     * Number of days to hold the ACH payment
     */
    ach_hold__period?: number;

    addenda?: string | null;
  }
}

export interface PaymentListParams extends CursorPageParams {
  account_token?: string;

  /**
   * Date string in RFC 3339 format. Only entries created after the specified time
   * will be included. UTC time zone.
   */
  begin?: string;

  business_account_token?: string;

  category?: 'ACH';

  /**
   * Date string in RFC 3339 format. Only entries created before the specified time
   * will be included. UTC time zone.
   */
  end?: string;

  financial_account_token?: string;

  result?: 'APPROVED' | 'DECLINED';

  status?: 'DECLINED' | 'PENDING' | 'RETURNED' | 'SETTLED';
}

export interface PaymentReturnParams {
  /**
   * Globally unique identifier for the financial account
   */
  financial_account_token: string;

  /**
   * ACH return reason code indicating the reason for returning the payment.
   * Supported codes include R01-R53 and R80-R85. For a complete list of return codes
   * and their meanings, see
   * [ACH Return Reasons](https://docs.lithic.com/docs/ach-overview#ach-return-reasons)
   */
  return_reason_code: string;

  /**
   * Optional additional information about the return. Limited to 44 characters
   */
  addenda?: string | null;

  /**
   * Date of death in YYYY-MM-DD format. Required when using return codes **R14**
   * (representative payee deceased) or **R15** (beneficiary or account holder
   * deceased)
   */
  date_of_death?: string | null;

  /**
   * Optional memo for the return. Limited to 10 characters
   */
  memo?: string | null;
}

export interface PaymentSimulateActionParams {
  /**
   * Event Type
   */
  event_type:
    | 'ACH_ORIGINATION_REVIEWED'
    | 'ACH_ORIGINATION_RELEASED'
    | 'ACH_ORIGINATION_PROCESSED'
    | 'ACH_ORIGINATION_SETTLED'
    | 'ACH_RECEIPT_SETTLED'
    | 'ACH_RECEIPT_RELEASED'
    | 'ACH_RETURN_INITIATED'
    | 'ACH_RETURN_PROCESSED'
    | 'ACH_RETURN_SETTLED';

  /**
   * Date of Death for ACH Return
   */
  date_of_death?: string;

  /**
   * Decline reason
   */
  decline_reason?:
    | 'PROGRAM_TRANSACTION_LIMIT_EXCEEDED'
    | 'PROGRAM_DAILY_LIMIT_EXCEEDED'
    | 'PROGRAM_MONTHLY_LIMIT_EXCEEDED';

  /**
   * Return Addenda
   */
  return_addenda?: string;

  /**
   * Return Reason Code
   */
  return_reason_code?: string;
}

export interface PaymentSimulateReceiptParams {
  /**
   * Customer-generated payment token used to uniquely identify the simulated payment
   */
  token: string;

  /**
   * Amount
   */
  amount: number;

  /**
   * Financial Account Token
   */
  financial_account_token: string;

  /**
   * Receipt Type
   */
  receipt_type: 'RECEIPT_CREDIT' | 'RECEIPT_DEBIT';

  /**
   * Memo
   */
  memo?: string;
}

export interface PaymentSimulateReleaseParams {
  /**
   * Payment Token
   */
  payment_token: string;
}

export interface PaymentSimulateReturnParams {
  /**
   * Payment Token
   */
  payment_token: string;

  /**
   * Return Reason Code
   */
  return_reason_code?: string;
}

export declare namespace Payments {
  export {
    type Payment as Payment,
    type PaymentCreateResponse as PaymentCreateResponse,
    type PaymentRetryResponse as PaymentRetryResponse,
    type PaymentSimulateActionResponse as PaymentSimulateActionResponse,
    type PaymentSimulateReceiptResponse as PaymentSimulateReceiptResponse,
    type PaymentSimulateReleaseResponse as PaymentSimulateReleaseResponse,
    type PaymentSimulateReturnResponse as PaymentSimulateReturnResponse,
    type PaymentsCursorPage as PaymentsCursorPage,
    type PaymentCreateParams as PaymentCreateParams,
    type PaymentListParams as PaymentListParams,
    type PaymentReturnParams as PaymentReturnParams,
    type PaymentSimulateActionParams as PaymentSimulateActionParams,
    type PaymentSimulateReceiptParams as PaymentSimulateReceiptParams,
    type PaymentSimulateReleaseParams as PaymentSimulateReleaseParams,
    type PaymentSimulateReturnParams as PaymentSimulateReturnParams,
  };
}
