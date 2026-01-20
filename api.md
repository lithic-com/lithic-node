# Lithic

Types:

- <code><a href="./src/resources/top-level.ts">APIStatus</a></code>

Methods:

- <code title="get /v1/status">client.<a href="./src/index.ts">apiStatus</a>() -> APIStatus</code>

# Shared

Types:

- <code><a href="./src/resources/shared.ts">AccountFinancialAccountType</a></code>
- <code><a href="./src/resources/shared.ts">Address</a></code>
- <code><a href="./src/resources/shared.ts">Carrier</a></code>
- <code><a href="./src/resources/shared.ts">Currency</a></code>
- <code><a href="./src/resources/shared.ts">Document</a></code>
- <code><a href="./src/resources/shared.ts">FinancialEvent</a></code>
- <code><a href="./src/resources/shared.ts">InstanceFinancialAccountType</a></code>
- <code><a href="./src/resources/shared.ts">Merchant</a></code>
- <code><a href="./src/resources/shared.ts">ShippingAddress</a></code>

# Accounts

Types:

- <code><a href="./src/resources/accounts.ts">Account</a></code>
- <code><a href="./src/resources/accounts.ts">AccountSpendLimits</a></code>

Methods:

- <code title="get /v1/accounts/{account_token}">client.accounts.<a href="./src/resources/accounts.ts">retrieve</a>(accountToken) -> Account</code>
- <code title="patch /v1/accounts/{account_token}">client.accounts.<a href="./src/resources/accounts.ts">update</a>(accountToken, { ...params }) -> Account</code>
- <code title="get /v1/accounts">client.accounts.<a href="./src/resources/accounts.ts">list</a>({ ...params }) -> AccountsCursorPage</code>
- <code title="get /v1/accounts/{account_token}/spend_limits">client.accounts.<a href="./src/resources/accounts.ts">retrieveSpendLimits</a>(accountToken) -> AccountSpendLimits</code>

# AccountHolders

Types:

- <code><a href="./src/resources/account-holders.ts">AccountHolder</a></code>
- <code><a href="./src/resources/account-holders.ts">AddressUpdate</a></code>
- <code><a href="./src/resources/account-holders.ts">KYB</a></code>
- <code><a href="./src/resources/account-holders.ts">KYBBusinessEntity</a></code>
- <code><a href="./src/resources/account-holders.ts">KYC</a></code>
- <code><a href="./src/resources/account-holders.ts">KYCExempt</a></code>
- <code><a href="./src/resources/account-holders.ts">RequiredDocument</a></code>
- <code><a href="./src/resources/account-holders.ts">AccountHolderCreateResponse</a></code>
- <code><a href="./src/resources/account-holders.ts">AccountHolderUpdateResponse</a></code>
- <code><a href="./src/resources/account-holders.ts">AccountHolderListDocumentsResponse</a></code>
- <code><a href="./src/resources/account-holders.ts">AccountHolderSimulateEnrollmentReviewResponse</a></code>

Methods:

- <code title="post /v1/account_holders">client.accountHolders.<a href="./src/resources/account-holders.ts">create</a>({ ...params }) -> AccountHolderCreateResponse</code>
- <code title="get /v1/account_holders/{account_holder_token}">client.accountHolders.<a href="./src/resources/account-holders.ts">retrieve</a>(accountHolderToken) -> AccountHolder</code>
- <code title="patch /v1/account_holders/{account_holder_token}">client.accountHolders.<a href="./src/resources/account-holders.ts">update</a>(accountHolderToken, { ...params }) -> AccountHolderUpdateResponse</code>
- <code title="get /v1/account_holders">client.accountHolders.<a href="./src/resources/account-holders.ts">list</a>({ ...params }) -> AccountHoldersSinglePage</code>
- <code title="get /v1/account_holders/{account_holder_token}/documents">client.accountHolders.<a href="./src/resources/account-holders.ts">listDocuments</a>(accountHolderToken) -> AccountHolderListDocumentsResponse</code>
- <code title="get /v1/account_holders/{account_holder_token}/documents/{document_token}">client.accountHolders.<a href="./src/resources/account-holders.ts">retrieveDocument</a>(documentToken, { ...params }) -> Document</code>
- <code title="post /v1/simulate/account_holders/enrollment_document_review">client.accountHolders.<a href="./src/resources/account-holders.ts">simulateEnrollmentDocumentReview</a>({ ...params }) -> Document</code>
- <code title="post /v1/simulate/account_holders/enrollment_review">client.accountHolders.<a href="./src/resources/account-holders.ts">simulateEnrollmentReview</a>({ ...params }) -> AccountHolderSimulateEnrollmentReviewResponse</code>
- <code title="post /v1/account_holders/{account_holder_token}/documents">client.accountHolders.<a href="./src/resources/account-holders.ts">uploadDocument</a>(accountHolderToken, { ...params }) -> Document</code>

# AuthRules

## V2

Types:

- <code><a href="./src/resources/auth-rules/v2/v2.ts">AuthRule</a></code>
- <code><a href="./src/resources/auth-rules/v2/v2.ts">AuthRuleCondition</a></code>
- <code><a href="./src/resources/auth-rules/v2/v2.ts">Conditional3DSActionParameters</a></code>
- <code><a href="./src/resources/auth-rules/v2/v2.ts">ConditionalACHActionParameters</a></code>
- <code><a href="./src/resources/auth-rules/v2/v2.ts">ConditionalAttribute</a></code>
- <code><a href="./src/resources/auth-rules/v2/v2.ts">ConditionalAuthorizationActionParameters</a></code>
- <code><a href="./src/resources/auth-rules/v2/v2.ts">ConditionalBlockParameters</a></code>
- <code><a href="./src/resources/auth-rules/v2/v2.ts">ConditionalOperation</a></code>
- <code><a href="./src/resources/auth-rules/v2/v2.ts">ConditionalTokenizationActionParameters</a></code>
- <code><a href="./src/resources/auth-rules/v2/v2.ts">ConditionalValue</a></code>
- <code><a href="./src/resources/auth-rules/v2/v2.ts">EventStream</a></code>
- <code><a href="./src/resources/auth-rules/v2/v2.ts">MerchantLockParameters</a></code>
- <code><a href="./src/resources/auth-rules/v2/v2.ts">RuleStats</a></code>
- <code><a href="./src/resources/auth-rules/v2/v2.ts">VelocityLimitParams</a></code>
- <code><a href="./src/resources/auth-rules/v2/v2.ts">VelocityLimitPeriod</a></code>
- <code><a href="./src/resources/auth-rules/v2/v2.ts">V2RetrieveFeaturesResponse</a></code>
- <code><a href="./src/resources/auth-rules/v2/v2.ts">V2RetrieveReportResponse</a></code>

Methods:

