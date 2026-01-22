/**
 * Comment API
 * Lesson comments, replies, and interactions
 */

import { apiClient } from './client';
import type {
  CommentResponse,
  CreateCommentRequest,
  UpdateCommentRequest,
  CommentQueryParams,
  ToggleLikeResponse,
  PinCommentRequest,
  PageResponse,
} from '@/types';

/**
 * Get lesson comments (authenticated)
 * GET /lessons/{lessonId}/comments
 */
export async function getLessonComments(
  lessonId: number,
  params?: CommentQueryParams
): Promise<PageResponse<CommentResponse>> {
  const response = await apiClient.get<PageResponse<CommentResponse>>(`/lessons/${lessonId}/comments`, { params });
  return response.data;
}

/**
 * Get comment by ID (authenticated)
 * GET /comments/{commentId}
 */
export async function getCommentById(commentId: number): Promise<CommentResponse> {
  const response = await apiClient.get<CommentResponse>(`/comments/${commentId}`);
  return response.data;
}

/**
 * Get comment replies (authenticated)
 * GET /comments/{commentId}/replies
 */
export async function getCommentReplies(
  commentId: number,
  params?: CommentQueryParams
): Promise<PageResponse<CommentResponse>> {
  const response = await apiClient.get<PageResponse<CommentResponse>>(`/comments/${commentId}/replies`, { params });
  return response.data;
}

/**
 * Create comment (authenticated)
 * POST /lessons/{lessonId}/comments
 */
export async function createComment(lessonId: number, data: CreateCommentRequest): Promise<CommentResponse> {
  const response = await apiClient.post<CommentResponse>(`/lessons/${lessonId}/comments`, data);
  return response.data;
}

/**
 * Update comment (author only)
 * PUT /comments/{commentId}
 */
export async function updateComment(commentId: number, data: UpdateCommentRequest): Promise<CommentResponse> {
  const response = await apiClient.put<CommentResponse>(`/comments/${commentId}`, data);
  return response.data;
}

/**
 * Delete comment (author/admin)
 * DELETE /comments/{commentId}
 */
export async function deleteComment(commentId: number): Promise<void> {
  await apiClient.delete(`/comments/${commentId}`);
}

/**
 * Toggle like on comment (authenticated)
 * POST /comments/{commentId}/like
 */
export async function toggleLikeComment(commentId: number): Promise<ToggleLikeResponse> {
  const response = await apiClient.post<ToggleLikeResponse>(`/comments/${commentId}/like`);
  return response.data;
}

/**
 * Pin/Unpin comment (teacher)
 * POST /comments/{commentId}/pin
 */
export async function pinComment(commentId: number, data: PinCommentRequest): Promise<CommentResponse> {
  const response = await apiClient.post<CommentResponse>(`/comments/${commentId}/pin`, data);
  return response.data;
}

/**
 * Get all comments (admin)
 * GET /admin/comments
 */
export async function getAllComments(params?: CommentQueryParams): Promise<PageResponse<CommentResponse>> {
  const response = await apiClient.get<PageResponse<CommentResponse>>('/admin/comments', { params });
  return response.data;
}
