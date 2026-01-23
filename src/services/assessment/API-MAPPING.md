# Assessment Module API Mapping

## Tổng quan

Tài liệu này mapping chi tiết các API giữa Frontend và Backend cho module Assessment (Quiz/Question Bank Management).

---

## 📋 MODULE 1: QUIZ MANAGEMENT (Teacher - Core CRUD & Linking)

### 1. Create Independent Quiz

- **Frontend Method**: `createIndependentQuiz(payload: QuizRequest): Promise<QuizResponse>`
- **Backend Endpoint**: `POST /api/v1/quizzes`
- **Controller**: `QuizController.createIndependentQuiz()`
- **Role**: `@TeacherOnly`
- **Description**: Tạo quiz độc lập không gắn với lesson nào
- **Use Case**: Teacher tạo quiz vào thư viện chung để có thể tái sử dụng cho nhiều lesson

### 2. Get All Independent Quizzes

- **Frontend Method**: `getAllIndependentQuizzes(): Promise<QuizResponse[]>`
- **Backend Endpoint**: `GET /api/v1/quizzes`
- **Controller**: `QuizController.getAllIndependentQuizzes()`
- **Role**: `@TeacherOnly`
- **Description**: Lấy danh sách tất cả quiz độc lập (chưa gắn lesson)
- **Use Case**: Teacher xem thư viện quiz để chọn quiz gắn vào lesson

### 3. Link Quiz to Lesson

- **Frontend Method**: `linkQuizToLesson(lessonId: number, quizId: number): Promise<QuizResponse>`
- **Backend Endpoint**: `POST /api/v1/lessons/{lessonId}/quizzes/{quizId}`
- **Controller**: `QuizController.linkQuizToLesson()`
- **Role**: `@TeacherOnly`
- **Description**: Gắn quiz đã tồn tại vào một lesson
- **Use Case**: Teacher tái sử dụng quiz từ thư viện cho lesson mới

### 4. Unlink Quiz from Lesson

- **Frontend Method**: `unlinkQuizFromLesson(lessonId: number, quizId: number): Promise<void>`
- **Backend Endpoint**: `DELETE /api/v1/lessons/{lessonId}/quizzes/{quizId}`
- **Controller**: `QuizController.unlinkQuizFromLesson()`
- **Role**: `@TeacherOnly`
- **Description**: Gỡ quiz khỏi lesson (quiz vẫn tồn tại trong hệ thống)
- **Use Case**: Teacher muốn thay quiz khác hoặc hủy quiz của lesson

### 5. Create Quiz & Link to Lesson (Convenience)

- **Frontend Method**: `createQuiz(lessonId: number, payload: QuizRequest): Promise<QuizResponse>`
- **Backend Endpoint**: `POST /api/v1/lessons/{lessonId}/quizzes`
- **Controller**: `QuizController.createQuiz()`
- **Role**: `@TeacherOnly`
- **Description**: Tạo quiz mới và gắn ngay vào lesson (shortcut)
- **Use Case**: Teacher tạo quiz trực tiếp cho lesson cụ thể

### 6. Get Quizzes by Lesson

- **Frontend Method**: `getQuizzesByLesson(lessonId: number): Promise<QuizResponse[]>`
- **Backend Endpoint**: `GET /api/v1/lessons/{lessonId}/quizzes`
- **Controller**: `QuizController.getAllQuizzes()`
- **Role**: Public (có thể có auth check)
- **Description**: Lấy tất cả quiz của một lesson
- **Use Case**: Hiển thị danh sách quiz trong lesson detail

### 7. Get Quiz by ID

- **Frontend Method**: `getQuizById(id: number): Promise<QuizResponse>`
- **Backend Endpoint**: `GET /api/v1/quizzes/{id}`
- **Controller**: `QuizController.getQuiz()`
- **Role**: Public (có thể có auth check)
- **Description**: Lấy chi tiết quiz bao gồm câu hỏi
- **Use Case**: Xem thông tin chi tiết quiz (teacher edit hoặc student preview)

### 8. Update Quiz

