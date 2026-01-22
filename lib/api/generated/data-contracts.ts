/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

/** Updated teacher information */
export interface UpdateTeacherRequest {
  /**
   * Teacher full name
   * @minLength 2
   * @maxLength 255
   * @example "Nguyen Van A"
   */
  fullName: string;
  /**
   * Teacher birth date
   * @format date
   * @example "1990-01-01"
   */
  birthDate?: string;
  /**
   * Teacher gender
   * @example "MALE"
   */
  gender?: "MALE" | "FEMALE" | "OTHER";
  /**
   * Teacher phone number
   * @pattern ^[0-9]{10,15}$
   * @example "0901234567"
   */
  phone?: string;
  /**
   * Teacher biography
   * @minLength 0
   * @maxLength 1000
   * @example "Experienced software engineer and educator"
   */
  bio?: string;
  /**
   * Teacher specialty/expertise
   * @minLength 0
   * @maxLength 255
   * @example "Software Engineering, Data Science"
   */
  specialty?: string;
  /**
   * Academic degree
   * @minLength 0
   * @maxLength 128
   * @example "Master of Science in Computer Science"
   */
  degree?: string;
  /**
   * Teacher code
   * @minLength 0
   * @maxLength 50
   * @example "GV2024001"
   */
  teacherCode?: string;
}

/** Teacher detailed information response (includes sensitive fields for admin) */
export interface TeacherDetailResponse {
  /**
   * Teacher ID
   * @format int64
   * @example 1
   */
  id?: number;
  /**
   * Account ID
   * @format int64
   * @example 10
   */
  accountId?: number;
  /**
   * Teacher code
   * @example "GV2024001"
   */
  teacherCode?: string;
  /**
   * Full name
   * @example "Nguyen Van A"
   */
  fullName?: string;
  /**
   * Email address
   * @example "teacher@example.com"
   */
  email?: string;
  /**
   * Username
   * @example "teacher_username"
   */
  username?: string;
  /**
   * Phone number
   * @example "0901234567"
   */
  phone?: string;
  /**
   * Birth date
   * @format date
   * @example "1990-01-01"
   */
  birthDate?: string;
  /**
   * Gender
   * @example "MALE"
   */
  gender?: "MALE" | "FEMALE" | "OTHER";
  /** Biography */
  bio?: string;
  /**
   * Specialty/Expertise
   * @example "Software Engineering"
   */
  specialty?: string;
  /**
   * Academic degree
   * @example "Master of Science"
   */
  degree?: string;
  /** Avatar URL */
  avatarUrl?: string;
  /**
   * Whether teacher is approved
   * @example true
   */
  approved?: boolean;
  /**
   * ID of admin who approved
   * @format int64
   * @example 5
   */
  approvedBy?: number;
  /**
   * Approval timestamp
   * @format date-time
   */
  approvedAt?: string;
  /** Rejection reason (if rejected) */
  rejectReason?: string;
  /**
   * Account status
   * @example "ACTIVE"
   */
  accountStatus?:
    | "PENDING_EMAIL"
    | "PENDING_APPROVAL"
    | "ACTIVE"
    | "REJECTED"
    | "SUSPENDED"
    | "DEACTIVATED";
  /**
   * Account role
   * @example "TEACHER"
   */
  role?: "STUDENT" | "TEACHER" | "ADMIN";
  /**
   * Last login timestamp
   * @format date-time
   */
  lastLoginAt?: string;
  /**
   * Created at timestamp
   * @format date-time
   */
  createdAt?: string;
  /**
   * Updated at timestamp
   * @format date-time
   */
  updatedAt?: string;
}

/** Response DTO for avatar upload */
export interface UploadAvatarResponse {
  /**
   * URL of the uploaded avatar
   * @example "https://example.com/avatars/user123.jpg"
   */
  avatarUrl?: string;
  /**
   * URL of the thumbnail version
   * @example "https://example.com/avatars/user123_thumb.jpg"
   */
  thumbnailUrl?: string;
}

/** Updated course details */
export interface CourseUpdateRequest {
  /**
   * Course title
   * @example "Advanced Java Programming"
   */
  title?: string;
  /**
   * Short description of the course
   * @example "Master advanced Java concepts"
   */
  shortDescription?: string;
  /**
   * ID of the course category
   * @format int64
   * @example 5
   */
  categoryId?: number;
  /**
   * Account ID of the instructor
   * @format int64
   * @example 10
   */
  teacherId?: number;
  /**
   * Whether enrollment is closed
   * @example false
   */
  isClosed?: boolean;
  /**
   * Course difficulty level
   * @example "ADVANCED"
   */
  difficulty?: "BEGINNER" | "INTERMEDIATE" | "ADVANCED";
  /**
   * Meta title for SEO
   * @example "Advanced Java Course"
   */
  metaTitle?: string;
  /**
   * Meta description for SEO
   * @example "Advanced Java programming techniques"
   */
  metaDescription?: string;
  /**
   * SEO keywords
   * @example "java, advanced, multithreading, streams"
   */
  seoKeywords?: string;
  /**
   * Course thumbnail URL
   * @example "https://example.com/images/advanced-java.jpg"
   */
  thumbnailUrl?: string;
  /**
   * Whether the course should be indexed by search engines
   * @example true
   */
  isIndexed?: boolean;
  /**
   * List of tags associated with the course
   * @example ["Java","Advanced","Concurrency"]
   */
  tags?: string[];
}

/** Category information */
export interface CategoryDto {
  /**
   * Category ID
   * @format int64
   * @example 1
   */
  id?: number;
  /**
   * Category name
   * @example "Programming"
   */
  name?: string;
  /**
   * Category code
   * @example "PROG"
   */
  code?: string;
  /**
   * Category description
   * @example "Software development courses"
   */
  description?: string;
}

/** Response DTO for detailed course information */
export interface CourseDetailResponse {
  /**
   * Course ID
   * @format int64
   * @example 1
   */
  id?: number;
  /**
   * Course title
   * @example "Introduction to Java Programming"
   */
  title?: string;
  /**
   * Short description
   * @example "Learn Java from scratch"
   */
  shortDescription?: string;
  /**
   * Difficulty level
   * @example "BEGINNER"
   */
  difficulty?: "BEGINNER" | "INTERMEDIATE" | "ADVANCED";
  /**
   * Thumbnail URL
   * @example "https://example.com/images/java-course.jpg"
   */
  thumbnailUrl?: string;
  /**
   * SEO-friendly URL slug
   * @example "introduction-to-java-programming"
   */
  slug?: string;
  /**
   * Canonical URL
   * @example "https://example.com/courses/java"
   */
  canonicalUrl?: string;
  /**
   * Meta title for SEO
   * @example "Java Programming Course"
   */
  metaTitle?: string;
  /**
   * Meta description for SEO
   * @example "Comprehensive Java course"
   */
  metaDescription?: string;
  /**
   * SEO keywords
   * @example "java, programming, beginner"
   */
  seoKeywords?: string;
  /**
   * Whether the course is indexed by search engines
   * @example true
   */
  indexed?: boolean;
  /**
   * Whether enrollment is closed
   * @example false
   */
  isClosed?: boolean;
  /** Category information */
  category?: CategoryDto;
  /**
   * Teacher/instructor ID
   * @format int64
   * @example 5
   */
  teacherId?: number;
  /**
   * List of tags
   * @example ["Java","Programming","Backend"]
   */
  tags?: string[];
  /** @format int64 */
  publicVersionId?: number;
}

/** Tag details */
export interface TagRequest {
  /**
   * Tag name
   * @minLength 0
   * @maxLength 100
   * @example "Spring Boot"
   */
  name: string;
}

export interface Tag {
  /** @format date-time */
  createdAt?: string;
  /** @format date-time */
  updatedAt?: string;
  createdBy?: string;
  updatedBy?: string;
  /** @format date-time */
  deletedAt?: string;
  /** @format int64 */
  id?: number;
  name?: string;
  slug?: string;
}

/** Response DTO for submission file */
export interface SubmissionFileResponse {
  /**
   * File ID
   * @format int64
   * @example 1
   */
  id?: number;
  /**
   * URL to download the file
   * @example "https://example.com/files/submission123.pdf"
   */
  fileUrl?: string;
  /**
   * Original file name
   * @example "assignment_solution.pdf"
   */
  fileName?: string;
}

/** Response DTO for assignment submission details */
export interface SubmissionResponse {
  /**
   * Submission ID
   * @format int64
   * @example 1
   */
  id?: number;
  /**
   * Assignment ID
   * @format int64
   * @example 5
   */
  assignmentId?: number;
  /**
   * Student ID who submitted
   * @format int64
   * @example 10
   */
  studentId?: number;
  /**
   * Student full name
   * @example "John Doe"
   */
  studentName?: string;
  /**
   * Submission timestamp
   * @format date-time
   * @example "2025-11-30T15:30:00Z"
   */
  submittedAt?: string;
  /**
   * Submission text content
   * @example "Here is my solution to the assignment..."
   */
  content?: string;
  /**
   * Score received (if graded)
   * @format double
   * @example 85.5
   */
  score?: number;
  /**
   * ID of teacher who graded
   * @format int64
   * @example 3
   */
  gradedBy?: number;
  /**
   * Grading timestamp
   * @format date-time
   * @example "2025-12-01T10:00:00Z"
   */
  gradedAt?: string;
  /**
   * Feedback from instructor
   * @example "Great work! Consider improving error handling."
   */
  feedback?: string;
  /**
   * Attempt number (1st, 2nd, 3rd...)
   * @format int32
   * @example 1
   */
  attemptNumber?: number;
  /**
   * Submission status
   * @example "GRADED"
   */
  status?: "PENDING" | "GRADED" | "REJECTED";
  /** List of attached files */
  files?: SubmissionFileResponse[];
}

/** Updated student information */
export interface UpdateStudentRequest {
  /**
   * Student full name
   * @minLength 2
   * @maxLength 255
   * @example "Nguyen Van A"
   */
  fullName: string;
  /**
   * Student birth date
   * @format date
   * @example "2000-01-01"
   */
  birthDate?: string;
  /**
   * Student gender
   * @example "MALE"
   */
  gender?: "MALE" | "FEMALE" | "OTHER";
  /**
   * Student phone number
   * @pattern ^[0-9]{10,15}$
   * @example "0123456789"
   */
  phone?: string;
  /**
   * Student biography
   * @minLength 0
   * @maxLength 1000
   * @example "I am a student"
   */
  bio?: string;
  /**
   * Student code
   * @minLength 0
   * @maxLength 50
   * @example "SV2024001"
   */
  studentCode?: string;
}

/** Detailed student information response */
export interface StudentDetailResponse {
  /**
   * Student ID
   * @format int64
   * @example 1
   */
  id?: number;
  /**
   * Student code
   * @example "SV2024001"
   */
  studentCode?: string;
  /**
   * Student full name
   * @example "Nguyen Van A"
   */
  fullName?: string;
  /**
   * Student email
   * @example "student@example.com"
   */
  email?: string;
  /**
   * Student username
   * @example "student123"
   */
  username?: string;
  /**
   * Student phone
   * @example "0123456789"
   */
  phone?: string;
  /**
   * Student birth date
   * @format date
   * @example "2000-01-01"
   */
  birthDate?: string;
  /**
   * Student gender
   * @example "MALE"
   */
  gender?: "MALE" | "FEMALE" | "OTHER";
  /** Student biography */
  bio?: string;
  /** Avatar URL */
  avatarUrl?: string;
  /**
   * Account status
   * @example "ACTIVE"
   */
  accountStatus?:
    | "PENDING_EMAIL"
    | "PENDING_APPROVAL"
    | "ACTIVE"
    | "REJECTED"
    | "SUSPENDED"
    | "DEACTIVATED";
  /**
   * Account role
   * @example "STUDENT"
   */
  role?: "STUDENT" | "TEACHER" | "ADMIN";
  /**
   * Last login timestamp
   * @format date-time
   */
  lastLoginAt?: string;
  /**
   * Creation timestamp
   * @format date-time
   */
  createdAt?: string;
  /**
   * Last update timestamp
   * @format date-time
   */
  updatedAt?: string;
  /**
   * Account ID
   * @format int64
   * @example 1
   */
  accountId?: number;
}

/** Quiz details */
export interface QuizRequest {
  /**
   * Quiz title
   * @example "Java Basics Quiz"
   */
  title?: string;
  /**
   * Quiz description
   * @example "Test your knowledge of Java fundamentals"
   */
  description?: string;
  /**
   * Total points for the quiz
   * @format double
   * @example 100
   */
  totalPoints?: number;
  /**
   * Time limit in minutes
   * @format int32
   * @example 60
   */
  timeLimitMinutes?: number;
  /**
   * Maximum number of attempts allowed
   * @format int32
   * @example 3
   */
  maxAttempts?: number;
  /**
   * Whether to randomize question order
   * @example true
   */
  randomizeQuestions?: boolean;
  /**
   * Whether to randomize answer option order
   * @example true
   */
  randomizeOptions?: boolean;
  /**
   * Minimum score to pass the quiz
   * @format double
   * @example 70
   */
  passingScore?: number;
  /**
   * Quiz start date/time (ISO 8601 format)
   * @format date-time
   * @example "2026-01-15T08:00:00Z"
   */
  startDate?: string;
  /**
   * Quiz end date/time (ISO 8601 format)
   * @format date-time
   * @example "2026-01-30T23:59:59Z"
   */
  endDate?: string;
}

/** Response DTO for quiz question (simplified) */
export interface QuizQuestionResponse {
  /**
   * Quiz question mapping ID
   * @format int64
   * @example 1
   */
  id?: number;
  /**
   * Question ID
   * @format int64
   * @example 5
   */
  questionId?: number;
  /**
   * Question content/text
   * @example "What is the capital of France?"
   */
  questionContent?: string;
  /**
   * Question type
   * @example "MULTIPLE_CHOICE"
   */
  questionType?: string;
  /**
   * Points for this question in the quiz
   * @format double
   * @example 10
   */
  points?: number;
  /**
   * Order index in the quiz
   * @format int32
   * @example 1
   */
  orderIndex?: number;
}

/** Response DTO for quiz details */
export interface QuizResponse {
  /**
   * Quiz ID
   * @format int64
   * @example 1
   */
  id?: number;
  /**
   * Quiz title
   * @example "Java Basics Quiz"
   */
  title?: string;
  /**
   * Quiz description
   * @example "Test your knowledge of Java fundamentals"
   */
  description?: string;
  /**
   * ID of the lesson this quiz belongs to
   * @format int64
   * @example 5
   */
  lessonId?: number;
  /**
   * Total points for the quiz
   * @format double
   * @example 100
   */
  totalPoints?: number;
  /**
   * Time limit in minutes
   * @format int32
   * @example 60
   */
  timeLimitMinutes?: number;
  /**
   * Maximum number of attempts allowed
   * @format int32
   * @example 3
   */
  maxAttempts?: number;
  /**
   * Whether questions are randomized
   * @example true
   */
  randomizeQuestions?: boolean;
  /**
   * Whether answer options are randomized
   * @example true
   */
  randomizeOptions?: boolean;
  /**
   * Minimum score to pass
   * @format double
   * @example 70
   */
  passingScore?: number;
  /**
   * Quiz start date/time
   * @format date-time
   * @example "2026-01-15T08:00:00Z"
   */
  startDate?: string;
  /**
   * Quiz end date/time
   * @format date-time
   * @example "2026-01-30T23:59:59Z"
   */
  endDate?: string;
  /**
   * Whether quiz is currently available
   * @example true
   */
  isAvailable?: boolean;
  /**
   * Availability message
   * @example "Quiz is available until 2026-01-30T23:59:59Z"
   */
  availabilityMessage?: string;
  /** List of questions in the quiz */
  questions?: QuizQuestionResponse[];
  /**
   * Creation timestamp
   * @format date-time
   * @example "2025-11-01T08:00:00Z"
   */
  createdAt?: string;
  /**
   * Username who created the quiz
   * @example "john_doe"
   */
  createdBy?: string;
  /**
   * Last update timestamp
   * @format date-time
   * @example "2025-11-20T14:30:00Z"
   */
  updatedAt?: string;
  /**
   * Username who last updated the quiz
   * @example "jane_doe"
   */
  updatedBy?: string;
  /**
   * Deletion timestamp (soft delete)
   * @format date-time
   * @example "2025-11-25T10:00:00Z"
   */
  deletedAt?: string;
}

