// File generated from our OpenAPI spec by Stainless.

import * as Core from '~/core';
import { APIResource } from '~/resource';
import { isRequestOptions } from '~/core';
import type * as FormData from 'formdata-node';
import { maybeMultipartFormRequestOptions } from '~/core';
import { CursorPage, CursorPageParams } from '~/pagination';

export class Disputes extends APIResource {
  /**
   * Initiate a dispute.
   */
  create(body: DisputeCreateParams, options?: Core.RequestOptions): Promise<Core.APIResponse<Dispute>> {
    return this.post('/disputes', { body, ...options });
  }

  /**
   * Get dispute.
   */
  retrieve(disputeToken: string, options?: Core.RequestOptions): Promise<Core.APIResponse<Dispute>> {
    return this.get(`/disputes/${disputeToken}`, options);
  }

  /**
   * Update dispute. Can only be modified if status is `NEW`.
   */
  update(
    disputeToken: string,
    body: DisputeUpdateParams,
    options?: Core.RequestOptions,
  ): Promise<Core.APIResponse<Dispute>> {
    return this.patch(`/disputes/${disputeToken}`, { body, ...options });
  }

  /**
   * List disputes.
   */
  list(query?: DisputeListParams, options?: Core.RequestOptions): Core.PagePromise<DisputesCursorPage>;
  list(options?: Core.RequestOptions): Core.PagePromise<DisputesCursorPage>;
  list(
    query: DisputeListParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.PagePromise<DisputesCursorPage> {
    if (isRequestOptions(query)) {
      return this.list({}, query);
    }
    return this.getAPIList('/disputes', DisputesCursorPage, { query, ...options });
  }

  /**
   * Withdraw dispute.
   */
  del(disputeToken: string, options?: Core.RequestOptions): Promise<Core.APIResponse<Dispute>> {
    return this.delete(`/disputes/${disputeToken}`, options);
  }

  /**
   * Soft delete evidence for a dispute. Evidence will not be reviewed or submitted
   * by Lithic after it is withdrawn.
   */
  deleteEvidence(
    disputeToken: string,
    evidenceToken: string,
    options?: Core.RequestOptions,
  ): Promise<Core.APIResponse<DisputeEvidence>> {
    return this.delete(`/disputes/${disputeToken}/evidences/${evidenceToken}`, options);
  }

  /**
   * Use this endpoint to upload evidences for the dispute. It will return a URL to
   * upload your documents to. The URL will expire in 30 minutes.
   *
   * Uploaded documents must either be a `jpg`, `png` or `pdf` file, and each must be
   * less than 5 GiB.
   */
  initiateEvidenceUpload(
    disputeToken: string,
    options?: Core.RequestOptions,
  ): Promise<Core.APIResponse<DisputeEvidence>> {
    return this.post(`/disputes/${disputeToken}/evidences`, options);
  }

  /**
   * List evidence metadata for a dispute.
   */
  listEvidences(
    disputeToken: string,
    query?: DisputeListEvidencesParams,
    options?: Core.RequestOptions,
  ): Core.PagePromise<DisputeEvidencesCursorPage>;
  listEvidences(
    disputeToken: string,
    options?: Core.RequestOptions,
  ): Core.PagePromise<DisputeEvidencesCursorPage>;
  listEvidences(
    disputeToken: string,
    query: DisputeListEvidencesParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.PagePromise<DisputeEvidencesCursorPage> {
    if (isRequestOptions(query)) {
      return this.listEvidences(disputeToken, {}, query);
    }
    return this.getAPIList(`/disputes/${disputeToken}/evidences`, DisputeEvidencesCursorPage, {
      query,
      ...options,
    });
  }

  /**
   * Get a dispute's evidence metadata.
   */
  retrieveEvidence(
    disputeToken: string,
    evidenceToken: string,
    options?: Core.RequestOptions,
  ): Promise<Core.APIResponse<DisputeEvidence>> {
    return this.get(`/disputes/${disputeToken}/evidences/${evidenceToken}`, options);
  }

  /**
   * Initiates the Dispute Evidence Upload, then uploads the file to the returned
   * `upload_url`.
   */
  uploadEvidence(
    disputeToken: string,
    file: FormData.File | FormData.Blob,
    options?: Core.RequestOptions,
  ): Promise<void> {
    return this.client.disputes.initiateEvidenceUpload(disputeToken, options).then((payload) => {
      if (!payload.upload_url) {
        return Promise.reject("Missing 'upload_url' from response payload");
      }
      return this.put(
        payload.upload_url,
        maybeMultipartFormRequestOptions({ body: { file }, headers: { Authorization: null } }),
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
   * Amount under dispute. May be different from the original transaction amount.
   */
  amount: number;

  /**
   * Date dispute entered arbitration.
   */
  arbitration_date: string;

  /**
   * Timestamp of when first Dispute was reported.
   */
  created: string;

  /**
   * Date that the dispute was filed by the customer making the dispute.
   */
  customer_filed_date: string;

  /**
   * End customer description of the reason for the dispute.
   */
  customer_note: string;

  /**
   * Unique identifiers for the dispute from the network.
   */
  network_claim_ids: Array<string>;

  /**
   * Date that the dispute was submitted to the network.
   */
  network_filed_date: string;

  /**
   * Network reason code used to file the dispute.
   */
  network_reason_code: string;

  /**
   * Date dispute entered pre-arbitration.
   */
  prearbitration_date: string;

  /**
   * Unique identifier for the dispute from the network. If there are multiple, this
   * will be the first claim id set by the network
   */
  primary_claim_id: string;

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
    | 'REFUND_NOT_PROCESSED'
    | 'RECURRING_TRANSACTION_NOT_CANCELLED';

  /**
   * Date the representment was received.
   */
  representment_date: string;

  /**
   * Resolution amount net of network fees.
   */
  resolution_amount: number;

  /**
   * Date that the dispute was resolved.
   */
  resolution_date: string;

  /**
   * Note by Dispute team on the case resolution.
   */
  resolution_note: string;

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
    | 'WON_PREARBITRATION';

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
    | 'NEW'
    | 'PENDING_CUSTOMER'
    | 'SUBMITTED'
    | 'REPRESENTMENT'
    | 'PREARBITRATION'
    | 'ARBITRATION'
    | 'CASE_WON'
    | 'CASE_CLOSED';

  /**
   * Globally unique identifier.
   */
  token: string;

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
   * Timestamp of when dispute evidence was created.
   */
  created: string;

  /**
   * Dispute token evidence is attached to.
   */
  dispute_token: string;

  /**
   * Globally unique identifier.
   */
  token: string;

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
   * URL to upload evidence. Only shown when `upload_status` is `PENDING`.
   */
  upload_url?: string;
}

export type DisputeInitiateEvidenceUploadResponse = DisputeEvidence;

export interface DisputeCreateParams {
  /**
   * Amount to dispute
   */
  amount: number;

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
    | 'REFUND_NOT_PROCESSED'
    | 'RECURRING_TRANSACTION_NOT_CANCELLED';

  /**
   * Transaction to dispute
   */
  transaction_token: string;
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
    | 'REFUND_NOT_PROCESSED'
    | 'RECURRING_TRANSACTION_NOT_CANCELLED';
}

export interface DisputeListParams extends CursorPageParams {
  /**
   * Date string in RFC 3339 format. Only entries created after the specified date
   * will be included. UTC time zone.
   */
  begin?: string;

  /**
   * Date string in RFC 3339 format. Only entries created before the specified date
   * will be included. UTC time zone.
   */
  end?: string;

  /**
   * List disputes of a specific status.
   */
  status?:
    | 'NEW'
    | 'PENDING_CUSTOMER'
    | 'SUBMITTED'
    | 'REPRESENTMENT'
    | 'PREARBITRATION'
    | 'ARBITRATION'
    | 'CASE_WON'
    | 'CASE_CLOSED';

  /**
   * Transaction tokens to filter by.
   */
  transaction_tokens?: Array<string>;
}

export interface DisputeListEvidencesParams extends CursorPageParams {
  /**
   * Date string in RFC 3339 format. Only entries created after the specified date
   * will be included. UTC time zone.
   */
  begin?: string;

  /**
   * Date string in RFC 3339 format. Only entries created before the specified date
   * will be included. UTC time zone.
   */
  end?: string;
}
