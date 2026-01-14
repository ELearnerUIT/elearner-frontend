import { useState } from 'react';
import { Camera } from 'lucide-react';
import { ButtonColor, CustomButton } from '../shared/CustomButton';
import CustomInputField from '../shared/CustomInputField';
import CustomTextArea from '../shared/CustomTextArea';

export default function ProfileTab() {
    const [firstNameInput, setFirstNameInput] = useState("");
    const [lastNameInput, setLastNameInput] = useState("");
    const [emailInput, setEmailInput] = useState("");
    const [usernameInput, setUsernameInput] = useState("");
    const [bioInput, setBioInput] = useState("");

    const handleChangePhoto = () => {
        alert("Change photo")
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
                        onValueChange={(event: React.ChangeEvent<HTMLInputElement>) => setFirstNameInput(event.target.value)}
                    />
                    <CustomInputField
                        text="Last Name"
                        initValue={lastNameInput}
                        placeholder="Doe"
                        onValueChange={(event: React.ChangeEvent<HTMLInputElement>) => setFirstNameInput(event.target.value)}
                    />
                </div>

                {/* Email Address */}
                <div className="mb-6">
                    <CustomInputField
                        text="Email Address"
                        initValue={emailInput}
                        placeholder="your.email@example.com"
                    />
                </div>

                {/* Username */}
                <div className="mb-6">
                    <CustomInputField
                        text="Username"
                        initValue={usernameInput}
                        placeholder="johndoe"
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

                {/* Save Button */}
                {/* <button
                    onClick={() => { }}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
                >
                    Save Changes
                </button> */}
                <CustomButton
                    text="Save Changes"
                    enabled={true}
                    color={ButtonColor.PURPLE}
                    width="w-40"
                    onClick={() => { }}
                />
            </div>
        </div>
    )
}