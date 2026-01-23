import { axiosClient } from "@/lib/api/axios";
import { unwrapResponse } from "@/lib/api/unwrap";
import { ApiResponse, PageResponse } from "@/lib/api/api.types";
import {
  CreatePayoutRequest,
  CompletePayoutRequest,
  RejectPayoutRequest,
  PayoutResponse,
  PayoutStatus,
} from "./billing.types";

const PAYOUT_PREFIX = "/payouts";
const ADMIN_PAYOUT_PREFIX = "/admin/payouts";

export const payoutService = {
  /**
   * Create payout request (Teacher only)
   * Teacher creates a new payout request
   */
  createPayoutRequest: async (
    payload: CreatePayoutRequest,
  ): Promise<PayoutResponse> => {
    const response = await axiosClient.post<ApiResponse<PayoutResponse>>(
      PAYOUT_PREFIX,
      payload,
    );

    return unwrapResponse(response);
  },

  /**
   * Get payout by ID (Teacher or Admin)
   * Get payout request details by ID
   */
  getPayoutById: async (id: number): Promise<PayoutResponse> => {
    const response = await axiosClient.get<ApiResponse<PayoutResponse>>(
      `${PAYOUT_PREFIX}/${id}`,
    );

    return unwrapResponse(response);
  },

  /**
   * Get payouts (Teacher or Admin)
   * Get payouts with filters
   */
  getPayouts: async (
    status?: PayoutStatus,
    teacherId?: number,
    page?: number,
    size?: number,
  ): Promise<PageResponse<PayoutResponse>> => {
    const response = await axiosClient.get<
      ApiResponse<PageResponse<PayoutResponse>>
    >(PAYOUT_PREFIX, {
      params: { status, teacherId, page, size },
    });

    return unwrapResponse(response);
  },

  /**
   * Get all payouts (Admin only)
   * Get all payout requests with filters
   */
  getAllPayouts: async (
    status?: PayoutStatus,
    teacherId?: number,
    page?: number,
    size?: number,
  ): Promise<PageResponse<PayoutResponse>> => {
    const response = await axiosClient.get<
      ApiResponse<PageResponse<PayoutResponse>>
    >(ADMIN_PAYOUT_PREFIX, {
      params: { status, teacherId, page, size },
    });

    return unwrapResponse(response);
  },

  /**
   * Get my payouts (Teacher only)
   * Get payout requests for current teacher
   */
  getMyPayouts: async (): Promise<PayoutResponse[]> => {
    const response = await axiosClient.get<ApiResponse<PayoutResponse[]>>(
      `${PAYOUT_PREFIX}/my-payouts`,
    );

    return unwrapResponse(response);
  },

  /**
   * Get teacher payouts (Admin only)
   * Get payout requests for a specific teacher
   */
  getTeacherPayouts: async (teacherId: number): Promise<PayoutResponse[]> => {
    const response = await axiosClient.get<ApiResponse<PayoutResponse[]>>(
      `${ADMIN_PAYOUT_PREFIX}/teachers/${teacherId}`,
    );

    return unwrapResponse(response);
  },

  /**
   * Complete payout (Admin only)
   * Mark payout request as completed
   */
  completePayout: async (
    id: number,
    payload: CompletePayoutRequest,
  ): Promise<PayoutResponse> => {
    const response = await axiosClient.post<ApiResponse<PayoutResponse>>(
      `${ADMIN_PAYOUT_PREFIX}/${id}/complete`,
      payload,
    );

    return unwrapResponse(response);
  },

  /**
   * Reject payout (Admin only)
   * Reject payout request
   */
  rejectPayout: async (
    id: number,
    payload: RejectPayoutRequest,
  ): Promise<PayoutResponse> => {
    const response = await axiosClient.post<ApiResponse<PayoutResponse>>(
      `${ADMIN_PAYOUT_PREFIX}/${id}/reject`,
      payload,
    );

    return unwrapResponse(response);
  },

  /**
   * Get pending payouts count (Admin only)
   * Get count of pending payout requests
   */
  getPendingPayoutsCount: async (): Promise<number> => {
    const response = await axiosClient.get<ApiResponse<number>>(
      `${ADMIN_PAYOUT_PREFIX}/pending/count`,
    );

    return unwrapResponse(response);
  },

  /**
   * Get my available payout amount (Teacher only)
   * Get available amount for payout request
   */
  getMyAvailablePayoutAmount: async (): Promise<number> => {
    const response = await axiosClient.get<ApiResponse<number>>(
      `${PAYOUT_PREFIX}/available-amount`,
    );

    return unwrapResponse(response);
  },
};
