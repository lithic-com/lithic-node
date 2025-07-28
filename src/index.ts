// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { type Agent } from './_shims/index';
import * as qs from './internal/qs';
import * as Core from './core';
import * as Errors from './error';
import * as Pagination from './pagination';
import { type CursorPageParams, CursorPageResponse, SinglePageResponse } from './pagination';
import * as Uploads from './uploads';
import * as API from './resources/index';
import * as TopLevelAPI from './resources/top-level';
import { APIStatus } from './resources/top-level';
import {
  AccountHolder,
  AccountHolderCreateParams,
  AccountHolderCreateResponse,
  AccountHolderListDocumentsResponse,
  AccountHolderListParams,
  AccountHolderSimulateEnrollmentDocumentReviewParams,
  AccountHolderSimulateEnrollmentReviewParams,
  AccountHolderSimulateEnrollmentReviewResponse,
  AccountHolderUpdateParams,
  AccountHolderUpdateResponse,
  AccountHolderUploadDocumentParams,
  AccountHolders,
  AccountHoldersSinglePage,
  AddressUpdate,
  KYB,
  KYBBusinessEntity,
  KYC,
  KYCExempt,
  RequiredDocument,
} from './resources/account-holders';
import {
  Account,
  AccountListParams,
  AccountSpendLimits,
  AccountUpdateParams,
  Accounts,
  AccountsCursorPage,
} from './resources/accounts';
import {
  AggregateBalance,
  AggregateBalanceListParams,
  AggregateBalances,
  AggregateBalancesSinglePage,
} from './resources/aggregate-balances';
import { AuthStreamEnrollment, AuthStreamSecret } from './resources/auth-stream-enrollment';
import { Balance, BalanceListParams, Balances, BalancesSinglePage } from './resources/balances';
import {
  BookTransferCreateParams,
  BookTransferListParams,
  BookTransferResponse,
  BookTransferResponsesCursorPage,
  BookTransferReverseParams,
  BookTransfers,
} from './resources/book-transfers';
import {
  CardProgram,
  CardProgramListParams,
  CardPrograms,
  CardProgramsCursorPage,
} from './resources/card-programs';
import {
  DigitalCardArt,
  DigitalCardArtListParams,
  DigitalCardArtResource,
  DigitalCardArtsCursorPage,
} from './resources/digital-card-art';
import {
  Dispute,
  DisputeCreateParams,
  DisputeEvidence,
  DisputeEvidencesCursorPage,
  DisputeInitiateEvidenceUploadParams,
  DisputeInitiateEvidenceUploadResponse,
  DisputeListEvidencesParams,
  DisputeListParams,
  DisputeUpdateParams,
  Disputes,
  DisputesCursorPage,
} from './resources/disputes';
import {
  ExternalPayment,
  ExternalPaymentCancelParams,
  ExternalPaymentCreateParams,
  ExternalPaymentListParams,
  ExternalPaymentReleaseParams,
  ExternalPaymentReverseParams,
  ExternalPaymentSettleParams,
  ExternalPayments,
  ExternalPaymentsCursorPage,
} from './resources/external-payments';
import {
  FundingEventListParams,
  FundingEventListResponse,
  FundingEventListResponsesCursorPage,
  FundingEventRetrieveDetailsResponse,
  FundingEventRetrieveResponse,
  FundingEvents,
} from './resources/funding-events';
import {
  ExternalResource,
  ExternalResourceType,
  ManagementOperationCreateParams,
  ManagementOperationListParams,
  ManagementOperationReverseParams,
  ManagementOperationTransaction,
  ManagementOperationTransactionsCursorPage,
  ManagementOperations,
} from './resources/management-operations';
import {
  NetworkProgram,
  NetworkProgramListParams,
  NetworkPrograms,
  NetworkProgramsSinglePage,
} from './resources/network-programs';
import {
  Payment,
  PaymentCreateParams,
  PaymentCreateResponse,
  PaymentListParams,
  PaymentRetryResponse,
  PaymentSimulateActionParams,
  PaymentSimulateActionResponse,
  PaymentSimulateReceiptParams,
  PaymentSimulateReceiptResponse,
  PaymentSimulateReleaseParams,
  PaymentSimulateReleaseResponse,
  PaymentSimulateReturnParams,
  PaymentSimulateReturnResponse,
  Payments,
  PaymentsCursorPage,
} from './resources/payments';
import {
  ResponderEndpointCheckStatusParams,
  ResponderEndpointCreateParams,
  ResponderEndpointCreateResponse,
  ResponderEndpointDeleteParams,
  ResponderEndpointStatus,
  ResponderEndpoints,
} from './resources/responder-endpoints';
import {
  TokenizationDecisioning,
  TokenizationDecisioningRotateSecretResponse,
  TokenizationSecret,
} from './resources/tokenization-decisioning';
import {
  Tokenization,
  TokenizationListParams,
  TokenizationResendActivationCodeParams,
  TokenizationSimulateParams,
  TokenizationSimulateResponse,
  TokenizationUpdateDigitalCardArtParams,
  TokenizationUpdateDigitalCardArtResponse,
  Tokenizations,
  TokenizationsCursorPage,
} from './resources/tokenizations';
import { Transfer, TransferCreateParams, Transfers } from './resources/transfers';
import { AuthRules } from './resources/auth-rules/auth-rules';
import {
  Card,
  CardConvertPhysicalParams,
  CardCreateParams,
  CardEmbedParams,
  CardEmbedResponse,
  CardGetEmbedHTMLParams,
  CardGetEmbedURLParams,
  CardListParams,
  CardProvisionParams,
  CardProvisionResponse,
  CardReissueParams,
  CardRenewParams,
  CardSearchByPanParams,
  CardSpendLimits,
  CardUpdateParams,
  CardWebProvisionParams,
  CardWebProvisionResponse,
  Cards,
  NonPCICard,
  NonPCICardsCursorPage,
  SpendLimitDuration,
} from './resources/cards/cards';
import { CreditProducts } from './resources/credit-products/credit-products';
import {
  Event,
  EventListAttemptsParams,
  EventListParams,
  EventResendParams,
  EventSubscription,
  Events,
  EventsCursorPage,
  MessageAttempt,
  MessageAttemptsCursorPage,
} from './resources/events/events';
import {
  ExternalBankAccountAddress,
  ExternalBankAccountCreateParams,
  ExternalBankAccountCreateResponse,
  ExternalBankAccountListParams,
  ExternalBankAccountListResponse,
  ExternalBankAccountListResponsesCursorPage,
  ExternalBankAccountRetrieveResponse,
  ExternalBankAccountRetryMicroDepositsParams,
  ExternalBankAccountRetryMicroDepositsResponse,
  ExternalBankAccountRetryPrenoteParams,
  ExternalBankAccountRetryPrenoteResponse,
  ExternalBankAccountUpdateParams,
  ExternalBankAccountUpdateResponse,
  ExternalBankAccounts,
  OwnerType,
  VerificationMethod,
} from './resources/external-bank-accounts/external-bank-accounts';
import {
  FinancialAccount,
  FinancialAccountCreateParams,
  FinancialAccountListParams,
  FinancialAccountRegisterAccountNumberParams,
  FinancialAccountUpdateParams,
  FinancialAccountUpdateStatusParams,
  FinancialAccounts,
  FinancialAccountsSinglePage,
  FinancialTransaction,
} from './resources/financial-accounts/financial-accounts';
import { Fraud } from './resources/fraud/fraud';
import {
  Reports,
  SettlementDetail,
  SettlementReport,
  SettlementSummaryDetails,
} from './resources/reports/reports';
import { ThreeDS } from './resources/three-ds/three-ds';
import {
  Transaction,
  TransactionListParams,
  TransactionSimulateAuthorizationAdviceParams,
  TransactionSimulateAuthorizationAdviceResponse,
  TransactionSimulateAuthorizationParams,
  TransactionSimulateAuthorizationResponse,
  TransactionSimulateClearingParams,
  TransactionSimulateClearingResponse,
  TransactionSimulateCreditAuthorizationParams,
  TransactionSimulateCreditAuthorizationResponse,
  TransactionSimulateReturnParams,
  TransactionSimulateReturnResponse,
  TransactionSimulateReturnReversalParams,
  TransactionSimulateReturnReversalResponse,
  TransactionSimulateVoidParams,
  TransactionSimulateVoidResponse,
  Transactions,
  TransactionsCursorPage,
} from './resources/transactions/transactions';
import { Webhooks } from './resources/webhooks';

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
  environment?: Environment | undefined;

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
   *
   * @unit milliseconds
   */
  timeout?: number | undefined;

  /**
   * An HTTP agent used to manage HTTP(S) connections.
   *
   * If not provided, an agent will be constructed by default in the Node.js environment,
   * otherwise no agent is used.
   */
  httpAgent?: Agent | undefined;

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
  maxRetries?: number | undefined;

  /**
   * Default headers to include with every request to the API.
   *
   * These can be removed in individual requests by explicitly setting the
   * header to `undefined` or `null` in request options.
   */
  defaultHeaders?: Core.Headers | undefined;

  /**
   * Default query parameters to include with every request to the API.
   *
   * These can be removed in individual requests by explicitly setting the
   * param to `undefined` in request options.
   */
  defaultQuery?: Core.DefaultQuery | undefined;
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
      baseURLOverridden: baseURL ? baseURL !== environments[options.environment || 'production'] : false,
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
  webhooks: API.Webhooks = new API.Webhooks(this);
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
  fundingEvents: API.FundingEvents = new API.FundingEvents(this);
  fraud: API.Fraud = new API.Fraud(this);
  networkPrograms: API.NetworkPrograms = new API.NetworkPrograms(this);

  /**
   * Check whether the base URL is set to its default.
   */
  #baseURLOverridden(): boolean {
    return this.baseURL !== environments[this._options.environment || 'production'];
  }

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

