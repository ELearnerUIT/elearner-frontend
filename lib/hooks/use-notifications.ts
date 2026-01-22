/**
 * Notification Hooks
 * React Query hooks for notification operations
 */

'use client';

import { useMutation, useQuery, useQueryClient, type UseMutationOptions, type UseQueryOptions } from '@tanstack/react-query';
import * as notificationApi from '@/lib/api/notification.api';
import { queryKeys } from './query-keys';
import type {
  Notification,
  NotificationPreferences,
  NotificationSearchParams,
  PageResponse,
  UpdateNotificationPreferencesRequest,
  UnreadCountResponse,
  MarkNotificationReadRequest,
} from '@/types';

/**
 * Get my notifications
 */
export function useNotifications(params?: NotificationSearchParams, options?: UseQueryOptions<PageResponse<Notification>>) {
  return useQuery({
    queryKey: queryKeys.notifications.all(params),
    queryFn: () => notificationApi.getMyNotifications(params),
    ...options,
  });
}

/**
 * Get single notification
 */
export function useNotification(id: number, options?: UseQueryOptions<Notification>) {
  return useQuery({
    queryKey: queryKeys.notifications.detail(id),
    queryFn: () => notificationApi.getNotificationById(id),
    enabled: Boolean(id),
    ...options,
  });
}

/**
 * Get unread count
 */
export function useUnreadNotificationCount(options?: UseQueryOptions<UnreadCountResponse>) {
  return useQuery({
    queryKey: queryKeys.notifications.unreadCount,
    queryFn: () => notificationApi.getUnreadCount(),
    refetchInterval: 30000, // Refetch every 30 seconds
    ...options,
  });
}

/**
 * Get notification preferences
 */
export function useNotificationPreferences(options?: UseQueryOptions<NotificationPreferences>) {
  return useQuery({
    queryKey: queryKeys.notifications.preferences,
    queryFn: () => notificationApi.getNotificationPreferences(),
    ...options,
  });
}

/**
 * Mark notification as read
 */
export function useMarkNotificationAsRead(options?: UseMutationOptions<Notification, Error, { id: number; isRead: boolean }>) {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, isRead }) => notificationApi.markNotificationRead(id, { isRead }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.notifications.all() });
      queryClient.invalidateQueries({ queryKey: queryKeys.notifications.unreadCount });
    },
    ...options,
  });
}

/**
 * Mark all notifications as read
 */
export function useMarkAllNotificationsAsRead(options?: UseMutationOptions<unknown, Error, void>) {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: () => notificationApi.markAllNotificationsRead(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.notifications.all() });
      queryClient.invalidateQueries({ queryKey: queryKeys.notifications.unreadCount });
    },
    ...options,
  });
}

/**
 * Delete notification
 */
export function useDeleteNotification(options?: UseMutationOptions<void, Error, number>) {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: number) => notificationApi.deleteNotification(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.notifications.all() });
      queryClient.invalidateQueries({ queryKey: queryKeys.notifications.unreadCount });
    },
    ...options,
  });
}

/**
 * Update notification preferences
 */
export function useUpdateNotificationPreferences(options?: UseMutationOptions<NotificationPreferences, Error, UpdateNotificationPreferencesRequest>) {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: UpdateNotificationPreferencesRequest) => notificationApi.updateNotificationPreferences(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.notifications.preferences });
    },
    ...options,
  });
}
