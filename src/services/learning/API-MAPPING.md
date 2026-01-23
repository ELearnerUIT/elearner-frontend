# Learning Module - API Mapping

## 📊 Tổng quan

**Backend Controllers:** 5 controllers

- `EnrollmentController.java`
- `ProgressController.java`
- `CertificateController.java`
- `PublicCertificateController.java`
- `StudentCourseController.java`

**Frontend Services:** 4 services

- `enrollment.service.ts`
- `progress.service.ts`
- `certificate.service.ts`
- `student-course.service.ts`

**Tổng số API:** 36 endpoints (32 từ controllers chính + 4 từ PublicCertificateController)

---

## 1. Enrollment APIs (EnrollmentController.java)

### Backend: 10 endpoints

| #   | Method | Endpoint                                             | Role              | Frontend Method               | Status |
| --- | ------ | ---------------------------------------------------- | ----------------- | ----------------------------- | ------ |
| 1   | POST   | `/courses/{courseId}/enroll`                         | @StudentOnly      | `enrollCourse()`              | ✅     |
| 2   | GET    | `/students/{studentId}/enrollments`                  | @StudentOnly      | `getStudentEnrollments()`     | ✅     |
| 3   | GET    | `/courses/{courseId}/enrollments`                    | @TeacherOnly      | `getCourseEnrollments()`      | ✅     |
| 4   | GET    | `/enrollments/{id}`                                  | @StudentOrTeacher | `getEnrollmentDetail()`       | ✅     |
| 5   | POST   | `/enrollments/{id}/cancel`                           | @StudentOnly      | `cancelEnrollment()`          | ✅     |
| 6   | POST   | `/enrollments/{id}/kick`                             | @TeacherOnly      | `kickStudent()`               | ✅     |
| 7   | POST   | `/enrollments/{id}/complete`                         | @TeacherOnly      | `completeEnrollment()`        | ✅     |
| 8   | GET    | `/courses/{courseId}/enrollments/stats`              | @TeacherOnly      | `getEnrollmentStats()`        | ✅     |
| 9   | POST   | `/enrollments/{enrollmentId}/update-score`           | @TeacherOnly      | `updateEnrollmentScore()`     | ✅     |
| 10  | GET    | `/enrollments/{enrollmentId}/final-exam-eligibility` | @StudentOnly      | `checkFinalExamEligibility()` | ✅     |

### Mô tả chi tiết

#### Student APIs

**1. enrollCourse(courseId, payload)**

- **Endpoint:** `POST /courses/{courseId}/enroll`
- **Role:** @StudentOnly
- **Request:** `EnrollCourseRequest` (paymentMethod?, note?)
- **Response:** `EnrollmentResponse`
- **Mô tả:** Đăng ký khóa học. Tạo enrollment với status PENDING hoặc ENROLLED tùy payment method

**2. getStudentEnrollments(studentId, page, size, status?)**

- **Endpoint:** `GET /students/{studentId}/enrollments`
- **Role:** @StudentOnly
- **Query params:** page, size, status (PENDING, ENROLLED, CANCELLED, COMPLETED)
- **Response:** `PaginatedEnrollments`
- **Mô tả:** Lấy danh sách khóa học đã đăng ký của student

**5. cancelEnrollment(id, payload)**

- **Endpoint:** `POST /enrollments/{id}/cancel`
- **Role:** @StudentOnly
- **Request:** `CancelEnrollmentRequest` (reason)
- **Response:** `EnrollmentDetailResponse`
- **Mô tả:** Hủy đăng ký khóa học. Chuyển status sang CANCELLED

**10. checkFinalExamEligibility(enrollmentId)**

- **Endpoint:** `GET /enrollments/{enrollmentId}/final-exam-eligibility`
- **Role:** @StudentOnly
- **Response:** `FinalExamEligibilityResponse` (isEligible, requiredCompletionPercentage, currentCompletionPercentage, missingRequirements[])
- **Mô tả:** Kiểm tra điều kiện thi cuối kỳ (thường yêu cầu >= 80% completion)

#### Teacher APIs

**3. getCourseEnrollments(courseId, page, size, status?)**

- **Endpoint:** `GET /courses/{courseId}/enrollments`
- **Role:** @TeacherOnly
- **Query params:** page, size, status
- **Response:** `PaginatedEnrollments`
- **Mô tả:** Lấy danh sách học viên đã đăng ký khóa học (dành cho giảng viên)

**6. kickStudent(id, payload)**

