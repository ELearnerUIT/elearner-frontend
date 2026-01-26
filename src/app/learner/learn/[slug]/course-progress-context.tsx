"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from "react";
import type { CourseProgressResponse } from "@/services/learning/progress.types";

interface CourseProgressContextType {
    progress: CourseProgressResponse | null;
    setProgress: (progress: CourseProgressResponse | null) => void;
    refreshProgress: () => void;
    triggerRefresh: number; // Counter to trigger re-fetch in layout
}

const CourseProgressContext = createContext<CourseProgressContextType | undefined>(undefined);

export function CourseProgressProvider({ children }: { children: ReactNode }) {
    const [progress, setProgress] = useState<CourseProgressResponse | null>(null);
    const [triggerRefresh, setTriggerRefresh] = useState(0);

    const refreshProgress = useCallback(() => {
        // Increment the counter to trigger a re-fetch in the layout
        setTriggerRefresh(prev => prev + 1);
    }, []);

    return (
        <CourseProgressContext.Provider
            value={{
                progress,
                setProgress,
                refreshProgress,
                triggerRefresh,
            }}
        >
            {children}
        </CourseProgressContext.Provider>
    );
}

export function useCourseProgress() {
    const context = useContext(CourseProgressContext);
    if (context === undefined) {
        throw new Error("useCourseProgress must be used within a CourseProgressProvider");
    }
    return context;
}
