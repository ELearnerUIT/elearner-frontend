import { ResourceType } from '../shared/common.types';

/**
 * Lesson resource response DTO
 */
export interface LessonResourceResponse {
  id: number;
  lessonId: number;
  resourceType: ResourceType;
  title: string;
  description: string | null;
  fileStorageId: number | null;
  fileName: string | null;
  fileSizeBytes: number | null;
  formattedFileSize: string | null;
  downloadUrl: string | null;
  externalUrl: string | null;
  orderIndex: number;
  isRequired: boolean;
  isDownloadable: boolean;
  createdAt: string;
  updatedAt: string;
}

/**
 * Add file resource form data
 * POST /api/v1/lessons/{lessonId}/resources/file
 */
export interface AddFileResourceRequest {
  file: File;
  title?: string;
  description?: string;
  isRequired?: boolean;
}

/**
 * Create link/embed resource request DTO
 * POST /api/v1/lessons/{lessonId}/resources
 */
export interface CreateLinkResourceRequest {
  resourceType: ResourceType.LINK | ResourceType.EMBED;
  title: string;
  description?: string;
  externalUrl: string;
  isRequired?: boolean;
}

/**
 * Update resource request DTO
 * PUT /api/v1/lessons/{lessonId}/resources/{resourceId}
 */
export interface UpdateResourceRequest {
  resourceType?: ResourceType;
  title?: string;
  description?: string;
  externalUrl?: string;
  isRequired?: boolean;
}

/**
 * Replace resource file form data
 * PUT /api/v1/lessons/{lessonId}/resources/{resourceId}/file
 */
export interface ReplaceResourceFileRequest {
  file: File;
}

/**
 * Reorder resources request DTO
 * POST /api/v1/lessons/{lessonId}/resources/reorder
 */
export interface ReorderResourcesRequest {
  resourceIds: number[];
}
