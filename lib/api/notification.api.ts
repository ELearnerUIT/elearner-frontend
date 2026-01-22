/**
 * Notification API
 * User notifications and preferences
 */

import { apiClient } from './client';
import type {
  NotificationResponse,
  NotificationQueryParams,
  MarkNotificationReadRequest,
  MarkAllNotificationsReadResponse,
  DeleteAllNotificationsResponse,
  UnreadCountResponse,
  NotificationPreferencesResponse,
  UpdateNotificationPreferencesRequest,
  PageResponse,
} from '@/types';

/**
 * Get my notifications (authenticated)
 * GET /notifications
 */
export async function getMyNotifications(
  params?: NotificationQueryParams
): Promise<PageResponse<NotificationResponse>> {
  const response = await apiClient.get<PageResponse<NotificationResponse>>('/notifications', { params });
  return response.data;
}

/**
 * Get notification by ID (authenticated)
 * GET /notifications/{notificationId}
 */
export async function getNotificationById(notificationId: number): Promise<NotificationResponse> {
  const response = await apiClient.get<NotificationResponse>(`/notifications/${notificationId}`);
  return response.data;
}

/**
 * Mark notification as read/unread (authenticated)
 * PUT /notifications/{notificationId}/read
 */
export async function markNotificationRead(
  notificationId: number,
  data: MarkNotificationReadRequest
): Promise<NotificationResponse> {
  const response = await apiClient.put<NotificationResponse>(`/notifications/${notificationId}/read`, data);
  return response.data;
}

/**
 * Mark all notifications as read (authenticated)
 * POST /notifications/mark-all-read
 */
export async function markAllNotificationsRead(): Promise<MarkAllNotificationsReadResponse> {
  const response = await apiClient.post<MarkAllNotificationsReadResponse>('/notifications/mark-all-read');
  return response.data;
}

/**
 * Delete notification (authenticated)
 * DELETE /notifications/{notificationId}
 */
export async function deleteNotification(notificationId: number): Promise<void> {
  await apiClient.delete(`/notifications/${notificationId}`);
}

/**
 * Delete all notifications (authenticated)
 * DELETE /notifications
 */
export async function deleteAllNotifications(): Promise<DeleteAllNotificationsResponse> {
  const response = await apiClient.delete<DeleteAllNotificationsResponse>('/notifications');
  return response.data;
}

/**
 * Get unread notification count (authenticated)
 * GET /notifications/unread-count
 */
export async function getUnreadCount(): Promise<UnreadCountResponse> {
  const response = await apiClient.get<UnreadCountResponse>('/notifications/unread-count');
  return response.data;
}

/**
 * Get notification preferences (authenticated)
 * GET /notifications/preferences
 */
export async function getNotificationPreferences(): Promise<NotificationPreferencesResponse> {
  const response = await apiClient.get<NotificationPreferencesResponse>('/notifications/preferences');
  return response.data;
}

/**
 * Update notification preferences (authenticated)
 * PUT /notifications/preferences
 */
export async function updateNotificationPreferences(
  data: UpdateNotificationPreferencesRequest
): Promise<NotificationPreferencesResponse> {
  const response = await apiClient.put<NotificationPreferencesResponse>('/notifications/preferences', data);
  return response.data;
}
