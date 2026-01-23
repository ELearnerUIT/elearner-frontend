# Assessment Module - Screens & User Flows

## 📋 Tổng quan

Document này đề xuất các màn hình (screens/pages) cho module Assessment và mô tả chi tiết user flows cho cả Teacher và Student.

---

## 🎯 Đối tượng sử dụng

### 👨‍🏫 Teacher (Giảng viên)

- Quản lý Question Banks (Ngân hàng câu hỏi)
- Quản lý Questions (Câu hỏi)
- Tạo và cấu hình Quizzes
- Xem thống kê và kết quả học sinh

### 👨‍🎓 Student (Học sinh)

- Xem danh sách quizzes
- Làm quizzes
- Xem kết quả và lịch sử attempts

---

# 👨‍🏫 TEACHER SCREENS & FLOWS

## 📚 Group 1: Question Bank Management

### Screen T1: Question Banks List

**Route**: `/teacher/question-banks`

**Mục đích**: Quản lý tất cả question banks của teacher

**Components**:

```
┌─────────────────────────────────────────────┐
│  Question Banks                              │
│  ┌────────────────┐ ┌────────────┐         │
│  │ 🔍 Search      │ │ + New Bank │         │
│  └────────────────┘ └────────────┘         │
│                                              │
│  ┌──────────────────────────────────────┐  │
│  │ 📁 Mathematics Bank       150 ❓     │  │
│  │    Created: 2024-01-10              │  │
│  │    [View] [Edit] [Clone] [Delete]   │  │
│  └──────────────────────────────────────┘  │
│                                              │
│  ┌──────────────────────────────────────┐  │
│  │ 📁 Physics Bank           85 ❓      │  │
│  │    Created: 2024-01-15              │  │
│  │    [View] [Edit] [Clone] [Delete]   │  │
│  └──────────────────────────────────────┘  │
└─────────────────────────────────────────────┘
```

**APIs sử dụng**:

- `getQuestionBanksByTeacher(teacherId)` - Load danh sách
- `searchQuestionBanks(keyword)` - Tìm kiếm
- `createQuestionBank(teacherId, payload)` - Tạo mới
- `deleteQuestionBank(id)` - Xóa bank
- `cloneQuestionBank(id, targetTeacherId)` - Clone bank

**Features**:

1. Hiển thị grid/list các question banks
2. Search realtime
3. Quick stats (số lượng questions)
4. Actions: View, Edit, Clone, Delete
5. Pagination nếu có nhiều banks

**Flow**:

```
Teacher clicks "Question Banks"
  → Load getQuestionBanksByTeacher()
  → Display list with stats

Actions:
  - Click "New Bank" → Navigate to T2 (Create)
  - Click "View" → Navigate to T3 (Questions list)
  - Click "Edit" → Open edit modal/form
  - Click "Clone" → Confirm dialog → cloneQuestionBank()
  - Click "Delete" → Confirm dialog → deleteQuestionBank()
  - Type in search → searchQuestionBanks() → Update list
```

---

### Screen T2: Create/Edit Question Bank

**Route**: `/teacher/question-banks/new` hoặc `/teacher/question-banks/{id}/edit`

**Mục đích**: Tạo mới hoặc chỉnh sửa question bank

**Components**:

```
┌─────────────────────────────────────────────┐
│  Create Question Bank                        │
│                                              │
│  Bank Name *                                 │
│  ┌────────────────────────────────────────┐│
│  │ Mathematics - Grade 10                  ││
│  └────────────────────────────────────────┘│
│                                              │
│  Description                                 │
│  ┌────────────────────────────────────────┐│
│  │ Question bank for Math grade 10        ││
│  │ including algebra, geometry...          ││
│  └────────────────────────────────────────┘│
│                                              │
│  [Cancel]  [Save Question Bank]             │
└─────────────────────────────────────────────┘
```

**APIs sử dụng**:

- `createQuestionBank(teacherId, payload)` - Tạo mới
- `updateQuestionBank(id, payload)` - Cập nhật
- `getQuestionBankById(id)` - Load data khi edit

**Flow**:

```
CREATE MODE:
  Teacher clicks "New Bank"
    → Navigate to /question-banks/new
    → Fill form
    → Click "Save" → createQuestionBank()
    → Navigate back to T1 with success message

EDIT MODE:
  Teacher clicks "Edit" on bank
    → Navigate to /question-banks/{id}/edit
    → Load getQuestionBankById(id)
    → Populate form
    → Make changes
    → Click "Save" → updateQuestionBank()
    → Navigate back to T1 with success message
```

---

### Screen T3: Questions List (in Bank)

**Route**: `/teacher/question-banks/{bankId}/questions`

**Mục đích**: Quản lý questions trong một bank

**Components**:

```
┌─────────────────────────────────────────────┐
│  Mathematics Bank - Questions               │
│  ← Back to Banks                            │
│                                              │
│  ┌────────────┐ ┌──────────────┐           │
│  │ + Question │ │ Bulk Actions ▼│          │
│  └────────────┘ └──────────────┘           │
│                                              │
│  Filters: [All Types ▼] [Search...]        │
│                                              │
│  ☑ Questions (150)                          │
│                                              │
│  ┌──────────────────────────────────────┐  │
│  │ ☑ Q1. What is 2 + 2?                 │  │
│  │    Type: Multiple Choice  Points: 1  │  │
│  │    Used in: 3 quizzes               │  │
│  │    [View] [Edit] [Clone] [Delete]   │  │
│  └──────────────────────────────────────┘  │
│                                              │
│  ┌──────────────────────────────────────┐  │
│  │ ☑ Q2. True or False: Earth is flat  │  │
│  │    Type: True/False  Points: 1      │  │
│  │    Used in: 1 quiz                  │  │
│  │    [View] [Edit] [Clone] [Delete]   │  │
│  └──────────────────────────────────────┘  │
└─────────────────────────────────────────────┘
```

**APIs sử dụng**:

- `getQuestionsByBank(bankId)` - Load questions
- `searchQuestions(bankId, keyword)` - Search
- `getQuestionsByType(bankId, type)` - Filter by type
- `deleteQuestion(id)` - Xóa single
- `bulkDeleteQuestions(questionIds)` - Xóa nhiều
- `cloneQuestion(id, targetBankId)` - Clone
- `checkQuestionInUse(id)` - Check trước khi xóa
- `getQuizzesUsingQuestion(id)` - Show usage

