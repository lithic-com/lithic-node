// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import path from 'node:path';
import util from 'node:util';
import Fuse from 'fuse.js';
import ts from 'typescript';
import { WorkerOutput } from './code-tool-types';
import { Lithic, ClientOptions } from 'lithic';

function getRunFunctionSource(code: string): {
  type: 'declaration' | 'expression';
  client: string | undefined;
  code: string;
} | null {
  const sourceFile = ts.createSourceFile('code.ts', code, ts.ScriptTarget.Latest, true);
  const printer = ts.createPrinter();

  for (const statement of sourceFile.statements) {
    // Check for top-level function declarations
    if (ts.isFunctionDeclaration(statement)) {
      if (statement.name?.text === 'run') {
        return {
          type: 'declaration',
          client: statement.parameters[0]?.name.getText(),
          code: printer.printNode(ts.EmitHint.Unspecified, statement.body!, sourceFile),
        };
      }
    }

    // Check for variable declarations: const run = () => {} or const run = function() {}
    if (ts.isVariableStatement(statement)) {
      for (const declaration of statement.declarationList.declarations) {
        if (
          ts.isIdentifier(declaration.name) &&
          declaration.name.text === 'run' &&
          // Check if it's initialized with a function
          declaration.initializer &&
          (ts.isFunctionExpression(declaration.initializer) || ts.isArrowFunction(declaration.initializer))
        ) {
          return {
            type: 'expression',
            client: declaration.initializer.parameters[0]?.name.getText(),
            code: printer.printNode(ts.EmitHint.Unspecified, declaration.initializer, sourceFile),
          };
        }
      }
    }
  }

  return null;
}

function getTSDiagnostics(code: string): string[] {
  const functionSource = getRunFunctionSource(code)!;
  const codeWithImport = [
    'import { Lithic } from "lithic";',
    functionSource.type === 'declaration' ?
      `async function run(${functionSource.client}: Lithic)`
    : `const run: (${functionSource.client}: Lithic) => Promise<unknown> =`,
    functionSource.code,
  ].join('\n');
  const sourcePath = path.resolve('code.ts');
  const ast = ts.createSourceFile(sourcePath, codeWithImport, ts.ScriptTarget.Latest, true);
  const options = ts.getDefaultCompilerOptions();
  options.target = ts.ScriptTarget.Latest;
  options.module = ts.ModuleKind.NodeNext;
  options.moduleResolution = ts.ModuleResolutionKind.NodeNext;
  const host = ts.createCompilerHost(options, true);
  const newHost: typeof host = {
    ...host,
    getSourceFile: (...args) => {
      if (path.resolve(args[0]) === sourcePath) {
        return ast;
      }
      return host.getSourceFile(...args);
    },
    readFile: (...args) => {
      if (path.resolve(args[0]) === sourcePath) {
        return codeWithImport;
      }
      return host.readFile(...args);
    },
    fileExists: (...args) => {
      if (path.resolve(args[0]) === sourcePath) {
        return true;
      }
      return host.fileExists(...args);
    },
  };
  const program = ts.createProgram({
    options,
    rootNames: [sourcePath],
    host: newHost,
  });
  const diagnostics = ts.getPreEmitDiagnostics(program, ast);
  return diagnostics.map((d) => {
    const message = ts.flattenDiagnosticMessageText(d.messageText, '\n');
    if (!d.file || !d.start) return `- ${message}`;
    const { line: lineNumber } = ts.getLineAndCharacterOfPosition(d.file, d.start);
    const line = codeWithImport.split('\n').at(lineNumber)?.trim();
    return line ? `- ${message}\n    ${line}` : `- ${message}`;
  });
}

