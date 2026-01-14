import { Lock, Eye, EyeClosed } from "lucide-react";
import { useState } from "react";

export default function CustomPasswordField(props: {
    text: string,
    initValue: string,
    placeholder: string,
    errorMessage: string,
    onValueChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
    onValidate?: (event: React.ChangeEvent<HTMLInputElement>) => void,
}) {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const showPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        setIsPasswordVisible(!isPasswordVisible);
    }

    return (
        <div>
            <label className="block text-gray-700 font-medium mb-2">{props.text}</label>
            <div className="relative">
                <Lock className="absolute left-3 top-3 text-gray-400" size={20} />
                <input
                    type={isPasswordVisible ? "text" : "password"}
                    value={props.initValue}
                    onChange={(event) => { props.onValueChange(event); props.onValidate && props.onValidate(event); }}
                    placeholder="Create a strong password"
                    className={"w-full pl-10 pr-10 py-2 border rounded-lg focus:outline-none focus:ring-2 "
                        +
                        (props.errorMessage && props.errorMessage.length > 0 ? "border-red-300 focus:ring-red-500" : "border-gray-300 focus:ring-[rgb(99,102,241)]")
                    }
                />
                <button
                    onClick={(event) => showPassword(event)}
                    className="absolute right-3 top-3 text-gray-400 cursor-pointer hover:text-gray-600"
                >
                    {isPasswordVisible ?
                        <EyeClosed size={20} />
                        :
                        <Eye size={20} />
                    }
                </button>
            </div>
            {/* <p className="text-gray-500 text-sm mt-1">Must be at least 8 characters</p> */}
            {
                props.errorMessage && props.errorMessage.length > 0 ?
                    <p className="text-red-500 text-sm mt-1">{props.errorMessage}</p>
                    :
                    <></>
            }
        </div>
    )
}