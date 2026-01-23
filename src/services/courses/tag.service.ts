import {
  TagRequest,
  TagResponse,
  TagStatsResponse,
  BulkTagRequest,
} from "./course.types";
import { axiosClient } from "@/lib/api/axios";
import { unwrapResponse } from "@/lib/api/unwrap";
import { ApiResponse, PageResponse } from "@/lib/api/api.types";

const TAG_PREFIX = "/tags";

export const tagService = {
  /**
   * Create a new tag (Admin only)
   */
  createTag: async (payload: TagRequest): Promise<TagResponse> => {
    const response = await axiosClient.post<ApiResponse<TagResponse>>(
      TAG_PREFIX,
      payload,
    );

    return unwrapResponse(response);
  },

  /**
   * Get all active tags
   */
  getTags: async (
    page?: number,
    size?: number,
  ): Promise<PageResponse<TagResponse>> => {
    const response = await axiosClient.get<
      ApiResponse<PageResponse<TagResponse>>
    >(TAG_PREFIX, {
      params: { page, size },
    });

    return unwrapResponse(response);
  },

  /**
   * Get all tags including deleted (Admin only)
   */
  getAllTags: async (
    page?: number,
    size?: number,
  ): Promise<PageResponse<TagResponse>> => {
    const response = await axiosClient.get<
      ApiResponse<PageResponse<TagResponse>>
    >(`${TAG_PREFIX}/admin`, {
      params: { page, size },
    });

    return unwrapResponse(response);
  },

  /**
   * Update a tag (Admin only)
   */
  updateTag: async (id: number, payload: TagRequest): Promise<TagResponse> => {
    const response = await axiosClient.put<ApiResponse<TagResponse>>(
      `${TAG_PREFIX}/${id}`,
      payload,
    );

    return unwrapResponse(response);
  },

  /**
   * Delete a tag (Admin only)
   */
  deleteTag: async (id: number): Promise<void> => {
    await axiosClient.delete<void>(`${TAG_PREFIX}/${id}`);
  },

  /**
   * Restore a deleted tag (Admin only)
   */
  restoreTag: async (id: number): Promise<TagResponse> => {
    const response = await axiosClient.patch<ApiResponse<TagResponse>>(
      `${TAG_PREFIX}/${id}/restore`,
    );

    return unwrapResponse(response);
  },

  /**
   * Get popular tags (Public)
   */
  getPopularTags: async (limit?: number): Promise<TagStatsResponse[]> => {
    const response = await axiosClient.get<ApiResponse<TagStatsResponse[]>>(
      `${TAG_PREFIX}/popular`,
      {
        params: { limit },
      },
    );

    return unwrapResponse(response);
  },

  /**
   * Search tags by name (Public)
   */
  searchTags: async (query: string): Promise<TagResponse[]> => {
    const response = await axiosClient.get<ApiResponse<TagResponse[]>>(
      `${TAG_PREFIX}/search`,
      {
        params: { query },
      },
    );

    return unwrapResponse(response);
  },

  /**
   * Bulk create tags (Admin only)
   */
  bulkCreateTags: async (payload: BulkTagRequest): Promise<TagResponse[]> => {
    const response = await axiosClient.post<ApiResponse<TagResponse[]>>(
      `${TAG_PREFIX}/bulk`,
      payload,
    );

    return unwrapResponse(response);
  },

  /**
   * Get tag statistics (Admin only)
   */
  getTagStatistics: async (): Promise<TagStatsResponse[]> => {
    const response = await axiosClient.get<ApiResponse<TagStatsResponse[]>>(
      `${TAG_PREFIX}/admin/stats`,
    );

    return unwrapResponse(response);
  },
};
