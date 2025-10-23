// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import type { RequestInit, RequestInfo, BodyInit } from './internal/builtin-types';
import type { HTTPMethod, PromiseOrValue, MergedRequestInit, FinalizedRequestInit } from './internal/types';
import { uuid4 } from './internal/utils/uuid';
import { validatePositiveInteger, isAbsoluteURL, safeJSON } from './internal/utils/values';
import { sleep } from './internal/utils/sleep';
export type { Logger, LogLevel } from './internal/utils/log';
import { castToError, isAbortError } from './internal/errors';
import type { APIResponseProps } from './internal/parse';
import { getPlatformHeaders } from './internal/detect-platform';
import * as Shims from './internal/shims';
import * as Opts from './internal/request-options';
import * as qs from './internal/qs';
import { VERSION } from './version';
import * as Errors from './core/error';
import * as Pagination from './core/pagination';
import {
  AbstractPage,
  type CursorPageParams,
  CursorPageResponse,
  SinglePageResponse,
} from './core/pagination';
import * as Uploads from './core/uploads';
import * as API from './resources/index';
import * as TopLevelAPI from './resources/top-level';
import { APIStatus } from './resources/top-level';
import { APIPromise } from './core/api-promise';
import {
  AccountActivity,
  AccountActivityListParams,
  AccountActivityListResponse,
  AccountActivityListResponsesCursorPage,
  AccountActivityRetrieveTransactionResponse,
  WirePartyDetails,
} from './resources/account-activity';
import {
  AccountHolder,
  AccountHolderCreateParams,
  AccountHolderCreateResponse,
  AccountHolderListDocumentsResponse,
  AccountHolderListParams,
  AccountHolderRetrieveDocumentParams,
  AccountHolderSimulateEnrollmentDocumentReviewParams,
  AccountHolderSimulateEnrollmentReviewParams,
  AccountHolderSimulateEnrollmentReviewResponse,
  AccountHolderUpdateParams,
  AccountHolderUpdateResponse,
  AccountHolderUploadDocumentParams,
  AccountHolders,
  AccountHoldersSinglePage,
  AddressUpdate,
  KYB,
  KYBBusinessEntity,
  KYC,
  KYCExempt,
  RequiredDocument,
} from './resources/account-holders';
import {
  Account,
  AccountListParams,
  AccountSpendLimits,
  AccountUpdateParams,
  Accounts,
  AccountsCursorPage,
} from './resources/accounts';
import {
  AggregateBalance,
  AggregateBalanceListParams,
  AggregateBalances,
  AggregateBalancesSinglePage,
} from './resources/aggregate-balances';
import { AuthStreamEnrollment, AuthStreamSecret } from './resources/auth-stream-enrollment';
import { Balance, BalanceListParams, Balances, BalancesSinglePage } from './resources/balances';
import {
  BookTransferCreateParams,
  BookTransferListParams,
  BookTransferResponse,
  BookTransferResponsesCursorPage,
  BookTransferReverseParams,
  BookTransfers,
} from './resources/book-transfers';
import {
  CardProgram,
  CardProgramListParams,
  CardPrograms,
  CardProgramsCursorPage,
} from './resources/card-programs';
import {
  DigitalCardArt,
  DigitalCardArtListParams,
  DigitalCardArtResource,
  DigitalCardArtsCursorPage,
} from './resources/digital-card-art';
import {
  Dispute,
  DisputeCreateParams,
  DisputeDeleteEvidenceParams,
  DisputeEvidence,
  DisputeEvidencesCursorPage,
  DisputeInitiateEvidenceUploadParams,
  DisputeListEvidencesParams,
  DisputeListParams,
  DisputeRetrieveEvidenceParams,
  DisputeUpdateParams,
  Disputes,
  DisputesCursorPage,
} from './resources/disputes';
import {
  ExternalPayment,
  ExternalPaymentCancelParams,
  ExternalPaymentCreateParams,
  ExternalPaymentListParams,
  ExternalPaymentReleaseParams,
  ExternalPaymentReverseParams,
  ExternalPaymentSettleParams,
  ExternalPayments,
  ExternalPaymentsCursorPage,
} from './resources/external-payments';
import {
  FundingEventListParams,
  FundingEventListResponse,
  FundingEventListResponsesCursorPage,
  FundingEventRetrieveDetailsResponse,
  FundingEventRetrieveResponse,
  FundingEvents,
} from './resources/funding-events';
import {
  ExternalResource,
  ExternalResourceType,
  ManagementOperationCreateParams,
  ManagementOperationListParams,
  ManagementOperationReverseParams,
  ManagementOperationTransaction,
  ManagementOperationTransactionsCursorPage,
  ManagementOperations,
} from './resources/management-operations';
import {
  NetworkProgram,
  NetworkProgramListParams,
  NetworkPrograms,
  NetworkProgramsSinglePage,
} from './resources/network-programs';
import {
  Payment,
  PaymentCreateParams,
  PaymentCreateResponse,
  PaymentListParams,
  PaymentRetryResponse,
  PaymentSimulateActionParams,
  PaymentSimulateActionResponse,
  PaymentSimulateReceiptParams,
  PaymentSimulateReceiptResponse,
  PaymentSimulateReleaseParams,
  PaymentSimulateReleaseResponse,
  PaymentSimulateReturnParams,
  PaymentSimulateReturnResponse,
  Payments,
  PaymentsCursorPage,
} from './resources/payments';
import {
  ResponderEndpointCheckStatusParams,
  ResponderEndpointCreateParams,
  ResponderEndpointCreateResponse,
  ResponderEndpointDeleteParams,
  ResponderEndpointStatus,
  ResponderEndpoints,
} from './resources/responder-endpoints';
import {
  TokenizationDecisioning,
  TokenizationDecisioningRotateSecretResponse,
  TokenizationSecret,
} from './resources/tokenization-decisioning';
import {
  Tokenization,
  TokenizationListParams,
  TokenizationResendActivationCodeParams,
  TokenizationSimulateParams,
  TokenizationSimulateResponse,
  TokenizationUpdateDigitalCardArtParams,
  TokenizationUpdateDigitalCardArtResponse,
  Tokenizations,
  TokenizationsCursorPage,
} from './resources/tokenizations';
import { Transfer, TransferCreateParams, Transfers } from './resources/transfers';
import { AuthRules } from './resources/auth-rules/auth-rules';
import {
  Card,
  CardConvertPhysicalParams,
  CardCreateParams,
  CardEmbedParams,
  CardEmbedResponse,
  CardListParams,
  CardProvisionParams,
  CardProvisionResponse,
  CardReissueParams,
  CardRenewParams,
  CardSearchByPanParams,
  CardSpendLimits,
  CardUpdateParams,
  CardWebProvisionParams,
  CardWebProvisionResponse,
  Cards,
  NonPCICard,
  NonPCICardsCursorPage,
  ProvisionResponse,
  SpendLimitDuration,
} from './resources/cards/cards';
import { CreditProducts } from './resources/credit-products/credit-products';
import {
  Event,
  EventListAttemptsParams,
  EventListParams,
  EventSubscription,
  Events,
  EventsCursorPage,
  MessageAttempt,
  MessageAttemptsCursorPage,
} from './resources/events/events';
import {
  ExternalBankAccountAddress,
  ExternalBankAccountCreateParams,
  ExternalBankAccountCreateResponse,
  ExternalBankAccountListParams,
  ExternalBankAccountListResponse,
  ExternalBankAccountListResponsesCursorPage,
  ExternalBankAccountRetrieveResponse,
  ExternalBankAccountRetryMicroDepositsParams,
  ExternalBankAccountRetryMicroDepositsResponse,
  ExternalBankAccountRetryPrenoteParams,
  ExternalBankAccountRetryPrenoteResponse,
  ExternalBankAccountUpdateParams,
  ExternalBankAccountUpdateResponse,
  ExternalBankAccounts,
  OwnerType,
  VerificationMethod,
} from './resources/external-bank-accounts/external-bank-accounts';
import {
  FinancialAccount,
  FinancialAccountCreateParams,
  FinancialAccountListParams,
  FinancialAccountRegisterAccountNumberParams,
  FinancialAccountUpdateParams,
  FinancialAccountUpdateStatusParams,
  FinancialAccounts,
  FinancialAccountsSinglePage,
  FinancialTransaction,
} from './resources/financial-accounts/financial-accounts';
import { Fraud } from './resources/fraud/fraud';
import {
  Reports,
  SettlementDetail,
  SettlementReport,
  SettlementSummaryDetails,
} from './resources/reports/reports';
import { ThreeDS } from './resources/three-ds/three-ds';
import {
  Transaction,
  TransactionListParams,
  TransactionSimulateAuthorizationAdviceParams,
  TransactionSimulateAuthorizationAdviceResponse,
  TransactionSimulateAuthorizationParams,
  TransactionSimulateAuthorizationResponse,
  TransactionSimulateClearingParams,
  TransactionSimulateClearingResponse,
  TransactionSimulateCreditAuthorizationAdviceParams,
  TransactionSimulateCreditAuthorizationAdviceResponse,
  TransactionSimulateCreditAuthorizationParams,
  TransactionSimulateCreditAuthorizationResponse,
  TransactionSimulateReturnParams,
  TransactionSimulateReturnResponse,
  TransactionSimulateReturnReversalParams,
  TransactionSimulateReturnReversalResponse,
  TransactionSimulateVoidParams,
  TransactionSimulateVoidResponse,
  Transactions,
  TransactionsCursorPage,
} from './resources/transactions/transactions';
import { type Fetch } from './internal/builtin-types';
import { HeadersLike, NullableHeaders, buildHeaders } from './internal/headers';
import { FinalRequestOptions, RequestOptions } from './internal/request-options';
import { readEnv } from './internal/utils/env';
import {
  type LogLevel,
  type Logger,
  formatRequestDetails,
  loggerFor,
  parseLogLevel,
} from './internal/utils/log';
import { isEmptyObj } from './internal/utils/values';

