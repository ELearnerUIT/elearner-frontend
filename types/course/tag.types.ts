import { PaginationParams } from '../shared/api.types';

/**
 * Tag response DTO
 */
export interface TagResponse {
  id: number;
  name: string;
  slug: string;
  courseCount?: number;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  updatedBy: string | null;
  deletedAt: string | null;
}

/**
 * Create tag request DTO
 * POST /api/v1/admin/tags
 */
export interface CreateTagRequest {
  name: string;
}

/**
 * Bulk create tags request DTO
 * POST /api/v1/admin/tags/bulk
 */
export interface BulkCreateTagsRequest {
  tagNames: string[];
}

/**
 * Update tag request DTO
 * PUT /api/v1/admin/tags/{id}
 */
export interface UpdateTagRequest {
  name: string;
}

/**
 * Tag statistics response
 * GET /api/v1/admin/tags/stats
 */
export interface TagStatsResponse {
  id: number;
  name: string;
  slug: string;
  totalCourses: number;
  totalStudents: number;
}

/**
 * Tag query parameters
 */
export interface TagQueryParams extends PaginationParams {
  search?: string;
}

/**
 * Popular tags parameters
 * GET /api/v1/tags/popular
 */
export interface PopularTagsParams {
  limit?: number;
}

/**
 * Search tags parameters
 * GET /api/v1/tags/search
 */
export interface SearchTagsParams {
  query: string;
}
