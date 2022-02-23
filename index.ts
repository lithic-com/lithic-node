import * as Core from './core';
import * as API from './resources';

export class Lithic extends Core.APIClient {
  accounts: API.Accounts = new API.Accounts(this);
  authStreamEnrollment: API.AuthStreamEnrollment = new API.AuthStreamEnrollment(
    this
  );
  cards: API.Cards = new API.Cards(this);
  consumers: API.Consumers = new API.Consumers(this);
  fundingSources: API.FundingSources = new API.FundingSources(this);
  transactions: API.Transactions = new API.Transactions(this);
  status: API.Status = new API.Status(this);
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
  export import FundingSourceRetrieveParams = API.FundingSourceRetrieveParams;
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
}

export default Lithic;
