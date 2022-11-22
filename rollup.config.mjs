/**
 * This rollup configuration is used to generate a deno-friendly, bundled type definition.
 * It is fed the source files, rather than the declarations, and is configured to
 * only emit declarations.
 */

import ts from 'rollup-plugin-ts';
import deno from 'rollup-plugin-deno';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

const DENO_NODE_STD_VERSION = process.env['DENO_NODE_STD_VERSION'] ?? '0.163.0';
const nodeSTDMatch = /https:\/\/deno\.land\/std@[\d.]+\/node/g;

const config = [
  {
    input: './index.ts',
    output: [{ file: 'deno.d.ts', format: 'es' }],
    plugins: [
      ts({
        tsconfig: 'tsconfig.json',
        transpileOnly: true,
        hook: {
          outputPath: (path, kind) => (kind === 'declaration' ? path : undefined),
        },
      }),
    ],
  },
  {
    input: './index.ts',
    output: {
      file: 'deno.js',
      format: 'esm',
    },
    plugins: [
      ts({
        tsconfig: 'tsconfig.json',
        transpileOnly: true,
      }),
      nodeResolve(),
      commonjs(),
      deno(),
      {
        name: 'deno-std-update',
        renderChunk(code) {
          // https://deno.land/std@0.90.0
          return code.replaceAll(nodeSTDMatch, `https://deno.land/std@${DENO_NODE_STD_VERSION}/node`);
        },
      },
      {
        name: 'type-reference',
        renderChunk(code) {
          return `/// <reference types="./deno.d.ts" />\n${code}`;
        },
      },
      {
        name: 'strip-cjs-exports',
        renderChunk(code) {
          return code.replaceAll(/^\s*exports = module\.exports = .+;$/gm, '');
        },
      },
    ],
  },
];

export default config;
