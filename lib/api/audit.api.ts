/**
 * Audit API
 * Audit logs and system health monitoring
 */

import { apiClient } from './client';
import type {
  AuditLogResponse,
  AuditLogQueryParams,
  AuditStatsResponse,
  SystemHealthResponse,
  PageResponse,
} from '@/types';

/**
 * Get all audit logs (admin)
 * GET /admin/audit-logs
 */
export async function getAllAuditLogs(params?: AuditLogQueryParams): Promise<PageResponse<AuditLogResponse>> {
  const response = await apiClient.get<PageResponse<AuditLogResponse>>('/admin/audit-logs', { params });
  return response.data;
}

/**
 * Get audit log by ID (admin)
 * GET /admin/audit-logs/{id}
 */
export async function getAuditLogById(id: number): Promise<AuditLogResponse> {
  const response = await apiClient.get<AuditLogResponse>(`/admin/audit-logs/${id}`);
  return response.data;
}

/**
 * Get audit statistics (admin)
 * GET /admin/audit-logs/stats
 */
export async function getAuditStats(params?: {
  startDate?: string;
  endDate?: string;
}): Promise<AuditStatsResponse> {
  const response = await apiClient.get<AuditStatsResponse>('/admin/audit-logs/stats', { params });
  return response.data;
}

/**
 * Get system health (admin)
 * GET /admin/system/health
 */
export async function getSystemHealth(): Promise<SystemHealthResponse> {
  const response = await apiClient.get<SystemHealthResponse>('/admin/system/health');
  return response.data;
}

/**
 * Get user audit logs (admin)
 * GET /admin/users/{userId}/audit-logs
 */
export async function getUserAuditLogs(
  userId: number,
  params?: AuditLogQueryParams
): Promise<PageResponse<AuditLogResponse>> {
  const response = await apiClient.get<PageResponse<AuditLogResponse>>(`/admin/users/${userId}/audit-logs`, { params });
  return response.data;
}
