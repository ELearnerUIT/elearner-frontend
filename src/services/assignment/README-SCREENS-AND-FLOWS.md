# Assignment Module - Screens & User Flows

## 📋 Tổng quan

Document này đề xuất các màn hình (screens/pages) cho module Assignment và mô tả chi tiết user flows cho cả Teacher và Student.

---

## 🎯 Đối tượng sử dụng

### 👨‍🏫 Teacher (Giảng viên)

- Quản lý Assignments (Bài tập)
- Tạo và cấu hình Assignments
- Xem và chấm Submissions (Bài nộp)
- Xem thống kê và tiến độ học sinh

### 👨‍🎓 Student (Học sinh)

- Xem danh sách assignments
- Nộp bài assignments
- Xem kết quả và feedback
- Upload files đính kèm

---

# 👨‍🏫 TEACHER SCREENS & FLOWS

## 📚 Group 1: Assignment Management

### Screen T1: Assignment Library (Independent Assignments)

**Route**: `/teacher/assignments`

**Mục đích**: Quản lý assignment library (assignments chưa gắn lesson)

**Components**:

```
┌─────────────────────────────────────────────┐
│  Assignment Library                          │
│  ┌────────────────┐ ┌──────────────┐       │
│  │ 🔍 Search      │ │ + New        │       │
│  └────────────────┘ └──────────────┘       │
│                                              │
│  Filter: [All Types ▼]  Sort: [Due Date ▼] │
│                                              │
│  ┌──────────────────────────────────────┐  │
│  │ 📝 Math Homework #1                  │  │
│  │    Type: HOMEWORK                    │  │
│  │    Due: Feb 15, 2024                 │  │
│  │    Points: 100 | Time: 120 mins     │  │
│  │    Status: Independent               │  │
│  │    [View] [Edit] [Link] [Delete]    │  │
│  └──────────────────────────────────────┘  │
│                                              │
│  ┌──────────────────────────────────────┐  │
│  │ 📝 Physics Project                   │  │
│  │    Type: PROJECT                     │  │
│  │    Due: Mar 1, 2024                  │  │
│  │    Points: 200 | No time limit      │  │
│  │    Status: Independent               │  │
│  │    [View] [Edit] [Link] [Delete]    │  │
│  └──────────────────────────────────────┘  │
└─────────────────────────────────────────────┘
```

**APIs sử dụng**:

- `getAllIndependentAssignments()` - Load library
- `createIndependentAssignment(payload)` - Tạo mới
- `deleteAssignment(id)` - Xóa assignment
- `linkAssignmentToLesson(lessonId, assignmentId)` - Gắn vào lesson

**Flow**:

```
Teacher clicks "Assignment Library"
  → Navigate to /teacher/assignments
  → Load getAllIndependentAssignments()
  → Display assignment cards

Actions:
  - Click "New" → Navigate to T2 (Create)
  - Click "Edit" → Navigate to T3 (Edit)
  - Click "Link" → Show lesson selector → linkAssignmentToLesson()
  - Click "View" → Navigate to T4 (Assignment detail)
  - Click "Delete" → Confirm → deleteAssignment()
  - Filter by type → Update list
```

---

### Screen T2: Create Assignment

**Route**: `/teacher/assignments/new` hoặc `/teacher/lessons/{lessonId}/assignments/new`

**Mục đích**: Tạo assignment mới

**Components**:

```
┌─────────────────────────────────────────────┐
│  Create Assignment                           │
│                                              │
│  Basic Information                           │
│  ┌────────────────────────────────────────┐│
│  │ Assignment Title *                      ││
│  │ Mathematics Homework #5                 ││
│  └────────────────────────────────────────┘│
│                                              │
│  ┌────────────────────────────────────────┐│
│  │ Assignment Type *        ▼             ││
│  │ • PRACTICE  • HOMEWORK                 ││
│  │ • PROJECT   ● FINAL_REPORT             ││
│  └────────────────────────────────────────┘│
│                                              │
│  ┌────────────────────────────────────────┐│
│  │ Description                             ││
│  │ Complete exercises 1-10 from...         ││
│  │ [Rich text editor with formatting]      ││
│  └────────────────────────────────────────┘│
│                                              │
│  Settings                                    │
│  Total Points            Time Limit (mins)  │
│  ┌──────┐               ┌──────┐           │
│  │ 100  │               │ 120  │ [No limit]│
│  └──────┘               └──────┘           │
│                                              │
│  Max Attempts            Due Date           │
│  ┌──────┐               ┌──────────────┐   │
│  │  3   │ [Unlimited]   │ 2024-02-15   │   │
│  └──────┘               └──────────────┘   │
│                                              │
│  Link to Lesson (Optional)                   │
│  ┌────────────────────────────────────────┐│
│  │ Select lesson...          ▼            ││
│  └────────────────────────────────────────┘│
│                                              │
│  [Cancel]  [Create Assignment]              │
└─────────────────────────────────────────────┘
```

**APIs sử dụng**:

