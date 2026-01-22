import { QuizType, QuestionType } from '../shared/common.types';

/**
 * Quiz response DTO
 */
export interface QuizResponse {
  id: number;
  lessonId: number;
  title: string;
  description: string | null;
  quizType: QuizType;
  timeLimit: number | null;
  passingScore: number;
  maxAttempts: number | null;
  shuffleQuestions: boolean;
  showCorrectAnswers: boolean;
  isPublished: boolean;
  totalQuestions: number;
  totalPoints: number;
  createdAt: string;
  updatedAt: string;
}

/**
 * Create quiz request DTO
 * POST /api/v1/lessons/{lessonId}/quizzes
 */
export interface CreateQuizRequest {
  title: string;
  description?: string;
  quizType: QuizType;
  timeLimit?: number;
  passingScore: number;
  maxAttempts?: number;
  shuffleQuestions?: boolean;
  showCorrectAnswers?: boolean;
}

/**
 * Update quiz request DTO
 * PUT /api/v1/quizzes/{quizId}
 */
export interface UpdateQuizRequest {
  title?: string;
  description?: string;
  quizType?: QuizType;
  timeLimit?: number;
  passingScore?: number;
  maxAttempts?: number;
  shuffleQuestions?: boolean;
  showCorrectAnswers?: boolean;
  isPublished?: boolean;
}

/**
 * Quiz with questions response
 * GET /api/v1/quizzes/{quizId}/questions
 */
export interface QuizWithQuestionsResponse extends QuizResponse {
  questions: QuestionResponse[];
}

/**
 * Quiz attempt response DTO
 */
export interface QuizAttemptResponse {
  id: number;
  quizId: number;
  studentId: number;
  attemptNumber: number;
  score: number;
  maxScore: number;
  percentage: number;
  isPassed: boolean;
  timeSpentSeconds: number;
  startedAt: string;
  submittedAt: string | null;
  answers: QuizAnswerResponse[];
}

/**
 * Start quiz attempt request DTO
 * POST /api/v1/quizzes/{quizId}/attempts
 */
export interface StartQuizAttemptResponse {
  attemptId: number;
  quizId: number;
  questions: QuestionResponse[];
  timeLimit: number | null;
  startedAt: string;
}

/**
 * Submit quiz attempt request DTO
 * POST /api/v1/quiz-attempts/{attemptId}/submit
 */
export interface SubmitQuizAttemptRequest {
  answers: {
    questionId: number;
    selectedOptionIds?: number[];
    textAnswer?: string;
  }[];
}

/**
 * Quiz answer response
 */
export interface QuizAnswerResponse {
  questionId: number;
  selectedOptionIds: number[] | null;
  textAnswer: string | null;
  isCorrect: boolean;
  pointsAwarded: number;
  feedback: string | null;
}

/**
 * Question response DTO
 */
export interface QuestionResponse {
  id: number;
  quizId: number;
  questionType: QuestionType;
  questionText: string;
  explanation: string | null;
  points: number;
  orderIndex: number;
  options: QuestionOptionResponse[];
}

/**
 * Question option response
 */
export interface QuestionOptionResponse {
  id: number;
  optionText: string;
  isCorrect: boolean;
  orderIndex: number;
}
