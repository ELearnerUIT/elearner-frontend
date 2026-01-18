import { ChevronDown } from 'lucide-react'
export default function CustomDropdown({
    value,
    options,
    onSelectedChanged = (value) => { }
}:
    {
        value?: any,
        options?: any[],
        onSelectedChanged?: (value: any) => void
    }

) {
    return (
        <div className="relative">
            <select
                value={value}
                onChange={(e) => onSelectedChanged(e.target.value)}
                className="appearance-none w-full bg-white border border-gray-300 rounded-lg px-4 py-2 pr-10 text-gray-900 cursor-pointer hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-[rgb(99,102,241)]"
            >
                {
                    options && options.map((option, index) => (
                        <option key={index} value={option}>{option}</option>
                    ))
                }
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600 pointer-events-none" />
        </div>
    )
}