/** Request DTO for answer option in a question */
export interface AnswerOptionRequest {
  /**
   * Option ID (optional, for updates)
   * @format int64
   * @example 1
   */
  id?: number;
  /**
   * Content of the answer option
   * @minLength 1
   * @example "Paris"
   */
  content: string;
  /**
   * Whether this option is correct
   * @example true
   */
  isCorrect: boolean;
  /**
   * Display order of the option
   * @format int32
   * @example 1
   */
  orderIndex?: number;
}

/** Question details */
export interface QuestionRequest {
  /**
   * Question content/text
   * @minLength 1
   * @example "What is the capital of France?"
   */
  content: string;
  /**
   * Type of question
   * @example "MULTIPLE_CHOICE"
   */
  type:
    | "MULTIPLE_CHOICE"
    | "MULTI_SELECT"
    | "TRUE_FALSE"
    | "SHORT_ANSWER"
    | "ESSAY";
  /**
   * Additional metadata in JSON format
   * @example {"difficulty":"medium"}
   */
  metadata?: string;
  /**
   * Maximum points for this question
   * @format double
   * @example 10
   */
  maxPoints?: number;
  /** List of answer options for the question */
  answerOptions?: AnswerOptionRequest[];
}

/** Response DTO for answer option */
export interface AnswerOptionResponse {
  /**
   * Answer option ID
   * @format int64
   * @example 1
   */
  id?: number;
  /**
   * Answer option content/text
   * @example "Paris"
   */
  content?: string;
  /**
   * Display order index
   * @format int32
   * @example 1
   */
  orderIndex?: number;
  correct?: boolean;
  /**
   * Whether this is the correct answer
   * @example true
   */
  isCorrect?: boolean;
}

/** Response DTO for question details */
export interface QuestionResponse {
  /**
   * Question ID
   * @format int64
   * @example 1
   */
  id?: number;
  /**
   * Question content/text
   * @example "What is the capital of France?"
   */
  content?: string;
  /**
   * Question type
   * @example "MULTIPLE_CHOICE"
   */
  type?:
    | "MULTIPLE_CHOICE"
    | "MULTI_SELECT"
    | "ESSAY"
    | "FILL_BLANK"
    | "TRUE_FALSE";
  /**
   * Additional metadata in JSON format
   * @example {"difficulty":"medium"}
   */
  metadata?: string;
  /**
   * Maximum points for this question
   * @format double
   * @example 10
   */
  maxPoints?: number;
  /**
   * ID of the question bank this belongs to
   * @format int64
   * @example 5
   */
  questionBankId?: number;
  /** List of answer options */
  answerOptions?: AnswerOptionResponse[];
  /**
   * Creation timestamp
   * @format date-time
   * @example "2025-11-01T08:00:00Z"
   */
  createdAt?: string;
  /**
   * Last update timestamp
   * @format date-time
   * @example "2025-11-20T14:30:00Z"
   */
  updatedAt?: string;
}

/** Question bank details */
export interface QuestionBankRequest {
  /**
   * Name of the question bank
   * @minLength 1
   * @example "Java Programming Questions"
   */
  name: string;
  /**
   * Description of the question bank
   * @example "Collection of Java programming questions"
   */
  description?: string;
}

/** Response DTO for question bank */
export interface QuestionBankResponse {
  /**
   * Question bank ID
   * @format int64
   * @example 1
   */
  id?: number;
  /**
   * Question bank name
   * @example "Java Programming Questions"
   */
  name?: string;
  /**
   * Question bank description
   * @example "Collection of Java programming questions"
   */
  description?: string;
  /**
   * ID of the teacher who owns this question bank
   * @format int64
   * @example 5
   */
  teacherId?: number;
  /**
   * Creation timestamp
   * @format date-time
   * @example "2025-11-01T08:00:00Z"
   */
  createdAt?: string;
  /**
   * Last update timestamp
   * @format date-time
   * @example "2025-11-20T14:30:00Z"
   */
  updatedAt?: string;
}

/** Resource details */
export interface LessonResourceRequest {
  /**
   * Type of resource
   * @example "FILE"
   */
  resourceType: "FILE" | "LINK" | "EMBED";
  /**
   * Resource title
   * @minLength 1
   * @example "Lecture Notes PDF"
   */
  title: string;
  /**
   * Resource description
   * @example "Comprehensive notes for this lesson"
   */
  description?: string;
  /**
   * External URL (for LINK/EMBED types)
   * @example "https://youtube.com/watch?v=..."
   */
  externalUrl?: string;
  /**
   * Whether this resource is required
   * @example false
   */
  isRequired?: boolean;
  /**
   * File storage ID (for FILE type, set after upload)
   * @format int64
   */
  fileStorageId?: number;
}

/** Response DTO for lesson resource */
export interface LessonResourceResponse {
  /**
   * Resource ID
   * @format int64
   * @example 1
   */
  id?: number;
  /**
   * Lesson ID
   * @format int64
   * @example 10
   */
  lessonId?: number;
  /**
   * Resource type
   * @example "FILE"
   */
  resourceType?: "FILE" | "LINK" | "EMBED";
  /**
   * Resource title
   * @example "Lecture Notes"
   */
  title?: string;
  /** Resource description */
  description?: string;
  /** External URL (for LINK/EMBED types) */
  externalUrl?: string;
  /**
   * File storage ID (for FILE type)
   * @format int64
   */
  fileStorageId?: number;
  /** Original filename (for FILE type) */
  fileName?: string;
  /**
   * File size in bytes (for FILE type)
   * @format int64
   */
  fileSizeBytes?: number;
  /**
   * Formatted file size (for FILE type)
   * @example 2.5
   */
  formattedFileSize?: string;
  /** Download URL (for FILE type, presigned) */
  downloadUrl?: string;
  /** Display URL (external or generated) */
  displayUrl?: string;
  /**
   * Order index
   * @format int32
   * @example 0
   */
  orderIndex?: number;
  /** Whether this resource is required */
  isRequired?: boolean;
  /** Whether this resource is downloadable */
  isDownloadable?: boolean;
  /**
   * Creation timestamp
   * @format date-time
   */
  createdAt?: string;
  /**
   * Last update timestamp
   * @format date-time
   */
  updatedAt?: string;
}

/** Updated lesson details */
export interface UpdateLessonRequest {
  /**
   * Type of lesson
   * @example "VIDEO"
   */
  type: "VIDEO" | "DOCUMENT" | "QUIZ" | "ASSIGNMENT" | "FINAL_EXAM";
  /**
   * Lesson title
   * @minLength 1
   * @example "Spring Boot Basics - Updated"
   */
  title: string;
  /** Short description of the lesson */
  shortDescription?: string;
  /** Whether this is a preview lesson (accessible without enrollment) */
  isPreview?: boolean;
}

/** Response DTO for lesson information */
export interface LessonDTO {
  /**
   * Lesson ID
   * @format int64
   * @example 1
   */
  id?: number;
  /**
   * Chapter ID this lesson belongs to
   * @format int64
   * @example 5
   */
  chapterId?: number;
  /**
   * Type of lesson
   * @example "VIDEO"
   */
  type?: "VIDEO" | "DOCUMENT" | "ASSIGNMENT" | "QUIZ" | "FINAL_EXAM";
  /**
   * Lesson title
   * @example "Spring Boot Basics"
   */
  title?: string;
  /**
   * Short description
   * @example "Learn the fundamentals of Spring Boot"
   */
  shortDescription?: string;
  /**
   * Video object key in storage (for video lessons)
   * @example "videos/spring-boot-basics.mp4"
   */
  videoObjectKey?: string;
  /**
   * Status of the video processing (for video lessons)
   * @example "READY"
   */
  videoStatus?: "UPLOADED" | "PROCESSING" | "READY" | "FAILED";
  /**
   * Indicates if the lesson is a preview
   * @example true
   */
  isPreview?: boolean;
  /**
   * Duration in seconds (for video lessons)
   * @format int32
   * @example 1800
   */
  durationSeconds?: number;
  /**
   * Order index in the chapter
   * @format int32
   * @example 1
   */
  orderIndex?: number;
}

/** Version details */
export interface CourseVersionRequest {
  /**
   * Version title
   * @minLength 0
   * @maxLength 255
   * @example "Spring 2024 Edition"
   */
  title: string;
  /**
   * Detailed description of this version
   * @minLength 0
   * @maxLength 5000
   * @example "Updated with latest Java 17 features"
   */
  description?: string;
  /**
   * Course price
   * @min 0
   * @example 99.99
   */
  price?: number;
  /**
   * Course duration in days
   * @format int32
   * @min 0
   * @example 30
   */
  durationDays?: number;
  /**
   * Passing score (0-10 scale)
   * @format float
   * @min 0
   * @max 10
   * @example 7
   */
  passScore?: number;
  /**
   * Weight of final exam (0-1)
   * @format float
   * @min 0
   * @max 1
   * @example 0.4
   */
  finalWeight?: number;
  /**
   * Minimum progress percentage required
   * @format int32
   * @min 0
   * @max 100
   * @example 80
   */
  minProgressPct?: number;
  /**
   * Additional notes
   * @minLength 0
   * @maxLength 2000
   * @example "This version includes new video lectures"
   */
  notes?: string;
}

/** Response DTO for detailed course version information */
export interface CourseVersionResponse {
  /**
   * Version ID
   * @format int64
   * @example 1
   */
  id?: number;
  /**
   * Course ID
   * @format int64
   * @example 5
   */
  courseId?: number;
  /**
   * Version number
   * @format int32
   * @example 2
   */
  versionNumber?: number;
  /**
   * Version title
   * @example "Spring 2024 Edition"
   */
  title?: string;
  /**
   * Version description
   * @example "Updated with latest Java 17 features"
   */
  description?: string;
  /**
   * Course price
   * @example 99.99
   */
  price?: number;
  /**
   * Course duration in days
   * @format int32
   * @example 30
   */
  durationDays?: number;
  /**
   * Passing score (0-10 scale)
   * @format float
   * @example 7
   */
  passScore?: number;
  /**
   * Weight of final exam (0-1)
   * @format float
   * @example 0.4
   */
  finalWeight?: number;
  /**
   * Minimum progress percentage required
   * @format int32
   * @example 80
   */
  minProgressPct?: number;
  /**
   * Course status
   * @example "PUBLISHED"
   */
  status?:
    | "DRAFT"
    | "PENDING"
    | "APPROVED"
    | "REJECTED"
    | "PUBLISHED"
    | "ARCHIVED";
  /**
   * Additional notes
   * @example "This version includes new video lectures"
   */
  notes?: string;
  /**
   * Username who approved the version
   * @example "admin_user"
   */
  approvedBy?: string;
  /**
   * Approval timestamp
   * @format date-time
   * @example "2025-11-15T10:00:00Z"
   */
  approvedAt?: string;
  /**
   * Publication timestamp
   * @format date-time
   * @example "2025-11-20T08:00:00Z"
   */
  publishedAt?: string;
  /**
   * Number of chapters in this version
   * @format int32
   * @example 10
   */
  chapterCount?: number;
}

/** Chapter details */
export interface ChapterRequest {
  /**
   * Chapter title
   * @minLength 1
   * @example "Introduction to Spring Framework"
   */
  title: string;
}

/** Response DTO for course chapter */
export interface ChapterDto {
  /**
   * Chapter ID
   * @format int64
   * @example 1
   */
  id?: number;
  /**
   * Chapter title
   * @example "Introduction to Spring Framework"
   */
  title?: string;
  /**
   * Order index in the course
   * @format int32
   * @example 1
   */
  orderIndex?: number;
}

/** Review details */
export interface CourseReviewRequest {
  /**
   * Rating score (1-5 stars)
   * @format byte
   * @min 1
   * @max 5
   * @example 5
   */
  rating: string;
  /**
   * Review title
   * @example "Excellent course!"
   */
  title?: string;
  /**
   * Review content/comment
   * @example "This course helped me learn Java quickly and effectively."
   */
  content?: string;
}

/** Response DTO for course review */
export interface CourseReviewResponse {
  /**
   * Review ID
   * @format int64
   * @example 1
   */
  id?: number;
  /**
   * Course ID
   * @format int64
   * @example 5
   */
  courseId?: number;
  /**
   * Student ID who wrote the review
   * @format int64
   * @example 10
   */
  studentId?: number;
  /**
   * Username of the reviewer
   * @example "john_doe"
   */
  username?: string;
  /**
   * Avatar URL of the reviewer
   * @example "https://example.com/avatars/john.jpg"
   */
  avatarUrl?: string;
  /**
   * Rating score (1-5 stars)
   * @format byte
   * @example 5
   */
  rating?: string;
  /**
   * Review title
   * @example "Excellent course!"
   */
  title?: string;
  /**
   * Review content
   * @example "This course helped me learn Java quickly"
   */
  content?: string;
  /**
   * Creation timestamp
   * @format date-time
   * @example "2025-11-30T10:15:30Z"
   */
  createdAt?: string;
  /**
   * Last update timestamp
   * @format date-time
   * @example "2025-11-30T14:20:00Z"
   */
  updatedAt?: string;
}

/** Reply content */
export interface CommentCreateRequest {
  /** @minLength 1 */
  content: string;
}

export interface CommentResponse {
  /** @format int64 */
  id?: number;
  user?: UserDto;
  content?: string;
  /** @format date-time */
  createdAt?: string;
  /** @format date-time */
  editedAt?: string;
  replies?: any[];
  isQuestion?: boolean;
  isAnswer?: boolean;
  isInstructorComment?: boolean;
  isAnswered?: boolean;
  /** @format int32 */
  upvoteCount?: number;
  /** @format int32 */
  replyCount?: number;
  isPublic?: boolean;
}

export interface UserDto {
  /** @format int64 */
  id?: number;
  username?: string;
  avatarUrl?: string;
}

/** Category details */
export interface CategoryRequest {
  /**
   * Category name
   * @minLength 0
   * @maxLength 255
   * @example "Programming"
   */
  name: string;
  /**
   * Category code
   * @minLength 0
   * @maxLength 100
   * @example "PROG"
   */
  code?: string;
  /**
   * Category description
   * @minLength 0
   * @maxLength 1000
   * @example "Courses related to software development"
   */
  description?: string;
  /**
   * Parent category ID (for subcategories)
   * @format int64
   * @example 1
   */
  parentId?: number;
  /**
   * Whether the category is visible
   * @example true
   */
  visible?: boolean;
  /**
   * SEO-friendly URL slug
   * @minLength 0
   * @maxLength 255
   * @example "programming"
   */
  slug?: string;
  /**
   * Meta title for SEO
   * @minLength 0
   * @maxLength 255
   * @example "Programming Courses"
   */
  metaTitle?: string;
  /**
   * Meta description for SEO
   * @minLength 0
   * @maxLength 1000
   * @example "Learn programming with our comprehensive courses"
   */
  metaDescription?: string;
  /**
   * Thumbnail image URL
   * @minLength 0
   * @maxLength 512
   * @example "https://example.com/images/programming.jpg"
   */
  thumbnailUrl?: string;
}

/** Response DTO for course category */
export interface CategoryResponseDto {
  /**
   * Category ID
   * @format int64
   * @example 1
   */
  id?: number;
  /**
   * Category name
   * @example "Programming"
   */
  name?: string;
  /**
   * Category code
   * @example "PROG"
   */
  code?: string;
  /**
   * Category description
   * @example "Courses related to software development"
   */
  description?: string;
  /**
   * Whether the category is visible
   * @example true
   */
  visible?: boolean;
  /**
   * Parent category ID (for subcategories)
   * @format int64
   * @example null
   */
  parentId?: number;
  /**
   * Deletion timestamp (soft delete)
   * @format date-time
   * @example null
   */
  deletedAt?: string;
  /** List of child categories */
  children?: any[];
  /**
   * SEO-friendly URL slug
   * @example "programming"
   */
  slug?: string;
  /**
   * Meta title for SEO
   * @example "Programming Courses"
   */
  metaTitle?: string;
  /**
   * Meta description for SEO
   * @example "Learn programming with our comprehensive courses"
   */
  metaDescription?: string;
  /**
   * Thumbnail image URL
   * @example "https://example.com/images/programming.jpg"
   */
  thumbnailUrl?: string;
}

/** Old and new password details */
export interface ChangePasswordDTO {
  /**
   * Current password of the user
   * @minLength 1
   * @example "OldPassword123!"
   */
  oldPassword: string;
  /**
   * New password to be set
   * @minLength 1
   * @example "NewPassword456!"
   */
  newPassword: string;
}

