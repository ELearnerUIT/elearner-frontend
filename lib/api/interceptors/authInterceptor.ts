/**
 * Authentication Interceptor
 * Automatically injects Bearer token into request headers
 */

import { InternalAxiosRequestConfig } from "axios";
import { getAccessToken } from "@/lib/auth";

export function authRequestInterceptor(
  config: InternalAxiosRequestConfig,
): InternalAxiosRequestConfig {
  const token = getAccessToken();

  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
}
