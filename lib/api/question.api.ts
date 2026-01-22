/**
 * Question API
 * Quiz question management
 */

import { apiClient } from './client';
import type {
  QuestionResponse,
  CreateQuestionRequest,
  UpdateQuestionRequest,
  UpdateQuestionOptionRequest,
  AddQuestionOptionRequest,
  ReorderQuestionsRequest,
  BulkCreateQuestionsRequest,
} from '@/types';

/**
 * Get question by ID (teacher)
 * GET /questions/{questionId}
 */
export async function getQuestionById(questionId: number): Promise<QuestionResponse> {
  const response = await apiClient.get<QuestionResponse>(`/questions/${questionId}`);
  return response.data;
}

/**
 * Create question (teacher)
 * POST /quizzes/{quizId}/questions
 */
export async function createQuestion(quizId: number, data: CreateQuestionRequest): Promise<QuestionResponse> {
  const response = await apiClient.post<QuestionResponse>(`/quizzes/${quizId}/questions`, data);
  return response.data;
}

/**
 * Bulk create questions (teacher)
 * POST /quizzes/{quizId}/questions/bulk
 */
export async function bulkCreateQuestions(
  quizId: number,
  data: BulkCreateQuestionsRequest
): Promise<QuestionResponse[]> {
  const response = await apiClient.post<QuestionResponse[]>(`/quizzes/${quizId}/questions/bulk`, data);
  return response.data;
}

/**
 * Update question (teacher)
 * PUT /questions/{questionId}
 */
export async function updateQuestion(questionId: number, data: UpdateQuestionRequest): Promise<QuestionResponse> {
  const response = await apiClient.put<QuestionResponse>(`/questions/${questionId}`, data);
  return response.data;
}

/**
 * Delete question (teacher)
 * DELETE /questions/{questionId}
 */
export async function deleteQuestion(questionId: number): Promise<void> {
  await apiClient.delete(`/questions/${questionId}`);
}

/**
 * Reorder questions (teacher)
 * POST /quizzes/{quizId}/questions/reorder
 */
export async function reorderQuestions(quizId: number, data: ReorderQuestionsRequest): Promise<void> {
  await apiClient.post(`/quizzes/${quizId}/questions/reorder`, data);
}

// ==================== QUESTION OPTION ENDPOINTS ====================

/**
 * Add question option (teacher)
 * POST /questions/{questionId}/options
 */
export async function addQuestionOption(
  questionId: number,
  data: AddQuestionOptionRequest
): Promise<QuestionResponse> {
  const response = await apiClient.post<QuestionResponse>(`/questions/${questionId}/options`, data);
  return response.data;
}

/**
 * Update question option (teacher)
 * PUT /questions/{questionId}/options/{optionId}
 */
export async function updateQuestionOption(
  questionId: number,
  optionId: number,
  data: UpdateQuestionOptionRequest
): Promise<QuestionResponse> {
  const response = await apiClient.put<QuestionResponse>(`/questions/${questionId}/options/${optionId}`, data);
  return response.data;
}

/**
 * Delete question option (teacher)
 * DELETE /questions/{questionId}/options/{optionId}
 */
export async function deleteQuestionOption(questionId: number, optionId: number): Promise<QuestionResponse> {
  const response = await apiClient.delete<QuestionResponse>(`/questions/${questionId}/options/${optionId}`);
  return response.data;
}
