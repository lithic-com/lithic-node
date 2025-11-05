// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import * as V2API from './v2';
import { APIPromise } from '../../../core/api-promise';
import { RequestOptions } from '../../../internal/request-options';
import { path } from '../../../internal/utils/path';

export class Backtests extends APIResource {
  /**
   * Initiates a request to asynchronously generate a backtest for an Auth rule.
   * During backtesting, both the active version (if one exists) and the draft
   * version of the Auth Rule are evaluated by replaying historical transaction data
   * against the rule's conditions. This process allows customers to simulate and
   * understand the effects of proposed rule changes before deployment. The generated
   * backtest report provides detailed results showing whether the draft version of
   * the Auth Rule would have approved or declined historical transactions which were
   * processed during the backtest period. These reports help evaluate how changes to
   * rule configurations might affect overall transaction approval rates.
   *
   * The generated backtest report will be delivered asynchronously through a webhook
   * with `event_type` = `auth_rules.backtest_report.created`. See the docs on
   * setting up [webhook subscriptions](https://docs.lithic.com/docs/events-api). It
   * is also possible to request backtest reports on-demand through the
   * `/v2/auth_rules/{auth_rule_token}/backtests/{auth_rule_backtest_token}`
   * endpoint.
   *
   * Lithic currently supports backtesting for `CONDITIONAL_BLOCK` /
   * `CONDITIONAL_ACTION` rules. Backtesting for `VELOCITY_LIMIT` rules is generally
   * not supported. In specific cases (i.e. where Lithic has pre-calculated the
   * requested velocity metrics for historical transactions), a backtest may be
   * feasible. However, such cases are uncommon and customers should not anticipate
   * support for velocity backtests under most configurations. If a historical
   * transaction does not feature the required inputs to evaluate the rule, then it
   * will not be included in the final backtest report.
   */
  create(
    authRuleToken: string,
    body: BacktestCreateParams,
    options?: RequestOptions,
  ): APIPromise<BacktestCreateResponse> {
    return this._client.post(path`/v2/auth_rules/${authRuleToken}/backtests`, { body, ...options });
  }

  /**
   * Returns the backtest results of an Auth rule (if available).
   *
   * Backtesting is an asynchronous process that requires time to complete. If a
   * customer retrieves the backtest results using this endpoint before the report is
   * fully generated, the response will return null for `results.current_version` and
   * `results.draft_version`. Customers are advised to wait for the backtest creation
   * process to complete (as indicated by the webhook event
   * auth_rules.backtest_report.created) before retrieving results from this
   * endpoint.
   *
   * Backtesting is an asynchronous process, while the backtest is being processed,
   * results will not be available which will cause `results.current_version` and
   * `results.draft_version` objects to contain `null`. The entries in `results` will
   * also always represent the configuration of the rule at the time requests are
   * made to this endpoint. For example, the results for `current_version` in the
   * served backtest report will be consistent with which version of the rule is
   * currently activated in the respective event stream, regardless of which version
   * of the rule was active in the event stream at the time a backtest is requested.
   */
  retrieve(
    authRuleBacktestToken: string,
    params: BacktestRetrieveParams,
    options?: RequestOptions,
  ): APIPromise<BacktestResults> {
    const { auth_rule_token } = params;
    return this._client.get(
      path`/v2/auth_rules/${auth_rule_token}/backtests/${authRuleBacktestToken}`,
      options,
    );
  }
}

export interface BacktestResults {
  /**
   * Auth Rule Backtest Token
   */
  backtest_token: string;

  results: BacktestResults.Results;

  simulation_parameters: BacktestResults.SimulationParameters;
}

export namespace BacktestResults {
  export interface Results {
    current_version?: V2API.RuleStats | null;

    draft_version?: V2API.RuleStats | null;
  }

  export interface SimulationParameters {
    /**
     * Auth Rule Token
     */
    auth_rule_token?: string;

    /**
     * The end time of the simulation.
     */
    end?: string;

    /**
     * The start time of the simulation.
     */
    start?: string;
  }
}

export interface BacktestCreateResponse {
  /**
   * Auth Rule Backtest Token
   */
  backtest_token?: string;
}

export interface BacktestCreateParams {
  /**
   * The end time of the backtest.
   */
  end?: string;

  /**
   * The start time of the backtest.
   */
  start?: string;
}

export interface BacktestRetrieveParams {
  auth_rule_token: string;
}

export declare namespace Backtests {
  export {
    type BacktestResults as BacktestResults,
    type BacktestCreateResponse as BacktestCreateResponse,
    type BacktestCreateParams as BacktestCreateParams,
    type BacktestRetrieveParams as BacktestRetrieveParams,
  };
}
