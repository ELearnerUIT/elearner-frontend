import { GraduationCap, Loader2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import CustomPasswordField from "../shared/CustomPasswordField";
import CustomInputField, { InputFieldIcon } from "../shared/CustomInputField";
import { ButtonColor, CustomButton } from "../shared/CustomButton";
import { useLogin } from "@/lib/hooks";

export default function AdminLoginForm() {
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
                onSuccess: (data) => {
                    if (data.user.role !== "ADMIN") {
                        setErrorMessage(
                            "Access denied. Admin credentials required.",
                        );
                        return;
                    }
                    router.push("/dashboard");
                },
                onError: (error) => {
                    setErrorMessage(error.message || "Invalid credentials");
                },
            },
        );
    };
    return (
        <div className="w-full max-w-md space-y-8">
            {/* Admin Icon */}
            <div className="flex justify-center">
                <div className="w-25 h-25 bg-[rgba(99,102,241)] rounded-2xl flex items-center justify-center shadow-lg">
                    <GraduationCap className="text-white w-16 h-16" />
                </div>
            </div>

            {/* Title and Subtitle */}
            <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                    Admin Login
                </h2>
                <p className="text-gray-600 mb-6">
                    Sign in to access the admin dashboard
                </p>
            </div>

            {/* Form Container */}
            <div className="bg-white rounded-lg shadow-md p-8 space-y-4">
                {/* Error Message */}
                {errorMessage && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                        {errorMessage}
                    </div>
                )}

                {/* Login Field */}
                <CustomInputField
                    text="Username"
                    icon={InputFieldIcon.USER}
                    initValue={loginInput}
                    placeholder="admin"
                    errorMessage={loginError}
                    onValueChange={(
                        event: React.ChangeEvent<HTMLInputElement>,
                    ) => setLoginInput(event.target.value)}
                    onValidate={(
                        event: React.ChangeEvent<HTMLInputElement>,
                    ) => {
                        validateLogin(event.target.value);
                    }}
                />

                {/* Password Field */}
                <CustomPasswordField
                    text="Password"
                    initValue={passwordInput}
                    placeholder="Enter your password"
                    errorMessage={passwordError}
                    onValueChange={(
                        event: React.ChangeEvent<HTMLInputElement>,
                    ) => setPasswordInput(event.target.value)}
                    onValidate={(
                        event: React.ChangeEvent<HTMLInputElement>,
                    ) => {
                        validatePassword(event.target.value);
                    }}
                />

                {/* Forgot Password Link */}
                <div className="text-right mb-6">
                    <Link
                        href="/admin/forgot-password"
                        className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                    >
                        Forgot password?
                    </Link>
                </div>

                {/* Sign In Button */}
                <div className="mt-6">
                    <CustomButton
                        text={isPending ? "" : "Login →"}
                        enabled={!isPending}
                        color={ButtonColor.PURPLE}
                        onClick={(event) => handleLogin(event)}
                    >
                        {isPending && (
                            <Loader2 className="w-5 h-5 animate-spin" />
                        )}
                        {isPending && "Logging in..."}
                    </CustomButton>
                </div>
            </div>

            {/* Copyright */}
            <div className="text-center">
                <p className="text-sm text-gray-500">
                    © 2024 ELearner. All rights reserved.
                </p>
            </div>
        </div>
    );
}
