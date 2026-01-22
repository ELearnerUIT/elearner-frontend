import { Role, AccountStatus, Gender } from '../shared/common.types';
import { PaginationParams } from '../shared/api.types';

/**
 * Account profile response DTO
 * GET /api/v1/accounts/me
 */
export interface AccountProfileResponse {
  id: number;
  username: string;
  email: string;
  role: Role;
  fullName: string | null;
  avatarUrl: string;
  birthDate: string | null;
  phone: string | null;
  bio: string | null;
  gender: Gender | null;
  langKey: string;
  status: AccountStatus;
  emailVerified: boolean;
  createdAt: string;
  updatedAt: string;
  // Teacher-specific fields
  specialty?: string | null;
  degree?: string | null;
  approvalStatus?: string | null;
  // Student-specific fields
  studentCode?: string | null;
  enrollmentDate?: string | null;
}

/**
 * Update profile request DTO
 * PUT /api/v1/accounts/me
 */
export interface UpdateProfileRequest {
  fullName?: string;
  birthDate?: string;
  phone?: string;
  bio?: string;
  gender?: Gender;
  // Teacher-specific fields
  specialty?: string;
  degree?: string;
}

/**
 * Avatar upload response
 * POST /api/v1/accounts/me/avatar
 */
export interface AvatarUploadResponse {
  avatarUrl: string;
}

/**
 * Account response DTO (Admin view)
 * GET /api/v1/admin/accounts/{id}
 */
export interface AccountResponse {
  id: number;
  username: string;
  email: string;
  role: Role;
  fullName: string | null;
  avatarUrl: string;
  birthDate: string | null;
  phone: string | null;
  bio: string | null;
  gender: Gender | null;
  langKey: string;
  status: AccountStatus;
  emailVerified: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  lastLoginAt: string | null;
  // Teacher-specific
  teacherCode?: string | null;
  specialty?: string | null;
  degree?: string | null;
  approvalStatus?: string | null;
  approvedAt?: string | null;
  approvedBy?: string | null;
  rejectionReason?: string | null;
  // Student-specific
  studentCode?: string | null;
  enrollmentDate?: string | null;
}

/**
 * Update account status request DTO
 * PATCH /api/v1/admin/accounts/{id}/status
 */
export interface UpdateStatusRequest {
  status: AccountStatus;
  reason?: string;
}

/**
 * Alias for backward compatibility
 */
export type UpdateAccountStatusRequest = UpdateStatusRequest;

/**
 * Account suspension request DTO
 * POST /api/v1/admin/accounts/{id}/suspend
 */
export interface SuspendAccountRequest {
  reason?: string;
}

/**
 * Account unlock request DTO
 * POST /api/v1/admin/accounts/{id}/unlock
 */
export interface UnlockAccountRequest {
  reason?: string;
}

/**
 * Account deactivation request DTO
 * POST /api/v1/admin/accounts/{id}/deactivate
 */
export interface DeactivateAccountRequest {
  reason?: string;
}

/**
 * Approve teacher account request DTO
 * PATCH /api/v1/admin/accounts/{id}/approve
 */
export interface ApproveTeacherRequest {
  note?: string;
}

/**
 * Reject teacher account request DTO
 * PATCH /api/v1/admin/accounts/{id}/reject
 */
export interface RejectTeacherRequest {
  reason: string;
}

/**
 * Import result response DTO
 */
export interface ImportResultResponse {
  totalRows: number;
  successCount: number;
  failureCount: number;
  errors: ImportError[];
}

/**
 * Import error details
 */
export interface ImportError {
  row: number;
  field?: string;
  value?: string;
  message: string;
}

/**
 * Action log response DTO
 * GET /api/v1/admin/accounts/{id}/logs
 */
export interface ActionLogResponse {
  id: number;
  accountId: number;
  actionType: string;
  actionDescription: string;
  performedBy: string;
  performedByName: string;
  ipAddress: string | null;
  deviceInfo: string | null;
  metadata: Record<string, unknown> | null;
  createdAt: string;
}

/**
 * Account query parameters
 * GET /api/v1/admin/accounts
 */
export interface AccountQueryParams extends PaginationParams {
  role?: Role;
  status?: AccountStatus;
  emailVerified?: boolean;
  search?: string;
}

/**
 * Account export parameters
 * GET /api/v1/admin/accounts/export
 */
export interface AccountExportParams {
  type: 'CSV' | 'EXCEL';
  role?: Role;
  status?: AccountStatus;
}
