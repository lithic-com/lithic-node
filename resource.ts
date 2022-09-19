import type { Lithic } from './index';

export class APIResource {
  protected client: Lithic;
  constructor(client: Lithic) {
    this.client = client;

    this.get = client.get.bind(client);
    this.post = client.post.bind(client);
    this.patch = client.patch.bind(client);
    this.put = client.put.bind(client);
    this.delete = client.delete.bind(client);
    this.getAPIList = client.getAPIList.bind(client);
  }

  protected get: Lithic['get'];
  protected post: Lithic['post'];
  protected patch: Lithic['patch'];
  protected put: Lithic['put'];
  protected delete: Lithic['delete'];
  protected getAPIList: Lithic['getAPIList'];
}
