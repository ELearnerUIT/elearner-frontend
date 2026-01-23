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
import { useLogin } from "@/lib/hooks";

const TeacherLogin: NextPage = () => {
    const router = useRouter();
    const { mutate: login, isPending } = useLogin();

    const [loginInput, setLoginInput] = useState("");
    const [passwordInput, setPasswordInput] = useState("");
    const [loginError, setLoginError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

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

        setErrorMessage("");

        login(
            {
                login: loginInput,
                password: passwordInput,
            },
            {
                onSuccess: (authData) => {
                    if (authData.user.role === "TEACHER") {
                        setAuthData(authData);
                        router.push("/dashboard");
                    } else {
                        setErrorMessage(
                            "Invalid account type. Please use the student login.",
                        );
                    }
                },
                onError: (error) => {
                    setErrorMessage(
                        error.message ||
                            "Login failed. Please check your credentials.",
                    );
                },
            },
        );
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
                            text={isPending ? "" : "Sign In"}
                            enabled={!isPending}
                            color={ButtonColor.PURPLE}
                            onClick={handleLogin}
                        >
                            {isPending && (
                                <Loader2 className="w-5 h-5 animate-spin mx-auto" />
                            )}
                        </CustomButton>
                    </form>

                    <div className="mt-6 text-center text-sm text-gray-600">
                        Don't have an account?{" "}
                        <a
                            href="/register"
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
