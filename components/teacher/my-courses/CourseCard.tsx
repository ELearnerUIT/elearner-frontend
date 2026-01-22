import Image from "next/image";
import { DollarSign, Edit, Eye, MoreVertical, Star, Users } from "lucide-react";
import { Course } from "@/app/teacher/(workspace)/my-courses/type";

export const CourseCard = ({ course }: { course: Course }) => {
    return (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow group">
            <div className="relative h-48 bg-gray-200">
                <Image
                    src={course.image}
                    alt={course.title}
                    layout="fill"
                    objectFit="cover"
                    className="group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 right-3">
                    <span
                        className={`px-2.5 py-1 rounded-full text-xs font-medium shadow-sm border ${
                            course.status === "Published"
                                ? "bg-green-100 text-green-700 border-green-200"
                                : "bg-gray-100 text-gray-700 border-gray-200"
                        }`}
                    >
                        {course.status}
                    </span>
                </div>
            </div>

            <div className="p-5 flex flex-col gap-4">
                <div className="flex justify-between items-start gap-2">
                    <h3 className="font-bold text-lg text-gray-900 line-clamp-2 leading-tight">
                        {course.title}
                    </h3>
                    <button className="text-gray-400 hover:text-gray-600">
                        <MoreVertical className="w-5 h-5" />
                    </button>
                </div>

                <div className="grid grid-cols-2 gap-y-3 gap-x-4 text-sm">
                    <div className="flex items-center gap-2 text-gray-600">
                        <Users className="w-4 h-4 text-gray-400" />
                        <span>{course.students}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                        <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                        <span>
                            {course.rating}{" "}
                            <span className="text-gray-400 text-xs">
                                ({course.reviews})
                            </span>
                        </span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600 col-span-2">
                        <DollarSign className="w-4 h-4 text-gray-400" />
                        <span className="font-semibold text-gray-900">
                            {course.revenue}
                        </span>
                    </div>
                </div>

                <div className="pt-4 mt-auto border-t border-gray-100 flex gap-2">
                    <button className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg border border-gray-200 hover:bg-gray-50 text-sm font-medium text-gray-700 transition-colors">
                        <Eye className="w-4 h-4" />
                        View
                    </button>
                    <button className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg border border-gray-200 hover:bg-gray-50 text-sm font-medium text-gray-700 transition-colors">
                        <Edit className="w-4 h-4" />
                        Edit
                    </button>
                </div>
            </div>
        </div>
    );
};
