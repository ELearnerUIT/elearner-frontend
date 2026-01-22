export interface User {
  id: number;
  username: string;
  email: string;
  role: "STUDENT" | "TEACHER" | "ADMIN";
  fullName: string;
  avatarUrl: string;
  langKey: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  accessTokenExpiresAt: string;
  refreshTokenExpiresAt: string;
}

export interface AuthData extends AuthTokens {
  user: User;
}

const ACCESS_TOKEN_KEY = "accessToken";
const REFRESH_TOKEN_KEY = "refreshToken";
const USER_KEY = "user";

function setCookie(name: string, value: string, days: number = 7): void {
  if (typeof document === "undefined") return;

  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${encodeURIComponent(value)};expires=${expires.toUTCString()};path=/;SameSite=Lax`;
}

function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;

  const nameEQ = `${name}=`;
  const cookies = document.cookie.split(";");

  for (let cookie of cookies) {
    cookie = cookie.trim();
    if (cookie.indexOf(nameEQ) === 0) {
      return decodeURIComponent(cookie.substring(nameEQ.length));
    }
  }
  return null;
}

function deleteCookie(name: string): void {
  if (typeof document === "undefined") return;
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
}

export function setAuthData(data: AuthData): void {
  const accessExpires = new Date(data.accessTokenExpiresAt);
  const refreshExpires = new Date(data.refreshTokenExpiresAt);
  const now = new Date();

  const accessDays = Math.max(
    1,
    Math.ceil(
      (accessExpires.getTime() - now.getTime()) / (1000 * 60 * 60 * 24),
    ),
  );
  const refreshDays = Math.max(
    1,
    Math.ceil(
      (refreshExpires.getTime() - now.getTime()) / (1000 * 60 * 60 * 24),
    ),
  );

  setCookie(ACCESS_TOKEN_KEY, data.accessToken, accessDays);
  setCookie(REFRESH_TOKEN_KEY, data.refreshToken, refreshDays);
  setCookie(USER_KEY, JSON.stringify(data.user), refreshDays);
}

export function getAccessToken(): string | null {
  return getCookie(ACCESS_TOKEN_KEY);
}

export function getRefreshToken(): string | null {
  return getCookie(REFRESH_TOKEN_KEY);
}

export function getUser(): User | null {
  const userStr = getCookie(USER_KEY);
  if (!userStr) return null;

  try {
    return JSON.parse(userStr) as User;
  } catch {
    return null;
  }
}

export function clearAuthData(): void {
  deleteCookie(ACCESS_TOKEN_KEY);
  deleteCookie(REFRESH_TOKEN_KEY);
  deleteCookie(USER_KEY);
}

export function isAuthenticated(): boolean {
  return !!getAccessToken();
}

export function hasRole(role: User["role"]): boolean {
  const user = getUser();
  return user?.role === role;
}

export function isStudent(): boolean {
  return hasRole("STUDENT");
}

export function isTeacher(): boolean {
  return hasRole("TEACHER");
}

export function isAdmin(): boolean {
  return hasRole("ADMIN");
}

export async function refreshAccessToken(): Promise<AuthData | null> {
  const refreshToken = getRefreshToken();

  if (!refreshToken) {
    clearAuthData();
    return null;
  }

  try {
    // Import dynamically to avoid circular dependencies
    const { authApi } = await import("./api/services");

    const response = await authApi.refresh({ refreshToken });

    const authData: AuthData = {
      accessToken: response.accessToken!,
      refreshToken: response.refreshToken!,
      accessTokenExpiresAt: response.accessTokenExpiresAt!,
      refreshTokenExpiresAt: response.refreshTokenExpiresAt!,
      user: response.user as User,
    };

    setAuthData(authData);
    return authData;
  } catch (error) {
    console.error("Token refresh failed:", error);
    clearAuthData();
    return null;
  }
}

export async function logout(): Promise<boolean> {
  const accessToken = getAccessToken();
  const refreshToken = getRefreshToken();

  if (!accessToken || !refreshToken) {
    clearAuthData();
    return true;
  }

  try {
    // Import dynamically to avoid circular dependencies
    const { authApi } = await import("./api/services");

    await authApi.logout(refreshToken);
    clearAuthData();
    return true;
  } catch (error) {
    console.error("Logout error:", error);
    clearAuthData();
    return true;
  }
}
