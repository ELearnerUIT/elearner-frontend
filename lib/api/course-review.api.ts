/**
 * Course Review API
 * Course reviews, ratings, and feedback management
 */

import { apiClient } from './client';
import type {
  ReviewResponse,
  CreateReviewRequest,
  UpdateReviewRequest,
  ReviewQueryParams,
  RatingSummaryResponse,
  PageResponse,
} from '@/types';

/**
 * Get course reviews (public)
 * GET /courses/{courseId}/reviews
 */
export async function getCourseReviews(
  courseId: number,
  params?: ReviewQueryParams
): Promise<PageResponse<ReviewResponse>> {
  const response = await apiClient.get<PageResponse<ReviewResponse>>(`/courses/${courseId}/reviews`, { params });
  return response.data;
}

/**
 * Get review by ID (public)
 * GET /reviews/{reviewId}
 */
export async function getReviewById(reviewId: number): Promise<ReviewResponse> {
  const response = await apiClient.get<ReviewResponse>(`/reviews/${reviewId}`);
  return response.data;
}

/**
 * Get course rating summary (public)
 * GET /courses/{courseId}/reviews/summary
 */
export async function getCourseRatingSummary(courseId: number): Promise<RatingSummaryResponse> {
  const response = await apiClient.get<RatingSummaryResponse>(`/courses/${courseId}/reviews/summary`);
  return response.data;
}

/**
 * Get my review for a course (student)
 * GET /courses/{courseId}/reviews/me
 */
export async function getMyReview(courseId: number): Promise<ReviewResponse> {
  const response = await apiClient.get<ReviewResponse>(`/courses/${courseId}/reviews/me`);
  return response.data;
}

/**
 * Create review (student)
 * POST /courses/{courseId}/reviews
 */
export async function createReview(courseId: number, data: CreateReviewRequest): Promise<ReviewResponse> {
  const response = await apiClient.post<ReviewResponse>(`/courses/${courseId}/reviews`, data);
  return response.data;
}

/**
 * Update review (student)
 * PUT /reviews/{reviewId}
 */
export async function updateReview(reviewId: number, data: UpdateReviewRequest): Promise<ReviewResponse> {
  const response = await apiClient.put<ReviewResponse>(`/reviews/${reviewId}`, data);
  return response.data;
}

/**
 * Delete review (student)
 * DELETE /reviews/{reviewId}
 */
export async function deleteReview(reviewId: number): Promise<void> {
  await apiClient.delete(`/reviews/${reviewId}`);
}

/**
 * Get student reviews (admin/teacher)
 * GET /students/{studentId}/reviews
 */
export async function getStudentReviews(
  studentId: number,
  params?: ReviewQueryParams
): Promise<PageResponse<ReviewResponse>> {
  const response = await apiClient.get<PageResponse<ReviewResponse>>(`/students/${studentId}/reviews`, { params });
  return response.data;
}

/**
 * Get my submitted reviews (student)
 * GET /students/me/reviews
 */
export async function getMyReviews(params?: ReviewQueryParams): Promise<PageResponse<ReviewResponse>> {
  const response = await apiClient.get<PageResponse<ReviewResponse>>('/students/me/reviews', { params });
  return response.data;
}