- **Endpoint:** `POST /enrollments/{id}/kick`
- **Role:** @TeacherOnly
- **Request:** `CancelEnrollmentRequest` (reason)
- **Response:** `EnrollmentDetailResponse`
- **Mô tả:** Đuổi học viên khỏi khóa học (giảng viên). Chuyển status sang CANCELLED

**7. completeEnrollment(id)**

- **Endpoint:** `POST /enrollments/{id}/complete`
- **Role:** @TeacherOnly
- **Response:** `EnrollmentDetailResponse`
- **Mô tả:** Đánh dấu học viên hoàn thành khóa học. Chuyển status sang COMPLETED

**8. getEnrollmentStats(courseId)**

- **Endpoint:** `GET /courses/{courseId}/enrollments/stats`
- **Role:** @TeacherOnly
- **Response:** `EnrollmentStatsResponse` (totalEnrollments, activeEnrollments, completedEnrollments, cancelledEnrollments, averageCompletionRate, etc.)
- **Mô tả:** Thống kê enrollment của khóa học

**9. updateEnrollmentScore(enrollmentId, payload)**

- **Endpoint:** `POST /enrollments/{enrollmentId}/update-score`
- **Role:** @TeacherOnly
- **Request:** `UpdateScoreRequest` (averageScore)
- **Response:** `EnrollmentDetailResponse`
- **Mô tả:** Cập nhật điểm trung bình sau quiz/exam

#### Shared APIs

**4. getEnrollmentDetail(id)**

- **Endpoint:** `GET /enrollments/{id}`
- **Role:** @StudentOrTeacher
- **Response:** `EnrollmentDetailResponse`
- **Mô tả:** Xem chi tiết enrollment (học viên xem của mình, giảng viên xem của học viên trong khóa học)

---

## 2. Progress APIs (ProgressController.java)

### Backend: 7 endpoints

| #   | Method | Endpoint                                            | Role         | Frontend Method              | Status |
| --- | ------ | --------------------------------------------------- | ------------ | ---------------------------- | ------ |
| 1   | GET    | `/students/{studentId}/progress`                    | @StudentOnly | `getStudentProgress()`       | ✅     |
| 2   | GET    | `/students/{studentId}/courses/{courseId}/progress` | @StudentOnly | `getStudentCourseProgress()` | ✅     |
| 3   | GET    | `/lessons/{lessonId}/progress`                      | @StudentOnly | `getLessonProgress()`        | ✅     |
| 4   | POST   | `/lessons/{lessonId}/mark-viewed`                   | @StudentOnly | `markLessonAsViewed()`       | ✅     |
| 5   | POST   | `/lessons/{lessonId}/mark-completed`                | @StudentOnly | `markLessonAsCompleted()`    | ✅     |
| 6   | POST   | `/lessons/{lessonId}/update-duration`               | @StudentOnly | `updateWatchedDuration()`    | ✅     |
| 7   | GET    | `/courses/{courseId}/progress/stats`                | @TeacherOnly | `getCourseProgressStats()`   | ✅     |

### Mô tả chi tiết

#### Student APIs

**1. getStudentProgress(studentId, page, size)**

- **Endpoint:** `GET /students/{studentId}/progress`
- **Role:** @StudentOnly
- **Query params:** page, size
- **Response:** `PaginatedCourseProgress` (StudentProgressOverviewResponse[])
- **Mô tả:** Lấy tổng quan tiến độ học tập của student (tất cả khóa học đã đăng ký)

**2. getStudentCourseProgress(studentId, courseId)**

- **Endpoint:** `GET /students/{studentId}/courses/{courseId}/progress`
- **Role:** @StudentOnly
- **Response:** `CourseProgressResponse`
- **Mô tả:** Lấy tiến độ chi tiết của student trong 1 khóa học (chapters, lessons, completion %)

**3. getLessonProgress(lessonId)**

- **Endpoint:** `GET /lessons/{lessonId}/progress`
- **Role:** @StudentOnly
- **Response:** `LessonProgressResponse`
- **Mô tả:** Lấy tiến độ của 1 lesson (viewed, completed, watched duration)

**4. markLessonAsViewed(lessonId)**

- **Endpoint:** `POST /lessons/{lessonId}/mark-viewed`
- **Role:** @StudentOnly
- **Response:** `LessonProgressResponse`
- **Mô tả:** Đánh dấu lesson đã xem. Chuyển status sang VIEWED (nếu chưa COMPLETED)

**5. markLessonAsCompleted(lessonId)**

- **Endpoint:** `POST /lessons/{lessonId}/mark-completed`
- **Role:** @StudentOnly
- **Response:** `LessonProgressResponse`
- **Mô tả:** Đánh dấu lesson đã hoàn thành. Chuyển status sang COMPLETED

