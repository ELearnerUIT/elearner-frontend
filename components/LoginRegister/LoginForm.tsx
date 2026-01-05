'use client';
import { Eye, EyeClosed, Lock, Mail, TriangleAlertIcon } from "lucide-react";
import { FaGoogle } from "react-icons/fa";
import { useState } from "react";

export default function LoginForm() {

    const [emailInput, setEmailInput] = useState("");
    const [passwordInput, setPasswordInput] = useState("");
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const showPassword = (event) => {
        event.preventDefault();

        isPasswordVisible === true ? setIsPasswordVisible(false) : setIsPasswordVisible(true);
    }

    const handleLogin = (event) => {
        event.preventDefault();

        // Xu ly dang nhap

        setErrorMessage("Wrong email or password. Please try again.");
    }

    return (
        <div className="w-md">
            {/* Chữ phía trên */}
            <div className="text-center mb-8">
                <h1 className="text-4xl font-normal text-[rgb(99,102,241)] mb-2">ELearner</h1>
                <p className="text-gray-600">Welcome back! Please login to continue</p>
            </div>

            {/* Login Card */}
            <div className="bg-white rounded-lg shadow-lg p-8">
                {/* Title */}
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Login to Your Account</h2>
                <p className="text-gray-600 mb-6">Enter your credentials to access your courses</p>

                {/* Form */}
                <form className="space-y-4">
                    {/* Error message*/}
                    {
                        errorMessage && errorMessage.length > 0 ?
                            <div className=" text-red-500 flex items-center gap-2 flex-row">
                                <TriangleAlertIcon />
                                {errorMessage}
                            </div>
                            :
                            <></>
                    }
                    {/* Email Field */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-2">Email Address</label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-3 text-gray-400" size={20} />
                            <input
                                type="email"
                                value={emailInput}
                                onChange={(e) => setEmailInput(e.target.value)}
                                placeholder="your.email@example.com"
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>

                    {/* Password Field */}
                    <div>
                        <div className="flex justify-between items-center mb-2">
                            <label className="block text-gray-700 font-medium">Password</label>
                            <a href="#" className="text-blue-500 hover:text-blue-700 text-sm">Forgot password?</a>
                        </div>
                        <div className="relative">
                            <Lock className="absolute left-3 top-3 text-gray-400" size={20} />
                            <input
                                id="passwordField"
                                type={isPasswordVisible === true ? "text" : "password"}
                                value={passwordInput}
                                onChange={(e) => setPasswordInput(e.target.value)}
                                placeholder="Enter your password"
                                className="w-full pl-10 pr-0 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <button
                                onClick={(event) => showPassword(event)}>
                                {isPasswordVisible === false ?
                                    <Eye
                                        className="absolute right-3 top-3 text-gray-400 cursor-pointer"
                                        size={20}
                                    />
                                    :
                                    <EyeClosed
                                        className="absolute right-3 top-3 text-gray-400 cursor-pointer"
                                        size={20}
                                    />
                                }
                            </button>

                        </div>
                    </div>

                    {/* Login Button */}
                    <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg flex justify-center gap-2 transition mt-6"
                        onClick={(event) => handleLogin(event)}>
                        Login
                        <span>→</span>
                    </button>
                </form>

                {/* Divider */}
                <div className="flex items-center my-6">
                    <div className="flex-1 border-t border-gray-300"></div>
                    <span className="px-3 text-gray-500 text-sm">Or continue with</span>
                    <div className="flex-1 border-t border-gray-300"></div>
                </div>

                {/* Google Button */}
                <button className="w-full border border-gray-300 hover:bg-gray-50 text-gray-800 font-semibold py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition">
                    {/* <span className="text-xl">Continue with</span> */}
                    <FaGoogle size={20} />
                    Continue with Google
                </button>

                {/* Footer Links */}
                <div className="mt-6 text-center space-y-2">
                    <p className="text-gray-600 text-sm">
                        Don't have an account? <a href="/register" className="text-blue-500 hover:text-blue-700 font-medium">Sign up</a>
                    </p>
                    <p className="text-blue-500 hover:text-blue-700 text-sm cursor-pointer">
                        Want to teach? Become an instructor →
                    </p>
                </div>
            </div>
        </div>
    )
}