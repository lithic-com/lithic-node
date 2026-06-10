// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as QueuesAPI from './queues';
import {
  Queue,
  QueueCreateParams,
  QueueListParams,
  QueueUpdateParams,
  Queues,
  QueuesCursorPage,
} from './queues';
import * as CasesAPI from './cases/cases';
import {
  CaseActivityEntriesCursorPage,
  CaseActivityEntry,
  CaseActivityType,
  CaseCard,
  CaseEntity,
  CaseListActivityParams,
  CaseListParams,
  CaseListTransactionsParams,
  CasePriority,
  CaseRetrieveCardsResponse,
  CaseSortOrder,
  CaseStatus,
  CaseTransaction,
  CaseTransactionsCursorPage,
  CaseUpdateParams,
  Cases,
  EntityType,
  MonitoringCase,
  MonitoringCasesCursorPage,
  ResolutionOutcome,
} from './cases/cases';

export class TransactionMonitoring extends APIResource {
  cases: CasesAPI.Cases = new CasesAPI.Cases(this._client);
  queues: QueuesAPI.Queues = new QueuesAPI.Queues(this._client);
}

TransactionMonitoring.Cases = Cases;
TransactionMonitoring.Queues = Queues;

export declare namespace TransactionMonitoring {
  export {
    Cases as Cases,
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
    Queues as Queues,
    type Queue as Queue,
    type QueuesCursorPage as QueuesCursorPage,
    type QueueCreateParams as QueueCreateParams,
    type QueueUpdateParams as QueueUpdateParams,
    type QueueListParams as QueueListParams,
  };
}
