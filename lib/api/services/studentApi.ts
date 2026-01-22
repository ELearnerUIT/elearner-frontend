/**
 * Student API Service
 * Handles student-specific operations
 */

import { apiInstance } from "../client";
import { unwrapResponse } from "../types";
import type {
  StudentDetailResponse,
  UpdateStudentRequest,
  PageResponseStudentCourseResponse,
  PageResponseStudentCertificateResponse,
  CourseProgressResponse,
} from "../generated/data-contracts";

class StudentApiService {
  /**
   * Get student profile by ID
   */
  async getById(id: number): Promise<StudentDetailResponse> {
    const response = await apiInstance.getStudentById(id);
    return unwrapResponse<StudentDetailResponse>(response);
  }

  /**
   * Update student profile
   */
  async update(
    id: number,
    data: UpdateStudentRequest,
  ): Promise<StudentDetailResponse> {
    const response = await apiInstance.updateStudent(id, data);
    return unwrapResponse<StudentDetailResponse>(response);
  }

  /**
   * Upload student avatar
   */
  async uploadAvatar(id: number, file: File): Promise<string> {
    const response = await apiInstance.uploadAvatar1(id, { file });
    return unwrapResponse<string>(response);
  }

  /**
   * Get student's enrolled courses
   */
  async getCourses(
    studentId: number,
    params?: {
      page?: number;
      size?: number;
      status?: string;
    },
  ): Promise<PageResponseStudentCourseResponse> {
    const response = await apiInstance.getStudentCourses(studentId, {
      pageable: params as any,
    });
    return unwrapResponse<PageResponseStudentCourseResponse>(response);
  }

  /**
   * Get student's certificates
   */
  async getCertificates(params?: {
    page?: number;
    size?: number;
  }): Promise<PageResponseStudentCertificateResponse> {
    const response = await apiInstance.getStudentCertificates(params as any);
    return unwrapResponse<PageResponseStudentCertificateResponse>(response);
  }

  /**
   * Get course progress for student
   */
  async getCourseProgress(
    studentId: number,
    courseId: number,
  ): Promise<CourseProgressResponse> {
    const response = await apiInstance.getStudentCourseProgress(
      studentId,
      courseId,
    );
    return unwrapResponse<CourseProgressResponse>(response);
  }
}

export const studentApi = new StudentApiService();
