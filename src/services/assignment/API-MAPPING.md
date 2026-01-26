# Assignment Module API Mapping

## Tổng quan

Tài liệu này mapping chi tiết các API giữa Frontend và Backend cho module Assignment (Assignment/Submission Management).

**Status**: ✅ **100% COMPLETE** - Tất cả 44 APIs đã được mapping đầy đủ

**Version**: 1.0 - Updated: January 23, 2026

---

## 📋 MODULE 1: ASSIGNMENT MANAGEMENT (Teacher - Core CRUD & Linking)

### 1. Create Independent Assignment

- **Frontend Method**: `createIndependentAssignment(payload: AssignmentRequest): Promise<AssignmentResponse>`
- **Backend Endpoint**: `POST /api/v1/assignments`
- **Controller**: `AssignmentController.createIndependentAssignment()`
- **Role**: `@TeacherOnly`
- **Description**: Tạo assignment độc lập không gắn với lesson nào
- **Use Case**: Teacher tạo assignment vào thư viện chung để có thể tái sử dụng cho nhiều lesson

### 2. Get All Independent Assignments

- **Frontend Method**: `getAllIndependentAssignments(): Promise<AssignmentResponse[]>`
- **Backend Endpoint**: `GET /api/v1/assignments`
- **Controller**: `AssignmentController.getAllIndependentAssignments()`
- **Role**: `@TeacherOnly`
- **Description**: Lấy danh sách tất cả assignment độc lập (chưa gắn lesson)
- **Use Case**: Teacher xem thư viện assignment để chọn assignment gắn vào lesson

### 3. Link Assignment to Lesson

- **Frontend Method**: `linkAssignmentToLesson(lessonId: number, assignmentId: number): Promise<AssignmentResponse>`
- **Backend Endpoint**: `POST /api/v1/lessons/{lessonId}/assignments/{assignmentId}`
- **Controller**: `AssignmentController.linkAssignmentToLesson()`
- **Role**: `@TeacherOnly`
- **Description**: Gắn assignment đã tồn tại vào một lesson
- **Use Case**: Teacher tái sử dụng assignment từ thư viện cho lesson mới

### 4. Unlink Assignment from Lesson

- **Frontend Method**: `unlinkAssignmentFromLesson(lessonId: number, assignmentId: number): Promise<void>`
- **Backend Endpoint**: `DELETE /api/v1/lessons/{lessonId}/assignments/{assignmentId}`
- **Controller**: `AssignmentController.unlinkAssignmentFromLesson()`
- **Role**: `@TeacherOnly`
- **Description**: Gỡ assignment khỏi lesson (assignment vẫn tồn tại trong hệ thống)
- **Use Case**: Teacher muốn thay assignment khác hoặc hủy assignment của lesson

### 5. Create Assignment & Link to Lesson (Convenience)

- **Frontend Method**: `createAssignment(lessonId: number, payload: AssignmentRequest): Promise<AssignmentResponse>`
- **Backend Endpoint**: `POST /api/v1/lessons/{lessonId}/assignments`
- **Controller**: `AssignmentController.createAssignment()`
- **Role**: `@TeacherOnly`
- **Description**: Tạo assignment mới và gắn ngay vào lesson (shortcut)
- **Use Case**: Teacher tạo assignment trực tiếp cho lesson cụ thể

### 6. Get Assignments by Lesson

- **Frontend Method**: `getAssignmentsByLesson(lessonId: number): Promise<AssignmentResponse[]>`
- **Backend Endpoint**: `GET /api/v1/lessons/{lessonId}/assignments`
- **Controller**: `AssignmentController.getAssignments()`
- **Role**: Public (có thể có auth check)
- **Description**: Lấy tất cả assignment của một lesson
- **Use Case**: Hiển thị danh sách assignment trong lesson detail

### 7. Get Assignment by ID

- **Frontend Method**: `getAssignmentById(id: number): Promise<AssignmentResponse>`
- **Backend Endpoint**: `GET /api/v1/assignments/{id}`
- **Controller**: `AssignmentController.getAssignment()`
- **Role**: Public (có thể có auth check)
- **Description**: Lấy chi tiết assignment
- **Use Case**: Xem thông tin chi tiết assignment (teacher edit hoặc student view)

### 8. Update Assignment

