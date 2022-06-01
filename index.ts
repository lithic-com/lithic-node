// File generated from our OpenAPI spec by Stainless.
import * as Core from './core';
import * as API from './resources';
import { isRequestOptions } from './core';
import type { Agent } from 'http';

const environments = {
  production: 'https://api.lithic.com/v1',
  sandbox: 'https://sandbox.lithic.com/v1',
};

type Config = {
  /**
   * Defaults to to process.env["LITHIC_API_KEY"]. Set it to null if you want to send unauthenticated requests.
   */
  apiKey?: string | null;
  environment?: keyof typeof environments;
  baseURL?: string;
  timeout?: number;
  httpAgent?: Agent;
};

export class Lithic extends Core.APIClient {
  constructor();
  constructor(options: Config);
  /**
   * @deprecated The parameter 'apiKey' will be removed in the near future. Instead use `new Lithic({apiKey: 'my api key'})` or the environment variable `LITHIC_API_KEY`.
   */
  constructor(apiKey: string);
  /**
   * @deprecated The parameter 'apiKey' will be removed in the near future. Instead use `new Lithic({apiKey: 'my api key'})` or the environment variable `LITHIC_API_KEY`.
   */
  constructor(apiKey: string, options: Config);
  constructor(...args: [] | [string] | [string, Config] | [Config]) {
    let apiKey: string | null | undefined;
    let options: Config;
    if (args.length > 2) {
      throw new Error('Unexpected parameters passed to the Lithic client constructor');
    }
    if (args.length === 0) {
      apiKey = undefined;
      options = {};
    } else if (typeof args[0] === 'string') {
      console.warn(`We have changed how API Keys are passed to the Lithic client and will remove support for the parameter 'apiKey' in the near future. Please pass it as an option instead, like this:
      new Lithic({apiKey: 'my api key'})
      Or, use the environment variable LITHIC_API_KEY="my api key".`);
      options = args[1] || {};
      apiKey = options.apiKey || args[0];
    } else if (typeof args[0] === 'object') {
      options = args[0] || {};
      apiKey = options.apiKey;
    } else {
      throw new Error('Unexpected parameters passed to the Lithic client constructor');
    }

    const defaultOptions: Config = {
      apiKey: process.env['LITHIC_API_KEY'] || '',
      environment: 'production',
    };
    options = { ...defaultOptions, ...options };

    if (!apiKey && apiKey !== null) {
      apiKey = options.apiKey;
    }
    if (!apiKey && apiKey !== null) {
      throw new Error(
        "The LITHIC_API_KEY environment variable is missing or empty; either provide it, or instantiate the Lithic client with an apiKey option, like new Lithic({apiKey: 'my api key'}).",
      );
    }

    super({
      apiKey,
      baseURL: options.baseURL || environments[options.environment || 'production'],
      timeout: options.timeout,
      httpAgent: options.httpAgent,
    });
  }

  accounts: API.Accounts = new API.Accounts(this);
  accountHolders: API.AccountHolders = new API.AccountHolders(this);
  authRules: API.AuthRules = new API.AuthRules(this);
  authStreamEnrollment: API.AuthStreamEnrollmentResource = new API.AuthStreamEnrollmentResource(this);
  cards: API.Cards = new API.Cards(this);
  fundingSources: API.FundingSources = new API.FundingSources(this);
  transactions: API.Transactions = new API.Transactions(this);
  status: API.StatusResource = new API.StatusResource(this);

  protected override defaultHeaders(): Core.Headers {
    return {
      ...super.defaultHeaders(),
      Authorization: this.apiKey || '',
    };
  }

  getNextPageQuery(
    request: Core.FinalRequestOptions<Lithic.PaginationParams>,
    response: Core.APIList<unknown>,
  ): Partial<Lithic.PaginationParams> | false {
    // Do not iterate if we're on the last page.
    if (response.page >= response.total_pages) return false;

    return { page: response.page + 1 };
  }

