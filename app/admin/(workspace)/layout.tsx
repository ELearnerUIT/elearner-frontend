"use client";

import AuthGuard from "@/components/auth/AuthGuard";

export default function AdminWorkspaceLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <AuthGuard allowedRoles={["ADMIN"]} redirectTo="/login">{children}</AuthGuard>;
}
