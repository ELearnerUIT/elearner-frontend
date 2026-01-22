/**
 * Progress API
 * Lesson progress tracking and video watch time
 */

import { apiClient } from './client';
import type {
  LessonProgressResponse,
  UpdateLessonProgressRequest,
  MarkLessonCompleteRequest,
  TrackVideoProgressRequest,
  CourseProgressResponse,
} from '@/types';

/**
 * Get lesson progress (student)
 * GET /progress/lessons/{lessonId}
 */
export async function getLessonProgress(lessonId: number): Promise<LessonProgressResponse> {
  const response = await apiClient.get<LessonProgressResponse>(`/progress/lessons/${lessonId}`);
  return response.data;
}

/**
 * Update lesson progress (student)
 * PUT /progress/lessons/{lessonId}
 */
export async function updateLessonProgress(
  lessonId: number,
  data: UpdateLessonProgressRequest
): Promise<LessonProgressResponse> {
  const response = await apiClient.put<LessonProgressResponse>(`/progress/lessons/${lessonId}`, data);
  return response.data;
}

/**
 * Mark lesson as complete (student)
 * POST /progress/lessons/{lessonId}/complete
 */
export async function markLessonComplete(
  lessonId: number,
  data?: MarkLessonCompleteRequest
): Promise<LessonProgressResponse> {
  const response = await apiClient.post<LessonProgressResponse>(`/progress/lessons/${lessonId}/complete`, data);
  return response.data;
}

/**
 * Track video progress (student)
 * POST /progress/lessons/{lessonId}/video-progress
 */
export async function trackVideoProgress(lessonId: number, data: TrackVideoProgressRequest): Promise<void> {
  await apiClient.post(`/progress/lessons/${lessonId}/video-progress`, data);
}

/**
 * Get course progress (student)
 * GET /progress/courses/{courseId}
 */
export async function getCourseProgress(courseId: number): Promise<CourseProgressResponse> {
  const response = await apiClient.get<CourseProgressResponse>(`/progress/courses/${courseId}`);
  return response.data;
}

/**
 * Reset lesson progress (student)
 * DELETE /progress/lessons/{lessonId}
 */
export async function resetLessonProgress(lessonId: number): Promise<void> {
  await apiClient.delete(`/progress/lessons/${lessonId}`);
}
