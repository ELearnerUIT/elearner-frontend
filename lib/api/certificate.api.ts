/**
 * Certificate API
 * Course completion certificates
 */

import { apiClient } from './client';
import type {
  CertificateResponse,
  GenerateCertificateRequest,
  VerifyCertificateResponse,
  DownloadCertificateParams,
  StudentCertificatesQueryParams,
  PageResponse,
} from '@/types';

/**
 * Get my certificates (student)
 * GET /students/me/certificates
 */
export async function getMyCertificates(
  params?: StudentCertificatesQueryParams
): Promise<PageResponse<CertificateResponse>> {
  const response = await apiClient.get<PageResponse<CertificateResponse>>('/students/me/certificates', { params });
  return response.data;
}

/**
 * Get certificate by ID (student)
 * GET /certificates/{id}
 */
export async function getCertificateById(id: number): Promise<CertificateResponse> {
  const response = await apiClient.get<CertificateResponse>(`/certificates/${id}`);
  return response.data;
}

/**
 * Generate certificate (student)
 * POST /certificates/generate
 */
export async function generateCertificate(data: GenerateCertificateRequest): Promise<CertificateResponse> {
  const response = await apiClient.post<CertificateResponse>('/certificates/generate', data);
  return response.data;
}

/**
 * Verify certificate (public)
 * GET /certificates/verify/{certificateCode}
 */
export async function verifyCertificate(certificateCode: string): Promise<VerifyCertificateResponse> {
  const response = await apiClient.get<VerifyCertificateResponse>(`/certificates/verify/${certificateCode}`);
  return response.data;
}

/**
 * Download certificate (student)
 * GET /certificates/{id}/download
 */
export async function downloadCertificate(id: number, params?: DownloadCertificateParams): Promise<Blob> {
  const response = await apiClient.get<Blob>(`/certificates/${id}/download`, {
    params,
    responseType: 'blob',
  });
  return response.data;
}

/**
 * Get course certificates (teacher/admin)
 * GET /courses/{courseId}/certificates
 */
export async function getCourseCertificates(
  courseId: number,
  params?: StudentCertificatesQueryParams
): Promise<PageResponse<CertificateResponse>> {
  const response = await apiClient.get<PageResponse<CertificateResponse>>(`/courses/${courseId}/certificates`, { params });
  return response.data;
}
