/**
 * Axios Interceptors
 * Request and response interceptors for authentication, error handling, and token refresh
 */

import type { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse } from 'axios';
import { tokenManager } from './token-manager';
import { handleApiError, isUnauthorizedError } from './error-handler';

/**
 * Setup request interceptor
 */
export function setupRequestInterceptor(axiosInstance: AxiosInstance): void {
  axiosInstance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      // Add access token to request headers
      const token = tokenManager.getAccessToken();
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      
      return config;
    },
    (error: unknown) => {
      return Promise.reject(error);
    }
  );
}

/**
 * Setup response interceptor
 */
export function setupResponseInterceptor(axiosInstance: AxiosInstance): void {
  axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => {
      // Return data directly from ApiResponse wrapper
      return response.data?.data !== undefined ? response.data.data : response.data;
    },
    async (error: unknown) => {
      const originalRequest = error && typeof error === 'object' && 'config' in error ? (error as any).config : null;
      
      // Handle 401 Unauthorized - attempt token refresh
      if (originalRequest && isUnauthorizedError(error) && !originalRequest._retry) {
        originalRequest._retry = true;
        
        try {
          const refreshToken = tokenManager.getRefreshToken();
          
          if (!refreshToken) {
            // No refresh token, redirect to login
            tokenManager.clearTokens();
            if (typeof window !== 'undefined') {
              window.location.href = '/login';
            }
            return Promise.reject(error);
          }
          
          // Attempt to refresh token
          const response = await axiosInstance.post('/auth/refresh', {
            refreshToken,
          });
          
          const tokenData = response.data;
          
          // Update tokens
          tokenManager.setTokens(tokenData);
          
          // Retry original request with new token
          originalRequest.headers.Authorization = `Bearer ${tokenData.accessToken}`;
          return axiosInstance(originalRequest);
        } catch (refreshError) {
          // Refresh failed, clear tokens and redirect to login
          tokenManager.clearTokens();
          if (typeof window !== 'undefined') {
            window.location.href = '/login';
          }
          return Promise.reject(refreshError);
        }
      }
      
      // Handle other errors
      return Promise.reject(handleApiError(error));
    }
  );
}

/**
 * Setup all interceptors
 */
export function setupInterceptors(axiosInstance: AxiosInstance): void {
  setupRequestInterceptor(axiosInstance);
  setupResponseInterceptor(axiosInstance);
}
