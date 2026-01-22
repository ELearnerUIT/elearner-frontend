/**
 * Progress Hooks
 * React Query hooks for learning progress operations
 */

'use client';

import { useMutation, useQuery, useQueryClient, type UseMutationOptions, type UseQueryOptions } from '@tanstack/react-query';
import * as progressApi from '@/lib/api/progress.api';
import { queryKeys } from './query-keys';
import type {
  CourseProgressResponse,
  LessonProgressResponse,
  UpdateLessonProgressRequest,
} from '@/types';

/**
 * Get lesson progress
 */
export function useLessonProgress(lessonId: number, options?: UseQueryOptions<LessonProgressResponse>) {
  return useQuery({
    queryKey: queryKeys.progress.lesson(lessonId),
    queryFn: () => progressApi.getLessonProgress(lessonId),
    enabled: Boolean(lessonId),
    ...options,
  });
}

/**
 * Get course progress
 */
export function useCourseProgress(courseId: number, options?: UseQueryOptions<CourseProgressResponse>) {
  return useQuery({
    queryKey: queryKeys.progress.course(courseId),
    queryFn: () => progressApi.getCourseProgress(courseId),
    enabled: Boolean(courseId),
    ...options,
  });
}

/**
 * Update lesson progress
 */
export function useUpdateLessonProgress(options?: UseMutationOptions<LessonProgressResponse, Error, { lessonId: number; data: UpdateLessonProgressRequest }>) {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ lessonId, data }) => progressApi.updateLessonProgress(lessonId, data),
    onSuccess: (response, variables) => {
      // Invalidate lesson progress
      queryClient.invalidateQueries({ queryKey: queryKeys.progress.lesson(variables.lessonId) });
      
      // Invalidate related queries
      queryClient.invalidateQueries({ queryKey: queryKeys.students.myStats });
      queryClient.invalidateQueries({ queryKey: queryKeys.students.dashboard });
    },
    ...options,
  });
}

/**
 * Mark lesson as complete
 */
export function useCompleteLesson(options?: UseMutationOptions<LessonProgressResponse, Error, number>) {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (lessonId: number) => progressApi.updateLessonProgress(lessonId, { watchedSeconds: 0, isCompleted: true }),
    onSuccess: (response, lessonId) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.progress.lesson(lessonId) });
      queryClient.invalidateQueries({ queryKey: queryKeys.students.myStats });
      queryClient.invalidateQueries({ queryKey: queryKeys.students.dashboard });
    },
    ...options,
  });
}
