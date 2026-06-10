// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { CursorPage, type CursorPageParams, PagePromise } from '../../core/pagination';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Queues extends APIResource {
  /**
   * Creates a new queue for grouping transaction monitoring cases.
   */
  create(body: QueueCreateParams, options?: RequestOptions): APIPromise<Queue> {
    return this._client.post('/v1/transaction_monitoring/queues', { body, ...options });
  }

  /**
   * Retrieves a single transaction monitoring queue.
   */
  retrieve(queueToken: string, options?: RequestOptions): APIPromise<Queue> {
    return this._client.get(path`/v1/transaction_monitoring/queues/${queueToken}`, options);
  }

  /**
   * Updates a transaction monitoring queue.
   */
  update(queueToken: string, body: QueueUpdateParams, options?: RequestOptions): APIPromise<Queue> {
    return this._client.patch(path`/v1/transaction_monitoring/queues/${queueToken}`, { body, ...options });
  }

  /**
   * Lists transaction monitoring queues.
   */
  list(
    query: QueueListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<QueuesCursorPage, Queue> {
    return this._client.getAPIList('/v1/transaction_monitoring/queues', CursorPage<Queue>, {
      query,
      ...options,
    });
  }

  /**
   * Deletes a transaction monitoring queue.
   */
  delete(queueToken: string, options?: RequestOptions): APIPromise<void> {
    return this._client.delete(path`/v1/transaction_monitoring/queues/${queueToken}`, options);
  }
}

export type QueuesCursorPage = CursorPage<Queue>;

/**
 * A queue that groups transaction monitoring cases for review
 */
export interface Queue {
  /**
   * Globally unique identifier for the queue
   */
  token: string;

  /**
   * Number of cases in the queue, broken down by status. A status is omitted when
   * the queue has no cases in that status
   */
  case_counts: Queue.CaseCounts;

  /**
   * Date and time at which the queue was created
   */
  created: string;

  /**
   * Optional description of the queue
   */
  description: string | null;

  /**
   * Human-readable name of the queue
   */
  name: string;

  /**
   * Date and time at which the queue was last updated
   */
  updated: string;
}

export namespace Queue {
  /**
   * Number of cases in the queue, broken down by status. A status is omitted when
   * the queue has no cases in that status
   */
  export interface CaseCounts {
    /**
     * Number of cases in the queue with status `ASSIGNED`
     */
    ASSIGNED?: number;

    /**
     * Number of cases in the queue with status `CLOSED`
     */
    CLOSED?: number;

    /**
     * Number of cases in the queue with status `ESCALATED`
     */
    ESCALATED?: number;

    /**
     * Number of cases in the queue with status `IN_REVIEW`
     */
    IN_REVIEW?: number;

    /**
     * Number of cases in the queue with status `OPEN`
     */
    OPEN?: number;

    /**
     * Number of cases in the queue with status `RESOLVED`
     */
    RESOLVED?: number;
  }
}

export interface QueueCreateParams {
  /**
   * Human-readable name of the queue
   */
  name: string;

  /**
   * Optional description of the queue
   */
  description?: string | null;
}

export interface QueueUpdateParams {
  /**
   * New description for the queue, or `null` to clear it
   */
  description?: string | null;

  /**
   * New name for the queue
   */
  name?: string;
}

export interface QueueListParams extends CursorPageParams {}

export declare namespace Queues {
  export {
    type Queue as Queue,
    type QueuesCursorPage as QueuesCursorPage,
    type QueueCreateParams as QueueCreateParams,
    type QueueUpdateParams as QueueUpdateParams,
    type QueueListParams as QueueListParams,
  };
}
