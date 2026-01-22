/**
 * Course API Service
 * Handles course management operations
 */

import { apiInstance } from "../client";
import { unwrapResponse } from "../types";
import type {
  CourseRequest,
  CourseUpdateRequest,
  CourseDetailResponse,
  CourseStatsResponse,
  Pageable,
  PageResponseCourseResponse,
} from "../generated/data-contracts";

class CourseApiService {
  // ========== PUBLIC APIs ==========

  /**
   * Get all published courses (Public)
   */
  async getPublishedCourses(params?: {
    page?: number;
    size?: number;
    sort?: string;
  }): Promise<PageResponseCourseResponse> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const response = await apiInstance.getPublishedCourses(params as any);
    return unwrapResponse<PageResponseCourseResponse>(response);
  }

  /**
   * Get published course by slug (Public)
   */
  async getPublishedCourseBySlug(slug: string): Promise<CourseDetailResponse> {
    const response = await apiInstance.getPublishedCourseBySlug(slug);
    return unwrapResponse<CourseDetailResponse>(response);
  }

  /**
   * Search published courses (Public)
   */
  async searchPublishedCourses(params?: {
    query?: string;
    categoryId?: number;
    difficulty?: string;
    tags?: string;
    page?: number;
    size?: number;
    sort?: string;
  }): Promise<PageResponseCourseResponse> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const response = await apiInstance.searchPublishedCourses(params as any);
    return unwrapResponse<PageResponseCourseResponse>(response);
  }

  // ========== GENERAL APIs ==========

  /**
   * Get active courses
   */
  async getCoursesActive(params?: {
    page?: number;
    size?: number;
    sort?: string;
  }): Promise<PageResponseCourseResponse> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const response = await apiInstance.getCoursesActive(params as any);
    return unwrapResponse<PageResponseCourseResponse>(response);
  }

  /**
   * Get course by slug
   */
  async getCourseBySlug(slug: string): Promise<CourseDetailResponse> {
    const response = await apiInstance.getCourseBySlug(slug);
    return unwrapResponse<CourseDetailResponse>(response);
  }

  // ========== TEACHER APIs ==========

  /**
   * Create new course (Teacher only)
   */
  async create(data: CourseRequest): Promise<CourseDetailResponse> {
    const response = await apiInstance.createNewCourse(data);
    return unwrapResponse<CourseDetailResponse>(response);
  }

  /**
   * Update course (Teacher only)
   */
  async update(
    id: number,
    data: CourseUpdateRequest,
  ): Promise<CourseDetailResponse> {
    const response = await apiInstance.updateCourse(id, data);
    return unwrapResponse<CourseDetailResponse>(response);
  }

  /**
   * Delete course (Teacher only)
   */
  async delete(id: number): Promise<void> {
    await apiInstance.deleteCourse(id);
  }

  /**
   * Restore deleted course (Teacher only)
   */
  async restore(id: number): Promise<CourseDetailResponse> {
    const response = await apiInstance.restoreCourse(id);
    return unwrapResponse<CourseDetailResponse>(response);
  }

  /**
   * Close course enrollment (Teacher only)
   */
  async close(id: number): Promise<CourseDetailResponse> {
    const response = await apiInstance.closeCourse(id);
    return unwrapResponse<CourseDetailResponse>(response);
  }

  /**
   * Open course enrollment (Teacher only)
   */
  async open(id: number): Promise<CourseDetailResponse> {
    const response = await apiInstance.openCourse(id);
    return unwrapResponse<CourseDetailResponse>(response);
  }

  /**
   * Clone course (Teacher only)
   */
  async clone(id: number, newTitle?: string): Promise<CourseDetailResponse> {
    const response = await apiInstance.cloneCourse(id, { newTitle });
    return unwrapResponse<CourseDetailResponse>(response);
  }

  /**
   * Get course statistics (Teacher only)
   */
  async getStats(id: number): Promise<CourseStatsResponse> {
    const response = await apiInstance.getCourseStatistics(id);
    return unwrapResponse<CourseStatsResponse>(response);
  }

  /**
   * Upload course thumbnail (Teacher only)
   */
  async uploadThumbnail(id: number, file: File): Promise<CourseDetailResponse> {
    const response = await apiInstance.uploadCourseThumbnail(id, { file });
    return unwrapResponse<CourseDetailResponse>(response);
  }

  /**
   * Get my courses (Teacher only)
   */
  async getMyCourses(params?: {
    page?: number;
    size?: number;
    sort?: string;
  }): Promise<PageResponseCourseResponse> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const response = await apiInstance.getMyCourses(params as any);
    return unwrapResponse<PageResponseCourseResponse>(response);
  }

  // ========== ADMIN APIs ==========

  /**
   * Get all courses including inactive (Admin only)
   */
  async getAllCourses(params?: {
    page?: number;
    size?: number;
    sort?: string;
  }): Promise<PageResponseCourseResponse> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const response = await apiInstance.getAllCourses(params as any);
    return unwrapResponse<PageResponseCourseResponse>(response);
  }
}

export const courseApi = new CourseApiService();
