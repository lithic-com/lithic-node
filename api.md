# Accounts

Types:

- <code><a href="./resources/accounts.ts">Account</a></code>

Methods:

- <code title="get /accounts/{account_token}">client.accounts.<a href="./resources/accounts.ts">retrieve</a>(accountToken) -> Account</code>
- <code title="patch /accounts/{account_token}">client.accounts.<a href="./resources/accounts.ts">update</a>(accountToken, { ...params }) -> Account</code>
- <code title="get /accounts">client.accounts.<a href="./resources/accounts.ts">list</a>({ ...params }) -> AccountsPage</code>

# AccountHolders

Types:

- <code><a href="./resources/account-holders.ts">AccountHolder</a></code>
- <code><a href="./resources/account-holders.ts">AccountHolderDocument</a></code>
- <code><a href="./resources/account-holders.ts">KYB</a></code>
- <code><a href="./resources/account-holders.ts">KYC</a></code>
- <code><a href="./resources/account-holders.ts">KYCExempt</a></code>
- <code><a href="./resources/account-holders.ts">AccountHolderUpdateResponse</a></code>
- <code><a href="./resources/account-holders.ts">AccountHolderCreateWebhookResponse</a></code>
- <code><a href="./resources/account-holders.ts">AccountHolderListDocumentsResponse</a></code>

Methods:

- <code title="post /account_holders">client.accountHolders.<a href="./resources/account-holders.ts">create</a>({ ...params }) -> AccountHolder</code>
- <code title="get /account_holders/{account_holder_token}">client.accountHolders.<a href="./resources/account-holders.ts">retrieve</a>(accountHolderToken) -> AccountHolder</code>
- <code title="patch /account_holders/{account_holder_token}">client.accountHolders.<a href="./resources/account-holders.ts">update</a>(accountHolderToken, { ...params }) -> AccountHolderUpdateResponse</code>
- <code title="post /webhooks/account_holders">client.accountHolders.<a href="./resources/account-holders.ts">createWebhook</a>({ ...params }) -> AccountHolderCreateWebhookResponse</code>
- <code title="get /account_holders/{account_holder_token}/documents">client.accountHolders.<a href="./resources/account-holders.ts">listDocuments</a>(accountHolderToken) -> AccountHolderListDocumentsResponse</code>
- <code title="post /account_holders/{account_holder_token}/resubmit">client.accountHolders.<a href="./resources/account-holders.ts">resubmit</a>(accountHolderToken, { ...params }) -> AccountHolder</code>
- <code title="get /account_holders/{account_holder_token}/documents/{document_token}">client.accountHolders.<a href="./resources/account-holders.ts">retrieveDocument</a>(accountHolderToken, documentToken) -> AccountHolderDocument</code>
- <code title="post /account_holders/{account_holder_token}/documents">client.accountHolders.<a href="./resources/account-holders.ts">uploadDocument</a>(accountHolderToken, { ...params }) -> AccountHolderDocument</code>

# AuthRules

Types:

- <code><a href="./resources/auth-rules.ts">AuthRule</a></code>
- <code><a href="./resources/auth-rules.ts">AuthRuleCreateResponse</a></code>
- <code><a href="./resources/auth-rules.ts">AuthRuleRetrieveResponse</a></code>
- <code><a href="./resources/auth-rules.ts">AuthRuleUpdateResponse</a></code>
- <code><a href="./resources/auth-rules.ts">AuthRuleApplyResponse</a></code>
- <code><a href="./resources/auth-rules.ts">AuthRuleRemoveResponse</a></code>

Methods:

- <code title="post /auth_rules">client.authRules.<a href="./resources/auth-rules.ts">create</a>({ ...params }) -> AuthRuleCreateResponse</code>
- <code title="get /auth_rules/{auth_rule_token}">client.authRules.<a href="./resources/auth-rules.ts">retrieve</a>(authRuleToken) -> AuthRuleRetrieveResponse</code>
- <code title="put /auth_rules/{auth_rule_token}">client.authRules.<a href="./resources/auth-rules.ts">update</a>(authRuleToken, { ...params }) -> AuthRuleUpdateResponse</code>
- <code title="get /auth_rules">client.authRules.<a href="./resources/auth-rules.ts">list</a>({ ...params }) -> AuthRulesPage</code>
- <code title="post /auth_rules/{auth_rule_token}/apply">client.authRules.<a href="./resources/auth-rules.ts">apply</a>(authRuleToken, { ...params }) -> AuthRuleApplyResponse</code>
- <code title="delete /auth_rules/remove">client.authRules.<a href="./resources/auth-rules.ts">remove</a>({ ...params }) -> AuthRuleRemoveResponse</code>

