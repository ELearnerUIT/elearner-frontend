/* ================= SHARED ================= */

export interface TimeSeriesItem {
  label: string;
  value: number;
}

/* ================= DASHBOARD ================= */

export interface DashboardResponse {
  totalRevenue: number;
  totalStudents: number; // Backend uses totalStudents instead of totalUsers
  totalCourses: number;
  avgCompletionRate: number;
  avgScore: number;
  activeTeachers: number; // Backend returns flat field, not nested object
}

/* ================= STATISTICS ================= */

export interface DashboardStatisticsResponse {
  revenueTrend: TimeSeriesItem[]; // Backend returns arrays, not percentages
  userGrowth: TimeSeriesItem[];
  courseCompletion: TimeSeriesItem[];
}

/* ================= REPORTS ================= */

export interface RevenueReportResponse {
  period: string;
  totalRevenue: number;
  totalTransactions: number;
}

export interface UserReportResponse {
  totalUsers: number;
  newUsers: number; // Backend includes this field
  activeUsers: number;
}

export interface CourseReportResponse {
  totalCourses: number;
  avgCompletionRate: number;
  avgScore: number;
}
