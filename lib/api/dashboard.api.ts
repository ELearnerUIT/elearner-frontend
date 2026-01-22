/**
 * Dashboard API
 * Dashboard statistics for admin, teacher, and student
 */

import { apiClient } from './client';
import type {
  AdminDashboardStatsResponse,
  PlatformAnalyticsResponse,
  StudentDashboardStatsResponse,
  TeacherDashboardStatsResponse,
} from '@/types';

/**
 * Get admin dashboard statistics (admin)
 * GET /admin/dashboard/stats
 */
export async function getAdminDashboardStats(): Promise<AdminDashboardStatsResponse> {
  const response = await apiClient.get<AdminDashboardStatsResponse>('/admin/dashboard/stats');
  return response.data;
}

/**
 * Get platform analytics (admin)
 * GET /admin/analytics
 */
export async function getPlatformAnalytics(params?: {
  startDate?: string;
  endDate?: string;
  period?: 'daily' | 'weekly' | 'monthly' | 'yearly';
}): Promise<PlatformAnalyticsResponse> {
  const response = await apiClient.get<PlatformAnalyticsResponse>('/admin/analytics', { params });
  return response.data;
}

/**
 * Get student dashboard statistics (student)
 * GET /students/dashboard/stats
 */
export async function getStudentDashboardStats(): Promise<StudentDashboardStatsResponse> {
  const response = await apiClient.get<StudentDashboardStatsResponse>('/students/dashboard/stats');
  return response.data;
}

/**
 * Get teacher dashboard statistics (teacher)
 * GET /teachers/dashboard/stats
 */
export async function getTeacherDashboardStats(): Promise<TeacherDashboardStatsResponse> {
  const response = await apiClient.get<TeacherDashboardStatsResponse>('/teachers/dashboard/stats');
  return response.data;
}