- **Frontend Method**: `updateQuiz(id: number, payload: QuizRequest): Promise<QuizResponse>`
- **Backend Endpoint**: `PUT /api/v1/quizzes/{id}`
- **Controller**: `QuizController.updateQuiz()`
- **Role**: `@TeacherOnly`
- **Description**: Cập nhật thông tin quiz (title, description, settings)
- **Use Case**: Teacher chỉnh sửa cấu hình quiz

### 9. Delete Quiz

- **Frontend Method**: `deleteQuiz(id: number): Promise<void>`
- **Backend Endpoint**: `DELETE /api/v1/quizzes/{id}`
- **Controller**: `QuizController.deleteQuiz()`
- **Role**: `@TeacherOnly`
- **Description**: Xóa quiz và tất cả attempts liên quan
- **Use Case**: Teacher xóa quiz không còn dùng

### 10. Get Quiz Questions

- **Frontend Method**: `getQuizQuestions(quizId: number): Promise<QuestionResponse[]>`
- **Backend Endpoint**: `GET /api/v1/quizzes/{quizId}/questions`
- **Controller**: `QuizController.getQuizQuestions()`
- **Role**: Public (có thể có auth check)
- **Description**: Lấy danh sách câu hỏi trong quiz theo thứ tự
- **Use Case**: Hiển thị preview câu hỏi hoặc khi làm quiz

### 11. Clone Quiz

- **Frontend Method**: `cloneQuiz(id: number, targetLessonId: number): Promise<QuizResponse>`
- **Backend Endpoint**: `POST /api/v1/quizzes/{id}/clone?targetLessonId={targetLessonId}`
- **Controller**: `QuizController.cloneQuiz()`
- **Role**: `@TeacherOnly`
- **Description**: Sao chép quiz sang lesson khác
- **Use Case**: Teacher tạo bản copy quiz cho lesson mới

---

## 📝 MODULE 2: QUIZ CONFIGURATION (Questions & Settings)

### 12. Add Questions to Quiz (By IDs)

- **Frontend Method**: `addQuestionsToQuiz(id: number, payload: AddQuestionsRequest): Promise<QuizResponse>`
- **Backend Endpoint**: `POST /api/v1/quizzes/{id}/add-questions`
- **Controller**: `QuizController.addQuestionsToQuiz()`
- **Role**: `@TeacherOnly`
- **Description**: Thêm nhiều câu hỏi vào quiz bằng danh sách ID
- **Use Case**: Teacher chọn câu hỏi từ question bank để thêm vào quiz

### 13. Add Questions from Bank (Random)

- **Frontend Method**: `addQuestionsFromBank(id: number, questionBankId: number, count?: number): Promise<QuizResponse>`
- **Backend Endpoint**: `POST /api/v1/quizzes/{id}/add-from-bank?questionBankId={bankId}&count={count}`
- **Controller**: `QuizController.addQuestionsFromBank()`
- **Role**: `@TeacherOnly`
- **Description**: Thêm câu hỏi ngẫu nhiên từ question bank (có thể chỉ định số lượng)
- **Use Case**: Teacher tạo quiz ngẫu nhiên từ ngân hàng câu hỏi

### 14. Remove Question from Quiz

- **Frontend Method**: `removeQuestionFromQuiz(quizId: number, questionId: number): Promise<void>`
- **Backend Endpoint**: `DELETE /api/v1/quizzes/{id}/questions/{questionId}`
- **Controller**: `QuizController.removeQuestionFromQuiz()`
- **Role**: `@TeacherOnly`
- **Description**: Xóa một câu hỏi cụ thể khỏi quiz
- **Use Case**: Teacher loại bỏ câu hỏi không phù hợp

### 15. Remove All Questions

- **Frontend Method**: `removeAllQuestions(id: number): Promise<void>`
- **Backend Endpoint**: `DELETE /api/v1/quizzes/{id}/questions`
- **Controller**: `QuizController.removeAllQuestions()`
- **Role**: `@TeacherOnly`
- **Description**: Xóa tất cả câu hỏi trong quiz
- **Use Case**: Teacher reset quiz để thêm câu hỏi mới

### 16. Reorder Questions