const environments = {
  production: 'https://api.lithic.com',
  sandbox: 'https://sandbox.lithic.com',
};
type Environment = keyof typeof environments;

export interface ClientOptions {
  /**
   * Defaults to process.env['LITHIC_API_KEY'].
   */
  apiKey?: string | undefined;

  /**
   * Defaults to process.env['LITHIC_WEBHOOK_SECRET'].
   */
  webhookSecret?: string | null | undefined;

  /**
   * Specifies the environment to use for the API.
   *
   * Each environment maps to a different base URL:
   * - `production` corresponds to `https://api.lithic.com`
   * - `sandbox` corresponds to `https://sandbox.lithic.com`
   */
  environment?: Environment | undefined;

  /**
   * Override the default base URL for the API, e.g., "https://api.example.com/v2/"
   *
   * Defaults to process.env['LITHIC_BASE_URL'].
   */
  baseURL?: string | null | undefined;

  /**
   * The maximum amount of time (in milliseconds) that the client should wait for a response
   * from the server before timing out a single request.
   *
   * Note that request timeouts are retried by default, so in a worst-case scenario you may wait
   * much longer than this timeout before the promise succeeds or fails.
   *
   * @unit milliseconds
   */
  timeout?: number | undefined;
  /**
   * Additional `RequestInit` options to be passed to `fetch` calls.
   * Properties will be overridden by per-request `fetchOptions`.
   */
  fetchOptions?: MergedRequestInit | undefined;

  /**
   * Specify a custom `fetch` function implementation.
   *
   * If not provided, we expect that `fetch` is defined globally.
   */
  fetch?: Fetch | undefined;

  /**
   * The maximum number of times that the client will retry a request in case of a
   * temporary failure, like a network error or a 5XX error from the server.
   *
   * @default 2
   */
  maxRetries?: number | undefined;

  /**
   * Default headers to include with every request to the API.
   *
   * These can be removed in individual requests by explicitly setting the
   * header to `null` in request options.
   */
  defaultHeaders?: HeadersLike | undefined;

  /**
   * Default query parameters to include with every request to the API.
   *
   * These can be removed in individual requests by explicitly setting the
   * param to `undefined` in request options.
   */
  defaultQuery?: Record<string, string | undefined> | undefined;

  /**
   * Set the log level.
   *
   * Defaults to process.env['LITHIC_LOG'] or 'warn' if it isn't set.
   */
  logLevel?: LogLevel | undefined;

  /**
   * Set the logger.
   *
   * Defaults to globalThis.console.
   */
  logger?: Logger | undefined;
}

/**
 * API Client for interfacing with the Lithic API.
 */
export class Lithic {
  apiKey: string;
  webhookSecret: string | null;

  baseURL: string;
  maxRetries: number;
  timeout: number;
  logger: Logger | undefined;
  logLevel: LogLevel | undefined;
  fetchOptions: MergedRequestInit | undefined;

  private fetch: Fetch;
  #encoder: Opts.RequestEncoder;
  protected idempotencyHeader?: string;
  private _options: ClientOptions;

