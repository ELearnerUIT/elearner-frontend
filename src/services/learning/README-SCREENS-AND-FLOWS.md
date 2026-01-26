# Learning Module - Screens & Flows

## 📱 Screen Designs & User Flows

---

## 1. Student Screens

### 1.1 My Courses (Khóa học của tôi)

**Route:** `/[username]/dashboard/courses` hoặc `/learner/courses`

**Purpose:** Hiển thị tất cả khóa học student đã đăng ký

**Components:**

- Course card list (grid layout)
- Filter by status (All, Enrolled, Completed, Cancelled)
- Sort by (Newest, Progress, Alphabetical)
- Search by course name

**API Calls:**

```typescript
// Load courses
const enrollments = await enrollmentService.getStudentEnrollments(
  studentId,
  page,
  size,
  status, // optional filter
);

// For each enrollment, get progress
const progress = await progressService.getStudentProgress(studentId);
```

**Data Display:**

- Course thumbnail
- Course name & instructor
- Enrollment status badge (Pending, Enrolled, Completed, Cancelled)
- Progress bar (completion %)
- Enrollment date
- Last accessed date
- CTA button: "Continue Learning" / "View Certificate" / "Start Course"

**Actions:**

- Click course → Navigate to Course Player
- Filter by status
- Cancel enrollment (if status = ENROLLED)
- View certificate (if status = COMPLETED)

---

### 1.2 Course Player (Trình phát khóa học)

**Route:** `/learner/courses/{courseId}/learn`

**Purpose:** Giao diện học tập chính - xem video, đọc bài, làm quiz

**Layout:**

- **Left Sidebar (30%):** Course structure (chapters & lessons)
- **Main Content (70%):** Video player / Article viewer / Quiz interface
- **Bottom Bar:** Progress indicator, prev/next lesson buttons

**API Calls:**

```typescript
// Load course structure
const structure = await studentCourseService.getCourseStructure(courseId);

// Load enrollment info
const enrollment = await enrollmentService.getEnrollmentDetail(enrollmentId);

// Load course progress
const courseProgress = await progressService.getStudentCourseProgress(
  studentId,
  courseId,
);
```

**Left Sidebar Components:**

- Chapter list (collapsible)
- Lesson list under each chapter
- Lesson status icons:
  - ⭕ Not started (gray)
  - 👁️ Viewed (blue)
  - ✅ Completed (green)
  - 🔒 Locked (if sequential)
  - 🎁 Preview (if isPreview = true)
- Progress percentage for each chapter

**Main Content (Lesson Viewer):**

#### Video Lesson:

```typescript
// Get lesson details
const lesson = await studentCourseService.getLessonDetails(lessonId);

// Get streaming URL
const streaming = await studentCourseService.getVideoStreamingUrl(lessonId);
// streaming.streamingUrl: HLS presigned URL (valid 1 hour)

// Video player events:
// - onPlay: Mark as viewed
await progressService.markLessonAsViewed(lessonId);

// - onTimeUpdate (every 5 seconds): Update watched duration
await progressService.updateWatchedDuration(lessonId, {
  watchedDurationSeconds: currentTime,
});
// Auto-complete when watched >= 90% duration

// - Manual complete button
await progressService.markLessonAsCompleted(lessonId);
```

**Video Player Features:**

- Play/Pause, seek, volume control
- Playback speed (0.5x, 1x, 1.25x, 1.5x, 2x)
- Quality selector (if available)
- Fullscreen mode
- Auto-play next lesson
- Picture-in-picture
- Keyboard shortcuts

**Video Progress Tracking:**

- Track every 5 seconds: `updateWatchedDuration()`
- Auto-complete at 90% watched
- Resume from last position
- Show "You watched 45% of this video"

#### Article Lesson:

- Rich text content (HTML)
- Images, code blocks, embeds
- Table of contents (if long)
- Mark as complete button at bottom

#### Quiz/Assignment Lesson:

- Question list
- Answer submission
- Score display
- Explanation for wrong answers
- Mark as completed automatically when submitted

**Resources Section (Below video):**

```typescript
// Get lesson resources
const resources = await studentCourseService.getLessonResources(lessonId);

// Download resource
const resourceDetail = await studentCourseService.getResourceDetails(
  lessonId,
  resourceId,
);
// Use resourceDetail.downloadUrl to download file
```

**Resource Types:**

- 📄 PDF documents
- 📝 Text documents
- 🎥 Additional videos
- 🔗 External links
- 💻 Code files/repositories
- 🖼️ Images

**Bottom Actions:**

- ⬅️ Previous Lesson
- ✅ Mark as Completed
- ➡️ Next Lesson
- 💬 Q&A / Discussion
- 📝 Take Notes

---

### 1.3 Course Progress Dashboard

**Route:** `/learner/courses/{courseId}/progress`

**Purpose:** Chi tiết tiến độ học tập của student trong khóa học

**API Calls:**

```typescript
const courseProgress = await progressService.getStudentCourseProgress(
  studentId,
  courseId,
);
const enrollment = await enrollmentService.getEnrollmentDetail(enrollmentId);
```

**Components:**

**Overall Progress Card:**

- Circular progress chart (completion %)
- Total lessons: 45
- Completed: 32
- In progress: 5
- Not started: 8
- Estimated time to complete

**Chapter Progress List:**

- Chapter name
- Progress bar (% lessons completed)
- Lesson count: 12/15 completed
- Status: In Progress / Completed

**Lesson Progress Table:**

- Lesson name
- Status (Not Started, Viewed, Completed)
- Video watch time (if video)
- Last accessed date
- CTA: Continue / Review

**Stats Cards:**

- Total study time
- Average lesson completion time
- Current streak (days)
- Study time this week

**Final Exam Eligibility:**

```typescript
const eligibility =
  await enrollmentService.checkFinalExamEligibility(enrollmentId);

if (eligibility.isEligible) {
  // Show "Take Final Exam" button
} else {
  // Show requirements:
  // - Required: 80% completion
  // - Current: 65% completion
  // - Missing requirements:
  //   - Complete Chapter 3 (5 lessons)
  //   - Complete Chapter 4 Quiz
}
```

---

### 1.4 My Certificates (Chứng chỉ của tôi)

**Route:** `/learner/certificates`

**Purpose:** Danh sách chứng chỉ đã đạt được

**API Calls:**

```typescript
const certificates = await certificateService.getStudentCertificates(
  studentId,
  page,
  size,
);
```

**Components:**

**Certificate Grid:**

- Certificate thumbnail (image preview)
- Course name
- Instructor name
- Issued date
- Certificate code (for verification)
- Actions:
  - 👁️ View details
  - ⬇️ Download PDF
  - 🔗 Share link
  - ✅ Verify

**Certificate Detail Modal:**

```typescript
const certificateDetail =
  await certificateService.getCertificateDetail(certificateId);
```

Display:

- Certificate image (large preview)
- Student name & email
- Course name & description
- Instructor name
- Completion date
- Issued date
- Expiry date (if any)
- Certificate code
- Grade / Total score (if available)
- Download PDF button
- Share buttons (LinkedIn, Twitter, Facebook)

**Download Certificate:**

```typescript
const pdfBlob = await certificateService.downloadCertificate(certificateId);
// Download as PDF file: "Certificate-{courseName}-{studentName}.pdf"
const url = URL.createObjectURL(pdfBlob);
const a = document.createElement("a");
a.href = url;
a.download = `Certificate-${courseName}.pdf`;
a.click();
```

---

### 1.5 Course Enrollment Flow

**Route:** `/explore/courses/{courseId}` (public) → Enrollment

**Step 1: Course Details Page**

- Course info, curriculum, instructor
- "Enroll Now" button
- Check if already enrolled:
  ```typescript
  const enrollments = await enrollmentService.getStudentEnrollments(studentId);
  const isEnrolled = enrollments.content.some((e) => e.courseId === courseId);
  ```