- **Frontend Method**: `reorderQuestions(id: number, questionIdsInOrder: number[]): Promise<void>`
- **Backend Endpoint**: `PUT /api/v1/quizzes/{id}/reorder-questions`
- **Controller**: `QuizController.reorderQuestions()`
- **Role**: `@TeacherOnly`
- **Description**: Sắp xếp lại thứ tự câu hỏi trong quiz
- **Use Case**: Teacher thay đổi thứ tự hiển thị câu hỏi

### 17. Get Question Count

- **Frontend Method**: `getQuestionCount(id: number): Promise<number>`
- **Backend Endpoint**: `GET /api/v1/quizzes/{id}/question-count`
- **Controller**: `QuizController.getQuestionCount()`
- **Role**: Public
- **Description**: Đếm số câu hỏi trong quiz
- **Use Case**: Hiển thị thông tin tổng quan quiz

### 18. Update Time Limit

- **Frontend Method**: `updateTimeLimit(id: number, timeLimitMinutes: number): Promise<QuizResponse>`
- **Backend Endpoint**: `PUT /api/v1/quizzes/{id}/time-limit?timeLimitMinutes={minutes}`
- **Controller**: `QuizController.updateTimeLimit()`
- **Role**: `@TeacherOnly`
- **Description**: Cập nhật thời gian làm bài (phút)
- **Use Case**: Teacher đặt giới hạn thời gian cho quiz

### 19. Update Passing Score

- **Frontend Method**: `updatePassingScore(id: number, passingScore: number): Promise<QuizResponse>`
- **Backend Endpoint**: `PUT /api/v1/quizzes/{id}/passing-score?passingScore={score}`
- **Controller**: `QuizController.updatePassingScore()`
- **Role**: `@TeacherOnly`
- **Description**: Cập nhật điểm đạt yêu cầu
- **Use Case**: Teacher đặt ngưỡng điểm pass quiz

### 20. Update Max Attempts

- **Frontend Method**: `updateMaxAttempts(id: number, maxAttempts: number): Promise<QuizResponse>`
- **Backend Endpoint**: `PUT /api/v1/quizzes/{id}/max-attempts?maxAttempts={attempts}`
- **Controller**: `QuizController.updateMaxAttempts()`
- **Role**: `@TeacherOnly`
- **Description**: Cập nhật số lần làm tối đa
- **Use Case**: Teacher giới hạn số lần student có thể làm quiz

---

## 🗄️ MODULE 3: QUESTION BANK MANAGEMENT

### 21. Create Question Bank

- **Frontend Method**: `createQuestionBank(teacherId: number, payload: QuestionBankRequest): Promise<QuestionBankResponse>`
- **Backend Endpoint**: `POST /api/v1/teachers/{teacherId}/question-banks`
- **Controller**: `QuestionBankController.createQuestionBank()`
- **Role**: `@TeacherOnly`
- **Description**: Tạo ngân hàng câu hỏi mới cho teacher
- **Use Case**: Teacher tổ chức câu hỏi theo chủ đề/môn học

### 22. Get Teacher's Question Banks

- **Frontend Method**: `getQuestionBanksByTeacher(teacherId: number): Promise<QuestionBankResponse[]>`
- **Backend Endpoint**: `GET /api/v1/teachers/{teacherId}/question-banks`
- **Controller**: `QuestionBankController.getAllQuestionBanks()`
- **Role**: `@TeacherOnly`
- **Description**: Lấy tất cả question banks của teacher
- **Use Case**: Hiển thị danh sách question banks của teacher

### 23. Get All Question Banks (System)

- **Frontend Method**: `getAllQuestionBanks(): Promise<QuestionBankResponse[]>`
- **Backend Endpoint**: `GET /api/v1/question-banks`
- **Controller**: `QuestionBankController.getAllQuestionBanks()`
- **Role**: `@TeacherOnly`
- **Description**: Lấy tất cả question banks trong hệ thống
- **Use Case**: Admin hoặc teacher xem tất cả question banks

### 24. Get Question Bank by ID

- **Frontend Method**: `getQuestionBankById(id: number): Promise<QuestionBankResponse>`
- **Backend Endpoint**: `GET /api/v1/question-banks/{id}`
- **Controller**: `QuestionBankController.getQuestionBank()`
- **Role**: `@TeacherOnly`
- **Description**: Lấy chi tiết một question bank
- **Use Case**: Xem thông tin question bank trước khi sử dụng

