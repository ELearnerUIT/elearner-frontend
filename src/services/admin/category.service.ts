// Admin Category Service
// API endpoints: /api/v1/categories/admin/* (Admin Only)

import { axiosClient } from "@/lib/api/axios";
import { unwrapResponse } from "@/lib/api/unwrap";
import { Category } from "@/lib/learner/category/categories";
import {
  CategoryRequest,
  CategoryStatsResponse,
} from "@/lib/admin/category/categories";

const CATEGORY_PREFIX = "/categories";
const ADMIN_CATEGORY_PREFIX = "/categories/admin";

export const adminCategoryService = {
  /**
   * Create a new category (Admin only)
   * POST /api/v1/categories
   */
  createCategory: async (data: CategoryRequest): Promise<Category> => {
    const response = await axiosClient.post(CATEGORY_PREFIX, data);
    return unwrapResponse(response);
  },

  /**
   * Update a category (Admin only)
   * PUT /api/v1/categories/{id}
   */
  updateCategory: async (
    id: number,
    data: CategoryRequest,
  ): Promise<Category> => {
    const response = await axiosClient.put(`${CATEGORY_PREFIX}/${id}`, data);
    return unwrapResponse(response);
  },

  /**
   * Delete a category (soft delete) (Admin only)
   * DELETE /api/v1/categories/{id}
   */
  deleteCategory: async (id: number): Promise<void> => {
    const response = await axiosClient.delete(`${CATEGORY_PREFIX}/${id}`);
    return unwrapResponse(response);
  },

  /**
   * Restore a deleted category (Admin only)
   * PATCH /api/v1/categories/{id}/restore
   */
  restoreCategory: async (id: number): Promise<Category> => {
    const response = await axiosClient.patch(
      `${CATEGORY_PREFIX}/${id}/restore`,
    );
    return unwrapResponse(response);
  },

  /**
   * Get category by ID for admin (includes deleted)
   * GET /api/v1/categories/admin/{id}
   */
  getCategoryByIdForAdmin: async (id: number): Promise<Category> => {
    const response = await axiosClient.get(`${ADMIN_CATEGORY_PREFIX}/${id}`);
    return unwrapResponse(response);
  },

  /**
   * Get all deleted categories (Admin only)
   * GET /api/v1/categories/admin/deleted
   */
  getAllDeletedCategories: async (): Promise<Category[]> => {
    const response = await axiosClient.get(`${ADMIN_CATEGORY_PREFIX}/deleted`);
    return unwrapResponse(response);
  },

  /**
   * Get category statistics (Admin only)
   * GET /api/v1/categories/admin/stats
   */
  getCategoryStatistics: async (): Promise<CategoryStatsResponse[]> => {
    const response = await axiosClient.get(`${ADMIN_CATEGORY_PREFIX}/stats`);
    return unwrapResponse(response);
  },

  /**
   * Get all active categories (public endpoint)
   * GET /api/v1/categories
   */
  getActiveCategories: async (): Promise<Category[]> => {
    const response = await axiosClient.get(CATEGORY_PREFIX);
    return unwrapResponse(response);
  },

  /**
   * Get category tree (public endpoint)
   * GET /api/v1/categories/tree
   */
  getCategoryTree: async (): Promise<Category[]> => {
    const response = await axiosClient.get(`${CATEGORY_PREFIX}/tree`);
    return unwrapResponse(response);
  },
};
