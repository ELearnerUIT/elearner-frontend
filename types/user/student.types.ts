import { Gender } from '../shared/common.types';

/**
 * Student response DTO
 * GET /api/v1/students/{id}
 */
export interface StudentResponse {
  id: number;
  accountId: number;
  studentCode: string;
  fullName: string;
  email: string;
  avatarUrl: string;
  birthDate: string | null;
  phone: string | null;
  bio: string | null;
  gender: Gender | null;
  enrollmentDate: string;
  totalCoursesEnrolled: number;
  completedCourses: number;
  certificatesEarned: number;
  createdAt: string;
  updatedAt: string;
}

/**
 * Update student request DTO
 * PUT /api/v1/students/{id}
 */
export interface UpdateStudentRequest {
  fullName?: string;
  birthDate?: string;
  phone?: string;
  bio?: string;
  gender?: Gender;
}

/**
 * Student course response (simplified)
 */
export interface StudentCourseResponse {
  id: number;
  courseId: number;
  courseTitle: string;
  courseThumbnail: string;
  enrolledAt: string;
  progressPercent: number;
  lastAccessedAt: string | null;
  completedAt: string | null;
  certificateId: number | null;
}

/**
 * Student statistics response
 */
export interface StudentStatsResponse {
  totalEnrolled: number;
  activeEnrolled: number;
  completedCourses: number;
  inProgressCourses: number;
  totalLearningHours: number;
  certificatesEarned: number;
  averageProgress: number;
}