const fuse = new Fuse(
  [
    'client.apiStatus',
    'client.accounts.list',
    'client.accounts.retrieve',
    'client.accounts.retrieveSpendLimits',
    'client.accounts.update',
    'client.accountHolders.create',
    'client.accountHolders.list',
    'client.accountHolders.listDocuments',
    'client.accountHolders.retrieve',
    'client.accountHolders.retrieveDocument',
    'client.accountHolders.simulateEnrollmentDocumentReview',
    'client.accountHolders.simulateEnrollmentReview',
    'client.accountHolders.update',
    'client.accountHolders.uploadDocument',
    'client.authRules.v2.create',
    'client.authRules.v2.delete',
    'client.authRules.v2.draft',
    'client.authRules.v2.list',
    'client.authRules.v2.listResults',
    'client.authRules.v2.promote',
    'client.authRules.v2.retrieve',
    'client.authRules.v2.retrieveFeatures',
    'client.authRules.v2.retrieveReport',
    'client.authRules.v2.update',
    'client.authRules.v2.backtests.create',
    'client.authRules.v2.backtests.retrieve',
    'client.authStreamEnrollment.retrieveSecret',
    'client.authStreamEnrollment.rotateSecret',
    'client.tokenizationDecisioning.retrieveSecret',
    'client.tokenizationDecisioning.rotateSecret',
    'client.tokenizations.activate',
    'client.tokenizations.deactivate',
    'client.tokenizations.list',
    'client.tokenizations.pause',
    'client.tokenizations.resendActivationCode',
    'client.tokenizations.retrieve',
    'client.tokenizations.simulate',
    'client.tokenizations.unpause',
    'client.tokenizations.updateDigitalCardArt',
    'client.cards.convertPhysical',
    'client.cards.create',
    'client.cards.embed',
    'client.cards.list',
    'client.cards.provision',
    'client.cards.reissue',
    'client.cards.renew',
    'client.cards.retrieve',
    'client.cards.retrieveSpendLimits',
    'client.cards.searchByPan',
    'client.cards.update',
    'client.cards.webProvision',
    'client.cards.balances.list',
    'client.cards.financialTransactions.list',
    'client.cards.financialTransactions.retrieve',
    'client.cardBulkOrders.create',
    'client.cardBulkOrders.list',
    'client.cardBulkOrders.retrieve',
    'client.cardBulkOrders.update',
    'client.balances.list',
    'client.disputes.create',
    'client.disputes.delete',
    'client.disputes.deleteEvidence',
    'client.disputes.initiateEvidenceUpload',
    'client.disputes.list',
    'client.disputes.listEvidences',
    'client.disputes.retrieve',
    'client.disputes.retrieveEvidence',
    'client.disputes.update',
    'client.disputesV2.list',
    'client.disputesV2.retrieve',
    'client.events.list',
    'client.events.listAttempts',
    'client.events.retrieve',
    'client.events.subscriptions.create',
    'client.events.subscriptions.delete',
    'client.events.subscriptions.list',
    'client.events.subscriptions.listAttempts',
    'client.events.subscriptions.recover',
    'client.events.subscriptions.replayMissing',
    'client.events.subscriptions.retrieve',
    'client.events.subscriptions.retrieveSecret',
    'client.events.subscriptions.rotateSecret',
    'client.events.subscriptions.sendSimulatedExample',
    'client.events.subscriptions.update',
    'client.events.eventSubscriptions.resend',
    'client.transfers.create',
    'client.financialAccounts.create',
    'client.financialAccounts.list',
    'client.financialAccounts.registerAccountNumber',
    'client.financialAccounts.retrieve',
    'client.financialAccounts.update',
    'client.financialAccounts.updateStatus',
    'client.financialAccounts.balances.list',
    'client.financialAccounts.financialTransactions.list',
    'client.financialAccounts.financialTransactions.retrieve',
    'client.financialAccounts.creditConfiguration.retrieve',
    'client.financialAccounts.creditConfiguration.update',
    'client.financialAccounts.statements.list',
    'client.financialAccounts.statements.retrieve',
    'client.financialAccounts.statements.lineItems.list',
    'client.financialAccounts.loanTapes.list',
    'client.financialAccounts.loanTapes.retrieve',
    'client.financialAccounts.loanTapeConfiguration.retrieve',
    'client.financialAccounts.interestTierSchedule.create',
    'client.financialAccounts.interestTierSchedule.delete',
    'client.financialAccounts.interestTierSchedule.list',
    'client.financialAccounts.interestTierSchedule.retrieve',
    'client.financialAccounts.interestTierSchedule.update',
    'client.transactions.expireAuthorization',
    'client.transactions.list',
    'client.transactions.retrieve',
    'client.transactions.simulateAuthorization',
    'client.transactions.simulateAuthorizationAdvice',
    'client.transactions.simulateClearing',
    'client.transactions.simulateCreditAuthorization',
    'client.transactions.simulateCreditAuthorizationAdvice',
    'client.transactions.simulateReturn',
    'client.transactions.simulateReturnReversal',
    'client.transactions.simulateVoid',
    'client.transactions.enhancedCommercialData.retrieve',
    'client.transactions.events.enhancedCommercialData.retrieve',
    'client.responderEndpoints.checkStatus',
    'client.responderEndpoints.create',
    'client.responderEndpoints.delete',
    'client.externalBankAccounts.create',
    'client.externalBankAccounts.list',
    'client.externalBankAccounts.retrieve',
    'client.externalBankAccounts.retryMicroDeposits',
    'client.externalBankAccounts.retryPrenote',
    'client.externalBankAccounts.unpause',
    'client.externalBankAccounts.update',
    'client.externalBankAccounts.microDeposits.create',
    'client.payments.create',
    'client.payments.list',
    'client.payments.retrieve',
    'client.payments.retry',
    'client.payments.return',
    'client.payments.simulateAction',
    'client.payments.simulateReceipt',
    'client.payments.simulateRelease',
    'client.payments.simulateReturn',
    'client.threeDS.authentication.retrieve',
    'client.threeDS.authentication.simulate',
    'client.threeDS.authentication.simulateOtpEntry',
    'client.threeDS.decisioning.challengeResponse',
    'client.threeDS.decisioning.retrieveSecret',
    'client.threeDS.decisioning.rotateSecret',
    'client.reports.settlement.listDetails',
    'client.reports.settlement.summary',
    'client.reports.settlement.networkTotals.list',
    'client.reports.settlement.networkTotals.retrieve',
    'client.cardPrograms.list',
    'client.cardPrograms.retrieve',
    'client.digitalCardArt.list',
    'client.digitalCardArt.retrieve',
    'client.bookTransfers.create',
    'client.bookTransfers.list',
    'client.bookTransfers.retrieve',
    'client.bookTransfers.retry',
    'client.bookTransfers.reverse',
    'client.creditProducts.extendedCredit.retrieve',
    'client.creditProducts.primeRates.create',
    'client.creditProducts.primeRates.retrieve',
    'client.externalPayments.cancel',
    'client.externalPayments.create',
    'client.externalPayments.list',
    'client.externalPayments.release',
    'client.externalPayments.retrieve',
    'client.externalPayments.reverse',
    'client.externalPayments.settle',
    'client.managementOperations.create',
    'client.managementOperations.list',
    'client.managementOperations.retrieve',
    'client.managementOperations.reverse',
    'client.fundingEvents.list',
    'client.fundingEvents.retrieve',
    'client.fundingEvents.retrieveDetails',
    'client.fraud.transactions.report',
    'client.fraud.transactions.retrieve',
    'client.networkPrograms.list',
    'client.networkPrograms.retrieve',
    'client.accountActivity.list',
    'client.accountActivity.retrieveTransaction',
    'client.transferLimits.list',
    'client.webhooks.parsed',
  ],
  { threshold: 1, shouldSort: true },
);