**6. updateWatchedDuration(lessonId, payload)**

- **Endpoint:** `POST /lessons/{lessonId}/update-duration`
- **Role:** @StudentOnly
- **Request:** `UpdateWatchedDurationRequest` (watchedDurationSeconds)
- **Response:** `LessonProgressResponse`
- **Mô tả:** Cập nhật thời gian xem video. **Auto-complete:** Nếu watchedDuration >= 90% videoDuration → tự động chuyển sang COMPLETED

#### Teacher APIs

**7. getCourseProgressStats(courseId)**

- **Endpoint:** `GET /courses/{courseId}/progress/stats`
- **Role:** @TeacherOnly
- **Response:** `CourseProgressStatsResponse` (totalStudents, averageProgress, completionRate, lessonsStats, etc.)
- **Mô tả:** Thống kê tiến độ học tập của khóa học (tất cả học viên)

---

## 3. Certificate APIs (CertificateController.java + PublicCertificateController.java)

### Backend: 6 endpoints (5 từ CertificateController + 1 từ PublicCertificateController)

| #   | Method | Endpoint                                  | Role           | Frontend Method             | Status |
| --- | ------ | ----------------------------------------- | -------------- | --------------------------- | ------ |
| 1   | GET    | `/students/{studentId}/certificates`      | @Authenticated | `getStudentCertificates()`  | ✅     |
| 2   | GET    | `/certificates/{id}`                      | @Authenticated | `getCertificateDetail()`    | ✅     |
| 3   | GET    | `/certificates/verify?code={code}`        | Public         | `verifyCertificateByCode()` | ✅     |
| 4   | POST   | `/certificates/{id}/download`             | @Authenticated | `downloadCertificate()`     | ✅     |
| 5   | GET    | `/courses/{courseId}/certificates`        | @TeacherOnly   | `getCourseCertificates()`   | ✅     |
| 6   | GET    | `/public/certificates/verify?code={code}` | Public         | `verifyCertificatePublic()` | ✅     |

### Mô tả chi tiết

#### Student/Authenticated APIs

**1. getStudentCertificates(studentId, page, size)**

- **Endpoint:** `GET /students/{studentId}/certificates`
- **Role:** @Authenticated
- **Query params:** page, size
- **Response:** `PaginatedCertificates`
- **Mô tả:** Lấy danh sách chứng chỉ của học viên

**2. getCertificateDetail(id)**

- **Endpoint:** `GET /certificates/{id}`
- **Role:** @Authenticated
- **Response:** `CertificateDetailResponse`
- **Mô tả:** Xem chi tiết chứng chỉ (code, student info, course info, issued date, etc.)

**4. downloadCertificate(id)**

- **Endpoint:** `POST /certificates/{id}/download`
- **Role:** @Authenticated
- **Response:** `Blob` (PDF file)
- **Mô tả:** Tải chứng chỉ dưới dạng PDF

#### Teacher APIs

**5. getCourseCertificates(courseId, page, size)**

- **Endpoint:** `GET /courses/{courseId}/certificates`
- **Role:** @TeacherOnly
- **Query params:** page, size
- **Response:** `PaginatedCertificates`
- **Mô tả:** Lấy danh sách chứng chỉ đã cấp cho khóa học (giảng viên)

#### Public APIs

**3. verifyCertificateByCode(code)**

- **Endpoint:** `GET /certificates/verify?code={code}`
- **Role:** Public (no auth)
- **Query param:** code
- **Response:** `CertificateVerificationResponse` (valid, studentName, courseName, issuedDate, expiryDate, message)
- **Mô tả:** Xác thực chứng chỉ bằng code (không cần đăng nhập)

**6. verifyCertificatePublic(code)**

- **Endpoint:** `GET /public/certificates/verify?code={code}`
- **Role:** Public (no auth)
- **Query param:** code
- **Response:** `CertificateVerificationResponse`
- **Mô tả:** Xác thực chứng chỉ bằng code (endpoint public riêng, không cần đăng nhập)

---

## 4. Student Course APIs (StudentCourseController.java)

### Backend: 8 endpoints