**Features**:

1. Filter by question type
2. Search trong bank
3. Multi-select cho bulk actions
4. Show usage status (used in X quizzes)
5. Warning khi delete question đang được dùng

**Flow**:

```
Teacher clicks "View" on a bank
  → Navigate to /question-banks/{bankId}/questions
  → Load getQuestionsByBank(bankId)
  → Display questions list

Actions:
  - Click "Add Question" → Navigate to T4 (Create)
  - Select type filter → getQuestionsByType()
  - Type in search → searchQuestions()
  - Click "Edit" → Navigate to T4 (Edit)
  - Click "Clone" → Show bank selector → cloneQuestion()
  - Click "Delete" → checkQuestionInUse()
    - If in use → Show warning + getQuizzesUsingQuestion()
    - Confirm → deleteQuestion()
  - Select multiple + "Bulk Delete" → bulkDeleteQuestions()
```

---

### Screen T4: Create/Edit Question

**Route**: `/teacher/question-banks/{bankId}/questions/new` hoặc `/questions/{id}/edit`

**Mục đích**: Tạo hoặc chỉnh sửa question

**Components**:

```
┌─────────────────────────────────────────────┐
│  Create Question                             │
│                                              │
│  Question Type *                             │
│  ┌────────────────────────────────────────┐│
│  │ Multiple Choice          ▼             ││
│  └────────────────────────────────────────┘│
│                                              │
│  Question Content *                          │
│  ┌────────────────────────────────────────┐│
│  │ What is the result of 2 + 2?           ││
│  └────────────────────────────────────────┘│
│                                              │
│  Max Points *                                │
│  ┌──────┐                                   │
│  │ 1.0  │                                   │
│  └──────┘                                   │
│                                              │
│  Answer Options                              │
│  ┌────────────────────────────────────────┐│
│  │ ○ Option 1: 3                          ││
│  │ ● Option 2: 4  ✓ Correct               ││
│  │ ○ Option 3: 5                          ││
│  │ ○ Option 4: 6                          ││
│  │ [+ Add Option]                         ││
│  └────────────────────────────────────────┘│
│                                              │
│  Metadata (Optional)                         │
│  ┌────────────────────────────────────────┐│
│  │ {"difficulty": "easy", "topic": "..."} ││
│  └────────────────────────────────────────┘│
│                                              │
│  [Cancel]  [Save Question]                  │
└─────────────────────────────────────────────┘
```

**APIs sử dụng**:

- `createQuestion(bankId, payload)` - Tạo mới
- `updateQuestion(id, payload)` - Cập nhật
- `getQuestionById(id)` - Load khi edit
- `manageAnswerOptions(questionId, options)` - Quản lý options
- `updateMaxPoints(id, maxPoints)` - Update điểm

**Question Types Support**:

1. **MULTIPLE_CHOICE**: 1 đáp án đúng
2. **MULTI_SELECT**: Nhiều đáp án đúng
3. **TRUE_FALSE**: Đúng/Sai
4. **FILL_BLANK**: Điền vào chỗ trống
5. **ESSAY**: Tự luận

**Flow**:

```
CREATE MODE:
  Teacher clicks "Add Question"
    → Navigate to /question-banks/{bankId}/questions/new
    → Select question type
    → Form changes based on type
    → Fill content + options
    → Click "Save" → createQuestion() + manageAnswerOptions()
    → Navigate back to T3

EDIT MODE:
  Teacher clicks "Edit" on question
    → Navigate to /questions/{id}/edit
    → Load getQuestionById(id)
    → Populate form
    → Make changes
    → Click "Save" → updateQuestion() + manageAnswerOptions()
    → Navigate back to T3
```

---

## 🎯 Group 2: Quiz Management

### Screen T5: Quiz Library (Independent Quizzes)

**Route**: `/teacher/quizzes`

**Mục đích**: Quản lý quiz library (quizzes chưa gắn lesson)

**Components**:

```
┌─────────────────────────────────────────────┐
│  Quiz Library                                │
│  ┌────────────────┐ ┌─────────────┐        │
│  │ 🔍 Search      │ │ + New Quiz  │        │
│  └────────────────┘ └─────────────┘        │
│                                              │
│  ┌──────────────────────────────────────┐  │
│  │ 📝 Midterm Math Quiz                 │  │
│  │    20 questions | 60 mins | 3 tries │  │
│  │    Status: Independent               │  │
│  │    [View] [Edit] [Link] [Delete]    │  │
│  └──────────────────────────────────────┘  │
│                                              │
│  ┌──────────────────────────────────────┐  │
│  │ 📝 Physics Final                     │  │
│  │    50 questions | 90 mins | 1 try   │  │
│  │    Status: Independent               │  │
│  │    [View] [Edit] [Link] [Delete]    │  │
│  └──────────────────────────────────────┘  │
└─────────────────────────────────────────────┘
```

**APIs sử dụng**:

- `getAllIndependentQuizzes()` - Load library
- `createIndependentQuiz(payload)` - Tạo quiz
- `deleteQuiz(id)` - Xóa quiz
- `linkQuizToLesson(lessonId, quizId)` - Gắn vào lesson

**Flow**:

```
Teacher clicks "Quiz Library"
  → Navigate to /teacher/quizzes
  → Load getAllIndependentQuizzes()
  → Display quiz cards

Actions:
  - Click "New Quiz" → Navigate to T6 (Create)
  - Click "Edit" → Navigate to T7 (Edit quiz)
  - Click "Link" → Show lesson selector → linkQuizToLesson()
  - Click "View" → Navigate to T8 (Quiz detail)
  - Click "Delete" → Confirm → deleteQuiz()
```

---

### Screen T6: Create Quiz

**Route**: `/teacher/quizzes/new` hoặc `/teacher/lessons/{lessonId}/quizzes/new`

**Mục đích**: Tạo quiz mới (independent hoặc gắn lesson luôn)

**Components**:

