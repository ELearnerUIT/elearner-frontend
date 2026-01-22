/**
 * Course Preview API
 * Course preview with chapters and lessons structure
 */

import { apiClient } from './client';
import type {
  CoursePreviewResponse,
  PreviewStreamUrlResponse,
  CoursePublishedResponse,
} from '@/types';

/**
 * Get course preview (public)
 * GET /courses/{courseId}/preview
 */
export async function getCoursePreview(courseId: number): Promise<CoursePreviewResponse> {
  const response = await apiClient.get<CoursePreviewResponse>(`/courses/${courseId}/preview`);
  return response.data;
}

/**
 * Get preview lesson stream URL (public)
 * GET /courses/{courseId}/lessons/{lessonId}/preview-stream
 */
export async function getPreviewLessonStreamUrl(courseId: number, lessonId: number): Promise<PreviewStreamUrlResponse> {
  const response = await apiClient.get<PreviewStreamUrlResponse>(`/courses/${courseId}/lessons/${lessonId}/preview-stream`);
  return response.data;
}

/**
 * Get published course structure (enrolled student)
 * GET /enrollments/{enrollmentId}/course-content
 */
export async function getPublishedCourseContent(enrollmentId: number): Promise<CoursePublishedResponse> {
  const response = await apiClient.get<CoursePublishedResponse>(`/enrollments/${enrollmentId}/course-content`);
  return response.data;
}
