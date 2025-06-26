// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../resource';
import * as Core from '../../core';

export class Transactions extends APIResource {
  /**
   * Retrieve a fraud report for a specific transaction identified by its unique
   * transaction token.
   *
   * @example
   * ```ts
   * const transaction =
   *   await client.fraud.transactions.retrieve(
   *     '00000000-0000-0000-0000-000000000000',
   *   );
   * ```
   */
  retrieve(
    transactionToken: string,
    options?: Core.RequestOptions,
  ): Core.APIPromise<TransactionRetrieveResponse> {
    return this._client.get(`/v1/fraud/transactions/${transactionToken}`, options);
  }

  /**
   * Report fraud for a specific transaction token by providing details such as fraud
   * type, fraud status, and any additional comments.
   *
   * @example
   * ```ts
   * const response = await client.fraud.transactions.report(
   *   '00000000-0000-0000-0000-000000000000',
   *   { fraud_status: 'SUSPECTED_FRAUD' },
   * );
   * ```
   */
  report(
    transactionToken: string,
    body: TransactionReportParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<TransactionReportResponse> {
    return this._client.post(`/v1/fraud/transactions/${transactionToken}`, { body, ...options });
  }
}

export interface TransactionRetrieveResponse {
  /**
   * The fraud status of the transaction, string (enum) supporting the following
   * values:
   *
   * - `SUSPECTED_FRAUD`: The transaction is suspected to be fraudulent, but this
   *   hasn’t been confirmed.
   * - `FRAUDULENT`: The transaction is confirmed to be fraudulent. A transaction may
   *   immediately be moved into this state, or be graduated into this state from the
   *   `SUSPECTED_FRAUD` state.
   * - `NOT_FRAUDULENT`: The transaction is (explicitly) marked as not fraudulent. A
   *   transaction may immediately be moved into this state, or be graduated into
   *   this state from the `SUSPECTED_FRAUD` state.
   * - `NO_REPORTED_FRAUD`: Indicates that no fraud report exists for the
   *   transaction. It is the default state for transactions that have not been
   *   analyzed or associated with any known fraudulent activity.
   */
  fraud_status: 'SUSPECTED_FRAUD' | 'FRAUDULENT' | 'NOT_FRAUDULENT' | 'NO_REPORTED_FRAUD';

  /**
   * The universally unique identifier (UUID) associated with the transaction being
   * reported.
   */
  transaction_token: string;

  /**
   * Provides additional context or details about the fraud report.
   */
  comment?: string;

  /**
   * Timestamp representing when the fraud report was created.
   */
  created_at?: string;

  /**
   * Specifies the type or category of fraud that the transaction is suspected or
   * confirmed to involve, string (enum) supporting the following values:
   *
   * - `FIRST_PARTY_FRAUD`: First-party fraud occurs when a legitimate account or
   *   cardholder intentionally misuses financial services for personal gain. This
   *   includes actions such as disputing legitimate transactions to obtain a refund,
   *   abusing return policies, or defaulting on credit obligations without intent to
   *   repay.
   * - `ACCOUNT_TAKEOVER`: Account takeover fraud occurs when a fraudster gains
   *   unauthorized access to an existing account, modifies account settings, and
   *   carries out fraudulent transactions.
   * - `CARD_COMPROMISED`: Card compromised fraud occurs when a fraudster gains
   *   access to card details without taking over the account, such as through
   *   physical card theft, cloning, or online data breaches.
   * - `IDENTITY_THEFT`: Identity theft fraud occurs when a fraudster uses stolen
   *   personal information, such as Social Security numbers or addresses, to open
   *   accounts, apply for loans, or conduct financial transactions in someone's
   *   name.
   * - `CARDHOLDER_MANIPULATION`: This type of fraud occurs when a fraudster
   *   manipulates or coerces a legitimate cardholder into unauthorized transactions,
   *   often through social engineering tactics.
   */
  fraud_type?:
    | 'FIRST_PARTY_FRAUD'
    | 'ACCOUNT_TAKEOVER'
    | 'CARD_COMPROMISED'
    | 'IDENTITY_THEFT'
    | 'CARDHOLDER_MANIPULATION';

  /**
   * Timestamp representing the last update to the fraud report.
   */
  updated_at?: string;
}

export interface TransactionReportResponse {
  /**
   * The fraud status of the transaction, string (enum) supporting the following
   * values:
   *
   * - `SUSPECTED_FRAUD`: The transaction is suspected to be fraudulent, but this
   *   hasn’t been confirmed.
   * - `FRAUDULENT`: The transaction is confirmed to be fraudulent. A transaction may
   *   immediately be moved into this state, or be graduated into this state from the
   *   `SUSPECTED_FRAUD` state.
   * - `NOT_FRAUDULENT`: The transaction is (explicitly) marked as not fraudulent. A
   *   transaction may immediately be moved into this state, or be graduated into
   *   this state from the `SUSPECTED_FRAUD` state.
   * - `NO_REPORTED_FRAUD`: Indicates that no fraud report exists for the
   *   transaction. It is the default state for transactions that have not been
   *   analyzed or associated with any known fraudulent activity.
   */
  fraud_status: 'SUSPECTED_FRAUD' | 'FRAUDULENT' | 'NOT_FRAUDULENT' | 'NO_REPORTED_FRAUD';

