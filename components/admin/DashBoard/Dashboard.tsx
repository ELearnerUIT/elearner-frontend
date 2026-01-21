import { BookOpen, DollarSign, GraduationCap, Users, TrendingUp, UserPlus } from "lucide-react";
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, CartesianGrid, BarChart, Bar, Legend, Tooltip } from "recharts";
import ActivityNotification, { ActivityNotificationType } from "./ActivityNotification";

export default function Dashboard() {
    const totalStudents = 97444;
    const changesTotalStudents = 12;
    const totalTeachers = 1284;
    const changesTotalTeachers = 8;
    const totalRevenue = 1847293;
    const changesTotalRevenue = 15;
    const activeCourses = 2847;
    const pendingCourses = 348;

    const monthlyRevenue = [
        { month: 'Jan', value: 50000 },
        { month: 'Feb', value: 55000 },
        { month: 'Mar', value: 60000 },
        { month: 'Apr', value: 65000 },
        { month: 'May', value: 62000 },
        { month: 'Jun', value: 70000 },
    ];

    const newEnrollments = [
        { month: 'Jan', value: 300 },
        { month: 'Feb', value: 400 },
        { month: 'Mar', value: 500 },
        { month: 'Apr', value: 550 },
        { month: 'May', value: 600 },
        { month: 'Jun', value: 650 },
    ];

    const recentActivity = [
        { type: ActivityNotificationType.NEW_STUDENT, title: '15 new students enrolled', time: '2 hours ago', icon: '👥' },
        { type: ActivityNotificationType.NEW_RATING, title: 'New 5-star review received', time: '5 hours ago', icon: '⭐' },
        { type: ActivityNotificationType.NEW_ASSIGNMENT, title: 'Assignment submissions: 23', time: '1 day ago', icon: '📝' },
        { type: ActivityNotificationType.NEW_COURSE, title: 'New course submitted for approval', time: '2 days ago', icon: '✅' },
    ];

    return (
        <div>
            {/* Welcome Section */}
            <div className="mb-8">
                <h1 className="text-3xl font-medium text-gray-900">Welcome back, Admin! 👋</h1>
                <p className="text-gray-600 mt-1">Here's what's happening with your platform today</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {/*Total Students Card*/}
                <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-start justify-between">
                        <div>
                            <p className="text-[rgb(113,113,130)] text-xl font-normal">Total Students</p>
                            <p className="text-2xl font-medium text-gray-900 mt-2">{totalStudents.toLocaleString()}</p>
                            <p className={"text-base mt-2" + (changesTotalStudents >= 0 ? ' text-green-500' : ' text-red-500')}>{changesTotalStudents >= 0 ? '+' : '-'}{changesTotalStudents}% from last month</p>
                        </div>
                        <div className={`bg-[rgb(238,242,255)] text-[rgb(99,102,241)] w-12 h-12 rounded-lg flex items-center justify-center text-xl`}>
                            <Users />
                        </div>
                    </div>
                </div>
                {/*Total  Teachers Card*/}
                <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-start justify-between">
                        <div>
                            <p className="text-[rgb(113,113,130)] text-xl font-normal">Total Teachers</p>
                            <p className="text-2xl font-medium text-gray-900 mt-2">{totalTeachers.toLocaleString()}</p>
                            <p className={"text-base mt-2" + (changesTotalTeachers >= 0 ? ' text-green-500' : ' text-red-500')}>{changesTotalTeachers >= 0 ? '+' : '-'}{changesTotalTeachers}% from last month</p>
                        </div>
                        <div className={`bg-[rgb(243,232,255)] text-[rgb(139,92,246)] w-12 h-12 rounded-lg flex items-center justify-center text-xl`}>
                            <GraduationCap />
                        </div>
                    </div>
                </div>
                {/*Total Revenue Card*/}
                <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-start justify-between">
                        <div>
                            <p className="text-[rgb(113,113,130)] text-xl font-normal">Total Revenue</p>
                            <p className="text-2xl font-medium text-gray-900 mt-2">${totalRevenue.toLocaleString()}</p>
                            <p className={"text-base mt-2" + (changesTotalRevenue >= 0 ? ' text-green-500' : ' text-red-500')}>{changesTotalRevenue >= 0 ? '+' : '-'}{changesTotalRevenue}% from last month</p>
                        </div>
                        <div className={`bg-[rgb(209,250,229)] text-[rgb(16,185,129)] w-12 h-12 rounded-lg flex items-center justify-center text-xl`}>
                            <DollarSign />
                        </div>
                    </div>
                </div>
                {/*Active Courses Card*/}
                <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-start justify-between">
                        <div>
                            <p className="text-[rgb(113,113,130)] text-xl font-normal">Active Courses</p>
                            <p className="text-2xl font-medium text-gray-900 mt-2">{activeCourses.toLocaleString()}</p>
                            <p className={"text-base mt-2 text-[rgb(113,113,130)]"}>{pendingCourses.toLocaleString()} pending approval</p>
                        </div>
                        <div className={`bg-[rgb(254,243,199)] text-[rgb(245,158,11)] w-12 h-12 rounded-lg flex items-center justify-center text-xl`}>
                            <BookOpen />
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
                            <h3 className="text-lg font-bold text-gray-900">Monthly Revenue</h3>
                            <p className="text-gray-600 text-sm">Last 6 months</p>
                        </div>
                        <TrendingUp size={30} className="text-[rgb(16,185,129)]" />
                    </div>

                    {/* Chart */}
                    <div className="relative h-64">
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
                                <Line dataKey={"value"} stroke="#6366F1" strokeWidth={2} />
                            </LineChart>
                        </ResponsiveContainer>

                    </div>
                </div>

                {/* New Enrollments Chart */}
                <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h3 className="text-lg font-bold text-gray-900">New Enrollments</h3>
                            <p className="text-gray-600 text-sm">Last 6 months</p>
                        </div>
                        <UserPlus size={30} className="text-[rgb(139,92,246)]" />
                    </div>

                    {/* Bar chart */}
                    <div className="relative h-64">
                        <ResponsiveContainer width="100%" height={250}>
                            <BarChart
                                width={500}
                                height={200}
                                data={newEnrollments}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <YAxis />
                                <XAxis dataKey={"month"} />
                                <Tooltip />
                                <Bar dataKey={"value"} fill="#8B5CF6" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-6">Recent Activity</h3>
                <div className="space-y-4">
                    {recentActivity.map((activity, index) => (
                        <ActivityNotification
                            type={activity.type}
                            title={activity.title}
                            time={activity.time}
                            key={index}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}