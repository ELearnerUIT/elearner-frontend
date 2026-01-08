'use client';

import React from "react";
import { User, Mail } from "lucide-react";

export enum InputFieldIcon {
    USER,
    MAIL
}

const getIcon = (icon: InputFieldIcon) => {
    switch (icon) {
        case InputFieldIcon.USER:
            return User
        case InputFieldIcon.MAIL:
            return Mail
    }
}

export default function CustomInputField(props: {
    text: string,
    initValue: string,
    placeholder: string,
    errorMessage: string,
    icon: InputFieldIcon,
    onValueChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
    onValidate?: (event: React.ChangeEvent<HTMLInputElement>) => void
}) {
    return (
        <div>
            <label className="block text-gray-700 font-medium mb-2">{props.text}</label>
            <div className="relative">
                {getIcon(props.icon) && React.createElement(getIcon(props.icon), { className: "absolute left-3 top-3 text-gray-300", size: 20 })}
                <input
                    type="text"
                    value={props.initValue}
                    onChange={(event) => { props.onValueChange(event); props.onValidate && props.onValidate(event); }}
                    placeholder={props.placeholder}
                    className={"w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 "
                        +
                        (props.errorMessage && props.errorMessage.length > 0 ? "border-red-300 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500")
                    }
                />
                {
                    props.errorMessage && props.errorMessage.length > 0 ?
                        <p className="text-red-500 text-sm mt-1">{props.errorMessage}</p>
                        :
                        <></>
                }
            </div>
        </div>
    )
}

