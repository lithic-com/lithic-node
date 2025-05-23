// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import { isRequestOptions, maybeMultipartFormRequestOptions, Uploadable } from '../core';
import * as Core from '../core';
import { CursorPage, type CursorPageParams } from '../pagination';

export class Disputes extends APIResource {
  /**
   * Initiate a dispute.
   *
   * @example
   * ```ts
   * const dispute = await client.disputes.create({
   *   amount: 10000,
   *   reason: 'FRAUD_CARD_PRESENT',
   *   transaction_token: '12345624-aa69-4cbc-a946-30d90181b621',
   *   customer_filed_date: '2021-06-28T22:53:15Z',
   * });
   * ```
   */
  create(body: DisputeCreateParams, options?: Core.RequestOptions): Core.APIPromise<Dispute> {
    return this._client.post('/v1/disputes', { body, ...options });
  }

  /**
   * Get dispute.
   *
   * @example
   * ```ts
   * const dispute = await client.disputes.retrieve(
   *   '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   * );
   * ```
   */
  retrieve(disputeToken: string, options?: Core.RequestOptions): Core.APIPromise<Dispute> {
    return this._client.get(`/v1/disputes/${disputeToken}`, options);
  }

  /**
   * Update dispute. Can only be modified if status is `NEW`.
   *
   * @example
   * ```ts
   * const dispute = await client.disputes.update(
   *   '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   * );
   * ```
   */
  update(
    disputeToken: string,
    body: DisputeUpdateParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<Dispute> {
    return this._client.patch(`/v1/disputes/${disputeToken}`, { body, ...options });
  }

  /**
   * List disputes.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const dispute of client.disputes.list()) {
   *   // ...
   * }
   * ```
   */
  list(
    query?: DisputeListParams,
    options?: Core.RequestOptions,
  ): Core.PagePromise<DisputesCursorPage, Dispute>;
  list(options?: Core.RequestOptions): Core.PagePromise<DisputesCursorPage, Dispute>;
  list(
    query: DisputeListParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.PagePromise<DisputesCursorPage, Dispute> {
    if (isRequestOptions(query)) {
      return this.list({}, query);
    }
    return this._client.getAPIList('/v1/disputes', DisputesCursorPage, { query, ...options });
  }

  /**
   * Withdraw dispute.
   *
   * @example
   * ```ts
   * const dispute = await client.disputes.del(
   *   '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   * );
   * ```
   */
  del(disputeToken: string, options?: Core.RequestOptions): Core.APIPromise<Dispute> {
    return this._client.delete(`/v1/disputes/${disputeToken}`, options);
  }

  /**
   * Soft delete evidence for a dispute. Evidence will not be reviewed or submitted
   * by Lithic after it is withdrawn.
   *
   * @example
   * ```ts
   * const disputeEvidence =
   *   await client.disputes.deleteEvidence(
   *     '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   *     '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   *   );
   * ```
   */
  deleteEvidence(
    disputeToken: string,
    evidenceToken: string,
    options?: Core.RequestOptions,
  ): Core.APIPromise<DisputeEvidence> {
    return this._client.delete(`/v1/disputes/${disputeToken}/evidences/${evidenceToken}`, options);
  }

  /**
   * Use this endpoint to upload evidences for the dispute. It will return a URL to
   * upload your documents to. The URL will expire in 30 minutes.
   *
   * Uploaded documents must either be a `jpg`, `png` or `pdf` file, and each must be
   * less than 5 GiB.
   *
   * @example
   * ```ts
   * const disputeEvidence =
   *   await client.disputes.initiateEvidenceUpload(
   *     '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   *   );
   * ```
   */
  initiateEvidenceUpload(
    disputeToken: string,
    body?: DisputeInitiateEvidenceUploadParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<DisputeEvidence>;
  initiateEvidenceUpload(
    disputeToken: string,
    options?: Core.RequestOptions,
  ): Core.APIPromise<DisputeEvidence>;
  initiateEvidenceUpload(
    disputeToken: string,
    body: DisputeInitiateEvidenceUploadParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.APIPromise<DisputeEvidence> {
    if (isRequestOptions(body)) {
      return this.initiateEvidenceUpload(disputeToken, {}, body);
    }
    return this._client.post(`/v1/disputes/${disputeToken}/evidences`, { body, ...options });
  }

  /**
   * List evidence metadata for a dispute.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const disputeEvidence of client.disputes.listEvidences(
   *   '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   * )) {
   *   // ...
   * }
   * ```
   */
  listEvidences(
    disputeToken: string,
    query?: DisputeListEvidencesParams,
    options?: Core.RequestOptions,
  ): Core.PagePromise<DisputeEvidencesCursorPage, DisputeEvidence>;
  listEvidences(
    disputeToken: string,
    options?: Core.RequestOptions,
  ): Core.PagePromise<DisputeEvidencesCursorPage, DisputeEvidence>;
  listEvidences(
    disputeToken: string,
    query: DisputeListEvidencesParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.PagePromise<DisputeEvidencesCursorPage, DisputeEvidence> {
    if (isRequestOptions(query)) {
      return this.listEvidences(disputeToken, {}, query);
    }
    return this._client.getAPIList(`/v1/disputes/${disputeToken}/evidences`, DisputeEvidencesCursorPage, {
      query,
      ...options,
    });
  }

  /**
   * Get a dispute's evidence metadata.
   *
   * @example
   * ```ts
   * const disputeEvidence =
   *   await client.disputes.retrieveEvidence(
   *     '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   *     '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   *   );
   * ```
   */
  retrieveEvidence(
    disputeToken: string,
    evidenceToken: string,
    options?: Core.RequestOptions,
  ): Core.APIPromise<DisputeEvidence> {
    return this._client.get(`/v1/disputes/${disputeToken}/evidences/${evidenceToken}`, options);
  }

  /**
   * Initiates the Dispute Evidence Upload, then uploads the file to the returned
   * `upload_url`.
   */
  uploadEvidence(disputeToken: string, file: Uploadable, options?: Core.RequestOptions): Promise<void> {
    return this._client.disputes.initiateEvidenceUpload(disputeToken, options).then(async (payload) => {
      if (!payload.upload_url) {
        return Promise.reject("Missing 'upload_url' from response payload");
      }
      return this._client.put(
        payload.upload_url,
        await maybeMultipartFormRequestOptions({ body: { file }, headers: { Authorization: null } }),
      );
    });
  }
}

export class DisputesCursorPage extends CursorPage<Dispute> {}

export class DisputeEvidencesCursorPage extends CursorPage<DisputeEvidence> {}

/**
 * Dispute.
 */
export interface Dispute {
  /**
   * Globally unique identifier.
   */
  token: string;

  /**
   * Amount under dispute. May be different from the original transaction amount.
   */
  amount: number;

  /**
   * Date dispute entered arbitration.
   */
  arbitration_date: string | null;

  /**
   * Timestamp of when first Dispute was reported.
   */
  created: string;

  /**
   * Date that the dispute was filed by the customer making the dispute.
   */
  customer_filed_date: string | null;

  /**
   * End customer description of the reason for the dispute.
   */
  customer_note: string | null;

  /**
   * Unique identifiers for the dispute from the network.
   */
  network_claim_ids: Array<string> | null;

  /**
   * Date that the dispute was submitted to the network.
   */
  network_filed_date: string | null;

  /**
   * Network reason code used to file the dispute.
   */
  network_reason_code: string | null;

  /**
   * Date dispute entered pre-arbitration.
   */
  prearbitration_date: string | null;

  /**
   * Unique identifier for the dispute from the network. If there are multiple, this
   * will be the first claim id set by the network
   */
  primary_claim_id: string | null;

  /**
   * Dispute reason:
   *
   * - `ATM_CASH_MISDISPENSE`: ATM cash misdispense.
   * - `CANCELLED`: Transaction was cancelled by the customer.
   * - `DUPLICATED`: The transaction was a duplicate.
   * - `FRAUD_CARD_NOT_PRESENT`: Fraudulent transaction, card not present.
   * - `FRAUD_CARD_PRESENT`: Fraudulent transaction, card present.
   * - `FRAUD_OTHER`: Fraudulent transaction, other types such as questionable
   *   merchant activity.
   * - `GOODS_SERVICES_NOT_AS_DESCRIBED`: The goods or services were not as
   *   described.
   * - `GOODS_SERVICES_NOT_RECEIVED`: The goods or services were not received.
   * - `INCORRECT_AMOUNT`: The transaction amount was incorrect.
   * - `MISSING_AUTH`: The transaction was missing authorization.
   * - `OTHER`: Other reason.
   * - `PROCESSING_ERROR`: Processing error.
   * - `REFUND_NOT_PROCESSED`: The refund was not processed.
   * - `RECURRING_TRANSACTION_NOT_CANCELLED`: The recurring transaction was not
   *   cancelled.
   */
  reason:
    | 'ATM_CASH_MISDISPENSE'
    | 'CANCELLED'
    | 'DUPLICATED'
    | 'FRAUD_CARD_NOT_PRESENT'
    | 'FRAUD_CARD_PRESENT'
    | 'FRAUD_OTHER'
    | 'GOODS_SERVICES_NOT_AS_DESCRIBED'
    | 'GOODS_SERVICES_NOT_RECEIVED'
    | 'INCORRECT_AMOUNT'
    | 'MISSING_AUTH'
    | 'OTHER'
    | 'PROCESSING_ERROR'
    | 'RECURRING_TRANSACTION_NOT_CANCELLED'
    | 'REFUND_NOT_PROCESSED';

  /**
   * Date the representment was received.
   */
  representment_date: string | null;

  /**
   * Date that the dispute was resolved.
   */
  resolution_date: string | null;

  /**
   * Note by Dispute team on the case resolution.
   */
  resolution_note: string | null;

  /**
   * Reason for the dispute resolution:
   *
   * - `CASE_LOST`: This case was lost at final arbitration.
   * - `NETWORK_REJECTED`: Network rejected.
   * - `NO_DISPUTE_RIGHTS_3DS`: No dispute rights, 3DS.
   * - `NO_DISPUTE_RIGHTS_BELOW_THRESHOLD`: No dispute rights, below threshold.
   * - `NO_DISPUTE_RIGHTS_CONTACTLESS`: No dispute rights, contactless.
   * - `NO_DISPUTE_RIGHTS_HYBRID`: No dispute rights, hybrid.
   * - `NO_DISPUTE_RIGHTS_MAX_CHARGEBACKS`: No dispute rights, max chargebacks.
   * - `NO_DISPUTE_RIGHTS_OTHER`: No dispute rights, other.
   * - `PAST_FILING_DATE`: Past filing date.
   * - `PREARBITRATION_REJECTED`: Prearbitration rejected.
   * - `PROCESSOR_REJECTED_OTHER`: Processor rejected, other.
   * - `REFUNDED`: Refunded.
   * - `REFUNDED_AFTER_CHARGEBACK`: Refunded after chargeback.
   * - `WITHDRAWN`: Withdrawn.
   * - `WON_ARBITRATION`: Won arbitration.
   * - `WON_FIRST_CHARGEBACK`: Won first chargeback.
   * - `WON_PREARBITRATION`: Won prearbitration.
   */
  resolution_reason:
    | 'CASE_LOST'
    | 'NETWORK_REJECTED'
    | 'NO_DISPUTE_RIGHTS_3DS'
    | 'NO_DISPUTE_RIGHTS_BELOW_THRESHOLD'
    | 'NO_DISPUTE_RIGHTS_CONTACTLESS'
    | 'NO_DISPUTE_RIGHTS_HYBRID'
    | 'NO_DISPUTE_RIGHTS_MAX_CHARGEBACKS'
    | 'NO_DISPUTE_RIGHTS_OTHER'
    | 'PAST_FILING_DATE'
    | 'PREARBITRATION_REJECTED'
    | 'PROCESSOR_REJECTED_OTHER'
    | 'REFUNDED'
    | 'REFUNDED_AFTER_CHARGEBACK'
    | 'WITHDRAWN'
    | 'WON_ARBITRATION'
    | 'WON_FIRST_CHARGEBACK'
    | 'WON_PREARBITRATION'
    | null;

  /**
   * Status types:
   *
   * - `NEW` - New dispute case is opened.
   * - `PENDING_CUSTOMER` - Lithic is waiting for customer to provide more
   *   information.
   * - `SUBMITTED` - Dispute is submitted to the card network.
   * - `REPRESENTMENT` - Case has entered second presentment.
   * - `PREARBITRATION` - Case has entered prearbitration.
   * - `ARBITRATION` - Case has entered arbitration.
   * - `CASE_WON` - Case was won and credit will be issued.
   * - `CASE_CLOSED` - Case was lost or withdrawn.
   */
  status:
    | 'ARBITRATION'
    | 'CASE_CLOSED'
    | 'CASE_WON'
    | 'NEW'
    | 'PENDING_CUSTOMER'
    | 'PREARBITRATION'
    | 'REPRESENTMENT'
    | 'SUBMITTED';

  /**
   * The transaction that is being disputed. A transaction can only be disputed once
   * but may have multiple dispute cases.
   */
  transaction_token: string;
}

/**
 * Dispute evidence.
 */
export interface DisputeEvidence {
  /**
   * Globally unique identifier.
   */
  token: string;

  /**
   * Timestamp of when dispute evidence was created.
   */
  created: string;

  /**
   * Dispute token evidence is attached to.
   */
  dispute_token: string;

  /**
   * Upload status types:
   *
   * - `DELETED` - Evidence was deleted.
   * - `ERROR` - Evidence upload failed.
   * - `PENDING` - Evidence is pending upload.
   * - `REJECTED` - Evidence was rejected.
   * - `UPLOADED` - Evidence was uploaded.
   */
  upload_status: 'DELETED' | 'ERROR' | 'PENDING' | 'REJECTED' | 'UPLOADED';

  /**
   * URL to download evidence. Only shown when `upload_status` is `UPLOADED`.
   */
  download_url?: string;

  /**
   * File name of evidence. Recommended to give the dispute evidence a human-readable
   * identifier.
   */
  filename?: string;

  /**
   * URL to upload evidence. Only shown when `upload_status` is `PENDING`.
   */
  upload_url?: string;
}

/**
 * @deprecated use `DisputeEvidence` instead
 */
export type DisputeInitiateEvidenceUploadResponse = DisputeEvidence;

export interface DisputeCreateParams {
  /**
   * Amount to dispute
   */
  amount: number;

  /**
   * Reason for dispute
   */
  reason:
    | 'ATM_CASH_MISDISPENSE'
    | 'CANCELLED'
    | 'DUPLICATED'
    | 'FRAUD_CARD_NOT_PRESENT'
    | 'FRAUD_CARD_PRESENT'
    | 'FRAUD_OTHER'
    | 'GOODS_SERVICES_NOT_AS_DESCRIBED'
    | 'GOODS_SERVICES_NOT_RECEIVED'
    | 'INCORRECT_AMOUNT'
    | 'MISSING_AUTH'
    | 'OTHER'
    | 'PROCESSING_ERROR'
    | 'RECURRING_TRANSACTION_NOT_CANCELLED'
    | 'REFUND_NOT_PROCESSED';

  /**
   * Transaction to dispute
   */
  transaction_token: string;

  /**
   * Date the customer filed the dispute
   */
  customer_filed_date?: string;

  /**
   * Customer description of dispute
   */
  customer_note?: string;
}

export interface DisputeUpdateParams {
  /**
   * Amount to dispute
   */
  amount?: number;

  /**
   * Date the customer filed the dispute
   */
  customer_filed_date?: string;

  /**
   * Customer description of dispute
   */
  customer_note?: string;

  /**
   * Reason for dispute
   */
  reason?:
    | 'ATM_CASH_MISDISPENSE'
    | 'CANCELLED'
    | 'DUPLICATED'
    | 'FRAUD_CARD_NOT_PRESENT'
    | 'FRAUD_CARD_PRESENT'
    | 'FRAUD_OTHER'
    | 'GOODS_SERVICES_NOT_AS_DESCRIBED'
    | 'GOODS_SERVICES_NOT_RECEIVED'
    | 'INCORRECT_AMOUNT'
    | 'MISSING_AUTH'
    | 'OTHER'
    | 'PROCESSING_ERROR'
    | 'RECURRING_TRANSACTION_NOT_CANCELLED'
    | 'REFUND_NOT_PROCESSED';
}

export interface DisputeListParams extends CursorPageParams {
  /**
   * Date string in RFC 3339 format. Only entries created after the specified time
   * will be included. UTC time zone.
   */
  begin?: string;

  /**
   * Date string in RFC 3339 format. Only entries created before the specified time
   * will be included. UTC time zone.
   */
  end?: string;

  /**
   * List disputes of a specific status.
   */
  status?:
    | 'ARBITRATION'
    | 'CASE_CLOSED'
    | 'CASE_WON'
    | 'NEW'
    | 'PENDING_CUSTOMER'
    | 'PREARBITRATION'
    | 'REPRESENTMENT'
    | 'SUBMITTED';

  /**
   * Transaction tokens to filter by.
   */
  transaction_tokens?: Array<string>;
}

export interface DisputeInitiateEvidenceUploadParams {
  /**
   * Filename of the evidence.
   */
  filename?: string;
}

export interface DisputeListEvidencesParams extends CursorPageParams {
  /**
   * Date string in RFC 3339 format. Only entries created after the specified time
   * will be included. UTC time zone.
   */
  begin?: string;

  /**
   * Date string in RFC 3339 format. Only entries created before the specified time
   * will be included. UTC time zone.
   */
  end?: string;
}

Disputes.DisputesCursorPage = DisputesCursorPage;
Disputes.DisputeEvidencesCursorPage = DisputeEvidencesCursorPage;

export declare namespace Disputes {
  export {
    type Dispute as Dispute,
    type DisputeEvidence as DisputeEvidence,
    type DisputeInitiateEvidenceUploadResponse as DisputeInitiateEvidenceUploadResponse,
    DisputesCursorPage as DisputesCursorPage,
    DisputeEvidencesCursorPage as DisputeEvidencesCursorPage,
    type DisputeCreateParams as DisputeCreateParams,
    type DisputeUpdateParams as DisputeUpdateParams,
    type DisputeListParams as DisputeListParams,
    type DisputeInitiateEvidenceUploadParams as DisputeInitiateEvidenceUploadParams,
    type DisputeListEvidencesParams as DisputeListEvidencesParams,
  };
}
