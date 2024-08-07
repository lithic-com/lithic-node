# Lithic

Types:

- <code><a href="./src/resources/top-level.ts">APIStatus</a></code>

Methods:

- <code title="get /status">client.<a href="./src/index.ts">apiStatus</a>() -> APIStatus</code>

# Shared

Types:

- <code><a href="./src/resources/shared.ts">Address</a></code>
- <code><a href="./src/resources/shared.ts">Carrier</a></code>
- <code><a href="./src/resources/shared.ts">ShippingAddress</a></code>

# Accounts

Types:

- <code><a href="./src/resources/accounts.ts">Account</a></code>
- <code><a href="./src/resources/accounts.ts">AccountSpendLimits</a></code>

Methods:

- <code title="get /accounts/{account_token}">client.accounts.<a href="./src/resources/accounts.ts">retrieve</a>(accountToken) -> Account</code>
- <code title="patch /accounts/{account_token}">client.accounts.<a href="./src/resources/accounts.ts">update</a>(accountToken, { ...params }) -> Account</code>
- <code title="get /accounts">client.accounts.<a href="./src/resources/accounts.ts">list</a>({ ...params }) -> AccountsCursorPage</code>
- <code title="get /accounts/{account_token}/spend_limits">client.accounts.<a href="./src/resources/accounts.ts">retrieveSpendLimits</a>(accountToken) -> AccountSpendLimits</code>

# AccountHolders

Types:

- <code><a href="./src/resources/account-holders.ts">AccountHolder</a></code>
- <code><a href="./src/resources/account-holders.ts">AccountHolderDocument</a></code>
- <code><a href="./src/resources/account-holders.ts">KYB</a></code>
- <code><a href="./src/resources/account-holders.ts">KYC</a></code>
- <code><a href="./src/resources/account-holders.ts">KYCExempt</a></code>
- <code><a href="./src/resources/account-holders.ts">AccountHolderCreateResponse</a></code>
- <code><a href="./src/resources/account-holders.ts">AccountHolderUpdateResponse</a></code>
- <code><a href="./src/resources/account-holders.ts">AccountHolderListDocumentsResponse</a></code>
- <code><a href="./src/resources/account-holders.ts">AccountHolderSimulateEnrollmentDocumentReviewResponse</a></code>
- <code><a href="./src/resources/account-holders.ts">AccountHolderSimulateEnrollmentReviewResponse</a></code>

Methods:

- <code title="post /account_holders">client.accountHolders.<a href="./src/resources/account-holders.ts">create</a>({ ...params }) -> AccountHolderCreateResponse</code>
- <code title="get /account_holders/{account_holder_token}">client.accountHolders.<a href="./src/resources/account-holders.ts">retrieve</a>(accountHolderToken) -> AccountHolder</code>
- <code title="patch /account_holders/{account_holder_token}">client.accountHolders.<a href="./src/resources/account-holders.ts">update</a>(accountHolderToken, { ...params }) -> AccountHolderUpdateResponse</code>
- <code title="get /account_holders">client.accountHolders.<a href="./src/resources/account-holders.ts">list</a>({ ...params }) -> AccountHoldersSinglePage</code>
- <code title="get /account_holders/{account_holder_token}/documents">client.accountHolders.<a href="./src/resources/account-holders.ts">listDocuments</a>(accountHolderToken) -> AccountHolderListDocumentsResponse</code>
- <code title="post /account_holders/{account_holder_token}/resubmit">client.accountHolders.<a href="./src/resources/account-holders.ts">resubmit</a>(accountHolderToken, { ...params }) -> AccountHolder</code>
- <code title="get /account_holders/{account_holder_token}/documents/{document_token}">client.accountHolders.<a href="./src/resources/account-holders.ts">retrieveDocument</a>(accountHolderToken, documentToken) -> AccountHolderDocument</code>
- <code title="post /simulate/account_holders/enrollment_document_review">client.accountHolders.<a href="./src/resources/account-holders.ts">simulateEnrollmentDocumentReview</a>({ ...params }) -> AccountHolderSimulateEnrollmentDocumentReviewResponse</code>
- <code title="post /simulate/account_holders/enrollment_review">client.accountHolders.<a href="./src/resources/account-holders.ts">simulateEnrollmentReview</a>({ ...params }) -> AccountHolderSimulateEnrollmentReviewResponse</code>
- <code title="post /account_holders/{account_holder_token}/documents">client.accountHolders.<a href="./src/resources/account-holders.ts">uploadDocument</a>(accountHolderToken, { ...params }) -> AccountHolderDocument</code>

# AuthRules

Types:

- <code><a href="./src/resources/auth-rules.ts">AuthRule</a></code>
- <code><a href="./src/resources/auth-rules.ts">AuthRuleRetrieveResponse</a></code>
- <code><a href="./src/resources/auth-rules.ts">AuthRuleRemoveResponse</a></code>

