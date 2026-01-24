"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import Hls from "hls.js";
import {
    PlayCircle,
    Download,
    FileText,
    CheckCircle,
    ChevronRight,
    ChevronLeft,
    Loader2,
    Link2,
    ExternalLink,
} from "lucide-react";
import studentCourseService from "@/services/learning/student-course.service";
import { progressService } from "@/services/learning/progress.service";
import { AppError } from "@/lib/api/api.error";
import type { LessonDTO, LessonResourceResponse, VideoStreamingResponse } from "@/services/learning/student-course.types";
import type { LessonProgressResponse } from "@/services/learning/progress.types";
import { useCourseProgress } from "../../course-progress-context";
import { toast } from "sonner";

export default function LessonPage() {
    const params = useParams();
    const router = useRouter();
    const lessonId = params?.lessonId as string;
    const slug = params?.slug as string;
    const videoRef = useRef<HTMLVideoElement>(null);
    const hlsRef = useRef<Hls | null>(null);
    const videoRefreshIntervalRef = useRef<NodeJS.Timeout | null>(null);
    const lastProgressUpdateRef = useRef<number>(0);
    const { refreshProgress } = useCourseProgress();

    const [lesson, setLesson] = useState<LessonDTO | null>(null);
    const [resources, setResources] = useState<LessonResourceResponse[]>([]);
    const [progress, setProgress] = useState<LessonProgressResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [videoUrl, setVideoUrl] = useState<string | null>(null);
    const [loadingVideo, setLoadingVideo] = useState(false);
    const [videoProgress, setVideoProgress] = useState(0);
    const [markingComplete, setMarkingComplete] = useState(false);

    // Fetch lesson data
    useEffect(() => {
        const fetchLesson = async () => {
            setLoading(true);
            setError(null);

            try {
                console.log("[LessonPage] Fetching lesson:", lessonId);
                const lessonData = await studentCourseService.getLessonDetails(Number(lessonId));
                console.log("[LessonPage] Lesson data:", lessonData);
                setLesson(lessonData);

                // Fetch resources in parallel
                console.log("[LessonPage] Fetching resources for lesson:", lessonId);
                const resourcesData = await studentCourseService.getLessonResources(Number(lessonId));
                console.log("[LessonPage] Resources:", resourcesData);
                setResources(resourcesData);

                // Mark lesson as viewed on first load
                console.log("[LessonPage] Marking lesson as viewed:", lessonId);
                const progressData = await progressService.markLessonAsViewed(Number(lessonId));
                console.log("[LessonPage] Progress data:", progressData);
                setProgress(progressData);
            } catch (err) {
                console.error("[LessonPage] Failed to fetch lesson:", err);
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

    // Load video stream for VIDEO lessons
    const loadVideoStream = useCallback(async (id: number) => {
        try {
            setLoadingVideo(true);
            const streamResponse: VideoStreamingResponse = await studentCourseService.getVideoStreamingUrl(id);
            setVideoUrl(streamResponse.streamingUrl);
        } catch (error: any) {
            console.error("Failed to load video stream:", error);
            toast.error(error?.message || "Failed to load video");
            setVideoUrl(null);
        } finally {
            setLoadingVideo(false);
        }
    }, []);

    // Setup video streaming when lesson is VIDEO type
    useEffect(() => {
        const isVideoLesson = lesson?.lessonType?.toUpperCase() === "VIDEO";

        if (isVideoLesson) {
            console.log("[LessonPage] Initializing video stream for lesson:", lessonId);
            loadVideoStream(Number(lessonId));

            // Setup auto-refresh every 50 minutes (presigned URLs valid for 1 hour)
            if (videoRefreshIntervalRef.current) {
                clearInterval(videoRefreshIntervalRef.current);
            }

            videoRefreshIntervalRef.current = setInterval(() => {
                console.log("Auto-refreshing video stream URL...");
                loadVideoStream(Number(lessonId));
            }, 50 * 60 * 1000);
        } else {
            console.log("[LessonPage] Not a video lesson, type:", lesson?.lessonType);
            setVideoUrl(null);
            if (hlsRef.current) {
                hlsRef.current.destroy();
                hlsRef.current = null;
            }
        }

        return () => {
            if (videoRefreshIntervalRef.current) {
                clearInterval(videoRefreshIntervalRef.current);
            }
        };
    }, [lesson, lessonId, loadVideoStream]);

    // Setup HLS player
    useEffect(() => {
        if (!videoUrl || !videoRef.current) return;

        const video = videoRef.current;

        if (hlsRef.current) {
            hlsRef.current.destroy();
        }

        // Handle base64 m3u8 data URL (matching teacher view implementation)
        if (videoUrl.startsWith("data:application/vnd.apple.mpegurl")) {
            const base64Data = videoUrl.split(",")[1];
            const playlistContent = atob(base64Data);

            if (Hls.isSupported()) {
                const hls = new Hls({
                    enableWorker: true,
                    lowLatencyMode: false,
                    backBufferLength: 90,
                });

                hlsRef.current = hls;
                const blob = new Blob([playlistContent], { type: "application/vnd.apple.mpegurl" });
                const blobUrl = URL.createObjectURL(blob);

                hls.loadSource(blobUrl);
                hls.attachMedia(video);

                hls.on(Hls.Events.MANIFEST_PARSED, () => {
                    video.play().catch((e) => console.log("Auto-play prevented:", e));
                });

                hls.on(Hls.Events.ERROR, (event, data) => {
                    console.error("HLS Error:", data);
                    if (data.fatal) {
                        switch (data.type) {
                            case Hls.ErrorTypes.NETWORK_ERROR:
                                console.log("Network error, trying to recover...");
                                hls.startLoad();
                                break;
                            case Hls.ErrorTypes.MEDIA_ERROR:
                                console.log("Media error, trying to recover...");
                                hls.recoverMediaError();
                                break;
                            default:
                                console.log("Fatal error, refreshing video URL...");
                                loadVideoStream(Number(lessonId));
                                break;
                        }
                    }
                });

                return () => {
                    URL.revokeObjectURL(blobUrl);
                    hls.destroy();
                };
            } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
                // Native HLS support (Safari)
                video.src = videoUrl;
                video.addEventListener("loadedmetadata", () => {
                    video.play().catch((e) => console.log("Auto-play prevented:", e));
                });
            }
        } else {
            // Direct URL (fallback)
            if (Hls.isSupported()) {
                const hls = new Hls({
                    enableWorker: true,
                    lowLatencyMode: false,
                    backBufferLength: 90,
                });

                hlsRef.current = hls;
                hls.loadSource(videoUrl);
                hls.attachMedia(video);

                hls.on(Hls.Events.MANIFEST_PARSED, () => {
                    video.play().catch((e) => console.log("Auto-play prevented:", e));
                });

                hls.on(Hls.Events.ERROR, (event, data) => {
                    console.error("HLS Error:", data);
                    if (data.fatal) {
                        switch (data.type) {
                            case Hls.ErrorTypes.NETWORK_ERROR:
                                console.log("Network error, trying to recover...");
                                hls.startLoad();
                                break;
                            case Hls.ErrorTypes.MEDIA_ERROR:
                                console.log("Media error, trying to recover...");
                                hls.recoverMediaError();
                                break;
                            default:
                                console.log("Fatal error, refreshing video URL...");
                                loadVideoStream(Number(lessonId));
                                break;
                        }
                    }
                });

                return () => {
                    hls.destroy();
                };
            } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
                video.src = videoUrl;
                video.addEventListener("loadedmetadata", () => {
                    video.play().catch((e) => console.log("Auto-play prevented:", e));
                });
            }
        }

        return () => {
            if (hlsRef.current) {
                hlsRef.current.destroy();
                hlsRef.current = null;
            }
        };
    }, [videoUrl, lessonId, loadVideoStream]);

    // Handle video progress tracking
    const handleVideoProgress = async () => {
        if (videoRef.current) {
            const currentTime = videoRef.current.currentTime;
            const duration = videoRef.current.duration;

            if (duration > 0) {
                const progressPercent = (currentTime / duration) * 100;
                setVideoProgress(progressPercent);

                // Update watched duration every 30 seconds
                const currentSeconds = Math.floor(currentTime);
                if (currentSeconds - lastProgressUpdateRef.current >= 30) {
                    lastProgressUpdateRef.current = currentSeconds;
                    try {
                        await progressService.updateWatchedDuration(Number(lessonId), {
                            watchedDurationSeconds: currentSeconds,
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
        }
    };

    const markAsCompleted = async () => {
        if (markingComplete) return;
        setMarkingComplete(true);

        try {
            const updatedProgress = await progressService.markLessonAsCompleted(Number(lessonId));
            setProgress(updatedProgress);
            toast.success("Lesson marked as completed!");
            refreshProgress();
        } catch (err) {
            console.error("Failed to mark lesson as completed:", err);
            if (err instanceof AppError) {
                toast.error(err.message);
            }
        } finally {
            setMarkingComplete(false);
        }
    };

    const handleDownloadResource = async (resource: LessonResourceResponse) => {
        try {
            if (resource.downloadUrl) {
                window.open(resource.downloadUrl, "_blank");
            } else {
                // Get fresh download URL
                const resourceDetails = await studentCourseService.getResourceDetails(
                    Number(lessonId),
                    resource.id
                );
                if (resourceDetails.downloadUrl) {
                    window.open(resourceDetails.downloadUrl, "_blank");
                }
            }
        } catch (err) {
            console.error("Failed to download resource:", err);
            toast.error("Failed to download resource");
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

                {/* Video Player */}
                {lesson.lessonType?.toUpperCase() === "VIDEO" && (
                    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
                        BALLS
                        <div className="aspect-video bg-black relative">
                            {loadingVideo ? (
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <Loader2 className="w-12 h-12 text-white animate-spin" />
                                </div>
                            ) : videoUrl ? (
                                <video
                                    ref={videoRef}
                                    controls
                                    className="w-full h-full"
                                    onTimeUpdate={handleVideoProgress}
                                    onEnded={markAsCompleted}
                                />
                            ) : (
                                <div className="absolute inset-0 flex items-center justify-center text-white">
                                    <div className="text-center">
                                        <PlayCircle className="w-16 h-16 mx-auto mb-4 opacity-50" />
                                        <p className="text-lg">Video not available</p>
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="p-4">
                            <div className="flex items-center justify-between text-sm text-slate-600 dark:text-slate-400">
                                <span>Video Progress: {Math.round(videoProgress)}%</span>
                                {lesson.videoDuration && (
                                    <span>Duration: {Math.floor(lesson.videoDuration / 60)} minutes</span>
                                )}
                            </div>
                            <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2 mt-2">
                                <div
                                    className="bg-blue-600 h-2 rounded-full transition-all"
                                    style={{ width: `${videoProgress}%` }}
                                />
                            </div>
                        </div>
                    </div>
                )}

                {/* Document/Article Content */}
                {((lesson.lessonType?.toUpperCase() === "DOCUMENT" || lesson.lessonType?.toUpperCase() === "ARTICLE") && lesson.content) ? (
                    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6">
                        <div className="prose dark:prose-invert max-w-none">
                            <div dangerouslySetInnerHTML={{ __html: lesson.content }} />
                        </div>
                    </div>
                ) : null}

                {/* Fallback for unknown/empty content */}
                {lesson.lessonType?.toUpperCase() !== "VIDEO" &&
                    lesson.lessonType?.toUpperCase() !== "QUIZ" &&
                    lesson.lessonType?.toUpperCase() !== "ASSIGNMENT" &&
                    (!lesson.content || (lesson.lessonType?.toUpperCase() !== "DOCUMENT" && lesson.lessonType?.toUpperCase() !== "ARTICLE")) && (
                        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-12 text-center">
                            <FileText className="w-16 h-16 mx-auto mb-4 text-slate-300" />
                            <h3 className="text-lg font-medium text-slate-900 dark:text-slate-100 mb-2">
                                No Content Available
                            </h3>
                            <p className="text-slate-500 dark:text-slate-400">
                                This lesson (Type: {lesson.lessonType}) has no displayable content.
                            </p>
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
                                <div
                                    key={resource.id}
                                    className="flex items-center justify-between p-4 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                                            {resource.resourceType === "LINK" ? (
                                                <Link2 className="w-5 h-5 text-green-600 dark:text-green-400" />
                                            ) : (
                                                <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                                            )}
                                        </div>
                                        <div>
                                            <p className="font-medium text-slate-900 dark:text-slate-100">
                                                {resource.title}
                                            </p>
                                            {resource.description && (
                                                <p className="text-sm text-slate-500 dark:text-slate-500">
                                                    {resource.description}
                                                </p>
                                            )}
                                            {resource.fileSize && (
                                                <p className="text-xs text-slate-400 mt-1">
                                                    {(resource.fileSize / 1024 / 1024).toFixed(2)} MB
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                    {resource.resourceType === "LINK" && resource.resourceUrl ? (
                                        <a
                                            href={resource.resourceUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors inline-flex items-center gap-2"
                                        >
                                            <ExternalLink className="w-4 h-4" />
                                            Open
                                        </a>
                                    ) : (
                                        <button
                                            onClick={() => handleDownloadResource(resource)}
                                            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors inline-flex items-center gap-2"
                                        >
                                            <Download className="w-4 h-4" />
                                            Download
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Complete Lesson Button */}
                {progress?.status !== "COMPLETED" && (
                    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6">
                        <button
                            onClick={markAsCompleted}
                            disabled={markingComplete}
                            className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50"
                        >
                            {markingComplete ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                                <CheckCircle className="w-5 h-5" />
                            )}
                            Mark as Complete
                            <ChevronRight className="w-5 h-5" />
                        </button>
                        <p className="text-sm text-slate-600 dark:text-slate-400 text-center mt-3">
                            Click to mark this lesson as completed and continue to the next one
                        </p>
                    </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex gap-3">
                    <button
                        onClick={() => router.back()}
                        className="px-4 py-2 bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg transition-colors inline-flex items-center gap-2"
                    >
                        <ChevronLeft className="w-4 h-4" />
                        Previous
                    </button>
                    <button
                        onClick={() => router.push(`/learner/learn/${slug}`)}
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors inline-flex items-center gap-2"
                    >
                        Next Lesson
                        <ChevronRight className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    );
}
