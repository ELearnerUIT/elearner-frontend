import { useState } from 'react';
import { ButtonColor, CustomButton } from '../shared/CustomButton';
import CustomPasswordField from '../shared/CustomPasswordField';

export default function SecurityTab() {
    const [currentPasswordInput, setCurrentPasswordInput] = useState("");
    const [confirmPasswordInput, setConfirmPasswordInput] = useState("");
    const [newPasswordInput, setNewPasswordInput] = useState("");

    const [currentPasswordError, setCurrentPasswordError] = useState("");
    const [confirmPasswordError, setConfirmPasswordError] = useState("");
    const [newPasswordError, setNewPasswordError] = useState("");

    const validateCurrentPassword = (firstName: string) => {
        setCurrentPasswordError("Wrong current password")
        return false;
    }

    const validateConfirmPassword = (confirmPassword: string) => {
        if (confirmPassword !== newPasswordInput) {
            setConfirmPasswordError("Password does not match");
            return false;
        }
        setConfirmPasswordError("");
        return true;
    }

    const validateNewPassword = (newPassword: string) => {
        if (!newPassword || newPassword.length === 0) {
            setNewPasswordError("Please enter your new password");
            return false;
        }

        let newPasswordErrorMessages: Array<string> = [];
        if (newPassword.length < 8) {
            newPasswordErrorMessages.push("8 characters");
        }
        if (!/[A-Z]/.test(newPassword)) {
            newPasswordErrorMessages.push("one uppercase letter");
        }
        if (!/[0-9]/.test(newPassword)) {
            newPasswordErrorMessages.push("one number");
        }
        if (!/[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(newPassword)) {
            newPasswordErrorMessages.push("one special character");
        }

        if (newPasswordErrorMessages.length > 0) {
            let newPasswordErrorMessage = "Password must contain at least ";
            for (let i = 0; i < newPasswordErrorMessages.length; i++) {
                if (i > 0) {
                    if (i <= newPasswordErrorMessages.length - 2) {
                        newPasswordErrorMessage += ", ";
                    }
                    else {
                        newPasswordErrorMessage += " and ";
                    }
                }
                newPasswordErrorMessage += newPasswordErrorMessages[i];
            }
            newPasswordErrorMessage += ".";
            setNewPasswordError(newPasswordErrorMessage);
            return false;
        }

        setNewPasswordError("");
        return true;
    }

    const handleUpdatePassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();

        let isValid = true;

        // if (!validateRequiredFields()) isValid = false;
        if (!validateCurrentPassword(currentPasswordInput)) isValid = false;
        if (!validateConfirmPassword(confirmPasswordInput)) isValid = false;
        if (!validateNewPassword(newPasswordInput)) isValid = false;


        if (!isValid) {
            return;
        }

        // Xu ly dang ky
        alert("Password updated")
    }


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
                        placeholder="your.email@example.com"
                        errorMessage={currentPasswordError}
                        onValueChange={(event: React.ChangeEvent<HTMLInputElement>) => setCurrentPasswordInput(event.target.value)}
                    />
                </div>

                {/* New Password */}
                <div className="mb-6">
                    <CustomPasswordField
                        text="New Password"
                        initValue={newPasswordInput}
                        placeholder="your.email@example.com"
                        errorMessage={newPasswordError}
                        onValueChange={(event: React.ChangeEvent<HTMLInputElement>) => setNewPasswordInput(event.target.value)}
                        onValidate={(event: React.ChangeEvent<HTMLInputElement>) => validateNewPassword(event.target.value)}
                    />
                </div>

                {/* Confirm Password */}
                <div className="mb-6">
                    <CustomPasswordField
                        text="Confirm New Password"
                        initValue={confirmPasswordInput}
                        placeholder="your.email@example.com"
                        errorMessage={confirmPasswordError}
                        onValueChange={(event: React.ChangeEvent<HTMLInputElement>) => setConfirmPasswordInput(event.target.value)}
                        onValidate={(event: React.ChangeEvent<HTMLInputElement>) => validateConfirmPassword(event.target.value)}
                    />
                </div>

                <CustomButton
                    text="Update Password"
                    enabled={true}
                    color={ButtonColor.PURPLE}
                    width="w-40"
                    onClick={(event) => { handleUpdatePassword(event) }}
                />
            </div>
        </div>
    )
}