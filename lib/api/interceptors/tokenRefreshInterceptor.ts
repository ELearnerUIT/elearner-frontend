/**
 * Token Refresh Interceptor
 * Handles 401 responses by refreshing the access token
 * Implements request queuing to prevent concurrent refresh calls
 */

import {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { getRefreshToken, setAuthData, clearAuthData } from "@/lib/auth";
import { UnauthorizedError } from "../errors";

let isRefreshing = false;
let refreshSubscribers: ((token: string) => void)[] = [];

function subscribeTokenRefresh(callback: (token: string) => void): void {
  refreshSubscribers.push(callback);
}

function onTokenRefreshed(token: string): void {
  refreshSubscribers.forEach((callback) => callback(token));
  refreshSubscribers = [];
}

export function createTokenRefreshInterceptor(axiosInstance: AxiosInstance) {
  return async (error: AxiosError): Promise<any> => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    // Only handle 401 errors for non-refresh endpoints
    if (
      !error.response ||
      error.response.status !== 401 ||
      !originalRequest ||
      originalRequest._retry ||
      originalRequest.url?.includes("/auth/refresh") ||
      originalRequest.url?.includes("/auth/login")
    ) {
      return Promise.reject(error);
    }

    const refreshToken = getRefreshToken();

    if (!refreshToken) {
      clearAuthData();
      if (typeof window !== "undefined") {
        window.location.href = "/login";
      }
      return Promise.reject(
        new UnauthorizedError("No refresh token available"),
      );
    }

    originalRequest._retry = true;

    if (!isRefreshing) {
      isRefreshing = true;

      try {
        // Call the refresh endpoint directly
        const response = await axiosInstance.post("/api/v1/auth/refresh", {
          refreshToken,
        });

        const newTokens = response.data.data;

        // Save new tokens
        setAuthData(newTokens);

        isRefreshing = false;
        onTokenRefreshed(newTokens.accessToken);

        // Retry the original request with new token
        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${newTokens.accessToken}`;
        }

        return axiosInstance(originalRequest);
      } catch (refreshError) {
        isRefreshing = false;
        refreshSubscribers = [];
        clearAuthData();

        if (typeof window !== "undefined") {
          window.location.href = "/login";
        }

        return Promise.reject(refreshError);
      }
    }

    // If refresh is already in progress, wait for it to complete
    return new Promise((resolve, reject) => {
      subscribeTokenRefresh((token: string) => {
        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${token}`;
        }
        resolve(axiosInstance(originalRequest));
      });
    });
  };
}