| #   | Method | Endpoint                                             | Role         | Frontend Method               | Status |
| --- | ------ | ---------------------------------------------------- | ------------ | ----------------------------- | ------ |
| 1   | GET    | `/student/courses/{courseId}/chapters`               | @StudentOnly | `getEnrolledCourseChapters()` | ✅     |
| 2   | GET    | `/student/chapters/{chapterId}`                      | @StudentOnly | `getChapterDetails()`         | ✅     |
| 3   | GET    | `/student/chapters/{chapterId}/lessons`              | @StudentOnly | `getChapterLessons()`         | ✅     |
| 4   | GET    | `/student/lessons/{lessonId}`                        | @StudentOnly | `getLessonDetails()`          | ✅     |
| 5   | GET    | `/student/lessons/{lessonId}/video/stream`           | @StudentOnly | `getVideoStreamingUrl()`      | ✅     |
| 6   | GET    | `/student/lessons/{lessonId}/resources`              | @StudentOnly | `getLessonResources()`        | ✅     |
| 7   | GET    | `/student/lessons/{lessonId}/resources/{resourceId}` | @StudentOnly | `getResourceDetails()`        | ✅     |
| 8   | GET    | `/student/courses/{courseId}/structure`              | @StudentOnly | `getCourseStructure()`        | ✅     |

### Mô tả chi tiết

**All endpoints require @StudentOnly**

**🔐 Enrollment Verification:**

- Hầu hết endpoints yêu cầu student đã enroll course (status = ENROLLED hoặc COMPLETED)
- Exception: Preview lessons (lesson.isPreview = true) có thể xem không cần enrollment

#### Chapter Access

**1. getEnrolledCourseChapters(courseId)**

- **Endpoint:** `GET /student/courses/{courseId}/chapters`
- **Role:** @StudentOnly
- **Verification:** Requires active enrollment
- **Response:** `ChapterDto[]`
- **Mô tả:** Lấy danh sách chapters của khóa học đã đăng ký

**2. getChapterDetails(chapterId)**

- **Endpoint:** `GET /student/chapters/{chapterId}`
- **Role:** @StudentOnly
- **Verification:** Requires enrollment in chapter's course
- **Response:** `ChapterDto`
- **Mô tả:** Xem chi tiết chapter (title, description, position, lessonCount)

**3. getChapterLessons(chapterId)**

- **Endpoint:** `GET /student/chapters/{chapterId}/lessons`
- **Role:** @StudentOnly
- **Verification:** Requires enrollment in chapter's course
- **Response:** `LessonDTO[]`
- **Mô tả:** Lấy danh sách lessons trong chapter

#### Lesson Access

**4. getLessonDetails(lessonId)**

- **Endpoint:** `GET /student/lessons/{lessonId}`
- **Role:** @StudentOnly
- **Verification:** Requires enrollment OR lesson.isPreview = true
- **Response:** `LessonDTO`
- **Mô tả:** Xem chi tiết lesson (title, content, videoUrl, duration, type, resources). Preview lessons không cần enrollment

**5. getVideoStreamingUrl(lessonId)**

- **Endpoint:** `GET /student/lessons/{lessonId}/video/stream`
- **Role:** @StudentOnly
- **Verification:** Requires enrollment in lesson's course
- **Response:** `VideoStreamingResponse` (streamingUrl, expiresAt, duration, format)
- **Mô tả:** Lấy presigned URL để stream video. **HLS format**, URL expires after 1 hour

#### Resource Access

**6. getLessonResources(lessonId)**

- **Endpoint:** `GET /student/lessons/{lessonId}/resources`
- **Role:** @StudentOnly
- **Verification:** Requires enrollment in lesson's course
- **Response:** `LessonResourceResponse[]`
- **Mô tả:** Lấy danh sách tài liệu của lesson (PDF, documents, videos, links, code, images)

**7. getResourceDetails(lessonId, resourceId)**

- **Endpoint:** `GET /student/lessons/{lessonId}/resources/{resourceId}`
- **Role:** @StudentOnly
- **Verification:** Requires enrollment in lesson's course
- **Response:** `LessonResourceResponse` (with downloadUrl)
- **Mô tả:** Xem chi tiết tài liệu với presigned download URL

#### Course Structure

**8. getCourseStructure(courseId)**

- **Endpoint:** `GET /student/courses/{courseId}/structure`
- **Role:** @StudentOnly
- **Verification:** Requires enrollment
- **Response:** `CourseStructureResponse` (Course → Chapters[] → Lessons[])
- **Mô tả:** Lấy cấu trúc đầy đủ của khóa học (hierarchy: Course → Chapters → Lessons)

---

## 📊 Tổng kết Backend vs Frontend

