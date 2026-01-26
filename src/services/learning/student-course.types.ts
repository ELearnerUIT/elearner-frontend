/**
 * Student Course Types
 * Matches backend StudentCourseController.java
 */

// ===========================
// Response DTOs
// ===========================

export interface ChapterDto {
  id: number;
  title: string;
  description?: string;
  position: number;
  courseId: number;
  lessonCount: number;
}

export interface LessonDTO {
  id: number;
  title: string;
  description?: string;
  content?: string;
  position: number;
  chapterId: number;
  videoUrl?: string;
  videoDuration?: number; // seconds
  lessonType: LessonType;
  isPreview: boolean;
  resourceCount: number;
}

export interface LessonResourceResponse {
  id: number;
  title: string;
  description?: string;
  resourceType: ResourceType;
  resourceUrl?: string;
  fileSize?: number; // bytes
  downloadUrl?: string;
}

export interface VideoStreamingResponse {
  streamingUrl: string;
  expiresAt: string; // DateTime
  duration?: number; // seconds
  format: string;
}

export interface CourseStructureResponse {
  courseId: number;
  courseName: string;
  chapters: ChapterWithLessonsDto[];
}

export interface ChapterWithLessonsDto {
  id: number;
  title: string;
  description?: string;
  position: number;
  lessons: LessonDTO[];
}

// ===========================
// Enums
// ===========================

export enum LessonType {
  VIDEO = "VIDEO",
  ARTICLE = "ARTICLE",
  QUIZ = "QUIZ",
  ASSIGNMENT = "ASSIGNMENT",
  DOCUMENT = "DOCUMENT",
}

export enum ResourceType {
  PDF = "PDF",
  DOCUMENT = "DOCUMENT",
  VIDEO = "VIDEO",
  LINK = "LINK",
  CODE = "CODE",
  IMAGE = "IMAGE",
  OTHER = "OTHER",
}
