/**
 * API Module Barrel Export
 * Central export point for all API functions
 */

// Core infrastructure
export * from './client';
export * from './config';
export * from './error-handler';
export * from './token-manager';

// Authentication & Account
export * as authApi from './auth.api';
export * as accountApi from './account.api';

// Users
export * as studentApi from './student.api';
export * as teacherApi from './teacher.api';

// Course domain
export * as courseApi from './course.api';
export * as courseVersionApi from './course-version.api';
export * as courseReviewApi from './course-review.api';
export * as coursePreviewApi from './course-preview.api';
export * as categoryApi from './category.api';
export * as tagApi from './tag.api';

// Content domain
export * as chapterApi from './chapter.api';
export * as lessonApi from './lesson.api';
export * as lessonResourceApi from './lesson-resource.api';
export * as fileStorageApi from './file-storage.api';

// Learning domain
export * as enrollmentApi from './enrollment.api';
export * as progressApi from './progress.api';
export * as certificateApi from './certificate.api';

// Community domain
export * as commentApi from './comment.api';
export * as notificationApi from './notification.api';
export * as reportApi from './report.api';

// Billing domain
export * as paymentApi from './payment.api';
export * as revenueApi from './revenue.api';

// Assessment domain
export * as quizApi from './quiz.api';
export * as questionApi from './question.api';

// Admin domain
export * as dashboardApi from './dashboard.api';
export * as systemApi from './system.api';
export * as auditApi from './audit.api';