# AuthStreamEnrollmentResource

Types:

- <code><a href="./resources/auth-stream-enrollment.ts">AuthStreamEnrollment</a></code>
- <code><a href="./resources/auth-stream-enrollment.ts">AuthStreamSecret</a></code>

Methods:

- <code title="get /auth_stream">client.authStreamEnrollment.<a href="./resources/auth-stream-enrollment.ts">retrieve</a>() -> AuthStreamEnrollment</code>
- <code title="delete /auth_stream">client.authStreamEnrollment.<a href="./resources/auth-stream-enrollment.ts">disenroll</a>() -> void</code>
- <code title="post /auth_stream">client.authStreamEnrollment.<a href="./resources/auth-stream-enrollment.ts">enroll</a>({ ...params }) -> void</code>
- <code title="get /auth_stream/secret">client.authStreamEnrollment.<a href="./resources/auth-stream-enrollment.ts">retrieveSecret</a>() -> AuthStreamSecret</code>
- <code title="post /auth_stream/secret/rotate">client.authStreamEnrollment.<a href="./resources/auth-stream-enrollment.ts">rotateSecret</a>() -> void</code>

# TokenizationDecisioning

Types:

- <code><a href="./resources/tokenization-decisioning.ts">TokenizationSecret</a></code>
- <code><a href="./resources/tokenization-decisioning.ts">TokenizationDecisioningRotateSecretResponse</a></code>

Methods:

- <code title="get /tokenization_decisioning/secret">client.tokenizationDecisioning.<a href="./resources/tokenization-decisioning.ts">retrieveSecret</a>() -> TokenizationSecret</code>
- <code title="post /tokenization_decisioning/secret/rotate">client.tokenizationDecisioning.<a href="./resources/tokenization-decisioning.ts">rotateSecret</a>() -> TokenizationDecisioningRotateSecretResponse</code>

# Cards

Types:

- <code><a href="./resources/cards.ts">Card</a></code>
- <code><a href="./resources/cards.ts">EmbedRequestParams</a></code>
- <code><a href="./resources/cards.ts">SpendLimitDuration</a></code>
- <code><a href="./resources/cards.ts">CardEmbedResponse</a></code>
- <code><a href="./resources/cards.ts">CardProvisionResponse</a></code>

Methods:

- <code title="post /cards">client.cards.<a href="./resources/cards.ts">create</a>({ ...params }) -> Card</code>
- <code title="get /cards/{card_token}">client.cards.<a href="./resources/cards.ts">retrieve</a>(cardToken) -> Card</code>
- <code title="patch /cards/{card_token}">client.cards.<a href="./resources/cards.ts">update</a>(cardToken, { ...params }) -> Card</code>
- <code title="get /cards">client.cards.<a href="./resources/cards.ts">list</a>({ ...params }) -> CardsPage</code>
- <code title="get /embed/card">client.cards.<a href="./resources/cards.ts">embed</a>({ ...params }) -> string</code>
- <code title="post /cards/{card_token}/provision">client.cards.<a href="./resources/cards.ts">provision</a>(cardToken, { ...params }) -> CardProvisionResponse</code>
- <code title="post /cards/{card_token}/reissue">client.cards.<a href="./resources/cards.ts">reissue</a>(cardToken, { ...params }) -> Card</code>
- `getEmbedHTML`
- `getEmbedURL`

# Balances

Types:

- <code><a href="./resources/balances.ts">Balance</a></code>

Methods:

- <code title="get /balances">client.balances.<a href="./resources/balances.ts">list</a>({ ...params }) -> BalancesSinglePage</code>

# AggregateBalances

Types:

- <code><a href="./resources/aggregate-balances.ts">AggregateBalance</a></code>

Methods:

- <code title="get /aggregate_balances">client.aggregateBalances.<a href="./resources/aggregate-balances.ts">list</a>({ ...params }) -> AggregateBalancesSinglePage</code>

# Disputes

Types:

- <code><a href="./resources/disputes.ts">Dispute</a></code>
- <code><a href="./resources/disputes.ts">DisputeEvidence</a></code>
- <code><a href="./resources/disputes.ts">DisputeInitiateEvidenceUploadResponse</a></code>

Methods:

