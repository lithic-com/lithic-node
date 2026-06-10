// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import * as CommentsAPI from './comments';
import { CommentCreateParams, CommentDeleteParams, CommentUpdateParams, Comments } from './comments';
import * as FilesAPI from './files';
import {
  CaseFile,
  CaseFilesCursorPage,
  FileCreateParams,
  FileDeleteParams,
  FileListParams,
  FileRetrieveParams,
  FileStatus,
  Files,
  UploadConstraints,
} from './files';
import { APIPromise } from '../../../core/api-promise';
import { CursorPage, type CursorPageParams, PagePromise } from '../../../core/pagination';
import { RequestOptions } from '../../../internal/request-options';
import { path } from '../../../internal/utils/path';

export class Cases extends APIResource {
  comments: CommentsAPI.Comments = new CommentsAPI.Comments(this._client);
  files: FilesAPI.Files = new FilesAPI.Files(this._client);

  /**
   * Retrieves a single transaction monitoring case.
   */
  retrieve(caseToken: string, options?: RequestOptions): APIPromise<MonitoringCase> {
    return this._client.get(path`/v1/transaction_monitoring/cases/${caseToken}`, options);
  }

  /**
   * Updates a transaction monitoring case.
   */
  update(caseToken: string, body: CaseUpdateParams, options?: RequestOptions): APIPromise<MonitoringCase> {
    return this._client.patch(path`/v1/transaction_monitoring/cases/${caseToken}`, { body, ...options });
  }

