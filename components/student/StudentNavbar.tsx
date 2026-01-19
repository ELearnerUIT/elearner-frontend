"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
    BookOpen,
    Search,
    Bell,
    User,
    Menu,
    TrendingUp,
    Award,
    Settings,
    HelpCircle,
    LogOut,
    ShoppingCart,
    Lightbulb,
} from "lucide-react";
import { clearAuthData, getUser } from "@/lib/auth";

const StudentNavbar = () => {
    const pathname = usePathname();
    const router = useRouter();
    const user = getUser();

    const navigation = [
        { name: "My Courses", href: "/my-courses", icon: BookOpen },
        { name: "My Progress", href: "/progress", icon: TrendingUp },
        { name: "Certificates", href: "/certificates", icon: Award },
        { name: "Recommendations", href: "/recommendations", icon: Lightbulb },
    ];

    const handleLogout = () => {
        clearAuthData();
        router.push("/login");
    };

    return (
        <div className="navbar px-4 lg:px-10 bg-base-100 shadow-sm sticky top-0 z-50 h-16">
            <div className="dropdown lg:hidden">
                <div tabIndex={0} role="button" className="btn btn-ghost">
                    <Menu className="h-5 w-5" />
                </div>
                <ul
                    tabIndex={0}
                    className="menu menu-sm dropdown-content mt-3 z-[60] p-2 shadow bg-base-100 rounded-box w-52"
                >
                    {navigation.map((item) => (
                        <li key={item.name}>
                            <Link
                                href={item.href}
                                className={
                                    pathname === item.href
                                        ? "bg-primary/10 text-primary"
                                        : ""
                                }
                            >
                                <item.icon className="h-4 w-4" />
                                {item.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>

            <Link
                href="/my-courses"
                className="btn btn-ghost text-xl text-primary gap-2 px-2"
            >
                <img src="/favicon.ico" className="h-10 w-10" alt="Logo" />
                <span className="hidden sm:inline-block font-bold tracking-tight">
                    ELearner
                </span>
            </Link>

            <nav className="hidden lg:flex items-center">
                {navigation.map((item) => (
                    <Link
                        key={item.name}
                        href={item.href}
                        className={`btn btn-ghost btn-sm font-normal gap-2 ${
                            pathname === item.href
                                ? "bg-primary/10 text-primary"
                                : ""
                        }`}
                    >
                        <item.icon className="w-4 h-4" />
                        {item.name}
                    </Link>
                ))}
            </nav>

            <div className="flex-1" />

            <div className="hidden lg:flex max-w-xs mr-2">
                <label className="input input-bordered input-sm flex items-center gap-2 w-full rounded-full focus-within:outline-none focus-within:ring-2 focus-within:ring-primary/20">
                    <Search className="w-4 h-4 opacity-70" />
                    <input
                        type="text"
                        className="grow text-sm"
                        placeholder="Search courses"
                    />
                </label>
            </div>

            <div className="flex items-center gap-1">
                <button className="btn btn-ghost btn-circle lg:hidden">
                    <Search className="w-5 h-5" />
                </button>

                <div className="dropdown dropdown-end">
                    <div
                        tabIndex={0}
                        role="button"
                        className="btn btn-ghost btn-circle"
                    >
                        <div className="indicator">
                            <Bell className="w-5 h-5" />
                            <span className="badge badge-xs badge-primary indicator-item">
                                3
                            </span>
                        </div>
                    </div>
                    <ul
                        tabIndex={0}
                        className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-80 mt-3 z-50"
                    >
                        <li className="menu-title">
                            <span>Notifications</span>
                        </li>
                        <li>
                            <a className="flex flex-col items-start">
                                <span className="font-medium">
                                    New course available
                                </span>
                                <span className="text-xs text-gray-500">
                                    2 hours ago
                                </span>
                            </a>
                        </li>
                        <li>
                            <a className="flex flex-col items-start">
                                <span className="font-medium">
                                    Assignment due soon
                                </span>
                                <span className="text-xs text-gray-500">
                                    5 hours ago
                                </span>
                            </a>
                        </li>
                        <li>
                            <a className="flex flex-col items-start">
                                <span className="font-medium">
                                    Certificate earned!
                                </span>
                                <span className="text-xs text-gray-500">
                                    1 day ago
                                </span>
                            </a>
                        </li>
                    </ul>
                </div>

                <Link
                    href="/shopping-cart"
                    className="btn btn-ghost btn-circle"
                >
                    <div className="indicator">
                        <ShoppingCart className="w-5 h-5" />
                        <span className="badge badge-xs badge-primary indicator-item"></span>
                    </div>
                </Link>

                <div className="dropdown dropdown-end">
                    <div
                        tabIndex={0}
                        role="button"
                        className="btn btn-ghost btn-circle avatar"
                    >
                        <div className="w-10 rounded-full">
                            {user?.avatarUrl ? (
                                <img
                                    src={user.avatarUrl}
                                    alt={user.fullName || user.username}
                                />
                            ) : (
                                <div className="bg-primary/10 w-full h-full flex items-center justify-center">
                                    <User className="w-5 h-5 text-primary" />
                                </div>
                            )}
                        </div>
                    </div>
                    <ul
                        tabIndex={0}
                        className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-56 mt-3 z-50"
                    >
                        {user && (
                            <li className="menu-title">
                                <span className="flex flex-col">
                                    <span className="font-medium">
                                        {user.fullName || user.username}
                                    </span>
                                    <span className="text-xs text-gray-500 font-normal">
                                        {user.email}
                                    </span>
                                </span>
                            </li>
                        )}
                        <li>
                            <Link href="/settings">
                                <Settings className="w-4 h-4" />
                                Account Settings
                            </Link>
                        </li>
                        <li>
                            <Link href="/shopping-cart">
                                <ShoppingCart className="w-4 h-4" />
                                Shopping Cart
                            </Link>
                        </li>
                        <div className="divider my-1"></div>
                        <li>
                            <a>
                                <HelpCircle className="w-4 h-4" />
                                Help & Support
                            </a>
                        </li>
                        <div className="divider my-1"></div>
                        <li>
                            <button
                                onClick={handleLogout}
                                className="text-error"
                            >
                                <LogOut className="w-4 h-4" />
                                Log Out
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default StudentNavbar;
