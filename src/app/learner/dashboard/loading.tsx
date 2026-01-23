export default function LearnerDashboardLoading() {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-6 animate-pulse">
            <div className="max-w-7xl mx-auto space-y-6">
                {/* Header */}
                <div className="space-y-2">
                    <div className="h-10 bg-slate-200 dark:bg-slate-800 rounded-lg w-64"></div>
                    <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-96"></div>
                </div>

                {/* Stats Cards */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    {[...Array(4)].map((_, i) => (
                        <div
                            key={i}
                            className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6"
                        >
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-slate-200 dark:bg-slate-800 rounded-lg"></div>
                                <div className="flex-1 space-y-2">
                                    <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-20"></div>
                                    <div className="h-6 bg-slate-200 dark:bg-slate-800 rounded w-16"></div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Content Grid */}
                <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
                    {/* Continue Learning */}
                    <div className="space-y-4">
                        <div className="h-6 bg-slate-200 dark:bg-slate-800 rounded w-48"></div>
                        <div className="space-y-4">
                            {[...Array(2)].map((_, i) => (
                                <div
                                    key={i}
                                    className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-4"
                                >
                                    <div className="flex gap-4">
                                        <div className="w-32 h-20 bg-slate-200 dark:bg-slate-800 rounded-lg"></div>
                                        <div className="flex-1 space-y-2">
                                            <div className="h-5 bg-slate-200 dark:bg-slate-800 rounded w-3/4"></div>
                                            <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-1/2"></div>
                                            <div className="h-2 bg-slate-200 dark:bg-slate-800 rounded w-full"></div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Upcoming Deadlines */}
                    <div className="space-y-4">
                        <div className="h-6 bg-slate-200 dark:bg-slate-800 rounded w-40"></div>
                        <div className="space-y-3">
                            {[...Array(3)].map((_, i) => (
                                <div
                                    key={i}
                                    className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-4"
                                >
                                    <div className="space-y-2">
                                        <div className="h-5 bg-slate-200 dark:bg-slate-800 rounded w-3/4"></div>
                                        <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-1/2"></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
