"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { isAuthenticated, getUser, User } from "@/lib/auth";
import { Loader2 } from "lucide-react";

interface AuthGuardProps {
    children: React.ReactNode;
    allowedRoles?: User["role"][];
    redirectTo?: string;
}

export default function AuthGuard({
    children,
    allowedRoles = ["STUDENT"],
    redirectTo = "/login",
}: AuthGuardProps) {
    const router = useRouter();
    const [isChecking, setIsChecking] = useState(true);
    const [isAuthorized, setIsAuthorized] = useState(false);

    useEffect(() => {
        const checkAuth = async () => {
            // Check if user is authenticated
            if (!isAuthenticated()) {
                setIsChecking(false);
                router.replace(redirectTo);
                return;
            }

            // Check if user has required role
            const user = getUser();
            if (!user || !allowedRoles.includes(user.role)) {
                // Redirect to appropriate login page
                setIsChecking(false);
                router.replace(redirectTo);
                return;
            }

            setIsAuthorized(true);
            setIsChecking(false);
        };

        checkAuth();
    }, [router, allowedRoles, redirectTo]);

    if (isChecking) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <Loader2 className="w-12 h-12 text-[rgb(99,102,241)] animate-spin" />
                    <p className="text-gray-600">Loading...</p>
                </div>
            </div>
        );
    }

    if (!isAuthorized) {
        return null;
    }

    return <>{children}</>;
}
