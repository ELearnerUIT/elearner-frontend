'use client';

import Dashboard from '@/components/admin/Dashboard';
import NotificationBadge from '@/components/shared/NotificationBadge';
import { DollarSign, GraduationCap, LayoutDashboard, Users, ChartColumn, Settings, Moon, Bell, Search } from 'lucide-react';
import { ReactNode, useState } from 'react';

export default function AdminDashboard() {
    type pageType = "dashboard" | "courses" | "users" | "finance" | "reports" | "settings"

    const [activeMenu, setActiveMenu] = useState<pageType>("dashboard");
    const [userName, setUserName] = useState("Admin User");
    const [userEmail, setUserEmail] = useState("admin@elearner.com");


    const menuItems: {
        id: pageType,
        label: string,
        icon: ReactNode
    }[] = [
            { id: "dashboard", label: 'Dashboard', icon: <LayoutDashboard /> },
            { id: "courses", label: 'Course Management', icon: <GraduationCap /> },
            { id: "users", label: 'User Management', icon: <Users /> },
            { id: "finance", label: 'Finance', icon: <DollarSign /> },
            { id: "reports", label: 'Reports', icon: <ChartColumn /> },
            { id: "settings", label: 'Settings', icon: <Settings /> }
        ];

    const renderPage = () => {
        switch (activeMenu) {
            case 'dashboard':
                return <Dashboard />;
            case 'courses':
                return <div>Courses</div>;
            case 'users':
                return <div>Users</div>;
            case 'finance':
                return <div>Finance</div>;
            case 'reports':
                return <div>Reports</div>;
            case 'settings':
                return <div>Settings</div>;
            default:
                return <div>Dashboard</div>;
        }
    }

    return (
        <div className="flex h-screen bg-gray-50">
            {/* Sidebar */}
            <div className="flex flex-col w-65 h-screen justify-between bg-white border-r border-[rgba(0,0,0,0.1)] shadow-md">
                {/* Logo */}
                <div className="flex items-center space-x-2 border-b border-[rgba(0,0,0,0.1)] px-6 h-20">
                    <div className="w-10 h-10 bg-[rgba(99,102,241)] rounded-xl flex items-center justify-center shadow-lg">
                        <GraduationCap className='text-white w-6 h-6' />
                    </div>
                    <div>
                        <p className="text-xl font-normal text-gray-900">ELearner</p>
                        <p className="text-xs text-[rgb(113,113,130)]">(Admin)</p>
                    </div>
                </div>

                {/* Menu Items */}
                <nav className="space-y-2 px-4 absolute top-20 bottom-20 my-6">
                    <div className="flex flex-col gap-2 overflow-y-scroll w-full max-h-full">
                        {menuItems.map((item, index) => (
                            <button
                                key={index}
                                onClick={() => setActiveMenu(item.id)}
                                className={`w-full flex items-center space-x-3 px-4 py-2.5 rounded-lg text-sm font-medium transition ${activeMenu === item.id
                                    ? 'bg-[rgba(99,102,241)] text-white'
                                    : 'text-black hover:bg-gray-100'
                                    }`}
                            >
                                <span>{item.icon}</span>
                                <span className="text-base font-normal">{item.label}</span>
                            </button>
                        ))}
                    </div>
                </nav>

                {/* User Profile */}
                <div className="border-t border-[rgba(0,0,0,0.1)] h-20">
                    <div className="flex items-center space-x-3 p-3 bg-white hover:bg-gray-100 rounded-lg">
                        <div className="w-10 h-10 bg-[rgb(99,102,241)] flex items-center justify-center text-white font-medium text-xl">
                            AD
                        </div>
                        <div className="text-xs">
                            <p className="font-medium text-gray-900 text-base">{userName}</p>
                            <p className="text-gray-500 text-xs">{userEmail}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 overflow-auto">
                {/* Top Header */}
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
                        <button className="text-black bg-[rgb(243,243,245)] hover:bg-gray-400 h-10 w-10 rounded-xl flex items-center justify-center">
                            <Moon />
                        </button>
                        <button className="relative text-black bg-[rgb(243,243,245)] hover:bg-gray-400 h-10 w-10 rounded-xl flex items-center justify-center">
                            <Bell />
                            <NotificationBadge className="absolute right-0 top-0" show={true} />
                        </button>
                        <div className="flex items-center space-x-3 p-3 bg-white hover:bg-gray-100 rounded-lg">
                            <div className="w-10 h-10 bg-[rgb(99,102,241)] flex items-center justify-center text-white font-medium text-xl">
                                AD
                            </div>
                            <div className="text-xs">
                                <p className="font-medium text-gray-900 text-base">{userName}</p>
                                <p className="text-gray-500 text-xs">Super Admin</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Page Content */}
                <div className="p-8">
                    {renderPage()}
                </div>
            </div>
        </div>
    );
}
