// Type definitions for admin category APIs
// Based on CategoryController.java backend endpoints

import { Category } from "@/lib/learner/category/categories";

/**
 * Request DTO for creating/updating categories
 */
export interface CategoryRequest {
  name: string;
  code?: string;
  description?: string;
  visible?: boolean;
  parentId?: number | null;
  slug?: string;
  metaTitle?: string;
  metaDescription?: string;
  thumbnailUrl?: string;
}

/**
 * Response DTO for category statistics
 */
export interface CategoryStatsResponse {
  id: number;
  name: string;
  code?: string;
  slug?: string;
  courseCount: number;
  studentCount: number;
  visible: boolean;
  parentId?: number;
  deletedAt?: string;
}

/**
 * Extended category with admin-specific fields
 */
export interface AdminCategory extends Category {
  courseCount?: number;
  studentCount?: number;
}

export type { Category };
