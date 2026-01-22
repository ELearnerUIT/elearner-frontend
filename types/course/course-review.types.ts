import { PaginationParams } from '../shared/api.types';

/**
 * Course review response DTO
 */
export interface ReviewResponse {
  id: number;
  courseId: number;
  studentId: number;
  studentName: string;
  studentAvatarUrl: string;
  rating: number;
  title: string;
  content: string;
  isVisible: boolean;
  createdAt: string;
  updatedAt: string;
}

/**
 * Create review request DTO
 * POST /api/v1/courses/{courseId}/reviews
 */
export interface CreateReviewRequest {
  rating: number;
  title: string;
  content: string;
}

/**
 * Update review request DTO
 * PUT /api/v1/courses/{courseId}/reviews/{reviewId}
 */
export interface UpdateReviewRequest {
  rating?: number;
  title?: string;
  content?: string;
}

/**
 * Review query parameters
 * GET /api/v1/public/courses/{courseId}/reviews
 */
export interface ReviewQueryParams extends PaginationParams {
  sort?: 'newest' | 'rating_desc' | 'rating_asc';
  minRating?: number;
  maxRating?: number;
}

/**
 * Rating summary response DTO
 * GET /api/v1/public/courses/{courseId}/rating-summary
 */
export interface RatingSummaryResponse {
  courseId: number;
  averageRating: number;
  totalReviews: number;
  distribution: RatingDistribution;
}

/**
 * Rating distribution by stars
 */
export interface RatingDistribution {
  5: number;
  4: number;
  3: number;
  2: number;
  1: number;
}