**Step 2: Enrollment Form**

```typescript
await enrollmentService.enrollCourse(courseId, {
  paymentMethod: "CREDIT_CARD", // or FREE, BANK_TRANSFER, etc.
  note: "Optional note",
});
```

**Payment Methods:**

- FREE: Auto-enroll (status = ENROLLED)
- CREDIT_CARD: Process payment → status = ENROLLED
- BANK_TRANSFER: Manual verification → status = PENDING

**Step 3: Enrollment Success**

- Show success message
- Enrollment status badge
- CTA: "Start Learning Now"
- Navigate to Course Player

**Enrollment Cancellation:**

```typescript
await enrollmentService.cancelEnrollment(enrollmentId, {
  reason: "Not satisfied with content",
});
```

- Show confirmation dialog
- Update enrollment status to CANCELLED
- Optionally process refund

---

## 2. Teacher Screens

### 2.1 Course Enrollments Management

**Route:** `/teacher/courses/{courseId}/enrollments`

**Purpose:** Quản lý học viên đã đăng ký khóa học

**API Calls:**

```typescript
const enrollments = await enrollmentService.getCourseEnrollments(
  courseId,
  page,
  size,
  status, // filter
);

const stats = await enrollmentService.getEnrollmentStats(courseId);
```

**Stats Cards:**

- Total enrollments: 245
- Active enrollments: 189
- Completed: 42
- Cancelled: 14
- Average completion rate: 68%
- Revenue (if paid course)

**Enrollments Table:**

- Student name & email
- Enrollment date
- Status badge (Pending, Enrolled, Completed, Cancelled)
- Progress (completion %)
- Last accessed date
- Average score (if updated)
- Actions:
  - View details
  - Update score
  - Mark as completed
  - Kick student

**Filters:**

- Status (All, Pending, Enrolled, Completed, Cancelled)
- Date range
- Progress range (0-25%, 25-50%, 50-75%, 75-100%)
- Search by name/email

**Bulk Actions:**

- Send announcement email
- Export to CSV
- Approve pending enrollments

**Teacher Actions:**

**Update Score:**

```typescript
await enrollmentService.updateEnrollmentScore(enrollmentId, {
  averageScore: 85.5,
});
```

**Mark as Completed:**

```typescript
await enrollmentService.completeEnrollment(enrollmentId);
// Changes status to COMPLETED
// Triggers certificate generation
```

**Kick Student:**

```typescript
await enrollmentService.kickStudent(enrollmentId, {
  reason: "Violation of course policies",
});
// Changes status to CANCELLED
// Revokes access to course content
```

---

### 2.2 Course Progress Statistics

**Route:** `/teacher/courses/{courseId}/progress/stats`

**Purpose:** Thống kê tiến độ học tập của khóa học

**API Calls:**

```typescript
const progressStats = await progressService.getCourseProgressStats(courseId);
```

**Components:**

**Overview Cards:**

- Total students: 189
- Average progress: 58%
- Completion rate: 22% (42/189)
- At-risk students: 15 (<25% progress)

**Progress Distribution Chart:**

- Pie chart: 0-25%, 25-50%, 50-75%, 75-100%
- Number of students in each range

**Lesson Analytics:**

- Lessons table:
  - Lesson name
  - Completion rate
  - Average watch time (for videos)
  - Drop-off rate
  - Most replayed sections

**Chapter Performance:**

- Chapter name
- Average completion time
- Students stuck (not progressing >7 days)
- Help requests count

**Student Progress Table:**

- Student name
- Current lesson
- Progress %
- Last activity
- Status indicator:
  - 🟢 Active (accessed < 3 days)
  - 🟡 Inactive (3-7 days)
  - 🔴 At risk (>7 days)

**Actions:**

- Send reminder emails to inactive students
- Export detailed report
- View individual student progress

---

### 2.3 Certificate Management

