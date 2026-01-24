"use client";

import { useEffect, useState, useMemo } from "react";
import { Calendar as CalendarIcon, Clock, AlertCircle, CheckCircle, Filter } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useAssignments } from "@/hooks/learner/useAssignment";
import { useQuizzes } from "@/hooks/learner/useQuiz";

interface CalendarEvent {
    id: string;
    title: string;
    courseTitle: string;
    courseSlug: string;
    type: "QUIZ" | "ASSIGNMENT" | "EXAM";
    dueDate: string;
    status: "UPCOMING" | "DUE_SOON" | "OVERDUE" | "COMPLETED";
    description?: string;
}

export default function CalendarPage() {
    const { user } = useAuth();
    const studentId = user?.profile?.studentId;

    // Fetch assignments and quizzes from backend
    const { data: assignmentsData, isLoading: assignmentsLoading } = useAssignments(studentId || 0);
    const { data: quizzesData, isLoading: quizzesLoading } = useQuizzes(studentId || 0);

    const [filteredEvents, setFilteredEvents] = useState<CalendarEvent[]>([]);
    const [filterType, setFilterType] = useState<"ALL" | "QUIZ" | "ASSIGNMENT" | "EXAM">("ALL");
    const [filterStatus, setFilterStatus] = useState<"ALL" | "UPCOMING" | "COMPLETED">("ALL");

    const loading = assignmentsLoading || quizzesLoading;

    // Calculate status based on due date and completion
    const calculateStatus = (dueDate: string, isCompleted: boolean): CalendarEvent["status"] => {
        if (isCompleted) return "COMPLETED";

        const now = new Date();
        const due = new Date(dueDate);
        const diffMs = due.getTime() - now.getTime();
        const diffHours = diffMs / (1000 * 60 * 60);

        if (diffMs < 0) return "OVERDUE";
        if (diffHours <= 48) return "DUE_SOON";
        return "UPCOMING";
    };

    // Combine assignments and quizzes into calendar events
    const events: CalendarEvent[] = useMemo(() => {
        const combined: CalendarEvent[] = [];

        // Add assignments
        if (assignmentsData?.assignments) {
            assignmentsData.assignments.forEach((assignment: any) => {
                combined.push({
                    id: `assignment-${assignment.id}`,
                    title: assignment.title,
                    courseTitle: assignment.courseTitle || "Course",
                    courseSlug: assignment.courseSlug || "",
                    type: "ASSIGNMENT",
                    dueDate: assignment.dueDate,
                    status: calculateStatus(assignment.dueDate, assignment.isSubmitted || false),
                    description: assignment.description,
                });
            });
        }

        // Add quizzes
        if (quizzesData?.quizzes) {
            quizzesData.quizzes.forEach((quiz: any) => {
                combined.push({
                    id: `quiz-${quiz.id}`,
                    title: quiz.title,
                    courseTitle: quiz.courseTitle || "Course",
                    courseSlug: quiz.courseSlug || "",
                    type: "QUIZ",
                    dueDate: quiz.dueDate,
                    status: calculateStatus(quiz.dueDate, quiz.isCompleted || false),
                    description: quiz.description,
                });
            });
        }

        return combined;
    }, [assignmentsData, quizzesData]);

    useEffect(() => {
        let filtered = events;

        if (filterType !== "ALL") {
            filtered = filtered.filter((event) => event.type === filterType);
        }

        if (filterStatus === "UPCOMING") {
            filtered = filtered.filter((event) =>
                event.status === "UPCOMING" || event.status === "DUE_SOON" || event.status === "OVERDUE"
            );
        } else if (filterStatus === "COMPLETED") {
            filtered = filtered.filter((event) => event.status === "COMPLETED");
        }

        // Sort by due date (earliest first)
        filtered.sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());

        setFilteredEvents(filtered);
    }, [filterType, filterStatus, events]);

    const getStatusBadge = (status: CalendarEvent["status"]) => {
        const badges = {
            UPCOMING: {
                bg: "bg-blue-100 dark:bg-blue-900/30",
                text: "text-blue-700 dark:text-blue-400",
                icon: <CalendarIcon className="w-3 h-3" />,
                label: "Upcoming",
            },
            DUE_SOON: {
                bg: "bg-orange-100 dark:bg-orange-900/30",
                text: "text-orange-700 dark:text-orange-400",
                icon: <Clock className="w-3 h-3" />,
                label: "Due Soon",
            },
            OVERDUE: {
                bg: "bg-red-100 dark:bg-red-900/30",
                text: "text-red-700 dark:text-red-400",
                icon: <AlertCircle className="w-3 h-3" />,
                label: "Overdue",
            },
            COMPLETED: {
                bg: "bg-green-100 dark:bg-green-900/30",
                text: "text-green-700 dark:text-green-400",
                icon: <CheckCircle className="w-3 h-3" />,
                label: "Completed",
            },
        };
        return badges[status];
    };

    const getTypeBadge = (type: CalendarEvent["type"]) => {
        const badges = {
            QUIZ: { bg: "bg-purple-100 dark:bg-purple-900/30", text: "text-purple-700 dark:text-purple-400" },
            ASSIGNMENT: { bg: "bg-blue-100 dark:bg-blue-900/30", text: "text-blue-700 dark:text-blue-400" },
            EXAM: { bg: "bg-red-100 dark:bg-red-900/30", text: "text-red-700 dark:text-red-400" },
        };
        return badges[type];
    };

    const formatDueDate = (dateString: string) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffMs = date.getTime() - now.getTime();
        const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
        const diffHours = Math.floor(diffMs / (1000 * 60 * 60));

        if (diffDays > 7) {
            return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
        } else if (diffDays > 1) {
            return `In ${diffDays} days`;
        } else if (diffDays === 1) {
            return "Tomorrow";
        } else if (diffHours > 0) {
            return `In ${diffHours} hours`;
        } else if (diffMs > 0) {
            return "Due today";
        } else {
            return "Overdue";
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-6 animate-pulse">
                <div className="max-w-5xl mx-auto space-y-6">
                    <div className="h-10 bg-slate-200 dark:bg-slate-800 rounded-lg w-64"></div>
                    <div className="space-y-4">
                        {[...Array(5)].map((_, i) => (
                            <div key={i} className="h-32 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800"></div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
            <div className="mx-auto w-full max-w-5xl p-6 space-y-6">
                {/* Header */}
                <div className="space-y-4">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
                            My Calendar
                        </h1>
                        <p className="text-slate-600 dark:text-slate-400 mt-2">
                            Track your upcoming quizzes, assignments, and exams
                        </p>
                    </div>

                    {/* Filters */}
                    <div className="flex flex-wrap gap-3">
                        <div className="flex gap-2 items-center">
                            <Filter className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                            <span className="text-sm font-medium text-slate-600 dark:text-slate-400">Type:</span>
                            <button
                                onClick={() => setFilterType("ALL")}
                                className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${filterType === "ALL"
                                    ? "bg-blue-600 text-white"
                                    : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-300 dark:border-slate-700"
                                    }`}
                            >
                                All
                            </button>
                            <button
                                onClick={() => setFilterType("QUIZ")}
                                className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${filterType === "QUIZ"
                                    ? "bg-blue-600 text-white"
                                    : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-300 dark:border-slate-700"
                                    }`}
                            >
                                Quiz
                            </button>
                            <button
                                onClick={() => setFilterType("ASSIGNMENT")}
                                className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${filterType === "ASSIGNMENT"
                                    ? "bg-blue-600 text-white"
                                    : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-300 dark:border-slate-700"
                                    }`}
                            >
                                Assignment
                            </button>
                            <button
                                onClick={() => setFilterType("EXAM")}
                                className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${filterType === "EXAM"
                                    ? "bg-blue-600 text-white"
                                    : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-300 dark:border-slate-700"
                                    }`}
                            >
                                Exam
                            </button>
                        </div>

                        <div className="flex gap-2 items-center">
                            <span className="text-sm font-medium text-slate-600 dark:text-slate-400">Status:</span>
                            <button
                                onClick={() => setFilterStatus("ALL")}
                                className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${filterStatus === "ALL"
                                    ? "bg-blue-600 text-white"
                                    : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-300 dark:border-slate-700"
                                    }`}
                            >
                                All
                            </button>
                            <button
                                onClick={() => setFilterStatus("UPCOMING")}
                                className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${filterStatus === "UPCOMING"
                                    ? "bg-blue-600 text-white"
                                    : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-300 dark:border-slate-700"
                                    }`}
                            >
                                Upcoming
                            </button>
                            <button
                                onClick={() => setFilterStatus("COMPLETED")}
                                className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${filterStatus === "COMPLETED"
                                    ? "bg-blue-600 text-white"
                                    : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-300 dark:border-slate-700"
                                    }`}
                            >
                                Completed
                            </button>
                        </div>
                    </div>
                </div>

                {/* Events List */}
                {filteredEvents.length === 0 ? (
                    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-12 text-center">
                        <CalendarIcon className="w-16 h-16 mx-auto text-slate-400 dark:text-slate-600 mb-4" />
                        <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2">
                            No events found
                        </h3>
                        <p className="text-slate-600 dark:text-slate-400">
                            You have no {filterStatus === "ALL" ? "" : filterStatus.toLowerCase()} {filterType === "ALL" ? "events" : filterType.toLowerCase() + "s"} at the moment
                        </p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {filteredEvents.map((event) => {
                            const statusBadge = getStatusBadge(event.status);
                            const typeBadge = getTypeBadge(event.type);

                            return (
                                <div
                                    key={event.id}
                                    className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 hover:shadow-lg transition-shadow"
                                >
                                    <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                                        {/* Date Badge */}
                                        <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex flex-col items-center justify-center text-white">
                                            <div className="text-xs font-medium">
                                                {new Date(event.dueDate).toLocaleDateString("en-US", { month: "short" })}
                                            </div>
                                            <div className="text-2xl font-bold">
                                                {new Date(event.dueDate).getDate()}
                                            </div>
                                        </div>

                                        {/* Event Details */}
                                        <div className="flex-1 space-y-2">
                                            <div className="flex flex-wrap items-start justify-between gap-2">
                                                <div>
                                                    <h3 className="font-semibold text-slate-900 dark:text-slate-100 text-lg">
                                                        {event.title}
                                                    </h3>
                                                    <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                                                        {event.courseTitle}
                                                    </p>
                                                </div>
                                                <div className="flex gap-2">
                                                    <span className={`px-2 py-1 rounded text-xs font-medium ${typeBadge.bg} ${typeBadge.text}`}>
                                                        {event.type}
                                                    </span>
                                                    <span className={`px-2 py-1 rounded text-xs font-medium flex items-center gap-1 ${statusBadge.bg} ${statusBadge.text}`}>
                                                        {statusBadge.icon}
                                                        {statusBadge.label}
                                                    </span>
                                                </div>
                                            </div>

                                            {event.description && (
                                                <p className="text-sm text-slate-600 dark:text-slate-400">
                                                    {event.description}
                                                </p>
                                            )}

                                            <div className="flex items-center gap-4 text-sm">
                                                <div className="flex items-center gap-1 text-slate-600 dark:text-slate-400">
                                                    <Clock className="w-4 h-4" />
                                                    <span>{formatDueDate(event.dueDate)}</span>
                                                </div>
                                                {event.status !== "COMPLETED" && (
                                                    <a
                                                        href={`/learner/learn/${event.courseSlug}`}
                                                        className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
                                                    >
                                                        Go to course →
                                                    </a>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}