function getMethodSuggestions(fullyQualifiedMethodName: string): string[] {
  return fuse
    .search(fullyQualifiedMethodName)
    .map(({ item }) => item)
    .slice(0, 5);
}

const proxyToObj = new WeakMap<any, any>();
const objToProxy = new WeakMap<any, any>();

type ClientProxyConfig = {
  path: string[];
  isBelievedBad?: boolean;
};

function makeSdkProxy<T extends object>(obj: T, { path, isBelievedBad = false }: ClientProxyConfig): T {
  let proxy: T = objToProxy.get(obj);

  if (!proxy) {
    proxy = new Proxy(obj, {
      get(target, prop, receiver) {
        const propPath = [...path, String(prop)];
        const value = Reflect.get(target, prop, receiver);

        if (isBelievedBad || (!(prop in target) && value === undefined)) {
          // If we're accessing a path that doesn't exist, it will probably eventually error.
          // Let's proxy it and mark it bad so that we can control the error message.
          // We proxy an empty class so that an invocation or construction attempt is possible.
          return makeSdkProxy(class {}, { path: propPath, isBelievedBad: true });
        }

        if (value !== null && (typeof value === 'object' || typeof value === 'function')) {
          return makeSdkProxy(value, { path: propPath, isBelievedBad });
        }

        return value;
      },

      apply(target, thisArg, args) {
        if (isBelievedBad || typeof target !== 'function') {
          const fullyQualifiedMethodName = path.join('.');
          const suggestions = getMethodSuggestions(fullyQualifiedMethodName);
          throw new Error(
            `${fullyQualifiedMethodName} is not a function. Did you mean: ${suggestions.join(', ')}`,
          );
        }

        return Reflect.apply(target, proxyToObj.get(thisArg) ?? thisArg, args);
      },

      construct(target, args, newTarget) {
        if (isBelievedBad || typeof target !== 'function') {
          const fullyQualifiedMethodName = path.join('.');
          const suggestions = getMethodSuggestions(fullyQualifiedMethodName);
          throw new Error(
            `${fullyQualifiedMethodName} is not a constructor. Did you mean: ${suggestions.join(', ')}`,
          );
        }

        return Reflect.construct(target, args, newTarget);
      },
    });

    objToProxy.set(obj, proxy);
    proxyToObj.set(proxy, obj);
  }

  return proxy;
}

