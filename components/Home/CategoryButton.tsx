import { BookOpen } from "lucide-react";

const categories = [
    { name: "Web Development", tone: "indigo" },
    { name: "Data Science", tone: "purple" },
    { name: "Business", tone: "emerald" },
    { name: "Design", tone: "amber" },
    { name: "Marketing", tone: "pink" },
    { name: "Photography", tone: "cyan" },
];

const toneClasses: Record<string, { bg: string; text: string }> = {
    indigo: { bg: "bg-indigo-100", text: "text-indigo-600" },
    purple: { bg: "bg-purple-100", text: "text-purple-600" },
    emerald: { bg: "bg-emerald-100", text: "text-emerald-600" },
    amber: { bg: "bg-amber-100", text: "text-amber-600" },
    pink: { bg: "bg-pink-100", text: "text-pink-600" },
    cyan: { bg: "bg-cyan-100", text: "text-cyan-600" },
};

export default function CategoryButton({
    path = "/category/",
    name = ""
}) {
    const convertName = (name: string) => {
        return name.toLowerCase().split(' ').join('-')
    }

    const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        window.location.href = path + convertName(name);
    }

    const getToneClass = (name: string) => {
        let tone = null;

        categories.map((category) => {
            if (category.name === name) {
                tone = category.tone;
            }
        })
        if (tone == null || !toneClasses[tone]) {
            return toneClasses.indigo;
        }
        return toneClasses[tone];
    }

    let tone_class = getToneClass(name);

    return (
        <button
            key={name}
            className="w-40 h-40 text-sm hover:h-50 hover:text-lg rounded-xl bg-white transition-all duration-300 ease-in-out shadow-md flex flex-col items-center"
            onClick={(event) => handleButtonClick(event)}
        >
            <div className={`${tone_class.bg} mt-3 rounded-lg h-20 w-20 flex justify-center items-center`}>
                <BookOpen className={`h-2/3 w-2/3 flex ${tone_class.text}`} />
            </div>
            <p className="mt-3 text-center w-min text-gray-800">{name}</p>
        </button>
    )
}