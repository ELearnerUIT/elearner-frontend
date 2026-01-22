import { EnrollmentStatus } from '../shared/common.types';

/**
 * Enrollment response DTO
 */
export interface EnrollmentResponse {
  id: number;
  studentId: number;
  courseId: number;
  courseName: string;
  courseImageUrl: string | null;
  coursePrice: number;
  teacherName: string;
  status: EnrollmentStatus;
  enrolledAt: string;
  completedAt: string | null;
  expiresAt: string | null;
  lastAccessedAt: string | null;
  progressPercentage: number;
  completedLessons: number;
  totalLessons: number;
  totalDurationSeconds: number;
  completedDurationSeconds: number;
}

/**
 * Enroll in course request DTO
 * POST /api/v1/enrollments
 */
export interface EnrollCourseRequest {
  courseId: number;
  paymentId?: number;
}

/**
 * Enrollment query parameters
 */
export interface EnrollmentQueryParams {
  status?: EnrollmentStatus;
  search?: string;
  page?: number;
  size?: number;
  sortBy?: string;
  sortDirection?: 'ASC' | 'DESC';
}

/**
 * Student progress summary
 * GET /api/v1/students/me/enrollments/{enrollmentId}
 */
export interface StudentProgressSummaryResponse {
  enrollmentId: number;
  courseId: number;
  courseName: string;
  teacherName: string;
  progressPercentage: number;
  completedLessons: number;
  totalLessons: number;
  totalDurationSeconds: number;
  completedDurationSeconds: number;
  enrolledAt: string;
  lastAccessedAt: string | null;
  completedAt: string | null;
  chapters: ChapterProgressInfo[];
}

/**
 * Chapter progress info
 */
export interface ChapterProgressInfo {
  chapterId: number;
  chapterTitle: string;
  orderIndex: number;
  totalLessons: number;
  completedLessons: number;
  lessons: LessonProgressInfo[];
}

/**
 * Lesson progress info
 */
export interface LessonProgressInfo {
  lessonId: number;
  lessonTitle: string;
  lessonType: string;
  orderIndex: number;
  durationSeconds: number | null;
  isCompleted: boolean;
  completedAt: string | null;
  watchedSeconds: number | null;
}
