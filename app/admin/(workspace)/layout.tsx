"use client";

import AuthGuard from "@/components/auth/AuthGuard";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";
import { useState, useEffect } from "react";
import { getUser, logout } from "@/lib/auth";
import { useRouter } from "next/navigation";

export default function AdminWorkspaceLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();
    const [userName, setUserName] = useState("Admin User");
    const [userEmail, setUserEmail] = useState("admin@elearner.com");

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
        <AuthGuard allowedRoles={["ADMIN"]} redirectTo="/login">
            <div className="flex h-screen bg-gray-50">
                <AdminSidebar
                    userName={userName}
                    userEmail={userEmail}
                    onLogout={handleLogout}
                />

                <div className="flex-1 overflow-auto">
                    <AdminHeader userName={userName} onLogout={handleLogout} />
                    <div className="p-8">{children}</div>
                </div>
            </div>
        </AuthGuard>
    );
}
