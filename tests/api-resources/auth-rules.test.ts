// File generated from our OpenAPI spec by Stainless.

import Lithic from '../../index';
const client = new Lithic({ apiKey: 'something1234', baseURL: 'http://127.0.0.1:4010' });

describe('resource auth_rules', () => {
  test('create: only required params', async () => {
    const response = await client.authRules.create({});
  });

  test('create: required and optional params', async () => {
    const response = await client.authRules.create({
      allowed_mcc: ['zds', 'fduzkedfozgyhcfnihuk', 'moqkukhzxrvwqdsim'],
      blocked_mcc: ['npzvrlhdxqcbratbmghm', 'mrp', 'zqszbqndmurzwfnf'],
      allowed_countries: ['bxjeglvrix', 'tzeowpztosvqjbdc', 'rgkbbhgbpknqgmcfc'],
      blocked_countries: ['lwjlgymbwnylug', 'w', 'epjbjsdtyqfiuzetzvfk'],
      avs_type: 'ZIP_ONLY',
      card_tokens: ['objdaotvrlebzbeepov', 'zzj', 'kpbxyvllyjkmeqr'],
      account_tokens: ['cadbbvoiawfa', 'meqwhztm', 'sabcbqppeahfuhxagk'],
      program_level: true,
    });
  });

  test('retrieve', async () => {
    const response = await client.authRules.retrieve('393f5f81-4c77-44b1-bb57-c6331de5dffd');
  });

  test('retrieve: request options instead of params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.authRules.retrieve('393f5f81-4c77-44b1-bb57-c6331de5dffd', { path: '/_stainless_unknown_path' }),
    ).rejects.toThrow(Lithic.NotFoundError);
  });

  test('update: only required params', async () => {
    const response = await client.authRules.update('b8d0a357-9d2a-4a85-9480-7dcce24892dc', {});
  });

  test('update: required and optional params', async () => {
    const response = await client.authRules.update('b8d0a357-9d2a-4a85-9480-7dcce24892dc', {
      allowed_mcc: ['qutoghtdtjkkkeajtnm', 'dlbqchxnt', 'luftveyda'],
      blocked_mcc: ['kntt', 'fgancxwclgmoikvkqg', 'gbutyppoulkrazsc'],
      allowed_countries: ['cvaois', 'g', 'vpxnesfps'],
      blocked_countries: ['g', 'p', 'eravrpasdjtlidllco'],
      avs_type: 'ZIP_ONLY',
    });
  });

  test('list: only required params', async () => {
    const response = await client.authRules.list();
  });

  test('list: required and optional params', async () => {
    const response = await client.authRules.list({ page: 20, page_size: 922 });
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
      client.authRules.list({ page: 14, page_size: 201 }, { path: '/_stainless_unknown_path' }),
    ).rejects.toThrow(Lithic.NotFoundError);
  });

  test('apply: only required params', async () => {
    const response = await client.authRules.apply('4b51e4c6-c009-4878-b89a-9891f471dc75', {});
  });

  test('apply: required and optional params', async () => {
    const response = await client.authRules.apply('4b51e4c6-c009-4878-b89a-9891f471dc75', {
      card_tokens: ['uwfnpjwilyvelzxg', 'ejkxdlhpemcpcbbwvly', 'gaizbrwscqdcjzkboksn'],
      account_tokens: ['hlfagporafskz', 'qbflhrrjmuaueqr', 'cprpwrjx'],
      program_level: false,
    });
  });

  test('remove: only required params', async () => {
    const response = await client.authRules.remove({});
  });

  test('remove: required and optional params', async () => {
    const response = await client.authRules.remove({
      card_tokens: ['rbmmpfzuolhen', 'lyswqmfijijrg', 'uvdruv'],
      account_tokens: ['uuqpxluliyuxjkt', 'okxrkrvbq', 'dlfkyoongbkjjn'],
      program_level: false,
    });
  });
});
