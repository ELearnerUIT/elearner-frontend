/**
 * Authentication Hooks
 * React Query hooks for authentication operations
 */

"use client";

import {
    useMutation,
    useQuery,
    useQueryClient,
    type UseMutationOptions,
    type UseQueryOptions,
} from "@tanstack/react-query";
import * as authApi from "@/lib/api/auth.api";
import { queryKeys } from "./query-keys";
import { tokenManager } from "@/lib/api/token-manager";
import type {
    RegisterRequest,
    RegisterResponse,
    LoginRequest,
    LoginResponse,
    RefreshTokenRequest,
    RefreshTokenResponse,
    ForgotPasswordRequest,
    ResetPasswordRequest,
    ChangePasswordRequest,
    SocialLoginRequest,
    User,
} from "@/types";

/**
 * Get current user
 */
export function useCurrentUser(options?: UseQueryOptions<User>) {
    return useQuery({
        queryKey: queryKeys.auth.currentUser,
        queryFn: () => authApi.getCurrentUser(),
        enabled: tokenManager.isAuthenticated(),
        ...options,
    });
}

/**
 * Register new account
 */
export function useRegister(
    options?: UseMutationOptions<RegisterResponse, Error, RegisterRequest>,
) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: RegisterRequest) => authApi.register(data),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: queryKeys.auth.currentUser,
            });
        },
        ...options,
    });
}

/**
 * Login
 */
export function useLogin(
    options?: UseMutationOptions<LoginResponse, Error, LoginRequest>,
) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: LoginRequest) => authApi.login(data),
        onSuccess: (response) => {
            tokenManager.setTokens(response);

            queryClient.setQueryData(queryKeys.auth.currentUser, response.user);

            queryClient.invalidateQueries();
        },
        ...options,
    });
}

/**
 * Logout
 */
export function useLogout(options?: UseMutationOptions<void, Error, string>) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (refreshToken: string) => authApi.logout({ refreshToken }),
        onSuccess: () => {
            // Clear tokens
            tokenManager.clearTokens();

            // Clear all cache
            queryClient.clear();
        },
        ...options,
    });
}

/**
 * Refresh token
 */
export function useRefreshToken(
    options?: UseMutationOptions<
        RefreshTokenResponse,
        Error,
        RefreshTokenRequest
    >,
) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: RefreshTokenRequest) => authApi.refreshToken(data),
        onSuccess: (response) => {
            // Update tokens
            tokenManager.setTokens(response);

            // Update user in cache
            queryClient.setQueryData(queryKeys.auth.currentUser, response.user);
        },
        ...options,
    });
}

/**
 * Verify email
 */
export function useVerifyEmail(
    options?: UseMutationOptions<void, Error, string>,
) {
    return useMutation({
        mutationFn: (token: string) => authApi.verifyEmail(token),
        ...options,
    });
}

/**
 * Resend verification email
 */
export function useResendVerification(
    options?: UseMutationOptions<void, Error, void>,
) {
    return useMutation({
        mutationFn: () => authApi.resendVerificationEmail(),
        ...options,
    });
}

/**
 * Forgot password
 */
export function useForgotPassword(
    options?: UseMutationOptions<void, Error, ForgotPasswordRequest>,
) {
    return useMutation({
        mutationFn: (data: ForgotPasswordRequest) =>
            authApi.forgotPassword(data),
        ...options,
    });
}

/**
 * Reset password
 */
export function useResetPassword(
    options?: UseMutationOptions<
        void,
        Error,
        { token: string; data: ResetPasswordRequest }
    >,
) {
    return useMutation({
        mutationFn: ({ token, data }) => authApi.resetPassword(token, data),
        ...options,
    });
}

/**
 * Change password
 */
export function useChangePassword(
    options?: UseMutationOptions<void, Error, ChangePasswordRequest>,
) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: ChangePasswordRequest) =>
            authApi.changePassword(data),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: queryKeys.auth.currentUser,
            });
        },
        ...options,
    });
}

/**
 * Social login
 */
export function useSocialLogin(
    options?: UseMutationOptions<LoginResponse, Error, SocialLoginRequest>,
) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: SocialLoginRequest) => authApi.socialLogin(data),
        onSuccess: (response) => {
            // Store tokens
            tokenManager.setTokens(response);

            // Set user data in cache
            queryClient.setQueryData(queryKeys.auth.currentUser, response.user);

            // Invalidate all queries
            queryClient.invalidateQueries();
        },
        ...options,
    });
}
