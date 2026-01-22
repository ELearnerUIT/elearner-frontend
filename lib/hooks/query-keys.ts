/**
 * Query Keys for React Query
 * Centralized query key management for cache invalidation and prefetching
 */

export const queryKeys = {
  // Auth
  auth: {
    currentUser: ['auth', 'currentUser'] as const,
    me: ['auth', 'me'] as const,
  },
  
  // Account
  account: {
    profile: ['account', 'profile'] as const,
    all: (params?: unknown) => ['accounts', params] as const,
    detail: (id: number) => ['account', id] as const,
    logs: (id: number, params?: unknown) => ['account', id, 'logs', params] as const,
  },
  
  // Students
  students: {
    all: (params?: unknown) => ['students', params] as const,
    detail: (id: number) => ['student', id] as const,
    me: ['student', 'me'] as const,
    courses: (id: number, params?: unknown) => ['student', id, 'courses', params] as const,
    myCourses: (params?: unknown) => ['student', 'me', 'courses', params] as const,
    stats: (id: number) => ['student', id, 'stats'] as const,
    myStats: ['student', 'me', 'stats'] as const,
    dashboard: ['student', 'dashboard'] as const,
  },
  
  // Teachers
  teachers: {
    all: (params?: unknown) => ['teachers', params] as const,
    detail: (id: number) => ['teacher', id] as const,
    profile: (id: number) => ['teacher', id, 'profile'] as const,
    me: ['teacher', 'me'] as const,
    stats: (id: number) => ['teacher', id, 'stats'] as const,
    myStats: ['teacher', 'me', 'stats'] as const,
    dashboard: ['teacher', 'dashboard'] as const,
  },
  
  // Courses
  courses: {
    all: (params?: unknown) => ['courses', params] as const,
    detail: (id: number) => ['course', id] as const,
    search: (params?: unknown) => ['courses', 'search', params] as const,
    featured: (params?: unknown) => ['courses', 'featured', params] as const,
    popular: (params?: unknown) => ['courses', 'popular', params] as const,
    myCourses: (params?: unknown) => ['courses', 'my', params] as const,
    stats: (id: number) => ['course', id, 'stats'] as const,
    byCategory: (categoryId: number, params?: unknown) => ['courses', 'category', categoryId, params] as const,
    byTag: (tagId: number, params?: unknown) => ['courses', 'tag', tagId, params] as const,
    byTeacher: (teacherId: number, params?: unknown) => ['courses', 'teacher', teacherId, params] as const,
  },
  
  // Course Versions
  courseVersions: {
    all: (courseId: number, params?: unknown) => ['course', courseId, 'versions', params] as const,
    detail: (courseId: number, versionId: number) => ['course', courseId, 'version', versionId] as const,
    latest: (courseId: number) => ['course', courseId, 'version', 'latest'] as const,
    published: (courseId: number) => ['course', courseId, 'version', 'published'] as const,
    pending: (params?: unknown) => ['versions', 'pending', params] as const,
  },
  
  // Reviews
  reviews: {
    all: (courseId: number, params?: unknown) => ['course', courseId, 'reviews', params] as const,
    detail: (id: number) => ['review', id] as const,
    summary: (courseId: number) => ['course', courseId, 'reviews', 'summary'] as const,
    my: (courseId: number) => ['course', courseId, 'review', 'my'] as const,
    student: (studentId: number, params?: unknown) => ['student', studentId, 'reviews', params] as const,
    myReviews: (params?: unknown) => ['reviews', 'my', params] as const,
  },
  
  // Preview
  preview: {
    course: (courseId: number) => ['course', courseId, 'preview'] as const,
    lessonStream: (courseId: number, lessonId: number) => ['course', courseId, 'lesson', lessonId, 'preview-stream'] as const,
    publishedContent: (enrollmentId: number) => ['enrollment', enrollmentId, 'content'] as const,
  },
  
  // Categories
  categories: {
    all: (params?: unknown) => ['categories', params] as const,
    tree: ['categories', 'tree'] as const,
    detail: (id: number) => ['category', id] as const,
    withChildren: (id: number) => ['category', id, 'children'] as const,
    stats: (id: number) => ['category', id, 'stats'] as const,
  },
  
  // Tags
  tags: {
    all: (params?: unknown) => ['tags', params] as const,
    detail: (id: number) => ['tag', id] as const,
    search: (query: string) => ['tags', 'search', query] as const,
    popular: (params?: unknown) => ['tags', 'popular', params] as const,
    stats: (id: number) => ['tag', id, 'stats'] as const,
  },
  
  // Chapters
  chapters: {
    all: (courseId: number, versionId: number) => ['course', courseId, 'version', versionId, 'chapters'] as const,
    detail: (id: number) => ['chapter', id] as const,
  },
  
  // Lessons
  lessons: {
    all: (chapterId: number) => ['chapter', chapterId, 'lessons'] as const,
    detail: (id: number) => ['lesson', id] as const,
    videoUploadUrl: (id: number) => ['lesson', id, 'video-upload-url'] as const,
    videoStreamUrl: (id: number) => ['lesson', id, 'video-stream-url'] as const,
  },
  
  // Lesson Resources
  lessonResources: {
    all: (lessonId: number) => ['lesson', lessonId, 'resources'] as const,
    detail: (lessonId: number, resourceId: number) => ['lesson', lessonId, 'resource', resourceId] as const,
  },
  
  // Files
  files: {
    detail: (id: number) => ['file', id] as const,
    details: (id: number, params?: unknown) => ['file', id, 'details', params] as const,
    downloadUrl: (id: number, params?: unknown) => ['file', id, 'download-url', params] as const,
  },
  
  // Enrollments
  enrollments: {
    my: (params?: unknown) => ['enrollments', 'my', params] as const,
    detail: (id: number) => ['enrollment', id] as const,
    byCourse: (courseId: number, params?: unknown) => ['course', courseId, 'enrollments', params] as const,
    all: (params?: unknown) => ['enrollments', params] as const,
  },
  
  // Progress
  progress: {
    lesson: (lessonId: number) => ['progress', 'lesson', lessonId] as const,
    course: (courseId: number) => ['progress', 'course', courseId] as const,
  },
  
  // Certificates
  certificates: {
    my: (params?: unknown) => ['certificates', 'my', params] as const,
    detail: (id: number) => ['certificate', id] as const,
    verify: (code: string) => ['certificate', 'verify', code] as const,
    byCourse: (courseId: number, params?: unknown) => ['course', courseId, 'certificates', params] as const,
  },
  
  // Comments
  comments: {
    all: (lessonId: number, params?: unknown) => ['lesson', lessonId, 'comments', params] as const,
    detail: (id: number) => ['comment', id] as const,
    replies: (id: number, params?: unknown) => ['comment', id, 'replies', params] as const,
    adminAll: (params?: unknown) => ['comments', 'admin', params] as const,
  },
  
  // Notifications
  notifications: {
    all: (params?: unknown) => ['notifications', params] as const,
    detail: (id: number) => ['notification', id] as const,
    unreadCount: ['notifications', 'unread-count'] as const,
    preferences: ['notifications', 'preferences'] as const,
  },
  
  // Reports
  reports: {
    my: (params?: unknown) => ['reports', 'my', params] as const,
    detail: (id: number) => ['report', id] as const,
    all: (params?: unknown) => ['reports', params] as const,
    stats: ['reports', 'stats'] as const,
  },
  
  // Payments
  payments: {
    my: (params?: unknown) => ['payments', 'my', params] as const,
    detail: (id: number) => ['payment', id] as const,
    all: (params?: unknown) => ['payments', params] as const,
    stats: (params?: unknown) => ['payments', 'stats', params] as const,
    byCourse: (courseId: number, params?: unknown) => ['course', courseId, 'payments', params] as const,
  },
  
  // Revenue
  revenue: {
    myShares: (params?: unknown) => ['revenue', 'my', params] as const,
    myStats: (params?: unknown) => ['revenue', 'my', 'stats', params] as const,
    allShares: (params?: unknown) => ['revenue', 'shares', params] as const,
    teacherStats: (teacherId: number, params?: unknown) => ['revenue', 'teacher', teacherId, 'stats', params] as const,
    platformStats: (params?: unknown) => ['revenue', 'platform', 'stats', params] as const,
    teacherPayouts: (teacherId: number, params?: unknown) => ['payouts', 'teacher', teacherId, params] as const,
    allPayouts: (params?: unknown) => ['payouts', params] as const,
  },
  
  // Quizzes
  quizzes: {
    detail: (id: number) => ['quiz', id] as const,
    withQuestions: (id: number) => ['quiz', id, 'questions'] as const,
    byLesson: (lessonId: number) => ['lesson', lessonId, 'quizzes'] as const,
    myAttempts: (quizId: number) => ['quiz', quizId, 'my-attempts'] as const,
    allAttempts: (quizId: number) => ['quiz', quizId, 'attempts'] as const,
    attemptDetail: (attemptId: number) => ['quiz-attempt', attemptId] as const,
  },
  
  // Questions
  questions: {
    detail: (id: number) => ['question', id] as const,
  },
  
  // Dashboard
  dashboard: {
    admin: ['dashboard', 'admin'] as const,
    analytics: (params?: unknown) => ['dashboard', 'analytics', params] as const,
    student: ['dashboard', 'student'] as const,
    teacher: ['dashboard', 'teacher'] as const,
  },
  
  // System
  system: {
    settings: (params?: unknown) => ['system', 'settings', params] as const,
    setting: (key: string) => ['system', 'setting', key] as const,
    config: ['system', 'config'] as const,
    publicSettings: ['system', 'public-settings'] as const,
  },
  
  // Audit
  audit: {
    logs: (params?: unknown) => ['audit', 'logs', params] as const,
    detail: (id: number) => ['audit', id] as const,
    stats: (params?: unknown) => ['audit', 'stats', params] as const,
    health: ['system', 'health'] as const,
    userLogs: (userId: number, params?: unknown) => ['audit', 'user', userId, params] as const,
  },
} as const;
