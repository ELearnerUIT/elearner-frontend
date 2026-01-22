"use client";

import React from "react";
import {
    LayoutDashboard,
    BookOpen,
    Users,
    FileText,
    MessageCircle,
    Wallet,
    BarChart2,
} from "lucide-react";
import Link from "next/link";

export default function TeacherSidebar() {
    return (
        <aside className="w-64 bg-white border-r border-gray-200 hidden lg:flex flex-col fixed h-full z-10 left-0 top-0">
            <div className="h-16 flex items-center px-6 border-b border-gray-100">
                <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-white font-bold">E</span>
                </div>
                <div>
                    <h1 className="font-bold text-lg text-indigo-900 leading-none">
                        ELearner
                    </h1>
                    <span className="text-xs text-gray-500 font-medium">
                        Instructor Panel
                    </span>
                </div>
            </div>

            <nav className="p-4 space-y-1 overflow-y-auto flex-1">
                <NavItem
                    href="/dashboard"
                    icon={<LayoutDashboard />}
                    label="Dashboard"
                    active
                />
                <NavItem
                    href="/my-courses"
                    icon={<BookOpen />}
                    label="My Courses"
                />
                <NavItem href="/students" icon={<Users />} label="Students" />
                <NavItem
                    href="/assignments"
                    icon={<FileText />}
                    label="Assignments"
                />
                <NavItem href="/qa" icon={<MessageCircle />} label="Q&A" />
                <NavItem href="/payouts" icon={<Wallet />} label="Payouts" />
                <NavItem
                    href="/analytics"
                    icon={<BarChart2 />}
                    label="Analytics"
                />
            </nav>

            <div className="p-4 border-t border-gray-100">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
                        <div className="w-full h-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold">
                            S
                        </div>
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-900">
                            Sarah Jenkins
                        </p>
                        <p className="text-xs text-gray-500">
                            sarah@elearner.com
                        </p>
                    </div>
                </div>
            </div>
        </aside>
    );
}

interface NavItemProps {
    icon: React.ReactElement;
    label: string;
    active?: boolean;
    href: string;
}

const NavItem = ({ icon, label, active = false, href }: NavItemProps) => (
    <Link
        href={href}
        className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
            active
                ? "bg-indigo-50 text-indigo-700"
                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
        }`}
    >
        {React.cloneElement(icon as React.ReactElement<any>, {
            className: "w-5 h-5",
        })}
        {label}
    </Link>
);
