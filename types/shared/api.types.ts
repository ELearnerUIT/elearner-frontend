/**
 * Standard API response wrapper
 * Used by all backend endpoints
 */
export interface ApiResponse<T = unknown> {
  success: boolean;
  status: number;
  message: string;
  data?: T;
  code?: string;
  timestamp?: string;
}

/**
 * API error response structure
 */
export interface ApiError {
  success: false;
  status: number;
  message: string;
  code?: string;
  errors?: ValidationError[];
  timestamp?: string;
}

/**
 * Validation error details
 */
export interface ValidationError {
  field: string;
  message: string;
  rejectedValue?: unknown;
}

/**
 * Paginated API response
 */
export interface PageResponse<T> {
  items: T[];
  page: number;
  size: number;
  totalItems: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

/**
 * Pagination request parameters
 */
export interface PaginationParams {
  page?: number;
  size?: number;
  sort?: string | string[];
}

/**
 * Date range filter parameters
 */
export interface DateRangeParams {
  startDate?: string;
  endDate?: string;
}

/**
 * Sort configuration
 */
export interface SortParams {
  field: string;
  order: 'asc' | 'desc';
}

/**
 * Generic filter parameters
 */
export interface FilterParams {
  filter?: string;
  [key: string]: string | string[] | number | boolean | undefined;
}

/**
 * Query parameters combining pagination and filtering
 */
export interface QueryParams extends PaginationParams, FilterParams {}