Methods:

- <code title="post /auth_rules">client.authRules.<a href="./src/resources/auth-rules.ts">create</a>({ ...params }) -> AuthRule</code>
- <code title="get /auth_rules/{auth_rule_token}">client.authRules.<a href="./src/resources/auth-rules.ts">retrieve</a>(authRuleToken) -> AuthRuleRetrieveResponse</code>
- <code title="put /auth_rules/{auth_rule_token}">client.authRules.<a href="./src/resources/auth-rules.ts">update</a>(authRuleToken, { ...params }) -> AuthRule</code>
- <code title="get /auth_rules">client.authRules.<a href="./src/resources/auth-rules.ts">list</a>({ ...params }) -> AuthRulesCursorPage</code>
- <code title="post /auth_rules/{auth_rule_token}/apply">client.authRules.<a href="./src/resources/auth-rules.ts">apply</a>(authRuleToken, { ...params }) -> AuthRule</code>
- <code title="delete /auth_rules/remove">client.authRules.<a href="./src/resources/auth-rules.ts">remove</a>({ ...params }) -> AuthRuleRemoveResponse</code>

# AuthStreamEnrollment

Types:

- <code><a href="./src/resources/auth-stream-enrollment.ts">AuthStreamSecret</a></code>

Methods:

- <code title="get /auth_stream/secret">client.authStreamEnrollment.<a href="./src/resources/auth-stream-enrollment.ts">retrieveSecret</a>() -> AuthStreamSecret</code>
- <code title="post /auth_stream/secret/rotate">client.authStreamEnrollment.<a href="./src/resources/auth-stream-enrollment.ts">rotateSecret</a>() -> void</code>

# TokenizationDecisioning

Types:

- <code><a href="./src/resources/tokenization-decisioning.ts">TokenizationSecret</a></code>
- <code><a href="./src/resources/tokenization-decisioning.ts">TokenizationDecisioningRotateSecretResponse</a></code>

Methods:

- <code title="get /tokenization_decisioning/secret">client.tokenizationDecisioning.<a href="./src/resources/tokenization-decisioning.ts">retrieveSecret</a>() -> TokenizationSecret</code>
- <code title="post /tokenization_decisioning/secret/rotate">client.tokenizationDecisioning.<a href="./src/resources/tokenization-decisioning.ts">rotateSecret</a>() -> TokenizationDecisioningRotateSecretResponse</code>

# Tokenizations

Types:

- <code><a href="./src/resources/tokenizations.ts">Tokenization</a></code>
- <code><a href="./src/resources/tokenizations.ts">TokenizationRetrieveResponse</a></code>
- <code><a href="./src/resources/tokenizations.ts">TokenizationSimulateResponse</a></code>
- <code><a href="./src/resources/tokenizations.ts">TokenizationUpdateDigitalCardArtResponse</a></code>

Methods:

- <code title="get /tokenizations/{tokenization_token}">client.tokenizations.<a href="./src/resources/tokenizations.ts">retrieve</a>(tokenizationToken) -> TokenizationRetrieveResponse</code>
- <code title="get /tokenizations">client.tokenizations.<a href="./src/resources/tokenizations.ts">list</a>({ ...params }) -> TokenizationsCursorPage</code>
- <code title="post /tokenizations/{tokenization_token}/activate">client.tokenizations.<a href="./src/resources/tokenizations.ts">activate</a>(tokenizationToken) -> void</code>
- <code title="post /tokenizations/{tokenization_token}/deactivate">client.tokenizations.<a href="./src/resources/tokenizations.ts">deactivate</a>(tokenizationToken) -> void</code>
- <code title="post /tokenizations/{tokenization_token}/pause">client.tokenizations.<a href="./src/resources/tokenizations.ts">pause</a>(tokenizationToken) -> void</code>
- <code title="post /tokenizations/{tokenization_token}/resend_activation_code">client.tokenizations.<a href="./src/resources/tokenizations.ts">resendActivationCode</a>(tokenizationToken, { ...params }) -> void</code>
- <code title="post /simulate/tokenizations">client.tokenizations.<a href="./src/resources/tokenizations.ts">simulate</a>({ ...params }) -> TokenizationSimulateResponse</code>
- <code title="post /tokenizations/{tokenization_token}/unpause">client.tokenizations.<a href="./src/resources/tokenizations.ts">unpause</a>(tokenizationToken) -> void</code>
- <code title="post /tokenizations/{tokenization_token}/update_digital_card_art">client.tokenizations.<a href="./src/resources/tokenizations.ts">updateDigitalCardArt</a>(tokenizationToken, { ...params }) -> TokenizationUpdateDigitalCardArtResponse</code>

