"use client";

import { useEffect, useState, useRef } from "react";
import { useParams } from "next/navigation";
import { PlayCircle, Download, FileText, CheckCircle, ChevronRight } from "lucide-react";

interface LessonResource {
    id: string;
    title: string;
    fileUrl: string;
    fileType: string;
    fileSize: string;
}

interface LessonDetail {
    id: string;
    title: string;
    type: "VIDEO" | "DOCUMENT";
    content?: string; // HTML for document
    videoUrl?: string;
    duration: number;
    description?: string;
    resources: LessonResource[];
    isCompleted: boolean;
}

export default function LessonPage() {
    const params = useParams();
    const lessonId = params?.lessonId as string;
    const videoRef = useRef<HTMLVideoElement>(null);

    const [lesson, setLesson] = useState<LessonDetail | null>(null);
    const [loading, setLoading] = useState(true);
    const [videoProgress, setVideoProgress] = useState(0);

    useEffect(() => {
        // TODO: Replace with actual API call
        const fetchLesson = async () => {
            setLoading(true);
            try {
                const mockLesson: LessonDetail = {
                    id: lessonId,
                    title: "Welcome to the Course",
                    type: "VIDEO",
                    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
                    duration: 420,
                    description: "In this lesson, we'll introduce you to the course structure and what you'll learn.",
                    resources: [
                        {
                            id: "res-1",
                            title: "Course Syllabus.pdf",
                            fileUrl: "#",
                            fileType: "PDF",
                            fileSize: "2.3 MB",
                        },
                        {
                            id: "res-2",
                            title: "Setup Guide.docx",
                            fileUrl: "#",
                            fileType: "DOCX",
                            fileSize: "156 KB",
                        },
                    ],
                    isCompleted: false,
                };
                setLesson(mockLesson);
            } catch (error) {
                console.error("Failed to fetch lesson:", error);
            } finally {
                setLoading(false);
            }
        };

        if (lessonId) {
            fetchLesson();
        }
    }, [lessonId]);

    const handleVideoProgress = () => {
        if (videoRef.current) {
            const progress = (videoRef.current.currentTime / videoRef.current.duration) * 100;
            setVideoProgress(progress);

            // Auto-mark as complete when watched > 90%
            if (progress > 90 && lesson && !lesson.isCompleted) {
                markAsCompleted();
            }
        }
    };

    const markAsCompleted = async () => {
        // TODO: Call API to mark lesson as completed
        console.log("Marking lesson as completed");
        if (lesson) {
            setLesson({ ...lesson, isCompleted: true });
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
                        {lesson.isCompleted && (
                            <div className="flex items-center gap-2 px-4 py-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-lg">
                                <CheckCircle className="w-5 h-5" />
                                <span className="font-medium">Completed</span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Video Player or Document Viewer */}
                {lesson.type === "VIDEO" && lesson.videoUrl && (
                    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
                        <div className="aspect-video bg-black">
                            <video
                                ref={videoRef}
                                className="w-full h-full"
                                controls
                                onTimeUpdate={handleVideoProgress}
                                src={lesson.videoUrl}
                            >
                                Your browser does not support the video tag.
                            </video>
                        </div>
                        <div className="p-4">
                            <div className="flex items-center justify-between text-sm text-slate-600 dark:text-slate-400">
                                <span>Video Progress: {Math.round(videoProgress)}%</span>
                                <span>Duration: {Math.floor(lesson.duration / 60)} minutes</span>
                            </div>
                        </div>
                    </div>
                )}

                {lesson.type === "DOCUMENT" && lesson.content && (
                    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-8">
                        <div
                            className="prose dark:prose-invert max-w-none"
                            dangerouslySetInnerHTML={{ __html: lesson.content }}
                        />
                    </div>
                )}

                {/* Resources */}
                {lesson.resources.length > 0 && (
                    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6">
                        <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-4 flex items-center gap-2">
                            <FileText className="w-5 h-5" />
                            Downloadable Resources
                        </h2>
                        <div className="space-y-3">
                            {lesson.resources.map((resource) => (
                                <a
                                    key={resource.id}
                                    href={resource.fileUrl}
                                    download
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
                                                {resource.fileType} • {resource.fileSize}
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
                {!lesson.isCompleted && (
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
