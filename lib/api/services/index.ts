/**
 * API Services Export
 * Central export point for all API services
 */

export { authApi } from "./authApi";
export { categoryApi } from "./categoryApi";
export { courseApi } from "./courseApi";
export { studentApi } from "./studentApi";
export { teacherApi } from "./teacherApi";
export { enrollmentApi } from "./enrollmentApi";
export { paymentApi } from "./paymentApi";
export { quizApi } from "./quizApi";
export { fileApi } from "./fileApi";

// Re-export common types
export type {
  ReqLoginDTO,
  ResLoginDTO,
  RegisterRequest,
  RegisterResponse,
  CategoryResponseDto,
  CategoryRequest,
  CourseRequest,
  CourseDetailResponse,
  CourseUpdateRequest,
  StudentDetailResponse,
  TeacherDetailResponse,
  EnrollCourseRequest,
  EnrollmentDetailResponse,
  CreatePaymentRequest,
  PaymentUrlResponse,
  QuizRequest,
  QuizResponse,
  QuizAttemptResponse,
} from "../generated/data-contracts";

// Re-export errors
export * from "../errors";