```
┌─────────────────────────────────────────────┐
│  Create Quiz                                 │
│                                              │
│  Basic Information                           │
│  ┌────────────────────────────────────────┐│
│  │ Quiz Title *                            ││
│  │ Midterm Mathematics                     ││
│  └────────────────────────────────────────┘│
│                                              │
│  ┌────────────────────────────────────────┐│
│  │ Description                             ││
│  │ This quiz covers chapters 1-5...        ││
│  └────────────────────────────────────────┘│
│                                              │
│  Settings                                    │
│  Time Limit (minutes)    Max Attempts       │
│  ┌──────┐               ┌──────┐           │
│  │  60  │               │  3   │           │
│  └──────┘               └──────┘           │
│                                              │
│  Passing Score (%)       Total Points       │
│  ┌──────┐               ┌──────┐           │
│  │  70  │               │ 100  │           │
│  └──────┘               └──────┘           │
│                                              │
│  Availability                                │
│  Start Date              End Date           │
│  ┌────────────┐         ┌────────────┐     │
│  │ 2024-02-01 │         │ 2024-02-15 │     │
│  └────────────┘         └────────────┘     │
│                                              │
│  Options                                     │
│  ☑ Randomize Questions                      │
│  ☑ Randomize Options                        │
│                                              │
│  Link to Lesson (Optional)                   │
│  ┌────────────────────────────────────────┐│
│  │ Select lesson...          ▼            ││
│  └────────────────────────────────────────┘│
│                                              │
│  [Cancel]  [Create Quiz]                    │
└─────────────────────────────────────────────┘
```

**APIs sử dụng**:

- `createIndependentQuiz(payload)` - Tạo independent
- `createQuiz(lessonId, payload)` - Tạo và gắn lesson

**Flow**:

```
CREATE INDEPENDENT:
  Teacher clicks "New Quiz" from library
    → Navigate to /teacher/quizzes/new
    → Fill form
    → Leave "Link to Lesson" empty
    → Click "Create" → createIndependentQuiz()
    → Navigate to T8 (Add questions)

CREATE FOR LESSON:
  Teacher clicks "Add Quiz" in lesson page
    → Navigate to /lessons/{lessonId}/quizzes/new
    → LessonId pre-filled
    → Fill form
    → Click "Create" → createQuiz(lessonId, payload)
    → Navigate to T8 (Add questions)
```

---

### Screen T7: Edit Quiz (Configuration)

**Route**: `/teacher/quizzes/{id}/edit`

**Mục đích**: Chỉnh sửa cấu hình quiz

**Components**: Giống T6 nhưng pre-populated với data

**APIs sử dụng**:

- `getQuizById(id)` - Load quiz
- `updateQuiz(id, payload)` - Update general info
- `updateTimeLimit(id, minutes)` - Update time
- `updatePassingScore(id, score)` - Update passing score
- `updateMaxAttempts(id, attempts)` - Update max attempts

**Flow**:

```
Teacher clicks "Edit Quiz"
  → Navigate to /quizzes/{id}/edit
  → Load getQuizById(id)
  → Populate form
  → Make changes
  → Click "Save" → updateQuiz() or specific update APIs
  → Navigate back with success message
```

---

### Screen T8: Quiz Detail & Question Management

**Route**: `/teacher/quizzes/{id}`

**Mục đích**: Xem detail quiz và quản lý questions trong quiz

**Components**:

```
┌─────────────────────────────────────────────┐
│  Midterm Mathematics Quiz                   │
│  [Edit Settings] [Clone] [Delete] [Preview]│
│                                              │
│  📊 Overview                                │
│  Questions: 20 | Time: 60 mins | Pass: 70% │
│  Total Points: 100 | Max Attempts: 3        │
│  Available: Feb 1 - Feb 15, 2024           │
│                                              │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━│
│                                              │
│  Questions (20)                              │
│  ┌─────────────────────────────────────┐   │
│  │ [Add Questions ▼] [Remove All]      │   │
│  │  - From Question Bank               │   │
│  │  - Random from Bank                 │   │
│  │  - Create New Question              │   │
│  └─────────────────────────────────────┘   │
│                                              │
│  ┌──────────────────────────────────────┐  │
│  │ ⋮⋮ 1. What is 2 + 2?                │  │
│  │    Multiple Choice | 5 points        │  │
│  │    [View] [Remove] [Edit Points]    │  │
│  └──────────────────────────────────────┘  │
│                                              │
│  ┌──────────────────────────────────────┐  │
│  │ ⋮⋮ 2. True/False: Earth is round    │  │
│  │    True/False | 2 points             │  │
│  │    [View] [Remove] [Edit Points]    │  │
│  └──────────────────────────────────────┘  │
│                                              │
│  [Reorder Mode]                             │
│                                              │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━│
│                                              │
│  📈 Statistics (if quiz has attempts)       │
│  Average Score: 75 | Pass Rate: 65%        │
│  Total Attempts: 45 | Unique Students: 15  │
│  [View Detailed Statistics]                 │
│  [View Student Results]                     │
└─────────────────────────────────────────────┘
```

**APIs sử dụng**:

- `getQuizById(id)` - Load quiz
- `getQuizQuestions(quizId)` - Load questions
- `addQuestionsToQuiz(id, { questionIds })` - Add specific questions
- `addQuestionsFromBank(id, bankId, count)` - Add random
- `removeQuestionFromQuiz(quizId, questionId)` - Remove one
- `removeAllQuestions(id)` - Clear all
- `reorderQuestions(id, questionIdsInOrder)` - Reorder
- `getQuestionCount(id)` - Get count
- `cloneQuiz(id, targetLessonId)` - Clone
- `getQuizStatistics(id)` - Load stats

**Flow - Add Questions**:

```
Teacher clicks "Add Questions"
  → Show dropdown menu

Option 1: From Question Bank
  → Show modal with question banks
  → Select bank → Load getQuestionsByBank()
  → Multi-select questions
  → Click "Add" → addQuestionsToQuiz()
  → Reload questions

Option 2: Random from Bank
  → Show modal: Select bank + count
  → Click "Add" → addQuestionsFromBank(id, bankId, count)
  → Reload questions

Option 3: Create New
  → Navigate to T4 (create question in bank)
  → After create → Back to quiz → Add to quiz
```

**Flow - Reorder Questions**:

```
Teacher clicks "Reorder Mode"
  → Questions become draggable
  → Drag & drop to reorder
  → Click "Save Order" → reorderQuestions(id, newOrder)
  → Exit reorder mode
```

**Flow - View Statistics**:

```
Teacher clicks "View Detailed Statistics"
  → Navigate to T9 (Quiz statistics)

Teacher clicks "View Student Results"
  → Navigate to T10 (Student results)
```

---

### Screen T9: Quiz Statistics

**Route**: `/teacher/quizzes/{id}/statistics`

