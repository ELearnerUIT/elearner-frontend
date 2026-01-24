"use client";

import { useParams, useRouter } from "next/navigation";
import { useQuery, useMutation } from "@tanstack/react-query";
import { coursePreviewService } from "@/services/courses/course-preview.service";
import { courseVersionService } from "@/services/courses/course-version.service";
import { paymentService } from "@/services/billing/payment.service";
import { enrollmentService } from "@/services/learning/enrollment.service";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import Image from "next/image";
import { Loader2, CreditCard, Shield, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import type { PaymentGateway } from "@/services/billing/billing.types";

export default function CheckoutPage() {
    const params = useParams();
    const slug = params?.slug as string;
    const router = useRouter();
    const { user, isAuthenticated } = useAuth();
    const [selectedGateway, setSelectedGateway] = useState<PaymentGateway>("VNPAY");

    // Fetch course details using slug
    const { data: course, isLoading: loadingCourse } = useQuery({
        queryKey: ["course-for-checkout", slug],
        queryFn: async () => {
            if (!slug) throw new Error("Course slug not found");
            return coursePreviewService.getCoursePreview(slug);
        },
        enabled: !!slug && isAuthenticated,
    });

    // Fetch published version to get courseVersionId
    const { data: publishedVersion, isLoading: loadingVersion } = useQuery({
        queryKey: ["published-version-for-checkout", slug],
        queryFn: async () => {
            if (!slug) throw new Error("Course slug not found");
            return courseVersionService.getPublishedVersionBySlug(slug);
        },
        enabled: !!slug && isAuthenticated,
    });

    // Check if course is free
    const isFree = !publishedVersion?.price || publishedVersion.price === 0;

    // Create payment mutation
    const createPaymentMutation = useMutation({
        mutationFn: async (gateway: PaymentGateway) => {
            if (!course?.id) {
                throw new Error("Course ID not found");
            }
            if (!publishedVersion?.id) {
                throw new Error("Course version ID not found");
            }
            if (!publishedVersion?.price) {
                throw new Error("Course price not found");
            }

            const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
            const returnUrl = `${baseUrl}/learner/payment/success?courseId=${course.id}&slug=${slug}`;
            const cancelUrl = `${baseUrl}/courses/${slug}`;
            // Callback URL is for gateway to POST to backend, not frontend
            // Backend will construct this automatically based on its own domain

            console.log("Creating payment with:", {
                courseId: course.id,
                courseVersionId: publishedVersion.id,
                amount: publishedVersion.price,
                gateway,
                returnUrl,
                cancelUrl,
            });

            return paymentService.createPayment({
                courseId: course.id,
                courseVersionId: publishedVersion.id,
                amount: publishedVersion.price,
                gateway: gateway,
                returnUrl: returnUrl,
                cancelUrl: cancelUrl,
            });
        },
        onSuccess: (data) => {
            toast.success("Redirecting to payment gateway...");
            // Redirect to payment URL
            window.location.href = data.paymentUrl;
        },
        onError: (error: any) => {
            console.error("Payment creation error:", error);
            toast.error(error.message || "Failed to create payment");
        },
    });

    const handlePayment = async () => {
        if (!isAuthenticated || !user) {
            toast.error("Please log in to continue");
            router.push(`/login?redirect=/learner/checkout/${slug}`);
            return;
        }

        if (user.role !== "STUDENT") {
            toast.error("Only students can enroll in courses");
            return;
        }

        // Check if course is free
        const isFree = !publishedVersion?.price || publishedVersion.price === 0;

        if (isFree) {
            // Handle free course enrollment
            if (!course?.id) {
                toast.error("Course ID not found");
                return;
            }

            try {
                await enrollmentService.enrollCourse(course.id, {
                    paymentTransactionId: 0,
                    notes: "Enrolled in free course",
                });
                toast.success("Successfully enrolled! Redirecting to course...");
                setTimeout(() => {
                    router.push(`/learner/learn/${slug}`);
                }, 1000);
            } catch (error: any) {
                console.error("Enrollment error:", error);
                toast.error(error.message || "Failed to enroll in course");
            }
        } else {
            // Handle paid course payment
            if (!selectedGateway) {
                toast.error("Please select a payment method");
                return;
            }

            createPaymentMutation.mutate(selectedGateway);
        }
    };

    if (!isAuthenticated) {
        router.push(`/login?redirect=/learner/checkout/${slug}`);
        return null;
    }

    if (loadingCourse || loadingVersion) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin" />
            </div>
        );
    }

    if (!course || !publishedVersion) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold mb-4">Course Not Found</h1>
                    <Link href="/explore" className="text-primary hover:underline">
                        Browse Courses
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen px-4 sm:px-6 md:px-10 xl:px-16 py-12">
            <div className="max-w-4xl mx-auto">
                {/* Back Button */}
                <Link
                    href={`/courses/${course?.slug || ''}`}
                    className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Back to Course
                </Link>

                <h1 className="text-3xl md:text-4xl font-bold mb-8">Checkout</h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Payment Method Selection */}
                    {!isFree && (
                        <div className="lg:col-span-2">
                            <div className="rounded-xl border border-white/20 bg-white/[0.03] p-6">
                                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                                    <CreditCard className="h-5 w-5" />
                                    Select Payment Method
                                </h2>

                                <div className="space-y-3">
                                    {/* VNPay */}
                                    <label
                                        className={`flex items-center gap-4 p-4 rounded-lg border-2 cursor-pointer transition ${selectedGateway === "VNPAY"
                                            ? "border-primary bg-primary/10"
                                            : "border-white/20 hover:border-white/40"
                                            }`}
                                    >
                                        <input
                                            type="radio"
                                            name="gateway"
                                            value="VNPAY"
                                            checked={selectedGateway === "VNPAY"}
                                            onChange={(e) => setSelectedGateway(e.target.value as PaymentGateway)}
                                            className="w-5 h-5"
                                        />
                                        <div className="flex-1">
                                            <div className="font-semibold">VNPay</div>
                                            <div className="text-sm text-muted-foreground">
                                                Pay with VNPay e-wallet or linked cards
                                            </div>
                                        </div>
                                        <div className="text-2xl">💳</div>
                                    </label>

                                    {/* ZaloPay */}
                                    <label
                                        className={`flex items-center gap-4 p-4 rounded-lg border-2 cursor-pointer transition ${selectedGateway === "ZALOPAY"
                                            ? "border-primary bg-primary/10"
                                            : "border-white/20 hover:border-white/40"
                                            }`}
                                    >
                                        <input
                                            type="radio"
                                            name="gateway"
                                            value="ZALOPAY"
                                            checked={selectedGateway === "ZALOPAY"}
                                            onChange={(e) => setSelectedGateway(e.target.value as PaymentGateway)}
                                            className="w-5 h-5"
                                        />
                                        <div className="flex-1">
                                            <div className="font-semibold">ZaloPay</div>
                                            <div className="text-sm text-muted-foreground">
                                                Pay with ZaloPay e-wallet
                                            </div>
                                        </div>
                                        <div className="text-2xl">💰</div>
                                    </label>

                                    {/* MoMo */}
                                    <label
                                        className={`flex items-center gap-4 p-4 rounded-lg border-2 cursor-pointer transition ${selectedGateway === "MOMO"
                                            ? "border-primary bg-primary/10"
                                            : "border-white/20 hover:border-white/40"
                                            }`}
                                    >
                                        <input
                                            type="radio"
                                            name="gateway"
                                            value="MOMO"
                                            checked={selectedGateway === "MOMO"}
                                            onChange={(e) => setSelectedGateway(e.target.value as PaymentGateway)}
                                            className="w-5 h-5"
                                        />
                                        <div className="flex-1">
                                            <div className="font-semibold">MoMo</div>
                                            <div className="text-sm text-muted-foreground">
                                                Pay with MoMo e-wallet
                                            </div>
                                        </div>
                                        <div className="text-2xl">📱</div>
                                    </label>
                                </div>

                                {/* Security Notice */}
                                <div className="mt-6 p-4 rounded-lg bg-white/[0.05] border border-white/10">
                                    <div className="flex items-start gap-3">
                                        <Shield className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                                        <div className="text-sm text-muted-foreground">
                                            <p className="font-semibold text-foreground mb-1">Secure Payment</p>
                                            <p>
                                                Your payment information is encrypted and secure. We do not store your payment details.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Order Summary */}
                    <div className={isFree ? "max-w-md mx-auto w-full lg:col-span-3" : "lg:col-span-1"}>
                        <div className="rounded-xl border border-white/20 bg-white/[0.03] p-6 sticky top-24">
                            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

                            {course && (
                                <>
                                    <div className="mb-4">
                                        <div className="relative aspect-video rounded-lg overflow-hidden mb-3">
                                            <Image
                                                src={course.thumbnailUrl || "/images/lesson_thum.png"}
                                                alt={course.title}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        <h3 className="font-semibold line-clamp-2">{course.title}</h3>
                                    </div>

                                    <div className="border-t border-white/10 pt-4 space-y-3">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-muted-foreground">Original Price</span>
                                            <span>
                                                {publishedVersion?.price
                                                    ? `${Math.floor(publishedVersion.price).toLocaleString('vi-VN')} ₫`
                                                    : "Free"}
                                            </span>
                                        </div>

                                        <div className="border-t border-white/10 pt-3 flex justify-between font-semibold text-lg">
                                            <span>Total</span>
                                            <span>
                                                {publishedVersion?.price
                                                    ? `${Math.floor(publishedVersion.price).toLocaleString('vi-VN')} ₫`
                                                    : "Free"}
                                            </span>
                                        </div>
                                    </div>

                                    <button
                                        onClick={handlePayment}
                                        disabled={createPaymentMutation.isPending}
                                        className="w-full mt-6 btn btn-primary neon flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {createPaymentMutation.isPending ? (
                                            <>
                                                <Loader2 className="h-4 w-4 animate-spin" />
                                                Processing...
                                            </>
                                        ) : isFree ? (
                                            "Enroll Now - It's Free"
                                        ) : (
                                            "Complete Payment"
                                        )}
                                    </button>
                                </>
                            )}

                            <p className="mt-4 text-xs text-muted-foreground text-center">
                                By completing this purchase, you agree to our Terms of Service and Privacy Policy.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
