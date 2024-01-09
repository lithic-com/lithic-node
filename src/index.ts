// File generated from our OpenAPI spec by Stainless.

import * as Core from './core';
import * as Pagination from './pagination';
import * as Errors from './error';
import { type Agent } from './_shims/index';
import * as Uploads from './uploads';
import * as qs from 'qs';
import * as API from 'lithic/resources/index';
import * as TopLevelAPI from 'lithic/resources/top-level';

const environments = {
  production: 'https://api.lithic.com/v1',
  sandbox: 'https://sandbox.lithic.com/v1',
};
type Environment = keyof typeof environments;

export interface ClientOptions {
  /**
   * Defaults to process.env['LITHIC_API_KEY'].
   */
  apiKey?: string;

  /**
   * Defaults to process.env['LITHIC_WEBHOOK_SECRET'].
   */
  webhookSecret?: string | null;

  /**
   * Specifies the environment to use for the API.
   *
   * Each environment maps to a different base URL:
   * - `production` corresponds to `https://api.lithic.com/v1`
   * - `sandbox` corresponds to `https://sandbox.lithic.com/v1`
   */
  environment?: Environment;

  /**
   * Override the default base URL for the API, e.g., "https://api.example.com/v2/"
   *
   * Defaults to process.env['LITHIC_BASE_URL'].
   */
  baseURL?: string | null | undefined;

  /**
   * The maximum amount of time (in milliseconds) that the client should wait for a response
   * from the server before timing out a single request.
   *
   * Note that request timeouts are retried by default, so in a worst-case scenario you may wait
   * much longer than this timeout before the promise succeeds or fails.
   */
  timeout?: number;

  /**
   * An HTTP agent used to manage HTTP(S) connections.
   *
   * If not provided, an agent will be constructed by default in the Node.js environment,
   * otherwise no agent is used.
   */
  httpAgent?: Agent;

  /**
   * Specify a custom `fetch` function implementation.
   *
   * If not provided, we use `node-fetch` on Node.js and otherwise expect that `fetch` is
   * defined globally.
   */
  fetch?: Core.Fetch | undefined;

  /**
   * The maximum number of times that the client will retry a request in case of a
   * temporary failure, like a network error or a 5XX error from the server.
   *
   * @default 2
   */
  maxRetries?: number;

  /**
   * Default headers to include with every request to the API.
   *
   * These can be removed in individual requests by explicitly setting the
   * header to `undefined` or `null` in request options.
   */
  defaultHeaders?: Core.Headers;

  /**
   * Default query parameters to include with every request to the API.
   *
   * These can be removed in individual requests by explicitly setting the
   * param to `undefined` in request options.
   */
  defaultQuery?: Core.DefaultQuery;
}

/** API Client for interfacing with the Lithic API. */
export class Lithic extends Core.APIClient {
  apiKey: string;
  webhookSecret: string | null;

  private _options: ClientOptions;

