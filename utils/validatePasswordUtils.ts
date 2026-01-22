export const validateNewPassword = (
    password: string,
): { isValid: boolean; errorMessage: string } => {
    if (!password || password.length === 0) {
        return {
            isValid: false,
            errorMessage: "Please enter your new password",
        };
    }

    // let newPasswordErrorMessages: Array<string> = [];
    // if (password.length < 8) {
    //     newPasswordErrorMessages.push("8 characters");
    // }
    // if (!/[A-Z]/.test(password)) {
    //     newPasswordErrorMessages.push("one uppercase letter");
    // }
    // if (!/[0-9]/.test(password)) {
    //     newPasswordErrorMessages.push("one number");
    // }
    // if (!/[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(password)) {
    //     newPasswordErrorMessages.push("one special character");
    // }

    // if (newPasswordErrorMessages.length > 0) {
    //     let newPasswordErrorMessage = "Password must contain at least ";
    //     for (let i = 0; i < newPasswordErrorMessages.length; i++) {
    //         if (i > 0) {
    //             if (i <= newPasswordErrorMessages.length - 2) {
    //                 newPasswordErrorMessage += ", ";
    //             } else {
    //                 newPasswordErrorMessage += " and ";
    //             }
    //         }
    //         newPasswordErrorMessage += newPasswordErrorMessages[i];
    //     }
    //     newPasswordErrorMessage += ".";
    //     return { isValid: false, errorMessage: newPasswordErrorMessage };
    // }

    return { isValid: true, errorMessage: "" };
};