**Route:** `/teacher/courses/{courseId}/certificates`

**Purpose:** Quản lý chứng chỉ đã cấp cho học viên

**API Calls:**

```typescript
const certificates = await certificateService.getCourseCertificates(
  courseId,
  page,
  size,
);
```

**Components:**

**Certificates Table:**

- Student name
- Certificate code
- Issued date
- Expiry date (if any)
- Grade / Score (if available)
- Status (Valid, Expired)
- Actions:
  - View details
  - Download PDF
  - Revoke (if necessary)

**Filters:**

- Date range
- Status (Valid, Expired)
- Grade range
- Search by student name/code

**Bulk Actions:**

- Regenerate certificates (if template changed)
- Send certificates via email
- Export list to CSV

---

## 3. Public Screens

### 3.1 Certificate Verification

**Route:** `/public/verify-certificate` hoặc `/verify`

**Purpose:** Xác thực chứng chỉ bằng code (không cần đăng nhập)

**Components:**

**Verification Form:**

- Input: Certificate code
- Submit button: "Verify Certificate"

**API Call:**

```typescript
// Method 1: Public endpoint
const result = await certificateService.verifyCertificatePublic(code);

// Method 2: Regular endpoint (also public)
const result = await certificateService.verifyCertificateByCode(code);
```

**Verification Result:**

**Valid Certificate:**

```
✅ Certificate is Valid

Student Name: Nguyen Van A
Course: Full-Stack Web Development
Issued Date: January 15, 2024
Expiry Date: January 15, 2026

Certificate Code: ABC123XYZ789

[View Full Details] [Download PDF]
```

**Invalid Certificate:**

```
❌ Certificate is Invalid

The certificate code "INVALID123" does not exist or has been revoked.

Possible reasons:
- Incorrect code
- Certificate has been revoked
- Certificate has expired

If you believe this is an error, please contact support.
```

**Expired Certificate:**

```
⚠️ Certificate has Expired

Student Name: Nguyen Van B
Course: Python Programming
Issued Date: January 15, 2022
Expiry Date: January 15, 2024

This certificate was valid but has now expired.
```

**Share Verification:**

- Public URL: `https://elearner.com/verify?code=ABC123XYZ789`
- QR code generation for easy verification
- Embed code for displaying on personal website

---

## 4. User Flows

### Flow 1: Complete Course Journey (Student)

```
1. Browse Courses
   ↓
2. View Course Details
   ↓
3. Click "Enroll Now"
   ↓
4. [If paid] Complete Payment
   ↓
5. Enrollment Success (status = ENROLLED)
   ↓
6. Navigate to Course Player
   ↓
7. Select First Lesson
   ↓
8. Watch Video
   - Auto-mark as VIEWED
   - Track watched duration every 5 seconds
   - Auto-complete at 90% watched
   ↓
9. Complete Lesson
   - Manual mark or auto-complete
   ↓
10. Continue to Next Lesson
    - Repeat steps 7-9
    ↓
11. Complete All Chapters
    - Course progress reaches 100%
    ↓
12. Check Final Exam Eligibility
    - GET /enrollments/{id}/final-exam-eligibility
    - If eligible: Show "Take Final Exam" button
    ↓
13. Take Final Exam
    ↓
14. Pass Final Exam
    ↓
15. Teacher Marks Enrollment as COMPLETED
    - POST /enrollments/{id}/complete
    ↓
16. Certificate Auto-Generated
    ↓
17. View Certificate
    - GET /students/{id}/certificates
    ↓
18. Download Certificate PDF
    - POST /certificates/{id}/download
    ↓
19. Share Certificate
    - Share verification link
    - Post on LinkedIn
```

---

### Flow 2: Video Lesson Progress Tracking

