"use client";

import type { NextPage } from "next";
import React, { useState } from "react";
import {
    TriangleAlertIcon,
    Loader2,
    Users,
    Share2,
    DollarSign,
    TrendingUp,
    Briefcase,
    User,
    AlignLeft,
} from "lucide-react";
import { useRegister } from "@/lib/hooks";
import { useRouter } from "next/navigation";
import CustomInputField, {
    InputFieldIcon,
} from "@/components/shared/CustomInputField";
import CustomPasswordField from "@/components/shared/CustomPasswordField";
import { ButtonColor, CustomButton } from "@/components/shared/CustomButton";
import { validateNewPassword } from "@/utils/validatePasswordUtils";

const SignUp: NextPage = () => {
    const router = useRouter();
    const { mutate: register, isPending } = useRegister();
    
    const [username, setUsername] = useState("");
    const [emailInput, setEmailInput] = useState("");
    const [passwordInput, setPasswordInput] = useState("");
    const [confirmPasswordInput, setConfirmPasswordInput] = useState("");
    const [agreeToTerms, setAgreeToTerms] = useState(false);

    const [errorMessage, setErrorMessage] = useState("");

    const [errors, setErrors] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        terms: "",
    });

    const validateForm = () => {
        let isValid = true;
        const newErrors = { ...errors };

        if (!username.trim()) {
            newErrors.username = "Username is required";
            isValid = false;
        } else newErrors.username = "";

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailInput || !emailRegex.test(emailInput)) {
            newErrors.email = "Invalid email address";
            isValid = false;
        } else newErrors.email = "";

        const passwordValidation = validateNewPassword(passwordInput);
        if (!passwordValidation.isValid) {
            newErrors.password = passwordValidation.errorMessage;
            isValid = false;
        } else newErrors.password = "";

        if (confirmPasswordInput !== passwordInput) {
            newErrors.confirmPassword = "Passwords do not match";
            isValid = false;
        } else newErrors.confirmPassword = "";

        if (!agreeToTerms) {
            newErrors.terms = "You must agree to the terms";
            isValid = false;
        } else newErrors.terms = "";

        setErrors(newErrors);
        return isValid;
    };

    const handleRegister = async (
        event: React.MouseEvent<HTMLButtonElement>,
    ) => {
        event.preventDefault();
        if (!validateForm()) return;

        setErrorMessage("");

        register(
            {
                username,
                email: emailInput,
                password: passwordInput,
                role: "TEACHER",
                langKey: "en",
            },
            {
                onSuccess: () => {
                    router.push("/teacher/verify-email");
                },
                onError: (error) => {
                    setErrorMessage(error.message || "Registration failed.");
                },
            },
        );
    };

    return (
        <div className="min-h-screen w-full flex flex-col lg:flex-row bg-gray-50 font-arimo">
            <div className="lg:w-1/2 w-full relative overflow-hidden bg-gradient-to-br from-indigo-50 to-purple-50 p-8 lg:p-16 flex flex-col justify-center">
                <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(135deg,_rgba(139,_92,_246,_0.1),_rgba(99,_102,_241,_0.05)_50%,_rgba(16,_185,_129,_0.05))] pointer-events-none" />

                <div className="relative z-10 max-w-xl mx-auto lg:mx-0">
                    <div className="mb-8">
                        <div className="inline-block px-3 py-1 mb-4 bg-indigo-100 text-indigo-700 rounded-full text-sm font-semibold tracking-wide uppercase">
                            ELearner
                        </div>
                        <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
                            Become an{" "}
                            <span className="text-indigo-600">Instructor</span>
                        </h1>
                        <p className="text-xl text-gray-600 leading-relaxed">
                            Share your knowledge and inspire millions of
                            students worldwide. Join our community of experts.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
                        <FeatureItem
                            icon={<Users className="w-8 h-8 text-indigo-600" />}
                            title="Reach Students"
                            desc="Teach millions globally"
                        />
                        <FeatureItem
                            icon={
                                <Share2 className="w-8 h-8 text-purple-600" />
                            }
                            title="Share Knowledge"
                            desc="Create impactful courses"
                        />
                        <FeatureItem
                            icon={
                                <DollarSign className="w-8 h-8 text-green-600" />
                            }
                            title="Earn Money"
                            desc="Get paid for your expertise"
                        />
                        <FeatureItem
                            icon={
                                <TrendingUp className="w-8 h-8 text-blue-600" />
                            }
                            title="Grow Career"
                            desc="Build your personal brand"
                        />
                    </div>
                </div>
            </div>

            <div className="lg:w-1/2 w-full flex items-center justify-center p-4 py-12 lg:p-8 bg-white">
                <div className="w-full max-w-md space-y-8">
                    <div className="text-center lg:text-left">
                        <h2 className="text-2xl font-bold text-gray-900">
                            Get Started as an Instructor
                        </h2>
                        <p className="mt-2 text-sm text-gray-600">
                            Create your account. You'll fill in your teaching
                            details after verification.
                        </p>
                    </div>

                    {errorMessage && (
                        <div className="p-3 rounded-lg bg-red-50 text-red-600 text-sm flex items-center gap-2">
                            <TriangleAlertIcon className="w-4 h-4" />
                            {errorMessage}
                        </div>
                    )}

                    <form className="space-y-5">
                        <CustomInputField
                            text="Username"
                            icon={InputFieldIcon.USER}
                            initValue={username}
                            placeholder="johndoe"
                            errorMessage={errors.username}
                            onValueChange={(e) => setUsername(e.target.value)}
                        />

                        <CustomInputField
                            text="Email Address"
                            icon={InputFieldIcon.MAIL}
                            initValue={emailInput}
                            placeholder="your.email@example.com"
                            errorMessage={errors.email}
                            onValueChange={(e) => setEmailInput(e.target.value)}
                        />

                        <CustomPasswordField
                            text="Password"
                            initValue={passwordInput}
                            placeholder="Create a strong password"
                            errorMessage={errors.password}
                            onValueChange={(e) =>
                                setPasswordInput(e.target.value)
                            }
                        />

                        <CustomPasswordField
                            text="Confirm Password"
                            initValue={confirmPasswordInput}
                            placeholder="Confirm your password"
                            errorMessage={errors.confirmPassword}
                            onValueChange={(e) =>
                                setConfirmPasswordInput(e.target.value)
                            }
                        />

                        <div className="flex items-start gap-3 mt-2">
                            <input
                                type="checkbox"
                                id="agreeTerms"
                                checked={agreeToTerms}
                                onChange={(e) =>
                                    setAgreeToTerms(e.target.checked)
                                }
                                className="mt-1 w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                            />
                            <div className="text-sm text-gray-600 leading-snug">
                                <label htmlFor="agreeTerms">
                                    I agree to the Instructor{" "}
                                </label>
                                <a
                                    href="#"
                                    className="text-indigo-600 hover:text-indigo-800 font-medium"
                                >
                                    Terms of Service
                                </a>{" "}
                                and{" "}
                                <a
                                    href="#"
                                    className="text-indigo-600 hover:text-indigo-800 font-medium"
                                >
                                    Privacy Policy
                                </a>
                            </div>
                        </div>
                        {errors.terms && (
                            <p className="text-xs text-red-500 mt-1">
                                {errors.terms}
                            </p>
                        )}

                        <div className="pt-2">
                            <CustomButton
                                text={isPending ? "" : "Create Account"}
                                enabled={!isPending}
                                color={ButtonColor.PURPLE}
                                onClick={handleRegister}
                            >
                                {isPending && (
                                    <Loader2 className="w-5 h-5 animate-spin mx-auto" />
                                )}
                            </CustomButton>
                        </div>
                    </form>

                    <div className="text-center text-sm text-gray-500">
                        Already have an account?{" "}
                        <a
                            href="/login"
                            className="text-indigo-600 font-medium hover:underline"
                        >
                            Login here
                        </a>
                    </div>

                    <div className="text-center text-sm text-gray-500">
                        Just want to learn?{" "}
                        <a
                            href="/register"
                            className="text-indigo-600 font-medium hover:underline"
                        >
                            Sign up as a Student
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

const FeatureItem = ({
    icon,
    title,
    desc,
}: {
    icon: React.ReactNode;
    title: string;
    desc: string;
}) => (
    <div className="flex items-start gap-4">
        <div className="p-3 bg-white rounded-xl shadow-sm">{icon}</div>
        <div>
            <h3 className="font-semibold text-gray-900">{title}</h3>
            <p className="text-sm text-gray-500">{desc}</p>
        </div>
    </div>
);

export default SignUp;
