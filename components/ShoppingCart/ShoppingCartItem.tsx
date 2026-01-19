import { convertTitleToLink } from "@/app/(public)/(site)/courses/[courseName]/page";
import { Star, Trash } from "lucide-react";
import Link from "next/link";

export default function ShoppingCartItem({
    checked = false,
    id = "0",
    imgSource = "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=250&fit=crop",
    level = "Beginner",
    category = "Web Development",
    courseTitle = "Complete Web Development Bootcamp 2025",
    author = "Sarah Johnson",
    rating = 4.8,
    ratingCount = 12453,
    duration = 52,
    oldPrice = 199,
    price = 89.99,
    onSelect = (courseId: string) => {},
    onUnSelect = (courseId: string) => {},
    onRemove = (courseId: string) => {},
}) {
    return (
        <div className="bg-white rounded-lg p-4 flex gap-4 shadow-sm">
            <input
                type="checkbox"
                checked={checked}
                onChange={(event) => {
                    if (event.target.checked === true) onSelect(id);
                    else onUnSelect(id);
                }}
            />
            <img
                src={imgSource}
                className="w-32 h-24 rounded object-cover shrink-0"
            />
            <div className="flex-1">
                <Link
                    href={`/courses/${convertTitleToLink(courseTitle)}`}
                    className="font-semibold text-gray-900 mb-1"
                >
                    {courseTitle}
                </Link>
                <p className="text-sm text-gray-600 mb-2">By {author}</p>
                <div className="flex items-center gap-2 mb-3 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                        <Star className="text-yellow-400 fill-yellow-400" />
                        <span className="text-gray-700">4.8</span>
                    </div>
                    <span>({ratingCount} reviews)</span>
                    <span>•</span>
                    <span>{duration} hours</span>
                    <span>•</span>
                    <span>{level}</span>
                </div>
            </div>
            <div className="text-right flex flex-col justify-between">
                <div>
                    <div className="text-xl font-bold text-indigo-600">
                        ${price.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-400 line-through">
                        ${oldPrice.toLocaleString()}
                    </div>
                </div>
                <button
                    className="text-red-500 hover:text-red-700 flex items-center gap-1 text-sm"
                    onClick={() => onRemove(id)}
                >
                    <Trash size={20} />
                    Remove
                </button>
            </div>
        </div>
    );
}
