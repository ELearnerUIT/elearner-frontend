/**
 * API Configuration
 * Central configuration for API client
 */

export const API_CONFIG = {
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080",
  timeout: 30000, // 30 seconds
  withCredentials: false,
} as const;

export const RETRY_CONFIG = {
  maxRetries: 3,
  retryDelay: 1000, // 1 second base delay
  retryableStatuses: [408, 429, 500, 502, 503, 504],
  retryableMethods: ["GET", "PUT", "DELETE", "HEAD", "OPTIONS"],
} as const;