- **Frontend Method**: `updateAssignment(id: number, payload: AssignmentRequest): Promise<AssignmentResponse>`
- **Backend Endpoint**: `PUT /api/v1/assignments/{id}`
- **Controller**: `AssignmentController.updateAssignment()`
- **Role**: `@TeacherOnly`
- **Description**: Cập nhật thông tin assignment
- **Use Case**: Teacher chỉnh sửa cấu hình assignment

### 9. Delete Assignment

- **Frontend Method**: `deleteAssignment(id: number): Promise<void>`
- **Backend Endpoint**: `DELETE /api/v1/assignments/{id}`
- **Controller**: `AssignmentController.deleteAssignment()`
- **Role**: `@TeacherOnly`
- **Description**: Xóa assignment và tất cả submissions liên quan
- **Use Case**: Teacher xóa assignment không còn dùng

### 10. Get Assignment Submissions

- **Frontend Method**: `getAssignmentSubmissions(id: number): Promise<SubmissionResponse[]>`
- **Backend Endpoint**: `GET /api/v1/assignments/{id}/submissions`
- **Controller**: `AssignmentController.getAssignmentSubmissions()`
- **Role**: `@TeacherOnly`
- **Description**: Lấy tất cả submissions của một assignment
- **Use Case**: Teacher xem danh sách bài nộp của học sinh

### 11. Check Assignment Eligibility

- **Frontend Method**: `checkEligibility(id: number): Promise<AssignmentEligibilityResponse>`
- **Backend Endpoint**: `GET /api/v1/assignments/{id}/eligibility`
- **Controller**: `AssignmentController.checkEligibility()`
- **Role**: `@StudentOnly`
- **Description**: Kiểm tra student có thể submit assignment không
- **Use Case**: Validate trước khi cho phép student submit

### 12. Get Assignment Statistics

- **Frontend Method**: `getAssignmentStatistics(id: number): Promise<AssignmentStatisticsResponse>`
- **Backend Endpoint**: `GET /api/v1/assignments/{id}/statistics`
- **Controller**: `AssignmentController.getAssignmentStatistics()`
- **Role**: `@TeacherOnly`
- **Description**: Lấy thống kê assignment
- **Use Case**: Teacher xem thống kê submissions

### 13. Get Student Progress

- **Frontend Method**: `getStudentProgress(assignmentId: number, studentId: number): Promise<StudentAssignmentProgressResponse>`
- **Backend Endpoint**: `GET /api/v1/assignments/{assignmentId}/students/{studentId}/progress`
- **Controller**: `AssignmentController.getStudentProgress()`
- **Role**: `@StudentOrTeacher`
- **Description**: Lấy tiến độ của student trên assignment
- **Use Case**: Xem trạng thái hoàn thành

### 14. Clone Assignment

- **Frontend Method**: `cloneAssignment(id: number, targetLessonId: number): Promise<AssignmentResponse>`
- **Backend Endpoint**: `POST /api/v1/assignments/{id}/clone?targetLessonId={lessonId}`
- **Controller**: `AssignmentController.cloneAssignment()`
- **Role**: `@TeacherOnly`
- **Description**: Sao chép assignment sang lesson khác
- **Use Case**: Teacher tạo bản copy assignment cho lesson mới

### 15. Get Late Submissions

- **Frontend Method**: `getLateSubmissions(id: number): Promise<SubmissionResponse[]>`
- **Backend Endpoint**: `GET /api/v1/assignments/{id}/late-submissions`
- **Controller**: `AssignmentController.getLateSubmissions()`
- **Role**: `@TeacherOnly`
- **Description**: Lấy danh sách submissions nộp trễ
- **Use Case**: Teacher xem các bài nộp trễ

### 16. Get Pending Submissions

- **Frontend Method**: `getPendingSubmissions(id: number): Promise<SubmissionResponse[]>`
- **Backend Endpoint**: `GET /api/v1/assignments/{id}/pending-submissions`
- **Controller**: `AssignmentController.getPendingSubmissions()`
- **Role**: `@TeacherOnly`
- **Description**: Lấy danh sách submissions chưa chấm
- **Use Case**: Teacher xem các bài cần chấm

### 17. Get Assignments by Type

- **Frontend Method**: `getAssignmentsByType(lessonId: number, type: AssignmentType): Promise<AssignmentResponse[]>`
- **Backend Endpoint**: `GET /api/v1/lessons/{lessonId}/assignments/by-type?type={type}`
- **Controller**: `AssignmentController.getAssignmentsByType()`
- **Role**: `@StudentOrTeacher`
- **Description**: Lọc assignment theo loại (PRACTICE, HOMEWORK, PROJECT, FINAL_REPORT)
- **Use Case**: Hiển thị assignment theo category

