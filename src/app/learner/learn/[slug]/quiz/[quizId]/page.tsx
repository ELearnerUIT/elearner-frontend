"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Clock, AlertCircle, CheckCircle, ChevronRight } from "lucide-react";

interface QuizQuestion {
    id: string;
    questionText: string;
    questionType: "SINGLE" | "MULTIPLE";
    options: {
        id: string;
        optionText: string;
    }[];
}

interface QuizDetail {
    id: string;
    title: string;
    description?: string;
    duration: number; // seconds
    passingScore: number;
    totalQuestions: number;
    questions: QuizQuestion[];
}

export default function QuizPage() {
    const params = useParams();
    const router = useRouter();
    const quizId = params?.quizId as string;
    const slug = params?.slug as string;

    const [quiz, setQuiz] = useState<QuizDetail | null>(null);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [answers, setAnswers] = useState<Record<string, string[]>>({});
    const [timeLeft, setTimeLeft] = useState(0);
    const [attemptStarted, setAttemptStarted] = useState(false);
    const [result, setResult] = useState<{
        score: number;
        passed: boolean;
        correctAnswers: number;
    } | null>(null);

    useEffect(() => {
        // TODO: Replace with actual API call
        const fetchQuiz = async () => {
            setLoading(true);
            try {
                const mockQuiz: QuizDetail = {
                    id: quizId,
                    title: "Module 3 Quiz",
                    description: "Test your knowledge of React Hooks and Patterns",
                    duration: 600, // 10 minutes
                    passingScore: 70,
                    totalQuestions: 5,
                    questions: [
                        {
                            id: "q1",
                            questionText: "What is the purpose of useEffect hook?",
                            questionType: "SINGLE",
                            options: [
                                { id: "opt1", optionText: "To manage state" },
                                { id: "opt2", optionText: "To handle side effects" },
                                { id: "opt3", optionText: "To create refs" },
                                { id: "opt4", optionText: "To optimize performance" },
                            ],
                        },
                        {
                            id: "q2",
                            questionText: "Which hooks can be used for performance optimization? (Select all that apply)",
                            questionType: "MULTIPLE",
                            options: [
                                { id: "opt5", optionText: "useMemo" },
                                { id: "opt6", optionText: "useCallback" },
                                { id: "opt7", optionText: "useState" },
                                { id: "opt8", optionText: "React.memo" },
                            ],
                        },
                        {
                            id: "q3",
                            questionText: "When does useEffect run by default?",
                            questionType: "SINGLE",
                            options: [
                                { id: "opt9", optionText: "Only on mount" },
                                { id: "opt10", optionText: "After every render" },
                                { id: "opt11", optionText: "Only on unmount" },
                                { id: "opt12", optionText: "When dependencies change" },
                            ],
                        },
                        {
                            id: "q4",
                            questionText: "What is a custom hook?",
                            questionType: "SINGLE",
                            options: [
                                { id: "opt13", optionText: "A built-in React hook" },
                                { id: "opt14", optionText: "A function that uses React hooks" },
                                { id: "opt15", optionText: "A class component method" },
                                { id: "opt16", optionText: "A CSS-in-JS solution" },
                            ],
                        },
                        {
                            id: "q5",
                            questionText: "Which of the following are rules of hooks? (Select all that apply)",
                            questionType: "MULTIPLE",
                            options: [
                                { id: "opt17", optionText: "Only call hooks at the top level" },
                                { id: "opt18", optionText: "Only call hooks from React functions" },
                                { id: "opt19", optionText: "Hooks can be called conditionally" },
                                { id: "opt20", optionText: "Hooks must start with 'use'" },
                            ],
                        },
                    ],
                };
                setQuiz(mockQuiz);
                setTimeLeft(mockQuiz.duration);
            } catch (error) {
                console.error("Failed to fetch quiz:", error);
            } finally {
                setLoading(false);
            }
        };

        if (quizId) {
            fetchQuiz();
        }
    }, [quizId]);

    useEffect(() => {
        if (attemptStarted && timeLeft > 0 && !result) {
            const timer = setInterval(() => {
                setTimeLeft((prev) => {
                    if (prev <= 1) {
                        handleSubmit();
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);

            return () => clearInterval(timer);
        }
    }, [attemptStarted, timeLeft, result]);

    const handleStartAttempt = () => {
        setAttemptStarted(true);
    };

    const handleAnswerChange = (questionId: string, optionId: string, isMultiple: boolean) => {
        setAnswers((prev) => {
            if (isMultiple) {
                const currentAnswers = prev[questionId] || [];
                if (currentAnswers.includes(optionId)) {
                    return {
                        ...prev,
                        [questionId]: currentAnswers.filter((id) => id !== optionId),
                    };
                } else {
                    return {
                        ...prev,
                        [questionId]: [...currentAnswers, optionId],
                    };
                }
            } else {
                return {
                    ...prev,
                    [questionId]: [optionId],
                };
            }
        });
    };

    const handleSubmit = async () => {
        setSubmitting(true);
        try {
            // TODO: Replace with actual API call
            await new Promise((resolve) => setTimeout(resolve, 1000));

            // Mock result
            const mockResult = {
                score: 85,
                passed: true,
                correctAnswers: 4,
            };
            setResult(mockResult);
        } catch (error) {
            console.error("Failed to submit quiz:", error);
        } finally {
            setSubmitting(false);
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
                    <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-slate-600 dark:text-slate-400">Loading quiz...</p>
                </div>
            </div>
        );
    }

    if (!quiz) return null;

    // Result Screen
    if (result) {
        return (
            <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center p-6">
                <div className="max-w-2xl w-full bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-8 text-center">
                    <div className={`w-24 h-24 mx-auto rounded-full flex items-center justify-center mb-6 ${result.passed
                            ? "bg-green-100 dark:bg-green-900/30"
                            : "bg-red-100 dark:bg-red-900/30"
                        }`}>
                        {result.passed ? (
                            <CheckCircle className="w-12 h-12 text-green-600 dark:text-green-400" />
                        ) : (
                            <AlertCircle className="w-12 h-12 text-red-600 dark:text-red-400" />
                        )}
                    </div>

                    <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-2">
                        {result.passed ? "Congratulations!" : "Keep Trying!"}
                    </h1>
                    <p className="text-slate-600 dark:text-slate-400 mb-8">
                        {result.passed
                            ? "You've successfully passed this quiz!"
                            : "Don't worry, you can retake the quiz to improve your score."}
                    </p>

                    <div className="grid grid-cols-2 gap-4 mb-8">
                        <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-6">
                            <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">Your Score</p>
                            <p className={`text-4xl font-bold ${result.passed ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
                                }`}>
                                {result.score}%
                            </p>
                        </div>
                        <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-6">
                            <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">Correct Answers</p>
                            <p className="text-4xl font-bold text-slate-900 dark:text-slate-100">
                                {result.correctAnswers}/{quiz.totalQuestions}
                            </p>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <button
                            onClick={() => router.push(`/learner/learn/${slug}`)}
                            className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                        >
                            Continue to Next Lesson
                            <ChevronRight className="w-5 h-5 inline ml-2" />
                        </button>
                        {!result.passed && (
                            <button
                                onClick={() => {
                                    setResult(null);
                                    setAnswers({});
                                    setTimeLeft(quiz.duration);
                                    setAttemptStarted(false);
                                }}
                                className="w-full px-6 py-3 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg font-medium transition-colors"
                            >
                                Retake Quiz
                            </button>
                        )}
                    </div>
                </div>
            </div>
        );
    }

    // Start Screen
    if (!attemptStarted) {
        return (
            <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center p-6">
                <div className="max-w-2xl w-full bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-8">
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-4">
                        {quiz.title}
                    </h1>
                    {quiz.description && (
                        <p className="text-slate-600 dark:text-slate-400 mb-6">
                            {quiz.description}
                        </p>
                    )}

                    <div className="space-y-4 mb-8">
                        <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                            <span className="text-slate-600 dark:text-slate-400">Total Questions</span>
                            <span className="font-semibold text-slate-900 dark:text-slate-100">
                                {quiz.totalQuestions}
                            </span>
                        </div>
                        <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                            <span className="text-slate-600 dark:text-slate-400">Time Limit</span>
                            <span className="font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                                <Clock className="w-4 h-4" />
                                {formatTime(quiz.duration)}
                            </span>
                        </div>
                        <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                            <span className="text-slate-600 dark:text-slate-400">Passing Score</span>
                            <span className="font-semibold text-slate-900 dark:text-slate-100">
                                {quiz.passingScore}%
                            </span>
                        </div>
                    </div>

                    <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-6">
                        <p className="text-sm text-blue-800 dark:text-blue-300">
                            ⚠️ Once you start the quiz, the timer will begin. Make sure you have a stable internet connection.
                        </p>
                    </div>

                    <button
                        onClick={handleStartAttempt}
                        className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                    >
                        Start Quiz
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
                        <div className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold ${timeLeft < 60
                                ? "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400"
                                : "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400"
                            }`}>
                            <Clock className="w-5 h-5" />
                            {formatTime(timeLeft)}
                        </div>
                    </div>
                    <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                        <div
                            className="bg-blue-600 h-2 rounded-full transition-all"
                            style={{ width: `${(timeLeft / quiz.duration) * 100}%` }}
                        />
                    </div>
                </div>

                {/* Questions */}
                <div className="space-y-6">
                    {quiz.questions.map((question, index) => (
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
                                        {question.questionText}
                                    </h3>
                                    <p className="text-sm text-slate-500 dark:text-slate-500">
                                        {question.questionType === "MULTIPLE" ? "Select all that apply" : "Select one answer"}
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-3 ml-12">
                                {question.options.map((option) => {
                                    const isSelected = answers[question.id]?.includes(option.id);
                                    return (
                                        <label
                                            key={option.id}
                                            className={`flex items-start gap-3 p-4 border rounded-lg cursor-pointer transition-colors ${isSelected
                                                    ? "border-blue-600 bg-blue-50 dark:bg-blue-900/20"
                                                    : "border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800"
                                                }`}
                                        >
                                            <input
                                                type={question.questionType === "MULTIPLE" ? "checkbox" : "radio"}
                                                name={question.id}
                                                checked={isSelected}
                                                onChange={() => handleAnswerChange(question.id, option.id, question.questionType === "MULTIPLE")}
                                                className="mt-1"
                                            />
                                            <span className="text-slate-900 dark:text-slate-100">{option.optionText}</span>
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
                        disabled={submitting || Object.keys(answers).length < quiz.questions.length}
                        className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {submitting ? "Submitting..." : "Submit Quiz"}
                    </button>
                    <p className="text-sm text-slate-600 dark:text-slate-400 text-center mt-3">
                        {Object.keys(answers).length}/{quiz.questions.length} questions answered
                    </p>
                </div>
            </div>
        </div>
    );
}
