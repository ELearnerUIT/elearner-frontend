/**
 * Lesson API
 * Lesson management, video upload, and streaming
 */

import { apiClient } from './client';
import type {
  LessonResponse,
  CreateLessonRequest,
  UpdateLessonRequest,
  ReorderLessonsRequest,
  VideoUploadUrlResponse,
  VideoUploadCompleteRequest,
  VideoStreamUrlResponse,
} from '@/types';

/**
 * Get all lessons in a chapter (teacher/student)
 * GET /chapters/{chapterId}/lessons
 */
export async function getLessons(chapterId: number): Promise<LessonResponse[]> {
  const response = await apiClient.get<LessonResponse[]>(`/chapters/${chapterId}/lessons`);
  return response.data;
}

/**
 * Get lesson by ID (teacher/student)
 * GET /lessons/{lessonId}
 */
export async function getLessonById(lessonId: number): Promise<LessonResponse> {
  const response = await apiClient.get<LessonResponse>(`/lessons/${lessonId}`);
  return response.data;
}

/**
 * Create lesson (teacher)
 * POST /chapters/{chapterId}/lessons
 */
export async function createLesson(chapterId: number, data: CreateLessonRequest): Promise<LessonResponse> {
  const response = await apiClient.post<LessonResponse>(`/chapters/${chapterId}/lessons`, data);
  return response.data;
}

/**
 * Update lesson (teacher)
 * PUT /lessons/{lessonId}
 */
export async function updateLesson(lessonId: number, data: UpdateLessonRequest): Promise<LessonResponse> {
  const response = await apiClient.put<LessonResponse>(`/lessons/${lessonId}`, data);
  return response.data;
}

/**
 * Delete lesson (teacher)
 * DELETE /lessons/{lessonId}
 */
export async function deleteLesson(lessonId: number): Promise<void> {
  await apiClient.delete(`/lessons/${lessonId}`);
}

/**
 * Reorder lessons (teacher)
 * POST /chapters/{chapterId}/lessons/reorder
 */
export async function reorderLessons(chapterId: number, data: ReorderLessonsRequest): Promise<void> {
  await apiClient.post(`/chapters/${chapterId}/lessons/reorder`, data);
}

// ==================== VIDEO UPLOAD ENDPOINTS ====================

/**
 * Get video upload URL (teacher)
 * GET /lessons/{lessonId}/video/upload-url
 */
export async function getVideoUploadUrl(lessonId: number): Promise<VideoUploadUrlResponse> {
  const response = await apiClient.get<VideoUploadUrlResponse>(`/lessons/${lessonId}/video/upload-url`);
  return response.data;
}

/**
 * Complete video upload (teacher)
 * POST /lessons/{lessonId}/video/upload-complete
 */
export async function completeVideoUpload(
  lessonId: number,
  data: VideoUploadCompleteRequest
): Promise<LessonResponse> {
  const response = await apiClient.post<LessonResponse>(`/lessons/${lessonId}/video/upload-complete`, data);
  return response.data;
}

/**
 * Get video stream URL (student)
 * GET /lessons/{lessonId}/video/stream-url
 */
export async function getVideoStreamUrl(lessonId: number): Promise<VideoStreamUrlResponse> {
  const response = await apiClient.get<VideoStreamUrlResponse>(`/lessons/${lessonId}/video/stream-url`);
  return response.data;
}

/**
 * Delete video (teacher)
 * DELETE /lessons/{lessonId}/video
 */
export async function deleteVideo(lessonId: number): Promise<LessonResponse> {
  const response = await apiClient.delete<LessonResponse>(`/lessons/${lessonId}/video`);
  return response.data;
}
