# Accounts

Models:

- <code><a href="./resources/accounts.ts">Account</a></code>

Methods:

- <code title="get /accounts/{account_token}">client.accounts.<a href="./resources/accounts.ts">retrieve</a>(accountToken) -> Promise<Core.APIResponse<Account>></code>
- <code title="patch /accounts/{account_token}">client.accounts.<a href="./resources/accounts.ts">update</a>(accountToken, { ...params }) -> Promise<Core.APIResponse<Account>></code>
- <code title="get /accounts">client.accounts.<a href="./resources/accounts.ts">list</a>({ ...params }) -> Core.PagePromise<AccountsPage></code>

# AccountHolders

Models:

- <code><a href="./resources/account-holders.ts">AccountHolder</a></code>
- <code><a href="./resources/account-holders.ts">AccountHolderDocument</a></code>
- <code><a href="./resources/account-holders.ts">AccountHolderUpdateResponse</a></code>
- <code><a href="./resources/account-holders.ts">AccountHolderCreateWebhookResponse</a></code>
- <code><a href="./resources/account-holders.ts">AccountHolderListDocumentsResponse</a></code>

Methods:

- <code title="post /account_holders">client.accountHolders.<a href="./resources/account-holders.ts">create</a>({ ...params }) -> Promise<Core.APIResponse<AccountHolder>></code>
- <code title="get /account_holders/{account_holder_token}">client.accountHolders.<a href="./resources/account-holders.ts">retrieve</a>(accountHolderToken) -> Promise<Core.APIResponse<AccountHolder>></code>
- <code title="patch /account_holders/{account_holder_token}">client.accountHolders.<a href="./resources/account-holders.ts">update</a>(accountHolderToken, { ...params }) -> Promise<Core.APIResponse<AccountHolderUpdateResponse>></code>
- <code title="post /webhooks/account_holders">client.accountHolders.<a href="./resources/account-holders.ts">createWebhook</a>({ ...params }) -> Promise<Core.APIResponse<AccountHolderCreateWebhookResponse>></code>
- <code title="get /account_holders/{account_holder_token}/documents">client.accountHolders.<a href="./resources/account-holders.ts">listDocuments</a>(accountHolderToken) -> Promise<Core.APIResponse<AccountHolderListDocumentsResponse>></code>
- <code title="post /account_holders/{account_holder_token}/resubmit">client.accountHolders.<a href="./resources/account-holders.ts">resubmit</a>(accountHolderToken, { ...params }) -> Promise<Core.APIResponse<AccountHolder>></code>
- <code title="get /account_holders/{account_holder_token}/documents/{document_token}">client.accountHolders.<a href="./resources/account-holders.ts">retrieveDocument</a>(accountHolderToken, documentToken) -> Promise<Core.APIResponse<AccountHolderDocument>></code>
- <code title="post /account_holders/{account_holder_token}/documents">client.accountHolders.<a href="./resources/account-holders.ts">uploadDocument</a>(accountHolderToken, { ...params }) -> Promise<Core.APIResponse<AccountHolderDocument>></code>

# AuthRules

Models:

- <code><a href="./resources/auth-rules.ts">AuthRule</a></code>
- <code><a href="./resources/auth-rules.ts">AuthRuleCreateResponse</a></code>
- <code><a href="./resources/auth-rules.ts">AuthRuleRetrieveResponse</a></code>
- <code><a href="./resources/auth-rules.ts">AuthRuleUpdateResponse</a></code>
- <code><a href="./resources/auth-rules.ts">AuthRuleApplyResponse</a></code>
- <code><a href="./resources/auth-rules.ts">AuthRuleRemoveResponse</a></code>

Methods:

- <code title="post /auth_rules">client.authRules.<a href="./resources/auth-rules.ts">create</a>({ ...params }) -> Promise<Core.APIResponse<AuthRuleCreateResponse>></code>
- <code title="get /auth_rules/{auth_rule_token}">client.authRules.<a href="./resources/auth-rules.ts">retrieve</a>(authRuleToken) -> Promise<Core.APIResponse<AuthRuleRetrieveResponse>></code>
- <code title="put /auth_rules/{auth_rule_token}">client.authRules.<a href="./resources/auth-rules.ts">update</a>(authRuleToken, { ...params }) -> Promise<Core.APIResponse<AuthRuleUpdateResponse>></code>
- <code title="get /auth_rules">client.authRules.<a href="./resources/auth-rules.ts">list</a>({ ...params }) -> Core.PagePromise<AuthRulesPage></code>
- <code title="post /auth_rules/{auth_rule_token}/apply">client.authRules.<a href="./resources/auth-rules.ts">apply</a>(authRuleToken, { ...params }) -> Promise<Core.APIResponse<AuthRuleApplyResponse>></code>
- <code title="delete /auth_rules/remove">client.authRules.<a href="./resources/auth-rules.ts">remove</a>({ ...params }) -> Promise<Core.APIResponse<AuthRuleRemoveResponse>></code>

# AuthStreamEnrollmentResource

Models:

- <code><a href="./resources/auth-stream-enrollment.ts">AuthStreamEnrollment</a></code>

Methods:

- <code title="get /auth_stream">client.authStreamEnrollment.<a href="./resources/auth-stream-enrollment.ts">retrieve</a>() -> Promise<Core.APIResponse<AuthStreamEnrollment>></code>
- <code title="delete /auth_stream">client.authStreamEnrollment.<a href="./resources/auth-stream-enrollment.ts">disenroll</a>() -> Promise<void></code>
- <code title="post /auth_stream">client.authStreamEnrollment.<a href="./resources/auth-stream-enrollment.ts">enroll</a>({ ...params }) -> Promise<void></code>

