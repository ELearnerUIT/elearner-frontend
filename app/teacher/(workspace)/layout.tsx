"use client";

import AuthGuard from "@/components/auth/AuthGuard";
import { useState, useEffect } from "react";
import { getUser, logout } from "@/lib/auth";
import { useRouter } from "next/navigation";

export default function TeacherWorkspaceLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();
    const [userName, setUserName] = useState("Teacher User");
    const [userEmail, setUserEmail] = useState("teacher@elearner.com");

    useEffect(() => {
        const user = getUser();
        if (user) {
            setUserName(user.fullName || user.username);
            setUserEmail(user.email);
        }
    }, []);

    const handleLogout = async () => {
        await logout();
        router.push("/login");
    };

    return (
        <AuthGuard allowedRoles={["TEACHER"]} redirectTo="/login">
            <div className="min-h-screen bg-gray-50">{children}</div>
        </AuthGuard>
    );
}