  /**
   * API Client for interfacing with the Lithic API.
   *
   * @param {string | undefined} [opts.apiKey=process.env['LITHIC_API_KEY'] ?? undefined]
   * @param {string | null | undefined} [opts.webhookSecret=process.env['LITHIC_WEBHOOK_SECRET'] ?? null]
   * @param {Environment} [opts.environment=production] - Specifies the environment URL to use for the API.
   * @param {string} [opts.baseURL=process.env['LITHIC_BASE_URL'] ?? https://api.lithic.com] - Override the default base URL for the API.
   * @param {number} [opts.timeout=1 minute] - The maximum amount of time (in milliseconds) the client will wait for a response before timing out.
   * @param {MergedRequestInit} [opts.fetchOptions] - Additional `RequestInit` options to be passed to `fetch` calls.
   * @param {Fetch} [opts.fetch] - Specify a custom `fetch` function implementation.
   * @param {number} [opts.maxRetries=2] - The maximum number of times the client will retry a request.
   * @param {HeadersLike} opts.defaultHeaders - Default headers to include with every request to the API.
   * @param {Record<string, string | undefined>} opts.defaultQuery - Default query parameters to include with every request to the API.
   */
  constructor({
    baseURL = readEnv('LITHIC_BASE_URL'),
    apiKey = readEnv('LITHIC_API_KEY'),
    webhookSecret = readEnv('LITHIC_WEBHOOK_SECRET') ?? null,
    ...opts
  }: ClientOptions = {}) {
    if (apiKey === undefined) {
      throw new Errors.LithicError(
        "The LITHIC_API_KEY environment variable is missing or empty; either provide it, or instantiate the Lithic client with an apiKey option, like new Lithic({ apiKey: 'My Lithic API Key' }).",
      );
    }

    const options: ClientOptions = {
      apiKey,
      webhookSecret,
      ...opts,
      baseURL,
      environment: opts.environment ?? 'production',
    };

    if (baseURL && opts.environment) {
      throw new Errors.LithicError(
        'Ambiguous URL; The `baseURL` option (or LITHIC_BASE_URL env var) and the `environment` option are given. If you want to use the environment you must pass baseURL: null',
      );
    }

    this.baseURL = options.baseURL || environments[options.environment || 'production'];
    this.timeout = options.timeout ?? Lithic.DEFAULT_TIMEOUT /* 1 minute */;
    this.logger = options.logger ?? console;
    const defaultLogLevel = 'warn';
    // Set default logLevel early so that we can log a warning in parseLogLevel.
    this.logLevel = defaultLogLevel;
    this.logLevel =
      parseLogLevel(options.logLevel, 'ClientOptions.logLevel', this) ??
      parseLogLevel(readEnv('LITHIC_LOG'), "process.env['LITHIC_LOG']", this) ??
      defaultLogLevel;
    this.fetchOptions = options.fetchOptions;
    this.maxRetries = options.maxRetries ?? 2;
    this.fetch = options.fetch ?? Shims.getDefaultFetch();
    this.#encoder = Opts.FallbackEncoder;

    this._options = options;

    this.apiKey = apiKey;
    this.webhookSecret = webhookSecret;
  }

  /**
   * Create a new client instance re-using the same options given to the current client with optional overriding.
   */
  withOptions(options: Partial<ClientOptions>): this {
    const client = new (this.constructor as any as new (props: ClientOptions) => typeof this)({
      ...this._options,
      environment: options.environment ? options.environment : undefined,
      baseURL: options.environment ? undefined : this.baseURL,
      maxRetries: this.maxRetries,
      timeout: this.timeout,
      logger: this.logger,
      logLevel: this.logLevel,
      fetch: this.fetch,
      fetchOptions: this.fetchOptions,
      apiKey: this.apiKey,
      webhookSecret: this.webhookSecret,
      ...options,
    });
    return client;
  }

