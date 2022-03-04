import * as Core from './core';
import * as API from './resources';

const environments = {
  production: 'https://api.lithic.com/v1',
  sandbox: 'https://sandbox.lithic.com/v1',
};

export class Lithic extends Core.APIClient {
  constructor(
    apiKey: string,
    {
      environment = 'production',
      baseURL,
      timeout,
    }: {
      environment?: keyof typeof environments;
      baseURL?: string;
      timeout?: number;
    } = {}
  ) {
    super({
      apiKey,
      baseURL: baseURL || environments[environment],
      timeout,
    });
  }

  accounts: API.Accounts = new API.Accounts(this);
  authStreamEnrollment: API.AuthStreamEnrollmentResource =
    new API.AuthStreamEnrollmentResource(this);
  cards: API.Cards = new API.Cards(this);
  consumers: API.Consumers = new API.Consumers(this);
  fundingSources: API.FundingSources = new API.FundingSources(this);
  transactions: API.Transactions = new API.Transactions(this);
  status: API.StatusResource = new API.StatusResource(this);

  override defaultHeaders(): Core.Headers {
    const Authorization = `api-key ${this.apiKey}`;
    return {
      ...super.defaultHeaders(),
      Authorization,
    };
  }

  getNextPageQuery(
    request: Core.FinalRequestOptions<Lithic.PaginationParams>,
    response: Core.APIList<unknown>
  ): Partial<Lithic.PaginationParams> | false {
    // Do not iterate if we're on the last page.
    if (response.page >= response.total_pages) return false;

    return {page: response.page + 1};
  }

  getPaginatedItems<Rsp>(response: Core.APIList<Rsp>): Rsp[] {
    return response.data;
  }

  static APIError = Core.APIError;
  static APIConnectionError = Core.APIConnectionError;
  static AuthenticationError = Core.AuthenticationError;
  static BadRequestError = Core.BadRequestError;
  static InternalServerError = Core.InternalServerError;
  static NotFoundError = Core.NotFoundError;
  static ConflictError = Core.ConflictError;
  static PermissionDeniedError = Core.PermissionDeniedError;
  static RateLimitError = Core.RateLimitError;
  static UnprocessableEntityError = Core.UnprocessableEntityError;
  static APIConnectionTimeoutError = Core.APIConnectionTimeoutError;
}

export namespace Lithic {
  export import Account = API.Account;
  export import AccountUpdateParams = API.AccountUpdateParams;
  export import AccountListParams = API.AccountListParams;

  export import AuthStreamEnrollment = API.AuthStreamEnrollment;
  export import AuthStreamEnrollmentEnrollParams = API.AuthStreamEnrollmentEnrollParams;

  export import Card = API.Card;
  export import CardsProvisionResponse = API.CardsProvisionResponse;
  export import CardCreateParams = API.CardCreateParams;
  export import CardUpdateParams = API.CardUpdateParams;
  export import CardListParams = API.CardListParams;
  export import CardEmbedParams = API.CardEmbedParams;
  export import CardProvisionParams = API.CardProvisionParams;
  export import CardReissueParams = API.CardReissueParams;

  export import ConsumersEnrollResponse = API.ConsumersEnrollResponse;
  export import ConsumerEnrollParams = API.ConsumerEnrollParams;

  export import FundingSource = API.FundingSource;
  export import FundingSourceUpdateParams = API.FundingSourceUpdateParams;
  export import FundingSourceListParams = API.FundingSourceListParams;
  export import FundingSourceVerifyParams = API.FundingSourceVerifyParams;

  export import Transaction = API.Transaction;
  export import TransactionsSimulateAuthorizationResponse = API.TransactionsSimulateAuthorizationResponse;
  export import TransactionsSimulateClearingResponse = API.TransactionsSimulateClearingResponse;
  export import TransactionsSimulateReturnResponse = API.TransactionsSimulateReturnResponse;
  export import TransactionsSimulateVoidResponse = API.TransactionsSimulateVoidResponse;
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
