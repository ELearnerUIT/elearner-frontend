/**
 * Course preview response DTO
 * GET /api/v1/public/courses/{slug}/preview
 */
export interface CoursePreviewResponse {
  id: number;
  title: string;
  slug: string;
  shortDescription: string;
  thumbnailUrl: string | null;
  difficulty: string;
  category: PreviewCategoryInfo;
  tags: PreviewTagInfo[];
  teacher: PreviewTeacherInfo;
  publishedVersion: PreviewVersionInfo;
  chapters: PreviewChapterInfo[];
  totalStudents: number;
  averageRating: number;
  totalReviews: number;
  lastUpdated: string;
}

/**
 * Category info in preview
 */
export interface PreviewCategoryInfo {
  id: number;
  name: string;
  slug: string;
}

/**
 * Tag info in preview
 */
export interface PreviewTagInfo {
  id: number;
  name: string;
  slug: string;
}

/**
 * Teacher info in preview
 */
export interface PreviewTeacherInfo {
  id: number;
  fullName: string;
  avatarUrl: string;
  bio: string | null;
  specialty: string | null;
  totalCourses: number;
  totalStudents: number;
  averageRating: number;
}

/**
 * Version info in preview
 */
export interface PreviewVersionInfo {
  id: number;
  versionNumber: number;
  title: string;
  description: string;
  price: number;
  durationDays: number;
  totalChapters: number;
  totalLessons: number;
  totalVideoDuration: number;
  publishedAt: string;
}

/**
 * Chapter info in preview
 */
export interface PreviewChapterInfo {
  id: number;
  title: string;
  orderIndex: number;
  lessons: PreviewLessonInfo[];
}

/**
 * Lesson info in preview
 */
export interface PreviewLessonInfo {
  id: number;
  type: string;
  title: string;
  shortDescription: string;
  orderIndex: number;
  durationSeconds: number | null;
  isPreview: boolean;
}

/**
 * Preview lesson stream URL response
 * GET /api/v1/public/lessons/{lessonId}/preview/stream-url
 */
export interface PreviewStreamUrlResponse {
  streamUrl: string;
  expiresAt: string;
}

/**
 * Check if course is published response
 * GET /api/v1/public/courses/{slug}/is-published
 */
export interface CoursePublishedResponse {
  isPublished: boolean;
  publishedAt: string | null;
}

/**
 * Related courses parameters
 * GET /api/v1/public/courses/{courseId}/related
 */
export interface RelatedCoursesParams {
  limit?: number;
}

/**
 * Popular courses parameters
 * GET /api/v1/public/courses/popular
 */
export interface PopularCoursesParams {
  limit?: number;
}
