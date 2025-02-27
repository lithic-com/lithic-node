// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { AbstractPage, Response, APIClient, FinalRequestOptions, PageInfo } from './core';

export interface CursorPageResponse<Item> {
  data: Array<Item>;

  has_more: boolean;
}

export interface CursorPageParams {
  page_size?: number;

  /**
   * A cursor representing an item's token after which a page of results should
   * begin. Used to retrieve the next page of results after this item.
   */
  starting_after?: string;

  /**
   * A cursor representing an item's token before which a page of results should end.
   * Used to retrieve the previous page of results before this item.
   */
  ending_before?: string;
}

export class CursorPage<Item extends { token: string }>
  extends AbstractPage<Item>
  implements CursorPageResponse<Item>
{
  data: Array<Item>;

  has_more: boolean;

  constructor(
    client: APIClient,
    response: Response,
    body: CursorPageResponse<Item>,
    options: FinalRequestOptions,
  ) {
    super(client, response, body, options);

    this.data = body.data || [];
    this.has_more = body.has_more;
  }

  getPaginatedItems(): Item[] {
    return this.data ?? [];
  }

  override hasNextPage(): boolean {
    return this.has_more && super.hasNextPage();
  }

  // @deprecated Please use `nextPageInfo()` instead
  nextPageParams(): Partial<CursorPageParams> | null {
    const info = this.nextPageInfo();
    if (!info) return null;
    if ('params' in info) return info.params;
    const params = Object.fromEntries(info.url.searchParams);
    if (!Object.keys(params).length) return null;
    return params;
  }

  nextPageInfo(): PageInfo | null {
    const data = this.getPaginatedItems();
    if (!data.length) {
      return null;
    }

    const isForwards = !(
      typeof this.options.query === 'object' && 'ending_before' in (this.options.query || {})
    );
    if (isForwards) {
      const token = data[data.length - 1]?.token;
      if (!token) {
        return null;
      }

      return { params: { starting_after: token } };
    }

    const token = data[0]?.token;
    if (!token) {
      return null;
    }

    return { params: { ending_before: token } };
  }
}

export interface SinglePageResponse<Item> {
  data: Array<Item>;

  has_more: boolean;
}

export class SinglePage<Item> extends AbstractPage<Item> implements SinglePageResponse<Item> {
  data: Array<Item>;

  has_more: boolean;

  constructor(
    client: APIClient,
    response: Response,
    body: SinglePageResponse<Item>,
    options: FinalRequestOptions,
  ) {
    super(client, response, body, options);

    this.data = body.data || [];
    this.has_more = body.has_more;
  }

  getPaginatedItems(): Item[] {
    return this.data ?? [];
  }

  override hasNextPage(): boolean {
    return this.has_more && super.hasNextPage();
  }

  // @deprecated Please use `nextPageInfo()` instead
  /**
   * This page represents a response that isn't actually paginated at the API level
   * so there will never be any next page params.
   */
  nextPageParams(): null {
    return null;
  }

  nextPageInfo(): null {
    return null;
  }
}
