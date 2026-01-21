"use client";
import { TriangleAlertIcon, Loader2, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import CustomPasswordField from "@/components/shared/CustomPasswordField";
import { CustomButton, ButtonColor } from "../shared/CustomButton";
import { API_ENDPOINTS, apiRequest } from "@/lib/api";

export default function ResetPasswordForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const token = searchParams.get("token");

    const [passwordInput, setPasswordInput] = useState("");
    const [confirmPasswordInput, setConfirmPasswordInput] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [confirmPasswordError, setConfirmPasswordError] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const validatePassword = (password: string) => {
        if (!password || password.length === 0) {
            setPasswordError("Please enter your new password");
            return false;
        }
        if (password.length < 8) {
            setPasswordError("Password must be at least 8 characters");
            return false;
        }
        setPasswordError("");
        return true;
    };

    const validateConfirmPassword = (confirmPassword: string) => {
        if (!confirmPassword || confirmPassword.length === 0) {
            setConfirmPasswordError("Please confirm your password");
            return false;
        }
        if (confirmPassword !== passwordInput) {
            setConfirmPasswordError("Passwords do not match");
            return false;
        }
        setConfirmPasswordError("");
        return true;
    };

    const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();

        let isValid = true;

        if (!validatePassword(passwordInput)) isValid = false;
        if (!validateConfirmPassword(confirmPasswordInput)) isValid = false;

        if (!isValid) {
            return;
        }

        if (!token) {
            setErrorMessage("Invalid or missing reset token");
            return;
        }

        setIsLoading(true);
        setErrorMessage("");
        setSuccessMessage("");

        try {
            const response = await apiRequest(
                `${API_ENDPOINTS.AUTH.RESET_PASSWORD}?token=${token}`,
                {
                    method: "POST",
                    body: JSON.stringify({
                        newPassword: passwordInput,
                    }),
                }
            );

            if (response.success) {
                setSuccessMessage(
                    "Password reset successful! Redirecting to login..."
                );
                setTimeout(() => {
                    router.push("/login");
                }, 2000);
            } else {
                setErrorMessage(
                    response.message || "Failed to reset password. Please try again."
                );
            }
        } catch (error) {
            setErrorMessage(
                "Unable to connect to server. Please check your connection and try again."
            );
        } finally {
            setIsLoading(false);
        }
    };

    if (!token) {
        return (
            <div className="w-md">
                <div className="bg-white rounded-lg shadow-lg p-8">
                    <div className="text-red-500 flex items-center gap-2 flex-row">
                        <TriangleAlertIcon className="w-5 h-5 flex-shrink-0" />
                        Invalid or missing reset token. Please request a new password reset link.
                    </div>
                    <div className="mt-6">
                        <a
                            href="/forgot-password"
                            className="text-blue-500 hover:text-blue-700 font-medium"
                        >
                            ← Back to Forgot Password
                        </a>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="w-md">
            <div className="text-center mb-8">
                <h1 className="text-4xl font-normal text-[rgb(99,102,241)] mb-2">
                    ELearner
                </h1>
                <p className="text-gray-600">
                    Create a new password
                </p>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                    Reset Your Password
                </h2>
                <p className="text-gray-600 mb-6">
                    Enter your new password below
                </p>

                <form className="space-y-4">
                    {errorMessage && errorMessage.length > 0 && (
                        <div className="text-red-500 flex items-center gap-2 flex-row">
                            <TriangleAlertIcon className="w-5 h-5 flex-shrink-0" />
                            {errorMessage}
                        </div>
                    )}

                    {successMessage && successMessage.length > 0 && (
                        <div className="text-green-600 flex items-center gap-2 flex-row bg-green-50 p-4 rounded-lg">
                            <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                            {successMessage}
                        </div>
                    )}

                    <CustomPasswordField
                        text="New Password"
                        initValue={passwordInput}
                        placeholder="Enter your new password"
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

                    <CustomPasswordField
                        text="Confirm New Password"
                        initValue={confirmPasswordInput}
                        placeholder="Confirm your new password"
                        errorMessage={confirmPasswordError}
                        onValueChange={(
                            event: React.ChangeEvent<HTMLInputElement>,
                        ) => setConfirmPasswordInput(event.target.value)}
                        onValidate={(
                            event: React.ChangeEvent<HTMLInputElement>,
                        ) => {
                            validateConfirmPassword(event.target.value);
                        }}
                    />

                    <div className="mt-6">
                        <CustomButton
                            text={isLoading ? "" : "Reset Password →"}
                            enabled={!isLoading && !successMessage}
                            color={ButtonColor.PURPLE}
                            onClick={(event) => handleSubmit(event)}
                        >
                            {isLoading && (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            )}
                            {isLoading && "Resetting..."}
                        </CustomButton>
                    </div>
                </form>

                <div className="mt-6 text-center space-y-2">
                    <p className="text-gray-600 text-sm">
                        Remember your password?{" "}
                        <a
                            href="/login"
                            className="text-blue-500 hover:text-blue-700 font-medium"
                        >
                            Back to Login
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}
