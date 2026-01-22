"use client";

import type { NextPage } from "next";
import {
    BookOpen,
    Users,
    FileText,
    Wallet,
    Plus,
    MoreVertical,
    TrendingUp,
    Star,
    DollarSign,
    Sidebar,
} from "lucide-react";
import TeacherSidebar from "@/components/teacher/layout/TeacherSidebar";
import TeacherHeader from "@/components/teacher/layout/TeacherHeader";

const statsData = [
    {
        title: "Total Students",
        value: "97,444",
        trend: "+12% from last month",
        trendUp: true,
        icon: <Users className="w-6 h-6 text-white" />,
        color: "indigo",
    },
    {
        title: "Total Courses",
        value: "8",
        trend: "3 published",
        trendUp: true,
        icon: <BookOpen className="w-6 h-6 text-white" />,
        color: "purple",
    },
    {
        title: "Total Revenue",
        value: "$284,567",
        trend: "+8% from last month",
        trendUp: true,
        icon: <DollarSign className="w-6 h-6 text-white" />,
        color: "green",
    },
    {
        title: "Pending Payouts",
        value: "$12,340",
        action: "Request Payout",
        icon: <Wallet className="w-6 h-6 text-white" />,
        color: "blue",
    },
];

const courseData = [
    {
        id: 1,
        title: "Complete Web Development Bootcamp 2025",
        status: "Published",
        students: "45,328",
        rating: 4.8,
        revenue: "$128,945",
    },
    {
        id: 2,
        title: "Advanced React Patterns",
        status: "Published",
        students: "23,456",
        rating: 4.9,
        revenue: "$89,234",
    },
    {
        id: 3,
        title: "Node.js Complete Guide",
        status: "Published",
        students: "18,765",
        rating: 4.7,
        revenue: "$45,678",
    },
    {
        id: 4,
        title: "JavaScript ES2025 Features",
        status: "Draft",
        students: "-",
        rating: "-",
        revenue: "$0",
    },
];

const activityData = [
    {
        id: 1,
        text: "15 new students enrolled",
        time: "2 hours ago",
        icon: <Users className="w-4 h-4 text-blue-500" />,
        bg: "bg-blue-100",
    },
    {
        id: 2,
        text: "New 5-star review received",
        time: "5 hours ago",
        icon: <Star className="w-4 h-4 text-yellow-600" />,
        bg: "bg-yellow-100",
    },
    {
        id: 3,
        text: "Assignment submissions: 23",
        time: "1 day ago",
        icon: <FileText className="w-4 h-4 text-green-500" />,
        bg: "bg-green-100",
    },
];