### 25. Update Question Bank

- **Frontend Method**: `updateQuestionBank(id: number, payload: QuestionBankRequest): Promise<QuestionBankResponse>`
- **Backend Endpoint**: `PUT /api/v1/question-banks/{id}`
- **Controller**: `QuestionBankController.updateQuestionBank()`
- **Role**: `@TeacherOnly`
- **Description**: Cập nhật thông tin question bank
- **Use Case**: Teacher đổi tên hoặc mô tả question bank

### 26. Delete Question Bank

- **Frontend Method**: `deleteQuestionBank(id: number): Promise<void>`
- **Backend Endpoint**: `DELETE /api/v1/question-banks/{id}`
- **Controller**: `QuestionBankController.deleteQuestionBank()`
- **Role**: `@TeacherOnly`
- **Description**: Xóa question bank và tất cả câu hỏi bên trong
- **Use Case**: Teacher xóa question bank không còn dùng

### 27. Search Question Banks

- **Frontend Method**: `searchQuestionBanks(keyword: string): Promise<QuestionBankResponse[]>`
- **Backend Endpoint**: `GET /api/v1/question-banks/search?keyword={keyword}`
- **Controller**: `QuestionBankController.searchQuestionBanks()`
- **Role**: `@TeacherOnly`
- **Description**: Tìm kiếm question bank theo từ khóa
- **Use Case**: Teacher tìm question bank theo tên hoặc mô tả

### 28. Clone Question Bank

- **Frontend Method**: `cloneQuestionBank(id: number, targetTeacherId: number): Promise<QuestionBankResponse>`
- **Backend Endpoint**: `POST /api/v1/question-banks/{id}/clone?targetTeacherId={teacherId}`
- **Controller**: `QuestionBankController.cloneQuestionBank()`
- **Role**: `@TeacherOnly`
- **Description**: Sao chép question bank cho teacher khác
- **Use Case**: Chia sẻ question bank giữa các teacher

### 29. Get Question Count by Bank

- **Frontend Method**: `getQuestionCountByBank(bankId: number): Promise<QuestionCountResponse>`
- **Backend Endpoint**: `GET /api/v1/question-banks/{bankId}/questions/count`
- **Controller**: `QuestionController.getQuestionCount()`
- **Role**: `@TeacherOnly`
- **Description**: Đếm số câu hỏi trong question bank
- **Use Case**: Hiển thị thống kê question bank

---

## ❓ MODULE 4: QUESTION MANAGEMENT

### 30. Create Question

- **Frontend Method**: `createQuestion(bankId: number, payload: QuestionRequest): Promise<QuestionResponse>`
- **Backend Endpoint**: `POST /api/v1/question-banks/{bankId}/questions`
- **Controller**: `QuestionController.createQuestion()`
- **Role**: `@TeacherOnly`
- **Description**: Tạo câu hỏi mới trong question bank
- **Use Case**: Teacher thêm câu hỏi vào ngân hàng

### 31. Get Questions by Bank

- **Frontend Method**: `getQuestionsByBank(bankId: number): Promise<QuestionResponse[]>`
- **Backend Endpoint**: `GET /api/v1/question-banks/{bankId}/questions`
- **Controller**: `QuestionController.getAllQuestions()`
- **Role**: `@TeacherOnly`
- **Description**: Lấy tất cả câu hỏi trong question bank
- **Use Case**: Hiển thị danh sách câu hỏi để chọn vào quiz

### 32. Get Question by ID

- **Frontend Method**: `getQuestionById(id: number): Promise<QuestionResponse>`
- **Backend Endpoint**: `GET /api/v1/questions/{id}`
- **Controller**: `QuestionController.getQuestion()`
- **Role**: `@TeacherOnly`
- **Description**: Lấy chi tiết câu hỏi bao gồm answer options
- **Use Case**: Xem hoặc edit câu hỏi

### 33. Update Question

