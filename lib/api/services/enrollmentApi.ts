/**
 * Enrollment API Service
 * Handles course enrollment operations
 */

import { apiInstance } from "../client";
import { unwrapResponse } from "../types";
import type {
  EnrollCourseRequest,
  EnrollmentDetailResponse,
  CancelEnrollmentRequest,
  PageResponseEnrollmentResponse,
  EnrollmentResponse,
  UpdateScoreRequest,
  FinalExamEligibilityResponse,
} from "../generated/data-contracts";

class EnrollmentApiService {
  /**
   * Enroll in a course
   */
  async enroll(
    courseId: number,
    data: EnrollCourseRequest,
  ): Promise<EnrollmentDetailResponse> {
    // enrollCourse expects (courseId, data, params)
    const response = await apiInstance.enrollCourse(courseId, data);
    return unwrapResponse<EnrollmentDetailResponse>(response);
  }

  /**
   * Get student enrollments
   */
  async getStudentEnrollments(studentId: number): Promise<EnrollmentResponse> {
    const response = await apiInstance.getStudentEnrollments(studentId);
    return unwrapResponse<EnrollmentResponse>(response);
  }

  /**
   * Get course enrollments
   */
  async getCourseEnrollments(courseId: number): Promise<EnrollmentResponse> {
    const response = await apiInstance.getCourseEnrollments(courseId);
    return unwrapResponse<EnrollmentResponse>(response);
  }

  /**
   * Get enrollment details
   */
  async getById(enrollmentId: number): Promise<EnrollmentDetailResponse> {
    const response = await apiInstance.getEnrollmentDetail(enrollmentId);
    return unwrapResponse<EnrollmentDetailResponse>(response);
  }

  /**
   * Cancel enrollment
   */
  async cancel(
    enrollmentId: number,
    data: CancelEnrollmentRequest,
  ): Promise<void> {
    // cancelEnrollment expects (id, data, params)
    await apiInstance.cancelEnrollment(enrollmentId, data);
  }

  /**
   * Kick student from course
   */
  async kickStudent(
    enrollmentId: number,
    request: CancelEnrollmentRequest,
  ): Promise<void> {
    await apiInstance.kickStudent(enrollmentId, request);
  }

  /**
   * Complete enrollment
   */
  async completeEnrollment(enrollmentId: number): Promise<void> {
    await apiInstance.completeEnrollment(enrollmentId);
  }

  /**
   * Get enrollment statistics
   */
  async getEnrollmentStats(
    courseId: number,
  ): Promise<PageResponseEnrollmentResponse> {
    const response = await apiInstance.getEnrollmentStats(courseId);
    return unwrapResponse<PageResponseEnrollmentResponse>(response);
  }

  /**
   * Update enrollment score
   */
  async updateScore(
    enrollmentId: number,
    request: UpdateScoreRequest,
  ): Promise<EnrollmentDetailResponse> {
    const response = await apiInstance.updateScore(enrollmentId, request);
    return unwrapResponse<EnrollmentDetailResponse>(response);
  }

  /**
   * Check final exam eligibility
   */
  async checkFinalExamEligibility(
    enrollmentId: number,
  ): Promise<FinalExamEligibilityResponse> {
    const response = await apiInstance.checkFinalExamEligibility(enrollmentId);
    return unwrapResponse<FinalExamEligibilityResponse>(response);
  }
}

export const enrollmentApi = new EnrollmentApiService();
