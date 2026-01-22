/**
 * Generic paginated data structure
 */
export interface PaginatedData<T> {
  items: T[];
  meta: PaginationMeta;
}

/**
 * Pagination metadata
 */
export interface PaginationMeta {
  currentPage: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

/**
 * Pagination request configuration
 */
export interface PaginationRequest {
  page: number;
  size: number;
}

/**
 * Cursor-based pagination parameters
 */
export interface CursorPaginationParams {
  cursor?: string;
  limit?: number;
}

/**
 * Cursor-based pagination response
 */
export interface CursorPageResponse<T> {
  items: T[];
  nextCursor: string | null;
  hasMore: boolean;
}
