// File generated from our OpenAPI spec by Stainless.
import * as Core from './core';
import * as API from './resources';
import type { Agent } from 'http';

const environments = { production: 'https://api.lithic.com/v1', sandbox: 'https://sandbox.lithic.com/v1' };

export class Lithic extends Core.APIClient {
  constructor(
    apiKey: string,
    {
      environment = 'production',
      baseURL,
      timeout,
      httpAgent,
    }: {
      environment?: keyof typeof environments;
      baseURL?: string;
      timeout?: number;
      httpAgent?: Agent;
    } = {},
  ) {
    super({
      apiKey,
      baseURL: baseURL || environments[environment],
      timeout,
      httpAgent,
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
    const Authorization = `api-key ${this.apiKey}`;
    return {
      ...super.defaultHeaders(),
      Authorization,
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
