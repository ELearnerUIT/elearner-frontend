/**
 * Enrollment Hooks
 * React Query hooks for enrollment operations
 */

'use client';

import { useMutation, useQuery, useQueryClient, type UseMutationOptions, type UseQueryOptions } from '@tanstack/react-query';
import * as enrollmentApi from '@/lib/api/enrollment.api';
import { queryKeys } from './query-keys';
import type {
  CreateEnrollmentRequest,
  Enrollment,
  EnrollmentSearchParams,
  PageResponse,
  PaginationParams,
  StudentProgressSummaryResponse,
} from '@/types';

/**
 * Get my enrollments
 */
export function useMyEnrollments(params?: PaginationParams, options?: UseQueryOptions<PageResponse<Enrollment>>) {
  return useQuery({
    queryKey: queryKeys.enrollments.my(params),
    queryFn: () => enrollmentApi.getMyEnrollments(params),
    ...options,
  });
}

/**
 * Get single enrollment
 */
export function useEnrollment(id: number, options?: UseQueryOptions<StudentProgressSummaryResponse>) {
  return useQuery({
    queryKey: queryKeys.enrollments.detail(id),
    queryFn: () => enrollmentApi.getEnrollmentById(id),
    enabled: Boolean(id),
    ...options,
  });
}

/**
 * Get all enrollments (admin)
 */
export function useAllEnrollments(params?: EnrollmentSearchParams, options?: UseQueryOptions<PageResponse<Enrollment>>) {
  return useQuery({
    queryKey: queryKeys.enrollments.all(params),
    queryFn: () => enrollmentApi.getAllEnrollments(params),
    ...options,
  });
}

/**
 * Enroll in course
 */
export function useEnrollInCourse(options?: UseMutationOptions<Enrollment, Error, CreateEnrollmentRequest>) {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: CreateEnrollmentRequest) => enrollmentApi.enrollCourse(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.enrollments.my() });
      queryClient.invalidateQueries({ queryKey: queryKeys.students.myCourses() });
    },
    ...options,
  });
}

/**
 * Cancel enrollment
 */
export function useCancelEnrollment(options?: UseMutationOptions<void, Error, number>) {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: number) => enrollmentApi.cancelEnrollment(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.enrollments.my() });
      queryClient.invalidateQueries({ queryKey: queryKeys.students.myCourses() });
    },
    ...options,
  });
}