- <code title="post /v2/auth_rules">client.authRules.v2.<a href="./src/resources/auth-rules/v2/v2.ts">create</a>({ ...params }) -> AuthRule</code>
- <code title="get /v2/auth_rules/{auth_rule_token}">client.authRules.v2.<a href="./src/resources/auth-rules/v2/v2.ts">retrieve</a>(authRuleToken) -> AuthRule</code>
- <code title="patch /v2/auth_rules/{auth_rule_token}">client.authRules.v2.<a href="./src/resources/auth-rules/v2/v2.ts">update</a>(authRuleToken, { ...params }) -> AuthRule</code>
- <code title="get /v2/auth_rules">client.authRules.v2.<a href="./src/resources/auth-rules/v2/v2.ts">list</a>({ ...params }) -> AuthRulesCursorPage</code>
- <code title="delete /v2/auth_rules/{auth_rule_token}">client.authRules.v2.<a href="./src/resources/auth-rules/v2/v2.ts">delete</a>(authRuleToken) -> void</code>
- <code title="post /v2/auth_rules/{auth_rule_token}/draft">client.authRules.v2.<a href="./src/resources/auth-rules/v2/v2.ts">draft</a>(authRuleToken, { ...params }) -> AuthRule</code>
- <code title="post /v2/auth_rules/{auth_rule_token}/promote">client.authRules.v2.<a href="./src/resources/auth-rules/v2/v2.ts">promote</a>(authRuleToken) -> AuthRule</code>
- <code title="get /v2/auth_rules/{auth_rule_token}/features">client.authRules.v2.<a href="./src/resources/auth-rules/v2/v2.ts">retrieveFeatures</a>(authRuleToken, { ...params }) -> V2RetrieveFeaturesResponse</code>
- <code title="get /v2/auth_rules/{auth_rule_token}/report">client.authRules.v2.<a href="./src/resources/auth-rules/v2/v2.ts">retrieveReport</a>(authRuleToken, { ...params }) -> V2RetrieveReportResponse</code>

### Backtests

Types:

- <code><a href="./src/resources/auth-rules/v2/backtests.ts">BacktestResults</a></code>
- <code><a href="./src/resources/auth-rules/v2/backtests.ts">BacktestCreateResponse</a></code>

Methods:

- <code title="post /v2/auth_rules/{auth_rule_token}/backtests">client.authRules.v2.backtests.<a href="./src/resources/auth-rules/v2/backtests.ts">create</a>(authRuleToken, { ...params }) -> BacktestCreateResponse</code>
- <code title="get /v2/auth_rules/{auth_rule_token}/backtests/{auth_rule_backtest_token}">client.authRules.v2.backtests.<a href="./src/resources/auth-rules/v2/backtests.ts">retrieve</a>(authRuleBacktestToken, { ...params }) -> BacktestResults</code>

# AuthStreamEnrollment

Types:

- <code><a href="./src/resources/auth-stream-enrollment.ts">AuthStreamSecret</a></code>

Methods:

- <code title="get /v1/auth_stream/secret">client.authStreamEnrollment.<a href="./src/resources/auth-stream-enrollment.ts">retrieveSecret</a>() -> AuthStreamSecret</code>
- <code title="post /v1/auth_stream/secret/rotate">client.authStreamEnrollment.<a href="./src/resources/auth-stream-enrollment.ts">rotateSecret</a>() -> void</code>

# TokenizationDecisioning

Types:

- <code><a href="./src/resources/tokenization-decisioning.ts">TokenizationSecret</a></code>
- <code><a href="./src/resources/tokenization-decisioning.ts">TokenizationDecisioningRotateSecretResponse</a></code>

Methods:

- <code title="get /v1/tokenization_decisioning/secret">client.tokenizationDecisioning.<a href="./src/resources/tokenization-decisioning.ts">retrieveSecret</a>() -> TokenizationSecret</code>
- <code title="post /v1/tokenization_decisioning/secret/rotate">client.tokenizationDecisioning.<a href="./src/resources/tokenization-decisioning.ts">rotateSecret</a>() -> TokenizationDecisioningRotateSecretResponse</code>

# Tokenizations

Types:

- <code><a href="./src/resources/tokenizations.ts">Device</a></code>
- <code><a href="./src/resources/tokenizations.ts">DigitalWalletTokenMetadata</a></code>
- <code><a href="./src/resources/tokenizations.ts">Tokenization</a></code>
- <code><a href="./src/resources/tokenizations.ts">TokenizationDeclineReason</a></code>
- <code><a href="./src/resources/tokenizations.ts">TokenizationRuleResult</a></code>
- <code><a href="./src/resources/tokenizations.ts">TokenizationTfaReason</a></code>
- <code><a href="./src/resources/tokenizations.ts">WalletDecisioningInfo</a></code>

Methods:

- <code title="get /v1/tokenizations/{tokenization_token}">client.tokenizations.<a href="./src/resources/tokenizations.ts">retrieve</a>(tokenizationToken) -> Tokenization</code>
- <code title="get /v1/tokenizations">client.tokenizations.<a href="./src/resources/tokenizations.ts">list</a>({ ...params }) -> TokenizationsCursorPage</code>
- <code title="post /v1/tokenizations/{tokenization_token}/activate">client.tokenizations.<a href="./src/resources/tokenizations.ts">activate</a>(tokenizationToken) -> void</code>
- <code title="post /v1/tokenizations/{tokenization_token}/deactivate">client.tokenizations.<a href="./src/resources/tokenizations.ts">deactivate</a>(tokenizationToken) -> void</code>
- <code title="post /v1/tokenizations/{tokenization_token}/pause">client.tokenizations.<a href="./src/resources/tokenizations.ts">pause</a>(tokenizationToken) -> void</code>
- <code title="post /v1/tokenizations/{tokenization_token}/resend_activation_code">client.tokenizations.<a href="./src/resources/tokenizations.ts">resendActivationCode</a>(tokenizationToken, { ...params }) -> void</code>
- <code title="post /v1/simulate/tokenizations">client.tokenizations.<a href="./src/resources/tokenizations.ts">simulate</a>({ ...params }) -> Tokenization</code>
- <code title="post /v1/tokenizations/{tokenization_token}/unpause">client.tokenizations.<a href="./src/resources/tokenizations.ts">unpause</a>(tokenizationToken) -> void</code>
- <code title="post /v1/tokenizations/{tokenization_token}/update_digital_card_art">client.tokenizations.<a href="./src/resources/tokenizations.ts">updateDigitalCardArt</a>(tokenizationToken, { ...params }) -> Tokenization</code>

# Cards

Types:

- <code><a href="./src/resources/cards/cards.ts">Card</a></code>
- <code><a href="./src/resources/cards/cards.ts">CardSpendLimits</a></code>
- <code><a href="./src/resources/cards/cards.ts">NonPCICard</a></code>
- <code><a href="./src/resources/cards/cards.ts">ProvisionResponse</a></code>
- <code><a href="./src/resources/cards/cards.ts">SpendLimitDuration</a></code>
- <code><a href="./src/resources/cards/cards.ts">CardEmbedResponse</a></code>
- <code><a href="./src/resources/cards/cards.ts">CardProvisionResponse</a></code>
- <code><a href="./src/resources/cards/cards.ts">CardWebProvisionResponse</a></code>

Methods:

- <code title="post /v1/cards">client.cards.<a href="./src/resources/cards/cards.ts">create</a>({ ...params }) -> Card</code>
- <code title="get /v1/cards/{card_token}">client.cards.<a href="./src/resources/cards/cards.ts">retrieve</a>(cardToken) -> Card</code>
- <code title="patch /v1/cards/{card_token}">client.cards.<a href="./src/resources/cards/cards.ts">update</a>(cardToken, { ...params }) -> Card</code>
- <code title="get /v1/cards">client.cards.<a href="./src/resources/cards/cards.ts">list</a>({ ...params }) -> NonPCICardsCursorPage</code>
- <code title="post /v1/cards/{card_token}/convert_physical">client.cards.<a href="./src/resources/cards/cards.ts">convertPhysical</a>(cardToken, { ...params }) -> Card</code>
- <code title="get /v1/embed/card">client.cards.<a href="./src/resources/cards/cards.ts">embed</a>({ ...params }) -> string</code>
- <code title="post /v1/cards/{card_token}/provision">client.cards.<a href="./src/resources/cards/cards.ts">provision</a>(cardToken, { ...params }) -> CardProvisionResponse</code>
- <code title="post /v1/cards/{card_token}/reissue">client.cards.<a href="./src/resources/cards/cards.ts">reissue</a>(cardToken, { ...params }) -> Card</code>
- <code title="post /v1/cards/{card_token}/renew">client.cards.<a href="./src/resources/cards/cards.ts">renew</a>(cardToken, { ...params }) -> Card</code>
- <code title="get /v1/cards/{card_token}/spend_limits">client.cards.<a href="./src/resources/cards/cards.ts">retrieveSpendLimits</a>(cardToken) -> CardSpendLimits</code>
- <code title="post /v1/cards/search_by_pan">client.cards.<a href="./src/resources/cards/cards.ts">searchByPan</a>({ ...params }) -> Card</code>
- <code title="post /v1/cards/{card_token}/web_provision">client.cards.<a href="./src/resources/cards/cards.ts">webProvision</a>(cardToken, { ...params }) -> CardWebProvisionResponse</code>
- <code>client.cards.<a href="./src/resources/cards/cards.ts">getEmbedHTML</a>(...args) -> Promise&lt;string&gt;</code>
- <code>client.cards.<a href="./src/resources/cards/cards.ts">getEmbedURL</a>(...args) -> string</code>

