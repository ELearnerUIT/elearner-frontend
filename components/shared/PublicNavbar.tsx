import Link from "next/link";
import { Hexagon, Search, ShoppingCart, LayoutGrid, Menu } from "lucide-react";

const PublicNavbar = () => {
    return (
        <div className="navbar px-10 bg-base-100 shadow-sm sticky top-0 z-50 h-16">
            <div className="navbar-start w-auto lg:w-1/4">
                <div className="dropdown">
                    <div
                        tabIndex={0}
                        role="button"
                        className="btn btn-ghost lg:hidden"
                    >
                        <Menu className="h-5 w-5" />
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
                    >
                        <li>
                            <Link href="/">Home</Link>
                        </li>
                        <li>
                            <Link href="/categories">Categories</Link>
                        </li>
                        <li>
                            <Link href="/instructor">Become an Instructor</Link>
                        </li>
                    </ul>
                </div>

                <Link
                    href="/"
                    className="btn btn-ghost text-xl text-primary gap-2 px-2"
                >
                    <Hexagon className="fill-current w-8 h-8" />
                    <span className="hidden sm:inline-block font-bold tracking-tight">
                        ELearner
                    </span>
                </Link>

                <div className="hidden lg:flex items-center ml-2">
                    <button className="btn btn-ghost font-normal gap-2">
                        <LayoutGrid className="w-4 h-4" />
                        Categories
                    </button>
                </div>
            </div>

            <div className="navbar-center hidden md:flex flex-grow max-w-xl mx-4">
                <label className="input input-bordered flex items-center gap-2 w-full h-10 rounded-full focus-within:outline-none focus-within:ring-2 focus-within:ring-primary/20">
                    <Search className="w-4 h-4 opacity-70" />
                    <input
                        type="text"
                        className="grow text-sm"
                        placeholder="Search for courses..."
                    />
                </label>
            </div>

            <div className="navbar-end flex-grow w-auto lg:w-1/4 gap-2">
                <button className="btn btn-ghost btn-circle md:hidden">
                    <Search className="w-5 h-5" />
                </button>

                <Link
                    href="/instructor"
                    className="hidden lg:flex items-center btn btn-ghost text-base font-medium normal-case px-4"
                >
                    Become an Instructor
                </Link>

                <Link href="/cart" className="btn btn-ghost btn-circle">
                    <div className="indicator">
                        <ShoppingCart className="w-5 h-5" />
                        <span className="badge badge-xs badge-primary indicator-item"></span>
                    </div>
                </Link>

                {/* Nút Login / Signup */}
                <div className="hidden sm:flex gap-2 ml-2">
                    <Link
                        href="/login"
                        className="btn btn-outline btn-primary btn-sm px-6"
                    >
                        Log In
                    </Link>
                    <Link
                        href="/register"
                        className="btn btn-primary btn-sm px-6 text-white"
                    >
                        Sign Up
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default PublicNavbar;
