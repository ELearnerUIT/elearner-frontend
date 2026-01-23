"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, Lock, Eye, EyeOff, Check, Loader2 } from "lucide-react";
import { useGoogleLogin } from "@react-oauth/google";
import { loginWithFacebook } from "@/lib/oauth/facebook";
import { loginWithGitHub, handleGitHubCallback } from "@/lib/oauth/github";
import { loginSchema, type LoginFormData } from "@/lib/validations/auth.schema";
import { useLogin, useResendVerificationEmail, useSocialLogin } from "@/hooks/useAuth";
import Popup, { PopupType } from "@/core/components/public/Popup";
import { RoleSelectionModal } from "@/core/components/public/RoleSelectionModal";
import { UserRole } from "@/services/auth/auth.types";

export default function LoginPage() {
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirect");

  const [showPassword, setShowPassword] = useState(false);
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [socialAccessToken, setSocialAccessToken] = useState<string | null>(null);
  const [socialAuthCode, setSocialAuthCode] = useState<string | null>(null);
  const [socialProvider, setSocialProvider] = useState<"GOOGLE" | "FACEBOOK" | "GITHUB" | null>(null);
  const [popup, setPopup] = useState<{
    type: PopupType;
    title: string;
    message: string;
    actions?: React.ReactNode;
    onClose: () => void;
  } | null>(null);

  const { mutate: login, isPending } = useLogin();
  const { mutate: resendEmail } = useResendVerificationEmail();
  const { mutate: socialLogin, isPending: isSocialLoading } = useSocialLogin();

  // Handle GitHub OAuth callback
  useEffect(() => {
    const githubCallback = handleGitHubCallback();
    if (githubCallback) {
      // GitHub returns authorization code (not access token)
      setSocialAuthCode(githubCallback.code);
      setSocialProvider("GITHUB");
      setShowRoleModal(true);
    }
  }, []);

  const googleLogin = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      // Store token and show role selection modal
      setSocialAccessToken(tokenResponse.access_token);
      setSocialProvider("GOOGLE");
      setShowRoleModal(true);
    },
    onError: (error) => {
      console.error("Google login error:", error);
    },
  });

  const handleRoleSelection = (role: UserRole) => {
    if (socialProvider) {
      const payload: any = {
        provider: socialProvider,
        role,
        redirectUrl: redirectUrl || undefined,
      };

      // GitHub uses authorization code, others use access token
      if (socialProvider === "GITHUB" && socialAuthCode) {
        payload.authorizationCode = socialAuthCode;
      } else if (socialAccessToken) {
        payload.accessToken = socialAccessToken;
      }

      socialLogin(payload);
      setShowRoleModal(false);
      setSocialAccessToken(null);
      setSocialAuthCode(null);
      setSocialProvider(null);
    }
  };

  const handleFacebookLogin = async () => {
    try {
      const response = await loginWithFacebook();
      setSocialAccessToken(response.accessToken);
      setSocialProvider("FACEBOOK");
      setShowRoleModal(true);
    } catch (error) {
      console.error("Facebook login error:", error);
    }
  };

  const handleGitHubLogin = () => {
    try {
      loginWithGitHub();
    } catch (error) {
      console.error("GitHub login error:", error);
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: LoginFormData) => {
    login(
      {
        login: data.email,
        password: data.password,
        redirectUrl: redirectUrl || undefined,
      },
      {
        onError: (error) => {
          // Handle email not verified error
          if (error.code === "EMAIL_NOT_VERIFIED") {
            setPopup({
              type: "error",
              title: "Account not activated",
              message:
                "Your email is not verified yet. Please check your inbox or resend the verification email.",
              actions: (
                <button
                  onClick={() => {
                    const email = getValues("email");
                    resendEmail(email);
                    setPopup(null);
                  }}
                  className="px-4 py-2 rounded-xl bg-[var(--brand-600)] text-white hover:bg-[var(--brand-900)]"
                >
                  Resend verification email
                </button>
              ),
              onClose: () => setPopup(null),
            });
          }
        },
      }
    );
  };

  return (
    <main className="min-h-[72vh]">
      <section className="mx-auto max-w-6xl px-4 sm:px-6 py-10 md:py-14">
        <div className="grid gap-8 md:grid-cols-2 items-center">
          {/* ==== Left: Login Card ==== */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-slate-900/40 border border-white/10 rounded-2xl p-6 sm:p-8 shadow-xl"
          >
            <div className="mb-6">
              <h1 className="text-2xl font-semibold">Log in</h1>
              <p className="text-sm text-slate-400 mt-1">
                Welcome back! Continue your learning journey.
              </p>
            </div>

            {/* Email */}
            <label className="block text-sm mb-2" htmlFor="email">
              Email or Username
            </label>
            <div className="relative mb-1">
              <input
                id="email"
                type="text"
                placeholder="you@example.com"
                {...register("email")}
                disabled={isPending || isSocialLoading}
                className="w-full rounded-xl bg-slate-800/60 border border-white/10 px-4 py-3 pr-11 outline-none focus:ring-2 focus:ring-[var(--brand-600)] disabled:opacity-50"
              />
              <Mail className="absolute right-3 top-1/2 -translate-y-1/2 size-5 text-slate-400" />
            </div>
            {errors.email && (
              <p className="text-sm text-red-400 mb-3 mt-1">{errors.email.message}</p>
            )}
            {!errors.email && <div className="mb-5" />}

            {/* Password */}
            <div className="flex items-center justify-between">
              <label className="block text-sm" htmlFor="password">
                Password
              </label>
              <Link
                href="/forgot-password"
                className="text-sm text-[var(--brand-600)] hover:opacity-90"
              >
                Forgot password?
              </Link>
            </div>
            <div className="relative mt-2 mb-1">
              <Lock className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 size-5 text-slate-400" />
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                {...register("password")}
                disabled={isPending || isSocialLoading}
                className="w-full rounded-xl bg-slate-800/60 border border-white/10 py-3 pr-11 pl-10 outline-none focus:ring-2 focus:ring-[var(--brand-600)] disabled:opacity-50"
              />
              <button
                type="button"
                aria-label={showPassword ? "Hide password" : "Show password"}
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 disabled:opacity-50"
                disabled={isPending || isSocialLoading}
              >
                {showPassword ? (
                  <EyeOff className="size-5" />
                ) : (
                  <Eye className="size-5" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="text-sm text-red-400 mb-3 mt-1">{errors.password.message}</p>
            )}
            {!errors.password && <div className="mb-4" />}

            {/* Remember me */}
            <label className="inline-flex items-center gap-2 text-sm mb-5 select-none">
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-white/20 bg-slate-800/60"
                disabled={isPending || isSocialLoading}
              />
              Remember me
            </label>

            {/* Submit */}
            <button
              type="submit"
              disabled={isPending || isSocialLoading}
              className="w-full rounded-xl py-3 font-medium text-white bg-[var(--brand-600)] hover:bg-[var(--brand-900)] disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center justify-center gap-2"
            >
              {isPending && <Loader2 className="size-5 animate-spin" />}
              {isPending ? "Logging in..." : "Log in"}
            </button>

            {/* Divider */}
            <div className="my-6 flex items-center gap-4">
              <div className="h-px flex-1 bg-white/10" />
              <span className="text-xs uppercase tracking-wider text-slate-400">
                or
              </span>
              <div className="h-px flex-1 bg-white/10" />
            </div>

            {/* Socials */}
            <div className="grid sm:grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => googleLogin()}
                disabled={isPending || isSocialLoading}
                className="rounded-xl border border-white/10 bg-slate-800/40 py-2.5 hover:bg-slate-800/70 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSocialLoading ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : (
                  <svg className="size-5" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="currentColor"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                )}
                Continue with Google
              </button>
              <button
                type="button"
                onClick={handleFacebookLogin}
                disabled={isPending || isSocialLoading}
                className="rounded-xl border border-white/10 bg-slate-800/40 py-2.5 hover:bg-slate-800/70 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSocialLoading ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : (
                  <svg className="size-5" viewBox="0 0 24 24" fill="#1877F2">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                )}
                Continue with Facebook
              </button>
            </div>

            {/* GitHub login */}
            <button
              type="button"
              onClick={handleGitHubLogin}
              disabled={isPending || isSocialLoading}
              className="w-full mt-3 rounded-xl border border-white/10 bg-slate-800/40 py-2.5 hover:bg-slate-800/70 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSocialLoading ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                <svg className="size-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              )}
              Continue with GitHub
            </button>

            {/* Sign up link */}
            <p className="text-sm text-slate-400 mt-6 text-center">
              New to LMS?{" "}
              <Link href="/signup" className="text-[var(--brand-600)] hover:opacity-90">
                Create an account
              </Link>
            </p>
          </form>

          <aside className="hidden md:block">
            <div className="relative overflow-hidden rounded-2xl border border-white/10 p-8 min-h-[360px]">
              <div className="absolute inset-0 bg-gradient-to-br from-[color:rgb(var(--brand-600-rgb,63_163_55))]/15 via-transparent to-[color:rgb(var(--brand-900-rgb,45_90_39))]/25" />
              <div className="relative">
                <h2 className="text-3xl font-bold">Learn without limits</h2>
                <p className="mt-2 text-slate-300">
                  Access high-quality courses and track your progress across devices.
                </p>
                <ul className="mt-6 space-y-3">
                  {[
                    "Personalized recommendations",
                    "Lifetime access to purchased courses",
                    "Completion certificates",
                  ].map((t, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="mt-0.5 rounded-full p-1 bg-[var(--brand-600)]/15">
                        <Check className="size-4 text-[var(--brand-600)]" />
                      </span>
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-8">
                  <Link
                    href="/explore"
                    className="inline-flex items-center rounded-xl px-4 py-2 font-medium bg-[var(--brand-600)] text-white hover:bg-[var(--brand-900)] transition"
                  >
                    Explore courses
                  </Link>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {popup && (
        <Popup
          type={popup.type}
          title={popup.title}
          message={popup.message}
          actions={popup.actions}
          open={true}
          onClose={popup.onClose}
        />
      )}

      <RoleSelectionModal
        open={showRoleModal}
        onSelectRole={handleRoleSelection}
        onClose={() => {
          setShowRoleModal(false);
          setSocialAccessToken(null);
          setSocialProvider(null);
        }}
      />
    </main>
  );
}