```
1. Student Opens Video Lesson
   ↓
2. Load Lesson Details
   GET /student/lessons/{lessonId}
   ↓
3. Get Video Streaming URL
   GET /student/lessons/{lessonId}/video/stream
   - Returns HLS presigned URL (expires in 1 hour)
   ↓
4. Initialize Video Player
   - Load video from streaming URL
   ↓
5. Get Current Progress
   GET /lessons/{lessonId}/progress
   - Resume from last watched position
   ↓
6. Student Clicks Play
   ↓
7. Mark Lesson as VIEWED
   POST /lessons/{lessonId}/mark-viewed
   - Status: NOT_STARTED → VIEWED
   ↓
8. Track Watch Progress
   Every 5 seconds:
   POST /lessons/{lessonId}/update-duration
   {
     watchedDurationSeconds: currentTime
   }
   ↓
9. Auto-Complete Check
   If (watchedDuration >= 90% of videoDuration):
   - Backend auto-marks as COMPLETED
   - Status: VIEWED → COMPLETED
   ↓
10. Update UI
    - Show ✅ checkmark
    - Update chapter progress
    - Update course progress
    ↓
11. Auto-Play Next Lesson
    (if enabled)
```

---

### Flow 3: Teacher Manages Student Progress

```
1. Teacher Opens Course Enrollments
   GET /courses/{courseId}/enrollments
   ↓
2. View Enrollment Stats
   GET /courses/{courseId}/enrollments/stats
   - Total, active, completed, cancelled
   - Average completion rate
   ↓
3. View Course Progress Statistics
   GET /courses/{courseId}/progress/stats
   - Student progress distribution
   - Lesson completion rates
   - At-risk students
   ↓
4. Select Student
   ↓
5. View Student Progress Details
   GET /students/{studentId}/courses/{courseId}/progress
   - Chapter/lesson completion
   - Watch times
   - Last activity
   ↓
6. [If quiz/exam completed] Update Student Score
   POST /enrollments/{enrollmentId}/update-score
   {
     averageScore: 85.5
   }
   ↓
7. [If all requirements met] Mark as Completed
   POST /enrollments/{id}/complete
   - Status: ENROLLED → COMPLETED
   - Triggers certificate generation
   ↓
8. Certificate Auto-Generated
   - System creates certificate record
   - Assigns unique verification code
   ↓
9. Student Receives Notification
   - Email: "Congratulations! You've completed the course"
   - Link to view certificate
   ↓
10. View Course Certificates
    GET /courses/{courseId}/certificates
    - List of all issued certificates
```

---

### Flow 4: Certificate Verification (Public)

```
1. Anyone Visits Verification Page
   /public/verify-certificate
   ↓
2. Enter Certificate Code
   (from student's certificate)
   ↓
3. Click "Verify"
   ↓
4. Call API
   GET /public/certificates/verify?code={code}
   ↓
5. Backend Validates
   - Check if code exists
   - Check if certificate is valid
   - Check if expired
   ↓
6. Return Result
   {
     valid: true/false,
     studentName: "...",
     courseName: "...",
     issuedDate: "...",
     expiryDate: "...",
     message: "..."
   }
   ↓
7. Display Verification Result
   - ✅ Valid: Show certificate details
   - ❌ Invalid: Show error message
   - ⚠️ Expired: Show expiration notice
   ↓
8. [Optional] View Full Details
   - If valid, can view full certificate
   - Download PDF (if authenticated)
```

---

### Flow 5: Enrollment Cancellation & Kick

**Student Cancels (Voluntary):**

```
1. Student Opens Enrollment Details
   ↓
2. Clicks "Cancel Enrollment"
   ↓
3. Confirms & Provides Reason
   ↓
4. POST /enrollments/{id}/cancel
   {
     reason: "Not satisfied with content"
   }
   ↓
5. Status: ENROLLED → CANCELLED
   ↓
6. Access Revoked
   - Cannot access course content
   - Progress preserved (for re-enrollment)
   ↓
7. [If eligible] Process Refund
```

**Teacher Kicks (Forced):**

