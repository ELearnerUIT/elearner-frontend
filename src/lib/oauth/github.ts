/**
 * GitHub OAuth helper functions
 */

const GITHUB_CLIENT_ID = process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID || "";
const REDIRECT_URI =
  typeof window !== "undefined" ? window.location.origin + "/login" : "";

/**
 * Initiate GitHub OAuth flow
 */
export const loginWithGitHub = () => {
  if (typeof window === "undefined") {
    throw new Error("GitHub login is only available in browser");
  }

  if (!GITHUB_CLIENT_ID) {
    throw new Error("GitHub Client ID is not configured");
  }

  const scope = "read:user user:email";
  const state = generateRandomState();

  // Store state in sessionStorage for verification
  sessionStorage.setItem("github_oauth_state", state);

  // Redirect to GitHub OAuth
  const authUrl = `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&scope=${encodeURIComponent(scope)}&state=${state}`;

  window.location.href = authUrl;
};

/**
 * Handle GitHub OAuth callback
 */
export const handleGitHubCallback = (): {
  code: string;
  state: string;
} | null => {
  if (typeof window === "undefined") {
    return null;
  }

  const urlParams = new URLSearchParams(window.location.search);
  const code = urlParams.get("code");
  const state = urlParams.get("state");
  const storedState = sessionStorage.getItem("github_oauth_state");

  if (!code || !state || state !== storedState) {
    return null;
  }

  // Clear state
  sessionStorage.removeItem("github_oauth_state");

  // Clear URL parameters
  window.history.replaceState({}, document.title, window.location.pathname);

  return { code, state };
};

/**
 * Generate random state for CSRF protection
 */
const generateRandomState = (): string => {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Array.from(array, (byte) => byte.toString(16).padStart(2, "0")).join(
    "",
  );
};

/**
 * Exchange GitHub code for access token (via your backend)
 */
export const exchangeGitHubCode = async (code: string): Promise<string> => {
  // This should be handled by your backend to keep client secret secure
  // Your backend endpoint should:
  // 1. Receive the code
  // 2. Exchange it with GitHub for an access token
  // 3. Return the access token

  // For now, we'll assume your backend handles this
  // and returns the access token directly through the social login endpoint
  return code;
};