## Balances

Methods:

- <code title="get /v1/cards/{card_token}/balances">client.cards.balances.<a href="./src/resources/cards/balances.ts">list</a>(cardToken, { ...params }) -> FinancialAccountBalancesSinglePage</code>

## FinancialTransactions

Methods:

- <code title="get /v1/cards/{card_token}/financial_transactions/{financial_transaction_token}">client.cards.financialTransactions.<a href="./src/resources/cards/financial-transactions.ts">retrieve</a>(financialTransactionToken, { ...params }) -> FinancialTransaction</code>
- <code title="get /v1/cards/{card_token}/financial_transactions">client.cards.financialTransactions.<a href="./src/resources/cards/financial-transactions.ts">list</a>(cardToken, { ...params }) -> FinancialTransactionsSinglePage</code>

# CardBulkOrders

Types:

- <code><a href="./src/resources/card-bulk-orders.ts">CardBulkOrder</a></code>

Methods:

- <code title="post /v1/card_bulk_orders">client.cardBulkOrders.<a href="./src/resources/card-bulk-orders.ts">create</a>({ ...params }) -> CardBulkOrder</code>
- <code title="get /v1/card_bulk_orders/{bulk_order_token}">client.cardBulkOrders.<a href="./src/resources/card-bulk-orders.ts">retrieve</a>(bulkOrderToken) -> CardBulkOrder</code>
- <code title="patch /v1/card_bulk_orders/{bulk_order_token}">client.cardBulkOrders.<a href="./src/resources/card-bulk-orders.ts">update</a>(bulkOrderToken, { ...params }) -> CardBulkOrder</code>
- <code title="get /v1/card_bulk_orders">client.cardBulkOrders.<a href="./src/resources/card-bulk-orders.ts">list</a>({ ...params }) -> CardBulkOrdersCursorPage</code>

# Balances

Types:

- <code><a href="./src/resources/balances.ts">Balance</a></code>

Methods:

- <code title="get /v1/balances">client.balances.<a href="./src/resources/balances.ts">list</a>({ ...params }) -> BalancesSinglePage</code>

# Disputes

Types:

- <code><a href="./src/resources/disputes.ts">Dispute</a></code>
- <code><a href="./src/resources/disputes.ts">DisputeEvidence</a></code>

Methods:

- <code title="post /v1/disputes">client.disputes.<a href="./src/resources/disputes.ts">create</a>({ ...params }) -> Dispute</code>
- <code title="get /v1/disputes/{dispute_token}">client.disputes.<a href="./src/resources/disputes.ts">retrieve</a>(disputeToken) -> Dispute</code>
- <code title="patch /v1/disputes/{dispute_token}">client.disputes.<a href="./src/resources/disputes.ts">update</a>(disputeToken, { ...params }) -> Dispute</code>
- <code title="get /v1/disputes">client.disputes.<a href="./src/resources/disputes.ts">list</a>({ ...params }) -> DisputesCursorPage</code>
- <code title="delete /v1/disputes/{dispute_token}">client.disputes.<a href="./src/resources/disputes.ts">delete</a>(disputeToken) -> Dispute</code>
- <code title="delete /v1/disputes/{dispute_token}/evidences/{evidence_token}">client.disputes.<a href="./src/resources/disputes.ts">deleteEvidence</a>(evidenceToken, { ...params }) -> DisputeEvidence</code>
- <code title="post /v1/disputes/{dispute_token}/evidences">client.disputes.<a href="./src/resources/disputes.ts">initiateEvidenceUpload</a>(disputeToken, { ...params }) -> DisputeEvidence</code>
- <code title="get /v1/disputes/{dispute_token}/evidences">client.disputes.<a href="./src/resources/disputes.ts">listEvidences</a>(disputeToken, { ...params }) -> DisputeEvidencesCursorPage</code>
- <code title="get /v1/disputes/{dispute_token}/evidences/{evidence_token}">client.disputes.<a href="./src/resources/disputes.ts">retrieveEvidence</a>(evidenceToken, { ...params }) -> DisputeEvidence</code>
- <code>client.disputes.<a href="./src/resources/disputes.ts">uploadEvidence</a>(disputeToken, file, options?) -> Promise&lt;void&gt;</code>

# DisputesV2

Types:

- <code><a href="./src/resources/disputes-v2.ts">DisputeV2</a></code>

Methods:

- <code title="get /v2/disputes/{dispute_token}">client.disputesV2.<a href="./src/resources/disputes-v2.ts">retrieve</a>(disputeToken) -> DisputeV2</code>
- <code title="get /v2/disputes">client.disputesV2.<a href="./src/resources/disputes-v2.ts">list</a>({ ...params }) -> DisputeV2sCursorPage</code>

# Events

Types:

- <code><a href="./src/resources/events/events.ts">Event</a></code>
- <code><a href="./src/resources/events/events.ts">EventSubscription</a></code>
- <code><a href="./src/resources/events/events.ts">MessageAttempt</a></code>

Methods:

- <code title="get /v1/events/{event_token}">client.events.<a href="./src/resources/events/events.ts">retrieve</a>(eventToken) -> Event</code>
- <code title="get /v1/events">client.events.<a href="./src/resources/events/events.ts">list</a>({ ...params }) -> EventsCursorPage</code>
- <code title="get /v1/events/{event_token}/attempts">client.events.<a href="./src/resources/events/events.ts">listAttempts</a>(eventToken, { ...params }) -> MessageAttemptsCursorPage</code>
- <code>client.events.<a href="./src/resources/events/events.ts">resend</a>(eventToken, params, options?) -> Promise&lt;void&gt;</code>

## Subscriptions

Types:

- <code><a href="./src/resources/events/subscriptions.ts">SubscriptionRetrieveSecretResponse</a></code>

Methods:

