"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { learnerCourseService } from "@/services/learner/courseService";
import { progressService } from "@/services/learning/progress.service";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

export default function LearnCoursePage() {
    const router = useRouter();
    const params = useParams();
    const slug = params?.slug as string;
    const { user } = useAuth();
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const getResumeLessonAndRedirect = async () => {
            try {
                if (!user?.profile?.studentId) {
                    toast.error("Please login to access this course");
                    router.push(`/login?redirect=/learner/learn/${slug}`);
                    return;
                }

                // Step 1: Get course by slug to retrieve courseId
                const course = await learnerCourseService.getCourseBySlug(slug);
                
                if (!course?.id) {
                    throw new Error("Course not found");
                }

                // Step 2: Get student's progress for this course
                const courseProgress = await progressService.getStudentCourseProgress(
                    user.profile?.studentId,
                    course.id
                );

                // Step 3: Find the lesson to resume
                let targetLessonId: number | null = null;
                console.log("Candidate lesson to resume:", courseProgress);

                if (courseProgress.chapterProgress && courseProgress.chapterProgress.length > 0) {
                    // Look for the first incomplete lesson with the most recent viewedAt
                    let candidateLesson: { id: number; viewedAt?: string | null } | null = null;

                    for (const chapter of courseProgress.chapterProgress) {
                        if (chapter.lessonProgress) {
                            for (const lesson of chapter.lessonProgress) {
                                // Find first incomplete lesson (NOT_VIEWED or IN_PROGRESS)
                                if (lesson.status !== "COMPLETED") {
                                    // If this lesson has been viewed, consider it
                                    if (lesson.viewedAt) {
                                        if (!candidateLesson || 
                                            (lesson.viewedAt > (candidateLesson.viewedAt || ""))) {
                                            candidateLesson = {
                                                id: lesson.lessonId,
                                                viewedAt: lesson.viewedAt
                                            };
                                        }
                                    } else if (!candidateLesson) {
                                        // If no viewed lesson found yet, use first incomplete lesson
                                        candidateLesson = { id: lesson.lessonId };
                                    }
                                }
                            }
                        }
                    }

                    // If no incomplete lesson found, find the first lesson overall
                    if (!candidateLesson) {
                        const firstChapter = courseProgress.chapterProgress[0];
                        
                        if (firstChapter?.lessonProgress && firstChapter.lessonProgress.length > 0) {
                            const firstLesson = firstChapter.lessonProgress[0];
                            candidateLesson = { id: firstLesson.lessonId };
                        }
                    }
                    

                    targetLessonId = candidateLesson?.id || null;
                }

                // Step 4: Redirect to the resolved lesson
                if (targetLessonId) {
                    router.push(`/learner/learn/${slug}/lesson/${targetLessonId}`);
                } else {
                    throw new Error("No lessons found in this course");
                }

            } catch (err: any) {
                console.error("Error loading course:", err);
                const errorMessage = err?.message || "Failed to load course";
                setError(errorMessage);
                toast.error(errorMessage);
                
                // Redirect to course detail page after error
                setTimeout(() => {
                    router.push(`/courses/${slug}`);
                }, 2000);
            }
        };

        if (slug) {
            getResumeLessonAndRedirect();
        }
    }, [slug, router, user]);

    if (error) {
        return (
            <div className="flex items-center justify-center h-screen bg-slate-50 dark:bg-slate-950">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-red-600 dark:text-red-400 mb-2">{error}</p>
                    <p className="text-slate-600 dark:text-slate-400 text-sm">Redirecting to course page...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex items-center justify-center h-screen bg-slate-50 dark:bg-slate-950">
            <div className="text-center">
                <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-slate-600 dark:text-slate-400">Loading course...</p>
            </div>
        </div>
    );
}
