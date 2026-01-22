/**
 * Course Hooks
 * React Query hooks for course operations
 */

'use client';

import { useMutation, useQuery, useQueryClient, type UseMutationOptions, type UseQueryOptions } from '@tanstack/react-query';
import * as courseApi from '@/lib/api/course.api';
import { queryKeys } from './query-keys';
import type {
  Course,
  CourseSearchParams,
  CourseStatsResponse,
  CreateCourseRequest,
  CourseDetailResponse,
  PageResponse,
  PaginationParams,
  PublishCourseRequest,
  UpdateCourseRequest,
} from '@/types';

/**
 * Get all courses (paginated)
 */
export function useCourses(params?: PaginationParams, options?: UseQueryOptions<PageResponse<Course>>) {
  return useQuery({
    queryKey: queryKeys.courses.all(params),
    queryFn: () => courseApi.getAllCourses(params),
    ...options,
  });
}

/**
 * Search courses
 */
export function useSearchCourses(params?: CourseSearchParams, options?: UseQueryOptions<PageResponse<Course>>) {
  return useQuery({
    queryKey: queryKeys.courses.search(params),
    queryFn: () => courseApi.searchCourses(params || {}),
    ...options,
  });
}

/**
 * Get featured courses
 */
export function useFeaturedCourses(params?: PaginationParams, options?: UseQueryOptions<PageResponse<Course>>) {
  return useQuery({
    queryKey: queryKeys.courses.featured(params),
    queryFn: () => courseApi.getFeaturedCourses(params),
    ...options,
  });
}

/**
 * Get popular courses
 */
export function usePopularCourses(params?: PaginationParams, options?: UseQueryOptions<PageResponse<Course>>) {
  return useQuery({
    queryKey: queryKeys.courses.popular(params),
    queryFn: () => courseApi.getPopularCourses(params),
    ...options,
  });
}

/**
 * Get single course
 */
export function useCourse(id: number, options?: UseQueryOptions<CourseDetailResponse>) {
  return useQuery({
    queryKey: queryKeys.courses.detail(id),
    queryFn: () => courseApi.getCourseById(id),
    enabled: Boolean(id),
    ...options,
  });
}

/**
 * Get my courses (teacher)
 */
export function useMyCourses(params?: PaginationParams, options?: UseQueryOptions<PageResponse<Course>>) {
  return useQuery({
    queryKey: queryKeys.courses.myCourses(params),
    queryFn: () => courseApi.getMyCourses(params),
    ...options,
  });
}

/**
 * Get courses by category
 */
export function useCoursesByCategory(categoryId: number, params?: PaginationParams, options?: UseQueryOptions<PageResponse<Course>>) {
  return useQuery({
    queryKey: queryKeys.courses.byCategory(categoryId, params),
    queryFn: () => courseApi.getCoursesByCategory(categoryId, params),
    enabled: Boolean(categoryId),
    ...options,
  });
}

/**
 * Get courses by tag
 */
export function useCoursesByTag(tagId: number, params?: PaginationParams, options?: UseQueryOptions<PageResponse<Course>>) {
  return useQuery({
    queryKey: queryKeys.courses.byTag(tagId, params),
    queryFn: () => courseApi.getCoursesByTag(tagId, params),
    enabled: Boolean(tagId),
    ...options,
  });
}

/**
 * Get courses by teacher
 */
export function useCoursesByTeacher(teacherId: number, params?: PaginationParams, options?: UseQueryOptions<PageResponse<Course>>) {
  return useQuery({
    queryKey: queryKeys.courses.byTeacher(teacherId, params),
    queryFn: () => courseApi.getCoursesByTeacher(teacherId, params),
    enabled: Boolean(teacherId),
    ...options,
  });
}

/**
 * Get course stats
 */
export function useCourseStats(id: number, options?: UseQueryOptions<CourseStatsResponse>) {
  return useQuery({
    queryKey: queryKeys.courses.stats(id),
    queryFn: () => courseApi.getCourseStats(id),
    enabled: Boolean(id),
    ...options,
  });
}

/**
 * Create course
 */
export function useCreateCourse(options?: UseMutationOptions<CourseDetailResponse, Error, CreateCourseRequest>) {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: CreateCourseRequest) => courseApi.createCourse(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.courses.all() });
      queryClient.invalidateQueries({ queryKey: queryKeys.courses.myCourses() });
    },
    ...options,
  });
}

/**
 * Update course
 */
export function useUpdateCourse(options?: UseMutationOptions<CourseDetailResponse, Error, { id: number; data: UpdateCourseRequest }>) {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }) => courseApi.updateCourse(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.courses.detail(variables.id) });
      queryClient.invalidateQueries({ queryKey: queryKeys.courses.all() });
      queryClient.invalidateQueries({ queryKey: queryKeys.courses.myCourses() });
    },
    ...options,
  });
}

/**
 * Delete course
 */
export function useDeleteCourse(options?: UseMutationOptions<void, Error, number>) {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: number) => courseApi.deleteCourse(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.courses.all() });
      queryClient.invalidateQueries({ queryKey: queryKeys.courses.myCourses() });
    },
    ...options,
  });
}

/**
 * Publish course
 */
export function usePublishCourse(options?: UseMutationOptions<CourseDetailResponse, Error, { id: number; data: PublishCourseRequest }>) {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }) => courseApi.publishCourse(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.courses.detail(variables.id) });
      queryClient.invalidateQueries({ queryKey: queryKeys.courses.all() });
      queryClient.invalidateQueries({ queryKey: queryKeys.courses.myCourses() });
    },
    ...options,
  });
}

/**
 * Unpublish course
 */
export function useUnpublishCourse(options?: UseMutationOptions<CourseDetailResponse, Error, number>) {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: number) => courseApi.unpublishCourse(id),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.courses.detail(id) });
      queryClient.invalidateQueries({ queryKey: queryKeys.courses.all() });
      queryClient.invalidateQueries({ queryKey: queryKeys.courses.myCourses() });
    },
    ...options,
  });
}