Lithic.Accounts = Accounts;
Lithic.AccountsCursorPage = AccountsCursorPage;
Lithic.AccountHolders = AccountHolders;
Lithic.AccountHoldersSinglePage = AccountHoldersSinglePage;
Lithic.AuthRules = AuthRules;
Lithic.AuthStreamEnrollment = AuthStreamEnrollment;
Lithic.TokenizationDecisioning = TokenizationDecisioning;
Lithic.Tokenizations = Tokenizations;
Lithic.TokenizationsCursorPage = TokenizationsCursorPage;
Lithic.Cards = Cards;
Lithic.NonPCICardsCursorPage = NonPCICardsCursorPage;
Lithic.Balances = Balances;
Lithic.BalancesSinglePage = BalancesSinglePage;
Lithic.AggregateBalances = AggregateBalances;
Lithic.AggregateBalancesSinglePage = AggregateBalancesSinglePage;
Lithic.Disputes = Disputes;
Lithic.DisputesCursorPage = DisputesCursorPage;
Lithic.DisputeEvidencesCursorPage = DisputeEvidencesCursorPage;
Lithic.Events = Events;
Lithic.EventsCursorPage = EventsCursorPage;
Lithic.MessageAttemptsCursorPage = MessageAttemptsCursorPage;
Lithic.Transfers = Transfers;
Lithic.FinancialAccounts = FinancialAccounts;
Lithic.FinancialAccountsSinglePage = FinancialAccountsSinglePage;
Lithic.Transactions = Transactions;
Lithic.TransactionsCursorPage = TransactionsCursorPage;
Lithic.ResponderEndpoints = ResponderEndpoints;
Lithic.ExternalBankAccounts = ExternalBankAccounts;
Lithic.ExternalBankAccountListResponsesCursorPage = ExternalBankAccountListResponsesCursorPage;
Lithic.Payments = Payments;
Lithic.PaymentsCursorPage = PaymentsCursorPage;
Lithic.ThreeDS = ThreeDS;
Lithic.Reports = Reports;
Lithic.CardPrograms = CardPrograms;
Lithic.CardProgramsCursorPage = CardProgramsCursorPage;
Lithic.DigitalCardArtResource = DigitalCardArtResource;
Lithic.DigitalCardArtsCursorPage = DigitalCardArtsCursorPage;
Lithic.BookTransfers = BookTransfers;
Lithic.BookTransferResponsesCursorPage = BookTransferResponsesCursorPage;
Lithic.CreditProducts = CreditProducts;
Lithic.ExternalPayments = ExternalPayments;
Lithic.ExternalPaymentsCursorPage = ExternalPaymentsCursorPage;
Lithic.ManagementOperations = ManagementOperations;
Lithic.ManagementOperationTransactionsCursorPage = ManagementOperationTransactionsCursorPage;
Lithic.FundingEvents = FundingEvents;
Lithic.FundingEventListResponsesCursorPage = FundingEventListResponsesCursorPage;
Lithic.Fraud = Fraud;
Lithic.NetworkPrograms = NetworkPrograms;
Lithic.NetworkProgramsSinglePage = NetworkProgramsSinglePage;
export declare namespace Lithic {
  export type RequestOptions = Core.RequestOptions;

