/**
 * Mutation State Hook
 * Tracks mutation status with loading/success/error states for UI feedback
 */

import { useState, useCallback } from 'react';
import { useToast } from '@/lib/ui/toast';
import type { ApiException } from '@/lib/api/error-handler';

export interface MutationState {
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  error: ApiException | null;
}

interface UseMutationStateOptions {
  successMessage?: string;
  errorMessage?: string;
  onSuccess?: () => void;
  onError?: (error: ApiException) => void;
  showToast?: boolean;
}

/**
 * Hook for tracking mutation state with automatic toast notifications
 * 
 * @example
 * ```tsx
 * const { mutationState, executeMutation } = useMutationState({
 *   successMessage: 'Course created successfully',
 *   errorMessage: 'Failed to create course'
 * });
 * 
 * const handleSubmit = async (data) => {
 *   await executeMutation(async () => {
 *     return createCourse(data);
 *   });
 * };
 * ```
 */
export function useMutationState(options: UseMutationStateOptions = {}) {
  const {
    successMessage,
    errorMessage,
    onSuccess,
    onError,
    showToast = true,
  } = options;

  const { showToast: toast } = useToast();
  const [state, setState] = useState<MutationState>({
    isLoading: false,
    isSuccess: false,
    isError: false,
    error: null,
  });

  const executeMutation = useCallback(
    async <T,>(mutationFn: () => Promise<T>): Promise<T | null> => {
      // Reset state
      setState({
        isLoading: true,
        isSuccess: false,
        isError: false,
        error: null,
      });

      try {
        const result = await mutationFn();

        setState({
          isLoading: false,
          isSuccess: true,
          isError: false,
          error: null,
        });

        if (showToast && successMessage) {
          toast('success', successMessage);
        }

        onSuccess?.();
        return result;
      } catch (error) {
        const apiError = error as ApiException;

        setState({
          isLoading: false,
          isSuccess: false,
          isError: true,
          error: apiError,
        });

        if (showToast) {
          const message = errorMessage || apiError.message || 'An error occurred';
          toast('error', message);
        }

        onError?.(apiError);
        return null;
      }
    },
    [successMessage, errorMessage, onSuccess, onError, showToast, toast]
  );

  const reset = useCallback(() => {
    setState({
      isLoading: false,
      isSuccess: false,
      isError: false,
      error: null,
    });
  }, []);

  return {
    mutationState: state,
    executeMutation,
    reset,
    isLoading: state.isLoading,
    isSuccess: state.isSuccess,
    isError: state.isError,
    error: state.error,
  };
}

/**
 * Extract field errors from ApiException for form validation
 * 
 * @example
 * ```tsx
 * const fieldErrors = getFieldErrors(error);
 * <input {...register('email')} />
 * {fieldErrors.email && <FieldError error={fieldErrors.email} />}
 * ```
 */
export function getFieldErrors(error: ApiException | null): Record<string, string> {
  if (!error?.errors) return {};

  return error.errors.reduce((acc, err) => {
    acc[err.field] = err.message;
    return acc;
  }, {} as Record<string, string>);
}

/**
 * Check if error is a specific HTTP status
 */
export function isErrorStatus(error: unknown, status: number): boolean {
  return error instanceof Error && 'status' in error && error.status === status;
}

/**
 * Check if error is unauthorized (401)
 */
export function isUnauthorizedError(error: unknown): boolean {
  return isErrorStatus(error, 401);
}

/**
 * Check if error is forbidden (403)
 */
export function isForbiddenError(error: unknown): boolean {
  return isErrorStatus(error, 403);
}

/**
 * Check if error is not found (404)
 */
export function isNotFoundError(error: unknown): boolean {
  return isErrorStatus(error, 404);
}

/**
 * Check if error is validation error (400 with field errors)
 */
export function isValidationError(error: unknown): boolean {
  return (
    error instanceof Error &&
    'status' in error &&
    error.status === 400 &&
    'errors' in error &&
    Array.isArray((error as ApiException).errors) &&
    (error as ApiException).errors!.length > 0
  );
}