- <code title="post /disputes">client.disputes.<a href="./resources/disputes.ts">create</a>({ ...params }) -> Dispute</code>
- <code title="get /disputes/{dispute_token}">client.disputes.<a href="./resources/disputes.ts">retrieve</a>(disputeToken) -> Dispute</code>
- <code title="patch /disputes/{dispute_token}">client.disputes.<a href="./resources/disputes.ts">update</a>(disputeToken, { ...params }) -> Dispute</code>
- <code title="get /disputes">client.disputes.<a href="./resources/disputes.ts">list</a>({ ...params }) -> DisputesCursorPage</code>
- <code title="delete /disputes/{dispute_token}">client.disputes.<a href="./resources/disputes.ts">del</a>(disputeToken) -> Dispute</code>
- <code title="delete /disputes/{dispute_token}/evidences/{evidence_token}">client.disputes.<a href="./resources/disputes.ts">deleteEvidence</a>(disputeToken, evidenceToken) -> DisputeEvidence</code>
- <code title="post /disputes/{dispute_token}/evidences">client.disputes.<a href="./resources/disputes.ts">initiateEvidenceUpload</a>(disputeToken, { ...params }) -> DisputeEvidence</code>
- <code title="get /disputes/{dispute_token}/evidences">client.disputes.<a href="./resources/disputes.ts">listEvidences</a>(disputeToken, { ...params }) -> DisputeEvidencesCursorPage</code>
- <code title="get /disputes/{dispute_token}/evidences/{evidence_token}">client.disputes.<a href="./resources/disputes.ts">retrieveEvidence</a>(disputeToken, evidenceToken) -> DisputeEvidence</code>
- `uploadEvidence`

# Events

Types:

- <code><a href="./resources/events/events.ts">Event</a></code>
- <code><a href="./resources/events/events.ts">EventSubscription</a></code>

Methods:

- <code title="get /events/{event_token}">client.events.<a href="./resources/events/events.ts">retrieve</a>(eventToken) -> Event</code>
- <code title="get /events">client.events.<a href="./resources/events/events.ts">list</a>({ ...params }) -> EventsCursorPage</code>
- `resend`

## Subscriptions

Types:

- <code><a href="./resources/events/subscriptions.ts">SubscriptionRetrieveSecretResponse</a></code>

Methods:

- <code title="post /event_subscriptions">client.events.subscriptions.<a href="./resources/events/subscriptions.ts">create</a>({ ...params }) -> EventSubscription</code>
- <code title="get /event_subscriptions/{event_subscription_token}">client.events.subscriptions.<a href="./resources/events/subscriptions.ts">retrieve</a>(eventSubscriptionToken) -> EventSubscription</code>
- <code title="patch /event_subscriptions/{event_subscription_token}">client.events.subscriptions.<a href="./resources/events/subscriptions.ts">update</a>(eventSubscriptionToken, { ...params }) -> EventSubscription</code>
- <code title="get /event_subscriptions">client.events.subscriptions.<a href="./resources/events/subscriptions.ts">list</a>({ ...params }) -> EventSubscriptionsCursorPage</code>
- <code title="delete /event_subscriptions/{event_subscription_token}">client.events.subscriptions.<a href="./resources/events/subscriptions.ts">del</a>(eventSubscriptionToken) -> void</code>
- <code title="post /event_subscriptions/{event_subscription_token}/recover">client.events.subscriptions.<a href="./resources/events/subscriptions.ts">recover</a>(eventSubscriptionToken, { ...params }) -> void</code>
- <code title="post /event_subscriptions/{event_subscription_token}/replay_missing">client.events.subscriptions.<a href="./resources/events/subscriptions.ts">replayMissing</a>(eventSubscriptionToken, { ...params }) -> void</code>
- <code title="get /event_subscriptions/{event_subscription_token}/secret">client.events.subscriptions.<a href="./resources/events/subscriptions.ts">retrieveSecret</a>(eventSubscriptionToken) -> SubscriptionRetrieveSecretResponse</code>
- <code title="post /event_subscriptions/{event_subscription_token}/secret/rotate">client.events.subscriptions.<a href="./resources/events/subscriptions.ts">rotateSecret</a>(eventSubscriptionToken) -> void</code>

# Transfers

Types:

- <code><a href="./resources/transfers.ts">Transfer</a></code>
- <code><a href="./resources/transfers.ts">TransferCreateResponse</a></code>

Methods:

- <code title="post /transfer">client.transfers.<a href="./resources/transfers.ts">create</a>({ ...params }) -> TransferCreateResponse</code>

# FinancialAccounts

Types:

- <code><a href="./resources/financial-accounts/financial-accounts.ts">FinancialAccount</a></code>
- <code><a href="./resources/financial-accounts/financial-accounts.ts">FinancialTransaction</a></code>