  export import CursorPage = Pagination.CursorPage;
  export { type CursorPageParams as CursorPageParams, type CursorPageResponse as CursorPageResponse };

  export import SinglePage = Pagination.SinglePage;
  export { type SinglePageResponse as SinglePageResponse };

  export { type APIStatus as APIStatus };

  export {
    Accounts as Accounts,
    type Account as Account,
    type AccountSpendLimits as AccountSpendLimits,
    AccountsCursorPage as AccountsCursorPage,
    type AccountUpdateParams as AccountUpdateParams,
    type AccountListParams as AccountListParams,
  };

  export {
    AccountHolders as AccountHolders,
    type AccountHolder as AccountHolder,
    type AddressUpdate as AddressUpdate,
    type KYB as KYB,
    type KYBBusinessEntity as KYBBusinessEntity,
    type KYC as KYC,
    type KYCExempt as KYCExempt,
    type RequiredDocument as RequiredDocument,
    type AccountHolderCreateResponse as AccountHolderCreateResponse,
    type AccountHolderUpdateResponse as AccountHolderUpdateResponse,
    type AccountHolderListDocumentsResponse as AccountHolderListDocumentsResponse,
    type AccountHolderSimulateEnrollmentReviewResponse as AccountHolderSimulateEnrollmentReviewResponse,
    AccountHoldersSinglePage as AccountHoldersSinglePage,
    type AccountHolderCreateParams as AccountHolderCreateParams,
    type AccountHolderUpdateParams as AccountHolderUpdateParams,
    type AccountHolderListParams as AccountHolderListParams,
    type AccountHolderSimulateEnrollmentDocumentReviewParams as AccountHolderSimulateEnrollmentDocumentReviewParams,
    type AccountHolderSimulateEnrollmentReviewParams as AccountHolderSimulateEnrollmentReviewParams,
    type AccountHolderUploadDocumentParams as AccountHolderUploadDocumentParams,
  };

