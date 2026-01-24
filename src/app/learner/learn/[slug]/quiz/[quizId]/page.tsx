"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { Clock, AlertCircle, CheckCircle, ChevronRight, Loader2, XCircle, RefreshCw } from "lucide-react";
import { assessmentService } from "@/services/assessment/assessment.service";
import { progressService } from "@/services/learning/progress.service";
import studentCourseService from "@/services/learning/student-course.service";
import { useCourseProgress } from "../../course-progress-context";
import { toast } from "sonner";
import type {
    QuizResponse,
    QuizAttemptResponse,
    QuizEligibilityResponse,
    QuestionResponse,
    AnswerOptionResponse,
} from "@/services/assessment/assessment.types";

// Question with options for display
interface QuizQuestionDisplay {
    id: number;
    questionId: number;
    content: string;
    type: string;
    points: number;
    options: AnswerOptionResponse[];
}

export default function QuizPage() {
    const params = useParams();
    const router = useRouter();
    const quizId = params?.quizId as string;
    const slug = params?.slug as string;
    const { refreshProgress } = useCourseProgress();

    // Quiz data state
    const [quiz, setQuiz] = useState<QuizResponse | null>(null);
    const [eligibility, setEligibility] = useState<QuizEligibilityResponse | null>(null);
    const [questions, setQuestions] = useState<QuizQuestionDisplay[]>([]);
    const [attempt, setAttempt] = useState<QuizAttemptResponse | null>(null);
    const [lessonId, setLessonId] = useState<number | null>(null);

    // UI state
    const [loading, setLoading] = useState(true);
    const [starting, setStarting] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [answers, setAnswers] = useState<Record<number, number>>({});
    const [timeLeft, setTimeLeft] = useState(0);
    const [result, setResult] = useState<QuizAttemptResponse | null>(null);

    const timerRef = useRef<NodeJS.Timeout | null>(null);

    // Fetch quiz info and eligibility
    useEffect(() => {
        const fetchQuizData = async () => {
            setLoading(true);
            try {
                // Fetch quiz info for taking (student view)
                const quizData = await assessmentService.getQuizForTaking(Number(quizId));
                setQuiz(quizData);
                setLessonId(quizData.lessonId || null);

                // Set initial time
                if (quizData.timeLimitMinutes) {
                    setTimeLeft(quizData.timeLimitMinutes * 60);
                }

                // Check eligibility
                const eligibilityData = await assessmentService.checkQuizEligibility(Number(quizId));
                setEligibility(eligibilityData);
            } catch (error: any) {
                console.error("Failed to fetch quiz:", error);
                toast.error(error?.message || "Failed to load quiz");
            } finally {
                setLoading(false);
            }
        };

        if (quizId) {
            fetchQuizData();
        }

        return () => {
            if (timerRef.current) {
                clearInterval(timerRef.current);
            }
        };
    }, [quizId]);

    // Timer logic
    useEffect(() => {
        if (attempt && !result && timeLeft > 0) {
            timerRef.current = setInterval(() => {
                setTimeLeft((prev) => {
                    if (prev <= 1) {
                        handleSubmit();
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);

            return () => {
                if (timerRef.current) {
                    clearInterval(timerRef.current);
                }
            };
        }
    }, [attempt, result]);

    const handleStartAttempt = async () => {
        setStarting(true);
        try {
            const attemptData = await assessmentService.startQuiz(Number(quizId));
            setAttempt(attemptData);

            // Set timer from quiz settings
            if (quiz?.timeLimitMinutes) {
                setTimeLeft(quiz.timeLimitMinutes * 60);
            }

            // Build questions from attempt or fetch separately
            if (attemptData.answers && attemptData.answers.length > 0) {
                // If attempt has answers array, we can get questions from there
                const questionsToDisplay: QuizQuestionDisplay[] = [];

                for (const answer of attemptData.answers) {
                    try {
                        const questionData = await assessmentService.getQuestionById(answer.questionId);
                        questionsToDisplay.push({
                            id: answer.questionId,
                            questionId: answer.questionId,
                            content: questionData.content,
                            type: questionData.type,
                            points: questionData.maxPoints,
                            options: questionData.answerOptions || [],
                        });
                    } catch (err) {
                        console.error(`Failed to fetch question ${answer.questionId}:`, err);
                    }
                }
                setQuestions(questionsToDisplay);
            } else if (quiz?.questions && quiz.questions.length > 0) {
                // Use quiz's questions list
                const questionsToDisplay: QuizQuestionDisplay[] = [];

                for (const q of quiz.questions) {
                    try {
                        const questionData = await assessmentService.getQuestionById(q.questionId);
                        questionsToDisplay.push({
                            id: q.id,
                            questionId: q.questionId,
                            content: questionData.content,
                            type: questionData.type,
                            points: q.points || questionData.maxPoints,
                            options: questionData.answerOptions || [],
                        });
                    } catch (err) {
                        console.error(`Failed to fetch question ${q.questionId}:`, err);
                    }
                }
                setQuestions(questionsToDisplay);
            }

            toast.success("Quiz started! Good luck!");
        } catch (error: any) {
            console.error("Failed to start quiz:", error);
            toast.error(error?.message || "Failed to start quiz");
        } finally {
            setStarting(false);
        }
    };

    const handleAnswerChange = async (questionId: number, optionId: number, isMultiple: boolean) => {
        // Update local state
        setAnswers((prev) => ({
            ...prev,
            [questionId]: optionId,
        }));

        // Auto-save answer to backend
        if (attempt) {
            try {
                await assessmentService.submitAnswer(Number(quizId), attempt.id, {
                    questionId,
                    selectedOptionId: optionId,
                });
            } catch (error) {
                console.error("Failed to save answer:", error);
                // Don't show error toast to avoid disturbing the user
            }
        }
    };

    const handleSubmit = useCallback(async () => {
        if (!attempt || submitting) return;

        setSubmitting(true);
        try {
            // Stop timer
            if (timerRef.current) {
                clearInterval(timerRef.current);
            }

            // Finish quiz
            const resultData = await assessmentService.finishQuiz(Number(quizId), attempt.id);
            setResult(resultData);

            // If passed and we have lessonId, mark lesson as completed
            if (resultData.passed && lessonId) {
                try {
                    await progressService.markLessonAsCompleted(lessonId);
                    refreshProgress();
                } catch (err) {
                    console.error("Failed to mark lesson as completed:", err);
                }
            }

            toast.success("Quiz submitted successfully!");
        } catch (error: any) {
            console.error("Failed to submit quiz:", error);
            toast.error(error?.message || "Failed to submit quiz");
        } finally {
            setSubmitting(false);
        }
    }, [attempt, quizId, lessonId, refreshProgress, submitting]);

    const handleRetakeQuiz = () => {
        setResult(null);
        setAttempt(null);
        setAnswers({});
        setQuestions([]);
        if (quiz?.timeLimitMinutes) {
            setTimeLeft(quiz.timeLimitMinutes * 60);
        }
    };

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, "0")}`;
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen bg-slate-50 dark:bg-slate-950">
                <div className="text-center">
                    <Loader2 className="w-16 h-16 text-blue-600 animate-spin mx-auto mb-4" />
                    <p className="text-slate-600 dark:text-slate-400">Loading quiz...</p>
                </div>
            </div>
        );
    }

    if (!quiz) {
        return (
            <div className="flex items-center justify-center h-screen bg-slate-50 dark:bg-slate-950">
                <div className="text-center">
                    <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
                    <p className="text-slate-600 dark:text-slate-400">Quiz not found</p>
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

    // Result Screen
    if (result) {
        const passed = result.passed ?? false;
        const score = result.score ?? 0;
        const totalPoints = result.totalPoints ?? quiz.totalPoints ?? 100;
        const scorePercent = totalPoints > 0 ? Math.round((score / totalPoints) * 100) : 0;

        return (
            <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center p-6">
                <div className="max-w-2xl w-full bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-8 text-center">
                    <div
                        className={`w-24 h-24 mx-auto rounded-full flex items-center justify-center mb-6 ${passed
                                ? "bg-green-100 dark:bg-green-900/30"
                                : "bg-red-100 dark:bg-red-900/30"
                            }`}
                    >
                        {passed ? (
                            <CheckCircle className="w-12 h-12 text-green-600 dark:text-green-400" />
                        ) : (
                            <XCircle className="w-12 h-12 text-red-600 dark:text-red-400" />
                        )}
                    </div>

                    <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-2">
                        {passed ? "Congratulations!" : "Keep Trying!"}
                    </h1>
                    <p className="text-slate-600 dark:text-slate-400 mb-8">
                        {passed
                            ? "You've successfully passed this quiz!"
                            : "Don't worry, you can retake the quiz to improve your score."}
                    </p>

                    <div className="grid grid-cols-2 gap-4 mb-8">
                        <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-6">
                            <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">Your Score</p>
                            <p
                                className={`text-4xl font-bold ${passed
                                        ? "text-green-600 dark:text-green-400"
                                        : "text-red-600 dark:text-red-400"
                                    }`}
                            >
                                {scorePercent}%
                            </p>
                        </div>
                        <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-6">
                            <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">Points Earned</p>
                            <p className="text-4xl font-bold text-slate-900 dark:text-slate-100">
                                {score}/{totalPoints}
                            </p>
                        </div>
                    </div>

                    {result.timeSpent && (
                        <p className="text-sm text-slate-500 dark:text-slate-500 mb-6">
                            Time spent: {formatTime(result.timeSpent)}
                        </p>
                    )}

                    <div className="space-y-3">
                        <button
                            onClick={() => router.push(`/learner/learn/${slug}`)}
                            className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                        >
                            Continue to Next Lesson
                            <ChevronRight className="w-5 h-5 inline ml-2" />
                        </button>
                        {!passed && eligibility && eligibility.remainingAttempts > 0 && (
                            <button
                                onClick={handleRetakeQuiz}
                                className="w-full px-6 py-3 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg font-medium transition-colors inline-flex items-center justify-center gap-2"
                            >
                                <RefreshCw className="w-5 h-5" />
                                Retake Quiz ({eligibility.remainingAttempts} attempts left)
                            </button>
                        )}
                    </div>
                </div>
            </div>
        );
    }

    // Start Screen
    if (!attempt) {
        const canAttempt = eligibility?.canAttempt ?? true;

        return (
            <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center p-6">
                <div className="max-w-2xl w-full bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-8">
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-4">
                        {quiz.title}
                    </h1>
                    {quiz.description && (
                        <p className="text-slate-600 dark:text-slate-400 mb-6">{quiz.description}</p>
                    )}

                    <div className="space-y-4 mb-8">
                        <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                            <span className="text-slate-600 dark:text-slate-400">Total Questions</span>
                            <span className="font-semibold text-slate-900 dark:text-slate-100">
                                {quiz.questions?.length ?? 0}
                            </span>
                        </div>
                        <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                            <span className="text-slate-600 dark:text-slate-400">Time Limit</span>
                            <span className="font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                                <Clock className="w-4 h-4" />
                                {quiz.timeLimitMinutes ? `${quiz.timeLimitMinutes} minutes` : "No limit"}
                            </span>
                        </div>
                        <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                            <span className="text-slate-600 dark:text-slate-400">Passing Score</span>
                            <span className="font-semibold text-slate-900 dark:text-slate-100">
                                {quiz.passingScore ?? 0}%
                            </span>
                        </div>
                        {eligibility && (
                            <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                                <span className="text-slate-600 dark:text-slate-400">Attempts</span>
                                <span className="font-semibold text-slate-900 dark:text-slate-100">
                                    {eligibility.currentAttempts} / {eligibility.maxAttempts ?? "∞"}
                                </span>
                            </div>
                        )}
                    </div>

                    {!canAttempt && eligibility?.reason && (
                        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-6">
                            <p className="text-sm text-red-800 dark:text-red-300 flex items-center gap-2">
                                <AlertCircle className="w-5 h-5" />
                                {eligibility.reason}
                            </p>
                        </div>
                    )}

                    {canAttempt && (
                        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-6">
                            <p className="text-sm text-blue-800 dark:text-blue-300">
                                ⚠️ Once you start the quiz, the timer will begin. Make sure you have a
                                stable internet connection.
                            </p>
                        </div>
                    )}

                    <button
                        onClick={handleStartAttempt}
                        disabled={!canAttempt || starting}
                        className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                        {starting ? (
                            <>
                                <Loader2 className="w-5 h-5 animate-spin" />
                                Starting...
                            </>
                        ) : (
                            "Start Quiz"
                        )}
                    </button>
                </div>
            </div>
        );
    }

    // Quiz Questions Screen
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
            <div className="max-w-4xl mx-auto p-6 space-y-6">
                {/* Timer Bar */}
                <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-4 sticky top-0 z-10">
                    <div className="flex items-center justify-between mb-2">
                        <h2 className="font-semibold text-slate-900 dark:text-slate-100">{quiz.title}</h2>
                        <div
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold ${timeLeft < 60
                                    ? "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400"
                                    : "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400"
                                }`}
                        >
                            <Clock className="w-5 h-5" />
                            {formatTime(timeLeft)}
                        </div>
                    </div>
                    {quiz.timeLimitMinutes && (
                        <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                            <div
                                className="bg-blue-600 h-2 rounded-full transition-all"
                                style={{ width: `${(timeLeft / (quiz.timeLimitMinutes * 60)) * 100}%` }}
                            />
                        </div>
                    )}
                </div>

                {/* Questions */}
                <div className="space-y-6">
                    {questions.map((question, index) => (
                        <div
                            key={question.id}
                            className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6"
                        >
                            <div className="flex gap-4 mb-4">
                                <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold">
                                    {index + 1}
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-1">
                                        {question.content}
                                    </h3>
                                    <p className="text-sm text-slate-500 dark:text-slate-500">
                                        {question.type === "MULTI_SELECT"
                                            ? "Select all that apply"
                                            : "Select one answer"}{" "}
                                        • {question.points} points
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-3 ml-12">
                                {question.options.map((option) => {
                                    const isSelected = answers[question.questionId] === option.id;
                                    return (
                                        <label
                                            key={option.id}
                                            className={`flex items-start gap-3 p-4 border rounded-lg cursor-pointer transition-colors ${isSelected
                                                    ? "border-blue-600 bg-blue-50 dark:bg-blue-900/20"
                                                    : "border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800"
                                                }`}
                                        >
                                            <input
                                                type={
                                                    question.type === "MULTI_SELECT" ? "checkbox" : "radio"
                                                }
                                                name={`question-${question.questionId}`}
                                                checked={isSelected}
                                                onChange={() =>
                                                    handleAnswerChange(
                                                        question.questionId,
                                                        option.id,
                                                        question.type === "MULTI_SELECT"
                                                    )
                                                }
                                                className="mt-1"
                                            />
                                            <span className="text-slate-900 dark:text-slate-100">
                                                {option.content}
                                            </span>
                                        </label>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Submit Button */}
                <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 sticky bottom-0">
                    <button
                        onClick={handleSubmit}
                        disabled={submitting}
                        className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                        {submitting ? (
                            <>
                                <Loader2 className="w-5 h-5 animate-spin" />
                                Submitting...
                            </>
                        ) : (
                            "Submit Quiz"
                        )}
                    </button>
                    <p className="text-sm text-slate-600 dark:text-slate-400 text-center mt-3">
                        {Object.keys(answers).length}/{questions.length} questions answered
                    </p>
                </div>
            </div>
        </div>
    );
}