- **Frontend Method**: `updateQuestion(id: number, payload: QuestionRequest): Promise<QuestionResponse>`
- **Backend Endpoint**: `PUT /api/v1/questions/{id}`
- **Controller**: `QuestionController.updateQuestion()`
- **Role**: `@TeacherOnly`
- **Description**: Cập nhật nội dung câu hỏi
- **Use Case**: Teacher chỉnh sửa câu hỏi

### 34. Delete Question

- **Frontend Method**: `deleteQuestion(id: number): Promise<void>`
- **Backend Endpoint**: `DELETE /api/v1/questions/{id}`
- **Controller**: `QuestionController.deleteQuestion()`
- **Role**: `@TeacherOnly`
- **Description**: Xóa câu hỏi và các answer options
- **Use Case**: Teacher xóa câu hỏi không còn dùng

### 35. Bulk Delete Questions

- **Frontend Method**: `bulkDeleteQuestions(questionIds: number[]): Promise<void>`
- **Backend Endpoint**: `DELETE /api/v1/questions/bulk` (body: questionIds)
- **Controller**: `QuestionController.bulkDeleteQuestions()`
- **Role**: `@TeacherOnly`
- **Description**: Xóa nhiều câu hỏi cùng lúc
- **Use Case**: Teacher dọn dẹp nhiều câu hỏi

### 36. Clone Question

- **Frontend Method**: `cloneQuestion(id: number, targetBankId: number): Promise<QuestionResponse>`
- **Backend Endpoint**: `POST /api/v1/questions/{id}/clone?targetBankId={bankId}`
- **Controller**: `QuestionController.cloneQuestion()`
- **Role**: `@TeacherOnly`
- **Description**: Sao chép câu hỏi sang question bank khác
- **Use Case**: Teacher tái sử dụng câu hỏi cho bank khác

### 37. Manage Answer Options

- **Frontend Method**: `manageAnswerOptions(questionId: number, payload: AnswerOptionRequest[]): Promise<QuestionResponse>`
- **Backend Endpoint**: `POST /api/v1/questions/{id}/answer-options`
- **Controller**: `QuestionController.manageAnswerOptions()`
- **Role**: `@TeacherOnly`
- **Description**: Thêm/sửa/xóa các đáp án cho câu hỏi
- **Use Case**: Teacher quản lý các lựa chọn đáp án

### 38. Update Max Points

- **Frontend Method**: `updateMaxPoints(id: number, maxPoints: number): Promise<QuestionResponse>`
- **Backend Endpoint**: `PUT /api/v1/questions/{id}/max-points?maxPoints={points}`
- **Controller**: `QuestionController.updateMaxPoints()`
- **Role**: `@TeacherOnly`
- **Description**: Cập nhật điểm tối đa của câu hỏi
- **Use Case**: Teacher điều chỉnh thang điểm câu hỏi

### 39. Search Questions in Bank

- **Frontend Method**: `searchQuestions(bankId: number, keyword: string): Promise<QuestionResponse[]>`
- **Backend Endpoint**: `GET /api/v1/question-banks/{bankId}/questions/search?keyword={keyword}`
- **Controller**: `QuestionController.searchQuestions()`
- **Role**: `@TeacherOnly`
- **Description**: Tìm kiếm câu hỏi trong question bank
- **Use Case**: Teacher tìm câu hỏi theo nội dung

### 40. Get Questions by Type

- **Frontend Method**: `getQuestionsByType(bankId: number, type: QuestionType): Promise<QuestionResponse[]>`
- **Backend Endpoint**: `GET /api/v1/question-banks/{bankId}/questions/by-type?type={type}`
- **Controller**: `QuestionController.getQuestionsByType()`
- **Role**: `@TeacherOnly`
- **Description**: Lọc câu hỏi theo loại (MULTIPLE_CHOICE, TRUE_FALSE, etc.)
- **Use Case**: Teacher chọn câu hỏi theo định dạng cụ thể

### 41. Check Question In Use

- **Frontend Method**: `checkQuestionInUse(id: number): Promise<QuestionInUseResponse>`
- **Backend Endpoint**: `GET /api/v1/questions/{id}/in-use`
- **Controller**: `QuestionController.checkQuestionInUse()`
- **Role**: `@TeacherOnly`
- **Description**: Kiểm tra câu hỏi có đang được dùng trong quiz nào không
- **Use Case**: Cảnh báo trước khi xóa câu hỏi

