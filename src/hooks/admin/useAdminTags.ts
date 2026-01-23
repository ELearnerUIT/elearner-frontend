"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { tagService } from "@/services/courses/tag.service";
import {
  TagRequest,
  TagResponse,
  TagStatsResponse,
  TagOverviewResponse,
  BulkTagRequest,
} from "@/services/courses/course.types";
import { PageResponse } from "@/lib/api/api.types";
import { toast } from "sonner";

interface GetTagsParams {
  page?: number;
  size?: number;
}

/**
 * Get all tags including deleted (Admin only)
 */
export const useGetAllTags = (params?: GetTagsParams) => {
  return useQuery({
    queryKey: ["tags", "admin", "all", params],
    queryFn: async () => {
      const response = await tagService.getAllTags(params?.page, params?.size);
      return response;
    },
  });
};

/**
 * Get tag statistics (Admin only)
 */
export const useGetTagStatistics = () => {
  return useQuery<TagStatsResponse[]>({
    queryKey: ["tags", "admin", "statistics"],
    queryFn: () => tagService.getTagStatistics(),
  });
};

/**
 * Get tag overview (Admin only)
 */
export const useGetTagOverview = () => {
  return useQuery<TagOverviewResponse>({
    queryKey: ["tags", "admin", "overview"],
    queryFn: () => tagService.getTagOverview(),
  });
};

/**
 * Create a new tag (Admin only)
 */
export const useCreateTag = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: TagRequest) => tagService.createTag(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tags"] });
      toast.success("Tag created successfully");
    },
    onError: (error: any) => {
      toast.error(error?.message || "Failed to create tag");
    },
  });
};

/**
 * Update a tag (Admin only)
 */
export const useUpdateTag = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: { id: number; payload: TagRequest }) =>
      tagService.updateTag(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tags"] });
      toast.success("Tag updated successfully");
    },
    onError: (error: any) => {
      toast.error(error?.message || "Failed to update tag");
    },
  });
};

/**
 * Delete a tag (Admin only)
 */
export const useDeleteTag = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => tagService.deleteTag(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tags"] });
      toast.success("Tag deleted successfully");
    },
    onError: (error: any) => {
      toast.error(error?.message || "Failed to delete tag");
    },
  });
};

/**
 * Restore a deleted tag (Admin only)
 */
export const useRestoreTag = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => tagService.restoreTag(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tags"] });
      toast.success("Tag restored successfully");
    },
    onError: (error: any) => {
      toast.error(error?.message || "Failed to restore tag");
    },
  });
};

/**
 * Bulk create tags (Admin only)
 */
export const useBulkCreateTags = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: BulkTagRequest) => tagService.bulkCreateTags(payload),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["tags"] });
      toast.success(`${data.length} tags created successfully`);
    },
    onError: (error: any) => {
      toast.error(error?.message || "Failed to create tags");
    },
  });
};

/**
 * Search tags by name
 */
export const useSearchTags = (query: string) => {
  return useQuery<TagResponse[]>({
    queryKey: ["tags", "search", query],
    queryFn: () => tagService.searchTags(query),
    enabled: query.length > 0,
  });
};
