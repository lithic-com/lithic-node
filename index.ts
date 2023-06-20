// File generated from our OpenAPI spec by Stainless.

import qs from 'qs';
import * as Core from './core';
import * as Pagination from './pagination';
import * as API from './resources';
import * as Errors from '~/error';
import type { Agent } from 'http';
import * as FileFromPath from 'formdata-node/file-from-path';

const environments = {
  production: 'https://api.lithic.com/v1',
  sandbox: 'https://sandbox.lithic.com/v1',
};

type Config = {
  /**
   * Defaults to process.env["LITHIC_API_KEY"].
   */
  apiKey?: string;
  environment?: keyof typeof environments;
  baseURL?: string;
  timeout?: number;
  httpAgent?: Agent;
  maxRetries?: number;
  defaultHeaders?: Core.Headers;
  webhookSecret?: string | null;
};

/** Instantiate the API Client. */
export class Lithic extends Core.APIClient {
  apiKey: string;
  webhookSecret?: string | null;

  private _options: Config;

  constructor(config?: Config) {
    const options: Config = {
      apiKey: process.env['LITHIC_API_KEY'] || '',
      environment: 'production',
      ...config,
    };

    if (!options.apiKey && options.apiKey !== null) {
      throw new Error(
        "The LITHIC_API_KEY environment variable is missing or empty; either provide it, or instantiate the Lithic client with an apiKey option, like new Lithic({ apiKey: 'my api key' }).",
      );
    }

    super({
      baseURL: options.baseURL || environments[options.environment || 'production'],
      timeout: options.timeout,
      httpAgent: options.httpAgent,
      maxRetries: options.maxRetries,
    });
    this.apiKey = options.apiKey;
    this._options = options;
    this.idempotencyHeader = 'Idempotency-Token';

    this.webhookSecret = config?.webhookSecret || process.env['LITHIC_WEBHOOK_SECRET'] || null;
  }

  accounts: API.Accounts = new API.Accounts(this);
  accountHolders: API.AccountHolders = new API.AccountHolders(this);
  authRules: API.AuthRules = new API.AuthRules(this);
  authStreamEnrollment: API.AuthStreamEnrollmentResource = new API.AuthStreamEnrollmentResource(this);
  tokenizationDecisioning: API.TokenizationDecisioning = new API.TokenizationDecisioning(this);
  cards: API.Cards = new API.Cards(this);
  balances: API.Balances = new API.Balances(this);
  aggregateBalances: API.AggregateBalances = new API.AggregateBalances(this);
  disputes: API.Disputes = new API.Disputes(this);
  events: API.Events = new API.Events(this);
  transfers: API.Transfers = new API.Transfers(this);
  financialAccounts: API.FinancialAccounts = new API.FinancialAccounts(this);
  transactions: API.Transactions = new API.Transactions(this);
  responderEndpoints: API.ResponderEndpoints = new API.ResponderEndpoints(this);
  webhooks: API.Webhooks = new API.Webhooks(this);

  /**
   * API status check
   */
  apiStatus(options?: Core.RequestOptions): Promise<Core.APIResponse<Lithic.APIStatus>> {
    return this.get('/status', options);
  }

  protected override defaultHeaders(): Core.Headers {
    return {
      ...super.defaultHeaders(),
      ...this._options.defaultHeaders,
    };
  }

  protected override authHeaders(): Core.Headers {
    return { Authorization: this.apiKey };
  }

  protected override qsOptions(): qs.IStringifyOptions {
    return { arrayFormat: 'comma' };
  }

  static APIError = Errors.APIError;
  static APIConnectionError = Errors.APIConnectionError;
  static APIConnectionTimeoutError = Errors.APIConnectionTimeoutError;
  static NotFoundError = Errors.NotFoundError;
  static ConflictError = Errors.ConflictError;
  static RateLimitError = Errors.RateLimitError;
  static BadRequestError = Errors.BadRequestError;
  static AuthenticationError = Errors.AuthenticationError;
  static InternalServerError = Errors.InternalServerError;
  static PermissionDeniedError = Errors.PermissionDeniedError;
  static UnprocessableEntityError = Errors.UnprocessableEntityError;
}

export const {
  APIError,
  APIConnectionError,
  APIConnectionTimeoutError,
  NotFoundError,
  ConflictError,
  RateLimitError,
  BadRequestError,
  AuthenticationError,
  InternalServerError,
  PermissionDeniedError,
  UnprocessableEntityError,
} = Errors;