  export { AuthRules as AuthRules };

  export { AuthStreamEnrollment as AuthStreamEnrollment, type AuthStreamSecret as AuthStreamSecret };

  export {
    TokenizationDecisioning as TokenizationDecisioning,
    type TokenizationSecret as TokenizationSecret,
    type TokenizationDecisioningRotateSecretResponse as TokenizationDecisioningRotateSecretResponse,
  };

  export {
    Tokenizations as Tokenizations,
    type Tokenization as Tokenization,
    type TokenizationSimulateResponse as TokenizationSimulateResponse,
    type TokenizationUpdateDigitalCardArtResponse as TokenizationUpdateDigitalCardArtResponse,
    TokenizationsCursorPage as TokenizationsCursorPage,
    type TokenizationListParams as TokenizationListParams,
    type TokenizationResendActivationCodeParams as TokenizationResendActivationCodeParams,
    type TokenizationSimulateParams as TokenizationSimulateParams,
    type TokenizationUpdateDigitalCardArtParams as TokenizationUpdateDigitalCardArtParams,
  };

  export {
    Cards as Cards,
    type Card as Card,
    type CardSpendLimits as CardSpendLimits,
    type NonPCICard as NonPCICard,
    type SpendLimitDuration as SpendLimitDuration,
    type CardEmbedResponse as CardEmbedResponse,
    type CardProvisionResponse as CardProvisionResponse,
    type CardWebProvisionResponse as CardWebProvisionResponse,
    NonPCICardsCursorPage as NonPCICardsCursorPage,
    type CardCreateParams as CardCreateParams,
    type CardUpdateParams as CardUpdateParams,
    type CardListParams as CardListParams,
    type CardConvertPhysicalParams as CardConvertPhysicalParams,
    type CardEmbedParams as CardEmbedParams,
    type CardGetEmbedHTMLParams,
    type CardGetEmbedURLParams,
    type CardProvisionParams as CardProvisionParams,
    type CardReissueParams as CardReissueParams,
    type CardRenewParams as CardRenewParams,
    type CardSearchByPanParams as CardSearchByPanParams,
    type CardWebProvisionParams as CardWebProvisionParams,
  };