  /**
   * API Client for interfacing with the Lithic API.
   *
   * @param {string} [opts.apiKey=process.env['LITHIC_API_KEY'] ?? undefined]
   * @param {string | null} [opts.webhookSecret=process.env['LITHIC_WEBHOOK_SECRET'] ?? null]
   * @param {Environment} [opts.environment=production] - Specifies the environment URL to use for the API.
   * @param {string} [opts.baseURL=process.env['LITHIC_BASE_URL'] ?? https://api.lithic.com/v1] - Override the default base URL for the API.
   * @param {number} [opts.timeout=1 minute] - The maximum amount of time (in milliseconds) the client will wait for a response before timing out.
   * @param {number} [opts.httpAgent] - An HTTP agent used to manage HTTP(s) connections.
   * @param {Core.Fetch} [opts.fetch] - Specify a custom `fetch` function implementation.
   * @param {number} [opts.maxRetries=2] - The maximum number of times the client will retry a request.
   * @param {Core.Headers} opts.defaultHeaders - Default headers to include with every request to the API.
   * @param {Core.DefaultQuery} opts.defaultQuery - Default query parameters to include with every request to the API.
   */
  constructor({
    baseURL = Core.readEnv('LITHIC_BASE_URL'),
    apiKey = Core.readEnv('LITHIC_API_KEY'),
    webhookSecret = Core.readEnv('LITHIC_WEBHOOK_SECRET') ?? null,
    ...opts
  }: ClientOptions = {}) {
    if (apiKey === undefined) {
      throw new Errors.LithicError(
        "The LITHIC_API_KEY environment variable is missing or empty; either provide it, or instantiate the Lithic client with an apiKey option, like new Lithic({ apiKey: 'My Lithic API Key' }).",
      );
    }

    const options: ClientOptions = {
      apiKey,
      webhookSecret,
      ...opts,
      baseURL,
      environment: opts.environment ?? 'production',
    };

    if (baseURL && opts.environment) {
      throw new Errors.LithicError(
        'Ambiguous URL; The `baseURL` option (or LITHIC_BASE_URL env var) and the `environment` option are given. If you want to use the environment you must pass baseURL: null',
      );
    }

    super({
      baseURL: options.baseURL || environments[options.environment || 'production'],
      timeout: options.timeout ?? 60000 /* 1 minute */,
      httpAgent: options.httpAgent,
      maxRetries: options.maxRetries,
      fetch: options.fetch,
    });
    this._options = options;
    this.idempotencyHeader = 'Idempotency-Key';

    this.apiKey = apiKey;
    this.webhookSecret = webhookSecret;
  }

  accounts: API.Accounts = new API.Accounts(this);
  accountHolders: API.AccountHolders = new API.AccountHolders(this);
  authRules: API.AuthRules = new API.AuthRules(this);
  authStreamEnrollment: API.AuthStreamEnrollment = new API.AuthStreamEnrollment(this);
  tokenizationDecisioning: API.TokenizationDecisioning = new API.TokenizationDecisioning(this);
  tokenizations: API.Tokenizations = new API.Tokenizations(this);
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
  externalBankAccounts: API.ExternalBankAccounts = new API.ExternalBankAccounts(this);
  payments: API.Payments = new API.Payments(this);
  threeDS: API.ThreeDS = new API.ThreeDS(this);
  reports: API.Reports = new API.Reports(this);
  cardProduct: API.CardProduct = new API.CardProduct(this);
  cardPrograms: API.CardPrograms = new API.CardPrograms(this);
  digitalCardArt: API.DigitalCardArtResource = new API.DigitalCardArtResource(this);

  /**
   * Status of api
   */
  apiStatus(options?: Core.RequestOptions): Core.APIPromise<TopLevelAPI.APIStatus> {
    return this.get('/status', options);
  }

  protected override defaultQuery(): Core.DefaultQuery | undefined {
    return this._options.defaultQuery;
  }

  protected override defaultHeaders(opts: Core.FinalRequestOptions): Core.Headers {
    return {
      ...super.defaultHeaders(opts),
      'X-Lithic-Pagination': 'cursor',
      ...this._options.defaultHeaders,
    };
  }

  protected override authHeaders(opts: Core.FinalRequestOptions): Core.Headers {
    return { Authorization: this.apiKey };
  }

  protected override stringifyQuery(query: Record<string, unknown>): string {
    return qs.stringify(query, { arrayFormat: 'comma' });
  }

  static Lithic = this;

  static LithicError = Errors.LithicError;
  static APIError = Errors.APIError;
  static APIConnectionError = Errors.APIConnectionError;
  static APIConnectionTimeoutError = Errors.APIConnectionTimeoutError;
  static APIUserAbortError = Errors.APIUserAbortError;
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
  LithicError,
  APIError,
  APIConnectionError,
  APIConnectionTimeoutError,
  APIUserAbortError,
  NotFoundError,
  ConflictError,
  RateLimitError,
  BadRequestError,
  AuthenticationError,
  InternalServerError,
  PermissionDeniedError,
  UnprocessableEntityError,
} = Errors;

