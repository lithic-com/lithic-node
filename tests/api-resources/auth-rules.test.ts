// File generated from our OpenAPI spec by Stainless.

import Lithic from '../../index';
const client = new Lithic({ apiKey: 'something1234', baseURL: 'http://127.0.0.1:4010' });

describe('resource auth_rules', () => {
  test('create: only required params', async () => {
    const response = await client.authRules.create({});
  });

  test('create: required and optional params', async () => {
    const response = await client.authRules.create({
      allowed_mcc: ['xkktkjk', 'cymxq', 'hqxhmfh'],
      blocked_mcc: ['kikwuvt', 'mynkvgsdnhtdic', 'ppjboresrof'],
      allowed_countries: ['hctpoqipos', 'cxzpdgctnulfev', 'mwutgdie'],
      blocked_countries: ['oroulrjfnmkvarbadcqj', 'ydmjhujtf', 'k'],
      avs_type: 'ZIP_ONLY',
      card_tokens: ['fivzlehfymimxb', '', 'svmllpatbki'],
      account_tokens: ['yuqujepuf', 'eyjiwhnmh', 'ydvriuzwzckrrpkqgbc'],
      program_level: false,
    });
  });

  test('retrieve', async () => {
    const response = await client.authRules.retrieve('4b426920-f017-4ad7-a645-fd94101e9dc4');
  });

  test('retrieve: request options instead of params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.authRules.retrieve('4b426920-f017-4ad7-a645-fd94101e9dc4', { path: '/_stainless_unknown_path' }),
    ).rejects.toThrow(Lithic.NotFoundError);
  });

  test('update: only required params', async () => {
    const response = await client.authRules.update('2851f1ed-567a-49f0-b10a-02bee677698d', {});
  });

  test('update: required and optional params', async () => {
    const response = await client.authRules.update('2851f1ed-567a-49f0-b10a-02bee677698d', {
      allowed_mcc: ['mqggkufduedpzggskj', 'hpzxbyqobjtqf', 'ccqbtx'],
      blocked_mcc: ['nbfholyhgvpdnp', 'z', 'xafeauziwh'],
      allowed_countries: ['kkotofekcwtduxvmzlu', 'uxwnwu', 'whxzhviu'],
      blocked_countries: ['rluyiktmdqok', 'ztcvf', 'iq'],
      avs_type: 'ZIP_ONLY',
    });
  });

  test('list: only required params', async () => {
    const response = await client.authRules.list();
  });

  test('list: required and optional params', async () => {
    const response = await client.authRules.list({ page: 3, page_size: 448 });
  });

  test('list: request options instead of params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(client.authRules.list({ path: '/_stainless_unknown_path' })).rejects.toThrow(
      Lithic.NotFoundError,
    );
  });

  test('list: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.authRules.list({ page: 5, page_size: 913 }, { path: '/_stainless_unknown_path' }),
    ).rejects.toThrow(Lithic.NotFoundError);
  });

  test('apply: only required params', async () => {
    const response = await client.authRules.apply('cc850efd-9d0e-4a66-82b9-0b0a0318b8eb', {});
  });

  test('apply: required and optional params', async () => {
    const response = await client.authRules.apply('cc850efd-9d0e-4a66-82b9-0b0a0318b8eb', {
      card_tokens: ['jyumqxaforweooehnwtk', 'iv', 'ejnjkugfqyawtjniwd'],
      account_tokens: ['vahduuhmnl', 'iwhxzjlwwpquwiwdyq', 'fuutlpvsasabbn'],
      program_level: true,
    });
  });

  test('remove: only required params', async () => {
    const response = await client.authRules.remove({});
  });

  test('remove: required and optional params', async () => {
    const response = await client.authRules.remove({
      card_tokens: ['tgrmylvksdpnqlsr', 'omalausascyow', 'mdqylufjjt'],
      account_tokens: ['rr', 'epmezvaxdeh', 'yzxzeuzltdogydw'],
      program_level: true,
    });
  });
});
