"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";
import {
    CustomLinkButton,
    ButtonColor,
} from "@/components/shared/CustomButton";

type VerificationStatus = "loading" | "success" | "error";

export default function VerifyEmail() {
    const searchParams = useSearchParams();
    const token = searchParams.get("token");

    const [status, setStatus] = useState<VerificationStatus>("loading");
    const [message, setMessage] = useState("");

    useEffect(() => {
        const verifyEmail = async () => {
            if (!token) {
                setStatus("error");
                setMessage("Invalid verification link. Token is missing.");
                return;
            }

            try {
                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080"}/api/v1/auth/verify-email?token=${token}`,
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                        },
                    },
                );

                const data = await response.json();

                if (data.success) {
                    setStatus("success");
                    setMessage(
                        "Your email has been verified successfully! You can now login to your account.",
                    );
                } else {
                    setStatus("error");
                    setMessage(
                        data.message ||
                            "Email verification failed. Please try again or request a new verification link.",
                    );
                }
            } catch (error) {
                setStatus("error");
                setMessage(
                    "Unable to verify email. Please check your connection and try again.",
                );
            }
        };

        verifyEmail();
    }, [token]);

    return (
        <div className="min-h-screen bg-linear-to-br from-[rgba(99,102,241,0.05)] via-[rgba(139,92,246,0.05)] to-[rgba(16,185,129,0.05)] flex items-center justify-center p-5">
            <div className="w-md">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-normal text-[rgb(99,102,241)] mb-2">
                        ELearner
                    </h1>
                    <p className="text-gray-600">Email Verification</p>
                </div>

                <div className="bg-white rounded-lg shadow-lg p-8">
                    <div className="flex flex-col items-center text-center">
                        {status === "loading" && (
                            <>
                                <Loader2 className="w-16 h-16 text-[rgb(99,102,241)] animate-spin mb-4" />
                                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                                    Verifying Your Email
                                </h2>
                                <p className="text-gray-600">
                                    Please wait while we verify your email
                                    address...
                                </p>
                            </>
                        )}

                        {status === "success" && (
                            <>
                                <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
                                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                                    Email Verified!
                                </h2>
                                <p className="text-gray-600 mb-6">{message}</p>
                                <CustomLinkButton
                                    text="Go to Login"
                                    href="/login"
                                    color={ButtonColor.PURPLE}
                                />
                            </>
                        )}

                        {status === "error" && (
                            <>
                                <XCircle className="w-16 h-16 text-red-500 mb-4" />
                                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                                    Verification Failed
                                </h2>
                                <p className="text-gray-600 mb-6">{message}</p>
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
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