**Mục đích**: Xem thống kê chi tiết quiz

**Components**:

```
┌─────────────────────────────────────────────┐
│  Quiz Statistics - Midterm Math             │
│  ← Back to Quiz                             │
│                                              │
│  📊 Overview                                │
│  ┌──────────────────┐ ┌──────────────────┐ │
│  │ Total Attempts   │ │ Unique Students  │ │
│  │      45          │ │       15         │ │
│  └──────────────────┘ └──────────────────┘ │
│  ┌──────────────────┐ ┌──────────────────┐ │
│  │ Completed        │ │ Pass Rate        │ │
│  │      42          │ │      65%         │ │
│  └──────────────────┘ └──────────────────┘ │
│                                              │
│  📈 Score Distribution                      │
│  ┌────────────────────────────────────────┐│
│  │     █                                   ││
│  │     █         █                         ││
│  │     █         █     █                   ││
│  │     █     █   █     █   █               ││
│  │ █   █     █   █     █   █   █           ││
│  │ 0-20  20-40  40-60  60-80  80-100      ││
│  └────────────────────────────────────────┘│
│                                              │
│  📉 Performance Metrics                     │
│  Average Score:     75.5                    │
│  Highest Score:     98                      │
│  Lowest Score:      35                      │
│  Average Time:      45 minutes              │
│                                              │
│  📋 Question Performance                    │
│  ┌────────────────────────────────────────┐│
│  │ Q1. What is 2+2?           85% correct ││
│  │ Q2. True/False...          92% correct ││
│  │ Q3. Calculate...           45% correct ││ <- Hard
│  └────────────────────────────────────────┘│
└─────────────────────────────────────────────┘
```

**APIs sử dụng**:

- `getQuizStatistics(id)` - Load all statistics

**Data từ API**:

```typescript
{
  quizId: number,
  quizTitle: string,
  totalAttempts: number,
  totalStudents: number,
  completedAttempts: number,
  averageScore: number,
  highestScore: number,
  lowestScore: number,
  passingRate: number,
  averageTimeSpent: number
}
```

**Flow**:

```
Teacher navigates to statistics
  → Load getQuizStatistics(id)
  → Render charts and metrics
  → Identify difficult questions (low correct rate)
  → Teacher can decide to adjust quiz based on data
```

---

### Screen T10: Student Results (for a Quiz)

**Route**: `/teacher/quizzes/{id}/results`

**Mục đích**: Xem kết quả của tất cả students

**Components**:

```
┌─────────────────────────────────────────────┐
│  Student Results - Midterm Math             │
│  ← Back to Quiz                             │
│                                              │
│  Export: [CSV] [Excel] [PDF]               │
│                                              │
│  Filters: [All Status ▼] [Search Student...│
│                                              │
│  ┌────────────────────────────────────────┐│
│  │ Student    | Attempts | Best  | Status ││
│  ├────────────────────────────────────────┤│
│  │ John Doe   |    3     |  85   | ✓ Pass ││
│  │ [View Attempts]                        ││
│  ├────────────────────────────────────────┤│
│  │ Jane Smith |    2     |  92   | ✓ Pass ││
│  │ [View Attempts]                        ││
│  ├────────────────────────────────────────┤│
│  │ Bob Lee    |    3     |  65   | ✗ Fail ││
│  │ [View Attempts]                        ││
│  ├────────────────────────────────────────┤│
│  │ Alice Wu   |    1     |  78   | ✓ Pass ││
│  │ [View Attempts]                        ││
│  └────────────────────────────────────────┘│
│                                              │
│  Showing 4 of 15 students                   │
└─────────────────────────────────────────────┘
```

**APIs sử dụng**:

- `getQuizResults(id)` - Load all student results

**Data từ API**:

```typescript
{
  quizId: number,
  quizTitle: string,
  totalAttempts: number,
  averageScore: number,
  passingRate: number,
  studentResults: [{
    studentId: number,
    studentName: string,
    studentCode: string,
    attempts: number,
    bestScore: number,
    lastAttemptAt: string,
    passed: boolean
  }]
}
```

**Flow**:

```
Teacher clicks "View Student Results"
  → Navigate to /quizzes/{id}/results
  → Load getQuizResults(id)
  → Display table

Actions:
  - Click "View Attempts" on student
    → Navigate to T11 (Student attempt history)
  - Filter by status
  - Search by name
  - Export data to CSV/Excel
```

---

### Screen T11: Student Attempt History (Teacher View)

**Route**: `/teacher/students/{studentId}/quizzes/{quizId}/attempts`

**Mục đích**: Xem tất cả attempts của một student cho một quiz

**Components**:

```
┌─────────────────────────────────────────────┐
│  John Doe - Midterm Math Attempts           │
│  ← Back to Results                          │
│                                              │
│  ┌──────────────────────────────────────┐  │
│  │ Attempt #1 - Feb 5, 2024 10:30 AM   │  │
│  │ Status: Completed                    │  │
│  │ Score: 75/100 (75%) - PASS          │  │
│  │ Time Spent: 45 minutes               │  │
│  │ [View Answers]                       │  │
│  └──────────────────────────────────────┘  │
│                                              │
│  ┌──────────────────────────────────────┐  │
│  │ Attempt #2 - Feb 7, 2024 2:15 PM    │  │
│  │ Status: Completed                    │  │
│  │ Score: 82/100 (82%) - PASS          │  │
│  │ Time Spent: 52 minutes               │  │
│  │ [View Answers]                       │  │
│  └──────────────────────────────────────┘  │
│                                              │
│  ┌──────────────────────────────────────┐  │
│  │ Attempt #3 - Feb 10, 2024 9:00 AM   │  │
│  │ Status: Completed                    │  │
│  │ Score: 85/100 (85%) - PASS ⭐ Best  │  │
│  │ Time Spent: 48 minutes               │  │
│  │ [View Answers]                       │  │
│  └──────────────────────────────────────┘  │
└─────────────────────────────────────────────┘
```

**APIs sử dụng**:

- `getStudentQuizAttemptsByQuiz(studentId, quizId)` - Load attempts

**Flow**:

```
Teacher clicks "View Attempts" for student
  → Navigate to /students/{studentId}/quizzes/{quizId}/attempts
  → Load getStudentQuizAttemptsByQuiz()
  → Display attempts in chronological order
  → Highlight best attempt

Click "View Answers"
  → Navigate to T12 (Attempt detail with answers)
```

