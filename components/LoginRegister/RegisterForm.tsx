'use client';
import { Eye, EyeClosed, Lock, Mail, User, TriangleAlertIcon, Check, TruckElectric } from "lucide-react";
import { FaGoogle, FaGithub } from "react-icons/fa";
import { useState } from "react";
import CustomInputField, { InputFieldIcon } from "@/components/shared/CustomInputField";

export default function RegisterForm() {

    const [firstNameInput, setFirstNameInput] = useState("");
    const [lastNameInput, setLastNameInput] = useState("");
    const [emailInput, setEmailInput] = useState("");
    const [passwordInput, setPasswordInput] = useState("");
    const [confirmPasswordInput, setConfirmPasswordInput] = useState("");

    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);

    const [agreeToTerms, setAgreeToTerms] = useState(false);

    const [errorMessage, setErrorMessage] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [confirmPasswordError, setConfirmPasswordError] = useState("");

    const showPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        setIsPasswordVisible(!isPasswordVisible);
    }

    const showConfirmPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        setIsConfirmPasswordVisible(!isConfirmPasswordVisible);
    }

    const validateRequiredFields = () => {
        if (!firstNameInput || !lastNameInput || !emailInput || !passwordInput || !confirmPasswordInput) {
            setErrorMessage("All fields are required");
            return false;
        }
        return true;
    }

    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setEmailError("Invalid email address");
            return false;
        }
        else {
            setEmailError("");
            return true;
        }

    }

    const validatePassword = (password: string) => {
        let passwordErrorMessages: Array<string> = [];
        if (password.length < 8) {
            passwordErrorMessages.push("8 characters");
        }
        if (!/[A-Z]/.test(password)) {
            passwordErrorMessages.push("one uppercase letter");
        }
        if (!/[0-9]/.test(password)) {
            passwordErrorMessages.push("one number");
        }
        if (!/[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(password)) {
            passwordErrorMessages.push("one special character");
        }

        if (passwordErrorMessages.length > 0) {
            let passwordErrorMessage = "Password must contain at least ";
            for (let i = 0; i < passwordErrorMessages.length; i++) {
                if (i > 0) {
                    if (i <= passwordErrorMessages.length - 2) {
                        passwordErrorMessage += ", ";
                    }
                    else {
                        passwordErrorMessage += " and ";
                    }
                }
                passwordErrorMessage += passwordErrorMessages[i];
            }
            passwordErrorMessage += ".";
            setPasswordError(passwordErrorMessage);
            return false;
        }
        setPasswordError("");
        return true;
    }

    const validConfirmPassword = (confirmPassword: string) => {
        if (confirmPassword !== passwordInput) {
            setConfirmPasswordError("Password does not match");
            return false;
        }
        setConfirmPasswordError("");
        return true;
    }


    const validateAgreeToTerms = () => {
        if (!agreeToTerms) {
            setErrorMessage("Please agree to the Terms of Service and Privacy Policy");
            return false;
        }
        return true;
    }

    const handleRegister = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();

        let isValid = true;

        if (!validateRequiredFields()) isValid = false;
        if (!validateEmail(emailInput)) isValid = false;
        if (!validatePassword(passwordInput)) isValid = false;
        if (!validConfirmPassword(confirmPasswordInput)) isValid = false;
        if (!validateAgreeToTerms()) isValid = false;

        if (!isValid) {
            return;
        }

        // Xu ly dang ky
        setErrorMessage("");
    }

    return (
        <div className="w-md">
            {/* Chữ phía trên */}
            <div className="text-center mb-8">
                <h1 className="text-4xl font-normal text-[rgb(99,102,241)] mb-2">ELearner</h1>
                <p className="text-gray-600">Start your learning journey today</p>
            </div>

            {/* Register Card */}
            <div className="bg-white rounded-lg shadow-lg p-8">
                {/* Title */}
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Create Your Account</h2>
                <p className="text-gray-600 mb-6">Join thousands of learners worldwide</p>

                {/* Form */}
                <form className="space-y-4">
                    {/* Error message*/}
                    {
                        errorMessage && errorMessage.length > 0 ?
                            <div className="text-red-500 flex items-center gap-2 flex-row">
                                <TriangleAlertIcon />
                                {errorMessage}
                            </div>
                            :
                            <></>
                    }

                    {/* Name Fields Row */}
                    <div className="grid grid-cols-2 gap-4">
                        {/* First Name Field */}
                        <CustomInputField
                            text="First Name"
                            icon={InputFieldIcon.USER}
                            initValue={firstNameInput}
                            placeholder="John"
                            onValueChange={(event: React.ChangeEvent<HTMLInputElement>) => setFirstNameInput(event.target.value)} />

                        {/* Last Name Field */}
                        <div>
                            <label className="block text-gray-700 font-medium mb-2">Last Name</label>
                            <div className="relative">
                                <User className="absolute left-3 top-3 text-gray-400" size={20} />
                                <input
                                    type="text"
                                    value={lastNameInput}
                                    onChange={(e) => setLastNameInput(e.target.value)}
                                    placeholder="Doe"
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Email Field */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-2">Email Address</label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-3 text-gray-400" size={20} />
                            <input
                                type="email"
                                value={emailInput}
                                onChange={(e) => { setEmailInput(e.target.value); validateEmail(e.target.value); }}
                                placeholder="your.email@example.com"
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        {
                            emailError && emailError.length > 0 ?
                                <p className="text-red-500 text-sm mt-1">{emailError}</p>
                                :
                                <></>
                        }
                    </div>

                    {/* Password Field */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-2">Password</label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-3 text-gray-400" size={20} />
                            <input
                                type={isPasswordVisible ? "text" : "password"}
                                value={passwordInput}
                                onChange={(e) => { setPasswordInput(e.target.value); validatePassword(e.target.value); }}
                                placeholder="Create a strong password"
                                className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <button
                                onClick={(event) => showPassword(event)}
                                className="absolute right-3 top-3 text-gray-400 cursor-pointer hover:text-gray-600"
                            >
                                {isPasswordVisible ?
                                    <EyeClosed size={20} />
                                    :
                                    <Eye size={20} />
                                }
                            </button>
                        </div>
                        {/* <p className="text-gray-500 text-sm mt-1">Must be at least 8 characters</p> */}
                        {
                            passwordError && passwordError.length > 0 ?
                                <p className="text-red-500 text-sm mt-1">{passwordError}</p>
                                :
                                <></>
                        }
                    </div>

                    {/* Confirm Password Field */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-2">Confirm Password</label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-3 text-gray-400" size={20} />
                            <input
                                type={isConfirmPasswordVisible ? "text" : "password"}
                                value={confirmPasswordInput}
                                onChange={(e) => { setConfirmPasswordInput(e.target.value); validConfirmPassword(e.target.value); }}
                                placeholder="Confirm your password"
                                className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <button
                                onClick={(event) => showConfirmPassword(event)}
                                className="absolute right-3 top-3 text-gray-400 cursor-pointer hover:text-gray-600"
                            >
                                {isConfirmPasswordVisible ?
                                    <EyeClosed size={20} />
                                    :
                                    <Eye size={20} />
                                }
                            </button>
                        </div>
                        {
                            confirmPasswordError && confirmPasswordError.length > 0 ?
                                <p className="text-red-500 text-sm mt-1">{confirmPasswordError}</p>
                                :
                                <></>
                        }
                    </div>

                    {/* Terms Agreement */}
                    <div className="flex items-center gap-2 mt-4">
                        <input
                            type="checkbox"
                            id="agreeTerms"
                            checked={agreeToTerms}
                            onChange={(e) => setAgreeToTerms(e.target.checked)}
                            className="w-4 h-4 rounded border-gray-300"
                        />
                        <label htmlFor="agreeTerms" className="text-gray-700 text-sm">
                            I agree to the <a href="#" className="text-blue-500 hover:text-blue-700">Terms of Service</a> and <a href="#" className="text-blue-500 hover:text-blue-700">Privacy Policy</a>
                        </label>
                    </div>

                    {/* Register Button */}
                    <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg flex justify-center gap-2 transition mt-6"
                        onClick={(event) => handleRegister(event)}>
                        Create Account
                        <span>→</span>
                    </button>
                </form>

                {/* Divider */}
                <div className="flex items-center my-6">
                    <div className="flex-1 border-t border-gray-300"></div>
                    <span className="px-3 text-gray-500 text-sm">Or sign up with</span>
                    <div className="flex-1 border-t border-gray-300"></div>
                </div>

                {/* Social Buttons */}
                <div className="grid grid-cols-2 gap-4">
                    <button className="w-full border border-gray-300 hover:bg-gray-50 text-gray-800 font-semibold py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition">
                        <FaGoogle size={20} />
                        Google
                    </button>
                    <button className="w-full border border-gray-300 hover:bg-gray-50 text-gray-800 font-semibold py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition">
                        <FaGithub size={20} />
                        GitHub
                    </button>
                </div>

                {/* Footer Links */}
                <div className="mt-6 text-center space-y-2">
                    <p className="text-gray-600 text-sm">
                        Already have an account? <a href="/login" className="text-blue-500 hover:text-blue-700 font-medium">Login</a>
                    </p>
                    <p className="text-blue-500 hover:text-blue-700 text-sm cursor-pointer">
                        Want to teach? Become an Instructor →
                    </p>
                </div>
            </div>
        </div>
    )
}