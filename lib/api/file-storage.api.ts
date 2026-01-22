/**
 * File Storage API
 * General file upload, download, and management
 */

import { apiClient } from './client';
import type {
  FileStorageResponse,
  FileDownloadUrlResponse,
  FileWithDownloadUrlResponse,
  DownloadUrlParams,
  StorageProvider,
} from '@/types';

/**
 * Upload file (authenticated)
 * POST /files/upload
 */
export async function uploadFile(
  file: File,
  folderPath?: string,
  storageProvider?: StorageProvider
): Promise<FileStorageResponse> {
  const formData = new FormData();
  formData.append('file', file);
  if (folderPath) formData.append('folderPath', folderPath);
  if (storageProvider) formData.append('storageProvider', storageProvider);
  
  const response = await apiClient.post<FileStorageResponse>('/files/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
}

/**
 * Get file by ID (authenticated)
 * GET /files/{id}
 */
export async function getFileById(id: number): Promise<FileStorageResponse> {
  const response = await apiClient.get<FileStorageResponse>(`/files/${id}`);
  return response.data;
}

/**
 * Get file details with download URL (authenticated)
 * GET /files/{id}/details
 */
export async function getFileDetails(id: number, params?: DownloadUrlParams): Promise<FileWithDownloadUrlResponse> {
  const response = await apiClient.get<FileWithDownloadUrlResponse>(`/files/${id}/details`, { params });
  return response.data;
}

/**
 * Get file download URL (authenticated)
 * GET /files/{id}/download
 */
export async function getFileDownloadUrl(id: number, params?: DownloadUrlParams): Promise<FileDownloadUrlResponse> {
  const response = await apiClient.get<FileDownloadUrlResponse>(`/files/${id}/download`, { params });
  return response.data;
}

/**
 * Delete file (authenticated)
 * DELETE /files/{id}
 */
export async function deleteFile(id: number): Promise<void> {
  await apiClient.delete(`/files/${id}`);
}