### 18. Extend Due Date

- **Frontend Method**: `extendDueDate(id: number, newDueDate: string): Promise<AssignmentResponse>`
- **Backend Endpoint**: `PUT /api/v1/assignments/{id}/extend-due-date?newDueDate={dueDate}`
- **Controller**: `AssignmentController.extendDueDate()`
- **Role**: `@TeacherOnly`
- **Description**: Gia hạn deadline assignment
- **Use Case**: Teacher kéo dài thời gian nộp bài

---

## 📝 MODULE 2: SUBMISSION MANAGEMENT (Student & Teacher Operations)

### 19. Submit Assignment

- **Frontend Method**: `submitAssignment(assignmentId: number): Promise<SubmissionResponse>`
- **Backend Endpoint**: `POST /api/v1/assignments/{assignmentId}/submit`
- **Controller**: `SubmissionController.submitAssignment()`
- **Role**: `@StudentOnly`
- **Description**: Submit bài làm assignment (finalize submission)
- **Use Case**: Student nộp bài assignment

### 20. Get Submissions by Assignment

- **Frontend Method**: `getSubmissionsByAssignment(assignmentId: number): Promise<SubmissionResponse[]>`
- **Backend Endpoint**: `GET /api/v1/assignments/{assignmentId}/submissions`
- **Controller**: `SubmissionController.getSubmissions()`
- **Role**: `@TeacherOnly`
- **Description**: Lấy tất cả submissions của assignment
- **Use Case**: Teacher xem danh sách bài nộp

### 21. Get Submission by ID

- **Frontend Method**: `getSubmissionById(id: number): Promise<SubmissionResponse>`
- **Backend Endpoint**: `GET /api/v1/submissions/{id}`
- **Controller**: `SubmissionController.getSubmission()`
- **Role**: `@StudentOrTeacher`
- **Description**: Lấy chi tiết một submission
- **Use Case**: Xem bài làm của student hoặc student xem bài của mình

### 22. Grade Submission

- **Frontend Method**: `gradeSubmission(id: number, payload: GradeSubmissionRequest): Promise<SubmissionResponse>`
- **Backend Endpoint**: `POST /api/v1/submissions/{id}/grade`
- **Controller**: `SubmissionController.gradeSubmission()`
- **Role**: `@TeacherOnly`
- **Description**: Chấm điểm submission
- **Use Case**: Teacher chấm bài của student

### 23. Feedback Submission

- **Frontend Method**: `feedbackSubmission(id: number, payload: FeedbackSubmissionRequest): Promise<SubmissionResponse>`
- **Backend Endpoint**: `POST /api/v1/submissions/{id}/feedback`
- **Controller**: `SubmissionController.feedbackSubmission()`
- **Role**: `@TeacherOnly`
- **Description**: Cung cấp feedback cho submission (không chấm điểm)
- **Use Case**: Teacher góp ý cho student

### 24. Get Student Submissions

- **Frontend Method**: `getStudentSubmissions(studentId: number): Promise<SubmissionResponse[]>`
- **Backend Endpoint**: `GET /api/v1/students/{studentId}/submissions`
- **Controller**: `SubmissionController.getStudentSubmissions()`
- **Role**: `@StudentOrTeacher`
- **Description**: Lấy tất cả submissions của một student
- **Use Case**: Xem lịch sử nộp bài của student

### 25. Delete Submission

- **Frontend Method**: `deleteSubmission(id: number): Promise<void>`
- **Backend Endpoint**: `DELETE /api/v1/submissions/{id}`
- **Controller**: `SubmissionController.deleteSubmission()`
- **Role**: `@StudentOnly`
- **Description**: Xóa submission (chỉ trước khi bị chấm)
- **Use Case**: Student xóa bài nộp sai

### 26. Update Submission Content

- **Frontend Method**: `updateSubmissionContent(id: number, content: string): Promise<SubmissionResponse>`
- **Backend Endpoint**: `PUT /api/v1/submissions/{id}/content`
- **Controller**: `SubmissionController.updateSubmissionContent()`
- **Role**: `@StudentOnly`
- **Description**: Cập nhật nội dung submission (text content)
- **Use Case**: Student chỉnh sửa bài làm trước khi nộp

### 27. Get My Submissions

