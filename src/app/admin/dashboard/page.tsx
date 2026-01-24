"use client";

import { useState } from "react";
import {
  BarChart3,
  Users,
  BookOpen,
  DollarSign,
  RefreshCw,
  TrendingUp,
  TrendingDown,
  GraduationCap,
  Award,
  Activity,
} from "lucide-react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import { useAdminDashboard } from "@/hooks/admin/useAdminDashboard";

export default function AdminDashboardPage() {
  const [period, setPeriod] = useState("THIS_MONTH");

  const {
    dashboard,
    statistics,
    revenueReport,
    userReport,
    courseReport,
    loading,
    error,
    reload,
  } = useAdminDashboard({
    period,
    autoLoad: true,
  });

  const COLORS = {
    primary: "#10b981",
    secondary: "#3b82f6",
    warning: "#f59e0b",
    danger: "#ef4444",
    purple: "#a855f7",
    cyan: "#06b6d4",
  };

  // Prepare chart data
  const userDistributionData = userReport
    ? [
      { name: "Active Users", value: userReport.activeUsers, color: COLORS.primary },
      {
        name: "New Users",
        value: userReport.newUsers,
        color: COLORS.warning
      },
    ]
    : [];

  const courseDistributionData = courseReport
    ? [
      {
        name: "Avg Completion",
        value: Math.round(courseReport.avgCompletionRate || 0),
        color: COLORS.secondary
      },
      {
        name: "Avg Score",
        value: Math.round(courseReport.avgScore || 0),
        color: COLORS.purple
      },
    ]
    : [];

  const growthData = statistics?.userGrowth
    ? statistics.userGrowth.slice(0, 4).map(item => ({
      name: item.label,
      value: item.value,
      color: COLORS.primary,
    }))
    : [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-6">
      <div className="max-w-[1600px] mx-auto space-y-6">
        {/* ================= HEADER ================= */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-500/20 rounded-xl">
              <BarChart3 className="w-8 h-8 text-emerald-400" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
              <p className="text-sm text-gray-400 mt-0.5">Welcome back, here's your overview</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <select
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
              className="bg-slate-800/50 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white backdrop-blur-sm hover:bg-slate-800/70 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
            >
              <option value="TODAY">Today</option>
              <option value="THIS_WEEK">This Week</option>
              <option value="THIS_MONTH">This Month</option>
              <option value="THIS_QUARTER">This Quarter</option>
              <option value="THIS_YEAR">This Year</option>
            </select>

            <button
              onClick={reload}
              disabled={loading}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-sky-500/20 text-sky-300 hover:bg-sky-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed border border-sky-500/30"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
              <span className="hidden sm:inline">Reload</span>
            </button>
          </div>
        </div>

        {/* ================= ERROR ================= */}
        {error && (
          <div className="bg-rose-500/10 border border-rose-500/40 p-4 rounded-xl text-rose-300 backdrop-blur-sm">
            ⚠️ {error}
          </div>
        )}

        {/* ================= LOADING ================= */}
        {loading && !dashboard && (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <RefreshCw className="w-8 h-8 animate-spin text-emerald-400 mx-auto mb-3" />
              <div className="text-gray-400">Loading dashboard...</div>
            </div>
          </div>
        )}

        {/* ================= MAIN STATS CARDS ================= */}
        {dashboard && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard
                icon={<DollarSign className="w-6 h-6" />}
                title="Total Revenue"
                value={`${(dashboard.totalRevenue / 1_000_000).toFixed(1)}M`}
                subtitle="VND"
                iconBg="bg-emerald-500/20"
                iconColor="text-emerald-400"
              />
              <StatCard
                icon={<Users className="w-6 h-6" />}
                title="Total Students"
                value={dashboard.totalStudents.toLocaleString()}
                subtitle={`${userReport?.activeUsers || 0} active`}
                iconBg="bg-blue-500/20"
                iconColor="text-blue-400"
              />
              <StatCard
                icon={<BookOpen className="w-6 h-6" />}
                title="Total Courses"
                value={dashboard.totalCourses}
                subtitle={`${courseReport?.totalCourses || 0} total`}
                iconBg="bg-purple-500/20"
                iconColor="text-purple-400"
              />
              <StatCard
                icon={<Award className="w-6 h-6" />}
                title="Completion Rate"
                value={`${Math.round(dashboard.avgCompletionRate * 100) / 100}%`}
                subtitle="Average"
                iconBg="bg-amber-500/20"
                iconColor="text-amber-400"
              />
            </div>

            {/* ================= SECONDARY STATS ================= */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <MiniStatCard
                icon={<GraduationCap className="w-5 h-5" />}
                label="Avg Students/Course"
                value={dashboard.totalCourses > 0
                  ? (dashboard.totalStudents / dashboard.totalCourses).toFixed(1)
                  : "0"}
              />
              <MiniStatCard
                icon={<Activity className="w-5 h-5" />}
                label="Average Score"
                value={dashboard.avgScore.toFixed(1)}
              />
              <MiniStatCard
                icon={<Users className="w-5 h-5" />}
                label="Active Teachers"
                value={dashboard.activeTeachers}
              />
              <MiniStatCard
                icon={<Award className="w-5 h-5" />}
                label="Avg Completion"
                value={`${dashboard.avgCompletionRate.toFixed(1)}%`}
              />
            </div>

            {/* ================= CHARTS SECTION ================= */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Revenue Chart */}
              <ChartCard title="Revenue Trend" subtitle="Weekly breakdown">
                {statistics?.revenueTrend && statistics.revenueTrend.length > 0 ? (
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={statistics.revenueTrend}>
                      <defs>
                        <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor={COLORS.primary} stopOpacity={0.3} />
                          <stop offset="95%" stopColor={COLORS.primary} stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.3} />
                      <XAxis dataKey="label" stroke="#94a3b8" fontSize={12} />
                      <YAxis
                        stroke="#94a3b8"
                        fontSize={12}
                        tickFormatter={(value) => `${(value / 1_000_000).toFixed(0)}M`}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#1e293b",
                          border: "1px solid rgba(255,255,255,0.1)",
                          borderRadius: "8px",
                          color: "#fff",
                        }}
                        formatter={(value: any) => [`${value.toLocaleString()} VND`, "Revenue"]}
                      />
                      <Area
                        type="monotone"
                        dataKey="value"
                        stroke={COLORS.primary}
                        strokeWidth={2}
                        fillOpacity={1}
                        fill="url(#colorRevenue)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                ) : (
                  <EmptyChart />
                )}
              </ChartCard>

              {/* User Growth */}
              <ChartCard title="User Growth" subtitle="New users per week">
                {growthData.length > 0 ? (
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={growthData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.3} />
                      <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} />
                      <YAxis stroke="#94a3b8" fontSize={12} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#1e293b",
                          border: "1px solid rgba(255,255,255,0.1)",
                          borderRadius: "8px",
                          color: "#fff",
                        }}
                        formatter={(value: any) => [`${value}`, "Users"]}
                      />
                      <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                        {growthData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <EmptyChart />
                )}
              </ChartCard>

              {/* User Distribution */}
              <ChartCard title="User Distribution" subtitle="Active vs New Users">
                {userDistributionData.length > 0 ? (
                  <div className="flex items-center justify-between">
                    <ResponsiveContainer width="50%" height={250}>
                      <PieChart>
                        <Pie
                          data={userDistributionData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={90}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {userDistributionData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "#1e293b",
                            border: "1px solid rgba(255,255,255,0.1)",
                            borderRadius: "8px",
                            color: "#fff",
                          }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="flex-1 space-y-3 pr-4">
                      {userDistributionData.map((item, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div
                              className="w-3 h-3 rounded-full"
                              style={{ backgroundColor: item.color }}
                            />
                            <span className="text-sm text-gray-300">{item.name}</span>
                          </div>
                          <span className="text-sm font-semibold text-white">{item.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <EmptyChart />
                )}
              </ChartCard>

              {/* Course Metrics */}
              <ChartCard title="Course Metrics" subtitle="Completion & Performance">
                {courseDistributionData.length > 0 ? (
                  <div className="flex items-center justify-between">
                    <ResponsiveContainer width="50%" height={250}>
                      <PieChart>
                        <Pie
                          data={courseDistributionData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={90}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {courseDistributionData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "#1e293b",
                            border: "1px solid rgba(255,255,255,0.1)",
                            borderRadius: "8px",
                            color: "#fff",
                          }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="flex-1 space-y-3 pr-4">
                      {courseDistributionData.map((item, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div
                              className="w-3 h-3 rounded-full"
                              style={{ backgroundColor: item.color }}
                            />
                            <span className="text-sm text-gray-300">{item.name}</span>
                          </div>
                          <span className="text-sm font-semibold text-white">{item.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <EmptyChart />
                )}
              </ChartCard>
            </div>

            {/* ================= TEACHER & REVENUE SUMMARY ================= */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <GraduationCap className="w-6 h-6 text-purple-400" />
                  Teacher Summary
                </h3>
                <div className="space-y-4">
                  <div className="bg-slate-950/50 rounded-xl p-4 border border-white/5">
                    <div className="text-sm text-gray-400 mb-1">Active Teachers</div>
                    <div className="text-3xl font-bold text-emerald-400">
                      {dashboard.activeTeachers}
                    </div>
                  </div>
                  <div className="bg-slate-950/50 rounded-xl p-4 border border-white/5">
                    <div className="text-sm text-gray-400 mb-1">Total Courses</div>
                    <div className="text-3xl font-bold text-blue-400">
                      {dashboard.totalCourses}
                    </div>
                  </div>
                </div>
              </div>

              {revenueReport && (
                <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
                  <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <DollarSign className="w-6 h-6 text-emerald-400" />
                    Revenue Summary
                  </h3>
                  <div className="space-y-4">
                    <div className="bg-slate-950/50 rounded-xl p-4 border border-white/5">
                      <div className="text-sm text-gray-400 mb-1">Total Revenue</div>
                      <div className="text-3xl font-bold text-emerald-400">
                        {(revenueReport.totalRevenue / 1_000_000).toFixed(1)}M VND
                      </div>
                    </div>
                    <div className="bg-slate-950/50 rounded-xl p-4 border border-white/5">
                      <div className="text-sm text-gray-400 mb-1">Total Transactions</div>
                      <div className="text-3xl font-bold text-blue-400">
                        {revenueReport.totalTransactions}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

/* ======================================================
 * UI COMPONENTS
 * ====================================================== */

function StatCard({
  icon,
  title,
  value,
  subtitle,
  trend,
  trendUp,
  iconBg,
  iconColor,
}: {
  icon: React.ReactNode;
  title: string;
  value: string | number;
  subtitle?: string;
  trend?: string;
  trendUp?: boolean;
  iconBg: string;
  iconColor: string;
}) {
  return (
    <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-white/10 rounded-2xl p-6 backdrop-blur-sm hover:border-white/20 transition-all">
      <div className="flex items-start justify-between mb-4">
        <div className={`p-3 ${iconBg} rounded-xl ${iconColor}`}>{icon}</div>
        {trend && (
          <div
            className={`flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-lg ${trendUp
              ? "bg-emerald-500/20 text-emerald-400"
              : "bg-rose-500/20 text-rose-400"
              }`}
          >
            {trendUp ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
            {trend}
          </div>
        )}
      </div>
      <div className="text-sm text-gray-400 mb-1">{title}</div>
      <div className="text-3xl font-bold text-white mb-1">{value}</div>
      {subtitle && <div className="text-xs text-gray-500">{subtitle}</div>}
    </div>
  );
}

function MiniStatCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
}) {
  return (
    <div className="bg-slate-800/30 border border-white/5 rounded-xl p-4 backdrop-blur-sm hover:bg-slate-800/50 transition-all">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-slate-700/50 rounded-lg text-gray-400">{icon}</div>
        <div className="flex-1">
          <div className="text-xs text-gray-400">{label}</div>
          <div className="text-lg font-bold text-white">{value}</div>
        </div>
      </div>
    </div>
  );
}

function ChartCard({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
      <div className="mb-4">
        <h3 className="text-lg font-bold text-white">{title}</h3>
        {subtitle && <p className="text-sm text-gray-400 mt-0.5">{subtitle}</p>}
      </div>
      {children}
    </div>
  );
}

function EmptyChart() {
  return (
    <div className="flex items-center justify-center h-[300px] text-gray-500">
      <div className="text-center">
        <BarChart3 className="w-12 h-12 mx-auto mb-2 opacity-30" />
        <div className="text-sm">No data available</div>
      </div>
    </div>
  );
}
