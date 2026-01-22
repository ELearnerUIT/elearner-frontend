/**
 * System settings response DTO
 */
export interface SystemSettingsResponse {
  id: number;
  settingKey: string;
  settingValue: string;
  description: string | null;
  category: string;
  isPublic: boolean;
  updatedAt: string;
  updatedBy: string | null;
}

/**
 * Update system setting request DTO
 * PUT /api/v1/admin/settings/{settingKey}
 */
export interface UpdateSystemSettingRequest {
  settingValue: string;
  description?: string;
}

/**
 * Bulk update settings request DTO
 * POST /api/v1/admin/settings/bulk-update
 */
export interface BulkUpdateSettingsRequest {
  settings: {
    settingKey: string;
    settingValue: string;
  }[];
}

/**
 * System settings query parameters
 */
export interface SystemSettingsQueryParams {
  category?: string;
  isPublic?: boolean;
  search?: string;
  page?: number;
  size?: number;
}

/**
 * Platform configuration response
 * GET /api/v1/admin/config
 */
export interface PlatformConfigResponse {
  platformName: string;
  platformEmail: string;
  platformFeePercentage: number;
  defaultCurrency: string;
  maxFileUploadSizeMB: number;
  maxVideoUploadSizeMB: number;
  allowedVideoFormats: string[];
  allowedDocumentFormats: string[];
  allowedImageFormats: string[];
  enableEmailNotifications: boolean;
  enablePushNotifications: boolean;
  enableStripePayments: boolean;
  maintenanceMode: boolean;
  registrationEnabled: boolean;
}

/**
 * Update platform config request DTO
 * PUT /api/v1/admin/config
 */
export interface UpdatePlatformConfigRequest {
  platformName?: string;
  platformEmail?: string;
  platformFeePercentage?: number;
  defaultCurrency?: string;
  maxFileUploadSizeMB?: number;
  maxVideoUploadSizeMB?: number;
  allowedVideoFormats?: string[];
  allowedDocumentFormats?: string[];
  allowedImageFormats?: string[];
  enableEmailNotifications?: boolean;
  enablePushNotifications?: boolean;
  enableStripePayments?: boolean;
  maintenanceMode?: boolean;
  registrationEnabled?: boolean;
}
