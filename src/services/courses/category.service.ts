import {
  CategoryRequest,
  CategoryResponse,
  CategoryStatsResponse,
} from "./course.types";
import { axiosClient } from "@/lib/api/axios";
import { unwrapResponse } from "@/lib/api/unwrap";
import { ApiResponse } from "@/lib/api/api.types";

const CATEGORY_PREFIX = "/categories";

export const categoryService = {
  /**
   * Create a new category (Admin only)
   */
  createCategory: async (
    payload: CategoryRequest,
  ): Promise<CategoryResponse> => {
    const response = await axiosClient.post<ApiResponse<CategoryResponse>>(
      CATEGORY_PREFIX,
      payload,
    );

    return unwrapResponse(response);
  },

  /**
   * Get category by ID
   */
  getCategoryById: async (id: number): Promise<CategoryResponse> => {
    const response = await axiosClient.get<ApiResponse<CategoryResponse>>(
      `${CATEGORY_PREFIX}/${id}`,
    );

    return unwrapResponse(response);
  },

  /**
   * Get category by ID (Admin only)
   */
  getCategoryByIdForAdmin: async (id: number): Promise<CategoryResponse> => {
    const response = await axiosClient.get<ApiResponse<CategoryResponse>>(
      `${CATEGORY_PREFIX}/admin/${id}`,
    );

    return unwrapResponse(response);
  },

  /**
   * Get category tree
   */
  getCategoryTree: async (): Promise<CategoryResponse[]> => {
    const response = await axiosClient.get<ApiResponse<CategoryResponse[]>>(
      `${CATEGORY_PREFIX}/tree`,
    );

    return unwrapResponse(response);
  },

  /**
   * Get all deleted categories (Admin only)
   */
  getAllDeleted: async (): Promise<CategoryResponse[]> => {
    const response = await axiosClient.get<ApiResponse<CategoryResponse[]>>(
      `${CATEGORY_PREFIX}/admin/deleted`,
    );

    return unwrapResponse(response);
  },

  /**
   * Delete a category (Admin only)
   */
  deleteCategory: async (id: number): Promise<void> => {
    await axiosClient.delete<void>(`${CATEGORY_PREFIX}/${id}`);
  },

  /**
   * Restore a deleted category (Admin only)
   */
  restoreCategory: async (id: number): Promise<CategoryResponse> => {
    const response = await axiosClient.patch<ApiResponse<CategoryResponse>>(
      `${CATEGORY_PREFIX}/${id}/restore`,
    );

    return unwrapResponse(response);
  },

  /**
   * Update a category (Admin only)
   */
  updateCategory: async (
    id: number,
    payload: CategoryRequest,
  ): Promise<CategoryResponse> => {
    const response = await axiosClient.put<ApiResponse<CategoryResponse>>(
      `${CATEGORY_PREFIX}/${id}`,
      payload,
    );

    return unwrapResponse(response);
  },

  /**
   * Get category by slug
   */
  getCategoryBySlug: async (slug: string): Promise<CategoryResponse> => {
    const response = await axiosClient.get<ApiResponse<CategoryResponse>>(
      `${CATEGORY_PREFIX}/slug/${slug}`,
    );

    return unwrapResponse(response);
  },

  /**
   * Get all active categories (Public)
   */
  getActiveCategories: async (): Promise<CategoryResponse[]> => {
    const response =
      await axiosClient.get<ApiResponse<CategoryResponse[]>>(CATEGORY_PREFIX);

    return unwrapResponse(response);
  },

  /**
   * Get category statistics (Admin only)
   */
  getCategoryStatistics: async (): Promise<CategoryStatsResponse[]> => {
    const response = await axiosClient.get<
      ApiResponse<CategoryStatsResponse[]>
    >(`${CATEGORY_PREFIX}/admin/stats`);

    return unwrapResponse(response);
  },
};