  /**
   * Check whether the base URL is set to its default.
   */
  #baseURLOverridden(): boolean {
    return this.baseURL !== environments[this._options.environment || 'production'];
  }

  /**
   * Status of api
   */
  apiStatus(options?: RequestOptions): APIPromise<TopLevelAPI.APIStatus> {
    return this.get('/v1/status', options);
  }

  protected defaultQuery(): Record<string, string | undefined> | undefined {
    return this._options.defaultQuery;
  }

  protected validateHeaders({ values, nulls }: NullableHeaders) {
    return;
  }

  protected async authHeaders(opts: FinalRequestOptions): Promise<NullableHeaders | undefined> {
    return buildHeaders([{ Authorization: this.apiKey }]);
  }

  protected stringifyQuery(query: Record<string, unknown>): string {
    return qs.stringify(query, { arrayFormat: 'comma' });
  }

  private getUserAgent(): string {
    return `${this.constructor.name}/JS ${VERSION}`;
  }

  protected defaultIdempotencyKey(): string {
    return `stainless-node-retry-${uuid4()}`;
  }

  protected makeStatusError(
    status: number,
    error: Object,
    message: string | undefined,
    headers: Headers,
  ): Errors.APIError {
    return Errors.APIError.generate(status, error, message, headers);
  }

  buildURL(
    path: string,
    query: Record<string, unknown> | null | undefined,
    defaultBaseURL?: string | undefined,
  ): string {
    const baseURL = (!this.#baseURLOverridden() && defaultBaseURL) || this.baseURL;
    const url =
      isAbsoluteURL(path) ?
        new URL(path)
      : new URL(baseURL + (baseURL.endsWith('/') && path.startsWith('/') ? path.slice(1) : path));

    const defaultQuery = this.defaultQuery();
    if (!isEmptyObj(defaultQuery)) {
      query = { ...defaultQuery, ...query };
    }

    if (typeof query === 'object' && query && !Array.isArray(query)) {
      url.search = this.stringifyQuery(query as Record<string, unknown>);
    }

    return url.toString();
  }

  /**
   * Used as a callback for mutating the given `FinalRequestOptions` object.
   */
  protected async prepareOptions(options: FinalRequestOptions): Promise<void> {}

  /**
   * Used as a callback for mutating the given `RequestInit` object.
   *
   * This is useful for cases where you want to add certain headers based off of
   * the request properties, e.g. `method` or `url`.
   */
  protected async prepareRequest(
    request: RequestInit,
    { url, options }: { url: string; options: FinalRequestOptions },
  ): Promise<void> {}

  get<Rsp>(path: string, opts?: PromiseOrValue<RequestOptions>): APIPromise<Rsp> {
    return this.methodRequest('get', path, opts);
  }

  post<Rsp>(path: string, opts?: PromiseOrValue<RequestOptions>): APIPromise<Rsp> {
    return this.methodRequest('post', path, opts);
  }

  patch<Rsp>(path: string, opts?: PromiseOrValue<RequestOptions>): APIPromise<Rsp> {
    return this.methodRequest('patch', path, opts);
  }

  put<Rsp>(path: string, opts?: PromiseOrValue<RequestOptions>): APIPromise<Rsp> {
    return this.methodRequest('put', path, opts);
  }

  delete<Rsp>(path: string, opts?: PromiseOrValue<RequestOptions>): APIPromise<Rsp> {
    return this.methodRequest('delete', path, opts);
  }

  private methodRequest<Rsp>(
    method: HTTPMethod,
    path: string,
    opts?: PromiseOrValue<RequestOptions>,
  ): APIPromise<Rsp> {
    return this.request(
      Promise.resolve(opts).then((opts) => {
        return { method, path, ...opts };
      }),
    );
  }

  request<Rsp>(
    options: PromiseOrValue<FinalRequestOptions>,
    remainingRetries: number | null = null,
  ): APIPromise<Rsp> {
    return new APIPromise(this, this.makeRequest(options, remainingRetries, undefined));
  }

  private async makeRequest(
    optionsInput: PromiseOrValue<FinalRequestOptions>,
    retriesRemaining: number | null,
    retryOfRequestLogID: string | undefined,
  ): Promise<APIResponseProps> {
    const options = await optionsInput;
    const maxRetries = options.maxRetries ?? this.maxRetries;
    if (retriesRemaining == null) {
      retriesRemaining = maxRetries;
    }

    await this.prepareOptions(options);

    const { req, url, timeout } = await this.buildRequest(options, {
      retryCount: maxRetries - retriesRemaining,
    });

    await this.prepareRequest(req, { url, options });

    /** Not an API request ID, just for correlating local log entries. */
    const requestLogID = 'log_' + ((Math.random() * (1 << 24)) | 0).toString(16).padStart(6, '0');
    const retryLogStr = retryOfRequestLogID === undefined ? '' : `, retryOf: ${retryOfRequestLogID}`;
    const startTime = Date.now();

    loggerFor(this).debug(
      `[${requestLogID}] sending request`,
      formatRequestDetails({
        retryOfRequestLogID,
        method: options.method,
        url,
        options,
        headers: req.headers,
      }),
    );

    if (options.signal?.aborted) {
      throw new Errors.APIUserAbortError();
    }

    const controller = new AbortController();
    const response = await this.fetchWithTimeout(url, req, timeout, controller).catch(castToError);
    const headersTime = Date.now();

    if (response instanceof globalThis.Error) {
      const retryMessage = `retrying, ${retriesRemaining} attempts remaining`;
      if (options.signal?.aborted) {
        throw new Errors.APIUserAbortError();
      }
      // detect native connection timeout errors
      // deno throws "TypeError: error sending request for url (https://example/): client error (Connect): tcp connect error: Operation timed out (os error 60): Operation timed out (os error 60)"
      // undici throws "TypeError: fetch failed" with cause "ConnectTimeoutError: Connect Timeout Error (attempted address: example:443, timeout: 1ms)"
      // others do not provide enough information to distinguish timeouts from other connection errors
      const isTimeout =
        isAbortError(response) ||
        /timed? ?out/i.test(String(response) + ('cause' in response ? String(response.cause) : ''));
      if (retriesRemaining) {
        loggerFor(this).info(
          `[${requestLogID}] connection ${isTimeout ? 'timed out' : 'failed'} - ${retryMessage}`,
        );
        loggerFor(this).debug(
          `[${requestLogID}] connection ${isTimeout ? 'timed out' : 'failed'} (${retryMessage})`,
          formatRequestDetails({
            retryOfRequestLogID,
            url,
            durationMs: headersTime - startTime,
            message: response.message,
          }),
        );
        return this.retryRequest(options, retriesRemaining, retryOfRequestLogID ?? requestLogID);
      }
      loggerFor(this).info(
        `[${requestLogID}] connection ${isTimeout ? 'timed out' : 'failed'} - error; no more retries left`,
      );
      loggerFor(this).debug(
        `[${requestLogID}] connection ${isTimeout ? 'timed out' : 'failed'} (error; no more retries left)`,
        formatRequestDetails({
          retryOfRequestLogID,
          url,
          durationMs: headersTime - startTime,
          message: response.message,
        }),
      );
      if (isTimeout) {
        throw new Errors.APIConnectionTimeoutError();
      }
      throw new Errors.APIConnectionError({ cause: response });
    }

    const responseInfo = `[${requestLogID}${retryLogStr}] ${req.method} ${url} ${
      response.ok ? 'succeeded' : 'failed'
    } with status ${response.status} in ${headersTime - startTime}ms`;

    if (!response.ok) {
      const shouldRetry = await this.shouldRetry(response);
      if (retriesRemaining && shouldRetry) {
        const retryMessage = `retrying, ${retriesRemaining} attempts remaining`;

        // We don't need the body of this response.
        await Shims.CancelReadableStream(response.body);
        loggerFor(this).info(`${responseInfo} - ${retryMessage}`);
        loggerFor(this).debug(
          `[${requestLogID}] response error (${retryMessage})`,
          formatRequestDetails({
            retryOfRequestLogID,
            url: response.url,
            status: response.status,
            headers: response.headers,
            durationMs: headersTime - startTime,
          }),
        );
        return this.retryRequest(
          options,
          retriesRemaining,
          retryOfRequestLogID ?? requestLogID,
          response.headers,
        );
      }

      const retryMessage = shouldRetry ? `error; no more retries left` : `error; not retryable`;

      loggerFor(this).info(`${responseInfo} - ${retryMessage}`);

      const errText = await response.text().catch((err: any) => castToError(err).message);
      const errJSON = safeJSON(errText);
      const errMessage = errJSON ? undefined : errText;

      loggerFor(this).debug(
        `[${requestLogID}] response error (${retryMessage})`,
        formatRequestDetails({
          retryOfRequestLogID,
          url: response.url,
          status: response.status,
          headers: response.headers,
          message: errMessage,
          durationMs: Date.now() - startTime,
        }),
      );

      const err = this.makeStatusError(response.status, errJSON, errMessage, response.headers);
      throw err;
    }

    loggerFor(this).info(responseInfo);
    loggerFor(this).debug(
      `[${requestLogID}] response start`,
      formatRequestDetails({
        retryOfRequestLogID,
        url: response.url,
        status: response.status,
        headers: response.headers,
        durationMs: headersTime - startTime,
      }),
    );

    return { response, options, controller, requestLogID, retryOfRequestLogID, startTime };
  }

  getAPIList<Item, PageClass extends Pagination.AbstractPage<Item> = Pagination.AbstractPage<Item>>(
    path: string,
    Page: new (...args: any[]) => PageClass,
    opts?: RequestOptions,
  ): Pagination.PagePromise<PageClass, Item> {
    return this.requestAPIList(Page, { method: 'get', path, ...opts });
  }

  requestAPIList<
    Item = unknown,
    PageClass extends Pagination.AbstractPage<Item> = Pagination.AbstractPage<Item>,
  >(
    Page: new (...args: ConstructorParameters<typeof Pagination.AbstractPage>) => PageClass,
    options: FinalRequestOptions,
  ): Pagination.PagePromise<PageClass, Item> {
    const request = this.makeRequest(options, null, undefined);
    return new Pagination.PagePromise<PageClass, Item>(this as any as Lithic, request, Page);
  }

  async fetchWithTimeout(
    url: RequestInfo,
    init: RequestInit | undefined,
    ms: number,
    controller: AbortController,
  ): Promise<Response> {
    const { signal, method, ...options } = init || {};
    if (signal) signal.addEventListener('abort', () => controller.abort());

    const timeout = setTimeout(() => controller.abort(), ms);

    const isReadableBody =
      ((globalThis as any).ReadableStream && options.body instanceof (globalThis as any).ReadableStream) ||
      (typeof options.body === 'object' && options.body !== null && Symbol.asyncIterator in options.body);

    const fetchOptions: RequestInit = {
      signal: controller.signal as any,
      ...(isReadableBody ? { duplex: 'half' } : {}),
      method: 'GET',
      ...options,
    };
    if (method) {
      // Custom methods like 'patch' need to be uppercased
      // See https://github.com/nodejs/undici/issues/2294
      fetchOptions.method = method.toUpperCase();
    }

    try {
      // use undefined this binding; fetch errors if bound to something else in browser/cloudflare
      return await this.fetch.call(undefined, url, fetchOptions);
    } finally {
      clearTimeout(timeout);
    }
  }

  private async shouldRetry(response: Response): Promise<boolean> {
    // Note this is not a standard header.
    const shouldRetryHeader = response.headers.get('x-should-retry');

    // If the server explicitly says whether or not to retry, obey.
    if (shouldRetryHeader === 'true') return true;
    if (shouldRetryHeader === 'false') return false;

    // Retry on request timeouts.
    if (response.status === 408) return true;

    // Retry on lock timeouts.
    if (response.status === 409) return true;

    // Retry on rate limits.
    if (response.status === 429) return true;

    // Retry internal errors.
    if (response.status >= 500) return true;

    return false;
  }

  private async retryRequest(
    options: FinalRequestOptions,
    retriesRemaining: number,
    requestLogID: string,
    responseHeaders?: Headers | undefined,
  ): Promise<APIResponseProps> {
    let timeoutMillis: number | undefined;

    // Note the `retry-after-ms` header may not be standard, but is a good idea and we'd like proactive support for it.
    const retryAfterMillisHeader = responseHeaders?.get('retry-after-ms');
    if (retryAfterMillisHeader) {
      const timeoutMs = parseFloat(retryAfterMillisHeader);
      if (!Number.isNaN(timeoutMs)) {
        timeoutMillis = timeoutMs;
      }
    }

    // About the Retry-After header: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Retry-After
    const retryAfterHeader = responseHeaders?.get('retry-after');
    if (retryAfterHeader && !timeoutMillis) {
      const timeoutSeconds = parseFloat(retryAfterHeader);
      if (!Number.isNaN(timeoutSeconds)) {
        timeoutMillis = timeoutSeconds * 1000;
      } else {
        timeoutMillis = Date.parse(retryAfterHeader) - Date.now();
      }
    }

    // If the API asks us to wait a certain amount of time (and it's a reasonable amount),
    // just do what it says, but otherwise calculate a default
    if (!(timeoutMillis && 0 <= timeoutMillis && timeoutMillis < 60 * 1000)) {
      const maxRetries = options.maxRetries ?? this.maxRetries;
      timeoutMillis = this.calculateDefaultRetryTimeoutMillis(retriesRemaining, maxRetries);
    }
    await sleep(timeoutMillis);

    return this.makeRequest(options, retriesRemaining - 1, requestLogID);
  }

  private calculateDefaultRetryTimeoutMillis(retriesRemaining: number, maxRetries: number): number {
    const initialRetryDelay = 0.5;
    const maxRetryDelay = 8.0;

    const numRetries = maxRetries - retriesRemaining;

    // Apply exponential backoff, but not more than the max.
    const sleepSeconds = Math.min(initialRetryDelay * Math.pow(2, numRetries), maxRetryDelay);

    // Apply some jitter, take up to at most 25 percent of the retry time.
    const jitter = 1 - Math.random() * 0.25;

    return sleepSeconds * jitter * 1000;
  }

  async buildRequest(
    inputOptions: FinalRequestOptions,
    { retryCount = 0 }: { retryCount?: number } = {},
  ): Promise<{ req: FinalizedRequestInit; url: string; timeout: number }> {
    const options = { ...inputOptions };
    const { method, path, query, defaultBaseURL } = options;

    const url = this.buildURL(path!, query as Record<string, unknown>, defaultBaseURL);
    if ('timeout' in options) validatePositiveInteger('timeout', options.timeout);
    options.timeout = options.timeout ?? this.timeout;
    const { bodyHeaders, body } = this.buildBody({ options });
    const reqHeaders = await this.buildHeaders({ options: inputOptions, method, bodyHeaders, retryCount });

    const req: FinalizedRequestInit = {
      method,
      headers: reqHeaders,
      ...(options.signal && { signal: options.signal }),
      ...((globalThis as any).ReadableStream &&
        body instanceof (globalThis as any).ReadableStream && { duplex: 'half' }),
      ...(body && { body }),
      ...((this.fetchOptions as any) ?? {}),
      ...((options.fetchOptions as any) ?? {}),
    };

    return { req, url, timeout: options.timeout };
  }

  private async buildHeaders({
    options,
    method,
    bodyHeaders,
    retryCount,
  }: {
    options: FinalRequestOptions;
    method: HTTPMethod;
    bodyHeaders: HeadersLike;
    retryCount: number;
  }): Promise<Headers> {
    let idempotencyHeaders: HeadersLike = {};
    if (this.idempotencyHeader && method !== 'get') {
      if (!options.idempotencyKey) options.idempotencyKey = this.defaultIdempotencyKey();
      idempotencyHeaders[this.idempotencyHeader] = options.idempotencyKey;
    }

    const headers = buildHeaders([
      idempotencyHeaders,
      {
        Accept: 'application/json',
        'User-Agent': this.getUserAgent(),
        'X-Stainless-Retry-Count': String(retryCount),
        ...(options.timeout ? { 'X-Stainless-Timeout': String(Math.trunc(options.timeout / 1000)) } : {}),
        ...getPlatformHeaders(),
        'X-Lithic-Pagination': 'cursor',
      },
      await this.authHeaders(options),
      this._options.defaultHeaders,
      bodyHeaders,
      options.headers,
    ]);

    this.validateHeaders(headers);

    return headers.values;
  }

  private buildBody({ options: { body, headers: rawHeaders } }: { options: FinalRequestOptions }): {
    bodyHeaders: HeadersLike;
    body: BodyInit | undefined;
  } {
    if (!body) {
      return { bodyHeaders: undefined, body: undefined };
    }
    const headers = buildHeaders([rawHeaders]);
    if (
      // Pass raw type verbatim
      ArrayBuffer.isView(body) ||
      body instanceof ArrayBuffer ||
      body instanceof DataView ||
      (typeof body === 'string' &&
        // Preserve legacy string encoding behavior for now
        headers.values.has('content-type')) ||
      // `Blob` is superset of `File`
      ((globalThis as any).Blob && body instanceof (globalThis as any).Blob) ||
      // `FormData` -> `multipart/form-data`
      body instanceof FormData ||
      // `URLSearchParams` -> `application/x-www-form-urlencoded`
      body instanceof URLSearchParams ||
      // Send chunked stream (each chunk has own `length`)
      ((globalThis as any).ReadableStream && body instanceof (globalThis as any).ReadableStream)
    ) {
      return { bodyHeaders: undefined, body: body as BodyInit };
    } else if (
      typeof body === 'object' &&
      (Symbol.asyncIterator in body ||
        (Symbol.iterator in body && 'next' in body && typeof body.next === 'function'))
    ) {
      return { bodyHeaders: undefined, body: Shims.ReadableStreamFrom(body as AsyncIterable<Uint8Array>) };
    } else {
      return this.#encoder({ body, headers });
    }
  }

  static Lithic = this;
  static DEFAULT_TIMEOUT = 60000; // 1 minute

  static LithicError = Errors.LithicError;
  static APIError = Errors.APIError;
  static APIConnectionError = Errors.APIConnectionError;
  static APIConnectionTimeoutError = Errors.APIConnectionTimeoutError;
  static APIUserAbortError = Errors.APIUserAbortError;
  static NotFoundError = Errors.NotFoundError;
  static ConflictError = Errors.ConflictError;
  static RateLimitError = Errors.RateLimitError;
  static BadRequestError = Errors.BadRequestError;
  static AuthenticationError = Errors.AuthenticationError;
  static InternalServerError = Errors.InternalServerError;
  static PermissionDeniedError = Errors.PermissionDeniedError;
  static UnprocessableEntityError = Errors.UnprocessableEntityError;

  static toFile = Uploads.toFile;

  accounts: API.Accounts = new API.Accounts(this);
  accountHolders: API.AccountHolders = new API.AccountHolders(this);
  authRules: API.AuthRules = new API.AuthRules(this);
  authStreamEnrollment: API.AuthStreamEnrollment = new API.AuthStreamEnrollment(this);
  tokenizationDecisioning: API.TokenizationDecisioning = new API.TokenizationDecisioning(this);
  tokenizations: API.Tokenizations = new API.Tokenizations(this);
  cards: API.Cards = new API.Cards(this);
  balances: API.Balances = new API.Balances(this);
  aggregateBalances: API.AggregateBalances = new API.AggregateBalances(this);
  disputes: API.Disputes = new API.Disputes(this);
  events: API.Events = new API.Events(this);
  transfers: API.Transfers = new API.Transfers(this);
  financialAccounts: API.FinancialAccounts = new API.FinancialAccounts(this);
  transactions: API.Transactions = new API.Transactions(this);
  responderEndpoints: API.ResponderEndpoints = new API.ResponderEndpoints(this);
  externalBankAccounts: API.ExternalBankAccounts = new API.ExternalBankAccounts(this);
  payments: API.Payments = new API.Payments(this);
  threeDS: API.ThreeDS = new API.ThreeDS(this);
  reports: API.Reports = new API.Reports(this);
  cardPrograms: API.CardPrograms = new API.CardPrograms(this);
  digitalCardArt: API.DigitalCardArtResource = new API.DigitalCardArtResource(this);
  bookTransfers: API.BookTransfers = new API.BookTransfers(this);
  creditProducts: API.CreditProducts = new API.CreditProducts(this);
  externalPayments: API.ExternalPayments = new API.ExternalPayments(this);
  managementOperations: API.ManagementOperations = new API.ManagementOperations(this);
  fundingEvents: API.FundingEvents = new API.FundingEvents(this);
  fraud: API.Fraud = new API.Fraud(this);
  networkPrograms: API.NetworkPrograms = new API.NetworkPrograms(this);
  accountActivity: API.AccountActivity = new API.AccountActivity(this);
}

