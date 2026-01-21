"use client";

import NotificationBadge from "@/components/shared/NotificationBadge";
import { Bell, Search, LogOut } from "lucide-react";

interface AdminHeaderProps {
    userName: string;
    onLogout: () => void;
}

export default function AdminHeader({ userName, onLogout }: AdminHeaderProps) {
    return (
        <div className="bg-white border-b border-gray-200 px-8 py-1 flex items-center justify-between h-20">
            <div className="navbar-center hidden md:flex grow mx-4">
                <label className="input input-bordered flex items-center gap-2 w-full h-10 rounded-full focus-within:outline-none focus-within:ring-2 focus-within:ring-primary/20">
                    <Search className="w-4 h-4 opacity-70" />
                    <input
                        type="text"
                        className="grow text-sm"
                        placeholder="Search courses, users, transactions..."
                    />
                </label>
            </div>
            <div className="flex items-center space-x-4">
                <button className="relative text-black bg-[rgb(243,243,245)] hover:bg-gray-400 h-10 w-10 rounded-xl flex items-center justify-center">
                    <Bell />
                    <NotificationBadge
                        className="absolute right-0 top-0"
                        show={true}
                    />
                </button>
                <div className="flex items-center space-x-3 p-3 bg-white hover:bg-gray-100 rounded-lg cursor-pointer group">
                    <div className="w-10 h-10 bg-[rgb(99,102,241)] flex items-center justify-center text-white font-medium text-xl">
                        {userName.substring(0, 2).toUpperCase()}
                    </div>
                    <div className="text-xs">
                        <p className="font-medium text-gray-900 text-base">
                            {userName}
                        </p>
                        <p className="text-gray-500 text-xs">Super Admin</p>
                    </div>
                    <button
                        onClick={onLogout}
                        className="opacity-0 group-hover:opacity-100 text-gray-600 hover:text-red-600 p-1 rounded transition"
                        title="Logout"
                    >
                        <LogOut className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    );
}
