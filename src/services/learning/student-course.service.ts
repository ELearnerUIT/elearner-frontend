/**
 * Student Course Service
 * Handles student access to enrolled course content
 * Matches backend StudentCourseController.java
 * All endpoints require @StudentOnly and verify enrollment
 */

import {axiosClient} from "@/lib/api/axios";
import {  unwrapResponse } from "@/lib/api/unwrap";
import { ApiResponse } from "@/lib/api/api.types";
import {
  ChapterDto,
  LessonDTO,
  LessonResourceResponse,
  VideoStreamingResponse,
  CourseStructureResponse,
} from "./student-course.types";

const studentCourseService = {
  // ===========================
  // Chapter APIs
  // ===========================

  /**
   * GET /student/courses/{courseId}/chapters - Get enrolled course chapters
   * Requires active enrollment
   */
  getEnrolledCourseChapters: async (
    courseId: number,
  ): Promise<ChapterDto[]> => {
    const response = await axiosClient.get<ApiResponse<ChapterDto[]>>(
      `/student/courses/${courseId}/chapters`,
    );
    return unwrapResponse(response);
  },

  /**
   * GET /student/chapters/{chapterId} - Get chapter details
   * Requires enrollment in chapter's course
   */
  getChapterDetails: async (chapterId: number): Promise<ChapterDto> => {
    const response = await axiosClient.get<ApiResponse<ChapterDto>>(
      `/student/chapters/${chapterId}`,
    );
    return unwrapResponse(response);
  },

  /**
   * GET /student/chapters/{chapterId}/lessons - Get chapter lessons
   * Requires enrollment in chapter's course
   */
  getChapterLessons: async (chapterId: number): Promise<LessonDTO[]> => {
    const response = await axiosClient.get<ApiResponse<LessonDTO[]>>(
      `/student/chapters/${chapterId}/lessons`,
    );
    return unwrapResponse(response);
  },

  // ===========================
  // Lesson APIs
  // ===========================

  /**
   * GET /student/lessons/{lessonId} - Get lesson details
   * Requires enrollment OR lesson.isPreview = true
   */
  getLessonDetails: async (lessonId: number): Promise<LessonDTO> => {
    const response = await axiosClient.get<ApiResponse<LessonDTO>>(
      `/student/lessons/${lessonId}`,
    );
    return unwrapResponse(response);
  },

  /**
   * GET /student/lessons/{lessonId}/video/stream - Get video streaming URL
   * Returns presigned URL with 1-hour validity for HLS streaming
   * Requires enrollment in lesson's course
   */
  getVideoStreamingUrl: async (
    lessonId: number,
  ): Promise<VideoStreamingResponse> => {
    const response = await axiosClient.get<ApiResponse<VideoStreamingResponse>>(
      `/student/lessons/${lessonId}/video/stream`,
    );
    return unwrapResponse(response);
  },

  // ===========================
  // Resource APIs
  // ===========================

  /**
   * GET /student/lessons/{lessonId}/resources - Get lesson resources
   * Requires enrollment in lesson's course
   */
  getLessonResources: async (
    lessonId: number,
  ): Promise<LessonResourceResponse[]> => {
    const response = await axiosClient.get<
      ApiResponse<LessonResourceResponse[]>
    >(`/student/lessons/${lessonId}/resources`);
    return unwrapResponse(response);
  },

  /**
   * GET /student/lessons/{lessonId}/resources/{resourceId} - Get resource details with download URL
   * Returns presigned download URL
   * Requires enrollment in lesson's course
   */
  getResourceDetails: async (
    lessonId: number,
    resourceId: number,
  ): Promise<LessonResourceResponse> => {
    const response = await axiosClient.get<ApiResponse<LessonResourceResponse>>(
      `/student/lessons/${lessonId}/resources/${resourceId}`,
    );
    return unwrapResponse(response);
  },

  // ===========================
  // Course Structure API
  // ===========================

  /**
   * GET /student/courses/{courseId}/structure - Get complete course structure
   * Returns hierarchical structure: Course → Chapters → Lessons
   * Requires enrollment in course
   */
  getCourseStructure: async (
    courseId: number,
  ): Promise<CourseStructureResponse> => {
    const response = await axiosClient.get<
      ApiResponse<CourseStructureResponse>
    >(`/student/courses/${courseId}/structure`);
    return unwrapResponse(response);
  },
};

export default studentCourseService;
