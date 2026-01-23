"use client";

import { use, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
    ArrowLeft,
    FileText,
    Users,
    CheckCircle2,
    Clock,
    AlertCircle,
    Search,
    Filter,
    Loader2,
    Eye,
    Settings
} from "lucide-react";
import { useAssignmentsByLesson } from "@/hooks/teacher/useTeacherAssignment";
import { useAssignmentSubmissions } from "@/hooks/teacher/useAssignmentManagement";
import { AssignmentResponse, SubmissionStatus } from "@/services/assignment/assignment.types";
import Button from "@/core/components/ui/Button";
import Input from "@/core/components/ui/Input";
import { Select, SelectItem } from "@/core/components/ui/Select";
import { Card, CardContent, CardHeader, CardTitle } from "@/core/components/ui/Card";
import { formatDistanceToNow, format, isPast } from "date-fns";

interface PageProps {
    params: Promise<{
        slug: string;
        lessonId: string;
    }>;
}

export default function LessonAssignmentsPage({ params }: PageProps) {
    const { slug, lessonId } = use(params);
    const router = useRouter();
    const lessonIdNum = parseInt(lessonId);

    const [searchQuery, setSearchQuery] = useState("");
    const [filterStatus, setFilterStatus] = useState<"all" | "pending" | "graded">("all");
    const [selectedAssignment, setSelectedAssignment] = useState<AssignmentResponse | null>(null);

    // Fetch assignments for this lesson
    const { data: assignments = [], isLoading: loadingAssignments } = useAssignmentsByLesson(lessonIdNum);

    // Fetch submissions for selected assignment
    const { data: submissions = [], isLoading: loadingSubmissions } = useAssignmentSubmissions(
        selectedAssignment?.id || null
    );

    // Auto-select first assignment if none selected
    useMemo(() => {
        if (!selectedAssignment && assignments.length > 0) {
            setSelectedAssignment(assignments[0]);
        }
    }, [assignments, selectedAssignment]);

    const filteredSubmissions = useMemo(() => {
        return submissions.filter((submission) => {
            const matchesSearch =
                searchQuery === "" ||
                submission.studentName?.toLowerCase().includes(searchQuery.toLowerCase());

            const matchesFilter =
                filterStatus === "all" ||
                (filterStatus === "pending" && submission.status === "PENDING") ||
                (filterStatus === "graded" && submission.status === "GRADED");

            return matchesSearch && matchesFilter;
        });
    }, [submissions, searchQuery, filterStatus]);

    const stats = useMemo(() => {
        if (!submissions.length) return { total: 0, pending: 0, graded: 0 };
        return {
            total: submissions.length,
            pending: submissions.filter(s => s.status === "PENDING").length,
            graded: submissions.filter(s => s.status === "GRADED").length,
        };
    }, [submissions]);

    if (loadingAssignments) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 dark:from-slate-950 dark:via-slate-900 dark:to-indigo-950/20">
                <div className="flex items-center justify-center min-h-[60vh]">
                    <div className="flex flex-col items-center gap-4">
                        <Loader2 className="h-12 w-12 animate-spin text-indigo-500" />
                        <p className="text-slate-500 dark:text-slate-400 font-medium">Loading assignments...</p>
                    </div>
                </div>
            </div>
        );
    }

    if (assignments.length === 0) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 dark:from-slate-950 dark:via-slate-900 dark:to-indigo-950/20">
                <div className="container mx-auto px-4 py-8">
                    <div className="flex items-center gap-4 mb-8">
                        <Link
                            href={`/teacher/courses/${slug}/versions`}
                            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                        >
                            <ArrowLeft className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                        </Link>
                        <div>
                            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Lesson Assignments</h1>
                            <p className="text-slate-500 dark:text-slate-400 mt-1">
                                No assignments found for this lesson
                            </p>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-slate-800/50 rounded-3xl shadow-sm border border-dashed border-slate-300 dark:border-slate-600 backdrop-blur-sm">
                        <div className="flex flex-col items-center justify-center py-20 px-4">
                            <FileText className="h-16 w-16 text-slate-400 mb-4" />
                            <h3 className="text-xl font-semibold text-slate-800 dark:text-white mb-2">
                                No Assignments
                            </h3>
                            <p className="text-slate-500 dark:text-slate-400 text-center max-w-sm">
                                This lesson doesn't have any assignments yet.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 dark:from-slate-950 dark:via-slate-900 dark:to-indigo-950/20">
            <div className="container mx-auto px-4 py-8 space-y-8">
                {/* Header */}
                <div className="relative overflow-hidden bg-white dark:bg-slate-800/50 rounded-3xl shadow-sm border border-slate-200/80 dark:border-slate-700/50 p-8 backdrop-blur-sm">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-indigo-500/10 to-blue-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

                    <div className="relative flex items-center gap-4 mb-6">
                        <Link
                            href={`/teacher/courses/${slug}/versions`}
                            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                        >
                            <ArrowLeft className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                        </Link>
                        <div>
                            <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
                                Lesson Assignments & Grading
                            </h1>
                            <p className="text-slate-500 dark:text-slate-400 mt-1">
                                Review and grade student submissions
                            </p>
                        </div>
                    </div>

                    {/* Assignment Tabs */}
                    <div className="relative flex gap-2 overflow-x-auto pb-2">
                        {assignments.map((assignment) => (
                            <button
                                key={assignment.id}
                                onClick={() => setSelectedAssignment(assignment)}
                                className={`flex-shrink-0 px-4 py-2.5 rounded-xl font-medium transition-all ${selectedAssignment?.id === assignment.id
                                    ? "bg-gradient-to-r from-indigo-500 to-blue-600 text-white shadow-lg"
                                    : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                                    }`}
                            >
                                <div className="flex items-center gap-2">
                                    <FileText className="w-4 h-4" />
                                    <span>{assignment.title}</span>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

                {selectedAssignment && (
                    <>
                        {/* Assignment Info & Actions */}
                        <div className="bg-white dark:bg-slate-800/50 rounded-2xl shadow-sm border border-slate-200/80 dark:border-slate-700/50 p-6 mb-6">
                            <div className="flex items-start justify-between gap-4 mb-4">
                                <div className="flex-1">
                                    <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                                        {selectedAssignment.title}
                                    </h2>
                                    {selectedAssignment.description && (
                                        <p className="text-slate-600 dark:text-slate-400 mt-2">
                                            {selectedAssignment.description}
                                        </p>
                                    )}
                                </div>
                                <Button
                                    onClick={() => router.push(`/teacher/assignments/${selectedAssignment.id}`)}
                                    className="bg-indigo-600 hover:bg-indigo-700 text-white border-0"
                                >
                                    <Settings className="w-4 h-4 mr-2" />
                                    View Assignment Details
                                </Button>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div className="px-4 py-3 bg-slate-50 dark:bg-slate-800 rounded-xl">
                                    <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">Total Points</p>
                                    <p className="text-lg font-bold text-slate-800 dark:text-white">
                                        {selectedAssignment.totalPoints || 0}
                                    </p>
                                </div>
                                <div className="px-4 py-3 bg-slate-50 dark:bg-slate-800 rounded-xl">
                                    <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">Time Limit</p>
                                    <p className="text-lg font-bold text-slate-800 dark:text-white">
                                        {selectedAssignment.timeLimitMinutes || 0} min
                                    </p>
                                </div>
                                <div className="px-4 py-3 bg-slate-50 dark:bg-slate-800 rounded-xl">
                                    <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">Max Attempts</p>
                                    <p className="text-lg font-bold text-slate-800 dark:text-white">
                                        {selectedAssignment.maxAttempts || "Unlimited"}
                                    </p>
                                </div>
                                <div className="px-4 py-3 bg-slate-50 dark:bg-slate-800 rounded-xl">
                                    <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">Due Date</p>
                                    <p className="text-lg font-bold text-slate-800 dark:text-white">
                                        {selectedAssignment.dueDate ? format(new Date(selectedAssignment.dueDate), "MMM dd") : "N/A"}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <Card className="bg-white dark:bg-slate-800/50 border-slate-200/80 dark:border-slate-700/50">
                                <CardContent className="p-5">
                                    <div className="flex items-center justify-between mb-2">
                                        <Users className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                                    </div>
                                    <p className="text-2xl font-bold text-slate-800 dark:text-white">
                                        {stats.total}
                                    </p>
                                    <p className="text-sm text-slate-500 dark:text-slate-400">Total Submissions</p>
                                </CardContent>
                            </Card>

                            <Card className="bg-white dark:bg-slate-800/50 border-slate-200/80 dark:border-slate-700/50">
                                <CardContent className="p-5">
                                    <div className="flex items-center justify-between mb-2">
                                        <Clock className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                                    </div>
                                    <p className="text-2xl font-bold text-amber-700 dark:text-amber-300">
                                        {stats.pending}
                                    </p>
                                    <p className="text-sm text-slate-500 dark:text-slate-400">Pending Review</p>
                                </CardContent>
                            </Card>

                            <Card className="bg-white dark:bg-slate-800/50 border-slate-200/80 dark:border-slate-700/50">
                                <CardContent className="p-5">
                                    <div className="flex items-center justify-between mb-2">
                                        <CheckCircle2 className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                                    </div>
                                    <p className="text-2xl font-bold text-emerald-700 dark:text-emerald-300">
                                        {stats.graded}
                                    </p>
                                    <p className="text-sm text-slate-500 dark:text-slate-400">Graded</p>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Search & Filter */}
                        <div className="bg-white dark:bg-slate-800/50 rounded-2xl shadow-sm border border-slate-200/80 dark:border-slate-700/50 p-4 backdrop-blur-sm">
                            <div className="flex flex-col sm:flex-row gap-4">
                                <div className="relative flex-1">
                                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                                    <Input
                                        type="text"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        placeholder="Search by student name..."
                                        className="pl-12 h-12 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-xl"
                                    />
                                </div>
                                <div className="flex items-center gap-2">
                                    <Filter className="h-5 w-5 text-slate-400" />
                                    <Select
                                        value={filterStatus}
                                        onChange={(e) => setFilterStatus(e.target.value as "all" | "pending" | "graded")}
                                        className="w-[180px] h-12 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-xl"
                                    >
                                        <SelectItem value="all">All Submissions</SelectItem>
                                        <SelectItem value="pending">Pending Only</SelectItem>
                                        <SelectItem value="graded">Graded Only</SelectItem>
                                    </Select>
                                </div>
                            </div>
                        </div>

                        {/* Submissions List */}
                        {loadingSubmissions ? (
                            <div className="flex justify-center py-12">
                                <Loader2 className="h-12 w-12 animate-spin text-indigo-500" />
                            </div>
                        ) : filteredSubmissions.length === 0 ? (
                            <div className="bg-white dark:bg-slate-800/50 rounded-2xl shadow-sm border border-slate-200/80 dark:border-slate-700/50 p-12">
                                <div className="text-center">
                                    <FileText className="w-16 h-16 text-slate-400 mx-auto mb-4" />
                                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                                        No submissions found
                                    </h3>
                                    <p className="text-slate-600 dark:text-slate-400">
                                        {searchQuery || filterStatus !== "all"
                                            ? "Try adjusting your search or filter."
                                            : "No students have submitted yet."}
                                    </p>
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-3">
                                {filteredSubmissions.map((submission) => {
                                    const isOverdue =
                                        selectedAssignment.dueDate &&
                                        submission.submittedAt &&
                                        isPast(new Date(selectedAssignment.dueDate)) &&
                                        new Date(submission.submittedAt) > new Date(selectedAssignment.dueDate);

                                    return (
                                        <div
                                            key={submission.id}
                                            className="bg-white dark:bg-slate-800/50 rounded-2xl border border-slate-200/80 dark:border-slate-700/50 p-5 hover:shadow-lg transition-all"
                                        >
                                            <div className="flex items-start justify-between gap-4">
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-center gap-3 mb-2">
                                                        <h3 className="text-lg font-semibold text-slate-800 dark:text-white">
                                                            {submission.studentName || `Student #${submission.studentId}`}
                                                        </h3>
                                                        {submission.status === "PENDING" && (
                                                            <span className="px-2.5 py-1 bg-amber-100 dark:bg-amber-900/20 text-amber-700 dark:text-amber-300 rounded-lg text-xs font-medium">
                                                                Pending
                                                            </span>
                                                        )}
                                                        {submission.status === "GRADED" && (
                                                            <span className="px-2.5 py-1 bg-emerald-100 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300 rounded-lg text-xs font-medium">
                                                                Graded
                                                            </span>
                                                        )}
                                                        {isOverdue && (
                                                            <span className="px-2.5 py-1 bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-300 rounded-lg text-xs font-medium">
                                                                Late
                                                            </span>
                                                        )}
                                                    </div>

                                                    <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
                                                        <div className="flex items-center gap-1">
                                                            <Clock className="h-4 w-4" />
                                                            Submitted {formatDistanceToNow(new Date(submission.submittedAt), { addSuffix: true })}
                                                        </div>
                                                        {submission.score !== null && submission.score !== undefined && (
                                                            <div className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-medium">
                                                                <CheckCircle2 className="h-4 w-4" />
                                                                Score: {submission.score}/{selectedAssignment.totalPoints || 100}
                                                            </div>
                                                        )}
                                                        {submission.attemptNumber > 1 && (
                                                            <div className="flex items-center gap-1">
                                                                Attempt #{submission.attemptNumber}
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>

                                                <Button
                                                    onClick={() =>
                                                        router.push(
                                                            `/teacher/assignments/${selectedAssignment.id}/submissions/${submission.id}`
                                                        )
                                                    }
                                                    className="bg-gradient-to-r from-indigo-500 to-blue-600 hover:from-indigo-600 hover:to-blue-700 text-white"
                                                >
                                                    <Eye className="mr-2 h-4 w-4" />
                                                    {submission.status === "PENDING" ? "Grade" : "Review"}
                                                </Button>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}
