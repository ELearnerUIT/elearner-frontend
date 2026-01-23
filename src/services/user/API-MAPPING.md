# User Module - API Mapping

This document maps the backend APIs to frontend services for the User module, which includes Student, Teacher, and User Management functionality.

## Overview

- **Backend Controllers**: 3 (StudentController, TeacherController, UserManagementController)
- **Backend APIs**: 26 endpoints
- **Frontend Services**: 1 (user.service.ts)
- **Frontend APIs**: 26 methods

---

## Student APIs (user.service.ts)

### 1. Get Student by ID

- **Frontend**: `userService.getStudentById(id)`
- **Backend**: `GET /students/{id}`
- **Role**: `@Authenticated`
- **Description**: Retrieve detailed information about a student by their ID. Students can only view their own profile, teachers can view students in their courses, and admins can view any student.
- **Response**: `StudentDetailResponse`

### 2. Get Student by Code

- **Frontend**: `userService.getStudentByCode(code)`
- **Backend**: `GET /students/code/{code}`
- **Role**: `@Authenticated`
- **Description**: Retrieve detailed information about a student by their student code.
- **Response**: `StudentDetailResponse`

### 3. Update Student

- **Frontend**: `userService.updateStudent(id, payload)`
- **Backend**: `PUT /students/{id}`
- **Role**: `@StudentOrAdmin`
- **Description**: Update student profile information. Students can only update their own profile, admins can update any student.
- **Request**: `UpdateStudentRequest { fullName, birthDate, phone, bio, gender }`
- **Response**: `StudentDetailResponse`

### 4. Upload Student Avatar

- **Frontend**: `userService.uploadStudentAvatar(id, file)`
- **Backend**: `PUT /students/{id}/avatar`
- **Role**: `@StudentOrAdmin`
- **Description**: Upload a new avatar image for a student. Accepts JPG, PNG, and WEBP formats.
- **Request**: `FormData` with file
- **Response**: `UploadAvatarResponse { avatarUrl }`

### 5. Get Student Courses

- **Frontend**: `userService.getStudentCourses(id, page, size)`
- **Backend**: `GET /students/{id}/courses`
- **Role**: Public (with restrictions based on user context)
- **Description**: Retrieve a paginated list of courses that the student is enrolled in. Students can only view their own courses, teachers can view students in their courses, and admins can view any student's courses.
- **Response**: `PageResponse<StudentCourseResponse>`

### 6. Get Student Progress

- **Frontend**: `userService.getStudentProgress(id)`
- **Backend**: `GET /students/{id}/progress`
- **Role**: `@StudentOrTeacher`
- **Description**: Retrieve detailed learning progress including course completion, quiz scores, and overall statistics. Students can only view their own progress, teachers can view students in their courses, and admins can view any student's progress.
- **Response**: `StudentProgressResponse { totalCourses, completedCourses, inProgressCourses, totalQuizzesTaken, averageQuizScore, totalCertificatesEarned, overallProgress }`

### 7. Get Student Certificates

- **Frontend**: `userService.getStudentCertificates(id, page, size)`
- **Backend**: `GET /students/{id}/certificates`
- **Role**: Public (with restrictions based on user context)
- **Description**: Retrieve a paginated list of certificates earned by the student. Students can only view their own certificates, teachers can view certificates for their courses, and admins can view any student's certificates.
- **Response**: `PageResponse<StudentCertificateResponse>`

### 8. Delete Student

- **Frontend**: `userService.deleteStudent(id)`
- **Backend**: `DELETE /students/{id}`
- **Role**: `@AdminOnly`
- **Description**: Soft delete a student account by setting its status to DEACTIVATED. This action is reversible. Only accessible by administrators.
- **Response**: `void`

---

## Teacher APIs (user.service.ts)

### 9. Get Teacher by ID

- **Frontend**: `userService.getTeacherById(id)`
- **Backend**: `GET /teachers/{id}`
- **Role**: `@Authenticated`
- **Description**: Retrieve detailed information about a teacher by their ID. Teachers can only view their own profile, students can view approved teachers, and admins can view any teacher.
- **Response**: `TeacherDetailResponse`

### 10. Get Teacher by Code

