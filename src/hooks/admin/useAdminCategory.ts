// Admin hooks for category management
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { adminCategoryService } from "@/services/admin/category.service";
import { Category } from "@/lib/learner/category/categories";
import {
  CategoryRequest,
  CategoryStatsResponse,
} from "@/lib/admin/category/categories";
import { toast } from "sonner";

/**
 * Get all active categories (public endpoint)
 */
export function useAdminCategories() {
  return useQuery<Category[]>({
    queryKey: ["admin-categories"],
    queryFn: () => adminCategoryService.getActiveCategories(),
  });
}

/**
 * Get category tree (public endpoint)
 */
export function useAdminCategoryTree() {
  return useQuery<Category[]>({
    queryKey: ["admin-category-tree"],
    queryFn: () => adminCategoryService.getCategoryTree(),
  });
}

/**
 * Get category by ID for admin (includes deleted)
 */
export function useAdminCategoryById(id: number) {
  return useQuery<Category>({
    queryKey: ["admin-category-id", id],
    queryFn: () => adminCategoryService.getCategoryByIdForAdmin(id),
    enabled: !!id,
  });
}

/**
 * Get all deleted categories (Admin only)
 */
export function useDeletedCategories() {
  return useQuery<Category[]>({
    queryKey: ["admin-deleted-categories"],
    queryFn: () => adminCategoryService.getAllDeletedCategories(),
  });
}

/**
 * Get category statistics (Admin only)
 */
export function useCategoryStatistics() {
  return useQuery<CategoryStatsResponse[]>({
    queryKey: ["admin-category-stats"],
    queryFn: () => adminCategoryService.getCategoryStatistics(),
  });
}

/**
 * Create a new category (Admin only)
 */
export function useCreateCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CategoryRequest) =>
      adminCategoryService.createCategory(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-categories"] });
      queryClient.invalidateQueries({ queryKey: ["admin-category-tree"] });
      queryClient.invalidateQueries({ queryKey: ["admin-category-stats"] });
      toast.success("Category created successfully");
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message || "Failed to create category",
      );
    },
  });
}

/**
 * Update a category (Admin only)
 */
export function useUpdateCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: CategoryRequest }) =>
      adminCategoryService.updateCategory(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["admin-categories"] });
      queryClient.invalidateQueries({ queryKey: ["admin-category-tree"] });
      queryClient.invalidateQueries({ queryKey: ["admin-category-stats"] });
      queryClient.invalidateQueries({
        queryKey: ["admin-category-id", variables.id],
      });
      toast.success("Category updated successfully");
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message || "Failed to update category",
      );
    },
  });
}

/**
 * Delete a category (soft delete) (Admin only)
 */
export function useDeleteCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => adminCategoryService.deleteCategory(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-categories"] });
      queryClient.invalidateQueries({ queryKey: ["admin-category-tree"] });
      queryClient.invalidateQueries({ queryKey: ["admin-category-stats"] });
      queryClient.invalidateQueries({ queryKey: ["admin-deleted-categories"] });
      toast.success("Category deleted successfully");
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message || "Failed to delete category",
      );
    },
  });
}

/**
 * Restore a deleted category (Admin only)
 */
export function useRestoreCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => adminCategoryService.restoreCategory(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-categories"] });
      queryClient.invalidateQueries({ queryKey: ["admin-category-tree"] });
      queryClient.invalidateQueries({ queryKey: ["admin-category-stats"] });
      queryClient.invalidateQueries({ queryKey: ["admin-deleted-categories"] });
      toast.success("Category restored successfully");
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message || "Failed to restore category",
      );
    },
  });
}