  export {
    Balances as Balances,
    type Balance as Balance,
    BalancesSinglePage as BalancesSinglePage,
    type BalanceListParams as BalanceListParams,
  };

  export {
    AggregateBalances as AggregateBalances,
    type AggregateBalance as AggregateBalance,
    AggregateBalancesSinglePage as AggregateBalancesSinglePage,
    type AggregateBalanceListParams as AggregateBalanceListParams,
  };

  export {
    Disputes as Disputes,
    type Dispute as Dispute,
    type DisputeEvidence as DisputeEvidence,
    type DisputeInitiateEvidenceUploadResponse as DisputeInitiateEvidenceUploadResponse,
    DisputesCursorPage as DisputesCursorPage,
    DisputeEvidencesCursorPage as DisputeEvidencesCursorPage,
    type DisputeCreateParams as DisputeCreateParams,
    type DisputeUpdateParams as DisputeUpdateParams,
    type DisputeListParams as DisputeListParams,
    type DisputeInitiateEvidenceUploadParams as DisputeInitiateEvidenceUploadParams,
    type DisputeListEvidencesParams as DisputeListEvidencesParams,
  };

  export {
    Events as Events,
    type Event as Event,
    type EventSubscription as EventSubscription,
    type MessageAttempt as MessageAttempt,
    EventsCursorPage as EventsCursorPage,
    MessageAttemptsCursorPage as MessageAttemptsCursorPage,
    type EventListParams as EventListParams,
    type EventListAttemptsParams as EventListAttemptsParams,
    type EventResendParams,
  };

  export {
    Transfers as Transfers,
    type Transfer as Transfer,
    type TransferCreateParams as TransferCreateParams,
  };

  export {
    FinancialAccounts as FinancialAccounts,
    type FinancialAccount as FinancialAccount,
    type FinancialTransaction as FinancialTransaction,
    FinancialAccountsSinglePage as FinancialAccountsSinglePage,
    type FinancialAccountCreateParams as FinancialAccountCreateParams,
    type FinancialAccountUpdateParams as FinancialAccountUpdateParams,
    type FinancialAccountListParams as FinancialAccountListParams,
    type FinancialAccountRegisterAccountNumberParams as FinancialAccountRegisterAccountNumberParams,
    type FinancialAccountUpdateStatusParams as FinancialAccountUpdateStatusParams,
  };