/** Assignment details */
export interface AssignmentRequest {
  /**
   * Assignment title
   * @minLength 1
   * @example "Week 1 Programming Assignment"
   */
  title: string;
  /**
   * Type of assignment
   * @example "HOMEWORK"
   */
  assignmentType: "HOMEWORK" | "PROJECT" | "ESSAY" | "QUIZ";
  /**
   * Assignment description/instructions
   * @example "Complete the Java exercises in chapter 3"
   */
  description?: string;
  /**
   * Total points for the assignment
   * @format int32
   * @example 100
   */
  totalPoints?: number;
  /**
   * Time limit in minutes (if applicable)
   * @format int32
   * @example 120
   */
  timeLimitMinutes?: number;
  /**
   * Maximum number of submission attempts
   * @format int32
   * @example 3
   */
  maxAttempts?: number;
  /**
   * Due date for the assignment
   * @format date-time
   * @example "2024-12-31T23:59:59Z"
   */
  dueDate?: string;
}

/** Response DTO for assignment details */
export interface AssignmentResponse {
  /**
   * Assignment ID
   * @format int64
   * @example 1
   */
  id?: number;
  /**
   * ID of the lesson this assignment belongs to
   * @format int64
   * @example 5
   */
  lessonId?: number;
  /**
   * Type of assignment
   * @example "HOMEWORK"
   */
  assignmentType?: "PRACTICE" | "HOMEWORK" | "PROJECT" | "FINAL_REPORT";
  /**
   * Assignment title
   * @example "Week 1 Programming Assignment"
   */
  title?: string;
  /**
   * Assignment description/instructions
   * @example "Complete the Java exercises in chapter 3"
   */
  description?: string;
  /**
   * Total points for the assignment
   * @format int32
   * @example 100
   */
  totalPoints?: number;
  /**
   * Time limit in minutes (if applicable)
   * @format int32
   * @example 120
   */
  timeLimitMinutes?: number;
  /**
   * Maximum number of submission attempts
   * @format int32
   * @example 3
   */
  maxAttempts?: number;
  /**
   * Due date for the assignment
   * @format date-time
   * @example "2024-12-31T23:59:59Z"
   */
  dueDate?: string;
  /**
   * Creation timestamp
   * @format date-time
   * @example "2025-11-01T08:00:00Z"
   */
  createdAt?: string;
  /**
   * Last update timestamp
   * @format date-time
   * @example "2025-11-20T14:30:00Z"
   */
  updatedAt?: string;
}

export interface SystemSettingRequest {
  /** @minLength 1 */
  keyName: string;
  /** @minLength 1 */
  value: string;
  description?: string;
}

export interface SystemSettingResponse {
  /** @format int64 */
  id?: number;
  keyName?: string;
  value?: string;
  description?: string;
}

/** Updated config details */
export interface UpdateRevenueShareConfigRequest {
  /**
   * @min 0
   * @max 100
   */
  percentage?: number;
  /** @format date */
  effectiveTo?: string;
  description?: string;
  minimumPayoutAmount?: number;
  isActive?: boolean;
  versionNote?: string;
}

export interface RevenueShareConfigResponse {
  /** @format int64 */
  id?: number;
  percentage?: number;
  platformPercentage?: number;
  /** @format date */
  effectiveFrom?: string;
  /** @format date */
  effectiveTo?: string;
  isActive?: boolean;
  description?: string;
  minimumPayoutAmount?: number;
  /** @format int64 */
  categoryId?: number;
  categoryName?: string;
  versionNote?: string;
  metadata?: Record<string, any>;
  /** @format date-time */
  createdAt?: string;
  /** @format date-time */
  updatedAt?: string;
}

/** Updated profile information */
export interface UpdateProfileRequest {
  /**
   * Full name of the user
   * @minLength 0
   * @maxLength 255
   * @example "John Doe"
   */
  fullName?: string;
  /**
   * Date of birth
   * @format date
   * @example "1990-01-15"
   */
  birthDate?: string;
  /**
   * Phone number (Vietnamese format)
   * @pattern ^(\+84|0)[1-9][0-9]{8,9}$
   * @example "0901234567"
   */
  phone?: string;
  /**
   * Biography or description
   * @minLength 0
   * @maxLength 2000
   * @example "I am a software developer passionate about learning"
   */
  bio?: string;
  /**
   * Gender of the user
   * @example "MALE"
   */
  gender?: "MALE" | "FEMALE" | "OTHER";
  /**
   * Specialty or area of expertise (for instructors)
   * @minLength 0
   * @maxLength 255
   * @example "Computer Science"
   */
  specialty?: string;
  /**
   * Academic degree (for instructors)
   * @minLength 0
   * @maxLength 128
   * @example "Ph.D. in Computer Science"
   */
  degree?: string;
}

/** Response DTO for detailed account profile */
export interface AccountProfileResponse {
  /**
   * Account ID
   * @format int64
   * @example 123
   */
  accountId?: number;
  /**
   * Username
   * @example "john_doe"
   */
  username?: string;
  /**
   * Email address
   * @example "john.doe@example.com"
   */
  email?: string;
  /**
   * Last login timestamp
   * @format date-time
   * @example "2025-11-30T10:15:30Z"
   */
  lastLoginAt?: string;
  /**
   * User role
   * @example "STUDENT"
   */
  role?: "STUDENT" | "TEACHER" | "ADMIN";
  /**
   * Account status
   * @example "ACTIVE"
   */
  status?:
    | "PENDING_EMAIL"
    | "PENDING_APPROVAL"
    | "ACTIVE"
    | "REJECTED"
    | "SUSPENDED"
    | "DEACTIVATED";
  /**
   * Avatar URL
   * @example "https://example.com/avatars/john.jpg"
   */
  avatarUrl?: string;
  /** Profile details */
  profile?: Profile;
}

/** Profile information */
export interface Profile {
  /**
   * Student ID
   * @format int64
   * @example 456
   */
  studentId?: number;
  /**
   * Teacher ID
   * @format int64
   * @example 789
   */
  teacherId?: number;
  /**
   * Student code
   * @example "ST2024001"
   */
  studentCode?: string;
  /**
   * Teacher code
   * @example "TC2024001"
   */
  teacherCode?: string;
  /**
   * Full name
   * @example "John Doe"
   */
  fullName?: string;
  /**
   * Phone number
   * @example "0901234567"
   */
  phone?: string;
  /**
   * Birth date
   * @format date
   * @example "1990-01-15"
   */
  birthDate?: string;
  /**
   * Biography
   * @example "Passionate educator"
   */
  bio?: string;
  /**
   * Gender
   * @example "MALE"
   */
  gender?: "MALE" | "FEMALE" | "OTHER";
  /**
   * Specialty/field of expertise
   * @example "Computer Science"
   */
  specialty?: string;
  /**
   * Academic degree
   * @example "Ph.D."
   */
  degree?: string;
  /**
   * Whether teacher is approved
   * @example true
   */
  approved?: boolean;
  /**
   * ID of admin who approved
   * @format int64
   * @example 10
   */
  approvedBy?: number;
  /**
   * Approval timestamp
   * @format date-time
   * @example "2025-11-15T10:00:00Z"
   */
  approvedAt?: string;
  /**
   * Reason for rejection (if rejected)
   * @example "Incomplete documents"
   */
  rejectionReason?: string;
  /**
   * Profile creation timestamp
   * @format date-time
   * @example "2025-11-01T08:00:00Z"
   */
  createdAt?: string;
  /**
   * Profile last update timestamp
   * @format date-time
   * @example "2025-11-20T14:30:00Z"
   */
  updatedAt?: string;
}

/** Rejection reason */
export interface RejectTeacherRequest {
  /**
   * Reason for rejection
   * @minLength 10
   * @maxLength 1000
   * @example "Insufficient qualifications or credentials not verified"
   */
  reason: string;
}

/** Optional approval note */
export interface ApproveTeacherRequest {
  /**
   * Optional note for approval
   * @minLength 0
   * @maxLength 500
   * @example "Approved based on credentials verification"
   */
  note?: string;
}

/** Course details */
export interface CourseRequest {
  /**
   * Course title
   * @minLength 1
   * @example "Introduction to Java Programming"
   */
  title: string;
  /**
   * Short description of the course
   * @minLength 1
   * @example "Learn Java from scratch with hands-on projects"
   */
  shortDescription: string;
  /**
   * ID of the course category
   * @format int64
   * @example 5
   */
  categoryId: number;
  /**
   * Account ID of the instructor
   * @format int64
   * @example 10
   */
  teacherId: number;
  /**
   * Whether enrollment is closed
   * @example false
   */
  isClosed?: boolean;
  /**
   * Course difficulty level
   * @example "BEGINNER"
   */
  difficulty?: "BEGINNER" | "INTERMEDIATE" | "ADVANCED";
  /**
   * Meta title for SEO
   * @example "Java Programming Course"
   */
  metaTitle?: string;
  /**
   * Meta description for SEO
   * @example "Comprehensive Java course for beginners"
   */
  metaDescription?: string;
  /**
   * SEO keywords
   * @example "java, programming, beginner, oop"
   */
  seoKeywords?: string;
  /**
   * Course thumbnail URL
   * @example "https://example.com/images/java-course.jpg"
   */
  thumbnailUrl?: string;
  /**
   * Whether the course should be indexed by search engines
   * @example true
   */
  isIndexed?: boolean;
  /**
   * List of tags associated with the course
   * @example ["Java","Programming","Backend"]
   */
  tags?: string[];
}

/** List of tag names to create */
export interface BulkTagRequest {
  /**
   * List of tag names to create
   * @maxItems 50
   * @minItems 0
   * @example ["Java","Spring Boot","Hibernate","Microservices"]
   */
  tagNames: string[];
}

/** Response DTO for tag */
export interface TagResponseDto {
  /**
   * Tag ID
   * @format int64
   * @example 1
   */
  id?: number;
  /**
   * Tag name
   * @example "Java"
   */
  name?: string;
  /**
   * SEO-friendly URL slug
   * @example "java"
   */
  slug?: string;
  /**
   * Creation timestamp
   * @format date-time
   * @example "2024-01-20T10:30:00Z"
   */
  createdAt?: string;
  /**
   * Created by user
   * @example "admin"
   */
  createdBy?: string;
  /**
   * Deletion timestamp (soft delete)
   * @format date-time
   * @example null
   */
  deletedAt?: string;
}

/** Response DTO for file storage information */
export interface FileStorageResponse {
  /**
   * File storage ID
   * @format int64
   * @example 1
   */
  id?: number;
  /**
   * Storage key/path
   * @example "resources/documents/uuid.pdf"
   */
  storageKey?: string;
  /**
   * Storage provider
   * @example "MINIO"
   */
  storageProvider?:
    | "CLOUDINARY"
    | "MINIO"
    | "S3"
    | "GCS"
    | "AZURE_BLOB"
    | "LOCAL";
  /**
   * Original filename
   * @example "lecture-notes.pdf"
   */
  originalName?: string;
  /**
   * MIME type
   * @example "application/pdf"
   */
  mimeType?: string;
  /**
   * File size in bytes
   * @format int64
   * @example 2048576
   */
  sizeBytes?: number;
  /**
   * Formatted file size
   * @example 2
   */
  formattedSize?: string;
  /**
   * File extension
   * @example "pdf"
   */
  fileExtension?: string;
  /**
   * Download URL (presigned if MinIO)
   * @example "https://..."
   */
  downloadUrl?: string;
  /** Checksum for integrity verification */
  checksum?: string;
  /** Whether this is a video file */
  isVideo?: boolean;
  /** Whether this is an image file */
  isImage?: boolean;
  /** Whether this is a document file */
  isDocument?: boolean;
  /**
   * Upload timestamp
   * @format date-time
   */
  createdAt?: string;
}

/** Grading details including score */
export interface GradeSubmissionRequest {
  /**
   * Grade for the submission (0-10 scale)
   * @format double
   * @min 0
   * @max 10
   * @example 8.5
   */
  grade: number;
  /**
   * Feedback for the student
   * @example "Excellent work! Keep it up."
   */
  feedback?: string;
}

/** Feedback details */
export interface FeedbackSubmissionRequest {
  /**
   * Feedback text for the submission
   * @minLength 1
   * @example "Great work! However, consider improving the error handling section."
   */
  feedback: string;
}

/** Report details */
export interface ViolationReportCreateRequest {
  /** @format int64 */
  targetAccountId?: number;
  /** @format int64 */
  courseId?: number;
  /** @format int64 */
  lessonId?: number;
  /** @format int64 */
  commentId?: number;
  reportType?: string;
  description?: string;
}

export interface SimpleCommentDto {
  /** @format int64 */
  id?: number;
  content?: string;
}

export interface SimpleCourseDto {
  /** @format int64 */
  id?: number;
  title?: string;
}

export interface SimpleLessonDto {
  /** @format int64 */
  id?: number;
  title?: string;
}

export interface SimpleUserDto {
  /** @format int64 */
  id?: number;
  username?: string;
  email?: string;
}

export interface ViolationReportDetailResponse {
  /** @format int64 */
  id?: number;
  reportType?: string;
  description?: string;
  status?: "PENDING" | "IN_REVIEW" | "DISMISSED" | "ACTION_TAKEN";
  createdAt?: string;
  updatedAt?: string;
  reporter?: SimpleUserDto;
  target?: SimpleUserDto;
  course?: SimpleCourseDto;
  lesson?: SimpleLessonDto;
  comment?: SimpleCommentDto;
}

export interface RecommendationFeedbackRequest {
  feedbackType: "LIKED" | "IGNORED" | "DISMISSED" | "ENROLLED";
  metadata?: string;
}

/** Answer submission details */
export interface SubmitAnswerRequest {
  /**
   * ID of the question being answered
   * @format int64
   * @example 1
   */
  questionId: number;
  /**
   * ID of the selected option (for single choice questions)
   * @format int64
   * @example 5
   */
  selectedOptionId?: number;
  /**
   * Text answer (for short answer or essay questions)
   * @example "Spring Boot is a Java framework"
   */
  answerText?: string;
  /**
   * List of selected option IDs (for multiple choice questions)
   * @example [5,7,9]
   */
  selectedOptionIds?: number[];
}

/** Response DTO for quiz attempt answer */
export interface QuizAttemptAnswerResponse {
  /**
   * Answer ID
   * @format int64
   * @example 1
   */
  id?: number;
  /**
   * Question ID
   * @format int64
   * @example 5
   */
  questionId?: number;
  /**
   * Selected option ID (for single choice)
   * @format int64
   * @example 10
   */
  selectedOptionId?: number;
  /**
   * Text answer (for short answer/essay questions)
   * @example "Spring Boot is a Java framework"
   */
  answerText?: string;
  /**
   * Selected option IDs (JSON string for multiple choice)
   * @example [5,7,9]
   */
  selectedOptionIds?: string;
  /**
   * Score received for this answer
   * @format double
   * @example 8.5
   */
  score?: number;
  /**
   * Whether the answer has been graded
   * @example true
   */
  graded?: boolean;
}

/** Response DTO for quiz attempt details */
export interface QuizAttemptResponse {
  /**
   * Attempt ID
   * @format int64
   * @example 1
   */
  id?: number;
  /**
   * Quiz ID
   * @format int64
   * @example 5
   */
  quizId?: number;
  /**
   * Student ID who took the quiz
   * @format int64
   * @example 10
   */
  studentId?: number;
  /**
   * When the attempt started
   * @format date-time
   * @example "2025-11-30T10:00:00Z"
   */
  startedAt?: string;
  /**
   * When the attempt finished
   * @format date-time
   * @example "2025-11-30T11:00:00Z"
   */
  finishedAt?: string;
  /**
   * Total score achieved
   * @format double
   * @example 85.5
   */
  totalScore?: number;
  /**
   * Attempt number (1st, 2nd, 3rd...)
   * @format int32
   * @example 1
   */
  attemptNumber?: number;
  /**
   * Status of the attempt
   * @example "COMPLETED"
   */
  status?: "IN_PROGRESS" | "COMPLETED" | "CANCELLED";
  /**
   * Additional metadata in JSON format
   * @example {"ip":"192.168.1.1"}
   */
  metadata?: string;
  /** List of answers submitted */
  answers?: QuizAttemptAnswerResponse[];
}

/** List of question IDs to add */
export interface AddQuestionsRequest {
  /**
   * List of question IDs to add to the quiz
   * @minItems 1
   * @example [1,2,3]
   */
  questionIds: number[];
}

/** Payout request details */
export interface CreatePayoutRequest {
  /**
   * Payout period in YYYY-MM format
   * @example "2025-12"
   */
  payoutPeriod: string;
  /**
   * Bank account number
   * @minLength 1
   * @example 1234567890
   */
  bankAccountNumber: string;
  /**
   * Name of the bank
   * @minLength 1
   * @example "Vietcombank"
   */
  bankName: string;
  /**
   * Name of the account holder
   * @minLength 1
   * @example "Nguyen Van A"
   */
  accountHolderName: string;
  /**
   * Additional notes for the payout
   * @example "Please process urgently"
   */
  notes?: string;
}

