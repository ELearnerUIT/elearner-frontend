'use client';
import { Mail, TriangleAlertIcon } from "lucide-react";
import { FaGoogle } from "react-icons/fa";
import { useState } from "react";
import CustomPasswordField from "@/components/shared/CustomPasswordField";
import CustomInputField, { InputFieldIcon } from "../shared/CustomInputField";
import { CustomButton, ButtonColor } from "../shared/CustomButton";

export default function LoginForm() {

    const [emailInput, setEmailInput] = useState("");
    const [passwordInput, setPasswordInput] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const validateEmail = (email: string) => {
        if (!email) {
            setEmailError("Please enter your email address");
            return false;
        }
        else {
            setEmailError("");
            return true;
        }
    }

    const validatePassword = (password: string) => {
        if (!password || password.length === 0) {
            setPasswordError("Please enter your password");
            return false;
        }
        setPasswordError("");
        return true;
    }


    const handleLogin = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();

        let isValid = true;

        if (!validateEmail(emailInput)) isValid = false;
        if (!validatePassword(passwordInput)) isValid = false;

        if (!isValid) {
            return;
        }


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
                    <CustomInputField
                        text="Email Address"
                        icon={InputFieldIcon.MAIL}
                        initValue={emailInput}
                        placeholder="your.email@example.com"
                        errorMessage={emailError}
                        onValueChange={(event: React.ChangeEvent<HTMLInputElement>) => setEmailInput(event.target.value)}
                        onValidate={(event: React.ChangeEvent<HTMLInputElement>) => { validateEmail(event.target.value); }}
                    />

                    {/* Password Field */}
                    <CustomPasswordField
                        text="Password"
                        initValue={passwordInput}
                        placeholder="Enter your password"
                        errorMessage={passwordError}
                        onValueChange={(event: React.ChangeEvent<HTMLInputElement>) => setPasswordInput(event.target.value)}
                        onValidate={(event: React.ChangeEvent<HTMLInputElement>) => { validatePassword(event.target.value); }}
                    />
                    <a href="#" className="text-blue-500 hover:text-blue-700 text-sm">Forgot password?</a>

                    {/* Login Button */}
                    <div className="mt-6">
                        <CustomButton
                            text="Login →"
                            enabled={true}
                            color={ButtonColor.PURPLE}
                            onClick={(event) => handleLogin(event)}
                        />
                    </div>

                    {/* <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg flex justify-center gap-2 transition mt-6"
                        onClick={(event) => handleLogin(event)}>
                        Login
                        <span>→</span>
                    </button> */}
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