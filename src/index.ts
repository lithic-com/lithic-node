// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import * as Errors from './error';
import * as Uploads from './uploads';
import { type Agent } from './_shims/index';
import * as qs from './internal/qs';
import * as Core from './core';
import * as Pagination from './pagination';
import * as API from './resources/index';
import * as TopLevelAPI from './resources/top-level';

const environments = {
  production: 'https://api.lithic.com',
  sandbox: 'https://sandbox.lithic.com',
};
type Environment = keyof typeof environments;

export interface ClientOptions {
  /**
   * Defaults to process.env['LITHIC_API_KEY'].
   */
  apiKey?: string | undefined;

  /**
   * Defaults to process.env['LITHIC_WEBHOOK_SECRET'].
   */
  webhookSecret?: string | null | undefined;

  /**
   * Specifies the environment to use for the API.
   *
   * Each environment maps to a different base URL:
   * - `production` corresponds to `https://api.lithic.com`
   * - `sandbox` corresponds to `https://sandbox.lithic.com`
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

/**
 * API Client for interfacing with the Lithic API.
 */
export class Lithic extends Core.APIClient {
  apiKey: string;
  webhookSecret: string | null;

  private _options: ClientOptions;

  /**
   * API Client for interfacing with the Lithic API.
   *
   * @param {string | undefined} [opts.apiKey=process.env['LITHIC_API_KEY'] ?? undefined]
   * @param {string | null | undefined} [opts.webhookSecret=process.env['LITHIC_WEBHOOK_SECRET'] ?? null]
   * @param {Environment} [opts.environment=production] - Specifies the environment URL to use for the API.
   * @param {string} [opts.baseURL=process.env['LITHIC_BASE_URL'] ?? https://api.lithic.com] - Override the default base URL for the API.
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
  externalBankAccounts: API.ExternalBankAccounts = new API.ExternalBankAccounts(this);
  payments: API.Payments = new API.Payments(this);
  threeDS: API.ThreeDS = new API.ThreeDS(this);
  reports: API.Reports = new API.Reports(this);
  cardPrograms: API.CardPrograms = new API.CardPrograms(this);
  digitalCardArt: API.DigitalCardArtResource = new API.DigitalCardArtResource(this);
  bookTransfers: API.BookTransfers = new API.BookTransfers(this);
  creditProducts: API.CreditProducts = new API.CreditProducts(this);
  externalPayments: API.ExternalPayments = new API.ExternalPayments(this);
  managementOperations: API.ManagementOperations = new API.ManagementOperations(this);

  /**
   * Status of api
   */
  apiStatus(options?: Core.RequestOptions): Core.APIPromise<TopLevelAPI.APIStatus> {
    return this.get('/v1/status', options);
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
  static DEFAULT_TIMEOUT = 60000; // 1 minute

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

  static toFile = Uploads.toFile;
  static fileFromPath = Uploads.fileFromPath;
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
  export type RequestOptions = Core.RequestOptions;

  export import CursorPage = Pagination.CursorPage;
  export type CursorPageParams = Pagination.CursorPageParams;
  export type CursorPageResponse<T> = Pagination.CursorPageResponse<T>;

  export import SinglePage = Pagination.SinglePage;
  export type SinglePageResponse<T> = Pagination.SinglePageResponse<T>;

  export type APIStatus = API.APIStatus;

  export import Accounts = API.Accounts;
  export type Account = API.Account;
  export type AccountSpendLimits = API.AccountSpendLimits;
  export import AccountsCursorPage = API.AccountsCursorPage;
  export type AccountUpdateParams = API.AccountUpdateParams;
  export type AccountListParams = API.AccountListParams;

  export import AccountHolders = API.AccountHolders;
  export type AccountHolder = API.AccountHolder;
  export type KYB = API.KYB;
  export type KYC = API.KYC;
  export type KYCExempt = API.KYCExempt;
  export type RequiredDocument = API.RequiredDocument;
  export type AccountHolderCreateResponse = API.AccountHolderCreateResponse;
  export type AccountHolderUpdateResponse = API.AccountHolderUpdateResponse;
  export type AccountHolderListDocumentsResponse = API.AccountHolderListDocumentsResponse;
  export type AccountHolderSimulateEnrollmentReviewResponse =
    API.AccountHolderSimulateEnrollmentReviewResponse;
  export import AccountHoldersSinglePage = API.AccountHoldersSinglePage;
  export type AccountHolderCreateParams = API.AccountHolderCreateParams;
  export type AccountHolderUpdateParams = API.AccountHolderUpdateParams;
  export type AccountHolderListParams = API.AccountHolderListParams;
  export type AccountHolderResubmitParams = API.AccountHolderResubmitParams;
  export type AccountHolderSimulateEnrollmentDocumentReviewParams =
    API.AccountHolderSimulateEnrollmentDocumentReviewParams;
  export type AccountHolderSimulateEnrollmentReviewParams = API.AccountHolderSimulateEnrollmentReviewParams;
  export type AccountHolderUploadDocumentParams = API.AccountHolderUploadDocumentParams;

  export import AuthRules = API.AuthRules;
  export type AuthRuleRetrieveResponse = API.AuthRuleRetrieveResponse;
  export type AuthRuleMigrateV1ToV2Response = API.AuthRuleMigrateV1ToV2Response;
  export type AuthRuleRemoveResponse = API.AuthRuleRemoveResponse;
  export type AuthRuleCreateParams = API.AuthRuleCreateParams;
  export type AuthRuleUpdateParams = API.AuthRuleUpdateParams;
  export type AuthRuleListParams = API.AuthRuleListParams;
  export type AuthRuleApplyParams = API.AuthRuleApplyParams;
  export type AuthRuleRemoveParams = API.AuthRuleRemoveParams;

  export import AuthStreamEnrollment = API.AuthStreamEnrollment;
  export type AuthStreamSecret = API.AuthStreamSecret;

  export import TokenizationDecisioning = API.TokenizationDecisioning;
  export type TokenizationSecret = API.TokenizationSecret;
  export type TokenizationDecisioningRotateSecretResponse = API.TokenizationDecisioningRotateSecretResponse;

  export import Tokenizations = API.Tokenizations;
  export type Tokenization = API.Tokenization;
  export type TokenizationRetrieveResponse = API.TokenizationRetrieveResponse;
  export type TokenizationSimulateResponse = API.TokenizationSimulateResponse;
  export type TokenizationUpdateDigitalCardArtResponse = API.TokenizationUpdateDigitalCardArtResponse;
  export import TokenizationsCursorPage = API.TokenizationsCursorPage;
  export type TokenizationListParams = API.TokenizationListParams;
  export type TokenizationResendActivationCodeParams = API.TokenizationResendActivationCodeParams;
  export type TokenizationSimulateParams = API.TokenizationSimulateParams;
  export type TokenizationUpdateDigitalCardArtParams = API.TokenizationUpdateDigitalCardArtParams;

  export import Cards = API.Cards;
  export type Card = API.Card;
  export type CardSpendLimits = API.CardSpendLimits;
  export type SpendLimitDuration = API.SpendLimitDuration;
  export type CardEmbedResponse = API.CardEmbedResponse;
  export type CardProvisionResponse = API.CardProvisionResponse;
  export import CardsCursorPage = API.CardsCursorPage;
  export type CardCreateParams = API.CardCreateParams;
  export type CardUpdateParams = API.CardUpdateParams;
  export type CardListParams = API.CardListParams;
  export type CardEmbedParams = API.CardEmbedParams;
  export type CardProvisionParams = API.CardProvisionParams;
  export type CardReissueParams = API.CardReissueParams;
  export type CardRenewParams = API.CardRenewParams;
  export type CardSearchByPanParams = API.CardSearchByPanParams;

  export import Balances = API.Balances;
  export type Balance = API.Balance;
  export import BalancesSinglePage = API.BalancesSinglePage;
  export type BalanceListParams = API.BalanceListParams;

  export import AggregateBalances = API.AggregateBalances;
  export type AggregateBalance = API.AggregateBalance;
  export import AggregateBalancesSinglePage = API.AggregateBalancesSinglePage;
  export type AggregateBalanceListParams = API.AggregateBalanceListParams;

  export import Disputes = API.Disputes;
  export type Dispute = API.Dispute;
  export type DisputeEvidence = API.DisputeEvidence;
  /**
   * @deprecated use `DisputeEvidence` instead
   */
  export type DisputeInitiateEvidenceUploadResponse = API.DisputeInitiateEvidenceUploadResponse;
  export import DisputesCursorPage = API.DisputesCursorPage;
  export import DisputeEvidencesCursorPage = API.DisputeEvidencesCursorPage;
  export type DisputeCreateParams = API.DisputeCreateParams;
  export type DisputeUpdateParams = API.DisputeUpdateParams;
  export type DisputeListParams = API.DisputeListParams;
  export type DisputeInitiateEvidenceUploadParams = API.DisputeInitiateEvidenceUploadParams;
  export type DisputeListEvidencesParams = API.DisputeListEvidencesParams;

  export import Events = API.Events;
  export type Event = API.Event;
  export type EventSubscription = API.EventSubscription;
  export type MessageAttempt = API.MessageAttempt;
  export import EventsCursorPage = API.EventsCursorPage;
  export import MessageAttemptsCursorPage = API.MessageAttemptsCursorPage;
  export type EventListParams = API.EventListParams;
  export type EventListAttemptsParams = API.EventListAttemptsParams;

  export import Transfers = API.Transfers;
  export type Transfer = API.Transfer;
  export type TransferCreateParams = API.TransferCreateParams;

  export import FinancialAccounts = API.FinancialAccounts;
  export type FinancialAccount = API.FinancialAccount;
  export type FinancialTransaction = API.FinancialTransaction;
  export import FinancialAccountsSinglePage = API.FinancialAccountsSinglePage;
  export type FinancialAccountCreateParams = API.FinancialAccountCreateParams;
  export type FinancialAccountUpdateParams = API.FinancialAccountUpdateParams;
  export type FinancialAccountListParams = API.FinancialAccountListParams;

  export import Transactions = API.Transactions;
  export type Transaction = API.Transaction;
  export type TransactionSimulateAuthorizationResponse = API.TransactionSimulateAuthorizationResponse;
  export type TransactionSimulateAuthorizationAdviceResponse =
    API.TransactionSimulateAuthorizationAdviceResponse;
  export type TransactionSimulateClearingResponse = API.TransactionSimulateClearingResponse;
  export type TransactionSimulateCreditAuthorizationResponse =
    API.TransactionSimulateCreditAuthorizationResponse;
  export type TransactionSimulateReturnResponse = API.TransactionSimulateReturnResponse;
  export type TransactionSimulateReturnReversalResponse = API.TransactionSimulateReturnReversalResponse;
  export type TransactionSimulateVoidResponse = API.TransactionSimulateVoidResponse;
  export import TransactionsCursorPage = API.TransactionsCursorPage;
  export type TransactionListParams = API.TransactionListParams;
  export type TransactionSimulateAuthorizationParams = API.TransactionSimulateAuthorizationParams;
  export type TransactionSimulateAuthorizationAdviceParams = API.TransactionSimulateAuthorizationAdviceParams;
  export type TransactionSimulateClearingParams = API.TransactionSimulateClearingParams;
  export type TransactionSimulateCreditAuthorizationParams = API.TransactionSimulateCreditAuthorizationParams;
  export type TransactionSimulateReturnParams = API.TransactionSimulateReturnParams;
  export type TransactionSimulateReturnReversalParams = API.TransactionSimulateReturnReversalParams;
  export type TransactionSimulateVoidParams = API.TransactionSimulateVoidParams;

  export import ResponderEndpoints = API.ResponderEndpoints;
  export type ResponderEndpointStatus = API.ResponderEndpointStatus;
  export type ResponderEndpointCreateResponse = API.ResponderEndpointCreateResponse;
  export type ResponderEndpointCreateParams = API.ResponderEndpointCreateParams;
  export type ResponderEndpointDeleteParams = API.ResponderEndpointDeleteParams;
  export type ResponderEndpointCheckStatusParams = API.ResponderEndpointCheckStatusParams;

  export import ExternalBankAccounts = API.ExternalBankAccounts;
  export type ExternalBankAccountAddress = API.ExternalBankAccountAddress;
  export type OwnerType = API.OwnerType;
  export type VerificationMethod = API.VerificationMethod;
  export type ExternalBankAccountCreateResponse = API.ExternalBankAccountCreateResponse;
  export type ExternalBankAccountRetrieveResponse = API.ExternalBankAccountRetrieveResponse;
  export type ExternalBankAccountUpdateResponse = API.ExternalBankAccountUpdateResponse;
  export type ExternalBankAccountListResponse = API.ExternalBankAccountListResponse;
  export type ExternalBankAccountRetryMicroDepositsResponse =
    API.ExternalBankAccountRetryMicroDepositsResponse;
  export type ExternalBankAccountRetryPrenoteResponse = API.ExternalBankAccountRetryPrenoteResponse;
  export import ExternalBankAccountListResponsesCursorPage = API.ExternalBankAccountListResponsesCursorPage;
  export type ExternalBankAccountCreateParams = API.ExternalBankAccountCreateParams;
  export type ExternalBankAccountUpdateParams = API.ExternalBankAccountUpdateParams;
  export type ExternalBankAccountListParams = API.ExternalBankAccountListParams;
  export type ExternalBankAccountRetryMicroDepositsParams = API.ExternalBankAccountRetryMicroDepositsParams;
  export type ExternalBankAccountRetryPrenoteParams = API.ExternalBankAccountRetryPrenoteParams;

  export import Payments = API.Payments;
  export type Payment = API.Payment;
  export type PaymentCreateResponse = API.PaymentCreateResponse;
  export type PaymentRetryResponse = API.PaymentRetryResponse;
  export type PaymentSimulateActionResponse = API.PaymentSimulateActionResponse;
  export type PaymentSimulateReceiptResponse = API.PaymentSimulateReceiptResponse;
  export type PaymentSimulateReleaseResponse = API.PaymentSimulateReleaseResponse;
  export type PaymentSimulateReturnResponse = API.PaymentSimulateReturnResponse;
  export import PaymentsCursorPage = API.PaymentsCursorPage;
  export type PaymentCreateParams = API.PaymentCreateParams;
  export type PaymentListParams = API.PaymentListParams;
  export type PaymentSimulateActionParams = API.PaymentSimulateActionParams;
  export type PaymentSimulateReceiptParams = API.PaymentSimulateReceiptParams;
  export type PaymentSimulateReleaseParams = API.PaymentSimulateReleaseParams;
  export type PaymentSimulateReturnParams = API.PaymentSimulateReturnParams;

  export import ThreeDS = API.ThreeDS;

  export import Reports = API.Reports;
  export type SettlementDetail = API.SettlementDetail;
  export type SettlementReport = API.SettlementReport;
  export type SettlementSummaryDetails = API.SettlementSummaryDetails;

  export import CardPrograms = API.CardPrograms;
  export type CardProgram = API.CardProgram;
  export import CardProgramsCursorPage = API.CardProgramsCursorPage;
  export type CardProgramListParams = API.CardProgramListParams;

  export import DigitalCardArtResource = API.DigitalCardArtResource;
  export type DigitalCardArt = API.DigitalCardArt;
  export import DigitalCardArtsCursorPage = API.DigitalCardArtsCursorPage;
  export type DigitalCardArtListParams = API.DigitalCardArtListParams;

  export import BookTransfers = API.BookTransfers;
  export type BookTransferResponse = API.BookTransferResponse;
  export import BookTransferResponsesCursorPage = API.BookTransferResponsesCursorPage;
  export type BookTransferCreateParams = API.BookTransferCreateParams;
  export type BookTransferListParams = API.BookTransferListParams;
  export type BookTransferReverseParams = API.BookTransferReverseParams;

  export import CreditProducts = API.CreditProducts;

  export import ExternalPayments = API.ExternalPayments;
  export type ExternalPayment = API.ExternalPayment;
  export import ExternalPaymentsCursorPage = API.ExternalPaymentsCursorPage;
  export type ExternalPaymentCreateParams = API.ExternalPaymentCreateParams;
  export type ExternalPaymentListParams = API.ExternalPaymentListParams;
  export type ExternalPaymentCancelParams = API.ExternalPaymentCancelParams;
  export type ExternalPaymentReleaseParams = API.ExternalPaymentReleaseParams;
  export type ExternalPaymentReverseParams = API.ExternalPaymentReverseParams;
  export type ExternalPaymentSettleParams = API.ExternalPaymentSettleParams;

  export import ManagementOperations = API.ManagementOperations;
  export type ManagementOperationTransaction = API.ManagementOperationTransaction;
  export import ManagementOperationTransactionsCursorPage = API.ManagementOperationTransactionsCursorPage;
  export type ManagementOperationCreateParams = API.ManagementOperationCreateParams;
  export type ManagementOperationListParams = API.ManagementOperationListParams;
  export type ManagementOperationReverseParams = API.ManagementOperationReverseParams;

  export type AccountFinancialAccountType = API.AccountFinancialAccountType;
  export type Address = API.Address;
  export type AuthRule = API.AuthRule;
  export type Carrier = API.Carrier;
  export type Currency = API.Currency;
  export type Document = API.Document;
  export type InstanceFinancialAccountType = API.InstanceFinancialAccountType;
  export type ShippingAddress = API.ShippingAddress;
  export type VelocityLimitParams = API.VelocityLimitParams;
  export type VelocityLimitParamsPeriodWindow = API.VelocityLimitParamsPeriodWindow;
}

export default Lithic;