/** Payout details */
export interface PayoutResponse {
  /**
   * Payout ID
   * @format int64
   * @example 1
   */
  id?: number;
  /**
   * Teacher ID
   * @format int64
   * @example 10
   */
  teacherId?: number;
  /**
   * Teacher name
   * @example "Dr. John Smith"
   */
  teacherName?: string;
  /**
   * Payout amount
   * @example 5000000
   */
  amount?: number;
  /**
   * Currency code
   * @example "VND"
   */
  currency?: string;
  /**
   * Payout status
   * @example "PENDING"
   */
  status?: "PENDING" | "COMPLETED" | "FAILED" | "REJECTED";
  /**
   * Payout period (YYYY-MM)
   * @example "2025-12"
   */
  payoutPeriod?: string;
  /**
   * Payout date
   * @format date-time
   */
  payoutDate?: string;
  /** Reference number */
  reference?: string;
  /**
   * Revenue share percentage
   * @format float
   * @example 70
   */
  revenueSharePercentage?: number;
  /**
   * Total revenue for the period
   * @example 7142857
   */
  totalRevenue?: number;
  /**
   * Total enrollments
   * @format int32
   * @example 25
   */
  totalEnrollments?: number;
  /**
   * Bank account number
   * @example 1234567890
   */
  bankAccountNumber?: string;
  /**
   * Bank name
   * @example "Vietcombank"
   */
  bankName?: string;
  /**
   * Account holder name
   * @example "Nguyen Van A"
   */
  accountHolderName?: string;
  /** Bank transaction ID */
  bankTransactionId?: string;
  /** Failure reason if rejected */
  failureReason?: string;
  /**
   * Failure time
   * @format date-time
   */
  failedAt?: string;
  /** Processed by (admin name) */
  processedBy?: string;
  /** Additional notes */
  notes?: string;
  /**
   * Transfer fee
   * @example 50000
   */
  transferFee?: number;
  /**
   * Tax amount
   * @example 500000
   */
  taxAmount?: number;
  /**
   * Net amount after fees
   * @example 4450000
   */
  netAmount?: number;
  /**
   * Payout creation time
   * @format date-time
   */
  createdAt?: string;
  /**
   * Payout last update time
   * @format date-time
   */
  updatedAt?: string;
}

/** Generic API response wrapper for consistent output structure */
export interface ApiResponseObject {
  /**
   * Request status: true = success, false = error
   * @example true
   */
  success?: boolean;
  /**
   * HTTP status code
   * @format int32
   * @example 200
   */
  status?: number;
  /**
   * Descriptive message for client
   * @example "Request processed successfully"
   */
  message?: string;
  /**
   * Business code
   * @example "SUCCESS"
   */
  code?: string;
  /** Response data (generic) */
  data?: any;
  /**
   * ISO 8601 timestamp for logging/debugging
   * @format date-time
   * @example "2025-11-30T10:15:30Z"
   */
  timestamp?: string;
  /** Metadata information */
  meta?: Meta;
}

/** Metadata information about the API */
export interface Meta {
  /**
   * Author of the API
   * @example "LMS Team"
   */
  author?: string;
  /**
   * License type
   * @example "MIT"
   */
  license?: string;
  /**
   * API version
   * @example "1.0.0"
   */
  version?: string;
}

/** Refund request details */
export interface RefundRequest {
  /**
   * Refund amount (null means full refund)
   * @example 299000
   */
  refundAmount?: number;
  /**
   * Reason for refund
   * @minLength 1
   * @example "Customer requested refund"
   */
  reason: string;
}

/** Payment transaction details */
export interface PaymentTransactionResponse {
  /**
   * Payment transaction ID
   * @format int64
   * @example 1
   */
  id?: number;
  /**
   * Student ID
   * @format int64
   * @example 10
   */
  studentId?: number;
  /**
   * Student name
   * @example "John Doe"
   */
  studentName?: string;
  /**
   * Course ID
   * @format int64
   * @example 5
   */
  courseId?: number;
  /**
   * Course title
   * @example "Java Programming"
   */
  courseTitle?: string;
  /**
   * Course version ID
   * @format int64
   * @example 15
   */
  courseVersionId?: number;
  /**
   * Version number
   * @format int32
   * @example 1
   */
  versionNumber?: number;
  /**
   * Payment amount
   * @example 299000
   */
  amount?: number;
  /**
   * Currency code
   * @example "VND"
   */
  currency?: string;
  /**
   * Payment provider
   * @example "VNPAY"
   */
  paymentMethod?: "ZALOPAY" | "VNPAY" | "MOMO";
  /**
   * Payment status
   * @example "PAID"
   */
  status?:
    | "PENDING"
    | "PROCESSING"
    | "SUCCESS"
    | "FAILED"
    | "CANCELLED"
    | "REFUNDED"
    | "EXPIRED";
  /** Provider transaction ID */
  providerTransactionId?: string;
  /**
   * Payment completion time
   * @format date-time
   */
  paidAt?: string;
  /**
   * Payment failure time
   * @format date-time
   */
  failedAt?: string;
  /** Failure reason */
  failureReason?: string;
  /** Error code from provider */
  errorCode?: string;
  /**
   * Refund time
   * @format date-time
   */
  refundedAt?: string;
  /**
   * Refund amount
   * @example 299000
   */
  refundAmount?: number;
  /** Refund reason */
  refundReason?: string;
  /**
   * Transaction fee
   * @example 5980
   */
  transactionFee?: number;
  /**
   * Net amount after fees
   * @example 293020
   */
  netAmount?: number;
  /**
   * Transaction creation time
   * @format date-time
   */
  createdAt?: string;
  /**
   * Transaction last update time
   * @format date-time
   */
  updatedAt?: string;
  /**
   * Whether refund is allowed
   * @example true
   */
  canRefund?: boolean;
}

/** Payment request details */
export interface CreatePaymentRequest {
  /**
   * ID of the course to purchase
   * @format int64
   * @example 1
   */
  courseId: number;
  /**
   * ID of the course version to purchase
   * @format int64
   * @example 1
   */
  courseVersionId: number;
  /**
   * Payment provider/method
   * @example "VNPAY"
   */
  paymentMethod?: "ZALOPAY" | "VNPAY" | "MOMO";
  /**
   * URL to redirect after payment
   * @example "https://example.com/payment/success"
   */
  returnUrl?: string;
  /**
   * User agent from client
   * @example "Mozilla/5.0"
   */
  userAgent?: string;
}

/** Payment URL response for redirecting to payment gateway */
export interface PaymentUrlResponse {
  /**
   * Payment transaction ID
   * @format int64
   * @example 1
   */
  paymentId?: number;
  /**
   * Payment gateway URL for redirect
   * @example "https://payment.gateway.com/pay?token=abc123"
   */
  paymentUrl?: string;
  /**
   * Response message
   * @example "Payment URL generated successfully"
   */
  message?: string;
}

/** Video upload details */
export interface UpdateVideoRequest {
  /**
   * MinIO object key for the video file
   * @minLength 1
   * @example "videos/course-1/lesson-5/video.mp4"
   */
  objectKey: string;
  /**
   * Video duration in seconds
   * @format int32
   * @min 1
   * @example 1800
   */
  durationSeconds: number;
}

/** Watched duration update request */
export interface UpdateWatchedDurationRequest {
  /**
   * Watched duration in seconds
   * @format int32
   * @min 0
   * @example 120
   */
  durationSeconds?: number;
  /**
   * Additional notes
   * @example "Completed this lesson"
   */
  notes?: string;
}

/** Lesson progress information */
export interface LessonProgressResponse {
  /**
   * Progress ID
   * @format int64
   * @example 1
   */
  id?: number;
  /**
   * Lesson ID
   * @format int64
   * @example 1
   */
  lessonId?: number;
  /**
   * Lesson title
   * @example "Introduction to Java"
   */
  lessonTitle?: string;
  /**
   * Lesson type
   * @example "VIDEO"
   */
  lessonType?: string;
  /**
   * Lesson duration in seconds
   * @format int32
   * @example 300
   */
  lessonDurationSeconds?: number;
  /**
   * Progress status
   * @example "COMPLETED"
   */
  status?: "NOT_VIEWED" | "VIEWED" | "COMPLETED";
  /**
   * Viewed at
   * @format date-time
   * @example "2025-12-22T00:00:00Z"
   */
  viewedAt?: string;
  /**
   * Times viewed
   * @format int32
   * @example 3
   */
  timesViewed?: number;
  /**
   * Watched duration in seconds
   * @format int32
   * @example 270
   */
  watchedDurationSeconds?: number;
  /**
   * Watched percentage
   * @format float
   * @example 90
   */
  watchedPercentage?: number;
  /**
   * Completed at
   * @format date-time
   * @example "2025-12-22T01:00:00Z"
   */
  completedAt?: string;
  /**
   * Is bookmarked
   * @example false
   */
  isBookmarked?: boolean;
  /**
   * Notes
   * @example "Great lesson!"
   */
  notes?: string;
}

/** Ordered list of resource IDs */
export interface ReorderResourcesRequest {
  /**
   * Ordered list of resource IDs
   * @minItems 1
   * @example [3,1,2,4]
   */
  resourceIds: number[];
}

/** Cancellation request with reason */
export interface CancelEnrollmentRequest {
  /**
   * Reason for cancellation
   * @minLength 0
   * @maxLength 1000
   * @example "Changed my mind"
   */
  reason: string;
}

/** Detailed enrollment information */
export interface EnrollmentDetailResponse {
  /**
   * Enrollment ID
   * @format int64
   * @example 1
   */
  id?: number;
  /**
   * Student ID
   * @format int64
   * @example 1
   */
  studentId?: number;
  /**
   * Student name
   * @example "Nguyen Van A"
   */
  studentName?: string;
  /**
   * Student email
   * @example "student@example.com"
   */
  studentEmail?: string;
  /**
   * Student phone
   * @example "0123456789"
   */
  studentPhone?: string;
  /**
   * Course ID
   * @format int64
   * @example 1
   */
  courseId?: number;
  /**
   * Course title
   * @example "Java Spring Boot"
   */
  courseTitle?: string;
  /**
   * Course version ID
   * @format int64
   * @example 1
   */
  courseVersionId?: number;
  /**
   * Course version number
   * @format int32
   * @example 1
   */
  versionNumber?: number;
  /**
   * Enrollment status
   * @example "ENROLLED"
   */
  status?: "ENROLLED" | "COMPLETED" | "CANCELLED" | "EXPIRED";
  /**
   * Enrolled at
   * @format date-time
   * @example "2025-01-01T00:00:00Z"
   */
  enrolledAt?: string;
  /**
   * Started at
   * @format date-time
   * @example "2025-01-01T00:00:00Z"
   */
  startAt?: string;
  /**
   * End at
   * @format date-time
   * @example "2025-03-01T00:00:00Z"
   */
  endAt?: string;
  /**
   * Completion percentage
   * @format float
   * @example 75.5
   */
  completionPercentage?: number;
  /**
   * Average score
   * @format float
   * @example 8.5
   */
  averageScore?: number;
  /**
   * Certificate issued
   * @example false
   */
  certificateIssued?: boolean;
  /**
   * Certificate ID
   * @format int64
   * @example 1
   */
  certificateId?: number;
  /**
   * Completed at
   * @format date-time
   * @example "2025-02-01T00:00:00Z"
   */
  completedAt?: string;
  /**
   * Cancellation reason
   * @example "Changed my mind"
   */
  cancellationReason?: string;
  /**
   * Cancelled at
   * @format date-time
   * @example "2025-01-15T00:00:00Z"
   */
  cancelledAt?: string;
  /**
   * Remaining days
   * @format int64
   * @example 30
   */
  remainingDays?: number;
  /**
   * Is active
   * @example true
   */
  isActive?: boolean;
  /**
   * Can take final exam
   * @example true
   */
  canTakeFinalExam?: boolean;
  /**
   * Course pass score
   * @format float
   * @example 8
   */
  passScore?: number;
  /**
   * Course min progress percentage
   * @format int32
   * @example 80
   */
  minProgressPct?: number;
  /**
   * Course final weight
   * @format float
   * @example 0.6
   */
  finalWeight?: number;
  /** Quiz scores (JSON) */
  quizScores?: Record<string, any>[];
  /**
   * Final exam score
   * @format float
   * @example 9
   */
  finalExamScore?: number;
  /**
   * Final exam weight (k factor)
   * @format float
   * @example 0.6
   */
  finalExamWeight?: number;
  /** Ban reason if kicked from course */
  banReason?: string;
  /**
   * Banned at
   * @format date-time
   * @example "2025-01-20T00:00:00Z"
   */
  bannedAt?: string;
  /**
   * Is eligible for certificate
   * @example true
   */
  isEligibleForCertificate?: boolean;
}

/** Score update request */
export interface UpdateScoreRequest {
  /** @format int64 */
  quizId: number;
  /**
   * @format float
   * @min 0
   * @max 10
   */
  score: number;
  isFinalExam?: boolean;
}

/** Rejection details */
export interface RejectRequest {
  /**
   * Reason for rejection
   * @minLength 0
   * @maxLength 1000
   * @example "Your submitted documents do not meet our requirements"
   */
  reason?: string;
}

/** Ordered list of chapter IDs */
export interface ChapterReorderRequest {
  /**
   * Ordered list of chapter IDs (0-based indexing)
   * @minItems 1
   * @example [3,1,2,4]
   */
  chapterIds: number[];
}

/** Enrollment request (payment info for paid courses) */
export interface EnrollCourseRequest {
  /**
   * Payment transaction ID (null for free courses)
   * @format int64
   * @example 1
   */
  paymentTransactionId: number;
  /**
   * Additional notes for enrollment
   * @example "Interested in learning"
   */
  notes?: string;
}

/** Lesson details */
export interface CreateLessonRequest {
  /**
   * Type of lesson
   * @example "VIDEO"
   */
  type: "VIDEO" | "DOCUMENT" | "QUIZ" | "ASSIGNMENT" | " FINAL_EXAM";
  /**
   * Lesson title
   * @minLength 1
   * @example "Spring Boot Basics"
   */
  title: string;
  /**
   * Short description of the lesson
   * @example "Learn the fundamentals of Spring Boot"
   */
  shortDescription?: string;
}

/** New lesson order */
export interface ReorderLessonsRequest {
  /**
   * Ordered list of lesson IDs
   * @minItems 1
   * @example [3,1,2,4]
   */
  lessonIds: number[];
}

/** Social login details with provider and access token or authorization code */
export interface SocialLoginRequest {
  /**
   * Social provider (GOOGLE, FACEBOOK, GITHUB)
   * @example "GOOGLE"
   */
  provider: "GOOGLE" | "FACEBOOK" | "GITHUB" | "LOCAL";
  /**
   * OAuth2 access token from social provider (use this OR authorizationCode)
   * @example "ya29.a0AfH6SMBx..."
   */
  accessToken?: string;
  /**
   * Authorization code from OAuth redirect (use this OR accessToken)
   * @example "4/0AY0e-g6..."
   */
  authorizationCode?: string;
  /**
   * Role to register as (STUDENT or TEACHER). Only used for new registrations
   * @example "STUDENT"
   */
  role?: "STUDENT" | "TEACHER" | "ADMIN";
  /**
   * Device information
   * @example "Chrome 120.0 on Windows 10"
   */
  deviceInfo?: string;
  /**
   * IP address of the client
   * @example "192.168.1.1"
   */
  ipAddress?: string;
}

/** Response DTO for login operation */
export interface ResLoginDTO {
  /**
   * JWT access token
   * @example "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
   */
  accessToken?: string;
  /**
   * JWT refresh token
   * @example "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
   */
  refreshToken?: string;
  /**
   * Access token expiration time
   * @format date-time
   * @example "2025-11-30T11:15:30Z"
   */
  accessTokenExpiresAt?: string;
  /**
   * Refresh token expiration time
   * @format date-time
   * @example "2025-12-07T10:15:30Z"
   */
  refreshTokenExpiresAt?: string;
  /** User information */
  user?: UserInfo;
}

/** User information */
export interface UserInfo {
  /**
   * User ID
   * @format int64
   * @example 123
   */
  id?: number;
  /**
   * Username
   * @example "john_doe"
   */
  username?: string;
  /**
   * Email address
   * @example "john.doe@example.com"
   */
  email?: string;
  /**
   * User role
   * @example "STUDENT"
   */
  role?: "STUDENT" | "TEACHER" | "ADMIN";
  /**
   * Full name
   * @example "John Doe"
   */
  fullName?: string;
  /**
   * Avatar URL
   * @example "https://example.com/avatars/john.jpg"
   */
  avatarUrl?: string;
  /**
   * Language preference
   * @example "en"
   */
  langKey?: string;
}