Lithic.Accounts = Accounts;
Lithic.AccountHolders = AccountHolders;
Lithic.AuthRules = AuthRules;
Lithic.AuthStreamEnrollment = AuthStreamEnrollment;
Lithic.TokenizationDecisioning = TokenizationDecisioning;
Lithic.Tokenizations = Tokenizations;
Lithic.Cards = Cards;
Lithic.Balances = Balances;
Lithic.AggregateBalances = AggregateBalances;
Lithic.Disputes = Disputes;
Lithic.Events = Events;
Lithic.Transfers = Transfers;
Lithic.FinancialAccounts = FinancialAccounts;
Lithic.Transactions = Transactions;
Lithic.ResponderEndpoints = ResponderEndpoints;
Lithic.ExternalBankAccounts = ExternalBankAccounts;
Lithic.Payments = Payments;
Lithic.ThreeDS = ThreeDS;
Lithic.Reports = Reports;
Lithic.CardPrograms = CardPrograms;
Lithic.DigitalCardArtResource = DigitalCardArtResource;
Lithic.BookTransfers = BookTransfers;
Lithic.CreditProducts = CreditProducts;
Lithic.ExternalPayments = ExternalPayments;
Lithic.ManagementOperations = ManagementOperations;
Lithic.FundingEvents = FundingEvents;
Lithic.Fraud = Fraud;
Lithic.NetworkPrograms = NetworkPrograms;
Lithic.AccountActivity = AccountActivity;

