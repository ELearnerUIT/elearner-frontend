"use client";

import type { NextPage } from "next";
import React, { useState } from "react";
import {
    Plus,
    Search,
    BookOpen,
    Users,
    Star,
    DollarSign,
    MoreVertical,
    Eye,
    Edit,
    MoreHorizontal,
} from "lucide-react";
import Image from "next/image";
import TeacherSidebar from "@/components/teacher/layout/TeacherSidebar";
import TeacherHeader from "@/components/teacher/layout/TeacherHeader";
import { StatCard } from "@/components/teacher/my-courses/StatCard";
import { CourseCard } from "@/components/teacher/my-courses/CourseCard";
import { Course } from "./type";

const mockCourses: Course[] = [
    {
        id: 1,
        title: "Complete Web Development Bootcamp 2025",
        status: "Published",
        students: "45,328",
        rating: "4.8",
        revenue: "$128,945",
        reviews: "12,453",
        image: "/api/placeholder/400/220",
    },
    {
        id: 2,
        title: "Advanced React Patterns",
        status: "Published",
        students: "23,456",
        rating: "4.9",
        revenue: "$89,234",
        reviews: "5,432",
        image: "/api/placeholder/400/220",
    },
    {
        id: 3,
        title: "Node.js Complete Guide",
        status: "Published",
        students: "18,765",
        rating: "4.7",
        revenue: "$45,678",
        reviews: "3,421",
        image: "/api/placeholder/400/220",
    },
    {
        id: 4,
        title: "JavaScript ES2025 Features",
        status: "Draft",
        students: "0",
        rating: "0",
        revenue: "$0",
        reviews: "0",
        image: "/api/placeholder/400/220",
    },
    {
        id: 5,
        title: "UI/UX Design Masterclass",
        status: "Published",
        students: "12,102",
        rating: "4.6",
        revenue: "$34,567",
        reviews: "1,543",
        image: "/api/placeholder/400/220",
    },
];

const MyCourses: NextPage = () => {
    const [activeTab, setActiveTab] = useState<"All" | "Published" | "Draft">(
        "All",
    );
    const [searchQuery, setSearchQuery] = useState("");

    const filteredCourses = mockCourses.filter((course) => {
        const matchesTab = activeTab === "All" || course.status === activeTab;
        const matchesSearch = course.title
            .toLowerCase()
            .includes(searchQuery.toLowerCase());
        return matchesTab && matchesSearch;
    });

    return (
        <div className="min-h-screen bg-gray-50 font-arimo text-gray-800 flex">
            <TeacherSidebar />

            <div className="flex-1 lg:ml-64 flex flex-col min-h-screen">
                <TeacherHeader />

                <main className="flex-1 p-6 max-w-7xl mx-auto w-full space-y-8">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900">
                                My Courses
                            </h2>
                            <p className="text-gray-500 mt-1">
                                Manage and track all your courses
                            </p>
                        </div>
                        <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2.5 rounded-lg font-medium transition-colors shadow-sm w-fit">
                            <Plus className="w-5 h-5" />
                            Create New Course
                        </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        <StatCard
                            label="Total Courses"
                            value="5"
                            subtext="4 published"
                            icon={
                                <BookOpen className="w-5 h-5 text-purple-600" />
                            }
                        />
                        <StatCard
                            label="Total Students"
                            value="95,783"
                            subtext="+1,234 this month"
                            icon={<Users className="w-5 h-5 text-blue-600" />}
                        />
                        <StatCard
                            label="Total Reviews"
                            value="22,849"
                            subtext="Avg rating: 4.8"
                            icon={<Star className="w-5 h-5 text-yellow-500" />}
                        />
                        <StatCard
                            label="Total Revenue"
                            value="$298,424"
                            subtext="+$12K this month"
                            icon={
                                <DollarSign className="w-5 h-5 text-green-600" />
                            }
                        />
                    </div>

                    <div className="flex flex-col md:flex-row justify-between gap-4 items-center bg-white p-2 rounded-xl border border-gray-200 shadow-sm">
                        <div className="flex p-1 bg-gray-100 rounded-lg self-start md:self-auto">
                            {["All", "Published", "Draft"].map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab as any)}
                                    className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all ${
                                        activeTab === tab
                                            ? "bg-white text-gray-900 shadow-sm"
                                            : "text-gray-500 hover:text-gray-700"
                                    }`}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>

                        <div className="relative w-full md:w-72">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search courses..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>
                    </div>

                    {filteredCourses.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredCourses.map((course) => (
                                <CourseCard key={course.id} course={course} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20 bg-white rounded-xl border border-dashed border-gray-300">
                            <p className="text-gray-500">
                                No courses found matching your criteria.
                            </p>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};

export default MyCourses;
