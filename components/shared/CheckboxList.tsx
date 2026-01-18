'use client'
import { useState } from 'react'
export default function CheckboxList({
    options = [
        "option1",
        "option2",
        "option3",
        "option4",
        "option5"
    ],
    selectedValues = [],
    onSelectedValueChanged = (selectedOptions: any[]) => { }
}: {
    options?: any[],
    selectedValues?: any[],
    onSelectedValueChanged?: (selectedOptions: any[]) => void
}
) {

    // const [selectedValues, setSelectedValues] = useState<any[]>([])
    const handleValueChange = (event: React.ChangeEvent<HTMLInputElement>, value: any) => {
        let newSelectedValues = [...selectedValues]
        if (!newSelectedValues.includes(value)) {
            newSelectedValues.push(value)
        }
        else {
            const index = newSelectedValues.indexOf(value);
            if (index >= 0) {
                newSelectedValues.splice(index, 1);
            }
        }
        // setSelectedValues(newSelectedValues)WWWW
        console.log("new: ", newSelectedValues)
        onSelectedValueChanged(newSelectedValues)
    }
    return (
        <div className="space-y-2">
            {options.map((option, index) => (
                <label key={index} className="flex items-center gap-3 cursor-pointer group">
                    <input
                        type="checkbox"
                        checked={selectedValues.includes(option)}
                        onChange={(event) => handleValueChange(event, option)}
                        className="w-4 h-4 text-indigo-600 rounded cursor-pointer"
                    />
                    <span className="text-gray-700 group-hover:text-gray-900">{option}</span>
                </label>
            ))}
        </div>
    )
}