- `createIndependentAssignment(payload)` - Tạo independent
- `createAssignment(lessonId, payload)` - Tạo và gắn lesson

**Assignment Types**:

- **PRACTICE**: Bài tập thực hành
- **HOMEWORK**: Bài tập về nhà
- **PROJECT**: Dự án
- **FINAL_REPORT**: Báo cáo cuối kỳ

**Flow**:

```
CREATE INDEPENDENT:
  Teacher clicks "New Assignment" from library
    → Navigate to /teacher/assignments/new
    → Fill form
    → Leave "Link to Lesson" empty
    → Click "Create" → createIndependentAssignment()
    → Navigate to T4 (Assignment detail)

CREATE FOR LESSON:
  Teacher clicks "Add Assignment" in lesson page
    → Navigate to /lessons/{lessonId}/assignments/new
    → LessonId pre-filled
    → Fill form
    → Click "Create" → createAssignment(lessonId, payload)
    → Navigate to T4 or back to lesson
```

---

### Screen T3: Edit Assignment

**Route**: `/teacher/assignments/{id}/edit`

**Mục đích**: Chỉnh sửa assignment

**Components**: Giống T2 nhưng pre-populated với data

**APIs sử dụng**:

- `getAssignmentById(id)` - Load assignment
- `updateAssignment(id, payload)` - Update

**Flow**:

```
Teacher clicks "Edit"
  → Navigate to /assignments/{id}/edit
  → Load getAssignmentById(id)
  → Populate form
  → Make changes
  → Click "Save" → updateAssignment()
  → Navigate back with success message
```

---

### Screen T4: Assignment Detail & Submission Management

**Route**: `/teacher/assignments/{id}`

**Mục đích**: Xem chi tiết assignment và quản lý submissions

**Components**:

```
┌─────────────────────────────────────────────┐
│  Mathematics Homework #5                    │
│  [Edit] [Clone] [Delete] [Link to Lesson]  │
│                                              │
│  📊 Overview                                │
│  Type: HOMEWORK | Due: Feb 15, 2024        │
│  Points: 100 | Time Limit: 120 mins        │
│  Max Attempts: 3                            │
│                                              │
│  Description:                                │
│  Complete exercises 1-10 from chapter 5...   │
│                                              │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━│
│                                              │
│  📈 Statistics                              │
│  ┌──────────────┐ ┌──────────────┐         │
│  │ Total        │ │ Submitted    │         │
│  │ Students: 30 │ │ Count: 25    │         │
│  └──────────────┘ └──────────────┘         │
│  ┌──────────────┐ ┌──────────────┐         │
│  │ Graded       │ │ Pending      │         │
│  │ Count: 18    │ │ Count: 7     │         │
│  └──────────────┘ └──────────────┘         │
│                                              │
│  Average Score: 78.5 | Pass Rate: 85%      │
│                                              │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━│
│                                              │
│  Submissions (25)                            │
│  Filter: [All Status ▼] [Late Only ☐]      │
│  [Bulk Actions ▼] [Export]                 │
│                                              │
│  ┌──────────────────────────────────────┐  │
│  │ ☐ John Doe                           │  │
│  │    Score: 85/100 | Status: GRADED    │  │
│  │    Submitted: Feb 10, 2:30 PM        │  │
│  │    Attempts: 2/3                     │  │
│  │    [View] [Regrade]                  │  │
│  └──────────────────────────────────────┘  │
│                                              │
│  ┌──────────────────────────────────────┐  │
│  │ ☐ Jane Smith  🔴 Late                │  │
│  │    Score: -- | Status: PENDING       │  │
│  │    Submitted: Feb 16, 10:00 AM       │  │
│  │    Attempts: 1/3                     │  │
│  │    [Grade Now]                       │  │
│  └──────────────────────────────────────┘  │
│                                              │
│  ┌──────────────────────────────────────┐  │
│  │ ☐ Bob Lee                            │  │
│  │    Status: NOT SUBMITTED             │  │
│  │    Attempts: 0/3                     │  │
│  │    [Send Reminder]                   │  │
│  └──────────────────────────────────────┘  │
└─────────────────────────────────────────────┘
```

**APIs sử dụng**:

- `getAssignmentById(id)` - Load assignment
- `getSubmissionsByAssignment(id)` - Load submissions
- `getSubmissionsByStatus(id, status)` - Filter by status
- `deleteAssignment(id)` - Delete
- `bulkGradeSubmissions(ids, score, feedback)` - Bulk grade

**Flow - View Submissions**:

```
Teacher navigates to assignment detail
  → Load getAssignmentById(id)
  → Load getSubmissionsByAssignment(id)
  → Display overview + submission list

Actions:
  - Filter by status → getSubmissionsByStatus()
  - Check "Late Only" → Filter client-side or API call
  - Click "View" on submission → Navigate to T5
  - Click "Grade Now" → Navigate to T5
  - Select multiple + "Bulk Grade" → Show bulk grade dialog
  - Click "Export" → exportSubmissions()
```

**Flow - Bulk Grade**:

```
Teacher selects multiple submissions
  → Click "Bulk Actions" → "Bulk Grade"
  → Show dialog:
    - Score input
    - Feedback textarea
  → Click "Apply" → bulkGradeSubmissions()
  → Reload submissions
```

---

### Screen T5: Grade Submission

**Route**: `/teacher/submissions/{id}/grade`

**Mục đích**: Chấm điểm submission của student

**Components**:

```
┌─────────────────────────────────────────────┐
│  Grade Submission - John Doe                │
│  ← Back to Assignment                       │
│                                              │
│  Assignment: Mathematics Homework #5         │
│  Student: John Doe (#20240001)              │
│  Submitted: Feb 10, 2024 2:30 PM            │
│  Attempt: 2/3                                │
│  Status: PENDING → GRADING                  │
│                                              │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━│
│                                              │
│  📄 Submission Content                      │
│  ┌────────────────────────────────────────┐│
│  │ [Text content or "See attached files"] ││
│  │                                         ││
│  │ Student's answer/solution...            ││
│  │ ...                                     ││
│  └────────────────────────────────────────┘│
│                                              │
│  📎 Attached Files (3)                      │
│  ┌────────────────────────────────────────┐│
│  │ 📄 solution.pdf  (2.3 MB)  [Download] ││
│  │ 📄 code.py       (15 KB)   [Download] ││
│  │ 📊 results.xlsx  (45 KB)   [Download] ││
│  └────────────────────────────────────────┘│
│                                              │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━│
│                                              │
│  Grading                                     │
│                                              │
│  Score * (out of 100)                        │
│  ┌──────────────────┐                       │
│  │ 85               │                       │
│  └──────────────────┘                       │
│  [──────────●────────────] 85%              │
│                                              │
│  Feedback                                    │
│  ┌────────────────────────────────────────┐│
│  │ Good work! Minor errors in question 7.  ││
│  │ Keep practicing...                      ││
│  │ [Rich text editor]                      ││
│  └────────────────────────────────────────┘│
│                                              │
│  Previous Feedback (Attempt #1: 75/100):    │
│  "Need more detail in answers..."           │
│                                              │
│  [Cancel]  [Save as Draft]  [Grade & Notify]│
└─────────────────────────────────────────────┘

Alternative Actions Bar:
┌─────────────────────────────────────────────┐
│  [Reject & Request Resubmit]                │
│  → Opens reject dialog with feedback        │
└─────────────────────────────────────────────┘
```

**APIs sử dụng**:

- `getSubmissionById(id)` - Load submission
- `getSubmissionFiles(submissionId)` - Load files
- `gradeSubmission(id, { grade, feedback })` - Submit grade
- `feedbackSubmission(id, { feedback })` - Save draft feedback
- `rejectSubmission(id, feedback)` - Reject submission

**Flow - Grade**:

```
Teacher clicks "Grade Now" or "View"
  → Navigate to /submissions/{id}/grade
  → Load getSubmissionById(id)
  → Load getSubmissionFiles(submissionId)
  → Display submission content + files

Teacher enters score + feedback:
  → Click "Save as Draft" → feedbackSubmission()
  → Click "Grade & Notify" → gradeSubmission()
    → Update status to GRADED
    → Send notification to student
  → Navigate back to T4
```

**Flow - Reject**:

```
Teacher clicks "Reject"
  → Show reject dialog
  → Enter feedback (required)
  → Click "Reject" → rejectSubmission(id, feedback)
  → Status = REJECTED
  → Student can resubmit
  → Navigate back to T4
```

---

### Screen T6: Assignment Statistics

**Route**: `/teacher/assignments/{id}/statistics`

**Mục đích**: Xem thống kê chi tiết assignment

**Components**:

```
┌─────────────────────────────────────────────┐
│  Assignment Statistics                       │
│  Mathematics Homework #5                    │
│  ← Back to Assignment                       │
│                                              │
│  📊 Submission Overview                     │
│  ┌────────────────────────────────────────┐│
│  │     █                                   ││
│  │     █         █                         ││
│  │     █         █     █                   ││
│  │ █   █     █   █     █   █               ││
│  │ 0-20  20-40  40-60  60-80  80-100      ││
│  │                                         ││
│  │ Score Distribution                      ││
│  └────────────────────────────────────────┘│
│                                              │
│  📈 Key Metrics                             │
│  ┌──────────────────┐ ┌──────────────────┐ │
│  │ Submission Rate  │ │ Average Score    │ │
│  │     83.3%        │ │     78.5         │ │
│  └──────────────────┘ └──────────────────┘ │
│  ┌──────────────────┐ ┌──────────────────┐ │
│  │ Pass Rate        │ │ Late Rate        │ │
│  │     85%          │ │     12%          │ │
│  └──────────────────┘ └──────────────────┘ │
│                                              │
│  📅 Submission Timeline                     │
│  ┌────────────────────────────────────────┐│
│  │ █                                       ││
│  │ █      █                                ││
│  │ ██     █    █                           ││
│  │ ███   ███  ███  █   █  █               ││
│  │ Feb10 Feb11 Feb12 Feb13 Feb14 Feb15    ││
│  │                             ↑ Due Date  ││
│  └────────────────────────────────────────┘│
│                                              │
│  🎯 Performance by Student                  │
│  Top Performers:                             │
│  1. Alice Wu - 98/100                       │
│  2. John Doe - 95/100                       │
│  3. Jane Smith - 92/100                     │
│                                              │
│  Need Attention:                             │
│  • Bob Lee - Not submitted                  │
│  • Tom Brown - 45/100 (Failed)              │
└─────────────────────────────────────────────┘
```

