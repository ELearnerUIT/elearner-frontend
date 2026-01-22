/**
 * Authentication API
 * Handles user authentication, registration, and password management
 */

import { apiClient, createPublicClient } from './client';
import type {
  RegisterRequest,
  RegisterResponse,
  LoginRequest,
  LoginResponse,
  LogoutRequest,
  RefreshTokenRequest,
  RefreshTokenResponse,
  ForgotPasswordRequest,
  ResetPasswordRequest,
  ChangePasswordRequest,
  SocialLoginRequest,
  User,
} from '@/types';

const publicClient = createPublicClient();

/**
 * Register new account
 * POST /auth/register
 */
export async function register(data: RegisterRequest): Promise<RegisterResponse> {
  const response = await publicClient.post<RegisterResponse>('/auth/register', data);
  return response.data;
}

/**
 * Verify email
 * GET /auth/verify-email?token={token}
 */
export async function verifyEmail(token: string): Promise<void> {
  await publicClient.get('/auth/verify-email', { params: { token } });
}

/**
 * Resend verification email
 * GET /auth/resend-verification
 */
export async function resendVerificationEmail(): Promise<void> {
  await apiClient.get('/auth/resend-verification');
}

/**
 * Login
 * POST /auth/login
 */
export async function login(data: LoginRequest): Promise<LoginResponse> {
  const response = await publicClient.post<LoginResponse>('/auth/login', data);
  return response.data;
}

/**
 * Logout
 * POST /auth/logout
 */
export async function logout(data: LogoutRequest): Promise<void> {
  await apiClient.post('/auth/logout', data);
}

/**
 * Refresh access token
 * POST /auth/refresh
 */
export async function refreshToken(data: RefreshTokenRequest): Promise<RefreshTokenResponse> {
  const response = await publicClient.post<RefreshTokenResponse>('/auth/refresh', data);
  return response.data;
}

/**
 * Forgot password - send reset email
 * POST /auth/password/forgot
 */
export async function forgotPassword(data: ForgotPasswordRequest): Promise<void> {
  await publicClient.post('/auth/password/forgot', data);
}

/**
 * Reset password with token
 * POST /auth/password/reset?token={token}
 */
export async function resetPassword(token: string, data: ResetPasswordRequest): Promise<void> {
  await publicClient.post('/auth/password/reset', data, { params: { token } });
}

/**
 * Change password (authenticated)
 * PUT /auth/password/change
 */
export async function changePassword(data: ChangePasswordRequest): Promise<void> {
  await apiClient.put('/auth/password/change', data);
}

/**
 * Get current user info
 * GET /auth/me
 */
export async function getCurrentUser(): Promise<User> {
  const response = await apiClient.get<User>('/auth/me');
  return response.data;
}

/**
 * Social login (Google, Facebook, GitHub)
 * POST /auth/social/login
 */
export async function socialLogin(data: SocialLoginRequest): Promise<LoginResponse> {
  const response = await publicClient.post<LoginResponse>('/auth/social/login', data);
  return response.data;
}
