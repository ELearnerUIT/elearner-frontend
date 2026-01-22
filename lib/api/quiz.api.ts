/**
 * Quiz API
 * Quiz management and student attempts
 */

import { apiClient } from './client';
import type {
  QuizResponse,
  CreateQuizRequest,
  UpdateQuizRequest,
  QuizWithQuestionsResponse,
  QuizAttemptResponse,
  StartQuizAttemptResponse,
  SubmitQuizAttemptRequest,
} from '@/types';

/**
 * Get quiz by ID (teacher/student)
 * GET /quizzes/{quizId}
 */
export async function getQuizById(quizId: number): Promise<QuizResponse> {
  const response = await apiClient.get<QuizResponse>(`/quizzes/${quizId}`);
  return response.data;
}

/**
 * Get quiz with questions (teacher/student)
 * GET /quizzes/{quizId}/questions
 */
export async function getQuizWithQuestions(quizId: number): Promise<QuizWithQuestionsResponse> {
  const response = await apiClient.get<QuizWithQuestionsResponse>(`/quizzes/${quizId}/questions`);
  return response.data;
}

/**
 * Get lesson quizzes (teacher/student)
 * GET /lessons/{lessonId}/quizzes
 */
export async function getLessonQuizzes(lessonId: number): Promise<QuizResponse[]> {
  const response = await apiClient.get<QuizResponse[]>(`/lessons/${lessonId}/quizzes`);
  return response.data;
}

/**
 * Create quiz (teacher)
 * POST /lessons/{lessonId}/quizzes
 */
export async function createQuiz(lessonId: number, data: CreateQuizRequest): Promise<QuizResponse> {
  const response = await apiClient.post<QuizResponse>(`/lessons/${lessonId}/quizzes`, data);
  return response.data;
}

/**
 * Update quiz (teacher)
 * PUT /quizzes/{quizId}
 */
export async function updateQuiz(quizId: number, data: UpdateQuizRequest): Promise<QuizResponse> {
  const response = await apiClient.put<QuizResponse>(`/quizzes/${quizId}`, data);
  return response.data;
}

/**
 * Delete quiz (teacher)
 * DELETE /quizzes/{quizId}
 */
export async function deleteQuiz(quizId: number): Promise<void> {
  await apiClient.delete(`/quizzes/${quizId}`);
}

/**
 * Publish quiz (teacher)
 * POST /quizzes/{quizId}/publish
 */
export async function publishQuiz(quizId: number): Promise<QuizResponse> {
  const response = await apiClient.post<QuizResponse>(`/quizzes/${quizId}/publish`);
  return response.data;
}

/**
 * Unpublish quiz (teacher)
 * POST /quizzes/{quizId}/unpublish
 */
export async function unpublishQuiz(quizId: number): Promise<QuizResponse> {
  const response = await apiClient.post<QuizResponse>(`/quizzes/${quizId}/unpublish`);
  return response.data;
}

// ==================== STUDENT ATTEMPT ENDPOINTS ====================

/**
 * Start quiz attempt (student)
 * POST /quizzes/{quizId}/attempts
 */
export async function startQuizAttempt(quizId: number): Promise<StartQuizAttemptResponse> {
  const response = await apiClient.post<StartQuizAttemptResponse>(`/quizzes/${quizId}/attempts`);
  return response.data;
}

/**
 * Submit quiz attempt (student)
 * POST /quiz-attempts/{attemptId}/submit
 */
export async function submitQuizAttempt(
  attemptId: number,
  data: SubmitQuizAttemptRequest
): Promise<QuizAttemptResponse> {
  const response = await apiClient.post<QuizAttemptResponse>(`/quiz-attempts/${attemptId}/submit`, data);
  return response.data;
}

/**
 * Get quiz attempt by ID (student/teacher)
 * GET /quiz-attempts/{attemptId}
 */
export async function getQuizAttemptById(attemptId: number): Promise<QuizAttemptResponse> {
  const response = await apiClient.get<QuizAttemptResponse>(`/quiz-attempts/${attemptId}`);
  return response.data;
}

/**
 * Get my quiz attempts (student)
 * GET /quizzes/{quizId}/my-attempts
 */
export async function getMyQuizAttempts(quizId: number): Promise<QuizAttemptResponse[]> {
  const response = await apiClient.get<QuizAttemptResponse[]>(`/quizzes/${quizId}/my-attempts`);
  return response.data;
}

/**
 * Get all quiz attempts (teacher)
 * GET /quizzes/{quizId}/attempts
 */
export async function getQuizAttempts(quizId: number): Promise<QuizAttemptResponse[]> {
  const response = await apiClient.get<QuizAttemptResponse[]>(`/quizzes/${quizId}/attempts`);
  return response.data;
}
