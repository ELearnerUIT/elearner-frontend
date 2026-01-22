import { Gender, TeacherApprovalStatus } from '../shared/common.types';

/**
 * Teacher response DTO
 * GET /api/v1/teachers/{id}
 */
export interface TeacherResponse {
  id: number;
  accountId: number;
  teacherCode: string;
  fullName: string;
  email: string;
  avatarUrl: string;
  birthDate: string | null;
  phone: string | null;
  bio: string | null;
  gender: Gender | null;
  specialty: string | null;
  degree: string | null;
  approvalStatus: TeacherApprovalStatus;
  approvedAt: string | null;
  approvedBy: string | null;
  rejectionReason: string | null;
  totalCourses: number;
  totalStudents: number;
  averageRating: number;
  totalReviews: number;
  totalRevenue: number;
  createdAt: string;
  updatedAt: string;
}

/**
 * Update teacher request DTO
 * PUT /api/v1/teachers/{id}
 */
export interface UpdateTeacherRequest {
  fullName?: string;
  birthDate?: string;
  phone?: string;
  bio?: string;
  gender?: Gender;
  specialty?: string;
  degree?: string;
}

/**
 * Teacher approval request DTO
 * POST /api/v1/teachers/{id}/approve
 */
export interface TeacherApprovalRequest {
  note?: string;
}

/**
 * Teacher rejection request DTO
 * POST /api/v1/teachers/{id}/reject
 */
export interface TeacherRejectionRequest {
  reason: string;
}

/**
 * Teacher public profile response DTO
 * GET /api/v1/public/teachers/{id}/profile
 */
export interface TeacherPublicProfileResponse {
  id: number;
  fullName: string;
  avatarUrl: string;
  bio: string | null;
  specialty: string | null;
  degree: string | null;
  totalCourses: number;
  totalStudents: number;
  averageRating: number;
  totalReviews: number;
  joinedDate: string;
  courses: TeacherPublicCourse[];
}

/**
 * Teacher's public course information
 */
export interface TeacherPublicCourse {
  id: number;
  title: string;
  slug: string;
  thumbnailUrl: string;
  shortDescription: string;
  difficulty: string;
  totalStudents: number;
  averageRating: number;
  price: number;
  publishedAt: string;
}

/**
 * Teacher statistics response
 */
export interface TeacherStatsResponse {
  totalCourses: number;
  publishedCourses: number;
  draftCourses: number;
  totalStudents: number;
  activeStudents: number;
  totalRevenue: number;
  monthlyRevenue: number;
  averageRating: number;
  totalReviews: number;
  totalQuestionsAnswered: number;
  responseRate: number;
}
