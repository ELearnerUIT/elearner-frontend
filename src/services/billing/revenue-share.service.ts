import { axiosClient } from "@/lib/api/axios";
import { unwrapResponse } from "@/lib/api/unwrap";
import { ApiResponse } from "@/lib/api/api.types";
import {
  CreateRevenueShareConfigRequest,
  UpdateRevenueShareConfigRequest,
  RevenueShareConfigResponse,
} from "./billing.types";

const REVENUE_SHARE_PREFIX = "/revenue-share-configs";

export const revenueShareService = {
  /**
   * Create revenue share config (Admin only)
   * Create a new revenue share configuration
   */
  createRevenueShareConfig: async (
    payload: CreateRevenueShareConfigRequest,
  ): Promise<RevenueShareConfigResponse> => {
    const response = await axiosClient.post<
      ApiResponse<RevenueShareConfigResponse>
    >(REVENUE_SHARE_PREFIX, payload);

    return unwrapResponse(response);
  },

  /**
   * Get all revenue share configs (Admin only)
   * Get all revenue share configurations
   */
  getAllRevenueShareConfigs: async (): Promise<
    RevenueShareConfigResponse[]
  > => {
    const response =
      await axiosClient.get<ApiResponse<RevenueShareConfigResponse[]>>(
        REVENUE_SHARE_PREFIX,
      );

    return unwrapResponse(response);
  },

  /**
   * Get active revenue share configs (Admin only)
   * Get all active revenue share configurations
   */
  getActiveRevenueShareConfigs: async (): Promise<
    RevenueShareConfigResponse[]
  > => {
    const response = await axiosClient.get<
      ApiResponse<RevenueShareConfigResponse[]>
    >(`${REVENUE_SHARE_PREFIX}/active`);

    return unwrapResponse(response);
  },

  /**
   * Get revenue share config by ID (Admin only)
   * Get revenue share configuration by ID
   */
  getRevenueShareConfigById: async (
    id: number,
  ): Promise<RevenueShareConfigResponse> => {
    const response = await axiosClient.get<
      ApiResponse<RevenueShareConfigResponse>
    >(`${REVENUE_SHARE_PREFIX}/${id}`);

    return unwrapResponse(response);
  },

  /**
   * Get active config for category (Admin only)
   * Get active revenue share configuration for a specific category
   */
  getActiveConfigForCategory: async (
    categoryId: number,
  ): Promise<RevenueShareConfigResponse> => {
    const response = await axiosClient.get<
      ApiResponse<RevenueShareConfigResponse>
    >(`${REVENUE_SHARE_PREFIX}/category/${categoryId}/active`);

    return unwrapResponse(response);
  },

  /**
   * Get default config (Admin only)
   * Get default revenue share configuration (applied when no category-specific config exists)
   */
  getDefaultConfig: async (): Promise<RevenueShareConfigResponse> => {
    const response = await axiosClient.get<
      ApiResponse<RevenueShareConfigResponse>
    >(`${REVENUE_SHARE_PREFIX}/default`);

    return unwrapResponse(response);
  },

  /**
   * Update revenue share config (Admin only)
   * Update an existing revenue share configuration
   */
  updateRevenueShareConfig: async (
    id: number,
    payload: UpdateRevenueShareConfigRequest,
  ): Promise<RevenueShareConfigResponse> => {
    const response = await axiosClient.put<
      ApiResponse<RevenueShareConfigResponse>
    >(`${REVENUE_SHARE_PREFIX}/${id}`, payload);

    return unwrapResponse(response);
  },

  /**
   * Deactivate revenue share config (Admin only)
   * Deactivate a revenue share configuration
   */
  deactivateRevenueShareConfig: async (id: number): Promise<void> => {
    const response = await axiosClient.post<ApiResponse<void>>(
      `${REVENUE_SHARE_PREFIX}/${id}/deactivate`,
    );

    return unwrapResponse(response);
  },

  /**
   * Delete revenue share config (Admin only)
   * Delete a revenue share configuration
   */
  deleteRevenueShareConfig: async (id: number): Promise<void> => {
    const response = await axiosClient.delete<ApiResponse<void>>(
      `${REVENUE_SHARE_PREFIX}/${id}`,
    );

    return unwrapResponse(response);
  },
};