Methods:

- <code title="get /financial_accounts">client.financialAccounts.<a href="./resources/financial-accounts/financial-accounts.ts">list</a>({ ...params }) -> FinancialAccountsSinglePage</code>

## Balances

Methods:

- <code title="get /financial_accounts/{financial_account_token}/balances">client.financialAccounts.balances.<a href="./resources/financial-accounts/balances.ts">list</a>(financialAccountToken, { ...params }) -> BalancesSinglePage</code>

## FinancialTransactions

Methods:

- <code title="get /financial_accounts/{financial_account_token}/financial_transactions/{financial_transaction_token}">client.financialAccounts.financialTransactions.<a href="./resources/financial-accounts/financial-transactions.ts">retrieve</a>(financialAccountToken, financialTransactionToken) -> FinancialTransaction</code>
- <code title="get /financial_accounts/{financial_account_token}/financial_transactions">client.financialAccounts.financialTransactions.<a href="./resources/financial-accounts/financial-transactions.ts">list</a>(financialAccountToken, { ...params }) -> FinancialTransactionsSinglePage</code>

# Transactions

Types:

- <code><a href="./resources/transactions.ts">Transaction</a></code>
- <code><a href="./resources/transactions.ts">TransactionSimulateAuthorizationResponse</a></code>
- <code><a href="./resources/transactions.ts">TransactionSimulateAuthorizationAdviceResponse</a></code>
- <code><a href="./resources/transactions.ts">TransactionSimulateClearingResponse</a></code>
- <code><a href="./resources/transactions.ts">TransactionSimulateCreditAuthorizationResponse</a></code>
- <code><a href="./resources/transactions.ts">TransactionSimulateReturnResponse</a></code>
- <code><a href="./resources/transactions.ts">TransactionSimulateReturnReversalResponse</a></code>
- <code><a href="./resources/transactions.ts">TransactionSimulateVoidResponse</a></code>

Methods:

- <code title="get /transactions/{transaction_token}">client.transactions.<a href="./resources/transactions.ts">retrieve</a>(transactionToken) -> Transaction</code>
- <code title="get /transactions">client.transactions.<a href="./resources/transactions.ts">list</a>({ ...params }) -> TransactionsPage</code>
- <code title="post /simulate/authorize">client.transactions.<a href="./resources/transactions.ts">simulateAuthorization</a>({ ...params }) -> TransactionSimulateAuthorizationResponse</code>
- <code title="post /simulate/authorization_advice">client.transactions.<a href="./resources/transactions.ts">simulateAuthorizationAdvice</a>({ ...params }) -> TransactionSimulateAuthorizationAdviceResponse</code>
- <code title="post /simulate/clearing">client.transactions.<a href="./resources/transactions.ts">simulateClearing</a>({ ...params }) -> TransactionSimulateClearingResponse</code>
- <code title="post /simulate/credit_authorization_advice">client.transactions.<a href="./resources/transactions.ts">simulateCreditAuthorization</a>({ ...params }) -> TransactionSimulateCreditAuthorizationResponse</code>
- <code title="post /simulate/return">client.transactions.<a href="./resources/transactions.ts">simulateReturn</a>({ ...params }) -> TransactionSimulateReturnResponse</code>
- <code title="post /simulate/return_reversal">client.transactions.<a href="./resources/transactions.ts">simulateReturnReversal</a>({ ...params }) -> TransactionSimulateReturnReversalResponse</code>
- <code title="post /simulate/void">client.transactions.<a href="./resources/transactions.ts">simulateVoid</a>({ ...params }) -> TransactionSimulateVoidResponse</code>

# ResponderEndpoints

Types:

- <code><a href="./resources/responder-endpoints.ts">ResponderEndpointStatus</a></code>
- <code><a href="./resources/responder-endpoints.ts">ResponderEndpointCreateResponse</a></code>

Methods:

- <code title="post /responder_endpoints">client.responderEndpoints.<a href="./resources/responder-endpoints.ts">create</a>({ ...params }) -> ResponderEndpointCreateResponse</code>
- <code title="delete /responder_endpoints">client.responderEndpoints.<a href="./resources/responder-endpoints.ts">del</a>({ ...params }) -> void</code>
- <code title="get /responder_endpoints">client.responderEndpoints.<a href="./resources/responder-endpoints.ts">checkStatus</a>({ ...params }) -> ResponderEndpointStatus</code>

# Webhooks

Methods:

- `unwrap`
- `verifySignature`
