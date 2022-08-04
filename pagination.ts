// File generated from our OpenAPI spec by Stainless.
import { AbstractPage, APIResponse, APIClient, FinalRequestOptions } from './core';

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
  /** Page number. */
  page: number;
  /** Total number of entries. */
  total_entries: number;
  /** Total number of pages. */
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

  nextPageParams(): Partial<PageParams> | null {
    const currentPage = this.page;
    if (currentPage >= this.total_pages) return null;

    return { page: currentPage + 1 };
  }
}
