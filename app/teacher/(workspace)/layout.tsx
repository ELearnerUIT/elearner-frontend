"use client";

import AuthGuard from "@/components/auth/AuthGuard";
import { useState, useEffect } from "react";
import { getUser, logout, getAccessToken } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { Loader2, AlertTriangle, CheckCircle } from "lucide-react";
import { apiRequest, ApiResponse } from "@/lib/api";

interface UserInfo {
    accountId: number;
    username: string;
    email: string;
    fullName: string;
    status: "PENDING_APPROVAL" | "ACTIVE" | "SUSPENDED" | "PENDING_EMAIL";
    avatarUrl: string;
    role: string;
    birthday: string | null;
    bio: string | null;
    gender: string | null;
    lastLoginAt: string;
}

export default function TeacherWorkspaceLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();
    const [userName, setUserName] = useState("Teacher User");
    const [userEmail, setUserEmail] = useState("teacher@elearner.com");
    const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const token = getAccessToken();
                const response: ApiResponse<UserInfo> = await apiRequest(
                    `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080"}/api/v1/auth/me`,
                    {
                        method: "GET",
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    },
                );

                if (response.success && response.data) {
                    setUserInfo(response.data);
                    setUserName(
                        response.data.fullName || response.data.username,
                    );
                    setUserEmail(response.data.email);
                }
            } catch (error) {
                console.error("Error fetching user info:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchUserInfo();
    }, []);

    const handleLogout = async () => {
        await logout();
        router.push("/login");
    };

    if (isLoading) {
        return (
            <AuthGuard allowedRoles={["TEACHER"]} redirectTo="/login">
                <div className="min-h-screen flex items-center justify-center bg-gray-50">
                    <div className="flex flex-col items-center gap-4">
                        <Loader2 className="w-12 h-12 text-indigo-600 animate-spin" />
                        <p className="text-gray-600">Loading your account...</p>
                    </div>
                </div>
            </AuthGuard>
        );
    }

    if (userInfo?.status === "SUSPENDED") {
        return (
            <AuthGuard allowedRoles={["TEACHER"]} redirectTo="/teacher/login">
                <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
                    <div className="max-w-md w-full bg-white rounded-lg shadow-xl p-8">
                        <div className="flex flex-col items-center text-center">
                            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                                <AlertTriangle className="w-8 h-8 text-red-600" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-2">
                                Account Suspended
                            </h2>
                            <p className="text-gray-600 mb-6">
                                Your account has been suspended. Please contact
                                support for more information.
                            </p>
                            <button
                                onClick={handleLogout}
                                className="w-full px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-medium"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </AuthGuard>
        );
    }

    if (userInfo?.status === "PENDING_APPROVAL") {
        router.push("/complete-profile");
        return (
            <AuthGuard allowedRoles={["TEACHER"]} redirectTo="/teacher/login">
                <div className="min-h-screen flex items-center justify-center bg-gray-50">
                    <div className="flex flex-col items-center gap-4">
                        <Loader2 className="w-12 h-12 text-indigo-600 animate-spin" />
                        <p className="text-gray-600">
                            Redirecting to profile setup...
                        </p>
                    </div>
                </div>
            </AuthGuard>
        );
    }

    return (
        <AuthGuard allowedRoles={["TEACHER"]} redirectTo="/login">
            <div className="min-h-screen bg-gray-50">{children}</div>
        </AuthGuard>
    );
}
