"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
    Upload,
    FileText,
    CheckCircle,
    AlertCircle,
    Calendar,
    Clock,
    X,
    Loader2,
    Download,
    RefreshCw,
} from "lucide-react";
import { assignmentService } from "@/services/assignment/assignment.service";
import { progressService } from "@/services/learning/progress.service";
import studentCourseService from "@/services/learning/student-course.service";
import { useCourseProgress } from "../../course-progress-context";
import { toast } from "sonner";
import type {
    AssignmentResponse,
    SubmissionResponse,
    AssignmentEligibilityResponse,
    SubmissionFileResponse,
} from "@/services/assignment/assignment.types";

export default function AssignmentPage() {
    const params = useParams();
    const router = useRouter();
    const assignmentId = params?.assignmentId as string;
    const slug = params?.slug as string;
    const { refreshProgress } = useCourseProgress();

    // Assignment data state
    const [assignment, setAssignment] = useState<AssignmentResponse | null>(null);
    const [eligibility, setEligibility] = useState<AssignmentEligibilityResponse | null>(null);
    const [submission, setSubmission] = useState<SubmissionResponse | null>(null);
    const [submissionFiles, setSubmissionFiles] = useState<SubmissionFileResponse[]>([]);
    const [lessonId, setLessonId] = useState<number | null>(null);

    // UI state
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [note, setNote] = useState("");
    const [error, setError] = useState<string | null>(null);

    // Fetch assignment data
    useEffect(() => {
        const fetchAssignmentData = async () => {
            setLoading(true);
            try {
                // Fetch assignment details
                const assignmentData = await assignmentService.getAssignmentById(Number(assignmentId));
                setAssignment(assignmentData);
                setLessonId(assignmentData.lessonId || null);

                // Check eligibility
                const eligibilityData = await assignmentService.checkEligibility(Number(assignmentId));
                setEligibility(eligibilityData);

                // Get latest submission
                try {
                    const latestSubmission = await assignmentService.getMyLatestSubmission(
                        Number(assignmentId)
                    );
                    setSubmission(latestSubmission);

                    // Get submission files if exists
                    if (latestSubmission?.id) {
                        const files = await assignmentService.getSubmissionFiles(latestSubmission.id);
                        setSubmissionFiles(files);
                    }
                } catch (err) {
                    // No submission yet, that's okay
                    console.log("No previous submission found");
                }
            } catch (error: any) {
                console.error("Failed to fetch assignment:", error);
                toast.error(error?.message || "Failed to load assignment");
            } finally {
                setLoading(false);
            }
        };

        if (assignmentId) {
            fetchAssignmentData();
        }
    }, [assignmentId]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setError(null);

        // Validate file size (10MB default)
        const maxSizeMB = 10;
        if (file.size > maxSizeMB * 1024 * 1024) {
            setError(`File size must be less than ${maxSizeMB}MB`);
            return;
        }

        setSelectedFile(file);
    };

    const handleSubmit = async () => {
        if (!selectedFile) {
            setError("Please select a file to upload");
            return;
        }

        setSubmitting(true);
        setError(null);

        try {
            // Step 1: Create or reuse submission
            let submissionData: SubmissionResponse;

            if (submission && submission.status === "PENDING") {
                // Reuse existing draft submission
                submissionData = submission;
            } else if (submission) {
                // Resubmit (create new version)
                submissionData = await assignmentService.resubmitAssignment(
                    Number(assignmentId),
                    submission.id
                );
            } else {
                // First submission
                submissionData = await assignmentService.submitAssignment(Number(assignmentId));
            }

            // Step 2: Upload file
            setUploading(true);
            const uploadedFile = await assignmentService.uploadSubmissionFile(
                submissionData.id,
                selectedFile
            );

            // Step 3: Update submission content with note if provided
            if (note.trim()) {
                await assignmentService.updateSubmissionContent(submissionData.id, note);
            }

            // Refresh submission data
            const updatedSubmission = await assignmentService.getSubmissionById(submissionData.id);
            setSubmission(updatedSubmission);

            // Get updated files
            const files = await assignmentService.getSubmissionFiles(submissionData.id);
            setSubmissionFiles(files);

            // Mark lesson as completed if we have lessonId
            if (lessonId) {
                try {
                    await progressService.markLessonAsCompleted(lessonId);
                    refreshProgress();
                } catch (err) {
                    console.error("Failed to mark lesson as completed:", err);
                }
            }

            // Reset form
            setSelectedFile(null);
            setNote("");

            toast.success("Assignment submitted successfully!");
        } catch (error: any) {
            console.error("Failed to submit assignment:", error);
            setError(error?.message || "Failed to submit assignment. Please try again.");
            toast.error(error?.message || "Failed to submit assignment");
        } finally {
            setSubmitting(false);
            setUploading(false);
        }
    };

    const handleDownloadFile = async (file: SubmissionFileResponse) => {
        try {
            if (submission) {
                const downloadUrl = await assignmentService.getFileDownloadUrl(submission.id, file.id);
                window.open(downloadUrl, "_blank");
            }
        } catch (error) {
            console.error("Failed to download file:", error);
            toast.error("Failed to download file");
        }
    };

    const handleResubmit = () => {
        setSubmission(null);
        setSubmissionFiles([]);
    };

    const getDaysUntilDue = () => {
        if (!assignment?.dueDate) return null;
        const now = new Date();
        const due = new Date(assignment.dueDate);
        const diffTime = due.getTime() - now.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays;
    };

    const isOverdue = () => {
        if (!assignment?.dueDate) return false;
        return new Date() > new Date(assignment.dueDate);
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case "GRADED":
                return "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400";
            case "PENDING":
                return "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400";
            case "REJECTED":
                return "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400";
            default:
                return "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-400";
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen bg-slate-50 dark:bg-slate-950">
                <div className="text-center">
                    <Loader2 className="w-16 h-16 text-blue-600 animate-spin mx-auto mb-4" />
                    <p className="text-slate-600 dark:text-slate-400">Loading assignment...</p>
                </div>
            </div>
        );
    }

    if (!assignment) {
        return (
            <div className="flex items-center justify-center h-screen bg-slate-50 dark:bg-slate-950">
                <div className="text-center">
                    <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
                    <p className="text-slate-600 dark:text-slate-400">Assignment not found</p>
                    <button
                        onClick={() => router.push(`/learner/learn/${slug}`)}
                        className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                    >
                        Back to Course
                    </button>
                </div>
            </div>
        );
    }

    const daysUntilDue = getDaysUntilDue();
    const canSubmit = eligibility?.canSubmit ?? true;

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
            <div className="max-w-5xl mx-auto p-6 space-y-6">
                {/* Assignment Header */}
                <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6">
                    <div className="flex items-start justify-between gap-4 mb-4">
                        <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
                            {assignment.title}
                        </h1>
                        <span
                            className={`px-3 py-1 rounded-full text-sm font-medium ${assignment.assignmentType === "PRACTICE"
                                    ? "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400"
                                    : assignment.assignmentType === "HOMEWORK"
                                        ? "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400"
                                        : assignment.assignmentType === "PROJECT"
                                            ? "bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400"
                                            : "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400"
                                }`}
                        >
                            {assignment.assignmentType}
                        </span>
                    </div>

                    <div className="flex flex-wrap gap-4 mb-6">
                        {assignment.dueDate && (
                            <div
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg ${isOverdue()
                                        ? "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400"
                                        : daysUntilDue !== null && daysUntilDue <= 3
                                            ? "bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400"
                                            : "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400"
                                    }`}
                            >
                                <Calendar className="w-4 h-4" />
                                <span className="text-sm font-medium">
                                    Due:{" "}
                                    {new Date(assignment.dueDate).toLocaleDateString("en-US", {
                                        month: "short",
                                        day: "numeric",
                                        year: "numeric",
                                        hour: "2-digit",
                                        minute: "2-digit",
                                    })}
                                </span>
                            </div>
                        )}

                        {daysUntilDue !== null && !isOverdue() && (
                            <div className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-lg">
                                <Clock className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                                <span className="text-sm font-medium text-slate-900 dark:text-slate-100">
                                    {daysUntilDue} day{daysUntilDue !== 1 ? "s" : ""} left
                                </span>
                            </div>
                        )}

                        {assignment.totalPoints && (
                            <div className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-lg">
                                <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
                                    Max Score:
                                </span>
                                <span className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                                    {assignment.totalPoints} points
                                </span>
                            </div>
                        )}

                        {eligibility && (
                            <div className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-lg">
                                <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
                                    Attempts:
                                </span>
                                <span className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                                    {eligibility.currentAttempts} /{" "}
                                    {eligibility.maxAttempts ?? "∞"}
                                </span>
                            </div>
                        )}
                    </div>

                    {isOverdue() && !submission && (
                        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-4">
                            <p className="text-sm text-red-800 dark:text-red-300 flex items-center gap-2">
                                <AlertCircle className="w-5 h-5" />
                                This assignment is overdue. Late submissions may receive reduced credit.
                            </p>
                        </div>
                    )}

                    {!canSubmit && eligibility?.reason && (
                        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-4">
                            <p className="text-sm text-red-800 dark:text-red-300 flex items-center gap-2">
                                <AlertCircle className="w-5 h-5" />
                                {eligibility.reason}
                            </p>
                        </div>
                    )}

                    {assignment.description && (
                        <div className="prose dark:prose-invert max-w-none">
                            <pre className="whitespace-pre-wrap font-sans text-slate-600 dark:text-slate-400">
                                {assignment.description}
                            </pre>
                        </div>
                    )}
                </div>

                {/* Submission Status */}
                {submission && (
                    <div
                        className={`bg-white dark:bg-slate-900 rounded-xl border p-6 ${submission.status === "GRADED"
                                ? "border-green-200 dark:border-green-800"
                                : submission.status === "REJECTED"
                                    ? "border-red-200 dark:border-red-800"
                                    : "border-blue-200 dark:border-blue-800"
                            }`}
                    >
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center gap-3">
                                <div
                                    className={`w-12 h-12 rounded-full flex items-center justify-center ${submission.status === "GRADED"
                                            ? "bg-green-100 dark:bg-green-900/30"
                                            : submission.status === "REJECTED"
                                                ? "bg-red-100 dark:bg-red-900/30"
                                                : "bg-blue-100 dark:bg-blue-900/30"
                                        }`}
                                >
                                    <CheckCircle
                                        className={`w-6 h-6 ${submission.status === "GRADED"
                                                ? "text-green-600 dark:text-green-400"
                                                : submission.status === "REJECTED"
                                                    ? "text-red-600 dark:text-red-400"
                                                    : "text-blue-600 dark:text-blue-400"
                                            }`}
                                    />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-slate-900 dark:text-slate-100">
                                        {submission.status === "GRADED"
                                            ? "Assignment Graded"
                                            : submission.status === "REJECTED"
                                                ? "Submission Rejected"
                                                : "Submission Received"}
                                    </h3>
                                    <p className="text-sm text-slate-600 dark:text-slate-400">
                                        Submitted on{" "}
                                        {new Date(submission.submittedAt).toLocaleDateString("en-US", {
                                            month: "long",
                                            day: "numeric",
                                            year: "numeric",
                                            hour: "2-digit",
                                            minute: "2-digit",
                                        })}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(submission.status)}`}>
                                    {submission.status}
                                </span>

                                {submission.status === "GRADED" && submission.score !== undefined && (
                                    <div className="text-right">
                                        <div className="text-3xl font-bold text-green-600 dark:text-green-400">
                                            {submission.score}
                                        </div>
                                        <div className="text-sm text-slate-600 dark:text-slate-400">
                                            / {assignment.totalPoints}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="space-y-3">
                            {/* Uploaded Files */}
                            {submissionFiles.length > 0 && (
                                <div className="space-y-2">
                                    {submissionFiles.map((file) => (
                                        <div
                                            key={file.id}
                                            className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-lg"
                                        >
                                            <div className="flex items-center gap-2">
                                                <FileText className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                                                <span className="text-slate-900 dark:text-slate-100">
                                                    {file.fileName}
                                                </span>
                                            </div>
                                            <button
                                                onClick={() => handleDownloadFile(file)}
                                                className="p-2 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors"
                                            >
                                                <Download className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {submission.content && (
                                <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                                    <p className="text-sm text-slate-600 dark:text-slate-400">
                                        <strong>Your Note:</strong> {submission.content}
                                    </p>
                                </div>
                            )}

                            {submission.feedback && (
                                <div
                                    className={`p-4 border rounded-lg ${submission.status === "REJECTED"
                                            ? "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800"
                                            : "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800"
                                        }`}
                                >
                                    <p
                                        className={`text-sm font-semibold mb-2 ${submission.status === "REJECTED"
                                                ? "text-red-900 dark:text-red-100"
                                                : "text-green-900 dark:text-green-100"
                                            }`}
                                    >
                                        Teacher's Feedback:
                                    </p>
                                    <p
                                        className={`text-sm ${submission.status === "REJECTED"
                                                ? "text-red-800 dark:text-red-200"
                                                : "text-green-800 dark:text-green-200"
                                            }`}
                                    >
                                        {submission.feedback}
                                    </p>
                                </div>
                            )}
                        </div>

                        {submission.status !== "GRADED" && canSubmit && (
                            <button
                                onClick={handleResubmit}
                                className="mt-4 text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium inline-flex items-center gap-2"
                            >
                                <RefreshCw className="w-4 h-4" />
                                Resubmit Assignment
                            </button>
                        )}
                    </div>
                )}

                {/* Upload Form */}
                {!submission && canSubmit && (
                    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6">
                        <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-6">
                            Submit Your Work
                        </h2>

                        <div className="space-y-6">
                            {/* File Upload */}
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
                                    Upload File *
                                </label>

                                {!selectedFile ? (
                                    <label className="block w-full border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-lg p-12 text-center cursor-pointer hover:border-blue-500 dark:hover:border-blue-500 transition-colors">
                                        <Upload className="w-12 h-12 mx-auto text-slate-400 mb-4" />
                                        <p className="text-slate-900 dark:text-slate-100 font-medium mb-2">
                                            Click to upload or drag and drop
                                        </p>
                                        <p className="text-sm text-slate-600 dark:text-slate-400">
                                            Max file size: 10MB
                                        </p>
                                        <input
                                            type="file"
                                            onChange={handleFileChange}
                                            className="hidden"
                                        />
                                    </label>
                                ) : (
                                    <div className="flex items-center justify-between p-4 border border-slate-200 dark:border-slate-700 rounded-lg">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                                                <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                                            </div>
                                            <div>
                                                <p className="font-medium text-slate-900 dark:text-slate-100">
                                                    {selectedFile.name}
                                                </p>
                                                <p className="text-sm text-slate-600 dark:text-slate-400">
                                                    {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                                                </p>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => setSelectedFile(null)}
                                            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                                        >
                                            <X className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                                        </button>
                                    </div>
                                )}
                            </div>

                            {/* Note */}
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
                                    Add a Note (Optional)
                                </label>
                                <textarea
                                    value={note}
                                    onChange={(e) => setNote(e.target.value)}
                                    rows={4}
                                    placeholder="Add any comments or explanations about your submission..."
                                    className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                                    maxLength={500}
                                />
                                <p className="text-xs text-slate-500 dark:text-slate-500 mt-1">
                                    {note.length}/500 characters
                                </p>
                            </div>

                            {/* Error Message */}
                            {error && (
                                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                                    <p className="text-sm text-red-800 dark:text-red-300 flex items-center gap-2">
                                        <AlertCircle className="w-5 h-5" />
                                        {error}
                                    </p>
                                </div>
                            )}

                            {/* Submit Button */}
                            <button
                                onClick={handleSubmit}
                                disabled={!selectedFile || submitting}
                                className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                {submitting ? (
                                    <>
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                        {uploading ? "Uploading..." : "Submitting..."}
                                    </>
                                ) : (
                                    <>
                                        <CheckCircle className="w-5 h-5" />
                                        Submit Assignment
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                )}

                {/* Back Button */}
                <button
                    onClick={() => router.push(`/learner/learn/${slug}`)}
                    className="px-4 py-2 bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg transition-colors"
                >
                    ← Back to Course
                </button>
            </div>
        </div>
    );
}
