// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import { APIPromise } from '../../../core/api-promise';
import { CursorPage, type CursorPageParams, PagePromise } from '../../../core/pagination';
import { RequestOptions } from '../../../internal/request-options';
import { path } from '../../../internal/utils/path';

export class Files extends APIResource {
  /**
   * Creates a file record and returns a presigned URL for uploading the file to the
   * case.
   */
  create(caseToken: string, body: FileCreateParams, options?: RequestOptions): APIPromise<CaseFile> {
    return this._client.post(path`/v1/transaction_monitoring/cases/${caseToken}/files`, { body, ...options });
  }

  /**
   * Retrieves a single file attached to a case, including a presigned download URL
   * when the file is ready.
   */
  retrieve(fileToken: string, params: FileRetrieveParams, options?: RequestOptions): APIPromise<CaseFile> {
    const { case_token } = params;
    return this._client.get(path`/v1/transaction_monitoring/cases/${case_token}/files/${fileToken}`, options);
  }

  /**
   * Lists the files attached to a case.
   */
  list(
    caseToken: string,
    query: FileListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<CaseFilesCursorPage, CaseFile> {
    return this._client.getAPIList(
      path`/v1/transaction_monitoring/cases/${caseToken}/files`,
      CursorPage<CaseFile>,
      { query, ...options },
    );
  }

  /**
   * Deletes a file from a case.
   */
  delete(fileToken: string, params: FileDeleteParams, options?: RequestOptions): APIPromise<void> {
    const { case_token } = params;
    return this._client.delete(
      path`/v1/transaction_monitoring/cases/${case_token}/files/${fileToken}`,
      options,
    );
  }
}

export type CaseFilesCursorPage = CursorPage<CaseFile>;

/**
 * A file attached to a case. Status-dependent fields are always present but may be
 * `null`:
 *
 * - `upload_url`, `upload_url_expires`, and `upload_constraints` are populated
 *   when `status` is `PENDING` or `REJECTED`
 * - `download_url` and `download_url_expires` are populated when `status` is
 *   `READY`
 * - `failure_reason` is populated when `status` is `REJECTED`
 */
export interface CaseFile {
  /**
   * Globally unique identifier for the file
   */
  token: string;

  /**
   * Date and time at which the file record was created
   */
  created: string;

  /**
   * Presigned URL the client uses to download the file
   */
  download_url: string | null;

  /**
   * Date and time at which the download URL expires
   */
  download_url_expires: string | null;

  /**
   * Reason the file was rejected, when applicable
   */
  failure_reason: string | null;

  /**
   * MIME type of the file, available once the file is ready
   */
  mime_type: string | null;

  /**
   * Name of the file
   */
  name: string;

  /**
   * Size of the file in bytes, available once the file is ready
   */
  size_bytes: number | null;

  /**
   * Lifecycle status of a case file:
   *
   * - `PENDING` - An upload URL has been issued and the file is awaiting upload
   * - `READY` - The file has been uploaded and validated; a download URL is
   *   available
   * - `REJECTED` - File validation failed; see `failure_reason` for details
   */
  status: FileStatus;

  /**
   * Date and time at which the file record was last updated
   */
  updated: string;

  /**
   * Constraints applied to a file upload, returned alongside the upload URL so
   * clients can validate before uploading
   */
  upload_constraints: UploadConstraints | null;

  /**
   * Presigned URL the client uses to upload the file
   */
  upload_url: string | null;

  /**
   * Date and time at which the upload URL expires
   */
  upload_url_expires: string | null;
}

/**
 * Lifecycle status of a case file:
 *
 * - `PENDING` - An upload URL has been issued and the file is awaiting upload
 * - `READY` - The file has been uploaded and validated; a download URL is
 *   available
 * - `REJECTED` - File validation failed; see `failure_reason` for details
 */
export type FileStatus = 'PENDING' | 'READY' | 'REJECTED';

/**
 * Constraints applied to a file upload, returned alongside the upload URL so
 * clients can validate before uploading
 */
export interface UploadConstraints {
  /**
   * MIME types accepted for the upload
   */
  accepted_mime_types: Array<string>;

  /**
   * Maximum accepted file size, in bytes
   */
  max_size_bytes: number;
}

export interface FileCreateParams {
  /**
   * Name of the file to upload
   */
  name: string;
}

export interface FileRetrieveParams {
  /**
   * Globally unique identifier for the case.
   */
  case_token: string;
}

export interface FileListParams extends CursorPageParams {}

export interface FileDeleteParams {
  /**
   * Globally unique identifier for the case.
   */
  case_token: string;
}

export declare namespace Files {
  export {
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
