'use client';

import React from "react";

export default function CustomTextArea({
    text = "",
    initValue = "",
    placeholder = "",
    errorMessage = "",
    rows = 4,
    onValueChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => { },
    onValidate = (event: React.ChangeEvent<HTMLTextAreaElement>) => { }
}: {
    text?: string,
    initValue?: string,
    placeholder?: string,
    errorMessage?: string,
    rows?: number,
    onValueChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void,
    onValidate?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void
}) {
    return (
        <div>
            <label className="block text-[rgb(10,10,10)] font-medium mb-2">{text}</label>
            <div className="relative">
                <textarea
                    value={initValue}
                    onChange={(event) => { onValueChange(event); onValidate && onValidate(event); }}
                    placeholder={placeholder}
                    rows={rows}
                    className={"w-full pl-4 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 "
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

