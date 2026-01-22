/**
 * API Error Handler
 * Centralized error handling for API requests
 */

import { AxiosError } from 'axios';
import type { ApiError } from '@/types';

/**
 * Custom API Error class
 */
export class ApiException extends Error {
  status: number;
  code?: string;
  errors?: Array<{ field: string; message: string }>;
  
  constructor(
    message: string,
    status: number,
    code?: string,
    errors?: Array<{ field: string; message: string }>
  ) {
    super(message);
    this.name = 'ApiException';
    this.status = status;
    this.code = code;
    this.errors = errors;
  }
}

/**
 * Handle API errors
 */
export function handleApiError(error: unknown): never {
  // Axios error with response
  if (error && typeof error === 'object' && 'isAxiosError' in error && error.isAxiosError) {
    const axiosError = error as AxiosError;
    if (axiosError.response) {
      const apiError = axiosError.response.data as ApiError;
      
      throw new ApiException(
        apiError.message || axiosError.message,
        apiError.status || axiosError.response.status,
        apiError.code,
        apiError.errors
      );
    }
  
    // Axios error without response (network error)
    if (axiosError.code === 'ECONNABORTED') {
      throw new ApiException('Request timeout', 408);
    }
    
    if (axiosError.code === 'ERR_NETWORK') {
      throw new ApiException('Network error. Please check your connection.', 0);
    }
    
    throw new ApiException(axiosError.message || 'An unexpected error occurred', 500);
  }
  
  // Generic error
  if (error instanceof Error) {
    throw new ApiException(error.message, 500);
  }
  
  // Unknown error
  throw new ApiException('An unexpected error occurred', 500);
}

/**
 * Check if error is unauthorized
 */
export function isUnauthorizedError(error: unknown): boolean {
  return error instanceof ApiException && error.status === 401;
}

/**
 * Check if error is forbidden
 */
export function isForbiddenError(error: unknown): boolean {
  return error instanceof ApiException && error.status === 403;
}

/**
 * Check if error is not found
 */
export function isNotFoundError(error: unknown): boolean {
  return error instanceof ApiException && error.status === 404;
}

/**
 * Check if error is validation error
 */
export function isValidationError(error: unknown): boolean {
  return error instanceof ApiException && error.status === 400 && !!error.errors;
}

/**
 * Get error message from error object
 */
export function getErrorMessage(error: unknown): string {
  if (error instanceof ApiException) {
    return error.message;
  }
  
  if (error instanceof Error) {
    return error.message;
  }
  
  return 'An unexpected error occurred';
}

/**
 * Get validation errors from error object
 */
export function getValidationErrors(error: unknown): Record<string, string> {
  if (error instanceof ApiException && error.errors) {
    return error.errors.reduce((acc, err) => {
      acc[err.field] = err.message;
      return acc;
    }, {} as Record<string, string>);
  }
  
  return {};
}
