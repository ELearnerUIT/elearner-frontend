"use client";

import { useState, useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { coursePreviewService } from "@/services/courses/course-preview.service";
import { X, Loader2 } from "lucide-react";
import { toast } from "sonner";
import Hls from "hls.js";

interface PreviewVideoPlayerProps {
    lessonId: number;
    onClose: () => void;
}

export default function PreviewVideoPlayer({
    lessonId,
    onClose,
}: PreviewVideoPlayerProps) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const hlsRef = useRef<Hls | null>(null);
    const videoRefreshIntervalRef = useRef<NodeJS.Timeout | null>(null);
    const [videoUrl, setVideoUrl] = useState<string | null>(null);
    const [isLoadingVideo, setIsLoadingVideo] = useState(true);
    const [videoError, setVideoError] = useState<string | null>(null);

    // Function to load video stream
    const loadVideoStream = async (lessonId: number) => {
        try {
            setIsLoadingVideo(true);
            setVideoError(null);
            const result = await coursePreviewService.getPreviewVideoStreamUrl(lessonId);
            setVideoUrl(result.streamUrl);
        } catch (error) {
            console.error("Failed to load video stream:", error);
            setVideoError("Failed to load video");
            toast.error("Failed to load preview video");
        } finally {
            setIsLoadingVideo(false);
        }
    };

    // Load video and setup auto-refresh
    useEffect(() => {
        loadVideoStream(lessonId);

        // Setup auto-refresh every 50 minutes (presigned URLs valid for 1 hour)
        if (videoRefreshIntervalRef.current) {
            clearInterval(videoRefreshIntervalRef.current);
        }

        videoRefreshIntervalRef.current = setInterval(() => {
            console.log("Auto-refreshing video stream URL...");
            loadVideoStream(lessonId);
        }, 50 * 60 * 1000); // 50 minutes

        return () => {
            if (videoRefreshIntervalRef.current) {
                clearInterval(videoRefreshIntervalRef.current);
            }
        };
    }, [lessonId]);

    // Setup HLS player
    useEffect(() => {
        if (!videoUrl || !videoRef.current) return;

        const video = videoRef.current;

        // Clean up previous HLS instance
        if (hlsRef.current) {
            hlsRef.current.destroy();
        }

        // Check if the video URL is a data URL containing HLS playlist
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
                    video.play().catch(e => console.log("Auto-play prevented:", e));
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
                                loadVideoStream(lessonId);
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
                    video.play().catch(e => console.log("Auto-play prevented:", e));
                });
            }
        } else {
            // Regular video URL
            video.src = videoUrl;
        }

        return () => {
            if (hlsRef.current) {
                hlsRef.current.destroy();
                hlsRef.current = null;
            }
        };
    }, [videoUrl, lessonId]);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (hlsRef.current) {
                hlsRef.current.destroy();
            }
            if (videoRefreshIntervalRef.current) {
                clearInterval(videoRefreshIntervalRef.current);
            }
        };
    }, []);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4">
            <div className="relative w-full max-w-6xl">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute -top-12 right-0 p-2 text-white hover:text-gray-300 transition z-10"
                    aria-label="Close video player"
                >
                    <X className="h-6 w-6" />
                </button>

                {/* Video Player */}
                <div className="relative aspect-video bg-black rounded-lg overflow-hidden shadow-2xl">
                    {isLoadingVideo && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/80">
                            <div className="text-center">
                                <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
                                <p className="text-white text-sm">Loading preview...</p>
                            </div>
                        </div>
                    )}

                    {videoError && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/80 text-white">
                            <div className="text-center">
                                <p className="mb-4 text-lg">{videoError}</p>
                                <button
                                    onClick={onClose}
                                    className="px-6 py-2 bg-primary hover:bg-primary/80 rounded-lg transition"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    )}

                    {!videoError && (
                        <video
                            ref={videoRef}
                            controls
                            className="w-full h-full bg-black"
                            playsInline
                        >
                            Your browser does not support the video tag.
                        </video>
                    )}
                </div>

                {/* Video Info */}
                <div className="mt-4 text-white">
                    <p className="text-sm text-gray-400">Preview Video</p>
                </div>
            </div>
        </div>
    );
}