# Cards

Types:

- <code><a href="./src/resources/cards/cards.ts">Card</a></code>
- <code><a href="./src/resources/cards/cards.ts">CardSpendLimits</a></code>
- <code><a href="./src/resources/cards/cards.ts">SpendLimitDuration</a></code>
- <code><a href="./src/resources/cards/cards.ts">CardEmbedResponse</a></code>
- <code><a href="./src/resources/cards/cards.ts">CardProvisionResponse</a></code>

Methods:

- <code title="post /cards">client.cards.<a href="./src/resources/cards/cards.ts">create</a>({ ...params }) -> Card</code>
- <code title="get /cards/{card_token}">client.cards.<a href="./src/resources/cards/cards.ts">retrieve</a>(cardToken) -> Card</code>
- <code title="patch /cards/{card_token}">client.cards.<a href="./src/resources/cards/cards.ts">update</a>(cardToken, { ...params }) -> Card</code>
- <code title="get /cards">client.cards.<a href="./src/resources/cards/cards.ts">list</a>({ ...params }) -> CardsCursorPage</code>
- <code title="get /embed/card">client.cards.<a href="./src/resources/cards/cards.ts">embed</a>({ ...params }) -> string</code>
- <code title="post /cards/{card_token}/provision">client.cards.<a href="./src/resources/cards/cards.ts">provision</a>(cardToken, { ...params }) -> CardProvisionResponse</code>
- <code title="post /cards/{card_token}/reissue">client.cards.<a href="./src/resources/cards/cards.ts">reissue</a>(cardToken, { ...params }) -> Card</code>
- <code title="post /cards/{card_token}/renew">client.cards.<a href="./src/resources/cards/cards.ts">renew</a>(cardToken, { ...params }) -> Card</code>
- <code title="get /cards/{card_token}/spend_limits">client.cards.<a href="./src/resources/cards/cards.ts">retrieveSpendLimits</a>(cardToken) -> CardSpendLimits</code>
- <code title="post /cards/search_by_pan">client.cards.<a href="./src/resources/cards/cards.ts">searchByPan</a>({ ...params }) -> Card</code>
- <code>client.cards.<a href="./src/resources/cards/cards.ts">getEmbedHTML</a>(...args) -> Promise&lt;string&gt;</code>
- <code>client.cards.<a href="./src/resources/cards/cards.ts">getEmbedURL</a>(...args) -> string</code>

## AggregateBalances

Types:

- <code><a href="./src/resources/cards/aggregate-balances.ts">AggregateBalanceListResponse</a></code>

Methods:

- <code title="get /cards/aggregate_balances">client.cards.aggregateBalances.<a href="./src/resources/cards/aggregate-balances.ts">list</a>({ ...params }) -> AggregateBalanceListResponsesSinglePage</code>

## Balances

Types:

- <code><a href="./src/resources/cards/balances.ts">BalanceListResponse</a></code>

Methods:

- <code title="get /cards/{card_token}/balances">client.cards.balances.<a href="./src/resources/cards/balances.ts">list</a>(cardToken, { ...params }) -> BalanceListResponsesSinglePage</code>

## FinancialTransactions

Methods:

- <code title="get /cards/{card_token}/financial_transactions/{financial_transaction_token}">client.cards.financialTransactions.<a href="./src/resources/cards/financial-transactions.ts">retrieve</a>(cardToken, financialTransactionToken) -> FinancialTransaction</code>
- <code title="get /cards/{card_token}/financial_transactions">client.cards.financialTransactions.<a href="./src/resources/cards/financial-transactions.ts">list</a>(cardToken, { ...params }) -> FinancialTransactionsSinglePage</code>

# Balances

Types:

- <code><a href="./src/resources/balances.ts">Balance</a></code>

Methods:

- <code title="get /balances">client.balances.<a href="./src/resources/balances.ts">list</a>({ ...params }) -> BalancesSinglePage</code>

# AggregateBalances

Types:

- <code><a href="./src/resources/aggregate-balances.ts">AggregateBalance</a></code>

Methods:

- <code title="get /aggregate_balances">client.aggregateBalances.<a href="./src/resources/aggregate-balances.ts">list</a>({ ...params }) -> AggregateBalancesSinglePage</code>

# Disputes

Types:

- <code><a href="./src/resources/disputes.ts">Dispute</a></code>
- <code><a href="./src/resources/disputes.ts">DisputeEvidence</a></code>
- <code><a href="./src/resources/disputes.ts">DisputeInitiateEvidenceUploadResponse</a></code>

Methods:

- <code title="post /disputes">client.disputes.<a href="./src/resources/disputes.ts">create</a>({ ...params }) -> Dispute</code>
- <code title="get /disputes/{dispute_token}">client.disputes.<a href="./src/resources/disputes.ts">retrieve</a>(disputeToken) -> Dispute</code>
- <code title="patch /disputes/{dispute_token}">client.disputes.<a href="./src/resources/disputes.ts">update</a>(disputeToken, { ...params }) -> Dispute</code>
- <code title="get /disputes">client.disputes.<a href="./src/resources/disputes.ts">list</a>({ ...params }) -> DisputesCursorPage</code>
- <code title="delete /disputes/{dispute_token}">client.disputes.<a href="./src/resources/disputes.ts">del</a>(disputeToken) -> Dispute</code>
- <code title="delete /disputes/{dispute_token}/evidences/{evidence_token}">client.disputes.<a href="./src/resources/disputes.ts">deleteEvidence</a>(disputeToken, evidenceToken) -> DisputeEvidence</code>
- <code title="post /disputes/{dispute_token}/evidences">client.disputes.<a href="./src/resources/disputes.ts">initiateEvidenceUpload</a>(disputeToken, { ...params }) -> DisputeEvidence</code>
- <code title="get /disputes/{dispute_token}/evidences">client.disputes.<a href="./src/resources/disputes.ts">listEvidences</a>(disputeToken, { ...params }) -> DisputeEvidencesCursorPage</code>
- <code title="get /disputes/{dispute_token}/evidences/{evidence_token}">client.disputes.<a href="./src/resources/disputes.ts">retrieveEvidence</a>(disputeToken, evidenceToken) -> DisputeEvidence</code>
- <code>client.disputes.<a href="./src/resources/disputes.ts">uploadEvidence</a>(disputeToken, file, options?) -> Promise&lt;void&gt;</code>

# Events

Types:

- <code><a href="./src/resources/events/events.ts">Event</a></code>
- <code><a href="./src/resources/events/events.ts">EventSubscription</a></code>
- <code><a href="./src/resources/events/events.ts">MessageAttempt</a></code>

Methods:

- <code title="get /events/{event_token}">client.events.<a href="./src/resources/events/events.ts">retrieve</a>(eventToken) -> Event</code>
- <code title="get /events">client.events.<a href="./src/resources/events/events.ts">list</a>({ ...params }) -> EventsCursorPage</code>
- <code title="get /events/{event_token}/attempts">client.events.<a href="./src/resources/events/events.ts">listAttempts</a>(eventToken, { ...params }) -> MessageAttemptsCursorPage</code>
- <code>client.events.<a href="./src/resources/events/events.ts">resend</a>(eventToken, params, options?) -> Promise&lt;void&gt;</code>

## Subscriptions

Types:

- <code><a href="./src/resources/events/subscriptions.ts">SubscriptionRetrieveSecretResponse</a></code>

Methods:

- <code title="post /event_subscriptions">client.events.subscriptions.<a href="./src/resources/events/subscriptions.ts">create</a>({ ...params }) -> EventSubscription</code>
- <code title="get /event_subscriptions/{event_subscription_token}">client.events.subscriptions.<a href="./src/resources/events/subscriptions.ts">retrieve</a>(eventSubscriptionToken) -> EventSubscription</code>
- <code title="patch /event_subscriptions/{event_subscription_token}">client.events.subscriptions.<a href="./src/resources/events/subscriptions.ts">update</a>(eventSubscriptionToken, { ...params }) -> EventSubscription</code>
- <code title="get /event_subscriptions">client.events.subscriptions.<a href="./src/resources/events/subscriptions.ts">list</a>({ ...params }) -> EventSubscriptionsCursorPage</code>
- <code title="delete /event_subscriptions/{event_subscription_token}">client.events.subscriptions.<a href="./src/resources/events/subscriptions.ts">del</a>(eventSubscriptionToken) -> void</code>
- <code title="get /event_subscriptions/{event_subscription_token}/attempts">client.events.subscriptions.<a href="./src/resources/events/subscriptions.ts">listAttempts</a>(eventSubscriptionToken, { ...params }) -> MessageAttemptsCursorPage</code>
- <code title="post /event_subscriptions/{event_subscription_token}/recover">client.events.subscriptions.<a href="./src/resources/events/subscriptions.ts">recover</a>(eventSubscriptionToken, { ...params }) -> void</code>
- <code title="post /event_subscriptions/{event_subscription_token}/replay_missing">client.events.subscriptions.<a href="./src/resources/events/subscriptions.ts">replayMissing</a>(eventSubscriptionToken, { ...params }) -> void</code>
- <code title="get /event_subscriptions/{event_subscription_token}/secret">client.events.subscriptions.<a href="./src/resources/events/subscriptions.ts">retrieveSecret</a>(eventSubscriptionToken) -> SubscriptionRetrieveSecretResponse</code>
- <code title="post /event_subscriptions/{event_subscription_token}/secret/rotate">client.events.subscriptions.<a href="./src/resources/events/subscriptions.ts">rotateSecret</a>(eventSubscriptionToken) -> void</code>
- <code title="post /simulate/event_subscriptions/{event_subscription_token}/send_example">client.events.subscriptions.<a href="./src/resources/events/subscriptions.ts">sendSimulatedExample</a>(eventSubscriptionToken, { ...params }) -> void</code>