/** Email address to resend verification link */
export interface ResendVerifyEmailRequest {
  /**
   * Email address of the user
   * @format email
   * @minLength 1
   * @example "john.doe@example.com"
   */
  email: string;
}

/** Registration details including email, username, password, and role */
export interface RegisterRequest {
  /**
   * Unique username for the user (cannot contain '@')
   * @minLength 3
   * @maxLength 30
   * @pattern ^[^@]+$
   * @example "john_doe"
   */
  username: string;
  /**
   * Email address of the user
   * @format email
   * @minLength 1
   * @example "john.doe@example.com"
   */
  email: string;
  /**
   * Password for the account
   * @format password
   * @minLength 6
   * @maxLength 50
   * @example "SecurePassword123!"
   */
  password: string;
  /**
   * Role of the user
   * @example "STUDENT"
   */
  role: "STUDENT" | "INSTRUCTOR" | "ADMIN";
  /**
   * Preferred language key
   * @example "en"
   */
  langKey?: string;
}

/** Response DTO for user registration */
export interface RegisterResponse {
  /**
   * Account ID
   * @format int64
   * @example 123
   */
  id?: number;
  /**
   * Username
   * @example "john_doe"
   */
  username?: string;
  /**
   * Email address
   * @example "john.doe@example.com"
   */
  email?: string;
  /**
   * User role
   * @example "STUDENT"
   */
  role?: "STUDENT" | "TEACHER" | "ADMIN";
  /**
   * Account status
   * @example "PENDING"
   */
  status?:
    | "PENDING_EMAIL"
    | "PENDING_APPROVAL"
    | "ACTIVE"
    | "REJECTED"
    | "SUSPENDED"
    | "DEACTIVATED";
  /**
   * Avatar URL
   * @example "https://example.com/avatars/default.jpg"
   */
  avatarUrl?: string;
  /**
   * Account creation timestamp
   * @format date-time
   * @example "2025-11-30T10:15:30Z"
   */
  createdAt?: string;
  /**
   * Language preference
   * @example "en"
   */
  langKey?: string;
}

/** Refresh token to revoke */
export interface ReqRefreshTokenDTO {
  /**
   * Refresh token to generate new access token
   * @minLength 1
   * @example "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
   */
  refreshToken: string;
  /**
   * Device information
   * @example "Chrome 120.0 on Windows 10"
   */
  deviceInfo?: string;
  /**
   * IP address of the client
   * @example "192.168.1.1"
   */
  ipAddress?: string;
}

/** New password */
export interface ResetPasswordDTO {
  /**
   * New password to be set
   * @format password
   * @minLength 1
   * @example "NewSecurePassword123!"
   */
  newPassword: string;
}

/** Email address to send password reset link */
export interface ForgotPasswordDTO {
  /**
   * Email address of the user who forgot password
   * @format email
   * @minLength 1
   * @example "user@example.com"
   */
  email: string;
}

/** Login credentials (username or email and password) */
export interface ReqLoginDTO {
  /**
   * Username or email of the user. Can be sent as 'login', 'email', or 'username'
   * @minLength 1
   * @example "john_doe or john@example.com"
   */
  login: string;
  /**
   * User password
   * @format password
   * @minLength 1
   * @example "Password123!"
   */
  password: string;
  /**
   * Device information
   * @example "Chrome 120.0 on Windows 10"
   */
  deviceInfo?: string;
  /**
   * IP address of the client
   * @example "192.168.1.1"
   */
  ipAddress?: string;
}

/** Revenue share config details */
export interface CreateRevenueShareConfigRequest {
  /**
   * @min 0
   * @max 100
   */
  percentage: number;
  /** @format date */
  effectiveFrom: string;
  /** @format date */
  effectiveTo?: string;
  description?: string;
  minimumPayoutAmount?: number;
  /** @format int64 */
  categoryId?: number;
  versionNote?: string;
}

/** Action details */
export interface ViolationReportTakeActionRequest {
  action?: string;
  note?: string;
}

/** Review details */
export interface ViolationReportReviewRequest {
  note?: string;
}

/** Dismissal reason */
export interface ViolationReportDismissRequest {
  reason?: string;
}

/** Rejection details */
export interface RejectPayoutRequest {
  /**
   * Reason for rejecting the payout
   * @minLength 1
   * @example "Insufficient documentation"
   */
  reason: string;
}

/** Payout completion details */
export interface CompletePayoutRequest {
  /**
   * Bank transaction ID as proof of transfer
   * @minLength 1
   * @example "BNK20250118123456"
   */
  bankTransactionId: string;
  /**
   * Additional notes
   * @example "Processed successfully"
   */
  notes?: string;
}

/** Bulk notification details */
export interface SendBulkNotificationRequest {
  accountIds?: number[];
  type?: string;
  title?: string;
  content?: string;
}

/** Channel details */
export interface NotificationChannelCreateRequest {
  /** @format int64 */
  notificationId?: number;
  channel?: string;
  status?: string;
}

export interface Account {
  /** @format date-time */
  createdAt?: string;
  /** @format date-time */
  updatedAt?: string;
  createdBy?: string;
  updatedBy?: string;
  /** @format date-time */
  deletedAt?: string;
  /** @format int64 */
  id?: number;
  username?: string;
  email?: string;
  passwordHash?: string;
  /** User roles */
  role?: "STUDENT" | "TEACHER" | "ADMIN";
  /** Account status values */
  status?:
    | "PENDING_EMAIL"
    | "PENDING_APPROVAL"
    | "ACTIVE"
    | "REJECTED"
    | "SUSPENDED"
    | "DEACTIVATED";
  avatarUrl?: string;
  avatarPublicId?: string;
  /** @format date-time */
  lastLoginAt?: string;
  /**
   * @minLength 2
   * @maxLength 10
   */
  langKey?: string;
  student?: boolean;
  oldAvatarPublicId?: string;
  pendingEmailVerification?: boolean;
  teacher?: boolean;
  admin?: boolean;
  active?: boolean;
}

export interface Notification {
  /** @format date-time */
  createdAt?: string;
  /** @format date-time */
  updatedAt?: string;
  createdBy?: string;
  updatedBy?: string;
  /** @format date-time */
  deletedAt?: string;
  /** @format int64 */
  id?: number;
  recipient?: Account;
  type?: string;
  title?: string;
  content?: string;
  referenceType?: string;
  referenceId?: string;
  isRead?: boolean;
  /** @format date-time */
  deliveredAt?: string;
  channels?: NotificationChannel[];
  delivered?: boolean;
}

export interface NotificationChannel {
  /** @format date-time */
  createdAt?: string;
  /** @format date-time */
  updatedAt?: string;
  createdBy?: string;
  updatedBy?: string;
  /** @format date-time */
  deletedAt?: string;
  /** @format int64 */
  id?: number;
  notification?: Notification;
  channel?: "WEB" | "MOBILE_PUSH" | "EMAIL" | "SMS";
  status?: "PENDING" | "SENT" | "FAILED" | "PROCESSING";
  /** @format date-time */
  sentAt?: string;
  errorMessage?: string;
  channelTypeName?: string;
  emailChannel?: boolean;
  pushChannel?: boolean;
  webChannel?: boolean;
  smsChannel?: boolean;
  processing?: boolean;
  sent?: boolean;
  pending?: boolean;
}

export interface CertificateDetailResponse {
  /** @format int64 */
  id?: number;
  code?: string;
  /** @format int64 */
  studentId?: number;
  studentName?: string;
  studentEmail?: string;
  /** @format int64 */
  courseId?: number;
  courseTitle?: string;
  /** @format int64 */
  courseVersionId?: number;
  /** @format int32 */
  versionNumber?: number;
  /** @format int64 */
  teacherId?: number;
  teacherName?: string;
  /** @format date-time */
  issuedAt?: string;
  /** @format float */
  finalScore?: number;
  grade?: string;
  isRevoked?: boolean;
  revokeReason?: string;
  /** @format date-time */
  revokedAt?: string;
  revokedBy?: string;
  /** @format date-time */
  expiresAt?: string;
  fileUrl?: string;
  metadata?: Record<string, any>;
  /** @format date-time */
  createdAt?: string;
  /** @format date-time */
  updatedAt?: string;
}

/** Deactivation details including reason */
export interface AccountActionRequest {
  /**
   * Reason for the action
   * @minLength 0
   * @maxLength 1000
   * @example "Violating community guidelines"
   */
  reason?: string;
}

/** Details of an import error */
export interface ImportError {
  /**
   * Row number where error occurred (1-based)
   * @format int32
   * @example 5
   */
  rowNumber?: number;
  /**
   * Email from the row (if available)
   * @example "john.doe@example.com"
   */
  email?: string;
  /**
   * Error message describing what went wrong
   * @example "Email already exists in system"
   */
  message?: string;
}

/** Result of bulk student import operation */
export interface ImportResultResponse {
  /**
   * Total number of rows processed
   * @format int32
   * @example 100
   */
  totalRows?: number;
  /**
   * Number of students successfully imported
   * @format int32
   * @example 95
   */
  successCount?: number;
  /**
   * Number of rows that failed validation or import
   * @format int32
   * @example 5
   */
  failureCount?: number;
  /** List of errors encountered during import */
  errors?: ImportError[];
  /** List of successfully imported student emails */
  successfulEmails?: string[];
}

/** New status and reason for change */
export interface UpdateStatusRequest {
  /**
   * New account status
   * @example "ACTIVE"
   */
  status:
    | "PENDING_EMAIL"
    | "PENDING_APPROVAL"
    | "ACTIVE"
    | "SUSPENDED"
    | "REJECTED"
    | "DEACTIVATED";
  /**
   * Reason for status change
   * @example "Account verified successfully"
   */
  reason?: string;
}

export interface TestEntity {
  /** @format date-time */
  createdAt?: string;
  /** @format date-time */
  updatedAt?: string;
  createdBy?: string;
  updatedBy?: string;
  /** @format date-time */
  deletedAt?: string;
  /** @format int64 */
  id?: number;
  name?: string;
  /** @format int32 */
  age?: number;
}

export interface TeacherRevenueResponse {
  /** @format int64 */
  teacherId?: number;
  teacherName?: string;
  totalRevenue?: number;
  teacherEarnings?: number;
  platformFee?: number;
  /** @format float */
  revenueSharePercentage?: number;
  /** @format int64 */
  totalTransactions?: number;
  /** @format int64 */
  totalEnrollments?: number;
  pendingPayout?: number;
  completedPayout?: number;
  revenueByCourse?: Record<string, number>;
}

export interface MonthlyRevenueResponse {
  /** @format int64 */
  teacherId?: number;
  teacherName?: string;
  period?: string;
  totalRevenue?: number;
  teacherEarnings?: number;
  platformFee?: number;
  /** @format int32 */
  totalEnrollments?: number;
  /** @format int32 */
  totalTransactions?: number;
  dailyRevenue?: Record<string, number>;
  revenueByCourse?: Record<string, number>;
}

export interface CourseRevenueDetail {
  /** @format int64 */
  courseId?: number;
  courseTitle?: string;
  courseThumbnail?: string;
  grossRevenue?: number;
  netRevenue?: number;
  teacherEarnings?: number;
  platformFee?: number;
  /** @format int32 */
  totalEnrollments?: number;
  /** @format int32 */
  totalTransactions?: number;
  /** @format float */
  revenueSharePercentage?: number;
}

export interface RevenueBreakdownResponse {
  /** @format int64 */
  teacherId?: number;
  teacherName?: string;
  totalGrossRevenue?: number;
  totalNetRevenue?: number;
  totalTeacherEarnings?: number;
  totalPlatformFee?: number;
  courseBreakdown?: CourseRevenueDetail[];
}

export interface Pageable {
  /**
   * @format int32
   * @min 0
   */
  page?: number;
  /**
   * @format int32
   * @min 1
   */
  size?: number;
  sort?: string[];
}

/** Paginated response wrapper */
export interface PageResponseStudentResponse {
  /** List of items in current page */
  items?: StudentResponse[];
  /**
   * Current page number (0-indexed)
   * @format int32
   * @example 0
   */
  page?: number;
  /**
   * Number of items per page
   * @format int32
   * @example 10
   */
  size?: number;
  /**
   * Total number of items
   * @format int64
   * @example 100
   */
  totalItems?: number;
  /**
   * Total number of pages
   * @format int32
   * @example 10
   */
  totalPages?: number;
  /**
   * Whether there is a next page
   * @example true
   */
  hasNext?: boolean;
  /**
   * Whether there is a previous page
   * @example false
   */
  hasPrevious?: boolean;
}

/** Student information response */
export interface StudentResponse {
  /**
   * Student ID
   * @format int64
   * @example 1
   */
  id?: number;
  /**
   * Student code
   * @example "SV2024001"
   */
  studentCode?: string;
  /**
   * Student full name
   * @example "Nguyen Van A"
   */
  fullName?: string;
  /**
   * Student email
   * @example "student@example.com"
   */
  email?: string;
  /**
   * Student phone
   * @example "0123456789"
   */
  phone?: string;
  /**
   * Student birth date
   * @format date
   * @example "2000-01-01"
   */
  birthDate?: string;
  /**
   * Student gender
   * @example "MALE"
   */
  gender?: "MALE" | "FEMALE" | "OTHER";
  /** Student biography */
  bio?: string;
  /** Avatar URL */
  avatarUrl?: string;
  /**
   * Account status
   * @example "ACTIVE"
   */
  accountStatus?:
    | "PENDING_EMAIL"
    | "PENDING_APPROVAL"
    | "ACTIVE"
    | "REJECTED"
    | "SUSPENDED"
    | "DEACTIVATED";
  /**
   * Creation timestamp
   * @format date-time
   */
  createdAt?: string;
  /**
   * Last update timestamp
   * @format date-time
   */
  updatedAt?: string;
}

/** Teacher statistics response */
export interface TeacherStatsResponse {
  /**
   * Total number of courses
   * @format int64
   * @example 10
   */
  totalCourses?: number;
  /**
   * Number of published courses
   * @format int64
   * @example 8
   */
  publishedCourses?: number;
  /**
   * Number of draft courses
   * @format int64
   * @example 2
   */
  draftCourses?: number;
  /**
   * Total number of students enrolled in all courses
   * @format int64
   * @example 250
   */
  totalStudents?: number;
  /**
   * Total number of course reviews
   * @format int64
   * @example 45
   */
  totalReviews?: number;
  /**
   * Average course rating
   * @format double
   * @example 4.5
   */
  averageRating?: number;
  /**
   * Total revenue (if applicable)
   * @format double
   * @example 15000000
   */
  totalRevenue?: number;
}

/** Response DTO for course summary */
export interface CourseResponse {
  /**
   * Course ID
   * @format int64
   * @example 1
   */
  id?: number;
  /**
   * Course title
   * @example "Introduction to Java Programming"
   */
  title?: string;
  /**
   * Short description
   * @example "Learn Java from scratch"
   */
  shortDescription?: string;
  /**
   * Difficulty level
   * @example "BEGINNER"
   */
  difficulty?: "BEGINNER" | "INTERMEDIATE" | "ADVANCED";
  /**
   * Thumbnail URL
   * @example "https://example.com/images/java-course.jpg"
   */
  thumbnailUrl?: string;
  /**
   * SEO-friendly URL slug
   * @example "introduction-to-java-programming"
   */
  slug?: string;
  /**
   * Whether enrollment is closed
   * @example false
   */
  isClosed?: boolean;
  /**
   * Category ID
   * @format int64
   * @example 5
   */
  categoryId?: number;
  /**
   * Category name
   * @example "Programming"
   */
  categoryName?: string;
  /**
   * Teacher/instructor ID
   * @format int64
   * @example 10
   */
  teacherId?: number;
  /**
   * Teacher/instructor name
   * @example "Dr. John Smith"
   */
  teacherName?: string;
  /**
   * Public version ID
   * @format int64
   * @example 15
   */
  publicVersionId?: number;
  /**
   * List of tags associated with the course
   * @example ["Java","Programming","Backend"]
   */
  tags?: string[];
  /**
   * Total enrollment count
   * @format int32
   * @example 150
   */
  enrollmentCount?: number;
  /**
   * Has published version
   * @example true
   */
  hasPublishedVersion?: boolean;
  /**
   * Course created date
   * @format date-time
   */
  createdAt?: string;
  /**
   * Course last updated date
   * @format date-time
   */
  updatedAt?: string;
}