- <code title="post /v1/event_subscriptions">client.events.subscriptions.<a href="./src/resources/events/subscriptions.ts">create</a>({ ...params }) -> EventSubscription</code>
- <code title="get /v1/event_subscriptions/{event_subscription_token}">client.events.subscriptions.<a href="./src/resources/events/subscriptions.ts">retrieve</a>(eventSubscriptionToken) -> EventSubscription</code>
- <code title="patch /v1/event_subscriptions/{event_subscription_token}">client.events.subscriptions.<a href="./src/resources/events/subscriptions.ts">update</a>(eventSubscriptionToken, { ...params }) -> EventSubscription</code>
- <code title="get /v1/event_subscriptions">client.events.subscriptions.<a href="./src/resources/events/subscriptions.ts">list</a>({ ...params }) -> EventSubscriptionsCursorPage</code>
- <code title="delete /v1/event_subscriptions/{event_subscription_token}">client.events.subscriptions.<a href="./src/resources/events/subscriptions.ts">delete</a>(eventSubscriptionToken) -> void</code>
- <code title="get /v1/event_subscriptions/{event_subscription_token}/attempts">client.events.subscriptions.<a href="./src/resources/events/subscriptions.ts">listAttempts</a>(eventSubscriptionToken, { ...params }) -> MessageAttemptsCursorPage</code>
- <code title="post /v1/event_subscriptions/{event_subscription_token}/recover">client.events.subscriptions.<a href="./src/resources/events/subscriptions.ts">recover</a>(eventSubscriptionToken, { ...params }) -> void</code>
- <code title="post /v1/event_subscriptions/{event_subscription_token}/replay_missing">client.events.subscriptions.<a href="./src/resources/events/subscriptions.ts">replayMissing</a>(eventSubscriptionToken, { ...params }) -> void</code>
- <code title="get /v1/event_subscriptions/{event_subscription_token}/secret">client.events.subscriptions.<a href="./src/resources/events/subscriptions.ts">retrieveSecret</a>(eventSubscriptionToken) -> SubscriptionRetrieveSecretResponse</code>
- <code title="post /v1/event_subscriptions/{event_subscription_token}/secret/rotate">client.events.subscriptions.<a href="./src/resources/events/subscriptions.ts">rotateSecret</a>(eventSubscriptionToken) -> void</code>
- <code title="post /v1/simulate/event_subscriptions/{event_subscription_token}/send_example">client.events.subscriptions.<a href="./src/resources/events/subscriptions.ts">sendSimulatedExample</a>(eventSubscriptionToken, { ...params }) -> void</code>

## EventSubscriptions

Methods:

- <code title="post /v1/events/{event_token}/event_subscriptions/{event_subscription_token}/resend">client.events.eventSubscriptions.<a href="./src/resources/events/event-subscriptions.ts">resend</a>(eventSubscriptionToken, { ...params }) -> void</code>

# Transfers

Types:

- <code><a href="./src/resources/transfers.ts">Transfer</a></code>

Methods:

- <code title="post /v1/transfer">client.transfers.<a href="./src/resources/transfers.ts">create</a>({ ...params }) -> Transfer</code>

# FinancialAccounts

Types:

- <code><a href="./src/resources/financial-accounts/financial-accounts.ts">CategoryDetails</a></code>
- <code><a href="./src/resources/financial-accounts/financial-accounts.ts">FinancialAccount</a></code>
- <code><a href="./src/resources/financial-accounts/financial-accounts.ts">FinancialAccountBalance</a></code>
- <code><a href="./src/resources/financial-accounts/financial-accounts.ts">FinancialTransaction</a></code>
- <code><a href="./src/resources/financial-accounts/financial-accounts.ts">StatementTotals</a></code>

Methods:

- <code title="post /v1/financial_accounts">client.financialAccounts.<a href="./src/resources/financial-accounts/financial-accounts.ts">create</a>({ ...params }) -> FinancialAccount</code>
- <code title="get /v1/financial_accounts/{financial_account_token}">client.financialAccounts.<a href="./src/resources/financial-accounts/financial-accounts.ts">retrieve</a>(financialAccountToken) -> FinancialAccount</code>
- <code title="patch /v1/financial_accounts/{financial_account_token}">client.financialAccounts.<a href="./src/resources/financial-accounts/financial-accounts.ts">update</a>(financialAccountToken, { ...params }) -> FinancialAccount</code>
- <code title="get /v1/financial_accounts">client.financialAccounts.<a href="./src/resources/financial-accounts/financial-accounts.ts">list</a>({ ...params }) -> FinancialAccountsSinglePage</code>
- <code title="post /v1/financial_accounts/{financial_account_token}/register_account_number">client.financialAccounts.<a href="./src/resources/financial-accounts/financial-accounts.ts">registerAccountNumber</a>(financialAccountToken, { ...params }) -> void</code>
- <code title="post /v1/financial_accounts/{financial_account_token}/update_status">client.financialAccounts.<a href="./src/resources/financial-accounts/financial-accounts.ts">updateStatus</a>(financialAccountToken, { ...params }) -> FinancialAccount</code>

## Balances

Methods:

- <code title="get /v1/financial_accounts/{financial_account_token}/balances">client.financialAccounts.balances.<a href="./src/resources/financial-accounts/balances.ts">list</a>(financialAccountToken, { ...params }) -> FinancialAccountBalancesSinglePage</code>

## FinancialTransactions

Methods:

- <code title="get /v1/financial_accounts/{financial_account_token}/financial_transactions/{financial_transaction_token}">client.financialAccounts.financialTransactions.<a href="./src/resources/financial-accounts/financial-transactions.ts">retrieve</a>(financialTransactionToken, { ...params }) -> FinancialTransaction</code>
- <code title="get /v1/financial_accounts/{financial_account_token}/financial_transactions">client.financialAccounts.financialTransactions.<a href="./src/resources/financial-accounts/financial-transactions.ts">list</a>(financialAccountToken, { ...params }) -> FinancialTransactionsSinglePage</code>

## CreditConfiguration

Types:

- <code><a href="./src/resources/financial-accounts/credit-configuration.ts">FinancialAccountCreditConfig</a></code>

Methods:

- <code title="get /v1/financial_accounts/{financial_account_token}/credit_configuration">client.financialAccounts.creditConfiguration.<a href="./src/resources/financial-accounts/credit-configuration.ts">retrieve</a>(financialAccountToken) -> FinancialAccountCreditConfig</code>
- <code title="patch /v1/financial_accounts/{financial_account_token}/credit_configuration">client.financialAccounts.creditConfiguration.<a href="./src/resources/financial-accounts/credit-configuration.ts">update</a>(financialAccountToken, { ...params }) -> FinancialAccountCreditConfig</code>

## Statements

Types:

- <code><a href="./src/resources/financial-accounts/statements/statements.ts">Statement</a></code>
- <code><a href="./src/resources/financial-accounts/statements/statements.ts">Statements</a></code>

Methods:

- <code title="get /v1/financial_accounts/{financial_account_token}/statements/{statement_token}">client.financialAccounts.statements.<a href="./src/resources/financial-accounts/statements/statements.ts">retrieve</a>(statementToken, { ...params }) -> Statement</code>
- <code title="get /v1/financial_accounts/{financial_account_token}/statements">client.financialAccounts.statements.<a href="./src/resources/financial-accounts/statements/statements.ts">list</a>(financialAccountToken, { ...params }) -> StatementsCursorPage</code>

### LineItems

Types:

- <code><a href="./src/resources/financial-accounts/statements/line-items.ts">StatementLineItems</a></code>

Methods:

- <code title="get /v1/financial_accounts/{financial_account_token}/statements/{statement_token}/line_items">client.financialAccounts.statements.lineItems.<a href="./src/resources/financial-accounts/statements/line-items.ts">list</a>(statementToken, { ...params }) -> StatementLineItemsDataCursorPage</code>

## LoanTapes

Types:

- <code><a href="./src/resources/financial-accounts/loan-tapes.ts">CategoryBalances</a></code>
- <code><a href="./src/resources/financial-accounts/loan-tapes.ts">LoanTape</a></code>

Methods:

- <code title="get /v1/financial_accounts/{financial_account_token}/loan_tapes/{loan_tape_token}">client.financialAccounts.loanTapes.<a href="./src/resources/financial-accounts/loan-tapes.ts">retrieve</a>(loanTapeToken, { ...params }) -> LoanTape</code>
- <code title="get /v1/financial_accounts/{financial_account_token}/loan_tapes">client.financialAccounts.loanTapes.<a href="./src/resources/financial-accounts/loan-tapes.ts">list</a>(financialAccountToken, { ...params }) -> LoanTapesCursorPage</code>

