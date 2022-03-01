import * as Core from './core';
import * as API from './resources';
declare const environments: {
  production: string;
  sandbox: string;
};
export declare class Lithic extends Core.APIClient {
  constructor(
    apiKey: string,
    {
      environment,
      baseURL,
    }?: {
      environment?: keyof typeof environments;
      baseURL?: string;
    }
  );
  accounts: API.Accounts;
  authStreamEnrollment: API.AuthStreamEnrollmentResource;
  cards: API.Cards;
  consumers: API.Consumers;
  fundingSources: API.FundingSources;
  transactions: API.Transactions;
  status: API.StatusResource;
  defaultHeaders(): Core.Headers;
  getNextPageQuery(
    request: Core.FinalRequestOptions<Lithic.PaginationParams>,
    response: Core.APIList<unknown>
  ): Partial<Lithic.PaginationParams> | false;
  getPaginatedItems<Rsp>(response: Core.APIList<Rsp>): Rsp[];
  static APIError: typeof Core.APIError;
  static APIConnectionError: typeof Core.APIConnectionError;
  static AuthenticationError: typeof Core.AuthenticationError;
  static BadRequestError: typeof Core.BadRequestError;
  static InternalServerError: typeof Core.InternalServerError;
  static NotFoundError: typeof Core.NotFoundError;
  static ConflictError: typeof Core.ConflictError;
  static PermissionDeniedError: typeof Core.PermissionDeniedError;
  static RateLimitError: typeof Core.RateLimitError;
  static UnprocessableEntityError: typeof Core.UnprocessableEntityError;
}
export declare namespace Lithic {
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
  export import ApiStatus = API.ApiStatus;
  type PaginationParams = {
    page?: number;
    page_size?: number;
  };
}
export default Lithic;