export declare namespace Lithic {
  export type RequestOptions = Opts.RequestOptions;

  export import CursorPage = Pagination.CursorPage;
  export { type CursorPageParams as CursorPageParams, type CursorPageResponse as CursorPageResponse };

  export import SinglePage = Pagination.SinglePage;
  export { type SinglePageResponse as SinglePageResponse };

  export { type APIStatus as APIStatus };

  export {
    Accounts as Accounts,
    type Account as Account,
    type AccountSpendLimits as AccountSpendLimits,
    type AccountsCursorPage as AccountsCursorPage,
    type AccountUpdateParams as AccountUpdateParams,
    type AccountListParams as AccountListParams,
  };

  export {
    AccountHolders as AccountHolders,
    type AccountHolder as AccountHolder,
    type AddressUpdate as AddressUpdate,
    type KYB as KYB,
    type KYBBusinessEntity as KYBBusinessEntity,
    type KYC as KYC,
    type KYCExempt as KYCExempt,
    type RequiredDocument as RequiredDocument,
    type AccountHolderCreateResponse as AccountHolderCreateResponse,
    type AccountHolderUpdateResponse as AccountHolderUpdateResponse,
    type AccountHolderListDocumentsResponse as AccountHolderListDocumentsResponse,
    type AccountHolderSimulateEnrollmentReviewResponse as AccountHolderSimulateEnrollmentReviewResponse,
    type AccountHoldersSinglePage as AccountHoldersSinglePage,
    type AccountHolderCreateParams as AccountHolderCreateParams,
    type AccountHolderUpdateParams as AccountHolderUpdateParams,
    type AccountHolderListParams as AccountHolderListParams,
    type AccountHolderRetrieveDocumentParams as AccountHolderRetrieveDocumentParams,
    type AccountHolderSimulateEnrollmentDocumentReviewParams as AccountHolderSimulateEnrollmentDocumentReviewParams,
    type AccountHolderSimulateEnrollmentReviewParams as AccountHolderSimulateEnrollmentReviewParams,
    type AccountHolderUploadDocumentParams as AccountHolderUploadDocumentParams,
  };