export import fileFromPath = FileFromPath.fileFromPath;

export namespace Lithic {
  // Helper functions
  export import fileFromPath = FileFromPath.fileFromPath;

  export import Page = Pagination.Page;
  export import PageParams = Pagination.PageParams;
  export import PageResponse = Pagination.PageResponse;

  export import CursorPage = Pagination.CursorPage;
  export import CursorPageParams = Pagination.CursorPageParams;
  export import CursorPageResponse = Pagination.CursorPageResponse;

  export import SinglePage = Pagination.SinglePage;
  export import SinglePageResponse = Pagination.SinglePageResponse;

  export import APIStatus = API.APIStatus;

  export import Accounts = API.Accounts;
  export import Account = API.Account;
  export import AccountsPage = API.AccountsPage;
  export import AccountUpdateParams = API.AccountUpdateParams;
  export import AccountListParams = API.AccountListParams;

  export import AccountHolders = API.AccountHolders;
  export import AccountHolder = API.AccountHolder;
  export import AccountHolderDocument = API.AccountHolderDocument;
  export import KYB = API.KYB;
  export import KYC = API.KYC;
  export import KYCExempt = API.KYCExempt;
  export import AccountHolderUpdateResponse = API.AccountHolderUpdateResponse;
  export import AccountHolderListDocumentsResponse = API.AccountHolderListDocumentsResponse;
  export import AccountHolderCreateWebhookResponse = API.AccountHolderCreateWebhookResponse;
  export import AccountHolderCreateParams = API.AccountHolderCreateParams;
  export import AccountHolderUpdateParams = API.AccountHolderUpdateParams;
  export import AccountHolderCreateWebhookParams = API.AccountHolderCreateWebhookParams;
  export import AccountHolderResubmitParams = API.AccountHolderResubmitParams;
  export import AccountHolderUploadDocumentParams = API.AccountHolderUploadDocumentParams;

  export import AuthRules = API.AuthRules;
  export import AuthRule = API.AuthRule;
  export import AuthRuleCreateResponse = API.AuthRuleCreateResponse;
  export import AuthRuleRetrieveResponse = API.AuthRuleRetrieveResponse;
  export import AuthRuleUpdateResponse = API.AuthRuleUpdateResponse;
  export import AuthRuleApplyResponse = API.AuthRuleApplyResponse;
  export import AuthRuleRemoveResponse = API.AuthRuleRemoveResponse;
  export import AuthRulesPage = API.AuthRulesPage;
  export import AuthRuleCreateParams = API.AuthRuleCreateParams;
  export import AuthRuleUpdateParams = API.AuthRuleUpdateParams;
  export import AuthRuleListParams = API.AuthRuleListParams;
  export import AuthRuleApplyParams = API.AuthRuleApplyParams;
  export import AuthRuleRemoveParams = API.AuthRuleRemoveParams;

  export import AuthStreamEnrollmentResource = API.AuthStreamEnrollmentResource;
  export import AuthStreamEnrollment = API.AuthStreamEnrollment;
  export import AuthStreamSecret = API.AuthStreamSecret;
  export import AuthStreamEnrollmentEnrollParams = API.AuthStreamEnrollmentEnrollParams;

  export import TokenizationDecisioning = API.TokenizationDecisioning;
  export import TokenizationSecret = API.TokenizationSecret;
  export import TokenizationDecisioningRotateSecretResponse = API.TokenizationDecisioningRotateSecretResponse;

  export import Cards = API.Cards;
  export import Card = API.Card;
  export import EmbedRequestParams = API.EmbedRequestParams;
  export import SpendLimitDuration = API.SpendLimitDuration;
  export import CardProvisionResponse = API.CardProvisionResponse;
  export import CardEmbedResponse = API.CardEmbedResponse;
  export import CardsPage = API.CardsPage;
  export import CardCreateParams = API.CardCreateParams;
  export import CardUpdateParams = API.CardUpdateParams;
  export import CardListParams = API.CardListParams;
  export import CardEmbedParams = API.CardEmbedParams;
  export import CardGetEmbedHTMLParams = API.CardGetEmbedHTMLParams;
  export import CardGetEmbedURLParams = API.CardGetEmbedURLParams;
  export import CardProvisionParams = API.CardProvisionParams;
  export import CardReissueParams = API.CardReissueParams;