  export {
    Transactions as Transactions,
    type Transaction as Transaction,
    type TransactionSimulateAuthorizationResponse as TransactionSimulateAuthorizationResponse,
    type TransactionSimulateAuthorizationAdviceResponse as TransactionSimulateAuthorizationAdviceResponse,
    type TransactionSimulateClearingResponse as TransactionSimulateClearingResponse,
    type TransactionSimulateCreditAuthorizationResponse as TransactionSimulateCreditAuthorizationResponse,
    type TransactionSimulateReturnResponse as TransactionSimulateReturnResponse,
    type TransactionSimulateReturnReversalResponse as TransactionSimulateReturnReversalResponse,
    type TransactionSimulateVoidResponse as TransactionSimulateVoidResponse,
    TransactionsCursorPage as TransactionsCursorPage,
    type TransactionListParams as TransactionListParams,
    type TransactionSimulateAuthorizationParams as TransactionSimulateAuthorizationParams,
    type TransactionSimulateAuthorizationAdviceParams as TransactionSimulateAuthorizationAdviceParams,
    type TransactionSimulateClearingParams as TransactionSimulateClearingParams,
    type TransactionSimulateCreditAuthorizationParams as TransactionSimulateCreditAuthorizationParams,
    type TransactionSimulateReturnParams as TransactionSimulateReturnParams,
    type TransactionSimulateReturnReversalParams as TransactionSimulateReturnReversalParams,
    type TransactionSimulateVoidParams as TransactionSimulateVoidParams,
  };

  export {
    ResponderEndpoints as ResponderEndpoints,
    type ResponderEndpointStatus as ResponderEndpointStatus,
    type ResponderEndpointCreateResponse as ResponderEndpointCreateResponse,
    type ResponderEndpointCreateParams as ResponderEndpointCreateParams,
    type ResponderEndpointDeleteParams as ResponderEndpointDeleteParams,
    type ResponderEndpointCheckStatusParams as ResponderEndpointCheckStatusParams,
  };

  export { Webhooks };

  export {
    ExternalBankAccounts as ExternalBankAccounts,
    type ExternalBankAccountAddress as ExternalBankAccountAddress,
    type OwnerType as OwnerType,
    type VerificationMethod as VerificationMethod,
    type ExternalBankAccountCreateResponse as ExternalBankAccountCreateResponse,
    type ExternalBankAccountRetrieveResponse as ExternalBankAccountRetrieveResponse,
    type ExternalBankAccountUpdateResponse as ExternalBankAccountUpdateResponse,
    type ExternalBankAccountListResponse as ExternalBankAccountListResponse,
    type ExternalBankAccountRetryMicroDepositsResponse as ExternalBankAccountRetryMicroDepositsResponse,
    type ExternalBankAccountRetryPrenoteResponse as ExternalBankAccountRetryPrenoteResponse,
    ExternalBankAccountListResponsesCursorPage as ExternalBankAccountListResponsesCursorPage,
    type ExternalBankAccountCreateParams as ExternalBankAccountCreateParams,
    type ExternalBankAccountUpdateParams as ExternalBankAccountUpdateParams,
    type ExternalBankAccountListParams as ExternalBankAccountListParams,
    type ExternalBankAccountRetryMicroDepositsParams as ExternalBankAccountRetryMicroDepositsParams,
    type ExternalBankAccountRetryPrenoteParams as ExternalBankAccountRetryPrenoteParams,
  };

  export {
    Payments as Payments,
    type Payment as Payment,
    type PaymentCreateResponse as PaymentCreateResponse,
    type PaymentRetryResponse as PaymentRetryResponse,
    type PaymentSimulateActionResponse as PaymentSimulateActionResponse,
    type PaymentSimulateReceiptResponse as PaymentSimulateReceiptResponse,
    type PaymentSimulateReleaseResponse as PaymentSimulateReleaseResponse,
    type PaymentSimulateReturnResponse as PaymentSimulateReturnResponse,
    PaymentsCursorPage as PaymentsCursorPage,
    type PaymentCreateParams as PaymentCreateParams,
    type PaymentListParams as PaymentListParams,
    type PaymentSimulateActionParams as PaymentSimulateActionParams,
    type PaymentSimulateReceiptParams as PaymentSimulateReceiptParams,
    type PaymentSimulateReleaseParams as PaymentSimulateReleaseParams,
    type PaymentSimulateReturnParams as PaymentSimulateReturnParams,
  };

