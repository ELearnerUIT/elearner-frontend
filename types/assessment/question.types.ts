import { QuestionType } from '../shared/common.types';

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
  createdAt: string;
  updatedAt: string;
  options: QuestionOptionResponse[];
}

/**
 * Question option response
 */
export interface QuestionOptionResponse {
  id: number;
  questionId: number;
  optionText: string;
  isCorrect: boolean;
  orderIndex: number;
}

/**
 * Create question request DTO
 * POST /api/v1/quizzes/{quizId}/questions
 */
export interface CreateQuestionRequest {
  questionType: QuestionType;
  questionText: string;
  explanation?: string;
  points: number;
  orderIndex?: number;
  options: CreateQuestionOptionRequest[];
}

/**
 * Create question option request
 */
export interface CreateQuestionOptionRequest {
  optionText: string;
  isCorrect: boolean;
  orderIndex?: number;
}

/**
 * Update question request DTO
 * PUT /api/v1/questions/{questionId}
 */
export interface UpdateQuestionRequest {
  questionType?: QuestionType;
  questionText?: string;
  explanation?: string;
  points?: number;
  orderIndex?: number;
}

/**
 * Update question option request DTO
 * PUT /api/v1/questions/{questionId}/options/{optionId}
 */
export interface UpdateQuestionOptionRequest {
  optionText?: string;
  isCorrect?: boolean;
  orderIndex?: number;
}

/**
 * Add question option request DTO
 * POST /api/v1/questions/{questionId}/options
 */
export interface AddQuestionOptionRequest {
  optionText: string;
  isCorrect: boolean;
  orderIndex?: number;
}

/**
 * Reorder questions request DTO
 * POST /api/v1/quizzes/{quizId}/questions/reorder
 */
export interface ReorderQuestionsRequest {
  questionIds: number[];
}

/**
 * Bulk create questions request DTO
 * POST /api/v1/quizzes/{quizId}/questions/bulk
 */
export interface BulkCreateQuestionsRequest {
  questions: CreateQuestionRequest[];
}
