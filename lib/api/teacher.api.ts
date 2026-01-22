/**
 * Teacher API
 * Teacher-specific operations, courses, and statistics
 */

import { apiClient } from './client';
import type {
  TeacherResponse,
  UpdateTeacherRequest,
  TeacherPublicProfileResponse,
  TeacherStatsResponse,
  TeacherDashboardStatsResponse,
  PageResponse,
  PaginationParams,
} from '@/types';

/**
 * Get all teachers (public/admin)
 * GET /teachers
 */
export async function getAllTeachers(params?: PaginationParams & {
  search?: string;
  specialty?: string;
  status?: string;
}): Promise<PageResponse<TeacherResponse>> {
  const response = await apiClient.get<PageResponse<TeacherResponse>>('/teachers', { params });
  return response.data;
}

/**
 * Get teacher by ID (public)
 * GET /teachers/{id}
 */
export async function getTeacherById(id: number): Promise<TeacherResponse> {
  const response = await apiClient.get<TeacherResponse>(`/teachers/${id}`);
  return response.data;
}

/**
 * Get teacher public profile (public)
 * GET /teachers/{id}/profile
 */
export async function getTeacherPublicProfile(id: number): Promise<TeacherPublicProfileResponse> {
  const response = await apiClient.get<TeacherPublicProfileResponse>(`/teachers/${id}/profile`);
  return response.data;
}

/**
 * Get current teacher profile
 * GET /teachers/me
 */
export async function getMyTeacherProfile(): Promise<TeacherResponse> {
  const response = await apiClient.get<TeacherResponse>('/teachers/me');
  return response.data;
}

/**
 * Update current teacher profile
 * PUT /teachers/me
 */
export async function updateMyTeacherProfile(data: UpdateTeacherRequest): Promise<TeacherResponse> {
  const response = await apiClient.put<TeacherResponse>('/teachers/me', data);
  return response.data;
}

/**
 * Get teacher statistics
 * GET /teachers/{id}/stats
 */
export async function getTeacherStats(id: number): Promise<TeacherStatsResponse> {
  const response = await apiClient.get<TeacherStatsResponse>(`/teachers/${id}/stats`);
  return response.data;
}

/**
 * Get my teacher statistics
 * GET /teachers/me/stats
 */
export async function getMyTeacherStats(): Promise<TeacherStatsResponse> {
  const response = await apiClient.get<TeacherStatsResponse>('/teachers/me/stats');
  return response.data;
}

/**
 * Get teacher dashboard stats
 * GET /teachers/dashboard/stats
 */
export async function getTeacherDashboardStats(): Promise<TeacherDashboardStatsResponse> {
  const response = await apiClient.get<TeacherDashboardStatsResponse>('/teachers/dashboard/stats');
  return response.data;
}
