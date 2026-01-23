"use client";

import { useEffect } from "react";
import { useRouter, useParams } from "next/navigation";

export default function LearnCoursePage() {
    const router = useRouter();
    const params = useParams();
    const slug = params?.slug as string;

    useEffect(() => {
        // TODO: Get the first lesson or last accessed lesson from API
        // For now, redirect to a default lesson
        router.push(`/learner/learn/${slug}/lesson/lesson-1`);
    }, [slug, router]);

    return (
        <div className="flex items-center justify-center h-screen bg-slate-50 dark:bg-slate-950">
            <div className="text-center">
                <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-slate-600 dark:text-slate-400">Loading course...</p>
            </div>
        </div>
    );
}