# Transfers

Types:

- <code><a href="./src/resources/transfers.ts">Transfer</a></code>

Methods:

- <code title="post /transfer">client.transfers.<a href="./src/resources/transfers.ts">create</a>({ ...params }) -> Transfer</code>

# FinancialAccounts

Types:

- <code><a href="./src/resources/financial-accounts/financial-accounts.ts">FinancialAccount</a></code>
- <code><a href="./src/resources/financial-accounts/financial-accounts.ts">FinancialTransaction</a></code>

Methods:

- <code title="post /financial_accounts">client.financialAccounts.<a href="./src/resources/financial-accounts/financial-accounts.ts">create</a>({ ...params }) -> FinancialAccount</code>
- <code title="get /financial_accounts/{financial_account_token}">client.financialAccounts.<a href="./src/resources/financial-accounts/financial-accounts.ts">retrieve</a>(financialAccountToken) -> FinancialAccount</code>
- <code title="patch /financial_accounts/{financial_account_token}">client.financialAccounts.<a href="./src/resources/financial-accounts/financial-accounts.ts">update</a>(financialAccountToken, { ...params }) -> FinancialAccount</code>
- <code title="get /financial_accounts">client.financialAccounts.<a href="./src/resources/financial-accounts/financial-accounts.ts">list</a>({ ...params }) -> FinancialAccountsSinglePage</code>

## Balances

Types:

- <code><a href="./src/resources/financial-accounts/balances.ts">BalanceListResponse</a></code>

Methods:

- <code title="get /financial_accounts/{financial_account_token}/balances">client.financialAccounts.balances.<a href="./src/resources/financial-accounts/balances.ts">list</a>(financialAccountToken, { ...params }) -> BalanceListResponsesSinglePage</code>

## FinancialTransactions

Methods:

- <code title="get /financial_accounts/{financial_account_token}/financial_transactions/{financial_transaction_token}">client.financialAccounts.financialTransactions.<a href="./src/resources/financial-accounts/financial-transactions.ts">retrieve</a>(financialAccountToken, financialTransactionToken) -> FinancialTransaction</code>
- <code title="get /financial_accounts/{financial_account_token}/financial_transactions">client.financialAccounts.financialTransactions.<a href="./src/resources/financial-accounts/financial-transactions.ts">list</a>(financialAccountToken, { ...params }) -> FinancialTransactionsSinglePage</code>

## CreditConfiguration

Types:

- <code><a href="./src/resources/financial-accounts/credit-configuration.ts">FinancialAccountCreditConfig</a></code>

Methods:

- <code title="get /financial_accounts/{financial_account_token}/credit_configuration">client.financialAccounts.creditConfiguration.<a href="./src/resources/financial-accounts/credit-configuration.ts">retrieve</a>(financialAccountToken) -> FinancialAccountCreditConfig</code>
- <code title="patch /financial_accounts/{financial_account_token}/credit_configuration">client.financialAccounts.creditConfiguration.<a href="./src/resources/financial-accounts/credit-configuration.ts">update</a>(financialAccountToken, { ...params }) -> FinancialAccountCreditConfig</code>

## Statements

Types:

- <code><a href="./src/resources/financial-accounts/statements/statements.ts">Statement</a></code>
- <code><a href="./src/resources/financial-accounts/statements/statements.ts">Statements</a></code>

Methods:

- <code title="get /financial_accounts/{financial_account_token}/statements/{statement_token}">client.financialAccounts.statements.<a href="./src/resources/financial-accounts/statements/statements.ts">retrieve</a>(financialAccountToken, statementToken) -> Statement</code>
- <code title="get /financial_accounts/{financial_account_token}/statements">client.financialAccounts.statements.<a href="./src/resources/financial-accounts/statements/statements.ts">list</a>(financialAccountToken, { ...params }) -> StatementsCursorPage</code>

### LineItems

Types:

- <code><a href="./src/resources/financial-accounts/statements/line-items.ts">StatementLineItems</a></code>
- <code><a href="./src/resources/financial-accounts/statements/line-items.ts">LineItemListResponse</a></code>

Methods:

- <code title="get /financial_accounts/{financial_account_token}/statements/{statement_token}/line_items">client.financialAccounts.statements.lineItems.<a href="./src/resources/financial-accounts/statements/line-items.ts">list</a>(financialAccountToken, statementToken, { ...params }) -> LineItemListResponsesCursorPage</code>

