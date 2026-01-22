/**
 * Authentication API Service
 * Handles user authentication, registration, and password management
 */

import { apiInstance } from "../client";
import { unwrapResponse } from "../types";
import type {
  ReqLoginDTO,
  ResLoginDTO,
  RegisterRequest,
  RegisterResponse,
  ReqRefreshTokenDTO,
  ForgotPasswordDTO,
  ResetPasswordDTO,
  ChangePasswordDTO,
  ResendVerifyEmailRequest,
  SocialLoginRequest,
  MeResponse,
} from "../generated/data-contracts";

class AuthApiService {
  /**
   * Login with email and password
   */
  async login(credentials: ReqLoginDTO): Promise<ResLoginDTO> {
    const response = await apiInstance.login(credentials);
    console.log("Login response:", response);
    return unwrapResponse<ResLoginDTO>(response);
  }

  /**
   * Retrieve information about the currently logged-in user.
   */
  async getCurrentUserInfo(): Promise<MeResponse> {
    const response = await apiInstance.getCurrentUserInfo();
    console.log("Current user info response:", response);
    return unwrapResponse<MeResponse>(response);
  }

  /**
   * Register a new user account
   */
  async register(data: RegisterRequest): Promise<RegisterResponse> {
    const response = await apiInstance.registerAccount(data);
    return unwrapResponse<RegisterResponse>(response);
  }

  /**
   * Refresh access token using refresh token
   */
  async refresh(request: ReqRefreshTokenDTO): Promise<ResLoginDTO> {
    const response = await apiInstance.refreshAccessToken(request);
    return unwrapResponse<ResLoginDTO>(response);
  }

  /**
   * Logout and invalidate tokens
   */
  async logout(refreshToken: string): Promise<void> {
    await apiInstance.logout({ refreshToken });
  }

  /**
   * Request password reset email
   */
  async forgotPassword(data: ForgotPasswordDTO): Promise<void> {
    await apiInstance.forgotPassword(data);
  }

  /**
   * Reset password with token
   */
  async resetPassword(token: string, data: ResetPasswordDTO): Promise<void> {
    await apiInstance.resetPassword({ token }, data);
  }

  /**
   * Change password (authenticated user)
   */
  async changePassword(data: ChangePasswordDTO): Promise<void> {
    await apiInstance.changePassword(data);
  }

  /**
   * Verify email with verification token
   */
  async verifyEmail(token: string): Promise<void> {
    await apiInstance.verifyEmail({ token });
  }

  /**
   * Resend email verification
   */
  async resendVerification(data: ResendVerifyEmailRequest): Promise<void> {
    await apiInstance.resendVerificationEmail(data);
  }

  /**
   * Social login (Google, Facebook, etc.)
   */
  async socialLogin(data: SocialLoginRequest): Promise<ResLoginDTO> {
    const response = await apiInstance.socialLogin(data);
    return unwrapResponse<ResLoginDTO>(response);
  }
}

export const authApi = new AuthApiService();
