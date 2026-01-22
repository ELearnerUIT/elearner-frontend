/**
 * Lesson Resource API
 * Lesson resource management (files, links, embeds)
 */

import { apiClient } from './client';
import type {
  LessonResourceResponse,
  CreateLinkResourceRequest,
  UpdateResourceRequest,
  ReorderResourcesRequest,
} from '@/types';

/**
 * Get all resources for a lesson (teacher/student)
 * GET /lessons/{lessonId}/resources
 */
export async function getLessonResources(lessonId: number): Promise<LessonResourceResponse[]> {
  const response = await apiClient.get<LessonResourceResponse[]>(`/lessons/${lessonId}/resources`);
  return response.data;
}

/**
 * Get resource by ID (teacher/student)
 * GET /lessons/{lessonId}/resources/{resourceId}
 */
export async function getResourceById(lessonId: number, resourceId: number): Promise<LessonResourceResponse> {
  const response = await apiClient.get<LessonResourceResponse>(`/lessons/${lessonId}/resources/${resourceId}`);
  return response.data;
}

/**
 * Add file resource (teacher)
 * POST /lessons/{lessonId}/resources/file
 */
export async function addFileResource(
  lessonId: number,
  file: File,
  title?: string,
  description?: string,
  isRequired?: boolean
): Promise<LessonResourceResponse> {
  const formData = new FormData();
  formData.append('file', file);
  if (title) formData.append('title', title);
  if (description) formData.append('description', description);
  if (isRequired !== undefined) formData.append('isRequired', String(isRequired));
  
  const response = await apiClient.post<LessonResourceResponse>(`/lessons/${lessonId}/resources/file`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
}

/**
 * Create link/embed resource (teacher)
 * POST /lessons/{lessonId}/resources
 */
export async function createLinkResource(
  lessonId: number,
  data: CreateLinkResourceRequest
): Promise<LessonResourceResponse> {
  const response = await apiClient.post<LessonResourceResponse>(`/lessons/${lessonId}/resources`, data);
  return response.data;
}

/**
 * Update resource (teacher)
 * PUT /lessons/{lessonId}/resources/{resourceId}
 */
export async function updateResource(
  lessonId: number,
  resourceId: number,
  data: UpdateResourceRequest
): Promise<LessonResourceResponse> {
  const response = await apiClient.put<LessonResourceResponse>(`/lessons/${lessonId}/resources/${resourceId}`, data);
  return response.data;
}

/**
 * Replace resource file (teacher)
 * PUT /lessons/{lessonId}/resources/{resourceId}/file
 */
export async function replaceResourceFile(
  lessonId: number,
  resourceId: number,
  file: File
): Promise<LessonResourceResponse> {
  const formData = new FormData();
  formData.append('file', file);
  
  const response = await apiClient.put<LessonResourceResponse>(
    `/lessons/${lessonId}/resources/${resourceId}/file`,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  );
  return response.data;
}

/**
 * Delete resource (teacher)
 * DELETE /lessons/{lessonId}/resources/{resourceId}
 */
export async function deleteResource(lessonId: number, resourceId: number): Promise<void> {
  await apiClient.delete(`/lessons/${lessonId}/resources/${resourceId}`);
}

/**
 * Reorder resources (teacher)
 * POST /lessons/{lessonId}/resources/reorder
 */
export async function reorderResources(lessonId: number, data: ReorderResourcesRequest): Promise<void> {
  await apiClient.post(`/lessons/${lessonId}/resources/reorder`, data);
}

/**
 * Download resource (student)
 * GET /lessons/{lessonId}/resources/{resourceId}/download
 */
export async function downloadResource(lessonId: number, resourceId: number): Promise<Blob> {
  const response = await apiClient.get<Blob>(`/lessons/${lessonId}/resources/${resourceId}/download`, {
    responseType: 'blob',
  });
  return response.data;
}
