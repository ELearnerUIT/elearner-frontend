import { LessonType, VideoStatus } from '../shared/common.types';

/**
 * Lesson response DTO
 */
export interface LessonResponse {
  id: number;
  chapterId: number;
  type: LessonType;
  title: string;
  shortDescription: string;
  orderIndex: number;
  isPreview: boolean;
  durationSeconds: number | null;
  videoStatus: VideoStatus | null;
  videoUrl: string | null;
  videoObjectKey: string | null;
  totalResources: number;
  createdAt: string;
  updatedAt: string;
}

/**
 * Create lesson request DTO
 * POST /api/v1/chapters/{chapterId}/lessons
 */
export interface CreateLessonRequest {
  type: LessonType;
  title: string;
  shortDescription: string;
}

/**
 * Update lesson request DTO
 * PUT /api/v1/lessons/{lessonId}
 */
export interface UpdateLessonRequest {
  type?: LessonType;
  title?: string;
  shortDescription?: string;
  isPreview?: boolean;
}

/**
 * Reorder lessons request DTO
 * POST /api/v1/chapters/{chapterId}/lessons/reorder
 */
export interface ReorderLessonsRequest {
  lessonIds: number[];
}

/**
 * Video upload URL response
 * GET /api/v1/lessons/{lessonId}/video/upload-url
 */
export interface VideoUploadUrlResponse {
  uploadUrl: string;
  expiresAt: string;
  objectKey: string;
}

/**
 * Video upload complete request DTO
 * POST /api/v1/lessons/{lessonId}/video/upload-complete
 */
export interface VideoUploadCompleteRequest {
  objectKey: string;
  durationSeconds: number;
}

/**
 * Video stream URL response
 * GET /api/v1/lessons/{lessonId}/video/stream-url
 */
export interface VideoStreamUrlResponse {
  streamUrl: string;
  expiresAt: string;
}
