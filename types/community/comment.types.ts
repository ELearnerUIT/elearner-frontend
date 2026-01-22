import { CommentStatus } from '../shared/common.types';

/**
 * Comment response DTO
 */
export interface CommentResponse {
  id: number;
  lessonId: number;
  userId: number;
  userName: string;
  userAvatarUrl: string | null;
  userRole: string;
  content: string;
  status: CommentStatus;
  parentCommentId: number | null;
  replyCount: number;
  likeCount: number;
  isLikedByCurrentUser: boolean;
  isPinnedByTeacher: boolean;
  createdAt: string;
  updatedAt: string;
  replies?: CommentResponse[];
}

/**
 * Create comment request DTO
 * POST /api/v1/lessons/{lessonId}/comments
 */
export interface CreateCommentRequest {
  content: string;
  parentCommentId?: number;
}

/**
 * Update comment request DTO
 * PUT /api/v1/comments/{commentId}
 */
export interface UpdateCommentRequest {
  content: string;
}

/**
 * Comment query parameters
 */
export interface CommentQueryParams {
  lessonId?: number;
  status?: CommentStatus;
  parentCommentId?: number | 'null';
  page?: number;
  size?: number;
  sortBy?: string;
  sortDirection?: 'ASC' | 'DESC';
}

/**
 * Toggle like response
 * POST /api/v1/comments/{commentId}/like
 */
export interface ToggleLikeResponse {
  isLiked: boolean;
  likeCount: number;
}

/**
 * Pin/Unpin comment request
 * POST /api/v1/comments/{commentId}/pin
 */
export interface PinCommentRequest {
  isPinned: boolean;
}