- **Frontend Method**: `getMySubmissions(assignmentId: number): Promise<SubmissionResponse[]>`
- **Backend Endpoint**: `GET /api/v1/assignments/{assignmentId}/my-submissions`
- **Controller**: `SubmissionController.getMySubmissions()`
- **Role**: `@StudentOnly`
- **Description**: Lấy submissions của student hiện tại cho một assignment
- **Use Case**: Student xem lịch sử nộp bài của mình

### 28. Resubmit Assignment

- **Frontend Method**: `resubmitAssignment(assignmentId: number, previousSubmissionId: number): Promise<SubmissionResponse>`
- **Backend Endpoint**: `POST /api/v1/assignments/{assignmentId}/resubmit?previousSubmissionId={id}`
- **Controller**: `SubmissionController.resubmitAssignment()`
- **Role**: `@StudentOnly`
- **Description**: Nộp lại assignment (tạo submission mới dựa trên submission cũ)
- **Use Case**: Student nộp lại sau khi được reject hoặc muốn cải thiện

### 29. Bulk Grade Submissions

- **Frontend Method**: `bulkGradeSubmissions(submissionIds: number[], score: number, feedback?: string): Promise<SubmissionResponse[]>`
- **Backend Endpoint**: `POST /api/v1/submissions/bulk-grade?score={score}&feedback={feedback}`
- **Controller**: `SubmissionController.bulkGradeSubmissions()`
- **Role**: `@TeacherOnly`
- **Description**: Chấm nhiều submissions cùng lúc với cùng điểm
- **Use Case**: Teacher chấm hàng loạt bài giống nhau

### 30. Reject Submission

- **Frontend Method**: `rejectSubmission(id: number, feedback: string): Promise<SubmissionResponse>`
- **Backend Endpoint**: `POST /api/v1/submissions/{id}/reject?feedback={feedback}`
- **Controller**: `SubmissionController.rejectSubmission()`
- **Role**: `@TeacherOnly`
- **Description**: Từ chối submission với feedback (yêu cầu nộp lại)
- **Use Case**: Teacher từ chối bài không đạt yêu cầu

### 31. Get Submissions by Status

- **Frontend Method**: `getSubmissionsByStatus(assignmentId: number, status: SubmissionStatus): Promise<SubmissionResponse[]>`
- **Backend Endpoint**: `GET /api/v1/assignments/{assignmentId}/submissions/by-status?status={status}`
- **Controller**: `SubmissionController.getSubmissionsByStatus()`
- **Role**: `@TeacherOnly`
- **Description**: Lọc submissions theo trạng thái (PENDING, GRADED, REJECTED)
- **Use Case**: Teacher xem các bài theo trạng thái

### 32. Get Late Submissions by Student

- **Frontend Method**: `getLateSubmissionsByStudent(studentId: number): Promise<SubmissionResponse[]>`
- **Backend Endpoint**: `GET /api/v1/students/{studentId}/late-submissions`
- **Controller**: `SubmissionController.getLateSubmissionsByStudent()`
- **Role**: `@TeacherOnly`
- **Description**: Lấy danh sách submissions nộp trễ của student
- **Use Case**: Teacher theo dõi student nộp trễ

### 33. Get Best Submission

- **Frontend Method**: `getBestSubmission(assignmentId: number, studentId: number): Promise<SubmissionResponse>`
- **Backend Endpoint**: `GET /api/v1/assignments/{assignmentId}/students/{studentId}/best-submission`
- **Controller**: `SubmissionController.getBestSubmission()`
- **Role**: `@StudentOrTeacher`
- **Description**: Lấy submission có điểm cao nhất của student
- **Use Case**: Xem bài làm tốt nhất

### 34. Get Student Average Score

- **Frontend Method**: `getStudentAverageScore(studentId: number): Promise<number>`
- **Backend Endpoint**: `GET /api/v1/students/{studentId}/average-score`
- **Controller**: `SubmissionController.getStudentAverageScore()`
- **Role**: `@StudentOrTeacher`
- **Description**: Tính điểm trung bình của student
- **Use Case**: Xem hiệu suất học tập tổng thể

### 35. Regrade Submission

- **Frontend Method**: `regradeSubmission(id: number, score: number, feedback?: string): Promise<SubmissionResponse>`
- **Backend Endpoint**: `POST /api/v1/submissions/{id}/regrade?score={score}&feedback={feedback}`
- **Controller**: `SubmissionController.regradeSubmission()`
- **Role**: `@TeacherOnly`
- **Description**: Chấm lại submission đã chấm (thay đổi điểm)
- **Use Case**: Teacher điều chỉnh điểm sau khi xem xét lại

