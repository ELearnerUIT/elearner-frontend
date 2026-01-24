"use client";

import { useEffect, useState } from "react";
import { BookOpen, Award, Clock, TrendingUp, Calendar, Play } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { useStudentProgress } from "@/hooks/learner/useProgress";
import { useEnrollments } from "@/hooks/learner/useEnrollment";
import { useCertificates } from "@/hooks/learner/useCertificate";

interface DashboardStats {
    enrolledCourses: number;
    completedCourses: number;
    totalLearningHours: number;
    certificatesEarned: number;
}

interface RecentCourse {
    id: string;
    title: string;
    slug: string;
    thumbnailUrl: string;
    progress: number;
    lastAccessedAt: string;
    instructor: string;
}

interface UpcomingDeadline {
    id: string;
    title: string;
    courseTitle: string;
    type: "QUIZ" | "ASSIGNMENT";
    dueDate: string;
    courseSlug: string;
}

export default function LearnerDashboardPage() {
    const { user } = useAuth();
    const studentId = user?.profile?.studentId;

    // Fetch backend data
    const { data: progressData, isLoading: progressLoading } = useStudentProgress(studentId || 0);
    const { courses: enrolledCourses, isLoading: enrollmentsLoading } = useEnrollments(1, 5);
    const { data: certificatesData, isLoading: certificatesLoading } = useCertificates(studentId || 0);

    const [upcomingDeadlines] = useState<UpcomingDeadline[]>([]);

    console.log(enrolledCourses);
    // Combine loading states
    const loading = progressLoading || enrollmentsLoading || certificatesLoading;

    // Map stats from backend data
    const stats: DashboardStats = {
        enrolledCourses: progressData?.totalEnrolledCourses || 0,
        completedCourses: progressData?.completedCourses || 0,
        totalLearningHours: progressData?.totalWatchedHours || 0,
        certificatesEarned: certificatesData?.certificates?.length || 0,
    };

    // Map enrolled courses to recent courses format
    const recentCourses: RecentCourse[] = enrolledCourses.slice(0, 5).map(course => ({
        id: course.id,
        title: course.title,
        slug: course.slug,
        thumbnailUrl: course.thumbnailUrl || "/images/course/placeholder.jpg",
        progress: Math.round(course.progress * 100) / 100,
        lastAccessedAt: course.lastViewed,
        instructor: course.instructor,
    }));

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-6 animate-pulse">
                <div className="max-w-7xl mx-auto space-y-6">
                    <div className="h-10 bg-slate-200 dark:bg-slate-800 rounded-lg w-64"></div>
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                        {[...Array(4)].map((_, i) => (
                            <div key={i} className="h-32 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800"></div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
            <div className="mx-auto w-full max-w-7xl p-6 space-y-6">
                {/* Header */}
                <div className="space-y-2">
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
                        My Learning Dashboard
                    </h1>
                    <p className="text-slate-600 dark:text-slate-400">
                        Track your progress and continue learning
                    </p>
                </div>

                {/* Stats Cards */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <StatCard
                        icon={<BookOpen className="w-5 h-5" />}
                        label="Enrolled Courses"
                        value={stats.enrolledCourses}
                        bgColor="bg-blue-500"
                    />
                    <StatCard
                        icon={<Award className="w-5 h-5" />}
                        label="Completed Courses"
                        value={stats.completedCourses}
                        bgColor="bg-green-500"
                    />
                    <StatCard
                        icon={<Clock className="w-5 h-5" />}
                        label="Learning Hours"
                        value={stats.totalLearningHours}
                        bgColor="bg-purple-500"
                    />
                    <StatCard
                        icon={<TrendingUp className="w-5 h-5" />}
                        label="Certificates Earned"
                        value={stats.certificatesEarned}
                        bgColor="bg-orange-500"
                    />
                </div>

                {/* Main Content */}
                <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
                    {/* Continue Learning */}
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
                                Continue Learning
                            </h2>
                            <Link
                                href="/learner/my-courses"
                                className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                            >
                                View All →
                            </Link>
                        </div>

                        <div className="space-y-4">
                            {recentCourses.map((course) => (
                                <Link
                                    key={course.id}
                                    href={`/learner/learn/${course.slug}`}
                                    className="block group"
                                >
                                    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-4 hover:shadow-lg transition-shadow">
                                        <div className="flex gap-4">
                                            <div className="relative w-32 h-20 rounded-lg overflow-hidden flex-shrink-0 bg-slate-200 dark:bg-slate-800">
                                                <div className="absolute inset-0 flex items-center justify-center">
                                                    <Play className="w-8 h-8 text-white opacity-80 group-hover:opacity-100 transition-opacity" />
                                                </div>
                                            </div>
                                            <div className="flex-1 space-y-2">
                                                <h3 className="font-semibold text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                                    {course.title}
                                                </h3>
                                                <p className="text-sm text-slate-600 dark:text-slate-400">
                                                    By {course.instructor} • {course.lastAccessedAt}
                                                </p>
                                                <div className="space-y-1">
                                                    <div className="flex items-center justify-between text-sm">
                                                        <span className="text-slate-600 dark:text-slate-400">Progress</span>
                                                        <span className="font-semibold text-slate-900 dark:text-slate-100">
                                                            {course.progress}%
                                                        </span>
                                                    </div>
                                                    <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                                                        <div
                                                            className="bg-blue-600 h-2 rounded-full transition-all"
                                                            style={{ width: `${course.progress}%` }}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Upcoming Deadlines */}
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
                                Upcoming Deadlines
                            </h2>
                            <Link
                                href="/learner/calendar"
                                className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                            >
                                <Calendar className="w-4 h-4 inline mr-1" />
                                Calendar
                            </Link>
                        </div>

                        <div className="space-y-3">
                            {upcomingDeadlines.map((deadline) => (
                                <div
                                    key={deadline.id}
                                    className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-4"
                                >
                                    <div className="space-y-2">
                                        <div className="flex items-start justify-between gap-2">
                                            <div className="flex-1">
                                                <h4 className="font-medium text-slate-900 dark:text-slate-100">
                                                    {deadline.title}
                                                </h4>
                                                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                                                    {deadline.courseTitle}
                                                </p>
                                            </div>
                                            <span
                                                className={`px-2 py-1 rounded text-xs font-medium ${deadline.type === "QUIZ"
                                                    ? "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400"
                                                    : "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400"
                                                    }`}
                                            >
                                                {deadline.type}
                                            </span>
                                        </div>
                                        <div className="flex items-center text-sm text-slate-600 dark:text-slate-400">
                                            <Clock className="w-4 h-4 mr-1" />
                                            Due {new Date(deadline.dueDate).toLocaleDateString()}
                                        </div>
                                    </div>
                                </div>
                            ))}

                            {upcomingDeadlines.length === 0 && (
                                <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-8 text-center">
                                    <Calendar className="w-12 h-12 mx-auto text-slate-400 dark:text-slate-600 mb-3" />
                                    <p className="text-slate-600 dark:text-slate-400">
                                        No upcoming deadlines
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

interface StatCardProps {
    icon: React.ReactNode;
    label: string;
    value: number;
    bgColor: string;
}

function StatCard({ icon, label, value, bgColor }: StatCardProps) {
    return (
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6">
            <div className="flex items-center gap-4">
                <div className={`${bgColor} p-3 rounded-lg text-white`}>
                    {icon}
                </div>
                <div>
                    <p className="text-sm text-slate-600 dark:text-slate-400">{label}</p>
                    <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                        {value}
                    </p>
                </div>
            </div>
        </div>
    );
}