---

### Screen T12: Attempt Detail with Answers (Teacher View)

**Route**: `/teacher/quizzes/{quizId}/attempts/{attemptId}`

**Mục đích**: Xem chi tiết câu trả lời của student

**Components**:

```
┌─────────────────────────────────────────────┐
│  Attempt #3 - John Doe                      │
│  ← Back to Attempts                         │
│                                              │
│  Score: 85/100 (85%) | Time: 48 mins       │
│  Completed: Feb 10, 2024 9:48 AM           │
│                                              │
│  ┌──────────────────────────────────────┐  │
│  │ Question 1 (5 points)          ✓     │  │
│  │                                      │  │
│  │ What is 2 + 2?                      │  │
│  │                                      │  │
│  │ Student Answer: 4 ✓ Correct         │  │
│  │ Points Earned: 5/5                  │  │
│  └──────────────────────────────────────┘  │
│                                              │
│  ┌──────────────────────────────────────┐  │
│  │ Question 2 (10 points)         ✗     │  │
│  │                                      │  │
│  │ Calculate the area of...             │  │
│  │                                      │  │
│  │ Student Answer: 25                   │  │
│  │ Correct Answer: 28                   │  │
│  │ Points Earned: 0/10                 │  │
│  └──────────────────────────────────────┘  │
│                                              │
│  ┌──────────────────────────────────────┐  │
│  │ Question 3 (Essay - 15 points)  ⏳   │  │
│  │                                      │  │
│  │ Explain the concept of...            │  │
│  │                                      │  │
│  │ Student Answer:                      │  │
│  │ "The derivative represents the..."   │  │
│  │ [Full text...]                       │  │
│  │                                      │  │
│  │ Teacher Grading:                     │  │
│  │ Points: [12] / 15 [Update]          │  │
│  │ Feedback: ┌──────────────────┐      │  │
│  │          │ Good explanation  │      │  │
│  │          └──────────────────┘      │  │
│  └──────────────────────────────────────┘  │
└─────────────────────────────────────────────┘
```

**APIs sử dụng**:

- `getQuizAttempt(quizId, attemptId)` - Load attempt detail

**Data từ API**:

```typescript
{
  id: number,
  quizId: number,
  studentId: number,
  attemptNumber: number,
  status: "COMPLETED",
  score: 85,
  totalPoints: 100,
  passed: true,
  timeSpent: 48,
  answers: [{
    questionId: number,
    questionText: string,
    selectedOptionId?: number,
    textAnswer?: string,
    correct: boolean,
    pointsEarned: number
  }]
}
```

**Features**:

1. Show all questions with student answers
2. Mark correct/incorrect
3. For essay questions: Teacher can grade manually
4. Color coding: Green (correct), Red (incorrect), Yellow (partial)

**Flow**:

```
Teacher views attempt detail
  → Load getQuizAttempt(quizId, attemptId)
  → Display questions with answers
  → For auto-graded: Show results
  → For essay: Teacher can input score + feedback
  → (Note: Manual grading API not in current backend, may need to add)
```

---

### Screen T13: Quiz in Lesson Context

**Route**: `/teacher/lessons/{lessonId}`

**Mục đích**: Manage quizzes trong lesson management page

**Components** (Quiz section trong lesson page):

```
┌─────────────────────────────────────────────┐
│  Lesson: Introduction to Algebra            │
│  ...                                         │
│                                              │
│  📝 Quizzes (2)                             │
│  ┌────────────────────────────────────────┐│
│  │ [+ Add Quiz ▼]                         ││
│  │  - Create New Quiz                     ││
│  │  - Link Existing Quiz                  ││
│  └────────────────────────────────────────┘│
│                                              │
│  ┌──────────────────────────────────────┐  │
│  │ Quiz 1: Basic Algebra                │  │
│  │ 15 questions | 30 mins               │  │
│  │ [View] [Edit] [Unlink] [Statistics]  │  │
│  └──────────────────────────────────────┘  │
│                                              │
│  ┌──────────────────────────────────────┐  │
│  │ Quiz 2: Advanced Problems            │  │
│  │ 20 questions | 45 mins               │  │
│  │ [View] [Edit] [Unlink] [Statistics]  │  │
│  └──────────────────────────────────────┘  │
└─────────────────────────────────────────────┘
```

**APIs sử dụng**:

- `getQuizzesByLesson(lessonId)` - Load quizzes
- `createQuiz(lessonId, payload)` - Create new
- `linkQuizToLesson(lessonId, quizId)` - Link existing
- `unlinkQuizFromLesson(lessonId, quizId)` - Unlink

**Flow**:

```
Add Quiz - Create New:
  Click "Add Quiz" → "Create New Quiz"
    → Navigate to T6 with lessonId pre-filled
    → Create quiz → Auto-linked to lesson

Add Quiz - Link Existing:
  Click "Add Quiz" → "Link Existing Quiz"
    → Show modal with independent quizzes
    → Select quiz → linkQuizToLesson()
    → Refresh lesson page

Unlink Quiz:
  Click "Unlink"
    → Confirm dialog
    → unlinkQuizFromLesson()
    → Quiz becomes independent again
    → Refresh lesson page
```

---

# 👨‍🎓 STUDENT SCREENS & FLOWS

## 📚 Group 3: Student Quiz Taking

### Screen S1: Lesson Quizzes List (Student View)

**Route**: `/learner/lessons/{lessonId}`

**Mục đích**: Student xem quizzes trong lesson

**Components** (Quiz section):

```
┌─────────────────────────────────────────────┐
│  Lesson: Introduction to Algebra            │
│  ...                                         │
│                                              │
│  📝 Quizzes (2)                             │
│                                              │
│  ┌──────────────────────────────────────┐  │
│  │ Quiz 1: Basic Algebra                │  │
│  │ 📊 15 questions | ⏱️ 30 mins          │  │
│  │ 🎯 Pass: 70% | 🔄 Attempts: 3        │  │
│  │ 📅 Available: Feb 1 - Feb 15         │  │
│  │                                      │  │
│  │ Your Status:                         │  │
│  │ ✓ Best Score: 85% (2/3 attempts)    │  │
│  │ [View My Results] [Retake Quiz]     │  │
│  └──────────────────────────────────────┘  │
│                                              │
│  ┌──────────────────────────────────────┐  │
│  │ Quiz 2: Advanced Problems  🔒 Locked │  │
│  │ 📊 20 questions | ⏱️ 45 mins          │  │
│  │ 🎯 Pass: 75% | 🔄 Attempts: 2        │  │
│  │ 📅 Available: Feb 16 - Feb 28        │  │
│  │                                      │  │
│  │ ⚠️ Not available yet                 │  │
│  │ Opens on Feb 16, 2024                │  │
│  └──────────────────────────────────────┘  │
└─────────────────────────────────────────────┘
```

