/**
 * Error Interceptor
 * Maps HTTP status codes to typed error classes
 */

import { AxiosError } from "axios";
import {
  ApiError,
  ValidationError,
  UnauthorizedError,
  ForbiddenError,
  NotFoundError,
  ServerError,
  NetworkError,
} from "../errors";

export function errorResponseInterceptor(error: AxiosError): Promise<never> {
  if (!error.response) {
    // Network error or request was cancelled
    return Promise.reject(new NetworkError(error.message));
  }

  const { status, data } = error.response;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const errorData = data as any;

  const message = errorData?.message || error.message || "An error occurred";
  const code = errorData?.code;

  switch (status) {
    case 400:
      return Promise.reject(
        new ValidationError(message, errorData?.errors || errorData?.data),
      );

    case 401:
      return Promise.reject(new UnauthorizedError(message));

    case 403:
      return Promise.reject(new ForbiddenError(message));

    case 404:
      return Promise.reject(new NotFoundError(message));

    case 500:
    case 502:
    case 503:
    case 504:
      return Promise.reject(new ServerError(message));

    default:
      return Promise.reject(
        new ApiError(status, message, code, errorData?.data),
      );
  }
}
