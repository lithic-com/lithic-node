// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import MiniSearch from 'minisearch';
import * as fs from 'node:fs/promises';
import * as path from 'node:path';
import { getLogger } from './logger';

type PerLanguageData = {
  method?: string;
  example?: string;
};

type MethodEntry = {
  name: string;
  endpoint: string;
  httpMethod: string;
  summary: string;
  description: string;
  stainlessPath: string;
  qualified: string;
  params?: string[];
  response?: string;
  markdown?: string;
  perLanguage?: Record<string, PerLanguageData>;
};

type ProseChunk = {
  content: string;
  tag: string;
  sectionContext?: string;
  source?: string;
};

type MiniSearchDocument = {
  id: string;
  kind: 'http_method' | 'prose';
  name?: string;
  endpoint?: string;
  summary?: string;
  description?: string;
  qualified?: string;
  stainlessPath?: string;
  content?: string;
  sectionContext?: string;
  _original: Record<string, unknown>;
};

type SearchResult = {
  results: (string | Record<string, unknown>)[];
};

const EMBEDDED_METHODS: MethodEntry[] = [
  {
    name: 'api_status',
    endpoint: '/v1/status',
    httpMethod: 'get',
    summary: 'API status check',
    description: 'Status of api',
    stainlessPath: '(resource) $client > (method) api_status',
    qualified: 'client.apiStatus',
    response: '{ message?: string; }',
    markdown:
      "## api_status\n\n`client.apiStatus(): { message?: string; }`\n\n**get** `/v1/status`\n\nStatus of api\n\n### Returns\n\n- `{ message?: string; }`\n\n  - `message?: string`\n\n### Example\n\n```typescript\nimport Lithic from 'lithic';\n\nconst client = new Lithic();\n\nconst apiStatus = await client.apiStatus();\n\nconsole.log(apiStatus);\n```",
  },
  {
    name: 'retrieve',
    endpoint: '/v1/accounts/{account_token}',
    httpMethod: 'get',
    summary: 'Get account',
    description: 'Get account configuration such as spend limits.',
    stainlessPath: '(resource) accounts > (method) retrieve',
    qualified: 'client.accounts.retrieve',
    params: ['account_token: string;'],
    response:
      "{ token: string; created: string; spend_limit: { daily: number; lifetime: number; monthly: number; }; state: 'ACTIVE' | 'PAUSED' | 'CLOSED'; account_holder?: { token: string; business_account_token: string; email: string; phone_number: string; }; auth_rule_tokens?: string[]; cardholder_currency?: string; comment?: string; substatus?: string; verification_address?: { address1: string; city: string; country: string; postal_code: string; state: string; address2?: string; }; }",
    markdown:
      "## retrieve\n\n`client.accounts.retrieve(account_token: string): { token: string; created: string; spend_limit: object; state: 'ACTIVE' | 'PAUSED' | 'CLOSED'; account_holder?: object; auth_rule_tokens?: string[]; cardholder_currency?: string; comment?: string; substatus?: string; verification_address?: object; }`\n\n**get** `/v1/accounts/{account_token}`\n\nGet account configuration such as spend limits.\n\n### Parameters\n\n- `account_token: string`\n\n### Returns\n\n- `{ token: string; created: string; spend_limit: { daily: number; lifetime: number; monthly: number; }; state: 'ACTIVE' | 'PAUSED' | 'CLOSED'; account_holder?: { token: string; business_account_token: string; email: string; phone_number: string; }; auth_rule_tokens?: string[]; cardholder_currency?: string; comment?: string; substatus?: string; verification_address?: { address1: string; city: string; country: string; postal_code: string; state: string; address2?: string; }; }`\n\n  - `token: string`\n  - `created: string`\n  - `spend_limit: { daily: number; lifetime: number; monthly: number; }`\n  - `state: 'ACTIVE' | 'PAUSED' | 'CLOSED'`\n  - `account_holder?: { token: string; business_account_token: string; email: string; phone_number: string; }`\n  - `auth_rule_tokens?: string[]`\n  - `cardholder_currency?: string`\n  - `comment?: string`\n  - `substatus?: string`\n  - `verification_address?: { address1: string; city: string; country: string; postal_code: string; state: string; address2?: string; }`\n\n### Example\n\n```typescript\nimport Lithic from 'lithic';\n\nconst client = new Lithic();\n\nconst account = await client.accounts.retrieve('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e');\n\nconsole.log(account);\n```",
  },
  {
    name: 'update',
    endpoint: '/v1/accounts/{account_token}',
    httpMethod: 'patch',
    summary: 'Update account',
    description:
      'Update account configuration such as state or spend limits. Can only be run on accounts that are part of the program managed by this API key.\nAccounts that are in the `PAUSED` state will not be able to transact or create new cards.\n',
    stainlessPath: '(resource) accounts > (method) update',
    qualified: 'client.accounts.update',
    params: [
      'account_token: string;',
      'comment?: string;',
      'daily_spend_limit?: number;',
      'lifetime_spend_limit?: number;',
      'monthly_spend_limit?: number;',
      "state?: 'ACTIVE' | 'PAUSED' | 'CLOSED';",
      'substatus?: string;',
      'verification_address?: { address1?: string; address2?: string; city?: string; country?: string; postal_code?: string; state?: string; };',
    ],
    response:
      "{ token: string; created: string; spend_limit: { daily: number; lifetime: number; monthly: number; }; state: 'ACTIVE' | 'PAUSED' | 'CLOSED'; account_holder?: { token: string; business_account_token: string; email: string; phone_number: string; }; auth_rule_tokens?: string[]; cardholder_currency?: string; comment?: string; substatus?: string; verification_address?: { address1: string; city: string; country: string; postal_code: string; state: string; address2?: string; }; }",
    markdown:
      "## update\n\n`client.accounts.update(account_token: string, comment?: string, daily_spend_limit?: number, lifetime_spend_limit?: number, monthly_spend_limit?: number, state?: 'ACTIVE' | 'PAUSED' | 'CLOSED', substatus?: string, verification_address?: { address1?: string; address2?: string; city?: string; country?: string; postal_code?: string; state?: string; }): { token: string; created: string; spend_limit: object; state: 'ACTIVE' | 'PAUSED' | 'CLOSED'; account_holder?: object; auth_rule_tokens?: string[]; cardholder_currency?: string; comment?: string; substatus?: string; verification_address?: object; }`\n\n**patch** `/v1/accounts/{account_token}`\n\nUpdate account configuration such as state or spend limits. Can only be run on accounts that are part of the program managed by this API key.\nAccounts that are in the `PAUSED` state will not be able to transact or create new cards.\n\n\n### Parameters\n\n- `account_token: string`\n\n- `comment?: string`\n  Additional context or information related to the account.\n\n- `daily_spend_limit?: number`\n  Amount (in cents) for the account's daily spend limit (e.g. 100000 would be a $1,000 limit).\nBy default the daily spend limit is set to $1,250.\n\n\n- `lifetime_spend_limit?: number`\n  Amount (in cents) for the account's lifetime spend limit (e.g. 100000 would be a $1,000 limit). Once this limit is reached, no transactions will be accepted on any card created for this account until the limit is updated.\nNote that a spend limit of 0 is effectively no limit, and should only be used to reset or remove a prior limit. Only a limit of 1 or above will result in declined transactions due to checks against the account limit. This behavior differs from the daily spend limit and the monthly spend limit.\n\n\n- `monthly_spend_limit?: number`\n  Amount (in cents) for the account's monthly spend limit (e.g. 100000 would be a $1,000 limit).\nBy default the monthly spend limit is set to $5,000.\n\n\n- `state?: 'ACTIVE' | 'PAUSED' | 'CLOSED'`\n  Account states.\n\n- `substatus?: string`\n  Account state substatus values:\n* `FRAUD_IDENTIFIED` - The account has been recognized as being created or used with stolen or fabricated identity information, encompassing both true identity theft and synthetic identities.\n* `SUSPICIOUS_ACTIVITY` - The account has exhibited suspicious behavior, such as unauthorized access or fraudulent transactions, necessitating further investigation.\n* `RISK_VIOLATION` - The account has been involved in deliberate misuse by the legitimate account holder. Examples include disputing valid transactions without cause, falsely claiming non-receipt of goods, or engaging in intentional bust-out schemes to exploit account services.\n* `END_USER_REQUEST` - The account holder has voluntarily requested the closure of the account for personal reasons. This encompasses situations such as bankruptcy, other financial considerations, or the account holder's death.\n* `ISSUER_REQUEST` - The issuer has initiated the closure of the account due to business strategy, risk management, inactivity, product changes, regulatory concerns, or violations of terms and conditions.\n* `NOT_ACTIVE` - The account has not had any transactions or payment activity within a specified period. This status applies to accounts that are paused or closed due to inactivity.\n* `INTERNAL_REVIEW` - The account is temporarily paused pending further internal review. In future implementations, this status may prevent clients from activating the account via APIs until the review is completed.\n* `OTHER` - The reason for the account's current status does not fall into any of the above categories. A comment should be provided to specify the particular reason.\n\n- `verification_address?: { address1?: string; address2?: string; city?: string; country?: string; postal_code?: string; state?: string; }`\n  Address used during Address Verification Service (AVS) checks during transactions if enabled via Auth Rules. This field is deprecated as AVS checks are no longer supported by Auth Rules. The field will be removed from the schema in a future release.\n  - `address1?: string`\n  - `address2?: string`\n  - `city?: string`\n  - `country?: string`\n  - `postal_code?: string`\n  - `state?: string`\n\n### Returns\n\n- `{ token: string; created: string; spend_limit: { daily: number; lifetime: number; monthly: number; }; state: 'ACTIVE' | 'PAUSED' | 'CLOSED'; account_holder?: { token: string; business_account_token: string; email: string; phone_number: string; }; auth_rule_tokens?: string[]; cardholder_currency?: string; comment?: string; substatus?: string; verification_address?: { address1: string; city: string; country: string; postal_code: string; state: string; address2?: string; }; }`\n\n  - `token: string`\n  - `created: string`\n  - `spend_limit: { daily: number; lifetime: number; monthly: number; }`\n  - `state: 'ACTIVE' | 'PAUSED' | 'CLOSED'`\n  - `account_holder?: { token: string; business_account_token: string; email: string; phone_number: string; }`\n  - `auth_rule_tokens?: string[]`\n  - `cardholder_currency?: string`\n  - `comment?: string`\n  - `substatus?: string`\n  - `verification_address?: { address1: string; city: string; country: string; postal_code: string; state: string; address2?: string; }`\n\n### Example\n\n```typescript\nimport Lithic from 'lithic';\n\nconst client = new Lithic();\n\nconst account = await client.accounts.update('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e');\n\nconsole.log(account);\n```",
  },
  {
    name: 'list',
    endpoint: '/v1/accounts',
    httpMethod: 'get',
    summary: 'List accounts',
    description: 'List account configurations.\n',
    stainlessPath: '(resource) accounts > (method) list',
    qualified: 'client.accounts.list',
    params: [
      'begin?: string;',
      'end?: string;',
      'ending_before?: string;',
      'page_size?: number;',
      'starting_after?: string;',
    ],
    response:
      "{ token: string; created: string; spend_limit: { daily: number; lifetime: number; monthly: number; }; state: 'ACTIVE' | 'PAUSED' | 'CLOSED'; account_holder?: { token: string; business_account_token: string; email: string; phone_number: string; }; auth_rule_tokens?: string[]; cardholder_currency?: string; comment?: string; substatus?: string; verification_address?: { address1: string; city: string; country: string; postal_code: string; state: string; address2?: string; }; }",
    markdown:
      "## list\n\n`client.accounts.list(begin?: string, end?: string, ending_before?: string, page_size?: number, starting_after?: string): { token: string; created: string; spend_limit: object; state: 'ACTIVE' | 'PAUSED' | 'CLOSED'; account_holder?: object; auth_rule_tokens?: string[]; cardholder_currency?: string; comment?: string; substatus?: string; verification_address?: object; }`\n\n**get** `/v1/accounts`\n\nList account configurations.\n\n\n### Parameters\n\n- `begin?: string`\n  Date string in RFC 3339 format. Only entries created after the specified time will be included. UTC time zone.\n\n- `end?: string`\n  Date string in RFC 3339 format. Only entries created before the specified time will be included. UTC time zone.\n\n- `ending_before?: string`\n  A cursor representing an item's token before which a page of results should end. Used to retrieve the previous page of results before this item.\n\n- `page_size?: number`\n  Page size (for pagination).\n\n- `starting_after?: string`\n  A cursor representing an item's token after which a page of results should begin. Used to retrieve the next page of results after this item.\n\n### Returns\n\n- `{ token: string; created: string; spend_limit: { daily: number; lifetime: number; monthly: number; }; state: 'ACTIVE' | 'PAUSED' | 'CLOSED'; account_holder?: { token: string; business_account_token: string; email: string; phone_number: string; }; auth_rule_tokens?: string[]; cardholder_currency?: string; comment?: string; substatus?: string; verification_address?: { address1: string; city: string; country: string; postal_code: string; state: string; address2?: string; }; }`\n\n  - `token: string`\n  - `created: string`\n  - `spend_limit: { daily: number; lifetime: number; monthly: number; }`\n  - `state: 'ACTIVE' | 'PAUSED' | 'CLOSED'`\n  - `account_holder?: { token: string; business_account_token: string; email: string; phone_number: string; }`\n  - `auth_rule_tokens?: string[]`\n  - `cardholder_currency?: string`\n  - `comment?: string`\n  - `substatus?: string`\n  - `verification_address?: { address1: string; city: string; country: string; postal_code: string; state: string; address2?: string; }`\n\n### Example\n\n```typescript\nimport Lithic from 'lithic';\n\nconst client = new Lithic();\n\n// Automatically fetches more pages as needed.\nfor await (const account of client.accounts.list()) {\n  console.log(account);\n}\n```",
  },
  {
    name: 'retrieve_spend_limits',
    endpoint: '/v1/accounts/{account_token}/spend_limits',
    httpMethod: 'get',
    summary: "Get account's available spend limits",
    description:
      "Get an Account's available spend limits, which is based on the spend limit configured on the Account and the amount already spent over the spend limit's duration. For example, if the Account has a daily spend limit of $1000 configured, and has spent $600 in the last 24 hours, the available spend limit returned would be $400.",
    stainlessPath: '(resource) accounts > (method) retrieve_spend_limits',
    qualified: 'client.accounts.retrieveSpendLimits',
    params: ['account_token: string;'],
    response:
      '{ available_spend_limit: { daily?: number; lifetime?: number; monthly?: number; }; spend_limit?: { daily?: number; lifetime?: number; monthly?: number; }; spend_velocity?: { daily?: number; lifetime?: number; monthly?: number; }; }',
    markdown:
      "## retrieve_spend_limits\n\n`client.accounts.retrieveSpendLimits(account_token: string): { available_spend_limit: object; spend_limit?: object; spend_velocity?: object; }`\n\n**get** `/v1/accounts/{account_token}/spend_limits`\n\nGet an Account's available spend limits, which is based on the spend limit configured on the Account and the amount already spent over the spend limit's duration. For example, if the Account has a daily spend limit of $1000 configured, and has spent $600 in the last 24 hours, the available spend limit returned would be $400.\n\n### Parameters\n\n- `account_token: string`\n\n### Returns\n\n- `{ available_spend_limit: { daily?: number; lifetime?: number; monthly?: number; }; spend_limit?: { daily?: number; lifetime?: number; monthly?: number; }; spend_velocity?: { daily?: number; lifetime?: number; monthly?: number; }; }`\n\n  - `available_spend_limit: { daily?: number; lifetime?: number; monthly?: number; }`\n  - `spend_limit?: { daily?: number; lifetime?: number; monthly?: number; }`\n  - `spend_velocity?: { daily?: number; lifetime?: number; monthly?: number; }`\n\n### Example\n\n```typescript\nimport Lithic from 'lithic';\n\nconst client = new Lithic();\n\nconst accountSpendLimits = await client.accounts.retrieveSpendLimits('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e');\n\nconsole.log(accountSpendLimits);\n```",
  },
  {
    name: 'create',
    endpoint: '/v1/account_holders',
    httpMethod: 'post',
    summary: 'Create an individual or business account holder',
    description:
      'Create an account holder and initiate the appropriate onboarding workflow.  Account holders and accounts have a 1:1 relationship. When an account holder is successfully created an associated account is also created.\nAll calls to this endpoint will return a synchronous response. The response time will depend on the workflow. In some cases, the response may indicate the workflow is under review or further action will be needed to complete the account creation process.\nThis endpoint can only be used on accounts that are part of the program that the calling API key manages.',
    stainlessPath: '(resource) account_holders > (method) create',
    qualified: 'client.accountHolders.create',
    params: [
      "{ beneficial_owner_individuals: { address: object; dob: string; email: string; first_name: string; government_id: string; last_name: string; phone_number?: string; }[]; business_entity: { address: object; government_id: string; legal_business_name: string; phone_numbers: string[]; dba_business_name?: string; parent_company?: string; }; control_person: { address: object; dob: string; email: string; first_name: string; government_id: string; last_name: string; phone_number?: string; }; nature_of_business: string; tos_timestamp: string; workflow: 'KYB_BASIC' | 'KYB_BYO'; external_id?: string; kyb_passed_timestamp?: string; naics_code?: string; website_url?: string; } | { business_entity: { address: { address1: string; city: string; country: string; postal_code: string; state: string; address2?: string; }; legal_business_name: string; dba_business_name?: string; government_id?: string; parent_company?: string; phone_numbers?: string[]; }; beneficial_owner_individuals?: { first_name: string; last_name: string; address?: { address1: string; city: string; country: string; postal_code: string; state: string; address2?: string; }; dob?: string; email?: string; government_id?: string; phone_number?: string; }[]; control_person?: { first_name: string; last_name: string; address?: { address1: string; city: string; country: string; postal_code: string; state: string; address2?: string; }; dob?: string; email?: string; government_id?: string; phone_number?: string; }; external_id?: string; naics_code?: string; nature_of_business?: string; tos_timestamp?: string; website_url?: string; workflow?: 'KYB_DELEGATED'; } | { individual: { address: object; dob: string; email: string; first_name: string; government_id: string; last_name: string; phone_number: string; }; tos_timestamp: string; workflow: 'KYC_BASIC' | 'KYC_BYO'; external_id?: string; kyc_passed_timestamp?: string; } | { address: { address1: string; city: string; country: string; postal_code: string; state: string; address2?: string; }; email: string; first_name: string; kyc_exemption_type: 'AUTHORIZED_USER' | 'PREPAID_CARD_USER'; last_name: string; phone_number: string; workflow: 'KYC_EXEMPT'; business_account_token?: string; external_id?: string; };",
    ],
    response:
      "{ token: string; account_token: string; status: 'ACCEPTED' | 'PENDING_REVIEW' | 'PENDING_DOCUMENT' | 'PENDING_RESUBMIT' | 'REJECTED'; status_reasons: string[]; created?: string; external_id?: string; required_documents?: { entity_token: string; status_reasons: string[]; valid_documents: string[]; }[]; }",
  },
  {
    name: 'retrieve',
    endpoint: '/v1/account_holders/{account_holder_token}',
    httpMethod: 'get',
    summary: 'Get an individual or business account holder',
    description: 'Get an Individual or Business Account Holder and/or their KYC or KYB evaluation status.',
    stainlessPath: '(resource) account_holders > (method) retrieve',
    qualified: 'client.accountHolders.retrieve',
    params: ['account_holder_token: string;'],
    response:
      "{ token: string; created: string; account_token?: string; beneficial_owner_individuals?: object[]; business_account_token?: string; business_entity?: object; control_person?: object; email?: string; exemption_type?: 'AUTHORIZED_USER' | 'PREPAID_CARD_USER'; external_id?: string; individual?: object; naics_code?: string; nature_of_business?: string; phone_number?: string; required_documents?: required_document[]; status?: 'ACCEPTED' | 'PENDING_REVIEW' | 'PENDING_DOCUMENT' | 'PENDING_RESUBMIT' | 'REJECTED'; status_reasons?: string[]; user_type?: 'BUSINESS' | 'INDIVIDUAL'; verification_application?: object; website_url?: string; }",
    markdown:
      "## retrieve\n\n`client.accountHolders.retrieve(account_holder_token: string): { token: string; created: string; account_token?: string; beneficial_owner_individuals?: object[]; business_account_token?: string; business_entity?: object; control_person?: object; email?: string; exemption_type?: 'AUTHORIZED_USER' | 'PREPAID_CARD_USER'; external_id?: string; individual?: object; naics_code?: string; nature_of_business?: string; phone_number?: string; required_documents?: required_document[]; status?: 'ACCEPTED' | 'PENDING_REVIEW' | 'PENDING_DOCUMENT' | 'PENDING_RESUBMIT' | 'REJECTED'; status_reasons?: string[]; user_type?: 'BUSINESS' | 'INDIVIDUAL'; verification_application?: object; website_url?: string; }`\n\n**get** `/v1/account_holders/{account_holder_token}`\n\nGet an Individual or Business Account Holder and/or their KYC or KYB evaluation status.\n\n### Parameters\n\n- `account_holder_token: string`\n\n### Returns\n\n- `{ token: string; created: string; account_token?: string; beneficial_owner_individuals?: { address: object; dob: string; email: string; entity_token: string; first_name: string; last_name: string; phone_number: string; }[]; business_account_token?: string; business_entity?: { address: object; dba_business_name: string; entity_token: string; government_id: string; legal_business_name: string; phone_numbers: string[]; parent_company?: string; }; control_person?: { address: object; dob: string; email: string; entity_token: string; first_name: string; last_name: string; phone_number: string; }; email?: string; exemption_type?: 'AUTHORIZED_USER' | 'PREPAID_CARD_USER'; external_id?: string; individual?: { address: object; dob: string; email: string; entity_token: string; first_name: string; last_name: string; phone_number: string; }; naics_code?: string; nature_of_business?: string; phone_number?: string; required_documents?: { entity_token: string; status_reasons: string[]; valid_documents: string[]; }[]; status?: 'ACCEPTED' | 'PENDING_REVIEW' | 'PENDING_DOCUMENT' | 'PENDING_RESUBMIT' | 'REJECTED'; status_reasons?: string[]; user_type?: 'BUSINESS' | 'INDIVIDUAL'; verification_application?: { created?: string; status?: 'ACCEPTED' | 'PENDING_REVIEW' | 'PENDING_DOCUMENT' | 'PENDING_RESUBMIT' | 'REJECTED'; status_reasons?: string[]; updated?: string; }; website_url?: string; }`\n\n  - `token: string`\n  - `created: string`\n  - `account_token?: string`\n  - `beneficial_owner_individuals?: { address: { address1: string; city: string; country: string; postal_code: string; state: string; address2?: string; }; dob: string; email: string; entity_token: string; first_name: string; last_name: string; phone_number: string; }[]`\n  - `business_account_token?: string`\n  - `business_entity?: { address: { address1: string; city: string; country: string; postal_code: string; state: string; address2?: string; }; dba_business_name: string; entity_token: string; government_id: string; legal_business_name: string; phone_numbers: string[]; parent_company?: string; }`\n  - `control_person?: { address: { address1: string; city: string; country: string; postal_code: string; state: string; address2?: string; }; dob: string; email: string; entity_token: string; first_name: string; last_name: string; phone_number: string; }`\n  - `email?: string`\n  - `exemption_type?: 'AUTHORIZED_USER' | 'PREPAID_CARD_USER'`\n  - `external_id?: string`\n  - `individual?: { address: { address1: string; city: string; country: string; postal_code: string; state: string; address2?: string; }; dob: string; email: string; entity_token: string; first_name: string; last_name: string; phone_number: string; }`\n  - `naics_code?: string`\n  - `nature_of_business?: string`\n  - `phone_number?: string`\n  - `required_documents?: { entity_token: string; status_reasons: string[]; valid_documents: string[]; }[]`\n  - `status?: 'ACCEPTED' | 'PENDING_REVIEW' | 'PENDING_DOCUMENT' | 'PENDING_RESUBMIT' | 'REJECTED'`\n  - `status_reasons?: string[]`\n  - `user_type?: 'BUSINESS' | 'INDIVIDUAL'`\n  - `verification_application?: { created?: string; status?: 'ACCEPTED' | 'PENDING_REVIEW' | 'PENDING_DOCUMENT' | 'PENDING_RESUBMIT' | 'REJECTED'; status_reasons?: string[]; updated?: string; }`\n  - `website_url?: string`\n\n### Example\n\n```typescript\nimport Lithic from 'lithic';\n\nconst client = new Lithic();\n\nconst accountHolder = await client.accountHolders.retrieve('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e');\n\nconsole.log(accountHolder);\n```",
  },
  {
    name: 'update',
    endpoint: '/v1/account_holders/{account_holder_token}',
    httpMethod: 'patch',
    summary: 'Update account holder information and possibly resubmit for evaluation',
    description:
      "Update the information associated with a particular account holder (including business owners and control persons associated to a business account).\nIf Lithic is performing KYB or KYC and additional verification is required we will run the individual's or business's updated information again and return whether the status is accepted or pending (i.e., further action required).\nAll calls to this endpoint will return a synchronous response. The response time will depend on the workflow. In some cases, the response may indicate the workflow is under review or further action will be needed to complete the account creation process.\nThis endpoint can only be used on existing accounts that are part of the program that the calling API key manages.",
    stainlessPath: '(resource) account_holders > (method) update',
    qualified: 'client.accountHolders.update',
    params: [
      'account_holder_token: string;',
      'body: { beneficial_owner_individuals?: { entity_token: string; address?: { address1?: string; address2?: string; city?: string; country?: string; postal_code?: string; state?: string; }; dob?: string; email?: string; first_name?: string; government_id?: string; last_name?: string; phone_number?: string; }[]; business_entity?: { entity_token: string; address?: { address1?: string; address2?: string; city?: string; country?: string; postal_code?: string; state?: string; }; dba_business_name?: string; government_id?: string; legal_business_name?: string; parent_company?: string; phone_numbers?: string[]; }; control_person?: { entity_token: string; address?: { address1?: string; address2?: string; city?: string; country?: string; postal_code?: string; state?: string; }; dob?: string; email?: string; first_name?: string; government_id?: string; last_name?: string; phone_number?: string; }; external_id?: string; naics_code?: string; nature_of_business?: string; website_url?: string; } | { external_id?: string; individual?: { entity_token: string; address?: { address1?: string; address2?: string; city?: string; country?: string; postal_code?: string; state?: string; }; dob?: string; email?: string; first_name?: string; government_id?: string; last_name?: string; phone_number?: string; }; } | { address?: { address1?: string; address2?: string; city?: string; country?: string; postal_code?: string; state?: string; }; business_account_token?: string; email?: string; first_name?: string; last_name?: string; legal_business_name?: string; phone_number?: string; };',
    ],
    response:
      "{ token?: string; account_token?: string; beneficial_owner_individuals?: object[]; business_account_token?: string; business_entity?: kyb_business_entity; control_person?: object; created?: string; email?: string; exemption_type?: 'AUTHORIZED_USER' | 'PREPAID_CARD_USER'; external_id?: string; individual?: object; naics_code?: string; nature_of_business?: string; phone_number?: string; required_documents?: required_document[]; status?: 'ACCEPTED' | 'PENDING_DOCUMENT' | 'PENDING_RESUBMIT' | 'REJECTED'; status_reasons?: string[]; user_type?: 'BUSINESS' | 'INDIVIDUAL'; verification_application?: object; website_url?: string; } | { token?: string; address?: object; business_account_token?: string; email?: string; first_name?: string; last_name?: string; legal_business_name?: string; phone_number?: string; }",
  },
  {
    name: 'list',
    endpoint: '/v1/account_holders',
    httpMethod: 'get',
    summary: 'Get a list of individual or business account holders',
    description:
      'Get a list of individual or business account holders and their KYC or KYB evaluation status.',
    stainlessPath: '(resource) account_holders > (method) list',
    qualified: 'client.accountHolders.list',
    params: [
      'begin?: string;',
      'email?: string;',
      'end?: string;',
      'ending_before?: string;',
      'external_id?: string;',
      'first_name?: string;',
      'last_name?: string;',
      'legal_business_name?: string;',
      'limit?: number;',
      'phone_number?: string;',
      'starting_after?: string;',
    ],
    response:
      "{ token: string; created: string; account_token?: string; beneficial_owner_individuals?: object[]; business_account_token?: string; business_entity?: object; control_person?: object; email?: string; exemption_type?: 'AUTHORIZED_USER' | 'PREPAID_CARD_USER'; external_id?: string; individual?: object; naics_code?: string; nature_of_business?: string; phone_number?: string; required_documents?: required_document[]; status?: 'ACCEPTED' | 'PENDING_REVIEW' | 'PENDING_DOCUMENT' | 'PENDING_RESUBMIT' | 'REJECTED'; status_reasons?: string[]; user_type?: 'BUSINESS' | 'INDIVIDUAL'; verification_application?: object; website_url?: string; }",
    markdown:
      "## list\n\n`client.accountHolders.list(begin?: string, email?: string, end?: string, ending_before?: string, external_id?: string, first_name?: string, last_name?: string, legal_business_name?: string, limit?: number, phone_number?: string, starting_after?: string): { token: string; created: string; account_token?: string; beneficial_owner_individuals?: object[]; business_account_token?: string; business_entity?: object; control_person?: object; email?: string; exemption_type?: 'AUTHORIZED_USER' | 'PREPAID_CARD_USER'; external_id?: string; individual?: object; naics_code?: string; nature_of_business?: string; phone_number?: string; required_documents?: required_document[]; status?: 'ACCEPTED' | 'PENDING_REVIEW' | 'PENDING_DOCUMENT' | 'PENDING_RESUBMIT' | 'REJECTED'; status_reasons?: string[]; user_type?: 'BUSINESS' | 'INDIVIDUAL'; verification_application?: object; website_url?: string; }`\n\n**get** `/v1/account_holders`\n\nGet a list of individual or business account holders and their KYC or KYB evaluation status.\n\n### Parameters\n\n- `begin?: string`\n  Date string in RFC 3339 format. Only entries created after the specified time will be included. UTC time zone.\n\n- `email?: string`\n  Email address of the account holder. The query must be an exact match, case insensitive.\n\n- `end?: string`\n  Date string in RFC 3339 format. Only entries created before the specified time will be included. UTC time zone.\n\n- `ending_before?: string`\n  A cursor representing an item's token before which a page of results should end. Used to retrieve the previous page of results before this item.\n\n- `external_id?: string`\n  If applicable, represents the external_id associated with the account_holder.\n\n- `first_name?: string`\n  (Individual Account Holders only) The first name of the account holder. The query is case insensitive and supports partial matches.\n\n- `last_name?: string`\n  (Individual Account Holders only) The last name of the account holder. The query is case insensitive and supports partial matches.\n\n- `legal_business_name?: string`\n  (Business Account Holders only) The legal business name of the account holder. The query is case insensitive and supports partial matches.\n\n- `limit?: number`\n  The number of account_holders to limit the response to.\n\n- `phone_number?: string`\n  Phone number of the account holder. The query must be an exact match.\n\n- `starting_after?: string`\n  A cursor representing an item's token after which a page of results should begin. Used to retrieve the next page of results after this item.\n\n### Returns\n\n- `{ token: string; created: string; account_token?: string; beneficial_owner_individuals?: { address: object; dob: string; email: string; entity_token: string; first_name: string; last_name: string; phone_number: string; }[]; business_account_token?: string; business_entity?: { address: object; dba_business_name: string; entity_token: string; government_id: string; legal_business_name: string; phone_numbers: string[]; parent_company?: string; }; control_person?: { address: object; dob: string; email: string; entity_token: string; first_name: string; last_name: string; phone_number: string; }; email?: string; exemption_type?: 'AUTHORIZED_USER' | 'PREPAID_CARD_USER'; external_id?: string; individual?: { address: object; dob: string; email: string; entity_token: string; first_name: string; last_name: string; phone_number: string; }; naics_code?: string; nature_of_business?: string; phone_number?: string; required_documents?: { entity_token: string; status_reasons: string[]; valid_documents: string[]; }[]; status?: 'ACCEPTED' | 'PENDING_REVIEW' | 'PENDING_DOCUMENT' | 'PENDING_RESUBMIT' | 'REJECTED'; status_reasons?: string[]; user_type?: 'BUSINESS' | 'INDIVIDUAL'; verification_application?: { created?: string; status?: 'ACCEPTED' | 'PENDING_REVIEW' | 'PENDING_DOCUMENT' | 'PENDING_RESUBMIT' | 'REJECTED'; status_reasons?: string[]; updated?: string; }; website_url?: string; }`\n\n  - `token: string`\n  - `created: string`\n  - `account_token?: string`\n  - `beneficial_owner_individuals?: { address: { address1: string; city: string; country: string; postal_code: string; state: string; address2?: string; }; dob: string; email: string; entity_token: string; first_name: string; last_name: string; phone_number: string; }[]`\n  - `business_account_token?: string`\n  - `business_entity?: { address: { address1: string; city: string; country: string; postal_code: string; state: string; address2?: string; }; dba_business_name: string; entity_token: string; government_id: string; legal_business_name: string; phone_numbers: string[]; parent_company?: string; }`\n  - `control_person?: { address: { address1: string; city: string; country: string; postal_code: string; state: string; address2?: string; }; dob: string; email: string; entity_token: string; first_name: string; last_name: string; phone_number: string; }`\n  - `email?: string`\n  - `exemption_type?: 'AUTHORIZED_USER' | 'PREPAID_CARD_USER'`\n  - `external_id?: string`\n  - `individual?: { address: { address1: string; city: string; country: string; postal_code: string; state: string; address2?: string; }; dob: string; email: string; entity_token: string; first_name: string; last_name: string; phone_number: string; }`\n  - `naics_code?: string`\n  - `nature_of_business?: string`\n  - `phone_number?: string`\n  - `required_documents?: { entity_token: string; status_reasons: string[]; valid_documents: string[]; }[]`\n  - `status?: 'ACCEPTED' | 'PENDING_REVIEW' | 'PENDING_DOCUMENT' | 'PENDING_RESUBMIT' | 'REJECTED'`\n  - `status_reasons?: string[]`\n  - `user_type?: 'BUSINESS' | 'INDIVIDUAL'`\n  - `verification_application?: { created?: string; status?: 'ACCEPTED' | 'PENDING_REVIEW' | 'PENDING_DOCUMENT' | 'PENDING_RESUBMIT' | 'REJECTED'; status_reasons?: string[]; updated?: string; }`\n  - `website_url?: string`\n\n### Example\n\n```typescript\nimport Lithic from 'lithic';\n\nconst client = new Lithic();\n\n// Automatically fetches more pages as needed.\nfor await (const accountHolder of client.accountHolders.list()) {\n  console.log(accountHolder);\n}\n```",
  },
  {
    name: 'list_documents',
    endpoint: '/v1/account_holders/{account_holder_token}/documents',
    httpMethod: 'get',
    summary: 'Get account holder document uploads',
    description:
      'Retrieve the status of account holder document uploads, or retrieve the upload URLs to process your image uploads.\n\nNote that this is not equivalent to checking the status of the KYC evaluation overall (a document may be successfully uploaded but not be sufficient for KYC to pass).\n\nIn the event your upload URLs have expired, calling this endpoint will refresh them.\nSimilarly, in the event a previous account holder document upload has failed, you can use this endpoint to get a new upload URL for the failed image upload.\n\nWhen a new document upload is generated for a failed attempt, the response will show an additional entry in the `required_document_uploads` list\nin a `PENDING` state for the corresponding `image_type`.\n',
    stainlessPath: '(resource) account_holders > (method) list_documents',
    qualified: 'client.accountHolders.listDocuments',
    params: ['account_holder_token: string;'],
    response:
      '{ data?: { token: string; account_holder_token: string; document_type: string; entity_token: string; required_document_uploads: object[]; }[]; }',
    markdown:
      "## list_documents\n\n`client.accountHolders.listDocuments(account_holder_token: string): { data?: document[]; }`\n\n**get** `/v1/account_holders/{account_holder_token}/documents`\n\nRetrieve the status of account holder document uploads, or retrieve the upload URLs to process your image uploads.\n\nNote that this is not equivalent to checking the status of the KYC evaluation overall (a document may be successfully uploaded but not be sufficient for KYC to pass).\n\nIn the event your upload URLs have expired, calling this endpoint will refresh them.\nSimilarly, in the event a previous account holder document upload has failed, you can use this endpoint to get a new upload URL for the failed image upload.\n\nWhen a new document upload is generated for a failed attempt, the response will show an additional entry in the `required_document_uploads` list\nin a `PENDING` state for the corresponding `image_type`.\n\n\n### Parameters\n\n- `account_holder_token: string`\n\n### Returns\n\n- `{ data?: { token: string; account_holder_token: string; document_type: string; entity_token: string; required_document_uploads: object[]; }[]; }`\n\n  - `data?: { token: string; account_holder_token: string; document_type: string; entity_token: string; required_document_uploads: { token: string; accepted_entity_status_reasons: string[]; created: string; image_type: 'FRONT' | 'BACK'; rejected_entity_status_reasons: string[]; status: 'ACCEPTED' | 'REJECTED' | 'PENDING_UPLOAD' | 'UPLOADED' | 'PARTIAL_APPROVAL'; status_reasons: string[]; updated: string; upload_url: string; }[]; }[]`\n\n### Example\n\n```typescript\nimport Lithic from 'lithic';\n\nconst client = new Lithic();\n\nconst response = await client.accountHolders.listDocuments('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e');\n\nconsole.log(response);\n```",
  },
  {
    name: 'retrieve_document',
    endpoint: '/v1/account_holders/{account_holder_token}/documents/{document_token}',
    httpMethod: 'get',
    summary: 'Get account holder document upload status',
    description:
      'Check the status of an account holder document upload, or retrieve the upload URLs to process your image uploads.\n\nNote that this is not equivalent to checking the status of the KYC evaluation overall (a document may be successfully uploaded but not be sufficient for KYC to pass).\n\nIn the event your upload URLs have expired, calling this endpoint will refresh them.\nSimilarly, in the event a document upload has failed, you can use this endpoint to get a new upload URL for the failed image upload.\n\nWhen a new account holder document upload is generated for a failed attempt, the response will show an additional entry in the `required_document_uploads` array\nin a `PENDING` state for the corresponding `image_type`.\n',
    stainlessPath: '(resource) account_holders > (method) retrieve_document',
    qualified: 'client.accountHolders.retrieveDocument',
    params: ['account_holder_token: string;', 'document_token: string;'],
    response:
      "{ token: string; account_holder_token: string; document_type: string; entity_token: string; required_document_uploads: { token: string; accepted_entity_status_reasons: string[]; created: string; image_type: 'FRONT' | 'BACK'; rejected_entity_status_reasons: string[]; status: 'ACCEPTED' | 'REJECTED' | 'PENDING_UPLOAD' | 'UPLOADED' | 'PARTIAL_APPROVAL'; status_reasons: string[]; updated: string; upload_url: string; }[]; }",
    markdown:
      "## retrieve_document\n\n`client.accountHolders.retrieveDocument(account_holder_token: string, document_token: string): { token: string; account_holder_token: string; document_type: string; entity_token: string; required_document_uploads: object[]; }`\n\n**get** `/v1/account_holders/{account_holder_token}/documents/{document_token}`\n\nCheck the status of an account holder document upload, or retrieve the upload URLs to process your image uploads.\n\nNote that this is not equivalent to checking the status of the KYC evaluation overall (a document may be successfully uploaded but not be sufficient for KYC to pass).\n\nIn the event your upload URLs have expired, calling this endpoint will refresh them.\nSimilarly, in the event a document upload has failed, you can use this endpoint to get a new upload URL for the failed image upload.\n\nWhen a new account holder document upload is generated for a failed attempt, the response will show an additional entry in the `required_document_uploads` array\nin a `PENDING` state for the corresponding `image_type`.\n\n\n### Parameters\n\n- `account_holder_token: string`\n\n- `document_token: string`\n\n### Returns\n\n- `{ token: string; account_holder_token: string; document_type: string; entity_token: string; required_document_uploads: { token: string; accepted_entity_status_reasons: string[]; created: string; image_type: 'FRONT' | 'BACK'; rejected_entity_status_reasons: string[]; status: 'ACCEPTED' | 'REJECTED' | 'PENDING_UPLOAD' | 'UPLOADED' | 'PARTIAL_APPROVAL'; status_reasons: string[]; updated: string; upload_url: string; }[]; }`\n  Describes the document and the required document image uploads\nrequired to re-run KYC\n\n  - `token: string`\n  - `account_holder_token: string`\n  - `document_type: string`\n  - `entity_token: string`\n  - `required_document_uploads: { token: string; accepted_entity_status_reasons: string[]; created: string; image_type: 'FRONT' | 'BACK'; rejected_entity_status_reasons: string[]; status: 'ACCEPTED' | 'REJECTED' | 'PENDING_UPLOAD' | 'UPLOADED' | 'PARTIAL_APPROVAL'; status_reasons: string[]; updated: string; upload_url: string; }[]`\n\n### Example\n\n```typescript\nimport Lithic from 'lithic';\n\nconst client = new Lithic();\n\nconst document = await client.accountHolders.retrieveDocument('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', { account_holder_token: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e' });\n\nconsole.log(document);\n```",
  },
  {
    name: 'simulate_enrollment_document_review',
    endpoint: '/v1/simulate/account_holders/enrollment_document_review',
    httpMethod: 'post',
    summary: "Simulate an account holder document upload's review",
    description: 'Simulates a review for an account holder document upload.',
    stainlessPath: '(resource) account_holders > (method) simulate_enrollment_document_review',
    qualified: 'client.accountHolders.simulateEnrollmentDocumentReview',
    params: [
      'document_upload_token: string;',
      "status: 'UPLOADED' | 'ACCEPTED' | 'REJECTED' | 'PARTIAL_APPROVAL';",
      'accepted_entity_status_reasons?: string[];',
      'status_reason?: string;',
    ],
    response:
      "{ token: string; account_holder_token: string; document_type: string; entity_token: string; required_document_uploads: { token: string; accepted_entity_status_reasons: string[]; created: string; image_type: 'FRONT' | 'BACK'; rejected_entity_status_reasons: string[]; status: 'ACCEPTED' | 'REJECTED' | 'PENDING_UPLOAD' | 'UPLOADED' | 'PARTIAL_APPROVAL'; status_reasons: string[]; updated: string; upload_url: string; }[]; }",
    markdown:
      "## simulate_enrollment_document_review\n\n`client.accountHolders.simulateEnrollmentDocumentReview(document_upload_token: string, status: 'UPLOADED' | 'ACCEPTED' | 'REJECTED' | 'PARTIAL_APPROVAL', accepted_entity_status_reasons?: string[], status_reason?: string): { token: string; account_holder_token: string; document_type: string; entity_token: string; required_document_uploads: object[]; }`\n\n**post** `/v1/simulate/account_holders/enrollment_document_review`\n\nSimulates a review for an account holder document upload.\n\n### Parameters\n\n- `document_upload_token: string`\n  The account holder document upload which to perform the simulation upon.\n\n- `status: 'UPLOADED' | 'ACCEPTED' | 'REJECTED' | 'PARTIAL_APPROVAL'`\n  An account holder document's upload status for use within the simulation.\n\n- `accepted_entity_status_reasons?: string[]`\n  A list of status reasons associated with a KYB account holder in PENDING_REVIEW\n\n- `status_reason?: string`\n  Status reason that will be associated with the simulated account holder status. Only required for a `REJECTED` status or `PARTIAL_APPROVAL` status.\n\n### Returns\n\n- `{ token: string; account_holder_token: string; document_type: string; entity_token: string; required_document_uploads: { token: string; accepted_entity_status_reasons: string[]; created: string; image_type: 'FRONT' | 'BACK'; rejected_entity_status_reasons: string[]; status: 'ACCEPTED' | 'REJECTED' | 'PENDING_UPLOAD' | 'UPLOADED' | 'PARTIAL_APPROVAL'; status_reasons: string[]; updated: string; upload_url: string; }[]; }`\n  Describes the document and the required document image uploads\nrequired to re-run KYC\n\n  - `token: string`\n  - `account_holder_token: string`\n  - `document_type: string`\n  - `entity_token: string`\n  - `required_document_uploads: { token: string; accepted_entity_status_reasons: string[]; created: string; image_type: 'FRONT' | 'BACK'; rejected_entity_status_reasons: string[]; status: 'ACCEPTED' | 'REJECTED' | 'PENDING_UPLOAD' | 'UPLOADED' | 'PARTIAL_APPROVAL'; status_reasons: string[]; updated: string; upload_url: string; }[]`\n\n### Example\n\n```typescript\nimport Lithic from 'lithic';\n\nconst client = new Lithic();\n\nconst document = await client.accountHolders.simulateEnrollmentDocumentReview({ document_upload_token: 'b11cd67b-0a52-4180-8365-314f3def5426', status: 'UPLOADED' });\n\nconsole.log(document);\n```",
  },
  {
    name: 'simulate_enrollment_review',
    endpoint: '/v1/simulate/account_holders/enrollment_review',
    httpMethod: 'post',
    summary: "Simulate an account holder's enrollment review",
    description:
      ' Simulates an enrollment review for an account holder. This endpoint is only applicable for workflows that may required intervention such as `KYB_BASIC`. ',
    stainlessPath: '(resource) account_holders > (method) simulate_enrollment_review',
    qualified: 'client.accountHolders.simulateEnrollmentReview',
    params: [
      'account_holder_token?: string;',
      "status?: 'ACCEPTED' | 'REJECTED' | 'PENDING_REVIEW';",
      'status_reasons?: string[];',
    ],
    response:
      "{ token?: string; account_token?: string; beneficial_owner_individuals?: { address?: object; dob?: string; email?: string; first_name?: string; government_id?: string; last_name?: string; phone_number?: string; }[]; business_account_token?: string; business_entity?: object; control_person?: { address?: object; dob?: string; email?: string; first_name?: string; government_id?: string; last_name?: string; phone_number?: string; }; created?: string; email?: string; exemption_type?: 'AUTHORIZED_USER' | 'PREPAID_CARD_USER'; external_id?: string; individual?: { address?: object; dob?: string; email?: string; first_name?: string; government_id?: string; last_name?: string; phone_number?: string; }; naics_code?: string; nature_of_business?: string; phone_number?: string; required_documents?: object[]; status?: 'ACCEPTED' | 'PENDING_DOCUMENT' | 'PENDING_RESUBMIT' | 'REJECTED'; status_reasons?: string[]; user_type?: 'BUSINESS' | 'INDIVIDUAL'; verification_application?: { created: string; status: 'ACCEPTED' | 'PENDING_DOCUMENT' | 'PENDING_RESUBMIT' | 'REJECTED'; status_reasons: string[]; updated: string; ky_passed_at?: string; }; website_url?: string; }",
    markdown:
      "## simulate_enrollment_review\n\n`client.accountHolders.simulateEnrollmentReview(account_holder_token?: string, status?: 'ACCEPTED' | 'REJECTED' | 'PENDING_REVIEW', status_reasons?: string[]): { token?: string; account_token?: string; beneficial_owner_individuals?: object[]; business_account_token?: string; business_entity?: kyb_business_entity; control_person?: object; created?: string; email?: string; exemption_type?: 'AUTHORIZED_USER' | 'PREPAID_CARD_USER'; external_id?: string; individual?: object; naics_code?: string; nature_of_business?: string; phone_number?: string; required_documents?: required_document[]; status?: 'ACCEPTED' | 'PENDING_DOCUMENT' | 'PENDING_RESUBMIT' | 'REJECTED'; status_reasons?: string[]; user_type?: 'BUSINESS' | 'INDIVIDUAL'; verification_application?: object; website_url?: string; }`\n\n**post** `/v1/simulate/account_holders/enrollment_review`\n\n Simulates an enrollment review for an account holder. This endpoint is only applicable for workflows that may required intervention such as `KYB_BASIC`. \n\n### Parameters\n\n- `account_holder_token?: string`\n  The account holder which to perform the simulation upon.\n\n- `status?: 'ACCEPTED' | 'REJECTED' | 'PENDING_REVIEW'`\n  An account holder's status for use within the simulation.\n\n- `status_reasons?: string[]`\n  Status reason that will be associated with the simulated account holder status. Only required for a `REJECTED` status.\n\n### Returns\n\n- `{ token?: string; account_token?: string; beneficial_owner_individuals?: { address?: { address1: string; city: string; country: string; postal_code: string; state: string; address2?: string; }; dob?: string; email?: string; first_name?: string; government_id?: string; last_name?: string; phone_number?: string; }[]; business_account_token?: string; business_entity?: { address: object; government_id: string; legal_business_name: string; phone_numbers: string[]; dba_business_name?: string; parent_company?: string; }; control_person?: { address?: { address1: string; city: string; country: string; postal_code: string; state: string; address2?: string; }; dob?: string; email?: string; first_name?: string; government_id?: string; last_name?: string; phone_number?: string; }; created?: string; email?: string; exemption_type?: 'AUTHORIZED_USER' | 'PREPAID_CARD_USER'; external_id?: string; individual?: { address?: { address1: string; city: string; country: string; postal_code: string; state: string; address2?: string; }; dob?: string; email?: string; first_name?: string; government_id?: string; last_name?: string; phone_number?: string; }; naics_code?: string; nature_of_business?: string; phone_number?: string; required_documents?: { entity_token: string; status_reasons: string[]; valid_documents: string[]; }[]; status?: 'ACCEPTED' | 'PENDING_DOCUMENT' | 'PENDING_RESUBMIT' | 'REJECTED'; status_reasons?: string[]; user_type?: 'BUSINESS' | 'INDIVIDUAL'; verification_application?: { created: string; status: 'ACCEPTED' | 'PENDING_DOCUMENT' | 'PENDING_RESUBMIT' | 'REJECTED'; status_reasons: string[]; updated: string; ky_passed_at?: string; }; website_url?: string; }`\n\n  - `token?: string`\n  - `account_token?: string`\n  - `beneficial_owner_individuals?: { address?: { address1: string; city: string; country: string; postal_code: string; state: string; address2?: string; }; dob?: string; email?: string; first_name?: string; government_id?: string; last_name?: string; phone_number?: string; }[]`\n  - `business_account_token?: string`\n  - `business_entity?: { address: { address1: string; city: string; country: string; postal_code: string; state: string; address2?: string; }; government_id: string; legal_business_name: string; phone_numbers: string[]; dba_business_name?: string; parent_company?: string; }`\n  - `control_person?: { address?: { address1: string; city: string; country: string; postal_code: string; state: string; address2?: string; }; dob?: string; email?: string; first_name?: string; government_id?: string; last_name?: string; phone_number?: string; }`\n  - `created?: string`\n  - `email?: string`\n  - `exemption_type?: 'AUTHORIZED_USER' | 'PREPAID_CARD_USER'`\n  - `external_id?: string`\n  - `individual?: { address?: { address1: string; city: string; country: string; postal_code: string; state: string; address2?: string; }; dob?: string; email?: string; first_name?: string; government_id?: string; last_name?: string; phone_number?: string; }`\n  - `naics_code?: string`\n  - `nature_of_business?: string`\n  - `phone_number?: string`\n  - `required_documents?: { entity_token: string; status_reasons: string[]; valid_documents: string[]; }[]`\n  - `status?: 'ACCEPTED' | 'PENDING_DOCUMENT' | 'PENDING_RESUBMIT' | 'REJECTED'`\n  - `status_reasons?: string[]`\n  - `user_type?: 'BUSINESS' | 'INDIVIDUAL'`\n  - `verification_application?: { created: string; status: 'ACCEPTED' | 'PENDING_DOCUMENT' | 'PENDING_RESUBMIT' | 'REJECTED'; status_reasons: string[]; updated: string; ky_passed_at?: string; }`\n  - `website_url?: string`\n\n### Example\n\n```typescript\nimport Lithic from 'lithic';\n\nconst client = new Lithic();\n\nconst response = await client.accountHolders.simulateEnrollmentReview();\n\nconsole.log(response);\n```",
  },
  {
    name: 'upload_document',
    endpoint: '/v1/account_holders/{account_holder_token}/documents',
    httpMethod: 'post',
    summary: 'Initiate account holder document upload',
    description:
      'Use this endpoint to identify which type of supported government-issued documentation you will upload for further verification.\nIt will return two URLs to upload your document images to - one for the front image and one for the back image.\n\nThis endpoint is only valid for evaluations in a `PENDING_DOCUMENT` state.\n\nSupported file types include `jpg`, `png`, and `pdf`. Each file must be less than 15 MiB. Once both required uploads have been successfully completed, your document will be run through KYC verification.\n\nIf you have registered a webhook, you will receive evaluation updates for any document submission evaluations, as well as for any failed document uploads.\n\nTwo document submission attempts are permitted via this endpoint before a `REJECTED` status is returned and the account creation process is ended. Currently only one type of\naccount holder document is supported per KYC verification.\n',
    stainlessPath: '(resource) account_holders > (method) upload_document',
    qualified: 'client.accountHolders.uploadDocument',
    params: ['account_holder_token: string;', 'document_type: string;', 'entity_token: string;'],
    response:
      "{ token: string; account_holder_token: string; document_type: string; entity_token: string; required_document_uploads: { token: string; accepted_entity_status_reasons: string[]; created: string; image_type: 'FRONT' | 'BACK'; rejected_entity_status_reasons: string[]; status: 'ACCEPTED' | 'REJECTED' | 'PENDING_UPLOAD' | 'UPLOADED' | 'PARTIAL_APPROVAL'; status_reasons: string[]; updated: string; upload_url: string; }[]; }",
    markdown:
      "## upload_document\n\n`client.accountHolders.uploadDocument(account_holder_token: string, document_type: string, entity_token: string): { token: string; account_holder_token: string; document_type: string; entity_token: string; required_document_uploads: object[]; }`\n\n**post** `/v1/account_holders/{account_holder_token}/documents`\n\nUse this endpoint to identify which type of supported government-issued documentation you will upload for further verification.\nIt will return two URLs to upload your document images to - one for the front image and one for the back image.\n\nThis endpoint is only valid for evaluations in a `PENDING_DOCUMENT` state.\n\nSupported file types include `jpg`, `png`, and `pdf`. Each file must be less than 15 MiB. Once both required uploads have been successfully completed, your document will be run through KYC verification.\n\nIf you have registered a webhook, you will receive evaluation updates for any document submission evaluations, as well as for any failed document uploads.\n\nTwo document submission attempts are permitted via this endpoint before a `REJECTED` status is returned and the account creation process is ended. Currently only one type of\naccount holder document is supported per KYC verification.\n\n\n### Parameters\n\n- `account_holder_token: string`\n\n- `document_type: string`\n  The type of document to upload\n\n- `entity_token: string`\n  Globally unique identifier for the entity.\n\n### Returns\n\n- `{ token: string; account_holder_token: string; document_type: string; entity_token: string; required_document_uploads: { token: string; accepted_entity_status_reasons: string[]; created: string; image_type: 'FRONT' | 'BACK'; rejected_entity_status_reasons: string[]; status: 'ACCEPTED' | 'REJECTED' | 'PENDING_UPLOAD' | 'UPLOADED' | 'PARTIAL_APPROVAL'; status_reasons: string[]; updated: string; upload_url: string; }[]; }`\n  Describes the document and the required document image uploads\nrequired to re-run KYC\n\n  - `token: string`\n  - `account_holder_token: string`\n  - `document_type: string`\n  - `entity_token: string`\n  - `required_document_uploads: { token: string; accepted_entity_status_reasons: string[]; created: string; image_type: 'FRONT' | 'BACK'; rejected_entity_status_reasons: string[]; status: 'ACCEPTED' | 'REJECTED' | 'PENDING_UPLOAD' | 'UPLOADED' | 'PARTIAL_APPROVAL'; status_reasons: string[]; updated: string; upload_url: string; }[]`\n\n### Example\n\n```typescript\nimport Lithic from 'lithic';\n\nconst client = new Lithic();\n\nconst document = await client.accountHolders.uploadDocument('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', { document_type: 'EIN_LETTER', entity_token: '83cf25ae-c14f-4d10-9fa2-0119f36c7286' });\n\nconsole.log(document);\n```",
  },
  {
    name: 'create',
    endpoint: '/v1/account_holders/{account_holder_token}/entities',
    httpMethod: 'post',
    summary: 'Create a new beneficial owner individual or replace the existing control person entity',
    description:
      'Create a new beneficial owner individual or replace the control person entity on an existing KYB account holder. This endpoint is only applicable for account holders enrolled through a KYB workflow with the Persona KYB provider.\nA new control person can only replace the existing one. A maximum of 4 beneficial owners can be associated with an account holder.',
    stainlessPath: '(resource) account_holders.entities > (method) create',
    qualified: 'client.accountHolders.entities.create',
    params: [
      'account_holder_token: string;',
      'address: { address1: string; city: string; country: string; postal_code: string; state: string; address2?: string; };',
      'dob: string;',
      'email: string;',
      'first_name: string;',
      'government_id: string;',
      'last_name: string;',
      'phone_number: string;',
      "type: 'BENEFICIAL_OWNER_INDIVIDUAL' | 'CONTROL_PERSON';",
    ],
    response:
      "{ token: string; account_holder_token: string; created: string; required_documents: { entity_token: string; status_reasons: string[]; valid_documents: string[]; }[]; status: 'ACCEPTED' | 'INACTIVE' | 'PENDING_REVIEW' | 'REJECTED'; status_reasons: string[]; }",
    markdown:
      "## create\n\n`client.accountHolders.entities.create(account_holder_token: string, address: { address1: string; city: string; country: string; postal_code: string; state: string; address2?: string; }, dob: string, email: string, first_name: string, government_id: string, last_name: string, phone_number: string, type: 'BENEFICIAL_OWNER_INDIVIDUAL' | 'CONTROL_PERSON'): { token: string; account_holder_token: string; created: string; required_documents: required_document[]; status: 'ACCEPTED' | 'INACTIVE' | 'PENDING_REVIEW' | 'REJECTED'; status_reasons: string[]; }`\n\n**post** `/v1/account_holders/{account_holder_token}/entities`\n\nCreate a new beneficial owner individual or replace the control person entity on an existing KYB account holder. This endpoint is only applicable for account holders enrolled through a KYB workflow with the Persona KYB provider.\nA new control person can only replace the existing one. A maximum of 4 beneficial owners can be associated with an account holder.\n\n### Parameters\n\n- `account_holder_token: string`\n\n- `address: { address1: string; city: string; country: string; postal_code: string; state: string; address2?: string; }`\n  Individual's current address - PO boxes, UPS drops, and FedEx drops are not acceptable; APO/FPO are acceptable. Only USA addresses are currently supported.\n  - `address1: string`\n    Valid deliverable address (no PO boxes).\n  - `city: string`\n    Name of city.\n  - `country: string`\n    Valid country code. Only USA is currently supported, entered in uppercase ISO 3166-1 alpha-3 three-character format.\n  - `postal_code: string`\n    Valid postal code. Only USA ZIP codes are currently supported, entered as a five-digit ZIP or nine-digit ZIP+4.\n  - `state: string`\n    Valid state code. Only USA state codes are currently supported, entered in uppercase ISO 3166-2 two-character format.\n  - `address2?: string`\n    Unit or apartment number (if applicable).\n\n- `dob: string`\n  Individual's date of birth, as an RFC 3339 date.\n\n- `email: string`\n  Individual's email address. If utilizing Lithic for chargeback processing, this customer email address may be used to communicate dispute status and resolution.\n\n- `first_name: string`\n  Individual's first name, as it appears on government-issued identity documents.\n\n- `government_id: string`\n  Government-issued identification number (required for identity verification and compliance with banking regulations). Social Security Numbers (SSN) and Individual Taxpayer Identification Numbers (ITIN) are currently supported, entered as full nine-digits, with or without hyphens\n\n- `last_name: string`\n  Individual's last name, as it appears on government-issued identity documents.\n\n- `phone_number: string`\n  Individual's phone number, entered in E.164 format.\n\n- `type: 'BENEFICIAL_OWNER_INDIVIDUAL' | 'CONTROL_PERSON'`\n  The type of entity to create on the account holder\n\n### Returns\n\n- `{ token: string; account_holder_token: string; created: string; required_documents: { entity_token: string; status_reasons: string[]; valid_documents: string[]; }[]; status: 'ACCEPTED' | 'INACTIVE' | 'PENDING_REVIEW' | 'REJECTED'; status_reasons: string[]; }`\n  Response body for creating a new beneficial owner or replacing the control person entity on an existing KYB account holder.\n\n  - `token: string`\n  - `account_holder_token: string`\n  - `created: string`\n  - `required_documents: { entity_token: string; status_reasons: string[]; valid_documents: string[]; }[]`\n  - `status: 'ACCEPTED' | 'INACTIVE' | 'PENDING_REVIEW' | 'REJECTED'`\n  - `status_reasons: string[]`\n\n### Example\n\n```typescript\nimport Lithic from 'lithic';\n\nconst client = new Lithic();\n\nconst entity = await client.accountHolders.entities.create('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {\n  address: {\n  address1: '300 Normal Forest Way',\n  city: 'Portland',\n  country: 'USA',\n  postal_code: '90210',\n  state: 'OR',\n},\n  dob: '1991-03-08T08:00:00Z',\n  email: 'tim@left-earth.com',\n  first_name: 'Timmy',\n  government_id: '211-23-1412',\n  last_name: 'Turner',\n  phone_number: '+15555555555',\n  type: 'BENEFICIAL_OWNER_INDIVIDUAL',\n});\n\nconsole.log(entity);\n```",
  },
  {
    name: 'delete',
    endpoint: '/v1/account_holders/{account_holder_token}/entities/{entity_token}',
    httpMethod: 'delete',
    summary: 'Deactivate a beneficial owner individual',
    description:
      'Deactivate a beneficial owner individual on an existing KYB account holder. Only beneficial owner individuals can be deactivated.',
    stainlessPath: '(resource) account_holders.entities > (method) delete',
    qualified: 'client.accountHolders.entities.delete',
    params: ['account_holder_token: string;', 'entity_token: string;'],
    response:
      "{ token: string; account_holder_token: string; address: { address1: string; city: string; country: string; postal_code: string; state: string; address2?: string; }; dob: string; email: string; first_name: string; last_name: string; phone_number: string; status: 'ACCEPTED' | 'INACTIVE' | 'PENDING_REVIEW' | 'REJECTED'; type: 'BENEFICIAL_OWNER_INDIVIDUAL' | 'CONTROL_PERSON'; }",
    markdown:
      "## delete\n\n`client.accountHolders.entities.delete(account_holder_token: string, entity_token: string): { token: string; account_holder_token: string; address: object; dob: string; email: string; first_name: string; last_name: string; phone_number: string; status: 'ACCEPTED' | 'INACTIVE' | 'PENDING_REVIEW' | 'REJECTED'; type: 'BENEFICIAL_OWNER_INDIVIDUAL' | 'CONTROL_PERSON'; }`\n\n**delete** `/v1/account_holders/{account_holder_token}/entities/{entity_token}`\n\nDeactivate a beneficial owner individual on an existing KYB account holder. Only beneficial owner individuals can be deactivated.\n\n### Parameters\n\n- `account_holder_token: string`\n\n- `entity_token: string`\n\n### Returns\n\n- `{ token: string; account_holder_token: string; address: { address1: string; city: string; country: string; postal_code: string; state: string; address2?: string; }; dob: string; email: string; first_name: string; last_name: string; phone_number: string; status: 'ACCEPTED' | 'INACTIVE' | 'PENDING_REVIEW' | 'REJECTED'; type: 'BENEFICIAL_OWNER_INDIVIDUAL' | 'CONTROL_PERSON'; }`\n  Information about an entity associated with an account holder\n\n  - `token: string`\n  - `account_holder_token: string`\n  - `address: { address1: string; city: string; country: string; postal_code: string; state: string; address2?: string; }`\n  - `dob: string`\n  - `email: string`\n  - `first_name: string`\n  - `last_name: string`\n  - `phone_number: string`\n  - `status: 'ACCEPTED' | 'INACTIVE' | 'PENDING_REVIEW' | 'REJECTED'`\n  - `type: 'BENEFICIAL_OWNER_INDIVIDUAL' | 'CONTROL_PERSON'`\n\n### Example\n\n```typescript\nimport Lithic from 'lithic';\n\nconst client = new Lithic();\n\nconst accountHolderEntity = await client.accountHolders.entities.delete('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', { account_holder_token: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e' });\n\nconsole.log(accountHolderEntity);\n```",
  },
  {
    name: 'create',
    endpoint: '/v2/auth_rules',
    httpMethod: 'post',
    summary: 'Create a new rule',
    description: 'Creates a new V2 Auth rule in draft mode',
    stainlessPath: '(resource) auth_rules.v2 > (method) create',
    qualified: 'client.authRules.v2.create',
    params: [
      "{ parameters: { conditions: object[]; } | { period: object | object | object | object | object; scope: 'CARD' | 'ACCOUNT'; filters?: object; limit_amount?: number; limit_count?: number; } | { merchants: { comment?: string; descriptor?: string; merchant_id?: string; }[]; } | { action: 'DECLINE' | 'CHALLENGE'; conditions: { attribute: string; operation: conditional_operation; value: conditional_value; }[]; } | { action: 'DECLINE' | 'CHALLENGE'; conditions: { attribute: string; operation: conditional_operation; value: conditional_value; }[]; } | { action: { type: 'APPROVE'; } | { code: string; type: 'RETURN'; }; conditions: { attribute: 'COMPANY_NAME' | 'COMPANY_ID' | 'TIMESTAMP' | 'TRANSACTION_AMOUNT' | 'SEC_CODE' | 'MEMO'; operation: conditional_operation; value: conditional_value; }[]; } | { action: { type: 'DECLINE'; reason?: string; } | { type: 'REQUIRE_TFA'; reason?: string; }; conditions: { attribute: string; operation: conditional_operation; value: conditional_value; }[]; } | { code: string; features: object | object | object | object | object | object | object | object[]; }; type: 'CONDITIONAL_BLOCK' | 'VELOCITY_LIMIT' | 'MERCHANT_LOCK' | 'CONDITIONAL_ACTION' | 'TYPESCRIPT_CODE'; account_tokens?: string[]; business_account_tokens?: string[]; event_stream?: string; name?: string; } | { card_tokens: string[]; parameters: { conditions: object[]; } | { period: object | object | object | object | object; scope: 'CARD' | 'ACCOUNT'; filters?: object; limit_amount?: number; limit_count?: number; } | { merchants: { comment?: string; descriptor?: string; merchant_id?: string; }[]; } | { action: 'DECLINE' | 'CHALLENGE'; conditions: { attribute: string; operation: conditional_operation; value: conditional_value; }[]; } | { action: 'DECLINE' | 'CHALLENGE'; conditions: { attribute: string; operation: conditional_operation; value: conditional_value; }[]; } | { action: { type: 'APPROVE'; } | { code: string; type: 'RETURN'; }; conditions: { attribute: 'COMPANY_NAME' | 'COMPANY_ID' | 'TIMESTAMP' | 'TRANSACTION_AMOUNT' | 'SEC_CODE' | 'MEMO'; operation: conditional_operation; value: conditional_value; }[]; } | { action: { type: 'DECLINE'; reason?: string; } | { type: 'REQUIRE_TFA'; reason?: string; }; conditions: { attribute: string; operation: conditional_operation; value: conditional_value; }[]; } | { code: string; features: object | object | object | object | object | object | object | object[]; }; type: 'CONDITIONAL_BLOCK' | 'VELOCITY_LIMIT' | 'MERCHANT_LOCK' | 'CONDITIONAL_ACTION' | 'TYPESCRIPT_CODE'; event_stream?: string; name?: string; } | { parameters: { conditions: object[]; } | { period: object | object | object | object | object; scope: 'CARD' | 'ACCOUNT'; filters?: object; limit_amount?: number; limit_count?: number; } | { merchants: { comment?: string; descriptor?: string; merchant_id?: string; }[]; } | { action: 'DECLINE' | 'CHALLENGE'; conditions: { attribute: string; operation: conditional_operation; value: conditional_value; }[]; } | { action: 'DECLINE' | 'CHALLENGE'; conditions: { attribute: string; operation: conditional_operation; value: conditional_value; }[]; } | { action: { type: 'APPROVE'; } | { code: string; type: 'RETURN'; }; conditions: { attribute: 'COMPANY_NAME' | 'COMPANY_ID' | 'TIMESTAMP' | 'TRANSACTION_AMOUNT' | 'SEC_CODE' | 'MEMO'; operation: conditional_operation; value: conditional_value; }[]; } | { action: { type: 'DECLINE'; reason?: string; } | { type: 'REQUIRE_TFA'; reason?: string; }; conditions: { attribute: string; operation: conditional_operation; value: conditional_value; }[]; } | { code: string; features: object | object | object | object | object | object | object | object[]; }; program_level: boolean; type: 'CONDITIONAL_BLOCK' | 'VELOCITY_LIMIT' | 'MERCHANT_LOCK' | 'CONDITIONAL_ACTION' | 'TYPESCRIPT_CODE'; event_stream?: string; excluded_account_tokens?: string[]; excluded_business_account_tokens?: string[]; excluded_card_tokens?: string[]; name?: string; };",
    ],
    response:
      "{ token: string; account_tokens: string[]; business_account_tokens: string[]; card_tokens: string[]; current_version: { parameters: object | object | object | object | object | object | object | object; version: number; }; draft_version: { error: string; parameters: object | object | object | object | object | object | object | object; state: 'PENDING' | 'SHADOWING' | 'ERROR'; version: number; }; event_stream: string; lithic_managed: boolean; name: string; program_level: boolean; state: 'ACTIVE' | 'INACTIVE'; type: 'CONDITIONAL_BLOCK' | 'VELOCITY_LIMIT' | 'MERCHANT_LOCK' | 'CONDITIONAL_ACTION' | 'TYPESCRIPT_CODE'; excluded_account_tokens?: string[]; excluded_business_account_tokens?: string[]; excluded_card_tokens?: string[]; }",
  },
  {
    name: 'retrieve',
    endpoint: '/v2/auth_rules/{auth_rule_token}',
    httpMethod: 'get',
    summary: 'Fetch a rule',
    description: 'Fetches a V2 Auth rule by its token',
    stainlessPath: '(resource) auth_rules.v2 > (method) retrieve',
    qualified: 'client.authRules.v2.retrieve',
    params: ['auth_rule_token: string;'],
    response:
      "{ token: string; account_tokens: string[]; business_account_tokens: string[]; card_tokens: string[]; current_version: { parameters: object | object | object | object | object | object | object | object; version: number; }; draft_version: { error: string; parameters: object | object | object | object | object | object | object | object; state: 'PENDING' | 'SHADOWING' | 'ERROR'; version: number; }; event_stream: string; lithic_managed: boolean; name: string; program_level: boolean; state: 'ACTIVE' | 'INACTIVE'; type: 'CONDITIONAL_BLOCK' | 'VELOCITY_LIMIT' | 'MERCHANT_LOCK' | 'CONDITIONAL_ACTION' | 'TYPESCRIPT_CODE'; excluded_account_tokens?: string[]; excluded_business_account_tokens?: string[]; excluded_card_tokens?: string[]; }",
    markdown:
      "## retrieve\n\n`client.authRules.v2.retrieve(auth_rule_token: string): { token: string; account_tokens: string[]; business_account_tokens: string[]; card_tokens: string[]; current_version: object; draft_version: object; event_stream: event_stream; lithic_managed: boolean; name: string; program_level: boolean; state: 'ACTIVE' | 'INACTIVE'; type: 'CONDITIONAL_BLOCK' | 'VELOCITY_LIMIT' | 'MERCHANT_LOCK' | 'CONDITIONAL_ACTION' | 'TYPESCRIPT_CODE'; excluded_account_tokens?: string[]; excluded_business_account_tokens?: string[]; excluded_card_tokens?: string[]; }`\n\n**get** `/v2/auth_rules/{auth_rule_token}`\n\nFetches a V2 Auth rule by its token\n\n### Parameters\n\n- `auth_rule_token: string`\n\n### Returns\n\n- `{ token: string; account_tokens: string[]; business_account_tokens: string[]; card_tokens: string[]; current_version: { parameters: object | object | object | object | object | object | object | object; version: number; }; draft_version: { error: string; parameters: object | object | object | object | object | object | object | object; state: 'PENDING' | 'SHADOWING' | 'ERROR'; version: number; }; event_stream: string; lithic_managed: boolean; name: string; program_level: boolean; state: 'ACTIVE' | 'INACTIVE'; type: 'CONDITIONAL_BLOCK' | 'VELOCITY_LIMIT' | 'MERCHANT_LOCK' | 'CONDITIONAL_ACTION' | 'TYPESCRIPT_CODE'; excluded_account_tokens?: string[]; excluded_business_account_tokens?: string[]; excluded_card_tokens?: string[]; }`\n\n  - `token: string`\n  - `account_tokens: string[]`\n  - `business_account_tokens: string[]`\n  - `card_tokens: string[]`\n  - `current_version: { parameters: { conditions: object[]; } | { period: object | object | object | object | object; scope: 'CARD' | 'ACCOUNT'; filters?: object; limit_amount?: number; limit_count?: number; } | { merchants: { comment?: string; descriptor?: string; merchant_id?: string; }[]; } | { action: 'DECLINE' | 'CHALLENGE'; conditions: { attribute: string; operation: conditional_operation; value: conditional_value; }[]; } | { action: 'DECLINE' | 'CHALLENGE'; conditions: { attribute: string; operation: conditional_operation; value: conditional_value; }[]; } | { action: { type: 'APPROVE'; } | { code: string; type: 'RETURN'; }; conditions: { attribute: 'COMPANY_NAME' | 'COMPANY_ID' | 'TIMESTAMP' | 'TRANSACTION_AMOUNT' | 'SEC_CODE' | 'MEMO'; operation: conditional_operation; value: conditional_value; }[]; } | { action: { type: 'DECLINE'; reason?: string; } | { type: 'REQUIRE_TFA'; reason?: string; }; conditions: { attribute: string; operation: conditional_operation; value: conditional_value; }[]; } | { code: string; features: object | object | object | object | object | object | object | object[]; }; version: number; }`\n  - `draft_version: { error: string; parameters: { conditions: object[]; } | { period: object | object | object | object | object; scope: 'CARD' | 'ACCOUNT'; filters?: object; limit_amount?: number; limit_count?: number; } | { merchants: { comment?: string; descriptor?: string; merchant_id?: string; }[]; } | { action: 'DECLINE' | 'CHALLENGE'; conditions: { attribute: string; operation: conditional_operation; value: conditional_value; }[]; } | { action: 'DECLINE' | 'CHALLENGE'; conditions: { attribute: string; operation: conditional_operation; value: conditional_value; }[]; } | { action: { type: 'APPROVE'; } | { code: string; type: 'RETURN'; }; conditions: { attribute: 'COMPANY_NAME' | 'COMPANY_ID' | 'TIMESTAMP' | 'TRANSACTION_AMOUNT' | 'SEC_CODE' | 'MEMO'; operation: conditional_operation; value: conditional_value; }[]; } | { action: { type: 'DECLINE'; reason?: string; } | { type: 'REQUIRE_TFA'; reason?: string; }; conditions: { attribute: string; operation: conditional_operation; value: conditional_value; }[]; } | { code: string; features: object | object | object | object | object | object | object | object[]; }; state: 'PENDING' | 'SHADOWING' | 'ERROR'; version: number; }`\n  - `event_stream: string`\n  - `lithic_managed: boolean`\n  - `name: string`\n  - `program_level: boolean`\n  - `state: 'ACTIVE' | 'INACTIVE'`\n  - `type: 'CONDITIONAL_BLOCK' | 'VELOCITY_LIMIT' | 'MERCHANT_LOCK' | 'CONDITIONAL_ACTION' | 'TYPESCRIPT_CODE'`\n  - `excluded_account_tokens?: string[]`\n  - `excluded_business_account_tokens?: string[]`\n  - `excluded_card_tokens?: string[]`\n\n### Example\n\n```typescript\nimport Lithic from 'lithic';\n\nconst client = new Lithic();\n\nconst authRule = await client.authRules.v2.retrieve('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e');\n\nconsole.log(authRule);\n```",
  },
  {
    name: 'update',
    endpoint: '/v2/auth_rules/{auth_rule_token}',
    httpMethod: 'patch',
    summary: 'Update a rule',
    description:
      "Updates a V2 Auth rule's properties\n\nIf `account_tokens`, `card_tokens`, `program_level`, `excluded_card_tokens`, `excluded_account_tokens`, or `excluded_business_account_tokens` is provided, this will replace existing associations with the provided list of entities.\n",
    stainlessPath: '(resource) auth_rules.v2 > (method) update',
    qualified: 'client.authRules.v2.update',
    params: [
      'auth_rule_token: string;',
      "body: { account_tokens?: string[]; business_account_tokens?: string[]; name?: string; state?: 'INACTIVE'; } | { card_tokens?: string[]; name?: string; state?: 'INACTIVE'; } | { excluded_account_tokens?: string[]; excluded_business_account_tokens?: string[]; excluded_card_tokens?: string[]; name?: string; program_level?: boolean; state?: 'INACTIVE'; };",
    ],
    response:
      "{ token: string; account_tokens: string[]; business_account_tokens: string[]; card_tokens: string[]; current_version: { parameters: object | object | object | object | object | object | object | object; version: number; }; draft_version: { error: string; parameters: object | object | object | object | object | object | object | object; state: 'PENDING' | 'SHADOWING' | 'ERROR'; version: number; }; event_stream: string; lithic_managed: boolean; name: string; program_level: boolean; state: 'ACTIVE' | 'INACTIVE'; type: 'CONDITIONAL_BLOCK' | 'VELOCITY_LIMIT' | 'MERCHANT_LOCK' | 'CONDITIONAL_ACTION' | 'TYPESCRIPT_CODE'; excluded_account_tokens?: string[]; excluded_business_account_tokens?: string[]; excluded_card_tokens?: string[]; }",
  },
  {
    name: 'list',
    endpoint: '/v2/auth_rules',
    httpMethod: 'get',
    summary: 'List rules',
    description: 'Lists V2 Auth rules',
    stainlessPath: '(resource) auth_rules.v2 > (method) list',
    qualified: 'client.authRules.v2.list',
    params: [
      'account_token?: string;',
      'business_account_token?: string;',
      'card_token?: string;',
      'ending_before?: string;',
      'event_stream?: string;',
      'event_streams?: string[];',
      'page_size?: number;',
      "scope?: 'PROGRAM' | 'ACCOUNT' | 'BUSINESS_ACCOUNT' | 'CARD' | 'ANY';",
      'starting_after?: string;',
    ],
    response:
      "{ token: string; account_tokens: string[]; business_account_tokens: string[]; card_tokens: string[]; current_version: { parameters: object | object | object | object | object | object | object | object; version: number; }; draft_version: { error: string; parameters: object | object | object | object | object | object | object | object; state: 'PENDING' | 'SHADOWING' | 'ERROR'; version: number; }; event_stream: string; lithic_managed: boolean; name: string; program_level: boolean; state: 'ACTIVE' | 'INACTIVE'; type: 'CONDITIONAL_BLOCK' | 'VELOCITY_LIMIT' | 'MERCHANT_LOCK' | 'CONDITIONAL_ACTION' | 'TYPESCRIPT_CODE'; excluded_account_tokens?: string[]; excluded_business_account_tokens?: string[]; excluded_card_tokens?: string[]; }",
    markdown:
      "## list\n\n`client.authRules.v2.list(account_token?: string, business_account_token?: string, card_token?: string, ending_before?: string, event_stream?: string, event_streams?: string[], page_size?: number, scope?: 'PROGRAM' | 'ACCOUNT' | 'BUSINESS_ACCOUNT' | 'CARD' | 'ANY', starting_after?: string): { token: string; account_tokens: string[]; business_account_tokens: string[]; card_tokens: string[]; current_version: object; draft_version: object; event_stream: event_stream; lithic_managed: boolean; name: string; program_level: boolean; state: 'ACTIVE' | 'INACTIVE'; type: 'CONDITIONAL_BLOCK' | 'VELOCITY_LIMIT' | 'MERCHANT_LOCK' | 'CONDITIONAL_ACTION' | 'TYPESCRIPT_CODE'; excluded_account_tokens?: string[]; excluded_business_account_tokens?: string[]; excluded_card_tokens?: string[]; }`\n\n**get** `/v2/auth_rules`\n\nLists V2 Auth rules\n\n### Parameters\n\n- `account_token?: string`\n  Only return Auth Rules that are bound to the provided account token.\n\n- `business_account_token?: string`\n  Only return Auth Rules that are bound to the provided business account token.\n\n- `card_token?: string`\n  Only return Auth Rules that are bound to the provided card token.\n\n- `ending_before?: string`\n  A cursor representing an item's token before which a page of results should end. Used to retrieve the previous page of results before this item.\n\n- `event_stream?: string`\n  Deprecated: Use event_streams instead. Only return Auth rules that are executed during the provided event stream.\n\n- `event_streams?: string[]`\n  Only return Auth rules that are executed during any of the provided event streams. If event_streams and event_stream are specified, the values will be combined.\n\n- `page_size?: number`\n  Page size (for pagination).\n\n- `scope?: 'PROGRAM' | 'ACCOUNT' | 'BUSINESS_ACCOUNT' | 'CARD' | 'ANY'`\n  Only return Auth Rules that are bound to the provided scope.\n\n- `starting_after?: string`\n  A cursor representing an item's token after which a page of results should begin. Used to retrieve the next page of results after this item.\n\n### Returns\n\n- `{ token: string; account_tokens: string[]; business_account_tokens: string[]; card_tokens: string[]; current_version: { parameters: object | object | object | object | object | object | object | object; version: number; }; draft_version: { error: string; parameters: object | object | object | object | object | object | object | object; state: 'PENDING' | 'SHADOWING' | 'ERROR'; version: number; }; event_stream: string; lithic_managed: boolean; name: string; program_level: boolean; state: 'ACTIVE' | 'INACTIVE'; type: 'CONDITIONAL_BLOCK' | 'VELOCITY_LIMIT' | 'MERCHANT_LOCK' | 'CONDITIONAL_ACTION' | 'TYPESCRIPT_CODE'; excluded_account_tokens?: string[]; excluded_business_account_tokens?: string[]; excluded_card_tokens?: string[]; }`\n\n  - `token: string`\n  - `account_tokens: string[]`\n  - `business_account_tokens: string[]`\n  - `card_tokens: string[]`\n  - `current_version: { parameters: { conditions: object[]; } | { period: object | object | object | object | object; scope: 'CARD' | 'ACCOUNT'; filters?: object; limit_amount?: number; limit_count?: number; } | { merchants: { comment?: string; descriptor?: string; merchant_id?: string; }[]; } | { action: 'DECLINE' | 'CHALLENGE'; conditions: { attribute: string; operation: conditional_operation; value: conditional_value; }[]; } | { action: 'DECLINE' | 'CHALLENGE'; conditions: { attribute: string; operation: conditional_operation; value: conditional_value; }[]; } | { action: { type: 'APPROVE'; } | { code: string; type: 'RETURN'; }; conditions: { attribute: 'COMPANY_NAME' | 'COMPANY_ID' | 'TIMESTAMP' | 'TRANSACTION_AMOUNT' | 'SEC_CODE' | 'MEMO'; operation: conditional_operation; value: conditional_value; }[]; } | { action: { type: 'DECLINE'; reason?: string; } | { type: 'REQUIRE_TFA'; reason?: string; }; conditions: { attribute: string; operation: conditional_operation; value: conditional_value; }[]; } | { code: string; features: object | object | object | object | object | object | object | object[]; }; version: number; }`\n  - `draft_version: { error: string; parameters: { conditions: object[]; } | { period: object | object | object | object | object; scope: 'CARD' | 'ACCOUNT'; filters?: object; limit_amount?: number; limit_count?: number; } | { merchants: { comment?: string; descriptor?: string; merchant_id?: string; }[]; } | { action: 'DECLINE' | 'CHALLENGE'; conditions: { attribute: string; operation: conditional_operation; value: conditional_value; }[]; } | { action: 'DECLINE' | 'CHALLENGE'; conditions: { attribute: string; operation: conditional_operation; value: conditional_value; }[]; } | { action: { type: 'APPROVE'; } | { code: string; type: 'RETURN'; }; conditions: { attribute: 'COMPANY_NAME' | 'COMPANY_ID' | 'TIMESTAMP' | 'TRANSACTION_AMOUNT' | 'SEC_CODE' | 'MEMO'; operation: conditional_operation; value: conditional_value; }[]; } | { action: { type: 'DECLINE'; reason?: string; } | { type: 'REQUIRE_TFA'; reason?: string; }; conditions: { attribute: string; operation: conditional_operation; value: conditional_value; }[]; } | { code: string; features: object | object | object | object | object | object | object | object[]; }; state: 'PENDING' | 'SHADOWING' | 'ERROR'; version: number; }`\n  - `event_stream: string`\n  - `lithic_managed: boolean`\n  - `name: string`\n  - `program_level: boolean`\n  - `state: 'ACTIVE' | 'INACTIVE'`\n  - `type: 'CONDITIONAL_BLOCK' | 'VELOCITY_LIMIT' | 'MERCHANT_LOCK' | 'CONDITIONAL_ACTION' | 'TYPESCRIPT_CODE'`\n  - `excluded_account_tokens?: string[]`\n  - `excluded_business_account_tokens?: string[]`\n  - `excluded_card_tokens?: string[]`\n\n### Example\n\n```typescript\nimport Lithic from 'lithic';\n\nconst client = new Lithic();\n\n// Automatically fetches more pages as needed.\nfor await (const authRule of client.authRules.v2.list()) {\n  console.log(authRule);\n}\n```",
  },
  {
    name: 'delete',
    endpoint: '/v2/auth_rules/{auth_rule_token}',
    httpMethod: 'delete',
    summary: 'Delete a rule',
    description: 'Deletes a V2 Auth rule',
    stainlessPath: '(resource) auth_rules.v2 > (method) delete',
    qualified: 'client.authRules.v2.delete',
    params: ['auth_rule_token: string;'],
    markdown:
      "## delete\n\n`client.authRules.v2.delete(auth_rule_token: string): void`\n\n**delete** `/v2/auth_rules/{auth_rule_token}`\n\nDeletes a V2 Auth rule\n\n### Parameters\n\n- `auth_rule_token: string`\n\n### Example\n\n```typescript\nimport Lithic from 'lithic';\n\nconst client = new Lithic();\n\nawait client.authRules.v2.delete('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e')\n```",
  },
  {
    name: 'draft',
    endpoint: '/v2/auth_rules/{auth_rule_token}/draft',
    httpMethod: 'post',
    summary: 'Draft a new rule version',
    description:
      'Creates a new draft version of a rule that will be ran in shadow mode.\n\nThis can also be utilized to reset the draft parameters, causing a draft version to no longer be ran in shadow mode.\n',
    stainlessPath: '(resource) auth_rules.v2 > (method) draft',
    qualified: 'client.authRules.v2.draft',
    params: [
      'auth_rule_token: string;',
      "parameters?: { conditions: { attribute: conditional_attribute; operation: conditional_operation; value: conditional_value; }[]; } | { period: { duration: number; type: 'CUSTOM'; } | { type: 'DAY'; } | { type: 'WEEK'; day_of_week?: number; } | { type: 'MONTH'; day_of_month?: number; } | { type: 'YEAR'; day_of_month?: number; month?: number; }; scope: 'CARD' | 'ACCOUNT'; filters?: { exclude_countries?: string[]; exclude_mccs?: string[]; include_countries?: string[]; include_mccs?: string[]; include_pan_entry_modes?: string[]; }; limit_amount?: number; limit_count?: number; } | { merchants: { comment?: string; descriptor?: string; merchant_id?: string; }[]; } | { action: 'DECLINE' | 'CHALLENGE'; conditions: { attribute: string; operation: string; value: string | number | string[] | string; }[]; } | { action: 'DECLINE' | 'CHALLENGE'; conditions: { attribute: string; operation: string; value: string | number | string[] | string; }[]; } | { action: { type: 'APPROVE'; } | { code: string; type: 'RETURN'; }; conditions: { attribute: 'COMPANY_NAME' | 'COMPANY_ID' | 'TIMESTAMP' | 'TRANSACTION_AMOUNT' | 'SEC_CODE' | 'MEMO'; operation: string; value: string | number | string[] | string; }[]; } | { action: { type: 'DECLINE'; reason?: string; } | { type: 'REQUIRE_TFA'; reason?: string; }; conditions: { attribute: string; operation: string; value: string | number | string[] | string; }[]; } | { code: string; features: { type: 'AUTHORIZATION'; name?: string; } | { type: 'AUTHENTICATION'; name?: string; } | { type: 'TOKENIZATION'; name?: string; } | { type: 'ACH_RECEIPT'; name?: string; } | { type: 'CARD'; name?: string; } | { type: 'ACCOUNT_HOLDER'; name?: string; } | { type: 'IP_METADATA'; name?: string; } | { period: velocity_limit_period; scope: 'CARD' | 'ACCOUNT'; type: 'SPEND_VELOCITY'; filters?: velocity_limit_filters; name?: string; }[]; };",
    ],
    response:
      "{ token: string; account_tokens: string[]; business_account_tokens: string[]; card_tokens: string[]; current_version: { parameters: object | object | object | object | object | object | object | object; version: number; }; draft_version: { error: string; parameters: object | object | object | object | object | object | object | object; state: 'PENDING' | 'SHADOWING' | 'ERROR'; version: number; }; event_stream: string; lithic_managed: boolean; name: string; program_level: boolean; state: 'ACTIVE' | 'INACTIVE'; type: 'CONDITIONAL_BLOCK' | 'VELOCITY_LIMIT' | 'MERCHANT_LOCK' | 'CONDITIONAL_ACTION' | 'TYPESCRIPT_CODE'; excluded_account_tokens?: string[]; excluded_business_account_tokens?: string[]; excluded_card_tokens?: string[]; }",
    markdown:
      "## draft\n\n`client.authRules.v2.draft(auth_rule_token: string, parameters?: { conditions: auth_rule_condition[]; } | { period: velocity_limit_period; scope: 'CARD' | 'ACCOUNT'; filters?: velocity_limit_filters; limit_amount?: number; limit_count?: number; } | { merchants: object[]; } | { action: 'DECLINE' | 'CHALLENGE'; conditions: object[]; } | { action: 'DECLINE' | 'CHALLENGE'; conditions: object[]; } | { action: object | object; conditions: object[]; } | { action: object | object; conditions: object[]; } | { code: string; features: rule_feature[]; }): { token: string; account_tokens: string[]; business_account_tokens: string[]; card_tokens: string[]; current_version: object; draft_version: object; event_stream: event_stream; lithic_managed: boolean; name: string; program_level: boolean; state: 'ACTIVE' | 'INACTIVE'; type: 'CONDITIONAL_BLOCK' | 'VELOCITY_LIMIT' | 'MERCHANT_LOCK' | 'CONDITIONAL_ACTION' | 'TYPESCRIPT_CODE'; excluded_account_tokens?: string[]; excluded_business_account_tokens?: string[]; excluded_card_tokens?: string[]; }`\n\n**post** `/v2/auth_rules/{auth_rule_token}/draft`\n\nCreates a new draft version of a rule that will be ran in shadow mode.\n\nThis can also be utilized to reset the draft parameters, causing a draft version to no longer be ran in shadow mode.\n\n\n### Parameters\n\n- `auth_rule_token: string`\n\n- `parameters?: { conditions: { attribute: conditional_attribute; operation: conditional_operation; value: conditional_value; }[]; } | { period: { duration: number; type: 'CUSTOM'; } | { type: 'DAY'; } | { type: 'WEEK'; day_of_week?: number; } | { type: 'MONTH'; day_of_month?: number; } | { type: 'YEAR'; day_of_month?: number; month?: number; }; scope: 'CARD' | 'ACCOUNT'; filters?: { exclude_countries?: string[]; exclude_mccs?: string[]; include_countries?: string[]; include_mccs?: string[]; include_pan_entry_modes?: string[]; }; limit_amount?: number; limit_count?: number; } | { merchants: { comment?: string; descriptor?: string; merchant_id?: string; }[]; } | { action: 'DECLINE' | 'CHALLENGE'; conditions: { attribute: string; operation: string; value: string | number | string[] | string; }[]; } | { action: 'DECLINE' | 'CHALLENGE'; conditions: { attribute: string; operation: string; value: string | number | string[] | string; }[]; } | { action: { type: 'APPROVE'; } | { code: string; type: 'RETURN'; }; conditions: { attribute: 'COMPANY_NAME' | 'COMPANY_ID' | 'TIMESTAMP' | 'TRANSACTION_AMOUNT' | 'SEC_CODE' | 'MEMO'; operation: string; value: string | number | string[] | string; }[]; } | { action: { type: 'DECLINE'; reason?: string; } | { type: 'REQUIRE_TFA'; reason?: string; }; conditions: { attribute: string; operation: string; value: string | number | string[] | string; }[]; } | { code: string; features: { type: 'AUTHORIZATION'; name?: string; } | { type: 'AUTHENTICATION'; name?: string; } | { type: 'TOKENIZATION'; name?: string; } | { type: 'ACH_RECEIPT'; name?: string; } | { type: 'CARD'; name?: string; } | { type: 'ACCOUNT_HOLDER'; name?: string; } | { type: 'IP_METADATA'; name?: string; } | { period: velocity_limit_period; scope: 'CARD' | 'ACCOUNT'; type: 'SPEND_VELOCITY'; filters?: velocity_limit_filters; name?: string; }[]; }`\n  Parameters for the Auth Rule\n\n### Returns\n\n- `{ token: string; account_tokens: string[]; business_account_tokens: string[]; card_tokens: string[]; current_version: { parameters: object | object | object | object | object | object | object | object; version: number; }; draft_version: { error: string; parameters: object | object | object | object | object | object | object | object; state: 'PENDING' | 'SHADOWING' | 'ERROR'; version: number; }; event_stream: string; lithic_managed: boolean; name: string; program_level: boolean; state: 'ACTIVE' | 'INACTIVE'; type: 'CONDITIONAL_BLOCK' | 'VELOCITY_LIMIT' | 'MERCHANT_LOCK' | 'CONDITIONAL_ACTION' | 'TYPESCRIPT_CODE'; excluded_account_tokens?: string[]; excluded_business_account_tokens?: string[]; excluded_card_tokens?: string[]; }`\n\n  - `token: string`\n  - `account_tokens: string[]`\n  - `business_account_tokens: string[]`\n  - `card_tokens: string[]`\n  - `current_version: { parameters: { conditions: object[]; } | { period: object | object | object | object | object; scope: 'CARD' | 'ACCOUNT'; filters?: object; limit_amount?: number; limit_count?: number; } | { merchants: { comment?: string; descriptor?: string; merchant_id?: string; }[]; } | { action: 'DECLINE' | 'CHALLENGE'; conditions: { attribute: string; operation: conditional_operation; value: conditional_value; }[]; } | { action: 'DECLINE' | 'CHALLENGE'; conditions: { attribute: string; operation: conditional_operation; value: conditional_value; }[]; } | { action: { type: 'APPROVE'; } | { code: string; type: 'RETURN'; }; conditions: { attribute: 'COMPANY_NAME' | 'COMPANY_ID' | 'TIMESTAMP' | 'TRANSACTION_AMOUNT' | 'SEC_CODE' | 'MEMO'; operation: conditional_operation; value: conditional_value; }[]; } | { action: { type: 'DECLINE'; reason?: string; } | { type: 'REQUIRE_TFA'; reason?: string; }; conditions: { attribute: string; operation: conditional_operation; value: conditional_value; }[]; } | { code: string; features: object | object | object | object | object | object | object | object[]; }; version: number; }`\n  - `draft_version: { error: string; parameters: { conditions: object[]; } | { period: object | object | object | object | object; scope: 'CARD' | 'ACCOUNT'; filters?: object; limit_amount?: number; limit_count?: number; } | { merchants: { comment?: string; descriptor?: string; merchant_id?: string; }[]; } | { action: 'DECLINE' | 'CHALLENGE'; conditions: { attribute: string; operation: conditional_operation; value: conditional_value; }[]; } | { action: 'DECLINE' | 'CHALLENGE'; conditions: { attribute: string; operation: conditional_operation; value: conditional_value; }[]; } | { action: { type: 'APPROVE'; } | { code: string; type: 'RETURN'; }; conditions: { attribute: 'COMPANY_NAME' | 'COMPANY_ID' | 'TIMESTAMP' | 'TRANSACTION_AMOUNT' | 'SEC_CODE' | 'MEMO'; operation: conditional_operation; value: conditional_value; }[]; } | { action: { type: 'DECLINE'; reason?: string; } | { type: 'REQUIRE_TFA'; reason?: string; }; conditions: { attribute: string; operation: conditional_operation; value: conditional_value; }[]; } | { code: string; features: object | object | object | object | object | object | object | object[]; }; state: 'PENDING' | 'SHADOWING' | 'ERROR'; version: number; }`\n  - `event_stream: string`\n  - `lithic_managed: boolean`\n  - `name: string`\n  - `program_level: boolean`\n  - `state: 'ACTIVE' | 'INACTIVE'`\n  - `type: 'CONDITIONAL_BLOCK' | 'VELOCITY_LIMIT' | 'MERCHANT_LOCK' | 'CONDITIONAL_ACTION' | 'TYPESCRIPT_CODE'`\n  - `excluded_account_tokens?: string[]`\n  - `excluded_business_account_tokens?: string[]`\n  - `excluded_card_tokens?: string[]`\n\n### Example\n\n```typescript\nimport Lithic from 'lithic';\n\nconst client = new Lithic();\n\nconst authRule = await client.authRules.v2.draft('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e');\n\nconsole.log(authRule);\n```",
  },
  {
    name: 'list_results',
    endpoint: '/v2/auth_rules/results',
    httpMethod: 'get',
    summary: 'List rule evaluation results',
    description:
      'Lists Auth Rule evaluation results.\n\n**Limitations:**\n- Results are available for the past 3 months only\n- At least one filter (`event_token` or `auth_rule_token`) must be provided\n- When filtering by `event_token`, pagination is not supported\n',
    stainlessPath: '(resource) auth_rules.v2 > (method) list_results',
    qualified: 'client.authRules.v2.listResults',
    params: [
      'auth_rule_token?: string;',
      'begin?: string;',
      'end?: string;',
      'ending_before?: string;',
      'event_token?: string;',
      'has_actions?: boolean;',
      'page_size?: number;',
      'starting_after?: string;',
    ],
    response:
      "{ token: string; actions: { code: string; type: 'DECLINE'; explanation?: string; } | { type: 'CHALLENGE'; explanation?: string; }[]; auth_rule_token: string; evaluation_time: string; event_stream: 'AUTHORIZATION'; event_token: string; mode: 'ACTIVE' | 'INACTIVE'; rule_version: number; } | { token: string; actions: { type: 'DECLINE' | 'CHALLENGE'; explanation?: string; }[]; auth_rule_token: string; evaluation_time: string; event_stream: 'THREE_DS_AUTHENTICATION'; event_token: string; mode: 'ACTIVE' | 'INACTIVE'; rule_version: number; } | { token: string; actions: { type: 'DECLINE'; explanation?: string; reason?: string; } | { type: 'REQUIRE_TFA'; explanation?: string; reason?: string; }[]; auth_rule_token: string; evaluation_time: string; event_stream: 'TOKENIZATION'; event_token: string; mode: 'ACTIVE' | 'INACTIVE'; rule_version: number; } | { token: string; actions: { type: 'APPROVE'; explanation?: string; } | { code: string; type: 'RETURN'; explanation?: string; }[]; auth_rule_token: string; evaluation_time: string; event_stream: 'ACH_CREDIT_RECEIPT' | 'ACH_DEBIT_RECEIPT'; event_token: string; mode: 'ACTIVE' | 'INACTIVE'; rule_version: number; }",
    markdown:
      "## list_results\n\n`client.authRules.v2.listResults(auth_rule_token?: string, begin?: string, end?: string, ending_before?: string, event_token?: string, has_actions?: boolean, page_size?: number, starting_after?: string): { token: string; actions: object | object[]; auth_rule_token: string; evaluation_time: string; event_stream: 'AUTHORIZATION'; event_token: string; mode: 'ACTIVE' | 'INACTIVE'; rule_version: number; } | { token: string; actions: object[]; auth_rule_token: string; evaluation_time: string; event_stream: 'THREE_DS_AUTHENTICATION'; event_token: string; mode: 'ACTIVE' | 'INACTIVE'; rule_version: number; } | { token: string; actions: object | object[]; auth_rule_token: string; evaluation_time: string; event_stream: 'TOKENIZATION'; event_token: string; mode: 'ACTIVE' | 'INACTIVE'; rule_version: number; } | { token: string; actions: object | object[]; auth_rule_token: string; evaluation_time: string; event_stream: 'ACH_CREDIT_RECEIPT' | 'ACH_DEBIT_RECEIPT'; event_token: string; mode: 'ACTIVE' | 'INACTIVE'; rule_version: number; }`\n\n**get** `/v2/auth_rules/results`\n\nLists Auth Rule evaluation results.\n\n**Limitations:**\n- Results are available for the past 3 months only\n- At least one filter (`event_token` or `auth_rule_token`) must be provided\n- When filtering by `event_token`, pagination is not supported\n\n\n### Parameters\n\n- `auth_rule_token?: string`\n  Filter by Auth Rule token\n\n- `begin?: string`\n  Date string in RFC 3339 format. Only events evaluated after the specified time will be included. UTC time zone.\n\n- `end?: string`\n  Date string in RFC 3339 format. Only events evaluated before the specified time will be included. UTC time zone.\n\n- `ending_before?: string`\n  A cursor representing an item's token before which a page of results should end. Used to retrieve the previous page of results before this item.\n\n- `event_token?: string`\n  Filter by event token\n\n- `has_actions?: boolean`\n  Filter by whether the rule evaluation produced any actions. When not provided, all results are returned.\n\n- `page_size?: number`\n  Page size (for pagination).\n\n- `starting_after?: string`\n  A cursor representing an item's token after which a page of results should begin. Used to retrieve the next page of results after this item.\n\n### Returns\n\n- `{ token: string; actions: { code: string; type: 'DECLINE'; explanation?: string; } | { type: 'CHALLENGE'; explanation?: string; }[]; auth_rule_token: string; evaluation_time: string; event_stream: 'AUTHORIZATION'; event_token: string; mode: 'ACTIVE' | 'INACTIVE'; rule_version: number; } | { token: string; actions: { type: 'DECLINE' | 'CHALLENGE'; explanation?: string; }[]; auth_rule_token: string; evaluation_time: string; event_stream: 'THREE_DS_AUTHENTICATION'; event_token: string; mode: 'ACTIVE' | 'INACTIVE'; rule_version: number; } | { token: string; actions: { type: 'DECLINE'; explanation?: string; reason?: string; } | { type: 'REQUIRE_TFA'; explanation?: string; reason?: string; }[]; auth_rule_token: string; evaluation_time: string; event_stream: 'TOKENIZATION'; event_token: string; mode: 'ACTIVE' | 'INACTIVE'; rule_version: number; } | { token: string; actions: { type: 'APPROVE'; explanation?: string; } | { code: string; type: 'RETURN'; explanation?: string; }[]; auth_rule_token: string; evaluation_time: string; event_stream: 'ACH_CREDIT_RECEIPT' | 'ACH_DEBIT_RECEIPT'; event_token: string; mode: 'ACTIVE' | 'INACTIVE'; rule_version: number; }`\n  Result of an Auth Rule evaluation\n\n### Example\n\n```typescript\nimport Lithic from 'lithic';\n\nconst client = new Lithic();\n\n// Automatically fetches more pages as needed.\nfor await (const v2ListResultsResponse of client.authRules.v2.listResults()) {\n  console.log(v2ListResultsResponse);\n}\n```",
  },
  {
    name: 'list_versions',
    endpoint: '/v2/auth_rules/{auth_rule_token}/versions',
    httpMethod: 'get',
    summary: 'List rule versions',
    description: 'Returns all versions of an auth rule, sorted by version number descending (newest first).',
    stainlessPath: '(resource) auth_rules.v2 > (method) list_versions',
    qualified: 'client.authRules.v2.listVersions',
    params: ['auth_rule_token: string;'],
    response:
      "{ data: { created: string; parameters: conditional_block_parameters | velocity_limit_params | merchant_lock_parameters | conditional_3ds_action_parameters | conditional_authorization_action_parameters | conditional_ach_action_parameters | conditional_tokenization_action_parameters | typescript_code_parameters; state: 'ACTIVE' | 'SHADOW' | 'INACTIVE'; version: number; }[]; }",
    markdown:
      "## list_versions\n\n`client.authRules.v2.listVersions(auth_rule_token: string): { data: auth_rule_version[]; }`\n\n**get** `/v2/auth_rules/{auth_rule_token}/versions`\n\nReturns all versions of an auth rule, sorted by version number descending (newest first).\n\n### Parameters\n\n- `auth_rule_token: string`\n\n### Returns\n\n- `{ data: { created: string; parameters: conditional_block_parameters | velocity_limit_params | merchant_lock_parameters | conditional_3ds_action_parameters | conditional_authorization_action_parameters | conditional_ach_action_parameters | conditional_tokenization_action_parameters | typescript_code_parameters; state: 'ACTIVE' | 'SHADOW' | 'INACTIVE'; version: number; }[]; }`\n\n  - `data: { created: string; parameters: { conditions: auth_rule_condition[]; } | { period: velocity_limit_period; scope: 'CARD' | 'ACCOUNT'; filters?: velocity_limit_filters; limit_amount?: number; limit_count?: number; } | { merchants: object[]; } | { action: 'DECLINE' | 'CHALLENGE'; conditions: object[]; } | { action: 'DECLINE' | 'CHALLENGE'; conditions: object[]; } | { action: object | object; conditions: object[]; } | { action: object | object; conditions: object[]; } | { code: string; features: rule_feature[]; }; state: 'ACTIVE' | 'SHADOW' | 'INACTIVE'; version: number; }[]`\n\n### Example\n\n```typescript\nimport Lithic from 'lithic';\n\nconst client = new Lithic();\n\nconst response = await client.authRules.v2.listVersions('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e');\n\nconsole.log(response);\n```",
  },
  {
    name: 'promote',
    endpoint: '/v2/auth_rules/{auth_rule_token}/promote',
    httpMethod: 'post',
    summary: 'Promote a rule version',
    description:
      'Promotes the draft version of an Auth rule to the currently active version such that it is enforced in the respective stream.',
    stainlessPath: '(resource) auth_rules.v2 > (method) promote',
    qualified: 'client.authRules.v2.promote',
    params: ['auth_rule_token: string;'],
    response:
      "{ token: string; account_tokens: string[]; business_account_tokens: string[]; card_tokens: string[]; current_version: { parameters: object | object | object | object | object | object | object | object; version: number; }; draft_version: { error: string; parameters: object | object | object | object | object | object | object | object; state: 'PENDING' | 'SHADOWING' | 'ERROR'; version: number; }; event_stream: string; lithic_managed: boolean; name: string; program_level: boolean; state: 'ACTIVE' | 'INACTIVE'; type: 'CONDITIONAL_BLOCK' | 'VELOCITY_LIMIT' | 'MERCHANT_LOCK' | 'CONDITIONAL_ACTION' | 'TYPESCRIPT_CODE'; excluded_account_tokens?: string[]; excluded_business_account_tokens?: string[]; excluded_card_tokens?: string[]; }",
    markdown:
      "## promote\n\n`client.authRules.v2.promote(auth_rule_token: string): { token: string; account_tokens: string[]; business_account_tokens: string[]; card_tokens: string[]; current_version: object; draft_version: object; event_stream: event_stream; lithic_managed: boolean; name: string; program_level: boolean; state: 'ACTIVE' | 'INACTIVE'; type: 'CONDITIONAL_BLOCK' | 'VELOCITY_LIMIT' | 'MERCHANT_LOCK' | 'CONDITIONAL_ACTION' | 'TYPESCRIPT_CODE'; excluded_account_tokens?: string[]; excluded_business_account_tokens?: string[]; excluded_card_tokens?: string[]; }`\n\n**post** `/v2/auth_rules/{auth_rule_token}/promote`\n\nPromotes the draft version of an Auth rule to the currently active version such that it is enforced in the respective stream.\n\n### Parameters\n\n- `auth_rule_token: string`\n\n### Returns\n\n- `{ token: string; account_tokens: string[]; business_account_tokens: string[]; card_tokens: string[]; current_version: { parameters: object | object | object | object | object | object | object | object; version: number; }; draft_version: { error: string; parameters: object | object | object | object | object | object | object | object; state: 'PENDING' | 'SHADOWING' | 'ERROR'; version: number; }; event_stream: string; lithic_managed: boolean; name: string; program_level: boolean; state: 'ACTIVE' | 'INACTIVE'; type: 'CONDITIONAL_BLOCK' | 'VELOCITY_LIMIT' | 'MERCHANT_LOCK' | 'CONDITIONAL_ACTION' | 'TYPESCRIPT_CODE'; excluded_account_tokens?: string[]; excluded_business_account_tokens?: string[]; excluded_card_tokens?: string[]; }`\n\n  - `token: string`\n  - `account_tokens: string[]`\n  - `business_account_tokens: string[]`\n  - `card_tokens: string[]`\n  - `current_version: { parameters: { conditions: object[]; } | { period: object | object | object | object | object; scope: 'CARD' | 'ACCOUNT'; filters?: object; limit_amount?: number; limit_count?: number; } | { merchants: { comment?: string; descriptor?: string; merchant_id?: string; }[]; } | { action: 'DECLINE' | 'CHALLENGE'; conditions: { attribute: string; operation: conditional_operation; value: conditional_value; }[]; } | { action: 'DECLINE' | 'CHALLENGE'; conditions: { attribute: string; operation: conditional_operation; value: conditional_value; }[]; } | { action: { type: 'APPROVE'; } | { code: string; type: 'RETURN'; }; conditions: { attribute: 'COMPANY_NAME' | 'COMPANY_ID' | 'TIMESTAMP' | 'TRANSACTION_AMOUNT' | 'SEC_CODE' | 'MEMO'; operation: conditional_operation; value: conditional_value; }[]; } | { action: { type: 'DECLINE'; reason?: string; } | { type: 'REQUIRE_TFA'; reason?: string; }; conditions: { attribute: string; operation: conditional_operation; value: conditional_value; }[]; } | { code: string; features: object | object | object | object | object | object | object | object[]; }; version: number; }`\n  - `draft_version: { error: string; parameters: { conditions: object[]; } | { period: object | object | object | object | object; scope: 'CARD' | 'ACCOUNT'; filters?: object; limit_amount?: number; limit_count?: number; } | { merchants: { comment?: string; descriptor?: string; merchant_id?: string; }[]; } | { action: 'DECLINE' | 'CHALLENGE'; conditions: { attribute: string; operation: conditional_operation; value: conditional_value; }[]; } | { action: 'DECLINE' | 'CHALLENGE'; conditions: { attribute: string; operation: conditional_operation; value: conditional_value; }[]; } | { action: { type: 'APPROVE'; } | { code: string; type: 'RETURN'; }; conditions: { attribute: 'COMPANY_NAME' | 'COMPANY_ID' | 'TIMESTAMP' | 'TRANSACTION_AMOUNT' | 'SEC_CODE' | 'MEMO'; operation: conditional_operation; value: conditional_value; }[]; } | { action: { type: 'DECLINE'; reason?: string; } | { type: 'REQUIRE_TFA'; reason?: string; }; conditions: { attribute: string; operation: conditional_operation; value: conditional_value; }[]; } | { code: string; features: object | object | object | object | object | object | object | object[]; }; state: 'PENDING' | 'SHADOWING' | 'ERROR'; version: number; }`\n  - `event_stream: string`\n  - `lithic_managed: boolean`\n  - `name: string`\n  - `program_level: boolean`\n  - `state: 'ACTIVE' | 'INACTIVE'`\n  - `type: 'CONDITIONAL_BLOCK' | 'VELOCITY_LIMIT' | 'MERCHANT_LOCK' | 'CONDITIONAL_ACTION' | 'TYPESCRIPT_CODE'`\n  - `excluded_account_tokens?: string[]`\n  - `excluded_business_account_tokens?: string[]`\n  - `excluded_card_tokens?: string[]`\n\n### Example\n\n```typescript\nimport Lithic from 'lithic';\n\nconst client = new Lithic();\n\nconst authRule = await client.authRules.v2.promote('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e');\n\nconsole.log(authRule);\n```",
  },
  {
    name: 'retrieve_features',
    endpoint: '/v2/auth_rules/{auth_rule_token}/features',
    httpMethod: 'get',
    summary: 'Calculated Feature values',
    description:
      'Fetches the current calculated Feature values for the given Auth Rule\n\nThis only calculates the features for the active version.\n- VelocityLimit Rules calculates the current Velocity Feature data. This requires a `card_token` or `account_token` matching what the rule is Scoped to.\n- ConditionalBlock Rules calculates the CARD_TRANSACTION_COUNT_* attributes on the rule. This requires a `card_token`\n',
    stainlessPath: '(resource) auth_rules.v2 > (method) retrieve_features',
    qualified: 'client.authRules.v2.retrieveFeatures',
    params: ['auth_rule_token: string;', 'account_token?: string;', 'card_token?: string;'],
    response:
      "{ evaluated: string; features: { filters: object; period: object | object | object | object | object; scope: 'CARD' | 'ACCOUNT'; value: { amount: number; count: number; }; }[]; }",
    markdown:
      "## retrieve_features\n\n`client.authRules.v2.retrieveFeatures(auth_rule_token: string, account_token?: string, card_token?: string): { evaluated: string; features: object[]; }`\n\n**get** `/v2/auth_rules/{auth_rule_token}/features`\n\nFetches the current calculated Feature values for the given Auth Rule\n\nThis only calculates the features for the active version.\n- VelocityLimit Rules calculates the current Velocity Feature data. This requires a `card_token` or `account_token` matching what the rule is Scoped to.\n- ConditionalBlock Rules calculates the CARD_TRANSACTION_COUNT_* attributes on the rule. This requires a `card_token`\n\n\n### Parameters\n\n- `auth_rule_token: string`\n\n- `account_token?: string`\n\n- `card_token?: string`\n\n### Returns\n\n- `{ evaluated: string; features: { filters: object; period: object | object | object | object | object; scope: 'CARD' | 'ACCOUNT'; value: { amount: number; count: number; }; }[]; }`\n\n  - `evaluated: string`\n  - `features: { filters: { exclude_countries?: string[]; exclude_mccs?: string[]; include_countries?: string[]; include_mccs?: string[]; include_pan_entry_modes?: string[]; }; period: { duration: number; type: 'CUSTOM'; } | { type: 'DAY'; } | { type: 'WEEK'; day_of_week?: number; } | { type: 'MONTH'; day_of_month?: number; } | { type: 'YEAR'; day_of_month?: number; month?: number; }; scope: 'CARD' | 'ACCOUNT'; value: { amount: number; count: number; }; }[]`\n\n### Example\n\n```typescript\nimport Lithic from 'lithic';\n\nconst client = new Lithic();\n\nconst response = await client.authRules.v2.retrieveFeatures('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e');\n\nconsole.log(response);\n```",
  },
  {
    name: 'retrieve_report',
    endpoint: '/v2/auth_rules/{auth_rule_token}/report',
    httpMethod: 'get',
    summary: 'Retrieve a performance report',
    description:
      'Retrieves a performance report for an Auth rule containing daily statistics and evaluation outcomes.\n\n**Time Range Limitations:**\n- Reports are supported for the past 3 months only\n- Maximum interval length is 1 month\n- Report data is available only through the previous day in UTC (current day data is not available)\n\nThe report provides daily statistics for both current and draft versions of the Auth rule, including approval, decline, and challenge counts along with sample events.\n',
    stainlessPath: '(resource) auth_rules.v2 > (method) retrieve_report',
    qualified: 'client.authRules.v2.retrieveReport',
    params: ['auth_rule_token: string;', 'begin: string;', 'end: string;'],
    response:
      "{ auth_rule_token: string; begin: string; daily_statistics: { current_version_statistics: object; date: string; draft_version_statistics: object; versions: { action_counts: object; examples: object[]; state: 'ACTIVE' | 'SHADOW' | 'INACTIVE'; version: number; }[]; }[]; end: string; }",
    markdown:
      "## retrieve_report\n\n`client.authRules.v2.retrieveReport(auth_rule_token: string, begin: string, end: string): { auth_rule_token: string; begin: string; daily_statistics: object[]; end: string; }`\n\n**get** `/v2/auth_rules/{auth_rule_token}/report`\n\nRetrieves a performance report for an Auth rule containing daily statistics and evaluation outcomes.\n\n**Time Range Limitations:**\n- Reports are supported for the past 3 months only\n- Maximum interval length is 1 month\n- Report data is available only through the previous day in UTC (current day data is not available)\n\nThe report provides daily statistics for both current and draft versions of the Auth rule, including approval, decline, and challenge counts along with sample events.\n\n\n### Parameters\n\n- `auth_rule_token: string`\n\n- `begin: string`\n  Start date for the report\n\n- `end: string`\n  End date for the report\n\n### Returns\n\n- `{ auth_rule_token: string; begin: string; daily_statistics: { current_version_statistics: object; date: string; draft_version_statistics: object; versions: { action_counts: object; examples: object[]; state: 'ACTIVE' | 'SHADOW' | 'INACTIVE'; version: number; }[]; }[]; end: string; }`\n\n  - `auth_rule_token: string`\n  - `begin: string`\n  - `daily_statistics: { current_version_statistics: { action_counts?: object; approved?: number; challenged?: number; declined?: number; examples?: { actions?: object | object | object | object | object | object | object[]; approved?: boolean; decision?: 'APPROVED' | 'DECLINED' | 'CHALLENGED'; event_token?: string; timestamp?: string; }[]; }; date: string; draft_version_statistics: { action_counts?: object; approved?: number; challenged?: number; declined?: number; examples?: { actions?: object | object | object | object | object | object | object[]; approved?: boolean; decision?: 'APPROVED' | 'DECLINED' | 'CHALLENGED'; event_token?: string; timestamp?: string; }[]; }; versions: { action_counts: object; examples: { actions: { code: string; type: 'DECLINE'; } | { type: 'CHALLENGE'; } | { type: 'DECLINE' | 'CHALLENGE'; } | { type: 'DECLINE'; reason?: string; } | { type: 'REQUIRE_TFA'; reason?: string; } | { type: 'APPROVE'; } | { code: string; type: 'RETURN'; }[]; event_token: string; timestamp: string; }[]; state: 'ACTIVE' | 'SHADOW' | 'INACTIVE'; version: number; }[]; }[]`\n  - `end: string`\n\n### Example\n\n```typescript\nimport Lithic from 'lithic';\n\nconst client = new Lithic();\n\nconst response = await client.authRules.v2.retrieveReport('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', { begin: '2019-12-27', end: '2019-12-27' });\n\nconsole.log(response);\n```",
  },
  {
    name: 'create',
    endpoint: '/v2/auth_rules/{auth_rule_token}/backtests',
    httpMethod: 'post',
    summary: 'Request a backtest',
    description:
      "Initiates a request to asynchronously generate a backtest for an Auth rule. During backtesting, both the active version (if one exists) and the draft version of the Auth Rule are evaluated by replaying historical transaction data against the rule's conditions. This process allows customers to simulate and understand the effects of proposed rule changes before deployment.\nThe generated backtest report provides detailed results showing whether the draft version of the Auth Rule would have approved or declined historical transactions which were processed during the backtest period. These reports help evaluate how changes to rule configurations might affect overall transaction approval rates.\n\nThe generated backtest report will be delivered asynchronously through a webhook with `event_type` = `auth_rules.backtest_report.created`. See the docs on setting up [webhook subscriptions](https://docs.lithic.com/docs/events-api).\nIt is also possible to request backtest reports on-demand through the `/v2/auth_rules/{auth_rule_token}/backtests/{auth_rule_backtest_token}` endpoint.\n\nLithic currently supports backtesting for `CONDITIONAL_BLOCK` / `CONDITIONAL_ACTION` rules. Backtesting for `VELOCITY_LIMIT` rules is generally not supported. In specific cases (i.e. where Lithic has pre-calculated the requested velocity metrics for historical transactions), a backtest may be feasible. However, such cases are uncommon and customers should not anticipate support for velocity backtests under most configurations.\nIf a historical transaction does not feature the required inputs to evaluate the rule, then it will not be included in the final backtest report.\n",
    stainlessPath: '(resource) auth_rules.v2.backtests > (method) create',
    qualified: 'client.authRules.v2.backtests.create',
    params: ['auth_rule_token: string;', 'end?: string;', 'start?: string;'],
    response: '{ backtest_token?: string; }',
    markdown:
      "## create\n\n`client.authRules.v2.backtests.create(auth_rule_token: string, end?: string, start?: string): { backtest_token?: string; }`\n\n**post** `/v2/auth_rules/{auth_rule_token}/backtests`\n\nInitiates a request to asynchronously generate a backtest for an Auth rule. During backtesting, both the active version (if one exists) and the draft version of the Auth Rule are evaluated by replaying historical transaction data against the rule's conditions. This process allows customers to simulate and understand the effects of proposed rule changes before deployment.\nThe generated backtest report provides detailed results showing whether the draft version of the Auth Rule would have approved or declined historical transactions which were processed during the backtest period. These reports help evaluate how changes to rule configurations might affect overall transaction approval rates.\n\nThe generated backtest report will be delivered asynchronously through a webhook with `event_type` = `auth_rules.backtest_report.created`. See the docs on setting up [webhook subscriptions](https://docs.lithic.com/docs/events-api).\nIt is also possible to request backtest reports on-demand through the `/v2/auth_rules/{auth_rule_token}/backtests/{auth_rule_backtest_token}` endpoint.\n\nLithic currently supports backtesting for `CONDITIONAL_BLOCK` / `CONDITIONAL_ACTION` rules. Backtesting for `VELOCITY_LIMIT` rules is generally not supported. In specific cases (i.e. where Lithic has pre-calculated the requested velocity metrics for historical transactions), a backtest may be feasible. However, such cases are uncommon and customers should not anticipate support for velocity backtests under most configurations.\nIf a historical transaction does not feature the required inputs to evaluate the rule, then it will not be included in the final backtest report.\n\n\n### Parameters\n\n- `auth_rule_token: string`\n\n- `end?: string`\n  The end time of the backtest.\n\n- `start?: string`\n  The start time of the backtest.\n\n### Returns\n\n- `{ backtest_token?: string; }`\n\n  - `backtest_token?: string`\n\n### Example\n\n```typescript\nimport Lithic from 'lithic';\n\nconst client = new Lithic();\n\nconst backtest = await client.authRules.v2.backtests.create('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e');\n\nconsole.log(backtest);\n```",
  },
  {
    name: 'retrieve',
    endpoint: '/v2/auth_rules/{auth_rule_token}/backtests/{auth_rule_backtest_token}',
    httpMethod: 'get',
    summary: 'Retrieve backtest results',
    description:
      'Returns the backtest results of an Auth rule (if available).\n\nBacktesting is an asynchronous process that requires time to complete. If a customer retrieves the backtest results using this endpoint before the report is fully generated, the response will return null for `results.current_version` and `results.draft_version`. Customers are advised to wait for the backtest creation process to complete (as indicated by the webhook event auth_rules.backtest_report.created) before retrieving results from this endpoint.\n\nBacktesting is an asynchronous process, while the backtest is being processed, results will not be available which will cause `results.current_version` and `results.draft_version` objects to contain `null`.\nThe entries in `results` will also always represent the configuration of the rule at the time requests are made to this endpoint. For example, the results for `current_version` in the served backtest report will be consistent with which version of the rule is currently activated in the respective event stream, regardless of which version of the rule was active in the event stream at the time a backtest is requested.\n',
    stainlessPath: '(resource) auth_rules.v2.backtests > (method) retrieve',
    qualified: 'client.authRules.v2.backtests.retrieve',
    params: ['auth_rule_token: string;', 'auth_rule_backtest_token: string;'],
    response:
      '{ backtest_token: string; results: { current_version?: object; draft_version?: object; }; simulation_parameters: { end: string; start: string; }; }',
    markdown:
      "## retrieve\n\n`client.authRules.v2.backtests.retrieve(auth_rule_token: string, auth_rule_backtest_token: string): { backtest_token: string; results: object; simulation_parameters: object; }`\n\n**get** `/v2/auth_rules/{auth_rule_token}/backtests/{auth_rule_backtest_token}`\n\nReturns the backtest results of an Auth rule (if available).\n\nBacktesting is an asynchronous process that requires time to complete. If a customer retrieves the backtest results using this endpoint before the report is fully generated, the response will return null for `results.current_version` and `results.draft_version`. Customers are advised to wait for the backtest creation process to complete (as indicated by the webhook event auth_rules.backtest_report.created) before retrieving results from this endpoint.\n\nBacktesting is an asynchronous process, while the backtest is being processed, results will not be available which will cause `results.current_version` and `results.draft_version` objects to contain `null`.\nThe entries in `results` will also always represent the configuration of the rule at the time requests are made to this endpoint. For example, the results for `current_version` in the served backtest report will be consistent with which version of the rule is currently activated in the respective event stream, regardless of which version of the rule was active in the event stream at the time a backtest is requested.\n\n\n### Parameters\n\n- `auth_rule_token: string`\n\n- `auth_rule_backtest_token: string`\n\n### Returns\n\n- `{ backtest_token: string; results: { current_version?: object; draft_version?: object; }; simulation_parameters: { end: string; start: string; }; }`\n\n  - `backtest_token: string`\n  - `results: { current_version?: { approved?: number; challenged?: number; declined?: number; examples?: { decision?: 'APPROVED' | 'DECLINED' | 'CHALLENGED'; event_token?: string; timestamp?: string; }[]; version?: number; }; draft_version?: { approved?: number; challenged?: number; declined?: number; examples?: { decision?: 'APPROVED' | 'DECLINED' | 'CHALLENGED'; event_token?: string; timestamp?: string; }[]; version?: number; }; }`\n  - `simulation_parameters: { end: string; start: string; }`\n\n### Example\n\n```typescript\nimport Lithic from 'lithic';\n\nconst client = new Lithic();\n\nconst backtestResults = await client.authRules.v2.backtests.retrieve('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', { auth_rule_token: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e' });\n\nconsole.log(backtestResults);\n```",
  },
  {
    name: 'retrieve_secret',
    endpoint: '/v1/auth_stream/secret',
    httpMethod: 'get',
    summary: 'Retrieve the ASA HMAC secret key',
    description:
      'Retrieve the ASA HMAC secret key. If one does not exist for your program yet, calling this endpoint will create one for you. The headers (which you can use to verify webhooks) will begin appearing shortly after calling this endpoint for the first time. See [this page](https://docs.lithic.com/docs/auth-stream-access-asa#asa-webhook-verification) for more detail about verifying ASA webhooks.\n',
    stainlessPath: '(resource) auth_stream_enrollment > (method) retrieve_secret',
    qualified: 'client.authStreamEnrollment.retrieveSecret',
    response: '{ secret?: string; }',
    markdown:
      "## retrieve_secret\n\n`client.authStreamEnrollment.retrieveSecret(): { secret?: string; }`\n\n**get** `/v1/auth_stream/secret`\n\nRetrieve the ASA HMAC secret key. If one does not exist for your program yet, calling this endpoint will create one for you. The headers (which you can use to verify webhooks) will begin appearing shortly after calling this endpoint for the first time. See [this page](https://docs.lithic.com/docs/auth-stream-access-asa#asa-webhook-verification) for more detail about verifying ASA webhooks.\n\n\n### Returns\n\n- `{ secret?: string; }`\n\n  - `secret?: string`\n\n### Example\n\n```typescript\nimport Lithic from 'lithic';\n\nconst client = new Lithic();\n\nconst authStreamSecret = await client.authStreamEnrollment.retrieveSecret();\n\nconsole.log(authStreamSecret);\n```",
  },
  {
    name: 'rotate_secret',
    endpoint: '/v1/auth_stream/secret/rotate',
    httpMethod: 'post',
    summary: 'Rotate the ASA HMAC secret key',
    description:
      'Generate a new ASA HMAC secret key. The old ASA HMAC secret key will be deactivated 24 hours after a successful request to this endpoint. Make a [`GET /auth_stream/secret`](https://docs.lithic.com/reference/getauthstreamsecret) request to retrieve the new secret key.\n',
    stainlessPath: '(resource) auth_stream_enrollment > (method) rotate_secret',
    qualified: 'client.authStreamEnrollment.rotateSecret',
    markdown:
      "## rotate_secret\n\n`client.authStreamEnrollment.rotateSecret(): void`\n\n**post** `/v1/auth_stream/secret/rotate`\n\nGenerate a new ASA HMAC secret key. The old ASA HMAC secret key will be deactivated 24 hours after a successful request to this endpoint. Make a [`GET /auth_stream/secret`](https://docs.lithic.com/reference/getauthstreamsecret) request to retrieve the new secret key.\n\n\n### Example\n\n```typescript\nimport Lithic from 'lithic';\n\nconst client = new Lithic();\n\nawait client.authStreamEnrollment.rotateSecret()\n```",
  },
  {
    name: 'retrieve_secret',
    endpoint: '/v1/tokenization_decisioning/secret',
    httpMethod: 'get',
    summary: 'Retrieve the Tokenization Decisioning HMAC secret key',
    description:
      'Retrieve the Tokenization Decisioning secret key. If one does not exist your program yet, calling this endpoint will create one for you. The headers of the Tokenization Decisioning request will contain a hmac signature which you can use to verify requests originate from Lithic. See [this page](https://docs.lithic.com/docs/events-api#verifying-webhooks) for more detail about verifying Tokenization Decisioning requests.\n',
    stainlessPath: '(resource) tokenization_decisioning > (method) retrieve_secret',
    qualified: 'client.tokenizationDecisioning.retrieveSecret',
    response: '{ secret?: string; }',
    markdown:
      "## retrieve_secret\n\n`client.tokenizationDecisioning.retrieveSecret(): { secret?: string; }`\n\n**get** `/v1/tokenization_decisioning/secret`\n\nRetrieve the Tokenization Decisioning secret key. If one does not exist your program yet, calling this endpoint will create one for you. The headers of the Tokenization Decisioning request will contain a hmac signature which you can use to verify requests originate from Lithic. See [this page](https://docs.lithic.com/docs/events-api#verifying-webhooks) for more detail about verifying Tokenization Decisioning requests.\n\n\n### Returns\n\n- `{ secret?: string; }`\n\n  - `secret?: string`\n\n### Example\n\n```typescript\nimport Lithic from 'lithic';\n\nconst client = new Lithic();\n\nconst tokenizationSecret = await client.tokenizationDecisioning.retrieveSecret();\n\nconsole.log(tokenizationSecret);\n```",
  },
  {
    name: 'rotate_secret',
    endpoint: '/v1/tokenization_decisioning/secret/rotate',
    httpMethod: 'post',
    summary: 'Rotate the Tokenization Decisioning HMAC secret key',
    description:
      'Generate a new Tokenization Decisioning secret key. The old Tokenization Decisioning secret key will be deactivated 24 hours after a successful request to this endpoint.\n',
    stainlessPath: '(resource) tokenization_decisioning > (method) rotate_secret',
    qualified: 'client.tokenizationDecisioning.rotateSecret',
    response: '{ secret?: string; }',
    markdown:
      "## rotate_secret\n\n`client.tokenizationDecisioning.rotateSecret(): { secret?: string; }`\n\n**post** `/v1/tokenization_decisioning/secret/rotate`\n\nGenerate a new Tokenization Decisioning secret key. The old Tokenization Decisioning secret key will be deactivated 24 hours after a successful request to this endpoint.\n\n\n### Returns\n\n- `{ secret?: string; }`\n\n  - `secret?: string`\n\n### Example\n\n```typescript\nimport Lithic from 'lithic';\n\nconst client = new Lithic();\n\nconst response = await client.tokenizationDecisioning.rotateSecret();\n\nconsole.log(response);\n```",
  },
  {
    name: 'retrieve',
    endpoint: '/v1/tokenizations/{tokenization_token}',
    httpMethod: 'get',
    summary: 'Get a single card tokenization',
    description: 'Get tokenization',
    stainlessPath: '(resource) tokenizations > (method) retrieve',
    qualified: 'client.tokenizations.retrieve',
    params: ['tokenization_token: string;'],
    response:
      "{ token: string; account_token: string; card_token: string; created_at: string; dpan: string; status: 'ACTIVE' | 'DEACTIVATED' | 'INACTIVE' | 'PAUSED' | 'PENDING_2FA' | 'PENDING_ACTIVATION' | 'UNKNOWN'; token_requestor_name: string | string; token_unique_reference: string; tokenization_channel: 'DIGITAL_WALLET' | 'MERCHANT'; updated_at: string; device_id?: string; digital_card_art_token?: string; events?: { token?: string; created_at?: string; result?: string; rule_results?: object[]; tokenization_decline_reasons?: string[]; tokenization_tfa_reasons?: string[]; type?: string; }[]; payment_account_reference_id?: string; }",
    markdown:
      "## retrieve\n\n`client.tokenizations.retrieve(tokenization_token: string): { token: string; account_token: string; card_token: string; created_at: string; dpan: string; status: 'ACTIVE' | 'DEACTIVATED' | 'INACTIVE' | 'PAUSED' | 'PENDING_2FA' | 'PENDING_ACTIVATION' | 'UNKNOWN'; token_requestor_name: string | string; token_unique_reference: string; tokenization_channel: 'DIGITAL_WALLET' | 'MERCHANT'; updated_at: string; device_id?: string; digital_card_art_token?: string; events?: object[]; payment_account_reference_id?: string; }`\n\n**get** `/v1/tokenizations/{tokenization_token}`\n\nGet tokenization\n\n### Parameters\n\n- `tokenization_token: string`\n\n### Returns\n\n- `{ token: string; account_token: string; card_token: string; created_at: string; dpan: string; status: 'ACTIVE' | 'DEACTIVATED' | 'INACTIVE' | 'PAUSED' | 'PENDING_2FA' | 'PENDING_ACTIVATION' | 'UNKNOWN'; token_requestor_name: string | string; token_unique_reference: string; tokenization_channel: 'DIGITAL_WALLET' | 'MERCHANT'; updated_at: string; device_id?: string; digital_card_art_token?: string; events?: { token?: string; created_at?: string; result?: string; rule_results?: object[]; tokenization_decline_reasons?: string[]; tokenization_tfa_reasons?: string[]; type?: string; }[]; payment_account_reference_id?: string; }`\n\n  - `token: string`\n  - `account_token: string`\n  - `card_token: string`\n  - `created_at: string`\n  - `dpan: string`\n  - `status: 'ACTIVE' | 'DEACTIVATED' | 'INACTIVE' | 'PAUSED' | 'PENDING_2FA' | 'PENDING_ACTIVATION' | 'UNKNOWN'`\n  - `token_requestor_name: string | string`\n  - `token_unique_reference: string`\n  - `tokenization_channel: 'DIGITAL_WALLET' | 'MERCHANT'`\n  - `updated_at: string`\n  - `device_id?: string`\n  - `digital_card_art_token?: string`\n  - `events?: { token?: string; created_at?: string; result?: string; rule_results?: { auth_rule_token: string; explanation: string; name: string; result: 'APPROVED' | 'DECLINED' | 'REQUIRE_TFA' | 'ERROR'; }[]; tokenization_decline_reasons?: string[]; tokenization_tfa_reasons?: string[]; type?: string; }[]`\n  - `payment_account_reference_id?: string`\n\n### Example\n\n```typescript\nimport Lithic from 'lithic';\n\nconst client = new Lithic();\n\nconst tokenization = await client.tokenizations.retrieve('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e');\n\nconsole.log(tokenization);\n```",
  },
  {
    name: 'list',
    endpoint: '/v1/tokenizations',
    httpMethod: 'get',
    summary: "Get a card's tokenizations",
    description: 'List card tokenizations',
    stainlessPath: '(resource) tokenizations > (method) list',
    qualified: 'client.tokenizations.list',
    params: [
      'account_token?: string;',
      'begin?: string;',
      'card_token?: string;',
      'end?: string;',
      'ending_before?: string;',
      'page_size?: number;',
      'starting_after?: string;',
      "tokenization_channel?: 'DIGITAL_WALLET' | 'MERCHANT' | 'ALL';",
    ],
    response:
      "{ token: string; account_token: string; card_token: string; created_at: string; dpan: string; status: 'ACTIVE' | 'DEACTIVATED' | 'INACTIVE' | 'PAUSED' | 'PENDING_2FA' | 'PENDING_ACTIVATION' | 'UNKNOWN'; token_requestor_name: string | string; token_unique_reference: string; tokenization_channel: 'DIGITAL_WALLET' | 'MERCHANT'; updated_at: string; device_id?: string; digital_card_art_token?: string; events?: { token?: string; created_at?: string; result?: string; rule_results?: object[]; tokenization_decline_reasons?: string[]; tokenization_tfa_reasons?: string[]; type?: string; }[]; payment_account_reference_id?: string; }",
    markdown:
      "## list\n\n`client.tokenizations.list(account_token?: string, begin?: string, card_token?: string, end?: string, ending_before?: string, page_size?: number, starting_after?: string, tokenization_channel?: 'DIGITAL_WALLET' | 'MERCHANT' | 'ALL'): { token: string; account_token: string; card_token: string; created_at: string; dpan: string; status: 'ACTIVE' | 'DEACTIVATED' | 'INACTIVE' | 'PAUSED' | 'PENDING_2FA' | 'PENDING_ACTIVATION' | 'UNKNOWN'; token_requestor_name: string | string; token_unique_reference: string; tokenization_channel: 'DIGITAL_WALLET' | 'MERCHANT'; updated_at: string; device_id?: string; digital_card_art_token?: string; events?: object[]; payment_account_reference_id?: string; }`\n\n**get** `/v1/tokenizations`\n\nList card tokenizations\n\n### Parameters\n\n- `account_token?: string`\n  Filters for tokenizations associated with a specific account.\n\n- `begin?: string`\n  Filter for tokenizations created after this date.\n\n- `card_token?: string`\n  Filters for tokenizations associated with a specific card.\n\n- `end?: string`\n  Filter for tokenizations created before this date.\n\n- `ending_before?: string`\n  A cursor representing an item's token before which a page of results should end. Used to retrieve the previous page of results before this item.\n\n- `page_size?: number`\n  Page size (for pagination).\n\n- `starting_after?: string`\n  A cursor representing an item's token after which a page of results should begin. Used to retrieve the next page of results after this item.\n\n- `tokenization_channel?: 'DIGITAL_WALLET' | 'MERCHANT' | 'ALL'`\n  Filter for tokenizations by tokenization channel. If this is not specified, only DIGITAL_WALLET tokenizations will be returned.\n\n### Returns\n\n- `{ token: string; account_token: string; card_token: string; created_at: string; dpan: string; status: 'ACTIVE' | 'DEACTIVATED' | 'INACTIVE' | 'PAUSED' | 'PENDING_2FA' | 'PENDING_ACTIVATION' | 'UNKNOWN'; token_requestor_name: string | string; token_unique_reference: string; tokenization_channel: 'DIGITAL_WALLET' | 'MERCHANT'; updated_at: string; device_id?: string; digital_card_art_token?: string; events?: { token?: string; created_at?: string; result?: string; rule_results?: object[]; tokenization_decline_reasons?: string[]; tokenization_tfa_reasons?: string[]; type?: string; }[]; payment_account_reference_id?: string; }`\n\n  - `token: string`\n  - `account_token: string`\n  - `card_token: string`\n  - `created_at: string`\n  - `dpan: string`\n  - `status: 'ACTIVE' | 'DEACTIVATED' | 'INACTIVE' | 'PAUSED' | 'PENDING_2FA' | 'PENDING_ACTIVATION' | 'UNKNOWN'`\n  - `token_requestor_name: string | string`\n  - `token_unique_reference: string`\n  - `tokenization_channel: 'DIGITAL_WALLET' | 'MERCHANT'`\n  - `updated_at: string`\n  - `device_id?: string`\n  - `digital_card_art_token?: string`\n  - `events?: { token?: string; created_at?: string; result?: string; rule_results?: { auth_rule_token: string; explanation: string; name: string; result: 'APPROVED' | 'DECLINED' | 'REQUIRE_TFA' | 'ERROR'; }[]; tokenization_decline_reasons?: string[]; tokenization_tfa_reasons?: string[]; type?: string; }[]`\n  - `payment_account_reference_id?: string`\n\n### Example\n\n```typescript\nimport Lithic from 'lithic';\n\nconst client = new Lithic();\n\n// Automatically fetches more pages as needed.\nfor await (const tokenization of client.tokenizations.list()) {\n  console.log(tokenization);\n}\n```",
  },
  {
    name: 'activate',
    endpoint: '/v1/tokenizations/{tokenization_token}/activate',
    httpMethod: 'post',
    summary: 'Activate a card tokenization',
    description:
      'This endpoint is used to ask the card network to activate a tokenization. A successful response indicates that the request was successfully delivered to the card network. When the card network activates the tokenization, the state will be updated and a tokenization.updated event will be sent. The endpoint may only be used on digital wallet tokenizations with status `INACTIVE`, `PENDING_ACTIVATION`, or `PENDING_2FA`.\nThis will put the tokenization in an active state, and transactions will be allowed.\nReach out at [lithic.com/contact](https://lithic.com/contact) for more information.',
    stainlessPath: '(resource) tokenizations > (method) activate',
    qualified: 'client.tokenizations.activate',
    params: ['tokenization_token: string;'],
    markdown:
      "## activate\n\n`client.tokenizations.activate(tokenization_token: string): void`\n\n**post** `/v1/tokenizations/{tokenization_token}/activate`\n\nThis endpoint is used to ask the card network to activate a tokenization. A successful response indicates that the request was successfully delivered to the card network. When the card network activates the tokenization, the state will be updated and a tokenization.updated event will be sent. The endpoint may only be used on digital wallet tokenizations with status `INACTIVE`, `PENDING_ACTIVATION`, or `PENDING_2FA`.\nThis will put the tokenization in an active state, and transactions will be allowed.\nReach out at [lithic.com/contact](https://lithic.com/contact) for more information.\n\n### Parameters\n\n- `tokenization_token: string`\n\n### Example\n\n```typescript\nimport Lithic from 'lithic';\n\nconst client = new Lithic();\n\nawait client.tokenizations.activate('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e')\n```",
  },
  {
    name: 'deactivate',
    endpoint: '/v1/tokenizations/{tokenization_token}/deactivate',
    httpMethod: 'post',
    summary: 'Deactivate a card tokenization',
    description:
      'This endpoint is used to ask the card network to deactivate a tokenization. A successful response indicates that the request was successfully delivered to the card network. When the card network deactivates the tokenization, the state will be updated and a tokenization.updated event will be sent.\nAuthorizations attempted with a deactivated tokenization will be blocked and will not be forwarded to Lithic from the network. Deactivating the token is a permanent operation. If the target is a digital wallet tokenization, it will be removed from its device.\nReach out at [lithic.com/contact](https://lithic.com/contact) for more information.',
    stainlessPath: '(resource) tokenizations > (method) deactivate',
    qualified: 'client.tokenizations.deactivate',
    params: ['tokenization_token: string;'],
    markdown:
      "## deactivate\n\n`client.tokenizations.deactivate(tokenization_token: string): void`\n\n**post** `/v1/tokenizations/{tokenization_token}/deactivate`\n\nThis endpoint is used to ask the card network to deactivate a tokenization. A successful response indicates that the request was successfully delivered to the card network. When the card network deactivates the tokenization, the state will be updated and a tokenization.updated event will be sent.\nAuthorizations attempted with a deactivated tokenization will be blocked and will not be forwarded to Lithic from the network. Deactivating the token is a permanent operation. If the target is a digital wallet tokenization, it will be removed from its device.\nReach out at [lithic.com/contact](https://lithic.com/contact) for more information.\n\n### Parameters\n\n- `tokenization_token: string`\n\n### Example\n\n```typescript\nimport Lithic from 'lithic';\n\nconst client = new Lithic();\n\nawait client.tokenizations.deactivate('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e')\n```",
  },
  {
    name: 'pause',
    endpoint: '/v1/tokenizations/{tokenization_token}/pause',
    httpMethod: 'post',
    summary: 'Pause a card tokenization',
    description:
      'This endpoint is used to ask the card network to pause a tokenization. A successful response indicates that the request was successfully delivered to the card network. When the card network pauses the tokenization, the state will be updated and a tokenization.updated event will be sent. The endpoint may only be used on tokenizations with status `ACTIVE`.\nA paused token will prevent merchants from sending authorizations, and is a temporary status that can be changed.\nReach out at [lithic.com/contact](https://lithic.com/contact) for more information.',
    stainlessPath: '(resource) tokenizations > (method) pause',
    qualified: 'client.tokenizations.pause',
    params: ['tokenization_token: string;'],
    markdown:
      "## pause\n\n`client.tokenizations.pause(tokenization_token: string): void`\n\n**post** `/v1/tokenizations/{tokenization_token}/pause`\n\nThis endpoint is used to ask the card network to pause a tokenization. A successful response indicates that the request was successfully delivered to the card network. When the card network pauses the tokenization, the state will be updated and a tokenization.updated event will be sent. The endpoint may only be used on tokenizations with status `ACTIVE`.\nA paused token will prevent merchants from sending authorizations, and is a temporary status that can be changed.\nReach out at [lithic.com/contact](https://lithic.com/contact) for more information.\n\n### Parameters\n\n- `tokenization_token: string`\n\n### Example\n\n```typescript\nimport Lithic from 'lithic';\n\nconst client = new Lithic();\n\nawait client.tokenizations.pause('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e')\n```",
  },
  {
    name: 'resend_activation_code',
    endpoint: '/v1/tokenizations/{tokenization_token}/resend_activation_code',
    httpMethod: 'post',
    summary: 'Resend activation code for a card tokenization',
    description:
      'This endpoint is used to ask the card network to send another activation code to a cardholder that has already tried tokenizing a card. A successful response indicates that the request was successfully delivered to the card network.\nThe endpoint may only be used on Mastercard digital wallet tokenizations with status `INACTIVE`, `PENDING_ACTIVATION`, or `PENDING_2FA`. The network will send a new activation code to the one of the contact methods provided in the initial tokenization flow. If a user fails to enter the code correctly 3 times, the contact method will not be eligible for resending the activation code, and the cardholder must restart the provision process.\nReach out at [lithic.com/contact](https://lithic.com/contact) for more information.',
    stainlessPath: '(resource) tokenizations > (method) resend_activation_code',
    qualified: 'client.tokenizations.resendActivationCode',
    params: [
      'tokenization_token: string;',
      "activation_method_type?: 'EMAIL_TO_CARDHOLDER_ADDRESS' | 'TEXT_TO_CARDHOLDER_NUMBER';",
    ],
    markdown:
      "## resend_activation_code\n\n`client.tokenizations.resendActivationCode(tokenization_token: string, activation_method_type?: 'EMAIL_TO_CARDHOLDER_ADDRESS' | 'TEXT_TO_CARDHOLDER_NUMBER'): void`\n\n**post** `/v1/tokenizations/{tokenization_token}/resend_activation_code`\n\nThis endpoint is used to ask the card network to send another activation code to a cardholder that has already tried tokenizing a card. A successful response indicates that the request was successfully delivered to the card network.\nThe endpoint may only be used on Mastercard digital wallet tokenizations with status `INACTIVE`, `PENDING_ACTIVATION`, or `PENDING_2FA`. The network will send a new activation code to the one of the contact methods provided in the initial tokenization flow. If a user fails to enter the code correctly 3 times, the contact method will not be eligible for resending the activation code, and the cardholder must restart the provision process.\nReach out at [lithic.com/contact](https://lithic.com/contact) for more information.\n\n### Parameters\n\n- `tokenization_token: string`\n\n- `activation_method_type?: 'EMAIL_TO_CARDHOLDER_ADDRESS' | 'TEXT_TO_CARDHOLDER_NUMBER'`\n  The communication method that the user has selected to use to receive the authentication code.\nSupported Values: Sms = \"TEXT_TO_CARDHOLDER_NUMBER\". Email = \"EMAIL_TO_CARDHOLDER_ADDRESS\"\n\n### Example\n\n```typescript\nimport Lithic from 'lithic';\n\nconst client = new Lithic();\n\nawait client.tokenizations.resendActivationCode('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e')\n```",
  },
  {
    name: 'simulate',
    endpoint: '/v1/simulate/tokenizations',
    httpMethod: 'post',
    summary: "Simulate a card's tokenization",
    description:
      "This endpoint is used to simulate a card's tokenization in the Digital Wallet and merchant tokenization ecosystem.\n",
    stainlessPath: '(resource) tokenizations > (method) simulate',
    qualified: 'client.tokenizations.simulate',
    params: [
      'cvv: string;',
      'expiration_date: string;',
      'pan: string;',
      "tokenization_source: 'APPLE_PAY' | 'GOOGLE' | 'SAMSUNG_PAY' | 'MERCHANT';",
      'account_score?: number;',
      'device_score?: number;',
      'entity?: string;',
      "wallet_recommended_decision?: 'APPROVED' | 'DECLINED' | 'REQUIRE_ADDITIONAL_AUTHENTICATION';",
    ],
    response:
      "{ token: string; account_token: string; card_token: string; created_at: string; dpan: string; status: 'ACTIVE' | 'DEACTIVATED' | 'INACTIVE' | 'PAUSED' | 'PENDING_2FA' | 'PENDING_ACTIVATION' | 'UNKNOWN'; token_requestor_name: string | string; token_unique_reference: string; tokenization_channel: 'DIGITAL_WALLET' | 'MERCHANT'; updated_at: string; device_id?: string; digital_card_art_token?: string; events?: { token?: string; created_at?: string; result?: string; rule_results?: object[]; tokenization_decline_reasons?: string[]; tokenization_tfa_reasons?: string[]; type?: string; }[]; payment_account_reference_id?: string; }",
    markdown:
      "## simulate\n\n`client.tokenizations.simulate(cvv: string, expiration_date: string, pan: string, tokenization_source: 'APPLE_PAY' | 'GOOGLE' | 'SAMSUNG_PAY' | 'MERCHANT', account_score?: number, device_score?: number, entity?: string, wallet_recommended_decision?: 'APPROVED' | 'DECLINED' | 'REQUIRE_ADDITIONAL_AUTHENTICATION'): { token: string; account_token: string; card_token: string; created_at: string; dpan: string; status: 'ACTIVE' | 'DEACTIVATED' | 'INACTIVE' | 'PAUSED' | 'PENDING_2FA' | 'PENDING_ACTIVATION' | 'UNKNOWN'; token_requestor_name: string | string; token_unique_reference: string; tokenization_channel: 'DIGITAL_WALLET' | 'MERCHANT'; updated_at: string; device_id?: string; digital_card_art_token?: string; events?: object[]; payment_account_reference_id?: string; }`\n\n**post** `/v1/simulate/tokenizations`\n\nThis endpoint is used to simulate a card's tokenization in the Digital Wallet and merchant tokenization ecosystem.\n\n\n### Parameters\n\n- `cvv: string`\n  The three digit cvv for the card.\n\n- `expiration_date: string`\n  The expiration date of the card in 'MM/YY' format.\n\n- `pan: string`\n  The sixteen digit card number.\n\n- `tokenization_source: 'APPLE_PAY' | 'GOOGLE' | 'SAMSUNG_PAY' | 'MERCHANT'`\n  The source of the tokenization request.\n\n- `account_score?: number`\n  The account score (1-5) that represents how the Digital Wallet's view on how reputable an end user's account is.\n\n- `device_score?: number`\n  The device score (1-5) that represents how the Digital Wallet's view on how reputable an end user's device is.\n\n- `entity?: string`\n  Optional field to specify the token requestor name for a merchant token simulation. Ignored when tokenization_source is not MERCHANT.\n\n- `wallet_recommended_decision?: 'APPROVED' | 'DECLINED' | 'REQUIRE_ADDITIONAL_AUTHENTICATION'`\n  The decision that the Digital Wallet's recommend\n\n### Returns\n\n- `{ token: string; account_token: string; card_token: string; created_at: string; dpan: string; status: 'ACTIVE' | 'DEACTIVATED' | 'INACTIVE' | 'PAUSED' | 'PENDING_2FA' | 'PENDING_ACTIVATION' | 'UNKNOWN'; token_requestor_name: string | string; token_unique_reference: string; tokenization_channel: 'DIGITAL_WALLET' | 'MERCHANT'; updated_at: string; device_id?: string; digital_card_art_token?: string; events?: { token?: string; created_at?: string; result?: string; rule_results?: object[]; tokenization_decline_reasons?: string[]; tokenization_tfa_reasons?: string[]; type?: string; }[]; payment_account_reference_id?: string; }`\n\n  - `token: string`\n  - `account_token: string`\n  - `card_token: string`\n  - `created_at: string`\n  - `dpan: string`\n  - `status: 'ACTIVE' | 'DEACTIVATED' | 'INACTIVE' | 'PAUSED' | 'PENDING_2FA' | 'PENDING_ACTIVATION' | 'UNKNOWN'`\n  - `token_requestor_name: string | string`\n  - `token_unique_reference: string`\n  - `tokenization_channel: 'DIGITAL_WALLET' | 'MERCHANT'`\n  - `updated_at: string`\n  - `device_id?: string`\n  - `digital_card_art_token?: string`\n  - `events?: { token?: string; created_at?: string; result?: string; rule_results?: { auth_rule_token: string; explanation: string; name: string; result: 'APPROVED' | 'DECLINED' | 'REQUIRE_TFA' | 'ERROR'; }[]; tokenization_decline_reasons?: string[]; tokenization_tfa_reasons?: string[]; type?: string; }[]`\n  - `payment_account_reference_id?: string`\n\n### Example\n\n```typescript\nimport Lithic from 'lithic';\n\nconst client = new Lithic();\n\nconst tokenization = await client.tokenizations.simulate({\n  cvv: '776',\n  expiration_date: '08/29',\n  pan: '4111111289144142',\n  tokenization_source: 'APPLE_PAY',\n});\n\nconsole.log(tokenization);\n```",
  },
  {
    name: 'unpause',
    endpoint: '/v1/tokenizations/{tokenization_token}/unpause',
    httpMethod: 'post',
    summary: 'Unpause a card tokenization',
    description:
      'This endpoint is used to ask the card network to unpause a tokenization. A successful response indicates that the request was successfully delivered to the card network. When the card network unpauses the tokenization, the state will be updated and a tokenization.updated event will be sent. The endpoint may only be used on tokenizations with status `PAUSED`.\nThis will put the tokenization in an active state, and transactions may resume.\nReach out at [lithic.com/contact](https://lithic.com/contact) for more information.',
    stainlessPath: '(resource) tokenizations > (method) unpause',
    qualified: 'client.tokenizations.unpause',
    params: ['tokenization_token: string;'],
    markdown:
      "## unpause\n\n`client.tokenizations.unpause(tokenization_token: string): void`\n\n**post** `/v1/tokenizations/{tokenization_token}/unpause`\n\nThis endpoint is used to ask the card network to unpause a tokenization. A successful response indicates that the request was successfully delivered to the card network. When the card network unpauses the tokenization, the state will be updated and a tokenization.updated event will be sent. The endpoint may only be used on tokenizations with status `PAUSED`.\nThis will put the tokenization in an active state, and transactions may resume.\nReach out at [lithic.com/contact](https://lithic.com/contact) for more information.\n\n### Parameters\n\n- `tokenization_token: string`\n\n### Example\n\n```typescript\nimport Lithic from 'lithic';\n\nconst client = new Lithic();\n\nawait client.tokenizations.unpause('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e')\n```",
  },
  {
    name: 'update_digital_card_art',
    endpoint: '/v1/tokenizations/{tokenization_token}/update_digital_card_art',
    httpMethod: 'post',
    summary: 'Update digital card art for a card tokenization',
    description:
      "This endpoint is used update the digital card art for a digital wallet tokenization. A successful response indicates that the card network has updated the tokenization's art, and the tokenization's `digital_cart_art_token` field was updated.\nThe endpoint may not be used on tokenizations with status `DEACTIVATED`.\nNote that this updates the art for one specific tokenization, not all tokenizations for a card. New tokenizations for a card will be created with the art referenced in the card object's `digital_card_art_token` field.\nReach out at [lithic.com/contact](https://lithic.com/contact) for more information.",
    stainlessPath: '(resource) tokenizations > (method) update_digital_card_art',
    qualified: 'client.tokenizations.updateDigitalCardArt',
    params: ['tokenization_token: string;', 'digital_card_art_token?: string;'],
    response:
      "{ token: string; account_token: string; card_token: string; created_at: string; dpan: string; status: 'ACTIVE' | 'DEACTIVATED' | 'INACTIVE' | 'PAUSED' | 'PENDING_2FA' | 'PENDING_ACTIVATION' | 'UNKNOWN'; token_requestor_name: string | string; token_unique_reference: string; tokenization_channel: 'DIGITAL_WALLET' | 'MERCHANT'; updated_at: string; device_id?: string; digital_card_art_token?: string; events?: { token?: string; created_at?: string; result?: string; rule_results?: object[]; tokenization_decline_reasons?: string[]; tokenization_tfa_reasons?: string[]; type?: string; }[]; payment_account_reference_id?: string; }",
    markdown:
      "## update_digital_card_art\n\n`client.tokenizations.updateDigitalCardArt(tokenization_token: string, digital_card_art_token?: string): { token: string; account_token: string; card_token: string; created_at: string; dpan: string; status: 'ACTIVE' | 'DEACTIVATED' | 'INACTIVE' | 'PAUSED' | 'PENDING_2FA' | 'PENDING_ACTIVATION' | 'UNKNOWN'; token_requestor_name: string | string; token_unique_reference: string; tokenization_channel: 'DIGITAL_WALLET' | 'MERCHANT'; updated_at: string; device_id?: string; digital_card_art_token?: string; events?: object[]; payment_account_reference_id?: string; }`\n\n**post** `/v1/tokenizations/{tokenization_token}/update_digital_card_art`\n\nThis endpoint is used update the digital card art for a digital wallet tokenization. A successful response indicates that the card network has updated the tokenization's art, and the tokenization's `digital_cart_art_token` field was updated.\nThe endpoint may not be used on tokenizations with status `DEACTIVATED`.\nNote that this updates the art for one specific tokenization, not all tokenizations for a card. New tokenizations for a card will be created with the art referenced in the card object's `digital_card_art_token` field.\nReach out at [lithic.com/contact](https://lithic.com/contact) for more information.\n\n### Parameters\n\n- `tokenization_token: string`\n\n- `digital_card_art_token?: string`\n  Specifies the digital card art to be displayed in the user’s digital wallet for a tokenization. This artwork must be approved by the network and configured by Lithic to use. See [Flexible Card Art Guide](https://docs.lithic.com/docs/about-digital-wallets#flexible-card-art).\n\n### Returns\n\n- `{ token: string; account_token: string; card_token: string; created_at: string; dpan: string; status: 'ACTIVE' | 'DEACTIVATED' | 'INACTIVE' | 'PAUSED' | 'PENDING_2FA' | 'PENDING_ACTIVATION' | 'UNKNOWN'; token_requestor_name: string | string; token_unique_reference: string; tokenization_channel: 'DIGITAL_WALLET' | 'MERCHANT'; updated_at: string; device_id?: string; digital_card_art_token?: string; events?: { token?: string; created_at?: string; result?: string; rule_results?: object[]; tokenization_decline_reasons?: string[]; tokenization_tfa_reasons?: string[]; type?: string; }[]; payment_account_reference_id?: string; }`\n\n  - `token: string`\n  - `account_token: string`\n  - `card_token: string`\n  - `created_at: string`\n  - `dpan: string`\n  - `status: 'ACTIVE' | 'DEACTIVATED' | 'INACTIVE' | 'PAUSED' | 'PENDING_2FA' | 'PENDING_ACTIVATION' | 'UNKNOWN'`\n  - `token_requestor_name: string | string`\n  - `token_unique_reference: string`\n  - `tokenization_channel: 'DIGITAL_WALLET' | 'MERCHANT'`\n  - `updated_at: string`\n  - `device_id?: string`\n  - `digital_card_art_token?: string`\n  - `events?: { token?: string; created_at?: string; result?: string; rule_results?: { auth_rule_token: string; explanation: string; name: string; result: 'APPROVED' | 'DECLINED' | 'REQUIRE_TFA' | 'ERROR'; }[]; tokenization_decline_reasons?: string[]; tokenization_tfa_reasons?: string[]; type?: string; }[]`\n  - `payment_account_reference_id?: string`\n\n### Example\n\n```typescript\nimport Lithic from 'lithic';\n\nconst client = new Lithic();\n\nconst tokenization = await client.tokenizations.updateDigitalCardArt('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e');\n\nconsole.log(tokenization);\n```",
  },
  {
    name: 'create',
    endpoint: '/v1/cards',
    httpMethod: 'post',
    summary: 'Create card',
    description:
      'Create a new virtual or physical card. Parameters `shipping_address` and `product_id` only apply to physical cards.\n',
    stainlessPath: '(resource) cards > (method) create',
    qualified: 'client.cards.create',
    params: [
      "type: 'MERCHANT_LOCKED' | 'PHYSICAL' | 'SINGLE_USE' | 'VIRTUAL' | 'UNLOCKED' | 'DIGITAL_WALLET';",
      'account_token?: string;',
      'bulk_order_token?: string;',
      'card_program_token?: string;',
      'carrier?: { qr_code_url?: string; };',
      'digital_card_art_token?: string;',
      'exp_month?: string;',
      'exp_year?: string;',
      'memo?: string;',
      'pin?: string;',
      'product_id?: string;',
      'replacement_account_token?: string;',
      'replacement_comment?: string;',
      'replacement_for?: string;',
      'replacement_substatus?: string;',
      'shipping_address?: { address1: string; city: string; country: string; first_name: string; last_name: string; postal_code: string; state: string; address2?: string; email?: string; line2_text?: string; phone_number?: string; };',
      "shipping_method?: '2_DAY' | 'BULK' | 'EXPEDITED' | 'EXPRESS' | 'PRIORITY' | 'STANDARD' | 'STANDARD_WITH_TRACKING';",
      'spend_limit?: number;',
      "spend_limit_duration?: 'ANNUALLY' | 'FOREVER' | 'MONTHLY' | 'TRANSACTION';",
      "state?: 'OPEN' | 'PAUSED';",
      'Idempotency-Key?: string;',
    ],
    response:
      "{ token: string; account_token: string; card_program_token: string; created: string; funding: { token: string; created: string; last_four: string; state: 'DELETED' | 'ENABLED' | 'PENDING'; type: 'DEPOSITORY_CHECKING' | 'DEPOSITORY_SAVINGS'; account_name?: string; nickname?: string; }; last_four: string; pin_status: 'OK' | 'BLOCKED' | 'NOT_SET'; spend_limit: number; spend_limit_duration: 'ANNUALLY' | 'FOREVER' | 'MONTHLY' | 'TRANSACTION'; state: 'CLOSED' | 'OPEN' | 'PAUSED' | 'PENDING_ACTIVATION' | 'PENDING_FULFILLMENT'; type: 'MERCHANT_LOCKED' | 'PHYSICAL' | 'SINGLE_USE' | 'VIRTUAL' | 'UNLOCKED' | 'DIGITAL_WALLET'; auth_rule_tokens?: string[]; bulk_order_token?: string; cardholder_currency?: string; comment?: string; digital_card_art_token?: string; exp_month?: string; exp_year?: string; hostname?: string; memo?: string; network_program_token?: string; pending_commands?: string[]; product_id?: string; replacement_for?: string; substatus?: string; }",
    markdown:
      "## create\n\n`client.cards.create(type: 'MERCHANT_LOCKED' | 'PHYSICAL' | 'SINGLE_USE' | 'VIRTUAL' | 'UNLOCKED' | 'DIGITAL_WALLET', account_token?: string, bulk_order_token?: string, card_program_token?: string, carrier?: { qr_code_url?: string; }, digital_card_art_token?: string, exp_month?: string, exp_year?: string, memo?: string, pin?: string, product_id?: string, replacement_account_token?: string, replacement_comment?: string, replacement_for?: string, replacement_substatus?: string, shipping_address?: { address1: string; city: string; country: string; first_name: string; last_name: string; postal_code: string; state: string; address2?: string; email?: string; line2_text?: string; phone_number?: string; }, shipping_method?: '2_DAY' | 'BULK' | 'EXPEDITED' | 'EXPRESS' | 'PRIORITY' | 'STANDARD' | 'STANDARD_WITH_TRACKING', spend_limit?: number, spend_limit_duration?: 'ANNUALLY' | 'FOREVER' | 'MONTHLY' | 'TRANSACTION', state?: 'OPEN' | 'PAUSED', Idempotency-Key?: string): object`\n\n**post** `/v1/cards`\n\nCreate a new virtual or physical card. Parameters `shipping_address` and `product_id` only apply to physical cards.\n\n\n### Parameters\n\n- `type: 'MERCHANT_LOCKED' | 'PHYSICAL' | 'SINGLE_USE' | 'VIRTUAL' | 'UNLOCKED' | 'DIGITAL_WALLET'`\n  Card types:\n* `VIRTUAL` - Card will authorize at any merchant and can be added to a digital wallet like Apple Pay or Google Pay (if the card program is digital wallet-enabled).\n* `PHYSICAL` - Manufactured and sent to the cardholder. We offer white label branding, credit, ATM, PIN debit, chip/EMV, NFC and magstripe functionality. Reach out at [lithic.com/contact](https://lithic.com/contact) for more information.\n* `SINGLE_USE` - Card is closed upon first successful authorization.\n* `MERCHANT_LOCKED` - Card is locked to the first merchant that successfully authorizes the card.\n* `UNLOCKED` - *[Deprecated]* Similar behavior to VIRTUAL cards, please use VIRTUAL instead.\n* `DIGITAL_WALLET` - *[Deprecated]* Similar behavior to VIRTUAL cards, please use VIRTUAL instead.\n\n- `account_token?: string`\n  Globally unique identifier for the account that the card will be associated with. Required for programs enrolling users using the [/account\\_holders endpoint](https://docs.lithic.com/docs/account-holders-kyc). See [Managing Your Program](doc:managing-your-program) for more information.\n\n\n- `bulk_order_token?: string`\n  Globally unique identifier for an existing bulk order to associate this card with. When specified, the card will be added to the bulk order for batch shipment. Only applicable to cards of type PHYSICAL\n\n- `card_program_token?: string`\n  For card programs with more than one BIN range. This must be configured with Lithic before use. Identifies the card program/BIN range under which to create the card. If omitted, will utilize the program's default `card_program_token`. In Sandbox, use 00000000-0000-0000-1000-000000000000 and 00000000-0000-0000-2000-000000000000 to test creating cards on specific card programs.\n\n- `carrier?: { qr_code_url?: string; }`\n  - `qr_code_url?: string`\n    QR code URL to display on the card carrier. The `qr_code_url` field requires your domain to be allowlisted by Lithic before use. Contact Support to configure your QR code domain\n\n- `digital_card_art_token?: string`\n  Specifies the digital card art to be displayed in the user’s digital wallet after tokenization. This artwork must be approved by Mastercard and configured by Lithic to use. See [Flexible Card Art Guide](https://docs.lithic.com/docs/about-digital-wallets#flexible-card-art).\n\n- `exp_month?: string`\n  Two digit (MM) expiry month. If neither `exp_month` nor `exp_year` is provided, an expiration date will be generated.\n\n- `exp_year?: string`\n  Four digit (yyyy) expiry year. If neither `exp_month` nor `exp_year` is provided, an expiration date will be generated.\n\n- `memo?: string`\n  Friendly name to identify the card.\n\n- `pin?: string`\n  Encrypted PIN block (in base64). Applies to cards of type `PHYSICAL` and `VIRTUAL`. See [Encrypted PIN Block](https://docs.lithic.com/docs/cards#encrypted-pin-block).\n\n- `product_id?: string`\n  Only applicable to cards of type `PHYSICAL`. This must be configured with Lithic before use. Specifies the configuration (i.e., physical card art) that the card should be manufactured with.\n\n- `replacement_account_token?: string`\n  Restricted field limited to select use cases. Lithic will reach out directly if this field should be used. Globally unique identifier for the replacement card's account. If this field is specified, `replacement_for` must also be specified. If `replacement_for` is specified and this field is omitted, the replacement card's account will be inferred from the card being replaced.\n\n- `replacement_comment?: string`\n  Additional context or information related to the card that this card will replace.\n\n- `replacement_for?: string`\n  Globally unique identifier for the card that this card will replace. If the card type is `PHYSICAL` it will be replaced by a `PHYSICAL` card. If the card type is `VIRTUAL` it will be replaced by a `VIRTUAL` card.\n\n- `replacement_substatus?: string`\n  Card state substatus values for the card that this card will replace:\n* `LOST` - The physical card is no longer in the cardholder's possession due to being lost or never received by the cardholder.\n* `COMPROMISED` - Card information has been exposed, potentially leading to unauthorized access. This may involve physical card theft, cloning, or online data breaches.\n* `DAMAGED` - The physical card is not functioning properly, such as having chip failures or a demagnetized magnetic stripe.\n* `END_USER_REQUEST` - The cardholder requested the closure of the card for reasons unrelated to fraud or damage, such as switching to a different product or closing the account.\n* `ISSUER_REQUEST` - The issuer closed the card for reasons unrelated to fraud or damage, such as account inactivity, product or policy changes, or technology upgrades.\n* `NOT_ACTIVE` - The card hasn’t had any transaction activity for a specified period, applicable to statuses like `PAUSED` or `CLOSED`.\n* `SUSPICIOUS_ACTIVITY` - The card has one or more suspicious transactions or activities that require review. This can involve prompting the cardholder to confirm legitimate use or report confirmed fraud.\n* `INTERNAL_REVIEW` - The card is temporarily paused pending further internal review.\n* `EXPIRED` - The card has expired and has been closed without being reissued.\n* `UNDELIVERABLE` - The card cannot be delivered to the cardholder and has been returned.\n* `OTHER` - The reason for the status does not fall into any of the above categories. A comment should be provided to specify the reason.\n\n- `shipping_address?: { address1: string; city: string; country: string; first_name: string; last_name: string; postal_code: string; state: string; address2?: string; email?: string; line2_text?: string; phone_number?: string; }`\n  - `address1: string`\n    Valid USPS routable address.\n  - `city: string`\n    City\n  - `country: string`\n    Uppercase ISO 3166-1 alpha-3 three character abbreviation.\n  - `first_name: string`\n    Customer's first name. This will be the first name printed on the physical card. The combined length of `first_name` and `last_name` may not exceed 25 characters.\n  - `last_name: string`\n    Customer's surname (family name). This will be the last name printed on the physical card. The combined length of `first_name` and `last_name` may not exceed 25 characters.\n  - `postal_code: string`\n    Postal code (formerly zipcode). For US addresses, either five-digit postal code or nine-digit postal code (ZIP+4) using the format 12345-1234.\n  - `state: string`\n    Uppercase ISO 3166-2 two character abbreviation for US and CA. Optional with a limit of 24 characters for other countries.\n  - `address2?: string`\n    Unit number (if applicable).\n  - `email?: string`\n    Email address to be contacted for expedited shipping process purposes. Required if `shipping_method` is `EXPEDITED`.\n  - `line2_text?: string`\n    Text to be printed on line two of the physical card. Use of this field requires additional permissions.\n  - `phone_number?: string`\n    Cardholder's phone number in E.164 format to be contacted for expedited shipping process purposes. Required if `shipping_method` is `EXPEDITED`.\n\n- `shipping_method?: '2_DAY' | 'BULK' | 'EXPEDITED' | 'EXPRESS' | 'PRIORITY' | 'STANDARD' | 'STANDARD_WITH_TRACKING'`\n  Shipping method for the card. Only applies to cards of type PHYSICAL.\nUse of options besides `STANDARD` require additional permissions.\n\n* `STANDARD` - USPS regular mail or similar international option, with no tracking\n* `STANDARD_WITH_TRACKING` - USPS regular mail or similar international option, with tracking\n* `PRIORITY` - USPS Priority, 1-3 day shipping, with tracking\n* `EXPRESS` - FedEx or UPS depending on card manufacturer, Express, 3-day shipping, with tracking\n* `2_DAY` - FedEx or UPS depending on card manufacturer, 2-day shipping, with tracking\n* `EXPEDITED` - FedEx or UPS depending on card manufacturer, Standard Overnight or similar international option, with tracking\n* `BULK` - Card will be shipped as part of a bulk fulfillment order. The shipping method and timeline are inherited from the parent bulk order.\n\n- `spend_limit?: number`\n  Amount (in cents) to limit approved authorizations (e.g. 100000 would be a $1,000 limit). Transaction requests above the spend limit will be declined. Note that a spend limit of 0 is effectively no limit, and should only be used to reset or remove a prior limit. Only a limit of 1 or above will result in declined transactions due to checks against the card limit.\n\n- `spend_limit_duration?: 'ANNUALLY' | 'FOREVER' | 'MONTHLY' | 'TRANSACTION'`\n  Spend limit duration values:\n\n* `ANNUALLY` - Card will authorize transactions up to spend limit for the trailing year.\n* `FOREVER` - Card will authorize only up to spend limit for the entire lifetime of the card.\n* `MONTHLY` - Card will authorize transactions up to spend limit for the trailing month. To support recurring monthly payments, which can occur on different day every month, the time window we consider for monthly velocity starts 6 days after the current calendar date one month prior.\n* `TRANSACTION` - Card will authorize multiple transactions if each individual transaction is under the spend limit.\n\n- `state?: 'OPEN' | 'PAUSED'`\n  Card state values:\n* `OPEN` - Card will approve authorizations (if they match card and account parameters).\n* `PAUSED` - Card will decline authorizations, but can be resumed at a later time.\n\n- `Idempotency-Key?: string`\n\n### Returns\n\n- `{ token: string; account_token: string; card_program_token: string; created: string; funding: { token: string; created: string; last_four: string; state: 'DELETED' | 'ENABLED' | 'PENDING'; type: 'DEPOSITORY_CHECKING' | 'DEPOSITORY_SAVINGS'; account_name?: string; nickname?: string; }; last_four: string; pin_status: 'OK' | 'BLOCKED' | 'NOT_SET'; spend_limit: number; spend_limit_duration: 'ANNUALLY' | 'FOREVER' | 'MONTHLY' | 'TRANSACTION'; state: 'CLOSED' | 'OPEN' | 'PAUSED' | 'PENDING_ACTIVATION' | 'PENDING_FULFILLMENT'; type: 'MERCHANT_LOCKED' | 'PHYSICAL' | 'SINGLE_USE' | 'VIRTUAL' | 'UNLOCKED' | 'DIGITAL_WALLET'; auth_rule_tokens?: string[]; bulk_order_token?: string; cardholder_currency?: string; comment?: string; digital_card_art_token?: string; exp_month?: string; exp_year?: string; hostname?: string; memo?: string; network_program_token?: string; pending_commands?: string[]; product_id?: string; replacement_for?: string; substatus?: string; }`\n  Card details with potentially PCI sensitive information for Enterprise customers\n\n### Example\n\n```typescript\nimport Lithic from 'lithic';\n\nconst client = new Lithic();\n\nconst card = await client.cards.create({ type: 'VIRTUAL' });\n\nconsole.log(card);\n```",
  },
  {
    name: 'retrieve',
    endpoint: '/v1/cards/{card_token}',
    httpMethod: 'get',
    summary: 'Get card',
    description: 'Get card configuration such as spend limit and state.',
    stainlessPath: '(resource) cards > (method) retrieve',
    qualified: 'client.cards.retrieve',
    params: ['card_token: string;'],
    response:
      "{ token: string; account_token: string; card_program_token: string; created: string; funding: { token: string; created: string; last_four: string; state: 'DELETED' | 'ENABLED' | 'PENDING'; type: 'DEPOSITORY_CHECKING' | 'DEPOSITORY_SAVINGS'; account_name?: string; nickname?: string; }; last_four: string; pin_status: 'OK' | 'BLOCKED' | 'NOT_SET'; spend_limit: number; spend_limit_duration: 'ANNUALLY' | 'FOREVER' | 'MONTHLY' | 'TRANSACTION'; state: 'CLOSED' | 'OPEN' | 'PAUSED' | 'PENDING_ACTIVATION' | 'PENDING_FULFILLMENT'; type: 'MERCHANT_LOCKED' | 'PHYSICAL' | 'SINGLE_USE' | 'VIRTUAL' | 'UNLOCKED' | 'DIGITAL_WALLET'; auth_rule_tokens?: string[]; bulk_order_token?: string; cardholder_currency?: string; comment?: string; digital_card_art_token?: string; exp_month?: string; exp_year?: string; hostname?: string; memo?: string; network_program_token?: string; pending_commands?: string[]; product_id?: string; replacement_for?: string; substatus?: string; }",
    markdown:
      "## retrieve\n\n`client.cards.retrieve(card_token: string): object`\n\n**get** `/v1/cards/{card_token}`\n\nGet card configuration such as spend limit and state.\n\n### Parameters\n\n- `card_token: string`\n\n### Returns\n\n- `{ token: string; account_token: string; card_program_token: string; created: string; funding: { token: string; created: string; last_four: string; state: 'DELETED' | 'ENABLED' | 'PENDING'; type: 'DEPOSITORY_CHECKING' | 'DEPOSITORY_SAVINGS'; account_name?: string; nickname?: string; }; last_four: string; pin_status: 'OK' | 'BLOCKED' | 'NOT_SET'; spend_limit: number; spend_limit_duration: 'ANNUALLY' | 'FOREVER' | 'MONTHLY' | 'TRANSACTION'; state: 'CLOSED' | 'OPEN' | 'PAUSED' | 'PENDING_ACTIVATION' | 'PENDING_FULFILLMENT'; type: 'MERCHANT_LOCKED' | 'PHYSICAL' | 'SINGLE_USE' | 'VIRTUAL' | 'UNLOCKED' | 'DIGITAL_WALLET'; auth_rule_tokens?: string[]; bulk_order_token?: string; cardholder_currency?: string; comment?: string; digital_card_art_token?: string; exp_month?: string; exp_year?: string; hostname?: string; memo?: string; network_program_token?: string; pending_commands?: string[]; product_id?: string; replacement_for?: string; substatus?: string; }`\n  Card details with potentially PCI sensitive information for Enterprise customers\n\n### Example\n\n```typescript\nimport Lithic from 'lithic';\n\nconst client = new Lithic();\n\nconst card = await client.cards.retrieve('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e');\n\nconsole.log(card);\n```",
  },
  {
    name: 'update',
    endpoint: '/v1/cards/{card_token}',
    httpMethod: 'patch',
    summary: 'Update card',
    description:
      'Update the specified properties of the card. Unsupplied properties will remain unchanged.\n\n*Note: setting a card to a `CLOSED` state is a final action that cannot be undone.*\n',
    stainlessPath: '(resource) cards > (method) update',
    qualified: 'client.cards.update',
    params: [
      'card_token: string;',
      'comment?: string;',
      'digital_card_art_token?: string;',
      'memo?: string;',
      'network_program_token?: string;',
      'pin?: string;',
      "pin_status?: 'OK';",
      'spend_limit?: number;',
      "spend_limit_duration?: 'ANNUALLY' | 'FOREVER' | 'MONTHLY' | 'TRANSACTION';",
      "state?: 'CLOSED' | 'OPEN' | 'PAUSED';",
      'substatus?: string;',
    ],
    response:
      "{ token: string; account_token: string; card_program_token: string; created: string; funding: { token: string; created: string; last_four: string; state: 'DELETED' | 'ENABLED' | 'PENDING'; type: 'DEPOSITORY_CHECKING' | 'DEPOSITORY_SAVINGS'; account_name?: string; nickname?: string; }; last_four: string; pin_status: 'OK' | 'BLOCKED' | 'NOT_SET'; spend_limit: number; spend_limit_duration: 'ANNUALLY' | 'FOREVER' | 'MONTHLY' | 'TRANSACTION'; state: 'CLOSED' | 'OPEN' | 'PAUSED' | 'PENDING_ACTIVATION' | 'PENDING_FULFILLMENT'; type: 'MERCHANT_LOCKED' | 'PHYSICAL' | 'SINGLE_USE' | 'VIRTUAL' | 'UNLOCKED' | 'DIGITAL_WALLET'; auth_rule_tokens?: string[]; bulk_order_token?: string; cardholder_currency?: string; comment?: string; digital_card_art_token?: string; exp_month?: string; exp_year?: string; hostname?: string; memo?: string; network_program_token?: string; pending_commands?: string[]; product_id?: string; replacement_for?: string; substatus?: string; }",
    markdown:
      "## update\n\n`client.cards.update(card_token: string, comment?: string, digital_card_art_token?: string, memo?: string, network_program_token?: string, pin?: string, pin_status?: 'OK', spend_limit?: number, spend_limit_duration?: 'ANNUALLY' | 'FOREVER' | 'MONTHLY' | 'TRANSACTION', state?: 'CLOSED' | 'OPEN' | 'PAUSED', substatus?: string): object`\n\n**patch** `/v1/cards/{card_token}`\n\nUpdate the specified properties of the card. Unsupplied properties will remain unchanged.\n\n*Note: setting a card to a `CLOSED` state is a final action that cannot be undone.*\n\n\n### Parameters\n\n- `card_token: string`\n\n- `comment?: string`\n  Additional context or information related to the card.\n\n- `digital_card_art_token?: string`\n  Specifies the digital card art to be displayed in the user’s digital wallet after tokenization. This artwork must be approved by Mastercard and configured by Lithic to use. See [Flexible Card Art Guide](https://docs.lithic.com/docs/about-digital-wallets#flexible-card-art).\n\n- `memo?: string`\n  Friendly name to identify the card.\n\n- `network_program_token?: string`\n  Globally unique identifier for the card's network program. Currently applicable to Visa cards participating in Account Level Management only.\n\n- `pin?: string`\n  Encrypted PIN block (in base64). Only applies to cards of type `PHYSICAL` and `VIRTUAL`. Changing PIN also resets PIN status to `OK`. See [Encrypted PIN Block](https://docs.lithic.com/docs/cards#encrypted-pin-block).\n\n- `pin_status?: 'OK'`\n  Indicates if a card is blocked due a PIN status issue (e.g. excessive incorrect attempts). Can only be set to `OK` to unblock a card.\n\n- `spend_limit?: number`\n  Amount (in cents) to limit approved authorizations (e.g. 100000 would be a $1,000 limit). Transaction requests above the spend limit will be declined. Note that a spend limit of 0 is effectively no limit, and should only be used to reset or remove a prior limit. Only a limit of 1 or above will result in declined transactions due to checks against the card limit.\n\n- `spend_limit_duration?: 'ANNUALLY' | 'FOREVER' | 'MONTHLY' | 'TRANSACTION'`\n  Spend limit duration values:\n\n* `ANNUALLY` - Card will authorize transactions up to spend limit for the trailing year.\n* `FOREVER` - Card will authorize only up to spend limit for the entire lifetime of the card.\n* `MONTHLY` - Card will authorize transactions up to spend limit for the trailing month. To support recurring monthly payments, which can occur on different day every month, the time window we consider for monthly velocity starts 6 days after the current calendar date one month prior.\n* `TRANSACTION` - Card will authorize multiple transactions if each individual transaction is under the spend limit.\n\n- `state?: 'CLOSED' | 'OPEN' | 'PAUSED'`\n  Card state values:\n* `CLOSED` - Card will no longer approve authorizations. Closing a card cannot be undone.\n* `OPEN` - Card will approve authorizations (if they match card and account parameters).\n* `PAUSED` - Card will decline authorizations, but can be resumed at a later time.\n\n- `substatus?: string`\n  Card state substatus values:\n* `LOST` - The physical card is no longer in the cardholder's possession due to being lost or never received by the cardholder.\n* `COMPROMISED` - Card information has been exposed, potentially leading to unauthorized access. This may involve physical card theft, cloning, or online data breaches.\n* `DAMAGED` - The physical card is not functioning properly, such as having chip failures or a demagnetized magnetic stripe.\n* `END_USER_REQUEST` - The cardholder requested the closure of the card for reasons unrelated to fraud or damage, such as switching to a different product or closing the account.\n* `ISSUER_REQUEST` - The issuer closed the card for reasons unrelated to fraud or damage, such as account inactivity, product or policy changes, or technology upgrades.\n* `NOT_ACTIVE` - The card hasn’t had any transaction activity for a specified period, applicable to statuses like `PAUSED` or `CLOSED`.\n* `SUSPICIOUS_ACTIVITY` - The card has one or more suspicious transactions or activities that require review. This can involve prompting the cardholder to confirm legitimate use or report confirmed fraud.\n* `INTERNAL_REVIEW` - The card is temporarily paused pending further internal review.\n* `EXPIRED` - The card has expired and has been closed without being reissued.\n* `UNDELIVERABLE` - The card cannot be delivered to the cardholder and has been returned.\n* `OTHER` - The reason for the status does not fall into any of the above categories. A comment should be provided to specify the reason.\n\n### Returns\n\n- `{ token: string; account_token: string; card_program_token: string; created: string; funding: { token: string; created: string; last_four: string; state: 'DELETED' | 'ENABLED' | 'PENDING'; type: 'DEPOSITORY_CHECKING' | 'DEPOSITORY_SAVINGS'; account_name?: string; nickname?: string; }; last_four: string; pin_status: 'OK' | 'BLOCKED' | 'NOT_SET'; spend_limit: number; spend_limit_duration: 'ANNUALLY' | 'FOREVER' | 'MONTHLY' | 'TRANSACTION'; state: 'CLOSED' | 'OPEN' | 'PAUSED' | 'PENDING_ACTIVATION' | 'PENDING_FULFILLMENT'; type: 'MERCHANT_LOCKED' | 'PHYSICAL' | 'SINGLE_USE' | 'VIRTUAL' | 'UNLOCKED' | 'DIGITAL_WALLET'; auth_rule_tokens?: string[]; bulk_order_token?: string; cardholder_currency?: string; comment?: string; digital_card_art_token?: string; exp_month?: string; exp_year?: string; hostname?: string; memo?: string; network_program_token?: string; pending_commands?: string[]; product_id?: string; replacement_for?: string; substatus?: string; }`\n  Card details with potentially PCI sensitive information for Enterprise customers\n\n### Example\n\n```typescript\nimport Lithic from 'lithic';\n\nconst client = new Lithic();\n\nconst card = await client.cards.update('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e');\n\nconsole.log(card);\n```",
  },
  {
    name: 'list',
    endpoint: '/v1/cards',
    httpMethod: 'get',
    summary: 'List cards',
    description: 'List cards.',
    stainlessPath: '(resource) cards > (method) list',
    qualified: 'client.cards.list',
    params: [
      'account_token?: string;',
      'begin?: string;',
      'end?: string;',
      'ending_before?: string;',
      'memo?: string;',
      'page_size?: number;',
      'starting_after?: string;',
      "state?: 'CLOSED' | 'OPEN' | 'PAUSED' | 'PENDING_ACTIVATION' | 'PENDING_FULFILLMENT';",
    ],
    response:
      "{ token: string; account_token: string; card_program_token: string; created: string; funding: { token: string; created: string; last_four: string; state: 'DELETED' | 'ENABLED' | 'PENDING'; type: 'DEPOSITORY_CHECKING' | 'DEPOSITORY_SAVINGS'; account_name?: string; nickname?: string; }; last_four: string; pin_status: 'OK' | 'BLOCKED' | 'NOT_SET'; spend_limit: number; spend_limit_duration: 'ANNUALLY' | 'FOREVER' | 'MONTHLY' | 'TRANSACTION'; state: 'CLOSED' | 'OPEN' | 'PAUSED' | 'PENDING_ACTIVATION' | 'PENDING_FULFILLMENT'; type: 'MERCHANT_LOCKED' | 'PHYSICAL' | 'SINGLE_USE' | 'VIRTUAL' | 'UNLOCKED' | 'DIGITAL_WALLET'; auth_rule_tokens?: string[]; bulk_order_token?: string; cardholder_currency?: string; comment?: string; digital_card_art_token?: string; exp_month?: string; exp_year?: string; hostname?: string; memo?: string; network_program_token?: string; pending_commands?: string[]; product_id?: string; replacement_for?: string; substatus?: string; }",
    markdown:
      "## list\n\n`client.cards.list(account_token?: string, begin?: string, end?: string, ending_before?: string, memo?: string, page_size?: number, starting_after?: string, state?: 'CLOSED' | 'OPEN' | 'PAUSED' | 'PENDING_ACTIVATION' | 'PENDING_FULFILLMENT'): { token: string; account_token: string; card_program_token: string; created: string; funding: object; last_four: string; pin_status: 'OK' | 'BLOCKED' | 'NOT_SET'; spend_limit: number; spend_limit_duration: spend_limit_duration; state: 'CLOSED' | 'OPEN' | 'PAUSED' | 'PENDING_ACTIVATION' | 'PENDING_FULFILLMENT'; type: 'MERCHANT_LOCKED' | 'PHYSICAL' | 'SINGLE_USE' | 'VIRTUAL' | 'UNLOCKED' | 'DIGITAL_WALLET'; auth_rule_tokens?: string[]; bulk_order_token?: string; cardholder_currency?: string; comment?: string; digital_card_art_token?: string; exp_month?: string; exp_year?: string; hostname?: string; memo?: string; network_program_token?: string; pending_commands?: string[]; product_id?: string; replacement_for?: string; substatus?: string; }`\n\n**get** `/v1/cards`\n\nList cards.\n\n### Parameters\n\n- `account_token?: string`\n  Returns cards associated with the specified account.\n\n\n- `begin?: string`\n  Date string in RFC 3339 format. Only entries created after the specified time will be included. UTC time zone.\n\n- `end?: string`\n  Date string in RFC 3339 format. Only entries created before the specified time will be included. UTC time zone.\n\n- `ending_before?: string`\n  A cursor representing an item's token before which a page of results should end. Used to retrieve the previous page of results before this item.\n\n- `memo?: string`\n  Returns cards containing the specified partial or full memo text.\n\n\n- `page_size?: number`\n  Page size (for pagination).\n\n- `starting_after?: string`\n  A cursor representing an item's token after which a page of results should begin. Used to retrieve the next page of results after this item.\n\n- `state?: 'CLOSED' | 'OPEN' | 'PAUSED' | 'PENDING_ACTIVATION' | 'PENDING_FULFILLMENT'`\n  Returns cards with the specified state.\n\n### Returns\n\n- `{ token: string; account_token: string; card_program_token: string; created: string; funding: { token: string; created: string; last_four: string; state: 'DELETED' | 'ENABLED' | 'PENDING'; type: 'DEPOSITORY_CHECKING' | 'DEPOSITORY_SAVINGS'; account_name?: string; nickname?: string; }; last_four: string; pin_status: 'OK' | 'BLOCKED' | 'NOT_SET'; spend_limit: number; spend_limit_duration: 'ANNUALLY' | 'FOREVER' | 'MONTHLY' | 'TRANSACTION'; state: 'CLOSED' | 'OPEN' | 'PAUSED' | 'PENDING_ACTIVATION' | 'PENDING_FULFILLMENT'; type: 'MERCHANT_LOCKED' | 'PHYSICAL' | 'SINGLE_USE' | 'VIRTUAL' | 'UNLOCKED' | 'DIGITAL_WALLET'; auth_rule_tokens?: string[]; bulk_order_token?: string; cardholder_currency?: string; comment?: string; digital_card_art_token?: string; exp_month?: string; exp_year?: string; hostname?: string; memo?: string; network_program_token?: string; pending_commands?: string[]; product_id?: string; replacement_for?: string; substatus?: string; }`\n  Card details without PCI information\n\n  - `token: string`\n  - `account_token: string`\n  - `card_program_token: string`\n  - `created: string`\n  - `funding: { token: string; created: string; last_four: string; state: 'DELETED' | 'ENABLED' | 'PENDING'; type: 'DEPOSITORY_CHECKING' | 'DEPOSITORY_SAVINGS'; account_name?: string; nickname?: string; }`\n  - `last_four: string`\n  - `pin_status: 'OK' | 'BLOCKED' | 'NOT_SET'`\n  - `spend_limit: number`\n  - `spend_limit_duration: 'ANNUALLY' | 'FOREVER' | 'MONTHLY' | 'TRANSACTION'`\n  - `state: 'CLOSED' | 'OPEN' | 'PAUSED' | 'PENDING_ACTIVATION' | 'PENDING_FULFILLMENT'`\n  - `type: 'MERCHANT_LOCKED' | 'PHYSICAL' | 'SINGLE_USE' | 'VIRTUAL' | 'UNLOCKED' | 'DIGITAL_WALLET'`\n  - `auth_rule_tokens?: string[]`\n  - `bulk_order_token?: string`\n  - `cardholder_currency?: string`\n  - `comment?: string`\n  - `digital_card_art_token?: string`\n  - `exp_month?: string`\n  - `exp_year?: string`\n  - `hostname?: string`\n  - `memo?: string`\n  - `network_program_token?: string`\n  - `pending_commands?: string[]`\n  - `product_id?: string`\n  - `replacement_for?: string`\n  - `substatus?: string`\n\n### Example\n\n```typescript\nimport Lithic from 'lithic';\n\nconst client = new Lithic();\n\n// Automatically fetches more pages as needed.\nfor await (const nonPCICard of client.cards.list()) {\n  console.log(nonPCICard);\n}\n```",
  },
  {
    name: 'convert_physical',
    endpoint: '/v1/cards/{card_token}/convert_physical',
    httpMethod: 'post',
    summary: 'Convert virtual to physical card',
    description:
      "Convert a virtual card into a physical card and manufacture it.\nCustomer must supply relevant fields for physical card creation including `product_id`, `carrier`, `shipping_method`, and `shipping_address`.\nThe card token will be unchanged.  The card's type will be altered to `PHYSICAL`.\nThe card will be set to state `PENDING_FULFILLMENT` and fulfilled at next fulfillment cycle.\nVirtual cards created on card programs which do not support physical cards cannot be converted.  The card program cannot be changed as part of the conversion.  Cards must be in an `OPEN` state to be converted.\nOnly applies to cards of type `VIRTUAL` (or existing cards with deprecated types of `DIGITAL_WALLET` and `UNLOCKED`).",
    stainlessPath: '(resource) cards > (method) convert_physical',
    qualified: 'client.cards.convertPhysical',
    params: [
      'card_token: string;',
      'shipping_address: { address1: string; city: string; country: string; first_name: string; last_name: string; postal_code: string; state: string; address2?: string; email?: string; line2_text?: string; phone_number?: string; };',
      'carrier?: { qr_code_url?: string; };',
      'product_id?: string;',
      "shipping_method?: '2_DAY' | 'BULK' | 'EXPEDITED' | 'EXPRESS' | 'PRIORITY' | 'STANDARD' | 'STANDARD_WITH_TRACKING';",
    ],
    response:
      "{ token: string; account_token: string; card_program_token: string; created: string; funding: { token: string; created: string; last_four: string; state: 'DELETED' | 'ENABLED' | 'PENDING'; type: 'DEPOSITORY_CHECKING' | 'DEPOSITORY_SAVINGS'; account_name?: string; nickname?: string; }; last_four: string; pin_status: 'OK' | 'BLOCKED' | 'NOT_SET'; spend_limit: number; spend_limit_duration: 'ANNUALLY' | 'FOREVER' | 'MONTHLY' | 'TRANSACTION'; state: 'CLOSED' | 'OPEN' | 'PAUSED' | 'PENDING_ACTIVATION' | 'PENDING_FULFILLMENT'; type: 'MERCHANT_LOCKED' | 'PHYSICAL' | 'SINGLE_USE' | 'VIRTUAL' | 'UNLOCKED' | 'DIGITAL_WALLET'; auth_rule_tokens?: string[]; bulk_order_token?: string; cardholder_currency?: string; comment?: string; digital_card_art_token?: string; exp_month?: string; exp_year?: string; hostname?: string; memo?: string; network_program_token?: string; pending_commands?: string[]; product_id?: string; replacement_for?: string; substatus?: string; }",
    markdown:
      "## convert_physical\n\n`client.cards.convertPhysical(card_token: string, shipping_address: { address1: string; city: string; country: string; first_name: string; last_name: string; postal_code: string; state: string; address2?: string; email?: string; line2_text?: string; phone_number?: string; }, carrier?: { qr_code_url?: string; }, product_id?: string, shipping_method?: '2_DAY' | 'BULK' | 'EXPEDITED' | 'EXPRESS' | 'PRIORITY' | 'STANDARD' | 'STANDARD_WITH_TRACKING'): object`\n\n**post** `/v1/cards/{card_token}/convert_physical`\n\nConvert a virtual card into a physical card and manufacture it.\nCustomer must supply relevant fields for physical card creation including `product_id`, `carrier`, `shipping_method`, and `shipping_address`.\nThe card token will be unchanged.  The card's type will be altered to `PHYSICAL`.\nThe card will be set to state `PENDING_FULFILLMENT` and fulfilled at next fulfillment cycle.\nVirtual cards created on card programs which do not support physical cards cannot be converted.  The card program cannot be changed as part of the conversion.  Cards must be in an `OPEN` state to be converted.\nOnly applies to cards of type `VIRTUAL` (or existing cards with deprecated types of `DIGITAL_WALLET` and `UNLOCKED`).\n\n### Parameters\n\n- `card_token: string`\n\n- `shipping_address: { address1: string; city: string; country: string; first_name: string; last_name: string; postal_code: string; state: string; address2?: string; email?: string; line2_text?: string; phone_number?: string; }`\n  The shipping address this card will be sent to.\n  - `address1: string`\n    Valid USPS routable address.\n  - `city: string`\n    City\n  - `country: string`\n    Uppercase ISO 3166-1 alpha-3 three character abbreviation.\n  - `first_name: string`\n    Customer's first name. This will be the first name printed on the physical card. The combined length of `first_name` and `last_name` may not exceed 25 characters.\n  - `last_name: string`\n    Customer's surname (family name). This will be the last name printed on the physical card. The combined length of `first_name` and `last_name` may not exceed 25 characters.\n  - `postal_code: string`\n    Postal code (formerly zipcode). For US addresses, either five-digit postal code or nine-digit postal code (ZIP+4) using the format 12345-1234.\n  - `state: string`\n    Uppercase ISO 3166-2 two character abbreviation for US and CA. Optional with a limit of 24 characters for other countries.\n  - `address2?: string`\n    Unit number (if applicable).\n  - `email?: string`\n    Email address to be contacted for expedited shipping process purposes. Required if `shipping_method` is `EXPEDITED`.\n  - `line2_text?: string`\n    Text to be printed on line two of the physical card. Use of this field requires additional permissions.\n  - `phone_number?: string`\n    Cardholder's phone number in E.164 format to be contacted for expedited shipping process purposes. Required if `shipping_method` is `EXPEDITED`.\n\n- `carrier?: { qr_code_url?: string; }`\n  If omitted, the previous carrier will be used.\n  - `qr_code_url?: string`\n    QR code URL to display on the card carrier. The `qr_code_url` field requires your domain to be allowlisted by Lithic before use. Contact Support to configure your QR code domain\n\n- `product_id?: string`\n  Specifies the configuration (e.g. physical card art) that the card should be manufactured with, and only applies to cards of type `PHYSICAL`. This must be configured with Lithic before use.\n\n\n- `shipping_method?: '2_DAY' | 'BULK' | 'EXPEDITED' | 'EXPRESS' | 'PRIORITY' | 'STANDARD' | 'STANDARD_WITH_TRACKING'`\n  Shipping method for the card. Only applies to cards of type PHYSICAL.\nUse of options besides `STANDARD` require additional permissions.\n\n* `STANDARD` - USPS regular mail or similar international option, with no tracking\n* `STANDARD_WITH_TRACKING` - USPS regular mail or similar international option, with tracking\n* `PRIORITY` - USPS Priority, 1-3 day shipping, with tracking\n* `EXPRESS` - FedEx or UPS depending on card manufacturer, Express, 3-day shipping, with tracking\n* `2_DAY` - FedEx or UPS depending on card manufacturer, 2-day shipping, with tracking\n* `EXPEDITED` - FedEx or UPS depending on card manufacturer, Standard Overnight or similar international option, with tracking\n* `BULK` - Card will be shipped as part of a bulk fulfillment order. The shipping method and timeline are inherited from the parent bulk order.\n\n### Returns\n\n- `{ token: string; account_token: string; card_program_token: string; created: string; funding: { token: string; created: string; last_four: string; state: 'DELETED' | 'ENABLED' | 'PENDING'; type: 'DEPOSITORY_CHECKING' | 'DEPOSITORY_SAVINGS'; account_name?: string; nickname?: string; }; last_four: string; pin_status: 'OK' | 'BLOCKED' | 'NOT_SET'; spend_limit: number; spend_limit_duration: 'ANNUALLY' | 'FOREVER' | 'MONTHLY' | 'TRANSACTION'; state: 'CLOSED' | 'OPEN' | 'PAUSED' | 'PENDING_ACTIVATION' | 'PENDING_FULFILLMENT'; type: 'MERCHANT_LOCKED' | 'PHYSICAL' | 'SINGLE_USE' | 'VIRTUAL' | 'UNLOCKED' | 'DIGITAL_WALLET'; auth_rule_tokens?: string[]; bulk_order_token?: string; cardholder_currency?: string; comment?: string; digital_card_art_token?: string; exp_month?: string; exp_year?: string; hostname?: string; memo?: string; network_program_token?: string; pending_commands?: string[]; product_id?: string; replacement_for?: string; substatus?: string; }`\n  Card details with potentially PCI sensitive information for Enterprise customers\n\n### Example\n\n```typescript\nimport Lithic from 'lithic';\n\nconst client = new Lithic();\n\nconst card = await client.cards.convertPhysical('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', { shipping_address: {\n  address1: '5 Broad Street',\n  city: 'NEW YORK',\n  country: 'USA',\n  first_name: 'Janet',\n  last_name: 'Yellen',\n  postal_code: '10001',\n  state: 'NY',\n} });\n\nconsole.log(card);\n```",
  },
  {
    name: 'embed',
    endpoint: '/v1/embed/card',
    httpMethod: 'get',
    summary: 'Embedded card UI',
    description:
      'Handling full card PANs and CVV codes requires that you comply with the Payment Card Industry Data Security Standards (PCI DSS). Some clients choose to reduce their compliance obligations by leveraging our embedded card UI solution documented below.\n\nIn this setup, PANs and CVV codes are presented to the end-user via a card UI that we provide, optionally styled in the customer\'s branding using a specified css stylesheet. A user\'s browser makes the request directly to api.lithic.com, so card PANs and CVVs never touch the API customer\'s servers while full card data is displayed to their end-users. The response contains an HTML document (see Embedded Card UI or Changelog for upcoming changes in January). This means that the url for the request can be inserted straight into the `src` attribute of an iframe.\n\n```html\n<iframe id="card-iframe"\n        src="https://sandbox.lithic.com/v1/embed/card?embed_request=eyJjc3MiO...;hmac=r8tx1..."\n        allow="clipboard-write" class="content"></iframe>\n```\n\nYou should compute the request payload on the server side. You can render it (or the whole iframe) on the server or make an ajax call from your front end code, but **do not ever embed your API key into front end code, as doing so introduces a serious security vulnerability**.\n',
    stainlessPath: '(resource) cards > (method) embed',
    qualified: 'client.cards.embed',
    params: ['embed_request: string;', 'hmac: string;'],
    response: 'string',
    markdown:
      "## embed\n\n`client.cards.embed(embed_request: string, hmac: string): string`\n\n**get** `/v1/embed/card`\n\nHandling full card PANs and CVV codes requires that you comply with the Payment Card Industry Data Security Standards (PCI DSS). Some clients choose to reduce their compliance obligations by leveraging our embedded card UI solution documented below.\n\nIn this setup, PANs and CVV codes are presented to the end-user via a card UI that we provide, optionally styled in the customer's branding using a specified css stylesheet. A user's browser makes the request directly to api.lithic.com, so card PANs and CVVs never touch the API customer's servers while full card data is displayed to their end-users. The response contains an HTML document (see Embedded Card UI or Changelog for upcoming changes in January). This means that the url for the request can be inserted straight into the `src` attribute of an iframe.\n\n```html\n<iframe id=\"card-iframe\"\n        src=\"https://sandbox.lithic.com/v1/embed/card?embed_request=eyJjc3MiO...;hmac=r8tx1...\"\n        allow=\"clipboard-write\" class=\"content\"></iframe>\n```\n\nYou should compute the request payload on the server side. You can render it (or the whole iframe) on the server or make an ajax call from your front end code, but **do not ever embed your API key into front end code, as doing so introduces a serious security vulnerability**.\n\n\n### Parameters\n\n- `embed_request: string`\n  A base64 encoded JSON string of an EmbedRequest to specify which card to load.\n\n- `hmac: string`\n  SHA256 HMAC of the embed_request JSON string with base64 digest.\n\n### Returns\n\n- `string`\n\n### Example\n\n```typescript\nimport Lithic from 'lithic';\n\nconst client = new Lithic();\n\nconst response = await client.cards.embed({ embed_request: 'embed_request', hmac: 'hmac' });\n\nconsole.log(response);\n```",
  },
  {
    name: 'provision',
    endpoint: '/v1/cards/{card_token}/provision',
    httpMethod: 'post',
    summary: 'Provision card (Digital Wallet)',
    description:
      "Allow your cardholders to directly add payment cards to the device's digital wallet (e.g. Apple Pay) with one touch from your app.\n\nThis requires some additional setup and configuration. Please [Contact Us](https://lithic.com/contact) or your Customer Success representative for more information.\n",
    stainlessPath: '(resource) cards > (method) provision',
    qualified: 'client.cards.provision',
    params: [
      'card_token: string;',
      'certificate?: string;',
      'client_device_id?: string;',
      'client_wallet_account_id?: string;',
      "digital_wallet?: 'APPLE_PAY' | 'GOOGLE_PAY' | 'SAMSUNG_PAY';",
      'nonce?: string;',
      'nonce_signature?: string;',
    ],
    response:
      '{ provisioning_payload?: string | { activationData?: string; encryptedData?: string; ephemeralPublicKey?: string; }; }',
    markdown:
      "## provision\n\n`client.cards.provision(card_token: string, certificate?: string, client_device_id?: string, client_wallet_account_id?: string, digital_wallet?: 'APPLE_PAY' | 'GOOGLE_PAY' | 'SAMSUNG_PAY', nonce?: string, nonce_signature?: string): { provisioning_payload?: string | provision_response; }`\n\n**post** `/v1/cards/{card_token}/provision`\n\nAllow your cardholders to directly add payment cards to the device's digital wallet (e.g. Apple Pay) with one touch from your app.\n\nThis requires some additional setup and configuration. Please [Contact Us](https://lithic.com/contact) or your Customer Success representative for more information.\n\n\n### Parameters\n\n- `card_token: string`\n\n- `certificate?: string`\n  Only applicable if `digital_wallet` is `APPLE_PAY`. Omit to receive only `activationData` in the response. Apple's public leaf certificate. Base64 encoded in PEM format with headers `(-----BEGIN CERTIFICATE-----)` and trailers omitted. Provided by the device's wallet.\n\n- `client_device_id?: string`\n  Only applicable if `digital_wallet` is `GOOGLE_PAY` or `SAMSUNG_PAY` and the card is on the Visa network. Stable device identification set by the wallet provider.\n\n- `client_wallet_account_id?: string`\n  Only applicable if `digital_wallet` is `GOOGLE_PAY` or `SAMSUNG_PAY` and the card is on the Visa network. Consumer ID that identifies the wallet account holder entity.\n\n- `digital_wallet?: 'APPLE_PAY' | 'GOOGLE_PAY' | 'SAMSUNG_PAY'`\n  Name of digital wallet provider.\n\n- `nonce?: string`\n  Only applicable if `digital_wallet` is `APPLE_PAY`. Omit to receive only `activationData` in the response. Base64 cryptographic nonce provided by the device's wallet.\n\n- `nonce_signature?: string`\n  Only applicable if `digital_wallet` is `APPLE_PAY`. Omit to receive only `activationData` in the response. Base64 cryptographic nonce provided by the device's wallet.\n\n### Returns\n\n- `{ provisioning_payload?: string | { activationData?: string; encryptedData?: string; ephemeralPublicKey?: string; }; }`\n\n  - `provisioning_payload?: string | { activationData?: string; encryptedData?: string; ephemeralPublicKey?: string; }`\n\n### Example\n\n```typescript\nimport Lithic from 'lithic';\n\nconst client = new Lithic();\n\nconst response = await client.cards.provision('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e');\n\nconsole.log(response);\n```",
  },
  {
    name: 'reissue',
    endpoint: '/v1/cards/{card_token}/reissue',
    httpMethod: 'post',
    summary: 'Reissue physical card',
    description:
      'Initiate print and shipment of a duplicate physical card (e.g. card is physically damaged).  The PAN, expiry, and CVC2 will remain the same and the original card can continue to be used until the new card is activated.\nOnly applies to cards of type `PHYSICAL`.  A card can be reissued or renewed a total of 8 times.',
    stainlessPath: '(resource) cards > (method) reissue',
    qualified: 'client.cards.reissue',
    params: [
      'card_token: string;',
      'carrier?: { qr_code_url?: string; };',
      'product_id?: string;',
      'shipping_address?: { address1: string; city: string; country: string; first_name: string; last_name: string; postal_code: string; state: string; address2?: string; email?: string; line2_text?: string; phone_number?: string; };',
      "shipping_method?: '2_DAY' | 'BULK' | 'EXPEDITED' | 'EXPRESS' | 'PRIORITY' | 'STANDARD' | 'STANDARD_WITH_TRACKING';",
    ],
    response:
      "{ token: string; account_token: string; card_program_token: string; created: string; funding: { token: string; created: string; last_four: string; state: 'DELETED' | 'ENABLED' | 'PENDING'; type: 'DEPOSITORY_CHECKING' | 'DEPOSITORY_SAVINGS'; account_name?: string; nickname?: string; }; last_four: string; pin_status: 'OK' | 'BLOCKED' | 'NOT_SET'; spend_limit: number; spend_limit_duration: 'ANNUALLY' | 'FOREVER' | 'MONTHLY' | 'TRANSACTION'; state: 'CLOSED' | 'OPEN' | 'PAUSED' | 'PENDING_ACTIVATION' | 'PENDING_FULFILLMENT'; type: 'MERCHANT_LOCKED' | 'PHYSICAL' | 'SINGLE_USE' | 'VIRTUAL' | 'UNLOCKED' | 'DIGITAL_WALLET'; auth_rule_tokens?: string[]; bulk_order_token?: string; cardholder_currency?: string; comment?: string; digital_card_art_token?: string; exp_month?: string; exp_year?: string; hostname?: string; memo?: string; network_program_token?: string; pending_commands?: string[]; product_id?: string; replacement_for?: string; substatus?: string; }",
    markdown:
      "## reissue\n\n`client.cards.reissue(card_token: string, carrier?: { qr_code_url?: string; }, product_id?: string, shipping_address?: { address1: string; city: string; country: string; first_name: string; last_name: string; postal_code: string; state: string; address2?: string; email?: string; line2_text?: string; phone_number?: string; }, shipping_method?: '2_DAY' | 'BULK' | 'EXPEDITED' | 'EXPRESS' | 'PRIORITY' | 'STANDARD' | 'STANDARD_WITH_TRACKING'): object`\n\n**post** `/v1/cards/{card_token}/reissue`\n\nInitiate print and shipment of a duplicate physical card (e.g. card is physically damaged).  The PAN, expiry, and CVC2 will remain the same and the original card can continue to be used until the new card is activated.\nOnly applies to cards of type `PHYSICAL`.  A card can be reissued or renewed a total of 8 times.\n\n### Parameters\n\n- `card_token: string`\n\n- `carrier?: { qr_code_url?: string; }`\n  If omitted, the previous carrier will be used.\n  - `qr_code_url?: string`\n    QR code URL to display on the card carrier. The `qr_code_url` field requires your domain to be allowlisted by Lithic before use. Contact Support to configure your QR code domain\n\n- `product_id?: string`\n  Specifies the configuration (e.g. physical card art) that the card should be manufactured with, and only applies to cards of type `PHYSICAL`. This must be configured with Lithic before use.\n\n\n- `shipping_address?: { address1: string; city: string; country: string; first_name: string; last_name: string; postal_code: string; state: string; address2?: string; email?: string; line2_text?: string; phone_number?: string; }`\n  If omitted, the previous shipping address will be used.\n  - `address1: string`\n    Valid USPS routable address.\n  - `city: string`\n    City\n  - `country: string`\n    Uppercase ISO 3166-1 alpha-3 three character abbreviation.\n  - `first_name: string`\n    Customer's first name. This will be the first name printed on the physical card. The combined length of `first_name` and `last_name` may not exceed 25 characters.\n  - `last_name: string`\n    Customer's surname (family name). This will be the last name printed on the physical card. The combined length of `first_name` and `last_name` may not exceed 25 characters.\n  - `postal_code: string`\n    Postal code (formerly zipcode). For US addresses, either five-digit postal code or nine-digit postal code (ZIP+4) using the format 12345-1234.\n  - `state: string`\n    Uppercase ISO 3166-2 two character abbreviation for US and CA. Optional with a limit of 24 characters for other countries.\n  - `address2?: string`\n    Unit number (if applicable).\n  - `email?: string`\n    Email address to be contacted for expedited shipping process purposes. Required if `shipping_method` is `EXPEDITED`.\n  - `line2_text?: string`\n    Text to be printed on line two of the physical card. Use of this field requires additional permissions.\n  - `phone_number?: string`\n    Cardholder's phone number in E.164 format to be contacted for expedited shipping process purposes. Required if `shipping_method` is `EXPEDITED`.\n\n- `shipping_method?: '2_DAY' | 'BULK' | 'EXPEDITED' | 'EXPRESS' | 'PRIORITY' | 'STANDARD' | 'STANDARD_WITH_TRACKING'`\n  Shipping method for the card. Only applies to cards of type PHYSICAL.\nUse of options besides `STANDARD` require additional permissions.\n\n* `STANDARD` - USPS regular mail or similar international option, with no tracking\n* `STANDARD_WITH_TRACKING` - USPS regular mail or similar international option, with tracking\n* `PRIORITY` - USPS Priority, 1-3 day shipping, with tracking\n* `EXPRESS` - FedEx or UPS depending on card manufacturer, Express, 3-day shipping, with tracking\n* `2_DAY` - FedEx or UPS depending on card manufacturer, 2-day shipping, with tracking\n* `EXPEDITED` - FedEx or UPS depending on card manufacturer, Standard Overnight or similar international option, with tracking\n* `BULK` - Card will be shipped as part of a bulk fulfillment order. The shipping method and timeline are inherited from the parent bulk order.\n\n### Returns\n\n- `{ token: string; account_token: string; card_program_token: string; created: string; funding: { token: string; created: string; last_four: string; state: 'DELETED' | 'ENABLED' | 'PENDING'; type: 'DEPOSITORY_CHECKING' | 'DEPOSITORY_SAVINGS'; account_name?: string; nickname?: string; }; last_four: string; pin_status: 'OK' | 'BLOCKED' | 'NOT_SET'; spend_limit: number; spend_limit_duration: 'ANNUALLY' | 'FOREVER' | 'MONTHLY' | 'TRANSACTION'; state: 'CLOSED' | 'OPEN' | 'PAUSED' | 'PENDING_ACTIVATION' | 'PENDING_FULFILLMENT'; type: 'MERCHANT_LOCKED' | 'PHYSICAL' | 'SINGLE_USE' | 'VIRTUAL' | 'UNLOCKED' | 'DIGITAL_WALLET'; auth_rule_tokens?: string[]; bulk_order_token?: string; cardholder_currency?: string; comment?: string; digital_card_art_token?: string; exp_month?: string; exp_year?: string; hostname?: string; memo?: string; network_program_token?: string; pending_commands?: string[]; product_id?: string; replacement_for?: string; substatus?: string; }`\n  Card details with potentially PCI sensitive information for Enterprise customers\n\n### Example\n\n```typescript\nimport Lithic from 'lithic';\n\nconst client = new Lithic();\n\nconst card = await client.cards.reissue('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e');\n\nconsole.log(card);\n```",
  },
  {
    name: 'renew',
    endpoint: '/v1/cards/{card_token}/renew',
    httpMethod: 'post',
    summary: 'Renew a card',
    description:
      'Applies to card types `PHYSICAL` and `VIRTUAL`.\nFor `PHYSICAL`, creates a new card with the same card token and PAN, but updated expiry and CVC2 code. The original card will keep working for card-present transactions until the new card is activated. For card-not-present transactions, the original card details (expiry, CVC2) will also keep working until the new card is activated.\nA `PHYSICAL` card can be reissued or renewed a total of 8 times.\nFor `VIRTUAL`, the card will retain the same card token and PAN and receive an updated expiry and CVC2 code.\n`product_id`, `shipping_method`, `shipping_address`, `carrier` are only relevant for renewing `PHYSICAL` cards.',
    stainlessPath: '(resource) cards > (method) renew',
    qualified: 'client.cards.renew',
    params: [
      'card_token: string;',
      'shipping_address: { address1: string; city: string; country: string; first_name: string; last_name: string; postal_code: string; state: string; address2?: string; email?: string; line2_text?: string; phone_number?: string; };',
      'carrier?: { qr_code_url?: string; };',
      'exp_month?: string;',
      'exp_year?: string;',
      'product_id?: string;',
      "shipping_method?: '2_DAY' | 'BULK' | 'EXPEDITED' | 'EXPRESS' | 'PRIORITY' | 'STANDARD' | 'STANDARD_WITH_TRACKING';",
    ],
    response:
      "{ token: string; account_token: string; card_program_token: string; created: string; funding: { token: string; created: string; last_four: string; state: 'DELETED' | 'ENABLED' | 'PENDING'; type: 'DEPOSITORY_CHECKING' | 'DEPOSITORY_SAVINGS'; account_name?: string; nickname?: string; }; last_four: string; pin_status: 'OK' | 'BLOCKED' | 'NOT_SET'; spend_limit: number; spend_limit_duration: 'ANNUALLY' | 'FOREVER' | 'MONTHLY' | 'TRANSACTION'; state: 'CLOSED' | 'OPEN' | 'PAUSED' | 'PENDING_ACTIVATION' | 'PENDING_FULFILLMENT'; type: 'MERCHANT_LOCKED' | 'PHYSICAL' | 'SINGLE_USE' | 'VIRTUAL' | 'UNLOCKED' | 'DIGITAL_WALLET'; auth_rule_tokens?: string[]; bulk_order_token?: string; cardholder_currency?: string; comment?: string; digital_card_art_token?: string; exp_month?: string; exp_year?: string; hostname?: string; memo?: string; network_program_token?: string; pending_commands?: string[]; product_id?: string; replacement_for?: string; substatus?: string; }",
    markdown:
      "## renew\n\n`client.cards.renew(card_token: string, shipping_address: { address1: string; city: string; country: string; first_name: string; last_name: string; postal_code: string; state: string; address2?: string; email?: string; line2_text?: string; phone_number?: string; }, carrier?: { qr_code_url?: string; }, exp_month?: string, exp_year?: string, product_id?: string, shipping_method?: '2_DAY' | 'BULK' | 'EXPEDITED' | 'EXPRESS' | 'PRIORITY' | 'STANDARD' | 'STANDARD_WITH_TRACKING'): object`\n\n**post** `/v1/cards/{card_token}/renew`\n\nApplies to card types `PHYSICAL` and `VIRTUAL`.\nFor `PHYSICAL`, creates a new card with the same card token and PAN, but updated expiry and CVC2 code. The original card will keep working for card-present transactions until the new card is activated. For card-not-present transactions, the original card details (expiry, CVC2) will also keep working until the new card is activated.\nA `PHYSICAL` card can be reissued or renewed a total of 8 times.\nFor `VIRTUAL`, the card will retain the same card token and PAN and receive an updated expiry and CVC2 code.\n`product_id`, `shipping_method`, `shipping_address`, `carrier` are only relevant for renewing `PHYSICAL` cards.\n\n### Parameters\n\n- `card_token: string`\n\n- `shipping_address: { address1: string; city: string; country: string; first_name: string; last_name: string; postal_code: string; state: string; address2?: string; email?: string; line2_text?: string; phone_number?: string; }`\n  The shipping address this card will be sent to.\n  - `address1: string`\n    Valid USPS routable address.\n  - `city: string`\n    City\n  - `country: string`\n    Uppercase ISO 3166-1 alpha-3 three character abbreviation.\n  - `first_name: string`\n    Customer's first name. This will be the first name printed on the physical card. The combined length of `first_name` and `last_name` may not exceed 25 characters.\n  - `last_name: string`\n    Customer's surname (family name). This will be the last name printed on the physical card. The combined length of `first_name` and `last_name` may not exceed 25 characters.\n  - `postal_code: string`\n    Postal code (formerly zipcode). For US addresses, either five-digit postal code or nine-digit postal code (ZIP+4) using the format 12345-1234.\n  - `state: string`\n    Uppercase ISO 3166-2 two character abbreviation for US and CA. Optional with a limit of 24 characters for other countries.\n  - `address2?: string`\n    Unit number (if applicable).\n  - `email?: string`\n    Email address to be contacted for expedited shipping process purposes. Required if `shipping_method` is `EXPEDITED`.\n  - `line2_text?: string`\n    Text to be printed on line two of the physical card. Use of this field requires additional permissions.\n  - `phone_number?: string`\n    Cardholder's phone number in E.164 format to be contacted for expedited shipping process purposes. Required if `shipping_method` is `EXPEDITED`.\n\n- `carrier?: { qr_code_url?: string; }`\n  If omitted, the previous carrier will be used.\n  - `qr_code_url?: string`\n    QR code URL to display on the card carrier. The `qr_code_url` field requires your domain to be allowlisted by Lithic before use. Contact Support to configure your QR code domain\n\n- `exp_month?: string`\n  Two digit (MM) expiry month. If neither `exp_month` nor `exp_year` is provided, an expiration date six years in the future will be generated.\n\n- `exp_year?: string`\n  Four digit (yyyy) expiry year. If neither `exp_month` nor `exp_year` is provided, an expiration date six years in the future will be generated.\n\n- `product_id?: string`\n  Specifies the configuration (e.g. physical card art) that the card should be manufactured with, and only applies to cards of type `PHYSICAL`. This must be configured with Lithic before use.\n\n\n- `shipping_method?: '2_DAY' | 'BULK' | 'EXPEDITED' | 'EXPRESS' | 'PRIORITY' | 'STANDARD' | 'STANDARD_WITH_TRACKING'`\n  Shipping method for the card. Only applies to cards of type PHYSICAL.\nUse of options besides `STANDARD` require additional permissions.\n\n* `STANDARD` - USPS regular mail or similar international option, with no tracking\n* `STANDARD_WITH_TRACKING` - USPS regular mail or similar international option, with tracking\n* `PRIORITY` - USPS Priority, 1-3 day shipping, with tracking\n* `EXPRESS` - FedEx or UPS depending on card manufacturer, Express, 3-day shipping, with tracking\n* `2_DAY` - FedEx or UPS depending on card manufacturer, 2-day shipping, with tracking\n* `EXPEDITED` - FedEx or UPS depending on card manufacturer, Standard Overnight or similar international option, with tracking\n* `BULK` - Card will be shipped as part of a bulk fulfillment order. The shipping method and timeline are inherited from the parent bulk order.\n\n### Returns\n\n- `{ token: string; account_token: string; card_program_token: string; created: string; funding: { token: string; created: string; last_four: string; state: 'DELETED' | 'ENABLED' | 'PENDING'; type: 'DEPOSITORY_CHECKING' | 'DEPOSITORY_SAVINGS'; account_name?: string; nickname?: string; }; last_four: string; pin_status: 'OK' | 'BLOCKED' | 'NOT_SET'; spend_limit: number; spend_limit_duration: 'ANNUALLY' | 'FOREVER' | 'MONTHLY' | 'TRANSACTION'; state: 'CLOSED' | 'OPEN' | 'PAUSED' | 'PENDING_ACTIVATION' | 'PENDING_FULFILLMENT'; type: 'MERCHANT_LOCKED' | 'PHYSICAL' | 'SINGLE_USE' | 'VIRTUAL' | 'UNLOCKED' | 'DIGITAL_WALLET'; auth_rule_tokens?: string[]; bulk_order_token?: string; cardholder_currency?: string; comment?: string; digital_card_art_token?: string; exp_month?: string; exp_year?: string; hostname?: string; memo?: string; network_program_token?: string; pending_commands?: string[]; product_id?: string; replacement_for?: string; substatus?: string; }`\n  Card details with potentially PCI sensitive information for Enterprise customers\n\n### Example\n\n```typescript\nimport Lithic from 'lithic';\n\nconst client = new Lithic();\n\nconst card = await client.cards.renew('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', { shipping_address: {\n  address1: '5 Broad Street',\n  city: 'NEW YORK',\n  country: 'USA',\n  first_name: 'Janet',\n  last_name: 'Yellen',\n  postal_code: '10001',\n  state: 'NY',\n} });\n\nconsole.log(card);\n```",
  },
  {
    name: 'retrieve_spend_limits',
    endpoint: '/v1/cards/{card_token}/spend_limits',
    httpMethod: 'get',
    summary: "Get card's available spend limit",
    description:
      "Get a Card's available spend limit, which is based on the spend limit configured on the Card and the amount already spent over the spend limit's duration. For example, if the Card has a monthly spend limit of $1000 configured, and has spent $600 in the last month, the available spend limit returned would be $400.",
    stainlessPath: '(resource) cards > (method) retrieve_spend_limits',
    qualified: 'client.cards.retrieveSpendLimits',
    params: ['card_token: string;'],
    response:
      '{ available_spend_limit: { annually?: number; forever?: number; monthly?: number; }; spend_limit?: { annually?: number; forever?: number; monthly?: number; }; spend_velocity?: { annually?: number; forever?: number; monthly?: number; }; }',
    markdown:
      "## retrieve_spend_limits\n\n`client.cards.retrieveSpendLimits(card_token: string): { available_spend_limit: object; spend_limit?: object; spend_velocity?: object; }`\n\n**get** `/v1/cards/{card_token}/spend_limits`\n\nGet a Card's available spend limit, which is based on the spend limit configured on the Card and the amount already spent over the spend limit's duration. For example, if the Card has a monthly spend limit of $1000 configured, and has spent $600 in the last month, the available spend limit returned would be $400.\n\n### Parameters\n\n- `card_token: string`\n\n### Returns\n\n- `{ available_spend_limit: { annually?: number; forever?: number; monthly?: number; }; spend_limit?: { annually?: number; forever?: number; monthly?: number; }; spend_velocity?: { annually?: number; forever?: number; monthly?: number; }; }`\n\n  - `available_spend_limit: { annually?: number; forever?: number; monthly?: number; }`\n  - `spend_limit?: { annually?: number; forever?: number; monthly?: number; }`\n  - `spend_velocity?: { annually?: number; forever?: number; monthly?: number; }`\n\n### Example\n\n```typescript\nimport Lithic from 'lithic';\n\nconst client = new Lithic();\n\nconst cardSpendLimits = await client.cards.retrieveSpendLimits('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e');\n\nconsole.log(cardSpendLimits);\n```",
  },
  {
    name: 'search_by_pan',
    endpoint: '/v1/cards/search_by_pan',
    httpMethod: 'post',
    summary: 'Search for card by PAN',
    description:
      'Get card configuration such as spend limit and state. Customers must be PCI compliant to use this endpoint. Please contact [support@lithic.com](mailto:support@lithic.com) for questions.\n*Note: this is a `POST` endpoint because it is more secure to send sensitive data in a request body than in a URL.*',
    stainlessPath: '(resource) cards > (method) search_by_pan',
    qualified: 'client.cards.searchByPan',
    params: ['pan: string;'],
    response:
      "{ token: string; account_token: string; card_program_token: string; created: string; funding: { token: string; created: string; last_four: string; state: 'DELETED' | 'ENABLED' | 'PENDING'; type: 'DEPOSITORY_CHECKING' | 'DEPOSITORY_SAVINGS'; account_name?: string; nickname?: string; }; last_four: string; pin_status: 'OK' | 'BLOCKED' | 'NOT_SET'; spend_limit: number; spend_limit_duration: 'ANNUALLY' | 'FOREVER' | 'MONTHLY' | 'TRANSACTION'; state: 'CLOSED' | 'OPEN' | 'PAUSED' | 'PENDING_ACTIVATION' | 'PENDING_FULFILLMENT'; type: 'MERCHANT_LOCKED' | 'PHYSICAL' | 'SINGLE_USE' | 'VIRTUAL' | 'UNLOCKED' | 'DIGITAL_WALLET'; auth_rule_tokens?: string[]; bulk_order_token?: string; cardholder_currency?: string; comment?: string; digital_card_art_token?: string; exp_month?: string; exp_year?: string; hostname?: string; memo?: string; network_program_token?: string; pending_commands?: string[]; product_id?: string; replacement_for?: string; substatus?: string; }",
    markdown:
      "## search_by_pan\n\n`client.cards.searchByPan(pan: string): object`\n\n**post** `/v1/cards/search_by_pan`\n\nGet card configuration such as spend limit and state. Customers must be PCI compliant to use this endpoint. Please contact [support@lithic.com](mailto:support@lithic.com) for questions.\n*Note: this is a `POST` endpoint because it is more secure to send sensitive data in a request body than in a URL.*\n\n### Parameters\n\n- `pan: string`\n  The PAN for the card being retrieved.\n\n### Returns\n\n- `{ token: string; account_token: string; card_program_token: string; created: string; funding: { token: string; created: string; last_four: string; state: 'DELETED' | 'ENABLED' | 'PENDING'; type: 'DEPOSITORY_CHECKING' | 'DEPOSITORY_SAVINGS'; account_name?: string; nickname?: string; }; last_four: string; pin_status: 'OK' | 'BLOCKED' | 'NOT_SET'; spend_limit: number; spend_limit_duration: 'ANNUALLY' | 'FOREVER' | 'MONTHLY' | 'TRANSACTION'; state: 'CLOSED' | 'OPEN' | 'PAUSED' | 'PENDING_ACTIVATION' | 'PENDING_FULFILLMENT'; type: 'MERCHANT_LOCKED' | 'PHYSICAL' | 'SINGLE_USE' | 'VIRTUAL' | 'UNLOCKED' | 'DIGITAL_WALLET'; auth_rule_tokens?: string[]; bulk_order_token?: string; cardholder_currency?: string; comment?: string; digital_card_art_token?: string; exp_month?: string; exp_year?: string; hostname?: string; memo?: string; network_program_token?: string; pending_commands?: string[]; product_id?: string; replacement_for?: string; substatus?: string; }`\n  Card details with potentially PCI sensitive information for Enterprise customers\n\n### Example\n\n```typescript\nimport Lithic from 'lithic';\n\nconst client = new Lithic();\n\nconst card = await client.cards.searchByPan({ pan: '4111111289144142' });\n\nconsole.log(card);\n```",
  },
  {
    name: 'web_provision',
    endpoint: '/v1/cards/{card_token}/web_provision',
    httpMethod: 'post',
    summary: 'Web Push Provision card (Digital Wallet)',
    description:
      "Allow your cardholders to directly add payment cards to the device's digital wallet from a browser on the web.\n\nThis requires some additional setup and configuration. Please [Contact Us](https://lithic.com/contact) or your Customer Success representative for more information.\n",
    stainlessPath: '(resource) cards > (method) web_provision',
    qualified: 'client.cards.webProvision',
    params: [
      'card_token: string;',
      'client_device_id?: string;',
      'client_wallet_account_id?: string;',
      "digital_wallet?: 'APPLE_PAY' | 'GOOGLE_PAY';",
      'server_session_id?: string;',
    ],
    response:
      '{ jws: { header?: { kid?: string; }; payload?: string; protected?: string; signature?: string; }; state: string; } | { google_opc?: string; tsp_opc?: string; }',
    markdown:
      "## web_provision\n\n`client.cards.webProvision(card_token: string, client_device_id?: string, client_wallet_account_id?: string, digital_wallet?: 'APPLE_PAY' | 'GOOGLE_PAY', server_session_id?: string): { jws: object; state: string; } | { google_opc?: string; tsp_opc?: string; }`\n\n**post** `/v1/cards/{card_token}/web_provision`\n\nAllow your cardholders to directly add payment cards to the device's digital wallet from a browser on the web.\n\nThis requires some additional setup and configuration. Please [Contact Us](https://lithic.com/contact) or your Customer Success representative for more information.\n\n\n### Parameters\n\n- `card_token: string`\n\n- `client_device_id?: string`\n  Only applicable if `digital_wallet` is GOOGLE_PAY. Google Pay Web Push Provisioning device identifier required for the tokenization flow\n\n- `client_wallet_account_id?: string`\n  Only applicable if `digital_wallet` is GOOGLE_PAY. Google Pay Web Push Provisioning wallet account identifier required for the tokenization flow\n\n- `digital_wallet?: 'APPLE_PAY' | 'GOOGLE_PAY'`\n  Name of digital wallet provider.\n\n- `server_session_id?: string`\n  Only applicable if `digital_wallet` is GOOGLE_PAY. Google Pay Web Push Provisioning session identifier required for the FPAN flow.\n\n### Returns\n\n- `{ jws: { header?: { kid?: string; }; payload?: string; protected?: string; signature?: string; }; state: string; } | { google_opc?: string; tsp_opc?: string; }`\n\n### Example\n\n```typescript\nimport Lithic from 'lithic';\n\nconst client = new Lithic();\n\nconst response = await client.cards.webProvision('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e');\n\nconsole.log(response);\n```",
  },
  {
    name: 'list',
    endpoint: '/v1/cards/{card_token}/balances',
    httpMethod: 'get',
    summary: 'Get card balances',
    description: 'Get the balances for a given card.',
    stainlessPath: '(resource) cards.balances > (method) list',
    qualified: 'client.cards.balances.list',
    params: ['card_token: string;', 'balance_date?: string;', 'last_transaction_event_token?: string;'],
    response:
      "{ token: string; available_amount: number; created: string; currency: string; last_transaction_event_token: string; last_transaction_token: string; pending_amount: number; total_amount: number; type: 'ISSUING' | 'OPERATING' | 'RESERVE' | 'SECURITY'; updated: string; }",
    markdown:
      "## list\n\n`client.cards.balances.list(card_token: string, balance_date?: string, last_transaction_event_token?: string): { token: string; available_amount: number; created: string; currency: string; last_transaction_event_token: string; last_transaction_token: string; pending_amount: number; total_amount: number; type: 'ISSUING' | 'OPERATING' | 'RESERVE' | 'SECURITY'; updated: string; }`\n\n**get** `/v1/cards/{card_token}/balances`\n\nGet the balances for a given card.\n\n### Parameters\n\n- `card_token: string`\n\n- `balance_date?: string`\n  UTC date of the balance to retrieve. Defaults to latest available balance\n\n- `last_transaction_event_token?: string`\n  Balance after a given financial event occured.\nFor example, passing the event_token of a $5 CARD_CLEARING financial event will return a balance decreased by $5\n\n\n### Returns\n\n- `{ token: string; available_amount: number; created: string; currency: string; last_transaction_event_token: string; last_transaction_token: string; pending_amount: number; total_amount: number; type: 'ISSUING' | 'OPERATING' | 'RESERVE' | 'SECURITY'; updated: string; }`\n  Balance of a Financial Account\n\n  - `token: string`\n  - `available_amount: number`\n  - `created: string`\n  - `currency: string`\n  - `last_transaction_event_token: string`\n  - `last_transaction_token: string`\n  - `pending_amount: number`\n  - `total_amount: number`\n  - `type: 'ISSUING' | 'OPERATING' | 'RESERVE' | 'SECURITY'`\n  - `updated: string`\n\n### Example\n\n```typescript\nimport Lithic from 'lithic';\n\nconst client = new Lithic();\n\n// Automatically fetches more pages as needed.\nfor await (const financialAccountBalance of client.cards.balances.list('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e')) {\n  console.log(financialAccountBalance);\n}\n```",
  },
  {
    name: 'retrieve',
    endpoint: '/v1/cards/{card_token}/financial_transactions/{financial_transaction_token}',
    httpMethod: 'get',
    summary: 'Get card financial transaction',
    description: 'Get the card financial transaction for the provided token.',
    stainlessPath: '(resource) cards.financial_transactions > (method) retrieve',
    qualified: 'client.cards.financialTransactions.retrieve',
    params: ['card_token: string;', 'financial_transaction_token: string;'],
    response:
      "{ token: string; category: 'ACH' | 'CARD' | 'INTERNAL' | 'TRANSFER'; created: string; currency: string; descriptor: string; events: { token?: string; amount?: number; created?: string; result?: 'APPROVED' | 'DECLINED'; type?: string; }[]; pending_amount: number; result: 'APPROVED' | 'DECLINED'; settled_amount: number; status: 'DECLINED' | 'EXPIRED' | 'PENDING' | 'RETURNED' | 'SETTLED' | 'VOIDED'; updated: string; }",
    markdown:
      "## retrieve\n\n`client.cards.financialTransactions.retrieve(card_token: string, financial_transaction_token: string): { token: string; category: 'ACH' | 'CARD' | 'INTERNAL' | 'TRANSFER'; created: string; currency: string; descriptor: string; events: financial_event[]; pending_amount: number; result: 'APPROVED' | 'DECLINED'; settled_amount: number; status: 'DECLINED' | 'EXPIRED' | 'PENDING' | 'RETURNED' | 'SETTLED' | 'VOIDED'; updated: string; }`\n\n**get** `/v1/cards/{card_token}/financial_transactions/{financial_transaction_token}`\n\nGet the card financial transaction for the provided token.\n\n### Parameters\n\n- `card_token: string`\n\n- `financial_transaction_token: string`\n\n### Returns\n\n- `{ token: string; category: 'ACH' | 'CARD' | 'INTERNAL' | 'TRANSFER'; created: string; currency: string; descriptor: string; events: { token?: string; amount?: number; created?: string; result?: 'APPROVED' | 'DECLINED'; type?: string; }[]; pending_amount: number; result: 'APPROVED' | 'DECLINED'; settled_amount: number; status: 'DECLINED' | 'EXPIRED' | 'PENDING' | 'RETURNED' | 'SETTLED' | 'VOIDED'; updated: string; }`\n\n  - `token: string`\n  - `category: 'ACH' | 'CARD' | 'INTERNAL' | 'TRANSFER'`\n  - `created: string`\n  - `currency: string`\n  - `descriptor: string`\n  - `events: { token?: string; amount?: number; created?: string; result?: 'APPROVED' | 'DECLINED'; type?: string; }[]`\n  - `pending_amount: number`\n  - `result: 'APPROVED' | 'DECLINED'`\n  - `settled_amount: number`\n  - `status: 'DECLINED' | 'EXPIRED' | 'PENDING' | 'RETURNED' | 'SETTLED' | 'VOIDED'`\n  - `updated: string`\n\n### Example\n\n```typescript\nimport Lithic from 'lithic';\n\nconst client = new Lithic();\n\nconst financialTransaction = await client.cards.financialTransactions.retrieve('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', { card_token: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e' });\n\nconsole.log(financialTransaction);\n```",
  },
  {
    name: 'list',
    endpoint: '/v1/cards/{card_token}/financial_transactions',
    httpMethod: 'get',
    summary: 'List card financial transactions',
    description: 'List the financial transactions for a given card.',
    stainlessPath: '(resource) cards.financial_transactions > (method) list',
    qualified: 'client.cards.financialTransactions.list',
    params: [
      'card_token: string;',
      'begin?: string;',
      "category?: 'CARD' | 'TRANSFER';",
      'end?: string;',
      'ending_before?: string;',
      "result?: 'APPROVED' | 'DECLINED';",
      'starting_after?: string;',
      "status?: 'DECLINED' | 'EXPIRED' | 'PENDING' | 'RETURNED' | 'SETTLED' | 'VOIDED';",
    ],
    response:
      "{ token: string; category: 'ACH' | 'CARD' | 'INTERNAL' | 'TRANSFER'; created: string; currency: string; descriptor: string; events: { token?: string; amount?: number; created?: string; result?: 'APPROVED' | 'DECLINED'; type?: string; }[]; pending_amount: number; result: 'APPROVED' | 'DECLINED'; settled_amount: number; status: 'DECLINED' | 'EXPIRED' | 'PENDING' | 'RETURNED' | 'SETTLED' | 'VOIDED'; updated: string; }",
    markdown:
      "## list\n\n`client.cards.financialTransactions.list(card_token: string, begin?: string, category?: 'CARD' | 'TRANSFER', end?: string, ending_before?: string, result?: 'APPROVED' | 'DECLINED', starting_after?: string, status?: 'DECLINED' | 'EXPIRED' | 'PENDING' | 'RETURNED' | 'SETTLED' | 'VOIDED'): { token: string; category: 'ACH' | 'CARD' | 'INTERNAL' | 'TRANSFER'; created: string; currency: string; descriptor: string; events: financial_event[]; pending_amount: number; result: 'APPROVED' | 'DECLINED'; settled_amount: number; status: 'DECLINED' | 'EXPIRED' | 'PENDING' | 'RETURNED' | 'SETTLED' | 'VOIDED'; updated: string; }`\n\n**get** `/v1/cards/{card_token}/financial_transactions`\n\nList the financial transactions for a given card.\n\n### Parameters\n\n- `card_token: string`\n\n- `begin?: string`\n  Date string in RFC 3339 format. Only entries created after the specified time will be included. UTC time zone.\n\n- `category?: 'CARD' | 'TRANSFER'`\n  Financial Transaction category to be returned.\n\n- `end?: string`\n  Date string in RFC 3339 format. Only entries created before the specified time will be included. UTC time zone.\n\n- `ending_before?: string`\n  A cursor representing an item's token before which a page of results should end. Used to retrieve the previous page of results before this item.\n\n- `result?: 'APPROVED' | 'DECLINED'`\n  Financial Transaction result to be returned.\n\n- `starting_after?: string`\n  A cursor representing an item's token after which a page of results should begin. Used to retrieve the next page of results after this item.\n\n- `status?: 'DECLINED' | 'EXPIRED' | 'PENDING' | 'RETURNED' | 'SETTLED' | 'VOIDED'`\n  Financial Transaction status to be returned.\n\n### Returns\n\n- `{ token: string; category: 'ACH' | 'CARD' | 'INTERNAL' | 'TRANSFER'; created: string; currency: string; descriptor: string; events: { token?: string; amount?: number; created?: string; result?: 'APPROVED' | 'DECLINED'; type?: string; }[]; pending_amount: number; result: 'APPROVED' | 'DECLINED'; settled_amount: number; status: 'DECLINED' | 'EXPIRED' | 'PENDING' | 'RETURNED' | 'SETTLED' | 'VOIDED'; updated: string; }`\n\n  - `token: string`\n  - `category: 'ACH' | 'CARD' | 'INTERNAL' | 'TRANSFER'`\n  - `created: string`\n  - `currency: string`\n  - `descriptor: string`\n  - `events: { token?: string; amount?: number; created?: string; result?: 'APPROVED' | 'DECLINED'; type?: string; }[]`\n  - `pending_amount: number`\n  - `result: 'APPROVED' | 'DECLINED'`\n  - `settled_amount: number`\n  - `status: 'DECLINED' | 'EXPIRED' | 'PENDING' | 'RETURNED' | 'SETTLED' | 'VOIDED'`\n  - `updated: string`\n\n### Example\n\n```typescript\nimport Lithic from 'lithic';\n\nconst client = new Lithic();\n\n// Automatically fetches more pages as needed.\nfor await (const financialTransaction of client.cards.financialTransactions.list('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e')) {\n  console.log(financialTransaction);\n}\n```",
  },
  {
    name: 'create',
    endpoint: '/v1/card_bulk_orders',
    httpMethod: 'post',
    summary: 'Create bulk order',
    description:
      'Create a new bulk order for physical card shipments. Cards can be added to the order via the POST /v1/cards endpoint by specifying the bulk_order_token. Lock the order via PATCH /v1/card_bulk_orders/{bulk_order_token} to prepare for shipment. Please work with your Customer Success Manager and card personalization bureau to ensure bulk shipping is supported for your program.',
    stainlessPath: '(resource) card_bulk_orders > (method) create',
    qualified: 'client.cardBulkOrders.create',
    params: [
      'customer_product_id: string;',
      'shipping_address: object;',
      "shipping_method: 'BULK_EXPEDITED' | 'BULK_PRIORITY' | 'BULK_2_DAY' | 'BULK_EXPRESS';",
    ],
    response:
      "{ token: string; card_tokens: string[]; created: string; customer_product_id: string; shipping_address: object; shipping_method: 'BULK_EXPEDITED' | 'BULK_PRIORITY' | 'BULK_2_DAY' | 'BULK_EXPRESS'; status: 'OPEN' | 'LOCKED'; updated: string; }",
    markdown:
      "## create\n\n`client.cardBulkOrders.create(customer_product_id: string, shipping_address: object, shipping_method: 'BULK_EXPEDITED' | 'BULK_PRIORITY' | 'BULK_2_DAY' | 'BULK_EXPRESS'): { token: string; card_tokens: string[]; created: string; customer_product_id: string; shipping_address: object; shipping_method: 'BULK_EXPEDITED' | 'BULK_PRIORITY' | 'BULK_2_DAY' | 'BULK_EXPRESS'; status: 'OPEN' | 'LOCKED'; updated: string; }`\n\n**post** `/v1/card_bulk_orders`\n\nCreate a new bulk order for physical card shipments. Cards can be added to the order via the POST /v1/cards endpoint by specifying the bulk_order_token. Lock the order via PATCH /v1/card_bulk_orders/{bulk_order_token} to prepare for shipment. Please work with your Customer Success Manager and card personalization bureau to ensure bulk shipping is supported for your program.\n\n### Parameters\n\n- `customer_product_id: string`\n  Customer-specified product configuration for physical card manufacturing. This must be configured with Lithic before use\n\n- `shipping_address: object`\n  Shipping address for all cards in this bulk order\n\n- `shipping_method: 'BULK_EXPEDITED' | 'BULK_PRIORITY' | 'BULK_2_DAY' | 'BULK_EXPRESS'`\n  Shipping method for all cards in this bulk order. BULK_PRIORITY, BULK_2_DAY, and BULK_EXPRESS are only available with Perfect Plastic Printing\n\n### Returns\n\n- `{ token: string; card_tokens: string[]; created: string; customer_product_id: string; shipping_address: object; shipping_method: 'BULK_EXPEDITED' | 'BULK_PRIORITY' | 'BULK_2_DAY' | 'BULK_EXPRESS'; status: 'OPEN' | 'LOCKED'; updated: string; }`\n  Represents a bulk order for physical card shipments\n\n  - `token: string`\n  - `card_tokens: string[]`\n  - `created: string`\n  - `customer_product_id: string`\n  - `shipping_address: object`\n  - `shipping_method: 'BULK_EXPEDITED' | 'BULK_PRIORITY' | 'BULK_2_DAY' | 'BULK_EXPRESS'`\n  - `status: 'OPEN' | 'LOCKED'`\n  - `updated: string`\n\n### Example\n\n```typescript\nimport Lithic from 'lithic';\n\nconst client = new Lithic();\n\nconst cardBulkOrder = await client.cardBulkOrders.create({\n  customer_product_id: 'custom-card-design-123',\n  shipping_address: {\n  address1: '123 Main Street',\n  city: 'NEW YORK',\n  country: 'USA',\n  first_name: 'Johnny',\n  last_name: 'Appleseed',\n  postal_code: '10001',\n  state: 'NY',\n},\n  shipping_method: 'BULK_EXPEDITED',\n});\n\nconsole.log(cardBulkOrder);\n```",
  },
  {
    name: 'retrieve',
    endpoint: '/v1/card_bulk_orders/{bulk_order_token}',
    httpMethod: 'get',
    summary: 'Get bulk order',
    description: 'Retrieve a specific bulk order by token',
    stainlessPath: '(resource) card_bulk_orders > (method) retrieve',
    qualified: 'client.cardBulkOrders.retrieve',
    params: ['bulk_order_token: string;'],
    response:
      "{ token: string; card_tokens: string[]; created: string; customer_product_id: string; shipping_address: object; shipping_method: 'BULK_EXPEDITED' | 'BULK_PRIORITY' | 'BULK_2_DAY' | 'BULK_EXPRESS'; status: 'OPEN' | 'LOCKED'; updated: string; }",
    markdown:
      "## retrieve\n\n`client.cardBulkOrders.retrieve(bulk_order_token: string): { token: string; card_tokens: string[]; created: string; customer_product_id: string; shipping_address: object; shipping_method: 'BULK_EXPEDITED' | 'BULK_PRIORITY' | 'BULK_2_DAY' | 'BULK_EXPRESS'; status: 'OPEN' | 'LOCKED'; updated: string; }`\n\n**get** `/v1/card_bulk_orders/{bulk_order_token}`\n\nRetrieve a specific bulk order by token\n\n### Parameters\n\n- `bulk_order_token: string`\n\n### Returns\n\n- `{ token: string; card_tokens: string[]; created: string; customer_product_id: string; shipping_address: object; shipping_method: 'BULK_EXPEDITED' | 'BULK_PRIORITY' | 'BULK_2_DAY' | 'BULK_EXPRESS'; status: 'OPEN' | 'LOCKED'; updated: string; }`\n  Represents a bulk order for physical card shipments\n\n  - `token: string`\n  - `card_tokens: string[]`\n  - `created: string`\n  - `customer_product_id: string`\n  - `shipping_address: object`\n  - `shipping_method: 'BULK_EXPEDITED' | 'BULK_PRIORITY' | 'BULK_2_DAY' | 'BULK_EXPRESS'`\n  - `status: 'OPEN' | 'LOCKED'`\n  - `updated: string`\n\n### Example\n\n```typescript\nimport Lithic from 'lithic';\n\nconst client = new Lithic();\n\nconst cardBulkOrder = await client.cardBulkOrders.retrieve('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e');\n\nconsole.log(cardBulkOrder);\n```",
  },
  {
    name: 'update',
    endpoint: '/v1/card_bulk_orders/{bulk_order_token}',
    httpMethod: 'patch',
    summary: 'Update bulk order',
    description:
      'Update a bulk order. Primarily used to lock the order, preventing additional cards from being added',
    stainlessPath: '(resource) card_bulk_orders > (method) update',
    qualified: 'client.cardBulkOrders.update',
    params: ['bulk_order_token: string;', "status: 'LOCKED';"],
    response:
      "{ token: string; card_tokens: string[]; created: string; customer_product_id: string; shipping_address: object; shipping_method: 'BULK_EXPEDITED' | 'BULK_PRIORITY' | 'BULK_2_DAY' | 'BULK_EXPRESS'; status: 'OPEN' | 'LOCKED'; updated: string; }",
    markdown:
      "## update\n\n`client.cardBulkOrders.update(bulk_order_token: string, status: 'LOCKED'): { token: string; card_tokens: string[]; created: string; customer_product_id: string; shipping_address: object; shipping_method: 'BULK_EXPEDITED' | 'BULK_PRIORITY' | 'BULK_2_DAY' | 'BULK_EXPRESS'; status: 'OPEN' | 'LOCKED'; updated: string; }`\n\n**patch** `/v1/card_bulk_orders/{bulk_order_token}`\n\nUpdate a bulk order. Primarily used to lock the order, preventing additional cards from being added\n\n### Parameters\n\n- `bulk_order_token: string`\n\n- `status: 'LOCKED'`\n  Status to update the bulk order to. Use LOCKED to finalize the order\n\n### Returns\n\n- `{ token: string; card_tokens: string[]; created: string; customer_product_id: string; shipping_address: object; shipping_method: 'BULK_EXPEDITED' | 'BULK_PRIORITY' | 'BULK_2_DAY' | 'BULK_EXPRESS'; status: 'OPEN' | 'LOCKED'; updated: string; }`\n  Represents a bulk order for physical card shipments\n\n  - `token: string`\n  - `card_tokens: string[]`\n  - `created: string`\n  - `customer_product_id: string`\n  - `shipping_address: object`\n  - `shipping_method: 'BULK_EXPEDITED' | 'BULK_PRIORITY' | 'BULK_2_DAY' | 'BULK_EXPRESS'`\n  - `status: 'OPEN' | 'LOCKED'`\n  - `updated: string`\n\n### Example\n\n```typescript\nimport Lithic from 'lithic';\n\nconst client = new Lithic();\n\nconst cardBulkOrder = await client.cardBulkOrders.update('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', { status: 'LOCKED' });\n\nconsole.log(cardBulkOrder);\n```",
  },
  {
    name: 'list',
    endpoint: '/v1/card_bulk_orders',
    httpMethod: 'get',
    summary: 'List bulk orders',
    description: 'List bulk orders for physical card shipments',
    stainlessPath: '(resource) card_bulk_orders > (method) list',
    qualified: 'client.cardBulkOrders.list',
    params: [
      'begin?: string;',
      'end?: string;',
      'ending_before?: string;',
      'page_size?: number;',
      'starting_after?: string;',
    ],
    response:
      "{ token: string; card_tokens: string[]; created: string; customer_product_id: string; shipping_address: object; shipping_method: 'BULK_EXPEDITED' | 'BULK_PRIORITY' | 'BULK_2_DAY' | 'BULK_EXPRESS'; status: 'OPEN' | 'LOCKED'; updated: string; }",
    markdown:
      "## list\n\n`client.cardBulkOrders.list(begin?: string, end?: string, ending_before?: string, page_size?: number, starting_after?: string): { token: string; card_tokens: string[]; created: string; customer_product_id: string; shipping_address: object; shipping_method: 'BULK_EXPEDITED' | 'BULK_PRIORITY' | 'BULK_2_DAY' | 'BULK_EXPRESS'; status: 'OPEN' | 'LOCKED'; updated: string; }`\n\n**get** `/v1/card_bulk_orders`\n\nList bulk orders for physical card shipments\n\n### Parameters\n\n- `begin?: string`\n  Date string in RFC 3339 format. Only entries created after the specified time will be included. UTC time zone.\n\n- `end?: string`\n  Date string in RFC 3339 format. Only entries created before the specified time will be included. UTC time zone.\n\n- `ending_before?: string`\n  A cursor representing an item's token before which a page of results should end. Used to retrieve the previous page of results before this item.\n\n- `page_size?: number`\n  Page size (for pagination).\n\n- `starting_after?: string`\n  A cursor representing an item's token after which a page of results should begin. Used to retrieve the next page of results after this item.\n\n### Returns\n\n- `{ token: string; card_tokens: string[]; created: string; customer_product_id: string; shipping_address: object; shipping_method: 'BULK_EXPEDITED' | 'BULK_PRIORITY' | 'BULK_2_DAY' | 'BULK_EXPRESS'; status: 'OPEN' | 'LOCKED'; updated: string; }`\n  Represents a bulk order for physical card shipments\n\n  - `token: string`\n  - `card_tokens: string[]`\n  - `created: string`\n  - `customer_product_id: string`\n  - `shipping_address: object`\n  - `shipping_method: 'BULK_EXPEDITED' | 'BULK_PRIORITY' | 'BULK_2_DAY' | 'BULK_EXPRESS'`\n  - `status: 'OPEN' | 'LOCKED'`\n  - `updated: string`\n\n### Example\n\n```typescript\nimport Lithic from 'lithic';\n\nconst client = new Lithic();\n\n// Automatically fetches more pages as needed.\nfor await (const cardBulkOrder of client.cardBulkOrders.list()) {\n  console.log(cardBulkOrder);\n}\n```",
  },
  {
    name: 'list',
    endpoint: '/v1/balances',
    httpMethod: 'get',
    summary: 'List balances',
    description: 'Get the balances for a program, business, or a given end-user account',
    stainlessPath: '(resource) balances > (method) list',
    qualified: 'client.balances.list',
    params: [
      'account_token?: string;',
      'balance_date?: string;',
      'business_account_token?: string;',
      "financial_account_type?: 'ISSUING' | 'OPERATING' | 'RESERVE' | 'SECURITY';",
    ],
    response:
      "{ available_amount: number; created: string; currency: string; financial_account_token: string; financial_account_type: 'ISSUING' | 'OPERATING' | 'RESERVE' | 'SECURITY'; last_transaction_event_token: string; last_transaction_token: string; pending_amount: number; total_amount: number; updated: string; }",
    markdown:
      "## list\n\n`client.balances.list(account_token?: string, balance_date?: string, business_account_token?: string, financial_account_type?: 'ISSUING' | 'OPERATING' | 'RESERVE' | 'SECURITY'): { available_amount: number; created: string; currency: string; financial_account_token: string; financial_account_type: 'ISSUING' | 'OPERATING' | 'RESERVE' | 'SECURITY'; last_transaction_event_token: string; last_transaction_token: string; pending_amount: number; total_amount: number; updated: string; }`\n\n**get** `/v1/balances`\n\nGet the balances for a program, business, or a given end-user account\n\n### Parameters\n\n- `account_token?: string`\n  List balances for all financial accounts of a given account_token.\n\n- `balance_date?: string`\n  UTC date and time of the balances to retrieve. Defaults to latest available balances\n\n- `business_account_token?: string`\n  List balances for all financial accounts of a given business_account_token.\n\n- `financial_account_type?: 'ISSUING' | 'OPERATING' | 'RESERVE' | 'SECURITY'`\n  List balances for a given Financial Account type.\n\n### Returns\n\n- `{ available_amount: number; created: string; currency: string; financial_account_token: string; financial_account_type: 'ISSUING' | 'OPERATING' | 'RESERVE' | 'SECURITY'; last_transaction_event_token: string; last_transaction_token: string; pending_amount: number; total_amount: number; updated: string; }`\n  Balance\n\n  - `available_amount: number`\n  - `created: string`\n  - `currency: string`\n  - `financial_account_token: string`\n  - `financial_account_type: 'ISSUING' | 'OPERATING' | 'RESERVE' | 'SECURITY'`\n  - `last_transaction_event_token: string`\n  - `last_transaction_token: string`\n  - `pending_amount: number`\n  - `total_amount: number`\n  - `updated: string`\n\n### Example\n\n```typescript\nimport Lithic from 'lithic';\n\nconst client = new Lithic();\n\n// Automatically fetches more pages as needed.\nfor await (const balance of client.balances.list()) {\n  console.log(balance);\n}\n```",
  },
  {
    name: 'create',
    endpoint: '/v1/disputes',
    httpMethod: 'post',
    summary: 'Request chargeback',
    description: 'Request a chargeback.',
    stainlessPath: '(resource) disputes > (method) create',
    qualified: 'client.disputes.create',
    params: [
      'amount: number;',
      'reason: string;',
      'transaction_token: string;',
      'customer_filed_date?: string;',
      'customer_note?: string;',
    ],
    response:
      '{ token: string; amount: number; arbitration_date: string; created: string; customer_filed_date: string; customer_note: string; network_claim_ids: string[]; network_filed_date: string; network_reason_code: string; prearbitration_date: string; primary_claim_id: string; reason: string; representment_date: string; resolution_date: string; resolution_note: string; resolution_reason: string; status: string; transaction_token: string; }',
    markdown:
      "## create\n\n`client.disputes.create(amount: number, reason: string, transaction_token: string, customer_filed_date?: string, customer_note?: string): { token: string; amount: number; arbitration_date: string; created: string; customer_filed_date: string; customer_note: string; network_claim_ids: string[]; network_filed_date: string; network_reason_code: string; prearbitration_date: string; primary_claim_id: string; reason: string; representment_date: string; resolution_date: string; resolution_note: string; resolution_reason: string; status: string; transaction_token: string; }`\n\n**post** `/v1/disputes`\n\nRequest a chargeback.\n\n### Parameters\n\n- `amount: number`\n  Amount for chargeback\n\n- `reason: string`\n  Reason for chargeback\n\n- `transaction_token: string`\n  Transaction for chargeback\n\n- `customer_filed_date?: string`\n  Date the customer filed the chargeback request\n\n- `customer_note?: string`\n  Customer description\n\n### Returns\n\n- `{ token: string; amount: number; arbitration_date: string; created: string; customer_filed_date: string; customer_note: string; network_claim_ids: string[]; network_filed_date: string; network_reason_code: string; prearbitration_date: string; primary_claim_id: string; reason: string; representment_date: string; resolution_date: string; resolution_note: string; resolution_reason: string; status: string; transaction_token: string; }`\n  Dispute.\n\n  - `token: string`\n  - `amount: number`\n  - `arbitration_date: string`\n  - `created: string`\n  - `customer_filed_date: string`\n  - `customer_note: string`\n  - `network_claim_ids: string[]`\n  - `network_filed_date: string`\n  - `network_reason_code: string`\n  - `prearbitration_date: string`\n  - `primary_claim_id: string`\n  - `reason: string`\n  - `representment_date: string`\n  - `resolution_date: string`\n  - `resolution_note: string`\n  - `resolution_reason: string`\n  - `status: string`\n  - `transaction_token: string`\n\n### Example\n\n```typescript\nimport Lithic from 'lithic';\n\nconst client = new Lithic();\n\nconst dispute = await client.disputes.create({\n  amount: 10000,\n  reason: 'FRAUD_CARD_PRESENT',\n  transaction_token: '12345624-aa69-4cbc-a946-30d90181b621',\n});\n\nconsole.log(dispute);\n```",
  },
  {
    name: 'retrieve',
    endpoint: '/v1/disputes/{dispute_token}',
    httpMethod: 'get',
    summary: 'Get chargeback request',
    description: 'Get chargeback request.',
    stainlessPath: '(resource) disputes > (method) retrieve',
    qualified: 'client.disputes.retrieve',
    params: ['dispute_token: string;'],
    response:
      '{ token: string; amount: number; arbitration_date: string; created: string; customer_filed_date: string; customer_note: string; network_claim_ids: string[]; network_filed_date: string; network_reason_code: string; prearbitration_date: string; primary_claim_id: string; reason: string; representment_date: string; resolution_date: string; resolution_note: string; resolution_reason: string; status: string; transaction_token: string; }',
    markdown:
      "## retrieve\n\n`client.disputes.retrieve(dispute_token: string): { token: string; amount: number; arbitration_date: string; created: string; customer_filed_date: string; customer_note: string; network_claim_ids: string[]; network_filed_date: string; network_reason_code: string; prearbitration_date: string; primary_claim_id: string; reason: string; representment_date: string; resolution_date: string; resolution_note: string; resolution_reason: string; status: string; transaction_token: string; }`\n\n**get** `/v1/disputes/{dispute_token}`\n\nGet chargeback request.\n\n### Parameters\n\n- `dispute_token: string`\n\n### Returns\n\n- `{ token: string; amount: number; arbitration_date: string; created: string; customer_filed_date: string; customer_note: string; network_claim_ids: string[]; network_filed_date: string; network_reason_code: string; prearbitration_date: string; primary_claim_id: string; reason: string; representment_date: string; resolution_date: string; resolution_note: string; resolution_reason: string; status: string; transaction_token: string; }`\n  Dispute.\n\n  - `token: string`\n  - `amount: number`\n  - `arbitration_date: string`\n  - `created: string`\n  - `customer_filed_date: string`\n  - `customer_note: string`\n  - `network_claim_ids: string[]`\n  - `network_filed_date: string`\n  - `network_reason_code: string`\n  - `prearbitration_date: string`\n  - `primary_claim_id: string`\n  - `reason: string`\n  - `representment_date: string`\n  - `resolution_date: string`\n  - `resolution_note: string`\n  - `resolution_reason: string`\n  - `status: string`\n  - `transaction_token: string`\n\n### Example\n\n```typescript\nimport Lithic from 'lithic';\n\nconst client = new Lithic();\n\nconst dispute = await client.disputes.retrieve('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e');\n\nconsole.log(dispute);\n```",
  },
  {
    name: 'update',
    endpoint: '/v1/disputes/{dispute_token}',
    httpMethod: 'patch',
    summary: 'Update chargeback request',
    description: 'Update chargeback request. Can only be modified if status is `NEW`.',
    stainlessPath: '(resource) disputes > (method) update',
    qualified: 'client.disputes.update',
    params: [
      'dispute_token: string;',
      'amount?: number;',
      'customer_filed_date?: string;',
      'customer_note?: string;',
      'reason?: string;',
    ],
    response:
      '{ token: string; amount: number; arbitration_date: string; created: string; customer_filed_date: string; customer_note: string; network_claim_ids: string[]; network_filed_date: string; network_reason_code: string; prearbitration_date: string; primary_claim_id: string; reason: string; representment_date: string; resolution_date: string; resolution_note: string; resolution_reason: string; status: string; transaction_token: string; }',
    markdown:
      "## update\n\n`client.disputes.update(dispute_token: string, amount?: number, customer_filed_date?: string, customer_note?: string, reason?: string): { token: string; amount: number; arbitration_date: string; created: string; customer_filed_date: string; customer_note: string; network_claim_ids: string[]; network_filed_date: string; network_reason_code: string; prearbitration_date: string; primary_claim_id: string; reason: string; representment_date: string; resolution_date: string; resolution_note: string; resolution_reason: string; status: string; transaction_token: string; }`\n\n**patch** `/v1/disputes/{dispute_token}`\n\nUpdate chargeback request. Can only be modified if status is `NEW`.\n\n### Parameters\n\n- `dispute_token: string`\n\n- `amount?: number`\n  Amount for chargeback\n\n- `customer_filed_date?: string`\n  Date the customer filed the chargeback request\n\n- `customer_note?: string`\n  Customer description\n\n- `reason?: string`\n  Reason for chargeback\n\n### Returns\n\n- `{ token: string; amount: number; arbitration_date: string; created: string; customer_filed_date: string; customer_note: string; network_claim_ids: string[]; network_filed_date: string; network_reason_code: string; prearbitration_date: string; primary_claim_id: string; reason: string; representment_date: string; resolution_date: string; resolution_note: string; resolution_reason: string; status: string; transaction_token: string; }`\n  Dispute.\n\n  - `token: string`\n  - `amount: number`\n  - `arbitration_date: string`\n  - `created: string`\n  - `customer_filed_date: string`\n  - `customer_note: string`\n  - `network_claim_ids: string[]`\n  - `network_filed_date: string`\n  - `network_reason_code: string`\n  - `prearbitration_date: string`\n  - `primary_claim_id: string`\n  - `reason: string`\n  - `representment_date: string`\n  - `resolution_date: string`\n  - `resolution_note: string`\n  - `resolution_reason: string`\n  - `status: string`\n  - `transaction_token: string`\n\n### Example\n\n```typescript\nimport Lithic from 'lithic';\n\nconst client = new Lithic();\n\nconst dispute = await client.disputes.update('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e');\n\nconsole.log(dispute);\n```",
  },
  {
    name: 'list',
    endpoint: '/v1/disputes',
    httpMethod: 'get',
    summary: 'List chargeback requests',
    description: 'List chargeback requests.',
    stainlessPath: '(resource) disputes > (method) list',
    qualified: 'client.disputes.list',
    params: [
      'begin?: string;',
      'end?: string;',
      'ending_before?: string;',
      'page_size?: number;',
      'starting_after?: string;',
      'status?: string;',
      'transaction_tokens?: string[];',
    ],
    response:
      '{ token: string; amount: number; arbitration_date: string; created: string; customer_filed_date: string; customer_note: string; network_claim_ids: string[]; network_filed_date: string; network_reason_code: string; prearbitration_date: string; primary_claim_id: string; reason: string; representment_date: string; resolution_date: string; resolution_note: string; resolution_reason: string; status: string; transaction_token: string; }',
    markdown:
      "## list\n\n`client.disputes.list(begin?: string, end?: string, ending_before?: string, page_size?: number, starting_after?: string, status?: string, transaction_tokens?: string[]): { token: string; amount: number; arbitration_date: string; created: string; customer_filed_date: string; customer_note: string; network_claim_ids: string[]; network_filed_date: string; network_reason_code: string; prearbitration_date: string; primary_claim_id: string; reason: string; representment_date: string; resolution_date: string; resolution_note: string; resolution_reason: string; status: string; transaction_token: string; }`\n\n**get** `/v1/disputes`\n\nList chargeback requests.\n\n### Parameters\n\n- `begin?: string`\n  Date string in RFC 3339 format. Only entries created after the specified time will be included. UTC time zone.\n\n- `end?: string`\n  Date string in RFC 3339 format. Only entries created before the specified time will be included. UTC time zone.\n\n- `ending_before?: string`\n  A cursor representing an item's token before which a page of results should end. Used to retrieve the previous page of results before this item.\n\n- `page_size?: number`\n  Page size (for pagination).\n\n- `starting_after?: string`\n  A cursor representing an item's token after which a page of results should begin. Used to retrieve the next page of results after this item.\n\n- `status?: string`\n  Filter by status.\n\n- `transaction_tokens?: string[]`\n  Transaction tokens to filter by.\n\n### Returns\n\n- `{ token: string; amount: number; arbitration_date: string; created: string; customer_filed_date: string; customer_note: string; network_claim_ids: string[]; network_filed_date: string; network_reason_code: string; prearbitration_date: string; primary_claim_id: string; reason: string; representment_date: string; resolution_date: string; resolution_note: string; resolution_reason: string; status: string; transaction_token: string; }`\n  Dispute.\n\n  - `token: string`\n  - `amount: number`\n  - `arbitration_date: string`\n  - `created: string`\n  - `customer_filed_date: string`\n  - `customer_note: string`\n  - `network_claim_ids: string[]`\n  - `network_filed_date: string`\n  - `network_reason_code: string`\n  - `prearbitration_date: string`\n  - `primary_claim_id: string`\n  - `reason: string`\n  - `representment_date: string`\n  - `resolution_date: string`\n  - `resolution_note: string`\n  - `resolution_reason: string`\n  - `status: string`\n  - `transaction_token: string`\n\n### Example\n\n```typescript\nimport Lithic from 'lithic';\n\nconst client = new Lithic();\n\n// Automatically fetches more pages as needed.\nfor await (const dispute of client.disputes.list()) {\n  console.log(dispute);\n}\n```",
  },
  {
    name: 'delete',
    endpoint: '/v1/disputes/{dispute_token}',
    httpMethod: 'delete',
    summary: 'Withdraw chargeback request',
    description: 'Withdraw chargeback request.',
    stainlessPath: '(resource) disputes > (method) delete',
    qualified: 'client.disputes.delete',
    params: ['dispute_token: string;'],
    response:
      '{ token: string; amount: number; arbitration_date: string; created: string; customer_filed_date: string; customer_note: string; network_claim_ids: string[]; network_filed_date: string; network_reason_code: string; prearbitration_date: string; primary_claim_id: string; reason: string; representment_date: string; resolution_date: string; resolution_note: string; resolution_reason: string; status: string; transaction_token: string; }',
    markdown:
      "## delete\n\n`client.disputes.delete(dispute_token: string): { token: string; amount: number; arbitration_date: string; created: string; customer_filed_date: string; customer_note: string; network_claim_ids: string[]; network_filed_date: string; network_reason_code: string; prearbitration_date: string; primary_claim_id: string; reason: string; representment_date: string; resolution_date: string; resolution_note: string; resolution_reason: string; status: string; transaction_token: string; }`\n\n**delete** `/v1/disputes/{dispute_token}`\n\nWithdraw chargeback request.\n\n### Parameters\n\n- `dispute_token: string`\n\n### Returns\n\n- `{ token: string; amount: number; arbitration_date: string; created: string; customer_filed_date: string; customer_note: string; network_claim_ids: string[]; network_filed_date: string; network_reason_code: string; prearbitration_date: string; primary_claim_id: string; reason: string; representment_date: string; resolution_date: string; resolution_note: string; resolution_reason: string; status: string; transaction_token: string; }`\n  Dispute.\n\n  - `token: string`\n  - `amount: number`\n  - `arbitration_date: string`\n  - `created: string`\n  - `customer_filed_date: string`\n  - `customer_note: string`\n  - `network_claim_ids: string[]`\n  - `network_filed_date: string`\n  - `network_reason_code: string`\n  - `prearbitration_date: string`\n  - `primary_claim_id: string`\n  - `reason: string`\n  - `representment_date: string`\n  - `resolution_date: string`\n  - `resolution_note: string`\n  - `resolution_reason: string`\n  - `status: string`\n  - `transaction_token: string`\n\n### Example\n\n```typescript\nimport Lithic from 'lithic';\n\nconst client = new Lithic();\n\nconst dispute = await client.disputes.delete('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e');\n\nconsole.log(dispute);\n```",
  },
  {
    name: 'delete_evidence',
    endpoint: '/v1/disputes/{dispute_token}/evidences/{evidence_token}',
    httpMethod: 'delete',
    summary: 'Delete evidence',
    description:
      'Soft delete evidence for a chargeback request. Evidence will not be reviewed or submitted by Lithic after it is withdrawn.',
    stainlessPath: '(resource) disputes > (method) delete_evidence',
    qualified: 'client.disputes.deleteEvidence',
    params: ['dispute_token: string;', 'evidence_token: string;'],
    response:
      "{ token: string; created: string; dispute_token: string; upload_status: 'DELETED' | 'ERROR' | 'PENDING' | 'REJECTED' | 'UPLOADED'; download_url?: string; filename?: string; upload_url?: string; }",
    markdown:
      "## delete_evidence\n\n`client.disputes.deleteEvidence(dispute_token: string, evidence_token: string): { token: string; created: string; dispute_token: string; upload_status: 'DELETED' | 'ERROR' | 'PENDING' | 'REJECTED' | 'UPLOADED'; download_url?: string; filename?: string; upload_url?: string; }`\n\n**delete** `/v1/disputes/{dispute_token}/evidences/{evidence_token}`\n\nSoft delete evidence for a chargeback request. Evidence will not be reviewed or submitted by Lithic after it is withdrawn.\n\n### Parameters\n\n- `dispute_token: string`\n\n- `evidence_token: string`\n\n### Returns\n\n- `{ token: string; created: string; dispute_token: string; upload_status: 'DELETED' | 'ERROR' | 'PENDING' | 'REJECTED' | 'UPLOADED'; download_url?: string; filename?: string; upload_url?: string; }`\n  Dispute evidence.\n\n  - `token: string`\n  - `created: string`\n  - `dispute_token: string`\n  - `upload_status: 'DELETED' | 'ERROR' | 'PENDING' | 'REJECTED' | 'UPLOADED'`\n  - `download_url?: string`\n  - `filename?: string`\n  - `upload_url?: string`\n\n### Example\n\n```typescript\nimport Lithic from 'lithic';\n\nconst client = new Lithic();\n\nconst disputeEvidence = await client.disputes.deleteEvidence('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', { dispute_token: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e' });\n\nconsole.log(disputeEvidence);\n```",
  },
  {
    name: 'initiate_evidence_upload',
    endpoint: '/v1/disputes/{dispute_token}/evidences',
    httpMethod: 'post',
    summary: 'Upload evidence',
    description:
      'Use this endpoint to upload evidence for a chargeback request. It will return a URL to upload your documents to. The URL will expire in 30 minutes.\n\nUploaded documents must either be a `jpg`, `png` or `pdf` file, and each must be less than 5 GiB.\n',
    stainlessPath: '(resource) disputes > (method) initiate_evidence_upload',
    qualified: 'client.disputes.initiateEvidenceUpload',
    params: ['dispute_token: string;', 'filename?: string;'],
    response:
      "{ token: string; created: string; dispute_token: string; upload_status: 'DELETED' | 'ERROR' | 'PENDING' | 'REJECTED' | 'UPLOADED'; download_url?: string; filename?: string; upload_url?: string; }",
    markdown:
      "## initiate_evidence_upload\n\n`client.disputes.initiateEvidenceUpload(dispute_token: string, filename?: string): { token: string; created: string; dispute_token: string; upload_status: 'DELETED' | 'ERROR' | 'PENDING' | 'REJECTED' | 'UPLOADED'; download_url?: string; filename?: string; upload_url?: string; }`\n\n**post** `/v1/disputes/{dispute_token}/evidences`\n\nUse this endpoint to upload evidence for a chargeback request. It will return a URL to upload your documents to. The URL will expire in 30 minutes.\n\nUploaded documents must either be a `jpg`, `png` or `pdf` file, and each must be less than 5 GiB.\n\n\n### Parameters\n\n- `dispute_token: string`\n\n- `filename?: string`\n  Filename of the evidence.\n\n### Returns\n\n- `{ token: string; created: string; dispute_token: string; upload_status: 'DELETED' | 'ERROR' | 'PENDING' | 'REJECTED' | 'UPLOADED'; download_url?: string; filename?: string; upload_url?: string; }`\n  Dispute evidence.\n\n  - `token: string`\n  - `created: string`\n  - `dispute_token: string`\n  - `upload_status: 'DELETED' | 'ERROR' | 'PENDING' | 'REJECTED' | 'UPLOADED'`\n  - `download_url?: string`\n  - `filename?: string`\n  - `upload_url?: string`\n\n### Example\n\n```typescript\nimport Lithic from 'lithic';\n\nconst client = new Lithic();\n\nconst disputeEvidence = await client.disputes.initiateEvidenceUpload('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e');\n\nconsole.log(disputeEvidence);\n```",
  },
  {
    name: 'list_evidences',
    endpoint: '/v1/disputes/{dispute_token}/evidences',
    httpMethod: 'get',
    summary: 'List evidence',
    description: 'List evidence for a chargeback request.',
    stainlessPath: '(resource) disputes > (method) list_evidences',
    qualified: 'client.disputes.listEvidences',
    params: [
      'dispute_token: string;',
      'begin?: string;',
      'end?: string;',
      'ending_before?: string;',
      'page_size?: number;',
      'starting_after?: string;',
    ],
    response:
      "{ token: string; created: string; dispute_token: string; upload_status: 'DELETED' | 'ERROR' | 'PENDING' | 'REJECTED' | 'UPLOADED'; download_url?: string; filename?: string; upload_url?: string; }",
    markdown:
      "## list_evidences\n\n`client.disputes.listEvidences(dispute_token: string, begin?: string, end?: string, ending_before?: string, page_size?: number, starting_after?: string): { token: string; created: string; dispute_token: string; upload_status: 'DELETED' | 'ERROR' | 'PENDING' | 'REJECTED' | 'UPLOADED'; download_url?: string; filename?: string; upload_url?: string; }`\n\n**get** `/v1/disputes/{dispute_token}/evidences`\n\nList evidence for a chargeback request.\n\n### Parameters\n\n- `dispute_token: string`\n\n- `begin?: string`\n  Date string in RFC 3339 format. Only entries created after the specified time will be included. UTC time zone.\n\n- `end?: string`\n  Date string in RFC 3339 format. Only entries created before the specified time will be included. UTC time zone.\n\n- `ending_before?: string`\n  A cursor representing an item's token before which a page of results should end. Used to retrieve the previous page of results before this item.\n\n- `page_size?: number`\n  Page size (for pagination).\n\n- `starting_after?: string`\n  A cursor representing an item's token after which a page of results should begin. Used to retrieve the next page of results after this item.\n\n### Returns\n\n- `{ token: string; created: string; dispute_token: string; upload_status: 'DELETED' | 'ERROR' | 'PENDING' | 'REJECTED' | 'UPLOADED'; download_url?: string; filename?: string; upload_url?: string; }`\n  Dispute evidence.\n\n  - `token: string`\n  - `created: string`\n  - `dispute_token: string`\n  - `upload_status: 'DELETED' | 'ERROR' | 'PENDING' | 'REJECTED' | 'UPLOADED'`\n  - `download_url?: string`\n  - `filename?: string`\n  - `upload_url?: string`\n\n### Example\n\n```typescript\nimport Lithic from 'lithic';\n\nconst client = new Lithic();\n\n// Automatically fetches more pages as needed.\nfor await (const disputeEvidence of client.disputes.listEvidences('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e')) {\n  console.log(disputeEvidence);\n}\n```",
  },
  {
    name: 'retrieve_evidence',
    endpoint: '/v1/disputes/{dispute_token}/evidences/{evidence_token}',
    httpMethod: 'get',
    summary: 'Get evidence',
    description: 'Get evidence for a chargeback request.',
    stainlessPath: '(resource) disputes > (method) retrieve_evidence',
    qualified: 'client.disputes.retrieveEvidence',
    params: ['dispute_token: string;', 'evidence_token: string;'],
    response:
      "{ token: string; created: string; dispute_token: string; upload_status: 'DELETED' | 'ERROR' | 'PENDING' | 'REJECTED' | 'UPLOADED'; download_url?: string; filename?: string; upload_url?: string; }",
    markdown:
      "## retrieve_evidence\n\n`client.disputes.retrieveEvidence(dispute_token: string, evidence_token: string): { token: string; created: string; dispute_token: string; upload_status: 'DELETED' | 'ERROR' | 'PENDING' | 'REJECTED' | 'UPLOADED'; download_url?: string; filename?: string; upload_url?: string; }`\n\n**get** `/v1/disputes/{dispute_token}/evidences/{evidence_token}`\n\nGet evidence for a chargeback request.\n\n### Parameters\n\n- `dispute_token: string`\n\n- `evidence_token: string`\n\n### Returns\n\n- `{ token: string; created: string; dispute_token: string; upload_status: 'DELETED' | 'ERROR' | 'PENDING' | 'REJECTED' | 'UPLOADED'; download_url?: string; filename?: string; upload_url?: string; }`\n  Dispute evidence.\n\n  - `token: string`\n  - `created: string`\n  - `dispute_token: string`\n  - `upload_status: 'DELETED' | 'ERROR' | 'PENDING' | 'REJECTED' | 'UPLOADED'`\n  - `download_url?: string`\n  - `filename?: string`\n  - `upload_url?: string`\n\n### Example\n\n```typescript\nimport Lithic from 'lithic';\n\nconst client = new Lithic();\n\nconst disputeEvidence = await client.disputes.retrieveEvidence('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', { dispute_token: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e' });\n\nconsole.log(disputeEvidence);\n```",
  },
  {
    name: 'retrieve',
    endpoint: '/v2/disputes/{dispute_token}',
    httpMethod: 'get',
    summary: 'Retrieve a dispute',
    description: 'Retrieves a specific dispute by its token.',
    stainlessPath: '(resource) disputes_v2 > (method) retrieve',
    qualified: 'client.disputesV2.retrieve',
    params: ['dispute_token: string;'],
    response:
      "{ token: string; account_token: string; card_token: string; case_id: string; created: string; currency: string; disposition: 'WON' | 'LOST' | 'PARTIALLY_WON' | 'WITHDRAWN' | 'DENIED'; events: { token: string; created: string; data: object | object | object; type: 'WORKFLOW' | 'FINANCIAL' | 'CARDHOLDER_LIABILITY'; }[]; liability_allocation: { denied_amount: number; original_amount: number; recovered_amount: number; remaining_amount: number; written_off_amount: number; }; merchant: object; network: 'VISA' | 'MASTERCARD'; status: 'OPEN' | 'CLOSED'; transaction_series: { related_transaction_event_token: string; related_transaction_token: string; type: 'DISPUTE'; }; updated: string; }",
    markdown:
      "## retrieve\n\n`client.disputesV2.retrieve(dispute_token: string): { token: string; account_token: string; card_token: string; case_id: string; created: string; currency: string; disposition: 'WON' | 'LOST' | 'PARTIALLY_WON' | 'WITHDRAWN' | 'DENIED'; events: object[]; liability_allocation: object; merchant: merchant; network: 'VISA' | 'MASTERCARD'; status: 'OPEN' | 'CLOSED'; transaction_series: object; updated: string; }`\n\n**get** `/v2/disputes/{dispute_token}`\n\nRetrieves a specific dispute by its token.\n\n### Parameters\n\n- `dispute_token: string`\n\n### Returns\n\n- `{ token: string; account_token: string; card_token: string; case_id: string; created: string; currency: string; disposition: 'WON' | 'LOST' | 'PARTIALLY_WON' | 'WITHDRAWN' | 'DENIED'; events: { token: string; created: string; data: { action: 'OPENED' | 'CLOSED' | 'REOPENED'; amount: number; disposition: 'WON' | 'LOST' | 'PARTIALLY_WON' | 'WITHDRAWN' | 'DENIED'; reason: string; stage: 'CLAIM'; type: 'WORKFLOW'; } | { amount: number; polarity: 'CREDIT' | 'DEBIT'; stage: 'CHARGEBACK' | 'REPRESENTMENT' | 'PREARBITRATION' | 'ARBITRATION' | 'COLLABORATION'; type: 'FINANCIAL'; } | { action: 'PROVISIONAL_CREDIT_GRANTED' | 'PROVISIONAL_CREDIT_REVERSED' | 'WRITTEN_OFF'; amount: number; reason: string; type: 'CARDHOLDER_LIABILITY'; }; type: 'WORKFLOW' | 'FINANCIAL' | 'CARDHOLDER_LIABILITY'; }[]; liability_allocation: { denied_amount: number; original_amount: number; recovered_amount: number; remaining_amount: number; written_off_amount: number; }; merchant: { acceptor_id: string; acquiring_institution_id: string; city: string; country: string; descriptor: string; mcc: string; state: string; }; network: 'VISA' | 'MASTERCARD'; status: 'OPEN' | 'CLOSED'; transaction_series: { related_transaction_event_token: string; related_transaction_token: string; type: 'DISPUTE'; }; updated: string; }`\n  The Dispute object tracks the progression of a dispute throughout its lifecycle.\n\n  - `token: string`\n  - `account_token: string`\n  - `card_token: string`\n  - `case_id: string`\n  - `created: string`\n  - `currency: string`\n  - `disposition: 'WON' | 'LOST' | 'PARTIALLY_WON' | 'WITHDRAWN' | 'DENIED'`\n  - `events: { token: string; created: string; data: { action: 'OPENED' | 'CLOSED' | 'REOPENED'; amount: number; disposition: 'WON' | 'LOST' | 'PARTIALLY_WON' | 'WITHDRAWN' | 'DENIED'; reason: string; stage: 'CLAIM'; type: 'WORKFLOW'; } | { amount: number; polarity: 'CREDIT' | 'DEBIT'; stage: 'CHARGEBACK' | 'REPRESENTMENT' | 'PREARBITRATION' | 'ARBITRATION' | 'COLLABORATION'; type: 'FINANCIAL'; } | { action: 'PROVISIONAL_CREDIT_GRANTED' | 'PROVISIONAL_CREDIT_REVERSED' | 'WRITTEN_OFF'; amount: number; reason: string; type: 'CARDHOLDER_LIABILITY'; }; type: 'WORKFLOW' | 'FINANCIAL' | 'CARDHOLDER_LIABILITY'; }[]`\n  - `liability_allocation: { denied_amount: number; original_amount: number; recovered_amount: number; remaining_amount: number; written_off_amount: number; }`\n  - `merchant: { acceptor_id: string; acquiring_institution_id: string; city: string; country: string; descriptor: string; mcc: string; state: string; }`\n  - `network: 'VISA' | 'MASTERCARD'`\n  - `status: 'OPEN' | 'CLOSED'`\n  - `transaction_series: { related_transaction_event_token: string; related_transaction_token: string; type: 'DISPUTE'; }`\n  - `updated: string`\n\n### Example\n\n```typescript\nimport Lithic from 'lithic';\n\nconst client = new Lithic();\n\nconst disputeV2 = await client.disputesV2.retrieve('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e');\n\nconsole.log(disputeV2);\n```",
  },
  {
    name: 'list',
    endpoint: '/v2/disputes',
    httpMethod: 'get',
    summary: 'List disputes',
    description: 'Returns a paginated list of disputes.',
    stainlessPath: '(resource) disputes_v2 > (method) list',
    qualified: 'client.disputesV2.list',
    params: [
      'account_token?: string;',
      'begin?: string;',
      'card_token?: string;',
      'disputed_transaction_token?: string;',
      'end?: string;',
      'ending_before?: string;',
      'page_size?: number;',
      'starting_after?: string;',
    ],
    response:
      "{ token: string; account_token: string; card_token: string; case_id: string; created: string; currency: string; disposition: 'WON' | 'LOST' | 'PARTIALLY_WON' | 'WITHDRAWN' | 'DENIED'; events: { token: string; created: string; data: object | object | object; type: 'WORKFLOW' | 'FINANCIAL' | 'CARDHOLDER_LIABILITY'; }[]; liability_allocation: { denied_amount: number; original_amount: number; recovered_amount: number; remaining_amount: number; written_off_amount: number; }; merchant: object; network: 'VISA' | 'MASTERCARD'; status: 'OPEN' | 'CLOSED'; transaction_series: { related_transaction_event_token: string; related_transaction_token: string; type: 'DISPUTE'; }; updated: string; }",
    markdown:
      "## list\n\n`client.disputesV2.list(account_token?: string, begin?: string, card_token?: string, disputed_transaction_token?: string, end?: string, ending_before?: string, page_size?: number, starting_after?: string): { token: string; account_token: string; card_token: string; case_id: string; created: string; currency: string; disposition: 'WON' | 'LOST' | 'PARTIALLY_WON' | 'WITHDRAWN' | 'DENIED'; events: object[]; liability_allocation: object; merchant: merchant; network: 'VISA' | 'MASTERCARD'; status: 'OPEN' | 'CLOSED'; transaction_series: object; updated: string; }`\n\n**get** `/v2/disputes`\n\nReturns a paginated list of disputes.\n\n### Parameters\n\n- `account_token?: string`\n  Filter by account token.\n\n- `begin?: string`\n  RFC 3339 timestamp for filtering by created date, inclusive.\n\n- `card_token?: string`\n  Filter by card token.\n\n- `disputed_transaction_token?: string`\n  Filter by the token of the transaction being disputed. Corresponds with transaction_series.related_transaction_token in the Dispute.\n\n- `end?: string`\n  RFC 3339 timestamp for filtering by created date, inclusive.\n\n- `ending_before?: string`\n  A cursor representing an item's token before which a page of results should end. Used to retrieve the previous page of results before this item.\n\n- `page_size?: number`\n  Number of items to return.\n\n- `starting_after?: string`\n  A cursor representing an item's token after which a page of results should begin. Used to retrieve the next page of results after this item.\n\n### Returns\n\n- `{ token: string; account_token: string; card_token: string; case_id: string; created: string; currency: string; disposition: 'WON' | 'LOST' | 'PARTIALLY_WON' | 'WITHDRAWN' | 'DENIED'; events: { token: string; created: string; data: { action: 'OPENED' | 'CLOSED' | 'REOPENED'; amount: number; disposition: 'WON' | 'LOST' | 'PARTIALLY_WON' | 'WITHDRAWN' | 'DENIED'; reason: string; stage: 'CLAIM'; type: 'WORKFLOW'; } | { amount: number; polarity: 'CREDIT' | 'DEBIT'; stage: 'CHARGEBACK' | 'REPRESENTMENT' | 'PREARBITRATION' | 'ARBITRATION' | 'COLLABORATION'; type: 'FINANCIAL'; } | { action: 'PROVISIONAL_CREDIT_GRANTED' | 'PROVISIONAL_CREDIT_REVERSED' | 'WRITTEN_OFF'; amount: number; reason: string; type: 'CARDHOLDER_LIABILITY'; }; type: 'WORKFLOW' | 'FINANCIAL' | 'CARDHOLDER_LIABILITY'; }[]; liability_allocation: { denied_amount: number; original_amount: number; recovered_amount: number; remaining_amount: number; written_off_amount: number; }; merchant: { acceptor_id: string; acquiring_institution_id: string; city: string; country: string; descriptor: string; mcc: string; state: string; }; network: 'VISA' | 'MASTERCARD'; status: 'OPEN' | 'CLOSED'; transaction_series: { related_transaction_event_token: string; related_transaction_token: string; type: 'DISPUTE'; }; updated: string; }`\n  The Dispute object tracks the progression of a dispute throughout its lifecycle.\n\n  - `token: string`\n  - `account_token: string`\n  - `card_token: string`\n  - `case_id: string`\n  - `created: string`\n  - `currency: string`\n  - `disposition: 'WON' | 'LOST' | 'PARTIALLY_WON' | 'WITHDRAWN' | 'DENIED'`\n  - `events: { token: string; created: string; data: { action: 'OPENED' | 'CLOSED' | 'REOPENED'; amount: number; disposition: 'WON' | 'LOST' | 'PARTIALLY_WON' | 'WITHDRAWN' | 'DENIED'; reason: string; stage: 'CLAIM'; type: 'WORKFLOW'; } | { amount: number; polarity: 'CREDIT' | 'DEBIT'; stage: 'CHARGEBACK' | 'REPRESENTMENT' | 'PREARBITRATION' | 'ARBITRATION' | 'COLLABORATION'; type: 'FINANCIAL'; } | { action: 'PROVISIONAL_CREDIT_GRANTED' | 'PROVISIONAL_CREDIT_REVERSED' | 'WRITTEN_OFF'; amount: number; reason: string; type: 'CARDHOLDER_LIABILITY'; }; type: 'WORKFLOW' | 'FINANCIAL' | 'CARDHOLDER_LIABILITY'; }[]`\n  - `liability_allocation: { denied_amount: number; original_amount: number; recovered_amount: number; remaining_amount: number; written_off_amount: number; }`\n  - `merchant: { acceptor_id: string; acquiring_institution_id: string; city: string; country: string; descriptor: string; mcc: string; state: string; }`\n  - `network: 'VISA' | 'MASTERCARD'`\n  - `status: 'OPEN' | 'CLOSED'`\n  - `transaction_series: { related_transaction_event_token: string; related_transaction_token: string; type: 'DISPUTE'; }`\n  - `updated: string`\n\n### Example\n\n```typescript\nimport Lithic from 'lithic';\n\nconst client = new Lithic();\n\n// Automatically fetches more pages as needed.\nfor await (const disputeV2 of client.disputesV2.list()) {\n  console.log(disputeV2);\n}\n```",
  },
  {
    name: 'retrieve',
    endpoint: '/v1/events/{event_token}',
    httpMethod: 'get',
    summary: 'Get event',
    description: 'Get an event.',
    stainlessPath: '(resource) events > (method) retrieve',
    qualified: 'client.events.retrieve',
    params: ['event_token: string;'],
    response: '{ token: string; created: string; event_type: string; payload: object; }',
    markdown:
      "## retrieve\n\n`client.events.retrieve(event_token: string): { token: string; created: string; event_type: string; payload: object; }`\n\n**get** `/v1/events/{event_token}`\n\nGet an event.\n\n### Parameters\n\n- `event_token: string`\n\n### Returns\n\n- `{ token: string; created: string; event_type: string; payload: object; }`\n  A single event that affects the transaction state and lifecycle.\n\n  - `token: string`\n  - `created: string`\n  - `event_type: string`\n  - `payload: object`\n\n### Example\n\n```typescript\nimport Lithic from 'lithic';\n\nconst client = new Lithic();\n\nconst event = await client.events.retrieve('event_token');\n\nconsole.log(event);\n```",
  },
  {
    name: 'list',
    endpoint: '/v1/events',
    httpMethod: 'get',
    summary: 'List events',
    description: 'List all events.',
    stainlessPath: '(resource) events > (method) list',
    qualified: 'client.events.list',
    params: [
      'begin?: string;',
      'end?: string;',
      'ending_before?: string;',
      'event_types?: string[];',
      'page_size?: number;',
      'starting_after?: string;',
      'with_content?: boolean;',
    ],
    response: '{ token: string; created: string; event_type: string; payload: object; }',
    markdown:
      "## list\n\n`client.events.list(begin?: string, end?: string, ending_before?: string, event_types?: string[], page_size?: number, starting_after?: string, with_content?: boolean): { token: string; created: string; event_type: string; payload: object; }`\n\n**get** `/v1/events`\n\nList all events.\n\n### Parameters\n\n- `begin?: string`\n  Date string in RFC 3339 format. Only entries created after the specified time will be included. UTC time zone.\n\n- `end?: string`\n  Date string in RFC 3339 format. Only entries created before the specified time will be included. UTC time zone.\n\n- `ending_before?: string`\n  A cursor representing an item's token before which a page of results should end. Used to retrieve the previous page of results before this item.\n\n- `event_types?: string[]`\n  Event types to filter events by.\n\n- `page_size?: number`\n  Page size (for pagination).\n\n- `starting_after?: string`\n  A cursor representing an item's token after which a page of results should begin. Used to retrieve the next page of results after this item.\n\n- `with_content?: boolean`\n  Whether to include the event payload content in the response.\n\n### Returns\n\n- `{ token: string; created: string; event_type: string; payload: object; }`\n  A single event that affects the transaction state and lifecycle.\n\n  - `token: string`\n  - `created: string`\n  - `event_type: string`\n  - `payload: object`\n\n### Example\n\n```typescript\nimport Lithic from 'lithic';\n\nconst client = new Lithic();\n\n// Automatically fetches more pages as needed.\nfor await (const event of client.events.list()) {\n  console.log(event);\n}\n```",
  },
  {
    name: 'list_attempts',
    endpoint: '/v1/events/{event_token}/attempts',
    httpMethod: 'get',
    summary: 'List message attempts for an event',
    description: 'List all the message attempts for a given event.',
    stainlessPath: '(resource) events > (method) list_attempts',
    qualified: 'client.events.listAttempts',
    params: [
      'event_token: string;',
      'begin?: string;',
      'end?: string;',
      'ending_before?: string;',
      'page_size?: number;',
      'starting_after?: string;',
      "status?: 'FAILED' | 'PENDING' | 'SENDING' | 'SUCCESS';",
    ],
    response:
      "{ token: string; created: string; event_subscription_token: string; event_token: string; response: string; response_status_code: number; status: 'FAILED' | 'PENDING' | 'SENDING' | 'SUCCESS'; url: string; }",
    markdown:
      "## list_attempts\n\n`client.events.listAttempts(event_token: string, begin?: string, end?: string, ending_before?: string, page_size?: number, starting_after?: string, status?: 'FAILED' | 'PENDING' | 'SENDING' | 'SUCCESS'): { token: string; created: string; event_subscription_token: string; event_token: string; response: string; response_status_code: number; status: 'FAILED' | 'PENDING' | 'SENDING' | 'SUCCESS'; url: string; }`\n\n**get** `/v1/events/{event_token}/attempts`\n\nList all the message attempts for a given event.\n\n### Parameters\n\n- `event_token: string`\n\n- `begin?: string`\n  Date string in RFC 3339 format. Only entries created after the specified time will be included. UTC time zone.\n\n- `end?: string`\n  Date string in RFC 3339 format. Only entries created before the specified time will be included. UTC time zone.\n\n- `ending_before?: string`\n  A cursor representing an item's token before which a page of results should end. Used to retrieve the previous page of results before this item.\n\n- `page_size?: number`\n  Page size (for pagination).\n\n- `starting_after?: string`\n  A cursor representing an item's token after which a page of results should begin. Used to retrieve the next page of results after this item.\n\n- `status?: 'FAILED' | 'PENDING' | 'SENDING' | 'SUCCESS'`\n\n### Returns\n\n- `{ token: string; created: string; event_subscription_token: string; event_token: string; response: string; response_status_code: number; status: 'FAILED' | 'PENDING' | 'SENDING' | 'SUCCESS'; url: string; }`\n  A subscription to specific event types.\n\n  - `token: string`\n  - `created: string`\n  - `event_subscription_token: string`\n  - `event_token: string`\n  - `response: string`\n  - `response_status_code: number`\n  - `status: 'FAILED' | 'PENDING' | 'SENDING' | 'SUCCESS'`\n  - `url: string`\n\n### Example\n\n```typescript\nimport Lithic from 'lithic';\n\nconst client = new Lithic();\n\n// Automatically fetches more pages as needed.\nfor await (const messageAttempt of client.events.listAttempts('event_token')) {\n  console.log(messageAttempt);\n}\n```",
  },
  {
    name: 'create',
    endpoint: '/v1/event_subscriptions',
    httpMethod: 'post',
    summary: 'Create event subscription',
    description: 'Create a new event subscription.',
    stainlessPath: '(resource) events.subscriptions > (method) create',
    qualified: 'client.events.subscriptions.create',
    params: ['url: string;', 'description?: string;', 'disabled?: boolean;', 'event_types?: string[];'],
    response:
      '{ token: string; description: string; disabled: boolean; url: string; event_types?: string[]; }',
    markdown:
      "## create\n\n`client.events.subscriptions.create(url: string, description?: string, disabled?: boolean, event_types?: string[]): { token: string; description: string; disabled: boolean; url: string; event_types?: string[]; }`\n\n**post** `/v1/event_subscriptions`\n\nCreate a new event subscription.\n\n### Parameters\n\n- `url: string`\n  URL to which event webhooks will be sent. URL must be a valid HTTPS address.\n\n- `description?: string`\n  Event subscription description.\n\n- `disabled?: boolean`\n  Whether the event subscription is active (false) or inactive (true).\n\n- `event_types?: string[]`\n  Indicates types of events that will be sent to this subscription. If left blank, all types will be sent.\n\n### Returns\n\n- `{ token: string; description: string; disabled: boolean; url: string; event_types?: string[]; }`\n  A subscription to specific event types.\n\n  - `token: string`\n  - `description: string`\n  - `disabled: boolean`\n  - `url: string`\n  - `event_types?: string[]`\n\n### Example\n\n```typescript\nimport Lithic from 'lithic';\n\nconst client = new Lithic();\n\nconst eventSubscription = await client.events.subscriptions.create({ url: 'https://example.com' });\n\nconsole.log(eventSubscription);\n```",
  },
  {
    name: 'retrieve',
    endpoint: '/v1/event_subscriptions/{event_subscription_token}',
    httpMethod: 'get',
    summary: 'Get event subscription',
    description: 'Get an event subscription.',
    stainlessPath: '(resource) events.subscriptions > (method) retrieve',
    qualified: 'client.events.subscriptions.retrieve',
    params: ['event_subscription_token: string;'],
    response:
      '{ token: string; description: string; disabled: boolean; url: string; event_types?: string[]; }',
    markdown:
      "## retrieve\n\n`client.events.subscriptions.retrieve(event_subscription_token: string): { token: string; description: string; disabled: boolean; url: string; event_types?: string[]; }`\n\n**get** `/v1/event_subscriptions/{event_subscription_token}`\n\nGet an event subscription.\n\n### Parameters\n\n- `event_subscription_token: string`\n\n### Returns\n\n- `{ token: string; description: string; disabled: boolean; url: string; event_types?: string[]; }`\n  A subscription to specific event types.\n\n  - `token: string`\n  - `description: string`\n  - `disabled: boolean`\n  - `url: string`\n  - `event_types?: string[]`\n\n### Example\n\n```typescript\nimport Lithic from 'lithic';\n\nconst client = new Lithic();\n\nconst eventSubscription = await client.events.subscriptions.retrieve('event_subscription_token');\n\nconsole.log(eventSubscription);\n```",
  },
  {
    name: 'update',
    endpoint: '/v1/event_subscriptions/{event_subscription_token}',
    httpMethod: 'patch',
    summary: 'Update event subscription',
    description: 'Update an event subscription.',
    stainlessPath: '(resource) events.subscriptions > (method) update',
    qualified: 'client.events.subscriptions.update',
    params: [
      'event_subscription_token: string;',
      'url: string;',
      'description?: string;',
      'disabled?: boolean;',
      'event_types?: string[];',
    ],
    response:
      '{ token: string; description: string; disabled: boolean; url: string; event_types?: string[]; }',
    markdown:
      "## update\n\n`client.events.subscriptions.update(event_subscription_token: string, url: string, description?: string, disabled?: boolean, event_types?: string[]): { token: string; description: string; disabled: boolean; url: string; event_types?: string[]; }`\n\n**patch** `/v1/event_subscriptions/{event_subscription_token}`\n\nUpdate an event subscription.\n\n### Parameters\n\n- `event_subscription_token: string`\n\n- `url: string`\n  URL to which event webhooks will be sent. URL must be a valid HTTPS address.\n\n- `description?: string`\n  Event subscription description.\n\n- `disabled?: boolean`\n  Whether the event subscription is active (false) or inactive (true).\n\n- `event_types?: string[]`\n  Indicates types of events that will be sent to this subscription. If left blank, all types will be sent.\n\n### Returns\n\n- `{ token: string; description: string; disabled: boolean; url: string; event_types?: string[]; }`\n  A subscription to specific event types.\n\n  - `token: string`\n  - `description: string`\n  - `disabled: boolean`\n  - `url: string`\n  - `event_types?: string[]`\n\n### Example\n\n```typescript\nimport Lithic from 'lithic';\n\nconst client = new Lithic();\n\nconst eventSubscription = await client.events.subscriptions.update('event_subscription_token', { url: 'https://example.com' });\n\nconsole.log(eventSubscription);\n```",
  },
  {
    name: 'list',
    endpoint: '/v1/event_subscriptions',
    httpMethod: 'get',
    summary: 'List event subscriptions',
    description: 'List all the event subscriptions.',
    stainlessPath: '(resource) events.subscriptions > (method) list',
    qualified: 'client.events.subscriptions.list',
    params: ['ending_before?: string;', 'page_size?: number;', 'starting_after?: string;'],
    response:
      '{ token: string; description: string; disabled: boolean; url: string; event_types?: string[]; }',
    markdown:
      "## list\n\n`client.events.subscriptions.list(ending_before?: string, page_size?: number, starting_after?: string): { token: string; description: string; disabled: boolean; url: string; event_types?: string[]; }`\n\n**get** `/v1/event_subscriptions`\n\nList all the event subscriptions.\n\n### Parameters\n\n- `ending_before?: string`\n  A cursor representing an item's token before which a page of results should end. Used to retrieve the previous page of results before this item.\n\n- `page_size?: number`\n  Page size (for pagination).\n\n- `starting_after?: string`\n  A cursor representing an item's token after which a page of results should begin. Used to retrieve the next page of results after this item.\n\n### Returns\n\n- `{ token: string; description: string; disabled: boolean; url: string; event_types?: string[]; }`\n  A subscription to specific event types.\n\n  - `token: string`\n  - `description: string`\n  - `disabled: boolean`\n  - `url: string`\n  - `event_types?: string[]`\n\n### Example\n\n```typescript\nimport Lithic from 'lithic';\n\nconst client = new Lithic();\n\n// Automatically fetches more pages as needed.\nfor await (const eventSubscription of client.events.subscriptions.list()) {\n  console.log(eventSubscription);\n}\n```",
  },
  {
    name: 'delete',
    endpoint: '/v1/event_subscriptions/{event_subscription_token}',
    httpMethod: 'delete',
    summary: 'Delete event subscription',
    description: 'Delete an event subscription.',
    stainlessPath: '(resource) events.subscriptions > (method) delete',
    qualified: 'client.events.subscriptions.delete',
    params: ['event_subscription_token: string;'],
    markdown:
      "## delete\n\n`client.events.subscriptions.delete(event_subscription_token: string): void`\n\n**delete** `/v1/event_subscriptions/{event_subscription_token}`\n\nDelete an event subscription.\n\n### Parameters\n\n- `event_subscription_token: string`\n\n### Example\n\n```typescript\nimport Lithic from 'lithic';\n\nconst client = new Lithic();\n\nawait client.events.subscriptions.delete('event_subscription_token')\n```",
  },
  {
    name: 'list_attempts',
    endpoint: '/v1/event_subscriptions/{event_subscription_token}/attempts',
    httpMethod: 'get',
    summary: 'List message attempts for an event subscription',
    description: 'List all the message attempts for a given event subscription.',
    stainlessPath: '(resource) events.subscriptions > (method) list_attempts',
    qualified: 'client.events.subscriptions.listAttempts',
    params: [
      'event_subscription_token: string;',
      'begin?: string;',
      'end?: string;',
      'ending_before?: string;',
      'page_size?: number;',
      'starting_after?: string;',
      "status?: 'FAILED' | 'PENDING' | 'SENDING' | 'SUCCESS';",
    ],
    response:
      "{ token: string; created: string; event_subscription_token: string; event_token: string; response: string; response_status_code: number; status: 'FAILED' | 'PENDING' | 'SENDING' | 'SUCCESS'; url: string; }",
    markdown:
      "## list_attempts\n\n`client.events.subscriptions.listAttempts(event_subscription_token: string, begin?: string, end?: string, ending_before?: string, page_size?: number, starting_after?: string, status?: 'FAILED' | 'PENDING' | 'SENDING' | 'SUCCESS'): { token: string; created: string; event_subscription_token: string; event_token: string; response: string; response_status_code: number; status: 'FAILED' | 'PENDING' | 'SENDING' | 'SUCCESS'; url: string; }`\n\n**get** `/v1/event_subscriptions/{event_subscription_token}/attempts`\n\nList all the message attempts for a given event subscription.\n\n### Parameters\n\n- `event_subscription_token: string`\n\n- `begin?: string`\n  Date string in RFC 3339 format. Only entries created after the specified time will be included. UTC time zone.\n\n- `end?: string`\n  Date string in RFC 3339 format. Only entries created before the specified time will be included. UTC time zone.\n\n- `ending_before?: string`\n  A cursor representing an item's token before which a page of results should end. Used to retrieve the previous page of results before this item.\n\n- `page_size?: number`\n  Page size (for pagination).\n\n- `starting_after?: string`\n  A cursor representing an item's token after which a page of results should begin. Used to retrieve the next page of results after this item.\n\n- `status?: 'FAILED' | 'PENDING' | 'SENDING' | 'SUCCESS'`\n\n### Returns\n\n- `{ token: string; created: string; event_subscription_token: string; event_token: string; response: string; response_status_code: number; status: 'FAILED' | 'PENDING' | 'SENDING' | 'SUCCESS'; url: string; }`\n  A subscription to specific event types.\n\n  - `token: string`\n  - `created: string`\n  - `event_subscription_token: string`\n  - `event_token: string`\n  - `response: string`\n  - `response_status_code: number`\n  - `status: 'FAILED' | 'PENDING' | 'SENDING' | 'SUCCESS'`\n  - `url: string`\n\n### Example\n\n```typescript\nimport Lithic from 'lithic';\n\nconst client = new Lithic();\n\n// Automatically fetches more pages as needed.\nfor await (const messageAttempt of client.events.subscriptions.listAttempts('event_subscription_token')) {\n  console.log(messageAttempt);\n}\n```",
  },
  {
    name: 'recover',
    endpoint: '/v1/event_subscriptions/{event_subscription_token}/recover',
    httpMethod: 'post',
    summary: 'Resend failed messages',
    description: 'Resend all failed messages since a given time.',
    stainlessPath: '(resource) events.subscriptions > (method) recover',
    qualified: 'client.events.subscriptions.recover',
    params: ['event_subscription_token: string;', 'begin?: string;', 'end?: string;'],
    markdown:
      "## recover\n\n`client.events.subscriptions.recover(event_subscription_token: string, begin?: string, end?: string): void`\n\n**post** `/v1/event_subscriptions/{event_subscription_token}/recover`\n\nResend all failed messages since a given time.\n\n### Parameters\n\n- `event_subscription_token: string`\n\n- `begin?: string`\n  Date string in RFC 3339 format. Only entries created after the specified time will be included. UTC time zone.\n\n- `end?: string`\n  Date string in RFC 3339 format. Only entries created before the specified time will be included. UTC time zone.\n\n### Example\n\n```typescript\nimport Lithic from 'lithic';\n\nconst client = new Lithic();\n\nawait client.events.subscriptions.recover('event_subscription_token')\n```",
  },
  {
    name: 'replay_missing',
    endpoint: '/v1/event_subscriptions/{event_subscription_token}/replay_missing',
    httpMethod: 'post',
    summary: 'Replay missing messages',
    description:
      'Replays messages to the endpoint. Only messages that were created after `begin` will be sent. Messages that were previously sent to the endpoint are not resent.\nMessage will be retried if endpoint responds with a non-2xx status code. See [Retry Schedule](https://docs.lithic.com/docs/events-api#retry-schedule) for details.\n',
    stainlessPath: '(resource) events.subscriptions > (method) replay_missing',
    qualified: 'client.events.subscriptions.replayMissing',
    params: ['event_subscription_token: string;', 'begin?: string;', 'end?: string;'],
    markdown:
      "## replay_missing\n\n`client.events.subscriptions.replayMissing(event_subscription_token: string, begin?: string, end?: string): void`\n\n**post** `/v1/event_subscriptions/{event_subscription_token}/replay_missing`\n\nReplays messages to the endpoint. Only messages that were created after `begin` will be sent. Messages that were previously sent to the endpoint are not resent.\nMessage will be retried if endpoint responds with a non-2xx status code. See [Retry Schedule](https://docs.lithic.com/docs/events-api#retry-schedule) for details.\n\n\n### Parameters\n\n- `event_subscription_token: string`\n\n- `begin?: string`\n  Date string in RFC 3339 format. Only entries created after the specified time will be included. UTC time zone.\n\n- `end?: string`\n  Date string in RFC 3339 format. Only entries created before the specified time will be included. UTC time zone.\n\n### Example\n\n```typescript\nimport Lithic from 'lithic';\n\nconst client = new Lithic();\n\nawait client.events.subscriptions.replayMissing('event_subscription_token')\n```",
  },
  {
    name: 'retrieve_secret',
    endpoint: '/v1/event_subscriptions/{event_subscription_token}/secret',
    httpMethod: 'get',
    summary: 'Get event subscription secret',
    description: 'Get the secret for an event subscription.',
    stainlessPath: '(resource) events.subscriptions > (method) retrieve_secret',
    qualified: 'client.events.subscriptions.retrieveSecret',
    params: ['event_subscription_token: string;'],
    response: '{ secret?: string; }',
    markdown:
      "## retrieve_secret\n\n`client.events.subscriptions.retrieveSecret(event_subscription_token: string): { secret?: string; }`\n\n**get** `/v1/event_subscriptions/{event_subscription_token}/secret`\n\nGet the secret for an event subscription.\n\n### Parameters\n\n- `event_subscription_token: string`\n\n### Returns\n\n- `{ secret?: string; }`\n\n  - `secret?: string`\n\n### Example\n\n```typescript\nimport Lithic from 'lithic';\n\nconst client = new Lithic();\n\nconst response = await client.events.subscriptions.retrieveSecret('event_subscription_token');\n\nconsole.log(response);\n```",
  },
  {
    name: 'rotate_secret',
    endpoint: '/v1/event_subscriptions/{event_subscription_token}/secret/rotate',
    httpMethod: 'post',
    summary: 'Rotate event subscription secret',
    description:
      'Rotate the secret for an event subscription. The previous secret will be valid for the next 24 hours.\n',
    stainlessPath: '(resource) events.subscriptions > (method) rotate_secret',
    qualified: 'client.events.subscriptions.rotateSecret',
    params: ['event_subscription_token: string;'],
    markdown:
      "## rotate_secret\n\n`client.events.subscriptions.rotateSecret(event_subscription_token: string): void`\n\n**post** `/v1/event_subscriptions/{event_subscription_token}/secret/rotate`\n\nRotate the secret for an event subscription. The previous secret will be valid for the next 24 hours.\n\n\n### Parameters\n\n- `event_subscription_token: string`\n\n### Example\n\n```typescript\nimport Lithic from 'lithic';\n\nconst client = new Lithic();\n\nawait client.events.subscriptions.rotateSecret('event_subscription_token')\n```",
  },
  {
    name: 'send_simulated_example',
    endpoint: '/v1/simulate/event_subscriptions/{event_subscription_token}/send_example',
    httpMethod: 'post',
    summary: 'Send event type example message',
    description: 'Send an example message for event.',
    stainlessPath: '(resource) events.subscriptions > (method) send_simulated_example',
    qualified: 'client.events.subscriptions.sendSimulatedExample',
    params: ['event_subscription_token: string;', 'event_type?: string;'],
    markdown:
      "## send_simulated_example\n\n`client.events.subscriptions.sendSimulatedExample(event_subscription_token: string, event_type?: string): void`\n\n**post** `/v1/simulate/event_subscriptions/{event_subscription_token}/send_example`\n\nSend an example message for event.\n\n### Parameters\n\n- `event_subscription_token: string`\n\n- `event_type?: string`\n  Event type to send example message for.\n\n### Example\n\n```typescript\nimport Lithic from 'lithic';\n\nconst client = new Lithic();\n\nawait client.events.subscriptions.sendSimulatedExample('event_subscription_token')\n```",
  },
  {
    name: 'resend',
    endpoint: '/v1/events/{event_token}/event_subscriptions/{event_subscription_token}/resend',
    httpMethod: 'post',
    summary: 'Resend event',
    description: 'Resend an event to an event subscription.',
    stainlessPath: '(resource) events.event_subscriptions > (method) resend',
    qualified: 'client.events.eventSubscriptions.resend',
    params: ['event_token: string;', 'event_subscription_token: string;'],
    markdown:
      "## resend\n\n`client.events.eventSubscriptions.resend(event_token: string, event_subscription_token: string): void`\n\n**post** `/v1/events/{event_token}/event_subscriptions/{event_subscription_token}/resend`\n\nResend an event to an event subscription.\n\n### Parameters\n\n- `event_token: string`\n\n- `event_subscription_token: string`\n\n### Example\n\n```typescript\nimport Lithic from 'lithic';\n\nconst client = new Lithic();\n\nawait client.events.eventSubscriptions.resend('event_subscription_token', { event_token: 'event_token' })\n```",
  },
  {
    name: 'create',
    endpoint: '/v1/transfer',
    httpMethod: 'post',
    summary: 'Transfer funds within Lithic',
    description: 'Transfer funds between two financial accounts or between a financial account and card',
    stainlessPath: '(resource) transfers > (method) create',
    qualified: 'client.transfers.create',
    params: ['amount: number;', 'from: string;', 'to: string;', 'token?: string;', 'memo?: string;'],
    response:
      "{ token?: string; category?: 'TRANSFER'; created?: string; currency?: string; descriptor?: string; events?: { token?: string; amount?: number; created?: string; result?: 'APPROVED' | 'DECLINED'; type?: string; }[]; from_balance?: { available_amount: number; created: string; currency: string; financial_account_token: string; financial_account_type: 'ISSUING' | 'OPERATING' | 'RESERVE' | 'SECURITY'; last_transaction_event_token: string; last_transaction_token: string; pending_amount: number; total_amount: number; updated: string; }[]; pending_amount?: number; result?: 'APPROVED' | 'DECLINED'; settled_amount?: number; status?: 'DECLINED' | 'EXPIRED' | 'PENDING' | 'SETTLED' | 'VOIDED'; to_balance?: { available_amount: number; created: string; currency: string; financial_account_token: string; financial_account_type: 'ISSUING' | 'OPERATING' | 'RESERVE' | 'SECURITY'; last_transaction_event_token: string; last_transaction_token: string; pending_amount: number; total_amount: number; updated: string; }[]; updated?: string; }",
    markdown:
      "## create\n\n`client.transfers.create(amount: number, from: string, to: string, token?: string, memo?: string): { token?: string; category?: 'TRANSFER'; created?: string; currency?: string; descriptor?: string; events?: financial_event[]; from_balance?: balance[]; pending_amount?: number; result?: 'APPROVED' | 'DECLINED'; settled_amount?: number; status?: 'DECLINED' | 'EXPIRED' | 'PENDING' | 'SETTLED' | 'VOIDED'; to_balance?: balance[]; updated?: string; }`\n\n**post** `/v1/transfer`\n\nTransfer funds between two financial accounts or between a financial account and card\n\n### Parameters\n\n- `amount: number`\n  Amount to be transferred in the currency’s smallest unit (e.g., cents for USD). This should always be a positive value.\n\n- `from: string`\n  Globally unique identifier for the financial account or card that will send the funds. Accepted type dependent on the program's use case.\n\n- `to: string`\n  Globally unique identifier for the financial account or card that will receive the funds. Accepted type dependent on the program's use case.\n\n- `token?: string`\n  Customer-provided token that will serve as an idempotency token. This token will become the transaction token.\n\n- `memo?: string`\n  Optional descriptor for the transfer.\n\n### Returns\n\n- `{ token?: string; category?: 'TRANSFER'; created?: string; currency?: string; descriptor?: string; events?: { token?: string; amount?: number; created?: string; result?: 'APPROVED' | 'DECLINED'; type?: string; }[]; from_balance?: { available_amount: number; created: string; currency: string; financial_account_token: string; financial_account_type: 'ISSUING' | 'OPERATING' | 'RESERVE' | 'SECURITY'; last_transaction_event_token: string; last_transaction_token: string; pending_amount: number; total_amount: number; updated: string; }[]; pending_amount?: number; result?: 'APPROVED' | 'DECLINED'; settled_amount?: number; status?: 'DECLINED' | 'EXPIRED' | 'PENDING' | 'SETTLED' | 'VOIDED'; to_balance?: { available_amount: number; created: string; currency: string; financial_account_token: string; financial_account_type: 'ISSUING' | 'OPERATING' | 'RESERVE' | 'SECURITY'; last_transaction_event_token: string; last_transaction_token: string; pending_amount: number; total_amount: number; updated: string; }[]; updated?: string; }`\n\n  - `token?: string`\n  - `category?: 'TRANSFER'`\n  - `created?: string`\n  - `currency?: string`\n  - `descriptor?: string`\n  - `events?: { token?: string; amount?: number; created?: string; result?: 'APPROVED' | 'DECLINED'; type?: string; }[]`\n  - `from_balance?: { available_amount: number; created: string; currency: string; financial_account_token: string; financial_account_type: 'ISSUING' | 'OPERATING' | 'RESERVE' | 'SECURITY'; last_transaction_event_token: string; last_transaction_token: string; pending_amount: number; total_amount: number; updated: string; }[]`\n  - `pending_amount?: number`\n  - `result?: 'APPROVED' | 'DECLINED'`\n  - `settled_amount?: number`\n  - `status?: 'DECLINED' | 'EXPIRED' | 'PENDING' | 'SETTLED' | 'VOIDED'`\n  - `to_balance?: { available_amount: number; created: string; currency: string; financial_account_token: string; financial_account_type: 'ISSUING' | 'OPERATING' | 'RESERVE' | 'SECURITY'; last_transaction_event_token: string; last_transaction_token: string; pending_amount: number; total_amount: number; updated: string; }[]`\n  - `updated?: string`\n\n### Example\n\n```typescript\nimport Lithic from 'lithic';\n\nconst client = new Lithic();\n\nconst transfer = await client.transfers.create({\n  amount: 0,\n  from: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',\n  to: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',\n});\n\nconsole.log(transfer);\n```",
  },
  {
    name: 'create',
    endpoint: '/v1/financial_accounts',
    httpMethod: 'post',
    summary: 'Create financial account',
    description: 'Create a new financial account',
    stainlessPath: '(resource) financial_accounts > (method) create',
    qualified: 'client.financialAccounts.create',
    params: [
      'nickname: string;',
      "type: 'OPERATING';",
      'account_token?: string;',
      'is_for_benefit_of?: boolean;',
      'Idempotency-Key?: string;',
    ],
    response:
      "{ token: string; account_token: string; created: string; credit_configuration: { auto_collection_configuration: { auto_collection_enabled: boolean; }; credit_limit: number; credit_product_token: string; external_bank_account_token: string; tier: string; }; is_for_benefit_of: boolean; nickname: string; status: 'OPEN' | 'CLOSED' | 'SUSPENDED' | 'PENDING'; substatus: string; type: string; updated: string; user_defined_status: string; account_number?: string; routing_number?: string; }",
    markdown:
      "## create\n\n`client.financialAccounts.create(nickname: string, type: 'OPERATING', account_token?: string, is_for_benefit_of?: boolean, Idempotency-Key?: string): { token: string; account_token: string; created: string; credit_configuration: object; is_for_benefit_of: boolean; nickname: string; status: 'OPEN' | 'CLOSED' | 'SUSPENDED' | 'PENDING'; substatus: string; type: string; updated: string; user_defined_status: string; account_number?: string; routing_number?: string; }`\n\n**post** `/v1/financial_accounts`\n\nCreate a new financial account\n\n### Parameters\n\n- `nickname: string`\n\n- `type: 'OPERATING'`\n\n- `account_token?: string`\n\n- `is_for_benefit_of?: boolean`\n\n- `Idempotency-Key?: string`\n\n### Returns\n\n- `{ token: string; account_token: string; created: string; credit_configuration: { auto_collection_configuration: { auto_collection_enabled: boolean; }; credit_limit: number; credit_product_token: string; external_bank_account_token: string; tier: string; }; is_for_benefit_of: boolean; nickname: string; status: 'OPEN' | 'CLOSED' | 'SUSPENDED' | 'PENDING'; substatus: string; type: string; updated: string; user_defined_status: string; account_number?: string; routing_number?: string; }`\n\n  - `token: string`\n  - `account_token: string`\n  - `created: string`\n  - `credit_configuration: { auto_collection_configuration: { auto_collection_enabled: boolean; }; credit_limit: number; credit_product_token: string; external_bank_account_token: string; tier: string; }`\n  - `is_for_benefit_of: boolean`\n  - `nickname: string`\n  - `status: 'OPEN' | 'CLOSED' | 'SUSPENDED' | 'PENDING'`\n  - `substatus: string`\n  - `type: string`\n  - `updated: string`\n  - `user_defined_status: string`\n  - `account_number?: string`\n  - `routing_number?: string`\n\n### Example\n\n```typescript\nimport Lithic from 'lithic';\n\nconst client = new Lithic();\n\nconst financialAccount = await client.financialAccounts.create({ nickname: 'nickname', type: 'OPERATING' });\n\nconsole.log(financialAccount);\n```",
  },
  {
    name: 'retrieve',
    endpoint: '/v1/financial_accounts/{financial_account_token}',
    httpMethod: 'get',
    summary: 'Get financial account',
    description: 'Get a financial account',
    stainlessPath: '(resource) financial_accounts > (method) retrieve',
    qualified: 'client.financialAccounts.retrieve',
    params: ['financial_account_token: string;'],
    response:
      "{ token: string; account_token: string; created: string; credit_configuration: { auto_collection_configuration: { auto_collection_enabled: boolean; }; credit_limit: number; credit_product_token: string; external_bank_account_token: string; tier: string; }; is_for_benefit_of: boolean; nickname: string; status: 'OPEN' | 'CLOSED' | 'SUSPENDED' | 'PENDING'; substatus: string; type: string; updated: string; user_defined_status: string; account_number?: string; routing_number?: string; }",
    markdown:
      "## retrieve\n\n`client.financialAccounts.retrieve(financial_account_token: string): { token: string; account_token: string; created: string; credit_configuration: object; is_for_benefit_of: boolean; nickname: string; status: 'OPEN' | 'CLOSED' | 'SUSPENDED' | 'PENDING'; substatus: string; type: string; updated: string; user_defined_status: string; account_number?: string; routing_number?: string; }`\n\n**get** `/v1/financial_accounts/{financial_account_token}`\n\nGet a financial account\n\n### Parameters\n\n- `financial_account_token: string`\n\n### Returns\n\n- `{ token: string; account_token: string; created: string; credit_configuration: { auto_collection_configuration: { auto_collection_enabled: boolean; }; credit_limit: number; credit_product_token: string; external_bank_account_token: string; tier: string; }; is_for_benefit_of: boolean; nickname: string; status: 'OPEN' | 'CLOSED' | 'SUSPENDED' | 'PENDING'; substatus: string; type: string; updated: string; user_defined_status: string; account_number?: string; routing_number?: string; }`\n\n  - `token: string`\n  - `account_token: string`\n  - `created: string`\n  - `credit_configuration: { auto_collection_configuration: { auto_collection_enabled: boolean; }; credit_limit: number; credit_product_token: string; external_bank_account_token: string; tier: string; }`\n  - `is_for_benefit_of: boolean`\n  - `nickname: string`\n  - `status: 'OPEN' | 'CLOSED' | 'SUSPENDED' | 'PENDING'`\n  - `substatus: string`\n  - `type: string`\n  - `updated: string`\n  - `user_defined_status: string`\n  - `account_number?: string`\n  - `routing_number?: string`\n\n### Example\n\n```typescript\nimport Lithic from 'lithic';\n\nconst client = new Lithic();\n\nconst financialAccount = await client.financialAccounts.retrieve('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e');\n\nconsole.log(financialAccount);\n```",
  },
  {
    name: 'update',
    endpoint: '/v1/financial_accounts/{financial_account_token}',
    httpMethod: 'patch',
    summary: 'Update financial account',
    description: 'Update a financial account',
    stainlessPath: '(resource) financial_accounts > (method) update',
    qualified: 'client.financialAccounts.update',
    params: ['financial_account_token: string;', 'nickname?: string;'],
    response:
      "{ token: string; account_token: string; created: string; credit_configuration: { auto_collection_configuration: { auto_collection_enabled: boolean; }; credit_limit: number; credit_product_token: string; external_bank_account_token: string; tier: string; }; is_for_benefit_of: boolean; nickname: string; status: 'OPEN' | 'CLOSED' | 'SUSPENDED' | 'PENDING'; substatus: string; type: string; updated: string; user_defined_status: string; account_number?: string; routing_number?: string; }",
    markdown:
      "## update\n\n`client.financialAccounts.update(financial_account_token: string, nickname?: string): { token: string; account_token: string; created: string; credit_configuration: object; is_for_benefit_of: boolean; nickname: string; status: 'OPEN' | 'CLOSED' | 'SUSPENDED' | 'PENDING'; substatus: string; type: string; updated: string; user_defined_status: string; account_number?: string; routing_number?: string; }`\n\n**patch** `/v1/financial_accounts/{financial_account_token}`\n\nUpdate a financial account\n\n### Parameters\n\n- `financial_account_token: string`\n\n- `nickname?: string`\n\n### Returns\n\n- `{ token: string; account_token: string; created: string; credit_configuration: { auto_collection_configuration: { auto_collection_enabled: boolean; }; credit_limit: number; credit_product_token: string; external_bank_account_token: string; tier: string; }; is_for_benefit_of: boolean; nickname: string; status: 'OPEN' | 'CLOSED' | 'SUSPENDED' | 'PENDING'; substatus: string; type: string; updated: string; user_defined_status: string; account_number?: string; routing_number?: string; }`\n\n  - `token: string`\n  - `account_token: string`\n  - `created: string`\n  - `credit_configuration: { auto_collection_configuration: { auto_collection_enabled: boolean; }; credit_limit: number; credit_product_token: string; external_bank_account_token: string; tier: string; }`\n  - `is_for_benefit_of: boolean`\n  - `nickname: string`\n  - `status: 'OPEN' | 'CLOSED' | 'SUSPENDED' | 'PENDING'`\n  - `substatus: string`\n  - `type: string`\n  - `updated: string`\n  - `user_defined_status: string`\n  - `account_number?: string`\n  - `routing_number?: string`\n\n### Example\n\n```typescript\nimport Lithic from 'lithic';\n\nconst client = new Lithic();\n\nconst financialAccount = await client.financialAccounts.update('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e');\n\nconsole.log(financialAccount);\n```",
  },
  {
    name: 'list',
    endpoint: '/v1/financial_accounts',
    httpMethod: 'get',
    summary: 'List financial accounts',
    description: 'Retrieve information on your financial accounts including routing and account number.',
    stainlessPath: '(resource) financial_accounts > (method) list',
    qualified: 'client.financialAccounts.list',
    params: [
      'account_token?: string;',
      'business_account_token?: string;',
      "type?: 'ISSUING' | 'OPERATING' | 'RESERVE' | 'SECURITY' | 'EARLY_DIRECT_DEPOSIT_FLOAT';",
    ],
    response:
      "{ token: string; account_token: string; created: string; credit_configuration: { auto_collection_configuration: { auto_collection_enabled: boolean; }; credit_limit: number; credit_product_token: string; external_bank_account_token: string; tier: string; }; is_for_benefit_of: boolean; nickname: string; status: 'OPEN' | 'CLOSED' | 'SUSPENDED' | 'PENDING'; substatus: string; type: string; updated: string; user_defined_status: string; account_number?: string; routing_number?: string; }",
    markdown:
      "## list\n\n`client.financialAccounts.list(account_token?: string, business_account_token?: string, type?: 'ISSUING' | 'OPERATING' | 'RESERVE' | 'SECURITY' | 'EARLY_DIRECT_DEPOSIT_FLOAT'): { token: string; account_token: string; created: string; credit_configuration: object; is_for_benefit_of: boolean; nickname: string; status: 'OPEN' | 'CLOSED' | 'SUSPENDED' | 'PENDING'; substatus: string; type: string; updated: string; user_defined_status: string; account_number?: string; routing_number?: string; }`\n\n**get** `/v1/financial_accounts`\n\nRetrieve information on your financial accounts including routing and account number.\n\n### Parameters\n\n- `account_token?: string`\n  List financial accounts for a given account_token or business_account_token\n\n- `business_account_token?: string`\n  List financial accounts for a given business_account_token\n\n- `type?: 'ISSUING' | 'OPERATING' | 'RESERVE' | 'SECURITY' | 'EARLY_DIRECT_DEPOSIT_FLOAT'`\n  List financial accounts of a given type\n\n### Returns\n\n- `{ token: string; account_token: string; created: string; credit_configuration: { auto_collection_configuration: { auto_collection_enabled: boolean; }; credit_limit: number; credit_product_token: string; external_bank_account_token: string; tier: string; }; is_for_benefit_of: boolean; nickname: string; status: 'OPEN' | 'CLOSED' | 'SUSPENDED' | 'PENDING'; substatus: string; type: string; updated: string; user_defined_status: string; account_number?: string; routing_number?: string; }`\n\n  - `token: string`\n  - `account_token: string`\n  - `created: string`\n  - `credit_configuration: { auto_collection_configuration: { auto_collection_enabled: boolean; }; credit_limit: number; credit_product_token: string; external_bank_account_token: string; tier: string; }`\n  - `is_for_benefit_of: boolean`\n  - `nickname: string`\n  - `status: 'OPEN' | 'CLOSED' | 'SUSPENDED' | 'PENDING'`\n  - `substatus: string`\n  - `type: string`\n  - `updated: string`\n  - `user_defined_status: string`\n  - `account_number?: string`\n  - `routing_number?: string`\n\n### Example\n\n```typescript\nimport Lithic from 'lithic';\n\nconst client = new Lithic();\n\n// Automatically fetches more pages as needed.\nfor await (const financialAccount of client.financialAccounts.list()) {\n  console.log(financialAccount);\n}\n```",
  },
  {
    name: 'register_account_number',
    endpoint: '/v1/financial_accounts/{financial_account_token}/register_account_number',
    httpMethod: 'post',
    summary: 'Register Account Number',
    description: 'Register account number',
    stainlessPath: '(resource) financial_accounts > (method) register_account_number',
    qualified: 'client.financialAccounts.registerAccountNumber',
    params: ['financial_account_token: string;', 'account_number: string;'],
    markdown:
      "## register_account_number\n\n`client.financialAccounts.registerAccountNumber(financial_account_token: string, account_number: string): void`\n\n**post** `/v1/financial_accounts/{financial_account_token}/register_account_number`\n\nRegister account number\n\n### Parameters\n\n- `financial_account_token: string`\n\n- `account_number: string`\n\n### Example\n\n```typescript\nimport Lithic from 'lithic';\n\nconst client = new Lithic();\n\nawait client.financialAccounts.registerAccountNumber('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', { account_number: 'account_number' })\n```",
  },
  {
    name: 'update_status',
    endpoint: '/v1/financial_accounts/{financial_account_token}/update_status',
    httpMethod: 'post',
    summary: 'Update financial account status',
    description: 'Update financial account status',
    stainlessPath: '(resource) financial_accounts > (method) update_status',
    qualified: 'client.financialAccounts.updateStatus',
    params: [
      'financial_account_token: string;',
      "status: 'OPEN' | 'CLOSED' | 'SUSPENDED' | 'PENDING';",
      'substatus: string;',
      'user_defined_status?: string;',
    ],
    response:
      "{ token: string; account_token: string; created: string; credit_configuration: { auto_collection_configuration: { auto_collection_enabled: boolean; }; credit_limit: number; credit_product_token: string; external_bank_account_token: string; tier: string; }; is_for_benefit_of: boolean; nickname: string; status: 'OPEN' | 'CLOSED' | 'SUSPENDED' | 'PENDING'; substatus: string; type: string; updated: string; user_defined_status: string; account_number?: string; routing_number?: string; }",
    markdown:
      "## update_status\n\n`client.financialAccounts.updateStatus(financial_account_token: string, status: 'OPEN' | 'CLOSED' | 'SUSPENDED' | 'PENDING', substatus: string, user_defined_status?: string): { token: string; account_token: string; created: string; credit_configuration: object; is_for_benefit_of: boolean; nickname: string; status: 'OPEN' | 'CLOSED' | 'SUSPENDED' | 'PENDING'; substatus: string; type: string; updated: string; user_defined_status: string; account_number?: string; routing_number?: string; }`\n\n**post** `/v1/financial_accounts/{financial_account_token}/update_status`\n\nUpdate financial account status\n\n### Parameters\n\n- `financial_account_token: string`\n\n- `status: 'OPEN' | 'CLOSED' | 'SUSPENDED' | 'PENDING'`\n  Status of the financial account\n\n- `substatus: string`\n  Substatus for the financial account\n\n- `user_defined_status?: string`\n  User-defined status for the financial account\n\n### Returns\n\n- `{ token: string; account_token: string; created: string; credit_configuration: { auto_collection_configuration: { auto_collection_enabled: boolean; }; credit_limit: number; credit_product_token: string; external_bank_account_token: string; tier: string; }; is_for_benefit_of: boolean; nickname: string; status: 'OPEN' | 'CLOSED' | 'SUSPENDED' | 'PENDING'; substatus: string; type: string; updated: string; user_defined_status: string; account_number?: string; routing_number?: string; }`\n\n  - `token: string`\n  - `account_token: string`\n  - `created: string`\n  - `credit_configuration: { auto_collection_configuration: { auto_collection_enabled: boolean; }; credit_limit: number; credit_product_token: string; external_bank_account_token: string; tier: string; }`\n  - `is_for_benefit_of: boolean`\n  - `nickname: string`\n  - `status: 'OPEN' | 'CLOSED' | 'SUSPENDED' | 'PENDING'`\n  - `substatus: string`\n  - `type: string`\n  - `updated: string`\n  - `user_defined_status: string`\n  - `account_number?: string`\n  - `routing_number?: string`\n\n### Example\n\n```typescript\nimport Lithic from 'lithic';\n\nconst client = new Lithic();\n\nconst financialAccount = await client.financialAccounts.updateStatus('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', { status: 'OPEN', substatus: 'CHARGED_OFF_FRAUD' });\n\nconsole.log(financialAccount);\n```",
  },
  {
    name: 'list',
    endpoint: '/v1/financial_accounts/{financial_account_token}/balances',
    httpMethod: 'get',
    summary: 'Get balances',
    description: 'Get the balances for a given financial account.',
    stainlessPath: '(resource) financial_accounts.balances > (method) list',
    qualified: 'client.financialAccounts.balances.list',
    params: [
      'financial_account_token: string;',
      'balance_date?: string;',
      'last_transaction_event_token?: string;',
    ],
    response:
      "{ token: string; available_amount: number; created: string; currency: string; last_transaction_event_token: string; last_transaction_token: string; pending_amount: number; total_amount: number; type: 'ISSUING' | 'OPERATING' | 'RESERVE' | 'SECURITY'; updated: string; }",
    markdown:
      "## list\n\n`client.financialAccounts.balances.list(financial_account_token: string, balance_date?: string, last_transaction_event_token?: string): { token: string; available_amount: number; created: string; currency: string; last_transaction_event_token: string; last_transaction_token: string; pending_amount: number; total_amount: number; type: 'ISSUING' | 'OPERATING' | 'RESERVE' | 'SECURITY'; updated: string; }`\n\n**get** `/v1/financial_accounts/{financial_account_token}/balances`\n\nGet the balances for a given financial account.\n\n### Parameters\n\n- `financial_account_token: string`\n\n- `balance_date?: string`\n  UTC date of the balance to retrieve. Defaults to latest available balance\n\n- `last_transaction_event_token?: string`\n  Balance after a given financial event occured.\nFor example, passing the event_token of a $5 CARD_CLEARING financial event will return a balance decreased by $5\n\n\n### Returns\n\n- `{ token: string; available_amount: number; created: string; currency: string; last_transaction_event_token: string; last_transaction_token: string; pending_amount: number; total_amount: number; type: 'ISSUING' | 'OPERATING' | 'RESERVE' | 'SECURITY'; updated: string; }`\n  Balance of a Financial Account\n\n  - `token: string`\n  - `available_amount: number`\n  - `created: string`\n  - `currency: string`\n  - `last_transaction_event_token: string`\n  - `last_transaction_token: string`\n  - `pending_amount: number`\n  - `total_amount: number`\n  - `type: 'ISSUING' | 'OPERATING' | 'RESERVE' | 'SECURITY'`\n  - `updated: string`\n\n### Example\n\n```typescript\nimport Lithic from 'lithic';\n\nconst client = new Lithic();\n\n// Automatically fetches more pages as needed.\nfor await (const financialAccountBalance of client.financialAccounts.balances.list('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e')) {\n  console.log(financialAccountBalance);\n}\n```",
  },
  {
    name: 'retrieve',
    endpoint:
      '/v1/financial_accounts/{financial_account_token}/financial_transactions/{financial_transaction_token}',
    httpMethod: 'get',
    summary: 'Get financial transaction',
    description: 'Get the financial transaction for the provided token.',
    stainlessPath: '(resource) financial_accounts.financial_transactions > (method) retrieve',
    qualified: 'client.financialAccounts.financialTransactions.retrieve',
    params: ['financial_account_token: string;', 'financial_transaction_token: string;'],
    response:
      "{ token: string; category: 'ACH' | 'CARD' | 'INTERNAL' | 'TRANSFER'; created: string; currency: string; descriptor: string; events: { token?: string; amount?: number; created?: string; result?: 'APPROVED' | 'DECLINED'; type?: string; }[]; pending_amount: number; result: 'APPROVED' | 'DECLINED'; settled_amount: number; status: 'DECLINED' | 'EXPIRED' | 'PENDING' | 'RETURNED' | 'SETTLED' | 'VOIDED'; updated: string; }",
    markdown:
      "## retrieve\n\n`client.financialAccounts.financialTransactions.retrieve(financial_account_token: string, financial_transaction_token: string): { token: string; category: 'ACH' | 'CARD' | 'INTERNAL' | 'TRANSFER'; created: string; currency: string; descriptor: string; events: financial_event[]; pending_amount: number; result: 'APPROVED' | 'DECLINED'; settled_amount: number; status: 'DECLINED' | 'EXPIRED' | 'PENDING' | 'RETURNED' | 'SETTLED' | 'VOIDED'; updated: string; }`\n\n**get** `/v1/financial_accounts/{financial_account_token}/financial_transactions/{financial_transaction_token}`\n\nGet the financial transaction for the provided token.\n\n### Parameters\n\n- `financial_account_token: string`\n\n- `financial_transaction_token: string`\n\n### Returns\n\n- `{ token: string; category: 'ACH' | 'CARD' | 'INTERNAL' | 'TRANSFER'; created: string; currency: string; descriptor: string; events: { token?: string; amount?: number; created?: string; result?: 'APPROVED' | 'DECLINED'; type?: string; }[]; pending_amount: number; result: 'APPROVED' | 'DECLINED'; settled_amount: number; status: 'DECLINED' | 'EXPIRED' | 'PENDING' | 'RETURNED' | 'SETTLED' | 'VOIDED'; updated: string; }`\n\n  - `token: string`\n  - `category: 'ACH' | 'CARD' | 'INTERNAL' | 'TRANSFER'`\n  - `created: string`\n  - `currency: string`\n  - `descriptor: string`\n  - `events: { token?: string; amount?: number; created?: string; result?: 'APPROVED' | 'DECLINED'; type?: string; }[]`\n  - `pending_amount: number`\n  - `result: 'APPROVED' | 'DECLINED'`\n  - `settled_amount: number`\n  - `status: 'DECLINED' | 'EXPIRED' | 'PENDING' | 'RETURNED' | 'SETTLED' | 'VOIDED'`\n  - `updated: string`\n\n### Example\n\n```typescript\nimport Lithic from 'lithic';\n\nconst client = new Lithic();\n\nconst financialTransaction = await client.financialAccounts.financialTransactions.retrieve('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', { financial_account_token: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e' });\n\nconsole.log(financialTransaction);\n```",
  },
  {
    name: 'list',
    endpoint: '/v1/financial_accounts/{financial_account_token}/financial_transactions',
    httpMethod: 'get',
    summary: 'List financial transactions',
    description: 'List the financial transactions for a given financial account.',
    stainlessPath: '(resource) financial_accounts.financial_transactions > (method) list',
    qualified: 'client.financialAccounts.financialTransactions.list',
    params: [
      'financial_account_token: string;',
      'begin?: string;',
      "category?: 'ACH' | 'CARD' | 'INTERNAL' | 'TRANSFER';",
      'end?: string;',
      'ending_before?: string;',
      "result?: 'APPROVED' | 'DECLINED';",
      'starting_after?: string;',
      "status?: 'DECLINED' | 'EXPIRED' | 'PENDING' | 'RETURNED' | 'SETTLED' | 'VOIDED';",
    ],
    response:
      "{ token: string; category: 'ACH' | 'CARD' | 'INTERNAL' | 'TRANSFER'; created: string; currency: string; descriptor: string; events: { token?: string; amount?: number; created?: string; result?: 'APPROVED' | 'DECLINED'; type?: string; }[]; pending_amount: number; result: 'APPROVED' | 'DECLINED'; settled_amount: number; status: 'DECLINED' | 'EXPIRED' | 'PENDING' | 'RETURNED' | 'SETTLED' | 'VOIDED'; updated: string; }",
    markdown:
      "## list\n\n`client.financialAccounts.financialTransactions.list(financial_account_token: string, begin?: string, category?: 'ACH' | 'CARD' | 'INTERNAL' | 'TRANSFER', end?: string, ending_before?: string, result?: 'APPROVED' | 'DECLINED', starting_after?: string, status?: 'DECLINED' | 'EXPIRED' | 'PENDING' | 'RETURNED' | 'SETTLED' | 'VOIDED'): { token: string; category: 'ACH' | 'CARD' | 'INTERNAL' | 'TRANSFER'; created: string; currency: string; descriptor: string; events: financial_event[]; pending_amount: number; result: 'APPROVED' | 'DECLINED'; settled_amount: number; status: 'DECLINED' | 'EXPIRED' | 'PENDING' | 'RETURNED' | 'SETTLED' | 'VOIDED'; updated: string; }`\n\n**get** `/v1/financial_accounts/{financial_account_token}/financial_transactions`\n\nList the financial transactions for a given financial account.\n\n### Parameters\n\n- `financial_account_token: string`\n\n- `begin?: string`\n  Date string in RFC 3339 format. Only entries created after the specified time will be included. UTC time zone.\n\n- `category?: 'ACH' | 'CARD' | 'INTERNAL' | 'TRANSFER'`\n  Financial Transaction category to be returned.\n\n- `end?: string`\n  Date string in RFC 3339 format. Only entries created before the specified time will be included. UTC time zone.\n\n- `ending_before?: string`\n  A cursor representing an item's token before which a page of results should end. Used to retrieve the previous page of results before this item.\n\n- `result?: 'APPROVED' | 'DECLINED'`\n  Financial Transaction result to be returned.\n\n- `starting_after?: string`\n  A cursor representing an item's token after which a page of results should begin. Used to retrieve the next page of results after this item.\n\n- `status?: 'DECLINED' | 'EXPIRED' | 'PENDING' | 'RETURNED' | 'SETTLED' | 'VOIDED'`\n  Financial Transaction status to be returned.\n\n### Returns\n\n- `{ token: string; category: 'ACH' | 'CARD' | 'INTERNAL' | 'TRANSFER'; created: string; currency: string; descriptor: string; events: { token?: string; amount?: number; created?: string; result?: 'APPROVED' | 'DECLINED'; type?: string; }[]; pending_amount: number; result: 'APPROVED' | 'DECLINED'; settled_amount: number; status: 'DECLINED' | 'EXPIRED' | 'PENDING' | 'RETURNED' | 'SETTLED' | 'VOIDED'; updated: string; }`\n\n  - `token: string`\n  - `category: 'ACH' | 'CARD' | 'INTERNAL' | 'TRANSFER'`\n  - `created: string`\n  - `currency: string`\n  - `descriptor: string`\n  - `events: { token?: string; amount?: number; created?: string; result?: 'APPROVED' | 'DECLINED'; type?: string; }[]`\n  - `pending_amount: number`\n  - `result: 'APPROVED' | 'DECLINED'`\n  - `settled_amount: number`\n  - `status: 'DECLINED' | 'EXPIRED' | 'PENDING' | 'RETURNED' | 'SETTLED' | 'VOIDED'`\n  - `updated: string`\n\n### Example\n\n```typescript\nimport Lithic from 'lithic';\n\nconst client = new Lithic();\n\n// Automatically fetches more pages as needed.\nfor await (const financialTransaction of client.financialAccounts.financialTransactions.list('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e')) {\n  console.log(financialTransaction);\n}\n```",
  },
  {
    name: 'retrieve',
    endpoint: '/v1/financial_accounts/{financial_account_token}/credit_configuration',
    httpMethod: 'get',
    summary: 'Get account credit configuration',
    description: "Get an Account's credit configuration",
    stainlessPath: '(resource) financial_accounts.credit_configuration > (method) retrieve',
    qualified: 'client.financialAccounts.creditConfiguration.retrieve',
    params: ['financial_account_token: string;'],
    response:
      '{ account_token: string; auto_collection_configuration: { auto_collection_enabled: boolean; }; credit_limit: number; credit_product_token: string; external_bank_account_token: string; tier: string; }',
    markdown:
      "## retrieve\n\n`client.financialAccounts.creditConfiguration.retrieve(financial_account_token: string): { account_token: string; auto_collection_configuration: object; credit_limit: number; credit_product_token: string; external_bank_account_token: string; tier: string; }`\n\n**get** `/v1/financial_accounts/{financial_account_token}/credit_configuration`\n\nGet an Account's credit configuration\n\n### Parameters\n\n- `financial_account_token: string`\n\n### Returns\n\n- `{ account_token: string; auto_collection_configuration: { auto_collection_enabled: boolean; }; credit_limit: number; credit_product_token: string; external_bank_account_token: string; tier: string; }`\n\n  - `account_token: string`\n  - `auto_collection_configuration: { auto_collection_enabled: boolean; }`\n  - `credit_limit: number`\n  - `credit_product_token: string`\n  - `external_bank_account_token: string`\n  - `tier: string`\n\n### Example\n\n```typescript\nimport Lithic from 'lithic';\n\nconst client = new Lithic();\n\nconst financialAccountCreditConfig = await client.financialAccounts.creditConfiguration.retrieve('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e');\n\nconsole.log(financialAccountCreditConfig);\n```",
  },
  {
    name: 'update',
    endpoint: '/v1/financial_accounts/{financial_account_token}/credit_configuration',
    httpMethod: 'patch',
    summary: 'Update account credit configuration',
    description: "Update an account's credit configuration",
    stainlessPath: '(resource) financial_accounts.credit_configuration > (method) update',
    qualified: 'client.financialAccounts.creditConfiguration.update',
    params: [
      'financial_account_token: string;',
      'auto_collection_configuration?: { auto_collection_enabled?: boolean; };',
      'credit_limit?: number;',
      'credit_product_token?: string;',
      'external_bank_account_token?: string;',
      'tier?: string;',
    ],
    response:
      '{ account_token: string; auto_collection_configuration: { auto_collection_enabled: boolean; }; credit_limit: number; credit_product_token: string; external_bank_account_token: string; tier: string; }',
    markdown:
      "## update\n\n`client.financialAccounts.creditConfiguration.update(financial_account_token: string, auto_collection_configuration?: { auto_collection_enabled?: boolean; }, credit_limit?: number, credit_product_token?: string, external_bank_account_token?: string, tier?: string): { account_token: string; auto_collection_configuration: object; credit_limit: number; credit_product_token: string; external_bank_account_token: string; tier: string; }`\n\n**patch** `/v1/financial_accounts/{financial_account_token}/credit_configuration`\n\nUpdate an account's credit configuration\n\n### Parameters\n\n- `financial_account_token: string`\n\n- `auto_collection_configuration?: { auto_collection_enabled?: boolean; }`\n  - `auto_collection_enabled?: boolean`\n    If auto collection is enabled for this account\n\n- `credit_limit?: number`\n\n- `credit_product_token?: string`\n  Globally unique identifier for the credit product\n\n- `external_bank_account_token?: string`\n\n- `tier?: string`\n  Tier to assign to a financial account\n\n### Returns\n\n- `{ account_token: string; auto_collection_configuration: { auto_collection_enabled: boolean; }; credit_limit: number; credit_product_token: string; external_bank_account_token: string; tier: string; }`\n\n  - `account_token: string`\n  - `auto_collection_configuration: { auto_collection_enabled: boolean; }`\n  - `credit_limit: number`\n  - `credit_product_token: string`\n  - `external_bank_account_token: string`\n  - `tier: string`\n\n### Example\n\n```typescript\nimport Lithic from 'lithic';\n\nconst client = new Lithic();\n\nconst financialAccountCreditConfig = await client.financialAccounts.creditConfiguration.update('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e');\n\nconsole.log(financialAccountCreditConfig);\n```",
  },
  {
    name: 'retrieve',
    endpoint: '/v1/financial_accounts/{financial_account_token}/statements/{statement_token}',
    httpMethod: 'get',
    summary: 'Get statement by token',
    description: 'Get a specific statement for a given financial account.',
    stainlessPath: '(resource) financial_accounts.statements > (method) retrieve',
    qualified: 'client.financialAccounts.statements.retrieve',
    params: ['financial_account_token: string;', 'statement_token: string;'],
    response:
      "{ token: string; account_standing: object; amount_due: object; available_credit: number; created: string; credit_limit: number; credit_product_token: string; days_in_billing_cycle: number; ending_balance: number; financial_account_token: string; payment_due_date: string; period_totals: statement_totals; starting_balance: number; statement_end_date: string; statement_start_date: string; statement_type: 'INITIAL' | 'PERIOD_END' | 'FINAL'; updated: string; ytd_totals: statement_totals; interest_details?: object; next_payment_due_date?: string; next_statement_end_date?: string; payoff_details?: object; }",
    markdown:
      "## retrieve\n\n`client.financialAccounts.statements.retrieve(financial_account_token: string, statement_token: string): { token: string; account_standing: object; amount_due: object; available_credit: number; created: string; credit_limit: number; credit_product_token: string; days_in_billing_cycle: number; ending_balance: number; financial_account_token: string; payment_due_date: string; period_totals: statement_totals; starting_balance: number; statement_end_date: string; statement_start_date: string; statement_type: 'INITIAL' | 'PERIOD_END' | 'FINAL'; updated: string; ytd_totals: statement_totals; interest_details?: object; next_payment_due_date?: string; next_statement_end_date?: string; payoff_details?: object; }`\n\n**get** `/v1/financial_accounts/{financial_account_token}/statements/{statement_token}`\n\nGet a specific statement for a given financial account.\n\n### Parameters\n\n- `financial_account_token: string`\n  Globally unique identifier for financial account.\n\n- `statement_token: string`\n  Globally unique identifier for statements.\n\n### Returns\n\n- `{ token: string; account_standing: { consecutive_full_payments_made: number; consecutive_minimum_payments_made: number; consecutive_minimum_payments_missed: number; days_past_due: number; financial_account_state: { status: 'OPEN' | 'CLOSED' | 'SUSPENDED' | 'PENDING'; substatus?: string; }; has_grace: boolean; period_number: number; period_state: 'STANDARD' | 'PROMO' | 'PENALTY'; }; amount_due: { amount: number; past_due: number; }; available_credit: number; created: string; credit_limit: number; credit_product_token: string; days_in_billing_cycle: number; ending_balance: number; financial_account_token: string; payment_due_date: string; period_totals: { balance_transfers: number; cash_advances: number; credits: number; debits: number; fees: number; interest: number; payments: number; purchases: number; credit_details?: object; debit_details?: object; payment_details?: object; }; starting_balance: number; statement_end_date: string; statement_start_date: string; statement_type: 'INITIAL' | 'PERIOD_END' | 'FINAL'; updated: string; ytd_totals: { balance_transfers: number; cash_advances: number; credits: number; debits: number; fees: number; interest: number; payments: number; purchases: number; credit_details?: object; debit_details?: object; payment_details?: object; }; interest_details?: { actual_interest_charged: number; daily_balance_amounts: object; effective_apr: object; interest_calculation_method: 'DAILY' | 'AVERAGE_DAILY'; interest_for_period: object; prime_rate: string; minimum_interest_charged?: number; }; next_payment_due_date?: string; next_statement_end_date?: string; payoff_details?: { minimum_payment_months: string; minimum_payment_total: string; payoff_period_length_months: number; payoff_period_monthly_payment_amount: number; payoff_period_payment_total: number; }; }`\n\n  - `token: string`\n  - `account_standing: { consecutive_full_payments_made: number; consecutive_minimum_payments_made: number; consecutive_minimum_payments_missed: number; days_past_due: number; financial_account_state: { status: 'OPEN' | 'CLOSED' | 'SUSPENDED' | 'PENDING'; substatus?: string; }; has_grace: boolean; period_number: number; period_state: 'STANDARD' | 'PROMO' | 'PENALTY'; }`\n  - `amount_due: { amount: number; past_due: number; }`\n  - `available_credit: number`\n  - `created: string`\n  - `credit_limit: number`\n  - `credit_product_token: string`\n  - `days_in_billing_cycle: number`\n  - `ending_balance: number`\n  - `financial_account_token: string`\n  - `payment_due_date: string`\n  - `period_totals: { balance_transfers: number; cash_advances: number; credits: number; debits: number; fees: number; interest: number; payments: number; purchases: number; credit_details?: object; debit_details?: object; payment_details?: object; }`\n  - `starting_balance: number`\n  - `statement_end_date: string`\n  - `statement_start_date: string`\n  - `statement_type: 'INITIAL' | 'PERIOD_END' | 'FINAL'`\n  - `updated: string`\n  - `ytd_totals: { balance_transfers: number; cash_advances: number; credits: number; debits: number; fees: number; interest: number; payments: number; purchases: number; credit_details?: object; debit_details?: object; payment_details?: object; }`\n  - `interest_details?: { actual_interest_charged: number; daily_balance_amounts: { balance_transfers: string; cash_advances: string; purchases: string; }; effective_apr: { balance_transfers: string; cash_advances: string; purchases: string; }; interest_calculation_method: 'DAILY' | 'AVERAGE_DAILY'; interest_for_period: { balance_transfers: string; cash_advances: string; purchases: string; }; prime_rate: string; minimum_interest_charged?: number; }`\n  - `next_payment_due_date?: string`\n  - `next_statement_end_date?: string`\n  - `payoff_details?: { minimum_payment_months: string; minimum_payment_total: string; payoff_period_length_months: number; payoff_period_monthly_payment_amount: number; payoff_period_payment_total: number; }`\n\n### Example\n\n```typescript\nimport Lithic from 'lithic';\n\nconst client = new Lithic();\n\nconst statement = await client.financialAccounts.statements.retrieve('statement_token', { financial_account_token: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e' });\n\nconsole.log(statement);\n```",
  },
  {
    name: 'list',
    endpoint: '/v1/financial_accounts/{financial_account_token}/statements',
    httpMethod: 'get',
    summary: 'List statements',
    description: 'List the statements for a given financial account.',
    stainlessPath: '(resource) financial_accounts.statements > (method) list',
    qualified: 'client.financialAccounts.statements.list',
    params: [
      'financial_account_token: string;',
      'begin?: string;',
      'end?: string;',
      'ending_before?: string;',
      'include_initial_statements?: boolean;',
      'page_size?: number;',
      'starting_after?: string;',
    ],
    response:
      "{ token: string; account_standing: object; amount_due: object; available_credit: number; created: string; credit_limit: number; credit_product_token: string; days_in_billing_cycle: number; ending_balance: number; financial_account_token: string; payment_due_date: string; period_totals: statement_totals; starting_balance: number; statement_end_date: string; statement_start_date: string; statement_type: 'INITIAL' | 'PERIOD_END' | 'FINAL'; updated: string; ytd_totals: statement_totals; interest_details?: object; next_payment_due_date?: string; next_statement_end_date?: string; payoff_details?: object; }",
    markdown:
      "## list\n\n`client.financialAccounts.statements.list(financial_account_token: string, begin?: string, end?: string, ending_before?: string, include_initial_statements?: boolean, page_size?: number, starting_after?: string): { token: string; account_standing: object; amount_due: object; available_credit: number; created: string; credit_limit: number; credit_product_token: string; days_in_billing_cycle: number; ending_balance: number; financial_account_token: string; payment_due_date: string; period_totals: statement_totals; starting_balance: number; statement_end_date: string; statement_start_date: string; statement_type: 'INITIAL' | 'PERIOD_END' | 'FINAL'; updated: string; ytd_totals: statement_totals; interest_details?: object; next_payment_due_date?: string; next_statement_end_date?: string; payoff_details?: object; }`\n\n**get** `/v1/financial_accounts/{financial_account_token}/statements`\n\nList the statements for a given financial account.\n\n### Parameters\n\n- `financial_account_token: string`\n  Globally unique identifier for financial account.\n\n- `begin?: string`\n  Date string in RFC 3339 format. Only entries created after the specified date will be included.\n\n- `end?: string`\n  Date string in RFC 3339 format. Only entries created before the specified date will be included.\n\n- `ending_before?: string`\n  A cursor representing an item's token before which a page of results should end. Used to retrieve the previous page of results before this item.\n\n- `include_initial_statements?: boolean`\n  Whether to include the initial statement. It is not included by default.\n\n- `page_size?: number`\n  Page size (for pagination).\n\n- `starting_after?: string`\n  A cursor representing an item's token after which a page of results should begin. Used to retrieve the next page of results after this item.\n\n### Returns\n\n- `{ token: string; account_standing: { consecutive_full_payments_made: number; consecutive_minimum_payments_made: number; consecutive_minimum_payments_missed: number; days_past_due: number; financial_account_state: { status: 'OPEN' | 'CLOSED' | 'SUSPENDED' | 'PENDING'; substatus?: string; }; has_grace: boolean; period_number: number; period_state: 'STANDARD' | 'PROMO' | 'PENALTY'; }; amount_due: { amount: number; past_due: number; }; available_credit: number; created: string; credit_limit: number; credit_product_token: string; days_in_billing_cycle: number; ending_balance: number; financial_account_token: string; payment_due_date: string; period_totals: { balance_transfers: number; cash_advances: number; credits: number; debits: number; fees: number; interest: number; payments: number; purchases: number; credit_details?: object; debit_details?: object; payment_details?: object; }; starting_balance: number; statement_end_date: string; statement_start_date: string; statement_type: 'INITIAL' | 'PERIOD_END' | 'FINAL'; updated: string; ytd_totals: { balance_transfers: number; cash_advances: number; credits: number; debits: number; fees: number; interest: number; payments: number; purchases: number; credit_details?: object; debit_details?: object; payment_details?: object; }; interest_details?: { actual_interest_charged: number; daily_balance_amounts: object; effective_apr: object; interest_calculation_method: 'DAILY' | 'AVERAGE_DAILY'; interest_for_period: object; prime_rate: string; minimum_interest_charged?: number; }; next_payment_due_date?: string; next_statement_end_date?: string; payoff_details?: { minimum_payment_months: string; minimum_payment_total: string; payoff_period_length_months: number; payoff_period_monthly_payment_amount: number; payoff_period_payment_total: number; }; }`\n\n  - `token: string`\n  - `account_standing: { consecutive_full_payments_made: number; consecutive_minimum_payments_made: number; consecutive_minimum_payments_missed: number; days_past_due: number; financial_account_state: { status: 'OPEN' | 'CLOSED' | 'SUSPENDED' | 'PENDING'; substatus?: string; }; has_grace: boolean; period_number: number; period_state: 'STANDARD' | 'PROMO' | 'PENALTY'; }`\n  - `amount_due: { amount: number; past_due: number; }`\n  - `available_credit: number`\n  - `created: string`\n  - `credit_limit: number`\n  - `credit_product_token: string`\n  - `days_in_billing_cycle: number`\n  - `ending_balance: number`\n  - `financial_account_token: string`\n  - `payment_due_date: string`\n  - `period_totals: { balance_transfers: number; cash_advances: number; credits: number; debits: number; fees: number; interest: number; payments: number; purchases: number; credit_details?: object; debit_details?: object; payment_details?: object; }`\n  - `starting_balance: number`\n  - `statement_end_date: string`\n  - `statement_start_date: string`\n  - `statement_type: 'INITIAL' | 'PERIOD_END' | 'FINAL'`\n  - `updated: string`\n  - `ytd_totals: { balance_transfers: number; cash_advances: number; credits: number; debits: number; fees: number; interest: number; payments: number; purchases: number; credit_details?: object; debit_details?: object; payment_details?: object; }`\n  - `interest_details?: { actual_interest_charged: number; daily_balance_amounts: { balance_transfers: string; cash_advances: string; purchases: string; }; effective_apr: { balance_transfers: string; cash_advances: string; purchases: string; }; interest_calculation_method: 'DAILY' | 'AVERAGE_DAILY'; interest_for_period: { balance_transfers: string; cash_advances: string; purchases: string; }; prime_rate: string; minimum_interest_charged?: number; }`\n  - `next_payment_due_date?: string`\n  - `next_statement_end_date?: string`\n  - `payoff_details?: { minimum_payment_months: string; minimum_payment_total: string; payoff_period_length_months: number; payoff_period_monthly_payment_amount: number; payoff_period_payment_total: number; }`\n\n### Example\n\n```typescript\nimport Lithic from 'lithic';\n\nconst client = new Lithic();\n\n// Automatically fetches more pages as needed.\nfor await (const statement of client.financialAccounts.statements.list('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e')) {\n  console.log(statement);\n}\n```",
  },
  {
    name: 'list',
    endpoint: '/v1/financial_accounts/{financial_account_token}/statements/{statement_token}/line_items',
    httpMethod: 'get',
    summary: 'List line items for a statement',
    description: 'List the line items for a given statement within a given financial account.',
    stainlessPath: '(resource) financial_accounts.statements.line_items > (method) list',
    qualified: 'client.financialAccounts.statements.lineItems.list',
    params: [
      'financial_account_token: string;',
      'statement_token: string;',
      'ending_before?: string;',
      'page_size?: number;',
      'starting_after?: string;',
    ],
    response:
      '{ token: string; amount: number; category: string; created: string; currency: string; effective_date: string; event_type: string; financial_account_token: string; financial_transaction_event_token: string; financial_transaction_token: string; card_token?: string; descriptor?: string; event_subtype?: string; loan_tape_date?: string; }',
    markdown:
      "## list\n\n`client.financialAccounts.statements.lineItems.list(financial_account_token: string, statement_token: string, ending_before?: string, page_size?: number, starting_after?: string): { token: string; amount: number; category: string; created: string; currency: string; effective_date: string; event_type: string; financial_account_token: string; financial_transaction_event_token: string; financial_transaction_token: string; card_token?: string; descriptor?: string; event_subtype?: string; loan_tape_date?: string; }`\n\n**get** `/v1/financial_accounts/{financial_account_token}/statements/{statement_token}/line_items`\n\nList the line items for a given statement within a given financial account.\n\n### Parameters\n\n- `financial_account_token: string`\n  Globally unique identifier for financial account.\n\n- `statement_token: string`\n  Globally unique identifier for statements.\n\n- `ending_before?: string`\n  A cursor representing an item's token before which a page of results should end. Used to retrieve the previous page of results before this item.\n\n- `page_size?: number`\n  Page size (for pagination).\n\n- `starting_after?: string`\n  A cursor representing an item's token after which a page of results should begin. Used to retrieve the next page of results after this item.\n\n### Returns\n\n- `{ token: string; amount: number; category: string; created: string; currency: string; effective_date: string; event_type: string; financial_account_token: string; financial_transaction_event_token: string; financial_transaction_token: string; card_token?: string; descriptor?: string; event_subtype?: string; loan_tape_date?: string; }`\n\n  - `token: string`\n  - `amount: number`\n  - `category: string`\n  - `created: string`\n  - `currency: string`\n  - `effective_date: string`\n  - `event_type: string`\n  - `financial_account_token: string`\n  - `financial_transaction_event_token: string`\n  - `financial_transaction_token: string`\n  - `card_token?: string`\n  - `descriptor?: string`\n  - `event_subtype?: string`\n  - `loan_tape_date?: string`\n\n### Example\n\n```typescript\nimport Lithic from 'lithic';\n\nconst client = new Lithic();\n\n// Automatically fetches more pages as needed.\nfor await (const lineItem of client.financialAccounts.statements.lineItems.list('statement_token', { financial_account_token: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e' })) {\n  console.log(lineItem);\n}\n```",
  },
  {
    name: 'retrieve',
    endpoint: '/v1/financial_accounts/{financial_account_token}/loan_tapes/{loan_tape_token}',
    httpMethod: 'get',
    summary: 'Get loan tape by token',
    description: 'Get a specific loan tape for a given financial account.',
    stainlessPath: '(resource) financial_accounts.loan_tapes > (method) retrieve',
    qualified: 'client.financialAccounts.loanTapes.retrieve',
    params: ['financial_account_token: string;', 'loan_tape_token: string;'],
    response:
      '{ token: string; account_standing: object; available_credit: number; balances: object; created: string; credit_limit: number; credit_product_token: string; date: string; day_totals: statement_totals; ending_balance: number; excess_credits: number; financial_account_token: string; interest_details: object; minimum_payment_balance: object; payment_allocation: object; period_totals: statement_totals; previous_statement_balance: object; starting_balance: number; updated: string; version: number; ytd_totals: statement_totals; tier?: string; }',
    markdown:
      "## retrieve\n\n`client.financialAccounts.loanTapes.retrieve(financial_account_token: string, loan_tape_token: string): { token: string; account_standing: object; available_credit: number; balances: object; created: string; credit_limit: number; credit_product_token: string; date: string; day_totals: statement_totals; ending_balance: number; excess_credits: number; financial_account_token: string; interest_details: object; minimum_payment_balance: object; payment_allocation: object; period_totals: statement_totals; previous_statement_balance: object; starting_balance: number; updated: string; version: number; ytd_totals: statement_totals; tier?: string; }`\n\n**get** `/v1/financial_accounts/{financial_account_token}/loan_tapes/{loan_tape_token}`\n\nGet a specific loan tape for a given financial account.\n\n### Parameters\n\n- `financial_account_token: string`\n  Globally unique identifier for financial account.\n\n- `loan_tape_token: string`\n  Globally unique identifier for loan tape.\n\n### Returns\n\n- `{ token: string; account_standing: { consecutive_full_payments_made: number; consecutive_minimum_payments_made: number; consecutive_minimum_payments_missed: number; days_past_due: number; financial_account_state: { status: 'OPEN' | 'CLOSED' | 'SUSPENDED' | 'PENDING'; substatus?: string; }; has_grace: boolean; period_number: number; period_state: 'STANDARD' | 'PROMO' | 'PENALTY'; }; available_credit: number; balances: { due: object; next_statement_due: object; past_due: object; past_statements_due: object; }; created: string; credit_limit: number; credit_product_token: string; date: string; day_totals: { balance_transfers: number; cash_advances: number; credits: number; debits: number; fees: number; interest: number; payments: number; purchases: number; credit_details?: object; debit_details?: object; payment_details?: object; }; ending_balance: number; excess_credits: number; financial_account_token: string; interest_details: { actual_interest_charged: number; daily_balance_amounts: object; effective_apr: object; interest_calculation_method: 'DAILY' | 'AVERAGE_DAILY'; interest_for_period: object; prime_rate: string; minimum_interest_charged?: number; }; minimum_payment_balance: { amount: number; remaining: number; }; payment_allocation: { fee_details: object; fees: number; interest: number; interest_details: object; principal: number; principal_details: object; }; period_totals: { balance_transfers: number; cash_advances: number; credits: number; debits: number; fees: number; interest: number; payments: number; purchases: number; credit_details?: object; debit_details?: object; payment_details?: object; }; previous_statement_balance: { amount: number; remaining: number; }; starting_balance: number; updated: string; version: number; ytd_totals: { balance_transfers: number; cash_advances: number; credits: number; debits: number; fees: number; interest: number; payments: number; purchases: number; credit_details?: object; debit_details?: object; payment_details?: object; }; tier?: string; }`\n\n  - `token: string`\n  - `account_standing: { consecutive_full_payments_made: number; consecutive_minimum_payments_made: number; consecutive_minimum_payments_missed: number; days_past_due: number; financial_account_state: { status: 'OPEN' | 'CLOSED' | 'SUSPENDED' | 'PENDING'; substatus?: string; }; has_grace: boolean; period_number: number; period_state: 'STANDARD' | 'PROMO' | 'PENALTY'; }`\n  - `available_credit: number`\n  - `balances: { due: { fees: number; interest: number; principal: number; }; next_statement_due: { fees: number; interest: number; principal: number; }; past_due: { fees: number; interest: number; principal: number; }; past_statements_due: { fees: number; interest: number; principal: number; }; }`\n  - `created: string`\n  - `credit_limit: number`\n  - `credit_product_token: string`\n  - `date: string`\n  - `day_totals: { balance_transfers: number; cash_advances: number; credits: number; debits: number; fees: number; interest: number; payments: number; purchases: number; credit_details?: object; debit_details?: object; payment_details?: object; }`\n  - `ending_balance: number`\n  - `excess_credits: number`\n  - `financial_account_token: string`\n  - `interest_details: { actual_interest_charged: number; daily_balance_amounts: { balance_transfers: string; cash_advances: string; purchases: string; }; effective_apr: { balance_transfers: string; cash_advances: string; purchases: string; }; interest_calculation_method: 'DAILY' | 'AVERAGE_DAILY'; interest_for_period: { balance_transfers: string; cash_advances: string; purchases: string; }; prime_rate: string; minimum_interest_charged?: number; }`\n  - `minimum_payment_balance: { amount: number; remaining: number; }`\n  - `payment_allocation: { fee_details: { balance_transfers: string; cash_advances: string; purchases: string; }; fees: number; interest: number; interest_details: { balance_transfers: string; cash_advances: string; purchases: string; }; principal: number; principal_details: { balance_transfers: string; cash_advances: string; purchases: string; }; }`\n  - `period_totals: { balance_transfers: number; cash_advances: number; credits: number; debits: number; fees: number; interest: number; payments: number; purchases: number; credit_details?: object; debit_details?: object; payment_details?: object; }`\n  - `previous_statement_balance: { amount: number; remaining: number; }`\n  - `starting_balance: number`\n  - `updated: string`\n  - `version: number`\n  - `ytd_totals: { balance_transfers: number; cash_advances: number; credits: number; debits: number; fees: number; interest: number; payments: number; purchases: number; credit_details?: object; debit_details?: object; payment_details?: object; }`\n  - `tier?: string`\n\n### Example\n\n```typescript\nimport Lithic from 'lithic';\n\nconst client = new Lithic();\n\nconst loanTape = await client.financialAccounts.loanTapes.retrieve('loan_tape_token', { financial_account_token: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e' });\n\nconsole.log(loanTape);\n```",
  },
  {
    name: 'list',
    endpoint: '/v1/financial_accounts/{financial_account_token}/loan_tapes',
    httpMethod: 'get',
    summary: 'List loan tapes',
    description: 'List the loan tapes for a given financial account.',
    stainlessPath: '(resource) financial_accounts.loan_tapes > (method) list',
    qualified: 'client.financialAccounts.loanTapes.list',
    params: [
      'financial_account_token: string;',
      'begin?: string;',
      'end?: string;',
      'ending_before?: string;',
      'page_size?: number;',
      'starting_after?: string;',
    ],
    response:
      '{ token: string; account_standing: object; available_credit: number; balances: object; created: string; credit_limit: number; credit_product_token: string; date: string; day_totals: statement_totals; ending_balance: number; excess_credits: number; financial_account_token: string; interest_details: object; minimum_payment_balance: object; payment_allocation: object; period_totals: statement_totals; previous_statement_balance: object; starting_balance: number; updated: string; version: number; ytd_totals: statement_totals; tier?: string; }',
    markdown:
      "## list\n\n`client.financialAccounts.loanTapes.list(financial_account_token: string, begin?: string, end?: string, ending_before?: string, page_size?: number, starting_after?: string): { token: string; account_standing: object; available_credit: number; balances: object; created: string; credit_limit: number; credit_product_token: string; date: string; day_totals: statement_totals; ending_balance: number; excess_credits: number; financial_account_token: string; interest_details: object; minimum_payment_balance: object; payment_allocation: object; period_totals: statement_totals; previous_statement_balance: object; starting_balance: number; updated: string; version: number; ytd_totals: statement_totals; tier?: string; }`\n\n**get** `/v1/financial_accounts/{financial_account_token}/loan_tapes`\n\nList the loan tapes for a given financial account.\n\n### Parameters\n\n- `financial_account_token: string`\n  Globally unique identifier for financial account.\n\n- `begin?: string`\n  Date string in RFC 3339 format. Only entries created after the specified date will be included.\n\n- `end?: string`\n  Date string in RFC 3339 format. Only entries created before the specified date will be included.\n\n- `ending_before?: string`\n  A cursor representing an item's token before which a page of results should end. Used to retrieve the previous page of results before this item.\n\n- `page_size?: number`\n  Page size (for pagination).\n\n- `starting_after?: string`\n  A cursor representing an item's token after which a page of results should begin. Used to retrieve the next page of results after this item.\n\n### Returns\n\n- `{ token: string; account_standing: { consecutive_full_payments_made: number; consecutive_minimum_payments_made: number; consecutive_minimum_payments_missed: number; days_past_due: number; financial_account_state: { status: 'OPEN' | 'CLOSED' | 'SUSPENDED' | 'PENDING'; substatus?: string; }; has_grace: boolean; period_number: number; period_state: 'STANDARD' | 'PROMO' | 'PENALTY'; }; available_credit: number; balances: { due: object; next_statement_due: object; past_due: object; past_statements_due: object; }; created: string; credit_limit: number; credit_product_token: string; date: string; day_totals: { balance_transfers: number; cash_advances: number; credits: number; debits: number; fees: number; interest: number; payments: number; purchases: number; credit_details?: object; debit_details?: object; payment_details?: object; }; ending_balance: number; excess_credits: number; financial_account_token: string; interest_details: { actual_interest_charged: number; daily_balance_amounts: object; effective_apr: object; interest_calculation_method: 'DAILY' | 'AVERAGE_DAILY'; interest_for_period: object; prime_rate: string; minimum_interest_charged?: number; }; minimum_payment_balance: { amount: number; remaining: number; }; payment_allocation: { fee_details: object; fees: number; interest: number; interest_details: object; principal: number; principal_details: object; }; period_totals: { balance_transfers: number; cash_advances: number; credits: number; debits: number; fees: number; interest: number; payments: number; purchases: number; credit_details?: object; debit_details?: object; payment_details?: object; }; previous_statement_balance: { amount: number; remaining: number; }; starting_balance: number; updated: string; version: number; ytd_totals: { balance_transfers: number; cash_advances: number; credits: number; debits: number; fees: number; interest: number; payments: number; purchases: number; credit_details?: object; debit_details?: object; payment_details?: object; }; tier?: string; }`\n\n  - `token: string`\n  - `account_standing: { consecutive_full_payments_made: number; consecutive_minimum_payments_made: number; consecutive_minimum_payments_missed: number; days_past_due: number; financial_account_state: { status: 'OPEN' | 'CLOSED' | 'SUSPENDED' | 'PENDING'; substatus?: string; }; has_grace: boolean; period_number: number; period_state: 'STANDARD' | 'PROMO' | 'PENALTY'; }`\n  - `available_credit: number`\n  - `balances: { due: { fees: number; interest: number; principal: number; }; next_statement_due: { fees: number; interest: number; principal: number; }; past_due: { fees: number; interest: number; principal: number; }; past_statements_due: { fees: number; interest: number; principal: number; }; }`\n  - `created: string`\n  - `credit_limit: number`\n  - `credit_product_token: string`\n  - `date: string`\n  - `day_totals: { balance_transfers: number; cash_advances: number; credits: number; debits: number; fees: number; interest: number; payments: number; purchases: number; credit_details?: object; debit_details?: object; payment_details?: object; }`\n  - `ending_balance: number`\n  - `excess_credits: number`\n  - `financial_account_token: string`\n  - `interest_details: { actual_interest_charged: number; daily_balance_amounts: { balance_transfers: string; cash_advances: string; purchases: string; }; effective_apr: { balance_transfers: string; cash_advances: string; purchases: string; }; interest_calculation_method: 'DAILY' | 'AVERAGE_DAILY'; interest_for_period: { balance_transfers: string; cash_advances: string; purchases: string; }; prime_rate: string; minimum_interest_charged?: number; }`\n  - `minimum_payment_balance: { amount: number; remaining: number; }`\n  - `payment_allocation: { fee_details: { balance_transfers: string; cash_advances: string; purchases: string; }; fees: number; interest: number; interest_details: { balance_transfers: string; cash_advances: string; purchases: string; }; principal: number; principal_details: { balance_transfers: string; cash_advances: string; purchases: string; }; }`\n  - `period_totals: { balance_transfers: number; cash_advances: number; credits: number; debits: number; fees: number; interest: number; payments: number; purchases: number; credit_details?: object; debit_details?: object; payment_details?: object; }`\n  - `previous_statement_balance: { amount: number; remaining: number; }`\n  - `starting_balance: number`\n  - `updated: string`\n  - `version: number`\n  - `ytd_totals: { balance_transfers: number; cash_advances: number; credits: number; debits: number; fees: number; interest: number; payments: number; purchases: number; credit_details?: object; debit_details?: object; payment_details?: object; }`\n  - `tier?: string`\n\n### Example\n\n```typescript\nimport Lithic from 'lithic';\n\nconst client = new Lithic();\n\n// Automatically fetches more pages as needed.\nfor await (const loanTape of client.financialAccounts.loanTapes.list('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e')) {\n  console.log(loanTape);\n}\n```",
  },
  {
    name: 'retrieve',
    endpoint: '/v1/financial_accounts/{financial_account_token}/loan_tape_configuration',
    httpMethod: 'get',
    summary: 'Get loan tape configuration',
    description: 'Get the loan tape configuration for a given financial account.',
    stainlessPath: '(resource) financial_accounts.loan_tape_configuration > (method) retrieve',
    qualified: 'client.financialAccounts.loanTapeConfiguration.retrieve',
    params: ['financial_account_token: string;'],
    response:
      '{ created_at: string; financial_account_token: string; instance_token: string; updated_at: string; credit_product_token?: string; loan_tape_rebuild_configuration?: { rebuild_needed: boolean; last_rebuild?: string; rebuild_from?: string; }; tier_schedule_changed_at?: string; }',
    markdown:
      "## retrieve\n\n`client.financialAccounts.loanTapeConfiguration.retrieve(financial_account_token: string): { created_at: string; financial_account_token: string; instance_token: string; updated_at: string; credit_product_token?: string; loan_tape_rebuild_configuration?: loan_tape_rebuild_configuration; tier_schedule_changed_at?: string; }`\n\n**get** `/v1/financial_accounts/{financial_account_token}/loan_tape_configuration`\n\nGet the loan tape configuration for a given financial account.\n\n### Parameters\n\n- `financial_account_token: string`\n  Globally unique identifier for financial account.\n\n### Returns\n\n- `{ created_at: string; financial_account_token: string; instance_token: string; updated_at: string; credit_product_token?: string; loan_tape_rebuild_configuration?: { rebuild_needed: boolean; last_rebuild?: string; rebuild_from?: string; }; tier_schedule_changed_at?: string; }`\n  Configuration for loan tapes\n\n  - `created_at: string`\n  - `financial_account_token: string`\n  - `instance_token: string`\n  - `updated_at: string`\n  - `credit_product_token?: string`\n  - `loan_tape_rebuild_configuration?: { rebuild_needed: boolean; last_rebuild?: string; rebuild_from?: string; }`\n  - `tier_schedule_changed_at?: string`\n\n### Example\n\n```typescript\nimport Lithic from 'lithic';\n\nconst client = new Lithic();\n\nconst loanTapeConfiguration = await client.financialAccounts.loanTapeConfiguration.retrieve('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e');\n\nconsole.log(loanTapeConfiguration);\n```",
  },
  {
    name: 'create',
    endpoint: '/v1/financial_accounts/{financial_account_token}/interest_tier_schedule',
    httpMethod: 'post',
    summary: 'Create interest tier schedule',
    description: 'Create a new interest tier schedule entry for a supported financial account',
    stainlessPath: '(resource) financial_accounts.interest_tier_schedule > (method) create',
    qualified: 'client.financialAccounts.interestTierSchedule.create',
    params: [
      'financial_account_token: string;',
      'credit_product_token: string;',
      'effective_date: string;',
      'penalty_rates?: object;',
      'tier_name?: string;',
      'tier_rates?: object;',
    ],
    response:
      '{ credit_product_token: string; effective_date: string; penalty_rates?: object; tier_name?: string; tier_rates?: object; }',
    markdown:
      "## create\n\n`client.financialAccounts.interestTierSchedule.create(financial_account_token: string, credit_product_token: string, effective_date: string, penalty_rates?: object, tier_name?: string, tier_rates?: object): { credit_product_token: string; effective_date: string; penalty_rates?: object; tier_name?: string; tier_rates?: object; }`\n\n**post** `/v1/financial_accounts/{financial_account_token}/interest_tier_schedule`\n\nCreate a new interest tier schedule entry for a supported financial account\n\n### Parameters\n\n- `financial_account_token: string`\n\n- `credit_product_token: string`\n  Globally unique identifier for a credit product\n\n- `effective_date: string`\n  Date the tier should be effective in YYYY-MM-DD format\n\n- `penalty_rates?: object`\n  Custom rates per category for penalties\n\n- `tier_name?: string`\n  Name of a tier contained in the credit product. Mutually exclusive with tier_rates\n\n- `tier_rates?: object`\n  Custom rates per category.  Mutually exclusive with tier_name\n\n### Returns\n\n- `{ credit_product_token: string; effective_date: string; penalty_rates?: object; tier_name?: string; tier_rates?: object; }`\n  Entry in the Tier Schedule of an account\n\n  - `credit_product_token: string`\n  - `effective_date: string`\n  - `penalty_rates?: object`\n  - `tier_name?: string`\n  - `tier_rates?: object`\n\n### Example\n\n```typescript\nimport Lithic from 'lithic';\n\nconst client = new Lithic();\n\nconst interestTierSchedule = await client.financialAccounts.interestTierSchedule.create('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', { credit_product_token: 'credit_product_token', effective_date: '2019-12-27' });\n\nconsole.log(interestTierSchedule);\n```",
  },
  {
    name: 'retrieve',
    endpoint: '/v1/financial_accounts/{financial_account_token}/interest_tier_schedule/{effective_date}',
    httpMethod: 'get',
    summary: 'Get interest tier schedule',
    description: 'Get a specific interest tier schedule by effective date',
    stainlessPath: '(resource) financial_accounts.interest_tier_schedule > (method) retrieve',
    qualified: 'client.financialAccounts.interestTierSchedule.retrieve',
    params: ['financial_account_token: string;', 'effective_date: string;'],
    response:
      '{ credit_product_token: string; effective_date: string; penalty_rates?: object; tier_name?: string; tier_rates?: object; }',
    markdown:
      "## retrieve\n\n`client.financialAccounts.interestTierSchedule.retrieve(financial_account_token: string, effective_date: string): { credit_product_token: string; effective_date: string; penalty_rates?: object; tier_name?: string; tier_rates?: object; }`\n\n**get** `/v1/financial_accounts/{financial_account_token}/interest_tier_schedule/{effective_date}`\n\nGet a specific interest tier schedule by effective date\n\n### Parameters\n\n- `financial_account_token: string`\n\n- `effective_date: string`\n\n### Returns\n\n- `{ credit_product_token: string; effective_date: string; penalty_rates?: object; tier_name?: string; tier_rates?: object; }`\n  Entry in the Tier Schedule of an account\n\n  - `credit_product_token: string`\n  - `effective_date: string`\n  - `penalty_rates?: object`\n  - `tier_name?: string`\n  - `tier_rates?: object`\n\n### Example\n\n```typescript\nimport Lithic from 'lithic';\n\nconst client = new Lithic();\n\nconst interestTierSchedule = await client.financialAccounts.interestTierSchedule.retrieve('2019-12-27', { financial_account_token: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e' });\n\nconsole.log(interestTierSchedule);\n```",
  },
  {
    name: 'update',
    endpoint: '/v1/financial_accounts/{financial_account_token}/interest_tier_schedule/{effective_date}',
    httpMethod: 'put',
    summary: 'Update interest tier schedule',
    description: 'Update an existing interest tier schedule',
    stainlessPath: '(resource) financial_accounts.interest_tier_schedule > (method) update',
    qualified: 'client.financialAccounts.interestTierSchedule.update',
    params: [
      'financial_account_token: string;',
      'effective_date: string;',
      'penalty_rates?: object;',
      'tier_name?: string;',
      'tier_rates?: object;',
    ],
    response:
      '{ credit_product_token: string; effective_date: string; penalty_rates?: object; tier_name?: string; tier_rates?: object; }',
    markdown:
      "## update\n\n`client.financialAccounts.interestTierSchedule.update(financial_account_token: string, effective_date: string, penalty_rates?: object, tier_name?: string, tier_rates?: object): { credit_product_token: string; effective_date: string; penalty_rates?: object; tier_name?: string; tier_rates?: object; }`\n\n**put** `/v1/financial_accounts/{financial_account_token}/interest_tier_schedule/{effective_date}`\n\nUpdate an existing interest tier schedule\n\n### Parameters\n\n- `financial_account_token: string`\n\n- `effective_date: string`\n\n- `penalty_rates?: object`\n  Custom rates per category for penalties\n\n- `tier_name?: string`\n  Name of a tier contained in the credit product. Mutually exclusive with tier_rates\n\n- `tier_rates?: object`\n  Custom rates per category.  Mutually exclusive with tier_name\n\n### Returns\n\n- `{ credit_product_token: string; effective_date: string; penalty_rates?: object; tier_name?: string; tier_rates?: object; }`\n  Entry in the Tier Schedule of an account\n\n  - `credit_product_token: string`\n  - `effective_date: string`\n  - `penalty_rates?: object`\n  - `tier_name?: string`\n  - `tier_rates?: object`\n\n### Example\n\n```typescript\nimport Lithic from 'lithic';\n\nconst client = new Lithic();\n\nconst interestTierSchedule = await client.financialAccounts.interestTierSchedule.update('2019-12-27', { financial_account_token: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e' });\n\nconsole.log(interestTierSchedule);\n```",
  },
  {
    name: 'list',
    endpoint: '/v1/financial_accounts/{financial_account_token}/interest_tier_schedule',
    httpMethod: 'get',
    summary: 'List interest tier schedules',
    description:
      'List interest tier schedules for a financial account with optional date filtering.\n\nIf no date parameters are provided, returns all tier schedules.\nIf date parameters are provided, uses filtering to return matching schedules (max 100).\n- for_date: Returns exact match (takes precedence over other dates)\n- before_date: Returns schedules with effective_date <= before_date\n- after_date: Returns schedules with effective_date >= after_date\n- Both before_date and after_date: Returns schedules in range',
    stainlessPath: '(resource) financial_accounts.interest_tier_schedule > (method) list',
    qualified: 'client.financialAccounts.interestTierSchedule.list',
    params: [
      'financial_account_token: string;',
      'after_date?: string;',
      'before_date?: string;',
      'for_date?: string;',
    ],
    response:
      '{ credit_product_token: string; effective_date: string; penalty_rates?: object; tier_name?: string; tier_rates?: object; }',
    markdown:
      "## list\n\n`client.financialAccounts.interestTierSchedule.list(financial_account_token: string, after_date?: string, before_date?: string, for_date?: string): { credit_product_token: string; effective_date: string; penalty_rates?: object; tier_name?: string; tier_rates?: object; }`\n\n**get** `/v1/financial_accounts/{financial_account_token}/interest_tier_schedule`\n\nList interest tier schedules for a financial account with optional date filtering.\n\nIf no date parameters are provided, returns all tier schedules.\nIf date parameters are provided, uses filtering to return matching schedules (max 100).\n- for_date: Returns exact match (takes precedence over other dates)\n- before_date: Returns schedules with effective_date <= before_date\n- after_date: Returns schedules with effective_date >= after_date\n- Both before_date and after_date: Returns schedules in range\n\n### Parameters\n\n- `financial_account_token: string`\n\n- `after_date?: string`\n  Return schedules with effective_date >= after_date (ISO format YYYY-MM-DD)\n\n- `before_date?: string`\n  Return schedules with effective_date <= before_date (ISO format YYYY-MM-DD)\n\n- `for_date?: string`\n  Return schedule with effective_date == for_date (ISO format YYYY-MM-DD)\n\n### Returns\n\n- `{ credit_product_token: string; effective_date: string; penalty_rates?: object; tier_name?: string; tier_rates?: object; }`\n  Entry in the Tier Schedule of an account\n\n  - `credit_product_token: string`\n  - `effective_date: string`\n  - `penalty_rates?: object`\n  - `tier_name?: string`\n  - `tier_rates?: object`\n\n### Example\n\n```typescript\nimport Lithic from 'lithic';\n\nconst client = new Lithic();\n\n// Automatically fetches more pages as needed.\nfor await (const interestTierSchedule of client.financialAccounts.interestTierSchedule.list('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e')) {\n  console.log(interestTierSchedule);\n}\n```",
  },
  {
    name: 'delete',
    endpoint: '/v1/financial_accounts/{financial_account_token}/interest_tier_schedule/{effective_date}',
    httpMethod: 'delete',
    summary: 'Delete interest tier schedule',
    description:
      "Delete an interest tier schedule entry.\n\nReturns:\n- 400 Bad Request: Invalid effective_date format OR attempting to delete the earliest\n  tier schedule entry for a non-PENDING account\n- 404 Not Found: Tier schedule entry not found for the given effective_date OR ledger account not found\n\nNote: PENDING accounts can delete the earliest tier schedule entry (account hasn't opened yet).\nActive/non-PENDING accounts cannot delete the earliest entry to prevent orphaning the account.\n\nIf the deleted tier schedule has a past effective_date and the account is ACTIVE,\nthe loan tape rebuild configuration will be updated to trigger rebuilds from that date.",
    stainlessPath: '(resource) financial_accounts.interest_tier_schedule > (method) delete',
    qualified: 'client.financialAccounts.interestTierSchedule.delete',
    params: ['financial_account_token: string;', 'effective_date: string;'],
    markdown:
      "## delete\n\n`client.financialAccounts.interestTierSchedule.delete(financial_account_token: string, effective_date: string): void`\n\n**delete** `/v1/financial_accounts/{financial_account_token}/interest_tier_schedule/{effective_date}`\n\nDelete an interest tier schedule entry.\n\nReturns:\n- 400 Bad Request: Invalid effective_date format OR attempting to delete the earliest\n  tier schedule entry for a non-PENDING account\n- 404 Not Found: Tier schedule entry not found for the given effective_date OR ledger account not found\n\nNote: PENDING accounts can delete the earliest tier schedule entry (account hasn't opened yet).\nActive/non-PENDING accounts cannot delete the earliest entry to prevent orphaning the account.\n\nIf the deleted tier schedule has a past effective_date and the account is ACTIVE,\nthe loan tape rebuild configuration will be updated to trigger rebuilds from that date.\n\n### Parameters\n\n- `financial_account_token: string`\n\n- `effective_date: string`\n\n### Example\n\n```typescript\nimport Lithic from 'lithic';\n\nconst client = new Lithic();\n\nawait client.financialAccounts.interestTierSchedule.delete('2019-12-27', { financial_account_token: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e' })\n```",
  },
  {
    name: 'retrieve',
    endpoint: '/v1/transactions/{transaction_token}',
    httpMethod: 'get',
    summary: 'Get card transaction',
    description:
      'Get a specific card transaction. All amounts are in the smallest unit of their respective currency (e.g., cents for USD).\n',
    stainlessPath: '(resource) transactions > (method) retrieve',
    qualified: 'client.transactions.retrieve',
    params: ['transaction_token: string;'],
    response:
      "{ token: string; account_token: string; acquirer_fee: number; acquirer_reference_number: string; amount: number; amounts: object; authorization_amount: number; authorization_code: string; avs: object; card_token: string; cardholder_authentication: cardholder_authentication; created: string; financial_account_token: string; merchant: merchant; merchant_amount: number; merchant_authorization_amount: number; merchant_currency: string; network: 'AMEX' | 'INTERLINK' | 'MAESTRO' | 'MASTERCARD' | 'UNKNOWN' | 'VISA'; network_risk_score: number; pos: object; result: string; service_location: object; settled_amount: number; status: 'DECLINED' | 'EXPIRED' | 'PENDING' | 'SETTLED' | 'VOIDED'; tags: object; token_info: token_info; updated: string; events?: object[]; }",
    markdown:
      "## retrieve\n\n`client.transactions.retrieve(transaction_token: string): { token: string; account_token: string; acquirer_fee: number; acquirer_reference_number: string; amount: number; amounts: object; authorization_amount: number; authorization_code: string; avs: object; card_token: string; cardholder_authentication: cardholder_authentication; created: string; financial_account_token: string; merchant: merchant; merchant_amount: number; merchant_authorization_amount: number; merchant_currency: string; network: 'AMEX' | 'INTERLINK' | 'MAESTRO' | 'MASTERCARD' | 'UNKNOWN' | 'VISA'; network_risk_score: number; pos: object; result: string; service_location: object; settled_amount: number; status: 'DECLINED' | 'EXPIRED' | 'PENDING' | 'SETTLED' | 'VOIDED'; tags: object; token_info: token_info; updated: string; events?: object[]; }`\n\n**get** `/v1/transactions/{transaction_token}`\n\nGet a specific card transaction. All amounts are in the smallest unit of their respective currency (e.g., cents for USD).\n\n\n### Parameters\n\n- `transaction_token: string`\n\n### Returns\n\n- `{ token: string; account_token: string; acquirer_fee: number; acquirer_reference_number: string; amount: number; amounts: { cardholder: { amount: number; conversion_rate: string; currency: currency; }; hold: { amount: number; currency: currency; }; merchant: { amount: number; currency: currency; }; settlement: { amount: number; currency: currency; }; }; authorization_amount: number; authorization_code: string; avs: { address: string; zipcode: string; }; card_token: string; cardholder_authentication: { authentication_method: 'FRICTIONLESS' | 'CHALLENGE' | 'NONE'; authentication_result: 'ATTEMPTS' | 'DECLINE' | 'NONE' | 'SUCCESS'; decision_made_by: 'CUSTOMER_RULES' | 'CUSTOMER_ENDPOINT' | 'LITHIC_DEFAULT' | 'LITHIC_RULES' | 'NETWORK' | 'UNKNOWN'; liability_shift: '3DS_AUTHENTICATED' | 'TOKEN_AUTHENTICATED' | 'NONE'; three_ds_authentication_token: string; }; created: string; financial_account_token: string; merchant: { acceptor_id: string; acquiring_institution_id: string; city: string; country: string; descriptor: string; mcc: string; state: string; }; merchant_amount: number; merchant_authorization_amount: number; merchant_currency: string; network: 'AMEX' | 'INTERLINK' | 'MAESTRO' | 'MASTERCARD' | 'UNKNOWN' | 'VISA'; network_risk_score: number; pos: { entry_mode: { card: 'NOT_PRESENT' | 'PREAUTHORIZED' | 'PRESENT' | 'UNKNOWN'; cardholder: string; pan: string; pin_entered: boolean; }; terminal: { attended: boolean; card_retention_capable: boolean; on_premise: boolean; operator: 'ADMINISTRATIVE' | 'CARDHOLDER' | 'CARD_ACCEPTOR' | 'UNKNOWN'; partial_approval_capable: boolean; pin_capability: 'CAPABLE' | 'INOPERATIVE' | 'NOT_CAPABLE' | 'UNSPECIFIED'; type: string; acceptor_terminal_id?: string; }; }; result: string; service_location: { city: string; country: string; postal_code: string; state: string; street_address: string; }; settled_amount: number; status: 'DECLINED' | 'EXPIRED' | 'PENDING' | 'SETTLED' | 'VOIDED'; tags: object; token_info: { wallet_type: 'APPLE_PAY' | 'GOOGLE_PAY' | 'MASTERPASS' | 'MERCHANT' | 'OTHER' | 'SAMSUNG_PAY'; }; updated: string; events?: { token: string; amount: number; amounts: { cardholder: object; merchant: object; settlement: object; }; created: string; detailed_results: string[]; effective_polarity: 'CREDIT' | 'DEBIT'; network_info: { acquirer: object; amex: object; mastercard: object; visa: object; }; result: string; rule_results: { auth_rule_token: string; explanation: string; name: string; result: string; }[]; type: string; account_type?: 'CHECKING' | 'SAVINGS'; network_specific_data?: { mastercard: object; visa: object; }; }[]; }`\n\n  - `token: string`\n  - `account_token: string`\n  - `acquirer_fee: number`\n  - `acquirer_reference_number: string`\n  - `amount: number`\n  - `amounts: { cardholder: { amount: number; conversion_rate: string; currency: string; }; hold: { amount: number; currency: string; }; merchant: { amount: number; currency: string; }; settlement: { amount: number; currency: string; }; }`\n  - `authorization_amount: number`\n  - `authorization_code: string`\n  - `avs: { address: string; zipcode: string; }`\n  - `card_token: string`\n  - `cardholder_authentication: { authentication_method: 'FRICTIONLESS' | 'CHALLENGE' | 'NONE'; authentication_result: 'ATTEMPTS' | 'DECLINE' | 'NONE' | 'SUCCESS'; decision_made_by: 'CUSTOMER_RULES' | 'CUSTOMER_ENDPOINT' | 'LITHIC_DEFAULT' | 'LITHIC_RULES' | 'NETWORK' | 'UNKNOWN'; liability_shift: '3DS_AUTHENTICATED' | 'TOKEN_AUTHENTICATED' | 'NONE'; three_ds_authentication_token: string; }`\n  - `created: string`\n  - `financial_account_token: string`\n  - `merchant: { acceptor_id: string; acquiring_institution_id: string; city: string; country: string; descriptor: string; mcc: string; state: string; }`\n  - `merchant_amount: number`\n  - `merchant_authorization_amount: number`\n  - `merchant_currency: string`\n  - `network: 'AMEX' | 'INTERLINK' | 'MAESTRO' | 'MASTERCARD' | 'UNKNOWN' | 'VISA'`\n  - `network_risk_score: number`\n  - `pos: { entry_mode: { card: 'NOT_PRESENT' | 'PREAUTHORIZED' | 'PRESENT' | 'UNKNOWN'; cardholder: string; pan: string; pin_entered: boolean; }; terminal: { attended: boolean; card_retention_capable: boolean; on_premise: boolean; operator: 'ADMINISTRATIVE' | 'CARDHOLDER' | 'CARD_ACCEPTOR' | 'UNKNOWN'; partial_approval_capable: boolean; pin_capability: 'CAPABLE' | 'INOPERATIVE' | 'NOT_CAPABLE' | 'UNSPECIFIED'; type: string; acceptor_terminal_id?: string; }; }`\n  - `result: string`\n  - `service_location: { city: string; country: string; postal_code: string; state: string; street_address: string; }`\n  - `settled_amount: number`\n  - `status: 'DECLINED' | 'EXPIRED' | 'PENDING' | 'SETTLED' | 'VOIDED'`\n  - `tags: object`\n  - `token_info: { wallet_type: 'APPLE_PAY' | 'GOOGLE_PAY' | 'MASTERPASS' | 'MERCHANT' | 'OTHER' | 'SAMSUNG_PAY'; }`\n  - `updated: string`\n  - `events?: { token: string; amount: number; amounts: { cardholder: { amount: number; conversion_rate: string; currency: string; }; merchant: { amount: number; currency: string; }; settlement: { amount: number; conversion_rate: string; currency: string; }; }; created: string; detailed_results: string[]; effective_polarity: 'CREDIT' | 'DEBIT'; network_info: { acquirer: { acquirer_reference_number: string; retrieval_reference_number: string; }; amex: { original_transaction_id: string; transaction_id: string; }; mastercard: { banknet_reference_number: string; original_banknet_reference_number: string; original_switch_serial_number: string; switch_serial_number: string; }; visa: { original_transaction_id: string; transaction_id: string; }; }; result: string; rule_results: { auth_rule_token: string; explanation: string; name: string; result: string; }[]; type: string; account_type?: 'CHECKING' | 'SAVINGS'; network_specific_data?: { mastercard: { ecommerce_security_level_indicator: string; on_behalf_service_result: { result_1: string; result_2: string; service: string; }[]; transaction_type_identifier: string; }; visa: { business_application_identifier: string; }; }; }[]`\n\n### Example\n\n```typescript\nimport Lithic from 'lithic';\n\nconst client = new Lithic();\n\nconst transaction = await client.transactions.retrieve('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e');\n\nconsole.log(transaction);\n```",
  },
  {
    name: 'list',
    endpoint: '/v1/transactions',
    httpMethod: 'get',
    summary: 'List card transactions',
    description:
      'List card transactions. All amounts are in the smallest unit of their respective currency (e.g., cents for USD) and inclusive of any acquirer fees.\n',
    stainlessPath: '(resource) transactions > (method) list',
    qualified: 'client.transactions.list',
    params: [
      'account_token?: string;',
      'begin?: string;',
      'card_token?: string;',
      'end?: string;',
      'ending_before?: string;',
      'page_size?: number;',
      "result?: 'APPROVED' | 'DECLINED';",
      'starting_after?: string;',
      "status?: 'PENDING' | 'VOIDED' | 'SETTLED' | 'DECLINED' | 'EXPIRED';",
    ],
    response:
      "{ token: string; account_token: string; acquirer_fee: number; acquirer_reference_number: string; amount: number; amounts: object; authorization_amount: number; authorization_code: string; avs: object; card_token: string; cardholder_authentication: cardholder_authentication; created: string; financial_account_token: string; merchant: merchant; merchant_amount: number; merchant_authorization_amount: number; merchant_currency: string; network: 'AMEX' | 'INTERLINK' | 'MAESTRO' | 'MASTERCARD' | 'UNKNOWN' | 'VISA'; network_risk_score: number; pos: object; result: string; service_location: object; settled_amount: number; status: 'DECLINED' | 'EXPIRED' | 'PENDING' | 'SETTLED' | 'VOIDED'; tags: object; token_info: token_info; updated: string; events?: object[]; }",
    markdown:
      "## list\n\n`client.transactions.list(account_token?: string, begin?: string, card_token?: string, end?: string, ending_before?: string, page_size?: number, result?: 'APPROVED' | 'DECLINED', starting_after?: string, status?: 'PENDING' | 'VOIDED' | 'SETTLED' | 'DECLINED' | 'EXPIRED'): { token: string; account_token: string; acquirer_fee: number; acquirer_reference_number: string; amount: number; amounts: object; authorization_amount: number; authorization_code: string; avs: object; card_token: string; cardholder_authentication: cardholder_authentication; created: string; financial_account_token: string; merchant: merchant; merchant_amount: number; merchant_authorization_amount: number; merchant_currency: string; network: 'AMEX' | 'INTERLINK' | 'MAESTRO' | 'MASTERCARD' | 'UNKNOWN' | 'VISA'; network_risk_score: number; pos: object; result: string; service_location: object; settled_amount: number; status: 'DECLINED' | 'EXPIRED' | 'PENDING' | 'SETTLED' | 'VOIDED'; tags: object; token_info: token_info; updated: string; events?: object[]; }`\n\n**get** `/v1/transactions`\n\nList card transactions. All amounts are in the smallest unit of their respective currency (e.g., cents for USD) and inclusive of any acquirer fees.\n\n\n### Parameters\n\n- `account_token?: string`\n  Filters for transactions associated with a specific account.\n\n\n- `begin?: string`\n  Date string in RFC 3339 format. Only entries created after the specified time will be included. UTC time zone.\n\n- `card_token?: string`\n  Filters for transactions associated with a specific card.\n\n- `end?: string`\n  Date string in RFC 3339 format. Only entries created before the specified time will be included. UTC time zone.\n\n- `ending_before?: string`\n  A cursor representing an item's token before which a page of results should end. Used to retrieve the previous page of results before this item.\n\n- `page_size?: number`\n  Page size (for pagination).\n\n- `result?: 'APPROVED' | 'DECLINED'`\n  Filters for transactions using transaction result field. Can filter by `APPROVED`, and `DECLINED`.\n\n- `starting_after?: string`\n  A cursor representing an item's token after which a page of results should begin. Used to retrieve the next page of results after this item.\n\n- `status?: 'PENDING' | 'VOIDED' | 'SETTLED' | 'DECLINED' | 'EXPIRED'`\n  Filters for transactions using transaction status field.\n\n### Returns\n\n- `{ token: string; account_token: string; acquirer_fee: number; acquirer_reference_number: string; amount: number; amounts: { cardholder: { amount: number; conversion_rate: string; currency: currency; }; hold: { amount: number; currency: currency; }; merchant: { amount: number; currency: currency; }; settlement: { amount: number; currency: currency; }; }; authorization_amount: number; authorization_code: string; avs: { address: string; zipcode: string; }; card_token: string; cardholder_authentication: { authentication_method: 'FRICTIONLESS' | 'CHALLENGE' | 'NONE'; authentication_result: 'ATTEMPTS' | 'DECLINE' | 'NONE' | 'SUCCESS'; decision_made_by: 'CUSTOMER_RULES' | 'CUSTOMER_ENDPOINT' | 'LITHIC_DEFAULT' | 'LITHIC_RULES' | 'NETWORK' | 'UNKNOWN'; liability_shift: '3DS_AUTHENTICATED' | 'TOKEN_AUTHENTICATED' | 'NONE'; three_ds_authentication_token: string; }; created: string; financial_account_token: string; merchant: { acceptor_id: string; acquiring_institution_id: string; city: string; country: string; descriptor: string; mcc: string; state: string; }; merchant_amount: number; merchant_authorization_amount: number; merchant_currency: string; network: 'AMEX' | 'INTERLINK' | 'MAESTRO' | 'MASTERCARD' | 'UNKNOWN' | 'VISA'; network_risk_score: number; pos: { entry_mode: { card: 'NOT_PRESENT' | 'PREAUTHORIZED' | 'PRESENT' | 'UNKNOWN'; cardholder: string; pan: string; pin_entered: boolean; }; terminal: { attended: boolean; card_retention_capable: boolean; on_premise: boolean; operator: 'ADMINISTRATIVE' | 'CARDHOLDER' | 'CARD_ACCEPTOR' | 'UNKNOWN'; partial_approval_capable: boolean; pin_capability: 'CAPABLE' | 'INOPERATIVE' | 'NOT_CAPABLE' | 'UNSPECIFIED'; type: string; acceptor_terminal_id?: string; }; }; result: string; service_location: { city: string; country: string; postal_code: string; state: string; street_address: string; }; settled_amount: number; status: 'DECLINED' | 'EXPIRED' | 'PENDING' | 'SETTLED' | 'VOIDED'; tags: object; token_info: { wallet_type: 'APPLE_PAY' | 'GOOGLE_PAY' | 'MASTERPASS' | 'MERCHANT' | 'OTHER' | 'SAMSUNG_PAY'; }; updated: string; events?: { token: string; amount: number; amounts: { cardholder: object; merchant: object; settlement: object; }; created: string; detailed_results: string[]; effective_polarity: 'CREDIT' | 'DEBIT'; network_info: { acquirer: object; amex: object; mastercard: object; visa: object; }; result: string; rule_results: { auth_rule_token: string; explanation: string; name: string; result: string; }[]; type: string; account_type?: 'CHECKING' | 'SAVINGS'; network_specific_data?: { mastercard: object; visa: object; }; }[]; }`\n\n  - `token: string`\n  - `account_token: string`\n  - `acquirer_fee: number`\n  - `acquirer_reference_number: string`\n  - `amount: number`\n  - `amounts: { cardholder: { amount: number; conversion_rate: string; currency: string; }; hold: { amount: number; currency: string; }; merchant: { amount: number; currency: string; }; settlement: { amount: number; currency: string; }; }`\n  - `authorization_amount: number`\n  - `authorization_code: string`\n  - `avs: { address: string; zipcode: string; }`\n  - `card_token: string`\n  - `cardholder_authentication: { authentication_method: 'FRICTIONLESS' | 'CHALLENGE' | 'NONE'; authentication_result: 'ATTEMPTS' | 'DECLINE' | 'NONE' | 'SUCCESS'; decision_made_by: 'CUSTOMER_RULES' | 'CUSTOMER_ENDPOINT' | 'LITHIC_DEFAULT' | 'LITHIC_RULES' | 'NETWORK' | 'UNKNOWN'; liability_shift: '3DS_AUTHENTICATED' | 'TOKEN_AUTHENTICATED' | 'NONE'; three_ds_authentication_token: string; }`\n  - `created: string`\n  - `financial_account_token: string`\n  - `merchant: { acceptor_id: string; acquiring_institution_id: string; city: string; country: string; descriptor: string; mcc: string; state: string; }`\n  - `merchant_amount: number`\n  - `merchant_authorization_amount: number`\n  - `merchant_currency: string`\n  - `network: 'AMEX' | 'INTERLINK' | 'MAESTRO' | 'MASTERCARD' | 'UNKNOWN' | 'VISA'`\n  - `network_risk_score: number`\n  - `pos: { entry_mode: { card: 'NOT_PRESENT' | 'PREAUTHORIZED' | 'PRESENT' | 'UNKNOWN'; cardholder: string; pan: string; pin_entered: boolean; }; terminal: { attended: boolean; card_retention_capable: boolean; on_premise: boolean; operator: 'ADMINISTRATIVE' | 'CARDHOLDER' | 'CARD_ACCEPTOR' | 'UNKNOWN'; partial_approval_capable: boolean; pin_capability: 'CAPABLE' | 'INOPERATIVE' | 'NOT_CAPABLE' | 'UNSPECIFIED'; type: string; acceptor_terminal_id?: string; }; }`\n  - `result: string`\n  - `service_location: { city: string; country: string; postal_code: string; state: string; street_address: string; }`\n  - `settled_amount: number`\n  - `status: 'DECLINED' | 'EXPIRED' | 'PENDING' | 'SETTLED' | 'VOIDED'`\n  - `tags: object`\n  - `token_info: { wallet_type: 'APPLE_PAY' | 'GOOGLE_PAY' | 'MASTERPASS' | 'MERCHANT' | 'OTHER' | 'SAMSUNG_PAY'; }`\n  - `updated: string`\n  - `events?: { token: string; amount: number; amounts: { cardholder: { amount: number; conversion_rate: string; currency: string; }; merchant: { amount: number; currency: string; }; settlement: { amount: number; conversion_rate: string; currency: string; }; }; created: string; detailed_results: string[]; effective_polarity: 'CREDIT' | 'DEBIT'; network_info: { acquirer: { acquirer_reference_number: string; retrieval_reference_number: string; }; amex: { original_transaction_id: string; transaction_id: string; }; mastercard: { banknet_reference_number: string; original_banknet_reference_number: string; original_switch_serial_number: string; switch_serial_number: string; }; visa: { original_transaction_id: string; transaction_id: string; }; }; result: string; rule_results: { auth_rule_token: string; explanation: string; name: string; result: string; }[]; type: string; account_type?: 'CHECKING' | 'SAVINGS'; network_specific_data?: { mastercard: { ecommerce_security_level_indicator: string; on_behalf_service_result: { result_1: string; result_2: string; service: string; }[]; transaction_type_identifier: string; }; visa: { business_application_identifier: string; }; }; }[]`\n\n### Example\n\n```typescript\nimport Lithic from 'lithic';\n\nconst client = new Lithic();\n\n// Automatically fetches more pages as needed.\nfor await (const transaction of client.transactions.list()) {\n  console.log(transaction);\n}\n```",
  },
  {
    name: 'expire_authorization',
    endpoint: '/v1/transactions/{transaction_token}/expire_authorization',
    httpMethod: 'post',
    summary: 'Expire an authorization',
    description: 'Expire authorization',
    stainlessPath: '(resource) transactions > (method) expire_authorization',
    qualified: 'client.transactions.expireAuthorization',
    params: ['transaction_token: string;'],
    markdown:
      "## expire_authorization\n\n`client.transactions.expireAuthorization(transaction_token: string): void`\n\n**post** `/v1/transactions/{transaction_token}/expire_authorization`\n\nExpire authorization\n\n### Parameters\n\n- `transaction_token: string`\n\n### Example\n\n```typescript\nimport Lithic from 'lithic';\n\nconst client = new Lithic();\n\nawait client.transactions.expireAuthorization('00000000-0000-0000-0000-000000000000')\n```",
  },
  {
    name: 'simulate_authorization',
    endpoint: '/v1/simulate/authorize',
    httpMethod: 'post',
    summary: 'Simulate authorization',
    description:
      'Simulates an authorization request from the card network as if it came from a merchant acquirer.\nIf you are configured for ASA, simulating authorizations requires your ASA client to be set up properly, i.e. be able to respond to the ASA request with a valid JSON. For users that are not configured for ASA, a daily transaction limit of $5000 USD is applied by default. You can update this limit via the [update account](https://docs.lithic.com/reference/patchaccountbytoken) endpoint.\n',
    stainlessPath: '(resource) transactions > (method) simulate_authorization',
    qualified: 'client.transactions.simulateAuthorization',
    params: [
      'amount: number;',
      'descriptor: string;',
      'pan: string;',
      'mcc?: string;',
      'merchant_acceptor_city?: string;',
      'merchant_acceptor_country?: string;',
      'merchant_acceptor_id?: string;',
      'merchant_acceptor_state?: string;',
      'merchant_amount?: number;',
      'merchant_currency?: string;',
      'partial_approval_capable?: boolean;',
      'pin?: string;',
      'status?: string;',
    ],
    response: '{ token?: string; debugging_request_id?: string; }',
    markdown:
      "## simulate_authorization\n\n`client.transactions.simulateAuthorization(amount: number, descriptor: string, pan: string, mcc?: string, merchant_acceptor_city?: string, merchant_acceptor_country?: string, merchant_acceptor_id?: string, merchant_acceptor_state?: string, merchant_amount?: number, merchant_currency?: string, partial_approval_capable?: boolean, pin?: string, status?: string): { token?: string; debugging_request_id?: string; }`\n\n**post** `/v1/simulate/authorize`\n\nSimulates an authorization request from the card network as if it came from a merchant acquirer.\nIf you are configured for ASA, simulating authorizations requires your ASA client to be set up properly, i.e. be able to respond to the ASA request with a valid JSON. For users that are not configured for ASA, a daily transaction limit of $5000 USD is applied by default. You can update this limit via the [update account](https://docs.lithic.com/reference/patchaccountbytoken) endpoint.\n\n\n### Parameters\n\n- `amount: number`\n  Amount (in cents) to authorize. For credit authorizations and financial credit authorizations, any value entered will be converted into a negative amount in the simulated transaction. For example, entering 100 in this field will result in a -100 amount in the transaction. For balance inquiries, this field must be set to 0.\n\n- `descriptor: string`\n  Merchant descriptor.\n\n- `pan: string`\n  Sixteen digit card number.\n\n- `mcc?: string`\n  Merchant category code for the transaction to be simulated. A four-digit number listed in ISO 18245.\nSupported merchant category codes can be found [here](https://docs.lithic.com/docs/transactions#merchant-category-codes-mccs).\n\n\n- `merchant_acceptor_city?: string`\n  Merchant acceptor city\n\n- `merchant_acceptor_country?: string`\n  Merchant acceptor country code (ISO 3166-1 alpha-3)\n\n- `merchant_acceptor_id?: string`\n  Unique identifier to identify the payment card acceptor.\n\n- `merchant_acceptor_state?: string`\n  Merchant acceptor state/province (ISO 3166-2 subdivision code)\n\n- `merchant_amount?: number`\n  Amount of the transaction to be simulated in currency specified in merchant_currency, including any acquirer fees.\n\n- `merchant_currency?: string`\n  3-character alphabetic ISO 4217 currency code. Note: Simulator only accepts USD, GBP, EUR and defaults to GBP if another ISO 4217 code is provided\n\n- `partial_approval_capable?: boolean`\n  Set to true if the terminal is capable of partial approval otherwise false.\nPartial approval is when part of a transaction is approved and another\npayment must be used for the remainder.\n\n\n- `pin?: string`\n  Simulate entering a PIN. If omitted, PIN check will not be performed.\n\n- `status?: string`\n  Type of event to simulate.\n* `AUTHORIZATION` is a dual message purchase authorization, meaning a subsequent clearing step is required to settle the transaction.\n* `BALANCE_INQUIRY` is a $0 authorization requesting the balance held on the card, and is most often observed when a cardholder requests to view a card's balance at an ATM.\n* `CREDIT_AUTHORIZATION` is a dual message request from a merchant to authorize a refund, meaning a subsequent clearing step is required to settle the transaction.\n* `FINANCIAL_AUTHORIZATION` is a single message request from a merchant to debit funds immediately (such as an ATM withdrawal), and no subsequent clearing is required to settle the transaction.\n* `FINANCIAL_CREDIT_AUTHORIZATION` is a single message request from a merchant to credit funds immediately, and no subsequent clearing is required to settle the transaction.\n\n### Returns\n\n- `{ token?: string; debugging_request_id?: string; }`\n\n  - `token?: string`\n  - `debugging_request_id?: string`\n\n### Example\n\n```typescript\nimport Lithic from 'lithic';\n\nconst client = new Lithic();\n\nconst response = await client.transactions.simulateAuthorization({\n  amount: 3831,\n  descriptor: 'COFFEE SHOP',\n  pan: '4111111289144142',\n});\n\nconsole.log(response);\n```",
  },
  {
    name: 'simulate_authorization_advice',
    endpoint: '/v1/simulate/authorization_advice',
    httpMethod: 'post',
    summary: 'Simulate authorization advice',
    description:
      'Simulates an authorization advice from the card network as if it came from a merchant acquirer. An authorization advice changes the pending amount of the transaction.\n',
    stainlessPath: '(resource) transactions > (method) simulate_authorization_advice',
    qualified: 'client.transactions.simulateAuthorizationAdvice',
    params: ['token: string;', 'amount: number;'],
    response: '{ token?: string; debugging_request_id?: string; }',
    markdown:
      "## simulate_authorization_advice\n\n`client.transactions.simulateAuthorizationAdvice(token: string, amount: number): { token?: string; debugging_request_id?: string; }`\n\n**post** `/v1/simulate/authorization_advice`\n\nSimulates an authorization advice from the card network as if it came from a merchant acquirer. An authorization advice changes the pending amount of the transaction.\n\n\n### Parameters\n\n- `token: string`\n  The transaction token returned from the /v1/simulate/authorize. response.\n\n- `amount: number`\n  Amount (in cents) to authorize. This amount will override the transaction's amount that was originally set by /v1/simulate/authorize.\n\n### Returns\n\n- `{ token?: string; debugging_request_id?: string; }`\n\n  - `token?: string`\n  - `debugging_request_id?: string`\n\n### Example\n\n```typescript\nimport Lithic from 'lithic';\n\nconst client = new Lithic();\n\nconst response = await client.transactions.simulateAuthorizationAdvice({ token: 'fabd829d-7f7b-4432-a8f2-07ea4889aaac', amount: 3831 });\n\nconsole.log(response);\n```",
  },
  {
    name: 'simulate_clearing',
    endpoint: '/v1/simulate/clearing',
    httpMethod: 'post',
    summary: 'Simulate clearing',
    description:
      'Clears an existing authorization, either debit or credit. After this event, the transaction transitions from `PENDING` to `SETTLED` status.\n\nIf `amount` is not set, the full amount of the transaction will be cleared. Transactions that have already cleared, either partially or fully, cannot be cleared again using this endpoint.\n',
    stainlessPath: '(resource) transactions > (method) simulate_clearing',
    qualified: 'client.transactions.simulateClearing',
    params: ['token: string;', 'amount?: number;'],
    response: '{ debugging_request_id?: string; }',
    markdown:
      "## simulate_clearing\n\n`client.transactions.simulateClearing(token: string, amount?: number): { debugging_request_id?: string; }`\n\n**post** `/v1/simulate/clearing`\n\nClears an existing authorization, either debit or credit. After this event, the transaction transitions from `PENDING` to `SETTLED` status.\n\nIf `amount` is not set, the full amount of the transaction will be cleared. Transactions that have already cleared, either partially or fully, cannot be cleared again using this endpoint.\n\n\n### Parameters\n\n- `token: string`\n  The transaction token returned from the /v1/simulate/authorize response.\n\n- `amount?: number`\n  Amount (in cents) to clear. Typically this will match the amount in the original authorization, but can be higher or lower. The sign of this amount will automatically match the sign of the original authorization's amount. For example, entering 100 in this field will result in a -100 amount in the transaction, if the original authorization is a credit authorization.\n\nIf `amount` is not set, the full amount of the transaction will be cleared. Transactions that have already cleared, either partially or fully, cannot be cleared again using this endpoint.\n\n\n### Returns\n\n- `{ debugging_request_id?: string; }`\n\n  - `debugging_request_id?: string`\n\n### Example\n\n```typescript\nimport Lithic from 'lithic';\n\nconst client = new Lithic();\n\nconst response = await client.transactions.simulateClearing({ token: 'fabd829d-7f7b-4432-a8f2-07ea4889aaac' });\n\nconsole.log(response);\n```",
  },
  {
    name: 'simulate_credit_authorization',
    endpoint: '/v1/simulate/credit_authorization_advice',
    httpMethod: 'post',
    summary: 'Simulate credit authorization advice',
    description:
      'Simulates a credit authorization advice from the card network.\nThis message indicates that the network approved a credit authorization on your behalf.\n',
    stainlessPath: '(resource) transactions > (method) simulate_credit_authorization',
    qualified: 'client.transactions.simulateCreditAuthorization',
    params: [
      'amount: number;',
      'descriptor: string;',
      'pan: string;',
      'mcc?: string;',
      'merchant_acceptor_city?: string;',
      'merchant_acceptor_country?: string;',
      'merchant_acceptor_id?: string;',
      'merchant_acceptor_state?: string;',
    ],
    response: '{ token?: string; debugging_request_id?: string; }',
    markdown:
      "## simulate_credit_authorization\n\n`client.transactions.simulateCreditAuthorization(amount: number, descriptor: string, pan: string, mcc?: string, merchant_acceptor_city?: string, merchant_acceptor_country?: string, merchant_acceptor_id?: string, merchant_acceptor_state?: string): { token?: string; debugging_request_id?: string; }`\n\n**post** `/v1/simulate/credit_authorization_advice`\n\nSimulates a credit authorization advice from the card network.\nThis message indicates that the network approved a credit authorization on your behalf.\n\n\n### Parameters\n\n- `amount: number`\n  Amount (in cents). Any value entered will be converted into a negative amount in the simulated transaction. For example, entering 100 in this field will appear as a -100 amount in the transaction.\n\n- `descriptor: string`\n  Merchant descriptor.\n\n- `pan: string`\n  Sixteen digit card number.\n\n- `mcc?: string`\n  Merchant category code for the transaction to be simulated. A four-digit number listed in ISO 18245.\nSupported merchant category codes can be found [here](https://docs.lithic.com/docs/transactions#merchant-category-codes-mccs).\n\n\n- `merchant_acceptor_city?: string`\n  Merchant acceptor city\n\n- `merchant_acceptor_country?: string`\n  Merchant acceptor country code (ISO 3166-1 alpha-3)\n\n- `merchant_acceptor_id?: string`\n  Unique identifier to identify the payment card acceptor.\n\n- `merchant_acceptor_state?: string`\n  Merchant acceptor state/province (ISO 3166-2 subdivision code)\n\n### Returns\n\n- `{ token?: string; debugging_request_id?: string; }`\n\n  - `token?: string`\n  - `debugging_request_id?: string`\n\n### Example\n\n```typescript\nimport Lithic from 'lithic';\n\nconst client = new Lithic();\n\nconst response = await client.transactions.simulateCreditAuthorization({\n  amount: 3831,\n  descriptor: 'COFFEE SHOP',\n  pan: '4111111289144142',\n});\n\nconsole.log(response);\n```",
  },
  {
    name: 'simulate_credit_authorization_advice',
    endpoint: '/v1/simulate/credit_authorization_advice',
    httpMethod: 'post',
    summary: 'Simulate credit authorization advice',
    description:
      'Simulates a credit authorization advice from the card network.\nThis message indicates that the network approved a credit authorization on your behalf.\n',
    stainlessPath: '(resource) transactions > (method) simulate_credit_authorization_advice',
    qualified: 'client.transactions.simulateCreditAuthorizationAdvice',
    params: [
      'amount: number;',
      'descriptor: string;',
      'pan: string;',
      'mcc?: string;',
      'merchant_acceptor_city?: string;',
      'merchant_acceptor_country?: string;',
      'merchant_acceptor_id?: string;',
      'merchant_acceptor_state?: string;',
    ],
    response: '{ token?: string; debugging_request_id?: string; }',
    markdown:
      "## simulate_credit_authorization_advice\n\n`client.transactions.simulateCreditAuthorizationAdvice(amount: number, descriptor: string, pan: string, mcc?: string, merchant_acceptor_city?: string, merchant_acceptor_country?: string, merchant_acceptor_id?: string, merchant_acceptor_state?: string): { token?: string; debugging_request_id?: string; }`\n\n**post** `/v1/simulate/credit_authorization_advice`\n\nSimulates a credit authorization advice from the card network.\nThis message indicates that the network approved a credit authorization on your behalf.\n\n\n### Parameters\n\n- `amount: number`\n  Amount (in cents). Any value entered will be converted into a negative amount in the simulated transaction. For example, entering 100 in this field will appear as a -100 amount in the transaction.\n\n- `descriptor: string`\n  Merchant descriptor.\n\n- `pan: string`\n  Sixteen digit card number.\n\n- `mcc?: string`\n  Merchant category code for the transaction to be simulated. A four-digit number listed in ISO 18245.\nSupported merchant category codes can be found [here](https://docs.lithic.com/docs/transactions#merchant-category-codes-mccs).\n\n\n- `merchant_acceptor_city?: string`\n  Merchant acceptor city\n\n- `merchant_acceptor_country?: string`\n  Merchant acceptor country code (ISO 3166-1 alpha-3)\n\n- `merchant_acceptor_id?: string`\n  Unique identifier to identify the payment card acceptor.\n\n- `merchant_acceptor_state?: string`\n  Merchant acceptor state/province (ISO 3166-2 subdivision code)\n\n### Returns\n\n- `{ token?: string; debugging_request_id?: string; }`\n\n  - `token?: string`\n  - `debugging_request_id?: string`\n\n### Example\n\n```typescript\nimport Lithic from 'lithic';\n\nconst client = new Lithic();\n\nconst response = await client.transactions.simulateCreditAuthorizationAdvice({\n  amount: 3831,\n  descriptor: 'COFFEE SHOP',\n  pan: '4111111289144142',\n});\n\nconsole.log(response);\n```",
  },
  {
    name: 'simulate_return',
    endpoint: '/v1/simulate/return',
    httpMethod: 'post',
    summary: 'Simulate return',
    description:
      'Returns, or refunds, an amount back to a card. Returns simulated via this endpoint clear immediately, without prior authorization, and result in a `SETTLED` transaction status.\n',
    stainlessPath: '(resource) transactions > (method) simulate_return',
    qualified: 'client.transactions.simulateReturn',
    params: ['amount: number;', 'descriptor: string;', 'pan: string;'],
    response: '{ token?: string; debugging_request_id?: string; }',
    markdown:
      "## simulate_return\n\n`client.transactions.simulateReturn(amount: number, descriptor: string, pan: string): { token?: string; debugging_request_id?: string; }`\n\n**post** `/v1/simulate/return`\n\nReturns, or refunds, an amount back to a card. Returns simulated via this endpoint clear immediately, without prior authorization, and result in a `SETTLED` transaction status.\n\n\n### Parameters\n\n- `amount: number`\n  Amount (in cents) to authorize.\n\n- `descriptor: string`\n  Merchant descriptor.\n\n- `pan: string`\n  Sixteen digit card number.\n\n### Returns\n\n- `{ token?: string; debugging_request_id?: string; }`\n\n  - `token?: string`\n  - `debugging_request_id?: string`\n\n### Example\n\n```typescript\nimport Lithic from 'lithic';\n\nconst client = new Lithic();\n\nconst response = await client.transactions.simulateReturn({\n  amount: 3831,\n  descriptor: 'COFFEE SHOP',\n  pan: '4111111289144142',\n});\n\nconsole.log(response);\n```",
  },
  {
    name: 'simulate_return_reversal',
    endpoint: '/v1/simulate/return_reversal',
    httpMethod: 'post',
    summary: 'Simulate return reversal',
    description:
      'Reverses a return, i.e. a credit transaction with a `SETTLED` status. Returns can be financial credit authorizations, or credit authorizations that have cleared.\n',
    stainlessPath: '(resource) transactions > (method) simulate_return_reversal',
    qualified: 'client.transactions.simulateReturnReversal',
    params: ['token: string;'],
    response: '{ debugging_request_id?: string; }',
    markdown:
      "## simulate_return_reversal\n\n`client.transactions.simulateReturnReversal(token: string): { debugging_request_id?: string; }`\n\n**post** `/v1/simulate/return_reversal`\n\nReverses a return, i.e. a credit transaction with a `SETTLED` status. Returns can be financial credit authorizations, or credit authorizations that have cleared.\n\n\n### Parameters\n\n- `token: string`\n  The transaction token returned from the /v1/simulate/authorize response.\n\n### Returns\n\n- `{ debugging_request_id?: string; }`\n\n  - `debugging_request_id?: string`\n\n### Example\n\n```typescript\nimport Lithic from 'lithic';\n\nconst client = new Lithic();\n\nconst response = await client.transactions.simulateReturnReversal({ token: 'fabd829d-7f7b-4432-a8f2-07ea4889aaac' });\n\nconsole.log(response);\n```",
  },
  {
    name: 'simulate_void',
    endpoint: '/v1/simulate/void',
    httpMethod: 'post',
    summary: 'Simulate void',
    description:
      'Voids a pending authorization. If `amount` is not set, the full amount will be voided. Can be used on partially voided transactions but not partially cleared transactions. _Simulating an authorization expiry on credit authorizations or credit authorization advice is not currently supported but will be added soon._\n',
    stainlessPath: '(resource) transactions > (method) simulate_void',
    qualified: 'client.transactions.simulateVoid',
    params: [
      'token: string;',
      'amount?: number;',
      "type?: 'AUTHORIZATION_EXPIRY' | 'AUTHORIZATION_REVERSAL';",
    ],
    response: '{ debugging_request_id?: string; }',
    markdown:
      "## simulate_void\n\n`client.transactions.simulateVoid(token: string, amount?: number, type?: 'AUTHORIZATION_EXPIRY' | 'AUTHORIZATION_REVERSAL'): { debugging_request_id?: string; }`\n\n**post** `/v1/simulate/void`\n\nVoids a pending authorization. If `amount` is not set, the full amount will be voided. Can be used on partially voided transactions but not partially cleared transactions. _Simulating an authorization expiry on credit authorizations or credit authorization advice is not currently supported but will be added soon._\n\n\n### Parameters\n\n- `token: string`\n  The transaction token returned from the /v1/simulate/authorize response.\n\n- `amount?: number`\n  Amount (in cents) to void. Typically this will match the amount in the original authorization, but can be less. Applies to authorization reversals only. An authorization expiry will always apply to the full pending amount.\n\n- `type?: 'AUTHORIZATION_EXPIRY' | 'AUTHORIZATION_REVERSAL'`\n  Type of event to simulate. Defaults to `AUTHORIZATION_REVERSAL`.\n\n* `AUTHORIZATION_EXPIRY` indicates authorization has expired and been reversed by Lithic.\n* `AUTHORIZATION_REVERSAL` indicates authorization was reversed by the merchant.\n\n### Returns\n\n- `{ debugging_request_id?: string; }`\n\n  - `debugging_request_id?: string`\n\n### Example\n\n```typescript\nimport Lithic from 'lithic';\n\nconst client = new Lithic();\n\nconst response = await client.transactions.simulateVoid({ token: 'fabd829d-7f7b-4432-a8f2-07ea4889aaac' });\n\nconsole.log(response);\n```",
  },
  {
    name: 'retrieve',
    endpoint: '/v1/transactions/{transaction_token}/enhanced_commercial_data',
    httpMethod: 'get',
    summary: 'List enhanced commercial data',
    description:
      'Get all L2/L3 enhanced commercial data associated with a transaction. Not available in sandbox.',
    stainlessPath: '(resource) transactions.enhanced_commercial_data > (method) retrieve',
    qualified: 'client.transactions.enhancedCommercialData.retrieve',
    params: ['transaction_token: string;'],
    response:
      '{ data: { token: string; common: object; event_token: string; fleet: object[]; transaction_token: string; }[]; }',
    markdown:
      "## retrieve\n\n`client.transactions.enhancedCommercialData.retrieve(transaction_token: string): { data: enhanced_data[]; }`\n\n**get** `/v1/transactions/{transaction_token}/enhanced_commercial_data`\n\nGet all L2/L3 enhanced commercial data associated with a transaction. Not available in sandbox.\n\n### Parameters\n\n- `transaction_token: string`\n\n### Returns\n\n- `{ data: { token: string; common: object; event_token: string; fleet: object[]; transaction_token: string; }[]; }`\n\n  - `data: { token: string; common: { line_items: { amount?: string; description?: string; product_code?: string; quantity?: string; }[]; tax: { amount?: number; exempt?: 'TAX_INCLUDED' | 'TAX_NOT_INCLUDED' | 'NOT_SUPPORTED'; merchant_tax_id?: string; }; customer_reference_number?: string; merchant_reference_number?: string; order_date?: string; }; event_token: string; fleet: { amount_totals: { discount?: number; gross_sale?: number; net_sale?: number; }; fuel: { quantity?: string; type?: string; unit_of_measure?: 'GALLONS' | 'LITERS' | 'POUNDS' | 'KILOGRAMS' | 'IMPERIAL_GALLONS' | 'NOT_APPLICABLE' | 'UNKNOWN'; unit_price?: number; }; driver_number?: string; odometer?: number; service_type?: 'UNKNOWN' | 'UNDEFINED' | 'SELF_SERVICE' | 'FULL_SERVICE' | 'NON_FUEL_ONLY'; vehicle_number?: string; }[]; transaction_token: string; }[]`\n\n### Example\n\n```typescript\nimport Lithic from 'lithic';\n\nconst client = new Lithic();\n\nconst enhancedCommercialData = await client.transactions.enhancedCommercialData.retrieve('00000000-0000-0000-0000-000000000000');\n\nconsole.log(enhancedCommercialData);\n```",
  },
  {
    name: 'retrieve',
    endpoint: '/v1/transactions/events/{event_token}/enhanced_commercial_data',
    httpMethod: 'get',
    summary: 'Get enhanced commercial data',
    description:
      'Get L2/L3 enhanced commercial data associated with a transaction event. Not available in sandbox.',
    stainlessPath: '(resource) transactions.events.enhanced_commercial_data > (method) retrieve',
    qualified: 'client.transactions.events.enhancedCommercialData.retrieve',
    params: ['event_token: string;'],
    response:
      "{ token: string; common: { line_items: { amount?: string; description?: string; product_code?: string; quantity?: string; }[]; tax: { amount?: number; exempt?: 'TAX_INCLUDED' | 'TAX_NOT_INCLUDED' | 'NOT_SUPPORTED'; merchant_tax_id?: string; }; customer_reference_number?: string; merchant_reference_number?: string; order_date?: string; }; event_token: string; fleet: { amount_totals: { discount?: number; gross_sale?: number; net_sale?: number; }; fuel: { quantity?: string; type?: string; unit_of_measure?: 'GALLONS' | 'LITERS' | 'POUNDS' | 'KILOGRAMS' | 'IMPERIAL_GALLONS' | 'NOT_APPLICABLE' | 'UNKNOWN'; unit_price?: number; }; driver_number?: string; odometer?: number; service_type?: 'UNKNOWN' | 'UNDEFINED' | 'SELF_SERVICE' | 'FULL_SERVICE' | 'NON_FUEL_ONLY'; vehicle_number?: string; }[]; transaction_token: string; }",
    markdown:
      "## retrieve\n\n`client.transactions.events.enhancedCommercialData.retrieve(event_token: string): { token: string; common: object; event_token: string; fleet: object[]; transaction_token: string; }`\n\n**get** `/v1/transactions/events/{event_token}/enhanced_commercial_data`\n\nGet L2/L3 enhanced commercial data associated with a transaction event. Not available in sandbox.\n\n### Parameters\n\n- `event_token: string`\n\n### Returns\n\n- `{ token: string; common: { line_items: { amount?: string; description?: string; product_code?: string; quantity?: string; }[]; tax: { amount?: number; exempt?: 'TAX_INCLUDED' | 'TAX_NOT_INCLUDED' | 'NOT_SUPPORTED'; merchant_tax_id?: string; }; customer_reference_number?: string; merchant_reference_number?: string; order_date?: string; }; event_token: string; fleet: { amount_totals: { discount?: number; gross_sale?: number; net_sale?: number; }; fuel: { quantity?: string; type?: string; unit_of_measure?: 'GALLONS' | 'LITERS' | 'POUNDS' | 'KILOGRAMS' | 'IMPERIAL_GALLONS' | 'NOT_APPLICABLE' | 'UNKNOWN'; unit_price?: number; }; driver_number?: string; odometer?: number; service_type?: 'UNKNOWN' | 'UNDEFINED' | 'SELF_SERVICE' | 'FULL_SERVICE' | 'NON_FUEL_ONLY'; vehicle_number?: string; }[]; transaction_token: string; }`\n\n  - `token: string`\n  - `common: { line_items: { amount?: string; description?: string; product_code?: string; quantity?: string; }[]; tax: { amount?: number; exempt?: 'TAX_INCLUDED' | 'TAX_NOT_INCLUDED' | 'NOT_SUPPORTED'; merchant_tax_id?: string; }; customer_reference_number?: string; merchant_reference_number?: string; order_date?: string; }`\n  - `event_token: string`\n  - `fleet: { amount_totals: { discount?: number; gross_sale?: number; net_sale?: number; }; fuel: { quantity?: string; type?: string; unit_of_measure?: 'GALLONS' | 'LITERS' | 'POUNDS' | 'KILOGRAMS' | 'IMPERIAL_GALLONS' | 'NOT_APPLICABLE' | 'UNKNOWN'; unit_price?: number; }; driver_number?: string; odometer?: number; service_type?: 'UNKNOWN' | 'UNDEFINED' | 'SELF_SERVICE' | 'FULL_SERVICE' | 'NON_FUEL_ONLY'; vehicle_number?: string; }[]`\n  - `transaction_token: string`\n\n### Example\n\n```typescript\nimport Lithic from 'lithic';\n\nconst client = new Lithic();\n\nconst enhancedData = await client.transactions.events.enhancedCommercialData.retrieve('00000000-0000-0000-0000-000000000000');\n\nconsole.log(enhancedData);\n```",
  },
  {
    name: 'create',
    endpoint: '/v1/responder_endpoints',
    httpMethod: 'post',
    summary: 'Enroll a responder endpoint',
    description: 'Enroll a responder endpoint',
    stainlessPath: '(resource) responder_endpoints > (method) create',
    qualified: 'client.responderEndpoints.create',
    params: [
      "type?: 'AUTH_STREAM_ACCESS' | 'THREE_DS_DECISIONING' | 'TOKENIZATION_DECISIONING';",
      'url?: string;',
    ],
    response: '{ enrolled?: boolean; }',
    markdown:
      "## create\n\n`client.responderEndpoints.create(type?: 'AUTH_STREAM_ACCESS' | 'THREE_DS_DECISIONING' | 'TOKENIZATION_DECISIONING', url?: string): { enrolled?: boolean; }`\n\n**post** `/v1/responder_endpoints`\n\nEnroll a responder endpoint\n\n### Parameters\n\n- `type?: 'AUTH_STREAM_ACCESS' | 'THREE_DS_DECISIONING' | 'TOKENIZATION_DECISIONING'`\n  The type of the endpoint.\n\n- `url?: string`\n  The URL for the responder endpoint (must be http(s)).\n\n### Returns\n\n- `{ enrolled?: boolean; }`\n\n  - `enrolled?: boolean`\n\n### Example\n\n```typescript\nimport Lithic from 'lithic';\n\nconst client = new Lithic();\n\nconst responderEndpoint = await client.responderEndpoints.create();\n\nconsole.log(responderEndpoint);\n```",
  },
  {
    name: 'delete',
    endpoint: '/v1/responder_endpoints',
    httpMethod: 'delete',
    summary: 'Disenroll a responder endpoint',
    description: 'Disenroll a responder endpoint',
    stainlessPath: '(resource) responder_endpoints > (method) delete',
    qualified: 'client.responderEndpoints.delete',
    params: ["type: 'AUTH_STREAM_ACCESS' | 'THREE_DS_DECISIONING' | 'TOKENIZATION_DECISIONING';"],
    markdown:
      "## delete\n\n`client.responderEndpoints.delete(type: 'AUTH_STREAM_ACCESS' | 'THREE_DS_DECISIONING' | 'TOKENIZATION_DECISIONING'): void`\n\n**delete** `/v1/responder_endpoints`\n\nDisenroll a responder endpoint\n\n### Parameters\n\n- `type: 'AUTH_STREAM_ACCESS' | 'THREE_DS_DECISIONING' | 'TOKENIZATION_DECISIONING'`\n  The type of the endpoint.\n\n### Example\n\n```typescript\nimport Lithic from 'lithic';\n\nconst client = new Lithic();\n\nawait client.responderEndpoints.delete({ type: 'AUTH_STREAM_ACCESS' })\n```",
  },
  {
    name: 'check_status',
    endpoint: '/v1/responder_endpoints',
    httpMethod: 'get',
    summary: 'Check the status of a responder endpoint',
    description: 'Check the status of a responder endpoint',
    stainlessPath: '(resource) responder_endpoints > (method) check_status',
    qualified: 'client.responderEndpoints.checkStatus',
    params: ["type: 'AUTH_STREAM_ACCESS' | 'THREE_DS_DECISIONING' | 'TOKENIZATION_DECISIONING';"],
    response: '{ enrolled?: boolean; url?: string; }',
    markdown:
      "## check_status\n\n`client.responderEndpoints.checkStatus(type: 'AUTH_STREAM_ACCESS' | 'THREE_DS_DECISIONING' | 'TOKENIZATION_DECISIONING'): { enrolled?: boolean; url?: string; }`\n\n**get** `/v1/responder_endpoints`\n\nCheck the status of a responder endpoint\n\n### Parameters\n\n- `type: 'AUTH_STREAM_ACCESS' | 'THREE_DS_DECISIONING' | 'TOKENIZATION_DECISIONING'`\n  The type of the endpoint.\n\n### Returns\n\n- `{ enrolled?: boolean; url?: string; }`\n\n  - `enrolled?: boolean`\n  - `url?: string`\n\n### Example\n\n```typescript\nimport Lithic from 'lithic';\n\nconst client = new Lithic();\n\nconst responderEndpointStatus = await client.responderEndpoints.checkStatus({ type: 'AUTH_STREAM_ACCESS' });\n\nconsole.log(responderEndpointStatus);\n```",
  },
  {
    name: 'create',
    endpoint: '/v1/external_bank_accounts',
    httpMethod: 'post',
    summary: 'Create external bank account',
    description: 'Creates an external bank account within a program or Lithic account.',
    stainlessPath: '(resource) external_bank_accounts > (method) create',
    qualified: 'client.externalBankAccounts.create',
    params: [
      "{ account_number: string; country: string; currency: string; financial_account_token: string; owner: string; owner_type: 'INDIVIDUAL' | 'BUSINESS'; routing_number: string; type: 'CHECKING' | 'SAVINGS'; verification_method: 'MANUAL' | 'MICRO_DEPOSIT' | 'PRENOTE' | 'EXTERNALLY_VERIFIED' | 'UNVERIFIED'; account_token?: string; address?: { address1: string; city: string; country: string; postal_code: string; state: string; address2?: string; }; company_id?: string; dob?: string; doing_business_as?: string; name?: string; user_defined_id?: string; verification_enforcement?: boolean; } | { account_number: string; country: string; currency: string; owner: string; owner_type: 'INDIVIDUAL' | 'BUSINESS'; routing_number: string; type: 'CHECKING' | 'SAVINGS'; verification_method: 'EXTERNALLY_VERIFIED'; account_token?: string; address?: { address1: string; city: string; country: string; postal_code: string; state: string; address2?: string; }; company_id?: string; dob?: string; doing_business_as?: string; name?: string; user_defined_id?: string; } | { account_number: string; country: string; currency: string; owner: string; owner_type: 'INDIVIDUAL' | 'BUSINESS'; routing_number: string; type: 'CHECKING' | 'SAVINGS'; verification_method: 'UNVERIFIED'; account_token?: string; address?: { address1: string; city: string; country: string; postal_code: string; state: string; address2?: string; }; company_id?: string; dob?: string; doing_business_as?: string; name?: string; user_defined_id?: string; };",
    ],
    response:
      "{ token: string; country: string; created: string; currency: string; last_four: string; owner: string; owner_type: 'BUSINESS' | 'INDIVIDUAL'; routing_number: string; state: 'ENABLED' | 'CLOSED' | 'PAUSED'; type: 'CHECKING' | 'SAVINGS'; verification_attempts: number; verification_method: 'MANUAL' | 'MICRO_DEPOSIT' | 'PLAID' | 'PRENOTE'; verification_state: 'PENDING' | 'ENABLED' | 'FAILED_VERIFICATION' | 'INSUFFICIENT_FUNDS'; account_token?: string; address?: { address1: string; city: string; country: string; postal_code: string; state: string; address2?: string; }; company_id?: string; dob?: string; doing_business_as?: string; financial_account_token?: string; name?: string; user_defined_id?: string; verification_failed_reason?: string; }",
  },
  {
    name: 'retrieve',
    endpoint: '/v1/external_bank_accounts/{external_bank_account_token}',
    httpMethod: 'get',
    summary: 'Get external bank account by token',
    description: 'Get the external bank account by token.',
    stainlessPath: '(resource) external_bank_accounts > (method) retrieve',
    qualified: 'client.externalBankAccounts.retrieve',
    params: ['external_bank_account_token: string;'],
    response:
      "{ token: string; country: string; created: string; currency: string; last_four: string; owner: string; owner_type: 'BUSINESS' | 'INDIVIDUAL'; routing_number: string; state: 'ENABLED' | 'CLOSED' | 'PAUSED'; type: 'CHECKING' | 'SAVINGS'; verification_attempts: number; verification_method: 'MANUAL' | 'MICRO_DEPOSIT' | 'PLAID' | 'PRENOTE'; verification_state: 'PENDING' | 'ENABLED' | 'FAILED_VERIFICATION' | 'INSUFFICIENT_FUNDS'; account_token?: string; address?: { address1: string; city: string; country: string; postal_code: string; state: string; address2?: string; }; company_id?: string; dob?: string; doing_business_as?: string; financial_account_token?: string; name?: string; user_defined_id?: string; verification_failed_reason?: string; }",
    markdown:
      "## retrieve\n\n`client.externalBankAccounts.retrieve(external_bank_account_token: string): { token: string; country: string; created: string; currency: string; last_four: string; owner: string; owner_type: 'BUSINESS' | 'INDIVIDUAL'; routing_number: string; state: 'ENABLED' | 'CLOSED' | 'PAUSED'; type: 'CHECKING' | 'SAVINGS'; verification_attempts: number; verification_method: 'MANUAL' | 'MICRO_DEPOSIT' | 'PLAID' | 'PRENOTE'; verification_state: 'PENDING' | 'ENABLED' | 'FAILED_VERIFICATION' | 'INSUFFICIENT_FUNDS'; account_token?: string; address?: external_bank_account_address; company_id?: string; dob?: string; doing_business_as?: string; financial_account_token?: string; name?: string; user_defined_id?: string; verification_failed_reason?: string; }`\n\n**get** `/v1/external_bank_accounts/{external_bank_account_token}`\n\nGet the external bank account by token.\n\n### Parameters\n\n- `external_bank_account_token: string`\n\n### Returns\n\n- `{ token: string; country: string; created: string; currency: string; last_four: string; owner: string; owner_type: 'BUSINESS' | 'INDIVIDUAL'; routing_number: string; state: 'ENABLED' | 'CLOSED' | 'PAUSED'; type: 'CHECKING' | 'SAVINGS'; verification_attempts: number; verification_method: 'MANUAL' | 'MICRO_DEPOSIT' | 'PLAID' | 'PRENOTE'; verification_state: 'PENDING' | 'ENABLED' | 'FAILED_VERIFICATION' | 'INSUFFICIENT_FUNDS'; account_token?: string; address?: { address1: string; city: string; country: string; postal_code: string; state: string; address2?: string; }; company_id?: string; dob?: string; doing_business_as?: string; financial_account_token?: string; name?: string; user_defined_id?: string; verification_failed_reason?: string; }`\n\n  - `token: string`\n  - `country: string`\n  - `created: string`\n  - `currency: string`\n  - `last_four: string`\n  - `owner: string`\n  - `owner_type: 'BUSINESS' | 'INDIVIDUAL'`\n  - `routing_number: string`\n  - `state: 'ENABLED' | 'CLOSED' | 'PAUSED'`\n  - `type: 'CHECKING' | 'SAVINGS'`\n  - `verification_attempts: number`\n  - `verification_method: 'MANUAL' | 'MICRO_DEPOSIT' | 'PLAID' | 'PRENOTE'`\n  - `verification_state: 'PENDING' | 'ENABLED' | 'FAILED_VERIFICATION' | 'INSUFFICIENT_FUNDS'`\n  - `account_token?: string`\n  - `address?: { address1: string; city: string; country: string; postal_code: string; state: string; address2?: string; }`\n  - `company_id?: string`\n  - `dob?: string`\n  - `doing_business_as?: string`\n  - `financial_account_token?: string`\n  - `name?: string`\n  - `user_defined_id?: string`\n  - `verification_failed_reason?: string`\n\n### Example\n\n```typescript\nimport Lithic from 'lithic';\n\nconst client = new Lithic();\n\nconst externalBankAccount = await client.externalBankAccounts.retrieve('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e');\n\nconsole.log(externalBankAccount);\n```",
  },
  {
    name: 'update',
    endpoint: '/v1/external_bank_accounts/{external_bank_account_token}',
    httpMethod: 'patch',
    summary: 'Update external bank account',
    description: 'Update the external bank account by token.',
    stainlessPath: '(resource) external_bank_accounts > (method) update',
    qualified: 'client.externalBankAccounts.update',
    params: [
      'external_bank_account_token: string;',
      'address?: { address1: string; city: string; country: string; postal_code: string; state: string; address2?: string; };',
      'company_id?: string;',
      'dob?: string;',
      'doing_business_as?: string;',
      'name?: string;',
      'owner?: string;',
      "owner_type?: 'INDIVIDUAL' | 'BUSINESS';",
      "type?: 'CHECKING' | 'SAVINGS';",
      'user_defined_id?: string;',
    ],
    response:
      "{ token: string; country: string; created: string; currency: string; last_four: string; owner: string; owner_type: 'BUSINESS' | 'INDIVIDUAL'; routing_number: string; state: 'ENABLED' | 'CLOSED' | 'PAUSED'; type: 'CHECKING' | 'SAVINGS'; verification_attempts: number; verification_method: 'MANUAL' | 'MICRO_DEPOSIT' | 'PLAID' | 'PRENOTE'; verification_state: 'PENDING' | 'ENABLED' | 'FAILED_VERIFICATION' | 'INSUFFICIENT_FUNDS'; account_token?: string; address?: { address1: string; city: string; country: string; postal_code: string; state: string; address2?: string; }; company_id?: string; dob?: string; doing_business_as?: string; financial_account_token?: string; name?: string; user_defined_id?: string; verification_failed_reason?: string; }",
    markdown:
      "## update\n\n`client.externalBankAccounts.update(external_bank_account_token: string, address?: { address1: string; city: string; country: string; postal_code: string; state: string; address2?: string; }, company_id?: string, dob?: string, doing_business_as?: string, name?: string, owner?: string, owner_type?: 'INDIVIDUAL' | 'BUSINESS', type?: 'CHECKING' | 'SAVINGS', user_defined_id?: string): { token: string; country: string; created: string; currency: string; last_four: string; owner: string; owner_type: 'BUSINESS' | 'INDIVIDUAL'; routing_number: string; state: 'ENABLED' | 'CLOSED' | 'PAUSED'; type: 'CHECKING' | 'SAVINGS'; verification_attempts: number; verification_method: 'MANUAL' | 'MICRO_DEPOSIT' | 'PLAID' | 'PRENOTE'; verification_state: 'PENDING' | 'ENABLED' | 'FAILED_VERIFICATION' | 'INSUFFICIENT_FUNDS'; account_token?: string; address?: external_bank_account_address; company_id?: string; dob?: string; doing_business_as?: string; financial_account_token?: string; name?: string; user_defined_id?: string; verification_failed_reason?: string; }`\n\n**patch** `/v1/external_bank_accounts/{external_bank_account_token}`\n\nUpdate the external bank account by token.\n\n### Parameters\n\n- `external_bank_account_token: string`\n\n- `address?: { address1: string; city: string; country: string; postal_code: string; state: string; address2?: string; }`\n  Address\n  - `address1: string`\n  - `city: string`\n  - `country: string`\n  - `postal_code: string`\n  - `state: string`\n  - `address2?: string`\n\n- `company_id?: string`\n  Optional field that helps identify bank accounts in receipts\n\n- `dob?: string`\n  Date of Birth of the Individual that owns the external bank account\n\n- `doing_business_as?: string`\n  Doing Business As\n\n- `name?: string`\n  The nickname for this External Bank Account\n\n- `owner?: string`\n  Legal Name of the business or individual who owns the external account. This will appear in statements\n\n- `owner_type?: 'INDIVIDUAL' | 'BUSINESS'`\n  Owner Type\n\n- `type?: 'CHECKING' | 'SAVINGS'`\n\n- `user_defined_id?: string`\n  User Defined ID\n\n### Returns\n\n- `{ token: string; country: string; created: string; currency: string; last_four: string; owner: string; owner_type: 'BUSINESS' | 'INDIVIDUAL'; routing_number: string; state: 'ENABLED' | 'CLOSED' | 'PAUSED'; type: 'CHECKING' | 'SAVINGS'; verification_attempts: number; verification_method: 'MANUAL' | 'MICRO_DEPOSIT' | 'PLAID' | 'PRENOTE'; verification_state: 'PENDING' | 'ENABLED' | 'FAILED_VERIFICATION' | 'INSUFFICIENT_FUNDS'; account_token?: string; address?: { address1: string; city: string; country: string; postal_code: string; state: string; address2?: string; }; company_id?: string; dob?: string; doing_business_as?: string; financial_account_token?: string; name?: string; user_defined_id?: string; verification_failed_reason?: string; }`\n\n  - `token: string`\n  - `country: string`\n  - `created: string`\n  - `currency: string`\n  - `last_four: string`\n  - `owner: string`\n  - `owner_type: 'BUSINESS' | 'INDIVIDUAL'`\n  - `routing_number: string`\n  - `state: 'ENABLED' | 'CLOSED' | 'PAUSED'`\n  - `type: 'CHECKING' | 'SAVINGS'`\n  - `verification_attempts: number`\n  - `verification_method: 'MANUAL' | 'MICRO_DEPOSIT' | 'PLAID' | 'PRENOTE'`\n  - `verification_state: 'PENDING' | 'ENABLED' | 'FAILED_VERIFICATION' | 'INSUFFICIENT_FUNDS'`\n  - `account_token?: string`\n  - `address?: { address1: string; city: string; country: string; postal_code: string; state: string; address2?: string; }`\n  - `company_id?: string`\n  - `dob?: string`\n  - `doing_business_as?: string`\n  - `financial_account_token?: string`\n  - `name?: string`\n  - `user_defined_id?: string`\n  - `verification_failed_reason?: string`\n\n### Example\n\n```typescript\nimport Lithic from 'lithic';\n\nconst client = new Lithic();\n\nconst externalBankAccount = await client.externalBankAccounts.update('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e');\n\nconsole.log(externalBankAccount);\n```",
  },
  {
    name: 'list',
    endpoint: '/v1/external_bank_accounts',
    httpMethod: 'get',
    summary: 'List external bank accounts',
    description: 'List all the external bank accounts for the provided search criteria.',
    stainlessPath: '(resource) external_bank_accounts > (method) list',
    qualified: 'client.externalBankAccounts.list',
    params: [
      'account_token?: string;',
      "account_types?: 'CHECKING' | 'SAVINGS'[];",
      'countries?: string[];',
      'ending_before?: string;',
      "owner_types?: 'INDIVIDUAL' | 'BUSINESS'[];",
      'page_size?: number;',
      'starting_after?: string;',
      "states?: 'ENABLED' | 'CLOSED' | 'PAUSED'[];",
      "verification_states?: 'PENDING' | 'ENABLED' | 'FAILED_VERIFICATION' | 'INSUFFICIENT_FUNDS'[];",
    ],
    response:
      "{ token: string; country: string; created: string; currency: string; last_four: string; owner: string; owner_type: 'BUSINESS' | 'INDIVIDUAL'; routing_number: string; state: 'ENABLED' | 'CLOSED' | 'PAUSED'; type: 'CHECKING' | 'SAVINGS'; verification_attempts: number; verification_method: 'MANUAL' | 'MICRO_DEPOSIT' | 'PLAID' | 'PRENOTE'; verification_state: 'PENDING' | 'ENABLED' | 'FAILED_VERIFICATION' | 'INSUFFICIENT_FUNDS'; account_token?: string; address?: { address1: string; city: string; country: string; postal_code: string; state: string; address2?: string; }; company_id?: string; dob?: string; doing_business_as?: string; financial_account_token?: string; name?: string; user_defined_id?: string; verification_failed_reason?: string; }",
    markdown:
      "## list\n\n`client.externalBankAccounts.list(account_token?: string, account_types?: 'CHECKING' | 'SAVINGS'[], countries?: string[], ending_before?: string, owner_types?: 'INDIVIDUAL' | 'BUSINESS'[], page_size?: number, starting_after?: string, states?: 'ENABLED' | 'CLOSED' | 'PAUSED'[], verification_states?: 'PENDING' | 'ENABLED' | 'FAILED_VERIFICATION' | 'INSUFFICIENT_FUNDS'[]): { token: string; country: string; created: string; currency: string; last_four: string; owner: string; owner_type: 'BUSINESS' | 'INDIVIDUAL'; routing_number: string; state: 'ENABLED' | 'CLOSED' | 'PAUSED'; type: 'CHECKING' | 'SAVINGS'; verification_attempts: number; verification_method: 'MANUAL' | 'MICRO_DEPOSIT' | 'PLAID' | 'PRENOTE'; verification_state: 'PENDING' | 'ENABLED' | 'FAILED_VERIFICATION' | 'INSUFFICIENT_FUNDS'; account_token?: string; address?: external_bank_account_address; company_id?: string; dob?: string; doing_business_as?: string; financial_account_token?: string; name?: string; user_defined_id?: string; verification_failed_reason?: string; }`\n\n**get** `/v1/external_bank_accounts`\n\nList all the external bank accounts for the provided search criteria.\n\n### Parameters\n\n- `account_token?: string`\n\n- `account_types?: 'CHECKING' | 'SAVINGS'[]`\n\n- `countries?: string[]`\n\n- `ending_before?: string`\n  A cursor representing an item's token before which a page of results should end. Used to retrieve the previous page of results before this item.\n\n- `owner_types?: 'INDIVIDUAL' | 'BUSINESS'[]`\n\n- `page_size?: number`\n  Page size (for pagination).\n\n- `starting_after?: string`\n  A cursor representing an item's token after which a page of results should begin. Used to retrieve the next page of results after this item.\n\n- `states?: 'ENABLED' | 'CLOSED' | 'PAUSED'[]`\n\n- `verification_states?: 'PENDING' | 'ENABLED' | 'FAILED_VERIFICATION' | 'INSUFFICIENT_FUNDS'[]`\n\n### Returns\n\n- `{ token: string; country: string; created: string; currency: string; last_four: string; owner: string; owner_type: 'BUSINESS' | 'INDIVIDUAL'; routing_number: string; state: 'ENABLED' | 'CLOSED' | 'PAUSED'; type: 'CHECKING' | 'SAVINGS'; verification_attempts: number; verification_method: 'MANUAL' | 'MICRO_DEPOSIT' | 'PLAID' | 'PRENOTE'; verification_state: 'PENDING' | 'ENABLED' | 'FAILED_VERIFICATION' | 'INSUFFICIENT_FUNDS'; account_token?: string; address?: { address1: string; city: string; country: string; postal_code: string; state: string; address2?: string; }; company_id?: string; dob?: string; doing_business_as?: string; financial_account_token?: string; name?: string; user_defined_id?: string; verification_failed_reason?: string; }`\n\n  - `token: string`\n  - `country: string`\n  - `created: string`\n  - `currency: string`\n  - `last_four: string`\n  - `owner: string`\n  - `owner_type: 'BUSINESS' | 'INDIVIDUAL'`\n  - `routing_number: string`\n  - `state: 'ENABLED' | 'CLOSED' | 'PAUSED'`\n  - `type: 'CHECKING' | 'SAVINGS'`\n  - `verification_attempts: number`\n  - `verification_method: 'MANUAL' | 'MICRO_DEPOSIT' | 'PLAID' | 'PRENOTE'`\n  - `verification_state: 'PENDING' | 'ENABLED' | 'FAILED_VERIFICATION' | 'INSUFFICIENT_FUNDS'`\n  - `account_token?: string`\n  - `address?: { address1: string; city: string; country: string; postal_code: string; state: string; address2?: string; }`\n  - `company_id?: string`\n  - `dob?: string`\n  - `doing_business_as?: string`\n  - `financial_account_token?: string`\n  - `name?: string`\n  - `user_defined_id?: string`\n  - `verification_failed_reason?: string`\n\n### Example\n\n```typescript\nimport Lithic from 'lithic';\n\nconst client = new Lithic();\n\n// Automatically fetches more pages as needed.\nfor await (const externalBankAccountListResponse of client.externalBankAccounts.list()) {\n  console.log(externalBankAccountListResponse);\n}\n```",
  },
  {
    name: 'retry_micro_deposits',
    endpoint: '/v1/external_bank_accounts/{external_bank_account_token}/retry_micro_deposits',
    httpMethod: 'post',
    summary: 'Retry external bank account via micro deposit',
    description: 'Retry external bank account micro deposit verification.',
    stainlessPath: '(resource) external_bank_accounts > (method) retry_micro_deposits',
    qualified: 'client.externalBankAccounts.retryMicroDeposits',
    params: ['external_bank_account_token: string;', 'financial_account_token?: string;'],
    response:
      "{ token: string; country: string; created: string; currency: string; last_four: string; owner: string; owner_type: 'BUSINESS' | 'INDIVIDUAL'; routing_number: string; state: 'ENABLED' | 'CLOSED' | 'PAUSED'; type: 'CHECKING' | 'SAVINGS'; verification_attempts: number; verification_method: 'MANUAL' | 'MICRO_DEPOSIT' | 'PLAID' | 'PRENOTE'; verification_state: 'PENDING' | 'ENABLED' | 'FAILED_VERIFICATION' | 'INSUFFICIENT_FUNDS'; account_token?: string; address?: { address1: string; city: string; country: string; postal_code: string; state: string; address2?: string; }; company_id?: string; dob?: string; doing_business_as?: string; financial_account_token?: string; name?: string; user_defined_id?: string; verification_failed_reason?: string; }",
    markdown:
      "## retry_micro_deposits\n\n`client.externalBankAccounts.retryMicroDeposits(external_bank_account_token: string, financial_account_token?: string): { token: string; country: string; created: string; currency: string; last_four: string; owner: string; owner_type: 'BUSINESS' | 'INDIVIDUAL'; routing_number: string; state: 'ENABLED' | 'CLOSED' | 'PAUSED'; type: 'CHECKING' | 'SAVINGS'; verification_attempts: number; verification_method: 'MANUAL' | 'MICRO_DEPOSIT' | 'PLAID' | 'PRENOTE'; verification_state: 'PENDING' | 'ENABLED' | 'FAILED_VERIFICATION' | 'INSUFFICIENT_FUNDS'; account_token?: string; address?: external_bank_account_address; company_id?: string; dob?: string; doing_business_as?: string; financial_account_token?: string; name?: string; user_defined_id?: string; verification_failed_reason?: string; }`\n\n**post** `/v1/external_bank_accounts/{external_bank_account_token}/retry_micro_deposits`\n\nRetry external bank account micro deposit verification.\n\n### Parameters\n\n- `external_bank_account_token: string`\n\n- `financial_account_token?: string`\n\n### Returns\n\n- `{ token: string; country: string; created: string; currency: string; last_four: string; owner: string; owner_type: 'BUSINESS' | 'INDIVIDUAL'; routing_number: string; state: 'ENABLED' | 'CLOSED' | 'PAUSED'; type: 'CHECKING' | 'SAVINGS'; verification_attempts: number; verification_method: 'MANUAL' | 'MICRO_DEPOSIT' | 'PLAID' | 'PRENOTE'; verification_state: 'PENDING' | 'ENABLED' | 'FAILED_VERIFICATION' | 'INSUFFICIENT_FUNDS'; account_token?: string; address?: { address1: string; city: string; country: string; postal_code: string; state: string; address2?: string; }; company_id?: string; dob?: string; doing_business_as?: string; financial_account_token?: string; name?: string; user_defined_id?: string; verification_failed_reason?: string; }`\n\n  - `token: string`\n  - `country: string`\n  - `created: string`\n  - `currency: string`\n  - `last_four: string`\n  - `owner: string`\n  - `owner_type: 'BUSINESS' | 'INDIVIDUAL'`\n  - `routing_number: string`\n  - `state: 'ENABLED' | 'CLOSED' | 'PAUSED'`\n  - `type: 'CHECKING' | 'SAVINGS'`\n  - `verification_attempts: number`\n  - `verification_method: 'MANUAL' | 'MICRO_DEPOSIT' | 'PLAID' | 'PRENOTE'`\n  - `verification_state: 'PENDING' | 'ENABLED' | 'FAILED_VERIFICATION' | 'INSUFFICIENT_FUNDS'`\n  - `account_token?: string`\n  - `address?: { address1: string; city: string; country: string; postal_code: string; state: string; address2?: string; }`\n  - `company_id?: string`\n  - `dob?: string`\n  - `doing_business_as?: string`\n  - `financial_account_token?: string`\n  - `name?: string`\n  - `user_defined_id?: string`\n  - `verification_failed_reason?: string`\n\n### Example\n\n```typescript\nimport Lithic from 'lithic';\n\nconst client = new Lithic();\n\nconst response = await client.externalBankAccounts.retryMicroDeposits('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e');\n\nconsole.log(response);\n```",
  },
  {
    name: 'retry_prenote',
    endpoint: '/v1/external_bank_accounts/{external_bank_account_token}/retry_prenote',
    httpMethod: 'post',
    summary: 'Retry external bank account via prenote',
    description: 'Retry external bank account prenote verification.',
    stainlessPath: '(resource) external_bank_accounts > (method) retry_prenote',
    qualified: 'client.externalBankAccounts.retryPrenote',
    params: ['external_bank_account_token: string;', 'financial_account_token?: string;'],
    response:
      "{ token: string; country: string; created: string; currency: string; last_four: string; owner: string; owner_type: 'INDIVIDUAL' | 'BUSINESS'; routing_number: string; state: 'ENABLED' | 'CLOSED' | 'PAUSED'; type: 'CHECKING' | 'SAVINGS'; verification_attempts: number; verification_method: 'MANUAL' | 'MICRO_DEPOSIT' | 'PRENOTE' | 'EXTERNALLY_VERIFIED' | 'UNVERIFIED'; verification_state: 'PENDING' | 'ENABLED' | 'FAILED_VERIFICATION' | 'INSUFFICIENT_FUNDS'; account_token?: string; address?: { address1: string; city: string; country: string; postal_code: string; state: string; address2?: string; }; company_id?: string; dob?: string; doing_business_as?: string; financial_account_token?: string; name?: string; user_defined_id?: string; verification_failed_reason?: string; }",
    markdown:
      "## retry_prenote\n\n`client.externalBankAccounts.retryPrenote(external_bank_account_token: string, financial_account_token?: string): { token: string; country: string; created: string; currency: string; last_four: string; owner: string; owner_type: owner_type; routing_number: string; state: 'ENABLED' | 'CLOSED' | 'PAUSED'; type: 'CHECKING' | 'SAVINGS'; verification_attempts: number; verification_method: verification_method; verification_state: 'PENDING' | 'ENABLED' | 'FAILED_VERIFICATION' | 'INSUFFICIENT_FUNDS'; account_token?: string; address?: external_bank_account_address; company_id?: string; dob?: string; doing_business_as?: string; financial_account_token?: string; name?: string; user_defined_id?: string; verification_failed_reason?: string; }`\n\n**post** `/v1/external_bank_accounts/{external_bank_account_token}/retry_prenote`\n\nRetry external bank account prenote verification.\n\n### Parameters\n\n- `external_bank_account_token: string`\n\n- `financial_account_token?: string`\n\n### Returns\n\n- `{ token: string; country: string; created: string; currency: string; last_four: string; owner: string; owner_type: 'INDIVIDUAL' | 'BUSINESS'; routing_number: string; state: 'ENABLED' | 'CLOSED' | 'PAUSED'; type: 'CHECKING' | 'SAVINGS'; verification_attempts: number; verification_method: 'MANUAL' | 'MICRO_DEPOSIT' | 'PRENOTE' | 'EXTERNALLY_VERIFIED' | 'UNVERIFIED'; verification_state: 'PENDING' | 'ENABLED' | 'FAILED_VERIFICATION' | 'INSUFFICIENT_FUNDS'; account_token?: string; address?: { address1: string; city: string; country: string; postal_code: string; state: string; address2?: string; }; company_id?: string; dob?: string; doing_business_as?: string; financial_account_token?: string; name?: string; user_defined_id?: string; verification_failed_reason?: string; }`\n\n  - `token: string`\n  - `country: string`\n  - `created: string`\n  - `currency: string`\n  - `last_four: string`\n  - `owner: string`\n  - `owner_type: 'INDIVIDUAL' | 'BUSINESS'`\n  - `routing_number: string`\n  - `state: 'ENABLED' | 'CLOSED' | 'PAUSED'`\n  - `type: 'CHECKING' | 'SAVINGS'`\n  - `verification_attempts: number`\n  - `verification_method: 'MANUAL' | 'MICRO_DEPOSIT' | 'PRENOTE' | 'EXTERNALLY_VERIFIED' | 'UNVERIFIED'`\n  - `verification_state: 'PENDING' | 'ENABLED' | 'FAILED_VERIFICATION' | 'INSUFFICIENT_FUNDS'`\n  - `account_token?: string`\n  - `address?: { address1: string; city: string; country: string; postal_code: string; state: string; address2?: string; }`\n  - `company_id?: string`\n  - `dob?: string`\n  - `doing_business_as?: string`\n  - `financial_account_token?: string`\n  - `name?: string`\n  - `user_defined_id?: string`\n  - `verification_failed_reason?: string`\n\n### Example\n\n```typescript\nimport Lithic from 'lithic';\n\nconst client = new Lithic();\n\nconst externalBankAccount = await client.externalBankAccounts.retryPrenote('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e');\n\nconsole.log(externalBankAccount);\n```",
  },
  {
    name: 'unpause',
    endpoint: '/v1/external_bank_accounts/{external_bank_account_token}/unpause',
    httpMethod: 'post',
    summary: 'Unpause external bank account',
    description: 'Unpause an external bank account\n',
    stainlessPath: '(resource) external_bank_accounts > (method) unpause',
    qualified: 'client.externalBankAccounts.unpause',
    params: ['external_bank_account_token: string;'],
    response:
      "{ token: string; country: string; created: string; currency: string; last_four: string; owner: string; owner_type: 'INDIVIDUAL' | 'BUSINESS'; routing_number: string; state: 'ENABLED' | 'CLOSED' | 'PAUSED'; type: 'CHECKING' | 'SAVINGS'; verification_attempts: number; verification_method: 'MANUAL' | 'MICRO_DEPOSIT' | 'PRENOTE' | 'EXTERNALLY_VERIFIED' | 'UNVERIFIED'; verification_state: 'PENDING' | 'ENABLED' | 'FAILED_VERIFICATION' | 'INSUFFICIENT_FUNDS'; account_token?: string; address?: { address1: string; city: string; country: string; postal_code: string; state: string; address2?: string; }; company_id?: string; dob?: string; doing_business_as?: string; financial_account_token?: string; name?: string; user_defined_id?: string; verification_failed_reason?: string; }",
    markdown:
      "## unpause\n\n`client.externalBankAccounts.unpause(external_bank_account_token: string): { token: string; country: string; created: string; currency: string; last_four: string; owner: string; owner_type: owner_type; routing_number: string; state: 'ENABLED' | 'CLOSED' | 'PAUSED'; type: 'CHECKING' | 'SAVINGS'; verification_attempts: number; verification_method: verification_method; verification_state: 'PENDING' | 'ENABLED' | 'FAILED_VERIFICATION' | 'INSUFFICIENT_FUNDS'; account_token?: string; address?: external_bank_account_address; company_id?: string; dob?: string; doing_business_as?: string; financial_account_token?: string; name?: string; user_defined_id?: string; verification_failed_reason?: string; }`\n\n**post** `/v1/external_bank_accounts/{external_bank_account_token}/unpause`\n\nUnpause an external bank account\n\n\n### Parameters\n\n- `external_bank_account_token: string`\n\n### Returns\n\n- `{ token: string; country: string; created: string; currency: string; last_four: string; owner: string; owner_type: 'INDIVIDUAL' | 'BUSINESS'; routing_number: string; state: 'ENABLED' | 'CLOSED' | 'PAUSED'; type: 'CHECKING' | 'SAVINGS'; verification_attempts: number; verification_method: 'MANUAL' | 'MICRO_DEPOSIT' | 'PRENOTE' | 'EXTERNALLY_VERIFIED' | 'UNVERIFIED'; verification_state: 'PENDING' | 'ENABLED' | 'FAILED_VERIFICATION' | 'INSUFFICIENT_FUNDS'; account_token?: string; address?: { address1: string; city: string; country: string; postal_code: string; state: string; address2?: string; }; company_id?: string; dob?: string; doing_business_as?: string; financial_account_token?: string; name?: string; user_defined_id?: string; verification_failed_reason?: string; }`\n\n  - `token: string`\n  - `country: string`\n  - `created: string`\n  - `currency: string`\n  - `last_four: string`\n  - `owner: string`\n  - `owner_type: 'INDIVIDUAL' | 'BUSINESS'`\n  - `routing_number: string`\n  - `state: 'ENABLED' | 'CLOSED' | 'PAUSED'`\n  - `type: 'CHECKING' | 'SAVINGS'`\n  - `verification_attempts: number`\n  - `verification_method: 'MANUAL' | 'MICRO_DEPOSIT' | 'PRENOTE' | 'EXTERNALLY_VERIFIED' | 'UNVERIFIED'`\n  - `verification_state: 'PENDING' | 'ENABLED' | 'FAILED_VERIFICATION' | 'INSUFFICIENT_FUNDS'`\n  - `account_token?: string`\n  - `address?: { address1: string; city: string; country: string; postal_code: string; state: string; address2?: string; }`\n  - `company_id?: string`\n  - `dob?: string`\n  - `doing_business_as?: string`\n  - `financial_account_token?: string`\n  - `name?: string`\n  - `user_defined_id?: string`\n  - `verification_failed_reason?: string`\n\n### Example\n\n```typescript\nimport Lithic from 'lithic';\n\nconst client = new Lithic();\n\nconst externalBankAccount = await client.externalBankAccounts.unpause('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e');\n\nconsole.log(externalBankAccount);\n```",
  },
  {
    name: 'create',
    endpoint: '/v1/external_bank_accounts/{external_bank_account_token}/micro_deposits',
    httpMethod: 'post',
    summary: 'Verify external bank account via micro deposit amounts',
    description: 'Verify the external bank account by providing the micro deposit amounts.',
    stainlessPath: '(resource) external_bank_accounts.micro_deposits > (method) create',
    qualified: 'client.externalBankAccounts.microDeposits.create',
    params: ['external_bank_account_token: string;', 'micro_deposits: number[];'],
    response:
      "{ token: string; country: string; created: string; currency: string; last_four: string; owner: string; owner_type: 'BUSINESS' | 'INDIVIDUAL'; routing_number: string; state: 'ENABLED' | 'CLOSED' | 'PAUSED'; type: 'CHECKING' | 'SAVINGS'; verification_attempts: number; verification_method: 'MANUAL' | 'MICRO_DEPOSIT' | 'PLAID' | 'PRENOTE'; verification_state: 'PENDING' | 'ENABLED' | 'FAILED_VERIFICATION' | 'INSUFFICIENT_FUNDS'; account_token?: string; address?: { address1: string; city: string; country: string; postal_code: string; state: string; address2?: string; }; company_id?: string; dob?: string; doing_business_as?: string; financial_account_token?: string; name?: string; user_defined_id?: string; verification_failed_reason?: string; }",
    markdown:
      "## create\n\n`client.externalBankAccounts.microDeposits.create(external_bank_account_token: string, micro_deposits: number[]): { token: string; country: string; created: string; currency: string; last_four: string; owner: string; owner_type: 'BUSINESS' | 'INDIVIDUAL'; routing_number: string; state: 'ENABLED' | 'CLOSED' | 'PAUSED'; type: 'CHECKING' | 'SAVINGS'; verification_attempts: number; verification_method: 'MANUAL' | 'MICRO_DEPOSIT' | 'PLAID' | 'PRENOTE'; verification_state: 'PENDING' | 'ENABLED' | 'FAILED_VERIFICATION' | 'INSUFFICIENT_FUNDS'; account_token?: string; address?: external_bank_account_address; company_id?: string; dob?: string; doing_business_as?: string; financial_account_token?: string; name?: string; user_defined_id?: string; verification_failed_reason?: string; }`\n\n**post** `/v1/external_bank_accounts/{external_bank_account_token}/micro_deposits`\n\nVerify the external bank account by providing the micro deposit amounts.\n\n### Parameters\n\n- `external_bank_account_token: string`\n\n- `micro_deposits: number[]`\n\n### Returns\n\n- `{ token: string; country: string; created: string; currency: string; last_four: string; owner: string; owner_type: 'BUSINESS' | 'INDIVIDUAL'; routing_number: string; state: 'ENABLED' | 'CLOSED' | 'PAUSED'; type: 'CHECKING' | 'SAVINGS'; verification_attempts: number; verification_method: 'MANUAL' | 'MICRO_DEPOSIT' | 'PLAID' | 'PRENOTE'; verification_state: 'PENDING' | 'ENABLED' | 'FAILED_VERIFICATION' | 'INSUFFICIENT_FUNDS'; account_token?: string; address?: { address1: string; city: string; country: string; postal_code: string; state: string; address2?: string; }; company_id?: string; dob?: string; doing_business_as?: string; financial_account_token?: string; name?: string; user_defined_id?: string; verification_failed_reason?: string; }`\n\n  - `token: string`\n  - `country: string`\n  - `created: string`\n  - `currency: string`\n  - `last_four: string`\n  - `owner: string`\n  - `owner_type: 'BUSINESS' | 'INDIVIDUAL'`\n  - `routing_number: string`\n  - `state: 'ENABLED' | 'CLOSED' | 'PAUSED'`\n  - `type: 'CHECKING' | 'SAVINGS'`\n  - `verification_attempts: number`\n  - `verification_method: 'MANUAL' | 'MICRO_DEPOSIT' | 'PLAID' | 'PRENOTE'`\n  - `verification_state: 'PENDING' | 'ENABLED' | 'FAILED_VERIFICATION' | 'INSUFFICIENT_FUNDS'`\n  - `account_token?: string`\n  - `address?: { address1: string; city: string; country: string; postal_code: string; state: string; address2?: string; }`\n  - `company_id?: string`\n  - `dob?: string`\n  - `doing_business_as?: string`\n  - `financial_account_token?: string`\n  - `name?: string`\n  - `user_defined_id?: string`\n  - `verification_failed_reason?: string`\n\n### Example\n\n```typescript\nimport Lithic from 'lithic';\n\nconst client = new Lithic();\n\nconst microDeposit = await client.externalBankAccounts.microDeposits.create('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', { micro_deposits: [0, 0] });\n\nconsole.log(microDeposit);\n```",
  },
  {
    name: 'create',
    endpoint: '/v1/payments',
    httpMethod: 'post',
    summary: 'Create payment',
    description: 'Initiates a payment between a financial account and an external bank account.',
    stainlessPath: '(resource) payments > (method) create',
    qualified: 'client.payments.create',
    params: [
      'amount: number;',
      'external_bank_account_token: string;',
      'financial_account_token: string;',
      "method: 'ACH_NEXT_DAY' | 'ACH_SAME_DAY';",
      "method_attributes: { sec_code: 'CCD' | 'PPD' | 'WEB'; ach_hold_period?: number; addenda?: string; override_company_name?: string; };",
      "type: 'COLLECTION' | 'PAYMENT';",
      'token?: string;',
      'hold?: { token: string; };',
      'memo?: string;',
      'user_defined_id?: string;',
    ],
    response:
      "{ token: string; category: string; created: string; descriptor: string; direction: 'CREDIT' | 'DEBIT'; events: object[]; family: 'PAYMENT'; financial_account_token: string; method: 'ACH_NEXT_DAY' | 'ACH_SAME_DAY' | 'WIRE'; method_attributes: object | object; pending_amount: number; related_account_tokens: object; result: 'APPROVED' | 'DECLINED'; settled_amount: number; source: 'LITHIC' | 'EXTERNAL' | 'CUSTOMER'; status: 'PENDING' | 'SETTLED' | 'DECLINED' | 'REVERSED' | 'CANCELED' | 'RETURNED'; updated: string; currency?: string; expected_release_date?: string; external_bank_account_token?: string; type?: string; user_defined_id?: string; }",
    markdown:
      "## create\n\n`client.payments.create(amount: number, external_bank_account_token: string, financial_account_token: string, method: 'ACH_NEXT_DAY' | 'ACH_SAME_DAY', method_attributes: { sec_code: 'CCD' | 'PPD' | 'WEB'; ach_hold_period?: number; addenda?: string; override_company_name?: string; }, type: 'COLLECTION' | 'PAYMENT', token?: string, hold?: { token: string; }, memo?: string, user_defined_id?: string): object`\n\n**post** `/v1/payments`\n\nInitiates a payment between a financial account and an external bank account.\n\n### Parameters\n\n- `amount: number`\n\n- `external_bank_account_token: string`\n\n- `financial_account_token: string`\n\n- `method: 'ACH_NEXT_DAY' | 'ACH_SAME_DAY'`\n\n- `method_attributes: { sec_code: 'CCD' | 'PPD' | 'WEB'; ach_hold_period?: number; addenda?: string; override_company_name?: string; }`\n  - `sec_code: 'CCD' | 'PPD' | 'WEB'`\n  - `ach_hold_period?: number`\n    Number of days to hold the ACH payment\n  - `addenda?: string`\n  - `override_company_name?: string`\n    Value to override the configured company name with. Can only be used if allowed to override\n\n- `type: 'COLLECTION' | 'PAYMENT'`\n\n- `token?: string`\n  Customer-provided token that will serve as an idempotency token. This token will become the transaction token.\n\n- `hold?: { token: string; }`\n  Optional hold to settle when this payment is initiated.\n  - `token: string`\n    Token of the hold to settle when this payment is initiated.\n\n- `memo?: string`\n\n- `user_defined_id?: string`\n\n### Returns\n\n- `{ token: string; category: string; created: string; descriptor: string; direction: 'CREDIT' | 'DEBIT'; events: { token: string; amount: number; created: string; result: 'APPROVED' | 'DECLINED'; type: string; detailed_results?: string[]; external_id?: string; }[]; family: 'PAYMENT'; financial_account_token: string; method: 'ACH_NEXT_DAY' | 'ACH_SAME_DAY' | 'WIRE'; method_attributes: { sec_code: 'CCD' | 'PPD' | 'WEB' | 'TEL' | 'CIE' | 'CTX'; ach_hold_period?: number; addenda?: string; company_id?: string; override_company_name?: string; receipt_routing_number?: string; retries?: number; return_reason_code?: string; trace_numbers?: string[]; } | { wire_message_type: string; wire_network: 'FEDWIRE' | 'SWIFT'; creditor?: wire_party_details; debtor?: wire_party_details; message_id?: string; remittance_information?: string; }; pending_amount: number; related_account_tokens: { account_token: string; business_account_token: string; }; result: 'APPROVED' | 'DECLINED'; settled_amount: number; source: 'LITHIC' | 'EXTERNAL' | 'CUSTOMER'; status: 'PENDING' | 'SETTLED' | 'DECLINED' | 'REVERSED' | 'CANCELED' | 'RETURNED'; updated: string; currency?: string; expected_release_date?: string; external_bank_account_token?: string; type?: string; user_defined_id?: string; }`\n  Payment transaction\n\n### Example\n\n```typescript\nimport Lithic from 'lithic';\n\nconst client = new Lithic();\n\nconst payment = await client.payments.create({\n  amount: 1,\n  external_bank_account_token: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',\n  financial_account_token: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',\n  method: 'ACH_NEXT_DAY',\n  method_attributes: { sec_code: 'CCD' },\n  type: 'COLLECTION',\n});\n\nconsole.log(payment);\n```",
  },
  {
    name: 'retrieve',
    endpoint: '/v1/payments/{payment_token}',
    httpMethod: 'get',
    summary: 'Get payment by token',
    description: 'Get the payment by token.',
    stainlessPath: '(resource) payments > (method) retrieve',
    qualified: 'client.payments.retrieve',
    params: ['payment_token: string;'],
    response:
      "{ token: string; category: string; created: string; descriptor: string; direction: 'CREDIT' | 'DEBIT'; events: object[]; family: 'PAYMENT'; financial_account_token: string; method: 'ACH_NEXT_DAY' | 'ACH_SAME_DAY' | 'WIRE'; method_attributes: object | object; pending_amount: number; related_account_tokens: object; result: 'APPROVED' | 'DECLINED'; settled_amount: number; source: 'LITHIC' | 'EXTERNAL' | 'CUSTOMER'; status: 'PENDING' | 'SETTLED' | 'DECLINED' | 'REVERSED' | 'CANCELED' | 'RETURNED'; updated: string; currency?: string; expected_release_date?: string; external_bank_account_token?: string; type?: string; user_defined_id?: string; }",
    markdown:
      "## retrieve\n\n`client.payments.retrieve(payment_token: string): { token: string; category: string; created: string; descriptor: string; direction: 'CREDIT' | 'DEBIT'; events: object[]; family: 'PAYMENT'; financial_account_token: string; method: 'ACH_NEXT_DAY' | 'ACH_SAME_DAY' | 'WIRE'; method_attributes: object | object; pending_amount: number; related_account_tokens: object; result: 'APPROVED' | 'DECLINED'; settled_amount: number; source: 'LITHIC' | 'EXTERNAL' | 'CUSTOMER'; status: 'PENDING' | 'SETTLED' | 'DECLINED' | 'REVERSED' | 'CANCELED' | 'RETURNED'; updated: string; currency?: string; expected_release_date?: string; external_bank_account_token?: string; type?: string; user_defined_id?: string; }`\n\n**get** `/v1/payments/{payment_token}`\n\nGet the payment by token.\n\n### Parameters\n\n- `payment_token: string`\n\n### Returns\n\n- `{ token: string; category: string; created: string; descriptor: string; direction: 'CREDIT' | 'DEBIT'; events: { token: string; amount: number; created: string; result: 'APPROVED' | 'DECLINED'; type: string; detailed_results?: string[]; external_id?: string; }[]; family: 'PAYMENT'; financial_account_token: string; method: 'ACH_NEXT_DAY' | 'ACH_SAME_DAY' | 'WIRE'; method_attributes: { sec_code: 'CCD' | 'PPD' | 'WEB' | 'TEL' | 'CIE' | 'CTX'; ach_hold_period?: number; addenda?: string; company_id?: string; override_company_name?: string; receipt_routing_number?: string; retries?: number; return_reason_code?: string; trace_numbers?: string[]; } | { wire_message_type: string; wire_network: 'FEDWIRE' | 'SWIFT'; creditor?: object; debtor?: object; message_id?: string; remittance_information?: string; }; pending_amount: number; related_account_tokens: { account_token: string; business_account_token: string; }; result: 'APPROVED' | 'DECLINED'; settled_amount: number; source: 'LITHIC' | 'EXTERNAL' | 'CUSTOMER'; status: 'PENDING' | 'SETTLED' | 'DECLINED' | 'REVERSED' | 'CANCELED' | 'RETURNED'; updated: string; currency?: string; expected_release_date?: string; external_bank_account_token?: string; type?: string; user_defined_id?: string; }`\n  Payment transaction\n\n  - `token: string`\n  - `category: string`\n  - `created: string`\n  - `descriptor: string`\n  - `direction: 'CREDIT' | 'DEBIT'`\n  - `events: { token: string; amount: number; created: string; result: 'APPROVED' | 'DECLINED'; type: string; detailed_results?: string[]; external_id?: string; }[]`\n  - `family: 'PAYMENT'`\n  - `financial_account_token: string`\n  - `method: 'ACH_NEXT_DAY' | 'ACH_SAME_DAY' | 'WIRE'`\n  - `method_attributes: { sec_code: 'CCD' | 'PPD' | 'WEB' | 'TEL' | 'CIE' | 'CTX'; ach_hold_period?: number; addenda?: string; company_id?: string; override_company_name?: string; receipt_routing_number?: string; retries?: number; return_reason_code?: string; trace_numbers?: string[]; } | { wire_message_type: string; wire_network: 'FEDWIRE' | 'SWIFT'; creditor?: { account_number?: string; agent_id?: string; agent_name?: string; name?: string; }; debtor?: { account_number?: string; agent_id?: string; agent_name?: string; name?: string; }; message_id?: string; remittance_information?: string; }`\n  - `pending_amount: number`\n  - `related_account_tokens: { account_token: string; business_account_token: string; }`\n  - `result: 'APPROVED' | 'DECLINED'`\n  - `settled_amount: number`\n  - `source: 'LITHIC' | 'EXTERNAL' | 'CUSTOMER'`\n  - `status: 'PENDING' | 'SETTLED' | 'DECLINED' | 'REVERSED' | 'CANCELED' | 'RETURNED'`\n  - `updated: string`\n  - `currency?: string`\n  - `expected_release_date?: string`\n  - `external_bank_account_token?: string`\n  - `type?: string`\n  - `user_defined_id?: string`\n\n### Example\n\n```typescript\nimport Lithic from 'lithic';\n\nconst client = new Lithic();\n\nconst payment = await client.payments.retrieve('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e');\n\nconsole.log(payment);\n```",
  },
  {
    name: 'list',
    endpoint: '/v1/payments',
    httpMethod: 'get',
    summary: 'List payments',
    description: 'List all the payments for the provided search criteria.',
    stainlessPath: '(resource) payments > (method) list',
    qualified: 'client.payments.list',
    params: [
      'account_token?: string;',
      'begin?: string;',
      'business_account_token?: string;',
      "category?: 'ACH';",
      'end?: string;',
      'ending_before?: string;',
      'financial_account_token?: string;',
      'page_size?: number;',
      "result?: 'APPROVED' | 'DECLINED';",
      'starting_after?: string;',
      "status?: 'DECLINED' | 'PENDING' | 'RETURNED' | 'SETTLED';",
    ],
    response:
      "{ token: string; category: string; created: string; descriptor: string; direction: 'CREDIT' | 'DEBIT'; events: object[]; family: 'PAYMENT'; financial_account_token: string; method: 'ACH_NEXT_DAY' | 'ACH_SAME_DAY' | 'WIRE'; method_attributes: object | object; pending_amount: number; related_account_tokens: object; result: 'APPROVED' | 'DECLINED'; settled_amount: number; source: 'LITHIC' | 'EXTERNAL' | 'CUSTOMER'; status: 'PENDING' | 'SETTLED' | 'DECLINED' | 'REVERSED' | 'CANCELED' | 'RETURNED'; updated: string; currency?: string; expected_release_date?: string; external_bank_account_token?: string; type?: string; user_defined_id?: string; }",
    markdown:
      "## list\n\n`client.payments.list(account_token?: string, begin?: string, business_account_token?: string, category?: 'ACH', end?: string, ending_before?: string, financial_account_token?: string, page_size?: number, result?: 'APPROVED' | 'DECLINED', starting_after?: string, status?: 'DECLINED' | 'PENDING' | 'RETURNED' | 'SETTLED'): { token: string; category: string; created: string; descriptor: string; direction: 'CREDIT' | 'DEBIT'; events: object[]; family: 'PAYMENT'; financial_account_token: string; method: 'ACH_NEXT_DAY' | 'ACH_SAME_DAY' | 'WIRE'; method_attributes: object | object; pending_amount: number; related_account_tokens: object; result: 'APPROVED' | 'DECLINED'; settled_amount: number; source: 'LITHIC' | 'EXTERNAL' | 'CUSTOMER'; status: 'PENDING' | 'SETTLED' | 'DECLINED' | 'REVERSED' | 'CANCELED' | 'RETURNED'; updated: string; currency?: string; expected_release_date?: string; external_bank_account_token?: string; type?: string; user_defined_id?: string; }`\n\n**get** `/v1/payments`\n\nList all the payments for the provided search criteria.\n\n### Parameters\n\n- `account_token?: string`\n\n- `begin?: string`\n  Date string in RFC 3339 format. Only entries created after the specified time will be included. UTC time zone.\n\n- `business_account_token?: string`\n\n- `category?: 'ACH'`\n\n- `end?: string`\n  Date string in RFC 3339 format. Only entries created before the specified time will be included. UTC time zone.\n\n- `ending_before?: string`\n  A cursor representing an item's token before which a page of results should end. Used to retrieve the previous page of results before this item.\n\n- `financial_account_token?: string`\n\n- `page_size?: number`\n  Page size (for pagination).\n\n- `result?: 'APPROVED' | 'DECLINED'`\n\n- `starting_after?: string`\n  A cursor representing an item's token after which a page of results should begin. Used to retrieve the next page of results after this item.\n\n- `status?: 'DECLINED' | 'PENDING' | 'RETURNED' | 'SETTLED'`\n\n### Returns\n\n- `{ token: string; category: string; created: string; descriptor: string; direction: 'CREDIT' | 'DEBIT'; events: { token: string; amount: number; created: string; result: 'APPROVED' | 'DECLINED'; type: string; detailed_results?: string[]; external_id?: string; }[]; family: 'PAYMENT'; financial_account_token: string; method: 'ACH_NEXT_DAY' | 'ACH_SAME_DAY' | 'WIRE'; method_attributes: { sec_code: 'CCD' | 'PPD' | 'WEB' | 'TEL' | 'CIE' | 'CTX'; ach_hold_period?: number; addenda?: string; company_id?: string; override_company_name?: string; receipt_routing_number?: string; retries?: number; return_reason_code?: string; trace_numbers?: string[]; } | { wire_message_type: string; wire_network: 'FEDWIRE' | 'SWIFT'; creditor?: object; debtor?: object; message_id?: string; remittance_information?: string; }; pending_amount: number; related_account_tokens: { account_token: string; business_account_token: string; }; result: 'APPROVED' | 'DECLINED'; settled_amount: number; source: 'LITHIC' | 'EXTERNAL' | 'CUSTOMER'; status: 'PENDING' | 'SETTLED' | 'DECLINED' | 'REVERSED' | 'CANCELED' | 'RETURNED'; updated: string; currency?: string; expected_release_date?: string; external_bank_account_token?: string; type?: string; user_defined_id?: string; }`\n  Payment transaction\n\n  - `token: string`\n  - `category: string`\n  - `created: string`\n  - `descriptor: string`\n  - `direction: 'CREDIT' | 'DEBIT'`\n  - `events: { token: string; amount: number; created: string; result: 'APPROVED' | 'DECLINED'; type: string; detailed_results?: string[]; external_id?: string; }[]`\n  - `family: 'PAYMENT'`\n  - `financial_account_token: string`\n  - `method: 'ACH_NEXT_DAY' | 'ACH_SAME_DAY' | 'WIRE'`\n  - `method_attributes: { sec_code: 'CCD' | 'PPD' | 'WEB' | 'TEL' | 'CIE' | 'CTX'; ach_hold_period?: number; addenda?: string; company_id?: string; override_company_name?: string; receipt_routing_number?: string; retries?: number; return_reason_code?: string; trace_numbers?: string[]; } | { wire_message_type: string; wire_network: 'FEDWIRE' | 'SWIFT'; creditor?: { account_number?: string; agent_id?: string; agent_name?: string; name?: string; }; debtor?: { account_number?: string; agent_id?: string; agent_name?: string; name?: string; }; message_id?: string; remittance_information?: string; }`\n  - `pending_amount: number`\n  - `related_account_tokens: { account_token: string; business_account_token: string; }`\n  - `result: 'APPROVED' | 'DECLINED'`\n  - `settled_amount: number`\n  - `source: 'LITHIC' | 'EXTERNAL' | 'CUSTOMER'`\n  - `status: 'PENDING' | 'SETTLED' | 'DECLINED' | 'REVERSED' | 'CANCELED' | 'RETURNED'`\n  - `updated: string`\n  - `currency?: string`\n  - `expected_release_date?: string`\n  - `external_bank_account_token?: string`\n  - `type?: string`\n  - `user_defined_id?: string`\n\n### Example\n\n```typescript\nimport Lithic from 'lithic';\n\nconst client = new Lithic();\n\n// Automatically fetches more pages as needed.\nfor await (const payment of client.payments.list()) {\n  console.log(payment);\n}\n```",
  },
  {
    name: 'retry',
    endpoint: '/v1/payments/{payment_token}/retry',
    httpMethod: 'post',
    summary: 'Retry payment',
    description: 'Retry an origination which has been returned.',
    stainlessPath: '(resource) payments > (method) retry',
    qualified: 'client.payments.retry',
    params: ['payment_token: string;'],
    response:
      "{ token: string; category: string; created: string; descriptor: string; direction: 'CREDIT' | 'DEBIT'; events: object[]; family: 'PAYMENT'; financial_account_token: string; method: 'ACH_NEXT_DAY' | 'ACH_SAME_DAY' | 'WIRE'; method_attributes: object | object; pending_amount: number; related_account_tokens: object; result: 'APPROVED' | 'DECLINED'; settled_amount: number; source: 'LITHIC' | 'EXTERNAL' | 'CUSTOMER'; status: 'PENDING' | 'SETTLED' | 'DECLINED' | 'REVERSED' | 'CANCELED' | 'RETURNED'; updated: string; currency?: string; expected_release_date?: string; external_bank_account_token?: string; type?: string; user_defined_id?: string; }",
    markdown:
      "## retry\n\n`client.payments.retry(payment_token: string): object`\n\n**post** `/v1/payments/{payment_token}/retry`\n\nRetry an origination which has been returned.\n\n### Parameters\n\n- `payment_token: string`\n\n### Returns\n\n- `{ token: string; category: string; created: string; descriptor: string; direction: 'CREDIT' | 'DEBIT'; events: { token: string; amount: number; created: string; result: 'APPROVED' | 'DECLINED'; type: string; detailed_results?: string[]; external_id?: string; }[]; family: 'PAYMENT'; financial_account_token: string; method: 'ACH_NEXT_DAY' | 'ACH_SAME_DAY' | 'WIRE'; method_attributes: { sec_code: 'CCD' | 'PPD' | 'WEB' | 'TEL' | 'CIE' | 'CTX'; ach_hold_period?: number; addenda?: string; company_id?: string; override_company_name?: string; receipt_routing_number?: string; retries?: number; return_reason_code?: string; trace_numbers?: string[]; } | { wire_message_type: string; wire_network: 'FEDWIRE' | 'SWIFT'; creditor?: wire_party_details; debtor?: wire_party_details; message_id?: string; remittance_information?: string; }; pending_amount: number; related_account_tokens: { account_token: string; business_account_token: string; }; result: 'APPROVED' | 'DECLINED'; settled_amount: number; source: 'LITHIC' | 'EXTERNAL' | 'CUSTOMER'; status: 'PENDING' | 'SETTLED' | 'DECLINED' | 'REVERSED' | 'CANCELED' | 'RETURNED'; updated: string; currency?: string; expected_release_date?: string; external_bank_account_token?: string; type?: string; user_defined_id?: string; }`\n  Payment transaction\n\n### Example\n\n```typescript\nimport Lithic from 'lithic';\n\nconst client = new Lithic();\n\nconst response = await client.payments.retry('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e');\n\nconsole.log(response);\n```",
  },
  {
    name: 'return',
    endpoint: '/v1/payments/{payment_token}/return',
    httpMethod: 'post',
    summary: 'Return payment',
    description:
      'Return an ACH payment with a specified return reason code. Returns must be initiated\nwithin the time window specified by NACHA rules for each return code (typically 2 banking\ndays for most codes, 60 calendar days for unauthorized debits). For a complete list of\nreturn codes and their meanings, see the [ACH Return Reasons documentation](https://docs.lithic.com/docs/ach-overview#ach-return-reasons).\n\nNote:\n  * This endpoint does not modify the state of the financial account associated with the payment. If you would like to change the account state, use the [Update financial account status](https://docs.lithic.com/reference/updatefinancialaccountstatus) endpoint.\n  * By default this endpoint is not enabled for your account. Please contact your implementations manager to enable this feature.\n',
    stainlessPath: '(resource) payments > (method) return',
    qualified: 'client.payments.return',
    params: [
      'payment_token: string;',
      'financial_account_token: string;',
      'return_reason_code: string;',
      'addenda?: string;',
      'date_of_death?: string;',
      'memo?: string;',
    ],
    response:
      "{ token: string; category: string; created: string; descriptor: string; direction: 'CREDIT' | 'DEBIT'; events: object[]; family: 'PAYMENT'; financial_account_token: string; method: 'ACH_NEXT_DAY' | 'ACH_SAME_DAY' | 'WIRE'; method_attributes: object | object; pending_amount: number; related_account_tokens: object; result: 'APPROVED' | 'DECLINED'; settled_amount: number; source: 'LITHIC' | 'EXTERNAL' | 'CUSTOMER'; status: 'PENDING' | 'SETTLED' | 'DECLINED' | 'REVERSED' | 'CANCELED' | 'RETURNED'; updated: string; currency?: string; expected_release_date?: string; external_bank_account_token?: string; type?: string; user_defined_id?: string; }",
    markdown:
      "## return\n\n`client.payments.return(payment_token: string, financial_account_token: string, return_reason_code: string, addenda?: string, date_of_death?: string, memo?: string): { token: string; category: string; created: string; descriptor: string; direction: 'CREDIT' | 'DEBIT'; events: object[]; family: 'PAYMENT'; financial_account_token: string; method: 'ACH_NEXT_DAY' | 'ACH_SAME_DAY' | 'WIRE'; method_attributes: object | object; pending_amount: number; related_account_tokens: object; result: 'APPROVED' | 'DECLINED'; settled_amount: number; source: 'LITHIC' | 'EXTERNAL' | 'CUSTOMER'; status: 'PENDING' | 'SETTLED' | 'DECLINED' | 'REVERSED' | 'CANCELED' | 'RETURNED'; updated: string; currency?: string; expected_release_date?: string; external_bank_account_token?: string; type?: string; user_defined_id?: string; }`\n\n**post** `/v1/payments/{payment_token}/return`\n\nReturn an ACH payment with a specified return reason code. Returns must be initiated\nwithin the time window specified by NACHA rules for each return code (typically 2 banking\ndays for most codes, 60 calendar days for unauthorized debits). For a complete list of\nreturn codes and their meanings, see the [ACH Return Reasons documentation](https://docs.lithic.com/docs/ach-overview#ach-return-reasons).\n\nNote:\n  * This endpoint does not modify the state of the financial account associated with the payment. If you would like to change the account state, use the [Update financial account status](https://docs.lithic.com/reference/updatefinancialaccountstatus) endpoint.\n  * By default this endpoint is not enabled for your account. Please contact your implementations manager to enable this feature.\n\n\n### Parameters\n\n- `payment_token: string`\n\n- `financial_account_token: string`\n  Globally unique identifier for the financial account\n\n- `return_reason_code: string`\n  ACH return reason code indicating the reason for returning the payment. Supported codes include R01-R53 and R80-R85. For a complete list of return codes and their meanings, see [ACH Return Reasons](https://docs.lithic.com/docs/ach-overview#ach-return-reasons)\n\n- `addenda?: string`\n  Optional additional information about the return. Limited to 44 characters\n\n- `date_of_death?: string`\n  Date of death in YYYY-MM-DD format. Required when using return codes **R14** (representative payee deceased) or **R15** (beneficiary or account holder deceased)\n\n- `memo?: string`\n  Optional memo for the return. Limited to 10 characters\n\n### Returns\n\n- `{ token: string; category: string; created: string; descriptor: string; direction: 'CREDIT' | 'DEBIT'; events: { token: string; amount: number; created: string; result: 'APPROVED' | 'DECLINED'; type: string; detailed_results?: string[]; external_id?: string; }[]; family: 'PAYMENT'; financial_account_token: string; method: 'ACH_NEXT_DAY' | 'ACH_SAME_DAY' | 'WIRE'; method_attributes: { sec_code: 'CCD' | 'PPD' | 'WEB' | 'TEL' | 'CIE' | 'CTX'; ach_hold_period?: number; addenda?: string; company_id?: string; override_company_name?: string; receipt_routing_number?: string; retries?: number; return_reason_code?: string; trace_numbers?: string[]; } | { wire_message_type: string; wire_network: 'FEDWIRE' | 'SWIFT'; creditor?: object; debtor?: object; message_id?: string; remittance_information?: string; }; pending_amount: number; related_account_tokens: { account_token: string; business_account_token: string; }; result: 'APPROVED' | 'DECLINED'; settled_amount: number; source: 'LITHIC' | 'EXTERNAL' | 'CUSTOMER'; status: 'PENDING' | 'SETTLED' | 'DECLINED' | 'REVERSED' | 'CANCELED' | 'RETURNED'; updated: string; currency?: string; expected_release_date?: string; external_bank_account_token?: string; type?: string; user_defined_id?: string; }`\n  Payment transaction\n\n  - `token: string`\n  - `category: string`\n  - `created: string`\n  - `descriptor: string`\n  - `direction: 'CREDIT' | 'DEBIT'`\n  - `events: { token: string; amount: number; created: string; result: 'APPROVED' | 'DECLINED'; type: string; detailed_results?: string[]; external_id?: string; }[]`\n  - `family: 'PAYMENT'`\n  - `financial_account_token: string`\n  - `method: 'ACH_NEXT_DAY' | 'ACH_SAME_DAY' | 'WIRE'`\n  - `method_attributes: { sec_code: 'CCD' | 'PPD' | 'WEB' | 'TEL' | 'CIE' | 'CTX'; ach_hold_period?: number; addenda?: string; company_id?: string; override_company_name?: string; receipt_routing_number?: string; retries?: number; return_reason_code?: string; trace_numbers?: string[]; } | { wire_message_type: string; wire_network: 'FEDWIRE' | 'SWIFT'; creditor?: { account_number?: string; agent_id?: string; agent_name?: string; name?: string; }; debtor?: { account_number?: string; agent_id?: string; agent_name?: string; name?: string; }; message_id?: string; remittance_information?: string; }`\n  - `pending_amount: number`\n  - `related_account_tokens: { account_token: string; business_account_token: string; }`\n  - `result: 'APPROVED' | 'DECLINED'`\n  - `settled_amount: number`\n  - `source: 'LITHIC' | 'EXTERNAL' | 'CUSTOMER'`\n  - `status: 'PENDING' | 'SETTLED' | 'DECLINED' | 'REVERSED' | 'CANCELED' | 'RETURNED'`\n  - `updated: string`\n  - `currency?: string`\n  - `expected_release_date?: string`\n  - `external_bank_account_token?: string`\n  - `type?: string`\n  - `user_defined_id?: string`\n\n### Example\n\n```typescript\nimport Lithic from 'lithic';\n\nconst client = new Lithic();\n\nconst payment = await client.payments.return('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', { financial_account_token: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', return_reason_code: 'R01' });\n\nconsole.log(payment);\n```",
  },
  {
    name: 'simulate_action',
    endpoint: '/v1/simulate/payments/{payment_token}/action',
    httpMethod: 'post',
    summary: 'Simulate payment lifecycle event',
    description: 'Simulate payment lifecycle event',
    stainlessPath: '(resource) payments > (method) simulate_action',
    qualified: 'client.payments.simulateAction',
    params: [
      'payment_token: string;',
      'event_type: string;',
      'date_of_death?: string;',
      'decline_reason?: string;',
      'return_addenda?: string;',
      'return_reason_code?: string;',
    ],
    response:
      "{ debugging_request_id: string; result: 'APPROVED' | 'DECLINED'; transaction_event_token: string; }",
    markdown:
      "## simulate_action\n\n`client.payments.simulateAction(payment_token: string, event_type: string, date_of_death?: string, decline_reason?: string, return_addenda?: string, return_reason_code?: string): { debugging_request_id: string; result: 'APPROVED' | 'DECLINED'; transaction_event_token: string; }`\n\n**post** `/v1/simulate/payments/{payment_token}/action`\n\nSimulate payment lifecycle event\n\n### Parameters\n\n- `payment_token: string`\n\n- `event_type: string`\n  Event Type\n\n- `date_of_death?: string`\n  Date of Death for ACH Return\n\n- `decline_reason?: string`\n  Decline reason\n\n- `return_addenda?: string`\n  Return Addenda\n\n- `return_reason_code?: string`\n  Return Reason Code\n\n### Returns\n\n- `{ debugging_request_id: string; result: 'APPROVED' | 'DECLINED'; transaction_event_token: string; }`\n\n  - `debugging_request_id: string`\n  - `result: 'APPROVED' | 'DECLINED'`\n  - `transaction_event_token: string`\n\n### Example\n\n```typescript\nimport Lithic from 'lithic';\n\nconst client = new Lithic();\n\nconst response = await client.payments.simulateAction('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', { event_type: 'ACH_ORIGINATION_REVIEWED' });\n\nconsole.log(response);\n```",
  },
  {
    name: 'simulate_receipt',
    endpoint: '/v1/simulate/payments/receipt',
    httpMethod: 'post',
    summary: 'Simulate receipt',
    description: 'Simulates a receipt of a Payment.',
    stainlessPath: '(resource) payments > (method) simulate_receipt',
    qualified: 'client.payments.simulateReceipt',
    params: [
      'token: string;',
      'amount: number;',
      'financial_account_token: string;',
      "receipt_type: 'RECEIPT_CREDIT' | 'RECEIPT_DEBIT';",
      'memo?: string;',
    ],
    response:
      "{ debugging_request_id: string; result: 'APPROVED' | 'DECLINED'; transaction_event_token: string; }",
    markdown:
      "## simulate_receipt\n\n`client.payments.simulateReceipt(token: string, amount: number, financial_account_token: string, receipt_type: 'RECEIPT_CREDIT' | 'RECEIPT_DEBIT', memo?: string): { debugging_request_id: string; result: 'APPROVED' | 'DECLINED'; transaction_event_token: string; }`\n\n**post** `/v1/simulate/payments/receipt`\n\nSimulates a receipt of a Payment.\n\n### Parameters\n\n- `token: string`\n  Customer-generated payment token used to uniquely identify the simulated payment\n\n- `amount: number`\n  Amount\n\n- `financial_account_token: string`\n  Financial Account Token\n\n- `receipt_type: 'RECEIPT_CREDIT' | 'RECEIPT_DEBIT'`\n  Receipt Type\n\n- `memo?: string`\n  Memo\n\n### Returns\n\n- `{ debugging_request_id: string; result: 'APPROVED' | 'DECLINED'; transaction_event_token: string; }`\n\n  - `debugging_request_id: string`\n  - `result: 'APPROVED' | 'DECLINED'`\n  - `transaction_event_token: string`\n\n### Example\n\n```typescript\nimport Lithic from 'lithic';\n\nconst client = new Lithic();\n\nconst response = await client.payments.simulateReceipt({\n  token: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',\n  amount: 0,\n  financial_account_token: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',\n  receipt_type: 'RECEIPT_CREDIT',\n});\n\nconsole.log(response);\n```",
  },
  {
    name: 'simulate_release',
    endpoint: '/v1/simulate/payments/release',
    httpMethod: 'post',
    summary: 'Simulate release payment',
    description: 'Simulates a release of a Payment.',
    stainlessPath: '(resource) payments > (method) simulate_release',
    qualified: 'client.payments.simulateRelease',
    params: ['payment_token: string;'],
    response:
      "{ debugging_request_id: string; result: 'APPROVED' | 'DECLINED'; transaction_event_token: string; }",
    markdown:
      "## simulate_release\n\n`client.payments.simulateRelease(payment_token: string): { debugging_request_id: string; result: 'APPROVED' | 'DECLINED'; transaction_event_token: string; }`\n\n**post** `/v1/simulate/payments/release`\n\nSimulates a release of a Payment.\n\n### Parameters\n\n- `payment_token: string`\n  Payment Token\n\n### Returns\n\n- `{ debugging_request_id: string; result: 'APPROVED' | 'DECLINED'; transaction_event_token: string; }`\n\n  - `debugging_request_id: string`\n  - `result: 'APPROVED' | 'DECLINED'`\n  - `transaction_event_token: string`\n\n### Example\n\n```typescript\nimport Lithic from 'lithic';\n\nconst client = new Lithic();\n\nconst response = await client.payments.simulateRelease({ payment_token: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e' });\n\nconsole.log(response);\n```",
  },
  {
    name: 'simulate_return',
    endpoint: '/v1/simulate/payments/return',
    httpMethod: 'post',
    summary: 'Simulate return payment',
    description: 'Simulates a return of a Payment.',
    stainlessPath: '(resource) payments > (method) simulate_return',
    qualified: 'client.payments.simulateReturn',
    params: ['payment_token: string;', 'return_reason_code?: string;'],
    response:
      "{ debugging_request_id: string; result: 'APPROVED' | 'DECLINED'; transaction_event_token: string; }",
    markdown:
      "## simulate_return\n\n`client.payments.simulateReturn(payment_token: string, return_reason_code?: string): { debugging_request_id: string; result: 'APPROVED' | 'DECLINED'; transaction_event_token: string; }`\n\n**post** `/v1/simulate/payments/return`\n\nSimulates a return of a Payment.\n\n### Parameters\n\n- `payment_token: string`\n  Payment Token\n\n- `return_reason_code?: string`\n  Return Reason Code\n\n### Returns\n\n- `{ debugging_request_id: string; result: 'APPROVED' | 'DECLINED'; transaction_event_token: string; }`\n\n  - `debugging_request_id: string`\n  - `result: 'APPROVED' | 'DECLINED'`\n  - `transaction_event_token: string`\n\n### Example\n\n```typescript\nimport Lithic from 'lithic';\n\nconst client = new Lithic();\n\nconst response = await client.payments.simulateReturn({ payment_token: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e' });\n\nconsole.log(response);\n```",
  },
  {
    name: 'retrieve',
    endpoint: '/v1/three_ds_authentication/{three_ds_authentication_token}',
    httpMethod: 'get',
    summary: 'Get 3DS authentication',
    description: 'Get 3DS Authentication by token',
    stainlessPath: '(resource) three_ds.authentication > (method) retrieve',
    qualified: 'client.threeDS.authentication.retrieve',
    params: ['three_ds_authentication_token: string;'],
    response:
      "{ token: string; account_type: 'CREDIT' | 'DEBIT' | 'NOT_APPLICABLE'; authentication_result: 'DECLINE' | 'SUCCESS' | 'PENDING_CHALLENGE' | 'PENDING_DECISION'; card_expiry_check: 'MATCH' | 'MISMATCH' | 'NOT_PRESENT'; card_token: string; cardholder: object; channel: 'APP_BASED' | 'BROWSER' | 'THREE_DS_REQUESTOR_INITIATED'; created: string; merchant: object; message_category: 'NON_PAYMENT_AUTHENTICATION' | 'PAYMENT_AUTHENTICATION'; three_ds_requestor_challenge_indicator: string; additional_data?: object; app?: object; authentication_request_type?: string; browser?: object; challenge_metadata?: object; challenge_orchestrated_by?: 'LITHIC' | 'CUSTOMER' | 'NO_CHALLENGE'; decision_made_by?: 'LITHIC_RULES' | 'LITHIC_DEFAULT' | 'CUSTOMER_RULES' | 'CUSTOMER_ENDPOINT' | 'NETWORK' | 'UNKNOWN'; three_ri_request_type?: string; transaction?: object; }",
    markdown:
      "## retrieve\n\n`client.threeDS.authentication.retrieve(three_ds_authentication_token: string): { token: string; account_type: 'CREDIT' | 'DEBIT' | 'NOT_APPLICABLE'; authentication_result: 'DECLINE' | 'SUCCESS' | 'PENDING_CHALLENGE' | 'PENDING_DECISION'; card_expiry_check: 'MATCH' | 'MISMATCH' | 'NOT_PRESENT'; card_token: string; cardholder: object; channel: 'APP_BASED' | 'BROWSER' | 'THREE_DS_REQUESTOR_INITIATED'; created: string; merchant: object; message_category: 'NON_PAYMENT_AUTHENTICATION' | 'PAYMENT_AUTHENTICATION'; three_ds_requestor_challenge_indicator: string; additional_data?: object; app?: object; authentication_request_type?: string; browser?: object; challenge_metadata?: object; challenge_orchestrated_by?: 'LITHIC' | 'CUSTOMER' | 'NO_CHALLENGE'; decision_made_by?: 'LITHIC_RULES' | 'LITHIC_DEFAULT' | 'CUSTOMER_RULES' | 'CUSTOMER_ENDPOINT' | 'NETWORK' | 'UNKNOWN'; three_ri_request_type?: string; transaction?: object; }`\n\n**get** `/v1/three_ds_authentication/{three_ds_authentication_token}`\n\nGet 3DS Authentication by token\n\n### Parameters\n\n- `three_ds_authentication_token: string`\n\n### Returns\n\n- `{ token: string; account_type: 'CREDIT' | 'DEBIT' | 'NOT_APPLICABLE'; authentication_result: 'DECLINE' | 'SUCCESS' | 'PENDING_CHALLENGE' | 'PENDING_DECISION'; card_expiry_check: 'MATCH' | 'MISMATCH' | 'NOT_PRESENT'; card_token: string; cardholder: { address_match?: boolean; address_on_file_match?: 'MATCH' | 'MATCH_ADDRESS_ONLY' | 'MATCH_ZIP_ONLY' | 'MISMATCH' | 'NOT_PRESENT'; billing_address?: { address1?: string; address2?: string; address3?: string; city?: string; country?: string; postal_code?: string; }; email?: string; name?: string; phone_number_home?: string; phone_number_mobile?: string; phone_number_work?: string; shipping_address?: { address1?: string; address2?: string; address3?: string; city?: string; country?: string; postal_code?: string; }; }; channel: 'APP_BASED' | 'BROWSER' | 'THREE_DS_REQUESTOR_INITIATED'; created: string; merchant: { risk_indicator: { delivery_email_address?: string; delivery_time_frame?: 'ELECTRONIC_DELIVERY' | 'OVERNIGHT_SHIPPING' | 'SAME_DAY_SHIPPING' | 'TWO_DAY_OR_MORE_SHIPPING'; gift_card_amount?: number; gift_card_count?: number; gift_card_currency?: string; order_availability?: 'FUTURE_AVAILABILITY' | 'MERCHANDISE_AVAILABLE'; pre_order_available_date?: string; reorder_items?: 'FIRST_TIME_ORDERED' | 'REORDERED'; shipping_method?: string; }; id?: string; country?: string; mcc?: string; name?: string; }; message_category: 'NON_PAYMENT_AUTHENTICATION' | 'PAYMENT_AUTHENTICATION'; three_ds_requestor_challenge_indicator: string; additional_data?: { network_decision?: 'LOW_RISK' | 'NOT_LOW_RISK'; network_risk_score?: number; }; app?: { device?: string; device_info?: string; ip?: string; latitude?: number; locale?: string; longitude?: number; os?: string; platform?: string; screen_height?: number; screen_width?: number; time_zone?: string; }; authentication_request_type?: string; browser?: { accept_header?: string; ip?: string; java_enabled?: boolean; javascript_enabled?: boolean; language?: string; time_zone?: string; user_agent?: string; }; challenge_metadata?: { method_type: 'SMS_OTP' | 'OUT_OF_BAND'; status: string; phone_number?: string; }; challenge_orchestrated_by?: 'LITHIC' | 'CUSTOMER' | 'NO_CHALLENGE'; decision_made_by?: 'LITHIC_RULES' | 'LITHIC_DEFAULT' | 'CUSTOMER_RULES' | 'CUSTOMER_ENDPOINT' | 'NETWORK' | 'UNKNOWN'; three_ri_request_type?: string; transaction?: { amount: number; cardholder_amount: number; currency: string; currency_exponent: number; date_time: string; type: string; }; }`\n  Represents a 3DS authentication\n\n  - `token: string`\n  - `account_type: 'CREDIT' | 'DEBIT' | 'NOT_APPLICABLE'`\n  - `authentication_result: 'DECLINE' | 'SUCCESS' | 'PENDING_CHALLENGE' | 'PENDING_DECISION'`\n  - `card_expiry_check: 'MATCH' | 'MISMATCH' | 'NOT_PRESENT'`\n  - `card_token: string`\n  - `cardholder: { address_match?: boolean; address_on_file_match?: 'MATCH' | 'MATCH_ADDRESS_ONLY' | 'MATCH_ZIP_ONLY' | 'MISMATCH' | 'NOT_PRESENT'; billing_address?: { address1?: string; address2?: string; address3?: string; city?: string; country?: string; postal_code?: string; }; email?: string; name?: string; phone_number_home?: string; phone_number_mobile?: string; phone_number_work?: string; shipping_address?: { address1?: string; address2?: string; address3?: string; city?: string; country?: string; postal_code?: string; }; }`\n  - `channel: 'APP_BASED' | 'BROWSER' | 'THREE_DS_REQUESTOR_INITIATED'`\n  - `created: string`\n  - `merchant: { risk_indicator: { delivery_email_address?: string; delivery_time_frame?: 'ELECTRONIC_DELIVERY' | 'OVERNIGHT_SHIPPING' | 'SAME_DAY_SHIPPING' | 'TWO_DAY_OR_MORE_SHIPPING'; gift_card_amount?: number; gift_card_count?: number; gift_card_currency?: string; order_availability?: 'FUTURE_AVAILABILITY' | 'MERCHANDISE_AVAILABLE'; pre_order_available_date?: string; reorder_items?: 'FIRST_TIME_ORDERED' | 'REORDERED'; shipping_method?: string; }; id?: string; country?: string; mcc?: string; name?: string; }`\n  - `message_category: 'NON_PAYMENT_AUTHENTICATION' | 'PAYMENT_AUTHENTICATION'`\n  - `three_ds_requestor_challenge_indicator: string`\n  - `additional_data?: { network_decision?: 'LOW_RISK' | 'NOT_LOW_RISK'; network_risk_score?: number; }`\n  - `app?: { device?: string; device_info?: string; ip?: string; latitude?: number; locale?: string; longitude?: number; os?: string; platform?: string; screen_height?: number; screen_width?: number; time_zone?: string; }`\n  - `authentication_request_type?: string`\n  - `browser?: { accept_header?: string; ip?: string; java_enabled?: boolean; javascript_enabled?: boolean; language?: string; time_zone?: string; user_agent?: string; }`\n  - `challenge_metadata?: { method_type: 'SMS_OTP' | 'OUT_OF_BAND'; status: string; phone_number?: string; }`\n  - `challenge_orchestrated_by?: 'LITHIC' | 'CUSTOMER' | 'NO_CHALLENGE'`\n  - `decision_made_by?: 'LITHIC_RULES' | 'LITHIC_DEFAULT' | 'CUSTOMER_RULES' | 'CUSTOMER_ENDPOINT' | 'NETWORK' | 'UNKNOWN'`\n  - `three_ri_request_type?: string`\n  - `transaction?: { amount: number; cardholder_amount: number; currency: string; currency_exponent: number; date_time: string; type: string; }`\n\n### Example\n\n```typescript\nimport Lithic from 'lithic';\n\nconst client = new Lithic();\n\nconst threeDSAuthentication = await client.threeDS.authentication.retrieve('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e');\n\nconsole.log(threeDSAuthentication);\n```",
  },
  {
    name: 'simulate',
    endpoint: '/v1/three_ds_authentication/simulate',
    httpMethod: 'post',
    summary: 'Simulate 3DS authentication',
    description:
      "Simulates a 3DS authentication request from the payment network as if it came from an ACS. If you're configured for 3DS Customer Decisioning, simulating authentications requires your customer decisioning endpoint to be set up properly (respond with a valid JSON). If the authentication decision is to challenge, ensure that the account holder associated with the card transaction has a valid phone number configured to receive the OTP code via SMS. ",
    stainlessPath: '(resource) three_ds.authentication > (method) simulate',
    qualified: 'client.threeDS.authentication.simulate',
    params: [
      'merchant: { id: string; country: string; mcc: string; name: string; };',
      'pan: string;',
      'transaction: { amount: number; currency: string; };',
      "card_expiry_check?: 'MATCH' | 'MISMATCH' | 'NOT_PRESENT';",
    ],
    response: '{ token?: string; }',
    markdown:
      "## simulate\n\n`client.threeDS.authentication.simulate(merchant: { id: string; country: string; mcc: string; name: string; }, pan: string, transaction: { amount: number; currency: string; }, card_expiry_check?: 'MATCH' | 'MISMATCH' | 'NOT_PRESENT'): { token?: string; }`\n\n**post** `/v1/three_ds_authentication/simulate`\n\nSimulates a 3DS authentication request from the payment network as if it came from an ACS. If you're configured for 3DS Customer Decisioning, simulating authentications requires your customer decisioning endpoint to be set up properly (respond with a valid JSON). If the authentication decision is to challenge, ensure that the account holder associated with the card transaction has a valid phone number configured to receive the OTP code via SMS. \n\n### Parameters\n\n- `merchant: { id: string; country: string; mcc: string; name: string; }`\n  Merchant information for the simulated transaction\n  - `id: string`\n    Unique identifier to identify the payment card acceptor. Corresponds to `merchant_acceptor_id` in authorization.\n  - `country: string`\n    Country of the address provided by the cardholder in ISO 3166-1 alpha-3 format (e.g. USA)\n  - `mcc: string`\n    Merchant category code for the transaction to be simulated. A four-digit number listed in ISO 18245. Supported merchant category codes can be found [here](https://docs.lithic.com/docs/transactions#merchant-category-codes-mccs).\n  - `name: string`\n    Merchant descriptor, corresponds to `descriptor` in authorization. If CHALLENGE keyword is included, Lithic will trigger a challenge.\n\n- `pan: string`\n  Sixteen digit card number.\n\n- `transaction: { amount: number; currency: string; }`\n  Transaction details for the simulation\n  - `amount: number`\n    Amount (in cents) to authenticate.\n  - `currency: string`\n    3-character alphabetic ISO 4217 currency code.\n\n- `card_expiry_check?: 'MATCH' | 'MISMATCH' | 'NOT_PRESENT'`\n  When set will use the following values as part of the Simulated Authentication. When not set defaults to MATCH\n\n### Returns\n\n- `{ token?: string; }`\n\n  - `token?: string`\n\n### Example\n\n```typescript\nimport Lithic from 'lithic';\n\nconst client = new Lithic();\n\nconst response = await client.threeDS.authentication.simulate({\n  merchant: {\n  id: 'OODKZAPJVN4YS7O',\n  country: 'USA',\n  mcc: '5812',\n  name: 'COFFEE SHOP',\n},\n  pan: '4111111289144142',\n  transaction: { amount: 0, currency: 'GBP' },\n});\n\nconsole.log(response);\n```",
  },
  {
    name: 'simulate_otp_entry',
    endpoint: '/v1/three_ds_decisioning/simulate/enter_otp',
    httpMethod: 'post',
    summary: 'Simulate entering OTP into 3DS Challenge UI',
    description:
      'Endpoint for simulating entering OTP into 3DS Challenge UI. A call to [/v1/three_ds_authentication/simulate](https://docs.lithic.com/reference/postsimulateauthentication) that resulted in triggered SMS-OTP challenge must precede. Only a single attempt is supported; upon entering OTP, the challenge is either approved or declined.',
    stainlessPath: '(resource) three_ds.authentication > (method) simulate_otp_entry',
    qualified: 'client.threeDS.authentication.simulateOtpEntry',
    params: ['token: string;', 'otp: string;'],
    markdown:
      "## simulate_otp_entry\n\n`client.threeDS.authentication.simulateOtpEntry(token: string, otp: string): void`\n\n**post** `/v1/three_ds_decisioning/simulate/enter_otp`\n\nEndpoint for simulating entering OTP into 3DS Challenge UI. A call to [/v1/three_ds_authentication/simulate](https://docs.lithic.com/reference/postsimulateauthentication) that resulted in triggered SMS-OTP challenge must precede. Only a single attempt is supported; upon entering OTP, the challenge is either approved or declined.\n\n### Parameters\n\n- `token: string`\n  A unique token returned as part of a /v1/three_ds_authentication/simulate call that resulted in PENDING_CHALLENGE authentication result.\n\n- `otp: string`\n  The OTP entered by the cardholder\n\n### Example\n\n```typescript\nimport Lithic from 'lithic';\n\nconst client = new Lithic();\n\nawait client.threeDS.authentication.simulateOtpEntry({ token: 'fabd829d-7f7b-4432-a8f2-07ea4889aaac', otp: '123456' })\n```",
  },
  {
    name: 'challenge_response',
    endpoint: '/v1/three_ds_decisioning/challenge_response',
    httpMethod: 'post',
    summary: 'Respond to a Challenge Request',
    description:
      "Card program's response to a 3DS Challenge Request.\nChallenge Request is emitted as a webhook [three_ds_authentication.challenge](https://docs.lithic.com/reference/post_three-ds-authentication-challenge) and your Card Program needs to be configured with Out of Band (OOB) Challenges in order to receive it (see https://docs.lithic.com/docs/3ds-challenge-flow for more information).",
    stainlessPath: '(resource) three_ds.decisioning > (method) challenge_response',
    qualified: 'client.threeDS.decisioning.challengeResponse',
    params: ['token: string;', "challenge_response: 'APPROVE' | 'DECLINE_BY_CUSTOMER';"],
    markdown:
      "## challenge_response\n\n`client.threeDS.decisioning.challengeResponse(token: string, challenge_response: 'APPROVE' | 'DECLINE_BY_CUSTOMER'): void`\n\n**post** `/v1/three_ds_decisioning/challenge_response`\n\nCard program's response to a 3DS Challenge Request.\nChallenge Request is emitted as a webhook [three_ds_authentication.challenge](https://docs.lithic.com/reference/post_three-ds-authentication-challenge) and your Card Program needs to be configured with Out of Band (OOB) Challenges in order to receive it (see https://docs.lithic.com/docs/3ds-challenge-flow for more information).\n\n### Parameters\n\n- `token: string`\n  Globally unique identifier for 3DS Authentication that resulted in PENDING_CHALLENGE authentication result.\n\n- `challenge_response: 'APPROVE' | 'DECLINE_BY_CUSTOMER'`\n  Whether the Cardholder has approved or declined the issued Challenge\n\n### Example\n\n```typescript\nimport Lithic from 'lithic';\n\nconst client = new Lithic();\n\nawait client.threeDS.decisioning.challengeResponse({ token: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', challenge_response: 'APPROVE' })\n```",
  },
  {
    name: 'retrieve_secret',
    endpoint: '/v1/three_ds_decisioning/secret',
    httpMethod: 'get',
    summary: 'Retrieve the 3DS Decisioning HMAC secret key',
    description:
      'Retrieve the 3DS Decisioning HMAC secret key. If one does not exist for your program yet, calling this endpoint will create one for you. The headers (which you can use to verify 3DS Decisioning requests) will begin appearing shortly after calling this endpoint for the first time. See [this page](https://docs.lithic.com/docs/3ds-decisioning#3ds-decisioning-hmac-secrets) for more detail about verifying 3DS Decisioning requests.\n',
    stainlessPath: '(resource) three_ds.decisioning > (method) retrieve_secret',
    qualified: 'client.threeDS.decisioning.retrieveSecret',
    response: '{ secret?: string; }',
    markdown:
      "## retrieve_secret\n\n`client.threeDS.decisioning.retrieveSecret(): { secret?: string; }`\n\n**get** `/v1/three_ds_decisioning/secret`\n\nRetrieve the 3DS Decisioning HMAC secret key. If one does not exist for your program yet, calling this endpoint will create one for you. The headers (which you can use to verify 3DS Decisioning requests) will begin appearing shortly after calling this endpoint for the first time. See [this page](https://docs.lithic.com/docs/3ds-decisioning#3ds-decisioning-hmac-secrets) for more detail about verifying 3DS Decisioning requests.\n\n\n### Returns\n\n- `{ secret?: string; }`\n\n  - `secret?: string`\n\n### Example\n\n```typescript\nimport Lithic from 'lithic';\n\nconst client = new Lithic();\n\nconst response = await client.threeDS.decisioning.retrieveSecret();\n\nconsole.log(response);\n```",
  },
  {
    name: 'rotate_secret',
    endpoint: '/v1/three_ds_decisioning/secret/rotate',
    httpMethod: 'post',
    summary: 'Rotate the 3DS Decisioning HMAC secret key',
    description:
      'Generate a new 3DS Decisioning HMAC secret key. The old secret key will be deactivated 24 hours after a successful request to this endpoint. Make a [`GET /three_ds_decisioning/secret`](https://docs.lithic.com/reference/getthreedsdecisioningsecret) request to retrieve the new secret key.\n',
    stainlessPath: '(resource) three_ds.decisioning > (method) rotate_secret',
    qualified: 'client.threeDS.decisioning.rotateSecret',
    markdown:
      "## rotate_secret\n\n`client.threeDS.decisioning.rotateSecret(): void`\n\n**post** `/v1/three_ds_decisioning/secret/rotate`\n\nGenerate a new 3DS Decisioning HMAC secret key. The old secret key will be deactivated 24 hours after a successful request to this endpoint. Make a [`GET /three_ds_decisioning/secret`](https://docs.lithic.com/reference/getthreedsdecisioningsecret) request to retrieve the new secret key.\n\n\n### Example\n\n```typescript\nimport Lithic from 'lithic';\n\nconst client = new Lithic();\n\nawait client.threeDS.decisioning.rotateSecret()\n```",
  },
  {
    name: 'list_details',
    endpoint: '/v1/reports/settlement/details/{report_date}',
    httpMethod: 'get',
    summary: 'List settlement details',
    description: 'List details.',
    stainlessPath: '(resource) reports.settlement > (method) list_details',
    qualified: 'client.reports.settlement.listDetails',
    params: [
      'report_date: string;',
      'ending_before?: string;',
      'page_size?: number;',
      'starting_after?: string;',
    ],
    response:
      "{ token: string; account_token: string; card_program_token: string; card_token: string; created: string; currency: string; disputes_gross_amount: number; event_tokens: string[]; institution: string; interchange_fee_extended_precision: number; interchange_gross_amount: number; network: 'INTERLINK' | 'MAESTRO' | 'MASTERCARD' | 'UNKNOWN' | 'VISA'; other_fees_details: { ISA?: number; }; other_fees_gross_amount: number; report_date: string; settlement_date: string; transaction_token: string; transactions_gross_amount: number; type: string; updated: string; fee_description?: string; }",
    markdown:
      "## list_details\n\n`client.reports.settlement.listDetails(report_date: string, ending_before?: string, page_size?: number, starting_after?: string): { token: string; account_token: string; card_program_token: string; card_token: string; created: string; currency: string; disputes_gross_amount: number; event_tokens: string[]; institution: string; interchange_fee_extended_precision: number; interchange_gross_amount: number; network: 'INTERLINK' | 'MAESTRO' | 'MASTERCARD' | 'UNKNOWN' | 'VISA'; other_fees_details: object; other_fees_gross_amount: number; report_date: string; settlement_date: string; transaction_token: string; transactions_gross_amount: number; type: string; updated: string; fee_description?: string; }`\n\n**get** `/v1/reports/settlement/details/{report_date}`\n\nList details.\n\n### Parameters\n\n- `report_date: string`\n\n- `ending_before?: string`\n  A cursor representing an item's token before which a page of results should end. Used to retrieve the previous page of results before this item.\n\n- `page_size?: number`\n  Number of records per page.\n\n- `starting_after?: string`\n  A cursor representing an item's token after which a page of results should begin. Used to retrieve the next page of results after this item.\n\n### Returns\n\n- `{ token: string; account_token: string; card_program_token: string; card_token: string; created: string; currency: string; disputes_gross_amount: number; event_tokens: string[]; institution: string; interchange_fee_extended_precision: number; interchange_gross_amount: number; network: 'INTERLINK' | 'MAESTRO' | 'MASTERCARD' | 'UNKNOWN' | 'VISA'; other_fees_details: { ISA?: number; }; other_fees_gross_amount: number; report_date: string; settlement_date: string; transaction_token: string; transactions_gross_amount: number; type: string; updated: string; fee_description?: string; }`\n\n  - `token: string`\n  - `account_token: string`\n  - `card_program_token: string`\n  - `card_token: string`\n  - `created: string`\n  - `currency: string`\n  - `disputes_gross_amount: number`\n  - `event_tokens: string[]`\n  - `institution: string`\n  - `interchange_fee_extended_precision: number`\n  - `interchange_gross_amount: number`\n  - `network: 'INTERLINK' | 'MAESTRO' | 'MASTERCARD' | 'UNKNOWN' | 'VISA'`\n  - `other_fees_details: { ISA?: number; }`\n  - `other_fees_gross_amount: number`\n  - `report_date: string`\n  - `settlement_date: string`\n  - `transaction_token: string`\n  - `transactions_gross_amount: number`\n  - `type: string`\n  - `updated: string`\n  - `fee_description?: string`\n\n### Example\n\n```typescript\nimport Lithic from 'lithic';\n\nconst client = new Lithic();\n\n// Automatically fetches more pages as needed.\nfor await (const settlementDetail of client.reports.settlement.listDetails('2023-09-01')) {\n  console.log(settlementDetail);\n}\n```",
  },
  {
    name: 'summary',
    endpoint: '/v1/reports/settlement/summary/{report_date}',
    httpMethod: 'get',
    summary: 'Get settlement summary',
    description: 'Get the settlement report for a specified report date. Not available in sandbox.',
    stainlessPath: '(resource) reports.settlement > (method) summary',
    qualified: 'client.reports.settlement.summary',
    params: ['report_date: string;'],
    response:
      "{ created: string; currency: string; details: { currency?: string; disputes_gross_amount?: number; institution?: string; interchange_gross_amount?: number; network?: 'INTERLINK' | 'MAESTRO' | 'MASTERCARD' | 'UNKNOWN' | 'VISA'; other_fees_gross_amount?: number; settled_net_amount?: number; transactions_gross_amount?: number; }[]; disputes_gross_amount: number; interchange_gross_amount: number; is_complete: boolean; other_fees_gross_amount: number; report_date: string; settled_net_amount: number; transactions_gross_amount: number; updated: string; }",
    markdown:
      "## summary\n\n`client.reports.settlement.summary(report_date: string): { created: string; currency: string; details: settlement_summary_details[]; disputes_gross_amount: number; interchange_gross_amount: number; is_complete: boolean; other_fees_gross_amount: number; report_date: string; settled_net_amount: number; transactions_gross_amount: number; updated: string; }`\n\n**get** `/v1/reports/settlement/summary/{report_date}`\n\nGet the settlement report for a specified report date. Not available in sandbox.\n\n### Parameters\n\n- `report_date: string`\n\n### Returns\n\n- `{ created: string; currency: string; details: { currency?: string; disputes_gross_amount?: number; institution?: string; interchange_gross_amount?: number; network?: 'INTERLINK' | 'MAESTRO' | 'MASTERCARD' | 'UNKNOWN' | 'VISA'; other_fees_gross_amount?: number; settled_net_amount?: number; transactions_gross_amount?: number; }[]; disputes_gross_amount: number; interchange_gross_amount: number; is_complete: boolean; other_fees_gross_amount: number; report_date: string; settled_net_amount: number; transactions_gross_amount: number; updated: string; }`\n\n  - `created: string`\n  - `currency: string`\n  - `details: { currency?: string; disputes_gross_amount?: number; institution?: string; interchange_gross_amount?: number; network?: 'INTERLINK' | 'MAESTRO' | 'MASTERCARD' | 'UNKNOWN' | 'VISA'; other_fees_gross_amount?: number; settled_net_amount?: number; transactions_gross_amount?: number; }[]`\n  - `disputes_gross_amount: number`\n  - `interchange_gross_amount: number`\n  - `is_complete: boolean`\n  - `other_fees_gross_amount: number`\n  - `report_date: string`\n  - `settled_net_amount: number`\n  - `transactions_gross_amount: number`\n  - `updated: string`\n\n### Example\n\n```typescript\nimport Lithic from 'lithic';\n\nconst client = new Lithic();\n\nconst settlementReport = await client.reports.settlement.summary('2023-09-01');\n\nconsole.log(settlementReport);\n```",
  },
  {
    name: 'retrieve',
    endpoint: '/v1/reports/settlement/network_totals/{token}',
    httpMethod: 'get',
    summary: 'Get network total',
    description: 'Retrieve a specific network total record by token. Not available in sandbox.',
    stainlessPath: '(resource) reports.settlement.network_totals > (method) retrieve',
    qualified: 'client.reports.settlement.networkTotals.retrieve',
    params: ['token: string;'],
    response:
      "{ token: string; amounts: { gross_settlement: number; interchange_fees: number; net_settlement: number; visa_charges?: number; }; created: string; currency: string; institution_id: string; is_complete: boolean; network: 'AMEX' | 'VISA' | 'MASTERCARD' | 'MAESTRO' | 'INTERLINK'; report_date: string; settlement_institution_id: string; settlement_service: string; updated: string; cycle?: number; }",
    markdown:
      "## retrieve\n\n`client.reports.settlement.networkTotals.retrieve(token: string): { token: string; amounts: object; created: string; currency: string; institution_id: string; is_complete: boolean; network: 'AMEX' | 'VISA' | 'MASTERCARD' | 'MAESTRO' | 'INTERLINK'; report_date: string; settlement_institution_id: string; settlement_service: string; updated: string; cycle?: number; }`\n\n**get** `/v1/reports/settlement/network_totals/{token}`\n\nRetrieve a specific network total record by token. Not available in sandbox.\n\n### Parameters\n\n- `token: string`\n\n### Returns\n\n- `{ token: string; amounts: { gross_settlement: number; interchange_fees: number; net_settlement: number; visa_charges?: number; }; created: string; currency: string; institution_id: string; is_complete: boolean; network: 'AMEX' | 'VISA' | 'MASTERCARD' | 'MAESTRO' | 'INTERLINK'; report_date: string; settlement_institution_id: string; settlement_service: string; updated: string; cycle?: number; }`\n\n  - `token: string`\n  - `amounts: { gross_settlement: number; interchange_fees: number; net_settlement: number; visa_charges?: number; }`\n  - `created: string`\n  - `currency: string`\n  - `institution_id: string`\n  - `is_complete: boolean`\n  - `network: 'AMEX' | 'VISA' | 'MASTERCARD' | 'MAESTRO' | 'INTERLINK'`\n  - `report_date: string`\n  - `settlement_institution_id: string`\n  - `settlement_service: string`\n  - `updated: string`\n  - `cycle?: number`\n\n### Example\n\n```typescript\nimport Lithic from 'lithic';\n\nconst client = new Lithic();\n\nconst networkTotal = await client.reports.settlement.networkTotals.retrieve('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e');\n\nconsole.log(networkTotal);\n```",
  },
  {
    name: 'list',
    endpoint: '/v1/reports/settlement/network_totals',
    httpMethod: 'get',
    summary: 'List network totals',
    description: 'List network total records with optional filters. Not available in sandbox.',
    stainlessPath: '(resource) reports.settlement.network_totals > (method) list',
    qualified: 'client.reports.settlement.networkTotals.list',
    params: [
      'begin?: string;',
      'end?: string;',
      'ending_before?: string;',
      'institution_id?: string;',
      "network?: 'VISA' | 'MASTERCARD' | 'MAESTRO' | 'INTERLINK';",
      'page_size?: number;',
      'report_date?: string;',
      'report_date_begin?: string;',
      'report_date_end?: string;',
      'settlement_institution_id?: string;',
      'starting_after?: string;',
    ],
    response:
      "{ token: string; amounts: { gross_settlement: number; interchange_fees: number; net_settlement: number; visa_charges?: number; }; created: string; currency: string; institution_id: string; is_complete: boolean; network: 'AMEX' | 'VISA' | 'MASTERCARD' | 'MAESTRO' | 'INTERLINK'; report_date: string; settlement_institution_id: string; settlement_service: string; updated: string; cycle?: number; }",
    markdown:
      "## list\n\n`client.reports.settlement.networkTotals.list(begin?: string, end?: string, ending_before?: string, institution_id?: string, network?: 'VISA' | 'MASTERCARD' | 'MAESTRO' | 'INTERLINK', page_size?: number, report_date?: string, report_date_begin?: string, report_date_end?: string, settlement_institution_id?: string, starting_after?: string): { token: string; amounts: object; created: string; currency: string; institution_id: string; is_complete: boolean; network: 'AMEX' | 'VISA' | 'MASTERCARD' | 'MAESTRO' | 'INTERLINK'; report_date: string; settlement_institution_id: string; settlement_service: string; updated: string; cycle?: number; }`\n\n**get** `/v1/reports/settlement/network_totals`\n\nList network total records with optional filters. Not available in sandbox.\n\n### Parameters\n\n- `begin?: string`\n  Datetime in RFC 3339 format. Only entries created after the specified time will be included. UTC time zone.\n\n- `end?: string`\n  Datetime in RFC 3339 format. Only entries created before the specified time will be included. UTC time zone.\n\n- `ending_before?: string`\n  A cursor representing an item's token before which a page of results should end. Used to retrieve the previous page of results before this item.\n\n- `institution_id?: string`\n  Institution ID to filter on.\n\n- `network?: 'VISA' | 'MASTERCARD' | 'MAESTRO' | 'INTERLINK'`\n  Network to filter on.\n\n- `page_size?: number`\n  Number of records per page.\n\n- `report_date?: string`\n  Singular report date to filter on (YYYY-MM-DD). Cannot be populated in conjunction with report_date_begin or report_date_end.\n\n- `report_date_begin?: string`\n  Earliest report date to filter on, inclusive (YYYY-MM-DD).\n\n- `report_date_end?: string`\n  Latest report date to filter on, inclusive (YYYY-MM-DD).\n\n- `settlement_institution_id?: string`\n  Settlement institution ID to filter on.\n\n- `starting_after?: string`\n  A cursor representing an item's token after which a page of results should begin. Used to retrieve the next page of results after this item.\n\n### Returns\n\n- `{ token: string; amounts: { gross_settlement: number; interchange_fees: number; net_settlement: number; visa_charges?: number; }; created: string; currency: string; institution_id: string; is_complete: boolean; network: 'AMEX' | 'VISA' | 'MASTERCARD' | 'MAESTRO' | 'INTERLINK'; report_date: string; settlement_institution_id: string; settlement_service: string; updated: string; cycle?: number; }`\n\n  - `token: string`\n  - `amounts: { gross_settlement: number; interchange_fees: number; net_settlement: number; visa_charges?: number; }`\n  - `created: string`\n  - `currency: string`\n  - `institution_id: string`\n  - `is_complete: boolean`\n  - `network: 'AMEX' | 'VISA' | 'MASTERCARD' | 'MAESTRO' | 'INTERLINK'`\n  - `report_date: string`\n  - `settlement_institution_id: string`\n  - `settlement_service: string`\n  - `updated: string`\n  - `cycle?: number`\n\n### Example\n\n```typescript\nimport Lithic from 'lithic';\n\nconst client = new Lithic();\n\n// Automatically fetches more pages as needed.\nfor await (const networkTotal of client.reports.settlement.networkTotals.list()) {\n  console.log(networkTotal);\n}\n```",
  },
  {
    name: 'retrieve',
    endpoint: '/v1/card_programs/{card_program_token}',
    httpMethod: 'get',
    summary: 'Get card program',
    description: 'Get card program.',
    stainlessPath: '(resource) card_programs > (method) retrieve',
    qualified: 'client.cardPrograms.retrieve',
    params: ['card_program_token: string;'],
    response:
      '{ token: string; account_level_management_enabled: boolean; created: string; name: string; pan_range_end: string; pan_range_start: string; cardholder_currency?: string; settlement_currencies?: string[]; }',
    markdown:
      "## retrieve\n\n`client.cardPrograms.retrieve(card_program_token: string): { token: string; account_level_management_enabled: boolean; created: string; name: string; pan_range_end: string; pan_range_start: string; cardholder_currency?: string; settlement_currencies?: string[]; }`\n\n**get** `/v1/card_programs/{card_program_token}`\n\nGet card program.\n\n### Parameters\n\n- `card_program_token: string`\n\n### Returns\n\n- `{ token: string; account_level_management_enabled: boolean; created: string; name: string; pan_range_end: string; pan_range_start: string; cardholder_currency?: string; settlement_currencies?: string[]; }`\n\n  - `token: string`\n  - `account_level_management_enabled: boolean`\n  - `created: string`\n  - `name: string`\n  - `pan_range_end: string`\n  - `pan_range_start: string`\n  - `cardholder_currency?: string`\n  - `settlement_currencies?: string[]`\n\n### Example\n\n```typescript\nimport Lithic from 'lithic';\n\nconst client = new Lithic();\n\nconst cardProgram = await client.cardPrograms.retrieve('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e');\n\nconsole.log(cardProgram);\n```",
  },
  {
    name: 'list',
    endpoint: '/v1/card_programs',
    httpMethod: 'get',
    summary: 'List card programs',
    description: 'List card programs.',
    stainlessPath: '(resource) card_programs > (method) list',
    qualified: 'client.cardPrograms.list',
    params: ['ending_before?: string;', 'page_size?: number;', 'starting_after?: string;'],
    response:
      '{ token: string; account_level_management_enabled: boolean; created: string; name: string; pan_range_end: string; pan_range_start: string; cardholder_currency?: string; settlement_currencies?: string[]; }',
    markdown:
      "## list\n\n`client.cardPrograms.list(ending_before?: string, page_size?: number, starting_after?: string): { token: string; account_level_management_enabled: boolean; created: string; name: string; pan_range_end: string; pan_range_start: string; cardholder_currency?: string; settlement_currencies?: string[]; }`\n\n**get** `/v1/card_programs`\n\nList card programs.\n\n### Parameters\n\n- `ending_before?: string`\n  A cursor representing an item's token before which a page of results should end. Used to retrieve the previous page of results before this item.\n\n- `page_size?: number`\n  Page size (for pagination).\n\n- `starting_after?: string`\n  A cursor representing an item's token after which a page of results should begin. Used to retrieve the next page of results after this item.\n\n### Returns\n\n- `{ token: string; account_level_management_enabled: boolean; created: string; name: string; pan_range_end: string; pan_range_start: string; cardholder_currency?: string; settlement_currencies?: string[]; }`\n\n  - `token: string`\n  - `account_level_management_enabled: boolean`\n  - `created: string`\n  - `name: string`\n  - `pan_range_end: string`\n  - `pan_range_start: string`\n  - `cardholder_currency?: string`\n  - `settlement_currencies?: string[]`\n\n### Example\n\n```typescript\nimport Lithic from 'lithic';\n\nconst client = new Lithic();\n\n// Automatically fetches more pages as needed.\nfor await (const cardProgram of client.cardPrograms.list()) {\n  console.log(cardProgram);\n}\n```",
  },
  {
    name: 'retrieve',
    endpoint: '/v1/digital_card_art/{digital_card_art_token}',
    httpMethod: 'get',
    summary: 'Get digital card art by token',
    description: 'Get digital card art by token.',
    stainlessPath: '(resource) digital_card_art > (method) retrieve',
    qualified: 'client.digitalCardArt.retrieve',
    params: ['digital_card_art_token: string;'],
    response:
      "{ token: string; card_program_token: string; created: string; description: string; is_enabled: boolean; network: 'MASTERCARD' | 'VISA'; is_card_program_default?: boolean; }",
    markdown:
      "## retrieve\n\n`client.digitalCardArt.retrieve(digital_card_art_token: string): { token: string; card_program_token: string; created: string; description: string; is_enabled: boolean; network: 'MASTERCARD' | 'VISA'; is_card_program_default?: boolean; }`\n\n**get** `/v1/digital_card_art/{digital_card_art_token}`\n\nGet digital card art by token.\n\n### Parameters\n\n- `digital_card_art_token: string`\n\n### Returns\n\n- `{ token: string; card_program_token: string; created: string; description: string; is_enabled: boolean; network: 'MASTERCARD' | 'VISA'; is_card_program_default?: boolean; }`\n\n  - `token: string`\n  - `card_program_token: string`\n  - `created: string`\n  - `description: string`\n  - `is_enabled: boolean`\n  - `network: 'MASTERCARD' | 'VISA'`\n  - `is_card_program_default?: boolean`\n\n### Example\n\n```typescript\nimport Lithic from 'lithic';\n\nconst client = new Lithic();\n\nconst digitalCardArt = await client.digitalCardArt.retrieve('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e');\n\nconsole.log(digitalCardArt);\n```",
  },
  {
    name: 'list',
    endpoint: '/v1/digital_card_art',
    httpMethod: 'get',
    summary: 'List digital card art',
    description: 'List digital card art.',
    stainlessPath: '(resource) digital_card_art > (method) list',
    qualified: 'client.digitalCardArt.list',
    params: ['ending_before?: string;', 'page_size?: number;', 'starting_after?: string;'],
    response:
      "{ token: string; card_program_token: string; created: string; description: string; is_enabled: boolean; network: 'MASTERCARD' | 'VISA'; is_card_program_default?: boolean; }",
    markdown:
      "## list\n\n`client.digitalCardArt.list(ending_before?: string, page_size?: number, starting_after?: string): { token: string; card_program_token: string; created: string; description: string; is_enabled: boolean; network: 'MASTERCARD' | 'VISA'; is_card_program_default?: boolean; }`\n\n**get** `/v1/digital_card_art`\n\nList digital card art.\n\n### Parameters\n\n- `ending_before?: string`\n  A cursor representing an item's token before which a page of results should end. Used to retrieve the previous page of results before this item.\n\n- `page_size?: number`\n  Page size (for pagination).\n\n- `starting_after?: string`\n  A cursor representing an item's token after which a page of results should begin. Used to retrieve the next page of results after this item.\n\n### Returns\n\n- `{ token: string; card_program_token: string; created: string; description: string; is_enabled: boolean; network: 'MASTERCARD' | 'VISA'; is_card_program_default?: boolean; }`\n\n  - `token: string`\n  - `card_program_token: string`\n  - `created: string`\n  - `description: string`\n  - `is_enabled: boolean`\n  - `network: 'MASTERCARD' | 'VISA'`\n  - `is_card_program_default?: boolean`\n\n### Example\n\n```typescript\nimport Lithic from 'lithic';\n\nconst client = new Lithic();\n\n// Automatically fetches more pages as needed.\nfor await (const digitalCardArt of client.digitalCardArt.list()) {\n  console.log(digitalCardArt);\n}\n```",
  },
  {
    name: 'create',
    endpoint: '/v1/book_transfers',
    httpMethod: 'post',
    summary: 'Create book transfer',
    description: 'Book transfer funds between two financial accounts or between a financial account and card',
    stainlessPath: '(resource) book_transfers > (method) create',
    qualified: 'client.bookTransfers.create',
    params: [
      'amount: number;',
      'category: string;',
      'from_financial_account_token: string;',
      'subtype: string;',
      'to_financial_account_token: string;',
      'type: string;',
      'token?: string;',
      'external_id?: string;',
      'hold_token?: string;',
      'memo?: string;',
      "on_closed_account?: 'FAIL' | 'USE_SUSPENSE';",
    ],
    response:
      "{ token: string; category: string; created: string; currency: string; events: { token: string; amount: number; created: string; detailed_results: 'APPROVED' | 'FUNDS_INSUFFICIENT'[]; memo: string; result: 'APPROVED' | 'DECLINED'; subtype: string; type: string; }[]; family: 'TRANSFER'; from_financial_account_token: string; pending_amount: number; result: 'APPROVED' | 'DECLINED'; settled_amount: number; status: 'PENDING' | 'SETTLED' | 'DECLINED' | 'REVERSED' | 'CANCELED' | 'RETURNED'; to_financial_account_token: string; updated: string; external_id?: string; external_resource?: { external_resource_token: string; external_resource_type: external_resource_type; external_resource_sub_token?: string; }; transaction_series?: { related_transaction_event_token: string; related_transaction_token: string; type: string; }; }",
    markdown:
      "## create\n\n`client.bookTransfers.create(amount: number, category: string, from_financial_account_token: string, subtype: string, to_financial_account_token: string, type: string, token?: string, external_id?: string, hold_token?: string, memo?: string, on_closed_account?: 'FAIL' | 'USE_SUSPENSE'): { token: string; category: string; created: string; currency: string; events: object[]; family: 'TRANSFER'; from_financial_account_token: string; pending_amount: number; result: 'APPROVED' | 'DECLINED'; settled_amount: number; status: 'PENDING' | 'SETTLED' | 'DECLINED' | 'REVERSED' | 'CANCELED' | 'RETURNED'; to_financial_account_token: string; updated: string; external_id?: string; external_resource?: external_resource; transaction_series?: object; }`\n\n**post** `/v1/book_transfers`\n\nBook transfer funds between two financial accounts or between a financial account and card\n\n### Parameters\n\n- `amount: number`\n  Amount to be transferred in the currency's smallest unit (e.g., cents for USD). This should always be a positive value.\n\n- `category: string`\n\n- `from_financial_account_token: string`\n  Globally unique identifier for the financial account or card that will send the funds. Accepted type dependent on the program's use case.\n\n- `subtype: string`\n  The program specific subtype code for the specified category/type.\n\n- `to_financial_account_token: string`\n  Globally unique identifier for the financial account or card that will receive the funds. Accepted type dependent on the program's use case.\n\n- `type: string`\n  Type of the book transfer\n\n- `token?: string`\n  Customer-provided token that will serve as an idempotency token. This token will become the transaction token.\n\n- `external_id?: string`\n  External ID defined by the customer\n\n- `hold_token?: string`\n  Token of an existing hold to settle when this transfer is initiated\n\n- `memo?: string`\n  Optional descriptor for the transfer.\n\n- `on_closed_account?: 'FAIL' | 'USE_SUSPENSE'`\n  What to do if the financial account is closed when posting an operation\n\n### Returns\n\n- `{ token: string; category: string; created: string; currency: string; events: { token: string; amount: number; created: string; detailed_results: 'APPROVED' | 'FUNDS_INSUFFICIENT'[]; memo: string; result: 'APPROVED' | 'DECLINED'; subtype: string; type: string; }[]; family: 'TRANSFER'; from_financial_account_token: string; pending_amount: number; result: 'APPROVED' | 'DECLINED'; settled_amount: number; status: 'PENDING' | 'SETTLED' | 'DECLINED' | 'REVERSED' | 'CANCELED' | 'RETURNED'; to_financial_account_token: string; updated: string; external_id?: string; external_resource?: { external_resource_token: string; external_resource_type: external_resource_type; external_resource_sub_token?: string; }; transaction_series?: { related_transaction_event_token: string; related_transaction_token: string; type: string; }; }`\n  Book transfer transaction\n\n  - `token: string`\n  - `category: string`\n  - `created: string`\n  - `currency: string`\n  - `events: { token: string; amount: number; created: string; detailed_results: 'APPROVED' | 'FUNDS_INSUFFICIENT'[]; memo: string; result: 'APPROVED' | 'DECLINED'; subtype: string; type: string; }[]`\n  - `family: 'TRANSFER'`\n  - `from_financial_account_token: string`\n  - `pending_amount: number`\n  - `result: 'APPROVED' | 'DECLINED'`\n  - `settled_amount: number`\n  - `status: 'PENDING' | 'SETTLED' | 'DECLINED' | 'REVERSED' | 'CANCELED' | 'RETURNED'`\n  - `to_financial_account_token: string`\n  - `updated: string`\n  - `external_id?: string`\n  - `external_resource?: { external_resource_token: string; external_resource_type: 'STATEMENT' | 'COLLECTION' | 'DISPUTE' | 'UNKNOWN'; external_resource_sub_token?: string; }`\n  - `transaction_series?: { related_transaction_event_token: string; related_transaction_token: string; type: string; }`\n\n### Example\n\n```typescript\nimport Lithic from 'lithic';\n\nconst client = new Lithic();\n\nconst bookTransferResponse = await client.bookTransfers.create({\n  amount: 1,\n  category: 'ADJUSTMENT',\n  from_financial_account_token: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',\n  subtype: 'subtype',\n  to_financial_account_token: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',\n  type: 'ATM_BALANCE_INQUIRY',\n});\n\nconsole.log(bookTransferResponse);\n```",
  },
  {
    name: 'retrieve',
    endpoint: '/v1/book_transfers/{book_transfer_token}',
    httpMethod: 'get',
    summary: 'Get book transfer by token',
    description: 'Get book transfer by token',
    stainlessPath: '(resource) book_transfers > (method) retrieve',
    qualified: 'client.bookTransfers.retrieve',
    params: ['book_transfer_token: string;'],
    response:
      "{ token: string; category: string; created: string; currency: string; events: { token: string; amount: number; created: string; detailed_results: 'APPROVED' | 'FUNDS_INSUFFICIENT'[]; memo: string; result: 'APPROVED' | 'DECLINED'; subtype: string; type: string; }[]; family: 'TRANSFER'; from_financial_account_token: string; pending_amount: number; result: 'APPROVED' | 'DECLINED'; settled_amount: number; status: 'PENDING' | 'SETTLED' | 'DECLINED' | 'REVERSED' | 'CANCELED' | 'RETURNED'; to_financial_account_token: string; updated: string; external_id?: string; external_resource?: { external_resource_token: string; external_resource_type: external_resource_type; external_resource_sub_token?: string; }; transaction_series?: { related_transaction_event_token: string; related_transaction_token: string; type: string; }; }",
    markdown:
      "## retrieve\n\n`client.bookTransfers.retrieve(book_transfer_token: string): { token: string; category: string; created: string; currency: string; events: object[]; family: 'TRANSFER'; from_financial_account_token: string; pending_amount: number; result: 'APPROVED' | 'DECLINED'; settled_amount: number; status: 'PENDING' | 'SETTLED' | 'DECLINED' | 'REVERSED' | 'CANCELED' | 'RETURNED'; to_financial_account_token: string; updated: string; external_id?: string; external_resource?: external_resource; transaction_series?: object; }`\n\n**get** `/v1/book_transfers/{book_transfer_token}`\n\nGet book transfer by token\n\n### Parameters\n\n- `book_transfer_token: string`\n\n### Returns\n\n- `{ token: string; category: string; created: string; currency: string; events: { token: string; amount: number; created: string; detailed_results: 'APPROVED' | 'FUNDS_INSUFFICIENT'[]; memo: string; result: 'APPROVED' | 'DECLINED'; subtype: string; type: string; }[]; family: 'TRANSFER'; from_financial_account_token: string; pending_amount: number; result: 'APPROVED' | 'DECLINED'; settled_amount: number; status: 'PENDING' | 'SETTLED' | 'DECLINED' | 'REVERSED' | 'CANCELED' | 'RETURNED'; to_financial_account_token: string; updated: string; external_id?: string; external_resource?: { external_resource_token: string; external_resource_type: external_resource_type; external_resource_sub_token?: string; }; transaction_series?: { related_transaction_event_token: string; related_transaction_token: string; type: string; }; }`\n  Book transfer transaction\n\n  - `token: string`\n  - `category: string`\n  - `created: string`\n  - `currency: string`\n  - `events: { token: string; amount: number; created: string; detailed_results: 'APPROVED' | 'FUNDS_INSUFFICIENT'[]; memo: string; result: 'APPROVED' | 'DECLINED'; subtype: string; type: string; }[]`\n  - `family: 'TRANSFER'`\n  - `from_financial_account_token: string`\n  - `pending_amount: number`\n  - `result: 'APPROVED' | 'DECLINED'`\n  - `settled_amount: number`\n  - `status: 'PENDING' | 'SETTLED' | 'DECLINED' | 'REVERSED' | 'CANCELED' | 'RETURNED'`\n  - `to_financial_account_token: string`\n  - `updated: string`\n  - `external_id?: string`\n  - `external_resource?: { external_resource_token: string; external_resource_type: 'STATEMENT' | 'COLLECTION' | 'DISPUTE' | 'UNKNOWN'; external_resource_sub_token?: string; }`\n  - `transaction_series?: { related_transaction_event_token: string; related_transaction_token: string; type: string; }`\n\n### Example\n\n```typescript\nimport Lithic from 'lithic';\n\nconst client = new Lithic();\n\nconst bookTransferResponse = await client.bookTransfers.retrieve('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e');\n\nconsole.log(bookTransferResponse);\n```",
  },
  {
    name: 'list',
    endpoint: '/v1/book_transfers',
    httpMethod: 'get',
    summary: 'List book transfers',
    description: 'List book transfers',
    stainlessPath: '(resource) book_transfers > (method) list',
    qualified: 'client.bookTransfers.list',
    params: [
      'account_token?: string;',
      'begin?: string;',
      'business_account_token?: string;',
      'category?: string;',
      'end?: string;',
      'ending_before?: string;',
      'financial_account_token?: string;',
      'page_size?: number;',
      "result?: 'APPROVED' | 'DECLINED';",
      'starting_after?: string;',
      "status?: 'DECLINED' | 'SETTLED';",
    ],
    response:
      "{ token: string; category: string; created: string; currency: string; events: { token: string; amount: number; created: string; detailed_results: 'APPROVED' | 'FUNDS_INSUFFICIENT'[]; memo: string; result: 'APPROVED' | 'DECLINED'; subtype: string; type: string; }[]; family: 'TRANSFER'; from_financial_account_token: string; pending_amount: number; result: 'APPROVED' | 'DECLINED'; settled_amount: number; status: 'PENDING' | 'SETTLED' | 'DECLINED' | 'REVERSED' | 'CANCELED' | 'RETURNED'; to_financial_account_token: string; updated: string; external_id?: string; external_resource?: { external_resource_token: string; external_resource_type: external_resource_type; external_resource_sub_token?: string; }; transaction_series?: { related_transaction_event_token: string; related_transaction_token: string; type: string; }; }",
    markdown:
      "## list\n\n`client.bookTransfers.list(account_token?: string, begin?: string, business_account_token?: string, category?: string, end?: string, ending_before?: string, financial_account_token?: string, page_size?: number, result?: 'APPROVED' | 'DECLINED', starting_after?: string, status?: 'DECLINED' | 'SETTLED'): { token: string; category: string; created: string; currency: string; events: object[]; family: 'TRANSFER'; from_financial_account_token: string; pending_amount: number; result: 'APPROVED' | 'DECLINED'; settled_amount: number; status: 'PENDING' | 'SETTLED' | 'DECLINED' | 'REVERSED' | 'CANCELED' | 'RETURNED'; to_financial_account_token: string; updated: string; external_id?: string; external_resource?: external_resource; transaction_series?: object; }`\n\n**get** `/v1/book_transfers`\n\nList book transfers\n\n### Parameters\n\n- `account_token?: string`\n\n- `begin?: string`\n  Date string in RFC 3339 format. Only entries created after the specified time will be included. UTC time zone.\n\n- `business_account_token?: string`\n\n- `category?: string`\n  Book Transfer category to be returned.\n\n- `end?: string`\n  Date string in RFC 3339 format. Only entries created before the specified time will be included. UTC time zone.\n\n- `ending_before?: string`\n  A cursor representing an item's token before which a page of results should end. Used to retrieve the previous page of results before this item.\n\n- `financial_account_token?: string`\n  Globally unique identifier for the financial account or card that will send the funds. Accepted type dependent on the program's use case.\n\n- `page_size?: number`\n  Page size (for pagination).\n\n- `result?: 'APPROVED' | 'DECLINED'`\n  Book transfer result to be returned.\n\n- `starting_after?: string`\n  A cursor representing an item's token after which a page of results should begin. Used to retrieve the next page of results after this item.\n\n- `status?: 'DECLINED' | 'SETTLED'`\n  Book transfer status to be returned.\n\n### Returns\n\n- `{ token: string; category: string; created: string; currency: string; events: { token: string; amount: number; created: string; detailed_results: 'APPROVED' | 'FUNDS_INSUFFICIENT'[]; memo: string; result: 'APPROVED' | 'DECLINED'; subtype: string; type: string; }[]; family: 'TRANSFER'; from_financial_account_token: string; pending_amount: number; result: 'APPROVED' | 'DECLINED'; settled_amount: number; status: 'PENDING' | 'SETTLED' | 'DECLINED' | 'REVERSED' | 'CANCELED' | 'RETURNED'; to_financial_account_token: string; updated: string; external_id?: string; external_resource?: { external_resource_token: string; external_resource_type: external_resource_type; external_resource_sub_token?: string; }; transaction_series?: { related_transaction_event_token: string; related_transaction_token: string; type: string; }; }`\n  Book transfer transaction\n\n  - `token: string`\n  - `category: string`\n  - `created: string`\n  - `currency: string`\n  - `events: { token: string; amount: number; created: string; detailed_results: 'APPROVED' | 'FUNDS_INSUFFICIENT'[]; memo: string; result: 'APPROVED' | 'DECLINED'; subtype: string; type: string; }[]`\n  - `family: 'TRANSFER'`\n  - `from_financial_account_token: string`\n  - `pending_amount: number`\n  - `result: 'APPROVED' | 'DECLINED'`\n  - `settled_amount: number`\n  - `status: 'PENDING' | 'SETTLED' | 'DECLINED' | 'REVERSED' | 'CANCELED' | 'RETURNED'`\n  - `to_financial_account_token: string`\n  - `updated: string`\n  - `external_id?: string`\n  - `external_resource?: { external_resource_token: string; external_resource_type: 'STATEMENT' | 'COLLECTION' | 'DISPUTE' | 'UNKNOWN'; external_resource_sub_token?: string; }`\n  - `transaction_series?: { related_transaction_event_token: string; related_transaction_token: string; type: string; }`\n\n### Example\n\n```typescript\nimport Lithic from 'lithic';\n\nconst client = new Lithic();\n\n// Automatically fetches more pages as needed.\nfor await (const bookTransferResponse of client.bookTransfers.list()) {\n  console.log(bookTransferResponse);\n}\n```",
  },
  {
    name: 'retry',
    endpoint: '/v1/book_transfers/{book_transfer_token}/retry',
    httpMethod: 'post',
    summary: 'Retry book transfer',
    description: 'Retry a book transfer that has been declined',
    stainlessPath: '(resource) book_transfers > (method) retry',
    qualified: 'client.bookTransfers.retry',
    params: ['book_transfer_token: string;', 'retry_token: string;'],
    response:
      "{ token: string; category: string; created: string; currency: string; events: { token: string; amount: number; created: string; detailed_results: 'APPROVED' | 'FUNDS_INSUFFICIENT'[]; memo: string; result: 'APPROVED' | 'DECLINED'; subtype: string; type: string; }[]; family: 'TRANSFER'; from_financial_account_token: string; pending_amount: number; result: 'APPROVED' | 'DECLINED'; settled_amount: number; status: 'PENDING' | 'SETTLED' | 'DECLINED' | 'REVERSED' | 'CANCELED' | 'RETURNED'; to_financial_account_token: string; updated: string; external_id?: string; external_resource?: { external_resource_token: string; external_resource_type: external_resource_type; external_resource_sub_token?: string; }; transaction_series?: { related_transaction_event_token: string; related_transaction_token: string; type: string; }; }",
    markdown:
      "## retry\n\n`client.bookTransfers.retry(book_transfer_token: string, retry_token: string): { token: string; category: string; created: string; currency: string; events: object[]; family: 'TRANSFER'; from_financial_account_token: string; pending_amount: number; result: 'APPROVED' | 'DECLINED'; settled_amount: number; status: 'PENDING' | 'SETTLED' | 'DECLINED' | 'REVERSED' | 'CANCELED' | 'RETURNED'; to_financial_account_token: string; updated: string; external_id?: string; external_resource?: external_resource; transaction_series?: object; }`\n\n**post** `/v1/book_transfers/{book_transfer_token}/retry`\n\nRetry a book transfer that has been declined\n\n### Parameters\n\n- `book_transfer_token: string`\n\n- `retry_token: string`\n  Customer-provided token that will serve as an idempotency token. This token will become the transaction token.\n\n### Returns\n\n- `{ token: string; category: string; created: string; currency: string; events: { token: string; amount: number; created: string; detailed_results: 'APPROVED' | 'FUNDS_INSUFFICIENT'[]; memo: string; result: 'APPROVED' | 'DECLINED'; subtype: string; type: string; }[]; family: 'TRANSFER'; from_financial_account_token: string; pending_amount: number; result: 'APPROVED' | 'DECLINED'; settled_amount: number; status: 'PENDING' | 'SETTLED' | 'DECLINED' | 'REVERSED' | 'CANCELED' | 'RETURNED'; to_financial_account_token: string; updated: string; external_id?: string; external_resource?: { external_resource_token: string; external_resource_type: external_resource_type; external_resource_sub_token?: string; }; transaction_series?: { related_transaction_event_token: string; related_transaction_token: string; type: string; }; }`\n  Book transfer transaction\n\n  - `token: string`\n  - `category: string`\n  - `created: string`\n  - `currency: string`\n  - `events: { token: string; amount: number; created: string; detailed_results: 'APPROVED' | 'FUNDS_INSUFFICIENT'[]; memo: string; result: 'APPROVED' | 'DECLINED'; subtype: string; type: string; }[]`\n  - `family: 'TRANSFER'`\n  - `from_financial_account_token: string`\n  - `pending_amount: number`\n  - `result: 'APPROVED' | 'DECLINED'`\n  - `settled_amount: number`\n  - `status: 'PENDING' | 'SETTLED' | 'DECLINED' | 'REVERSED' | 'CANCELED' | 'RETURNED'`\n  - `to_financial_account_token: string`\n  - `updated: string`\n  - `external_id?: string`\n  - `external_resource?: { external_resource_token: string; external_resource_type: 'STATEMENT' | 'COLLECTION' | 'DISPUTE' | 'UNKNOWN'; external_resource_sub_token?: string; }`\n  - `transaction_series?: { related_transaction_event_token: string; related_transaction_token: string; type: string; }`\n\n### Example\n\n```typescript\nimport Lithic from 'lithic';\n\nconst client = new Lithic();\n\nconst bookTransferResponse = await client.bookTransfers.retry('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', { retry_token: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e' });\n\nconsole.log(bookTransferResponse);\n```",
  },
  {
    name: 'reverse',
    endpoint: '/v1/book_transfers/{book_transfer_token}/reverse',
    httpMethod: 'post',
    summary: 'Reverse book transfer',
    description: 'Reverse a book transfer',
    stainlessPath: '(resource) book_transfers > (method) reverse',
    qualified: 'client.bookTransfers.reverse',
    params: ['book_transfer_token: string;', 'memo?: string;'],
    response:
      "{ token: string; category: string; created: string; currency: string; events: { token: string; amount: number; created: string; detailed_results: 'APPROVED' | 'FUNDS_INSUFFICIENT'[]; memo: string; result: 'APPROVED' | 'DECLINED'; subtype: string; type: string; }[]; family: 'TRANSFER'; from_financial_account_token: string; pending_amount: number; result: 'APPROVED' | 'DECLINED'; settled_amount: number; status: 'PENDING' | 'SETTLED' | 'DECLINED' | 'REVERSED' | 'CANCELED' | 'RETURNED'; to_financial_account_token: string; updated: string; external_id?: string; external_resource?: { external_resource_token: string; external_resource_type: external_resource_type; external_resource_sub_token?: string; }; transaction_series?: { related_transaction_event_token: string; related_transaction_token: string; type: string; }; }",
    markdown:
      "## reverse\n\n`client.bookTransfers.reverse(book_transfer_token: string, memo?: string): { token: string; category: string; created: string; currency: string; events: object[]; family: 'TRANSFER'; from_financial_account_token: string; pending_amount: number; result: 'APPROVED' | 'DECLINED'; settled_amount: number; status: 'PENDING' | 'SETTLED' | 'DECLINED' | 'REVERSED' | 'CANCELED' | 'RETURNED'; to_financial_account_token: string; updated: string; external_id?: string; external_resource?: external_resource; transaction_series?: object; }`\n\n**post** `/v1/book_transfers/{book_transfer_token}/reverse`\n\nReverse a book transfer\n\n### Parameters\n\n- `book_transfer_token: string`\n\n- `memo?: string`\n  Optional descriptor for the reversal.\n\n### Returns\n\n- `{ token: string; category: string; created: string; currency: string; events: { token: string; amount: number; created: string; detailed_results: 'APPROVED' | 'FUNDS_INSUFFICIENT'[]; memo: string; result: 'APPROVED' | 'DECLINED'; subtype: string; type: string; }[]; family: 'TRANSFER'; from_financial_account_token: string; pending_amount: number; result: 'APPROVED' | 'DECLINED'; settled_amount: number; status: 'PENDING' | 'SETTLED' | 'DECLINED' | 'REVERSED' | 'CANCELED' | 'RETURNED'; to_financial_account_token: string; updated: string; external_id?: string; external_resource?: { external_resource_token: string; external_resource_type: external_resource_type; external_resource_sub_token?: string; }; transaction_series?: { related_transaction_event_token: string; related_transaction_token: string; type: string; }; }`\n  Book transfer transaction\n\n  - `token: string`\n  - `category: string`\n  - `created: string`\n  - `currency: string`\n  - `events: { token: string; amount: number; created: string; detailed_results: 'APPROVED' | 'FUNDS_INSUFFICIENT'[]; memo: string; result: 'APPROVED' | 'DECLINED'; subtype: string; type: string; }[]`\n  - `family: 'TRANSFER'`\n  - `from_financial_account_token: string`\n  - `pending_amount: number`\n  - `result: 'APPROVED' | 'DECLINED'`\n  - `settled_amount: number`\n  - `status: 'PENDING' | 'SETTLED' | 'DECLINED' | 'REVERSED' | 'CANCELED' | 'RETURNED'`\n  - `to_financial_account_token: string`\n  - `updated: string`\n  - `external_id?: string`\n  - `external_resource?: { external_resource_token: string; external_resource_type: 'STATEMENT' | 'COLLECTION' | 'DISPUTE' | 'UNKNOWN'; external_resource_sub_token?: string; }`\n  - `transaction_series?: { related_transaction_event_token: string; related_transaction_token: string; type: string; }`\n\n### Example\n\n```typescript\nimport Lithic from 'lithic';\n\nconst client = new Lithic();\n\nconst bookTransferResponse = await client.bookTransfers.reverse('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e');\n\nconsole.log(bookTransferResponse);\n```",
  },
  {
    name: 'retrieve',
    endpoint: '/v1/credit_products/{credit_product_token}/extended_credit',
    httpMethod: 'get',
    summary: 'Get extended credit',
    description: 'Get the extended credit for a given credit product under a program',
    stainlessPath: '(resource) credit_products.extended_credit > (method) retrieve',
    qualified: 'client.creditProducts.extendedCredit.retrieve',
    params: ['credit_product_token: string;'],
    response: '{ credit_extended: number; }',
    markdown:
      "## retrieve\n\n`client.creditProducts.extendedCredit.retrieve(credit_product_token: string): { credit_extended: number; }`\n\n**get** `/v1/credit_products/{credit_product_token}/extended_credit`\n\nGet the extended credit for a given credit product under a program\n\n### Parameters\n\n- `credit_product_token: string`\n\n### Returns\n\n- `{ credit_extended: number; }`\n\n  - `credit_extended: number`\n\n### Example\n\n```typescript\nimport Lithic from 'lithic';\n\nconst client = new Lithic();\n\nconst extendedCredit = await client.creditProducts.extendedCredit.retrieve('credit_product_token');\n\nconsole.log(extendedCredit);\n```",
  },
  {
    name: 'create',
    endpoint: '/v1/credit_products/{credit_product_token}/prime_rates',
    httpMethod: 'post',
    summary: 'Post Credit Product Prime Rate',
    description: 'Post Credit Product Prime Rate',
    stainlessPath: '(resource) credit_products.prime_rates > (method) create',
    qualified: 'client.creditProducts.primeRates.create',
    params: ['credit_product_token: string;', 'effective_date: string;', 'rate: string;'],
    markdown:
      "## create\n\n`client.creditProducts.primeRates.create(credit_product_token: string, effective_date: string, rate: string): void`\n\n**post** `/v1/credit_products/{credit_product_token}/prime_rates`\n\nPost Credit Product Prime Rate\n\n### Parameters\n\n- `credit_product_token: string`\n  Globally unique identifier for credit products.\n\n- `effective_date: string`\n  Date the rate goes into effect\n\n- `rate: string`\n  The rate in decimal format\n\n### Example\n\n```typescript\nimport Lithic from 'lithic';\n\nconst client = new Lithic();\n\nawait client.creditProducts.primeRates.create('credit_product_token', { effective_date: '2019-12-27', rate: 'rate' })\n```",
  },
  {
    name: 'retrieve',
    endpoint: '/v1/credit_products/{credit_product_token}/prime_rates',
    httpMethod: 'get',
    summary: 'Get Credit Product Prime Rates',
    description: 'Get Credit Product Prime Rates',
    stainlessPath: '(resource) credit_products.prime_rates > (method) retrieve',
    qualified: 'client.creditProducts.primeRates.retrieve',
    params: ['credit_product_token: string;', 'ending_before?: string;', 'starting_after?: string;'],
    response: '{ data: { effective_date: string; rate: string; }[]; has_more: boolean; }',
    markdown:
      "## retrieve\n\n`client.creditProducts.primeRates.retrieve(credit_product_token: string, ending_before?: string, starting_after?: string): { data: object[]; has_more: boolean; }`\n\n**get** `/v1/credit_products/{credit_product_token}/prime_rates`\n\nGet Credit Product Prime Rates\n\n### Parameters\n\n- `credit_product_token: string`\n  Globally unique identifier for credit products.\n\n- `ending_before?: string`\n  The effective date that the prime rates ends before\n\n- `starting_after?: string`\n  The effective date that the prime rate starts after\n\n### Returns\n\n- `{ data: { effective_date: string; rate: string; }[]; has_more: boolean; }`\n\n  - `data: { effective_date: string; rate: string; }[]`\n  - `has_more: boolean`\n\n### Example\n\n```typescript\nimport Lithic from 'lithic';\n\nconst client = new Lithic();\n\nconst primeRate = await client.creditProducts.primeRates.retrieve('credit_product_token');\n\nconsole.log(primeRate);\n```",
  },
  {
    name: 'create',
    endpoint: '/v1/external_payments',
    httpMethod: 'post',
    summary: 'Create external payment',
    description: 'Create external payment',
    stainlessPath: '(resource) external_payments > (method) create',
    qualified: 'client.externalPayments.create',
    params: [
      'amount: number;',
      'category: string;',
      'effective_date: string;',
      'financial_account_token: string;',
      "payment_type: 'DEPOSIT' | 'WITHDRAWAL';",
      'token?: string;',
      'memo?: string;',
      "progress_to?: 'SETTLED' | 'RELEASED';",
      'user_defined_id?: string;',
    ],
    response:
      "{ token: string; created: string; status: 'PENDING' | 'SETTLED' | 'DECLINED' | 'REVERSED' | 'CANCELED' | 'RETURNED'; updated: string; category?: string; currency?: string; events?: { token: string; amount: number; created: string; detailed_results: 'APPROVED' | 'INSUFFICIENT_FUNDS'[]; effective_date: string; memo: string; result: 'APPROVED' | 'DECLINED'; type: string; }[]; family?: 'EXTERNAL_PAYMENT'; financial_account_token?: string; payment_type?: 'DEPOSIT' | 'WITHDRAWAL'; pending_amount?: number; result?: 'APPROVED' | 'DECLINED'; settled_amount?: number; user_defined_id?: string; }",
    markdown:
      "## create\n\n`client.externalPayments.create(amount: number, category: string, effective_date: string, financial_account_token: string, payment_type: 'DEPOSIT' | 'WITHDRAWAL', token?: string, memo?: string, progress_to?: 'SETTLED' | 'RELEASED', user_defined_id?: string): { token: string; created: string; status: 'PENDING' | 'SETTLED' | 'DECLINED' | 'REVERSED' | 'CANCELED' | 'RETURNED'; updated: string; category?: string; currency?: string; events?: object[]; family?: 'EXTERNAL_PAYMENT'; financial_account_token?: string; payment_type?: 'DEPOSIT' | 'WITHDRAWAL'; pending_amount?: number; result?: 'APPROVED' | 'DECLINED'; settled_amount?: number; user_defined_id?: string; }`\n\n**post** `/v1/external_payments`\n\nCreate external payment\n\n### Parameters\n\n- `amount: number`\n\n- `category: string`\n\n- `effective_date: string`\n\n- `financial_account_token: string`\n\n- `payment_type: 'DEPOSIT' | 'WITHDRAWAL'`\n\n- `token?: string`\n  Customer-provided token that will serve as an idempotency token. This token will become the transaction token.\n\n- `memo?: string`\n\n- `progress_to?: 'SETTLED' | 'RELEASED'`\n\n- `user_defined_id?: string`\n\n### Returns\n\n- `{ token: string; created: string; status: 'PENDING' | 'SETTLED' | 'DECLINED' | 'REVERSED' | 'CANCELED' | 'RETURNED'; updated: string; category?: string; currency?: string; events?: { token: string; amount: number; created: string; detailed_results: 'APPROVED' | 'INSUFFICIENT_FUNDS'[]; effective_date: string; memo: string; result: 'APPROVED' | 'DECLINED'; type: string; }[]; family?: 'EXTERNAL_PAYMENT'; financial_account_token?: string; payment_type?: 'DEPOSIT' | 'WITHDRAWAL'; pending_amount?: number; result?: 'APPROVED' | 'DECLINED'; settled_amount?: number; user_defined_id?: string; }`\n\n  - `token: string`\n  - `created: string`\n  - `status: 'PENDING' | 'SETTLED' | 'DECLINED' | 'REVERSED' | 'CANCELED' | 'RETURNED'`\n  - `updated: string`\n  - `category?: string`\n  - `currency?: string`\n  - `events?: { token: string; amount: number; created: string; detailed_results: 'APPROVED' | 'INSUFFICIENT_FUNDS'[]; effective_date: string; memo: string; result: 'APPROVED' | 'DECLINED'; type: string; }[]`\n  - `family?: 'EXTERNAL_PAYMENT'`\n  - `financial_account_token?: string`\n  - `payment_type?: 'DEPOSIT' | 'WITHDRAWAL'`\n  - `pending_amount?: number`\n  - `result?: 'APPROVED' | 'DECLINED'`\n  - `settled_amount?: number`\n  - `user_defined_id?: string`\n\n### Example\n\n```typescript\nimport Lithic from 'lithic';\n\nconst client = new Lithic();\n\nconst externalPayment = await client.externalPayments.create({\n  amount: 0,\n  category: 'EXTERNAL_WIRE',\n  effective_date: '2019-12-27',\n  financial_account_token: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',\n  payment_type: 'DEPOSIT',\n});\n\nconsole.log(externalPayment);\n```",
  },
  {
    name: 'retrieve',
    endpoint: '/v1/external_payments/{external_payment_token}',
    httpMethod: 'get',
    summary: 'Get external payment',
    description: 'Get external payment',
    stainlessPath: '(resource) external_payments > (method) retrieve',
    qualified: 'client.externalPayments.retrieve',
    params: ['external_payment_token: string;'],
    response:
      "{ token: string; created: string; status: 'PENDING' | 'SETTLED' | 'DECLINED' | 'REVERSED' | 'CANCELED' | 'RETURNED'; updated: string; category?: string; currency?: string; events?: { token: string; amount: number; created: string; detailed_results: 'APPROVED' | 'INSUFFICIENT_FUNDS'[]; effective_date: string; memo: string; result: 'APPROVED' | 'DECLINED'; type: string; }[]; family?: 'EXTERNAL_PAYMENT'; financial_account_token?: string; payment_type?: 'DEPOSIT' | 'WITHDRAWAL'; pending_amount?: number; result?: 'APPROVED' | 'DECLINED'; settled_amount?: number; user_defined_id?: string; }",
    markdown:
      "## retrieve\n\n`client.externalPayments.retrieve(external_payment_token: string): { token: string; created: string; status: 'PENDING' | 'SETTLED' | 'DECLINED' | 'REVERSED' | 'CANCELED' | 'RETURNED'; updated: string; category?: string; currency?: string; events?: object[]; family?: 'EXTERNAL_PAYMENT'; financial_account_token?: string; payment_type?: 'DEPOSIT' | 'WITHDRAWAL'; pending_amount?: number; result?: 'APPROVED' | 'DECLINED'; settled_amount?: number; user_defined_id?: string; }`\n\n**get** `/v1/external_payments/{external_payment_token}`\n\nGet external payment\n\n### Parameters\n\n- `external_payment_token: string`\n\n### Returns\n\n- `{ token: string; created: string; status: 'PENDING' | 'SETTLED' | 'DECLINED' | 'REVERSED' | 'CANCELED' | 'RETURNED'; updated: string; category?: string; currency?: string; events?: { token: string; amount: number; created: string; detailed_results: 'APPROVED' | 'INSUFFICIENT_FUNDS'[]; effective_date: string; memo: string; result: 'APPROVED' | 'DECLINED'; type: string; }[]; family?: 'EXTERNAL_PAYMENT'; financial_account_token?: string; payment_type?: 'DEPOSIT' | 'WITHDRAWAL'; pending_amount?: number; result?: 'APPROVED' | 'DECLINED'; settled_amount?: number; user_defined_id?: string; }`\n\n  - `token: string`\n  - `created: string`\n  - `status: 'PENDING' | 'SETTLED' | 'DECLINED' | 'REVERSED' | 'CANCELED' | 'RETURNED'`\n  - `updated: string`\n  - `category?: string`\n  - `currency?: string`\n  - `events?: { token: string; amount: number; created: string; detailed_results: 'APPROVED' | 'INSUFFICIENT_FUNDS'[]; effective_date: string; memo: string; result: 'APPROVED' | 'DECLINED'; type: string; }[]`\n  - `family?: 'EXTERNAL_PAYMENT'`\n  - `financial_account_token?: string`\n  - `payment_type?: 'DEPOSIT' | 'WITHDRAWAL'`\n  - `pending_amount?: number`\n  - `result?: 'APPROVED' | 'DECLINED'`\n  - `settled_amount?: number`\n  - `user_defined_id?: string`\n\n### Example\n\n```typescript\nimport Lithic from 'lithic';\n\nconst client = new Lithic();\n\nconst externalPayment = await client.externalPayments.retrieve('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e');\n\nconsole.log(externalPayment);\n```",
  },
  {
    name: 'list',
    endpoint: '/v1/external_payments',
    httpMethod: 'get',
    summary: 'List external payments',
    description: 'List external payments',
    stainlessPath: '(resource) external_payments > (method) list',
    qualified: 'client.externalPayments.list',
    params: [
      'begin?: string;',
      'business_account_token?: string;',
      'category?: string;',
      'end?: string;',
      'ending_before?: string;',
      'financial_account_token?: string;',
      'page_size?: number;',
      "result?: 'APPROVED' | 'DECLINED';",
      'starting_after?: string;',
      "status?: 'PENDING' | 'SETTLED' | 'DECLINED' | 'REVERSED' | 'CANCELED' | 'RETURNED';",
    ],
    response:
      "{ token: string; created: string; status: 'PENDING' | 'SETTLED' | 'DECLINED' | 'REVERSED' | 'CANCELED' | 'RETURNED'; updated: string; category?: string; currency?: string; events?: { token: string; amount: number; created: string; detailed_results: 'APPROVED' | 'INSUFFICIENT_FUNDS'[]; effective_date: string; memo: string; result: 'APPROVED' | 'DECLINED'; type: string; }[]; family?: 'EXTERNAL_PAYMENT'; financial_account_token?: string; payment_type?: 'DEPOSIT' | 'WITHDRAWAL'; pending_amount?: number; result?: 'APPROVED' | 'DECLINED'; settled_amount?: number; user_defined_id?: string; }",
    markdown:
      "## list\n\n`client.externalPayments.list(begin?: string, business_account_token?: string, category?: string, end?: string, ending_before?: string, financial_account_token?: string, page_size?: number, result?: 'APPROVED' | 'DECLINED', starting_after?: string, status?: 'PENDING' | 'SETTLED' | 'DECLINED' | 'REVERSED' | 'CANCELED' | 'RETURNED'): { token: string; created: string; status: 'PENDING' | 'SETTLED' | 'DECLINED' | 'REVERSED' | 'CANCELED' | 'RETURNED'; updated: string; category?: string; currency?: string; events?: object[]; family?: 'EXTERNAL_PAYMENT'; financial_account_token?: string; payment_type?: 'DEPOSIT' | 'WITHDRAWAL'; pending_amount?: number; result?: 'APPROVED' | 'DECLINED'; settled_amount?: number; user_defined_id?: string; }`\n\n**get** `/v1/external_payments`\n\nList external payments\n\n### Parameters\n\n- `begin?: string`\n  Date string in RFC 3339 format. Only entries created after the specified time will be included. UTC time zone.\n\n- `business_account_token?: string`\n\n- `category?: string`\n  External Payment category to be returned.\n\n- `end?: string`\n  Date string in RFC 3339 format. Only entries created before the specified time will be included. UTC time zone.\n\n- `ending_before?: string`\n  A cursor representing an item's token before which a page of results should end. Used to retrieve the previous page of results before this item.\n\n- `financial_account_token?: string`\n  Globally unique identifier for the financial account or card that will send the funds. Accepted type dependent on the program's use case.\n\n- `page_size?: number`\n  Page size (for pagination).\n\n- `result?: 'APPROVED' | 'DECLINED'`\n  External Payment result to be returned.\n\n- `starting_after?: string`\n  A cursor representing an item's token after which a page of results should begin. Used to retrieve the next page of results after this item.\n\n- `status?: 'PENDING' | 'SETTLED' | 'DECLINED' | 'REVERSED' | 'CANCELED' | 'RETURNED'`\n  Book transfer status to be returned.\n\n### Returns\n\n- `{ token: string; created: string; status: 'PENDING' | 'SETTLED' | 'DECLINED' | 'REVERSED' | 'CANCELED' | 'RETURNED'; updated: string; category?: string; currency?: string; events?: { token: string; amount: number; created: string; detailed_results: 'APPROVED' | 'INSUFFICIENT_FUNDS'[]; effective_date: string; memo: string; result: 'APPROVED' | 'DECLINED'; type: string; }[]; family?: 'EXTERNAL_PAYMENT'; financial_account_token?: string; payment_type?: 'DEPOSIT' | 'WITHDRAWAL'; pending_amount?: number; result?: 'APPROVED' | 'DECLINED'; settled_amount?: number; user_defined_id?: string; }`\n\n  - `token: string`\n  - `created: string`\n  - `status: 'PENDING' | 'SETTLED' | 'DECLINED' | 'REVERSED' | 'CANCELED' | 'RETURNED'`\n  - `updated: string`\n  - `category?: string`\n  - `currency?: string`\n  - `events?: { token: string; amount: number; created: string; detailed_results: 'APPROVED' | 'INSUFFICIENT_FUNDS'[]; effective_date: string; memo: string; result: 'APPROVED' | 'DECLINED'; type: string; }[]`\n  - `family?: 'EXTERNAL_PAYMENT'`\n  - `financial_account_token?: string`\n  - `payment_type?: 'DEPOSIT' | 'WITHDRAWAL'`\n  - `pending_amount?: number`\n  - `result?: 'APPROVED' | 'DECLINED'`\n  - `settled_amount?: number`\n  - `user_defined_id?: string`\n\n### Example\n\n```typescript\nimport Lithic from 'lithic';\n\nconst client = new Lithic();\n\n// Automatically fetches more pages as needed.\nfor await (const externalPayment of client.externalPayments.list()) {\n  console.log(externalPayment);\n}\n```",
  },
  {
    name: 'cancel',
    endpoint: '/v1/external_payments/{external_payment_token}/cancel',
    httpMethod: 'post',
    summary: 'Cancel external payment',
    description: 'Cancel external payment',
    stainlessPath: '(resource) external_payments > (method) cancel',
    qualified: 'client.externalPayments.cancel',
    params: ['external_payment_token: string;', 'effective_date: string;', 'memo?: string;'],
    response:
      "{ token: string; created: string; status: 'PENDING' | 'SETTLED' | 'DECLINED' | 'REVERSED' | 'CANCELED' | 'RETURNED'; updated: string; category?: string; currency?: string; events?: { token: string; amount: number; created: string; detailed_results: 'APPROVED' | 'INSUFFICIENT_FUNDS'[]; effective_date: string; memo: string; result: 'APPROVED' | 'DECLINED'; type: string; }[]; family?: 'EXTERNAL_PAYMENT'; financial_account_token?: string; payment_type?: 'DEPOSIT' | 'WITHDRAWAL'; pending_amount?: number; result?: 'APPROVED' | 'DECLINED'; settled_amount?: number; user_defined_id?: string; }",
    markdown:
      "## cancel\n\n`client.externalPayments.cancel(external_payment_token: string, effective_date: string, memo?: string): { token: string; created: string; status: 'PENDING' | 'SETTLED' | 'DECLINED' | 'REVERSED' | 'CANCELED' | 'RETURNED'; updated: string; category?: string; currency?: string; events?: object[]; family?: 'EXTERNAL_PAYMENT'; financial_account_token?: string; payment_type?: 'DEPOSIT' | 'WITHDRAWAL'; pending_amount?: number; result?: 'APPROVED' | 'DECLINED'; settled_amount?: number; user_defined_id?: string; }`\n\n**post** `/v1/external_payments/{external_payment_token}/cancel`\n\nCancel external payment\n\n### Parameters\n\n- `external_payment_token: string`\n\n- `effective_date: string`\n\n- `memo?: string`\n\n### Returns\n\n- `{ token: string; created: string; status: 'PENDING' | 'SETTLED' | 'DECLINED' | 'REVERSED' | 'CANCELED' | 'RETURNED'; updated: string; category?: string; currency?: string; events?: { token: string; amount: number; created: string; detailed_results: 'APPROVED' | 'INSUFFICIENT_FUNDS'[]; effective_date: string; memo: string; result: 'APPROVED' | 'DECLINED'; type: string; }[]; family?: 'EXTERNAL_PAYMENT'; financial_account_token?: string; payment_type?: 'DEPOSIT' | 'WITHDRAWAL'; pending_amount?: number; result?: 'APPROVED' | 'DECLINED'; settled_amount?: number; user_defined_id?: string; }`\n\n  - `token: string`\n  - `created: string`\n  - `status: 'PENDING' | 'SETTLED' | 'DECLINED' | 'REVERSED' | 'CANCELED' | 'RETURNED'`\n  - `updated: string`\n  - `category?: string`\n  - `currency?: string`\n  - `events?: { token: string; amount: number; created: string; detailed_results: 'APPROVED' | 'INSUFFICIENT_FUNDS'[]; effective_date: string; memo: string; result: 'APPROVED' | 'DECLINED'; type: string; }[]`\n  - `family?: 'EXTERNAL_PAYMENT'`\n  - `financial_account_token?: string`\n  - `payment_type?: 'DEPOSIT' | 'WITHDRAWAL'`\n  - `pending_amount?: number`\n  - `result?: 'APPROVED' | 'DECLINED'`\n  - `settled_amount?: number`\n  - `user_defined_id?: string`\n\n### Example\n\n```typescript\nimport Lithic from 'lithic';\n\nconst client = new Lithic();\n\nconst externalPayment = await client.externalPayments.cancel('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', { effective_date: '2019-12-27' });\n\nconsole.log(externalPayment);\n```",
  },
  {
    name: 'release',
    endpoint: '/v1/external_payments/{external_payment_token}/release',
    httpMethod: 'post',
    summary: 'Release external payment',
    description: 'Release external payment',
    stainlessPath: '(resource) external_payments > (method) release',
    qualified: 'client.externalPayments.release',
    params: ['external_payment_token: string;', 'effective_date: string;', 'memo?: string;'],
    response:
      "{ token: string; created: string; status: 'PENDING' | 'SETTLED' | 'DECLINED' | 'REVERSED' | 'CANCELED' | 'RETURNED'; updated: string; category?: string; currency?: string; events?: { token: string; amount: number; created: string; detailed_results: 'APPROVED' | 'INSUFFICIENT_FUNDS'[]; effective_date: string; memo: string; result: 'APPROVED' | 'DECLINED'; type: string; }[]; family?: 'EXTERNAL_PAYMENT'; financial_account_token?: string; payment_type?: 'DEPOSIT' | 'WITHDRAWAL'; pending_amount?: number; result?: 'APPROVED' | 'DECLINED'; settled_amount?: number; user_defined_id?: string; }",
    markdown:
      "## release\n\n`client.externalPayments.release(external_payment_token: string, effective_date: string, memo?: string): { token: string; created: string; status: 'PENDING' | 'SETTLED' | 'DECLINED' | 'REVERSED' | 'CANCELED' | 'RETURNED'; updated: string; category?: string; currency?: string; events?: object[]; family?: 'EXTERNAL_PAYMENT'; financial_account_token?: string; payment_type?: 'DEPOSIT' | 'WITHDRAWAL'; pending_amount?: number; result?: 'APPROVED' | 'DECLINED'; settled_amount?: number; user_defined_id?: string; }`\n\n**post** `/v1/external_payments/{external_payment_token}/release`\n\nRelease external payment\n\n### Parameters\n\n- `external_payment_token: string`\n\n- `effective_date: string`\n\n- `memo?: string`\n\n### Returns\n\n- `{ token: string; created: string; status: 'PENDING' | 'SETTLED' | 'DECLINED' | 'REVERSED' | 'CANCELED' | 'RETURNED'; updated: string; category?: string; currency?: string; events?: { token: string; amount: number; created: string; detailed_results: 'APPROVED' | 'INSUFFICIENT_FUNDS'[]; effective_date: string; memo: string; result: 'APPROVED' | 'DECLINED'; type: string; }[]; family?: 'EXTERNAL_PAYMENT'; financial_account_token?: string; payment_type?: 'DEPOSIT' | 'WITHDRAWAL'; pending_amount?: number; result?: 'APPROVED' | 'DECLINED'; settled_amount?: number; user_defined_id?: string; }`\n\n  - `token: string`\n  - `created: string`\n  - `status: 'PENDING' | 'SETTLED' | 'DECLINED' | 'REVERSED' | 'CANCELED' | 'RETURNED'`\n  - `updated: string`\n  - `category?: string`\n  - `currency?: string`\n  - `events?: { token: string; amount: number; created: string; detailed_results: 'APPROVED' | 'INSUFFICIENT_FUNDS'[]; effective_date: string; memo: string; result: 'APPROVED' | 'DECLINED'; type: string; }[]`\n  - `family?: 'EXTERNAL_PAYMENT'`\n  - `financial_account_token?: string`\n  - `payment_type?: 'DEPOSIT' | 'WITHDRAWAL'`\n  - `pending_amount?: number`\n  - `result?: 'APPROVED' | 'DECLINED'`\n  - `settled_amount?: number`\n  - `user_defined_id?: string`\n\n### Example\n\n```typescript\nimport Lithic from 'lithic';\n\nconst client = new Lithic();\n\nconst externalPayment = await client.externalPayments.release('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', { effective_date: '2019-12-27' });\n\nconsole.log(externalPayment);\n```",
  },
  {
    name: 'reverse',
    endpoint: '/v1/external_payments/{external_payment_token}/reverse',
    httpMethod: 'post',
    summary: 'Reverse external payment',
    description: 'Reverse external payment',
    stainlessPath: '(resource) external_payments > (method) reverse',
    qualified: 'client.externalPayments.reverse',
    params: ['external_payment_token: string;', 'effective_date: string;', 'memo?: string;'],
    response:
      "{ token: string; created: string; status: 'PENDING' | 'SETTLED' | 'DECLINED' | 'REVERSED' | 'CANCELED' | 'RETURNED'; updated: string; category?: string; currency?: string; events?: { token: string; amount: number; created: string; detailed_results: 'APPROVED' | 'INSUFFICIENT_FUNDS'[]; effective_date: string; memo: string; result: 'APPROVED' | 'DECLINED'; type: string; }[]; family?: 'EXTERNAL_PAYMENT'; financial_account_token?: string; payment_type?: 'DEPOSIT' | 'WITHDRAWAL'; pending_amount?: number; result?: 'APPROVED' | 'DECLINED'; settled_amount?: number; user_defined_id?: string; }",
    markdown:
      "## reverse\n\n`client.externalPayments.reverse(external_payment_token: string, effective_date: string, memo?: string): { token: string; created: string; status: 'PENDING' | 'SETTLED' | 'DECLINED' | 'REVERSED' | 'CANCELED' | 'RETURNED'; updated: string; category?: string; currency?: string; events?: object[]; family?: 'EXTERNAL_PAYMENT'; financial_account_token?: string; payment_type?: 'DEPOSIT' | 'WITHDRAWAL'; pending_amount?: number; result?: 'APPROVED' | 'DECLINED'; settled_amount?: number; user_defined_id?: string; }`\n\n**post** `/v1/external_payments/{external_payment_token}/reverse`\n\nReverse external payment\n\n### Parameters\n\n- `external_payment_token: string`\n\n- `effective_date: string`\n\n- `memo?: string`\n\n### Returns\n\n- `{ token: string; created: string; status: 'PENDING' | 'SETTLED' | 'DECLINED' | 'REVERSED' | 'CANCELED' | 'RETURNED'; updated: string; category?: string; currency?: string; events?: { token: string; amount: number; created: string; detailed_results: 'APPROVED' | 'INSUFFICIENT_FUNDS'[]; effective_date: string; memo: string; result: 'APPROVED' | 'DECLINED'; type: string; }[]; family?: 'EXTERNAL_PAYMENT'; financial_account_token?: string; payment_type?: 'DEPOSIT' | 'WITHDRAWAL'; pending_amount?: number; result?: 'APPROVED' | 'DECLINED'; settled_amount?: number; user_defined_id?: string; }`\n\n  - `token: string`\n  - `created: string`\n  - `status: 'PENDING' | 'SETTLED' | 'DECLINED' | 'REVERSED' | 'CANCELED' | 'RETURNED'`\n  - `updated: string`\n  - `category?: string`\n  - `currency?: string`\n  - `events?: { token: string; amount: number; created: string; detailed_results: 'APPROVED' | 'INSUFFICIENT_FUNDS'[]; effective_date: string; memo: string; result: 'APPROVED' | 'DECLINED'; type: string; }[]`\n  - `family?: 'EXTERNAL_PAYMENT'`\n  - `financial_account_token?: string`\n  - `payment_type?: 'DEPOSIT' | 'WITHDRAWAL'`\n  - `pending_amount?: number`\n  - `result?: 'APPROVED' | 'DECLINED'`\n  - `settled_amount?: number`\n  - `user_defined_id?: string`\n\n### Example\n\n```typescript\nimport Lithic from 'lithic';\n\nconst client = new Lithic();\n\nconst externalPayment = await client.externalPayments.reverse('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', { effective_date: '2019-12-27' });\n\nconsole.log(externalPayment);\n```",
  },
  {
    name: 'settle',
    endpoint: '/v1/external_payments/{external_payment_token}/settle',
    httpMethod: 'post',
    summary: 'Settle external payment',
    description: 'Settle external payment',
    stainlessPath: '(resource) external_payments > (method) settle',
    qualified: 'client.externalPayments.settle',
    params: [
      'external_payment_token: string;',
      'effective_date: string;',
      'memo?: string;',
      "progress_to?: 'SETTLED' | 'RELEASED';",
    ],
    response:
      "{ token: string; created: string; status: 'PENDING' | 'SETTLED' | 'DECLINED' | 'REVERSED' | 'CANCELED' | 'RETURNED'; updated: string; category?: string; currency?: string; events?: { token: string; amount: number; created: string; detailed_results: 'APPROVED' | 'INSUFFICIENT_FUNDS'[]; effective_date: string; memo: string; result: 'APPROVED' | 'DECLINED'; type: string; }[]; family?: 'EXTERNAL_PAYMENT'; financial_account_token?: string; payment_type?: 'DEPOSIT' | 'WITHDRAWAL'; pending_amount?: number; result?: 'APPROVED' | 'DECLINED'; settled_amount?: number; user_defined_id?: string; }",
    markdown:
      "## settle\n\n`client.externalPayments.settle(external_payment_token: string, effective_date: string, memo?: string, progress_to?: 'SETTLED' | 'RELEASED'): { token: string; created: string; status: 'PENDING' | 'SETTLED' | 'DECLINED' | 'REVERSED' | 'CANCELED' | 'RETURNED'; updated: string; category?: string; currency?: string; events?: object[]; family?: 'EXTERNAL_PAYMENT'; financial_account_token?: string; payment_type?: 'DEPOSIT' | 'WITHDRAWAL'; pending_amount?: number; result?: 'APPROVED' | 'DECLINED'; settled_amount?: number; user_defined_id?: string; }`\n\n**post** `/v1/external_payments/{external_payment_token}/settle`\n\nSettle external payment\n\n### Parameters\n\n- `external_payment_token: string`\n\n- `effective_date: string`\n\n- `memo?: string`\n\n- `progress_to?: 'SETTLED' | 'RELEASED'`\n\n### Returns\n\n- `{ token: string; created: string; status: 'PENDING' | 'SETTLED' | 'DECLINED' | 'REVERSED' | 'CANCELED' | 'RETURNED'; updated: string; category?: string; currency?: string; events?: { token: string; amount: number; created: string; detailed_results: 'APPROVED' | 'INSUFFICIENT_FUNDS'[]; effective_date: string; memo: string; result: 'APPROVED' | 'DECLINED'; type: string; }[]; family?: 'EXTERNAL_PAYMENT'; financial_account_token?: string; payment_type?: 'DEPOSIT' | 'WITHDRAWAL'; pending_amount?: number; result?: 'APPROVED' | 'DECLINED'; settled_amount?: number; user_defined_id?: string; }`\n\n  - `token: string`\n  - `created: string`\n  - `status: 'PENDING' | 'SETTLED' | 'DECLINED' | 'REVERSED' | 'CANCELED' | 'RETURNED'`\n  - `updated: string`\n  - `category?: string`\n  - `currency?: string`\n  - `events?: { token: string; amount: number; created: string; detailed_results: 'APPROVED' | 'INSUFFICIENT_FUNDS'[]; effective_date: string; memo: string; result: 'APPROVED' | 'DECLINED'; type: string; }[]`\n  - `family?: 'EXTERNAL_PAYMENT'`\n  - `financial_account_token?: string`\n  - `payment_type?: 'DEPOSIT' | 'WITHDRAWAL'`\n  - `pending_amount?: number`\n  - `result?: 'APPROVED' | 'DECLINED'`\n  - `settled_amount?: number`\n  - `user_defined_id?: string`\n\n### Example\n\n```typescript\nimport Lithic from 'lithic';\n\nconst client = new Lithic();\n\nconst externalPayment = await client.externalPayments.settle('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', { effective_date: '2019-12-27' });\n\nconsole.log(externalPayment);\n```",
  },
  {
    name: 'create',
    endpoint: '/v1/management_operations',
    httpMethod: 'post',
    summary: 'Create management operation',
    description: 'Create management operation',
    stainlessPath: '(resource) management_operations > (method) create',
    qualified: 'client.managementOperations.create',
    params: [
      'amount: number;',
      'category: string;',
      "direction: 'CREDIT' | 'DEBIT';",
      'effective_date: string;',
      'event_type: string;',
      'financial_account_token: string;',
      'token?: string;',
      'memo?: string;',
      "on_closed_account?: 'FAIL' | 'USE_SUSPENSE';",
      'subtype?: string;',
      'user_defined_id?: string;',
    ],
    response:
      "{ token: string; created: string; status: 'PENDING' | 'SETTLED' | 'DECLINED' | 'REVERSED' | 'CANCELED' | 'RETURNED'; updated: string; category?: string; currency?: string; direction?: 'CREDIT' | 'DEBIT'; events?: { token: string; amount: number; created: string; detailed_results: 'APPROVED' | 'INSUFFICIENT_FUNDS'[]; effective_date: string; memo: string; result: 'APPROVED' | 'DECLINED'; type: string; subtype?: string; }[]; external_resource?: { external_resource_token: string; external_resource_type: external_resource_type; external_resource_sub_token?: string; }; family?: 'MANAGEMENT_OPERATION'; financial_account_token?: string; pending_amount?: number; result?: 'APPROVED' | 'DECLINED'; settled_amount?: number; transaction_series?: { related_transaction_event_token: string; related_transaction_token: string; type: string; }; user_defined_id?: string; }",
    markdown:
      "## create\n\n`client.managementOperations.create(amount: number, category: string, direction: 'CREDIT' | 'DEBIT', effective_date: string, event_type: string, financial_account_token: string, token?: string, memo?: string, on_closed_account?: 'FAIL' | 'USE_SUSPENSE', subtype?: string, user_defined_id?: string): { token: string; created: string; status: 'PENDING' | 'SETTLED' | 'DECLINED' | 'REVERSED' | 'CANCELED' | 'RETURNED'; updated: string; category?: string; currency?: string; direction?: 'CREDIT' | 'DEBIT'; events?: object[]; external_resource?: external_resource; family?: 'MANAGEMENT_OPERATION'; financial_account_token?: string; pending_amount?: number; result?: 'APPROVED' | 'DECLINED'; settled_amount?: number; transaction_series?: object; user_defined_id?: string; }`\n\n**post** `/v1/management_operations`\n\nCreate management operation\n\n### Parameters\n\n- `amount: number`\n\n- `category: string`\n\n- `direction: 'CREDIT' | 'DEBIT'`\n\n- `effective_date: string`\n\n- `event_type: string`\n\n- `financial_account_token: string`\n\n- `token?: string`\n  Customer-provided token that will serve as an idempotency token. This token will become the transaction token.\n\n- `memo?: string`\n\n- `on_closed_account?: 'FAIL' | 'USE_SUSPENSE'`\n  What to do if the financial account is closed when posting an operation\n\n- `subtype?: string`\n\n- `user_defined_id?: string`\n\n### Returns\n\n- `{ token: string; created: string; status: 'PENDING' | 'SETTLED' | 'DECLINED' | 'REVERSED' | 'CANCELED' | 'RETURNED'; updated: string; category?: string; currency?: string; direction?: 'CREDIT' | 'DEBIT'; events?: { token: string; amount: number; created: string; detailed_results: 'APPROVED' | 'INSUFFICIENT_FUNDS'[]; effective_date: string; memo: string; result: 'APPROVED' | 'DECLINED'; type: string; subtype?: string; }[]; external_resource?: { external_resource_token: string; external_resource_type: external_resource_type; external_resource_sub_token?: string; }; family?: 'MANAGEMENT_OPERATION'; financial_account_token?: string; pending_amount?: number; result?: 'APPROVED' | 'DECLINED'; settled_amount?: number; transaction_series?: { related_transaction_event_token: string; related_transaction_token: string; type: string; }; user_defined_id?: string; }`\n\n  - `token: string`\n  - `created: string`\n  - `status: 'PENDING' | 'SETTLED' | 'DECLINED' | 'REVERSED' | 'CANCELED' | 'RETURNED'`\n  - `updated: string`\n  - `category?: string`\n  - `currency?: string`\n  - `direction?: 'CREDIT' | 'DEBIT'`\n  - `events?: { token: string; amount: number; created: string; detailed_results: 'APPROVED' | 'INSUFFICIENT_FUNDS'[]; effective_date: string; memo: string; result: 'APPROVED' | 'DECLINED'; type: string; subtype?: string; }[]`\n  - `external_resource?: { external_resource_token: string; external_resource_type: 'STATEMENT' | 'COLLECTION' | 'DISPUTE' | 'UNKNOWN'; external_resource_sub_token?: string; }`\n  - `family?: 'MANAGEMENT_OPERATION'`\n  - `financial_account_token?: string`\n  - `pending_amount?: number`\n  - `result?: 'APPROVED' | 'DECLINED'`\n  - `settled_amount?: number`\n  - `transaction_series?: { related_transaction_event_token: string; related_transaction_token: string; type: string; }`\n  - `user_defined_id?: string`\n\n### Example\n\n```typescript\nimport Lithic from 'lithic';\n\nconst client = new Lithic();\n\nconst managementOperationTransaction = await client.managementOperations.create({\n  amount: 1,\n  category: 'MANAGEMENT_FEE',\n  direction: 'CREDIT',\n  effective_date: '2019-12-27',\n  event_type: 'LOSS_WRITE_OFF',\n  financial_account_token: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',\n});\n\nconsole.log(managementOperationTransaction);\n```",
  },
  {
    name: 'retrieve',
    endpoint: '/v1/management_operations/{management_operation_token}',
    httpMethod: 'get',
    summary: 'Get management operation',
    description: 'Get management operation',
    stainlessPath: '(resource) management_operations > (method) retrieve',
    qualified: 'client.managementOperations.retrieve',
    params: ['management_operation_token: string;'],
    response:
      "{ token: string; created: string; status: 'PENDING' | 'SETTLED' | 'DECLINED' | 'REVERSED' | 'CANCELED' | 'RETURNED'; updated: string; category?: string; currency?: string; direction?: 'CREDIT' | 'DEBIT'; events?: { token: string; amount: number; created: string; detailed_results: 'APPROVED' | 'INSUFFICIENT_FUNDS'[]; effective_date: string; memo: string; result: 'APPROVED' | 'DECLINED'; type: string; subtype?: string; }[]; external_resource?: { external_resource_token: string; external_resource_type: external_resource_type; external_resource_sub_token?: string; }; family?: 'MANAGEMENT_OPERATION'; financial_account_token?: string; pending_amount?: number; result?: 'APPROVED' | 'DECLINED'; settled_amount?: number; transaction_series?: { related_transaction_event_token: string; related_transaction_token: string; type: string; }; user_defined_id?: string; }",
    markdown:
      "## retrieve\n\n`client.managementOperations.retrieve(management_operation_token: string): { token: string; created: string; status: 'PENDING' | 'SETTLED' | 'DECLINED' | 'REVERSED' | 'CANCELED' | 'RETURNED'; updated: string; category?: string; currency?: string; direction?: 'CREDIT' | 'DEBIT'; events?: object[]; external_resource?: external_resource; family?: 'MANAGEMENT_OPERATION'; financial_account_token?: string; pending_amount?: number; result?: 'APPROVED' | 'DECLINED'; settled_amount?: number; transaction_series?: object; user_defined_id?: string; }`\n\n**get** `/v1/management_operations/{management_operation_token}`\n\nGet management operation\n\n### Parameters\n\n- `management_operation_token: string`\n\n### Returns\n\n- `{ token: string; created: string; status: 'PENDING' | 'SETTLED' | 'DECLINED' | 'REVERSED' | 'CANCELED' | 'RETURNED'; updated: string; category?: string; currency?: string; direction?: 'CREDIT' | 'DEBIT'; events?: { token: string; amount: number; created: string; detailed_results: 'APPROVED' | 'INSUFFICIENT_FUNDS'[]; effective_date: string; memo: string; result: 'APPROVED' | 'DECLINED'; type: string; subtype?: string; }[]; external_resource?: { external_resource_token: string; external_resource_type: external_resource_type; external_resource_sub_token?: string; }; family?: 'MANAGEMENT_OPERATION'; financial_account_token?: string; pending_amount?: number; result?: 'APPROVED' | 'DECLINED'; settled_amount?: number; transaction_series?: { related_transaction_event_token: string; related_transaction_token: string; type: string; }; user_defined_id?: string; }`\n\n  - `token: string`\n  - `created: string`\n  - `status: 'PENDING' | 'SETTLED' | 'DECLINED' | 'REVERSED' | 'CANCELED' | 'RETURNED'`\n  - `updated: string`\n  - `category?: string`\n  - `currency?: string`\n  - `direction?: 'CREDIT' | 'DEBIT'`\n  - `events?: { token: string; amount: number; created: string; detailed_results: 'APPROVED' | 'INSUFFICIENT_FUNDS'[]; effective_date: string; memo: string; result: 'APPROVED' | 'DECLINED'; type: string; subtype?: string; }[]`\n  - `external_resource?: { external_resource_token: string; external_resource_type: 'STATEMENT' | 'COLLECTION' | 'DISPUTE' | 'UNKNOWN'; external_resource_sub_token?: string; }`\n  - `family?: 'MANAGEMENT_OPERATION'`\n  - `financial_account_token?: string`\n  - `pending_amount?: number`\n  - `result?: 'APPROVED' | 'DECLINED'`\n  - `settled_amount?: number`\n  - `transaction_series?: { related_transaction_event_token: string; related_transaction_token: string; type: string; }`\n  - `user_defined_id?: string`\n\n### Example\n\n```typescript\nimport Lithic from 'lithic';\n\nconst client = new Lithic();\n\nconst managementOperationTransaction = await client.managementOperations.retrieve('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e');\n\nconsole.log(managementOperationTransaction);\n```",
  },
  {
    name: 'list',
    endpoint: '/v1/management_operations',
    httpMethod: 'get',
    summary: 'List management operations',
    description: 'List management operations',
    stainlessPath: '(resource) management_operations > (method) list',
    qualified: 'client.managementOperations.list',
    params: [
      'begin?: string;',
      'business_account_token?: string;',
      'category?: string;',
      'end?: string;',
      'ending_before?: string;',
      'financial_account_token?: string;',
      'page_size?: number;',
      'starting_after?: string;',
      "status?: 'PENDING' | 'SETTLED' | 'DECLINED' | 'REVERSED' | 'CANCELED' | 'RETURNED';",
    ],
    response:
      "{ token: string; created: string; status: 'PENDING' | 'SETTLED' | 'DECLINED' | 'REVERSED' | 'CANCELED' | 'RETURNED'; updated: string; category?: string; currency?: string; direction?: 'CREDIT' | 'DEBIT'; events?: { token: string; amount: number; created: string; detailed_results: 'APPROVED' | 'INSUFFICIENT_FUNDS'[]; effective_date: string; memo: string; result: 'APPROVED' | 'DECLINED'; type: string; subtype?: string; }[]; external_resource?: { external_resource_token: string; external_resource_type: external_resource_type; external_resource_sub_token?: string; }; family?: 'MANAGEMENT_OPERATION'; financial_account_token?: string; pending_amount?: number; result?: 'APPROVED' | 'DECLINED'; settled_amount?: number; transaction_series?: { related_transaction_event_token: string; related_transaction_token: string; type: string; }; user_defined_id?: string; }",
    markdown:
      "## list\n\n`client.managementOperations.list(begin?: string, business_account_token?: string, category?: string, end?: string, ending_before?: string, financial_account_token?: string, page_size?: number, starting_after?: string, status?: 'PENDING' | 'SETTLED' | 'DECLINED' | 'REVERSED' | 'CANCELED' | 'RETURNED'): { token: string; created: string; status: 'PENDING' | 'SETTLED' | 'DECLINED' | 'REVERSED' | 'CANCELED' | 'RETURNED'; updated: string; category?: string; currency?: string; direction?: 'CREDIT' | 'DEBIT'; events?: object[]; external_resource?: external_resource; family?: 'MANAGEMENT_OPERATION'; financial_account_token?: string; pending_amount?: number; result?: 'APPROVED' | 'DECLINED'; settled_amount?: number; transaction_series?: object; user_defined_id?: string; }`\n\n**get** `/v1/management_operations`\n\nList management operations\n\n### Parameters\n\n- `begin?: string`\n  Date string in RFC 3339 format. Only entries created after the specified time will be included. UTC time zone.\n\n- `business_account_token?: string`\n\n- `category?: string`\n  Management operation category to be returned.\n\n- `end?: string`\n  Date string in RFC 3339 format. Only entries created before the specified time will be included. UTC time zone.\n\n- `ending_before?: string`\n  A cursor representing an item's token before which a page of results should end. Used to retrieve the previous page of results before this item.\n\n- `financial_account_token?: string`\n  Globally unique identifier for the financial account. Accepted type dependent on the program's use case.\n\n- `page_size?: number`\n  Page size (for pagination).\n\n- `starting_after?: string`\n  A cursor representing an item's token after which a page of results should begin. Used to retrieve the next page of results after this item.\n\n- `status?: 'PENDING' | 'SETTLED' | 'DECLINED' | 'REVERSED' | 'CANCELED' | 'RETURNED'`\n  Management operation status to be returned.\n\n### Returns\n\n- `{ token: string; created: string; status: 'PENDING' | 'SETTLED' | 'DECLINED' | 'REVERSED' | 'CANCELED' | 'RETURNED'; updated: string; category?: string; currency?: string; direction?: 'CREDIT' | 'DEBIT'; events?: { token: string; amount: number; created: string; detailed_results: 'APPROVED' | 'INSUFFICIENT_FUNDS'[]; effective_date: string; memo: string; result: 'APPROVED' | 'DECLINED'; type: string; subtype?: string; }[]; external_resource?: { external_resource_token: string; external_resource_type: external_resource_type; external_resource_sub_token?: string; }; family?: 'MANAGEMENT_OPERATION'; financial_account_token?: string; pending_amount?: number; result?: 'APPROVED' | 'DECLINED'; settled_amount?: number; transaction_series?: { related_transaction_event_token: string; related_transaction_token: string; type: string; }; user_defined_id?: string; }`\n\n  - `token: string`\n  - `created: string`\n  - `status: 'PENDING' | 'SETTLED' | 'DECLINED' | 'REVERSED' | 'CANCELED' | 'RETURNED'`\n  - `updated: string`\n  - `category?: string`\n  - `currency?: string`\n  - `direction?: 'CREDIT' | 'DEBIT'`\n  - `events?: { token: string; amount: number; created: string; detailed_results: 'APPROVED' | 'INSUFFICIENT_FUNDS'[]; effective_date: string; memo: string; result: 'APPROVED' | 'DECLINED'; type: string; subtype?: string; }[]`\n  - `external_resource?: { external_resource_token: string; external_resource_type: 'STATEMENT' | 'COLLECTION' | 'DISPUTE' | 'UNKNOWN'; external_resource_sub_token?: string; }`\n  - `family?: 'MANAGEMENT_OPERATION'`\n  - `financial_account_token?: string`\n  - `pending_amount?: number`\n  - `result?: 'APPROVED' | 'DECLINED'`\n  - `settled_amount?: number`\n  - `transaction_series?: { related_transaction_event_token: string; related_transaction_token: string; type: string; }`\n  - `user_defined_id?: string`\n\n### Example\n\n```typescript\nimport Lithic from 'lithic';\n\nconst client = new Lithic();\n\n// Automatically fetches more pages as needed.\nfor await (const managementOperationTransaction of client.managementOperations.list()) {\n  console.log(managementOperationTransaction);\n}\n```",
  },
  {
    name: 'reverse',
    endpoint: '/v1/management_operations/{management_operation_token}/reverse',
    httpMethod: 'post',
    summary: 'Reverse management operation',
    description: 'Reverse a management operation',
    stainlessPath: '(resource) management_operations > (method) reverse',
    qualified: 'client.managementOperations.reverse',
    params: ['management_operation_token: string;', 'effective_date: string;', 'memo?: string;'],
    response:
      "{ token: string; created: string; status: 'PENDING' | 'SETTLED' | 'DECLINED' | 'REVERSED' | 'CANCELED' | 'RETURNED'; updated: string; category?: string; currency?: string; direction?: 'CREDIT' | 'DEBIT'; events?: { token: string; amount: number; created: string; detailed_results: 'APPROVED' | 'INSUFFICIENT_FUNDS'[]; effective_date: string; memo: string; result: 'APPROVED' | 'DECLINED'; type: string; subtype?: string; }[]; external_resource?: { external_resource_token: string; external_resource_type: external_resource_type; external_resource_sub_token?: string; }; family?: 'MANAGEMENT_OPERATION'; financial_account_token?: string; pending_amount?: number; result?: 'APPROVED' | 'DECLINED'; settled_amount?: number; transaction_series?: { related_transaction_event_token: string; related_transaction_token: string; type: string; }; user_defined_id?: string; }",
    markdown:
      "## reverse\n\n`client.managementOperations.reverse(management_operation_token: string, effective_date: string, memo?: string): { token: string; created: string; status: 'PENDING' | 'SETTLED' | 'DECLINED' | 'REVERSED' | 'CANCELED' | 'RETURNED'; updated: string; category?: string; currency?: string; direction?: 'CREDIT' | 'DEBIT'; events?: object[]; external_resource?: external_resource; family?: 'MANAGEMENT_OPERATION'; financial_account_token?: string; pending_amount?: number; result?: 'APPROVED' | 'DECLINED'; settled_amount?: number; transaction_series?: object; user_defined_id?: string; }`\n\n**post** `/v1/management_operations/{management_operation_token}/reverse`\n\nReverse a management operation\n\n### Parameters\n\n- `management_operation_token: string`\n\n- `effective_date: string`\n\n- `memo?: string`\n\n### Returns\n\n- `{ token: string; created: string; status: 'PENDING' | 'SETTLED' | 'DECLINED' | 'REVERSED' | 'CANCELED' | 'RETURNED'; updated: string; category?: string; currency?: string; direction?: 'CREDIT' | 'DEBIT'; events?: { token: string; amount: number; created: string; detailed_results: 'APPROVED' | 'INSUFFICIENT_FUNDS'[]; effective_date: string; memo: string; result: 'APPROVED' | 'DECLINED'; type: string; subtype?: string; }[]; external_resource?: { external_resource_token: string; external_resource_type: external_resource_type; external_resource_sub_token?: string; }; family?: 'MANAGEMENT_OPERATION'; financial_account_token?: string; pending_amount?: number; result?: 'APPROVED' | 'DECLINED'; settled_amount?: number; transaction_series?: { related_transaction_event_token: string; related_transaction_token: string; type: string; }; user_defined_id?: string; }`\n\n  - `token: string`\n  - `created: string`\n  - `status: 'PENDING' | 'SETTLED' | 'DECLINED' | 'REVERSED' | 'CANCELED' | 'RETURNED'`\n  - `updated: string`\n  - `category?: string`\n  - `currency?: string`\n  - `direction?: 'CREDIT' | 'DEBIT'`\n  - `events?: { token: string; amount: number; created: string; detailed_results: 'APPROVED' | 'INSUFFICIENT_FUNDS'[]; effective_date: string; memo: string; result: 'APPROVED' | 'DECLINED'; type: string; subtype?: string; }[]`\n  - `external_resource?: { external_resource_token: string; external_resource_type: 'STATEMENT' | 'COLLECTION' | 'DISPUTE' | 'UNKNOWN'; external_resource_sub_token?: string; }`\n  - `family?: 'MANAGEMENT_OPERATION'`\n  - `financial_account_token?: string`\n  - `pending_amount?: number`\n  - `result?: 'APPROVED' | 'DECLINED'`\n  - `settled_amount?: number`\n  - `transaction_series?: { related_transaction_event_token: string; related_transaction_token: string; type: string; }`\n  - `user_defined_id?: string`\n\n### Example\n\n```typescript\nimport Lithic from 'lithic';\n\nconst client = new Lithic();\n\nconst managementOperationTransaction = await client.managementOperations.reverse('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', { effective_date: '2019-12-27' });\n\nconsole.log(managementOperationTransaction);\n```",
  },
  {
    name: 'retrieve',
    endpoint: '/v1/funding_events/{funding_event_token}',
    httpMethod: 'get',
    summary: 'Get funding event by ID',
    description: 'Get funding event for program by id',
    stainlessPath: '(resource) funding_events > (method) retrieve',
    qualified: 'client.fundingEvents.retrieve',
    params: ['funding_event_token: string;'],
    response:
      "{ token: string; collection_resource_type: 'BOOK_TRANSFER' | 'PAYMENT'; collection_tokens: string[]; created: string; high_watermark: string; network_settlement_summary: { network_settlement_date: string; settled_gross_amount: number; }[]; previous_high_watermark: string; updated: string; }",
    markdown:
      "## retrieve\n\n`client.fundingEvents.retrieve(funding_event_token: string): { token: string; collection_resource_type: 'BOOK_TRANSFER' | 'PAYMENT'; collection_tokens: string[]; created: string; high_watermark: string; network_settlement_summary: object[]; previous_high_watermark: string; updated: string; }`\n\n**get** `/v1/funding_events/{funding_event_token}`\n\nGet funding event for program by id\n\n### Parameters\n\n- `funding_event_token: string`\n\n### Returns\n\n- `{ token: string; collection_resource_type: 'BOOK_TRANSFER' | 'PAYMENT'; collection_tokens: string[]; created: string; high_watermark: string; network_settlement_summary: { network_settlement_date: string; settled_gross_amount: number; }[]; previous_high_watermark: string; updated: string; }`\n\n  - `token: string`\n  - `collection_resource_type: 'BOOK_TRANSFER' | 'PAYMENT'`\n  - `collection_tokens: string[]`\n  - `created: string`\n  - `high_watermark: string`\n  - `network_settlement_summary: { network_settlement_date: string; settled_gross_amount: number; }[]`\n  - `previous_high_watermark: string`\n  - `updated: string`\n\n### Example\n\n```typescript\nimport Lithic from 'lithic';\n\nconst client = new Lithic();\n\nconst fundingEvent = await client.fundingEvents.retrieve('funding_event_token');\n\nconsole.log(fundingEvent);\n```",
  },
  {
    name: 'list',
    endpoint: '/v1/funding_events',
    httpMethod: 'get',
    summary: 'List funding events',
    description: 'Get all funding events for program',
    stainlessPath: '(resource) funding_events > (method) list',
    qualified: 'client.fundingEvents.list',
    params: ['ending_before?: string;', 'page_size?: number;', 'starting_after?: string;'],
    response:
      "{ token: string; collection_resource_type: 'BOOK_TRANSFER' | 'PAYMENT'; collection_tokens: string[]; created: string; high_watermark: string; network_settlement_summary: { network_settlement_date: string; settled_gross_amount: number; }[]; previous_high_watermark: string; updated: string; }",
    markdown:
      "## list\n\n`client.fundingEvents.list(ending_before?: string, page_size?: number, starting_after?: string): { token: string; collection_resource_type: 'BOOK_TRANSFER' | 'PAYMENT'; collection_tokens: string[]; created: string; high_watermark: string; network_settlement_summary: object[]; previous_high_watermark: string; updated: string; }`\n\n**get** `/v1/funding_events`\n\nGet all funding events for program\n\n### Parameters\n\n- `ending_before?: string`\n  A cursor representing an item's token before which a page of results should end. Used to retrieve the previous page of results before this item.\n\n- `page_size?: number`\n  Page size (for pagination).\n\n- `starting_after?: string`\n  A cursor representing an item's token after which a page of results should begin. Used to retrieve the next page of results after this item.\n\n### Returns\n\n- `{ token: string; collection_resource_type: 'BOOK_TRANSFER' | 'PAYMENT'; collection_tokens: string[]; created: string; high_watermark: string; network_settlement_summary: { network_settlement_date: string; settled_gross_amount: number; }[]; previous_high_watermark: string; updated: string; }`\n\n  - `token: string`\n  - `collection_resource_type: 'BOOK_TRANSFER' | 'PAYMENT'`\n  - `collection_tokens: string[]`\n  - `created: string`\n  - `high_watermark: string`\n  - `network_settlement_summary: { network_settlement_date: string; settled_gross_amount: number; }[]`\n  - `previous_high_watermark: string`\n  - `updated: string`\n\n### Example\n\n```typescript\nimport Lithic from 'lithic';\n\nconst client = new Lithic();\n\n// Automatically fetches more pages as needed.\nfor await (const fundingEvent of client.fundingEvents.list()) {\n  console.log(fundingEvent);\n}\n```",
  },
  {
    name: 'retrieve_details',
    endpoint: '/v1/funding_events/{funding_event_token}/details',
    httpMethod: 'get',
    summary: 'Get funding event details',
    description: 'Get funding event details by id',
    stainlessPath: '(resource) funding_events > (method) retrieve_details',
    qualified: 'client.fundingEvents.retrieveDetails',
    params: ['funding_event_token: string;'],
    response: '{ token: string; settlement_details_url: string; settlement_summary_url: string; }',
    markdown:
      "## retrieve_details\n\n`client.fundingEvents.retrieveDetails(funding_event_token: string): { token: string; settlement_details_url: string; settlement_summary_url: string; }`\n\n**get** `/v1/funding_events/{funding_event_token}/details`\n\nGet funding event details by id\n\n### Parameters\n\n- `funding_event_token: string`\n\n### Returns\n\n- `{ token: string; settlement_details_url: string; settlement_summary_url: string; }`\n\n  - `token: string`\n  - `settlement_details_url: string`\n  - `settlement_summary_url: string`\n\n### Example\n\n```typescript\nimport Lithic from 'lithic';\n\nconst client = new Lithic();\n\nconst response = await client.fundingEvents.retrieveDetails('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e');\n\nconsole.log(response);\n```",
  },
  {
    name: 'retrieve',
    endpoint: '/v1/fraud/transactions/{transaction_token}',
    httpMethod: 'get',
    summary: 'Get a fraud report for a transaction',
    description:
      'Retrieve a fraud report for a specific transaction identified by its unique transaction token.\n',
    stainlessPath: '(resource) fraud.transactions > (method) retrieve',
    qualified: 'client.fraud.transactions.retrieve',
    params: ['transaction_token: string;'],
    response:
      "{ fraud_status: 'SUSPECTED_FRAUD' | 'FRAUDULENT' | 'NOT_FRAUDULENT' | 'NO_REPORTED_FRAUD'; transaction_token: string; comment?: string; created_at?: string; fraud_type?: string; updated_at?: string; }",
    markdown:
      "## retrieve\n\n`client.fraud.transactions.retrieve(transaction_token: string): { fraud_status: 'SUSPECTED_FRAUD' | 'FRAUDULENT' | 'NOT_FRAUDULENT' | 'NO_REPORTED_FRAUD'; transaction_token: string; comment?: string; created_at?: string; fraud_type?: string; updated_at?: string; }`\n\n**get** `/v1/fraud/transactions/{transaction_token}`\n\nRetrieve a fraud report for a specific transaction identified by its unique transaction token.\n\n\n### Parameters\n\n- `transaction_token: string`\n\n### Returns\n\n- `{ fraud_status: 'SUSPECTED_FRAUD' | 'FRAUDULENT' | 'NOT_FRAUDULENT' | 'NO_REPORTED_FRAUD'; transaction_token: string; comment?: string; created_at?: string; fraud_type?: string; updated_at?: string; }`\n\n  - `fraud_status: 'SUSPECTED_FRAUD' | 'FRAUDULENT' | 'NOT_FRAUDULENT' | 'NO_REPORTED_FRAUD'`\n  - `transaction_token: string`\n  - `comment?: string`\n  - `created_at?: string`\n  - `fraud_type?: string`\n  - `updated_at?: string`\n\n### Example\n\n```typescript\nimport Lithic from 'lithic';\n\nconst client = new Lithic();\n\nconst transaction = await client.fraud.transactions.retrieve('00000000-0000-0000-0000-000000000000');\n\nconsole.log(transaction);\n```",
  },
  {
    name: 'report',
    endpoint: '/v1/fraud/transactions/{transaction_token}',
    httpMethod: 'post',
    summary: 'Create or update a fraud report for a transaction',
    description:
      'Report fraud for a specific transaction token by providing details such as fraud type, fraud status, and any additional comments.\n',
    stainlessPath: '(resource) fraud.transactions > (method) report',
    qualified: 'client.fraud.transactions.report',
    params: [
      'transaction_token: string;',
      "fraud_status: 'SUSPECTED_FRAUD' | 'FRAUDULENT' | 'NOT_FRAUDULENT';",
      'comment?: string;',
      'fraud_type?: string;',
    ],
    response:
      "{ fraud_status: 'SUSPECTED_FRAUD' | 'FRAUDULENT' | 'NOT_FRAUDULENT' | 'NO_REPORTED_FRAUD'; transaction_token: string; comment?: string; created_at?: string; fraud_type?: string; updated_at?: string; }",
    markdown:
      "## report\n\n`client.fraud.transactions.report(transaction_token: string, fraud_status: 'SUSPECTED_FRAUD' | 'FRAUDULENT' | 'NOT_FRAUDULENT', comment?: string, fraud_type?: string): { fraud_status: 'SUSPECTED_FRAUD' | 'FRAUDULENT' | 'NOT_FRAUDULENT' | 'NO_REPORTED_FRAUD'; transaction_token: string; comment?: string; created_at?: string; fraud_type?: string; updated_at?: string; }`\n\n**post** `/v1/fraud/transactions/{transaction_token}`\n\nReport fraud for a specific transaction token by providing details such as fraud type, fraud status, and any additional comments.\n\n\n### Parameters\n\n- `transaction_token: string`\n\n- `fraud_status: 'SUSPECTED_FRAUD' | 'FRAUDULENT' | 'NOT_FRAUDULENT'`\n  The fraud status of the transaction, string (enum) supporting the following values:\n\n - `SUSPECTED_FRAUD`: The transaction is suspected to be fraudulent, but this hasn’t been confirmed.\n - `FRAUDULENT`: The transaction is confirmed to be fraudulent. A transaction may immediately be moved into this state, or be graduated into this state from the `SUSPECTED_FRAUD` state.\n - `NOT_FRAUDULENT`: The transaction is (explicitly) marked as not fraudulent. A transaction may immediately be moved into this state, or be graduated into this state from the `SUSPECTED_FRAUD` state.\n\n- `comment?: string`\n  Optional field providing additional information or context about why the transaction is considered fraudulent.\n\n- `fraud_type?: string`\n  Specifies the type or category of fraud that the transaction is suspected or confirmed to involve, string (enum) supporting the following values:\n\n - `FIRST_PARTY_FRAUD`: First-party fraud occurs when a legitimate account or cardholder intentionally misuses financial services for personal gain. This includes actions such as disputing legitimate transactions to obtain a refund, abusing return policies, or defaulting on credit obligations without intent to repay.\n - `ACCOUNT_TAKEOVER`: Account takeover fraud occurs when a fraudster gains unauthorized access to an existing account, modifies account settings, and carries out fraudulent transactions.\n - `CARD_COMPROMISED`: Card compromised fraud occurs when a fraudster gains access to card details without taking over the account, such as through physical card theft, cloning, or online data breaches.\n - `IDENTITY_THEFT`: Identity theft fraud occurs when a fraudster uses stolen personal information, such as Social Security numbers or addresses, to open accounts, apply for loans, or conduct financial transactions in someone's name.\n - `CARDHOLDER_MANIPULATION`: This type of fraud occurs when a fraudster manipulates or coerces a legitimate cardholder into unauthorized transactions, often through social engineering tactics.\n\n### Returns\n\n- `{ fraud_status: 'SUSPECTED_FRAUD' | 'FRAUDULENT' | 'NOT_FRAUDULENT' | 'NO_REPORTED_FRAUD'; transaction_token: string; comment?: string; created_at?: string; fraud_type?: string; updated_at?: string; }`\n\n  - `fraud_status: 'SUSPECTED_FRAUD' | 'FRAUDULENT' | 'NOT_FRAUDULENT' | 'NO_REPORTED_FRAUD'`\n  - `transaction_token: string`\n  - `comment?: string`\n  - `created_at?: string`\n  - `fraud_type?: string`\n  - `updated_at?: string`\n\n### Example\n\n```typescript\nimport Lithic from 'lithic';\n\nconst client = new Lithic();\n\nconst response = await client.fraud.transactions.report('00000000-0000-0000-0000-000000000000', { fraud_status: 'SUSPECTED_FRAUD' });\n\nconsole.log(response);\n```",
  },
  {
    name: 'retrieve',
    endpoint: '/v1/network_programs/{network_program_token}',
    httpMethod: 'get',
    summary: 'Get network program',
    description: 'Get network program.',
    stainlessPath: '(resource) network_programs > (method) retrieve',
    qualified: 'client.networkPrograms.retrieve',
    params: ['network_program_token: string;'],
    response:
      '{ token: string; default_product_code: string; name: string; registered_program_identification_number: string; }',
    markdown:
      "## retrieve\n\n`client.networkPrograms.retrieve(network_program_token: string): { token: string; default_product_code: string; name: string; registered_program_identification_number: string; }`\n\n**get** `/v1/network_programs/{network_program_token}`\n\nGet network program.\n\n### Parameters\n\n- `network_program_token: string`\n\n### Returns\n\n- `{ token: string; default_product_code: string; name: string; registered_program_identification_number: string; }`\n\n  - `token: string`\n  - `default_product_code: string`\n  - `name: string`\n  - `registered_program_identification_number: string`\n\n### Example\n\n```typescript\nimport Lithic from 'lithic';\n\nconst client = new Lithic();\n\nconst networkProgram = await client.networkPrograms.retrieve('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e');\n\nconsole.log(networkProgram);\n```",
  },
  {
    name: 'list',
    endpoint: '/v1/network_programs',
    httpMethod: 'get',
    summary: 'List network programs',
    description: 'List network programs.',
    stainlessPath: '(resource) network_programs > (method) list',
    qualified: 'client.networkPrograms.list',
    params: ['begin?: string;', 'end?: string;', 'page_size?: number;'],
    response:
      '{ token: string; default_product_code: string; name: string; registered_program_identification_number: string; }',
    markdown:
      "## list\n\n`client.networkPrograms.list(begin?: string, end?: string, page_size?: number): { token: string; default_product_code: string; name: string; registered_program_identification_number: string; }`\n\n**get** `/v1/network_programs`\n\nList network programs.\n\n### Parameters\n\n- `begin?: string`\n  Date string in RFC 3339 format. Only entries created after the specified time will be included. UTC time zone.\n\n- `end?: string`\n  Date string in RFC 3339 format. Only entries created before the specified time will be included. UTC time zone.\n\n- `page_size?: number`\n  Page size (for pagination).\n\n### Returns\n\n- `{ token: string; default_product_code: string; name: string; registered_program_identification_number: string; }`\n\n  - `token: string`\n  - `default_product_code: string`\n  - `name: string`\n  - `registered_program_identification_number: string`\n\n### Example\n\n```typescript\nimport Lithic from 'lithic';\n\nconst client = new Lithic();\n\n// Automatically fetches more pages as needed.\nfor await (const networkProgram of client.networkPrograms.list()) {\n  console.log(networkProgram);\n}\n```",
  },
  {
    name: 'create',
    endpoint: '/v1/financial_accounts/{financial_account_token}/holds',
    httpMethod: 'post',
    summary: 'Create hold',
    description:
      'Create a hold on a financial account. Holds reserve funds by moving them\nfrom available to pending balance. They can be resolved via settlement\n(linked to a payment or book transfer), voiding, or expiration.\n',
    stainlessPath: '(resource) holds > (method) create',
    qualified: 'client.holds.create',
    params: [
      'financial_account_token: string;',
      'amount: number;',
      'token?: string;',
      'expiration_datetime?: string;',
      'memo?: string;',
      'user_defined_id?: string;',
    ],
    response:
      "{ token: string; created: string; status: 'PENDING' | 'SETTLED' | 'EXPIRED' | 'VOIDED' | 'DECLINED' | 'REVERSED' | 'CANCELED' | 'RETURNED'; updated: string; currency?: string; events?: { token: string; amount: number; created: string; detailed_results: 'APPROVED' | 'INSUFFICIENT_FUNDS'[]; memo: string; result: 'APPROVED' | 'DECLINED'; settling_transaction_token: string; type: 'HOLD_INITIATED' | 'HOLD_VOIDED' | 'HOLD_EXPIRED' | 'HOLD_SETTLED'; }[]; expiration_datetime?: string; family?: 'HOLD'; financial_account_token?: string; pending_amount?: number; result?: 'APPROVED' | 'DECLINED'; user_defined_id?: string; }",
    markdown:
      "## create\n\n`client.holds.create(financial_account_token: string, amount: number, token?: string, expiration_datetime?: string, memo?: string, user_defined_id?: string): { token: string; created: string; status: 'PENDING' | 'SETTLED' | 'EXPIRED' | 'VOIDED' | 'DECLINED' | 'REVERSED' | 'CANCELED' | 'RETURNED'; updated: string; currency?: string; events?: hold_event[]; expiration_datetime?: string; family?: 'HOLD'; financial_account_token?: string; pending_amount?: number; result?: 'APPROVED' | 'DECLINED'; user_defined_id?: string; }`\n\n**post** `/v1/financial_accounts/{financial_account_token}/holds`\n\nCreate a hold on a financial account. Holds reserve funds by moving them\nfrom available to pending balance. They can be resolved via settlement\n(linked to a payment or book transfer), voiding, or expiration.\n\n\n### Parameters\n\n- `financial_account_token: string`\n\n- `amount: number`\n  Amount to hold in cents\n\n- `token?: string`\n  Customer-provided token for idempotency. Becomes the hold token.\n\n- `expiration_datetime?: string`\n  When the hold should auto-expire\n\n- `memo?: string`\n  Reason for the hold\n\n- `user_defined_id?: string`\n  User-provided identifier for the hold\n\n### Returns\n\n- `{ token: string; created: string; status: 'PENDING' | 'SETTLED' | 'EXPIRED' | 'VOIDED' | 'DECLINED' | 'REVERSED' | 'CANCELED' | 'RETURNED'; updated: string; currency?: string; events?: { token: string; amount: number; created: string; detailed_results: 'APPROVED' | 'INSUFFICIENT_FUNDS'[]; memo: string; result: 'APPROVED' | 'DECLINED'; settling_transaction_token: string; type: 'HOLD_INITIATED' | 'HOLD_VOIDED' | 'HOLD_EXPIRED' | 'HOLD_SETTLED'; }[]; expiration_datetime?: string; family?: 'HOLD'; financial_account_token?: string; pending_amount?: number; result?: 'APPROVED' | 'DECLINED'; user_defined_id?: string; }`\n  A hold transaction representing reserved funds on a financial account. Holds move funds from available to pending balance in anticipation of future payments. They can be resolved via settlement (linked to payment), manual release, or expiration.\n\n  - `token: string`\n  - `created: string`\n  - `status: 'PENDING' | 'SETTLED' | 'EXPIRED' | 'VOIDED' | 'DECLINED' | 'REVERSED' | 'CANCELED' | 'RETURNED'`\n  - `updated: string`\n  - `currency?: string`\n  - `events?: { token: string; amount: number; created: string; detailed_results: 'APPROVED' | 'INSUFFICIENT_FUNDS'[]; memo: string; result: 'APPROVED' | 'DECLINED'; settling_transaction_token: string; type: 'HOLD_INITIATED' | 'HOLD_VOIDED' | 'HOLD_EXPIRED' | 'HOLD_SETTLED'; }[]`\n  - `expiration_datetime?: string`\n  - `family?: 'HOLD'`\n  - `financial_account_token?: string`\n  - `pending_amount?: number`\n  - `result?: 'APPROVED' | 'DECLINED'`\n  - `user_defined_id?: string`\n\n### Example\n\n```typescript\nimport Lithic from 'lithic';\n\nconst client = new Lithic();\n\nconst hold = await client.holds.create('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', { amount: 1 });\n\nconsole.log(hold);\n```",
  },
  {
    name: 'retrieve',
    endpoint: '/v1/holds/{hold_token}',
    httpMethod: 'get',
    summary: 'Get hold',
    description: 'Get hold by token.',
    stainlessPath: '(resource) holds > (method) retrieve',
    qualified: 'client.holds.retrieve',
    params: ['hold_token: string;'],
    response:
      "{ token: string; created: string; status: 'PENDING' | 'SETTLED' | 'EXPIRED' | 'VOIDED' | 'DECLINED' | 'REVERSED' | 'CANCELED' | 'RETURNED'; updated: string; currency?: string; events?: { token: string; amount: number; created: string; detailed_results: 'APPROVED' | 'INSUFFICIENT_FUNDS'[]; memo: string; result: 'APPROVED' | 'DECLINED'; settling_transaction_token: string; type: 'HOLD_INITIATED' | 'HOLD_VOIDED' | 'HOLD_EXPIRED' | 'HOLD_SETTLED'; }[]; expiration_datetime?: string; family?: 'HOLD'; financial_account_token?: string; pending_amount?: number; result?: 'APPROVED' | 'DECLINED'; user_defined_id?: string; }",
    markdown:
      "## retrieve\n\n`client.holds.retrieve(hold_token: string): { token: string; created: string; status: 'PENDING' | 'SETTLED' | 'EXPIRED' | 'VOIDED' | 'DECLINED' | 'REVERSED' | 'CANCELED' | 'RETURNED'; updated: string; currency?: string; events?: hold_event[]; expiration_datetime?: string; family?: 'HOLD'; financial_account_token?: string; pending_amount?: number; result?: 'APPROVED' | 'DECLINED'; user_defined_id?: string; }`\n\n**get** `/v1/holds/{hold_token}`\n\nGet hold by token.\n\n### Parameters\n\n- `hold_token: string`\n\n### Returns\n\n- `{ token: string; created: string; status: 'PENDING' | 'SETTLED' | 'EXPIRED' | 'VOIDED' | 'DECLINED' | 'REVERSED' | 'CANCELED' | 'RETURNED'; updated: string; currency?: string; events?: { token: string; amount: number; created: string; detailed_results: 'APPROVED' | 'INSUFFICIENT_FUNDS'[]; memo: string; result: 'APPROVED' | 'DECLINED'; settling_transaction_token: string; type: 'HOLD_INITIATED' | 'HOLD_VOIDED' | 'HOLD_EXPIRED' | 'HOLD_SETTLED'; }[]; expiration_datetime?: string; family?: 'HOLD'; financial_account_token?: string; pending_amount?: number; result?: 'APPROVED' | 'DECLINED'; user_defined_id?: string; }`\n  A hold transaction representing reserved funds on a financial account. Holds move funds from available to pending balance in anticipation of future payments. They can be resolved via settlement (linked to payment), manual release, or expiration.\n\n  - `token: string`\n  - `created: string`\n  - `status: 'PENDING' | 'SETTLED' | 'EXPIRED' | 'VOIDED' | 'DECLINED' | 'REVERSED' | 'CANCELED' | 'RETURNED'`\n  - `updated: string`\n  - `currency?: string`\n  - `events?: { token: string; amount: number; created: string; detailed_results: 'APPROVED' | 'INSUFFICIENT_FUNDS'[]; memo: string; result: 'APPROVED' | 'DECLINED'; settling_transaction_token: string; type: 'HOLD_INITIATED' | 'HOLD_VOIDED' | 'HOLD_EXPIRED' | 'HOLD_SETTLED'; }[]`\n  - `expiration_datetime?: string`\n  - `family?: 'HOLD'`\n  - `financial_account_token?: string`\n  - `pending_amount?: number`\n  - `result?: 'APPROVED' | 'DECLINED'`\n  - `user_defined_id?: string`\n\n### Example\n\n```typescript\nimport Lithic from 'lithic';\n\nconst client = new Lithic();\n\nconst hold = await client.holds.retrieve('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e');\n\nconsole.log(hold);\n```",
  },
  {
    name: 'list',
    endpoint: '/v1/financial_accounts/{financial_account_token}/holds',
    httpMethod: 'get',
    summary: 'List holds',
    description: 'List holds for a financial account.',
    stainlessPath: '(resource) holds > (method) list',
    qualified: 'client.holds.list',
    params: [
      'financial_account_token: string;',
      'begin?: string;',
      'end?: string;',
      'ending_before?: string;',
      'page_size?: number;',
      'starting_after?: string;',
      "status?: 'PENDING' | 'SETTLED' | 'EXPIRED' | 'VOIDED';",
    ],
    response:
      "{ token: string; created: string; status: 'PENDING' | 'SETTLED' | 'EXPIRED' | 'VOIDED' | 'DECLINED' | 'REVERSED' | 'CANCELED' | 'RETURNED'; updated: string; currency?: string; events?: { token: string; amount: number; created: string; detailed_results: 'APPROVED' | 'INSUFFICIENT_FUNDS'[]; memo: string; result: 'APPROVED' | 'DECLINED'; settling_transaction_token: string; type: 'HOLD_INITIATED' | 'HOLD_VOIDED' | 'HOLD_EXPIRED' | 'HOLD_SETTLED'; }[]; expiration_datetime?: string; family?: 'HOLD'; financial_account_token?: string; pending_amount?: number; result?: 'APPROVED' | 'DECLINED'; user_defined_id?: string; }",
    markdown:
      "## list\n\n`client.holds.list(financial_account_token: string, begin?: string, end?: string, ending_before?: string, page_size?: number, starting_after?: string, status?: 'PENDING' | 'SETTLED' | 'EXPIRED' | 'VOIDED'): { token: string; created: string; status: 'PENDING' | 'SETTLED' | 'EXPIRED' | 'VOIDED' | 'DECLINED' | 'REVERSED' | 'CANCELED' | 'RETURNED'; updated: string; currency?: string; events?: hold_event[]; expiration_datetime?: string; family?: 'HOLD'; financial_account_token?: string; pending_amount?: number; result?: 'APPROVED' | 'DECLINED'; user_defined_id?: string; }`\n\n**get** `/v1/financial_accounts/{financial_account_token}/holds`\n\nList holds for a financial account.\n\n### Parameters\n\n- `financial_account_token: string`\n\n- `begin?: string`\n  Date string in RFC 3339 format. Only entries created after the specified time will be included. UTC time zone.\n\n- `end?: string`\n  Date string in RFC 3339 format. Only entries created before the specified time will be included. UTC time zone.\n\n- `ending_before?: string`\n  A cursor representing an item's token before which a page of results should end. Used to retrieve the previous page of results before this item.\n\n- `page_size?: number`\n  Page size (for pagination).\n\n- `starting_after?: string`\n  A cursor representing an item's token after which a page of results should begin. Used to retrieve the next page of results after this item.\n\n- `status?: 'PENDING' | 'SETTLED' | 'EXPIRED' | 'VOIDED'`\n  Hold status to filter by.\n\n### Returns\n\n- `{ token: string; created: string; status: 'PENDING' | 'SETTLED' | 'EXPIRED' | 'VOIDED' | 'DECLINED' | 'REVERSED' | 'CANCELED' | 'RETURNED'; updated: string; currency?: string; events?: { token: string; amount: number; created: string; detailed_results: 'APPROVED' | 'INSUFFICIENT_FUNDS'[]; memo: string; result: 'APPROVED' | 'DECLINED'; settling_transaction_token: string; type: 'HOLD_INITIATED' | 'HOLD_VOIDED' | 'HOLD_EXPIRED' | 'HOLD_SETTLED'; }[]; expiration_datetime?: string; family?: 'HOLD'; financial_account_token?: string; pending_amount?: number; result?: 'APPROVED' | 'DECLINED'; user_defined_id?: string; }`\n  A hold transaction representing reserved funds on a financial account. Holds move funds from available to pending balance in anticipation of future payments. They can be resolved via settlement (linked to payment), manual release, or expiration.\n\n  - `token: string`\n  - `created: string`\n  - `status: 'PENDING' | 'SETTLED' | 'EXPIRED' | 'VOIDED' | 'DECLINED' | 'REVERSED' | 'CANCELED' | 'RETURNED'`\n  - `updated: string`\n  - `currency?: string`\n  - `events?: { token: string; amount: number; created: string; detailed_results: 'APPROVED' | 'INSUFFICIENT_FUNDS'[]; memo: string; result: 'APPROVED' | 'DECLINED'; settling_transaction_token: string; type: 'HOLD_INITIATED' | 'HOLD_VOIDED' | 'HOLD_EXPIRED' | 'HOLD_SETTLED'; }[]`\n  - `expiration_datetime?: string`\n  - `family?: 'HOLD'`\n  - `financial_account_token?: string`\n  - `pending_amount?: number`\n  - `result?: 'APPROVED' | 'DECLINED'`\n  - `user_defined_id?: string`\n\n### Example\n\n```typescript\nimport Lithic from 'lithic';\n\nconst client = new Lithic();\n\n// Automatically fetches more pages as needed.\nfor await (const hold of client.holds.list('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e')) {\n  console.log(hold);\n}\n```",
  },
  {
    name: 'void',
    endpoint: '/v1/holds/{hold_token}/void',
    httpMethod: 'post',
    summary: 'Void hold',
    description:
      'Void an active hold. This returns the held funds from pending back to\navailable balance. Only holds in PENDING status can be voided.\n',
    stainlessPath: '(resource) holds > (method) void',
    qualified: 'client.holds.void',
    params: ['hold_token: string;', 'memo?: string;'],
    response:
      "{ token: string; created: string; status: 'PENDING' | 'SETTLED' | 'EXPIRED' | 'VOIDED' | 'DECLINED' | 'REVERSED' | 'CANCELED' | 'RETURNED'; updated: string; currency?: string; events?: { token: string; amount: number; created: string; detailed_results: 'APPROVED' | 'INSUFFICIENT_FUNDS'[]; memo: string; result: 'APPROVED' | 'DECLINED'; settling_transaction_token: string; type: 'HOLD_INITIATED' | 'HOLD_VOIDED' | 'HOLD_EXPIRED' | 'HOLD_SETTLED'; }[]; expiration_datetime?: string; family?: 'HOLD'; financial_account_token?: string; pending_amount?: number; result?: 'APPROVED' | 'DECLINED'; user_defined_id?: string; }",
    markdown:
      "## void\n\n`client.holds.void(hold_token: string, memo?: string): { token: string; created: string; status: 'PENDING' | 'SETTLED' | 'EXPIRED' | 'VOIDED' | 'DECLINED' | 'REVERSED' | 'CANCELED' | 'RETURNED'; updated: string; currency?: string; events?: hold_event[]; expiration_datetime?: string; family?: 'HOLD'; financial_account_token?: string; pending_amount?: number; result?: 'APPROVED' | 'DECLINED'; user_defined_id?: string; }`\n\n**post** `/v1/holds/{hold_token}/void`\n\nVoid an active hold. This returns the held funds from pending back to\navailable balance. Only holds in PENDING status can be voided.\n\n\n### Parameters\n\n- `hold_token: string`\n\n- `memo?: string`\n  Reason for voiding the hold\n\n### Returns\n\n- `{ token: string; created: string; status: 'PENDING' | 'SETTLED' | 'EXPIRED' | 'VOIDED' | 'DECLINED' | 'REVERSED' | 'CANCELED' | 'RETURNED'; updated: string; currency?: string; events?: { token: string; amount: number; created: string; detailed_results: 'APPROVED' | 'INSUFFICIENT_FUNDS'[]; memo: string; result: 'APPROVED' | 'DECLINED'; settling_transaction_token: string; type: 'HOLD_INITIATED' | 'HOLD_VOIDED' | 'HOLD_EXPIRED' | 'HOLD_SETTLED'; }[]; expiration_datetime?: string; family?: 'HOLD'; financial_account_token?: string; pending_amount?: number; result?: 'APPROVED' | 'DECLINED'; user_defined_id?: string; }`\n  A hold transaction representing reserved funds on a financial account. Holds move funds from available to pending balance in anticipation of future payments. They can be resolved via settlement (linked to payment), manual release, or expiration.\n\n  - `token: string`\n  - `created: string`\n  - `status: 'PENDING' | 'SETTLED' | 'EXPIRED' | 'VOIDED' | 'DECLINED' | 'REVERSED' | 'CANCELED' | 'RETURNED'`\n  - `updated: string`\n  - `currency?: string`\n  - `events?: { token: string; amount: number; created: string; detailed_results: 'APPROVED' | 'INSUFFICIENT_FUNDS'[]; memo: string; result: 'APPROVED' | 'DECLINED'; settling_transaction_token: string; type: 'HOLD_INITIATED' | 'HOLD_VOIDED' | 'HOLD_EXPIRED' | 'HOLD_SETTLED'; }[]`\n  - `expiration_datetime?: string`\n  - `family?: 'HOLD'`\n  - `financial_account_token?: string`\n  - `pending_amount?: number`\n  - `result?: 'APPROVED' | 'DECLINED'`\n  - `user_defined_id?: string`\n\n### Example\n\n```typescript\nimport Lithic from 'lithic';\n\nconst client = new Lithic();\n\nconst hold = await client.holds.void('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e');\n\nconsole.log(hold);\n```",
  },
  {
    name: 'list',
    endpoint: '/v1/account_activity',
    httpMethod: 'get',
    summary: 'List Account Activity',
    description: 'Retrieve a list of transactions across all public accounts.',
    stainlessPath: '(resource) account_activity > (method) list',
    qualified: 'client.accountActivity.list',
    params: [
      'account_token?: string;',
      'begin?: string;',
      'business_account_token?: string;',
      'category?: string;',
      'end?: string;',
      'ending_before?: string;',
      'financial_account_token?: string;',
      'page_size?: number;',
      "result?: 'APPROVED' | 'DECLINED';",
      'starting_after?: string;',
      "status?: 'DECLINED' | 'EXPIRED' | 'PENDING' | 'RETURNED' | 'REVERSED' | 'SETTLED' | 'VOIDED';",
    ],
    response:
      "{ token: string; category: string; created: string; currency: string; descriptor: string; events: financial_event[]; family: 'INTERNAL'; financial_account_token: string; pending_amount: number; result: 'APPROVED' | 'DECLINED'; settled_amount: number; status: 'PENDING' | 'SETTLED' | 'DECLINED' | 'REVERSED' | 'CANCELED' | 'RETURNED'; updated: string; } | object | object | object | object | object | object",
    markdown:
      "## list\n\n`client.accountActivity.list(account_token?: string, begin?: string, business_account_token?: string, category?: string, end?: string, ending_before?: string, financial_account_token?: string, page_size?: number, result?: 'APPROVED' | 'DECLINED', starting_after?: string, status?: 'DECLINED' | 'EXPIRED' | 'PENDING' | 'RETURNED' | 'REVERSED' | 'SETTLED' | 'VOIDED'): { token: string; category: string; created: string; currency: string; descriptor: string; events: financial_event[]; family: 'INTERNAL'; financial_account_token: string; pending_amount: number; result: 'APPROVED' | 'DECLINED'; settled_amount: number; status: 'PENDING' | 'SETTLED' | 'DECLINED' | 'REVERSED' | 'CANCELED' | 'RETURNED'; updated: string; } | object | object | object | object | object | object`\n\n**get** `/v1/account_activity`\n\nRetrieve a list of transactions across all public accounts.\n\n### Parameters\n\n- `account_token?: string`\n  Filter by account token\n\n- `begin?: string`\n  Date string in RFC 3339 format. Only entries created after the specified time will be included. UTC time zone.\n\n- `business_account_token?: string`\n  Filter by business account token\n\n- `category?: string`\n  Filter by transaction category\n\n- `end?: string`\n  Date string in RFC 3339 format. Only entries created before the specified time will be included. UTC time zone.\n\n- `ending_before?: string`\n  A cursor representing an item's token before which a page of results should end. Used to retrieve the previous page of results before this item.\n\n- `financial_account_token?: string`\n  Filter by financial account token\n\n- `page_size?: number`\n  Page size (for pagination).\n\n- `result?: 'APPROVED' | 'DECLINED'`\n  Filter by transaction result\n\n- `starting_after?: string`\n  A cursor representing an item's token after which a page of results should begin. Used to retrieve the next page of results after this item.\n\n- `status?: 'DECLINED' | 'EXPIRED' | 'PENDING' | 'RETURNED' | 'REVERSED' | 'SETTLED' | 'VOIDED'`\n  Filter by transaction status\n\n### Returns\n\n- `{ token: string; category: string; created: string; currency: string; descriptor: string; events: { token?: string; amount?: number; created?: string; result?: 'APPROVED' | 'DECLINED'; type?: string; }[]; family: 'INTERNAL'; financial_account_token: string; pending_amount: number; result: 'APPROVED' | 'DECLINED'; settled_amount: number; status: 'PENDING' | 'SETTLED' | 'DECLINED' | 'REVERSED' | 'CANCELED' | 'RETURNED'; updated: string; } | { token: string; category: string; created: string; currency: string; events: { token: string; amount: number; created: string; detailed_results: 'APPROVED' | 'FUNDS_INSUFFICIENT'[]; memo: string; result: 'APPROVED' | 'DECLINED'; subtype: string; type: string; }[]; family: 'TRANSFER'; from_financial_account_token: string; pending_amount: number; result: 'APPROVED' | 'DECLINED'; settled_amount: number; status: 'PENDING' | 'SETTLED' | 'DECLINED' | 'REVERSED' | 'CANCELED' | 'RETURNED'; to_financial_account_token: string; updated: string; external_id?: string; external_resource?: object; transaction_series?: { related_transaction_event_token: string; related_transaction_token: string; type: string; }; } | { token: string; account_token: string; acquirer_fee: number; acquirer_reference_number: string; amount: number; amounts: { cardholder: object; hold: object; merchant: object; settlement: object; }; authorization_amount: number; authorization_code: string; avs: { address: string; zipcode: string; }; card_token: string; cardholder_authentication: object; created: string; financial_account_token: string; merchant: object; merchant_amount: number; merchant_authorization_amount: number; merchant_currency: string; network: 'AMEX' | 'INTERLINK' | 'MAESTRO' | 'MASTERCARD' | 'UNKNOWN' | 'VISA'; network_risk_score: number; pos: { entry_mode: object; terminal: object; }; result: string; service_location: { city: string; country: string; postal_code: string; state: string; street_address: string; }; settled_amount: number; status: 'DECLINED' | 'EXPIRED' | 'PENDING' | 'SETTLED' | 'VOIDED'; tags: object; token_info: object; updated: string; events?: { token: string; amount: number; amounts: object; created: string; detailed_results: string[]; effective_polarity: 'CREDIT' | 'DEBIT'; network_info: object; result: string; rule_results: object[]; type: string; account_type?: 'CHECKING' | 'SAVINGS'; network_specific_data?: object; }[]; } | { token: string; category: string; created: string; descriptor: string; direction: 'CREDIT' | 'DEBIT'; events: { token: string; amount: number; created: string; result: 'APPROVED' | 'DECLINED'; type: string; detailed_results?: string[]; external_id?: string; }[]; family: 'PAYMENT'; financial_account_token: string; method: 'ACH_NEXT_DAY' | 'ACH_SAME_DAY' | 'WIRE'; method_attributes: { sec_code: 'CCD' | 'PPD' | 'WEB' | 'TEL' | 'CIE' | 'CTX'; ach_hold_period?: number; addenda?: string; company_id?: string; override_company_name?: string; receipt_routing_number?: string; retries?: number; return_reason_code?: string; trace_numbers?: string[]; } | { wire_message_type: string; wire_network: 'FEDWIRE' | 'SWIFT'; creditor?: wire_party_details; debtor?: wire_party_details; message_id?: string; remittance_information?: string; }; pending_amount: number; related_account_tokens: { account_token: string; business_account_token: string; }; result: 'APPROVED' | 'DECLINED'; settled_amount: number; source: 'LITHIC' | 'EXTERNAL' | 'CUSTOMER'; status: 'PENDING' | 'SETTLED' | 'DECLINED' | 'REVERSED' | 'CANCELED' | 'RETURNED'; updated: string; currency?: string; expected_release_date?: string; external_bank_account_token?: string; type?: string; user_defined_id?: string; } | { token: string; created: string; status: 'PENDING' | 'SETTLED' | 'DECLINED' | 'REVERSED' | 'CANCELED' | 'RETURNED'; updated: string; category?: string; currency?: string; events?: { token: string; amount: number; created: string; detailed_results: 'APPROVED' | 'INSUFFICIENT_FUNDS'[]; effective_date: string; memo: string; result: 'APPROVED' | 'DECLINED'; type: string; }[]; family?: 'EXTERNAL_PAYMENT'; financial_account_token?: string; payment_type?: 'DEPOSIT' | 'WITHDRAWAL'; pending_amount?: number; result?: 'APPROVED' | 'DECLINED'; settled_amount?: number; user_defined_id?: string; } | { token: string; created: string; status: 'PENDING' | 'SETTLED' | 'DECLINED' | 'REVERSED' | 'CANCELED' | 'RETURNED'; updated: string; category?: string; currency?: string; direction?: 'CREDIT' | 'DEBIT'; events?: { token: string; amount: number; created: string; detailed_results: 'APPROVED' | 'INSUFFICIENT_FUNDS'[]; effective_date: string; memo: string; result: 'APPROVED' | 'DECLINED'; type: string; subtype?: string; }[]; external_resource?: object; family?: 'MANAGEMENT_OPERATION'; financial_account_token?: string; pending_amount?: number; result?: 'APPROVED' | 'DECLINED'; settled_amount?: number; transaction_series?: { related_transaction_event_token: string; related_transaction_token: string; type: string; }; user_defined_id?: string; } | { token: string; created: string; status: 'PENDING' | 'SETTLED' | 'EXPIRED' | 'VOIDED' | 'DECLINED' | 'REVERSED' | 'CANCELED' | 'RETURNED'; updated: string; currency?: string; events?: object[]; expiration_datetime?: string; family?: 'HOLD'; financial_account_token?: string; pending_amount?: number; result?: 'APPROVED' | 'DECLINED'; user_defined_id?: string; }`\n  Response containing multiple transaction types. The `family` field determines which transaction type is returned: INTERNAL returns FinancialTransaction, TRANSFER returns BookTransferTransaction, CARD returns CardTransaction, PAYMENT returns PaymentTransaction, EXTERNAL_PAYMENT returns ExternalPaymentResponse, MANAGEMENT_OPERATION returns ManagementOperationTransaction, and HOLD returns HoldTransaction\n\n### Example\n\n```typescript\nimport Lithic from 'lithic';\n\nconst client = new Lithic();\n\n// Automatically fetches more pages as needed.\nfor await (const accountActivityListResponse of client.accountActivity.list()) {\n  console.log(accountActivityListResponse);\n}\n```",
  },
  {
    name: 'retrieve_transaction',
    endpoint: '/v1/account_activity/{transaction_token}',
    httpMethod: 'get',
    summary: 'Get Single Transaction from Account Activity',
    description: 'Retrieve a single transaction',
    stainlessPath: '(resource) account_activity > (method) retrieve_transaction',
    qualified: 'client.accountActivity.retrieveTransaction',
    params: ['transaction_token: string;'],
    response:
      "{ token: string; category: string; created: string; currency: string; descriptor: string; events: financial_event[]; family: 'INTERNAL'; financial_account_token: string; pending_amount: number; result: 'APPROVED' | 'DECLINED'; settled_amount: number; status: 'PENDING' | 'SETTLED' | 'DECLINED' | 'REVERSED' | 'CANCELED' | 'RETURNED'; updated: string; } | object | object | object | object | object | object",
    markdown:
      "## retrieve_transaction\n\n`client.accountActivity.retrieveTransaction(transaction_token: string): { token: string; category: string; created: string; currency: string; descriptor: string; events: financial_event[]; family: 'INTERNAL'; financial_account_token: string; pending_amount: number; result: 'APPROVED' | 'DECLINED'; settled_amount: number; status: 'PENDING' | 'SETTLED' | 'DECLINED' | 'REVERSED' | 'CANCELED' | 'RETURNED'; updated: string; } | object | object | object | object | object | object`\n\n**get** `/v1/account_activity/{transaction_token}`\n\nRetrieve a single transaction\n\n### Parameters\n\n- `transaction_token: string`\n\n### Returns\n\n- `{ token: string; category: string; created: string; currency: string; descriptor: string; events: { token?: string; amount?: number; created?: string; result?: 'APPROVED' | 'DECLINED'; type?: string; }[]; family: 'INTERNAL'; financial_account_token: string; pending_amount: number; result: 'APPROVED' | 'DECLINED'; settled_amount: number; status: 'PENDING' | 'SETTLED' | 'DECLINED' | 'REVERSED' | 'CANCELED' | 'RETURNED'; updated: string; } | { token: string; category: string; created: string; currency: string; events: { token: string; amount: number; created: string; detailed_results: 'APPROVED' | 'FUNDS_INSUFFICIENT'[]; memo: string; result: 'APPROVED' | 'DECLINED'; subtype: string; type: string; }[]; family: 'TRANSFER'; from_financial_account_token: string; pending_amount: number; result: 'APPROVED' | 'DECLINED'; settled_amount: number; status: 'PENDING' | 'SETTLED' | 'DECLINED' | 'REVERSED' | 'CANCELED' | 'RETURNED'; to_financial_account_token: string; updated: string; external_id?: string; external_resource?: object; transaction_series?: { related_transaction_event_token: string; related_transaction_token: string; type: string; }; } | { token: string; account_token: string; acquirer_fee: number; acquirer_reference_number: string; amount: number; amounts: { cardholder: object; hold: object; merchant: object; settlement: object; }; authorization_amount: number; authorization_code: string; avs: { address: string; zipcode: string; }; card_token: string; cardholder_authentication: object; created: string; financial_account_token: string; merchant: object; merchant_amount: number; merchant_authorization_amount: number; merchant_currency: string; network: 'AMEX' | 'INTERLINK' | 'MAESTRO' | 'MASTERCARD' | 'UNKNOWN' | 'VISA'; network_risk_score: number; pos: { entry_mode: object; terminal: object; }; result: string; service_location: { city: string; country: string; postal_code: string; state: string; street_address: string; }; settled_amount: number; status: 'DECLINED' | 'EXPIRED' | 'PENDING' | 'SETTLED' | 'VOIDED'; tags: object; token_info: object; updated: string; events?: { token: string; amount: number; amounts: object; created: string; detailed_results: string[]; effective_polarity: 'CREDIT' | 'DEBIT'; network_info: object; result: string; rule_results: object[]; type: string; account_type?: 'CHECKING' | 'SAVINGS'; network_specific_data?: object; }[]; } | { token: string; category: string; created: string; descriptor: string; direction: 'CREDIT' | 'DEBIT'; events: { token: string; amount: number; created: string; result: 'APPROVED' | 'DECLINED'; type: string; detailed_results?: string[]; external_id?: string; }[]; family: 'PAYMENT'; financial_account_token: string; method: 'ACH_NEXT_DAY' | 'ACH_SAME_DAY' | 'WIRE'; method_attributes: { sec_code: 'CCD' | 'PPD' | 'WEB' | 'TEL' | 'CIE' | 'CTX'; ach_hold_period?: number; addenda?: string; company_id?: string; override_company_name?: string; receipt_routing_number?: string; retries?: number; return_reason_code?: string; trace_numbers?: string[]; } | { wire_message_type: string; wire_network: 'FEDWIRE' | 'SWIFT'; creditor?: wire_party_details; debtor?: wire_party_details; message_id?: string; remittance_information?: string; }; pending_amount: number; related_account_tokens: { account_token: string; business_account_token: string; }; result: 'APPROVED' | 'DECLINED'; settled_amount: number; source: 'LITHIC' | 'EXTERNAL' | 'CUSTOMER'; status: 'PENDING' | 'SETTLED' | 'DECLINED' | 'REVERSED' | 'CANCELED' | 'RETURNED'; updated: string; currency?: string; expected_release_date?: string; external_bank_account_token?: string; type?: string; user_defined_id?: string; } | { token: string; created: string; status: 'PENDING' | 'SETTLED' | 'DECLINED' | 'REVERSED' | 'CANCELED' | 'RETURNED'; updated: string; category?: string; currency?: string; events?: { token: string; amount: number; created: string; detailed_results: 'APPROVED' | 'INSUFFICIENT_FUNDS'[]; effective_date: string; memo: string; result: 'APPROVED' | 'DECLINED'; type: string; }[]; family?: 'EXTERNAL_PAYMENT'; financial_account_token?: string; payment_type?: 'DEPOSIT' | 'WITHDRAWAL'; pending_amount?: number; result?: 'APPROVED' | 'DECLINED'; settled_amount?: number; user_defined_id?: string; } | { token: string; created: string; status: 'PENDING' | 'SETTLED' | 'DECLINED' | 'REVERSED' | 'CANCELED' | 'RETURNED'; updated: string; category?: string; currency?: string; direction?: 'CREDIT' | 'DEBIT'; events?: { token: string; amount: number; created: string; detailed_results: 'APPROVED' | 'INSUFFICIENT_FUNDS'[]; effective_date: string; memo: string; result: 'APPROVED' | 'DECLINED'; type: string; subtype?: string; }[]; external_resource?: object; family?: 'MANAGEMENT_OPERATION'; financial_account_token?: string; pending_amount?: number; result?: 'APPROVED' | 'DECLINED'; settled_amount?: number; transaction_series?: { related_transaction_event_token: string; related_transaction_token: string; type: string; }; user_defined_id?: string; } | { token: string; created: string; status: 'PENDING' | 'SETTLED' | 'EXPIRED' | 'VOIDED' | 'DECLINED' | 'REVERSED' | 'CANCELED' | 'RETURNED'; updated: string; currency?: string; events?: object[]; expiration_datetime?: string; family?: 'HOLD'; financial_account_token?: string; pending_amount?: number; result?: 'APPROVED' | 'DECLINED'; user_defined_id?: string; }`\n  Response containing multiple transaction types. The `family` field determines which transaction type is returned: INTERNAL returns FinancialTransaction, TRANSFER returns BookTransferTransaction, CARD returns CardTransaction, PAYMENT returns PaymentTransaction, EXTERNAL_PAYMENT returns ExternalPaymentResponse, MANAGEMENT_OPERATION returns ManagementOperationTransaction, and HOLD returns HoldTransaction\n\n### Example\n\n```typescript\nimport Lithic from 'lithic';\n\nconst client = new Lithic();\n\nconst response = await client.accountActivity.retrieveTransaction('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e');\n\nconsole.log(response);\n```",
  },
  {
    name: 'list',
    endpoint: '/v1/transfer_limits',
    httpMethod: 'get',
    summary: 'Get transfer limits',
    description: 'Get transfer limits for a specified date',
    stainlessPath: '(resource) transfer_limits > (method) list',
    qualified: 'client.transferLimits.list',
    params: ['date?: string;'],
    response:
      '{ company_id: string; daily_limit: { credit: { limit: number; amount_originated?: number; }; debit: { limit: number; amount_originated?: number; }; }; date: string; is_fbo: boolean; monthly_limit: { credit: { limit: number; amount_originated?: number; }; debit: { limit: number; amount_originated?: number; }; }; program_limit_per_transaction: { credit: { limit: number; amount_originated?: number; }; debit: { limit: number; amount_originated?: number; }; }; }',
    markdown:
      "## list\n\n`client.transferLimits.list(date?: string): { company_id: string; daily_limit: { credit: object; debit: object; }; date: string; is_fbo: boolean; monthly_limit: { credit: object; debit: object; }; program_limit_per_transaction: { credit: object; debit: object; }; }`\n\n**get** `/v1/transfer_limits`\n\nGet transfer limits for a specified date\n\n### Parameters\n\n- `date?: string`\n  Date for which to retrieve transfer limits (ISO 8601 format)\n\n### Returns\n\n- `{ company_id: string; daily_limit: { credit: { limit: number; amount_originated?: number; }; debit: { limit: number; amount_originated?: number; }; }; date: string; is_fbo: boolean; monthly_limit: { credit: { limit: number; amount_originated?: number; }; debit: { limit: number; amount_originated?: number; }; }; program_limit_per_transaction: { credit: { limit: number; amount_originated?: number; }; debit: { limit: number; amount_originated?: number; }; }; }`\n\n  - `company_id: string`\n  - `daily_limit: { credit: { limit: number; amount_originated?: number; }; debit: { limit: number; amount_originated?: number; }; }`\n  - `date: string`\n  - `is_fbo: boolean`\n  - `monthly_limit: { credit: { limit: number; amount_originated?: number; }; debit: { limit: number; amount_originated?: number; }; }`\n  - `program_limit_per_transaction: { credit: { limit: number; amount_originated?: number; }; debit: { limit: number; amount_originated?: number; }; }`\n\n### Example\n\n```typescript\nimport Lithic from 'lithic';\n\nconst client = new Lithic();\n\n// Automatically fetches more pages as needed.\nfor await (const transferLimit of client.transferLimits.list()) {\n  console.log(transferLimit);\n}\n```",
  },
];

const EMBEDDED_READMES: { language: string; content: string }[] = [];

const INDEX_OPTIONS = {
  fields: [
    'name',
    'endpoint',
    'summary',
    'description',
    'qualified',
    'stainlessPath',
    'content',
    'sectionContext',
  ],
  storeFields: ['kind', '_original'],
  searchOptions: {
    prefix: true,
    fuzzy: 0.1,
    boost: {
      name: 5,
      stainlessPath: 3,
      endpoint: 3,
      qualified: 3,
      summary: 2,
      content: 1,
      description: 1,
    } as Record<string, number>,
  },
};

/**
 * Self-contained local search engine backed by MiniSearch.
 * Method data is embedded at SDK build time; prose documents
 * can be loaded from an optional docs directory at runtime.
 */
export class LocalDocsSearch {
  private methodIndex: MiniSearch<MiniSearchDocument>;
  private proseIndex: MiniSearch<MiniSearchDocument>;

  private constructor() {
    this.methodIndex = new MiniSearch<MiniSearchDocument>(INDEX_OPTIONS);
    this.proseIndex = new MiniSearch<MiniSearchDocument>(INDEX_OPTIONS);
  }

  static async create(opts?: { docsDir?: string }): Promise<LocalDocsSearch> {
    const instance = new LocalDocsSearch();
    instance.indexMethods(EMBEDDED_METHODS);
    for (const readme of EMBEDDED_READMES) {
      instance.indexProse(readme.content, `readme:${readme.language}`);
    }
    if (opts?.docsDir) {
      await instance.loadDocsDirectory(opts.docsDir);
    }
    return instance;
  }

  search(props: {
    query: string;
    language?: string;
    detail?: string;
    maxResults?: number;
    maxLength?: number;
  }): SearchResult {
    const { query, language = 'typescript', detail = 'default', maxResults = 5, maxLength = 100_000 } = props;

    const useMarkdown = detail === 'verbose' || detail === 'high';

    // Search both indices and merge results by score.
    // Filter prose hits so language-tagged content (READMEs and docs with
    // frontmatter) only matches the requested language.
    const methodHits = this.methodIndex
      .search(query)
      .map((hit) => ({ ...hit, _kind: 'http_method' as const }));
    const proseHits = this.proseIndex
      .search(query)
      .filter((hit) => {
        const source = ((hit as Record<string, unknown>)['_original'] as ProseChunk | undefined)?.source;
        if (!source) return true;
        // Check for language-tagged sources: "readme:<lang>" or "lang:<lang>:<filename>"
        let taggedLang: string | undefined;
        if (source.startsWith('readme:')) taggedLang = source.slice('readme:'.length);
        else if (source.startsWith('lang:')) taggedLang = source.split(':')[1];
        if (!taggedLang) return true;
        return taggedLang === language || (language === 'javascript' && taggedLang === 'typescript');
      })
      .map((hit) => ({ ...hit, _kind: 'prose' as const }));
    const merged = [...methodHits, ...proseHits].sort((a, b) => b.score - a.score);
    const top = merged.slice(0, maxResults);

    const fullResults: (string | Record<string, unknown>)[] = [];

    for (const hit of top) {
      const original = (hit as Record<string, unknown>)['_original'];
      if (hit._kind === 'http_method') {
        const m = original as MethodEntry;
        if (useMarkdown && m.markdown) {
          fullResults.push(m.markdown);
        } else {
          // Use per-language data when available, falling back to the
          // top-level fields (which are TypeScript-specific in the
          // legacy codepath).
          const langData = m.perLanguage?.[language];
          fullResults.push({
            method: langData?.method ?? m.qualified,
            summary: m.summary,
            description: m.description,
            endpoint: `${m.httpMethod.toUpperCase()} ${m.endpoint}`,
            ...(langData?.example ? { example: langData.example } : {}),
            ...(m.params ? { params: m.params } : {}),
            ...(m.response ? { response: m.response } : {}),
          });
        }
      } else {
        const c = original as ProseChunk;
        fullResults.push({
          content: c.content,
          ...(c.source ? { source: c.source } : {}),
        });
      }
    }

    let totalLength = 0;
    const results: (string | Record<string, unknown>)[] = [];
    for (const result of fullResults) {
      const len = typeof result === 'string' ? result.length : JSON.stringify(result).length;
      totalLength += len;
      if (totalLength > maxLength) break;
      results.push(result);
    }

    if (results.length < fullResults.length) {
      results.unshift(`Truncated; showing ${results.length} of ${fullResults.length} results.`);
    }

    return { results };
  }

  private indexMethods(methods: MethodEntry[]): void {
    const docs: MiniSearchDocument[] = methods.map((m, i) => ({
      id: `method-${i}`,
      kind: 'http_method' as const,
      name: m.name,
      endpoint: m.endpoint,
      summary: m.summary,
      description: m.description,
      qualified: m.qualified,
      stainlessPath: m.stainlessPath,
      _original: m as unknown as Record<string, unknown>,
    }));
    if (docs.length > 0) {
      this.methodIndex.addAll(docs);
    }
  }

  private async loadDocsDirectory(docsDir: string): Promise<void> {
    let entries;
    try {
      entries = await fs.readdir(docsDir, { withFileTypes: true });
    } catch (err) {
      getLogger().warn({ err, docsDir }, 'Could not read docs directory');
      return;
    }

    const files = entries
      .filter((e) => e.isFile())
      .filter((e) => e.name.endsWith('.md') || e.name.endsWith('.markdown') || e.name.endsWith('.json'));

    for (const file of files) {
      try {
        const filePath = path.join(docsDir, file.name);
        const content = await fs.readFile(filePath, 'utf-8');

        if (file.name.endsWith('.json')) {
          const texts = extractTexts(JSON.parse(content));
          if (texts.length > 0) {
            this.indexProse(texts.join('\n\n'), file.name);
          }
        } else {
          // Parse optional YAML frontmatter for language tagging.
          // Files with a "language" field in frontmatter will only
          // surface in searches for that language.
          //
          // Example:
          //   ---
          //   language: python
          //   ---
          //   # Error handling in Python
          //   ...
          const frontmatter = parseFrontmatter(content);
          const source = frontmatter.language ? `lang:${frontmatter.language}:${file.name}` : file.name;
          this.indexProse(content, source);
        }
      } catch (err) {
        getLogger().warn({ err, file: file.name }, 'Failed to index docs file');
      }
    }
  }

  private indexProse(markdown: string, source: string): void {
    const chunks = chunkMarkdown(markdown);
    const baseId = this.proseIndex.documentCount;

    const docs: MiniSearchDocument[] = chunks.map((chunk, i) => ({
      id: `prose-${baseId + i}`,
      kind: 'prose' as const,
      content: chunk.content,
      ...(chunk.sectionContext != null ? { sectionContext: chunk.sectionContext } : {}),
      _original: { ...chunk, source } as unknown as Record<string, unknown>,
    }));

    if (docs.length > 0) {
      this.proseIndex.addAll(docs);
    }
  }
}

/** Lightweight markdown chunker — splits on headers, chunks by word count. */
function chunkMarkdown(markdown: string): { content: string; tag: string; sectionContext?: string }[] {
  // Strip YAML frontmatter
  const stripped = markdown.replace(/^---\n[\s\S]*?\n---\n?/, '');
  const lines = stripped.split('\n');

  const chunks: { content: string; tag: string; sectionContext?: string }[] = [];
  const headers: string[] = [];
  let current: string[] = [];

  const flush = () => {
    const text = current.join('\n').trim();
    if (!text) return;
    const sectionContext = headers.length > 0 ? headers.join(' > ') : undefined;
    // Split into ~200-word chunks
    const words = text.split(/\s+/);
    for (let i = 0; i < words.length; i += 200) {
      const slice = words.slice(i, i + 200).join(' ');
      if (slice) {
        chunks.push({ content: slice, tag: 'p', ...(sectionContext != null ? { sectionContext } : {}) });
      }
    }
    current = [];
  };

  for (const line of lines) {
    const headerMatch = line.match(/^(#{1,6})\s+(.+)/);
    if (headerMatch) {
      flush();
      const level = headerMatch[1]!.length;
      const text = headerMatch[2]!.trim();
      while (headers.length >= level) headers.pop();
      headers.push(text);
    } else {
      current.push(line);
    }
  }
  flush();

  return chunks;
}

/** Recursively extracts string values from a JSON structure. */
function extractTexts(data: unknown, depth = 0): string[] {
  if (depth > 10) return [];
  if (typeof data === 'string') return data.trim() ? [data] : [];
  if (Array.isArray(data)) return data.flatMap((item) => extractTexts(item, depth + 1));
  if (typeof data === 'object' && data !== null) {
    return Object.values(data).flatMap((v) => extractTexts(v, depth + 1));
  }
  return [];
}

/** Parses YAML frontmatter from a markdown string, extracting the language field if present. */
function parseFrontmatter(markdown: string): { language?: string } {
  const match = markdown.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return {};
  const body = match[1] ?? '';
  const langMatch = body.match(/^language:\s*(.+)$/m);
  return langMatch ? { language: langMatch[1]!.trim() } : {};
}