| Module             | Backend Endpoints | Frontend APIs | Match       | Status         |
| ------------------ | ----------------- | ------------- | ----------- | -------------- |
| **Enrollment**     | 10                | 10            | ✅ 100%     | Hoàn thành     |
| **Progress**       | 7                 | 7             | ✅ 100%     | Hoàn thành     |
| **Certificate**    | 6                 | 6             | ✅ 100%     | Hoàn thành     |
| **Student Course** | 8                 | 8             | ✅ 100%     | Hoàn thành     |
| **TOTAL**          | **31**            | **31**        | ✅ **100%** | **Hoàn thành** |

### ✅ APIs đã mapping: 31/31

**Enrollment (10):**

- ✅ enrollCourse (Student)
- ✅ getStudentEnrollments (Student)
- ✅ cancelEnrollment (Student)
- ✅ checkFinalExamEligibility (Student)
- ✅ getCourseEnrollments (Teacher)
- ✅ kickStudent (Teacher)
- ✅ completeEnrollment (Teacher)
- ✅ getEnrollmentStats (Teacher)
- ✅ updateEnrollmentScore (Teacher)
- ✅ getEnrollmentDetail (Shared)

**Progress (7):**

- ✅ getStudentProgress (Student)
- ✅ getStudentCourseProgress (Student)
- ✅ getLessonProgress (Student)
- ✅ markLessonAsViewed (Student)
- ✅ markLessonAsCompleted (Student)
- ✅ updateWatchedDuration (Student - auto-complete)
- ✅ getCourseProgressStats (Teacher)

**Certificate (6):**

- ✅ getStudentCertificates (Authenticated)
- ✅ getCertificateDetail (Authenticated)
- ✅ downloadCertificate (Authenticated)
- ✅ getCourseCertificates (Teacher)
- ✅ verifyCertificateByCode (Public)
- ✅ verifyCertificatePublic (Public)

**Student Course (8):**

- ✅ getEnrolledCourseChapters (Student)
- ✅ getChapterDetails (Student)
- ✅ getChapterLessons (Student)
- ✅ getLessonDetails (Student - preview support)
- ✅ getVideoStreamingUrl (Student - HLS streaming)
- ✅ getLessonResources (Student)
- ✅ getResourceDetails (Student - with download URL)
- ✅ getCourseStructure (Student)

---

## 🎯 Đặc điểm quan trọng

### 1. Role-based Access Control

- **@StudentOnly:** Enrollment, progress tracking, course content access
- **@TeacherOnly:** Course management, student management, statistics
- **@Authenticated:** Certificate viewing, download
- **Public:** Certificate verification (no auth required)

### 2. Enrollment Verification

- Hầu hết Student Course APIs yêu cầu active enrollment (status = ENROLLED hoặc COMPLETED)
- Exception: Preview lessons không cần enrollment
- Teacher APIs có thể access tất cả enrollments trong courses của họ

### 3. Auto-completion Logic

- **Video Progress:** Khi watched >= 90% duration → auto-mark as COMPLETED
- **Chapter Progress:** Auto-calculate từ lessons
- **Course Progress:** Auto-calculate từ chapters

### 4. Certificate Generation

- Tự động generate khi enrollment status = COMPLETED
- Mỗi certificate có unique code để verify
- Có thể verify công khai không cần đăng nhập

### 5. Video Streaming

- **Format:** HLS (HTTP Live Streaming)
- **Security:** Presigned URLs with 1-hour expiration
- **Data URI:** Video stream URL là data URI (base64 encoded)
- **Progress tracking:** updateWatchedDuration để track xem video

### 6. Resource Management

- **Types:** PDF, DOCUMENT, VIDEO, LINK, CODE, IMAGE, OTHER
- **Download:** Presigned URLs cho file downloads
- **Access:** Requires enrollment verification

---

## 🔄 Update Summary

### Files Created:

1. ✅ `certificate.service.ts` - 6 APIs
2. ✅ `certificate.types.ts` - Certificate DTOs
3. ✅ `student-course.service.ts` - 8 APIs
4. ✅ `student-course.types.ts` - Course content DTOs

### Files Updated:

1. ✅ `enrollment.service.ts` - Added 3 missing APIs (kickStudent, updateEnrollmentScore, checkFinalExamEligibility)
2. ✅ `enrollment.types.ts` - Added UpdateScoreRequest, FinalExamEligibilityResponse
3. ✅ `progress.service.ts` - Added 1 missing API (updateWatchedDuration)
4. ✅ `progress.types.ts` - Added UpdateWatchedDurationRequest
5. ✅ `index.ts` - Export certificate and student-course services

### Status:

✅ **Module Learning hoàn thành 100%** - Tất cả 31 backend APIs đã được mapping sang frontend
