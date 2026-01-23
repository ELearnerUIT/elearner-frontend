"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { paymentService } from "@/services/billing/payment.service";
import { CheckCircle, XCircle, Loader2, ArrowRight } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

type PaymentResult = "success" | "failed" | "pending" | "verifying";

export default function PaymentCallbackPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [paymentResult, setPaymentResult] = useState<PaymentResult>("verifying");
    const [paymentDetails, setPaymentDetails] = useState<any>(null);

    // Verify payment mutation
    const verifyPaymentMutation = useMutation({
        mutationFn: async () => {
            // Convert search params to object
            const params: Record<string, string> = {};
            searchParams.forEach((value, key) => {
                params[key] = value;
            });

            console.log("Verifying payment with params:", params);
            return paymentService.verifyPayment(params);
        },
        onSuccess: (data) => {
            console.log("Payment verification response:", data);
            setPaymentDetails(data);

            if (data.status === "COMPLETED") {
                setPaymentResult("success");
                toast.success("Payment successful! Enrollment completed.");
            } else if (data.status === "FAILED") {
                setPaymentResult("failed");
                toast.error("Payment failed. Please try again.");
            } else if (data.status === "PENDING") {
                setPaymentResult("pending");
                toast.info("Payment is being processed...");
            }
        },
        onError: (error: any) => {
            console.error("Payment verification error:", error);
            setPaymentResult("failed");
            toast.error(error.message || "Failed to verify payment");
        },
    });

    useEffect(() => {
        // Automatically verify payment when component mounts
        if (searchParams.toString()) {
            verifyPaymentMutation.mutate();
        } else {
            // No params, likely accessed directly
            setPaymentResult("failed");
        }
    }, [searchParams]);

    const handleGoToCourse = () => {
        if (paymentDetails?.courseId) {
            router.push(`/learner/my-courses`);
        } else {
            router.push("/learner/dashboard");
        }
    };

    const handleTryAgain = () => {
        if (paymentDetails?.courseId) {
            router.push(`/learner/checkout/${paymentDetails.courseId}`);
        } else {
            router.push("/explore");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 md:px-10 xl:px-16 py-12">
            <div className="max-w-lg w-full">
                {paymentResult === "verifying" && (
                    <div className="text-center">
                        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/10 mb-6">
                            <Loader2 className="h-10 w-10 animate-spin text-primary" />
                        </div>
                        <h1 className="text-2xl md:text-3xl font-bold mb-3">
                            Verifying Payment...
                        </h1>
                        <p className="text-muted-foreground">
                            Please wait while we confirm your payment.
                        </p>
                    </div>
                )}

                {paymentResult === "success" && (
                    <div className="text-center">
                        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-500/20 mb-6">
                            <CheckCircle className="h-10 w-10 text-green-500" />
                        </div>
                        <h1 className="text-2xl md:text-3xl font-bold mb-3">
                            Payment Successful!
                        </h1>
                        <p className="text-muted-foreground mb-6">
                            Congratulations! You have successfully enrolled in the course.
                        </p>

                        {paymentDetails && (
                            <div className="rounded-xl border border-white/20 bg-white/[0.03] p-6 mb-6 text-left">
                                <h2 className="font-semibold mb-4">Payment Details</h2>
                                <div className="space-y-2 text-sm">
                                    {paymentDetails.courseTitle && (
                                        <div className="flex justify-between">
                                            <span className="text-muted-foreground">Course:</span>
                                            <span className="font-medium">{paymentDetails.courseTitle}</span>
                                        </div>
                                    )}
                                    {paymentDetails.amount && (
                                        <div className="flex justify-between">
                                            <span className="text-muted-foreground">Amount:</span>
                                            <span className="font-medium">
                                                {Math.floor(paymentDetails.amount).toLocaleString('vi-VN')} ₫
                                            </span>
                                        </div>
                                    )}
                                    {paymentDetails.transactionId && (
                                        <div className="flex justify-between">
                                            <span className="text-muted-foreground">Transaction ID:</span>
                                            <span className="font-mono text-xs">{paymentDetails.transactionId}</span>
                                        </div>
                                    )}
                                    {paymentDetails.gateway && (
                                        <div className="flex justify-between">
                                            <span className="text-muted-foreground">Payment Method:</span>
                                            <span className="font-medium">{paymentDetails.gateway}</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        <button
                            onClick={handleGoToCourse}
                            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3 rounded-lg transition flex items-center justify-center gap-2 mb-3"
                        >
                            Go to My Courses
                            <ArrowRight className="h-4 w-4" />
                        </button>

                        <Link
                            href="/explore"
                            className="block w-full text-center py-3 text-muted-foreground hover:text-foreground transition"
                        >
                            Explore More Courses
                        </Link>
                    </div>
                )}

                {paymentResult === "failed" && (
                    <div className="text-center">
                        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-red-500/20 mb-6">
                            <XCircle className="h-10 w-10 text-red-500" />
                        </div>
                        <h1 className="text-2xl md:text-3xl font-bold mb-3">
                            Payment Failed
                        </h1>
                        <p className="text-muted-foreground mb-6">
                            Unfortunately, your payment could not be processed. Please try again.
                        </p>

                        {paymentDetails?.errorMessage && (
                            <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-4 mb-6">
                                <p className="text-sm text-red-400">{paymentDetails.errorMessage}</p>
                            </div>
                        )}

                        <button
                            onClick={handleTryAgain}
                            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3 rounded-lg transition mb-3"
                        >
                            Try Again
                        </button>

                        <Link
                            href="/explore"
                            className="block w-full text-center py-3 text-muted-foreground hover:text-foreground transition"
                        >
                            Back to Courses
                        </Link>
                    </div>
                )}

                {paymentResult === "pending" && (
                    <div className="text-center">
                        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-yellow-500/20 mb-6">
                            <Loader2 className="h-10 w-10 text-yellow-500" />
                        </div>
                        <h1 className="text-2xl md:text-3xl font-bold mb-3">
                            Payment Pending
                        </h1>
                        <p className="text-muted-foreground mb-6">
                            Your payment is being processed. This may take a few moments.
                        </p>

                        <div className="rounded-xl border border-white/20 bg-white/[0.03] p-6 mb-6 text-left">
                            <p className="text-sm text-muted-foreground">
                                You will receive a confirmation email once your payment is confirmed.
                                You can check your enrollment status in your dashboard.
                            </p>
                        </div>

                        <Link
                            href="/learner/dashboard"
                            className="block w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3 rounded-lg transition text-center"
                        >
                            Go to Dashboard
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}