# Transactions

Types:

- <code><a href="./src/resources/transactions/transactions.ts">Transaction</a></code>
- <code><a href="./src/resources/transactions/transactions.ts">TransactionSimulateAuthorizationResponse</a></code>
- <code><a href="./src/resources/transactions/transactions.ts">TransactionSimulateAuthorizationAdviceResponse</a></code>
- <code><a href="./src/resources/transactions/transactions.ts">TransactionSimulateClearingResponse</a></code>
- <code><a href="./src/resources/transactions/transactions.ts">TransactionSimulateCreditAuthorizationResponse</a></code>
- <code><a href="./src/resources/transactions/transactions.ts">TransactionSimulateReturnResponse</a></code>
- <code><a href="./src/resources/transactions/transactions.ts">TransactionSimulateReturnReversalResponse</a></code>
- <code><a href="./src/resources/transactions/transactions.ts">TransactionSimulateVoidResponse</a></code>

Methods:

- <code title="get /transactions/{transaction_token}">client.transactions.<a href="./src/resources/transactions/transactions.ts">retrieve</a>(transactionToken) -> Transaction</code>
- <code title="get /transactions">client.transactions.<a href="./src/resources/transactions/transactions.ts">list</a>({ ...params }) -> TransactionsCursorPage</code>
- <code title="post /simulate/authorize">client.transactions.<a href="./src/resources/transactions/transactions.ts">simulateAuthorization</a>({ ...params }) -> TransactionSimulateAuthorizationResponse</code>
- <code title="post /simulate/authorization_advice">client.transactions.<a href="./src/resources/transactions/transactions.ts">simulateAuthorizationAdvice</a>({ ...params }) -> TransactionSimulateAuthorizationAdviceResponse</code>
- <code title="post /simulate/clearing">client.transactions.<a href="./src/resources/transactions/transactions.ts">simulateClearing</a>({ ...params }) -> TransactionSimulateClearingResponse</code>
- <code title="post /simulate/credit_authorization_advice">client.transactions.<a href="./src/resources/transactions/transactions.ts">simulateCreditAuthorization</a>({ ...params }) -> TransactionSimulateCreditAuthorizationResponse</code>
- <code title="post /simulate/return">client.transactions.<a href="./src/resources/transactions/transactions.ts">simulateReturn</a>({ ...params }) -> TransactionSimulateReturnResponse</code>
- <code title="post /simulate/return_reversal">client.transactions.<a href="./src/resources/transactions/transactions.ts">simulateReturnReversal</a>({ ...params }) -> TransactionSimulateReturnReversalResponse</code>
- <code title="post /simulate/void">client.transactions.<a href="./src/resources/transactions/transactions.ts">simulateVoid</a>({ ...params }) -> TransactionSimulateVoidResponse</code>

## EnhancedCommercialData

Types:

- <code><a href="./src/resources/transactions/enhanced-commercial-data.ts">EnhancedCommercialDataRetrieveResponse</a></code>

Methods:

- <code title="get /transactions/{transaction_token}/enhanced_commercial_data">client.transactions.enhancedCommercialData.<a href="./src/resources/transactions/enhanced-commercial-data.ts">retrieve</a>(transactionToken) -> EnhancedCommercialDataRetrieveResponse</code>

## Events

### EnhancedCommercialData

Types:

- <code><a href="./src/resources/transactions/events/enhanced-commercial-data.ts">EnhancedData</a></code>

Methods:

- <code title="get /transactions/events/{event_token}/enhanced_commercial_data">client.transactions.events.enhancedCommercialData.<a href="./src/resources/transactions/events/enhanced-commercial-data.ts">retrieve</a>(eventToken) -> EnhancedData</code>

# ResponderEndpoints

Types:

- <code><a href="./src/resources/responder-endpoints.ts">ResponderEndpointStatus</a></code>
- <code><a href="./src/resources/responder-endpoints.ts">ResponderEndpointCreateResponse</a></code>

Methods:

- <code title="post /responder_endpoints">client.responderEndpoints.<a href="./src/resources/responder-endpoints.ts">create</a>({ ...params }) -> ResponderEndpointCreateResponse</code>
- <code title="delete /responder_endpoints">client.responderEndpoints.<a href="./src/resources/responder-endpoints.ts">del</a>({ ...params }) -> void</code>
- <code title="get /responder_endpoints">client.responderEndpoints.<a href="./src/resources/responder-endpoints.ts">checkStatus</a>({ ...params }) -> ResponderEndpointStatus</code>

# Webhooks

Methods:

- <code>client.webhooks.<a href="./src/resources/webhooks.ts">unwrap</a>(payload, headers, secret) -> Object</code>
- <code>client.webhooks.<a href="./src/resources/webhooks.ts">verifySignature</a>(body, headers, secret) -> void</code>

