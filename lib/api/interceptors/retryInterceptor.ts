/**
 * Retry Interceptor
 * Implements exponential backoff for retryable errors
 */

import { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from "axios";
import { RETRY_CONFIG } from "../config";

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function createRetryInterceptor(axiosInstance: AxiosInstance) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return async (error: AxiosError): Promise<any> => {
    const config = error.config as InternalAxiosRequestConfig & {
      _retryCount?: number;
    };

    if (!config) {
      return Promise.reject(error);
    }

    // Initialize retry count
    config._retryCount = config._retryCount || 0;

    // Check if we should retry
    const shouldRetry =
      error.response &&
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      RETRY_CONFIG.retryableStatuses.includes(error.response.status as any) &&
      RETRY_CONFIG.retryableMethods.includes(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (config.method?.toUpperCase() || "GET") as any,
      ) &&
      config._retryCount < RETRY_CONFIG.maxRetries;

    if (!shouldRetry) {
      return Promise.reject(error);
    }

    // Increment retry count
    config._retryCount += 1;

    // Calculate delay with exponential backoff
    const delayMs =
      RETRY_CONFIG.retryDelay * Math.pow(2, config._retryCount - 1);

    // Wait before retrying
    await delay(delayMs);

    // Retry the request
    return axiosInstance(config);
  };
}