  export { AuthRules as AuthRules };

  export { AuthStreamEnrollment as AuthStreamEnrollment, type AuthStreamSecret as AuthStreamSecret };

  export {
    TokenizationDecisioning as TokenizationDecisioning,
    type TokenizationSecret as TokenizationSecret,
    type TokenizationDecisioningRotateSecretResponse as TokenizationDecisioningRotateSecretResponse,
  };

  export {
    Tokenizations as Tokenizations,
    type Tokenization as Tokenization,
    type TokenizationSimulateResponse as TokenizationSimulateResponse,
    type TokenizationUpdateDigitalCardArtResponse as TokenizationUpdateDigitalCardArtResponse,
    type TokenizationsCursorPage as TokenizationsCursorPage,
    type TokenizationListParams as TokenizationListParams,
    type TokenizationResendActivationCodeParams as TokenizationResendActivationCodeParams,
    type TokenizationSimulateParams as TokenizationSimulateParams,
    type TokenizationUpdateDigitalCardArtParams as TokenizationUpdateDigitalCardArtParams,
  };

  export {
    Cards as Cards,
    type Card as Card,
    type CardSpendLimits as CardSpendLimits,
    type NonPCICard as NonPCICard,
    type ProvisionResponse as ProvisionResponse,
    type SpendLimitDuration as SpendLimitDuration,
    type CardEmbedResponse as CardEmbedResponse,
    type CardProvisionResponse as CardProvisionResponse,
    type CardWebProvisionResponse as CardWebProvisionResponse,
    type NonPCICardsCursorPage as NonPCICardsCursorPage,
    type CardCreateParams as CardCreateParams,
    type CardUpdateParams as CardUpdateParams,
    type CardListParams as CardListParams,
    type CardConvertPhysicalParams as CardConvertPhysicalParams,
    type CardEmbedParams as CardEmbedParams,
    type CardProvisionParams as CardProvisionParams,
    type CardReissueParams as CardReissueParams,
    type CardRenewParams as CardRenewParams,
    type CardSearchByPanParams as CardSearchByPanParams,
    type CardWebProvisionParams as CardWebProvisionParams,
  };

  export {
    Balances as Balances,
    type Balance as Balance,
    type BalancesSinglePage as BalancesSinglePage,
    type BalanceListParams as BalanceListParams,
  };

  export {
    AggregateBalances as AggregateBalances,
    type AggregateBalance as AggregateBalance,
    type AggregateBalancesSinglePage as AggregateBalancesSinglePage,
    type AggregateBalanceListParams as AggregateBalanceListParams,
  };

  export {
    Disputes as Disputes,
    type Dispute as Dispute,
    type DisputeEvidence as DisputeEvidence,
    type DisputesCursorPage as DisputesCursorPage,
    type DisputeEvidencesCursorPage as DisputeEvidencesCursorPage,
    type DisputeCreateParams as DisputeCreateParams,
    type DisputeUpdateParams as DisputeUpdateParams,
    type DisputeListParams as DisputeListParams,
    type DisputeDeleteEvidenceParams as DisputeDeleteEvidenceParams,
    type DisputeInitiateEvidenceUploadParams as DisputeInitiateEvidenceUploadParams,
    type DisputeListEvidencesParams as DisputeListEvidencesParams,
    type DisputeRetrieveEvidenceParams as DisputeRetrieveEvidenceParams,
  };

  export {
    Events as Events,
    type Event as Event,
    type EventSubscription as EventSubscription,
    type MessageAttempt as MessageAttempt,
    type EventsCursorPage as EventsCursorPage,
    type MessageAttemptsCursorPage as MessageAttemptsCursorPage,
    type EventListParams as EventListParams,
    type EventListAttemptsParams as EventListAttemptsParams,
  };

  export {
    Transfers as Transfers,
    type Transfer as Transfer,
    type TransferCreateParams as TransferCreateParams,
  };

  export {
    FinancialAccounts as FinancialAccounts,
    type FinancialAccount as FinancialAccount,
    type FinancialTransaction as FinancialTransaction,
    type FinancialAccountsSinglePage as FinancialAccountsSinglePage,
    type FinancialAccountCreateParams as FinancialAccountCreateParams,
    type FinancialAccountUpdateParams as FinancialAccountUpdateParams,
    type FinancialAccountListParams as FinancialAccountListParams,
    type FinancialAccountRegisterAccountNumberParams as FinancialAccountRegisterAccountNumberParams,
    type FinancialAccountUpdateStatusParams as FinancialAccountUpdateStatusParams,
  };

  export {
    Transactions as Transactions,
    type Transaction as Transaction,
    type TransactionSimulateAuthorizationResponse as TransactionSimulateAuthorizationResponse,
    type TransactionSimulateAuthorizationAdviceResponse as TransactionSimulateAuthorizationAdviceResponse,
    type TransactionSimulateClearingResponse as TransactionSimulateClearingResponse,
    type TransactionSimulateCreditAuthorizationResponse as TransactionSimulateCreditAuthorizationResponse,
    type TransactionSimulateCreditAuthorizationAdviceResponse as TransactionSimulateCreditAuthorizationAdviceResponse,
    type TransactionSimulateReturnResponse as TransactionSimulateReturnResponse,
    type TransactionSimulateReturnReversalResponse as TransactionSimulateReturnReversalResponse,
    type TransactionSimulateVoidResponse as TransactionSimulateVoidResponse,
    type TransactionsCursorPage as TransactionsCursorPage,
    type TransactionListParams as TransactionListParams,
    type TransactionSimulateAuthorizationParams as TransactionSimulateAuthorizationParams,
    type TransactionSimulateAuthorizationAdviceParams as TransactionSimulateAuthorizationAdviceParams,
    type TransactionSimulateClearingParams as TransactionSimulateClearingParams,
    type TransactionSimulateCreditAuthorizationParams as TransactionSimulateCreditAuthorizationParams,
    type TransactionSimulateCreditAuthorizationAdviceParams as TransactionSimulateCreditAuthorizationAdviceParams,
    type TransactionSimulateReturnParams as TransactionSimulateReturnParams,
    type TransactionSimulateReturnReversalParams as TransactionSimulateReturnReversalParams,
    type TransactionSimulateVoidParams as TransactionSimulateVoidParams,
  };

