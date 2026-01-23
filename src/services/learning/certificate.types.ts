/**
 * Certificate Types
 * Matches backend CertificateController.java
 */

// ===========================
// Response DTOs
// ===========================

export interface CertificateResponse {
  id: number;
  code: string;
  studentId: number;
  studentName: string;
  courseId: number;
  courseName: string;
  issuedDate: string; // LocalDate
  expiryDate?: string; // LocalDate
  certificateUrl?: string;
}

export interface CertificateDetailResponse {
  id: number;
  code: string;
  studentId: number;
  studentName: string;
  studentEmail: string;
  courseId: number;
  courseName: string;
  courseDescription?: string;
  instructorName: string;
  completionDate: string; // LocalDate
  issuedDate: string; // LocalDate
  expiryDate?: string; // LocalDate
  certificateUrl?: string;
  grade?: string;
  totalScore?: number;
}

export interface CertificateVerificationResponse {
  valid: boolean;
  certificateId?: number;
  code: string;
  studentName?: string;
  courseName?: string;
  issuedDate?: string; // LocalDate
  expiryDate?: string; // LocalDate
  message?: string;
}

export interface PaginatedCertificates {
  content: CertificateResponse[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}
