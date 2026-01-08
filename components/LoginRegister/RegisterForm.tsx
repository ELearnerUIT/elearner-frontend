'use client';
import { Eye, EyeClosed, Lock, Mail, User, TriangleAlertIcon, Check, TruckElectric } from "lucide-react";
import { FaGoogle, FaGithub } from "react-icons/fa";
import React, { useState } from "react";
import CustomInputField, { InputFieldIcon } from "@/components/shared/CustomInputField";
import CustomPasswordField from "@/components/shared/CustomPasswordField";


export default function RegisterForm() {

    const [firstNameInput, setFirstNameInput] = useState("");
    const [lastNameInput, setLastNameInput] = useState("");
    const [emailInput, setEmailInput] = useState("");
    const [passwordInput, setPasswordInput] = useState("");
    const [confirmPasswordInput, setConfirmPasswordInput] = useState("");

    const [agreeToTerms, setAgreeToTerms] = useState(false);

    const [errorMessage, setErrorMessage] = useState("");
    const [firstNameError, setFirstNameError] = useState("");
    const [lastNameError, setLastNameError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [confirmPasswordError, setConfirmPasswordError] = useState("");
    const [agreeToTermsError, setAgreeToTermsError] = useState("");

    const validateFirstName = (firstName: string) => {
        if (!firstName || firstName.length === 0) {
            setFirstNameError("Please enter your first name");
            return false;
        }
        setFirstNameError("");
        return true;
    }

    const validateLastName = (lastName: string) => {
        if (!lastName || lastName.length === 0) {
            setLastNameError("Please enter your last name");
            return false;
        }
        setLastNameError("");
        return true;
    }


    const validateEmail = (email: string) => {
        if (!email || email.length === 0) {
            setEmailError("Please enter your email address");
            return false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setEmailError("Invalid email address");
            return false;
        }

        setEmailError("");
        return true;
    }

    const validatePassword = (password: string) => {
        if (!password || password.length === 0) {
            setPasswordError("Please enter your password");
            return false;
        }


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
            // setErrorMessage("Please agree to the Terms of Service and Privacy Policy");
            setAgreeToTermsError("Please agree to the Terms of Service and Privacy Policy");
            return false;
        }
        setAgreeToTermsError("");
        return true;
    }

    const handleRegister = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();

        let isValid = true;

        // if (!validateRequiredFields()) isValid = false;
        if (!validateFirstName(firstNameInput)) isValid = false;
        if (!validateLastName(lastNameInput)) isValid = false;
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
                            errorMessage={firstNameError}
                            onValueChange={(event: React.ChangeEvent<HTMLInputElement>) => setFirstNameInput(event.target.value)}
                            onValidate={(event: React.ChangeEvent<HTMLInputElement>) => { validateFirstName(event.target.value); }}
                        />

                        {/* Last Name Field */}
                        <CustomInputField
                            text="Last Name"
                            icon={InputFieldIcon.USER}
                            initValue={lastNameInput}
                            placeholder="Doe"
                            errorMessage={lastNameError}
                            onValueChange={(event: React.ChangeEvent<HTMLInputElement>) => setLastNameInput(event.target.value)}
                            onValidate={(event: React.ChangeEvent<HTMLInputElement>) => { validateLastName(event.target.value); }}
                        />

                    </div>

                    {/* Email Field */}
                    <CustomInputField
                        text="Email Address"
                        icon={InputFieldIcon.MAIL}
                        initValue={emailInput}
                        placeholder="your.email@example.com"
                        errorMessage={emailError}
                        onValueChange={(event: React.ChangeEvent<HTMLInputElement>) => { setEmailInput(event.target.value); }}
                        onValidate={(event: React.ChangeEvent<HTMLInputElement>) => { validateEmail(event.target.value); }}
                    />

                    {/* Password Field */}
                    <CustomPasswordField
                        text="Password"
                        initValue={passwordInput}
                        placeholder="Create a strong password"
                        errorMessage={passwordError}
                        onValueChange={(event: React.ChangeEvent<HTMLInputElement>) => { setPasswordInput(event.target.value); }}
                        onValidate={(event: React.ChangeEvent<HTMLInputElement>) => { validatePassword(event.target.value); }}
                    />

                    {/* Confirm Password Field */}
                    <CustomPasswordField
                        text="Confirm Password"
                        initValue={confirmPasswordInput}
                        placeholder="Confirm your password"
                        errorMessage={confirmPasswordError}
                        onValueChange={(event: React.ChangeEvent<HTMLInputElement>) => { setConfirmPasswordInput(event.target.value); }}
                        onValidate={(event: React.ChangeEvent<HTMLInputElement>) => { validConfirmPassword(event.target.value); }}
                    />

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
                    {agreeToTermsError && agreeToTermsError.length > 0 ?
                        <p className="text-red-500 text-sm mt-1">{agreeToTermsError}</p>
                        :
                        <></>
                    }

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