**APIs sử dụng**:

- `getAssignmentStatistics(id)` - ⚠️ Missing in backend
- `getSubmissionsByAssignment(id)` - Fallback to calculate stats
- `getPassingRate(assignmentId)` - Pass rate

**Note**: Statistics API chưa có trong backend, cần implement hoặc calculate client-side từ submissions data.

---

### Screen T7: Assignment in Lesson Context

**Route**: `/teacher/lessons/{lessonId}`

**Mục đích**: Manage assignments trong lesson management page

**Components** (Assignment section trong lesson page):

```
┌─────────────────────────────────────────────┐
│  Lesson: Advanced Calculus                  │
│  ...                                         │
│                                              │
│  📝 Assignments (3)                         │
│  ┌────────────────────────────────────────┐│
│  │ [+ Add Assignment ▼]                   ││
│  │  - Create New Assignment               ││
│  │  - Link Existing Assignment            ││
│  └────────────────────────────────────────┘│
│                                              │
│  ┌──────────────────────────────────────┐  │
│  │ Homework #5 (HOMEWORK)               │  │
│  │ Due: Feb 15 | Points: 100            │  │
│  │ 📊 25/30 submitted | 18 graded       │  │
│  │ [View] [Edit] [Unlink] [Statistics]  │  │
│  └──────────────────────────────────────┘  │
│                                              │
│  ┌──────────────────────────────────────┐  │
│  │ Project #1 (PROJECT)  🔴 7 pending   │  │
│  │ Due: Mar 1 | Points: 200             │  │
│  │ 📊 28/30 submitted | 21 graded       │  │
│  │ [View] [Edit] [Unlink] [Statistics]  │  │
│  └──────────────────────────────────────┘  │
│                                              │
│  ┌──────────────────────────────────────┐  │
│  │ Final Report (FINAL_REPORT)          │  │
│  │ Due: Apr 15 | Points: 300            │  │
│  │ 📊 0/30 submitted                    │  │
│  │ [View] [Edit] [Unlink] [Statistics]  │  │
│  └──────────────────────────────────────┘  │
└─────────────────────────────────────────────┘
```

**APIs sử dụng**:

- `getAssignmentsByLesson(lessonId)` - Load assignments
- `createAssignment(lessonId, payload)` - Create new
- `linkAssignmentToLesson(lessonId, assignmentId)` - Link existing
- `unlinkAssignmentFromLesson(lessonId, assignmentId)` - Unlink

**Flow**:

```
Add Assignment - Create New:
  Click "Add Assignment" → "Create New"
    → Navigate to T2 with lessonId pre-filled
    → Create assignment → Auto-linked to lesson

Add Assignment - Link Existing:
  Click "Add Assignment" → "Link Existing"
    → Show modal with independent assignments
    → Select assignment → linkAssignmentToLesson()
    → Refresh lesson page

Unlink Assignment:
  Click "Unlink"
    → Confirm dialog
    → unlinkAssignmentFromLesson()
    → Assignment becomes independent
    → Refresh lesson page
```

---

# 👨‍🎓 STUDENT SCREENS & FLOWS

## 📚 Group 2: Student Assignment & Submission

### Screen S1: Lesson Assignments List (Student View)

**Route**: `/learner/lessons/{lessonId}`

**Mục đích**: Student xem assignments trong lesson

**Components** (Assignment section):