  export import Balances = API.Balances;
  export import Balance = API.Balance;
  export import BalancesSinglePage = API.BalancesSinglePage;
  export import BalanceListParams = API.BalanceListParams;

  export import AggregateBalances = API.AggregateBalances;
  export import AggregateBalance = API.AggregateBalance;
  export import AggregateBalancesSinglePage = API.AggregateBalancesSinglePage;
  export import AggregateBalanceListParams = API.AggregateBalanceListParams;

  export import Disputes = API.Disputes;
  export import Dispute = API.Dispute;
  export import DisputeEvidence = API.DisputeEvidence;
  export import DisputeInitiateEvidenceUploadResponse = API.DisputeInitiateEvidenceUploadResponse;
  export import DisputesCursorPage = API.DisputesCursorPage;
  export import DisputeEvidencesCursorPage = API.DisputeEvidencesCursorPage;
  export import DisputeCreateParams = API.DisputeCreateParams;
  export import DisputeUpdateParams = API.DisputeUpdateParams;
  export import DisputeListParams = API.DisputeListParams;
  export import DisputeInitiateEvidenceUploadParams = API.DisputeInitiateEvidenceUploadParams;
  export import DisputeListEvidencesParams = API.DisputeListEvidencesParams;

  export import Events = API.Events;
  export import Event = API.Event;
  export import EventSubscription = API.EventSubscription;
  export import EventsCursorPage = API.EventsCursorPage;
  export import EventListParams = API.EventListParams;
  export import EventResendParams = API.EventResendParams;

  export import Transfers = API.Transfers;
  export import Transfer = API.Transfer;
  export import TransferCreateResponse = API.TransferCreateResponse;
  export import TransferCreateParams = API.TransferCreateParams;

  export import FinancialAccounts = API.FinancialAccounts;
  export import FinancialAccount = API.FinancialAccount;
  export import FinancialTransaction = API.FinancialTransaction;
  export import FinancialAccountsSinglePage = API.FinancialAccountsSinglePage;
  export import FinancialAccountListParams = API.FinancialAccountListParams;

  export import Transactions = API.Transactions;
  export import Transaction = API.Transaction;
  export import TransactionSimulateAuthorizationResponse = API.TransactionSimulateAuthorizationResponse;
  export import TransactionSimulateClearingResponse = API.TransactionSimulateClearingResponse;
  export import TransactionSimulateReturnResponse = API.TransactionSimulateReturnResponse;
  export import TransactionSimulateReturnReversalResponse = API.TransactionSimulateReturnReversalResponse;
  export import TransactionSimulateVoidResponse = API.TransactionSimulateVoidResponse;
  export import TransactionSimulateCreditAuthorizationResponse = API.TransactionSimulateCreditAuthorizationResponse;
  export import TransactionSimulateAuthorizationAdviceResponse = API.TransactionSimulateAuthorizationAdviceResponse;
  export import TransactionsPage = API.TransactionsPage;
  export import TransactionListParams = API.TransactionListParams;
  export import TransactionSimulateAuthorizationParams = API.TransactionSimulateAuthorizationParams;
  export import TransactionSimulateAuthorizationAdviceParams = API.TransactionSimulateAuthorizationAdviceParams;
  export import TransactionSimulateClearingParams = API.TransactionSimulateClearingParams;
  export import TransactionSimulateCreditAuthorizationParams = API.TransactionSimulateCreditAuthorizationParams;
  export import TransactionSimulateReturnParams = API.TransactionSimulateReturnParams;
  export import TransactionSimulateReturnReversalParams = API.TransactionSimulateReturnReversalParams;
  export import TransactionSimulateVoidParams = API.TransactionSimulateVoidParams;

  export import ResponderEndpoints = API.ResponderEndpoints;
  export import ResponderEndpointStatus = API.ResponderEndpointStatus;
  export import ResponderEndpointCreateResponse = API.ResponderEndpointCreateResponse;
  export import ResponderEndpointCreateParams = API.ResponderEndpointCreateParams;
  export import ResponderEndpointDeleteParams = API.ResponderEndpointDeleteParams;
  export import ResponderEndpointCheckStatusParams = API.ResponderEndpointCheckStatusParams;

  export import Webhooks = API.Webhooks;

  export import Address = API.Address;
  export import ShippingAddress = API.ShippingAddress;
}

exports = module.exports = Lithic;
export default Lithic;
