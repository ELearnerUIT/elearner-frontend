"use client";

import {
    DollarSign,
    GraduationCap,
    LayoutDashboard,
    Users,
    ChartColumn,
    Settings,
    LogOut,
} from "lucide-react";
import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

interface AdminSidebarProps {
    userName: string;
    userEmail: string;
    onLogout: () => void;
}

export default function AdminSidebar({
    userName,
    userEmail,
    onLogout,
}: AdminSidebarProps) {
    const pathname = usePathname();

    const menuItems: {
        href: string;
        label: string;
        icon: ReactNode;
    }[] = [
        {
            href: "/admin/dashboard",
            label: "Dashboard",
            icon: <LayoutDashboard />,
        },
        {
            href: "/admin/courses",
            label: "Course Management",
            icon: <GraduationCap />,
        },
        {
            href: "/admin/users",
            label: "User Management",
            icon: <Users />,
        },
        {
            href: "/admin/finance",
            label: "Finance",
            icon: <DollarSign />,
        },
        {
            href: "/admin/reports",
            label: "Reports",
            icon: <ChartColumn />,
        },
        {
            href: "/admin/settings",
            label: "Settings",
            icon: <Settings />,
        },
    ];

    return (
        <div className="flex flex-col w-65 h-screen justify-between bg-white border-r border-[rgba(0,0,0,0.1)] shadow-md">
            {/* Logo */}
            <div className="flex items-center space-x-2 border-b border-[rgba(0,0,0,0.1)] px-6 h-20">
                <div className="w-10 h-10 bg-[rgba(99,102,241)] rounded-xl flex items-center justify-center shadow-lg">
                    <GraduationCap className="text-white w-6 h-6" />
                </div>
                <div>
                    <p className="text-xl font-normal text-gray-900">
                        ELearner
                    </p>
                    <p className="text-xs text-[rgb(113,113,130)]">(Admin)</p>
                </div>
            </div>

            <nav className="space-y-2 px-4 absolute top-20 bottom-20 my-6">
                <div className="flex flex-col gap-2 overflow-y-scroll w-full max-h-full">
                    {menuItems.map((item, index) => (
                        <Link
                            key={index}
                            href={item.href}
                            className={`w-full flex items-center space-x-3 px-4 py-2.5 rounded-lg text-sm font-medium transition ${
                                pathname === item.href
                                    ? "bg-[rgba(99,102,241)] text-white"
                                    : "text-black hover:bg-gray-100"
                            }`}
                        >
                            <span>{item.icon}</span>
                            <span className="text-base font-normal">
                                {item.label}
                            </span>
                        </Link>
                    ))}
                </div>
            </nav>

            <div className="border-t border-[rgba(0,0,0,0.1)] h-20">
                <div className="flex items-center justify-between space-x-3 p-3 bg-white rounded-lg">
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-[rgb(99,102,241)] flex items-center justify-center text-white font-medium text-xl">
                            {userName.substring(0, 2).toUpperCase()}
                        </div>
                        <div className="text-xs">
                            <p className="font-medium text-gray-900 text-base">
                                {userName}
                            </p>
                            <p className="text-gray-500 text-xs">{userEmail}</p>
                        </div>
                    </div>
                    <button
                        onClick={onLogout}
                        className="text-gray-600 hover:text-red-600 hover:bg-red-50 p-2 rounded-lg transition"
                        title="Logout"
                    >
                        <LogOut className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
    );
}
