import { axiosClient } from "@/lib/api/axios";
import { unwrapResponse } from "@/lib/api/unwrap";
import { ApiResponse, PageResponse } from "@/lib/api/api.types";
import { RejectRequest } from "../account/account.types";
import {
  CourseRequest,
  CourseUpdateRequest,
  CourseResponse,
  CourseDetailResponse,
  CourseStatsResponse,
} from "./course.types";

const COURSE_PREFIX = "/courses";
const TEACHER_COURSE_PREFIX = "/teacher/courses";
const ADMIN_COURSE_PREFIX = "/admin/courses";

export const courseService = {
  /**
   * Create a new course (Teacher only)
   */
  createCourse: async (
    payload: CourseRequest,
  ): Promise<CourseDetailResponse> => {
    const response = await axiosClient.post<ApiResponse<CourseDetailResponse>>(
      TEACHER_COURSE_PREFIX,
      payload,
    );

    return unwrapResponse(response);
  },

  uploadThumbnail: async (
    courseId: number,
    file: File,
  ): Promise<CourseDetailResponse> => {
    const formData = new FormData();
    formData.append("file", file);

    const response = await axiosClient.post<ApiResponse<CourseDetailResponse>>(
      `${TEACHER_COURSE_PREFIX}/${courseId}/thumbnail`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );

    return unwrapResponse(response);
  },

  /**
   * Get course by slug
   */
  getCourseBySlug: async (slug: string): Promise<CourseDetailResponse> => {
    const response = await axiosClient.get<ApiResponse<CourseDetailResponse>>(
      `${COURSE_PREFIX}/${slug}`,
    );

    return unwrapResponse(response);
  },

  /**
   * Get all active courses
   */
  getCoursesActive: async (
    page?: number,
    size?: number,
    filter?: string,
  ): Promise<PageResponse<CourseResponse>> => {
    const response = await axiosClient.get<
      ApiResponse<PageResponse<CourseResponse>>
    >(COURSE_PREFIX, {
      params: { page, size, filter },
    });

    return unwrapResponse(response);
  },

  /**
   * Get all courses (Admin only)
   */
  getAllCourses: async (
    page?: number,
    size?: number,
    filter?: string,
  ): Promise<PageResponse<CourseResponse>> => {
    const response = await axiosClient.get<
      ApiResponse<PageResponse<CourseResponse>>
    >(ADMIN_COURSE_PREFIX, {
      params: { page, size, filter },
    });

    return unwrapResponse(response);
  },

  /**
   * Close a course (Teacher only)
   */
  closeCourse: async (id: number): Promise<CourseDetailResponse> => {
    const response = await axiosClient.patch<ApiResponse<CourseDetailResponse>>(
      `${TEACHER_COURSE_PREFIX}/${id}/close`,
    );

    return unwrapResponse(response);
  },

  /**
   * Open a course (Teacher only)
   */
  openCourse: async (id: number): Promise<CourseDetailResponse> => {
    const response = await axiosClient.patch<ApiResponse<CourseDetailResponse>>(
      `${TEACHER_COURSE_PREFIX}/${id}/open`,
    );

    return unwrapResponse(response);
  },

  /**
   * Update a course (Teacher only)
   */
  updateCourse: async (
    id: number,
    payload: CourseUpdateRequest,
  ): Promise<CourseDetailResponse> => {
    const response = await axiosClient.put<ApiResponse<CourseDetailResponse>>(
      `${TEACHER_COURSE_PREFIX}/${id}`,
      payload,
    );

    return unwrapResponse(response);
  },

  /**
   * Delete a course (Teacher only)
   */
  deleteCourse: async (id: number): Promise<void> => {
    await axiosClient.delete<void>(`${TEACHER_COURSE_PREFIX}/${id}`);
  },

  /**
   * Restore a deleted course (Teacher only)
   */
  restoreCourse: async (id: number): Promise<CourseDetailResponse> => {
    const response = await axiosClient.patch<ApiResponse<CourseDetailResponse>>(
      `${TEACHER_COURSE_PREFIX}/${id}/restore`,
    );

    return unwrapResponse(response);
  },

  /**
   * Get my courses (Teacher only)
   */
  getMyCourses: async (
    page?: number,
    size?: number,
    filter?: string,
  ): Promise<PageResponse<CourseResponse>> => {
    const response = await axiosClient.get<
      ApiResponse<PageResponse<CourseResponse>>
    >(TEACHER_COURSE_PREFIX, {
      params: { page, size, filter },
    });

    return unwrapResponse(response);
  },

  /**
   * Clone/Duplicate a course (Teacher only)
   */
  cloneCourse: async (
    id: number,
    newTitle?: string,
  ): Promise<CourseDetailResponse> => {
    const response = await axiosClient.post<ApiResponse<CourseDetailResponse>>(
      `${TEACHER_COURSE_PREFIX}/${id}/clone`,
      null,
      {
        params: { newTitle },
      },
    );

    return unwrapResponse(response);
  },

  /**
   * Get course statistics (Teacher only)
   */
  getCourseStatistics: async (id: number): Promise<CourseStatsResponse> => {
    const response = await axiosClient.get<ApiResponse<CourseStatsResponse>>(
      `${TEACHER_COURSE_PREFIX}/${id}/stats`,
    );

    return unwrapResponse(response);
  },

  /**
   * Get all published courses (Public)
   */
  getPublishedCourses: async (
    page?: number,
    size?: number,
    filter?: string,
  ): Promise<PageResponse<CourseResponse>> => {
    const response = await axiosClient.get<
      ApiResponse<PageResponse<CourseResponse>>
    >("/public/courses", {
      params: { page, size, filter },
    });

    return unwrapResponse(response);
  },

  /**
   * Get published course by slug (Public)
   */
  getPublishedCourseBySlug: async (
    slug: string,
  ): Promise<CourseDetailResponse> => {
    const response = await axiosClient.get<ApiResponse<CourseDetailResponse>>(
      `/public/courses/${slug}`,
    );

    return unwrapResponse(response);
  },

  /**
   * Search published courses (Public)
   */
  searchPublishedCourses: async (
    query?: string,
    categoryId?: number,
    difficulty?: string,
    tags?: string,
    minPrice?: number,
    maxPrice?: number,
    page?: number,
    size?: number,
  ): Promise<PageResponse<CourseResponse>> => {
    const response = await axiosClient.get<
      ApiResponse<PageResponse<CourseResponse>>
    >("/public/courses/search", {
      params: { query, categoryId, difficulty, tags, minPrice, maxPrice, page, size },
    });

    return unwrapResponse(response);
  },
};
