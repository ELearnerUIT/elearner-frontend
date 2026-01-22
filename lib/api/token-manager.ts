/**
 * Token Manager
 * Handles storage and retrieval of authentication tokens
 */

import { API_CONFIG, isClient } from './config';
import type { AuthTokens } from '@/types';

class TokenManager {
  /**
   * Get access token
   */
  getAccessToken(): string | null {
    if (!isClient()) return null;
    return localStorage.getItem(API_CONFIG.ACCESS_TOKEN_KEY);
  }

  /**
   * Get refresh token
   */
  getRefreshToken(): string | null {
    if (!isClient()) return null;
    return localStorage.getItem(API_CONFIG.REFRESH_TOKEN_KEY);
  }

  /**
   * Set tokens
   */
  setTokens(tokens: AuthTokens): void {
    if (!isClient()) return;
    
    localStorage.setItem(API_CONFIG.ACCESS_TOKEN_KEY, tokens.accessToken);
    localStorage.setItem(API_CONFIG.REFRESH_TOKEN_KEY, tokens.refreshToken);
    
    // Store expiry time from accessTokenExpiresAt
    if (tokens.accessTokenExpiresAt) {
      const expiryTime = new Date(tokens.accessTokenExpiresAt).getTime();
      localStorage.setItem(API_CONFIG.TOKEN_EXPIRY_KEY, expiryTime.toString());
    }
  }

  /**
   * Clear all tokens
   */
  clearTokens(): void {
    if (!isClient()) return;
    
    localStorage.removeItem(API_CONFIG.ACCESS_TOKEN_KEY);
    localStorage.removeItem(API_CONFIG.REFRESH_TOKEN_KEY);
    localStorage.removeItem(API_CONFIG.TOKEN_EXPIRY_KEY);
  }

  /**
   * Check if token is expired
   */
  isTokenExpired(): boolean {
    if (!isClient()) return true;
    
    const expiryTime = localStorage.getItem(API_CONFIG.TOKEN_EXPIRY_KEY);
    if (!expiryTime) return false;
    
    return Date.now() > parseInt(expiryTime, 10);
  }

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    return !!this.getAccessToken() && !this.isTokenExpired();
  }

  /**
   * Get token expiry time
   */
  getTokenExpiry(): number | null {
    if (!isClient()) return null;
    
    const expiryTime = localStorage.getItem(API_CONFIG.TOKEN_EXPIRY_KEY);
    return expiryTime ? parseInt(expiryTime, 10) : null;
  }
}

export const tokenManager = new TokenManager();