const Dashboard: NextPage = () => {
    return (
        <div className="min-h-screen bg-gray-50 font-arimo text-gray-800 flex">
            <TeacherSidebar />
            <div className="flex-1 lg:ml-64 flex flex-col min-h-screen">
                <TeacherHeader />
                <main className="flex-1 p-6 max-w-7xl mx-auto w-full space-y-8">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900">
                                Welcome back, Sarah! 👋
                            </h2>
                            <p className="text-gray-500">
                                Here&apos;s what&apos;s happening with your
                                courses today.
                            </p>
                        </div>
                        <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2.5 rounded-lg font-medium transition-colors shadow-sm w-fit">
                            <Plus className="w-5 h-5" />
                            Create New Course
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {statsData.map((stat, index) => (
                            <div
                                key={index}
                                className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col justify-between h-40 transition-transform hover:-translate-y-1 duration-200"
                            >
                                <div className="flex justify-between items-start">
                                    <div>
                                        <p className="text-sm font-medium text-gray-500 mb-1">
                                            {stat.title}
                                        </p>
                                        <h3 className="text-3xl font-bold text-gray-900">
                                            {stat.value}
                                        </h3>
                                    </div>
                                    <div
                                        className={`p-2 rounded-lg shadow-sm ${
                                            stat.color === "indigo"
                                                ? "bg-indigo-500"
                                                : stat.color === "purple"
                                                  ? "bg-purple-500"
                                                  : stat.color === "green"
                                                    ? "bg-green-500"
                                                    : "bg-blue-500"
                                        }`}
                                    >
                                        {stat.icon}
                                    </div>
                                </div>

                                {stat.action ? (
                                    <button className="text-sm font-medium text-indigo-600 hover:text-indigo-800 text-left mt-auto">
                                        {stat.action} &rarr;
                                    </button>
                                ) : (
                                    <div className="flex items-center gap-1 mt-auto">
                                        {stat.trendUp ? (
                                            <TrendingUp className="w-4 h-4 text-green-500" />
                                        ) : (
                                            <TrendingUp className="w-4 h-4 text-red-500 rotate-180" />
                                        )}
                                        <span
                                            className={`text-sm font-medium ${stat.trendUp ? "text-green-600" : "text-red-600"}`}
                                        >
                                            {stat.trend}
                                        </span>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col">
                            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                                <h3 className="font-bold text-gray-900">
                                    My Courses
                                </h3>
                                <button className="text-sm font-medium text-indigo-600 hover:text-indigo-800">
                                    View All
                                </button>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="w-full text-left text-sm text-gray-600">
                                    <thead className="bg-gray-50 text-gray-500 font-medium">
                                        <tr>
                                            <th className="px-6 py-3">
                                                Course
                                            </th>
                                            <th className="px-6 py-3">
                                                Status
                                            </th>
                                            <th className="px-6 py-3">
                                                Students
                                            </th>
                                            <th className="px-6 py-3">
                                                Rating
                                            </th>
                                            <th className="px-6 py-3">
                                                Revenue
                                            </th>
                                            <th className="px-6 py-3 text-right">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        {courseData.map((course) => (
                                            <tr
                                                key={course.id}
                                                className="hover:bg-gray-50 transition-colors"
                                            >
                                                <td className="px-6 py-4 font-medium text-gray-900">
                                                    {course.title}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span
                                                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                                            course.status ===
                                                            "Published"
                                                                ? "bg-green-100 text-green-800"
                                                                : "bg-gray-100 text-gray-800"
                                                        }`}
                                                    >
                                                        {course.status}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    {course.students}
                                                </td>
                                                <td className="px-6 py-4 flex items-center gap-1">
                                                    {course.rating !== "-" && (
                                                        <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                                                    )}
                                                    {course.rating}
                                                </td>
                                                <td className="px-6 py-4">
                                                    {course.revenue}
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <button className="text-gray-400 hover:text-gray-600">
                                                        <MoreVertical className="w-5 h-5" />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div className="space-y-8">
                            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                                <h3 className="font-bold text-gray-900 mb-4">
                                    Recent Activity
                                </h3>
                                <div className="space-y-6">
                                    {activityData.map((item) => (
                                        <div
                                            key={item.id}
                                            className="flex gap-4"
                                        >
                                            <div
                                                className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${item.bg}`}
                                            >
                                                {item.icon}
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-gray-900">
                                                    {item.text}
                                                </p>
                                                <p className="text-xs text-gray-500 mt-0.5">
                                                    {item.time}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                                <h3 className="font-bold text-gray-900 mb-4">
                                    This Month
                                </h3>
                                <div className="space-y-4">
                                    <MonthStat
                                        label="New Enrollments"
                                        value="342"
                                    />
                                    <MonthStat
                                        label="Avg. Rating"
                                        value="4.8 ⭐"
                                    />
                                    <MonthStat
                                        label="Completion Rate"
                                        value="78%"
                                    />
                                    <MonthStat
                                        label="New Reviews"
                                        value="127"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

const MonthStat = ({ label, value }: { label: string; value: string }) => (
    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
        <span className="text-sm text-gray-600">{label}</span>
        <span className="text-sm font-bold text-gray-900">{value}</span>
    </div>
);

export default Dashboard;
