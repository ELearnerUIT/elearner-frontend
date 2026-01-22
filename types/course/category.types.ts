/**
 * Category response DTO
 */
export interface CategoryResponse {
  id: number;
  name: string;
  code: string | null;
  description: string;
  visible: boolean;
  parentId: number | null;
  slug: string;
  metaTitle: string | null;
  metaDescription: string | null;
  thumbnailUrl: string | null;
  children: CategoryResponse[];
  courseCount?: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

/**
 * Create category request DTO
 * POST /api/v1/admin/categories
 */
export interface CreateCategoryRequest {
  name: string;
  code?: string;
  description: string;
  visible: boolean;
  parentId?: number;
  slug?: string;
  metaTitle?: string;
  metaDescription?: string;
  thumbnailUrl?: string;
}

/**
 * Update category request DTO
 * PUT /api/v1/admin/categories/{id}
 */
export interface UpdateCategoryRequest {
  name?: string;
  code?: string;
  description?: string;
  visible?: boolean;
  parentId?: number;
  metaTitle?: string;
  metaDescription?: string;
  thumbnailUrl?: string;
}

/**
 * Category statistics response
 * GET /api/v1/admin/categories/stats
 */
export interface CategoryStatsResponse {
  id: number;
  name: string;
  slug: string;
  totalCourses: number;
  totalStudents: number;
  averageRating: number;
  totalRevenue: number;
}
