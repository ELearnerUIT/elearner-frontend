'use client';

import React from "react";
import { User } from "lucide-react";

export enum InputFieldIcon {
    USER
}

const getIcon = (icon: InputFieldIcon) => {
    switch (icon) {
        case InputFieldIcon.USER:
            return User
    }
}

export default function CustomInputField(props) {
    return (
        <div>
            <label className="block text-gray-700 font-medium mb-2">{props.text}</label>
            <div className="relative">
                {/* <User className="absolute left-3 top-3 text-gray-400" size={20} /> */}
                {getIcon(props.icon) && React.createElement(getIcon(props.icon), { className: "absolute left-3 top-3 text-gray-300", size: 20 })}
                {/* <img src="https://lucide.dev/icons/user" className="absolute left-3 top-3 text-gray-400" ></img> */}
                <input
                    type="text"
                    value={props.initValue}
                    // onChange={(e) => setFirstNameInput(e.target.value)}
                    onChange={(event) => { props.onValueChange(event); /*props.onValidate(event);*/ }}
                    placeholder={props.placeholder}
                    className={"w-full pl-10 pr-4 py-2 border "
                        +
                        "border-gray-300 "
                        +
                        "rounded-lg focus:outline-none focus:ring-2  focus:ring-blue-500"}
                />
            </div>
        </div>
    )
}

