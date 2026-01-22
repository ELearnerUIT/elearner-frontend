/**
 * Tag API
 * Course tag management, search, and popularity tracking
 */

import { apiClient } from './client';
import type {
  TagResponse,
  CreateTagRequest,
  UpdateTagRequest,
  BulkCreateTagsRequest,
  TagStatsResponse,
  PageResponse,
  PaginationParams,
} from '@/types';

/**
 * Get all tags (public)
 * GET /tags
 */
export async function getAllTags(params?: PaginationParams & {
  search?: string;
}): Promise<PageResponse<TagResponse>> {
  const response = await apiClient.get<PageResponse<TagResponse>>('/tags', { params });
  return response.data;
}

/**
 * Get tag by ID (public)
 * GET /tags/{id}
 */
export async function getTagById(id: number): Promise<TagResponse> {
  const response = await apiClient.get<TagResponse>(`/tags/${id}`);
  return response.data;
}

/**
 * Search tags by name (public)
 * GET /tags/search
 */
export async function searchTags(query: string): Promise<TagResponse[]> {
  const response = await apiClient.get<TagResponse[]>('/tags/search', {
    params: { query },
  });
  return response.data;
}

/**
 * Get popular tags (public)
 * GET /tags/popular
 */
export async function getPopularTags(params?: {
  limit?: number;
}): Promise<TagResponse[]> {
  const response = await apiClient.get<TagResponse[]>('/tags/popular', { params });
  return response.data;
}

/**
 * Create tag (admin)
 * POST /admin/tags
 */
export async function createTag(data: CreateTagRequest): Promise<TagResponse> {
  const response = await apiClient.post<TagResponse>('/admin/tags', data);
  return response.data;
}

/**
 * Bulk create tags (admin)
 * POST /admin/tags/bulk
 */
export async function bulkCreateTags(data: BulkCreateTagsRequest): Promise<TagResponse[]> {
  const response = await apiClient.post<TagResponse[]>('/admin/tags/bulk', data);
  return response.data;
}

/**
 * Update tag (admin)
 * PUT /admin/tags/{id}
 */
export async function updateTag(id: number, data: UpdateTagRequest): Promise<TagResponse> {
  const response = await apiClient.put<TagResponse>(`/admin/tags/${id}`, data);
  return response.data;
}

/**
 * Delete tag (admin)
 * DELETE /admin/tags/{id}
 */
export async function deleteTag(id: number): Promise<void> {
  await apiClient.delete(`/admin/tags/${id}`);
}

/**
 * Get tag statistics (admin)
 * GET /admin/tags/{id}/stats
 */
export async function getTagStats(id: number): Promise<TagStatsResponse> {
  const response = await apiClient.get<TagStatsResponse>(`/admin/tags/${id}/stats`);
  return response.data;
}
