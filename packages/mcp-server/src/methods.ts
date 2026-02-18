// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { McpOptions } from './options';

export type SdkMethod = {
  clientCallName: string;
  fullyQualifiedName: string;
  httpMethod?: 'get' | 'post' | 'put' | 'patch' | 'delete' | 'query';
  httpPath?: string;
};

export const sdkMethods: SdkMethod[] = [
  {
    clientCallName: 'client.apiStatus',
    fullyQualifiedName: 'apiStatus',
    httpMethod: 'get',
    httpPath: '/v1/status',
  },
  {
    clientCallName: 'client.accounts.retrieve',
    fullyQualifiedName: 'accounts.retrieve',
    httpMethod: 'get',
    httpPath: '/v1/accounts/{account_token}',
  },
  {
    clientCallName: 'client.accounts.update',
    fullyQualifiedName: 'accounts.update',
    httpMethod: 'patch',
    httpPath: '/v1/accounts/{account_token}',
  },
  {
    clientCallName: 'client.accounts.list',
    fullyQualifiedName: 'accounts.list',
    httpMethod: 'get',
    httpPath: '/v1/accounts',
  },
  {
    clientCallName: 'client.accounts.retrieveSpendLimits',
    fullyQualifiedName: 'accounts.retrieveSpendLimits',
    httpMethod: 'get',
    httpPath: '/v1/accounts/{account_token}/spend_limits',
  },
  {
    clientCallName: 'client.accountHolders.create',
    fullyQualifiedName: 'accountHolders.create',
    httpMethod: 'post',
    httpPath: '/v1/account_holders',
  },
  {
    clientCallName: 'client.accountHolders.retrieve',
    fullyQualifiedName: 'accountHolders.retrieve',
    httpMethod: 'get',
    httpPath: '/v1/account_holders/{account_holder_token}',
  },
  {
    clientCallName: 'client.accountHolders.update',
    fullyQualifiedName: 'accountHolders.update',
    httpMethod: 'patch',
    httpPath: '/v1/account_holders/{account_holder_token}',
  },
  {
    clientCallName: 'client.accountHolders.list',
    fullyQualifiedName: 'accountHolders.list',
    httpMethod: 'get',
    httpPath: '/v1/account_holders',
  },
  {
    clientCallName: 'client.accountHolders.listDocuments',
    fullyQualifiedName: 'accountHolders.listDocuments',
    httpMethod: 'get',
    httpPath: '/v1/account_holders/{account_holder_token}/documents',
  },
  {
    clientCallName: 'client.accountHolders.retrieveDocument',
    fullyQualifiedName: 'accountHolders.retrieveDocument',
    httpMethod: 'get',
    httpPath: '/v1/account_holders/{account_holder_token}/documents/{document_token}',
  },
  {
    clientCallName: 'client.accountHolders.simulateEnrollmentDocumentReview',
    fullyQualifiedName: 'accountHolders.simulateEnrollmentDocumentReview',
    httpMethod: 'post',
    httpPath: '/v1/simulate/account_holders/enrollment_document_review',
  },
  {
    clientCallName: 'client.accountHolders.simulateEnrollmentReview',
    fullyQualifiedName: 'accountHolders.simulateEnrollmentReview',
    httpMethod: 'post',
    httpPath: '/v1/simulate/account_holders/enrollment_review',
  },
  {
    clientCallName: 'client.accountHolders.uploadDocument',
    fullyQualifiedName: 'accountHolders.uploadDocument',
    httpMethod: 'post',
    httpPath: '/v1/account_holders/{account_holder_token}/documents',
  },
  {
    clientCallName: 'client.authRules.v2.create',
    fullyQualifiedName: 'authRules.v2.create',
    httpMethod: 'post',
    httpPath: '/v2/auth_rules',
  },
  {
    clientCallName: 'client.authRules.v2.retrieve',
    fullyQualifiedName: 'authRules.v2.retrieve',
    httpMethod: 'get',
    httpPath: '/v2/auth_rules/{auth_rule_token}',
  },
  {
    clientCallName: 'client.authRules.v2.update',
    fullyQualifiedName: 'authRules.v2.update',
    httpMethod: 'patch',
    httpPath: '/v2/auth_rules/{auth_rule_token}',
  },
  {
    clientCallName: 'client.authRules.v2.list',
    fullyQualifiedName: 'authRules.v2.list',
    httpMethod: 'get',
    httpPath: '/v2/auth_rules',
  },
  {
    clientCallName: 'client.authRules.v2.delete',
    fullyQualifiedName: 'authRules.v2.delete',
    httpMethod: 'delete',
    httpPath: '/v2/auth_rules/{auth_rule_token}',
  },
  {
    clientCallName: 'client.authRules.v2.draft',
    fullyQualifiedName: 'authRules.v2.draft',
    httpMethod: 'post',
    httpPath: '/v2/auth_rules/{auth_rule_token}/draft',
  },
  {
    clientCallName: 'client.authRules.v2.listResults',
    fullyQualifiedName: 'authRules.v2.listResults',
    httpMethod: 'get',
    httpPath: '/v2/auth_rules/results',
  },
  {
    clientCallName: 'client.authRules.v2.promote',
    fullyQualifiedName: 'authRules.v2.promote',
    httpMethod: 'post',
    httpPath: '/v2/auth_rules/{auth_rule_token}/promote',
  },
  {
    clientCallName: 'client.authRules.v2.retrieveFeatures',
    fullyQualifiedName: 'authRules.v2.retrieveFeatures',
    httpMethod: 'get',
    httpPath: '/v2/auth_rules/{auth_rule_token}/features',
  },
  {
    clientCallName: 'client.authRules.v2.retrieveReport',
    fullyQualifiedName: 'authRules.v2.retrieveReport',
    httpMethod: 'get',
    httpPath: '/v2/auth_rules/{auth_rule_token}/report',
  },
  {
    clientCallName: 'client.authRules.v2.backtests.create',
    fullyQualifiedName: 'authRules.v2.backtests.create',
    httpMethod: 'post',
    httpPath: '/v2/auth_rules/{auth_rule_token}/backtests',
  },
  {
    clientCallName: 'client.authRules.v2.backtests.retrieve',
    fullyQualifiedName: 'authRules.v2.backtests.retrieve',
    httpMethod: 'get',
    httpPath: '/v2/auth_rules/{auth_rule_token}/backtests/{auth_rule_backtest_token}',
  },
  {
    clientCallName: 'client.authStreamEnrollment.retrieveSecret',
    fullyQualifiedName: 'authStreamEnrollment.retrieveSecret',
    httpMethod: 'get',
    httpPath: '/v1/auth_stream/secret',
  },
  {
    clientCallName: 'client.authStreamEnrollment.rotateSecret',
    fullyQualifiedName: 'authStreamEnrollment.rotateSecret',
    httpMethod: 'post',
    httpPath: '/v1/auth_stream/secret/rotate',
  },
  {
    clientCallName: 'client.tokenizationDecisioning.retrieveSecret',
    fullyQualifiedName: 'tokenizationDecisioning.retrieveSecret',
    httpMethod: 'get',
    httpPath: '/v1/tokenization_decisioning/secret',
  },
  {
    clientCallName: 'client.tokenizationDecisioning.rotateSecret',
    fullyQualifiedName: 'tokenizationDecisioning.rotateSecret',
    httpMethod: 'post',
    httpPath: '/v1/tokenization_decisioning/secret/rotate',
  },
  {
    clientCallName: 'client.tokenizations.retrieve',
    fullyQualifiedName: 'tokenizations.retrieve',
    httpMethod: 'get',
    httpPath: '/v1/tokenizations/{tokenization_token}',
  },
  {
    clientCallName: 'client.tokenizations.list',
    fullyQualifiedName: 'tokenizations.list',
    httpMethod: 'get',
    httpPath: '/v1/tokenizations',
  },
  {
    clientCallName: 'client.tokenizations.activate',
    fullyQualifiedName: 'tokenizations.activate',
    httpMethod: 'post',
    httpPath: '/v1/tokenizations/{tokenization_token}/activate',
  },
  {
    clientCallName: 'client.tokenizations.deactivate',
    fullyQualifiedName: 'tokenizations.deactivate',
    httpMethod: 'post',
    httpPath: '/v1/tokenizations/{tokenization_token}/deactivate',
  },
  {
    clientCallName: 'client.tokenizations.pause',
    fullyQualifiedName: 'tokenizations.pause',
    httpMethod: 'post',
    httpPath: '/v1/tokenizations/{tokenization_token}/pause',
  },
  {
    clientCallName: 'client.tokenizations.resendActivationCode',
    fullyQualifiedName: 'tokenizations.resendActivationCode',
    httpMethod: 'post',
    httpPath: '/v1/tokenizations/{tokenization_token}/resend_activation_code',
  },
  {
    clientCallName: 'client.tokenizations.simulate',
    fullyQualifiedName: 'tokenizations.simulate',
    httpMethod: 'post',
    httpPath: '/v1/simulate/tokenizations',
  },
  {
    clientCallName: 'client.tokenizations.unpause',
    fullyQualifiedName: 'tokenizations.unpause',
    httpMethod: 'post',
    httpPath: '/v1/tokenizations/{tokenization_token}/unpause',
  },
  {
    clientCallName: 'client.tokenizations.updateDigitalCardArt',
    fullyQualifiedName: 'tokenizations.updateDigitalCardArt',
    httpMethod: 'post',
    httpPath: '/v1/tokenizations/{tokenization_token}/update_digital_card_art',
  },
  {
    clientCallName: 'client.cards.create',
    fullyQualifiedName: 'cards.create',
    httpMethod: 'post',
    httpPath: '/v1/cards',
  },
  {
    clientCallName: 'client.cards.retrieve',
    fullyQualifiedName: 'cards.retrieve',
    httpMethod: 'get',
    httpPath: '/v1/cards/{card_token}',
  },
  {
    clientCallName: 'client.cards.update',
    fullyQualifiedName: 'cards.update',
    httpMethod: 'patch',
    httpPath: '/v1/cards/{card_token}',
  },
  {
    clientCallName: 'client.cards.list',
    fullyQualifiedName: 'cards.list',
    httpMethod: 'get',
    httpPath: '/v1/cards',
  },
  {
    clientCallName: 'client.cards.convertPhysical',
    fullyQualifiedName: 'cards.convertPhysical',
    httpMethod: 'post',
    httpPath: '/v1/cards/{card_token}/convert_physical',
  },
  {
    clientCallName: 'client.cards.embed',
    fullyQualifiedName: 'cards.embed',
    httpMethod: 'get',
    httpPath: '/v1/embed/card',
  },
  {
    clientCallName: 'client.cards.provision',
    fullyQualifiedName: 'cards.provision',
    httpMethod: 'post',
    httpPath: '/v1/cards/{card_token}/provision',
  },
  {
    clientCallName: 'client.cards.reissue',
    fullyQualifiedName: 'cards.reissue',
    httpMethod: 'post',
    httpPath: '/v1/cards/{card_token}/reissue',
  },
  {
    clientCallName: 'client.cards.renew',
    fullyQualifiedName: 'cards.renew',
    httpMethod: 'post',
    httpPath: '/v1/cards/{card_token}/renew',
  },
  {
    clientCallName: 'client.cards.retrieveSpendLimits',
    fullyQualifiedName: 'cards.retrieveSpendLimits',
    httpMethod: 'get',
    httpPath: '/v1/cards/{card_token}/spend_limits',
  },
  {
    clientCallName: 'client.cards.searchByPan',
    fullyQualifiedName: 'cards.searchByPan',
    httpMethod: 'post',
    httpPath: '/v1/cards/search_by_pan',
  },
  {
    clientCallName: 'client.cards.webProvision',
    fullyQualifiedName: 'cards.webProvision',
    httpMethod: 'post',
    httpPath: '/v1/cards/{card_token}/web_provision',
  },
  {
    clientCallName: 'client.cards.balances.list',
    fullyQualifiedName: 'cards.balances.list',
    httpMethod: 'get',
    httpPath: '/v1/cards/{card_token}/balances',
  },
  {
    clientCallName: 'client.cards.financialTransactions.retrieve',
    fullyQualifiedName: 'cards.financialTransactions.retrieve',
    httpMethod: 'get',
    httpPath: '/v1/cards/{card_token}/financial_transactions/{financial_transaction_token}',
  },
  {
    clientCallName: 'client.cards.financialTransactions.list',
    fullyQualifiedName: 'cards.financialTransactions.list',
    httpMethod: 'get',
    httpPath: '/v1/cards/{card_token}/financial_transactions',
  },
  {
    clientCallName: 'client.cardBulkOrders.create',
    fullyQualifiedName: 'cardBulkOrders.create',
    httpMethod: 'post',
    httpPath: '/v1/card_bulk_orders',
  },
  {
    clientCallName: 'client.cardBulkOrders.retrieve',
    fullyQualifiedName: 'cardBulkOrders.retrieve',
    httpMethod: 'get',
    httpPath: '/v1/card_bulk_orders/{bulk_order_token}',
  },
  {
    clientCallName: 'client.cardBulkOrders.update',
    fullyQualifiedName: 'cardBulkOrders.update',
    httpMethod: 'patch',
    httpPath: '/v1/card_bulk_orders/{bulk_order_token}',
  },
  {
    clientCallName: 'client.cardBulkOrders.list',
    fullyQualifiedName: 'cardBulkOrders.list',
    httpMethod: 'get',
    httpPath: '/v1/card_bulk_orders',
  },
  {
    clientCallName: 'client.balances.list',
    fullyQualifiedName: 'balances.list',
    httpMethod: 'get',
    httpPath: '/v1/balances',
  },
  {
    clientCallName: 'client.disputes.create',
    fullyQualifiedName: 'disputes.create',
    httpMethod: 'post',
    httpPath: '/v1/disputes',
  },
  {
    clientCallName: 'client.disputes.retrieve',
    fullyQualifiedName: 'disputes.retrieve',
    httpMethod: 'get',
    httpPath: '/v1/disputes/{dispute_token}',
  },
  {
    clientCallName: 'client.disputes.update',
    fullyQualifiedName: 'disputes.update',
    httpMethod: 'patch',
    httpPath: '/v1/disputes/{dispute_token}',
  },
  {
    clientCallName: 'client.disputes.list',
    fullyQualifiedName: 'disputes.list',
    httpMethod: 'get',
    httpPath: '/v1/disputes',
  },
  {
    clientCallName: 'client.disputes.delete',
    fullyQualifiedName: 'disputes.delete',
    httpMethod: 'delete',
    httpPath: '/v1/disputes/{dispute_token}',
  },
  {
    clientCallName: 'client.disputes.deleteEvidence',
    fullyQualifiedName: 'disputes.deleteEvidence',
    httpMethod: 'delete',
    httpPath: '/v1/disputes/{dispute_token}/evidences/{evidence_token}',
  },
  {
    clientCallName: 'client.disputes.initiateEvidenceUpload',
    fullyQualifiedName: 'disputes.initiateEvidenceUpload',
    httpMethod: 'post',
    httpPath: '/v1/disputes/{dispute_token}/evidences',
  },
  {
    clientCallName: 'client.disputes.listEvidences',
    fullyQualifiedName: 'disputes.listEvidences',
    httpMethod: 'get',
    httpPath: '/v1/disputes/{dispute_token}/evidences',
  },
  {
    clientCallName: 'client.disputes.retrieveEvidence',
    fullyQualifiedName: 'disputes.retrieveEvidence',
    httpMethod: 'get',
    httpPath: '/v1/disputes/{dispute_token}/evidences/{evidence_token}',
  },
  {
    clientCallName: 'client.disputesV2.retrieve',
    fullyQualifiedName: 'disputesV2.retrieve',
    httpMethod: 'get',
    httpPath: '/v2/disputes/{dispute_token}',
  },
  {
    clientCallName: 'client.disputesV2.list',
    fullyQualifiedName: 'disputesV2.list',
    httpMethod: 'get',
    httpPath: '/v2/disputes',
  },
  {
    clientCallName: 'client.events.retrieve',
    fullyQualifiedName: 'events.retrieve',
    httpMethod: 'get',
    httpPath: '/v1/events/{event_token}',
  },
  {
    clientCallName: 'client.events.list',
    fullyQualifiedName: 'events.list',
    httpMethod: 'get',
    httpPath: '/v1/events',
  },
  {
    clientCallName: 'client.events.listAttempts',
    fullyQualifiedName: 'events.listAttempts',
    httpMethod: 'get',
    httpPath: '/v1/events/{event_token}/attempts',
  },
  {
    clientCallName: 'client.events.subscriptions.create',
    fullyQualifiedName: 'events.subscriptions.create',
    httpMethod: 'post',
    httpPath: '/v1/event_subscriptions',
  },
  {
    clientCallName: 'client.events.subscriptions.retrieve',
    fullyQualifiedName: 'events.subscriptions.retrieve',
    httpMethod: 'get',
    httpPath: '/v1/event_subscriptions/{event_subscription_token}',
  },
  {
    clientCallName: 'client.events.subscriptions.update',
    fullyQualifiedName: 'events.subscriptions.update',
    httpMethod: 'patch',
    httpPath: '/v1/event_subscriptions/{event_subscription_token}',
  },
  {
    clientCallName: 'client.events.subscriptions.list',
    fullyQualifiedName: 'events.subscriptions.list',
    httpMethod: 'get',
    httpPath: '/v1/event_subscriptions',
  },
  {
    clientCallName: 'client.events.subscriptions.delete',
    fullyQualifiedName: 'events.subscriptions.delete',
    httpMethod: 'delete',
    httpPath: '/v1/event_subscriptions/{event_subscription_token}',
  },
  {
    clientCallName: 'client.events.subscriptions.listAttempts',
    fullyQualifiedName: 'events.subscriptions.listAttempts',
    httpMethod: 'get',
    httpPath: '/v1/event_subscriptions/{event_subscription_token}/attempts',
  },
  {
    clientCallName: 'client.events.subscriptions.recover',
    fullyQualifiedName: 'events.subscriptions.recover',
    httpMethod: 'post',
    httpPath: '/v1/event_subscriptions/{event_subscription_token}/recover',
  },
  {
    clientCallName: 'client.events.subscriptions.replayMissing',
    fullyQualifiedName: 'events.subscriptions.replayMissing',
    httpMethod: 'post',
    httpPath: '/v1/event_subscriptions/{event_subscription_token}/replay_missing',
  },
  {
    clientCallName: 'client.events.subscriptions.retrieveSecret',
    fullyQualifiedName: 'events.subscriptions.retrieveSecret',
    httpMethod: 'get',
    httpPath: '/v1/event_subscriptions/{event_subscription_token}/secret',
  },
  {
    clientCallName: 'client.events.subscriptions.rotateSecret',
    fullyQualifiedName: 'events.subscriptions.rotateSecret',
    httpMethod: 'post',
    httpPath: '/v1/event_subscriptions/{event_subscription_token}/secret/rotate',
  },
  {
    clientCallName: 'client.events.subscriptions.sendSimulatedExample',
    fullyQualifiedName: 'events.subscriptions.sendSimulatedExample',
    httpMethod: 'post',
    httpPath: '/v1/simulate/event_subscriptions/{event_subscription_token}/send_example',
  },
  {
    clientCallName: 'client.events.eventSubscriptions.resend',
    fullyQualifiedName: 'events.eventSubscriptions.resend',
    httpMethod: 'post',
    httpPath: '/v1/events/{event_token}/event_subscriptions/{event_subscription_token}/resend',
  },
  {
    clientCallName: 'client.transfers.create',
    fullyQualifiedName: 'transfers.create',
    httpMethod: 'post',
    httpPath: '/v1/transfer',
  },
  {
    clientCallName: 'client.financialAccounts.create',
    fullyQualifiedName: 'financialAccounts.create',
    httpMethod: 'post',
    httpPath: '/v1/financial_accounts',
  },
  {
    clientCallName: 'client.financialAccounts.retrieve',
    fullyQualifiedName: 'financialAccounts.retrieve',
    httpMethod: 'get',
    httpPath: '/v1/financial_accounts/{financial_account_token}',
  },
  {
    clientCallName: 'client.financialAccounts.update',
    fullyQualifiedName: 'financialAccounts.update',
    httpMethod: 'patch',
    httpPath: '/v1/financial_accounts/{financial_account_token}',
  },
  {
    clientCallName: 'client.financialAccounts.list',
    fullyQualifiedName: 'financialAccounts.list',
    httpMethod: 'get',
    httpPath: '/v1/financial_accounts',
  },
  {
    clientCallName: 'client.financialAccounts.registerAccountNumber',
    fullyQualifiedName: 'financialAccounts.registerAccountNumber',
    httpMethod: 'post',
    httpPath: '/v1/financial_accounts/{financial_account_token}/register_account_number',
  },
  {
    clientCallName: 'client.financialAccounts.updateStatus',
    fullyQualifiedName: 'financialAccounts.updateStatus',
    httpMethod: 'post',
    httpPath: '/v1/financial_accounts/{financial_account_token}/update_status',
  },
  {
    clientCallName: 'client.financialAccounts.balances.list',
    fullyQualifiedName: 'financialAccounts.balances.list',
    httpMethod: 'get',
    httpPath: '/v1/financial_accounts/{financial_account_token}/balances',
  },
  {
    clientCallName: 'client.financialAccounts.financialTransactions.retrieve',
    fullyQualifiedName: 'financialAccounts.financialTransactions.retrieve',
    httpMethod: 'get',
    httpPath:
      '/v1/financial_accounts/{financial_account_token}/financial_transactions/{financial_transaction_token}',
  },
  {
    clientCallName: 'client.financialAccounts.financialTransactions.list',
    fullyQualifiedName: 'financialAccounts.financialTransactions.list',
    httpMethod: 'get',
    httpPath: '/v1/financial_accounts/{financial_account_token}/financial_transactions',
  },
  {
    clientCallName: 'client.financialAccounts.creditConfiguration.retrieve',
    fullyQualifiedName: 'financialAccounts.creditConfiguration.retrieve',
    httpMethod: 'get',
    httpPath: '/v1/financial_accounts/{financial_account_token}/credit_configuration',
  },
  {
    clientCallName: 'client.financialAccounts.creditConfiguration.update',
    fullyQualifiedName: 'financialAccounts.creditConfiguration.update',
    httpMethod: 'patch',
    httpPath: '/v1/financial_accounts/{financial_account_token}/credit_configuration',
  },
  {
    clientCallName: 'client.financialAccounts.statements.retrieve',
    fullyQualifiedName: 'financialAccounts.statements.retrieve',
    httpMethod: 'get',
    httpPath: '/v1/financial_accounts/{financial_account_token}/statements/{statement_token}',
  },
  {
    clientCallName: 'client.financialAccounts.statements.list',
    fullyQualifiedName: 'financialAccounts.statements.list',
    httpMethod: 'get',
    httpPath: '/v1/financial_accounts/{financial_account_token}/statements',
  },
  {
    clientCallName: 'client.financialAccounts.statements.lineItems.list',
    fullyQualifiedName: 'financialAccounts.statements.lineItems.list',
    httpMethod: 'get',
    httpPath: '/v1/financial_accounts/{financial_account_token}/statements/{statement_token}/line_items',
  },
  {
    clientCallName: 'client.financialAccounts.loanTapes.retrieve',
    fullyQualifiedName: 'financialAccounts.loanTapes.retrieve',
    httpMethod: 'get',
    httpPath: '/v1/financial_accounts/{financial_account_token}/loan_tapes/{loan_tape_token}',
  },
  {
    clientCallName: 'client.financialAccounts.loanTapes.list',
    fullyQualifiedName: 'financialAccounts.loanTapes.list',
    httpMethod: 'get',
    httpPath: '/v1/financial_accounts/{financial_account_token}/loan_tapes',
  },
  {
    clientCallName: 'client.transactions.retrieve',
    fullyQualifiedName: 'transactions.retrieve',
    httpMethod: 'get',
    httpPath: '/v1/transactions/{transaction_token}',
  },
  {
    clientCallName: 'client.transactions.list',
    fullyQualifiedName: 'transactions.list',
    httpMethod: 'get',
    httpPath: '/v1/transactions',
  },
  {
    clientCallName: 'client.transactions.expireAuthorization',
    fullyQualifiedName: 'transactions.expireAuthorization',
    httpMethod: 'post',
    httpPath: '/v1/transactions/{transaction_token}/expire_authorization',
  },
  {
    clientCallName: 'client.transactions.simulateAuthorization',
    fullyQualifiedName: 'transactions.simulateAuthorization',
    httpMethod: 'post',
    httpPath: '/v1/simulate/authorize',
  },
  {
    clientCallName: 'client.transactions.simulateAuthorizationAdvice',
    fullyQualifiedName: 'transactions.simulateAuthorizationAdvice',
    httpMethod: 'post',
    httpPath: '/v1/simulate/authorization_advice',
  },
  {
    clientCallName: 'client.transactions.simulateClearing',
    fullyQualifiedName: 'transactions.simulateClearing',
    httpMethod: 'post',
    httpPath: '/v1/simulate/clearing',
  },
  {
    clientCallName: 'client.transactions.simulateCreditAuthorization',
    fullyQualifiedName: 'transactions.simulateCreditAuthorization',
    httpMethod: 'post',
    httpPath: '/v1/simulate/credit_authorization_advice',
  },
  {
    clientCallName: 'client.transactions.simulateCreditAuthorizationAdvice',
    fullyQualifiedName: 'transactions.simulateCreditAuthorizationAdvice',
    httpMethod: 'post',
    httpPath: '/v1/simulate/credit_authorization_advice',
  },
  {
    clientCallName: 'client.transactions.simulateReturn',
    fullyQualifiedName: 'transactions.simulateReturn',
    httpMethod: 'post',
    httpPath: '/v1/simulate/return',
  },
  {
    clientCallName: 'client.transactions.simulateReturnReversal',
    fullyQualifiedName: 'transactions.simulateReturnReversal',
    httpMethod: 'post',
    httpPath: '/v1/simulate/return_reversal',
  },
  {
    clientCallName: 'client.transactions.simulateVoid',
    fullyQualifiedName: 'transactions.simulateVoid',
    httpMethod: 'post',
    httpPath: '/v1/simulate/void',
  },
  {
    clientCallName: 'client.transactions.enhancedCommercialData.retrieve',
    fullyQualifiedName: 'transactions.enhancedCommercialData.retrieve',
    httpMethod: 'get',
    httpPath: '/v1/transactions/{transaction_token}/enhanced_commercial_data',
  },
  {
    clientCallName: 'client.transactions.events.enhancedCommercialData.retrieve',
    fullyQualifiedName: 'transactions.events.enhancedCommercialData.retrieve',
    httpMethod: 'get',
    httpPath: '/v1/transactions/events/{event_token}/enhanced_commercial_data',
  },
  {
    clientCallName: 'client.responderEndpoints.create',
    fullyQualifiedName: 'responderEndpoints.create',
    httpMethod: 'post',
    httpPath: '/v1/responder_endpoints',
  },
  {
    clientCallName: 'client.responderEndpoints.delete',
    fullyQualifiedName: 'responderEndpoints.delete',
    httpMethod: 'delete',
    httpPath: '/v1/responder_endpoints',
  },
  {
    clientCallName: 'client.responderEndpoints.checkStatus',
    fullyQualifiedName: 'responderEndpoints.checkStatus',
    httpMethod: 'get',
    httpPath: '/v1/responder_endpoints',
  },
  {
    clientCallName: 'client.externalBankAccounts.create',
    fullyQualifiedName: 'externalBankAccounts.create',
    httpMethod: 'post',
    httpPath: '/v1/external_bank_accounts',
  },
  {
    clientCallName: 'client.externalBankAccounts.retrieve',
    fullyQualifiedName: 'externalBankAccounts.retrieve',
    httpMethod: 'get',
    httpPath: '/v1/external_bank_accounts/{external_bank_account_token}',
  },
  {
    clientCallName: 'client.externalBankAccounts.update',
    fullyQualifiedName: 'externalBankAccounts.update',
    httpMethod: 'patch',
    httpPath: '/v1/external_bank_accounts/{external_bank_account_token}',
  },
  {
    clientCallName: 'client.externalBankAccounts.list',
    fullyQualifiedName: 'externalBankAccounts.list',
    httpMethod: 'get',
    httpPath: '/v1/external_bank_accounts',
  },
  {
    clientCallName: 'client.externalBankAccounts.retryMicroDeposits',
    fullyQualifiedName: 'externalBankAccounts.retryMicroDeposits',
    httpMethod: 'post',
    httpPath: '/v1/external_bank_accounts/{external_bank_account_token}/retry_micro_deposits',
  },
  {
    clientCallName: 'client.externalBankAccounts.retryPrenote',
    fullyQualifiedName: 'externalBankAccounts.retryPrenote',
    httpMethod: 'post',
    httpPath: '/v1/external_bank_accounts/{external_bank_account_token}/retry_prenote',
  },
  {
    clientCallName: 'client.externalBankAccounts.unpause',
    fullyQualifiedName: 'externalBankAccounts.unpause',
    httpMethod: 'post',
    httpPath: '/v1/external_bank_accounts/{external_bank_account_token}/unpause',
  },
  {
    clientCallName: 'client.externalBankAccounts.microDeposits.create',
    fullyQualifiedName: 'externalBankAccounts.microDeposits.create',
    httpMethod: 'post',
    httpPath: '/v1/external_bank_accounts/{external_bank_account_token}/micro_deposits',
  },
  {
    clientCallName: 'client.payments.create',
    fullyQualifiedName: 'payments.create',
    httpMethod: 'post',
    httpPath: '/v1/payments',
  },
  {
    clientCallName: 'client.payments.retrieve',
    fullyQualifiedName: 'payments.retrieve',
    httpMethod: 'get',
    httpPath: '/v1/payments/{payment_token}',
  },
  {
    clientCallName: 'client.payments.list',
    fullyQualifiedName: 'payments.list',
    httpMethod: 'get',
    httpPath: '/v1/payments',
  },
  {
    clientCallName: 'client.payments.retry',
    fullyQualifiedName: 'payments.retry',
    httpMethod: 'post',
    httpPath: '/v1/payments/{payment_token}/retry',
  },
  {
    clientCallName: 'client.payments.return',
    fullyQualifiedName: 'payments.return',
    httpMethod: 'post',
    httpPath: '/v1/payments/{payment_token}/return',
  },
  {
    clientCallName: 'client.payments.simulateAction',
    fullyQualifiedName: 'payments.simulateAction',
    httpMethod: 'post',
    httpPath: '/v1/simulate/payments/{payment_token}/action',
  },
  {
    clientCallName: 'client.payments.simulateReceipt',
    fullyQualifiedName: 'payments.simulateReceipt',
    httpMethod: 'post',
    httpPath: '/v1/simulate/payments/receipt',
  },
  {
    clientCallName: 'client.payments.simulateRelease',
    fullyQualifiedName: 'payments.simulateRelease',
    httpMethod: 'post',
    httpPath: '/v1/simulate/payments/release',
  },
  {
    clientCallName: 'client.payments.simulateReturn',
    fullyQualifiedName: 'payments.simulateReturn',
    httpMethod: 'post',
    httpPath: '/v1/simulate/payments/return',
  },
  {
    clientCallName: 'client.threeDS.authentication.retrieve',
    fullyQualifiedName: 'threeDS.authentication.retrieve',
    httpMethod: 'get',
    httpPath: '/v1/three_ds_authentication/{three_ds_authentication_token}',
  },
  {
    clientCallName: 'client.threeDS.authentication.simulate',
    fullyQualifiedName: 'threeDS.authentication.simulate',
    httpMethod: 'post',
    httpPath: '/v1/three_ds_authentication/simulate',
  },
  {
    clientCallName: 'client.threeDS.authentication.simulateOtpEntry',
    fullyQualifiedName: 'threeDS.authentication.simulateOtpEntry',
    httpMethod: 'post',
    httpPath: '/v1/three_ds_decisioning/simulate/enter_otp',
  },
  {
    clientCallName: 'client.threeDS.decisioning.challengeResponse',
    fullyQualifiedName: 'threeDS.decisioning.challengeResponse',
    httpMethod: 'post',
    httpPath: '/v1/three_ds_decisioning/challenge_response',
  },
  {
    clientCallName: 'client.threeDS.decisioning.retrieveSecret',
    fullyQualifiedName: 'threeDS.decisioning.retrieveSecret',
    httpMethod: 'get',
    httpPath: '/v1/three_ds_decisioning/secret',
  },
  {
    clientCallName: 'client.threeDS.decisioning.rotateSecret',
    fullyQualifiedName: 'threeDS.decisioning.rotateSecret',
    httpMethod: 'post',
    httpPath: '/v1/three_ds_decisioning/secret/rotate',
  },
  {
    clientCallName: 'client.reports.settlement.listDetails',
    fullyQualifiedName: 'reports.settlement.listDetails',
    httpMethod: 'get',
    httpPath: '/v1/reports/settlement/details/{report_date}',
  },
  {
    clientCallName: 'client.reports.settlement.summary',
    fullyQualifiedName: 'reports.settlement.summary',
    httpMethod: 'get',
    httpPath: '/v1/reports/settlement/summary/{report_date}',
  },
  {
    clientCallName: 'client.reports.settlement.networkTotals.retrieve',
    fullyQualifiedName: 'reports.settlement.networkTotals.retrieve',
    httpMethod: 'get',
    httpPath: '/v1/reports/settlement/network_totals/{token}',
  },
  {
    clientCallName: 'client.reports.settlement.networkTotals.list',
    fullyQualifiedName: 'reports.settlement.networkTotals.list',
    httpMethod: 'get',
    httpPath: '/v1/reports/settlement/network_totals',
  },
  {
    clientCallName: 'client.cardPrograms.retrieve',
    fullyQualifiedName: 'cardPrograms.retrieve',
    httpMethod: 'get',
    httpPath: '/v1/card_programs/{card_program_token}',
  },
  {
    clientCallName: 'client.cardPrograms.list',
    fullyQualifiedName: 'cardPrograms.list',
    httpMethod: 'get',
    httpPath: '/v1/card_programs',
  },
  {
    clientCallName: 'client.digitalCardArt.retrieve',
    fullyQualifiedName: 'digitalCardArt.retrieve',
    httpMethod: 'get',
    httpPath: '/v1/digital_card_art/{digital_card_art_token}',
  },
  {
    clientCallName: 'client.digitalCardArt.list',
    fullyQualifiedName: 'digitalCardArt.list',
    httpMethod: 'get',
    httpPath: '/v1/digital_card_art',
  },
  {
    clientCallName: 'client.bookTransfers.create',
    fullyQualifiedName: 'bookTransfers.create',
    httpMethod: 'post',
    httpPath: '/v1/book_transfers',
  },
  {
    clientCallName: 'client.bookTransfers.retrieve',
    fullyQualifiedName: 'bookTransfers.retrieve',
    httpMethod: 'get',
    httpPath: '/v1/book_transfers/{book_transfer_token}',
  },
  {
    clientCallName: 'client.bookTransfers.list',
    fullyQualifiedName: 'bookTransfers.list',
    httpMethod: 'get',
    httpPath: '/v1/book_transfers',
  },
  {
    clientCallName: 'client.bookTransfers.retry',
    fullyQualifiedName: 'bookTransfers.retry',
    httpMethod: 'post',
    httpPath: '/v1/book_transfers/{book_transfer_token}/retry',
  },
  {
    clientCallName: 'client.bookTransfers.reverse',
    fullyQualifiedName: 'bookTransfers.reverse',
    httpMethod: 'post',
    httpPath: '/v1/book_transfers/{book_transfer_token}/reverse',
  },
  {
    clientCallName: 'client.creditProducts.extendedCredit.retrieve',
    fullyQualifiedName: 'creditProducts.extendedCredit.retrieve',
    httpMethod: 'get',
    httpPath: '/v1/credit_products/{credit_product_token}/extended_credit',
  },
  {
    clientCallName: 'client.creditProducts.primeRates.create',
    fullyQualifiedName: 'creditProducts.primeRates.create',
    httpMethod: 'post',
    httpPath: '/v1/credit_products/{credit_product_token}/prime_rates',
  },
  {
    clientCallName: 'client.creditProducts.primeRates.retrieve',
    fullyQualifiedName: 'creditProducts.primeRates.retrieve',
    httpMethod: 'get',
    httpPath: '/v1/credit_products/{credit_product_token}/prime_rates',
  },
  {
    clientCallName: 'client.externalPayments.create',
    fullyQualifiedName: 'externalPayments.create',
    httpMethod: 'post',
    httpPath: '/v1/external_payments',
  },
  {
    clientCallName: 'client.externalPayments.retrieve',
    fullyQualifiedName: 'externalPayments.retrieve',
    httpMethod: 'get',
    httpPath: '/v1/external_payments/{external_payment_token}',
  },
  {
    clientCallName: 'client.externalPayments.list',
    fullyQualifiedName: 'externalPayments.list',
    httpMethod: 'get',
    httpPath: '/v1/external_payments',
  },
  {
    clientCallName: 'client.externalPayments.cancel',
    fullyQualifiedName: 'externalPayments.cancel',
    httpMethod: 'post',
    httpPath: '/v1/external_payments/{external_payment_token}/cancel',
  },
  {
    clientCallName: 'client.externalPayments.release',
    fullyQualifiedName: 'externalPayments.release',
    httpMethod: 'post',
    httpPath: '/v1/external_payments/{external_payment_token}/release',
  },
  {
    clientCallName: 'client.externalPayments.reverse',
    fullyQualifiedName: 'externalPayments.reverse',
    httpMethod: 'post',
    httpPath: '/v1/external_payments/{external_payment_token}/reverse',
  },
  {
    clientCallName: 'client.externalPayments.settle',
    fullyQualifiedName: 'externalPayments.settle',
    httpMethod: 'post',
    httpPath: '/v1/external_payments/{external_payment_token}/settle',
  },
  {
    clientCallName: 'client.managementOperations.create',
    fullyQualifiedName: 'managementOperations.create',
    httpMethod: 'post',
    httpPath: '/v1/management_operations',
  },
  {
    clientCallName: 'client.managementOperations.retrieve',
    fullyQualifiedName: 'managementOperations.retrieve',
    httpMethod: 'get',
    httpPath: '/v1/management_operations/{management_operation_token}',
  },
  {
    clientCallName: 'client.managementOperations.list',
    fullyQualifiedName: 'managementOperations.list',
    httpMethod: 'get',
    httpPath: '/v1/management_operations',
  },
  {
    clientCallName: 'client.managementOperations.reverse',
    fullyQualifiedName: 'managementOperations.reverse',
    httpMethod: 'post',
    httpPath: '/v1/management_operations/{management_operation_token}/reverse',
  },
  {
    clientCallName: 'client.fundingEvents.retrieve',
    fullyQualifiedName: 'fundingEvents.retrieve',
    httpMethod: 'get',
    httpPath: '/v1/funding_events/{funding_event_token}',
  },
  {
    clientCallName: 'client.fundingEvents.list',
    fullyQualifiedName: 'fundingEvents.list',
    httpMethod: 'get',
    httpPath: '/v1/funding_events',
  },
  {
    clientCallName: 'client.fundingEvents.retrieveDetails',
    fullyQualifiedName: 'fundingEvents.retrieveDetails',
    httpMethod: 'get',
    httpPath: '/v1/funding_events/{funding_event_token}/details',
  },
  {
    clientCallName: 'client.fraud.transactions.retrieve',
    fullyQualifiedName: 'fraud.transactions.retrieve',
    httpMethod: 'get',
    httpPath: '/v1/fraud/transactions/{transaction_token}',
  },
  {
    clientCallName: 'client.fraud.transactions.report',
    fullyQualifiedName: 'fraud.transactions.report',
    httpMethod: 'post',
    httpPath: '/v1/fraud/transactions/{transaction_token}',
  },
  {
    clientCallName: 'client.networkPrograms.retrieve',
    fullyQualifiedName: 'networkPrograms.retrieve',
    httpMethod: 'get',
    httpPath: '/v1/network_programs/{network_program_token}',
  },
  {
    clientCallName: 'client.networkPrograms.list',
    fullyQualifiedName: 'networkPrograms.list',
    httpMethod: 'get',
    httpPath: '/v1/network_programs',
  },
  {
    clientCallName: 'client.accountActivity.list',
    fullyQualifiedName: 'accountActivity.list',
    httpMethod: 'get',
    httpPath: '/v1/account_activity',
  },
  {
    clientCallName: 'client.accountActivity.retrieveTransaction',
    fullyQualifiedName: 'accountActivity.retrieveTransaction',
    httpMethod: 'get',
    httpPath: '/v1/account_activity/{transaction_token}',
  },
  {
    clientCallName: 'client.transferLimits.list',
    fullyQualifiedName: 'transferLimits.list',
    httpMethod: 'get',
    httpPath: '/v1/transfer_limits',
  },
  { clientCallName: 'client.webhooks.parsed', fullyQualifiedName: 'webhooks.parsed' },
];