```
┌─────────────────────────────────────────────┐
│  Lesson: Advanced Calculus                  │
│  ...                                         │
│                                              │
│  📝 Assignments (3)                         │
│                                              │
│  ┌──────────────────────────────────────┐  │
│  │ Homework #5                          │  │
│  │ 📊 HOMEWORK | 100 points             │  │
│  │ ⏱️ Time: 120 mins | Attempts: 3      │  │
│  │ 📅 Due: Feb 15, 2024 11:59 PM       │  │
│  │                                      │  │
│  │ Your Status:                         │  │
│  │ ✓ Submitted (Attempt 2/3)            │  │
│  │ 🎯 Score: 85/100 - GRADED            │  │
│  │ Graded on: Feb 11, 2024             │  │
│  │ [View Feedback] [Resubmit]          │  │
│  └──────────────────────────────────────┘  │
│                                              │
│  ┌──────────────────────────────────────┐  │
│  │ Project #1  🔴 Pending Review        │  │
│  │ 📊 PROJECT | 200 points              │  │
│  │ ⏱️ No time limit | Attempts: 2       │  │
│  │ 📅 Due: Mar 1, 2024 11:59 PM        │  │
│  │                                      │  │
│  │ Your Status:                         │  │
│  │ ✓ Submitted (Attempt 1/2)            │  │
│  │ ⏳ Waiting for grade... (3 files)    │  │
│  │ Submitted: Feb 20, 3:45 PM          │  │
│  │ [View My Submission]                │  │
│  └──────────────────────────────────────┘  │
│                                              │
│  ┌──────────────────────────────────────┐  │
│  │ Final Report  ⚠️ Not Started         │  │
│  │ 📊 FINAL_REPORT | 300 points         │  │
│  │ ⏱️ No time limit | Attempts: 1       │  │
│  │ 📅 Due: Apr 15, 2024 11:59 PM       │  │
│  │                                      │  │
│  │ Your Status:                         │  │
│  │ ❌ Not submitted yet                 │  │
│  │ Attempts: 0/1                        │  │
│  │ [Start Assignment]                   │  │
│  └──────────────────────────────────────┘  │
└─────────────────────────────────────────────┘
```

**APIs sử dụng**:

- `getAssignmentsByLesson(lessonId)` - Load assignments
- `getMySubmissions(assignmentId)` - Load student's submissions
- `checkEligibility(assignmentId)` - ⚠️ Missing - Check if can submit

**Flow**:

```
Student views lesson
  → Load getAssignmentsByLesson(lessonId)
  → For each assignment:
    - Load getMySubmissions(assignmentId) for status
  → Display assignments with status

Click "View Feedback"
  → Navigate to S4 (View submission with feedback)

Click "Resubmit"
  → Navigate to S2 (Submit assignment)

Click "Start Assignment"
  → Navigate to S2 (Submit assignment)

Click "View My Submission"
  → Navigate to S4 (View submission detail)
```

---

### Screen S2: Submit Assignment

**Route**: `/learner/assignments/{id}/submit`

**Mục đích**: Student nộp bài assignment

**Components**:

```
┌─────────────────────────────────────────────┐
│  Submit Assignment                           │
│  ← Back to Lesson                           │
│                                              │
│  Assignment: Homework #5                     │
│  Due: Feb 15, 2024 11:59 PM  ⏰ 2 days left │
│  Points: 100 | Time Limit: 120 mins        │
│  Attempt: 3/3 (Last attempt!)               │
│                                              │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━│
│                                              │
│  📋 Assignment Description                  │
│  Complete exercises 1-10 from chapter 5...   │
│  Show all work and explanations.            │
│                                              │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━│
│                                              │
│  Previous Attempts                           │
│  ┌────────────────────────────────────────┐│
│  │ Attempt #1: 75/100 (Feb 5)             ││
│  │ Attempt #2: 85/100 (Feb 10) ⭐ Best   ││
│  │ [View Details]                         ││
│  └────────────────────────────────────────┘│
│                                              │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━│
│                                              │
│  Your Submission                             │
│                                              │
│  Content (Optional - for text answers)       │
│  ┌────────────────────────────────────────┐│
│  │ Enter your answers here...              ││
│  │ [Text editor]                           ││
│  │                                         ││
│  │                                         ││
│  └────────────────────────────────────────┘│
│                                              │
│  Attach Files *                              │
│  ┌────────────────────────────────────────┐│
│  │ 📎 Drag & drop files here               ││
│  │    or [Browse Files]                    ││
│  │                                         ││
│  │ Accepted: PDF, DOC, ZIP, Images        ││
│  │ Max size: 50MB per file                ││
│  └────────────────────────────────────────┘│
│                                              │
│  Uploaded Files (2):                         │
│  ┌────────────────────────────────────────┐│
│  │ 📄 homework5_solutions.pdf  (2.3 MB)   ││
│  │ [❌ Remove]                             ││
│  │ 📄 calculations.xlsx        (45 KB)    ││
│  │ [❌ Remove]                             ││
│  └────────────────────────────────────────┘│
│                                              │
│  ☐ I confirm this is my own work           │
│                                              │
│  [Cancel]  [Save Draft]  [Submit Assignment]│
│                                              │
│  ⚠️ Once submitted, you cannot edit!        │
└─────────────────────────────────────────────┘
```

**APIs sử dụng**:

- `getAssignmentById(id)` - Load assignment
- `getMySubmissions(assignmentId)` - Load previous attempts
- `submitAssignment(assignmentId)` - Create submission
- `updateSubmissionContent(submissionId, content)` - Update text
- `uploadSubmissionFile(submissionId, file)` - Upload file
- `uploadMultipleFiles(submissionId, files)` - Upload multiple
- `deleteSubmissionFile(submissionId, fileId)` - Remove file

**Flow - New Submission**:

