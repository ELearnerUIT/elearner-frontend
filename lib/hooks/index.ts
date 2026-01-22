/**
 * API Hooks - Barrel Export
 * Centralized export for all React Query hooks
 */

// Query Provider
export { QueryProvider } from './query-provider';

// Query Keys
export { queryKeys } from './query-keys';

// Authentication
export {
  useCurrentUser,
  useRegister,
  useLogin,
  useLogout,
  useRefreshToken,
  useVerifyEmail,
  useResendVerification,
  useForgotPassword,
  useResetPassword,
  useChangePassword,
  useSocialLogin,
} from './use-auth';

// Courses
export {
  useCourses,
  useSearchCourses,
  useFeaturedCourses,
  usePopularCourses,
  useCourse,
  useMyCourses,
  useCoursesByCategory,
  useCoursesByTag,
  useCoursesByTeacher,
  useCourseStats,
  useCreateCourse,
  useUpdateCourse,
  useDeleteCourse,
  usePublishCourse,
  useUnpublishCourse,
} from './use-courses';

// Categories
export {
  useCategories,
  useCategoryTree,
  useCategory,
  useCategoryWithChildren,
  useCategoryStats,
  useCreateCategory,
  useUpdateCategory,
  useDeleteCategory,
} from './use-categories';

// Students
export {
  useStudents,
  useStudent,
  useMyStudentProfile,
  useStudentCourses,
  useMyEnrolledCourses,
  useStudentStats,
  useMyStudentStats,
  useStudentDashboard,
  useUpdateMyStudentProfile,
} from './use-students';

// Teachers
export {
  useTeachers,
  useTeacher,
  useTeacherProfile,
  useMyTeacherProfile,
  useTeacherStats,
  useMyTeacherStats,
  useTeacherDashboard,
  useUpdateMyTeacherProfile,
} from './use-teachers';

// Enrollments
export {
  useMyEnrollments,
  useEnrollment,
  useAllEnrollments,
  useEnrollInCourse,
  useCancelEnrollment,
} from './use-enrollments';

// Progress
export {
  useLessonProgress,
  useCourseProgress,
  useUpdateLessonProgress,
  useCompleteLesson,
} from './use-progress';

// Certificates
export {
  useMyCertificates,
  useCertificate,
  useVerifyCertificate,
  useDownloadCertificate,
  useGenerateCertificate,
} from './use-certificates';

// Reviews
export {
  useCourseReviews,
  useReview,
  useReviewSummary,
  useMyReview,
  useStudentReviews,
  useMyReviews,
  useCreateReview,
  useUpdateReview,
  useDeleteReview,
} from './use-reviews';

// Payments
export {
  useMyPayments,
  usePayment,
  useAllPayments,
  usePaymentStats,
  useCreatePaymentIntent,
  useRefundPayment,
} from './use-payments';

// Notifications
export {
  useNotifications,
  useNotification,
  useUnreadNotificationCount,
  useNotificationPreferences,
  useMarkNotificationAsRead,
  useMarkAllNotificationsAsRead,
  useDeleteNotification,
  useUpdateNotificationPreferences,
} from './use-notifications';
