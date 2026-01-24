// Type definitions for learner progress APIs
// Chuẩn hóa theo backend

export interface StudentProgressOverview {
  studentId: number;
  studentName: string;
  totalEnrolledCourses: number;
  completedCourses: number;
  inProgressCourses: number;
  overallCompletionPercentage: number;
  totalWatchedHours: number;
  averageScore: number;
  courses: CourseProgressSummary[];
}

export interface CourseProgressSummary {
  courseId: number;
  courseTitle: string;
  completionPercentage: number;
  averageScore: number | null;
  totalLessons: number;
  completedLessons: number;
}

export interface CourseProgress {
  studentId: number;
  courseId: number;
  chapters: Array<{
    chapterId: number;
    title: string;
    lessons: Array<LessonProgress>;
    progressPercent: number;
  }>;
  progressPercent: number;
}

export interface LessonProgress {
  studentId: number;
  lessonId: number;
  viewed: boolean;
  completed: boolean;
  watchedDuration?: number;
  progressPercent?: number;
}
