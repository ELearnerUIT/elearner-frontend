/**
 * Category API
 * Course category management with hierarchical structure
 */

import { apiClient } from './client';
import type {
  CategoryResponse,
  CreateCategoryRequest,
  UpdateCategoryRequest,
  CategoryStatsResponse,
  PageResponse,
  PaginationParams,
} from '@/types';

/**
 * Get all categories (public)
 * GET /categories
 */
export async function getAllCategories(params?: PaginationParams & {
  parentId?: number | 'null';
  search?: string;
}): Promise<PageResponse<CategoryResponse>> {
  const response = await apiClient.get<PageResponse<CategoryResponse>>('/categories', { params });
  return response.data;
}

/**
 * Get category tree (public)
 * GET /categories/tree
 */
export async function getCategoryTree(): Promise<CategoryResponse[]> {
  const response = await apiClient.get<CategoryResponse[]>('/categories/tree');
  return response.data;
}

/**
 * Get category by ID (public)
 * GET /categories/{id}
 */
export async function getCategoryById(id: number): Promise<CategoryResponse> {
  const response = await apiClient.get<CategoryResponse>(`/categories/${id}`);
  return response.data;
}

/**
 * Get category with children (public)
 * GET /categories/{id}/with-children
 */
export async function getCategoryWithChildren(id: number): Promise<CategoryResponse> {
  const response = await apiClient.get<CategoryResponse>(`/categories/${id}/with-children`);
  return response.data;
}

/**
 * Create category (admin)
 * POST /admin/categories
 */
export async function createCategory(data: CreateCategoryRequest): Promise<CategoryResponse> {
  const response = await apiClient.post<CategoryResponse>('/admin/categories', data);
  return response.data;
}

/**
 * Update category (admin)
 * PUT /admin/categories/{id}
 */
export async function updateCategory(id: number, data: UpdateCategoryRequest): Promise<CategoryResponse> {
  const response = await apiClient.put<CategoryResponse>(`/admin/categories/${id}`, data);
  return response.data;
}

/**
 * Delete category (admin)
 * DELETE /admin/categories/{id}
 */
export async function deleteCategory(id: number): Promise<void> {
  await apiClient.delete(`/admin/categories/${id}`);
}

/**
 * Upload category icon (admin)
 * POST /admin/categories/{id}/icon
 */
export async function uploadCategoryIcon(id: number, file: File): Promise<CategoryResponse> {
  const formData = new FormData();
  formData.append('file', file);
  
  const response = await apiClient.post<CategoryResponse>(`/admin/categories/${id}/icon`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
}

/**
 * Get category statistics (admin)
 * GET /admin/categories/{id}/stats
 */
export async function getCategoryStats(id: number): Promise<CategoryStatsResponse> {
  const response = await apiClient.get<CategoryStatsResponse>(`/admin/categories/${id}/stats`);
  return response.data;
}
