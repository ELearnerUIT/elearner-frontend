"use client";

import { useState } from "react";
import { BookOpen } from "lucide-react";
import { getUser } from "@/lib/auth";
import StatsCards from "@/components/student/StatsCards";
import CourseCard, { Course } from "@/components/student/CourseCard";
import CourseFilters, { FilterType } from "@/components/student/CourseFilters";
import LearningStreak from "@/components/student/LearningStreak";
import RecentActivity, { Activity } from "@/components/student/RecentActivity";
import QuickActions from "@/components/student/QuickActions";

const mockCourses: Course[] = [
    {
        id: 1,
        title: "Complete Web Development Bootcamp",
        instructor: "John Smith",
        thumbnail: "/api/placeholder/300/200",
        progress: 65,
        totalLessons: 120,
        completedLessons: 78,
        lastAccessed: "2 hours ago",
        category: "Web Development",
    },
    {
        id: 2,
        title: "React - The Complete Guide",
        instructor: "Sarah Johnson",
        thumbnail: "/api/placeholder/300/200",
        progress: 45,
        totalLessons: 85,
        completedLessons: 38,
        lastAccessed: "Yesterday",
        category: "Frontend",
    },
    {
        id: 3,
        title: "Python for Data Science",
        instructor: "Michael Chen",
        thumbnail: "/api/placeholder/300/200",
        progress: 90,
        totalLessons: 60,
        completedLessons: 54,
        lastAccessed: "3 days ago",
        category: "Data Science",
    },
    {
        id: 4,
        title: "UI/UX Design Fundamentals",
        instructor: "Emily Davis",
        thumbnail: "/api/placeholder/300/200",
        progress: 30,
        totalLessons: 45,
        completedLessons: 14,
        lastAccessed: "1 week ago",
        category: "Design",
    },
    {
        id: 5,
        title: "Node.js Backend Development",
        instructor: "David Wilson",
        thumbnail: "/api/placeholder/300/200",
        progress: 100,
        totalLessons: 75,
        completedLessons: 75,
        lastAccessed: "2 weeks ago",
        category: "Backend",
    },
    {
        id: 6,
        title: "Machine Learning A-Z",
        instructor: "Lisa Anderson",
        thumbnail: "/api/placeholder/300/200",
        progress: 15,
        totalLessons: 100,
        completedLessons: 15,
        lastAccessed: "3 days ago",
        category: "Data Science",
    },
];

const recentActivities: Activity[] = [
    {
        id: 1,
        type: "lesson",
        title: "Completed: Introduction to React Hooks",
        course: "React - The Complete Guide",
        time: "2 hours ago",
    },
    {
        id: 2,
        type: "quiz",
        title: "Passed Quiz: JavaScript Fundamentals",
        course: "Complete Web Development Bootcamp",
        time: "Yesterday",
    },
    {
        id: 3,
        type: "certificate",
        title: "Earned Certificate",
        course: "Node.js Backend Development",
        time: "2 weeks ago",
    },
];

export default function MyCoursesPage() {
    const user = getUser();
    const [filter, setFilter] = useState<FilterType>("all");
    const [searchQuery, setSearchQuery] = useState("");

    const filteredCourses = mockCourses.filter((course) => {
        const matchesFilter =
            filter === "all" ||
            (filter === "in-progress" && course.progress < 100) ||
            (filter === "completed" && course.progress === 100);

        const matchesSearch =
            course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            course.instructor.toLowerCase().includes(searchQuery.toLowerCase());

        return matchesFilter && matchesSearch;
    });

    const stats = {
        inProgress: mockCourses.filter((c) => c.progress < 100).length,
        completed: mockCourses.filter((c) => c.progress === 100).length,
        totalHours: 48,
        certificates: 1,
    };

    return (
        <div className="min-h-screen bg-base-200">
            <div className="container mx-auto px-4 py-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-base-content">
                        Welcome back,{" "}
                        {user?.fullName || user?.username || "Learner"}!
                    </h1>
                    <p className="text-base-content/70 mt-2">
                        Continue your learning journey where you left off.
                    </p>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">
                    <div className="flex-1">
                        <StatsCards stats={stats} />

                        <CourseFilters
                            filter={filter}
                            searchQuery={searchQuery}
                            onFilterChange={setFilter}
                            onSearchChange={setSearchQuery}
                        />

                        <div className="grid md:grid-cols-2 gap-6">
                            {filteredCourses.map((course) => (
                                <CourseCard key={course.id} course={course} />
                            ))}
                        </div>

                        {filteredCourses.length === 0 && (
                            <div className="text-center py-12">
                                <BookOpen className="w-16 h-16 mx-auto text-base-content/30 mb-4" />
                                <h3 className="text-lg font-medium">
                                    No courses found
                                </h3>
                                <p className="text-base-content/60">
                                    Try adjusting your filters or search query.
                                </p>
                            </div>
                        )}
                    </div>

                    <div className="w-full lg:w-80 space-y-6">
                        <LearningStreak streakDays={7} activeDays={7} />
                        <RecentActivity activities={recentActivities} />
                        <QuickActions />
                    </div>
                </div>
            </div>
        </div>
    );
}
