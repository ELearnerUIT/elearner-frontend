import { StorageProvider } from '../shared/common.types';

/**
 * File storage response DTO
 */
export interface FileStorageResponse {
  id: number;
  storageKey: string;
  storageProvider: StorageProvider;
  originalName: string;
  mimeType: string;
  sizeBytes: number;
  formattedSize: string;
  fileExtension: string;
  checksum: string;
  isVideo: boolean;
  isImage: boolean;
  isDocument: boolean;
  uploadedBy: string;
  createdAt: string;
}

/**
 * Upload file request (form data)
 * POST /api/v1/files/upload
 */
export interface UploadFileRequest {
  file: File;
  folderPath?: string;
  storageProvider?: StorageProvider;
}

/**
 * File download URL response
 * GET /api/v1/files/{id}/download
 */
export interface FileDownloadUrlResponse {
  downloadUrl: string;
  expiresAt: string;
}

/**
 * File with download URL response
 * GET /api/v1/files/{id}/details
 */
export interface FileWithDownloadUrlResponse extends FileStorageResponse {
  downloadUrl: string;
  expiresAt: string;
}

/**
 * Download URL parameters
 */
export interface DownloadUrlParams {
  expirySeconds?: number;
}
