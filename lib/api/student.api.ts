/**
 * Student API
 * Student-specific operations, enrollments, and statistics
 */

import { apiClient } from './client';
import type {
  StudentResponse,
  UpdateStudentRequest,
  StudentCourseResponse,
  StudentStatsResponse,
  StudentDashboardStatsResponse,
  PageResponse,
  PaginationParams,
} from '@/types';

/**
 * Get all students (admin/teacher)
 * GET /students
 */
export async function getAllStudents(params?: PaginationParams & {
  search?: string;
  status?: string;
}): Promise<PageResponse<StudentResponse>> {
  const response = await apiClient.get<PageResponse<StudentResponse>>('/students', { params });
  return response.data;
}

/**
 * Get student by ID (admin/teacher)
 * GET /students/{id}
 */
export async function getStudentById(id: number): Promise<StudentResponse> {
  const response = await apiClient.get<StudentResponse>(`/students/${id}`);
  return response.data;
}

/**
 * Get current student profile
 * GET /students/me
 */
export async function getMyStudentProfile(): Promise<StudentResponse> {
  const response = await apiClient.get<StudentResponse>('/students/me');
  return response.data;
}

/**
 * Update current student profile
 * PUT /students/me
 */
export async function updateMyStudentProfile(data: UpdateStudentRequest): Promise<StudentResponse> {
  const response = await apiClient.put<StudentResponse>('/students/me', data);
  return response.data;
}

/**
 * Get student enrolled courses
 * GET /students/{id}/courses
 */
export async function getStudentCourses(
  id: number,
  params?: PaginationParams & { status?: string }
): Promise<PageResponse<StudentCourseResponse>> {
  const response = await apiClient.get<PageResponse<StudentCourseResponse>>(`/students/${id}/courses`, { params });
  return response.data;
}

/**
 * Get my enrolled courses
 * GET /students/me/courses
 */
export async function getMyCourses(params?: PaginationParams & {
  status?: string;
  search?: string;
}): Promise<PageResponse<StudentCourseResponse>> {
  const response = await apiClient.get<PageResponse<StudentCourseResponse>>('/students/me/courses', { params });
  return response.data;
}

/**
 * Get student statistics
 * GET /students/{id}/stats
 */
export async function getStudentStats(id: number): Promise<StudentStatsResponse> {
  const response = await apiClient.get<StudentStatsResponse>(`/students/${id}/stats`);
  return response.data;
}

/**
 * Get my student statistics
 * GET /students/me/stats
 */
export async function getMyStats(): Promise<StudentStatsResponse> {
  const response = await apiClient.get<StudentStatsResponse>('/students/me/stats');
  return response.data;
}

/**
 * Get student dashboard stats
 * GET /students/dashboard/stats
 */
export async function getStudentDashboardStats(): Promise<StudentDashboardStatsResponse> {
  const response = await apiClient.get<StudentDashboardStatsResponse>('/students/dashboard/stats');
  return response.data;
}
