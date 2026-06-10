// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import * as CasesAPI from './cases';
import { APIPromise } from '../../../core/api-promise';
import { RequestOptions } from '../../../internal/request-options';
import { path } from '../../../internal/utils/path';

export class Comments extends APIResource {
  /**
   * Adds a comment to a case.
   */
  create(
    caseToken: string,
    body: CommentCreateParams,
    options?: RequestOptions,
  ): APIPromise<CasesAPI.CaseActivityEntry> {
    return this._client.post(path`/v1/transaction_monitoring/cases/${caseToken}/comments`, {
      body,
      ...options,
    });
  }

  /**
   * Edits an existing comment on a case.
   */
  update(
    commentToken: string,
    params: CommentUpdateParams,
    options?: RequestOptions,
  ): APIPromise<CasesAPI.CaseActivityEntry> {
    const { case_token, ...body } = params;
    return this._client.patch(path`/v1/transaction_monitoring/cases/${case_token}/comments/${commentToken}`, {
      body,
      ...options,
    });
  }

  /**
   * Deletes a comment from a case.
   */
  delete(commentToken: string, params: CommentDeleteParams, options?: RequestOptions): APIPromise<void> {
    const { case_token } = params;
    return this._client.delete(
      path`/v1/transaction_monitoring/cases/${case_token}/comments/${commentToken}`,
      options,
    );
  }
}

export interface CommentCreateParams {
  /**
   * Text of the comment
   */
  comment: string;

  /**
   * Optional client-provided identifier for the actor performing this action,
   * recorded on the resulting activity entry. This value is supplied by the client
   * (for example, your own internal user ID) and is not authenticated by Lithic
   */
  actor_token?: string;
}

export interface CommentUpdateParams {
  /**
   * Path param: Globally unique identifier for the case.
   */
  case_token: string;

  /**
   * Body param: New text of the comment
   */
  comment: string;

  /**
   * Body param: Optional client-provided identifier for the actor performing this
   * action, recorded on the resulting activity entry. This value is supplied by the
   * client (for example, your own internal user ID) and is not authenticated by
   * Lithic
   */
  actor_token?: string;
}

export interface CommentDeleteParams {
  /**
   * Globally unique identifier for the case.
   */
  case_token: string;
}

export declare namespace Comments {
  export {
    type CommentCreateParams as CommentCreateParams,
    type CommentUpdateParams as CommentUpdateParams,
    type CommentDeleteParams as CommentDeleteParams,
  };
}
