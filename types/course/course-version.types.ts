import { VersionStatus } from '../shared/common.types';
import { PaginationParams } from '../shared/api.types';

/**
 * Course version response DTO
 */
export interface CourseVersionResponse {
  id: number;
  courseId: number;
  versionNumber: number;
  title: string;
  description: string;
  price: number;
  durationDays: number;
  passScore: number;
  finalWeight: number;
  minProgressPct: number;
  status: VersionStatus;
  notes: string | null;
  publishedAt: string | null;
  publishedBy: string | null;
  approvedAt: string | null;
  approvedBy: string | null;
  rejectedAt: string | null;
  rejectedBy: string | null;
  rejectionReason: string | null;
  totalChapters: number;
  totalLessons: number;
  totalVideoDuration: number;
  totalResources: number;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  updatedBy: string;
}

/**
 * Create course version request DTO
 * POST /api/v1/courses/{courseId}/versions
 */
export interface CreateVersionRequest {
  title: string;
  description: string;
  price: number;
  durationDays: number;
  passScore: number;
  finalWeight: number;
  minProgressPct: number;
  notes?: string;
}

/**
 * Update course version request DTO
 * PUT /api/v1/courses/{courseId}/versions/{versionId}
 */
export interface UpdateVersionRequest {
  title?: string;
  description?: string;
  price?: number;
  durationDays?: number;
  passScore?: number;
  finalWeight?: number;
  minProgressPct?: number;
  notes?: string;
}

/**
 * Version query parameters
 */
export interface VersionQueryParams extends PaginationParams {
  status?: VersionStatus;
  courseId?: number;
}

/**
 * Reject version request DTO
 * POST /api/v1/courses/{courseId}/versions/{versionId}/reject
 */
export interface RejectVersionRequest {
  reason: string;
}