# Transactions

Types:

- <code><a href="./src/resources/transactions/transactions.ts">CardholderAuthentication</a></code>
- <code><a href="./src/resources/transactions/transactions.ts">TokenInfo</a></code>
- <code><a href="./src/resources/transactions/transactions.ts">Transaction</a></code>
- <code><a href="./src/resources/transactions/transactions.ts">TransactionSimulateAuthorizationResponse</a></code>
- <code><a href="./src/resources/transactions/transactions.ts">TransactionSimulateAuthorizationAdviceResponse</a></code>
- <code><a href="./src/resources/transactions/transactions.ts">TransactionSimulateClearingResponse</a></code>
- <code><a href="./src/resources/transactions/transactions.ts">TransactionSimulateCreditAuthorizationResponse</a></code>
- <code><a href="./src/resources/transactions/transactions.ts">TransactionSimulateCreditAuthorizationAdviceResponse</a></code>
- <code><a href="./src/resources/transactions/transactions.ts">TransactionSimulateReturnResponse</a></code>
- <code><a href="./src/resources/transactions/transactions.ts">TransactionSimulateReturnReversalResponse</a></code>
- <code><a href="./src/resources/transactions/transactions.ts">TransactionSimulateVoidResponse</a></code>

Methods:

- <code title="get /v1/transactions/{transaction_token}">client.transactions.<a href="./src/resources/transactions/transactions.ts">retrieve</a>(transactionToken) -> Transaction</code>
- <code title="get /v1/transactions">client.transactions.<a href="./src/resources/transactions/transactions.ts">list</a>({ ...params }) -> TransactionsCursorPage</code>
- <code title="post /v1/transactions/{transaction_token}/expire_authorization">client.transactions.<a href="./src/resources/transactions/transactions.ts">expireAuthorization</a>(transactionToken) -> void</code>
- <code title="post /v1/simulate/authorize">client.transactions.<a href="./src/resources/transactions/transactions.ts">simulateAuthorization</a>({ ...params }) -> TransactionSimulateAuthorizationResponse</code>
- <code title="post /v1/simulate/authorization_advice">client.transactions.<a href="./src/resources/transactions/transactions.ts">simulateAuthorizationAdvice</a>({ ...params }) -> TransactionSimulateAuthorizationAdviceResponse</code>
- <code title="post /v1/simulate/clearing">client.transactions.<a href="./src/resources/transactions/transactions.ts">simulateClearing</a>({ ...params }) -> TransactionSimulateClearingResponse</code>
- <code title="post /v1/simulate/credit_authorization_advice">client.transactions.<a href="./src/resources/transactions/transactions.ts">simulateCreditAuthorization</a>({ ...params }) -> TransactionSimulateCreditAuthorizationResponse</code>
- <code title="post /v1/simulate/credit_authorization_advice">client.transactions.<a href="./src/resources/transactions/transactions.ts">simulateCreditAuthorizationAdvice</a>({ ...params }) -> TransactionSimulateCreditAuthorizationAdviceResponse</code>
- <code title="post /v1/simulate/return">client.transactions.<a href="./src/resources/transactions/transactions.ts">simulateReturn</a>({ ...params }) -> TransactionSimulateReturnResponse</code>
- <code title="post /v1/simulate/return_reversal">client.transactions.<a href="./src/resources/transactions/transactions.ts">simulateReturnReversal</a>({ ...params }) -> TransactionSimulateReturnReversalResponse</code>
- <code title="post /v1/simulate/void">client.transactions.<a href="./src/resources/transactions/transactions.ts">simulateVoid</a>({ ...params }) -> TransactionSimulateVoidResponse</code>

## EnhancedCommercialData

Types:

- <code><a href="./src/resources/transactions/enhanced-commercial-data.ts">EnhancedCommercialDataRetrieveResponse</a></code>

Methods:

- <code title="get /v1/transactions/{transaction_token}/enhanced_commercial_data">client.transactions.enhancedCommercialData.<a href="./src/resources/transactions/enhanced-commercial-data.ts">retrieve</a>(transactionToken) -> EnhancedCommercialDataRetrieveResponse</code>

## Events

### EnhancedCommercialData

Types:

- <code><a href="./src/resources/transactions/events/enhanced-commercial-data.ts">EnhancedData</a></code>

Methods:

- <code title="get /v1/transactions/events/{event_token}/enhanced_commercial_data">client.transactions.events.enhancedCommercialData.<a href="./src/resources/transactions/events/enhanced-commercial-data.ts">retrieve</a>(eventToken) -> EnhancedData</code>

# ResponderEndpoints

Types:

- <code><a href="./src/resources/responder-endpoints.ts">ResponderEndpointStatus</a></code>
- <code><a href="./src/resources/responder-endpoints.ts">ResponderEndpointCreateResponse</a></code>

Methods:

- <code title="post /v1/responder_endpoints">client.responderEndpoints.<a href="./src/resources/responder-endpoints.ts">create</a>({ ...params }) -> ResponderEndpointCreateResponse</code>
- <code title="delete /v1/responder_endpoints">client.responderEndpoints.<a href="./src/resources/responder-endpoints.ts">delete</a>({ ...params }) -> void</code>
- <code title="get /v1/responder_endpoints">client.responderEndpoints.<a href="./src/resources/responder-endpoints.ts">checkStatus</a>({ ...params }) -> ResponderEndpointStatus</code>

# Webhooks

Methods:

- <code>client.webhooks.<a href="./src/resources/webhooks.ts">unwrap</a>(payload, headers, secret) -> Object</code>
- <code>client.webhooks.<a href="./src/resources/webhooks.ts">verifySignature</a>(body, headers, secret) -> void</code>
- <code>client.webhooks.<a href="./src/resources/webhooks.ts">parse</a>(body, headers, secret) -> ParsedWebhookEvent</code>
- <code>client.webhooks.<a href="./src/resources/webhooks.ts">parseUnsafe</a>(body) -> ParsedWebhookEvent</code>

# ExternalBankAccounts

Types:

- <code><a href="./src/resources/external-bank-accounts/external-bank-accounts.ts">ExternalBankAccount</a></code>
- <code><a href="./src/resources/external-bank-accounts/external-bank-accounts.ts">ExternalBankAccountAddress</a></code>
- <code><a href="./src/resources/external-bank-accounts/external-bank-accounts.ts">OwnerType</a></code>
- <code><a href="./src/resources/external-bank-accounts/external-bank-accounts.ts">VerificationMethod</a></code>
- <code><a href="./src/resources/external-bank-accounts/external-bank-accounts.ts">ExternalBankAccountCreateResponse</a></code>
- <code><a href="./src/resources/external-bank-accounts/external-bank-accounts.ts">ExternalBankAccountRetrieveResponse</a></code>
- <code><a href="./src/resources/external-bank-accounts/external-bank-accounts.ts">ExternalBankAccountUpdateResponse</a></code>
- <code><a href="./src/resources/external-bank-accounts/external-bank-accounts.ts">ExternalBankAccountListResponse</a></code>
- <code><a href="./src/resources/external-bank-accounts/external-bank-accounts.ts">ExternalBankAccountRetryMicroDepositsResponse</a></code>

Methods:

