/**
 * Review Hooks
 * React Query hooks for course review operations
 */

'use client';

import { useMutation, useQuery, useQueryClient, type UseMutationOptions, type UseQueryOptions } from '@tanstack/react-query';
import * as courseReviewApi from '@/lib/api/course-review.api';
import { queryKeys } from './query-keys';
import type {
  CourseReview,
  CourseReviewSearchParams,
  CreateCourseReviewRequest,
  PageResponse,
  PaginationParams,
  ReviewSummaryResponse,
  UpdateCourseReviewRequest,
} from '@/types';

/**
 * Get reviews for a course
 */
export function useCourseReviews(courseId: number, params?: CourseReviewSearchParams, options?: UseQueryOptions<PageResponse<CourseReview>>) {
  return useQuery({
    queryKey: queryKeys.reviews.all(courseId, params),
    queryFn: () => courseReviewApi.getCourseReviews(courseId, params),
    enabled: Boolean(courseId),
    ...options,
  });
}

/**
 * Get single review
 */
export function useReview(id: number, options?: UseQueryOptions<CourseReview>) {
  return useQuery({
    queryKey: queryKeys.reviews.detail(id),
    queryFn: () => courseReviewApi.getReviewById(id),
    enabled: Boolean(id),
    ...options,
  });
}

/**
 * Get review summary
 */
export function useReviewSummary(courseId: number, options?: UseQueryOptions<ReviewSummaryResponse>) {
  return useQuery({
    queryKey: queryKeys.reviews.summary(courseId),
    queryFn: () => courseReviewApi.getCourseRatingSummary(courseId),
    enabled: Boolean(courseId),
    ...options,
  });
}

/**
 * Get my review for a course
 */
export function useMyReview(courseId: number, options?: UseQueryOptions<CourseReview>) {
  return useQuery({
    queryKey: queryKeys.reviews.my(courseId),
    queryFn: () => courseReviewApi.getMyReview(courseId),
    enabled: Boolean(courseId),
    ...options,
  });
}

/**
 * Get reviews by student
 */
export function useStudentReviews(studentId: number, params?: CourseReviewSearchParams, options?: UseQueryOptions<PageResponse<CourseReview>>) {
  return useQuery({
    queryKey: queryKeys.reviews.student(studentId, params),
    queryFn: () => courseReviewApi.getStudentReviews(studentId, params),
    enabled: Boolean(studentId),
    ...options,
  });
}

/**
 * Get my reviews
 */
export function useMyReviews(params?: CourseReviewSearchParams, options?: UseQueryOptions<PageResponse<CourseReview>>) {
  return useQuery({
    queryKey: queryKeys.reviews.myReviews(params),
    queryFn: () => courseReviewApi.getMyReviews(params),
    ...options,
  });
}

/**
 * Create review
 */
export function useCreateReview(options?: UseMutationOptions<CourseReview, Error, { courseId: number; data: CreateCourseReviewRequest }>) {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ courseId, data }) => courseReviewApi.createReview(courseId, data),
    onSuccess: (review) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.reviews.all(review.courseId) });
      queryClient.invalidateQueries({ queryKey: queryKeys.reviews.summary(review.courseId) });
      queryClient.invalidateQueries({ queryKey: queryKeys.reviews.my(review.courseId) });
      queryClient.invalidateQueries({ queryKey: queryKeys.reviews.myReviews() });
      queryClient.invalidateQueries({ queryKey: queryKeys.courses.detail(review.courseId) });
    },
    ...options,
  });
}

/**
 * Update review
 */
export function useUpdateReview(options?: UseMutationOptions<CourseReview, Error, { id: number; data: UpdateCourseReviewRequest }>) {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }) => courseReviewApi.updateReview(id, data),
    onSuccess: (review) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.reviews.detail(review.id) });
      queryClient.invalidateQueries({ queryKey: queryKeys.reviews.all(review.courseId) });
      queryClient.invalidateQueries({ queryKey: queryKeys.reviews.summary(review.courseId) });
      queryClient.invalidateQueries({ queryKey: queryKeys.reviews.my(review.courseId) });
      queryClient.invalidateQueries({ queryKey: queryKeys.reviews.myReviews() });
      queryClient.invalidateQueries({ queryKey: queryKeys.courses.detail(review.courseId) });
    },
    ...options,
  });
}

/**
 * Delete review
 */
export function useDeleteReview(options?: UseMutationOptions<void, Error, number>) {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: number) => courseReviewApi.deleteReview(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reviews'] });
    },
    ...options,
  });
}
