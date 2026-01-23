"use client";

import { useEffect, useState } from "react";
import { ChevronDown, ChevronRight, Lock, CheckCircle, PlayCircle, FileText, ClipboardCheck, Award } from "lucide-react";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

interface Lesson {
    id: string;
    title: string;
    type: "VIDEO" | "DOCUMENT" | "QUIZ" | "ASSIGNMENT" | "EXAM";
    duration: number; // seconds
    isCompleted: boolean;
    isLocked: boolean;
    isPreview: boolean;
}

interface Chapter {
    id: string;
    title: string;
    orderIndex: number;
    lessons: Lesson[];
}

interface CourseStructure {
    id: string;
    title: string;
    slug: string;
    chapters: Chapter[];
    progress: number;
}

export default function LearnLayout({ children }: { children: React.ReactNode }) {
    const params = useParams();
    const pathname = usePathname();
    const slug = params?.slug as string;

    const [courseStructure, setCourseStructure] = useState<CourseStructure | null>(null);
    const [expandedChapters, setExpandedChapters] = useState<Set<string>>(new Set());
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // TODO: Replace with actual API call
        const fetchCourseStructure = async () => {
            setLoading(true);
            try {
                const mockStructure: CourseStructure = {
                    id: "course-1",
                    title: "Advanced React Patterns & Best Practices",
                    slug: "advanced-react-patterns",
                    progress: 65,
                    chapters: [
                        {
                            id: "ch-1",
                            title: "Introduction to React Patterns",
                            orderIndex: 1,
                            lessons: [
                                {
                                    id: "lesson-1",
                                    title: "Welcome to the Course",
                                    type: "VIDEO",
                                    duration: 420,
                                    isCompleted: true,
                                    isLocked: false,
                                    isPreview: true,
                                },
                                {
                                    id: "lesson-2",
                                    title: "Course Overview & Prerequisites",
                                    type: "DOCUMENT",
                                    duration: 300,
                                    isCompleted: true,
                                    isLocked: false,
                                    isPreview: false,
                                },
                                {
                                    id: "quiz-1",
                                    title: "Chapter 1 Quiz",
                                    type: "QUIZ",
                                    duration: 600,
                                    isCompleted: false,
                                    isLocked: false,
                                    isPreview: false,
                                },
                            ],
                        },
                        {
                            id: "ch-2",
                            title: "Hooks Deep Dive",
                            orderIndex: 2,
                            lessons: [
                                {
                                    id: "lesson-3",
                                    title: "useState & useEffect Patterns",
                                    type: "VIDEO",
                                    duration: 1200,
                                    isCompleted: true,
                                    isLocked: false,
                                    isPreview: false,
                                },
                                {
                                    id: "lesson-4",
                                    title: "Custom Hooks",
                                    type: "VIDEO",
                                    duration: 900,
                                    isCompleted: false,
                                    isLocked: false,
                                    isPreview: false,
                                },
                                {
                                    id: "assignment-1",
                                    title: "Build a Custom Hook",
                                    type: "ASSIGNMENT",
                                    duration: 0,
                                    isCompleted: false,
                                    isLocked: false,
                                    isPreview: false,
                                },
                            ],
                        },
                        {
                            id: "ch-3",
                            title: "Advanced Patterns",
                            orderIndex: 3,
                            lessons: [
                                {
                                    id: "lesson-5",
                                    title: "Compound Components",
                                    type: "VIDEO",
                                    duration: 1500,
                                    isCompleted: false,
                                    isLocked: true,
                                    isPreview: false,
                                },
                                {
                                    id: "lesson-6",
                                    title: "Render Props Pattern",
                                    type: "VIDEO",
                                    duration: 1200,
                                    isCompleted: false,
                                    isLocked: true,
                                    isPreview: false,
                                },
                            ],
                        },
                    ],
                };
                setCourseStructure(mockStructure);
                // Auto-expand first chapter
                setExpandedChapters(new Set(["ch-1"]));
            } catch (error) {
                console.error("Failed to fetch course structure:", error);
            } finally {
                setLoading(false);
            }
        };

        if (slug) {
            fetchCourseStructure();
        }
    }, [slug]);

    const toggleChapter = (chapterId: string) => {
        const newExpanded = new Set(expandedChapters);
        if (newExpanded.has(chapterId)) {
            newExpanded.delete(chapterId);
        } else {
            newExpanded.add(chapterId);
        }
        setExpandedChapters(newExpanded);
    };

    const getLessonIcon = (lesson: Lesson) => {
        if (lesson.isLocked) {
            return <Lock className="w-4 h-4 text-slate-400" />;
        }
        if (lesson.isCompleted) {
            return <CheckCircle className="w-4 h-4 text-green-500" />;
        }

        switch (lesson.type) {
            case "VIDEO":
                return <PlayCircle className="w-4 h-4 text-blue-500" />;
            case "DOCUMENT":
                return <FileText className="w-4 h-4 text-purple-500" />;
            case "QUIZ":
                return <ClipboardCheck className="w-4 h-4 text-orange-500" />;
            case "ASSIGNMENT":
                return <ClipboardCheck className="w-4 h-4 text-red-500" />;
            case "EXAM":
                return <Award className="w-4 h-4 text-red-600" />;
            default:
                return null;
        }
    };

    const formatDuration = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        return `${minutes} min`;
    };

    const isCurrentLesson = (lessonId: string) => {
        return pathname?.includes(lessonId);
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

    if (!courseStructure) return null;

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
                        {courseStructure.title}
                    </h2>
                    <div className="mt-3">
                        <div className="flex items-center justify-between text-sm mb-1">
                            <span className="text-slate-600 dark:text-slate-400">Course Progress</span>
                            <span className="font-semibold text-slate-900 dark:text-slate-100">
                                {courseStructure.progress}%
                            </span>
                        </div>
                        <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                            <div
                                className="bg-blue-600 h-2 rounded-full transition-all"
                                style={{ width: `${courseStructure.progress}%` }}
                            />
                        </div>
                    </div>
                </div>

                {/* Chapters & Lessons */}
                <div className="flex-1 overflow-y-auto">
                    {courseStructure.chapters.map((chapter) => (
                        <div key={chapter.id} className="border-b border-slate-200 dark:border-slate-800">
                            {/* Chapter Header */}
                            <button
                                onClick={() => toggleChapter(chapter.id)}
                                className="w-full p-4 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors text-left"
                            >
                                <div className="flex-1">
                                    <h3 className="font-medium text-slate-900 dark:text-slate-100">
                                        {chapter.orderIndex}. {chapter.title}
                                    </h3>
                                    <p className="text-xs text-slate-500 dark:text-slate-500 mt-1">
                                        {chapter.lessons.length} lessons
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
                                    {chapter.lessons.map((lesson) => {
                                        const isCurrent = isCurrentLesson(lesson.id);
                                        const isClickable = !lesson.isLocked;

                                        return (
                                            <Link
                                                key={lesson.id}
                                                href={
                                                    isClickable
                                                        ? lesson.type === "QUIZ"
                                                            ? `/learner/learn/${slug}/quiz/${lesson.id}`
                                                            : lesson.type === "ASSIGNMENT"
                                                                ? `/learner/learn/${slug}/assignment/${lesson.id}`
                                                                : `/learner/learn/${slug}/lesson/${lesson.id}`
                                                        : "#"
                                                }
                                                className={`block px-4 py-3 pl-8 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors ${isCurrent ? "bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-600" : ""
                                                    } ${!isClickable ? "cursor-not-allowed opacity-50" : ""}`}
                                                onClick={(e) => {
                                                    if (!isClickable) e.preventDefault();
                                                }}
                                            >
                                                <div className="flex items-start gap-3">
                                                    <div className="mt-0.5">{getLessonIcon(lesson)}</div>
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
                                                            {lesson.duration > 0 && (
                                                                <span className="text-xs text-slate-500 dark:text-slate-500">
                                                                    {formatDuration(lesson.duration)}
                                                                </span>
                                                            )}
                                                            {lesson.isPreview && (
                                                                <span className="text-xs text-blue-600 dark:text-blue-400">
                                                                    Preview
                                                                </span>
                                                            )}
                                                            {lesson.isLocked && (
                                                                <span className="text-xs text-slate-500 dark:text-slate-500">
                                                                    Locked
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