### 42. Get Quizzes Using Question

- **Frontend Method**: `getQuizzesUsingQuestion(id: number): Promise<QuizzesUsingQuestionResponse>`
- **Backend Endpoint**: `GET /api/v1/questions/{id}/quizzes`
- **Controller**: `QuestionController.getQuizzesUsingQuestion()`
- **Role**: `@TeacherOnly`
- **Description**: Lấy danh sách quiz đang sử dụng câu hỏi
- **Use Case**: Xem ảnh hưởng khi sửa/xóa câu hỏi

---

## 🎓 MODULE 5: QUIZ ATTEMPTS & RESULTS (Student & Teacher)

### 43. Start Quiz (Student)

- **Frontend Method**: `startQuiz(quizId: number): Promise<QuizAttemptResponse>`
- **Backend Endpoint**: `POST /api/v1/quizzes/{id}/start`
- **Controller**: `QuizAttemptController.startQuiz()`
- **Role**: `@StudentOnly`
- **Description**: Bắt đầu làm quiz (tạo attempt mới)
- **Use Case**: Student bắt đầu làm bài quiz

### 44. Get Quiz Attempt Detail

- **Frontend Method**: `getQuizAttempt(quizId: number, attemptId: number): Promise<QuizAttemptResponse>`
- **Backend Endpoint**: `GET /api/v1/quizzes/{quizId}/attempts/{attemptId}`
- **Controller**: `QuizAttemptController.getQuizAttempt()`
- **Role**: `@StudentOrTeacher`
- **Description**: Xem chi tiết một lần làm quiz
- **Use Case**: Student xem kết quả, Teacher xem bài làm của student

### 45. Submit Answer (Student)

- **Frontend Method**: `submitAnswer(quizId: number, attemptId: number, payload: SubmitAnswerRequest): Promise<void>`
- **Backend Endpoint**: `POST /api/v1/quizzes/{quizId}/attempts/{attemptId}/submit-answer`
- **Controller**: `QuizAttemptController.submitAnswer()`
- **Role**: `@StudentOnly`
- **Description**: Gửi câu trả lời cho một câu hỏi
- **Use Case**: Student chọn đáp án khi làm quiz

### 46. Finish Quiz (Student)

- **Frontend Method**: `finishQuiz(quizId: number, attemptId: number): Promise<QuizAttemptResponse>`
- **Backend Endpoint**: `POST /api/v1/quizzes/{quizId}/attempts/{attemptId}/finish`
- **Controller**: `QuizAttemptController.finishQuiz()`
- **Role**: `@StudentOnly`
- **Description**: Kết thúc quiz và tính điểm
- **Use Case**: Student nộp bài quiz

### 47. Abandon Quiz Attempt

- **Frontend Method**: `abandonQuizAttempt(quizId: number, attemptId: number): Promise<QuizAttemptResponse>`
- **Backend Endpoint**: `POST /api/v1/quizzes/{quizId}/attempts/{attemptId}/abandon`
- **Controller**: `QuizAttemptController.abandonQuizAttempt()`
- **Role**: `@StudentOnly`
- **Description**: Từ bỏ bài làm (không tính điểm)
- **Use Case**: Student thoát giữa chừng không muốn nộp

### 48. Get Student's All Quiz Attempts

- **Frontend Method**: `getStudentQuizAttempts(studentId: number): Promise<QuizAttemptResponse[]>`
- **Backend Endpoint**: `GET /api/v1/students/{studentId}/quiz-attempts`
- **Controller**: `QuizAttemptController.getStudentQuizAttempts()`
- **Role**: `@StudentOrTeacher`
- **Description**: Lấy tất cả lần làm quiz của student
- **Use Case**: Student xem lịch sử làm quiz, Teacher theo dõi progress

### 49. Get Student's Attempts by Quiz

- **Frontend Method**: `getStudentQuizAttemptsByQuiz(studentId: number, quizId: number): Promise<QuizAttemptResponse[]>`
- **Backend Endpoint**: `GET /api/v1/students/{studentId}/quizzes/{quizId}/attempts`
- **Controller**: `QuizAttemptController.getStudentQuizAttemptsByQuiz()`
- **Role**: `@StudentOrTeacher`
- **Description**: Lấy các lần làm của student cho một quiz cụ thể
- **Use Case**: Xem lịch sử attempts của student cho quiz

