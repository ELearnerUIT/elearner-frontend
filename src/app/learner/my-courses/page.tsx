"use client";

import { useEffect, useState, useMemo } from "react";
import { BookOpen, Clock, Award, Search, Filter, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { useEnrollments } from "@/hooks/learner/useEnrollment";
import { useCertificates } from "@/hooks/learner/useCertificate";

interface Course {
    id: string;
    title: string;
    slug: string;
    thumbnailUrl: string;
    instructor: string;
    progress: number;
    enrolledAt: string;
    lastAccessedAt: string;
    status: "ENROLLED" | "COMPLETED";
    certificateId?: string;
}

export default function MyCoursesPage() {
    const { user } = useAuth();
    const studentId = user?.profile?.studentId;

    // Fetch enrollments and certificates from backend
    const { courses: enrolledCourses, isLoading: enrollmentsLoading } = useEnrollments(1, 100);
    const { data: certificatesData, isLoading: certificatesLoading } = useCertificates(studentId || 0);

    const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState<"ALL" | "ENROLLED" | "COMPLETED">("ALL");

    // Map enrollments to Course format and add certificate info
    const courses: Course[] = useMemo(() => {
        return enrolledCourses.map((enrollment) => {
            // Find certificate for this course
            const certificate = certificatesData?.certificates?.find(
                (cert: any) => cert.courseId === enrollment.courseId
            );

            // Determine status based on progress
            const status: "ENROLLED" | "COMPLETED" = enrollment.progress >= 100 ? "COMPLETED" : "ENROLLED";

            return {
                id: enrollment.id,
                title: enrollment.title,
                slug: enrollment.slug,
                thumbnailUrl: enrollment.thumbnailUrl || "/images/course/placeholder.jpg",
                instructor: enrollment.instructor,
                progress: Math.round(enrollment.progress * 100) / 100,
                enrolledAt: enrollment.lastViewed,
                lastAccessedAt: enrollment.lastViewed,
                status,
                certificateId: certificate?.id ? String(certificate.id) : undefined,
            };
        });
    }, [enrolledCourses, certificatesData]);

    const loading = enrollmentsLoading || certificatesLoading;

    useEffect(() => {
        let filtered = courses;

        // Filter by status
        if (statusFilter !== "ALL") {
            filtered = filtered.filter((course) => course.status === statusFilter);
        }

        // Filter by search query
        if (searchQuery.trim()) {
            filtered = filtered.filter((course) =>
                course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                course.instructor.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        setFilteredCourses(filtered);
    }, [searchQuery, statusFilter, courses]);

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-6 animate-pulse">
                <div className="max-w-7xl mx-auto space-y-6">
                    <div className="h-10 bg-slate-200 dark:bg-slate-800 rounded-lg w-64"></div>
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {[...Array(6)].map((_, i) => (
                            <div key={i} className="h-80 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800"></div>
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
                <div className="space-y-4">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
                            My Courses
                        </h1>
                        <p className="text-slate-600 dark:text-slate-400 mt-2">
                            {courses.length} courses enrolled
                        </p>
                    </div>

                    {/* Search & Filter */}
                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Search courses..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={() => setStatusFilter("ALL")}
                                className={`px-4 py-2 rounded-lg font-medium transition-colors ${statusFilter === "ALL"
                                    ? "bg-blue-600 text-white"
                                    : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800"
                                    }`}
                            >
                                All
                            </button>
                            <button
                                onClick={() => setStatusFilter("ENROLLED")}
                                className={`px-4 py-2 rounded-lg font-medium transition-colors ${statusFilter === "ENROLLED"
                                    ? "bg-blue-600 text-white"
                                    : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800"
                                    }`}
                            >
                                In Progress
                            </button>
                            <button
                                onClick={() => setStatusFilter("COMPLETED")}
                                className={`px-4 py-2 rounded-lg font-medium transition-colors ${statusFilter === "COMPLETED"
                                    ? "bg-blue-600 text-white"
                                    : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800"
                                    }`}
                            >
                                Completed
                            </button>
                        </div>
                    </div>
                </div>

                {/* Course Grid */}
                {filteredCourses.length === 0 ? (
                    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-12 text-center">
                        <BookOpen className="w-16 h-16 mx-auto text-slate-400 dark:text-slate-600 mb-4" />
                        <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2">
                            No courses found
                        </h3>
                        <p className="text-slate-600 dark:text-slate-400 mb-6">
                            {searchQuery ? "Try adjusting your search" : "Start learning by enrolling in a course"}
                        </p>
                        <Link
                            href="/explore"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                        >
                            Explore Courses
                            <ChevronRight className="w-4 h-4" />
                        </Link>
                    </div>
                ) : (
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {filteredCourses.map((course) => (
                            <CourseCard key={course.id} course={course} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

interface CourseCardProps {
    course: Course;
}

function CourseCard({ course }: CourseCardProps) {
    return (
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden hover:shadow-lg transition-shadow">
            {/* Thumbnail */}
            <div className="relative h-48 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <BookOpen className="w-16 h-16 text-white opacity-50" />
                {course.status === "COMPLETED" && (
                    <div className="absolute top-3 right-3 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                        <Award className="w-4 h-4" />
                        Completed
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="p-5 space-y-4">
                <div>
                    <Link
                        href={`/learner/learn/${course.slug}`}
                        className="font-semibold text-slate-900 dark:text-slate-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors line-clamp-2"
                    >
                        {course.title}
                    </Link>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                        By {course.instructor}
                    </p>
                </div>

                {/* Progress */}
                <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-600 dark:text-slate-400">Progress</span>
                        <span className="font-semibold text-slate-900 dark:text-slate-100">
                            {course.progress}%
                        </span>
                    </div>
                    <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                        <div
                            className={`h-2 rounded-full transition-all ${course.progress === 100 ? "bg-green-500" : "bg-blue-600"
                                }`}
                            style={{ width: `${course.progress}%` }}
                        />
                    </div>
                    <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-400">
                        <span>Last viewed {course.lastAccessedAt}</span>
                    </div>
                </div>

                {/* Action Button */}
                <Link
                    href={`/learner/learn/${course.slug}`}
                    className="block w-full text-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                >
                    {course.progress === 100 ? "Review Course" : "Continue Learning"}
                </Link>

                {course.certificateId && (
                    <Link
                        href={`/learner/certificates/${course.certificateId}`}
                        className="block w-full text-center px-4 py-2 border border-blue-600 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg font-medium transition-colors"
                    >
                        View Certificate
                    </Link>
                )}
            </div>
        </div>
    );
}
