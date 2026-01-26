"use client";

import { useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { CheckCircle, ArrowRight, BookOpen, Loader2 } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

function PaymentSuccessContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const courseId = searchParams.get("courseId");
    const slug = searchParams.get("slug");

    useEffect(() => {
        // Show success toast
        toast.success("Payment successful! You can now access the course.");
    }, []);

    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <div className="max-w-md w-full">
                <div className="text-center">
                    {/* Success Icon */}
                    <div className="mb-6 flex justify-center">
                        <div className="rounded-full bg-green-500/20 p-6">
                            <CheckCircle className="h-16 w-16 text-green-500" />
                        </div>
                    </div>

                    {/* Title */}
                    <h1 className="text-3xl font-bold mb-4">Payment Successful!</h1>

                    {/* Description */}
                    <p className="text-muted-foreground mb-8">
                        Your payment has been processed successfully. You are now enrolled in the course.
                    </p>

                    {/* Action Buttons */}
                    <div className="space-y-3">
                        {slug && (
                            <Link
                                href={`/learner/learn/${slug}`}
                                className="w-full inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3 px-6 rounded-lg transition"
                            >
                                <BookOpen className="h-5 w-5" />
                                Start Learning
                                <ArrowRight className="h-5 w-5" />
                            </Link>
                        )}

                        <Link
                            href="/learner/my-courses"
                            className="w-full inline-flex items-center justify-center gap-2 border border-white/20 hover:bg-white/5 font-semibold py-3 px-6 rounded-lg transition"
                        >
                            View My Courses
                        </Link>
                    </div>

                    {/* Additional Info */}
                    <div className="mt-8 p-4 rounded-lg bg-white/5 border border-white/10">
                        <p className="text-sm text-muted-foreground">
                            A confirmation email has been sent to your registered email address.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function PaymentSuccessPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="size-8 animate-spin text-[var(--brand-600)]" />
            </div>
        }>
            <PaymentSuccessContent />
        </Suspense>
    );
}