```
Student clicks "Start Assignment" or "Resubmit"
  → Navigate to /assignments/{id}/submit
  → Load getAssignmentById(id)
  → Load getMySubmissions(assignmentId) for history

Create draft submission:
  → submitAssignment(assignmentId)
  → Get submissionId
  → Status = PENDING (not finalized yet)

Student enters content:
  → Type in text editor
  → Click "Save Draft" → updateSubmissionContent()

Student uploads files:
  → Select files → uploadMultipleFiles(submissionId, files)
  → Or drag & drop → uploadSubmissionFile() for each
  → Files appear in list
  → Can remove → deleteSubmissionFile()

Final submit:
  → Check "I confirm..."
  → Click "Submit Assignment"
  → Confirm dialog: "Are you sure? Cannot edit after!"
  → submitAssignment() - finalize status
  → Navigate to S3 (Confirmation)
```

**Flow - Save Draft**:

```
Student clicks "Save Draft"
  → updateSubmissionContent()
  → Show "Draft saved" message
  → Student can leave and come back
  → Resume from S2 with saved data
```

---

### Screen S3: Submission Confirmation

**Route**: `/learner/assignments/{assignmentId}/submitted`

**Mục đích**: Confirmation sau khi submit

**Components**:

```
┌─────────────────────────────────────────────┐
│  🎉 Assignment Submitted!                   │
│                                              │
│  Your submission has been received.          │
│                                              │
│  ┌────────────────────────────────────────┐│
│  │ Assignment: Homework #5                 ││
│  │ Submitted: Feb 10, 2024 3:45 PM        ││
│  │ Attempt: 3/3                            ││
│  │ Files Attached: 2                       ││
│  └────────────────────────────────────────┘│
│                                              │
│  ✅ What's Next?                            │
│  • Your teacher will review your submission │
│  • You'll receive a notification when graded│
│  • Check back later for feedback            │
│                                              │
│  📧 Receipt sent to your email              │
│                                              │
│  [View My Submission] [Back to Lesson]      │
└─────────────────────────────────────────────┘
```

**Flow**:

```
After submitAssignment() succeeds
  → Navigate to /assignments/{assignmentId}/submitted
  → Show confirmation
  → Send email notification

Click "View My Submission"
  → Navigate to S4

Click "Back to Lesson"
  → Navigate to lesson page
```

---

### Screen S4: View Submission & Feedback

**Route**: `/learner/submissions/{id}`

**Mục đích**: Student xem submission và feedback từ teacher

**Components**:

```
┌─────────────────────────────────────────────┐
│  My Submission - Homework #5                │
│  ← Back to Assignment                       │
│                                              │
│  Attempt: 2/3                                │
│  Submitted: Feb 10, 2024 3:45 PM            │
│  Status: GRADED                              │
│                                              │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━│
│                                              │
│  🎯 Your Score                              │
│  ┌────────────────────────────────────────┐│
│  │                                         ││
│  │           85 / 100                      ││
│  │                                         ││
│  │            85%                          ││
│  │         ✓ PASS                          ││
│  └────────────────────────────────────────┘│
│                                              │
│  Graded by: Prof. Smith                     │
│  Graded on: Feb 11, 2024 9:00 AM           │
│                                              │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━│
│                                              │
│  💬 Teacher's Feedback                      │
│  ┌────────────────────────────────────────┐│
│  │ Good work overall! Your solutions are   ││
│  │ correct for questions 1-9.              ││
│  │                                         ││
│  │ Question 10: Minor calculation error.   ││
│  │ Remember to double-check your work.     ││
│  │                                         ││
│  │ Keep up the good work!                  ││
│  └────────────────────────────────────────┘│
│                                              │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━│
│                                              │
│  📄 Your Submission Content                 │
│  ┌────────────────────────────────────────┐│
│  │ [Text content if any]                   ││
│  │ ...                                     ││
│  └────────────────────────────────────────┘│
│                                              │
│  📎 Attached Files (2)                      │
│  ┌────────────────────────────────────────┐│
│  │ 📄 solutions.pdf  (2.3 MB)  [Download] ││
│  │ 📄 calculations.xlsx (45 KB) [Download] ││
│  └────────────────────────────────────────┘│
│                                              │
│  [Back to Lesson]  [Resubmit Assignment]    │
└─────────────────────────────────────────────┘
```

**Variant - Pending Status**:

```
Status: PENDING
  → Show "⏳ Waiting for grade..."
  → No score/feedback section
  → Show submission content & files
  → Option to edit/delete (if not yet graded)
```

**Variant - Rejected Status**:

```
Status: REJECTED
  → Show "❌ Submission Rejected"
  → Show rejection feedback
  → Prominent "Resubmit" button
  → Show what needs improvement
```

**APIs sử dụng**:

- `getSubmissionById(id)` - Load submission
- `getSubmissionFiles(submissionId)` - Load files
- `getFileDownloadUrl(submissionId, fileId)` - Get download link

**Flow**:

