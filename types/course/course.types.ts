import { Difficulty } from '../shared/common.types';
import { PaginationParams } from '../shared/api.types';

/**
 * Course response DTO (list view)
 */
export interface CourseResponse {
  id: number;
  title: string;
  slug: string;
  shortDescription: string;
  thumbnailUrl: string | null;
  difficulty: Difficulty;
  isClosed: boolean;
  categoryId: number;
  categoryName: string;
  teacherId: number;
  teacherName: string;
  teacherAvatarUrl: string;
  totalStudents: number;
  averageRating: number;
  totalReviews: number;
  price: number | null;
  hasPublishedVersion: boolean;
  createdAt: string;
  updatedAt: string;
}

/**
 * Course detail response DTO
 * GET /api/v1/courses/{slug}
 */
export interface CourseDetailResponse {
  id: number;
  title: string;
  slug: string;
  shortDescription: string;
  thumbnailUrl: string | null;
  difficulty: Difficulty;
  isClosed: boolean;
  metaTitle: string | null;
  metaDescription: string | null;
  seoKeywords: string | null;
  isIndexed: boolean;
  category: CourseCategoryInfo;
  tags: CourseTagInfo[];
  teacher: CourseTeacherInfo;
  versions: CourseVersionInfo[];
  publishedVersion: CourseVersionInfo | null;
  totalStudents: number;
  averageRating: number;
  totalReviews: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

/**
 * Category information in course
 */
export interface CourseCategoryInfo {
  id: number;
  name: string;
  slug: string;
  code: string | null;
}

/**
 * Tag information in course
 */
export interface CourseTagInfo {
  id: number;
  name: string;
  slug: string;
}

/**
 * Teacher information in course
 */
export interface CourseTeacherInfo {
  id: number;
  fullName: string;
  avatarUrl: string;
  specialty: string | null;
  totalCourses: number;
  totalStudents: number;
  averageRating: number;
}

/**
 * Version information in course
 */
export interface CourseVersionInfo {
  id: number;
  versionNumber: number;
  title: string;
  status: string;
  price: number;
  publishedAt: string | null;
}

/**
 * Create course request DTO
 * POST /api/v1/teacher/courses
 */
export interface CreateCourseRequest {
  title: string;
  shortDescription: string;
  categoryId: number;
  tags?: string[];
  isClosed?: boolean;
  difficulty: Difficulty;
  metaTitle?: string;
  metaDescription?: string;
  seoKeywords?: string;
  thumbnailUrl?: string;
  isIndexed?: boolean;
}

/**
 * Update course request DTO
 * PUT /api/v1/teacher/courses/{id}
 */
export interface UpdateCourseRequest {
  title?: string;
  shortDescription?: string;
  categoryId?: number;
  tags?: string[];
  isClosed?: boolean;
  difficulty?: Difficulty;
  metaTitle?: string;
  metaDescription?: string;
  seoKeywords?: string;
  thumbnailUrl?: string;
  isIndexed?: boolean;
}

/**
 * Course query parameters
 * GET /api/v1/courses
 */
export interface CourseQueryParams extends PaginationParams {
  categoryId?: number;
  difficulty?: Difficulty;
  tags?: string;
  minRating?: number;
  maxPrice?: number;
  search?: string;
}

/**
 * Course search parameters (public)
 * GET /api/v1/public/courses/search
 */
export interface CourseSearchParams extends PaginationParams {
  query?: string;
  categoryId?: number;
  difficulty?: Difficulty;
  tags?: string;
  minRating?: number;
  maxPrice?: number;
  minPrice?: number;
}

/**
 * Course statistics response
 * GET /api/v1/teacher/courses/{id}/stats
 */
export interface CourseStatsResponse {
  courseId: number;
  courseTitle: string;
  totalEnrollments: number;
  activeEnrollments: number;
  completedEnrollments: number;
  averageProgress: number;
  totalRevenue: number;
  averageRating: number;
  totalReviews: number;
  totalQuestions: number;
  answeredQuestions: number;
  totalChapters: number;
  totalLessons: number;
  totalVideoDuration: number;
  totalResources: number;
  viewsByMonth: MonthlyViewData[];
  enrollmentsByMonth: MonthlyEnrollmentData[];
  revenueByMonth: MonthlyRevenueData[];
}

/**
 * Monthly view data
 */
export interface MonthlyViewData {
  month: string;
  views: number;
}

/**
 * Monthly enrollment data
 */
export interface MonthlyEnrollmentData {
  month: string;
  enrollments: number;
}

/**
 * Monthly revenue data
 */
export interface MonthlyRevenueData {
  month: string;
  revenue: number;
}

/**
 * Upload thumbnail response
 * POST /api/v1/teacher/courses/{id}/thumbnail
 */
export interface UploadThumbnailResponse {
  thumbnailUrl: string;
}

/**
 * Clone course parameters
 * POST /api/v1/teacher/courses/{id}/clone
 */
export interface CloneCourseParams {
  newTitle?: string;
}