- <code title="post /v1/external_bank_accounts">client.externalBankAccounts.<a href="./src/resources/external-bank-accounts/external-bank-accounts.ts">create</a>({ ...params }) -> ExternalBankAccountCreateResponse</code>
- <code title="get /v1/external_bank_accounts/{external_bank_account_token}">client.externalBankAccounts.<a href="./src/resources/external-bank-accounts/external-bank-accounts.ts">retrieve</a>(externalBankAccountToken) -> ExternalBankAccountRetrieveResponse</code>
- <code title="patch /v1/external_bank_accounts/{external_bank_account_token}">client.externalBankAccounts.<a href="./src/resources/external-bank-accounts/external-bank-accounts.ts">update</a>(externalBankAccountToken, { ...params }) -> ExternalBankAccountUpdateResponse</code>
- <code title="get /v1/external_bank_accounts">client.externalBankAccounts.<a href="./src/resources/external-bank-accounts/external-bank-accounts.ts">list</a>({ ...params }) -> ExternalBankAccountListResponsesCursorPage</code>
- <code title="post /v1/external_bank_accounts/{external_bank_account_token}/retry_micro_deposits">client.externalBankAccounts.<a href="./src/resources/external-bank-accounts/external-bank-accounts.ts">retryMicroDeposits</a>(externalBankAccountToken, { ...params }) -> ExternalBankAccountRetryMicroDepositsResponse</code>
- <code title="post /v1/external_bank_accounts/{external_bank_account_token}/retry_prenote">client.externalBankAccounts.<a href="./src/resources/external-bank-accounts/external-bank-accounts.ts">retryPrenote</a>(externalBankAccountToken, { ...params }) -> ExternalBankAccount</code>
- <code title="post /v1/external_bank_accounts/{external_bank_account_token}/unpause">client.externalBankAccounts.<a href="./src/resources/external-bank-accounts/external-bank-accounts.ts">unpause</a>(externalBankAccountToken) -> ExternalBankAccount</code>

## MicroDeposits

Types:

- <code><a href="./src/resources/external-bank-accounts/micro-deposits.ts">MicroDepositCreateResponse</a></code>

Methods:

- <code title="post /v1/external_bank_accounts/{external_bank_account_token}/micro_deposits">client.externalBankAccounts.microDeposits.<a href="./src/resources/external-bank-accounts/micro-deposits.ts">create</a>(externalBankAccountToken, { ...params }) -> MicroDepositCreateResponse</code>

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

- <code title="post /v1/payments">client.payments.<a href="./src/resources/payments.ts">create</a>({ ...params }) -> PaymentCreateResponse</code>
- <code title="get /v1/payments/{payment_token}">client.payments.<a href="./src/resources/payments.ts">retrieve</a>(paymentToken) -> Payment</code>
- <code title="get /v1/payments">client.payments.<a href="./src/resources/payments.ts">list</a>({ ...params }) -> PaymentsCursorPage</code>
- <code title="post /v1/payments/{payment_token}/retry">client.payments.<a href="./src/resources/payments.ts">retry</a>(paymentToken) -> PaymentRetryResponse</code>
- <code title="post /v1/payments/{payment_token}/return">client.payments.<a href="./src/resources/payments.ts">return</a>(paymentToken, { ...params }) -> Payment</code>
- <code title="post /v1/simulate/payments/{payment_token}/action">client.payments.<a href="./src/resources/payments.ts">simulateAction</a>(paymentToken, { ...params }) -> PaymentSimulateActionResponse</code>
- <code title="post /v1/simulate/payments/receipt">client.payments.<a href="./src/resources/payments.ts">simulateReceipt</a>({ ...params }) -> PaymentSimulateReceiptResponse</code>
- <code title="post /v1/simulate/payments/release">client.payments.<a href="./src/resources/payments.ts">simulateRelease</a>({ ...params }) -> PaymentSimulateReleaseResponse</code>
- <code title="post /v1/simulate/payments/return">client.payments.<a href="./src/resources/payments.ts">simulateReturn</a>({ ...params }) -> PaymentSimulateReturnResponse</code>

# ThreeDS

Types:

- <code><a href="./src/resources/three-ds/three-ds.ts">ThreeDSAuthentication</a></code>

## Authentication

Types:

- <code><a href="./src/resources/three-ds/authentication.ts">AuthenticationSimulateResponse</a></code>

Methods:

- <code title="get /v1/three_ds_authentication/{three_ds_authentication_token}">client.threeDS.authentication.<a href="./src/resources/three-ds/authentication.ts">retrieve</a>(threeDSAuthenticationToken) -> ThreeDSAuthentication</code>
- <code title="post /v1/three_ds_authentication/simulate">client.threeDS.authentication.<a href="./src/resources/three-ds/authentication.ts">simulate</a>({ ...params }) -> AuthenticationSimulateResponse</code>
- <code title="post /v1/three_ds_decisioning/simulate/enter_otp">client.threeDS.authentication.<a href="./src/resources/three-ds/authentication.ts">simulateOtpEntry</a>({ ...params }) -> void</code>

## Decisioning

Types:

- <code><a href="./src/resources/three-ds/decisioning.ts">ChallengeResponse</a></code>
- <code><a href="./src/resources/three-ds/decisioning.ts">ChallengeResult</a></code>
- <code><a href="./src/resources/three-ds/decisioning.ts">DecisioningRetrieveSecretResponse</a></code>

Methods:

- <code title="post /v1/three_ds_decisioning/challenge_response">client.threeDS.decisioning.<a href="./src/resources/three-ds/decisioning.ts">challengeResponse</a>({ ...params }) -> void</code>
- <code title="get /v1/three_ds_decisioning/secret">client.threeDS.decisioning.<a href="./src/resources/three-ds/decisioning.ts">retrieveSecret</a>() -> DecisioningRetrieveSecretResponse</code>
- <code title="post /v1/three_ds_decisioning/secret/rotate">client.threeDS.decisioning.<a href="./src/resources/three-ds/decisioning.ts">rotateSecret</a>() -> void</code>

# Reports

Types:

- <code><a href="./src/resources/reports/reports.ts">NetworkTotal</a></code>
- <code><a href="./src/resources/reports/reports.ts">SettlementDetail</a></code>
- <code><a href="./src/resources/reports/reports.ts">SettlementReport</a></code>
- <code><a href="./src/resources/reports/reports.ts">SettlementSummaryDetails</a></code>

## Settlement

Methods:

- <code title="get /v1/reports/settlement/details/{report_date}">client.reports.settlement.<a href="./src/resources/reports/settlement/settlement.ts">listDetails</a>(reportDate, { ...params }) -> SettlementDetailsCursorPage</code>
- <code title="get /v1/reports/settlement/summary/{report_date}">client.reports.settlement.<a href="./src/resources/reports/settlement/settlement.ts">summary</a>(reportDate) -> SettlementReport</code>

### NetworkTotals

Methods:

- <code title="get /v1/reports/settlement/network_totals/{token}">client.reports.settlement.networkTotals.<a href="./src/resources/reports/settlement/network-totals.ts">retrieve</a>(token) -> NetworkTotal</code>
- <code title="get /v1/reports/settlement/network_totals">client.reports.settlement.networkTotals.<a href="./src/resources/reports/settlement/network-totals.ts">list</a>({ ...params }) -> NetworkTotalsCursorPage</code>

# CardPrograms

Types:

- <code><a href="./src/resources/card-programs.ts">CardProgram</a></code>

Methods:

- <code title="get /v1/card_programs/{card_program_token}">client.cardPrograms.<a href="./src/resources/card-programs.ts">retrieve</a>(cardProgramToken) -> CardProgram</code>
- <code title="get /v1/card_programs">client.cardPrograms.<a href="./src/resources/card-programs.ts">list</a>({ ...params }) -> CardProgramsCursorPage</code>

# DigitalCardArt

Types:

- <code><a href="./src/resources/digital-card-art.ts">DigitalCardArt</a></code>

