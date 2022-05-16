// File generated from our OpenAPI spec by Stainless.

import Lithic from '../../index';
const client = new Lithic({ apiKey: 'something1234', baseURL: 'http://127.0.0.1:4010' });

describe('resource auth_rules', () => {
  test('create: only required params', async () => {
    const response = await client.authRules.create({});
  });

  test('create: required and optional params', async () => {
    const response = await client.authRules.create({
      allowed_mcc: ['wbusgztwvsjyzlrw', 'jlybdzyqvbvddv', 'haoscaocjfiw'],
      blocked_mcc: ['jjosoqfzohrgh', 'k', 'laympayxoinqaimxys'],
      allowed_countries: ['cbsk', 'jowzamxbrnxnppvvij', 'xkktkjk'],
      blocked_countries: ['cymxq', 'hqxhmfh', 'kikwuvt'],
      avs_type: 'ZIP_ONLY',
      card_tokens: ['mynkvgsdnhtdic', 'ppjboresrof', 'hctpoqipos'],
      account_tokens: ['cxzpdgctnulfev', 'mwutgdie', 'oroulrjfnmkvarbadcqj'],
      program_level: false,
    });
  });

  test('retrieve', async () => {
    const response = await client.authRules.retrieve('f2754c5b-316b-435d-b724-3e757e108bd7');
  });

  test('update: only required params', async () => {
    const response = await client.authRules.update('6790c065-7fc9-4c52-9c37-2e55d4874ef2', {});
  });

  test('update: required and optional params', async () => {
    const response = await client.authRules.update('6790c065-7fc9-4c52-9c37-2e55d4874ef2', {
      allowed_mcc: ['riuzwzckrrpkqgbck', 'thdko', 'aya'],
      blocked_mcc: ['mq', 'lxlhjywphcacxowth', 'nj'],
      allowed_countries: ['zc', 'vjkmrpyagbaraesxyk', 'mjpovwmqg'],
      blocked_countries: ['kufd', 'edpzggskjqhpzxby', 'objtqficcqbtx'],
      avs_type: 'ZIP_ONLY',
    });
  });

  test('list: only required params', async () => {
    const response = await client.authRules.list();
  });

  test('list: required and optional params', async () => {
    const response = await client.authRules.list({ page: 14, page_size: 536 });
  });

  test('apply: only required params', async () => {
    const response = await client.authRules.apply('03497f43-c928-490f-8e03-20cf5e4e669b', {});
  });

  test('apply: required and optional params', async () => {
    const response = await client.authRules.apply('03497f43-c928-490f-8e03-20cf5e4e669b', {
      card_tokens: ['fekcwtduxvm', 'luhuxwnwukwhxzhviupr', 'uyiktmdqo'],
      account_tokens: ['gztcvfci', 'dlhxutnjaxzwq', 'bxrjjhdroasarbgcn'],
      program_level: true,
    });
  });

  test('remove: only required params', async () => {
    const response = await client.authRules.remove({});
  });

  test('remove: required and optional params', async () => {
    const response = await client.authRules.remove({
      card_tokens: ['xsyjyumqxaf', 'rweooehnwtk', 'iv'],
      account_tokens: ['ejnjkugfqyawtjniwd', 'vahduuhmnl', 'iwhxzjlwwpquwiwdyq'],
      program_level: true,
    });
  });
});
