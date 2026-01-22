export const StatCard = ({
    label,
    value,
    subtext,
    icon,
}: {
    label: string;
    value: string;
    subtext: string;
    icon: React.ReactNode;
}) => (
    <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col gap-1">
        <div className="flex justify-between items-start">
            <span className="text-sm font-medium text-gray-500">{label}</span>
            <div className="p-1.5 bg-gray-50 rounded-lg">{icon}</div>
        </div>
        <div className="text-2xl font-bold text-gray-900">{value}</div>
        <div className="text-xs text-gray-500 font-medium">{subtext}</div>
    </div>
);
