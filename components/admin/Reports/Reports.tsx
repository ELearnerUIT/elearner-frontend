import { BookOpen, DollarSign, GraduationCap, Users, TrendingUp, UserPlus, Star } from "lucide-react";
import { PieChart, Cell, ResponsiveContainer, XAxis, YAxis, CartesianGrid, BarChart, Bar, LineChart, Tooltip, Pie, Line, Label } from "recharts";
import ActivityNotification, { ActivityNotificationType } from "@/components/admin/DashBoard/ActivityNotification";

export default function Reports() {
    const avgCourseCompletion = 68.5;
    const changesAvgCourseCompletion = 12;
    const activeUsers = 1284;
    const changesActiveUsers = 8.5;
    const avgRating = 4.5;
    const changesAvgRating = 0.3;
    const totalCertificates = 2847;
    const changesTotalCertificates = 2.4;

    const coursePopularity = [
        { course: 'React', value: 50000 },
        { course: 'Python', value: 55000 },
        { course: 'Mobile', value: 60000 },
        { course: 'C++', value: 65000 },
        { course: 'NextJs', value: 62000 }
    ];

    const studentProgress = [
        { name: "0-25%", value: 15, color: "#6366F1" },
        { name: "26-50%", value: 25, color: "#8B5CF6" },
        { name: "51-75%", value: 35, color: "#10B981" },
        { name: "76-100%", value: 25, color: "#F59E0B" }
    ];

    const monthlyRevenue = [
        { month: 'Jan', value: 50000 },
        { month: 'Feb', value: 55000 },
        { month: 'Mar', value: 60000 },
        { month: 'Apr', value: 65000 },
        { month: 'May', value: 62000 },
        { month: 'Jun', value: 70000 },
    ];

    interface PreformingDetail {
        courseName: string,
        students: number,
        completionRate: number,
        revenue: number,
        rating: number
    }

    const topPerformingCourses: PreformingDetail[] = [
        {
            courseName: "Course1",
            students: 4738,
            completionRate: 86.5,
            revenue: 7986,
            rating: 4.8
        },
        {
            courseName: "Course2",
            students: 4556,
            completionRate: 80.9,
            revenue: 6798,
            rating: 4.7
        },
        {
            courseName: "Course3",
            students: 4362,
            completionRate: 80.3,
            revenue: 6589,
            rating: 4.7
        }
    ]

    return (
        <div>
            {/* Welcome Section */}
            <div className="mb-8">
                <h1 className="text-3xl font-medium text-gray-900">Reports & Analytics</h1>
                <p className="text-gray-600 mt-1">Comprehensive analytics and insights</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {/*Avg Course Completion Card*/}
                <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-start justify-between">
                        <div>
                            <p className="text-[rgb(113,113,130)] text-xl font-normal">Avg. Course Completion</p>
                            <p className="text-2xl font-medium text-gray-900 mt-2">{avgCourseCompletion.toLocaleString()}%</p>
                            <p className={"text-base mt-2" + (changesAvgCourseCompletion >= 0 ? ' text-green-500' : ' text-red-500')}>{changesAvgCourseCompletion >= 0 ? '+' : '-'}{changesAvgCourseCompletion}%</p>
                        </div>
                    </div>
                </div>
                {/*Active Users Card*/}
                <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-start justify-between">
                        <div>
                            <p className="text-[rgb(113,113,130)] text-xl font-normal">Active Users</p>
                            <p className="text-2xl font-medium text-gray-900 mt-2">{activeUsers.toLocaleString()}</p>
                            <p className={"text-base mt-2" + (changesActiveUsers >= 0 ? ' text-green-500' : ' text-red-500')}>{changesActiveUsers >= 0 ? '+' : '-'}{changesActiveUsers}%</p>
                        </div>
                    </div>
                </div>
                {/*Average Rating Card*/}
                <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-start justify-between">
                        <div>
                            <p className="text-[rgb(113,113,130)] text-xl font-normal">Avg. Rating</p>
                            <p className="text-2xl font-medium text-gray-900 mt-2 flex flex-row items-center">{avgRating}<Star className="text-yellow-400 fill-yellow-400" /></p>
                            <p className={"text-base mt-2" + (changesAvgRating >= 0 ? ' text-green-500' : ' text-red-500')}>{changesAvgRating >= 0 ? '+' : '-'}{changesAvgRating}%</p>
                        </div>
                    </div>
                </div>
                {/*Total Certificates Card*/}
                <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-start justify-between">
                        <div>
                            <p className="text-[rgb(113,113,130)] text-xl font-normal">Total Certificates</p>
                            <p className="text-2xl font-medium text-gray-900 mt-2">{totalCertificates.toLocaleString()}</p>
                            <p className={"text-base mt-2" + (changesTotalCertificates >= 0 ? ' text-green-500' : ' text-red-500')}>{changesTotalCertificates >= 0 ? '+' : '-'}{changesTotalCertificates}%</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                {/* Monthly Revenue Chart */}
                <div className="bg-white rounded-lg shadow p-6" >
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h3 className="text-lg font-medium text-gray-900">Course Popularity</h3>
                        </div>
                    </div>

                    {/* Chart */}
                    <div className="relative h-64">
                        <ResponsiveContainer width="100%" height={250}>
                            <BarChart
                                width={500}
                                height={200}
                                data={coursePopularity}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <YAxis />
                                <XAxis dataKey={"course"} />
                                <Tooltip />
                                <Bar dataKey={"value"} fill="#8B5CF6" />
                            </BarChart>
                        </ResponsiveContainer>

                    </div>
                </div>

                {/* Student Progress Distribution Chart */}
                <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h3 className="text-lg font-medium text-gray-900">Student Progress Distribution</h3>
                        </div>
                    </div>

                    {/* Pie chart */}
                    <div className="relative h-64">
                        <ResponsiveContainer width="100%" height={250}>
                            <PieChart
                                width={500}
                                height={200}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <Tooltip />
                                <Label />
                                <Pie
                                    data={studentProgress}
                                    labelLine={false}
                                    fill="#8884d8"
                                    dataKey="value"
                                    label
                                >
                                    {studentProgress.map((entry, index) => (
                                        <Cell key={index} fill={entry.color} />
                                    ))}
                                </Pie>
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
            <div className="bg-white rounded-lg shadow p-6 mb-8">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h3 className="text-lg font-medium text-gray-900">Revenue Trends (Last 6 Months)</h3>
                    </div>
                </div>
                {/* Revenue Trend Chart */}
                <ResponsiveContainer width="100%" height={250}>
                    <LineChart
                        width={500}
                        height={200}
                        data={monthlyRevenue}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <YAxis />
                        <XAxis dataKey={"month"} />
                        <Tooltip />
                        <Line dataKey={"value"} stroke="#10B981" strokeWidth={2} />
                    </LineChart>
                </ResponsiveContainer>
            </div>

            {/* Top Performing Courses Table */}
            <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-6">Top Performing Courses</h3>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-gray-200">
                                <th className="text-left py-4 px-4 text-gray-700 font-semibold">Ranking</th>
                                <th className="text-left py-4 px-4 text-gray-700 font-semibold">Course Name</th>
                                <th className="text-left py-4 px-4 text-gray-700 font-semibold">Students</th>
                                <th className="text-left py-4 px-4 text-gray-700 font-semibold">Completion Rate</th>
                                <th className="text-left py-4 px-4 text-gray-700 font-semibold">Revenue</th>
                                <th className="text-left py-4 px-4 text-gray-700 font-semibold">Rating</th>
                            </tr>
                        </thead>
                        <tbody>
                            {topPerformingCourses.map((course, index) => (
                                <tr key={index} className="border-b border-gray-100 hover:bg-gray-50 transition">
                                    <td className="py-4 px-4 text-gray-700">{index + 1}</td>
                                    <td className="py-4 px-4 text-gray-700">{course.courseName}</td>
                                    <td className="py-4 px-4 text-gray-700">{course.students.toLocaleString()}</td>
                                    <td className={"py-4 px-4 " + ((course.completionRate >= 50 ? "text-green-500" : "text-red-600"))}>{course.completionRate.toLocaleString()}%</td>
                                    <td className="py-4 px-4 text-gray-700">${course.revenue.toLocaleString()}</td>
                                    <td className="py-4 px-4 text-gray-700 flex flex-row justify-start gap-4 items-center">{course.rating.toFixed(1)} <Star className="text-yellow-400 fill-yellow-400" /></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}