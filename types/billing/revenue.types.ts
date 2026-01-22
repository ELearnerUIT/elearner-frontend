import { PayoutStatus } from '../shared/common.types';

/**
 * Revenue share response DTO
 */
export interface RevenueShareResponse {
  id: number;
  paymentId: number;
  teacherId: number;
  teacherName: string;
  courseId: number;
  courseName: string;
  studentName: string;
  totalAmount: number;
  platformFeePercentage: number;
  platformFeeAmount: number;
  teacherSharePercentage: number;
  teacherShareAmount: number;
  currency: string;
  payoutStatus: PayoutStatus;
  payoutId: number | null;
  payoutDate: string | null;
  createdAt: string;
}

/**
 * Revenue share statistics response
 * GET /api/v1/revenue-shares/teacher/{teacherId}/stats
 */
export interface TeacherRevenueStatsResponse {
  teacherId: number;
  totalEarnings: number;
  pendingAmount: number;
  paidAmount: number;
  totalTransactions: number;
  currency: string;
  monthlyEarnings: {
    month: string;
    earnings: number;
    transactionCount: number;
  }[];
  topCourses: {
    courseId: number;
    courseName: string;
    earnings: number;
    enrollmentCount: number;
  }[];
}

/**
 * Platform revenue statistics response
 * GET /api/v1/revenue-shares/platform/stats
 */
export interface PlatformRevenueStatsResponse {
  totalRevenue: number;
  platformFees: number;
  teacherPayouts: number;
  pendingPayouts: number;
  totalTransactions: number;
  currency: string;
  monthlyRevenue: {
    month: string;
    totalRevenue: number;
    platformFees: number;
    teacherPayouts: number;
  }[];
}

/**
 * Payout request DTO
 * POST /api/v1/revenue-shares/payout
 */
export interface CreatePayoutRequest {
  teacherId: number;
  amount: number;
  revenueShareIds: number[];
}

/**
 * Payout response
 */
export interface PayoutResponse {
  id: number;
  teacherId: number;
  teacherName: string;
  amount: number;
  currency: string;
  status: PayoutStatus;
  revenueShareCount: number;
  processedAt: string | null;
  failureReason: string | null;
  createdAt: string;
}

/**
 * Revenue share query parameters
 */
export interface RevenueShareQueryParams {
  teacherId?: number;
  courseId?: number;
  payoutStatus?: PayoutStatus;
  startDate?: string;
  endDate?: string;
  page?: number;
  size?: number;
  sortBy?: string;
  sortDirection?: 'ASC' | 'DESC';
}