# ExternalBankAccounts

Types:

- <code><a href="./src/resources/external-bank-accounts/external-bank-accounts.ts">ExternalBankAccountAddress</a></code>
- <code><a href="./src/resources/external-bank-accounts/external-bank-accounts.ts">OwnerType</a></code>
- <code><a href="./src/resources/external-bank-accounts/external-bank-accounts.ts">VerificationMethod</a></code>
- <code><a href="./src/resources/external-bank-accounts/external-bank-accounts.ts">ExternalBankAccountCreateResponse</a></code>
- <code><a href="./src/resources/external-bank-accounts/external-bank-accounts.ts">ExternalBankAccountRetrieveResponse</a></code>
- <code><a href="./src/resources/external-bank-accounts/external-bank-accounts.ts">ExternalBankAccountUpdateResponse</a></code>
- <code><a href="./src/resources/external-bank-accounts/external-bank-accounts.ts">ExternalBankAccountListResponse</a></code>
- <code><a href="./src/resources/external-bank-accounts/external-bank-accounts.ts">ExternalBankAccountRetryMicroDepositsResponse</a></code>
- <code><a href="./src/resources/external-bank-accounts/external-bank-accounts.ts">ExternalBankAccountRetryPrenoteResponse</a></code>

Methods:

- <code title="post /external_bank_accounts">client.externalBankAccounts.<a href="./src/resources/external-bank-accounts/external-bank-accounts.ts">create</a>({ ...params }) -> ExternalBankAccountCreateResponse</code>
- <code title="get /external_bank_accounts/{external_bank_account_token}">client.externalBankAccounts.<a href="./src/resources/external-bank-accounts/external-bank-accounts.ts">retrieve</a>(externalBankAccountToken) -> ExternalBankAccountRetrieveResponse</code>
- <code title="patch /external_bank_accounts/{external_bank_account_token}">client.externalBankAccounts.<a href="./src/resources/external-bank-accounts/external-bank-accounts.ts">update</a>(externalBankAccountToken, { ...params }) -> ExternalBankAccountUpdateResponse</code>
- <code title="get /external_bank_accounts">client.externalBankAccounts.<a href="./src/resources/external-bank-accounts/external-bank-accounts.ts">list</a>({ ...params }) -> ExternalBankAccountListResponsesCursorPage</code>
- <code title="post /external_bank_accounts/{external_bank_account_token}/retry_micro_deposits">client.externalBankAccounts.<a href="./src/resources/external-bank-accounts/external-bank-accounts.ts">retryMicroDeposits</a>(externalBankAccountToken, { ...params }) -> ExternalBankAccountRetryMicroDepositsResponse</code>
- <code title="post /external_bank_accounts/{external_bank_account_token}/retry_prenote">client.externalBankAccounts.<a href="./src/resources/external-bank-accounts/external-bank-accounts.ts">retryPrenote</a>(externalBankAccountToken, { ...params }) -> ExternalBankAccountRetryPrenoteResponse</code>

## MicroDeposits

Types:

- <code><a href="./src/resources/external-bank-accounts/micro-deposits.ts">MicroDepositCreateResponse</a></code>

Methods:

- <code title="post /external_bank_accounts/{external_bank_account_token}/micro_deposits">client.externalBankAccounts.microDeposits.<a href="./src/resources/external-bank-accounts/micro-deposits.ts">create</a>(externalBankAccountToken, { ...params }) -> MicroDepositCreateResponse</code>

# Payments

Types:

- <code><a href="./src/resources/payments.ts">Payment</a></code>
- <code><a href="./src/resources/payments.ts">PaymentCreateResponse</a></code>
- <code><a href="./src/resources/payments.ts">PaymentRetryResponse</a></code>
- <code><a href="./src/resources/payments.ts">PaymentSimulateActionResponse</a></code>
- <code><a href="./src/resources/payments.ts">PaymentSimulateReceiptResponse</a></code>
- <code><a href="./src/resources/payments.ts">PaymentSimulateReleaseResponse</a></code>
- <code><a href="./src/resources/payments.ts">PaymentSimulateReturnResponse</a></code>

Methods:

