/**
 * Certificate Service
 * Handles certificate operations
 * Matches backend CertificateController.java and PublicCertificateController.java
 */

import {axiosClient} from "@/lib/api/axios";
import {  unwrapResponse } from "@/lib/api/unwrap";
import { ApiResponse } from "@/lib/api/api.types";
import {
  CertificateResponse,
  CertificateDetailResponse,
  CertificateVerificationResponse,
  PaginatedCertificates,
} from "./certificate.types";

const certificateService = {
  // ===========================
  // Student/Authenticated APIs
  // ===========================

  /**
   * GET /students/{studentId}/certificates - Get student's certificates
   */
  getStudentCertificates: async (
    studentId: number,
    page: number = 0,
    size: number = 20,
  ): Promise<PaginatedCertificates> => {
    const response = await axiosClient.get<ApiResponse<PaginatedCertificates>>(
      `/students/${studentId}/certificates`,
      {
        params: { page, size },
      },
    );
    return unwrapResponse(response);
  },

  /**
   * GET /certificates/{id} - Get certificate details
   */
  getCertificateDetail: async (
    id: number,
  ): Promise<CertificateDetailResponse> => {
    const response = await axiosClient.get<
      ApiResponse<CertificateDetailResponse>
    >(`/certificates/${id}`);
    return unwrapResponse(response);
  },

  /**
   * POST /certificates/{id}/download - Download certificate as PDF
   */
  downloadCertificate: async (id: number): Promise<Blob> => {
    const response = await axiosClient.post(
      `/certificates/${id}/download`,
      {},
      {
        responseType: "blob",
      },
    );
    return response.data;
  },

  // ===========================
  // Public APIs
  // ===========================

  /**
   * GET /certificates/verify?code={code} - Verify certificate by code (CertificateController)
   */
  verifyCertificateByCode: async (
    code: string,
  ): Promise<CertificateVerificationResponse> => {
    const response = await axiosClient.get<
      ApiResponse<CertificateVerificationResponse>
    >(`/certificates/verify`, {
      params: { code },
    });
    return unwrapResponse(response);
  },

  /**
   * GET /public/certificates/verify?code={code} - Public verify certificate (PublicCertificateController)
   */
  verifyCertificatePublic: async (
    code: string,
  ): Promise<CertificateVerificationResponse> => {
    const response = await axiosClient.get<
      ApiResponse<CertificateVerificationResponse>
    >(`/public/certificates/verify`, {
      params: { code },
    });
    return unwrapResponse(response);
  },

  // ===========================
  // Teacher APIs
  // ===========================

  /**
   * GET /courses/{courseId}/certificates - Get certificates for a course
   */
  getCourseCertificates: async (
    courseId: number,
    page: number = 0,
    size: number = 20,
  ): Promise<PaginatedCertificates> => {
    const response = await axiosClient.get<ApiResponse<PaginatedCertificates>>(
      `/courses/${courseId}/certificates`,
      {
        params: { page, size },
      },
    );
    return unwrapResponse(response);
  },
};

export default certificateService;
