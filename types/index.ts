// Shared types
export * from "./shared/api.types";
export * from "./shared/common.types";
export * from "./shared/pagination.types";
export * from "./shared/filter.types";

// Auth types
export * from "./auth/auth.types";
export * from "./auth/account.types";

// User types
export * from "./user/student.types";
export * from "./user/teacher.types";

// Course types
export * from "./course/course.types";
export * from "./course/course-version.types";
export * from "./course/course-review.types";
export * from "./course/course-preview.types";
export * from "./course/category.types";
export * from "./course/tag.types";

// Content types
export * from "./content/chapter.types";
export * from "./content/lesson.types";
export * from "./content/lesson-resource.types";
export * from "./content/file-storage.types";

// Learning types
export * from "./learning/enrollment.types";
export * from "./learning/progress.types";
export * from "./learning/certificate.types";

// Community types
export * from "./community/comment.types";
export * from "./community/notification.types";
export * from "./community/report.types";

// Billing types
export * from "./billing/payment.types";
export * from "./billing/revenue.types";

// Assessment types
export * from "./assessment/quiz.types";
export * from "./assessment/question.types";

// Admin types
export * from "./admin/dashboard.types";
export * from "./admin/system.types";
export * from "./admin/audit.types";

/**
 * Type Aliases for convenience
 * These allow importing with shorter, more intuitive names
 */

// User type aliases
export type { StudentResponse as Student } from "./user/student.types";
export type { TeacherResponse as Teacher } from "./user/teacher.types";
export type { TeacherPublicProfileResponse as TeacherProfile } from "./user/teacher.types";
export type { TeacherApprovalRequest as ApproveTeacherRequest } from "./user/teacher.types";
export type { UpdateProfileRequest as CompleteTeacherProfileRequest } from "./auth/account.types";
export type { UpdateProfileRequest as CompleteProfileRequest } from "./auth/account.types";

// Search params - using pagination params as default since specific types don't exist
import { PaginationParams } from "./shared/api.types";
export type StudentSearchParams = PaginationParams;
export type TeacherSearchParams = PaginationParams;

// Course type aliases
export type { CourseResponse as Course } from "./course/course.types";
export type { ReviewResponse as CourseReview } from "./course/course-review.types";
export type { CategoryResponse as Category } from "./course/category.types";
export type { CategoryResponse as CategoryTreeResponse } from "./course/category.types";

// Learning type aliases
export type { EnrollmentResponse as Enrollment } from "./learning/enrollment.types";
export type { CertificateResponse as Certificate } from "./learning/certificate.types";
export type { EnrollmentQueryParams as EnrollmentSearchParams } from "./learning/enrollment.types";
export type { StudentCertificatesQueryParams as CertificateSearchParams } from "./learning/certificate.types";
export type { EnrollCourseRequest as CreateEnrollmentRequest } from "./learning/enrollment.types";

// Community type aliases
export type { NotificationResponse as Notification } from "./community/notification.types";
export type { NotificationQueryParams as NotificationSearchParams } from "./community/notification.types";
export type { NotificationPreferencesResponse as NotificationPreferences } from "./community/notification.types";

// Billing type aliases
export type { PaymentResponse as Payment } from "./billing/payment.types";
export type { PaymentQueryParams as PaymentSearchParams } from "./billing/payment.types";
export type { CreatePaymentIntentRequest as CreatePaymentRequest } from "./billing/payment.types";

// Course Review type aliases
export type { ReviewQueryParams as CourseReviewSearchParams } from "./course/course-review.types";
export type { RatingSummaryResponse as ReviewSummaryResponse } from "./course/course-review.types";
export type { CreateReviewRequest as CreateCourseReviewRequest } from "./course/course-review.types";
export type { UpdateReviewRequest as UpdateCourseReviewRequest } from "./course/course-review.types";

// Dashboard type aliases
export type { StudentDashboardStatsResponse as StudentDashboardResponse } from "./admin/dashboard.types";
export type { TeacherDashboardStatsResponse as TeacherDashboardResponse } from "./admin/dashboard.types";
