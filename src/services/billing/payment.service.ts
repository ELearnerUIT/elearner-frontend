import { axiosClient } from "@/lib/api/axios";
import { unwrapResponse } from "@/lib/api/unwrap";
import { ApiResponse, PageResponse } from "@/lib/api/api.types";
import {
  CreatePaymentRequest,
  RefundRequest,
  PaymentUrlResponse,
  PaymentTransactionResponse,
  CoursePaymentStatsResponse,
  PaymentStatus,
} from "./billing.types";

const PAYMENT_PREFIX = "/payments";

export const paymentService = {
  /**
   * Create payment transaction (Student only)
   * Student initiates payment for a course. Returns payment URL for redirect.
   */
  createPayment: async (
    payload: CreatePaymentRequest,
  ): Promise<PaymentUrlResponse> => {
    const response = await axiosClient.post<ApiResponse<PaymentUrlResponse>>(
      `${PAYMENT_PREFIX}/create-payment`,
      payload,
    );

    return unwrapResponse(response);
  },

  /**
   * Verify payment (Authenticated)
   * Manual verification endpoint used for frontend to verify payment after redirect from gateway
   */
  verifyPayment: async (
    params: Record<string, string>,
  ): Promise<PaymentTransactionResponse> => {
    const response = await axiosClient.post<
      ApiResponse<PaymentTransactionResponse>
    >(`${PAYMENT_PREFIX}/verify-payment`, params);

    return unwrapResponse(response);
  },

  /**
   * Get payment by ID (Authenticated)
   * Retrieve payment transaction details by ID
   */
  getPaymentById: async (id: number): Promise<PaymentTransactionResponse> => {
    const response = await axiosClient.get<
      ApiResponse<PaymentTransactionResponse>
    >(`${PAYMENT_PREFIX}/${id}`);

    return unwrapResponse(response);
  },

  /**
   * Get all payments (Admin only)
   * Get all payment transactions with filters
   */
  getAllPayments: async (
    status?: PaymentStatus,
    studentId?: number,
    courseId?: number,
    page?: number,
    size?: number,
  ): Promise<PageResponse<PaymentTransactionResponse>> => {
    const response = await axiosClient.get<
      ApiResponse<PageResponse<PaymentTransactionResponse>>
    >(PAYMENT_PREFIX, {
      params: { status, studentId, courseId, page, size },
    });

    return unwrapResponse(response);
  },

  /**
   * Get my payment history (Student only)
   * Get payment history for current student
   */
  getMyPaymentHistory: async (): Promise<PaymentTransactionResponse[]> => {
    const response = await axiosClient.get<
      ApiResponse<PaymentTransactionResponse[]>
    >(`${PAYMENT_PREFIX}/my-history`);

    return unwrapResponse(response);
  },

  /**
   * Refund payment (Admin only)
   * Process payment refund
   */
  refundPayment: async (
    id: number,
    payload: RefundRequest,
  ): Promise<PaymentTransactionResponse> => {
    const response = await axiosClient.post<
      ApiResponse<PaymentTransactionResponse>
    >(`${PAYMENT_PREFIX}/${id}/refund`, payload);

    return unwrapResponse(response);
  },

  /**
   * Get student payment history (Admin only)
   * Get payment history for a specific student
   */
  getStudentPaymentHistory: async (
    studentId: number,
  ): Promise<PaymentTransactionResponse[]> => {
    const response = await axiosClient.get<
      ApiResponse<PaymentTransactionResponse[]>
    >(`${PAYMENT_PREFIX}/students/${studentId}/payment-history`);

    return unwrapResponse(response);
  },

  /**
   * Get course payment statistics (Teacher or Admin)
   * Get payment statistics for a specific course
   */
  getCoursePaymentStats: async (
    courseId: number,
  ): Promise<CoursePaymentStatsResponse> => {
    const response = await axiosClient.get<
      ApiResponse<CoursePaymentStatsResponse>
    >(`${PAYMENT_PREFIX}/courses/${courseId}/payment-stats`);

    return unwrapResponse(response);
  },

  /**
   * Query ZaloPay order status (Authenticated)
   * Check the status of a ZaloPay payment transaction
   */
  queryZaloPayOrderStatus: async (appTransId: string): Promise<any> => {
    const response = await axiosClient.get<ApiResponse<any>>(
      `${PAYMENT_PREFIX}/zalopay/query-order/${appTransId}`,
    );

    return unwrapResponse(response);
  },

  /**
   * Query ZaloPay refund status (Admin only)
   * Check the status of a ZaloPay refund transaction
   */
  queryZaloPayRefundStatus: async (mRefundId: string): Promise<any> => {
    const response = await axiosClient.get<ApiResponse<any>>(
      `${PAYMENT_PREFIX}/zalopay/query-refund/${mRefundId}`,
    );

    return unwrapResponse(response);
  },

  /**
   * Retry enrollment (Admin only)
   * Manually retry enrollment after successful payment
   */
  retryEnrollment: async (paymentId: number): Promise<any> => {
    const response = await axiosClient.post<ApiResponse<any>>(
      `${PAYMENT_PREFIX}/${paymentId}/retry-enrollment`,
    );

    return unwrapResponse(response);
  },

  /**
   * Check enrollment status (Admin only)
   * Check if enrollment is pending for a payment
   */
  checkEnrollmentStatus: async (paymentId: number): Promise<any> => {
    const response = await axiosClient.get<ApiResponse<any>>(
      `${PAYMENT_PREFIX}/${paymentId}/enrollment-status`,
    );

    return unwrapResponse(response);
  },
};