**APIs sử dụng**:

- `getQuizzesByLesson(lessonId)` - Load quizzes
- `checkQuizEligibility(quizId)` - Check if can take
- `getStudentQuizAttemptsByQuiz(studentId, quizId)` - Load history

**Flow**:

```
Student views lesson
  → Load getQuizzesByLesson(lessonId)
  → For each quiz:
    - Load checkQuizEligibility(quizId)
    - Load getStudentQuizAttemptsByQuiz() for status
  → Display quizzes with availability status

Click "View My Results"
  → Navigate to S4 (My attempts history)

Click "Retake Quiz" or "Start Quiz"
  → Navigate to S2 (Quiz preview)
```

---

### Screen S2: Quiz Preview & Eligibility Check

**Route**: `/learner/quizzes/{id}/preview`

**Mục đích**: Student xem thông tin quiz trước khi bắt đầu

**Components**:

```
┌─────────────────────────────────────────────┐
│  Basic Algebra Quiz                          │
│                                              │
│  📝 Quiz Information                        │
│  ┌────────────────────────────────────────┐│
│  │ Questions:      15                      ││
│  │ Time Limit:     30 minutes              ││
│  │ Passing Score:  70%                     ││
│  │ Total Points:   100                     ││
│  │ Max Attempts:   3                       ││
│  └────────────────────────────────────────┘│
│                                              │
│  📊 Your Progress                           │
│  ┌────────────────────────────────────────┐│
│  │ Attempts Used:  2 / 3                   ││
│  │ Best Score:     85% (Pass ✓)           ││
│  │ Last Attempt:   Feb 7, 2024            ││
│  └────────────────────────────────────────┘│
│                                              │
│  ✅ Eligibility Status                      │
│  ┌────────────────────────────────────────┐│
│  │ ✓ You can take this quiz                ││
│  │ Remaining attempts: 1                   ││
│  └────────────────────────────────────────┘│
│                                              │
│  📋 Instructions                            │
│  - Answer all questions                     │
│  - You can review and change answers       │
│  - Submit when done or time expires        │
│  - You cannot pause once started           │
│                                              │
│  [← Back]  [Start Quiz →]                  │
└─────────────────────────────────────────────┘
```

**APIs sử dụng**:

- `getQuizForTaking(id)` - Load quiz info (without answers)
- `checkQuizEligibility(id)` - Check eligibility

**Eligibility Response**:

```typescript
{
  quizId: number,
  quizTitle: string,
  canAttempt: boolean,
  currentAttempts: number,
  maxAttempts: number,
  remainingAttempts: number,
  reason?: string,
  isAvailable: boolean,
  startDate?: string,
  endDate?: string,
  availabilityMessage?: string
}
```

**Flow**:

```
Student clicks "Start Quiz"
  → Navigate to /quizzes/{id}/preview
  → Load getQuizForTaking(id)
  → Load checkQuizEligibility(id)

If NOT eligible:
  → Show error message with reason
  → "Start Quiz" button disabled
  → Show why (e.g., "Max attempts reached", "Not available yet")

If eligible:
  → "Start Quiz" button enabled
  → Click "Start Quiz" → Confirm dialog
  → startQuiz(id) → Get attemptId
  → Navigate to S3 (Taking quiz)
```

---

### Screen S3: Taking Quiz (Active Attempt)

**Route**: `/learner/quizzes/{quizId}/attempts/{attemptId}`

**Mục đích**: Student làm quiz

**Components**:

```
┌─────────────────────────────────────────────┐
│  Basic Algebra Quiz - Attempt #3            │
│                                              │
│  ⏱️ Time Remaining: 25:43        Question 3/15│
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━│
│                                              │
│  Question 3 (5 points)                       │
│                                              │
│  What is the result of 2x + 3 when x = 5?   │
│                                              │
│  ○ 10                                        │
│  ○ 11                                        │
│  ● 13                                        │
│  ○ 15                                        │
│                                              │
│  [← Previous]  [Save Answer]  [Next →]     │
│                                              │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━│
│                                              │
│  Question Navigator                          │
│  [✓1] [✓2] [●3] [4] [5] [6] [7] [8] [9]    │
│  [10] [11] [12] [13] [14] [15]              │
│                                              │
│  Legend: ✓ Answered | ● Current | Empty     │
│                                              │
│  [Review & Submit]  [Save & Exit]           │
└─────────────────────────────────────────────┘
```

**APIs sử dụng**:

- `getQuizAttempt(quizId, attemptId)` - Load current state
- `submitAnswer(quizId, attemptId, answer)` - Submit each answer
- `finishQuiz(quizId, attemptId)` - Complete quiz
- `abandonQuizAttempt(quizId, attemptId)` - Exit without submit

**Features**:

1. **Timer**: Countdown từ time limit
2. **Question Navigator**: Click để nhảy đến câu bất kỳ
3. **Auto-save**: Tự động save answer khi chọn
4. **Progress Indicator**: Show số câu đã trả lời
5. **Review Mode**: Trước khi submit, review all answers

**Flow - Starting**:

```
After startQuiz(quizId) returns attemptId
  → Navigate to /quizzes/{quizId}/attempts/{attemptId}
  → Load getQuizAttempt(quizId, attemptId)
  → Load first question
  → Start timer countdown
```

**Flow - Answering**:

```
Student selects an answer
  → Immediately submitAnswer(quizId, attemptId, {
      questionId,
      selectedOptionId (or textAnswer)
    })
  → Update question navigator (mark as answered)
  → Can move to next question

Student can:
  - Click "Next" → Move to next question
  - Click "Previous" → Go back
  - Click question number → Jump to that question
  - Change answer any time before submit
```

**Flow - Submitting**:

```
Student clicks "Review & Submit"
  → Show review screen with all questions
  → Unanswered questions highlighted
  → Can go back to edit

Student confirms "Submit Quiz"
  → finishQuiz(quizId, attemptId)
  → Navigate to S5 (Result screen)
```

