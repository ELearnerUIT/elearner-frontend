/**
 * Custom API Error Classes
 * Type-safe error handling for API responses
 */

export class ApiError extends Error {
  constructor(
    public status: number,
    public message: string,
    public code?: string,
    public data?: any,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

export class ValidationError extends ApiError {
  constructor(
    message: string,
    public errors?: Record<string, string[]>,
  ) {
    super(400, message, "VALIDATION_ERROR", errors);
    this.name = "ValidationError";
  }
}

export class UnauthorizedError extends ApiError {
  constructor(message: string = "Unauthorized") {
    super(401, message, "UNAUTHORIZED");
    this.name = "UnauthorizedError";
  }
}

export class ForbiddenError extends ApiError {
  constructor(message: string = "Forbidden") {
    super(403, message, "FORBIDDEN");
    this.name = "ForbiddenError";
  }
}

export class NotFoundError extends ApiError {
  constructor(message: string = "Not Found") {
    super(404, message, "NOT_FOUND");
    this.name = "NotFoundError";
  }
}

export class ServerError extends ApiError {
  constructor(message: string = "Internal Server Error") {
    super(500, message, "SERVER_ERROR");
    this.name = "ServerError";
  }
}

export class NetworkError extends Error {
  constructor(message: string = "Network request failed") {
    super(message);
    this.name = "NetworkError";
  }
}