export import toFile = Uploads.toFile;
export import fileFromPath = Uploads.fileFromPath;

export namespace Lithic {
  // Helper functions
  export import toFile = Uploads.toFile;
  export import fileFromPath = Uploads.fileFromPath;

  export import RequestOptions = Core.RequestOptions;

  export import CursorPage = Pagination.CursorPage;
  export import CursorPageParams = Pagination.CursorPageParams;
  export import CursorPageResponse = Pagination.CursorPageResponse;

  export import SinglePage = Pagination.SinglePage;
  export import SinglePageResponse = Pagination.SinglePageResponse;

  export import APIStatus = API.APIStatus;

  export import Accounts = API.Accounts;
  export import Account = API.Account;
  export import AccountSpendLimits = API.AccountSpendLimits;
  export import BusinessAccount = API.BusinessAccount;
  export import AccountsCursorPage = API.AccountsCursorPage;
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
  export import AccountHolderCreateParams = API.AccountHolderCreateParams;
  export import AccountHolderUpdateParams = API.AccountHolderUpdateParams;
  export import AccountHolderResubmitParams = API.AccountHolderResubmitParams;
  export import AccountHolderUploadDocumentParams = API.AccountHolderUploadDocumentParams;

  export import AuthRules = API.AuthRules;
  export import AuthRule = API.AuthRule;
  export import AuthRuleRetrieveResponse = API.AuthRuleRetrieveResponse;
  export import AuthRuleRemoveResponse = API.AuthRuleRemoveResponse;
  export import AuthRulesCursorPage = API.AuthRulesCursorPage;
  export import AuthRuleCreateParams = API.AuthRuleCreateParams;
  export import AuthRuleUpdateParams = API.AuthRuleUpdateParams;
  export import AuthRuleListParams = API.AuthRuleListParams;
  export import AuthRuleApplyParams = API.AuthRuleApplyParams;
  export import AuthRuleRemoveParams = API.AuthRuleRemoveParams;

  export import AuthStreamEnrollment = API.AuthStreamEnrollment;
  export import AuthStreamSecret = API.AuthStreamSecret;

  export import TokenizationDecisioning = API.TokenizationDecisioning;
  export import TokenizationSecret = API.TokenizationSecret;
  export import TokenizationDecisioningRotateSecretResponse = API.TokenizationDecisioningRotateSecretResponse;

  export import Tokenizations = API.Tokenizations;
  export import Tokenization = API.Tokenization;
  export import TokenizationSimulateResponse = API.TokenizationSimulateResponse;
  export import TokenizationSimulateParams = API.TokenizationSimulateParams;

  export import Cards = API.Cards;
  export import Card = API.Card;
  export import CardSpendLimits = API.CardSpendLimits;
  export import EmbedRequestParams = API.EmbedRequestParams;
  export import SpendLimitDuration = API.SpendLimitDuration;
  export import CardEmbedResponse = API.CardEmbedResponse;
  export import CardProvisionResponse = API.CardProvisionResponse;
  export import CardsCursorPage = API.CardsCursorPage;
  export import CardCreateParams = API.CardCreateParams;
  export import CardUpdateParams = API.CardUpdateParams;
  export import CardListParams = API.CardListParams;
  export import CardEmbedParams = API.CardEmbedParams;
  export import CardGetEmbedHTMLParams = API.CardGetEmbedHTMLParams;
  export import CardGetEmbedURLParams = API.CardGetEmbedURLParams;
  export import CardProvisionParams = API.CardProvisionParams;
  export import CardReissueParams = API.CardReissueParams;
  export import CardRenewParams = API.CardRenewParams;

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
  /**
   * @deprecated use `DisputeEvidence` instead
   */
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
  export import MessageAttempt = API.MessageAttempt;
  export import EventsCursorPage = API.EventsCursorPage;
  export import MessageAttemptsCursorPage = API.MessageAttemptsCursorPage;
  export import EventListParams = API.EventListParams;
  export import EventListAttemptsParams = API.EventListAttemptsParams;
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
  export import TransactionSimulateAuthorizationAdviceResponse = API.TransactionSimulateAuthorizationAdviceResponse;
  export import TransactionSimulateClearingResponse = API.TransactionSimulateClearingResponse;
  export import TransactionSimulateCreditAuthorizationResponse = API.TransactionSimulateCreditAuthorizationResponse;
  export import TransactionSimulateReturnResponse = API.TransactionSimulateReturnResponse;
  export import TransactionSimulateReturnReversalResponse = API.TransactionSimulateReturnReversalResponse;
  export import TransactionSimulateVoidResponse = API.TransactionSimulateVoidResponse;
  export import TransactionsCursorPage = API.TransactionsCursorPage;
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

