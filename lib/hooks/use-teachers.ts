/**
 * Teacher Hooks
 * React Query hooks for teacher operations
 */

'use client';

import { useMutation, useQuery, useQueryClient, type UseMutationOptions, type UseQueryOptions } from '@tanstack/react-query';
import * as teacherApi from '@/lib/api/teacher.api';
import { queryKeys } from './query-keys';
import type {
  ApproveTeacherRequest,
  CompleteTeacherProfileRequest,
  PageResponse,
  PaginationParams,
  Teacher,
  TeacherDashboardResponse,
  TeacherProfile,
  TeacherSearchParams,
  TeacherStatsResponse,
  UpdateTeacherRequest,
} from '@/types';

/**
 * Get all teachers (paginated)
 */
export function useTeachers(params?: TeacherSearchParams, options?: UseQueryOptions<PageResponse<Teacher>>) {
  return useQuery({
    queryKey: queryKeys.teachers.all(params),
    queryFn: () => teacherApi.getAllTeachers(params),
    ...options,
  });
}

/**
 * Get single teacher
 */
export function useTeacher(id: number, options?: UseQueryOptions<Teacher>) {
  return useQuery({
    queryKey: queryKeys.teachers.detail(id),
    queryFn: () => teacherApi.getTeacherById(id),
    enabled: Boolean(id),
    ...options,
  });
}

/**
 * Get teacher profile
 */
export function useTeacherProfile(id: number, options?: UseQueryOptions<TeacherProfile>) {
  return useQuery({
    queryKey: queryKeys.teachers.profile(id),
    queryFn: () => teacherApi.getTeacherPublicProfile(id),
    enabled: Boolean(id),
    ...options,
  });
}

/**
 * Get my teacher profile
 */
export function useMyTeacherProfile(options?: UseQueryOptions<Teacher>) {
  return useQuery({
    queryKey: queryKeys.teachers.me,
    queryFn: () => teacherApi.getMyTeacherProfile(),
    ...options,
  });
}

/**
 * Get teacher stats
 */
export function useTeacherStats(id: number, options?: UseQueryOptions<TeacherStatsResponse>) {
  return useQuery({
    queryKey: queryKeys.teachers.stats(id),
    queryFn: () => teacherApi.getTeacherStats(id),
    enabled: Boolean(id),
    ...options,
  });
}

/**
 * Get my teacher stats
 */
export function useMyTeacherStats(options?: UseQueryOptions<TeacherStatsResponse>) {
  return useQuery({
    queryKey: queryKeys.teachers.myStats,
    queryFn: () => teacherApi.getMyTeacherStats(),
    ...options,
  });
}

/**
 * Get teacher dashboard
 */
export function useTeacherDashboard(options?: UseQueryOptions<TeacherDashboardResponse>) {
  return useQuery({
    queryKey: queryKeys.teachers.dashboard,
    queryFn: () => teacherApi.getTeacherDashboardStats(),
    ...options,
  });
}

/**
 * Update my teacher profile
 */
export function useUpdateMyTeacherProfile(options?: UseMutationOptions<Teacher, Error, UpdateTeacherRequest>) {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: UpdateTeacherRequest) => teacherApi.updateMyTeacherProfile(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.teachers.me });
      queryClient.invalidateQueries({ queryKey: queryKeys.auth.currentUser });
    },
    ...options,
  });
}
