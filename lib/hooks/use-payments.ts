/**
 * Payment Hooks
 * React Query hooks for payment operations
 */

'use client';

import { useMutation, useQuery, useQueryClient, type UseMutationOptions, type UseQueryOptions } from '@tanstack/react-query';
import * as paymentApi from '@/lib/api/payment.api';
import { queryKeys } from './query-keys';
import type {
  CreatePaymentRequest,
  PageResponse,
  Payment,
  PaymentSearchParams,
  PaymentStatsResponse,
  PaginationParams,
  RefundPaymentRequest,
  PaymentIntentResponse,
} from '@/types';

/**
 * Get my payments
 */
export function useMyPayments(params?: PaginationParams, options?: UseQueryOptions<PageResponse<Payment>>) {
  return useQuery({
    queryKey: queryKeys.payments.my(params),
    queryFn: () => paymentApi.getMyPayments(params),
    ...options,
  });
}

/**
 * Get single payment
 */
export function usePayment(id: number, options?: UseQueryOptions<Payment>) {
  return useQuery({
    queryKey: queryKeys.payments.detail(id),
    queryFn: () => paymentApi.getPaymentById(id),
    enabled: Boolean(id),
    ...options,
  });
}

/**
 * Get all payments (admin)
 */
export function useAllPayments(params?: PaymentSearchParams, options?: UseQueryOptions<PageResponse<Payment>>) {
  return useQuery({
    queryKey: queryKeys.payments.all(params),
    queryFn: () => paymentApi.getAllPayments(params),
    ...options,
  });
}

/**
 * Get payment stats
 */
export function usePaymentStats(params?: PaymentSearchParams, options?: UseQueryOptions<PaymentStatsResponse>) {
  return useQuery({
    queryKey: queryKeys.payments.stats(params),
    queryFn: () => paymentApi.getPaymentStats(params),
    ...options,
  });
}

/**
 * Create payment intent
 */
export function useCreatePaymentIntent(options?: UseMutationOptions<PaymentIntentResponse, Error, CreatePaymentRequest>) {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: CreatePaymentRequest) => paymentApi.createPaymentIntent(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.payments.my() });
      queryClient.invalidateQueries({ queryKey: queryKeys.enrollments.my() });
    },
    ...options,
  });
}

/**
 * Refund payment
 */
export function useRefundPayment(options?: UseMutationOptions<Payment, Error, { id: number; data: RefundPaymentRequest }>) {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }) => paymentApi.refundPayment(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.payments.detail(variables.id) });
      queryClient.invalidateQueries({ queryKey: queryKeys.payments.my() });
      queryClient.invalidateQueries({ queryKey: queryKeys.payments.all() });
      queryClient.invalidateQueries({ queryKey: queryKeys.payments.stats() });
    },
    ...options,
  });
}
