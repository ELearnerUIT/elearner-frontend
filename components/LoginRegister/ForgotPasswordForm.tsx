"use client";
import { TriangleAlertIcon, Loader2, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import CustomInputField, { InputFieldIcon } from "../shared/CustomInputField";
import { CustomButton, ButtonColor } from "../shared/CustomButton";
import { API_ENDPOINTS, apiRequest } from "@/lib/api";

export default function ForgotPasswordForm() {
    const [emailInput, setEmailInput] = useState("");
    const [emailError, setEmailError] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const validateEmail = (email: string) => {
        if (!email) {
            setEmailError("Please enter your email address");
            return false;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setEmailError("Please enter a valid email address");
            return false;
        }
        setEmailError("");
        return true;
    };

    const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();

        if (!validateEmail(emailInput)) {
            return;
        }

        setIsLoading(true);
        setErrorMessage("");
        setSuccessMessage("");

        try {
            const response = await apiRequest(API_ENDPOINTS.AUTH.FORGOT_PASSWORD, {
                method: "POST",
                body: JSON.stringify({
                    email: emailInput,
                }),
            });

            if (response.success) {
                setSuccessMessage(
                    "Password reset link has been sent to your email. Please check your inbox."
                );
                setEmailInput("");
            } else {
                setErrorMessage(
                    response.message || "Failed to send reset email. Please try again."
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

    return (
        <div className="w-md">
            <div className="text-center mb-8">
                <h1 className="text-4xl font-normal text-[rgb(99,102,241)] mb-2">
                    ELearner
                </h1>
                <p className="text-gray-600">
                    Reset your password
                </p>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                    Forgot Password?
                </h2>
                <p className="text-gray-600 mb-6">
                    Enter your email address and we&apos;ll send you a link to reset your password
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

                    <CustomInputField
                        text="Email Address"
                        icon={InputFieldIcon.MAIL}
                        initValue={emailInput}
                        placeholder="your.email@example.com"
                        errorMessage={emailError}
                        onValueChange={(
                            event: React.ChangeEvent<HTMLInputElement>,
                        ) => setEmailInput(event.target.value)}
                        onValidate={(
                            event: React.ChangeEvent<HTMLInputElement>,
                        ) => {
                            validateEmail(event.target.value);
                        }}
                    />

                    <div className="mt-6">
                        <CustomButton
                            text={isLoading ? "" : "Send Reset Link →"}
                            enabled={!isLoading}
                            color={ButtonColor.PURPLE}
                            onClick={(event) => handleSubmit(event)}
                        >
                            {isLoading && (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            )}
                            {isLoading && "Sending..."}
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
