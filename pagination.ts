// File generated from our OpenAPI spec by Stainless.

import { AbstractPage, APIResponse, APIClient, FinalRequestOptions, PageInfo } from './core';

export interface PageResponse<Item> {
  data: Array<Item>;

  /**
   * Page number.
   */
  page: number;

  /**
   * Total number of entries.
   */
  total_entries: number;

  /**
   * Total number of pages.
   */
  total_pages: number;
}

export interface PageParams {
  /**
   * Page (for pagination).
   */
  page?: number;

  /**
   * Page size (for pagination).
   */
  page_size?: number;
}

export class Page<Item> extends AbstractPage<Item> implements PageResponse<Item> {
  data: Array<Item>;

  /**
   * Page number.
   */
  page: number;

  /**
   * Total number of entries.
   */
  total_entries: number;

  /**
   * Total number of pages.
   */
  total_pages: number;

  constructor(client: APIClient, response: APIResponse<PageResponse<Item>>, options: FinalRequestOptions) {
    super(client, response, options);

    this.data = response.data;
    this.page = response.page;
    this.total_entries = response.total_entries;
    this.total_pages = response.total_pages;
  }

  getPaginatedItems(): Item[] {
    return this.data;
  }

  // @deprecated Please use `nextPageInfo()` instead
  nextPageParams(): Partial<PageParams> | null {
    const info = this.nextPageInfo();
    if (!info) return null;
    if ('params' in info) return info.params;
    const params = Object.fromEntries(info.url.searchParams);
    if (!Object.keys(params).length) return null;
    return params;
  }

  nextPageInfo(): PageInfo | null {
    const currentPage = this.page;
    if (currentPage >= this.total_pages) return null;

    return { params: { page: currentPage + 1 } };
  }
}

export interface CursorPageResponse<Item> {
  data: Array<Item>;

  has_more: boolean;
}

export interface CursorPageParams {
  /**
   * A cursor representing an item's token before which a page of results should end.
   * Used to retrieve the previous page of results before this item.
   */
  ending_before?: string;

  /**
   * Page size (for pagination).
   */
  page_size?: number;

  /**
   * A cursor representing an item's token after which a page of results should
   * begin. Used to retrieve the next page of results after this item.
   */
  starting_after?: string;
}

export class CursorPage<Item extends { token: string }>
  extends AbstractPage<Item>
  implements CursorPageResponse<Item>
{
  data: Array<Item>;

  has_more: boolean;

  constructor(
    client: APIClient,
    response: APIResponse<CursorPageResponse<Item>>,
    options: FinalRequestOptions,
  ) {
    super(client, response, options);

    this.data = response.data;
    this.has_more = response.has_more;
  }

  getPaginatedItems(): Item[] {
    return this.data;
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
    const isForwards = !('ending_before' in (this.options.query || {}));

    if (!this.data?.length) {
      return null;
    }

    if (isForwards) {
      const next = this.data[this.data.length - 1]?.token;
      if (!next) return null;
      return { params: { starting_after: next } };
    } else {
      const next = this.data[0]?.token;
      if (!next) return null;
      return { params: { ending_before: next } };
    }
  }
}

export interface SinglePageResponse<Item> {
  data: Array<Item>;

  /**
   * More data exists.
   */
  has_more: boolean;
}

export class SinglePage<Item> extends AbstractPage<Item> implements SinglePageResponse<Item> {
  data: Array<Item>;

  /**
   * More data exists.
   */
  has_more: boolean;

  constructor(
    client: APIClient,
    response: APIResponse<SinglePageResponse<Item>>,
    options: FinalRequestOptions,
  ) {
    super(client, response, options);

    this.data = response.data;
    this.has_more = response.has_more;
  }

  getPaginatedItems(): Item[] {
    return this.data;
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
