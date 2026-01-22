/**
 * Payment API Service
 * Handles payment processing operations
 */

import { apiInstance } from "../client";
import { unwrapResponse } from "../types";
import type {
  CreatePaymentRequest,
  PaymentUrlResponse,
  PaymentTransactionResponse,
  PageResponsePaymentTransactionResponse,
} from "../generated/data-contracts";

class PaymentApiService {
  /**
   * Create payment for course
   */
  async create(data: CreatePaymentRequest): Promise<PaymentUrlResponse> {
    const response = await apiInstance.createPayment(data);
    return unwrapResponse<PaymentUrlResponse>(response);
  }

  /**
   * Get payment transaction by ID
   */
  async getById(transactionId: number): Promise<PaymentTransactionResponse> {
    const response = await apiInstance.getPaymentById(transactionId);
    return unwrapResponse<PaymentTransactionResponse>(response);
  }

  /**
   * Get all payment transactions (Admin only)
   */
  async getAll(params?: {
    page?: number;
    size?: number;
    status?: "PENDING" | "PROCESSING" | "SUCCESS" | "FAILED" | "CANCELLED";
    studentId?: number;
  }): Promise<PageResponsePaymentTransactionResponse> {
    const response = await apiInstance.getAllPayments(params as any);
    return unwrapResponse<PageResponsePaymentTransactionResponse>(response);
  }

  /**
   * Unified payment callback (handles VNPay, ZaloPay, MoMo)
   */
  async handlePaymentCallback(params: Record<string, string>): Promise<void> {
    await apiInstance.unifiedPaymentCallback(params);
  }
}

export const paymentApi = new PaymentApiService();
