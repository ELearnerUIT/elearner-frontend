/**
 * Facebook OAuth helper functions
 */

const FACEBOOK_APP_ID = process.env.NEXT_PUBLIC_FACEBOOK_APP_ID || "";
const REDIRECT_URI = typeof window !== "undefined" ? window.location.origin + "/login" : "";

export interface FacebookAuthResponse {
  accessToken: string;
  userID: string;
  expiresIn: number;
  signedRequest: string;
  graphDomain: string;
  data_access_expiration_time: number;
}

/**
 * Initialize Facebook SDK
 */
export const initFacebookSDK = (): Promise<void> => {
  return new Promise((resolve) => {
    // Load Facebook SDK
    if (typeof window === "undefined") {
      resolve();
      return;
    }

    // Check if SDK is already loaded
    if ((window as any).FB) {
      resolve();
      return;
    }

    // Load SDK script
    (window as any).fbAsyncInit = function () {
      (window as any).FB.init({
        appId: FACEBOOK_APP_ID,
        cookie: true,
        xfbml: true,
        version: "v18.0",
      });
      resolve();
    };

    // Load the SDK asynchronously
    const script = document.createElement("script");
    script.src = "https://connect.facebook.net/en_US/sdk.js";
    script.async = true;
    script.defer = true;
    script.crossOrigin = "anonymous";
    document.body.appendChild(script);
  });
};

/**
 * Login with Facebook
 */
export const loginWithFacebook = (): Promise<FacebookAuthResponse> => {
  return new Promise(async (resolve, reject) => {
    if (typeof window === "undefined") {
      reject(new Error("Facebook login is only available in browser"));
      return;
    }

    if (!FACEBOOK_APP_ID) {
      reject(new Error("Facebook App ID is not configured"));
      return;
    }

    try {
      // Ensure SDK is loaded
      await initFacebookSDK();

      const FB = (window as any).FB;
      
      FB.login(
        (response: any) => {
          if (response.authResponse) {
            resolve({
              accessToken: response.authResponse.accessToken,
              userID: response.authResponse.userID,
              expiresIn: response.authResponse.expiresIn,
              signedRequest: response.authResponse.signedRequest,
              graphDomain: response.authResponse.graphDomain,
              data_access_expiration_time: response.authResponse.data_access_expiration_time,
            });
          } else {
            reject(new Error("User cancelled login or did not fully authorize"));
          }
        },
        { scope: "public_profile,email" }
      );
    } catch (error) {
      reject(error);
    }
  });
};

/**
 * Get Facebook user info
 */
export const getFacebookUserInfo = (accessToken: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    const FB = (window as any).FB;
    
    FB.api("/me", { fields: "id,name,email,picture", access_token: accessToken }, (response: any) => {
      if (response && !response.error) {
        resolve(response);
      } else {
        reject(response.error || new Error("Failed to get user info"));
      }
    });
  });
};
