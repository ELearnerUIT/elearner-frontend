"use client";

import { useEffect, useState } from "react";
import { BookOpen, Clock, Award, Search, Filter, ChevronRight } from "lucide-react";
import Link from "next/link";

interface Course {
    id: string;
    title: string;
    slug: string;
    thumbnailUrl: string;
    instructor: {
        id: string;
        name: string;
        avatarUrl: string;
    };
    progress: number;
    enrolledAt: string;
    lastAccessedAt: string;
    totalLessons: number;
    completedLessons: number;
    status: "ENROLLED" | "COMPLETED" | "EXPIRED";
    certificateId?: string;
}

export default function MyCoursesPage() {
    const [courses, setCourses] = useState<Course[]>([]);
    const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState<"ALL" | "ENROLLED" | "COMPLETED">("ALL");

    useEffect(() => {
        // TODO: Replace with actual API call
        const fetchMyCourses = async () => {
            setLoading(true);
            try {
                // Simulated data
                const mockCourses: Course[] = [
                    {
                        id: "1",
                        title: "Advanced React Patterns & Best Practices",
                        slug: "advanced-react-patterns",
                        thumbnailUrl: "/images/course/placeholder.jpg",
                        instructor: {
                            id: "t1",
                            name: "John Doe",
                            avatarUrl: "/images/avatars/default.jpg",
                        },
                        progress: 65,
                        enrolledAt: "2025-12-15T10:00:00Z",
                        lastAccessedAt: "2 hours ago",
                        totalLessons: 45,
                        completedLessons: 29,
                        status: "ENROLLED",
                    },
                    {
                        id: "2",
                        title: "Node.js Microservices Architecture",
                        slug: "nodejs-microservices",
                        thumbnailUrl: "/images/course/placeholder.jpg",
                        instructor: {
                            id: "t2",
                            name: "Jane Smith",
                            avatarUrl: "/images/avatars/default.jpg",
                        },
                        progress: 100,
                        enrolledAt: "2025-11-01T10:00:00Z",
                        lastAccessedAt: "3 days ago",
                        totalLessons: 38,
                        completedLessons: 38,
                        status: "COMPLETED",
                        certificateId: "cert-123",
                    },
                    {
                        id: "3",
                        title: "TypeScript Advanced Types",
                        slug: "typescript-advanced",
                        thumbnailUrl: "/images/course/placeholder.jpg",
                        instructor: {
                            id: "t3",
                            name: "Mike Johnson",
                            avatarUrl: "/images/avatars/default.jpg",
                        },
                        progress: 32,
                        enrolledAt: "2026-01-10T10:00:00Z",
                        lastAccessedAt: "1 day ago",
                        totalLessons: 28,
                        completedLessons: 9,
                        status: "ENROLLED",
                    },
                ];
                setCourses(mockCourses);
                setFilteredCourses(mockCourses);
            } catch (error) {
                console.error("Failed to fetch courses:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchMyCourses();
    }, []);

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
                course.instructor.name.toLowerCase().includes(searchQuery.toLowerCase())
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
                        By {course.instructor.name}
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
                        <span>{course.completedLessons}/{course.totalLessons} lessons</span>
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
