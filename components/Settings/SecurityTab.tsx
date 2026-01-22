"use client";

import { useState } from "react";
import { ButtonColor, CustomButton } from "../shared/CustomButton";
import CustomPasswordField from "../shared/CustomPasswordField";
import { API_ENDPOINTS, apiRequest } from "@/lib/api";
import { getAccessToken } from "@/lib/auth";
import { validateNewPassword } from "@/utils/validatePasswordUtils";

export default function SecurityTab() {
    const [currentPasswordInput, setCurrentPasswordInput] = useState("");
    const [confirmPasswordInput, setConfirmPasswordInput] = useState("");
    const [newPasswordInput, setNewPasswordInput] = useState("");

    const [currentPasswordError, setCurrentPasswordError] = useState("");
    const [confirmPasswordError, setConfirmPasswordError] = useState("");
    const [newPasswordError, setNewPasswordError] = useState("");
    const [isUpdating, setIsUpdating] = useState(false);

    const handleValidateNewPassword = (password: string) => {
        const result = validateNewPassword(password);
        setNewPasswordError(result.errorMessage);
        return result.isValid;
    };

    const validateCurrentPassword = (password: string) => {
        if (!password || password.length === 0) {
            setCurrentPasswordError("Please enter your current password");
            return false;
        }
        setCurrentPasswordError("");
        return true;
    };

    const validateConfirmPassword = (confirmPassword: string) => {
        if (confirmPassword !== newPasswordInput) {
            setConfirmPasswordError("Password does not match");
            return false;
        }
        setConfirmPasswordError("");
        return true;
    };

    const handleUpdatePassword = async (
        event: React.MouseEvent<HTMLButtonElement>,
    ) => {
        event.preventDefault();

        let isValid = true;

        if (!validateCurrentPassword(currentPasswordInput)) isValid = false;
        if (!validateConfirmPassword(confirmPasswordInput)) isValid = false;
        if (!handleValidateNewPassword(newPasswordInput)) isValid = false;

        if (!isValid) {
            return;
        }

        setIsUpdating(true);

        try {
            const token = getAccessToken();
            const response = await apiRequest(
                API_ENDPOINTS.AUTH.CHANGE_PASSWORD,
                {
                    method: "PUT",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        oldPassword: currentPasswordInput,
                        newPassword: newPasswordInput,
                    }),
                },
            );

            if (response.success) {
                alert("Password updated successfully!");
                setCurrentPasswordInput("");
                setNewPasswordInput("");
                setConfirmPasswordInput("");
                setCurrentPasswordError("");
                setNewPasswordError("");
                setConfirmPasswordError("");
            } else {
                if (
                    response.message.includes("incorrect") ||
                    response.message.includes("wrong")
                ) {
                    setCurrentPasswordError("Current password is incorrect");
                } else {
                    alert(response.message || "Failed to update password");
                }
            }
        } catch (error) {
            console.error("Error updating password:", error);
            alert("An error occurred while updating password");
        } finally {
            setIsUpdating(false);
        }
    };

    return (
        <div>
            {/* Change password Section */}
            <div className="mb-8">
                <h2 className="text-lg font-semibold text-gray-900 mb-2">
                    Change Password
                </h2>
                <p className="text-gray-600 text-sm mb-6">
                    Update your password to keep your account secure
                </p>

                {/* Current Password */}
                <div className="mb-6">
                    <CustomPasswordField
                        text="Current Password"
                        initValue={currentPasswordInput}
                        placeholder="Current Password"
                        errorMessage={currentPasswordError}
                        onValueChange={(
                            event: React.ChangeEvent<HTMLInputElement>,
                        ) => setCurrentPasswordInput(event.target.value)}
                    />
                </div>

                {/* New Password */}
                <div className="mb-6">
                    <CustomPasswordField
                        text="New Password"
                        initValue={newPasswordInput}
                        placeholder="New Password"
                        errorMessage={newPasswordError}
                        onValueChange={(
                            event: React.ChangeEvent<HTMLInputElement>,
                        ) => setNewPasswordInput(event.target.value)}
                        onValidate={(
                            event: React.ChangeEvent<HTMLInputElement>,
                        ) => validateNewPassword(event.target.value)}
                    />
                </div>

                {/* Confirm Password */}
                <div className="mb-6">
                    <CustomPasswordField
                        text="Confirm New Password"
                        initValue={confirmPasswordInput}
                        placeholder="Confirm New Password"
                        errorMessage={confirmPasswordError}
                        onValueChange={(
                            event: React.ChangeEvent<HTMLInputElement>,
                        ) => setConfirmPasswordInput(event.target.value)}
                        onValidate={(
                            event: React.ChangeEvent<HTMLInputElement>,
                        ) => validateConfirmPassword(event.target.value)}
                    />
                </div>

                <CustomButton
                    text={isUpdating ? "Updating..." : "Update Password"}
                    enabled={!isUpdating}
                    color={ButtonColor.PURPLE}
                    width="w-40"
                    onClick={(event) => {
                        handleUpdatePassword(event);
                    }}
                />
            </div>
        </div>
    );
}
