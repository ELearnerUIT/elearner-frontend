/**
 * Payment API
 * Payment processing with Stripe integration
 */

import { apiClient } from './client';
import type {
  PaymentResponse,
  CreatePaymentIntentRequest,
  PaymentIntentResponse,
  VerifyPaymentRequest,
  VerifyPaymentResponse,
  RefundPaymentRequest,
  PaymentQueryParams,
  PaymentStatsResponse,
  PageResponse,
} from '@/types';

/**
 * Create payment intent (student)
 * POST /payments/create-intent
 */
export async function createPaymentIntent(data: CreatePaymentIntentRequest): Promise<PaymentIntentResponse> {
  const response = await apiClient.post<PaymentIntentResponse>('/payments/create-intent', data);
  return response.data;
}

/**
 * Verify payment (student)
 * POST /payments/{paymentId}/verify
 */
export async function verifyPayment(paymentId: number, data: VerifyPaymentRequest): Promise<VerifyPaymentResponse> {
  const response = await apiClient.post<VerifyPaymentResponse>(`/payments/${paymentId}/verify`, data);
  return response.data;
}

/**
 * Get my payments (student)
 * GET /students/me/payments
 */
export async function getMyPayments(params?: PaymentQueryParams): Promise<PageResponse<PaymentResponse>> {
  const response = await apiClient.get<PageResponse<PaymentResponse>>('/students/me/payments', { params });
  return response.data;
}

/**
 * Get payment by ID (student/admin)
 * GET /payments/{paymentId}
 */
export async function getPaymentById(paymentId: number): Promise<PaymentResponse> {
  const response = await apiClient.get<PaymentResponse>(`/payments/${paymentId}`);
  return response.data;
}

// ==================== ADMIN ENDPOINTS ====================

/**
 * Get all payments (admin)
 * GET /admin/payments
 */
export async function getAllPayments(params?: PaymentQueryParams): Promise<PageResponse<PaymentResponse>> {
  const response = await apiClient.get<PageResponse<PaymentResponse>>('/admin/payments', { params });
  return response.data;
}

/**
 * Refund payment (admin)
 * POST /admin/payments/{paymentId}/refund
 */
export async function refundPayment(paymentId: number, data: RefundPaymentRequest): Promise<PaymentResponse> {
  const response = await apiClient.post<PaymentResponse>(`/admin/payments/${paymentId}/refund`, data);
  return response.data;
}

/**
 * Get payment statistics (admin)
 * GET /admin/payments/stats
 */
export async function getPaymentStats(params?: {
  startDate?: string;
  endDate?: string;
}): Promise<PaymentStatsResponse> {
  const response = await apiClient.get<PaymentStatsResponse>('/admin/payments/stats', { params });
  return response.data;
}

/**
 * Get course payments (teacher/admin)
 * GET /courses/{courseId}/payments
 */
export async function getCoursePayments(
  courseId: number,
  params?: PaymentQueryParams
): Promise<PageResponse<PaymentResponse>> {
  const response = await apiClient.get<PageResponse<PaymentResponse>>(`/courses/${courseId}/payments`, { params });
  return response.data;
}