```
1. Teacher Opens Course Enrollments
   ↓
2. Selects Student
   ↓
3. Clicks "Kick Student"
   ↓
4. Provides Reason
   ↓
5. POST /enrollments/{id}/kick
   {
     reason: "Violation of course policies"
   }
   ↓
6. Status: ENROLLED → CANCELLED
   ↓
7. Student Notified
   - Email notification
   - Reason for removal
   ↓
8. Access Revoked Immediately
```

---

### Flow 6: Course Structure Navigation

```
1. Student Opens Course
   ↓
2. Load Complete Structure
   GET /student/courses/{courseId}/structure
   ↓
3. Response Hierarchy:
   Course
   └── Chapter 1
       ├── Lesson 1.1 (Video)
       ├── Lesson 1.2 (Article)
       └── Lesson 1.3 (Quiz)
   └── Chapter 2
       ├── Lesson 2.1 (Video)
       └── ...
   ↓
4. Display Left Sidebar
   - Collapsible chapters
   - Lesson list with status icons
   - Progress indicators
   ↓
5. Click Lesson
   ↓
6. Load Lesson Content
   GET /student/lessons/{lessonId}
   ↓
7. [If video] Get Streaming URL
   GET /student/lessons/{lessonId}/video/stream
   ↓
8. [If resources] Load Resources
   GET /student/lessons/{lessonId}/resources
   ↓
9. Display Lesson Content
   - Video player / Article / Quiz
   - Resources list below
   ↓
10. Student Interacts
    - Watch video → Track progress
    - Read article → Mark as viewed
    - Complete quiz → Mark as completed
    ↓
11. Navigate to Next Lesson
    - Click "Next" button
    - Or select from sidebar
```

---

## 5. Key UX Patterns

### 5.1 Progress Persistence

- All progress auto-saved
- Resume from last position
- Offline progress syncs when online

### 5.2 Enrollment Verification

- Backend checks enrollment before granting access
- Preview lessons accessible without enrollment
- Clear messaging when access denied

### 5.3 Video Streaming

- HLS adaptive bitrate
- Presigned URLs for security
- 1-hour expiration → refresh automatically
- Background tracking (every 5 seconds)

### 5.4 Auto-Completion

- 90% watch threshold for videos
- Manual complete option available
- Smart chapter/course completion calculation

### 5.5 Certificate Security

- Unique verification codes
- Public verification (no login)
- Expiration dates (optional)
- Revocation support

### 5.6 Real-time Feedback

- Instant progress updates
- Visual indicators (checkmarks, progress bars)
- Notifications for milestones
- Congratulations on completion

---

## 6. Mobile Responsiveness

### Mobile Optimizations:

- **Course Player:**
  - Collapsible sidebar → bottom sheet
  - Fullscreen video by default
  - Touch gestures (swipe for next/prev)
- **Certificate Display:**
  - Vertical card layout
  - Tap to expand details
  - Native share sheet integration

- **Progress Tracking:**
  - Simplified stats cards
  - Scrollable chapter list
  - Bottom navigation

---

## 7. Accessibility

### A11y Features:

- **Video Player:**
  - Captions/subtitles support
  - Keyboard navigation
  - Screen reader announcements
  - High contrast mode

- **Course Structure:**
  - ARIA labels for status icons
  - Focus management
  - Skip navigation links

- **Certificates:**
  - Alt text for images
  - Readable verification results
  - High contrast text

---

## 🎯 Summary

Learning module cung cấp complete student learning experience:

1. **Enrollment:** Đăng ký khóa học với multiple payment methods
2. **Learning:** Video streaming, articles, quizzes với progress tracking
3. **Progress:** Real-time tracking với auto-completion logic
4. **Certificates:** Auto-generation và public verification
5. **Teacher Tools:** Comprehensive management và analytics

**Key Features:**

- ✅ HLS video streaming với presigned URLs
- ✅ Auto-complete at 90% watch threshold
- ✅ Enrollment verification cho content access
- ✅ Public certificate verification
- ✅ Teacher analytics và student management
- ✅ Real-time progress syncing
