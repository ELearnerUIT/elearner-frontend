import { axiosClient } from "@/lib/api/axios";
import { unwrapResponse } from "@/lib/api/unwrap";
import { ApiResponse, PageResponse } from "@/lib/api/api.types";
import {
  TeacherRevenueResponse,
  RevenueBreakdownResponse,
  MonthlyRevenueResponse,
  PaymentTransactionResponse,
} from "./billing.types";

const REVENUE_PREFIX = "/revenue";

export const revenueService = {
  /**
   * Get teacher revenue (Admin only)
   * Get revenue for a specific teacher
   */
  getTeacherRevenue: async (
    teacherId: number,
  ): Promise<TeacherRevenueResponse> => {
    const response = await axiosClient.get<ApiResponse<TeacherRevenueResponse>>(
      `${REVENUE_PREFIX}/teachers/${teacherId}`,
    );

    return unwrapResponse(response);
  },

  /**
   * Get my revenue (Teacher only)
   * Get revenue for current teacher
   */
  getMyRevenue: async (): Promise<TeacherRevenueResponse> => {
    const response = await axiosClient.get<ApiResponse<TeacherRevenueResponse>>(
      `${REVENUE_PREFIX}/my-revenue`,
    );

    return unwrapResponse(response);
  },

  /**
   * Get revenue breakdown (Admin only)
   * Get revenue breakdown by courses for a specific teacher
   */
  getRevenueBreakdown: async (
    teacherId: number,
  ): Promise<RevenueBreakdownResponse> => {
    const response = await axiosClient.get<
      ApiResponse<RevenueBreakdownResponse>
    >(`${REVENUE_PREFIX}/teachers/${teacherId}/breakdown`);

    return unwrapResponse(response);
  },

  /**
   * Get my revenue breakdown (Teacher only)
   * Get revenue breakdown by courses for current teacher
   */
  getMyRevenueBreakdown: async (): Promise<RevenueBreakdownResponse> => {
    const response = await axiosClient.get<
      ApiResponse<RevenueBreakdownResponse>
    >(`${REVENUE_PREFIX}/my-revenue/breakdown`);

    return unwrapResponse(response);
  },

  /**
   * Get monthly revenue (Admin only)
   * Get monthly revenue for a specific teacher
   */
  getMonthlyRevenue: async (
    teacherId: number,
    month: string,
  ): Promise<MonthlyRevenueResponse> => {
    const response = await axiosClient.get<ApiResponse<MonthlyRevenueResponse>>(
      `${REVENUE_PREFIX}/teachers/${teacherId}/monthly`,
      {
        params: { month },
      },
    );

    return unwrapResponse(response);
  },

  /**
   * Get my monthly revenue (Teacher only)
   * Get monthly revenue for current teacher
   * @param month - Format: YYYY-MM (e.g., "2024-01")
   */
  getMyMonthlyRevenue: async (
    month: string,
  ): Promise<MonthlyRevenueResponse> => {
    const response = await axiosClient.get<ApiResponse<MonthlyRevenueResponse>>(
      `${REVENUE_PREFIX}/my-revenue/monthly`,
      {
        params: { month },
      },
    );

    return unwrapResponse(response);
  },

  /**
   * Get teacher payment transactions (Admin only)
   * Get payment transactions for a specific teacher
   */
  getTeacherPaymentTransactions: async (
    teacherId: number,
    page?: number,
    size?: number,
  ): Promise<PageResponse<PaymentTransactionResponse>> => {
    const response = await axiosClient.get<
      ApiResponse<PageResponse<PaymentTransactionResponse>>
    >(`${REVENUE_PREFIX}/teachers/${teacherId}/payment-transactions`, {
      params: { page, size },
    });

    return unwrapResponse(response);
  },

  /**
   * Get my payment transactions (Teacher only)
   * Get payment transactions for current teacher
   */
  getMyPaymentTransactions: async (
    page?: number,
    size?: number,
  ): Promise<PageResponse<PaymentTransactionResponse>> => {
    const response = await axiosClient.get<
      ApiResponse<PageResponse<PaymentTransactionResponse>>
    >(`${REVENUE_PREFIX}/my-revenue/payment-transactions`, {
      params: { page, size },
    });

    return unwrapResponse(response);
  },
};
