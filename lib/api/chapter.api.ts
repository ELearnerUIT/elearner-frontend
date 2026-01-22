/**
 * Chapter API
 * Chapter management within course versions
 */

import { apiClient } from './client';
import type {
  ChapterResponse,
  CreateChapterRequest,
  UpdateChapterRequest,
  ReorderChaptersRequest,
} from '@/types';

/**
 * Get all chapters in a version (teacher/student)
 * GET /courses/{courseId}/versions/{versionId}/chapters
 */
export async function getChapters(courseId: number, versionId: number): Promise<ChapterResponse[]> {
  const response = await apiClient.get<ChapterResponse[]>(`/courses/${courseId}/versions/${versionId}/chapters`);
  return response.data;
}

/**
 * Get chapter by ID (teacher/student)
 * GET /chapters/{chapterId}
 */
export async function getChapterById(chapterId: number): Promise<ChapterResponse> {
  const response = await apiClient.get<ChapterResponse>(`/chapters/${chapterId}`);
  return response.data;
}

/**
 * Create chapter (teacher)
 * POST /courses/{courseId}/versions/{versionId}/chapters
 */
export async function createChapter(
  courseId: number,
  versionId: number,
  data: CreateChapterRequest
): Promise<ChapterResponse> {
  const response = await apiClient.post<ChapterResponse>(`/courses/${courseId}/versions/${versionId}/chapters`, data);
  return response.data;
}

/**
 * Update chapter (teacher)
 * PUT /courses/{courseId}/versions/{versionId}/chapters/{chapterId}
 */
export async function updateChapter(
  courseId: number,
  versionId: number,
  chapterId: number,
  data: UpdateChapterRequest
): Promise<ChapterResponse> {
  const response = await apiClient.put<ChapterResponse>(
    `/courses/${courseId}/versions/${versionId}/chapters/${chapterId}`,
    data
  );
  return response.data;
}

/**
 * Delete chapter (teacher)
 * DELETE /courses/{courseId}/versions/{versionId}/chapters/{chapterId}
 */
export async function deleteChapter(courseId: number, versionId: number, chapterId: number): Promise<void> {
  await apiClient.delete(`/courses/${courseId}/versions/${versionId}/chapters/${chapterId}`);
}

/**
 * Reorder chapters (teacher)
 * POST /chapters/{chapterId}/reorder
 */
export async function reorderChapters(chapterId: number, data: ReorderChaptersRequest): Promise<void> {
  await apiClient.post(`/chapters/${chapterId}/reorder`, data);
}
