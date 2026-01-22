/**
 * Enrollment API
 * Course enrollment management and progress tracking
 */

import { apiClient } from './client';
import type {
  EnrollmentResponse,
  EnrollCourseRequest,
  EnrollmentQueryParams,
  StudentProgressSummaryResponse,
  PageResponse,
} from '@/types';

/**
 * Get my enrollments (student)
 * GET /students/me/enrollments
 */
export async function getMyEnrollments(params?: EnrollmentQueryParams): Promise<PageResponse<EnrollmentResponse>> {
  const response = await apiClient.get<PageResponse<EnrollmentResponse>>('/students/me/enrollments', { params });
  return response.data;
}

/**
 * Get enrollment by ID (student)
 * GET /students/me/enrollments/{enrollmentId}
 */
export async function getEnrollmentById(enrollmentId: number): Promise<StudentProgressSummaryResponse> {
  const response = await apiClient.get<StudentProgressSummaryResponse>(`/students/me/enrollments/${enrollmentId}`);
  return response.data;
}

/**
 * Enroll in course (student)
 * POST /enrollments
 */
export async function enrollCourse(data: EnrollCourseRequest): Promise<EnrollmentResponse> {
  const response = await apiClient.post<EnrollmentResponse>('/enrollments', data);
  return response.data;
}

/**
 * Cancel enrollment (student)
 * DELETE /enrollments/{enrollmentId}
 */
export async function cancelEnrollment(enrollmentId: number): Promise<void> {
  await apiClient.delete(`/enrollments/${enrollmentId}`);
}

/**
 * Get course enrollments (teacher/admin)
 * GET /courses/{courseId}/enrollments
 */
export async function getCourseEnrollments(
  courseId: number,
  params?: EnrollmentQueryParams
): Promise<PageResponse<EnrollmentResponse>> {
  const response = await apiClient.get<PageResponse<EnrollmentResponse>>(`/courses/${courseId}/enrollments`, { params });
  return response.data;
}

/**
 * Get all enrollments (admin)
 * GET /admin/enrollments
 */
export async function getAllEnrollments(params?: EnrollmentQueryParams): Promise<PageResponse<EnrollmentResponse>> {
  const response = await apiClient.get<PageResponse<EnrollmentResponse>>('/admin/enrollments', { params });
  return response.data;
}
