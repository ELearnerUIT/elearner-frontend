"use client";

import { useState } from "react";
import { X, Search, Plus, Loader2, Clock, Award, CheckCircle } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { assessmentService } from "@/services/assessment";
import { QuizResponse } from "@/services/assessment/assessment.types";
import { toast } from "sonner";

interface LinkQuizModalProps {
    isOpen: boolean;
    onClose: () => void;
    lessonId: number;
    lessonTitle: string;
}

export function LinkQuizModal({ isOpen, onClose, lessonId, lessonTitle }: LinkQuizModalProps) {
    const [searchQuery, setSearchQuery] = useState("");
    const queryClient = useQueryClient();

    // Fetch independent quizzes (not linked to any lesson)
    const { data: independentQuizzes = [], isLoading } = useQuery({
        queryKey: ["independent-quizzes"],
        queryFn: () => assessmentService.getAllIndependentQuizzes(),
        enabled: isOpen,
    });

    // Fetch current lesson's quizzes to show already linked ones
    const { data: linkedQuizzes = [] } = useQuery({
        queryKey: ["lesson-quizzes", lessonId],
        queryFn: () => assessmentService.getQuizzesByLesson(lessonId),
        enabled: isOpen,
    });

    // Link quiz mutation
    const linkMutation = useMutation({
        mutationFn: (quizId: number) => assessmentService.linkQuizToLesson(lessonId, quizId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["independent-quizzes"] });
            queryClient.invalidateQueries({ queryKey: ["lesson-quizzes", lessonId] });
            toast.success("Quiz linked successfully");
        },
        onError: (error: any) => {
            toast.error(error?.response?.data?.message || "Failed to link quiz");
        },
    });

    // Unlink quiz mutation
    const unlinkMutation = useMutation({
        mutationFn: (quizId: number) => assessmentService.unlinkQuizFromLesson(lessonId, quizId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["independent-quizzes"] });
            queryClient.invalidateQueries({ queryKey: ["lesson-quizzes", lessonId] });
            toast.success("Quiz unlinked successfully");
        },
        onError: (error: any) => {
            toast.error(error?.response?.data?.message || "Failed to unlink quiz");
        },
    });

    const filteredQuizzes = independentQuizzes.filter((quiz) =>
        quiz.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        quiz.description?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const isQuizLinked = (quizId: number) => {
        return linkedQuizzes.some((q) => q.id === quizId);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl w-full max-w-3xl max-h-[80vh] flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-700">
                    <div>
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                            Link Quiz to Lesson
                        </h2>
                        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                            {lessonTitle}
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
                    >
                        <X className="w-5 h-5 text-slate-500" />
                    </button>
                </div>

                {/* Search */}
                <div className="p-6 border-b border-slate-200 dark:border-slate-700">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Search quizzes..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>
                </div>

                {/* Quiz List */}
                <div className="flex-1 overflow-y-auto p-6">
                    {isLoading ? (
                        <div className="flex items-center justify-center py-12">
                            <Loader2 className="w-8 h-8 animate-spin text-indigo-500" />
                        </div>
                    ) : filteredQuizzes.length === 0 ? (
                        <div className="text-center py-12">
                            <Award className="w-16 h-16 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
                            <p className="text-slate-600 dark:text-slate-400 font-medium">
                                {searchQuery ? "No quizzes found" : "No independent quizzes available"}
                            </p>
                            <p className="text-sm text-slate-500 dark:text-slate-500 mt-1">
                                Create independent quizzes first to link them to lessons
                            </p>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {filteredQuizzes.map((quiz) => {
                                const linked = isQuizLinked(quiz.id);
                                return (
                                    <div
                                        key={quiz.id}
                                        className={`p-4 rounded-xl border transition-all ${linked
                                                ? "bg-green-50 dark:bg-green-900/10 border-green-200 dark:border-green-800"
                                                : "bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-700"
                                            }`}
                                    >
                                        <div className="flex items-start justify-between gap-4">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <h3 className="font-semibold text-slate-900 dark:text-white">
                                                        {quiz.title}
                                                    </h3>
                                                    {linked && (
                                                        <span className="flex items-center gap-1 text-xs font-medium text-green-700 dark:text-green-400 bg-green-100 dark:bg-green-900/30 px-2 py-0.5 rounded-full">
                                                            <CheckCircle className="w-3 h-3" />
                                                            Linked
                                                        </span>
                                                    )}
                                                </div>
                                                {quiz.description && (
                                                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                                                        {quiz.description}
                                                    </p>
                                                )}
                                                <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
                                                    {quiz.totalPoints && (
                                                        <span className="flex items-center gap-1">
                                                            <Award className="w-3.5 h-3.5" />
                                                            {quiz.totalPoints} points
                                                        </span>
                                                    )}
                                                    {quiz.timeLimitMinutes && (
                                                        <span className="flex items-center gap-1">
                                                            <Clock className="w-3.5 h-3.5" />
                                                            {quiz.timeLimitMinutes} min
                                                        </span>
                                                    )}
                                                    {quiz.questions && (
                                                        <span>
                                                            {quiz.questions.length} questions
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                            <button
                                                onClick={() => {
                                                    if (linked) {
                                                        unlinkMutation.mutate(quiz.id);
                                                    } else {
                                                        linkMutation.mutate(quiz.id);
                                                    }
                                                }}
                                                disabled={linkMutation.isPending || unlinkMutation.isPending}
                                                className={`px-4 py-2 rounded-lg font-medium transition-colors disabled:opacity-50 ${linked
                                                        ? "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-900/50"
                                                        : "bg-indigo-600 text-white hover:bg-indigo-700"
                                                    }`}
                                            >
                                                {linkMutation.isPending || unlinkMutation.isPending ? (
                                                    <Loader2 className="w-4 h-4 animate-spin" />
                                                ) : linked ? (
                                                    "Unlink"
                                                ) : (
                                                    "Link"
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>

                {/* Linked Quizzes Summary */}
                {linkedQuizzes.length > 0 && (
                    <div className="p-6 border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50">
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                            <span className="font-semibold text-slate-900 dark:text-white">
                                {linkedQuizzes.length}
                            </span>{" "}
                            quiz{linkedQuizzes.length !== 1 ? "zes" : ""} currently linked to this lesson
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