  /**
   * Lists transaction monitoring cases, optionally filtered.
   */
  list(
    query: CaseListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<MonitoringCasesCursorPage, MonitoringCase> {
    return this._client.getAPIList('/v1/transaction_monitoring/cases', CursorPage<MonitoringCase>, {
      query,
      ...options,
    });
  }

  /**
   * Lists the activity feed for a case.
   */
  listActivity(
    caseToken: string,
    query: CaseListActivityParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<CaseActivityEntriesCursorPage, CaseActivityEntry> {
    return this._client.getAPIList(
      path`/v1/transaction_monitoring/cases/${caseToken}/activity`,
      CursorPage<CaseActivityEntry>,
      { query, ...options },
    );
  }

  /**
   * Lists the transactions associated with a case.
   */
  listTransactions(
    caseToken: string,
    query: CaseListTransactionsParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<CaseTransactionsCursorPage, CaseTransaction> {
    return this._client.getAPIList(
      path`/v1/transaction_monitoring/cases/${caseToken}/transactions`,
      CursorPage<CaseTransaction>,
      { query, ...options },
    );
  }

  /**
   * Lists the cards involved in a case, with per-card transaction counts.
   */
  retrieveCards(caseToken: string, options?: RequestOptions): APIPromise<CaseRetrieveCardsResponse> {
    return this._client.get(path`/v1/transaction_monitoring/cases/${caseToken}/cards`, options);
  }
}

export type MonitoringCasesCursorPage = CursorPage<MonitoringCase>;

export type CaseActivityEntriesCursorPage = CursorPage<CaseActivityEntry>;

export type CaseTransactionsCursorPage = CursorPage<CaseTransaction>;

/**
 * A single entry in a case's activity feed
 */
export interface CaseActivityEntry {
  /**
   * Globally unique identifier for the activity entry
   */
  token: string;

  /**
   * Identifier of the actor that produced the activity entry
   */
  actor_token: string | null;

  /**
   * Date and time at which the activity entry was created
   */
  created: string;

  /**
   * The case field that changed, or the action that was taken, in an activity entry:
   *
   * - `STATUS` - The case status changed
   * - `TITLE` - The case title changed
   * - `ASSIGNED_TO` - The case assignee changed
   * - `RESOLUTION_OUTCOME` - The resolution outcome was set or changed
   * - `RESOLUTION_NOTES` - The resolution notes were set or changed
   * - `TAGS` - The case tags changed
   * - `PRIORITY` - The case priority changed
   * - `COMMENT` - A comment was added or edited
   * - `FILE` - A file was attached to the case
   */
  entry_type: CaseActivityType;

  /**
   * New value of the changed field, when applicable
   */
  new_value: string | null;

  /**
   * Previous value of the changed field, when applicable
   */
  previous_value: string | null;
}

/**
 * The case field that changed, or the action that was taken, in an activity entry:
 *
 * - `STATUS` - The case status changed
 * - `TITLE` - The case title changed
 * - `ASSIGNED_TO` - The case assignee changed
 * - `RESOLUTION_OUTCOME` - The resolution outcome was set or changed
 * - `RESOLUTION_NOTES` - The resolution notes were set or changed
 * - `TAGS` - The case tags changed
 * - `PRIORITY` - The case priority changed
 * - `COMMENT` - A comment was added or edited
 * - `FILE` - A file was attached to the case
 */
export type CaseActivityType =
  | 'STATUS'
  | 'TITLE'
  | 'ASSIGNED_TO'
  | 'RESOLUTION_OUTCOME'
  | 'RESOLUTION_NOTES'
  | 'TAGS'
  | 'PRIORITY'
  | 'COMMENT'
  | 'FILE';

/**
 * Summary of a card's involvement in a case, aggregated across the case's
 * transactions
 */
export interface CaseCard {
  /**
   * Token of the account the card belongs to
   */
  account_token: string;

  /**
   * Token of the card
   */
  card_token: string;

  /**
   * Number of the card's transactions associated with the case
   */
  transaction_count: number;
}

/**
 * The entity a case is associated with
 */
export interface CaseEntity {
  /**
   * Globally unique identifier for the associated entity
   */
  entity_token: string;

  /**
   * The type of entity a case is associated with:
   *
   * - `CARD` - The case is associated with a card
   * - `ACCOUNT` - The case is associated with an account
   */
  entity_type: 'CARD' | 'ACCOUNT';
}

/**
 * Priority level of a case, controlling queue ordering and SLA urgency
 */
export type CasePriority = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';

/**
 * Sort order for listing cases. Defaults to `CREATED_DESC` (newest first):
 *
 * - `CREATED_ASC` - Oldest first
 * - `CREATED_DESC` - Newest first
 * - `PRIORITY_DESC` - Highest priority first
 * - `PRIORITY_ASC` - Lowest priority first
 * - `STATUS_DESC` - Furthest workflow stage first
 * - `STATUS_ASC` - Earliest workflow stage first
 */
export type CaseSortOrder =
  | 'CREATED_ASC'
  | 'CREATED_DESC'
  | 'PRIORITY_DESC'
  | 'PRIORITY_ASC'
  | 'STATUS_DESC'
  | 'STATUS_ASC';

/**
 * Status of a case as it progresses through the review workflow:
 *
 * - `OPEN` - The case has been created and is still collecting matching
 *   transactions
 * - `ASSIGNED` - An analyst has been assigned and transaction collection has
 *   stopped
 * - `IN_REVIEW` - The case is actively being investigated
 * - `ESCALATED` - The case has been reviewed and requires additional oversight
 * - `RESOLVED` - A determination has been made and a resolution recorded
 * - `CLOSED` - The case is finalized
 */
export type CaseStatus = 'OPEN' | 'ASSIGNED' | 'IN_REVIEW' | 'ESCALATED' | 'RESOLVED' | 'CLOSED';

/**
 * A single transaction associated with a case
 */
export interface CaseTransaction {
  /**
   * Globally unique identifier for the transaction
   */
  token: string;

  /**
   * Token of the account the transaction belongs to
   */
  account_token: string;

  /**
   * Date and time at which the transaction was added to the case
   */
  added_at: string;

  /**
   * Token of the card the transaction was made on
   */
  card_token: string;

  /**
   * Date and time at which the transaction was created
   */
  transaction_created_at: string;
}

/**
 * The type of entity associated with an account holder
 */
export type EntityType = 'BENEFICIAL_OWNER_INDIVIDUAL' | 'CONTROL_PERSON';

/**
 * A transaction monitoring case
 */
export interface MonitoringCase {
  /**
   * Globally unique identifier for the case
   */
  token: string;

  /**
   * Identifier of the user the case is currently assigned to
   */
  assignee: string | null;

  /**
   * Date and time at which transaction collection stopped for the case
   */
  collection_stopped: string | null;

  /**
   * Date and time at which the case was created
   */
  created: string;

  /**
   * The entity a case is associated with
   */
  entity: CaseEntity | null;

  /**
   * Whether the case still has transaction scopes pending resolution
   */
  pending_transactions: boolean;

  /**
   * Priority level of a case, controlling queue ordering and SLA urgency
   */
  priority: CasePriority;

  /**
   * Token of the queue the case belongs to
   */
  queue_token: string;

  /**
   * Outcome recorded when a case is resolved:
   *
   * - `CONFIRMED_FRAUD` - The reviewed activity was confirmed to be fraudulent
   * - `SUSPICIOUS_ACTIVITY` - The activity is suspicious but not confirmed fraud
   * - `FALSE_POSITIVE` - The activity was legitimate and the alert was a false
   *   positive
   * - `NO_ACTION_REQUIRED` - No further action is required
   * - `ESCALATED_EXTERNAL` - The case was escalated to an external party
   */
  resolution: ResolutionOutcome | null;

  /**
   * Free-form notes describing the resolution
   */
  resolution_notes: string | null;

  /**
   * Date and time at which the case was resolved
   */
  resolved: string | null;

  /**
   * Token of the transaction monitoring rule that triggered the case
   */
  rule_token: string | null;

  /**
   * Deadline by which the case is expected to be resolved
   */
  sla_deadline: string | null;

  /**
   * Status of a case as it progresses through the review workflow:
   *
   * - `OPEN` - The case has been created and is still collecting matching
   *   transactions
   * - `ASSIGNED` - An analyst has been assigned and transaction collection has
   *   stopped
   * - `IN_REVIEW` - The case is actively being investigated
   * - `ESCALATED` - The case has been reviewed and requires additional oversight
   * - `RESOLVED` - A determination has been made and a resolution recorded
   * - `CLOSED` - The case is finalized
   */
  status: CaseStatus;

  /**
   * Arbitrary key-value metadata associated with the case
   */
  tags: { [key: string]: string };

  /**
   * Short, human-readable summary of the case
   */
  title: string | null;

  /**
   * Date and time at which the case was last updated
   */
  updated: string;
}

/**
 * Outcome recorded when a case is resolved:
 *
 * - `CONFIRMED_FRAUD` - The reviewed activity was confirmed to be fraudulent
 * - `SUSPICIOUS_ACTIVITY` - The activity is suspicious but not confirmed fraud
 * - `FALSE_POSITIVE` - The activity was legitimate and the alert was a false
 *   positive
 * - `NO_ACTION_REQUIRED` - No further action is required
 * - `ESCALATED_EXTERNAL` - The case was escalated to an external party
 */
export type ResolutionOutcome =
  | 'CONFIRMED_FRAUD'
  | 'SUSPICIOUS_ACTIVITY'
  | 'FALSE_POSITIVE'
  | 'NO_ACTION_REQUIRED'
  | 'ESCALATED_EXTERNAL';

export type CaseRetrieveCardsResponse = Array<CaseCard>;

export interface CaseUpdateParams {
  /**
   * Optional client-provided identifier for the actor performing this action,
   * recorded on the resulting activity entry. This value is supplied by the client
   * (for example, your own internal user ID) and is not authenticated by Lithic
   */
  actor_token?: string;

  /**
   * New assignee for the case, or `null` to unassign
   */
  assignee?: string | null;

  /**
   * Priority level of a case, controlling queue ordering and SLA urgency
   */
  priority?: CasePriority;

  /**
   * Outcome recorded when a case is resolved:
   *
   * - `CONFIRMED_FRAUD` - The reviewed activity was confirmed to be fraudulent
   * - `SUSPICIOUS_ACTIVITY` - The activity is suspicious but not confirmed fraud
   * - `FALSE_POSITIVE` - The activity was legitimate and the alert was a false
   *   positive
   * - `NO_ACTION_REQUIRED` - No further action is required
   * - `ESCALATED_EXTERNAL` - The case was escalated to an external party
   */
  resolution?: ResolutionOutcome;

  /**
   * Notes describing the resolution
   */
  resolution_notes?: string;

  /**
   * New SLA deadline for the case, or `null` to clear it
   */
  sla_deadline?: string | null;

  /**
   * Status of a case as it progresses through the review workflow:
   *
   * - `OPEN` - The case has been created and is still collecting matching
   *   transactions
   * - `ASSIGNED` - An analyst has been assigned and transaction collection has
   *   stopped
   * - `IN_REVIEW` - The case is actively being investigated
   * - `ESCALATED` - The case has been reviewed and requires additional oversight
   * - `RESOLVED` - A determination has been made and a resolution recorded
   * - `CLOSED` - The case is finalized
   */
  status?: CaseStatus;

  /**
   * Arbitrary key-value metadata to set on the case
   */
  tags?: { [key: string]: string };

  /**
   * New title for the case, or `null` to clear it
   */
  title?: string | null;
}

export interface CaseListParams extends CursorPageParams {
  /**
   * Only return cases that include transactions on the provided account.
   */
  account_token?: string;

  /**
   * Only return cases assigned to the provided value. Pass an empty string to return
   * only unassigned cases.
   */
  assignee?: string;

  /**
   * Date string in RFC 3339 format. Only entries created after the specified time
   * will be included. UTC time zone.
   */
  begin?: string;

  /**
   * Only return cases that include transactions on the provided card.
   */
  card_token?: string;

  /**
   * Date string in RFC 3339 format. Only entries created before the specified time
   * will be included. UTC time zone.
   */
  end?: string;

  /**
   * Only return cases associated with the provided entity.
   */
  entity_token?: string;

  /**
   * Only return cases belonging to the provided queue.
   */
  queue_token?: string;

  /**
   * Only return cases triggered by the provided transaction monitoring rule.
   */
  rule_token?: string;

  /**
   * Sort order for the returned cases.
   */
  sort_by?: CaseSortOrder;

  /**
   * Only return cases with the provided status.
   */
  status?: CaseStatus;

  /**
   * Only return cases that include the provided transaction.
   */
  transaction_token?: string;
}

export interface CaseListActivityParams extends CursorPageParams {}

export interface CaseListTransactionsParams extends CursorPageParams {}

Cases.Comments = Comments;
Cases.Files = Files;

export declare namespace Cases {
  export {
    type CaseActivityEntry as CaseActivityEntry,
    type CaseActivityType as CaseActivityType,
    type CaseCard as CaseCard,
    type CaseEntity as CaseEntity,
    type CasePriority as CasePriority,
    type CaseSortOrder as CaseSortOrder,
    type CaseStatus as CaseStatus,
    type CaseTransaction as CaseTransaction,
    type EntityType as EntityType,
    type MonitoringCase as MonitoringCase,
    type ResolutionOutcome as ResolutionOutcome,
    type CaseRetrieveCardsResponse as CaseRetrieveCardsResponse,
    type MonitoringCasesCursorPage as MonitoringCasesCursorPage,
    type CaseActivityEntriesCursorPage as CaseActivityEntriesCursorPage,
    type CaseTransactionsCursorPage as CaseTransactionsCursorPage,
    type CaseUpdateParams as CaseUpdateParams,
    type CaseListParams as CaseListParams,
    type CaseListActivityParams as CaseListActivityParams,
    type CaseListTransactionsParams as CaseListTransactionsParams,
  };

  export {
    Comments as Comments,
    type CommentCreateParams as CommentCreateParams,
    type CommentUpdateParams as CommentUpdateParams,
    type CommentDeleteParams as CommentDeleteParams,
  };

  export {
    Files as Files,
    type CaseFile as CaseFile,
    type FileStatus as FileStatus,
    type UploadConstraints as UploadConstraints,
    type CaseFilesCursorPage as CaseFilesCursorPage,
    type FileCreateParams as FileCreateParams,
    type FileRetrieveParams as FileRetrieveParams,
    type FileListParams as FileListParams,
    type FileDeleteParams as FileDeleteParams,
  };
}