  getPaginatedItems<Rsp>(response: Core.APIList<Rsp>): Rsp[] {
    return response.data;
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

export namespace Lithic {
  export import ShippingAddress = API.ShippingAddress;

  export import Account = API.Account;
  export import AccountUpdateParams = API.AccountUpdateParams;
  export import AccountListParams = API.AccountListParams;

  export import AccountHolder = API.AccountHolder;
  export import AccountHolderDocument = API.AccountHolderDocument;
  export import AccountHolderCreateWebhookResponse = API.AccountHolderCreateWebhookResponse;
  export import AccountHolderListDocumentsResponse = API.AccountHolderListDocumentsResponse;
  export import AccountHolderCreateParams = API.AccountHolderCreateParams;
  export import AccountHolderCreateWebhookParams = API.AccountHolderCreateWebhookParams;
  export import AccountHolderResubmitParams = API.AccountHolderResubmitParams;
  export import AccountHolderUploadDocumentParams = API.AccountHolderUploadDocumentParams;

  export import AuthRule = API.AuthRule;
  export import AuthRuleCreateResponse = API.AuthRuleCreateResponse;
  export import AuthRuleRetrieveResponse = API.AuthRuleRetrieveResponse;
  export import AuthRuleUpdateResponse = API.AuthRuleUpdateResponse;
  export import AuthRuleListResponse = API.AuthRuleListResponse;
  export import AuthRuleApplyResponse = API.AuthRuleApplyResponse;
  export import AuthRuleRemoveResponse = API.AuthRuleRemoveResponse;
  export import AuthRuleCreateParams = API.AuthRuleCreateParams;
  export import AuthRuleUpdateParams = API.AuthRuleUpdateParams;
  export import AuthRuleListParams = API.AuthRuleListParams;
  export import AuthRuleApplyParams = API.AuthRuleApplyParams;
  export import AuthRuleRemoveParams = API.AuthRuleRemoveParams;

  export import AuthStreamEnrollment = API.AuthStreamEnrollment;
  export import AuthStreamEnrollmentEnrollParams = API.AuthStreamEnrollmentEnrollParams;

  export import Card = API.Card;
  export import CardProvisionResponse = API.CardProvisionResponse;
  export import CardCreateParams = API.CardCreateParams;
  export import CardUpdateParams = API.CardUpdateParams;
  export import CardListParams = API.CardListParams;
  export import CardEmbedParams = API.CardEmbedParams;
  export import CardProvisionParams = API.CardProvisionParams;
  export import CardReissueParams = API.CardReissueParams;

  export import FundingSource = API.FundingSource;
  export import FundingSourceCreateParams = API.FundingSourceCreateParams;
  export import FundingSourceUpdateParams = API.FundingSourceUpdateParams;
  export import FundingSourceListParams = API.FundingSourceListParams;
  export import FundingSourceVerifyParams = API.FundingSourceVerifyParams;

  export import Transaction = API.Transaction;
  export import TransactionSimulateAuthorizationResponse = API.TransactionSimulateAuthorizationResponse;
  export import TransactionSimulateClearingResponse = API.TransactionSimulateClearingResponse;
  export import TransactionSimulateReturnResponse = API.TransactionSimulateReturnResponse;
  export import TransactionSimulateVoidResponse = API.TransactionSimulateVoidResponse;
  export import TransactionListParams = API.TransactionListParams;
  export import TransactionSimulateAuthorizationParams = API.TransactionSimulateAuthorizationParams;
  export import TransactionSimulateClearingParams = API.TransactionSimulateClearingParams;
  export import TransactionSimulateReturnParams = API.TransactionSimulateReturnParams;
  export import TransactionSimulateVoidParams = API.TransactionSimulateVoidParams;

  export import APIStatus = API.APIStatus;

  export type PaginationParams = {
    page?: number;
    page_size?: number;
  };
}

exports = module.exports = Lithic;
export default Lithic;