- **Frontend**: `userService.getTeacherByCode(code)`
- **Backend**: `GET /teachers/code/{code}`
- **Role**: `@Authenticated`
- **Description**: Retrieve detailed information about a teacher by their teacher code.
- **Response**: `TeacherDetailResponse`

### 11. Update Teacher

- **Frontend**: `userService.updateTeacher(id, payload)`
- **Backend**: `PUT /teachers/{id}`
- **Role**: `@TeacherOrAdmin`
- **Description**: Update teacher profile information including specialty, degree, and personal details. Teachers can only update their own profile, admins can update any teacher.
- **Request**: `UpdateTeacherRequest { fullName, birthDate, phone, bio, gender, specialty, degree }`
- **Response**: `TeacherDetailResponse`

### 12. Upload Teacher Avatar

- **Frontend**: `userService.uploadTeacherAvatar(id, file)`
- **Backend**: `PUT /teachers/{id}/avatar`
- **Role**: `@TeacherOrAdmin`
- **Description**: Upload a new avatar image for a teacher. Accepts JPG, PNG, and WEBP formats.
- **Request**: `FormData` with file
- **Response**: `UploadAvatarResponse { avatarUrl }`

### 13. Request Teacher Approval

- **Frontend**: `userService.requestTeacherApproval(id)`
- **Backend**: `POST /teachers/{id}/request-approval`
- **Role**: `@TeacherOnly`
- **Description**: Teacher requests approval from admin to start teaching. Can only be called by the teacher themselves.
- **Response**: `TeacherDetailResponse`

### 14. Approve Teacher

- **Frontend**: `userService.approveTeacher(id, payload)`
- **Backend**: `POST /teachers/{id}/approve`
- **Role**: `@AdminOnly`
- **Description**: Admin approves a teacher to allow them to create and publish courses. Only accessible by admins.
- **Request**: `ApproveTeacherRequest { note? }`
- **Response**: `TeacherDetailResponse`

### 15. Reject Teacher

- **Frontend**: `userService.rejectTeacher(id, payload)`
- **Backend**: `POST /teachers/{id}/reject`
- **Role**: `@AdminOnly`
- **Description**: Admin rejects a teacher application with a reason. Only accessible by admins.
- **Request**: `RejectTeacherRequest { reason }`
- **Response**: `TeacherDetailResponse`

### 16. Get Teacher Courses

- **Frontend**: `userService.getTeacherCourses(id, page, size)`
- **Backend**: `GET /teachers/{id}/courses`
- **Role**: `@Authenticated`
- **Description**: Retrieve a paginated list of courses created by the teacher. Teachers can view their own courses, students can view published courses by approved teachers, and admins can view all.
- **Response**: `PageResponse<CourseResponse>`

### 17. Get Teacher Students

- **Frontend**: `userService.getTeacherStudents(id, page, size)`
- **Backend**: `GET /teachers/{id}/students`
- **Role**: `@TeacherOrAdmin`
- **Description**: Retrieve a paginated list of students enrolled in the teacher's courses. Teachers can only view their own students, admins can view any teacher's students.
- **Response**: `PageResponse<StudentResponse>`

### 18. Get Teacher Revenue

- **Frontend**: `userService.getTeacherRevenue(id)`
- **Backend**: `GET /teachers/{id}/revenue`
- **Role**: `@TeacherOrAdmin`
- **Description**: Retrieve revenue statistics including total revenue, monthly revenue, and breakdown by course. Teachers can only view their own revenue, admins can view any teacher's revenue.
- **Response**: `TeacherRevenueResponse { teacherId, totalRevenue, totalCoursesSold, totalStudents, monthlyRevenue[] }`

### 19. Get Teacher Stats

- **Frontend**: `userService.getTeacherStats(id)`
- **Backend**: `GET /teachers/{id}/stats`
- **Role**: Public (with restrictions based on user context)
- **Description**: Retrieve overall statistics including course count, student count, average rating, and total reviews. Teachers can view their own stats, admins can view any teacher's stats.
- **Response**: `TeacherStatsResponse { totalCourses, totalStudents, totalRevenue, averageRating }`

### 20. Delete Teacher

