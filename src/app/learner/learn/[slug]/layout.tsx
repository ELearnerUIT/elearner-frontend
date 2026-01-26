"use client";

import { useEffect, useState } from "react";
import { ChevronDown, ChevronRight, Lock, CheckCircle, PlayCircle, FileText, ClipboardCheck, Award } from "lucide-react";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import studentCourseService from "@/services/learning/student-course.service";
import { progressService } from "@/services/learning/progress.service";
import { courseService } from "@/services/courses/course.service";
import { AppError } from "@/lib/api/api.error";
import type { CourseStructureResponse, ChapterWithLessonsDto, LessonDTO } from "@/services/learning/student-course.types";
import type { CourseProgressResponse, LessonProgressResponse } from "@/services/learning/progress.types";
import type { CourseDetailResponse } from "@/services/courses/course.types";
import { useAuth } from "@/hooks/useAuth";
import { CourseProgressProvider, useCourseProgress } from "./course-progress-context";

interface CourseData {
    id: number;
    title: string;
    slug: string;
    structure: CourseStructureResponse;
    progress: CourseProgressResponse;
}

function LearnLayoutContent({ children }: { children: React.ReactNode }) {
    const params = useParams();
    const pathname = usePathname();
    const slug = params?.slug as string;
    const { user } = useAuth();
    const { setProgress: setContextProgress, triggerRefresh } = useCourseProgress();

    const [courseData, setCourseData] = useState<CourseData | null>(null);
    const [expandedChapters, setExpandedChapters] = useState<Set<number>>(new Set());
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCourseData = async () => {
            if (!user?.profile?.studentId) {
                return; // Wait for user to load
            }

            setLoading(true);
            setError(null);

            try {
                // Get course info by slug first
                const course = await courseService.getCourseBySlug(slug);

                // Get course structure and progress in parallel
                const [structure, progress] = await Promise.all([
                    studentCourseService.getCourseStructure(course.id),
                    progressService.getStudentCourseProgress(user.profile.studentId, course.id)
                ]);

                setCourseData({
                    id: course.id,
                    title: course.title,
                    slug: course.slug,
                    structure,
                    progress
                });

                // Update context with the latest progress
                setContextProgress(progress);

                // Auto-expand first chapter
                if (structure.chapters.length > 0) {
                    setExpandedChapters(new Set([structure.chapters[0].id]));
                }
                console.log("Fetched course data:", { course, structure, progress });
            } catch (err) {
                console.error("Failed to fetch course data:", err);
                if (err instanceof AppError) {
                    setError(err.message);
                } else {
                    setError("Failed to load course. Please try again.");
                }
            } finally {
                setLoading(false);
            }
        };

        if (slug && user) {
            fetchCourseData();
        }
    }, [slug, user, triggerRefresh, setContextProgress]);

    const toggleChapter = (chapterId: number) => {
        const newExpanded = new Set(expandedChapters);
        if (newExpanded.has(chapterId)) {
            newExpanded.delete(chapterId);
        } else {
            newExpanded.add(chapterId);
        }
        setExpandedChapters(newExpanded);
    };

    const getLessonIcon = (lesson: LessonDTO, lessonProgress?: LessonProgressResponse) => {
        // Check if completed based on progress data
        if (lessonProgress?.status === "COMPLETED") {
            return <CheckCircle className="w-4 h-4 text-green-500" />;
        }

        switch (lesson.lessonType) {
            case "VIDEO":
                return <PlayCircle className="w-4 h-4 text-blue-500" />;
            case "DOCUMENT":
            case "ARTICLE":
                return <FileText className="w-4 h-4 text-purple-500" />;
            case "QUIZ":
                return <ClipboardCheck className="w-4 h-4 text-orange-500" />;
            case "ASSIGNMENT":
                return <ClipboardCheck className="w-4 h-4 text-red-500" />;
            default:
                return <FileText className="w-4 h-4 text-slate-500" />;
        }
    };

    const formatDuration = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        return `${minutes} min`;
    };

    const isCurrentLesson = (lessonId: number) => {
        return pathname?.includes(lessonId.toString());
    };

    const getLessonProgress = (lessonId: number): LessonProgressResponse | undefined => {
        if (!courseData?.progress) return undefined;

        for (const chapter of courseData.progress.chapterProgress) {
            const lessonProg = chapter.lessonProgress.find(lp => lp.lessonId === lessonId);
            if (lessonProg) return lessonProg;
        }
        return undefined;
    };

    if (loading) {
        return (
            <div className="flex h-screen bg-slate-50 dark:bg-slate-950">
                <div className="w-80 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 animate-pulse">
                    <div className="p-4 space-y-4">
                        {[...Array(3)].map((_, i) => (
                            <div key={i} className="space-y-2">
                                <div className="h-6 bg-slate-200 dark:bg-slate-800 rounded"></div>
                                <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-3/4"></div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="flex-1 p-8">
                    <div className="h-96 bg-slate-200 dark:bg-slate-800 rounded-xl animate-pulse"></div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center h-screen bg-slate-50 dark:bg-slate-950">
                <div className="text-center">
                    <p className="text-red-600 dark:text-red-400 mb-4">{error}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    if (!courseData) return null;

    return (
        <div className="flex h-screen bg-slate-50 dark:bg-slate-950 overflow-hidden">
            {/* Sidebar */}
            <aside
                className={`${sidebarOpen ? "w-80" : "w-0"
                    } transition-all duration-300 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden flex flex-col`}
            >
                {/* Course Header */}
                <div className="p-4 border-b border-slate-200 dark:border-slate-800">
                    <Link
                        href="/learner/my-courses"
                        className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 mb-2 block"
                    >
                        ← Back to My Courses
                    </Link>
                    <h2 className="font-semibold text-slate-900 dark:text-slate-100 line-clamp-2">
                        {courseData.title}
                    </h2>
                    <div className="mt-3">
                        <div className="flex items-center justify-between text-sm mb-1">
                            <span className="text-slate-600 dark:text-slate-400">Course Progress</span>
                            <span className="font-semibold text-slate-900 dark:text-slate-100">
                                {Math.round(courseData.progress.completionPercentage)}%
                            </span>
                        </div>
                        <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                            <div
                                className="bg-blue-600 h-2 rounded-full transition-all"
                                style={{ width: `${courseData.progress.completionPercentage}%` }}
                            />
                        </div>
                    </div>
                </div>

                {/* Chapters & Lessons */}
                <div className="flex-1 overflow-y-auto">
                    {courseData.structure.chapters.map((chapter) => (
                        <div key={chapter.id} className="border-b border-slate-200 dark:border-slate-800">
                            {/* Chapter Header */}
                            <button
                                onClick={() => toggleChapter(chapter.id)}
                                className="w-full p-4 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors text-left"
                            >
                                <div className="flex-1">
                                    <h3 className="font-medium text-slate-900 dark:text-slate-100">
                                        {chapter.position}. {chapter.title}
                                    </h3>
                                    <p className="text-xs text-slate-500 dark:text-slate-500 mt-1">
                                        {chapter?.lessons?.length ?? 0} lessons
                                    </p>
                                </div>
                                {expandedChapters.has(chapter.id) ? (
                                    <ChevronDown className="w-5 h-5 text-slate-400" />
                                ) : (
                                    <ChevronRight className="w-5 h-5 text-slate-400" />
                                )}
                            </button>

                            {/* Lessons */}
                            {expandedChapters.has(chapter.id) && (
                                <div className="bg-slate-50 dark:bg-slate-800/50">
                                    {chapter?.lessons?.map((lesson) => {
                                        const isCurrent = isCurrentLesson(lesson.id);
                                        const lessonProgress = getLessonProgress(lesson.id);
                                        const isClickable = true; // All lessons are accessible for enrolled students

                                        return (
                                            <Link
                                                key={lesson.id}
                                                href={
                                                    lesson.lessonType === "QUIZ"
                                                        ? `/learner/learn/${slug}/quiz/${lesson.id}`
                                                        : lesson.lessonType === "ASSIGNMENT"
                                                            ? `/learner/learn/${slug}/assignment/${lesson.id}`
                                                            : `/learner/learn/${slug}/lesson/${lesson.id}`
                                                }
                                                className={`block px-4 py-3 pl-8 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors ${isCurrent ? "bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-600" : ""
                                                    }`}
                                            >
                                                <div className="flex items-start gap-3">
                                                    <div className="mt-0.5">{getLessonIcon(lesson, lessonProgress)}</div>
                                                    <div className="flex-1 min-w-0">
                                                        <p
                                                            className={`text-sm font-medium ${isCurrent
                                                                ? "text-blue-600 dark:text-blue-400"
                                                                : "text-slate-900 dark:text-slate-100"
                                                                }`}
                                                        >
                                                            {lesson.title}
                                                        </p>
                                                        <div className="flex items-center gap-2 mt-1">
                                                            {lesson.videoDuration && lesson.videoDuration > 0 && (
                                                                <span className="text-xs text-slate-500 dark:text-slate-500">
                                                                    {formatDuration(lesson.videoDuration)}
                                                                </span>
                                                            )}
                                                            {lesson.isPreview && (
                                                                <span className="text-xs text-blue-600 dark:text-blue-400">
                                                                    Preview
                                                                </span>
                                                            )}
                                                            {lessonProgress?.status === "IN_PROGRESS" && (
                                                                <span className="text-xs text-orange-600 dark:text-orange-400">
                                                                    In Progress
                                                                </span>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </Link>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto">
                {/* Toggle Sidebar Button */}
                <button
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    className="fixed top-4 left-4 z-10 p-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg shadow-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                >
                    {sidebarOpen ? (
                        <ChevronRight className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                    ) : (
                        <ChevronDown className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                    )}
                </button>

                {children}
            </main>
        </div>
    );
}

export default function LearnLayout({ children }: { children: React.ReactNode }) {
    return (
        <CourseProgressProvider>
            <LearnLayoutContent>{children}</LearnLayoutContent>
        </CourseProgressProvider>
    );
}