Methods:

- <code title="get /v1/digital_card_art/{digital_card_art_token}">client.digitalCardArt.<a href="./src/resources/digital-card-art.ts">retrieve</a>(digitalCardArtToken) -> DigitalCardArt</code>
- <code title="get /v1/digital_card_art">client.digitalCardArt.<a href="./src/resources/digital-card-art.ts">list</a>({ ...params }) -> DigitalCardArtsCursorPage</code>

# BookTransfers

Types:

- <code><a href="./src/resources/book-transfers.ts">BookTransferResponse</a></code>

Methods:

- <code title="post /v1/book_transfers">client.bookTransfers.<a href="./src/resources/book-transfers.ts">create</a>({ ...params }) -> BookTransferResponse</code>
- <code title="get /v1/book_transfers/{book_transfer_token}">client.bookTransfers.<a href="./src/resources/book-transfers.ts">retrieve</a>(bookTransferToken) -> BookTransferResponse</code>
- <code title="get /v1/book_transfers">client.bookTransfers.<a href="./src/resources/book-transfers.ts">list</a>({ ...params }) -> BookTransferResponsesCursorPage</code>
- <code title="post /v1/book_transfers/{book_transfer_token}/retry">client.bookTransfers.<a href="./src/resources/book-transfers.ts">retry</a>(bookTransferToken, { ...params }) -> BookTransferResponse</code>
- <code title="post /v1/book_transfers/{book_transfer_token}/reverse">client.bookTransfers.<a href="./src/resources/book-transfers.ts">reverse</a>(bookTransferToken, { ...params }) -> BookTransferResponse</code>

# CreditProducts

## ExtendedCredit

Types:

- <code><a href="./src/resources/credit-products/extended-credit.ts">ExtendedCredit</a></code>

Methods:

- <code title="get /v1/credit_products/{credit_product_token}/extended_credit">client.creditProducts.extendedCredit.<a href="./src/resources/credit-products/extended-credit.ts">retrieve</a>(creditProductToken) -> ExtendedCredit</code>

## PrimeRates

Types:

- <code><a href="./src/resources/credit-products/prime-rates.ts">PrimeRateRetrieveResponse</a></code>

Methods:

- <code title="post /v1/credit_products/{credit_product_token}/prime_rates">client.creditProducts.primeRates.<a href="./src/resources/credit-products/prime-rates.ts">create</a>(creditProductToken, { ...params }) -> void</code>
- <code title="get /v1/credit_products/{credit_product_token}/prime_rates">client.creditProducts.primeRates.<a href="./src/resources/credit-products/prime-rates.ts">retrieve</a>(creditProductToken, { ...params }) -> PrimeRateRetrieveResponse</code>

# ExternalPayments

Types:

- <code><a href="./src/resources/external-payments.ts">ExternalPayment</a></code>

Methods:

- <code title="post /v1/external_payments">client.externalPayments.<a href="./src/resources/external-payments.ts">create</a>({ ...params }) -> ExternalPayment</code>
- <code title="get /v1/external_payments/{external_payment_token}">client.externalPayments.<a href="./src/resources/external-payments.ts">retrieve</a>(externalPaymentToken) -> ExternalPayment</code>
- <code title="get /v1/external_payments">client.externalPayments.<a href="./src/resources/external-payments.ts">list</a>({ ...params }) -> ExternalPaymentsCursorPage</code>
- <code title="post /v1/external_payments/{external_payment_token}/cancel">client.externalPayments.<a href="./src/resources/external-payments.ts">cancel</a>(externalPaymentToken, { ...params }) -> ExternalPayment</code>
- <code title="post /v1/external_payments/{external_payment_token}/release">client.externalPayments.<a href="./src/resources/external-payments.ts">release</a>(externalPaymentToken, { ...params }) -> ExternalPayment</code>
- <code title="post /v1/external_payments/{external_payment_token}/reverse">client.externalPayments.<a href="./src/resources/external-payments.ts">reverse</a>(externalPaymentToken, { ...params }) -> ExternalPayment</code>
- <code title="post /v1/external_payments/{external_payment_token}/settle">client.externalPayments.<a href="./src/resources/external-payments.ts">settle</a>(externalPaymentToken, { ...params }) -> ExternalPayment</code>

# ManagementOperations

Types:

- <code><a href="./src/resources/management-operations.ts">ExternalResource</a></code>
- <code><a href="./src/resources/management-operations.ts">ExternalResourceType</a></code>
- <code><a href="./src/resources/management-operations.ts">ManagementOperationTransaction</a></code>

Methods:

- <code title="post /v1/management_operations">client.managementOperations.<a href="./src/resources/management-operations.ts">create</a>({ ...params }) -> ManagementOperationTransaction</code>
- <code title="get /v1/management_operations/{management_operation_token}">client.managementOperations.<a href="./src/resources/management-operations.ts">retrieve</a>(managementOperationToken) -> ManagementOperationTransaction</code>
- <code title="get /v1/management_operations">client.managementOperations.<a href="./src/resources/management-operations.ts">list</a>({ ...params }) -> ManagementOperationTransactionsCursorPage</code>
- <code title="post /v1/management_operations/{management_operation_token}/reverse">client.managementOperations.<a href="./src/resources/management-operations.ts">reverse</a>(managementOperationToken, { ...params }) -> ManagementOperationTransaction</code>

# InternalTransaction

Types:

- <code><a href="./src/resources/internal-transaction.ts">InternalTransaction</a></code>

# FundingEvents

Types:

- <code><a href="./src/resources/funding-events.ts">FundingEvent</a></code>
- <code><a href="./src/resources/funding-events.ts">FundingEventRetrieveDetailsResponse</a></code>

Methods:

- <code title="get /v1/funding_events/{funding_event_token}">client.fundingEvents.<a href="./src/resources/funding-events.ts">retrieve</a>(fundingEventToken) -> FundingEvent</code>
- <code title="get /v1/funding_events">client.fundingEvents.<a href="./src/resources/funding-events.ts">list</a>({ ...params }) -> FundingEventsCursorPage</code>
- <code title="get /v1/funding_events/{funding_event_token}/details">client.fundingEvents.<a href="./src/resources/funding-events.ts">retrieveDetails</a>(fundingEventToken) -> FundingEventRetrieveDetailsResponse</code>

# Fraud

## Transactions

Types:

- <code><a href="./src/resources/fraud/transactions.ts">TransactionRetrieveResponse</a></code>
- <code><a href="./src/resources/fraud/transactions.ts">TransactionReportResponse</a></code>

Methods:

- <code title="get /v1/fraud/transactions/{transaction_token}">client.fraud.transactions.<a href="./src/resources/fraud/transactions.ts">retrieve</a>(transactionToken) -> TransactionRetrieveResponse</code>
- <code title="post /v1/fraud/transactions/{transaction_token}">client.fraud.transactions.<a href="./src/resources/fraud/transactions.ts">report</a>(transactionToken, { ...params }) -> TransactionReportResponse</code>

# NetworkPrograms

Types:

- <code><a href="./src/resources/network-programs.ts">NetworkProgram</a></code>

Methods:

- <code title="get /v1/network_programs/{network_program_token}">client.networkPrograms.<a href="./src/resources/network-programs.ts">retrieve</a>(networkProgramToken) -> NetworkProgram</code>
- <code title="get /v1/network_programs">client.networkPrograms.<a href="./src/resources/network-programs.ts">list</a>({ ...params }) -> NetworkProgramsSinglePage</code>

# AccountActivity

Types:

- <code><a href="./src/resources/account-activity.ts">WirePartyDetails</a></code>
- <code><a href="./src/resources/account-activity.ts">AccountActivityListResponse</a></code>
- <code><a href="./src/resources/account-activity.ts">AccountActivityRetrieveTransactionResponse</a></code>