/** Paginated response wrapper */
export interface PageResponseCourseResponse {
  /** List of items in current page */
  items?: CourseResponse[];
  /**
   * Current page number (0-indexed)
   * @format int32
   * @example 0
   */
  page?: number;
  /**
   * Number of items per page
   * @format int32
   * @example 10
   */
  size?: number;
  /**
   * Total number of items
   * @format int64
   * @example 100
   */
  totalItems?: number;
  /**
   * Total number of pages
   * @format int32
   * @example 10
   */
  totalPages?: number;
  /**
   * Whether there is a next page
   * @example true
   */
  hasNext?: boolean;
  /**
   * Whether there is a previous page
   * @example false
   */
  hasPrevious?: boolean;
}

/** Response DTO for course statistics */
export interface CourseStatsResponse {
  /**
   * Course ID
   * @format int64
   * @example 1
   */
  courseId?: number;
  /**
   * Course title
   * @example "Introduction to Java Programming"
   */
  courseTitle?: string;
  /**
   * Total number of enrolled students
   * @format int64
   * @example 150
   */
  totalStudents?: number;
  /**
   * Number of active students (currently enrolled)
   * @format int64
   * @example 120
   */
  activeStudents?: number;
  /**
   * Number of students who completed the course
   * @format int64
   * @example 80
   */
  completedStudents?: number;
  /**
   * Average rating (0.0 - 5.0)
   * @format double
   * @example 4.8
   */
  averageRating?: number;
  /**
   * Total number of reviews
   * @format int64
   * @example 95
   */
  totalReviews?: number;
  /**
   * Course completion rate (percentage)
   * @format double
   * @example 53.33
   */
  completionRate?: number;
  /**
   * Total revenue from this course
   * @example 15000000
   */
  revenue?: number;
  /**
   * Number of published versions
   * @format int32
   * @example 3
   */
  publishedVersions?: number;
  /**
   * Latest version number
   * @format int32
   * @example 3
   */
  latestVersion?: number;
  /**
   * Last updated timestamp
   * @format date-time
   * @example "2026-01-15T10:30:00Z"
   */
  lastUpdated?: string;
}

/** Paginated response wrapper */
export interface PageResponseTag {
  /** List of items in current page */
  items?: Tag[];
  /**
   * Current page number (0-indexed)
   * @format int32
   * @example 0
   */
  page?: number;
  /**
   * Number of items per page
   * @format int32
   * @example 10
   */
  size?: number;
  /**
   * Total number of items
   * @format int64
   * @example 100
   */
  totalItems?: number;
  /**
   * Total number of pages
   * @format int32
   * @example 10
   */
  totalPages?: number;
  /**
   * Whether there is a next page
   * @example true
   */
  hasNext?: boolean;
  /**
   * Whether there is a previous page
   * @example false
   */
  hasPrevious?: boolean;
}

/** Response DTO for tag statistics and popularity */
export interface TagStatsResponse {
  /**
   * Tag ID
   * @format int64
   * @example 1
   */
  id?: number;
  /**
   * Tag name
   * @example "Java"
   */
  name?: string;
  /**
   * SEO-friendly URL slug
   * @example "java"
   */
  slug?: string;
  /**
   * Number of courses using this tag
   * @format int64
   * @example 150
   */
  courseCount?: number;
  /**
   * Popularity ranking
   * @format int32
   * @example 1
   */
  rank?: number;
}

export interface RecommendationLogDto {
  /** @format int64 */
  id?: number;
  /** @format int64 */
  studentId?: number;
  /** @format int64 */
  recommendedCourseId?: number;
  /** @format float */
  score?: number;
  algorithmVersion?: string;
}

/** Course progress summary */
export interface CourseProgressSummary {
  /**
   * Course ID
   * @format int64
   * @example 1
   */
  courseId?: number;
  /**
   * Course title
   * @example "Java Spring Boot"
   */
  courseTitle?: string;
  /**
   * Completion percentage
   * @format float
   * @example 60
   */
  completionPercentage?: number;
  /**
   * Average score
   * @format float
   * @example 8.5
   */
  averageScore?: number;
  /**
   * Total lessons
   * @format int32
   * @example 50
   */
  totalLessons?: number;
  /**
   * Completed lessons
   * @format int32
   * @example 30
   */
  completedLessons?: number;
}

/** Student overall progress summary */
export interface StudentProgressOverviewResponse {
  /**
   * Student ID
   * @format int64
   * @example 1
   */
  studentId?: number;
  /**
   * Student name
   * @example "Nguyen Van A"
   */
  studentName?: string;
  /**
   * Total enrolled courses
   * @format int32
   * @example 5
   */
  totalEnrolledCourses?: number;
  /**
   * Completed courses
   * @format int32
   * @example 2
   */
  completedCourses?: number;
  /**
   * In progress courses
   * @format int32
   * @example 3
   */
  inProgressCourses?: number;
  /**
   * Overall completion percentage
   * @format float
   * @example 45.5
   */
  overallCompletionPercentage?: number;
  /**
   * Total watched hours
   * @format float
   * @example 120.5
   */
  totalWatchedHours?: number;
  /**
   * Average score across all courses
   * @format float
   * @example 8.2
   */
  averageScore?: number;
  /** Course progress list */
  courses?: CourseProgressSummary[];
}

/** Enrollment information */
export interface EnrollmentResponse {
  /**
   * Enrollment ID
   * @format int64
   * @example 1
   */
  id?: number;
  /**
   * Student ID
   * @format int64
   * @example 1
   */
  studentId?: number;
  /**
   * Student name
   * @example "Nguyen Van A"
   */
  studentName?: string;
  /**
   * Student email
   * @example "student@example.com"
   */
  studentEmail?: string;
  /**
   * Course ID
   * @format int64
   * @example 1
   */
  courseId?: number;
  /**
   * Course title
   * @example "Java Spring Boot"
   */
  courseTitle?: string;
  /**
   * Course version ID
   * @format int64
   * @example 1
   */
  courseVersionId?: number;
  /**
   * Course version number
   * @format int32
   * @example 1
   */
  versionNumber?: number;
  /**
   * Enrollment status
   * @example "ENROLLED"
   */
  status?: "ENROLLED" | "COMPLETED" | "CANCELLED" | "EXPIRED";
  /**
   * Enrolled at
   * @format date-time
   * @example "2025-01-01T00:00:00Z"
   */
  enrolledAt?: string;
  /**
   * Started at
   * @format date-time
   * @example "2025-01-01T00:00:00Z"
   */
  startAt?: string;
  /**
   * End at
   * @format date-time
   * @example "2025-03-01T00:00:00Z"
   */
  endAt?: string;
  /**
   * Completion percentage
   * @format float
   * @example 75.5
   */
  completionPercentage?: number;
  /**
   * Average score
   * @format float
   * @example 8.5
   */
  averageScore?: number;
  /**
   * Certificate issued
   * @example false
   */
  certificateIssued?: boolean;
  /**
   * Completed at
   * @format date-time
   * @example "2025-02-01T00:00:00Z"
   */
  completedAt?: string;
  /**
   * Remaining days
   * @format int64
   * @example 30
   */
  remainingDays?: number;
  /**
   * Is active
   * @example true
   */
  isActive?: boolean;
  /**
   * Can take final exam
   * @example true
   */
  canTakeFinalExam?: boolean;
  /**
   * Final exam score
   * @format float
   * @example 9
   */
  finalExamScore?: number;
  /**
   * Final exam weight (k factor)
   * @format float
   * @example 0.6
   */
  finalExamWeight?: number;
}

/** Paginated response wrapper */
export interface PageResponseEnrollmentResponse {
  /** List of items in current page */
  items?: EnrollmentResponse[];
  /**
   * Current page number (0-indexed)
   * @format int32
   * @example 0
   */
  page?: number;
  /**
   * Number of items per page
   * @format int32
   * @example 10
   */
  size?: number;
  /**
   * Total number of items
   * @format int64
   * @example 100
   */
  totalItems?: number;
  /**
   * Total number of pages
   * @format int32
   * @example 10
   */
  totalPages?: number;
  /**
   * Whether there is a next page
   * @example true
   */
  hasNext?: boolean;
  /**
   * Whether there is a previous page
   * @example false
   */
  hasPrevious?: boolean;
}

/** Chapter progress information */
export interface ChapterProgressResponse {
  /**
   * Chapter ID
   * @format int64
   * @example 1
   */
  chapterId?: number;
  /**
   * Chapter title
   * @example "Chapter 1: Introduction"
   */
  chapterTitle?: string;
  /**
   * Total lessons
   * @format int32
   * @example 10
   */
  totalLessons?: number;
  /**
   * Completed lessons
   * @format int32
   * @example 7
   */
  completedLessons?: number;
  /**
   * Completion percentage
   * @format float
   * @example 70
   */
  completionPercentage?: number;
  /** Lesson progress list */
  lessonProgress?: LessonProgressResponse[];
}

/** Course progress overview */
export interface CourseProgressResponse {
  /**
   * Course ID
   * @format int64
   * @example 1
   */
  courseId?: number;
  /**
   * Course title
   * @example "Java Spring Boot"
   */
  courseTitle?: string;
  /**
   * Total lessons
   * @format int32
   * @example 50
   */
  totalLessons?: number;
  /**
   * Completed lessons
   * @format int32
   * @example 30
   */
  completedLessons?: number;
  /**
   * Viewed lessons
   * @format int32
   * @example 35
   */
  viewedLessons?: number;
  /**
   * Completion percentage
   * @format float
   * @example 60
   */
  completionPercentage?: number;
  /**
   * Total duration in seconds
   * @format int32
   * @example 15000
   */
  totalDurationSeconds?: number;
  /**
   * Watched duration in seconds
   * @format int32
   * @example 9000
   */
  watchedDurationSeconds?: number;
  /**
   * Average score
   * @format float
   * @example 8.5
   */
  averageScore?: number;
  /** Chapter progress list */
  chapterProgress?: ChapterProgressResponse[];
}

export interface CertificateResponse {
  /** @format int64 */
  id?: number;
  code?: string;
  /** @format int64 */
  studentId?: number;
  studentName?: string;
  /** @format int64 */
  courseId?: number;
  courseTitle?: string;
  /** @format date-time */
  issuedAt?: string;
  /** @format float */
  finalScore?: number;
  grade?: string;
  isRevoked?: boolean;
  /** @format date-time */
  expiresAt?: string;
  fileUrl?: string;
}

/** Paginated response wrapper */
export interface PageResponseCertificateResponse {
  /** List of items in current page */
  items?: CertificateResponse[];
  /**
   * Current page number (0-indexed)
   * @format int32
   * @example 0
   */
  page?: number;
  /**
   * Number of items per page
   * @format int32
   * @example 10
   */
  size?: number;
  /**
   * Total number of items
   * @format int64
   * @example 100
   */
  totalItems?: number;
  /**
   * Total number of pages
   * @format int32
   * @example 10
   */
  totalPages?: number;
  /**
   * Whether there is a next page
   * @example true
   */
  hasNext?: boolean;
  /**
   * Whether there is a previous page
   * @example false
   */
  hasPrevious?: boolean;
}

/** Progress for individual course */
export interface CourseProgress {
  /**
   * Course ID
   * @format int64
   * @example 1
   */
  courseId?: number;
  /**
   * Course title
   * @example "Java Programming"
   */
  courseTitle?: string;
  /** Course thumbnail URL */
  courseThumbnail?: string;
  /**
   * Progress percentage
   * @format double
   * @example 75.5
   */
  progressPercentage?: number;
  /**
   * Completed lessons
   * @format int32
   * @example 15
   */
  completedLessons?: number;
  /**
   * Total lessons
   * @format int32
   * @example 20
   */
  totalLessons?: number;
  /**
   * Completed quizzes
   * @format int32
   * @example 3
   */
  completedQuizzes?: number;
  /**
   * Total quizzes
   * @format int32
   * @example 4
   */
  totalQuizzes?: number;
  /**
   * Time spent in minutes
   * @format double
   * @example 125.5
   */
  timeSpentMinutes?: number;
  /**
   * Last accessed date
   * @format date-time
   */
  lastAccessedAt?: string;
  /**
   * Is course completed
   * @example false
   */
  isCompleted?: boolean;
  /**
   * Certificate earned
   * @example false
   */
  hasCertificate?: boolean;
}

/** Student overall progress and statistics */
export interface StudentProgressResponse {
  /**
   * Student ID
   * @format int64
   * @example 1
   */
  studentId?: number;
  /**
   * Student code
   * @example "SV2024001"
   */
  studentCode?: string;
  /**
   * Student full name
   * @example "Nguyen Van A"
   */
  fullName?: string;
  /**
   * Total courses enrolled
   * @format int32
   * @example 5
   */
  totalCoursesEnrolled?: number;
  /**
   * Courses in progress
   * @format int32
   * @example 3
   */
  coursesInProgress?: number;
  /**
   * Courses completed
   * @format int32
   * @example 2
   */
  coursesCompleted?: number;
  /**
   * Overall progress percentage
   * @format double
   * @example 65.5
   */
  overallProgressPercentage?: number;
  /**
   * Total learning hours
   * @format double
   * @example 48.5
   */
  totalLearningHours?: number;
  /**
   * Certificates earned
   * @format int32
   * @example 2
   */
  certificatesEarned?: number;
  /**
   * Last activity date
   * @format date-time
   */
  lastActivityAt?: string;
  /** Progress by course */
  courseProgresses?: CourseProgress[];
}

/** Paginated response wrapper */
export interface PageResponseStudentCourseResponse {
  /** List of items in current page */
  items?: StudentCourseResponse[];
  /**
   * Current page number (0-indexed)
   * @format int32
   * @example 0
   */
  page?: number;
  /**
   * Number of items per page
   * @format int32
   * @example 10
   */
  size?: number;
  /**
   * Total number of items
   * @format int64
   * @example 100
   */
  totalItems?: number;
  /**
   * Total number of pages
   * @format int32
   * @example 10
   */
  totalPages?: number;
  /**
   * Whether there is a next page
   * @example true
   */
  hasNext?: boolean;
  /**
   * Whether there is a previous page
   * @example false
   */
  hasPrevious?: boolean;
}

/** Student enrolled course information */
export interface StudentCourseResponse {
  /**
   * Course ID
   * @format int64
   * @example 1
   */
  courseId?: number;
  /**
   * Course title
   * @example "Java Programming"
   */
  courseTitle?: string;
  /** Course description */
  courseDescription?: string;
  /** Course thumbnail URL */
  courseThumbnail?: string;
  /**
   * Teacher name
   * @example "Nguyen Van B"
   */
  teacherName?: string;
  /**
   * Enrollment date
   * @format date-time
   */
  enrolledAt?: string;
  /**
   * Progress percentage
   * @format double
   * @example 75.5
   */
  progressPercentage?: number;
  /**
   * Completion status
   * @example false
   */
  isCompleted?: boolean;
  /**
   * Certificate issued
   * @example false
   */
  hasCertificate?: boolean;
}

/** Paginated response wrapper */
export interface PageResponseStudentCertificateResponse {
  /** List of items in current page */
  items?: StudentCertificateResponse[];
  /**
   * Current page number (0-indexed)
   * @format int32
   * @example 0
   */
  page?: number;
  /**
   * Number of items per page
   * @format int32
   * @example 10
   */
  size?: number;
  /**
   * Total number of items
   * @format int64
   * @example 100
   */
  totalItems?: number;
  /**
   * Total number of pages
   * @format int32
   * @example 10
   */
  totalPages?: number;
  /**
   * Whether there is a next page
   * @example true
   */
  hasNext?: boolean;
  /**
   * Whether there is a previous page
   * @example false
   */
  hasPrevious?: boolean;
}

/** Student certificate information */
export interface StudentCertificateResponse {
  /**
   * Certificate ID
   * @format int64
   * @example 1
   */
  certificateId?: number;
  /**
   * Certificate code
   * @example "CERT-2024-001"
   */
  certificateCode?: string;
  /**
   * Course ID
   * @format int64
   * @example 1
   */
  courseId?: number;
  /**
   * Course title
   * @example "Java Programming"
   */
  courseTitle?: string;
  /** Course thumbnail URL */
  courseThumbnail?: string;
  /**
   * Teacher name
   * @example "Nguyen Van B"
   */
  teacherName?: string;
  /**
   * Certificate issue date
   * @format date-time
   */
  issuedAt?: string;
  /** Certificate URL */
  certificateUrl?: string;
  /**
   * Final score
   * @format double
   * @example 95.5
   */
  finalScore?: number;
  /**
   * Grade
   * @example "A+"
   */
  grade?: string;
  /**
   * Is certificate revoked
   * @example false
   */
  isRevoked?: boolean;
}

