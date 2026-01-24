"use client";

import { useEffect, useState, useRef } from "react";
import { useParams } from "next/navigation";
import { PlayCircle, Download, FileText, CheckCircle, ChevronRight } from "lucide-react";
import studentCourseService from "@/services/learning/student-course.service";
import { progressService } from "@/services/learning/progress.service";
import { AppError } from "@/lib/api/api.error";
import type { LessonDTO, LessonResourceResponse } from "@/services/learning/student-course.types";
import type { LessonProgressResponse } from "@/services/learning/progress.types";
import { useCourseProgress } from "../../course-progress-context";

export default function LessonPage() {
    const params = useParams();
    const lessonId = params?.lessonId as string;
    const videoRef = useRef<HTMLVideoElement>(null);
    const { refreshProgress } = useCourseProgress();

    const [lesson, setLesson] = useState<LessonDTO | null>(null);
    const [resources, setResources] = useState<LessonResourceResponse[]>([]);
    const [progress, setProgress] = useState<LessonProgressResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [videoProgress, setVideoProgress] = useState(0);

    useEffect(() => {
        const fetchLesson = async () => {
            setLoading(true);
            setError(null);

            try {
                const lessonData = await studentCourseService.getLessonDetails(Number(lessonId));
                setLesson(lessonData);

                // Fetch resources in parallel
                const resourcesData = await studentCourseService.getLessonResources(Number(lessonId));
                setResources(resourcesData);

                // Mark lesson as viewed on first load
                const progressData = await progressService.markLessonAsViewed(Number(lessonId));
                setProgress(progressData);
            } catch (err) {
                console.error("Failed to fetch lesson:", err);
                if (err instanceof AppError) {
                    setError(err.message);
                } else {
                    setError("Failed to load lesson. Please try again.");
                }
            } finally {
                setLoading(false);
            }
        };

        if (lessonId) {
            fetchLesson();
        }
    }, [lessonId]);

    const handleVideoProgress = async () => {
        if (videoRef.current) {
            const currentTime = videoRef.current.currentTime;
            const duration = videoRef.current.duration;
            const progressPercent = (currentTime / duration) * 100;
            setVideoProgress(progressPercent);

            // Update watched duration every 10 seconds
            if (Math.floor(currentTime) % 10 === 0) {
                try {
                    await progressService.updateWatchedDuration(Number(lessonId), {
                        watchedDurationSeconds: Math.floor(currentTime)
                    });
                } catch (err) {
                    console.error("Failed to update watched duration:", err);
                }
            }

            // Auto-mark as complete when watched > 90%
            if (progressPercent > 90 && progress && progress.status !== "COMPLETED") {
                markAsCompleted();
            }
        }
    };

    const markAsCompleted = async () => {
        try {
            const updatedProgress = await progressService.markLessonAsCompleted(Number(lessonId));
            setProgress(updatedProgress);

            // Refresh the sidebar to reflect the updated completion status
            refreshProgress();
        } catch (err) {
            console.error("Failed to mark lesson as completed:", err);
            if (err instanceof AppError) {
                setError(err.message);
            }
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen bg-slate-50 dark:bg-slate-950">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-slate-600 dark:text-slate-400">Loading lesson...</p>
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

    if (!lesson) {
        return (
            <div className="flex items-center justify-center h-screen bg-slate-50 dark:bg-slate-950">
                <div className="text-center">
                    <p className="text-slate-600 dark:text-slate-400">Lesson not found</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
            <div className="max-w-5xl mx-auto p-6 space-y-6">
                {/* Lesson Header */}
                <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6">
                    <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                            <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
                                {lesson.title}
                            </h1>
                            {lesson.description && (
                                <p className="text-slate-600 dark:text-slate-400 mt-2">
                                    {lesson.description}
                                </p>
                            )}
                        </div>
                        {progress?.status === "COMPLETED" && (
                            <div className="flex items-center gap-2 px-4 py-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-lg">
                                <CheckCircle className="w-5 h-5" />
                                <span className="font-medium">Completed</span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Video Player or Document Viewer */}
                {lesson.lessonType === "VIDEO" && lesson.videoUrl && (
                    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
                        <div className="aspect-video bg-black flex items-center justify-center">
                            {/* TODO: Implement video streaming with HLS */}
                            <div className="text-center text-white">
                                <PlayCircle className="w-16 h-16 mx-auto mb-4 opacity-50" />
                                <p className="text-lg">Video Player</p>
                                <p className="text-sm opacity-70 mt-2">Video streaming will be implemented</p>
                            </div>
                        </div>
                        <div className="p-4">
                            <div className="flex items-center justify-between text-sm text-slate-600 dark:text-slate-400">
                                <span>Video Progress: {Math.round(videoProgress)}%</span>
                                {lesson.videoDuration && (
                                    <span>Duration: {Math.floor(lesson.videoDuration / 60)} minutes</span>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {/* Resources */}
                {resources.length > 0 && (
                    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6">
                        <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-4 flex items-center gap-2">
                            <FileText className="w-5 h-5" />
                            Downloadable Resources
                        </h2>
                        <div className="space-y-3">
                            {resources.map((resource) => (
                                <a
                                    key={resource.id}
                                    href={resource.downloadUrl || resource.externalUrl || "#"}
                                    download={resource.isDownloadable}
                                    target={resource.resourceType === "LINK" ? "_blank" : undefined}
                                    rel={resource.resourceType === "LINK" ? "noopener noreferrer" : undefined}
                                    className="flex items-center justify-between p-4 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors group"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                                            <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                                        </div>
                                        <div>
                                            <p className="font-medium text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                                                {resource.title}
                                            </p>
                                            <p className="text-sm text-slate-500 dark:text-slate-500">
                                                {resource.resourceType} {resource.formattedFileSize && `• ${resource.formattedFileSize}`}
                                            </p>
                                        </div>
                                    </div>
                                    <Download className="w-5 h-5 text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400" />
                                </a>
                            ))}
                        </div>
                    </div>
                )}

                {/* Complete Lesson Button */}
                {progress?.status !== "COMPLETED" && (
                    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6">
                        <button
                            onClick={markAsCompleted}
                            className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                        >
                            <CheckCircle className="w-5 h-5" />
                            Mark as Complete
                            <ChevronRight className="w-5 h-5" />
                        </button>
                        <p className="text-sm text-slate-600 dark:text-slate-400 text-center mt-3">
                            Click to mark this lesson as completed and continue to the next one
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
