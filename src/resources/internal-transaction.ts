// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';

export class InternalTransactionResource extends APIResource {}

export interface InternalTransaction {
  token: string;

  category: 'INTERNAL';

  created: string;

  currency: string;

  descriptor: string;

  events: Array<InternalTransaction.Event>;

  pending_amount: number;

  result: 'APPROVED' | 'DECLINED';

  settled_amount: number;

  status: 'PENDING' | 'SETTLED' | 'DECLINED' | 'REVERSED' | 'CANCELED' | 'RETURNED';

  updated: string;
}

export namespace InternalTransaction {
  export interface Event {
    token: string;

    amount: number;

    created: string;

    result: 'APPROVED' | 'DECLINED';

    type: 'INTERNAL_ADJUSTMENT';
  }
}

export declare namespace InternalTransactionResource {
  export { type InternalTransaction as InternalTransaction };
}
