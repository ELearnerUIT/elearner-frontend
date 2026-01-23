"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Upload, FileText, CheckCircle, AlertCircle, Calendar, Clock, X } from "lucide-react";

interface AssignmentDetail {
    id: string;
    title: string;
    description: string;
    dueDate: string;
    maxScore: number;
    allowedFileTypes: string[];
    maxFileSize: number; // MB
}

interface MySubmission {
    id: string;
    submittedAt: string;
    fileUrl: string;
    fileName: string;
    note?: string;
    status: "SUBMITTED" | "GRADED" | "LATE";
    grade?: number;
    feedback?: string;
}

export default function AssignmentPage() {
    const params = useParams();
    const router = useRouter();
    const assignmentId = params?.assignmentId as string;
    const slug = params?.slug as string;

    const [assignment, setAssignment] = useState<AssignmentDetail | null>(null);
    const [submission, setSubmission] = useState<MySubmission | null>(null);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [note, setNote] = useState("");
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // TODO: Replace with actual API calls
        const fetchAssignment = async () => {
            setLoading(true);
            try {
                const mockAssignment: AssignmentDetail = {
                    id: assignmentId,
                    title: "Build a Custom Hook",
                    description: `Create a custom React hook that manages form state with validation.

Requirements:
1. The hook should handle form inputs (text, email, password)
2. Implement basic validation (required fields, email format, password strength)
3. Provide methods to get form values, errors, and submit handler
4. Include examples of usage in a demo component

Submission Format:
- Upload a ZIP file containing your code
- Include a README with instructions on how to run your project
- Add comments to explain your implementation

Evaluation Criteria:
- Code quality and organization (40%)
- Functionality and correctness (30%)
- Documentation and examples (20%)
- Edge case handling (10%)`,
                    dueDate: "2026-01-28T23:59:00Z",
                    maxScore: 100,
                    allowedFileTypes: [".zip", ".rar", ".7z"],
                    maxFileSize: 10,
                };
                setAssignment(mockAssignment);

                // Check if already submitted
                // const mockSubmission: MySubmission = {
                //   id: "sub-1",
                //   submittedAt: "2026-01-23T10:30:00Z",
                //   fileUrl: "#",
                //   fileName: "custom-hook-assignment.zip",
                //   note: "Implemented useForm hook with validation",
                //   status: "GRADED",
                //   grade: 85,
                //   feedback: "Good implementation! Consider adding more validation options.",
                // };
                // setSubmission(mockSubmission);
            } catch (error) {
                console.error("Failed to fetch assignment:", error);
            } finally {
                setLoading(false);
            }
        };

        if (assignmentId) {
            fetchAssignment();
        }
    }, [assignmentId]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setError(null);

        // Validate file size
        if (file.size > (assignment?.maxFileSize || 10) * 1024 * 1024) {
            setError(`File size must be less than ${assignment?.maxFileSize}MB`);
            return;
        }

        // Validate file type
        const fileExtension = "." + file.name.split(".").pop();
        if (assignment && !assignment.allowedFileTypes.includes(fileExtension)) {
            setError(`File type must be one of: ${assignment.allowedFileTypes.join(", ")}`);
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
            // TODO: Replace with actual API call using FormData
            const formData = new FormData();
            formData.append("file", selectedFile);
            formData.append("note", note);

            await new Promise((resolve) => setTimeout(resolve, 2000));

            // Mock success
            const mockSubmission: MySubmission = {
                id: "sub-1",
                submittedAt: new Date().toISOString(),
                fileUrl: "#",
                fileName: selectedFile.name,
                note,
                status: "SUBMITTED",
            };
            setSubmission(mockSubmission);
            setSelectedFile(null);
            setNote("");
        } catch (error) {
            console.error("Failed to submit assignment:", error);
            setError("Failed to submit assignment. Please try again.");
        } finally {
            setSubmitting(false);
        }
    };

    const getDaysUntilDue = () => {
        if (!assignment) return 0;
        const now = new Date();
        const due = new Date(assignment.dueDate);
        const diffTime = due.getTime() - now.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays;
    };

    const isOverdue = () => {
        if (!assignment) return false;
        return new Date() > new Date(assignment.dueDate);
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen bg-slate-50 dark:bg-slate-950">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-slate-600 dark:text-slate-400">Loading assignment...</p>
                </div>
            </div>
        );
    }

    if (!assignment) return null;

    const daysUntilDue = getDaysUntilDue();

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
            <div className="max-w-5xl mx-auto p-6 space-y-6">
                {/* Assignment Header */}
                <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6">
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-4">
                        {assignment.title}
                    </h1>

                    <div className="flex flex-wrap gap-4 mb-6">
                        <div className={`flex items-center gap-2 px-4 py-2 rounded-lg ${isOverdue()
                                ? "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400"
                                : daysUntilDue <= 3
                                    ? "bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400"
                                    : "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400"
                            }`}>
                            <Calendar className="w-4 h-4" />
                            <span className="text-sm font-medium">
                                Due: {new Date(assignment.dueDate).toLocaleDateString("en-US", {
                                    month: "short",
                                    day: "numeric",
                                    year: "numeric",
                                    hour: "2-digit",
                                    minute: "2-digit",
                                })}
                            </span>
                        </div>

                        {!isOverdue() && (
                            <div className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-lg">
                                <Clock className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                                <span className="text-sm font-medium text-slate-900 dark:text-slate-100">
                                    {daysUntilDue} day{daysUntilDue !== 1 ? "s" : ""} left
                                </span>
                            </div>
                        )}

                        <div className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-lg">
                            <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
                                Max Score:
                            </span>
                            <span className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                                {assignment.maxScore} points
                            </span>
                        </div>
                    </div>

                    {isOverdue() && !submission && (
                        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-4">
                            <p className="text-sm text-red-800 dark:text-red-300 flex items-center gap-2">
                                <AlertCircle className="w-5 h-5" />
                                This assignment is overdue. Late submissions may receive reduced credit.
                            </p>
                        </div>
                    )}

                    <div className="prose dark:prose-invert max-w-none">
                        <pre className="whitespace-pre-wrap font-sans text-slate-600 dark:text-slate-400">
                            {assignment.description}
                        </pre>
                    </div>
                </div>

                {/* Submission Status */}
                {submission && (
                    <div className={`bg-white dark:bg-slate-900 rounded-xl border p-6 ${submission.status === "GRADED"
                            ? "border-green-200 dark:border-green-800"
                            : "border-blue-200 dark:border-blue-800"
                        }`}>
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center gap-3">
                                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${submission.status === "GRADED"
                                        ? "bg-green-100 dark:bg-green-900/30"
                                        : "bg-blue-100 dark:bg-blue-900/30"
                                    }`}>
                                    <CheckCircle className={`w-6 h-6 ${submission.status === "GRADED"
                                            ? "text-green-600 dark:text-green-400"
                                            : "text-blue-600 dark:text-blue-400"
                                        }`} />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-slate-900 dark:text-slate-100">
                                        {submission.status === "GRADED" ? "Assignment Graded" : "Submission Received"}
                                    </h3>
                                    <p className="text-sm text-slate-600 dark:text-slate-400">
                                        Submitted on {new Date(submission.submittedAt).toLocaleDateString("en-US", {
                                            month: "long",
                                            day: "numeric",
                                            year: "numeric",
                                            hour: "2-digit",
                                            minute: "2-digit",
                                        })}
                                    </p>
                                </div>
                            </div>

                            {submission.status === "GRADED" && submission.grade !== undefined && (
                                <div className="text-right">
                                    <div className="text-3xl font-bold text-green-600 dark:text-green-400">
                                        {submission.grade}
                                    </div>
                                    <div className="text-sm text-slate-600 dark:text-slate-400">
                                        / {assignment.maxScore}
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="space-y-3">
                            <div className="flex items-center gap-2 p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                                <FileText className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                                <a
                                    href={submission.fileUrl}
                                    className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
                                    download
                                >
                                    {submission.fileName}
                                </a>
                            </div>

                            {submission.note && (
                                <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                                    <p className="text-sm text-slate-600 dark:text-slate-400">
                                        <strong>Your Note:</strong> {submission.note}
                                    </p>
                                </div>
                            )}

                            {submission.feedback && (
                                <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                                    <p className="text-sm font-semibold text-green-900 dark:text-green-100 mb-2">
                                        Teacher's Feedback:
                                    </p>
                                    <p className="text-sm text-green-800 dark:text-green-200">
                                        {submission.feedback}
                                    </p>
                                </div>
                            )}
                        </div>

                        {submission.status !== "GRADED" && !isOverdue() && (
                            <button
                                onClick={() => setSubmission(null)}
                                className="mt-4 text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
                            >
                                Resubmit Assignment →
                            </button>
                        )}
                    </div>
                )}

                {/* Upload Form */}
                {!submission && (
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
                                            Allowed: {assignment.allowedFileTypes.join(", ")} (Max {assignment.maxFileSize}MB)
                                        </p>
                                        <input
                                            type="file"
                                            accept={assignment.allowedFileTypes.join(",")}
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
                                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                        Submitting...
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
            </div>
        </div>
    );
}
