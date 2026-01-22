/**
 * User role enumeration
 */
export enum Role {
  STUDENT = 'STUDENT',
  TEACHER = 'TEACHER',
  ADMIN = 'ADMIN',
}

/**
 * Account status enumeration
 */
export enum AccountStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  SUSPENDED = 'SUSPENDED',
  PENDING = 'PENDING',
  REJECTED = 'REJECTED',
  DEACTIVATED = 'DEACTIVATED',
}

/**
 * Teacher approval status
 */
export enum TeacherApprovalStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
}

/**
 * Gender enumeration
 */
export enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  OTHER = 'OTHER',
}

/**
 * Course difficulty levels
 */
export enum Difficulty {
  BEGINNER = 'BEGINNER',
  INTERMEDIATE = 'INTERMEDIATE',
  ADVANCED = 'ADVANCED',
}

/**
 * Course version status
 */
export enum VersionStatus {
  DRAFT = 'DRAFT',
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  PUBLISHED = 'PUBLISHED',
}

/**
 * Lesson types
 */
export enum LessonType {
  VIDEO = 'VIDEO',
  TEXT = 'TEXT',
  QUIZ = 'QUIZ',
  ASSIGNMENT = 'ASSIGNMENT',
}

/**
 * Lesson resource types
 */
export enum ResourceType {
  FILE = 'FILE',
  LINK = 'LINK',
  EMBED = 'EMBED',
}

/**
 * Video processing status
 */
export enum VideoStatus {
  PENDING = 'PENDING',
  PROCESSING = 'PROCESSING',
  READY = 'READY',
  FAILED = 'FAILED',
}

/**
 * Notification types
 */
export enum NotificationType {
  SYSTEM = 'SYSTEM',
  COURSE_UPDATE = 'COURSE_UPDATE',
  ENROLLMENT = 'ENROLLMENT',
  ASSIGNMENT = 'ASSIGNMENT',
  COMMENT = 'COMMENT',
  PROMOTION = 'PROMOTION',
  ACHIEVEMENT = 'ACHIEVEMENT',
}

/**
 * Violation report types
 */
export enum ReportType {
  SPAM = 'SPAM',
  HARASSMENT = 'HARASSMENT',
  INAPPROPRIATE_CONTENT = 'INAPPROPRIATE_CONTENT',
  COPYRIGHT = 'COPYRIGHT',
  MISINFORMATION = 'MISINFORMATION',
  OTHER = 'OTHER',
}

/**
 * Payment status enumeration
 */
export enum PaymentStatus {
  PENDING = 'PENDING',
  PROCESSING = 'PROCESSING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
  REFUNDED = 'REFUNDED',
  CANCELLED = 'CANCELLED',
}

/**
 * Enrollment status
 */
export enum EnrollmentStatus {
  ACTIVE = 'ACTIVE',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
  EXPIRED = 'EXPIRED',
}

/**
 * Quiz types
 */
export enum QuizType {
  PRACTICE = 'PRACTICE',
  GRADED = 'GRADED',
  FINAL = 'FINAL',
}

/**
 * Question types
 */
export enum QuestionType {
  MULTIPLE_CHOICE = 'MULTIPLE_CHOICE',
  TRUE_FALSE = 'TRUE_FALSE',
  SHORT_ANSWER = 'SHORT_ANSWER',
  ESSAY = 'ESSAY',
  FILL_IN_BLANK = 'FILL_IN_BLANK',
}

/**
 * Storage provider types
 */
export enum StorageProvider {
  MINIO = 'MINIO',
  CLOUDINARY = 'CLOUDINARY',
}

/**
 * Social login providers
 */
export enum SocialProvider {
  GOOGLE = 'GOOGLE',
  FACEBOOK = 'FACEBOOK',
  GITHUB = 'GITHUB',
}

/**
 * Language key enumeration
 */
export enum LanguageKey {
  EN = 'en',
  VI = 'vi',
}

/**
 * Payout status
 */
export enum PayoutStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  PROCESSING = 'PROCESSING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
}

/**
 * Export file types
 */
export enum ExportType {
  CSV = 'CSV',
  EXCEL = 'EXCEL',
  PDF = 'PDF',
}

/**
 * Payment method enumeration
 */
export enum PaymentMethod {
  CREDIT_CARD = 'CREDIT_CARD',
  DEBIT_CARD = 'DEBIT_CARD',
  STRIPE = 'STRIPE',
  BANK_TRANSFER = 'BANK_TRANSFER',
  PAYPAL = 'PAYPAL',
}

/**
 * Comment status enumeration
 */
export enum CommentStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  FLAGGED = 'FLAGGED',
}

/**
 * Notification status enumeration
 */
export enum NotificationStatus {
  PENDING = 'PENDING',
  SENT = 'SENT',
  FAILED = 'FAILED',
  READ = 'READ',
}

/**
 * Report status enumeration
 */
export enum ReportStatus {
  PENDING = 'PENDING',
  REVIEWING = 'REVIEWING',
  RESOLVED = 'RESOLVED',
  REJECTED = 'REJECTED',
}

/**
 * Audit action enumeration
 */
export enum AuditAction {
  CREATE = 'CREATE',
  UPDATE = 'UPDATE',
  DELETE = 'DELETE',
  LOGIN = 'LOGIN',
  LOGOUT = 'LOGOUT',
  APPROVE = 'APPROVE',
  REJECT = 'REJECT',
  SUSPEND = 'SUSPEND',
  ACTIVATE = 'ACTIVATE',
  EXPORT = 'EXPORT',
  IMPORT = 'IMPORT',
}