### 36. Get Passing Rate

- **Frontend Method**: `getPassingRate(assignmentId: number): Promise<number>`
- **Backend Endpoint**: `GET /api/v1/assignments/{assignmentId}/passing-rate`
- **Controller**: `SubmissionController.getPassingRate()`
- **Role**: `@TeacherOnly`
- **Description**: Tính tỷ lệ đạt của assignment
- **Use Case**: Teacher xem thống kê hiệu quả assignment

### 37. Get My Latest Submission

- **Frontend Method**: `getMyLatestSubmission(assignmentId: number): Promise<SubmissionResponse>`
- **Backend Endpoint**: `GET /api/v1/assignments/{assignmentId}/my-latest`
- **Controller**: `SubmissionController.getMyLatestSubmission()`
- **Role**: `@StudentOnly`
- **Description**: Lấy submission mới nhất của student hiện tại
- **Use Case**: Student xem bài nộp gần nhất

### 38. Export Submissions

- **Frontend Method**: `exportSubmissions(assignmentId: number): Promise<SubmissionResponse[]>`
- **Backend Endpoint**: `GET /api/v1/assignments/{assignmentId}/submissions/export`
- **Controller**: `SubmissionController.exportSubmissions()`
- **Role**: `@TeacherOnly`
- **Description**: Export danh sách submissions để báo cáo
- **Use Case**: Teacher xuất dữ liệu submissions

---

## 📎 MODULE 3: SUBMISSION FILE MANAGEMENT

### 39. Upload Submission File

- **Frontend Method**: `uploadSubmissionFile(submissionId: number, file: File): Promise<SubmissionFileResponse>`
- **Backend Endpoint**: `POST /api/v1/submissions/{submissionId}/files`
- **Controller**: `SubmissionFileController.uploadFile()`
- **Role**: `@StudentOnly`
- **Description**: Upload một file đính kèm vào submission
- **Use Case**: Student đính kèm file bài làm

### 40. Upload Multiple Files

- **Frontend Method**: `uploadMultipleFiles(submissionId: number, files: File[]): Promise<SubmissionFileResponse[]>`
- **Backend Endpoint**: `POST /api/v1/submissions/{submissionId}/files/batch`
- **Controller**: `SubmissionFileController.uploadMultipleFiles()`
- **Role**: `@StudentOnly`
- **Description**: Upload nhiều files cùng lúc
- **Use Case**: Student đính kèm nhiều file bài làm

### 41. Get Submission Files

- **Frontend Method**: `getSubmissionFiles(submissionId: number): Promise<SubmissionFileResponse[]>`
- **Backend Endpoint**: `GET /api/v1/submissions/{submissionId}/files`
- **Controller**: `SubmissionFileController.getSubmissionFiles()`
- **Role**: `@StudentOrTeacher`
- **Description**: Lấy danh sách files đính kèm
- **Use Case**: Xem các file trong submission

### 42. Get File Download URL

- **Frontend Method**: `getFileDownloadUrl(submissionId: number, fileId: number): Promise<string>`
- **Backend Endpoint**: `GET /api/v1/submissions/{submissionId}/files/{fileId}/download`
- **Controller**: `SubmissionFileController.getDownloadUrl()`
- **Role**: `@StudentOrTeacher`
- **Description**: Lấy URL để download file
- **Use Case**: Download file bài làm

### 43. Delete Submission File

- **Frontend Method**: `deleteSubmissionFile(submissionId: number, fileId: number): Promise<void>`
- **Backend Endpoint**: `DELETE /api/v1/submissions/{submissionId}/files/{fileId}`
- **Controller**: `SubmissionFileController.deleteFile()`
- **Role**: `@StudentOnly`
- **Description**: Xóa file đính kèm
- **Use Case**: Student xóa file đính kèm sai

### 44. Get File Count

- **Frontend Method**: `getFileCount(submissionId: number): Promise<number>`
- **Backend Endpoint**: `GET /api/v1/submissions/{submissionId}/files/count`
- **Controller**: `SubmissionFileController.getFileCount()`
- **Role**: `@StudentOrTeacher`
- **Description**: Đếm số file trong submission
- **Use Case**: Hiển thị số lượng file đính kèm

---

## 📊 Tổng kết Mapping

### ✅ APIs đã được mapping đầy đủ

- **Total Frontend APIs**: 44 APIs
- **Total Backend APIs**: 44 APIs
- **Matched APIs**: 44 APIs ✅
- **Missing in Backend**: 0 APIs
- **Completion Rate**: 100% 🎉

