/**
 * File Upload and Video Streaming API Service
 * Handles file uploads and video streaming operations
 */

import { apiInstance } from "../client";
import { unwrapResponse } from "../types";
import type {
  FileStorageResponse,
  FileDownloadUrlResponse,
  VideoStreamUrlResponse,
  PreviewVideoUrlResponse,
  UpdateVideoRequest,
} from "../generated/data-contracts";

class FileApiService {
  /**
   * Upload file to storage
   * Note: This is for submission files. The generated API expects submissionId.
   */
  async upload(submissionId: number, file: File): Promise<FileStorageResponse> {
    const response = await apiInstance.uploadFile(submissionId, { file });
    return unwrapResponse<FileStorageResponse>(response);
  }

  /**
   * Get file download URL
   */
  async getDownloadUrl(
    submissionId: number,
    fileId: number,
  ): Promise<Record<string, string>> {
    const response = await apiInstance.getDownloadUrl(submissionId, fileId);
    return unwrapResponse<Record<string, string>>(response);
  }

  /**
   * Delete file
   */
  async delete(fileId: number): Promise<void> {
    await apiInstance.deleteFile(fileId);
  }

  /**
   * Upload course thumbnail
   */
  async uploadCourseThumbnail(courseId: number, file: File): Promise<string> {
    const response = await apiInstance.uploadCourseThumbnail(courseId, {
      file,
    });
    return unwrapResponse<string>(response);
  }

  /**
   * Upload teacher avatar
   */
  async uploadTeacherAvatar(teacherId: number, file: File): Promise<string> {
    const response = await apiInstance.uploadAvatar(teacherId, { file });
    return unwrapResponse<string>(response);
  }

  /**
   * Upload student avatar
   */
  async uploadStudentAvatar(studentId: number, file: File): Promise<string> {
    const response = await apiInstance.uploadAvatar1(studentId, { file });
    return unwrapResponse<string>(response);
  }

  /**
   * Upload account avatar (current user)
   * Note: Use updateMe endpoint from Account Management instead.
   */
  async uploadMyAvatar(file: File): Promise<string> {
    // The generated API doesn't have uploadMyAvatar
    // You need to use the account update endpoint instead
    throw new Error(
      "uploadMyAvatar not available. Use account update endpoint.",
    );
  }

  /**
   * Get video stream URL (HLS manifest)
   */
  async getVideoStreamUrl(lessonId: number): Promise<VideoStreamUrlResponse> {
    const response = await apiInstance.getVideoStreamingUrl(lessonId);
    return unwrapResponse<VideoStreamUrlResponse>(response);
  }

  /**
   * Get preview video URL (for non-enrolled users)
   */
  async getPreviewVideoUrl(lessonId: number): Promise<PreviewVideoUrlResponse> {
    const response = await apiInstance.getPreviewVideoStreamUrl(lessonId);
    return unwrapResponse<PreviewVideoUrlResponse>(response);
  }

  /**
   * Notify video upload complete
   * Note: The generated API doesn't have uploadVideo.
   * Use uploadComplete to notify server after video upload.
   */
  async notifyVideoUploadComplete(
    lessonId: number,
    data: UpdateVideoRequest,
  ): Promise<void> {
    await apiInstance.uploadComplete(lessonId, data);
  }

  /**
   * Upload lesson resource file
   */
  async uploadLessonResource(
    lessonId: number,
    file: File,
    title: string,
    description?: string,
  ): Promise<void> {
    await apiInstance.addFileResource(
      lessonId,
      { file },
      { title, description },
    );
  }

  /**
   * Upload assignment submission file
   * Note: This is the same as upload() method.
   */
  async uploadSubmissionFile(submissionId: number, file: File): Promise<void> {
    await apiInstance.uploadFile(submissionId, { file });
  }
}

export const fileApi = new FileApiService();