/** Paginated response wrapper */
export interface PageResponseViolationReportResponse {
  /** List of items in current page */
  items?: ViolationReportResponse[];
  /**
   * Current page number (0-indexed)
   * @format int32
   * @example 0
   */
  page?: number;
  /**
   * Number of items per page
   * @format int32
   * @example 10
   */
  size?: number;
  /**
   * Total number of items
   * @format int64
   * @example 100
   */
  totalItems?: number;
  /**
   * Total number of pages
   * @format int32
   * @example 10
   */
  totalPages?: number;
  /**
   * Whether there is a next page
   * @example true
   */
  hasNext?: boolean;
  /**
   * Whether there is a previous page
   * @example false
   */
  hasPrevious?: boolean;
}

export interface ViolationReportResponse {
  /** @format int64 */
  id?: number;
  reportType?: string;
  description?: string;
  status?: "PENDING" | "IN_REVIEW" | "DISMISSED" | "ACTION_TAKEN";
  createdAt?: string;
  reporter?: SimpleUserDto;
  target?: SimpleUserDto;
  course?: SimpleCourseDto;
  lesson?: SimpleLessonDto;
  comment?: SimpleCommentDto;
}

/** Response DTO for quiz statistics and analytics */
export interface QuizStatisticsResponse {
  /**
   * Quiz ID
   * @format int64
   * @example 1
   */
  quizId?: number;
  /**
   * Quiz title
   * @example "Java Basics Quiz"
   */
  quizTitle?: string;
  /**
   * Total number of attempts
   * @format int32
   * @example 45
   */
  totalAttempts?: number;
  /**
   * Number of completed attempts
   * @format int32
   * @example 40
   */
  completedAttempts?: number;
  /**
   * Number of in-progress attempts
   * @format int32
   * @example 3
   */
  inProgressAttempts?: number;
  /**
   * Number of cancelled attempts
   * @format int32
   * @example 2
   */
  cancelledAttempts?: number;
  /**
   * Average score across all completed attempts
   * @format double
   * @example 78.5
   */
  averageScore?: number;
  /**
   * Highest score achieved
   * @format double
   * @example 95
   */
  highestScore?: number;
  /**
   * Lowest score achieved
   * @format double
   * @example 45
   */
  lowestScore?: number;
  /**
   * Pass rate (percentage of attempts that passed)
   * @format double
   * @example 85.5
   */
  passRate?: number;
  /**
   * Average time spent on quiz in minutes
   * @format double
   * @example 42.5
   */
  averageTimeSpentMinutes?: number;
}

/** Response DTO for quiz eligibility check */
export interface QuizEligibilityResponse {
  /**
   * Quiz ID
   * @format int64
   * @example 1
   */
  quizId?: number;
  /**
   * Quiz title
   * @example "Java Basics Quiz"
   */
  quizTitle?: string;
  /**
   * Whether the student can attempt the quiz
   * @example true
   */
  canAttempt?: boolean;
  /**
   * Number of attempts already made
   * @format int32
   * @example 2
   */
  currentAttempts?: number;
  /**
   * Maximum attempts allowed (null for unlimited)
   * @format int32
   * @example 3
   */
  maxAttempts?: number;
  /**
   * Number of attempts remaining
   * @format int32
   * @example 1
   */
  remainingAttempts?: number;
  /**
   * Reason why quiz cannot be attempted (if applicable)
   * @example "Maximum attempts reached"
   */
  reason?: string;
  /**
   * Quiz start date/time
   * @format date-time
   * @example "2026-01-15T08:00:00Z"
   */
  startDate?: string;
  /**
   * Quiz end date/time
   * @format date-time
   * @example "2026-01-30T23:59:59Z"
   */
  endDate?: string;
  /**
   * Message about quiz availability
   * @example "Quiz is available until 2026-01-30T23:59:59Z"
   */
  availabilityMessage?: string;
  available?: boolean;
}

/** Response DTO for public teacher profile */
export interface PublicTeacherProfileResponse {
  /**
   * Teacher ID
   * @format int64
   * @example 10
   */
  id?: number;
  /**
   * Full name
   * @example "Dr. John Smith"
   */
  fullName?: string;
  /**
   * Username
   * @example "john_smith"
   */
  username?: string;
  /**
   * Avatar URL
   * @example "https://example.com/avatars/john.jpg"
   */
  avatarUrl?: string;
  /**
   * Biography/About
   * @example "10+ years of experience in teaching Java and Spring"
   */
  bio?: string;
  /**
   * Total number of students taught
   * @format int64
   * @example 1500
   */
  totalStudents?: number;
  /**
   * Total number of published courses
   * @format int64
   * @example 12
   */
  totalCourses?: number;
  /**
   * Average rating across all courses
   * @format double
   * @example 4.7
   */
  averageRating?: number;
  /**
   * Total reviews across all courses
   * @format int64
   * @example 350
   */
  totalReviews?: number;
  /**
   * Member since
   * @format date-time
   * @example "2020-01-15T10:30:00Z"
   */
  memberSince?: string;
  /** List of published courses by this teacher */
  publishedCourses?: CourseResponse[];
}

/** Preview video streaming URL response */
export interface PreviewVideoUrlResponse {
  /**
   * Video streaming URL
   * @example "https://cdn.example.com/videos/lesson-5/stream.m3u8"
   */
  streamUrl?: string;
}

/** Chapter preview information */
export interface ChapterPreviewDto {
  /**
   * Chapter ID
   * @format int64
   * @example 1
   */
  id?: number;
  /**
   * Chapter title
   * @example "Getting Started"
   */
  title?: string;
  /**
   * Chapter description
   * @example "Introduction to Java basics"
   */
  description?: string;
  /**
   * Chapter order/position
   * @format int32
   * @example 1
   */
  orderIndex?: number;
  /**
   * Total number of lessons in chapter
   * @format int32
   * @example 5
   */
  totalLessons?: number;
  /**
   * Total duration in seconds
   * @format int32
   * @example 3600
   */
  totalDurationSeconds?: number;
  /**
   * Formatted total duration
   * @example "01:00:00"
   */
  formattedTotalDuration?: string;
  /** List of lessons (preview lessons are accessible) */
  lessons?: LessonPreviewDto[];
}

/** Public course preview information */
export interface CoursePreviewResponse {
  /**
   * Course ID
   * @format int64
   * @example 1
   */
  id?: number;
  /**
   * Course title
   * @example "Introduction to Java Programming"
   */
  title?: string;
  /**
   * Short description
   * @example "Learn Java from scratch"
   */
  shortDescription?: string;
  /**
   * Difficulty level
   * @example "BEGINNER"
   */
  difficulty?: "BEGINNER" | "INTERMEDIATE" | "ADVANCED";
  /**
   * Thumbnail URL
   * @example "https://example.com/images/java-course.jpg"
   */
  thumbnailUrl?: string;
  /**
   * SEO-friendly URL slug
   * @example "introduction-to-java-programming"
   */
  slug?: string;
  /** Category information */
  category?: CategoryDto;
  /** Teacher/instructor information */
  teacher?: TeacherDto;
  /**
   * List of tags
   * @example ["Java","Programming","Backend"]
   */
  tags?: string[];
  /** Published version information */
  publishedVersion?: PublishedVersionDto;
}

/** Lesson preview information */
export interface LessonPreviewDto {
  /**
   * Lesson ID
   * @format int64
   * @example 1
   */
  id?: number;
  /**
   * Lesson type
   * @example "VIDEO"
   */
  type?: "VIDEO" | "DOCUMENT" | "ASSIGNMENT" | "QUIZ" | "FINAL_EXAM";
  /**
   * Lesson title
   * @example "Introduction to Variables"
   */
  title?: string;
  /**
   * Short description
   * @example "Learn about variables in Java"
   */
  shortDescription?: string;
  /**
   * Video status
   * @example "READY"
   */
  videoStatus?: "UPLOADED" | "PROCESSING" | "READY" | "FAILED";
  /**
   * Duration in seconds
   * @format int32
   * @example 600
   */
  durationSeconds?: number;
  /**
   * Lesson order/position
   * @format int32
   * @example 1
   */
  orderIndex?: number;
  /**
   * Whether this lesson is available for preview without enrollment
   * @example true
   */
  isPreview?: boolean;
  /**
   * Whether the video is ready to play
   * @example true
   */
  isVideoReady?: boolean;
  /**
   * Formatted duration
   * @example "10:00"
   */
  formattedDuration?: string;
}

/** Published version details */
export interface PublishedVersionDto {
  /**
   * Version ID
   * @format int64
   * @example 10
   */
  id?: number;
  /**
   * Version number
   * @format int32
   * @example 1
   */
  versionNumber?: number;
  /**
   * Version title
   * @example "Introduction to Java Programming v1"
   */
  title?: string;
  /** Version description */
  description?: string;
  /**
   * Course price
   * @example 99.99
   */
  price?: number;
  /**
   * Course duration in days
   * @format int32
   * @example 30
   */
  durationDays?: number;
  /**
   * Published date
   * @format date-time
   */
  publishedAt?: string;
  /**
   * Total number of chapters
   * @format int32
   * @example 10
   */
  totalChapters?: number;
  /**
   * Total number of lessons
   * @format int32
   * @example 45
   */
  totalLessons?: number;
  /**
   * Total duration in seconds
   * @format int32
   * @example 18000
   */
  totalDurationSeconds?: number;
  /**
   * Number of preview lessons available
   * @format int32
   * @example 5
   */
  previewLessonsCount?: number;
  /** List of chapters (includes only preview lessons for non-enrolled users) */
  chapters?: ChapterPreviewDto[];
}

/** Teacher information */
export interface TeacherDto {
  /**
   * Teacher ID
   * @format int64
   * @example 5
   */
  id?: number;
  /**
   * Teacher name
   * @example "John Doe"
   */
  name?: string;
  /**
   * Teacher email
   * @example "john.doe@example.com"
   */
  email?: string;
  /**
   * Teacher bio
   * @example "Experienced Java developer with 10+ years"
   */
  bio?: string;
}

/** Course publication status response */
export interface CoursePublishedStatusResponse {
  /**
   * Whether the course has a published version
   * @example true
   */
  isPublished?: boolean;
}

/** Paginated response wrapper */
export interface PageResponseCourseReviewResponse {
  /** List of items in current page */
  items?: CourseReviewResponse[];
  /**
   * Current page number (0-indexed)
   * @format int32
   * @example 0
   */
  page?: number;
  /**
   * Number of items per page
   * @format int32
   * @example 10
   */
  size?: number;
  /**
   * Total number of items
   * @format int64
   * @example 100
   */
  totalItems?: number;
  /**
   * Total number of pages
   * @format int32
   * @example 10
   */
  totalPages?: number;
  /**
   * Whether there is a next page
   * @example true
   */
  hasNext?: boolean;
  /**
   * Whether there is a previous page
   * @example false
   */
  hasPrevious?: boolean;
}

/** Response DTO for course card (compact course info for listings) */
export interface CourseCardResponse {
  /**
   * Course ID
   * @format int64
   * @example 1
   */
  id?: number;
  /**
   * Course title
   * @example "Introduction to Java Programming"
   */
  title?: string;
  /**
   * Short description
   * @example "Learn Java from scratch"
   */
  shortDescription?: string;
  /**
   * Thumbnail URL
   * @example "https://example.com/images/java-course.jpg"
   */
  thumbnailUrl?: string;
  /**
   * SEO-friendly URL slug
   * @example "introduction-to-java-programming"
   */
  slug?: string;
  /**
   * Difficulty level
   * @example "BEGINNER"
   */
  difficulty?: "BEGINNER" | "INTERMEDIATE" | "ADVANCED";
  /**
   * Category name
   * @example "Programming"
   */
  categoryName?: string;
  /**
   * Teacher name
   * @example "Dr. John Smith"
   */
  teacherName?: string;
  /**
   * Teacher avatar URL
   * @example "https://example.com/avatars/john.jpg"
   */
  teacherAvatarUrl?: string;
  /**
   * Average rating (0.0 - 5.0)
   * @format double
   * @example 4.8
   */
  averageRating?: number;
  /**
   * Total number of reviews
   * @format int64
   * @example 95
   */
  totalReviews?: number;
  /**
   * Total number of enrolled students
   * @format int64
   * @example 150
   */
  totalStudents?: number;
  /**
   * Whether enrollment is closed
   * @example false
   */
  isClosed?: boolean;
}

/** Response DTO for course rating summary statistics */
export interface RatingSummaryResponse {
  /**
   * Course ID
   * @format int64
   * @example 1
   */
  courseId?: number;
  /**
   * Average rating score (0.0 - 5.0)
   * @format double
   * @example 4.5
   */
  averageRating?: number;
  /**
   * Total number of reviews
   * @format int64
   * @example 150
   */
  totalReviews?: number;
  /**
   * Number of 5-star ratings
   * @format int64
   * @example 100
   */
  fiveStarCount?: number;
  /**
   * Number of 4-star ratings
   * @format int64
   * @example 30
   */
  fourStarCount?: number;
  /**
   * Number of 3-star ratings
   * @format int64
   * @example 15
   */
  threeStarCount?: number;
  /**
   * Number of 2-star ratings
   * @format int64
   * @example 3
   */
  twoStarCount?: number;
  /**
   * Number of 1-star ratings
   * @format int64
   * @example 2
   */
  oneStarCount?: number;
}

export interface CertificateVerificationResponse {
  code?: string;
  studentName?: string;
  courseName?: string;
  /** @format date-time */
  issuedAt?: string;
  /** @format date-time */
  expiresAt?: string;
  isValid?: boolean;
  status?: string;
  /** @format float */
  finalScore?: number;
  grade?: string;
  isRevoked?: boolean;
  revokeReason?: string;
}

/** Paginated response wrapper */
export interface PageResponsePaymentTransactionResponse {
  /** List of items in current page */
  items?: PaymentTransactionResponse[];
  /**
   * Current page number (0-indexed)
   * @format int32
   * @example 0
   */
  page?: number;
  /**
   * Number of items per page
   * @format int32
   * @example 10
   */
  size?: number;
  /**
   * Total number of items
   * @format int64
   * @example 100
   */
  totalItems?: number;
  /**
   * Total number of pages
   * @format int32
   * @example 10
   */
  totalPages?: number;
  /**
   * Whether there is a next page
   * @example true
   */
  hasNext?: boolean;
  /**
   * Whether there is a previous page
   * @example false
   */
  hasPrevious?: boolean;
}

/** Payment statistics for a course */
export interface CoursePaymentStatsResponse {
  /**
   * Course ID
   * @format int64
   * @example 1
   */
  courseId?: number;
  /**
   * Course title
   * @example "Java Programming"
   */
  courseTitle?: string;
  /**
   * Teacher ID
   * @format int64
   * @example 10
   */
  teacherId?: number;
  /**
   * Teacher name
   * @example "Dr. John Smith"
   */
  teacherName?: string;
  /**
   * Total payment transactions
   * @format int64
   * @example 150
   */
  totalTransactions?: number;
  /**
   * Successful transactions
   * @format int64
   * @example 140
   */
  successfulTransactions?: number;
  /**
   * Failed transactions
   * @format int64
   * @example 8
   */
  failedTransactions?: number;
  /**
   * Refunded transactions
   * @format int64
   * @example 2
   */
  refundedTransactions?: number;
  /**
   * Total revenue
   * @example 41860000
   */
  totalRevenue?: number;
  /**
   * Total refunded amount
   * @example 598000
   */
  totalRefunded?: number;
  /**
   * Net revenue after refunds
   * @example 41262000
   */
  netRevenue?: number;
  /**
   * Teacher revenue after platform fee
   * @example 28883400
   */
  teacherRevenue?: number;
  /**
   * Platform revenue
   * @example 12378600
   */
  platformRevenue?: number;
  /**
   * Revenue share percentage
   * @format float
   * @example 70
   */
  revenueSharePercentage?: number;
}

export interface NotificationResponse {
  /** @format int64 */
  id?: number;
  type?: string;
  title?: string;
  content?: string;
  isRead?: boolean;
  referenceType?: string;
  referenceId?: string;
  deliveredAt?: string;
  createdAt?: string;
}

/** Paginated response wrapper */
export interface PageResponseNotificationResponse {
  /** List of items in current page */
  items?: NotificationResponse[];
  /**
   * Current page number (0-indexed)
   * @format int32
   * @example 0
   */
  page?: number;
  /**
   * Number of items per page
   * @format int32
   * @example 10
   */
  size?: number;
  /**
   * Total number of items
   * @format int64
   * @example 100
   */
  totalItems?: number;
  /**
   * Total number of pages
   * @format int32
   * @example 10
   */
  totalPages?: number;
  /**
   * Whether there is a next page
   * @example true
   */
  hasNext?: boolean;
  /**
   * Whether there is a previous page
   * @example false
   */
  hasPrevious?: boolean;
}

