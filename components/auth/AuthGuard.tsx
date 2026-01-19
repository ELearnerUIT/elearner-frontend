"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { isAuthenticated, getUser, User } from "@/lib/auth";
import { Loader2 } from "lucide-react";

interface AuthGuardProps {
    children: React.ReactNode;
    allowedRoles?: User["role"][];
}

export default function AuthGuard({
    children,
    allowedRoles = ["STUDENT"],
}: AuthGuardProps) {
    const router = useRouter();
    const [isChecking, setIsChecking] = useState(true);
    const [isAuthorized, setIsAuthorized] = useState(false);

    useEffect(() => {
        const checkAuth = () => {
            // Check if user is authenticated
            if (!isAuthenticated()) {
                router.replace("/login");
                return;
            }

            // Check if user has required role
            const user = getUser();
            if (!user || !allowedRoles.includes(user.role)) {
                // Redirect to login with error or show unauthorized
                router.replace("/login");
                return;
            }

            setIsAuthorized(true);
            setIsChecking(false);
        };

        checkAuth();
    }, [router, allowedRoles]);

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
