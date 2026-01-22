/**
 * Type Helpers for API Responses
 * Helps TypeScript understand the ApiResponse<T> wrapper
 */

import { AxiosResponse } from "axios";

/**
 * Backend API Response wrapper
 */
export interface ApiResponse<T> {
  success: boolean;
  status: number;
  message: string;
  code?: string;
  data?: T;
  timestamp?: string;
  meta?: {
    author?: string;
    license?: string;
    version?: string;
  };
}

/**
 * Typed Axios Response with ApiResponse wrapper
 */
export type ApiAxiosResponse<T> = AxiosResponse<ApiResponse<T>>;

/**
 * Unwrap ApiResponse from Axios response
 */
export function unwrapResponse<T>(response: AxiosResponse<any>): T {
  // Check if response has the ApiResponse structure
  if (
    response.data &&
    typeof response.data === "object" &&
    "data" in response.data
  ) {
    return response.data.data as T;
  }
  // Fallback: return response.data directly
  return response.data as T;
}