  export { ThreeDS as ThreeDS };

  export {
    Reports as Reports,
    type SettlementDetail as SettlementDetail,
    type SettlementReport as SettlementReport,
    type SettlementSummaryDetails as SettlementSummaryDetails,
  };

  export {
    CardPrograms as CardPrograms,
    type CardProgram as CardProgram,
    CardProgramsCursorPage as CardProgramsCursorPage,
    type CardProgramListParams as CardProgramListParams,
  };

  export {
    DigitalCardArtResource as DigitalCardArtResource,
    type DigitalCardArt as DigitalCardArt,
    DigitalCardArtsCursorPage as DigitalCardArtsCursorPage,
    type DigitalCardArtListParams as DigitalCardArtListParams,
  };

  export {
    BookTransfers as BookTransfers,
    type BookTransferResponse as BookTransferResponse,
    BookTransferResponsesCursorPage as BookTransferResponsesCursorPage,
    type BookTransferCreateParams as BookTransferCreateParams,
    type BookTransferListParams as BookTransferListParams,
    type BookTransferReverseParams as BookTransferReverseParams,
  };

  export { CreditProducts as CreditProducts };

  export {
    ExternalPayments as ExternalPayments,
    type ExternalPayment as ExternalPayment,
    ExternalPaymentsCursorPage as ExternalPaymentsCursorPage,
    type ExternalPaymentCreateParams as ExternalPaymentCreateParams,
    type ExternalPaymentListParams as ExternalPaymentListParams,
    type ExternalPaymentCancelParams as ExternalPaymentCancelParams,
    type ExternalPaymentReleaseParams as ExternalPaymentReleaseParams,
    type ExternalPaymentReverseParams as ExternalPaymentReverseParams,
    type ExternalPaymentSettleParams as ExternalPaymentSettleParams,
  };

  export {
    ManagementOperations as ManagementOperations,
    type ExternalResource as ExternalResource,
    type ExternalResourceType as ExternalResourceType,
    type ManagementOperationTransaction as ManagementOperationTransaction,
    ManagementOperationTransactionsCursorPage as ManagementOperationTransactionsCursorPage,
    type ManagementOperationCreateParams as ManagementOperationCreateParams,
    type ManagementOperationListParams as ManagementOperationListParams,
    type ManagementOperationReverseParams as ManagementOperationReverseParams,
  };

  export {
    FundingEvents as FundingEvents,
    type FundingEventRetrieveResponse as FundingEventRetrieveResponse,
    type FundingEventListResponse as FundingEventListResponse,
    type FundingEventRetrieveDetailsResponse as FundingEventRetrieveDetailsResponse,
    FundingEventListResponsesCursorPage as FundingEventListResponsesCursorPage,
    type FundingEventListParams as FundingEventListParams,
  };

  export { Fraud as Fraud };

  export {
    NetworkPrograms as NetworkPrograms,
    type NetworkProgram as NetworkProgram,
    NetworkProgramsSinglePage as NetworkProgramsSinglePage,
    type NetworkProgramListParams as NetworkProgramListParams,
  };

  export type AccountFinancialAccountType = API.AccountFinancialAccountType;
  export type Address = API.Address;
  export type Carrier = API.Carrier;
  export type Currency = API.Currency;
  export type Document = API.Document;
  export type InstanceFinancialAccountType = API.InstanceFinancialAccountType;
  export type ShippingAddress = API.ShippingAddress;
}

export { toFile, fileFromPath } from './uploads';
export {
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
} from './error';

export default Lithic;
