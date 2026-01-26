import {
  CoursePreviewResponse,
  PreviewVideoUrlResponse,
  CoursePublishedStatusResponse,
  CourseReviewResponse,
  RatingSummaryResponse,
  CourseCardResponse,
} from "./course.types";
import { axiosClient } from "@/lib/api/axios";
import { unwrapResponse } from "@/lib/api/unwrap";
import { ApiResponse, PageResponse } from "@/lib/api/api.types";

const PUBLIC_PREFIX = "/public";

export const coursePreviewService = {
  /**
   * Get public course preview by slug
   */
  getCoursePreview: async (slug: string): Promise<CoursePreviewResponse> => {
    const response = await axiosClient.get<ApiResponse<CoursePreviewResponse>>(
      `${PUBLIC_PREFIX}/courses/${slug}/preview`,
    );

    return unwrapResponse(response);
  },

  /**
   * Get preview lesson video streaming URL
   */
  getPreviewVideoStreamUrl: async (
    lessonId: number,
  ): Promise<PreviewVideoUrlResponse> => {
    const response = await axiosClient.get<
      ApiResponse<PreviewVideoUrlResponse>
    >(`${PUBLIC_PREFIX}/lessons/${lessonId}/preview/stream-url`);

    return unwrapResponse(response);
  },

  /**
   * Check if course version is published
   */
  isCoursePublished: async (
    slug: string,
  ): Promise<CoursePublishedStatusResponse> => {
    const response = await axiosClient.get<
      ApiResponse<CoursePublishedStatusResponse>
    >(`${PUBLIC_PREFIX}/courses/${slug}/is-published`);

    return unwrapResponse(response);
  },

  /**
   * Get public course reviews
   */
  getPublicCourseReviews: async (
    courseId: number,
    sort?: string,
    page?: number,
    size?: number,
  ): Promise<PageResponse<CourseReviewResponse>> => {
    const response = await axiosClient.get<
      ApiResponse<PageResponse<CourseReviewResponse>>
    >(`${PUBLIC_PREFIX}/courses/${courseId}/reviews`, {
      params: { sort, page, size },
    });

    return unwrapResponse(response);
  },

  /**
   * Get course rating summary
   */
  getCourseRatingSummary: async (
    courseId: number,
  ): Promise<RatingSummaryResponse> => {
    const response = await axiosClient.get<ApiResponse<RatingSummaryResponse>>(
      `${PUBLIC_PREFIX}/courses/${courseId}/rating-summary`,
    );

    return unwrapResponse(response);
  },

  /**
   * Get public teacher profile
   */
  getTeacherPublicProfile: async (teacherId: number): Promise<any> => {
    const response = await axiosClient.get<ApiResponse<any>>(
      `${PUBLIC_PREFIX}/teachers/${teacherId}/profile`,
    );

    return unwrapResponse(response);
  },

  /**
   * Get related courses
   */
  getRelatedCourses: async (
    courseId: number,
    limit?: number,
  ): Promise<CourseCardResponse[]> => {
    const response = await axiosClient.get<ApiResponse<CourseCardResponse[]>>(
      `${PUBLIC_PREFIX}/courses/${courseId}/related`,
      {
        params: { limit },
      },
    );

    return unwrapResponse(response);
  },

  /**
   * Get popular courses
   */
  getPopularCourses: async (limit?: number): Promise<CourseCardResponse[]> => {
    const response = await axiosClient.get<ApiResponse<CourseCardResponse[]>>(
      `${PUBLIC_PREFIX}/courses/popular`,
      {
        params: { limit },
      },
    );

    return unwrapResponse(response);
  },
};
