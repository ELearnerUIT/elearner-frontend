"use client";

import { useState } from "react";
import { X, Search, Loader2, Clock, FileText, CheckCircle, Calendar } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { assignmentService } from "@/services/assignment";
import { AssignmentResponse, AssignmentType } from "@/services/assignment/assignment.types";
import { toast } from "sonner";
import { format } from "date-fns";

interface LinkAssignmentModalProps {
    isOpen: boolean;
    onClose: () => void;
    lessonId: number;
    lessonTitle: string;
}

const ASSIGNMENT_TYPE_LABELS: Record<AssignmentType, string> = {
    PRACTICE: "Practice",
    HOMEWORK: "Homework",
    PROJECT: "Project",
    FINAL_REPORT: "Final Report",
};

const ASSIGNMENT_TYPE_COLORS: Record<AssignmentType, string> = {
    PRACTICE: "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400",
    HOMEWORK: "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400",
    PROJECT: "bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400",
    FINAL_REPORT: "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400",
};

export function LinkAssignmentModal({ isOpen, onClose, lessonId, lessonTitle }: LinkAssignmentModalProps) {
    const [searchQuery, setSearchQuery] = useState("");
    const queryClient = useQueryClient();

    // Fetch independent assignments (not linked to any lesson)
    const { data: independentAssignments = [], isLoading } = useQuery({
        queryKey: ["independent-assignments"],
        queryFn: () => assignmentService.getAllIndependentAssignments(),
        enabled: isOpen,
    });

    // Fetch current lesson's assignments to show already linked ones
    const { data: linkedAssignments = [] } = useQuery({
        queryKey: ["lesson-assignments", lessonId],
        queryFn: () => assignmentService.getAssignmentsByLesson(lessonId),
        enabled: isOpen,
    });

    // Link assignment mutation
    const linkMutation = useMutation({
        mutationFn: (assignmentId: number) => assignmentService.linkAssignmentToLesson(lessonId, assignmentId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["independent-assignments"] });
            queryClient.invalidateQueries({ queryKey: ["lesson-assignments", lessonId] });
            toast.success("Assignment linked successfully");
        },
        onError: (error: any) => {
            toast.error(error?.response?.data?.message || "Failed to link assignment");
        },
    });

    // Unlink assignment mutation
    const unlinkMutation = useMutation({
        mutationFn: (assignmentId: number) => assignmentService.unlinkAssignmentFromLesson(lessonId, assignmentId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["independent-assignments"] });
            queryClient.invalidateQueries({ queryKey: ["lesson-assignments", lessonId] });
            toast.success("Assignment unlinked successfully");
        },
        onError: (error: any) => {
            toast.error(error?.response?.data?.message || "Failed to unlink assignment");
        },
    });

    const filteredAssignments = independentAssignments.filter((assignment) =>
        assignment.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        assignment.description?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const isAssignmentLinked = (assignmentId: number) => {
        return linkedAssignments.some((a) => a.id === assignmentId);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl w-full max-w-3xl max-h-[80vh] flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-700">
                    <div>
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                            Link Assignment to Lesson
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
                            placeholder="Search assignments..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>
                </div>

                {/* Assignment List */}
                <div className="flex-1 overflow-y-auto p-6">
                    {isLoading ? (
                        <div className="flex items-center justify-center py-12">
                            <Loader2 className="w-8 h-8 animate-spin text-indigo-500" />
                        </div>
                    ) : filteredAssignments.length === 0 ? (
                        <div className="text-center py-12">
                            <FileText className="w-16 h-16 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
                            <p className="text-slate-600 dark:text-slate-400 font-medium">
                                {searchQuery ? "No assignments found" : "No independent assignments available"}
                            </p>
                            <p className="text-sm text-slate-500 dark:text-slate-500 mt-1">
                                Create independent assignments first to link them to lessons
                            </p>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {filteredAssignments.map((assignment) => {
                                const linked = isAssignmentLinked(assignment.id);
                                return (
                                    <div
                                        key={assignment.id}
                                        className={`p-4 rounded-xl border transition-all ${linked
                                                ? "bg-green-50 dark:bg-green-900/10 border-green-200 dark:border-green-800"
                                                : "bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-700"
                                            }`}
                                    >
                                        <div className="flex items-start justify-between gap-4">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <h3 className="font-semibold text-slate-900 dark:text-white">
                                                        {assignment.title}
                                                    </h3>
                                                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${ASSIGNMENT_TYPE_COLORS[assignment.assignmentType]}`}>
                                                        {ASSIGNMENT_TYPE_LABELS[assignment.assignmentType]}
                                                    </span>
                                                    {linked && (
                                                        <span className="flex items-center gap-1 text-xs font-medium text-green-700 dark:text-green-400 bg-green-100 dark:bg-green-900/30 px-2 py-0.5 rounded-full">
                                                            <CheckCircle className="w-3 h-3" />
                                                            Linked
                                                        </span>
                                                    )}
                                                </div>
                                                {assignment.description && (
                                                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                                                        {assignment.description}
                                                    </p>
                                                )}
                                                <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
                                                    {assignment.totalPoints && (
                                                        <span className="flex items-center gap-1">
                                                            <FileText className="w-3.5 h-3.5" />
                                                            {assignment.totalPoints} points
                                                        </span>
                                                    )}
                                                    {assignment.timeLimitMinutes && (
                                                        <span className="flex items-center gap-1">
                                                            <Clock className="w-3.5 h-3.5" />
                                                            {assignment.timeLimitMinutes} min
                                                        </span>
                                                    )}
                                                    {assignment.dueDate && (
                                                        <span className="flex items-center gap-1">
                                                            <Calendar className="w-3.5 h-3.5" />
                                                            Due: {format(new Date(assignment.dueDate), "MMM d, yyyy")}
                                                        </span>
                                                    )}
                                                    {assignment.maxAttempts && (
                                                        <span>
                                                            Max {assignment.maxAttempts} attempts
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                            <button
                                                onClick={() => {
                                                    if (linked) {
                                                        unlinkMutation.mutate(assignment.id);
                                                    } else {
                                                        linkMutation.mutate(assignment.id);
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

                {/* Linked Assignments Summary */}
                {linkedAssignments.length > 0 && (
                    <div className="p-6 border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50">
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                            <span className="font-semibold text-slate-900 dark:text-white">
                                {linkedAssignments.length}
                            </span>{" "}
                            assignment{linkedAssignments.length !== 1 ? "s" : ""} currently linked to this lesson
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