function parseError(code: string, error: unknown): string | undefined {
  if (!(error instanceof Error)) return;
  const message = error.name ? `${error.name}: ${error.message}` : error.message;
  try {
    // Deno uses V8; the first "<anonymous>:LINE:COLUMN" is the top of stack.
    const lineNumber = error.stack?.match(/<anonymous>:([0-9]+):[0-9]+/)?.[1];
    // -1 for the zero-based indexing
    const line =
      lineNumber &&
      code
        .split('\n')
        .at(parseInt(lineNumber, 10) - 1)
        ?.trim();
    return line ? `${message}\n  at line ${lineNumber}\n    ${line}` : message;
  } catch {
    return message;
  }
}

const fetch = async (req: Request): Promise<Response> => {
  const { opts, code } = (await req.json()) as { opts: ClientOptions; code: string };

  const runFunctionSource = code ? getRunFunctionSource(code) : null;
  if (!runFunctionSource) {
    const message =
      code ?
        'The code is missing a top-level `run` function.'
      : 'The code argument is missing. Provide one containing a top-level `run` function.';
    return Response.json(
      {
        is_error: true,
        result: `${message} Write code within this template:\n\n\`\`\`\nasync function run(client) {\n  // Fill this out\n}\n\`\`\``,
        log_lines: [],
        err_lines: [],
      } satisfies WorkerOutput,
      { status: 400, statusText: 'Code execution error' },
    );
  }

  const diagnostics = getTSDiagnostics(code);
  if (diagnostics.length > 0) {
    return Response.json(
      {
        is_error: true,
        result: `The code contains TypeScript diagnostics:\n${diagnostics.join('\n')}`,
        log_lines: [],
        err_lines: [],
      } satisfies WorkerOutput,
      { status: 400, statusText: 'Code execution error' },
    );
  }

  const client = new Lithic({
    ...opts,
  });

  const log_lines: string[] = [];
  const err_lines: string[] = [];
  const console = {
    log: (...args: unknown[]) => {
      log_lines.push(util.format(...args));
    },
    error: (...args: unknown[]) => {
      err_lines.push(util.format(...args));
    },
  };
  try {
    let run_ = async (client: any) => {};
    eval(`${code}\nrun_ = run;`);
    const result = await run_(makeSdkProxy(client, { path: ['client'] }));
    return Response.json({
      is_error: false,
      result,
      log_lines,
      err_lines,
    } satisfies WorkerOutput);
  } catch (e) {
    return Response.json(
      {
        is_error: true,
        result: parseError(code, e),
        log_lines,
        err_lines,
      } satisfies WorkerOutput,
      { status: 400, statusText: 'Code execution error' },
    );
  }
};

export default { fetch };