  /**
   * The universally unique identifier (UUID) associated with the transaction being
   * reported.
   */
  transaction_token: string;

  /**
   * Provides additional context or details about the fraud report.
   */
  comment?: string;

  /**
   * Timestamp representing when the fraud report was created.
   */
  created_at?: string;

  /**
   * Specifies the type or category of fraud that the transaction is suspected or
   * confirmed to involve, string (enum) supporting the following values:
   *
   * - `FIRST_PARTY_FRAUD`: First-party fraud occurs when a legitimate account or
   *   cardholder intentionally misuses financial services for personal gain. This
   *   includes actions such as disputing legitimate transactions to obtain a refund,
   *   abusing return policies, or defaulting on credit obligations without intent to
   *   repay.
   * - `ACCOUNT_TAKEOVER`: Account takeover fraud occurs when a fraudster gains
   *   unauthorized access to an existing account, modifies account settings, and
   *   carries out fraudulent transactions.
   * - `CARD_COMPROMISED`: Card compromised fraud occurs when a fraudster gains
   *   access to card details without taking over the account, such as through
   *   physical card theft, cloning, or online data breaches.
   * - `IDENTITY_THEFT`: Identity theft fraud occurs when a fraudster uses stolen
   *   personal information, such as Social Security numbers or addresses, to open
   *   accounts, apply for loans, or conduct financial transactions in someone's
   *   name.
   * - `CARDHOLDER_MANIPULATION`: This type of fraud occurs when a fraudster
   *   manipulates or coerces a legitimate cardholder into unauthorized transactions,
   *   often through social engineering tactics.
   */
  fraud_type?:
    | 'FIRST_PARTY_FRAUD'
    | 'ACCOUNT_TAKEOVER'
    | 'CARD_COMPROMISED'
    | 'IDENTITY_THEFT'
    | 'CARDHOLDER_MANIPULATION';

  /**
   * Timestamp representing the last update to the fraud report.
   */
  updated_at?: string;
}

export interface TransactionReportParams {
  /**
   * The fraud status of the transaction, string (enum) supporting the following
   * values:
   *
   * - `SUSPECTED_FRAUD`: The transaction is suspected to be fraudulent, but this
   *   hasn’t been confirmed.
   * - `FRAUDULENT`: The transaction is confirmed to be fraudulent. A transaction may
   *   immediately be moved into this state, or be graduated into this state from the
   *   `SUSPECTED_FRAUD` state.
   * - `NOT_FRAUDULENT`: The transaction is (explicitly) marked as not fraudulent. A
   *   transaction may immediately be moved into this state, or be graduated into
   *   this state from the `SUSPECTED_FRAUD` state.
   */
  fraud_status: 'SUSPECTED_FRAUD' | 'FRAUDULENT' | 'NOT_FRAUDULENT';

  /**
   * Optional field providing additional information or context about why the
   * transaction is considered fraudulent.
   */
  comment?: string;

  /**
   * Specifies the type or category of fraud that the transaction is suspected or
   * confirmed to involve, string (enum) supporting the following values:
   *
   * - `FIRST_PARTY_FRAUD`: First-party fraud occurs when a legitimate account or
   *   cardholder intentionally misuses financial services for personal gain. This
   *   includes actions such as disputing legitimate transactions to obtain a refund,
   *   abusing return policies, or defaulting on credit obligations without intent to
   *   repay.
   * - `ACCOUNT_TAKEOVER`: Account takeover fraud occurs when a fraudster gains
   *   unauthorized access to an existing account, modifies account settings, and
   *   carries out fraudulent transactions.
   * - `CARD_COMPROMISED`: Card compromised fraud occurs when a fraudster gains
   *   access to card details without taking over the account, such as through
   *   physical card theft, cloning, or online data breaches.
   * - `IDENTITY_THEFT`: Identity theft fraud occurs when a fraudster uses stolen
   *   personal information, such as Social Security numbers or addresses, to open
   *   accounts, apply for loans, or conduct financial transactions in someone's
   *   name.
   * - `CARDHOLDER_MANIPULATION`: This type of fraud occurs when a fraudster
   *   manipulates or coerces a legitimate cardholder into unauthorized transactions,
   *   often through social engineering tactics.
   */
  fraud_type?:
    | 'FIRST_PARTY_FRAUD'
    | 'ACCOUNT_TAKEOVER'
    | 'CARD_COMPROMISED'
    | 'IDENTITY_THEFT'
    | 'CARDHOLDER_MANIPULATION';
}

export declare namespace Transactions {
  export {
    type TransactionRetrieveResponse as TransactionRetrieveResponse,
    type TransactionReportResponse as TransactionReportResponse,
    type TransactionReportParams as TransactionReportParams,
  };
}