- **Frontend**: `userService.deleteTeacher(id)`
- **Backend**: `DELETE /teachers/{id}`
- **Role**: `@AdminOnly`
- **Description**: Soft delete a teacher account by setting it to DEACTIVATED status. Only accessible by admins.
- **Response**: `void`

---

## User Management APIs (Admin) (user.service.ts)

### 21. Get All Users

- **Frontend**: `userService.getAllUsers(filter, page, size)`
- **Backend**: `GET /admin/users`
- **Role**: `@AdminOnly`
- **Description**: Retrieve a paginated list of all users with advanced filtering capabilities.
- **Query Params**:
  - `keyword` - Search by username, email, full name
  - `role` - Filter by user role (STUDENT, TEACHER, ADMIN)
  - `status` - Filter by account status (ACTIVE, PENDING, SUSPENDED, INACTIVE)
  - `teacherApproved` - Filter teachers by approval status
  - `sortBy` - Sort field (createdAt, lastLoginAt, username, email)
  - `sortDirection` - Sort direction (ASC, DESC)
  - `page`, `size` - Pagination
- **Request**: `UserFilterRequest`
- **Response**: `PageResponse<AdminUserListResponse>`

### 22. Get User Stats

- **Frontend**: `userService.getUserStats()`
- **Backend**: `GET /admin/users/stats`
- **Role**: `@AdminOnly`
- **Description**: Retrieve comprehensive statistics about all users in the system.
- **Response**: `UserStatsResponse { totalUsers, activeUsers, suspendedUsers, pendingUsers, roleStats, statusStats }`

### 23. Export Users

- **Frontend**: `userService.exportUsers(payload)`
- **Backend**: `POST /admin/users/export`
- **Role**: `@AdminOnly`
- **Description**: Export user data to CSV or Excel format with customizable filters.
- **Request**: `ExportUsersRequest { format: 'CSV' | 'EXCEL', filters? }`
- **Response**: `Blob` (file download)

---

## Summary

| API Category    | Frontend APIs | Backend APIs | Missing APIs |
| --------------- | ------------- | ------------ | ------------ |
| Student         | 8             | 8            | 0            |
| Teacher         | 12            | 12           | 0            |
| User Management | 3             | 3            | 0            |
| **Total**       | **23**        | **23**       | **0**        |

### Status: ✅ Complete Mapping

All backend APIs have been successfully mapped to frontend services. No missing or extra APIs.

---

## Role-Based Access Control

### Student Permissions

- View own profile (by ID or code)
- Update own profile
- Upload own avatar
- View own courses
- View own progress
- View own certificates

### Teacher Permissions

- All Student permissions (for their student account if they have one)
- View own teacher profile
- Update own teacher profile
- Upload own avatar
- Request approval from admin
- View students in their courses
- View their courses
- View their students
- View their revenue
- View their statistics

### Admin Permissions

- All Student and Teacher permissions
- View any user's profile
- Update any user's profile
- Approve/reject teacher applications
- Delete any user account
- View all users with filters
- View user statistics
- Export user data
- View any teacher's revenue

---

## Key Features

### Student Management

- Profile management with avatar upload
- Course enrollment tracking
- Learning progress monitoring
- Certificate management
- Soft delete with DEACTIVATED status

### Teacher Management

- Approval workflow (Request → Approve/Reject)
- Profile with specialty and degree
- Course and student tracking
- Revenue statistics
- Overall performance statistics

### User Management (Admin)

- Advanced filtering and sorting
- Comprehensive user statistics
- Export functionality (CSV/Excel)
- Soft delete capability
- Role and status management

---

## API Conventions

### URL Patterns

- Student APIs: `/api/v1/students/*`
- Teacher APIs: `/api/v1/teachers/*`
- User Management APIs: `/api/v1/admin/users/*`

### Response Formats

- Single resource: Direct object (e.g., `StudentDetailResponse`)
- Multiple resources: `PageResponse<T>` with pagination metadata
- File downloads: `Blob` type
- Void operations: `void` (204 No Content)

### Error Handling

- 401 Unauthorized: Authentication required
- 403 Forbidden: Insufficient permissions
- 404 Not Found: Resource not found
- 400 Bad Request: Validation errors

### Pagination

- Default page size: 20
- Max page size: 100
- Zero-indexed pages
- Includes total items and total pages in response
