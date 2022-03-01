import {APIList, APIClient, FinalRequestOptions} from './core';
declare type AutoPagingEachCallback<Rsp> = (
  item: Rsp
) => boolean | void | Promise<boolean | void>;
declare type AutoPagingEach<Rsp> = (
  callback: AutoPagingEachCallback<Rsp>
) => Promise<void>;
declare type AutoPagingToArray<Rsp> = (opts: {
  limit: number;
}) => Promise<Array<Rsp>>;
export declare type AutoPaginationMethods<Rsp> = AsyncIterableIterator<Rsp> & {
  autoPagingEach: AutoPagingEach<Rsp>;
  autoPagingToArray: AutoPagingToArray<Rsp>;
};
export declare const makeAutoPaginationMethods: <Req, Rsp>(
  client: APIClient,
  requestPromise: Promise<APIList<Rsp>>,
  options: FinalRequestOptions<Req>
) => AutoPaginationMethods<Rsp>;
export {};
