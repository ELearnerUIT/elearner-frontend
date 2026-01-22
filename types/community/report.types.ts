import { ReportType, ReportStatus } from '../shared/common.types';

/**
 * Report response DTO
 */
export interface ReportResponse {
  id: number;
  reportType: ReportType;
  reportedEntityType: string;
  reportedEntityId: number;
  reporterId: number;
  reporterName: string;
  reportedUserId: number | null;
  reportedUserName: string | null;
  reason: string;
  description: string | null;
  status: ReportStatus;
  reviewerId: number | null;
  reviewerName: string | null;
  reviewNotes: string | null;
  reviewedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

/**
 * Create report request DTO
 * POST /api/v1/reports
 */
export interface CreateReportRequest {
  reportType: ReportType;
  reportedEntityType: string;
  reportedEntityId: number;
  reportedUserId?: number;
  reason: string;
  description?: string;
}

/**
 * Review report request DTO
 * PUT /api/v1/reports/{reportId}/review
 */
export interface ReviewReportRequest {
  status: ReportStatus.RESOLVED | ReportStatus.REJECTED;
  reviewNotes?: string;
}

/**
 * Report query parameters
 */
export interface ReportQueryParams {
  reportType?: ReportType;
  status?: ReportStatus;
  reportedEntityType?: string;
  reporterId?: number;
  reportedUserId?: number;
  page?: number;
  size?: number;
  sortBy?: string;
  sortDirection?: 'ASC' | 'DESC';
}

/**
 * Report statistics response
 * GET /api/v1/reports/stats
 */
export interface ReportStatsResponse {
  totalReports: number;
  pendingReports: number;
  resolvedReports: number;
  rejectedReports: number;
  reportsByType: {
    type: ReportType;
    count: number;
  }[];
}
