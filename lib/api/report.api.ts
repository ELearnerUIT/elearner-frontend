/**
 * Report API
 * Content and user reporting system
 */

import { apiClient } from './client';
import type {
  ReportResponse,
  CreateReportRequest,
  ReviewReportRequest,
  ReportQueryParams,
  ReportStatsResponse,
  PageResponse,
} from '@/types';

/**
 * Create report (authenticated)
 * POST /reports
 */
export async function createReport(data: CreateReportRequest): Promise<ReportResponse> {
  const response = await apiClient.post<ReportResponse>('/reports', data);
  return response.data;
}

/**
 * Get my reports (authenticated)
 * GET /reports/me
 */
export async function getMyReports(params?: ReportQueryParams): Promise<PageResponse<ReportResponse>> {
  const response = await apiClient.get<PageResponse<ReportResponse>>('/reports/me', { params });
  return response.data;
}

/**
 * Get report by ID (authenticated)
 * GET /reports/{reportId}
 */
export async function getReportById(reportId: number): Promise<ReportResponse> {
  const response = await apiClient.get<ReportResponse>(`/reports/${reportId}`);
  return response.data;
}

// ==================== ADMIN ENDPOINTS ====================

/**
 * Get all reports (admin)
 * GET /admin/reports
 */
export async function getAllReports(params?: ReportQueryParams): Promise<PageResponse<ReportResponse>> {
  const response = await apiClient.get<PageResponse<ReportResponse>>('/admin/reports', { params });
  return response.data;
}

/**
 * Review report (admin)
 * PUT /admin/reports/{reportId}/review
 */
export async function reviewReport(reportId: number, data: ReviewReportRequest): Promise<ReportResponse> {
  const response = await apiClient.put<ReportResponse>(`/admin/reports/${reportId}/review`, data);
  return response.data;
}

/**
 * Delete report (admin)
 * DELETE /admin/reports/{reportId}
 */
export async function deleteReport(reportId: number): Promise<void> {
  await apiClient.delete(`/admin/reports/${reportId}`);
}

/**
 * Get report statistics (admin)
 * GET /admin/reports/stats
 */
export async function getReportStats(): Promise<ReportStatsResponse> {
  const response = await apiClient.get<ReportStatsResponse>('/admin/reports/stats');
  return response.data;
}
