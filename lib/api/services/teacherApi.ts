/**
 * Teacher API Service
 * Handles teacher-specific operations
 */

import { apiInstance } from "../client";
import { unwrapResponse } from "../types";
import type {
  TeacherDetailResponse,
  UpdateTeacherRequest,
  ApproveTeacherRequest,
  PageResponseCourseResponse,
  MonthlyRevenueResponse,
} from "../generated/data-contracts";

class TeacherApiService {
  /**
   * Get teacher profile by ID
   */
  async getById(id: number): Promise<TeacherDetailResponse> {
    const response = await apiInstance.getTeacherById(id);
    return unwrapResponse<TeacherDetailResponse>(response);
  }

  /**
   * Update teacher profile
   */
  async update(
    id: number,
    data: UpdateTeacherRequest,
  ): Promise<TeacherDetailResponse> {
    const response = await apiInstance.updateTeacher(id, data);
    return unwrapResponse<TeacherDetailResponse>(response);
  }

  /**
   * Delete teacher
   */
  async delete(id: number): Promise<void> {
    await apiInstance.deleteTeacher(id);
  }

  /**
   * Upload teacher avatar
   */
  async uploadAvatar(id: number, file: File): Promise<string> {
    const response = await apiInstance.uploadAvatar(id, { file });
    return unwrapResponse<string>(response);
  }

  /**
   * Approve teacher
   */
  async approve(id: number, data: ApproveTeacherRequest): Promise<void> {
    await apiInstance.approveTeacher(id, data);
  }

  /**
   * Reject teacher application
   */
  async reject(id: number, reason: string): Promise<void> {
    await apiInstance.rejectTeacher(id, { reason });
  }

  /**
   * Get teacher's courses
   */
  async getCourses(
    teacherId: number,
    params?: {
      page?: number;
      size?: number;
    },
  ): Promise<PageResponseCourseResponse> {
    const response = await apiInstance.getTeacherCourses(teacherId, {
      pageable: {
        page: params?.page,
        size: params?.size,
      },
    });
    return unwrapResponse<PageResponseCourseResponse>(response);
  }

  /**
   * Get teacher's revenue
   */
  async getRevenue(
    teacherId: number,
    period?: string | undefined,
  ): Promise<MonthlyRevenueResponse> {
    const response = await apiInstance.getMonthlyRevenue(teacherId, { period });
    return unwrapResponse<MonthlyRevenueResponse>(response);
  }
}

export const teacherApi = new TeacherApiService();