### 🎯 Module Breakdown

| Module                                                | APIs        | Status      |
| ----------------------------------------------------- | ----------- | ----------- |
| Assignment Management (Teacher - Core CRUD & Linking) | 18 APIs     | ✅ 100%     |
| Submission Management (Student & Teacher Operations)  | 20 APIs     | ✅ 100%     |
| Submission File Management                            | 6 APIs      | ✅ 100%     |
| **TOTAL**                                             | **44 APIs** | **✅ 100%** |

### 🎯 Phân loại theo Role

#### Teacher Only (20 APIs)

- Assignment CRUD: Create independent, Update, Delete
- Get all independent assignments
- Link/Unlink operations
- View all submissions by assignment
- Grade, Feedback, Reject, Regrade
- Bulk grade submissions
- Clone assignment
- Extend due date
- Get assignment statistics
- Get late submissions, pending submissions
- Get submissions by status
- Get late submissions by student
- Get passing rate
- Export submissions

#### Student Only (9 APIs)

- Submit assignment
- Get my submissions
- Update submission content
- Delete submission (before grading)
- Resubmit assignment
- Check assignment eligibility
- Get my latest submission
- Upload files (single & multiple)
- Delete files

#### Student or Teacher (9 APIs)

- Get assignment by ID
- Get assignments by lesson
- Get assignments by type
- Get submission by ID
- Get student submissions
- Get submission files
- Get file download URL
- Get file count
- Get best submission
- Get student average score
- Get student progress

#### Public (6 APIs)

- Get assignment by ID (@StudentOrTeacher)
- Get assignments by lesson (@StudentOrTeacher)
- Get assignments by type (@StudentOrTeacher)
- Get submission files (@StudentOrTeacher)
- Get file download URL (@StudentOrTeacher)
- Get file count (@StudentOrTeacher)

### 🔄 Các Pattern chính

1. **Association Pattern**: Assignment có thể độc lập hoặc gắn với Lesson (giống Quiz)
2. **Reusability Pattern**: Assignment có thể link/unlink từ nhiều lessons
3. **Submission Workflow**: Submit → Pending → Grade/Reject → Completed
4. **File Management**: Multi-file upload support cho submissions
5. **Versioning**: Multiple submissions với attempt tracking
6. **Bulk Operations**: Batch grading cho efficiency

### 📁 Assignment Types

```typescript
type AssignmentType =
  | "PRACTICE" // Bài tập thực hành
  | "HOMEWORK" // Bài tập về nhà
  | "PROJECT" // Dự án
  | "FINAL_REPORT"; // Báo cáo cuối kỳ
```

### 📊 Submission Status

```typescript
type SubmissionStatus =
  | "PENDING" // Chờ chấm
  | "GRADED" // Đã chấm
  | "REJECTED"; // Bị từ chối
```

---

## ⚠️ Lưu ý quan trọng

1. **Authentication**: Tất cả APIs đều yêu cầu authentication (`@SecurityRequirement(name = "bearerAuth")`)
2. **Role-based Access**: Strict separation giữa Teacher và Student roles
3. **File Upload**: Sử dụng `multipart/form-data` cho file uploads
4. **Submission Lifecycle**:
   - Student: Submit → Can update/delete before grading
   - Teacher: Grade/Reject/Feedback
   - Student: Can resubmit if rejected hoặc muốn cải thiện
5. **Audit Trail**: Tracking submittedAt, gradedAt, gradedBy
6. **Attempt Tracking**: Support multiple submissions với attemptNumber
7. **Late Submission**: System tracks due date và isPastDue status
8. **File Management**: Support multiple files per submission

---

## 🚧 Recommendations

### ✅ Backend Status: COMPLETE

Tất cả 44 APIs đã được implement đầy đủ trong backend với 3 controllers:

- `AssignmentController`: 18 endpoints
- `SubmissionController`: 20 endpoints
- `SubmissionFileController`: 6 endpoints

### Frontend Considerations

- Implement proper error handling for all API calls
- Add loading states and skeleton screens
- Cache submission data to reduce API calls
- Implement optimistic UI updates for better UX
- Add file upload progress indicators
- Handle file size limits and validation
- Implement retry logic for failed uploads
- Add confirmation dialogs for destructive actions (delete, reject)

### Integration Points

- File storage service integration
- Notification service (khi có submission mới, graded, etc.)
- Email notifications cho late submissions
- Calendar integration cho due dates
