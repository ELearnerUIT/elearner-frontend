/**
 * Revenue API
 * Revenue sharing and teacher payouts
 */

import { apiClient } from './client';
import type {
  RevenueShareResponse,
  TeacherRevenueStatsResponse,
  PlatformRevenueStatsResponse,
  CreatePayoutRequest,
  PayoutResponse,
  RevenueShareQueryParams,
  PageResponse,
} from '@/types';

/**
 * Get my revenue shares (teacher)
 * GET /teachers/me/revenue-shares
 */
export async function getMyRevenueShares(
  params?: RevenueShareQueryParams
): Promise<PageResponse<RevenueShareResponse>> {
  const response = await apiClient.get<PageResponse<RevenueShareResponse>>('/teachers/me/revenue-shares', { params });
  return response.data;
}

/**
 * Get my revenue statistics (teacher)
 * GET /revenue-shares/teacher/me/stats
 */
export async function getMyRevenueStats(params?: {
  startDate?: string;
  endDate?: string;
}): Promise<TeacherRevenueStatsResponse> {
  const response = await apiClient.get<TeacherRevenueStatsResponse>('/revenue-shares/teacher/me/stats', { params });
  return response.data;
}

// ==================== ADMIN ENDPOINTS ====================

/**
 * Get all revenue shares (admin)
 * GET /admin/revenue-shares
 */
export async function getAllRevenueShares(
  params?: RevenueShareQueryParams
): Promise<PageResponse<RevenueShareResponse>> {
  const response = await apiClient.get<PageResponse<RevenueShareResponse>>('/admin/revenue-shares', { params });
  return response.data;
}

/**
 * Get teacher revenue statistics (admin)
 * GET /admin/revenue-shares/teacher/{teacherId}/stats
 */
export async function getTeacherRevenueStats(
  teacherId: number,
  params?: {
    startDate?: string;
    endDate?: string;
  }
): Promise<TeacherRevenueStatsResponse> {
  const response = await apiClient.get<TeacherRevenueStatsResponse>(
    `/admin/revenue-shares/teacher/${teacherId}/stats`,
    { params }
  );
  return response.data;
}

/**
 * Get platform revenue statistics (admin)
 * GET /admin/revenue-shares/platform/stats
 */
export async function getPlatformRevenueStats(params?: {
  startDate?: string;
  endDate?: string;
}): Promise<PlatformRevenueStatsResponse> {
  const response = await apiClient.get<PlatformRevenueStatsResponse>('/admin/revenue-shares/platform/stats', { params });
  return response.data;
}

/**
 * Create payout (admin)
 * POST /admin/revenue-shares/payout
 */
export async function createPayout(data: CreatePayoutRequest): Promise<PayoutResponse> {
  const response = await apiClient.post<PayoutResponse>('/admin/revenue-shares/payout', data);
  return response.data;
}

/**
 * Get teacher payouts (admin)
 * GET /admin/payouts/teacher/{teacherId}
 */
export async function getTeacherPayouts(
  teacherId: number,
  params?: {
    page?: number;
    size?: number;
    sortBy?: string;
    sortDirection?: 'ASC' | 'DESC';
  }
): Promise<PageResponse<PayoutResponse>> {
  const response = await apiClient.get<PageResponse<PayoutResponse>>(`/admin/payouts/teacher/${teacherId}`, { params });
  return response.data;
}

/**
 * Get all payouts (admin)
 * GET /admin/payouts
 */
export async function getAllPayouts(params?: {
  status?: string;
  startDate?: string;
  endDate?: string;
  page?: number;
  size?: number;
  sortBy?: string;
  sortDirection?: 'ASC' | 'DESC';
}): Promise<PageResponse<PayoutResponse>> {
  const response = await apiClient.get<PageResponse<PayoutResponse>>('/admin/payouts', { params });
  return response.data;
}
