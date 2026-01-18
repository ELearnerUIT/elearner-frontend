'use client';

import React from "react";
import { User, Mail, DollarSign } from "lucide-react";

export enum InputFieldIcon {
    USER,
    MAIL,
    DOLLAR,
    NONE
}

const getIcon = (icon?: InputFieldIcon) => {
    switch (icon) {
        case InputFieldIcon.USER:
            return User
        case InputFieldIcon.MAIL:
            return Mail
        case InputFieldIcon.DOLLAR:
            return DollarSign
        default:
            return User
    }
}

export default function CustomInputField({
    text = "",
    initValue = "",
    placeholder = "",
    errorMessage = "",
    icon = InputFieldIcon.NONE,
    onValueChange = (event: React.ChangeEvent<HTMLInputElement>) => { },
    onValidate = (event: React.ChangeEvent<HTMLInputElement>) => { }
}: {
    text?: string,
    initValue?: string,
    placeholder?: string,
    errorMessage?: string,
    icon?: InputFieldIcon,
    onValueChange?: (event: React.ChangeEvent<HTMLInputElement>) => void,
    onValidate?: (event: React.ChangeEvent<HTMLInputElement>) => void
}) {
    return (
        <div>
            <label className="block text-[rgb(10,10,10)] font-medium mb-2">{text}</label>
            <div className="relative">
                {icon !== InputFieldIcon.NONE && getIcon(icon) && React.createElement(getIcon(icon), { className: "absolute left-3 top-3 text-gray-300", size: 20 })}
                <input
                    type="text"
                    value={initValue}
                    onChange={(event) => { onValueChange(event); onValidate && onValidate(event); }}
                    placeholder={placeholder}
                    className={"w-full pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 "
                        +
                        (icon == InputFieldIcon.NONE ? " pl-4 " : " pl-10 ")
                        +
                        (errorMessage && errorMessage.length > 0 ? "border-red-300 focus:ring-red-500" : "border-gray-300 focus:ring-[rgb(99,102,241)]")
                    }
                />
                {
                    errorMessage && errorMessage.length > 0 ?
                        <p className="text-red-500 text-sm mt-1">{errorMessage}</p>
                        :
                        <></>
                }
            </div>
        </div>
    )
}

