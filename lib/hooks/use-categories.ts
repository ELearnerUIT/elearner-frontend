/**
 * Category Hooks
 * React Query hooks for category operations
 */

'use client';

import { useMutation, useQuery, useQueryClient, type UseMutationOptions, type UseQueryOptions } from '@tanstack/react-query';
import * as categoryApi from '@/lib/api/category.api';
import { queryKeys } from './query-keys';
import type {
  Category,
  CategoryStatsResponse,
  CategoryTreeResponse,
  CreateCategoryRequest,
  PageResponse,
  PaginationParams,
  UpdateCategoryRequest,
} from '@/types';

/**
 * Get all categories (paginated)
 */
export function useCategories(params?: PaginationParams, options?: UseQueryOptions<PageResponse<Category>>) {
  return useQuery({
    queryKey: queryKeys.categories.all(params),
    queryFn: () => categoryApi.getAllCategories(params),
    ...options,
  });
}

/**
 * Get category tree
 */
export function useCategoryTree(options?: UseQueryOptions<CategoryTreeResponse[]>) {
  return useQuery({
    queryKey: queryKeys.categories.tree,
    queryFn: () => categoryApi.getCategoryTree(),
    ...options,
  });
}

/**
 * Get single category
 */
export function useCategory(id: number, options?: UseQueryOptions<Category>) {
  return useQuery({
    queryKey: queryKeys.categories.detail(id),
    queryFn: () => categoryApi.getCategoryById(id),
    enabled: Boolean(id),
    ...options,
  });
}

/**
 * Get category with children
 */
export function useCategoryWithChildren(id: number, options?: UseQueryOptions<Category>) {
  return useQuery({
    queryKey: queryKeys.categories.withChildren(id),
    queryFn: () => categoryApi.getCategoryWithChildren(id),
    enabled: Boolean(id),
    ...options,
  });
}

/**
 * Get category stats
 */
export function useCategoryStats(id: number, options?: UseQueryOptions<CategoryStatsResponse>) {
  return useQuery({
    queryKey: queryKeys.categories.stats(id),
    queryFn: () => categoryApi.getCategoryStats(id),
    enabled: Boolean(id),
    ...options,
  });
}

/**
 * Create category
 */
export function useCreateCategory(options?: UseMutationOptions<Category, Error, CreateCategoryRequest>) {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: CreateCategoryRequest) => categoryApi.createCategory(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.categories.all() });
      queryClient.invalidateQueries({ queryKey: queryKeys.categories.tree });
    },
    ...options,
  });
}

/**
 * Update category
 */
export function useUpdateCategory(options?: UseMutationOptions<Category, Error, { id: number; data: UpdateCategoryRequest }>) {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }) => categoryApi.updateCategory(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.categories.detail(variables.id) });
      queryClient.invalidateQueries({ queryKey: queryKeys.categories.all() });
      queryClient.invalidateQueries({ queryKey: queryKeys.categories.tree });
    },
    ...options,
  });
}

/**
 * Delete category
 */
export function useDeleteCategory(options?: UseMutationOptions<void, Error, number>) {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: number) => categoryApi.deleteCategory(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.categories.all() });
      queryClient.invalidateQueries({ queryKey: queryKeys.categories.tree });
    },
    ...options,
  });
}