Methods:

- <code title="get /v1/account_activity">client.accountActivity.<a href="./src/resources/account-activity.ts">list</a>({ ...params }) -> AccountActivityListResponsesCursorPage</code>
- <code title="get /v1/account_activity/{transaction_token}">client.accountActivity.<a href="./src/resources/account-activity.ts">retrieveTransaction</a>(transactionToken) -> AccountActivityRetrieveTransactionResponse</code>

# TransferLimits

Types:

- <code><a href="./src/resources/transfer-limits.ts">TransferLimitsResponse</a></code>

Methods:

- <code title="get /v1/transfer_limits">client.transferLimits.<a href="./src/resources/transfer-limits.ts">list</a>({ ...params }) -> TransferLimitsResponseDataSinglePage</code>

# Webhooks

Types:

- <code><a href="./src/resources/webhooks.ts">AccountHolderCreatedWebhookEvent</a></code>
- <code><a href="./src/resources/webhooks.ts">AccountHolderUpdatedWebhookEvent</a></code>
- <code><a href="./src/resources/webhooks.ts">AccountHolderVerificationWebhookEvent</a></code>
- <code><a href="./src/resources/webhooks.ts">AccountHolderDocumentUpdatedWebhookEvent</a></code>
- <code><a href="./src/resources/webhooks.ts">CardAuthorizationApprovalRequestWebhookEvent</a></code>
- <code><a href="./src/resources/webhooks.ts">TokenizationDecisioningRequestWebhookEvent</a></code>
- <code><a href="./src/resources/webhooks.ts">AuthRulesBacktestReportCreatedWebhookEvent</a></code>
- <code><a href="./src/resources/webhooks.ts">BalanceUpdatedWebhookEvent</a></code>
- <code><a href="./src/resources/webhooks.ts">BookTransferTransactionCreatedWebhookEvent</a></code>
- <code><a href="./src/resources/webhooks.ts">BookTransferTransactionUpdatedWebhookEvent</a></code>
- <code><a href="./src/resources/webhooks.ts">CardCreatedWebhookEvent</a></code>
- <code><a href="./src/resources/webhooks.ts">CardConvertedWebhookEvent</a></code>
- <code><a href="./src/resources/webhooks.ts">CardRenewedWebhookEvent</a></code>
- <code><a href="./src/resources/webhooks.ts">CardReissuedWebhookEvent</a></code>
- <code><a href="./src/resources/webhooks.ts">CardShippedWebhookEvent</a></code>
- <code><a href="./src/resources/webhooks.ts">CardUpdatedWebhookEvent</a></code>
- <code><a href="./src/resources/webhooks.ts">CardTransactionUpdatedWebhookEvent</a></code>
- <code><a href="./src/resources/webhooks.ts">CardTransactionEnhancedDataCreatedWebhookEvent</a></code>
- <code><a href="./src/resources/webhooks.ts">CardTransactionEnhancedDataUpdatedWebhookEvent</a></code>
- <code><a href="./src/resources/webhooks.ts">DigitalWalletTokenizationApprovalRequestWebhookEvent</a></code>
- <code><a href="./src/resources/webhooks.ts">DigitalWalletTokenizationResultWebhookEvent</a></code>
- <code><a href="./src/resources/webhooks.ts">DigitalWalletTokenizationTwoFactorAuthenticationCodeWebhookEvent</a></code>
- <code><a href="./src/resources/webhooks.ts">DigitalWalletTokenizationTwoFactorAuthenticationCodeSentWebhookEvent</a></code>
- <code><a href="./src/resources/webhooks.ts">DigitalWalletTokenizationUpdatedWebhookEvent</a></code>
- <code><a href="./src/resources/webhooks.ts">DisputeUpdatedWebhookEvent</a></code>
- <code><a href="./src/resources/webhooks.ts">DisputeEvidenceUploadFailedWebhookEvent</a></code>
- <code><a href="./src/resources/webhooks.ts">ExternalBankAccountCreatedWebhookEvent</a></code>
- <code><a href="./src/resources/webhooks.ts">ExternalBankAccountUpdatedWebhookEvent</a></code>
- <code><a href="./src/resources/webhooks.ts">ExternalPaymentCreatedWebhookEvent</a></code>
- <code><a href="./src/resources/webhooks.ts">ExternalPaymentUpdatedWebhookEvent</a></code>
- <code><a href="./src/resources/webhooks.ts">FinancialAccountCreatedWebhookEvent</a></code>
- <code><a href="./src/resources/webhooks.ts">FinancialAccountUpdatedWebhookEvent</a></code>
- <code><a href="./src/resources/webhooks.ts">FundingEventCreatedWebhookEvent</a></code>
- <code><a href="./src/resources/webhooks.ts">LoanTapeCreatedWebhookEvent</a></code>
- <code><a href="./src/resources/webhooks.ts">LoanTapeUpdatedWebhookEvent</a></code>
- <code><a href="./src/resources/webhooks.ts">ManagementOperationCreatedWebhookEvent</a></code>
- <code><a href="./src/resources/webhooks.ts">ManagementOperationUpdatedWebhookEvent</a></code>
- <code><a href="./src/resources/webhooks.ts">InternalTransactionCreatedWebhookEvent</a></code>
- <code><a href="./src/resources/webhooks.ts">InternalTransactionUpdatedWebhookEvent</a></code>
- <code><a href="./src/resources/webhooks.ts">NetworkTotalCreatedWebhookEvent</a></code>
- <code><a href="./src/resources/webhooks.ts">NetworkTotalUpdatedWebhookEvent</a></code>
- <code><a href="./src/resources/webhooks.ts">PaymentTransactionCreatedWebhookEvent</a></code>
- <code><a href="./src/resources/webhooks.ts">PaymentTransactionUpdatedWebhookEvent</a></code>
- <code><a href="./src/resources/webhooks.ts">SettlementReportUpdatedWebhookEvent</a></code>
- <code><a href="./src/resources/webhooks.ts">StatementsCreatedWebhookEvent</a></code>
- <code><a href="./src/resources/webhooks.ts">ThreeDSAuthenticationCreatedWebhookEvent</a></code>
- <code><a href="./src/resources/webhooks.ts">ThreeDSAuthenticationUpdatedWebhookEvent</a></code>
- <code><a href="./src/resources/webhooks.ts">ThreeDSAuthenticationChallengeWebhookEvent</a></code>
- <code><a href="./src/resources/webhooks.ts">TokenizationApprovalRequestWebhookEvent</a></code>
- <code><a href="./src/resources/webhooks.ts">TokenizationResultWebhookEvent</a></code>
- <code><a href="./src/resources/webhooks.ts">TokenizationTwoFactorAuthenticationCodeWebhookEvent</a></code>
- <code><a href="./src/resources/webhooks.ts">TokenizationTwoFactorAuthenticationCodeSentWebhookEvent</a></code>
- <code><a href="./src/resources/webhooks.ts">TokenizationUpdatedWebhookEvent</a></code>
- <code><a href="./src/resources/webhooks.ts">ThreeDSAuthenticationApprovalRequestWebhookEvent</a></code>
- <code><a href="./src/resources/webhooks.ts">DisputeTransactionCreatedWebhookEvent</a></code>
- <code><a href="./src/resources/webhooks.ts">DisputeTransactionUpdatedWebhookEvent</a></code>
- <code><a href="./src/resources/webhooks.ts">ParsedWebhookEvent</a></code>

Methods:

- <code>client.webhooks.<a href="./src/resources/webhooks.ts">parsed</a>(body) -> void</code>
