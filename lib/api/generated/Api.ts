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

import {
  AccountActionRequest,
  AccountProfileResponse,
  AddQuestionsRequest,
  AnswerOptionRequest,
  ApiResponseObject,
  ApproveTeacherRequest,
  AssignmentRequest,
  AssignmentResponse,
  BulkTagRequest,
  CancelEnrollmentRequest,
  CategoryRequest,
  CategoryResponseDto,
  CategoryStatsResponse,
  CertificateDetailResponse,
  CertificateResponse,
  CertificateVerificationResponse,
  ChangePasswordDTO,
  ChapterDto,
  ChapterReorderRequest,
  ChapterRequest,
  CommentCreateRequest,
  CommentResponse,
  CommentStatisticsResponse,
  CompletePayoutRequest,
  CourseCardResponse,
  CourseDetailResponse,
  CoursePaymentStatsResponse,
  CoursePreviewResponse,
  CourseProgressResponse,
  CourseProgressStatsResponse,
  CoursePublishedStatusResponse,
  CourseReportResponse,
  CourseRequest,
  CourseReviewRequest,
  CourseReviewResponse,
  CourseStatsResponse,
  CourseUpdateRequest,
  CourseVersionRequest,
  CourseVersionResponse,
  CreateLessonRequest,
  CreatePaymentRequest,
  CreatePayoutRequest,
  CreateRevenueShareConfigRequest,
  DashboardResponse,
  DashboardStatisticsResponse,
  EnrollCourseRequest,
  EnrollmentDetailResponse,
  EnrollmentStatsResponse,
  FeedbackSubmissionRequest,
  FileDownloadUrlResponse,
  FileStorageResponse,
  FinalExamEligibilityResponse,
  ForgotPasswordDTO,
  GradeSubmissionRequest,
  ImportResultResponse,
  LessonDTO,
  LessonProgressResponse,
  LessonResourceRequest,
  LessonResourceResponse,
  MeResponse,
  MonthlyRevenueResponse,
  NotificationChannel,
  NotificationChannelCreateRequest,
  NotificationResponse,
  Pageable,
  PageResponseAccountActionLogResponse,
  PageResponseAccountResponse,
  PageResponseAuditLogResponse,
  PageResponseCertificateResponse,
  PageResponseCommentResponse,
  PageResponseCourseResponse,
  PageResponseCourseReviewResponse,
  PageResponseCourseVersionResponse,
  PageResponseEnrollmentResponse,
  PageResponseNotificationResponse,
  PageResponsePaymentTransactionResponse,
  PageResponsePayoutResponse,
  PageResponseRevenueShareConfigResponse,
  PageResponseStudentCertificateResponse,
  PageResponseStudentCourseResponse,
  PageResponseStudentResponse,
  PageResponseTag,
  PageResponseViolationReportResponse,
  PaymentTransactionResponse,
  PaymentUrlResponse,
  PayoutResponse,
  PreviewVideoUrlResponse,
  PublicTeacherProfileResponse,
  QuestionBankRequest,
  QuestionBankResponse,
  QuestionRequest,
  QuestionResponse,
  QuizAttemptResponse,
  QuizEligibilityResponse,
  QuizQuestionResponse,
  QuizRequest,
  QuizResponse,
  QuizStatisticsResponse,
  RatingSummaryResponse,
  RecommendationFeedbackRequest,
  RecommendationLogDto,
  RecommendationStatsDto,
  RefundRequest,
  RegisterRequest,
  RegisterResponse,
  RejectPayoutRequest,
  RejectRequest,
  RejectTeacherRequest,
  ReorderLessonsRequest,
  ReorderResourcesRequest,
  ReportPeriodRequest,
  ReqLoginDTO,
  ReqRefreshTokenDTO,
  RequestUploadUrlResponse,
  ResendVerifyEmailRequest,
  ResetPasswordDTO,
  ResLoginDTO,
  RevenueBreakdownResponse,
  RevenueReportResponse,
  RevenueShareConfigResponse,
  SendBulkNotificationRequest,
  SocialLoginRequest,
  StudentDetailResponse,
  StudentProgressOverviewResponse,
  StudentProgressResponse,
  SubmissionResponse,
  SubmitAnswerRequest,
  SystemSettingRequest,
  SystemSettingResponse,
  Tag,
  TagRequest,
  TagResponseDto,
  TagStatsResponse,
  TeacherDetailResponse,
  TeacherRevenueResponse,
  TeacherStatsResponse,
  UpdateLessonRequest,
  UpdateProfileRequest,
  UpdateRevenueShareConfigRequest,
  UpdateScoreRequest,
  UpdateStatusRequest,
  UpdateStudentRequest,
  UpdateTeacherRequest,
  UpdateVideoRequest,
  UpdateWatchedDurationRequest,
  UploadAvatarResponse,
  UserDto,
  UserReportResponse,
  VideoStreamUrlResponse,
  ViolationReportCreateRequest,
  ViolationReportDetailResponse,
  ViolationReportDismissRequest,
  ViolationReportReviewRequest,
  ViolationReportTakeActionRequest,
} from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class Api<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * @description Retrieve detailed information about a teacher by their ID. Teachers can only view their own profile, students can view approved teachers, and admins can view any teacher.
   *
   * @tags Teacher Management
   * @name GetTeacherById
   * @summary Get teacher by ID
   * @request GET:/api/v1/teachers/{id}
   * @secure
   */
  getTeacherById = (id: number, params: RequestParams = {}) =>
    this.request<TeacherDetailResponse, any>({
      path: `/api/v1/teachers/${id}`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * @description Update teacher profile information including specialty, degree, and personal details. Teachers can only update their own profile, admins can update any teacher.
   *
   * @tags Teacher Management
   * @name UpdateTeacher
   * @summary Update teacher information
   * @request PUT:/api/v1/teachers/{id}
   * @secure
   */
  updateTeacher = (
    id: number,
    data: UpdateTeacherRequest,
    params: RequestParams = {},
  ) =>
    this.request<TeacherDetailResponse, any>({
      path: `/api/v1/teachers/${id}`,
      method: "PUT",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description Soft delete a teacher account by setting it to DEACTIVATED status. Only accessible by admins.
   *
   * @tags Teacher Management
   * @name DeleteTeacher
   * @summary Delete teacher
   * @request DELETE:/api/v1/teachers/{id}
   * @secure
   */
  deleteTeacher = (id: number, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/v1/teachers/${id}`,
      method: "DELETE",
      secure: true,
      ...params,
    });
  /**
   * @description Upload a new avatar image for a teacher. Teachers can only upload their own avatar. Accepts JPG, PNG, and WEBP formats.
   *
   * @tags Teacher Management
   * @name UploadAvatar
   * @summary Upload teacher avatar
   * @request PUT:/api/v1/teachers/{id}/avatar
   * @secure
   */
  uploadAvatar = (
    id: number,
    data: {
      /**
       * Avatar image file (JPG, PNG, WEBP)
       * @format binary
       */
      file: File;
    },
    params: RequestParams = {},
  ) =>
    this.request<UploadAvatarResponse, any>({
      path: `/api/v1/teachers/${id}/avatar`,
      method: "PUT",
      body: data,
      secure: true,
      type: ContentType.FormData,
      ...params,
    });
  /**
   * @description Update course information (Teacher only)
   *
   * @tags Course Management
   * @name UpdateCourse
   * @summary Update a course
   * @request PUT:/api/v1/teacher/courses/{id}
   * @secure
   */
  updateCourse = (
    id: number,
    data: CourseUpdateRequest,
    params: RequestParams = {},
  ) =>
    this.request<CourseDetailResponse, any>({
      path: `/api/v1/teacher/courses/${id}`,
      method: "PUT",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description Soft delete a course (Teacher only)
   *
   * @tags Course Management
   * @name DeleteCourse
   * @summary Delete a course
   * @request DELETE:/api/v1/teacher/courses/{id}
   * @secure
   */
  deleteCourse = (id: number, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/v1/teacher/courses/${id}`,
      method: "DELETE",
      secure: true,
      ...params,
    });
  /**
   * @description Update tag information (Admin only)
   *
   * @tags Tag Management
   * @name UpdateTag
   * @summary Update a tag
   * @request PUT:/api/v1/tags/{id}
   * @secure
   */
  updateTag = (id: number, data: TagRequest, params: RequestParams = {}) =>
    this.request<Tag, any>({
      path: `/api/v1/tags/${id}`,
      method: "PUT",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description Soft delete a tag (Admin only)
   *
   * @tags Tag Management
   * @name DeleteTag
   * @summary Delete a tag
   * @request DELETE:/api/v1/tags/{id}
   * @secure
   */
  deleteTag = (id: number, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/v1/tags/${id}`,
      method: "DELETE",
      secure: true,
      ...params,
    });
  /**
   * @description Update the content of a submission before it has been graded. Only accessible by students.
   *
   * @tags Submission Management
   * @name UpdateSubmissionContent
   * @summary Update submission content
   * @request PUT:/api/v1/submissions/{id}/content
   * @secure
   */
  updateSubmissionContent = (
    id: number,
    data: string,
    params: RequestParams = {},
  ) =>
    this.request<SubmissionResponse, any>({
      path: `/api/v1/submissions/${id}/content`,
      method: "PUT",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description Retrieve detailed information about a student by their ID. Students can only view their own profile, teachers can view students in their courses, and admins can view any student.
   *
   * @tags Student Management
   * @name GetStudentById
   * @summary Get student by ID
   * @request GET:/api/v1/students/{id}
   * @secure
   */
  getStudentById = (id: number, params: RequestParams = {}) =>
    this.request<StudentDetailResponse, any>({
      path: `/api/v1/students/${id}`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * @description Update student profile information. Students can only update their own profile, admins can update any student.
   *
   * @tags Student Management
   * @name UpdateStudent
   * @summary Update student information
   * @request PUT:/api/v1/students/{id}
   * @secure
   */
  updateStudent = (
    id: number,
    data: UpdateStudentRequest,
    params: RequestParams = {},
  ) =>
    this.request<StudentDetailResponse, any>({
      path: `/api/v1/students/${id}`,
      method: "PUT",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description Soft delete a student account by setting its status to DEACTIVATED. This action is reversible. Only accessible by administrators.
   *
   * @tags Student Management
   * @name DeleteStudent
   * @summary Delete student (Admin only)
   * @request DELETE:/api/v1/students/{id}
   * @secure
   */
  deleteStudent = (id: number, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/v1/students/${id}`,
      method: "DELETE",
      secure: true,
      ...params,
    });
  /**
   * @description Upload a new avatar image for a student. Students can only upload their own avatar. Accepts JPG, PNG, and WEBP formats.
   *
   * @tags Student Management
   * @name UploadAvatar1
   * @summary Upload student avatar
   * @request PUT:/api/v1/students/{id}/avatar
   * @secure
   */
  uploadAvatar1 = (
    id: number,
    data: {
      /**
       * Avatar image file (JPG, PNG, WEBP)
       * @format binary
       */
      file: File;
    },
    params: RequestParams = {},
  ) =>
    this.request<UploadAvatarResponse, any>({
      path: `/api/v1/students/${id}/avatar`,
      method: "PUT",
      body: data,
      secure: true,
      type: ContentType.FormData,
      ...params,
    });
  /**
   * @description Retrieve detailed information about a specific quiz including its questions.
   *
   * @tags Quiz Management
   * @name GetQuiz
   * @summary Get quiz by ID
   * @request GET:/api/v1/quizzes/{id}
   * @secure
   */
  getQuiz = (id: number, params: RequestParams = {}) =>
    this.request<QuizResponse, any>({
      path: `/api/v1/quizzes/${id}`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * @description Update an existing quiz's settings and details. Only accessible by teachers.
   *
   * @tags Quiz Management
   * @name UpdateQuiz
   * @summary Update a quiz
   * @request PUT:/api/v1/quizzes/{id}
   * @secure
   */
  updateQuiz = (id: number, data: QuizRequest, params: RequestParams = {}) =>
    this.request<QuizResponse, any>({
      path: `/api/v1/quizzes/${id}`,
      method: "PUT",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description Delete a quiz and all its associated attempts and submissions. Only accessible by teachers.
   *
   * @tags Quiz Management
   * @name DeleteQuiz
   * @summary Delete a quiz
   * @request DELETE:/api/v1/quizzes/{id}
   * @secure
   */
  deleteQuiz = (id: number, params: RequestParams = {}) =>
    this.request<object, any>({
      path: `/api/v1/quizzes/${id}`,
      method: "DELETE",
      secure: true,
      ...params,
    });
  /**
   * @description Update the time limit (in minutes) allowed for completing the quiz. Only accessible by teachers.
   *
   * @tags Quiz Management
   * @name UpdateTimeLimit
   * @summary Update quiz time limit
   * @request PUT:/api/v1/quizzes/{id}/time-limit
   * @secure
   */
  updateTimeLimit = (
    id: number,
    query: {
      /**
       * Time limit in minutes
       * @format int32
       * @example 60
       */
      timeLimitMinutes: number;
    },
    params: RequestParams = {},
  ) =>
    this.request<QuizResponse, any>({
      path: `/api/v1/quizzes/${id}/time-limit`,
      method: "PUT",
      query: query,
      secure: true,
      ...params,
    });
  /**
   * @description Change the order of questions in a quiz by providing an ordered list of question IDs. Only accessible by teachers.
   *
   * @tags Quiz Management
   * @name ReorderQuestions
   * @summary Reorder quiz questions
   * @request PUT:/api/v1/quizzes/{id}/reorder-questions
   * @secure
   */
  reorderQuestions = (id: number, data: number[], params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/v1/quizzes/${id}/reorder-questions`,
      method: "PUT",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description Update the minimum score required to pass the quiz. Only accessible by teachers.
   *
   * @tags Quiz Management
   * @name UpdatePassingScore
   * @summary Update quiz passing score
   * @request PUT:/api/v1/quizzes/{id}/passing-score
   * @secure
   */
  updatePassingScore = (
    id: number,
    query: {
      /**
       * Passing score
       * @format double
       * @example 70
       */
      passingScore: number;
    },
    params: RequestParams = {},
  ) =>
    this.request<QuizResponse, any>({
      path: `/api/v1/quizzes/${id}/passing-score`,
      method: "PUT",
      query: query,
      secure: true,
      ...params,
    });
  /**
   * @description Update the maximum number of attempts allowed for students to take the quiz. Only accessible by teachers.
   *
   * @tags Quiz Management
   * @name UpdateMaxAttempts
   * @summary Update max attempts
   * @request PUT:/api/v1/quizzes/{id}/max-attempts
   * @secure
   */
  updateMaxAttempts = (
    id: number,
    query: {
      /**
       * Maximum number of attempts
       * @format int32
       * @example 3
       */
      maxAttempts: number;
    },
    params: RequestParams = {},
  ) =>
    this.request<QuizResponse, any>({
      path: `/api/v1/quizzes/${id}/max-attempts`,
      method: "PUT",
      query: query,
      secure: true,
      ...params,
    });
  /**
   * @description Retrieve detailed information about a specific question including its answer options. Only accessible by teachers.
   *
   * @tags Question Management
   * @name GetQuestion
   * @summary Get question by ID
   * @request GET:/api/v1/questions/{id}
   * @secure
   */
  getQuestion = (id: number, params: RequestParams = {}) =>
    this.request<QuestionResponse, any>({
      path: `/api/v1/questions/${id}`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * @description Update an existing question's content and details. Only accessible by teachers.
   *
   * @tags Question Management
   * @name UpdateQuestion
   * @summary Update a question
   * @request PUT:/api/v1/questions/{id}
   * @secure
   */
  updateQuestion = (
    id: number,
    data: QuestionRequest,
    params: RequestParams = {},
  ) =>
    this.request<QuestionResponse, any>({
      path: `/api/v1/questions/${id}`,
      method: "PUT",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description Delete a question and all its associated answer options. Only accessible by teachers.
   *
   * @tags Question Management
   * @name DeleteQuestion
   * @summary Delete a question
   * @request DELETE:/api/v1/questions/{id}
   * @secure
   */
  deleteQuestion = (id: number, params: RequestParams = {}) =>
    this.request<object, any>({
      path: `/api/v1/questions/${id}`,
      method: "DELETE",
      secure: true,
      ...params,
    });
  /**
   * @description Update the maximum points that can be earned for a question. Only accessible by teachers.
   *
   * @tags Question Management
   * @name UpdateMaxPoints
   * @summary Update question max points
   * @request PUT:/api/v1/questions/{id}/max-points
   * @secure
   */
  updateMaxPoints = (
    id: number,
    query: {
      /**
       * New maximum points value
       * @format double
       * @example 10
       */
      maxPoints: number;
    },
    params: RequestParams = {},
  ) =>
    this.request<QuestionResponse, any>({
      path: `/api/v1/questions/${id}/max-points`,
      method: "PUT",
      query: query,
      secure: true,
      ...params,
    });
  /**
   * @description Retrieve detailed information about a specific question bank. Only accessible by teachers.
   *
   * @tags Question Bank Management
   * @name GetQuestionBank
   * @summary Get question bank by ID
   * @request GET:/api/v1/question-banks/{id}
   * @secure
   */
  getQuestionBank = (id: number, params: RequestParams = {}) =>
    this.request<QuestionBankResponse, any>({
      path: `/api/v1/question-banks/${id}`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * @description Update an existing question bank's information. Only accessible by teachers.
   *
   * @tags Question Bank Management
   * @name UpdateQuestionBank
   * @summary Update a question bank
   * @request PUT:/api/v1/question-banks/{id}
   * @secure
   */
  updateQuestionBank = (
    id: number,
    data: QuestionBankRequest,
    params: RequestParams = {},
  ) =>
    this.request<QuestionBankResponse, any>({
      path: `/api/v1/question-banks/${id}`,
      method: "PUT",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description Delete a question bank and all its associated questions. Only accessible by teachers.
   *
   * @tags Question Bank Management
   * @name DeleteQuestionBank
   * @summary Delete a question bank
   * @request DELETE:/api/v1/question-banks/{id}
   * @secure
   */
  deleteQuestionBank = (id: number, params: RequestParams = {}) =>
    this.request<object, any>({
      path: `/api/v1/question-banks/${id}`,
      method: "DELETE",
      secure: true,
      ...params,
    });
  /**
   * @description Retrieve detailed information about a specific resource
   *
   * @tags Lesson Resource Management
   * @name GetResourceById
   * @summary Get resource details
   * @request GET:/api/v1/lessons/{lessonId}/resources/{resourceId}
   * @secure
   */
  getResourceById = (
    lessonId: number,
    resourceId: number,
    params: RequestParams = {},
  ) =>
    this.request<LessonResourceResponse, any>({
      path: `/api/v1/lessons/${lessonId}/resources/${resourceId}`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * @description Update resource information (title, description, URL, etc.). Only accessible by teachers.
   *
   * @tags Lesson Resource Management
   * @name UpdateResource
   * @summary Update resource
   * @request PUT:/api/v1/lessons/{lessonId}/resources/{resourceId}
   * @secure
   */
  updateResource = (
    lessonId: number,
    resourceId: number,
    data: LessonResourceRequest,
    params: RequestParams = {},
  ) =>
    this.request<LessonResourceResponse, any>({
      path: `/api/v1/lessons/${lessonId}/resources/${resourceId}`,
      method: "PUT",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description Delete a resource from the lesson. Only accessible by teachers.
   *
   * @tags Lesson Resource Management
   * @name DeleteResource
   * @summary Delete resource
   * @request DELETE:/api/v1/lessons/{lessonId}/resources/{resourceId}
   * @secure
   */
  deleteResource = (
    lessonId: number,
    resourceId: number,
    params: RequestParams = {},
  ) =>
    this.request<void, any>({
      path: `/api/v1/lessons/${lessonId}/resources/${resourceId}`,
      method: "DELETE",
      secure: true,
      ...params,
    });
  /**
   * @description Replace the file for a FILE type resource. Only accessible by teachers.
   *
   * @tags Lesson Resource Management
   * @name ReplaceResourceFile
   * @summary Replace resource file
   * @request PUT:/api/v1/lessons/{lessonId}/resources/{resourceId}/file
   * @secure
   */
  replaceResourceFile = (
    lessonId: number,
    resourceId: number,
    data: {
      /**
       * New file to upload
       * @format binary
       */
      file: File;
    },
    params: RequestParams = {},
  ) =>
    this.request<LessonResourceResponse, any>({
      path: `/api/v1/lessons/${lessonId}/resources/${resourceId}/file`,
      method: "PUT",
      body: data,
      secure: true,
      type: ContentType.FormData,
      ...params,
    });
  /**
   * @description Retrieve detailed information about a specific lesson
   *
   * @tags Lesson Management
   * @name GetLessonById
   * @summary Get lesson details
   * @request GET:/api/v1/lessons/{id}
   * @secure
   */
  getLessonById = (id: number, params: RequestParams = {}) =>
    this.request<LessonDTO, any>({
      path: `/api/v1/lessons/${id}`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * @description Update lesson information. Only accessible by teachers.
   *
   * @tags Lesson Management
   * @name UpdateLesson
   * @summary Update lesson
   * @request PUT:/api/v1/lessons/{id}
   * @secure
   */
  updateLesson = (
    id: number,
    data: UpdateLessonRequest,
    params: RequestParams = {},
  ) =>
    this.request<LessonDTO, any>({
      path: `/api/v1/lessons/${id}`,
      method: "PUT",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description Delete a lesson and its associated resources. Only accessible by teachers.
   *
   * @tags Lesson Management
   * @name DeleteLesson
   * @summary Delete lesson
   * @request DELETE:/api/v1/lessons/{id}
   * @secure
   */
  deleteLesson = (id: number, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/v1/lessons/${id}`,
      method: "DELETE",
      secure: true,
      ...params,
    });
  /**
   * @description Get details of a specific course version (Teacher or Admin)
   *
   * @tags Course Version Management
   * @name GetCourseVersionById
   * @summary Get course version by ID
   * @request GET:/api/v1/courses/{courseId}/versions/{versionId}
   * @secure
   */
  getCourseVersionById = (
    courseId: number,
    versionId: number,
    params: RequestParams = {},
  ) =>
    this.request<CourseVersionResponse, any>({
      path: `/api/v1/courses/${courseId}/versions/${versionId}`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * @description Update a course version (only DRAFT or REJECTED status, Teacher only)
   *
   * @tags Course Version Management
   * @name UpdateCourseVersion
   * @summary Update course version
   * @request PUT:/api/v1/courses/{courseId}/versions/{versionId}
   * @secure
   */
  updateCourseVersion = (
    courseId: number,
    versionId: number,
    data: CourseVersionRequest,
    params: RequestParams = {},
  ) =>
    this.request<CourseVersionResponse, any>({
      path: `/api/v1/courses/${courseId}/versions/${versionId}`,
      method: "PUT",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description Delete a course version (only DRAFT, PENDING, REJECTED status, Teacher only)
   *
   * @tags Course Version Management
   * @name DeleteCourseVersion
   * @summary Delete course version
   * @request DELETE:/api/v1/courses/{courseId}/versions/{versionId}
   * @secure
   */
  deleteCourseVersion = (
    courseId: number,
    versionId: number,
    params: RequestParams = {},
  ) =>
    this.request<void, any>({
      path: `/api/v1/courses/${courseId}/versions/${versionId}`,
      method: "DELETE",
      secure: true,
      ...params,
    });
  /**
   * @description Get detailed information about a specific chapter
   *
   * @tags Chapter Management
   * @name GetDetailChapter
   * @summary Get chapter details
   * @request GET:/api/v1/courses/{courseId}/versions/{versionId}/chapters/{chapterId}
   */
  getDetailChapter = (
    courseId: number,
    versionId: number,
    chapterId: number,
    params: RequestParams = {},
  ) =>
    this.request<ChapterDto, any>({
      path: `/api/v1/courses/${courseId}/versions/${versionId}/chapters/${chapterId}`,
      method: "GET",
      ...params,
    });
  /**
   * @description Update chapter information (Teacher only)
   *
   * @tags Chapter Management
   * @name UpdateChapter
   * @summary Update a chapter
   * @request PUT:/api/v1/courses/{courseId}/versions/{versionId}/chapters/{chapterId}
   * @secure
   */
  updateChapter = (
    courseId: number,
    versionId: number,
    chapterId: number,
    data: ChapterRequest,
    params: RequestParams = {},
  ) =>
    this.request<ChapterDto, any>({
      path: `/api/v1/courses/${courseId}/versions/${versionId}/chapters/${chapterId}`,
      method: "PUT",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description Delete a chapter and all its lessons (Teacher only)
   *
   * @tags Chapter Management
   * @name DeleteChapter
   * @summary Delete a chapter
   * @request DELETE:/api/v1/courses/{courseId}/versions/{versionId}/chapters/{chapterId}
   * @secure
   */
  deleteChapter = (
    courseId: number,
    versionId: number,
    chapterId: number,
    params: RequestParams = {},
  ) =>
    this.request<void, any>({
      path: `/api/v1/courses/${courseId}/versions/${versionId}/chapters/${chapterId}`,
      method: "DELETE",
      secure: true,
      ...params,
    });
  /**
   * @description Update existing course review (Student only)
   *
   * @tags Course Review Management
   * @name UpdateReview
   * @summary Update a review
   * @request PUT:/api/v1/courses/{courseId}/reviews/{reviewId}
   * @secure
   */
  updateReview = (
    courseId: number,
    reviewId: number,
    data: CourseReviewRequest,
    params: RequestParams = {},
  ) =>
    this.request<CourseReviewResponse, any>({
      path: `/api/v1/courses/${courseId}/reviews/${reviewId}`,
      method: "PUT",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description Delete course review (Student only)
   *
   * @tags Course Review Management
   * @name DeleteReview
   * @summary Delete a review
   * @request DELETE:/api/v1/courses/{courseId}/reviews/{reviewId}
   * @secure
   */
  deleteReview = (
    courseId: number,
    reviewId: number,
    params: RequestParams = {},
  ) =>
    this.request<void, any>({
      path: `/api/v1/courses/${courseId}/reviews/${reviewId}`,
      method: "DELETE",
      secure: true,
      ...params,
    });
  /**
   * @description Update comment content (owner only)
   *
   * @tags Comment Management
   * @name UpdateComment
   * @summary Update comment
   * @request PUT:/api/v1/comments/{id}
   * @secure
   */
  updateComment = (
    id: number,
    data: CommentCreateRequest,
    params: RequestParams = {},
  ) =>
    this.request<CommentResponse, any>({
      path: `/api/v1/comments/${id}`,
      method: "PUT",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description Delete a comment (soft delete, owner only)
   *
   * @tags Comment Management
   * @name DeleteComment
   * @summary Delete comment
   * @request DELETE:/api/v1/comments/{id}
   * @secure
   */
  deleteComment = (id: number, params: RequestParams = {}) =>
    this.request<Record<string, string>, any>({
      path: `/api/v1/comments/${id}`,
      method: "DELETE",
      secure: true,
      ...params,
    });
  /**
   * @description Get category details by ID. Public endpoint - no authentication required for GET.
   *
   * @tags Category Management
   * @name GetCategoryById
   * @summary Get category by ID
   * @request GET:/api/v1/categories/{id}
   */
  getCategoryById = (id: number, params: RequestParams = {}) =>
    this.request<CategoryResponseDto, any>({
      path: `/api/v1/categories/${id}`,
      method: "GET",
      ...params,
    });
  /**
   * @description Update category information (Admin only)
   *
   * @tags Category Management
   * @name UpdateCategory
   * @summary Update a category
   * @request PUT:/api/v1/categories/{id}
   * @secure
   */
  updateCategory = (
    id: number,
    data: CategoryRequest,
    params: RequestParams = {},
  ) =>
    this.request<CategoryResponseDto, any>({
      path: `/api/v1/categories/${id}`,
      method: "PUT",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description Soft delete a category (Admin only)
   *
   * @tags Category Management
   * @name DeleteCategory
   * @summary Delete a category
   * @request DELETE:/api/v1/categories/{id}
   * @secure
   */
  deleteCategory = (id: number, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/v1/categories/${id}`,
      method: "DELETE",
      secure: true,
      ...params,
    });
  /**
   * @description Change the password for the currently authenticated user. Requires the old password for verification.
   *
   * @tags Authentication
   * @name ChangePassword
   * @summary Change password
   * @request PUT:/api/v1/auth/password/change
   * @secure
   */
  changePassword = (data: ChangePasswordDTO, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/v1/auth/password/change`,
      method: "PUT",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description Retrieve detailed information about a specific assignment.
   *
   * @tags Assignment Management
   * @name GetAssignment
   * @summary Get assignment by ID
   * @request GET:/api/v1/assignments/{id}
   * @secure
   */
  getAssignment = (id: number, params: RequestParams = {}) =>
    this.request<AssignmentResponse, any>({
      path: `/api/v1/assignments/${id}`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * @description Update an existing assignment's details. Teachers only.
   *
   * @tags Assignment Management
   * @name UpdateAssignment
   * @summary Update an assignment
   * @request PUT:/api/v1/assignments/{id}
   * @secure
   */
  updateAssignment = (
    id: number,
    data: AssignmentRequest,
    params: RequestParams = {},
  ) =>
    this.request<AssignmentResponse, any>({
      path: `/api/v1/assignments/${id}`,
      method: "PUT",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description Delete an assignment and all its associated submissions. Teachers only.
   *
   * @tags Assignment Management
   * @name DeleteAssignment
   * @summary Delete an assignment
   * @request DELETE:/api/v1/assignments/{id}
   * @secure
   */
  deleteAssignment = (id: number, params: RequestParams = {}) =>
    this.request<object, any>({
      path: `/api/v1/assignments/${id}`,
      method: "DELETE",
      secure: true,
      ...params,
    });
  /**
   * @description Update an existing system configuration setting by ID
   *
   * @tags System Settings
   * @name Update
   * @summary Update a system setting
   * @request PUT:/api/v1/admin/settings/{id}
   * @secure
   */
  update = (
    id: number,
    data: SystemSettingRequest,
    params: RequestParams = {},
  ) =>
    this.request<SystemSettingResponse, any>({
      path: `/api/v1/admin/settings/${id}`,
      method: "PUT",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description Delete a system configuration setting by ID. This action is permanent.
   *
   * @tags System Settings
   * @name Delete
   * @summary Delete a system setting
   * @request DELETE:/api/v1/admin/settings/{id}
   * @secure
   */
  delete = (id: number, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/v1/admin/settings/${id}`,
      method: "DELETE",
      secure: true,
      ...params,
    });
  /**
   * @description Get revenue sharing configuration details by ID
   *
   * @tags Revenue Share Configuration
   * @name GetRevenueShareConfigById
   * @summary Get revenue share config by ID
   * @request GET:/api/v1/admin/revenue-share/{id}
   * @secure
   */
  getRevenueShareConfigById = (id: number, params: RequestParams = {}) =>
    this.request<RevenueShareConfigResponse, any>({
      path: `/api/v1/admin/revenue-share/${id}`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * @description Update an existing revenue sharing configuration
   *
   * @tags Revenue Share Configuration
   * @name UpdateRevenueShareConfig
   * @summary Update revenue share config
   * @request PUT:/api/v1/admin/revenue-share/{id}
   * @secure
   */
  updateRevenueShareConfig = (
    id: number,
    data: UpdateRevenueShareConfigRequest,
    params: RequestParams = {},
  ) =>
    this.request<RevenueShareConfigResponse, any>({
      path: `/api/v1/admin/revenue-share/${id}`,
      method: "PUT",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description Delete an inactive revenue sharing configuration
   *
   * @tags Revenue Share Configuration
   * @name DeleteRevenueShareConfig
   * @summary Delete revenue share config
   * @request DELETE:/api/v1/admin/revenue-share/{id}
   * @secure
   */
  deleteRevenueShareConfig = (id: number, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/v1/admin/revenue-share/${id}`,
      method: "DELETE",
      secure: true,
      ...params,
    });
  /**
   * @description Retrieve the profile information of the currently authenticated user
   *
   * @tags Account Management
   * @name GetProfile
   * @summary Get current user profile
   * @request GET:/api/v1/accounts/me
   * @secure
   */
  getProfile = (params: RequestParams = {}) =>
    this.request<ApiResponseObject, any>({
      path: `/api/v1/accounts/me`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * @description Update profile information for the currently authenticated user
   *
   * @tags Account Management
   * @name UpdateProfile
   * @summary Update user profile
   * @request PUT:/api/v1/accounts/me
   * @secure
   */
  updateProfile = (data: UpdateProfileRequest, params: RequestParams = {}) =>
    this.request<AccountProfileResponse, any>({
      path: `/api/v1/accounts/me`,
      method: "PUT",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description Retrieve all question banks created by a specific teacher. Only accessible by teachers.
   *
   * @tags Question Bank Management
   * @name GetAllQuestionBanks
   * @summary Get all question banks for a teacher
   * @request GET:/api/v1/teachers/{teacherId}/question-banks
   * @secure
   */
  getAllQuestionBanks = (teacherId: number, params: RequestParams = {}) =>
    this.request<QuestionBankResponse[], any>({
      path: `/api/v1/teachers/${teacherId}/question-banks`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * @description Create a new question bank for a teacher. Only accessible by teachers.
   *
   * @tags Question Bank Management
   * @name CreateQuestionBank
   * @summary Create a question bank
   * @request POST:/api/v1/teachers/{teacherId}/question-banks
   * @secure
   */
  createQuestionBank = (
    teacherId: number,
    data: QuestionBankRequest,
    params: RequestParams = {},
  ) =>
    this.request<QuestionBankResponse, any>({
      path: `/api/v1/teachers/${teacherId}/question-banks`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description Teacher requests approval from admin to start teaching. Can only be called by the teacher themselves.
   *
   * @tags Teacher Management
   * @name RequestApproval
   * @summary Request teacher approval
   * @request POST:/api/v1/teachers/{id}/request-approval
   * @secure
   */
  requestApproval = (id: number, params: RequestParams = {}) =>
    this.request<TeacherDetailResponse, any>({
      path: `/api/v1/teachers/${id}/request-approval`,
      method: "POST",
      secure: true,
      ...params,
    });
  /**
   * @description Admin rejects a teacher application with a reason. Only accessible by admins.
   *
   * @tags Teacher Management
   * @name RejectTeacher
   * @summary Reject teacher
   * @request POST:/api/v1/teachers/{id}/reject
   * @secure
   */
  rejectTeacher = (
    id: number,
    data: RejectTeacherRequest,
    params: RequestParams = {},
  ) =>
    this.request<TeacherDetailResponse, any>({
      path: `/api/v1/teachers/${id}/reject`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description Admin approves a teacher to allow them to create and publish courses. Only accessible by admins.
   *
   * @tags Teacher Management
   * @name ApproveTeacher
   * @summary Approve teacher
   * @request POST:/api/v1/teachers/{id}/approve
   * @secure
   */
  approveTeacher = (
    id: number,
    data: ApproveTeacherRequest,
    params: RequestParams = {},
  ) =>
    this.request<TeacherDetailResponse, any>({
      path: `/api/v1/teachers/${id}/approve`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description Get courses created by current teacher (Teacher only)
   *
   * @tags Course Management
   * @name GetMyCourses
   * @summary Get my courses
   * @request GET:/api/v1/teacher/courses
   * @secure
   */
  getMyCourses = (
    query: {
      /** Pagination parameters */
      pageable: Pageable;
    },
    params: RequestParams = {},
  ) =>
    this.request<PageResponseCourseResponse, any>({
      path: `/api/v1/teacher/courses`,
      method: "GET",
      query: query,
      secure: true,
      ...params,
    });
  /**
   * @description Teacher creates a new course (Teacher only)
   *
   * @tags Course Management
   * @name CreateNewCourse
   * @summary Create a new course
   * @request POST:/api/v1/teacher/courses
   * @secure
   */
  createNewCourse = (data: CourseRequest, params: RequestParams = {}) =>
    this.request<CourseDetailResponse, any>({
      path: `/api/v1/teacher/courses`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description Upload a thumbnail image for a course (Teacher only)
   *
   * @tags Course Management
   * @name UploadCourseThumbnail
   * @summary Upload course thumbnail
   * @request POST:/api/v1/teacher/courses/{id}/thumbnail
   * @secure
   */
  uploadCourseThumbnail = (
    id: number,
    data: {
      /**
       * Thumbnail image file (JPG, PNG, WEBP)
       * @format binary
       */
      file: File;
    },
    params: RequestParams = {},
  ) =>
    this.request<CourseDetailResponse, any>({
      path: `/api/v1/teacher/courses/${id}/thumbnail`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.FormData,
      ...params,
    });
  /**
   * @description Create a copy of an existing course with all settings, chapters, lessons, and quizzes. Student enrollment list is reset. Perfect for reusing course content in a new semester. (Teacher only)
   *
   * @tags Course Management
   * @name CloneCourse
   * @summary Clone/Duplicate a course
   * @request POST:/api/v1/teacher/courses/{id}/clone
   * @secure
   */
  cloneCourse = (
    id: number,
    query?: {
      /** New course title (optional, will append 'Copy' if not provided) */
      newTitle?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<CourseDetailResponse, any>({
      path: `/api/v1/teacher/courses/${id}/clone`,
      method: "POST",
      query: query,
      secure: true,
      ...params,
    });
  /**
   * @description Get paginated list of all active tags. Public endpoint - no authentication required.
   *
   * @tags Tag Management
   * @name GetTags
   * @summary Get all active tags
   * @request GET:/api/v1/tags
   */
  getTags = (
    query: {
      /** Pagination parameters */
      pageable: Pageable;
    },
    params: RequestParams = {},
  ) =>
    this.request<PageResponseTag, any>({
      path: `/api/v1/tags`,
      method: "GET",
      query: query,
      ...params,
    });
  /**
   * @description Create a new course tag (Admin only)
   *
   * @tags Tag Management
   * @name CreateTag
   * @summary Create a new tag
   * @request POST:/api/v1/tags
   * @secure
   */
  createTag = (data: TagRequest, params: RequestParams = {}) =>
    this.request<Tag, any>({
      path: `/api/v1/tags`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description Create multiple tags at once from a list of names. Skips duplicates automatically. (Admin only)
   *
   * @tags Tag Management
   * @name BulkCreateTags
   * @summary Bulk create tags
   * @request POST:/api/v1/tags/bulk
   * @secure
   */
  bulkCreateTags = (data: BulkTagRequest, params: RequestParams = {}) =>
    this.request<TagResponseDto[], any>({
      path: `/api/v1/tags/bulk`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description Retrieve a list of all files attached to a submission. Accessible by students and teachers.
   *
   * @tags Submission File Management
   * @name GetSubmissionFiles
   * @summary Get all files for submission
   * @request GET:/api/v1/submissions/{submissionId}/files
   * @secure
   */
  getSubmissionFiles = (submissionId: number, params: RequestParams = {}) =>
    this.request<FileStorageResponse[], any>({
      path: `/api/v1/submissions/${submissionId}/files`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * @description Upload a single file attachment to a student's assignment submission. Only accessible by students.
   *
   * @tags Submission File Management
   * @name UploadFile
   * @summary Upload file to submission
   * @request POST:/api/v1/submissions/{submissionId}/files
   * @secure
   */
  uploadFile = (
    submissionId: number,
    data: {
      /**
       * File to upload
       * @format binary
       */
      file: File;
    },
    params: RequestParams = {},
  ) =>
    this.request<FileStorageResponse, any>({
      path: `/api/v1/submissions/${submissionId}/files`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.FormData,
      ...params,
    });
  /**
   * @description Upload multiple file attachments to a student's assignment submission at once. Only accessible by students.
   *
   * @tags Submission File Management
   * @name UploadMultipleFiles
   * @summary Upload multiple files to submission
   * @request POST:/api/v1/submissions/{submissionId}/files/batch
   * @secure
   */
  uploadMultipleFiles = (
    submissionId: number,
    query: {
      /** Files to upload */
      files: File[];
    },
    params: RequestParams = {},
  ) =>
    this.request<FileStorageResponse[], any>({
      path: `/api/v1/submissions/${submissionId}/files/batch`,
      method: "POST",
      query: query,
      secure: true,
      ...params,
    });
  /**
   * @description Reject a student's submission with feedback, requiring resubmission. Only accessible by teachers.
   *
   * @tags Submission Management
   * @name RejectSubmission
   * @summary Reject submission
   * @request POST:/api/v1/submissions/{id}/reject
   * @secure
   */
  rejectSubmission = (
    id: number,
    query: {
      /** Rejection feedback */
      feedback: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<SubmissionResponse, any>({
      path: `/api/v1/submissions/${id}/reject`,
      method: "POST",
      query: query,
      secure: true,
      ...params,
    });
  /**
   * @description Change the grade of an already graded submission. Only accessible by teachers.
   *
   * @tags Submission Management
   * @name RegradeSubmission
   * @summary Regrade submission
   * @request POST:/api/v1/submissions/{id}/regrade
   * @secure
   */
  regradeSubmission = (
    id: number,
    query: {
      /**
       * New score
       * @format double
       * @example 90
       */
      score: number;
      /** Optional feedback for regrading */
      feedback?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<SubmissionResponse, any>({
      path: `/api/v1/submissions/${id}/regrade`,
      method: "POST",
      query: query,
      secure: true,
      ...params,
    });
  /**
   * @description Assign a grade to a student's submission. Only accessible by teachers.
   *
   * @tags Submission Management
   * @name GradeSubmission
   * @summary Grade submission
   * @request POST:/api/v1/submissions/{id}/grade
   * @secure
   */
  gradeSubmission = (
    id: number,
    data: GradeSubmissionRequest,
    params: RequestParams = {},
  ) =>
    this.request<SubmissionResponse, any>({
      path: `/api/v1/submissions/${id}/grade`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description Add feedback comments to a student's submission without grading. Only accessible by teachers.
   *
   * @tags Submission Management
   * @name FeedbackSubmission
   * @summary Provide feedback on submission
   * @request POST:/api/v1/submissions/{id}/feedback
   * @secure
   */
  feedbackSubmission = (
    id: number,
    data: FeedbackSubmissionRequest,
    params: RequestParams = {},
  ) =>
    this.request<SubmissionResponse, any>({
      path: `/api/v1/submissions/${id}/feedback`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description Grade multiple submissions at once with the same score and optional feedback. Only accessible by teachers.
   *
   * @tags Submission Management
   * @name BulkGradeSubmissions
   * @summary Bulk grade submissions
   * @request POST:/api/v1/submissions/bulk-grade
   * @secure
   */
  bulkGradeSubmissions = (
    query: {
      /**
       * Score to assign
       * @format double
       * @example 85
       */
      score: number;
      /** Optional feedback comment */
      feedback?: string;
    },
    data: number[],
    params: RequestParams = {},
  ) =>
    this.request<SubmissionResponse[], any>({
      path: `/api/v1/submissions/bulk-grade`,
      method: "POST",
      query: query,
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description Get list of reports submitted by current user
   *
   * @tags Violation Report Management
   * @name GetMyReports
   * @summary Get my reports
   * @request GET:/api/v1/reports
   * @secure
   */
  getMyReports = (params: RequestParams = {}) =>
    this.request<PageResponseViolationReportResponse, any>({
      path: `/api/v1/reports`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * @description Submit a report for violating content or behavior
   *
   * @tags Violation Report Management
   * @name Create
   * @summary Create violation report
   * @request POST:/api/v1/reports
   * @secure
   */
  create = (data: ViolationReportCreateRequest, params: RequestParams = {}) =>
    this.request<ViolationReportDetailResponse, any>({
      path: `/api/v1/reports`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description Allow students to provide feedback on course recommendations (LIKED, IGNORED, DISMISSED, ENROLLED)
   *
   * @tags Recommendation Management
   * @name GiveFeedback
   * @summary Submit feedback on a recommendation
   * @request POST:/api/v1/recommendations/{id}/feedback
   * @secure
   */
  giveFeedback = (
    id: number,
    data: RecommendationFeedbackRequest,
    params: RequestParams = {},
  ) =>
    this.request<void, any>({
      path: `/api/v1/recommendations/${id}/feedback`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description Retrieve all independent quizzes from the quiz library/pool that are not linked to any lesson. Only accessible by teachers.
   *
   * @tags Quiz Management
   * @name GetAllIndependentQuizzes
   * @summary Get all independent quizzes
   * @request GET:/api/v1/quizzes
   * @secure
   */
  getAllIndependentQuizzes = (params: RequestParams = {}) =>
    this.request<QuizResponse[], any>({
      path: `/api/v1/quizzes`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * @description Create a new quiz that is not linked to any lesson yet. Follows Association pattern: Quiz exists independently. Only accessible by teachers.
   *
   * @tags Quiz Management
   * @name CreateIndependentQuiz
   * @summary Create independent quiz
   * @request POST:/api/v1/quizzes
   * @secure
   */
  createIndependentQuiz = (data: QuizRequest, params: RequestParams = {}) =>
    this.request<QuizResponse, any>({
      path: `/api/v1/quizzes`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description Submit an answer for a question in an ongoing quiz attempt.
   *
   * @tags Quiz Attempt Management
   * @name SubmitAnswer
   * @summary Submit an answer
   * @request POST:/api/v1/quizzes/{quizId}/attempts/{attemptId}/submit-answer
   */
  submitAnswer = (
    quizId: number,
    attemptId: number,
    data: SubmitAnswerRequest,
    params: RequestParams = {},
  ) =>
    this.request<object, any>({
      path: `/api/v1/quizzes/${quizId}/attempts/${attemptId}/submit-answer`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description Complete a quiz attempt and calculate the final score.
   *
   * @tags Quiz Attempt Management
   * @name FinishQuiz
   * @summary Finish a quiz
   * @request POST:/api/v1/quizzes/{quizId}/attempts/{attemptId}/finish
   */
  finishQuiz = (
    quizId: number,
    attemptId: number,
    params: RequestParams = {},
  ) =>
    this.request<QuizAttemptResponse, any>({
      path: `/api/v1/quizzes/${quizId}/attempts/${attemptId}/finish`,
      method: "POST",
      ...params,
    });
  /**
   * @description Abandon an ongoing quiz attempt without submitting. The attempt will be marked as abandoned. Only accessible by students.
   *
   * @tags Quiz Attempt Management
   * @name AbandonQuizAttempt
   * @summary Abandon quiz attempt
   * @request POST:/api/v1/quizzes/{quizId}/attempts/{attemptId}/abandon
   */
  abandonQuizAttempt = (
    quizId: number,
    attemptId: number,
    params: RequestParams = {},
  ) =>
    this.request<QuizAttemptResponse, any>({
      path: `/api/v1/quizzes/${quizId}/attempts/${attemptId}/abandon`,
      method: "POST",
      ...params,
    });
  /**
   * @description Start a new quiz attempt for the authenticated student.
   *
   * @tags Quiz Attempt Management
   * @name StartQuiz
   * @summary Start a quiz
   * @request POST:/api/v1/quizzes/{id}/start
   */
  startQuiz = (id: number, params: RequestParams = {}) =>
    this.request<QuizAttemptResponse, any>({
      path: `/api/v1/quizzes/${id}/start`,
      method: "POST",
      ...params,
    });
  /**
   * @description Create a copy of an existing quiz and link it to a different lesson. Only accessible by teachers.
   *
   * @tags Quiz Management
   * @name CloneQuiz
   * @summary Clone a quiz
   * @request POST:/api/v1/quizzes/{id}/clone
   * @secure
   */
  cloneQuiz = (
    id: number,
    query: {
      /**
       * Target lesson ID
       * @format int64
       * @example 2
       */
      targetLessonId: number;
    },
    params: RequestParams = {},
  ) =>
    this.request<QuizResponse, any>({
      path: `/api/v1/quizzes/${id}/clone`,
      method: "POST",
      query: query,
      secure: true,
      ...params,
    });
  /**
   * @description Add multiple questions from a question bank to a quiz. Only accessible by teachers.
   *
   * @tags Quiz Management
   * @name AddQuestionsToQuiz
   * @summary Add questions to quiz
   * @request POST:/api/v1/quizzes/{id}/add-questions
   * @secure
   */
  addQuestionsToQuiz = (
    id: number,
    data: AddQuestionsRequest,
    params: RequestParams = {},
  ) =>
    this.request<QuizResponse, any>({
      path: `/api/v1/quizzes/${id}/add-questions`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description Add questions to a quiz from a question bank. Optionally specify the number of questions to add (random selection). Only accessible by teachers.
   *
   * @tags Quiz Management
   * @name AddQuestionsFromBank
   * @summary Add questions from question bank
   * @request POST:/api/v1/quizzes/{id}/add-from-bank
   * @secure
   */
  addQuestionsFromBank = (
    id: number,
    query: {
      /**
       * Question bank ID
       * @format int64
       * @example 1
       */
      questionBankId: number;
      /**
       * Number of questions to add (optional, adds all if not specified)
       * @format int32
       * @example 10
       */
      count?: number;
    },
    params: RequestParams = {},
  ) =>
    this.request<QuizResponse, any>({
      path: `/api/v1/quizzes/${id}/add-from-bank`,
      method: "POST",
      query: query,
      secure: true,
      ...params,
    });
  /**
   * @description Create a copy of an existing question in another question bank. Only accessible by teachers.
   *
   * @tags Question Management
   * @name CloneQuestion
   * @summary Clone a question
   * @request POST:/api/v1/questions/{id}/clone
   * @secure
   */
  cloneQuestion = (
    id: number,
    query: {
      /**
       * Target question bank ID
       * @format int64
       * @example 2
       */
      targetBankId: number;
    },
    params: RequestParams = {},
  ) =>
    this.request<QuestionResponse, any>({
      path: `/api/v1/questions/${id}/clone`,
      method: "POST",
      query: query,
      secure: true,
      ...params,
    });
  /**
   * @description Add, update, or remove answer options for a question. Only accessible by teachers.
   *
   * @tags Question Management
   * @name ManageAnswerOptions
   * @summary Manage answer options
   * @request POST:/api/v1/questions/{id}/answer-options
   * @secure
   */
  manageAnswerOptions = (
    id: number,
    data: AnswerOptionRequest[],
    params: RequestParams = {},
  ) =>
    this.request<QuestionResponse, any>({
      path: `/api/v1/questions/${id}/answer-options`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description Create a copy of an existing question bank and assign it to another teacher. Only accessible by teachers.
   *
   * @tags Question Bank Management
   * @name CloneQuestionBank
   * @summary Clone a question bank
   * @request POST:/api/v1/question-banks/{id}/clone
   * @secure
   */
  cloneQuestionBank = (
    id: number,
    query: {
      /**
       * Target teacher ID
       * @format int64
       * @example 2
       */
      targetTeacherId: number;
    },
    params: RequestParams = {},
  ) =>
    this.request<QuestionBankResponse, any>({
      path: `/api/v1/question-banks/${id}/clone`,
      method: "POST",
      query: query,
      secure: true,
      ...params,
    });
  /**
   * @description Retrieve all questions from a specific question bank. Only accessible by teachers.
   *
   * @tags Question Management
   * @name GetAllQuestions
   * @summary Get all questions in a question bank
   * @request GET:/api/v1/question-banks/{bankId}/questions
   * @secure
   */
  getAllQuestions = (bankId: number, params: RequestParams = {}) =>
    this.request<QuestionResponse[], any>({
      path: `/api/v1/question-banks/${bankId}/questions`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * @description Create a new question in a question bank. Only accessible by teachers.
   *
   * @tags Question Management
   * @name CreateQuestion
   * @summary Create a question
   * @request POST:/api/v1/question-banks/{bankId}/questions
   * @secure
   */
  createQuestion = (
    bankId: number,
    data: QuestionRequest,
    params: RequestParams = {},
  ) =>
    this.request<QuestionResponse, any>({
      path: `/api/v1/question-banks/${bankId}/questions`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description Get payout list for current teacher
   *
   * @tags Payout Management
   * @name GetPayouts
   * @summary Get my payouts
   * @request GET:/api/v1/payouts
   * @secure
   */
  getPayouts = (params: RequestParams = {}) =>
    this.request<PayoutResponse[], any>({
      path: `/api/v1/payouts`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * @description Teacher creates a payout request for revenue withdrawal
   *
   * @tags Payout Management
   * @name CreatePayoutRequest
   * @summary Create payout request
   * @request POST:/api/v1/payouts
   * @secure
   */
  createPayoutRequest = (
    data: CreatePayoutRequest,
    params: RequestParams = {},
  ) =>
    this.request<PayoutResponse, any>({
      path: `/api/v1/payouts`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description Manually retry enrollment after successful payment (Admin only)
   *
   * @tags Payment Management
   * @name RetryEnrollment
   * @summary Retry enrollment
   * @request POST:/api/v1/payments/{paymentId}/retry-enrollment
   * @secure
   */
  retryEnrollment = (paymentId: number, params: RequestParams = {}) =>
    this.request<ApiResponseObject, any>({
      path: `/api/v1/payments/${paymentId}/retry-enrollment`,
      method: "POST",
      secure: true,
      ...params,
    });
  /**
   * @description Process payment refund (Admin only)
   *
   * @tags Payment Management
   * @name RefundPayment
   * @summary Refund payment
   * @request POST:/api/v1/payments/{id}/refund
   * @secure
   */
  refundPayment = (
    id: number,
    data: RefundRequest,
    params: RequestParams = {},
  ) =>
    this.request<PaymentTransactionResponse, any>({
      path: `/api/v1/payments/${id}/refund`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description Manual verification endpoint used for frontend to verify payment after redirect from gateway
   *
   * @tags Payment Management
   * @name VerifyPayment
   * @summary Verify payment
   * @request POST:/api/v1/payments/verify-payment
   * @secure
   */
  verifyPayment = (data: Record<string, string>, params: RequestParams = {}) =>
    this.request<PaymentTransactionResponse, any>({
      path: `/api/v1/payments/verify-payment`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description Student initiates payment for a course. Returns payment URL for redirect.
   *
   * @tags Payment Management
   * @name CreatePayment
   * @summary Create payment transaction
   * @request POST:/api/v1/payments/create-payment
   * @secure
   */
  createPayment = (data: CreatePaymentRequest, params: RequestParams = {}) =>
    this.request<PaymentUrlResponse, any>({
      path: `/api/v1/payments/create-payment`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description Auto-detects payment gateway (VNPay, ZaloPay, MoMo) and processes callback. Used as single callback URL.
   *
   * @tags Payment Management
   * @name UnifiedPaymentCallback
   * @summary Unified payment callback
   * @request POST:/api/v1/payments/callback
   * @secure
   */
  unifiedPaymentCallback = (
    data: Record<string, string>,
    params: RequestParams = {},
  ) =>
    this.request<object, any>({
      path: `/api/v1/payments/callback`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description Mark a specific notification as read
   *
   * @tags Notification Management
   * @name MarkRead
   * @summary Mark notification as read
   * @request POST:/api/v1/notifications/{id}/mark-read
   * @secure
   */
  markRead = (id: number, params: RequestParams = {}) =>
    this.request<Record<string, string>, any>({
      path: `/api/v1/notifications/${id}/mark-read`,
      method: "POST",
      secure: true,
      ...params,
    });
  /**
   * @description Mark all unread notifications as read for current user
   *
   * @tags Notification Management
   * @name MarkAllRead
   * @summary Mark all notifications as read
   * @request POST:/api/v1/notifications/mark-all-read
   * @secure
   */
  markAllRead = (params: RequestParams = {}) =>
    this.request<Record<string, string>, any>({
      path: `/api/v1/notifications/mark-all-read`,
      method: "POST",
      secure: true,
      ...params,
    });
  /**
   * @description Notify server that video upload is complete and trigger processing. Only accessible by teachers.
   *
   * @tags Lesson Management
   * @name UploadComplete
   * @summary Complete video upload
   * @request POST:/api/v1/lessons/{lessonId}/video/upload-complete
   * @secure
   */
  uploadComplete = (
    lessonId: number,
    data: UpdateVideoRequest,
    params: RequestParams = {},
  ) =>
    this.request<LessonDTO, any>({
      path: `/api/v1/lessons/${lessonId}/video/upload-complete`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description Update watched duration for video lessons. Automatically marks lesson as VIEWED or COMPLETED based on percentage watched. Lesson is auto-completed when watched >= 90% of video duration.
   *
   * @tags Progress Management
   * @name UpdateWatchedDuration
   * @summary Update watched duration
   * @request POST:/api/v1/lessons/{lessonId}/update-duration
   * @secure
   */
  updateWatchedDuration = (
    lessonId: number,
    data: UpdateWatchedDurationRequest,
    params: RequestParams = {},
  ) =>
    this.request<LessonProgressResponse, any>({
      path: `/api/v1/lessons/${lessonId}/update-duration`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description Retrieve all resources attached to a lesson (ordered by orderIndex)
   *
   * @tags Lesson Resource Management
   * @name GetLessonResources
   * @summary Get all resources for a lesson
   * @request GET:/api/v1/lessons/{lessonId}/resources
   * @secure
   */
  getLessonResources = (lessonId: number, params: RequestParams = {}) =>
    this.request<LessonResourceResponse[], any>({
      path: `/api/v1/lessons/${lessonId}/resources`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * @description Add an external link or embeddable content to a lesson. Only accessible by teachers.
   *
   * @tags Lesson Resource Management
   * @name AddLinkResource
   * @summary Add link/embed resource to lesson
   * @request POST:/api/v1/lessons/{lessonId}/resources
   * @secure
   */
  addLinkResource = (
    lessonId: number,
    data: LessonResourceRequest,
    params: RequestParams = {},
  ) =>
    this.request<LessonResourceResponse, any>({
      path: `/api/v1/lessons/${lessonId}/resources`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description Reorder resources within a lesson. Provide ordered list of resource IDs. Only accessible by teachers.
   *
   * @tags Lesson Resource Management
   * @name ReorderResources
   * @summary Reorder resources
   * @request POST:/api/v1/lessons/{lessonId}/resources/reorder
   * @secure
   */
  reorderResources = (
    lessonId: number,
    data: ReorderResourcesRequest,
    params: RequestParams = {},
  ) =>
    this.request<void, any>({
      path: `/api/v1/lessons/${lessonId}/resources/reorder`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description Upload and attach a file resource to a lesson. Only accessible by teachers.
   *
   * @tags Lesson Resource Management
   * @name AddFileResource
   * @summary Add file resource to lesson
   * @request POST:/api/v1/lessons/{lessonId}/resources/file
   * @secure
   */
  addFileResource = (
    lessonId: number,
    data: {
      /**
       * File to upload
       * @format binary
       */
      file: File;
    },
    query?: {
      /** Resource title */
      title?: string;
      /** Resource description */
      description?: string;
      /** Whether this resource is required */
      isRequired?: boolean;
    },
    params: RequestParams = {},
  ) =>
    this.request<LessonResourceResponse, any>({
      path: `/api/v1/lessons/${lessonId}/resources/file`,
      method: "POST",
      query: query,
      body: data,
      secure: true,
      type: ContentType.FormData,
      ...params,
    });
  /**
   * @description Retrieve all quizzes associated with a specific lesson.
   *
   * @tags Quiz Management
   * @name GetAllQuizzes
   * @summary Get all quizzes for a lesson
   * @request GET:/api/v1/lessons/{lessonId}/quizzes
   * @secure
   */
  getAllQuizzes = (lessonId: number, params: RequestParams = {}) =>
    this.request<QuizResponse[], any>({
      path: `/api/v1/lessons/${lessonId}/quizzes`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * @description Create a new quiz for a lesson. Only accessible by teachers.
   *
   * @tags Quiz Management
   * @name CreateQuiz
   * @summary Create a quiz
   * @request POST:/api/v1/lessons/{lessonId}/quizzes
   * @secure
   */
  createQuiz = (
    lessonId: number,
    data: QuizRequest,
    params: RequestParams = {},
  ) =>
    this.request<QuizResponse, any>({
      path: `/api/v1/lessons/${lessonId}/quizzes`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description Link an existing independent quiz to a specific lesson. Allows quiz reusability across lessons. Only accessible by teachers.
   *
   * @tags Quiz Management
   * @name LinkQuizToLesson
   * @summary Link quiz to lesson
   * @request POST:/api/v1/lessons/{lessonId}/quizzes/{quizId}
   * @secure
   */
  linkQuizToLesson = (
    lessonId: number,
    quizId: number,
    params: RequestParams = {},
  ) =>
    this.request<QuizResponse, any>({
      path: `/api/v1/lessons/${lessonId}/quizzes/${quizId}`,
      method: "POST",
      secure: true,
      ...params,
    });
  /**
   * @description Unlink a quiz from a lesson. The quiz becomes independent again and can be linked to other lessons. Only accessible by teachers.
   *
   * @tags Quiz Management
   * @name UnlinkQuizFromLesson
   * @summary Unlink quiz from lesson
   * @request DELETE:/api/v1/lessons/{lessonId}/quizzes/{quizId}
   * @secure
   */
  unlinkQuizFromLesson = (
    lessonId: number,
    quizId: number,
    params: RequestParams = {},
  ) =>
    this.request<void, any>({
      path: `/api/v1/lessons/${lessonId}/quizzes/${quizId}`,
      method: "DELETE",
      secure: true,
      ...params,
    });
  /**
   * @description Mark a lesson as viewed by the authenticated student. Creates or updates progress record with viewed status.
   *
   * @tags Progress Management
   * @name MarkLessonAsViewed
   * @summary Mark lesson as viewed
   * @request POST:/api/v1/lessons/{lessonId}/mark-viewed
   * @secure
   */
  markLessonAsViewed = (lessonId: number, params: RequestParams = {}) =>
    this.request<LessonProgressResponse, any>({
      path: `/api/v1/lessons/${lessonId}/mark-viewed`,
      method: "POST",
      secure: true,
      ...params,
    });
  /**
   * @description Mark a lesson as completed by the authenticated student. Updates enrollment completion percentage automatically.
   *
   * @tags Progress Management
   * @name MarkLessonAsCompleted
   * @summary Mark lesson as completed
   * @request POST:/api/v1/lessons/{lessonId}/mark-completed
   * @secure
   */
  markLessonAsCompleted = (lessonId: number, params: RequestParams = {}) =>
    this.request<LessonProgressResponse, any>({
      path: `/api/v1/lessons/${lessonId}/mark-completed`,
      method: "POST",
      secure: true,
      ...params,
    });
  /**
   * @description Retrieve all comments for a specific lesson
   *
   * @tags Comment Management
   * @name GetLessonComments
   * @summary Get lesson comments
   * @request GET:/api/v1/lessons/{lessonId}/comments
   */
  getLessonComments = (lessonId: number, params: RequestParams = {}) =>
    this.request<PageResponseCommentResponse, any>({
      path: `/api/v1/lessons/${lessonId}/comments`,
      method: "GET",
      ...params,
    });
  /**
   * @description Post a comment or discussion on a lesson
   *
   * @tags Comment Management
   * @name CreateLessonComment
   * @summary Create lesson comment
   * @request POST:/api/v1/lessons/{lessonId}/comments
   * @secure
   */
  createLessonComment = (
    lessonId: number,
    data: CommentCreateRequest,
    params: RequestParams = {},
  ) =>
    this.request<CommentResponse, any>({
      path: `/api/v1/lessons/${lessonId}/comments`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description Retrieve all assignments associated with a specific lesson.
   *
   * @tags Assignment Management
   * @name GetAssignments
   * @summary Get all assignments for a lesson
   * @request GET:/api/v1/lessons/{lessonId}/assignments
   * @secure
   */
  getAssignments = (lessonId: number, params: RequestParams = {}) =>
    this.request<AssignmentResponse[], any>({
      path: `/api/v1/lessons/${lessonId}/assignments`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * @description Create a new assignment for a specific lesson. Teachers only.
   *
   * @tags Assignment Management
   * @name CreateAssignment
   * @summary Create an assignment
   * @request POST:/api/v1/lessons/{lessonId}/assignments
   * @secure
   */
  createAssignment = (
    lessonId: number,
    data: AssignmentRequest,
    params: RequestParams = {},
  ) =>
    this.request<AssignmentResponse, any>({
      path: `/api/v1/lessons/${lessonId}/assignments`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description Link an existing independent assignment to a specific lesson. Allows assignment reusability across lessons. Only accessible by teachers.
   *
   * @tags Assignment Management
   * @name LinkAssignmentToLesson
   * @summary Link assignment to lesson
   * @request POST:/api/v1/lessons/{lessonId}/assignments/{assignmentId}
   * @secure
   */
  linkAssignmentToLesson = (
    lessonId: number,
    assignmentId: number,
    params: RequestParams = {},
  ) =>
    this.request<AssignmentResponse, any>({
      path: `/api/v1/lessons/${lessonId}/assignments/${assignmentId}`,
      method: "POST",
      secure: true,
      ...params,
    });
  /**
   * @description Unlink an assignment from a lesson. The assignment becomes independent again and can be linked to other lessons. Only accessible by teachers.
   *
   * @tags Assignment Management
   * @name UnlinkAssignmentFromLesson
   * @summary Unlink assignment from lesson
   * @request DELETE:/api/v1/lessons/{lessonId}/assignments/{assignmentId}
   * @secure
   */
  unlinkAssignmentFromLesson = (
    lessonId: number,
    assignmentId: number,
    params: RequestParams = {},
  ) =>
    this.request<void, any>({
      path: `/api/v1/lessons/${lessonId}/assignments/${assignmentId}`,
      method: "DELETE",
      secure: true,
      ...params,
    });
  /**
   * @description Upload a file to storage. Automatically determines storage provider based on file type.
   *
   * @tags File Storage Management
   * @name UploadFile1
   * @summary Upload file
   * @request POST:/api/v1/files/upload
   * @secure
   */
  uploadFile1 = (
    data: {
      /**
       * File to upload
       * @format binary
       */
      file: File;
    },
    query?: {
      /**
       * Folder path for organizing files
       * @example "courses/resources"
       */
      folderPath?: string;
      /** Cloud storage provider types */
      storageProvider?:
        | "CLOUDINARY"
        | "MINIO"
        | "S3"
        | "GCS"
        | "AZURE_BLOB"
        | "LOCAL";
    },
    params: RequestParams = {},
  ) =>
    this.request<FileStorageResponse, any>({
      path: `/api/v1/files/upload`,
      method: "POST",
      query: query,
      body: data,
      secure: true,
      type: ContentType.FormData,
      ...params,
    });
  /**
   * @description Teacher or Admin removes a student from course due to violation
   *
   * @tags Enrollment Management
   * @name KickStudent
   * @summary Kick student from course
   * @request POST:/api/v1/enrollments/{id}/kick
   * @secure
   */
  kickStudent = (
    id: number,
    data: CancelEnrollmentRequest,
    params: RequestParams = {},
  ) =>
    this.request<EnrollmentDetailResponse, any>({
      path: `/api/v1/enrollments/${id}/kick`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description Mark enrollment as completed (Teacher or System). Student must meet all requirements (progress % and pass score).
   *
   * @tags Enrollment Management
   * @name CompleteEnrollment
   * @summary Complete enrollment
   * @request POST:/api/v1/enrollments/{id}/complete
   * @secure
   */
  completeEnrollment = (id: number, params: RequestParams = {}) =>
    this.request<EnrollmentDetailResponse, any>({
      path: `/api/v1/enrollments/${id}/complete`,
      method: "POST",
      secure: true,
      ...params,
    });
  /**
   * @description Student cancels their enrollment in a course
   *
   * @tags Enrollment Management
   * @name CancelEnrollment
   * @summary Cancel enrollment
   * @request POST:/api/v1/enrollments/{id}/cancel
   * @secure
   */
  cancelEnrollment = (
    id: number,
    data: CancelEnrollmentRequest,
    params: RequestParams = {},
  ) =>
    this.request<EnrollmentDetailResponse, any>({
      path: `/api/v1/enrollments/${id}/cancel`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description Update enrollment score after quiz/exam completion (Internal/System call)
   *
   * @tags Enrollment Management
   * @name UpdateScore
   * @summary Update enrollment score
   * @request POST:/api/v1/enrollments/{enrollmentId}/update-score
   * @secure
   */
  updateScore = (
    enrollmentId: number,
    data: UpdateScoreRequest,
    params: RequestParams = {},
  ) =>
    this.request<EnrollmentDetailResponse, any>({
      path: `/api/v1/enrollments/${enrollmentId}/update-score`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description Get all versions of a specific course (Teacher only)
   *
   * @tags Course Version Management
   * @name GetCourseVersions
   * @summary Get all course versions
   * @request GET:/api/v1/courses/{courseId}/versions
   * @secure
   */
  getCourseVersions = (courseId: number, params: RequestParams = {}) =>
    this.request<CourseVersionResponse[], any>({
      path: `/api/v1/courses/${courseId}/versions`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * @description Teacher creates a new version of a course (Teacher only)
   *
   * @tags Course Version Management
   * @name CreateCourseVersion
   * @summary Create a new course version
   * @request POST:/api/v1/courses/{courseId}/versions
   * @secure
   */
  createCourseVersion = (
    courseId: number,
    data: CourseVersionRequest,
    params: RequestParams = {},
  ) =>
    this.request<CourseVersionResponse, any>({
      path: `/api/v1/courses/${courseId}/versions`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description Submit a course version for admin approval (Teacher only)
   *
   * @tags Course Version Management
   * @name SubmitApproval
   * @summary Submit version for approval
   * @request POST:/api/v1/courses/{courseId}/versions/{versionId}/submit-approval
   * @secure
   */
  submitApproval = (
    courseId: number,
    versionId: number,
    params: RequestParams = {},
  ) =>
    this.request<CourseVersionResponse, any>({
      path: `/api/v1/courses/${courseId}/versions/${versionId}/submit-approval`,
      method: "POST",
      secure: true,
      ...params,
    });
  /**
   * @description Reject a pending course version with reason (Admin only)
   *
   * @tags Course Version Management
   * @name RejectCourseVersion
   * @summary Reject course version
   * @request POST:/api/v1/courses/{courseId}/versions/{versionId}/reject
   * @secure
   */
  rejectCourseVersion = (
    courseId: number,
    versionId: number,
    data: RejectRequest,
    params: RequestParams = {},
  ) =>
    this.request<CourseVersionResponse, any>({
      path: `/api/v1/courses/${courseId}/versions/${versionId}/reject`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description Publish an approved course version (Teacher only)
   *
   * @tags Course Version Management
   * @name PublishCourseVersion
   * @summary Publish course version
   * @request POST:/api/v1/courses/{courseId}/versions/{versionId}/publish
   * @secure
   */
  publishCourseVersion = (
    courseId: number,
    versionId: number,
    params: RequestParams = {},
  ) =>
    this.request<CourseVersionResponse, any>({
      path: `/api/v1/courses/${courseId}/versions/${versionId}/publish`,
      method: "POST",
      secure: true,
      ...params,
    });
  /**
   * @description Get all chapters of a course version
   *
   * @tags Chapter Management
   * @name GetListChapters
   * @summary Get all chapters
   * @request GET:/api/v1/courses/{courseId}/versions/{versionId}/chapters
   */
  getListChapters = (
    courseId: number,
    versionId: number,
    params: RequestParams = {},
  ) =>
    this.request<ChapterDto[], any>({
      path: `/api/v1/courses/${courseId}/versions/${versionId}/chapters`,
      method: "GET",
      ...params,
    });
  /**
   * @description Create a new chapter in a course version (Teacher only)
   *
   * @tags Chapter Management
   * @name CreateNewChapter
   * @summary Create a new chapter
   * @request POST:/api/v1/courses/{courseId}/versions/{versionId}/chapters
   * @secure
   */
  createNewChapter = (
    courseId: number,
    versionId: number,
    data: ChapterRequest,
    params: RequestParams = {},
  ) =>
    this.request<ChapterDto, any>({
      path: `/api/v1/courses/${courseId}/versions/${versionId}/chapters`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description Reorder chapters within a course version. Provide ordered list of chapter IDs (Teacher only)
   *
   * @tags Chapter Management
   * @name ReorderChapters
   * @summary Reorder chapters
   * @request POST:/api/v1/courses/{courseId}/versions/{versionId}/chapters/reorder
   * @secure
   */
  reorderChapters = (
    courseId: number,
    versionId: number,
    data: ChapterReorderRequest,
    params: RequestParams = {},
  ) =>
    this.request<void, any>({
      path: `/api/v1/courses/${courseId}/versions/${versionId}/chapters/reorder`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description Approve a pending course version (Admin only)
   *
   * @tags Course Version Management
   * @name ApproveCourseVersion
   * @summary Approve course version
   * @request POST:/api/v1/courses/{courseId}/versions/{versionId}/approve
   * @secure
   */
  approveCourseVersion = (
    courseId: number,
    versionId: number,
    params: RequestParams = {},
  ) =>
    this.request<CourseVersionResponse, any>({
      path: `/api/v1/courses/${courseId}/versions/${versionId}/approve`,
      method: "POST",
      secure: true,
      ...params,
    });
  /**
   * @description Student creates a review and rating for a course (Student only)
   *
   * @tags Course Review Management
   * @name CreateNewReview
   * @summary Create a new review
   * @request POST:/api/v1/courses/{courseId}/reviews
   * @secure
   */
  createNewReview = (
    courseId: number,
    data: CourseReviewRequest,
    params: RequestParams = {},
  ) =>
    this.request<CourseReviewResponse, any>({
      path: `/api/v1/courses/${courseId}/reviews`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description Student enrolls in a course. For paid courses, payment must be completed first.
   *
   * @tags Enrollment Management
   * @name EnrollCourse
   * @summary Enroll in a course
   * @request POST:/api/v1/courses/{courseId}/enroll
   * @secure
   */
  enrollCourse = (
    courseId: number,
    data: EnrollCourseRequest,
    params: RequestParams = {},
  ) =>
    this.request<EnrollmentDetailResponse, any>({
      path: `/api/v1/courses/${courseId}/enroll`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description Retrieve all comments and Q&A discussions for a specific course
   *
   * @tags Comment Management
   * @name GetCourseComments
   * @summary Get course comments
   * @request GET:/api/v1/courses/{courseId}/comments
   */
  getCourseComments = (courseId: number, params: RequestParams = {}) =>
    this.request<PageResponseCommentResponse, any>({
      path: `/api/v1/courses/${courseId}/comments`,
      method: "GET",
      ...params,
    });
  /**
   * @description Post a comment or Q&A question on a course
   *
   * @tags Comment Management
   * @name CreateCourseComment
   * @summary Create course comment
   * @request POST:/api/v1/courses/{courseId}/comments
   * @secure
   */
  createCourseComment = (
    courseId: number,
    data: CommentCreateRequest,
    params: RequestParams = {},
  ) =>
    this.request<CommentResponse, any>({
      path: `/api/v1/courses/${courseId}/comments`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description Upvote a comment or question
   *
   * @tags Comment Management
   * @name UpvoteComment
   * @summary Upvote comment
   * @request POST:/api/v1/comments/{id}/upvote
   * @secure
   */
  upvoteComment = (id: number, params: RequestParams = {}) =>
    this.request<CommentResponse, any>({
      path: `/api/v1/comments/${id}/upvote`,
      method: "POST",
      secure: true,
      ...params,
    });
  /**
   * @description Show or hide a comment (Teacher moderation)
   *
   * @tags Comment Management
   * @name ToggleVisibility
   * @summary Toggle comment visibility
   * @request POST:/api/v1/comments/{id}/toggle-visibility
   * @secure
   */
  toggleVisibility = (id: number, params: RequestParams = {}) =>
    this.request<CommentResponse, any>({
      path: `/api/v1/comments/${id}/toggle-visibility`,
      method: "POST",
      secure: true,
      ...params,
    });
  /**
   * @description Reply to an existing comment or answer a Q&A question
   *
   * @tags Comment Management
   * @name ReplyToComment
   * @summary Reply to comment
   * @request POST:/api/v1/comments/{id}/reply
   * @secure
   */
  replyToComment = (
    id: number,
    data: CommentCreateRequest,
    params: RequestParams = {},
  ) =>
    this.request<CommentResponse, any>({
      path: `/api/v1/comments/${id}/reply`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description Retrieve all lessons in a specific chapter
   *
   * @tags Lesson Management
   * @name GetLessonsByChapter
   * @summary Get all lessons of a chapter
   * @request GET:/api/v1/chapters/{chapterId}/lessons
   * @secure
   */
  getLessonsByChapter = (chapterId: number, params: RequestParams = {}) =>
    this.request<LessonDTO[], any>({
      path: `/api/v1/chapters/${chapterId}/lessons`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * @description Create a new lesson in a chapter. Only accessible by teachers.
   *
   * @tags Lesson Management
   * @name CreateLesson
   * @summary Create new lesson
   * @request POST:/api/v1/chapters/{chapterId}/lessons
   * @secure
   */
  createLesson = (
    chapterId: number,
    data: CreateLessonRequest,
    params: RequestParams = {},
  ) =>
    this.request<LessonDTO, any>({
      path: `/api/v1/chapters/${chapterId}/lessons`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description Reorder lessons within a chapter. Only accessible by teachers.
   *
   * @tags Lesson Management
   * @name ReorderLessons
   * @summary Reorder lessons
   * @request POST:/api/v1/chapters/{chapterId}/lessons/reorder
   * @secure
   */
  reorderLessons = (
    chapterId: number,
    data: ReorderLessonsRequest,
    params: RequestParams = {},
  ) =>
    this.request<void, any>({
      path: `/api/v1/chapters/${chapterId}/lessons/reorder`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description Download certificate as PDF file. Students can download their own certificates, teachers can download certificates they issued, and admins can download any certificate.
   *
   * @tags Certificate Management
   * @name DownloadCertificate
   * @summary Download certificate
   * @request POST:/api/v1/certificates/{id}/download
   * @secure
   */
  downloadCertificate = (id: number, params: RequestParams = {}) =>
    this.request<File, any>({
      path: `/api/v1/certificates/${id}/download`,
      method: "POST",
      secure: true,
      ...params,
    });
  /**
   * @description Get all active (visible) categories. Public endpoint - no authentication required.
   *
   * @tags Category Management
   * @name GetActiveCategories
   * @summary Get all active categories
   * @request GET:/api/v1/categories
   */
  getActiveCategories = (params: RequestParams = {}) =>
    this.request<
      {
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
      }[],
      any
    >({
      path: `/api/v1/categories`,
      method: "GET",
      ...params,
    });
  /**
   * @description Create a new course category (Admin only)
   *
   * @tags Category Management
   * @name CreateCategory
   * @summary Create a new category
   * @request POST:/api/v1/categories
   * @secure
   */
  createCategory = (data: CategoryRequest, params: RequestParams = {}) =>
    this.request<CategoryResponseDto, any>({
      path: `/api/v1/categories`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description Authenticate user using OAuth2 from Google, Facebook, or GitHub. You can provide either an access token OR an authorization code. If authorization code is provided, it will be exchanged for an access token automatically. If user doesn't exist, a new account will be created automatically. Social accounts skip email verification.
   *
   * @tags Authentication
   * @name SocialLogin
   * @summary Login via social provider
   * @request POST:/api/v1/auth/social/login
   */
  socialLogin = (data: SocialLoginRequest, params: RequestParams = {}) =>
    this.request<ResLoginDTO, any>({
      path: `/api/v1/auth/social/login`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description Resend the email verification link to the specified email address.
   *
   * @tags Authentication
   * @name ResendVerificationEmail
   * @summary Resend email verification link
   * @request POST:/api/v1/auth/resend-verification
   */
  resendVerificationEmail = (
    data: ResendVerifyEmailRequest,
    params: RequestParams = {},
  ) =>
    this.request<void, any>({
      path: `/api/v1/auth/resend-verification`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description Register a new student or teacher account. An email verification link will be sent to the provided email address.
   *
   * @tags Authentication
   * @name RegisterAccount
   * @summary Register a new account
   * @request POST:/api/v1/auth/register
   */
  registerAccount = (data: RegisterRequest, params: RequestParams = {}) =>
    this.request<RegisterResponse, any>({
      path: `/api/v1/auth/register`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description Generate a new access token using a valid refresh token. The old refresh token will be revoked and a new one issued.
   *
   * @tags Authentication
   * @name RefreshAccessToken
   * @summary Refresh access token
   * @request POST:/api/v1/auth/refresh
   */
  refreshAccessToken = (data: ReqRefreshTokenDTO, params: RequestParams = {}) =>
    this.request<ResLoginDTO, any>({
      path: `/api/v1/auth/refresh`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description Reset user password using the token received via email. The token is single-use and expires after 30 minutes.
   *
   * @tags Authentication
   * @name ResetPassword
   * @summary Reset password
   * @request POST:/api/v1/auth/password/reset
   */
  resetPassword = (
    query: {
      /** Password reset token from email */
      token: string;
    },
    data: ResetPasswordDTO,
    params: RequestParams = {},
  ) =>
    this.request<void, any>({
      path: `/api/v1/auth/password/reset`,
      method: "POST",
      query: query,
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description Send a password reset link to the user's email address. If the email exists, a reset link will be sent.
   *
   * @tags Authentication
   * @name ForgotPassword
   * @summary Request password reset
   * @request POST:/api/v1/auth/password/forgot
   */
  forgotPassword = (data: ForgotPasswordDTO, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/v1/auth/password/forgot`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description Revoke the refresh token to logout. This invalidates the refresh token and prevents it from being used again.
   *
   * @tags Authentication
   * @name Logout
   * @summary Logout from the system
   * @request POST:/api/v1/auth/logout
   */
  logout = (data: ReqRefreshTokenDTO, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/v1/auth/logout`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description Authenticate user credentials and receive access token and refresh token for subsequent API calls.
   *
   * @tags Authentication
   * @name Login
   * @summary Login to the system
   * @request POST:/api/v1/auth/login
   */
  login = (data: ReqLoginDTO, params: RequestParams = {}) =>
    this.request<ResLoginDTO, any>({
      path: `/api/v1/auth/login`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description Retrieve all independent assignments from the assignment library/pool that are not linked to any lesson. Only accessible by teachers.
   *
   * @tags Assignment Management
   * @name GetAllIndependentAssignments
   * @summary Get all independent assignments
   * @request GET:/api/v1/assignments
   * @secure
   */
  getAllIndependentAssignments = (params: RequestParams = {}) =>
    this.request<AssignmentResponse[], any>({
      path: `/api/v1/assignments`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * @description Create a new assignment that is not linked to any lesson yet. Follows Association pattern: Assignment exists independently. Only accessible by teachers.
   *
   * @tags Assignment Management
   * @name CreateIndependentAssignment
   * @summary Create independent assignment
   * @request POST:/api/v1/assignments
   * @secure
   */
  createIndependentAssignment = (
    data: AssignmentRequest,
    params: RequestParams = {},
  ) =>
    this.request<AssignmentResponse, any>({
      path: `/api/v1/assignments`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description Submit an assignment for grading. Creates a new submission for the authenticated student. Only accessible by students.
   *
   * @tags Submission Management
   * @name SubmitAssignment
   * @summary Submit assignment
   * @request POST:/api/v1/assignments/{assignmentId}/submit
   * @secure
   */
  submitAssignment = (assignmentId: number, params: RequestParams = {}) =>
    this.request<SubmissionResponse, any>({
      path: `/api/v1/assignments/${assignmentId}/submit`,
      method: "POST",
      secure: true,
      ...params,
    });
  /**
   * @description Create a new submission for an assignment, referencing a previous submission. Only accessible by students.
   *
   * @tags Submission Management
   * @name ResubmitAssignment
   * @summary Resubmit assignment
   * @request POST:/api/v1/assignments/{assignmentId}/resubmit
   * @secure
   */
  resubmitAssignment = (
    assignmentId: number,
    query: {
      /**
       * Previous submission ID
       * @format int64
       * @example 1
       */
      previousSubmissionId: number;
    },
    params: RequestParams = {},
  ) =>
    this.request<SubmissionResponse, any>({
      path: `/api/v1/assignments/${assignmentId}/resubmit`,
      method: "POST",
      query: query,
      secure: true,
      ...params,
    });
  /**
   * @description Retrieve all system configuration settings
   *
   * @tags System Settings
   * @name GetAll
   * @summary Get all system settings
   * @request GET:/api/v1/admin/settings
   * @secure
   */
  getAll = (params: RequestParams = {}) =>
    this.request<SystemSettingResponse[], any>({
      path: `/api/v1/admin/settings`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * @description Create a new system configuration setting with key and value
   *
   * @tags System Settings
   * @name Create1
   * @summary Create a new system setting
   * @request POST:/api/v1/admin/settings
   * @secure
   */
  create1 = (data: SystemSettingRequest, params: RequestParams = {}) =>
    this.request<SystemSettingResponse, any>({
      path: `/api/v1/admin/settings`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description Get all revenue sharing configurations with filters and pagination
   *
   * @tags Revenue Share Configuration
   * @name GetAllRevenueShareConfigs
   * @summary Get all revenue share configs
   * @request GET:/api/v1/admin/revenue-share
   * @secure
   */
  getAllRevenueShareConfigs = (
    query: {
      /** Filter by active status */
      isActive?: boolean;
      /**
       * Filter by category ID
       * @format int64
       */
      categoryId?: number;
      pageable: Pageable;
    },
    params: RequestParams = {},
  ) =>
    this.request<PageResponseRevenueShareConfigResponse, any>({
      path: `/api/v1/admin/revenue-share`,
      method: "GET",
      query: query,
      secure: true,
      ...params,
    });
  /**
   * @description Create a new revenue sharing configuration
   *
   * @tags Revenue Share Configuration
   * @name CreateRevenueShareConfig
   * @summary Create revenue share config
   * @request POST:/api/v1/admin/revenue-share
   * @secure
   */
  createRevenueShareConfig = (
    data: CreateRevenueShareConfigRequest,
    params: RequestParams = {},
  ) =>
    this.request<RevenueShareConfigResponse, any>({
      path: `/api/v1/admin/revenue-share`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description Deactivate a revenue sharing configuration
   *
   * @tags Revenue Share Configuration
   * @name DeactivateRevenueShareConfig
   * @summary Deactivate revenue share config
   * @request POST:/api/v1/admin/revenue-share/{id}/deactivate
   * @secure
   */
  deactivateRevenueShareConfig = (id: number, params: RequestParams = {}) =>
    this.request<RevenueShareConfigResponse, any>({
      path: `/api/v1/admin/revenue-share/${id}/deactivate`,
      method: "POST",
      secure: true,
      ...params,
    });
  /**
   * @description Execute enforcement action (ban user, delete comment, hide course, etc.)
   *
   * @tags Violation Report Management
   * @name TakeAction
   * @summary Take action on report (Admin)
   * @request POST:/api/v1/admin/reports/{id}/take-action
   * @secure
   */
  takeAction = (
    id: number,
    data: ViolationReportTakeActionRequest,
    params: RequestParams = {},
  ) =>
    this.request<ViolationReportDetailResponse, any>({
      path: `/api/v1/admin/reports/${id}/take-action`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description Move report to IN_REVIEW status and add reviewer notes
   *
   * @tags Violation Report Management
   * @name Review
   * @summary Review report (Admin)
   * @request POST:/api/v1/admin/reports/{id}/review
   * @secure
   */
  review = (
    id: number,
    data: ViolationReportReviewRequest,
    params: RequestParams = {},
  ) =>
    this.request<ViolationReportDetailResponse, any>({
      path: `/api/v1/admin/reports/${id}/review`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description Dismiss report as invalid or not violating
   *
   * @tags Violation Report Management
   * @name Dismiss
   * @summary Dismiss report (Admin)
   * @request POST:/api/v1/admin/reports/{id}/dismiss
   * @secure
   */
  dismiss = (
    id: number,
    data: ViolationReportDismissRequest,
    params: RequestParams = {},
  ) =>
    this.request<ViolationReportDetailResponse, any>({
      path: `/api/v1/admin/reports/${id}/dismiss`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description Reject payout request with reason (Admin only)
   *
   * @tags Payout Management
   * @name RejectPayout
   * @summary Reject payout
   * @request POST:/api/v1/admin/payouts/{id}/reject
   * @secure
   */
  rejectPayout = (
    id: number,
    data: RejectPayoutRequest,
    params: RequestParams = {},
  ) =>
    this.request<PayoutResponse, any>({
      path: `/api/v1/admin/payouts/${id}/reject`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description Mark payout as completed with transaction details (Admin only)
   *
   * @tags Payout Management
   * @name CompletePayout
   * @summary Complete payout
   * @request POST:/api/v1/admin/payouts/{id}/complete
   * @secure
   */
  completePayout = (
    id: number,
    data: CompletePayoutRequest,
    params: RequestParams = {},
  ) =>
    this.request<PayoutResponse, any>({
      path: `/api/v1/admin/payouts/${id}/complete`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description Send notifications to multiple users at once (Admin only)
   *
   * @tags Notification Admin
   * @name SendBulk
   * @summary Send bulk notifications
   * @request POST:/api/v1/admin/notifications/send-bulk
   * @secure
   */
  sendBulk = (data: SendBulkNotificationRequest, params: RequestParams = {}) =>
    this.request<Record<string, any>, any>({
      path: `/api/v1/admin/notifications/send-bulk`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description Get list of all notification channels (Admin only)
   *
   * @tags Notification Channel Admin
   * @name List
   * @summary List notification channels
   * @request GET:/api/v1/admin/notification-channels
   * @secure
   */
  list = (params: RequestParams = {}) =>
    this.request<NotificationChannel[], any>({
      path: `/api/v1/admin/notification-channels`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * @description Manually create a notification channel (Admin only)
   *
   * @tags Notification Channel Admin
   * @name Create2
   * @summary Create notification channel
   * @request POST:/api/v1/admin/notification-channels
   * @secure
   */
  create2 = (
    data: NotificationChannelCreateRequest,
    params: RequestParams = {},
  ) =>
    this.request<NotificationChannel, any>({
      path: `/api/v1/admin/notification-channels`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags admin-certificate-controller
   * @name RevokeCertificate
   * @request POST:/api/v1/admin/certificates/{id}/revoke
   */
  revokeCertificate = (
    id: number,
    data: Record<string, string>,
    params: RequestParams = {},
  ) =>
    this.request<CertificateDetailResponse, any>({
      path: `/api/v1/admin/certificates/${id}/revoke`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description Unlock a suspended account with optional reason. Only accessible by administrators.
   *
   * @tags Account Management
   * @name UnlockAccount
   * @summary Unlock suspended account (Admin only)
   * @request POST:/api/v1/admin/accounts/{id}/unlock
   * @secure
   */
  unlockAccount = (
    id: number,
    data: AccountActionRequest,
    params: RequestParams = {},
  ) =>
    this.request<ApiResponseObject, any>({
      path: `/api/v1/admin/accounts/${id}/unlock`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description Suspend an active account with optional reason. Only accessible by administrators.
   *
   * @tags Account Management
   * @name SuspendAccount
   * @summary Suspend account (Admin only)
   * @request POST:/api/v1/admin/accounts/{id}/suspend
   * @secure
   */
  suspendAccount = (
    id: number,
    data: AccountActionRequest,
    params: RequestParams = {},
  ) =>
    this.request<ApiResponseObject, any>({
      path: `/api/v1/admin/accounts/${id}/suspend`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description Deactivate an active account with optional reason. Only accessible by administrators.
   *
   * @tags Account Management
   * @name DeactivateAccount
   * @summary Deactivate account (Admin only)
   * @request POST:/api/v1/admin/accounts/{id}/deactivate
   * @secure
   */
  deactivateAccount = (
    id: number,
    data: AccountActionRequest,
    params: RequestParams = {},
  ) =>
    this.request<ApiResponseObject, any>({
      path: `/api/v1/admin/accounts/${id}/deactivate`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description Import multiple students from Excel file. The file should follow the template format. Returns a detailed report with success/failure counts and error details for failed rows. Successfully imported students will receive verification emails.
   *
   * @tags Account Management
   * @name ImportStudents
   * @summary Bulk import students
   * @request POST:/api/v1/admin/accounts/import
   * @secure
   */
  importStudents = (
    data: {
      /**
       * Excel file (.xlsx) with student data
       * @format binary
       */
      file: File;
    },
    params: RequestParams = {},
  ) =>
    this.request<ImportResultResponse, any>({
      path: `/api/v1/admin/accounts/import`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.FormData,
      ...params,
    });
  /**
   * @description Upload a new avatar image for the authenticated user. Accepts JPG, PNG, and WEBP formats.
   *
   * @tags Account Management
   * @name UploadAvatar2
   * @summary Upload user avatar
   * @request POST:/api/v1/accounts/me/avatar
   * @secure
   */
  uploadAvatar2 = (
    data: {
      /**
       * Avatar image file (JPG, PNG, WEBP)
       * @format binary
       */
      file: File;
    },
    params: RequestParams = {},
  ) =>
    this.request<UploadAvatarResponse, any>({
      path: `/api/v1/accounts/me/avatar`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.FormData,
      ...params,
    });
  /**
   * @description Restore a soft-deleted course (Teacher only)
   *
   * @tags Course Management
   * @name RestoreCourse
   * @summary Restore a deleted course
   * @request PATCH:/api/v1/teacher/courses/{id}/restore
   * @secure
   */
  restoreCourse = (id: number, params: RequestParams = {}) =>
    this.request<CourseDetailResponse, any>({
      path: `/api/v1/teacher/courses/${id}/restore`,
      method: "PATCH",
      secure: true,
      ...params,
    });
  /**
   * @description Open enrollment for a course (Teacher only)
   *
   * @tags Course Management
   * @name OpenCourse
   * @summary Open a course
   * @request PATCH:/api/v1/teacher/courses/{id}/open
   * @secure
   */
  openCourse = (id: number, params: RequestParams = {}) =>
    this.request<CourseDetailResponse, any>({
      path: `/api/v1/teacher/courses/${id}/open`,
      method: "PATCH",
      secure: true,
      ...params,
    });
  /**
   * @description Close enrollment for a course (Teacher only)
   *
   * @tags Course Management
   * @name CloseCourse
   * @summary Close a course
   * @request PATCH:/api/v1/teacher/courses/{id}/close
   * @secure
   */
  closeCourse = (id: number, params: RequestParams = {}) =>
    this.request<CourseDetailResponse, any>({
      path: `/api/v1/teacher/courses/${id}/close`,
      method: "PATCH",
      secure: true,
      ...params,
    });
  /**
   * @description Restore a soft-deleted tag (Admin only)
   *
   * @tags Tag Management
   * @name RestoreTag
   * @summary Restore a deleted tag
   * @request PATCH:/api/v1/tags/{id}/restore
   * @secure
   */
  restoreTag = (id: number, params: RequestParams = {}) =>
    this.request<Tag, any>({
      path: `/api/v1/tags/${id}/restore`,
      method: "PATCH",
      secure: true,
      ...params,
    });
  /**
   * @description Restore a soft-deleted category (Admin only)
   *
   * @tags Category Management
   * @name RestoreCategory
   * @summary Restore a deleted category
   * @request PATCH:/api/v1/categories/{id}/restore
   * @secure
   */
  restoreCategory = (id: number, params: RequestParams = {}) =>
    this.request<CategoryResponseDto, any>({
      path: `/api/v1/categories/${id}/restore`,
      method: "PATCH",
      secure: true,
      ...params,
    });
  /**
   * @description Update the status of an account (e.g., ACTIVE, SUSPENDED, DEACTIVATED). Only accessible by administrators.
   *
   * @tags Account Management
   * @name ChangeAccountStatus
   * @summary Change account status (Admin only)
   * @request PATCH:/api/v1/admin/accounts/{id}/status
   * @secure
   */
  changeAccountStatus = (
    id: number,
    data: UpdateStatusRequest,
    params: RequestParams = {},
  ) =>
    this.request<ApiResponseObject, any>({
      path: `/api/v1/admin/accounts/${id}/status`,
      method: "PATCH",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description Get overall revenue for a specific teacher
   *
   * @tags Revenue Management
   * @name GetTeacherRevenue
   * @summary Get teacher revenue
   * @request GET:/api/v1/teachers/{teacherId}/revenue
   * @secure
   */
  getTeacherRevenue = (teacherId: number, params: RequestParams = {}) =>
    this.request<TeacherRevenueResponse, any>({
      path: `/api/v1/teachers/${teacherId}/revenue`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * @description Get monthly revenue for a specific period and teacher
   *
   * @tags Revenue Management
   * @name GetMonthlyRevenue
   * @summary Get monthly revenue
   * @request GET:/api/v1/teachers/{teacherId}/revenue/monthly
   * @secure
   */
  getMonthlyRevenue = (
    teacherId: number,
    query?: {
      /**
       * Period in YYYY-MM format
       * @example "2025-12"
       */
      period?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<MonthlyRevenueResponse, any>({
      path: `/api/v1/teachers/${teacherId}/revenue/monthly`,
      method: "GET",
      query: query,
      secure: true,
      ...params,
    });
  /**
   * @description Get detailed revenue breakdown by courses for a specific teacher
   *
   * @tags Revenue Management
   * @name GetRevenueBreakdown
   * @summary Get revenue breakdown
   * @request GET:/api/v1/teachers/{teacherId}/revenue/breakdown
   * @secure
   */
  getRevenueBreakdown = (teacherId: number, params: RequestParams = {}) =>
    this.request<RevenueBreakdownResponse, any>({
      path: `/api/v1/teachers/${teacherId}/revenue/breakdown`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * @description Get payout history for a specific teacher (Admin only)
   *
   * @tags Payout Management
   * @name GetTeacherPayouts
   * @summary Get teacher payouts
   * @request GET:/api/v1/teachers/{teacherId}/payouts
   * @secure
   */
  getTeacherPayouts = (teacherId: number, params: RequestParams = {}) =>
    this.request<PayoutResponse[], any>({
      path: `/api/v1/teachers/${teacherId}/payouts`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * @description Get all payment transactions for a specific teacher
   *
   * @tags Revenue Management
   * @name GetTeacherPaymentTransactions
   * @summary Get teacher payment transactions
   * @request GET:/api/v1/teachers/{teacherId}/payment-transactions
   * @secure
   */
  getTeacherPaymentTransactions = (
    teacherId: number,
    params: RequestParams = {},
  ) =>
    this.request<PaymentTransactionResponse[], any>({
      path: `/api/v1/teachers/${teacherId}/payment-transactions`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * @description Retrieve a paginated list of students enrolled in the teacher's courses. Teachers can only view their own students, admins can view any teacher's students.
   *
   * @tags Teacher Management
   * @name GetTeacherStudents
   * @summary Get teacher's students
   * @request GET:/api/v1/teachers/{id}/students
   * @secure
   */
  getTeacherStudents = (
    id: number,
    query: {
      /** Pagination parameters */
      pageable: Pageable;
    },
    params: RequestParams = {},
  ) =>
    this.request<PageResponseStudentResponse, any>({
      path: `/api/v1/teachers/${id}/students`,
      method: "GET",
      query: query,
      secure: true,
      ...params,
    });
  /**
   * @description Retrieve overall statistics including course count, student count, average rating, and total reviews. Teachers can view their own stats, admins can view any teacher's stats.
   *
   * @tags Teacher Management
   * @name GetTeacherStats
   * @summary Get teacher's statistics
   * @request GET:/api/v1/teachers/{id}/stats
   * @secure
   */
  getTeacherStats = (id: number, params: RequestParams = {}) =>
    this.request<TeacherStatsResponse, any>({
      path: `/api/v1/teachers/${id}/stats`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * @description Retrieve revenue statistics including total revenue, monthly revenue, and breakdown by course. Teachers can only view their own revenue, admins can view any teacher's revenue.
   *
   * @tags Teacher Management
   * @name GetTeacherRevenue1
   * @summary Get teacher's revenue statistics
   * @request GET:/api/v1/teachers/{id}/revenue
   * @secure
   */
  getTeacherRevenue1 = (id: number, params: RequestParams = {}) =>
    this.request<TeacherRevenueResponse, any>({
      path: `/api/v1/teachers/${id}/revenue`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * @description Retrieve a paginated list of courses created by the teacher. Teachers can view their own courses, students can view published courses by approved teachers, and admins can view all.
   *
   * @tags Teacher Management
   * @name GetTeacherCourses
   * @summary Get teacher's courses
   * @request GET:/api/v1/teachers/{id}/courses
   * @secure
   */
  getTeacherCourses = (
    id: number,
    query: {
      /** Pagination parameters */
      pageable: Pageable;
    },
    params: RequestParams = {},
  ) =>
    this.request<PageResponseCourseResponse, any>({
      path: `/api/v1/teachers/${id}/courses`,
      method: "GET",
      query: query,
      secure: true,
      ...params,
    });
  /**
   * @description Retrieve detailed information about a teacher by their teacher code. Teachers can only view their own profile, students can view approved teachers, and admins can view any teacher.
   *
   * @tags Teacher Management
   * @name GetTeacherByCode
   * @summary Get teacher by code
   * @request GET:/api/v1/teachers/code/{code}
   * @secure
   */
  getTeacherByCode = (code: string, params: RequestParams = {}) =>
    this.request<TeacherDetailResponse, any>({
      path: `/api/v1/teachers/code/${code}`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * @description Get comprehensive analytics for a course including total students, average rating, completion rate, and revenue. (Teacher only - requires ownership)
   *
   * @tags Course Management
   * @name GetCourseStatistics
   * @summary Get course statistics
   * @request GET:/api/v1/teacher/courses/{id}/stats
   * @secure
   */
  getCourseStatistics = (id: number, params: RequestParams = {}) =>
    this.request<CourseStatsResponse, any>({
      path: `/api/v1/teacher/courses/${id}/stats`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * @description Search tags by name prefix. Public endpoint - no authentication required.
   *
   * @tags Tag Management
   * @name SearchTags
   * @summary Search tags by name
   * @request GET:/api/v1/tags/search
   */
  searchTags = (
    query: {
      /**
       * Search query
       * @example "Java"
       */
      query: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<Tag[], any>({
      path: `/api/v1/tags/search`,
      method: "GET",
      query: query,
      ...params,
    });
  /**
   * @description Get top tags used in most courses. Public endpoint for trending/popular tags section.
   *
   * @tags Tag Management
   * @name GetPopularTags
   * @summary Get popular tags
   * @request GET:/api/v1/tags/popular
   */
  getPopularTags = (
    query?: {
      /**
       * Maximum number of tags to return
       * @format int32
       * @default 10
       * @example 10
       */
      limit?: number;
    },
    params: RequestParams = {},
  ) =>
    this.request<TagStatsResponse[], any>({
      path: `/api/v1/tags/popular`,
      method: "GET",
      query: query,
      ...params,
    });
  /**
   * @description Get paginated list of all tags including deleted (Admin only)
   *
   * @tags Tag Management
   * @name GetAllTags
   * @summary Get all tags (Admin)
   * @request GET:/api/v1/tags/admin
   * @secure
   */
  getAllTags = (
    query: {
      /** Pagination parameters */
      pageable: Pageable;
    },
    params: RequestParams = {},
  ) =>
    this.request<PageResponseTag, any>({
      path: `/api/v1/tags/admin`,
      method: "GET",
      query: query,
      secure: true,
      ...params,
    });
  /**
   * @description Get statistics for all tags including course count (Admin only)
   *
   * @tags Tag Management
   * @name GetTagStatistics
   * @summary Get tag statistics
   * @request GET:/api/v1/tags/admin/stats
   * @secure
   */
  getTagStatistics = (params: RequestParams = {}) =>
    this.request<TagStatsResponse[], any>({
      path: `/api/v1/tags/admin/stats`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * @description Get a download URL for a specific file from a submission. Accessible by students and teachers.
   *
   * @tags Submission File Management
   * @name GetDownloadUrl
   * @summary Get file download URL
   * @request GET:/api/v1/submissions/{submissionId}/files/{fileId}/download
   * @secure
   */
  getDownloadUrl = (
    submissionId: number,
    fileId: number,
    params: RequestParams = {},
  ) =>
    this.request<Record<string, string>, any>({
      path: `/api/v1/submissions/${submissionId}/files/${fileId}/download`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * @description Get the total number of files attached to a submission. Accessible by students and teachers.
   *
   * @tags Submission File Management
   * @name GetFileCount
   * @summary Get file count for submission
   * @request GET:/api/v1/submissions/{submissionId}/files/count
   * @secure
   */
  getFileCount = (submissionId: number, params: RequestParams = {}) =>
    this.request<number, any>({
      path: `/api/v1/submissions/${submissionId}/files/count`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * @description Retrieve detailed information about a specific submission. Accessible by students and teachers.
   *
   * @tags Submission Management
   * @name GetSubmission
   * @summary Get submission by ID
   * @request GET:/api/v1/submissions/{id}
   * @secure
   */
  getSubmission = (id: number, params: RequestParams = {}) =>
    this.request<SubmissionResponse, any>({
      path: `/api/v1/submissions/${id}`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * @description Delete a submission before it has been graded. Only accessible by students.
   *
   * @tags Submission Management
   * @name DeleteSubmission
   * @summary Delete submission
   * @request DELETE:/api/v1/submissions/{id}
   * @secure
   */
  deleteSubmission = (id: number, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/v1/submissions/${id}`,
      method: "DELETE",
      secure: true,
      ...params,
    });
  /**
   * @description Retrieve all submissions made by a specific student. Accessible by students and teachers.
   *
   * @tags Submission Management
   * @name GetStudentSubmissions
   * @summary Get student submissions
   * @request GET:/api/v1/students/{studentId}/submissions
   * @secure
   */
  getStudentSubmissions = (studentId: number, params: RequestParams = {}) =>
    this.request<SubmissionResponse[], any>({
      path: `/api/v1/students/${studentId}/submissions`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * @description Retrieve personalized course recommendations for a specific student based on their learning history and preferences
   *
   * @tags Recommendation Management
   * @name GetRecommendations
   * @summary Get course recommendations for a student
   * @request GET:/api/v1/students/{studentId}/recommendations
   * @secure
   */
  getRecommendations = (studentId: number, params: RequestParams = {}) =>
    this.request<RecommendationLogDto[], any>({
      path: `/api/v1/students/${studentId}/recommendations`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * @description Retrieve all attempts made by a student for a specific quiz. Accessible by students and teachers.
   *
   * @tags Quiz Attempt Management
   * @name GetStudentQuizAttemptsByQuiz
   * @summary Get student attempts for a specific quiz
   * @request GET:/api/v1/students/{studentId}/quizzes/{quizId}/attempts
   */
  getStudentQuizAttemptsByQuiz = (
    studentId: number,
    quizId: number,
    params: RequestParams = {},
  ) =>
    this.request<QuizAttemptResponse[], any>({
      path: `/api/v1/students/${studentId}/quizzes/${quizId}/attempts`,
      method: "GET",
      ...params,
    });
  /**
   * @description Retrieve all quiz attempts made by a specific student.
   *
   * @tags Quiz Attempt Management
   * @name GetStudentQuizAttempts
   * @summary Get student quiz attempts
   * @request GET:/api/v1/students/{studentId}/quiz-attempts
   */
  getStudentQuizAttempts = (studentId: number, params: RequestParams = {}) =>
    this.request<QuizAttemptResponse[], any>({
      path: `/api/v1/students/${studentId}/quiz-attempts`,
      method: "GET",
      ...params,
    });
  /**
   * @description Get overall learning progress summary for a student across all enrolled courses
   *
   * @tags Progress Management
   * @name GetStudentProgress
   * @summary Get student overall progress
   * @request GET:/api/v1/students/{studentId}/progress
   * @secure
   */
  getStudentProgress = (studentId: number, params: RequestParams = {}) =>
    this.request<StudentProgressOverviewResponse, any>({
      path: `/api/v1/students/${studentId}/progress`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * @description Get progress information for a student in a specific lesson
   *
   * @tags Progress Management
   * @name GetStudentLessonProgress
   * @summary Get student lesson progress
   * @request GET:/api/v1/students/{studentId}/lessons/{lessonId}/progress
   * @secure
   */
  getStudentLessonProgress = (
    studentId: number,
    lessonId: number,
    params: RequestParams = {},
  ) =>
    this.request<LessonProgressResponse, any>({
      path: `/api/v1/students/${studentId}/lessons/${lessonId}/progress`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * @description Retrieve all late submissions for a specific student. Only accessible by teachers.
   *
   * @tags Submission Management
   * @name GetLateSubmissionsByStudent
   * @summary Get late submissions by student
   * @request GET:/api/v1/students/{studentId}/late-submissions
   * @secure
   */
  getLateSubmissionsByStudent = (
    studentId: number,
    params: RequestParams = {},
  ) =>
    this.request<SubmissionResponse[], any>({
      path: `/api/v1/students/${studentId}/late-submissions`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * @description Get list of all courses enrolled by a student
   *
   * @tags Enrollment Management
   * @name GetStudentEnrollments
   * @summary Get student enrollments
   * @request GET:/api/v1/students/{studentId}/enrollments
   * @secure
   */
  getStudentEnrollments = (studentId: number, params: RequestParams = {}) =>
    this.request<PageResponseEnrollmentResponse, any>({
      path: `/api/v1/students/${studentId}/enrollments`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * @description Get detailed progress for a student in a specific course, including all chapters and lessons
   *
   * @tags Progress Management
   * @name GetStudentCourseProgress
   * @summary Get student course progress
   * @request GET:/api/v1/students/{studentId}/courses/{courseId}/progress
   * @secure
   */
  getStudentCourseProgress = (
    studentId: number,
    courseId: number,
    params: RequestParams = {},
  ) =>
    this.request<CourseProgressResponse, any>({
      path: `/api/v1/students/${studentId}/courses/${courseId}/progress`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * @description Get paginated list of all certificates earned by a student. Students can view their own certificates, teachers can view certificates for students in their courses, and admins can view any student's certificates.
   *
   * @tags Certificate Management
   * @name GetStudentCertificates
   * @summary Get student certificates
   * @request GET:/api/v1/students/{studentId}/certificates
   * @secure
   */
  getStudentCertificates = (studentId: number, params: RequestParams = {}) =>
    this.request<PageResponseCertificateResponse, any>({
      path: `/api/v1/students/${studentId}/certificates`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * @description Calculate and retrieve the average score across all submissions for a student. Accessible by students and teachers.
   *
   * @tags Submission Management
   * @name GetStudentAverageScore
   * @summary Get student average score
   * @request GET:/api/v1/students/{studentId}/average-score
   * @secure
   */
  getStudentAverageScore = (studentId: number, params: RequestParams = {}) =>
    this.request<number, any>({
      path: `/api/v1/students/${studentId}/average-score`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * @description Retrieve detailed learning progress including course completion, quiz scores, and overall statistics. Students can only view their own progress, teachers can view students in their courses, and admins can view any student's progress.
   *
   * @tags Student Management
   * @name GetStudentProgress1
   * @summary Get student's learning progress
   * @request GET:/api/v1/students/{id}/progress
   * @secure
   */
  getStudentProgress1 = (id: number, params: RequestParams = {}) =>
    this.request<StudentProgressResponse, any>({
      path: `/api/v1/students/${id}/progress`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * @description Retrieve a paginated list of courses that the student is enrolled in. Students can only view their own courses, teachers can view students in their courses, and admins can view any student's courses.
   *
   * @tags Student Management
   * @name GetStudentCourses
   * @summary Get student's courses
   * @request GET:/api/v1/students/{id}/courses
   * @secure
   */
  getStudentCourses = (
    id: number,
    query: {
      /** Pagination parameters */
      pageable: Pageable;
    },
    params: RequestParams = {},
  ) =>
    this.request<PageResponseStudentCourseResponse, any>({
      path: `/api/v1/students/${id}/courses`,
      method: "GET",
      query: query,
      secure: true,
      ...params,
    });
  /**
   * @description Retrieve a paginated list of certificates earned by the student. Students can only view their own certificates, teachers can view certificates for their courses, and admins can view any student's certificates.
   *
   * @tags Student Management
   * @name GetStudentCertificates1
   * @summary Get student's certificates
   * @request GET:/api/v1/students/{id}/certificates
   * @secure
   */
  getStudentCertificates1 = (
    id: number,
    query: {
      /** Pagination parameters */
      pageable: Pageable;
    },
    params: RequestParams = {},
  ) =>
    this.request<PageResponseStudentCertificateResponse, any>({
      path: `/api/v1/students/${id}/certificates`,
      method: "GET",
      query: query,
      secure: true,
      ...params,
    });
  /**
   * @description Retrieve detailed information about a student by their student code. Students can only view their own profile, teachers can view students in their courses, and admins can view any student.
   *
   * @tags Student Management
   * @name GetStudentByCode
   * @summary Get student by code
   * @request GET:/api/v1/students/code/{code}
   * @secure
   */
  getStudentByCode = (code: string, params: RequestParams = {}) =>
    this.request<StudentDetailResponse, any>({
      path: `/api/v1/students/code/${code}`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * @description Get detailed information about a specific lesson. Preview lessons can be accessed without enrollment. Non-preview lessons require active enrollment.
   *
   * @tags Student Course Access
   * @name GetLessonDetails
   * @summary Get lesson details for enrolled student
   * @request GET:/api/v1/student/lessons/{lessonId}
   * @secure
   */
  getLessonDetails = (lessonId: number, params: RequestParams = {}) =>
    this.request<LessonDTO, any>({
      path: `/api/v1/student/lessons/${lessonId}`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * @description Get HLS streaming URL for a lesson's video. Preview lessons can be streamed without enrollment. Non-preview lessons require active enrollment. Returns a data URI with presigned URLs for HLS segments (valid for 1 hour).
   *
   * @tags Student Course Access
   * @name GetVideoStreamingUrl
   * @summary Get video streaming URL for enrolled student
   * @request GET:/api/v1/student/lessons/{lessonId}/video/stream
   * @secure
   */
  getVideoStreamingUrl = (lessonId: number, params: RequestParams = {}) =>
    this.request<Record<string, string>, any>({
      path: `/api/v1/student/lessons/${lessonId}/video/stream`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * @description Get all resources (files, links, embeds) attached to a lesson. Preview lessons are accessible without enrollment. Non-preview lessons require active enrollment. Returns resources with download URLs (valid for 1 hour).
   *
   * @tags Student Course Access
   * @name GetLessonResources1
   * @summary Get all resources for a lesson
   * @request GET:/api/v1/student/lessons/{lessonId}/resources
   * @secure
   */
  getLessonResources1 = (lessonId: number, params: RequestParams = {}) =>
    this.request<LessonResourceResponse[], any>({
      path: `/api/v1/student/lessons/${lessonId}/resources`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * @description Get detailed information about a specific lesson resource. Includes download URL for file resources (valid for 1 hour). Preview lessons are accessible without enrollment. Non-preview lessons require active enrollment.
   *
   * @tags Student Course Access
   * @name GetResourceDetails
   * @summary Get specific resource details
   * @request GET:/api/v1/student/lessons/{lessonId}/resources/{resourceId}
   * @secure
   */
  getResourceDetails = (
    lessonId: number,
    resourceId: number,
    params: RequestParams = {},
  ) =>
    this.request<LessonResourceResponse, any>({
      path: `/api/v1/student/lessons/${lessonId}/resources/${resourceId}`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * @description Get the complete structure of an enrolled course including all chapters and lessons. Requires active enrollment. Returns hierarchical data: Course -> Chapters -> Lessons.
   *
   * @tags Student Course Access
   * @name GetCourseStructure
   * @summary Get complete course structure
   * @request GET:/api/v1/student/courses/{courseId}/structure
   * @secure
   */
  getCourseStructure = (courseId: number, params: RequestParams = {}) =>
    this.request<Record<string, any>, any>({
      path: `/api/v1/student/courses/${courseId}/structure`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * @description Get all chapters from the published version of a course the student is enrolled in. Requires active enrollment.
   *
   * @tags Student Course Access
   * @name GetEnrolledCourseChapters
   * @summary Get all chapters in enrolled course
   * @request GET:/api/v1/student/courses/{courseId}/chapters
   * @secure
   */
  getEnrolledCourseChapters = (courseId: number, params: RequestParams = {}) =>
    this.request<ChapterDto[], any>({
      path: `/api/v1/student/courses/${courseId}/chapters`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * @description Get detailed information about a specific chapter. Requires enrollment in the course containing this chapter.
   *
   * @tags Student Course Access
   * @name GetChapterDetails
   * @summary Get chapter details for enrolled student
   * @request GET:/api/v1/student/chapters/{chapterId}
   * @secure
   */
  getChapterDetails = (chapterId: number, params: RequestParams = {}) =>
    this.request<ChapterDto, any>({
      path: `/api/v1/student/chapters/${chapterId}`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * @description Get all lessons in a chapter for enrolled student. Requires enrollment in the course containing this chapter.
   *
   * @tags Student Course Access
   * @name GetChapterLessons
   * @summary Get all lessons in a chapter
   * @request GET:/api/v1/student/chapters/{chapterId}/lessons
   * @secure
   */
  getChapterLessons = (chapterId: number, params: RequestParams = {}) =>
    this.request<LessonDTO[], any>({
      path: `/api/v1/student/chapters/${chapterId}/lessons`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * @description Get detailed information about a specific report
   *
   * @tags Violation Report Management
   * @name GetDetail
   * @summary Get report details
   * @request GET:/api/v1/reports/{id}
   * @secure
   */
  getDetail = (id: number, params: RequestParams = {}) =>
    this.request<ViolationReportDetailResponse, any>({
      path: `/api/v1/reports/${id}`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * @description Retrieve all questions in a quiz. Returns an ordered list of quiz questions with their details.
   *
   * @tags Quiz Management
   * @name GetQuizQuestions
   * @summary Get quiz questions
   * @request GET:/api/v1/quizzes/{quizId}/questions
   * @secure
   */
  getQuizQuestions = (quizId: number, params: RequestParams = {}) =>
    this.request<QuizQuestionResponse[], any>({
      path: `/api/v1/quizzes/${quizId}/questions`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * @description Retrieve details of a specific quiz attempt including questions and current progress.
   *
   * @tags Quiz Attempt Management
   * @name GetQuizAttempt
   * @summary Get quiz attempt details
   * @request GET:/api/v1/quizzes/{quizId}/attempts/{attemptId}
   */
  getQuizAttempt = (
    quizId: number,
    attemptId: number,
    params: RequestParams = {},
  ) =>
    this.request<QuizAttemptResponse, any>({
      path: `/api/v1/quizzes/${quizId}/attempts/${attemptId}`,
      method: "GET",
      ...params,
    });
  /**
   * @description Get detailed statistics for a quiz including average score, completion rate, and performance metrics. Only accessible by teachers.
   *
   * @tags Quiz Management
   * @name GetQuizStatistics
   * @summary Get quiz statistics
   * @request GET:/api/v1/quizzes/{id}/statistics
   * @secure
   */
  getQuizStatistics = (id: number, params: RequestParams = {}) =>
    this.request<QuizStatisticsResponse, any>({
      path: `/api/v1/quizzes/${id}/statistics`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * @description Retrieve aggregated results for all attempts of a specific quiz.
   *
   * @tags Quiz Attempt Management
   * @name GetQuizResults
   * @summary Get quiz results
   * @request GET:/api/v1/quizzes/{id}/results
   */
  getQuizResults = (id: number, params: RequestParams = {}) =>
    this.request<QuizAttemptResponse[], any>({
      path: `/api/v1/quizzes/${id}/results`,
      method: "GET",
      ...params,
    });
  /**
   * @description Get the total number of questions in a quiz.
   *
   * @tags Quiz Management
   * @name GetQuestionCount
   * @summary Get question count
   * @request GET:/api/v1/quizzes/{id}/question-count
   * @secure
   */
  getQuestionCount = (id: number, params: RequestParams = {}) =>
    this.request<number, any>({
      path: `/api/v1/quizzes/${id}/question-count`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * @description Get quiz details optimized for student view when taking the quiz. Only accessible by students.
   *
   * @tags Quiz Management
   * @name GetQuizForTaking
   * @summary Get quiz for taking
   * @request GET:/api/v1/quizzes/{id}/for-taking
   * @secure
   */
  getQuizForTaking = (id: number, params: RequestParams = {}) =>
    this.request<QuizResponse, any>({
      path: `/api/v1/quizzes/${id}/for-taking`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * @description Check if the student is eligible to take the quiz based on prerequisites, time restrictions, and attempt limits. Only accessible by students.
   *
   * @tags Quiz Management
   * @name CheckEligibility
   * @summary Check quiz eligibility
   * @request GET:/api/v1/quizzes/{id}/eligibility
   * @secure
   */
  checkEligibility = (id: number, params: RequestParams = {}) =>
    this.request<QuizEligibilityResponse, any>({
      path: `/api/v1/quizzes/${id}/eligibility`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * @description Retrieve a list of all quiz IDs that are currently using this question. Only accessible by teachers.
   *
   * @tags Question Management
   * @name GetQuizzesUsingQuestion
   * @summary Get quizzes using question
   * @request GET:/api/v1/questions/{id}/quizzes
   * @secure
   */
  getQuizzesUsingQuestion = (id: number, params: RequestParams = {}) =>
    this.request<Record<string, number[]>, any>({
      path: `/api/v1/questions/${id}/quizzes`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * @description Check if a question is currently being used in any quizzes. Only accessible by teachers.
   *
   * @tags Question Management
   * @name CheckQuestionInUse
   * @summary Check if question is in use
   * @request GET:/api/v1/questions/{id}/in-use
   * @secure
   */
  checkQuestionInUse = (id: number, params: RequestParams = {}) =>
    this.request<Record<string, boolean>, any>({
      path: `/api/v1/questions/${id}/in-use`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * @description Retrieve all question banks from the system. Only accessible by teachers.
   *
   * @tags Question Bank Management
   * @name GetAllQuestionBanks1
   * @summary Get all question banks
   * @request GET:/api/v1/question-banks
   * @secure
   */
  getAllQuestionBanks1 = (params: RequestParams = {}) =>
    this.request<QuestionBankResponse[], any>({
      path: `/api/v1/question-banks`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * @description Search for questions by keyword within a specific question bank. Only accessible by teachers.
   *
   * @tags Question Management
   * @name SearchQuestions
   * @summary Search questions in a question bank
   * @request GET:/api/v1/question-banks/{bankId}/questions/search
   * @secure
   */
  searchQuestions = (
    bankId: number,
    query: {
      /**
       * Search keyword
       * @example "equation"
       */
      keyword: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<QuestionResponse[], any>({
      path: `/api/v1/question-banks/${bankId}/questions/search`,
      method: "GET",
      query: query,
      secure: true,
      ...params,
    });
  /**
   * @description Get the total number of questions in a question bank. Only accessible by teachers.
   *
   * @tags Question Management
   * @name GetQuestionCount1
   * @summary Get question count
   * @request GET:/api/v1/question-banks/{bankId}/questions/count
   * @secure
   */
  getQuestionCount1 = (bankId: number, params: RequestParams = {}) =>
    this.request<Record<string, number>, any>({
      path: `/api/v1/question-banks/${bankId}/questions/count`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * @description Retrieve all questions of a specific type (e.g., MULTIPLE_CHOICE, TRUE_FALSE) from a question bank. Only accessible by teachers.
   *
   * @tags Question Management
   * @name GetQuestionsByType
   * @summary Get questions by type
   * @request GET:/api/v1/question-banks/{bankId}/questions/by-type
   * @secure
   */
  getQuestionsByType = (
    bankId: number,
    query: {
      /**
       * Question types
       * @example "MULTIPLE_CHOICE"
       */
      type:
        | "MULTIPLE_CHOICE"
        | "MULTI_SELECT"
        | "ESSAY"
        | "FILL_BLANK"
        | "TRUE_FALSE";
    },
    params: RequestParams = {},
  ) =>
    this.request<QuestionResponse[], any>({
      path: `/api/v1/question-banks/${bankId}/questions/by-type`,
      method: "GET",
      query: query,
      secure: true,
      ...params,
    });
  /**
   * @description Search for question banks by keyword in title or description. Only accessible by teachers.
   *
   * @tags Question Bank Management
   * @name SearchQuestionBanks
   * @summary Search question banks
   * @request GET:/api/v1/question-banks/search
   * @secure
   */
  searchQuestionBanks = (
    query: {
      /**
       * Search keyword
       * @example "Math"
       */
      keyword: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<QuestionBankResponse[], any>({
      path: `/api/v1/question-banks/search`,
      method: "GET",
      query: query,
      secure: true,
      ...params,
    });
  /**
   * @description Get teacher profile including bio, total students, average rating, and list of published courses. Perfect for 'About the Instructor' section on course landing page.
   *
   * @tags Course Preview
   * @name GetTeacherPublicProfile
   * @summary Get public teacher profile
   * @request GET:/api/v1/public/teachers/{teacherId}/profile
   */
  getTeacherPublicProfile = (teacherId: number, params: RequestParams = {}) =>
    this.request<PublicTeacherProfileResponse, any>({
      path: `/api/v1/public/teachers/${teacherId}/profile`,
      method: "GET",
      ...params,
    });
  /**
   * @description Get streaming URL for a preview lesson video. Only works for lessons marked as preview (isPreview=true). No authentication required for preview lessons.
   *
   * @tags Course Preview
   * @name GetPreviewVideoStreamUrl
   * @summary Get preview lesson video streaming URL
   * @request GET:/api/v1/public/lessons/{lessonId}/preview/stream-url
   */
  getPreviewVideoStreamUrl = (lessonId: number, params: RequestParams = {}) =>
    this.request<PreviewVideoUrlResponse, any>({
      path: `/api/v1/public/lessons/${lessonId}/preview/stream-url`,
      method: "GET",
      ...params,
    });
  /**
   * @description Get all courses that have at least one published version. No authentication required. Supports filtering and search.
   *
   * @tags Course Management
   * @name GetPublishedCourses
   * @summary Get all published courses (Public)
   * @request GET:/api/v1/public/courses
   */
  getPublishedCourses = (
    query: {
      /** Pagination parameters */
      pageable: Pageable;
    },
    params: RequestParams = {},
  ) =>
    this.request<PageResponseCourseResponse, any>({
      path: `/api/v1/public/courses`,
      method: "GET",
      query: query,
      ...params,
    });
  /**
   * @description Get detailed information about a published course by its slug. Shows only published version info. No authentication required.
   *
   * @tags Course Management
   * @name GetPublishedCourseBySlug
   * @summary Get published course by slug (Public)
   * @request GET:/api/v1/public/courses/{slug}
   */
  getPublishedCourseBySlug = (slug: string, params: RequestParams = {}) =>
    this.request<CourseDetailResponse, any>({
      path: `/api/v1/public/courses/${slug}`,
      method: "GET",
      ...params,
    });
  /**
   * @description Get detailed preview of a published course including chapters and preview lessons. Only published version is shown. Lessons marked as preview can be accessed without enrollment.
   *
   * @tags Course Preview
   * @name GetCoursePreview
   * @summary Get public course preview by slug
   * @request GET:/api/v1/public/courses/{slug}/preview
   */
  getCoursePreview = (slug: string, params: RequestParams = {}) =>
    this.request<CoursePreviewResponse, any>({
      path: `/api/v1/public/courses/${slug}/preview`,
      method: "GET",
      ...params,
    });
  /**
   * @description Quick check to see if a course has a published version available for preview
   *
   * @tags Course Preview
   * @name IsCoursePublished
   * @summary Check if course version is published
   * @request GET:/api/v1/public/courses/{slug}/is-published
   */
  isCoursePublished = (slug: string, params: RequestParams = {}) =>
    this.request<CoursePublishedStatusResponse, any>({
      path: `/api/v1/public/courses/${slug}/is-published`,
      method: "GET",
      ...params,
    });
  /**
   * @description Get the currently published version of a course by course slug. No authentication required.
   *
   * @tags Course Version Management
   * @name GetPublishedVersionBySlug
   * @summary Get published version of a course (Public)
   * @request GET:/api/v1/public/courses/{courseSlug}/version/published
   */
  getPublishedVersionBySlug = (
    courseSlug: string,
    params: RequestParams = {},
  ) =>
    this.request<CourseVersionResponse, any>({
      path: `/api/v1/public/courses/${courseSlug}/version/published`,
      method: "GET",
      ...params,
    });
  /**
   * @description Get detailed information about a published course version. No authentication required.
   *
   * @tags Course Version Management
   * @name GetPublicCourseVersionById
   * @summary Get published version details (Public)
   * @request GET:/api/v1/public/courses/{courseId}/versions/{versionId}
   */
  getPublicCourseVersionById = (
    courseId: number,
    versionId: number,
    params: RequestParams = {},
  ) =>
    this.request<CourseVersionResponse, any>({
      path: `/api/v1/public/courses/${courseId}/versions/${versionId}`,
      method: "GET",
      ...params,
    });
  /**
   * @description Get paginated list of reviews for a published course. Only shows reviews from enrolled students. Supports sorting by newest, rating_desc, rating_asc.
   *
   * @tags Course Preview
   * @name GetPublicCourseReviews
   * @summary Get public course reviews
   * @request GET:/api/v1/public/courses/{courseId}/reviews
   */
  getPublicCourseReviews = (
    courseId: number,
    query: {
      /**
       * Sort by: newest, rating_desc, rating_asc
       * @default "newest"
       * @example "newest"
       */
      sort?: string;
      /** Pagination parameters */
      pageable: Pageable;
    },
    params: RequestParams = {},
  ) =>
    this.request<PageResponseCourseReviewResponse, any>({
      path: `/api/v1/public/courses/${courseId}/reviews`,
      method: "GET",
      query: query,
      ...params,
    });
  /**
   * @description Get recommended courses based on the same category or tags. Returns up to 6 courses with highest ratings. Excludes the current course.
   *
   * @tags Course Preview
   * @name GetRelatedCourses
   * @summary Get related courses
   * @request GET:/api/v1/public/courses/{courseId}/related
   */
  getRelatedCourses = (
    courseId: number,
    query?: {
      /**
       * Maximum number of related courses to return (default: 6, max: 12)
       * @format int32
       * @default 6
       * @example 6
       */
      limit?: number;
    },
    params: RequestParams = {},
  ) =>
    this.request<CourseCardResponse[], any>({
      path: `/api/v1/public/courses/${courseId}/related`,
      method: "GET",
      query: query,
      ...params,
    });
  /**
   * @description Get rating summary statistics for a course (average rating, total reviews, rating distribution)
   *
   * @tags Course Preview
   * @name GetCourseRatingSummary
   * @summary Get course rating summary
   * @request GET:/api/v1/public/courses/{courseId}/rating-summary
   */
  getCourseRatingSummary = (courseId: number, params: RequestParams = {}) =>
    this.request<RatingSummaryResponse, any>({
      path: `/api/v1/public/courses/${courseId}/rating-summary`,
      method: "GET",
      ...params,
    });
  /**
   * @description Search courses by title, description, or tags. Only returns courses with published versions. No authentication required.
   *
   * @tags Course Management
   * @name SearchPublishedCourses
   * @summary Search published courses (Public)
   * @request GET:/api/v1/public/courses/search
   */
  searchPublishedCourses = (
    query: {
      /** Search query */
      query?: string;
      /**
       * Category ID filter
       * @format int64
       */
      categoryId?: number;
      /** Difficulty level filter */
      difficulty?: string;
      /** Tag names (comma-separated) */
      tags?: string;
      /** Pagination parameters */
      pageable: Pageable;
    },
    params: RequestParams = {},
  ) =>
    this.request<PageResponseCourseResponse, any>({
      path: `/api/v1/public/courses/search`,
      method: "GET",
      query: query,
      ...params,
    });
  /**
   * @description Get most popular courses based on enrollment count and ratings. Perfect for homepage featured section.
   *
   * @tags Course Preview
   * @name GetPopularCourses
   * @summary Get popular courses
   * @request GET:/api/v1/public/courses/popular
   */
  getPopularCourses = (
    query?: {
      /**
       * Maximum number of popular courses to return (default: 10, max: 20)
       * @format int32
       * @default 10
       * @example 10
       */
      limit?: number;
    },
    params: RequestParams = {},
  ) =>
    this.request<CourseCardResponse[], any>({
      path: `/api/v1/public/courses/popular`,
      method: "GET",
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags public-certificate-controller
   * @name VerifyCertificate
   * @request GET:/api/v1/public/certificates/verify
   */
  verifyCertificate = (
    query: {
      code: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<CertificateVerificationResponse, any>({
      path: `/api/v1/public/certificates/verify`,
      method: "GET",
      query: query,
      ...params,
    });
  /**
   * @description Get payout details by ID
   *
   * @tags Payout Management
   * @name GetPayoutById
   * @summary Get payout by ID
   * @request GET:/api/v1/payouts/{id}
   * @secure
   */
  getPayoutById = (id: number, params: RequestParams = {}) =>
    this.request<PayoutResponse, any>({
      path: `/api/v1/payouts/${id}`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * @description Get all payment transactions with filters (Admin only)
   *
   * @tags Payment Management
   * @name GetAllPayments
   * @summary Get all payments
   * @request GET:/api/v1/payments
   * @secure
   */
  getAllPayments = (
    query: {
      /** Filter by payment status */
      status?:
        | "PENDING"
        | "PROCESSING"
        | "SUCCESS"
        | "FAILED"
        | "CANCELLED"
        | "REFUNDED"
        | "EXPIRED";
      /**
       * Filter by student ID
       * @format int64
       */
      studentId?: number;
      /**
       * Filter by course ID
       * @format int64
       */
      courseId?: number;
      pageable: Pageable;
    },
    params: RequestParams = {},
  ) =>
    this.request<PageResponsePaymentTransactionResponse, any>({
      path: `/api/v1/payments`,
      method: "GET",
      query: query,
      secure: true,
      ...params,
    });
  /**
   * @description Check if enrollment is pending for a payment (Admin only)
   *
   * @tags Payment Management
   * @name CheckEnrollmentStatus
   * @summary Check enrollment status
   * @request GET:/api/v1/payments/{paymentId}/enrollment-status
   * @secure
   */
  checkEnrollmentStatus = (paymentId: number, params: RequestParams = {}) =>
    this.request<ApiResponseObject, any>({
      path: `/api/v1/payments/${paymentId}/enrollment-status`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * @description Retrieve payment transaction details by ID
   *
   * @tags Payment Management
   * @name GetPaymentById
   * @summary Get payment by ID
   * @request GET:/api/v1/payments/{id}
   * @secure
   */
  getPaymentById = (id: number, params: RequestParams = {}) =>
    this.request<PaymentTransactionResponse, any>({
      path: `/api/v1/payments/${id}`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * @description Check the status of a ZaloPay refund transaction (Admin only)
   *
   * @tags Payment Management
   * @name QueryZaloPayRefundStatus
   * @summary Query ZaloPay refund status
   * @request GET:/api/v1/payments/zalopay/query-refund/{mRefundId}
   * @secure
   */
  queryZaloPayRefundStatus = (mRefundId: string, params: RequestParams = {}) =>
    this.request<object, any>({
      path: `/api/v1/payments/zalopay/query-refund/${mRefundId}`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * @description Check the status of a ZaloPay payment transaction
   *
   * @tags Payment Management
   * @name QueryZaloPayOrderStatus
   * @summary Query ZaloPay order status
   * @request GET:/api/v1/payments/zalopay/query-order/{appTransId}
   * @secure
   */
  queryZaloPayOrderStatus = (appTransId: string, params: RequestParams = {}) =>
    this.request<object, any>({
      path: `/api/v1/payments/zalopay/query-order/${appTransId}`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * @description Get payment history for a specific student (Admin only)
   *
   * @tags Payment Management
   * @name GetStudentPaymentHistory
   * @summary Get student payment history
   * @request GET:/api/v1/payments/students/{studentId}/payment-history
   * @secure
   */
  getStudentPaymentHistory = (studentId: number, params: RequestParams = {}) =>
    this.request<PaymentTransactionResponse[], any>({
      path: `/api/v1/payments/students/${studentId}/payment-history`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * @description Get payment history for current student
   *
   * @tags Payment Management
   * @name GetMyPaymentHistory
   * @summary Get my payment history
   * @request GET:/api/v1/payments/my-history
   * @secure
   */
  getMyPaymentHistory = (params: RequestParams = {}) =>
    this.request<PaymentTransactionResponse[], any>({
      path: `/api/v1/payments/my-history`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * @description Get payment statistics for a specific course (Teacher or Admin)
   *
   * @tags Payment Management
   * @name GetCoursePaymentStats
   * @summary Get course payment statistics
   * @request GET:/api/v1/payments/courses/{courseId}/payment-stats
   * @secure
   */
  getCoursePaymentStats = (courseId: number, params: RequestParams = {}) =>
    this.request<CoursePaymentStatsResponse, any>({
      path: `/api/v1/payments/courses/${courseId}/payment-stats`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * @description Get paginated list of notifications for current user
   *
   * @tags Notification Management
   * @name GetList
   * @summary Get notifications
   * @request GET:/api/v1/notifications
   * @secure
   */
  getList = (params: RequestParams = {}) =>
    this.request<PageResponseNotificationResponse, any>({
      path: `/api/v1/notifications`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * @description Get detailed information about a specific notification
   *
   * @tags Notification Management
   * @name GetDetail1
   * @summary Get notification details
   * @request GET:/api/v1/notifications/{id}
   * @secure
   */
  getDetail1 = (id: number, params: RequestParams = {}) =>
    this.request<NotificationResponse, any>({
      path: `/api/v1/notifications/${id}`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * @description Delete a specific notification
   *
   * @tags Notification Management
   * @name Delete1
   * @summary Delete notification
   * @request DELETE:/api/v1/notifications/{id}
   * @secure
   */
  delete1 = (id: number, params: RequestParams = {}) =>
    this.request<Record<string, string>, any>({
      path: `/api/v1/notifications/${id}`,
      method: "DELETE",
      secure: true,
      ...params,
    });
  /**
   * @description Get the count of unread notifications for current user
   *
   * @tags Notification Management
   * @name CountUnread
   * @summary Get unread count
   * @request GET:/api/v1/notifications/count-unread
   * @secure
   */
  countUnread = (params: RequestParams = {}) =>
    this.request<Record<string, number>, any>({
      path: `/api/v1/notifications/count-unread`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * @description Get overall revenue for current teacher
   *
   * @tags Revenue Management
   * @name GetMyRevenue
   * @summary Get my revenue
   * @request GET:/api/v1/my-revenue
   * @secure
   */
  getMyRevenue = (params: RequestParams = {}) =>
    this.request<TeacherRevenueResponse, any>({
      path: `/api/v1/my-revenue`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * @description Get monthly revenue for current teacher
   *
   * @tags Revenue Management
   * @name GetMyMonthlyRevenue
   * @summary Get my monthly revenue
   * @request GET:/api/v1/my-revenue/monthly
   * @secure
   */
  getMyMonthlyRevenue = (
    query?: {
      /**
       * Period in YYYY-MM format
       * @example "2025-12"
       */
      period?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<MonthlyRevenueResponse, any>({
      path: `/api/v1/my-revenue/monthly`,
      method: "GET",
      query: query,
      secure: true,
      ...params,
    });
  /**
   * @description Get detailed revenue breakdown by courses for current teacher
   *
   * @tags Revenue Management
   * @name GetMyRevenueBreakdown
   * @summary Get my revenue breakdown
   * @request GET:/api/v1/my-revenue/breakdown
   * @secure
   */
  getMyRevenueBreakdown = (params: RequestParams = {}) =>
    this.request<RevenueBreakdownResponse, any>({
      path: `/api/v1/my-revenue/breakdown`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * @description Get payout history for current teacher
   *
   * @tags Payout Management
   * @name GetMyPayouts
   * @summary Get my payout history
   * @request GET:/api/v1/my-payouts
   * @secure
   */
  getMyPayouts = (params: RequestParams = {}) =>
    this.request<PayoutResponse[], any>({
      path: `/api/v1/my-payouts`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * @description Get all payment transactions for current teacher
   *
   * @tags Revenue Management
   * @name GetMyPaymentTransactions
   * @summary Get my payment transactions
   * @request GET:/api/v1/my-payment-transactions
   * @secure
   */
  getMyPaymentTransactions = (params: RequestParams = {}) =>
    this.request<PaymentTransactionResponse[], any>({
      path: `/api/v1/my-payment-transactions`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * @description Get available amount for payout withdrawal for current teacher
   *
   * @tags Payout Management
   * @name GetMyAvailablePayoutAmount
   * @summary Get available payout amount
   * @request GET:/api/v1/my-available-payout
   * @secure
   */
  getMyAvailablePayoutAmount = (params: RequestParams = {}) =>
    this.request<number, any>({
      path: `/api/v1/my-available-payout`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * @description Get a presigned URL for uploading a video to a lesson. Only accessible by teachers.
   *
   * @tags Lesson Management
   * @name RequestUploadUrl
   * @summary Request video upload URL
   * @request GET:/api/v1/lessons/{lessonId}/video/upload-url
   * @secure
   */
  requestUploadUrl = (lessonId: number, params: RequestParams = {}) =>
    this.request<RequestUploadUrlResponse, any>({
      path: `/api/v1/lessons/${lessonId}/video/upload-url`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * @description Get a presigned URL for streaming a lesson's video
   *
   * @tags Lesson Management
   * @name GetVideoStreamingUrl1
   * @summary Get video streaming URL
   * @request GET:/api/v1/lessons/{lessonId}/video/stream-url
   * @secure
   */
  getVideoStreamingUrl1 = (lessonId: number, params: RequestParams = {}) =>
    this.request<VideoStreamUrlResponse, any>({
      path: `/api/v1/lessons/${lessonId}/video/stream-url`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * @description Retrieve file storage information by ID
   *
   * @tags File Storage Management
   * @name GetFileStorage
   * @summary Get file details
   * @request GET:/api/v1/files/{id}
   * @secure
   */
  getFileStorage = (id: number, params: RequestParams = {}) =>
    this.request<FileStorageResponse, any>({
      path: `/api/v1/files/${id}`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * @description Delete a file from storage and database (Teacher or Admin only)
   *
   * @tags File Storage Management
   * @name DeleteFile
   * @summary Delete file
   * @request DELETE:/api/v1/files/{id}
   * @secure
   */
  deleteFile = (id: number, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/v1/files/${id}`,
      method: "DELETE",
      secure: true,
      ...params,
    });
  /**
   * @description Generate a presigned URL for downloading the file (valid for specified duration)
   *
   * @tags File Storage Management
   * @name GetDownloadUrl1
   * @summary Get download URL
   * @request GET:/api/v1/files/{id}/download
   * @secure
   */
  getDownloadUrl1 = (
    id: number,
    query?: {
      /**
       * URL expiry time in seconds
       * @format int32
       * @default 3600
       * @example 3600
       */
      expirySeconds?: number;
    },
    params: RequestParams = {},
  ) =>
    this.request<FileDownloadUrlResponse, any>({
      path: `/api/v1/files/${id}/download`,
      method: "GET",
      query: query,
      secure: true,
      ...params,
    });
  /**
   * @description Get file details along with a presigned download URL
   *
   * @tags File Storage Management
   * @name GetFileStorageWithDownloadUrl
   * @summary Get file with download URL
   * @request GET:/api/v1/files/{id}/details
   * @secure
   */
  getFileStorageWithDownloadUrl = (
    id: number,
    query?: {
      /**
       * URL expiry time in seconds
       * @format int32
       * @default 3600
       * @example 3600
       */
      expirySeconds?: number;
    },
    params: RequestParams = {},
  ) =>
    this.request<FileStorageResponse, any>({
      path: `/api/v1/files/${id}/details`,
      method: "GET",
      query: query,
      secure: true,
      ...params,
    });
  /**
   * @description Get detailed information about a specific enrollment
   *
   * @tags Enrollment Management
   * @name GetEnrollmentDetail
   * @summary Get enrollment details
   * @request GET:/api/v1/enrollments/{id}
   * @secure
   */
  getEnrollmentDetail = (id: number, params: RequestParams = {}) =>
    this.request<EnrollmentDetailResponse, any>({
      path: `/api/v1/enrollments/${id}`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * @description Check if student is eligible to take final exam based on progress
   *
   * @tags Enrollment Management
   * @name CheckFinalExamEligibility
   * @summary Check final exam eligibility
   * @request GET:/api/v1/enrollments/{enrollmentId}/final-exam-eligibility
   * @secure
   */
  checkFinalExamEligibility = (
    enrollmentId: number,
    params: RequestParams = {},
  ) =>
    this.request<FinalExamEligibilityResponse, any>({
      path: `/api/v1/enrollments/${enrollmentId}/final-exam-eligibility`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * @description Get paginated list of all active courses with optional filters
   *
   * @tags Course Management
   * @name GetCoursesActive
   * @summary Get all active courses
   * @request GET:/api/v1/courses
   */
  getCoursesActive = (
    query: {
      /** Pagination parameters */
      pageable: Pageable;
    },
    params: RequestParams = {},
  ) =>
    this.request<PageResponseCourseResponse, any>({
      path: `/api/v1/courses`,
      method: "GET",
      query: query,
      ...params,
    });
  /**
   * @description Get detailed course information by slug
   *
   * @tags Course Management
   * @name GetCourseBySlug
   * @summary Get course by slug
   * @request GET:/api/v1/courses/{slug}
   */
  getCourseBySlug = (slug: string, params: RequestParams = {}) =>
    this.request<CourseDetailResponse, any>({
      path: `/api/v1/courses/${slug}`,
      method: "GET",
      ...params,
    });
  /**
   * @description Get all versions of a course filtered by status (Teacher only)
   *
   * @tags Course Version Management
   * @name GetCourseVersionsByStatus
   * @summary Get course versions by status
   * @request GET:/api/v1/courses/{courseId}/versions/status/{status}
   * @secure
   */
  getCourseVersionsByStatus = (
    courseId: number,
    status: string,
    params: RequestParams = {},
  ) =>
    this.request<CourseVersionResponse[], any>({
      path: `/api/v1/courses/${courseId}/versions/status/${status}`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * @description Get all deleted versions of a course (Teacher only)
   *
   * @tags Course Version Management
   * @name GetDeletedCourseVersion
   * @summary Get deleted course versions
   * @request GET:/api/v1/courses/{courseId}/versions/deleted
   * @secure
   */
  getDeletedCourseVersion = (courseId: number, params: RequestParams = {}) =>
    this.request<CourseVersionResponse[], any>({
      path: `/api/v1/courses/${courseId}/versions/deleted`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * @description Get progress statistics for a course (Teacher access). Includes enrollment stats, completion rates, and average scores.
   *
   * @tags Progress Management
   * @name GetCourseProgressStats
   * @summary Get course progress statistics
   * @request GET:/api/v1/courses/{courseId}/progress-stats
   * @secure
   */
  getCourseProgressStats = (courseId: number, params: RequestParams = {}) =>
    this.request<CourseProgressStatsResponse, any>({
      path: `/api/v1/courses/${courseId}/progress-stats`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * @description Get list of all students enrolled in a course (Teacher access)
   *
   * @tags Enrollment Management
   * @name GetCourseEnrollments
   * @summary Get course enrollments
   * @request GET:/api/v1/courses/{courseId}/enrollments
   * @secure
   */
  getCourseEnrollments = (courseId: number, params: RequestParams = {}) =>
    this.request<PageResponseEnrollmentResponse, any>({
      path: `/api/v1/courses/${courseId}/enrollments`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * @description Get statistics about enrollments for a course (Teacher access)
   *
   * @tags Enrollment Management
   * @name GetEnrollmentStats
   * @summary Get enrollment statistics
   * @request GET:/api/v1/courses/{courseId}/enrollment-stats
   * @secure
   */
  getEnrollmentStats = (courseId: number, params: RequestParams = {}) =>
    this.request<EnrollmentStatsResponse, any>({
      path: `/api/v1/courses/${courseId}/enrollment-stats`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * @description Get all unanswered Q&A questions for a course (Instructor only)
   *
   * @tags Comment Management
   * @name GetUnansweredQuestions
   * @summary Get unanswered questions
   * @request GET:/api/v1/courses/{courseId}/comments/unanswered
   * @secure
   */
  getUnansweredQuestions = (courseId: number, params: RequestParams = {}) =>
    this.request<PageResponseCommentResponse, any>({
      path: `/api/v1/courses/${courseId}/comments/unanswered`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * @description Get Q&A statistics for a course (Instructor only)
   *
   * @tags Comment Management
   * @name GetCommentStatistics
   * @summary Get comment statistics
   * @request GET:/api/v1/courses/{courseId}/comments/statistics
   * @secure
   */
  getCommentStatistics = (courseId: number, params: RequestParams = {}) =>
    this.request<CommentStatisticsResponse, any>({
      path: `/api/v1/courses/${courseId}/comments/statistics`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * @description Search comments in a course by keyword
   *
   * @tags Comment Management
   * @name SearchComments
   * @summary Search comments
   * @request GET:/api/v1/courses/{courseId}/comments/search
   */
  searchComments = (
    courseId: number,
    query: {
      /** Search keyword */
      keyword: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<PageResponseCommentResponse, any>({
      path: `/api/v1/courses/${courseId}/comments/search`,
      method: "GET",
      query: query,
      ...params,
    });
  /**
   * @description Get popular/trending comments sorted by upvote count
   *
   * @tags Comment Management
   * @name GetPopularComments
   * @summary Get popular comments
   * @request GET:/api/v1/courses/{courseId}/comments/popular
   */
  getPopularComments = (courseId: number, params: RequestParams = {}) =>
    this.request<PageResponseCommentResponse, any>({
      path: `/api/v1/courses/${courseId}/comments/popular`,
      method: "GET",
      ...params,
    });
  /**
   * @description Get paginated list of all certificates issued for a course. Teachers can view certificates for their own courses, admins can view any course's certificates. Useful for tracking student completions and certificate issuance.
   *
   * @tags Certificate Management
   * @name GetCourseCertificates
   * @summary Get course certificates
   * @request GET:/api/v1/courses/{courseId}/certificates
   * @secure
   */
  getCourseCertificates = (courseId: number, params: RequestParams = {}) =>
    this.request<PageResponseCertificateResponse, any>({
      path: `/api/v1/courses/${courseId}/certificates`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * @description Get all pending course versions across all courses (Admin only)
   *
   * @tags Course Version Management
   * @name GetAllPendingCourseVersions
   * @summary Get all pending course versions
   * @request GET:/api/v1/courses/admin/versions/pending
   * @secure
   */
  getAllPendingCourseVersions = (
    query: {
      /** Pagination parameters */
      pageable: Pageable;
    },
    params: RequestParams = {},
  ) =>
    this.request<PageResponseCourseVersionResponse, any>({
      path: `/api/v1/courses/admin/versions/pending`,
      method: "GET",
      query: query,
      secure: true,
      ...params,
    });
  /**
   * @description Retrieve all replies to a specific comment
   *
   * @tags Comment Management
   * @name GetReplies
   * @summary Get comment replies
   * @request GET:/api/v1/comments/{id}/replies
   */
  getReplies = (id: number, params: RequestParams = {}) =>
    this.request<
      {
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
      }[],
      any
    >({
      path: `/api/v1/comments/${id}/replies`,
      method: "GET",
      ...params,
    });
  /**
   * @description Get detailed information about a specific certificate. Students can view their own certificates, teachers can view certificates they issued, and admins can view any certificate.
   *
   * @tags Certificate Management
   * @name GetCertificateDetail
   * @summary Get certificate details
   * @request GET:/api/v1/certificates/{id}
   * @secure
   */
  getCertificateDetail = (id: number, params: RequestParams = {}) =>
    this.request<CertificateDetailResponse, any>({
      path: `/api/v1/certificates/${id}`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * @description Preview certificate in browser without downloading. Returns image or HTML preview.
   *
   * @tags Certificate Management
   * @name PreviewCertificate
   * @summary Preview certificate
   * @request GET:/api/v1/certificates/{id}/preview
   * @secure
   */
  previewCertificate = (id: number, params: RequestParams = {}) =>
    this.request<string, any>({
      path: `/api/v1/certificates/${id}/preview`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * @description Public endpoint to verify certificate authenticity using certificate code. Anyone can verify a certificate without authentication.
   *
   * @tags Certificate Management
   * @name VerifyCertificateByCode
   * @summary Verify certificate by code
   * @request GET:/api/v1/certificates/verify
   */
  verifyCertificateByCode = (
    query: {
      /**
       * Certificate code
       * @example "CERT-20240117-ABC123"
       */
      code: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<CertificateVerificationResponse, any>({
      path: `/api/v1/certificates/verify`,
      method: "GET",
      query: query,
      ...params,
    });
  /**
   * @description Get hierarchical category tree structure. Public endpoint - no authentication required.
   *
   * @tags Category Management
   * @name GetCategoryTree
   * @summary Get category tree
   * @request GET:/api/v1/categories/tree
   */
  getCategoryTree = (params: RequestParams = {}) =>
    this.request<
      {
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
      }[],
      any
    >({
      path: `/api/v1/categories/tree`,
      method: "GET",
      ...params,
    });
  /**
   * @description Get category details by slug. Public endpoint - no authentication required.
   *
   * @tags Category Management
   * @name GetCategoryBySlug
   * @summary Get category by slug
   * @request GET:/api/v1/categories/slug/{slug}
   */
  getCategoryBySlug = (slug: string, params: RequestParams = {}) =>
    this.request<CategoryResponseDto, any>({
      path: `/api/v1/categories/slug/${slug}`,
      method: "GET",
      ...params,
    });
  /**
   * @description Get category details including deleted ones (Admin only)
   *
   * @tags Category Management
   * @name GetCategoryByIdForAdmin
   * @summary Get category by ID (Admin)
   * @request GET:/api/v1/categories/admin/{id}
   * @secure
   */
  getCategoryByIdForAdmin = (id: number, params: RequestParams = {}) =>
    this.request<CategoryResponseDto, any>({
      path: `/api/v1/categories/admin/${id}`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * @description Get statistics for all categories including course count and student count (Admin only)
   *
   * @tags Category Management
   * @name GetCategoryStatistics
   * @summary Get category statistics
   * @request GET:/api/v1/categories/admin/stats
   * @secure
   */
  getCategoryStatistics = (params: RequestParams = {}) =>
    this.request<CategoryStatsResponse[], any>({
      path: `/api/v1/categories/admin/stats`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * @description Get list of all deleted categories (Admin only)
   *
   * @tags Category Management
   * @name GetAllDeleted
   * @summary Get all deleted categories
   * @request GET:/api/v1/categories/admin/deleted
   * @secure
   */
  getAllDeleted = (params: RequestParams = {}) =>
    this.request<
      {
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
      }[],
      any
    >({
      path: `/api/v1/categories/admin/deleted`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * @description Verify user's email using the token received via email. This activates student accounts or sets teacher accounts to pending approval.
   *
   * @tags Authentication
   * @name VerifyEmail
   * @summary Verify email address
   * @request GET:/api/v1/auth/verify-email
   */
  verifyEmail = (
    query: {
      /** Email verification token */
      token: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<void, any>({
      path: `/api/v1/auth/verify-email`,
      method: "GET",
      query: query,
      ...params,
    });
  /**
   * @description Retrieve detailed information about the currently authenticated user including profile and role-specific data.
   *
   * @tags Authentication
   * @name GetCurrentUserInfo
   * @summary Get current user information
   * @request GET:/api/v1/auth/me
   * @secure
   */
  getCurrentUserInfo = (params: RequestParams = {}) =>
    this.request<MeResponse, any>({
      path: `/api/v1/auth/me`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * @description Retrieve all student submissions for a specific assignment. Only accessible by teachers.
   *
   * @tags Submission Management
   * @name GetSubmissions
   * @summary Get all submissions for assignment
   * @request GET:/api/v1/assignments/{assignmentId}/submissions
   * @secure
   */
  getSubmissions = (assignmentId: number, params: RequestParams = {}) =>
    this.request<SubmissionResponse[], any>({
      path: `/api/v1/assignments/${assignmentId}/submissions`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * @description Export all submissions for an assignment for reporting or analysis purposes. Only accessible by teachers.
   *
   * @tags Submission Management
   * @name ExportSubmissions
   * @summary Export submissions
   * @request GET:/api/v1/assignments/{assignmentId}/submissions/export
   * @secure
   */
  exportSubmissions = (assignmentId: number, params: RequestParams = {}) =>
    this.request<SubmissionResponse[], any>({
      path: `/api/v1/assignments/${assignmentId}/submissions/export`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * @description Retrieve all submissions for an assignment filtered by status (e.g., SUBMITTED, GRADED). Only accessible by teachers.
   *
   * @tags Submission Management
   * @name GetSubmissionsByStatus
   * @summary Get submissions by status
   * @request GET:/api/v1/assignments/{assignmentId}/submissions/by-status
   * @secure
   */
  getSubmissionsByStatus = (
    assignmentId: number,
    query: {
      /**
       * Assignment submission status
       * @example "SUBMITTED"
       */
      status: "PENDING" | "GRADED" | "REJECTED";
    },
    params: RequestParams = {},
  ) =>
    this.request<SubmissionResponse[], any>({
      path: `/api/v1/assignments/${assignmentId}/submissions/by-status`,
      method: "GET",
      query: query,
      secure: true,
      ...params,
    });
  /**
   * @description Retrieve the highest-scoring submission for a student on a specific assignment. Accessible by students and teachers.
   *
   * @tags Submission Management
   * @name GetBestSubmission
   * @summary Get best submission
   * @request GET:/api/v1/assignments/{assignmentId}/students/{studentId}/best-submission
   * @secure
   */
  getBestSubmission = (
    assignmentId: number,
    studentId: number,
    params: RequestParams = {},
  ) =>
    this.request<SubmissionResponse, any>({
      path: `/api/v1/assignments/${assignmentId}/students/${studentId}/best-submission`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * @description Calculate the percentage of students who passed the assignment. Only accessible by teachers.
   *
   * @tags Submission Management
   * @name GetPassingRate
   * @summary Get assignment passing rate
   * @request GET:/api/v1/assignments/{assignmentId}/passing-rate
   * @secure
   */
  getPassingRate = (assignmentId: number, params: RequestParams = {}) =>
    this.request<number, any>({
      path: `/api/v1/assignments/${assignmentId}/passing-rate`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * @description Retrieve all submissions made by the authenticated student for a specific assignment. Only accessible by students.
   *
   * @tags Submission Management
   * @name GetMySubmissions
   * @summary Get my submissions for assignment
   * @request GET:/api/v1/assignments/{assignmentId}/my-submissions
   * @secure
   */
  getMySubmissions = (assignmentId: number, params: RequestParams = {}) =>
    this.request<SubmissionResponse[], any>({
      path: `/api/v1/assignments/${assignmentId}/my-submissions`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * @description Retrieve the most recent submission made by the authenticated student for an assignment. Only accessible by students.
   *
   * @tags Submission Management
   * @name GetMyLatestSubmission
   * @summary Get my latest submission
   * @request GET:/api/v1/assignments/{assignmentId}/my-latest
   * @secure
   */
  getMyLatestSubmission = (assignmentId: number, params: RequestParams = {}) =>
    this.request<SubmissionResponse, any>({
      path: `/api/v1/assignments/${assignmentId}/my-latest`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * @description Retrieve comprehensive system-wide statistics including users, courses, and enrollments for the specified period
   *
   * @tags Admin Dashboard
   * @name GetStatistics
   * @summary Get system statistics
   * @request GET:/api/v1/admin/statistics
   * @secure
   */
  getStatistics = (
    query?: {
      /**
       * Time period for statistics
       * @default "last30days"
       * @example "last30days"
       */
      period?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<DashboardStatisticsResponse, any>({
      path: `/api/v1/admin/statistics`,
      method: "GET",
      query: query,
      secure: true,
      ...params,
    });
  /**
   * @description Get default (global) active revenue share configuration
   *
   * @tags Revenue Share Configuration
   * @name GetDefaultConfig
   * @summary Get default config
   * @request GET:/api/v1/admin/revenue-share/default
   * @secure
   */
  getDefaultConfig = (
    query?: {
      /**
       * Date to check (defaults to today)
       * @format date
       */
      date?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<RevenueShareConfigResponse, any>({
      path: `/api/v1/admin/revenue-share/default`,
      method: "GET",
      query: query,
      secure: true,
      ...params,
    });
  /**
   * @description Get active revenue share configuration for a category on specific date
   *
   * @tags Revenue Share Configuration
   * @name GetActiveConfigForCategory
   * @summary Get config for category
   * @request GET:/api/v1/admin/revenue-share/category/{categoryId}
   * @secure
   */
  getActiveConfigForCategory = (
    categoryId: number,
    query?: {
      /**
       * Date to check (defaults to today)
       * @format date
       */
      date?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<RevenueShareConfigResponse, any>({
      path: `/api/v1/admin/revenue-share/category/${categoryId}`,
      method: "GET",
      query: query,
      secure: true,
      ...params,
    });
  /**
   * @description Get all active revenue sharing configurations
   *
   * @tags Revenue Share Configuration
   * @name GetActiveRevenueShareConfigs
   * @summary Get active revenue share configs
   * @request GET:/api/v1/admin/revenue-share/active
   * @secure
   */
  getActiveRevenueShareConfigs = (params: RequestParams = {}) =>
    this.request<RevenueShareConfigResponse[], any>({
      path: `/api/v1/admin/revenue-share/active`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * @description Get list of all violation reports
   *
   * @tags Violation Report Management
   * @name GetAll1
   * @summary Get all reports (Admin)
   * @request GET:/api/v1/admin/reports
   * @secure
   */
  getAll1 = (params: RequestParams = {}) =>
    this.request<PageResponseViolationReportResponse, any>({
      path: `/api/v1/admin/reports`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * @description Retrieve detailed user report including registrations, active users, and user growth for the specified period
   *
   * @tags Admin Dashboard
   * @name GetUserReport
   * @summary Get user report
   * @request GET:/api/v1/admin/reports/users
   * @secure
   */
  getUserReport = (
    query?: {
      /**
       * Time period for user report
       * @default "last30days"
       * @example "last30days"
       */
      period?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<UserReportResponse, any>({
      path: `/api/v1/admin/reports/users`,
      method: "GET",
      query: query,
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags system-report-export-controller
   * @name ExportSystemReport
   * @request GET:/api/v1/admin/reports/system/export
   */
  exportSystemReport = (
    query: {
      period: ReportPeriodRequest;
    },
    params: RequestParams = {},
  ) =>
    this.request<void, any>({
      path: `/api/v1/admin/reports/system/export`,
      method: "GET",
      query: query,
      ...params,
    });
  /**
   * @description Retrieve detailed revenue report including earnings, transactions, and trends for the specified period
   *
   * @tags Admin Dashboard
   * @name GetRevenueReport
   * @summary Get revenue report
   * @request GET:/api/v1/admin/reports/revenue
   * @secure
   */
  getRevenueReport = (
    query?: {
      /**
       * Time period for revenue report
       * @default "last30days"
       * @example "last30days"
       */
      period?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<RevenueReportResponse, any>({
      path: `/api/v1/admin/reports/revenue`,
      method: "GET",
      query: query,
      secure: true,
      ...params,
    });
  /**
   * @description Retrieve detailed course report including course creation, enrollments, completion rates for the specified period
   *
   * @tags Admin Dashboard
   * @name GetCourseReport
   * @summary Get course report
   * @request GET:/api/v1/admin/reports/courses
   * @secure
   */
  getCourseReport = (
    query?: {
      /**
       * Time period for course report
       * @default "last30days"
       * @example "last30days"
       */
      period?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<CourseReportResponse, any>({
      path: `/api/v1/admin/reports/courses`,
      method: "GET",
      query: query,
      secure: true,
      ...params,
    });
  /**
   * @description Retrieve comprehensive statistics about recommendations including total recommendations, feedback distribution, and enrollment rates. Admin only.
   *
   * @tags Recommendation Management
   * @name GetStats
   * @summary Get recommendation statistics
   * @request GET:/api/v1/admin/recommendations/stats
   * @secure
   */
  getStats = (params: RequestParams = {}) =>
    this.request<RecommendationStatsDto, any>({
      path: `/api/v1/admin/recommendations/stats`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * @description Get all payout requests with filters (Admin only)
   *
   * @tags Payout Management
   * @name GetAllPayouts
   * @summary Get all payouts with filters
   * @request GET:/api/v1/admin/payouts
   * @secure
   */
  getAllPayouts = (
    query: {
      /** Filter by payout status */
      status?: "PENDING" | "COMPLETED" | "FAILED" | "REJECTED";
      /**
       * Filter by teacher ID
       * @format int64
       */
      teacherId?: number;
      /** Filter by period (YYYY-MM) */
      period?: string;
      pageable: Pageable;
    },
    params: RequestParams = {},
  ) =>
    this.request<PageResponsePayoutResponse, any>({
      path: `/api/v1/admin/payouts`,
      method: "GET",
      query: query,
      secure: true,
      ...params,
    });
  /**
   * @description Get count of pending payout requests (Admin dashboard)
   *
   * @tags Payout Management
   * @name GetPendingPayoutsCount
   * @summary Get pending payouts count
   * @request GET:/api/v1/admin/payouts/pending-count
   * @secure
   */
  getPendingPayoutsCount = (params: RequestParams = {}) =>
    this.request<number, any>({
      path: `/api/v1/admin/payouts/pending-count`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * @description Retrieve comprehensive system dashboard with key metrics for the specified time period
   *
   * @tags Admin Dashboard
   * @name GetDashboard
   * @summary Get system dashboard overview
   * @request GET:/api/v1/admin/dashboard
   * @secure
   */
  getDashboard = (
    query?: {
      /**
       * Time period for dashboard data
       * @default "last30days"
       * @example "last30days"
       */
      period?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<DashboardResponse, any>({
      path: `/api/v1/admin/dashboard`,
      method: "GET",
      query: query,
      secure: true,
      ...params,
    });
  /**
   * @description Get paginated list of all courses including inactive (Admin only)
   *
   * @tags Course Management
   * @name GetAllCourses
   * @summary Get all courses
   * @request GET:/api/v1/admin/courses
   * @secure
   */
  getAllCourses = (
    query: {
      /** Pagination parameters */
      pageable: Pageable;
    },
    params: RequestParams = {},
  ) =>
    this.request<PageResponseCourseResponse, any>({
      path: `/api/v1/admin/courses`,
      method: "GET",
      query: query,
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags admin-certificate-controller
   * @name GetAllCertificates
   * @request GET:/api/v1/admin/certificates
   */
  getAllCertificates = (params: RequestParams = {}) =>
    this.request<CertificateResponse[], any>({
      path: `/api/v1/admin/certificates`,
      method: "GET",
      ...params,
    });
  /**
   * No description
   *
   * @tags admin-certificate-controller
   * @name GetCertificateDetail1
   * @request GET:/api/v1/admin/certificates/{id}
   */
  getCertificateDetail1 = (id: number, params: RequestParams = {}) =>
    this.request<CertificateDetailResponse, any>({
      path: `/api/v1/admin/certificates/${id}`,
      method: "GET",
      ...params,
    });
  /**
   * No description
   *
   * @tags admin-certificate-controller
   * @name AdminDownloadCertificate
   * @request GET:/api/v1/admin/certificates/{id}/download
   */
  adminDownloadCertificate = (id: number, params: RequestParams = {}) =>
    this.request<File, any>({
      path: `/api/v1/admin/certificates/${id}/download`,
      method: "GET",
      ...params,
    });
  /**
   * No description
   *
   * @tags admin-certificate-controller
   * @name GetCertificatesByStudent
   * @request GET:/api/v1/admin/certificates/student/{studentId}
   */
  getCertificatesByStudent = (
    studentId: number,
    query: {
      pageable: Pageable;
    },
    params: RequestParams = {},
  ) =>
    this.request<PageResponseCertificateResponse, any>({
      path: `/api/v1/admin/certificates/student/${studentId}`,
      method: "GET",
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags admin-certificate-controller
   * @name GetCertificatesByCourse
   * @request GET:/api/v1/admin/certificates/course/{courseId}
   */
  getCertificatesByCourse = (
    courseId: number,
    query: {
      pageable: Pageable;
    },
    params: RequestParams = {},
  ) =>
    this.request<PageResponseCertificateResponse, any>({
      path: `/api/v1/admin/certificates/course/${courseId}`,
      method: "GET",
      query: query,
      ...params,
    });
  /**
   * @description Retrieve all audit logs with pagination. Returns a paginated list of audit log entries.
   *
   * @tags Audit Log Management
   * @name GetAll2
   * @summary Get all audit logs
   * @request GET:/api/v1/admin/audit-logs
   * @secure
   */
  getAll2 = (
    query: {
      /** Pagination parameters (page, size, sort) */
      pageable: Pageable;
    },
    params: RequestParams = {},
  ) =>
    this.request<PageResponseAuditLogResponse, any>({
      path: `/api/v1/admin/audit-logs`,
      method: "GET",
      query: query,
      secure: true,
      ...params,
    });
  /**
   * @description Search audit logs by keyword with pagination. Returns filtered audit log entries.
   *
   * @tags Audit Log Management
   * @name Search
   * @summary Search audit logs
   * @request GET:/api/v1/admin/audit-logs/search
   * @secure
   */
  search = (
    query: {
      /**
       * Search keyword for filtering logs
       * @default ""
       * @example "LOGIN"
       */
      keyword?: string;
      /** Pagination parameters (page, size, sort) */
      pageable: Pageable;
    },
    params: RequestParams = {},
  ) =>
    this.request<PageResponseAuditLogResponse, any>({
      path: `/api/v1/admin/audit-logs/search`,
      method: "GET",
      query: query,
      secure: true,
      ...params,
    });
  /**
   * @description Export all audit logs to a CSV file. The file will be downloaded with the name 'audit_logs.csv'.
   *
   * @tags Audit Log Management
   * @name Export
   * @summary Export audit logs to CSV
   * @request GET:/api/v1/admin/audit-logs/export
   * @secure
   */
  export = (params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/v1/admin/audit-logs/export`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * @description Retrieve a paginated list of all user accounts with filtering support. Only accessible by administrators.
   *
   * @tags Account Management
   * @name GetAllAccounts
   * @summary Get all accounts (Admin only)
   * @request GET:/api/v1/admin/accounts
   * @secure
   */
  getAllAccounts = (
    query: {
      /** Pagination parameters */
      pageable: Pageable;
    },
    params: RequestParams = {},
  ) =>
    this.request<PageResponseAccountResponse, any>({
      path: `/api/v1/admin/accounts`,
      method: "GET",
      query: query,
      secure: true,
      ...params,
    });
  /**
   * @description Retrieve detailed information about a specific account by its ID. Only accessible by administrators.
   *
   * @tags Account Management
   * @name GetAccountById
   * @summary Get account by ID (Admin only)
   * @request GET:/api/v1/admin/accounts/{id}
   * @secure
   */
  getAccountById = (id: number, params: RequestParams = {}) =>
    this.request<ApiResponseObject, any>({
      path: `/api/v1/admin/accounts/${id}`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * @description Permanently delete an account by its ID. This action is irreversible. Only accessible by administrators.
   *
   * @tags Account Management
   * @name DeleteAccountById
   * @summary Delete account (Admin only)
   * @request DELETE:/api/v1/admin/accounts/{id}
   * @secure
   */
  deleteAccountById = (id: number, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/v1/admin/accounts/${id}`,
      method: "DELETE",
      secure: true,
      ...params,
    });
  /**
   * @description Retrieve paginated activity logs for a specific account with optional filtering by action type. Only accessible by administrators.
   *
   * @tags Account Management
   * @name GetAccountActivityLogs
   * @summary Get account activity logs (Admin only)
   * @request GET:/api/v1/admin/accounts/{id}/logs
   * @secure
   */
  getAccountActivityLogs = (
    id: number,
    query: {
      /** Types of account actions */
      actionType?:
        | "APPROVE"
        | "REJECT"
        | "SUSPEND"
        | "UNLOCK"
        | "DEACTIVATE"
        | "UNKNOWN";
      /** Pagination parameters */
      pageable: Pageable;
    },
    params: RequestParams = {},
  ) =>
    this.request<PageResponseAccountActionLogResponse, any>({
      path: `/api/v1/admin/accounts/${id}/logs`,
      method: "GET",
      query: query,
      secure: true,
      ...params,
    });
  /**
   * @description Download Excel template file for bulk student import. The template includes sample data and proper formatting for all required fields.
   *
   * @tags Account Management
   * @name DownloadImportTemplate
   * @summary Download student import template
   * @request GET:/api/v1/admin/accounts/import-template
   * @secure
   */
  downloadImportTemplate = (params: RequestParams = {}) =>
    this.request<File, any>({
      path: `/api/v1/admin/accounts/import-template`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * @description Export filtered list of accounts to Excel or CSV format. Supports the same filtering capabilities as the account list endpoint. The export includes account details and role-specific information.
   *
   * @tags Account Management
   * @name ExportAccounts
   * @summary Export accounts
   * @request GET:/api/v1/admin/accounts/export
   * @secure
   */
  exportAccounts = (
    query?: {
      /**
       * Export format: EXCEL or CSV
       * @default "EXCEL"
       * @example "EXCEL"
       */
      type?: "EXCEL" | "CSV";
    },
    params: RequestParams = {},
  ) =>
    this.request<File, any>({
      path: `/api/v1/admin/accounts/export`,
      method: "GET",
      query: query,
      secure: true,
      ...params,
    });
  /**
   * @description Delete a specific file attachment from a submission. Only accessible by students.
   *
   * @tags Submission File Management
   * @name DeleteFile1
   * @summary Delete file from submission
   * @request DELETE:/api/v1/submissions/{submissionId}/files/{fileId}
   * @secure
   */
  deleteFile1 = (
    submissionId: number,
    fileId: number,
    params: RequestParams = {},
  ) =>
    this.request<void, any>({
      path: `/api/v1/submissions/${submissionId}/files/${fileId}`,
      method: "DELETE",
      secure: true,
      ...params,
    });
  /**
   * @description Remove all questions from a quiz at once. Only accessible by teachers.
   *
   * @tags Quiz Management
   * @name RemoveAllQuestions
   * @summary Remove all questions from quiz
   * @request DELETE:/api/v1/quizzes/{id}/questions
   * @secure
   */
  removeAllQuestions = (id: number, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/v1/quizzes/${id}/questions`,
      method: "DELETE",
      secure: true,
      ...params,
    });
  /**
   * @description Remove a specific question from a quiz. Only accessible by teachers.
   *
   * @tags Quiz Management
   * @name RemoveQuestionFromQuiz
   * @summary Remove question from quiz
   * @request DELETE:/api/v1/quizzes/{id}/questions/{questionId}
   * @secure
   */
  removeQuestionFromQuiz = (
    id: number,
    questionId: number,
    params: RequestParams = {},
  ) =>
    this.request<object, any>({
      path: `/api/v1/quizzes/${id}/questions/${questionId}`,
      method: "DELETE",
      secure: true,
      ...params,
    });
  /**
   * @description Delete multiple questions at once by providing a list of question IDs. Only accessible by teachers.
   *
   * @tags Question Management
   * @name BulkDeleteQuestions
   * @summary Bulk delete questions
   * @request DELETE:/api/v1/questions/bulk
   * @secure
   */
  bulkDeleteQuestions = (data: number[], params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/v1/questions/bulk`,
      method: "DELETE",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description Delete the video associated with a lesson. Only accessible by teachers.
   *
   * @tags Lesson Management
   * @name DeleteVideo
   * @summary Delete lesson video
   * @request DELETE:/api/v1/lessons/{lessonId}/video
   * @secure
   */
  deleteVideo = (lessonId: number, params: RequestParams = {}) =>
    this.request<LessonDTO, any>({
      path: `/api/v1/lessons/${lessonId}/video`,
      method: "DELETE",
      secure: true,
      ...params,
    });
  /**
   * @description Delete a notification channel (Admin only)
   *
   * @tags Notification Channel Admin
   * @name Delete2
   * @summary Delete notification channel
   * @request DELETE:/api/v1/admin/notification-channels/{id}
   * @secure
   */
  delete2 = (id: number, params: RequestParams = {}) =>
    this.request<Record<string, string>, any>({
      path: `/api/v1/admin/notification-channels/${id}`,
      method: "DELETE",
      secure: true,
      ...params,
    });
}
