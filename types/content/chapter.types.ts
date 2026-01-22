/**
 * Chapter response DTO
 */
export interface ChapterResponse {
  id: number;
  versionId: number;
  title: string;
  orderIndex: number;
  totalLessons: number;
  totalDuration: number;
  createdAt: string;
  updatedAt: string;
  lessons?: LessonBasicInfo[];
}

/**
 * Basic lesson info in chapter
 */
export interface LessonBasicInfo {
  id: number;
  type: string;
  title: string;
  orderIndex: number;
  durationSeconds: number | null;
  isPreview: boolean;
}

/**
 * Create chapter request DTO
 * POST /api/v1/courses/{courseId}/versions/{versionId}/chapters
 */
export interface CreateChapterRequest {
  title: string;
  orderIndex: number;
}

/**
 * Update chapter request DTO
 * PUT /api/v1/courses/{courseId}/versions/{versionId}/chapters/{chapterId}
 */
export interface UpdateChapterRequest {
  title?: string;
  orderIndex?: number;
}

/**
 * Reorder chapters request DTO
 * POST /api/v1/chapters/{chapterId}/reorder
 */
export interface ReorderChaptersRequest {
  chapterIds: number[];
}
