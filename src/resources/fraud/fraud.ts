// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as TransactionsAPI from './transactions';
import {
  TransactionReportParams,
  TransactionReportResponse,
  TransactionRetrieveResponse,
  Transactions,
} from './transactions';

export class Fraud extends APIResource {
  transactions: TransactionsAPI.Transactions = new TransactionsAPI.Transactions(this._client);
}

Fraud.Transactions = Transactions;

export declare namespace Fraud {
  export {
    Transactions as Transactions,
    type TransactionRetrieveResponse as TransactionRetrieveResponse,
    type TransactionReportResponse as TransactionReportResponse,
    type TransactionReportParams as TransactionReportParams,
  };
}
