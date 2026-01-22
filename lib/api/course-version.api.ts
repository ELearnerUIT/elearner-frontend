/**
 * Course Version API
 * Course versioning, approval workflow, and version management
 */

import { apiClient } from './client';
import type {
  CourseVersionResponse,
  CreateVersionRequest,
  UpdateVersionRequest,
  VersionQueryParams,
  RejectVersionRequest,
  PageResponse,
} from '@/types';

/**
 * Get all versions of a course (teacher/admin)
 * GET /courses/{courseId}/versions
 */
export async function getCourseVersions(
  courseId: number,
  params?: VersionQueryParams
): Promise<PageResponse<CourseVersionResponse>> {
  const response = await apiClient.get<PageResponse<CourseVersionResponse>>(`/courses/${courseId}/versions`, { params });
  return response.data;
}

/**
 * Get version by ID (teacher/admin)
 * GET /courses/{courseId}/versions/{versionId}
 */
export async function getVersionById(courseId: number, versionId: number): Promise<CourseVersionResponse> {
  const response = await apiClient.get<CourseVersionResponse>(`/courses/${courseId}/versions/${versionId}`);
  return response.data;
}

/**
 * Get latest version of a course (teacher/admin)
 * GET /courses/{courseId}/versions/latest
 */
export async function getLatestVersion(courseId: number): Promise<CourseVersionResponse> {
  const response = await apiClient.get<CourseVersionResponse>(`/courses/${courseId}/versions/latest`);
  return response.data;
}

/**
 * Get published version of a course (public)
 * GET /courses/{courseId}/versions/published
 */
export async function getPublishedVersion(courseId: number): Promise<CourseVersionResponse> {
  const response = await apiClient.get<CourseVersionResponse>(`/courses/${courseId}/versions/published`);
  return response.data;
}

/**
 * Create new version (teacher)
 * POST /courses/{courseId}/versions
 */
export async function createVersion(courseId: number, data: CreateVersionRequest): Promise<CourseVersionResponse> {
  const response = await apiClient.post<CourseVersionResponse>(`/courses/${courseId}/versions`, data);
  return response.data;
}

/**
 * Update version (teacher)
 * PUT /courses/{courseId}/versions/{versionId}
 */
export async function updateVersion(
  courseId: number,
  versionId: number,
  data: UpdateVersionRequest
): Promise<CourseVersionResponse> {
  const response = await apiClient.put<CourseVersionResponse>(`/courses/${courseId}/versions/${versionId}`, data);
  return response.data;
}

/**
 * Delete version (teacher)
 * DELETE /courses/{courseId}/versions/{versionId}
 */
export async function deleteVersion(courseId: number, versionId: number): Promise<void> {
  await apiClient.delete(`/courses/${courseId}/versions/${versionId}`);
}

/**
 * Submit version for approval (teacher)
 * POST /courses/{courseId}/versions/{versionId}/submit
 */
export async function submitVersionForApproval(courseId: number, versionId: number): Promise<CourseVersionResponse> {
  const response = await apiClient.post<CourseVersionResponse>(`/courses/${courseId}/versions/${versionId}/submit`);
  return response.data;
}

/**
 * Approve version (admin)
 * POST /admin/course-versions/{versionId}/approve
 */
export async function approveVersion(versionId: number): Promise<CourseVersionResponse> {
  const response = await apiClient.post<CourseVersionResponse>(`/admin/course-versions/${versionId}/approve`);
  return response.data;
}

/**
 * Reject version (admin)
 * POST /admin/course-versions/{versionId}/reject
 */
export async function rejectVersion(versionId: number, data: RejectVersionRequest): Promise<CourseVersionResponse> {
  const response = await apiClient.post<CourseVersionResponse>(`/admin/course-versions/${versionId}/reject`, data);
  return response.data;
}

/**
 * Publish version (admin)
 * POST /admin/course-versions/{versionId}/publish
 */
export async function publishVersion(versionId: number): Promise<CourseVersionResponse> {
  const response = await apiClient.post<CourseVersionResponse>(`/admin/course-versions/${versionId}/publish`);
  return response.data;
}

/**
 * Get all pending versions (admin)
 * GET /admin/course-versions/pending
 */
export async function getPendingVersions(params?: {
  page?: number;
  size?: number;
  sortBy?: string;
  sortDirection?: 'ASC' | 'DESC';
}): Promise<PageResponse<CourseVersionResponse>> {
  const response = await apiClient.get<PageResponse<CourseVersionResponse>>('/admin/course-versions/pending', { params });
  return response.data;
}
