"use client";

import { use, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
    ArrowLeft,
    Award,
    Users,
    CheckCircle2,
    Clock,
    Search,
    Filter,
    Loader2,
    Eye,
    TrendingUp,
    BarChart3,
    FileText,
    Settings
} from "lucide-react";
import { useQuizzesByLesson } from "@/hooks/teacher/useQuizManagement";
import { QuizResponse } from "@/services/assessment/assessment.types";
import { assessmentService } from "@/services/assessment/assessment.service";
import Button from "@/core/components/ui/Button";
import Input from "@/core/components/ui/Input";
import { Card, CardContent } from "@/core/components/ui/Card";
import { useQuery } from "@tanstack/react-query";

interface PageProps {
    params: Promise<{
        slug: string;
        lessonId: string;
    }>;
}

export default function LessonQuizzesPage({ params }: PageProps) {
    const { slug, lessonId } = use(params);
    const router = useRouter();
    const lessonIdNum = parseInt(lessonId);

    const [searchQuery, setSearchQuery] = useState("");
    const [selectedQuiz, setSelectedQuiz] = useState<QuizResponse | null>(null);

    // Fetch quizzes for this lesson
    const { data: quizzes = [], isLoading: loadingQuizzes } = useQuizzesByLesson(lessonIdNum);

    // Fetch statistics for selected quiz
    const { data: statistics, isLoading: loadingStats } = useQuery({
        queryKey: ["quiz-statistics", selectedQuiz?.id],
        queryFn: () =>
            selectedQuiz ? assessmentService.getQuizStatistics(selectedQuiz.id) : Promise.reject("No quiz selected"),
        enabled: !!selectedQuiz,
    });

    // Fetch results for selected quiz
    const { data: results, isLoading: loadingResults } = useQuery({
        queryKey: ["quiz-results", selectedQuiz?.id],
        queryFn: () =>
            selectedQuiz ? assessmentService.getQuizResults(selectedQuiz.id) : Promise.reject("No quiz selected"),
        enabled: !!selectedQuiz,
    });

    // Auto-select first quiz if none selected
    useMemo(() => {
        if (!selectedQuiz && quizzes.length > 0) {
            setSelectedQuiz(quizzes[0]);
        }
    }, [quizzes, selectedQuiz]);

    const filteredStudents = useMemo(() => {
        if (!results?.studentResults) return [];
        return results.studentResults.filter((student) =>
            searchQuery === "" ||
            student.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            student.studentCode?.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [results, searchQuery]);

    if (loadingQuizzes) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 dark:from-slate-950 dark:via-slate-900 dark:to-indigo-950/20">
                <div className="flex items-center justify-center min-h-[60vh]">
                    <div className="flex flex-col items-center gap-4">
                        <Loader2 className="h-12 w-12 animate-spin text-indigo-500" />
                        <p className="text-slate-500 dark:text-slate-400 font-medium">Loading quizzes...</p>
                    </div>
                </div>
            </div>
        );
    }

    if (quizzes.length === 0) {
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
                            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Lesson Quizzes</h1>
                            <p className="text-slate-500 dark:text-slate-400 mt-1">
                                No quizzes found for this lesson
                            </p>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-slate-800/50 rounded-3xl shadow-sm border border-dashed border-slate-300 dark:border-slate-600 backdrop-blur-sm">
                        <div className="flex flex-col items-center justify-center py-20 px-4">
                            <Award className="h-16 w-16 text-slate-400 mb-4" />
                            <h3 className="text-xl font-semibold text-slate-800 dark:text-white mb-2">
                                No Quizzes
                            </h3>
                            <p className="text-slate-500 dark:text-slate-400 text-center max-w-sm">
                                This lesson doesn't have any quizzes yet.
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
                                Lesson Quizzes & Results
                            </h1>
                            <p className="text-slate-500 dark:text-slate-400 mt-1">
                                View quiz statistics and student performance
                            </p>
                        </div>
                    </div>

                    {/* Quiz Tabs */}
                    <div className="relative flex gap-2 overflow-x-auto pb-2">
                        {quizzes.map((quiz) => (
                            <button
                                key={quiz.id}
                                onClick={() => setSelectedQuiz(quiz)}
                                className={`flex-shrink-0 px-4 py-2.5 rounded-xl font-medium transition-all ${selectedQuiz?.id === quiz.id
                                    ? "bg-gradient-to-r from-indigo-500 to-blue-600 text-white shadow-lg"
                                    : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                                    }`}
                            >
                                <div className="flex items-center gap-2">
                                    <Award className="w-4 h-4" />
                                    <span>{quiz.title}</span>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

                {selectedQuiz && (
                    <>
                        {/* Quiz Info Card */}
                        <div className="bg-white dark:bg-slate-800/50 rounded-2xl shadow-sm border border-slate-200/80 dark:border-slate-700/50 p-6">
                            <div className="flex items-start justify-between gap-4 mb-4">
                                <div className="flex-1">
                                    <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                                        {selectedQuiz.title}
                                    </h2>
                                    {selectedQuiz.description && (
                                        <p className="text-slate-600 dark:text-slate-400 mt-2">
                                            {selectedQuiz.description}
                                        </p>
                                    )}
                                </div>
                                <Button
                                    onClick={() => router.push(`/teacher/quizzes/${selectedQuiz.id}/edit`)}
                                    className="bg-indigo-600 hover:bg-indigo-700 text-white border-0"
                                >
                                    <FileText className="w-4 h-4 mr-2" />
                                    View Quiz Details
                                </Button>
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div className="px-4 py-3 bg-slate-50 dark:bg-slate-800 rounded-xl">
                                    <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">Total Points</p>
                                    <p className="text-lg font-bold text-slate-800 dark:text-white">
                                        {selectedQuiz.totalPoints || 0}
                                    </p>
                                </div>
                                <div className="px-4 py-3 bg-slate-50 dark:bg-slate-800 rounded-xl">
                                    <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">Time Limit</p>
                                    <p className="text-lg font-bold text-slate-800 dark:text-white">
                                        {selectedQuiz.timeLimitMinutes || 0} min
                                    </p>
                                </div>
                                <div className="px-4 py-3 bg-slate-50 dark:bg-slate-800 rounded-xl">
                                    <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">Max Attempts</p>
                                    <p className="text-lg font-bold text-slate-800 dark:text-white">
                                        {selectedQuiz.maxAttempts || "Unlimited"}
                                    </p>
                                </div>
                                <div className="px-4 py-3 bg-slate-50 dark:bg-slate-800 rounded-xl">
                                    <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">Passing Score</p>
                                    <p className="text-lg font-bold text-slate-800 dark:text-white">
                                        {selectedQuiz.passingScore || 0}%
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Statistics */}
                        {loadingStats ? (
                            <div className="flex justify-center py-12">
                                <Loader2 className="h-12 w-12 animate-spin text-indigo-500" />
                            </div>
                        ) : statistics ? (
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                <Card className="bg-white dark:bg-slate-800/50 border-slate-200/80 dark:border-slate-700/50">
                                    <CardContent className="p-5">
                                        <div className="flex items-center justify-between mb-2">
                                            <Users className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                                        </div>
                                        <p className="text-2xl font-bold text-slate-800 dark:text-white">
                                            {statistics.totalStudents}
                                        </p>
                                        <p className="text-sm text-slate-500 dark:text-slate-400">Total Students</p>
                                    </CardContent>
                                </Card>

                                <Card className="bg-white dark:bg-slate-800/50 border-slate-200/80 dark:border-slate-700/50">
                                    <CardContent className="p-5">
                                        <div className="flex items-center justify-between mb-2">
                                            <BarChart3 className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                                        </div>
                                        <p className="text-2xl font-bold text-amber-700 dark:text-amber-300">
                                            {statistics.totalAttempts}
                                        </p>
                                        <p className="text-sm text-slate-500 dark:text-slate-400">Total Attempts</p>
                                    </CardContent>
                                </Card>

                                <Card className="bg-white dark:bg-slate-800/50 border-slate-200/80 dark:border-slate-700/50">
                                    <CardContent className="p-5">
                                        <div className="flex items-center justify-between mb-2">
                                            <TrendingUp className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                                        </div>
                                        <p className="text-2xl font-bold text-emerald-700 dark:text-emerald-300">
                                            {statistics.averageScore != null ? statistics.averageScore.toFixed(1) : 'N/A'}
                                        </p>
                                        <p className="text-sm text-slate-500 dark:text-slate-400">Average Score</p>
                                    </CardContent>
                                </Card>

                                <Card className="bg-white dark:bg-slate-800/50 border-slate-200/80 dark:border-slate-700/50">
                                    <CardContent className="p-5">
                                        <div className="flex items-center justify-between mb-2">
                                            <CheckCircle2 className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                                        </div>
                                        <p className="text-2xl font-bold text-blue-700 dark:text-blue-300">
                                            {statistics.passingRate != null ? statistics.passingRate.toFixed(1) : 'N/A'}%
                                        </p>
                                        <p className="text-sm text-slate-500 dark:text-slate-400">Passing Rate</p>
                                    </CardContent>
                                </Card>
                            </div>
                        ) : null}

                        {/* Search */}
                        <div className="bg-white dark:bg-slate-800/50 rounded-2xl shadow-sm border border-slate-200/80 dark:border-slate-700/50 p-4 backdrop-blur-sm">
                            <div className="relative">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                                <Input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Search by student name or code..."
                                    className="pl-12 h-12 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-xl"
                                />
                            </div>
                        </div>

                        {/* Student Results */}
                        {loadingResults ? (
                            <div className="flex justify-center py-12">
                                <Loader2 className="h-12 w-12 animate-spin text-indigo-500" />
                            </div>
                        ) : filteredStudents.length === 0 ? (
                            <div className="bg-white dark:bg-slate-800/50 rounded-2xl shadow-sm border border-slate-200/80 dark:border-slate-700/50 p-12">
                                <div className="text-center">
                                    <Award className="w-16 h-16 text-slate-400 mx-auto mb-4" />
                                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                                        No results found
                                    </h3>
                                    <p className="text-slate-600 dark:text-slate-400">
                                        {searchQuery
                                            ? "Try adjusting your search."
                                            : "No students have attempted this quiz yet."}
                                    </p>
                                </div>
                            </div>
                        ) : (
                            <div className="bg-white dark:bg-slate-800/50 rounded-2xl shadow-sm border border-slate-200/80 dark:border-slate-700/50 overflow-hidden">
                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead className="bg-slate-50 dark:bg-slate-800">
                                            <tr>
                                                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900 dark:text-white">
                                                    Student
                                                </th>
                                                <th className="px-6 py-4 text-center text-sm font-semibold text-slate-900 dark:text-white">
                                                    Attempts
                                                </th>
                                                <th className="px-6 py-4 text-center text-sm font-semibold text-slate-900 dark:text-white">
                                                    Best Score
                                                </th>
                                                <th className="px-6 py-4 text-center text-sm font-semibold text-slate-900 dark:text-white">
                                                    Status
                                                </th>
                                                <th className="px-6 py-4 text-center text-sm font-semibold text-slate-900 dark:text-white">
                                                    Last Attempt
                                                </th>
                                                <th className="px-6 py-4 text-right text-sm font-semibold text-slate-900 dark:text-white">
                                                    Actions
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                                            {filteredStudents.map((student) => (
                                                <tr
                                                    key={student.studentId}
                                                    className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                                                >
                                                    <td className="px-6 py-4">
                                                        <div>
                                                            <p className="font-medium text-slate-900 dark:text-white">
                                                                {student.studentName}
                                                            </p>
                                                            {student.studentCode && (
                                                                <p className="text-sm text-slate-500 dark:text-slate-400">
                                                                    {student.studentCode}
                                                                </p>
                                                            )}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 text-center">
                                                        <span className="text-slate-700 dark:text-slate-300">
                                                            {student.attempts}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 text-center">
                                                        <span className="font-semibold text-slate-900 dark:text-white">
                                                            {student.bestScore !== null && student.bestScore !== undefined
                                                                ? student.bestScore.toFixed(1)
                                                                : "N/A"}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 text-center">
                                                        {student.passed ? (
                                                            <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-emerald-100 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300 rounded-lg text-xs font-medium">
                                                                <CheckCircle2 className="h-3 w-3" />
                                                                Passed
                                                            </span>
                                                        ) : (
                                                            <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-300 rounded-lg text-xs font-medium">
                                                                <Clock className="h-3 w-3" />
                                                                Not Passed
                                                            </span>
                                                        )}
                                                    </td>
                                                    <td className="px-6 py-4 text-center text-sm text-slate-500 dark:text-slate-400">
                                                        {student.lastAttemptAt
                                                            ? new Date(student.lastAttemptAt).toLocaleDateString()
                                                            : "N/A"}
                                                    </td>
                                                    <td className="px-6 py-4 text-right">
                                                        <Button
                                                            onClick={() =>
                                                                router.push(
                                                                    `/teacher/quizzes/${selectedQuiz.id}/results?studentId=${student.studentId}`
                                                                )
                                                            }
                                                            size="sm"
                                                            variant="outline"
                                                            className="text-sm"
                                                        >
                                                            <Eye className="mr-2 h-3 w-3" />
                                                            View Details
                                                        </Button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}
