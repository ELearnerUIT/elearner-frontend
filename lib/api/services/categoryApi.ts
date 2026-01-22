/**
 * Category API Service
 * Handles course category operations
 */

import { apiInstance } from "../client";
import { unwrapResponse } from "../types";
import type {
  CategoryResponseDto,
  CategoryRequest,
  CategoryStatsResponse,
} from "../generated/data-contracts";

class CategoryApiService {
  /**
   * Get category tree structure
   */
  async getTree(): Promise<CategoryResponseDto[]> {
    const response = await apiInstance.getCategoryTree();
    return unwrapResponse<CategoryResponseDto[]>(response);
  }

  /**
   * Get all categories (flat list)
   */
  async getAll(params?: {
    includeDeleted?: boolean;
  }): Promise<CategoryResponseDto[]> {
    // The generated API doesn't have a getAllCategories method
    // Use getCategoryTree for now or implement based on actual API
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const response = await apiInstance.getCategoryTree(params as any);
    return unwrapResponse<CategoryResponseDto[]>(response);
  }

  /**
   * Get category by ID
   */
  async getById(id: number): Promise<CategoryResponseDto> {
    const response = await apiInstance.getCategoryById(id);
    return unwrapResponse<CategoryResponseDto>(response);
  }

  /**
   * Create new category
   */
  async create(data: CategoryRequest): Promise<CategoryResponseDto> {
    const response = await apiInstance.createCategory(data);
    return unwrapResponse<CategoryResponseDto>(response);
  }

  /**
   * Get all active categories
   */
  async getActiveCategories(): Promise<CategoryResponseDto[]> {
    const response = await apiInstance.getActiveCategories();
    return unwrapResponse<CategoryResponseDto[]>(response);
  }

  /**
   * Get category details by slug. Public endpoint - no authentication required.
   */
  async getBySlug(slug: string): Promise<CategoryResponseDto> {
    const response = await apiInstance.getCategoryBySlug(slug);
    return unwrapResponse<CategoryResponseDto>(response);
  }

  /**
   * Update category
   */
  async update(
    id: number,
    data: CategoryRequest,
  ): Promise<CategoryResponseDto> {
    const response = await apiInstance.updateCategory(id, data);
    return unwrapResponse<CategoryResponseDto>(response);
  }

  /**
   * Delete category (soft delete)
   */
  async delete(id: number): Promise<void> {
    await apiInstance.deleteCategory(id);
  }

  /**
   * Restore deleted category
   */
  async restore(id: number): Promise<void> {
    await apiInstance.restoreCategory(id);
  }

  /**
   * Get category details including deleted ones (Admin only)
   */
  async getCategoryByIdForAdmin(id: number): Promise<CategoryResponseDto> {
    const response = await apiInstance.getCategoryByIdForAdmin(id);
    return unwrapResponse<CategoryResponseDto>(response);
  }

  /**
   * Get category statistics
   */
  async getStats(id: number): Promise<CategoryStatsResponse> {
    const response = await apiInstance.getCategoryStatistics();
    const allStats = unwrapResponse<CategoryStatsResponse[]>(response);
    const stat = allStats.find((s: CategoryStatsResponse) => s.id === id);
    if (!stat) {
      throw new Error(`Statistics not found for category ${id}`);
    }
    return stat;
  }

  /**
   * Get deleted categories
   */
  async getDeleted(): Promise<CategoryResponseDto[]> {
    const response = await apiInstance.getAllDeleted();
    return unwrapResponse<CategoryResponseDto[]>(response);
  }
}

export const categoryApi = new CategoryApiService();
