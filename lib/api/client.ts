/**
 * Base API Client
 * Configured axios instance with all interceptors
 */

import axios, { AxiosInstance } from "axios";
import { API_CONFIG } from "./config";
import { authRequestInterceptor } from "./interceptors/authInterceptor";
import { createTokenRefreshInterceptor } from "./interceptors/tokenRefreshInterceptor";
import { errorResponseInterceptor } from "./interceptors/errorInterceptor";
import { createRetryInterceptor } from "./interceptors/retryInterceptor";
import { Api } from "./generated/Api";

// Create axios instance with default config
const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_CONFIG.baseURL,
  timeout: API_CONFIG.timeout,
  withCredentials: API_CONFIG.withCredentials,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptors
axiosInstance.interceptors.request.use(authRequestInterceptor, (error) =>
  Promise.reject(error),
);

// Response interceptors (order matters!)
// 1. Token refresh interceptor (handles 401)
axiosInstance.interceptors.response.use(
  (response) => response,
  createTokenRefreshInterceptor(axiosInstance),
);

// 2. Retry interceptor (handles 5xx)
axiosInstance.interceptors.response.use(
  (response) => response,
  createRetryInterceptor(axiosInstance),
);

// 3. Error interceptor (maps errors to typed classes)
axiosInstance.interceptors.response.use(
  (response) => response,
  errorResponseInterceptor,
);

const apiInstance = new Api({
  baseURL: API_CONFIG.baseURL,
});

// Use the configured axios instance with interceptors
apiInstance.instance = axiosInstance;

export { apiInstance };
