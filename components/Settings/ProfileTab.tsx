import { useState } from 'react';
import { Camera } from 'lucide-react';
import { ButtonColor, CustomButton } from '../shared/CustomButton';
import CustomInputField, { InputFieldIcon } from '../shared/CustomInputField';
import CustomTextArea from '../shared/CustomTextArea';

export default function ProfileTab() {
    const [firstNameInput, setFirstNameInput] = useState("");
    const [lastNameInput, setLastNameInput] = useState("");
    const [emailInput, setEmailInput] = useState("");
    const [usernameInput, setUsernameInput] = useState("");
    const [bioInput, setBioInput] = useState("");

    const [firstNameError, setFirstNameError] = useState("");
    const [lastNameError, setLastNameError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [usernameError, setUsernameError] = useState("");

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

    const validateUsername = (username: string) => {
        if (!username || username.length === 0) {
            setUsernameError("Please enter your username");
            return false;
        }
        setUsernameError("");
        return true;
    }

    const handleChangePhoto = () => {
        alert("Change photo")
    }

    const handleSaveChanges = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();

        let isValid = true;

        // if (!validateRequiredFields()) isValid = false;
        if (!validateFirstName(firstNameInput)) isValid = false;
        if (!validateLastName(lastNameInput)) isValid = false;
        if (!validateEmail(emailInput)) isValid = false;
        if (!validateUsername(usernameInput)) isValid = false;


        if (!isValid) {
            return;
        }

        // Xu ly dang ky
        alert("Save changes")
    }


    return (
        <div>
            {/* Profile Information Section */}
            <div className="mb-8">
                <h2 className="text-lg font-semibold text-gray-900 mb-2">
                    Profile Information
                </h2>
                <p className="text-gray-600 text-sm mb-6">
                    Update your personal information and profile picture
                </p>

                {/* Photo Upload */}
                <div className="mb-8 flex flex-col items-center justify-center">
                    <div className="h-50 w-50 mb-5 bg-gray-400 rounded-full flex items-center justify-center">
                        <Camera size={100} className="text-white" />
                        <img
                            className="object-cover object-center w-full h-full rounded-full"
                            src="https://i.ytimg.com/vi/O8ivm7403rk/hq720.jpg"
                        />
                    </div>

                    <CustomButton
                        enabled={true}
                        color={ButtonColor.PURPLE}
                        width="w-45"
                        onClick={() => { handleChangePhoto() }}
                    >
                        <Camera size={20} />
                        Change Photo
                    </CustomButton>
                    <p className="text-gray-500 text-sm mt-2">JPG or PNG.</p>
                </div>

                <hr className="text-[rgba(0,0,0,0.1)] mb-5" />

                {/* First Name and Last Name */}
                <div className="grid grid-cols-2 gap-6 mb-6">
                    <CustomInputField
                        text="First Name"
                        initValue={firstNameInput}
                        placeholder="John"
                        errorMessage={firstNameError}
                        icon={InputFieldIcon.USER}
                        onValueChange={(event: React.ChangeEvent<HTMLInputElement>) => setFirstNameInput(event.target.value)}
                        onValidate={(event: React.ChangeEvent<HTMLInputElement>) => { validateFirstName(event.target.value); }}
                    />
                    <CustomInputField
                        text="Last Name"
                        initValue={lastNameInput}
                        placeholder="Doe"
                        errorMessage={lastNameError}
                        icon={InputFieldIcon.USER}
                        onValueChange={(event: React.ChangeEvent<HTMLInputElement>) => setLastNameInput(event.target.value)}
                        onValidate={(event: React.ChangeEvent<HTMLInputElement>) => { validateLastName(event.target.value); }}
                    />
                </div>

                {/* Email Address */}
                <div className="mb-6">
                    <CustomInputField
                        text="Email Address"
                        initValue={emailInput}
                        placeholder="your.email@example.com"
                        errorMessage={emailError}
                        icon={InputFieldIcon.MAIL}
                        onValueChange={(event: React.ChangeEvent<HTMLInputElement>) => setEmailInput(event.target.value)}
                        onValidate={(event: React.ChangeEvent<HTMLInputElement>) => { validateEmail(event.target.value); }}
                    />
                </div>

                {/* Username */}
                <div className="mb-6">
                    <CustomInputField
                        text="Username"
                        initValue={usernameInput}
                        placeholder="johndoe"
                        errorMessage={usernameError}
                        icon={InputFieldIcon.USER}
                        onValueChange={(event: React.ChangeEvent<HTMLInputElement>) => setUsernameInput(event.target.value)}
                        onValidate={(event: React.ChangeEvent<HTMLInputElement>) => { validateUsername(event.target.value); }}
                    />
                </div>

                <div className='mb-6'>
                    <CustomTextArea
                        text="Bio"
                        initValue={bioInput}
                        placeholder="Tell us about yourself..."
                        onValueChange={(event) => setBioInput(event.target.value)}
                    />
                </div>

                <CustomButton
                    text="Save Changes"
                    enabled={true}
                    color={ButtonColor.PURPLE}
                    width="w-40"
                    onClick={(event) => { handleSaveChanges(event) }}
                />
            </div>
        </div>
    )
}