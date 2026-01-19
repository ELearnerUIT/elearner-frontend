import Link from "next/link";
import { BookOpen, CheckCircle, Play } from "lucide-react";

export interface Course {
    id: number;
    title: string;
    instructor: string;
    thumbnail: string;
    progress: number;
    totalLessons: number;
    completedLessons: number;
    lastAccessed: string;
    category: string;
}

interface CourseCardProps {
    course: Course;
}

export default function CourseCard({ course }: CourseCardProps) {
    return (
        <div className="card bg-base-100 shadow-md hover:shadow-lg transition-shadow">
            <figure className="relative">
                <div className="w-full h-40 bg-gradient-to-r from-primary/20 to-secondary/20 flex items-center justify-center">
                    <BookOpen className="w-16 h-16 text-primary/50" />
                </div>
                {course.progress === 100 && (
                    <div className="absolute top-2 right-2 badge badge-success gap-1">
                        <CheckCircle className="w-3 h-3" />
                        Completed
                    </div>
                )}
            </figure>
            <div className="card-body">
                <h2 className="card-title text-base">{course.title}</h2>
                <p className="text-sm text-base-content/70">{course.instructor}</p>

                <div className="mt-2">
                    <div className="flex justify-between text-sm mb-1">
                        <span>Progress</span>
                        <span className="font-medium">{course.progress}%</span>
                    </div>
                    <progress
                        className={`progress w-full ${
                            course.progress === 100
                                ? "progress-success"
                                : "progress-primary"
                        }`}
                        value={course.progress}
                        max="100"
                    ></progress>
                    <div className="text-xs text-base-content/60 mt-1">
                        {course.completedLessons} of {course.totalLessons} lessons
                    </div>
                </div>

                <div className="flex justify-between items-center mt-4">
                    <span className="text-xs text-base-content/60">
                        Last accessed: {course.lastAccessed}
                    </span>
                    <Link
                        href={`/course/${course.id}/learn`}
                        className="btn btn-primary btn-sm gap-1"
                    >
                        <Play className="w-4 h-4" />
                        {course.progress === 100 ? "Review" : "Continue"}
                    </Link>
                </div>
            </div>
        </div>
    );
}
