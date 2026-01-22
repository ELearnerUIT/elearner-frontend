/**
 * Certificate Hooks
 * React Query hooks for certificate operations
 */

'use client';

import { useMutation, useQuery, useQueryClient, type UseMutationOptions, type UseQueryOptions } from '@tanstack/react-query';
import * as certificateApi from '@/lib/api/certificate.api';
import { queryKeys } from './query-keys';
import type {
  Certificate,
  CertificateSearchParams,
  PageResponse,
  PaginationParams,
  VerifyCertificateResponse,
  GenerateCertificateRequest,
} from '@/types';

/**
 * Get my certificates
 */
export function useMyCertificates(params?: PaginationParams, options?: UseQueryOptions<PageResponse<Certificate>>) {
  return useQuery({
    queryKey: queryKeys.certificates.my(params),
    queryFn: () => certificateApi.getMyCertificates(params),
    ...options,
  });
}

/**
 * Get single certificate
 */
export function useCertificate(id: number, options?: UseQueryOptions<Certificate>) {
  return useQuery({
    queryKey: queryKeys.certificates.detail(id),
    queryFn: () => certificateApi.getCertificateById(id),
    enabled: Boolean(id),
    ...options,
  });
}

/**
 * Verify certificate
 */
export function useVerifyCertificate(code: string, options?: UseQueryOptions<VerifyCertificateResponse>) {
  return useQuery({
    queryKey: queryKeys.certificates.verify(code),
    queryFn: () => certificateApi.verifyCertificate(code),
    enabled: Boolean(code),
    ...options,
  });
}

/**
 * Download certificate PDF
 */
export function useDownloadCertificate(options?: UseMutationOptions<Blob, Error, number>) {
  return useMutation({
    mutationFn: (id: number) => certificateApi.downloadCertificate(id),
    ...options,
  });
}

/**
 * Generate certificate (request certificate)
 */
export function useGenerateCertificate(options?: UseMutationOptions<Certificate, Error, GenerateCertificateRequest>) {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: GenerateCertificateRequest) => certificateApi.generateCertificate(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.certificates.my() });
      queryClient.invalidateQueries({ queryKey: queryKeys.students.myStats });
    },
    ...options,
  });
}
