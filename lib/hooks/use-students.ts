/**
 * Student Hooks
 * React Query hooks for student operations
 */

'use client';

import { useMutation, useQuery, useQueryClient, type UseMutationOptions, type UseQueryOptions } from '@tanstack/react-query';
import * as studentApi from '@/lib/api/student.api';
import { queryKeys } from './query-keys';
import type {
  CompleteProfileRequest,
  Course,
  PageResponse,
  PaginationParams,
  Student,
  StudentDashboardResponse,
  StudentSearchParams,
  StudentStatsResponse,
  UpdateStudentRequest,
  StudentCourseResponse,
} from '@/types';

/**
 * Get all students (paginated)
 */
export function useStudents(params?: StudentSearchParams, options?: UseQueryOptions<PageResponse<Student>>) {
  return useQuery({
    queryKey: queryKeys.students.all(params),
    queryFn: () => studentApi.getAllStudents(params),
    ...options,
  });
}

/**
 * Get single student
 */
export function useStudent(id: number, options?: UseQueryOptions<Student>) {
  return useQuery({
    queryKey: queryKeys.students.detail(id),
    queryFn: () => studentApi.getStudentById(id),
    enabled: Boolean(id),
    ...options,
  });
}

/**
 * Get my student profile
 */
export function useMyStudentProfile(options?: UseQueryOptions<Student>) {
  return useQuery({
    queryKey: queryKeys.students.me,
    queryFn: () => studentApi.getMyStudentProfile(),
    ...options,
  });
}

/**
 * Get student's enrolled courses
 */
export function useStudentCourses(id: number, params?: PaginationParams, options?: UseQueryOptions<PageResponse<StudentCourseResponse>>) {
  return useQuery({
    queryKey: queryKeys.students.courses(id, params),
    queryFn: () => studentApi.getStudentCourses(id, params),
    enabled: Boolean(id),
    ...options,
  });
}

/**
 * Get my enrolled courses
 */
export function useMyEnrolledCourses(params?: PaginationParams, options?: UseQueryOptions<PageResponse<StudentCourseResponse>>) {
  return useQuery({
    queryKey: queryKeys.students.myCourses(params),
    queryFn: () => studentApi.getMyCourses(params),
    ...options,
  });
}

/**
 * Get student stats
 */
export function useStudentStats(id: number, options?: UseQueryOptions<StudentStatsResponse>) {
  return useQuery({
    queryKey: queryKeys.students.stats(id),
    queryFn: () => studentApi.getStudentStats(id),
    enabled: Boolean(id),
    ...options,
  });
}

/**
 * Get my stats
 */
export function useMyStudentStats(options?: UseQueryOptions<StudentStatsResponse>) {
  return useQuery({
    queryKey: queryKeys.students.myStats,
    queryFn: () => studentApi.getMyStats(),
    ...options,
  });
}

/**
 * Get student dashboard
 */
export function useStudentDashboard(options?: UseQueryOptions<StudentDashboardResponse>) {
  return useQuery({
    queryKey: queryKeys.students.dashboard,
    queryFn: () => studentApi.getStudentDashboardStats(),
    ...options,
  });
}

/**
 * Update my profile
 */
export function useUpdateMyStudentProfile(options?: UseMutationOptions<Student, Error, UpdateStudentRequest>) {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: UpdateStudentRequest) => studentApi.updateMyStudentProfile(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.students.me });
      queryClient.invalidateQueries({ queryKey: queryKeys.auth.currentUser });
    },
    ...options,
  });
}
