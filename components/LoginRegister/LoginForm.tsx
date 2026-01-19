"use client";
import { TriangleAlertIcon, Loader2 } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import CustomPasswordField from "@/components/shared/CustomPasswordField";
import CustomInputField, { InputFieldIcon } from "../shared/CustomInputField";
import { CustomButton, ButtonColor } from "../shared/CustomButton";
import { setAuthData, AuthData } from "@/lib/auth";

export default function LoginForm() {
    const router = useRouter();

    const [loginInput, setLoginInput] = useState("");
    const [passwordInput, setPasswordInput] = useState("");
    const [loginError, setLoginError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const validateLogin = (login: string) => {
        if (!login) {
            setLoginError("Please enter your username or email");
            return false;
        }
        setLoginError("");
        return true;
    };

    const validatePassword = (password: string) => {
        if (!password || password.length === 0) {
            setPasswordError("Please enter your password");
            return false;
        }
        setPasswordError("");
        return true;
    };

    const handleLogin = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();

        let isValid = true;

        if (!validateLogin(loginInput)) isValid = false;
        if (!validatePassword(passwordInput)) isValid = false;

        if (!isValid) {
            return;
        }

        setIsLoading(true);
        setErrorMessage("");

        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080"}/api/v1/auth/login`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        login: loginInput,
                        password: passwordInput,
                    }),
                },
            );

            const data = await response.json();

            if (data.success) {
                const authData: AuthData = data.data;

                if (authData.user.role !== "STUDENT") {
                    setErrorMessage(
                        "This login is for students only. Please use the appropriate login page for your role.",
                    );
                    return;
                }

                setAuthData(authData);

                router.push("/my-courses");
            } else {
                setErrorMessage(
                    data.message ||
                        "Wrong email or password. Please try again.",
                );
            }
        } catch (error) {
            setErrorMessage(
                "Unable to connect to server. Please check your connection and try again.",
            );
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-md">
            <div className="text-center mb-8">
                <h1 className="text-4xl font-normal text-[rgb(99,102,241)] mb-2">
                    ELearner
                </h1>
                <p className="text-gray-600">
                    Welcome back! Please login to continue
                </p>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                    Login to Your Account
                </h2>
                <p className="text-gray-600 mb-6">
                    Enter your credentials to access your courses
                </p>

                <form className="space-y-4">
                    {errorMessage && errorMessage.length > 0 && (
                        <div className="text-red-500 flex items-center gap-2 flex-row">
                            <TriangleAlertIcon className="w-5 h-5 flex-shrink-0" />
                            {errorMessage}
                        </div>
                    )}

                    <CustomInputField
                        text="Username or Email"
                        icon={InputFieldIcon.MAIL}
                        initValue={loginInput}
                        placeholder="your.email@example.com"
                        errorMessage={loginError}
                        onValueChange={(
                            event: React.ChangeEvent<HTMLInputElement>,
                        ) => setLoginInput(event.target.value)}
                        onValidate={(
                            event: React.ChangeEvent<HTMLInputElement>,
                        ) => {
                            validateLogin(event.target.value);
                        }}
                    />

                    <CustomPasswordField
                        text="Password"
                        initValue={passwordInput}
                        placeholder="Enter your password"
                        errorMessage={passwordError}
                        onValueChange={(
                            event: React.ChangeEvent<HTMLInputElement>,
                        ) => setPasswordInput(event.target.value)}
                        onValidate={(
                            event: React.ChangeEvent<HTMLInputElement>,
                        ) => {
                            validatePassword(event.target.value);
                        }}
                    />
                    <a
                        href="#"
                        className="text-blue-500 hover:text-blue-700 text-sm"
                    >
                        Forgot password?
                    </a>

                    <div className="mt-6">
                        <CustomButton
                            text={isLoading ? "" : "Login →"}
                            enabled={!isLoading}
                            color={ButtonColor.PURPLE}
                            onClick={(event) => handleLogin(event)}
                        >
                            {isLoading && (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            )}
                            {isLoading && "Logging in..."}
                        </CustomButton>
                    </div>
                </form>

                <div className="mt-6 text-center space-y-2">
                    <p className="text-gray-600 text-sm">
                        Don&apos;t have an account?{" "}
                        <a
                            href="/register"
                            className="text-blue-500 hover:text-blue-700 font-medium"
                        >
                            Sign up
                        </a>
                    </p>
                    <p className="text-blue-500 hover:text-blue-700 text-sm cursor-pointer">
                        Want to teach? Become an instructor →
                    </p>
                </div>
            </div>
        </div>
    );
}
