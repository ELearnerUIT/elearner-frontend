// ===========================
// Progress Types - Mapped from Backend APIs
// ===========================

export type ProgressStatus = "NOT_VIEWED" | "IN_PROGRESS" | "COMPLETED";

// Request DTOs

/** Backend: UpdateWatchedDurationRequest */
export interface UpdateWatchedDurationRequest {
  watchedDurationSeconds: number;
}

// Response DTOs

/** Backend: StudentProgressOverviewResponse */
export interface StudentProgressOverviewResponse {
  studentId: number;
  studentName: string;
  totalEnrollments: number;
  activeEnrollments: number;
  completedEnrollments: number;
  totalLessonsCompleted: number;
  totalLessons: number;
  overallProgress: number; // 0-100 percentage
  averageScore?: number;
  certificatesEarned: number;
  totalStudyTimeMinutes?: number;
  streakDays?: number;
  lastActivityAt?: string; // ISO datetime string
}

/** Backend: CourseProgressResponse */
export interface CourseProgressResponse {
  courseId: number;
  courseTitle: string;
  totalLessons: number;
  completedLessons: number;
  viewedLessons: number;
  completionPercentage: number; // 0-100
  totalDurationSeconds: number;
  watchedDurationSeconds: number;
  averageScore: number | null;
  chapterProgress: ChapterProgressResponse[];
}

/** Backend: ChapterProgressResponse */
export interface ChapterProgressResponse {
  chapterId: number;
  chapterTitle: string;
  totalLessons: number;
  completedLessons: number;
  completionPercentage: number; // 0-100
  lessonProgress: LessonProgressResponse[];
}

/** Backend: LessonProgressResponse */
export interface LessonProgressResponse {
  id: number | null;
  lessonId: number;
  lessonTitle: string;
  lessonType: string; // VIDEO, DOCUMENT, QUIZ, ASSIGNMENT
  lessonDurationSeconds: number;
  status: ProgressStatus; // NOT_VIEWED, IN_PROGRESS, COMPLETED
  viewedAt: string | null; // ISO datetime string
  timesViewed: number;
  watchedDurationSeconds: number;
  watchedPercentage: number | null;
  completedAt: string | null; // ISO datetime string
  isBookmarked: boolean;
  notes: string | null;
}

/** Backend: CourseProgressStatsResponse */
export interface CourseProgressStatsResponse {
  courseId: number;
  courseName: string;
  totalEnrollments: number;
  activeEnrollments: number;
  completedEnrollments: number;
  averageCompletionPercentage: number;
  averageStudyTimeMinutes?: number;
  studentsWithProgress: number;
  studentsCompleted: number;
  completionRate: number; // percentage
  lessonsCompleted: number;
  totalLessons: number;
  quizzesCompleted: number;
  totalQuizzes: number;
  assignmentsCompleted: number;
  totalAssignments: number;
  averageQuizScore?: number;
  averageAssignmentScore?: number;
}
