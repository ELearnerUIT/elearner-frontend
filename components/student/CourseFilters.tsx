import { Search } from "lucide-react";

export type FilterType = "all" | "in-progress" | "completed";

interface CourseFiltersProps {
    filter: FilterType;
    searchQuery: string;
    onFilterChange: (filter: FilterType) => void;
    onSearchChange: (query: string) => void;
}

export default function CourseFilters({
    filter,
    searchQuery,
    onFilterChange,
    onSearchChange,
}: CourseFiltersProps) {
    return (
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="join">
                <button
                    className={`join-item btn ${filter === "all" ? "btn-primary" : "btn-ghost"}`}
                    onClick={() => onFilterChange("all")}
                >
                    All Courses
                </button>
                <button
                    className={`join-item btn ${filter === "in-progress" ? "btn-primary" : "btn-ghost"}`}
                    onClick={() => onFilterChange("in-progress")}
                >
                    In Progress
                </button>
                <button
                    className={`join-item btn ${filter === "completed" ? "btn-primary" : "btn-ghost"}`}
                    onClick={() => onFilterChange("completed")}
                >
                    Completed
                </button>
            </div>

            <div className="flex-1 max-w-md">
                <label className="input input-bordered flex items-center gap-2">
                    <Search className="w-4 h-4 opacity-70" />
                    <input
                        type="text"
                        className="grow"
                        placeholder="Search courses..."
                        value={searchQuery}
                        onChange={(e) => onSearchChange(e.target.value)}
                    />
                </label>
            </div>
        </div>
    );
}
