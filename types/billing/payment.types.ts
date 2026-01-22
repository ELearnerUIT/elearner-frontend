import { PaymentStatus, PaymentMethod } from '../shared/common.types';

/**
 * Payment response DTO
 */
export interface PaymentResponse {
  id: number;
  studentId: number;
  studentName: string;
  courseId: number;
  courseName: string;
  amount: number;
  currency: string;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  transactionId: string | null;
  stripePaymentIntentId: string | null;
  stripeCheckoutSessionId: string | null;
  paymentDate: string | null;
  failureReason: string | null;
  refundAmount: number | null;
  refundedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

/**
 * Create payment intent request DTO
 * POST /api/v1/payments/create-intent
 */
export interface CreatePaymentIntentRequest {
  courseId: number;
  paymentMethod: PaymentMethod;
  returnUrl?: string;
  cancelUrl?: string;
}

/**
 * Payment intent response
 */
export interface PaymentIntentResponse {
  paymentId: number;
  clientSecret: string;
  publishableKey: string;
  amount: number;
  currency: string;
}

/**
 * Verify payment request DTO
 * POST /api/v1/payments/{paymentId}/verify
 */
export interface VerifyPaymentRequest {
  stripePaymentIntentId?: string;
  transactionId?: string;
}

/**
 * Verify payment response
 */
export interface VerifyPaymentResponse {
  isVerified: boolean;
  paymentStatus: PaymentStatus;
  enrollmentId: number | null;
  message: string;
}

/**
 * Refund payment request DTO
 * POST /api/v1/payments/{paymentId}/refund
 */
export interface RefundPaymentRequest {
  amount: number;
  reason: string;
}

/**
 * Payment query parameters
 */
export interface PaymentQueryParams {
  studentId?: number;
  courseId?: number;
  paymentStatus?: PaymentStatus;
  paymentMethod?: PaymentMethod;
  startDate?: string;
  endDate?: string;
  page?: number;
  size?: number;
  sortBy?: string;
  sortDirection?: 'ASC' | 'DESC';
}

/**
 * Payment statistics response
 * GET /api/v1/payments/stats
 */
export interface PaymentStatsResponse {
  totalRevenue: number;
  totalPayments: number;
  successfulPayments: number;
  failedPayments: number;
  pendingPayments: number;
  refundedAmount: number;
  averagePaymentAmount: number;
  currency: string;
  monthlyRevenue: {
    month: string;
    revenue: number;
    paymentCount: number;
  }[];
}
