"use client";
import { TriangleAlertIcon, Loader2, Mail } from "lucide-react";
import { FaGoogle, FaGithub } from "react-icons/fa";
import React, { useState } from "react";
import CustomInputField, {
    InputFieldIcon,
} from "@/components/shared/CustomInputField";
import CustomPasswordField from "@/components/shared/CustomPasswordField";
import {
    CustomButton,
    CustomLinkButton,
    ButtonColor,
} from "../shared/CustomButton";

export default function RegisterForm() {
    const [usernameInput, setUsernameInput] = useState("");
    const [emailInput, setEmailInput] = useState("");
    const [passwordInput, setPasswordInput] = useState("");
    const [confirmPasswordInput, setConfirmPasswordInput] = useState("");
    const [agreeToTerms, setAgreeToTerms] = useState(false);

    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [isResending, setIsResending] = useState(false);
    const [resendMessage, setResendMessage] = useState("");

    const [errorMessage, setErrorMessage] = useState("");
    const [usernameError, setUsernameError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [confirmPasswordError, setConfirmPasswordError] = useState("");
    const [agreeToTermsError, setAgreeToTermsError] = useState("");

    const validateUsername = (username: string) => {
        if (!username || username.length === 0) {
            setUsernameError("Please enter your username");
            return false;
        }
        if (username.length < 3) {
            setUsernameError("Username must be at least 3 characters");
            return false;
        }
        if (!/^[a-zA-Z0-9_]+$/.test(username)) {
            setUsernameError(
                "Username can only contain letters, numbers, and underscores",
            );
            return false;
        }
        setUsernameError("");
        return true;
    };

    const validateEmail = (email: string) => {
        if (!email || email.length === 0) {
            setEmailError("Please enter your email address");
            return false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setEmailError("Invalid email address");
            return false;
        }

        setEmailError("");
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

    const validateConfirmPassword = (confirmPassword: string) => {
        if (confirmPassword !== passwordInput) {
            setConfirmPasswordError("Password does not match");
            return false;
        }
        setConfirmPasswordError("");
        return true;
    };

    const validateAgreeToTerms = () => {
        if (!agreeToTerms) {
            setAgreeToTermsError(
                "Please agree to the Terms of Service and Privacy Policy",
            );
            return false;
        }
        setAgreeToTermsError("");
        return true;
    };

    const handleRegister = async (
        event: React.MouseEvent<HTMLButtonElement>,
    ) => {
        event.preventDefault();

        let isValid = true;

        if (!validateUsername(usernameInput)) isValid = false;
        if (!validateEmail(emailInput)) isValid = false;
        if (!validatePassword(passwordInput)) isValid = false;
        if (!validateConfirmPassword(confirmPasswordInput)) isValid = false;
        if (!validateAgreeToTerms()) isValid = false;

        if (!isValid) {
            return;
        }

        setIsLoading(true);
        setErrorMessage("");

        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080"}/api/v1/auth/register`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        username: usernameInput,
                        email: emailInput,
                        password: passwordInput,
                        role: "student",
                        langKey: "en",
                    }),
                },
            );

            const data = await response.json();

            if (data.success) {
                setIsSuccess(true);
            } else {
                setErrorMessage(
                    data.message || "Registration failed. Please try again.",
                );
            }
        } catch (error) {
            setErrorMessage(
                "Unable to connect to server. Please check your connection and try again.",
            );
        } finally {
            setIsLoading(false);
        }
    };

    const handleResendVerification = async () => {
        setIsResending(true);
        setResendMessage("");

        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080"}/api/v1/auth/resend-verification`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email: emailInput,
                    }),
                },
            );

            const data = await response.json();

            if (data.success) {
                setResendMessage("Verification email sent successfully!");
            } else {
                setResendMessage(
                    data.message || "Failed to resend. Please try again.",
                );
            }
        } catch (error) {
            setResendMessage("Unable to resend. Please check your connection.");
        } finally {
            setIsResending(false);
        }
    };

    if (isSuccess) {
        return (
            <div className="w-md">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-normal text-[rgb(99,102,241)] mb-2">
                        ELearner
                    </h1>
                    <p className="text-gray-600">Email Verification</p>
                </div>

                <div className="bg-white rounded-lg shadow-lg p-8">
                    <div className="flex flex-col items-center text-center">
                        <div className="w-16 h-16 bg-[rgba(99,102,241,0.1)] rounded-full flex items-center justify-center mb-4">
                            <Mail className="w-8 h-8 text-[rgb(99,102,241)]" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-800 mb-2">
                            Check Your Email
                        </h2>
                        <p className="text-gray-600 mb-2">
                            We&apos;ve sent a verification link to:
                        </p>
                        <p className="text-[rgb(99,102,241)] font-medium mb-4">
                            {emailInput}
                        </p>
                        <p className="text-gray-500 text-sm mb-4">
                            Click the link in the email to activate your
                            account. If you don&apos;t see it, check your spam
                            folder.
                        </p>

                        {resendMessage && (
                            <p
                                className={`text-sm mb-4 ${resendMessage.includes("successfully") ? "text-green-600" : "text-red-500"}`}
                            >
                                {resendMessage}
                            </p>
                        )}

                        <p className="text-gray-500 text-sm mb-6">
                            Didn&apos;t receive the email?{" "}
                            <button
                                type="button"
                                onClick={handleResendVerification}
                                disabled={isResending}
                                className="text-[rgb(99,102,241)] hover:underline font-medium disabled:opacity-50"
                            >
                                {isResending ? "Sending..." : "Resend"}
                            </button>
                        </p>

                        <div className="space-y-3 w-full">
                            <CustomLinkButton
                                text="Go to Login"
                                href="/login"
                                color={ButtonColor.PURPLE}
                            />
                            <CustomLinkButton
                                text="Back to Home"
                                href="/home"
                                color={ButtonColor.WHITE}
                            />
                        </div>
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
                    Start your learning journey today
                </p>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                    Create Your Account
                </h2>
                <p className="text-gray-600 mb-6">
                    Join thousands of learners worldwide
                </p>

                <form className="space-y-4">
                    {errorMessage && errorMessage.length > 0 && (
                        <div className="text-red-500 flex items-center gap-2 flex-row">
                            <TriangleAlertIcon className="w-5 h-5 flex-shrink-0" />
                            {errorMessage}
                        </div>
                    )}

                    <CustomInputField
                        text="Username"
                        icon={InputFieldIcon.USER}
                        initValue={usernameInput}
                        placeholder="johndoe"
                        errorMessage={usernameError}
                        onValueChange={(
                            event: React.ChangeEvent<HTMLInputElement>,
                        ) => setUsernameInput(event.target.value)}
                        onValidate={(
                            event: React.ChangeEvent<HTMLInputElement>,
                        ) => {
                            validateUsername(event.target.value);
                        }}
                    />

                    <CustomInputField
                        text="Email Address"
                        icon={InputFieldIcon.MAIL}
                        initValue={emailInput}
                        placeholder="your.email@example.com"
                        errorMessage={emailError}
                        onValueChange={(
                            event: React.ChangeEvent<HTMLInputElement>,
                        ) => {
                            setEmailInput(event.target.value);
                        }}
                        onValidate={(
                            event: React.ChangeEvent<HTMLInputElement>,
                        ) => {
                            validateEmail(event.target.value);
                        }}
                    />

                    <CustomPasswordField
                        text="Password"
                        initValue={passwordInput}
                        placeholder="Create a strong password"
                        errorMessage={passwordError}
                        onValueChange={(
                            event: React.ChangeEvent<HTMLInputElement>,
                        ) => {
                            setPasswordInput(event.target.value);
                        }}
                        onValidate={(
                            event: React.ChangeEvent<HTMLInputElement>,
                        ) => {
                            validatePassword(event.target.value);
                        }}
                    />

                    <CustomPasswordField
                        text="Confirm Password"
                        initValue={confirmPasswordInput}
                        placeholder="Confirm your password"
                        errorMessage={confirmPasswordError}
                        onValueChange={(
                            event: React.ChangeEvent<HTMLInputElement>,
                        ) => {
                            setConfirmPasswordInput(event.target.value);
                        }}
                        onValidate={(
                            event: React.ChangeEvent<HTMLInputElement>,
                        ) => {
                            validateConfirmPassword(event.target.value);
                        }}
                    />

                    <div className="flex items-center gap-2 mt-4">
                        <input
                            type="checkbox"
                            id="agreeTerms"
                            checked={agreeToTerms}
                            onChange={(e) => setAgreeToTerms(e.target.checked)}
                            className="w-4 h-4 rounded border-gray-300"
                        />
                        <label
                            htmlFor="agreeTerms"
                            className="text-gray-700 text-sm"
                        >
                            I agree to the{" "}
                            <a
                                href="#"
                                className="text-blue-500 hover:text-blue-700"
                            >
                                Terms of Service
                            </a>{" "}
                            and{" "}
                            <a
                                href="#"
                                className="text-blue-500 hover:text-blue-700"
                            >
                                Privacy Policy
                            </a>
                        </label>
                    </div>
                    {agreeToTermsError && agreeToTermsError.length > 0 ? (
                        <p className="text-red-500 text-sm mt-1">
                            {agreeToTermsError}
                        </p>
                    ) : (
                        <></>
                    )}

                    <div className="mt-6">
                        <CustomButton
                            text={isLoading ? "" : "Create Account →"}
                            enabled={!isLoading}
                            color={ButtonColor.PURPLE}
                            onClick={(event) => handleRegister(event)}
                        >
                            {isLoading && (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            )}
                            {isLoading && "Creating Account..."}
                        </CustomButton>
                    </div>
                </form>

                <div className="mt-6 text-center space-y-2">
                    <p className="text-gray-600 text-sm">
                        Already have an account?{" "}
                        <a
                            href="/login"
                            className="text-blue-500 hover:text-blue-700 font-medium"
                        >
                            Login
                        </a>
                    </p>
                    <p className="text-blue-500 hover:text-blue-700 text-sm cursor-pointer">
                        Want to teach? Become an Instructor →
                    </p>
                </div>
            </div>
        </div>
    );
}