function allowedMethodsForCodeTool(options: McpOptions | undefined): SdkMethod[] | undefined {
  if (!options) {
    return undefined;
  }

  let allowedMethods: SdkMethod[];

  if (options.codeAllowHttpGets || options.codeAllowedMethods) {
    // Start with nothing allowed and then add into it from options
    let allowedMethodsSet = new Set<SdkMethod>();

    if (options.codeAllowHttpGets) {
      // Add all methods that map to an HTTP GET
      sdkMethods
        .filter((method) => method.httpMethod === 'get')
        .forEach((method) => allowedMethodsSet.add(method));
    }

    if (options.codeAllowedMethods) {
      // Add all methods that match any of the allowed regexps
      const allowedRegexps = options.codeAllowedMethods.map((pattern) => {
        try {
          return new RegExp(pattern);
        } catch (e) {
          throw new Error(
            `Invalid regex pattern for allowed method: "${pattern}": ${e instanceof Error ? e.message : e}`,
          );
        }
      });

      sdkMethods
        .filter((method) => allowedRegexps.some((regexp) => regexp.test(method.fullyQualifiedName)))
        .forEach((method) => allowedMethodsSet.add(method));
    }

    allowedMethods = Array.from(allowedMethodsSet);
  } else {
    // Start with everything allowed
    allowedMethods = [...sdkMethods];
  }

  if (options.codeBlockedMethods) {
    // Filter down based on blocked regexps
    const blockedRegexps = options.codeBlockedMethods.map((pattern) => {
      try {
        return new RegExp(pattern);
      } catch (e) {
        throw new Error(
          `Invalid regex pattern for blocked method: "${pattern}": ${e instanceof Error ? e.message : e}`,
        );
      }
    });

    allowedMethods = allowedMethods.filter(
      (method) => !blockedRegexps.some((regexp) => regexp.test(method.fullyQualifiedName)),
    );
  }

  return allowedMethods;
}

export function blockedMethodsForCodeTool(options: McpOptions | undefined): SdkMethod[] | undefined {
  const allowedMethods = allowedMethodsForCodeTool(options);
  if (!allowedMethods) {
    return undefined;
  }

  const allowedSet = new Set(allowedMethods.map((method) => method.fullyQualifiedName));

  // Return any methods that are not explicitly allowed
  return sdkMethods.filter((method) => !allowedSet.has(method.fullyQualifiedName));
}
