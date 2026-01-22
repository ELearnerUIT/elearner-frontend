/**
 * Quiz API Service
 * Handles quiz and quiz attempt operations
 */

import { apiInstance } from "../client";
import { unwrapResponse } from "../types";
import type {
  QuizRequest,
  QuizResponse,
  QuizAttemptResponse,
  SubmitAnswerRequest,
} from "../generated/data-contracts";

class QuizApiService {
  /**
   * Create quiz
   */
  async create(lessonId: number, data: QuizRequest): Promise<QuizResponse> {
    const response = await apiInstance.createQuiz(lessonId, data);
    return unwrapResponse<QuizResponse>(response);
  }

  /**
   * Get quiz by ID
   */
  async getById(quizId: number): Promise<QuizResponse> {
    const response = await apiInstance.getQuiz(quizId);
    return unwrapResponse<QuizResponse>(response);
  }

  /**
   * Update quiz
   */
  async update(quizId: number, data: QuizRequest): Promise<QuizResponse> {
    const response = await apiInstance.updateQuiz(quizId, data);
    return unwrapResponse<QuizResponse>(response);
  }

  /**
   * Delete quiz
   */
  async delete(quizId: number): Promise<void> {
    await apiInstance.deleteQuiz(quizId);
  }

  /**
   * Start quiz attempt
   */
  async startAttempt(quizId: number): Promise<QuizAttemptResponse> {
    const response = await apiInstance.startQuiz(quizId);
    return unwrapResponse<QuizAttemptResponse>(response);
  }

  /**
   * Submit an answer for a quiz question
   */
  async submitAnswer(
    quizId: number,
    attemptId: number,
    data: SubmitAnswerRequest,
  ): Promise<void> {
    await apiInstance.submitAnswer(quizId, attemptId, data);
  }

  /**
   * Finish quiz attempt and calculate score
   */
  async finishAttempt(
    quizId: number,
    attemptId: number,
  ): Promise<QuizAttemptResponse> {
    const response = await apiInstance.finishQuiz(quizId, attemptId);
    return unwrapResponse<QuizAttemptResponse>(response);
  }

  /**
   * Get quiz attempt result
   */
  async getAttemptResult(
    quizId: number,
    attemptId: number,
  ): Promise<QuizAttemptResponse> {
    const response = await apiInstance.getQuizAttempt(quizId, attemptId);
    return unwrapResponse<QuizAttemptResponse>(response);
  }

  /**
   * Abandon quiz attempt
   */
  async abandonAttempt(quizId: number, attemptId: number): Promise<void> {
    await apiInstance.abandonQuizAttempt(quizId, attemptId);
  }
}

export const quizApi = new QuizApiService();
