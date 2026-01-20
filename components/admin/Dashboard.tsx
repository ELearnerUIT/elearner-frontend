export default function Dashboard() {
    const stats = [
        { title: 'Total Students', value: '97,444', change: '+12% from last month', icon: '👤', color: 'bg-blue-100' },
        { title: 'Total Teachers', value: '1,284', change: '+8% from last month', icon: '🎓', color: 'bg-purple-100' },
        { title: 'Total Revenue', value: '$1,847,293', change: '+15% from last month', icon: '$', color: 'bg-green-100' },
        { title: 'Active Courses', value: '2,847', change: '348 pending approval', icon: '📖', color: 'bg-yellow-100' },
    ];

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
        { type: 'students', title: '15 new students enrolled', time: '2 hours ago', icon: '👥' },
        { type: 'review', title: 'New 5-star review received', time: '5 hours ago', icon: '⭐' },
        { type: 'submission', title: 'Assignment submissions: 23', time: '1 day ago', icon: '📝' },
        { type: 'course', title: 'New course submitted for approval', time: '2 days ago', icon: '✅' },
    ];

    const maxRevenue = Math.max(...monthlyRevenue.map(d => d.value));
    const maxEnrollments = Math.max(...newEnrollments.map(d => d.value));

    return (
        <div>
            {/* Welcome Section */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Welcome back, Admin! 👋</h1>
                <p className="text-gray-600 mt-1">Here's what's happening with your platform today</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {stats.map((stat, index) => (
                    <div key={index} className="bg-white rounded-lg shadow p-6">
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-gray-600 text-sm font-medium">{stat.title}</p>
                                <p className="text-2xl font-bold text-gray-900 mt-2">{stat.value}</p>
                                <p className="text-green-600 text-xs mt-2">{stat.change}</p>
                            </div>
                            <div className={`${stat.color} w-12 h-12 rounded-lg flex items-center justify-center text-xl`}>
                                {stat.icon}
                            </div>
                        </div>
                    </div>
                ))}
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
                        <span className="text-2xl">📈</span>
                    </div>

                    {/* Chart */}
                    <div className="relative h-64">
                        <svg className="w-full h-full" viewBox="0 0 400 240" preserveAspectRatio="xMidYMid meet">
                            {/* Grid lines */}
                            {[0, 1, 2, 3, 4].map((i) => (
                                <line
                                    key={`grid-${i}`}
                                    x1="40"
                                    y1={200 - i * 40}
                                    x2="400"
                                    y2={200 - i * 40}
                                    stroke="#e5e7eb"
                                    strokeWidth="1"
                                />
                            ))}

                            {/* Y-axis */}
                            <line x1="40" y1="20" x2="40" y2="200" stroke="#d1d5db" strokeWidth="2" />
                            {/* X-axis */}
                            <line x1="40" y1="200" x2="400" y2="200" stroke="#d1d5db" strokeWidth="2" />

                            {/* Y-axis labels */}
                            {[0, 1, 2, 3, 4].map((i) => (
                                <text
                                    key={`y-label-${i}`}
                                    x="30"
                                    y={205 - i * 40}
                                    textAnchor="end"
                                    fontSize="10"
                                    fill="#6b7280"
                                >
                                    {i * 20000}
                                </text>
                            ))}

                            {/* Line chart */}
                            <polyline
                                points={monthlyRevenue
                                    .map((d, i) => `${60 + i * 55},${200 - (d / maxRevenue) * 170}`)
                                    .join(' ')}
                                fill="none"
                                stroke="#3b82f6"
                                strokeWidth="2"
                            />

                            {/* Data points */}
                            {monthlyRevenue.map((d, i) => (
                                <circle
                                    key={`point-${i}`}
                                    cx={60 + i * 55}
                                    cy={200 - (d / maxRevenue) * 170}
                                    r="4"
                                    fill="#3b82f6"
                                />
                            ))}

                            {/* X-axis labels */}
                            {monthlyRevenue.map((d, i) => (
                                <text
                                    key={`x-label-${i}`}
                                    x={60 + i * 55}
                                    y="220"
                                    textAnchor="middle"
                                    fontSize="10"
                                    fill="#6b7280"
                                >
                                    {d.month}
                                </text>
                            ))}
                        </svg>
                    </div>
                </div>

                {/* New Enrollments Chart */}
                <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h3 className="text-lg font-bold text-gray-900">New Enrollments</h3>
                            <p className="text-gray-600 text-sm">Last 6 months</p>
                        </div>
                        <span className="text-2xl">👥</span>
                    </div>

                    {/* Bar chart */}
                    <div className="relative h-64">
                        <svg className="w-full h-full" viewBox="0 0 400 240" preserveAspectRatio="xMidYMid meet">
                            {/* Grid lines */}
                            {[0, 1, 2, 3, 4].map((i) => (
                                <line
                                    key={`grid-${i}`}
                                    x1="40"
                                    y1={200 - i * 40}
                                    x2="400"
                                    y2={200 - i * 40}
                                    stroke="#e5e7eb"
                                    strokeWidth="1"
                                />
                            ))}

                            {/* Y-axis */}
                            <line x1="40" y1="20" x2="40" y2="200" stroke="#d1d5db" strokeWidth="2" />
                            {/* X-axis */}
                            <line x1="40" y1="200" x2="400" y2="200" stroke="#d1d5db" strokeWidth="2" />

                            {/* Y-axis labels */}
                            {[0, 1, 2, 3, 4].map((i) => (
                                <text
                                    key={`y-label-${i}`}
                                    x="30"
                                    y={205 - i * 40}
                                    textAnchor="end"
                                    fontSize="10"
                                    fill="#6b7280"
                                >
                                    {i * 200}
                                </text>
                            ))}

                            {/* Bars */}
                            {newEnrollments.map((d, i) => (
                                <rect
                                    key={`bar-${i}`}
                                    x={50 + i * 55}
                                    y={200 - (d / maxEnrollments) * 170}
                                    width="30"
                                    height={(d / maxEnrollments) * 170}
                                    fill="#8b5cf6"
                                    rx="4"
                                />
                            ))}

                            {/* X-axis labels */}
                            {newEnrollments.map((d, i) => (
                                <text
                                    key={`x-label-${i}`}
                                    x={65 + i * 55}
                                    y="220"
                                    textAnchor="middle"
                                    fontSize="10"
                                    fill="#6b7280"
                                >
                                    {d.month}
                                </text>
                            ))}
                        </svg>
                    </div>
                </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-6">Recent Activity</h3>
                <div className="space-y-4">
                    {recentActivity.map((activity, index) => (
                        <div key={index} className="flex items-start space-x-4 pb-4 border-b last:border-b-0">
                            <div className="text-2xl">{activity.icon}</div>
                            <div className="flex-1">
                                <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                                <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}