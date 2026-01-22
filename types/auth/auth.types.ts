import { Role, LanguageKey, SocialProvider } from '../shared/common.types';

/**
 * User registration request DTO
 * POST /api/v1/auth/register
 */
export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
  role: Role;
  langKey?: LanguageKey;
}

/**
 * User registration response DTO
 */
export interface RegisterResponse {
  id: number;
  username: string;
  email: string;
  role: Role;
  fullName: string | null;
  avatarUrl: string;
  langKey: string;
  createdAt: string;
  emailVerified: boolean;
}

/**
 * Login request DTO
 * POST /api/v1/auth/login
 */
export interface LoginRequest {
  login: string; // username or email
  password: string;
  deviceInfo?: string;
  ipAddress?: string;
}

/**
 * User details in auth responses
 */
export interface User {
  id: number;
  username: string;
  email: string;
  role: Role;
  fullName: string;
  avatarUrl: string;
  langKey: string;
  emailVerified: boolean;
}

/**
 * Token pair response
 */
export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  accessTokenExpiresAt: string;
  refreshTokenExpiresAt: string;
}

/**
 * Login response DTO
 */
export interface LoginResponse extends AuthTokens {
  user: User;
}

/**
 * Complete authentication data
 */
export interface AuthData extends LoginResponse {}

/**
 * Refresh token request DTO
 * POST /api/v1/auth/refresh
 */
export interface RefreshTokenRequest {
  refreshToken: string;
}

/**
 * Token response DTO
 */
export interface TokenResponse extends AuthTokens {
  user: User;
}

/**
 * Logout request DTO
 * POST /api/v1/auth/logout
 */
export interface LogoutRequest {
  refreshToken: string;
}

/**
 * Forgot password request DTO
 * POST /api/v1/auth/password/forgot
 */
export interface ForgotPasswordRequest {
  email: string;
}

/**
 * Reset password request DTO
 * POST /api/v1/auth/password/reset?token={token}
 */
export interface ResetPasswordRequest {
  token: string;
  newPassword: string;
}

/**
 * Change password request DTO
 * PUT /api/v1/auth/password/change
 */
export interface ChangePasswordRequest {
  oldPassword: string;
  newPassword: string;
}

/**
 * Social login request DTO
 * POST /api/v1/auth/social/login
 */
export interface SocialLoginRequest {
  provider: SocialProvider;
  accessToken: string;
  role: Role;
  deviceInfo?: string;
  ipAddress?: string;
}

/**
 * Current user response DTO
 * GET /api/v1/auth/me
 */
export interface MeResponse {
  id: number;
  username: string;
  email: string;
  role: Role;
  fullName: string;
  avatarUrl: string;
  langKey: string;
  emailVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

/**
 * Email verification parameters
 * GET /api/v1/auth/verify-email?token={token}
 */
export interface VerifyEmailParams {
  token: string;
}
