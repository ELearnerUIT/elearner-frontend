/**
 * Dashboard statistics response
 * GET /api/v1/admin/dashboard/stats
 */
export interface AdminDashboardStatsResponse {
  totalUsers: number;
  totalStudents: number;
  totalTeachers: number;
  totalCourses: number;
  publishedCourses: number;
  draftCourses: number;
  totalEnrollments: number;
  activeEnrollments: number;
  totalRevenue: number;
  monthlyRevenue: number;
  pendingCourseVersions: number;
  pendingReports: number;
  currency: string;
}

/**
 * Platform analytics response
 * GET /api/v1/admin/analytics
 */
export interface PlatformAnalyticsResponse {
  userGrowth: {
    month: string;
    totalUsers: number;
    newStudents: number;
    newTeachers: number;
  }[];
  courseGrowth: {
    month: string;
    totalCourses: number;
    newCourses: number;
    publishedCourses: number;
  }[];
  revenueGrowth: {
    month: string;
    revenue: number;
    enrollments: number;
    averagePrice: number;
  }[];
  topCourses: {
    courseId: number;
    courseName: string;
    teacherName: string;
    enrollmentCount: number;
    revenue: number;
    rating: number;
  }[];
  topTeachers: {
    teacherId: number;
    teacherName: string;
    courseCount: number;
    enrollmentCount: number;
    revenue: number;
    rating: number;
  }[];
}

/**
 * Student dashboard stats response
 * GET /api/v1/students/dashboard/stats
 */
export interface StudentDashboardStatsResponse {
  totalEnrollments: number;
  activeEnrollments: number;
  completedCourses: number;
  inProgressCourses: number;
  totalCertificates: number;
  totalLearningHours: number;
  averageProgress: number;
  currentStreak: number;
  longestStreak: number;
  recentActivity: RecentActivityItem[];
}

/**
 * Recent activity item
 */
export interface RecentActivityItem {
  activityType: string;
  courseName: string;
  description: string;
  timestamp: string;
}

/**
 * Teacher dashboard stats response
 * GET /api/v1/teachers/dashboard/stats
 */
export interface TeacherDashboardStatsResponse {
  totalCourses: number;
  publishedCourses: number;
  draftCourses: number;
  totalStudents: number;
  activeStudents: number;
  totalRevenue: number;
  pendingRevenue: number;
  monthlyRevenue: number;
  averageRating: number;
  totalReviews: number;
  pendingVersions: number;
  currency: string;
}
