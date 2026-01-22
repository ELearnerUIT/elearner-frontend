/**
 * Account Management API
 * Handles account profile, avatar, status management, and bulk operations
 */

import { apiClient } from './client';
import type {
  AccountProfileResponse,
  UpdateProfileRequest,
  UpdateAccountStatusRequest,
  ApproveTeacherRequest,
  RejectTeacherRequest,
  SuspendAccountRequest,
  UnlockAccountRequest,
  DeactivateAccountRequest,
  ImportResultResponse,
  ActionLogResponse,
  PageResponse,
  PaginationParams,
} from '@/types';
import { ExportType } from '@/types';

/**
 * Get current user profile
 * GET /accounts/me
 */
export async function getMyProfile(): Promise<AccountProfileResponse> {
  const response = await apiClient.get<AccountProfileResponse>('/accounts/me');
  return response.data;
}

/**
 * Update current user profile
 * PUT /accounts/me
 */
export async function updateMyProfile(data: UpdateProfileRequest): Promise<AccountProfileResponse> {
  const response = await apiClient.put<AccountProfileResponse>('/accounts/me', data);
  return response.data;
}

/**
 * Upload avatar
 * POST /accounts/me/avatar
 */
export async function uploadAvatar(file: File): Promise<AccountProfileResponse> {
  const formData = new FormData();
  formData.append('file', file);
  
  const response = await apiClient.post<AccountProfileResponse>('/accounts/me/avatar', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
}

// ==================== ADMIN ENDPOINTS ====================

/**
 * Get all accounts (admin)
 * GET /admin/accounts
 */
export async function getAllAccounts(params?: PaginationParams & {
  role?: string;
  status?: string;
  search?: string;
  filter?: string;
}): Promise<PageResponse<AccountProfileResponse>> {
  const response = await apiClient.get<PageResponse<AccountProfileResponse>>('/admin/accounts', { params });
  return response.data;
}

/**
 * Get account by ID (admin)
 * GET /admin/accounts/{id}
 */
export async function getAccountById(id: number): Promise<AccountProfileResponse> {
  const response = await apiClient.get<AccountProfileResponse>(`/admin/accounts/${id}`);
  return response.data;
}

/**
 * Approve teacher account (admin)
 * PATCH /admin/accounts/{id}/approve
 */
export async function approveTeacherAccount(id: number, data?: ApproveTeacherRequest): Promise<AccountProfileResponse> {
  const response = await apiClient.patch<AccountProfileResponse>(`/admin/accounts/${id}/approve`, data);
  return response.data;
}

/**
 * Reject teacher account (admin)
 * PATCH /admin/accounts/{id}/reject
 */
export async function rejectTeacherAccount(id: number, data: RejectTeacherRequest): Promise<AccountProfileResponse> {
  const response = await apiClient.patch<AccountProfileResponse>(`/admin/accounts/${id}/reject`, data);
  return response.data;
}

/**
 * Update account status (admin)
 * PATCH /admin/accounts/{id}/status
 */
export async function updateAccountStatus(id: number, data: UpdateAccountStatusRequest): Promise<AccountProfileResponse> {
  const response = await apiClient.patch<AccountProfileResponse>(`/admin/accounts/${id}/status`, data);
  return response.data;
}

/**
 * Suspend account (admin)
 * POST /admin/accounts/{id}/suspend
 */
export async function suspendAccount(id: number, data?: SuspendAccountRequest): Promise<AccountProfileResponse> {
  const response = await apiClient.post<AccountProfileResponse>(`/admin/accounts/${id}/suspend`, data);
  return response.data;
}

/**
 * Unlock suspended account (admin)
 * POST /admin/accounts/{id}/unlock
 */
export async function unlockAccount(id: number, data?: UnlockAccountRequest): Promise<AccountProfileResponse> {
  const response = await apiClient.post<AccountProfileResponse>(`/admin/accounts/${id}/unlock`, data);
  return response.data;
}

/**
 * Deactivate account (admin)
 * POST /admin/accounts/{id}/deactivate
 */
export async function deactivateAccount(id: number, data?: DeactivateAccountRequest): Promise<AccountProfileResponse> {
  const response = await apiClient.post<AccountProfileResponse>(`/admin/accounts/${id}/deactivate`, data);
  return response.data;
}

/**
 * Soft delete account (admin)
 * DELETE /admin/accounts/{id}
 */
export async function deleteAccount(id: number): Promise<void> {
  await apiClient.delete(`/admin/accounts/${id}`);
}

/**
 * Get account action logs (admin)
 * GET /admin/accounts/{id}/logs
 */
export async function getAccountActionLogs(
  id: number,
  params?: PaginationParams & { actionType?: string }
): Promise<PageResponse<ActionLogResponse>> {
  const response = await apiClient.get<PageResponse<ActionLogResponse>>(`/admin/accounts/${id}/logs`, { params });
  return response.data;
}

/**
 * Download student import template (admin)
 * GET /admin/accounts/import-template
 */
export async function downloadImportTemplate(): Promise<Blob> {
  const response = await apiClient.get<Blob>('/admin/accounts/import-template', {
    responseType: 'blob',
  });
  return response.data;
}

/**
 * Bulk import students (admin)
 * POST /admin/accounts/import
 */
export async function bulkImportStudents(file: File): Promise<ImportResultResponse> {
  const formData = new FormData();
  formData.append('file', file);
  
  const response = await apiClient.post<ImportResultResponse>('/admin/accounts/import', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
}

/**
 * Export accounts (admin)
 * GET /admin/accounts/export?type={CSV|EXCEL|PDF}
 */
export async function exportAccounts(type: ExportType = ExportType.CSV): Promise<Blob> {
  const response = await apiClient.get<Blob>('/admin/accounts/export', {
    params: { type },
    responseType: 'blob',
  });
  return response.data;
}
