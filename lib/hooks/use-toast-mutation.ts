/**
 * Enhanced Mutation Hook with Automatic Toast Notifications
 * Wraps React Query mutations to automatically show success/error toasts
 */

import { useMutation, type UseMutationOptions, type UseMutationResult } from '@tanstack/react-query';
import { useToast } from '@/lib/ui/toast';
import type { ApiException } from '@/lib/api/error-handler';

interface ToastMutationOptions<TData, TVariables> extends Omit<UseMutationOptions<TData, ApiException, TVariables>, 'mutationFn'> {
  mutationFn: (variables: TVariables) => Promise<TData>;
  successMessage?: string | ((data: TData) => string);
  errorMessage?: string | ((error: ApiException) => string);
  showSuccessToast?: boolean;
  showErrorToast?: boolean;
}

/**
 * Enhanced useMutation with automatic toast notifications
 * 
 * @example
 * ```tsx
 * const createCourseMutation = useToastMutation({
 *   mutationFn: (data) => createCourse(data),
 *   successMessage: 'Course created successfully!',
 *   errorMessage: 'Failed to create course',
 * });
 * 
 * // Just call mutate - toasts show automatically!
 * createCourseMutation.mutate(courseData);
 * ```
 */
export function useToastMutation<TData = unknown, TVariables = void>({
  mutationFn,
  successMessage,
  errorMessage,
  showSuccessToast = true,
  showErrorToast = true,
  onSuccess,
  onError,
  ...options
}: ToastMutationOptions<TData, TVariables>): UseMutationResult<TData, ApiException, TVariables> {
  const { showToast } = useToast();

  return useMutation<TData, ApiException, TVariables>({
    mutationFn,
    onSuccess: (data, variables, context, ...rest) => {
      // Show success toast
      if (showSuccessToast && successMessage) {
        const message = typeof successMessage === 'function' ? successMessage(data) : successMessage;
        showToast('success', message);
      }

      // Call original onSuccess callback
      if (onSuccess) {
        (onSuccess as any)(data, variables, context, ...rest);
      }
    },
    onError: (error, variables, context, ...rest) => {
      // Show error toast
      if (showErrorToast) {
        const message = errorMessage
          ? typeof errorMessage === 'function'
            ? errorMessage(error)
            : errorMessage
          : error.message || 'An error occurred';
        showToast('error', message);
      }

      // Call original onError callback
      if (onError) {
        (onError as any)(error, variables, context, ...rest);
      }
    },
    ...options,
  });
}

/**
 * Create a mutation hook factory with default toast messages
 * Useful for creating consistent hooks across the app
 * 
 * @example
 * ```tsx
 * const useCreateCourse = createToastMutation({
 *   mutationFn: createCourse,
 *   successMessage: 'Course created!',
 *   errorMessage: 'Failed to create course',
 * });
 * 
 * // In component:
 * const { mutate, isPending } = useCreateCourse();
 * mutate(courseData); // Toasts show automatically!
 * ```
 */
export function createToastMutation<TData = unknown, TVariables = void>(
  defaultOptions: ToastMutationOptions<TData, TVariables>
) {
  return (overrideOptions?: Partial<ToastMutationOptions<TData, TVariables>>) => {
    return useToastMutation({
      ...defaultOptions,
      ...overrideOptions,
    });
  };
}