```
Student clicks "View My Submission" or "View Feedback"
  → Navigate to /submissions/{id}
  → Load getSubmissionById(id)
  → Load getSubmissionFiles(submissionId)
  → Display based on status:
    - PENDING: Show waiting message
    - GRADED: Show score + feedback
    - REJECTED: Show rejection + resubmit option

Click "Download" on file:
  → getFileDownloadUrl(submissionId, fileId)
  → Open download link

Click "Resubmit":
  → Navigate to S2 with previous submission context
```

---

### Screen S5: My Submissions History

**Route**: `/learner/my-submissions`

**Mục đích**: Student xem tất cả submissions của mình

**Components**:

```
┌─────────────────────────────────────────────┐
│  My Submissions                              │
│                                              │
│  Filter: [All Lessons ▼] [All Status ▼]    │
│  Sort: [Latest First ▼]                     │
│                                              │
│  Advanced Calculus                           │
│  ┌──────────────────────────────────────┐  │
│  │ Homework #5                          │  │
│  │ Attempt 2/3: 85/100 ✓ GRADED        │  │
│  │ Submitted: Feb 10, 2024             │  │
│  │ [View Details]                       │  │
│  └──────────────────────────────────────┘  │
│                                              │
│  ┌──────────────────────────────────────┐  │
│  │ Project #1  ⏳ PENDING               │  │
│  │ Attempt 1/2: Not graded yet          │  │
│  │ Submitted: Feb 20, 2024             │  │
│  │ [View Details]                       │  │
│  └──────────────────────────────────────┘  │
│                                              │
│  Physics 101                                 │
│  ┌──────────────────────────────────────┐  │
│  │ Lab Report #3  🔴 Late               │  │
│  │ Attempt 1/1: 70/100 ✓ GRADED        │  │
│  │ Submitted: Jan 25 (Due: Jan 20)     │  │
│  │ [View Details]                       │  │
│  └──────────────────────────────────────┘  │
│                                              │
│  ┌──────────────────────────────────────┐  │
│  │ Homework #2  ❌ REJECTED             │  │
│  │ Attempt 1/3: Needs resubmission      │  │
│  │ Submitted: Jan 15, 2024             │  │
│  │ [View Feedback] [Resubmit]          │  │
│  └──────────────────────────────────────┘  │
│                                              │
│  Showing 4 of 12 submissions                │
└─────────────────────────────────────────────┘
```

**APIs sử dụng**:

- `getStudentSubmissions(studentId)` - Load all submissions
- `getLateSubmissionsByStudent(studentId)` - Load late submissions

**Flow**:

```
Student navigates to My Submissions
  → Load getStudentSubmissions(studentId)
  → Display grouped by lesson
  → Sort by date (latest first)

Filter/Sort:
  → Apply client-side filtering
  → Or call APIs with filters

Click "View Details":
  → Navigate to S4

Click "Resubmit":
  → Navigate to S2
```

---

## 📊 Complete User Flow Diagrams

### Teacher Complete Flow

```
┌─────────────────────────────────────────────────────┐
│                  TEACHER WORKFLOW                   │
└─────────────────────────────────────────────────────┘

1. SETUP PHASE
   ├─ Create Assignments (T1, T2)
   │   ├─ Independent assignments in library
   │   └─ Or directly in lesson context
   └─ Configure assignment settings

2. ASSIGNMENT MANAGEMENT PHASE
   ├─ Option A: Independent Assignment (T1, T2)
   │   ├─ Create in library
   │   └─ Link to lessons later (T7)
   │
   └─ Option B: Lesson Assignment (T7)
       ├─ Create directly in lesson
       └─ Or link existing

3. MONITORING PHASE (T4)
   ├─ View submissions dashboard
   ├─ Track submission status
   ├─ Filter by status (pending, graded, late)
   └─ Monitor deadline compliance

4. GRADING PHASE (T5)
   ├─ Review submission content
   ├─ Download and check attached files
   ├─ Enter score + feedback
   ├─ Grade or Reject
   └─ Bulk grade similar submissions

5. ANALYSIS PHASE (T6)
   ├─ View assignment statistics
   ├─ Identify struggling students
   ├─ Analyze score distribution
   └─ Track completion rates

6. MAINTENANCE PHASE
   ├─ Update assignments based on feedback
   ├─ Adjust deadlines if needed
   ├─ Clone assignments for reuse
   └─ Archive old assignments
```

### Student Complete Flow

```
┌─────────────────────────────────────────────────────┐
│                  STUDENT WORKFLOW                   │
└─────────────────────────────────────────────────────┘

1. DISCOVERY PHASE (S1)
   ├─ Browse lesson assignments
   ├─ Check due dates
   ├─ Review requirements
   └─ Check attempt limits

2. PREPARATION PHASE
   ├─ Read assignment description
   ├─ Check previous attempts (if any)
   └─ Gather materials/files

3. SUBMISSION PHASE (S2)
   ├─ Start new submission
   ├─ Enter text content (optional)
   ├─ Upload files (required/optional)
   ├─ Save draft (can resume later)
   └─ Final submit (cannot edit after!)

4. CONFIRMATION PHASE (S3)
   ├─ Receive confirmation
   ├─ Get email receipt
   └─ Wait for grading

5. REVIEW PHASE (S4)
   ├─ Receive grade notification
   ├─ View score and feedback
   ├─ Download submission files
   └─ Learn from feedback

6. RETRY PHASE (if needed)
   ├─ If rejected: Fix issues
   ├─ If want to improve: Resubmit
   ├─ Check remaining attempts
   └─ Return to S2 (Submission)

7. TRACKING PHASE (S5)
   ├─ View all submissions history
   ├─ Check overall performance
   ├─ Track late submissions
   └─ Monitor grades across courses
```