  export import ExternalBankAccounts = API.ExternalBankAccounts;
  export import ExternalBankAccountAddress = API.ExternalBankAccountAddress;
  export import OwnerType = API.OwnerType;
  export import VerificationMethod = API.VerificationMethod;
  export import ExternalBankAccountCreateResponse = API.ExternalBankAccountCreateResponse;
  export import ExternalBankAccountRetrieveResponse = API.ExternalBankAccountRetrieveResponse;
  export import ExternalBankAccountUpdateResponse = API.ExternalBankAccountUpdateResponse;
  export import ExternalBankAccountListResponse = API.ExternalBankAccountListResponse;
  export import ExternalBankAccountListResponsesCursorPage = API.ExternalBankAccountListResponsesCursorPage;
  export import ExternalBankAccountCreateParams = API.ExternalBankAccountCreateParams;
  export import ExternalBankAccountUpdateParams = API.ExternalBankAccountUpdateParams;
  export import ExternalBankAccountListParams = API.ExternalBankAccountListParams;

  export import Payments = API.Payments;
  export import Payment = API.Payment;
  export import PaymentCreateResponse = API.PaymentCreateResponse;
  export import PaymentRetryResponse = API.PaymentRetryResponse;
  export import PaymentSimulateReleaseResponse = API.PaymentSimulateReleaseResponse;
  export import PaymentSimulateReturnResponse = API.PaymentSimulateReturnResponse;
  export import PaymentsCursorPage = API.PaymentsCursorPage;
  export import PaymentCreateParams = API.PaymentCreateParams;
  export import PaymentListParams = API.PaymentListParams;
  export import PaymentSimulateReleaseParams = API.PaymentSimulateReleaseParams;
  export import PaymentSimulateReturnParams = API.PaymentSimulateReturnParams;

  export import ThreeDS = API.ThreeDS;

  export import Reports = API.Reports;
  export import SettlementDetail = API.SettlementDetail;
  export import SettlementReport = API.SettlementReport;
  export import SettlementSummaryDetails = API.SettlementSummaryDetails;

  export import CardProduct = API.CardProduct;
  export import CardProductCreditDetailResponse = API.CardProductCreditDetailResponse;

  export import CardPrograms = API.CardPrograms;
  export import CardProgram = API.CardProgram;
  export import CardProgramsCursorPage = API.CardProgramsCursorPage;
  export import CardProgramListParams = API.CardProgramListParams;

  export import DigitalCardArtResource = API.DigitalCardArtResource;
  export import DigitalCardArt = API.DigitalCardArt;
  export import DigitalCardArtsCursorPage = API.DigitalCardArtsCursorPage;
  export import DigitalCardArtListParams = API.DigitalCardArtListParams;

  export import Address = API.Address;
  export import Carrier = API.Carrier;
  export import ShippingAddress = API.ShippingAddress;
}

export default Lithic;
