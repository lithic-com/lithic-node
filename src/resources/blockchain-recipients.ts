// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as ExternalBankAccountsAPI from './external-bank-accounts/external-bank-accounts';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

export class BlockchainRecipients extends APIResource {
  /**
   * Register a blockchain address as a withdrawal destination for a financial
   * account
   *
   * The recipient is created with a `PENDING` verification state and cannot receive
   * a payout until screening of the address completes. Registering an address that
   * is already registered to the same financial account returns the existing
   * recipient and its current verification state, rather than creating a second one
   *
   * @example
   * ```ts
   * const blockchainRecipient =
   *   await client.blockchainRecipients.create({
   *     account_token: 'dabadb3b-700c-41e3-8801-d5dfc84ebea0',
   *     address: '0x45bfcf1a6289a0b77b4d3f7d12005a05949fd8c3',
   *     chain: 'ETHEREUM',
   *     owner: 'John Doe',
   *     owner_type: 'INDIVIDUAL',
   *     name: 'Cold wallet',
   *   });
   * ```
   */
  create(body: BlockchainRecipientCreateParams, options?: RequestOptions): APIPromise<BlockchainRecipient> {
    return this._client.post('/v1/blockchain_recipients', { body, ...options });
  }
}

export interface BlockchainRecipient {
  /**
   * A globally unique identifier for this blockchain recipient
   */
  token: string;

  /**
   * The financial account the blockchain recipient belongs to, or null when the
   * recipient is registered against the program rather than a financial account
   */
  account_token: string | null;

  /**
   * An optional tag or memo used by some chains to identify the destination of a
   * transfer within a shared address
   */
  address_tag: string | null;

  /**
   * The blockchain network that the address belongs to
   */
  chain: string;

  /**
   * An ISO 8601 string representing when this blockchain recipient was created
   */
  created: string;

  /**
   * The identifier the recipient is registered under with the payment provider
   */
  external_id: string | null;

  /**
   * The nickname for this blockchain recipient
   */
  name: string | null;

  /**
   * Legal name of the business or individual who owns the blockchain address
   */
  owner: string;

  /**
   * Owner Type
   */
  owner_type: ExternalBankAccountsAPI.OwnerType;

  /**
   * Globally unique identifier for the program the blockchain recipient is
   * associated with
   */
  program_id: string;

  /**
   * Account State
   */
  state: 'ENABLED' | 'CLOSED' | 'PAUSED';

  /**
   * An ISO 8601 string representing when this blockchain recipient was last updated
   */
  updated: string;

  /**
   * Verification State
   */
  verification_state: 'PENDING' | 'ENABLED' | 'FAILED_VERIFICATION' | 'INSUFFICIENT_FUNDS';
}

export interface BlockchainRecipientCreateParams {
  /**
   * The financial account the blockchain recipient belongs to
   */
  account_token: string;

  /**
   * The blockchain address funds will be withdrawn to
   */
  address: string;

  /**
   * The blockchain network that the address belongs to
   */
  chain: string;

  /**
   * Legal name of the business or individual who owns the blockchain address
   */
  owner: string;

  /**
   * Owner Type
   */
  owner_type: ExternalBankAccountsAPI.OwnerType;

  /**
   * An optional tag or memo used by some chains to identify the destination of a
   * transfer within a shared address
   */
  address_tag?: string;

  /**
   * The nickname for this blockchain recipient
   */
  name?: string;
}

export declare namespace BlockchainRecipients {
  export {
    type BlockchainRecipient as BlockchainRecipient,
    type BlockchainRecipientCreateParams as BlockchainRecipientCreateParams,
  };
}