**Flow - Time Up**:

```
Timer reaches 00:00
  → Auto-call finishQuiz(quizId, attemptId)
  → Show "Time's up!" message
  → Navigate to S5 (Result screen)
```

**Flow - Save & Exit**:

```
Student clicks "Save & Exit"
  → Confirm dialog: "Your answers are saved. You can continue later."
  → abandonQuizAttempt(quizId, attemptId)
  → Status = "ABANDONED"
  → Navigate back to lesson page
  → Student can resume later (if attempts remaining)
```

---

### Screen S4: Quiz Result (After Submission)

**Route**: `/learner/quizzes/{quizId}/attempts/{attemptId}/result`

**Mục đích**: Hiển thị kết quả ngay sau khi submit

**Components**:

```
┌─────────────────────────────────────────────┐
│  Quiz Result - Attempt #3                   │
│                                              │
│  🎉 Congratulations!                        │
│                                              │
│  ┌────────────────────────────────────────┐│
│  │         Your Score                      ││
│  │                                         ││
│  │           85 / 100                      ││
│  │                                         ││
│  │            85%                          ││
│  │                                         ││
│  │         ✓ PASS                          ││
│  │    (Required: 70%)                      ││
│  └────────────────────────────────────────┘│
│                                              │
│  📊 Performance Breakdown                   │
│  ┌────────────────────────────────────────┐│
│  │ Correct Answers:     13 / 15           ││
│  │ Time Spent:          27 mins           ││
│  │ Attempt Number:      3 / 3             ││
│  │ Submitted:           Feb 10, 9:48 AM   ││
│  └────────────────────────────────────────┘│
│                                              │
│  ⭐ This is your best score!                │
│                                              │
│  [View Answers & Explanations]              │
│  [View All My Attempts]                     │
│  [Back to Lesson]                           │
└─────────────────────────────────────────────┘
```

**APIs sử dụng**:

- `getQuizAttempt(quizId, attemptId)` - Load result (status = COMPLETED)

**Flow**:

```
After finishQuiz() completes
  → Navigate to /quizzes/{quizId}/attempts/{attemptId}/result
  → Load getQuizAttempt() with full results
  → Display score, pass/fail status
  → Highlight if this is best score

Actions:
  - Click "View Answers" → Navigate to S6 (Review answers)
  - Click "View All My Attempts" → Navigate to S4 (History)
  - Click "Back to Lesson" → Navigate back to lesson page
  - If attempts remaining: Show "Retake Quiz" button
```

---

### Screen S5: My Quiz Attempts History

**Route**: `/learner/my-attempts` hoặc `/learner/quizzes/{quizId}/my-attempts`

**Mục đích**: Student xem lịch sử tất cả attempts

**Components**:

```
┌─────────────────────────────────────────────┐
│  My Quiz Attempts                            │
│                                              │
│  Filter: [All Quizzes ▼] [All Status ▼]    │
│                                              │
│  Basic Algebra Quiz                          │
│  ┌──────────────────────────────────────┐  │
│  │ Attempt #1 - Feb 5, 2024             │  │
│  │ Score: 75% (Pass ✓)                  │  │
│  │ Time: 25 mins                        │  │
│  │ [View Details]                       │  │
│  └──────────────────────────────────────┘  │
│                                              │
│  ┌──────────────────────────────────────┐  │
│  │ Attempt #2 - Feb 7, 2024             │  │
│  │ Score: 82% (Pass ✓)                  │  │
│  │ Time: 28 mins                        │  │
│  │ [View Details]                       │  │
│  └──────────────────────────────────────┘  │
│                                              │
│  ┌──────────────────────────────────────┐  │
│  │ Attempt #3 - Feb 10, 2024 ⭐ Best    │  │
│  │ Score: 85% (Pass ✓)                  │  │
│  │ Time: 27 mins                        │  │
│  │ [View Details]                       │  │
│  └──────────────────────────────────────┘  │
│                                              │
│  Advanced Problems Quiz                      │
│  ┌──────────────────────────────────────┐  │
│  │ Attempt #1 - Feb 15, 2024            │  │
│  │ Status: In Progress (Abandoned)      │  │
│  │ Questions Answered: 12/20            │  │
│  │ [Resume]                             │  │
│  └──────────────────────────────────────┘  │
└─────────────────────────────────────────────┘
```

**APIs sử dụng**:

- `getStudentQuizAttempts(studentId)` - All attempts
- `getStudentQuizAttemptsByQuiz(studentId, quizId)` - For specific quiz

**Flow**:

```
VIEW ALL ATTEMPTS:
  Student navigates to My Attempts
    → Load getStudentQuizAttempts(studentId)
    → Group by quiz
    → Display chronologically

VIEW QUIZ-SPECIFIC:
  Student clicks "View My Results" on quiz
    → Load getStudentQuizAttemptsByQuiz(studentId, quizId)
    → Show attempts for that quiz only

Actions:
  - Click "View Details" → Navigate to S6 (Review answers)
  - Click "Resume" (for abandoned) → Continue from last saved
  - Filter by quiz or status
```

---

### Screen S6: Review Answers (Student View)

**Route**: `/learner/quizzes/{quizId}/attempts/{attemptId}/review`

**Mục đích**: Student review lại câu trả lời và xem đáp án

**Components**:

```
┌─────────────────────────────────────────────┐
│  Review - Attempt #3                        │
│  ← Back to My Attempts                      │
│                                              │
│  Score: 85/100 (85%) | Time: 27 mins       │
│                                              │
│  ┌──────────────────────────────────────┐  │
│  │ Question 1 (5 points)          ✓     │  │
│  │                                      │  │
│  │ What is 2 + 2?                      │  │
│  │                                      │  │
│  │ Your Answer: 4 ✓ Correct            │  │
│  │ Points Earned: 5/5                  │  │
│  │                                      │  │
│  │ 💡 Explanation:                      │  │
│  │ Basic arithmetic addition...         │  │
│  └──────────────────────────────────────┘  │
│                                              │
│  ┌──────────────────────────────────────┐  │
│  │ Question 2 (10 points)         ✗     │  │
│  │                                      │  │
│  │ Calculate the derivative of x²       │  │
│  │                                      │  │
│  │ Your Answer: x                       │  │
│  │ Correct Answer: 2x ✓                │  │
│  │ Points Earned: 0/10                 │  │
│  │                                      │  │
│  │ 💡 Explanation:                      │  │
│  │ The power rule states that...        │  │
│  └──────────────────────────────────────┘  │
│                                              │
│  ┌──────────────────────────────────────┐  │
│  │ Question 3 (5 points)          ✓     │  │
│  │ [Content...]                         │  │
│  └──────────────────────────────────────┘  │
│                                              │
│  Question Navigator: [1✓] [2✗] [3✓] ...    │
│  Legend: ✓ Correct | ✗ Wrong               │
└─────────────────────────────────────────────┘
```