  export {
    ResponderEndpoints as ResponderEndpoints,
    type ResponderEndpointStatus as ResponderEndpointStatus,
    type ResponderEndpointCreateResponse as ResponderEndpointCreateResponse,
    type ResponderEndpointCreateParams as ResponderEndpointCreateParams,
    type ResponderEndpointDeleteParams as ResponderEndpointDeleteParams,
    type ResponderEndpointCheckStatusParams as ResponderEndpointCheckStatusParams,
  };

  export {
    ExternalBankAccounts as ExternalBankAccounts,
    type ExternalBankAccountAddress as ExternalBankAccountAddress,
    type OwnerType as OwnerType,
    type VerificationMethod as VerificationMethod,
    type ExternalBankAccountCreateResponse as ExternalBankAccountCreateResponse,
    type ExternalBankAccountRetrieveResponse as ExternalBankAccountRetrieveResponse,
    type ExternalBankAccountUpdateResponse as ExternalBankAccountUpdateResponse,
    type ExternalBankAccountListResponse as ExternalBankAccountListResponse,
    type ExternalBankAccountRetryMicroDepositsResponse as ExternalBankAccountRetryMicroDepositsResponse,
    type ExternalBankAccountRetryPrenoteResponse as ExternalBankAccountRetryPrenoteResponse,
    type ExternalBankAccountListResponsesCursorPage as ExternalBankAccountListResponsesCursorPage,
    type ExternalBankAccountCreateParams as ExternalBankAccountCreateParams,
    type ExternalBankAccountUpdateParams as ExternalBankAccountUpdateParams,
    type ExternalBankAccountListParams as ExternalBankAccountListParams,
    type ExternalBankAccountRetryMicroDepositsParams as ExternalBankAccountRetryMicroDepositsParams,
    type ExternalBankAccountRetryPrenoteParams as ExternalBankAccountRetryPrenoteParams,
  };

  export {
    Payments as Payments,
    type Payment as Payment,
    type PaymentCreateResponse as PaymentCreateResponse,
    type PaymentRetryResponse as PaymentRetryResponse,
    type PaymentSimulateActionResponse as PaymentSimulateActionResponse,
    type PaymentSimulateReceiptResponse as PaymentSimulateReceiptResponse,
    type PaymentSimulateReleaseResponse as PaymentSimulateReleaseResponse,
    type PaymentSimulateReturnResponse as PaymentSimulateReturnResponse,
    type PaymentsCursorPage as PaymentsCursorPage,
    type PaymentCreateParams as PaymentCreateParams,
    type PaymentListParams as PaymentListParams,
    type PaymentSimulateActionParams as PaymentSimulateActionParams,
    type PaymentSimulateReceiptParams as PaymentSimulateReceiptParams,
    type PaymentSimulateReleaseParams as PaymentSimulateReleaseParams,
    type PaymentSimulateReturnParams as PaymentSimulateReturnParams,
  };

  export { ThreeDS as ThreeDS };

  export {
    Reports as Reports,
    type SettlementDetail as SettlementDetail,
    type SettlementReport as SettlementReport,
    type SettlementSummaryDetails as SettlementSummaryDetails,
  };

  export {
    CardPrograms as CardPrograms,
    type CardProgram as CardProgram,
    type CardProgramsCursorPage as CardProgramsCursorPage,
    type CardProgramListParams as CardProgramListParams,
  };

  export {
    DigitalCardArtResource as DigitalCardArtResource,
    type DigitalCardArt as DigitalCardArt,
    type DigitalCardArtsCursorPage as DigitalCardArtsCursorPage,
    type DigitalCardArtListParams as DigitalCardArtListParams,
  };

  export {
    BookTransfers as BookTransfers,
    type BookTransferResponse as BookTransferResponse,
    type BookTransferResponsesCursorPage as BookTransferResponsesCursorPage,
    type BookTransferCreateParams as BookTransferCreateParams,
    type BookTransferListParams as BookTransferListParams,
    type BookTransferReverseParams as BookTransferReverseParams,
  };

  export { CreditProducts as CreditProducts };

  export {
    ExternalPayments as ExternalPayments,
    type ExternalPayment as ExternalPayment,
    type ExternalPaymentsCursorPage as ExternalPaymentsCursorPage,
    type ExternalPaymentCreateParams as ExternalPaymentCreateParams,
    type ExternalPaymentListParams as ExternalPaymentListParams,
    type ExternalPaymentCancelParams as ExternalPaymentCancelParams,
    type ExternalPaymentReleaseParams as ExternalPaymentReleaseParams,
    type ExternalPaymentReverseParams as ExternalPaymentReverseParams,
    type ExternalPaymentSettleParams as ExternalPaymentSettleParams,
  };

  export {
    ManagementOperations as ManagementOperations,
    type ExternalResource as ExternalResource,
    type ExternalResourceType as ExternalResourceType,
    type ManagementOperationTransaction as ManagementOperationTransaction,
    type ManagementOperationTransactionsCursorPage as ManagementOperationTransactionsCursorPage,
    type ManagementOperationCreateParams as ManagementOperationCreateParams,
    type ManagementOperationListParams as ManagementOperationListParams,
    type ManagementOperationReverseParams as ManagementOperationReverseParams,
  };

  export {
    FundingEvents as FundingEvents,
    type FundingEventRetrieveResponse as FundingEventRetrieveResponse,
    type FundingEventListResponse as FundingEventListResponse,
    type FundingEventRetrieveDetailsResponse as FundingEventRetrieveDetailsResponse,
    type FundingEventListResponsesCursorPage as FundingEventListResponsesCursorPage,
    type FundingEventListParams as FundingEventListParams,
  };

  export { Fraud as Fraud };

  export {
    NetworkPrograms as NetworkPrograms,
    type NetworkProgram as NetworkProgram,
    type NetworkProgramsSinglePage as NetworkProgramsSinglePage,
    type NetworkProgramListParams as NetworkProgramListParams,
  };

  export {
    AccountActivity as AccountActivity,
    type WirePartyDetails as WirePartyDetails,
    type AccountActivityListResponse as AccountActivityListResponse,
    type AccountActivityRetrieveTransactionResponse as AccountActivityRetrieveTransactionResponse,
    type AccountActivityListResponsesCursorPage as AccountActivityListResponsesCursorPage,
    type AccountActivityListParams as AccountActivityListParams,
  };

  export type AccountFinancialAccountType = API.AccountFinancialAccountType;
  export type Address = API.Address;
  export type Carrier = API.Carrier;
  export type Currency = API.Currency;
  export type Document = API.Document;
  export type InstanceFinancialAccountType = API.InstanceFinancialAccountType;
  export type ShippingAddress = API.ShippingAddress;
}