- <code title="post /payments">client.payments.<a href="./src/resources/payments.ts">create</a>({ ...params }) -> PaymentCreateResponse</code>
- <code title="get /payments/{payment_token}">client.payments.<a href="./src/resources/payments.ts">retrieve</a>(paymentToken) -> Payment</code>
- <code title="get /payments">client.payments.<a href="./src/resources/payments.ts">list</a>({ ...params }) -> PaymentsCursorPage</code>
- <code title="post /payments/{payment_token}/retry">client.payments.<a href="./src/resources/payments.ts">retry</a>(paymentToken) -> PaymentRetryResponse</code>
- <code title="post /simulate/payments/{payment_token}/action">client.payments.<a href="./src/resources/payments.ts">simulateAction</a>(paymentToken, { ...params }) -> PaymentSimulateActionResponse</code>
- <code title="post /simulate/payments/receipt">client.payments.<a href="./src/resources/payments.ts">simulateReceipt</a>({ ...params }) -> PaymentSimulateReceiptResponse</code>
- <code title="post /simulate/payments/release">client.payments.<a href="./src/resources/payments.ts">simulateRelease</a>({ ...params }) -> PaymentSimulateReleaseResponse</code>
- <code title="post /simulate/payments/return">client.payments.<a href="./src/resources/payments.ts">simulateReturn</a>({ ...params }) -> PaymentSimulateReturnResponse</code>

# ThreeDS

## Authentication

Types:

- <code><a href="./src/resources/three-ds/authentication.ts">AuthenticationRetrieveResponse</a></code>
- <code><a href="./src/resources/three-ds/authentication.ts">AuthenticationSimulateResponse</a></code>

Methods:

- <code title="get /three_ds_authentication/{three_ds_authentication_token}">client.threeDS.authentication.<a href="./src/resources/three-ds/authentication.ts">retrieve</a>(threeDSAuthenticationToken) -> AuthenticationRetrieveResponse</code>
- <code title="post /three_ds_authentication/simulate">client.threeDS.authentication.<a href="./src/resources/three-ds/authentication.ts">simulate</a>({ ...params }) -> AuthenticationSimulateResponse</code>

## Decisioning

Types:

- <code><a href="./src/resources/three-ds/decisioning.ts">DecisioningRetrieveSecretResponse</a></code>

Methods:

- <code title="get /three_ds_decisioning/secret">client.threeDS.decisioning.<a href="./src/resources/three-ds/decisioning.ts">retrieveSecret</a>() -> DecisioningRetrieveSecretResponse</code>
- <code title="post /three_ds_decisioning/secret/rotate">client.threeDS.decisioning.<a href="./src/resources/three-ds/decisioning.ts">rotateSecret</a>() -> void</code>

# Reports

Types:

- <code><a href="./src/resources/reports/reports.ts">SettlementDetail</a></code>
- <code><a href="./src/resources/reports/reports.ts">SettlementReport</a></code>
- <code><a href="./src/resources/reports/reports.ts">SettlementSummaryDetails</a></code>

## Settlement

Methods:

- <code title="get /reports/settlement/details/{report_date}">client.reports.settlement.<a href="./src/resources/reports/settlement.ts">listDetails</a>(reportDate, { ...params }) -> SettlementDetailsCursorPage</code>
- <code title="get /reports/settlement/summary/{report_date}">client.reports.settlement.<a href="./src/resources/reports/settlement.ts">summary</a>(reportDate) -> SettlementReport</code>

# CardPrograms

Types:

- <code><a href="./src/resources/card-programs.ts">CardProgram</a></code>

Methods:

- <code title="get /card_programs/{card_program_token}">client.cardPrograms.<a href="./src/resources/card-programs.ts">retrieve</a>(cardProgramToken) -> CardProgram</code>
- <code title="get /card_programs">client.cardPrograms.<a href="./src/resources/card-programs.ts">list</a>({ ...params }) -> CardProgramsCursorPage</code>

# DigitalCardArt

Types:

- <code><a href="./src/resources/digital-card-art.ts">DigitalCardArt</a></code>

Methods:

- <code title="get /digital_card_art/{digital_card_art_token}">client.digitalCardArt.<a href="./src/resources/digital-card-art.ts">retrieve</a>(digitalCardArtToken) -> DigitalCardArt</code>
- <code title="get /digital_card_art">client.digitalCardArt.<a href="./src/resources/digital-card-art.ts">list</a>({ ...params }) -> DigitalCardArtsCursorPage</code>

# BookTransfers

Types:

- <code><a href="./src/resources/book-transfers.ts">BookTransferResponse</a></code>

Methods:

- <code title="post /book_transfers">client.bookTransfers.<a href="./src/resources/book-transfers.ts">create</a>({ ...params }) -> BookTransferResponse</code>
- <code title="get /book_transfers/{book_transfer_token}">client.bookTransfers.<a href="./src/resources/book-transfers.ts">retrieve</a>(bookTransferToken) -> BookTransferResponse</code>
- <code title="get /book_transfers">client.bookTransfers.<a href="./src/resources/book-transfers.ts">list</a>({ ...params }) -> BookTransferResponsesCursorPage</code>
- <code title="post /book_transfers/{book_transfer_token}/reverse">client.bookTransfers.<a href="./src/resources/book-transfers.ts">reverse</a>(bookTransferToken, { ...params }) -> BookTransferResponse</code>
