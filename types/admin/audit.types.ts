import { AuditAction } from '../shared/common.types';

/**
 * Audit log response DTO
 */
export interface AuditLogResponse {
  id: number;
  userId: number | null;
  userName: string | null;
  userRole: string | null;
  action: AuditAction;
  entityType: string;
  entityId: number | null;
  description: string;
  ipAddress: string | null;
  userAgent: string | null;
  requestMethod: string | null;
  requestUrl: string | null;
  statusCode: number | null;
  metadata: Record<string, any> | null;
  createdAt: string;
}

/**
 * Audit log query parameters
 */
export interface AuditLogQueryParams {
  userId?: number;
  action?: AuditAction;
  entityType?: string;
  entityId?: number;
  startDate?: string;
  endDate?: string;
  ipAddress?: string;
  search?: string;
  page?: number;
  size?: number;
  sortBy?: string;
  sortDirection?: 'ASC' | 'DESC';
}

/**
 * Audit statistics response
 * GET /api/v1/admin/audit-logs/stats
 */
export interface AuditStatsResponse {
  totalLogs: number;
  todayLogs: number;
  weekLogs: number;
  monthLogs: number;
  actionBreakdown: {
    action: AuditAction;
    count: number;
  }[];
  entityTypeBreakdown: {
    entityType: string;
    count: number;
  }[];
  topUsers: {
    userId: number;
    userName: string;
    actionCount: number;
  }[];
}

/**
 * System health response
 * GET /api/v1/admin/system/health
 */
export interface SystemHealthResponse {
  status: 'UP' | 'DOWN' | 'DEGRADED';
  database: {
    status: 'UP' | 'DOWN';
    responseTime: number;
  };
  storage: {
    status: 'UP' | 'DOWN';
    totalSpace: number;
    usedSpace: number;
    freeSpace: number;
  };
  cache: {
    status: 'UP' | 'DOWN';
  };
  uptime: number;
  timestamp: string;
}
