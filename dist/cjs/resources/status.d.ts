import * as Core from '../core';
export declare class StatusResource extends Core.APIResource {
  retrieve(options?: Core.RequestOptions): Promise<Core.APIResponse<ApiStatus>>;
}
export interface ApiStatus {
  message?: string;
}
