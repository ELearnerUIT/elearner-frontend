import { useEffect, useState } from "react";
import { adminDashboardService } from "@/services/admin/dashboard.service";

import type {
  DashboardResponse,
  DashboardStatisticsResponse,
  RevenueReportResponse,
  UserReportResponse,
  CourseReportResponse,
} from "@/lib/admin/dashboard.types";


interface UseAdminDashboardOptions {
  period: string;
  autoLoad?: boolean;
}

export function useAdminDashboard({
  period,
  autoLoad = true,
}: UseAdminDashboardOptions) {
  const [dashboard, setDashboard] =
    useState<DashboardResponse | null>(null);
  const [statistics, setStatistics] =
    useState<DashboardStatisticsResponse | null>(null);
  const [revenueReport, setRevenueReport] =
    useState<RevenueReportResponse | null>(null);
  const [userReport, setUserReport] =
    useState<UserReportResponse | null>(null);
  const [courseReport, setCourseReport] =
    useState<CourseReportResponse | null>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadAll = async () => {
    try {
      setLoading(true);
      setError(null);

      const [
        dashboardRes,
        statisticsRes,
        revenueRes,
        userRes,
        courseRes,
      ] = await Promise.all([
        adminDashboardService.getDashboard(period),
        adminDashboardService.getStatistics(period),
        adminDashboardService.getRevenueReport(period),
        adminDashboardService.getUserReport(period),
        adminDashboardService.getCourseReport(period),
      ]);

      setDashboard(dashboardRes);
      setStatistics(statisticsRes);
      setRevenueReport(revenueRes);
      setUserReport(userRes);
      setCourseReport(courseRes);
    } catch (e: any) {
      setError(e.message || "Failed to load dashboard");
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    if (autoLoad && period) {
      loadAll();
    }
  }, [period]);

  return {
    dashboard,
    statistics,
    revenueReport,
    userReport,
    courseReport,
    loading,
    error,
    reload: loadAll,
  };
}