/** Response DTO for upload URL request */
export interface RequestUploadUrlResponse {
  /**
   * Pre-signed upload URL
   * @example "https://minio.example.com/bucket/upload?signature=..."
   */
  uploadUrl?: string;
  /**
   * Object key in storage
   * @example "videos/course-1/lesson-5/video.mp4"
   */
  objectKey?: string;
  /**
   * URL expiration time in seconds
   * @format int64
   * @example 3600
   */
  expiresInSeconds?: number;
}

/** Video streaming URL response */
export interface VideoStreamUrlResponse {
  /**
   * Video streaming URL
   * @example "https://cdn.example.com/videos/lesson-123/stream.m3u8"
   */
  streamUrl?: string;
}

/** Paginated response wrapper */
export interface PageResponseCommentResponse {
  /** List of items in current page */
  items?: {
    /** @format int64 */
    id?: number;
    user?: UserDto;
    content?: string;
    /** @format date-time */
    createdAt?: string;
    /** @format date-time */
    editedAt?: string;
    replies?: any[];
    isQuestion?: boolean;
    isAnswer?: boolean;
    isInstructorComment?: boolean;
    isAnswered?: boolean;
    /** @format int32 */
    upvoteCount?: number;
    /** @format int32 */
    replyCount?: number;
    isPublic?: boolean;
  }[];
  /**
   * Current page number (0-indexed)
   * @format int32
   * @example 0
   */
  page?: number;
  /**
   * Number of items per page
   * @format int32
   * @example 10
   */
  size?: number;
  /**
   * Total number of items
   * @format int64
   * @example 100
   */
  totalItems?: number;
  /**
   * Total number of pages
   * @format int32
   * @example 10
   */
  totalPages?: number;
  /**
   * Whether there is a next page
   * @example true
   */
  hasNext?: boolean;
  /**
   * Whether there is a previous page
   * @example false
   */
  hasPrevious?: boolean;
}

/** File download URL response */
export interface FileDownloadUrlResponse {
  /**
   * Presigned download URL (valid for limited time)
   * @example "https://storage.example.com/files/document.pdf?signature=abc123&expires=1234567890"
   */
  downloadUrl?: string;
  /**
   * URL expiry time in seconds
   * @format int32
   * @example 3600
   */
  expirySeconds?: number;
}

export interface FinalExamEligibilityResponse {
  /** @format int64 */
  enrollmentId?: number;
  isEligible?: boolean;
  reason?: string;
  /** @format float */
  currentProgress?: number;
  /** @format float */
  requiredProgress?: number;
  /** @format int32 */
  completedLessons?: number;
  /** @format int32 */
  totalLessons?: number;
}

/** Course progress statistics for teacher */
export interface CourseProgressStatsResponse {
  /**
   * Course ID
   * @format int64
   * @example 1
   */
  courseId?: number;
  /**
   * Course title
   * @example "Java Spring Boot"
   */
  courseTitle?: string;
  /**
   * Total enrolled students
   * @format int32
   * @example 100
   */
  totalEnrolledStudents?: number;
  /**
   * Students with progress
   * @format int32
   * @example 85
   */
  studentsWithProgress?: number;
  /**
   * Students completed
   * @format int32
   * @example 30
   */
  studentsCompleted?: number;
  /**
   * Average completion percentage
   * @format float
   * @example 45.5
   */
  averageCompletionPercentage?: number;
  /**
   * Average score
   * @format float
   * @example 7.8
   */
  averageScore?: number;
  /**
   * Most completed lesson ID
   * @format int64
   * @example 1
   */
  mostCompletedLessonId?: number;
  /**
   * Most completed lesson title
   * @example "Introduction"
   */
  mostCompletedLessonTitle?: string;
  /**
   * Least completed lesson ID
   * @format int64
   * @example 50
   */
  leastCompletedLessonId?: number;
  /**
   * Least completed lesson title
   * @example "Advanced Topics"
   */
  leastCompletedLessonTitle?: string;
}

/** Enrollment statistics */
export interface EnrollmentStatsResponse {
  /**
   * Total enrollments
   * @format int64
   * @example 100
   */
  totalEnrollments?: number;
  /**
   * Active enrollments
   * @format int64
   * @example 80
   */
  activeEnrollments?: number;
  /**
   * Completed enrollments
   * @format int64
   * @example 15
   */
  completedEnrollments?: number;
  /**
   * Cancelled enrollments
   * @format int64
   * @example 3
   */
  cancelledEnrollments?: number;
  /**
   * Expired enrollments
   * @format int64
   * @example 2
   */
  expiredEnrollments?: number;
  /**
   * Completion rate
   * @format double
   * @example 75
   */
  completionRate?: number;
  /**
   * Average completion percentage
   * @format double
   * @example 68.5
   */
  averageCompletionPercentage?: number;
  /**
   * Average score
   * @format double
   * @example 7.8
   */
  averageScore?: number;
  /**
   * Certificates issued
   * @format int64
   * @example 12
   */
  certificatesIssued?: number;
}

export interface CommentStatisticsResponse {
  /** @format int64 */
  totalQuestions?: number;
  /** @format int64 */
  answeredQuestions?: number;
  /** @format int64 */
  unansweredQuestions?: number;
  /** @format int64 */
  totalReplies?: number;
  /** @format int64 */
  instructorReplies?: number;
  responseRate?: number;
  /** @format double */
  averageResponseTimeHours?: number;
  /** @format int64 */
  totalUpvotes?: number;
  /** @format double */
  averageUpvotesPerQuestion?: number;
}

/** Paginated response wrapper */
export interface PageResponseCourseVersionResponse {
  /** List of items in current page */
  items?: CourseVersionResponse[];
  /**
   * Current page number (0-indexed)
   * @format int32
   * @example 0
   */
  page?: number;
  /**
   * Number of items per page
   * @format int32
   * @example 10
   */
  size?: number;
  /**
   * Total number of items
   * @format int64
   * @example 100
   */
  totalItems?: number;
  /**
   * Total number of pages
   * @format int32
   * @example 10
   */
  totalPages?: number;
  /**
   * Whether there is a next page
   * @example true
   */
  hasNext?: boolean;
  /**
   * Whether there is a previous page
   * @example false
   */
  hasPrevious?: boolean;
}

/** Response DTO for category statistics */
export interface CategoryStatsResponse {
  /**
   * Category ID
   * @format int64
   * @example 1
   */
  id?: number;
  /**
   * Category name
   * @example "Programming"
   */
  name?: string;
  /**
   * Category code
   * @example "PROG"
   */
  code?: string;
  /**
   * SEO-friendly URL slug
   * @example "programming"
   */
  slug?: string;
  /**
   * Total number of courses in this category
   * @format int64
   * @example 50
   */
  courseCount?: number;
  /**
   * Number of active (enrolled) students across all courses
   * @format int64
   * @example 1200
   */
  activeStudentCount?: number;
  /**
   * Total number of students (including completed) across all courses
   * @format int64
   * @example 1500
   */
  totalStudentCount?: number;
  /**
   * Whether the category is visible
   * @example true
   */
  visible?: boolean;
  /**
   * Parent category ID if this is a subcategory
   * @format int64
   * @example null
   */
  parentId?: number;
}

/** Response DTO for current user profile information */
export interface MeResponse {
  /**
   * Account ID
   * @format int64
   * @example 123
   */
  accountId?: number;
  /**
   * Username
   * @example "john_doe"
   */
  username?: string;
  /**
   * Email address
   * @example "john.doe@example.com"
   */
  email?: string;
  /**
   * Full name
   * @example "John Doe"
   */
  fullName?: string;
  /**
   * Account status
   * @example "ACTIVE"
   */
  status?:
    | "PENDING_EMAIL"
    | "PENDING_APPROVAL"
    | "ACTIVE"
    | "REJECTED"
    | "SUSPENDED"
    | "DEACTIVATED";
  /**
   * Avatar URL
   * @example "https://example.com/avatars/john.jpg"
   */
  avatarUrl?: string;
  /**
   * User role
   * @example "STUDENT"
   */
  role?: "STUDENT" | "TEACHER" | "ADMIN";
  /**
   * Birthday
   * @format date
   * @example "1990-01-15"
   */
  birthday?: string;
  /**
   * Biography
   * @example "Software developer passionate about learning"
   */
  bio?: string;
  /**
   * Gender
   * @example "MALE"
   */
  gender?: "MALE" | "FEMALE" | "OTHER";
  /**
   * Last login timestamp
   * @format date-time
   * @example "2025-11-30T10:15:30Z"
   */
  lastLoginAt?: string;
}

export interface DashboardStatisticsResponse {
  revenueTrend?: TimeSeriesItem[];
  userGrowth?: TimeSeriesItem[];
  courseCompletion?: TimeSeriesItem[];
}

export interface TimeSeriesItem {
  label?: string;
  /** @format double */
  value?: number;
}

/** Paginated response wrapper */
export interface PageResponseRevenueShareConfigResponse {
  /** List of items in current page */
  items?: RevenueShareConfigResponse[];
  /**
   * Current page number (0-indexed)
   * @format int32
   * @example 0
   */
  page?: number;
  /**
   * Number of items per page
   * @format int32
   * @example 10
   */
  size?: number;
  /**
   * Total number of items
   * @format int64
   * @example 100
   */
  totalItems?: number;
  /**
   * Total number of pages
   * @format int32
   * @example 10
   */
  totalPages?: number;
  /**
   * Whether there is a next page
   * @example true
   */
  hasNext?: boolean;
  /**
   * Whether there is a previous page
   * @example false
   */
  hasPrevious?: boolean;
}

export interface UserReportResponse {
  /** @format int64 */
  totalUsers?: number;
  /** @format int64 */
  newUsers?: number;
  /** @format int64 */
  activeUsers?: number;
}

export interface ReportPeriodRequest {
  period?:
    | "TODAY"
    | "THIS_WEEK"
    | "THIS_MONTH"
    | "THIS_QUARTER"
    | "THIS_YEAR"
    | "CUSTOM";
  /** @format date */
  from?: string;
  /** @format date */
  to?: string;
}

export interface RevenueReportResponse {
  period?: string;
  /** @format int64 */
  totalRevenue?: number;
  /** @format int64 */
  totalTransactions?: number;
}

export interface CourseReportResponse {
  /** @format int64 */
  totalCourses?: number;
  /** @format double */
  avgCompletionRate?: number;
  /** @format double */
  avgScore?: number;
}

export interface RecommendationStatsDto {
  /** @format int64 */
  totalRecommendations?: number;
  /** @format int64 */
  totalFeedback?: number;
  feedbackDistribution?: Record<string, number>;
  /** @format double */
  feedbackRate?: number;
  /** @format int64 */
  enrolledFromRecommendations?: number;
}

/** Paginated response wrapper */
export interface PageResponsePayoutResponse {
  /** List of items in current page */
  items?: PayoutResponse[];
  /**
   * Current page number (0-indexed)
   * @format int32
   * @example 0
   */
  page?: number;
  /**
   * Number of items per page
   * @format int32
   * @example 10
   */
  size?: number;
  /**
   * Total number of items
   * @format int64
   * @example 100
   */
  totalItems?: number;
  /**
   * Total number of pages
   * @format int32
   * @example 10
   */
  totalPages?: number;
  /**
   * Whether there is a next page
   * @example true
   */
  hasNext?: boolean;
  /**
   * Whether there is a previous page
   * @example false
   */
  hasPrevious?: boolean;
}

export interface DashboardResponse {
  /** @format int64 */
  totalRevenue?: number;
  /** @format int64 */
  totalStudents?: number;
  /** @format int64 */
  totalCourses?: number;
  /** @format double */
  avgCompletionRate?: number;
  /** @format double */
  avgScore?: number;
  /** @format int64 */
  activeTeachers?: number;
}

export interface AuditLogResponse {
  /** @format int64 */
  id?: number;
  tableName?: string;
  recordId?: string;
  action?: "INSERT" | "UPDATE" | "DELETE" | "RESTORE";
  changedData?: string;
  /** @format int64 */
  userAccountId?: number;
  ipAddress?: string;
  /** @format date-time */
  createdAt?: string;
}

/** Paginated response wrapper */
export interface PageResponseAuditLogResponse {
  /** List of items in current page */
  items?: AuditLogResponse[];
  /**
   * Current page number (0-indexed)
   * @format int32
   * @example 0
   */
  page?: number;
  /**
   * Number of items per page
   * @format int32
   * @example 10
   */
  size?: number;
  /**
   * Total number of items
   * @format int64
   * @example 100
   */
  totalItems?: number;
  /**
   * Total number of pages
   * @format int32
   * @example 10
   */
  totalPages?: number;
  /**
   * Whether there is a next page
   * @example true
   */
  hasNext?: boolean;
  /**
   * Whether there is a previous page
   * @example false
   */
  hasPrevious?: boolean;
}

/** Response DTO for account information */
export interface AccountResponse {
  /**
   * Account ID
   * @format int64
   * @example 123
   */
  accountId?: number;
  /**
   * Username
   * @example "john_doe"
   */
  username?: string;
  /**
   * Email address
   * @example "john.doe@example.com"
   */
  email?: string;
  /**
   * User role
   * @example "STUDENT"
   */
  role?: "STUDENT" | "TEACHER" | "ADMIN";
  /**
   * Account status
   * @example "ACTIVE"
   */
  status?:
    | "PENDING_EMAIL"
    | "PENDING_APPROVAL"
    | "ACTIVE"
    | "REJECTED"
    | "SUSPENDED"
    | "DEACTIVATED";
  /**
   * Avatar URL
   * @example "https://example.com/avatars/john.jpg"
   */
  avatarUrl?: string;
  /**
   * Last login timestamp
   * @format date-time
   * @example "2025-11-30T10:15:30Z"
   */
  lastLoginAt?: string;
  /**
   * Account creation timestamp
   * @format date-time
   * @example "2025-11-01T08:00:00Z"
   */
  createdAt?: string;
}

/** Paginated response wrapper */
export interface PageResponseAccountResponse {
  /** List of items in current page */
  items?: AccountResponse[];
  /**
   * Current page number (0-indexed)
   * @format int32
   * @example 0
   */
  page?: number;
  /**
   * Number of items per page
   * @format int32
   * @example 10
   */
  size?: number;
  /**
   * Total number of items
   * @format int64
   * @example 100
   */
  totalItems?: number;
  /**
   * Total number of pages
   * @format int32
   * @example 10
   */
  totalPages?: number;
  /**
   * Whether there is a next page
   * @example true
   */
  hasNext?: boolean;
  /**
   * Whether there is a previous page
   * @example false
   */
  hasPrevious?: boolean;
}

/** Response DTO for account action log */
export interface AccountActionLogResponse {
  /**
   * Log ID
   * @format int64
   * @example 1
   */
  id?: number;
  /**
   * Type of action performed
   * @example "ACCOUNT_APPROVED"
   */
  actionType?:
    | "APPROVE"
    | "REJECT"
    | "SUSPEND"
    | "UNLOCK"
    | "DEACTIVATE"
    | "UNKNOWN";
  /**
   * Reason for the action
   * @example "Documents verified successfully"
   */
  reason?: string;
  /**
   * Previous account status
   * @example "PENDING"
   */
  oldStatus?: string;
  /**
   * New account status
   * @example "ACTIVE"
   */
  newStatus?: string;
  /**
   * Creation timestamp
   * @format date-time
   * @example "2025-11-30T10:15:30Z"
   */
  createdAt?: string;
  /**
   * Last update timestamp
   * @format date-time
   * @example "2025-11-30T10:15:30Z"
   */
  updatedAt?: string;
  /**
   * Username who performed the action
   * @example "admin_user"
   */
  performedByUsername?: string;
  /**
   * IP address of the action performer
   * @example "192.168.1.1"
   */
  ipAddress?: string;
}

/** Paginated response wrapper */
export interface PageResponseAccountActionLogResponse {
  /** List of items in current page */
  items?: AccountActionLogResponse[];
  /**
   * Current page number (0-indexed)
   * @format int32
   * @example 0
   */
  page?: number;
  /**
   * Number of items per page
   * @format int32
   * @example 10
   */
  size?: number;
  /**
   * Total number of items
   * @format int64
   * @example 100
   */
  totalItems?: number;
  /**
   * Total number of pages
   * @format int32
   * @example 10
   */
  totalPages?: number;
  /**
   * Whether there is a next page
   * @example true
   */
  hasNext?: boolean;
  /**
   * Whether there is a previous page
   * @example false
   */
  hasPrevious?: boolean;
}
