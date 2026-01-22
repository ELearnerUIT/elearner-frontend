/**
 * Lesson progress response DTO
 */
export interface LessonProgressResponse {
  id: number;
  enrollmentId: number;
  lessonId: number;
  isCompleted: boolean;
  completedAt: string | null;
  watchedSeconds: number | null;
  totalDurationSeconds: number | null;
  progressPercentage: number;
  lastWatchedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

/**
 * Update progress request DTO
 * PUT /api/v1/progress/lessons/{lessonId}
 */
export interface UpdateLessonProgressRequest {
  watchedSeconds: number;
  isCompleted?: boolean;
}

/**
 * Mark lesson complete request DTO
 * POST /api/v1/progress/lessons/{lessonId}/complete
 */
export interface MarkLessonCompleteRequest {
  watchedSeconds?: number;
}

/**
 * Video progress tracking request DTO
 * POST /api/v1/progress/lessons/{lessonId}/video-progress
 */
export interface TrackVideoProgressRequest {
  currentSeconds: number;
  totalDurationSeconds: number;
}

/**
 * Course progress summary
 * GET /api/v1/progress/courses/{courseId}
 */
export interface CourseProgressResponse {
  enrollmentId: number;
  courseId: number;
  progressPercentage: number;
  completedLessons: number;
  totalLessons: number;
  completedDurationSeconds: number;
  totalDurationSeconds: number;
  lastAccessedAt: string | null;
}
