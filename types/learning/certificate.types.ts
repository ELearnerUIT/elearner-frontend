/**
 * Certificate response DTO
 */
export interface CertificateResponse {
  id: number;
  enrollmentId: number;
  studentId: number;
  studentName: string;
  courseId: number;
  courseName: string;
  teacherId: number;
  teacherName: string;
  certificateCode: string;
  issuedAt: string;
  expiresAt: string | null;
  certificateUrl: string;
  certificatePdfUrl: string;
  isVerified: boolean;
  completionPercentage: number;
  totalLessonsCompleted: number;
  totalLessons: number;
  courseDurationHours: number;
}

/**
 * Generate certificate request DTO
 * POST /api/v1/certificates/generate
 */
export interface GenerateCertificateRequest {
  enrollmentId: number;
}

/**
 * Verify certificate request DTO
 * GET /api/v1/certificates/verify/{certificateCode}
 */
export interface VerifyCertificateResponse {
  isValid: boolean;
  certificate: CertificateResponse | null;
  message: string;
}

/**
 * Download certificate parameters
 * GET /api/v1/certificates/{id}/download
 */
export interface DownloadCertificateParams {
  format?: 'pdf' | 'image';
}

/**
 * Student certificates query parameters
 */
export interface StudentCertificatesQueryParams {
  search?: string;
  page?: number;
  size?: number;
  sortBy?: string;
  sortDirection?: 'ASC' | 'DESC';
}