# Cards

Models:

- <code><a href="./resources/cards.ts">Card</a></code>
- <code><a href="./resources/cards.ts">EmbedRequestParams</a></code>
- <code><a href="./resources/cards.ts">CardEmbedResponse</a></code>
- <code><a href="./resources/cards.ts">CardProvisionResponse</a></code>

Methods:

- <code title="post /cards">client.cards.<a href="./resources/cards.ts">create</a>({ ...params }) -> Promise<Core.APIResponse<Card>></code>
- <code title="get /cards/{card_token}">client.cards.<a href="./resources/cards.ts">retrieve</a>(cardToken, { ...params }) -> Promise<Core.APIResponse<Card>></code>
- <code title="patch /cards/{card_token}">client.cards.<a href="./resources/cards.ts">update</a>(cardToken, { ...params }) -> Promise<Core.APIResponse<Card>></code>
- <code title="get /cards">client.cards.<a href="./resources/cards.ts">list</a>({ ...params }) -> Core.PagePromise<CardsPage></code>
- <code title="get /embed/card">client.cards.<a href="./resources/cards.ts">embed</a>({ ...params }) -> Promise<string></code>
- <code title="post /cards/{card_token}/provision">client.cards.<a href="./resources/cards.ts">provision</a>(cardToken, { ...params }) -> Promise<Core.APIResponse<CardProvisionResponse>></code>
- <code title="post /cards/{card_token}/reissue">client.cards.<a href="./resources/cards.ts">reissue</a>(cardToken, { ...params }) -> Promise<Core.APIResponse<Card>></code>

Custom Methods:

- `create`
- `retrieve`
- `update`
- `list`
- `embed`
- `getEmbedHTML`
- `getEmbedURL`
- `provision`
- `reissue`

# FundingSources

Models:

- <code><a href="./resources/funding-sources.ts">FundingSource</a></code>

Methods:

- <code title="post /funding_sources">client.fundingSources.<a href="./resources/funding-sources.ts">create</a>({ ...params }) -> Promise<Core.APIResponse<FundingSource>></code>
- <code title="patch /funding_sources/{funding_source_token}">client.fundingSources.<a href="./resources/funding-sources.ts">update</a>(fundingSourceToken, { ...params }) -> Promise<Core.APIResponse<FundingSource>></code>
- <code title="get /funding_sources">client.fundingSources.<a href="./resources/funding-sources.ts">list</a>({ ...params }) -> Core.PagePromise<FundingSourcesPage></code>
- <code title="post /funding_sources/{funding_source_token}/verify">client.fundingSources.<a href="./resources/funding-sources.ts">verify</a>(fundingSourceToken, { ...params }) -> Promise<Core.APIResponse<FundingSource>></code>

# Transactions

Models:

- <code><a href="./resources/transactions.ts">Transaction</a></code>
- <code><a href="./resources/transactions.ts">TransactionSimulateAuthorizationResponse</a></code>
- <code><a href="./resources/transactions.ts">TransactionSimulateClearingResponse</a></code>
- <code><a href="./resources/transactions.ts">TransactionSimulateCreditAuthorizationResponse</a></code>
- <code><a href="./resources/transactions.ts">TransactionSimulateReturnResponse</a></code>
- <code><a href="./resources/transactions.ts">TransactionSimulateReturnReversalResponse</a></code>
- <code><a href="./resources/transactions.ts">TransactionSimulateVoidResponse</a></code>

Methods:

- <code title="get /transactions/{transaction_token}">client.transactions.<a href="./resources/transactions.ts">retrieve</a>(transactionToken) -> Promise<Core.APIResponse<Transaction>></code>
- <code title="get /transactions">client.transactions.<a href="./resources/transactions.ts">list</a>({ ...params }) -> Core.PagePromise<TransactionsPage></code>
- <code title="post /simulate/authorize">client.transactions.<a href="./resources/transactions.ts">simulateAuthorization</a>({ ...params }) -> Promise<Core.APIResponse<TransactionSimulateAuthorizationResponse>></code>
- <code title="post /simulate/clearing">client.transactions.<a href="./resources/transactions.ts">simulateClearing</a>({ ...params }) -> Promise<Core.APIResponse<TransactionSimulateClearingResponse>></code>
- <code title="post /simulate/credit_authorization_advice">client.transactions.<a href="./resources/transactions.ts">simulateCreditAuthorization</a>({ ...params }) -> Promise<Core.APIResponse<TransactionSimulateCreditAuthorizationResponse>></code>
- <code title="post /simulate/return">client.transactions.<a href="./resources/transactions.ts">simulateReturn</a>({ ...params }) -> Promise<Core.APIResponse<TransactionSimulateReturnResponse>></code>
- <code title="post /simulate/return_reversal">client.transactions.<a href="./resources/transactions.ts">simulateReturnReversal</a>({ ...params }) -> Promise<Core.APIResponse<TransactionSimulateReturnReversalResponse>></code>
- <code title="post /simulate/void">client.transactions.<a href="./resources/transactions.ts">simulateVoid</a>({ ...params }) -> Promise<Core.APIResponse<TransactionSimulateVoidResponse>></code>
