"use client";

import type { NextPage } from "next";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { TriangleAlertIcon, Loader2 } from "lucide-react";
import CustomPasswordField from "@/components/shared/CustomPasswordField";
import CustomInputField, {
    InputFieldIcon,
} from "@/components/shared/CustomInputField";
import { CustomButton, ButtonColor } from "@/components/shared/CustomButton";
import { setAuthData, AuthData } from "@/lib/auth";

const TeacherLogin: NextPage = () => {
    const router = useRouter();

    const [loginInput, setLoginInput] = useState("");
    const [passwordInput, setPasswordInput] = useState("");
    const [loginError, setLoginError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const validateLogin = (login: string) => {
        if (!login) {
            setLoginError("Please enter your username or email");
            return false;
        }
        setLoginError("");
        return true;
    };

    const validatePassword = (password: string) => {
        if (!password || password.length === 0) {
            setPasswordError("Please enter your password");
            return false;
        }
        setPasswordError("");
        return true;
    };

    const handleLogin = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();

        let isValid = true;

        if (!validateLogin(loginInput)) isValid = false;
        if (!validatePassword(passwordInput)) isValid = false;

        if (!isValid) {
            return;
        }

        setIsLoading(true);
        setErrorMessage("");

        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080"}/api/v1/auth/login`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        login: loginInput,
                        password: passwordInput,
                    }),
                },
            );

            const data = await response.json();

            if (data.success && data.data) {
                const authData: AuthData = {
                    accessToken: data.data.accessToken,
                    refreshToken: data.data.refreshToken,
                    accessTokenExpiresAt: data.data.accessTokenExpiresAt,
                    refreshTokenExpiresAt: data.data.refreshTokenExpiresAt,
                    user: data.data.user,
                };

                setAuthData(authData);

                if (data.data.user.role === "TEACHER") {
                    router.push("/teacher");
                } else {
                    setErrorMessage(
                        "Invalid account type. Please use the student login.",
                    );
                }
            } else {
                setErrorMessage(
                    data.message ||
                        "Login failed. Please check your credentials.",
                );
            }
        } catch (error) {
            console.error("Login error:", error);
            setErrorMessage(
                "Unable to connect to the server. Please try again later.",
            );
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-indigo-50 to-purple-50 p-4">
            <div className="w-full max-w-md">
                <div className="bg-white rounded-2xl shadow-xl p-8">
                    <div className="text-center mb-8">
                        <div className="inline-block px-3 py-1 mb-4 bg-indigo-100 text-indigo-700 rounded-full text-sm font-semibold tracking-wide uppercase">
                            ELearner
                        </div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">
                            Instructor Login
                        </h1>
                        <p className="text-gray-600">
                            Welcome back! Sign in to continue teaching.
                        </p>
                    </div>

                    {errorMessage && (
                        <div className="mb-6 p-3 rounded-lg bg-red-50 text-red-600 text-sm flex items-center gap-2">
                            <TriangleAlertIcon className="w-4 h-4 flex-shrink-0" />
                            {errorMessage}
                        </div>
                    )}

                    <form className="space-y-5">
                        <CustomInputField
                            text="Username or Email"
                            icon={InputFieldIcon.MAIL}
                            initValue={loginInput}
                            placeholder="Enter your username or email"
                            errorMessage={loginError}
                            onValueChange={(e) => {
                                setLoginInput(e.target.value);
                                if (loginError) validateLogin(e.target.value);
                            }}
                        />

                        <CustomPasswordField
                            text="Password"
                            initValue={passwordInput}
                            placeholder="Enter your password"
                            errorMessage={passwordError}
                            onValueChange={(e) => {
                                setPasswordInput(e.target.value);
                                if (passwordError)
                                    validatePassword(e.target.value);
                            }}
                        />

                        <div className="flex items-center justify-end text-sm">
                            <a
                                href="/forgot-password"
                                className="text-indigo-600 hover:text-indigo-800 font-medium"
                            >
                                Forgot Password?
                            </a>
                        </div>

                        <CustomButton
                            text={isLoading ? "" : "Sign In"}
                            enabled={!isLoading}
                            color={ButtonColor.PURPLE}
                            onClick={handleLogin}
                        >
                            {isLoading && (
                                <Loader2 className="w-5 h-5 animate-spin mx-auto" />
                            )}
                        </CustomButton>
                    </form>

                    <div className="mt-6 text-center text-sm text-gray-600">
                        Don't have an account?{" "}
                        <a
                            href="/teacher/register"
                            className="text-indigo-600 font-medium hover:underline"
                        >
                            Sign up as an Instructor
                        </a>
                    </div>

                    <div className="mt-4 text-center text-sm text-gray-500">
                        Looking to learn?{" "}
                        <a
                            href="/login"
                            className="text-indigo-600 font-medium hover:underline"
                        >
                            Student Login
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TeacherLogin;