### 50. Get Quiz for Taking (Student View)

- **Frontend Method**: `getQuizForTaking(id: number): Promise<QuizResponse>`
- **Backend Endpoint**: `GET /api/v1/quizzes/{id}/for-taking`
- **Controller**: `QuizController.getQuizForTaking()`
- **Role**: `@StudentOnly`
- **Description**: Lấy thông tin quiz khi student chuẩn bị làm (không có đáp án đúng)
- **Use Case**: Student xem thông tin trước khi bắt đầu làm

### 51. Check Quiz Eligibility

- **Frontend Method**: `checkQuizEligibility(id: number): Promise<QuizEligibilityResponse>`
- **Backend Endpoint**: `GET /api/v1/quizzes/{id}/eligibility`
- **Controller**: `QuizController.checkEligibility()`
- **Role**: `@StudentOnly`
- **Description**: Kiểm tra student có đủ điều kiện làm quiz không
- **Use Case**: Validate trước khi cho phép start quiz

### 52. Get Quiz Results (Teacher View)

- **Frontend Method**: `getQuizResults(id: number): Promise<QuizResultResponse>`
- **Backend Endpoint**: `GET /api/v1/quizzes/{id}/results`
- **Controller**: `QuizAttemptController.getQuizResults()`
- **Role**: `@TeacherOnly`
- **Description**: Lấy kết quả tổng hợp của tất cả students làm quiz
- **Use Case**: Teacher xem báo cáo kết quả lớp

### 53. Get Quiz Statistics

- **Frontend Method**: `getQuizStatistics(id: number): Promise<QuizStatisticsResponse>`
- **Backend Endpoint**: `GET /api/v1/quizzes/{id}/statistics`
- **Controller**: `QuizController.getQuizStatistics()`
- **Role**: `@TeacherOnly`
- **Description**: Lấy thống kê chi tiết của quiz (average score, pass rate, etc.)
- **Use Case**: Teacher phân tích hiệu quả quiz

---

## 📊 Tổng kết Mapping

### ✅ APIs đã được mapping đầy đủ

Tất cả **53 APIs** trong backend đều đã được implement đầy đủ và chính xác trong frontend service.

### 🎯 Phân loại theo Role

#### Teacher Only (31 APIs)

- Quiz CRUD: Create, Update, Delete, Clone
- Quiz Configuration: Add/Remove questions, Reorder, Update settings
- Question Bank CRUD: Create, Update, Delete, Clone, Search
- Question CRUD: Create, Update, Delete, Clone, Manage options
- Analytics: Get results, statistics

#### Student Only (8 APIs)

- Quiz Taking: Start, Submit answer, Finish, Abandon
- Eligibility: Check eligibility, Get quiz for taking

#### Student or Teacher (3 APIs)

- Get quiz attempt detail
- Get student attempts
- Get student attempts by quiz

#### Public (11 APIs)

- Get quiz by ID
- Get quizzes by lesson
- Get quiz questions
- Get question count
- Get question bank info

### 🔄 Các Pattern chính

1. **Association Pattern**: Quiz có thể độc lập hoặc gắn với Lesson
2. **Reusability Pattern**: Question và Quiz có thể clone/reuse
3. **Bank Pattern**: Questions được tổ chức trong Question Banks
4. **Attempt Pattern**: Tracking multiple attempts với history
5. **Analytics Pattern**: Statistics và results cho teacher insights

---

## ⚠️ Lưu ý quan trọng

1. **Authentication**: Tất cả APIs đều yêu cầu authentication (`@SecurityRequirement(name = "bearerAuth")`)
2. **Role-based Access**: Strict separation giữa Teacher và Student roles
3. **Data Integrity**: Nhiều APIs có validation về việc question đang được sử dụng
4. **Soft Delete**: Các entities có thể sử dụng soft delete (có `deletedAt` field)
5. **Audit Trail**: QuizResponse có tracking fields (createdAt, createdBy, updatedAt, updatedBy)
