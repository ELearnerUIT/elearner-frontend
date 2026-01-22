/**
 * Course API
 * Course CRUD operations, search, and statistics
 */

import { apiClient } from './client';
import type {
  CourseResponse,
  CourseDetailResponse,
  CreateCourseRequest,
  UpdateCourseRequest,
  CourseQueryParams,
  CourseStatsResponse,
  PublishCourseRequest,
  PageResponse,
} from '@/types';

/**
 * Get all courses (public)
 * GET /courses
 */
export async function getAllCourses(params?: CourseQueryParams): Promise<PageResponse<CourseResponse>> {
  const response = await apiClient.get<PageResponse<CourseResponse>>('/courses', { params });
  return response.data;
}

/**
 * Get course by ID (public)
 * GET /courses/{id}
 */
export async function getCourseById(id: number): Promise<CourseDetailResponse> {
  const response = await apiClient.get<CourseDetailResponse>(`/courses/${id}`);
  return response.data;
}

/**
 * Search courses (public)
 * GET /courses/search
 */
export async function searchCourses(params: {
  query?: string;
  categoryId?: number;
  tagIds?: number[];
  difficulty?: string;
  minPrice?: number;
  maxPrice?: number;
  page?: number;
  size?: number;
  sortBy?: string;
  sortDirection?: 'ASC' | 'DESC';
}): Promise<PageResponse<CourseResponse>> {
  const response = await apiClient.get<PageResponse<CourseResponse>>('/courses/search', { params });
  return response.data;
}

/**
 * Get featured courses (public)
 * GET /courses/featured
 */
export async function getFeaturedCourses(params?: {
  page?: number;
  size?: number;
}): Promise<PageResponse<CourseResponse>> {
  const response = await apiClient.get<PageResponse<CourseResponse>>('/courses/featured', { params });
  return response.data;
}

/**
 * Get popular courses (public)
 * GET /courses/popular
 */
export async function getPopularCourses(params?: {
  page?: number;
  size?: number;
}): Promise<PageResponse<CourseResponse>> {
  const response = await apiClient.get<PageResponse<CourseResponse>>('/courses/popular', { params });
  return response.data;
}

/**
 * Get my courses as teacher
 * GET /teachers/me/courses
 */
export async function getMyCourses(params?: CourseQueryParams): Promise<PageResponse<CourseResponse>> {
  const response = await apiClient.get<PageResponse<CourseResponse>>('/teachers/me/courses', { params });
  return response.data;
}

/**
 * Create new course (teacher)
 * POST /courses
 */
export async function createCourse(data: CreateCourseRequest): Promise<CourseDetailResponse> {
  const response = await apiClient.post<CourseDetailResponse>('/courses', data);
  return response.data;
}

/**
 * Update course (teacher)
 * PUT /courses/{id}
 */
export async function updateCourse(id: number, data: UpdateCourseRequest): Promise<CourseDetailResponse> {
  const response = await apiClient.put<CourseDetailResponse>(`/courses/${id}`, data);
  return response.data;
}

/**
 * Delete course (teacher)
 * DELETE /courses/{id}
 */
export async function deleteCourse(id: number): Promise<void> {
  await apiClient.delete(`/courses/${id}`);
}

/**
 * Upload course image (teacher)
 * POST /courses/{id}/image
 */
export async function uploadCourseImage(id: number, file: File): Promise<CourseDetailResponse> {
  const formData = new FormData();
  formData.append('file', file);
  
  const response = await apiClient.post<CourseDetailResponse>(`/courses/${id}/image`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
}

/**
 * Publish course (teacher)
 * POST /courses/{id}/publish
 */
export async function publishCourse(id: number, data?: PublishCourseRequest): Promise<CourseDetailResponse> {
  const response = await apiClient.post<CourseDetailResponse>(`/courses/${id}/publish`, data);
  return response.data;
}

/**
 * Unpublish course (teacher)
 * POST /courses/{id}/unpublish
 */
export async function unpublishCourse(id: number): Promise<CourseDetailResponse> {
  const response = await apiClient.post<CourseDetailResponse>(`/courses/${id}/unpublish`);
  return response.data;
}

/**
 * Get course statistics (teacher)
 * GET /courses/{id}/stats
 */
export async function getCourseStats(id: number): Promise<CourseStatsResponse> {
  const response = await apiClient.get<CourseStatsResponse>(`/courses/${id}/stats`);
  return response.data;
}

/**
 * Get courses by category (public)
 * GET /categories/{categoryId}/courses
 */
export async function getCoursesByCategory(
  categoryId: number,
  params?: {
    page?: number;
    size?: number;
    sortBy?: string;
    sortDirection?: 'ASC' | 'DESC';
  }
): Promise<PageResponse<CourseResponse>> {
  const response = await apiClient.get<PageResponse<CourseResponse>>(`/categories/${categoryId}/courses`, { params });
  return response.data;
}

/**
 * Get courses by tag (public)
 * GET /tags/{tagId}/courses
 */
export async function getCoursesByTag(
  tagId: number,
  params?: {
    page?: number;
    size?: number;
    sortBy?: string;
    sortDirection?: 'ASC' | 'DESC';
  }
): Promise<PageResponse<CourseResponse>> {
  const response = await apiClient.get<PageResponse<CourseResponse>>(`/tags/${tagId}/courses`, { params });
  return response.data;
}

/**
 * Get courses by teacher (public)
 * GET /teachers/{teacherId}/courses
 */
export async function getCoursesByTeacher(
  teacherId: number,
  params?: CourseQueryParams
): Promise<PageResponse<CourseResponse>> {
  const response = await apiClient.get<PageResponse<CourseResponse>>(`/teachers/${teacherId}/courses`, { params });
  return response.data;
}
