/**
 * System API
 * System settings and platform configuration
 */

import { apiClient } from './client';
import type {
  SystemSettingsResponse,
  UpdateSystemSettingRequest,
  BulkUpdateSettingsRequest,
  SystemSettingsQueryParams,
  PlatformConfigResponse,
  UpdatePlatformConfigRequest,
  PageResponse,
} from '@/types';

/**
 * Get all system settings (admin)
 * GET /admin/settings
 */
export async function getAllSystemSettings(
  params?: SystemSettingsQueryParams
): Promise<PageResponse<SystemSettingsResponse>> {
  const response = await apiClient.get<PageResponse<SystemSettingsResponse>>('/admin/settings', { params });
  return response.data;
}

/**
 * Get system setting by key (admin)
 * GET /admin/settings/{settingKey}
 */
export async function getSystemSettingByKey(settingKey: string): Promise<SystemSettingsResponse> {
  const response = await apiClient.get<SystemSettingsResponse>(`/admin/settings/${settingKey}`);
  return response.data;
}

/**
 * Update system setting (admin)
 * PUT /admin/settings/{settingKey}
 */
export async function updateSystemSetting(
  settingKey: string,
  data: UpdateSystemSettingRequest
): Promise<SystemSettingsResponse> {
  const response = await apiClient.put<SystemSettingsResponse>(`/admin/settings/${settingKey}`, data);
  return response.data;
}

/**
 * Bulk update system settings (admin)
 * POST /admin/settings/bulk-update
 */
export async function bulkUpdateSettings(data: BulkUpdateSettingsRequest): Promise<SystemSettingsResponse[]> {
  const response = await apiClient.post<SystemSettingsResponse[]>('/admin/settings/bulk-update', data);
  return response.data;
}

/**
 * Get platform configuration (admin)
 * GET /admin/config
 */
export async function getPlatformConfig(): Promise<PlatformConfigResponse> {
  const response = await apiClient.get<PlatformConfigResponse>('/admin/config');
  return response.data;
}

/**
 * Update platform configuration (admin)
 * PUT /admin/config
 */
export async function updatePlatformConfig(data: UpdatePlatformConfigRequest): Promise<PlatformConfigResponse> {
  const response = await apiClient.put<PlatformConfigResponse>('/admin/config', data);
  return response.data;
}

/**
 * Get public platform settings (public)
 * GET /platform/settings
 */
export async function getPublicPlatformSettings(): Promise<Record<string, string>> {
  const response = await apiClient.get<Record<string, string>>('/platform/settings');
  return response.data;
}