---

## 🎨 Design Guidelines

### Status Color Coding

- **Green** (✓): Graded (passed), Submitted successfully
- **Red** (❌): Rejected, Failed, Late submission, Not submitted
- **Yellow** (⏳): Pending grade, In progress
- **Blue** (ℹ️): Information, Due dates
- **Gray**: Not started, Disabled

### Icons Usage

- 📝 Assignment
- 📄 Document/File
- 📎 Attachment
- ✓ Success/Completed
- ❌ Failed/Rejected
- ⏳ Pending/Waiting
- 🔴 Late/Urgent
- ⚠️ Warning/Not Started
- 🎯 Score/Grade
- 💬 Feedback/Comment
- 📊 Statistics

### Status Badges

- **PENDING**: Yellow badge with ⏳
- **GRADED**: Green badge with ✓
- **REJECTED**: Red badge with ❌
- **LATE**: Red dot 🔴 + "Late" label

---

## 🔐 Security & Access Control

### Teacher Endpoints

- All CRUD on assignments
- Link/Unlink operations
- View all submissions
- Grade, feedback, reject, regrade
- Bulk operations
- Export data
- Statistics

### Student Endpoints

- View assignments in enrolled lessons
- Submit assignments
- View own submissions only
- Upload/delete own files (before grading)
- Update submission content (before grading)
- Resubmit if allowed

### Validation Rules

- **Attempt Limits**: Enforce maxAttempts
- **Due Date**: Track and mark late submissions
- **File Size**: Limit upload size (e.g., 50MB)
- **File Types**: Restrict allowed file types
- **Edit Lock**: Cannot edit after submission finalized
- **Enrollment**: Verify student is enrolled in course

---

## 🚀 Implementation Priority

### Phase 1 (MVP)

1. T1-T3: Basic Assignment CRUD
2. T4-T5: Submission Management & Grading
3. S1-S4: Student Assignment & Submission Flow

### Phase 2 (Enhanced Features)

4. T6: Assignment Statistics
5. S5: Submission History
6. File Upload/Download
7. T7: Lesson Context Management

### Phase 3 (Advanced Features)

8. Bulk operations (grading, export)
9. Advanced filtering & search
10. Notifications & reminders
11. Late submission policies
12. Plagiarism detection integration

---

## 📝 Notes for Developers

### Key Technical Considerations

1. **File Upload**:
   - Use `FormData` for multipart uploads
   - Implement chunked upload for large files
   - Show upload progress
   - Validate file types and sizes client-side

2. **Auto-save**:
   - Implement auto-save for submission content
   - Save draft every 30 seconds or on blur
   - Show "Saving..." / "Saved" indicator

3. **Real-time Updates**:
   - Consider WebSocket for grade notifications
   - Push notifications when graded
   - Real-time submission count updates for teachers

4. **State Management**:
   - Cache submission lists
   - Invalidate cache on grade/submit
   - Optimistic updates for better UX

5. **Error Handling**:
   - Handle file upload failures gracefully
   - Retry mechanism for network errors
   - Show clear error messages
   - Prevent data loss on errors

6. **Performance**:
   - Lazy load files list
   - Paginate large submission lists
   - Compress images before upload
   - Use thumbnails for file previews

7. **Accessibility**:
   - Screen reader support
   - Keyboard navigation
   - ARIA labels for status badges
   - Color-blind friendly design

8. **Mobile Considerations**:
   - Responsive file upload UI
   - Touch-friendly buttons
   - Simplified grading interface on mobile
   - Photo upload from camera

### Missing Backend APIs

Cần implement các APIs sau trong backend:

1. `GET /assignments/{id}/eligibility` - Check eligibility
2. `GET /assignments/{id}/statistics` - Statistics
3. `GET /assignments/{assignmentId}/students/{studentId}/progress` - Student progress
4. `POST /assignments/{id}/clone` - Clone assignment
5. `GET /assignments/{id}/late-submissions` - Late submissions
6. `GET /assignments/{id}/pending-submissions` - Pending submissions
7. `GET /lessons/{lessonId}/assignments/by-type` - Filter by type
8. `PUT /assignments/{id}/extend-due-date` - Extend deadline

Các APIs này có trong frontend nhưng chưa có controller endpoint trong backend.

---

Tài liệu này cung cấp blueprint đầy đủ cho việc implement module Assignment. Mỗi screen được thiết kế để map chặt chẽ với APIs đã có và xác định rõ những APIs còn thiếu cần phát triển thêm.
