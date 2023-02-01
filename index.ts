// File generated from our OpenAPI spec by Stainless.
import qs from 'qs';
import * as Core from './core';
import * as Pagination from './pagination';
import * as API from './resources';
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
};

/** Instantiate the API Client. */
export class Lithic extends Core.APIClient {
  apiKey: string;

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
    });
    this.apiKey = options.apiKey;
  }

  accounts: API.Accounts = new API.Accounts(this);
  accountHolders: API.AccountHolders = new API.AccountHolders(this);
  authRules: API.AuthRules = new API.AuthRules(this);
  authStreamEnrollment: API.AuthStreamEnrollmentResource = new API.AuthStreamEnrollmentResource(this);
  cards: API.Cards = new API.Cards(this);
  fundingSources: API.FundingSources = new API.FundingSources(this);
  transactions: API.Transactions = new API.Transactions(this);

  /**
   * API status check
   */
  apiStatus(options?: Core.RequestOptions): Promise<Core.APIResponse<Lithic.APIStatus>> {
    return this.get('/status', options);
  }

  protected override authHeaders(): Core.Headers {
    return { Authorization: this.apiKey || '' };
  }

  protected override qsOptions(): qs.IStringifyOptions {
    return { arrayFormat: 'comma' };
  }

  static APIError = Core.APIError;

  static APIConnectionError = Core.APIConnectionError;
  static APIConnectionTimeoutError = Core.APIConnectionTimeoutError;

  static BadRequestError = Core.BadRequestError;
  static AuthenticationError = Core.AuthenticationError;
  static PermissionDeniedError = Core.PermissionDeniedError;
  static NotFoundError = Core.NotFoundError;
  static ConflictError = Core.ConflictError;
  static UnprocessableEntityError = Core.UnprocessableEntityError;
  static RateLimitError = Core.RateLimitError;
  static InternalServerError = Core.InternalServerError;
}

export const {
  APIError,

  APIConnectionError,
  APIConnectionTimeoutError,

  BadRequestError,
  AuthenticationError,
  PermissionDeniedError,
  NotFoundError,
  ConflictError,
  UnprocessableEntityError,
  RateLimitError,
  InternalServerError,
} = Lithic;

export namespace Lithic {
  // Helper functions
  export import fileFromPath = FileFromPath.fileFromPath;

  export import Page = Pagination.Page;
  export import PageParams = Pagination.PageParams;
  export import PageResponse = Pagination.PageResponse;

  export import APIStatus = API.APIStatus;

  export import Account = API.Account;
  export import AccountsPage = API.AccountsPage;
  export import AccountUpdateParams = API.AccountUpdateParams;
  export import AccountListParams = API.AccountListParams;

  export import AccountHolder = API.AccountHolder;
  export import AccountHolderDocument = API.AccountHolderDocument;
  export import AccountHolderUpdateResponse = API.AccountHolderUpdateResponse;
  export import AccountHolderListDocumentsResponse = API.AccountHolderListDocumentsResponse;
  export import AccountHolderCreateWebhookResponse = API.AccountHolderCreateWebhookResponse;
  export import AccountHolderCreateParams = API.AccountHolderCreateParams;
  export import AccountHolderUpdateParams = API.AccountHolderUpdateParams;
  export import AccountHolderCreateWebhookParams = API.AccountHolderCreateWebhookParams;
  export import AccountHolderResubmitParams = API.AccountHolderResubmitParams;
  export import AccountHolderUploadDocumentParams = API.AccountHolderUploadDocumentParams;

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

  export import AuthStreamEnrollment = API.AuthStreamEnrollment;
  export import AuthStreamEnrollmentEnrollParams = API.AuthStreamEnrollmentEnrollParams;

  export import Card = API.Card;
  export import EmbedRequestParams = API.EmbedRequestParams;
  export import SpendLimitDuration = API.SpendLimitDuration;
  export import CardProvisionResponse = API.CardProvisionResponse;
  export import CardEmbedResponse = API.CardEmbedResponse;
  export import CardsPage = API.CardsPage;
  export import CardCreateParams = API.CardCreateParams;
  export import CardRetrieveParams = API.CardRetrieveParams;
  export import CardUpdateParams = API.CardUpdateParams;
  export import CardListParams = API.CardListParams;
  export import CardEmbedParams = API.CardEmbedParams;
  export import CardGetEmbedHTMLParams = API.CardGetEmbedHTMLParams;
  export import CardGetEmbedURLParams = API.CardGetEmbedURLParams;
  export import CardProvisionParams = API.CardProvisionParams;
  export import CardReissueParams = API.CardReissueParams;

  export import FundingSource = API.FundingSource;
  export import FundingSourcesPage = API.FundingSourcesPage;
  export import FundingSourceCreateParams = API.FundingSourceCreateParams;
  export import FundingSourceUpdateParams = API.FundingSourceUpdateParams;
  export import FundingSourceListParams = API.FundingSourceListParams;
  export import FundingSourceVerifyParams = API.FundingSourceVerifyParams;

  export import Transaction = API.Transaction;
  export import TransactionSimulateAuthorizationResponse = API.TransactionSimulateAuthorizationResponse;
  export import TransactionSimulateClearingResponse = API.TransactionSimulateClearingResponse;
  export import TransactionSimulateReturnResponse = API.TransactionSimulateReturnResponse;
  export import TransactionSimulateReturnReversalResponse = API.TransactionSimulateReturnReversalResponse;
  export import TransactionSimulateVoidResponse = API.TransactionSimulateVoidResponse;
  export import TransactionSimulateCreditAuthorizationResponse = API.TransactionSimulateCreditAuthorizationResponse;
  export import TransactionsPage = API.TransactionsPage;
  export import TransactionListParams = API.TransactionListParams;
  export import TransactionSimulateAuthorizationParams = API.TransactionSimulateAuthorizationParams;
  export import TransactionSimulateClearingParams = API.TransactionSimulateClearingParams;
  export import TransactionSimulateCreditAuthorizationParams = API.TransactionSimulateCreditAuthorizationParams;
  export import TransactionSimulateReturnParams = API.TransactionSimulateReturnParams;
  export import TransactionSimulateReturnReversalParams = API.TransactionSimulateReturnReversalParams;
  export import TransactionSimulateVoidParams = API.TransactionSimulateVoidParams;

  export import Address = API.Address;
  export import ShippingAddress = API.ShippingAddress;
}

exports = module.exports = Lithic;
export default Lithic;
