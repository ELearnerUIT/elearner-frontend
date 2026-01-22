import { NotificationType, NotificationStatus } from '../shared/common.types';

/**
 * Notification response DTO
 */
export interface NotificationResponse {
  id: number;
  userId: number;
  type: NotificationType;
  title: string;
  message: string;
  status: NotificationStatus;
  relatedEntityType: string | null;
  relatedEntityId: number | null;
  actionUrl: string | null;
  isRead: boolean;
  readAt: string | null;
  createdAt: string;
}

/**
 * Notification query parameters
 */
export interface NotificationQueryParams {
  type?: NotificationType;
  status?: NotificationStatus;
  isRead?: boolean;
  page?: number;
  size?: number;
  sortBy?: string;
  sortDirection?: 'ASC' | 'DESC';
}

/**
 * Mark notification as read request DTO
 * PUT /api/v1/notifications/{notificationId}/read
 */
export interface MarkNotificationReadRequest {
  isRead: boolean;
}

/**
 * Mark all notifications as read request DTO
 * POST /api/v1/notifications/mark-all-read
 */
export interface MarkAllNotificationsReadResponse {
  updatedCount: number;
}

/**
 * Delete all notifications response
 * DELETE /api/v1/notifications
 */
export interface DeleteAllNotificationsResponse {
  deletedCount: number;
}

/**
 * Unread count response
 * GET /api/v1/notifications/unread-count
 */
export interface UnreadCountResponse {
  unreadCount: number;
}

/**
 * Notification preferences response
 * GET /api/v1/notifications/preferences
 */
export interface NotificationPreferencesResponse {
  userId: number;
  emailNotifications: boolean;
  pushNotifications: boolean;
  courseUpdates: boolean;
  newComments: boolean;
  courseReviews: boolean;
  enrollmentUpdates: boolean;
  promotions: boolean;
}

/**
 * Update notification preferences request DTO
 * PUT /api/v1/notifications/preferences
 */
export interface UpdateNotificationPreferencesRequest {
  emailNotifications?: boolean;
  pushNotifications?: boolean;
  courseUpdates?: boolean;
  newComments?: boolean;
  courseReviews?: boolean;
  enrollmentUpdates?: boolean;
  promotions?: boolean;
}