**APIs sử dụng**:

- `getQuizAttempt(quizId, attemptId)` - Load with answers

**Features**:

1. Show all questions
2. Student's answer vs Correct answer
3. Points earned per question
4. Explanations (if available)
5. Color coding: Green (correct), Red (wrong)
6. Question navigator to jump between questions

**Flow**:

```
Student clicks "View Details" or "View Answers"
  → Navigate to /quizzes/{quizId}/attempts/{attemptId}/review
  → Load getQuizAttempt(quizId, attemptId)
  → Display all questions with results
  → Student can study mistakes
  → Click question navigator to jump to specific question
```

---

## 📊 Complete User Flow Diagrams

### Teacher Complete Flow

```
┌─────────────────────────────────────────────────────┐
│                  TEACHER WORKFLOW                   │
└─────────────────────────────────────────────────────┘

1. SETUP PHASE
   ├─ Create Question Banks (T1, T2)
   ├─ Add Questions to Banks (T3, T4)
   └─ Organize questions by topic/difficulty

2. QUIZ CREATION PHASE
   ├─ Option A: Create Independent Quiz (T5, T6)
   │   ├─ Create quiz in library
   │   ├─ Add questions from banks (T8)
   │   └─ Link to lessons later
   │
   └─ Option B: Create Quiz for Lesson (T13)
       ├─ Create directly in lesson context
       ├─ Add questions from banks
       └─ Configure settings

3. QUIZ CONFIGURATION PHASE (T7, T8)
   ├─ Set time limit, attempts, passing score
   ├─ Add/remove/reorder questions
   ├─ Set availability dates
   └─ Enable randomization if needed

4. MONITORING PHASE
   ├─ View student progress (T10)
   ├─ Check statistics (T9)
   ├─ Review individual attempts (T11, T12)
   └─ Identify struggling students

5. MAINTENANCE PHASE
   ├─ Update questions based on performance
   ├─ Adjust quiz settings
   ├─ Clone quizzes for reuse
   └─ Archive outdated content
```

### Student Complete Flow

```
┌─────────────────────────────────────────────────────┐
│                  STUDENT WORKFLOW                   │
└─────────────────────────────────────────────────────┘

1. DISCOVERY PHASE (S1)
   ├─ Browse lesson content
   ├─ See available quizzes
   └─ Check quiz requirements

2. PREPARATION PHASE (S2)
   ├─ Read quiz information
   ├─ Check eligibility
   ├─ Review instructions
   └─ Check remaining attempts

3. TAKING QUIZ PHASE (S3)
   ├─ Start quiz → Create attempt
   ├─ Answer questions one by one
   ├─ Navigate between questions
   ├─ Save answers automatically
   └─ Submit when done or time up

4. RESULT PHASE (S4)
   ├─ View immediate results
   ├─ Check pass/fail status
   └─ See performance metrics

5. REVIEW PHASE (S6)
   ├─ Review answers
   ├─ Learn from mistakes
   ├─ Read explanations
   └─ Prepare for retake

6. RETRY PHASE (if applicable)
   ├─ Check remaining attempts
   ├─ Return to S2 (Preview)
   └─ Repeat process
```

---

## 🎨 Design Guidelines

### Color Coding

- **Green**: Correct answers, Pass status, Positive actions
- **Red**: Wrong answers, Fail status, Warnings
- **Blue**: Information, Links, Primary actions
- **Yellow**: Warnings, In-progress status
- **Gray**: Disabled, Unavailable

### Icons Usage

- 📝 Quiz/Assessment
- 📁 Question Bank
- ❓ Question
- ✓ Correct/Pass
- ✗ Wrong/Fail
- ⏱️ Time
- 🔒 Locked
- ⭐ Best/Highlight
- 📊 Statistics
- 💡 Explanation/Help

### Responsive Considerations

- **Desktop**: Full layout with sidebar navigation
- **Tablet**: Collapsed sidebar, main content adjusted
- **Mobile**: Stack layout, bottom navigation, simplified tables

---

## 🔐 Security & Access Control

### Teacher Endpoints

- All CRUD operations on quizzes, questions, banks
- View all student results
- Access to analytics

### Student Endpoints

- Read-only access to quizzes
- Can only take quizzes they're enrolled in
- Can only view their own attempts
- Cannot see other students' results

### Validation Rules

- **Eligibility**: Check before allowing quiz start
- **Attempts**: Enforce max attempts limit
- **Time**: Enforce time limits
- **Dates**: Check availability dates
- **Enrollment**: Verify student is enrolled in course

---

## 🚀 Implementation Priority

### Phase 1 (MVP)

1. T1-T4: Question Bank & Question Management
2. T6-T8: Basic Quiz Creation & Management
3. S1-S4: Student Quiz Taking & Results

### Phase 2 (Enhanced Features)

4. T9-T12: Statistics & Student Monitoring
5. S5-S6: Detailed Review & History
6. T5, T13: Advanced Quiz Management (Independent, Linking)

### Phase 3 (Advanced Features)

7. Bulk operations
8. Advanced filtering & search
9. Analytics dashboards
10. Export functionality

---

## 📝 Notes for Developers

1. **State Management**: Use React Context or Redux for quiz-taking state
2. **Real-time**: Consider WebSocket for timer synchronization
3. **Auto-save**: Implement debounced auto-save for answers
4. **Offline Support**: Consider saving progress locally
5. **Error Handling**: Graceful degradation if API fails during quiz
6. **Accessibility**: Ensure keyboard navigation, screen reader support
7. **Performance**: Lazy load questions, paginate large lists
8. **Testing**: Unit tests for eligibility logic, Integration tests for quiz flows

---

Tài liệu này cung cấp blueprint đầy đủ cho việc implement module Assessment. Mỗi screen được thiết kế để map chặt chẽ với APIs đã có trong backend, đảm bảo tính khả thi cao.
